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

import java.math.BigDecimal;
import java.util.Date;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/04/2024 13:13
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("t_productV2")
public class ProductV2PO {

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField(value = "receiver_id")
    private Long receiverId;
    @TableField(value = "description")
    private String description;
    @TableField(value = "brand_id")
    private Long brandId;
    @TableField(value = "series_id")
    private Long seriesId;
    @TableField(value = "year_of_release")
    private int yearOfRelease;
    @TableField(value = "condition")
    private int condition;
    @TableField(value = "colour")
    private int colour;
    @TableField(value = "capacity")
    private String capacity;
    @TableField(value = "type")
    private String type;
    @TableField(value = "classification")
    private int classification;
    @TableField(value = "visibility")
    private int visibility;
    @TableField(value = "expected_value")
    private BigDecimal expectedValue;
    @TableField(value = "image_url")
    private String imageUrl;
    @TableField(value = "data_retrieve_url")
    private String dataRetrieveUrl;

    @TableField(value = "creator")
    private String creator;
    @TableField(value = "creator_id")
    private Long creatorId;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @TableField(value = "gmt_created")
    private Date gmtCreated;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @TableField(value = "gmt_modified")
    private Date gmtModified;
    @TableField(value = "last_operator")
    private String lastOperator;
    @TableField(value = "last_operator_id")
    private Long lastOperatorId;
    @TableField(value = "is_deleted")
    private Integer isDeleted;
}
