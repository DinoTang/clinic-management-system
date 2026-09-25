package com.clinic.management._user.services;

import org.springframework.stereotype.Service;
import com.clinic.management._user.entities.User;
import com.clinic.management._user.interfaces.IUserGenerator;
import com.clinic.management._user.interfaces.IUserRegistration;
import com.clinic.management._user.repositories.UserRepository;
import com.clinic.management._auth.dtos.RegisterRequest;

@Service
public class UserRegistrationService implements IUserRegistration {

    private final IUserGenerator userGeneratorService;
    private final UserRepository userRepository;
    public UserRegistrationService(
        IUserGenerator userGeneratorService,
        UserRepository userRepository
    ){
        this.userGeneratorService=userGeneratorService;
        this.userRepository = userRepository;
    }

    @Override
    public User add(RegisterRequest request){
        String hashedPassword = userGeneratorService.hashPassword(request.getPassword());

        User user = new User(
            request.getUsername(),
            hashedPassword,
            request.getFullName(),
            request.getEmail(),
            request.getPhone()
        );
        user.setId(userGeneratorService.generateId());
        return userRepository.save(user);
    }
}