import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { HeroIndex } from "./hero-index";

export function PositioningHero() {
  return <section id="top" className="intro-section positioning-hero">
    <div className="hero-context-line"><span className="meta">Cultural insights &amp; brand strategy</span><span className="meta">Bangalore, India</span></div>
    <div className="opening-grid"><div className="opening-statement"><p className="opening-name">Hello, I’m Varun Kashyap.</p><h1><span className="hero-title-line">Find the thought</span><span className="hero-title-line hero-title-accent">worth building on.</span></h1><p className="opening-intro">I turn observations about how people live into clearer decisions for brands: positioning, briefs and editorial direction.</p><a href="#work" className="opening-work-link">See selected work<ArrowDown size={19}/></a></div><a className="hero-proof" href="/assets/touching-grass-2026.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open Touching Grass, a report written by Varun"><img src="/assets/touching-grass.webp" alt="Touching Grass report cover with photographs of people gathering, making and going out" width="1800" height="1172"/><span>From the workbench <span>Touching Grass / 2026 <ArrowUpRight size={16}/></span></span></a></div>
    <HeroIndex/>
    <div className="career-strip"><a className="intro-affiliation" href="https://www.district.in/" target="_blank" rel="noopener noreferrer"><span className="meta">Currently at</span><span className="district-wordmark">District</span><ArrowUpRight size={18}/></a><p><span>Previously</span>Led Culture Consultancy at Kommune and Stumble</p><a href="/assets/varun-resume.pdf" download>Download résumé<ArrowDown size={17}/></a></div>
  </section>;
}

export {ServicesSection} from "./working-together";

export function AboutSection() {
  return <section id="about" className="about-section light-section">
    <div className="section-top"><span className="meta">04 / About me</span><a className="meta" href="/assets/varun-profile-note.docx" download>Download profile ↓</a></div>
    <div className="about-grid"><div><h2>A little<br/>background.</h2><p className="about-suspicion">Culture, commerce,<br/>and how people make sense of both.</p></div><div className="about-copy"><p className="about-lead">I studied computer science engineering and later joined the Young India Fellowship at Ashoka. I now work on brand strategy at District, where going out is as much a social question as a product one.</p><p>Before District, I led culture consultancy at Kommune and Stumble. Across research, writing and strategy, I keep asking what an observation means for the choices a brand makes.</p><div className="experience-proof"><span className="meta">Brand experience includes</span><p>Coca-Cola · Spotify · Netflix<br/>Diageo · Meta · Bumble</p></div><details className="about-history"><summary>Experience & background<Plus size={18}/></summary><div><p>I’ve contributed to Google’s AI and culture advisory panel via Canvas8.</p><p>I’ve moderated culture panels at Brand &amp; Entertainment, Under 25 Summit, CultureCon, All About Music, IIMW and other conferences. A good conversation needs enough preparation to go somewhere unexpected.</p></div></details><div className="about-links"><a href="https://in.linkedin.com/in/varunpkashyap" target="_blank" rel="noopener noreferrer">LinkedIn profile<ArrowUpRight size={17}/></a><a href="#contact">Talk about an opportunity<ArrowUpRight size={17}/></a></div></div></div>
  </section>;
}
