package uk.shef.msc8.ewaste.order;

import com.github.pagehelper.PageInfo;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import uk.shef.msc8.ewaste.application.UserApplicationService;
import uk.shef.msc8.ewaste.domain.order.entity.Order;
import uk.shef.msc8.ewaste.domain.order.repository.facade.OrderRepository;
import uk.shef.msc8.ewaste.domain.order.repository.po.OrderPO;
import uk.shef.msc8.ewaste.domain.order.service.OrderDomainService;
import uk.shef.msc8.ewaste.domain.order.service.OrderFactory;
import uk.shef.msc8.ewaste.domain.user.entity.User;
import uk.shef.msc8.ewaste.infrastructure.common.resp.PageResponse;
import uk.shef.msc8.ewaste.interfaces.dto.OrderDTO;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class OrderDomainServiceTest {

    @Mock
    private static OrderRepository orderRepository;
    @Mock
    private UserApplicationService userApplicationService;
    @Mock
    private OrderFactory orderFactory;

    @InjectMocks
    private static OrderDomainService orderDomainService;

    private Order order;

    private Order createSampleOrder() {
        Order order = new Order();
        order.setId(1L);
        order.setReceiverId(1L);
        order.setEmail("example@example.com");
        order.setProductId(200L);
        order.setStatus(1);
        order.setReceiverPhone("1234567890");
        order.setReceiverName("John Doe");
        order.setReceiverAddress("123 Main St");
        order.setTotalAmount(new BigDecimal("100.00"));
        order.setRealPayAmount(new BigDecimal("90.00"));
        order.setPostageAmount(new BigDecimal("10.00"));
        order.setServiceFeeAmount(new BigDecimal("5.00"));
        order.setPaymentType(1);
        order.setOrderType(1);
        order.setQrcode(123456789);
        order.setThirdParty("Third Party");
        order.setThirdPartyId(300L);
        order.setDataUrl("http://example.com");
        order.setGmtCreated(new Date());
        order.setGmtModified(new Date());
        order.setLastOperator("Admin");
        order.setLastOperatorId(999L);
        order.setProductName("Test Product");
        order.setRemark("Test Order");
        return order;
    }



    @Before
    public void setUp(){
        MockitoAnnotations.initMocks(this);
        order = createSampleOrder();
    }

    @Test
    public void testProduct() throws Exception {
    }

    @Test
    public void testSaveOrder() {
        // Mock Order
        Order order = new Order();
        order.setReceiverId(1L);
        // Mock User
        User user = new User();
        user.setId(1L);

        when(userApplicationService.findUserByPrimaryKey(1L)).thenReturn(user);

        // mock OrderPO
        OrderPO orderPO = new OrderPO();
        orderPO.setId(1L);

        when(orderFactory.createOrderPO(any(Order.class))).thenReturn(orderPO);

        when(orderRepository.saveOrder(any(OrderPO.class))).thenReturn(orderPO);

        Long orderId = orderDomainService.saveOrder(order);

        verify(userApplicationService, times(1)).findUserByPrimaryKey(1L);
        verify(orderFactory, times(1)).createOrderPO(any(Order.class));
        verify(orderRepository, times(1)).saveOrder(any(OrderPO.class));

        assertEquals(1L, orderId.longValue());
    }


    @Test
    public void testSelectPageList() {

        Long receiverId = 1L;
        OrderDTO orderDTO = new OrderDTO();
        Integer pageNo = 1;
        Integer pageSize = 10;

        List<Order> orderList = Collections.singletonList(new Order());
        List<OrderPO> orderPOList = Collections.singletonList(new OrderPO());

        PageInfo<OrderPO> orderPageInfo = new PageInfo<>();
        orderPageInfo.setList(orderPOList);
        orderPageInfo.setPages(1);
        orderPageInfo.setTotal(1L);

        when(orderRepository.selectPageList(receiverId, pageNo, pageSize)).thenReturn(orderPageInfo);

        when(orderFactory.getOrder(anyList())).thenReturn(orderList);

        PageResponse<List<Order>> response = orderDomainService.selectPageList(receiverId, orderDTO, pageNo, pageSize);

        verify(orderRepository, times(1)).selectPageList(receiverId, pageNo, pageSize);
        verify(orderFactory, times(1)).getOrder(anyList());

        assertEquals(1, response.getPageUtil().getTotalPage());
    }

    @Test
    public void testSelectAll() {
        List<OrderPO> orderPOList = Collections.singletonList(new OrderPO());

        when(orderRepository.selectAll()).thenReturn(orderPOList);

        List<Order> orderList = Collections.singletonList(new Order());

        when(orderFactory.getOrder(orderPOList)).thenReturn(orderList);

        List<Order> result = orderDomainService.selectAll();

        verify(orderRepository, times(1)).selectAll();
        verify(orderFactory, times(1)).getOrder(orderPOList);

        assertEquals(orderList, result);
    }

    @Test
    public void testSelectById_ExistingOrderId() {
        Long orderId = 1L;

        OrderPO orderPO = new OrderPO();
        orderPO.setId(orderId);

        when(orderRepository.selectById(orderId)).thenReturn(orderPO);

        Order order = new Order();
        order.setId(orderId);

        when(orderFactory.getOrder(orderPO)).thenReturn(order);

        Order result = orderDomainService.selectById(orderId);

        verify(orderRepository, times(1)).selectById(orderId);
        verify(orderFactory, times(1)).getOrder(orderPO);

        assertEquals(order, result);
    }

    @Test
    public void testSelectById_NonExistingOrderId() {
        Long orderId = 2L;

        when(orderRepository.selectById(orderId)).thenReturn(null);

        Order result = orderDomainService.selectById(orderId);

        verify(orderRepository, times(1)).selectById(orderId);

        assertEquals(null, result);
    }


    @Test
    public void testUpdate_ExistingOrder() {
        Order existingOrder = new Order();
        existingOrder.setId(1L);
        existingOrder.setStatus(2);
        existingOrder.setLastOperator("Old Operator");
        existingOrder.setDataUrl("Old Data URL");
        Date oldModifiedDate = new Date();
        existingOrder.setGmtModified(oldModifiedDate);


        OrderPO existingOrderPO = new OrderPO();
        existingOrderPO.setId(existingOrder.getId());
        existingOrderPO.setStatus(existingOrder.getStatus());
        existingOrderPO.setLastOperator(existingOrder.getLastOperator());
        existingOrderPO.setDataUrl(existingOrder.getDataUrl());
        existingOrderPO.setGmtModified(oldModifiedDate);

        when(orderRepository.selectById(existingOrder.getId())).thenReturn(existingOrderPO);

        orderDomainService.update(existingOrder);

        verify(orderRepository, times(1)).selectById(existingOrder.getId());
        verify(orderRepository, times(1)).update(existingOrderPO);

        assertEquals(existingOrder.getStatus(), existingOrderPO.getStatus());
        assertEquals(existingOrder.getLastOperator(), existingOrderPO.getLastOperator());
        assertEquals(existingOrder.getDataUrl(), existingOrderPO.getDataUrl());
    }

    @Test(expected = RuntimeException.class)
    public void testUpdate_NonExistingOrder() {
        Order nonExistingOrder = new Order();
        nonExistingOrder.setId(2L);

        when(orderRepository.selectById(nonExistingOrder.getId())).thenReturn(null);

        orderDomainService.update(nonExistingOrder);

        verify(orderRepository, times(1)).selectById(nonExistingOrder.getId());
    }

    @Test
    public void testSelectByProductId_OrderExists() {
        OrderPO existingOrderPO = new OrderPO();
        existingOrderPO.setId(1L);
        existingOrderPO.setProductId(100L);

        when(orderRepository.selectByProductId(existingOrderPO.getProductId())).thenReturn(existingOrderPO);

        OrderPO resultOrderPO = orderDomainService.selectByProductId(existingOrderPO.getProductId());

        verify(orderRepository, times(1)).selectByProductId(existingOrderPO.getProductId());

        assertEquals(existingOrderPO, resultOrderPO);
    }

    @Test
    public void testSelectByProductId_OrderNotExists() {
        Long nonExistingProductId = 200L;

        when(orderRepository.selectByProductId(nonExistingProductId)).thenReturn(null);

        OrderPO resultOrderPO = orderDomainService.selectByProductId(nonExistingProductId);

        verify(orderRepository, times(1)).selectByProductId(nonExistingProductId);

        assertEquals(null, resultOrderPO);
    }

    @Test
    public void testSelectOrderByType_OrdersExist() {
        Long receiverId = 1L;
        Integer orderType = 1;


        OrderPO order = new OrderPO();

        order.setId(1L);
        order.setReceiverId(receiverId);
        order.setProductId(1L);
        order.setOrderType(orderType);

        List<OrderPO> existingOrderPOList = new ArrayList<>();
        existingOrderPOList.add(order);

        existingOrderPOList.add(order);

        when(orderRepository.selectOrderByType(receiverId, orderType)).thenReturn(existingOrderPOList);

        orderDomainService.selectOrderByType(receiverId, orderType);

        verify(orderRepository, times(1)).selectOrderByType(receiverId, orderType);
        verify(orderFactory, times(1)).getOrder(existingOrderPOList);
    }

    @Test
    public void testSelectOrderByType_NoOrdersExist() {
        Long receiverId = 1L;
        Integer orderType = 2;

        when(orderRepository.selectOrderByType(receiverId, orderType)).thenReturn(new ArrayList<>());

        List<Order> resultOrderList = orderDomainService.selectOrderByType(receiverId, orderType);

        verify(orderRepository, times(1)).selectOrderByType(receiverId, orderType);
        verify(orderFactory, never()).getOrder(anyList());

        assertEquals(0, resultOrderList.size());
    }
}
