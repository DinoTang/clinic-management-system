package com.clinic.management._patient;

import java.util.List;

public interface PatientService {

    List<Patient> getAllPatients();

    Patient getPatientById(String id);
}