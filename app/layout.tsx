import type { Metadata } from "next";
import "./atelier.css";
import "./positioning-hero.css";
import "./about-section.css";
import "./project-gallery.css";
import "./working-notes.css";
import "./game.css";
export const metadata: Metadata = {
 metadataBase: new URL("https://varunpkashyap.github.io"),
 alternates: { canonical: "/" },
 title: "Varun fights content pollution",
 description: "Varun Kashyap studies how people choose, connect and spend their time, then turns cultural context into brand positioning, creative briefs and editorial direction.",
 icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>){return <html lang="en"><head><link rel="preload" href="/assets/departure.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/></head><body>{children}</body></html>}
