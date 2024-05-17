package uk.shef.msc8.ewaste.domain.order.statemachine.fsm;

import uk.shef.msc8.ewaste.domain.order.entity.valueobject.OrderState;
import org.squirrelframework.foundation.fsm.Converter;
/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/02/2024 23:16
 */
public class OrderStateConverter implements Converter<OrderState> {

    @Override
    public String convertToString(OrderState orderState) {
        return orderState.name();
    }

    @Override
    public OrderState convertFromString(String name) {
        return OrderState.valueOf(name);
    }
}