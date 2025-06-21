package litloom.backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import litloom.backend.model.Book;
import litloom.backend.model.CartItem;
import litloom.backend.repository.BookRepository;
import litloom.backend.repository.CartItemRepository;

import java.util.HashMap;
import java.util.Map;

@Service
public class CartService {
    
    @Autowired
    private CartItemRepository cartItemRepository;
    
    @Autowired
    private BookRepository bookRepository;
    
    @Transactional
    public Map<String, Object> addToCart(Long userId, Long bookId, int quantity) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Book book = bookRepository.findById(bookId)
                    .orElseThrow(() -> new RuntimeException("Book not found"));
            
            if (book.getStockQuantity() < quantity) {
                response.put("success", false);
                response.put("message", "Not enough stock available");
                return response;
            }
            

            CartItem cartItem = cartItemRepository.findByUserIdAndBookId(userId, bookId)
                    .orElseGet(() -> {
                        CartItem newItem = new CartItem();
                        newItem.setUserId(userId);
                        newItem.setBookId(bookId);
                        newItem.setPrice(book.getPrice());
                        newItem.setQuantity(0);
                        return newItem;
                    });

            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            cartItemRepository.save(cartItem);
            
            response.put("success", true);
            response.put("message", "Item added to cart successfully");
            return response;
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return response;
        }
    }
}

