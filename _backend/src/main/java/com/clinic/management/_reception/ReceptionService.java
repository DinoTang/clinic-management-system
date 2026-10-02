package com.clinic.management._reception;

import java.time.LocalDate;
import java.util.List;

public interface ReceptionService {
    List<Reception> getAllReceptions();
    Reception getReceptionById(String id);
    List<Reception> getReceptionsByDate(LocalDate date);
    List<Reception> getQueueByRoomAndDate(String roomId, LocalDate date);
    List<Reception> getQueueByDoctorAndDate(String doctorId, LocalDate date);
    Reception createReception(Reception reception);
    Reception updateReception(String id, Reception reception);
    Reception updateQueueStatus(String id, String status);
    void deleteReception(String id);
}