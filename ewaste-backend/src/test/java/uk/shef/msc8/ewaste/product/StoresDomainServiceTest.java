package uk.shef.msc8.ewaste.product;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import uk.shef.msc8.ewaste.domain.product.entity.Store;
import uk.shef.msc8.ewaste.domain.product.repository.facade.StoresRepository;
import uk.shef.msc8.ewaste.domain.product.repository.po.StoresPO;
import uk.shef.msc8.ewaste.domain.product.service.StoreFactory;
import uk.shef.msc8.ewaste.domain.product.service.StoresDomainService;
import uk.shef.msc8.ewaste.infrastructure.exception.BizException;

import javax.annotation.Resource;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class StoresDomainServiceTest {

    @Mock
    private StoresRepository storesRepository;
    @Mock
    private StoreFactory storeFactory;

    @InjectMocks
    private StoresDomainService storesDomainService;

    @Before
    public void setUp(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testFindAllStores() {
        List<StoresPO> storesPO = new ArrayList<>();

        StoresPO storePO1 = new StoresPO();
        storePO1.setId(1L);
        storePO1.setName("Store 1");
        storesPO.add(storePO1);

        when(storesRepository.findAllStores()).thenReturn(storesPO);

        List<Store> expectedStores = new ArrayList<>();
        Store store1 = new Store();
        store1.setId(1L);
        store1.setName("Store 1");
        expectedStores.add(store1);

        when(storeFactory.getStores(storesPO)).thenReturn(expectedStores);

        List<Store> result = storesDomainService.findAllStores();

        assertEquals(expectedStores, result);

        verify(storesRepository, times(1)).findAllStores();
        verify(storeFactory, times(1)).getStores(storesPO);
    }

    @Test
    public void testAddStore_WhenStoreNameDoesNotExist() {
        StoresPO newStore = new StoresPO();
        newStore.setName("New Store");

        when(storesRepository.findByName("New Store")).thenReturn(null);

        when(storesRepository.addStore(newStore)).thenReturn(newStore);

        StoresPO result = storesDomainService.addStore(newStore);

        assertEquals(newStore, result);

        verify(storesRepository, times(1)).findByName("New Store");
        verify(storesRepository, times(1)).addStore(newStore);
    }

    @Test(expected = BizException.class)
    public void testAddStore_WhenStoreNameExists() {
        StoresPO existingStore = new StoresPO();
        existingStore.setName("Existing Store");

        when(storesRepository.findByName("Existing Store")).thenReturn(existingStore);

        StoresPO newStore = new StoresPO();
        newStore.setName("Existing Store");

        storesDomainService.addStore(newStore);
    }

    @Test
    public void testUpdateStore() {
        StoresPO storeToUpdate = new StoresPO();
        storeToUpdate.setId(1L);
        storeToUpdate.setName("Updated Store");

        when(storesRepository.updateStore(storeToUpdate)).thenReturn(storeToUpdate);

        StoresPO result = storesDomainService.updateStore(storeToUpdate);

        assertEquals(storeToUpdate, result);

        verify(storesRepository, times(1)).updateStore(storeToUpdate);
    }

    @Test
    public void testFindById() {
        Long id = 1L;
        StoresPO storeToFind = new StoresPO();
        storeToFind.setId(id);
        storeToFind.setName("Test Store");

        when(storesRepository.findById(id)).thenReturn(storeToFind);

        StoresPO result = storesDomainService.findById(id);

        assertEquals(storeToFind, result);

        verify(storesRepository, times(1)).findById(id);
    }

    @Test
    public void testFindByName() {
        String name = "Test Store";
        StoresPO storeToFind = new StoresPO();
        storeToFind.setId(1L);
        storeToFind.setName(name);

        when(storesRepository.findByName(name)).thenReturn(storeToFind);

        StoresPO result = storesDomainService.findByName(name);

        assertEquals(storeToFind, result);

        verify(storesRepository, times(1)).findByName(name);
    }
}
