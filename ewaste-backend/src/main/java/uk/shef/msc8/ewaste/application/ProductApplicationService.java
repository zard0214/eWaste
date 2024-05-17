package uk.shef.msc8.ewaste.application;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.product.entity.ProductV2;
import uk.shef.msc8.ewaste.domain.product.entity.Series;
import uk.shef.msc8.ewaste.domain.product.entity.Store;
import uk.shef.msc8.ewaste.domain.product.entity.StoreProductV2;
import uk.shef.msc8.ewaste.domain.product.repository.po.*;
import uk.shef.msc8.ewaste.domain.product.service.*;
import uk.shef.msc8.ewaste.interfaces.dto.ProductV2DTO;

import javax.annotation.Resource;
import java.util.List;
@Service
public class ProductApplicationService {
    @Resource
    private ProductDomainService productDomainService;
    @Resource
    private BrandsDomainService brandsDomainService;
    @Resource
    private SeriesDomainService seriesDomainService;
    @Resource
    private StoresDomainService storesDomainService;
    @Resource
    private StoreProductV2DomainService storeProductV2DomainService;


    @Resource
    private ProductV2DomainService productV2DomainService;

    public ProductPO addProduct(ProductPO newProduct) {
        return productDomainService.addProduct(newProduct);
    }

    public ProductPO findById(Long id) {
        return productDomainService.findById(id);
    }

    public ProductPO updateProduct(ProductPO existingProduct) {
        return productDomainService.updateProduct(existingProduct);
    }

    public List<ProductPO> findAll() {
        return productDomainService.findAll();
    }

    public List<ProductPO> findAllProducts() {
        return productDomainService.findAllProducts();
    }

    public List<ProductPO> findByBrand(String brand) {
        return productDomainService.findByBrand(brand);
    }

    public List<ProductPO> findByType(String type) {
        return productDomainService.findByType(type);
    }

    public List<ProductPO> findByUserId(Long id) {
        return productDomainService.findByUserId(id);
    }

    public List<ProductPO> searchProducts(String keyword) {
        return productDomainService.searchProducts(keyword);
    }

    public List<ProductPO> findLatestProducts() {
        return productDomainService.findLatestProducts();
    }

    public List<BrandsPO> findAllBrands() {
        return brandsDomainService.findAllBrands();
    }

    public List<Series> findAllSeries() {
        return seriesDomainService.findAllSeries();
    }

    public BrandsPO addBrand(BrandsPO brandsPO) {
        return brandsDomainService.addBrand(brandsPO);
    }

    public BrandsPO findBrandById(Long id) {
        return brandsDomainService.findById(id);
    }

    public BrandsPO updateBrand(BrandsPO brandsPO) {
        return brandsDomainService.updateBrands(brandsPO);
    }

    public SeriesPO addSeries(SeriesPO brandsPO) {
        return seriesDomainService.addSeries(brandsPO);
    }

    public SeriesPO findSeriesById(Long id) {
        return seriesDomainService.findById(id);
    }

    public SeriesPO updateSeries(SeriesPO brandsPO) {
        return seriesDomainService.updateSeries(brandsPO);
    }






    //PRODUCT V2 created by zzc
    public List<ProductV2> findAllProductV2() {
        return productV2DomainService.findAllProductV2();
    }

    public void updateProductV2(ProductV2DTO productV2DTO) {
        ProductV2PO productV2PO = new ProductV2PO();
        BeanUtils.copyProperties(productV2DTO, productV2PO);
        productV2DomainService.updateProductV2(productV2PO);
    }

    public List<Series> findSeriesByBrandId(Long brandId) {
        return seriesDomainService.findSeriesByBrandId(brandId);
    }

    public ProductV2 findProductV2ById(Long id) {
        return productV2DomainService.findProductV2ById(id);
    }

    public List<ProductV2> getAllProducts4sell() {
        return productV2DomainService.getAllProducts4sell();
    }

    public List<Store> findAllStores() {
        return storesDomainService.findAllStores();
    }

    public StoresPO addStore(StoresPO storesPO) {
        return storesDomainService.addStore(storesPO);
    }

    public StoresPO findStoreById(Long id) {
        return storesDomainService.findById(id);
    }

    public StoresPO updateStore(StoresPO storesPO) {
        return storesDomainService.updateStore(storesPO);
    }

    public List<StoreProductV2> findAllStoreProductV2() {
        return storeProductV2DomainService.findAllStoreProductV2();
    }

    public StoreProductV2PO addStoreProduct(StoreProductV2PO storesPO) {
        return storeProductV2DomainService.addStoreProductV2(storesPO);
    }

    public StoreProductV2PO findStoreProductV2ById(Long id) {
        return storeProductV2DomainService.findStoreProductV2ById(id);
    }

    public StoreProductV2PO updateStoreProductV2PO(StoreProductV2PO storeProductV2PO) {
        return storeProductV2DomainService.updateStoreProductV2PO(storeProductV2PO);
    }

    public List<StoreProductV2> findStoreProductV2BySeriesId(Long id) {
        return storeProductV2DomainService.findStoreProductV2BySeriesId(id);
    }

    public List<ProductV2> searchProductsV2(String keyword) {
        return productV2DomainService.searchProductsV2(keyword);
    }

    public List<BrandsPO> searchBrandsPO(String keyword) {
        return brandsDomainService.searchBrandsPO(keyword);
    }

    public List<Series> searchSeries(String keyword) {
        return seriesDomainService.searchSeries(keyword);
    }

    public List<ProductV2PO> searchProductsV2ByType(String keyword) {
        return productV2DomainService.searchProductsV2ByType(keyword);
    }
}
