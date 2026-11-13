import React from "react";

export default function ExaminationPrintModal({
  showPrint,
  selected,
  patient,
  age,
  doctorName,
  examDate,
  medicalRecordId,
  vitals,
  exam,
  medLines,
  medicines,
  svcLines,
  services,
  formatVnd,
  onClose,
}) {
  if (!showPrint || !selected) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="exam-print-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Phiếu khám bệnh"
      >
        <div className="exam-print-head">
          <h2>PHIẾU KHÁM BỆNH</h2>
          <p>
            Phòng Khám Đa Khoa · Ngày {examDate} · Bác sĩ:{" "}
            {doctorName || selected.doctorId}
          </p>
        </div>

        <div className="exam-print-info">
          <span>
            <b>Mã lượt khám:</b> {selected.id}
          </span>
          <span>
            <b>STT:</b> {selected.queueNumber}
          </span>
          <span>
            <b>Bệnh nhân:</b>{" "}
            {patient?.fullName || `Bệnh nhân ${selected.patientId}`} (
            {selected.patientId})
          </span>
          <span>
            <b>Phòng:</b> {selected.roomId}
          </span>
          <span>
            <b>Giới tính:</b> {patient?.gender || "—"}
          </span>
          <span>
            <b>Tuổi:</b> {age !== null ? age : "—"}
          </span>
          <span>
            <b>SĐT:</b> {patient?.phoneNumber || "—"}
          </span>
          <span>
            <b>Mã bệnh án:</b> {medicalRecordId || "—"}
          </span>
        </div>

        <div className="exam-print-section">
          <h4>Chỉ số sinh hiệu</h4>
          <p>
            Mạch: {vitals.pulse || "—"} lần/phút · Nhiệt độ:{" "}
            {vitals.temperature || "—"} °C · Huyết áp:{" "}
            {vitals.bloodPressure || "—"} mmHg · Cân nặng:{" "}
            {vitals.weight || "—"} kg · Chiều cao: {vitals.height || "—"} cm
          </p>
        </div>

        <div className="exam-print-section">
          <h4>Triệu chứng</h4>
          <p>{exam.symptoms || "—"}</p>
        </div>

        <div className="exam-print-section">
          <h4>Khám lâm sàng</h4>
          <p>
            {[
              exam.generalExam && `Toàn trạng: ${exam.generalExam}`,
              exam.localExam && `Tại chỗ: ${exam.localExam}`,
            ]
              .filter(Boolean)
              .join("\n") || "—"}
          </p>
        </div>

        <div className="exam-print-section">
          <h4>Chẩn đoán</h4>
          <p>{exam.diagnosis || "—"}</p>
        </div>

        <div className="exam-print-section">
          <h4>Đơn thuốc</h4>
          {medLines.filter((l) => l.medicineId).length > 0 ? (
            <table className="exam-print-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Thuốc</th>
                  <th>SL</th>
                  <th>Liều dùng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {medLines
                  .filter((l) => l.medicineId)
                  .map((line, index) => (
                    <tr key={`print-med-${index}`}>
                      <td>{index + 1}</td>
                      <td>
                        {medicines.find((m) => m.id === line.medicineId)
                          ?.name || line.medicineId}
                      </td>
                      <td>{line.quantity}</td>
                      <td>{line.dosage || "—"}</td>
                      <td>
                        {formatVnd(
                          (Number(line.quantity) || 0) *
                            (Number(line.unitPrice) || 0),
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p>Không kê đơn thuốc.</p>
          )}
        </div>

        <div className="exam-print-section">
          <h4>Chỉ định dịch vụ</h4>
          {svcLines.filter((l) => l.serviceId).length > 0 ? (
            <table className="exam-print-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Dịch vụ</th>
                  <th>SL</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {svcLines
                  .filter((l) => l.serviceId)
                  .map((line, index) => (
                    <tr key={`print-svc-${index}`}>
                      <td>{index + 1}</td>
                      <td>
                        <div>
                          {services.find((s) => s.id === line.serviceId)
                            ?.name || line.serviceId}
                        </div>
                        {line.result && (
                          <div
                            style={{
                              fontSize: "11px",
                              color: "#166534",
                              fontStyle: "italic",
                              marginTop: "2px",
                            }}
                          >
                            KQ: {line.result}
                          </div>
                        )}
                      </td>
                      <td>{line.quantity}</td>
                      <td>
                        {formatVnd(
                          (Number(line.quantity) || 0) *
                            (Number(line.unitPrice) || 0),
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p>Không chỉ định dịch vụ.</p>
          )}
        </div>

        <div className="exam-print-section">
          <h4>Tiên lượng & ghi chú điều trị</h4>
          <p>
            {[exam.prognosis, exam.notes].filter(Boolean).join("\n") ||
              "—"}
          </p>
        </div>

        <div className="exam-print-sign">
          <div>
            <b>Bệnh nhân</b>
            <br />
            <i>(ký, ghi rõ họ tên)</i>
          </div>
          <div>
            <b>Bác sĩ khám bệnh</b>
            <br />
            <i>{doctorName || "…"}</i>
          </div>
        </div>

        <div className="exam-print-actions">
          <button
            type="button"
            className="exam-btn-outline"
            onClick={onClose}
          >
            Đóng
          </button>
          <button
            type="button"
            className="exam-btn-primary"
            onClick={() => window.print()}
          >
            In phiếu
          </button>
        </div>
      </div>
    </div>
  );
}
