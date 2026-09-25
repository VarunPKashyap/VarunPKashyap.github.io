import {readFileSync,existsSync,statSync,readdirSync} from 'node:fs';
import {resolve,join,extname} from 'node:path';
import assert from 'node:assert/strict';
const root=resolve('out');
const html=readFileSync(join(root,'index.html'),'utf8');
for(const text of ['Find the thought','Root decisions in cultural context.','Thinking, out','Touching Grass','Consumed','Working together','Articulation is','Tab bankruptcy.'])assert.ok(html.includes(text),`Missing page content: ${text}`);
assert.ok(html.includes('https://varunpkashyap.github.io'), 'Expected canonical domain');
assert.ok(existsSync(join(root,'.nojekyll')), 'Missing .nojekyll');
const local=new Set([...html.matchAll(/(?:src|href)="(\/[^"?#]*)/g)].map(match=>match[1]));
function walk(folder){return readdirSync(folder,{withFileTypes:true}).flatMap(item=>item.isDirectory()?walk(join(folder,item.name)):[join(folder,item.name)])}
for(const file of walk(root).filter(file=>extname(file)==='.css')){
 for(const match of readFileSync(file,'utf8').matchAll(/url\(["']?(\/[^)"'?#]+)/g))local.add(match[1]);
}
for(const url of local){const path=join(root,decodeURIComponent(url));assert.ok(existsSync(path),`Missing local resource: ${url}`);if(statSync(path).isDirectory())assert.ok(existsSync(join(path,'index.html')),`Missing index: ${url}`)}
for(const file of ['digest.json','digest-archive.json','digest-images.json'])assert.equal(readFileSync(join(root,file),'utf8'),readFileSync(join('public',file),'utf8'),`Changed digest file: ${file}`);
console.log(`Static export verified: core content, ${local.size} linked resources, fonts, canonical URL and all digest data.`);
