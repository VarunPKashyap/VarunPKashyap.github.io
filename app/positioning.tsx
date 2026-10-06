"use client";

import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { CultureObject } from "./culture-object";
import { BangaloreClock } from "./bangalore-clock";

export function PositioningHero() {
  return <section id="top" className="atelier-hero">
    <div className="hero-index"><span className="meta">Cultural insights / Brand strategy</span><BangaloreClock/></div>
    <div className="hero-stage">
      <div className="hero-title"><span className="hero-kicker">A little more meaning.</span><h1><span>Fighting</span><span>content</span><span className="hero-last">pollution<span className="hero-stop">.</span></span></h1></div>
      <div className="hero-object"><CultureObject/></div>
    </div>
    <div className="hero-introduction"><div className="hero-signature"><img src="/assets/varun-script-wordmark.png" alt="Varun" width="2048" height="683"/><span>Culturally curious.<br/>Professionally particular.</span></div><p>I pay attention to what people do, what it means, and what brands should do with it.</p><a className="hero-work-link" href="#work">A few things<br/>I’ve worked on <ArrowDown size={23}/></a></div>
    <div className="hero-bottom"><span>Currently at <strong>District</strong></span><span>Previously: Kommune &amp; Stumble</span><a href="/assets/varun-resume.pdf" download>Résumé <ArrowUpRight size={15}/></a></div>
  </section>;
}

export { ServicesSection } from "./working-together";

export function AboutSection() {
  return <section id="about" className="about-section">
    <div className="section-top"><span className="meta">03 / The person behind the tabs</span><a className="meta" href="/assets/varun-profile-note.docx" download>Profile note ↓</a></div>
    <div className="about-grid">
      <div className="about-title" data-reveal><h2>In the business<br/>of culture<br/>&amp; taste<span className="accent-dot">.</span></h2><p className="about-suspicion">Suspicious of how easily<br/>those words get used.</p><div className="about-marginalia"><span className="meta">Some recurring interests</span><p>Formula One.<br/>A Lego build-off.<br/>One more dosa.</p><a href="#bangalore">More on the last one <ArrowDown size={16}/></a></div></div>
      <div className="about-copy" data-reveal><p className="about-lead">I studied computer science engineering and later joined the Young India Fellowship at Ashoka. These days, I work on brand strategy at District.</p><p>Before that, I led culture consultancy at Kommune and Stumble. A purchase, a night out or a forwarded meme can mean different things in different lives. I want that context in the room when a brand decides what to do.</p><div className="experience-proof"><span className="meta">Brand experience includes</span><p>Coca-Cola / Spotify / Netflix<br/>Diageo / Meta / Bumble</p></div><details className="about-history"><summary>A little more background <Plus size={18}/></summary><div><p>I’ve contributed to Google’s AI and culture advisory panel via Canvas8.</p><p>I’ve moderated culture panels at Brand &amp; Entertainment, Under 25 Summit, CultureCon, All About Music and IIMW. A good conversation needs enough preparation to go somewhere unexpected.</p></div></details><a className="text-link" href="https://in.linkedin.com/in/varunpkashyap" target="_blank" rel="noopener noreferrer">The longer version on LinkedIn <ArrowUpRight size={18}/></a></div>
    </div>
  </section>;
}
