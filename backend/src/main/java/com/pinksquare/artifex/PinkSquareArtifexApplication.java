package com.pinksquare.artifex;

import com.pinksquare.artifex.entity.Product;
import com.pinksquare.artifex.entity.Role;
import com.pinksquare.artifex.entity.User;
import com.pinksquare.artifex.repository.ProductRepository;
import com.pinksquare.artifex.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class PinkSquareArtifexApplication {
    public static void main(String[] args) {
        SpringApplication.run(PinkSquareArtifexApplication.class, args);
    }

    @Bean
    CommandLineRunner seed(UserRepository users, ProductRepository products, PasswordEncoder encoder,
                           @Value("${app.admin.email:admin@pinksquareartifex.com}") String email,
                           @Value("${app.admin.password:Admin@12345}") String password) {
        return args -> {
            if (!users.existsByEmail(email)) {
                User admin = new User();
                admin.setName("Pink Square Admin");
                admin.setEmail(email);
                admin.setPassword(encoder.encode(password));
                admin.setRole(Role.ADMIN);
                users.save(admin);
            }

            if (products.count() == 0) {
                products.save(product("Rose Gold Necklace Set",799,599,"Necklaces","https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85"));
                products.save(product("Pearl Drop Earrings",499,349,"Earrings","https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85"));
                products.save(product("Crystal Bracelet",599,449,"Bracelets","https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=85"));
                products.save(product("Classic Ring Set",399,299,"Rings","https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85"));
            }
        };
    }

    private Product product(String name,double price,double sale,String category,String image) {
        Product p=new Product();
        p.setName(name); p.setPrice(price); p.setSalePrice(sale); p.setCategory(category); p.setImageUrl(image);
        p.setDescription("Elegant artificial jewellery from Pink Square Artifex.");
        p.setStock(25); p.setRating(4.7); p.setFeatured(true); p.setActive(true);
        return p;
    }
}
