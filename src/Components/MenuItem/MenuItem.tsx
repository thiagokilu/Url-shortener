export default function MenuItem({ href, icon, label, active }: any) {
  return (
    <a
      href={href}
      className={`
        relative flex items-center gap-3 px-3 py-2 text-[15px] font-medium transition-all
        ${
          active
            ? "text-green-700 bg-green-100"
            : "hover:bg-zinc-100 hover:text-zinc-800"
        }
      `}
    >
      {/* Indicador lateral pequeno */}
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 rounded-full bg-green-700"></span>
      )}

      {icon}
      {label}
    </a>
  );
}
