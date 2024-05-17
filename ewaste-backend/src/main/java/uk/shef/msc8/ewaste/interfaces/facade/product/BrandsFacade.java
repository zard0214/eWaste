package uk.shef.msc8.ewaste.interfaces.facade.product;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import uk.shef.msc8.ewaste.application.ProductApplicationService;
import uk.shef.msc8.ewaste.domain.product.repository.po.BrandsPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductV2PO;
import uk.shef.msc8.ewaste.domain.user.repository.po.UserPO;
import uk.shef.msc8.ewaste.infrastructure.common.resp.Response;
import uk.shef.msc8.ewaste.infrastructure.common.resp.ResponseDTO;
import uk.shef.msc8.ewaste.infrastructure.exception.ResourceNotFoundException;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/04/2024 13:06
 */
@RestController
@Slf4j
@RequestMapping("/brands")
public class BrandsFacade {
    @Resource
    private ProductApplicationService productApplicationService;

    @GetMapping("/allbrands")
    public ResponseDTO<List<BrandsPO>> getAll() {
        List<BrandsPO> brandsPOS = productApplicationService.findAllBrands();
        return Response.success(brandsPOS);
    }

    @PostMapping("/add")
    public ResponseDTO<BrandsPO> saveUser(@RequestBody BrandsPO brandsPO){
        BrandsPO savedBrand = productApplicationService.addBrand(brandsPO);
        if (savedBrand != null) {
            return Response.success(savedBrand);
        } else {
            return null;
        }
    }

    @GetMapping("/{id}")
    public ResponseDTO<BrandsPO> getBrandById(@PathVariable Long id) {
        BrandsPO brandsPO = productApplicationService.findBrandById(id);
        if (brandsPO != null) {
            return Response.success(brandsPO);
        }
        return null;
    }


    @PutMapping("/{id}")
    public ResponseDTO<BrandsPO> updateBrands(@PathVariable Long id, @RequestBody BrandsPO brandsPO) {
        BrandsPO savedProduct = productApplicationService.updateBrand(brandsPO);
        if (savedProduct != null) {
            return Response.success(savedProduct);
        } else {
            throw new ResourceNotFoundException("Product not found with ID: " + id, null, savedProduct);
        }
    }

    @GetMapping("/search")
    public ResponseDTO<List<BrandsPO>> searchBrandsPO(@RequestParam("keyword") String keyword) {
        List<BrandsPO> products = productApplicationService.searchBrandsPO(keyword);
        return Response.success(products);
    }


}
