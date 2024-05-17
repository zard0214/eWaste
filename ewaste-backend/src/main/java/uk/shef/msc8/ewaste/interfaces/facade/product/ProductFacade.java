package uk.shef.msc8.ewaste.interfaces.facade.product;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import uk.shef.msc8.ewaste.application.ProductApplicationService;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductPO;
import uk.shef.msc8.ewaste.infrastructure.common.resp.Response;
import uk.shef.msc8.ewaste.infrastructure.common.resp.ResponseDTO;
import uk.shef.msc8.ewaste.infrastructure.exception.ResourceNotFoundException;

import javax.annotation.Resource;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/products")
@Deprecated
public class ProductFacade {
    @Resource
    private ProductApplicationService productApplicationService;

    @PostMapping("/add")
    public ResponseDTO<ProductPO> addProduct(@RequestBody ProductPO newProduct) {
        ProductPO savedProduct = productApplicationService.addProduct(newProduct);
        if (savedProduct != null) {
            return Response.success(savedProduct);
        } else {
            return null;
        }
    }

    @GetMapping("/all")
    public ResponseDTO<List<ProductPO>> getAllProducts() {
        List<ProductPO> products = productApplicationService.findAll();
        return Response.success(products);
    }

    @GetMapping("/allproduct")
    public ResponseDTO<List<ProductPO>> getAll() {
        List<ProductPO> products = productApplicationService.findAllProducts();
        return Response.success(products);
    }
    
    @GetMapping("/popular")
    public ResponseDTO<List<ProductPO>> getPopularProducts() {
        List<ProductPO> products = productApplicationService.findLatestProducts();
        return Response.success(products);
    }

    @GetMapping("/search")
    public ResponseDTO<List<ProductPO>> getSearchProducts(@RequestParam("keyword") String keyword) {
        List<ProductPO> products = productApplicationService.searchProducts(keyword);
        return Response.success(products);
    }

    @GetMapping("/type")
    public ResponseDTO<List<ProductPO>> getTypeProducts(@RequestParam("keyword") String keyword) {
        List<ProductPO> products = productApplicationService.findByType(keyword);
        return Response.success(products);
    }

    @GetMapping("/userId")
    public ResponseDTO<List<ProductPO>> getUserProducts(@RequestParam("keyword") Long keyword) {
         List<ProductPO> products = productApplicationService.findByUserId(keyword);
         return Response.success(products);
    }

    @GetMapping("/{id}")
    public ResponseDTO<ProductPO> getProductById(@PathVariable Long id) {
        ProductPO product = productApplicationService.findById(id);
        if (product != null) {
            return Response.success(product);
        }
        return null; 
    }

    @PutMapping("/{id}")
    public ResponseDTO<ProductPO> updateProduct(@PathVariable Long id, @RequestBody ProductPO updatedProduct) {
         if (!updatedProduct.getProductId().equals(id)) {
            throw new IllegalArgumentException("Product ID in the URL and request body do not match");
          }
        // System.out.print("Hello form products 2");
         ProductPO savedProduct = productApplicationService.updateProduct(updatedProduct);
         if (savedProduct != null) {
             return Response.success(savedProduct);
         } else {
            throw new ResourceNotFoundException("Product not found with ID: " + id, null, savedProduct);
      }
    }

}
