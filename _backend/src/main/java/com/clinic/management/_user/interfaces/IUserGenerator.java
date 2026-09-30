package com.clinic.management._user.interfaces;

import com.clinic.management._user.entities.User;
import java.util.List;

public interface IUserGenerator {
    String generateId();
    String hashPassword(String password);
}