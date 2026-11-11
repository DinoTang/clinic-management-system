import React from "react";
import { formatVnd } from "../billingUtils.js";

export default function InvoiceListSidebar({
  currentStaffId,
  loggedInStaffName,
  quickRecordId,
  setQuickRecordId,
  onQuickCreate,
  quickLoading,
  filterTab,
  setFilterTab,
  unpaidCount,
  invoicesCount,
  searchTerm,
  setSearchTerm,
  onRefresh,
  loadingList,
  filteredInvoices,
  selectedInvoice,
  onSelectInvoice,
}) {
  return (
    <div className="billing-left">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <h2 className="panel-title" style={{ margin: 0, border: "none" }}>
          Quản Lý Hóa Đơn & Viện Phí
        </h2>
        {currentStaffId ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "4px 10px",
              backgroundColor: "#eff6ff",
              color: "#1d4ed8",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              border: "1px solid #bfdbfe",
            }}
            title="Nhân viên thu ngân đang đăng nhập"
          >
            Thu ngân:{" "}
            {loggedInStaffName
              ? `${loggedInStaffName} (${currentStaffId})`
              : currentStaffId}
          </span>
        ) : (
          <span
            style={{
              padding: "4px 10px",
              backgroundColor: "#fef2f2",
              color: "#b91c1c",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              border: "1px solid #fecaca",
            }}
          >
            Chưa đăng nhập nhân viên
          </span>
        )}
      </div>

      {/* Lập hóa đơn nhanh theo mã bệnh án */}
      <form onSubmit={onQuickCreate} className="quick-invoice-box">
        <label htmlFor="quick-med-id">Lập hóa đơn:</label>
        <div className="input-wrap">
          <input
            id="quick-med-id"
            type="text"
            className="billing-search-input"
            placeholder="Nhập mã bệnh án (BA001...)"
            value={quickRecordId}
            onChange={(e) => setQuickRecordId(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              padding: "6px 12px",
              fontSize: "12px",
              whiteSpace: "nowrap",
            }}
            disabled={quickLoading}
          >
            {quickLoading ? "Đang tạo..." : "Tạo HĐ"}
          </button>
        </div>
      </form>

      {/* Tabs lọc trạng thái */}
      <div className="billing-filter-tabs">
        <button
          type="button"
          className={`billing-tab-btn ${filterTab === "unpaid" ? "active" : ""}`}
          onClick={() => setFilterTab("unpaid")}
        >
          Chờ thanh toán{" "}
          {filterTab === "unpaid" && unpaidCount > 0 && (
            <span className="badge-count">{unpaidCount}</span>
          )}
        </button>
        <button
          type="button"
          className={`billing-tab-btn ${filterTab === "paid" ? "active" : ""}`}
          onClick={() => setFilterTab("paid")}
        >
          Đã thanh toán
        </button>
        <button
          type="button"
          className={`billing-tab-btn ${filterTab === "all" ? "active" : ""}`}
          onClick={() => setFilterTab("all")}
        >
          Tất cả ({invoicesCount})
        </button>
      </div>

      {/* Ô tìm kiếm */}
      <div className="billing-search-box">
        <input
          type="text"
          className="billing-search-input"
          placeholder="Tìm theo mã HĐ, mã bệnh án..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onRefresh}
          title="Làm mới danh sách"
          style={{ padding: "6px 12px", whiteSpace: "nowrap" }}
        >
          Làm mới
        </button>
      </div>

      {/* Danh sách thẻ hóa đơn */}
      <div className="invoice-list">
        {loadingList ? (
          <p
            style={{
              textAlign: "center",
              color: "#64748b",
              margin: "20px 0",
            }}
          >
            Đang tải danh sách hóa đơn...
          </p>
        ) : filteredInvoices.length === 0 ? (
          <div className="empty-placeholder">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.5L19 7.5V19a2 2 0 0 1-2 2z" />
            </svg>
            <span>Không có hóa đơn nào phù hợp</span>
          </div>
        ) : (
          filteredInvoices.map((inv) => {
            const isSelected = selectedInvoice?.id === inv.id;
            const isPaid = inv.paymentStatus === "DaThanhToan";
            return (
              <div
                key={inv.id}
                className={`invoice-card ${isSelected ? "is-selected" : ""}`}
                onClick={() => onSelectInvoice(inv)}
              >
                <div className="invoice-card-header">
                  <span className="invoice-id">{inv.id}</span>
                  <span
                    className={`status-badge ${isPaid ? "paid" : "unpaid"}`}
                  >
                    {isPaid ? "ĐÃ THANH TOÁN" : "CHỜ THANH TOÁN"}
                  </span>
                </div>

                <div className="invoice-card-body">
                  <div>
                    <b>Bệnh án:</b> {inv.medicalRecordId}
                  </div>
                  <div className="invoice-time">
                    NV lập: {inv.staffId} •{" "}
                    {inv.createdAt
                      ? new Date(inv.createdAt).toLocaleDateString("vi-VN")
                      : "Hôm nay"}
                  </div>
                </div>

                <div className="invoice-card-footer">
                  <span style={{ fontSize: "12px", color: "#64748b" }}>
                    Tổng viện phí:
                  </span>
                  <span className="invoice-total">
                    {formatVnd(inv.total)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
