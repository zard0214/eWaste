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
import uk.shef.msc8.ewaste.domain.user.entity.Role;
import uk.shef.msc8.ewaste.infrastructure.auth.AuthProvider;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 03:07
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("t_user")
public class UserPO {

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    @TableField(value = "version")
    private Integer version;

    @TableField(value = "gender")
    private Integer gender;
    @TableField(value = "login_name")
    private String loginName;
    @TableField(value = "password")
    private String password;
    @TableField(value = "provider_id")
    private String providerId;
    @NotNull
    @TableField(value = "provider")
    private AuthProvider provider;
    @TableField(value = "user_code")
    private String userCode;
    @TableField(value = "user_name")
    private String userName;
    @TableField(value = "image_url")
    private String imageUrl;
    @TableField(value = "phone")
    private String phone;
    @TableField(value = "email")
    private String email;
    @TableField(value = "status")
    private String status;
    @TableField(value = "remark")
    private String remark;

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

    @TableField(exist = false)
    private Set<RolePO> authorities = new HashSet<>();

    public void addRole(RolePO role){
        this.getAuthorities().add(role);
    }
}
