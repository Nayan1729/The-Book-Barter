package org.springboot.inkswap.dtos;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String email;
    private String password;
}
