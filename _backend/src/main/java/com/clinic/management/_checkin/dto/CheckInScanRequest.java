package com.clinic.management._checkin.dto;

/**
 * Yêu cầu quét mã QR lịch hẹn tại quầy tiếp đón.
 * {@code code} có thể là mã lịch hẹn thuần (LH003) hoặc URL có chứa mã.
 */
public class CheckInScanRequest {

    private String code;
    private String employeeId;
    private String method;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }
}
