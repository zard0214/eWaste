package uk.shef.msc8.ewaste.domain.order.statemachine.core;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.order.entity.valueobject.OrderEvent;
import uk.shef.msc8.ewaste.domain.order.entity.valueobject.OrderState;
import uk.shef.msc8.ewaste.domain.order.statemachine.fsm.OrderContext;

import java.util.Map;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/02/2024 23:14
 */
@Service
public class OrderStateMachineEngineFactory implements ApplicationContextAware {

    private ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    public void fire(OrderContext orderContext, OrderEvent orderEvent) {
        Map<String, AbstractOrderStatusMachineEngine> orderStatusMachineEngineMap = applicationContext.getBeansOfType(AbstractOrderStatusMachineEngine.class);
        boolean accept = false;
        for (AbstractOrderStatusMachineEngine orderStatusMachineEngine : orderStatusMachineEngineMap.values()) {
            if (orderStatusMachineEngine.accept(OrderState.getState(orderContext.getOrder().getStatus()))) {
                accept = true;
                orderStatusMachineEngine.fire(orderEvent, orderContext);
            }
        }
        if (!accept) {
            throw new RuntimeException("Order status transfer is incorrect");
        }
    }
}