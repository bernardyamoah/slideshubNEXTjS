if(!self.define){let e,a={};const s=(s,c)=>(s=new URL(s+".js",c).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(c,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(a[t])return;let i={};const r=e=>s(e,t),b={module:{uri:t},exports:i,require:r};a[t]=Promise.all(c.map((e=>b[e]||r(e)))).then((e=>(n(...e),i)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/ceealDZcNSqKbaLUbeDyD/_buildManifest.js",revision:"7ad55293b7c6c7543c88ec23cfa3b392"},{url:"/_next/static/ceealDZcNSqKbaLUbeDyD/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0e5ce63c-d9bc7ad4d8bcad33.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/1214-191ec9cd7dfbd9fe.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/1424-65c3d7d58d49e8d2.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/1598-9638b6412620ecbb.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/2284-9ec35d784a86f936.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/2528-c3d4950d81105f8d.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/2967-f3fbdc305822d4e5.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/3291-6ae225baa9cdeadf.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/413-9b7472d79593e9fc.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/4348-a9b22a9ecaa50a17.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/4724-e5d7deb6d61f6c02.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/5582-267f5a0d718a8bec.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/5628-59eeb62a8665d3ee.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/6124-bf186c3668d0acbc.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/6964-b3c500f01ca0d4ef.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/728-1eeb3b2b8fd12555.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/7417-6a4024cf05f2f0d3.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/7465-a92e639322e12fb7.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/7601-eca9a2278fdcfb45.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/8637-76c1294292c507d3.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/8973-d38d205b286492d1.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/9233-9fe237dad4617a3f.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/9797-38c46a659f40ce04.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/(clients)/(auth)/login/page-75dfa95ffc4d3305.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/(clients)/(auth)/register/page-2b4afde01a5317c6.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/(clients)/books/page-24048369e912f9c1.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/(clients)/campus/%5BcampusId%5D/%5BprogramId%5D/%5B...courseId%5D/loading-c39ab2055b8774c5.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/(clients)/campus/%5BcampusId%5D/%5BprogramId%5D/%5B...courseId%5D/page-219ff453945ad279.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/(clients)/campus/%5BcampusId%5D/%5BprogramId%5D/loading-4ee320439512d424.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/(clients)/campus/%5BcampusId%5D/%5BprogramId%5D/page-3f740a5fd6764810.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/(clients)/campus/%5BcampusId%5D/loading-fb9ced7b0aadf948.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/(clients)/campus/%5BcampusId%5D/page-58355c58c374c2c8.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/(clients)/campus/loading-dd808d989652e0d7.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/(clients)/campus/page-3462d1f8773f83fe.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/(clients)/layout-098d627e5d1ba713.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/(clients)/page-5762a9f46adacd3a.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/dashboard/(create)/add-book/page-131c171c324f27b8.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/dashboard/(create)/add-campus/page-d9017fca4c056580.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/dashboard/(create)/add-course/page-05236c02ec86050d.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/dashboard/(create)/add-program/page-60a6ad10860785ff.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/dashboard/(create)/add-slide/page-76fa4765c7515a16.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/dashboard/(create)/loading-a2b280135112a2dd.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/dashboard/layout-56ba42f997b019b8.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/dashboard/loading-55b117f3571f0418.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/dashboard/page-9c2f805a749790e3.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/dashboard/profile/%5Bid%5D/page-c8acf09c5618624b.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/layout-a08eb3568b6e36e9.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/app/not-found-2809f90edb9ec919.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/bf6a786c-58f7b6d6afbe24d0.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/framework-964c2d6016b0d731.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/main-7b53e7186663d55e.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/main-app-a03e1aeffbfe1767.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/pages/_app-16303979919e0d21.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/pages/_error-538b044d4acf5f05.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-4e8b545c328c3168.js",revision:"ceealDZcNSqKbaLUbeDyD"},{url:"/_next/static/css/841ffab3ca31fc82.css",revision:"841ffab3ca31fc82"},{url:"/_next/static/media/cover_not_found.9941d857.jpg",revision:"9c4bbb21ac32475a2f3d8c55d2b7337d"},{url:"/_next/static/media/error.6b357b00.svg",revision:"6339371b586c96ecde93a0ffd3d9e5f9"},{url:"/_next/static/media/logo-icon-dark.1b006538.png",revision:"354040a301d09bf71cc9f1c5575083ce"},{url:"/_next/static/media/logo-icon-light.19767af0.png",revision:"908f57d295b6098229e9f9c7e82a6621"},{url:"/swe-worker-4da67dda9bc18c53.js",revision:"5a47d90db13bb1309b25bdf7b363570e"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:a}})=>!(!e||a.startsWith("/api/auth/callback")||!a.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:s})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&s&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:s})=>"1"===e.headers.get("RSC")&&s&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:a})=>a&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));