import {
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const Chart = () => {
  const data = [
    { name: "Jan", uv: 4000, pick: 24, amt: 2400 },
    { name: "Feb", uv: 3000, pick: 13, amt: 2210 },
    // { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Apr", uv: 2780, pick: 39, amt: 2000 },
    { name: "May", uv: 1890, pick: 15, amt: 2181 },
    // { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Jul", uv: 1490, pick: 13, amt: 1100 },
  ];

  return (
    <div className="p-2">
      <ResponsiveContainer width={"100%"} height={250}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="3%" stopColor="#5380fa" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#567fee" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="name" fontSize={14} />
          <Tooltip />
          <Legend
            verticalAlign="top" // Position the legend on top
            align="center" // Center align the legend
            layout="vertical"
          />

          <Area
            type="linear"
            dataKey="pick"
            fill="url(#colorUv)" // Use linearGradient
            stroke="#3640ca"
            // dot={<CustomDot />}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
