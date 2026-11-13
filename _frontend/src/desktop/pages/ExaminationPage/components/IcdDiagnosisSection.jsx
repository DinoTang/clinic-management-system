import React from "react";

export default function IcdDiagnosisSection({
  exam,
  setExam,
  primaryIcd,
  secondaryIcds,
  clinicalDiagnosisNote,
  isManualDiagnosis,
  setIsManualDiagnosis,
  showAllSpecialtyIcd,
  setShowAllSpecialtyIcd,
  doctorSpecialtyName,
  availableIcdCatalog,
  ICD10_CATALOG,
  onSelectPrimaryIcd,
  onToggleSecondaryIcd,
  onClinicalNoteChange,
  examEditable,
}) {
  return (
    <div
      className="exam-form-section exam-icd-diagnosis-section"
      style={{ marginTop: "12px" }}
    >
      <div className="exam-icd-header">
        <div className="exam-icd-title-group">
          <label
            htmlFor="ex-diagnosis"
            style={{
              margin: 0,
              fontWeight: 700,
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            Chẩn đoán (Chuẩn ICD-10) <span className="exam-required">*</span>
          </label>
          {doctorSpecialtyName && (
            <span className="exam-icd-dept-badge">
              Khoa: {doctorSpecialtyName}
            </span>
          )}
        </div>

        <div className="exam-icd-actions-group">
          <label className="exam-icd-filter-toggle">
            <input
              type="checkbox"
              checked={showAllSpecialtyIcd}
              onChange={(e) => setShowAllSpecialtyIcd(e.target.checked)}
            />
            <span>Hiện tất cả chuyên khoa</span>
          </label>
          <button
            type="button"
            className="exam-icd-mode-btn"
            onClick={() => setIsManualDiagnosis(!isManualDiagnosis)}
          >
            {isManualDiagnosis ? "Dùng chọn ICD-10" : "Sửa văn bản trực tiếp"}
          </button>
        </div>
      </div>

      {!isManualDiagnosis ? (
        <div className="exam-icd-controls">
          {/* Dòng 1: Chọn mã ICD-10 bệnh chính */}
          <div>
            <label className="exam-field-sublabel">
              Mã bệnh chính (ICD-10 chính){" "}
              <span className="exam-required">*</span>:
            </label>
            <select
              id="ex-primary-icd"
              className="form-control exam-icd-select"
              value={primaryIcd}
              disabled={!examEditable}
              onChange={(e) => onSelectPrimaryIcd(e.target.value)}
            >
              <option value="">
                {doctorSpecialtyName && !showAllSpecialtyIcd
                  ? `-- Chọn mã ICD-10 (${doctorSpecialtyName}) --`
                  : "-- Chọn mã bệnh chính ICD-10 --"}
              </option>
              {availableIcdCatalog.map((it) => (
                <option key={it.code} value={it.code}>
                  [{it.code}] {it.name}
                </option>
              ))}
            </select>
          </div>

          {/* Dòng 2: Hai cột cân xứng - Bệnh kèm theo & Diễn giải lâm sàng */}
          <div className="exam-icd-two-cols">
            {/* Cột trái: Bệnh kèm theo */}
            <div className="exam-icd-col">
              <label className="exam-field-sublabel">
                Bệnh kèm theo (ICD-10 phụ):
              </label>
              <select
                className="form-control exam-icd-select-secondary"
                value=""
                disabled={!examEditable}
                onChange={(e) => {
                  if (e.target.value) onToggleSecondaryIcd(e.target.value);
                }}
              >
                <option value="">+ Thêm mã bệnh kèm theo...</option>
                {(showAllSpecialtyIcd ? ICD10_CATALOG : availableIcdCatalog)
                  .filter(
                    (it) =>
                      it.code !== primaryIcd &&
                      !secondaryIcds.includes(it.code),
                  )
                  .map((it) => (
                    <option key={it.code} value={it.code}>
                      [{it.code}] {it.name}
                    </option>
                  ))}
              </select>

              {/* Chips mã kèm theo đã chọn */}
              {secondaryIcds.length > 0 && (
                <div className="exam-icd-chips-wrap">
                  {secondaryIcds.map((code) => {
                    const it = ICD10_CATALOG.find((c) => c.code === code);
                    return (
                      <span key={code} className="exam-icd-chip">
                        <strong>[{code}]</strong> {it ? it.name : code}
                        <button
                          type="button"
                          onClick={() => onToggleSecondaryIcd(code)}
                          disabled={!examEditable}
                          title="Xóa bệnh kèm theo"
                        >
                          ✕
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Cột phải: Diễn giải chi tiết lâm sàng */}
            <div className="exam-icd-col">
              <label className="exam-field-sublabel">
                Diễn giải / Chi tiết lâm sàng:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="VD: Cấp tính, khởi phát ngày thứ 3..."
                value={clinicalDiagnosisNote}
                disabled={!examEditable}
                onChange={(e) => onClinicalNoteChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <textarea
            id="ex-diagnosis"
            rows="3"
            placeholder="Nhập chẩn đoán tự do..."
            value={exam.diagnosis}
            disabled={!examEditable}
            onChange={(e) =>
              setExam({ ...exam, diagnosis: e.target.value })
            }
          />
          <small style={{ color: "#64748b", fontSize: "11px" }}>
            Đang ở chế độ nhập tự do. Nội dung này sẽ được lưu trực tiếp vào hồ sơ bệnh án.
          </small>
        </div>
      )}
    </div>
  );
}
