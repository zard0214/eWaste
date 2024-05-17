 package uk.shef.msc8.ewaste.infrastructure.email;

 import com.google.common.io.CharStreams;
 import org.springframework.beans.factory.annotation.Value;
 import org.springframework.core.io.ClassPathResource;
 import org.springframework.core.io.InputStreamSource;
 import org.springframework.expression.EvaluationContext;
 import org.springframework.expression.common.TemplateParserContext;
 import org.springframework.expression.spel.standard.SpelExpressionParser;
 import org.springframework.expression.spel.support.StandardEvaluationContext;
 import org.springframework.mail.javamail.JavaMailSender;
 import org.springframework.mail.javamail.MimeMessageHelper;
 import org.springframework.stereotype.Service;

 import javax.annotation.Resource;
 import javax.mail.MessagingException;
 import javax.mail.internet.MimeMessage;
 import java.io.IOException;
 import java.io.InputStreamReader;
 import java.text.SimpleDateFormat;
 import java.util.Date;
 import java.util.HashMap;
 import java.util.Map;

 /**
  * @author Zhecheng Zhao
  * @RegistrationNo 220186627
  * @date Created in 27/02/2024 07:26
  */
 @Service
 public class MailService {

     @Resource
     private JavaMailSender javaMailSender;

     @Value("${spring.mail.username}")
     private String from;

     public void sendMimeMail(String to, String subject, String html, Map<String, InputStreamSource> pathToAttachment) throws MessagingException {
         if (pathToAttachment == null) { pathToAttachment = new HashMap<>(0); }
         final MimeMessage mimeMessage = javaMailSender.createMimeMessage();
         final MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,true,"UTF-8");
         helper.setFrom(from);
         helper.setTo(to);
         helper.setSubject(subject);
         helper.setText(html,true);
         if (!pathToAttachment.isEmpty()){
             for (String s : pathToAttachment.keySet()) {
                 helper.addAttachment(s, pathToAttachment.get(s));
             }
         }
         javaMailSender.send(mimeMessage);
     }

     public void sendNotification(String email, String operatorName, String username, String dataUrl) throws MessagingException {
         final ClassPathResource resource = new ClassPathResource("templates/notification.html");
         String result;
         try {
             result = CharStreams.toString(new InputStreamReader(resource.getInputStream()));
         } catch (IOException e) {
             throw new RuntimeException(e);
         }
         final String title = "eWaste - " + operatorName;
         EvaluationContext context = new StandardEvaluationContext();
         context.setVariable("operation",operatorName);
         context.setVariable("username",username);
         context.setVariable("link", dataUrl);
         context.setVariable("datetime",newDate());
         final String content = new SpelExpressionParser().parseExpression(result, new TemplateParserContext()).getValue(context, String.class);
         this.sendMimeMail(email,title,content,null);
     }

     public void sendContactUs(String email, String operatorName, String username) throws MessagingException {
         final ClassPathResource resource = new ClassPathResource("templates/contact.html");
         String result;
         try {
             result = CharStreams.toString(new InputStreamReader(resource.getInputStream()));
         } catch (IOException e) {
             throw new RuntimeException(e);
         }
         final String title = "eWaste - " + operatorName;
         EvaluationContext context = new StandardEvaluationContext();
         context.setVariable("operation",operatorName);
         context.setVariable("username",username);
         context.setVariable("datetime",newDate());
         final String content = new SpelExpressionParser().parseExpression(result, new TemplateParserContext()).getValue(context, String.class);
         this.sendMimeMail(email,title,content,null);
     }

     public String newDate() {
         final SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
         return format.format(new Date());
     }
 }