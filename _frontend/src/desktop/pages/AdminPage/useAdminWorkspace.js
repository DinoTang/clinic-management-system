import { useMemo, useState } from "react";
import {
  NAVIGATION,
  SEED_DATA,
  MODULES,
  MODULE_DATA_KEY,
  EMPTY_ROWS,
} from "./adminConstants.js";
import { exportAdminCsv } from "./adminUtils.js";

export function useAdminWorkspace() {
  const [activeModule, setActiveModule] = useState("overview");
  const [data, setData] = useState(SEED_DATA);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [period, setPeriod] = useState("Tháng này");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const allAppointments = data.appointments;
  const revenue = data.invoices
    .filter((invoice) => invoice.status === "PAID")
    .reduce((sum, invoice) => sum + invoice.total, 0);
  const todayAppointments = allAppointments.filter(
    (appointment) => appointment.date === "2026-10-11",
  ).length;
  const activeDoctors = data.doctors.filter(
    (doctor) => doctor.status === "ACTIVE",
  ).length;
  const lowStock = data.medicines.filter(
    (medicine) => medicine.status === "ACTIVE" && medicine.stock < 30,
  );
  const currentModule = MODULES[activeModule];
  const moduleRows = currentModule
    ? data[MODULE_DATA_KEY[activeModule]]
    : EMPTY_ROWS;

  const filteredRows = useMemo(() => {
    if (!currentModule) return [];
    const normalizedQuery = query.trim().toLocaleLowerCase("vi");
    return moduleRows.filter((row) => {
      const matchesQuery =
        !normalizedQuery ||
        Object.values(row).some((value) =>
          String(value).toLocaleLowerCase("vi").includes(normalizedQuery),
        );
      const matchesStatus =
        statusFilter === "ALL" || row.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [currentModule, moduleRows, query, statusFilter]);

  const activeNavItem = NAVIGATION.flatMap((group) => group.items).find(
    (item) => item.id === activeModule,
  );

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  const navigate = (moduleId) => {
    setActiveModule(moduleId);
    setQuery("");
    setStatusFilter("ALL");
    setMobileMenuOpen(false);
  };

  const startCreate = () => {
    const config = MODULES[activeModule];
    const values = Object.fromEntries(
      config.fields.map(([key, , type, , options]) => [
        key,
        type === "select" ? options[0] : "",
      ]),
    );
    setModal({ mode: "create", moduleId: activeModule, values });
  };

  const startEdit = (row) => {
    setModal({
      mode: "edit",
      moduleId: activeModule,
      id: row.id,
      values: Object.fromEntries(
        MODULES[activeModule].fields.map(([key]) => [key, row[key] ?? ""]),
      ),
    });
  };

  const saveModal = (event) => {
    event.preventDefault();
    const { moduleId, mode, id, values } = modal;
    const config = MODULES[moduleId];
    const missingRequired = config.fields.find(
      ([key, , , required]) =>
        required && String(values[key] ?? "").trim() === "" && key !== config.statusField,
    );
    if (missingRequired) {
      showToast(`Vui lòng nhập ${missingRequired[1].toLocaleLowerCase("vi")}.`);
      return;
    }

    if (
      moduleId === "specialties" &&
      data.specialties.some(
        (item) =>
          item.id !== id &&
          item.name.trim().toLocaleLowerCase("vi") ===
            String(values.name).trim().toLocaleLowerCase("vi"),
      )
    ) {
      showToast("Tên chuyên khoa đang bị trùng.");
      return;
    }

    if (moduleId === "medicines" && Number(values.stock) < 0) {
      showToast("Tồn kho không được nhỏ hơn 0.");
      return;
    }

    const collectionKey = MODULE_DATA_KEY[moduleId];
    setData((previous) => {
      const rows = previous[collectionKey];
      if (mode === "edit") {
        return {
          ...previous,
          [collectionKey]: rows.map((row) =>
            row.id === id
              ? {
                  ...row,
                  ...values,
                  ...(values.price !== undefined ? { price: Number(values.price) } : {}),
                  ...(values.fee !== undefined ? { fee: Number(values.fee) } : {}),
                  ...(values.stock !== undefined ? { stock: Number(values.stock) } : {}),
                  ...(values.experience !== undefined
                    ? { experience: Number(values.experience) }
                    : {}),
                }
              : row,
          ),
        };
      }
      return {
        ...previous,
        [collectionKey]: [
          {
            id: `${moduleId === "accounts" ? "ND" : moduleId === "doctors" ? "BS" : moduleId === "specialties" ? "CK" : moduleId === "rooms" ? "PK" : moduleId === "medicines" ? "TH" : "DV"}${String(Date.now()).slice(-4)}`,
            ...values,
            ...(values.price !== undefined ? { price: Number(values.price) } : {}),
            ...(values.fee !== undefined ? { fee: Number(values.fee) } : {}),
            ...(values.stock !== undefined ? { stock: Number(values.stock) } : {}),
            ...(values.experience !== undefined
              ? { experience: Number(values.experience) }
              : {}),
          },
          ...rows,
        ],
      };
    });
    setModal(null);
    showToast(mode === "edit" ? "Đã cập nhật dữ liệu demo." : "Đã thêm dữ liệu demo.");
  };

  const toggleStatus = (row) => {
    const config = MODULES[activeModule];
    if (
      activeModule === "specialties" &&
      row.status !== "ACTIVE" &&
      row.doctors === 0
    ) {
      showToast("Chưa thể mở chuyên khoa chưa có bác sĩ được phân công.");
      return;
    }
    const nextStatus =
      row[config.statusField] === "ACTIVE"
        ? activeModule === "accounts"
          ? "LOCKED"
          : "INACTIVE"
        : "ACTIVE";
    const safeStatus =
      row[config.statusField] === "AVAILABLE" ? "CANCELLED" : nextStatus;
    const collectionKey = MODULE_DATA_KEY[activeModule];
    setData((previous) => ({
      ...previous,
      [collectionKey]: previous[collectionKey].map((item) =>
        item.id === row.id ? { ...item, [config.statusField]: safeStatus } : item,
      ),
    }));
    showToast(
      safeStatus === "LOCKED" || safeStatus === "CANCELLED"
        ? "Đã tạm ngưng trong dữ liệu demo."
        : "Đã kích hoạt lại trong dữ liệu demo.",
    );
  };

  const startExport = () => {
    exportAdminCsv({
      activeModule,
      currentModule,
      filteredRows,
      data,
      period,
      revenue,
      allAppointments,
    });
    showToast("Đã xuất báo cáo CSV dữ liệu demo.");
  };

  return {
    activeModule,
    data,
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    period,
    setPeriod,
    modal,
    setModal,
    toast,
    mobileMenuOpen,
    setMobileMenuOpen,
    allAppointments,
    revenue,
    todayAppointments,
    activeDoctors,
    lowStock,
    currentModule,
    moduleRows,
    filteredRows,
    activeNavItem,
    showToast,
    navigate,
    startCreate,
    startEdit,
    saveModal,
    toggleStatus,
    startExport,
  };
}
