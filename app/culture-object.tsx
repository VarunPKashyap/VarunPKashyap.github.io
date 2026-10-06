"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import "./culture-object.css";

const pieces = [
  { path: "M1 1H100V32C78 22 78 78 100 68V100H68C78 122 22 122 32 100H1Z", word: "LOOK", x: 43, y: 54 },
  { path: "M100 1H199V100H168C178 78 122 78 132 100H100V68C78 78 78 22 100 32Z", word: "ASK", x: 149, y: 54 },
  { path: "M1 100H32C22 122 78 122 68 100H100V132C122 122 122 178 100 168V199H1Z", word: "FEEL", x: 45, y: 158 },
  { path: "M100 100H132C122 78 178 78 168 100H199V199H100V168C122 178 122 122 100 132Z", word: "MAKE", x: 151, y: 158 },
];

/** A small physical metaphor for finding the relationship between things. */
export function CultureObject() {
  const uid = useId().replace(/:/g, "");
  const root = useRef<HTMLElement>(null);
  const frame = useRef(0);
  const reduced = useRef(false);
  const [scattered, setScattered] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(true);
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reduced.current = media.matches;
      setReducedMotion(media.matches);
      if (media.matches) setPaused(true);
    };
    update();
    media.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "80px" });
    if (root.current) observer.observe(root.current);
    return () => {
      media.removeEventListener("change", update);
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const tilt = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced.current || event.pointerType === "touch" && !event.buttons) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      root.current?.style.setProperty("--culture-object-tilt-x", `${-y * 16}deg`);
      root.current?.style.setProperty("--culture-object-tilt-y", `${x * 22}deg`);
    });
  };

  const resetTilt = () => {
    cancelAnimationFrame(frame.current);
    root.current?.style.setProperty("--culture-object-tilt-x", "0deg");
    root.current?.style.setProperty("--culture-object-tilt-y", "0deg");
  };

  return (
    <figure
      className="culture-object"
      ref={root}
      data-scattered={scattered}
      data-paused={paused || !inView}
      style={{ "--culture-object-turn": `${turn * 90}deg` } as CSSProperties}
      aria-label="An interactive sculpture about connecting cultural observations"
    >
      <div className="culture-object-topline" aria-hidden="true"><span>FIG. 01</span><span>THINGS MAKE SENSE TOGETHER.</span></div>
      <div
        className="culture-object-stage"
        onPointerMove={tilt}
        onPointerDown={tilt}
        onPointerLeave={resetTilt}
        onPointerUp={resetTilt}
        onPointerCancel={resetTilt}
      >
        <div className="culture-object-calibration" aria-hidden="true"><i/><i/><i/><i/></div>
        <div className="culture-object-tilt" aria-hidden="true">
          <div className="culture-object-assembly">
            <div className="culture-object-orbit culture-object-orbit-a">
              <svg viewBox="0 0 360 360" className="culture-object-ring">
                <defs><path id={`${uid}-orbit`} d="M180 17a163 163 0 1 1-.01 0"/></defs>
                <circle cx="180" cy="180" r="151"/>
                <text><textPath href={`#${uid}-orbit`} startOffset="1%">CULTURE · CONTEXT · CURIOSITY · CULTURE · CONTEXT · CURIOSITY · </textPath></text>
                <circle className="culture-object-locator" cx="180" cy="29" r="4"/>
              </svg>
            </div>
            <div className="culture-object-orbit culture-object-orbit-b"><svg viewBox="0 0 360 360"><circle cx="180" cy="180" r="155"/><path d="M180 19v12M180 329v12M19 180h12M329 180h12"/><circle className="culture-object-node" cx="25" cy="180" r="5"/></svg></div>
            <div className="culture-object-puzzle">
              {pieces.map((piece, index) => (
                <div className={`culture-object-piece culture-object-piece-${index}`} key={piece.word}>
                  {[12, 9, 6, 3].map(depth => <svg className="culture-object-edge" key={depth} viewBox="0 0 200 200" style={{ transform: `translateZ(-${depth}px)` }}><path d={piece.path}/></svg>)}
                  <svg className="culture-object-face" viewBox="0 0 200 200"><path d={piece.path}/><text x={piece.x} y={piece.y} textAnchor="middle">{piece.word}</text><path className="culture-object-registration" d={`M${piece.x - 4} ${piece.y + 12}h8m-4-4v8`}/></svg>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="culture-object-coordinate" aria-hidden="true"><span>12°58′ N</span><span>77°35′ E</span></div>
      </div>
      <figcaption className="culture-object-bottomline">
        <button className="culture-object-arrange" onClick={() => setScattered(value => !value)} aria-pressed={scattered}>
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d={scattered ? "M1 5h4V1m6 0v4h4M1 11h4v4m6 0v-4h4" : "M1 5V1h4m6 0h4v4M1 11v4h4m6 0h4v-4"}/></svg>
          <span>{scattered ? "Make sense" : "Pull it apart"}</span>
        </button>
        <div className="culture-object-tools">
          <button onClick={() => setTurn(value => value + 1)} aria-label="Turn the sculpture a quarter turn" title="A different perspective"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M15.6 6a6 6 0 1 0 .2 7M16 2v5h-5"/></svg></button>
          <button onClick={() => setPaused(value => !value)} disabled={reducedMotion} aria-label={reducedMotion ? "Motion is off to match your device preference" : paused ? "Play sculpture motion" : "Pause sculpture motion"} aria-pressed={paused} title={reducedMotion ? "Reduced motion is on" : paused ? "Play motion" : "Pause motion"}><svg viewBox="0 0 20 20" aria-hidden="true">{paused ? <path d="m7 4 9 6-9 6Z"/> : <path d="M7 4v12M13 4v12"/>}</svg></button>
        </div>
      </figcaption>
    </figure>
  );
}
