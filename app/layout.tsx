import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LockScreen } from "@/components/LockScreen";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "dune — gardenofthemind.io",
  description: "Dune-inspired AU & VST amplifier plugins by gardenofthemind.io",
  icons: { icon: "/images/itsamaker-logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} h-screen flex flex-col overflow-hidden`}>
        <LockScreen>{children}</LockScreen>
      </body>
    </html>
  );
}
