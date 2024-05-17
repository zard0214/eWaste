package uk.shef.msc8.ewaste.application;

import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.user.entity.User;
import uk.shef.msc8.ewaste.domain.user.entity.valueobject.RoleType;
import uk.shef.msc8.ewaste.domain.user.repository.po.UserPO;
import uk.shef.msc8.ewaste.domain.user.service.UserDomainService;
import uk.shef.msc8.ewaste.interfaces.dto.UserDTO;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;


/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 03:46
 */
@Service
public class UserApplicationService {

    @Resource
    private UserDomainService userDomainService;

    public UserPO getUserById(Long id) {
        return userDomainService.findById(id);
    }

    public UserPO registerNewUser(UserPO user, RoleType roleType) {
        return userDomainService.registerNewUser(user, roleType);
    }

    public UserPO registerUser(UserPO user) {
        return userDomainService.registerUser(user);
    }

    public UserPO updateExistingUser(UserPO user) {
        return userDomainService.updateExistingUser(user);
    }

    public UserPO findByEmail(String email) {
        return userDomainService.findByEmail(email);
    }

    public boolean existsByEmail(String email) {
        return userDomainService.existsByEmail(email);
    }

    public boolean existsByLoginName(String loginName) {
        return userDomainService.existsByLoginName(loginName);
    }

    public UserPO findByLoginName(String loginName) {
        return userDomainService.findByLoginName(loginName);
    }

    public User findUserByPrimaryKey(Long id) {
        return userDomainService.findUserByPrimaryKey(id);
    }
    // Function to return list of users
    public List<User> findAllUsers(){
        return userDomainService.findAllUsers();
    }

    public List<Integer> getUserCountPerRole() {
        return userDomainService.getUserCountPerRole();
    }

    public HashMap<String, Integer> getUserDetails() {
        return userDomainService.getUserDetails();
    }

    public void changePwd(UserDTO request) {
        userDomainService.changePwd(request.getLoginName(), request.getEmail(), request.getPhone(), request.getNewPassword());
    }

    public void addUserRole(Long id) {
        userDomainService.addUserRole(id);
    }

    public void addStaffRole(Long id) {
        userDomainService.addStaffRole(id);
    }

    public void removeStaffRole(Long id) {
        userDomainService.removeStaffRole(id);
    }

}
