package com.pinksquare.artifex.controller;

import com.pinksquare.artifex.entity.Product;
import com.pinksquare.artifex.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/products")
public class ProductController {
    private final ProductRepository repo;
    public ProductController(ProductRepository r){repo=r;}

    @GetMapping public List<Product> all(){return repo.findByActiveTrueOrderByCreatedAtDesc();}
    @GetMapping("/search") public List<Product> search(@RequestParam String q){return repo.findByNameContainingIgnoreCaseAndActiveTrue(q);}
    @GetMapping("/category/{category}") public List<Product> category(@PathVariable String category){return repo.findByCategoryIgnoreCaseAndActiveTrue(category);}
    @GetMapping("/{id}") public Product one(@PathVariable Long id){return repo.findById(id).orElseThrow();}
}
