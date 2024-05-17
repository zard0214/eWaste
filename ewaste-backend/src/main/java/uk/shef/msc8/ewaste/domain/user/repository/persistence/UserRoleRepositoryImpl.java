package uk.shef.msc8.ewaste.domain.user.repository.persistence;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.user.entity.UserRole;
import uk.shef.msc8.ewaste.domain.user.repository.facade.UserRoleRepository;
import uk.shef.msc8.ewaste.domain.user.repository.mapper.UserRoleMapper;
import uk.shef.msc8.ewaste.domain.user.repository.po.UserRolePO;
import uk.shef.msc8.ewaste.interfaces.assembler.AssemblerFactory;

import java.util.List;
import java.util.Optional;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 03:16
 */
@Service
public class UserRoleRepositoryImpl extends ServiceImpl<UserRoleMapper, UserRolePO> implements UserRoleRepository {
    @Override
    public List<UserRolePO> getUserRoleByUserId(Long userId) {
        return baseMapper.getUserRoleByUserId(userId);
    }

    @Override
    public UserRolePO saveUserRole(UserRolePO userRole) {
        baseMapper.insert(userRole);
        return userRole;
    }

    @Override
    public Integer removeUserRole(UserRolePO userRole) {
        return baseMapper.deleteById(userRole);
    }
}
