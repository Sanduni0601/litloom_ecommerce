package litloom.backend.controller;

import litloom.backend.model.Payment;
import litloom.backend.service.paymentservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private paymentservice paymentService;

    @PostMapping("/make")
    public ResponseEntity<Payment> makePayment(@RequestBody Payment payment) {
        Payment savedPayment = paymentService.savePayment(payment);
        return ResponseEntity.ok(savedPayment);
    }
}


