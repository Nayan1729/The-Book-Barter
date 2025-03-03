package org.springboot.inkswap.config;
import lombok.RequiredArgsConstructor;
import org.springboot.inkswap.filters.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
@EnableWebSecurity
public class SecurityConfig {
    private final CustomCorsConfig corsConfig;
    private final CustomAutenticationEntryPoint authenticationEntryPoint;
    private final JwtFilter jwtFilter;
    private final UserDetailsService userDetailsService;
    public SecurityConfig(CustomCorsConfig corsConfig,
                          CustomAutenticationEntryPoint authenticationEntryPoint,
                          JwtFilter jwtFilter,
                          UserDetailsService userDetailsService) {
        this.corsConfig = corsConfig;
        this.authenticationEntryPoint = authenticationEntryPoint;
        this.jwtFilter = jwtFilter;
        this.userDetailsService = userDetailsService;
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(customizer->customizer.disable())
                .authorizeHttpRequests(
                        request->request
                                .requestMatchers("/api/v1/auth/login","/api/v1/auth/register").permitAll()
                                .anyRequest().authenticated())
                .sessionManagement(session->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .cors(c->c.configurationSource(corsConfig))
                .exceptionHandling(e->{
                                    e.authenticationEntryPoint(authenticationEntryPoint);
                })
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        // To work with the database we have the daoAuthenticationProvider
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(new BCryptPasswordEncoder(12));
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
