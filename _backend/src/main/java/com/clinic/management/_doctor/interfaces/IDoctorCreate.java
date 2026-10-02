package com.clinic.management._doctor.interfaces;

import com.clinic.management._doctor.dtos.ProfileCreateRequest;
import com.clinic.management._doctor.entities.Doctor;
import java.util.List;

public interface IDoctorCreate {
    Doctor create(ProfileCreateRequest request);
}