import { useEffect, useState } from "react";
import {
  CalendarAlt,
  User,
  ChartLine,
  HeartPlus,
} from "@boxicons/react";
import dashboardService from "../../../services/dashboard/dashboardService";

function StatPanel({ className = "" }) {
  const [stats, setStats] = useState({
    todayAppointments: 0,
    todayExamined: 0,
    todayRevenue: 0,
    activeDoctors: 0,
    totalDoctors: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getDashboardStats();
        setStats({
          todayAppointments: Number(data.todayAppointments || 0),
          todayExamined: Number(data.todayExamined || 0),
          todayRevenue: Number(data.todayRevenue || 0),
          activeDoctors: Number(data.activeDoctors || 0),
          totalDoctors: Number(data.totalDoctors || 0),
        });
      } catch (error) {
        console.error("Lỗi tải thống kê tổng quan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const groupCards = [
    {
      title: "Lịch hẹn hôm nay",
      icon: <CalendarAlt />,
      color: "text-blue-400",
      bgColor: "bg-blue-400/20",
      value: loading ? "--" : String(stats.todayAppointments).padStart(2, "0"),
      subText: "Tổng lịch hẹn trong ngày",
    },
    {
      title: "Lượt khám trong ngày",
      icon: <User />,
      color: "text-green-700",
      bgColor: "bg-green-400/20",
      value: loading ? "--" : String(stats.todayExamined).padStart(2, "0"),
      subText: loading
        ? "Đang cập nhật..."
        : `${stats.todayExamined}/${stats.todayAppointments} lượt hoàn tất`,
    },
    {
      title: "Doanh thu đã thu",
      icon: <ChartLine />,
      color: "text-purple-700",
      bgColor: "bg-purple-400/20",
      value: loading
        ? "--"
        : `${stats.todayRevenue.toLocaleString("vi-VN")} ₫`,
      subText: "Hóa đơn thanh toán hôm nay",
    },
    {
      title: "Bác sĩ hoạt động",
      icon: <HeartPlus />,
      color: "text-orange-400",
      bgColor: "bg-orange-400/20",
      value: loading
        ? "--"
        : `${stats.activeDoctors}/${stats.totalDoctors}`,
      subText: "Bác sĩ đang sẵn sàng khám",
    },
  ];

  return (
    <div className={`grid grid-cols-4 gap-[1rem] max-lg:grid-cols-2 max-sm:grid-cols-1 ${className}`}>
      {groupCards.map((card, idx) => (
        <article
          key={idx}
          className="flex flex-col border border-gray-200 shadow-xl rounded-[0.6rem] gap-3 !p-[1rem] bg-white"
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-[2rem] h-[2rem] flex items-center justify-center rounded-[0.3rem] ${card.color} ${card.bgColor}`}
            >
              {card.icon}
            </div>
            <span className="text-[0.8rem] text-[#475467] font-medium">
              {card.title}
            </span>
          </div>

          <p className="font-bold text-[1.3rem] text-[#344054] tabular-nums">
            {card.value}
          </p>

          <span className={`text-[0.7rem] ${card.color}`}>
            {card.subText}
          </span>
        </article>
      ))}
    </div>
  );
}

export default StatPanel;
