package com.clinic.management._doctor.services;

import org.springframework.stereotype.Service;
import com.clinic.management._doctor.interfaces.IDoctorGenerator;
import com.clinic.management._doctor.repositories.DoctorRepository;

@Service
public class DoctorGeneratorService implements IDoctorGenerator {

    private final DoctorRepository doctorRepository;

    public DoctorGeneratorService(DoctorRepository doctorRepository){
        this.doctorRepository = doctorRepository;
    }

    @Override
    public String generateId(){
        long quantity = doctorRepository.count();
        return String.format("BS%05d", quantity+1);
    }
}