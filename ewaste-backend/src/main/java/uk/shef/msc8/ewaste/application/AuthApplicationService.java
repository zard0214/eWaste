package uk.shef.msc8.ewaste.application;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import uk.shef.msc8.ewaste.domain.user.entity.valueobject.RoleType;
import uk.shef.msc8.ewaste.domain.user.repository.po.UserPO;
import uk.shef.msc8.ewaste.infrastructure.auth.AuthProvider;
import uk.shef.msc8.ewaste.infrastructure.auth.TokenProvider;
import uk.shef.msc8.ewaste.infrastructure.common.resp.AuthResponseDTO;
import uk.shef.msc8.ewaste.infrastructure.common.resp.Response;
import uk.shef.msc8.ewaste.infrastructure.common.resp.ResponseDTO;
import uk.shef.msc8.ewaste.infrastructure.exception.BadRequestException;
import uk.shef.msc8.ewaste.interfaces.dto.UserDTO;

import javax.annotation.Resource;
import java.net.URI;


/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 03:46
 */
@Service
public class AuthApplicationService {

    @Resource
    private AuthenticationManager authenticationManager;
    @Resource
    private UserApplicationService userApplicationService;
    @Resource
    private PasswordEncoder passwordEncoder;
    @Resource
    private TokenProvider tokenProvider;

    public ResponseDTO login(String loginName, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginName,
                        password
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.createToken(authentication);
        return Response.success(new AuthResponseDTO(token));
    }

    public ResponseDTO registerUser(UserDTO userDTO) {
        if(userApplicationService.existsByEmail(userDTO.getEmail())) {
            throw new BadRequestException("Email address already in use.");
        }
        if(userApplicationService.existsByLoginName(userDTO.getLoginName())) {
            throw new BadRequestException("Login name already in use.");
        }

        UserPO user = new UserPO();
        user.setUserName(userDTO.getUserName());
        user.setLoginName(userDTO.getLoginName());
        user.setEmail(userDTO.getEmail());
        user.setPhone(userDTO.getPhone());
        user.setPassword(userDTO.getPassword());
        user.setProvider(AuthProvider.local);

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        UserPO result = userApplicationService.registerNewUser(user, RoleType.USER);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user/me")
                .buildAndExpand(result.getId()).toUri();
        return Response.success("User registered successfully@");
    }
}
