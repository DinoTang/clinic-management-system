package com.clinic.management._service_catalog;

import com.clinic.management.common.enums.ServiceCatalogStatus;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceCatalogController {

    private final ServiceCatalogService serviceCatalogService;

    public ServiceCatalogController(ServiceCatalogService serviceCatalogService) {
        this.serviceCatalogService = serviceCatalogService;
    }

    @GetMapping
    public List<ServiceCatalog> findAll() {
        return serviceCatalogService.findAll();
    }

    @GetMapping("/v2")
    public ResponseEntity<Page<ServiceCatalog>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) ServiceCatalogStatus serviceStatus,
            @RequestParam(required = false) String specialtyId,
            @RequestParam(required = false) String search) {

        Page<ServiceCatalog> services = serviceCatalogService.findAll(
                page, size, serviceStatus, specialtyId, search
        );
        return ResponseEntity.ok(services);
    }

    @GetMapping("/{serviceCatalogId}")
    public ResponseEntity<ServiceCatalog> findById(@PathVariable String serviceCatalogId) {
        ServiceCatalog result = serviceCatalogService.findById(serviceCatalogId);
        return ResponseEntity.ok(result);
    }

    // Thêm mới dịch vụ
    @PostMapping
    public ResponseEntity<ServiceCatalog> create(@Valid @RequestBody ServiceCatalogCreateRequest request) {
        ServiceCatalog serviceCatalog = serviceCatalogService.create(request);
        return ResponseEntity.ok(serviceCatalog);
    }

    // Cập nhật thông tin dịch vụ (nhận ID từ body của request)
    @PutMapping("/update-profile")
    public ResponseEntity<ServiceCatalog> updateProfile(@Valid @RequestBody ServiceCatalogUpdateRequest request) {
        ServiceCatalog serviceCatalog = serviceCatalogService.update(request);
        return ResponseEntity.ok(serviceCatalog);
    }

    // Khôi phục dịch vụ đã xóa mềm
    @PutMapping("/restore/{serviceCatalogId}")
    public ResponseEntity<ServiceCatalog> restoreById(@PathVariable String serviceCatalogId) {
        ServiceCatalog serviceCatalog = serviceCatalogService.restoreById(serviceCatalogId);
        return ResponseEntity.ok(serviceCatalog);
    }

    // Xóa mềm
    @DeleteMapping("/soft-delete/{serviceCatalogId}")
    public ResponseEntity<ServiceCatalog> softDeleteById(@PathVariable String serviceCatalogId) {
        ServiceCatalog serviceCatalog = serviceCatalogService.softDeleteById(serviceCatalogId);
        return ResponseEntity.ok(serviceCatalog);
    }

    // Xóa cứng khỏi database
    @DeleteMapping("/hard-delete/{serviceCatalogId}")
    public ResponseEntity<ServiceCatalog> hardDeleteById(@PathVariable String serviceCatalogId) {
        ServiceCatalog serviceCatalog = serviceCatalogService.hardDeleteById(serviceCatalogId);
        return ResponseEntity.ok(serviceCatalog);
    }
}
