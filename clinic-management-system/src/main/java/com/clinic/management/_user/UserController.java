package com.clinic.management._user;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity; 
import org.springframework.http.HttpStatus;

import com.clinic.management.common.response.ApiResponse;

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

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable String id){
        User user = userService.getUserById(id);
        ApiResponse response = null;
        if (user==null){
            response = new ApiResponse(
                false, 
                "Người dùng không tồn tại",
                user
            );
        }
        else{
            response = new ApiResponse(
                true,
                "Tìm kiếm thành công",
                user
            );
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ApiResponse> create(@RequestBody User user){
        User userExistion = userService.getUserById(user.getId());
        ApiResponse response = null;
        if (userExistion==null){
            userService.create(user);
            response = new ApiResponse(
                true,
                "Đăng ký tài khoản thành công",
                user
            );
        }
        else {
            response = new ApiResponse(
                false,
                "Tài khoản đã tồn tại",
                null
            );
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}