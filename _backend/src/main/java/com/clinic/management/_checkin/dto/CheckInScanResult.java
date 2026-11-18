package com.clinic.management._checkin.dto;

import com.clinic.management.common.enums.AppointmentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Kết quả quét QR: vừa trả thông tin để đổ sẵn vào form tiếp đón,
 * vừa cho biết lần quét này có hợp lệ hay không.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CheckInScanResult {

    private boolean ok;
    private String result;
    private String message;
    private boolean alreadyCheckedIn;
    private String logId;

    private String appointmentId;
    private AppointmentStatus appointmentStatus;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String reason;
    private String scheduleId;

    private String patientId;
    private String patientName;
    private String patientPhone;

    private String doctorId;
    private String doctorName;

    private String roomId;
}
