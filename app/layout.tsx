import type { Metadata } from "next";
import "./globals.css";
import "./digest-archive.css";
import "./portfolio-refresh.css";
import "./art-direction.css";
import "./worktable.css";
import "./refinements.css";
import "./motion.css";
import "./game.css";
import "./interactions.css";
import "./craft.css";
import "./finish.css";
import "./editorial-v46.css";
export const metadata: Metadata = {
 title: "Varun fights content pollution",
 description: "Varun Kashyap studies how people choose, connect and spend their time, then turns cultural context into brand positioning, creative briefs and editorial direction.",
 icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
 alternates: { canonical: "https://varunpkashyap.github.io/" },
};
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
