import { Pause, Play, RotateCcw, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "./Button.jsx";
import { useYouTubePlayer } from "../hooks/useYouTubePlayer.js";

function formatTime(seconds) {
  const safeSeconds = Math.max(0, Math.floor(Number(seconds) || 0));
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = String(safeSeconds % 60).padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

export default function YouTubePlayer({ currentVideo, playback, canControl, canAutoAdvance, onLocalEvent, onPrevious, onNext, onPlayerReady }) {
  const loadedVideoIdRef = useRef(null);
  const lastSeekTimeRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const player = useYouTubePlayer({
    onReady: onPlayerReady,
    onPlay: () => { },
    onPause: () => { },
    onEnded: () => {
      if (canAutoAdvance) onNext();
    }
  });

  function playFromButton() {
    if (!canControl) return;
    player.play();
    onLocalEvent("play-video", { timestamp: player.getCurrentTime() });
  }

  function pauseFromButton() {
    if (!canControl) return;
    player.pause();
    onLocalEvent("pause-video", { timestamp: player.getCurrentTime() });
  }

  function togglePlayback() {
    if (playback?.isPlaying) pauseFromButton();
    else playFromButton();
  }

  function seekToTimestamp(timestamp) {
    if (!canControl) return;
    const nextTimestamp = Math.min(Math.max(Number(timestamp) || 0, 0), duration || Number(timestamp) || 0);
    setProgress(nextTimestamp);
    lastSeekTimeRef.current = Date.now();
    player.seekTo(nextTimestamp);
    onLocalEvent("seek-video", { timestamp: nextTimestamp });
  }

  function toggleMute() {
    if (muted) {
      player.unMute();
      setMuted(false);
    } else {
      player.mute();
      setMuted(true);
    }
  }

  useEffect(() => {
    if (currentVideo) return;
    loadedVideoIdRef.current = null;
    setProgress(0);
    setDuration(0);
  }, [currentVideo]);

  useEffect(() => {
    if (!player.ready || !playback || !currentVideo) return;

    const age = playback.updatedAt ? (Date.now() - new Date(playback.updatedAt).getTime()) / 1000 : 0;
    const expected = playback.isPlaying ? playback.timestamp + Math.max(age, 0) : playback.timestamp;
    const current = player.getCurrentTime();
    const drift = Math.abs(current - expected);
    const playerState = player.getState();
    const isPlayingOrBuffering = playerState === 1 || playerState === 3;

    if (loadedVideoIdRef.current !== currentVideo.videoId) {
      loadedVideoIdRef.current = currentVideo.videoId;
      lastSeekTimeRef.current = Date.now();
      setProgress(expected);
      player.load(currentVideo.videoId, expected, playback.isPlaying);
    } else {
      // Throttle drift seeking to avoid choppy stutters/replays while video is smoothly playing
      if (drift > 3.0 && Date.now() - lastSeekTimeRef.current > 3000) {
        lastSeekTimeRef.current = Date.now();
        player.seekTo(expected);
      }
      if (playback.isPlaying && !isPlayingOrBuffering) player.play();
      if (!playback.isPlaying && playerState !== 2) player.pause();
    }
  }, [currentVideo, playback, player]);

  useEffect(() => {
    if (!player.ready || !currentVideo) return;

    const interval = window.setInterval(() => {
      setProgress(player.getCurrentTime());
      setDuration(player.getDuration());
      setMuted(player.isMuted());
    }, 500);

    return () => window.clearInterval(interval);
  }, [currentVideo, player]);

  if (!currentVideo) {
    return (
      <section className="grid aspect-video min-h-60 w-full max-h-[calc(100vh-12rem)] place-items-center rounded-3xl border border-white/10 bg-zinc-900/30 text-center backdrop-blur-xl shadow-2xl">
        <div className="max-w-sm space-y-3.5 px-6">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.15)]">
            <Play size={24} className="ml-1" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">Search for a video to begin</h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            The first selected video becomes the shared room player for everyone.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-w-0 space-y-3">
      <div className="player-frame aspect-video w-full max-h-[calc(100vh-12rem)] overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
        <div ref={player.containerRef} className="h-full w-full" />
      </div>
      <div className="rounded-2xl border border-white/10 bg-zinc-900/30 p-4 backdrop-blur-xl">
        <div className="space-y-4">
          <div className="min-w-0 text-center">
            <h2 className="truncate text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
              {currentVideo.title}
            </h2>
            <p className="mt-0.5 truncate text-xs text-zinc-400 font-medium">
              {currentVideo.channelTitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button className="h-10 w-10 px-0 rounded-xl" variant="ghost" onClick={toggleMute} title={muted ? "Unmute" : "Mute"}>
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </Button>
            <Button className="h-10 w-10 px-0 rounded-xl" variant="ghost" disabled={!canControl} onClick={() => seekToTimestamp(0)} title="Restart">
              <RotateCcw size={16} />
            </Button>
            <Button className="h-11 w-11 px-0" variant="ghost" disabled={!canControl} onClick={onPrevious} title="Previous song">
              <SkipBack size={18} />
            </Button>
            <Button className="h-12 min-h-12 w-12 rounded-full px-0" disabled={!canControl} onClick={togglePlayback} title={playback?.isPlaying ? "Pause" : "Play"}>
              {playback?.isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </Button>
            <Button className="h-11 w-11 px-0" variant="ghost" disabled={!canControl} onClick={onNext} title="Next video">
              <SkipForward size={18} />
            </Button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-[3rem_minmax(0,1fr)_3rem] items-center gap-3">
          <span className="text-xs tabular-nums text-muted">{formatTime(progress)}</span>
          <input
            className="player-range h-2 min-w-0 disabled:cursor-not-allowed disabled:opacity-50"
            type="range"
            min="0"
            max={Math.max(duration, 1)}
            step="1"
            value={Math.min(progress, Math.max(duration, 1))}
            disabled={!canControl || !duration}
            onChange={(event) => setProgress(Number(event.target.value))}
            onMouseUp={(event) => seekToTimestamp(event.currentTarget.value)}
            onTouchEnd={(event) => seekToTimestamp(event.currentTarget.value)}
            aria-label="Seek video"
          />
          <span className="text-right text-xs tabular-nums text-muted">{formatTime(duration)}</span>
        </div>
      </div>
    </section>
  );
}
