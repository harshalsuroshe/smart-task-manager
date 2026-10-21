
package com.taskmanager.backend;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController  //tells Spring that this class handles web requests and returns response data.
@CrossOrigin(origins = "http://localhost:5174")
public class HealthController {

    @GetMapping("/api/health") //connects an HTTP GET request for that URL to the method below it.
    public Map<String, String> checkHealth() { //returns the text that Spring Boot sends back to the client.
        return Map.of(
            "status", "UP",
            "application", "TaskFlow"
        );
    }
}
