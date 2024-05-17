package uk.shef.msc8.ewaste.domain.product.repository.persistence;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.product.repository.facade.StoreProductV2Repository;
import uk.shef.msc8.ewaste.domain.product.repository.facade.StoresRepository;
import uk.shef.msc8.ewaste.domain.product.repository.mapper.StoreProductV2Mapper;
import uk.shef.msc8.ewaste.domain.product.repository.mapper.StoresMapper;
import uk.shef.msc8.ewaste.domain.product.repository.po.SeriesPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.StoreProductV2PO;
import uk.shef.msc8.ewaste.domain.product.repository.po.StoresPO;

import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 11/03/2024 03:02
 */
@Service
public class StoreProductV2RepositoryImpl extends ServiceImpl<StoreProductV2Mapper, StoreProductV2PO> implements StoreProductV2Repository {

    @Override
    public List<StoreProductV2PO> findAllStoreProductV2() {
        {
            return baseMapper.selectList(null);
        }
    }

    @Override
    public List<StoreProductV2PO> findAllStoreProductV2(StoreProductV2PO productV2PO) {
        {
            QueryWrapper<StoreProductV2PO> query = new QueryWrapper<>();
            query.eq("series_id", productV2PO.getSeriesId());
            query.eq("store_id", productV2PO.getStoreId());
            return baseMapper.selectList(query);
        }
    }

    @Override
    public StoreProductV2PO addStoreProductV2(StoreProductV2PO productV2PO) {
        baseMapper.insert(productV2PO);
        return productV2PO;
    }

    @Override
    public StoreProductV2PO findStoreProductV2ById(Long id) {
        return baseMapper.selectById(id);
    }

    @Override
    public StoreProductV2PO updateStoreProductV2PO(StoreProductV2PO storeProductV2PO) {
        baseMapper.updateById(storeProductV2PO);
        return storeProductV2PO;
    }

    @Override
    public List<StoreProductV2PO> findStoreProductV2BySeriesId(Long id) {
        return baseMapper.findStoreProductV2BySeriesId(id);
    }

}