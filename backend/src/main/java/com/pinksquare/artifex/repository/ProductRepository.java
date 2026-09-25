package com.pinksquare.artifex.repository;
import com.pinksquare.artifex.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ProductRepository extends JpaRepository<Product,Long>{
    List<Product> findByActiveTrueOrderByCreatedAtDesc();
    List<Product> findByCategoryIgnoreCaseAndActiveTrue(String category);
    List<Product> findByNameContainingIgnoreCaseAndActiveTrue(String q);
}
