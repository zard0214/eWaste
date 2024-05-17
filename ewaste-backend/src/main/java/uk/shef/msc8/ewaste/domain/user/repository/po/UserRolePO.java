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
 * @date Created in 16/02/2024 07:02
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("t_user_role")
public class UserRolePO {

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    @TableField(value = "version")
    private Integer version;

    @TableField(value = "user_id")
    private Long userId;
    @TableField(value = "role_id")
    private Long roleId;

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
