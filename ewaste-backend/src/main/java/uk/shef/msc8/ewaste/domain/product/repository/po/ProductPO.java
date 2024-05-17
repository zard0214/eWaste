package uk.shef.msc8.ewaste.domain.product.repository.po;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("PRODUCT")
public class ProductPO {

    @TableId(value = "product_id", type = IdType.AUTO)
    private Long productId;

    @TableField(value = "description")
    private String description;

    @TableField(value = "brand")
    private String brand;

    @TableField(value = "model")
    private String model;

    @TableField(value = "year_of_release")
    private Integer yearOfRelease;

    @TableField(value = "condition")
    private String condition;

    @TableField(value = "color")
    private String color;

    @TableField(value = "capacity")
    private String capacity;

    @TableField(value = "type")
    private String type;

    @TableField(value = "classification")
    private String classification;

    @TableField(value = "visibility")
    private String visibility;

    @TableField(value = "expected_value")
    private Double expectedValue;

    @TableField(value = "image")
    private String image;

    @TableField(exist = false)
    private String photoBase64;

    @TableField(value = "data_retrieve")
    private Boolean dataRetrieve;

    @TableField(value = "user_id")
    private Long userId;
}
