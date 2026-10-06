import {readFileSync,existsSync,statSync,readdirSync} from 'node:fs';
import {resolve,join,extname} from 'node:path';
import assert from 'node:assert/strict';
const root=resolve('out');
const html=readFileSync(join(root,'index.html'),'utf8');
for(const text of ['Varun fights content pollution','Fighting','Touching Grass','Consumed','The words','part','of the work.','Tab bankruptcy.','Tell me what you’re working on.'])assert.ok(html.includes(text),`Missing page content: ${text}`);
assert.ok(!html.includes('A familiar brief'), 'Removed articulation exercise must not return');
assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, 'One primary page heading');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
assert.equal(new Set(ids).size,ids.length,'Duplicate HTML IDs');
for(const match of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(match[1]),`Broken in-page link: ${match[1]}`);
for(const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g))assert.ok(/rel="[^"]*noopener/.test(match[0]),'External link missing safe opener policy');
assert.ok(html.includes('https://varunpkashyap.github.io'), 'Expected canonical domain');
assert.ok(existsSync(join(root,'.nojekyll')), 'Missing .nojekyll');
const local=new Set([...html.matchAll(/(?:src|href)="(\/[^"?#]*)/g)].map(match=>match[1]));
function walk(folder){return readdirSync(folder,{withFileTypes:true}).flatMap(item=>item.isDirectory()?walk(join(folder,item.name)):[join(folder,item.name)])}
for(const file of walk(root).filter(file=>extname(file)==='.css')){
 for(const match of readFileSync(file,'utf8').matchAll(/url\(["']?(\/[^)"'?#]+)/g))local.add(match[1]);
}
for(const url of local){const path=join(root,decodeURIComponent(url));assert.ok(existsSync(path),`Missing local resource: ${url}`);if(statSync(path).isDirectory())assert.ok(existsSync(join(path,'index.html')),`Missing index: ${url}`)}
for(const file of ['digest.json','digest-archive.json','digest-images.json'])assert.equal(readFileSync(join(root,file),'utf8'),readFileSync(join('public',file),'utf8'),`Changed digest file: ${file}`);
const images=JSON.parse(readFileSync(join(root,'digest-images.json'),'utf8'));
for(const [id,image] of Object.entries(images))assert.ok(existsSync(join(root,image.src)),`Missing archived thumbnail: ${id}`);
const editions=JSON.parse(readFileSync(join(root,'digest-archive.json'),'utf8')).editions;
for(const edition of editions)assert.ok(ids.includes(`digest-edition-${edition.edition}`),`Missing shareable edition anchor: ${edition.edition}`);
console.log(`Static export verified: core content, ${local.size} linked resources, fonts, canonical URL and all digest data.`);
