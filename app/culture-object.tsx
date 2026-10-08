"use client";

import { useId, useState } from "react";
import { notes } from "./notes";
import "./culture-object.css";

export type CultureObjectProps = {
  onOpenNote: (index: number, trigger: HTMLButtonElement) => void;
};

const eye = [
  "    #####    ",
  "  ###   ###  ",
  " ### vvv ### ",
  "### vv#vv ###",
  " ### vvv ### ",
  "  ###   ###  ",
  "    #####    ",
];
const eyePixels = eye.flatMap((row, y) => Array.from(row, (ink, x) => ({ ink, x, y })).filter(pixel => pixel.ink !== " "));
const memeNoteIndex = notes.findIndex(note => note.id === "meme");

export function CultureObject({ onOpenNote }: CultureObjectProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  return <aside className="culture-object" data-open={open} aria-labelledby={`${id}-title`}>
    <div className="culture-observation">
      <p className="culture-field-label">A small observation</p>
      <h2 id={`${id}-title`}>A meme in<br/>your inbox.</h2>
      <p className="culture-first-look">Easy to dismiss as more content.</p>
    </div>
    <button type="button" className="culture-look" aria-expanded={open} aria-controls={`${id}-context`} onClick={() => setOpen(current => !current)}>
      <svg className="culture-eye" viewBox="0 0 52 28" aria-hidden="true" focusable="false">
        {eyePixels.map((pixel, index) => <rect key={index} className={pixel.ink === "v" ? "culture-eye-iris" : undefined} x={pixel.x * 4} y={pixel.y * 4} width="4" height="4" />)}
      </svg>
      <span>{open ? "Close" : "Look closer"}</span>
      <span className="culture-look-mark" aria-hidden="true">{open ? "−" : "+"}</span>
    </button>
    <div id={`${id}-context`} className="culture-context" hidden={!open}>
      <p className="culture-context-possibility">Sometimes, it means:</p>
      <p className="culture-context-thought">“This reminded<br/>me of you.”</p>
      <p className="culture-context-copy">The image is only part of it. Choosing someone to send it to can be a way of keeping in touch.</p>
      {memeNoteIndex >= 0 && <button type="button" className="culture-read-note" onClick={event => onOpenNote(memeNoteIndex, event.currentTarget)}>
        <span>Read the working note</span><span aria-hidden="true">↗</span>
      </button>}
    </div>
  </aside>;
}
