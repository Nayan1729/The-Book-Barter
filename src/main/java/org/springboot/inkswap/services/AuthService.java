package org.springboot.inkswap.services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springboot.inkswap.dtos.LoginRequestDTO;
import org.springboot.inkswap.dtos.RegisterRequestDTO;
import org.springboot.inkswap.dtos.RegisterResponseDTO;
import org.springboot.inkswap.entities.Role;
import org.springboot.inkswap.entities.User;
import org.springboot.inkswap.repositories.UserRepository;
import org.springboot.inkswap.utilities.ApiException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    private final ModelMapper modelMapper ;

    public String login(LoginRequestDTO loginRequestDTO) throws ApiException {
        try {
            // Attempt to authenticate the user using the authentication manager
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestDTO.getEmail(), loginRequestDTO.getPassword())
            );
                // If authentication is successful, set the authentication in the SecurityContext
                // Explicitly set the Authentication in the SecurityContext
                SecurityContextHolder.getContext().setAuthentication(auth);

                return this.jwtService.generateToken(loginRequestDTO.getEmail());
        }//Actually authenticate throws AuthenticationException but BadCredentials and UsernameNotFound extends it so it works
        catch (BadCredentialsException e) {
            throw new ApiException("Invalid username or password", 401);
        } catch (UsernameNotFoundException e) {
            throw new ApiException("User not found", 404);
        }
    }

    public Map<String, Object> register(RegisterRequestDTO registerRequestDTO){
        Optional<User> existingUser = this.userRepository.findByEmail(registerRequestDTO.getEmail());
        if(existingUser.isPresent()){
            throw new ApiException("User already exists", 400);
        }
        User user = this.modelMapper.map(registerRequestDTO, User.class);
        user.setPassword(this.encoder.encode(registerRequestDTO.getPassword()));
        user.setRole(Role.USER);
        User savedUser = this.userRepository.save(user);
        RegisterResponseDTO registerResponseDTO = modelMapper.map(savedUser, RegisterResponseDTO.class);
        String token = this.jwtService.generateToken(registerResponseDTO.getEmail());
        Map<String, Object> response = new HashMap<>();
        response.put("user", registerResponseDTO);
        response.put("token", token);
        return response;
    }

}
