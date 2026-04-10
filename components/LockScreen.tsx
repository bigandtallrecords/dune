"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const LOCK_PASSWORD =
  typeof process.env.NEXT_PUBLIC_DUNE_LOCK_PASSWORD === "string"
    ? process.env.NEXT_PUBLIC_DUNE_LOCK_PASSWORD.trim()
    : "";

const LS_KEY = "dune-lock-unlocked-v1";
const LOGO_SRC = "/images/itsamaker-logo.png";

export function LockScreen({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (!LOCK_PASSWORD) return;
    if (localStorage.getItem(LS_KEY) === "1") setUnlocked(true);
  }, []);

  if (!LOCK_PASSWORD || unlocked) return <>{children}</>;

  return (
    <LockGate
      onSuccess={() => {
        localStorage.setItem(LS_KEY, "1");
        setUnlocked(true);
      }}
    />
  );
}

function LockGate({ onSuccess }: { onSuccess: () => void }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const hoverRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (showOverlay) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetRef.current = {
        x: (-(e.clientY - cy) / cy) * 16,
        y: ((e.clientX - cx) / cx) * 16,
      };
    };
    const tick = () => {
      const c = currentRef.current;
      const t = targetRef.current;
      c.x += (t.x - c.x) * 0.025;
      c.y += (t.y - c.y) * 0.025;
      scaleRef.current += ((hoverRef.current ? 1.08 : 1) - scaleRef.current) * 0.042;
      setRotateX(c.x);
      setRotateY(c.y);
      setScale(scaleRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [showOverlay]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verifying || !password.trim()) return;
    setVerifying(true);
    if (password === LOCK_PASSWORD) {
      onSuccess();
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPassword("");
    }
    setVerifying(false);
  };

  const glow = Math.min(1, Math.max(0, (scale - 1) / 0.08));

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black select-none">
      {/* Chrome */}
      <p className="absolute bottom-5 left-5 text-sm tracking-wide text-gray-500">
        dune.gardenofthemind.io
      </p>
      <a
        href="https://gardenofthemind.io"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-5 right-5 text-sm text-gray-500 transition hover:text-gray-300"
      >
        gardenofthemind.io
      </a>

      {/* Logo */}
      <div
        onMouseEnter={() => { hoverRef.current = true; setHovering(true); }}
        onMouseLeave={() => { hoverRef.current = false; setHovering(false); }}
        onClick={() => { if (hovering) { setShowOverlay(true); setTimeout(() => inputRef.current?.focus(), 350); } }}
        className="cursor-pointer"
        style={{ perspective: "920px" }}
      >
        <div
          className="will-change-transform [transform-style:preserve-3d]"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
            filter: `brightness(${0.7 + glow * 0.5}) drop-shadow(0 0 ${8 + glow * 32}px rgba(255,255,255,${0.06 + glow * 0.19}))`,
          }}
        >
          <Image
            src={LOGO_SRC}
            alt="It's a Maker"
            width={600}
            height={600}
            className="h-[280px] w-[280px] md:h-[400px] md:w-[400px] object-contain"
            priority
            draggable={false}
          />
        </div>
      </div>

      {/* Password overlay */}
      {showOverlay && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center lock-fade-in"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
        >
          <p className="absolute bottom-5 left-5 text-sm tracking-wide text-gray-500">dune.gardenofthemind.io</p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="secret"
              disabled={verifying}
              className={`w-64 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-center text-lg text-white placeholder-gray-500 outline-none backdrop-blur-sm transition focus:border-white/30 disabled:opacity-50 ${shake ? "lock-shake" : ""}`}
              autoComplete="off"
            />
          </form>
        </div>
      )}
    </div>
  );
}
