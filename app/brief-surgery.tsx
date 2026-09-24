"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
const briefs=[
 {label:'Build community',phrase:'We need to build a community.',aside:'Everyone nodded. Nobody pictured the same room.',questions:[['Who?','People with a shared interest? A shared problem? Or just the same purchase history?'],['Why together?','What could they get from one another that they can’t get from us?'],['Why us?','What gives this brand a useful role here? What would we need to earn?']],thought:'A community needs a reason to exist when the brand isn’t talking.',next:'I’d look for an existing need for exchange, who is already meeting it, and what people would have to contribute to keep it going. The brand’s role might be hosting, funding or simply making room.'},
 {label:'Be culturally relevant',phrase:'We need to be culturally relevant.',aside:'A phrase with an astonishing number of escape routes.',questions:[['To whom?','Which people, in which part of their lives? “Culture” is doing quite a lot of work here.'],['Useful how?','Are we helping people understand, enjoy, express or do something?'],['At what cost?','Whose work or trust would we be drawing on? What would our participation give back, and what might it crowd out?']],thought:'Relevance depends on the role people give you. You don’t get to award it to yourself.',next:'I’d find the particular context where the brand has something credible to contribute. The answer may be small. It still has to matter.'},
 {label:'Drive engagement',phrase:'We need to drive engagement.',aside:'With what? For what? The measure needs an explanation.',questions:[['What happened?','A laugh, a reply, an argument, a saved plan? The number folds different events together.'],['For the person?','What did participating give them? What did it ask of them?'],['Then what?','What useful relationship would that action have to the purpose of this work?']],thought:'A response is evidence that something happened. The interpretation still needs doing.',next:'I’d define the change we hope the work makes, then choose what to observe. Otherwise the easiest reaction to count starts writing the brief.'}
];
const startingPoints=[
 [
  ['New runners','Film lovers','People new to a city'],
  ['Build a shared ritual','Exchange useful knowledge','Make a first connection'],
  ['Support independent hosts','Fund the tools people need','Host a small, recurring gathering'],
 ],
 [
  ['First-time gig-goers','Local food enthusiasts','A film fan community'],
  ['Find a way in','Express what they care about','Connect through a shared interest'],
  ['Credit the people shaping the scene','Pay collaborators for their contribution','Build on a format people already value'],
 ],
 [
  ['A plan saved for later','A decision made with friends','Something new tried'],
  ['Make choosing easier','Give friends a reason to gather','Lower the barrier to a first visit'],
  ['Plans that become actual visits','People who come back','Friends who participate together'],
 ],
];
export function BriefSurgery(){
 const [selected,setSelected]=useState(0);const [opened,setOpened]=useState(false);const [step,setStep]=useState(0);
 const [choices,setChoices]=useState<number[]>([0,0,0]);const [showAll,setShowAll]=useState(false);const frame=useRef<HTMLDivElement>(null);const stepHeading=useRef<HTMLHeadingElement>(null);
 const brief=briefs[selected],options=startingPoints[selected];
 const selectedText=choices.map((choice,i)=>options[i][choice]);
 const lower=(value:string)=>value.charAt(0).toLowerCase()+value.slice(1);
 const direction=selected===0?`Help ${lower(selectedText[0])} ${lower(selectedText[1])}. Explore how the brand could ${lower(selectedText[2])}.`:selected===1?`Help ${lower(selectedText[0])} ${lower(selectedText[1])}. Start by finding a way to ${lower(selectedText[2])}.`:`Make work that can ${lower(selectedText[1])}, with ${lower(selectedText[0])} as the intended response. Look for ${lower(selectedText[2])}.`;
 useEffect(()=>{if(!opened)return;const tick=requestAnimationFrame(()=>{stepHeading.current?.focus({preventScroll:true});stepHeading.current?.scrollIntoView({block:'nearest',behavior:'instant'})});return()=>cancelAnimationFrame(tick)},[step,opened,selected]);
 const chooseBrief=(index:number)=>{setSelected(index);setOpened(false);setStep(0);setChoices([0,0,0]);setShowAll(false)};
 const move=(next:number)=>setStep(next);
 return <div className="brief-surgery">
  <div className="brief-toolbar"><span className="mono">Take a familiar brief. Make a few decisions.</span><span className="brief-stamp">LANGUAGE → DECISIONS</span></div>
  <div className="brief-options" role="group" aria-label="Choose a familiar brief">{briefs.map((b,i)=><button key={b.label} aria-pressed={selected===i} onClick={()=>chooseBrief(i)}>{b.label}<span>0{i+1}</span></button>)}</div>
  <div key={selected} className={`brief-paper ${opened?'is-open':''}`}>
   <div className="brief-original"><span className="mono">Starting brief</span><p className="brief-phrase">{brief.phrase}</p><p className="brief-aside">{brief.aside}</p><button className="brief-action" aria-expanded={opened} aria-controls="brief-decisions" onClick={()=>setOpened(!opened)}>{opened?'Close the working session':'Work on this brief'}{opened?<RotateCcw size={16}/>:<ArrowRight size={18}/>}</button></div>
   <div className="brief-workbench" id="brief-decisions" hidden={!opened} ref={frame}>
    <div className="brief-path" role="group" aria-label="Brief decisions">{[...brief.questions.map(q=>q[0]),'Working direction'].map((label,i)=><button key={label} onClick={()=>move(i)} aria-pressed={step===i} data-past={i<step}><span>{i<step?<Check size={15}/>:String(i+1).padStart(2,'0')}</span><span>{label}</span></button>)}</div>
    {step<3?<div className="brief-choice" key={step}><div className="brief-choice-heading"><span className="meta">Decision 0{step+1} / 03</span><h3 ref={stepHeading} tabIndex={-1} aria-describedby="brief-question-copy">{brief.questions[step][0]}</h3><p id="brief-question-copy">{brief.questions[step][1]}</p></div><fieldset><legend>Try a starting point</legend>{options[step].map((option,i)=><label key={option}><input type="radio" name={`brief-choice-${selected}-${step}`} value={i} checked={choices[step]===i} onChange={()=>setChoices(current=>current.map((choice,j)=>j===step?i:choice))}/><span>{option}</span><Check size={17} aria-hidden="true"/></label>)}</fieldset></div>:<div className="brief-built"><span className="meta">A more useful working direction</span><h3 ref={stepHeading} tabIndex={-1}>{direction}</h3><span className="brief-built-note">A starting hypothesis to test with people, not a finished strategy.</span></div>}
    <div className="brief-step-controls"><button onClick={()=>move(Math.max(0,step-1))} disabled={step===0}><ArrowLeft size={18}/>Back</button><span>0{step+1} / 04</span><button onClick={()=>move(step===3?0:step+1)}>{step===3?'Try different decisions':step===2?'See the working direction':'Next decision'}<ArrowRight size={18}/></button></div>
    <button className="brief-scan" aria-expanded={showAll} aria-controls="brief-all-questions" onClick={()=>setShowAll(value=>!value)}>{showAll?'Hide the wider thinking':'See all the questions and my approach'}<span aria-hidden="true">{showAll?'−':'+'}</span></button>
    <div id="brief-all-questions" hidden={!showAll}><div className="brief-questions">{brief.questions.map(([q,body])=><div key={q}><h3>{q}</h3><p>{body}</p></div>)}</div><div className="brief-thought"><span className="mono">How I’d approach it</span><p>{brief.thought}</p><p>{brief.next}</p></div></div>
   </div>
  </div>
  <p className="brief-footnote">Illustrative examples. Answering these questions would require research with the people the brief concerns.</p>
 </div>;
}
