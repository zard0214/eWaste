package uk.shef.msc8.ewaste.domain.product.repository.persistence;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.product.repository.facade.BrandsRepository;
import uk.shef.msc8.ewaste.domain.product.repository.mapper.BrandsMapper;
import uk.shef.msc8.ewaste.domain.product.repository.po.BrandsPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductV2PO;

import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 11/03/2024 03:02
 */
@Service
public class BrandsRepositoryImpl extends ServiceImpl<BrandsMapper, BrandsPO> implements BrandsRepository {

    @Override
    public PageInfo<BrandsPO> selectPageList(Long receiverId, Integer pageNo, Integer pageSize) {
        PageHelper.startPage(pageNo, pageSize);
        QueryWrapper<BrandsPO> queryWrapper = new QueryWrapper<>();
        PageInfo pageInfo = new PageInfo<>(baseMapper.selectList(queryWrapper));
        return pageInfo;
    }

    public List<BrandsPO> selectAll(){
        return baseMapper.selectList(null);
    }

    @Override
    public BrandsPO saveBrands(BrandsPO orderPO) {
        baseMapper.insert(orderPO);
        return orderPO;
    }
    @Override
    public BrandsPO selectById(Long orderId) {
        return baseMapper.selectById(orderId);
    }

    @Override
    public void update(BrandsPO brandsPO) {
        baseMapper.updateById(brandsPO);
    }

    @Override
    public List<BrandsPO> findAllBrands() {
        QueryWrapper<BrandsPO> query = new QueryWrapper<>();
        return baseMapper.selectList(query);
    }

    @Override
    public BrandsPO findById(Long id) {
        return baseMapper.selectById(id);
    }

    @Override
    public BrandsPO updateBrands(BrandsPO brandsPO) {
        baseMapper.updateById(brandsPO);
        return brandsPO;
    }

    @Override
    public BrandsPO findByName(String name) {
        QueryWrapper<BrandsPO> query = new QueryWrapper<>();
        query.eq("name", name);
        var brandsPOS = baseMapper.selectList(query);
        return brandsPOS == null|| brandsPOS.size() == 0 ? null: brandsPOS.get(0);
    }

    @Override
    public List<BrandsPO> searchBrandsPO(String keyword) {
        QueryWrapper<BrandsPO> wrapper = new QueryWrapper<>();
        String lowercaseKeyword = keyword.toLowerCase();
        wrapper.like("LOWER(name)", lowercaseKeyword);
        return baseMapper.selectList(wrapper);
    }

    @Override
    public BrandsPO addBrand(BrandsPO brandsPO) {
        baseMapper.insert(brandsPO);
        return brandsPO;
    }
}
