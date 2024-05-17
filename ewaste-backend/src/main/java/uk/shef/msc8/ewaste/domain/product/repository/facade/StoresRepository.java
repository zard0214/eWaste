package uk.shef.msc8.ewaste.domain.product.repository.facade;

import org.springframework.stereotype.Repository;
import uk.shef.msc8.ewaste.domain.product.repository.po.SeriesPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.StoresPO;

import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 25/04/2024 11:01
 */
@Repository
public interface StoresRepository {

    List<StoresPO> findAllStores();

    StoresPO addStore(StoresPO storesPO);

    StoresPO findById(Long id);

    StoresPO updateStore(StoresPO storesPO);

    StoresPO findByName(String name);
}
