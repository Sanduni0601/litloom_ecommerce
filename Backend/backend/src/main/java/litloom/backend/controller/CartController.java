package litloom.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import litloom.backend.model.CartItem;
import litloom.backend.repository.CartItemRepository;
import litloom.backend.service.CartService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    
    @Autowired
    private CartService cartService;
    
    @Autowired
    private CartItemRepository cartItemRepository;
    
    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addToCart(@RequestBody Map<String, Object> request) {
        Long userId = Long.valueOf(request.get("userId").toString());
        Long bookId = Long.valueOf(request.get("bookId").toString());
        int quantity = Integer.parseInt(request.get("quantity").toString());
        
        Map<String, Object> response = cartService.addToCart(userId, bookId, quantity);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CartItem>> getCartByUserId(@PathVariable Long userId) {
        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
        return ResponseEntity.ok(cartItems);
    }
    @PutMapping("/{id}")
    public ResponseEntity<CartItem> updateCartItem(
            @PathVariable Long id, 
            @RequestBody CartItem cartItemDetails) {
        
        CartItem cartItem = cartItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart item not found with id: " + id));
        
        cartItem.setQuantity(cartItemDetails.getQuantity());
        
        CartItem updatedCartItem = cartItemRepository.save(cartItem);
        return ResponseEntity.ok(updatedCartItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCartItem(@PathVariable Long id) {
        return cartItemRepository.findById(id)
                .map(cartItem -> {
                    cartItemRepository.delete(cartItem);
                    return ResponseEntity.ok().build();
                })
                .orElseThrow(() -> new RuntimeException("Cart item not found with id: " + id));
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<String> deleteCartItemsByUserId(@PathVariable Long userId) {
        cartService.deleteCartByUserId(userId);
        return ResponseEntity.ok("Cart items deleted for user ID: " + userId);
    }
}

