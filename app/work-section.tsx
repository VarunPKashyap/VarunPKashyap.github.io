"use client";

import { useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "./content";

const spreads = [
  { image: "/assets/consumed-methodology.webp", page: 45, label: "How we looked", note: "Interviews, surveys, discussions and workshops." },
  { image: "/assets/consumed-sectors.webp", page: 46, label: "The range", note: "17 creative sectors explored." },
  { image: "/assets/consumed-acknowledgements.jpg", page: 49, label: "The people", note: "Some of the collaborators behind the pages." },
];

export function WorkSection({ onOpen }: { onOpen: (index: number, trigger: HTMLButtonElement) => void }) {
  const [spreadIndex, setSpreadIndex] = useState(0);
  const warmed = useRef(false);
  const spread = spreads[spreadIndex];
  const turn = (direction: number) => setSpreadIndex(current => (current + direction + spreads.length) % spreads.length);
  const warmSpreads = () => {
    if (warmed.current) return;
    warmed.current = true;
    spreads.slice(1).forEach(item => { const image = new Image(); image.src = item.image; });
  };

  return <section id="work" className="work-section light-section portfolio-work">
    <div className="section-top"><span className="meta">Selected work</span><span className="meta">Reports / interviews / conversations</span></div>
    <div className="portfolio-work__heading" data-reveal>
      <h2>Questions that<br/><em>became work.</em></h2>
      <p>Two reports, an interview and a conversation series. Each began by looking closer at what people were actually doing.</p>
    </div>

    <article className="field-report" aria-labelledby="field-report-title">
      <div className="field-report__story">
        <span className="field-report__eyebrow">01 / Featured report / 2024</span>
        <h3 id="field-report-title">Consumed</h3>
        <p className="field-report__byline">Co-written with Ria Chopra<br/>for Stumble × Kommune</p>
        <p className="field-report__question">What can consumption tell us about the lives people are trying to build?</p>
        <p className="field-report__body">The report draws on more than 100 experts across 17 sectors. We asked what choices reveal about convenience, identity and belonging in India.</p>
        <div className="field-report__actions"><button type="button" aria-haspopup="dialog" onClick={event => onOpen(0, event.currentTarget)}>Explore the story <ArrowRight size={19}/></button><a href="/assets/consumed-2024.pdf" target="_blank" rel="noopener noreferrer">Open the report <ArrowUpRight size={17}/></a></div>
      </div>
      <div className="field-report__viewer" data-reveal>
        <a className="field-report__spread" key={spread.page} href={`/assets/consumed-2024.pdf#page=${spread.page}`} target="_blank" rel="noopener noreferrer" aria-label={`Open the original ${spread.label.toLowerCase()} spread in Consumed`}><img src={spread.image} width="1600" height="1056" alt={`${spread.label}: an original spread from the Consumed report`} loading={spreadIndex === 0 ? "lazy" : "eager"} onLoad={warmSpreads}/></a>
        <div className="field-report__controls"><div className="field-report__caption" aria-live="polite"><span>{String(spreadIndex + 1).padStart(2, "0")} / 03 &nbsp; FROM THE REPORT</span><strong>{spread.label}</strong><small>{spread.note}</small></div><div className="field-report__arrows"><button type="button" aria-label="Previous report spread" onClick={() => turn(-1)}><ArrowLeft size={19}/></button><button type="button" aria-label="Next report spread" onClick={() => turn(1)}><ArrowRight size={19}/></button></div></div>
      </div>
    </article>

    <div className="portfolio-work__more"><p className="portfolio-work__label">More work <span>02—04</span></p>{projects.slice(1).map((project, offset) => <button key={project.id} type="button" className={`portfolio-work__item portfolio-work__item--${project.id}`} onClick={event => onOpen(offset + 1, event.currentTarget)} aria-haspopup="dialog" aria-label={`Explore ${project.title}`}><span className="portfolio-work__number">{project.number}</span><span className="portfolio-work__thumbnail"><img src={project.image} alt="" loading="lazy"/></span><span className="portfolio-work__description"><span className="portfolio-work__kind">{project.format} / {project.organisation}</span><strong>{project.title}</strong><span>{project.summary}</span></span><ArrowUpRight className="portfolio-work__arrow" size={25}/></button>)}</div>
    <div className="download-strip"><span className="meta">Take the reports with you (PDF)</span><a href="/assets/consumed-2024.pdf" download>Consumed<ArrowDown size={17}/></a><a href="/assets/touching-grass-2026.pdf" download>Touching Grass<ArrowDown size={17}/></a></div>
  </section>;
}
