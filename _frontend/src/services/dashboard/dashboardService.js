const API_BASE_URL = "http://localhost:8080/api/dashboard";

const dashboardService = {
  async getDashboardStats() {
    const response = await fetch(`${API_BASE_URL}/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Lỗi khi tải thống kê tổng quan (${response.status})`);
    }

    return response.json();
  },

  async getOperationsSummary() {
    const response = await fetch(`${API_BASE_URL}/operations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Lỗi khi tải dữ liệu vận hành (${response.status})`);
    }

    return response.json();
  },

  async getSpecialtyVisits() {
    const response = await fetch(`${API_BASE_URL}/specialty-visits`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Lỗi khi tải lượt khám theo chuyên khoa (${response.status})`);
    }

    return response.json();
  },

  async getRecentAppointments() {
    const response = await fetch(`${API_BASE_URL}/recent-appointments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Lỗi khi tải lịch hẹn gần đây (${response.status})`);
    }

    return response.json();
  },

  async getMonthlyRevenue(year) {
    const url = year
      ? `${API_BASE_URL}/revenue?year=${year}`
      : `${API_BASE_URL}/revenue`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Lỗi khi tải doanh thu theo tháng (${response.status})`);
    }

    return response.json();
  },

  async getRevenueOverview(period = "MONTH") {
    const response = await fetch(`${API_BASE_URL}/revenue-overview?period=${period}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Lỗi khi tải tổng quan doanh thu (${response.status})`);
    }

    return response.json();
  },
};

export default dashboardService;
