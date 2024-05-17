package uk.shef.msc8.ewaste.domain.user.service;

import com.github.pagehelper.util.StringUtil;
import com.xiaoleilu.hutool.util.StrUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import uk.shef.msc8.ewaste.domain.user.entity.User;
import uk.shef.msc8.ewaste.domain.user.entity.valueobject.RoleType;
import uk.shef.msc8.ewaste.domain.user.repository.facade.RoleRepository;
import uk.shef.msc8.ewaste.domain.user.repository.facade.UserRepository;
import uk.shef.msc8.ewaste.domain.user.repository.facade.UserRoleRepository;
import uk.shef.msc8.ewaste.domain.user.repository.po.UserPO;
import uk.shef.msc8.ewaste.domain.user.repository.po.UserRolePO;
import uk.shef.msc8.ewaste.infrastructure.exception.BizException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import javax.annotation.Resource;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 03:45
 */
@Service
@Slf4j
public class UserDomainService {

    @Resource
    private UserFactory userFactory;

    @Resource
    private UserRepository userRepository;

    @Resource
    public UserRoleRepository userRoleRepository;

    @Resource
    public RoleRepository roleRepository;

    @Resource
    private BCryptPasswordEncoder passwordEncoder;

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public UserPO findById(Long id) {
        var userPO = userRepository.findById(id);
        if(null != userPO){
            var userRole = userRoleRepository.getUserRoleByUserId(userPO.getId());
            userRole.stream().forEach(item -> {
                var role = roleRepository.getRoleById(item.getRoleId());
                userPO.addRole(role);
            });
        }
        return userPO;
    }

    public UserPO findByEmail(String email) {
        if(StringUtils.isEmpty(email))
            throw new BizException("Email is empty");
        var userByEmail = userRepository.getUserByEmail(email);
        if(null != userByEmail){
            var userRole = userRoleRepository.getUserRoleByUserId(userByEmail.getId());
            userRole.stream().forEach(item -> {
                var role = roleRepository.getRoleById(item.getRoleId());
                userByEmail.addRole(role);
            });
        }
        return userByEmail;
    }

    public boolean existsByLoginName(String loginName) {
        return userRepository.existsByLoginName(loginName);
    }

    public UserPO findByLoginName(String loginName) {
        var userByEmail = userRepository.getUserByLoginName(loginName);
        if(null != userByEmail){
            var userRole = userRoleRepository.getUserRoleByUserId(userByEmail.getId());
            userRole.stream().forEach(item -> {
                var role = roleRepository.getRoleById(item.getRoleId());
                userByEmail.addRole(role);
            });
        }
        return userByEmail;
    }

    @Transactional
    public UserPO registerNewUser(UserPO user, RoleType roleType) {
        var userPO = userRepository.saveUser(user);
        var rolePO = roleRepository.getRoleByCode(roleType.getCode());
        UserRolePO userRole = new UserRolePO();
        userRole.setRoleId(rolePO.getId());
        userRole.setUserId(userPO.getId());
        userRoleRepository.saveUserRole(userRole);
        return userPO;
    }

    public UserPO registerUser(UserPO user) {
        var userPO = userRepository.saveUser(user);
        return userPO;
    }


    public void changePwd(String loginName, String email, String phone, String newPassword) {
        var userPO = findByLoginName(loginName);
        if (StrUtil.isEmpty(newPassword)) {
            throw new BizException("new password could not be null");
        }
        if (null == userPO) {
            throw new BizException("user does not exist");
        }
        if(!StrUtil.equals(email, userPO.getEmail()) || !StrUtil.equals(phone, userPO.getPhone())){
            throw new BizException("email or phone is incorrect");
        }
        userPO.setPassword(passwordEncoder.encode(newPassword));
        updateExistingUser(userPO);
    }

    public UserPO updateExistingUser(UserPO user) {
        return userRepository.updateUser(user);
    }


    public User findUserByPrimaryKey(Long id) {
        var userPO = findById(id);
        if (null == userPO) {
            throw new BizException("user does not exist");
        }
        return userFactory.getUser(userPO);
    }

    // Logic that gets users information and returns it
    public List<User> findAllUsers(){
        List<UserPO> userList = userRepository.getAllUsers();
        List<User> users = new ArrayList<>();

        for (UserPO userPO : userList) {
            var userRole = userRoleRepository.getUserRoleByUserId(userPO.getId());

            userRole.stream().forEach(item -> {
                var role = roleRepository.getRoleById(item.getRoleId());
                userPO.addRole(role);
            });

            User user = userFactory.getUser(userPO);
            users.add(user);
        }
        return users;
    }

