package com.clinic.management._user.services;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.clinic.management._user.entities.User;
import com.clinic.management._user.interfaces.IUserGenerator;
import com.clinic.management._user.repositories.UserRepository;
import com.clinic.management._auth.dtos.*;

@Service
public class UserGeneratorService implements IUserGenerator {

    private final UserRepository userRepository;

    public UserGeneratorService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public String generateId(){
        long quantity = userRepository.count();
        return String.format("ND%05d", quantity+1);
    }

    @Override
    public String hashPassword(String password){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hashedPassword = encoder.encode(password);
        return hashedPassword;
    }
}