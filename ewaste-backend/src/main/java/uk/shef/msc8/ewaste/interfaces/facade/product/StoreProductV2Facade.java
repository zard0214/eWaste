package uk.shef.msc8.ewaste.interfaces.facade.product;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import uk.shef.msc8.ewaste.application.ProductApplicationService;
import uk.shef.msc8.ewaste.domain.product.entity.Store;
import uk.shef.msc8.ewaste.domain.product.entity.StoreProductV2;
import uk.shef.msc8.ewaste.domain.product.repository.po.StoreProductV2PO;
import uk.shef.msc8.ewaste.domain.product.repository.po.StoresPO;
import uk.shef.msc8.ewaste.infrastructure.common.resp.Response;
import uk.shef.msc8.ewaste.infrastructure.common.resp.ResponseDTO;
import uk.shef.msc8.ewaste.infrastructure.exception.ResourceNotFoundException;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 25/04/2024 11:48
 */
@RestController
@Slf4j
@RequestMapping("/stores/products")
public class StoreProductV2Facade {
    @Resource
    private ProductApplicationService productApplicationService;

    @GetMapping("/all")
    public ResponseDTO<List<StoreProductV2>> getAll() {
        List<StoreProductV2> storesPO = productApplicationService.findAllStoreProductV2();
        return Response.success(storesPO);
    }

    @PostMapping("/add")
    public ResponseDTO<StoreProductV2PO> saveUser(@RequestBody StoreProductV2PO storesPO){
        StoreProductV2PO savedBrand = productApplicationService.addStoreProduct(storesPO);
        if (savedBrand != null) {
            return Response.success(savedBrand);
        } else {
            return null;
        }
    }

    @GetMapping("/{id}")
    public ResponseDTO<StoreProductV2PO> getBrandById(@PathVariable Long id) {
        StoreProductV2PO brandsPO = productApplicationService.findStoreProductV2ById(id);
        if (brandsPO != null) {
            return Response.success(brandsPO);
        }
        return null;
    }

    @GetMapping("/findStoreProductV2BySeriesId/{id}")
    public ResponseDTO<List<StoreProductV2>> findStoreProductV2BySeriesId(@PathVariable Long id) {
        List<StoreProductV2> brandsPO = productApplicationService.findStoreProductV2BySeriesId(id);
        if (brandsPO != null) {
            return Response.success(brandsPO);
        }
        return null;
    }


    @PutMapping("/{id}")
    public ResponseDTO<StoreProductV2PO> updateBrands(@PathVariable Long id, @RequestBody StoreProductV2PO storeProductV2PO) {
        StoreProductV2PO savedProduct = productApplicationService.updateStoreProductV2PO(storeProductV2PO);
        if (savedProduct != null) {
            return Response.success(savedProduct);
        } else {
            throw new ResourceNotFoundException("Product not found with ID: " + id, null, savedProduct);
        }
    }
}
