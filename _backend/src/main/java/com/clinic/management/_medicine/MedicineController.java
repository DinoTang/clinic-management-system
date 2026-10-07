package com.clinic.management._medicine;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {

    private final MedicineRepository medicineRepository;

    public MedicineController(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    @GetMapping
    public List<Medicine> getAll() {
        return medicineRepository.findByDeletedFalse();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getById(@PathVariable String id) {
        return medicineRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Medicine medicine) {
        if (medicine.getId() == null || medicine.getId().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Mã thuốc không được để trống."));
        }
        if (medicineRepository.existsById(medicine.getId())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Mã thuốc đã tồn tại: " + medicine.getId()));
        }
        if (medicine.getStock() != null && medicine.getStock() < 0) {
            return ResponseEntity.badRequest().body(Map.of("message", "Tồn kho không được âm."));
        }
        if (medicine.getDeleted() == null) {
            medicine.setDeleted(false);
        }
        return ResponseEntity.ok(medicineRepository.save(medicine));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody Medicine medicine) {
        return medicineRepository.findById(id).map(existing -> {
            if (medicine.getStock() != null && medicine.getStock() < 0) {
                return ResponseEntity.badRequest().body(Map.of("message", "Tồn kho không được âm."));
            }
            if (medicine.getName() != null) existing.setName(medicine.getName());
            if (medicine.getActiveIngredient() != null) existing.setActiveIngredient(medicine.getActiveIngredient());
            if (medicine.getUnit() != null) existing.setUnit(medicine.getUnit());
            if (medicine.getPrice() != null) existing.setPrice(medicine.getPrice());
            if (medicine.getStock() != null) existing.setStock(medicine.getStock());
            if (medicine.getUsage() != null) existing.setUsage(medicine.getUsage());
            if (medicine.getDeleted() != null) existing.setDeleted(medicine.getDeleted());
            return ResponseEntity.ok(medicineRepository.save(existing));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        return medicineRepository.findById(id).map(existing -> {
            existing.setDeleted(true);
            medicineRepository.save(existing);
            return ResponseEntity.noContent().build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
