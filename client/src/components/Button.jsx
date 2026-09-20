import { motion } from "framer-motion";
import { cn } from "../lib/utils.js";

export default function Button({ className = "", variant = "primary", ...props }) {
  const variants = {
    primary:
      "bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white font-semibold shadow-[0_0_20px_rgba(244,63,94,0.3)] border-0",
    danger:
      "bg-rose-950/60 border border-rose-500/30 text-rose-200 hover:bg-rose-900/80 hover:border-rose-500/50 shadow-sm",
    ghost:
      "border border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white",
    subtle:
      "border border-white/5 bg-white/[0.04] text-zinc-200 hover:bg-white/[0.08]"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 text-xs sm:text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-rose-500/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 cursor-pointer",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

