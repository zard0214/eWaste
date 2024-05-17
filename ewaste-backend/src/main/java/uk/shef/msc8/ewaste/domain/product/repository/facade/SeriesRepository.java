package uk.shef.msc8.ewaste.domain.product.repository.facade;

import com.github.pagehelper.PageInfo;
import uk.shef.msc8.ewaste.domain.product.entity.Series;
import uk.shef.msc8.ewaste.domain.product.repository.po.SeriesPO;

import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 11/03/2024 03:03
 */
public interface SeriesRepository {

    PageInfo<SeriesPO> selectPageList(Long receiverId, Integer pageNo, Integer pageSize);

    SeriesPO saveBrands(SeriesPO seriesPO);

    SeriesPO selectById(Long brandId);

    List<SeriesPO> selectAll();

    void update(SeriesPO seriesPO);

    List<Series> findAllSeries();

    SeriesPO addSeries(SeriesPO brandsPO);

    SeriesPO findById(Long id);

    SeriesPO updateSeries(SeriesPO brandsPO);

    List<Series> findSeriesByBrandId(Long brandId);

    SeriesPO findByName(String name);

    List<Series> searchSeries(String keyword);
}
