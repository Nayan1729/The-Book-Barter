package org.springboot.inkswap.dtos;

import lombok.Data;

@Data
public class LoginResponseDTO {
    private int id;
    private String name;
    private String email;
    private String role;
}
