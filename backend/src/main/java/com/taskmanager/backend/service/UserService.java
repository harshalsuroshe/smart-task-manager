package com.taskmanager.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.taskmanager.backend.model.User;
import com.taskmanager.backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    // Constructor injection
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Create a user after basic input validation
    @Transactional
    public User createUser(User user) {

        // Reject missing or blank names
        if (user.getName() == null || user.getName().isBlank()) {
            throw new IllegalArgumentException("Name is required");
        }

        // Reject missing or blank emails
        if (user.getEmail() == null || user.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }

        // Trim surrounding whitespace before saving
        user.setName(user.getName().trim());
        user.setEmail(user.getEmail().trim());

        // Save the user and capture the generated database ID
        Long generatedId = userRepository.save(user);
        user.setId(generatedId);

        return user;
    }

    // Find a user or report that the requested ID does not exist
    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() ->
                new com.taskmanager.backend.TaskNotFoundException(
                    "User not found with ID: " + id
                )
            );
    }

    // Return every user
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Retrieve a user by email, or report that the user doesn't exist.
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalStateException("Default user was not found"));
    }
}