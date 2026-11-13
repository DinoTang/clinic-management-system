import React from "react";
import "../../styles/booking.css";
import "../../styles/desktop-schedule.css";
import { usePatientBooking } from "./usePatientBooking.js";

// Sub-components
import BookingStepsNav from "./components/BookingStepsNav.jsx";
import Step1DoctorSelect from "./components/Step1DoctorSelect.jsx";
import Step2ScheduleSelect from "./components/Step2ScheduleSelect.jsx";
import Step3PatientInfo from "./components/Step3PatientInfo.jsx";
import Step4AppointmentTicket from "./components/Step4AppointmentTicket.jsx";

function PatientBookingPage({ patientProfile = null, isMobile = false }) {
  const {
    today,
    step,
    setStep,
    specialties,
    filteredDoctors,
    availableSchedules,
    bookingData,
    setBookingData,
    bookingSuccessResult,
    loading,
    exportingPdf,
    ticketRef,
    suggestedSymptoms,
    handleSpecialtyChange,
    handleDoctorChange,
    handleDateChange,
    handleToggleSymptom,
    fetchAvailableSchedules,
    handleConfirmBooking,
    handleDownloadPdf,
    handleResetBooking,
  } = usePatientBooking(patientProfile);

  return (
    <div
      className={`booking-wrapper${isMobile ? " mobile-booking-wrapper" : ""}`}
    >
      <div className="booking-card">
        {/* Header */}
        <div className="booking-header">
          <h1>ĐĂNG KÝ KHÁM BỆNH TRỰC TUYẾN</h1>
          <p>Hệ thống Đặt lịch & Tiếp nhận khám bệnh thông minh</p>
        </div>

        {/* Thanh tiến trình 4 bước */}
        <BookingStepsNav step={step} />

        {/* BƯỚC 1: CHỌN CHUYÊN KHOA VÀ BÁC SĨ */}
        {step === 1 && (
          <Step1DoctorSelect
            specialties={specialties}
            bookingData={bookingData}
            onSpecialtyChange={handleSpecialtyChange}
            filteredDoctors={filteredDoctors}
            onDoctorChange={handleDoctorChange}
            onNext={() => {
              fetchAvailableSchedules(
                bookingData.doctorId,
                bookingData.examinationDate,
              );
              setStep(2);
            }}
          />
        )}

        {/* BƯỚC 2: CHỌN NGÀY VÀ CA TRỰC */}
        {step === 2 && (
          <Step2ScheduleSelect
            today={today}
            bookingData={bookingData}
            setBookingData={setBookingData}
            onDateChange={handleDateChange}
            loading={loading}
            availableSchedules={availableSchedules}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}

        {/* BƯỚC 3: ĐIỀN THÔNG TIN BỆNH NHÂN */}
        {step === 3 && (
          <Step3PatientInfo
            bookingData={bookingData}
            setBookingData={setBookingData}
            suggestedSymptoms={suggestedSymptoms}
            onToggleSymptom={handleToggleSymptom}
            loading={loading}
            onBack={() => setStep(2)}
            onConfirm={handleConfirmBooking}
          />
        )}

        {/* BƯỚC 4: HOÀN TẤT & PHIẾU HẸN ĐIỆN TỬ */}
        {step === 4 && (
          <Step4AppointmentTicket
            bookingSuccessResult={bookingSuccessResult}
            bookingData={bookingData}
            ticketRef={ticketRef}
            onDownloadPdf={handleDownloadPdf}
            exportingPdf={exportingPdf}
            onResetBooking={handleResetBooking}
          />
        )}
      </div>
    </div>
  );
}

export default PatientBookingPage;
