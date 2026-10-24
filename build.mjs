import fs from 'node:fs';
fs.mkdirSync('dist',{recursive:true});fs.copyFileSync('index.html','dist/index.html');fs.cpSync('src','dist/src',{recursive:true});fs.cpSync('public/assets','dist/assets',{recursive:true});console.log('Static production build complete: dist/');
