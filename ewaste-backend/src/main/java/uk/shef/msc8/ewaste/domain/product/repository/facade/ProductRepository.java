package uk.shef.msc8.ewaste.domain.product.repository.facade;

import org.springframework.stereotype.Repository;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductPO;

import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 03:24
 */
@Repository
public interface ProductRepository {

    ProductPO saveProduct(ProductPO newProduct);

    ProductPO findById(Long id);

    ProductPO updateProduct(ProductPO existingProduct);

    List<ProductPO> findAll();

    List<ProductPO> findAllProducts();

    List<ProductPO> findByBrand(String brand);

    List<ProductPO> findByType(String type);

    List<ProductPO> searchProducts(String keyword);

    List<ProductPO> findLatestProducts();

    List<ProductPO> findByDataRetrieve(Boolean dataRetrieve);

    List<ProductPO> findByUserId(Long userId);

    ProductPO findByName(String name);
}
