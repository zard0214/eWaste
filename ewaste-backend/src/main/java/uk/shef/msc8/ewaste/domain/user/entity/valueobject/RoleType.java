package uk.shef.msc8.ewaste.domain.user.entity.valueobject;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 05:55
 */
@Getter
@AllArgsConstructor
public enum RoleType {

    /**
     *
     */
    ADMIN("ROLE_ADMIN", "ADMIN"),

    /**
     *
     */
    STAFF("ROLE_STAFF", "STAFF"),
    /**
     *
     */
    USER("ROLE_USER", "USER");


    final String code;


    final String name;
}
