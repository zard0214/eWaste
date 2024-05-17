package uk.shef.msc8.ewaste.infrastructure.common.resp;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 02:47
 */
public interface ResultCode {

    String getCode();

    String getMessage();

    default String getDesc() {
        return getMessage();
    }

}
