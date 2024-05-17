package uk.shef.msc8.ewaste.infrastructure.auth;

import com.xiaoleilu.hutool.lang.Validator;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uk.shef.msc8.ewaste.application.UserApplicationService;
import uk.shef.msc8.ewaste.domain.user.repository.po.UserPO;
import uk.shef.msc8.ewaste.infrastructure.exception.ResourceNotFoundException;

import javax.annotation.Resource;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 29/02/2024 15:15
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Resource
    private UserApplicationService userApplicationService;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String loginName)
            throws UsernameNotFoundException {
        UserPO userPO = null;
        var isEmail = Validator.isEmail(loginName);
        if(isEmail)
            userPO = userApplicationService.findByEmail(loginName);
        else
            userPO = userApplicationService.findByLoginName(loginName);
        if(userPO == null)
            throw new UsernameNotFoundException("User not found with email : " + loginName);
        else {
            return UserPrincipal.create(userPO);
        }
    }

    @Transactional
    public UserDetails loadUserById(Long id) {
        var userPO = userApplicationService.getUserById(id);
        if(userPO == null)
            throw new ResourceNotFoundException("User", "id", id);
        else {
            return UserPrincipal.create(userPO);
        }
    }
}