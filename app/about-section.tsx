import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";

export function AboutSection() {
  return <section id="about" className="portrait-section" aria-labelledby="portrait-title">
    <div className="portrait-section-line">
      <span>04 / The person behind the tabs</span>
      <a href="/assets/varun-profile-note.docx" download>Profile note ↓</a>
    </div>

    <div className="portrait-spread">
      <header className="portrait-heading" data-reveal>
        <h2 id="portrait-title">In the business<br/>of culture<br/>&amp; taste<span>.</span></h2>
        <p>Suspicious of how easily<br/>those words get used.</p>
      </header>

      <div className="portrait-margin" data-reveal>
        <figure className="portrait-figure">
          <div className="portrait-window">
            <img src="/assets/varun-reference.jpeg" alt="Varun holding a microphone" width="1280" height="720" loading="lazy" decoding="async"/>
          </div>
          <figcaption><span>Varun</span><span>Bangalore, India</span></figcaption>
        </figure>
        <div className="portrait-interests">
          <span>Some recurring interests</span>
          <p>Formula One.<br/>A Lego build-off.<br/>One more dosa.</p>
          <a href="#bangalore">More on the last one <ArrowDown size={16}/></a>
        </div>
      </div>

      <div className="portrait-bio" data-reveal>
        <p className="portrait-lead">I work on brand strategy at District. Before that, I led Kommune’s consultancy division and managed Stumble.</p>
        <p>A purchase, a night out or a forwarded meme can mean different things in different lives. I want that context in the room when a team decides what to make.</p>
        <div className="portrait-experience">
          <span>Brand experience includes</span>
          <p>Coca-Cola / Spotify / Netflix<br/>Diageo / Meta / Bumble</p>
        </div>
        <details className="portrait-history">
          <summary>A little more background <Plus size={18}/></summary>
          <div>
            <p>I studied computer science engineering and later joined the Young India Fellowship at Ashoka.</p>
            <p>I’ve contributed to Google’s AI and culture advisory panel via Canvas8.</p>
            <p>I’ve moderated culture panels at Brand &amp; Entertainment, Under 25 Summit, CultureCon, All About Music and IIMW. A good conversation needs enough preparation to go somewhere unexpected.</p>
          </div>
        </details>
        <a className="portrait-link" href="https://in.linkedin.com/in/varunpkashyap" target="_blank" rel="noopener noreferrer">The longer version on LinkedIn <ArrowUpRight size={18}/></a>
      </div>
    </div>
  </section>;
}
