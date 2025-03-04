package org.springboot.the_book_barter.services;

import lombok.RequiredArgsConstructor;
import org.springboot.the_book_barter.entities.User;
import org.springboot.the_book_barter.entities.UserPrincipal;
import org.springboot.the_book_barter.repositories.UserRepository;
import org.springboot.the_book_barter.utilities.ApiException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
         Optional<User> user = this.userRepository.findByEmail(email);
         if (!user.isPresent() || user == null) {
            throw new ApiException("User not found", 404);
         }
        return new UserPrincipal(user.get());
    }
}
