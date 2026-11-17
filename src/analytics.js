// All records below are fictional, generated locally, and do not describe a real player.
export const maps = ['Clubhouse', 'Oregon', 'Border', 'Chalet', 'Kafe Dostoyevsky'];
export const operators = ['Ace', 'Smoke', 'Buck', 'Valkyrie', 'Nomad'];
export const matches = Array.from({length: 30}, (_, i) => {
  const map = maps[i % 5];
  const won = map === 'Border' ? i % 3 === 0 : i % 4 !== 0;
  return {id:`DEMO-${1000+i}`,date:new Date(Date.UTC(2026,10,16-Math.floor(i/3))).toISOString().slice(0,10),map,operator:operators[(i*3)%5],won,kills:4+(i*7)%9,deaths:3+(i*3)%6,assists:(i*2)%5,score:won?'4 : 2':'2 : 4',mode:i%6===0?'Standard':'Ranked'};
});
export function summarize(rows) {
 const wins=rows.filter(r=>r.won).length, kills=rows.reduce((s,r)=>s+r.kills,0), deaths=rows.reduce((s,r)=>s+r.deaths,0);
 return {count:rows.length,wins,winRate:rows.length?Math.round(wins/rows.length*100):0,kills,deaths,kd:deaths?(kills/deaths).toFixed(2):'—'};
}
export function groupMaps(rows) {return maps.map(map=>({map,...summarize(rows.filter(r=>r.map===map))})).filter(r=>r.count);}
export function coachReport(rows, role='Flex', minutes=20) {
 const s=summarize(rows), groups=groupMaps(rows).sort((a,b)=>a.winRate-b.winRate), weak=groups[0];
 if(!s.count) return {headline:'No matches in this selection',body:'Change your filters to generate an evidence-based report.',focus:[],confidence:'No evidence'};
 return {headline:weak?`Make ${weak.map} your next review focus`:'Start with a match review',body:`Your selected ${s.count} demo matches have a ${s.winRate}% win rate and ${s.kd} K/D. ${weak.map} has ${weak.wins} wins from ${weak.count} matches (${weak.winRate}%). This is a descriptive pattern, not proof of a positioning, aim, or communication problem.`,confidence:weak.count<10?'Limited sample':'Descriptive evidence',focus:[{title:`Review one ${weak.map} match`,detail:`Spend ${Math.max(5,Math.floor(minutes/2))} minutes noting one decision you would change. Use your own replay; statistics alone cannot locate the mistake.`},{title:`Practice your ${role.toLowerCase()} routine`,detail:`Use the remaining ${minutes-Math.max(5,Math.floor(minutes/2))} minutes to rehearse one self-selected skill in a practice mode. Record what you actually practiced.`},{title:'Check the next 10 matches',detail:'Compare the same map and mode after another 10 matches. Do not treat a short winning streak as evidence that the plan caused improvement.'}]};
}
