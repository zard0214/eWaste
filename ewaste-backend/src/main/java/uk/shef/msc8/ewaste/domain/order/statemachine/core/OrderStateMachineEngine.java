package uk.shef.msc8.ewaste.domain.order.statemachine.core;

import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.order.entity.valueobject.OrderState;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/02/2024 23:13
 */
@Service
public class OrderStateMachineEngine extends AbstractOrderStatusMachineEngine<OrderStateMachine> {

    @Override
    protected boolean accept(OrderState orderState) {
        return true;
    }

}