import React from "react";

export default function ReceptionSlipModal({ createdSlip, onClose }) {
  if (!createdSlip) return null;

  return (
    <div className="modal-overlay">
      <div className="slip-card">
        <h3 style={{ margin: "0 0 4px 0", color: "#1e3a8a" }}>
          PHIẾU KHÁM BỆNH
        </h3>
        <p
          style={{
            margin: "0 0 10px 0",
            fontSize: "12px",
            color: "#64748b",
          }}
        >
          Phòng Khám Đa Khoa
        </p>
        <hr style={{ border: "none", borderTop: "1px dashed #cbd5e1" }} />

        <div
          style={{ fontSize: "13px", color: "#475569", marginTop: "10px" }}
        >
          SỐ THỨ TỰ CỦA BẠN
        </div>
        <div className="slip-number">{createdSlip.queueNumber}</div>

        <div
          style={{ textAlign: "left", fontSize: "13px", lineHeight: "1.8" }}
        >
          <div>
            <b>Mã Tiếp Đón:</b> {createdSlip.id}
          </div>
          <div>
            <b>Bệnh Nhân:</b> {createdSlip.patientId}
          </div>
          <div>
            <b>Phòng Khám:</b> {createdSlip.roomId}
          </div>
          <div>
            <b>Bác Sĩ Trực:</b> {createdSlip.doctorId}
          </div>
          <div>
            <b>Ngày Khám:</b> {createdSlip.receptionDate}
          </div>
        </div>

        <div
          style={{
            marginTop: "18px",
            display: "flex",
            gap: "8px",
            justifyContent: "center",
          }}
        >
          <button className="btn btn-secondary" onClick={onClose}>
            Đóng
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              window.print();
              onClose();
            }}
          >
            In Phiếu
          </button>
        </div>
      </div>
    </div>
  );
}
