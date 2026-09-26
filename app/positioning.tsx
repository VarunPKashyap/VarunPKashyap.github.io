import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";

export function PositioningHero() {
  return <section id="top" className="intro-section positioning-hero folio-hero">
    <div className="hero-context-line"><span className="meta">Cultural insights &amp; brand strategy</span><span className="meta">Bangalore, India</span></div>
    <div className="folio-hero__grid">
      <div className="folio-hero__copy">
        <p className="folio-hero__name">Hello, I’m Varun Kashyap.</p>
        <h1><span>There’s enough</span><em>content already.</em></h1>
        <p className="folio-hero__intro">I work in cultural insight and brand strategy. I use what I learn about people and place to decide what a brand should say, make or leave alone.</p>
        <div className="folio-hero__links"><a href="#work" className="folio-hero__primary">Start with the work<ArrowDown size={19}/></a><a href="#services">What I do<ArrowUpRight size={17}/></a></div>
      </div>
      <figure className="folio-hero__artifact">
        <a className="folio-hero__paper" href="/assets/consumed-2024.pdf#page=41" target="_blank" rel="noopener noreferrer" aria-label="Open the original page about friendships in Consumed">
          <span className="folio-hero__photo"><img src="/assets/consumed-relationships.webp" alt="A real hand holding a small yellow leaf, from a page of Consumed" width="1600" height="1056" fetchPriority="high"/></span>
          <span className="folio-hero__corner">A detail from Consumed <ArrowUpRight size={17}/></span>
        </a>
        <figcaption><span>Consumed / Kommune × Stumble, 2024</span><span>On the ways we keep in touch</span></figcaption>
      </figure>
    </div>
    <div className="career-strip"><a className="intro-affiliation" href="https://www.district.in/" target="_blank" rel="noopener noreferrer"><span className="meta">Currently at</span><span className="district-wordmark">District</span><ArrowUpRight size={18}/></a><p><span>Previously</span>Led Culture Consultancy at Kommune and Stumble</p><a href="/assets/varun-resume.pdf" download>Download résumé<ArrowDown size={17}/></a></div>
  </section>;
}

export {ServicesSection} from "./working-together";

export function AboutSection() {
  return <section id="about" className="about-section light-section">
    <div className="section-top"><span className="meta">About me</span><a className="meta" href="/assets/varun-profile-note.docx" download>Download profile ↓</a></div>
    <div className="about-grid"><div><h2>A little<br/>background.</h2><p className="about-suspicion">Culture, commerce,<br/>and how people make sense of both.</p></div><div className="about-copy"><p className="about-lead">I studied computer science engineering and later joined the Young India Fellowship at Ashoka. I now work on brand strategy at District, where going out is as much a social question as a product one.</p><p>Before District, I led culture consultancy at Kommune and Stumble. A purchase, a night out or a forwarded meme can mean different things in different lives. I want that context in the room when a brand decides what to do.</p><p>Outside work, I’ll happily take a Formula One tangent, a Lego build-off or a dosa and filter coffee trail.</p><div className="experience-proof"><span className="meta">Brand experience includes</span><p>Coca-Cola · Spotify · Netflix<br/>Diageo · Meta · Bumble</p></div><details className="about-history"><summary>Experience & background<Plus size={18}/></summary><div><p>I’ve contributed to Google’s AI and culture advisory panel via Canvas8.</p><p>I’ve moderated culture panels at Brand &amp; Entertainment, Under 25 Summit, CultureCon, All About Music, IIMW and other conferences. A good conversation needs enough preparation to go somewhere unexpected.</p></div></details><div className="about-links"><a href="https://in.linkedin.com/in/varunpkashyap" target="_blank" rel="noopener noreferrer">LinkedIn profile<ArrowUpRight size={17}/></a><a href="#contact">Talk about an opportunity<ArrowUpRight size={17}/></a></div></div></div>
    <figure className="about-spread"><a href="/assets/consumed-2024.pdf#page=49" target="_blank" rel="noopener noreferrer" aria-label="Open the acknowledgements page in Consumed"><img src="/assets/consumed-acknowledgements.jpg" alt="The acknowledgements spread from Consumed, with two group photographs and contributor logos" width="1600" height="1056" loading="lazy"/></a><figcaption><span className="meta">From the work / 2024</span><p>People behind the pages of <cite>Consumed</cite>.</p><a href="/assets/consumed-2024.pdf#page=49" target="_blank" rel="noopener noreferrer">See the acknowledgements <ArrowUpRight size={17}/></a></figcaption></figure>
  </section>;
}
