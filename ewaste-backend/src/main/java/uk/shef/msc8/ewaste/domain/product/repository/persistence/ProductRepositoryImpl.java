package uk.shef.msc8.ewaste.domain.product.repository.persistence;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.product.repository.facade.ProductRepository;
import uk.shef.msc8.ewaste.domain.product.repository.mapper.ProductMapper;
import uk.shef.msc8.ewaste.domain.product.repository.po.BrandsPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductPO;


import java.util.List;

@Service
public class ProductRepositoryImpl extends ServiceImpl<ProductMapper, ProductPO>  implements ProductRepository{

    @Override
    public ProductPO saveProduct(ProductPO newProduct) {
        baseMapper.insert(newProduct);
        return newProduct;
    }

    @Override
    public ProductPO findById(Long id) {
        return baseMapper.selectById(id);
    }

    @Override
    public ProductPO updateProduct(ProductPO existingProduct) {
        baseMapper.updateById(existingProduct);
        return existingProduct;
    }

    @Override
    public List<ProductPO> findAll() {
        QueryWrapper<ProductPO> query = new QueryWrapper<>();
        query.ne("data_retrieve", true);  // Exclude products where data_retrieve is true
        return baseMapper.selectList(query);
    }

    @Override
    public List<ProductPO> findAllProducts() {
        QueryWrapper<ProductPO> query = new QueryWrapper<>();
        return baseMapper.selectList(query);
    }

    @Override
    public List<ProductPO> findByBrand(String brand) {
        return baseMapper.getProductByBrand(brand);
    }

    @Override
    public List<ProductPO> findByType(String type) {
        return baseMapper.getProductByType(type);
    }

    @Override
    public List<ProductPO> searchProducts(String keyword) {
        QueryWrapper<ProductPO> wrapper = new QueryWrapper<>();
        String lowercaseKeyword = keyword.toLowerCase();

        wrapper.like("LOWER(description)", lowercaseKeyword)
                .or().like("LOWER(brand)", lowercaseKeyword)
                .or().like("LOWER(model)", lowercaseKeyword)
                .or().like("LOWER(color)", lowercaseKeyword)
                .or().like("LOWER(type)", lowercaseKeyword)
                .or().like("LOWER(classification)", lowercaseKeyword);


        return baseMapper.selectList(wrapper);
    }

    @Override
    public List<ProductPO> findLatestProducts() {
        QueryWrapper<ProductPO> wrapper = new QueryWrapper<>();
        wrapper.orderByDesc("year_of_release")
                .last("limit " + 4);

        return baseMapper.selectList(wrapper);
    }

    @Override
    public List<ProductPO> findByDataRetrieve(Boolean dataRetrieve) {
        return baseMapper.getProductByDataRetrieve(dataRetrieve);
    }

    @Override
    public List<ProductPO> findByUserId(Long userId) {
        return baseMapper.getProductByUserId(userId);
    }

    @Override
    public ProductPO findByName(String name) {
        QueryWrapper<ProductPO> query = new QueryWrapper<>();
        query.eq("name", name);
        var brandsPOS = baseMapper.selectList(query);
        return brandsPOS == null|| brandsPOS.size() == 0 ? null: brandsPOS.get(0);
    }

}
