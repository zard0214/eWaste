package uk.shef.msc8.ewaste.infrastructure.common.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import uk.shef.msc8.ewaste.infrastructure.common.helper.PageUtil;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 11/03/2024 06:21
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class PageResponse<T> extends ResponseDTO<T> {

    private static final long serialVersionUID = 666985064788933395L;

    private PageUtil pageUtil;


    /**
     * Instantiates a new Page wrapper.
     */
    PageResponse() {
        super();
    }


    /**
     * Instantiates a new Page wrapper.
     *
     * @param code    the code
     * @param message the message
     */
    public PageResponse(int code, String message) {
        super(code, message);
    }

    /**
     * Instantiates a new pageWrapper default code=200
     *
     * @param result   the result
     * @param pageUtil the page util
     */
    public PageResponse(T result, PageUtil pageUtil) {
        super();
        this.setResult(result);
        this.setPageUtil(pageUtil);
    }

    /**
     * Instantiates a new Page wrapper.
     *
     * @param code     the code
     * @param message  the message
     * @param result   the result
     * @param pageUtil the page util
     */
    PageResponse(int code, String message, T result, PageUtil pageUtil) {
        super(code, message, result);
        this.pageUtil = pageUtil;
    }

    public PageResponse<T> pageUtil(PageUtil pageUtil) {
        this.setPageUtil(pageUtil);
        return this;
    }

    @Override
    public PageResponse<T> result(T result) {
        super.setResult(result);
        return this;
    }
}