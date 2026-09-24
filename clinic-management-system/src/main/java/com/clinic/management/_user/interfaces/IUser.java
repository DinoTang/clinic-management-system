package com.clinic.management._user.interfaces;

import com.clinic.management._user.entities.User;
import com.clinic.management._auth.dtos.*;
import java.util.List;

public interface IUser {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    User findByUsername(String username);
    User findByEmail(String email);
    User add(RegisterRequest request);
    String genId();
}