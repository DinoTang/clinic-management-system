package com.clinic.management._user.services;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.clinic.management._user.entities.User;
import com.clinic.management._user.interfaces.IUser;
import com.clinic.management._user.repositories.UserRepository;
import com.clinic.management._auth.dtos.*;

import java.util.List;

@Service
public class UserService implements IUser {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public User findByUsername(String username) {
        User user = userRepository.findByUsername(username);
        // if(user == null)
        //     throw new RuntimeException("Không tìm thấy người dùng");
        return user;
    }

    @Override
    public User findByEmail(String email) {
        User user =userRepository.findByEmail(email);
        // if(user == null)
        //     throw new RuntimeException("Không tìm thấy người dùng");
        return user;
    }

    public User add(RegisterRequest request){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hashedPassword = encoder.encode(request.getPassword());

        User user = new User(
            request.getUsername(),
            hashedPassword,
            request.getFullName(),
            request.getEmail(),
            request.getPhone()
        );
        return userRepository.save(user);
    }

    @Override
    public boolean existsByUsername(String username){
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }

}