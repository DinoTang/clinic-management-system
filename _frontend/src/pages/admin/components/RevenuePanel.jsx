import { useEffect, useState } from "react";
import RevenueChart from "./RevenueChart";
import dashboardService from "../../../services/dashboard/dashboardService";

function RevenuePanel({ className = "" }) {
  const [period, setPeriod] = useState("MONTH");
  const [overview, setOverview] = useState({
    totalRevenue: 0,
    growthPercentage: 0,
    chart: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenueOverview = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getRevenueOverview(period);

        const formattedChart = (data.chart || []).map((item) => ({
          month: `T${item.month}`,
          revenue: Number(item.revenue || 0),
        }));

        setOverview({
          totalRevenue: Number(data.totalRevenue || 0),
          growthPercentage: Number(data.growthPercentage || 0),
          chart: formattedChart,
        });
      } catch (error) {
        console.error("Lỗi tải tổng quan doanh thu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueOverview();
  }, [period]);

  const isPositive = overview.growthPercentage >= 0;
  const formattedGrowth = Math.abs(overview.growthPercentage).toLocaleString(
    "vi-VN",
    { minimumFractionDigits: 1, maximumFractionDigits: 1 }
  );

  return (
    <section
      className={`${className} shadow-xl rounded-xl border border-gray-200 bg-white !p-6`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Doanh thu phòng khám</h2>
          <p className="text-sm text-gray-500">
            Tổng doanh thu hóa đơn đã thanh toán
          </p>
        </div>
        <select
          aria-label="Chọn kỳ báo cáo"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="rounded-lg border border-gray-200 !p-2 text-sm"
        >
          <option value="MONTH">Tháng này</option>
          <option value="QUARTER">Quý này</option>
          <option value="YEAR">Năm nay</option>
        </select>
      </div>

      <div className="!mt-5 flex flex-wrap items-baseline gap-3">
        <strong className="text-2xl font-bold">
          {loading
            ? "Đang tải..."
            : `${overview.totalRevenue.toLocaleString("vi-VN")} ₫`}
        </strong>
        {!loading && (
          <span className="text-sm text-gray-500">
            <b className={isPositive ? "text-green-600" : "text-red-600"}>
              {isPositive ? `↗ ${formattedGrowth}%` : `↘ ${formattedGrowth}%`}
            </b>{" "}
            so với kỳ trước
          </span>
        )}
      </div>

      <RevenueChart data={overview.chart} />

      <div className="flex justify-between items-center gap-[0.5rem] !mt-[0.6rem] text-[#8490a0] text-[0.6rem]">
        <div className="flex flex-row items-center gap-2 justify-center">
          <i className="w-[0.5rem] h-[0.5rem] rounded-[0.1rem] bg-[#4c94dc]"></i>{" "}
          Doanh thu
        </div>
        <span>Đơn vị: đồng</span>
      </div>
    </section>
  );
}

export default RevenuePanel;
