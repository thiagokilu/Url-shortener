import { Users } from "lucide-react";

export default function AnalyticCard({ hits }: any) {
  return (
    <div className="bg-white border max-h-30 border-zinc-200 shadow-sm rounded-xl p-5 flex flex-col gap-1 w-60">
      <div className="text-sm font-medium text-zinc-500 flex items-center justify-between ">
        <h2>Total de acessos</h2>
        <Users />
      </div>

      <span className="text-3xl font-semibold tracking-tight text-zinc-900">
        {hits}
      </span>
    </div>
  );
}
