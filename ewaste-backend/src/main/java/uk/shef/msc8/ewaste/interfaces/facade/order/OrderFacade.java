package uk.shef.msc8.ewaste.interfaces.facade.order;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uk.shef.msc8.ewaste.application.OrderApplicationService;
import uk.shef.msc8.ewaste.domain.order.entity.Order;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductV2PO;
import uk.shef.msc8.ewaste.infrastructure.auth.CurrentUser;
import uk.shef.msc8.ewaste.infrastructure.auth.UserPrincipal;
import uk.shef.msc8.ewaste.infrastructure.common.resp.PageResponse;
import uk.shef.msc8.ewaste.infrastructure.common.resp.Response;
import uk.shef.msc8.ewaste.infrastructure.common.resp.ResponseDTO;
import uk.shef.msc8.ewaste.interfaces.dto.OrderDTO;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 11/03/2024 03:10
 */
@RestController
@Slf4j
@RequestMapping("/order")
public class OrderFacade {

    @Resource
    private OrderApplicationService orderApplicationService;

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseDTO<Long> addOrder(@Valid @RequestBody OrderDTO orderDTO) {
        try {
            return Response.success(orderApplicationService.saveOrder(orderDTO));
        } catch (ParseException e) {
            log.error("", e);
            return Response.failed(e.getMessage());
        }
    }

    @PostMapping("/classificationStrategy")
    public ResponseDTO<ProductV2PO> classificationStrategy(@Valid @RequestBody ProductV2PO productV2PO) {
        return Response.success(orderApplicationService.classificationStrategy(productV2PO));
    }

    @PostMapping("/list")
    @PreAuthorize("hasRole('ROLE_STAFF') or hasRole('ROLE_ADMIN')")
    public PageResponse<List<Order>> selectPageList(@CurrentUser UserPrincipal userPrincipal, @RequestBody OrderDTO orderDTO) {
        return orderApplicationService.selectPageList(userPrincipal.getId(), orderDTO, orderDTO.getPageNum(), orderDTO.getPageSize());
    }

    @PostMapping("/details")
    @PreAuthorize("hasRole('ROLE_STAFF') or hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseDTO<Order> selectById(@RequestBody OrderDTO orderDTO) {
        return Response.success(orderApplicationService.selectById(orderDTO.getId()));
    }

    @PostMapping("/user/list")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseDTO<List<Order>> list(@CurrentUser UserPrincipal userPrincipal, @RequestBody OrderDTO orderDTO) {
        return Response.success(orderApplicationService.selectOrderByType(userPrincipal.getId(), orderDTO.getOrderType()));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_STAFF') or hasRole('ROLE_ADMIN')")
    public ResponseDTO<List<Order>> selectById() {
        return Response.success(orderApplicationService.selectAll());
    }

    @PutMapping("/update")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_STAFF') or hasRole('ROLE_ADMIN')")
    public ResponseDTO updateOrder(@RequestBody Order order) {
        try {
            orderApplicationService.updateOrder(order);
            return Response.success();
        } catch (Exception e) {
            log.error("Failed to update order:", e);
            return Response.failed(e.getMessage());
        }
    }
}
