import { Lock, Plus, Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button.jsx";
import { searchVideos } from "../lib/api.js";

export default function SearchPanel({ onAdd, hasCurrentVideo = false, adding = false, canAdd = true }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  async function handleSearch(event) {
    event.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const { data } = await searchVideos(query.trim());
      setResults(data.items || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Server connection failed. Check your backend URL.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-zinc-900/30 p-4 backdrop-blur-xl">
      <form className="flex flex-col gap-2.5 sm:flex-row" onSubmit={handleSearch}>
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input
            className="h-11 w-full rounded-xl border border-white/15 bg-black/50 pl-10 pr-4 text-xs sm:text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30"
            placeholder="Search YouTube tracks, shows, or paste URL..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <Button className="h-11 w-full sm:w-28 text-xs font-semibold" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </form>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
        {loading &&
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 p-3">
              <div className="aspect-video animate-pulse rounded-xl bg-white/5" />
              <div className="space-y-2 pt-3">
                <div className="h-4 w-5/6 animate-pulse rounded bg-white/5" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-white/5" />
                <div className="h-9 animate-pulse rounded-xl bg-white/5" />
              </div>
            </div>
          ))}
        {!loading && results.length === 0 && (
          <div className="rounded-xl border border-dashed border-white/10 bg-zinc-950/40 p-5 text-center text-xs text-zinc-500 sm:col-span-2 2xl:col-span-3">
            Search for songs, Bollywood hits, podcasts, or YouTube URLs to add to the squad queue.
          </div>
        )}
        {results.map((video) => (
          <article key={video.videoId} className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 p-3 transition-all hover:border-rose-500/30">
            <button
              className="relative block w-full overflow-hidden rounded-xl text-left disabled:cursor-not-allowed disabled:opacity-60"
              type="button"
              disabled={adding || !canAdd}
              onClick={() => onAdd(video)}
              title={canAdd ? (hasCurrentVideo ? "Add to queue" : "Play now") : "Host locked"}
            >
              <img className="aspect-video w-full object-cover transition duration-300 group-hover:scale-105 rounded-xl" src={video.thumbnail} alt={video.title} loading="lazy" />
              <span className="absolute inset-0 grid place-items-center bg-black/0 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100 rounded-xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-950/90 border border-white/10 px-3 py-1 text-xs font-semibold text-white">
                  {canAdd ? <Plus size={13} /> : <Lock size={13} />}
                  {canAdd ? (hasCurrentVideo ? "Add to queue" : "Play now") : "Host locked"}
                </span>
              </span>
            </button>
            <div className="space-y-2.5 pt-3">
              <div>
                <h3 className="line-clamp-2 text-xs font-bold text-white tracking-tight leading-snug">{video.title}</h3>
                <p className="mt-0.5 truncate text-[11px] text-zinc-400 font-medium">{video.channelTitle}</p>
              </div>
              <Button className="w-full h-9 text-xs rounded-xl" variant={canAdd ? "subtle" : "ghost"} disabled={adding || !canAdd} onClick={() => onAdd(video)}>
                <Plus size={14} /> {!canAdd ? "Host locked" : adding ? "Working..." : hasCurrentVideo ? "Add to queue" : "Play now"}
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
