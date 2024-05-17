package uk.shef.msc8.ewaste.domain.order.entity.valueobject;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/02/2024 23:15
 */
public enum OrderEvent {
    /**
     * create
     */
    CREATE("CREATE", 0),
    /**
     * cancel
     */
    CANCEL("CANCEL", 1),
    /**
     * pay
     */
    PAY("PAY", 2),
    /**
     * delivery
     */
    DELIVERY("DELIVERY", 3),
    /**
     * received
     */
    RECEIVED("RECEIVED", 4),
    /**
     * complete
     */
    COMPLETE("COMPLETE", 5),

    RETRIEVE("RETRIEVE", 6),

    DISPATCH("DISPATCH", 7),

    WIPE("WIPE", 8);

    OrderEvent(String type, int code) {
        this.type = type;
        this.code = code;
    }

    /**
     * name
     */
    final String type;

    /**
     * type
     */
    final int code;

    public String getType() {
        return type;
    }

    public int getCode() {
        return code;
    }
}