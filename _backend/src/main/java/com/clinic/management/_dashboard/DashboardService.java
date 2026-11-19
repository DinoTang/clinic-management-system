package com.clinic.management._dashboard;

import com.clinic.management._appointment.AppointmentRepository;
import com.clinic.management._billing.InvoiceRepository;
import com.clinic.management._doctor.repositories.DoctorRepository;
import com.clinic.management._medicine.MedicineRepository;
import com.clinic.management.common.enums.PaymentStatus;
import com.clinic.management.common.enums.AppointmentStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final AppointmentRepository appointmentRepository;
    private final InvoiceRepository invoiceRepository;
    private final MedicineRepository medicineRepository;
    private final DoctorRepository doctorRepository;

    private static final int LOW_STOCK_THRESHOLD = 30;
    private static final int RECENT_APPOINTMENTS_LIMIT = 4;

    // Method mới: Dữ liệu cho 4 thẻ StatPanel
    @Transactional(readOnly = true)
    public DashboardStatsResponse getDashboardStats() {
        LocalDate today = LocalDate.now();

        long todayAppointments = appointmentRepository
                .countByAppointmentDateAndDeletedFalseAndStatusNot(today, AppointmentStatus.CANCELLED);

        long todayExamined = appointmentRepository
                .countByAppointmentDateAndDeletedFalseAndStatusIn(
                        today,
                        List.of(AppointmentStatus.EXAMINED, AppointmentStatus.COMPLETED)
                );

        BigDecimal todayRevenue = invoiceRepository.sumRevenueBetweenDates(today, today);

        long activeDoctors = doctorRepository.countActiveDoctors();
        long totalDoctors = doctorRepository.countByDeletedFalse();

        return DashboardStatsResponse.builder()
                .todayAppointments(todayAppointments)
                .todayExamined(todayExamined)
                .todayRevenue(todayRevenue != null ? todayRevenue : BigDecimal.ZERO)
                .activeDoctors(activeDoctors)
                .totalDoctors(totalDoctors)
                .build();
    }

    @Transactional(readOnly = true)
    public DashboardOperationsResponse getOperationsSummary() {
        long pendingAppointments = appointmentRepository
                .countByStatusAndDeletedFalse(AppointmentStatus.BOOKED);

        long waitingPatients = appointmentRepository
                .countByStatusAndDeletedFalse(AppointmentStatus.ARRIVED);

		long unpaidInvoices = invoiceRepository
		        .countByPaymentStatusAndDeletedFalse(PaymentStatus.UNPAID);

        long lowStockMedicines = medicineRepository
                .countByStockLessThanAndDeletedFalse(LOW_STOCK_THRESHOLD);

        List<OperationItemDTO> operations = List.of(
                OperationItemDTO.builder().type("APPOINTMENT").count(pendingAppointments).build(),
                OperationItemDTO.builder().type("PATIENT_QUEUE").count(waitingPatients).build(),
                OperationItemDTO.builder().type("INVOICE").count(unpaidInvoices).build(),
                OperationItemDTO.builder().type("MEDICINE").count(lowStockMedicines).build()
        );

        return DashboardOperationsResponse.builder()
                .lastUpdated(LocalDateTime.now())
                .operations(operations)
                .build();
    }

    @Transactional(readOnly = true)
    public List<SpecialtyVisitProjection> getMonthlyVisitsBySpecialty() {
        LocalDate now = LocalDate.now();
        return appointmentRepository.countMonthlyVisitsBySpecialty(
                now.getYear(),
                now.getMonthValue()
        );
    }

    @Transactional(readOnly = true)
    public List<RecentAppointmentProjection> getRecentAppointments() {
        return appointmentRepository.findRecentAppointments(RECENT_APPOINTMENTS_LIMIT);
    }

    @Transactional(readOnly = true)
    public List<MonthlyRevenueDTO> getMonthlyRevenue(Integer year) {
        int targetYear = (year != null) ? year : LocalDate.now().getYear();

        Map<Integer, BigDecimal> revenueByMonth = invoiceRepository
                .sumMonthlyRevenueByYear(targetYear)
                .stream()
                .collect(Collectors.toMap(
                        MonthlyRevenueProjection::getMonth,
                        MonthlyRevenueProjection::getRevenue
                ));

        List<MonthlyRevenueDTO> result = new ArrayList<>();
        for (int month = 1; month <= 12; month++) {
            result.add(MonthlyRevenueDTO.builder()
                    .month(month)
                    .revenue(revenueByMonth.getOrDefault(month, BigDecimal.ZERO))
                    .build());
        }
        return result;
    }

    @Transactional(readOnly = true)
    public RevenueOverviewResponse getRevenueOverview(String period) {
        LocalDate now = LocalDate.now();
        LocalDate currentStart;
        LocalDate currentEnd;
        LocalDate prevStart;
        LocalDate prevEnd;

        String normalizedPeriod = (period != null) ? period.toUpperCase() : "MONTH";

        switch (normalizedPeriod) {
            case "QUARTER" -> {
                int currentQuarter = (now.getMonthValue() - 1) / 3 + 1;
                int firstMonthOfQuarter = (currentQuarter - 1) * 3 + 1;
                currentStart = LocalDate.of(now.getYear(), firstMonthOfQuarter, 1);
                currentEnd = currentStart.plusMonths(3).minusDays(1);

                prevStart = currentStart.minusMonths(3);
                prevEnd = currentStart.minusDays(1);
            }
            case "YEAR" -> {
                currentStart = LocalDate.of(now.getYear(), 1, 1);
                currentEnd = LocalDate.of(now.getYear(), 12, 31);

                prevStart = currentStart.minusYears(1);
                prevEnd = currentEnd.minusYears(1);
            }
            default -> {
                currentStart = now.withDayOfMonth(1);
                currentEnd = now.withDayOfMonth(now.lengthOfMonth());

                prevStart = currentStart.minusMonths(1);
                prevEnd = currentStart.minusDays(1);
            }
        }

        BigDecimal currentRevenue = invoiceRepository.sumRevenueBetweenDates(currentStart, currentEnd);
        BigDecimal previousRevenue = invoiceRepository.sumRevenueBetweenDates(prevStart, prevEnd);

        double growth = 0.0;
        if (previousRevenue != null && previousRevenue.compareTo(BigDecimal.ZERO) > 0) {
            growth = currentRevenue.subtract(previousRevenue)
                    .divide(previousRevenue, 4, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100))
                    .doubleValue();
        } else if (currentRevenue != null && currentRevenue.compareTo(BigDecimal.ZERO) > 0) {
            growth = 100.0;
        }

        return RevenueOverviewResponse.builder()
                .totalRevenue(currentRevenue != null ? currentRevenue : BigDecimal.ZERO)
                .growthPercentage(Math.round(growth * 10.0) / 10.0)
                .chart(getMonthlyRevenue(now.getYear()))
                .build();
    }
}
