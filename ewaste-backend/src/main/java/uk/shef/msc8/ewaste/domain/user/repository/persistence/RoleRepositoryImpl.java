package uk.shef.msc8.ewaste.domain.user.repository.persistence;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.user.entity.Role;
import uk.shef.msc8.ewaste.domain.user.repository.facade.RoleRepository;
import uk.shef.msc8.ewaste.domain.user.repository.mapper.RoleMapper;
import uk.shef.msc8.ewaste.domain.user.repository.po.RolePO;

import java.util.Optional;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 03:16
 */
@Service
public class RoleRepositoryImpl extends ServiceImpl<RoleMapper, RolePO> implements RoleRepository {

    @Override
    public RolePO getRoleById(Long id) {
        return baseMapper.getRoleById(id);
    }

    @Override
    public RolePO getRoleByCode(String code) {
        return baseMapper.getRoleByCode(code);
    }

}
