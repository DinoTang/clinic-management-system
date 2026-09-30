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
        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email đã tồn tại, hãy dùng email khác");
        }

        if(userRepository.existsByPhone(request.getPhone())){
            throw new RuntimeException("Số điện thoại đã tồn tại, hãy dùng số khác");
        }

        if(userRepository.existsByUsername(request.getUsername())){
            throw new RuntimeException("Tên đăng nhập đã tồn tại, hãy dùng tên khác");
        }

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