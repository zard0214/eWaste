package uk.shef.msc8.ewaste.domain.user.repository.po;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 03:07
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("t_user_token")
public class UserTokenPO {

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    @TableField(value = "version")
    private Integer version;

    @TableField(value = "login_name")
    private String loginName;
    @TableField(value = "user_name")
    private String userName;
    @TableField(value = "user_id")
    private Long userId;
    @TableField(value = "login_ip")
    private String loginIp;
    @TableField(value = "login_location")
    private String loginLocation;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @TableField(value = "login_time")
    private Date loginTime;
    @TableField(value = "access_token")
    private String accessToken;
    @TableField(value = "refresh_token")
    private String refreshToken;
    @TableField(value = "token_type")
    private String tokenType;
    @TableField(value = "access_token_validity")
    private Integer accessTokenValidity;
    @TableField(value = "refresh_token_validity")
    private Integer refreshTokenValidity;
    @TableField(value = "status")
    private Integer status;

    @TableField(value = "creator")
    private String creator;
    @TableField(value = "creator_id")
    private Long creatorId;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @TableField(value = "gmt_created")
    private Date gmtCreated;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @TableField(value = "gmt_modified")
    private Date gmtModified;
    @TableField(value = "last_operator")
    private String lastOperator;
    @TableField(value = "last_operator_id")
    private Long lastOperatorId;
    @TableField(value = "is_deleted")
    private Integer isDeleted;
}
