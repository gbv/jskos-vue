import{e,J as t,j as a,u as s,o as i,c as o,b as l,K as c,s as n,t as r,L as v,p as f,m as d,F as u,B as p,q as m,r as k}from"./app.8613c751.js";f("data-v-0cb9fda2");const h={key:0,class:"home-hero"},x={key:0,class:"figure"},y={key:1,id:"main-title",class:"title"},g={key:2,class:"description"};d();var _=e({expose:[],setup(e){const{site:f,frontmatter:d}=t(),u=a((()=>{const{heroImage:e,heroText:t,tagline:a,actionLink:s,actionText:i}=d.value;return e||t||a||s&&i})),p=a((()=>d.value.heroText||f.value.title));return(e,t)=>s(u)?(i(),o("header",h,[s(d).heroImage?(i(),o("figure",x,[l("img",{class:"image",src:s(c)(s(d).heroImage),alt:s(d).heroAlt},null,8,["src","alt"])])):n("v-if",!0),s(p)?(i(),o("h1",y,r(s(p)),1)):n("v-if",!0),s(d).tagline?(i(),o("p",g,r(s(d).tagline),1)):n("v-if",!0),s(d).actionLink&&s(d).actionText?(i(),o(v,{key:3,item:{link:s(d).actionLink,text:s(d).actionText},class:"action"},null,8,["item"])):n("v-if",!0),s(d).altActionLink&&s(d).altActionText?(i(),o(v,{key:4,item:{link:s(d).altActionLink,text:s(d).altActionText},class:"action alt"},null,8,["item"])):n("v-if",!0)])):n("v-if",!0)}});_.__scopeId="data-v-0cb9fda2",f("data-v-e39c13e0");const I={key:0,class:"home-features"},T={class:"wrapper"},L={class:"container"},b={class:"features"},A={key:0,class:"title"},$={key:1,class:"details"};d();var j=e({expose:[],setup(e){const{frontmatter:c}=t(),v=a((()=>c.value.features&&c.value.features.length>0)),f=a((()=>c.value.features?c.value.features:[]));return(e,t)=>s(v)?(i(),o("div",I,[l("div",T,[l("div",L,[l("div",b,[(i(!0),o(u,null,p(s(f),((e,t)=>(i(),o("section",{key:t,class:"feature"},[e.title?(i(),o("h2",A,r(e.title),1)):n("v-if",!0),e.details?(i(),o("p",$,r(e.details),1)):n("v-if",!0)])))),128))])])])])):n("v-if",!0)}});j.__scopeId="data-v-e39c13e0",f("data-v-30918238");const q={key:0,class:"footer"},w={class:"container"},B={class:"text"};d();var C=e({expose:[],setup(e){const{frontmatter:a}=t();return(e,t)=>s(a).footer?(i(),o("footer",q,[l("div",w,[l("p",B,r(s(a).footer),1)])])):n("v-if",!0)}});C.__scopeId="data-v-30918238",f("data-v-32eddf2f");const F={class:"home","aria-labelledby":"main-title"},J={class:"home-content"};d();var K=e({expose:[],setup:e=>(e,t)=>{const a=m("Content");return i(),o("main",F,[l(_),k(e.$slots,"hero",{},void 0,!0),l(j),l("div",J,[l(a)]),k(e.$slots,"features",{},void 0,!0),l(C),k(e.$slots,"footer",{},void 0,!0)])}});K.__scopeId="data-v-32eddf2f";export default K;
