package uk.shef.msc8.ewaste.application;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.squirrelframework.foundation.fsm.annotation.Transit;
import uk.shef.msc8.ewaste.domain.order.entity.Order;
import uk.shef.msc8.ewaste.domain.order.entity.valueobject.OrderEvent;
import uk.shef.msc8.ewaste.domain.order.repository.po.OrderPO;
import uk.shef.msc8.ewaste.domain.order.service.OrderDomainService;
import uk.shef.msc8.ewaste.domain.order.statemachine.core.OrderStateMachineEngineFactory;
import uk.shef.msc8.ewaste.domain.order.statemachine.fsm.OrderContext;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductV2PO;
import uk.shef.msc8.ewaste.domain.product.service.ProductV2DomainService;
import uk.shef.msc8.ewaste.infrastructure.common.resp.PageResponse;
import uk.shef.msc8.ewaste.interfaces.assembler.OrderAssembler;
import uk.shef.msc8.ewaste.interfaces.dto.OrderDTO;

import javax.annotation.Resource;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 11/03/2024 03:12
 */
@Service
public class OrderApplicationService {

    @Resource
    private OrderDomainService orderDomainService;

    @Resource
    private ProductV2DomainService productV2DomainService;

    @Resource
    private OrderStateMachineEngineFactory orderStateMachineEngineFactory;

    public Long saveOrder(OrderDTO orderDTO) throws ParseException {
        var productV2PO = productV2DomainService.addProductV2(orderDTO.getProductV2PO());
        orderDTO.setProductId(productV2PO.getId());
        return orderDomainService.saveOrder(OrderAssembler.toDO(orderDTO));
    }

    public ProductV2PO classificationStrategy(ProductV2PO productV2PO){
        return productV2DomainService.classificationStrategy(productV2PO);
    }

    public PageResponse<List<Order>> selectPageList(Long receiverId, OrderDTO orderDTO, Integer pageNo, Integer pageSize){
        return orderDomainService.selectPageList(receiverId, orderDTO, pageNo, pageSize);
    }

    public Order selectById(Long orderId){
        return orderDomainService.selectById(orderId);
    }

    public OrderPO selectByProductId(Long productId){
        return orderDomainService.selectByProductId(productId);
    }

    public List<Order> selectAll(){ return orderDomainService.selectAll();}

    public void updateOrder(Order order) {
        if (order.getId() == null) {
            throw new IllegalArgumentException("Order ID cannot be null for update operations.");
        }
        OrderEvent orderEvent = null;
        var order1 = selectById(order.getId());
        order1.setGmtModified(new Date());
        if(order.getStatus() != order1.getStatus()){
            switch (order.getStatus()){
                case -10:
                    orderEvent = OrderEvent.CANCEL;
                    break;
                case 10:
                    orderEvent = OrderEvent.CREATE;
                    break;
                case 20:
                    orderEvent = OrderEvent.RETRIEVE;
                    break;
                case 30:
                    orderEvent = OrderEvent.DISPATCH;
                    break;
                case 40:
                    orderEvent = OrderEvent.WIPE;
                    break;
                case 50:
                    orderEvent = OrderEvent.COMPLETE;
                    break;
                case 60:
                    orderEvent = OrderEvent.PAY;
                    order1.setRealPayAmount(order.getRealPayAmount());
                    break;
            }
            orderStateMachineEngineFactory.fire(new OrderContext(order1), orderEvent);
        }else{
            if(StringUtils.isEmpty(order1.getDataUrl()) && !StringUtils.isEmpty(order.getDataUrl())){
                orderEvent = OrderEvent.RETRIEVE;
                order1.setDataUrl(order.getDataUrl());
                orderStateMachineEngineFactory.fire(new OrderContext(order1), orderEvent);
            }else{
                orderDomainService.update(order1);
            }
        }

    }

    public List<Order> selectOrderByType(Long receiverId, Integer orderType) {
        return orderDomainService.selectOrderByType(receiverId, orderType);
    }
}
