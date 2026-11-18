package com.clinic.management._appointment;

import com.clinic.management.common.enums.AppointmentStatus;
import com.clinic.management._appointment.Appointment;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentService {
    List<Appointment> getAllAppointments();
    Page<Appointment> findAll(int page, int size, AppointmentStatus status, String search);

    Appointment getAppointmentById(String id);
    List<Appointment> getAppointmentsByDoctor(String doctorId);
    List<Appointment> getAppointmentsByPatient(String patientId);
    List<Appointment> getAppointmentsBySchedule(String scheduleId);
    List<Appointment> getAppointmentsByDate(LocalDate date);
    Appointment createAppointment(Appointment appointment);
    Appointment updateAppointment(String id, Appointment appointment);
    void deleteAppointment(String id);
}