package com.clinic.management._user.services;

import org.springframework.stereotype.Service;
import com.clinic.management._user.entities.User;
import com.clinic.management._user.interfaces.IUserQuery;
import com.clinic.management._user.repositories.UserRepository;
import com.clinic.management._auth.dtos.*;

import java.util.List;

@Service
public class UserQueryService implements IUserQuery {

    private final UserRepository userRepository;

    public UserQueryService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public User findByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if(user == null)
            throw new RuntimeException("Không tìm thấy người dùng");
        return user;
    }

    @Override
    public User findByEmail(String email) {
        User user =userRepository.findByEmail(email);
        if(user == null)
            throw new RuntimeException("Không tìm thấy người dùng");
        return user;
    }

    @Override
    public User findById(String userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
    }

    @Override
    public List<User> findAll(){
        List<User> users = userRepository.findAll();
        if(users.isEmpty())
            throw new RuntimeException("Danh sách người dùng rỗng");
        return users;
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