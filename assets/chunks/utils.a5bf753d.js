import{s as H,h as pe,u as de}from"../app.5e7cbef3.js";function he(e,t){return t.forEach(function(r){r&&typeof r!="string"&&!Array.isArray(r)&&Object.keys(r).forEach(function(n){if(n!=="default"&&!(n in e)){var a=Object.getOwnPropertyDescriptor(r,n);Object.defineProperty(e,n,a.get?a:{enumerable:!0,get:function(){return r[n]}})}})}),Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var me=function(t){var r=function(x,E){var O=x<<E|x>>>32-E;return O},n=function(x){var E="",O,I;for(O=7;O>=0;O--)I=x>>>O*4&15,E+=I.toString(16);return E},a,i,o,s=new Array(80),f=1732584193,l=4023233417,u=2562383102,m=271733878,w=3285377520,d,p,h,g,v,y;t=unescape(encodeURIComponent(t));var A=t.length,b=[];for(i=0;i<A-3;i+=4)o=t.charCodeAt(i)<<24|t.charCodeAt(i+1)<<16|t.charCodeAt(i+2)<<8|t.charCodeAt(i+3),b.push(o);switch(A%4){case 0:i=2147483648;break;case 1:i=t.charCodeAt(A-1)<<24|8388608;break;case 2:i=t.charCodeAt(A-2)<<24|t.charCodeAt(A-1)<<16|32768;break;case 3:i=t.charCodeAt(A-3)<<24|t.charCodeAt(A-2)<<16|t.charCodeAt(A-1)<<8|128;break}for(b.push(i);b.length%16!==14;)b.push(0);for(b.push(A>>>29),b.push(A<<3&4294967295),a=0;a<b.length;a+=16){for(i=0;i<16;i++)s[i]=b[a+i];for(i=16;i<=79;i++)s[i]=r(s[i-3]^s[i-8]^s[i-14]^s[i-16],1);for(d=f,p=l,h=u,g=m,v=w,i=0;i<=19;i++)y=r(d,5)+(p&h|~p&g)+v+s[i]+1518500249&4294967295,v=g,g=h,h=r(p,30),p=d,d=y;for(i=20;i<=39;i++)y=r(d,5)+(p^h^g)+v+s[i]+1859775393&4294967295,v=g,g=h,h=r(p,30),p=d,d=y;for(i=40;i<=59;i++)y=r(d,5)+(p&h|p&g|h&g)+v+s[i]+2400959708&4294967295,v=g,g=h,h=r(p,30),p=d,d=y;for(i=60;i<=79;i++)y=r(d,5)+(p^h^g)+v+s[i]+3395469782&4294967295,v=g,g=h,h=r(p,30),p=d,d=y;f=f+d&4294967295,l=l+p&4294967295,u=u+h&4294967295,m=m+g&4294967295,w=w+v&4294967295}return y=n(f)+n(l)+n(u)+n(m)+n(w),y.toLowerCase()};const V=me;function Z(e){return e.map(t=>t&&t.uri).filter(Boolean)}function U(e){return["memberSet","memberList","memberChoice"].find(t=>e[t])}function j(e){const t=U(e),r=e[t]?Z(e[t]):[];return{[r.length>1?t:"memberSet"]:r.map(n=>({uri:n}))}}function W(e){const{from:t,to:r,type:n}=e;let a={from:j(t||{}),to:j(r||{}),type:[n&&n[0]||"http://www.w3.org/2004/02/skos/core#mappingRelation"]};for(let i of["from","to"])if((a[i][U(a[i])]||[]).length==0){let o=e[i+"Scheme"];o&&o.uri&&(a[i+"Scheme"]={uri:o.uri})}return a}function G(e){const{from:t,to:r}=e,n=[t,r].filter(Boolean).map(a=>Z(a[U(a)]||[]));return[].concat(...n).sort()}function X(e){const t=JSON.stringify(W(e),["from","fromScheme","to","toScheme","type","memberSet","memberList","memberChoice","uri"]);return"urn:jskos:mapping:content:"+V(t+`
`)}function J(e){const t=JSON.stringify(G(e));return"urn:jskos:mapping:members:"+V(t+`
`)}function _(e){const t=(e.identifier||[]).filter(r=>r&&!r.startsWith("urn:jskos:mapping:")).concat([J(e),X(e)]).sort();return Object.assign({},e,{identifier:t})}function K(e,t,r){e=e&&_(e),t=t&&_(t);let n=e&&e.identifier?e.identifier.find(i=>i.startsWith(r)):null,a=t&&t.identifier?t.identifier.find(i=>i.startsWith(r)):null;return n==a}function Q(e,t){return K(e,t,"urn:jskos:mapping:content:")}const ge=Q;function we(e,t){return K(e,t,"urn:jskos:mapping:members:")}var ve={mappingContent:W,mappingMembers:G,mappingContentIdentifier:X,mappingMembersIdentifier:J,addMappingIdentifiers:_,compareMappings:Q,compareMappingContent:ge,compareMappingMembers:we};function Y(e,t,r){var n=Array.prototype.slice,a=typeof Object.keys=="function"?Object.keys:function(l){var u=[];for(var m in l)u.push(m);return u},i=function(l,u){return l===u?!0:l instanceof Date&&u instanceof Date?l.getTime()===u.getTime():typeof l!="object"&&typeof u!="object"?l==u:f(l,u)};function o(l){return l==null}function s(l){return Object.prototype.toString.call(l)=="[object Arguments]"}function f(l,u){if(o(l)||o(u)||l.prototype!==u.prototype)return!1;if(s(l))return s(u)?(l=n.call(l),u=n.call(u),i(l,u)):!1;try{var m=a(l),w=a(u),d,p}catch{return!1}if(m.length!=w.length)return!1;for(m.sort(),w.sort(),p=m.length-1;p>=0;p--)if(m[p]!=w[p])return!1;for(p=m.length-1;p>=0;p--)if(d=m[p],r){let h=r(l[d],u[d],d);if(h===void 0&&(h=Y(l[d],u[d])),!h)return!1}else if(!i(l[d],u[d]))return!1;return!0}return i(e,t)}var ee={get:(e,t,r=void 0)=>{const n=i=>String.prototype.split.call(t,i).filter(Boolean).reduce((o,s)=>o!=null?o[s]:o,e),a=n(/[,[\]]+?/)||n(/[,[\].]+?/);return a===void 0||a===e?r:a},pick:(e,t)=>t.reduce((r,n)=>(e&&e.hasOwnProperty(n)&&(r[n]=e[n]),r),{}),forOwn:(e,t)=>{for(let r in e)e.hasOwnProperty(r)&&t(e[r],r)},isEqualWith:Y,intersection:(...e)=>e.reduce((t,r)=>t.filter(n=>r.includes(n))),isObject:e=>typeof e=="object"&&e!==null,isString:e=>!!(e&&typeof e.valueOf()=="string"),union:(e,t)=>[...new Set([...e,...t])],unionWith:(e,t,r)=>[...e,...t].reduce((n,a)=>(n.findIndex(i=>r(i,a))!==-1||n.push(a),n),[]),omitMod:(e,t)=>{for(let r of t){typeof r=="string"&&(r=r.split("."));for(let n=0;n<r.length-1;n++)e=e[r[n]];delete e[r.pop()]}}},te=[{RELEVANCE:"very high",broader:[{uri:"http://www.w3.org/2004/02/skos/core#closeMatch"}],definition:{de:["gleiche Bedeutung"],en:["same meaning"]},notation:["="],prefLabel:{ar:"\u062A\u0637\u0627\u0628\u0642 \u062A\u0627\u0645",be:"\u0434\u0430\u043A\u043B\u0430\u0434\u043D\u0430\u044F \u0430\u0434\u043F\u0430\u0432\u0435\u0434\u043D\u0430\u0441\u0446\u044C","be-tarask":"\u0434\u0430\u043A\u043B\u0430\u0434\u043D\u0430\u044F \u0430\u0434\u043F\u0430\u0432\u0435\u0434\u043D\u0430\u0441\u044C\u0446\u044C",bn:"\u09B9\u09C1\u09AC\u09C1\u09B9\u09C1 \u09AE\u09BF\u09B2",ca:"equival\xE8ncia exacta",cs:"p\u0159esn\xE1 shoda",da:"exact match",de:"exakte \xDCbereinstimmung",en:"exact match",eo:"ekzakta ekvivalento",es:"equivalencia exacta",fi:"vastaava k\xE4site",fr:"\xE9quivalence exacte",gl:"correspondencia exacta",he:"\u05D4\u05EA\u05D0\u05DE\u05D4 \u05DE\u05D3\u05D5\u05D9\u05E7\u05EA",hu:"pontos egyez\xE9s",id:"sama persis",it:"corrispondenza esatta",ja:"\u5B8C\u5168\u4E00\u81F4",lv:"tie\u0161a sakrit\u012Bba",mk:"\u0442\u043E\u0447\u043D\u043E \u0441\u043E\u0432\u043F\u0430\u0453\u0430\u045A\u0435",ms:"padanan tepat","ms-arab":"\u06A4\u0627\u062F\u0646\u0646 \u062A\u06A4\u062A",nb:"eksakt samsvar",nl:"exacte match",nn:"eksakt samsvar",pl:"dok\u0142adne dopasowanie",pt:"correspond\xEAncia exata",ro:"echivalentul exact",ru:"\u0442\u043E\u0447\u043D\u043E\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435",sq:"p\xEBrputhje e p\xEBrpikt\xEB",sr:"\u0442\u0430\u0447\u043D\u043E \u043F\u043E\u0434\u0443\u0434\u0430\u0440\u0430\u045A\u0435",sv:"exakt tr\xE4ff",tr:"tam e\u015Fle\u015Fme",uk:"\u0442\u043E\u0447\u043D\u0430 \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u043D\u0456\u0441\u0442\u044C",zh:"\u7CBE\u78BA\u5339\u914D","zh-hans":"\u7CBE\u786E\u5339\u914D","zh-hant":"\u7CBE\u78BA\u5339\u914D"},SHORT:"exact",uri:"http://www.w3.org/2004/02/skos/core#exactMatch"},{RELEVANCE:"high",broader:[{uri:"http://www.w3.org/2004/02/skos/core#mappingRelation"}],definition:{de:["in etwa gleiche Bedeutung"],en:["same general idea but not fully identical meaning"]},notation:["\u2248"],prefLabel:{ar:"\u062A\u0637\u0627\u0628\u0642 \u0642\u0631\u064A\u0628","be-tarask":"\u0431\u043B\u0456\u0437\u043A\u0430\u044F \u0430\u0434\u043F\u0430\u0432\u0435\u0434\u043D\u0430\u0441\u044C\u0446\u044C",ca:"equival\xE8ncia inexacta",de:"hohe \xDCbereinstimmung",en:"close match",eo:"proksima kongrua\u0135o",es:"equivalencia inexacta",fi:"l\xE4hes vastaava k\xE4site",fr:"quasi-\xE9quivalence",he:"\u05D4\u05EA\u05D0\u05DE\u05D4 \u05E7\u05E8\u05D5\u05D1\u05D4",it:"corrispondenza parziale",mk:"\u0431\u043B\u0438\u0441\u043A\u043E \u0441\u043E\u0432\u043F\u0430\u0453\u0430\u045A\u0435",ms:"padanan dekat","ms-arab":"\u06A4\u0627\u062F\u0646\u0646 \u062F\u06A9\u062A",nb:"n\xE6rt samsvar",nl:"nabije match",nn:"n\xE6rt samsvar",pl:"cz\u0119\u015Bciowe dopasowanie",pt:"correspond\xEAncia pr\xF3xima",ru:"\u0431\u043B\u0438\u0437\u043A\u043E\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435",sr:"\u0431\u043B\u0438\u0441\u043A\u043E \u043F\u043E\u043A\u043B\u0430\u043F\u0430\u045A\u0435",sv:"n\xE4ra matchning",tr:"yak\u0131n e\u015Fle\u015Fme","zh-hans":"\u9AD8\u5EA6\u5339\u914D"},SHORT:"close",uri:"http://www.w3.org/2004/02/skos/core#closeMatch"},{RELEVANCE:"medium",broader:[{uri:"http://www.w3.org/2004/02/skos/core#mappingRelation"}],definition:{de:["umfassendere Bedeutung"],en:["broader meaning"]},notation:[">"],prefLabel:{"be-tarask":"\u0448\u044B\u0440\u043E\u043A\u0430\u044F \u0430\u0434\u043F\u0430\u0432\u0435\u0434\u043D\u0430\u0441\u044C\u0446\u044C",ca:"relaci\xF3 llunyana",de:"allgemeinere Bedeutung",en:"broad match",eo:"malstrikta kongruo",fi:"vastaava laajempi k\xE4site",he:"\u05D4\u05EA\u05D0\u05DE\u05D4 \u05E8\u05D7\u05D1\u05D4",it:"corrispondenza generica",ja:"\u90E8\u5206\u4E00\u81F4",mk:"\u043F\u043E\u0448\u0438\u0440\u043E\u043A\u043E \u0441\u043E\u0432\u043F\u0430\u0453\u0430\u045A\u0435",nb:"bredere samsvar",nl:"brede match",nn:"breitt samsvar",pl:"dopasowanie poj\u0119cia o szerszym znaczeniu","pt-br":"correspond\xEAncia gen\xE9rica",ru:"\u0431\u043E\u043B\u0435\u0435 \u0448\u0438\u0440\u043E\u043A\u043E\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435",sr:"\u0443 \u0448\u0438\u0440\u0435\u043C \u0441\u043C\u0438\u0441\u043B\u0443",sv:"bred tr\xE4ff","zh-hans":"\u5E7F\u6CDB\u5339\u914D"},related:[{uri:"http://www.w3.org/2004/02/skos/core#narrowMatch"}],SHORT:"broad",uri:"http://www.w3.org/2004/02/skos/core#broadMatch"},{RELEVANCE:"medium",broader:[{uri:"http://www.w3.org/2004/02/skos/core#mappingRelation"}],definition:{en:["more specific meaning"]},notation:["<"],prefLabel:{"be-tarask":"\u0432\u0443\u0437\u043A\u0430\u044F \u0430\u0434\u043F\u0430\u0432\u0435\u0434\u043D\u0430\u0441\u044C\u0446\u044C",ca:"relaci\xF3 estreta",de:"spezifischere Bedeutung",en:"narrow match",eo:"strikta kongruo",fi:"vastaava suppeampi k\xE4site",he:"\u05D4\u05EA\u05D0\u05DE\u05D4 \u05E6\u05E8\u05D4",it:"corrispondenza con termine pi\xF9 specifico",mk:"\u043F\u043E\u0442\u0435\u0441\u043D\u043E \u0441\u043E\u0432\u043F\u0430\u0453\u0430\u045A\u0435",nb:"smalere samsvar",nl:"nauwe match",nn:"snevert samsvar",pl:"dopasowanie poj\u0119cia o w\u0119\u017Cszym znaczeniu","pt-br":"correspond\xEAncia aproximada",ru:"\u0431\u043E\u043B\u0435\u0435 \u0443\u0437\u043A\u043E\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435",sr:"\u0443 \u0443\u0436\u0435\u043C \u0441\u043C\u0438\u0441\u043B\u0443",sv:"smal tr\xE4ff",ur:"\u0646\u06CC\u0631\u0648 \u0645\u06CC\u0686","zh-hans":"\u6709\u9650\u5339\u914D"},related:[{uri:"http://www.w3.org/2004/02/skos/core#broadMatch"}],SHORT:"narrow",uri:"http://www.w3.org/2004/02/skos/core#narrowMatch"},{RELEVANCE:"low",broader:[{uri:"http://www.w3.org/2004/02/skos/core#mappingRelation"}],definition:{de:["assoziative Verkn\xFCpfung unterschiedlicher Bedeutungen"],en:["associative link between meanings"]},notation:["~"],prefLabel:{"be-tarask":"\u0437\u044C\u0432\u044F\u0437\u0430\u043D\u0430\u044F \u0430\u0434\u043F\u0430\u0432\u0435\u0434\u043D\u0430\u0441\u044C\u0446\u044C",ca:"parella relacionada",de:"verwandte Bedeutung",en:"related match",eo:"rilata kongruo",he:"\u05D4\u05EA\u05D0\u05DE\u05D4 \u05E7\u05E9\u05D5\u05E8\u05D4",it:"corrispondenza correlata",lv:"saist\u012Bta sakrit\u012Bba",mk:"\u043F\u043E\u0432\u0440\u0437\u0430\u043D\u043E \u0441\u043E\u0432\u043F\u0430\u0453\u0430\u045A\u0435",ms:"padanan berkaitan","ms-arab":"\u06A4\u0627\u062F\u0646\u0646 \u0628\u0631\u06A9\u0627\u0621\u064A\u062A\u0646",nb:"relatert samsvar",nl:"gerelateerde match",pl:"dopasowanie poj\u0119cia o powi\u0105zanym znaczeniu",ru:"\u0430\u0441\u0441\u043E\u0446\u0438\u0430\u0442\u0438\u0432\u043D\u043E\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435",tr:"ili\u015Fkili benze\u015Fme",ur:"\u0645\u062A\u0639\u0644\u0642\u06C1 \u0645\u06CC\u0686",vec:"parente\u0142a re\u0142asionada","zh-hans":"\u5173\u8054\u5339\u914D"},SHORT:"related",uri:"http://www.w3.org/2004/02/skos/core#relatedMatch"},{RELEVANCE:"generic",definition:{de:["unbekannter Bedeutungszusammenhang"],en:["unknown type of link between meanings"]},notation:["\u2192"],prefLabel:{ar:"\u0646\u0648\u0639 \u0639\u0644\u0627\u0642\u0629 \u0627\u0644\u062A\u0637\u0628\u064A\u0642",be:"\u0445\u0430\u0440\u0430\u043A\u0442\u044D\u0440\u043D\u0430\u044F \u0430\u0434\u043D\u043E\u0441\u0456\u043D\u0430 \u0430\u0434\u043B\u044E\u0441\u0442\u0440\u0430\u0432\u0430\u043D\u043D\u044F","be-tarask":"\u0445\u0430\u0440\u0430\u043A\u0442\u044D\u0440\u043D\u0430\u044F \u0430\u0434\u043D\u043E\u0441\u0456\u043D\u0430 \u0430\u0434\u043B\u044E\u0441\u0442\u0440\u0430\u0432\u0430\u043D\u044C\u043D\u044F",ca:"relaci\xF3 de mapatge",de:"allgemeine Mapping-Relation",en:"SKOS generic mapping relation",fr:"lien de correspondance SKOS",he:"\u05D9\u05D7\u05E1 \u05DE\u05D9\u05E4\u05D5\u05D9 \u05DB\u05DC\u05DC\u05D9",id:"relasi pemetaan",mk:"\u043F\u0440\u0435\u0441\u043B\u0438\u043A\u0443\u0432\u0430\u0447\u043A\u0438 \u043E\u0434\u043D\u043E\u0441",nb:"generell mappingrelasjon","pt-br":"rela\xE7\xE3o gen\xE9rica de mapeamento",sr:"\u0440\u0435\u043B\u0430\u0446\u0438\u0458\u0430 \u043C\u0430\u043F\u0438\u0440\u0430\u045A\u0430",sv:"mappnings relation",zh:"\u6620\u5C04\u95DC\u4FC2","zh-hant":"\u6620\u5C04\u95DC\u4FC2"},SHORT:"",uri:"http://www.w3.org/2004/02/skos/core#mappingRelation"}];const ye=te,T={Concept:{type:["http://www.w3.org/2004/02/skos/core#Concept"]},ConceptScheme:{type:["http://www.w3.org/2004/02/skos/core#ConceptScheme"]},ConceptMapping:{type:ye.map(e=>e.uri)},ConceptOccurrence:{type:["http://purl.org/cld/cdtype/CatalogueOrIndex"]},Registry:{type:["http://www.w3.org/ns/dcat#Catalog"]},Distribution:{type:["http://www.w3.org/ns/dcat#Distribution"]},Concordance:{type:["http://rdfs.org/ns/void#Linkset","http://rdf-vocabulary.ddialliance.org/xkos#Correspondence"]},Resource:{},Item:{},ConceptBundle:{},Annotation:{type:["Annotation","http://www.w3.org/ns/oa#Annotation"]}},F=Object.keys(T).reduce((e,t)=>{for(let r of T[t].type||[])e[r]=t;return e},{});function Ae(e,t=!1){var r;if(typeof e=="string"&&e)e in F?r=F[e]:(e=e.toLowerCase().replace(/s$/,""),r=Object.keys(T).find(n=>{const a=n.toLowerCase();if(a===e||a==="concept"+e)return!0}));else if(typeof e=="object"&&e.type){let n=Array.isArray(e.type)?e.type:[e.type];for(let a of n)if(a in F){r=F[a];break}}return t&&r?r.toLowerCase().replace(/^concept(.+)/,"$1"):r}var be={objectTypes:T,guessObjectType:Ae};const Se=/[\\^$.*+?()[\]{}|]/g,Ce=e=>e.replace(Se,"\\$&"),Oe=/[%ÄÖÜäöü ]/g;class ke{constructor(t={}){if(Object.assign(this,t),this.notationPattern||(this.notationPattern=".+"),!this.uriPattern&&this.namespace){this.uriPattern="^"+Ce(this.namespace);const r=this.notationPattern.replace(Oe,encodeURI);this.uriPattern+="("+r+")$"}this.NOTATION_REGEX=RegExp("^"+this.notationPattern+"$"),this.uriPattern&&(this.URI_REGEX=RegExp(this.uriPattern))}isValidNotation(t){return this.NOTATION_REGEX.exec(t)}notationFromUri(t){if(this.URI_REGEX){const r=this.URI_REGEX.exec(t);if(r)return decodeURI(r[1])}}uriFromNotation(t){if(this.uriPattern)return t=encodeURI(t),this.uriPattern.replace(/^\^|\$$/g,"").replace(/\\/g,"").replace(/\(.*\)/,t)}conceptFromUri(t,r={}){const n=this.notationFromUri(t);if(n===void 0)return;const a={uri:t,notation:[n]};return r.inScheme&&(a.inScheme=[{uri:this.uri}]),r.topConcept&&(a.topConceptOf=[{uri:this.uri}]),a}conceptFromNotation(t,r){if(this.isValidNotation(t))return this.conceptFromUri(this.uriFromNotation(t),r)}}var re=ke;const Ee=ee,z={store:null,path:"",defaults:["en"],getLanguages:ne,selectLanguage:Le};function ne(){return Ee.get(z.store,z.path)||z.defaults}function Le(e){if(!e)return null;for(let t of ne())if(e[t])return t;for(let t of Object.keys(e))if(t!="-")return t;return null}var ie=z;const c=ee,$e=e=>/^[A-Z]*$/.test(e),k=(e,t)=>t.split(".").reduce((r,n)=>r&&r[n]?r[n]:null,e),xe=e=>((e instanceof Array?e:[e]).forEach(r=>{r["@context"]="https://gbv.github.io/jskos/context.json"}),e),B=e=>(Object.keys(e).forEach(t=>{$e(t)||t.startsWith("_")?delete e[t]:e[t]!=null&&typeof e[t]=="object"&&(e[t]=B(e[t]))}),e),Fe=B,R=(e,t=[],r=!0)=>{t=t.concat(["ancestors","narrower","broader","mappings","memberList","TOPCONCEPTS","MAPPINGS","PROVIDER"]);let n=Array.isArray(e)?[]:{};for(let a in e)if(!(r&&a[0]=="_")){if(t.includes(a))if(e[a]&&Array.isArray(e[a])){e[a].length>0?n[a]=[null]:n[a]=[];continue}else{n[a]=null;continue}if(a=="inScheme"){let i=[];for(let o of e.inScheme){let s={uri:o.uri};o.notation&&(s.notation=o.notation),o.prefLabel&&(s.prefLabel=o.prefLabel),i.push(s)}n.inScheme=i;continue}e[a]!=null&&typeof e[a]=="object"?n[a]=R(e[a]):n[a]=e[a]}return n},ze=R,M=e=>e?(e.uri?[e.uri]:[]).concat(e.identifier||[]):[],S=(e,t)=>{if(e==null&&t==null)return!0;const r=i=>i.replace("http://").replace("https://");let n=M(e).map(r),a=M(t).map(r);return c.intersection(n,a).length>0},Te=S,Re=S,_e=S,Me=e=>c.get(e,"type",[]).includes("http://www.w3.org/2004/02/skos/core#Concept")||c.get(e,"inScheme")!=null||c.get(e,"topConceptOf")!=null,ae=e=>c.get(e,"type",[]).includes("http://www.w3.org/2004/02/skos/core#ConceptScheme"),oe=(e,t)=>{if(!e||!t)return!1;for(let r of t)if(S(e,r))return!0;return!1},Ne=oe,Pe=(e,t=!1)=>e.sort((r,n)=>{let a=c.get(r,"notation[0]"),i=c.get(n,"notation[0]");if(a&&i&&(a=a.toLowerCase(),i=i.toLowerCase()),t&&(a=parseFloat(a)||a,i=parseFloat(i)||i),(!a||!i||a==i)&&(a=r.uri,i=n.uri),a&&i){if(a>i)return 1;if(a<i)return-1}return 0}),Ue=e=>{let t=["notation[0]",["prefLabel.de","prefLabel.en"],"uri"];return e.sort((r,n)=>{for(let a of t){let i,o;if(Array.isArray(a))for(let s of a)i=i||c.get(r,s),o=o||c.get(n,s);else i=c.get(r,a),o=c.get(n,a);if(i!=null&&o!=null){if(i=i.toLowerCase(),o=o.toLowerCase(),i>o)return 1;if(i<o)return-1}}return 0})},Be=e=>{let t=c.pick(R(e),["from","to","fromScheme","toScheme","creator","contributor","type","created","modified","note","identifier","uri","partOf","mappingRelevance"]);for(let r of[t.from,t.to])c.forOwn(r,(n,a)=>{let i=[];for(let o of n)i.push(c.pick(o,["uri","notation"]));r[a]=i});return t.fromScheme&&(t.fromScheme=c.pick(t.fromScheme,["uri","notation"])),t.toScheme&&(t.toScheme=c.pick(t.toScheme,["uri","notation"])),t.partOf&&(t.partOf=t.partOf.map(r=>c.pick(r,["uri"]))),t},se=te,$=function(e){for(let t of se)if(e==t.uri)return t;return null},ce=$("http://www.w3.org/2004/02/skos/core#mappingRelation"),De=function(e,t=ce){let r;return Array.isArray(e)&&e.length>0?r=e[0]:r=e,$(r)||t},Ie=(e,t={})=>{const{language:r}=t;let n=k(e,"from.memberSet.0.notation.0"),a=k(e,"to.memberSet.0.notation.0");n=n!==null?n:"",a=a!==null?a:"";let i=$(k(e,"type.0"));i=i?i.SHORT:"";let o="",s="",f="";return r&&(o=k(e,`from.memberSet.0.prefLabel.${r}`),s=k(e,`to.memberSet.0.prefLabel.${r}`),f=k(e,`creator.0.prefLabel.${r}`)),{fromNotation:n,toNotation:a,fromLabel:o,toLabel:s,type:i,creator:f}},je=(e={})=>{const t=e.delimiter||",",r=e.quoteChar||'"',n=e.lineTerminator||`
`,a=r+r,i=o=>r+(o==null?"":o.split(r).join(a))+r;return o=>o.map(i).join(t)+n},C=(e,t)=>{let r=[];for(let n of["from","to"])(t==null||n===t)&&(r=r.concat(c.get(e,`${n}.memberSet`)||c.get(e,`${n}.memberChoice`)||c.get(e,`${n}.memberList`)||[]));return r.filter(n=>n!=null)},qe=(e={})=>{const t=je(e),r=e.language||"en";e.type==null&&(e.type=!0);const n=o=>{o=o||[];let s=[];for(let f of["from","to"]){e.schemes&&s.push(`${f}Scheme`);let l=Math.max(...o.map(u=>C(u,f).length),1);for(let u=0;u<l;u+=1)s.push(`${f}Notation${u?u+1:""}`),e.labels&&s.push(`${f}Label${u?u+1:""}`)}return e.type&&s.push("type"),e.creator&&s.push("creator"),t(s)},a=(o,s={})=>{let f=[];for(let l of["from","to"]){e.schemes&&f.push(c.get(o,`${l}Scheme.notation[0]`,""));const u=C(o,l);let m=s[`${l}Count`];m==null&&(m=u.length),m=Math.max(m,1);for(let w=0;w<m;w+=1)f.push(c.get(u[w],"notation[0]","")),e.labels&&f.push(c.get(u[w],`prefLabel.${r}`,""))}return e.type&&f.push(c.get($(c.get(o,"type[0]")),"SHORT","")),e.creator&&f.push(c.get(o,`creator[0].prefLabel.${r}`)),t(f)};return{header:n,fromMapping:a,fromMappings:(o,s={header:!0})=>{let f="";s.header&&(f+=n(o));const l={fromCount:Math.max(...o.map(u=>C(u,"from").length)),toCount:Math.max(...o.map(u=>C(u,"to").length))};for(let u of o)f+=a(u,l);return f}}};function He(e,t){return c.isEqualWith(e,t,(r,n,a)=>{let i={[a]:r},o={[a]:n};if(a=="from"||a=="to")return c.isEqualWith(Object.getOwnPropertyNames(c.get(r,a,{})),Object.getOwnPropertyNames(c.get(n,a,{})))?c.isEqualWith(C(i,a),C(o,a),(s,f,l)=>{if(l!=null)return S(s,f)}):!1;if(a=="fromScheme"||a=="toScheme")return S(r,n)})}const{objectTypes:Ve,guessObjectType:N}=be,Ze=(e,t)=>{let r=N(e),n=N(t);return!(r&&n&&r!=n)},fe=e=>{Array.isArray(e)&&e.sort((t,r)=>t===null?1:r===null?-1:0)},ue=(e,t)=>(!e||!t||((Array.isArray(e.identifier)||Array.isArray(t.identifier))&&(e.identifier=c.union(e.identifier||[],t.identifier||[])),!e.uri&&t.uri&&(e.uri=t.uri),e.uri&&t.uri&&e.uri!=t.uri&&!(e.identifier||[]).includes(t.uri)&&(e.identifier=(e.identifier||[]).concat([t.uri])),Array.isArray(e.identifier)&&e.uri&&(e.identifier=e.identifier.filter(r=>r!==e.uri)),(e.identifier||[]).length==0&&delete e.identifier,fe(e.identifier)),e),le=(e,t,r)=>{if(!e||!t)return e||t;r=r||{};let n=r._path||"",a=r.detectMismatch||[],i=r.skipPaths||[],o={};return c.forOwn(e,(s,f)=>{if(!i.includes(n+f))if(Array.isArray(s)&&Array.isArray(t[f]))o[f]=c.unionWith(s,t[f],(l,u)=>c.isObject(l)&&c.isObject(u)?S(l,u):l===u),fe(o[f]);else if(c.isObject(s)&&c.isObject(t[f]))o[f]=le(s,t[f],Object.assign({_path:`${n}${f}.`},r));else{if(s&&t[f]&&a.includes(n+f)&&!c.isEqualWith(s,t[f]))throw new Error("Property mismatch in "+n+f);o[f]=s}}),c.forOwn(t,(s,f)=>{e[f]||(o[f]=s)}),n==""&&c.omitMod(o,i),r.mergeUris&&ue(o,t),o},P=e=>Array.isArray(e)?e.map(t=>P(t)):c.isObject(e)?(c.forOwn(e,(t,r)=>{e[r]=P(t)}),e):c.isString(e)?e.normalize():e;let We=e=>{var t=/^[A-Za-z][A-Za-z0-9+\-.]*:(?:\/\/(?:(?:[A-Za-z0-9\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\.[A-Za-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\/(?:(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\?(?:[A-Za-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*)?(?:#(?:[A-Za-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*)?$/;return e.match(t)!==null},Ge={mappingsByConcepts:(e,t,r)=>{let n=["memberSet","memberList","memberChoice"],a,i;for(let o of n)a=a||c.get(e,r+"."+o+"[0].notation[0]"),i=i||c.get(t,r+"."+o+"[0].notation[0]");return a==null||a<i?-1:i==null||a>i?1:0}};const Xe=(e,t)=>!e||!t?!1:[e.uri].concat(Object.values(e.identities||{}).map(r=>r.uri)).filter(r=>r!=null).includes(c.get(t,"creator[0].uri")),Je=re,Ke=ie;function Qe(e,t){let r;if(e&&e.notation&&e.notation.length)r=e.notation[0],(ae(e)||t=="scheme")&&(r=r.toUpperCase());else if(e&&e.inScheme&&e.inScheme[0]&&e.uri)try{r=new Je(e&&e.inScheme&&e.inScheme[0]).notationFromUri(e.uri)}catch{}return r||""}function D(e,t,{language:r}={}){let n=e&&t?e[t]:e;return n&&(n[r]||(r=Ke.selectLanguage(n),r))?n[r]:null}function Ye(e,t={}){t=t||{};const r=t.fallbackToUri==null?!0:t.fallbackToUri;return c.get(e,`prefLabel.${t.language}`)||D(e,"prefLabel",t)||(r&&e&&e.uri?e.uri:"")}function et(e,t={}){t=t||{};let r=c.get(e,`definition.${t.language}`)||D(e,"definition",t)||[];return c.isString(r)&&(r=[r]),r}function tt(e){return c.get(e,"stored",c.get(e,"constructor.stored",c.get(e,"provider.constructor.stored",!1)))}function rt(e){return c.isString(e.creator)?e.creator:e.creator&&e.creator.id}function nt(e){return c.get(e,"creator.name")||""}function it(e,t){return!!(e&&c.isString(e.creator)?t&&t.includes(e.creator):t&&e.creator&&t.includes(e.creator.id))}var at={addContext:xe,clean:B,cleanJSKOS:Fe,copyDeep:R,deepCopy:ze,getAllUris:M,compare:S,compareObjects:Te,compareSchemes:Re,compareConcepts:_e,isConcept:Me,isScheme:ae,isContainedIn:oe,isSchemeInList:Ne,sortConcepts:Pe,sortSchemes:Ue,minifyMapping:Be,mappingTypes:se,mappingTypeByUri:$,mappingTypeByType:De,flattenMapping:Ie,mappingCSV:qe,defaultMappingType:ce,conceptsOfMapping:C,compareMappingsDeep:He,objectTypes:Ve,guessObjectType:N,matchObjectTypes:Ze,mergeUris:ue,merge:le,normalize:P,isValidUri:We,compareFunctions:Ge,userOwnsMapping:Xe,notation:Qe,languageMapContent:D,prefLabel:Ye,definition:et,mappingRegistryIsStored:tt,annotationCreatorUri:rt,annotationCreatorName:nt,annotationCreatorMatches:it};const ot=ve,st=at,ct=re,ft=ie;var q=Object.assign({ConceptScheme:ct,languagePreference:ft},ot,st),gt=he({__proto__:null,default:q},[q]);function ut(e){let t=new Date(e);if(t instanceof Date&&!isNaN(t)){if(e.length<10)return e;let r={year:"numeric",month:"short",day:"numeric"};return e.length>10&&(r=Object.assign({hour:"2-digit",minute:"2-digit",second:"2-digit"},r)),t.toLocaleString(void 0,r)}else return e}function lt(e,t=!1){const r=n=>{for(const a of e()){const i=(a.elements||[]).reduce((o,s)=>o||s&&s.contains(n.target),!1);(t||!i)&&a.handler({event:n,isInside:i})}};pe(()=>{document.addEventListener("click",r)}),de(()=>{document.removeEventListener("click",r)})}function pt(e,t,r){var n;return function(){var a=this,i=arguments,o=function(){n=null,r||e.apply(a,i)},s=r&&!n;clearTimeout(n),n=setTimeout(o,t),s&&e.apply(a,i)}}function dt(e,{voc:t=!1,scheme:r}){return async n=>t?e.vocSuggest({search:n}):e.suggest({search:n,scheme:r})}const L=H(null),ht={draggedItem:L,dragstart(e){L.value=e},dragend(){L.value=null},addDropzone(e,t){const r=H(!1);let n;const a=f=>{f.preventDefault()},i=f=>{n=f.target,r.value=!0},o=f=>{n===f.target&&(r.value=!1)},s=(f,...l)=>{f.preventDefault(),L.value&&t(L.value,...l),r.value=!1};return e&&(e.addEventListener("dragover",a),e.addEventListener("dragenter",i),e.addEventListener("dragleave",o),e.addEventListener("drop",s)),{dragover:a,dragenter:i,dragleave:o,drop:s,isDraggingOver:r}}};var wt=Object.freeze(Object.defineProperty({__proto__:null,dateToString:ut,addClickHandlers:lt,debounce:pt,cdkRegistryToSuggestFunction:dt,dragAndDrop:ht},Symbol.toStringTag,{value:"Module"}));export{gt as a,lt as b,pt as c,ht as d,dt as e,q as j,wt as u};
