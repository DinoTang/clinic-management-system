package com.clinic.management._user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import com.clinic.management.common.response.ApiResponse;

@Service
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;


    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }


    @Override
    public List<User> getAllUsers(){

        return userRepository.findAll();

    }

    @Override
    public User getUserById(String id){
        User user = userRepository.findById(id).orElse(null);
        return user;
    }

    @Override
    public User create(User user){
        userRepository.save(user);
        return user;
    }

    // @Override
    // public ApiResponse<User> update(String id, User user){

    // }

    // @Override
    // public ApiResponse<User> delete(String id){

    // }
}