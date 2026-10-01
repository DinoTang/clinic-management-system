package com.clinic.management._doctor.services;

import org.springframework.stereotype.Service;
import com.clinic.management._doctor.entities.Doctor;
import com.clinic.management._doctor.dtos.ProfileCreateRequest;
import com.clinic.management._doctor.interfaces.IDoctorCreate;
import com.clinic.management._doctor.interfaces.IDoctorGenerator;
import com.clinic.management._doctor.repositories.DoctorRepository;
import com.clinic.management._user.entities.User;
import com.clinic.management._user.interfaces.IUserQuery;
import com.clinic.management._specialty.entities.Specialty;
import com.clinic.management._specialty.interfaces.ISpecialtyQuery;

@Service
public class DoctorCreateService implements IDoctorCreate {

    private final ISpecialtyQuery specialtyQueryService;
    private final IDoctorGenerator doctorGeneratorService;    
    private final IUserQuery userQueryService;
    private final DoctorRepository doctorRepository;

    public DoctorCreateService(
        ISpecialtyQuery specialtyQueryService,
        IUserQuery userQueryService,
        IDoctorGenerator doctorGeneratorService,
        DoctorRepository doctorRepository
    ){
        this.specialtyQueryService=specialtyQueryService;
        this.doctorGeneratorService=doctorGeneratorService;
        this.userQueryService=userQueryService;
        this.doctorRepository = doctorRepository;
    }

    @Override
    public Doctor create(ProfileCreateRequest request){
        if(doctorRepository.existsByUserId(request.getUserId())){
            throw new RuntimeException("Đã tồn tại bác sĩ có mã người dùng này");
        }

        String doctorId = doctorGeneratorService.generateId();
        User user = userQueryService.findById(request.getUserId());
        Specialty specialty = specialtyQueryService.findById(request.getSpecialtyId());

        Doctor doctor = new Doctor(
            user,
            specialty,
            request.getAcademicDegree(),
            request.getExperienceYears(),
            request.getBio(),
            request.getExaminationFee()
        );
        doctor.setId(doctorId);
        return doctorRepository.save(doctor);
    }
}