import { X, Eye, EyeClosed } from "@boxicons/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createAsync } from "../../../services/doctor/doctorService.js";

function CreateModal({ onClose, fetchDoctors}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [request, setRequest] = useState({
    userId: '',
    specialtyId: '',
    academicDegree: '',
    experienceYears: '',
    bio: '',
    examinationFee: ''
  });

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
      const data = await createAsync(request);
      await fetchDoctors();
      Swal.fire({
          icon: "success",
          title: "Thêm bác sĩ thành công",
          timer: 2000,
          showConfirmButton: true,
        });

      onClose();
    }
    catch(error){
      setError(error);
      Swal.fire({
          icon: "error",
          title: "Thêm bác sĩ thất bại",
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
              THÊM MỚI
            </p>

            <h2
              id="edit-doctor-modal-title"
              className="!mt-[0.25rem] text-[1.25rem] font-bold text-[#344054]"
            >
              Thêm bác sĩ
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
                  Mã tài khoản
                </span>

                <input
                  value={request.userId}
                  onChange={(e) => setRequest(prev => ({ ...prev, userId: e.target.value }))}
                  className="!p-[0.8rem] flex items-center w-full rounded-[0.5rem] border border-[#d0d5dd] bg-white text-sm text-[#344054]"
                />
                {error?.userId && (
                  <p className="italic text-sm">* {error.userId}</p>
                )}
              </label>

              <label className={`${error?.specialtyId && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem]`}>
                <span className="text-[0.8125rem] font-semibold text-[#475467]">
                  Mã chuyên khoa
                </span>

                <input
                  value={request.specialtyId}
                  onChange={(e)=>setRequest(prev=>({...prev, specialtyId: e.target.value}))}
                  className="!p-[0.8rem] flex items-center w-full rounded-[0.5rem] border border-[#d0d5dd] bg-white text-sm text-[#344054]"
                />
                {error?.specialtyId && (
                  <p className="italic text-sm">* {error.specialtyId}</p>
                )}
              </label>

              <label className={`${error?.academicDegree && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem]`}>
                <span className="text-[0.8125rem] font-semibold text-[#475467]">
                  Học vị
                </span>

                <input
                  value={request.academicDegree ?? ""}
                  onChange={(e)=>setRequest(prev=>({...prev, academicDegree: e.target.value}))}
                  className="!p-[0.8rem] flex items-center w-full rounded-[0.5rem] border border-[#d0d5dd] bg-white text-sm text-[#344054]"
                />
                {error?.academicDegree && (
                  <p className="italic text-sm">* {error.academicDegree}</p>
                )}
              </label>

              <label className={`${error?.experienceYears && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem]`}>
                <span className="text-[0.8125rem] font-semibold text-[#475467]">
                  Năm kinh nghiệm
                </span>

                <input
                  value={request.experienceYears}
                  onChange={(e)=>setRequest(prev=>({...prev, experienceYears: e.target.value}))}
                  className="!p-[0.8rem] flex items-center w-full rounded-[0.5rem] border border-[#d0d5dd] bg-white text-sm text-[#344054]"
                />
                {error?.experienceYears && (
                  <p className="italic text-sm">* {error.experienceYears}</p>
                )}
              </label>

              <label className={`${error?.bio && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem]`}>
                <span className="text-[0.8125rem] font-semibold text-[#475467]">
                  Tiểu sử
                </span>
                <div className="flex flex-row items-center border border-[#d0d5dd] !p-[0.8rem]  rounded-[0.5rem] ">
                  <input
                    value={request.bio}
                    onChange={(e)=>setRequest(prev=>({...prev, bio: e.target.value}))}
                    className="flex items-center w-full outline-none bg-white text-sm text-[#344054]"
                  />
                </div>
                {error?.bio&& (
                  <p className="italic text-sm">* {error.bio}</p>
                )}
              </label>

              <label className={`${error?.examinationFee && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem]`}>
                <span className="text-[0.8125rem] font-semibold text-[#475467]">
                  Phí khám (vnđ)
                </span>
                <div className="flex flex-row items-center border border-[#d0d5dd] !p-[0.8rem]  rounded-[0.5rem] ">
                  <input
                    value={request.examinationFee}
                    onChange={(e)=>setRequest(prev=>({...prev, examinationFee: e.target.value}))}
                    className="flex items-center w-full outline-none bg-white text-sm text-[#344054]"
                  />
                </div>
                {error?.examinationFee&& (
                  <p className="italic text-sm">* {error.examinationFee}</p>
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
              Thêm vào danh sách
            </button>
          </div>
      </section>
    </div>

    </>
  );
}

export default CreateModal;
