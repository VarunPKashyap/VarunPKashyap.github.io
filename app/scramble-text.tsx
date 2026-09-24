"use client";
import {useEffect,useRef,useState} from 'react';
const glyphs='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export function ScrambleText({text,delay=0}:{text:string;delay?:number}){
 const [display,setDisplay]=useState(text);const frame=useRef(0);const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const run=()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;cancelAnimationFrame(frame.current);const start=performance.now();const step=(now:number)=>{const progress=Math.min(1,(now-start)/520);setDisplay([...text].map((c,i)=>c===' '||c==='.'||i/text.length<progress?c:glyphs[(i*7+Math.floor(now/65))%glyphs.length]).join(''));if(progress<1)frame.current=requestAnimationFrame(step);else setDisplay(text)};frame.current=requestAnimationFrame(step)};
 useEffect(()=>{timer.current=setTimeout(run,delay);return()=>{if(timer.current)clearTimeout(timer.current);cancelAnimationFrame(frame.current)}},[text,delay]);
 return <span className="scramble-text" onPointerEnter={run}><span className="sr-only">{text}</span><span className="scramble-measure" aria-hidden="true">{text}</span><span className="scramble-output" aria-hidden="true">{display}</span></span>
}
