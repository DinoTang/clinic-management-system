import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  CalendarAlt,
  User,
  Receipt,
  Capsule,
  DotsHorizontalRounded,
  ArrowRightStroke,
} from "@boxicons/react";
import dashboardService from "../../../services/dashboard/dashboardService";

const OPERATION_CONFIGS = [
  {
    type: "APPOINTMENT",
    title: "Lịch hẹn chờ xác nhận",
    description: "Đang cần bác sĩ xử lý",
    color: "bg-[#edf5fd] text-[#2878d0]",
    icon: CalendarAlt,
  },
  {
    type: "PATIENT_QUEUE",
    title: "Bệnh nhân đang chờ",
    description: "Trong hàng đợi khám",
    color: "bg-[#eaf7f1] text-[#16805d]",
    icon: User,
  },
  {
    type: "INVOICE",
    title: "Hóa đơn chưa thanh toán",
    description: "Cần được thu ngân xử lý",
    color: "bg-[#f1edff] text-[#8064d8]",
    icon: Receipt,
  },
  {
    type: "MEDICINE",
    title: "Thuốc sắp hết hàng",
    description: "Tồn kho dưới 30 đơn vị",
    color: "bg-[#fff6e7] text-[#a76a0b]",
    icon: Capsule,
  },
];

function OperationsPanel({ className = "" }) {
  const [countsMap, setCountsMap] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOperations = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getOperationsSummary();

      const mapped = (data.operations || []).reduce((acc, item) => {
        acc[item.type] = item.count;
        return acc;
      }, {});

      setCountsMap(mapped);
      setLastUpdated(data.lastUpdated);
    } catch (error) {
      console.error("Lỗi tải tình hình vận hành:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOperations();
  }, []);

  const formatCount = (value) => {
    if (loading) return "--";
    const num = Number(value ?? 0);
    return String(num).padStart(2, "0");
  };

  const formatLastUpdated = (isoString) => {
    if (!isoString) return "Đang tải dữ liệu...";
    const date = new Date(isoString);
    return `Cập nhật lúc ${date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

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
            {formatLastUpdated(lastUpdated)}
          </p>
        </div>

        <button
          type="button"
          onClick={fetchOperations}
          title="Làm mới dữ liệu"
          aria-label="Tùy chọn"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#8490a0] transition-colors hover:bg-[#f5f7fa] hover:text-[#344054]"
        >
          <DotsHorizontalRounded className="h-5 w-5" />
        </button>
      </div>

      {/* Operation list */}
      <div className="!mb-5 flex flex-col">
        {OPERATION_CONFIGS.map((operation, index) => {
          const Icon = operation.icon;
          const displayCount = formatCount(countsMap[operation.type]);

          return (
            <div
              key={operation.type}
              className={`flex items-center gap-3 !py-3 ${
                index !== OPERATION_CONFIGS.length - 1
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
                {displayCount}
              </strong>
            </div>
          );
        })}
      </div>

      {/* Action button */}
      <Link
        to="/admin/medicines"
        className="inline-flex items-center gap-1 text-[0.6rem] font-semibold text-[#2878d0] transition-colors hover:text-[#185ca8]"
      >
        Xem danh mục thuốc
        <ArrowRightStroke className="h-4 w-4" />
      </Link>
    </section>
  );
}

export default OperationsPanel;
