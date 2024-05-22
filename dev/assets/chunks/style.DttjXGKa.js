import{d as c,a3 as u,a5 as v,o as n,c as o,r as d,j as b,F as T,E as p,n as h,P as g,a as k,t as y}from"./framework.DOrQYd6A.js";const f=(t,e)=>{const s=t.__vccOpts||t;for(const[a,r]of e)s[a]=r;return s},$=c({name:"Tab",props:{title:{type:String,default:"Tab"},active:{type:Boolean,default:!1},hidden:{type:Boolean,default:!1}},data(){return{isActive:!1}},mounted(){this.isActive=this.active,this.$parent.registerTab(this)},unmounted(){this.$parent.unregisterTab(this)}});function j(t,e,s,a,r,m){return u((n(),o("div",null,[d(t.$slots,"default")],512)),[[v,t.isActive]])}const I=f($,[["render",j]]),x=c({name:"Tabs",props:{modelValue:{type:Number,default:null},activeColor:{type:String,default:"red"},fill:{type:Boolean,default:!1},fillMinWidth:{type:String,default:"0"},borders:{type:[Boolean,String],default:!1},size:{type:String,default:null}},emits:["update:modelValue","change"],data(){return{activeTab:null,activeTabIndex:0,tabs:[]}},computed:{_size(){return["sm","md","lg"].includes(this.size)?this.size:"md"},rootClasses(){let t="jskos-vue-tabs-border-",e={"jskos-vue-tabs":!0,[`jskos-vue-tabs-${this._size}`]:!0};if(this.borders===!1)return e;if(this.borders===!0)return e[`${t}all`]=!0,e;for(let s of["top","right","bottom","left"])this.borders.includes(s)&&(e[`${t}${s}`]=!0);return e},hiddenTabs(){return this.tabs.map(t=>t.hidden)}},watch:{tabs(t){let e=t.findIndex(s=>this.activeTab==s);e=e==-1?this.modelValue!==null?this.modelValue:this.activeTabIndex:e,this.activateTab(e)},modelValue(t){this.activateTab(t)},hiddenTabs(){this.activateTab(this.activeTabIndex)}},methods:{registerTab(t){const e=Array.from(this.$refs.tabs.children).indexOf(t.$el);this.tabs=[...this.tabs.slice(0,e),t,...this.tabs.slice(e)],t.isActive&&this.activateTab(e)},unregisterTab(t){this.tabs=this.tabs.filter(e=>e!=t)},activateTab(t){if(this.tabs.length>0){t>=this.tabs.length&&(t=this.tabs.length-1);let e=0;for(;t-e>=0||t+e<this.hiddenTabs.length;){if(this.hiddenTabs[t+e]===!1){t=t+e;break}if(this.hiddenTabs[t-e]===!1){t=t-e;break}e+=1}for(let a of this.tabs)a.isActive=!1;let s=this.tabs[t];s.isActive=!0,(this.activeTab!=s||this.activeTabIndex!=t)&&(this.activeTab=s,this.activeTabIndex=t,this.$emit("update:modelValue",t),this.$emit("change",{index:t,tab:s}))}}}}),A={class:"jskos-vue-tabs-header"},S=["onClick"],C={ref:"tabs",class:"jskos-vue-tabs-content"};function V(t,e,s,a,r,m){return n(),o("div",{ref:"root",class:h(t.rootClasses)},[b("div",A,[(n(!0),o(T,null,p(t.tabs,(i,l)=>u((n(),o("div",{key:`jskos-vue-tabs-${l}`,class:h(["jskos-vue-tabs-header-item",{"jskos-vue-tabs-header-item-active":i.isActive,"jskos-vue-tabs-header-item-inactive":!i.isActive,"jskos-vue-tabs-header-item-fill":t.fill}]),style:g({"flex-basis":t.fill?t.fillMinWidth:"auto","border-bottom-color":t.activeColor}),onClick:z=>t.activateTab(l)},[d(t.$slots,"title",{tab:i,index:l},()=>[k(y(i.title),1)],!0)],14,S)),[[v,!t.hiddenTabs[l]]])),128))]),b("div",C,[d(t.$slots,"default",{},void 0,!0)],512)],2)}const _=f(x,[["render",V],["__scopeId","data-v-65d359a5"]]);export{_ as b,I as u};
