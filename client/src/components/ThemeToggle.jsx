import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [light, setLight] = useState(() => localStorage.getItem("ystream-theme") === "light");

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    localStorage.setItem("ystream-theme", light ? "light" : "dark");
  }, [light]);

  return (
    <button
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
      onClick={() => setLight((value) => !value)}
      title="Toggle theme"
      type="button"
    >
      {light ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
