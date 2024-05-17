package uk.shef.msc8.ewaste.product;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import uk.shef.msc8.ewaste.domain.product.entity.Series;
import uk.shef.msc8.ewaste.domain.product.repository.facade.SeriesRepository;
import uk.shef.msc8.ewaste.domain.product.repository.po.BrandsPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.SeriesPO;
import uk.shef.msc8.ewaste.domain.product.service.SeriesDomainService;
import uk.shef.msc8.ewaste.infrastructure.exception.BizException;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;


public class SeriesDomainServiceTest {
    @Mock
    private SeriesRepository seriesRepository;

    @InjectMocks
    private SeriesDomainService seriesDomainService;

    @Before
    public void setUp(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testFindAllSeries() {

        List<Series> seriesList = new ArrayList<>();

        when(seriesRepository.findAllSeries()).thenReturn(seriesList);

        List<Series> result = seriesDomainService.findAllSeries();

        assertEquals(seriesList, result);
    }

    @Test
    public void testAddSeries_WhenSeriesNameDoesNotExist() {
        SeriesPO newSeries = new SeriesPO();
        newSeries.setName("New Series");

        when(seriesRepository.findByName("New Series")).thenReturn(null);
        when(seriesRepository.addSeries(newSeries)).thenReturn(newSeries);

        SeriesPO result = seriesDomainService.addSeries(newSeries);

        assertNotNull(result);
        assertEquals(newSeries, result);

        verify(seriesRepository, times(1)).findByName("New Series");
        verify(seriesRepository, times(1)).addSeries(newSeries);
    }

    @Test(expected = BizException.class)
    public void testAddSeries_WhenSeriesNameExists() {
        SeriesPO existingSeries = new SeriesPO();
        existingSeries.setName("Existing Series");

        when(seriesRepository.findByName("Existing Series")).thenReturn(existingSeries);

        SeriesPO newSeries = new SeriesPO();
        newSeries.setName("Existing Series");

        seriesDomainService.addSeries(newSeries);
    }

    @Test
    public void testUpdateSeries() {
        SeriesPO seriesToUpdate = new SeriesPO();
        seriesToUpdate.setId(1L);
        seriesToUpdate.setName("Updated Series");

        when(seriesRepository.updateSeries(seriesToUpdate)).thenReturn(seriesToUpdate);

        SeriesPO result = seriesDomainService.updateSeries(seriesToUpdate);

        assertNotNull(result);
        assertEquals(seriesToUpdate, result);

        verify(seriesRepository, times(1)).updateSeries(seriesToUpdate);
    }

    @Test
    public void testFindById() {
        Long id = 1L;

        SeriesPO testSeries = new SeriesPO();
        testSeries.setId(id);

        when(seriesRepository.findById(id)).thenReturn(testSeries);

        SeriesPO result = seriesDomainService.findById(id);

        assertNotNull(result);
        assertEquals(testSeries, result);

        verify(seriesRepository, times(1)).findById(id);
    }

    @Test
    public void testFindByName() {
        String name = "TestSeries";

        SeriesPO testSeries = new SeriesPO();
        testSeries.setName(name);

        when(seriesRepository.findByName(name)).thenReturn(testSeries);

        SeriesPO result = seriesDomainService.findByName(name);

        assertNotNull(result);
        assertEquals(testSeries, result);

        verify(seriesRepository, times(1)).findByName(name);
    }

    @Test
    public void testSearchSeries() {
        String keyword = "A";

        List<Series> searchResult = new ArrayList<>();
        Series series1 = new Series();
        series1.setId(1L);
        series1.setName("Apple");
        Series series2 = new Series();
        series2.setId(2L);
        series2.setName("LG");
        searchResult.add(series1);
        searchResult.add(series2);

        when(seriesRepository.searchSeries(keyword)).thenReturn(searchResult);

        List<Series> result = seriesDomainService.searchSeries(keyword);

        assertNotNull(result);
        assertEquals(searchResult, result);

        verify(seriesRepository, times(1)).searchSeries(keyword);
    }

}
