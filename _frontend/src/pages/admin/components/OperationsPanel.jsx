import {
  CalendarAlt,
  User,
  Receipt,
  Capsule,
  DotsHorizontalRounded,
  ArrowRightStroke,
} from "@boxicons/react";

function OperationsPanel({ className = "" }) {
  const operations = [
    {
      title: "Lịch hẹn chờ xác nhận",
      description: "Đang cần bác sĩ xử lý",
      count: "06",
      color: "bg-[#edf5fd] text-[#2878d0]",
      icon: CalendarAlt,
    },
    {
      title: "Bệnh nhân đang chờ",
      description: "Trong hàng đợi khám",
      count: "08",
      color: "bg-[#eaf7f1] text-[#16805d]",
      icon: User,
    },
    {
      title: "Hóa đơn chưa thanh toán",
      description: "Cần được thu ngân xử lý",
      count: "02",
      color: "bg-[#f1edff] text-[#8064d8]",
      icon: Receipt,
    },
    {
      title: "Thuốc sắp hết hàng",
      description: "Tồn kho dưới 30 đơn vị",
      count: "01",
      color: "bg-[#fff6e7] text-[#a76a0b]",
      icon: Capsule,
    },
  ];

  return (
    <section
      className={`rounded-[0.7rem] border border-[#edf0f4] bg-white !p-[1rem] shadow-xl ${className}`}
    >
      <div className="!mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[0.8rem] font-semibold text-[#344054]">
            Tình hình vận hành
          </h2>
          <p className="!mt-1 text-[0.6rem] text-[#98a2b3]">
            Cập nhật theo dữ liệu mẫu
          </p>
        </div>

        <button
          type="button"
          aria-label="Tùy chọn"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#8490a0] transition-colors hover:bg-[#f5f7fa] hover:text-[#344054]"
        >
          <DotsHorizontalRounded className="h-5 w-5" />
        </button>
      </div>

      {/* Operation list */}
      <div className="!mb-5 flex flex-col">
        {operations.map((operation, index) => {
          const Icon = operation.icon;

          return (
            <div
              key={operation.title}
              className={`flex items-center gap-3 !py-3 ${
                index !== operations.length - 1
                  ? "border-b border-[#f0f1f4]"
                  : ""
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.6rem] ${operation.color}`}
              >
                <Icon className="h-[1.3rem] w-[1.3rem]" />
              </span>

              <div className="min-w-0 flex-1">
                <b className="block truncate text-[0.7rem] font-semibold text-[#344054]">
                  {operation.title}
                </b>
                <small className="!mt-1 block text-[0.6rem] text-[#98a2b3]">
                  {operation.description}
                </small>
              </div>

              <strong className="shrink-0 text-[0.8rem] font-semibold tabular-nums text-[#344054]">
                {operation.count}
              </strong>
            </div>
          );
        })}
      </div>

      {/* Action button */}
      <button
        type="button"
        className="inline-flex items-center gap-1 text-[0.6rem] font-semibold text-[#2878d0] transition-colors hover:text-[#185ca8]"
      >
        Xem danh mục thuốc
        <ArrowRightStroke className="h-4 w-4" />
      </button>
    </section>
  );
}

export default OperationsPanel;