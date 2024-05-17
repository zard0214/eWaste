package uk.shef.msc8.ewaste.domain.product.repository.persistence;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.product.repository.facade.ProductV2Repository;
import uk.shef.msc8.ewaste.domain.product.repository.mapper.ProductV2Mapper;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductV2PO;

import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/04/2024 13:39
 */
@Service
public class ProductV2RepositoryImpl extends ServiceImpl<ProductV2Mapper, ProductV2PO> implements ProductV2Repository {

    @Override
    public ProductV2PO saveProductV2(ProductV2PO newProduct) {
        baseMapper.insert(newProduct);
        return newProduct;
    }

    @Override
    public List<ProductV2PO> findAllProductV2() {
        return baseMapper.selectList(null);
    }

    @Override
    public ProductV2PO updateProductV2(ProductV2PO productV2PO) {
        baseMapper.updateById(productV2PO);
        return productV2PO;
    }

    @Override
    public ProductV2PO findProductV2ById(Long id) {
        return baseMapper.selectById(id);
    }

    @Override
    public List<ProductV2PO> getAllProducts4sell() {
        QueryWrapper<ProductV2PO> query = new QueryWrapper<>();
        query.eq("visibility", 1);
        return baseMapper.selectList(query);
    }

    @Override
    public List<ProductV2PO> searchProductsV2(String keyword) {
        return baseMapper.searchProductsV2(keyword);
    }

    @Override
    public List<ProductV2PO> searchProductsV2ByType(String keyword) {
        return baseMapper.searchProductsV2ByType(keyword);
    }
}
