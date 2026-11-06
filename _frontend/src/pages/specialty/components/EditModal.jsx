import { useEffect, useState } from "react";
import { X } from "@boxicons/react";
import {updateProfile} from "../../../services/specialty/specialtyService";
import Swal from "sweetalert2";

function EditModal({ specialty, onClose, fetchSpecialties }) {
  const [request, setRequest] = useState({
  	specialtyId: specialty.id,
    name: specialty.name,
    description: specialty.description,
    standardFee: specialty.standardFee,
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
      await fetchSpecialties();
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
        aria-labelledby="edit-doctor-modal-title"
        aria-modal="true"
        role="dialog"
        className="!my-auto max-h-[calc(100vh-2rem)] w-full max-w-[42rem] overflow-y-auto rounded-[0.75rem] bg-white !p-[1.5rem] shadow-xl"
      >
        <div className="!mb-[1.5rem] flex items-start justify-between gap-[1rem]">
          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.03rem] text-[#8a96a8]">
              CẬP NHẬT
            </p>

            <h2
              id="edit-doctor-modal-title"
              className="!mt-[0.25rem] text-[1.25rem] font-bold text-[#344054]"
            >
              Chỉnh sửa quản lý chuyên khoa
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
              <label className={`${error?.userId && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem]`}>
                <span className="text-[0.8125rem] font-semibold text-[#475467]">
                  Tên chuyên khoa
                </span>

                <input
                  value={request.name}
                  onChange={(e) => setRequest(prev => ({ ...prev, name: e.target.value }))}
                  className="!p-[0.8rem] flex items-center w-full rounded-[0.5rem] border border-[#d0d5dd] bg-white text-sm text-[#344054]"
                />
                {error?.name && (
                  <p className="italic text-sm">* {error.name}</p>
                )}
              </label>

              <label className={`${error?.standardFee && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem]`}>
                <span className="text-[0.8125rem] font-semibold text-[#475467]">
                  Phí khám chuẩn
                </span>

                <input
                  value={request.standardFee}
                  onChange={(e)=>setRequest(prev=>({...prev, standardFee: e.target.value}))}
                  className="!p-[0.8rem] flex items-center w-full rounded-[0.5rem] border border-[#d0d5dd] bg-white text-sm text-[#344054]"
                />
                {error?.standardFee && (
                  <p className="italic text-sm">* {error.standardFee}</p>
                )}
              </label>

          </div>

          <label className={`${error?.academicDegree && "text-red-400"} !mt-2 flex min-w-0 flex-col gap-[0.5rem]`}>
            <span className="text-[0.8125rem] font-semibold text-[#475467]">
              Mô tả
            </span>

            <input
              value={request.description ?? ""}
              onChange={(e)=>setRequest(prev=>({...prev, description: e.target.value}))}
              className="!p-[0.8rem] flex items-center w-full rounded-[0.5rem] border border-[#d0d5dd] bg-white text-sm text-[#344054]"
            />
            {error?.description && (
              <p className="italic text-sm">* {error.description}</p>
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
              onClick={()=>handleUpdateProfile(request)}
              className="inline-flex h-[2.75rem] cursor-pointer items-center justify-center rounded-[0.5rem] bg-blue-500 !px-[1.125rem] text-[0.8125rem] font-semibold text-white transition-colors hover:bg-blue-600"
            >
              Lưu thay đổi
            </button>
          </div>
      </section>
    </div>

    </>
  );
}

export default EditModal;
