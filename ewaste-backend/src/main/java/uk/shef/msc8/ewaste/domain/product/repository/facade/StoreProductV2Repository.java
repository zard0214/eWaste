package uk.shef.msc8.ewaste.domain.product.repository.facade;

import org.springframework.stereotype.Repository;
import uk.shef.msc8.ewaste.domain.product.repository.po.StoreProductV2PO;

import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 25/04/2024 12:09
 */
@Repository
public interface StoreProductV2Repository {
    List<StoreProductV2PO> findAllStoreProductV2();

    List<StoreProductV2PO> findAllStoreProductV2(StoreProductV2PO productV2PO);

    StoreProductV2PO addStoreProductV2(StoreProductV2PO productV2PO);

    StoreProductV2PO findStoreProductV2ById(Long id);

    StoreProductV2PO updateStoreProductV2PO(StoreProductV2PO storeProductV2PO);

    List<StoreProductV2PO> findStoreProductV2BySeriesId(Long id);
}
