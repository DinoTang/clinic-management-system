package com.clinic.management._checkin;

import com.clinic.management._checkin.dto.CheckInScanRequest;
import com.clinic.management._checkin.dto.CheckInScanResult;

import java.time.LocalDate;
import java.util.List;

public interface CheckInService {

    /** Xử lý một lần quét/tra cứu lịch hẹn tại quầy, đồng thời ghi vết vào lichsucheckin. */
    CheckInScanResult scan(CheckInScanRequest request);

    List<CheckInLog> getLogsByDate(LocalDate date);

    List<CheckInLog> getLogsByAppointment(String appointmentId);

    /** Gắn lượt tiếp đón vừa tạo vào các lần quét trước đó của cùng lịch hẹn. */
    void linkReception(String appointmentId, String receptionId);
}
