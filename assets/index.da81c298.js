var k=Object.defineProperty;var S=Object.getOwnPropertySymbols;var E=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable;var y=(t,e,o)=>e in t?k(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,p=(t,e)=>{for(var o in e||(e={}))E.call(e,o)&&y(t,o,e[o]);if(S)for(var o of S(e))N.call(e,o)&&y(t,o,e[o]);return t};import{j as v,r as l,e as w,f as h,v as L,n as O,R as F}from"./vendor.60517cc2.js";const T=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}};T();const c=v.exports.jsx,f=v.exports.jsxs,j=v.exports.Fragment,b="dekadeka:settings",x={isBold:!1,textColor:"#000000",bgColor:"#ffffff"};function I(){try{const t=localStorage.getItem(b);return t?p(p({},x),JSON.parse(t)):x}catch{return x}}const C=l.exports.createContext([x,()=>{}]),W=({children:t})=>{const[e,o]=l.exports.useState(()=>I()),s=l.exports.useCallback(n=>{const r=p(p({},e),n);o(r),localStorage.setItem(b,JSON.stringify(r))},[e]);return c(C.Provider,{value:[e,s],children:t})},m=()=>l.exports.useContext(C);function B(t){const[e,o]=l.exports.useState(null),[s]=m();l.exports.useEffect(()=>(o(w(t.current)),()=>{e&&e.unsubscribe()}),[]),l.exports.useEffect(()=>{e==null||e.fit()},[s])}const R="dekadeka:banner-text";function P(t){return l.exports.useLayoutEffect(()=>{try{const s=localStorage.getItem(R);t.current&&(t.current.textContent=s||"Hello, world!")}catch{}},[]),{onChangeText:l.exports.useCallback(()=>{t.current&&localStorage.setItem(R,o(t.current))},[])};function o(s){const[,n]=r(s);return n;function r(i){if(i.nodeType===Node.TEXT_NODE)return[!1,i.textContent];let d="";for(let u=0;u<i.childNodes.length;u++){const[a,g]=r(i.childNodes[u]);d+=`${u>0&&a?`
`:""}${g}`}return[i.nodeName.toLowerCase()==="div",d]}}}const A=({onFocus:t})=>{const e=l.exports.useRef(null);B(e);const{onChangeText:o}=P(e),[{isBold:s,textColor:n,bgColor:r}]=m();return l.exports.useEffect(()=>{document.body.style.backgroundColor=r},[r]),c("div",{className:`banner ${s?"bold":""}`,style:{color:n},children:c("div",{ref:e,contentEditable:!0,onKeyUp:o,onFocus:t,spellCheck:!1})})},_=({})=>{const[{isBold:t,bgColor:e,textColor:o},s]=m();return f("div",{className:"settings",children:[c("h1",{children:"Settings"}),c("div",{className:"options",children:f("label",{children:[c("input",{name:"bold",type:"checkbox",checked:t,onChange:n=>s({isBold:n.currentTarget.checked})})," Bold"]})}),c("div",{className:"options",children:f("label",{children:[c("input",{type:"color",name:"textColor",value:o,onChange:n=>s({textColor:n.currentTarget.value})})," Text"]})}),c("div",{className:"options",children:f("label",{children:[c("input",{type:"color",name:"bgColor",value:e,onChange:n=>s({bgColor:n.currentTarget.value})})," Background"]})})]})};function K(){const[t,e]=l.exports.useState(!1);l.exports.useEffect(()=>{h.addEventListener("fullscreenchange",()=>{e(!!h.fullscreenElement)})},[]);const o=l.exports.useCallback(()=>{h.exitFullscreen()},[]),s=l.exports.useCallback(()=>{document.body.focus(),t||h.requestFullscreen(document.body)},[]);return{isFullScreen:t,enterFullScreen:s,exitFullScreen:o}}const $=()=>{const[t,e]=l.exports.useState("viewing"),{isFullScreen:o,enterFullScreen:s,exitFullScreen:n}=K();return l.exports.useEffect(()=>{const r=i=>{i.target.classList.contains("banner")&&e("viewing")};return document.body.addEventListener("click",r),()=>document.body.removeEventListener("click",r)},[]),f(j,{children:[t!="viewing"&&f("div",{className:"control",children:[o&&h.fullscreenEnabled&&c("button",{onClick:n,children:"Exit fullsreen"}),c("button",{onClick:()=>{e("viewing"),s()},children:"View"}),c("button",{onClick:()=>{console.log("onclick setting"),e("setting")},children:"Settings"})]}),c(A,{onFocus:()=>{e("editing")}}),t==="setting"&&c(_,{onClose:()=>e("viewing")})]})};function G(t={}){const{immediate:e=!1,onNeedRefresh:o,onOfflineReady:s,onRegistered:n,onRegisterError:r}=t;let i,d;const u=async(a=!0)=>{a&&(i==null||i.addEventListener("controlling",g=>{g.isUpdate&&window.location.reload()})),d&&d.waiting&&await O(d.waiting,{type:"SKIP_WAITING"})};if("serviceWorker"in navigator){i=new L("/dekadeka/sw.js",{scope:"/dekadeka/"}),i.addEventListener("activated",a=>{a.isUpdate||s==null||s()});{const a=()=>{o==null||o()};i.addEventListener("waiting",a),i.addEventListener("externalwaiting",a)}i.register({immediate:e}).then(a=>{d=a,n==null||n(a)}).catch(a=>{r==null||r(a)})}return u}function M(t={}){const{immediate:e=!0,onNeedRefresh:o,onOfflineReady:s,onRegistered:n,onRegisterError:r}=t,[i,d]=l.exports.useState(!1),[u,a]=l.exports.useState(!1),g=G({immediate:e,onOfflineReady(){a(!0),s==null||s()},onNeedRefresh(){d(!0),o==null||o()},onRegistered:n,onRegisterError:r});return{needRefresh:[i,d],offlineReady:[u,a],updateServiceWorker:g}}const U=()=>{const{offlineReady:[t,e],needRefresh:[o,s],updateServiceWorker:n}=M({onRegistered(r){console.log("SW Registered: "+r)},onRegisterError(r){console.log("SW registration error",r)},onNeedRefresh(){confirm("Newer version is available. Refresh to update?")&&n(!0)},onOfflineReady(){console.log("offline ready")}});return c(W,{children:c($,{})})};F.render(c(U,{}),document.getElementById("main"));
