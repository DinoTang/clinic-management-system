package com.clinic.management._appointment;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentService {
    List<Appointment> getAllAppointments();
    Appointment getAppointmentById(String id);
    List<Appointment> getAppointmentsByDoctor(String doctorId);
    List<Appointment> getAppointmentsByPatient(String patientId);
    List<Appointment> getAppointmentsBySchedule(String scheduleId);
    List<Appointment> getAppointmentsByDate(LocalDate date);
    Appointment createAppointment(Appointment appointment);
    Appointment updateAppointment(String id, Appointment appointment);
    void deleteAppointment(String id);
}