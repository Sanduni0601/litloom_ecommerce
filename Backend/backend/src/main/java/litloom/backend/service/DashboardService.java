package litloom.backend.service;

import org.springframework.stereotype.Service;

import litloom.backend.repository.BookRepository;
import litloom.backend.repository.CartItemRepository;
import litloom.backend.repository.UserRepository;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final CartItemRepository cartItemRepository;

    public DashboardService(UserRepository userRepository, BookRepository bookRepository,CartItemRepository cartItemRepository) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.cartItemRepository = cartItemRepository;
    }

    public long getUserCount() {
        return userRepository.count();
    }

    public long getBookCount() {
        return bookRepository.count();
    }

     public int getTotalCartQuantity() {
        Integer total = cartItemRepository.getTotalQuantity();
        return total != null ? total : 0;
    }
}

