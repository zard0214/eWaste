package uk.shef.msc8.ewaste.domain.user.repository.facade;

import org.springframework.stereotype.Repository;
import uk.shef.msc8.ewaste.domain.user.repository.po.UserPO;

import java.util.List;
import java.util.Optional;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 03:24
 */
@Repository
public interface UserRepository {

    UserPO getUserByLoginName(String loginName);

    UserPO getUserByEmail(String email);

    UserPO saveUser(UserPO newUser);

    boolean existsByEmail(String email);

    UserPO findById(Long id);

    UserPO updateUser(UserPO existingUser);

    boolean existsByLoginName(String loginName);

    // Method declaration to return list of users 
    List<UserPO> getAllUsers();
}
