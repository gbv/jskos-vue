import{l as s,m as i,o as e,c as o,y as r}from"./app.d57fb543.js";import"./shared.99084317.js";const a=s({name:"LoadingIndicator",props:{size:{type:String,default:"md"}},setup:s=>({sizePixels:i((()=>({sm:9,md:15,lg:21,xl:27}[s.size])))})});a.render=function(s,i,a,d,l,t){return e(),o("div",{style:r({border:s.sizePixels/3+"px solid var(--jskos-vue-loadingIndicator-primary-color)","border-top":s.sizePixels/3+"px solid var(--jskos-vue-loadingIndicator-secondary-color)",width:`${s.sizePixels}px`,height:`${s.sizePixels}px`}),class:"jskos-vue-loadingIndicator"},null,4)};export{a as _};
