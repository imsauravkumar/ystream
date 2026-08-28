export default function CopyrightBadge({ className = "" }) {
  return (
    <a
      href="mailto:sauravk1175@gmail.com"
      className={`inline-flex max-w-full truncate rounded-full border border-zinc-800 bg-panel/80 px-4 py-2 text-xs font-semibold text-muted shadow-glow backdrop-blur transition hover:border-sky-400/50 hover:text-zinc-100 ${className}`}
      title="Designed and built by Saurav Kumar"
    >
      &copy; Saurav Kumar {new Date().getFullYear()}
    </a>
  );
}
