package com.clinic.management._user.services;

import org.springframework.stereotype.Service;
import com.clinic.management.common.enums.Role;
import com.clinic.management.common.enums.UserStatus;
import com.clinic.management._user.entities.User;
import com.clinic.management._user.interfaces.IUserGenerator;
import com.clinic.management._user.interfaces.IUserQuery;
import com.clinic.management._user.interfaces.IUserUpdate;
import com.clinic.management._user.repositories.UserRepository;
import com.clinic.management._user.dtos.ProfileUpdateRequest;

@Service
public class UserUpdateService implements IUserUpdate {

    private final IUserGenerator userGeneratorService;
    private final IUserQuery userQueryService;
    private final UserRepository userRepository;

    public UserUpdateService(
        IUserGenerator userGeneratorService,
        IUserQuery userQueryService,
        UserRepository userRepository
    ){
        this.userGeneratorService=userGeneratorService;
        this.userQueryService=userQueryService;
        this.userRepository = userRepository;
    }

    @Override
    public User updateProfile(String userId, ProfileUpdateRequest request){
        User user = userQueryService.findById(userId);
        String hashedPassword = userGeneratorService.hashPassword(request.getPassword());

        user.setUsername(request.getUsername());
        user.setPassword(hashedPassword);
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        return userRepository.save(user);
    }

    @Override
    public User updateStatus(String userId, UserStatus status){
        User user = userQueryService.findById(userId);
        user.setStatus(status);
        return userRepository.save(user);
    }

    @Override
    public User updateRole(String userId, Role role){
        User user = userQueryService.findById(userId);
        user.setRole(role);
        return userRepository.save(user);
    }

    @Override
    public User restoreById(String userId) {
        if(!userRepository.existsById(userId))
            throw new RuntimeException("Không tìm thấy người dùng");
        User user =userRepository.restoreById(userId);
        return user;
    }
}