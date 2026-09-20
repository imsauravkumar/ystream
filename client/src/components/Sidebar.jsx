import { Crown, KeyRound, ListMusic, MessageSquare, Send, ShieldCheck, Smile, Users, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar.jsx";

export default function Sidebar({
  room,
  currentUserUid,
  isHost,
  users,
  queue,
  messages,
  typingUsers,
  onSendMessage,
  onTyping,
  onReaction,
  onRemoveFromQueue,
  onUpdatePlaybackPermission
}) {
  const [activeTab, setActiveTab] = useState("chat");
  const [message, setMessage] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [showEmojis, setShowEmojis] = useState(false);
  const messagesRef = useRef(null);
  const endRef = useRef(null);

  const emojis = ["🔥", "❤️", "😂", "👏", "🍿", "🎉", "🇮🇳"];

  useEffect(() => {
    const messagesElement = messagesRef.current;
    if (!messagesElement) return;
    const distanceFromBottom = messagesElement.scrollHeight - messagesElement.scrollTop - messagesElement.clientHeight;
    if (distanceFromBottom < 80) {
      messagesElement.scrollTop = messagesElement.scrollHeight;
      if (activeTab === "chat") setUnreadCount(0);
    } else {
      const latestMessage = messages[messages.length - 1];
      if (latestMessage?.user?.uid !== currentUserUid && activeTab !== "chat") {
        setUnreadCount((count) => Math.min(count + 1, 99));
      }
    }
  }, [currentUserUid, messages, activeTab]);

  function handleMessagesScroll() {
    const messagesElement = messagesRef.current;
    if (!messagesElement) return;
    const distanceFromBottom = messagesElement.scrollHeight - messagesElement.scrollTop - messagesElement.clientHeight;
    if (distanceFromBottom < 80 && activeTab === "chat") setUnreadCount(0);
  }

  function send(event) {
    event.preventDefault();
    if (!message.trim()) return;
    onSendMessage(message.trim());
    onTyping(false);
    setMessage("");
  }

  function hasPlaybackPermission(user) {
    return user.uid === room?.hostUid || room?.playbackControllerUids?.includes(user.uid);
  }

  return (
    <aside className="flex flex-col rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-xl h-[700px] xl:h-[calc(100vh-6.5rem)] overflow-hidden">
      {/* Top Room Overview */}
      <div className="p-4 border-b border-white/10 bg-zinc-950/40">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Active Room</p>
            <h2 className="mt-0.5 text-xl font-mono font-black tracking-[0.2em] text-white">{room?.code || "------"}</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-zinc-300">
              <Users size={13} className="text-rose-400" />
              <span>{users.length}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-zinc-300">
              <ListMusic size={13} className="text-rose-400" />
              <span>{queue.length}</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="mt-3 grid grid-cols-3 gap-1 rounded-xl border border-white/10 bg-black/40 p-1">
          <button
            onClick={() => {
              setActiveTab("chat");
              setUnreadCount(0);
            }}
            className={`relative flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition-all ${
              activeTab === "chat"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <MessageSquare size={13} />
            <span>Chat</span>
            {unreadCount > 0 && (
              <span className="h-4 min-w-4 rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("queue")}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition-all ${
              activeTab === "queue"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <ListMusic size={13} />
            <span>Queue</span>
            {queue.length > 0 && (
              <span className="text-[10px] text-zinc-500">({queue.length})</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("people")}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition-all ${
              activeTab === "people"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Users size={13} />
            <span>Squad</span>
            <span className="text-[10px] text-zinc-500">({users.length})</span>
          </button>
        </div>
      </div>

      {/* Tab Content Panel */}
      <div className="flex-1 min-h-0 flex flex-col">
        {/* CHAT TAB */}
        {activeTab === "chat" && (
          <div className="flex flex-col h-full min-h-0">
            {/* Messages Scroll Area */}
            <div
              ref={messagesRef}
              className="scrollbar-soft flex-1 overflow-y-auto p-4 space-y-3 min-h-0"
              onScroll={handleMessagesScroll}
            >
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 text-zinc-500">
                  <MessageSquare size={24} className="mb-2 opacity-40 text-rose-400" />
                  <p className="text-xs font-medium">No messages yet.</p>
                  <p className="text-[11px] text-zinc-600 mt-0.5">Say hi to your watch party squad!</p>
                </div>
              ) : (
                messages.map((item) => (
                  <div key={item.id} className="flex items-start gap-2.5">
                    <Avatar user={item.user} size="sm" />
                    <div className="min-w-0 max-w-[85%] rounded-2xl border border-white/10 bg-zinc-950/60 px-3.5 py-2">
                      <p className="text-[11px] font-bold text-rose-400 truncate">{item.user.name}</p>
                      <p className="break-words text-xs text-zinc-200 mt-0.5 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))
              )}
              <div ref={endRef} />
            </div>

            {/* Typing Indicator */}
            {typingUsers.length > 0 && (
              <div className="px-4 py-1 text-[11px] text-zinc-400 italic">
                {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...
              </div>
            )}

            {/* Emoji Quick Picker Bar */}
            {showEmojis && (
              <div className="flex items-center gap-1.5 px-4 py-2 border-t border-white/10 bg-zinc-950/50">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      onReaction(emoji);
                      setShowEmojis(false);
                    }}
                    className="h-8 w-8 rounded-xl bg-white/5 hover:bg-white/10 hover:scale-110 transition-transform text-base grid place-items-center"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {/* Chat Input Bar */}
            <form onSubmit={send} className="p-3 border-t border-white/10 bg-zinc-950/70 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowEmojis(!showEmojis)}
                className={`h-10 w-10 shrink-0 grid place-items-center rounded-xl border border-white/10 transition-colors ${
                  showEmojis ? "bg-rose-500/20 text-rose-300 border-rose-500/40" : "bg-white/[0.04] text-zinc-400 hover:text-white"
                }`}
                title="Send quick reaction"
              >
                <Smile size={16} />
              </button>

              <input
                className="h-10 min-w-0 flex-1 rounded-xl border border-white/15 bg-black/50 px-3.5 text-xs text-white outline-none placeholder:text-zinc-500 focus:border-rose-500/60 focus:ring-1 focus:ring-rose-500/30"
                placeholder="Message the squad..."
                value={message}
                onChange={(event) => {
                  const nextMessage = event.target.value;
                  setMessage(nextMessage);
                  onTyping(Boolean(nextMessage.trim()));
                }}
                onBlur={() => onTyping(false)}
                onFocus={() => onTyping(Boolean(message.trim()))}
              />

              <button
                type="submit"
                disabled={!message.trim()}
                className="h-10 w-10 shrink-0 grid place-items-center rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-sm hover:from-rose-400 hover:to-rose-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                title="Send message"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        )}

        {/* QUEUE TAB */}
        {activeTab === "queue" && (
          <div className="scrollbar-soft flex-1 overflow-y-auto p-4 space-y-2.5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Up Next</h3>
              <span className="text-xs text-zinc-500">{queue.length} video{queue.length === 1 ? "" : "s"}</span>
            </div>

            {queue.length === 0 ? (
              <div className="h-48 flex flex-col items-center justify-center text-center p-4 text-zinc-500">
                <ListMusic size={24} className="mb-2 opacity-40 text-rose-400" />
                <p className="text-xs font-medium">Queue is empty</p>
                <p className="text-[11px] text-zinc-600 mt-0.5">Use the search bar below the video to add songs & shows.</p>
              </div>
            ) : (
              queue.map((video, index) => (
                <div
                  key={`${video.videoId}-${index}`}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-zinc-950/60 p-2.5 backdrop-blur-md group hover:border-white/20 transition-all"
                >
                  <img
                    className="h-12 w-20 rounded-xl object-cover shrink-0"
                    src={video.thumbnail}
                    alt={video.title}
                  />
                  <div className="min-w-0 flex-1 flex flex-col justify-between py-0.5">
                    <p className="line-clamp-2 text-xs font-semibold text-zinc-200 leading-snug">
                      {video.title}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-zinc-500">#{index + 1}</span>
                      <button
                        className="text-[11px] font-semibold text-rose-400 hover:text-rose-300 transition-colors"
                        onClick={() => onRemoveFromQueue(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* PEOPLE / SQUAD TAB */}
        {activeTab === "people" && (
          <div className="scrollbar-soft flex-1 overflow-y-auto p-4 space-y-2.5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Connected Viewers</h3>
              {isHost && (
                <span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold text-rose-400">
                  Host Controls
                </span>
              )}
            </div>

            {users.map((user) => (
              <div
                key={user.uid}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/60 p-3 backdrop-blur-md"
              >
                <Avatar user={user} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-white">{user.name}</p>
                  <p className="flex items-center gap-1.5 text-[11px] text-zinc-400 mt-0.5">
                    {room?.hostUid === user.uid ? (
                      <span className="flex items-center gap-1 text-rose-400 font-medium">
                        <Crown size={12} /> Room Host
                      </span>
                    ) : hasPlaybackPermission(user) ? (
                      <span className="flex items-center gap-1 text-emerald-400 font-medium">
                        <ShieldCheck size={12} /> Can Control
                      </span>
                    ) : (
                      "Squad Viewer"
                    )}
                  </p>
                </div>

                {isHost && user.uid !== currentUserUid && (
                  <button
                    className={`shrink-0 rounded-xl px-2.5 py-1.5 text-xs font-semibold transition-all border ${
                      hasPlaybackPermission(user)
                        ? "bg-rose-950/60 border-rose-500/40 text-rose-300 hover:bg-rose-900/80"
                        : "bg-white/[0.04] border-white/10 text-zinc-300 hover:bg-white/10"
                    }`}
                    onClick={() => onUpdatePlaybackPermission(user.uid, !hasPlaybackPermission(user))}
                    type="button"
                  >
                    <KeyRound className="mr-1 inline" size={11} />
                    {hasPlaybackPermission(user) ? "Revoke" : "Allow"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
