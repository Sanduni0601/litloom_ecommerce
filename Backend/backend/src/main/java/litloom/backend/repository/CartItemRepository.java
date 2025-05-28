package litloom.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import litloom.backend.model.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long>{
    Optional<CartItem> findByUserIdAndBookId(Long userId, Long bookId);
    List<CartItem> findByUserId(Long userId);
    @Query("SELECT SUM(c.quantity) FROM CartItem c")
    Integer getTotalQuantity();
}
