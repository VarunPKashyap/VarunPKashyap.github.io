"use client";
import {useState,type CSSProperties} from 'react';
import {ArrowLeft,ArrowRight,ArrowUpRight} from 'lucide-react';
import {Tabs,TabsList,TabsTrigger} from '@/components/ui/tabs';

const signals=[
 {id:'making',label:'Making it yours',page:60,printed:'120–121',image:'/assets/signal-making.webp',alt:'Touching Grass spread featuring the Gully Labs customisation table',title:'The souvenir is the thing you made.',observation:'At Gully Labs, visitors choose charms, laces and accents. At tufting studios, people leave with a rug they made.',reading:'The act of making can be part of the value. A personal object carries a decision, some effort, and a story about its owner.',question:'Where could people leave their own mark on the experience, rather than simply put the brand’s mark on themselves?'},
 {id:'analogue',label:'Analogue, then online',page:61,printed:'122–123',image:'/assets/signal-analogue.webp',alt:'Touching Grass spread titled Touch to Feel',title:'A film photo ends up on Instagram.',observation:'The report follows an analogue photograph from camera to development, then back through a phone and onto Instagram.',reading:'Physical and digital life can reinforce each other. Tactility offers something distinctive without requiring anyone to leave the internet behind.',question:'What could someone hold, make or keep that adds to the experience before it becomes something to post?'},
 {id:'curation',label:'Fewer, better choices',page:54,printed:'108–109',image:'/assets/signal-curation.webp',alt:'Touching Grass spread discussing trust, physical experience and curation',title:'Discovery can start to feel like work.',observation:'Touching Grass connects fatigue with endless choice to a desire for guidance: fewer options, with a point of view behind them.',reading:'Selection does some of the work for the audience. Explaining why a choice belongs helps make that judgement useful.',question:'What would we confidently leave out—and could we explain why the remaining choices deserve someone’s time?'},
];
const stages=['The observation','A possible reading','A question for brands'];
export function SignalDesk(){
 const [selected,setSelected]=useState('making');const [step,setStep]=useState(0);const [direction,setDirection]=useState(1);
 const index=signals.findIndex(signal=>signal.id===selected);const signal=signals[index];
 const choose=(id:string)=>{setDirection(signals.findIndex(s=>s.id===id)>=index?1:-1);setSelected(id);setStep(0)};
 const move=(next:number)=>{setDirection(next>=step?1:-1);setStep(next)};
 return <section className="signal-desk" aria-labelledby="signal-heading">
  <div className="signal-heading"><div><span className="meta">Inside the thinking / Touching Grass</span><h3 id="signal-heading">Pull at a thread.</h3></div><p>Start with something people do.<br/>See where the question takes you.</p></div>
  <Tabs value={selected} onValueChange={choose} className="signal-tabs">
   <TabsList className="signal-select" aria-label="Choose a cultural observation">{signals.map((item,i)=><TabsTrigger key={item.id} value={item.id} id={`signal-tab-${item.id}`} aria-controls="signal-panel"><span>0{i+1}</span>{item.label}<ArrowRight size={17} aria-hidden="true"/></TabsTrigger>)}</TabsList>
   <div id="signal-panel" role="tabpanel" aria-labelledby={`signal-tab-${signal.id}`} tabIndex={0} className="signal-panel" style={{'--signal-direction':direction} as CSSProperties}>
    <div className="signal-source"><div className="signal-pages"><div className="signal-underlay" aria-hidden="true"/><a key={signal.id} className="signal-page" href={`/assets/touching-grass-2026.pdf#page=${signal.page}`} target="_blank" rel="noopener noreferrer" aria-label={`Open source spread, pages ${signal.printed}`}><img src={signal.image} alt={signal.alt} width="1100" height="715" loading="lazy"/><span>Open the source<ArrowUpRight size={17}/></span></a></div><p>From the report · pp. {signal.printed}</p></div>
    <div className="signal-reading">
     <div className="signal-steps" role="group" aria-label="Follow the thought">{stages.map((label,i)=><button key={label} aria-label={label} aria-pressed={step===i} data-complete={i<step} onClick={()=>move(i)}><span>0{i+1}</span><span>{i===0?'Observe':i===1?'Interpret':'Ask'}</span></button>)}</div>
     <div aria-live="polite" aria-atomic="true"><div className="signal-stage" key={`${signal.id}-${step}`}><span className="signal-stage-label">{stages[step]}</span><h4>{step===0?signal.title:step===1?'What might be going on?':'What could a brand do with that?'}</h4><p>{[signal.observation,signal.reading,signal.question][step]}</p></div></div>
     <div className="signal-controls"><button aria-label="Previous part of the thought" disabled={step===0} onClick={()=>move(step-1)}><ArrowLeft size={18}/></button><span>0{step+1} / 03</span><button onClick={()=>step<2?move(step+1):choose(signals[(index+1)%signals.length].id)}>{step===0?'Read between the lines':step===1?'Ask the brand question':'Pull another thread'}<ArrowRight size={18}/></button></div>
    </div>
   </div>
  </Tabs>
  <p className="signal-footnote">Observations from the report; readings and questions offered for exploration, not as settled explanations.</p>
 </section>;
}
