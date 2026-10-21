package com.taskmanager.backend;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus; // Enables validation of incoming request data
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.backend.model.Task;
import com.taskmanager.backend.model.TaskPageResponse;
import com.taskmanager.backend.service.TaskService;

import jakarta.validation.Valid;


@RestController // Handles REST API requests and returns data as JSON
@CrossOrigin(origins = "http://localhost:5174") // Allows our React frontend
@RequestMapping("/api/tasks") // Applies /api/tasks as the base path for every endpoint below.
public class TaskController {

    // Service responsible for task-related operations
    private final TaskService taskService;

    // Spring automatically injects the service
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // GET /api/tasks - retrieve ONLY the authenticated user's tasks
    @GetMapping
    public List<Task> getTasks(Principal principal) throws Exception {
        // The JWT filter stores the user's ID in the Principal's name
        Long userId = Long.valueOf(principal.getName());
        
        // Delegate to the service layer to fetch only this user's tasks
        return taskService.getTasksByUserId(userId);
    }

    // GET /api/tasks/{id} - retrieves one task using its ID from the URL
    @GetMapping("/{id:\\d+}")
    public Task getTaskById(
            // Reads the ID from the URL, such as /api/tasks/3
            @PathVariable Long id) throws Exception {

        // Delegate the task lookup to the service layer
        return taskService.getTaskById(id);
    }

    // POST /api/tasks - creates a new task assigned to the logged-in user
    @PostMapping
    public ResponseEntity<Task> createTask(
            // Converts the incoming JSON into a Task object and validates it
            @Valid @RequestBody Task task,
            // Injects the authenticated user details from the JWT filter
            Principal principal) throws Exception {
        
        // Extract the user's ID from the Principal's name
        Long userId = Long.valueOf(principal.getName());
        
        // Delegate to the user-specific creation method in the service layer
        Task createdTask = taskService.createTaskForUser(userId, task);
        
        // Return HTTP 201 Created and the saved task as JSON
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdTask);
    }

    // PUT /api/tasks/{id} - replaces the editable fields of a task
// PUT /api/tasks/{id} - replaces the editable fields of a task securely
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody Task task,
            Principal principal) throws Exception {
        
        Long userId = Long.valueOf(principal.getName());
        Task updatedTask = taskService.updateTask(id, task, userId);
        
        return ResponseEntity.status(HttpStatus.OK).body(updatedTask);
    }

    // DELETE /api/tasks/{id} - deletes a task by ID securely
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long id,
            Principal principal) throws Exception {
        
        Long userId = Long.valueOf(principal.getName());
        taskService.deleteTask(id, userId);
        
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    // Searches tasks using optional filters, sorting, and pagination.
    // The existing GET /api/tasks endpoint remains unchanged.
    @GetMapping("/search")
    public ResponseEntity<TaskPageResponse> searchTasks(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        // Delegate validation and query coordination to the service layer.
        TaskPageResponse result = taskService.getTasksPage(
            status, priority, sortBy, direction, page, size
        );

        // Return the requested page and its metadata with HTTP 200.
        return ResponseEntity.ok(result);
    }

}
