package com.clinic.management._service_catalog;

import com.clinic.management.common.enums.ServiceCatalogStatus;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ServiceCatalogService {

    private final ServiceCatalogRepository serviceCatalogRepository;

    public ServiceCatalogService(ServiceCatalogRepository serviceCatalogRepository) {
        this.serviceCatalogRepository = serviceCatalogRepository;
    }

    private String generateId() {
        long quantity = serviceCatalogRepository.count();
        return String.format("DV%05d", quantity + 1);
    }

    // Thêm mới dịch vụ (trạng thái mặc định luôn là ACTIVE)
    public ServiceCatalog create(ServiceCatalogCreateRequest request) {
        ServiceCatalog serviceCatalog = new ServiceCatalog();
        serviceCatalog.setId(generateId());
        serviceCatalog.setSpecialtyId(request.getSpecialtyId());
        serviceCatalog.setName(request.getName());
        serviceCatalog.setPrice(request.getPrice());
        serviceCatalog.setUnit(request.getUnit());
        serviceCatalog.setDescription(request.getDescription());
        serviceCatalog.setStatus(ServiceCatalogStatus.ACTIVE);
        serviceCatalog.setDeleted(false);

        return serviceCatalogRepository.save(serviceCatalog);
    }

    // Tìm kiếm và phân trang
    public Page<ServiceCatalog> findAll(
            int page,
            int size,
            ServiceCatalogStatus serviceStatus,
            String specialtyId,
            String search
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return serviceCatalogRepository.findAll((root, query, cb) -> cb.and(
                serviceStatus == null ? cb.conjunction() : cb.equal(root.get("status"), serviceStatus),
                specialtyId == null || specialtyId.isBlank() ? cb.conjunction() : cb.equal(root.get("specialtyId"), specialtyId),
                search == null || search.isBlank() ? cb.conjunction() : cb.or(
                        cb.like(cb.lower(root.get("id")), "%" + search.toLowerCase() + "%"),
                        cb.like(cb.lower(root.get("name")), "%" + search.toLowerCase() + "%"),
                        cb.like(cb.lower(root.get("description")), "%" + search.toLowerCase() + "%")
                )
        ), pageable);
    }

    // Lấy toàn bộ danh sách
    public List<ServiceCatalog> findAll() {
        return serviceCatalogRepository.findAll();
    }

    // Tìm dịch vụ theo ID
    public ServiceCatalog findById(String serviceCatalogId) {
        return serviceCatalogRepository.findById(serviceCatalogId)
                .orElseThrow(() -> new RuntimeException("Dịch vụ không tồn tại: " + serviceCatalogId));
    }

    // Cập nhật thông tin dịch vụ
    public ServiceCatalog update(ServiceCatalogUpdateRequest request) {
        ServiceCatalog serviceCatalog = findById(request.getId());
        serviceCatalog.setSpecialtyId(request.getSpecialtyId());
        serviceCatalog.setName(request.getName());
        serviceCatalog.setPrice(request.getPrice());
        serviceCatalog.setUnit(request.getUnit());
        serviceCatalog.setDescription(request.getDescription());
        return serviceCatalogRepository.save(serviceCatalog);
    }
    // Kích hoạt lại dịch vụ (chuyển status sang ACTIVE)
    public ServiceCatalog restoreById(String serviceCatalogId) {
        ServiceCatalog serviceCatalog = findById(serviceCatalogId);
        serviceCatalog.setStatus(ServiceCatalogStatus.ACTIVE);
        return serviceCatalogRepository.save(serviceCatalog);
    }

    // Ngừng hoạt động dịch vụ (chuyển status sang INACTIVE)
    public ServiceCatalog softDeleteById(String serviceCatalogId) {
        ServiceCatalog serviceCatalog = findById(serviceCatalogId);
        serviceCatalog.setStatus(ServiceCatalogStatus.INACTIVE);
        return serviceCatalogRepository.save(serviceCatalog);
    }

    // Xóa cứng
    public ServiceCatalog hardDeleteById(String serviceCatalogId) {
        ServiceCatalog serviceCatalog = findById(serviceCatalogId);
        serviceCatalogRepository.delete(serviceCatalog);
        return serviceCatalog;
    }

}
