package uk.shef.msc8.ewaste.domain.order.statemachine.fsm;

import lombok.Data;
import uk.shef.msc8.ewaste.domain.order.entity.Order;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/02/2024 23:15
 */
@Data
public class OrderContext {

    public OrderContext(Order order) {
        this.order = order;
    }

    private Order order;
}