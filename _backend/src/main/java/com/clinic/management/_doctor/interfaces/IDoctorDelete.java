package com.clinic.management._doctor.interfaces;

import com.clinic.management._doctor.entities.Doctor;

public interface IDoctorDelete {
    Doctor softDeleteById(String doctorId);
    Doctor hardDeleteById(String doctorId);
    Doctor restoreById(String doctorId);
}