package com.taskmanager.backend.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    // Keep the JWT filter already used by your application.
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            // Our frontend communicates with the backend using JSON APIs.
            .csrf(AbstractHttpConfigurer::disable)

            // Enable CORS so browser requests from React can reach Spring Boot.
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // JWT authentication does not require server-side sessions.
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // Define which requests need authentication.
            .authorizeHttpRequests(auth -> auth

                // Allow browser CORS preflight requests.
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // Login, registration, and the existing public users endpoint.
                .requestMatchers(
                    "/api/auth/**",
                    "/api/users"
                ).permitAll()

                // All remaining endpoints require authentication.
                .anyRequest().authenticated()
            )

            // Keep JWT authentication before Spring's username/password filter.
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        // This must match the origin shown in your browser.
        configuration.setAllowedOrigins(
            List.of("http://localhost:5174")
        );

        // Allow the HTTP methods used by the frontend.
        configuration.setAllowedMethods(
            Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
        );

        // The JWT is sent through the Authorization header.
        configuration.setAllowedHeaders(
            Arrays.asList("Authorization", "Content-Type", "Accept")
        );

        // The application uses bearer tokens, not cookie-based authentication.
        configuration.setAllowCredentials(false);

        // Cache successful preflight permission for 1 hour.
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();

        // Apply these CORS rules to API requests.
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Continue using BCrypt for password hashing.
        return new BCryptPasswordEncoder();
    }
}
