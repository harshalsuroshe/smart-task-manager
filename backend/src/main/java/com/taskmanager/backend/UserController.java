package com.taskmanager.backend;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.backend.model.Task;
import com.taskmanager.backend.model.User;
import com.taskmanager.backend.model.UserResponse;
import com.taskmanager.backend.service.TaskService;
import com.taskmanager.backend.service.UserService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5174")
public class UserController {

    private final UserService userService;
    private final TaskService taskService;

    // Spring injects both services through this constructor.
    public UserController(UserService userService, TaskService taskService) {
        this.userService = userService;
        this.taskService = taskService;
    }

    // POST /api/users
    // Creates a user and returns only safe, public user information.
    @PostMapping
    public ResponseEntity<UserResponse> createUser(
            @Valid @RequestBody CreateUserRequest request) {

        // Pass the submitted password to the service.
        // The service hashes it before saving it to MySQL.
        User user = new User(
                null,
                request.name(),
                request.email(),
                request.password()
        );

        User createdUser = userService.createUser(user);

        // Never include the password hash in the response.
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(UserResponse.from(createdUser));
    }

    // GET /api/users
    // Returns all users without exposing password hashes.
    @GetMapping
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers()
                .stream()
                .map(UserResponse::from)
                .toList();
    }

    // GET /api/users/{id}
    // Returns one user without exposing a password hash.
    @GetMapping("/{id:\\d+}")
    public UserResponse getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return UserResponse.from(user);
    }

    // GET /api/users/{userId}/tasks
    // Retrieves tasks belonging to the specified user.
    @GetMapping("/{userId:\\d+}/tasks")
    public List<Task> getUserTasks(@PathVariable Long userId) {
        return taskService.getTasksByUserId(userId);
    }

    // POST /api/users/{userId}/tasks
    // Creates a task for the specified user.
    @PostMapping("/{userId:\\d+}/tasks")
    public ResponseEntity<Task> createTaskForUser(
            @PathVariable Long userId,
            @Valid @RequestBody Task task) {

        Task createdTask = taskService.createTaskForUser(userId, task);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdTask);
    }

    
    // Validates registration data before it reaches the service.
    public record CreateUserRequest(
            @NotBlank(message = "Name is required")
            String name,

            @NotBlank(message = "Email is required")
            @Email(message = "Enter a valid email address")
            String email,

            @NotBlank(message = "Password is required")
            @jakarta.validation.constraints.Size(
                    min = 8,
                    message = "Password must contain at least 8 characters"
            )
            String password
    ) {
    }

}
