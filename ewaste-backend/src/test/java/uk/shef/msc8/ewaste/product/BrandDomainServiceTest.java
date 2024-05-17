package uk.shef.msc8.ewaste.product;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import uk.shef.msc8.ewaste.domain.product.repository.facade.BrandsRepository;
import uk.shef.msc8.ewaste.domain.product.repository.po.BrandsPO;
import uk.shef.msc8.ewaste.domain.product.service.BrandsDomainService;
import uk.shef.msc8.ewaste.domain.product.service.ProductDomainService;
import uk.shef.msc8.ewaste.infrastructure.exception.BizException;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.assertEquals;


public class BrandDomainServiceTest {
    @Mock
    private BrandsRepository brandsRepository;

    @InjectMocks
    private BrandsDomainService brandsDomainService;

    @Before
    public void setUp(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testFindAllBrands() {

        List<BrandsPO> brandsList = new ArrayList<>();

        when(brandsRepository.findAllBrands()).thenReturn(brandsList);

        List<BrandsPO> result = brandsDomainService.findAllBrands();

        assertEquals(brandsList, result);
    }

    @Test
    public void testAddBrand_WhenBrandNameDoesNotExist() {
        BrandsPO newBrand = new BrandsPO();
        newBrand.setName("New Brand");

        when(brandsRepository.findByName("New Brand")).thenReturn(null);
        when(brandsRepository.addBrand(newBrand)).thenReturn(newBrand);

        BrandsPO result = brandsDomainService.addBrand(newBrand);

        assertNotNull(result);
        assertEquals(newBrand, result);

        verify(brandsRepository, times(1)).findByName("New Brand");
        verify(brandsRepository, times(1)).addBrand(newBrand);
    }

    @Test(expected = BizException.class)
    public void testAddBrand_WhenBrandNameExists() {
        BrandsPO existingBrand = new BrandsPO();
        existingBrand.setName("Existing Brand");

        when(brandsRepository.findByName("Existing Brand")).thenReturn(existingBrand);

        BrandsPO newBrand = new BrandsPO();
        newBrand.setName("Existing Brand");

        brandsDomainService.addBrand(newBrand);
    }

    @Test
    public void testUpdateBrands() {
        BrandsPO brandToUpdate = new BrandsPO();
        brandToUpdate.setId(1L);
        brandToUpdate.setName("Updated Brand");

        when(brandsRepository.updateBrands(brandToUpdate)).thenReturn(brandToUpdate);

        BrandsPO result = brandsDomainService.updateBrands(brandToUpdate);

        assertNotNull(result);
        assertEquals(brandToUpdate, result);

        verify(brandsRepository, times(1)).updateBrands(brandToUpdate);
    }

    @Test
    public void testFindById() {
        Long id = 1L;

        BrandsPO testBrand = new BrandsPO();
        testBrand.setId(id);

        when(brandsRepository.findById(id)).thenReturn(testBrand);

        BrandsPO result = brandsDomainService.findById(id);

        assertNotNull(result);
        assertEquals(testBrand, result);

        verify(brandsRepository, times(1)).findById(id);
    }

    @Test
    public void testFindByName() {
        String name = "TestBrand";

        BrandsPO testBrand = new BrandsPO();
        testBrand.setName(name);

        when(brandsRepository.findByName(name)).thenReturn(testBrand);

        BrandsPO result = brandsDomainService.findByName(name);

        assertNotNull(result);
        assertEquals(testBrand, result);

        verify(brandsRepository, times(1)).findByName(name);
    }

    @Test
    public void testSearchBrandsPO() {
        String keyword = "A";

        List<BrandsPO> searchResult = new ArrayList<>();
        BrandsPO brand1 = new BrandsPO();
        brand1.setId(1L);
        brand1.setName("Apple");
        BrandsPO brand2 = new BrandsPO();
        brand2.setId(2L);
        brand2.setName("LG");
        searchResult.add(brand1);
        searchResult.add(brand2);


        when(brandsRepository.searchBrandsPO(keyword)).thenReturn(searchResult);

        List<BrandsPO> result = brandsDomainService.searchBrandsPO(keyword);

        assertNotNull(result);
        assertEquals(searchResult, result);

        verify(brandsRepository, times(1)).searchBrandsPO(keyword);
    }

}
