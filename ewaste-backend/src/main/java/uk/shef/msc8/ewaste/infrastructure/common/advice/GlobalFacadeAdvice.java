package uk.shef.msc8.ewaste.infrastructure.common.advice;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import uk.shef.msc8.ewaste.infrastructure.common.resp.ResponseDTO;
import uk.shef.msc8.ewaste.infrastructure.exception.BizException;
import uk.shef.msc8.ewaste.infrastructure.exception.StateCodeException;
import uk.shef.msc8.ewaste.infrastructure.common.resp.ErrorBody;
import uk.shef.msc8.ewaste.infrastructure.common.resp.RespCode;
import uk.shef.msc8.ewaste.infrastructure.common.resp.Response;

import java.io.Serializable;
import java.lang.reflect.UndeclaredThrowableException;
import java.net.ConnectException;
import java.sql.SQLDataException;
import java.sql.SQLException;
import java.sql.SQLSyntaxErrorException;
import java.sql.SQLTransientConnectionException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 02:49
 */
@RestControllerAdvice
public class GlobalFacadeAdvice {
    /**
     * INTERNAL_SERVER_ERROR RespCode
     */
    private static final RespCode INTERNAL_SERVER_ERROR = RespCode.INTERNAL_SERVER_ERROR;
    /**
     * BAD_REQUEST RepsCode
     */
    private static final RespCode BAD_REQUEST = RespCode.INTERNAL_SERVER_ERROR;

    @ExceptionHandler(value = UndeclaredThrowableException.class)
    public ResponseDTO<ErrorBody> throwable(UndeclaredThrowableException e) {
        e.printStackTrace();
        return Response.failed(e.getMessage());
    }

    @ExceptionHandler(value = NullPointerException.class)
    public ResponseDTO<ErrorBody> nullPointerException(NullPointerException e) {
        e.printStackTrace();
        ErrorBody errorBody = ErrorBody.build(e);
        StackTraceElement ste = e.getStackTrace()[0];
        Map<String, Object> metadata = errorBody.getMetadata();
        metadata.put("position", ste.getClassName() + "#" + ste.getMethodName() + ":" + ste.getLineNumber());
        metadata.put("fileName", ste.getFileName());
        errorBody.setMetadata(metadata);
        return Response.failed(e.getMessage());
    }

    @ExceptionHandler(value = {Exception.class})
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseDTO<ErrorBody> exception(Exception e) {
        e.printStackTrace();
        return Response.failed(e.getMessage());
    }

    /**
     * http error
     */
    @ExceptionHandler(value = HttpStatusCodeException.class)
    public ResponseDTO<ErrorBody> httpStatusCodeException(HttpStatusCodeException e) {
        e.printStackTrace();
        ErrorBody errorBody = ErrorBody.build(e);
        HttpStatus statusCode = (HttpStatus) e.getStatusCode();
        Map<String, Object> metadata = errorBody.getMetadata();
        metadata.put("statusCode", statusCode.value());
        metadata.put("RespBody", e.getResponseBodyAsString());
        errorBody.setMetadata(metadata);
        return Response.failed(e.getMessage());
    }

    @ExceptionHandler(value = HttpMediaTypeNotSupportedException.class)
    public ResponseDTO<ErrorBody> httpMediaTypeNotSupportedException(HttpMediaTypeNotSupportedException e) {
        e.printStackTrace();
        ErrorBody errorBody = ErrorBody.build(e);
        List<MediaType> supportedMediaTypes = e.getSupportedMediaTypes();
        List<String> support = new ArrayList<>();
        for (MediaType mediaType : supportedMediaTypes) {
            support.add(mediaType.getType());
        }
        Map<String, Object> metadata = errorBody.getMetadata();
        MediaType contentType = e.getContentType();
        if (contentType != null) {
            metadata.put("contentType", contentType.getSubtype());
        }
        metadata.put("support", support);
        errorBody.setMetadata(metadata);
        return Response.failed(e.getMessage());
    }


