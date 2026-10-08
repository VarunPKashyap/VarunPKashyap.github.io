"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { notes } from "./notes";

type WorkingNotesProps = {
  onOpen: (index: number, trigger: HTMLButtonElement) => void;
};

const readingTime = (paragraphs: string[]) =>
  Math.max(1, Math.ceil(paragraphs.join(" ").split(/\s+/).length / 220));

export function WorkingNotes({ onOpen }: WorkingNotesProps) {
  const featuredIndex = notes.findIndex((note) => note.id === "meme");
  const featured = notes[featuredIndex];

  return (
    <section id="thinking" className="journal-section" aria-labelledby="journal-title">
      <div className="journal-topline">
        <span className="journal-meta">02 / Working notes</span>
        <a href="#digest">
          This week’s reading <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>

      <div className="journal-intro" data-reveal>
        <h2 id="journal-title">Working<br /><em>notes.</em></h2>
        <p>On memes, going out, buying things and naming trends.</p>
      </div>

      <article className="journal-feature" data-reveal>
        <div className="journal-feature-visual">
          <div className="journal-feature-meta journal-meta">
            <span>Note {featured.number} / {featured.category}</span>
            <span>{readingTime(featured.paragraphs)} min read</span>
          </div>
          <h3>
            <button
              className="journal-feature-title"
              onClick={(event) => onOpen(featuredIndex, event.currentTarget)}
              aria-haspopup="dialog"
              aria-label={`Read ${featured.title}`}
            >
              {featured.title}
              <span className="journal-feature-open" aria-hidden="true"><ArrowUpRight size={28} /></span>
            </button>
          </h3>
          <span className="journal-feature-foot journal-meta">{featured.label}</span>
        </div>
        <div className="journal-feature-copy">
          <span className="journal-meta">A note on {featured.category.toLowerCase()}</span>
          <p>{featured.teaser}</p>
          <blockquote className="journal-feature-question">{featured.question}</blockquote>
          <button
            className="journal-read"
            onClick={(event) => onOpen(featuredIndex, event.currentTarget)}
            aria-haspopup="dialog"
            aria-label={`Read ${featured.title}`}
          >
            Read the note <ArrowRight size={19} aria-hidden="true" />
          </button>
          <a className="journal-feature-source" href={featured.sources[0].url} target="_blank" rel="noopener noreferrer">From the Hannah Grey conversation <ArrowUpRight size={14} aria-hidden="true"/></a>
        </div>
      </article>

      <div className="journal-index" aria-label="More working notes">
        {notes.map((note, index) => index === featuredIndex ? null : (
          <article className="journal-index-entry" key={note.id}>
            <span className="journal-index-number journal-meta" aria-hidden="true">{note.number}</span>
            <h3>
              <button
                onClick={(event) => onOpen(index, event.currentTarget)}
                aria-haspopup="dialog"
                aria-label={`Read ${note.title}`}
              >
                {note.title}
                <ArrowUpRight size={21} aria-hidden="true" />
              </button>
            </h3>
            <div className="journal-index-detail">
              <span>{note.category}</span>
              <span>{readingTime(note.paragraphs)} min read</span>
            </div>
          </article>
        ))}
      </div>

    </section>
  );
}
