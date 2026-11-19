import { Plus } from "@boxicons/react";
import { useState } from "react";
import CreateModal from "./CreateModal";

function DataWelcome({ fetchMedicines }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-[1rem] max-sm:flex-col max-sm:items-start">
        <div>
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.03rem] text-[#8a96a8]">
            QUẢN TRỊ HỆ THỐNG / THUỐC &amp; TỒN KHO
          </p>

          <h1 className="!mt-[0.25rem] text-[1.6rem] font-bold text-[#344054]">
            Quản lý thuốc &amp; tồn kho
          </h1>

          <p className="!mt-[0.25rem] text-[0.875rem] text-[#8490a0]">
            Quản lý danh mục thuốc, giá bán và tồn kho hiện tại.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-[0.5rem] rounded-[0.5rem] bg-[#2878d0] !px-[1rem] !py-[0.625rem] text-[0.875rem] font-semibold text-white transition-colors hover:bg-[#185ca8] max-sm:self-stretch"
        >
          <Plus className="h-[1.125rem] w-[1.125rem]" />
          Thêm thuốc
        </button>
      </div>

      {showModal && (
        <CreateModal
          onClose={() => setShowModal(false)}
          fetchMedicines={fetchMedicines}
        />
      )}
    </>
  );
}

export default DataWelcome;
