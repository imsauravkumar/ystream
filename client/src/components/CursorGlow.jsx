import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isClicking, setIsClicking] = useState(false);

  const auraRef = useRef(null);
  const sparkleRef = useRef(null);
  const mousePos = useRef({ x: -200, y: -200 });
  const currentAura = useRef({ x: -200, y: -200 });
  const rafId = useRef(null);

  // Check dark mode state and respond to theme toggles
  useEffect(() => {
    const checkTheme = () => {
      const isDark = !document.documentElement.classList.contains("light");
      setIsDarkMode(isDark);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Only enable on desktop/laptop fine pointers
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Instantly position the micro-sparkle point
      if (sparkleRef.current) {
        sparkleRef.current.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`;
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    // Smooth lerping loop for the soft ambient spotlight aura
    const animate = () => {
      const speed = 0.14; // smooth follow lag
      currentAura.current.x += (mousePos.current.x - currentAura.current.x) * speed;
      currentAura.current.y += (mousePos.current.y - currentAura.current.y) * speed;

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${currentAura.current.x - 250}px, ${currentAura.current.y - 250}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [visible]);

  // Completely hidden in light mode
  if (!isDarkMode) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-500 select-none ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Soft Ambient Cursor Spotlight / Light Aura */}
      <div
        ref={auraRef}
        className="will-change-transform pointer-events-none absolute top-0 left-0 h-[500px] w-[500px] rounded-full opacity-65 blur-3xl mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, rgba(244, 63, 94, 0.16) 0%, rgba(129, 140, 248, 0.08) 40%, rgba(244, 63, 94, 0) 70%)"
        }}
      />

      {/* Sparkling Luminous Light Accent under Cursor */}
      <div
        ref={sparkleRef}
        className={`will-change-transform pointer-events-none absolute top-0 left-0 h-6 w-6 rounded-full transition-all duration-150 ease-out ${
          isClicking
            ? "scale-150 bg-rose-400/40 shadow-[0_0_20px_rgba(244,63,94,0.8)] border border-white/60"
            : "scale-100 bg-rose-500/20 shadow-[0_0_12px_rgba(244,63,94,0.45)] border border-rose-400/40"
        }`}
      >
        <div className="absolute inset-1 rounded-full bg-white/20 animate-ping opacity-30" />
      </div>
    </div>
  );
}
