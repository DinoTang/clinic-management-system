import { useEffect, useState } from "react";
import { ArrowRightStroke } from "@boxicons/react";
import { Link } from "react-router-dom";
import dashboardService from "../../../services/dashboard/dashboardService";

const BAR_COLORS = [
  "bg-[#2878d0]",
  "bg-[#8064d8]",
  "bg-[#25a575]",
  "bg-[#dda23b]",
];

function PecialtyPanel({ className = "" }) {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialtyVisits = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getSpecialtyVisits();

        // Tính tổng lượt khám để chia phần trăm độ dài thanh progress
        const totalVisits = (data || []).reduce(
          (sum, item) => sum + Number(item.count || 0),
          0
        );

        const mapped = (data || []).map((item, index) => {
          const count = Number(item.count || 0);
          const percentage =
            totalVisits > 0 ? Math.round((count / totalVisits) * 100) : 0;

          return {
            id: item.specialtyId || item.specialtyName,
            name: item.specialtyName,
            count,
            width: `${percentage}%`,
            color: BAR_COLORS[index % BAR_COLORS.length],
          };
        });

        setSpecialties(mapped);
      } catch (error) {
        console.error("Lỗi tải lượt khám theo chuyên khoa:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialtyVisits();
  }, []);

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
        {loading ? (
          <p className="text-xs text-[#98a2b3]">Đang tải dữ liệu...</p>
        ) : specialties.length === 0 ? (
          <p className="text-xs text-[#98a2b3]">Chưa có dữ liệu lượt khám</p>
        ) : (
          specialties.map((specialty) => (
            <div
              key={specialty.id}
              className="grid grid-cols-[90px_minmax(0,1fr)_28px] items-center gap-3 text-[0.8rem]"
            >
              <span
                className="truncate text-[#475467]"
                title={specialty.name}
              >
                {specialty.name}
              </span>

              <div className="h-[0.5rem] overflow-hidden rounded-full bg-[#f0f2f5]">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${specialty.color}`}
                  style={{ width: specialty.width }}
                />
              </div>

              <b className="text-right text-[0.8rem] font-semibold text-[#344054]">
                {specialty.count}
              </b>
            </div>
          ))
        )}
      </div>

      <Link
        to="/admin/specialties"
        className="inline-flex items-center gap-1 text-xs font-semibold text-[#2878d0] transition-colors hover:text-[#185ca8]"
      >
        Quản lý chuyên khoa
        <ArrowRightStroke className="h-4 w-4" />
      </Link>
    </section>
  );
}

export default PecialtyPanel;
