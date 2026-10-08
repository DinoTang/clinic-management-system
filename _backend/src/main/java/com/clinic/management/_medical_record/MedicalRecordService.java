package com.clinic.management._medical_record;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

/**
 * Service hồ sơ khám BENHAN — BR-041 (gắn lượt khám), BR-042 (thông tin lâm sàng).
 */
@Service
public class MedicalRecordService {

    private final MedicalRecordRepository repository;

    public MedicalRecordService(MedicalRecordRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public MedicalRecord createOrUpdate(MedicalRecordRequest request) {
        if (request.getReceptionId() == null || request.getReceptionId().isBlank()) {
            throw new IllegalArgumentException("BR-041: hồ sơ khám phải gắn với một lượt khám.");
        }
        if (request.getSymptoms() == null || request.getSymptoms().isBlank()) {
            throw new IllegalArgumentException("BR-042: phải nhập Triệu chứng.");
        }
        if (request.getDiagnosis() == null || request.getDiagnosis().isBlank()) {
            throw new IllegalArgumentException("BR-042: phải nhập Chẩn đoán.");
        }
        if (request.getNotes() == null || request.getNotes().isBlank()) {
            throw new IllegalArgumentException("BR-042: phải nhập Ghi chú điều trị.");
        }

        /* MATIEPDON UNIQUE: 1 lượt khám = 1 bệnh án → đã có thì cập nhật */
        MedicalRecord record = null;
        if (request.getRecordId() != null && !request.getRecordId().isBlank()) {
            record = repository.findById(request.getRecordId()).orElse(null);
        }
        if (record == null) {
            record = repository.findByReceptionIdAndDeletedFalse(request.getReceptionId()).orElse(null);
        }
        boolean isNew = record == null;
        if (isNew) {
            record = new MedicalRecord();
            record.setId(generateNextId());
            record.setReceptionId(request.getReceptionId());
            record.setDeleted(false);
        }

        record.setSymptoms(trimToNull(request.getSymptoms()));
        record.setGeneralExam(trimToNull(request.getGeneralExam()));
        record.setLocalExam(trimToNull(request.getLocalExam()));
        record.setDiagnosis(trimToNull(request.getDiagnosis()));
        record.setPrognosis(trimToNull(request.getPrognosis()));
        record.setNotes(trimToNull(request.getNotes()));
        record.setExaminationDate(request.getExaminationDate() != null
                ? request.getExaminationDate()
                : LocalDate.now());

        return repository.save(record);
    }

    public MedicalRecord getById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy hồ sơ khám " + id));
    }

    public List<MedicalRecord> getAll() {
        return repository.findAll();
    }

    @Transactional
    public MedicalRecord update(String id, MedicalRecordRequest request) {
        MedicalRecord record = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy hồ sơ khám " + id));
        if (request.getSymptoms() != null) record.setSymptoms(trimToNull(request.getSymptoms()));
        if (request.getGeneralExam() != null) record.setGeneralExam(trimToNull(request.getGeneralExam()));
        if (request.getLocalExam() != null) record.setLocalExam(trimToNull(request.getLocalExam()));
        if (request.getDiagnosis() != null) record.setDiagnosis(trimToNull(request.getDiagnosis()));
        if (request.getPrognosis() != null) record.setPrognosis(trimToNull(request.getPrognosis()));
        if (request.getNotes() != null) record.setNotes(trimToNull(request.getNotes()));
        if (request.getExaminationDate() != null) record.setExaminationDate(request.getExaminationDate());
        return repository.save(record);
    }

    private synchronized String generateNextId() {
        String maxId = repository.findMaxId();
        int nextNum = maxId == null ? 1 : Integer.parseInt(maxId.substring(2)) + 1;
        return String.format("BA%03d", nextNum);
    }

    private String trimToNull(String value) {
        if (value == null) return null;
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
