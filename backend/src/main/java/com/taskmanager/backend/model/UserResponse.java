package com.taskmanager.backend.model;

// Contains only information that is safe to return through the API.
// Password hashes must never be included in API responses.
public record UserResponse(
    Long id,
    String name,
    String email
) {

    // Convert an internal User model into a safe API response.
    public static UserResponse from(User user) {
        return new UserResponse(
            user.getId(),
            user.getName(),
            user.getEmail()
        );
    }
}
