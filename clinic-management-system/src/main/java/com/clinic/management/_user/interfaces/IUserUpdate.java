package com.clinic.management._user.interfaces;

import com.clinic.management.common.enums.Role;
import com.clinic.management.common.enums.UserStatus;
import com.clinic.management._user.dtos.ProfileUpdateRequest;
import com.clinic.management._user.entities.User;

public interface IUserUpdate {
    User updateProfile(String userId, ProfileUpdateRequest request);
    User updateStatus(String userId, UserStatus status);
    User updateRole(String userId, Role role);
}