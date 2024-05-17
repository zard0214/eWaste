package uk.shef.msc8.ewaste.domain.order.repository.po;

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
 * @date Created in 11/03/2024 02:53
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("t_order")
public class OrderPO {

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField(value = "receiver_id")
    private Long receiverId;
    @TableField(value = "product_id")
    private Long productId;
    @TableField(value = "status")
    private Integer status;
    @TableField(value = "receiver_phone")
    private String receiverPhone;
    @TableField(value = "receiver_address")
    private String receiverAddress;

    @TableField(value = "total_amount")
    private BigDecimal totalAmount;
    @TableField(value = "real_pay_amount")
    private BigDecimal realPayAmount;
    @TableField(value = "postage_amount")
    private BigDecimal postageAmount;
    @TableField(value = "service_fee_amount")
    private BigDecimal serviceFeeAmount;
    @TableField(value = "payment_type")
    private Integer paymentType;
    @TableField(value = "qrcode")
    private Integer qrcode;
    @TableField(value = "third_party_id")
    private Long thirdPartyId;
    @TableField(value = "data_url")
    private String dataUrl;

    @TableField(value = "remark")
    private String remark;

    @TableField(value = "order_type")
    private Integer orderType;

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
