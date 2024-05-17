package uk.shef.msc8.ewaste.interfaces.facade.product;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import uk.shef.msc8.ewaste.application.ProductApplicationService;
import uk.shef.msc8.ewaste.domain.product.entity.ProductV2;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductV2PO;
import uk.shef.msc8.ewaste.infrastructure.common.resp.Response;
import uk.shef.msc8.ewaste.infrastructure.common.resp.ResponseDTO;
import uk.shef.msc8.ewaste.interfaces.dto.ProductV2DTO;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/04/2024 13:07
 */
@RestController
@Slf4j
@RequestMapping("/productV2")
public class ProductV2Facade {

    @Resource
    private ProductApplicationService productApplicationService;

    @GetMapping("/allproducts")
    public ResponseDTO<List<ProductV2>> getAll() {
        List<ProductV2> products = productApplicationService.findAllProductV2();
        return Response.success(products);
    }

    @GetMapping("/allproducts4sell")
    public ResponseDTO<List<ProductV2>> getAllProducts4sell() {
        List<ProductV2> products = productApplicationService.getAllProducts4sell();
        return Response.success(products);
    }

    @PutMapping("/update")
    public ResponseDTO update(@RequestBody ProductV2DTO productV2DTO) {
        productApplicationService.updateProductV2(productV2DTO);
        return Response.success();
    }

    @GetMapping("/{id}")
    public ResponseDTO<ProductV2> getProductById(@PathVariable Long id) {
        return Response.success(productApplicationService.findProductV2ById(id));
    }

    @GetMapping("/search")
    public ResponseDTO<List<ProductV2>> searchProductsV2(@RequestParam("keyword") String keyword) {
        List<ProductV2> products = productApplicationService.searchProductsV2(keyword);
        return Response.success(products);
    }

    @GetMapping("/type/search")
    public ResponseDTO<List<ProductV2PO>> searchProductsV2ByType(@RequestParam("keyword") String keyword) {
        List<ProductV2PO> products = productApplicationService.searchProductsV2ByType(keyword);
        return Response.success(products);
    }

}
