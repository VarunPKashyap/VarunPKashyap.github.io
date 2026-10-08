"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "./content";
import { ProjectEvidence } from "./project-evidence";

type OpenProject = (index: number, trigger: HTMLButtonElement) => void;
type Frame = { image: string; label: string; alt: string; width: number; height: number; excerpt?: { href: string; label: string } };

const consumedFrames: Frame[] = [
  { image: "/assets/work/consumed-formats.webp", label: "Formats", alt: "Original Consumed spread, Flick vs Flip: the platform dilemma, examining short-form discovery and long-form audience relationships", width: 1600, height: 1056, excerpt: { href: "https://varun.kaverichandna.chatgpt.site/assets/excerpts/consumed-formats-p9.pdf", label: "Read spread · 95 KB" } },
  { image: "/assets/consumed-cover.jpg", label: "Cover", alt: "The original Consumed report cover", width: 1000, height: 660 },
  { image: "/assets/consumed-methodology.webp", label: "Method", alt: "Consumed methodology spread describing interviews, surveys, discussions and workshops", width: 1600, height: 1056 },
];

const grassFrames: Frame[] = [
  { image: "/assets/work/touching-grass-concert.webp", label: "The crowd", alt: "Concert photography from the original Touching Grass report", width: 1500, height: 975 },
  { image: "/assets/work/touching-grass-kitchen.webp", label: "The kitchen", alt: "Original Touching Grass spread on Bengaluru’s Ma La Kitchen supper club, with a chef serving guests at the counter", width: 1500, height: 975, excerpt: { href: "https://varun.kaverichandna.chatgpt.site/assets/excerpts/touching-grass-ma-la-kitchen-pp76-77.pdf", label: "Read spread · 218 KB" } },
  { image: "/assets/work/touching-grass-craft.webp", label: "The making", alt: "Original Touching Grass spread showing shoe customisation at the Gully Labs store in Delhi", width: 1500, height: 975 },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" /></svg>;
}

function ProjectHeading({ index, compact = false }: { index: number; compact?: boolean }) {
  const project = projects[index];
  return <div className="folio-copy-heading">
    <p className="folio-kicker"><span>{project.number}</span><span>{project.format}</span></p>
    <h3 id={`folio-title-${project.id}`}>{project.title}</h3>
    <p className="folio-role">{project.role}</p>
    {!compact && <p className="folio-subtitle">{project.subtitle}</p>}
  </div>;
}

function ProjectDetails({ index, onOpen }: { index: number; onOpen: OpenProject }) {
  const project = projects[index];
  const sourceLabel = project.id === "podcast" ? "Listen on Spotify" : project.id === "hannah" ? "Read interview" : "Read report";
  const sourceLink = project.id === "hannah" ? `${project.link}#page=27` : project.link;
  return <div className="folio-copy-details">
    <p className="folio-summary">{project.summary}</p>
    <div className="folio-actions">
      <button type="button" className="folio-explore" aria-label={`Explore ${project.title}`} aria-haspopup="dialog" onClick={event => onOpen(index, event.currentTarget)}><span>Explore the project</span><Arrow /></button>
      <a className="folio-source" href={sourceLink} target="_blank" rel="noopener noreferrer" aria-label={`${sourceLabel}: ${project.title}`}><span>{sourceLabel}</span><Arrow diagonal /></a>
    </div>
  </div>;
}

function ProjectCopy({ index, onOpen, compact = false }: { index: number; onOpen: OpenProject; compact?: boolean }) {
  return <div className="folio-copy"><ProjectHeading index={index} compact={compact} /><ProjectDetails index={index} onOpen={onOpen} /></div>;
}

