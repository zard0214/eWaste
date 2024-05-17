package uk.shef.msc8.ewaste.domain.product.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.product.entity.Series;
import uk.shef.msc8.ewaste.domain.product.repository.facade.SeriesRepository;
import uk.shef.msc8.ewaste.domain.product.repository.po.SeriesPO;
import uk.shef.msc8.ewaste.infrastructure.exception.BizException;

import javax.annotation.Resource;
import java.util.List;

@Service
@Slf4j
public class SeriesDomainService {
    @Resource
    private SeriesRepository seriesRepository;

    public List<Series> findAllSeries() {
        return seriesRepository.findAllSeries();
    }

    public SeriesPO addSeries(SeriesPO brandsPO) {
        if(findByName(brandsPO.getName()) != null)
            throw new BizException("series name already exits");
        return seriesRepository.addSeries(brandsPO);
    }

    public SeriesPO findById(Long id) {
        return seriesRepository.findById(id);
    }

    public SeriesPO updateSeries(SeriesPO brandsPO) {
//        if(findByName(brandsPO.getName()) != null)
//            throw new BizException("series name already exits");
        return seriesRepository.updateSeries(brandsPO);
    }

    public List<Series> findSeriesByBrandId(Long brandId) {
        return seriesRepository.findSeriesByBrandId(brandId);
    }

    public SeriesPO findByName(String name) {
        return seriesRepository.findByName(name);
    }

    public List<Series> searchSeries(String keyword) {
        return seriesRepository.searchSeries(keyword) ;
    }


}
