package com.clinic.management._billing;

import com.clinic.management._doctor.entities.Doctor;
import com.clinic.management._doctor.repositories.DoctorRepository;
import com.clinic.management._medical_record.MedicalRecord;
import com.clinic.management._medical_record.MedicalRecordRepository;
import com.clinic.management._prescription.Prescription;
import com.clinic.management._prescription.PrescriptionDetail;
import com.clinic.management._prescription.PrescriptionRepository;
import com.clinic.management._reception.Reception;
import com.clinic.management._reception.ReceptionRepository;
import com.clinic.management._service_assignment.ServiceAssignment;
import com.clinic.management._service_assignment.ServiceAssignmentRepository;
import com.clinic.management._service_catalog.ServiceCatalog;
import com.clinic.management._service_catalog.ServiceCatalogRepository;
import com.clinic.management._staff.entities.Staff;
import com.clinic.management._staff.repositories.StaffRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BillingService {

    public static final String STATUS_UNPAID = "ChuaThanhToan";
    public static final String STATUS_PAID = "DaThanhToan";

    private final InvoiceRepository invoiceRepository;
    private final InvoiceDetailRepository invoiceDetailRepository;
    private final MedicalRecordRepository medicalRecordRepository;
    private final ReceptionRepository receptionRepository;
    private final DoctorRepository doctorRepository;
    private final StaffRepository staffRepository;
    private final ServiceAssignmentRepository serviceAssignmentRepository;
    private final ServiceCatalogRepository serviceCatalogRepository;
    private final PrescriptionRepository prescriptionRepository;

    public BillingService(
            InvoiceRepository invoiceRepository,
            InvoiceDetailRepository invoiceDetailRepository,
            MedicalRecordRepository medicalRecordRepository,
            ReceptionRepository receptionRepository,
            DoctorRepository doctorRepository,
            StaffRepository staffRepository,
            ServiceAssignmentRepository serviceAssignmentRepository,
            ServiceCatalogRepository serviceCatalogRepository,
            PrescriptionRepository prescriptionRepository) {
        this.invoiceRepository = invoiceRepository;
        this.invoiceDetailRepository = invoiceDetailRepository;
        this.medicalRecordRepository = medicalRecordRepository;
        this.receptionRepository = receptionRepository;
        this.doctorRepository = doctorRepository;
        this.staffRepository = staffRepository;
        this.serviceAssignmentRepository = serviceAssignmentRepository;
        this.serviceCatalogRepository = serviceCatalogRepository;
        this.prescriptionRepository = prescriptionRepository;
    }

    public List<Invoice> listUnpaid() {
        return invoiceRepository.findByPaymentStatusAndDeletedFalseOrderByCreatedAtDesc(STATUS_UNPAID);
    }

    public Optional<Invoice> findById(String id) {
        return invoiceRepository.findById(id)
                .filter(inv -> !Boolean.TRUE.equals(inv.getDeleted()));
    }

    /** Nạp danh sách chi tiết và gắn vào invoice để trả về JSON. */
    public Invoice withDetails(Invoice invoice) {
        invoice.setDetails(invoiceDetailRepository.findByInvoiceIdAndDeletedFalse(invoice.getId()));
        return invoice;
    }

    /**
     * Lập hóa đơn cho bệnh án (BR-051).
     * BR-053: tổng tiền do backend tính = phí khám + tiền dịch vụ + tiền thuốc.
     * BR-054: giá được lưu tại thời điểm lập hóa đơn.
     * Trạng thái ban đầu UNPAID (BR-052).
     */
    @Transactional
    public Invoice create(InvoiceCreateRequest request) {
        if (request.getMedicalRecordId() == null || request.getMedicalRecordId().isBlank()) {
            throw new IllegalArgumentException("Mã bệnh án không được để trống.");
        }
        if (request.getStaffId() == null || request.getStaffId().isBlank()) {
            throw new IllegalArgumentException("Mã nhân viên không được để trống.");
        }

        MedicalRecord record = medicalRecordRepository.findById(request.getMedicalRecordId())
                .filter(r -> !Boolean.TRUE.equals(r.getDeleted()))
                .orElseThrow(() -> new IllegalArgumentException(
                        "Không tìm thấy bệnh án: " + request.getMedicalRecordId()));

        if (invoiceRepository.existsByMedicalRecordIdAndDeletedFalse(record.getId())) {
            throw new IllegalArgumentException(
                    "BR-051: Bệnh án " + record.getId() + " đã có hóa đơn, không được lập trùng.");
        }

        Staff staff = staffRepository.findById(request.getStaffId())
                .filter(s -> !s.getDeleted())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Không tìm thấy nhân viên: " + request.getStaffId()));

        List<InvoiceDetail> details = new ArrayList<>();
        int nextDetailSeq = nextDetailSequence();

        // --- Phí khám (từ tiếp đón → bác sĩ) ---
        Optional<Reception> receptionOpt = record.getReceptionId() == null
                ? Optional.empty()
                : receptionRepository.findById(record.getReceptionId());
        if (receptionOpt.isPresent()) {
            Optional<Doctor> doctorOpt = doctorRepository.findById(receptionOpt.get().getDoctorId());
            if (doctorOpt.isPresent()) {
                Doctor doctor = doctorOpt.get();
                BigDecimal fee = doctor.getExaminationFee() == null ? BigDecimal.ZERO : doctor.getExaminationFee();
                String degree = doctor.getAcademicDegree() == null ? "" : " " + doctor.getAcademicDegree();
                String doctorName = doctor.getUser() == null ? doctor.getId() : doctor.getUser().getFullName();
                InvoiceDetail feeRow = new InvoiceDetail();
                feeRow.setId(String.format("CTHD%03d", nextDetailSeq++));
                feeRow.setItemType("PhiKham");
                feeRow.setItemId(doctor.getId());
                feeRow.setItemName("Công khám" + degree + " " + doctorName);
                feeRow.setQuantity(1);
                feeRow.setUnitPrice(fee);
                feeRow.setTotalPrice(fee);
                feeRow.setNote("Tiền khám theo bác sĩ");
                details.add(feeRow);
            }
        }

        // --- Dịch vụ chỉ định ---
        for (ServiceAssignment assignment : serviceAssignmentRepository
                .findByMedicalRecordIdAndDeletedFalse(record.getId())) {
            ServiceCatalog catalog = serviceCatalogRepository.findById(assignment.getServiceId()).orElse(null);
            String name = catalog != null && catalog.getName() != null
                    ? catalog.getName()
                    : "Dịch vụ " + assignment.getServiceId();
            BigDecimal unitPrice = assignment.getUnitPrice() != null
                    ? assignment.getUnitPrice()
                    : (catalog != null && catalog.getPrice() != null ? catalog.getPrice() : BigDecimal.ZERO);
            int qty = assignment.getQuantity() == null ? 1 : assignment.getQuantity();
            InvoiceDetail row = new InvoiceDetail();
            row.setId(String.format("CTHD%03d", nextDetailSeq++));
            row.setItemType("DichVu");
            row.setItemId(assignment.getServiceId());
            row.setItemName(name);
            row.setQuantity(qty);
            row.setUnitPrice(unitPrice);
            row.setTotalPrice(unitPrice.multiply(BigDecimal.valueOf(qty)));
            row.setNote("Chỉ định " + assignment.getId());
            details.add(row);
        }

        // --- Tiền thuốc (gộp theo đơn, như dữ liệu mẫu HD001/HD002) ---
        Optional<Prescription> prescriptionOpt =
                prescriptionRepository.findByMedicalRecordIdAndDeletedFalse(record.getId());
        if (prescriptionOpt.isPresent()) {
            Prescription prescription = prescriptionOpt.get();
            BigDecimal medicineTotal = BigDecimal.ZERO;
            if (prescription.getDetails() != null) {
                for (PrescriptionDetail detail : prescription.getDetails()) {
                    if (Boolean.TRUE.equals(detail.getDeleted())) continue;
                    BigDecimal line = detail.getTotalPrice() != null
                            ? detail.getTotalPrice()
                            : unitPriceTimesQty(detail.getUnitPrice(), detail.getQuantity());
                    medicineTotal = medicineTotal.add(line);
                }
            }
            if (medicineTotal.compareTo(BigDecimal.ZERO) > 0) {
                InvoiceDetail row = new InvoiceDetail();
                row.setId(String.format("CTHD%03d", nextDetailSeq++));
                row.setItemType("Thuoc");
                row.setItemId(prescription.getId());
                row.setItemName("Tiền đơn thuốc điều trị ngoại trú");
                row.setQuantity(1);
                row.setUnitPrice(medicineTotal);
                row.setTotalPrice(medicineTotal);
                row.setNote("Tổng tiền thuốc theo khoản " + prescription.getId());
                details.add(row);
            }
        }

        if (details.isEmpty()) {
            throw new IllegalArgumentException(
                    "Bệnh án " + record.getId() + " chưa có hạng mục nào (phí khám/dịch vụ/thuốc) để lập hóa đơn.");
        }

        BigDecimal total = BigDecimal.ZERO;
        for (InvoiceDetail row : details) {
            total = total.add(row.getTotalPrice());
        }

        Invoice invoice = new Invoice();
        invoice.setId(nextInvoiceId());
        invoice.setMedicalRecordId(record.getId());
        invoice.setStaffId(staff.getId());
        invoice.setTotal(total);
        invoice.setAmountGiven(BigDecimal.ZERO);
        invoice.setChangeAmount(BigDecimal.ZERO);
        invoice.setPaymentStatus(STATUS_UNPAID); // BR-052
        invoice.setCreatedAt(LocalDateTime.now());
        invoice.setDeleted(false);
        invoice = invoiceRepository.save(invoice);

        for (InvoiceDetail row : details) {
            row.setInvoiceId(invoice.getId());
            row.setDeleted(false);
            invoiceDetailRepository.save(row);
        }
        invoice.setDetails(details);
        return invoice;
    }

    /**
     * Thanh toán hóa đơn.
     * BR-056: chỉ hóa đơn UNPAID mới được thanh toán.
     * BR-057: số tiền khách đưa phải >= số tiền còn phải trả (tiền thừa = đưa - tổng).
     * BR-058: chỉ chấp nhận CASH / BANK_TRANSFER / CARD (hoặc dạng DB TienMat/ChuyenKhoan/The).
     * BR-059: thanh toán thành công → hóa đơn PAID, cập nhật nhất quán trong 1 transaction.
     */
    @Transactional
    public Invoice pay(Invoice invoice, PaymentRequest request) {
        if (Boolean.TRUE.equals(invoice.getDeleted())) {
            throw new IllegalArgumentException("Hóa đơn " + invoice.getId() + " đã bị xóa.");
        }
        if (!STATUS_UNPAID.equals(invoice.getPaymentStatus())) {
            throw new IllegalArgumentException(
                    "BR-056: Chỉ hóa đơn chưa thanh toán mới được thanh toán (trạng thái hiện tại: "
                            + invoice.getPaymentStatus() + ").");
        }
        String method = normalizeMethod(request.getMethod());
        BigDecimal given = request.getAmountGiven();
        if (given == null) {
            throw new IllegalArgumentException("BR-057: Số tiền khách đưa không được để trống.");
        }
        if (given.compareTo(invoice.getTotal()) < 0) {
            throw new IllegalArgumentException(
                    "BR-057: Số tiền khách đưa (" + given + ") nhỏ hơn tổng tiền phải trả ("
                            + invoice.getTotal() + ").");
        }

        invoice.setPaymentMethod(method);
        invoice.setAmountGiven(given);
        invoice.setChangeAmount(given.subtract(invoice.getTotal()));
        invoice.setPaymentStatus(STATUS_PAID); // BR-059
        invoice.setPaidAt(LocalDateTime.now());
        return invoiceRepository.save(invoice);
    }

    private String normalizeMethod(String method) {
        if (method == null || method.isBlank()) {
            throw new IllegalArgumentException(
                    "BR-058: Phương thức thanh toán không được để trống. Chỉ chấp nhận CASH, BANK_TRANSFER, CARD.");
        }
        switch (method.trim().toUpperCase()) {
            case "CASH":
            case "TIENMAT":
                return "TienMat";
            case "BANK_TRANSFER":
            case "CHUYENKHOAN":
                return "ChuyenKhoan";
            case "CARD":
            case "THE":
                return "The";
            default:
                throw new IllegalArgumentException(
                        "BR-058: Phương thức thanh toán không hợp lệ: " + method
                                + ". Chỉ chấp nhận CASH, BANK_TRANSFER, CARD.");
        }
    }

    private BigDecimal unitPriceTimesQty(BigDecimal unitPrice, Integer qty) {
        BigDecimal price = unitPrice == null ? BigDecimal.ZERO : unitPrice;
        return price.multiply(BigDecimal.valueOf(qty == null ? 1 : qty));
    }

    private String nextInvoiceId() {
        String maxId = invoiceRepository.findMaxId();
        int next = maxId == null ? 1 : Integer.parseInt(maxId.substring(2)) + 1;
        return String.format("HD%03d", next);
    }

    private int nextDetailSequence() {
        String maxId = invoiceDetailRepository.findMaxId();
        return maxId == null ? 1 : Integer.parseInt(maxId.substring(4)) + 1;
    }
}
