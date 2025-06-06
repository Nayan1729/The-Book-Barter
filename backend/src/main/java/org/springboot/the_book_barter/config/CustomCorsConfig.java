package org.springboot.the_book_barter.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Component
public class CustomCorsConfig implements CorsConfigurationSource {
    @Override
    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE" ,"PATCH"));
        config.setAllowedHeaders(List.of("*"));
        config.addExposedHeader("Authorization"); // Allow the frontend to access the Authorization header
        config.setAllowCredentials(true);
        return config;
    }
}
