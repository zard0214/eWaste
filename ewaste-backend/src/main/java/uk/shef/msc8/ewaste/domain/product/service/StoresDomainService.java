package uk.shef.msc8.ewaste.domain.product.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.product.entity.Store;
import uk.shef.msc8.ewaste.domain.product.repository.facade.ProductV2Repository;
import uk.shef.msc8.ewaste.domain.product.repository.facade.StoresRepository;
import uk.shef.msc8.ewaste.domain.product.repository.po.BrandsPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductV2PO;
import uk.shef.msc8.ewaste.domain.product.repository.po.SeriesPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.StoresPO;
import uk.shef.msc8.ewaste.infrastructure.exception.BizException;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 25/04/2024 11:01
 */
@Service
@Slf4j
public class StoresDomainService {

    @Resource
    private StoresRepository storesRepository;
    @Resource
    private StoreFactory storeFactory;

    public List<Store> findAllStores() {
        List<StoresPO> storesPO = storesRepository.findAllStores();
        return storeFactory.getStores(storesPO);
    }

    public StoresPO addStore(StoresPO storesPO) {
        if(findByName(storesPO.getName()) != null)
            throw new BizException("brand name already exits");
        return storesRepository.addStore(storesPO);
    }

    public StoresPO findById(Long id) {
        return storesRepository.findById(id);
    }

    public StoresPO updateStore(StoresPO storesPO) {
        return storesRepository.updateStore(storesPO);
    }

    public StoresPO findByName(String name) {
        return storesRepository.findByName(name);
    }
}
