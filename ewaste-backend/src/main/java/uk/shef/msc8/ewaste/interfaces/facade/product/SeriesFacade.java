package uk.shef.msc8.ewaste.interfaces.facade.product;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import uk.shef.msc8.ewaste.application.ProductApplicationService;
import uk.shef.msc8.ewaste.domain.product.entity.Series;
import uk.shef.msc8.ewaste.domain.product.repository.po.BrandsPO;
import uk.shef.msc8.ewaste.domain.product.repository.po.SeriesPO;
import uk.shef.msc8.ewaste.infrastructure.common.resp.Response;
import uk.shef.msc8.ewaste.infrastructure.common.resp.ResponseDTO;
import uk.shef.msc8.ewaste.infrastructure.exception.ResourceNotFoundException;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/04/2024 13:06
 */
@RestController
@Slf4j
@RequestMapping("/series")
public class SeriesFacade {
    @Resource
    private ProductApplicationService productApplicationService;


    @GetMapping("/allseries")
    public ResponseDTO<List<Series>> getAll() {
        List<Series> seriesPOS = productApplicationService.findAllSeries();
        return Response.success(seriesPOS);
    }

    @PostMapping("/add")
    public ResponseDTO<SeriesPO> saveUser(@RequestBody SeriesPO seriesPO){
        SeriesPO savedBrand = productApplicationService.addSeries(seriesPO);
        if (savedBrand != null) {
            return Response.success(savedBrand);
        } else {
            return null;
        }
    }

    @GetMapping("/{id}")
    public ResponseDTO<SeriesPO> findSeriesById(@PathVariable Long id) {
        SeriesPO brandsPO = productApplicationService.findSeriesById(id);
        if (brandsPO != null) {
            return Response.success(brandsPO);
        }
        return null;
    }

    @PostMapping("/findSeriesByBrandId")
    public ResponseDTO<List<Series>> findSeriesByBrandId(@RequestBody SeriesPO seriesPO) {
        List<Series> seriesPOS = productApplicationService.findSeriesByBrandId(seriesPO.getBrandId());
        return Response.success(seriesPOS);
    }

    @GetMapping("/findSeriesByBrandId/{id}")
    public ResponseDTO<List<Series>> findSeriesByBrandId2(@PathVariable Long id) {
        List<Series> seriesPOS = productApplicationService.findSeriesByBrandId(id);
        return Response.success(seriesPOS);
    }


    @PutMapping("/{id}")
    public ResponseDTO<SeriesPO> updateBrands(@PathVariable Long id, @RequestBody SeriesPO brandsPO) {
        SeriesPO savedProduct = productApplicationService.updateSeries(brandsPO);
        if (savedProduct != null) {
            return Response.success(savedProduct);
        } else {
            throw new ResourceNotFoundException("Product not found with ID: " + id, null, savedProduct);
        }
    }


    @GetMapping("/search")
    public ResponseDTO<List<Series>> searchBrandsPO(@RequestParam("keyword") String keyword) {
        List<Series> products = productApplicationService.searchSeries(keyword);
        return Response.success(products);
    }



}
