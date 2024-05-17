package uk.shef.msc8.ewaste.infrastructure.common.helper;

import lombok.Data;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 11/03/2024 06:22
 */
@Data
public class PageUtil {


    private int currentPage = 1;

    private int nextPage;

    private int prePage;

    private long totalRow;

    private int pageSize = 10;

    private int totalPage;

    private int start;

    /**
     * The buttons.
     */
    private int[] buttons;

    private int curPageSize;

    /**
     * Instantiates a new page util.
     */
    public PageUtil() {

    }

    /**
     * Instantiates a new page util.
     *
     * @param currentPage the current page
     */
    public PageUtil(int currentPage) {
        this.currentPage = currentPage;
    }

    /**
     * Instantiates a new page util.
     *
     * @param currentPage the current page
     * @param pageSize    the page size
     */
    public PageUtil(int currentPage, int pageSize) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
    }

}