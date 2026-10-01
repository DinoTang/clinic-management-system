package com.clinic.management._doctor.services;

import com.clinic.management._doctor.entities.Doctor;
import com.clinic.management._doctor.interfaces.IDoctorDelete;
import com.clinic.management._doctor.repositories.DoctorRepository;
import org.springframework.stereotype.Service;

@Service
public class DoctorDeleteService implements IDoctorDelete {

    private final DoctorRepository doctorRepository;

    public DoctorDeleteService(DoctorRepository doctorRepository){
        this.doctorRepository = doctorRepository;
    }

    @Override
    public Doctor softDeleteById(String doctorId) {
        Doctor doctor = doctorRepository.softDeleteById(doctorId);
        return doctor;
    }

    @Override
    public Doctor hardDeleteById(String doctorId) {
        Doctor doctor =doctorRepository.hardDeleteById(doctorId);
        return doctor;
    }

    @Override
    public Doctor restoreById(String doctorId) {
        Doctor doctor =doctorRepository.restoreById(doctorId);
        return doctor;
    }

}