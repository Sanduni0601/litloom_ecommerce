package litloom.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import litloom.backend.model.User;
import litloom.backend.service.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;
    @PostMapping("/reg")
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            String message = userService.registerUser(user);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
        try {
            Map<String, Object> response = userService.loginUser(user);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    
}

