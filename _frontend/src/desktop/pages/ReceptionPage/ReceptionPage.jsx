import React from "react";
import QrCheckInScanner from "./QrCheckInScanner.jsx";
import { useReception } from "./useReception.js";
import "../../styles/reception.css";
import "../../styles/desktop-schedule.css";

// Sub-components chuẩn React
import AppointmentLookupBox from "./components/AppointmentLookupBox.jsx";
import ReceptionHeader from "./components/ReceptionHeader.jsx";
import ReceptionSlipModal from "./components/ReceptionSlipModal.jsx";
import SpecialtyDoctorRoomSelect from "./components/SpecialtyDoctorRoomSelect.jsx";
import SymptomsInputSection from "./components/SymptomsInputSection.jsx";
import TodayQueueTable from "./components/TodayQueueTable.jsx";
import VitalSignsSection from "./components/VitalSignsSection.jsx";
import WalkInPatientFields from "./components/WalkInPatientFields.jsx";

function ReceptionPage() {
  const {
    today,
    loggedInStaffId,
    loggedInStaffName,
    specialties,
    selectedSpecialtyId,
    rooms,
    doctors,
    queueList,
    lookupAppointmentId,
    setLookupAppointmentId,
    lookupLoading,
    filterRoomId,
    setFilterRoomId,
    scanOpen,
    setScanOpen,
    scanNotice,
    setScanNotice,
    formData,
    setFormData,
    createdSlip,
    setCreatedSlip,
    isDoctorOnDuty,
    handleSpecialtyChange,
    handleDoctorChange,
    suggestedSymptoms,
    handleToggleSymptom,
    handleCheckInScan,
    handleLookupAppointment,
    handleTypeChange,
    handleResetForm,
    handleSubmitReception,
  } = useReception();

  return (
    <div className="reception-container">
      {/* CỘT TRÁI: FORM TIẾP NHẬN */}
      <div className="reception-left">
        <ReceptionHeader
          loggedInStaffId={loggedInStaffId}
          loggedInStaffName={loggedInStaffName}
          onResetForm={handleResetForm}
        />

        {/* Khung tra cứu mã hẹn LHxxx */}
        <AppointmentLookupBox
          lookupAppointmentId={lookupAppointmentId}
          setLookupAppointmentId={setLookupAppointmentId}
          lookupLoading={lookupLoading}
          onLookupAppointment={handleLookupAppointment}
          onOpenScan={() => setScanOpen(true)}
          scanNotice={scanNotice}
          setScanNotice={setScanNotice}
        />

        <form onSubmit={handleSubmitReception}>
          {/* DÒNG 1: MÃ BỆNH NHÂN & LOẠI TIẾP ĐÓN */}
          <div className="form-row">
            <div>
              <label className="input-label">Mã Bệnh Nhân *</label>
              <input
                type="text"
                className="form-control"
                value={formData.patientId}
                placeholder={
                  formData.receptionType === "HenTruoc"
                    ? "Mã BN theo phiếu hẹn"
                    : formData.receptionType === "TrucTiep"
                      ? "Đang cấp mã tự tăng..."
                      : "Vui lòng chọn hình thức tiếp đón hoặc tra mã hẹn"
                }
                readOnly
                style={{
                  backgroundColor: "#f1f5f9",
                  cursor: "not-allowed",
                  fontWeight: "bold",
                  color: formData.patientId ? "#1e3a8a" : "#94a3b8",
                }}
              />
            </div>

            <div>
              <label className="input-label">Hình thức tiếp đón *</label>
              <select
                className="form-control"
                value={formData.receptionType}
                onChange={(e) => handleTypeChange(e.target.value)}
                required
              >
                <option value="" disabled>
                  -- Chọn hình thức --
                </option>
                <option value="TrucTiep">Trực Tiếp</option>
                <option
                  value="HenTruoc"
                  disabled={formData.receptionType !== "HenTruoc"}
                >
                  Hẹn Trước (Website - Tự động nhận diện)
                </option>
              </select>
            </div>
          </div>

          {/* DÒNG THÔNG TIN BỆNH NHÂN VÃNG LAI (HIỆN KHI CHỌN TRỰC TIẾP) */}
          <WalkInPatientFields formData={formData} setFormData={setFormData} />

          {/* DÒNG: CHỌN CHUYÊN KHOA, BÁC SĨ & PHÒNG KHÁM */}
          <SpecialtyDoctorRoomSelect
            specialties={specialties}
            selectedSpecialtyId={selectedSpecialtyId}
            onSpecialtyChange={handleSpecialtyChange}
            doctors={doctors}
            rooms={rooms}
            formData={formData}
            setFormData={setFormData}
            onDoctorChange={handleDoctorChange}
            isDoctorOnDuty={isDoctorOnDuty}
            today={today}
          />

          {/* TRIỆU CHỨNG */}
          <SymptomsInputSection
            selectedSpecialtyId={selectedSpecialtyId}
            suggestedSymptoms={suggestedSymptoms}
            formData={formData}
            setFormData={setFormData}
            onToggleSymptom={handleToggleSymptom}
          />

          {/* Vitals Grid */}
          <VitalSignsSection formData={formData} setFormData={setFormData} />

          <div style={{ marginTop: "20px" }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", padding: "12px" }}
            >
              Tiếp Nhận & Cấp Số Thứ Tự
            </button>
          </div>
        </form>
      </div>

      {/* CỘT PHẢI: HÀNG ĐỢI HÔM NAY */}
      <TodayQueueTable
        queueList={queueList}
        rooms={rooms}
        filterRoomId={filterRoomId}
        setFilterRoomId={setFilterRoomId}
      />

      {/* MODAL IN PHIẾU KHÁM */}
      <ReceptionSlipModal
        createdSlip={createdSlip}
        onClose={() => setCreatedSlip(null)}
      />

      {/* MODAL QUÉT QR BẰNG WEBCAM */}
      {scanOpen && (
        <QrCheckInScanner
          onClose={() => setScanOpen(false)}
          onDecoded={(decodedText) => {
            setScanOpen(false);
            handleCheckInScan(decodedText, "QR");
          }}
        />
      )}
    </div>
  );
}

export default ReceptionPage;
