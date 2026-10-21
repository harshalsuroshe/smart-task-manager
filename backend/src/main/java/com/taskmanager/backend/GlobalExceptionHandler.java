package com.taskmanager.backend;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// Applies these exception-handling rules across REST controllers
@RestControllerAdvice
public class GlobalExceptionHandler {

        private static final Logger logger =
        LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // Handles requests for tasks that do not exist
    @ExceptionHandler(TaskNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleTaskNotFound(
            TaskNotFoundException exception) {

        // Include a useful message in the JSON response
        Map<String, String> errorResponse = Map.of(
                "error", exception.getMessage()
        );

        // Return HTTP 404 Not Found
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(errorResponse);
    }

    // Handles validation errors such as a blank title or a title that's too long
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(
            MethodArgumentNotValidException exception) {

        // Get the first validation error's message
        String message = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .findFirst()
                .map(error -> error.getDefaultMessage())
                .orElse("Request validation failed");

        // Create a consistent JSON error body
        Map<String, String> errorResponse = Map.of(
                "error", message
        );

        // Return HTTP 400 Bad Request
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(errorResponse);
    }

    // Handles malformed JSON and invalid enum values such as status "BANANA"
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> handleUnreadableRequest(
            HttpMessageNotReadableException exception) {

        // Keep the response understandable without exposing internal details
        Map<String, String> errorResponse = Map.of(
                "error", "Invalid request body. Check your JSON and enum values."
        );

        // Return HTTP 400 Bad Request
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(errorResponse);
    }

    // Handles unexpected exceptions not covered by the specific handlers
    
        @ExceptionHandler(Exception.class)
        public ResponseEntity<Map<String, String>> handleUnexpectedError(
                Exception exception) {

        // Record the full exception and stack trace in backend logs
        logger.error("An unexpected error occurred while processing a request",
                exception);

        // Do not expose database details or stack traces to API clients
        Map<String, String> errorResponse = Map.of(
                "error", "An unexpected server error occurred"
        );

        // Return HTTP 500 with a safe, generic JSON response
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(errorResponse);
        }

        // Converts invalid search parameters into a client-facing HTTP 400 response.
        @ExceptionHandler(IllegalArgumentException.class)
        public ResponseEntity<Map<String, String>> handleIllegalArgument(
                IllegalArgumentException ex) {

        // Send a clear message without exposing internal server details.
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", ex.getMessage()));
        }

}
