package com.pinksquare.artifex.controller;

import com.pinksquare.artifex.entity.User;
import com.pinksquare.artifex.service.AuthService;
import jakarta.validation.constraints.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController @RequestMapping("/api/auth")
public class AuthController {
    private final AuthService service;
    public AuthController(AuthService s){service=s;}

    public record RegisterRequest(@NotBlank String name,@Email @NotBlank String email,@Size(min=6) String password){}
    public record LoginRequest(@Email @NotBlank String email,@NotBlank String password){}

    @PostMapping("/register")
    public Map<String,String> register(@RequestBody RegisterRequest r){
        User u=service.registerUser(r.name(),r.email(),r.password());
        return Map.of("token",service.login(r.email(),r.password()),"role",u.getRole().name(),"name",u.getName());
    }

    @PostMapping("/login")
    public Map<String,String> login(@RequestBody LoginRequest r){
        User u=service.find(r.email());
        String token=service.login(r.email(),r.password());
        return Map.of("token",token,"role",u.getRole().name(),"name",u.getName());
    }

    @GetMapping("/me")
    public Map<String,Object> me(Authentication authentication){
        User u=service.find(authentication.getName());
        return Map.of("id",u.getId(),"name",u.getName(),"email",u.getEmail(),"role",u.getRole().name());
    }
}
