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
public enum Condition {

    /**
     *
     */
    NEW(0, "NEW"),
    /**
     *
     */
    NEW_WITHOUT_BOX(1, "NEW_WITHOUT_BOX"),
    /**
     *
     */
    VERY_GOOD(2, "VERY_GOOD"),
    /**
     *
     */
    GOOD(3, "GOOD"),
    /**
     *
     */
    SATISFACTORY(4, "SATISFACTORY"),
    /**
     *
     */
    BAD(5, "BAD");


    final int code;


    final String name;
}
