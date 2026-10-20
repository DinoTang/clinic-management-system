package com.clinic.management._user.interfaces;

import com.clinic.management._auth.dtos.RegisterRequest;
import com.clinic.management._auth.dtos.GoogleUserInfo;
import com.clinic.management._user.entities.User;

public interface IUserRegistration {
    User createByLocal(RegisterRequest request);
    User createByGoogle(GoogleUserInfo googleUser);
}