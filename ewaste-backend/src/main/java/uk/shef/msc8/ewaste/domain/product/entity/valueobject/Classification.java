package uk.shef.msc8.ewaste.domain.product.entity.valueobject;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/04/2024 14:12
 */
@Getter
@AllArgsConstructor
public enum Classification {

    /**
     *
     */
    CURRENT(1, "current"),
    /**
     *
     */
    RECYCLE(2, "recycle"),
    /**
     *
     */
    RARE(3, "rare"),
    /**
     *
     */
    UNKNOWN(4, "unknown"),
    /**
     *
     */
    UNWANTED(5,"unwanted");


    final int code;


    final String name;
}
