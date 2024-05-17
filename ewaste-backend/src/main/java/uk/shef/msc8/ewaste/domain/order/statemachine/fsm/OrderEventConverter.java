package uk.shef.msc8.ewaste.domain.order.statemachine.fsm;

import uk.shef.msc8.ewaste.domain.order.entity.valueobject.OrderEvent;
import org.squirrelframework.foundation.fsm.Converter;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/02/2024 23:16
 */
public class OrderEventConverter implements Converter<OrderEvent> {

    @Override
    public String convertToString(OrderEvent orderEvent) {
        return orderEvent.name();
    }

    @Override
    public OrderEvent convertFromString(String name) {
        return OrderEvent.valueOf(name);
    }
}