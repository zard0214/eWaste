package uk.shef.msc8.ewaste.domain.product.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.product.entity.ProductV2;
import uk.shef.msc8.ewaste.domain.product.entity.valueobject.Classification;
import uk.shef.msc8.ewaste.domain.product.entity.valueobject.Condition;
import uk.shef.msc8.ewaste.domain.product.repository.facade.ProductV2Repository;
import uk.shef.msc8.ewaste.domain.product.repository.po.BrandsPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductV2PO;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/04/2024 13:18
 */
@Service
@Slf4j
public class ProductV2DomainService {

    @Resource
    private ProductV2Repository productV2Repository;
    @Resource
    private BrandsDomainService brandsDomainService;
    @Resource
    private SeriesDomainService seriesDomainService;

    @Resource
    private ProductV2Factory productV2Factory;

    public List<ProductV2> findAllProductV2() {
        List<ProductV2PO> productV2POS = productV2Repository.findAllProductV2();
        return productV2Factory.getProductV2(productV2POS);
    }

    public ProductV2PO updateProductV2(ProductV2PO productV2PO) {
        return productV2Repository.updateProductV2(productV2PO);
    }

    public ProductV2PO addProductV2(ProductV2PO productV2PO) {
        productV2PO.setVisibility(0);
        classificationStrategy(productV2PO);
        return productV2Repository.saveProductV2(productV2PO);
    }

    public ProductV2PO classificationStrategy(ProductV2PO productV2PO) {
        Integer capacity = 1;
        try {
            var c = productV2PO.getCapacity().split(" ");
            String capacityType = c[1];
            capacity = Integer.parseInt(c[0]);
            if(capacityType.equals("TB")){
                capacity += 712;
            }
        }catch (Exception e){

        }

        //if brand or series do not set, it is the unknown device.
        if(productV2PO.getBrandId() == 0 || productV2PO.getSeriesId() == 0 || productV2PO.getCapacity().isEmpty()){
//            productV2PO.setBrandId(0L);
//            productV2PO.setSeriesId(0L);
            productV2PO.setClassification(Classification.UNKNOWN.getCode());
            productV2PO.setExpectedValue(new BigDecimal(0));
            return productV2PO;
        }

        if(productV2PO.getYearOfRelease() >= 2020){
            productV2PO.setClassification(Classification.CURRENT.getCode());
        }else{
            productV2PO.setClassification(Classification.RARE.getCode());
        }
//        var brandPO = brandsDomainService.findById(productV2PO.getBrandId());
//        if(brandPO.getValue() == 0){
//            if(productV2PO.getYearOfRelease() < 2020){
//                productV2PO.setClassification(Classification.RARE.getCode());
//            }
//        }

        var seriesPO = seriesDomainService.findById(productV2PO.getSeriesId());

        double capacityValue = capacity * 0.2;

        int expectedValue = 1;
        expectedValue *= seriesPO.getExpectedValue();
        if(productV2PO.getYearOfRelease() > 2020){
            expectedValue *= 0.9;
        } else if (productV2PO.getYearOfRelease() > 2015) {
            expectedValue *= 0.7;
        } else if (productV2PO.getYearOfRelease() > 2010) {
            expectedValue *= 0.5;
        } else {
            expectedValue *= 0.2;
        }

        if(productV2PO.getYearOfRelease() <= 2020){
            expectedValue += capacityValue;
        }


        if(productV2PO.getCondition() == Condition.BAD.getCode()){
            productV2PO.setClassification(Classification.RECYCLE.getCode());
            expectedValue *= 0.2;
        }

        productV2PO.setExpectedValue(new BigDecimal(expectedValue));

        if(productV2PO.getClassification() == 0){
            productV2PO.setClassification(Classification.UNKNOWN.getCode());
        }

        return productV2PO;
    }

    public ProductV2 findProductV2ById(Long id) {
        ProductV2PO productV2POS = productV2Repository.findProductV2ById(id);
        return productV2Factory.getProductV2(productV2POS);
    }

    public List<ProductV2> getAllProducts4sell() {
        List<ProductV2PO> productV2POS = productV2Repository.getAllProducts4sell();
        return productV2Factory.getProductV2(productV2POS);
    }

    public List<ProductV2> searchProductsV2(String keyword) {
//        return productV2Repository.searchProductsV2(keyword);
        var productV2POS = productV2Repository.searchProductsV2(keyword);
        return productV2Factory.getProductV2(productV2POS);
    }

    public List<ProductV2PO> searchProductsV2ByType(String keyword) {
        return productV2Repository.searchProductsV2ByType(keyword);
    }
}
