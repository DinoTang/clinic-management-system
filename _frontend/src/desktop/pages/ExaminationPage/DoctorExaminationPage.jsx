import React from "react";
import { ICD10_CATALOG } from "../../constants/medicalConstants.js";
import "../../styles/desktop-schedule.css";
import "../../styles/examination.css";
import {
  getResultTemplatesForService,
  STATUS_META,
} from "./examinationConstants.js";
import { formatVnd } from "./examinationUtils.js";
import { useDoctorExamination } from "./useDoctorExamination.js";

// Sub-components chuẩn React
import ClinicalExamSection from "./components/ClinicalExamSection.jsx";
import ExamActionFooter from "./components/ExamActionFooter.jsx";
import ExaminationPrintModal from "./components/ExaminationPrintModal.jsx";
import IcdDiagnosisSection from "./components/IcdDiagnosisSection.jsx";
import PatientSummaryCard from "./components/PatientSummaryCard.jsx";
import PrescriptionSection from "./components/PrescriptionSection.jsx";
import QueueSidebar from "./components/QueueSidebar.jsx";
import ServiceAssignmentSection from "./components/ServiceAssignmentSection.jsx";
import ServiceResultModal from "./components/ServiceResultModal.jsx";
import TreatmentNotesSection from "./components/TreatmentNotesSection.jsx";

