package org.springboot.inkswap.dtos;

import lombok.Data;

@Data
public class RegisterRequestDTO {
    private String email;
    private String password;
    private String name;
    private String phoneNumber;
}
