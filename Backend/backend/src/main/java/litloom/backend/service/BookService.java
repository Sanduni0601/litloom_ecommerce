package litloom.backend.service;

import litloom.backend.model.Book;
import litloom.backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {
    
        @Autowired
        private BookRepository bookRepository;
    
        public Book addBook(Book book) {
            return bookRepository.save(book);
        }
    }
    

