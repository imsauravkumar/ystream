import { motion } from "framer-motion";
import { ArrowRight, Laptop, ListMusic, MessageSquare, Play, Shield, Users, Zap } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import BrandMark from "../components/BrandMark.jsx";
import Button from "../components/Button.jsx";
import CopyrightBadge from "../components/CopyrightBadge.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Landing() {
  const { user, loading } = useAuth();

  // If user is already logged in, redirect them directly to the dashboard
  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#09090b] text-zinc-100 selection:bg-rose-500/30 selection:text-rose-300 font-sans">
      {/* Ambient Theater Depth & Grid Glow */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(244,63,94,0.12),rgba(99,102,241,0.06),rgba(0,0,0,0))]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,#000_70%,transparent_100%)]" />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#09090b]/80 backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 min-w-0 group">
            <BrandMark className="h-8 w-8 shrink-0 transition-transform group-hover:scale-105 sm:h-9 sm:w-9 text-white" />
            <div className="min-w-0">
              <p className="truncate text-lg font-bold tracking-tight text-white leading-none">Ystream</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-400">Sync Watch</p>
            </div>
          </Link>

          {/* Center Links (Desktop only) */}
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-xs font-medium text-zinc-400 transition-colors hover:text-white">
              Features
            </a>
            <a href="#how-it-works" className="text-xs font-medium text-zinc-400 transition-colors hover:text-white">
              How It Works
            </a>
            <a href="#about" className="text-xs font-medium text-zinc-400 transition-colors hover:text-white">
              About
            </a>
          </nav>

          {/* Right Controls */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link to="/auth?mode=login">
              <Button variant="ghost" className="h-9 px-3.5 text-xs font-medium text-zinc-300 hover:text-white sm:h-9 sm:px-4">
                Login
              </Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button
                variant="primary"
                className="h-9 px-4 text-xs font-semibold sm:h-9 sm:px-5 shadow-[0_0_20px_rgba(244,63,94,0.3)] bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white border-0"
              >
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 pt-10 pb-12 text-center sm:px-6 sm:pt-14 sm:pb-16 lg:px-8">
        {/* Glow Spheres */}
        <div className="pointer-events-none absolute left-1/2 top-6 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-rose-500/15 blur-[120px] sm:h-[400px] sm:w-[400px]" />
        <div className="pointer-events-none absolute right-10 top-20 -z-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-[100px]" />

        <div className="mx-auto max-w-4xl space-y-4 sm:space-y-6">
          {/* Eyebrow Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-400"
          >
            Zero-lag watch parties with friends
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08]"
          >
            <span className="bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Watch YouTube Together in{" "}
            </span>
            <span className="bg-gradient-to-r from-rose-400 via-rose-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(244,63,94,0.3)]">
              Perfect Sync
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed text-zinc-400"
          >
            Host private rooms for your friends, queue Bollywood songs, Coke Studio jams, cricket podcasts & comedy streams, and chat live with zero lag and zero drift.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col items-center justify-center gap-3 pt-1 sm:flex-row sm:pt-2"
          >
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button
                variant="primary"
                className="h-11 w-full px-7 text-sm font-semibold tracking-wide shadow-[0_0_25px_rgba(244,63,94,0.35)] bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white border-0 sm:w-auto rounded-full"
              >
                Create Watch Room <ArrowRight size={15} className="ml-1.5" />
              </Button>
            </Link>
            <a href="#features" className="w-full sm:w-auto">
              <Button
                variant="ghost"
                className="h-11 w-full px-6 text-sm font-medium text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/[0.05] sm:w-auto rounded-full"
              >
                Explore Features
              </Button>
            </a>
          </motion.div>

          {/* Quick Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 pt-2 text-xs font-medium text-zinc-400"
          >
            <span>⚡ 0ms Drift Engine</span>
            <span className="text-zinc-700 hidden sm:inline">•</span>
            <span>☕ Collaborative Queue</span>
            <span className="text-zinc-700 hidden sm:inline">•</span>
            <span>💬 Live Chat & Reactions</span>
            <span className="text-zinc-700 hidden sm:inline">•</span>
            <span>📱 Works on Mobile & PC</span>
          </motion.div>
        </div>

        {/* Mock UI Showcase with 3D Perspective */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-8 max-w-6xl w-full px-0 sm:mt-10 sm:px-2 [transform:perspective(1200px)_rotateX(1.5deg)]"
        >
          <div className="w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-zinc-950/90 shadow-[0_0_80px_rgba(0,0,0,0.8),0_0_40px_rgba(244,63,94,0.12)] backdrop-blur-xl">
            {/* Window bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-zinc-900/60 px-4 py-2.5 sm:px-5">
              <div className="flex items-center gap-2 shrink-0">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="max-w-[160px] truncate rounded-full border border-white/10 bg-black/60 px-3 py-0.5 text-xs font-mono text-zinc-400 sm:max-w-none">
                ystream.live/room/CHAI-99
              </div>
              <div className="flex items-center shrink-0">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Synced
                </span>
              </div>
            </div>

            {/* Layout grid mockup */}
            <div className="grid grid-cols-1 gap-4 p-3.5 sm:p-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
              {/* Left Column: Player & Queue */}
              <div className="min-w-0 w-full space-y-3.5">
                {/* Simulated Player Frame */}
                <div className="relative aspect-video w-full rounded-2xl border border-white/10 bg-[#09090b] overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 group shadow-inner">
                  {/* Overlay Thumbnail/Background */}
                  <div className="absolute inset-0 bg-cover bg-center opacity-40 bg-[url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800')]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-black/40 to-black/80" />

                  {/* Top Bar inside Player */}
                  <div className="relative flex items-center justify-between gap-2 w-full min-w-0">
                    <div className="min-w-0 flex-1 rounded-xl bg-black/70 px-2.5 py-1 text-left backdrop-blur-md border border-white/10">
                      <p className="truncate text-xs sm:text-sm font-semibold text-white">Kesariya (Lofi Flip) - Arijit Singh</p>
                      <p className="truncate text-[10px] text-rose-400 font-medium">Bollywood Chill Sessions</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-rose-500/30 bg-rose-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-rose-300">
                      Host: Saurav
                    </span>
                  </div>

                  {/* Play Center Icon */}
                  <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-white shadow-[0_0_25px_rgba(244,63,94,0.5)] transition-transform group-hover:scale-110 sm:h-14 sm:w-14">
                    <Play className="fill-white text-white ml-0.5" size={18} />
                  </div>

                  {/* Bottom Controls Bar inside Player */}
                  <div className="relative flex flex-col gap-1.5 bg-black/70 rounded-xl p-2 backdrop-blur-md border border-white/10 min-w-0">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-[10px] font-mono text-zinc-300 shrink-0">01:42 / 03:55</span>
                      <div className="h-1.5 flex-1 min-w-0 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full w-2/5 bg-gradient-to-r from-rose-500 to-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 shrink-0">-02:13</span>
                    </div>
                  </div>
                </div>

                {/* Queue list mockup - Indian Tracks */}
                <div className="rounded-2xl border border-white/10 bg-black/40 p-3.5 text-left min-w-0 w-full backdrop-blur-md">
                  <div className="mb-2.5 flex items-center justify-between border-b border-white/5 pb-2 gap-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 truncate min-w-0">
                      <ListMusic size={14} className="text-rose-400 shrink-0" /> Up Next (3 tracks)
                    </p>
                    <span className="text-[10px] font-semibold text-rose-400 shrink-0">Shared Queue</span>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] p-1.5 sm:p-2 min-w-0 transition hover:border-white/15 hover:bg-white/[0.04]">
                      <span className="text-[10px] font-mono text-zinc-500 shrink-0">01</span>
                      <div className="h-8 w-11 shrink-0 rounded-lg bg-zinc-900 bg-cover bg-center border border-white/10" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=150')` }} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-white">Coke Studio - Pasoori Nu (Acoustic)</p>
                        <p className="truncate text-[10px] text-zinc-400">Queued by Ananya • 3:45</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] p-1.5 sm:p-2 min-w-0 transition hover:border-white/15 hover:bg-white/[0.04] opacity-80">
                      <span className="text-[10px] font-mono text-zinc-500 shrink-0">02</span>
                      <div className="h-8 w-11 shrink-0 rounded-lg bg-zinc-900 bg-cover bg-center border border-white/10" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=150')` }} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-white">Brown Munde x Insane (Lofi Chill Mix)</p>
                        <p className="truncate text-[10px] text-zinc-400">Queued by Rohan • 4:18</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] p-1.5 sm:p-2 min-w-0 transition hover:border-white/15 hover:bg-white/[0.04] opacity-60">
                      <span className="text-[10px] font-mono text-zinc-500 shrink-0">03</span>
                      <div className="h-8 w-11 shrink-0 rounded-lg bg-zinc-900 bg-cover bg-center border border-white/10" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=150')` }} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-white">Tu Jaane Na - Atif Aslam | Hindi Lofi</p>
                        <p className="truncate text-[10px] text-zinc-400">Queued by Priya • 5:10</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Simulated Live Chat */}
              <div className="flex flex-col rounded-2xl border border-white/10 bg-black/40 p-3.5 sm:p-4 text-left min-w-0 w-full backdrop-blur-md">
                <p className="mb-2.5 border-b border-white/5 pb-2 text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-rose-400 truncate min-w-0">
                    <MessageSquare size={14} className="shrink-0" /> Room Chat (4 online)
                  </span>
                  <span className="text-[10px] text-emerald-400 shrink-0">Live</span>
                </p>
                <div className="flex-1 space-y-2 py-1 text-xs font-medium min-w-0">
                  <div className="break-words">
                    <span className="font-semibold text-emerald-400">Saurav (Host): </span>
                    <span className="text-zinc-200">Bhai log, chai le aao! Arijit ka new lofi version play kiya hai ☕</span>
                  </div>
                  <div className="break-words">
                    <span className="font-semibold text-rose-400">Ananya: </span>
                    <span className="text-zinc-200">Kya baat hai! Video sync ekdum zero delay chal raha hai 🔥</span>
                  </div>
                  <div className="break-words">
                    <span className="font-semibold text-indigo-400">Rohan: </span>
                    <span className="text-zinc-200">Queue mein AP Dhillon ka acoustic track add kar diya maine!</span>
                  </div>
                  <div className="rounded-xl bg-white/[0.04] border border-white/10 p-1.5 text-[11px] text-zinc-300 break-words">
                    <span className="font-semibold text-rose-400">System: </span>
                    <span>Saurav paused at 01:42 for snack break.</span>
                  </div>
                  <div className="break-words">
                    <span className="font-semibold text-amber-400">Priya: </span>
                    <span className="text-zinc-200">Volume mere end pe perfectly sync ho gayi, next track play karo! 🚀</span>
                  </div>
                </div>
                <div className="mt-2.5 flex gap-2">
                  <input
                    disabled
                    className="h-9 flex-1 min-w-0 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-xs text-zinc-400 outline-none"
                    placeholder="Message squad..."
                  />
                  <button disabled className="h-9 px-3.5 rounded-xl bg-rose-500 text-white text-xs font-semibold shrink-0">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="scroll-mt-20 border-t border-white/10 bg-zinc-950/40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center max-w-3xl mx-auto space-y-3"
          >
            <motion.p variants={itemVariants} className="text-xs font-bold uppercase tracking-[0.2em] text-rose-400">
              Features Crafted for Watch Parties
            </motion.p>
            <motion.h2 variants={itemVariants} className="text-2xl font-extrabold sm:text-4xl text-white tracking-tight">
              Everything your squad needs for uninterrupted sync
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Built on React, Tailwind, Firebase Authentication, and high-frequency Socket.IO so your group never suffers audio lag or drift.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {/* Feature 1 */}
            <motion.div variants={itemVariants} className="group rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-900/30 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-rose-500/40 hover:bg-white/[0.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-400 transition-colors group-hover:bg-rose-500/20 group-hover:text-rose-300">
                <Zap size={20} />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">Zero Drift Real-Time Sync</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Socket events broadcast play, pause, and scrub actions instantly. Everyone watches Bollywood movies, cricket highlights, or music videos at the exact same millisecond.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={itemVariants} className="group rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-900/30 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-rose-500/40 hover:bg-white/[0.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-400 transition-colors group-hover:bg-rose-500/20 group-hover:text-rose-300">
                <Shield size={20} />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">Host & Squad Controls</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                The room creator stays in control of the remote. Grant DJ permissions to your friends with one tap or keep it host-controlled to prevent skipping.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={itemVariants} className="group rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-900/30 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-rose-500/40 hover:bg-white/[0.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-400 transition-colors group-hover:bg-rose-500/20 group-hover:text-rose-300">
                <ListMusic size={20} />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">Collaborative Chai Queue</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Search any song on YouTube directly inside Ystream or paste video links. Everyone adds their favorite tracks to build the ultimate watch party playlist.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div variants={itemVariants} className="group rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-900/30 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-rose-500/40 hover:bg-white/[0.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-400 transition-colors group-hover:bg-rose-500/20 group-hover:text-rose-300">
                <MessageSquare size={20} />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">Live Desi Chat & Reactions</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Spam reactions, share timestamps, and joke with your friends while watching without having to switch over to WhatsApp or Discord.
              </p>
            </motion.div>

            {/* Feature 5 */}
            <motion.div variants={itemVariants} className="group rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-900/30 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-rose-500/40 hover:bg-white/[0.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-400 transition-colors group-hover:bg-rose-500/20 group-hover:text-rose-300">
                <Users size={20} />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">6-Letter Room Codes</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Quick room codes like <code>DELHI-07</code> or <code>CHAI-99</code> make it effortless to invite friends across WhatsApp groups in seconds.
              </p>
            </motion.div>

            {/* Feature 6 */}
            <motion.div variants={itemVariants} className="group rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-900/30 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-rose-500/40 hover:bg-white/[0.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-400 transition-colors group-hover:bg-rose-500/20 group-hover:text-rose-300">
                <Laptop size={20} />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">Cross-Device Ready</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Works directly in modern web browsers on iPhone, Android, iPad, Mac, and Windows. No downloads, extensions, or setup required.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="scroll-mt-20 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center max-w-3xl mx-auto space-y-3"
          >
            <motion.h2 variants={itemVariants} className="text-2xl font-extrabold sm:text-4xl text-white tracking-tight">
              Get started in three simple steps
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xs sm:text-sm text-zinc-400">
              No extensions or complex configuration. Start watching in under 30 seconds.
            </motion.p>
          </motion.div>

          <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 md:grid-cols-3">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-900/30 p-6 text-center backdrop-blur-xl hover:border-white/20 transition-colors"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/10 font-bold text-rose-400 text-base shadow-[0_0_20px_rgba(244,63,94,0.2)]">
                1
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">Create a Room</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400 px-2">
                Sign in with Google or Email, click &quot;Create Room&quot;, and get your unique party code instantly.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-900/30 p-6 text-center backdrop-blur-xl hover:border-white/20 transition-colors"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/10 font-bold text-rose-400 text-base shadow-[0_0_20px_rgba(244,63,94,0.2)]">
                2
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">Share with Squad</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400 px-2">
                Drop the room code in your WhatsApp group. Friends join instantly from their phones or laptops.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-900/30 p-6 text-center backdrop-blur-xl hover:border-white/20 transition-colors"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/10 font-bold text-rose-400 text-base shadow-[0_0_20px_rgba(244,63,94,0.2)]">
                3
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">Sync & Chill</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400 px-2">
                Search YouTube, add songs to queue, text in chat, and enjoy synchronized playback without lag.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) Section */}
      <section id="about" className="scroll-mt-20 px-4 py-10 sm:py-14 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl rounded-3xl border border-white/15 bg-gradient-to-b from-zinc-900/60 to-black/80 p-6 sm:p-10 lg:p-14 relative overflow-hidden text-center shadow-[0_0_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
        >
          {/* Radial bg glow inside CTA card */}
          <div className="pointer-events-none absolute -right-20 -bottom-20 -z-10 h-64 w-64 rounded-full bg-rose-500/15 blur-[90px]" />
          <div className="pointer-events-none absolute -left-20 -top-20 -z-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-[90px]" />

          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-5">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready for the ultimate watch party?
            </h2>
            <p className="mx-auto max-w-xl text-xs sm:text-sm leading-relaxed text-zinc-300">
              Join thousands of users streaming shows, music videos, study lofi, and gaming streams together in real-time. Start your Ystream room today.
            </p>
            <div className="pt-2 sm:pt-3 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/auth?mode=signup" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  className="h-11 w-full px-8 font-semibold text-sm shadow-[0_0_25px_rgba(244,63,94,0.35)] bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white border-0 sm:w-auto rounded-full"
                >
                  Create Free Account
                </Button>
              </Link>
              <Link to="/auth?mode=login" className="w-full sm:w-auto">
                <Button
                  variant="ghost"
                  className="h-11 w-full px-7 font-medium text-sm text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/[0.05] sm:w-auto rounded-full"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#09090b] py-8 sm:py-10 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <BrandMark className="h-7 w-7 text-white" />
              <span className="font-bold text-white text-base tracking-tight">Ystream</span>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
              <Link to="/auth" className="hover:text-white transition-colors">Authentication</Link>
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* Credits & copyright */}
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row text-xs text-zinc-500">
            <p>Crafted with ❤️ for watch parties & music lovers across India</p>
            <CopyrightBadge />
          </div>
        </div>
      </footer>
    </main>
  );
}




