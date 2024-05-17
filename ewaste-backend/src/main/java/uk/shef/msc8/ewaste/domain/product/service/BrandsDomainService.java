package uk.shef.msc8.ewaste.domain.product.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import uk.shef.msc8.ewaste.domain.product.repository.facade.BrandsRepository;
import uk.shef.msc8.ewaste.domain.product.repository.facade.ProductRepository;
import uk.shef.msc8.ewaste.domain.product.repository.po.BrandsPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductPO;
import uk.shef.msc8.ewaste.domain.user.repository.po.UserPO;
import uk.shef.msc8.ewaste.infrastructure.exception.BizException;

import javax.annotation.Resource;
import java.util.List;

@Service
@Slf4j
public class BrandsDomainService {
    @Resource
    private BrandsRepository brandsRepository;

    public List<BrandsPO> findAllBrands() {
        return brandsRepository.findAllBrands();
    }

    public BrandsPO addBrand(BrandsPO brandsPO) {
    if(findByName(brandsPO.getName()) != null)
            throw new BizException("brand name already exits");
        return brandsRepository.addBrand(brandsPO);
    }

    public BrandsPO findById(Long id) {
        return brandsRepository.findById(id);
    }
    public BrandsPO findByName(String name) {
        return brandsRepository.findByName(name);
    }

    public BrandsPO updateBrands(BrandsPO brandsPO) {
//        if(findByName(brandsPO.getName()) != null)
//            throw new BizException("brand name already exits");
        return brandsRepository.updateBrands(brandsPO);
    }

    public List<BrandsPO> searchBrandsPO(String keyword) {
        return brandsRepository.searchBrandsPO(keyword);
    }
}
