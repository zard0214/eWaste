package uk.shef.msc8.ewaste.domain.order.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import uk.shef.msc8.ewaste.domain.user.entity.User;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/02/2024 23:14
 */
@Data
public class Order {

    private Long id;
    private Long receiverId;
    private String email;

    private Long productId;
    private Integer status;
    private String receiverPhone;
    private String receiverName;
    private String receiverAddress;

    private BigDecimal totalAmount = new BigDecimal(0);
    private BigDecimal realPayAmount = new BigDecimal(0);
    private BigDecimal postageAmount = new BigDecimal(0);
    private BigDecimal serviceFeeAmount = new BigDecimal(0);
    private Integer paymentType;
    private Integer orderType;
    private Integer qrcode;
    private String thirdParty;
    private Long thirdPartyId;
    private String dataUrl;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date gmtCreated;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date gmtModified;

    private String lastOperator;
    private Long lastOperatorId;

    private String productName;
    private String remark;
    public Order addUserInfo(User user) {
        this.setReceiverPhone(user.getPhone());
        this.setReceiverName(user.getUserName());
        return this;
    }

}
