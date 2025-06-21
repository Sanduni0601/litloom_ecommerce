package litloom.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import litloom.backend.model.Payment;

public interface PaymentRepo extends JpaRepository<Payment,Long>{
    
}
