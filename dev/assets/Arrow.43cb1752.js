import{e as r,o as e,c as a,b as o}from"./app.d6ab46c4.js";import"./shared.99084317.js";const s=r({name:"Arrow",props:{direction:{type:String,required:!0,validator:r=>["up","down","left","right"].includes(r)},clickable:{type:Boolean,default:!1}}});s.render=function(r,s,i,c,l,t){return e(),a("div",{class:{"jskos-vue-arrow":!0,"jskos-vue-arrow-clickable":r.clickable}},[o("div",{class:`jskos-vue-arrow-${r.direction}`},null,2)],2)};export{s as _};
