package com.clinic.management._user.interfaces;

import com.clinic.management._user.entities.User;

public interface IUserDelete {
    User softDeleteById(String userId);
    User hardDeleteById(String userId);
}