package com.clinic.management._staff.services;

import org.springframework.stereotype.Service;
import com.clinic.management._staff.interfaces.IStaffGenerator;
import com.clinic.management._staff.repositories.StaffRepository;

@Service
public class StaffGeneratorService implements IStaffGenerator {

    private final StaffRepository staffRepository;

    public StaffGeneratorService(StaffRepository staffRepository){
        this.staffRepository = staffRepository;
    }

    @Override
    public String generateId(){
        long quantity = staffRepository.count();
        return String.format("NV%05d", quantity+1);
    }
}