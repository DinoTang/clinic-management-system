package com.clinic.management._user.interfaces;

import com.clinic.management._user.entities.User;
import java.util.List;

public interface IUserQuery {
    User findByUsername(String username);
    User findByEmail(String email);
    User findById(String userId);
    List<User> findAll();
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

}