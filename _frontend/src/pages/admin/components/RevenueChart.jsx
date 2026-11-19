import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  LabelList,
} from "recharts";
import dashboardService from "../../../services/dashboard/dashboardService";

function formatMillions(value) {
  return (
    (value / 1000000).toLocaleString("vi-VN", {
      maximumFractionDigits: 1,
    }) + "tr"
  );
}

function RevenueChart({ year }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        setLoading(true);
        const response = await dashboardService.getMonthlyRevenue(year);

        const formattedData = (response || []).map((item) => ({
          month: `T${item.month}`,
          revenue: Number(item.revenue || 0),
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Lỗi tải biểu đồ doanh thu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenue();
  }, [year]);

  if (loading) {
    return (
      <div className="mt-6 flex h-[19rem] w-full items-center justify-center text-xs text-[#98a2b3]">
        Đang tải dữ liệu doanh thu...
      </div>
    );
  }

  return (
    <div className="mt-6 h-[19rem] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis tickFormatter={formatMillions} />

          <Tooltip
            formatter={(value) =>
              Number(value).toLocaleString("vi-VN") + " ₫"
            }
          />

          <Bar
            dataKey="revenue"
            fill="#3b82f6"
            radius={[6, 6, 0, 0]}
          >
            <LabelList
              dataKey="revenue"
              position="top"
              formatter={(value) =>
                Number(value) > 0 ? formatMillions(Number(value)) : ""
              }
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;
