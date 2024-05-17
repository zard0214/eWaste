package uk.shef.msc8.ewaste.domain.product.repository.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductPO;
import uk.shef.msc8.ewaste.domain.user.repository.po.RolePO;

import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 03:17
 */
@Mapper
public interface ProductMapper extends BaseMapper<ProductPO> {

    ProductPO getProductById(Long id);

    List<ProductPO> getProductByBrand(String brand);

    List<ProductPO> getProductByType(String type);

    List<ProductPO> getProductByDataRetrieve(Boolean dataRetrieve);

    List<ProductPO> getProductByUserId(Long userId);
}
