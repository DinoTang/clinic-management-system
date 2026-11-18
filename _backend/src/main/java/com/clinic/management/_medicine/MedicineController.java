package com.clinic.management._medicine;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "http://localhost:5173")
public class MedicineController {

    private final MedicineService medicineService;

    public MedicineController(MedicineService medicineService) {
        this.medicineService = medicineService;
    }

    @GetMapping
    public List<Medicine> findAll() {
        return medicineService.findAll();
    }

    @GetMapping("/v2")
    public ResponseEntity<Page<Medicine>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search) {

        Boolean deletedFilter = null;
        if (status != null && !status.equalsIgnoreCase("all") && !status.isBlank()) {
            if (status.equalsIgnoreCase("deleted") || status.equalsIgnoreCase("true") || status.equalsIgnoreCase("inactive")) {
                deletedFilter = true;
            } else if (status.equalsIgnoreCase("active") || status.equalsIgnoreCase("false")) {
                deletedFilter = false;
            }
        }

        Page<Medicine> medicines = medicineService.findAll(page, size, deletedFilter, search);
        return ResponseEntity.ok(medicines);
    }

    @GetMapping("/{medicineId}")
    public ResponseEntity<Medicine> findById(@PathVariable String medicineId) {
        Medicine result = medicineService.findById(medicineId);
        return ResponseEntity.ok(result);
    }

    // Thêm mới thuốc
    @PostMapping
    public ResponseEntity<Medicine> create(@Valid @RequestBody MedicineCreateRequest request) {
        Medicine medicine = medicineService.create(request);
        return ResponseEntity.ok(medicine);
    }

    // Cập nhật thông tin thuốc (nhận ID từ body của request)
    @PutMapping("/update-profile")
    public ResponseEntity<Medicine> updateProfile(@Valid @RequestBody MedicineUpdateRequest request) {
        Medicine medicine = medicineService.update(request);
        return ResponseEntity.ok(medicine);
    }

    // Khôi phục thuốc đã xóa mềm
    @PutMapping("/restore/{medicineId}")
    public ResponseEntity<Medicine> restoreById(@PathVariable String medicineId) {
        Medicine medicine = medicineService.restoreById(medicineId);
        return ResponseEntity.ok(medicine);
    }

    // Xóa mềm
    @DeleteMapping("/soft-delete/{medicineId}")
    public ResponseEntity<Medicine> softDeleteById(@PathVariable String medicineId) {
        Medicine medicine = medicineService.softDeleteById(medicineId);
        return ResponseEntity.ok(medicine);
    }

    // Xóa cứng khỏi database
    @DeleteMapping("/hard-delete/{medicineId}")
    public ResponseEntity<Medicine> hardDeleteById(@PathVariable String medicineId) {
        Medicine medicine = medicineService.hardDeleteById(medicineId);
        return ResponseEntity.ok(medicine);
    }
}
