import fs from 'node:fs';
fs.mkdirSync('dist',{recursive:true});fs.copyFileSync('index.html','dist/index.html');fs.cpSync('src','dist/src',{recursive:true});fs.cpSync('public/assets','dist/assets',{recursive:true});
// Fail deployment if a local page or dynamic-content asset is missing.
const output=fs.readFileSync('dist/index.html','utf8')+fs.readFileSync('dist/src/content-config.json','utf8');
const paths=new Set([...output.matchAll(/\/(?:src|assets)\/[^"'\s,<>]+/g)].map(match=>match[0].split(/[?#]/)[0]));
for(const asset of paths){if(!fs.existsSync('dist'+asset))throw new Error(`Missing production asset: ${asset}`)}
console.log(`Static production build complete: dist/ (${paths.size} local asset references verified)`);
