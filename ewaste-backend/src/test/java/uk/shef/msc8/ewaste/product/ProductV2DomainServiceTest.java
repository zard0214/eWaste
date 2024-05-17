package uk.shef.msc8.ewaste.product;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import uk.shef.msc8.ewaste.domain.product.entity.ProductV2;
import uk.shef.msc8.ewaste.domain.product.repository.facade.ProductV2Repository;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductV2PO;
import uk.shef.msc8.ewaste.domain.product.repository.po.SeriesPO;
import uk.shef.msc8.ewaste.domain.product.service.*;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ProductV2DomainServiceTest {

    @Mock
    private SeriesDomainService seriesDomainService;

    @Mock
    private BrandsDomainService brandsDomainService;
    @Mock
    private static ProductV2Repository productV2Repository;
    @Mock
    private ProductV2Factory productV2Factory;
    @InjectMocks
    private static ProductV2DomainService productV2DomainService;

    static {

    }

    @Before
    public void setUp(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testFindAllProductV2_ProductsExist() {
        List<ProductV2PO> existingProductV2POList = new ArrayList<>();
        ProductV2PO productV2PO1 = new ProductV2PO();
        productV2PO1.setId(1L);
        existingProductV2POList.add(productV2PO1);

        when(productV2Repository.findAllProductV2()).thenReturn(existingProductV2POList);

        List<ProductV2> resultProductV2List = productV2DomainService.findAllProductV2();

        verify(productV2Repository, times(1)).findAllProductV2();
        verify(productV2Factory, times(1)).getProductV2(existingProductV2POList);

    }

    @Test
    public void testUpdateProductV2_Success() {
        ProductV2PO productV2PO = new ProductV2PO();
        productV2PO.setId(1L);
        productV2PO.setSeriesId(1L);

        when(productV2Repository.updateProductV2(productV2PO)).thenReturn(productV2PO);

        ProductV2PO updatedProductV2PO = productV2DomainService.updateProductV2(productV2PO);

        verify(productV2Repository, times(1)).updateProductV2(productV2PO);

        assertEquals(productV2PO.getId(), updatedProductV2PO.getId());
        assertEquals(productV2PO.getSeriesId(), updatedProductV2PO.getSeriesId());
    }

    @Test
    public void testClassificationStrategy() {
        ProductV2PO productV2PO = new ProductV2PO();
        productV2PO.setId(1L);
        productV2PO.setCapacity("1 TB");
        productV2PO.setBrandId(1L);
        productV2PO.setSeriesId(1L);
        productV2PO.setYearOfRelease(2021);
        productV2PO.setCondition(1);

        SeriesPO seriesPO = new SeriesPO();
        seriesPO.setExpectedValue(100D);

        when(seriesDomainService.findById(1L)).thenReturn(seriesPO);

        ProductV2PO result = productV2DomainService.classificationStrategy(productV2PO);
    }

    @Test
    public void testFindProductV2ById() {
        ProductV2PO productV2PO = new ProductV2PO();
        productV2PO.setId(1L);
        when(productV2Repository.findProductV2ById(anyLong())).thenReturn(productV2PO);

        ProductV2 productV2 = new ProductV2();
        when(productV2Factory.getProductV2(productV2PO)).thenReturn(productV2);

        ProductV2 result = productV2DomainService.findProductV2ById(1L);

        assertEquals(productV2, result);

        verify(productV2Repository, times(1)).findProductV2ById(1L);
        verify(productV2Factory, times(1)).getProductV2(productV2PO);
    }

    @Test
    public void testGetAllProducts4sell() {
        List<ProductV2PO> productV2POS = new ArrayList<>();

        when(productV2Repository.getAllProducts4sell()).thenReturn(productV2POS);

        List<ProductV2> expectedProducts = new ArrayList<>();

        when(productV2Factory.getProductV2(productV2POS)).thenReturn(expectedProducts);

        List<ProductV2> result = productV2DomainService.getAllProducts4sell();

        assertEquals(expectedProducts, result);

        verify(productV2Repository, times(1)).getAllProducts4sell();
        verify(productV2Factory, times(1)).getProductV2(productV2POS);
    }

    @Test
    public void testSearchProductsV2() {
        String keyword = "test";

        List<ProductV2PO> productV2POS = new ArrayList<>();

        when(productV2Repository.searchProductsV2(keyword)).thenReturn(productV2POS);

        List<ProductV2> expectedProducts = new ArrayList<>();

        when(productV2Factory.getProductV2(productV2POS)).thenReturn(expectedProducts);

        List<ProductV2> result = productV2DomainService.searchProductsV2(keyword);

        assertEquals(expectedProducts, result);

        verify(productV2Repository, times(1)).searchProductsV2(keyword);
        verify(productV2Factory, times(1)).getProductV2(productV2POS);
    }

}
