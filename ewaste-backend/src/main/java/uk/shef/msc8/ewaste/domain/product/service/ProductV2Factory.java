package uk.shef.msc8.ewaste.domain.product.service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.application.OrderApplicationService;
import uk.shef.msc8.ewaste.domain.order.entity.Order;
import uk.shef.msc8.ewaste.domain.product.entity.ProductV2;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductV2PO;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/04/2024 13:24
 */
@Service
public class ProductV2Factory {

    @Resource
    private OrderApplicationService orderApplicationService;
    @Resource
    private BrandsDomainService brandsDomainService;
    @Resource
    private SeriesDomainService seriesDomainService;

    public List<ProductV2> getProductV2(List<ProductV2PO> productV2POS) {
        List<ProductV2> result = new ArrayList<>();
        for (int i = 0; i < productV2POS.size(); i++) {
            ProductV2 productV2 = new ProductV2();
            var byId = brandsDomainService.findById(productV2POS.get(i).getBrandId());
            var byId1 = seriesDomainService.findById(productV2POS.get(i).getSeriesId());
            if(byId!=null){
                productV2.setBrandName(byId.getName());
            }else{
                productV2.setBrandName("Unknown");
            }

            if(byId1!=null){
                productV2.setSeriesName(byId1.getName());
            }
            else{
                productV2.setSeriesName("Unknown");
            }
            BeanUtils.copyProperties(productV2POS.get(i), productV2);
            var order = orderApplicationService.selectByProductId(productV2POS.get(i).getId());
            if(order!=null){
                productV2.setOrderId(order.getId());
            }
            result.add(productV2);
        }
        return result;
    }

    public ProductV2 getProductV2(ProductV2PO productV2POS) {
        ProductV2 productV2 = new ProductV2();
        var byId = brandsDomainService.findById(productV2POS.getBrandId());
        var byId1 = seriesDomainService.findById(productV2POS.getSeriesId());
        if(byId!=null){
            productV2.setBrandName(byId.getName());
        } else{
            productV2.setBrandName("Unknown");
        }
        if(byId1!=null){
            productV2.setSeriesName(byId1.getName());
        }else{
            productV2.setSeriesName("Unknown");
        }
        BeanUtils.copyProperties(productV2POS, productV2);
        var order = orderApplicationService.selectByProductId(productV2.getId());
        if(order!=null){
            productV2.setOrderId(order.getId());
        }
        return productV2;
    }


}
