import React from "react";

export default function ExamActionFooter({
  prescriptionTotal,
  serviceTotal,
  formatVnd,
  onSaveDraft,
  onResetExam,
  onOpenPrint,
  onSaveMedicalRecord,
  onCompleteExamination,
  onDeferPatient,
  selected,
  examEditable,
  busy,
  isPastDate,
  examDate,
}) {
  return (
    <>
      {/* Tổng cộng */}
      <div className="exam-totals">
        <div className="row">
          <span>Tiền thuốc</span>
          <b>{formatVnd(prescriptionTotal)}</b>
        </div>
        <div className="row">
          <span>Tiền dịch vụ</span>
          <b>{formatVnd(serviceTotal)}</b>
        </div>
        <div className="row grand">
          <span>Tổng tạm tính</span>
          <span>{formatVnd(prescriptionTotal + serviceTotal)}</span>
        </div>
      </div>

      {/* Hành động */}
      <div className="exam-actions">
        <div className="exam-actions-row">
          <button
            type="button"
            className="exam-btn-outline"
            onClick={onSaveDraft}
            disabled={!examEditable}
          >
            Lưu nháp
          </button>
          <button
            type="button"
            className="exam-btn-outline"
            onClick={onResetExam}
            disabled={!examEditable}
            title="Làm mới lại phiếu khám theo dữ liệu ban đầu"
          >
            Làm mới phiếu
          </button>
          <button
            type="button"
            className="exam-btn-outline"
            onClick={onOpenPrint}
          >
            In phiếu
          </button>
        </div>
        <button
          type="button"
          className="exam-btn-primary"
          onClick={onSaveMedicalRecord}
          disabled={!examEditable || busy}
        >
          Lưu hồ sơ khám
        </button>
        {selected?.queueStatus === "DangKham" && !isPastDate && (
          <button
            type="button"
            className="exam-btn-defer"
            style={{ padding: "8px 14px", fontSize: "13px" }}
            onClick={() => onDeferPatient(selected)}
            disabled={busy}
            title="Bệnh nhân không có mặt tại phòng - Trả về chờ, giữ nguyên STT"
          >
            Vắng mặt
          </button>
        )}
        <button
          type="button"
          className="exam-btn-success"
          onClick={onCompleteExamination}
          disabled={!examEditable || busy}
        >
          {busy ? "Đang xử lý..." : "Hoàn tất khám & in phiếu"}
        </button>
        {(isPastDate || selected?.queueStatus === "QuaHan") && (
          <p className="exam-hint" style={{ color: "#dc2626", fontWeight: 600 }}>
            Ca khám ngày {selected?.receptionDate || examDate} đã kết thúc. Lượt khám này đã quá hạn và chỉ có thể xem lại.
          </p>
        )}
        {selected?.queueStatus === "ChoKham" && !isPastDate && (
          <p className="exam-hint">
            Lượt này chưa được gọi khám — bấm &quot;Gọi khám&quot; trước khi
            hoàn tất (BR-039).
          </p>
        )}
      </div>
    </>
  );
}
