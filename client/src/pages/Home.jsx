import { motion } from "framer-motion";
import { ArrowRight, Check, Copy, Hash, LogOut, Pencil, Plus, Radio } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BrandMark from "../components/BrandMark.jsx";
import Button from "../components/Button.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import CopyrightBadge from "../components/CopyrightBadge.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { getBackendConfigMessage } from "../lib/config.js";
import { createRoom } from "../lib/api.js";
import { logout } from "../lib/firebase.js";
import { getReadableFirebaseError } from "../utils/firebaseErrors.js";
import { generateRoomCode, normalizeRoomCode } from "../utils/room.js";

export default function Home() {
  const navigate = useNavigate();
  const { user, loading, updateName } = useAuth();
  const [joinCode, setJoinCode] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [copiedPreview, setCopiedPreview] = useState(false);
  const [signOutDialogOpen, setSignOutDialogOpen] = useState(false);
  const [editNameOpen, setEditNameOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [isSavingName, setIsSavingName] = useState(false);

  const handleSaveName = async (e) => {
    e?.preventDefault();
    if (!nameInput.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setIsSavingName(true);
    try {
      if (updateName) {
        await updateName(nameInput.trim());
      }
      toast.success("Display name updated!");
      setEditNameOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update name");
    } finally {
      setIsSavingName(false);
    }
  };

  const previewCode = useMemo(() => generateRoomCode(), []);

  const handleCreateRoom = async () => {
    setIsCreating(true);
    try {
      const { data } = await createRoom({ hostName: user?.displayName || "Host" });
      const roomCode = data?.room?.code || previewCode;
      toast.success("Room created!");
      navigate(`/room/${roomCode}`);
    } catch (error) {
      console.error(error);
      const isNetworkError = !error?.response;
      if (isNetworkError) {
        toast.error(getBackendConfigMessage(), { duration: 6000 });
      } else {
        toast.error(error?.response?.data?.message || "Failed to create room.");
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinRoom = (event) => {
    event.preventDefault();
    const clean = normalizeRoomCode(joinCode);
    if (clean.length < 4) {
      toast.error("Please enter a valid room code.");
      return;
    }
    setIsJoining(true);
    navigate(`/room/${clean}`);
  };

  const handleCopyPreview = async () => {
    try {
      await navigator.clipboard.writeText(previewCode);
      setCopiedPreview(true);
      toast.success("Room code copied to clipboard!");
      setTimeout(() => setCopiedPreview(false), 2000);
    } catch {
      toast.error("Failed to copy code.");
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (err) {
      toast.error(getReadableFirebaseError(err, "Failed to sign out"));
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#09090b] text-zinc-100 selection:bg-rose-500 selection:text-white px-4 sm:px-6">
      {/* Dynamic Background Atmosphere */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-rose-600/15 blur-[130px]" />
        <div className="absolute top-1/3 -left-32 h-[450px] w-[450px] rounded-full bg-rose-500/10 blur-[120px]" />
        <div className="absolute top-1/2 -right-32 h-[450px] w-[450px] rounded-full bg-indigo-600/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Top Navbar */}
      <header className="relative z-20 mx-auto max-w-6xl pt-5">
        <nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-3 backdrop-blur-xl sm:px-6">
          <BrandMark showBadge={false} />

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {user && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setNameInput(user.displayName || user.email?.split("@")[0] || "");
                    setEditNameOpen(true);
                  }}
                  className="group flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-xs text-zinc-300 transition-all hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-white cursor-pointer"
                  title="Click to edit display name"
                >
                  <div className="grid h-6 w-6 place-items-center rounded-lg bg-rose-500/20 text-[11px] font-bold text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                    {(user.displayName || user.email || "U")[0].toUpperCase()}
                  </div>
                  <span className="hidden sm:inline-block text-xs font-semibold text-zinc-200 group-hover:text-white">
                    {user.displayName || user.email?.split("@")[0]}
                  </span>
                  <Pencil size={11} className="text-zinc-500 group-hover:text-rose-400 transition-colors ml-0.5" />
                </button>
                <button
                  onClick={() => setSignOutDialogOpen(true)}
                  className="flex h-9 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-xs font-medium text-zinc-400 transition-all hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-300 cursor-pointer"
                  title="Sign out"
                >
                  <LogOut size={13} />
                  <span className="hidden sm:inline">Sign out</span>
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-12rem)] max-w-5xl flex-col justify-center gap-8 py-8 sm:py-14">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-medium text-zinc-300 backdrop-blur-md">
            <Radio size={12} className="text-rose-400 animate-pulse" />
            <span>Real-time synchronized streaming</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            <span className="bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Watch together.{" "}
            </span>
            <span className="bg-gradient-to-r from-rose-400 via-rose-300 to-indigo-300 bg-clip-text text-transparent">
              Every single beat.
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Start a new synchronized watch room or enter a 6-digit code to join your friends instantly.
          </p>
        </motion.div>

        {/* Primary Action Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Create Room Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, transition: { duration: 0.25, ease: "easeOut" } }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative rounded-3xl border border-white/10 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:border-rose-500/40 hover:bg-zinc-900/60 hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.22)] cursor-default"
          >
            {/* Ambient card top-glow */}
            <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-b from-rose-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-rose-400/80 transition-colors">
                  01 / Host Session
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 transition-all duration-300 group-hover:scale-110 group-hover:border-rose-500/40 group-hover:bg-rose-500/20 shadow-sm">
                  <Radio size={15} />
                </span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-rose-50 transition-colors">
                  Host a Watch Room
                </h2>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  Generate a private room instantly. You'll have host privileges to manage playback, permissions, and the shared playlist queue.
                </p>
              </div>

              {/* Code Preview Box */}
              <div className="rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur-sm space-y-2 transition-all group-hover:border-white/20">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="text-[11px] font-medium tracking-wide uppercase text-zinc-500">Auto-Generated Code</span>
                  <button
                    onClick={handleCopyPreview}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium text-zinc-300 transition-all hover:scale-105 active:scale-95 hover:border-white/25 hover:bg-white/10 hover:text-white cursor-pointer"
                    title="Copy preview code"
                  >
                    {copiedPreview ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copiedPreview ? "Copied" : "Copy Code"}</span>
                  </button>
                </div>
                <div className="rounded-xl border border-white/5 bg-zinc-950/60 py-2.5 text-center font-mono text-2xl font-bold tracking-[0.25em] text-white select-all">
                  {previewCode}
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-1">
              <Button
                className="h-12 w-full text-sm font-semibold tracking-wide rounded-xl shadow-[0_0_25px_rgba(244,63,94,0.3)] bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white cursor-pointer transition-transform active:scale-98"
                disabled={isCreating || loading}
                type="button"
                onClick={handleCreateRoom}
              >
                <Plus size={16} /> Create Room Now
              </Button>
            </div>
          </motion.div>

          {/* Join Room Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, transition: { duration: 0.25, ease: "easeOut" } }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="group relative rounded-3xl border border-white/10 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:border-indigo-500/40 hover:bg-zinc-900/60 hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.22)] cursor-default"
          >
            {/* Ambient card top-glow */}
            <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-indigo-400/80 transition-colors">
                  02 / Join Session
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition-all duration-300 group-hover:scale-110 group-hover:border-indigo-500/40 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 shadow-sm">
                  <Hash size={15} />
                </span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-indigo-50 transition-colors">
                  Join Existing Room
                </h2>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  Have a 6-digit party code from a friend? Paste or type it below to step directly into the theater.
                </p>
              </div>

              {/* Form Input */}
              <div className="rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur-sm space-y-2 transition-all group-hover:border-white/20">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="text-[11px] font-medium tracking-wide uppercase text-zinc-500">Join Code</span>
                  <span className="text-[11px] text-zinc-500 font-mono">6 Characters</span>
                </div>
                <form id="join-form" onSubmit={handleJoinRoom}>
                  <input
                    id="room-code-input"
                    className="h-11 w-full rounded-xl border border-white/15 bg-zinc-950/60 px-4 text-center font-mono text-xl font-bold uppercase tracking-[0.25em] text-white outline-none transition-all placeholder:text-zinc-500 placeholder:font-sans placeholder:text-xs placeholder:tracking-normal placeholder:font-normal focus:border-indigo-500 focus:bg-zinc-950/90 focus:ring-1 focus:ring-indigo-500/30"
                    placeholder="Enter 6-digit join code"
                    maxLength={10}
                    value={joinCode}
                    onChange={(event) => setJoinCode(normalizeRoomCode(event.target.value))}
                  />
                </form>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-1">
              <Button
                className="h-12 w-full text-sm font-semibold tracking-wide rounded-xl shadow-[0_0_25px_rgba(99,102,241,0.3)] bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white cursor-pointer transition-transform active:scale-98"
                disabled={isJoining || loading}
                type="submit"
                form="join-form"
              >
                <ArrowRight size={16} /> Enter Watch Room
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-6 flex justify-center pb-6">
        <CopyrightBadge />
      </footer>

      {/* Sign Out Confirmation Modal */}
      <ConfirmDialog
        open={signOutDialogOpen}
        title="Sign out?"
        message="You will leave your dashboard and return to the sign-in screen."
        confirmLabel="Sign out"
        cancelLabel="Stay signed in"
        onCancel={() => setSignOutDialogOpen(false)}
        onConfirm={handleSignOut}
      />

      {/* Edit Display Name Modal */}
      <Dialog open={editNameOpen} onOpenChange={setEditNameOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Display Name</DialogTitle>
            <DialogDescription>
              Change how your name appears to other viewers in watch party rooms.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveName} className="space-y-4 pt-2">
            <div>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter your name"
                maxLength={30}
                className="h-11 w-full rounded-xl border border-white/15 bg-black/50 px-4 text-sm font-medium text-white outline-none placeholder:text-zinc-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30"
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button
                variant="ghost"
                type="button"
                onClick={() => setEditNameOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={isSavingName}
              >
                {isSavingName ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
