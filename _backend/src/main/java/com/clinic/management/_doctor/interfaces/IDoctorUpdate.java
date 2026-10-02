package com.clinic.management._doctor.interfaces;

import com.clinic.management._doctor.dtos.ProfileUpdateRequest;
import com.clinic.management._doctor.entities.Doctor;
import java.util.List;

public interface IDoctorUpdate{
	Doctor updateProfile(String doctorId, ProfileUpdateRequest request);
}