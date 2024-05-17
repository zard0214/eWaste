package uk.shef.msc8.ewaste.domain.product.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.product.entity.ProductV2;
import uk.shef.msc8.ewaste.domain.product.entity.Store;
import uk.shef.msc8.ewaste.domain.product.entity.StoreProductV2;
import uk.shef.msc8.ewaste.domain.product.repository.facade.StoreProductV2Repository;
import uk.shef.msc8.ewaste.domain.product.repository.facade.StoresRepository;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductV2PO;
import uk.shef.msc8.ewaste.domain.product.repository.po.StoreProductV2PO;
import uk.shef.msc8.ewaste.domain.product.repository.po.StoresPO;
import uk.shef.msc8.ewaste.infrastructure.exception.BizException;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 25/04/2024 12:05
 */
@Service
@Slf4j
public class StoreProductV2DomainService {

    @Resource
    private StoreProductV2Repository storeProductV2Repository;
    @Resource
    private StoreProductV2Factory storeProductV2Factory;

    public List<StoreProductV2> findAllStoreProductV2() {
        List<StoreProductV2PO> storesPO = storeProductV2Repository.findAllStoreProductV2();
        return storeProductV2Factory.getStoreProductV2(storesPO);
    }

    public StoreProductV2PO addStoreProductV2(StoreProductV2PO ProductV2PO) {

        List<StoreProductV2PO> StoreProductV2PO = storeProductV2Repository.findAllStoreProductV2(ProductV2PO);
        if (StoreProductV2PO.size() > 0) {
            throw new BizException("already added");
        }
        return storeProductV2Repository.addStoreProductV2(ProductV2PO);
    }

    public StoreProductV2PO findStoreProductV2ById(Long id) {
        return storeProductV2Repository.findStoreProductV2ById(id);
    }

    public StoreProductV2PO updateStoreProductV2PO(StoreProductV2PO storeProductV2PO) {
        return storeProductV2Repository.updateStoreProductV2PO(storeProductV2PO);
    }

    public List<StoreProductV2> findStoreProductV2BySeriesId(Long id) {
        var storeProductV2BySeriesId = storeProductV2Repository.findStoreProductV2BySeriesId(id);
        return storeProductV2Factory.getStoreProductV2(storeProductV2BySeriesId);
    }
}
