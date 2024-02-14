import{f as F,s as $,h as V,i as Q,r,a as k,j as e,m as S,u as D,b as w,c as E,_ as v,d as z,e as O}from"./index-BCPdOgt-.js";import{M as T,N as U}from"./NavBar-hWh_lFYa.js";import{C,A as G,a as Z,R as K}from"./ReturnSheet-DL6aHo52.js";import{S as H}from"./Stepper-BA8fBoso.js";import{u as W}from"./getProducts-BXvp4UAR.js";function Y(t){t.values.forEach(s=>s.stop())}function J(){const t=new Set,s={subscribe(a){return t.add(a),()=>void t.delete(a)},start(a,c){const o=[];return t.forEach(d=>{o.push(F(d,a,{transitionOverride:c}))}),Promise.all(o)},set(a){return t.forEach(c=>{$(c,a)})},stop(){t.forEach(a=>{Y(a)})},mount(){return()=>{s.stop()}}};return s}function X(){const t=V(J);return Q(t.mount,[]),t}const ee=X,te=({children:t,productData:s})=>{const{setItemData:a,setModalPack:c}=k(),{setDragging:o}=k(),[d,i]=r.useState(!1),u=(p,n)=>{const l=n.offset.x;i(l)};return r.useEffect(()=>{d<-220&&(console.log("Reached the specific value!"),a(s),c(!0))},[d]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"relative",children:[e.jsx("div",{id:"1",className:"absolute -z-10 w-full bg-[#E57373] h-32"}),e.jsx(S.div,{id:"2",className:" ",drag:"x",dragElastic:{left:.5,right:0},dragConstraints:{left:0,right:0},onDrag:u,onDragStart:()=>{o(!0)},onDragEnd:()=>{o(!1)},style:{cursor:"grab"},children:t})]})})},se=r.memo(te);function M(t){return t.every(a=>a.packed_item===0)}const q=({packing:t=!0})=>{const{orderId:s}=D(),[a,c]=r.useState(!1),{modalPack:o,setModalPack:d,itemData:i,itemsList:u,setItemsList:p}=k(),[n,l]=r.useState(0);function g(){t?n<i.quantity_item&&n+1<=i.quantity_item-i.packed_item&&l(n+1):n<i.packed_item&&l(n+1)}function j(){n>0&&l(n-1)}function x(){let h=[];t?n<=i.quantity_item&&n<=i.quantity_item-i.packed_item&&(h=[{id_item:i.id_item,packed_item:i.packed_item+n}],_(h)):i.packed_item-n>=0&&(h=[{id_item:i.id_item,packed_item:i.packed_item-n}],_(h))}function _(h){const P=M(u),I={order:s};c(!0),w.put(`${E}/pick-pack/pack_items`,{items:h,firstPacking:P?I:void 0}).then(()=>{v.success("¡Empaque actualizado!",{position:"bottom-center"}),d(!1);const N=u.map(f=>f.id_item===i.id_item?{...f,packed_item:t?i.packed_item+n:i.packed_item-n}:f);p(N),console.log(N)}).catch(N=>{console.log(N),v.error("error, no se puedo actualizar el empaquetado, intenta de nuevo")}).finally(()=>c(!1))}return r.useEffect(()=>{l(0)},[o]),e.jsx(T,{isOpen:o,setIsOpen:d,children:e.jsxs("div",{className:"h-56 w-full flex justify-between flex-col p-4 bg-gray-100",children:[e.jsxs("h3",{className:"font-semibold text-lg",children:[" ",t?"Empacar":"Desempacar"," Producto"]}),e.jsxs("div",{children:[e.jsx("div",{className:"text-sm mb-2",children:i.refId_item}),e.jsx("div",{className:"text-sm",children:i.name_item})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-4 p-2 border-2 shadow-lg",children:[e.jsx("div",{className:"text-sm flex justify-center items-center",children:"Cantidad"}),e.jsx("div",{children:e.jsxs("div",{className:"flex justify-center",children:[e.jsx("button",{onClick:j,className:"bg-gray-200 flex items-center justify-center w-8 h-8 rounded-l-full",children:"-"}),e.jsx("div",{children:e.jsx("input",{value:n,className:"w-10 h-8 text-center",type:"number",onChange:h=>l(parseInt(h.target.value))})}),e.jsx("button",{onClick:g,className:"bg-gray-200 flex items-center justify-center w-8 h-8 rounded-r-full",children:"+"})]})}),e.jsx("button",{disabled:n===0||isNaN(n),onClick:x,className:"flex justify-center items-center py-2 hover:bg-blue-300 hover:text-blue-700  bg-blue-200 rounded-md text-blue-600",children:a?e.jsx("span",{className:"loading loading-spinner loading-md"}):t?"Empacar":"Desempacar"})]})]})})},ae=({product:t})=>e.jsx("div",{children:e.jsx("div",{className:"relative   flex items-center justify-between p-4 bg-white border border-gray-200 ",children:e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx("img",{src:t.imageUrl_item,alt:"Product image",className:"h-24 w-24 rounded-md bg-gray-200",width:"100",height:"100",style:{aspectRatio:"100/100",objectFit:"cover"}}),e.jsxs("div",{children:[e.jsx("h5",{className:"text-sm font-semibold",children:t.name_item}),e.jsxs("p",{className:"text-sm text-gray-500",children:["SKU: ",t.refId_item]}),e.jsxs("p",{className:"font-semibold text-sm",children:[t.packed_item," de ",t.quantity_item]})]})]})})}),ie=({onConfirm:t,loading:s=!1,presence:a})=>{const[c,o]=r.useState(0),[d,i]=r.useState(!1),[u,p]=r.useState(!1),n=ee(),l=(j,x)=>{n.start({x:x.offset.x}),o(x.offset.x),x.offset.x>=240&&p(!0)};r.useEffect(()=>{u&&t()},[u]);const g=(j,x)=>{i(!1),n.start({x:0})};return e.jsx("div",{className:"fixed bottom-4 left-1/2 -translate-x-1/2",children:e.jsxs("div",{className:" relative  overflow-hidden",children:[!u&&e.jsx(S.div,{id:"1",className:"flex cursor-pointer items-center justify-center absolute rounded-full  left-0 h-12 w-12 text-black bg-white",drag:"x",onDrag:l,onDragStart:()=>i(!0),onDragEnd:g,animate:n,children:e.jsx("svg",{fill:"currentColor",viewBox:"0 0 16 16",height:"23",width:"23",children:e.jsx("path",{fillRule:"evenodd",d:"M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z"})})}),a&&e.jsx("div",{id:"2",className:` ${u?"w-14 h-14":"w-72 h-12"}  flex justify-center items-center text-white ${d&&"text-opacity-20"} rounded-full  bg-blue-700`,children:u&&s?e.jsx("span",{className:"loading loading-spinner loading-lg"}):"Confirmar empaquetado"})]})})},ne=()=>{const{itemsList:t}=k(),[s,a]=r.useState(!1),[c,o]=r.useState(!0),{orderId:d}=D(),i=z(),u=l=>{if(!document.startViewTransition){i(`/end/${d}`);return}document.startViewTransition(()=>O.flushSync(()=>i(`/end/${d}`)))};function p(){a(!0),w.post(`${E}/pick-pack/change_status`,{order:d,status:7,statusName:"Empacado"}).then(()=>{v.success("¡Confirmación enviada con éxito!",{position:"bottom-center"}),o(!1),setTimeout(()=>{u()},1e3)}).catch(l=>{console.log(l),v.error("ups, algo salió mal")}).finally(()=>a(!1))}function n(){let l=0,g=0;return t.forEach(j=>{l+=j.quantity_item,g+=j.packed_item}),l===g}return e.jsxs("div",{children:[t.map((l,g)=>l.packed_item!==0&&e.jsx(se,{productData:l,children:e.jsx(ae,{product:l})},g)),n()&&e.jsx(ie,{onConfirm:p,loading:s,presence:c}),e.jsx(q,{packing:!1})]})},ce=({product:t})=>{console.log("*PACKING CARD RENDERED !!");const[s,a]=r.useState(t.packed_item),[c,o]=r.useState(!1),{packList:d,setPackList:i}=k();function u(j){let x=[...d];const _=x.findIndex(h=>h.id_item===t.id_item);if(_!==-1)x[_].packed_item=j?s+1:s-1;else{const h={id_item:t.id_item,packed_item:j?s+1:s-1};x.push(h)}i(x)}function p(){s<t.quantity_item&&(u(!0),a(s+1))}function n(){s>t.packed_item&&(u(!1),a(s-1))}const l=()=>o(!0),g=()=>o(!1);return r.useEffect(()=>{a(t.packed_item)},[t]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"relative   flex items-center justify-between p-4 bg-white border border-gray-200 ",children:[e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx("img",{src:t.imageUrl_item,alt:"Product image",className:"h-24 w-24 rounded-md bg-gray-200",width:"100",height:"100",style:{aspectRatio:"100/100",objectFit:"cover"}}),e.jsxs("div",{children:[e.jsx("h5",{className:"text-sm font-semibold",children:t.name_item}),e.jsxs("p",{className:"text-sm text-gray-500",children:["SKU: ",t.refId_item]}),e.jsxs("p",{className:"font-semibold text-sm",children:[s," de ",t.quantity_item]})]})]}),e.jsxs("div",{onMouseEnter:l,onMouseLeave:g,className:"absolute bottom-3 right-2 flex px-1 pt-10  items-center cursor-pointer",children:[!c&&s>0&&e.jsxs("div",{className:"py-1 px-4 rounded-full  text-white bg-blue-700",children:[s," u"]}),c&&s>0&&e.jsxs("div",{className:"flex text-center",children:[e.jsx("div",{onClick:n,className:"bg-gray-200  select-none flex items-center justify-center w-8 h-8 rounded-l-full",children:"-"}),e.jsx("div",{className:"",children:e.jsx("input",{value:s,readOnly:!0,className:"w-6 h-8  text-center",type:"number"})}),e.jsx("div",{onClick:p,className:"bg-gray-200  select-none flex items-center justify-center w-8 h-8 rounded-r-full",children:"+"})]}),s===0&&e.jsx("div",{onClick:p,className:"w-8 h-8 cursor-pointer  text-blue-300 bg-blue-800 rounded-full",children:e.jsx("svg",{fill:"currentColor",viewBox:"0 0 16 16",height:"",width:"",children:e.jsx("path",{d:"M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4.5a.5.5 0 00-1 0v3h-3a.5.5 0 000 1h3v3a.5.5 0 001 0v-3h3a.5.5 0 000-1h-3v-3z"})})})]})]})})},re=r.memo(ce),oe=({children:t,productData:s})=>{const{setItemData:a,setModalPack:c}=k(),{setDragging:o}=k(),[d,i]=r.useState(!1),u=(p,n)=>{const l=n.offset.x;i(l)};return r.useEffect(()=>{d>=220&&(console.log("Reached the specific value!"),a(s),c(!0))},[d]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"relative",children:[e.jsx("div",{id:"1",className:"absolute -z-10 w-full bg-[#4CAF50] h-32"}),e.jsx(S.div,{id:"2",className:" ",drag:"x",dragElastic:{left:0,right:.5},dragConstraints:{left:0,right:0},onDrag:u,onDragStart:()=>{o(!0)},onDragEnd:()=>{o(!1)},style:{cursor:"grab"},children:t})]})})},le=r.memo(oe),de=()=>{const{orderId:t}=D(),{getProducts:s,loading:a}=W(),{itemsList:c,setItemsList:o,packList:d,setPackList:i,user:u,codeScanned:p}=k(),[n,l]=r.useState(!1),[g,j]=r.useState(""),[x,_]=r.useState({}),h=r.useMemo(()=>{let f=0;return d.forEach(m=>{f+=m.packed_item}),f},[d]),P=r.useCallback(()=>{let f=0,m=0;return c.forEach(b=>{f+=b.quantity_item,m+=b.packed_item}),f===m},[c]);function I(){l(!0);const f=M(c),m={order:t};w.put(`${E}/pick-pack/pack_items`,{items:d,firstPacking:f?m:void 0,user:u.id}).then(()=>{v.success("¡Items empacados!",{position:"bottom-center"});const b=new Map(d.map(y=>[y.id_item,y])),L=c.map(y=>({...y,packed_item:(b.get(y.id_item)||{}).packed_item||y.packed_item}));o(L),i([])}).catch(b=>{console.log(b),v.error("Error, no se pudo empacar, intenta de nuevo",{position:"bottom-center"})}).finally(()=>l(!1))}function N(){const f=c.findIndex(m=>m.ean_item===p);if(f!==-1){const m=c[f];if(m.packed_item+1<=m.quantity_item){const b=M(c),L={order:t},y=[{id_item:m.id_item,packed_item:m.packed_item+1}];w.put(`${E}/pick-pack/pack_items`,{items:y,firstPacking:b?L:void 0,user:u.id}).then(()=>{v.success("¡Empaque actualizado!",{position:"bottom-center"});const A=c.map(R=>R.id_item===m.id_item?{...R,packed_item:m.packed_item+1}:R);_(m),o(A);const B=`${m.quantity_item-(m.packed_item+1)===0?`Felicidades haz terminado ${m.refId_item}`:`Listo, restan ${m.quantity_item-(m.packed_item+1)}`}`;j(B)}).catch(A=>{console.log(A),v.error("error, no se puedo actualizar el empaquetado, intenta de nuevo")})}else v("ESTA PRENDA YA HA SIDO EMPACADA!",{icon:"⚠️",position:"bottom-center"})}else v("ESTA PRENDA NO ESTÁ EN LA ORDEN!",{icon:"⚠️"})}return r.useEffect(()=>{p.length===13&&N()},[p]),r.useEffect(()=>{s(t),i([])},[]),e.jsxs("div",{className:"overflow-x-hidden mb-24",tabIndex:"0",children:[a&&e.jsxs("div",{className:"mt-5",children:[e.jsx("div",{className:"mb-7",children:e.jsx(C,{})}),e.jsx("div",{className:"mb-7",children:e.jsx(C,{})}),e.jsx("div",{className:"mb-7",children:e.jsx(C,{})})," ",e.jsx("div",{className:"mb-7",children:e.jsx(C,{})})," ",e.jsx("div",{className:"mb-7",children:e.jsx(C,{})})]}),e.jsx(G,{number:x.quantity_item&&x.quantity_item-(x.packed_item+1),sku:x.refId_item,SpeechTxt:g}),e.jsxs("div",{children:[e.jsx(Z,{children:c.map((f,m)=>f.packed_item!==f.quantity_item&&e.jsx(S.div,{animate:{opacity:1,y:0},exit:{opacity:0,x:-100},transition:{duration:.5},children:e.jsx(le,{productData:f,children:e.jsx(re,{product:f})})},m))}),P()&&e.jsxs("div",{className:"flex flex-col justify-center items-center",children:[e.jsxs("svg",{fill:"none",xmlns:"http://www.w3.org/2000/svg",width:"200",height:"120",viewBox:"0 0 193 97",children:[e.jsx("rect",{opacity:"0.8",x:"29",y:"41",width:"142.769",height:"16",rx:"2",fill:"#DAE3F5"}),e.jsx("rect",{opacity:"0.6",x:"29",y:"61",width:"150.154",height:"16",rx:"2",fill:"#DAE3F5"}),e.jsx("rect",{opacity:"0.4",x:"29",y:"81",width:"135.385",height:"16",rx:"2",fill:"#DAE3F5"}),e.jsx("rect",{x:"29",y:"21",width:"163.692",height:"16",rx:"2",fill:"#DAE3F5"}),e.jsxs("g",{filter:"url(#filter0_d)",children:[e.jsx("circle",{cx:"35.8182",cy:"27.8182",r:"19.6364",fill:"white"}),e.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M49.6702 44.35C41.1389 51.5231 28.3882 51.0955 20.3599 43.0674C11.88 34.5877 11.88 20.8394 20.3599 12.3598C28.8397 3.88008 42.5883 3.88008 51.0681 12.3598C59.0967 20.3882 59.524 33.1394 52.3499 41.6705L61.445 50.7655C62.185 51.5054 62.185 52.7051 61.445 53.445C60.7051 54.185 59.5054 54.185 58.7654 53.445L49.6702 44.35ZM23.0395 15.0393C30.0394 8.03951 41.3886 8.03951 48.3885 15.0393C55.3307 21.9814 55.388 33.2012 48.5603 40.2138C48.4962 40.2632 48.4345 40.3173 48.3758 40.3761C48.3171 40.4348 48.263 40.4964 48.2136 40.5604C41.2008 47.3872 29.9814 47.3297 23.0395 40.3879C16.0395 33.3881 16.0395 22.0391 23.0395 15.0393Z",fill:"#B6C3E1"}),e.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M35.9339 32.7129C36.7353 32.75 37.3653 33.3423 37.3653 34.083C37.3653 34.8401 36.6896 35.4546 35.8572 35.4546C35.0249 35.4546 34.3492 34.8401 34.3492 34.0949C34.341 33.3512 34.9841 32.7426 35.7919 32.7129L35.8556 32.7114L35.9339 32.7129ZM35.8066 34.9366C35.8229 34.938 35.8393 34.938 35.8556 34.938L35.8066 34.9366Z",fill:"#B6C3E1"}),e.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M31.4546 24.1469C31.4546 21.9527 33.4115 20.1819 35.819 20.1819C38.2291 20.1819 40.1819 21.958 40.1819 24.1498C40.1819 25.8778 38.9421 26.7878 38.0876 27.3103L38.086 27.3112C37.3703 27.7474 37.0402 28.0889 37.0402 28.6709V29.0267C37.0402 29.6409 36.4927 30.1388 35.8174 30.1388C35.1421 30.1388 34.5946 29.6409 34.5946 29.0267V28.6709C34.5946 26.9195 35.8484 25.9977 36.7239 25.464C37.076 25.2486 37.3256 25.0598 37.4913 24.8567C37.6369 24.6783 37.7363 24.4672 37.7363 24.1498C37.7363 23.1863 36.8784 22.4061 35.819 22.4061C34.7572 22.4061 33.9001 23.1856 33.9001 24.1469C33.9001 24.7611 33.3527 25.259 32.6774 25.259C32.002 25.259 31.4546 24.7611 31.4546 24.1469Z",fill:"#B6C3E1"})]}),e.jsx("defs",{children:e.jsxs("filter",{id:"filter0_d",x:"0",y:"0",width:"76",height:"76",filterUnits:"userSpaceOnUse",colorInterpolationFilters:"sRGB",children:[e.jsx("feFlood",{floodOpacity:"0",result:"BackgroundImageFix"}),e.jsx("feColorMatrix",{in:"SourceAlpha",type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"}),e.jsx("feOffset",{dy:"8"}),e.jsx("feGaussianBlur",{stdDeviation:"7"}),e.jsx("feColorMatrix",{type:"matrix",values:"0 0 0 0 0.714028 0 0 0 0 0.765932 0 0 0 0 0.883333 0 0 0 0.6 0"}),e.jsx("feBlend",{mode:"normal",in2:"BackgroundImageFix",result:"effect1_dropShadow"}),e.jsx("feBlend",{mode:"normal",in:"SourceGraphic",in2:"effect1_dropShadow",result:"shape"})]})})]}),e.jsx("p",{children:"Sin Items por empacar"})]}),e.jsxs("div",{className:`flex shadow-md ${h>0?"bottom-2 ":"-bottom-16"} transition-all duration-150  text-black justify-between items-center bg-gray-100 fixed w-[98%] rounded-sm left-1/2 -translate-x-1/2 p-3  `,children:[e.jsxs("div",{children:["Unidades seleccionadas: ",h]}),e.jsx("div",{children:e.jsxs("button",{onClick:I,disabled:n||h===0,className:"justify-center text-sm font-medium ring-offset-background  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-blue-800 h-10 bg-[#2A5DB0] text-white px-5 py-6 rounded flex items-center space-x-2",children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"text-white",children:[e.jsx("path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}),e.jsx("path",{d:"m3.3 7 8.7 5 8.7-5"}),e.jsx("path",{d:"M12 22V12"})]}),n?e.jsx("span",{className:"sendingInfo sendingInfo-spinner text-info"}):e.jsx("span",{children:"Empacar"})]})})]})]}),e.jsx(q,{packing:!0})]})},me=()=>{const[t,s]=r.useState(1);function a(c){s(c)}return e.jsxs("div",{className:"border-t-2",children:[e.jsxs("div",{className:"grid grid-cols-2  text-center  cursor-pointer",children:[e.jsx("div",{className:`p-3 ${t===1&&"border-b-4  border-b-blue-600 text-blue-600"}  `,onClick:()=>a(1),children:"Items pendientes"}),e.jsx("div",{className:`p-3 ${t===2&&"border-b-4 border-b-blue-600 text-blue-600"}`,onClick:()=>a(2),children:"Items empacados"})]}),e.jsx("div",{children:t===1&&e.jsx(de,{})}),e.jsx("div",{children:t===2&&e.jsx(ne,{})})]})},ge=()=>{const t=r.useRef(null);r.useEffect(()=>{t.current.focus()},[]);const{codeScanned:s,setCodeScanned:a}=k(),{orderId:c}=D();return e.jsx("div",{tabIndex:"0",ref:t,onKeyDown:o=>{console.log(o.key),(o.key==="Tab"||o.key==="Enter")&&(o.preventDefault(),a("")),!isNaN(parseInt(o.key))&&a(s+o.key)},children:e.jsxs(U,{children:[e.jsx(H,{stepGiven:2}),e.jsx(K,{route:"/packing",ws:c}),e.jsx(me,{})]})})};export{ge as default};
