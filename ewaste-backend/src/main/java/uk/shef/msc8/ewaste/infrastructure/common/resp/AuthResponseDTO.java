package uk.shef.msc8.ewaste.infrastructure.common.resp;

import lombok.Data;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 29/02/2024 14:52
 */
@Data
public class AuthResponseDTO {

    private String accessToken;
    private String tokenType = "Bearer";

    public AuthResponseDTO(String accessToken) {
        this.accessToken = accessToken;
    }
}
