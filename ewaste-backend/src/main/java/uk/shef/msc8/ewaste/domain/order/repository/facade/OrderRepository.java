package uk.shef.msc8.ewaste.domain.order.repository.facade;

import com.github.pagehelper.PageInfo;
import uk.shef.msc8.ewaste.domain.order.repository.po.OrderPO;

import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 11/03/2024 03:03
 */
public interface OrderRepository {

    PageInfo<OrderPO> selectPageList(Long receiverId, Integer pageNo, Integer pageSize);

    OrderPO saveOrder(OrderPO newUser);

    OrderPO selectById(Long orderId);

    List<OrderPO> selectAll();

    void update(OrderPO orderPO);

    OrderPO selectByProductId(Long productId);

    List<OrderPO> selectOrderByType(Long receiverId, Integer orderType);
}
