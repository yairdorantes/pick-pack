if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let u={};const c=e=>i(e,a),l={module:{uri:a},exports:u,require:c};s[a]=Promise.all(n.map((e=>l[e]||c(e)))).then((e=>(r(...e),u)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/AdminContainer-D-ArdFsm.js",revision:null},{url:"assets/AuthRoutes-BVuEL4TC.js",revision:null},{url:"assets/Construction-B8LaMPOF.js",revision:null},{url:"assets/ContainerEnd-1aHGo3iO.js",revision:null},{url:"assets/ContainerManifest-CDUiWE6f.js",revision:null},{url:"assets/ContainerP-BnEJ5OEb.js",revision:null},{url:"assets/ContainerPacking-CyfSetpO.js",revision:null},{url:"assets/Context-DjW2-7Ea.js",revision:null},{url:"assets/estafeta-BOwmPyjs.webp",revision:null},{url:"assets/fedex2-Kviml25v.png",revision:null},{url:"assets/getProducts-DsUbh5Kf.js",revision:null},{url:"assets/HomeContainer-L9Ztj9QA.js",revision:null},{url:"assets/index-BcUVWVFg.css",revision:null},{url:"assets/index-D-HTp3VL.js",revision:null},{url:"assets/index-ESkqNhxh.js",revision:null},{url:"assets/LoginForm-DSXNkqPJ.js",revision:null},{url:"assets/NavBar-DWbUtt4d.js",revision:null},{url:"assets/oms-CeYLBKdp.png",revision:null},{url:"assets/Page404-DfoBLu4I.js",revision:null},{url:"assets/PDFManifest-Dl9cJxbH.js",revision:null},{url:"assets/pe-D7K_oPFS.jpg",revision:null},{url:"assets/Picking-DbwwPRa6.css",revision:null},{url:"assets/Picking-m-w0EJMO.js",revision:null},{url:"assets/QrScan-D6Xdsquo.js",revision:null},{url:"assets/ReturnSheet-BUN8zmZ_.js",revision:null},{url:"assets/Stepper-DPc5Rv1h.js",revision:null},{url:"assets/Test-DF9odDYI.js",revision:null},{url:"index.html",revision:"d21ceb5b2853ec27b62aa78313cc879c"},{url:"manifest.webmanifest",revision:"2dc8a0fee1bb50cf2a8c0a07973ace70"},{url:"oms.png",revision:"af6a9bc9ca9244ec835ff55387066a90"},{url:"oms.tif",revision:"8afac1a19f8b3f6cab9912d82ae50cc5"},{url:"oms2.png",revision:"f7cc5428ab832cf659cbc38af11ef42a"},{url:"oms3.png",revision:"4f81dc18fc056be7df372d154617e89a"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"skus/TCOMADC.png",revision:"cde6d7d1aef35085f91dbc98a1e46201"},{url:"skus/TCOMAPR.png",revision:"936c9861ae37331bfdf4a51774c08e0c"},{url:"skus/TCOMPRR.png",revision:"ea93eb5aac65c7e565efe7d8774a2ef6"},{url:"skus/TDAMAPR.png",revision:"1b7b389141e0f1775d5f20f04d89a40f"},{url:"skus/TDMACVT.png",revision:"fe1f23b59a9160d1365416780ee00b18"},{url:"skus/TDRYCAB.png",revision:"c5594713240256408dc0a08b66057818"},{url:"skus/THEACAM.png",revision:"cd8992e857609f2e329aa3609accface"},{url:"skus/THEACVA.png",revision:"845506629302a50c1de6a37b2da8e9c3"},{url:"skus/THEADAM.png",revision:"e5dde80b59aae56ee4eead4ff8ab658c"},{url:"skus/THEAMLA.png",revision:"ae2f694c2374d22f18f981ab3fc616c7"},{url:"skus/TKIDCHC.png",revision:"f36bfab47af4881d76c717d0ab424f3a"},{url:"skus/TMUSC01.png",revision:"9783bda7d16285e141d4570345af24de"},{url:"skus/TPOLPLC.png",revision:"4ed119e0d3ec4a197d965944a9941b3a"},{url:"skus/TPOLPLD.png",revision:"ce081c94754b90d9b8469d3dc214c917"},{url:"skus/TPOLPRC.png",revision:"f8ff7963765473926481ba901ea66e5c"},{url:"skus/TPOLPRD.png",revision:"560ffe727c4f7069f78465d3911cbf6f"},{url:"skus/TSUBCCR.png",revision:"4084480372e78b67147e1b2aea3e789c"},{url:"skus/TSUBDCR.png",revision:"1451a1678b4db4dc7013c4fc5938ed95"},{url:"skus/TSUDCAP.png",revision:"1cb4082618eb394bd611ace955af15df"},{url:"skus/TSUDCIE.png",revision:"d9655befd34be72edd04585a55015bc0"},{url:"skus/TSUDCPP.png",revision:"c960ec5c34e995430b9e9de795b37fbf"},{url:"skus/TSUDRED.png",revision:"8014ad76316ae6d40b203988165a6558"},{url:"skus/UCDYL01.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL02.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL03.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL04.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL05.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL06.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL07.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL08.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL09.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL10.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL11.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL12.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL13.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL14.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL15.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL16.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL17.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL18.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL19.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL20.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"vite.svg",revision:"89892a4cf14ac6d9c8e5ba81cc87d4e1"},{url:"vite2.svg",revision:"772fe15dca89961c7a1ae0c5ffc26312"},{url:"oms3.png",revision:"4f81dc18fc056be7df372d154617e89a"},{url:"oms.png",revision:"af6a9bc9ca9244ec835ff55387066a90"},{url:"oms.tif",revision:"8afac1a19f8b3f6cab9912d82ae50cc5"},{url:"oms2.png",revision:"f7cc5428ab832cf659cbc38af11ef42a"},{url:"vite.svg",revision:"89892a4cf14ac6d9c8e5ba81cc87d4e1"},{url:"vite2.svg",revision:"772fe15dca89961c7a1ae0c5ffc26312"},{url:"skus/TCOMADC.png",revision:"cde6d7d1aef35085f91dbc98a1e46201"},{url:"skus/TCOMAPR.png",revision:"936c9861ae37331bfdf4a51774c08e0c"},{url:"skus/TCOMPRR.png",revision:"ea93eb5aac65c7e565efe7d8774a2ef6"},{url:"skus/TDAMAPR.png",revision:"1b7b389141e0f1775d5f20f04d89a40f"},{url:"skus/TDMACVT.png",revision:"fe1f23b59a9160d1365416780ee00b18"},{url:"skus/TDRYCAB.png",revision:"c5594713240256408dc0a08b66057818"},{url:"skus/THEACAM.png",revision:"cd8992e857609f2e329aa3609accface"},{url:"skus/THEACVA.png",revision:"845506629302a50c1de6a37b2da8e9c3"},{url:"skus/THEADAM.png",revision:"e5dde80b59aae56ee4eead4ff8ab658c"},{url:"skus/THEAMLA.png",revision:"ae2f694c2374d22f18f981ab3fc616c7"},{url:"skus/TKIDCHC.png",revision:"f36bfab47af4881d76c717d0ab424f3a"},{url:"skus/TMUSC01.png",revision:"9783bda7d16285e141d4570345af24de"},{url:"skus/TPOLPLC.png",revision:"4ed119e0d3ec4a197d965944a9941b3a"},{url:"skus/TPOLPLD.png",revision:"ce081c94754b90d9b8469d3dc214c917"},{url:"skus/TPOLPRC.png",revision:"f8ff7963765473926481ba901ea66e5c"},{url:"skus/TPOLPRD.png",revision:"560ffe727c4f7069f78465d3911cbf6f"},{url:"skus/TSUBCCR.png",revision:"4084480372e78b67147e1b2aea3e789c"},{url:"skus/TSUBDCR.png",revision:"1451a1678b4db4dc7013c4fc5938ed95"},{url:"skus/TSUDCAP.png",revision:"1cb4082618eb394bd611ace955af15df"},{url:"skus/TSUDCIE.png",revision:"d9655befd34be72edd04585a55015bc0"},{url:"skus/TSUDCPP.png",revision:"c960ec5c34e995430b9e9de795b37fbf"},{url:"skus/TSUDRED.png",revision:"8014ad76316ae6d40b203988165a6558"},{url:"skus/UCDYL01.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL02.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL03.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL04.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL05.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL06.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL07.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL08.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL09.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL10.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL11.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL12.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL13.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL14.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL15.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL16.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL17.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL18.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL19.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"skus/UCDYL20.png",revision:"307388733e85c374f099a829e0a066ec"},{url:"manifest.webmanifest",revision:"2dc8a0fee1bb50cf2a8c0a07973ace70"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
