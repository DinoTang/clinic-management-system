const CURRENCY = new Intl.NumberFormat("vi-VN");

export function formatMoney(value) {
  return `${CURRENCY.format(Number(value) || 0)} ₫`;
}

export function formatCurrencyNumber(value) {
  return CURRENCY.format(value);
}

export function getInitials(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0])
    .join("")
    .toLocaleUpperCase("vi");
}

export function getStatusClass(value) {
  if (["ACTIVE", "AVAILABLE", "CONFIRMED", "COMPLETED", "PAID"].includes(value)) {
    return "is-positive";
  }
  if (["PENDING", "CHECKED_IN", "UNPAID"].includes(value)) return "is-warning";
  if (["LOCKED", "INACTIVE", "CANCELLED", "REJECTED", "NO_SHOW"].includes(value)) {
    return "is-muted";
  }
  if (value === "IN_PROGRESS") return "is-info";
  return "";
}

export function exportAdminCsv({ activeModule, currentModule, filteredRows, data, period, revenue, allAppointments }) {
  const reportRows = data.doctors
    .map((doctor) => ({
      name: doctor.name,
      visits: allAppointments.filter(
        (appointment) => appointment.doctor === doctor.name,
      ).length,
    }))
    .sort((left, right) => right.visits - left.visits)
    .map((doctor, index) => [
      "Lượt khám theo bác sĩ",
      doctor.name,
      doctor.visits + [38, 31, 24, 17][index % 4],
    ]);

  const csvRows = currentModule
    ? [
        currentModule.columns.map((column) => column[1]),
        ...filteredRows.map((row) =>
          currentModule.columns.map(([key]) => row[key] ?? ""),
        ),
      ]
    : [
        ["Chỉ số", "Giá trị"],
        ["Kỳ báo cáo", period],
        ["Doanh thu đã thu", revenue],
        ["Tổng lượt khám", allAppointments.length + 124],
        ["Đặt lịch online", allAppointments.filter((item) => item.source === "ONLINE").length + 93],
        ["Walk-in", allAppointments.filter((item) => item.source === "WALK_IN").length + 31],
        ...reportRows,
      ];

  const csv = csvRows
    .map((row) =>
      row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","),
    )
    .join("\r\n");

  const url = URL.createObjectURL(
    new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `clinic-${activeModule}-demo.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}
