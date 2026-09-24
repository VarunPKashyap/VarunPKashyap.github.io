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
export const metadata: Metadata = {
 metadataBase: new URL("https://varunpkashyap.github.io"),
 alternates: { canonical: "/" },
 title: "Varun — Brand & Cultural Strategist",
 description: "Varun turns cultural insight into brand positioning, creative direction and content strategy. Explore selected work, experience and ways to work together. Currently at district.",
 icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
