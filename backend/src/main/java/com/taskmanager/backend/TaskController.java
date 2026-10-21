package com.taskmanager.backend;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity; // Enables validation of incoming request data
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

    // GET /api/tasks - retrieve all saved tasks
    @GetMapping
    public List<Task> getTasks() throws Exception {
        return taskService.getAllTasks();
    }

    // GET /api/tasks/{id} - retrieves one task using its ID from the URL
    @GetMapping("/{id:\\d+}")
    public Task getTaskById(
            // Reads the ID from the URL, such as /api/tasks/3
            @PathVariable Long id) throws Exception {

        // Delegate the task lookup to the service layer
        return taskService.getTaskById(id);
    }

    // POST /api/tasks - creates a new task
    @PostMapping
    public ResponseEntity<Task> createTask(
            // Converts the incoming JSON into a Task object
            // and validates its fields before calling the method
            @Valid @RequestBody Task task) throws Exception {

        // Ask the service layer to save the task
        Task createdTask = taskService.createTask(task);

        // Return HTTP 201 Created and the saved task as JSON
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdTask);
    }

    // PUT /api/tasks/{id} - replaces the editable fields of a task
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            // Read the task ID from the URL
            @PathVariable Long id,

            // Convert the JSON body into a Task and validate its fields
            @Valid @RequestBody Task task) throws Exception {

        // Delegate update rules and database work to the service
        Task updatedTask = taskService.updateTask(id, task);

        // Return HTTP 200 OK with the updated task
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(updatedTask);
    }

    // DELETE /api/tasks/{id} - deletes a task by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            // Read the task ID from the URL
            @PathVariable Long id) throws Exception {

        // Ask the service to verify and delete the task
        taskService.deleteTask(id);

        // Return HTTP 204 No Content because deletion succeeded
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
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
