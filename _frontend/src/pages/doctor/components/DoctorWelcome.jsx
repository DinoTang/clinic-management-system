import { Plus } from "@boxicons/react";
import { useState } from "react";
import CreateModal from "./CreateModal";

function DoctorWelcome({ fetchDoctors }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-[1rem] max-sm:flex-col max-sm:items-start">
        <div>
          <p className="text-[0.7rem] font-bold tracking-[0.03rem] text-[#8a96a8]">
            QUẢN TRỊ HỆ THỐNG / QUẢN LÝ BÁC SĨ
          </p>

          <h1 className="!mt-[0.25rem] text-[1.6rem] font-bold text-[#344054]">
            Quản lý bác sĩ
          </h1>

          <p className="!mt-[0.25rem] text-[0.875rem] text-[#8490a0]">
				Danh sách bác sĩ, chuyên khoa phụ trách và phí khám.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex shrink-0 items-center justify-center gap-[0.5rem] rounded-[0.5rem] bg-[#2878d0] !px-[1rem] !py-[0.625rem] text-[0.875rem] font-semibold text-white transition-colors hover:bg-[#185ca8] max-sm:self-stretch"
        >
          <Plus className="h-[1.125rem] w-[1.125rem]" />
          Thêm bác sĩ
        </button>
      </div>

      {showModal && (
        <CreateModal
          onClose={() => setShowModal(false)}
          fetchDoctors = {fetchDoctors}
        />
      )}
    </>
  );
}

export default DoctorWelcome;
