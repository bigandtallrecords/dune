"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { LogOut, User, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";

export function AvatarDropdown() {
  const { user, isLoading, login, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const handleLogin = useCallback(async () => {
    if (!email || !password) { setError("Email and password required"); return; }
    setLoading(true);
    setError("");
    const result = await login(email, password);
    setLoading(false);
    if (result.success) { setIsOpen(false); setEmail(""); setPassword(""); }
    else setError(result.error || "Login failed");
  }, [email, password, login]);

  const handleLogout = useCallback(async () => {
    setIsOpen(false);
    await logout();
  }, [logout]);

  if (isLoading) return <div className="w-9 h-9 rounded-full bg-white/5 animate-pulse" />;

  const avatar = user ? (
    <div className="w-9 h-9 rounded-full bg-orange-600 flex items-center justify-center text-white font-semibold text-sm select-none">
      {`${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()}
    </div>
  ) : (
    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/50">
      <User size={18} />
    </div>
  );

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none hover:opacity-80 transition-opacity">
        {avatar}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-[var(--surface)] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 min-w-[280px]">
          {user ? (
            <div className="flex flex-col">
              <div className="px-4 py-3 border-b border-white/5">
                <div className="text-sm font-medium">{user.displayName || `${user.firstName} ${user.lastName}`}</div>
                <div className="text-xs text-[var(--text-muted)] mt-0.5">{user.email}</div>
              </div>
              <button
                onClick={() => { setIsOpen(false); window.location.href = "/panel"; }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-muted)] hover:bg-white/5 hover:text-white transition-colors"
              >
                <Image src="/images/itsamaker-logo.png" alt="" width={16} height={16} className="rounded" />
                My Amplifiers
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 hover:text-red-300 transition-colors border-t border-white/5"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col p-4 gap-3">
              <div className="text-sm font-semibold">Sign in with your gardenofthemind.io account</div>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Email"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm placeholder-gray-500 outline-none focus:border-orange-500/50 transition"
              />
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Password"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 pr-10 text-sm placeholder-gray-500 outline-none focus:border-orange-500/50 transition"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-[var(--accent)] hover:brightness-110 disabled:opacity-50 text-black font-bold rounded-lg px-3 py-2 text-sm flex items-center justify-center gap-2 transition"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <>Sign In <ArrowRight size={14} /></>}
              </button>
              <p className="text-center text-xs text-[var(--text-muted)]">
                <a href="https://gardenofthemind.io/garden-gates" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
                  Create an account →
                </a>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
