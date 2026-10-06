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

/** A physical metaphor for finding the relationship between things. */
export function CultureObject() {
  const uid = useId().replace(/:/g, "");
  const root = useRef<HTMLElement>(null);
  const frame = useRef(0);
  const reduced = useRef(false);
  const finePointer = useRef(false);
  const introStarted = useRef(false);
  const [scattered, setScattered] = useState(false);
  const [entering, setEntering] = useState(false);
  const [replay, setReplay] = useState(0);
  const [motionReady, setMotionReady] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => {
      reduced.current = media.matches;
      finePointer.current = pointer.matches;
      setReducedMotion(media.matches);
      if (media.matches) {
        introStarted.current = true;
        setEntering(false);
        setScattered(false);
      }
      if (media.matches || !pointer.matches) resetTilt();
    };
    const updatePause = () => {
      const paused = document.documentElement.hasAttribute("data-motion-paused");
      setMotionPaused(paused);
      if (paused) resetTilt();
    };
    update();
    updatePause();
    setMotionReady(true);
    media.addEventListener("change", update);
    pointer.addEventListener("change", update);
    const pauseObserver = new MutationObserver(updatePause);
    pauseObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion-paused"] });
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (!entry.isIntersecting) resetTilt();
    }, { threshold: .2 }) : null;
    if (observer && root.current) observer.observe(root.current);
    else setInView(true);
    return () => {
      media.removeEventListener("change", update);
      pointer.removeEventListener("change", update);
      pauseObserver.disconnect();
      observer?.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, []);

  useEffect(() => {
    if (!motionReady || !inView || reducedMotion || motionPaused || introStarted.current) return;
    introStarted.current = true;
    setEntering(true);
  }, [motionReady, inView, reducedMotion, motionPaused]);

  const tilt = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced.current || motionPaused || !inView || !finePointer.current || event.pointerType !== "mouse" || (root.current?.clientWidth ?? 0) < 360) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      root.current?.style.setProperty("--culture-object-tilt-x", `${-y * 10}deg`);
      root.current?.style.setProperty("--culture-object-tilt-y", `${x * 12}deg`);
    });
  };

  const resetTilt = () => {
    cancelAnimationFrame(frame.current);
    root.current?.style.setProperty("--culture-object-tilt-x", "0deg");
    root.current?.style.setProperty("--culture-object-tilt-y", "0deg");
  };

  const interruptEntrance = () => {
    introStarted.current = true;
    setEntering(false);
  };

  const replayAssembly = () => {
    if (reducedMotion || motionPaused) return;
    introStarted.current = true;
    setScattered(false);
    setReplay(value => value + 1);
    setEntering(true);
  };

  return (
    <figure
      className="culture-object"
      ref={root}
      data-scattered={scattered}
      data-entering={entering}
      data-paused={motionPaused || !inView}
      style={{ "--culture-object-turn": `${turn * 90}deg` } as CSSProperties}
      aria-label="An interactive sculpture about connecting cultural observations"
    >
      <div
        className="culture-object-stage"
        onPointerMove={tilt}
        onPointerLeave={resetTilt}
        onPointerUp={resetTilt}
        onPointerCancel={resetTilt}
      >
        <div className="culture-object-tilt" aria-hidden="true">
          <div className="culture-object-assembly">
            <div className="culture-object-orbit">
              <svg viewBox="0 0 360 360" className="culture-object-ring">
                <defs><path id={`${uid}-orbit`} d="M180 17a163 163 0 1 1-.01 0"/></defs>
                <circle cx="180" cy="180" r="151"/>
                <text textLength="1010" lengthAdjust="spacing"><textPath href={`#${uid}-orbit`} startOffset="1%">CULTURE · CONTEXT · CURIOSITY · CULTURE · CONTEXT · CURIOSITY · </textPath></text>
              </svg>
            </div>
            <div className="culture-object-puzzle" key={replay}>
              {pieces.map((piece, index) => (
                <div className={`culture-object-piece culture-object-piece-${index}`} key={piece.word} onAnimationEnd={event => {
                  if (index === pieces.length - 1 && event.animationName === "culture-object-arrive") setEntering(false);
                }}>
                  {[12, 9, 6, 3].map(depth => <svg className="culture-object-edge" key={depth} viewBox="0 0 200 200" style={{ transform: `translateZ(-${depth}px)` }}><path d={piece.path}/></svg>)}
                  <svg className="culture-object-face" viewBox="0 0 200 200"><path d={piece.path}/><text x={piece.x} y={piece.y} textAnchor="middle">{piece.word}</text></svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <figcaption className="culture-object-bottomline">
        <button type="button" className="culture-object-arrange" onClick={() => { interruptEntrance(); setScattered(value => !value); }} aria-pressed={scattered}>
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d={scattered ? "M1 5h4V1m6 0v4h4M1 11h4v4m6 0v-4h4" : "M1 5V1h4m6 0h4v4M1 11v4h4m6 0h4v-4"}/></svg>
          <span>{scattered ? "Make sense" : "Pull it apart"}</span>
        </button>
        <div className="culture-object-tools">
          <button type="button" onClick={() => { interruptEntrance(); setTurn(value => value + 1); }} aria-label="Turn the sculpture a quarter turn" title="A different perspective"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M15.6 6a6 6 0 1 0 .2 7M16 2v5h-5"/></svg></button>
          <button type="button" onClick={replayAssembly} disabled={reducedMotion || motionPaused} aria-label={reducedMotion ? "Replay unavailable while reduced motion is on" : motionPaused ? "Replay unavailable while site motion is paused" : "Replay assembly"} title={reducedMotion ? "Reduced motion is on" : motionPaused ? "Site motion is paused" : "Replay assembly"}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 6a7 7 0 1 1-1 7M4 2v5h5"/><path d="m8 7 5 3-5 3Z"/></svg></button>
        </div>
      </figcaption>
    </figure>
  );
}
