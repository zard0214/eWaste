package uk.shef.msc8.ewaste.interfaces.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/04/2024 13:52
 */
@Data
public class ProductV2DTO {
    private Long id;

    private Long receiverId;
    private String description;
    private Long brandId;
    private Long seriesId;
    private int yearOfRelease;
    private int condition;
    private int colour;
    private String capacity;

    private String type;
    private int classification;
    private int visibility;
    private BigDecimal expectedValue;
    private String imageUrl;
    private String dataRetrieveUrl;

    private String creator;
    private Long creatorId;
    private Date gmtCreated;
    private Date gmtModified;
    private String lastOperator;
    private Long lastOperatorId;
    private Integer isDeleted;
}
