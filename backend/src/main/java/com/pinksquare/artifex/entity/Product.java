package com.pinksquare.artifex.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name="products")
@Getter @Setter @NoArgsConstructor
public class Product {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false) private String name;
    @Column(length=1500) private String description;
    @Column(nullable=false) private Double price;
    private Double salePrice;
    @Column(length=2000) private String imageUrl;
    @Column(length=2000) private String modelUrl;
    private String category;
    private Integer stock = 0;
    private Double rating = 0.0;
    private Boolean featured = false;
    private Boolean active = true;
    private LocalDateTime createdAt = LocalDateTime.now();
}
