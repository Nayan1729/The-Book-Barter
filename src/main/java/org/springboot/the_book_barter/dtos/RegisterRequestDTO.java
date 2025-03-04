package org.springboot.the_book_barter.dtos;

import lombok.Data;

@Data
public class RegisterRequestDTO {
    private String email;
    private String password;
    private String name;
    private String phoneNumber;
}