    @ExceptionHandler(value = HttpRequestMethodNotSupportedException.class)
    public ResponseDTO<ErrorBody> httpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        e.printStackTrace();
        ErrorBody errorBody = ErrorBody.build(e);
        Map<String, Object> metadata = errorBody.getMetadata();
        metadata.put("method", e.getMethod());
        metadata.put("supportedMethods", e.getSupportedMethods());
        return Response.failed(e.getMessage());
    }


    @ExceptionHandler(value = MissingServletRequestParameterException.class)
    public ResponseDTO<ErrorBody> missingServletRequestParameterException(MissingServletRequestParameterException e) {
        e.printStackTrace();
        ErrorBody errorBody = ErrorBody.build(e);
        errorBody.getMetadata().put("parameterName", e.getParameterName());
        return Response.failed(e.getMessage());
    }


    @ExceptionHandler(value = HttpMessageNotReadableException.class)
    public ResponseDTO<ErrorBody> httpMessageNotReadableException(HttpMessageNotReadableException e) {
        e.printStackTrace();
        ErrorBody errorBody = ErrorBody.build(e);
        if (e.getCause() instanceof InvalidFormatException) {
            InvalidFormatException fe = (InvalidFormatException) e.getCause();
            errorBody.getMetadata().put("requiredType", fe.getTargetType().getName());
            errorBody.getMetadata().put("targetValue", fe.getValue());
        }
        return Response.failed(e.getMessage());
    }


    @ExceptionHandler(value = MissingServletRequestPartException.class)
    public ResponseDTO<ErrorBody> missingServletRequestPartException(MissingServletRequestPartException e) {
        e.printStackTrace();
        ErrorBody errorBody = ErrorBody.build(e);
        errorBody.getMetadata().put("partName", e.getRequestPartName());
        return Response.failed(e.getMessage());
    }


    @ExceptionHandler(value = MethodArgumentTypeMismatchException.class)
    public ResponseDTO<ErrorBody> methodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e) {
        e.printStackTrace();
        ErrorBody errorBody = ErrorBody.build(e);
        Map<String, Object> metadata = errorBody.getMetadata();
        Class<?> requiredType = e.getRequiredType();
        if (requiredType != null) {
            metadata.put("requiredType", requiredType.getName());
        }
        metadata.put(e.getName(), e.getValue());
        return Response.failed(e.getMessage());
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseDTO<ErrorBody> methodArgumentNotValidException(MethodArgumentNotValidException e) {
        e.printStackTrace();
        ErrorBody errorBody = ErrorBody.build(e);
        if (e.getBindingResult().getFieldError() != null) {
            FieldError fieldError = e.getBindingResult().getFieldError();
            if (fieldError != null) {
                errorBody.getMetadata().put(fieldError.getField(), fieldError.getDefaultMessage());
                errorBody.setMessage(fieldError.getDefaultMessage());
            }
        }
        return Response.failed(e.getMessage());
    }

    @ExceptionHandler(value = BindException.class)
    public ResponseDTO<ErrorBody> bindException(BindException e) {
        e.printStackTrace();
        ErrorBody errorBody = ErrorBody.build(e);
        BindingResult bindingResult = e.getBindingResult();
        List<ObjectError> list = bindingResult.getAllErrors();
        List<Map<String, Object>> dataList = new ArrayList<>(list.size());
        Map<String, Object> fieldError = new TreeMap<>();
        String defaultMessage = null;
        for (ObjectError error : list) {
            if (error instanceof FieldError) {
                FieldError field = (FieldError) error;
                defaultMessage = field.getDefaultMessage();
                fieldError.put(field.getField(), field.getRejectedValue());
                dataList.add(fieldError);
            }
        }
        errorBody.getMetadata().put("errorList", dataList);
        int length = 100;
        if (defaultMessage == null || defaultMessage.length() > length) {
            defaultMessage = BAD_REQUEST.getMessage();
        }
        return Response.failed(e.getMessage());
    }

    @ExceptionHandler(value = MissingRequestHeaderException.class)
    public ResponseDTO<ErrorBody> missingRequestHeaderException(MissingRequestHeaderException e) {
        e.printStackTrace();
        ErrorBody errorBody = ErrorBody.build(e);
        errorBody.getMetadata().put("headerName", e.getHeaderName());
        return Response.failed(e.getMessage());
    }

    @ExceptionHandler(value = SQLException.class)
    public ResponseDTO<ErrorBody> sqlException(SQLException e) {
        e.printStackTrace();
        ErrorBody errorBody = ErrorBody.build(e);
        Map<String, Object> metadata = errorBody.getMetadata();
        metadata.put("SQLState", e.getSQLState());
        metadata.put("errorCode", e.getErrorCode());
        errorBody.setMetadata(metadata);
        return Response.failed(e.getMessage());
    }

    @ExceptionHandler(value = ConnectException.class)
    public ResponseDTO<ErrorBody> connectException(ConnectException e) {
        e.printStackTrace();
        return Response.failed(e.getMessage());
    }

    @ExceptionHandler(value = {SQLSyntaxErrorException.class, SQLDataException.class})
    public ResponseDTO<ErrorBody> sqlSyntaxErrorException(Exception e) {
        e.printStackTrace();
        ErrorBody errorBody = ErrorBody.build(e);
        return Response.failed(e.getMessage());
    }

    @ExceptionHandler(value = {SQLTransientConnectionException.class})
    public ResponseDTO<ErrorBody> sqlTransientConnectionException(Exception e) {
        e.printStackTrace();
        return Response.failed(e.getMessage());
    }

    @ExceptionHandler(value = {ClassCastException.class})
    public ResponseDTO<ErrorBody> classCastException(ClassCastException e) {
        e.printStackTrace();
        return Response.failed(e.getMessage());
    }

    @ExceptionHandler(value = StateCodeException.class)
    public ResponseDTO<ErrorBody> stateCodeException(StateCodeException e) {
        e.printStackTrace();
        return Response.failed(e.getMessage());
    }

    @ExceptionHandler(value = BizException.class)
    public ResponseDTO<Serializable> businessException(BizException e) {
        e.printStackTrace();
        return Response.failed(e.getMessage());
    }

}
