package com.clinic.management._user;

import com.clinic.management.common.enums.Role;
import com.clinic.management.common.enums.UserStatus;
import com.clinic.management._user.dtos.ProfileUpdateRequest;
import com.clinic.management._user.entities.User;
import com.clinic.management._user.services.UserUpdateService;
import com.clinic.management._user.services.UserQueryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity; 
import org.springframework.http.HttpStatus;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserUpdateService userUpdateService;
    private final UserQueryService userQueryService;

    public UserController(
        UserUpdateService userUpdateService,
        UserQueryService userQueryService
    ){
        this.userUpdateService=userUpdateService;
        this.userQueryService = userQueryService;
    }

    @GetMapping
    public ResponseEntity<List<User>> findAll(){
        List<User> result = userQueryService.findAll();
        return ResponseEntity.ok(result);
    }

    @PutMapping("/update-profile/{userId}")
    public ResponseEntity<User> updateProfile(
        @PathVariable String userId,
        @RequestBody ProfileUpdateRequest request){
        User user = userUpdateService.updateProfile(userId, request);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/update-status/{userId}")
    public ResponseEntity<User> updateStatus(
        @PathVariable String userId,
        @RequestBody UserStatus request){
        User user = userUpdateService.updateStatus(userId, request);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/update-role/{userId}")
    public ResponseEntity<User> updateRole(
        @PathVariable String userId,
        @RequestBody Role request){
        User user = userUpdateService.updateRole(userId, request);
        return ResponseEntity.ok(user);
    }

}