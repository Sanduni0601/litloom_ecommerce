package litloom.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import litloom.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
}