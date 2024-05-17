package uk.shef.msc8.ewaste.domain.product.service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.product.entity.ProductV2;
import uk.shef.msc8.ewaste.domain.product.entity.Store;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductV2PO;
import uk.shef.msc8.ewaste.domain.product.repository.po.StoresPO;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/04/2024 13:24
 */
@Service
public class StoreFactory {

    public List<Store> getStores(List<StoresPO> productV2POS) {
        List<Store> result = new ArrayList<>();
        for (int i = 0; i < productV2POS.size(); i++) {
            Store productV2 = new Store();
            BeanUtils.copyProperties(productV2POS.get(i), productV2);
            result.add(productV2);
        }
        return result;
    }
    public Store getStore(StoresPO productV2POS) {
        Store productV2 = new Store();
        BeanUtils.copyProperties(productV2POS, productV2);
        return productV2;
    }
}
