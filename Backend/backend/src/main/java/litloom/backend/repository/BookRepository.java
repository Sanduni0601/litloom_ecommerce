package litloom.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.transaction.Transactional;
import litloom.backend.model.Book;

public interface BookRepository extends JpaRepository<Book, Long>{
    long count();

    @Modifying
    @Transactional
    @Query("UPDATE Book b SET b.stockQuantity = b.stockQuantity - ?1 WHERE b.id = ?2 AND b.stockQuantity >= ?1")
    int reduceStock(@Param("bookId") Long bookId, @Param("quantity") int quantity);
}

