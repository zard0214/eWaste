package uk.shef.msc8.ewaste.domain.order.statemachine.fsm;

import org.squirrelframework.foundation.fsm.Condition;
/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/02/2024 23:15
 */
public class OrderCondition implements Condition {

    @Override
    public boolean isSatisfied(Object context) {
        return true;
    }

    @Override
    public String name() {
        return "hahah";
    }
}