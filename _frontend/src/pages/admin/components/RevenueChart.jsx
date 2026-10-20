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

const data = [
  { month: "T1", revenue: 12000000 },
  { month: "T2", revenue: 15000000 },
  { month: "T3", revenue: 11000000 },
  { month: "T4", revenue: 18000000 },
  { month: "T5", revenue: 13442000 },
  { month: "T6", revenue: 20000000 },
];

function formatMillions(value) {
  return (
    (value / 1000000).toLocaleString("vi-VN", {
      maximumFractionDigits: 1,
    }) + "tr"
  );
}

function RevenueChart() {
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
              formatter={(value) => formatMillions(Number(value))}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;
