package uk.shef.msc8.ewaste.domain.product.repository.facade;

import org.springframework.stereotype.Repository;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductV2PO;

import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/04/2024 13:33
 */
@Repository
public interface ProductV2Repository {

    ProductV2PO saveProductV2(ProductV2PO newProduct);

    List<ProductV2PO> findAllProductV2();

    ProductV2PO updateProductV2(ProductV2PO productV2PO);

    ProductV2PO findProductV2ById(Long id);

    List<ProductV2PO> getAllProducts4sell();

    List<ProductV2PO> searchProductsV2(String keyword);

    List<ProductV2PO> searchProductsV2ByType(String keyword);
}
