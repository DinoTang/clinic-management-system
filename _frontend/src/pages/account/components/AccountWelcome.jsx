import { Plus } from "@boxicons/react";
import { useState } from "react";
import CreateModal from "./CreateModal";

function AccountWelcome({ fetchAccounts }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-[1rem] max-sm:flex-col max-sm:items-start">
        <div>
          <p className="text-[0.7rem] font-bold tracking-[0.03rem] text-[#8a96a8]">
            QUẢN TRỊ HỆ THỐNG / TÀI KHOẢN &amp; PHÂN QUYỀN
          </p>

          <h1 className="!mt-[0.25rem] text-[1.6rem] font-bold text-[#344054]">
            Tài khoản &amp; phân quyền
          </h1>

          <p className="!mt-[0.25rem] text-[0.875rem] text-[#8490a0]">
            Quản lý tài khoản đăng nhập, vai trò và trạng thái hoạt động.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex shrink-0 items-center justify-center gap-[0.5rem] rounded-[0.5rem] bg-[#2878d0] !px-[1rem] !py-[0.625rem] text-[0.875rem] font-semibold text-white transition-colors hover:bg-[#185ca8] max-sm:self-stretch"
        >
          <Plus className="h-[1.125rem] w-[1.125rem]" />
          Tạo tài khoản
        </button>
      </div>

      {showModal && (
        <CreateModal
          onClose={() => setShowModal(false)}
          fetchAccounts = {fetchAccounts}
        />
      )}
    </>
  );
}

export default AccountWelcome;
