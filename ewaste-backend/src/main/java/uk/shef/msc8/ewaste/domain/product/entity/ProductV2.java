package uk.shef.msc8.ewaste.domain.product.entity;

import lombok.Data;

import java.math.BigDecimal;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/04/2024 13:24
 */
@Data
public class ProductV2 {


    private Long id;

    private Long receiverId;
    private String description;
    private Long brandId;
    private Long orderId;

    private String brandName;

    private Long seriesId;

    private String seriesName;

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
}
