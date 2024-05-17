package uk.shef.msc8.ewaste.domain.product.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.product.repository.facade.ProductRepository;
import uk.shef.msc8.ewaste.domain.product.repository.po.BrandsPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductPO;
import uk.shef.msc8.ewaste.infrastructure.exception.BizException;

import javax.annotation.Resource;
import java.util.List;
@Service
@Slf4j
public class ProductDomainService {
    @Resource
    private ProductRepository productRepository;

    public ProductPO addProduct(ProductPO newProduct) {
//        if(findByName(newProduct.get)) != null)
//            throw new BizException("brand name already exits");
        return productRepository.saveProduct(newProduct);
    }

    public ProductPO findById(Long id) {
        return productRepository.findById(id);
    }

    public ProductPO updateProduct(ProductPO existingProduct) {
        return productRepository.updateProduct(existingProduct);
    }

    public List<ProductPO> findAll() {
        return productRepository.findAll();
    }

    public List<ProductPO> findAllProducts() {
        return productRepository.findAllProducts();
    }

    public List<ProductPO> findByBrand(String brand) {
        return productRepository.findByBrand(brand);
    }

    public List<ProductPO> findByType(String type) {
        return productRepository.findByType(type);
    }

    public List<ProductPO> searchProducts(String keyword) {
        return productRepository.searchProducts(keyword);
    }

    public List<ProductPO> findLatestProducts() {
        return productRepository.findLatestProducts();
    }

    public List<ProductPO> findByDataRetrieve(Boolean dataRetrieve) {
        return productRepository.findByDataRetrieve(dataRetrieve);
    }

    public List<ProductPO> findByUserId(Long userId) {
        return productRepository.findByUserId(userId);
    }

    public ProductPO findByName(String name) {
        return productRepository.findByName(name);
    }


}
