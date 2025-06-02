package org.springboot.the_book_barter.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class S3Config {

    @Value("${AWS_ACCESS_KEY}")
    private  String awsS3accessKey ;

    @Value("${AWS_SECRET_KEY}")
    private String awsS3secretKey;

    @Value("${AWS_REGION}")
    private String awsRegion;

    @Bean
    public AmazonS3 s3Client() {
        AWSCredentials credentials = new BasicAWSCredentials(awsS3accessKey, awsS3secretKey);
        AmazonS3 amazonS3 =  AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(awsRegion)
                .build();
        return amazonS3;
    }
}