function ProjectGallery({ index, frames, onOpen }: { index: number; frames: Frame[]; onOpen: OpenProject }) {
  const [selected, setSelected] = useState(0);
  const [requested, setRequested] = useState(0);
  const [primed, setPrimed] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const galleryRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const project = projects[index];
  const frame = frames[selected];

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    if (!("IntersectionObserver" in window)) { setPrimed(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setPrimed(true); observer.disconnect(); }
    }, { rootMargin: "240px" });
    observer.observe(gallery);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (requested === selected) return;
    const image = imageRefs.current[requested];
    if (!image) return;
    let active = true;
    image.decode().then(() => {
      if (!active) return;
      setSelected(requested);
      setAnnouncement(`${frames[requested].label}, image ${requested + 1} of ${frames.length}. ${frames[requested].alt}`);
    }).catch(() => {
      if (!active) return;
      setRequested(selected);
      setAnnouncement("That image could not load. The previous image is still shown. Try again.");
    });
    return () => { active = false; };
  }, [requested, selected, frames]);

  function chooseFrame(frameIndex: number) {
    setPrimed(true);
    setRequested(frameIndex);
  }

  return <figure ref={galleryRef} className="folio-gallery">
    <div className="folio-image-stage">
      <button type="button" className="folio-image" aria-label={`Explore ${project.title}`} aria-haspopup="dialog" onClick={event => onOpen(index, event.currentTarget)}>
        {frames.map((option, frameIndex) => <img key={option.image} ref={element => { imageRefs.current[frameIndex] = element; }} src={primed || frameIndex === 0 ? option.image : undefined} alt={selected === frameIndex ? option.alt : ""} aria-hidden={selected !== frameIndex} data-visible={selected === frameIndex} width={option.width} height={option.height} loading={primed ? "eager" : "lazy"} decoding="async" />)}
        <span className="folio-image-action"><span>Open project</span><Arrow diagonal /></span>
      </button>
    </div>
    <figcaption className="folio-caption">
      <div className="folio-frame-controls" role="group" aria-label={`Choose a ${project.title} image`}>
        {frames.map((option, frameIndex) => <button key={option.image} ref={element => { buttonRefs.current[frameIndex] = element; }} type="button" aria-pressed={selected === frameIndex} data-pending={requested === frameIndex && requested !== selected} onClick={() => chooseFrame(frameIndex)} onKeyDown={event => {
          const destination = event.key === "ArrowRight" ? (frameIndex + 1) % frames.length : event.key === "ArrowLeft" ? (frameIndex + frames.length - 1) % frames.length : event.key === "Home" ? 0 : event.key === "End" ? frames.length - 1 : null;
          if (destination === null) return;
          event.preventDefault();
          buttonRefs.current[destination]?.focus();
          chooseFrame(destination);
        }}><span className="folio-frame-thumb" aria-hidden="true"><img src={primed || frameIndex === 0 ? option.image : undefined} alt="" width={option.width} height={option.height} loading={primed ? "eager" : "lazy"} decoding="async" /></span><span>{option.label}</span></button>)}
      </div>
      <span className="folio-page"><a href={frame.excerpt?.href ?? project.link} target="_blank" rel="noopener noreferrer" aria-label={frame.excerpt ? `Read ${frame.label.toLowerCase()} spread from ${project.title}` : `Open full ${project.title} report`}>{frame.excerpt?.label ?? "Full report"} ↗</a></span>
      <span className="folio-announcement" role="status" aria-live="polite" aria-atomic="true">{announcement}</span>
    </figcaption>
  </figure>;
}

export function WorkSection({ onOpen }: { onOpen: OpenProject }) {
  return <section id="work" className="folio-section" aria-labelledby="folio-title">
    <header className="folio-intro">
      <h2 id="folio-title">01 / Selected work</h2>
      <p>Research and writing on how India consumes, connects and goes out.</p>
    </header>

    <div className="folio-featured">
      <article id="case-consumed" className="folio-project folio-project--consumed" aria-labelledby="folio-title-consumed">
        <ProjectHeading index={0} />
        <ProjectGallery index={0} frames={consumedFrames} onOpen={onOpen} />
        <ProjectEvidence projectId="consumed" variant="card" />
        <ProjectDetails index={0} onOpen={onOpen} />
        <p className="folio-imprint"><span>{projects[0].organisation}</span><span>{projects[0].year}</span></p>
      </article>
      <article id="case-grass" className="folio-project folio-project--grass" aria-labelledby="folio-title-grass">
        <ProjectHeading index={1} />
        <ProjectGallery index={1} frames={grassFrames} onOpen={onOpen} />
        <ProjectEvidence projectId="grass" variant="card" />
        <ProjectDetails index={1} onOpen={onOpen} />
        <p className="folio-imprint"><span>{projects[1].organisation}</span><span>{projects[1].year}</span></p>
      </article>
    </div>

    <div className="folio-pair">
      {projects.slice(2).map((project, offset) => <article id={`case-${project.id}`} className={`folio-small folio-small--${project.id}`} key={project.id} aria-labelledby={`folio-title-${project.id}`}>
        <div className="folio-small-topline"><span>{project.organisation}</span><span>{project.year}</span></div>
        <button type="button" className="folio-small-image" aria-label={`Explore ${project.title}`} aria-haspopup="dialog" onClick={event => onOpen(offset + 2, event.currentTarget)}>
          <img src={project.image} alt={`${project.title}, original publication cover`} width={offset === 0 ? 773 : 500} height={offset === 0 ? 1000 : 500} loading="lazy" />
          <span className="folio-image-action"><span>Open project</span><Arrow diagonal /></span>
        </button>
        <ProjectCopy index={offset + 2} onOpen={onOpen} compact />
      </article>)}
    </div>

    <div className="folio-downloads"><p>For your reading pile.</p><span>Keep the full reports</span><a href="https://varun.kaverichandna.chatgpt.site/assets/consumed-2024.pdf" target="_blank" rel="noopener noreferrer">Consumed <span>PDF · 5.1 MB ↓</span></a><a href="https://varun.kaverichandna.chatgpt.site/assets/touching-grass-2026.pdf" target="_blank" rel="noopener noreferrer">Touching Grass <span>PDF · 4.1 MB ↓</span></a></div>
  </section>;
}
