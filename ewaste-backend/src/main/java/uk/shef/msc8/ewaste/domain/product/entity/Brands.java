package uk.shef.msc8.ewaste.domain.product.entity;

import lombok.*;

/**
 * @author Siyuan Peng
 * @date Created in 8/03/2024
 */
@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Brands {

    private Long id;

    private String name;
    private String imageUrl;

}
