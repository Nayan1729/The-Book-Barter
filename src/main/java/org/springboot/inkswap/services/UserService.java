package org.springboot.inkswap.services;

import lombok.RequiredArgsConstructor;
import org.springboot.inkswap.entities.User;
import org.springboot.inkswap.repositories.UserRepository;
import org.springboot.inkswap.utilities.ApiException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUserByEmail(String email) {
        Optional<User> userOptional =  this.userRepository.findByEmail(email);
        if(!userOptional.isPresent() || userOptional == null ) {
            throw new ApiException("User Not found" , 404);
        }
        return userOptional.get();
    }

}
