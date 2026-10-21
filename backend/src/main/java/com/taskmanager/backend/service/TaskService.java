package com.taskmanager.backend.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.taskmanager.backend.TaskNotFoundException;
import com.taskmanager.backend.model.Task;
import com.taskmanager.backend.model.TaskPageResponse;
import com.taskmanager.backend.model.TaskPriority;
import com.taskmanager.backend.model.TaskStatus;
import com.taskmanager.backend.model.User;
import com.taskmanager.backend.repository.TaskRepository;



// Marks this class as the business-logic layer managed by Spring
@Service
public class TaskService {

    // Creates a logger associated with this class
    private static final Logger logger =
            LoggerFactory.getLogger(TaskService.class);

    // Repository used to access task data in MySQL
    private final TaskRepository taskRepository;
    // Service for validating and retrieving users.
    private final UserService userService;

    // Spring injects the repository through this constructor
    public TaskService(TaskRepository taskRepository, UserService userService) {
        this.taskRepository = taskRepository;
        this.userService = userService;
    }

    // Retrieves all tasks
    public List<Task> getAllTasks() throws Exception {
        // DEBUG is useful when investigating the request flow
        logger.debug("Fetching all tasks");

        // Ask the repository to retrieve tasks from MySQL
        List<Task> tasks = taskRepository.findAll();

        // Record the result count, not the entire task contents
        logger.info("Retrieved {} tasks", tasks.size());

        // Return the tasks to the controller
        return tasks;
    }

    // Creates and saves a new task
    @Transactional  // A new task is created within a transaction.
    public Task createTask(Task task) {

        // Only assign the default user when no owner was supplied.
        if (task.getUserId() == null) {
            User defaultUser = userService.getUserByEmail(
                    "default@taskmanager.local"
            );

            task.setUserId(defaultUser.getId());
        } else {
            // If an owner was supplied, verify that the user exists.
            userService.getUserById(task.getUserId());
        }

        // Save the task with its owner ID.
        return taskRepository.save(task);
    }

    // Retrieves a task by ID or reports that it doesn't exist
    public Task getTaskById(Long id) throws Exception {
        // Record which resource is being requested
        logger.debug("Fetching task with ID {}", id);

        // Ask the repository to search for the task
        Task task = taskRepository.findById(id);

        // If no matching row exists, throw our custom exception
        if (task == null) {
            // WARN is appropriate because this is a handled condition
            logger.warn("Task with ID {} was not found", id);

            // The global exception handler will convert this to HTTP 404
            throw new TaskNotFoundException(
                    "Task with ID " + id + " was not found"
            );
        }

        // Return the matching task
        return task;
    }


    // Replaces the editable fields of an existing task
    @Transactional // Updating a task, including the existence check, is one transaction.
    public Task updateTask(Long id, Task request) throws Exception {
        // Verify that the task exists before attempting the update
        Task existingTask = taskRepository.findById(id);

        // Report a missing task using our existing custom exception
        if (existingTask == null) {
            throw new TaskNotFoundException(
                    "Task with ID " + id + " was not found"
            );
        }

        // Build the updated task using the ID from the URL
        // so the request body cannot change which row is updated
        Task updatedTask = new Task(
                id,
                request.getTitle(),
                request.getDescription(),
                request.getStatus(),
                request.getPriority(),
                existingTask.getUserId()    // Preserve the current owner
        );

        // Ask the repository to update the database row
        boolean updated = taskRepository.update(updatedTask);

        // Protect against an unexpected case where the row disappears
        if (!updated) {
            throw new IllegalStateException(
                    "Task could not be updated"
            );
        }

        // Record the successful operation using the existing logger
        logger.info("Task with ID {} updated successfully", id);

        // Return the updated task to the controller
        return updatedTask;
    }

    // Deletes an existing task
    @Transactional  // Deleting a task, including the existence check, is one transaction.
    public void deleteTask(Long id) throws Exception {
        // Verify that the requested task exists
        Task existingTask = taskRepository.findById(id);

        // Return 404 through the global exception handler if missing
        if (existingTask == null) {
            throw new TaskNotFoundException(
                    "Task with ID " + id + " was not found"
            );
        }

        // Delete the row from MySQL
        boolean deleted = taskRepository.deleteById(id);

        // Report an unexpected failure rather than claiming success
        if (!deleted) {
            throw new IllegalStateException(
                    "Task could not be deleted"
            );
        }

        // Record the successful operation
        logger.info("Task with ID {} deleted successfully", id);
    }

    // Validates the request and coordinates paginated task retrieval.
    public TaskPageResponse getTasksPage(
            String status,
            String priority,
            String sortBy,
            String direction,
            int page,
            int size) {

        // Reject negative page numbers and unsafe or excessive page sizes.
        if (page < 0) {
            throw new IllegalArgumentException("Page must be zero or greater");
        }
        if (size < 1 || size > 100) {
            throw new IllegalArgumentException("Size must be between 1 and 100");
        }

        // Validate optional status values against the allowed enum constants.
        if (status != null && !status.isBlank()) {
            try {
                status = TaskStatus.valueOf(status.trim().toUpperCase()).name();
            } catch (IllegalArgumentException ex) {
                throw new IllegalArgumentException("Invalid task status");
            }
        }

        // Validate optional priority values against the allowed enum constants.
        if (priority != null && !priority.isBlank()) {
            try {
                priority = TaskPriority.valueOf(priority.trim().toUpperCase()).name();
            } catch (IllegalArgumentException ex) {
                throw new IllegalArgumentException("Invalid task priority");
            }
        }

        // Default sorting makes the results predictable when no sort is supplied.
        if (sortBy == null || sortBy.isBlank()) {
            sortBy = "id";
        }
        if (direction == null || direction.isBlank()) {
            direction = "asc";
        }

        // Accept only supported sort directions.
        if (!direction.equalsIgnoreCase("asc")
                && !direction.equalsIgnoreCase("desc")) {
            throw new IllegalArgumentException("Direction must be asc or desc");
        }

        // Fetch one page and the total number of matching tasks.
        List<Task> tasks = taskRepository.findTasks(
            status, priority, sortBy, direction, page, size
        );
        long total = taskRepository.countTasks(status, priority);

        // Package the page and metadata into a single API response.
        return new TaskPageResponse(tasks, page, size, total);
    }

    // Retrieve tasks belonging to a particular user.
    public List<Task> getTasksByUserId(Long userId) {

        // Verify that the requested user exists.
        userService.getUserById(userId);

        // Delegate the database query to the repository.
        return taskRepository.findByUserId(userId);
    }

    // Create a task that belongs to a specific user.
    @Transactional
    public Task createTaskForUser(Long userId, Task task) {

        // Verify that the user exists before creating their task.
        userService.getUserById(userId);

        // Assign the requested user as the task's owner.
        // We use the URL's userId rather than trusting a client-supplied ID.
        task.setUserId(userId);

        // Save the task and its owner ID in MySQL.
        return taskRepository.save(task);
    }

}
