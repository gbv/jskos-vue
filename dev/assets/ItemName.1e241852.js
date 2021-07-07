import{g as e,e as a,l as t,o,c as l,p as s,d as n,t as i,F as r,j as p,w as c}from"./app.d85636fc.js";import"./shared.ae523b09.js";const b=e({label:[],processLabel(e,a){for(let t of this.label)e=t(e,a);return e},notation:[],processNotation(e,a){for(let t of this.notation)e=t(e,a);return e}}),u=a({name:"ItemName",props:{item:{type:Object,required:!0},showNotation:{type:Boolean,default:!0},showLabel:{type:Boolean,default:!0},fallbackLabel:{type:String,default:"???"},language:{type:String,default:""},clickable:{type:Boolean,default:!1}},setup(e){const a=t((()=>e.showNotation?b.processNotation(p.exports.notation(e.item),e):"")),o=t((()=>e.showLabel?b.processLabel(p.exports.prefLabel(e.item,{fallbackToUri:!a.value,language:e.language||p.exports.languagePreference.selectLanguage(e.item.prefLabel)}),e):""));return{notation:a,label:o}}});u.addLabelPlugin=e=>{b.label.push(e)},u.addNotationPlugin=e=>{b.notation.push(e)};const f=u,d=c()(((e,a,t,p,c,b)=>(o(),l("span",{class:{"jskos-vue-itemName":!0,clickable:e.clickable}},[e.showNotation||""===e.label?(o(),l("span",{key:0,class:"jskos-vue-itemName-notation",innerHTML:e.notation},null,8,["innerHTML"])):s("v-if",!0),n(" "+i(e.label)+" ",1),""===e.notation&&""===e.label?(o(),l(r,{key:1},[n(i(e.fallbackLabel),1)],2112)):s("v-if",!0)],2))));f.render=d,f.__scopeId="data-v-28cc3d02";export{f as _};
