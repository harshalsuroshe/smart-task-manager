package com.taskmanager.backend.repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.taskmanager.backend.model.User;

@Repository
public class UserRepository {
    
    private final JdbcTemplate jdbcTemplate;

    // Spring injects the configured JdbcTemplate[cite: 5]
    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Convert a database row into a User object[cite: 5].
    private final RowMapper<User> userRowMapper = (result, rowNum) ->
        new User(
            result.getLong("id"),
            result.getString("name"),
            result.getString("email"),
            result.getString("password_hash") // ensure this matches your DB column[cite: 5]
        );

    // Find a user by ID; Optional.empty() means it does not exist[cite: 5]
    public Optional<User> findById(Long id) {
        String sql = "SELECT * FROM users WHERE id = ?";
        List<User> users = jdbcTemplate.query(sql, userRowMapper, id);
        return users.stream().findFirst();
    }

    // Retrieve all users[cite: 5]
    public List<User> findAll() {
        String sql = "SELECT * FROM users ORDER BY id";
        return jdbcTemplate.query(sql, userRowMapper);
    }

    // Find a user by their unique email address[cite: 5].
    public Optional<User> findByEmail(String email) {
        String sql = "SELECT * FROM users WHERE email = ?";
        List<User> users = jdbcTemplate.query(sql, userRowMapper, email);
        return users.stream().findFirst();
    }

    // Save a new user and return the user with generated ID[cite: 5]
    public User save(User user) {
        // Note: Using password_hash to match the RowMapper column[cite: 5]
        String sql = "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getName());
            ps.setString(2, user.getEmail());
            // Using getPasswordHash() to match your User service model
            ps.setString(3, user.getPasswordHash()); 
            return ps;
        }, keyHolder);
        
        if (keyHolder.getKey() != null) {
            user.setId(keyHolder.getKey().longValue());
        }
        return user;
    }
}