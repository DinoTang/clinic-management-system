package com.clinic.management._user.interfaces;

import com.clinic.management._user.dtos.*;
import com.clinic.management._user.entities.User;

public interface IUserUpdate {
    User updateProfile(ProfileUpdateRequest request);
    User updatePassword(UpdatePasswordRequest request);
    User updateStatus(UpdateStatusRequest request);
    User updateRole(UpdateRoleRequest request);
}