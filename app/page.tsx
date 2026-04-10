import Image from "next/image";
import { AvatarDropdown } from "@/components/AvatarDropdown";

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

export default function Home() {
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

      {/* Hero */}
      <section className="px-6 py-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Amplifiers</h2>
        <p className="text-[var(--text-muted)] text-sm max-w-md mx-auto">
          Dune-inspired AU &amp; VST plugins. Coming soon.
        </p>
      </section>

      {/* Grid */}
      <section className="px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {amplifiers.map((amp) => (
            <div
              key={amp.name}
              className="group relative overflow-hidden rounded-xl border border-white/5 bg-[var(--surface)] transition hover:border-[var(--accent)]/30"
            >
              <div className="relative aspect-[3/1] w-full">
                <Image
                  src={amp.image}
                  alt={amp.name}
                  fill
                  className="object-cover transition group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="px-4 py-3">
                <h3 className="text-sm font-medium">{amp.name}</h3>
                <p className="text-xs text-[var(--text-muted)]">AU / VST3</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="pb-10 text-center text-2xl">🏜️</footer>
    </main>
  );
}
