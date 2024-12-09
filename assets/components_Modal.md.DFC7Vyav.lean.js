import{_ as F,d as C,o as g,b as D,I as n,w as t,c as b,j as s,r as u,M as q,e as v,T as f,a6 as A,a7 as B,s as d,h as _,a1 as c,a as r,k as o}from"./chunks/framework.CXbGQEsj.js";import"./chunks/shared.l0sNRNKZ.js";import{b as S,u as E}from"./chunks/style.-xXEQWSy.js";const P=C({name:"Modal",inheritAttrs:!1,props:{modelValue:{type:Boolean,required:!1,default:void 0}},emits:["update:modelValue"],setup(a,{emit:e}){B(()=>{const l="jskos-vue-modal-area";if(!document.getElementById(l)){const i=document.createElement("div");i.id=l,document.body.appendChild(i)}});const h=d(!1),p=_({get(){return a.modelValue===void 0?h.value:a.modelValue},set(l){h.value=l,e("update:modelValue",l)}});return{shown:p,show(){p.value=!0},hide(){p.value=!1}}}}),w={class:"jskos-vue-modal-dialog"},M={class:"jskos-vue-modal-header"},T=s("h1",null,null,-1),V={class:"jskos-vue-modal-body"},x={class:"jskos-vue-modal-footer"};function j(a,e,h,p,l,m){return g(),D(A,{to:"#jskos-vue-modal-area"},[n(f,{name:"fade"},{default:t(()=>[a.shown?(g(),b("div",q({key:0,class:"jskos-vue-modal"},a.$attrs),[s("div",w,[s("header",M,[u(a.$slots,"header",{},()=>[T]),s("button",{type:"button","aria-label":"Close",onClick:e[0]||(e[0]=i=>a.shown=!1)}," × ")]),s("div",V,[u(a.$slots,"default")]),s("footer",x,[u(a.$slots,"footer")])]),s("div",{class:"jskos-vue-modal-backdrop",onClick:e[1]||(e[1]=i=>a.shown=!1)})],16)):v("",!0)]),_:3})])}const y=F(P,[["render",j]]),N=c("",14),I=s("h1",null,"Test Header",-1),L=s("div",{style:{padding:"10px"}},"Test Content",-1),H=c("",2),$=s("h1",null,"Test Header",-1),W=s("p",null,[r('Because the "Tabs" component changes dimensions with the tab content, we fixate '),s("code",null,"minWidth"),r(" and "),s("code",null,"minHeight"),r(" via CSS variables.")],-1),z=s("p",null,"Nothing to see here.",-1),U=s("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",-1),R=s("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",-1),O=s("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",-1),J=s("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",-1),G=s("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",-1),K=s("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",-1),Q=s("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",-1),X=s("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",-1),Y=s("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",-1),Z=s("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",-1),ss=c("",1),ls=JSON.parse('{"title":"Modal","description":"","frontmatter":{},"headers":[],"relativePath":"components/Modal.md","filePath":"components/Modal.md"}'),is={name:"components/Modal.md"},ns=Object.assign(is,{setup(a){const e=d(!1),h=d(),p=()=>{h.value.show()},l=d(!1);return(m,i)=>(g(),b("div",null,[N,s("p",null,[s("button",{onClick:i[0]||(i[0]=k=>e.value=!0)},"Show Modal via v-model value"),s("button",{onClick:p},"Show Modal via method")]),n(y,{modelValue:e.value,"onUpdate:modelValue":i[1]||(i[1]=k=>e.value=k),ref_key:"testModal",ref:h},{header:t(()=>[I]),footer:t(()=>[r("Test Footer")]),default:t(()=>[L]),_:1},8,["modelValue"]),H,s("p",null,[s("button",{onClick:i[2]||(i[2]=k=>l.value=!0)},"Show Modal")]),n(y,{modelValue:l.value,"onUpdate:modelValue":i[3]||(i[3]=k=>l.value=k),style:{"--jskos-vue-modal-minWidth":"var(--jskos-vue-modal-maxWidth)","--jskos-vue-modal-minHeight":"var(--jskos-vue-modal-maxHeight)"}},{header:t(()=>[$]),footer:t(()=>[r("Test Footer")]),default:t(()=>[n(o(S),{style:{position:"absolute",top:"0",left:"0",right:"0",bottom:"0"}},{default:t(()=>[n(o(E),{title:"Tab 1"},{default:t(()=>[W]),_:1}),n(o(E),{title:"Tab 2 with long title"},{default:t(()=>[z]),_:1}),n(o(E),{title:"Tab 3 with longer title and scrolling content"},{default:t(()=>[U,R,O,J,G,K,Q,X,Y,Z]),_:1})]),_:1})]),_:1},8,["modelValue"]),ss]))}});export{ls as __pageData,ns as default};