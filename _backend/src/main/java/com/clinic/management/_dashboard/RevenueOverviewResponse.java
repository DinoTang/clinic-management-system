package com.clinic.management._dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RevenueOverviewResponse {
    private BigDecimal totalRevenue;        // Tổng doanh thu kỳ hiện tại
    private double growthPercentage;        // % tăng/giảm so với kỳ trước (VD: 8.4 hoặc -3.2)
    private List<MonthlyRevenueDTO> chart;  // Dữ liệu biểu đồ 12 tháng
}
