import React from "react";

export default function PrescriptionSection({
  suggestedPrescription,
  onApplyIcdPrescription,
  examEditable,
  medicineSource,
  medLines,
  medicines,
  formatVnd,
  onMedicineChange,
  onUpdateMedLine,
  onRemoveMedLine,
  onAddMedLine,
}) {
  return (
    <>
      {/* Gợi ý phác đồ thuốc theo chuẩn ICD-10 */}
      {suggestedPrescription && (
        <div className="exam-icd-presc-box">
          <div className="exam-icd-presc-header">
            <div className="exam-icd-presc-title">
              <span className="exam-icd-code-badge">
                {suggestedPrescription.icdCode}
              </span>
              <span>
                Gợi ý phác đồ: <strong>{suggestedPrescription.name}</strong>
              </span>
            </div>
            <button
              type="button"
              className="exam-icd-apply-btn"
              onClick={onApplyIcdPrescription}
              disabled={!examEditable}
              title="Tự động điền danh mục thuốc và liều lượng gợi ý theo mã ICD-10"
            >
              Áp dụng phác đồ gợi ý
            </button>
          </div>
          <div className="exam-icd-presc-items">
            {suggestedPrescription.items.map((it, idx) => (
              <div key={idx} className="exam-icd-presc-item">
                <span className="exam-icd-presc-name">
                  • <strong>{it.medicineName}</strong>
                </span>
                <span className="exam-icd-presc-qty">SL: {it.quantity}</span>
                <span className="exam-icd-presc-dosage">({it.dosage})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Đơn thuốc */}
      <div className="exam-sub-title">
        Đơn thuốc
        {medicineSource !== "api" && (
          <span className="exam-source-badge">
            Danh mục mẫu (thiếu API thuốc)
          </span>
        )}
      </div>

      <table className="exam-lines">
        <thead>
          <tr>
            <th style={{ width: "38%" }}>Thuốc</th>
            <th style={{ width: "15%" }}>SL</th>
            <th style={{ width: "27%" }}>Liều dùng</th>
            <th style={{ width: "14%" }}></th>
          </tr>
        </thead>
        <tbody>
          {medLines.map((line, index) => {
            const med = medicines.find((m) => m.id === line.medicineId);
            return (
              <tr key={`med-${index}`}>
                <td>
                  <select
                    value={line.medicineId}
                    disabled={!examEditable}
                    onChange={(e) =>
                      onMedicineChange(index, e.target.value)
                    }
                  >
                    <option value="">-- Chọn thuốc --</option>
                    {medicines.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({formatVnd(m.price)})
                      </option>
                    ))}
                  </select>
                  {med && (
                    <div
                      style={{
                        fontSize: "10.5px",
                        color: "#94a3b8",
                        marginTop: "3px",
                      }}
                    >
                      Tồn kho: {med.stock ?? "?"} {med.unit} ·{" "}
                      {formatVnd(line.unitPrice)}/
                      {med.unit.toLowerCase()}
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
                      onUpdateMedLine(index, {
                        quantity: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="1 viên x 2 lần/ngày"
                    value={line.dosage}
                    disabled={!examEditable}
                    onChange={(e) =>
                      onUpdateMedLine(index, { dosage: e.target.value })
                    }
                  />
                  <div className="cell-total" style={{ marginTop: 3 }}>
                    {formatVnd(
                      (Number(line.quantity) || 0) *
                        (Number(line.unitPrice) || 0),
                    )}
                  </div>
                </td>
                <td style={{ textAlign: "center" }}>
                  <button
                    type="button"
                    className="exam-line-remove"
                    disabled={!examEditable}
                    onClick={() => onRemoveMedLine(index)}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button
        type="button"
        className="exam-add-line"
        disabled={!examEditable}
        onClick={onAddMedLine}
      >
        + Thêm dòng thuốc
      </button>
    </>
  );
}
