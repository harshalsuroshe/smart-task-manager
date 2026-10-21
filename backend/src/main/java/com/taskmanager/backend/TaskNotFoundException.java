package com.taskmanager.backend;

// Defines a custom exception for requests involving missing tasks
public class TaskNotFoundException extends RuntimeException {

    // Passes the error message to Java's RuntimeException class
    public TaskNotFoundException(String message) {
        super(message);
    }
}