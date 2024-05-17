package uk.shef.msc8.ewaste.domain.user.repository.facade;


import uk.shef.msc8.ewaste.domain.user.repository.po.RolePO;

import java.util.List;
import java.util.Optional;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 03:24
 */
public interface RoleRepository {

    RolePO getRoleById(Long id);

    RolePO getRoleByCode(String code);
}
