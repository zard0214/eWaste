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
public enum VALUE {

    /**
     *
     */
    HIGH(0, "High"),
    /**
     *
     */
    MEDIUM(1, "MEDIUM"),
    /**
     *
     */
    LOW(2, "LOW");


    final int code;


    final String name;
}
