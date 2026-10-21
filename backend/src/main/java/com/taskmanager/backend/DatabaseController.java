                    package com.taskmanager.backend;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DatabaseController {

    @GetMapping("/api/db-tasks")
    public List<Map<String, Object>> getDatabaseTasks()
            throws Exception {

        String url =
            "jdbc:mysql://localhost:3306/taskflow_db";

        String username = "root";
        String password = System.getenv("DB_PASSWORD");

        String sql = "SELECT * FROM tasks";

        List<Map<String, Object>> tasks = new ArrayList<>();

        try (Connection connection =
                 DriverManager.getConnection(
                     url, username, password);
             PreparedStatement statement =
                 connection.prepareStatement(sql);
             ResultSet result = statement.executeQuery()) {

            while (result.next()) {
                Map<String, Object> task = Map.of(
                    "id", result.getLong("id"),
                    "title", result.getString("title"),
                    "description",
                        result.getString("description") == null
                            ? ""
                            : result.getString("description"),
                    "status", result.getString("status"),
                    "priority", result.getString("priority")
                );

                tasks.add(task);
            }
        }

        return tasks;
    }
}
