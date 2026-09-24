"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { notes } from "./notes";
const bands=['CULTURE IS WHAT PEOPLE DO WITH IT.  ','THE SAME THING CAN MEAN SOMETHING ELSE.  ','CONTEXT CHANGES THE QUESTION.  '];
export function TypeOrbit({onRead}:{onRead:(index:number,trigger:HTMLButtonElement)=>void}){
 const canvas=useRef<HTMLCanvasElement>(null);const container=useRef<HTMLDivElement>(null);const [selected,setSelected]=useState(3);const [paused,setPaused]=useState(false);
 const pausedRef=useRef(false);const selectedRef=useRef(3);const angles=useRef({x:-.48,y:.3,vx:0,vy:.002});
 const drag=useRef<{x:number;y:number;startX:number;startY:number;moved:boolean}|null>(null);
 useEffect(()=>{pausedRef.current=paused},[paused]);useEffect(()=>{selectedRef.current=selected},[selected]);
 useEffect(()=>{
  const c=canvas.current;if(!c||!container.current)return;const ctx=c.getContext('2d');if(!ctx)return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;let width=0,height=0,frame=0,active=true;let last=0;let beginning=0;
  const size=()=>{const r=container.current!.getBoundingClientRect();width=r.width;height=r.height;const d=Math.min(devicePixelRatio,2);c.width=width*d;c.height=height*d;ctx.setTransform(d,0,0,d,0,0)};
  const resize=new ResizeObserver(size);resize.observe(container.current);size();
  const draw=(time:number)=>{
   if(!active)return;
   if(!beginning)beginning=time;const arrival=reduce?1:Math.min((time-beginning)/1500,1);const entrance=1-Math.pow(1-arrival,3);
   const dt=Math.min((time-last)/16.67,2)||1;last=time;
   const a=angles.current;
   if(!drag.current&&!pausedRef.current&&!reduce){a.y+=a.vy*dt+.0015*dt;a.x+=a.vx*dt;a.vx*=.95;a.vy*=.98;}
   ctx.clearRect(0,0,width,height);
   const radius=Math.min(width*.37,height*.39);const cx=width*.5,cy=height*.47;
   const glyphs:{char:string;x:number;y:number;z:number;angle:number;scale:number;band:number}[]=[];
   const project=(x:number,y:number,z:number)=>{const xx=x*Math.cos(a.y)+z*Math.sin(a.y);const zz=-x*Math.sin(a.y)+z*Math.cos(a.y);const yy=y*Math.cos(a.x)-zz*Math.sin(a.x);const z2=y*Math.sin(a.x)+zz*Math.cos(a.x);const p=900/(900-z2);return{x:cx+xx*p,y:cy+yy*p,z:z2,scale:p}};
   bands.forEach((text,band)=>{
    const count=text.length*2;const ringRadius=radius*(1-band*.145);
    for(let i=0;i<count;i++){
     const theta=i/count*Math.PI*2;const twist=band===0?.23:band===1?-1.05:1.05;
     const point=(t:number)=>{const x=Math.cos(t)*ringRadius;const y=Math.sin(t)*ringRadius;return project(x,y*Math.cos(twist),y*Math.sin(twist))};
     const p=point(theta),next=point(theta+.005);
     glyphs.push({char:text[i%text.length],x:p.x,y:p.y,z:p.z,angle:Math.atan2(next.y-p.y,next.x-p.x),scale:p.scale,band});
    }
   });
   glyphs.sort((a,b)=>a.z-b.z);
   glyphs.forEach(g=>{const alpha=.17+.83*(g.z/radius+1)/2;ctx.save();ctx.translate(cx+(g.x-cx)*(1+(1-entrance)*.5),cy+(g.y-cy)*(1+(1-entrance)*.5));ctx.rotate(g.angle+(1-entrance)*.25);ctx.globalAlpha=entrance;ctx.fillStyle=g.band===selectedRef.current%3?`rgba(255,94,52,${Math.max(.28,alpha)})`:`rgba(242,242,236,${alpha})`;ctx.font=`600 ${Math.max(16,radius*.105)*g.scale}px Arial,sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(g.char,0,0);ctx.restore()});
   frame=requestAnimationFrame(draw);
  };
  const observer=new IntersectionObserver(entries=>{active=entries[0].isIntersecting;cancelAnimationFrame(frame);if(active){last=0;frame=requestAnimationFrame(draw)}},{rootMargin:'60px'});observer.observe(container.current);
  return()=>{resize.disconnect();observer.disconnect();cancelAnimationFrame(frame)};
 },[]);
 const choose=(i:number)=>{setSelected(i);angles.current.vy=.04;angles.current.vx=(i%2?1:-1)*.008};
 return <div className="orbit-experience">
  <div className="orbit-canvas" ref={container} onPointerDown={e=>{if(e.button!==0)return;drag.current={x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,moved:false};e.currentTarget.setPointerCapture(e.pointerId);e.currentTarget.classList.add('is-turning')}} onPointerMove={e=>{const d=drag.current;if(!d)return;const dx=e.clientX-d.x,dy=e.clientY-d.y;if(Math.abs(e.clientX-d.startX)+Math.abs(e.clientY-d.startY)>5)d.moved=true;angles.current.y+=dx*.007;angles.current.x+=dy*.005;angles.current.vy=dx*.002;angles.current.vx=dy*.001;d.x=e.clientX;d.y=e.clientY}} onPointerUp={e=>{if(drag.current&&!drag.current.moved)choose((selected+1)%notes.length);drag.current=null;e.currentTarget.classList.remove('is-turning')}} onPointerCancel={e=>{drag.current=null;e.currentTarget.classList.remove('is-turning')}}>
   <canvas ref={canvas} aria-hidden="true"/><div className="orbit-centre" aria-hidden="true"><span>V</span><span>↗</span></div>
  </div>
  <div className="orbit-tools"><span>Drag to turn. Tap to change perspective.</span><button onClick={()=>setPaused(!paused)} aria-label={paused?'Play motion':'Pause motion'}>{paused?<Play size={14}/>:<Pause size={14}/>}</button></div>
  <div className="orbit-index" aria-label="Choose a perspective">{notes.map((n,i)=><button key={n.id} onClick={()=>choose(i)} aria-pressed={selected===i} aria-label={`Perspective ${i+1}: ${n.category}`}>{n.number}</button>)}</div>
  <div className="orbit-caption" aria-live="polite"><div><span className="meta">{notes[selected].category}</span><p key={selected}>{notes[selected].title}</p></div><button className="orbit-open" onClick={e=>onRead(selected,e.currentTarget)} aria-label={`Read ${notes[selected].title}`}><ArrowUpRight size={28}/></button></div>
 </div>
}
