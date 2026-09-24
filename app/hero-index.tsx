"use client";
import { ThoughtCard } from "./thought-card";
import { ArrowRight, Plus } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const entries = [
  { id: "curiosity", title: "Curiosity", outcome: "Ask the question the brief missed.", body: "I look closely at everyday choices and question the explanations we take for granted.", example: "", link: "Read the working notes", href: "#thinking" },
  { id: "articulation", title: "Articulation", outcome: "Give an idea its clearest form.", body: "I believe the ability to say what an idea means will matter even more as AI makes it easier to execute.", example: "", link: "Read my articulation hypothesis", href: "#articulation" },
  { id: "culture", title: "Cultural insights", outcome: "Give brand decisions cultural context.", body: "I connect what people do with the circumstances, codes and tensions around them.", example: "", link: "Explore the cultural reports", href: "#work" },
];

export function HeroIndex() {
  return <div className="capability-table">
    <span className="capability-caption">Three things I bring to every brief</span>
    <Accordion type="single" collapsible className="capability-accordion">
      {entries.map((entry,i)=><AccordionItem key={entry.id} value={entry.id} className="capability-item">
        <AccordionTrigger className="capability-trigger"><span className="capability-number">0{i+1}</span><span className="capability-label"><span className="capability-name">{entry.title}</span><span className="capability-outcome">{entry.outcome}</span></span><Plus className="capability-plus" aria-hidden="true"/></AccordionTrigger>
        <AccordionContent className="capability-content"><p>{entry.body}</p>{entry.example && <p className="capability-example">{entry.example}</p>}{entry.id !== "articulation" && <ThoughtCard kind={entry.id as "curiosity"|"culture"}/>}<a href={entry.href}>{entry.link}<ArrowRight size={17}/></a></AccordionContent>
      </AccordionItem>)}
    </Accordion>
  </div>;
}
