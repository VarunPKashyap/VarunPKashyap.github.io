"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { CultureObject, type CultureObjectProps } from "./culture-object";
import { BangaloreClock } from "./bangalore-clock";

export function PositioningHero({ onOpenNote }: CultureObjectProps) {
  return <section id="top" className="poster" aria-labelledby="poster-title">
    <div className="poster-index">
      <p className="meta">Cultural insights<br className="poster-mobile-break" /> / Brand strategy</p>
      <BangaloreClock />
    </div>
    <div className="poster-composition">
      <div className="poster-heading">
        <h1 id="poster-title"><span className="poster-line"><span className="poster-word">Fighting</span>{" "}<span className="poster-word poster-accent">content</span></span>{" "}<span className="poster-line"><span className="poster-word">pollution<span className="poster-stop">.</span></span></span></h1>
      </div>
      <div className="poster-introduction">
        <p>I study how people choose, connect and spend their time. That context shapes my work in brand strategy.</p>
        <div className="poster-signoff">
          <a href="#work" className="poster-work-link"><span>Explore the work</span><span className="poster-arrow"><ArrowDown size={21} aria-hidden="true" /></span></a>
        </div>
        <p className="poster-credits"><a href="#case-consumed">Co-author, Consumed</a><span aria-hidden="true">/</span><a href="#case-grass">Writer, Touching Grass</a></p>
      </div>
      <div className="poster-object"><CultureObject onOpenNote={onOpenNote} /></div>
    </div>
    <div className="poster-bottom"><span>Currently at <strong>District</strong></span><span>Previously: Kommune &amp; Stumble</span><a href="/assets/varun-resume.pdf" download>Résumé <ArrowUpRight size={15} aria-hidden="true" /></a></div>
  </section>;
}
