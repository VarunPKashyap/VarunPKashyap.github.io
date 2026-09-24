"use client";
import {useEffect,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,ArrowUpRight,Plus} from 'lucide-react';
import {Tabs,TabsContent,TabsList,TabsTrigger} from '@/components/ui/tabs';
import {MiniGame} from './mini-game';
import digest from '../public/digest.json';
import archive from '../public/digest-archive.json';
import digestImages from '../public/digest-images.json';
type ReadImage={src:string;alt:string;sourceUrl:string;sourcePage:string;credit?:string;creditUrl?:string;license?:string;licenseUrl?:string;modifications?:string};
const images:Record<string,ReadImage>=digestImages;
const editionCover=(edition:{items:{id:string}[]})=>edition.items.map(item=>images[item.id]).find(image=>image&&!image.credit);

const editions=[...archive.editions].sort((a,b)=>Number(b.edition)-Number(a.edition));
const formatDate=(date:string)=>new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(`${date}T12:00:00Z`));
const editionLink=(edition:string)=>`#digest-edition-${edition}`;

export function Detour(){
 const [tab,setTab]=useState('digest');
 const [view,setView]=useState('latest');
 const heading=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{
  const sync=()=>{
   const hash=location.hash;
   if(hash==='#game'){setTab('game');return;}
   if(hash==='#detour'||hash.startsWith('#digest')){
    setTab('digest');
    setView(hash==='#digest-archive'?'archive':hash.startsWith('#digest-edition-')?hash.slice('#digest-edition-'.length):'latest');
   }
  };
  sync();window.addEventListener('hashchange',sync);window.addEventListener('popstate',sync);
  return()=>{window.removeEventListener('hashchange',sync);window.removeEventListener('popstate',sync)};
 },[]);
 useEffect(()=>{
  if(!location.hash.startsWith('#digest'))return;
  heading.current?.focus({preventScroll:true});
  document.getElementById('digest')?.scrollIntoView({block:'start'});
 },[view]);
 const chooseTab=(value:string)=>{
  setTab(value);if(value==='digest')setView('latest');
  window.history.pushState(null,'',value==='game'?'#game':'#digest');
 };
 const selected=view==='latest'?editions.find(e=>e.edition===digest.edition):editions.find(e=>e.edition===view);
 const index=selected?editions.findIndex(e=>e.edition===selected.edition):-1;
 const older=index>=0?editions[index+1]:undefined;
 const newer=index>0?editions[index-1]:undefined;
 const historical=!!selected&&selected.edition!==digest.edition;
 return <section className="detour-section" id="digest">
  {['game','detour','digest-archive',...editions.map(e=>`digest-edition-${e.edition}`)].map(id=><span key={id} id={id} className="detour-anchor" aria-hidden="true"/>)}
  <div className="section-top"><span className="meta">06 / Read something. Close something.</span><a className="meta" href="https://substack.com/@hopper1206" target="_blank" rel="noopener noreferrer">Varun on Substack ↗</a></div>
  <Tabs value={tab} onValueChange={chooseTab} className="detour-tabs">
   <TabsList className="detour-tab-list" data-active={tab} aria-label="Choose the weekly digest or game"><TabsTrigger value="digest">Weekly digest<span>01</span></TabsTrigger><TabsTrigger value="game">Close the tabs<span>02</span></TabsTrigger></TabsList>
   <TabsContent value="digest">
    <nav className="digest-navigation" aria-label="Digest navigation">
     <a href="#digest" aria-current={view==='latest'?'page':undefined}>Latest edition</a>
     <a href="#digest-archive" aria-current={view==='archive'?'page':undefined}>Browse the archive <span>{editions.length}</span></a>
     <span className="digest-schedule">New selections every Monday</span>
    </nav>
    {view==='archive'?<>
     <div className="digest-intro"><h2 ref={heading} tabIndex={-1}>Good tabs.<br/>Kept open.</h2><div><p>Every edition, in one place.</p><span className="digest-disclosure">Now weekly. The original daily editions are here too.</span></div></div>
     <ol className="digest-archive-list">{editions.map(edition=><li key={edition.edition}><a href={editionLink(edition.edition)}>
      {editionCover(edition)&&<img className="digest-archive-thumb" src={editionCover(edition)!.src} alt="" loading="lazy"/>}<span className="digest-archive-meta"><span className="meta">Edition {edition.edition}</span><time dateTime={edition.updatedAt}>{formatDate(edition.updatedAt)}</time><span>{edition.cadence==='daily'?'Daily edition':'Weekly edition'}{edition.edition===digest.edition?' · Latest':''}</span></span>
      <span className="digest-archive-copy"><span className="digest-archive-title">{edition.headline}</span><span className="digest-archive-preview">{edition.items.map(item=>item.title).join(' / ')}</span><span className="digest-archive-count">{edition.items.length} picks</span></span><ArrowRight size={24}/>
     </a></li>)}</ol>
    </>:selected?<>
     <div className="digest-intro"><h2 ref={heading} tabIndex={-1}>{historical?<>From the<br/>archive.</>:<>Worth opening<br/>a tab for.</>}</h2><div><p>{selected.headline}</p><span className="meta">Edition {selected.edition} / <time dateTime={selected.updatedAt}>{formatDate(selected.updatedAt)}</time></span><span className="digest-disclosure">{historical?'Varun’s recommended reads':'A curated weekly selection'}</span>{!historical&&<a className="digest-permalink" href={editionLink(selected.edition)}>Link to this edition →</a>}</div></div>
     <p className="digest-archive-notice">{historical?'An earlier edition, preserved as published.':'Selections reflect the publication date above.'} Events and availability may have changed; check the source before making plans.</p>
     <div className="digest-list" key={selected.edition}>{selected.items.map((item,i)=><article className="digest-item" key={item.id}><div className="digest-media">{images[item.id]?<><a className="digest-thumbnail" href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`Read ${item.title}`}><img src={images[item.id].src} alt={images[item.id].alt} loading="lazy" width="1200" height="675"/><span className="digest-number" aria-hidden="true">0{i+1}</span></a>{images[item.id].credit&&<p className="digest-photo-credit"><a href={images[item.id].creditUrl} target="_blank" rel="noopener noreferrer">{images[item.id].credit}</a>{images[item.id].license&&<> · <a href={images[item.id].licenseUrl} target="_blank" rel="noopener noreferrer">{images[item.id].license}</a></>}{images[item.id].modifications&&<> · {images[item.id].modifications}</>}</p>}</>:<a className="digest-thumbnail digest-thumbnail-text" href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`Read ${item.title}`}><span className="digest-number" aria-hidden="true">0{i+1}</span><span>{item.source}</span><ArrowUpRight size={32}/></a>}</div><div className="digest-copy"><span className="meta">{item.category}</span><h3><a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}<ArrowUpRight size={25}/></a></h3><span className="digest-source">{item.source} / {item.dateLabel}</span><p>{item.summary}</p><details><summary>Why it’s included<Plus size={16}/></summary><p>{item.angle}</p></details></div></article>)}</div>
     <nav className="digest-edition-pager" aria-label="Other editions">{older?<a href={editionLink(older.edition)}><ArrowLeft size={18}/>Older · {older.edition}</a>:<span/>}<a href="#digest-archive">All editions</a>{newer?<a href={editionLink(newer.edition)}>Newer · {newer.edition}<ArrowRight size={18}/></a>:<span/>}</nav>
     <details className="digest-method" key={`method-${selected.edition}`}><summary>How this digest is made<Plus size={18}/></summary><p>A curated weekly selection across culture, media, India, Substack and the open web. Essays, ideas and useful distractions, with a little context on why they’re worth your time. Original sources and publication dates are linked throughout.</p><div>{selected.sources.map(s=><a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">{s.name} ↗</a>)}</div><p>This edition was published on {formatDate(selected.updatedAt)}. New editions are scheduled for Mondays at 8am IST. If an update is delayed, the latest published edition stays available. Every edition is kept in the archive.</p></details>
    </>:<div className="digest-missing"><h2 ref={heading} tabIndex={-1}>Edition not found.</h2><p>This edition isn’t in the archive. Choose an available edition or return to the latest selection.</p><a href="#digest-archive">Browse all editions <ArrowRight size={18}/></a></div>}
   </TabsContent>
   <TabsContent value="game" forceMount><MiniGame active={tab==='game'}/></TabsContent>
  </Tabs>
 </section>;
}
