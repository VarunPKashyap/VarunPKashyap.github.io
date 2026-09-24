"use client";
import {useState} from 'react';
import {ArrowRight,ArrowUpRight,Check} from 'lucide-react';
import {Tabs,TabsContent,TabsList,TabsTrigger} from '@/components/ui/tabs';

const services=[
 {id:'brand',number:'01',title:'Brand strategy',body:'A clear position: who the brand is for, what it stands for, and why it should matter.',bring:'“People know what we sell. But what do we stand for?”',work:'Start with the audience, the category and the cultural context. Find the position the brand can credibly take.',decision:'A positioning statement, the supporting argument and principles for what the brand says and does.'},
 {id:'creative',number:'02',title:'Creative strategy',body:'A central thought and a sharper brief to guide what a team makes.',bring:'“We have the objective. We need the thought.”',work:'Question the assumptions in the brief. Connect the audience’s reality to an idea that gives the work direction.',decision:'A central thought, a message hierarchy and a brief the team can make work from.'},
 {id:'content',number:'03',title:'Content strategy',body:'An editorial purpose, a recognisable voice and a clear role for every piece.',bring:'“We’re saying a lot. What should people come to us for?”',work:'Look at what the audience values, what the brand can contribute and what the publishing habit is actually for.',decision:'An editorial premise, recurring topics, voice guidance and a clear job for each channel.'},
];
export function ServicesSection(){
 const [selected,setSelected]=useState('brand');const service=services.find(s=>s.id===selected)!;
 return <section id="services" className="services-section">
  <div className="section-top"><span className="meta">02 / Working together</span><span className="meta">Choose the question you’re carrying</span></div>
  <div className="services-heading"><h2>Working together.</h2><p>Bring the decision you are stuck on. We’ll find the thought that makes the next move clearer.</p></div>
  <Tabs value={selected} onValueChange={setSelected} className="service-picker">
   <TabsList className="services-grid" aria-label="Explore ways to work together">{services.map(s=><TabsTrigger value={s.id} className="service-card" key={s.id}><span className="service-number">{s.number}<span aria-hidden="true">{selected===s.id?<Check size={18}/>:<ArrowRight size={18}/>}</span></span><span className="service-title">{s.title}</span><span className="service-description">{s.body}</span></TabsTrigger>)}</TabsList>
   {services.map(s=><TabsContent key={s.id} value={s.id} className="service-answer"><div className="service-question"><span className="meta">You might bring</span><p>{s.bring}</p></div><div className="service-approach"><span className="meta">Where I’d start</span><p>{s.work}</p><div><span className="meta">What we leave with</span><p>{s.decision}</p></div></div></TabsContent>)}
  </Tabs>
  <div className="services-footer"><p>Bring a brief, a knotty question or an opportunity.</p><a href={`mailto:varunpkashyap98@gmail.com?subject=${encodeURIComponent(`Let’s talk ${service.title.toLowerCase()}`)}`}>Talk {service.title.toLowerCase()}<ArrowUpRight size={19}/></a></div>
 </section>;
}
