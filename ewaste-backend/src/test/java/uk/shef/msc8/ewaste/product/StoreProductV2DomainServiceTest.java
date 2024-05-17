package uk.shef.msc8.ewaste.product;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import uk.shef.msc8.ewaste.domain.product.repository.facade.StoreProductV2Repository;
import uk.shef.msc8.ewaste.domain.product.repository.po.StoreProductV2PO;
import uk.shef.msc8.ewaste.domain.product.service.StoreProductV2DomainService;
import uk.shef.msc8.ewaste.domain.product.service.StoreProductV2Factory;
import uk.shef.msc8.ewaste.infrastructure.exception.BizException;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class StoreProductV2DomainServiceTest {
    @Mock
    private StoreProductV2Repository storeProductV2Repository;
    @Mock
    private StoreProductV2Factory storeProductV2Factory;

    @InjectMocks
    private StoreProductV2DomainService storeProductV2DomainService;

    @Before
    public void setUp(){
        MockitoAnnotations.initMocks(this);
    }


//    @Test
//    public void testFindAllStoreProductV2() {
//        List<StoreProductV2PO> storeProductV2POList = new ArrayList<>();
//
//        StoreProductV2PO storeProductV2PO1 = new StoreProductV2PO();
//        storeProductV2PO1.setId(1L);
//        storeProductV2PO1.setStoreId(1L);
//        storeProductV2PO1.setBrandId(1L);
//        storeProductV2PO1.setSeriesId(1L);
//        storeProductV2POList.add(storeProductV2PO1);
//
//        when(storeProductV2Repository.findAllStoreProductV2()).thenReturn(storeProductV2POList);
//
//        verify(storeProductV2Repository, times(1)).findAllStoreProductV2();
//    }

    @Test
    public void testAddStoreProductV2_WhenProductDoesNotExist() {
        when(storeProductV2Repository.findAllStoreProductV2(any(StoreProductV2PO.class))).thenReturn(new ArrayList<>());

        StoreProductV2PO newProductV2 = new StoreProductV2PO();

        when(storeProductV2Repository.addStoreProductV2(newProductV2)).thenReturn(newProductV2);

        StoreProductV2PO result = storeProductV2DomainService.addStoreProductV2(newProductV2);

        assertNotNull(result);

        assertEquals(newProductV2, result);

        verify(storeProductV2Repository, times(1)).findAllStoreProductV2(any(StoreProductV2PO.class));

        verify(storeProductV2Repository, times(1)).addStoreProductV2(newProductV2);
    }

    @Test(expected = BizException.class)
    public void testAddStoreProductV2_WhenProductExists() {
        StoreProductV2PO existingProductV2 = new StoreProductV2PO();

        when(storeProductV2Repository.findAllStoreProductV2(any(StoreProductV2PO.class))).thenReturn(List.of(existingProductV2));

        StoreProductV2PO newProductV2 = new StoreProductV2PO();

        storeProductV2DomainService.addStoreProductV2(newProductV2);
    }

    @Test
    public void testFindStoreProductV2ById() {
        Long id = 1L;

        StoreProductV2PO expectedProductV2 = new StoreProductV2PO();
        expectedProductV2.setId(id);

        when(storeProductV2Repository.findStoreProductV2ById(id)).thenReturn(expectedProductV2);

        StoreProductV2PO result = storeProductV2DomainService.findStoreProductV2ById(id);

        assertNotNull(result);

        assertEquals(expectedProductV2, result);

        verify(storeProductV2Repository, times(1)).findStoreProductV2ById(id);
    }

    @Test
    public void testUpdateStoreProductV2PO() {
        StoreProductV2PO storeProductV2PO = new StoreProductV2PO();
        storeProductV2PO.setId(1L);
        storeProductV2PO.setStoreId(1L);
        storeProductV2PO.setBrandId(1L);
        storeProductV2PO.setSeriesId(1L);

        when(storeProductV2Repository.updateStoreProductV2PO(storeProductV2PO)).thenReturn(storeProductV2PO);

        StoreProductV2PO result = storeProductV2DomainService.updateStoreProductV2PO(storeProductV2PO);

        assertNotNull(result);

        assertEquals(storeProductV2PO, result);

        verify(storeProductV2Repository, times(1)).updateStoreProductV2PO(storeProductV2PO);
    }

}


