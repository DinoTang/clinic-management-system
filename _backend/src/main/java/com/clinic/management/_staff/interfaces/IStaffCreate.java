package com.clinic.management._staff.interfaces;

import com.clinic.management._staff.dtos.ProfileCreateRequest;
import com.clinic.management._staff.entities.Staff;
import java.util.List;

public interface IStaffCreate {
    Staff create(ProfileCreateRequest request);
}