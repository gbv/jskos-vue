import{l as t,M as e,m as a,u as s,o as i,c as l,d as o,N as n,s as c,t as r,i as v,_ as d,O as f,P as u,F as m,v as k,q as p,b as h,r as y}from"./app.d57fb543.js";f("data-v-0cb9fda2");const g={key:0,class:"home-hero"},x={key:0,class:"figure"},_=["src","alt"],I={key:1,id:"main-title",class:"title"},T={key:2,class:"description"};u();var b=t({setup(t){const{site:f,frontmatter:u}=e(),m=a((()=>{const{heroImage:t,heroText:e,tagline:a,actionLink:s,actionText:i}=u.value;return t||e||a||s&&i})),k=a((()=>u.value.heroText||f.value.title));return(t,e)=>s(m)?(i(),l("header",g,[s(u).heroImage?(i(),l("figure",x,[o("img",{class:"image",src:s(n)(s(u).heroImage),alt:s(u).heroAlt},null,8,_)])):c("v-if",!0),s(k)?(i(),l("h1",I,r(s(k)),1)):c("v-if",!0),s(u).tagline?(i(),l("p",T,r(s(u).tagline),1)):c("v-if",!0),s(u).actionLink&&s(u).actionText?(i(),v(d,{key:3,item:{link:s(u).actionLink,text:s(u).actionText},class:"action"},null,8,["item"])):c("v-if",!0),s(u).altActionLink&&s(u).altActionText?(i(),v(d,{key:4,item:{link:s(u).altActionLink,text:s(u).altActionText},class:"action alt"},null,8,["item"])):c("v-if",!0)])):c("v-if",!0)}});b.__scopeId="data-v-0cb9fda2",f("data-v-e39c13e0");const A={key:0,class:"home-features"},L={class:"wrapper"},$={class:"container"},j={class:"features"},q={key:0,class:"title"},w={key:1,class:"details"};u();var C=t({setup(t){const{frontmatter:n}=e(),v=a((()=>n.value.features&&n.value.features.length>0)),d=a((()=>n.value.features?n.value.features:[]));return(t,e)=>s(v)?(i(),l("div",A,[o("div",L,[o("div",$,[o("div",j,[(i(!0),l(m,null,k(s(d),((t,e)=>(i(),l("section",{key:e,class:"feature"},[t.title?(i(),l("h2",q,r(t.title),1)):c("v-if",!0),t.details?(i(),l("p",w,r(t.details),1)):c("v-if",!0)])))),128))])])])])):c("v-if",!0)}});C.__scopeId="data-v-e39c13e0",f("data-v-30918238");const F={key:0,class:"footer"},M={class:"container"},N={class:"text"};u();var O=t({setup(t){const{frontmatter:a}=e();return(t,e)=>s(a).footer?(i(),l("footer",F,[o("div",M,[o("p",N,r(s(a).footer),1)])])):c("v-if",!0)}});O.__scopeId="data-v-30918238",f("data-v-32eddf2f");const P={class:"home","aria-labelledby":"main-title"},z={class:"home-content"};u();var B=t({setup:t=>(t,e)=>{const a=p("Content");return i(),l("main",P,[h(b),y(t.$slots,"hero",{},void 0,!0),h(C),o("div",z,[h(a)]),y(t.$slots,"features",{},void 0,!0),h(O),y(t.$slots,"footer",{},void 0,!0)])}});B.__scopeId="data-v-32eddf2f";export{B as default};