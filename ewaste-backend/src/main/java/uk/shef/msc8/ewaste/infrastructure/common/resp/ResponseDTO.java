package uk.shef.msc8.ewaste.infrastructure.common.resp;

import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;

import java.io.Serializable;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 15:58
 */
@Data
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class ResponseDTO<T> implements Serializable {

    private static final long serialVersionUID = 4893280118017319089L;

    public static final int SUCCESS_CODE = 200;

    public static final String SUCCESS_MESSAGE = "success";

    public static final int ERROR_CODE = 500;

    public static final String ERROR_MESSAGE = "error";

    public static final int ILLEGAL_ARGUMENT_CODE_ = 100;

    public static final String ILLEGAL_ARGUMENT_MESSAGE = "illegal argument";

    private int code;

    private String message;

    private T result;

    /**
     * Instantiates a new wrapper. default code=200
     */
    public ResponseDTO() {
        this(SUCCESS_CODE, SUCCESS_MESSAGE);
    }


    public ResponseDTO(int code, String message) {
        this(code, message, null);
    }


    public ResponseDTO(int code, String message, T result) {
        super();
        this.code(code).message(message).result(result);
    }


    private ResponseDTO<T> code(int code) {
        this.setCode(code);
        return this;
    }


    private ResponseDTO<T> message(String message) {
        this.setMessage(message);
        return this;
    }


    public ResponseDTO<T> result(T result) {
        this.setResult(result);
        return this;
    }


    @JsonIgnore
    public boolean success() {
        return ResponseDTO.SUCCESS_CODE == this.code;
    }


    @JsonIgnore
    public boolean error() {
        return !success();
    }

    public static ResponseDTO error(String message, Object data) {
        return new ResponseDTO(ERROR_CODE, StringUtils.isEmpty(message) ? ERROR_MESSAGE : message, data);
    }

}