package litloom.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import litloom.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    
    Optional<User> findByEmail(String email);

    long count();
}
