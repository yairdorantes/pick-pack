import{r as U,j as u,_ as he,R as q}from"./index-BfReBK8T.js";import{M as is,N as ws}from"./NavBar-CaXN9mgf.js";import{u as ls,a as be,b as pe}from"./Context-NoiIBJax.js";import"./oms-DCe7yTTY.js";function js(e=[]){const[i,r]=U.useState(e);return{list:i,toggleList:a=>{if(i.includes(a)){const n=i.filter(d=>d!==a);r(n)}else r([...i,a])},setList:r}}const as=({onHandleQuery:e,placeHolderValue:i="Buscar"})=>u.jsxs("form",{className:"w-full mx-auto m-4 px-4",children:[u.jsx("label",{htmlFor:"default-search",className:"mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white",children:"Search"}),u.jsxs("div",{className:"relative",children:[u.jsx("div",{className:"absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none",children:u.jsx("svg",{className:"w-4 h-4 text-gray-500 dark:text-gray-400","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 20 20",children:u.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"})})}),u.jsx("input",{type:"search",id:"default-search",className:"block w-full transition-all duration-500 p-2 ps-10  text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:i,required:!0,onChange:r=>{e(r.target.value)}})]})]}),As=({opening:e,changeState:i,rowSelected:r})=>{const{fulFillmentUsers:t}=ls(),[a,n]=U.useState([]),[d,p]=U.useState(!1),[b,k]=U.useState(a),[O,j]=U.useState(1),{list:v,toggleList:B,setList:S}=js();function Y(){p(!0),be.post(`${pe}/pick-pack/order_assigment/${r.idVtex_order}/${O}`,{data:v}).then(()=>{he.success("Cambios enviados!"),i(!1)}).catch(m=>{console.log(m),he.error("ups ocurrio un error intenta de nuevo")}).finally(()=>p(!1))}function se(m){const g=a.filter(R=>R.name_user.toLowerCase().includes(m.toLowerCase()));g.length>0?k(g):k(a)}return U.useEffect(()=>{n(t),k(t)},[r]),U.useEffect(()=>{O===1?r.picking_assigment!==null?S(r.picking_assigment):S([]):r.packing_assigment!==null?S(r.packing_assigment):S([])},[O,r]),u.jsxs(is,{isOpen:e,setIsOpen:i,children:[u.jsxs("div",{id:"options",className:"flex justify-center gap-8 p-2",children:[u.jsx("div",{onClick:()=>j(1),className:`transition-all cursor-pointer px-5 py-3 w-1/2 text-center rounded-lg  ${O!==1?"border-2 border-blue-500 text-blue-600":"bg-blue-500 text-white"} `,children:"Pickeo"}),u.jsx("div",{onClick:()=>j(2),className:`transition-all cursor-pointer px-5 w-1/2 py-3 text-center rounded-lg  ${O!==2?"border-2 border-blue-500 text-blue-600":"bg-blue-500 text-white"} `,children:"Packing"})]}),u.jsxs("div",{className:"text-sm text-center font-semibold ",children:["Los usuarios seleccionados"," ",O===1?u.jsx("span",{className:"text-info px-3",children:"ALISTARÁN ✅"}):u.jsx("span",{className:"text-emerald-400 px-3",children:"EPACANRÁN📦"})," ","la orden ",r.idVtex_order]}),u.jsx(as,{placeHolderValue:"Buscar Picker",onHandleQuery:se}),u.jsxs("div",{className:"overflow-x-auto max-h-96 mb-16",children:[u.jsxs("table",{className:"table ",children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{}),u.jsx("th",{children:"Nombre"}),u.jsx("th",{children:"XP"}),u.jsx("th",{children:"Averge Time"}),u.jsx("th",{})]})}),u.jsx("tbody",{children:b.map((m,g)=>u.jsxs("tr",{className:"cursor-pointer",onClick:()=>B(m.id_user),children:[u.jsx("td",{children:u.jsx("div",{className:"flex items-center gap-3",children:u.jsx("div",{className:"avatar",children:u.jsx("div",{className:"mask mask-squircle w-12 h-12",children:u.jsx("img",{src:`https://i.pravatar.cc/300?u=${m.id_user+1*4}`,alt:"Avatar Tailwind CSS Component"})})})})}),u.jsx("td",{children:u.jsxs("div",{children:[u.jsx("div",{className:"font-bold",children:m.name_user}),u.jsx("div",{className:"text-sm opacity-50",children:"027"})]})}),u.jsx("td",{children:u.jsx("div",{children:g+12})}),u.jsx("td",{className:"text-center",children:u.jsxs("div",{children:[22+g,"m"]})}),u.jsx("th",{children:u.jsx("label",{children:u.jsx("input",{type:"checkbox",className:"checkbox checkbox-info",readOnly:!0,checked:v&&v.includes(m.id_user)})})})]},g))})]}),u.jsx("div",{className:"fixed bottom-2 -translate-x-1/2 left-1/2",children:d?u.jsx("span",{className:"loading loading-infinity loading-lg text-green-500"}):u.jsx("div",{onClick:Y,className:"euro-btn ",children:"Confirmar cambios"})})]})]})};var xe=e=>e.type==="checkbox",oe=e=>e instanceof Date,T=e=>e==null;const ns=e=>typeof e=="object";var D=e=>!T(e)&&!Array.isArray(e)&&ns(e)&&!oe(e),Vs=e=>D(e)&&e.target?xe(e.target)?e.target.checked:e.target.value:e,ks=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,Ns=(e,i)=>e.has(ks(i)),Fs=e=>{const i=e.constructor&&e.constructor.prototype;return D(i)&&i.hasOwnProperty("isPrototypeOf")},Te=typeof window<"u"&&typeof window.HTMLElement<"u"&&typeof document<"u";function I(e){let i;const r=Array.isArray(e);if(e instanceof Date)i=new Date(e);else if(e instanceof Set)i=new Set(e);else if(!(Te&&(e instanceof Blob||e instanceof FileList))&&(r||D(e)))if(i=r?[]:{},!r&&!Fs(e))i=e;else for(const t in e)e.hasOwnProperty(t)&&(i[t]=I(e[t]));else return e;return i}var ye=e=>Array.isArray(e)?e.filter(Boolean):[],F=e=>e===void 0,x=(e,i,r)=>{if(!i||!D(e))return r;const t=ye(i.split(/[,[\].]+?/)).reduce((a,n)=>T(a)?a:a[n],e);return F(t)||t===e?F(e[i])?r:e[i]:t},J=e=>typeof e=="boolean";const Xe={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"},H={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},G={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"};q.createContext(null);var Ss=(e,i,r,t=!0)=>{const a={defaultValues:i._defaultValues};for(const n in e)Object.defineProperty(a,n,{get:()=>{const d=n;return i._proxyFormState[d]!==H.all&&(i._proxyFormState[d]=!t||H.all),r&&(r[d]=!0),e[d]}});return a},$=e=>D(e)&&!Object.keys(e).length,Ds=(e,i,r,t)=>{r(e);const{name:a,...n}=e;return $(n)||Object.keys(n).length>=Object.keys(i).length||Object.keys(n).find(d=>i[d]===(!t||H.all))},Ee=e=>Array.isArray(e)?e:[e];function Es(e){const i=q.useRef(e);i.current=e,q.useEffect(()=>{const r=!e.disabled&&i.current.subject&&i.current.subject.subscribe({next:i.current.next});return()=>{r&&r.unsubscribe()}},[e.disabled])}var Q=e=>typeof e=="string",Ls=(e,i,r,t,a)=>Q(e)?(t&&i.watch.add(e),x(r,e,a)):Array.isArray(e)?e.map(n=>(t&&i.watch.add(n),x(r,n))):(t&&(i.watchAll=!0),r),Ue=e=>/^\w*$/.test(e),os=e=>ye(e.replace(/["|']|\]/g,"").split(/\.|\[/)),V=(e,i,r)=>{let t=-1;const a=Ue(i)?[i]:os(i),n=a.length,d=n-1;for(;++t<n;){const p=a[t];let b=r;if(t!==d){const k=e[p];b=D(k)||Array.isArray(k)?k:isNaN(+a[t+1])?{}:[]}e[p]=b,e=e[p]}return e},Cs=(e,i,r,t,a)=>i?{...r[e],types:{...r[e]&&r[e].types?r[e].types:{},[t]:a||!0}}:{},Ze=e=>({isOnSubmit:!e||e===H.onSubmit,isOnBlur:e===H.onBlur,isOnChange:e===H.onChange,isOnAll:e===H.all,isOnTouch:e===H.onTouched}),Ge=(e,i,r)=>!r&&(i.watchAll||i.watch.has(e)||[...i.watch].some(t=>e.startsWith(t)&&/^\.\w+/.test(e.slice(t.length))));const fe=(e,i,r,t)=>{for(const a of r||Object.keys(e)){const n=x(e,a);if(n){const{_f:d,...p}=n;if(d){if(d.refs&&d.refs[0]&&i(d.refs[0],a)&&!t)break;if(d.ref&&i(d.ref,d.name)&&!t)break;fe(p,i)}else D(p)&&fe(p,i)}}};var Os=(e,i,r)=>{const t=ye(x(e,r));return V(t,"root",i[r]),V(e,r,t),e},Me=e=>e.type==="file",ee=e=>typeof e=="function",_e=e=>{if(!Te)return!1;const i=e?e.ownerDocument:0;return e instanceof(i&&i.defaultView?i.defaultView.HTMLElement:HTMLElement)},ve=e=>Q(e),Re=e=>e.type==="radio",we=e=>e instanceof RegExp;const Je={value:!1,isValid:!1},Ye={value:!0,isValid:!0};var us=e=>{if(Array.isArray(e)){if(e.length>1){const i=e.filter(r=>r&&r.checked&&!r.disabled).map(r=>r.value);return{value:i,isValid:!!i.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!F(e[0].attributes.value)?F(e[0].value)||e[0].value===""?Ye:{value:e[0].value,isValid:!0}:Ye:Je}return Je};const es={isValid:!1,value:null};var cs=e=>Array.isArray(e)?e.reduce((i,r)=>r&&r.checked&&!r.disabled?{isValid:!0,value:r.value}:i,es):es;function ss(e,i,r="validate"){if(ve(e)||Array.isArray(e)&&e.every(ve)||J(e)&&!e)return{type:r,message:ve(e)?e:"",ref:i}}var ne=e=>D(e)&&!we(e)?e:{value:e,message:""},ts=async(e,i,r,t,a)=>{const{ref:n,refs:d,required:p,maxLength:b,minLength:k,min:O,max:j,pattern:v,validate:B,name:S,valueAsNumber:Y,mount:se,disabled:m}=e._f,g=x(i,S);if(!se||m)return{};const R=d?d[0]:n,X=w=>{t&&R.reportValidity&&(R.setCustomValidity(J(w)?"":w||""),R.reportValidity())},E={},ue=Re(n),le=xe(n),Ve=ue||le,W=(Y||Me(n))&&F(n.value)&&F(g)||_e(n)&&n.value===""||g===""||Array.isArray(g)&&!g.length,te=Cs.bind(null,S,r,E),Z=(w,_,N,M=G.maxLength,P=G.minLength)=>{const z=w?_:N;E[S]={type:w?M:P,message:z,ref:n,...te(w?M:P,z)}};if(a?!Array.isArray(g)||!g.length:p&&(!Ve&&(W||T(g))||J(g)&&!g||le&&!us(d).isValid||ue&&!cs(d).isValid)){const{value:w,message:_}=ve(p)?{value:!!p,message:p}:ne(p);if(w&&(E[S]={type:G.required,message:_,ref:R,...te(G.required,_)},!r))return X(_),E}if(!W&&(!T(O)||!T(j))){let w,_;const N=ne(j),M=ne(O);if(!T(g)&&!isNaN(g)){const P=n.valueAsNumber||g&&+g;T(N.value)||(w=P>N.value),T(M.value)||(_=P<M.value)}else{const P=n.valueAsDate||new Date(g),z=ge=>new Date(new Date().toDateString()+" "+ge),re=n.type=="time",ce=n.type=="week";Q(N.value)&&g&&(w=re?z(g)>z(N.value):ce?g>N.value:P>new Date(N.value)),Q(M.value)&&g&&(_=re?z(g)<z(M.value):ce?g<M.value:P<new Date(M.value))}if((w||_)&&(Z(!!w,N.message,M.message,G.max,G.min),!r))return X(E[S].message),E}if((b||k)&&!W&&(Q(g)||a&&Array.isArray(g))){const w=ne(b),_=ne(k),N=!T(w.value)&&g.length>+w.value,M=!T(_.value)&&g.length<+_.value;if((N||M)&&(Z(N,w.message,_.message),!r))return X(E[S].message),E}if(v&&!W&&Q(g)){const{value:w,message:_}=ne(v);if(we(w)&&!g.match(w)&&(E[S]={type:G.pattern,message:_,ref:n,...te(G.pattern,_)},!r))return X(_),E}if(B){if(ee(B)){const w=await B(g,i),_=ss(w,R);if(_&&(E[S]={..._,...te(G.validate,_.message)},!r))return X(_.message),E}else if(D(B)){let w={};for(const _ in B){if(!$(w)&&!r)break;const N=ss(await B[_](g,i),R,_);N&&(w={...N,...te(_,N.message)},X(N.message),r&&(E[S]=w))}if(!$(w)&&(E[S]={ref:R,...w},!r))return E}}return X(!0),E};function Ts(e,i){const r=i.slice(0,-1).length;let t=0;for(;t<r;)e=F(e)?t++:e[i[t++]];return e}function Us(e){for(const i in e)if(e.hasOwnProperty(i)&&!F(e[i]))return!1;return!0}function C(e,i){const r=Array.isArray(i)?i:Ue(i)?[i]:os(i),t=r.length===1?e:Ts(e,r),a=r.length-1,n=r[a];return t&&delete t[n],a!==0&&(D(t)&&$(t)||Array.isArray(t)&&Us(t))&&C(e,r.slice(0,-1)),e}var Le=()=>{let e=[];return{get observers(){return e},next:a=>{for(const n of e)n.next&&n.next(a)},subscribe:a=>(e.push(a),{unsubscribe:()=>{e=e.filter(n=>n!==a)}}),unsubscribe:()=>{e=[]}}},je=e=>T(e)||!ns(e);function ie(e,i){if(je(e)||je(i))return e===i;if(oe(e)&&oe(i))return e.getTime()===i.getTime();const r=Object.keys(e),t=Object.keys(i);if(r.length!==t.length)return!1;for(const a of r){const n=e[a];if(!t.includes(a))return!1;if(a!=="ref"){const d=i[a];if(oe(n)&&oe(d)||D(n)&&D(d)||Array.isArray(n)&&Array.isArray(d)?!ie(n,d):n!==d)return!1}}return!0}var ds=e=>e.type==="select-multiple",Ms=e=>Re(e)||xe(e),Ce=e=>_e(e)&&e.isConnected,fs=e=>{for(const i in e)if(ee(e[i]))return!0;return!1};function Ae(e,i={}){const r=Array.isArray(e);if(D(e)||r)for(const t in e)Array.isArray(e[t])||D(e[t])&&!fs(e[t])?(i[t]=Array.isArray(e[t])?[]:{},Ae(e[t],i[t])):T(e[t])||(i[t]=!0);return i}function hs(e,i,r){const t=Array.isArray(e);if(D(e)||t)for(const a in e)Array.isArray(e[a])||D(e[a])&&!fs(e[a])?F(i)||je(r[a])?r[a]=Array.isArray(e[a])?Ae(e[a],[]):{...Ae(e[a])}:hs(e[a],T(i)?{}:i[a],r[a]):r[a]=!ie(e[a],i[a]);return r}var me=(e,i)=>hs(e,i,Ae(i)),xs=(e,{valueAsNumber:i,valueAsDate:r,setValueAs:t})=>F(e)?e:i?e===""?NaN:e&&+e:r&&Q(e)?new Date(e):t?t(e):e;function Oe(e){const i=e.ref;if(!(e.refs?e.refs.every(r=>r.disabled):i.disabled))return Me(i)?i.files:Re(i)?cs(e.refs).value:ds(i)?[...i.selectedOptions].map(({value:r})=>r):xe(i)?us(e.refs).value:xs(F(i.value)?e.ref.value:i.value,e)}var Rs=(e,i,r,t)=>{const a={};for(const n of e){const d=x(i,n);d&&V(a,n,d._f)}return{criteriaMode:r,names:[...e],fields:a,shouldUseNativeValidation:t}},de=e=>F(e)?e:we(e)?e.source:D(e)?we(e.value)?e.value.source:e.value:e,Bs=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function rs(e,i,r){const t=x(e,r);if(t||Ue(r))return{error:t,name:r};const a=r.split(".");for(;a.length;){const n=a.join("."),d=x(i,n),p=x(e,n);if(d&&!Array.isArray(d)&&r!==n)return{name:r};if(p&&p.type)return{name:n,error:p};a.pop()}return{name:r}}var Ps=(e,i,r,t,a)=>a.isOnAll?!1:!r&&a.isOnTouch?!(i||e):(r?t.isOnBlur:a.isOnBlur)?!e:(r?t.isOnChange:a.isOnChange)?e:!0,Is=(e,i)=>!ye(x(e,i)).length&&C(e,i);const qs={mode:H.onSubmit,reValidateMode:H.onChange,shouldFocusError:!0};function $s(e={},i){let r={...qs,...e},t={submitCount:0,isDirty:!1,isLoading:ee(r.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},errors:r.errors||{},disabled:r.disabled||!1},a={},n=D(r.values)||D(r.defaultValues)?I(r.values||r.defaultValues)||{}:{},d=r.shouldUnregister?{}:I(n),p={action:!1,mount:!1,watch:!1},b={mount:new Set,unMount:new Set,array:new Set,watch:new Set},k,O=0;const j={isDirty:!1,dirtyFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},v={values:Le(),array:Le(),state:Le()},B=Ze(r.mode),S=Ze(r.reValidateMode),Y=r.criteriaMode===H.all,se=s=>l=>{clearTimeout(O),O=setTimeout(s,l)},m=async s=>{if(j.isValid||s){const l=r.resolver?$((await W()).errors):await Z(a,!0);l!==t.isValid&&v.state.next({isValid:l})}},g=s=>j.isValidating&&v.state.next({isValidating:s}),R=(s,l=[],o,h,f=!0,c=!0)=>{if(h&&o){if(p.action=!0,c&&Array.isArray(x(a,s))){const y=o(x(a,s),h.argA,h.argB);f&&V(a,s,y)}if(c&&Array.isArray(x(t.errors,s))){const y=o(x(t.errors,s),h.argA,h.argB);f&&V(t.errors,s,y),Is(t.errors,s)}if(j.touchedFields&&c&&Array.isArray(x(t.touchedFields,s))){const y=o(x(t.touchedFields,s),h.argA,h.argB);f&&V(t.touchedFields,s,y)}j.dirtyFields&&(t.dirtyFields=me(n,d)),v.state.next({name:s,isDirty:_(s,l),dirtyFields:t.dirtyFields,errors:t.errors,isValid:t.isValid})}else V(d,s,l)},X=(s,l)=>{V(t.errors,s,l),v.state.next({errors:t.errors})},E=s=>{t.errors=s,v.state.next({errors:t.errors,isValid:!1})},ue=(s,l,o,h)=>{const f=x(a,s);if(f){const c=x(d,s,F(o)?x(n,s):o);F(c)||h&&h.defaultChecked||l?V(d,s,l?c:Oe(f._f)):P(s,c),p.mount&&m()}},le=(s,l,o,h,f)=>{let c=!1,y=!1;const A={name:s},L=!!(x(a,s)&&x(a,s)._f.disabled);if(!o||h){j.isDirty&&(y=t.isDirty,t.isDirty=A.isDirty=_(),c=y!==A.isDirty);const K=L||ie(x(n,s),l);y=!!(!L&&x(t.dirtyFields,s)),K||L?C(t.dirtyFields,s):V(t.dirtyFields,s,!0),A.dirtyFields=t.dirtyFields,c=c||j.dirtyFields&&y!==!K}if(o){const K=x(t.touchedFields,s);K||(V(t.touchedFields,s,o),A.touchedFields=t.touchedFields,c=c||j.touchedFields&&K!==o)}return c&&f&&v.state.next(A),c?A:{}},Ve=(s,l,o,h)=>{const f=x(t.errors,s),c=j.isValid&&J(l)&&t.isValid!==l;if(e.delayError&&o?(k=se(()=>X(s,o)),k(e.delayError)):(clearTimeout(O),k=null,o?V(t.errors,s,o):C(t.errors,s)),(o?!ie(f,o):f)||!$(h)||c){const y={...h,...c&&J(l)?{isValid:l}:{},errors:t.errors,name:s};t={...t,...y},v.state.next(y)}g(!1)},W=async s=>r.resolver(d,r.context,Rs(s||b.mount,a,r.criteriaMode,r.shouldUseNativeValidation)),te=async s=>{const{errors:l}=await W(s);if(s)for(const o of s){const h=x(l,o);h?V(t.errors,o,h):C(t.errors,o)}else t.errors=l;return l},Z=async(s,l,o={valid:!0})=>{for(const h in s){const f=s[h];if(f){const{_f:c,...y}=f;if(c){const A=b.array.has(c.name),L=await ts(f,d,Y,r.shouldUseNativeValidation&&!l,A);if(L[c.name]&&(o.valid=!1,l))break;!l&&(x(L,c.name)?A?Os(t.errors,L,c.name):V(t.errors,c.name,L[c.name]):C(t.errors,c.name))}y&&await Z(y,l,o)}}return o.valid},w=()=>{for(const s of b.unMount){const l=x(a,s);l&&(l._f.refs?l._f.refs.every(o=>!Ce(o)):!Ce(l._f.ref))&&Ne(s)}b.unMount=new Set},_=(s,l)=>(s&&l&&V(d,s,l),!ie(Be(),n)),N=(s,l,o)=>Ls(s,b,{...p.mount?d:F(l)?n:Q(s)?{[s]:l}:l},o,l),M=s=>ye(x(p.mount?d:n,s,e.shouldUnregister?x(n,s,[]):[])),P=(s,l,o={})=>{const h=x(a,s);let f=l;if(h){const c=h._f;c&&(!c.disabled&&V(d,s,xs(l,c)),f=_e(c.ref)&&T(l)?"":l,ds(c.ref)?[...c.ref.options].forEach(y=>y.selected=f.includes(y.value)):c.refs?xe(c.ref)?c.refs.length>1?c.refs.forEach(y=>(!y.defaultChecked||!y.disabled)&&(y.checked=Array.isArray(f)?!!f.find(A=>A===y.value):f===y.value)):c.refs[0]&&(c.refs[0].checked=!!f):c.refs.forEach(y=>y.checked=y.value===f):Me(c.ref)?c.ref.value="":(c.ref.value=f,c.ref.type||v.values.next({name:s,values:{...d}})))}(o.shouldDirty||o.shouldTouch)&&le(s,f,o.shouldTouch,o.shouldDirty,!0),o.shouldValidate&&ke(s)},z=(s,l,o)=>{for(const h in l){const f=l[h],c=`${s}.${h}`,y=x(a,c);(b.array.has(s)||!je(f)||y&&!y._f)&&!oe(f)?z(c,f,o):P(c,f,o)}},re=(s,l,o={})=>{const h=x(a,s),f=b.array.has(s),c=I(l);V(d,s,c),f?(v.array.next({name:s,values:{...d}}),(j.isDirty||j.dirtyFields)&&o.shouldDirty&&v.state.next({name:s,dirtyFields:me(n,d),isDirty:_(s,c)})):h&&!h._f&&!T(c)?z(s,c,o):P(s,c,o),Ge(s,b)&&v.state.next({...t}),v.values.next({name:s,values:{...d}}),!p.mount&&i()},ce=async s=>{const l=s.target;let o=l.name,h=!0;const f=x(a,o),c=()=>l.type?Oe(f._f):Vs(s),y=A=>{h=Number.isNaN(A)||A===x(d,o,A)};if(f){let A,L;const K=c(),ae=s.type===Xe.BLUR||s.type===Xe.FOCUS_OUT,bs=!Bs(f._f)&&!r.resolver&&!x(t.errors,o)&&!f._f.deps||Ps(ae,x(t.touchedFields,o),t.isSubmitted,S,B),Se=Ge(o,b,ae);V(d,o,K),ae?(f._f.onBlur&&f._f.onBlur(s),k&&k(0)):f._f.onChange&&f._f.onChange(s);const De=le(o,K,ae,!1),ps=!$(De)||Se;if(!ae&&v.values.next({name:o,type:s.type,values:{...d}}),bs)return j.isValid&&m(),ps&&v.state.next({name:o,...Se?{}:De});if(!ae&&Se&&v.state.next({...t}),g(!0),r.resolver){const{errors:Ke}=await W([o]);if(y(K),h){const _s=rs(t.errors,a,o),Qe=rs(Ke,a,_s.name||o);A=Qe.error,o=Qe.name,L=$(Ke)}}else A=(await ts(f,d,Y,r.shouldUseNativeValidation))[o],y(K),h&&(A?L=!1:j.isValid&&(L=await Z(a,!0)));h&&(f._f.deps&&ke(f._f.deps),Ve(o,L,A,De))}},ge=(s,l)=>{if(x(t.errors,l)&&s.focus)return s.focus(),1},ke=async(s,l={})=>{let o,h;const f=Ee(s);if(g(!0),r.resolver){const c=await te(F(s)?s:f);o=$(c),h=s?!f.some(y=>x(c,y)):o}else s?(h=(await Promise.all(f.map(async c=>{const y=x(a,c);return await Z(y&&y._f?{[c]:y}:y)}))).every(Boolean),!(!h&&!t.isValid)&&m()):h=o=await Z(a);return v.state.next({...!Q(s)||j.isValid&&o!==t.isValid?{}:{name:s},...r.resolver||!s?{isValid:o}:{},errors:t.errors,isValidating:!1}),l.shouldFocus&&!h&&fe(a,ge,s?f:b.mount),h},Be=s=>{const l={...n,...p.mount?d:{}};return F(s)?l:Q(s)?x(l,s):s.map(o=>x(l,o))},Pe=(s,l)=>({invalid:!!x((l||t).errors,s),isDirty:!!x((l||t).dirtyFields,s),isTouched:!!x((l||t).touchedFields,s),error:x((l||t).errors,s)}),ys=s=>{s&&Ee(s).forEach(l=>C(t.errors,l)),v.state.next({errors:s?t.errors:{}})},Ie=(s,l,o)=>{const h=(x(a,s,{_f:{}})._f||{}).ref;V(t.errors,s,{...l,ref:h}),v.state.next({name:s,errors:t.errors,isValid:!1}),o&&o.shouldFocus&&h&&h.focus&&h.focus()},gs=(s,l)=>ee(s)?v.values.subscribe({next:o=>s(N(void 0,l),o)}):N(s,l,!0),Ne=(s,l={})=>{for(const o of s?Ee(s):b.mount)b.mount.delete(o),b.array.delete(o),l.keepValue||(C(a,o),C(d,o)),!l.keepError&&C(t.errors,o),!l.keepDirty&&C(t.dirtyFields,o),!l.keepTouched&&C(t.touchedFields,o),!r.shouldUnregister&&!l.keepDefaultValue&&C(n,o);v.values.next({values:{...d}}),v.state.next({...t,...l.keepDirty?{isDirty:_()}:{}}),!l.keepIsValid&&m()},qe=({disabled:s,name:l,field:o,fields:h,value:f})=>{if(J(s)){const c=s?void 0:F(f)?Oe(o?o._f:x(h,l)._f):f;V(d,l,c),le(l,c,!1,!1,!0)}},Fe=(s,l={})=>{let o=x(a,s);const h=J(l.disabled);return V(a,s,{...o||{},_f:{...o&&o._f?o._f:{ref:{name:s}},name:s,mount:!0,...l}}),b.mount.add(s),o?qe({field:o,disabled:l.disabled,name:s,value:l.value}):ue(s,!0,l.value),{...h?{disabled:l.disabled}:{},...r.progressive?{required:!!l.required,min:de(l.min),max:de(l.max),minLength:de(l.minLength),maxLength:de(l.maxLength),pattern:de(l.pattern)}:{},name:s,onChange:ce,onBlur:ce,ref:f=>{if(f){Fe(s,l),o=x(a,s);const c=F(f.value)&&f.querySelectorAll&&f.querySelectorAll("input,select,textarea")[0]||f,y=Ms(c),A=o._f.refs||[];if(y?A.find(L=>L===c):c===o._f.ref)return;V(a,s,{_f:{...o._f,...y?{refs:[...A.filter(Ce),c,...Array.isArray(x(n,s))?[{}]:[]],ref:{type:c.type,name:s}}:{ref:c}}}),ue(s,!1,void 0,c)}else o=x(a,s,{}),o._f&&(o._f.mount=!1),(r.shouldUnregister||l.shouldUnregister)&&!(Ns(b.array,s)&&p.action)&&b.unMount.add(s)}}},$e=()=>r.shouldFocusError&&fe(a,ge,b.mount),ms=s=>{J(s)&&(v.state.next({disabled:s}),fe(a,(l,o)=>{let h=s;const f=x(a,o);f&&J(f._f.disabled)&&(h||(h=f._f.disabled)),l.disabled=h},0,!1))},He=(s,l)=>async o=>{let h;o&&(o.preventDefault&&o.preventDefault(),o.persist&&o.persist());let f=I(d);if(v.state.next({isSubmitting:!0}),r.resolver){const{errors:c,values:y}=await W();t.errors=c,f=y}else await Z(a);if(C(t.errors,"root"),$(t.errors)){v.state.next({errors:{}});try{await s(f,o)}catch(c){h=c}}else l&&await l({...t.errors},o),$e(),setTimeout($e);if(v.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:$(t.errors)&&!h,submitCount:t.submitCount+1,errors:t.errors}),h)throw h},vs=(s,l={})=>{x(a,s)&&(F(l.defaultValue)?re(s,I(x(n,s))):(re(s,l.defaultValue),V(n,s,I(l.defaultValue))),l.keepTouched||C(t.touchedFields,s),l.keepDirty||(C(t.dirtyFields,s),t.isDirty=l.defaultValue?_(s,I(x(n,s))):_()),l.keepError||(C(t.errors,s),j.isValid&&m()),v.state.next({...t}))},We=(s,l={})=>{const o=s?I(s):n,h=I(o),f=s&&!$(s)?h:n;if(l.keepDefaultValues||(n=o),!l.keepValues){if(l.keepDirtyValues)for(const c of b.mount)x(t.dirtyFields,c)?V(f,c,x(d,c)):re(c,x(f,c));else{if(Te&&F(s))for(const c of b.mount){const y=x(a,c);if(y&&y._f){const A=Array.isArray(y._f.refs)?y._f.refs[0]:y._f.ref;if(_e(A)){const L=A.closest("form");if(L){L.reset();break}}}}a={}}d=e.shouldUnregister?l.keepDefaultValues?I(n):{}:I(f),v.array.next({values:{...f}}),v.values.next({values:{...f}})}b={mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},!p.mount&&i(),p.mount=!j.isValid||!!l.keepIsValid||!!l.keepDirtyValues,p.watch=!!e.shouldUnregister,v.state.next({submitCount:l.keepSubmitCount?t.submitCount:0,isDirty:l.keepDirty?t.isDirty:!!(l.keepDefaultValues&&!ie(s,n)),isSubmitted:l.keepIsSubmitted?t.isSubmitted:!1,dirtyFields:l.keepDirtyValues?l.keepDefaultValues&&d?me(n,d):t.dirtyFields:l.keepDefaultValues&&s?me(n,s):{},touchedFields:l.keepTouched?t.touchedFields:{},errors:l.keepErrors?t.errors:{},isSubmitSuccessful:l.keepIsSubmitSuccessful?t.isSubmitSuccessful:!1,isSubmitting:!1})},ze=(s,l)=>We(ee(s)?s(d):s,l);return{control:{register:Fe,unregister:Ne,getFieldState:Pe,handleSubmit:He,setError:Ie,_executeSchema:W,_getWatch:N,_getDirty:_,_updateValid:m,_removeUnmounted:w,_updateFieldArray:R,_updateDisabledField:qe,_getFieldArray:M,_reset:We,_resetDefaultValues:()=>ee(r.defaultValues)&&r.defaultValues().then(s=>{ze(s,r.resetOptions),v.state.next({isLoading:!1})}),_updateFormState:s=>{t={...t,...s}},_disableForm:ms,_subjects:v,_proxyFormState:j,_setErrors:E,get _fields(){return a},get _formValues(){return d},get _state(){return p},set _state(s){p=s},get _defaultValues(){return n},get _names(){return b},set _names(s){b=s},get _formState(){return t},set _formState(s){t=s},get _options(){return r},set _options(s){r={...r,...s}}},trigger:ke,register:Fe,handleSubmit:He,watch:gs,setValue:re,getValues:Be,reset:ze,resetField:vs,clearErrors:ys,unregister:Ne,setError:Ie,setFocus:(s,l={})=>{const o=x(a,s),h=o&&o._f;if(h){const f=h.refs?h.refs[0]:h.ref;f.focus&&(f.focus(),l.shouldSelect&&f.select())}},getFieldState:Pe}}function Hs(e={}){const i=q.useRef(),r=q.useRef(),[t,a]=q.useState({isDirty:!1,isValidating:!1,isLoading:ee(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},errors:e.errors||{},disabled:e.disabled||!1,defaultValues:ee(e.defaultValues)?void 0:e.defaultValues});i.current||(i.current={...$s(e,()=>a(d=>({...d}))),formState:t});const n=i.current.control;return n._options=e,Es({subject:n._subjects.state,next:d=>{Ds(d,n._proxyFormState,n._updateFormState,!0)&&a({...n._formState})}}),q.useEffect(()=>n._disableForm(e.disabled),[n,e.disabled]),q.useEffect(()=>{if(n._proxyFormState.isDirty){const d=n._getDirty();d!==t.isDirty&&n._subjects.state.next({isDirty:d})}},[n,t.isDirty]),q.useEffect(()=>{e.values&&!ie(e.values,r.current)?(n._reset(e.values,n._options.resetOptions),r.current=e.values,a(d=>({...d}))):n._resetDefaultValues()},[e.values,n]),q.useEffect(()=>{e.errors&&n._setErrors(e.errors)},[e.errors,n]),q.useEffect(()=>{n._state.mount||(n._updateValid(),n._state.mount=!0),n._state.watch&&(n._state.watch=!1,n._subjects.state.next({...n._formState})),n._removeUnmounted()}),q.useEffect(()=>{e.shouldUnregister&&n._subjects.values.next({values:n._getWatch()})},[e.shouldUnregister,n]),i.current.formState=Ss(t,n),i.current}const Ws=()=>{const[e,i]=U.useState(!1),[r,t]=U.useState(!1),{register:a,handleSubmit:n,errors:d}=Hs(),p=b=>{console.log(b),t(!0),be.post(`${pe}/pick-pack/create/user`,{name:b.name,last_name:b.last_name,email:b.email,password:b.password}).then(k=>{console.log(k),he.success("Usuario creado exitosamente"),i(!1)}).catch(k=>{console.log(k),he.error("Ups algo salio mal, intenta de nuevo")}).finally(()=>t(!1))};return u.jsxs("div",{className:"",children:[u.jsx("div",{className:"fixed bottom-2 left-2 z-30",children:u.jsx("div",{onClick:()=>i(!e),className:"bg-blue-500 py-2 px-3 rounded-lg cursor-pointer",children:u.jsx("svg",{className:"w-8 h-8 text-white",viewBox:"0 0 640 512",fill:"currentColor",height:"1em",width:"1em",children:u.jsx("path",{d:"M352 128c0 70.7-57.3 128-128 128S96 198.7 96 128 153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4c98.5 0 178.3 79.8 178.3 178.3 0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312v-64h-64c-13.3 0-24-10.7-24-24s10.7-24 24-24h64v-64c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24h-64v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"})})})}),u.jsx(is,{isOpen:e,setIsOpen:i,children:u.jsxs("div",{className:"p-7",children:[u.jsx("div",{className:"text-center font-semibold text-xl",children:"Agregar Picker"}),u.jsxs("form",{onSubmit:n(p),className:"",children:[u.jsxs("label",{className:"form-control w-full max-w-xs",children:[u.jsx("div",{className:"label",children:u.jsx("span",{className:"label-text font-semibold",children:"Nombre(s):"})}),u.jsx("input",{...a("name",{required:!0}),type:"text",placeholder:`Elsa Porrico\r
\r
              `,className:"input input-bordered w-full max-w-xs"})]})," ",u.jsxs("label",{className:"form-control w-full max-w-xs",children:[u.jsx("div",{className:"label",children:u.jsx("span",{className:"label-text font-semibold",children:"Apellidos:"})}),u.jsx("input",{...a("last_name",{required:!0}),type:"text",placeholder:`Elsa Porrico\r
\r
              `,className:"input input-bordered w-full max-w-xs"})]}),u.jsxs("label",{className:"form-control w-full max-w-xs",children:[u.jsx("div",{className:"label",children:u.jsx("span",{className:"label-text font-semibold",children:"Correo electronico:"})}),u.jsx("input",{...a("email",{required:!0}),type:"text",placeholder:"@example.com",className:"input input-bordered w-full max-w-xs"})]}),u.jsxs("label",{className:"form-control w-full max-w-xs",children:[u.jsx("div",{className:"label",children:u.jsx("span",{className:"label-text font-semibold",children:"Contraseña:"})}),u.jsx("input",{...a("password",{required:!0}),type:"text",placeholder:"********",className:"input input-bordered w-full max-w-xs"})]}),u.jsx("div",{className:"text-center mt-4",children:r?u.jsx("span",{className:"loading loading-spinner text-info"}):u.jsx("button",{type:"submit",className:"euro-btn w-3/4",children:"Enviar"})})]})]})})]})},zs=()=>{const[e,i]=U.useState(!1),[r,t]=U.useState({}),[a,n]=U.useState([]),{fulFillmentUsers:d,setFulFillmentUsers:p}=ls(),[b,k]=U.useState([]),[O,j]=U.useState([]);function v(m){i(!0),t(m)}const B=m=>{if(m===3)return"Listo para manejo";if(m===4)return"Surtiendo";if(m===5)return"Surtido";if(m===6)return"Empacando";if(m===7)return"Empacado"};function S(){n(!0),be.get(`${pe}/pick-pack/orders_status`,{params:{status:[3,4,5,6,7]}}).then(m=>{console.log(m.data),k(m.data.ordersList),j(m.data.ordersList)}).catch(m=>{console.log(m),he.error("Ocurrio un error al intentar obtener las ordenes ")}).finally(()=>n(!1))}function Y(m){const g=b.find(R=>R.idVtex_order===m);console.log(g),j(g?[g]:b)}function se(){be.get(`${pe}/pick-pack/fulfillment/users`).then(m=>{p(m.data)}).catch(m=>{console.log(m)})}return U.useEffect(()=>{S(),se()},[]),u.jsxs("div",{className:"",children:[u.jsx(Ws,{}),u.jsx("div",{className:"sticky top-20 bg-white z-20",children:u.jsx(as,{onHandleQuery:Y,placeHolderValue:"Busca una orden"})}),u.jsx("div",{className:"overflow-x-auto ",children:u.jsxs("table",{className:"table  text-center table-pin-rows table-sm table-zebra",children:[u.jsx("thead",{children:u.jsxs("tr",{className:"",children:[u.jsx("th",{className:"",children:"Orden"}),u.jsx("th",{children:"Estatus"}),u.jsx("th",{children:"Asignar"})]})}),u.jsx("tbody",{children:O.map((m,g)=>u.jsxs("tr",{children:[u.jsx("td",{children:m.idVtex_order}),u.jsx("td",{className:"",children:u.jsx("span",{className:"badge",children:B(m.status2_order)})}),u.jsx("td",{children:u.jsx("div",{className:"btn btn-sm",onClick:()=>{v(m)},children:u.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",height:"1em",width:"1em",className:"w-7 h-7",children:u.jsx("path",{d:"M21.7 13.35l-1 1-2.05-2.05 1-1a.55.55 0 01.77 0l1.28 1.28c.21.21.21.56 0 .77M12 18.94l6.06-6.06 2.05 2.05L14.06 21H12v-2.06M12 14c-4.42 0-8 1.79-8 4v2h6v-1.89l4-4c-.66-.08-1.33-.11-2-.11m0-10a4 4 0 00-4 4 4 4 0 004 4 4 4 0 004-4 4 4 0 00-4-4z"})})})})]},g))})]})}),a&&u.jsx("div",{className:"text-center mt-10",children:u.jsx("span",{className:"loading loading-dots loading-lg"})}),u.jsx(As,{opening:e,rowSelected:r,changeState:i})]})},et=()=>u.jsx(ws,{children:u.jsx(zs,{})});export{et as default};