function DoctorExaminationPage() {
  const {
    // Session & Bác sĩ
    doctorId,
    setDoctorId,
    doctors,
    isDoctorUser,
    doctorName,
    examDate,
    setExamDate,
    today,
    isPastDate,
    doctorSpecialtyName,
    // Hàng đợi
    queue,
    loadingQueue,
    filteredQueue,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    statusCounts,
    selected,
    selectReception,
    changeStatus,
    deferPatient,
    callNextPatient,
    handleRefresh,
    handleCloseExamination,
    // Bệnh nhân & Tiền sử
    patient,
    patientLoading,
    age,
    history,
    // Sinh hiệu & Bệnh án
    vitals,
    setVitals,
    saveVitals,
    medicalRecordId,
    setMedicalRecordId,
    // Khám & Chẩn đoán ICD
    exam,
    setExam,
    primaryIcd,
    secondaryIcds,
    clinicalDiagnosisNote,
    isManualDiagnosis,
    setIsManualDiagnosis,
    showAllSpecialtyIcd,
    setShowAllSpecialtyIcd,
    availableIcdCatalog,
    handleSelectPrimaryIcd,
    handleToggleSecondaryIcd,
    handleClinicalNoteChange,
    // Đơn thuốc & Gợi ý ICD
    suggestedPrescription,
    handleApplyIcdPrescription,
    medLines,
    medicines,
    medicineSource,
    prescriptionTotal,
    handleMedicineChange,
    updateMedLine,
    handleRemoveMedLine,
    handleAddMedLine,
    // Chỉ định dịch vụ
    svcLines,
    services,
    serviceSource,
    serviceTotal,
    handleServiceChange,
    updateSvcLine,
    handleRemoveSvcLine,
    handleAddSvcLine,
    // Kết quả dịch vụ modal
    resultModalIndex,
    selectedTemplateResult,
    setSelectedTemplateResult,
    customResultText,
    setCustomResultText,
    openResultModal,
    closeResultModal,
    handleApplyResult,
    handleClearResult,
    // Trạng thái chung & Hành động
    notice,
    setNotice,
    busy,
    examEditable,
    saveDraft,
    handleResetExam,
    handleSaveMedicalRecordAction,
    completeExamination,
    showPrint,
    setShowPrint,
  } = useDoctorExamination();

  return (
    <div className="exam-container">
      {/* ===== HEADER ===== */}
      <div className="exam-header">
        <div>
          <h1>PHÒNG KHÁM ĐA KHOA</h1>
          <p>Trang khám bệnh của bác sĩ — hàng đợi, hồ sơ, kê đơn & chỉ định</p>
        </div>
        <div className="exam-header-tools">
          <div className="tool-field">
            <label htmlFor="exam-doctor">Bác sĩ khám</label>
            {isDoctorUser ? (
              <div
                id="exam-doctor"
                className="doctor-fixed-badge"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "7px 12px",
                  backgroundColor: "#eff6ff",
                  color: "#1d4ed8",
                  borderRadius: "6px",
                  fontWeight: 600,
                  fontSize: "13px",
                  border: "1px solid #bfdbfe",
                  minHeight: "36px",
                }}
                title={`Mã bác sĩ: ${doctorId || "Đang xác thực"}`}
              >
                <span style={{ fontWeight: 700, color: "#1e40af" }}>Bác sĩ:</span>
                <span>
                  {doctorName
                    ? `${doctorId ? doctorName + " (" + doctorId + ")" : doctorName}`
                    : doctorId
                      ? `Bác sĩ (${doctorId})`
                      : "Đang tải thông tin..."}
                </span>
              </div>
            ) : (
              <select
                id="exam-doctor"
                value={doctorId}
                onChange={(e) => {
                  setDoctorId(e.target.value);
                  handleCloseExamination();
                }}
              >
                <option value="">-- Chọn bác sĩ --</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.id} -{" "}
                    {doc.user?.fullName || doc.fullName || doc.name || "Bác sĩ"}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="tool-field">
            <label htmlFor="exam-date">Ngày khám</label>
            <input
              id="exam-date"
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
            />
          </div>
          <button
            className="exam-btn-call"
            style={{ padding: "9px 14px", fontSize: "13px" }}
            onClick={callNextPatient}
            disabled={!doctorId || isPastDate}
            title={isPastDate ? "Phiên khám đã qua ngày, không thể gọi bệnh nhân tiếp theo" : "Gọi bệnh nhân chờ tiếp theo"}
          >
            Gọi bệnh nhân tiếp theo
          </button>
          <button
            className="exam-btn-outline"
            onClick={handleRefresh}
            disabled={!doctorId || loadingQueue}
            title="Làm mới hàng đợi khám, danh mục thuốc & dịch vụ"
          >
            {loadingQueue ? "Đang tải..." : "Làm mới"}
          </button>
        </div>
      </div>

      {/* ===== CẢNH BÁO CA KHÁM ĐÃ QUA ===== */}
      {isPastDate && (
        <div
          style={{
            margin: "0 24px 16px 24px",
            padding: "12px 16px",
            backgroundColor: "#fff1f2",
            border: "1px solid #fecdd3",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#9f1239",
            fontSize: "13.5px",
          }}
        >
          <span style={{ fontSize: "18px" }}>⚠️</span>
          <span>
            <b>Phiên làm việc ngày {examDate} đã kết thúc.</b> Hệ thống đã tự động chuyển trạng thái các bệnh nhân chưa khám sang <b>&quot;Quá hạn&quot;</b> và khóa tính năng khám mới. Bạn đang ở chế độ <b>chỉ xem lại lịch sử</b>.
          </span>
        </div>
      )}

      {/* ===== THÔNG BÁO ===== */}
      {notice && (
        <div className={`exam-notice exam-notice-${notice.type}`}>
          <span>{notice.text}</span>
          <button type="button" onClick={() => setNotice(null)}>
            ✕
          </button>
        </div>
      )}

      {/* ===== NỘI DUNG 3 CỘT ===== */}
      <div className="exam-content">
        {/* ---------- CỘT 1: HÀNG ĐỢI ---------- */}
        <QueueSidebar
          filteredQueue={filteredQueue}
          queue={queue}
          selected={selected}
          loadingQueue={loadingQueue}
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          statusCounts={statusCounts}
          STATUS_META={STATUS_META}
          onSelectReception={selectReception}
          onChangeStatus={changeStatus}
          onDeferPatient={deferPatient}
          isPastDate={isPastDate}
        />

        {/* ---------- CỘT 2: HỒ SƠ + KHÁM LÂM SÀNG ---------- */}
        <section className="exam-panel">
          <h2
            className="exam-panel-title"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              Hồ sơ & khám lâm sàng
              {selected && <span className="title-count">{selected.id}</span>}
            </span>
            {selected && (
              <button
                type="button"
                className="exam-btn-outline"
                style={{
                  fontSize: "12px",
                  padding: "4px 10px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
                onClick={handleCloseExamination}
                title="Đóng / Hủy chọn hồ sơ khám hiện tại"
              >
                Đóng hồ sơ
              </button>
            )}
          </h2>

          {!selected ? (
            <div className="exam-placeholder">
              <span className="icon"></span>
              <h3>Chưa chọn bệnh nhân</h3>
              <p>
                Chọn một lượt khám trong hàng đợi bên trái (hoặc bấm &quot;Gọi
                BN tiếp theo&quot;) để bắt đầu thăm khám.
              </p>
            </div>
          ) : (
            <div className="exam-main-scroll">
              <PatientSummaryCard
                selected={selected}
                patient={patient}
                patientLoading={patientLoading}
                age={age}
                history={history}
                vitals={vitals}
                setVitals={setVitals}
                onSaveVitals={saveVitals}
                busy={busy}
                medicalRecordId={medicalRecordId}
                setMedicalRecordId={setMedicalRecordId}
                examEditable={examEditable}
                STATUS_META={STATUS_META}
                isPastDate={isPastDate}
                examDate={examDate}
              />

              <ClinicalExamSection
                exam={exam}
                setExam={setExam}
                selected={selected}
                examEditable={examEditable}
              />

              <IcdDiagnosisSection
                exam={exam}
                setExam={setExam}
                primaryIcd={primaryIcd}
                secondaryIcds={secondaryIcds}
                clinicalDiagnosisNote={clinicalDiagnosisNote}
                isManualDiagnosis={isManualDiagnosis}
                setIsManualDiagnosis={setIsManualDiagnosis}
                showAllSpecialtyIcd={showAllSpecialtyIcd}
                setShowAllSpecialtyIcd={setShowAllSpecialtyIcd}
                doctorSpecialtyName={doctorSpecialtyName}
                availableIcdCatalog={availableIcdCatalog}
                ICD10_CATALOG={ICD10_CATALOG}
                onSelectPrimaryIcd={handleSelectPrimaryIcd}
                onToggleSecondaryIcd={handleToggleSecondaryIcd}
                onClinicalNoteChange={handleClinicalNoteChange}
                examEditable={examEditable}
              />

              <TreatmentNotesSection
                exam={exam}
                setExam={setExam}
                examEditable={examEditable}
              />
            </div>
          )}
        </section>

        {/* ---------- CỘT 3: ĐƠN THUỐC & CHỈ ĐỊNH ---------- */}
        <section className="exam-panel exam-panel-right">
          <h2 className="exam-panel-title">Kê đơn & chỉ định</h2>

          {!selected ? (
            <div className="exam-placeholder">
              <span className="icon"></span>
              <h3>Chưa có bệnh nhân</h3>
              <p>
                Chọn lượt khám để kê đơn thuốc và chỉ định dịch vụ cho bệnh
                nhân.
              </p>
            </div>
          ) : (
            <>
              <div className="exam-right-scroll">
                <PrescriptionSection
                  suggestedPrescription={suggestedPrescription}
                  onApplyIcdPrescription={handleApplyIcdPrescription}
                  examEditable={examEditable}
                  medicineSource={medicineSource}
                  medLines={medLines}
                  medicines={medicines}
                  formatVnd={formatVnd}
                  onMedicineChange={handleMedicineChange}
                  onUpdateMedLine={updateMedLine}
                  onRemoveMedLine={handleRemoveMedLine}
                  onAddMedLine={handleAddMedLine}
                />

                <ServiceAssignmentSection
                  serviceSource={serviceSource}
                  svcLines={svcLines}
                  services={services}
                  formatVnd={formatVnd}
                  onServiceChange={handleServiceChange}
                  onUpdateSvcLine={updateSvcLine}
                  onRemoveSvcLine={handleRemoveSvcLine}
                  onAddSvcLine={handleAddSvcLine}
                  onOpenResultModal={openResultModal}
                  examEditable={examEditable}
                />
              </div>

              <ExamActionFooter
                prescriptionTotal={prescriptionTotal}
                serviceTotal={serviceTotal}
                formatVnd={formatVnd}
                onSaveDraft={() => saveDraft()}
                onResetExam={handleResetExam}
                onOpenPrint={() => setShowPrint(true)}
                onSaveMedicalRecord={handleSaveMedicalRecordAction}
                onCompleteExamination={completeExamination}
                onDeferPatient={deferPatient}
                selected={selected}
                examEditable={examEditable}
                busy={busy}
                isPastDate={isPastDate}
                examDate={examDate}
              />
            </>
          )}
        </section>
      </div>

      {/* ===== MODAL IN PHIẾU ===== */}
      <ExaminationPrintModal
        showPrint={showPrint}
        selected={selected}
        patient={patient}
        age={age}
        doctorName={doctorName}
        examDate={examDate}
        medicalRecordId={medicalRecordId}
        vitals={vitals}
        exam={exam}
        medLines={medLines}
        medicines={medicines}
        svcLines={svcLines}
        services={services}
        formatVnd={formatVnd}
        onClose={() => setShowPrint(false)}
      />

      {/* ===== MODAL TRẢ KẾT QUẢ DỊCH VỤ ===== */}
      <ServiceResultModal
        resultModalIndex={resultModalIndex}
        svcLines={svcLines}
        services={services}
        selectedTemplateResult={selectedTemplateResult}
        setSelectedTemplateResult={setSelectedTemplateResult}
        customResultText={customResultText}
        setCustomResultText={setCustomResultText}
        onClose={closeResultModal}
        onApplyResult={handleApplyResult}
        onClearResult={handleClearResult}
        getResultTemplatesForService={getResultTemplatesForService}
      />
    </div>
  );
}

export default DoctorExaminationPage;
