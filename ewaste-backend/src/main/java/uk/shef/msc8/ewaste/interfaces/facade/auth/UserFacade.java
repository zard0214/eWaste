package uk.shef.msc8.ewaste.interfaces.facade.auth;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import uk.shef.msc8.ewaste.application.UserApplicationService;
import uk.shef.msc8.ewaste.domain.user.entity.Role;
import uk.shef.msc8.ewaste.domain.user.entity.User;
import uk.shef.msc8.ewaste.domain.user.entity.valueobject.RoleType;
import uk.shef.msc8.ewaste.domain.user.repository.po.UserPO;
import uk.shef.msc8.ewaste.infrastructure.auth.CurrentUser;
import uk.shef.msc8.ewaste.infrastructure.auth.UserPrincipal;
import uk.shef.msc8.ewaste.infrastructure.common.resp.Response;
import uk.shef.msc8.ewaste.infrastructure.common.resp.ResponseDTO;
import uk.shef.msc8.ewaste.infrastructure.exception.ResourceNotFoundException;
import uk.shef.msc8.ewaste.interfaces.dto.UserDTO;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 03:43
 */
@RestController
@Slf4j
public class UserFacade {

    @Resource
    private UserApplicationService userApplicationService;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_STAFF') or hasRole('ROLE_ADMIN')")
    public ResponseDTO<User> getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        var user = userApplicationService.findUserByPrimaryKey(userPrincipal.getId());
        if(user == null)
            throw new ResourceNotFoundException("User", "id", userPrincipal.getId());
        return Response.success(user);
    }

    @PostMapping("/user/addUserRole")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<User> addUserRole(@RequestBody UserDTO request) {
        userApplicationService.addUserRole(request.getId());
        return Response.success();
    }

    @PostMapping("/user/changepwd")
    public ResponseDTO changePwd(@RequestBody UserDTO request) {
        userApplicationService.changePwd(request);
        return Response.success();
    }

    @PostMapping("/user/upgrade")
    public ResponseDTO upgradeUserToStaff(@RequestBody UserDTO request) {
        userApplicationService.addStaffRole(request.getId());
        return Response.success();
    }

    @PostMapping("/user/downgrade")
    public ResponseDTO downgradeUserToStaff(@RequestBody UserDTO request) {
        userApplicationService.removeStaffRole(request.getId());
        return Response.success();
    }

    @PostMapping("/user/update")
    public ResponseDTO update(@RequestBody UserDTO request) {
        UserPO user = new UserPO();
        BeanUtils.copyProperties(request, user);
        userApplicationService.updateExistingUser(user);
        return Response.success();
    }

    // Returns list of users after a GET request
    @GetMapping("/users")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<List<User>> getAllUsers() {
        List<User> users = userApplicationService.findAllUsers();
        
        if (users.isEmpty()) {
            throw new ResourceNotFoundException("Users", "No users found", users);
        }
        
        return Response.success(users);
    }

    @GetMapping("/users/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseDTO<User> getUserById(@PathVariable Long id) {
        User user = userApplicationService.findUserByPrimaryKey(id);

        if (user == null) {
            throw new ResourceNotFoundException("User", "No user found", user);
        }
        
        return Response.success(user);
    }

    @GetMapping("/users/roledata")
    public ResponseDTO<List<Integer>> getUserCountPerRole() {
        List<Integer> userCountList = userApplicationService.getUserCountPerRole();

        if(userCountList == null){
            throw new ResourceNotFoundException("User", "No users found", userCountList);
        }

        return Response.success(userCountList);
    }

    @GetMapping("/users/totalstaff")
    public ResponseDTO<HashMap<String, Integer>> getTotalStaffAndRegisteredUserCount() {
        // List<Integer> userCountList = userApplicationService.getUserCountPerRole();
        // HashMap<String, Integer> hashMap = new HashMap<>();
        // hashMap.put(null, null)
        HashMap<String, Integer> hashMap = userApplicationService.getUserDetails();
        if(hashMap == null){
            throw new ResourceNotFoundException("User", "No users found", hashMap);
        }

        return Response.success(hashMap);
    }

    @PutMapping("/users/{id}")
    public ResponseDTO<UserPO> updateUser(@PathVariable Long id, @RequestBody UserPO user) {
        UserPO userTemp = new UserPO();
        BeanUtils.copyProperties(user, userTemp);
        if (!user.getId().equals(id)) {
            throw new IllegalArgumentException("User ID in the URL and request body do not match");
          }
        UserPO savedUser = userApplicationService.updateExistingUser(userTemp);
        if(savedUser != null){
            return Response.success(savedUser);
        }
        else {
            throw new ResourceNotFoundException("User not found with ID: " + id, null, savedUser);
      }
    }

    @PostMapping("/users/add")
    public ResponseDTO<UserPO> saveUser(@RequestBody UserPO user){
        UserPO savedUser = userApplicationService.registerUser(user);
        if (savedUser != null) {
            return Response.success(savedUser);
        } else {
            return null;
        }
    }
}
