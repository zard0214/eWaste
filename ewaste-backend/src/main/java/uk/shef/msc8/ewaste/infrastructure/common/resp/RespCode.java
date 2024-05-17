package uk.shef.msc8.ewaste.infrastructure.common.resp;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 02:46
 */
public enum RespCode implements ResultCode {
    /**
     * Default OK
     */
    OK("200", "SUCCESS", "SUCCESS"),
    /**
     * Default Fail
     */
    FAIL("330", "FAIL", "FAIL"),
    INTERNAL_SERVER_ERROR("500", "Internal Server Error", "Internal Server Error");

    private final String code;

    private final String desc;

    private final String message;

    RespCode(String code, String desc, String message) {
        this.code = code;
        this.desc = desc;
        this.message = message;
    }

    @Override
    public String getCode() {
        return code;
    }

    @Override
    public String getDesc() {
        return desc;
    }

    @Override
    public String getMessage() {
        return message;
    }

}
