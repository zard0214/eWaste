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

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 11/03/2024 02:53
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("t_series")
public class SeriesPO {

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField(value = "name")
    private String name;
    @TableField(value = "brand_id")
    private Long brandId;
    @TableField(value = "image_url")
    private String imageUrl = "https://s3.us-west-2.amazonaws.com/stamped.io/uploads/account/25792/meta/launcher_logo_image.jpg";
    @TableField(value = "series_value")
    private Integer value;
    @TableField(value = "expected_value")
    private Double expectedValue;

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
