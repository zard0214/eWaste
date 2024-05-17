package uk.shef.msc8.ewaste.infrastructure.exception;

import uk.shef.msc8.ewaste.infrastructure.common.resp.RespCode;
import uk.shef.msc8.ewaste.infrastructure.common.resp.ResultCode;

import java.io.Serializable;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 02:48
 */
public class BizException extends StateCodeException {

    private final Serializable data;

    public BizException() {
        this(RespCode.FAIL);
    }

    public BizException(String code, String message) {
        this(code, message, null, false);
    }


    public BizException(String message) {
        this(RespCode.FAIL.getCode(), message, null, false);
    }

    public BizException(ResultCode resultCode) {
        this(resultCode, false);
    }

    public BizException(String code, String message, Serializable data) {
        this(code, message, data, false);
    }


    public BizException(ResultCode resultCode, boolean writableStackTrace) {
        this(resultCode.getCode(), resultCode.getMessage(), null, writableStackTrace);
    }

    public BizException(String code, String message, Serializable data, boolean writableStackTrace) {
        super(code, message, writableStackTrace);
        this.data = data;
    }

    public Serializable getData() {
        return data;
    }
}
