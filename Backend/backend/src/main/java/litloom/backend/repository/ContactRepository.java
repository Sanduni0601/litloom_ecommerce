package litloom.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import litloom.backend.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}
