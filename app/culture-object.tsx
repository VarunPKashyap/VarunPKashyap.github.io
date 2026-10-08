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
const observations = [
  {
    noteId: "meme", label: "A meme", title: ["A meme in", "your inbox."],
    firstLook: "Easy to dismiss as more content.",
    thought: ["This reminded", "me of you."],
    context: "The image is only part of it. Choosing someone to send it to can be a way of keeping in touch.",
  },
  {
    noteId: "friction", label: "A purchase", title: ["A pause at", "checkout."],
    firstLook: "Easy to count as a lost sale.",
    thought: ["Actually, I already", "have one."],
    context: "An unclear price and a useful second thought can look like the same pause. It matters which one we’re trying to remove.",
  },
  {
    noteId: "arriving", label: "A table", title: ["A table", "for one."],
    firstLook: "The booking tells you how many. Not what they want.",
    thought: ["I’ll see how", "the evening goes."],
    context: "Someone arriving alone might want conversation, quiet, or room to decide. Good hospitality can make space for all three.",
  },
];

export function CultureObject({ onOpenNote }: CultureObjectProps) {
  const id = useId();
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState([false, false, false]);
  const observation = observations[selected];
  const noteIndex = notes.findIndex(note => note.id === observation.noteId);
  const open = expanded[selected];

  return <aside className="culture-object" data-open={open} aria-labelledby={`${id}-title`}>
    <div className="culture-field-heading">
      <p className="culture-field-label">Three small observations</p>
      <span className="culture-field-count" aria-hidden="true">0{selected + 1} / 03</span>
    </div>
    <div className="culture-choices" role="group" aria-label="Choose an observation">
      {observations.map((item, index) => <button key={item.noteId} type="button" aria-pressed={selected === index} aria-controls={`${id}-observation`} onClick={() => setSelected(index)}>{item.label}</button>)}
    </div>
    <div id={`${id}-observation`} className="culture-observation" aria-live="polite" aria-atomic="true">
      <h2 id={`${id}-title`}>{observation.title[0]}<br/>{observation.title[1]}</h2>
      <p className="culture-first-look">{observation.firstLook}</p>
    </div>
    <button type="button" className="culture-look" aria-expanded={open} aria-controls={`${id}-context`} aria-label={`${open ? "Close" : "Look closer"}: ${observation.title.join(" ")}`} onClick={() => setExpanded(current => current.map((value, index) => index === selected ? !value : value))}>
      <svg className="culture-eye" viewBox="0 0 52 28" aria-hidden="true" focusable="false">
        {eyePixels.map((pixel, index) => <rect key={index} className={pixel.ink === "v" ? "culture-eye-iris" : undefined} x={pixel.x * 4} y={pixel.y * 4} width="4" height="4" />)}
      </svg>
      <span>{open ? "Close" : "Look closer"}</span>
      <span className="culture-look-mark" aria-hidden="true">{open ? "−" : "+"}</span>
    </button>
    <div key={observation.noteId} id={`${id}-context`} className="culture-context" hidden={!open}>
      <p className="culture-context-possibility">Sometimes, it means:</p>
      <p className="culture-context-thought">“{observation.thought[0]}<br/>{observation.thought[1]}”</p>
      <p className="culture-context-copy">{observation.context}</p>
      {noteIndex >= 0 && <button type="button" className="culture-read-note" aria-haspopup="dialog" aria-label={`Read the working note: ${notes[noteIndex].title}`} onClick={event => onOpenNote(noteIndex, event.currentTarget)}>
        <span>Read the working note</span><span aria-hidden="true">↗</span>
      </button>}
    </div>
  </aside>;
}
