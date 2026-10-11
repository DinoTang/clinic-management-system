package com.clinic.management._checkin;

import com.clinic.management._checkin.dto.CheckInScanRequest;
import com.clinic.management._checkin.dto.CheckInScanResult;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/checkin")
@CrossOrigin(origins = "http://localhost:5173")
public class CheckInController {

    private final CheckInService checkInService;

    public CheckInController(CheckInService checkInService) {
        this.checkInService = checkInService;
    }

    /** Quét mã QR (hoặc nhập mã lịch hẹn) để lấy thông tin phục vụ tiếp đón. */
    @PostMapping("/scan")
    public CheckInScanResult scan(@RequestBody CheckInScanRequest request) {
        return checkInService.scan(request);
    }

    @GetMapping("/logs")
    public List<CheckInLog> getLogs(
            @RequestParam(value = "date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return checkInService.getLogsByDate(date);
    }

    @GetMapping("/logs/appointment/{appointmentId}")
    public List<CheckInLog> getLogsByAppointment(@PathVariable String appointmentId) {
        return checkInService.getLogsByAppointment(appointmentId);
    }
}
