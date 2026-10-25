import { useEffect, useState } from "react";
import { X } from "@boxicons/react";
import {updateProfile} from "../../../services/user/userService";
import {USER_STATUS} from "../../../enums/index.js";
import Swal from "sweetalert2";
import {USER_ROLE} from "../../../enums/index.js";

function EditModal({ account, onClose, fetchAccounts }) {
  const [request, setRequest] = useState({
    userId : account.id,
    username: account.username,
    fullName: account.fullName,
    email: account.email,
    phone: account.phone,
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

  async function handleUpdateProfile(request){
    try{
      const data = await updateProfile(request);
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
              CẬP NHẬT TRẠNG THÁI
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
          {request.userId}
        </p>
              </label>

              <label className={`${error?.email && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem]`}>
                <span className="text-[0.8125rem] font-semibold text-[#475467]">
                  Email
                </span>

                <input
                  value={request.email}
                  onChange={(e) => setRequest(prev => ({ ...prev, email: e.target.value }))}
                  className="!p-[0.8rem] flex items-center w-full rounded-[0.5rem] border border-[#d0d5dd] bg-white text-sm text-[#344054]"
                />
                {error?.email && (
                  <p className="italic text-sm">* {error.email}</p>
                )}
              </label>

              <label className={`${error?.fullName && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem]`}>
                <span className="text-[0.8125rem] font-semibold text-[#475467]">
                  Họ tên
                </span>

                <input
                  value={request.fullName}
                  onChange={(e)=>setRequest(prev=>({...prev, fullName: e.target.value}))}
                  className="!p-[0.8rem] flex items-center w-full rounded-[0.5rem] border border-[#d0d5dd] bg-white text-sm text-[#344054]"
                />
                {error?.fullName && (
                  <p className="italic text-sm">* {error.fullName}</p>
                )}
              </label>

              <label className={`${error?.phone && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem]`}>
                <span className="text-[0.8125rem] font-semibold text-[#475467]">
                  Số điện thoại
                </span>

                <input
                  value={request.phone ?? ""}
                  onChange={(e)=>setRequest(prev=>({...prev, phone: e.target.value}))}
                  className="!p-[0.8rem] flex items-center w-full rounded-[0.5rem] border border-[#d0d5dd] bg-white text-sm text-[#344054]"
                />
                {error?.phone && (
                  <p className="italic text-sm">* {error.phone}</p>
                )}
              </label>

              <label className={`${error?.username && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem]`}>
                <span className="text-[0.8125rem] font-semibold text-[#475467]">
                  Tên tài khoản
                </span>

                <input
                  value={request.username}
                  onChange={(e)=>setRequest(prev=>({...prev, username: e.target.value}))}
                  className="!p-[0.8rem] flex items-center w-full rounded-[0.5rem] border border-[#d0d5dd] bg-white text-sm text-[#344054]"
                />
                {error?.username && (
                  <p className="italic text-sm">* {error.username}</p>
                )}
              </label>

              <label className={`${error?.role && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem]`}>
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

          </div>

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
              onClick={()=>handleUpdateProfile(request)}
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

export default EditModal;
