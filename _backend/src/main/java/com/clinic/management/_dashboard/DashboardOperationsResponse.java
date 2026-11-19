package com.clinic.management._dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardOperationsResponse {
    private LocalDateTime lastUpdated;
    private List<OperationItemDTO> operations;
}
