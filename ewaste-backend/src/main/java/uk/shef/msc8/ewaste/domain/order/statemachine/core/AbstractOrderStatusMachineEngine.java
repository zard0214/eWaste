package uk.shef.msc8.ewaste.domain.order.statemachine.core;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.GenericTypeResolver;
import org.squirrelframework.foundation.fsm.StateMachineBuilderFactory;
import org.squirrelframework.foundation.fsm.StateMachineConfiguration;
import org.squirrelframework.foundation.fsm.UntypedStateMachine;
import org.squirrelframework.foundation.fsm.UntypedStateMachineBuilder;
import uk.shef.msc8.ewaste.domain.order.entity.valueobject.OrderEvent;
import uk.shef.msc8.ewaste.domain.order.entity.valueobject.OrderState;
import uk.shef.msc8.ewaste.domain.order.statemachine.fsm.OrderContext;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/02/2024 23:11
 */
public abstract class AbstractOrderStatusMachineEngine<T extends UntypedStateMachine> implements ApplicationContextAware {


    private ApplicationContext applicationContext;

    protected UntypedStateMachineBuilder builder;

    public AbstractOrderStatusMachineEngine() {
        Class<T> genericType = (Class<T>) GenericTypeResolver.resolveTypeArgument(getClass(), AbstractOrderStatusMachineEngine.class);
        builder = StateMachineBuilderFactory.create(genericType, ApplicationContext.class);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    public void fire(OrderEvent orderEvent, OrderContext orderContext) {
        T stateMachine = builder.newUntypedStateMachine(OrderState.getState(orderContext.getOrder().getStatus()),
                StateMachineConfiguration.create().enableDebugMode(true).enableAutoStart(true),
                applicationContext);
        try {
            stateMachine.fire(orderEvent, orderContext);
        } catch (Exception e) {
            throw new RuntimeException("Order status transfer is incorrect");
        }
    }


    protected abstract boolean accept(OrderState orderState);

}