package com.taskmanager.backend.model;

import java.util.List;

// Represents one page of tasks and its pagination metadata.
public class TaskPageResponse {

    // Tasks returned for the current page.
    private List<Task> content;

    // Zero-based page number requested by the client.
    private int page;

    // Maximum number of tasks requested per page.
    private int size;

    // Total number of matching tasks across all pages.
    private long totalElements;

    // Number of pages needed for all matching tasks.
    private int totalPages;

    // Constructor initializes the complete paginated response.
    public TaskPageResponse(
            List<Task> content,
            int page,
            int size,
            long totalElements) {
        this.content = content;
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;

        // Round up so a partially filled final page is counted.
        this.totalPages = (int) Math.ceil((double) totalElements / size);
    }

    // Getters allow Spring to serialize this response into JSON.
    public List<Task> getContent() { return content; }
    public int getPage() { return page; }
    public int getSize() { return size; }
    public long getTotalElements() { return totalElements; }
    public int getTotalPages() { return totalPages; }
}