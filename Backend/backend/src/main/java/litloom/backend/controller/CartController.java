package litloom.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import litloom.backend.service.CartService;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    
    @Autowired
    private CartService cartService;
    
    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addToCart(@RequestBody Map<String, Object> request) {
        Long userId = Long.valueOf(request.get("userId").toString());
        Long bookId = Long.valueOf(request.get("bookId").toString());
        int quantity = Integer.parseInt(request.get("quantity").toString());
        
        Map<String, Object> response = cartService.addToCart(userId, bookId, quantity);
        return ResponseEntity.ok(response);
    }
}

