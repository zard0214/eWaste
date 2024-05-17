package uk.shef.msc8.ewaste.domain.product.repository.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import uk.shef.msc8.ewaste.domain.product.repository.po.StoreProductV2PO;

import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 11/03/2024 03:00
 */
@Mapper
public interface StoreProductV2Mapper extends BaseMapper<StoreProductV2PO> {

    List<StoreProductV2PO> findStoreProductV2BySeriesId(Long id);
}
