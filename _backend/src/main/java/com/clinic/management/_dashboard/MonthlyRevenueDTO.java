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
public class MonthlyRevenueDTO {
    private int month;          // 1 -> 12
    private BigDecimal revenue; // VD: 12000000
}
