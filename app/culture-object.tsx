"use client";

import { useId, useState } from "react";
import type { CSSProperties } from "react";
import "./culture-object.css";

// A little piece of movable type. Every square has a place in the final print.
const print = [
  "    #####    ",
  "  ###   ###  ",
  " ### vvv ### ",
  "### vv#vv ###",
  " ### vvv ### ",
  "  ###   ###  ",
  "    #####    ",
];
const tiles = print.flatMap((row, y) => Array.from(row, (ink, x) => ({ ink, x: 24 + x * 24, y: 96 + y * 24 })).filter(tile => tile.ink !== " "));
const grid = Array.from({ length: 169 }, (_, index) => `M${34 + index % 13 * 24} ${34 + Math.floor(index / 13) * 24}h2v2h-2Z`).join("");

function arrangement(seed: number) {
  // Seeded, unique grid positions keep server rendering and the composition stable.
  const cells = Array.from({ length: 169 }, (_, index) => index);
  let value = seed >>> 0;
  for (let index = cells.length - 1; index > 0; index--) {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
    const destination = value % (index + 1);
    [cells[index], cells[destination]] = [cells[destination], cells[index]];
  }
  return cells.slice(0, tiles.length).map(cell => ({ x: 24 + cell % 13 * 24, y: 24 + Math.floor(cell / 13) * 24 }));
}

export function CultureObject() {
  const id = useId();
  const [focus, setFocus] = useState(100);
  const [seed, setSeed] = useState(17);
  const [adjusting, setAdjusting] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const scattered = arrangement(seed);
  const amount = focus / 100;

  function shuffle() {
    setAdjusting(false);
    setSeed(current => current + 1);
    setFocus(0);
    setAnnouncement("The squares have been shuffled. Move Focus towards 100 percent to bring the eye back together.");
  }

  return <figure className="culture-object" data-adjusting={adjusting} aria-labelledby={`${id}-caption`}>
    <div className="culture-object-stage">
      <svg className="culture-print" viewBox="0 0 360 360" aria-hidden="true" focusable="false">
        <path className="culture-print-grid" d={grid} style={{ opacity: (1 - amount) * .3 }} />
        {tiles.map((tile, index) => {
          const x = scattered[index].x + (tile.x - scattered[index].x) * amount;
          const y = scattered[index].y + (tile.y - scattered[index].y) * amount;
          return <rect key={index} className={`culture-print-tile${tile.ink === "v" ? " culture-print-violet" : ""}`} x="0" y="0" width="22" height="22" style={{ transform: `translate(${x}px, ${y}px)`, "--tile-delay": `${index % 7 * 14}ms` } as CSSProperties} />;
        })}
      </svg>
    </div>
    <figcaption className="culture-object-bottomline">
      <div className="culture-print-caption"><span id={`${id}-caption`}>Look closer.</span><button type="button" className="culture-print-shuffle" onClick={shuffle}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 4h3l6 8h3M2 12h3l6-8h3M11 1l3 3-3 3M11 9l3 3-3 3" stroke="currentColor" strokeWidth="1.25" /></svg>
        <span>Shuffle</span>
      </button></div>
      <div className="culture-print-control">
        <label htmlFor={`${id}-focus`}>Focus</label>
        <input id={`${id}-focus`} type="range" min="0" max="100" step="1" value={focus} aria-label="Focus the pixel eye" aria-describedby={`${id}-help`} aria-valuetext={`${focus} percent focused`} style={{ "--focus-position": `${focus}%` } as CSSProperties}
          onChange={event => { setFocus(Number(event.target.value)); setAnnouncement(""); }}
          onPointerDown={() => setAdjusting(true)} onPointerUp={() => setAdjusting(false)} onPointerCancel={() => setAdjusting(false)}
          onKeyDown={() => setAdjusting(true)} onKeyUp={() => setAdjusting(false)} onBlur={() => setAdjusting(false)} />
        <output htmlFor={`${id}-focus`} aria-hidden="true">{String(focus).padStart(3, "0")}</output>
      </div>
      <span id={`${id}-help`} className="culture-print-sr">Move the slider to arrange the squares into an eye. Arrow keys change the focus; Home scatters the squares and End brings them together.</span>
      <span className="culture-print-sr" role="status" aria-live="polite" aria-atomic="true">{announcement}</span>
    </figcaption>
  </figure>;
}
