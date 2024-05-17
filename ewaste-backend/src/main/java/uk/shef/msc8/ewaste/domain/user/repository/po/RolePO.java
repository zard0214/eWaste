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

import java.util.Date;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 07:02
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("t_role")
public class RolePO {

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    @TableField(value = "version")
    private Integer version;

    @TableField(value = "role_name")
    private String roleName;
    @TableField(value = "role_code")
    private String roleCode;
    @TableField(value = "data_scope")
    private String dataScope;
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
}
