package uk.shef.msc8.ewaste.domain.product.entity.valueobject;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 25/04/2024 15:08
 */
@Getter
@AllArgsConstructor
public enum Colour {

    /**
     *
     */
    RED(1, "red"),
    /**
     *
     */
    WHITE(2, "white"),
    /**
     *
     */
    BLACK(3, "black"),
    /**
     *
     */
    GREEN(4, "green"),
    /**
     *
     */
    YELLOW(5, "yellow"),
    /**
     *
     */
    BLUE(6, "blue"),
    /**
     *
     */
    PURPLE(7, "purple"),
    /**
     *
     */
    GREY(8, "grey"),
    /**
     *
     */
    BROWN(9, "brown"),
    /**
     *
     */
    PINK(10, "pink"),
    /**
     *
     */
    GOLD(11, "gold"),
    /**
     *
     */
    ORANGE(12, "orange");


    final int code;


    final String name;
}

