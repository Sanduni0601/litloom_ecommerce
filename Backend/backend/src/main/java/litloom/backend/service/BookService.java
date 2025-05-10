package litloom.backend.service;

import litloom.backend.model.Book;
import litloom.backend.repository.BookRepository;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class BookService {
    
        @Autowired
        private BookRepository bookRepository;
    
        public Book addBook(Book book) {
            return bookRepository.save(book);
        }
        public List<Book> getAllBooks() {

        return bookRepository.findAll();
    }
    public Book getBookById(Long id) {
        return bookRepository.findById(id).orElse(null);
    }
    
     public int getBookStockQuantity(Long bookId) {
        Book book = bookRepository.findById(bookId)
            .orElseThrow(() -> new NoSuchElementException("Book not found with id: " + bookId));
        
        return book.getQuantity();
    }
    public boolean hasEnoughStock(Long bookId, int requestedQuantity) {
        try {
            int availableQuantity = getBookStockQuantity(bookId);
            return availableQuantity >= requestedQuantity;
        } catch (Exception e) {
            return false;
        }
    }
    }
    

