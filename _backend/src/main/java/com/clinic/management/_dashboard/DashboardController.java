package com.clinic.management._dashboard;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/operations")
    public DashboardOperationsResponse getOperationsSummary() {
        return dashboardService.getOperationsSummary();
    }

	@GetMapping("/specialty-visits")
	public List<SpecialtyVisitProjection> getMonthlyVisitsBySpecialty() {
	    return dashboardService.getMonthlyVisitsBySpecialty();
	}

	@GetMapping("/recent-appointments")
	public List<RecentAppointmentProjection> getRecentAppointments() {
	    return dashboardService.getRecentAppointments();
	}

	@GetMapping("/revenue")
	public List<MonthlyRevenueDTO> getMonthlyRevenue(
	        @RequestParam(required = false) Integer year
	) {
	    return dashboardService.getMonthlyRevenue(year);
	}

	@GetMapping("/revenue-overview")
	public RevenueOverviewResponse getRevenueOverview(
	        @RequestParam(defaultValue = "MONTH") String period
	) {
	    return dashboardService.getRevenueOverview(period);
	}

	@GetMapping("/stats")
	public DashboardStatsResponse getDashboardStats() {
	    return dashboardService.getDashboardStats();
	}

}
