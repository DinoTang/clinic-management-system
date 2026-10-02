package com.clinic.management._staff.services;

import org.springframework.stereotype.Service;
import com.clinic.management._staff.entities.Staff;
import com.clinic.management._staff.interfaces.IStaffDelete;
import com.clinic.management._staff.repositories.StaffRepository;

@Service
public class StaffDeleteService implements IStaffDelete {

    private final StaffRepository staffRepository;

    public StaffDeleteService(StaffRepository staffRepository){
        this.staffRepository = staffRepository;
    }

    @Override
    public Staff softDeleteById(String staffId) {
        Staff staff = staffRepository.softDeleteById(staffId);
        return staff;
    }

    @Override
    public Staff hardDeleteById(String staffId) {
        Staff staff =staffRepository.hardDeleteById(staffId);
        return staff;
    }

    @Override
    public Staff restoreById(String staffId) {
        Staff staff =staffRepository.restoreById(staffId);
        return staff;
    }

}