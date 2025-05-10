package litloom.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "books")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String author;

    private int publisher;

    private String isbn;

    @Column(length = 2000)
    private String description;

    private BigDecimal price;

    private Integer stockQuantity;

    private String category;

    private String language;

    private String imageUrl;

    private Integer publicationYear;

      public Integer getQuantity() {
        return stockQuantity;
    }
    
    public void setQuantity(Integer quantity) {
        this.stockQuantity = quantity;
    }

    public BigDecimal getPrice(){
        return price;
    } 
     public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
