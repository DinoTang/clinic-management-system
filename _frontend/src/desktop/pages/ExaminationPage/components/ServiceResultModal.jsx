import React from "react";

export default function ServiceResultModal({
  resultModalIndex,
  svcLines,
  services,
  selectedTemplateResult,
  setSelectedTemplateResult,
  customResultText,
  setCustomResultText,
  onClose,
  onApplyResult,
  onClearResult,
  getResultTemplatesForService,
}) {
  if (resultModalIndex === null) return null;

  const currentServiceLine = svcLines[resultModalIndex];
  const serviceObj = services.find(
    (s) => s.id === currentServiceLine?.serviceId,
  );
  const serviceName = serviceObj?.name || currentServiceLine?.serviceId;

  return (
    <div
      className="exam-result-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="exam-result-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        {/* Modal Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: "10px",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "16px", color: "#1e3a8a" }}>
            Trả kết quả dịch vụ cận lâm sàng
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
              color: "#64748b",
            }}
          >
            ✕
          </button>
        </div>

        {/* Dịch vụ đang chọn */}
        <div
          style={{
            fontSize: "13px",
            backgroundColor: "#f8fafc",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #e2e8f0",
          }}
        >
          <b>Dịch vụ:</b>{" "}
          <span style={{ color: "#0f766e", fontWeight: 600 }}>
            {serviceName}
          </span>
        </div>

        {/* Dropdown chọn kết quả mẫu */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "12.5px",
              fontWeight: 600,
              color: "#334155",
              marginBottom: "5px",
            }}
          >
            Chọn kết quả định sẵn:
          </label>
          <select
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              fontSize: "13px",
              backgroundColor: "#ffffff",
              outline: "none",
            }}
            value={selectedTemplateResult}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedTemplateResult(val);
              if (val) {
                setCustomResultText(val);
              }
            }}
          >
            <option value="">-- Bấm để chọn mẫu kết quả --</option>
            {getResultTemplatesForService(
              currentServiceLine?.serviceId,
              serviceName,
            ).map((tpl, idx) => (
              <option key={`tpl-${idx}`} value={tpl}>
                {tpl}
              </option>
            ))}
          </select>
        </div>

        {/* Ô nhập/sửa nội dung kết quả */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "12.5px",
              fontWeight: 600,
              color: "#334155",
              marginBottom: "5px",
            }}
          >
            Chi tiết kết quả (có thể chỉnh sửa theo thực tế):
          </label>
          <textarea
            rows={3}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "8px 10px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              fontSize: "13px",
              fontFamily: "inherit",
              resize: "vertical",
              outline: "none",
            }}
            placeholder="Chọn mẫu ở trên hoặc gõ kết quả xét nghiệm / chẩn đoán hình ảnh..."
            value={customResultText}
            onChange={(e) => setCustomResultText(e.target.value)}
          />
        </div>

        {/* Modal Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "4px",
            paddingTop: "10px",
            borderTop: "1px solid #f1f5f9",
          }}
        >
          {currentServiceLine?.result ? (
            <button
              type="button"
              onClick={onClearResult}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid #fecaca",
                backgroundColor: "#fef2f2",
                color: "#dc2626",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Xóa kết quả
            </button>
          ) : (
            <div />
          )}

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "6px 14px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#ffffff",
                color: "#475569",
                fontSize: "12.5px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={onApplyResult}
              style={{
                padding: "6px 16px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#16a34a",
                color: "#ffffff",
                fontSize: "12.5px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Lưu kết quả
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
