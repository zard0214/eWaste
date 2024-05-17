package uk.shef.msc8.ewaste.domain.order.repository.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import uk.shef.msc8.ewaste.domain.order.repository.po.OrderPO;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 11/03/2024 03:00
 */
@Mapper
public interface OrderMapper extends BaseMapper<OrderPO> {

    OrderPO getOrderByReceiverId(Long receiverId);

}
