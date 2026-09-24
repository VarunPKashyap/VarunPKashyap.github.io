"use client";
import { useEffect,useState } from 'react';
export function BangaloreClock(){const [time,setTime]=useState('');useEffect(()=>{const update=()=>setTime(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date()));update();const timer=setInterval(update,30000);return()=>clearInterval(timer)},[]);return <a className="bangalore-clock" href="#bangalore"><span>From Bangalore</span><span>{time?`${time} IST`:'India / IST'}</span></a>}
