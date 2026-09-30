package com.clinic.management._user.services;

import org.springframework.stereotype.Service;
import com.clinic.management._user.entities.User;
import com.clinic.management._user.interfaces.IUserDelete;
import com.clinic.management._user.repositories.UserRepository;

@Service
public class UserDeleteService implements IUserDelete {

    private final UserRepository userRepository;

    public UserDeleteService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public User softDeleteById(String userId) {
        if(!userRepository.existsById(userId))
            throw new RuntimeException("Không tìm thấy người dùng");
        User user = userRepository.softDeleteById(userId);
        return user;
    }

    @Override
    public User hardDeleteById(String userId) {
        if(!userRepository.existsById(userId))
            throw new RuntimeException("Không tìm thấy người dùng");
        User user =userRepository.hardDeleteById(userId);

        return user;
    }

}