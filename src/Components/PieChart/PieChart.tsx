import {
  PieChart as RePieChart,
  Pie,
  Label,
  ResponsiveContainer,
} from "recharts";

export default function MyPieChart({ devices }: any) {
  const colors: Record<string, string> = {
    android: "#3DDC84",
    linux: "#FFBB28",
    windows: "#0088FE",
    iphone: "#AAAAFF",
  };

  const data = devices.map((d: any) => ({
    name: d.device,
    value: Number(d.total),
    fill: colors[d.device.toLowerCase()] ?? "#CCCCCC",
  }));

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-zinc-900">Distribuição</h2>
        <span className="text-sm text-zinc-500">Por categoria</span>
      </div>

      {/* Chart */}
      <div className="w-full h-64 flex items-center justify-center">
        <div style={{ width: "250px", height: "250px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <RePieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="60%"
                outerRadius="80%"
                isAnimationActive={false}
              >
                <Label
                  position="center"
                  value="Devices"
                  fill="#666"
                  style={{ fontSize: "14px" }}
                />
              </Pie>
            </RePieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3">
        {data.map((item: any) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: item.fill }}
            ></div>

            <span className="text-sm font-medium text-zinc-700">
              {item.name}
            </span>

            <span className="text-sm text-zinc-500">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
