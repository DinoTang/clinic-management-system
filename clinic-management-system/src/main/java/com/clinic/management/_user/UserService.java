package com.clinic.management._user;

import java.util.List;
import com.clinic.management.common.response.ApiResponse;

public interface UserService {

    List<User> getAllUsers();
    User getUserById(String id);
    User create(User user);
    // ApiResponse update(String id, User user);
    // ApiResponse delete(String id);
}