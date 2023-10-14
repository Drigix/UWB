package com.uwb.notificationserver.security;

import com.uwb.notificationserver.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;


    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        if (StringUtils.isEmpty(authHeader) || !StringUtils.startsWith(authHeader, "Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        jwt = authHeader.substring(7);
        String userEmail = jwtService.extractUserName(jwt);
        // Tutaj weryfikujemy jedynie poprawność tokenu, nie wymagając dostępu do UserDetails.
        if (jwtService.isTokenValid(jwt, userEmail)) {
            SecurityContext context = SecurityContextHolder.createEmptyContext();
            UserDetails userDetails = getUserAuthToken(jwt);
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            context.setAuthentication(authToken);
            SecurityContextHolder.setContext(context);
        }

        filterChain.doFilter(request, response);
    }

    private UserDetails getUserAuthToken(String jwt) {
        RestTemplate restTemplate = new RestTemplate();

// Przygotowanie nagłówka z JWT tokenem
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + jwt);

// Tworzenie żądania HTTP
        HttpEntity<String> entity = new HttpEntity<>(headers);

// Wysyłanie żądania do drugiej aplikacji
        ResponseEntity<UserDetails> response = restTemplate.exchange(
                "http://localhost:8080/api/user/user-authentication-token",
                HttpMethod.GET,
                entity,
                UserDetails.class);

// Pobranie wyniku z drugiej aplikacji
        return response.getBody();
    }
}