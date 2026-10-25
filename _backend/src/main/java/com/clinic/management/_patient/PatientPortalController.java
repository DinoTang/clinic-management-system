package com.clinic.management._patient;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.NoSuchElementException;
import java.util.function.Supplier;

/**
 * API dành riêng cho ứng dụng mobile của bệnh nhân (không dùng cho desktop).
 *
 * GET    /api/patient/{patientId}/profile
 * PUT    /api/patient/{patientId}/profile
 * GET    /api/patient/{patientId}/appointments
 * PUT    /api/patient/appointments/{appointmentId}/cancel   body: {"patientId": "..."}
 * GET    /api/patient/{patientId}/medical-records
 */
@RestController
@RequestMapping("/api/patient")
@CrossOrigin(origins = "http://localhost:5173")
public class PatientPortalController {

    private final PatientPortalService patientPortalService;

    public PatientPortalController(PatientPortalService patientPortalService) {
        this.patientPortalService = patientPortalService;
    }

    @GetMapping("/{patientId}/profile")
    public ResponseEntity<?> getProfile(@PathVariable String patientId) {
        return guard(() -> patientPortalService.getProfile(patientId));
    }

    @PutMapping("/{patientId}/profile")
    public ResponseEntity<?> updateProfile(
            @PathVariable String patientId,
            @RequestBody PatientPortalDtos.ProfileDto input) {
        return guard(() -> patientPortalService.updateProfile(patientId, input));
    }

    @GetMapping("/{patientId}/appointments")
    public ResponseEntity<?> getAppointments(@PathVariable String patientId) {
        return guard(() -> patientPortalService.getAppointments(patientId));
    }

    @PutMapping("/appointments/{appointmentId}/cancel")
    public ResponseEntity<?> cancelAppointment(
            @PathVariable String appointmentId,
            @RequestBody PatientPortalDtos.CancelRequest body) {
        String patientId = body == null ? null : body.patientId();
        if (patientId == null || patientId.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Thiếu mã bệnh nhân."));
        }
        return guard(() -> patientPortalService.cancelAppointment(appointmentId, patientId));
    }

    @GetMapping("/{patientId}/medical-records")
    public ResponseEntity<?> getMedicalRecords(@PathVariable String patientId) {
        return guard(() -> patientPortalService.getMedicalRecords(patientId));
    }

    private <T> ResponseEntity<T> guard(Supplier<T> action) {
        try {
            return ResponseEntity.ok(action.get());
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(cast(Map.of("message", e.getMessage())));
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(cast(Map.of("message", e.getMessage())));
        }
    }

    @SuppressWarnings("unchecked")
    private static <T> T cast(Object value) {
        return (T) value;
    }
}
