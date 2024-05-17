package uk.shef.msc8.ewaste.domain.product.repository.facade;

import com.github.pagehelper.PageInfo;
import uk.shef.msc8.ewaste.domain.product.repository.po.BrandsPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductPO;

import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 11/03/2024 03:03
 */
public interface BrandsRepository {

    PageInfo<BrandsPO> selectPageList(Long receiverId, Integer pageNo, Integer pageSize);

    BrandsPO saveBrands(BrandsPO newUser);

    BrandsPO selectById(Long brandId);

    List<BrandsPO> selectAll();

    void update(BrandsPO brandsPO);

    List<BrandsPO> findAllBrands();

    BrandsPO addBrand(BrandsPO brandsPO);

    BrandsPO findById(Long id);

    BrandsPO updateBrands(BrandsPO brandsPO);

    BrandsPO findByName(String name);

    List<BrandsPO> searchBrandsPO(String keyword);
}
