package uk.shef.msc8.ewaste.domain.product.service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.product.entity.Product;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductPO;
import uk.shef.msc8.ewaste.interfaces.assembler.AssemblerFactory;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductFactory {

    public ProductPO createProductPO(ProductPO product) {
        ProductPO productPO = new ProductPO();
        productPO.setProductId(product.getProductId());
        productPO.setDescription(product.getDescription());
        productPO.setBrand(product.getBrand());
        productPO.setModel(product.getModel());
        productPO.setYearOfRelease(product.getYearOfRelease());
        productPO.setCondition(product.getCondition());
        productPO.setColor(product.getColor());
        productPO.setCapacity(product.getCapacity());
        productPO.setType(product.getType());
        productPO.setClassification(product.getClassification());
        productPO.setVisibility(product.getVisibility());
        productPO.setExpectedValue(product.getExpectedValue());
        productPO.setImage(product.getImage());
        // Add a method to convert image to byte array
        productPO.setPhotoBase64(product.getPhotoBase64());
        return productPO;
    }

    public List<Product> getProduct(List<ProductPO> productPOList) {
        List<Product> products = new ArrayList<>();
        productPOList.stream().forEach(productPO -> {
            Product product = new AssemblerFactory().convert(
                    (source, target) -> BeanUtils.copyProperties(source, target), productPO, Product.class
            );
            products.add(product);
        });
        return products;
    }

    public Product getProduct(ProductPO productPO) {
        Product product = new Product();
        BeanUtils.copyProperties(productPO, product);
        return product;
    }
}
