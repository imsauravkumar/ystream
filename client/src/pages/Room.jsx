import { Check, Copy, LogOut, Radio } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import BrandMark from "../components/BrandMark.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import CopyrightBadge from "../components/CopyrightBadge.jsx";
import SearchPanel from "../components/SearchPanel.jsx";
import Sidebar from "../components/Sidebar.jsx";
import YouTubePlayer from "../components/YouTubePlayer.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { getBackendConfigMessage } from "../lib/config.js";
import { getRoom } from "../lib/api.js";
import { createSocket } from "../lib/socket.js";
import { getUserProfile } from "../utils/room.js";

export default function Room() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [room, setRoom] = useState(null);
  const [users, setUsers] = useState([]);
  const [queue, setQueue] = useState([]);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState([]);
  const [playback, setPlayback] = useState({ isPlaying: false, timestamp: 0, updatedAt: new Date().toISOString() });
  const [currentVideo, setCurrentVideo] = useState(null);
  const [queueActionPending, setQueueActionPending] = useState(false);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const playerRef = useRef(null);
  const profile = useMemo(() => getUserProfile(user), [user]);
  const isHost = room?.hostUid === user?.uid;
  const canControlPlayback = isHost || room?.playbackControllerUids?.includes(user?.uid);

  useEffect(() => {
    if (!roomCode || roomCode.toLowerCase() === "undefined" || roomCode.toLowerCase() === "null") {
      toast.error("Invalid room code. Returning to dashboard.");
      navigate("/dashboard", { replace: true });
      return;
    }

    let alive = true;
    getRoom(roomCode)
      .then(({ data }) => {
        if (!alive) return;
        setRoom(data.room);
        setQueue(data.room.queue || []);
        setPlayback((currentPlayback) => data.room.playback || currentPlayback);
        setCurrentVideo(data.room.currentVideo || null);
      })
      .catch((error) => toast.error(error.response?.data?.message || getBackendConfigMessage()));
    return () => {
      alive = false;
    };
  }, [roomCode, navigate]);

  useEffect(() => {
    if (!roomCode || roomCode.toLowerCase() === "undefined" || roomCode.toLowerCase() === "null") {
      return;
    }

    let nextSocket;
    let alive = true;

    createSocket().then((created) => {
      if (!alive) {
        created.disconnect();
        return;
      }
      nextSocket = created;
      setSocket(created);

      created.on("connect", () => {
        setConnected(true);
        created.timeout(7000).emit("join-room", { roomCode, user: profile }, (error, response) => {
          if (error) {
            toast.error("Room join timed out. Check the Railway backend logs and URL.");
            return;
          }
          if (!response?.ok) {
            toast.error(response?.message || "Could not join room.");
          }
        });
      });
      created.on("disconnect", () => setConnected(false));
      created.on("room-state", (state) => {
        setRoom(state.room);
        setUsers(state.users);
        setQueue(state.room.queue || []);
        setPlayback(state.room.playback);
        setCurrentVideo(state.room.currentVideo);
      });
      created.on("users-update", setUsers);
      created.on("queue-update", setQueue);
      created.on("sync-state", ({ playback: nextPlayback, currentVideo: nextVideo }) => {
        setPlayback(nextPlayback);
        setCurrentVideo(nextVideo);
      });
      created.on("chat-message", (message) => setMessages((items) => [...items.slice(-80), message]));
      created.on("typing", setTyping);
      created.on("reaction", ({ user: reactionUser, emoji }) => toast(`${reactionUser.name} reacted ${emoji}`));
      created.on("error-message", (message) => toast.error(message));
      created.on("connect_error", (error) => toast.error(error?.message || getBackendConfigMessage()));
    });

    return () => {
      alive = false;
      nextSocket?.disconnect();
    };
  }, [roomCode, profile]);

  useEffect(() => {
    if (!socket || !isHost) return;
    const interval = window.setInterval(() => {
      const timestamp = playerRef.current?.getCurrentTime?.();
      socket.emit("sync-state", {
        roomCode,
        timestamp: Number.isFinite(Number(timestamp)) ? timestamp : playback.timestamp,
        isPlaying: playback.isPlaying
      });
    }, 5000);
    return () => window.clearInterval(interval);
  }, [socket, isHost, roomCode, playback.isPlaying, playback.timestamp]);

  useEffect(() => {
    function confirmBeforeUnload(event) {
      event.preventDefault();
      event.returnValue = "";
    }

    window.addEventListener("beforeunload", confirmBeforeUnload);
    return () => window.removeEventListener("beforeunload", confirmBeforeUnload);
  }, []);

  const emitPlayback = useCallback(
    (eventName, payload = {}) => {
      if (!socket || !canControlPlayback) {
        toast.error("The host has not allowed you to control playback.");
        return;
      }
      socket.emit(eventName, { roomCode, ...payload });
    },
    [socket, canControlPlayback, roomCode]
  );

  const emitQueueUpdate = useCallback(
    (payload) =>
      new Promise((resolve, reject) => {
        if (!socket?.connected) {
          reject(new Error("Room connection is not ready yet. Please try again."));
          return;
        }

        socket.timeout(7000).emit("queue-update", { roomCode, ...payload }, (error, response) => {
          if (error) {
            reject(new Error("Room server connection failed. Check your backend URL."));
            return;
          }

          if (!response?.ok) {
            reject(new Error(response?.message || "Queue update failed."));
            return;
          }

          resolve(response);
        });
      }),
    [socket, roomCode]
  );

  async function addToQueue(video) {
    if (!canControlPlayback) {
      toast.error("The host has not allowed you to add or play songs.");
      return;
    }
    if (queueActionPending) return;

    setQueueActionPending(true);
    try {
      const response = await emitQueueUpdate({ action: "add", video });
      setQueue(response.queue || []);
      setPlayback(response.playback || playback);
      setCurrentVideo(response.currentVideo || null);
      toast.success(currentVideo ? "Added to queue." : "Starting video.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setQueueActionPending(false);
    }
  }

  async function removeFromQueue(index) {
    if (!canControlPlayback) {
      toast.error("The host has not allowed you to manage playback.");
      return;
    }
    if (queueActionPending) return;

    setQueueActionPending(true);
    try {
      const response = await emitQueueUpdate({ action: "remove", index });
      setQueue(response.queue || []);
      setPlayback(response.playback || playback);
      setCurrentVideo(response.currentVideo || null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setQueueActionPending(false);
    }
  }

  async function playNext() {
    if (!canControlPlayback) {
      toast.error("The host has not allowed you to control playback.");
      return;
    }
    if (queueActionPending) return;

    setQueueActionPending(true);
    try {
      const response = await emitQueueUpdate({ action: "next" });
      setQueue(response.queue || []);
      setPlayback(response.playback || playback);
      setCurrentVideo(response.currentVideo || null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setQueueActionPending(false);
    }
  }

  async function playPrevious() {
    if (!canControlPlayback) {
      toast.error("The host has not allowed you to control playback.");
      return;
    }
    if (queueActionPending) return;

    setQueueActionPending(true);
    try {
      const response = await emitQueueUpdate({ action: "previous" });
      setQueue(response.queue || []);
      setPlayback(response.playback || playback);
      setCurrentVideo(response.currentVideo || null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setQueueActionPending(false);
    }
  }

  function updatePlaybackPermission(targetUid, allowed) {
    if (!isHost) return;
    socket?.emit("update-playback-permission", { roomCode, targetUid, allowed });
  }

  function handleCopyRoomCode() {
    const code = room?.code || roomCode;
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success(`Room code ${code} copied!`);
    setTimeout(() => setCopied(false), 2000);
  }

  function leaveRoom() {
    setLeaveDialogOpen(true);
  }

  function confirmLeaveRoom() {
    socket?.disconnect();
    navigate("/dashboard");
  }

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#09090b] px-3 py-4 text-zinc-100 sm:px-6 lg:px-8 font-sans">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(244,63,94,0.1),rgba(99,102,241,0.05),transparent)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[94rem] flex-col gap-4">
        {/* Header */}
        <header className="mx-auto flex w-full items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 backdrop-blur-xl sm:px-6">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <BrandMark className="h-8 w-8 shrink-0 text-white" />
            <div className="flex min-w-0 items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">Ystream</span>

              {/* Room Code Badge */}
              <button
                onClick={handleCopyRoomCode}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs font-semibold tracking-widest text-white/90 hover:bg-white/10 hover:border-white/20 transition-all"
                title="Click to copy room code"
              >
                <span>{room?.code || roomCode}</span>
                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} className="text-zinc-400" />}
              </button>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {/* Status indicator */}
            <div className="hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-400">
              {connected ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                  <span className="text-zinc-300">Synced</span>
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-rose-400 animate-ping" />
                  <span className="text-zinc-400">Connecting</span>
                </>
              )}
            </div>
            <button
              className="flex h-9 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-xs font-medium text-zinc-400 transition-all hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-300"
              title="Leave room"
              onClick={leaveRoom}
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Leave</span>
            </button>
          </div>
        </header>

        {/* Main Watch Theater Grid */}
        <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_25rem]">
          {/* Main Stage (Player & Search) */}
          <div className="min-w-0 space-y-4">
            <YouTubePlayer
              currentVideo={currentVideo}
              playback={playback}
              canControl={canControlPlayback}
              canAutoAdvance={isHost}
              onLocalEvent={emitPlayback}
              onPrevious={playPrevious}
              onNext={playNext}
              onPlayerReady={(player) => {
                playerRef.current = player;
              }}
            />

            {!canControlPlayback && (
              <div className="rounded-2xl border border-white/10 bg-zinc-900/30 px-4 py-3 text-xs text-zinc-400 flex items-center gap-2 backdrop-blur-md">
                <Radio size={14} className="text-rose-400" />
                <span>The host is currently managing playback for this room.</span>
              </div>
            )}

            <SearchPanel
              hasCurrentVideo={Boolean(currentVideo)}
              adding={queueActionPending}
              canAdd={canControlPlayback}
              onAdd={addToQueue}
            />
          </div>

          {/* Sidebar (Room Stats, Members, Queue, Chat) */}
          <Sidebar
            room={room}
            currentUserUid={user?.uid}
            isHost={isHost}
            users={users}
            queue={queue}
            messages={messages}
            typingUsers={typing.filter((name) => name !== profile.name)}
            onSendMessage={(text) => socket?.emit("chat-message", { roomCode, text })}
            onTyping={(isTyping) => socket?.emit("typing", { roomCode, isTyping })}
            onReaction={(emoji) => socket?.emit("reaction", { roomCode, emoji })}
            onRemoveFromQueue={removeFromQueue}
            onUpdatePlaybackPermission={updatePlaybackPermission}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-8 flex justify-center pb-6">
        <CopyrightBadge />
      </footer>

      {/* Confirmation Modal */}
      <ConfirmDialog
        open={leaveDialogOpen}
        title="Leave watch room?"
        message="You will disconnect from this synchronized streaming session and return to your dashboard."
        confirmLabel="Leave Room"
        cancelLabel="Stay in Room"
        onCancel={() => setLeaveDialogOpen(false)}
        onConfirm={confirmLeaveRoom}
      />
    </main>
  );
}
