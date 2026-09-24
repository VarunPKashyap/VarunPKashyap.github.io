import {cpSync,existsSync,readdirSync,rmSync,readFileSync,writeFileSync} from 'node:fs';
import {resolve,join,relative,sep} from 'node:path';
import './verify-export.mjs';
const root=resolve('.');
const output=resolve('out');
const manifest=join(root,'.pages-export.json');
const walk=folder=>readdirSync(folder,{withFileTypes:true}).flatMap(item=>item.isDirectory()?walk(join(folder,item.name)):[relative(output,join(folder,item.name)).split(sep).join('/')]);
const files=walk(output).sort();
const previous=existsSync(manifest)?JSON.parse(readFileSync(manifest,'utf8')):[];
for(const file of previous){
 const target=resolve(root,file);
 if(!target.startsWith(root+sep)||(file.startsWith('.')&&file!=='.nojekyll')) throw new Error('Unsafe export path: '+file);
 if(!files.includes(file)) rmSync(target,{force:true});
}
cpSync(output,root,{recursive:true});
writeFileSync(manifest,JSON.stringify(files,null,2)+'\n');
console.log('GitHub Pages files prepared at the repository root.');
