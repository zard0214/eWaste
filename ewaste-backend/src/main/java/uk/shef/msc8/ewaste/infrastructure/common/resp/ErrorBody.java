package uk.shef.msc8.ewaste.infrastructure.common.resp;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Date;
import java.util.Map;
import java.util.TreeMap;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 02:47
 */
public class ErrorBody {

    private String throwable;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss:SSS")
    private Date throwTime;

    private String message;

    private String stackTrace;

    private Map<String, Object> metadata;

    public String getThrowable() {
        return throwable;
    }

    public void setThrowable(String throwable) {
        this.throwable = throwable;
    }

    public Date getThrowTime() {
        return throwTime;
    }

    public void setThrowTime(Date throwTime) {
        this.throwTime = throwTime;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStackTrace() {
        return stackTrace;
    }

    public void setStackTrace(String stackTrace) {
        this.stackTrace = stackTrace;
    }

    public Map<String, Object> getMetadata() {
        return metadata;
    }

    public void setMetadata(Map<String, Object> metadata) {
        this.metadata = metadata;
    }

    public ErrorBody(String throwable, Date throwTime, String message, String stackTrace, Map<String, Object> metadata) {
        this.throwable = throwable;
        this.throwTime = throwTime;
        this.message = message;
        this.stackTrace = stackTrace;
        this.metadata = metadata;
    }

    public static ErrorBody build(Throwable e) {
        return build(e, false);
    }

    public static ErrorBody build(Throwable e, boolean stackTrace) {
        return new ErrorBody(
                e.getClass().getName(), new Date(),
                e.getMessage(),
                stackTrace ? collectStackTrace(e) : null,
                new TreeMap<>());
    }

    private static String collectStackTrace(Throwable e) {
        try (StringWriter sw = new StringWriter(); PrintWriter pw = new PrintWriter(sw, true)) {
            e.printStackTrace(pw);
            return sw.toString();
        } catch (IOException ex) {
            return "collectStackTrace exception : " + ex.getMessage();
        }
    }

}
