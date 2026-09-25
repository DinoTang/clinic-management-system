package com.clinic.management._user.interfaces;

import com.clinic.management._auth.dtos.RegisterRequest;
import com.clinic.management._user.entities.User;

public interface IUserRegistration {
    User add(RegisterRequest request);
}