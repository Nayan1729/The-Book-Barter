package org.springboot.the_book_barter.services;

import lombok.RequiredArgsConstructor;
import org.springboot.the_book_barter.entities.User;
import org.springboot.the_book_barter.entities.UserPrincipal;
import org.springboot.the_book_barter.repositories.UserRepository;
import org.springboot.the_book_barter.utilities.ApiException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    public User getLoggedInUser() throws ApiException {
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = principal.getUsername();
        Optional<User> userOptional = this.userRepository.findByEmail(email);
        if(!userOptional.isPresent() || userOptional == null ) {
            throw new ApiException("User Not found" , 404);
        }
        return userOptional.get();
    }
}
