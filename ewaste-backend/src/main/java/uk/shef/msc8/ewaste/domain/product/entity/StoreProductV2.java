package uk.shef.msc8.ewaste.domain.product.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 25/04/2024 12:02
 */
@Data
public class StoreProductV2 {

    private Long id;

    private Long storeId;
    private String storeName;
    private String brandName;
    private String seriesName;
    private Double expectedValue;
}
