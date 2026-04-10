"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

interface DunePlanProps {
  currentlySubscribed: boolean;
}

export function DunePlan({ currentlySubscribed }: DunePlanProps) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    const token = localStorage.getItem("dune_session_token");
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ tier: "dune" }),
      });
      if (res.ok) {
        const { url } = await res.json();
        if (url) window.location.href = url;
      }
    } catch (err) {
      console.error("[DunePlan] Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col p-6 rounded-xl border border-[var(--accent)]/30 bg-[var(--surface)] max-w-sm mx-auto">
      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[var(--accent)] text-black text-xs font-semibold rounded-full">
        All Access
      </span>
      <div className="flex items-center gap-3 mb-4">
        <Image src="/images/itsamaker-logo.png" alt="dune" width={40} height={40} className="rounded-lg" />
        <div>
          <h3 className="text-lg font-semibold">dune</h3>
          <p className="text-xs text-[var(--text-muted)]">All amplifiers included</p>
        </div>
      </div>
      <div className="mb-4">
        <span className="text-3xl font-bold">$20</span>
        <span className="text-[var(--text-muted)] text-sm">/month</span>
      </div>
      <p className="text-sm text-[var(--text-muted)] mb-4">
        Full access to all 12 Dune amplifier presets. AU &amp; VST3. Unlocks in-plugin activation.
      </p>
      {currentlySubscribed ? (
        <button disabled className="w-full py-2 px-4 rounded-lg bg-[var(--accent)]/20 text-[var(--accent)] text-sm font-medium cursor-default">
          Subscribed ✓
        </button>
      ) : (
        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full py-2 px-4 rounded-lg bg-[var(--accent)] text-black text-sm font-semibold hover:brightness-110 transition disabled:opacity-50"
        >
          {loading ? <Loader2 size={14} className="animate-spin mx-auto" /> : "Subscribe"}
        </button>
      )}
    </div>
  );
}
