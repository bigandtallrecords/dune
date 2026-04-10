"use client";

import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { DunePlan } from "@/components/DunePlan";
import { AvatarDropdown } from "@/components/AvatarDropdown";
import { Loader2 } from "lucide-react";

const amplifiers = [
  { name: "It's a Maker", image: "/images/its a maker.png" },
  { name: "It's a Maker II", image: "/images/its a maker ii.png" },
  { name: "Geidi Prime", image: "/images/geidi prime.png" },
  { name: "Lisan al Gaib", image: "/images/lisan al gaib.png" },
  { name: "Lisan al Gaib II", image: "/images/lisan al gaib ii.png" },
  { name: "Lisan al Gaib III", image: "/images/lisan al gaib iii.png" },
  { name: "Lisan al Gaib IV", image: "/images/lisan al gaib iv.png" },
  { name: "Sihaya", image: "/images/Sihaya.png" },
  { name: "Bene Gesserit", image: "/images/bene gesserit.png" },
  { name: "Bene Gesserit II", image: "/images/bene gesserit ii.png" },
  { name: "House Courrino", image: "/images/house courrino.png" },
  { name: "The Voice", image: "/images/the voice.png" },
];

export default function PanelPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[var(--background)]">
        <Loader2 className="animate-spin text-[var(--accent)]" size={32} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex flex-col bg-[var(--background)]">
        <header className="flex items-center gap-3 px-6 py-4 bg-[var(--surface)]/90 border-b border-white/5">
          <Image src="/images/itsamaker-logo.png" alt="dune" width={32} height={32} className="rounded-lg" />
          <div className="flex-1">
            <h1 className="text-sm font-semibold tracking-wide">dune</h1>
            <p className="text-xs text-[var(--text-muted)]">gardenofthemind.io</p>
          </div>
          <AvatarDropdown />
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Image src="/images/itsamaker-logo.png" alt="dune" width={80} height={80} className="rounded-xl mx-auto mb-4 opacity-50" />
            <p className="text-[var(--text-muted)] text-sm">Sign in to view your amplifiers</p>
          </div>
        </div>
      </div>
    );
  }

  // TODO: check actual dune subscription status from DB
  const isSubscribed = false;

  return (
    <main className="h-screen overflow-y-auto bg-[var(--background)]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center gap-3 px-6 py-4 bg-[var(--surface)]/90 backdrop-blur-md border-b border-white/5">
        <Image src="/images/itsamaker-logo.png" alt="dune" width={32} height={32} className="rounded-lg" />
        <div className="flex-1">
          <h1 className="text-sm font-semibold tracking-wide">dune</h1>
          <p className="text-xs text-[var(--text-muted)]">gardenofthemind.io</p>
        </div>
        <AvatarDropdown />
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* User greeting */}
        <div className="mb-8">
          <h2 className="text-xl font-bold">Hey, {user.firstName} 🏜️</h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">Your Dune amplifier collection</p>
        </div>

        {/* Subscription */}
        {!isSubscribed && (
          <div className="mb-10">
            <DunePlan currentlySubscribed={isSubscribed} />
          </div>
        )}

        {/* Amplifier grid */}
        <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
          {isSubscribed ? "Your Amplifiers" : "Available Amplifiers"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {amplifiers.map((amp) => (
            <div
              key={amp.name}
              className={`group relative overflow-hidden rounded-xl border bg-[var(--surface)] transition ${
                isSubscribed ? "border-[var(--accent)]/20" : "border-white/5 opacity-60"
              }`}
            >
              <div className="relative aspect-[3/1] w-full">
                <Image
                  src={amp.image}
                  alt={amp.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                {!isSubscribed && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-xs font-medium bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                      🔒 Subscribe to unlock
                    </span>
                  </div>
                )}
              </div>
              <div className="px-4 py-3">
                <h3 className="text-sm font-medium">{amp.name}</h3>
                <p className="text-xs text-[var(--text-muted)]">AU / VST3</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="pb-10 text-center text-2xl">🏜️</footer>
    </main>
  );
}
