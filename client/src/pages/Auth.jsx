import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, LogIn, Mail, ShieldCheck, User, UserPlus, Users } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import BrandMark from "../components/BrandMark.jsx";
import Button from "../components/Button.jsx";
import CopyrightBadge from "../components/CopyrightBadge.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { loginWithEmail, registerWithEmail, signInWithGoogle } from "../lib/firebase.js";
import { getReadableFirebaseError } from "../utils/firebaseErrors.js";

export default function Auth() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState(() => {
    return searchParams.get("mode") === "signup" ? "signup" : "login";
  });
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    try {
      if (mode === "login") {
        await loginWithEmail(form.email.trim(), form.password);
        toast.success("Welcome back!");
      } else {
        await registerWithEmail({
          name: form.name,
          email: form.email.trim(),
          password: form.password
        });
        toast.success("Account created successfully!");
      }
      navigate("/dashboard");
    } catch (error) {
      toast.error(getReadableFirebaseError(error, "Could not authenticate."));
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    try {
      await signInWithGoogle();
      toast.success("Signed in with Google.");
      navigate("/dashboard");
    } catch (error) {
      toast.error(getReadableFirebaseError(error, "Google sign-in failed."));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#09090b] px-4 py-4 text-zinc-100 sm:px-6 lg:px-8 font-sans">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(244,63,94,0.12),rgba(99,102,241,0.06),transparent)]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,#000_70%,transparent_100%)]" />

      {/* Header */}
      <header className="sticky top-0 z-50 mx-auto max-w-6xl pt-1">
        <nav className="mx-auto flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 backdrop-blur-xl sm:px-6">
          <Link to="/" className="flex items-center gap-3 group">
            <BrandMark className="h-8 w-8 text-white transition-transform group-hover:scale-105" />
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">Ystream</span>
              <span className="hidden sm:inline-block rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                Auth
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* Main Container */}
      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-10rem)] max-w-6xl items-center gap-8 py-8 sm:py-12 lg:grid-cols-[minmax(0,1fr)_28rem] lg:gap-12">
        {/* Left Side: Brand Statement */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-medium text-zinc-300 backdrop-blur-md">
            <span>Zero-lag synchronized cinema</span>
          </div>

          <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
            <span className="bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Watch together. <br className="hidden sm:inline" />
            </span>
            <span className="bg-gradient-to-r from-rose-400 via-rose-300 to-indigo-300 bg-clip-text text-transparent">
              Feel every moment.
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-xs sm:text-sm text-zinc-400 leading-relaxed lg:mx-0">
            Sign in to create private synchronized rooms, invite your squad with a single code, and enjoy real-time playback, shared queue, and live chat.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 pt-1">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/30 p-5 text-left backdrop-blur-xl hover:border-white/20 transition-colors">
              <Users className="mb-2.5 text-rose-400" size={18} />
              <h3 className="text-sm font-bold text-white tracking-tight">Private Party Codes</h3>
              <p className="mt-1 text-xs text-zinc-400 leading-relaxed">Instantly share a 6-digit code with your friends.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-zinc-900/30 p-5 text-left backdrop-blur-xl hover:border-white/20 transition-colors">
              <ShieldCheck className="mb-2.5 text-rose-400" size={18} />
              <h3 className="text-sm font-bold text-white tracking-tight">Host Controls</h3>
              <p className="mt-1 text-xs text-zinc-400 leading-relaxed">Full authority over playback sync and playlist queue.</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl border border-white/10 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.6)]"
        >
          <div className="mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Authentication</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              {mode === "login" ? "Welcome back" : "Create account"}
            </h2>
            <p className="mt-1 text-xs text-zinc-400">
              {mode === "login" ? "Enter your credentials to access your rooms" : "Sign up to start hosting your watch sessions"}
            </p>
          </div>

          {/* Mode Switcher Pill */}
          <div className="mb-6 grid grid-cols-2 gap-1 rounded-full border border-white/10 bg-black/60 p-1">
            <button
              className={`h-9 rounded-full text-xs font-semibold transition-all ${
                mode === "login"
                  ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                  : "text-zinc-400 hover:text-white"
              }`}
              onClick={() => setMode("login")}
              type="button"
            >
              Sign In
            </button>
            <button
              className={`h-9 rounded-full text-xs font-semibold transition-all ${
                mode === "signup"
                  ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                  : "text-zinc-400 hover:text-white"
              }`}
              onClick={() => setMode("signup")}
              type="button"
            >
              Sign Up
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">Your Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <input
                    className="h-11 w-full rounded-2xl border border-white/10 bg-black/50 pl-10 pr-4 text-xs sm:text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-rose-500/50 focus:shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                    placeholder="Saurav Kumar"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <input
                  className="h-11 w-full rounded-2xl border border-white/10 bg-black/50 pl-10 pr-4 text-xs sm:text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-rose-500/50 focus:shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                  placeholder="name@example.com"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <input
                  className="h-11 w-full rounded-2xl border border-white/10 bg-black/50 pl-10 pr-11 text-xs sm:text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-rose-500/50 focus:shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  value={form.password}
                  onChange={(event) => updateField("password", event.target.value)}
                />
                <button
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                  onClick={() => setShowPassword((value) => !value)}
                  title={showPassword ? "Hide password" : "Show password"}
                  type="button"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button
              className="h-11 w-full text-sm font-semibold tracking-wide mt-2 rounded-xl shadow-[0_0_20px_rgba(244,63,94,0.3)]"
              disabled={busy || loading}
              type="submit"
            >
              {mode === "login" ? <LogIn size={16} /> : <UserPlus size={16} />}
              {mode === "login" ? "Sign In to Ystream" : "Create Account"}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs uppercase text-zinc-600">
            <span className="h-px flex-1 bg-white/10" />
            <span>or</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div>
            <Button
              className="h-11 w-full text-xs sm:text-sm font-medium rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white hover:bg-white/[0.06]"
              disabled={busy || loading}
              variant="ghost"
              onClick={handleGoogle}
            >
              <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Continue with Google
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-6 flex justify-center pb-6">
        <CopyrightBadge />
      </footer>
    </main>
  );
}
