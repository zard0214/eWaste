package uk.shef.msc8.ewaste.domain.user.repository.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import uk.shef.msc8.ewaste.domain.user.entity.Role;
import uk.shef.msc8.ewaste.domain.user.entity.UserRole;
import uk.shef.msc8.ewaste.domain.user.repository.po.RolePO;

import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 03:17
 */
@Mapper
public interface RoleMapper extends BaseMapper<RolePO> {

    RolePO getRoleById(Long id);

    RolePO getRoleByCode(String code);
}
