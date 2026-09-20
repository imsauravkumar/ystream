export default function CopyrightBadge({ className = "" }) {
  return (
    <a
      href="mailto:sauravk1175@gmail.com"
      className={`text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer ${className}`}
      title="Ystream — Designed and built by Saurav Kumar"
    >
      &copy; Ystream Saurav Kumar {new Date().getFullYear()}
    </a>
  );
}
