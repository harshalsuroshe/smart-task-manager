package com.taskmanager.backend;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.backend.model.LoginRequest;
import com.taskmanager.backend.model.User;
import com.taskmanager.backend.model.UserResponse;
import com.taskmanager.backend.service.JwtService;
import com.taskmanager.backend.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth") // Base URL for all endpoints in this controller
@CrossOrigin(origins = "http://localhost:5174") // Allows requests from your React frontend
public class AuthController {
    
    private final UserService userService;
    private final JwtService jwtService;

    // Spring Boot automatically injects the necessary services through this constructor
    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    // ==========================================
    // 1. LOGIN ENDPOINT (POST /api/auth/login)
    // ==========================================
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        // Step 1: Pass the email and password to the UserService to verify them against the database.
        User user = userService.login(request.email(), request.password());
        
        // Step 2: If the login succeeds, generate a secure JWT token for the user.
        String token = jwtService.generateToken(user.getId(), user.getEmail());
        
        // Step 3: Return a successful response containing the token and safe user details (excluding password).
        return ResponseEntity.ok(
                Map.of(
                        "token", token,
                        "user", UserResponse.from(user)
                )
        );
    }

    // ==========================================
    // 2. REGISTER ENDPOINT (POST /api/auth/register)
    // ==========================================
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> request) {
        try {
            // Step 1: Extract the new user's details from the incoming React request
            String name = request.get("name");
            String email = request.get("email");
            String password = request.get("password");

            // Step 2: Pass the data to the UserService. 
            // The service will handle checking for duplicates, hashing the password, and saving to MySQL.
            User newUser = userService.registerUser(name, email, password);

            // Step 3: If successful, return an HTTP 200 OK response with the newly created user's safe data.
            return ResponseEntity.ok(Map.of(
                "message", "User registered successfully",
                "user", Map.of(
                    "id", newUser.getId(),
                    "name", newUser.getName(),
                    "email", newUser.getEmail()
                )
            ));
            
        } catch (IllegalArgumentException e) {
            // Step 4: If the UserService throws an error (e.g., "Email is already in use"), 
            // catch it here and send an HTTP 400 Bad Request back to React with the error message.
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}