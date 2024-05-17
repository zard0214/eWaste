package uk.shef.msc8.ewaste.domain.product.service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.product.entity.Store;
import uk.shef.msc8.ewaste.domain.product.entity.StoreProductV2;
import uk.shef.msc8.ewaste.domain.product.repository.po.BrandsPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.SeriesPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.StoreProductV2PO;
import uk.shef.msc8.ewaste.domain.product.repository.po.StoresPO;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/04/2024 13:24
 */
@Service
public class StoreProductV2Factory {

    @Resource
    private StoresDomainService storesDomainService;
    @Resource
    private BrandsDomainService brandsDomainService;
    @Resource
    private SeriesDomainService seriesDomainService;


    public List<StoreProductV2> getStoreProductV2(List<StoreProductV2PO> productV2POS) {
        List<StoreProductV2> result = new ArrayList<>();
        for (int i = 0; i < productV2POS.size(); i++) {
            StoreProductV2 productV2 = new StoreProductV2();
            var byId3 = storesDomainService.findById(productV2POS.get(i).getStoreId());
            var byId = brandsDomainService.findById(productV2POS.get(i).getBrandId());
            var byId1 = seriesDomainService.findById(productV2POS.get(i).getSeriesId());
            if(byId3 != null){
                productV2.setStoreName(byId3.getName());
            }else{
                productV2.setStoreName("Unknown");
            }

            if(byId != null)
                productV2.setBrandName(byId.getName());
            else{
                productV2.setBrandName("Unknown, ");
            }
            if(byId1 != null)
                productV2.setSeriesName(byId1.getName());
            else{
                productV2.setSeriesName("Unknown");
            }
            BeanUtils.copyProperties(productV2POS.get(i), productV2);
            result.add(productV2);
        }
        return result;
    }
    public StoreProductV2 getStore(StoreProductV2PO productV2POS) {
        StoreProductV2 productV2 = new StoreProductV2();
        var byId3 = storesDomainService.findById(productV2POS.getStoreId());
        var byId = brandsDomainService.findById(productV2POS.getBrandId());
        var byId1 = seriesDomainService.findById(productV2POS.getSeriesId());
        if(byId3 != null)
        productV2.setStoreName(byId3.getName());
        else{
            productV2.setStoreName("Unknown");
        }
        if(byId != null)
        productV2.setBrandName(byId.getName());
        else{
            productV2.setBrandName("Unknown, ");
        }
        if(byId1 != null)
        productV2.setSeriesName(byId1.getName());
        else{
            productV2.setSeriesName("Unknown");
        }
        BeanUtils.copyProperties(productV2POS, productV2);
        return productV2;
    }
}
