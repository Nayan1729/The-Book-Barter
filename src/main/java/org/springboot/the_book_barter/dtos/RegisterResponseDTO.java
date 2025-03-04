package org.springboot.the_book_barter.dtos;

import lombok.Data;

@Data
public class RegisterResponseDTO {
    private int id;
    private String name;
    private String email;
    private String role;
}
