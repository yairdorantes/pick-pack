import{r as h,j as s,_ as he,u as Ce}from"./index-D0ehxFdI.js";import{a as fe,b as ve}from"./Context-BRy6e3VM.js";import{N as Ee,M as je}from"./NavBar-D-Wvonyz.js";import{C as Ne,b as $e}from"./index-D077qZ4F.js";function ge(i,c,o,d,l,f,y){try{var x=i[f](y),u=x.value}catch(S){o(S);return}x.done?c(u):Promise.resolve(u).then(d,l)}function Ie(i){return function(){var c=this,o=arguments;return new Promise(function(d,l){var f=i.apply(c,o);function y(u){ge(f,d,l,y,x,"next",u)}function x(u){ge(f,d,l,y,x,"throw",u)}y(void 0)})}}function ae(){return ae=Object.assign||function(i){for(var c=1;c<arguments.length;c++){var o=arguments[c];for(var d in o)Object.prototype.hasOwnProperty.call(o,d)&&(i[d]=o[d])}return i},ae.apply(this,arguments)}var xe={exports:{}};(function(i){var c=function(o){var d=Object.prototype,l=d.hasOwnProperty,f,y=typeof Symbol=="function"?Symbol:{},x=y.iterator||"@@iterator",u=y.asyncIterator||"@@asyncIterator",S=y.toStringTag||"@@toStringTag";function m(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{m({},"")}catch{m=function(e,n,a){return e[n]=a}}function E(t,e,n,a){var r=e&&e.prototype instanceof G?e:G,v=Object.create(r.prototype),k=new re(a||[]);return v._invoke=oe(t,n,k),v}o.wrap=E;function j(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(a){return{type:"throw",arg:a}}}var D="suspendedStart",A="suspendedYield",p="executing",O="completed",I={};function G(){}function z(){}function W(){}var q={};m(q,x,function(){return this});var J=Object.getPrototypeOf,F=J&&J(J(Q([])));F&&F!==d&&l.call(F,x)&&(q=F);var M=W.prototype=G.prototype=Object.create(q);z.prototype=W,m(M,"constructor",W),m(W,"constructor",z),z.displayName=m(W,S,"GeneratorFunction");function ee(t){["next","throw","return"].forEach(function(e){m(t,e,function(n){return this._invoke(e,n)})})}o.isGeneratorFunction=function(t){var e=typeof t=="function"&&t.constructor;return e?e===z||(e.displayName||e.name)==="GeneratorFunction":!1},o.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,W):(t.__proto__=W,m(t,S,"GeneratorFunction")),t.prototype=Object.create(M),t},o.awrap=function(t){return{__await:t}};function V(t,e){function n(v,k,w,P){var b=j(t[v],t,k);if(b.type==="throw")P(b.arg);else{var T=b.arg,N=T.value;return N&&typeof N=="object"&&l.call(N,"__await")?e.resolve(N.__await).then(function(R){n("next",R,w,P)},function(R){n("throw",R,w,P)}):e.resolve(N).then(function(R){T.value=R,w(T)},function(R){return n("throw",R,w,P)})}}var a;function r(v,k){function w(){return new e(function(P,b){n(v,k,P,b)})}return a=a?a.then(w,w):w()}this._invoke=r}ee(V.prototype),m(V.prototype,u,function(){return this}),o.AsyncIterator=V,o.async=function(t,e,n,a,r){r===void 0&&(r=Promise);var v=new V(E(t,e,n,a),r);return o.isGeneratorFunction(e)?v:v.next().then(function(k){return k.done?k.value:v.next()})};function oe(t,e,n){var a=D;return function(v,k){if(a===p)throw new Error("Generator is already running");if(a===O){if(v==="throw")throw k;return X()}for(n.method=v,n.arg=k;;){var w=n.delegate;if(w){var P=te(w,n);if(P){if(P===I)continue;return P}}if(n.method==="next")n.sent=n._sent=n.arg;else if(n.method==="throw"){if(a===D)throw a=O,n.arg;n.dispatchException(n.arg)}else n.method==="return"&&n.abrupt("return",n.arg);a=p;var b=j(t,e,n);if(b.type==="normal"){if(a=n.done?O:A,b.arg===I)continue;return{value:b.arg,done:n.done}}else b.type==="throw"&&(a=O,n.method="throw",n.arg=b.arg)}}}function te(t,e){var n=t.iterator[e.method];if(n===f){if(e.delegate=null,e.method==="throw"){if(t.iterator.return&&(e.method="return",e.arg=f,te(t,e),e.method==="throw"))return I;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return I}var a=j(n,t.iterator,e.arg);if(a.type==="throw")return e.method="throw",e.arg=a.arg,e.delegate=null,I;var r=a.arg;if(!r)return e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,I;if(r.done)e[t.resultName]=r.value,e.next=t.nextLoc,e.method!=="return"&&(e.method="next",e.arg=f);else return r;return e.delegate=null,I}ee(M),m(M,S,"Generator"),m(M,x,function(){return this}),m(M,"toString",function(){return"[object Generator]"});function K(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function Y(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function re(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(K,this),this.reset(!0)}o.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function a(){for(;e.length;){var r=e.pop();if(r in t)return a.value=r,a.done=!1,a}return a.done=!0,a}};function Q(t){if(t){var e=t[x];if(e)return e.call(t);if(typeof t.next=="function")return t;if(!isNaN(t.length)){var n=-1,a=function r(){for(;++n<t.length;)if(l.call(t,n))return r.value=t[n],r.done=!1,r;return r.value=f,r.done=!0,r};return a.next=a}}return{next:X}}o.values=Q;function X(){return{value:f,done:!0}}return re.prototype={constructor:re,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=f,this.done=!1,this.delegate=null,this.method="next",this.arg=f,this.tryEntries.forEach(Y),!t)for(var e in this)e.charAt(0)==="t"&&l.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=f)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if(e.type==="throw")throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(P,b){return v.type="throw",v.arg=t,e.next=P,b&&(e.method="next",e.arg=f),!!b}for(var a=this.tryEntries.length-1;a>=0;--a){var r=this.tryEntries[a],v=r.completion;if(r.tryLoc==="root")return n("end");if(r.tryLoc<=this.prev){var k=l.call(r,"catchLoc"),w=l.call(r,"finallyLoc");if(k&&w){if(this.prev<r.catchLoc)return n(r.catchLoc,!0);if(this.prev<r.finallyLoc)return n(r.finallyLoc)}else if(k){if(this.prev<r.catchLoc)return n(r.catchLoc,!0)}else if(w){if(this.prev<r.finallyLoc)return n(r.finallyLoc)}else throw new Error("try statement without catch or finally")}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&l.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var r=a;break}}r&&(t==="break"||t==="continue")&&r.tryLoc<=e&&e<=r.finallyLoc&&(r=null);var v=r?r.completion:{};return v.type=t,v.arg=e,r?(this.method="next",this.next=r.finallyLoc,I):this.complete(v)},complete:function(t,e){if(t.type==="throw")throw t.arg;return t.type==="break"||t.type==="continue"?this.next=t.arg:t.type==="return"?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):t.type==="normal"&&e&&(this.next=e),I},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),Y(n),I}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var a=n.completion;if(a.type==="throw"){var r=a.arg;Y(n)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:Q(t),resultName:e,nextLoc:n},this.method==="next"&&(this.arg=f),I}},o}(i.exports);try{regeneratorRuntime=c}catch{typeof globalThis=="object"?globalThis.regeneratorRuntime=c:Function("r","regeneratorRuntime = r")(c)}})(xe);var we=xe.exports,be=function(c){var o=c.paths,d=c.id,l=c.strokeWidth,f=c.strokeColor,y=c.command,x=y===void 0?_e:y;if(o.length===1){var u=o[0],S=u.x,m=u.y,E=l/2;return h.createElement("circle",{key:d,id:d,cx:S,cy:m,r:E,stroke:f,fill:f})}var j=o.reduce(function(D,A,p,O){return p===0?"M "+A.x+","+A.y:D+" "+x(A,p,O)},"");return h.createElement("path",{key:d,id:d,d:j,fill:"none",strokeLinecap:"round",stroke:f,strokeWidth:l})},Me=function(c,o){var d=o.x-c.x,l=o.y-c.y;return{length:Math.sqrt(Math.pow(d,2)+Math.pow(l,2)),angle:Math.atan2(l,d)}},de=function(c){var o=c.current,d=c.next,l=c.previous,f=c.reverse,y=l||o,x=d||o,u=.2,S=Me(y,x),m=S.angle+(f?Math.PI:0),E=S.length*u,j=o.x+Math.cos(m)*E,D=o.y+Math.sin(m)*E;return[j,D]},_e=function(c,o,d){var l=null,f=null;switch(o){case 0:var y=de({current:c});l=y[0],f=y[1];break;case 1:var x=de({current:d[o-1],next:c});l=x[0],f=x[1];break;default:var u=de({current:d[o-1],previous:d[o-2],next:c});l=u[0],f=u[1];break}var S=de({current:c,previous:d[o-1],next:d[o+1],reverse:!0}),m=S[0],E=S[1];return"C "+l+","+f+" "+m+","+E+" "+c.x+", "+c.y},Le=function(c){var o=c.id,d=c.paths;return h.createElement(h.Fragment,null,d.map(function(l,f){return h.createElement(be,{key:o+"__"+f,paths:l.paths,id:o+"__"+f,strokeWidth:l.strokeWidth,strokeColor:l.strokeColor,command:_e})}))},ye=function(c){return new Promise(function(o,d){var l=new Image;l.addEventListener("load",function(){l.width>0&&o(l),d("Image not found")}),l.addEventListener("error",function(f){return d(f)}),l.src=c,l.setAttribute("crossorigin","anonymous")})};function ke(i){var c,o=(c=i.firstChild)==null?void 0:c.cloneNode(!0),d=i.offsetWidth,l=i.offsetHeight;return o.setAttribute("viewBox","0 0 "+d+" "+l),o.setAttribute("width",d.toString()),o.setAttribute("height",l.toString()),{svgCanvas:o,width:d,height:l}}var Te=h.forwardRef(function(i,c){var o=i.paths,d=i.isDrawing,l=i.onPointerDown,f=i.onPointerMove,y=i.onPointerUp,x=i.id,u=x===void 0?"react-sketch-canvas":x,S=i.width,m=S===void 0?"100%":S,E=i.height,j=E===void 0?"100%":E,D=i.className,A=D===void 0?"react-sketch-canvas":D,p=i.canvasColor,O=p===void 0?"red":p,I=i.backgroundImage,G=I===void 0?"":I,z=i.exportWithBackgroundImage,W=z===void 0?!1:z,q=i.preserveBackgroundImageAspectRatio,J=q===void 0?"none":q,F=i.allowOnlyPointerType,M=F===void 0?"all":F,ee=i.style,V=ee===void 0?{border:"0.0625rem solid #9c9c9c",borderRadius:"0.25rem"}:ee,oe=i.svgStyle,te=oe===void 0?{}:oe,K=h.useRef(null),Y=function(r){var v,k,w,P=(v=K.current)==null?void 0:v.getBoundingClientRect(),b=(k=window.scrollX)!=null?k:0,T=(w=window.scrollY)!=null?w:0;if(!P)return{x:0,y:0};var N={x:r.pageX-P.left-b,y:r.pageY-P.top-T};return N},re=function(r){if(!(M!=="all"&&r.pointerType!==M)&&!(r.pointerType==="mouse"&&r.button!==0)){var v=Y(r);l(v)}},Q=function(r){if(d&&!(M!=="all"&&r.pointerType!==M)){var v=Y(r);f(v)}},X=function(r){r.pointerType==="mouse"&&r.button!==0||M!=="all"&&r.pointerType!==M||y()};h.useImperativeHandle(c,function(){return{exportImage:function(r){return new Promise(function(){var v=Ie(we.mark(function k(w,P){var b,T,N,R,ce,ne,ie,B;return we.wrap(function(C){for(;;)switch(C.prev=C.next){case 0:if(C.prev=0,b=K.current,b){C.next=4;break}throw Error("Canvas not rendered yet");case 4:return T=ke(b),N=T.svgCanvas,R=T.width,ce=T.height,ne="data:image/svg+xml;base64,"+btoa(N.outerHTML),C.next=8,ye(ne);case 8:if(C.t0=C.sent,ie=[C.t0],!W){C.next=21;break}return C.prev=11,C.next=14,ye(G);case 14:B=C.sent,ie.push(B),C.next=21;break;case 18:C.prev=18,C.t1=C.catch(11),console.warn("exportWithBackgroundImage props is set without a valid background image URL. This option is ignored");case 21:Promise.all(ie).then(function(le){var se=document.createElement("canvas");se.setAttribute("width",R.toString()),se.setAttribute("height",ce.toString());var ue=se.getContext("2d");if(!ue)throw Error("Canvas not rendered yet");le.reverse().forEach(function($){ue.drawImage($,0,0)}),w(se.toDataURL("image/"+r))}).catch(function(le){throw le}),C.next=27;break;case 24:C.prev=24,C.t2=C.catch(0),P(C.t2);case 27:case"end":return C.stop()}},k,null,[[0,24],[11,18]])}));return function(k,w){return v.apply(this,arguments)}}())},exportSvg:function(){return new Promise(function(r,v){try{var k,w=(k=K.current)!=null?k:null;if(w!==null){var P,b,T=ke(w),N=T.svgCanvas;if(W){r(N.outerHTML);return}(P=N.querySelector("#"+u+"__background"))==null||P.remove(),(b=N.querySelector("#"+u+"__canvas-background"))==null||b.setAttribute("fill",O),r(N.outerHTML)}v(new Error("Canvas not loaded"))}catch(R){v(R)}})}}}),h.useEffect(function(){return document.addEventListener("pointerup",X),function(){document.removeEventListener("pointerup",X)}},[X]);var t=o.filter(function(a){return!a.drawMode}),e=0,n=o.reduce(function(a,r){return r.drawMode?(a[e]===void 0&&(a[e]=[]),a[e].push(r),a):(e+=1,a)},[[]]);return h.createElement("div",{role:"presentation",ref:K,className:A,style:ae({touchAction:"none",width:m,height:j},V),"touch-action":"none",onPointerDown:re,onPointerMove:Q,onPointerUp:X},h.createElement("svg",{version:"1.1",baseProfile:"full",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",style:ae({width:"100%",height:"100%"},te),id:u},h.createElement("g",{id:u+"__eraser-stroke-group",display:"none"},h.createElement("rect",{id:u+"__mask-background",x:"0",y:"0",width:"100%",height:"100%",fill:"white"}),t.map(function(a,r){return h.createElement(be,{key:u+"__eraser-"+r,id:u+"__eraser-"+r,paths:a.paths,strokeColor:"#000000",strokeWidth:a.strokeWidth})})),h.createElement("defs",null,G&&h.createElement("pattern",{id:u+"__background",x:"0",y:"0",width:"100%",height:"100%",patternUnits:"userSpaceOnUse"},h.createElement("image",{x:"0",y:"0",width:"100%",height:"100%",xlinkHref:G,preserveAspectRatio:J})),t.map(function(a,r){return h.createElement("mask",{id:u+"__eraser-mask-"+r,key:u+"__eraser-mask-"+r,maskUnits:"userSpaceOnUse"},h.createElement("use",{href:"#"+u+"__mask-background"}),Array.from({length:t.length-r},function(v,k){return k+r}).map(function(v){return h.createElement("use",{key:v.toString(),href:"#"+u+"__eraser-"+v.toString()})}))})),h.createElement("g",{id:u+"__canvas-background-group"},h.createElement("rect",{id:u+"__canvas-background",x:"0",y:"0",width:"100%",height:"100%",fill:G?"url(#"+u+"__background)":O})),n.map(function(a,r){return h.createElement("g",{id:u+"__stroke-group-"+r,key:u+"__stroke-group-"+r,mask:"url(#"+u+"__eraser-mask-"+r+")"},h.createElement(Le,{id:u,paths:a}))})))}),Re=h.forwardRef(function(i,c){var o=i.id,d=o===void 0?"react-sketch-canvas":o,l=i.width,f=l===void 0?"100%":l,y=i.height,x=y===void 0?"100%":y,u=i.className,S=u===void 0?"":u,m=i.canvasColor,E=m===void 0?"white":m,j=i.strokeColor,D=j===void 0?"red":j,A=i.backgroundImage,p=A===void 0?"":A,O=i.exportWithBackgroundImage,I=O===void 0?!1:O,G=i.preserveBackgroundImageAspectRatio,z=G===void 0?"none":G,W=i.strokeWidth,q=W===void 0?4:W,J=i.eraserWidth,F=J===void 0?8:J,M=i.allowOnlyPointerType,ee=M===void 0?"all":M,V=i.style,oe=V===void 0?{border:"0.0625rem solid #9c9c9c",borderRadius:"0.25rem"}:V,te=i.svgStyle,K=te===void 0?{}:te,Y=i.onChange,re=Y===void 0?function($){}:Y,Q=i.onStroke,X=Q===void 0?function($,g){}:Q,t=i.withTimestamp,e=t===void 0?!1:t,n=h.createRef(),a=h.useState(!0),r=a[0],v=a[1],k=h.useState(!1),w=k[0],P=k[1],b=h.useState([]),T=b[0],N=b[1],R=h.useState([]),ce=R[0],ne=R[1],ie=h.useState([]),B=ie[0],U=ie[1],C=h.useCallback(function(){var $,g,_=($=(g=B.slice(-1))==null?void 0:g[0])!=null?$:null;if(_===null){console.warn("No stroke found!");return}X(_,!_.drawMode)},[w]);h.useEffect(function(){C()},[w]),h.useEffect(function(){re(B)},[B]),h.useImperativeHandle(c,function(){return{eraseMode:function(g){v(!g)},clearCanvas:function(){N([].concat(B)),U([])},undo:function(){if(T.length!==0){U([].concat(T)),N([]);return}ne(function(g){return[].concat(g,B.slice(-1))}),U(function(g){return g.slice(0,-1)})},redo:function(){ce.length!==0&&(U(function(g){return[].concat(g,ce.slice(-1))}),ne(function(g){return g.slice(0,-1)}))},exportImage:function(g){var _,L=(_=n.current)==null?void 0:_.exportImage;if(L)return L(g);throw Error("Export function called before canvas loaded")},exportSvg:function(){return new Promise(function(g,_){var L,H=(L=n.current)==null?void 0:L.exportSvg;H?H().then(function(Z){g(Z)}).catch(function(Z){_(Z)}):_(Error("Export function called before canvas loaded"))})},exportPaths:function(){return new Promise(function(g,_){try{g(B)}catch(L){_(L)}})},loadPaths:function(g){U(function(_){return[].concat(_,g)})},getSketchingTime:function(){return new Promise(function(g,_){e||_(new Error("Set 'withTimestamp' prop to get sketching time"));try{var L=B.reduce(function(H,Z){var me,pe,Se=(me=Z.startTimestamp)!=null?me:0,Pe=(pe=Z.endTimestamp)!=null?pe:0;return H+(Pe-Se)},0);g(L)}catch(H){_(H)}})},resetCanvas:function(){N([]),ne([]),U([])}}});var le=function(g){P(!0),ne([]);var _={drawMode:r,strokeColor:r?D:"#000000",strokeWidth:r?q:F,paths:[g]};e&&(_=ae({},_,{startTimestamp:Date.now(),endTimestamp:0})),U(function(L){return[].concat(L,[_])})},se=function(g){if(w){var _=B.slice(-1)[0],L=ae({},_,{paths:[].concat(_.paths,[g])});U(function(H){return[].concat(H.slice(0,-1),[L])})}},ue=function(){var g,_;if(w&&(P(!1),!!e)){var L=(g=(_=B.slice(-1))==null?void 0:_[0])!=null?g:null;if(L!==null){var H=ae({},L,{endTimestamp:Date.now()});U(function(Z){return[].concat(Z.slice(0,-1),[H])})}}};return h.createElement(Te,{ref:n,id:d,width:f,height:x,className:S,canvasColor:E,backgroundImage:p,exportWithBackgroundImage:I,preserveBackgroundImageAspectRatio:z,allowOnlyPointerType:ee,style:oe,svgStyle:K,paths:B,isDrawing:w,onPointerDown:le,onPointerMove:se,onPointerUp:ue})});const Oe=({setModal:i,courierId:c})=>{const[o,d]=h.useState(""),[l,f]=h.useState(!1),[y,x]=h.useState(!1),[u,S]=h.useState("0"),m={border:"0.0625rem solid #9c9c9c",borderRadius:"0.25rem",width:"300px",height:"200px"},E=h.useRef(null);async function j(){try{return await E.current.exportImage("png")}catch(p){return console.log(p),""}}function D(){E.current.clearCanvas()}async function A(){if(console.log(o),o.length>0&&l){const p=await j();i(!1),x(!0),fe.post(`${ve}/pick-pack/manifest/evidence/${c}`,{photo:o,signature:p}).then(()=>{he.success("Información enviada con éxito!")}).catch(O=>{console.log(O),he.error("Información no recibida, intenta de nuevo")}).finally(()=>x(!1))}else he.error("Llena todos los campos")}return s.jsxs("div",{className:"text-center ",children:[s.jsxs("div",{className:"mt-10 ",children:[s.jsx("div",{className:` ${o.length===0?"opacity-100 ":"opacity-0 -z-10 w-0"}`,children:s.jsx(Ne,{isSilentMode:!0,idealFacingMode:$e.FACING_MODES.ENVIRONMENT,onTakePhoto:p=>{d(p)}})}),s.jsxs("div",{className:`relative bg-gray-100 w-full overflow-hidden  flex flex-col justify-center items-center ${o.length>0?"opacity-100 max-h-64 z-30":"opacity-0 -z-10 h-0"}`,children:[s.jsx("img",{style:{rotate:`${u}deg`},src:o,className:"",alt:""}),s.jsx("div",{className:"absolute bottom-0",children:s.jsxs("div",{className:" flex gap-10 ",children:[s.jsx("div",{onClick:()=>{let p=parseInt(u);p=p-90,p=p.toString(),S(p)},className:"bg-blue-500 text-white cursor-pointer p-2 text-2xl rounded-full",children:s.jsx("svg",{viewBox:"0 0 512 512",fill:"currentColor",height:"1em",width:"1em",children:s.jsx("path",{d:"M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2l17.6-17.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3-163.8-62.5-226.3 0L125.7 160z"})})}),s.jsx("div",{onClick:()=>{let p=parseInt(u);p=p+90,p=p.toString(),S(p)},className:"bg-blue-500 cursor-pointer text-white p-2 text-2xl rounded-full",children:s.jsx("svg",{viewBox:"0 0 512 512",fill:"currentColor",height:"1em",width:"1em",children:s.jsx("path",{d:"M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32h128c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2l-17.6-17.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8 229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3 163.8-62.5 226.3 0l17.2 17.2z"})})})]})})]}),s.jsx("div",{onClick:()=>{d(""),S(0)},className:`btn ${o.length>0?"opacity-100":"opacity-0"} btn-sm mt-2`,children:"Tomar otra foto"})]}),s.jsxs("div",{className:"mt-4",children:[s.jsx("p",{className:"font-semibold",children:"Firma de recibo"}),s.jsx(Re,{style:m,className:"mx-auto ",ref:E,onStroke:p=>{f(!0),console.log(p)},strokeWidth:4,strokeColor:"black"}),s.jsx("div",{className:"flex justify-end mx-auto gap-2 mt-1 mb-5 w-[300px] ",children:s.jsx("div",{className:"btn btn-sm",onClick:D,children:s.jsx("svg",{viewBox:"0 0 1002 1000",fill:"currentColor",height:"1em",width:"1em",className:"w-5 h-5",children:s.jsx("path",{d:"M902 150c28 0 51.667 9.667 71 29s29 43 29 71v500c0 26.667-9.667 50-29 70s-43 30-71 30H424c-25.333 0-48.667-9.333-70-28L14 526c-18.667-17.333-18.667-35.333 0-54l340-296c20-17.333 43.333-26 70-26h478M762 700l72-74-128-126 128-128-72-72-128 126-128-126-72 72 128 128-128 126 72 74 128-128 128 128"})})})})]}),s.jsx("div",{className:"px-4 mb-1",children:s.jsx("button",{disabled:y,className:"euro-btn w-3/4 mx-auto",onClick:A,children:y?s.jsx("span",{className:"loading loading-spinner loading-md"}):"Enviar"})})]})},Ge=()=>{const{courierId:i}=Ce(),[c,o]=h.useState(""),[d,l]=h.useState([]),[f,y]=h.useState(!1),[x,u]=h.useState(!1);function S(){fe.get(`${ve}/pick-pack/manifest/${i}`).then(m=>{console.log(m.data),l(m.data);const E=m.data.map(j=>j.idVtex_order);y(!0),fe.post(`${ve}/pick-pack/pdf`,{data:E}).then(j=>{o(j.data.data)}).catch(j=>{console.log(j)}).finally(()=>{y(!1)})}).catch(m=>{console.log(m)})}return h.useEffect(()=>{S()},[]),s.jsxs(Ee,{children:[s.jsxs("div",{className:"",children:[s.jsx("div",{className:"text-center m-5 font-bold",children:"Manifiesto"}),s.jsx("div",{className:"overflow-x-auto w-screen mx-auto",children:s.jsxs("table",{className:"table   text-center table-sm",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"orden"}),s.jsx("th",{children:"sec"}),s.jsx("th",{className:"",children:"cliente"}),s.jsx("th",{children:"guia"}),s.jsx("th",{children:"paqueteria"})]})}),s.jsx("tbody",{children:d.map((m,E)=>s.jsxs("tr",{className:"border-b-2",children:[s.jsx("td",{children:m.idVtex_order}),s.jsx("td",{children:"018190"}),s.jsx("td",{className:"",children:m.customerName_order}),s.jsx("td",{children:128198}),s.jsx("td",{children:m.courier_order})]},E))})]})})]}),d.length===0&&s.jsx("div",{className:"text-center  mt-20 font-bold",children:"Sin ordenes registradas..."}),d.length>0&&s.jsxs("div",{className:"text-center mt-10 space-x-2",children:[s.jsx("div",{className:"btn capitalize",onClick:()=>u(!0),children:"Firmar Manifiesto"}),c.length>0&&s.jsxs("a",{download:"Manifiesto",className:"btn capitalize",href:`data:application/pdf;base64,${c}`,children:[!f&&"Descargar PDF",f&&s.jsx("span",{className:"loading loading-dots loading-md"})]})]}),s.jsxs(je,{isOpen:x,setIsOpen:u,children:[s.jsx("div",{onClick:()=>u(!1),className:"absolute top-2 right-2 cursor-pointer",children:s.jsx("svg",{className:"w-7 h-7 text-red-500",fill:"none",viewBox:"0 0 15 15",height:"1em",width:"1em",children:s.jsx("path",{fill:"currentColor",fillRule:"evenodd",d:"M11.782 4.032a.575.575 0 10-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 00-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 00.814.814L7.5 8.313l3.469 3.469a.575.575 0 00.813-.814L8.313 7.5l3.469-3.468z",clipRule:"evenodd"})})}),s.jsx(Oe,{setModal:u,courierId:i})]})]})};export{Ge as default};
