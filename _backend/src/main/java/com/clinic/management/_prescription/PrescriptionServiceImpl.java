package com.clinic.management._prescription;

import com.clinic.management._medicine.Medicine;
import com.clinic.management._medicine.MedicineRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final MedicineRepository medicineRepository;

    public PrescriptionServiceImpl(PrescriptionRepository prescriptionRepository,
                                   MedicineRepository medicineRepository) {
        this.prescriptionRepository = prescriptionRepository;
        this.medicineRepository = medicineRepository;
    }

    @Override
    @Transactional
    public Prescription createPrescription(Prescription prescription) {
        if (prescription.getMedicalRecordId() == null || prescription.getMedicalRecordId().isBlank()) {
            throw new IllegalArgumentException("BR-041: đơn thuốc phải gắn với mã bệnh án.");
        }
        if (prescription.getDetails() == null || prescription.getDetails().isEmpty()) {
            throw new IllegalArgumentException("Đơn thuốc phải có ít nhất một dòng thuốc.");
        }

        /* BR-046: một thuốc không xuất hiện nhiều lần trong cùng đơn */
        Set<String> seenMedicines = new HashSet<>();
        for (PrescriptionDetail detail : prescription.getDetails()) {
            if (detail.getMedicineId() == null || detail.getMedicineId().isBlank()) {
                throw new IllegalArgumentException("BR-043: dòng thuốc thiếu mã thuốc.");
            }
            if (!seenMedicines.add(detail.getMedicineId())) {
                throw new IllegalArgumentException(
                        "BR-046: thuốc " + detail.getMedicineId() + " đã có trong đơn — chỉ được xuất hiện một lần.");
            }

            /* BR-044: số lượng phải lớn hơn 0 */
            if (detail.getQuantity() == null || detail.getQuantity() <= 0) {
                throw new IllegalArgumentException(
                        "BR-044: số lượng thuốc " + detail.getMedicineId() + " phải lớn hơn 0.");
            }

            Medicine medicine = medicineRepository.findById(detail.getMedicineId())
                    .orElseThrow(() -> new IllegalArgumentException(
                            "BR-043: không tìm thấy thuốc " + detail.getMedicineId() + "."));
            if (detail.getDeleted() == null) {
                detail.setDeleted(false);
            }
            if (Boolean.TRUE.equals(medicine.getDeleted())) {
                throw new IllegalArgumentException(
                        "BR-043: thuốc " + medicine.getName() + " đã ngừng sử dụng.");
            }

            /* BR-043 / BR-045: tồn kho phải lớn hơn 0 và không được kê vượt */
            int stock = medicine.getStock() == null ? 0 : medicine.getStock();
            if (stock <= 0) {
                throw new IllegalArgumentException("BR-043: thuốc " + medicine.getName() + " đã hết tồn kho.");
            }
            if (detail.getQuantity() > stock) {
                throw new IllegalArgumentException(
                        "BR-045: thuốc " + medicine.getName() + " chỉ còn " + stock + " đơn vị — không được kê vượt tồn kho.");
            }
        }

        if (prescription.getId() == null || prescription.getId().isBlank()) {
            prescription.setId(generateNextId());
        }
        prescription.setPrescriptionDate(LocalDate.now());
        if (prescription.getDeleted() == null) {
            prescription.setDeleted(false);
        }
        prescription.getDetails().forEach(detail -> detail.setPrescription(prescription));

        Prescription saved = prescriptionRepository.save(prescription);

        /* BR-047: stockAfter = stockBefore - quantity >= 0 (đã validate ở trên) */
        for (PrescriptionDetail detail : saved.getDetails()) {
            Medicine medicine = medicineRepository.findById(detail.getMedicineId()).orElseThrow();
            medicine.setStock(medicine.getStock() - detail.getQuantity());
            medicineRepository.save(medicine);
        }

        return saved;
    }

    @Override
    public Prescription getByMedicalRecordId(String medicalRecordId) {
        return prescriptionRepository.findByMedicalRecordIdAndDeletedFalse(medicalRecordId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn thuốc theo mã bệnh án"));
    }

    private synchronized String generateNextId() {
        String maxId = prescriptionRepository.findMaxId();
        int nextNum = maxId == null ? 1 : Integer.parseInt(maxId.substring(2)) + 1;
        return String.format("DT%03d", nextNum);
    }
}