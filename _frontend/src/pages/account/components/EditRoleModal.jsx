import { useEffect, useState } from "react";
import { X } from "@boxicons/react";
import {updateRole} from "../../../services/user/userService";
import {USER_STATUS} from "../../../enums/index.js";
import Swal from "sweetalert2";
import {USER_ROLE} from "../../../enums/index.js";

function EditRoleModal({ account, onClose, fetchAccounts }) {
  const [request, setRequest] = useState({
    userId : account.id,
    role: account.role
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

	useEffect(()=>{
		function handleKeyDown(e){
			if(e.key==="Escape"){
				onClose();
			}
		}
		window.addEventListener("keydown", handleKeyDown);
		return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
	}, [onClose]);

  async function handleUpdateRole(request){
    try{
      const data = await updateRole(request);
      await fetchAccounts();
      Swal.fire({
          icon: "success",
          title: "Cập nhật thành công",
          timer: 2000,
          showConfirmButton: true,
        });

      onClose();
    }
    catch(error){
      setError(error);
      Swal.fire({
          icon: "error",
          title: "Cập nhật thất bại",
          text: error.message,
          timer: 2000,
          showConfirmButton: true,
        });
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 !p-[1rem]">
      <section
        aria-labelledby="edit-account-modal-title"
        aria-modal="true"
        role="dialog"
        className="!my-auto max-h-[calc(100vh-2rem)] w-full max-w-[42rem] overflow-y-auto rounded-[0.75rem] bg-white !p-[1.5rem] shadow-xl"
      >
        {/* Header */}
        <div className="!mb-[1.5rem] flex items-start justify-between gap-[1rem]">
          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.03rem] text-[#8a96a8]">
              CẬP NHẬT VAI TRÒ
            </p>

            <h2
              id="edit-account-modal-title"
              className="!mt-[0.25rem] text-[1.25rem] font-bold text-[#344054]"
            >
              Chỉnh sửa tài khoản &amp; phân quyền
            </h2>
          </div>

          <button
            type="button"
            aria-label="Đóng"
            onClick={onClose}
            className="flex h-[2rem] w-[2rem] shrink-0 items-center justify-center rounded-[0.375rem] text-[#8490a0] transition-colors hover:bg-[#f2f4f7] hover:text-[#344054]"
          >
            <X className="h-[1.25rem] w-[1.25rem]" />
          </button>
        </div>

          <div className="grid grid-cols-1 gap-x-[1rem] gap-y-[1.125rem] sm:grid-cols-2">
              <label className="flex min-w-0 flex-col gap-[0.5rem]">
                <span className="text-[0.8125rem] font-semibold text-[#475467]">
                  Mã tài khoản
                </span>

                <p className="!p-[0.8rem] flex items-center w-full rounded-[0.5rem] border border-[#d0d5dd] bg-gray-200 text-sm text-[#344054]">
					{account.id}
				</p>
              </label>

              <label className="flex min-w-0 flex-col gap-[0.5rem]">
                <span className="text-[0.8125rem] font-semibold text-[#475467]">
                  Email
                </span>

                <p className="!p-[0.8rem] flex items-center w-full rounded-[0.5rem] border border-[#d0d5dd] bg-gray-200 text-sm text-[#344054]">
					{account.email}
				</p>
              </label>

              <label className="flex min-w-0 flex-col gap-[0.5rem]">
                <span className="text-[0.8125rem] font-semibold text-[#475467]">
                  Họ tên
                </span>

                <p className="!p-[0.8rem] flex items-center w-full rounded-[0.5rem] border border-[#d0d5dd] bg-gray-200 text-sm text-[#344054]">
					{account.fullName}
				</p>
              </label>

              <label className="flex min-w-0 flex-col gap-[0.5rem]">
                <span className="text-[0.8125rem] font-semibold text-[#475467]">
                	Số điện thoại
                </span>

                <p className="!p-[0.8rem] flex items-center w-full rounded-[0.5rem] border border-[#d0d5dd] bg-gray-200 text-sm text-[#344054]">
					{account.phone ?? "Chưa cập nhật"}
				</p>
              </label>

          </div>
	      <label className={`${error?.role && "text-red-400"} !mt-[1rem] flex min-w-0 flex-col gap-[0.5rem]`}>
	        <span className="text-[0.8125rem] font-semibold text-[#475467]">
	          Vai trò
	        </span>

	        <select
	          value={request.role}
	          onChange={(e) => setRequest((prev) => ({ ...prev, role: e.target.value }))}
	          className="!p-[0.8rem] flex items-center w-full rounded-[0.5rem] border border-[#d0d5dd] bg-white text-sm text-[#344054]">
	          <option value="" disabled>--- Chọn vai trò ---</option>
	          <option value={USER_ROLE.ADMIN}>{USER_ROLE.ADMIN}</option>
	          <option value={USER_ROLE.STAFF}>{USER_ROLE.STAFF}</option>
	          <option value={USER_ROLE.DOCTOR}>{USER_ROLE.DOCTOR}</option>
	          <option value={USER_ROLE.PATIENT}>{USER_ROLE.PATIENT}</option>
	        </select>
	        {error?.role && (
	          <p className="italic text-sm">* {error.role}</p>
	        )}

	      </label>


          {/* Actions */}
          <div className="!mt-[1.5rem] flex flex-wrap justify-end gap-[0.75rem] border-t border-[#eaecf0] !pt-[1.25rem]">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-[2.75rem] items-center justify-center rounded-[0.5rem] border border-[#d0d5dd] bg-white !px-[1.125rem] text-[0.8125rem] font-semibold text-[#475467] transition-colors hover:bg-[#f9fafb]"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={()=>handleUpdateRole(request)}
              className="inline-flex h-[2.75rem] cursor-pointer items-center justify-center rounded-[0.5rem] bg-blue-500 !px-[1.125rem] text-[0.8125rem] font-semibold text-white transition-colors hover:bg-blue-600"
            >
              Cập nhật thông tin
            </button>
          </div>
      </section>
    </div>

    </>
  );
}

export default EditRoleModal;
