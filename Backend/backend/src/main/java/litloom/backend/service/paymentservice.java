package litloom.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import litloom.backend.model.Payment;
import litloom.backend.repository.PaymentRepo;

@Service
public class paymentservice {
    @Autowired
    private PaymentRepo paymentRepository;

    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment); 
    }
}
