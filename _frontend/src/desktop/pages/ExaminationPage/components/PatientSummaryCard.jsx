import React from "react";

export default function PatientSummaryCard({
  selected,
  patient,
  patientLoading,
  age,
  history,
  vitals,
  setVitals,
  onSaveVitals,
  busy,
  medicalRecordId,
  setMedicalRecordId,
  examEditable,
  STATUS_META,
}) {
  return (
    <>
      {/* Thông tin bệnh nhân */}
      <div className="exam-patient-card">
        <div className="exam-patient-head">
          <div>
            <p className="exam-patient-name">
              {patientLoading
                ? "Đang tải..."
                : patient?.fullName || `Bệnh nhân ${selected.patientId}`}
            </p>
            <p className="exam-patient-sub">
              {selected.patientId}
              {patient?.gender ? ` · ${patient.gender}` : ""}
              {age !== null ? ` · ${age} tuổi` : ""}
              {patient?.dateOfBirth ? ` · sinh ${patient.dateOfBirth}` : ""}
            </p>
          </div>
          <div className="exam-patient-tags">
            <span className="exam-tag">Phòng {selected.roomId}</span>
            <span className="exam-tag exam-tag-amber">
              STT {selected.queueNumber}
            </span>
            {(STATUS_META[selected.queueStatus]?.label ||
              selected.queueStatus) && (
              <span className="exam-tag exam-tag-green">
                {STATUS_META[selected.queueStatus]?.label ||
                  selected.queueStatus}
              </span>
            )}
          </div>
        </div>

        <div className="exam-patient-grid">
          <div>
            <b>SĐT:</b> {patient?.phoneNumber || "—"}
          </div>
          <div>
            <b>Địa chỉ:</b> {patient?.address || "—"}
          </div>
          <div>
            <b>Nhóm máu:</b> {patient?.bloodGroup || "—"}
          </div>
          <div>
            <b>BHYT:</b> {patient?.healthInsuranceNumber || "Không"}
          </div>
        </div>

        <div style={{ marginTop: "10px", fontSize: "12.5px" }}>
          <b style={{ color: "#0d47a1" }}>Triệu chứng tiếp nhận:</b>{" "}
          <span style={{ color: "#475569" }}>
            {selected.initialSymptoms || "Không ghi nhận"}
          </span>
        </div>

        {patient?.medicalHistory && (
          <div style={{ marginTop: "8px", fontSize: "12.5px" }}>
            <b style={{ color: "#0d47a1" }}>Tiền sử bệnh:</b>{" "}
            <span style={{ color: "#475569" }}>
              {patient.medicalHistory}
            </span>
          </div>
        )}

        {history.length > 0 && (
          <div className="exam-history-box">
            <div className="exam-history-title">
              Lần khám trước ({history.length})
            </div>
            {history.map((h) => (
              <div className="exam-history-row" key={h.id}>
                <span>
                  {h.receptionDate} · {h.roomId} · {h.initialSymptoms || "—"}
                </span>
                <span
                  className={`status-badge ${STATUS_META[h.queueStatus]?.cls || "status-chokham"}`}
                >
                  {STATUS_META[h.queueStatus]?.label || h.queueStatus}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sinh hiệu */}
      <div className="exam-sub-title">
        Chỉ số sinh hiệu
        <button
          type="button"
          className="exam-btn-call"
          onClick={onSaveVitals}
          disabled={busy || !examEditable}
        >
          Lưu sinh hiệu
        </button>
      </div>
      <div className="exam-vitals">
        <div className="exam-vital">
          <label htmlFor="v-pulse">Mạch (lần/phút)</label>
          <input
            id="v-pulse"
            type="number"
            placeholder="80"
            value={vitals.pulse}
            disabled={!examEditable}
            onChange={(e) =>
              setVitals({ ...vitals, pulse: e.target.value })
            }
          />
        </div>
        <div className="exam-vital">
          <label htmlFor="v-temp">Nhiệt độ (°C)</label>
          <input
            id="v-temp"
            type="number"
            step="0.1"
            placeholder="37.0"
            value={vitals.temperature}
            disabled={!examEditable}
            onChange={(e) =>
              setVitals({ ...vitals, temperature: e.target.value })
            }
          />
        </div>
        <div className="exam-vital">
          <label htmlFor="v-bp">Huyết áp (mmHg)</label>
          <input
            id="v-bp"
            type="text"
            placeholder="120/80"
            value={vitals.bloodPressure}
            disabled={!examEditable}
            onChange={(e) =>
              setVitals({ ...vitals, bloodPressure: e.target.value })
            }
          />
        </div>
        <div className="exam-vital">
          <label htmlFor="v-weight">Cân nặng (kg)</label>
          <input
            id="v-weight"
            type="number"
            step="0.1"
            placeholder="65"
            value={vitals.weight}
            disabled={!examEditable}
            onChange={(e) =>
              setVitals({ ...vitals, weight: e.target.value })
            }
          />
        </div>
        <div className="exam-vital">
          <label htmlFor="v-height">Chiều cao (cm)</label>
          <input
            id="v-height"
            type="number"
            step="0.1"
            placeholder="170"
            value={vitals.height}
            disabled={!examEditable}
            onChange={(e) =>
              setVitals({ ...vitals, height: e.target.value })
            }
          />
        </div>
      </div>

      {/* Mã bệnh án */}
      <div className="exam-form-section">
        <label htmlFor="mr-id">
          Mã bệnh án (BENHAN) — tự tạo khi lưu hồ sơ, hoặc nhập nếu đã có
        </label>
        <input
          id="mr-id"
          className="form-control"
          type="text"
          placeholder="Ví dụ: BA001"
          value={medicalRecordId}
          disabled={!examEditable}
          onChange={(e) => setMedicalRecordId(e.target.value)}
        />
      </div>
    </>
  );
}
