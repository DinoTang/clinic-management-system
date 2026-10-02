package com.clinic.management._staff.services;

import org.springframework.stereotype.Service;
import com.clinic.management._user.entities.User;
import com.clinic.management._user.interfaces.IUserQuery;
import com.clinic.management._staff.entities.Staff;
import com.clinic.management._staff.dtos.ProfileCreateRequest;
import com.clinic.management._staff.interfaces.IStaffCreate;
import com.clinic.management._staff.interfaces.IStaffGenerator;
import com.clinic.management._staff.repositories.StaffRepository;

@Service
public class StaffCreateService implements IStaffCreate {

    private final IStaffGenerator staffGeneratorService;    
    private final IUserQuery userQueryService;
    private final StaffRepository staffRepository;

    public StaffCreateService(
        IStaffGenerator staffGeneratorService,
        IUserQuery userQueryService,
        StaffRepository staffRepository
    ){
        this.staffGeneratorService=staffGeneratorService;
        this.userQueryService=userQueryService;
        this.staffRepository = staffRepository;
    }

    @Override
    public Staff create(ProfileCreateRequest request){
        if(staffRepository.existsByUserId(request.getUserId())){
            throw new RuntimeException("Đã tồn tại nhân viên có mã người dùng này");
        }

        String staffId = staffGeneratorService.generateId();
        User user = userQueryService.findById(request.getUserId());
        Staff staff = new Staff(
            user,
            request.getPosition()
        );
        staff.setId(staffId);
        return staffRepository.save(staff);
    }
}