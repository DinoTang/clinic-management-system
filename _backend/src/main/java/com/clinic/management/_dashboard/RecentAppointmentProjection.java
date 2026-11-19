package com.clinic.management._dashboard;

import java.time.LocalDate;
import java.time.LocalTime;

public interface RecentAppointmentProjection {
    String getAppointmentId();
    String getPatientName();
    String getDoctorName();
    LocalDate getAppointmentDate();
    LocalTime getAppointmentTime();
    String getStatus();
}
