import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export default function ChartHits({ shortUrl, hits }: any) {
  const data = [{ name: "url", hits: hits }];

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-zinc-900">
          Visão de tráfego
        </h2>
        <span className="text-sm text-zinc-500">Últimos 30 dias</span>
      </div>

      {/* Chart */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="hits"
              stroke="#2563eb"
              strokeWidth={2}
            />
            <XAxis dataKey="name" />
            <YAxis />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center gap-4 text-sm text-zinc-600">
        <div>
          ↑ <strong className="text-green-600">+8.2%</strong> vs semana passada
        </div>
        <div>•</div>
        <div>
          Usuários: <strong className="text-zinc-900">12.3k</strong>
        </div>
      </div>
    </div>
  );
}
