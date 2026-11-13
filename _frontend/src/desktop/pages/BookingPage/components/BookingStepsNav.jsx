import React from "react";

export default function BookingStepsNav({ step }) {
  return (
    <div className="steps-nav">
      <div
        className={`step-item ${step === 1 ? "active" : step > 1 ? "done" : ""}`}
      >
        <div className="step-number">{step > 1 ? "✓" : "1"}</div>
        <span className="step-label">Chọn Bác Sĩ</span>
      </div>
      <div
        className={`step-item ${step === 2 ? "active" : step > 2 ? "done" : ""}`}
      >
        <div className="step-number">{step > 2 ? "✓" : "2"}</div>
        <span className="step-label">Chọn Ca Trực</span>
      </div>
      <div
        className={`step-item ${step === 3 ? "active" : step > 3 ? "done" : ""}`}
      >
        <div className="step-number">{step > 3 ? "✓" : "3"}</div>
        <span className="step-label">Thông Tin BN</span>
      </div>
      <div className={`step-item ${step === 4 ? "active done" : ""}`}>
        <div className="step-number">4</div>
        <span className="step-label">Phiếu Hẹn</span>
      </div>
    </div>
  );
}
