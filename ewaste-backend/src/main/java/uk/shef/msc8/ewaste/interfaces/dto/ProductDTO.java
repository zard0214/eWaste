package uk.shef.msc8.ewaste.interfaces.dto;

import lombok.Data;

@Data
public class ProductDTO {
    
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
}
