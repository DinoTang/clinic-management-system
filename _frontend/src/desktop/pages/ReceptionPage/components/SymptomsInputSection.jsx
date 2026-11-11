import React from "react";

export default function SymptomsInputSection({
  selectedSpecialtyId,
  suggestedSymptoms,
  formData,
  setFormData,
  onToggleSymptom,
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "6px",
        }}
      >
        <label className="input-label" style={{ marginBottom: 0 }}>
          Triệu Chứng / Lý Do Đến Khám *
        </label>
        <span style={{ fontSize: "12px", color: "#0284c7", fontWeight: 500 }}>
          {selectedSpecialtyId
            ? "Gợi ý triệu chứng theo khoa:"
            : "Gợi ý triệu chứng phổ biến:"}
        </span>
      </div>

      {/* Quick symptom chips */}
      {suggestedSymptoms && suggestedSymptoms.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            marginBottom: "8px",
          }}
        >
          {suggestedSymptoms.map((symp, idx) => {
            const currentText = (formData.initialSymptoms || "").toLowerCase();
            const isSelected = currentText.includes(symp.toLowerCase());
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onToggleSymptom(symp)}
                style={{
                  padding: "4px 10px",
                  borderRadius: "16px",
                  fontSize: "12px",
                  border: isSelected ? "1px solid #0284c7" : "1px solid #cbd5e1",
                  backgroundColor: isSelected ? "#e0f2fe" : "#f8fafc",
                  color: isSelected ? "#0369a1" : "#475569",
                  cursor: "pointer",
                  fontWeight: isSelected ? "600" : "normal",
                  transition: "all 0.15s ease",
                }}
              >
                {isSelected ? "✓ " : "+ "}
                {symp}
              </button>
            );
          })}
        </div>
      )}

      <textarea
        className="form-control"
        rows="2"
        placeholder="Ghi nhận triệu chứng sơ bộ hoặc bấm chọn gợi ý ở trên..."
        value={formData.initialSymptoms}
        onChange={(e) =>
          setFormData({ ...formData, initialSymptoms: e.target.value })
        }
      ></textarea>
    </div>
  );
}
