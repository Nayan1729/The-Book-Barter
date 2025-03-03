package org.springboot.inkswap.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springboot.inkswap.entities.User;
import org.springboot.inkswap.utilities.ApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JwtService {

    @Value("${SECRET_KEY}")
    private  String secretKeyString;
    private static final long expiration = 7*24 * 60 * 60 * 1000;
    @Autowired @Lazy
    private  UserService userService;
    private SecretKey secretKey;
    @PostConstruct
    public void init() {
        if (secretKeyString == null || secretKeyString.isEmpty()) {
            throw new ApiException("Secret key is not configured properly.", 500);
        }

        // Ensure the secret key is valid for HMAC-SHA256
        this.secretKey = Keys.hmacShaKeyFor(secretKeyString.getBytes());
        System.out.println("Secret key initialized successfully.");
    }


    public String generateToken(String email) {
        User user = userService.getUserByEmail(email);
        Map<String, Object> claims = new HashMap<>();
        //Put roles in claims
        claims.put("roles", user.getRole().name());

        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(email)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .and()
                .signWith(getKey())
                .compact();
    }

    private SecretKey getKey() {
        return secretKey;
    }

    public String extractEmail(String token) {
        // extract the username from jwt token
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String userName = extractEmail(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

}
