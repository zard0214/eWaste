package uk.shef.msc8.ewaste.domain.user.entity;

import lombok.Data;

import java.util.Date;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 03:21
 */
@Data
public class UserToken {

    private Long id;
    private Integer version;

    private String loginName;
    private String userName;
    private Long userId;
    private String loginIp;
    private String loginLocation;
    private Date loginTime;
    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private Integer accessTokenValidity;
    private Integer refreshTokenValidity;
    private Integer status;

    private String creator;
    private Long creatorId;
    private Date gmtCreated;
    private Date gmtModified;
    private String lastOperator;
    private Long lastOperatorId;
    private Integer isDeleted;
}
