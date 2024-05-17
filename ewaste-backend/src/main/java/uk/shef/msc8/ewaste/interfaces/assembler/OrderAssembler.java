package uk.shef.msc8.ewaste.interfaces.assembler;

import uk.shef.msc8.ewaste.domain.order.entity.Order;
import uk.shef.msc8.ewaste.interfaces.dto.OrderDTO;

import java.text.ParseException;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 11/03/2024 03:38
 */
public class OrderAssembler {


    public static Order toDO(OrderDTO dto) throws ParseException {
        Order order = new Order();
        order.setReceiverId(dto.getReceiverId());
        order.setProductId(dto.getProductId());
        order.setReceiverPhone(dto.getReceiverPhone());
        order.setReceiverAddress(dto.getReceiverAddress());
        order.setTotalAmount(dto.getTotalAmount());
        order.setRealPayAmount(dto.getRealPayAmount());
        order.setPostageAmount(dto.getPostageAmount());
        order.setServiceFeeAmount(dto.getServiceFeeAmount());
        order.setPaymentType(dto.getPaymentType());
        order.setQrcode(dto.getQrcode());
        order.setThirdParty(dto.getThirdParty());
        order.setDataUrl(dto.getDataUrl());
        order.setStatus(0);
        order.setLastOperator(dto.getLastOperator());
        order.setOrderType(dto.getOrderType());
        return order;
    }
}
