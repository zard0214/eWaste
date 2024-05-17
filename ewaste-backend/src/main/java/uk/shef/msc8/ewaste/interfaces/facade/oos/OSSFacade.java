package uk.shef.msc8.ewaste.interfaces.facade.oos;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import uk.shef.msc8.ewaste.infrastructure.common.resp.Response;
import uk.shef.msc8.ewaste.infrastructure.common.resp.ResponseDTO;
import uk.shef.msc8.ewaste.infrastructure.oos.OSSService;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 03:43
 */
@RestController
@Slf4j
public class OSSFacade {

    @Resource
    private OSSService ossService;

    @PostMapping(value = "/OSS/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseDTO upload(@RequestParam("file") MultipartFile file) {
        return Response.success(ossService.uploadFile(file));
    }
}
