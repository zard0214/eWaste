package uk.shef.msc8.ewaste.domain.user.repository.persistence;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.user.repository.facade.UserTokenRepository;
import uk.shef.msc8.ewaste.domain.user.repository.mapper.UserTokenMapper;
import uk.shef.msc8.ewaste.domain.user.repository.po.UserTokenPO;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 03:16
 */
@Service
public class UserTokenRepositoryImpl extends ServiceImpl<UserTokenMapper, UserTokenPO> implements UserTokenRepository {
}
