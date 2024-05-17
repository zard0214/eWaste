package uk.shef.msc8.ewaste.interfaces.dto;

import lombok.Data;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductV2PO;

import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 29/02/2024 14:54
 */
@Data
public class OrderDTO extends BaseQuery{

    private Long id;

    private Long receiverId;

    private ProductV2PO productV2PO;

    private Long productId;

    private Integer orderType;
    private Integer status;
    private Integer paymentType;

    private String receiverPhone;
    private String receiverAddress;

    private BigDecimal totalAmount = new BigDecimal(0);
    private BigDecimal realPayAmount = new BigDecimal(0);
    private BigDecimal postageAmount = new BigDecimal(0);
    private BigDecimal serviceFeeAmount = new BigDecimal(0);

    private Integer qrcode;
    private String thirdParty;
    private Long thirdPartyId;
    private String dataUrl;
    private String remark;

    private String lastOperator;

}
