package uk.shef.msc8.ewaste.domain.user.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import uk.shef.msc8.ewaste.infrastructure.auth.AuthProvider;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 03:35
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {

    // Field for id 
    private Long Id;
    private Integer version;
    private Integer gender;
    private String loginName;
    private String password;
    private String providerId;
    private AuthProvider provider;
    private String userCode;
    private String userName;
    private String imageUrl;
    private String phone;
    private String email;
    private String status;
    private String remark;
    private String creator;
    private Long creatorId;
    private Date gmtCreated;
    private Date gmtModified;
    private String lastOperator;
    private Long lastOperatorId;
    private Integer isDeleted;


    private Set<Role> authorities = new HashSet<>();
}
