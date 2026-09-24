export type GamePhase = 'ready' | 'armed' | 'running' | 'paused' | 'finished';
export type PauseReason = 'manual' | 'hidden' | 'away';
export type TabRound = { total:number; phase:GamePhase; closed:number[]; elapsed:number; started:number; practice:boolean; pauseReason:PauseReason };
export function createRound(total=12, phase:'ready'|'armed'='ready'):TabRound {
  return {total,phase,closed:[],elapsed:0,started:0,practice:false,pauseReason:'manual'};
}
export function closeGameTab(round:TabRound,id:number,now:number):TabRound {
  if(!['armed','running'].includes(round.phase)||!Number.isInteger(id)||id<0||id>=round.total||round.closed.includes(id))return round;
  const started=round.phase==='armed'?now:round.started;
  const closed=[...round.closed,id],finished=closed.length===round.total;
  return {...round,started,closed,phase:finished?'finished':'running',elapsed:finished?Math.max(10,round.elapsed+now-started):round.elapsed};
}
export function pauseRound(round:TabRound,now:number,reason:PauseReason):TabRound {
  return round.phase==='running'?{...round,phase:'paused',elapsed:round.elapsed+now-round.started,practice:true,pauseReason:reason}:round;
}
export function resumeRound(round:TabRound,now:number):TabRound {
  return round.phase==='paused'?{...round,phase:'running',started:now}:round;
}
export function nextOpenTab(round:TabRound,after=-1):number|undefined {
  for(let step=1;step<=round.total;step++){const id=(after+step+round.total)%round.total;if(!round.closed.includes(id))return id;}
}
