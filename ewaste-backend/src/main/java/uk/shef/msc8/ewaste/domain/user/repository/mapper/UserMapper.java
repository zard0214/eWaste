package uk.shef.msc8.ewaste.domain.user.repository.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import uk.shef.msc8.ewaste.domain.user.repository.po.UserPO;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 03:17
 */
@Mapper
public interface UserMapper extends BaseMapper<UserPO> {

    UserPO getUserByLoginName(String loginName);

    UserPO getUserByEmail(String email);
}
