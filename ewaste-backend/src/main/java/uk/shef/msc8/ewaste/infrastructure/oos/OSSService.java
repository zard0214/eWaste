package uk.shef.msc8.ewaste.infrastructure.oos;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.xiaoleilu.hutool.date.DateTime;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.UUID;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 23/03/2024 00:56
 */
@Service
public class OSSService {

    public String uploadFile(MultipartFile file) {

        String endPoind = Properties.END_POIND;
        String accessKeyId = Properties.ACCESS_KEY_ID;
        String accessKeySecret = Properties.ACCESS_KEY_SECRET;
        String bucketName = Properties.BUCKET_NAME;
        try {
            OSS ossClient = new OSSClientBuilder().build(endPoind, accessKeyId, accessKeySecret);
            InputStream inputStream = file.getInputStream();

            String fileName = file.getOriginalFilename();
            String uuid = UUID.randomUUID().toString().replaceAll("-", "");
            fileName = uuid + fileName;
            String datePath = new DateTime().toString("yyyy/MM/dd");
            fileName = datePath + "/" +fileName;
            ossClient.putObject(bucketName, fileName, inputStream);
            String url = "https://" + bucketName + "." + endPoind + "/" + fileName;
            ossClient.shutdown();
            return url;
        }catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    /*
        delete Object
     */
    public void deleteObject(String String) {
        String endPoind = Properties.END_POIND;
        String accessKeyId = Properties.ACCESS_KEY_ID;
        String accessKeySecret = Properties.ACCESS_KEY_SECRET;
        String bucketName = Properties.BUCKET_NAME;
        try {
            OSS ossClient = new OSSClientBuilder().build(endPoind, accessKeyId, accessKeySecret);
            ossClient.deleteObject(bucketName, String);
            ossClient.shutdown();
        }catch (Exception e) {
            e.printStackTrace();
        }
    }


}