    public void addUserRole(Long id) {
        var userPO = findById(id);
        if (null == userPO) {
            throw new BizException("account does not exist");
        }
        var userRoleList = userRoleRepository.getUserRoleByUserId(userPO.getId());
        userRoleList.stream().forEach(userRolePO -> {
            var role = roleRepository.getRoleById(userRolePO.getRoleId());
            if(role.getRoleCode() == RoleType.USER.getCode()){
                throw new BizException("account already have user role");
            }
        });

        var rolePO = roleRepository.getRoleByCode(RoleType.USER.getCode());
        UserRolePO userRole = new UserRolePO();
        userRole.setRoleId(rolePO.getId());
        userRole.setUserId(userPO.getId());
        userRoleRepository.saveUserRole(userRole);
    }

    public void addStaffRole(Long id) {
        var userPO = findById(id);
        if (null == userPO) {
            throw new BizException("account does not exist");
        }
        var userRoleList = userRoleRepository.getUserRoleByUserId(userPO.getId());
        userRoleList.stream().forEach(userRolePO -> {
            var role = roleRepository.getRoleById(userRolePO.getRoleId());
            if(role.getRoleCode() == RoleType.STAFF.getCode()){
                throw new BizException("account already have staff role");
            }
        });

        var rolePO = roleRepository.getRoleByCode(RoleType.STAFF.getCode());
        UserRolePO userRole = new UserRolePO();
        userRole.setRoleId(rolePO.getId());
        userRole.setUserId(userPO.getId());
        userRoleRepository.saveUserRole(userRole);
    }

    public void removeStaffRole(Long id) {
        var userPO = findById(id);
        if (null == userPO) {
            throw new BizException("account does not exist");
        }
        var userRoleList = userRoleRepository.getUserRoleByUserId(userPO.getId());
        userRoleList.stream().forEach(userRolePO -> {
            var role = roleRepository.getRoleById(userRolePO.getRoleId());
            if(role.getRoleCode().equals(RoleType.STAFF.getCode())){
                var flag = userRoleRepository.removeUserRole(userRolePO);
            }
        });
    }

    public List<Integer> getUserCountPerRole() {
        List<UserPO> userList = userRepository.getAllUsers();
        List<Integer> userCountList = new ArrayList<>();
        userCountList.add(0);
        userCountList.add(0);
        userCountList.add(0);
        for (UserPO userPO : userList) {
            var userRoleList = userRoleRepository.getUserRoleByUserId(userPO.getId());
            userRoleList.stream().forEach(item -> {
                var role = roleRepository.getRoleById(item.getRoleId());
                if(role.getRoleCode().equals(RoleType.USER.getCode())){
                    userCountList.set(0, userCountList.get(0)+1);
                }
                else if(role.getRoleCode().equals(RoleType.STAFF.getCode())){
                    userCountList.set(1, userCountList.get(1)+1);
                }
                else if(role.getRoleCode().equals(RoleType.ADMIN.getCode())){
                    userCountList.set(2, userCountList.get(2)+1);
                }
            });
        }
        return userCountList;
    }

    public HashMap<String, Integer> getUserDetails() {
        List<UserPO> userList = userRepository.getAllUsers();
        HashMap<String, Integer> hashMap = new HashMap<>();
        hashMap.put("Total Users", userList.size());
        int userCount = 0;
        int staffCount = 0;
        for (UserPO userPO : userList) {
            boolean hasUserRole = false;
            var userRoleList = userRoleRepository.getUserRoleByUserId(userPO.getId());
            for (UserRolePO userRole: userRoleList){
                var role = roleRepository.getRoleById(userRole.getRoleId());
                if (role.getRoleCode().equals(RoleType.USER.getCode())) {
                    hasUserRole = true;
                } else if (role.getRoleCode().equals(RoleType.STAFF.getCode())) {
                    staffCount++;
                    hasUserRole = false;
                } else { 
                    hasUserRole = false;
                }
            }
            if (hasUserRole) {
                userCount++;
            }
        }
        hashMap.put("Registered Users", userCount);
        hashMap.put("Total Staff", staffCount);
        return hashMap;
    }
}