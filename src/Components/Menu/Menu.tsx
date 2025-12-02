import { ChartColumnDecreasing, Home } from "lucide-react";
import MenuItem from "../MenuItem/MenuItem";
import { useLocation } from "react-router-dom";

export default function Menu() {
  const location = useLocation();
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white text-black p-6 flex flex-col border-r border-zinc-200 shadow-sm">
      <nav className="flex flex-col gap-2 mt-4">
        <MenuItem
          href="/"
          icon={<Home size={22} />}
          label="Home"
          active={location.pathname === "/"}
        />
        <MenuItem
          href="/Analytics"
          icon={<ChartColumnDecreasing size={22} />}
          label="Analytics"
          active={location.pathname === "/Analytics"}
        />
      </nav>
    </aside>
  );
}
