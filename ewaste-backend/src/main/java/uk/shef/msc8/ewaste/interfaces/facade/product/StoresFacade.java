package uk.shef.msc8.ewaste.interfaces.facade.product;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import uk.shef.msc8.ewaste.application.ProductApplicationService;
import uk.shef.msc8.ewaste.domain.product.entity.Store;
import uk.shef.msc8.ewaste.domain.product.repository.po.BrandsPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.StoresPO;
import uk.shef.msc8.ewaste.infrastructure.common.resp.Response;
import uk.shef.msc8.ewaste.infrastructure.common.resp.ResponseDTO;
import uk.shef.msc8.ewaste.infrastructure.exception.ResourceNotFoundException;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 25/04/2024 11:05
 */
@RestController
@Slf4j
@RequestMapping("/stores")
public class StoresFacade {
    @Resource
    private ProductApplicationService productApplicationService;

    @GetMapping("/all")
    public ResponseDTO<List<Store>> getAll() {
        List<Store> storesPO = productApplicationService.findAllStores();
        return Response.success(storesPO);
    }

    @PostMapping("/add")
    public ResponseDTO<StoresPO> saveUser(@RequestBody StoresPO storesPO){
        StoresPO savedBrand = productApplicationService.addStore(storesPO);
        if (savedBrand != null) {
            return Response.success(savedBrand);
        } else {
            return null;
        }
    }

    @GetMapping("/{id}")
    public ResponseDTO<StoresPO> getBrandById(@PathVariable Long id) {
        StoresPO brandsPO = productApplicationService.findStoreById(id);
        if (brandsPO != null) {
            return Response.success(brandsPO);
        }
        return null;
    }


    @PutMapping("/{id}")
    public ResponseDTO<StoresPO> updateBrands(@PathVariable Long id, @RequestBody StoresPO storesPO) {
        StoresPO savedProduct = productApplicationService.updateStore(storesPO);
        if (savedProduct != null) {
            return Response.success(savedProduct);
        } else {
            throw new ResourceNotFoundException("Product not found with ID: " + id, null, savedProduct);
        }
    }
}
