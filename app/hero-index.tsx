import { ArrowUpRight } from "lucide-react";

const entries = [
  { number: "01", title: "Look closer", outcome: "Ask the question the brief missed.", href: "#thinking" },
  { number: "02", title: "Find the words", outcome: "Give an idea a form others can use.", href: "#articulation" },
  { number: "03", title: "Make a decision", outcome: "Root decisions in cultural context.", href: "#work" },
];

export function HeroIndex() {
  return <div className="capability-table" aria-label="How I work">
    <span className="capability-caption">How I work, in three moves</span>
    <div className="capability-index">
      {entries.map(entry => <a href={entry.href} key={entry.number} className="capability-entry">
        <span className="capability-number">{entry.number}</span>
        <span className="capability-name">{entry.title}</span>
        <span className="capability-outcome">{entry.outcome}</span>
        <ArrowUpRight size={18} aria-hidden="true"/>
      </a>)}
    </div>
  </div>;
}
