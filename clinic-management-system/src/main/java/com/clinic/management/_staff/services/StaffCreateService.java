package com.clinic.management._staff.services;

import org.springframework.stereotype.Service;
import com.clinic.management._staff.entities.Staff;
import com.clinic.management._staff.dtos.ProfileCreateRequest;
import com.clinic.management._staff.interfaces.IStaffCreate;
import com.clinic.management._staff.interfaces.IStaffGenerator;
import com.clinic.management._staff.repositories.StaffRepository;

@Service
public class StaffCreateService implements IStaffCreate {

    private final IStaffGenerator staffGeneratorService;    
    private final StaffRepository staffRepository;

    public StaffCreateService(
        IStaffGenerator staffGeneratorService,
        StaffRepository staffRepository
    ){
        this.staffGeneratorService=staffGeneratorService;
        this.staffRepository = staffRepository;
    }

    @Override
    public Staff create(ProfileCreateRequest request){
        String staffId = staffGeneratorService.generateId();
        Staff staff = new Staff(
            request.getUserId(),
            request.getPosition()
        );
        staff.setId(staffId);
        return staffRepository.save(staff);
    }
}