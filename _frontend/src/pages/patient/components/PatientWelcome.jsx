function PatientWelcome() {
  return (
    <div className="flex w-full items-start justify-between gap-[1rem]">
      <div>
        <p className="!mb-[0.5rem] text-[0.75rem] font-semibold uppercase tracking-[0.08rem] text-[#667085]">
          QUẢN TRỊ HỆ THỐNG / DANH SÁCH BỆNH NHÂN
        </p>

        <h1 className="text-[1.875rem] font-bold leading-[2.25rem] text-[#153d82]">
          Danh sách bệnh nhân
        </h1>

        <p className="!mt-[0.5rem] text-[0.875rem] leading-[1.5rem] text-[#667085]">
          Tra cứu thông tin hành chính và lịch sử lượt khám.
        </p>
      </div>
    </div>
  );
}

export default PatientWelcome;