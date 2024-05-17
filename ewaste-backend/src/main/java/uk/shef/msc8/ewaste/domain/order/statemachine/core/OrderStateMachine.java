package uk.shef.msc8.ewaste.domain.order.statemachine.core;

import org.springframework.beans.BeanUtils;
import org.springframework.context.ApplicationContext;
import org.squirrelframework.foundation.fsm.StateMachineStatus;
import org.squirrelframework.foundation.fsm.annotation.*;
import uk.shef.msc8.ewaste.application.UserApplicationService;
import uk.shef.msc8.ewaste.domain.order.entity.Order;
import uk.shef.msc8.ewaste.domain.order.entity.valueobject.OrderEvent;
import uk.shef.msc8.ewaste.domain.order.entity.valueobject.OrderState;
import uk.shef.msc8.ewaste.domain.order.repository.facade.OrderRepository;
import uk.shef.msc8.ewaste.domain.order.repository.po.OrderPO;
import uk.shef.msc8.ewaste.domain.order.statemachine.fsm.OrderContext;
import uk.shef.msc8.ewaste.domain.product.repository.facade.ProductV2Repository;
import uk.shef.msc8.ewaste.infrastructure.auth.config.UserInfoThreadHolder;
import uk.shef.msc8.ewaste.infrastructure.email.MailService;
import uk.shef.msc8.ewaste.infrastructure.exception.BizException;

import javax.annotation.Resource;
import javax.mail.MessagingException;
import java.util.Date;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/02/2024 23:13
 */
@States({
        @State(name = "INITIALISED", entryCallMethod = "entryStateInit", exitCallMethod = "exitStateInit", initialState = true),
        @State(name = "RECEIVED", entryCallMethod = "entryStateReceive", exitCallMethod = "exitStateReceive"),
        @State(name = "RETRIEVING", entryCallMethod = "entryStateRetrieve", exitCallMethod = "exitStateRetrieve"),
        @State(name = "DISPATCHING", entryCallMethod = "entryStateDispatch", exitCallMethod = "exitStateDispatch"),
        @State(name = "WIPING", entryCallMethod = "entryStateWipe", exitCallMethod = "exitStateWipe"),
        @State(name = "COMPLETED", entryCallMethod = "entryStateComplete", exitCallMethod = "exitStateComplete")
})
@Transitions(value = {
        @Transit(from = "INITIALISED", to = "RECEIVED", on = "CREATE", callMethod = "create"),
        @Transit(from = "RECEIVED", to = "RETRIEVING", on = "RETRIEVE", callMethod = "retrieve"),
        @Transit(from = "RETRIEVING", to = "DISPATCHING", on = "DISPATCH", callMethod = "delivery"),
        @Transit(from = "DISPATCHING", to = "WIPING", on = "WIPE", callMethod = "wipe"),
        @Transit(from = "WIPING", to = "COMPLETED", on = "COMPLETE", callMethod = "complete"),

        @Transit(from = "INITIALISED", to = "COMPLETED", on = "COMPLETE", callMethod = "complete"),
        @Transit(from = "INITIALISED", to = "CANCEL", on = "CANCEL", callMethod = "complete"),



        @Transit(from = "INITIALISED", to = "RETRIEVING", on = "RETRIEVE", callMethod = "retrieve"),
        @Transit(from = "RETRIEVING", to = "PAY_SUCCESS", on = "PAY", callMethod = "pay"),
        @Transit(from = "PAY_SUCCESS", to = "COMPLETED", on = "COMPLETE", callMethod = "complete")

})
@StateMachineParameters(stateType = OrderState.class, eventType = OrderEvent.class, contextType = OrderContext.class)
public class OrderStateMachine extends BaseOrderStateMachine  {

    private OrderRepository orderRepository;
    private ProductV2Repository productV2Repository;
    private MailService mailService;
    private UserApplicationService userApplicationService;

    public OrderStateMachine(ApplicationContext applicationContext) {
        super(applicationContext);
        this.orderRepository = applicationContext.getBean(OrderRepository.class);
        this.productV2Repository = applicationContext.getBean(ProductV2Repository.class);
        this.mailService = applicationContext.getBean(MailService.class);
        this.userApplicationService = applicationContext.getBean(UserApplicationService.class);
    }

    @Override
    protected void beforeTransitionBegin(Object fromState, Object event, Object context) {
        super.beforeTransitionBegin(fromState, event, context);
    }

    @Override
    protected void afterTransitionCompleted(Object fromState, Object toState, Object event, Object context) {
        if (fromState instanceof OrderState && toState instanceof OrderState) {
            OrderContext orderContext = (OrderContext) context;
            Order order = orderContext.getOrder();
            OrderPO orderPO = new OrderPO();

            order.setStatus(((OrderState) toState).getCode());
            order.setLastOperator(UserInfoThreadHolder.getCurrentUser().getUserName());
            order.setLastOperatorId(UserInfoThreadHolder.getCurrentUser().getId());
            BeanUtils.copyProperties(order, orderPO);
            if(((OrderState) toState).getState() == OrderState.RETRIEVING.getState()){
                orderPO.setDataUrl(order.getDataUrl());
            }
            orderRepository.update(orderPO);

            if(((OrderState) toState).getState() == OrderState.RECEIVED.getState()){
                var productId = orderContext.getOrder().getProductId();
                var productV2ById = productV2Repository.findProductV2ById(productId);

                productV2ById.setVisibility(1);
                productV2Repository.updateProductV2(productV2ById);
            }

            if(((OrderState) toState).getState() == OrderState.PAY_SUCCESS.getState()){
                var userById = userApplicationService.getUserById(orderPO.getReceiverId());
                orderPO.setRealPayAmount(order.getRealPayAmount());
                orderRepository.update(orderPO);
                try {
                    mailService.sendNotification(userById.getEmail(), "eWaste",  userById.getUserName(), orderPO.getDataUrl());
                } catch (MessagingException e) {
                    throw new RuntimeException(e);
                }
            }

        }
    }

    public void create(OrderState fromState, OrderState toState, OrderEvent orderEvent, OrderContext orderContext) {
        System.out.println("create");
    }

    public void retrieve(OrderState fromState, OrderState toState, OrderEvent orderEvent, OrderContext orderContext) {
        System.out.println("retrieve");
    }

    public void delivery(OrderState fromState, OrderState toState, OrderEvent orderEvent, OrderContext orderContext) {
        System.out.println("delivery");
    }

    public void wipe(OrderState fromState, OrderState toState, OrderEvent orderEvent, OrderContext orderContext) {
        System.out.println("receive");
    }

    public void complete(OrderState fromState, OrderState toState, OrderEvent orderEvent, OrderContext orderContext) {
        System.out.println("complete");
    }

    public void pay(OrderState fromState, OrderState toState, OrderEvent orderEvent, OrderContext orderContext) {
        System.out.println("pay");
    }


    @Override
    protected void afterTransitionCausedException(Object fromState, Object toState, Object event, Object context) {
        Throwable targeException = getLastException().getTargetException();
        if(targeException instanceof IllegalArgumentException) {
            // do some error clean up job here
            // ...
            // after recovered from this exception, reset the state machine status back to normal
            setStatus(StateMachineStatus.IDLE);
        } else {
            // afterTransitionCausedException
            super.afterTransitionCausedException(fromState, toState, event, context);
        }
        throw new BizException("Order status transfer is incorrect");
    }

    @Override
    protected void afterTransitionDeclined(Object fromState, Object event, Object context) {
        throw new BizException("Order status transfer is incorrect");
    }

}
