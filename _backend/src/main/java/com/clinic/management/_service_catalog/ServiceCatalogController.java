package com.clinic.management._service_catalog;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/services")
public class ServiceCatalogController {

    private final ServiceCatalogRepository serviceCatalogRepository;

    public ServiceCatalogController(ServiceCatalogRepository serviceCatalogRepository) {
        this.serviceCatalogRepository = serviceCatalogRepository;
    }

    @GetMapping
    public List<ServiceCatalog> getAll() {
        return serviceCatalogRepository.findByDeletedFalse();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceCatalog> getById(@PathVariable String id) {
        return serviceCatalogRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody ServiceCatalog service) {
        if (service.getId() == null || service.getId().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Mã dịch vụ không được để trống."));
        }
        if (serviceCatalogRepository.existsById(service.getId())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Mã dịch vụ đã tồn tại: " + service.getId()));
        }
        if (service.getDeleted() == null) {
            service.setDeleted(false);
        }
        if (service.getActive() == null) {
            service.setActive(true);
        }
        return ResponseEntity.ok(serviceCatalogRepository.save(service));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody ServiceCatalog service) {
        return serviceCatalogRepository.findById(id).map(existing -> {
            if (service.getName() != null) existing.setName(service.getName());
            if (service.getPrice() != null) existing.setPrice(service.getPrice());
            if (service.getUnit() != null) existing.setUnit(service.getUnit());
            if (service.getDescription() != null) existing.setDescription(service.getDescription());
            if (service.getActive() != null) existing.setActive(service.getActive());
            if (service.getDeleted() != null) existing.setDeleted(service.getDeleted());
            return ResponseEntity.ok(serviceCatalogRepository.save(existing));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        return serviceCatalogRepository.findById(id).map(existing -> {
            existing.setDeleted(true);
            serviceCatalogRepository.save(existing);
            return ResponseEntity.noContent().build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
