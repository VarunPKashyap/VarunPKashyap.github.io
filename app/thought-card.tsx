"use client";
import {useState} from 'react';
import {RotateCw} from 'lucide-react';

const thoughts={
 curiosity:{front:'It’s just a meme.',back:'Or a small way of saying: I know your sense of humour.'},
 articulation:{front:'We need to drive engagement.',back:'What should someone do or feel differently?'},
 culture:{front:'People are going out alone.',back:'Independence and belonging can share a table.'},
};
export function ThoughtCard({kind}:{kind:keyof typeof thoughts}){
 const [turned,setTurned]=useState(false);const thought=thoughts[kind];
 return <button className="thought-turn" aria-pressed={turned} aria-label={`${turned?thought.back:thought.front} ${turned?'Show the first reading':'Turn the thought over to reveal another reading'}`} onClick={()=>setTurned(value=>!value)}>
  <span className="thought-turn-scene" data-turned={turned}>
   <span className="thought-turn-face" aria-hidden={turned}><span className="thought-turn-label">A first reading</span><strong>{thought.front}</strong></span>
   <span className="thought-turn-face thought-turn-back" aria-hidden={!turned}><span className="thought-turn-label">Another way to see it</span><strong>{thought.back}</strong></span>
  </span>
  <span className="thought-turn-action">{turned?'Back to the first reading':'Turn the thought over'}<RotateCw size={17} aria-hidden="true"/></span>
  <span className="sr-only" aria-live="polite">{turned?thought.back:thought.front}</span>
 </button>;
}
