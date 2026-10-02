package com.clinic.management._user.interfaces;

import com.clinic.management._user.entities.User;
import org.springframework.data.domain.Page;
import java.util.List;

public interface IUserQuery {
    User findByUsername(String username);
    User findByEmail(String email);
    User findById(String userId);
    Page<User> findAll(int page, int size);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
}