package org.springboot.the_book_barter.controllers;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springboot.the_book_barter.dtos.LoginRequestDTO;
import org.springboot.the_book_barter.dtos.LoginResponseDTO;
import org.springboot.the_book_barter.dtos.RegisterRequestDTO;
import org.springboot.the_book_barter.entities.User;
import org.springboot.the_book_barter.services.AuthService;
import org.springboot.the_book_barter.services.UserService;
import org.springboot.the_book_barter.utilities.ApiException;
import org.springboot.the_book_barter.utilities.ApiResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final ModelMapper modelMapper;
    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequestDTO loginRequestDTO){
        try{
            System.out.println(loginRequestDTO);
            String token = this.authService.login(loginRequestDTO);
            User currentUser = this.userService.getUserByEmail(loginRequestDTO.getEmail());
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + token);
            LoginResponseDTO loginResponseDTO = this.modelMapper.map(currentUser, LoginResponseDTO.class);
            return ResponseEntity.ok().headers(headers).body(new ApiResponse(200,loginResponseDTO,"User logged in successfully"));
        }catch (ApiException e){
            return ResponseEntity.status(e.getStatusCode()).body(new ApiResponse(e.getStatusCode(),null,e.getMessage()));
        }
    }

    @PostMapping(value = "/register",consumes ="multipart/form-data")
    public ResponseEntity<ApiResponse> register(@ModelAttribute RegisterRequestDTO registerRequestDTO){
        try{
           Map<String ,Object> response = this.authService.register(registerRequestDTO);
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + response.get("token"));
           return ResponseEntity.ok().headers(headers).body(new ApiResponse(201,response.get("user"),"User registered successfully"));
        }catch (ApiException e){
            return ResponseEntity.status(e.getStatusCode()).body(new ApiResponse(e.getStatusCode(),null,e.getMessage()));
        }
    }
    @GetMapping("/home")
    public ResponseEntity<ApiResponse> home(){
        try{
            return ResponseEntity.ok().body(new ApiResponse(201,"Hello","User registered successfully"));
        }catch (ApiException e){
            return ResponseEntity.status(e.getStatusCode()).body(new ApiResponse(e.getStatusCode(),null,e.getMessage()));
        }
    }
}
