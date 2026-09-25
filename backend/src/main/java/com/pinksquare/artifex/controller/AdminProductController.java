package com.pinksquare.artifex.controller;

import com.pinksquare.artifex.entity.Product;
import com.pinksquare.artifex.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/admin/products")
public class AdminProductController {
    private final ProductRepository repo;
    public AdminProductController(ProductRepository r){repo=r;}

    @GetMapping public List<Product> all(){return repo.findAll();}

    @PostMapping public Product create(@RequestBody Product p){
        if(p.getRating()==null) p.setRating(0.0);
        if(p.getStock()==null) p.setStock(0);
        if(p.getFeatured()==null) p.setFeatured(false);
        if(p.getActive()==null) p.setActive(true);
        return repo.save(p);
    }

    @PutMapping("/{id}") public Product update(@PathVariable Long id,@RequestBody Product p){
        Product x=repo.findById(id).orElseThrow();
        x.setName(p.getName()); x.setDescription(p.getDescription()); x.setPrice(p.getPrice());
        x.setSalePrice(p.getSalePrice()); x.setImageUrl(p.getImageUrl()); x.setModelUrl(p.getModelUrl());
        x.setCategory(p.getCategory()); x.setStock(p.getStock()); x.setRating(p.getRating());
        x.setFeatured(p.getFeatured()); x.setActive(p.getActive());
        return repo.save(x);
    }

    @DeleteMapping("/{id}") public void delete(@PathVariable Long id){repo.deleteById(id);}
}
