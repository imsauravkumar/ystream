import { ArrowRight, CheckCircle, Laptop, ListMusic, MessageSquare, Play, Shield, Sparkles, Tv, Users, Zap } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import BrandMark from "../components/BrandMark.jsx";
import Button from "../components/Button.jsx";
import CopyrightBadge from "../components/CopyrightBadge.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Landing() {
  const { user, loading } = useAuth();

  // If user is already logged in, redirect them directly to the dashboard
  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="min-h-screen bg-ink text-zinc-50 transition-colors duration-300">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5">
            <BrandMark className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
            <div>
              <p className="text-lg font-black leading-none tracking-normal sm:text-xl">Ystream</p>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-brand sm:text-[0.7rem]">Sync Watch</p>
            </div>
          </Link>

          {/* Center Links (Desktop only) */}
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#features" className="text-sm font-medium text-muted transition hover:text-white">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-muted transition hover:text-white">
              How It Works
            </a>
            <a href="#about" className="text-sm font-medium text-muted transition hover:text-white">
              About
            </a>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link to="/auth?mode=login">
              <Button variant="ghost" className="h-10 px-3 text-xs sm:px-4 sm:text-sm">
                Login
              </Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button variant="primary" className="h-10 px-3 text-xs sm:px-4 sm:text-sm">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
        {/* Decorative Background Glows */}
        <div className="absolute left-1/2 top-12 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/10 blur-[80px] sm:h-96 sm:w-96" />
        <div className="absolute right-10 bottom-10 -z-10 h-72 w-72 rounded-full bg-accent/5 blur-[100px]" />

        <div className="mx-auto max-w-4xl space-y-6">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/80 px-3.5 py-1.5 text-xs font-semibold text-brand sm:text-sm">
            <Sparkles size={14} className="animate-pulse" />
            Watch YouTube in Real-Time Together
          </div>

          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Watch YouTube Together in{" "}
            <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-rose-400 bg-clip-text text-transparent">
              Perfect Sync
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg sm:leading-loose">
            Start private watch rooms, invite friends, share a collaborative playback queue, and text chat in real-time. Experience zero lag, zero drift, and endless watch party fun.
          </p>

          <div className="flex flex-col items-center justify-center gap-3.5 pt-4 sm:flex-row">
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full h-12 px-6 sm:w-auto">
                Create a Watch Room <ArrowRight size={16} />
              </Button>
            </Link>
            <a href="#features" className="w-full sm:w-auto">
              <Button variant="ghost" className="w-full h-12 px-6 sm:w-auto">
                Explore Features
              </Button>
            </a>
          </div>
        </div>

        {/* Mock UI Showcase */}
        <div className="mx-auto mt-16 max-w-5xl px-2 sm:px-6">
          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-panel/95 shadow-glow">
            {/* Window bar */}
            <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="rounded border border-zinc-800 bg-zinc-900 px-3 py-0.5 text-xs text-muted">
                ystream.live/room/PARTY-99
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Synced
                </span>
              </div>
            </div>

            {/* Layout grid mockup */}
            <div className="grid gap-4 p-4 lg:grid-cols-[1fr_20rem]">
              {/* Left Column: Player & Queue */}
              <div className="space-y-4">
                {/* Simulated Player Frame */}
                <div className="relative aspect-video rounded-xl border border-zinc-800 bg-[#09090b] overflow-hidden flex flex-col justify-between p-4 group">
                  {/* Overlay Thumbnail/Background */}
                  <div className="absolute inset-0 bg-cover bg-center opacity-40 bg-[url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800')]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-black/20 to-black/60" />
                  
                  {/* Top Bar inside Player */}
                  <div className="relative flex justify-between items-start">
                    <div className="rounded bg-black/60 px-2.5 py-1 text-left">
                      <p className="text-xs font-bold text-slate-100">Lofi Hip Hop Radio 🌌 Beats to Relax/Study to</p>
                      <p className="text-[10px] text-slate-400">YouTube Live Stream</p>
                    </div>
                    <span className="rounded bg-brand text-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      Host Playing
                    </span>
                  </div>

                  {/* Play Center Icon */}
                  <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand border border-brand/30 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                    <Play className="fill-brand text-brand ml-1" size={24} />
                  </div>

                  {/* Bottom Controls Bar inside Player */}
                  <div className="relative flex flex-col gap-2 bg-black/40 rounded-lg p-2 backdrop-blur-sm border border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-slate-300">01:42 / 03:55</span>
                      <div className="h-1.5 flex-1 rounded-full bg-zinc-800 overflow-hidden">
                        <div className="h-full w-2/5 bg-brand" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-300">-02:13</span>
                    </div>
                  </div>
                </div>

                {/* Queue list mockup */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 text-left">
                  <div className="mb-2 flex items-center justify-between border-b border-zinc-800/80 pb-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                      <ListMusic size={14} className="text-brand" /> Up Next (2 videos)
                    </p>
                    <span className="text-[10px] text-muted">Collaborative Queue</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 rounded-lg border border-zinc-900 bg-zinc-950 px-2 py-1.5">
                      <span className="text-[10px] font-mono text-muted">01</span>
                      <div className="h-8 w-12 shrink-0 rounded bg-zinc-900 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=150')` }} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-white">Synthwave Radio - Chill Retro Instrumental Beats</p>
                        <p className="text-[9px] text-muted">Added by Sarah • 4:20</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-zinc-900 bg-zinc-950 px-2 py-1.5 opacity-60">
                      <span className="text-[10px] font-mono text-muted">02</span>
                      <div className="h-8 w-12 shrink-0 rounded bg-zinc-900 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=150')` }} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-white">Night Drive Lofi Beats - Chill Instrumental Mix</p>
                        <p className="text-[9px] text-muted">Added by Jordan • 3:45</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Simulated Live Chat */}
              <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-left">
                <p className="mb-2 border-b border-zinc-800/80 pb-2 text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                  <MessageSquare size={14} className="text-brand" /> Room Chat
                </p>
                <div className="flex-1 space-y-3 py-2 text-xs font-medium">
                  <div>
                    <span className="font-bold text-brand">Alex: </span>
                    <span className="text-zinc-200">Hey guys! Thanks for setting this up.</span>
                  </div>
                  <div>
                    <span className="font-bold text-rose-400">Sarah: </span>
                    <span className="text-zinc-200">Love this song! The sync is so fast 🚀</span>
                  </div>
                  <div>
                    <span className="font-bold text-sky-400">Jordan: </span>
                    <span className="text-zinc-200">I just added a synthwave video to the queue!</span>
                  </div>
                  <div className="rounded bg-brand/5 border border-brand/10 p-2 text-[11px] text-zinc-300">
                    <span className="font-bold text-brand">System: </span>
                    <span>Alex paused the video at 01:42.</span>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-400">Host (You): </span>
                    <span className="text-zinc-200">Nice selection Jordan, setting permission now!</span>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <input
                    disabled
                    className="h-9 flex-1 rounded border border-zinc-800 bg-zinc-900 px-3 text-xs text-muted outline-none"
                    placeholder="Type a message..."
                  />
                  <Button disabled variant="primary" className="h-9 min-h-0 px-3 text-xs">
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="scroll-mt-20 border-t border-zinc-900 bg-zinc-950/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl font-black sm:text-4xl">Everything you need for the perfect session</h2>
            <p className="text-base text-muted">
              Built using React, Tailwind CSS, Firebase Authentication, and Socket.io to provide a premium, buffer-free, host-controlled sharing experience.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="group rounded-xl border border-zinc-800 bg-panel/40 p-6 transition-all duration-300 hover:border-brand/40 hover:shadow-glow hover:-translate-y-1">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-brand/10 text-brand">
                <Zap size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">Real-Time Sync</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Socket.io keeps the playback timestamp, play, and pause events synchronized across everyone's browsers in milliseconds. No manual alignment needed.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-xl border border-zinc-800 bg-panel/40 p-6 transition-all duration-300 hover:border-brand/40 hover:shadow-glow hover:-translate-y-1">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-brand/10 text-brand">
                <Shield size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">Host Controls</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                The room creator keeps the admin control. Decide who has the ability to trigger player events, preventing playback hijacking.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-xl border border-zinc-800 bg-panel/40 p-6 transition-all duration-300 hover:border-brand/40 hover:shadow-glow hover:-translate-y-1">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-brand/10 text-brand">
                <ListMusic size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">Collaborative Queue</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Add YouTube video links or search right from inside the player. Everyone can contribute to build the ultimate watch party playlist.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group rounded-xl border border-zinc-800 bg-panel/40 p-6 transition-all duration-300 hover:border-brand/40 hover:shadow-glow hover:-translate-y-1">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-brand/10 text-brand">
                <MessageSquare size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">Live Room Chat</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                React to clips, chat, and keep the energy going without switching screens. A fully responsive chat sidebar is built into every room.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group rounded-xl border border-zinc-800 bg-panel/40 p-6 transition-all duration-300 hover:border-brand/40 hover:shadow-glow hover:-translate-y-1">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-brand/10 text-brand">
                <Users size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">Private Room Codes</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Generate simple, unique codes to share with friends. Control who enters your session for safe and private viewing.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group rounded-xl border border-zinc-800 bg-panel/40 p-6 transition-all duration-300 hover:border-brand/40 hover:shadow-glow hover:-translate-y-1">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-brand/10 text-brand">
                <Laptop size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">Cross-Device Ready</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Works completely in-browser on mobiles, tablets, and laptops. No downloads, installations, or extensions required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl font-black sm:text-4xl">Get started in three simple steps</h2>
            <p className="text-base text-muted">No configuration required. Set up a watch room in less than a minute.</p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3 relative">
            {/* Step 1 */}
            <div className="text-center relative">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 font-black text-brand text-lg shadow-glow">
                1
              </div>
              <h3 className="text-lg font-bold text-white">Create a Room</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted px-4">
                Sign in, hit "Create Room", and get a unique party room code generated instantly.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center relative">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 font-black text-brand text-lg shadow-glow">
                2
              </div>
              <h3 className="text-lg font-bold text-white">Invite Your Friends</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted px-4">
                Share the short code with your squad. They can paste it and join your session from any browser.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center relative">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 font-black text-brand text-lg shadow-glow">
                3
              </div>
              <h3 className="text-lg font-bold text-white">Watch & Control</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted px-4">
                Search videos, queue up your favorites, chat, and watch playback transition in lockstep harmony.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) Section */}
      <section id="about" className="scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-zinc-800/80 bg-panel/50 p-8 sm:p-12 lg:p-16 relative overflow-hidden text-center shadow-glow">
          {/* Radial bg glow inside CTA card */}
          <div className="absolute -right-24 -bottom-24 -z-10 h-64 w-64 rounded-full bg-brand/10 blur-[80px]" />
          <div className="absolute -left-24 -top-24 -z-10 h-64 w-64 rounded-full bg-accent/5 blur-[80px]" />

          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-black sm:text-5xl leading-tight">
              Ready to sync up your playlist?
            </h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              Join thousands of users watching shows, music videos, lofi broadcasts, and tutorials together in real-time. Start your Ystream room today.
            </p>
            <div className="pt-4 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/auth?mode=signup">
                <Button variant="primary" className="h-12 w-full px-8 sm:w-auto">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/auth?mode=login">
                <Button variant="ghost" className="h-12 w-full px-8 sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-12 text-center text-sm text-muted">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <BrandMark className="h-8 w-8" />
              <span className="font-black text-white text-base">Ystream</span>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a href="#features" className="hover:text-white transition">Features</a>
              <a href="#how-it-works" className="hover:text-white transition">How it Works</a>
              <Link to="/auth" className="hover:text-white transition">Authentication</Link>
            </div>
          </div>

          <div className="h-px bg-zinc-800/50" />

          {/* Credits & copyright */}
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row text-xs">
            <p>Built with MERN, Tailwind CSS, Firebase and Socket.io.</p>
            <CopyrightBadge />
          </div>
        </div>
      </footer>
    </main>
  );
}
