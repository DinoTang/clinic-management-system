import React from "react";

export default function CheckoutPatientBanner({ selectedInvoice, patientMeta }) {
  if (!selectedInvoice) return null;

  return (
    <div className="checkout-patient-banner">
      <div className="checkout-patient-info">
        <h3>
          {patientMeta?.patientName ||
            "Bệnh nhân " + (selectedInvoice.medicalRecordId || "")}
        </h3>
        <div className="checkout-patient-meta">
          <span>SĐT: {patientMeta?.patientPhone || "—"}</span>
          <span>Giới tính: {patientMeta?.gender || "—"}</span>
          <span>Phòng: {patientMeta?.roomId || "PK01"}</span>
          <span>Bác sĩ: {patientMeta?.doctorId || "BS001"}</span>
        </div>
        {patientMeta?.diagnosis && (
          <div style={{ fontSize: "12px", marginTop: "4px", opacity: 0.9 }}>
            <b>Chẩn đoán:</b> {patientMeta.diagnosis}
          </div>
        )}
      </div>
      <div className="checkout-invoice-tag">
        Hóa đơn: <b>{selectedInvoice.id}</b>
        Bệnh án: {selectedInvoice.medicalRecordId}
      </div>
    </div>
  );
}
