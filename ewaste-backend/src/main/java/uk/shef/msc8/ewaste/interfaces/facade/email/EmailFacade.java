package uk.shef.msc8.ewaste.interfaces.facade.email;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import uk.shef.msc8.ewaste.interfaces.dto.EmailDTO;
import uk.shef.msc8.ewaste.infrastructure.common.resp.Response;
import uk.shef.msc8.ewaste.infrastructure.common.resp.ResponseDTO;
import uk.shef.msc8.ewaste.infrastructure.email.MailService;

import javax.annotation.Resource;

@RestController
@Slf4j
public class EmailFacade {

        @Resource
        private MailService mailService;

        @PostMapping("/email/notify")
        @PreAuthorize("hasRole('ROLE_STAFF') or hasRole('ROLE_ADMIN')")
        public ResponseDTO sendMail(@RequestBody EmailDTO emailRequest) {
            String email = emailRequest.getEmail();
            String operatorName = emailRequest.getOperatorName();
            String username = emailRequest.getUsername();
            String dataUrl = emailRequest.getDataUrl();

            try {
                mailService.sendNotification(email, operatorName, username, dataUrl);
                return Response.success();
            } catch (Exception e) {
                log.error("Failed to send email:", e);
                return Response.failed(e.getMessage());
            }
        }

    @PostMapping("/email/contact")
    @PreAuthorize("hasRole('ROLE_STAFF') or hasRole('ROLE_ADMIN')")
    public ResponseDTO sendRequestMail(@RequestBody EmailDTO emailRequest) {
        String email = emailRequest.getEmail();
        String operatorName = emailRequest.getOperatorName();
        String username = emailRequest.getUsername();

        try {
            mailService.sendContactUs(email, operatorName, username);
            return Response.success();
        } catch (Exception e) {
            log.error("Failed to send email:", e);
            return Response.failed(e.getMessage());
        }
    }
}
