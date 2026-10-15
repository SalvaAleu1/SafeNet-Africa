import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SafeNet Africa — Safer Digital Spaces",
  description: "Practical digital safety guidance, privacy-first learning, and pathways to trusted support for safer online communities.",
  applicationName: "SafeNet Africa",
  manifest: "/manifest.json",
  metadataBase: new URL("https://safenet-africa.vercel.app"),
  openGraph: {
    title: "SafeNet Africa",
    description: "Safer digital spaces. Stronger voices.",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#102c2a",
  colorScheme: "light"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}