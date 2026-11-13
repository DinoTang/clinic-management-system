import React from "react";

export default function ServiceAssignmentSection({
  serviceSource,
  svcLines,
  services,
  formatVnd,
  onServiceChange,
  onUpdateSvcLine,
  onRemoveSvcLine,
  onAddSvcLine,
  onOpenResultModal,
  examEditable,
}) {
  return (
    <>
      <div className="exam-sub-title">
        Chỉ định dịch vụ
        {serviceSource !== "api" && (
          <span className="exam-source-badge">
            Danh mục mẫu (thiếu API dịch vụ)
          </span>
        )}
      </div>

      <table className="exam-lines">
        <thead>
          <tr>
            <th style={{ width: "58%" }}>Dịch vụ</th>
            <th style={{ width: "20%" }}>SL</th>
            <th style={{ width: "22%" }}></th>
          </tr>
        </thead>
        <tbody>
          {svcLines.map((line, index) => (
            <tr key={`svc-${index}`}>
              <td>
                <select
                  value={line.serviceId}
                  disabled={!examEditable}
                  onChange={(e) =>
                    handleServiceChange(index, e.target.value)
                  }
                >
                  <option value="">-- Chọn dịch vụ --</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({formatVnd(s.price)})
                    </option>
                  ))}
                </select>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#475569",
                    marginTop: "4px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "4px",
                  }}
                >
                  <span>
                    Đơn giá: {formatVnd(line.unitPrice)} · Thành tiền:{" "}
                    <b style={{ color: "#0d47a1" }}>
                      {formatVnd(
                        (Number(line.quantity) || 0) *
                          (Number(line.unitPrice) || 0),
                      )}
                    </b>
                  </span>

                  {line.serviceId && (
                    <button
                      type="button"
                      className={`exam-btn-result ${line.result ? "completed" : "pending"}`}
                      onClick={() => onOpenResultModal(index)}
                      disabled={!examEditable}
                      title="Nhập hoặc chọn mẫu kết quả cho dịch vụ này"
                    >
                      {line.result ? "Sửa kết quả" : "Trả kết quả"}
                    </button>
                  )}
                </div>

                {line.result && (
                  <div className="exam-result-badge">
                    <span style={{ wordBreak: "break-word" }}>
                      <b>KQ:</b> {line.result}
                    </span>
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#15803d",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Đã có KQ
                    </span>
                  </div>
                )}
              </td>
              <td>
                <input
                  className="cell-qty"
                  type="number"
                  min="1"
                  value={line.quantity}
                  disabled={!examEditable}
                  onChange={(e) =>
                    onUpdateSvcLine(index, { quantity: e.target.value })
                  }
                />
              </td>
              <td style={{ textAlign: "center" }}>
                <button
                  type="button"
                  className="exam-line-remove"
                  disabled={!examEditable}
                  onClick={() => onRemoveSvcLine(index)}
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        className="exam-add-line"
        disabled={!examEditable}
        onClick={onAddSvcLine}
      >
        + Thêm chỉ định
      </button>
    </>
  );
}
