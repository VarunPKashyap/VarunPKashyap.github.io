"use client";
import { useState, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const signals = [
  {
    id: "making", label: "Making it yours", page: 60, printed: "120–121",
    image: "/assets/signal-making.webp", alt: "Touching Grass spread featuring the Gully Labs customisation table",
    title: "The souvenir is the thing you made.",
    observation: "At Gully Labs, visitors choose charms, laces and accents. At tufting studios, people leave with a rug they made.",
    reading: "The act of making can be part of the value. A personal object carries a decision, some effort and a story about its owner.",
    decision: "Give people a way to personalise or make something they can keep. Let the object carry their choices, not only the brand’s logo.",
  },
  {
    id: "analogue", label: "Analogue, then online", page: 61, printed: "122–123",
    image: "/assets/signal-analogue.webp", alt: "Touching Grass spread titled Touch to Feel",
    title: "A film photo ends up on Instagram.",
    observation: "The report follows an analogue photograph from camera to development, then back through a phone and onto Instagram.",
    reading: "Physical and digital life can reinforce each other. Tactility offers something distinctive without requiring anyone to leave the internet behind.",
    decision: "Make room for a tactile moment people can hold before they decide whether to share it.",
  },
  {
    id: "curation", label: "Fewer, better choices", page: 54, printed: "108–109",
    image: "/assets/signal-curation.webp", alt: "Touching Grass spread discussing trust, physical experience and curation",
    title: "Discovery can start to feel like work.",
    observation: "Touching Grass connects fatigue with endless choice to a desire for guidance: fewer options, with a point of view behind them.",
    reading: "Selection does some of the work for the audience. Explaining why a choice belongs helps make that judgement useful.",
    decision: "Select a small number of options with a point of view, and explain why each deserves someone’s time.",
  },
];

export function SignalDesk() {
  const [selected, setSelected] = useState("making");
  const [motionDirection, setMotionDirection] = useState(1);
  const index = signals.findIndex(signal => signal.id === selected);
  const signal = signals[index];
  const choose = (id: string) => {
    setMotionDirection(signals.findIndex(item => item.id === id) >= index ? 1 : -1);
    setSelected(id);
  };

  return <section className="signal-desk" aria-labelledby="signal-heading">
    <div className="signal-heading">
      <div><span className="meta">Inside the thinking / Touching Grass</span><h3 id="signal-heading">From signal<br/>to decision.</h3></div>
      <p>Three examples of how cultural context can change the question a brand asks.</p>
    </div>
    <Tabs value={selected} onValueChange={choose} className="signal-tabs">
      <TabsList className="signal-select" aria-label="Choose a cultural observation">
        {signals.map((item, i) => <TabsTrigger key={item.id} value={item.id} id={`signal-tab-${item.id}`} aria-controls="signal-panel">
          <span>0{i + 1}</span>{item.label}<ArrowRight size={17} aria-hidden="true"/>
        </TabsTrigger>)}
      </TabsList>
      <div id="signal-panel" role="tabpanel" aria-labelledby={`signal-tab-${signal.id}`} tabIndex={0}
        className="signal-panel" style={{ "--signal-direction": motionDirection } as CSSProperties}>
        <div className="signal-source">
          <div className="signal-pages"><div className="signal-underlay" aria-hidden="true"/>
            <a key={signal.id} className="signal-page" href={`/assets/touching-grass-2026.pdf#page=${signal.page}`}
              target="_blank" rel="noopener noreferrer" aria-label={`Open source spread, pages ${signal.printed}`}>
              <img src={signal.image} alt={signal.alt} width="1100" height="715" loading="lazy"/>
              <span>Open the source <ArrowUpRight size={17}/></span>
            </a>
          </div>
          <p>From the report · pp. {signal.printed}</p>
        </div>
        <ol className="signal-chain" key={signal.id} aria-live="polite">
          <li><span className="signal-step-label">01 / Observe</span><div><h4>{signal.title}</h4><p>{signal.observation}</p></div></li>
          <li><span className="signal-step-label">02 / Interpret</span><div><h4>What it might mean</h4><p>{signal.reading}</p></div></li>
          <li className="signal-decision"><span className="signal-step-label">03 / Decide</span><div><h4>A direction to test</h4><p>{signal.decision}</p></div></li>
        </ol>
      </div>
    </Tabs>
    <p className="signal-footnote">The observations come from the report. Interpretations and directions are examples to test, not outcomes claimed for a brand.</p>
  </section>;
}
