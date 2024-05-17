package uk.shef.msc8.ewaste.domain.product.repository.persistence;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.product.repository.facade.StoresRepository;
import uk.shef.msc8.ewaste.domain.product.repository.mapper.StoresMapper;
import uk.shef.msc8.ewaste.domain.product.repository.po.SeriesPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.StoresPO;

import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 11/03/2024 03:02
 */
@Service
public class StoresRepositoryImpl extends ServiceImpl<StoresMapper, StoresPO> implements StoresRepository {

    @Override
    public List<StoresPO> findAllStores() {
        return baseMapper.selectList(null);
    }

    @Override
    public StoresPO addStore(StoresPO storesPO) {
        baseMapper.insert(storesPO);
        return storesPO;
    }

    @Override
    public StoresPO findById(Long id) {
        return baseMapper.selectById(id);
    }

    @Override
    public StoresPO updateStore(StoresPO storesPO) {
        baseMapper.updateById(storesPO);
        return storesPO;
    }

    @Override
    public StoresPO findByName(String name) {
        QueryWrapper<StoresPO> query = new QueryWrapper<>();
        query.eq("name", name);
        var brandsPOS = baseMapper.selectList(query);
        return brandsPOS == null|| brandsPOS.size() == 0 ? null: brandsPOS.get(0);
    }
}
