import { useState } from "react";

function DataWelcome({ }) {

  return (
    <>
      <div className="flex items-center justify-between gap-[1rem] max-sm:flex-col max-sm:items-start">
        <div>
          <p className="text-[0.7rem] uppercase font-bold tracking-[0.03rem] text-[#8a96a8]">
            QUẢN TRỊ HỆ THỐNG / THEO DÕI LỊCH HẸN
          </p>

          <h1 className="!mt-[0.25rem] text-[1.6rem] font-bold text-[#344054]">
            Theo dõi lịch hẹn
          </h1>

          <p className="!mt-[0.25rem] text-[0.875rem] text-[#8490a0]">
            Theo dõi nguồn đặt, bác sĩ phụ trách và tiến độ lượt khám.
          </p>
        </div>

      </div>

    </>
  );
}

export default DataWelcome;
