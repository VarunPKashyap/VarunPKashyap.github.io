import fs from 'node:fs';
import assert from 'node:assert/strict';
import {execFileSync,spawnSync} from 'node:child_process';
const d=JSON.parse(fs.readFileSync(new URL('../public/digest.json',import.meta.url),'utf8'));
assert.match(d.updatedAt,/^\d{4}-\d{2}-\d{2}$/);assert.ok(!Number.isNaN(Date.parse(d.updatedAt)));
assert.match(d.edition,/^\d+$/);assert.ok(d.headline.length>10&&d.headline.length<180);
assert.ok(d.items.length>=3&&d.items.length<=5);
const urls=new Set(),ids=new Set();
for(const item of d.items){for(const key of ['id','category','title','source','dateLabel','url','summary','angle'])assert.ok(typeof item[key]==='string'&&item[key].trim(),`Missing ${key}`);assert.ok(item.title.length<140);assert.ok(item.summary.length<500&&item.angle.length<500);assert.equal(new URL(item.url).protocol,'https:');assert.ok(!urls.has(item.url)&&!ids.has(item.id),'Duplicate article');urls.add(item.url);ids.add(item.id)}
assert.ok(Array.isArray(d.sources)&&d.sources.length>0);for(const s of d.sources)assert.equal(new URL(s.url).protocol,'https:');
console.log(`Digest ${d.edition}: ${d.items.length} valid entries, dated ${d.updatedAt}`);
const archive=JSON.parse(fs.readFileSync(new URL('../public/digest-archive.json',import.meta.url),'utf8'));
assert.ok(Array.isArray(archive.editions)&&archive.editions.length>0,'Archive must contain editions');
const editionIds=new Set();let previousNumber=Infinity,previousDate='9999-12-31';
for(const edition of archive.editions){
 assert.match(edition.edition,/^\d{3,}$/);assert.ok(!editionIds.has(Number(edition.edition)),'Duplicate archive edition');editionIds.add(Number(edition.edition));
 assert.ok(Number(edition.edition)<previousNumber,'Archive must be newest first');previousNumber=Number(edition.edition);
 assert.match(edition.updatedAt,/^\d{4}-\d{2}-\d{2}$/);assert.equal(new Date(edition.updatedAt).toISOString().slice(0,10),edition.updatedAt);assert.ok(edition.updatedAt<=previousDate,'Publication dates must be chronological');previousDate=edition.updatedAt;
 assert.ok(['daily','weekly'].includes(edition.cadence));assert.ok(edition.headline.length>10&&edition.headline.length<180);
 assert.ok(edition.items.length>=3&&edition.items.length<=5);const seenIds=new Set(),seenUrls=new Set();
 for(const item of edition.items){
  for(const key of ['id','category','title','source','dateLabel','url','summary','angle'])assert.ok(typeof item[key]==='string'&&item[key].trim(),`Edition ${edition.edition}: missing ${key}`);
  assert.ok(item.title.length<140&&item.summary.length<500&&item.angle.length<500);assert.equal(new URL(item.url).protocol,'https:');
  assert.ok(!seenIds.has(item.id)&&!seenUrls.has(item.url),'Duplicate article in archive edition');seenIds.add(item.id);seenUrls.add(item.url);
 }
 assert.ok(Array.isArray(edition.sources)&&edition.sources.length>0);
 for(const source of edition.sources){assert.ok(typeof source.name==='string'&&source.name.trim());assert.equal(new URL(source.url).protocol,'https:');}
}
const {cadence,...latest}=archive.editions[0];
assert.deepEqual(latest,d,'Latest digest must exactly match the newest archive edition');
const root=new URL('..',import.meta.url);
if(spawnSync('git',['cat-file','-e','HEAD:public/digest-archive.json'],{cwd:root,stdio:'ignore'}).status===0){
 const committed=JSON.parse(execFileSync('git',['show','HEAD:public/digest-archive.json'],{cwd:root,encoding:'utf8'}));
 for(const prior of committed.editions)assert.deepEqual(archive.editions.find(e=>e.edition===prior.edition),prior,`Published edition ${prior.edition} must be preserved unchanged`);
}
console.log(`Archive: ${archive.editions.length} complete editions; latest and historical preservation verified`);
