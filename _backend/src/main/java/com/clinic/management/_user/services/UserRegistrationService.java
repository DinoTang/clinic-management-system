package com.clinic.management._user.services;

import org.springframework.stereotype.Service;
import com.clinic.management._user.entities.User;
import com.clinic.management._user.interfaces.IUserGenerator;
import com.clinic.management._user.interfaces.IUserRegistration;
import com.clinic.management._user.repositories.UserRepository;
import com.clinic.management._auth.dtos.GoogleUserInfo;
import com.clinic.management._auth.dtos.RegisterRequest;
import java.util.Map;

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
    public User createByLocal(RegisterRequest request){
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

    @Override
    public User createByGoogle(GoogleUserInfo googleUser){
        String sub = googleUser.googleId();
        String email = googleUser.email();
        String fullName = googleUser.fullName();

        if(userRepository.existsByGoogleId(sub))
            throw new RuntimeException("Email đã được đăng ký, hãy dùng email khác");

        if(userRepository.existsByEmail(email)){
            User user = userRepository.findByEmail(email);
            user.setGoogleId(sub);
            return userRepository.save(user);
        }

        User user = new User();
        user.setId(userGeneratorService.generateId());
        user.setGoogleId(sub);
        user.setEmail(email);
        user.setUsername(email);
        user.setFullName(fullName);
        return userRepository.save(user);
    }
}