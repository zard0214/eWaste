package uk.shef.msc8.ewaste.domain.order.repository.persistence;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.order.repository.facade.OrderRepository;
import uk.shef.msc8.ewaste.domain.order.repository.mapper.OrderMapper;
import uk.shef.msc8.ewaste.domain.order.repository.po.OrderPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.SeriesPO;

import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 11/03/2024 03:02
 */
@Service
public class OrderRepositoryImpl extends ServiceImpl<OrderMapper, OrderPO> implements OrderRepository {

    @Override
    public PageInfo<OrderPO> selectPageList(Long receiverId, Integer pageNo, Integer pageSize) {
        PageHelper.startPage(pageNo, pageSize);
        QueryWrapper<OrderPO> queryWrapper = new QueryWrapper<>();
//        queryWrapper.eq("receiver_id", receiverId);
        PageInfo pageInfo = new PageInfo<>(baseMapper.selectList(queryWrapper));
        return pageInfo;
    }

    public List<OrderPO> selectAll(){
        return baseMapper.selectList(null);
    }

    @Override
    public OrderPO saveOrder(OrderPO orderPO) {
        baseMapper.insert(orderPO);
        return orderPO;
    }
    @Override
    public OrderPO selectById(Long orderId) {
        return baseMapper.selectById(orderId);
    }

    @Override
    public void update(OrderPO orderPO) {
        baseMapper.updateById(orderPO);
    }

    @Override
    public OrderPO selectByProductId(Long productId) {
        QueryWrapper<OrderPO> query = new QueryWrapper<>();
        query.eq("product_id", productId);
        var brandsPOS = baseMapper.selectList(query);
        return brandsPOS == null|| brandsPOS.size() == 0 ? null: brandsPOS.get(0);
    }

    @Override
    public List<OrderPO> selectOrderByType(Long receiverId, Integer orderType) {
        QueryWrapper<OrderPO> query = new QueryWrapper<>();
        query.eq("receiver_id", receiverId);
        query.eq("order_type", orderType);
        var brandsPOS = baseMapper.selectList(query);
        return brandsPOS;
    }
}
