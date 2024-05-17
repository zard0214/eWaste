package uk.shef.msc8.ewaste.domain.user.repository.facade;

import uk.shef.msc8.ewaste.domain.user.entity.UserRole;
import uk.shef.msc8.ewaste.domain.user.repository.po.UserRolePO;

import java.util.List;
import java.util.Optional;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 03:24
 */
public interface UserRoleRepository {

    List<UserRolePO> getUserRoleByUserId(Long id);

    UserRolePO saveUserRole(UserRolePO userRole);

    Integer removeUserRole(UserRolePO userRole);
}
