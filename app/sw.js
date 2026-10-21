const SHELL='twf-shell-v1.8.3-202610151220-fid1-logo4-revert1',DATA='twf-data';
const FILES=['./','index.html','manifest.json','apple-touch-icon.png','icon-192.png','icon-512.png','icon-maskable-512.png','favicon.ico'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(SHELL).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==SHELL&&k!==DATA).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;
 if(u.pathname.endsWith('.enc.json')){const key=u.origin+u.pathname;
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{if(r.ok){const c=r.clone();caches.open(DATA).then(x=>x.put(key,c))}return r}).catch(()=>caches.open(DATA).then(x=>x.match(key)).then(r=>r||Response.error())));return}
 if(u.origin!==location.origin)return;
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(SHELL).then(x=>x.put('index.html',c));return r}).catch(()=>caches.match('index.html')));return}
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
