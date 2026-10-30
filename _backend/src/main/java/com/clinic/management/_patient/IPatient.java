package com.clinic.management._patient;

import com.clinic.management.common.enums.UserStatus;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import com.clinic.management._patient.Patient;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IPatient {

    List<Patient> getAllPatients();

    Patient getPatientById(String id);
    Page<Patient> findAll(int page, int size, UserStatus status, String search);

}