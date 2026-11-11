import React from "react";
import "../../styles/billing.css";
import "../../styles/desktop-schedule.css";
import { useBilling } from "./useBilling.js";

// Sub-components chuẩn React
import CheckoutPatientBanner from "./components/CheckoutPatientBanner.jsx";
import InvoiceBreakdownTable from "./components/InvoiceBreakdownTable.jsx";
import InvoiceListSidebar from "./components/InvoiceListSidebar.jsx";
import PaymentMethodsSection from "./components/PaymentMethodsSection.jsx";
import ReceiptModal from "./components/ReceiptModal.jsx";

function BillingPage() {
  const {
    loggedInStaffName,
    currentStaffId,
    // Danh sách & Bộ lọc
    invoices,
    filterTab,
    setFilterTab,
    searchTerm,
    setSearchTerm,
    loadingList,
    filteredInvoices,
    unpaidCount,
    fetchInvoices,
    // Hóa đơn đang chọn & Chi tiết
    selectedInvoice,
    loadingDetails,
    patientMeta,
    handleSelectInvoice,
    // Lập HĐ nhanh
    quickRecordId,
    setQuickRecordId,
    quickLoading,
    handleQuickCreate,
    // Thanh toán & Tiền mặt
    paymentMethod,
    setPaymentMethod,
    amountGiven,
    setAmountGiven,
    isSubmitting,
    totalAmount,
    changeAmount,
    isCashInsufficient,
    handlePayment,
    // Cấu hình thanh toán
    clinicConfig,
    momoQrMode,
    setMomoQrMode,
    handleEditPaymentConfig,
    // QR Payloads
    vnpayQrPayload,
    momoNativeQrPayload,
    momoVietQrPayload,
    vietQrPayload,
    cleanMomoOwner,
    // Modal in biên lai
    receiptInvoice,
    setReceiptInvoice,
  } = useBilling();

  return (
    <div className="billing-container">
      {/* ================= CỘT TRÁI: DANH SÁCH HÓA ĐƠN ================= */}
      <InvoiceListSidebar
        currentStaffId={currentStaffId}
        loggedInStaffName={loggedInStaffName}
        quickRecordId={quickRecordId}
        setQuickRecordId={setQuickRecordId}
        onQuickCreate={handleQuickCreate}
        quickLoading={quickLoading}
        filterTab={filterTab}
        setFilterTab={setFilterTab}
        unpaidCount={unpaidCount}
        invoicesCount={invoices.length}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onRefresh={fetchInvoices}
        loadingList={loadingList}
        filteredInvoices={filteredInvoices}
        selectedInvoice={selectedInvoice}
        onSelectInvoice={handleSelectInvoice}
      />

      {/* ================= CỘT PHẢI: BÀN THU NGÂN & THANH TOÁN ================= */}
      <div className="billing-right">
        {!selectedInvoice ? (
          <div className="empty-placeholder" style={{ marginTop: "100px" }}>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            <h3 style={{ margin: "0", color: "#475569" }}>
              Bàn Thu Ngân Sẵn Sàng
            </h3>
            <p style={{ margin: "0", fontSize: "13px" }}>
              Vui lòng chọn một hóa đơn từ danh sách bên trái để tiến hành kiểm
              tra chi tiết và thu tiền viện phí.
            </p>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <h2
                className="panel-title"
                style={{ border: "none", margin: 0, padding: 0 }}
              >
                Chi Tiết Viện Phí & Thu Ngân
              </h2>
              {selectedInvoice.paymentStatus === "DaThanhToan" && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    setReceiptInvoice({
                      ...selectedInvoice,
                      patientMeta,
                    })
                  }
                  style={{ fontSize: "13px", padding: "6px 14px" }}
                >
                  In Biên Lai
                </button>
              )}
            </div>

            {/* Banner thông tin bệnh nhân & hồ sơ */}
            <CheckoutPatientBanner
              selectedInvoice={selectedInvoice}
              patientMeta={patientMeta}
            />

            {/* Bảng chi tiết các khoản mục thu */}
            <InvoiceBreakdownTable
              selectedInvoice={selectedInvoice}
              loadingDetails={loadingDetails}
            />

            {/* Phương thức thanh toán & chi tiết */}
            <PaymentMethodsSection
              selectedInvoice={selectedInvoice}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              totalAmount={totalAmount}
              amountGiven={amountGiven}
              setAmountGiven={setAmountGiven}
              isCashInsufficient={isCashInsufficient}
              changeAmount={changeAmount}
              vnpayQrPayload={vnpayQrPayload}
              momoQrMode={momoQrMode}
              setMomoQrMode={setMomoQrMode}
              momoNativeQrPayload={momoNativeQrPayload}
              momoVietQrPayload={momoVietQrPayload}
              cleanMomoOwner={cleanMomoOwner}
              vietQrPayload={vietQrPayload}
              clinicConfig={clinicConfig}
              onEditPaymentConfig={handleEditPaymentConfig}
              isSubmitting={isSubmitting}
              onPayment={handlePayment}
              onOpenReceipt={() =>
                setReceiptInvoice({
                  ...selectedInvoice,
                  patientMeta,
                })
              }
            />
          </>
        )}
      </div>

      {/* ================= MODAL IN BIÊN LAI / HÓA ĐƠN THU TIỀN ================= */}
      <ReceiptModal
        receiptInvoice={receiptInvoice}
        clinicConfig={clinicConfig}
        loggedInStaffName={loggedInStaffName}
        currentStaffId={currentStaffId}
        onClose={() => setReceiptInvoice(null)}
      />
    </div>
  );
}

export default BillingPage;
