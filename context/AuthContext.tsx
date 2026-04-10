"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const GARDEN_API = process.env.NEXT_PUBLIC_GARDEN_API_URL || "https://gardenofthemind.io";

export interface DuneUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  avatarUrl?: string;
  subscriptionTier?: string;
  duneSubscription?: boolean;
}

interface AuthContextValue {
  user: DuneUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = "dune_session_token";
const SESSION_ID_KEY = "dune_session_id";
const USER_ID_KEY = "dune_user_id";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DuneUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMe = useCallback(async (token: string): Promise<DuneUser | null> => {
    try {
      const res = await fetch(`${GARDEN_API}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(SESSION_ID_KEY);
          localStorage.removeItem(USER_ID_KEY);
        }
        return null;
      }
      const data = await res.json();
      if (data.sessionId) localStorage.setItem(SESSION_ID_KEY, data.sessionId);
      if (data.userId) localStorage.setItem(USER_ID_KEY, data.userId);
      return {
        userId: data.userId,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        displayName: data.displayName,
        avatarUrl: data.avatarUrl,
        subscriptionTier: data.subscriptionTier,
      };
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) { setIsLoading(false); return; }
    fetchMe(token).then((u) => { setUser(u); setIsLoading(false); });
  }, [fetchMe]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch(`${GARDEN_API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error || "Login failed" };
      localStorage.setItem(TOKEN_KEY, data.token);
      if (data.sessionId) localStorage.setItem(SESSION_ID_KEY, data.sessionId);
      if (data.user?.userId) localStorage.setItem(USER_ID_KEY, data.user.userId);
      const authUser = await fetchMe(data.token);
      setUser(authUser ?? {
        userId: data.user.userId,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
      });
      return { success: true };
    } catch {
      return { success: false, error: "Network error" };
    }
  }, [fetchMe]);

  const logout = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const sessionId = localStorage.getItem(SESSION_ID_KEY);
    const userId = localStorage.getItem(USER_ID_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(SESSION_ID_KEY);
    localStorage.removeItem(USER_ID_KEY);
    setUser(null);
    if (token && sessionId && userId) {
      try {
        await fetch(`${GARDEN_API}/api/auth/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ userId, sessionId }),
        });
      } catch { /* non-fatal */ }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
