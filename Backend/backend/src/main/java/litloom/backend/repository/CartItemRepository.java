package litloom.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import litloom.backend.model.CartItem;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByUserIdAndBookId(Long userId, Long bookId);
    List<CartItem> findByUserId(Long userId);
}
