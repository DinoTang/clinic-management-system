import { ArrowRightStroke } from "@boxicons/react";

function PecialtyPanel({ className = "" }) {
  const specialties = [
    { name: "Nội khoa", count: 109, width: "78%", color: "bg-[#2878d0]" },
    { name: "Tim mạch", count: 87, width: "62%", color: "bg-[#8064d8]" },
    { name: "Nhi khoa", count: 67, width: "48%", color: "bg-[#25a575]" },
    { name: "Tai Mũi Họng", count: 48, width: "34%", color: "bg-[#dda23b]" },
  ];

  return (
    <section
      className={`rounded-[0.8rem] border border-[#edf0f4] bg-white !p-[1rem] shadow-xl ${className}`}
    >
      <div className="!mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[#344054]">
            Lượt khám theo chuyên khoa
          </h2>
          <p className="!mt-1 text-xs text-[#98a2b3]">
            Phân bố lượt khám trong tháng
          </p>
        </div>
      </div>

      <div className="!mb-5 flex flex-col gap-[1.2rem]">
        {specialties.map((specialty) => (
          <div
            key={specialty.name}
            className="grid grid-cols-[90px_minmax(0,1fr)_28px] items-center gap-3 text-[0.8rem]"
          >
            <span className="truncate text-[#475467]">
              {specialty.name}
            </span>

            <div className="h-[0.5rem] overflow-hidden rounded-full bg-[#f0f2f5]">
              <div
                className={`h-full rounded-full ${specialty.color}`}
                style={{ width: specialty.width }}
              />
            </div>

            <b className="text-right text-[0.8rem] font-semibold text-[#344054]">
              {specialty.count}
            </b>
          </div>
        ))}
      </div>

      <button
        className="inline-flex items-center gap-1 text-xs font-semibold text-[#2878d0] transition-colors hover:text-[#185ca8]"
        type="button"
      >
        Quản lý chuyên khoa
        <ArrowRightStroke className="h-4 w-4" />
      </button>
    </section>
  );
}

export default PecialtyPanel;