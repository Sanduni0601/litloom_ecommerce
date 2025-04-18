package litloom.backend.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<String> handleResponseStatusException(ResponseStatusException ex) {
        // Return only the message without status code prefix
        return ResponseEntity
                .status(ex.getStatusCode()) // Keep the HTTP status (e.g., 400)
                .body(ex.getReason()); // Return the message only, e.g., "Passwords do not match"
    }
}
