package uk.shef.msc8.ewaste.domain.order.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uk.shef.msc8.ewaste.application.UserApplicationService;
import uk.shef.msc8.ewaste.domain.order.entity.Order;
import uk.shef.msc8.ewaste.domain.order.entity.valueobject.OrderEvent;
import uk.shef.msc8.ewaste.domain.order.repository.facade.OrderRepository;
import uk.shef.msc8.ewaste.domain.order.repository.po.OrderPO;
import uk.shef.msc8.ewaste.domain.order.statemachine.core.OrderStateMachineEngineFactory;
import uk.shef.msc8.ewaste.domain.order.statemachine.fsm.OrderContext;
import uk.shef.msc8.ewaste.infrastructure.auth.config.UserInfoThreadHolder;
import uk.shef.msc8.ewaste.infrastructure.common.helper.PageUtil;
import uk.shef.msc8.ewaste.infrastructure.common.resp.PageResponse;
import uk.shef.msc8.ewaste.infrastructure.common.resp.Response;
import uk.shef.msc8.ewaste.interfaces.dto.OrderDTO;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 11/03/2024 03:13
 */
@Service
@Slf4j
public class OrderDomainService {

    @Resource
    private OrderRepository orderRepository;

    @Resource
    private UserApplicationService userApplicationService;

    @Resource
    private OrderFactory orderFactory;

    @Resource
    private OrderStateMachineEngineFactory orderSTFactory;

    @Transactional
    public Long saveOrder(Order order) {
        var user = userApplicationService.findUserByPrimaryKey(order.getReceiverId());
        if (null == user) {
            throw new RuntimeException("user does not exist");
        }
        order.addUserInfo(user);
        return orderRepository.saveOrder(orderFactory.createOrderPO(order)).getId();
    }

    public void fire(Order order, OrderEvent orderEvent) {
        OrderContext orderContext = new OrderContext(order);
        orderSTFactory.fire(orderContext, orderEvent);
    }

    public PageResponse<List<Order>> selectPageList(Long receiverId, OrderDTO orderDTO, Integer pageNo, Integer pageSize) {
        var orderPageInfo = orderRepository.selectPageList(receiverId, pageNo, pageSize);
        PageUtil pageUtil = new PageUtil();
        pageUtil.setCurrentPage(pageNo);
        pageUtil.setCurPageSize(pageSize);
        pageUtil.setTotalPage(orderPageInfo.getPages());
        pageUtil.setTotalRow(orderPageInfo.getTotal());
        //PO -> ENTITY
        return Response.success(orderFactory.getOrder(orderPageInfo.getList()), pageUtil);
    }

    public List<Order> selectAll(){
        var orderPO = orderRepository.selectAll();
        if(orderPO == null || orderPO.size() == 0)
            return new ArrayList<>();
        return orderFactory.getOrder(orderPO);
    }

    public Order selectById(Long orderId) {
        var orderPO = orderRepository.selectById(orderId);
        if(orderPO == null)
            return null;
        return orderFactory.getOrder(orderPO);
    }

//    public void update(Order order) {
//        orderRepository.update(new OrderPO());
//    }

    public void update(Order order) {
        // Retrieve the existing order from the database
        OrderPO existingOrderPO = orderRepository.selectById(order.getId());
        if (existingOrderPO == null) {
            throw new RuntimeException("Order not found");
        }
//         Update the existing order with the new values
        order.setGmtModified(new Date());
        existingOrderPO.setStatus(order.getStatus());
        existingOrderPO.setLastOperator(order.getLastOperator());
        existingOrderPO.setDataUrl(order.getDataUrl());
        existingOrderPO.setGmtModified(order.getGmtModified());
        // Save the updated order back to the database
        BeanUtils.copyProperties(order, existingOrderPO);
//         Save the updated order back to the database
        orderRepository.update(existingOrderPO);
    }

    public OrderPO selectByProductId(Long productId) {
        var orderPO = orderRepository.selectByProductId(productId);
        if(orderPO == null)
            return null;
        return orderPO;
    }

    public List<Order> selectOrderByType(Long receiverId, Integer orderType) {
        var orderPO = orderRepository.selectOrderByType(receiverId, orderType);
        if(orderPO == null || orderPO.size() == 0)
            return new ArrayList<>();
        return orderFactory.getOrder(orderPO);
    }
}
