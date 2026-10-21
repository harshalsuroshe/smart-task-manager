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
import com.taskmanager.backend.service.TaskService;
import com.taskmanager.backend.service.UserService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5174")
public class UserController {

    // Handles user-related operations
    private final UserService userService;

    // Handles task-related operations
    private final TaskService taskService;


    // Spring injects the service
        public UserController(
            UserService userService,
            TaskService taskService) {

        this.userService = userService;
        this.taskService = taskService;
    }

    // POST /api/users - create a new user
    @PostMapping
    public ResponseEntity<User> createUser(
            @Valid @RequestBody CreateUserRequest request) {

        // Convert the validated request into a User model
        User user = new User(
            null,
            request.name(),
            request.email()
        );

        User createdUser = userService.createUser(user);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(createdUser);
    }

    // GET /api/users - retrieve all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // GET /api/users/{id} - retrieve one user
    @GetMapping("/{id:\\d+}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // Request DTO: validates input before it reaches the service
    public record CreateUserRequest(
        @NotBlank(message = "Name is required")
        String name,

        @NotBlank(message = "Email is required")
        @Email(message = "Enter a valid email address")
        String email
    ) {}

    // GET /api/users/{userId}/tasks
    // Retrieve tasks belonging to one user.
    @GetMapping("/{userId:\\d+}/tasks")
    public List<Task> getUserTasks(@PathVariable Long userId) {

        // Delegate validation and retrieval to the service layer.
        return taskService.getTasksByUserId(userId);
    }

    // Create a task for a particular user.
    // Example URL: POST /api/users/1/tasks
    @PostMapping("/{userId:\\d+}/tasks")
    public ResponseEntity<Task> createTaskForUser(
            @PathVariable Long userId,
            @Valid @RequestBody Task task) {

        // Delegate validation of user existence and task creation
        // to the service layer.
        Task createdTask = taskService.createTaskForUser(userId, task);

        // Return HTTP 201 Created with the saved task in the response.
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }
    
}