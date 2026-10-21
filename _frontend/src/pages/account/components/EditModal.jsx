import { useEffect } from "react";
import { X } from "@boxicons/react";

function EditModal({ account, onClose, onSubmit }) {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    onSubmit?.(Object.fromEntries(formData.entries()));
  };


  const fields = [
    {
      name: "fullName",
      label: "Họ và tên",
      type: "text",
      required: true,
    },
    {
      name: "username",
      label: "Tên đăng nhập",
      type: "text",
      required: true,
    },
    {
      name: "role",
      label: "Vai trò",
      type: "select",
      required: true,
      options: [
        { value: "ADMIN", label: "Quản trị viên" },
        { value: "DOCTOR", label: "Bác sĩ" },
        { value: "STAFF", label: "Nhân viên" },
        { value: "PATIENT", label: "Bệnh nhân" },
      ],
    },
    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "phone",
      label: "Số điện thoại",
      type: "tel",
    },
    {
      name: "status",
      label: "Trạng thái",
      type: "select",
      required: true,
      options: [
        { value: "ACTIVE", label: "Đang hoạt động" },
        { value: "LOCKED", label: "Đã khóa" },
      ],
    },
  ];

  return (
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
              CẬP NHẬT
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

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-[1rem] gap-y-[1.125rem] sm:grid-cols-2">
            {fields.map((field) => (
              <label
                key={field.name}
                className="flex min-w-0 flex-col gap-[0.5rem]"
              >
                <span className="text-[0.8125rem] font-semibold text-[#475467]">
                  {field.label}
                  {field.required && (
                    <i className="!ml-[0.25rem] not-italic text-[#d04444]">
                      *
                    </i>
                  )}
                </span>

                {field.type === "select" ? (
                  <select
                    name={field.name}
                    required={field.required}
                    defaultValue={
                      account?.[field.name] ??
                      field.options[0].value
                    }
                    className="h-[2.75rem] w-full rounded-[0.5rem] border border-[#d0d5dd] bg-white !px-[0.75rem] text-[0.8125rem] text-[#344054] outline-none transition-colors focus:border-[#2878d0] focus:ring-2 focus:ring-[#2878d0]/15"
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    defaultValue={account?.[field.name] ?? ""}
                    className="h-[2.75rem] w-full rounded-[0.5rem] border border-[#d0d5dd] bg-white !px-[0.75rem] text-[0.8125rem] text-[#344054] outline-none transition-colors placeholder:text-[#98a2b3] focus:border-[#2878d0] focus:ring-2 focus:ring-[#2878d0]/15"
                  />
                )}
              </label>
            ))}
          </div>

          {/* Note */}
          <div className="!mt-[1.25rem] rounded-[0.5rem] bg-[#f8fafc] !px-[0.875rem] !py-[0.75rem] text-[0.75rem] leading-[1.5] text-[#8490a0]">
            Bản ghi này chỉ được thêm/cập nhật trong dữ liệu demo của giao diện.
          </div>

          {/* Actions */}
          <div className="!mt-[1.5rem] flex flex-wrap justify-end gap-[0.75rem] border-t border-[#eaecf0] pt-[1.25rem]">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-[2.75rem] items-center justify-center rounded-[0.5rem] border border-[#d0d5dd] bg-white !px-[1.125rem] text-[0.8125rem] font-semibold text-[#475467] transition-colors hover:bg-[#f9fafb]"
            >
              Hủy
            </button>

            <button
              type="submit"
              className="inline-flex h-[2.75rem] items-center justify-center rounded-[0.5rem] bg-[#2878d0] !px-[1.125rem] text-[0.8125rem] font-semibold text-white transition-colors hover:bg-[#185ca8]"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default EditModal;
