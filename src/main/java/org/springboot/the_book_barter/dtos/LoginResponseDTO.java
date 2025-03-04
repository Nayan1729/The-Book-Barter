package org.springboot.the_book_barter.dtos;

import lombok.Data;

@Data
public class LoginResponseDTO {
    private int id;
    private String name;
    private String email;
    private String role;
}
