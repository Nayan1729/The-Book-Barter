package org.springboot.the_book_barter.dtos;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class RegisterRequestDTO {
    private String email;
    private String password;
    private String name;
    private String phoneNumber;
    private MultipartFile avatar;
}
