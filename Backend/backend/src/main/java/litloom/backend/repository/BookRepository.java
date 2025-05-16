package litloom.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import litloom.backend.model.Book;

public interface BookRepository extends JpaRepository<Book, Long>{

}

