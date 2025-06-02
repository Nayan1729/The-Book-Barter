package org.springboot.the_book_barter.dtos;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String email;
    private String password;
}
