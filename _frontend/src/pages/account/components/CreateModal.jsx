import { X, Eye, EyeClosed } from "@boxicons/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { register } from "../../../services/auth/authService.js";

function CreateModal({ onClose, fetchAccounts}) {
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [request, setRequest] = useState({
    username:'',
    fullName: '',
    password: '',
    email: '',
    phone: ''
  });
  function togglePassword() {
    setShowPassword(!showPassword);
  }

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

  async function handleCreate(request){
    try{
      const data = await register(request);
      await fetchAccounts();
      Swal.fire({
          icon: "success",
          title: "Tạo tài khoản thành công",
          timer: 2000,
          showConfirmButton: true,
        });

      onClose();
    }
    catch(error){
      setError(error);
      Swal.fire({
          icon: "error",
          title: "Tạo tài khoản thất bại",
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
        <div className="!mb-[1.5rem] flex items-start justify-between gap-[1rem]">
          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.03rem] text-[#8a96a8]">
              TẠO MỚI TÀI KHOẢN
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

              <label className={`${error?.password && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem]`}>
                <span className="text-[0.8125rem] font-semibold text-[#475467]">
                  Mật khẩu
                </span>
                <div className="flex flex-row items-center border border-[#d0d5dd] !p-[0.8rem]  rounded-[0.5rem] ">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={request.password}
                    onChange={(e)=>setRequest(prev=>({...prev, password: e.target.value}))}
                    className="flex items-center w-full outline-none bg-white text-sm text-[#344054]"
                  />
                  {showPassword ? (
                    <Eye onClick={togglePassword} className="cursor-pointer"/>
                    ) : (
                    <EyeClosed onClick={togglePassword} className="cursor-pointer" />
                    )}
                </div>
                {error?.password&& (
                  <p className="italic text-sm">* {error.password}</p>
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
              onClick={()=>handleCreate(request)}
              className="inline-flex h-[2.75rem] cursor-pointer items-center justify-center rounded-[0.5rem] bg-blue-500 !px-[1.125rem] text-[0.8125rem] font-semibold text-white transition-colors hover:bg-blue-600"
            >
              Tạo tài khoản
            </button>
          </div>
      </section>
    </div>

    </>
  );
}

export default CreateModal;
