package uk.shef.msc8.ewaste.domain.order.service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.application.ProductApplicationService;
import uk.shef.msc8.ewaste.application.UserApplicationService;
import uk.shef.msc8.ewaste.domain.order.entity.Order;
import uk.shef.msc8.ewaste.domain.order.repository.po.OrderPO;
import uk.shef.msc8.ewaste.interfaces.assembler.AssemblerFactory;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;


/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 11/03/2024 03:32
 */
@Service
public class OrderFactory {

    @Resource
    private UserApplicationService userApplicationService;

    @Resource
    private ProductApplicationService productApplicationService;

    public OrderPO createOrderPO(Order order) {
        OrderPO orderPO = new OrderPO();
        orderPO.setReceiverId(order.getReceiverId());
        orderPO.setProductId(order.getProductId());
        orderPO.setReceiverPhone(order.getReceiverPhone());
        orderPO.setReceiverAddress(order.getReceiverAddress());
        orderPO.setTotalAmount(order.getTotalAmount());
        orderPO.setRealPayAmount(order.getRealPayAmount());
        orderPO.setPostageAmount(order.getPostageAmount());
        orderPO.setServiceFeeAmount(order.getServiceFeeAmount());
        orderPO.setPaymentType(order.getPaymentType());
        orderPO.setQrcode(order.getQrcode());
        orderPO.setThirdPartyId(order.getThirdPartyId());
        orderPO.setDataUrl(order.getDataUrl());
        orderPO.setGmtCreated(order.getGmtCreated());
        orderPO.setGmtModified(order.getGmtModified());
        orderPO.setStatus(order.getStatus());
        orderPO.setLastOperator(order.getLastOperator());
        orderPO.setOrderType(order.getOrderType());
        return orderPO;
    }

    public List<Order> getOrder(List<OrderPO> orderPOList) {
        List<Order> orders = new ArrayList<>();
        orderPOList.stream().forEach(orderPO -> {
            Order order = new AssemblerFactory().convert(
                    (source, target) -> BeanUtils.copyProperties(source, target), orderPO, Order.class
            );
            var user = userApplicationService.getUserById(orderPO.getReceiverId());
//        order.addUserInfo(user)
            if(user != null){
                order.setEmail(user.getEmail());
                order.setReceiverName(user.getUserName());
            }
            var storeById = productApplicationService.findStoreById(orderPO.getThirdPartyId());
            if(storeById == null){
                order.setThirdParty("eWaste");
            }else {
                order.setThirdParty(storeById.getName());
            }
            String productName = "";
            var productV2ById = productApplicationService.findProductV2ById(orderPO.getProductId());
            if(productV2ById != null)
                productName = productV2ById.getBrandName() + ", " + productV2ById.getSeriesName();
            order.setProductName(productName);
            orders.add(order);
        });
        return orders;
    }

    public Order getOrder(OrderPO orderPO) {
        Order order = new Order();
        var user = userApplicationService.getUserById(orderPO.getReceiverId());
        if(user != null){
            order.setEmail(user.getEmail());
            order.setReceiverName(user.getUserName());
        }
        var storeById = productApplicationService.findStoreById(orderPO.getThirdPartyId());
        if(storeById == null){
            order.setThirdParty("Ewaste");
        }else {
            order.setThirdParty(storeById.getName());
        }
        String productName = "";
        var productV2ById = productApplicationService.findProductV2ById(orderPO.getProductId());
        if(productV2ById != null)
            productName = productV2ById.getBrandName() + " " + productV2ById.getSeriesName();
        order.setProductName(productName);
        BeanUtils.copyProperties(orderPO, order);
        return order;
    }
}
