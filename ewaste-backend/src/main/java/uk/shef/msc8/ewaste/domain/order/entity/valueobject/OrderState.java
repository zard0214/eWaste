package uk.shef.msc8.ewaste.domain.order.entity.valueobject;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/02/2024 23:16
 */
public enum OrderState {

    /**
     * cancel
     */
    CANCEL("CANCEL", -10),

    /**
     * init
     */
    INITIALISED("INITIALISED", 0),

    /**
     * RECEIVED
     */
    RECEIVED("RECEIVED", 10),

    /**
     * RETRIEVING
     */
    RETRIEVING("RETRIEVING", 20),

    /**
     * DISPATCHING
     */
    DISPATCHING("DISPATCHING", 30),

    /**
     * WIPING
     */
    WIPING("WIPING", 40),

    /**
     * COMPLETED
     */
    COMPLETED("COMPLETED", 50),

    PAY_SUCCESS("PAY_SUCCESS", 60);

    /**
     * name
     */
    final String State;

    /**
     * type
     */
    final Integer code;

    public static OrderState getState(Integer code) {
        for (OrderState ele : OrderState.values()) {
            if (code == ele.getCode()) {
                return ele;
            }
        }
        return null;
    }

    OrderState(String state, Integer code) {
        State = state;
        this.code = code;
    }

    public String getState() {
        return State;
    }

    public Integer getCode() {
        return code;
    }
}