package org.springboot.inkswap.services;

import lombok.RequiredArgsConstructor;
import org.springboot.inkswap.entities.User;
import org.springboot.inkswap.entities.UserPrincipal;
import org.springboot.inkswap.repositories.UserRepository;
import org.springboot.inkswap.utilities.ApiException;
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
