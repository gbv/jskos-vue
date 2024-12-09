import{v as K,x as G,p as N,h as X}from"./framework.BdF1Eaaz.js";function y(e,u,t){const r=Array.prototype.slice,n=typeof Object.keys=="function"?Object.keys:function(l){const s=[];for(const p in l)s.push(p);return s},i=function(l,s){return l===s?!0:l instanceof Date&&s instanceof Date?l.getTime()===s.getTime():typeof l!="object"&&typeof s!="object"?l==s:o(l,s)};function a(l){return l==null}function c(l){return Object.prototype.toString.call(l)=="[object Arguments]"}function o(l,s){if(a(l)||a(s)||l.prototype!==s.prototype)return!1;if(c(l))return c(s)?(l=r.call(l),s=r.call(s),i(l,s)):!1;let p,h,m,d;try{p=n(l),h=n(s)}catch{return!1}if(p.length!=h.length)return!1;for(p.sort(),h.sort(),d=p.length-1;d>=0;d--)if(p[d]!=h[d])return!1;for(d=p.length-1;d>=0;d--)if(m=p[d],t){let x=t(l[m],s[m],m);if(x===void 0&&(x=y(l[m],s[m])),!x)return!1}else if(!i(l[m],s[m]))return!1;return!0}return i(e,u)}function f(e,u,t=void 0){const r=i=>String.prototype.split.call(u,i).filter(Boolean).reduce((a,c)=>a!=null?a[c]:a,e),n=r(/[,[\]]+?/)||r(/[,[\].]+?/);return n===void 0||n===e?t:n}function C(e,u){return u.reduce((t,r)=>(e&&e.hasOwnProperty(r)&&(t[r]=e[r]),t),{})}function B(e,u){for(let t in e)e.hasOwnProperty(t)&&u(e[t],t)}function D(e){return typeof e=="object"&&e!==null}function O(e){return!!(e&&typeof e.valueOf()=="string")}function W(e,u){return[...new Set([...e,...u])]}function J(e,u,t){return[...e,...u].reduce((r,n)=>(r.findIndex(i=>t(i,n))!==-1||r.push(n),r),[])}function Q(e,u){for(let t of u){typeof t=="string"&&(t=t.split("."));for(let r=0;r<t.length-1;r++)e=e[t[r]],typeof e>"u";delete e[t.pop()]}}var R=[{RELEVANCE:"very high",broader:[{uri:"http://www.w3.org/2004/02/skos/core#closeMatch"}],definition:{de:["gleiche Bedeutung"],en:["same meaning"]},notation:["="],prefLabel:{ar:"تطابق تام",be:"дакладная адпаведнасць","be-tarask":"дакладная адпаведнасьць",bn:"হুবুহু মিল",bs:"tačno podudaranje",ca:"equivalència exacta",cs:"přesná shoda",da:"exact match",de:"exakte Übereinstimmung",el:"ακριβής αντιστοιχία",en:"exact match",eo:"ekzakta ekvivalento",es:"equivalencia exacta",et:"täpne vaste",fi:"vastaava käsite",fr:"équivalence exacte",ga:"meaitseáil chruinn",gl:"correspondencia exacta",he:"התאמה מדויקת",hu:"pontos egyezés",id:"sama persis",it:"corrispondenza esatta",ja:"完全一致",lv:"tieša sakritība",mk:"точно совпаѓање",ms:"padanan tepat","ms-arab":"ڤادنن تڤت",nb:"eksakt samsvar",nl:"exacte match",nn:"eksakt samsvar",pl:"dokładne dopasowanie",pt:"correspondência exata",ro:"echivalentul exact",ru:"точное соответствие",sl:"natančno ujemanje",sq:"përputhje e përpiktë",sr:"тачно подударање",sv:"exakt träff",tr:"tam eşleşme",uk:"точна відповідність",ur:"بالکل درست جوڑ",zh:"精確匹配","zh-cn":"精确匹配","zh-hans":"精确匹配","zh-hant":"精確匹配"},SHORT:"exact",uri:"http://www.w3.org/2004/02/skos/core#exactMatch"},{RELEVANCE:"high",broader:[{uri:"http://www.w3.org/2004/02/skos/core#mappingRelation"}],definition:{de:["in etwa gleiche Bedeutung"],en:["same general idea but not fully identical meaning"]},notation:["≈"],prefLabel:{ar:"تطابق قريب","be-tarask":"блізкая адпаведнасьць",ca:"equivalència inexacta",de:"hohe Übereinstimmung",el:"στενή αντιστοιχία",en:"close match",eo:"proksima kongruaĵo",es:"equivalencia inexacta",fi:"lähes vastaava käsite",fr:"quasi-équivalence",he:"התאמה קרובה",hu:"kvázi-egyenértékűség",it:"corrispondenza parziale",ja:"類似一致",mk:"блиско совпаѓање",ms:"padanan dekat","ms-arab":"ڤادنن دکت",nb:"nært samsvar",nl:"nabije match",nn:"nært samsvar",pl:"częściowe dopasowanie",pt:"correspondência próxima",ru:"близкое соответствие",sl:"visoko ujemanje",sr:"блиско поклапање",sv:"nära matchning",tr:"yakın eşleşme","zh-hans":"高度匹配"},SHORT:"close",uri:"http://www.w3.org/2004/02/skos/core#closeMatch"},{RELEVANCE:"medium",broader:[{uri:"http://www.w3.org/2004/02/skos/core#mappingRelation"}],definition:{de:["umfassendere Bedeutung"],en:["broader meaning"]},notation:[">"],prefLabel:{"be-tarask":"шырокая адпаведнасьць",ca:"relació llunyana",cs:"širší koncept",de:"allgemeinere Bedeutung",en:"broad match",eo:"malstrikta kongruo",et:"laiem vaste",fi:"vastaava laajempi käsite",he:"התאמה רחבה",hu:"tágabb jelentés",it:"corrispondenza con termine più generico",ja:"広義一致",mk:"пошироко совпаѓање",nb:"bredere samsvar",nl:"brede match",nn:"breitt samsvar",pl:"dopasowanie pojęcia o szerszym znaczeniu","pt-br":"correspondência genérica",ru:"более широкое соответствие",sl:"splošni pomen",sr:"у ширем смислу",sv:"bred träff",uk:"ширша відповідність",vi:"đối sánh rộng","zh-hans":"广泛匹配"},related:[{uri:"http://www.w3.org/2004/02/skos/core#narrowMatch"}],SHORT:"broad",uri:"http://www.w3.org/2004/02/skos/core#broadMatch"},{RELEVANCE:"medium",broader:[{uri:"http://www.w3.org/2004/02/skos/core#mappingRelation"}],definition:{en:["more specific meaning"]},notation:["<"],prefLabel:{"be-tarask":"вузкая адпаведнасьць",ca:"relació estreta",de:"spezifischere Bedeutung",en:"narrow match",eo:"strikta kongruo",et:"kitsam vaste",fi:"vastaava suppeampi käsite",he:"התאמה צרה",hu:"szűkebb jelentés",it:"corrispondenza con termine più specifico",ja:"狭義一致",mk:"потесно совпаѓање",nb:"smalere samsvar",nl:"nauwe match",nn:"snevert samsvar",pl:"dopasowanie pojęcia o węższym znaczeniu","pt-br":"correspondência aproximada",ru:"более узкое соответствие",sl:"ozki pomen",sr:"у ужем смислу",sv:"smal träff",ur:"نیرو میچ",vi:"đối sánh hẹp","zh-hans":"有限匹配"},related:[{uri:"http://www.w3.org/2004/02/skos/core#broadMatch"}],SHORT:"narrow",uri:"http://www.w3.org/2004/02/skos/core#narrowMatch"},{RELEVANCE:"low",broader:[{uri:"http://www.w3.org/2004/02/skos/core#mappingRelation"}],definition:{de:["assoziative Verknüpfung unterschiedlicher Bedeutungen"],en:["associative link between meanings"]},notation:["~"],prefLabel:{"be-tarask":"зьвязаная адпаведнасьць",ca:"parella relacionada",de:"verwandte Bedeutung",en:"related match",eo:"rilata kongruo",fi:"liittyvä käsite",fr:"association",he:"התאמה קשורה",hu:"rokon jelentés",it:"corrispondenza correlata",ja:"関連一致",lv:"saistīta sakritība",mk:"поврзано совпаѓање",ms:"padanan berkaitan","ms-arab":"ڤادنن برکاءيتن",nb:"relatert samsvar",nl:"gerelateerde match",pl:"dopasowanie pojęcia o powiązanym znaczeniu",ru:"ассоциативное соответствие",sl:"povezano ujemanje",tr:"ilişkili benzeşme",uk:"пов’язь",ur:"متعلقہ میچ",vec:"parenteła rełasionada","zh-hans":"关联匹配"},SHORT:"related",uri:"http://www.w3.org/2004/02/skos/core#relatedMatch"},{RELEVANCE:"generic",definition:{de:["unbekannter Bedeutungszusammenhang"],en:["unknown type of link between meanings"]},notation:["→"],prefLabel:{ar:"نوع علاقة التطبيق",be:"характэрная адносіна адлюстравання","be-tarask":"характэрная адносіна адлюстраваньня",ca:"relació de mapatge",de:"allgemeine Mapping-Relation",en:"SKOS generic mapping relation",fi:"SKOS-kartoitussuhde",fr:"lien de correspondance SKOS",he:"יחס מיפוי כללי",id:"relasi pemetaan",ja:"SKOS一般マッピング関係",mk:"пресликувачки однос",nb:"SKOS generisk mappingrelasjon","pt-br":"relação genérica de mapeamento",sl:"splošna relacija kartiranja SKOS",sr:"релација мапирања",sv:"mappnings relation",zh:"映射關係","zh-hant":"映射關係"},SHORT:"",uri:"http://www.w3.org/2004/02/skos/core#mappingRelation"}];const b={Concept:{type:["http://www.w3.org/2004/02/skos/core#Concept"]},ConceptScheme:{type:["http://www.w3.org/2004/02/skos/core#ConceptScheme"]},ConceptMapping:{type:R.map(e=>e.uri)},ConceptOccurrence:{type:["http://purl.org/cld/cdtype/CatalogueOrIndex"]},Registry:{type:["http://www.w3.org/ns/dcat#Catalog"]},Distribution:{type:["http://www.w3.org/ns/dcat#Distribution"]},Concordance:{type:["http://rdfs.org/ns/void#Linkset","http://rdf-vocabulary.ddialliance.org/xkos#Correspondence"]},Resource:{},Item:{},ConceptBundle:{},Annotation:{type:["Annotation","http://www.w3.org/ns/oa#Annotation"]}},k=Object.keys(b).reduce((e,u)=>{for(let t of b[u].type||[])e[t]=u;return e},{});function L(e,u=!1){let t;if(typeof e=="string"&&e)e in k?t=k[e]:(e=e.toLowerCase().replace(/s$/,""),t=Object.keys(b).find(r=>{const n=r.toLowerCase();if(n===e||n==="concept"+e)return!0}));else if(typeof e=="object"&&e.type){let r=Array.isArray(e.type)?e.type:[e.type];for(let n of r)if(n in k){t=k[n];break}}return u&&t?t.toLowerCase().replace(/^concept(.+)/,"$1"):t}const Y=/[\\^$.*+?()[\]{}|]/g,ee=e=>e.replace(Y,"\\$&"),ue=/[%ÄÖÜäöü ]/g;class te{constructor(u={}){if(Object.assign(this,u),this.notationPattern||(this.notationPattern=".+"),!this.uriPattern&&this.namespace){this.uriPattern="^"+ee(this.namespace);const t=this.notationPattern.replace(ue,encodeURI);this.uriPattern+="("+t+")$"}this.NOTATION_REGEX=RegExp("^("+this.notationPattern+")$"),this.uriPattern&&(this.URI_REGEX=RegExp(this.uriPattern))}isValidNotation(u){return this.NOTATION_REGEX.exec(u)}notationFromUri(u){if(this.URI_REGEX){const t=this.URI_REGEX.exec(u);if(t)return decodeURI(t[1])}}uriFromNotation(u){if(this.uriPattern)return u=encodeURIComponent(u),this.uriPattern.replace(/^\^|\$$/g,"").replace(/\\/g,"").replace(/\(.*\)/,u)}conceptFromUri(u,t={}){const r=this.notationFromUri(u);if(r===void 0)return;const n={uri:u,notation:[r]};return t.inScheme&&(n.inScheme=[{uri:this.uri}]),t.topConcept&&(n.topConceptOf=[{uri:this.uri}]),n}conceptFromNotation(u,t){if(this.isValidNotation(u))return this.conceptFromUri(this.uriFromNotation(u),t)}}var re=te;const S={store:null,path:"",defaults:["en"],getLanguages:P,selectLanguage:ne};function P(){return f(S.store,S.path)||S.defaults}function ne(e){if(!e)return null;for(let u of P())if(e[u])return u;for(let u of Object.keys(e))if(u!="-")return u;return null}var $=S;const ae=e=>/^[A-Z]*$/.test(e),A=(e,u)=>u.split(".").reduce((t,r)=>t&&t[r]?t[r]:null,e),ie=e=>((e instanceof Array?e:[e]).forEach(t=>{t["@context"]="https://gbv.github.io/jskos/context.json"}),e),M=e=>(Object.keys(e).forEach(u=>{ae(u)||u.startsWith("_")?delete e[u]:e[u]!=null&&typeof e[u]=="object"&&(e[u]=M(e[u]))}),e),oe=M,z=(e,u=[],t=!0)=>{u=u.concat(["ancestors","narrower","broader","mappings","memberList","TOPCONCEPTS","MAPPINGS","PROVIDER"]);let r=Array.isArray(e)?[]:{};for(let n in e)if(!(t&&n[0]=="_")){if(u.includes(n))if(e[n]&&Array.isArray(e[n])){e[n].length>0?r[n]=[null]:r[n]=[];continue}else{r[n]=null;continue}if(n=="inScheme"){let i=[];for(let a of e.inScheme){let c={uri:a.uri};a.notation&&(c.notation=a.notation),a.prefLabel&&(c.prefLabel=a.prefLabel),i.push(c)}r.inScheme=i;continue}e[n]!=null&&typeof e[n]=="object"?r[n]=z(e[n]):r[n]=e[n]}return r},se=z,_=e=>e?(e.uri?[e.uri]:[]).concat(e.identifier||[]).filter(Boolean):[],g=(e,u)=>{if(e==null&&u==null)return!0;const t=n=>n.replace("https://","http://"),r=_(e).map(t);for(let n of _(u).map(t))if(r.indexOf(n)!==-1)return!0;return!1},ce=g,le=g,fe=g,pe=e=>{var u;return((u=f(e,"type",[]))==null?void 0:u.includes("http://www.w3.org/2004/02/skos/core#Concept"))||f(e,"inScheme")!=null||f(e,"topConceptOf")!=null},I=e=>{var u;return(u=f(e,"type",[]))==null?void 0:u.includes("http://www.w3.org/2004/02/skos/core#ConceptScheme")},V=(e,u)=>{if(!e||!u)return!1;for(let t of u)if(g(e,t))return!0;return!1},he=V,de=(e,u=!1)=>e.sort((t,r)=>{let n=f(t,"notation[0]"),i=f(r,"notation[0]");if(n&&i&&(n=n.toLowerCase(),i=i.toLowerCase()),u&&n&&i){let a,c;if(a=parseFloat(n),c=parseFloat(i),!a&&!c){const o=`${n}`.split(/[^\w\d]/),l=`${i}`.split(/[^\w\d]/);for(let s=0;s<Math.min(o.length,l.length);s+=1)if(o[s]!==l[s]){a=parseFloat(o[s])||o[s],c=parseFloat(l[s])||l[s];break}!a&&!c&&(a=n,c=i)}n=a,i=c}if((!n||!i||n==i)&&(n=t.uri,i=r.uri),n&&i){if(n>i)return 1;if(n<i)return-1}return 0}),me=e=>{let u=["notation[0]",["prefLabel.de","prefLabel.en"],"uri"];return e.sort((t,r)=>{for(let n of u){let i,a;if(Array.isArray(n))for(let c of n)i=i||f(t,c),a=a||f(r,c);else i=f(t,n),a=f(r,n);if(i!=null&&a!=null){if(i=i.toLowerCase(),a=a.toLowerCase(),i>a)return 1;if(i<a)return-1}}return 0})},ge=e=>{let u=C(z(e),["from","to","fromScheme","toScheme","creator","contributor","type","created","modified","note","identifier","uri","partOf","mappingRelevance"]);for(let t of[u.from,u.to])B(t,(r,n)=>{let i=[];for(let a of r)i.push(C(a,["uri","notation"]));t[n]=i});return u.fromScheme&&(u.fromScheme=C(u.fromScheme,["uri","notation"])),u.toScheme&&(u.toScheme=C(u.toScheme,["uri","notation"])),u.partOf&&(u.partOf=u.partOf.map(t=>C(t,["uri"]))),u},v=function(e){for(let u of R)if(e==u.uri)return u;return null},q=v("http://www.w3.org/2004/02/skos/core#mappingRelation"),Ee=function(e,u=q){let t;return Array.isArray(e)&&e.length>0?t=e[0]:t=e,v(t)||u},Ae=(e,u={})=>{const{language:t}=u;let r=A(e,"from.memberSet.0.notation.0"),n=A(e,"to.memberSet.0.notation.0");r=r!==null?r:"",n=n!==null?n:"";let i=v(A(e,"type.0"));i=i?i.SHORT:"";let a=w(A(e,"from.memberSet.0"),{language:t,fallbackToUri:!1})||"",c=w(A(e,"to.memberSet.0"),{language:t,fallbackToUri:!1})||"",o=w(A(e,"creator.0"),{language:t,fallbackToUri:!1})||"";return{fromNotation:r,toNotation:n,fromLabel:a,toLabel:c,type:i,creator:o}},we=(e={})=>{const u=e.delimiter||",",t=e.quoteChar||'"',r=e.lineTerminator||`
`,n=t+t,i=a=>t+(a==null?"":a.split(t).join(n))+t;return a=>a.map(i).join(u)+r},E=(e,u)=>{let t=[];for(let r of["from","to"])(u==null||r===u)&&(t=t.concat(f(e,`${r}.memberSet`)||f(e,`${r}.memberChoice`)||f(e,`${r}.memberList`)||[]));return t.filter(r=>r!=null)},Ce=(e={})=>{const u=we(e),t=e.language||"en";e.type==null&&(e.type=!0);const r=a=>{a=a||[];let c=[];for(let o of["from","to"]){e.schemes&&c.push(`${o}Scheme`);let l=Math.max(...a.map(s=>E(s,o).length),1);for(let s=0;s<l;s+=1)c.push(`${o}Notation${s?s+1:""}`),e.labels&&c.push(`${o}Label${s?s+1:""}`)}return e.type&&c.push("type"),e.creator&&c.push("creator"),u(c)},n=(a,c={})=>{let o=[];for(let l of["from","to"]){e.schemes&&o.push(f(a,`${l}Scheme.notation[0]`,""));const s=E(a,l);let p=c[`${l}Count`];p==null&&(p=s.length),p=Math.max(p,1);for(let h=0;h<p;h+=1)o.push(f(s[h],"notation[0]","")),e.labels&&o.push(w(s[h],{language:t,fallbackToUri:!1}))}return e.type&&o.push(f(v(f(a,"type[0]")),"SHORT","")),e.creator&&o.push(w(f(a,"creator[0]"),{language:t,fallbackToUri:!1})),u(o)};return{header:r,fromMapping:n,fromMappings:(a,c={header:!0})=>{let o="";c.header&&(o+=r(a));const l={fromCount:Math.max(...a.map(s=>E(s,"from").length)),toCount:Math.max(...a.map(s=>E(s,"to").length))};for(let s of a)o+=n(s,l);return o}}};function Fe(e,u){return y(e,u,(t,r,n)=>{let i={[n]:t},a={[n]:r};if(n=="from"||n=="to")return y(Object.getOwnPropertyNames(f(t,n,{})),Object.getOwnPropertyNames(f(r,n,{})))?y(E(i,n),E(a,n),(c,o,l)=>{if(l!=null)return g(c,o)}):!1;if(n=="fromScheme"||n=="toScheme")return g(t,r)})}const De=(e,u)=>{let t=L(e),r=L(u);return!(t&&r&&t!=r)},Z=e=>{Array.isArray(e)&&e.sort((u,t)=>u===null?1:t===null?-1:0)},j=(e,u)=>(!e||!u||((Array.isArray(e.identifier)||Array.isArray(u.identifier))&&(e.identifier=W(e.identifier||[],u.identifier||[])),!e.uri&&u.uri&&(e.uri=u.uri),e.uri&&u.uri&&e.uri!=u.uri&&!(e.identifier||[]).includes(u.uri)&&(e.identifier=(e.identifier||[]).concat([u.uri])),Array.isArray(e.identifier)&&e.uri&&(e.identifier=e.identifier.filter(t=>t!==e.uri)),(e.identifier||[]).length==0&&delete e.identifier,Z(e.identifier)),e),H=(e,u,t)=>{if(!e||!u)return e||u;t=t||{};let r=t._path||"",n=t.detectMismatch||[],i=t.skipPaths||[],a={};return B(e,(c,o)=>{if(!i.includes(r+o))if(Array.isArray(c)&&Array.isArray(u[o]))a[o]=J(c,u[o],(l,s)=>D(l)&&D(s)?g(l,s):l===s),Z(a[o]);else if(D(c)&&D(u[o]))a[o]=H(c,u[o],Object.assign({_path:`${r}${o}.`},t));else{if(c&&u[o]&&n.includes(r+o)&&!y(c,u[o]))throw new Error("Property mismatch in "+r+o);a[o]=c}}),B(u,(c,o)=>{e[o]||(a[o]=c)}),r==""&&Q(a,i),t.mergeUris&&j(a,u),a},T=e=>Array.isArray(e)?e.map(u=>T(u)):D(e)?(B(e,(u,t)=>{e[t]=T(u)}),e):O(e)?e.normalize():e,ye=e=>{const u=/^[A-Za-z][A-Za-z0-9+\-.]*:(?:\/\/(?:(?:[A-Za-z0-9\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\.[A-Za-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\/(?:(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\?(?:[A-Za-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*)?(?:#(?:[A-Za-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*)?$/;return e.match(u)!==null},ve={mappingsByConcepts:(e,u,t)=>{let r=["memberSet","memberList","memberChoice"],n,i;for(let a of r)n=n||f(e,t+"."+a+"[0].notation[0]"),i=i||f(u,t+"."+a+"[0].notation[0]");return n==null||n<i?-1:i==null||n>i?1:0}},xe=(e,u)=>!e||!u?!1:[e.uri].concat(Object.values(e.identities||{}).map(t=>t.uri)).filter(t=>t!=null).includes(f(u,"creator[0].uri"));function ke(e,u){let t;if(e&&e.notation&&e.notation.length)t=e.notation[0],(I(e)||u=="scheme")&&(t=t.toUpperCase());else if(e&&e.inScheme&&e.inScheme[0]&&e.uri)try{t=new re(e&&e.inScheme&&e.inScheme[0]).notationFromUri(e.uri)}catch{}return t||""}function U(e,u,{language:t}={}){let r=e&&u?e[u]:e;return r&&(r[t]||(t=$.selectLanguage(r),t))?r[t]:null}function w(e,u={}){u=u||{};const t=u.fallbackToUri==null?!0:u.fallbackToUri;return f(e,`prefLabel.${u.language}`)||U(e,"prefLabel",u)||(t&&e&&e.uri?e.uri:"")}function Se(e,u={}){u=u||{};let t=f(e,`definition.${u.language}`)||U(e,"definition",u)||[];return O(t)&&(t=[t]),t}function Be(e){return f(e,"stored",f(e,"constructor.stored",f(e,"provider.constructor.stored",!1)))}function be(e){return O(e.creator)?e.creator:e.creator&&e.creator.id}function Oe(e){return f(e,"creator.name")||""}function ze(e,u){return!!(e&&O(e.creator)?u&&u.includes(e.creator):u&&e.creator&&u.includes(e.creator.id))}function Le(e,u){return u.filter(({notationPattern:t})=>(t||".+")===".+"?!1:RegExp("^("+t+")$").test(e))}const Pe=Object.freeze(Object.defineProperty({__proto__:null,addContext:ie,annotationCreatorMatches:ze,annotationCreatorName:Oe,annotationCreatorUri:be,clean:M,cleanJSKOS:oe,compare:g,compareConcepts:fe,compareFunctions:ve,compareMappingsDeep:Fe,compareObjects:ce,compareSchemes:le,conceptsOfMapping:E,copyDeep:z,deepCopy:se,defaultMappingType:q,definition:Se,flattenMapping:Ae,getAllUris:_,guessObjectType:L,guessSchemeFromNotation:Le,isConcept:pe,isContainedIn:V,isScheme:I,isSchemeInList:he,isValidUri:ye,languageMapContent:U,mappingCSV:Ce,mappingRegistryIsStored:Be,mappingTypeByType:Ee,mappingTypeByUri:v,mappingTypes:R,matchObjectTypes:De,merge:H,mergeUris:j,minifyMapping:ge,normalize:T,notation:ke,objectTypes:b,prefLabel:w,sortConcepts:de,sortSchemes:me,userOwnsMapping:xe},Symbol.toStringTag,{value:"Module"}));function _e(e,u=(t=>(t=$.getLanguages())==null?void 0:t[0])()||"en"){let r=new Date(e);if(r instanceof Date&&!isNaN(r)){if(e.length<10)return e;let n={year:"numeric",month:"short",day:"numeric"};return e.length>10&&(n=Object.assign({hour:"2-digit",minute:"2-digit",second:"2-digit"},n)),r.toLocaleString(u,n)}else return e}function Te(e,u=!1){const t=r=>{for(const n of e()){const i=(n.elements||[]).reduce((a,c)=>a||c&&c.contains(r.target),!1);(u||!i)&&n.handler({event:r,isInside:i})}};K(()=>{document.addEventListener("click",t)}),G(()=>{document.removeEventListener("click",t)})}function Re(e,u,t){let r;return function(){const n=this,i=arguments,a=function(){r=null,t||e.apply(n,i)},c=t&&!r;clearTimeout(r),r=setTimeout(a,u),c&&e.apply(n,i)}}function $e(e,{voc:u=!1,scheme:t}){return async r=>u?e.vocSuggest({search:r}):e.suggest({search:r,scheme:t})}const F=N(null),Me={draggedItem:F,dragstart(e){F.value=e},dragend(){F.value=null},addDropzone(e,u){const t=N(!1);let r;const n=o=>{o.preventDefault()},i=o=>{r=o.target,t.value=!0},a=o=>{r===o.target&&(t.value=!1)},c=(o,...l)=>{o.preventDefault(),F.value&&u(F.value,...l),t.value=!1};return e&&(e.addEventListener("dragover",n),e.addEventListener("dragenter",i),e.addEventListener("dragleave",a),e.addEventListener("drop",c)),{dragover:n,dragenter:i,dragleave:a,drop:c,isDraggingOver:t}}};function Ue(e){const u=X(()=>$.getLanguages().find(r=>e[r])||"en");return{t:r=>e[u.value][r],currentLanguage:u}}const Ie=Object.freeze(Object.defineProperty({__proto__:null,addClickHandlers:Te,cdkRegistryToSuggestFunction:$e,dateToString:_e,debounce:Re,dragAndDrop:Me,useLocale:Ue},Symbol.toStringTag,{value:"Module"}));export{z as A,se as B,q as C,Se as D,Ae as E,_ as F,L as G,Le as H,V as I,I as J,he as K,ye as L,U as M,Ce as N,Be as O,Ee as P,v as Q,R,De as S,H as T,j as U,ge as V,T as W,b as X,me as Y,xe as Z,Te as a,$e as b,g as c,Re as d,Me as e,Ie as f,re as g,ie as h,pe as i,ze as j,Oe as k,$ as l,be as m,ke as n,M as o,w as p,oe as q,fe as r,de as s,Pe as t,Ue as u,ve as v,Fe as w,ce as x,le as y,E as z};
