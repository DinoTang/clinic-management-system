import React from "react";
import { AdminIcon } from "./AdminIcon.jsx";
import { STATUS_LABELS } from "../adminConstants.js";
import {
  formatMoney,
  formatCurrencyNumber,
  getInitials,
  getStatusClass,
} from "../adminUtils.js";

export function AdminModuleView({
  config,
  moduleRows,
  filteredRows,
  query,
  setQuery,
  statusFilter,
  setStatusFilter,
  onStartCreate,
  onStartEdit,
  onToggleStatus,
}) {
  if (!config) return null;

  const renderCell = (row, [key, , type]) => {
    const value = row[key];
    if (type === "person") {
      return (
        <div className="admin-person-cell">
          <span className="admin-avatar">
            {getInitials(row.name || row.patient)}
          </span>
          <span>{value}</span>
        </div>
      );
    }
    if (type === "status") {
      return (
        <span className={`admin-status ${getStatusClass(value)}`}>
          <i />
          {STATUS_LABELS[value] || value}
        </span>
      );
    }
    if (
      type === "money" ||
      key === "price" ||
      key === "fee" ||
      key === "total"
    ) {
      return formatMoney(value);
    }
    if (type === "capacity") {
      return (
        <div className="admin-capacity-cell">
          <span>
            {row.booked} / {row.maxPatients}
          </span>
          <span className="admin-capacity-track">
            <i
              style={{
                width: `${Math.min((row.booked / row.maxPatients) * 100, 100)}%`,
              }}
            />
          </span>
        </div>
      );
    }
    if (type === "stock") {
      return (
        <span className={value < 30 ? "admin-stock-low" : ""}>
          {formatCurrencyNumber(value)} {value < 30 && <b>Sắp hết</b>}
        </span>
      );
    }
    if (key === "role") {
      return (
        <span className="admin-role-tag">
          {
            {
              ADMIN: "Quản trị",
              DOCTOR: "Bác sĩ",
              STAFF: "Nhân viên",
              PATIENT: "Bệnh nhân",
            }[value] || value
          }
        </span>
      );
    }
    if (key === "source") {
      return (
        <span className="admin-source-tag">
          {STATUS_LABELS[value] || value}
        </span>
      );
    }
    if (key === "experience") return `${value} năm`;
    if (key === "birthDate" && value) {
      const [year, month, day] = value.split("-");
      return `${day}/${month}/${year}`;
    }
    return value || "—";
  };

  const statusOptions = [
    ...new Set(moduleRows.map((row) => row.status).filter(Boolean)),
  ];

  return (
    <>
      <div className="admin-welcome-row admin-module-welcome">
        <div>
          <p className="admin-eyebrow">
            QUẢN TRỊ HỆ THỐNG / {config.title.toLocaleUpperCase("vi")}
          </p>
          <h1>{config.title}</h1>
          <p className="admin-page-subtitle">{config.description}</p>
        </div>
        {config.mutable && (
          <button
            className="admin-primary-button"
            onClick={onStartCreate}
            type="button"
          >
            <AdminIcon name="plus" size={18} /> {config.addLabel}
          </button>
        )}
      </div>

      <section className="admin-panel admin-data-panel">
        <div className="admin-data-toolbar">
          <label className="admin-search">
            <AdminIcon name="search" size={18} />
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm theo tên, mã hoặc thông tin..."
              value={query}
            />
          </label>
          <label className="admin-filter">
            <AdminIcon name="filter" size={17} />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Lọc trạng thái"
            >
              <option value="ALL">Tất cả trạng thái</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABELS[status] || status}
                </option>
              ))}
            </select>
          </label>
          <span className="admin-row-count">
            {filteredRows.length} bản ghi
          </span>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                {config.columns.map((column) => (
                  <th key={column[0]}>{column[1]}</th>
                ))}
                {(config.mutable || config.statusField) && (
                  <th className="admin-actions-heading">Thao tác</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.id}>
                  {config.columns.map((column) => (
                    <td key={column[0]}>{renderCell(row, column)}</td>
                  ))}
                  {(config.mutable || config.statusField) && (
                    <td className="admin-row-actions">
                      {config.mutable && (
                        <button
                          className="admin-icon-button"
                          onClick={() => onStartEdit(row)}
                          title="Chỉnh sửa"
                          type="button"
                        >
                          <AdminIcon name="edit" size={17} />
                        </button>
                      )}
                      {config.statusField && (
                        <button
                          className="admin-row-action-link"
                          onClick={() => onToggleStatus(row)}
                          type="button"
                        >
                          {row[config.statusField] === "ACTIVE" ||
                          row[config.statusField] === "AVAILABLE"
                            ? "Ngừng"
                            : "Kích hoạt"}
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
              {filteredRows.length === 0 && (
                <tr>
                  <td
                    className="admin-empty-cell"
                    colSpan={config.columns.length + 1}
                  >
                    Không tìm thấy dữ liệu phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-table-footer">
          <span>
            Đang hiển thị <b>{filteredRows.length}</b> trên{" "}
            <b>{moduleRows.length}</b> bản ghi
          </span>
          <div>
            <button disabled type="button">
              Trước
            </button>
            <button className="is-current" type="button">
              1
            </button>
            <button disabled type="button">
              Sau
            </button>
          </div>
        </div>
      </section>

      <div className="admin-demo-callout">
        <span>i</span>
        <p>
          <b>Chế độ giao diện thử nghiệm.</b> Thay đổi trên màn hình chỉ lưu tạm
          trong bộ nhớ của trang và không ghi vào database.
        </p>
      </div>
    </>
  );
}
