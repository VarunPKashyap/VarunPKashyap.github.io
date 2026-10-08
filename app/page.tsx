"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Plus, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { projects, type Project } from "./content";
import { notes } from "./notes";
import { Detour } from "./detour";
import { PositioningHero, AboutSection } from "./positioning";
import { WorkSection } from "./work-section";
import { BangaloreBreak } from "./bangalore-break";
import { SiteMotion } from "./site-motion";
import { ArticulationLab } from "./articulation-lab";
import { WorkingNotes } from "./working-notes";
import { ProjectEvidence } from "./project-evidence";
import { PixelWordmark } from "./pixel-wordmark";
const readingTime=(paragraphs:string[])=>Math.max(1,Math.ceil(paragraphs.join(" ").split(/\s+/).length/220));
function updateReaderProgress(element: HTMLDivElement | null) {
 if (!element) return;
 const extent = element.scrollHeight - element.clientHeight;
 element.parentElement?.style.setProperty("--reader-progress", String(extent > 0 ? Math.min(1, Math.max(0, element.scrollTop / extent)) : 1));
}
const linkedin="https://in.linkedin.com/in/varunpkashyap";
function WorkVisual({project}:{project:Project}){return <div className={`work-visual visual-${project.id}`}><img src={project.image} alt={`${project.title} original cover`} loading="lazy"/></div>}
export default function Home(){
 const [menuOpen,setMenuOpen]=useState(false);const [selected,setSelected]=useState<number|null>(null);const [noteIndex,setNoteIndex]=useState<number|null>(null);
 const [readerDirection,setReaderDirection]=useState(1);const [projectOpen,setProjectOpen]=useState(false);const [noteOpen,setNoteOpen]=useState(false);
 const menuTrigger=useRef<HTMLButtonElement|null>(null);const header=useRef<HTMLElement|null>(null);
 const projectTitle=useRef<HTMLHeadingElement|null>(null);const noteTitle=useRef<HTMLHeadingElement|null>(null);
 const projectTrigger=useRef<HTMLButtonElement|null>(null);const noteTrigger=useRef<HTMLButtonElement|null>(null);const readerScroll=useRef<HTMLDivElement|null>(null);const noteScroll=useRef<HTMLDivElement|null>(null);
 const project=selected===null?null:projects[selected];const note=noteIndex===null?null:notes[noteIndex];

 useEffect(()=>{
  if (!("ResizeObserver" in window)) return;
  const elements = [readerScroll.current, noteScroll.current].filter((element): element is HTMLDivElement => element !== null);
  const observer = new ResizeObserver(()=>elements.forEach(updateReaderProgress));
  elements.forEach(element=>{
   observer.observe(element);
   if (element.firstElementChild) observer.observe(element.firstElementChild);
  });
  return ()=>observer.disconnect();
 },[projectOpen,noteOpen,selected,noteIndex]);

 useEffect(()=>{
  if(!menuOpen)return;
  const close=(event:KeyboardEvent)=>{if(event.key==='Escape'){setMenuOpen(false);menuTrigger.current?.focus()}};
  const outside=(event:PointerEvent)=>{if(!header.current?.contains(event.target as Node))setMenuOpen(false)};
  const focusOutside=(event:FocusEvent)=>{if(!header.current?.contains(event.target as Node))setMenuOpen(false)};
  window.addEventListener('keydown',close);document.addEventListener('pointerdown',outside);document.addEventListener('focusin',focusOutside);
  return()=>{window.removeEventListener('keydown',close);document.removeEventListener('pointerdown',outside);document.removeEventListener('focusin',focusOutside)};
 },[menuOpen]);
 useEffect(()=>{if(!projectOpen)return;const frame=requestAnimationFrame(()=>{readerScroll.current?.scrollTo({top:0,behavior:'instant'});updateReaderProgress(readerScroll.current);projectTitle.current?.focus({preventScroll:true})});return()=>cancelAnimationFrame(frame)},[selected,projectOpen]);
 useEffect(()=>{if(!noteOpen)return;const frame=requestAnimationFrame(()=>{noteScroll.current?.scrollTo({top:0,behavior:'instant'});updateReaderProgress(noteScroll.current);noteTitle.current?.focus({preventScroll:true})});return()=>cancelAnimationFrame(frame)},[noteIndex,noteOpen]);
 const navigateTo=(id:string)=>{setMenuOpen(false);requestAnimationFrame(()=>{const heading=document.querySelector<HTMLElement>(`${id} h2`);if(heading){heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true})}})};
 const openNote=(index:number,trigger:HTMLButtonElement)=>{noteTrigger.current=trigger;setReaderDirection(1);setNoteIndex(index);setNoteOpen(true)};
 const openProject=(index:number,trigger:HTMLButtonElement)=>{projectTrigger.current=trigger;setReaderDirection(1);setSelected(index);setProjectOpen(true)};
 const jumpReader=(id:string)=>{const target=readerScroll.current?.querySelector<HTMLElement>(`#${id}`);target?.focus({preventScroll:true});target?.scrollIntoView({block:"start",behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"})};
 const moveProject=(direction:number)=>{setReaderDirection(direction);setSelected(current=>current===null?null:(current+direction+projects.length)%projects.length)};
 return <>
 <SiteMotion/>
 <a href="#main" className="skip-link">Skip to content</a>
 <header className="site-header" ref={header}><a href="#top" className="wordmark" aria-label="Varun, back to top"><PixelWordmark/></a><button ref={menuTrigger} aria-label={menuOpen?"Close menu":"Open menu"} className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="navigation">{menuOpen?'Close':'Menu'}{menuOpen?<X size={20}/>:<Plus size={20}/>}</button><nav id="navigation" className={menuOpen?'is-open':''} aria-label="Main navigation"><a href="#work" onClick={()=>navigateTo("#work")}>Work <small>01</small></a><a href="#thinking" onClick={()=>navigateTo("#thinking")}>Notes <small>02</small></a><a href="#practice" onClick={()=>navigateTo("#practice")}>Articulation <small>03</small></a><a href="#about" onClick={()=>navigateTo("#about")}>About <small>04</small></a><a href="#contact" onClick={()=>navigateTo("#contact")}>Let’s talk <ArrowUpRight size={17}/></a></nav></header>
 <main id="main">
  <PositioningHero onOpenNote={openNote}/>
  <WorkSection onOpen={openProject}/>
  <WorkingNotes onOpen={openNote}/>
  <div id="practice" className="practice-sequence"><ArticulationLab/></div>
  <AboutSection/>
  <section className="personal-section"><BangaloreBreak/></section>
  <Detour/>
  <footer id="contact" className="contact-section"><div className="section-top"><span className="meta">Tell me what you’re working on.</span></div><h2 className="contact-big"><span>Let’s talk.</span></h2><div className="contact-methods"><a href={linkedin} target="_blank" rel="noopener noreferrer"><span>LinkedIn</span><small>Connect with Varun</small><ArrowUpRight size={24}/></a><a href="mailto:varunpkashyap98@gmail.com"><span>Email</span><small>varunpkashyap98@gmail.com</small><ArrowUpRight size={24}/></a><a href="https://www.instagram.com/vruuun/" target="_blank" rel="noopener noreferrer"><span>Instagram</span><small>@vruuun</small><ArrowUpRight size={24}/></a></div><div className="footer-line"><span>Varun / Cultural insights & brand strategy</span><a href="#top">Back to the top ↑</a><span>Bangalore, India / © {new Date().getFullYear()}</span></div></footer>
 </main>
      <Dialog open={projectOpen} onOpenChange={setProjectOpen}>
        <DialogContent className="project-dialog" showCloseButton={false} onOpenAutoFocus={event=>{event.preventDefault();projectTitle.current?.focus({preventScroll:true})}} onCloseAutoFocus={event => { event.preventDefault(); projectTrigger.current?.focus(); }}>
          {project && <><div className="reader-header"><span className="mono">{project.format} / {project.number}</span><DialogClose className="reader-close">Close project <X size={18} /></DialogClose></div>{project.id !== "podcast" && <nav className="reader-jumps" aria-label="Explore this project"><button onClick={()=>jumpReader("reader-role")}><span>01</span>My role</button><button onClick={()=>jumpReader(project.id === "consumed" || project.id === "grass" ? "reader-evidence" : "reader-question")}><span>02</span>{project.id === "consumed" || project.id === "grass" ? "Original work" : "The context"}</button><button onClick={()=>jumpReader("reader-takeaway")}><span>03</span>{project.id === "hannah" ? "In the interview" : "In the report"}</button></nav>}<div className="reader-scroll" ref={readerScroll} onScroll={event=>updateReaderProgress(event.currentTarget)}><article key={project.id} className="reader-article" style={{"--reader-direction":readerDirection} as CSSProperties}><header className="reader-intro"><p className="eyebrow">{project.organisation} / {project.year}</p><DialogTitle className="reader-title" ref={projectTitle} tabIndex={-1}>{project.title}</DialogTitle><DialogDescription className="reader-description">{project.subtitle}</DialogDescription><div className="reader-byline"><span>{project.role}</span><span>{project.format}</span></div><div className="reader-overview"><div className="reader-contribution"><h2 id="reader-role" tabIndex={-1}>My role</h2><p>{project.contribution}</p></div><a className="reader-source" href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel}<ArrowUpRight size={18} /></a></div>{project.id==="consumed"&&<blockquote className="reader-quote"><p>“Don’t take this report for gospel truth. Take what you wish from here and build what you must.”</p><cite>From the introduction, co-written with Ria Chopra</cite></blockquote>}</header><ProjectEvidence projectId={project.id} variant="reader"/>{project.id !== "podcast" && <div className="reader-body"><aside><WorkVisual project={project} /><p>{project.related}</p></aside><div className="reader-narrative"><h2 id="reader-question" tabIndex={-1}>{project.question}</h2><p>{project.context}</p><h3 id="reader-takeaway" tabIndex={-1}>{project.reflectionHeading}</h3><p>{project.perspective}</p>{project.qualification && <div className="reader-note"><span className="mono">Scope</span><p>{project.qualification}</p></div>}</div></div>}</article><div className="reader-footer"><button onClick={() => moveProject(-1)}><ArrowLeft size={17} /><span><small>Previous work</small>{projects[(selected! - 1 + projects.length) % projects.length].title}</span></button><span className="mono">{project.number} / 04</span><button onClick={() => moveProject(1)}><span><small>Next work</small>{projects[(selected! + 1) % projects.length].title}</span><ArrowRight size={17} /></button></div></div></>}
        </DialogContent>
      </Dialog>

      <Dialog open={noteOpen} onOpenChange={setNoteOpen}>
        <DialogContent className="note-dialog" showCloseButton={false} onOpenAutoFocus={event=>{event.preventDefault();noteTitle.current?.focus({preventScroll:true})}} onCloseAutoFocus={event=>{event.preventDefault();noteTrigger.current?.focus()}}>
          {note && <><div className="reader-header"><span className="mono">Working note / {note.number}</span><DialogClose className="reader-close">Close note<X size={18}/></DialogClose></div><div className="note-scroll" ref={noteScroll} onScroll={event=>updateReaderProgress(event.currentTarget)}><article key={note.id} className="note-article" style={{"--reader-direction":readerDirection} as CSSProperties}><p className="eyebrow">{note.category}<span className="note-reading-time">{readingTime(note.paragraphs)} min read</span></p><DialogTitle className="note-title" ref={noteTitle} tabIndex={-1}>{note.title}</DialogTitle><DialogDescription className="note-description">{note.teaser}</DialogDescription><div className="note-prose">{note.paragraphs.map((paragraph,index)=><p key={index}>{paragraph}</p>)}</div><div className="note-question"><p>{note.question}</p></div><details className="note-evidence"><summary>What informed this note<Plus size={16}/></summary><p>{note.evidence}</p>{note.sources.map(source=><a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<ArrowUpRight size={15}/></a>)}</details><div className="note-byline">Varun <span>Working notes on culture and brand strategy</span></div></article><div className="reader-footer"><button onClick={()=>{setReaderDirection(-1);setNoteIndex((noteIndex!-1+notes.length)%notes.length)}}><ArrowLeft size={17}/>Previous note</button><span className="mono">{note.number} / 06</span><button onClick={()=>{setReaderDirection(1);setNoteIndex((noteIndex!+1)%notes.length)}}>Next note<ArrowRight size={17}/></button></div></div></>}
        </DialogContent>
      </Dialog>
 </>
}
