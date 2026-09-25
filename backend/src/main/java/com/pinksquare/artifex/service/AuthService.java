package com.pinksquare.artifex.service;

import com.pinksquare.artifex.entity.*;
import com.pinksquare.artifex.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthService(UserRepository r, PasswordEncoder e, JwtService j){repo=r;encoder=e;jwt=j;}

    public User registerUser(String name,String email,String password){
        if(repo.existsByEmail(email)) throw new RuntimeException("Email already registered");
        User u=new User();
        u.setName(name); u.setEmail(email); u.setPassword(encoder.encode(password)); u.setRole(Role.USER);
        return repo.save(u);
    }

    public String register(String name,String email,String password){
        User u = registerUser(name,email,password);
        return jwt.generate(u.getEmail(),u.getRole().name(),u.getName());
    }

    public String login(String email,String password){
        User u=repo.findByEmail(email).orElseThrow(()->new RuntimeException("Invalid email or password"));
        if(!encoder.matches(password,u.getPassword())) throw new RuntimeException("Invalid email or password");
        return jwt.generate(u.getEmail(),u.getRole().name(),u.getName());
    }

    public User find(String email){ return repo.findByEmail(email).orElseThrow(); }
}
