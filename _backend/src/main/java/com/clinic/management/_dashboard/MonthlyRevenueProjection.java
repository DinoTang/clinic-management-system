package com.clinic.management._dashboard;

import java.math.BigDecimal;

public interface MonthlyRevenueProjection {
    Integer getMonth();
    BigDecimal getRevenue();
}
