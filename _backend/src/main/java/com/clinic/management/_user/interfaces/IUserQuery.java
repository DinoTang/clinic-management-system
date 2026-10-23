package com.clinic.management._user.interfaces;

import com.clinic.management.common.enums.Role;
import com.clinic.management.common.enums.UserStatus;
import com.clinic.management._user.entities.User;
import org.springframework.data.domain.Page;
import java.util.List;

public interface IUserQuery {
    User findByUsername(String username);
    User findByEmail(String email);
    User findById(String userId);
    User findByPhone(String phone);
    User findByGoogleId(String googleId);
    Page<User> findAll(int page, int size, Role role, UserStatus status, String search);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    boolean existsByGoogleId(String googleId);
}