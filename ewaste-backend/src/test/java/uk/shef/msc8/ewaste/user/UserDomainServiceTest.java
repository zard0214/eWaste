package uk.shef.msc8.ewaste.user;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import uk.shef.msc8.ewaste.domain.user.entity.User;
import uk.shef.msc8.ewaste.domain.user.entity.valueobject.RoleType;
import uk.shef.msc8.ewaste.domain.user.repository.facade.RoleRepository;
import uk.shef.msc8.ewaste.domain.user.repository.facade.UserRepository;
import uk.shef.msc8.ewaste.domain.user.repository.facade.UserRoleRepository;
import uk.shef.msc8.ewaste.domain.user.repository.po.RolePO;
import uk.shef.msc8.ewaste.domain.user.repository.po.UserPO;
import uk.shef.msc8.ewaste.domain.user.repository.po.UserRolePO;
import uk.shef.msc8.ewaste.domain.user.service.UserDomainService;
import uk.shef.msc8.ewaste.domain.user.service.UserFactory;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

public class UserDomainServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private UserFactory userFactory;

    @Mock
    private UserRoleRepository userRoleRepository;

    @Mock
    private RoleRepository roleRepository;

    @InjectMocks
    private UserDomainService userDomainService;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testExistsByEmail() {
        String email = "test@example.com";

        when(userRepository.existsByEmail(email)).thenReturn(true);

        boolean result = userDomainService.existsByEmail(email);

        // if result is true
        assertTrue(result);

        verify(userRepository, times(1)).existsByEmail(email);
    }

    @Test
    public void testFindById() {
        Long userId = 1L;

        UserPO expectedUserPO = new UserPO();
        expectedUserPO.setId(1L);
        expectedUserPO.setUserName("111");

        when(userRepository.findById(userId)).thenReturn(expectedUserPO);

        List<UserRolePO> userRolePOs = new ArrayList<>();
        UserRolePO userRole = new UserRolePO();
        userRole.setRoleId(1L);
        userRolePOs.add(userRole);

        when(userRoleRepository.getUserRoleByUserId(userId)).thenReturn(userRolePOs);

        List<RolePO> rolePOs = new ArrayList<>();
        RolePO rolePO = new RolePO();
        rolePO.setId(1L);
        rolePOs.add(rolePO);

        when(roleRepository.getRoleById(anyLong())).thenReturn(rolePOs.get(0));

        UserPO result = userDomainService.findById(userId);

        assertEquals(expectedUserPO, result);

        verify(userRepository, times(1)).findById(userId);
        verify(userRoleRepository, times(1)).getUserRoleByUserId(userId);
        verify(roleRepository, times(userRolePOs.size())).getRoleById(anyLong());
    }

    @Test
    public void testFindByEmail() {
        String email = "test@example.com";

        UserPO mockUser = new UserPO();
        mockUser.setId(1L);
        mockUser.setEmail(email);

        UserRolePO mockUserRole = new UserRolePO();
        mockUserRole.setRoleId(1L);
        mockUserRole.setUserId(1L);

        RolePO mockRole = new RolePO();
        mockRole.setId(1L);
        mockRole.setRoleCode("ROLE_USER");

        when(userRepository.getUserByEmail(email)).thenReturn(mockUser);

        when(userRoleRepository.getUserRoleByUserId(1L)).thenReturn(Collections.singletonList(mockUserRole));

        when(roleRepository.getRoleById(1L)).thenReturn(mockRole);

        UserPO result = userDomainService.findByEmail(email);

        assertEquals(mockUser, result);

        verify(userRepository, times(1)).getUserByEmail(email);
        verify(userRoleRepository, times(1)).getUserRoleByUserId(1L);
        verify(roleRepository, times(1)).getRoleById(1L);
    }


    @Test
    public void testExistsByLoginName() {
        String loginNameExists = "existingUser";
        String loginNameNotExists = "newUser";

        when(userRepository.existsByLoginName(loginNameExists)).thenReturn(true);

        boolean existsExisting = userDomainService.existsByLoginName(loginNameExists);
        assertTrue(existsExisting);

        when(userRepository.existsByLoginName(loginNameNotExists)).thenReturn(false);

        boolean existsNotExisting = userDomainService.existsByLoginName(loginNameNotExists);
        assertFalse(existsNotExisting);

        verify(userRepository, times(1)).existsByLoginName(loginNameExists);
        verify(userRepository, times(1)).existsByLoginName(loginNameNotExists);
    }

    @Test
    public void testRegisterUser() {
        UserPO userPO = new UserPO();
        userPO.setId(1L);
        userPO.setUserName("Test User");
        userPO.setEmail("test@example.com");

        when(userRepository.saveUser(userPO)).thenReturn(userPO);

        UserPO registeredUser = userDomainService.registerUser(userPO);

        assertNotNull(registeredUser);

        verify(userRepository, times(1)).saveUser(userPO);
    }

    @Test
    public void testUpdateExistingUser() {
        UserPO user = new UserPO();
        user.setId(1L);
        user.setUserName("user");

        when(userRepository.updateUser(any(UserPO.class))).thenReturn(user);

        UserPO updatedUser = userDomainService.updateExistingUser(user);

        verify(userRepository, times(1)).updateUser(any(UserPO.class));

        assertEquals(user.getId(), updatedUser.getId());
        assertEquals(user.getUserName(), updatedUser.getUserName());
    }

    @Test
    public void testFindUserByPrimaryKey() {
        UserPO userPO = new UserPO();
        userPO.setId(1L);
        userPO.setUserName("user");

        when(userRepository.findById(1L)).thenReturn(userPO);

        User user = new User();
        user.setId(1L);
        user.setUserName("user");
        when(userFactory.getUser(userPO)).thenReturn(user);

        User foundUser = userDomainService.findUserByPrimaryKey(1L);

        verify(userRepository, times(1)).findById(1L);
        verify(userFactory, times(1)).getUser(userPO);

        assertEquals(user.getId(), foundUser.getId());
        assertEquals(user.getUserName(), foundUser.getUserName());
    }

    @Test
    public void testGetUserCountPerRole() {
        List<UserPO> userList = new ArrayList<>();

        when(userRepository.getAllUsers()).thenReturn(userList);

        List<UserRolePO> userRoleList = new ArrayList<>();

        when(userRoleRepository.getUserRoleByUserId(anyLong())).thenReturn(userRoleList);

        RolePO userRolePO = new RolePO();
        userRolePO.setRoleCode(RoleType.USER.getCode());
        RolePO staffRolePO = new RolePO();
        staffRolePO.setRoleCode(RoleType.STAFF.getCode());
        RolePO adminRolePO = new RolePO();
        adminRolePO.setRoleCode(RoleType.ADMIN.getCode());

        when(roleRepository.getRoleById(anyLong())).thenReturn(userRolePO).thenReturn(staffRolePO).thenReturn(adminRolePO);

        List<Integer> userCountPerRole = userDomainService.getUserCountPerRole();

        verify(userRepository, times(1)).getAllUsers();
        verify(userRoleRepository, times(userList.size())).getUserRoleByUserId(anyLong());
        verify(roleRepository, times(userList.size() * 3)).getRoleById(anyLong());

        assertNotNull(userCountPerRole);
        assertEquals(0, userCountPerRole.get(0).intValue());
        assertEquals(0, userCountPerRole.get(1).intValue());
        assertEquals(0, userCountPerRole.get(2).intValue());
    }

    @Test
    public void testGetUserDetails() {
        List<UserPO> userList = new ArrayList<>();

        when(userRepository.getAllUsers()).thenReturn(userList);


        List<UserRolePO> userRoleList = new ArrayList<>();

        when(userRoleRepository.getUserRoleByUserId(anyLong())).thenReturn(userRoleList);

        RolePO userRolePO = new RolePO();
        userRolePO.setRoleCode(RoleType.USER.getCode());
        RolePO staffRolePO = new RolePO();
        staffRolePO.setRoleCode(RoleType.STAFF.getCode());

        when(roleRepository.getRoleById(anyLong())).thenReturn(userRolePO).thenReturn(staffRolePO);

        HashMap<String, Integer> userDetails = userDomainService.getUserDetails();

        verify(userRepository, times(1)).getAllUsers();
        verify(userRoleRepository, times(userList.size())).getUserRoleByUserId(anyLong());
        verify(roleRepository, times(userList.size() * 2)).getRoleById(anyLong());

        assertNotNull(userDetails);
        assertEquals(userList.size(), userDetails.get("Total Users").intValue());
        assertEquals(0, userDetails.get("Registered Users").intValue());
        assertEquals(0, userDetails.get("Total Staff").intValue());
    }

}
