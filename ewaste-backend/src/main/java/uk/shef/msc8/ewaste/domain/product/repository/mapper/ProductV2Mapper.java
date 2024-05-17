package uk.shef.msc8.ewaste.domain.product.repository.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import uk.shef.msc8.ewaste.domain.product.repository.po.ProductV2PO;

import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 11/03/2024 03:00
 */
@Mapper
public interface ProductV2Mapper extends BaseMapper<ProductV2PO> {

    List<ProductV2PO> searchProductsV2(String keyword);

    List<ProductV2PO> searchProductsV2ByType(String keyword);
}
