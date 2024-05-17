package uk.shef.msc8.ewaste.domain.product.entity;

import lombok.*;

/**
 * @author Siyuan Peng
 * @date Created in 8/03/2024
 */
@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    // Getters and Setters
    private Long productId;

    private String description;

    private String brand;

    private String model;

    private Integer yearOfRelease;

    private String condition;

    private String color;

    private String capacity;

    private String type;

    private String classification;

    private String visibility;

    private Double expectedValue;

    private String image;

    private Boolean dataRetrieve;

    private Long userId;

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public void setYearOfRelease(Integer yearOfRelease) {
        this.yearOfRelease = yearOfRelease;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setCapacity(String capacity) {
        this.capacity = capacity;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }

    public void setExpectedValue(Double expectedValue) {
        this.expectedValue = expectedValue;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setDataRetrieve(Boolean dataRetrieve) {
        this.dataRetrieve = dataRetrieve;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
