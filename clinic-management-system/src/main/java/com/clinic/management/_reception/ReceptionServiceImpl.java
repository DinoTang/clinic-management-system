package com.clinic.management._reception;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReceptionServiceImpl implements ReceptionService {

    private final ReceptionRepository receptionRepository;

    public ReceptionServiceImpl(ReceptionRepository receptionRepository) {
        this.receptionRepository = receptionRepository;
    }

    // Tự sinh mã tiếp đón chuẩn TD001, TD002,...
    private synchronized String generateNextReceptionId() {
        String latestId = receptionRepository.findLatestReceptionId();
        int nextNumber = 1;
        if (latestId != null && latestId.startsWith("TD")) {
            try {
                nextNumber = Integer.parseInt(latestId.substring(2)) + 1;
            } catch (NumberFormatException ignored) {
            }
        }
        return String.format("TD%03d", nextNumber);
    }

    @Override
    public List<Reception> getAllReceptions() {
        return receptionRepository.findByDeletedFalse();
    }

    @Override
    public Reception getReceptionById(String id) {
        return receptionRepository.findById(id)
                .filter(r -> !Boolean.TRUE.equals(r.getDeleted()))
                .orElse(null);
    }

    @Override
    public List<Reception> getReceptionsByDate(LocalDate date) {
        return receptionRepository.findByReceptionDateAndDeletedFalse(date);
    }

    @Override
    public List<Reception> getQueueByRoomAndDate(String roomId, LocalDate date) {
        return receptionRepository.findByRoomIdAndReceptionDateAndDeletedFalseOrderByQueueNumberAsc(roomId, date);
    }

    @Override
    public List<Reception> getQueueByDoctorAndDate(String doctorId, LocalDate date) {
        return receptionRepository.findByDoctorIdAndReceptionDateAndDeletedFalseOrderByQueueNumberAsc(doctorId, date);
    }

    @Override
    public Reception createReception(Reception reception) {
        if (reception.getId() == null || reception.getId().isBlank()) {
            reception.setId(generateNextReceptionId());
        }

        if (reception.getReceptionDate() == null) {
            reception.setReceptionDate(LocalDate.now());
        }

        // Tự động cấp số thứ tự (STT) tăng dần theo phòng khám trong ngày nếu chưa có
        if (reception.getQueueNumber() == null || reception.getQueueNumber() <= 0) {
            int maxQueue = receptionRepository.findMaxQueueNumberByRoomAndDate(
                    reception.getRoomId(), reception.getReceptionDate()
            );
            reception.setQueueNumber(maxQueue + 1);
        }

        if (reception.getQueueStatus() == null || reception.getQueueStatus().isBlank()) {
            reception.setQueueStatus("ChoKham");
        }

        reception.setDeleted(false);
        return receptionRepository.save(reception);
    }

    @Override
    public Reception updateReception(String id, Reception reception) {
        Reception existing = receptionRepository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }

        existing.setPatientId(reception.getPatientId());
        existing.setEmployeeId(reception.getEmployeeId());
        existing.setRoomId(reception.getRoomId());
        existing.setDoctorId(reception.getDoctorId());
        existing.setAppointmentId(reception.getAppointmentId());
        existing.setReceptionDate(reception.getReceptionDate());
        existing.setQueueNumber(reception.getQueueNumber());
        existing.setReceptionType(reception.getReceptionType());
        existing.setQueueStatus(reception.getQueueStatus());
        existing.setInitialSymptoms(reception.getInitialSymptoms());
        existing.setPulse(reception.getPulse());
        existing.setTemperature(reception.getTemperature());
        existing.setBloodPressure(reception.getBloodPressure());
        existing.setWeight(reception.getWeight());
        existing.setHeight(reception.getHeight());

        return receptionRepository.save(existing);
    }

    @Override
    public Reception updateQueueStatus(String id, String status) {
        Reception existing = receptionRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setQueueStatus(status);
            return receptionRepository.save(existing);
        }
        return null;
    }

    @Override
    public void deleteReception(String id) {
        Reception existing = receptionRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setDeleted(true);
            receptionRepository.save(existing);
        }
    }
}