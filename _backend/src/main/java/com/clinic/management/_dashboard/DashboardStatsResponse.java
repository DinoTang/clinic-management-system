package com.clinic.management._dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {
    private long todayAppointments;   // Tổng lịch hẹn hôm nay (không tính đã hủy)
    private long todayExamined;       // Số lượt đã khám / hoàn tất trong ngày
    private BigDecimal todayRevenue;  // Doanh thu đã thu trong ngày
    private long activeDoctors;       // Số bác sĩ đang hoạt động
    private long totalDoctors;        // Tổng số bác sĩ (để FE hiển thị phụ chú VD: "4 / 6 bác sĩ")
}
