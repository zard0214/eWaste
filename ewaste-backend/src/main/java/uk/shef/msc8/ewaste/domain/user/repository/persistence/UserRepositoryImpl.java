package uk.shef.msc8.ewaste.domain.user.repository.persistence;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import uk.shef.msc8.ewaste.domain.user.repository.facade.UserRepository;
import uk.shef.msc8.ewaste.domain.user.repository.mapper.UserMapper;
import uk.shef.msc8.ewaste.domain.user.repository.po.UserPO;


/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 03:16
 */
@Service
public class UserRepositoryImpl extends ServiceImpl<UserMapper, UserPO> implements UserRepository {

    @Override
    public UserPO getUserByLoginName(String loginName) {
        return baseMapper.getUserByLoginName(loginName);
    }

    @Override
    public UserPO getUserByEmail(String email) {
        return baseMapper.getUserByEmail(email);
    }

    public UserPO saveUser(UserPO newUser) {
        baseMapper.insert(newUser);
        return newUser;
    }

    @Override
    public boolean existsByEmail(String email) {
        var user = baseMapper.getUserByEmail(email);
        if(null == user)
            return false;
        return true;
    }

    @Override
    public boolean existsByLoginName(String loginName) {
        var user = baseMapper.getUserByLoginName(loginName);
        if(null == user)
            return false;
        return true;
    }

    @Override
    public UserPO findById(Long id) {
        return baseMapper.selectById(id);
    }

    @SuppressWarnings("deprecation")
    @Override
    public UserPO updateUser(UserPO existingUser) {
        var userPO = baseMapper.selectById(existingUser.getId());
        if(!StringUtils.isEmpty(existingUser.getUserName())){
            userPO.setUserName(existingUser.getUserName());
        }
        if(!StringUtils.isEmpty(existingUser.getPhone())){
            userPO.setPhone(existingUser.getPhone());
        }
        if(!StringUtils.isEmpty(existingUser.getPassword())){
            userPO.setPassword(existingUser.getPassword());
        }
        if(!StringUtils.isEmpty(existingUser.getImageUrl())){
            userPO.setImageUrl(existingUser.getImageUrl());
        }
        if(!StringUtils.isEmpty(existingUser.getGender())){
            userPO.setGender(existingUser.getGender());
        }
        if(!StringUtils.isEmpty(existingUser.getGmtModified())){
            userPO.setGmtModified(existingUser.getGmtModified());
        }
        if(!StringUtils.isEmpty(existingUser.getLoginName())){
            userPO.setLoginName(existingUser.getLoginName());
        }
        if(!StringUtils.isEmpty(existingUser.getEmail())){
            userPO.setEmail(existingUser.getEmail());
        }
        baseMapper.updateById(userPO);
        return existingUser;
    }

    // Main logic that does SQL
    @Override
    public List<UserPO> getAllUsers() {
        return baseMapper.selectList(null);
    }
}
