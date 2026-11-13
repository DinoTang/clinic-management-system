import React from "react";

export default function ClinicalExamSection({
  exam,
  setExam,
  selected,
  examEditable,
}) {
  return (
    <div className="exam-form-grid">
      <div className="exam-form-section">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="ex-symptoms" style={{ margin: 0 }}>
            Triệu chứng <span className="exam-required">*</span>
          </label>
          {selected?.initialSymptoms && !exam.symptoms && (
            <button
              type="button"
              onClick={() =>
                setExam({ ...exam, symptoms: selected.initialSymptoms })
              }
              disabled={!examEditable}
              style={{
                fontSize: "11px",
                color: "#0284c7",
                background: "#f0f9ff",
                border: "1px solid #bae6fd",
                borderRadius: "4px",
                padding: "2px 6px",
                cursor: "pointer",
              }}
            >
              Lấy từ tiếp nhận
            </button>
          )}
        </div>
        <textarea
          id="ex-symptoms"
          rows="3"
          placeholder="Chief complaint, diễn biến, thời gian..."
          value={exam.symptoms}
          disabled={!examEditable}
          onChange={(e) => setExam({ ...exam, symptoms: e.target.value })}
        />
      </div>

      <div className="exam-form-section">
        <label htmlFor="ex-general">Khám toàn trạng</label>
        <textarea
          id="ex-general"
          rows="3"
          placeholder="Tỉnh táo, da niêm mạc, tim phổi..."
          value={exam.generalExam}
          disabled={!examEditable}
          onChange={(e) => setExam({ ...exam, generalExam: e.target.value })}
        />
      </div>

      <div className="exam-form-section">
        <label htmlFor="ex-local">Khám tại chỗ</label>
        <textarea
          id="ex-local"
          rows="3"
          placeholder="Phần tử thuộc chuyên khoa..."
          value={exam.localExam}
          disabled={!examEditable}
          onChange={(e) => setExam({ ...exam, localExam: e.target.value })}
        />
      </div>

      <div className="exam-form-section">
        <label htmlFor="ex-prognosis">Tiên lượng</label>
        <textarea
          id="ex-prognosis"
          rows="3"
          placeholder="Dự tiến triển, tái khám..."
          value={exam.prognosis}
          disabled={!examEditable}
          onChange={(e) => setExam({ ...exam, prognosis: e.target.value })}
        />
      </div>
    </div>
  );
}
