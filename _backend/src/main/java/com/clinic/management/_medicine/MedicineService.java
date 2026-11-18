package com.clinic.management._medicine;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class MedicineService {

    private final MedicineRepository medicineRepository;

    public MedicineService(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    // Tự động sinh mã thuốc dạng TH00001, TH00002...
    private String generateId() {
        long quantity = medicineRepository.count();
        return String.format("TH%05d", quantity + 1);
    }

    // Thêm mới thuốc
    public Medicine create(MedicineCreateRequest request) {
        Medicine medicine = new Medicine();
        medicine.setId(generateId());
        medicine.setName(request.getName());
        medicine.setActiveIngredient(request.getActiveIngredient());
        medicine.setUnit(request.getUnit());
        medicine.setPrice(request.getPrice());
        medicine.setStock(request.getStock() != null ? request.getStock() : 0);
        medicine.setUsage(request.getUsage());
        medicine.setDeleted(false);

        return medicineRepository.save(medicine);
    }

    // Tìm kiếm và phân trang
    public Page<Medicine> findAll(int page, int size, Boolean deleted, String search) {
        Pageable pageable = PageRequest.of(page, size);
        return medicineRepository.findAll((root, query, cb) -> cb.and(
                deleted == null ? cb.conjunction() : cb.equal(root.get("deleted"), deleted),
                search == null || search.isBlank() ? cb.conjunction() : cb.or(
                        cb.like(cb.lower(root.get("id")), "%" + search.toLowerCase() + "%"),
                        cb.like(cb.lower(root.get("name")), "%" + search.toLowerCase() + "%"),
                        cb.like(cb.lower(root.get("activeIngredient")), "%" + search.toLowerCase() + "%")
                )
        ), pageable);
    }

    // Lấy toàn bộ danh sách
    public List<Medicine> findAll() {
        return medicineRepository.findAll();
    }

    // Tìm thuốc theo ID
    public Medicine findById(String medicineId) {
        return medicineRepository.findById(medicineId)
                .orElseThrow(() -> new RuntimeException("Thuốc không tồn tại: " + medicineId));
    }

    // Cập nhật thông tin thuốc
    public Medicine update(MedicineUpdateRequest request) {
        Medicine medicine = findById(request.getId());
        medicine.setName(request.getName());
        medicine.setActiveIngredient(request.getActiveIngredient());
        medicine.setUnit(request.getUnit());
        medicine.setPrice(request.getPrice());
        medicine.setStock(request.getStock());
        medicine.setUsage(request.getUsage());

        return medicineRepository.save(medicine);
    }

    // Khôi phục thuốc
    public Medicine restoreById(String medicineId) {
        Medicine medicine = findById(medicineId);
        medicine.setDeleted(false);
        return medicineRepository.save(medicine);
    }

    // Xóa mềm
    public Medicine softDeleteById(String medicineId) {
        Medicine medicine = findById(medicineId);
        medicine.setDeleted(true);
        return medicineRepository.save(medicine);
    }

    // Xóa cứng
    public Medicine hardDeleteById(String medicineId) {
        Medicine medicine = findById(medicineId);
        medicineRepository.delete(medicine);
        return medicine;
    }

}
