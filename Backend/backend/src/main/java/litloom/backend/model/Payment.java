package litloom.backend.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class Payment {
@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
   @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "address", nullable = false)
    private String address;
    
    private String city;
    
    private int zipcode;

    private String country;

    private Long cdno;
    private String expired;

    private int CVV;
    private String holder;


}
