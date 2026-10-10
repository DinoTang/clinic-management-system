package com.clinic.management._billing;

/**
 * Request lập hóa đơn cho một bệnh án (BR-051).
 * Tổng tiền do backend tính (BR-053): phí khám + tiền dịch vụ + tiền thuốc.
 */
public class InvoiceCreateRequest {

    private String medicalRecordId;
    private String staffId;

    public InvoiceCreateRequest() {
    }

    public String getMedicalRecordId() {
        return medicalRecordId;
    }

    public void setMedicalRecordId(String medicalRecordId) {
        this.medicalRecordId = medicalRecordId;
    }

    public String getStaffId() {
        return staffId;
    }

    public void setStaffId(String staffId) {
        this.staffId = staffId;
    }
}
