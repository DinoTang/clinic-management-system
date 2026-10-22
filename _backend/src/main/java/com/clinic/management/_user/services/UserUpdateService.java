package com.clinic.management._user.services;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.clinic.management._user.entities.User;
import com.clinic.management._user.interfaces.IUserGenerator;
import com.clinic.management._user.interfaces.IUserQuery;
import com.clinic.management._user.interfaces.IUserUpdate;
import com.clinic.management._user.repositories.UserRepository;
import com.clinic.management._user.dtos.*;

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
    public User updateProfile(ProfileUpdateRequest request){
        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email đã tồn tại, hãy dùng email khác");
        }

        if(userRepository.existsByPhone(request.getPhone())){
            throw new RuntimeException("Số điện thoại đã tồn tại, hãy dùng số khác");
        }

        if(userRepository.existsByUsername(request.getUsername())){
            throw new RuntimeException("Tên đăng nhập đã tồn tại, hãy dùng tên khác");
        }
        User user = userQueryService.findById(request.getUserId());

        user.setUsername(request.getUsername());
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        return userRepository.save(user);
    }

    @Override
    public  User updatePassword(UpdatePasswordRequest request){
        if(!userRepository.existsById(request.getUserId())){
            throw new RuntimeException("Tài khoản không tồn tại");
        }

        User user = userQueryService.findById(request.getUserId());
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        boolean isPassword = encoder.matches(request.getPassword(), user.getPassword());
        if(!isPassword){
            throw new RuntimeException("Mật khẩu không trùng khớp");
        }

        String hashedPassword = userGeneratorService.hashPassword(request.getPassword());
        user.setPassword(hashedPassword);
        return userRepository.save(user);
    }

    @Override
    public User updateStatus(UpdateStatusRequest request){
        if(!userRepository.existsById(request.getUserId())){
            throw new RuntimeException("Tài khoản không tồn tại");
        }

        User user = userQueryService.findById(request.getUserId());
        user.setStatus(request.getStatus());
        return userRepository.save(user);
    }

    @Override
    public User updateRole(UpdateRoleRequest request){
        if(!userRepository.existsById(request.getUserId())){
            throw new RuntimeException("Tài khoản không tồn tại");
        }
        User user = userQueryService.findById(request.getUserId());
        user.setRole(request.getRole());
        return userRepository.save(user);
    }

}