package com.clinic.management._user;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {


    private final UserService userService;


    public UserController(UserService userService){
        this.userService = userService;
    }


    @GetMapping
    public List<User> getUsers(){

        return userService.getAllUsers();

    }

}