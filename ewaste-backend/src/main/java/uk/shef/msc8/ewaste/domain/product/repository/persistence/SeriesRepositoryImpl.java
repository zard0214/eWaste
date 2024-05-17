package uk.shef.msc8.ewaste.domain.product.repository.persistence;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.product.entity.Series;
import uk.shef.msc8.ewaste.domain.product.repository.facade.SeriesRepository;
import uk.shef.msc8.ewaste.domain.product.repository.mapper.SeriesMapper;
import uk.shef.msc8.ewaste.domain.product.repository.po.BrandsPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.SeriesPO;
import uk.shef.msc8.ewaste.domain.product.service.SeriesFactory;
import uk.shef.msc8.ewaste.infrastructure.exception.BizException;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 11/03/2024 03:02
 */
@Service
public class SeriesRepositoryImpl extends ServiceImpl<SeriesMapper, SeriesPO> implements SeriesRepository {

    @Resource
    private SeriesFactory seriesFactory;

    @Override
    public PageInfo<SeriesPO> selectPageList(Long receiverId, Integer pageNo, Integer pageSize) {
        PageHelper.startPage(pageNo, pageSize);
        QueryWrapper<SeriesPO> queryWrapper = new QueryWrapper<>();
        PageInfo pageInfo = new PageInfo<>(baseMapper.selectList(queryWrapper));
        return pageInfo;
    }

    public List<SeriesPO> selectAll(){
        return baseMapper.selectList(null);
    }

    @Override
    public SeriesPO saveBrands(SeriesPO orderPO) {
        baseMapper.insert(orderPO);
        return orderPO;
    }
    @Override
    public SeriesPO selectById(Long orderId) {
        return baseMapper.selectById(orderId);
    }

    @Override
    public void update(SeriesPO seriesPO) {
        baseMapper.updateById(seriesPO);
    }

    @Override
    public List<Series> findAllSeries() {
        QueryWrapper<SeriesPO> query = new QueryWrapper<>();
        var seriesPOS = baseMapper.selectList(query);
        if (null == seriesPOS) {
            throw new BizException("series does not exist");
        }
        return seriesFactory.getSeries(seriesPOS);
    }

    @Override
    public SeriesPO addSeries(SeriesPO brandsPO) {
        baseMapper.insert(brandsPO);
        return brandsPO;
    }

    @Override
    public SeriesPO findById(Long id) {
        return baseMapper.selectById(id);
    }

    @Override
    public SeriesPO updateSeries(SeriesPO brandsPO) {
        baseMapper.updateById(brandsPO);
        return brandsPO;
    }

    @Override
    public List<Series> findSeriesByBrandId(Long brandId) {
        QueryWrapper<SeriesPO> query = new QueryWrapper<>();
        query.eq("brand_id", brandId);
        var seriesPOS = baseMapper.selectList(query);
        if (null == seriesPOS) {
            throw new BizException("series does not exist");
        }
        return seriesFactory.getSeries(seriesPOS);
    }

    @Override
    public SeriesPO findByName(String name) {
        QueryWrapper<SeriesPO> query = new QueryWrapper<>();
        query.eq("name", name);
        var brandsPOS = baseMapper.selectList(query);
        return brandsPOS == null|| brandsPOS.size() == 0 ? null: brandsPOS.get(0);
    }

    @Override
    public List<Series> searchSeries(String keyword) {
        QueryWrapper<SeriesPO> wrapper = new QueryWrapper<>();
        String lowercaseKeyword = keyword.toLowerCase();
        wrapper.like("LOWER(name)", lowercaseKeyword);
        var seriesPOS = baseMapper.selectList(wrapper);
        return seriesFactory.getSeries(seriesPOS);
    }


}


