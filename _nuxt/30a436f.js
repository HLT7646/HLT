(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{1177:function(e,t,o){"use strict";(function(e){t.a={name:"ContentfulRevisionTag",data:()=>({json:[]}),async fetch(){try{const t="xenophilius:lovegood",o=e.from(t).toString("base64"),n="/"===(null==this?void 0:this.$route.path),r=this.$route.path.split("/").filter(Boolean).pop();if(!r&&!n)return;const l=await fetch(`https://the-quibbler.ext.production.bollandbranch.io/api/content/${n?"homepage":r}`,{method:"get",headers:{Authorization:"Basic "+o}}),c=await l.json();this.json=null!=c?c:[]}catch(e){console.warn("Encountered error fetching contentful rev from the build service:"),console.warn(e),this.json=[]}},computed:{parsedJson(){var e;if(null==this||!this.json||0===(null==this||null===(e=this.json)||void 0===e?void 0:e.length))return null;const t=JSON.parse(this.json),o={publishedVersion:null==t?void 0:t.publishedVersion,publishedAt:null==t?void 0:t.publishedAt};return JSON.stringify(o)}}}}).call(this,o(119).Buffer)},1178:function(e,t,o){"use strict";var n=o(1),r=o(1179);t.a=e=>({data:()=>({schema:{}}),computed:{...Object(n.c)("space",["getMetatag","getMetafield"]),...Object(n.c)("inventory",["getVariantAvailability"]),fetchLocalBusiness(){var e=this.getMetafield("seo-details","localBusinessImages")||"";e=e.length>0?e.split(","):[];var address=(this.getMetafield("seo-details","localBusinessAddress")||"").split(",");return{url:this.getMetafield("seo-details","localBusinessUrl")||"",image:e,address:{"@type":"PostalAddress",streetAddress:(address[0]||"").trim(),addressLocality:(address[1]||"").trim(),addressRegion:(address[2]||"").trim(),addressCountry:(address[3]||"").trim(),postalCode:(address[4]||"").trim()}}},fetchOrganization(){return{logo:this.getMetafield("seo-details","organizationLogo")||"",image:this.getMetafield("seo-details","organizationImage")||"",url:this.getMetafield("seo-details","organizationUrl")||""}},content(){var e,t;return null!==(e=this.article)&&void 0!==e&&e.fields?Object(r.documentToPlainTextString)(this.article.fields.content):null!==(t=this.article)&&void 0!==t&&t.content?this.article.content:""}},created(){const image=this.getMetatag("og:image");this.product&&this.product.metafields&&this.yotpo(this.product);var e=this.fetchLocalBusiness,t=this.fetchOrganization;this.schema={...this.article&&{article:{"@type":"Article",articleBody:this.strip(this.content),mainEntityOfPage:{"@type":"WebPage","@id":`https://${this.$store.state.space.domain}${this.$route.path}`},headline:this.article.title,...this.article.excerpt&&{description:this.article.excerpt},...this.article.featuredMedia&&{image:[this.article.featuredMedia.src]},...this.article.publishDate&&{datePublished:new Date(1e3*this.article.publishDate).toISOString()},...this.article.createdAt&&{dateCreated:new Date(1e3*this.article.createdAt).toISOString()},...this.article.updatedAt&&{dateModified:new Date(1e3*this.article.updatedAt).toISOString()},...this.article.author&&{author:{"@type":"Person",name:`${this.article.author.firstName} ${this.article.author.lastName}`}},publisher:{"@type":"Organization",name:this.$store.state.space.name,...image&&{logo:{"@type":"ImageObject",url:image.value}}}}},localBusiness:{"@type":"LocalBusiness",name:"Boll & Branch",url:e.url,email:"help@bollandbranch.com",image:e.image,address:e.address},webSite:{"@type":"WebSite",name:"Boll & Branch",url:t.url,potentialAction:{"@type":"SearchAction",target:"https://www.bollandbranch.com/search?query={search_term_string}","query-input":"required name=search_term_string"}},organization:{"@type":"Organization","@id":"https://www.bollandbranch.com#organization",name:"Boll & Branch",url:t.url,logo:t.logo,image:t.image,sameAs:["https://www.facebook.com/bollandbranch","https://www.instagram.com/bollandbranch","https://twitter.com/bollandbranch","https://www.youtube.com/user/BollBranch/","https://www.linkedin.com/company/boll-&-branch","https://www.pinterest.com/bollandbranch/"]}}},methods:{strip:html=>"string"==typeof html&&html.replace(/<[^>]*>?/gm,""),yotpo(e){var t={};return e.metafields.forEach((e=>{"yotpo"===e.namespace&&(t[e.key]=e.value)})),t},upsertProduct(e){var t,o;var n={};this.product&&this.product.metafields&&(n=this.yotpo(this.product));var r=this.fetchOrganization;this.schema.product={"@type":"Product",name:this.product.content.title,url:`${r.url}${this.$route.path}`,...this.product.content.featuredMedia&&{image:[this.product.content.featuredMedia.src]},description:this.strip(this.product.content.description),brand:{"@type":"Thing",name:this.product.vendor},...n&&(null===(t=n)||void 0===t?void 0:t.reviews_average)&&(null===(o=n)||void 0===o?void 0:o.reviews_count)&&{aggregateRating:{"@type":"AggregateRating",ratingValue:n.reviews_average,reviewCount:n.reviews_count}},...this.product.variants&&{offers:this.product.variants.map((e=>({"@type":"Offer",availability:"http://schema.org/"+(this.getVariantAvailability(null==e?void 0:e.sourceEntryId)?"InStock":"OutOfStock"),name:e.title,sku:e.sku,price:e.price,priceCurrency:e.priceCurrency,url:`https://www.bollandbranch.com${this.$route.path}`})))}}}},jsonld(){this.product&&this.upsertProduct(this.product);var t={"@context":"http://schema.org","@graph":[]};return e.split(",").forEach((e=>{var o;return t["@graph"].push(null!==(o=this.schema[e.trim()])&&void 0!==o?o:{})})),t}})},1179:function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==e?e:"undefined"!=typeof self?self:{};function n(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function r(e,t){return e(t={exports:{}},t.exports),t.exports}var l=r((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.BLOCKS=void 0,function(e){e.DOCUMENT="document",e.PARAGRAPH="paragraph",e.HEADING_1="heading-1",e.HEADING_2="heading-2",e.HEADING_3="heading-3",e.HEADING_4="heading-4",e.HEADING_5="heading-5",e.HEADING_6="heading-6",e.OL_LIST="ordered-list",e.UL_LIST="unordered-list",e.LIST_ITEM="list-item",e.HR="hr",e.QUOTE="blockquote",e.EMBEDDED_ENTRY="embedded-entry-block",e.EMBEDDED_ASSET="embedded-asset-block",e.TABLE="table",e.TABLE_ROW="table-row",e.TABLE_CELL="table-cell",e.TABLE_HEADER_CELL="table-header-cell"}(t.BLOCKS||(t.BLOCKS={}))}));n(l);l.BLOCKS;var c=r((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.INLINES=void 0,function(e){e.HYPERLINK="hyperlink",e.ENTRY_HYPERLINK="entry-hyperlink",e.ASSET_HYPERLINK="asset-hyperlink",e.EMBEDDED_ENTRY="embedded-entry-inline"}(t.INLINES||(t.INLINES={}))}));n(c);c.INLINES;var f=r((function(e,t){var o;Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.BOLD="bold",e.ITALIC="italic",e.UNDERLINE="underline",e.CODE="code",e.SUPERSCRIPT="superscript",e.SUBSCRIPT="subscript"}(o||(o={})),t.default=o}));n(f);var d=r((function(e,t){var n,r=o&&o.__spreadArray||function(e,t,o){if(o||2===arguments.length)for(var n,i=0,r=t.length;i<r;i++)!n&&i in t||(n||(n=Array.prototype.slice.call(t,0,i)),n[i]=t[i]);return e.concat(n||Array.prototype.slice.call(t))},d=o&&o.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.V1_MARKS=t.V1_NODE_TYPES=t.TEXT_CONTAINERS=t.HEADINGS=t.CONTAINERS=t.VOID_BLOCKS=t.TABLE_BLOCKS=t.LIST_ITEM_BLOCKS=t.TOP_LEVEL_BLOCKS=void 0;var h=d(f);t.TOP_LEVEL_BLOCKS=[l.BLOCKS.PARAGRAPH,l.BLOCKS.HEADING_1,l.BLOCKS.HEADING_2,l.BLOCKS.HEADING_3,l.BLOCKS.HEADING_4,l.BLOCKS.HEADING_5,l.BLOCKS.HEADING_6,l.BLOCKS.OL_LIST,l.BLOCKS.UL_LIST,l.BLOCKS.HR,l.BLOCKS.QUOTE,l.BLOCKS.EMBEDDED_ENTRY,l.BLOCKS.EMBEDDED_ASSET,l.BLOCKS.TABLE],t.LIST_ITEM_BLOCKS=[l.BLOCKS.PARAGRAPH,l.BLOCKS.HEADING_1,l.BLOCKS.HEADING_2,l.BLOCKS.HEADING_3,l.BLOCKS.HEADING_4,l.BLOCKS.HEADING_5,l.BLOCKS.HEADING_6,l.BLOCKS.OL_LIST,l.BLOCKS.UL_LIST,l.BLOCKS.HR,l.BLOCKS.QUOTE,l.BLOCKS.EMBEDDED_ENTRY,l.BLOCKS.EMBEDDED_ASSET],t.TABLE_BLOCKS=[l.BLOCKS.TABLE,l.BLOCKS.TABLE_ROW,l.BLOCKS.TABLE_CELL,l.BLOCKS.TABLE_HEADER_CELL],t.VOID_BLOCKS=[l.BLOCKS.HR,l.BLOCKS.EMBEDDED_ENTRY,l.BLOCKS.EMBEDDED_ASSET],t.CONTAINERS=((n={})[l.BLOCKS.OL_LIST]=[l.BLOCKS.LIST_ITEM],n[l.BLOCKS.UL_LIST]=[l.BLOCKS.LIST_ITEM],n[l.BLOCKS.LIST_ITEM]=t.LIST_ITEM_BLOCKS,n[l.BLOCKS.QUOTE]=[l.BLOCKS.PARAGRAPH],n[l.BLOCKS.TABLE]=[l.BLOCKS.TABLE_ROW],n[l.BLOCKS.TABLE_ROW]=[l.BLOCKS.TABLE_CELL,l.BLOCKS.TABLE_HEADER_CELL],n[l.BLOCKS.TABLE_CELL]=[l.BLOCKS.PARAGRAPH],n[l.BLOCKS.TABLE_HEADER_CELL]=[l.BLOCKS.PARAGRAPH],n),t.HEADINGS=[l.BLOCKS.HEADING_1,l.BLOCKS.HEADING_2,l.BLOCKS.HEADING_3,l.BLOCKS.HEADING_4,l.BLOCKS.HEADING_5,l.BLOCKS.HEADING_6],t.TEXT_CONTAINERS=r([l.BLOCKS.PARAGRAPH],t.HEADINGS,!0),t.V1_NODE_TYPES=[l.BLOCKS.DOCUMENT,l.BLOCKS.PARAGRAPH,l.BLOCKS.HEADING_1,l.BLOCKS.HEADING_2,l.BLOCKS.HEADING_3,l.BLOCKS.HEADING_4,l.BLOCKS.HEADING_5,l.BLOCKS.HEADING_6,l.BLOCKS.OL_LIST,l.BLOCKS.UL_LIST,l.BLOCKS.LIST_ITEM,l.BLOCKS.HR,l.BLOCKS.QUOTE,l.BLOCKS.EMBEDDED_ENTRY,l.BLOCKS.EMBEDDED_ASSET,c.INLINES.HYPERLINK,c.INLINES.ENTRY_HYPERLINK,c.INLINES.ASSET_HYPERLINK,c.INLINES.EMBEDDED_ENTRY,"text"],t.V1_MARKS=[h.default.BOLD,h.default.CODE,h.default.ITALIC,h.default.UNDERLINE]}));n(d);d.V1_MARKS,d.V1_NODE_TYPES,d.TEXT_CONTAINERS,d.HEADINGS,d.CONTAINERS,d.VOID_BLOCKS,d.TABLE_BLOCKS,d.LIST_ITEM_BLOCKS,d.TOP_LEVEL_BLOCKS;var h=r((function(e,t){Object.defineProperty(t,"__esModule",{value:!0})}));n(h);var m=r((function(e,t){Object.defineProperty(t,"__esModule",{value:!0})}));n(m);var _=r((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var o={nodeType:l.BLOCKS.DOCUMENT,data:{},content:[{nodeType:l.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"",marks:[],data:{}}]}]};t.default=o}));n(_);var E=r((function(e,t){function o(e,t){for(var o=0,n=Object.keys(e);o<n.length;o++){if(t===e[n[o]])return!0}return!1}Object.defineProperty(t,"__esModule",{value:!0}),t.isText=t.isBlock=t.isInline=void 0,t.isInline=function(e){return o(c.INLINES,e.nodeType)},t.isBlock=function(e){return o(l.BLOCKS,e.nodeType)},t.isText=function(e){return"text"===e.nodeType}}));n(E);E.isText,E.isBlock,E.isInline;var L=r((function(e,t){var n=o&&o.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var desc=Object.getOwnPropertyDescriptor(t,o);desc&&!("get"in desc?!t.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,desc)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),r=o&&o.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),L=o&&o.__exportStar||function(e,t){for(var p in e)"default"===p||Object.prototype.hasOwnProperty.call(t,p)||n(t,e,p)},S=o&&o.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return r(t,e),t},O=o&&o.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.helpers=t.EMPTY_DOCUMENT=t.MARKS=t.INLINES=t.BLOCKS=void 0,Object.defineProperty(t,"BLOCKS",{enumerable:!0,get:function(){return l.BLOCKS}}),Object.defineProperty(t,"INLINES",{enumerable:!0,get:function(){return c.INLINES}}),Object.defineProperty(t,"MARKS",{enumerable:!0,get:function(){return O(f).default}}),L(d,t),L(h,t),L(m,t),Object.defineProperty(t,"EMPTY_DOCUMENT",{enumerable:!0,get:function(){return O(_).default}});var w=S(E);t.helpers=w}));n(L);var S=L.helpers;L.EMPTY_DOCUMENT,L.MARKS,L.INLINES,L.BLOCKS;t.documentToPlainTextString=function e(t,o){return void 0===o&&(o=" "),t&&t.content?t.content.reduce((function(n,r,i){var l;if(S.isText(r))l=r.value;else if((S.isBlock(r)||S.isInline(r))&&!(l=e(r,o)).length)return n;var c=t.content[i+1];return n+l+(c&&S.isBlock(c)?o:"")}),""):""}}).call(this,o(54))},1182:function(e,t,o){"use strict";var n=o(1177).a,r=o(0),component=Object(r.a)(n,(function(){var e=this,t=e._self._c;return t("div",[e.parsedJson?t("script",{attrs:{"data-contentful-revisions":e.parsedJson}}):e._e()])}),[],!1,null,"09959f5b",null);t.a=component.exports},1196:function(e,t,o){"use strict";var n=o(1);t.a={methods:{...Object(n.b)("banner",["setVisibleHolidaySection"]),checkVisibleHolidaySection(){const e=this,t=document.querySelectorAll(".collection-grid"),o=new IntersectionObserver((function(t){const o=t.length>0?t.length-1:0;if(!0===t[o].isIntersecting){var n;const r=null===(n=t[o].target)||void 0===n||null===(n=n.previousElementSibling)||void 0===n?void 0:n.getAttribute("id");e.visibleHolidaySection!==r&&e.setVisibleHolidaySection(r)}}),{threshold:[0]});t.forEach((e=>{o.observe(e)}))}},computed:{...Object(n.e)("banner",["visibleHolidaySection"])}}},1262:function(e,t,o){var content=o(1422);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(3).default)("cccb154e",content,!0,{sourceMap:!1})},1421:function(e,t,o){"use strict";o(1262)},1422:function(e,t,o){var n=o(2),r=o(4),l=o(5),c=o(6),f=o(7),d=o(8),h=o(9),m=o(10),_=o(11),E=o(12),L=o(13),S=o(14),O=o(15),w=o(16),y=o(17),v=o(18),B=o(19),C=o(20),I=o(21),A=o(22),T=o(23),K=o(24),N=o(25),x=o(26),D=o(27),k=o(28),z=o(29),M=o(30),P=o(31),H=o(32),R=o(33),j=o(34),G=n((function(i){return i[1]})),U=r(l),V=r(c),Y=r(f),$=r(d),J=r(h),W=r(m),Q=r(_),X=r(E),F=r(L),Z=r(S),ee=r(O),te=r(w),ie=r(y),oe=r(v),ne=r(B),re=r(C),ae=r(I),le=r(A),se=r(T),ce=r(K),fe=r(N),de=r(x),ue=r(D),he=r(k),ge=r(z),pe=r(M),me=r(P),be=r(H),_e=r(R),Ee=r(j);G.push([e.i,'.bg--cream{background-color:#fffefb}.bg--mid-cream{background-color:#f9f8f3}.bg--dark-cream{background-color:#efede7}.bg--sea{background-color:#0d2531}.bg--navy{background-color:#111637}.bg--deep-teal{background-color:#0b363f}.bg--deep-beige{background-color:#e6d0c0}.bg--light-beige{background-color:#f2e9dc}.bg--warm-grey{background-color:#f7f4f0}.bg--stone{background-color:#a39e99}.bg--slate{background-color:#8ea1a8}.bg--grey-cloud{background-color:#b9c1c4}.bg--cool-grey{background-color:#d9d9d6}.bg--label-grey{background-color:#777779}.bg--border-grey{background-color:#979797}.bg--border-active{background-color:rgba(255,255,255,.3)}.bg--border-number{background-color:#c4c2c0}.bg--border-filter{background-color:#efefee}.bg--bg-secondary-active{background-color:rgba(45,68,80,.35)}.bg--hover-button{background-color:#2d4450}.bg--hover-secondary-button{background-color:rgba(45,68,80,.15)}.bg--disabled-grey{background-color:#ecebe8}.bg--filter-beige{background-color:#e1ddd1}.bg--sale{background-color:#bf5757}.bg--error{background-color:#bb4c4c}.bg--black{background-color:#000}.bg--white{background-color:#fff}.bg--firefly_light{background-color:#132e3b}.bg--firefly_lighter{background-color:#34454f}.bg--red{background-color:#8a171a}.bg--tower_gray{background-color:#173e35}.bg--pearl{background-color:#fffdfb}.bg--pampas_dark{background-color:#f1eee8}.bg--ivory{background-color:#fffffb}.bg--pampas_light{background-color:#f8f8f3}.bg--pampas{background-color:#ede9e5}.bg--heathered{background-color:#b8b29a}.bg--progress{background-color:#eeeade}.bg--dark_grey{background-color:#757577}.bg--black_grey{background-color:#454545}.bg--light_grey{background-color:#ebebeb}.bg--firefly_b{background-color:#0c2530}.bg--dune{background-color:#cdc1b1}.bg--dusty_grey{background-color:#959595}@font-face{font-family:"basis_grotesque_prolight";src:url('+U+') format("woff2"),url('+V+') format("woff");font-weight:normal;font-style:normal}@font-face{font-family:"basis_grotesque_probold";src:url('+Y+') format("woff2"),url('+$+') format("woff");font-weight:normal;font-style:normal}@font-face{font-family:"basis_grotesque_proregular";src:url('+J+') format("woff2"),url('+W+') format("woff");font-weight:normal;font-style:normal}@font-face{font-family:"optibakerdanmarkoneregular";src:url('+Q+') format("woff2"),url('+X+') format("woff");font-weight:normal;font-style:normal}@font-face{font-family:"Aurelly Signature Alt";src:url('+F+') format("woff2"),url('+Z+') format("woff");font-weight:normal;font-style:normal}@font-face{font-family:"juana_regular";src:url('+ee+') format("woff2"),url('+te+') format("woff");font-weight:400;font-style:normal}@font-face{font-family:"louize_reg";src:url('+ie+') format("woff2"),url('+oe+') format("woff");font-weight:400;font-style:normal}@font-face{font-family:"louize_italic";src:url('+ne+') format("woff2"),url('+re+') format("woff");font-weight:400;font-style:normal}@font-face{font-family:"louize_bold";src:url('+ae+') format("woff2"),url('+le+') format("woff");font-weight:400;font-style:normal}@font-face{font-family:"louize_italic_bold";src:url('+se+') format("woff2"),url('+ce+') format("woff");font-weight:400;font-style:normal}@font-face{font-family:"fakt_reg";src:url('+fe+') format("woff2"),url('+de+') format("woff");font-weight:400;font-style:normal}@font-face{font-family:"fakt_med";src:url('+ue+') format("woff2"),url('+he+') format("woff");font-weight:500;font-style:normal}@font-face{font-family:"fakt_bold";src:url('+ge+') format("woff2"),url('+pe+') format("woff");font-weight:400;font-style:normal}@font-face{font-family:"fakt_blond";src:url('+me+') format("woff2"),url('+be+') format("woff");font-weight:400;font-style:normal}@font-face{font-family:"fakt_italic";src:url('+_e+') format("woff2"),url('+Ee+') format("woff");font-weight:400;font-style:normal}.email__title,.sh3,.sh2,.sh1{font-family:louize_reg,sans-serif}.large-title{font-family:louize_reg;font-size:3.75rem;font-weight:normal;letter-spacing:0;line-height:1.05;margin:0;font-size:60px}@media(min-width: 767px){.large-title{font-size:calc(7.7821011673vw + 0.3112840467px)}}@media(min-width: 1024px){.large-title{font-size:80px}}@media(min-width: 768px){.large-title{line-height:1.1875}}.h1{font-family:louize_reg;font-size:2.5rem;font-weight:normal;letter-spacing:0;line-height:1.05;margin:0;font-size:40px}@media(min-width: 767px){.h1{font-size:calc(8.560311284vw - 25.6575875486px)}}@media(min-width: 1024px){.h1{font-size:62px}}@media(min-width: 768px){.h1{line-height:1.0322580645}}.h2{font-family:louize_reg;font-size:2.25rem;font-weight:normal;letter-spacing:-0.01em;line-height:1.1111111111;margin:0;font-size:36px}@media(min-width: 767px){.h2{font-size:calc(7.0038910506vw - 17.719844358px)}}@media(min-width: 1024px){.h2{font-size:54px}}@media(min-width: 768px){.h2{line-height:1.0740740741}}.h3{font-family:louize_reg;font-size:1.875rem;font-weight:normal;letter-spacing:-0.01em;line-height:1.1;margin:0;font-size:30px}@media(min-width: 767px){.h3{font-size:calc(5.8365758755vw - 14.766536965px)}}@media(min-width: 1024px){.h3{font-size:45px}}@media(min-width: 768px){.h3{line-height:1.0714285714}}.h4{font-family:louize_reg;font-weight:normal;letter-spacing:-0.01em;line-height:1.1428571429;margin:0;font-size:28px}@media(min-width: 767px){.h4{font-size:calc(2.3346303502vw + 10.093385214px)}}@media(min-width: 1024px){.h4{font-size:34px}}@media(min-width: 768px){.h4{line-height:1.0588235294}}.h5{font-family:louize_reg;font-size:1.5rem;font-weight:normal;letter-spacing:-0.01em;line-height:1.0833333333;margin:0;font-size:24px}@media(min-width: 767px){.h5{font-size:calc(1.5564202335vw + 12.0622568093px)}}@media(min-width: 1024px){.h5{font-size:28px}}@media(min-width: 768px){.h5{line-height:1.1785714286}}.h6{font-family:louize_reg;font-size:1.125rem;font-weight:normal;letter-spacing:0;line-height:1.1428571429;margin:0;font-size:14px}@media(min-width: 767px){.h6{font-size:calc(1.5564202335vw + 2.0622568093px)}}@media(min-width: 1024px){.h6{font-size:18px}}@media(min-width: 768px){.h6{line-height:1.1666666667}}.sh1{font-size:1.375rem;font-weight:normal;letter-spacing:0;line-height:1.2727272727;margin:0;font-size:22px}@media(min-width: 767px){.sh1{font-size:calc(1.5564202335vw + 10.0622568093px)}}@media(min-width: 1024px){.sh1{font-size:26px}}@media(min-width: 768px){.sh1{line-height:1.2307692308}}.sh2{font-size:1.1rem;font-weight:normal;letter-spacing:0;line-height:1.4204545455;margin:0;font-size:17.6px}@media(min-width: 767px){.sh2{font-size:calc(0.9338521401vw + 10.4373540856px)}}@media(min-width: 1024px){.sh2{font-size:20px}}@media(min-width: 768px){.sh2{line-height:1.25}}.sh3{font-size:1rem;font-weight:normal;letter-spacing:0;line-height:1.5;margin:0;font-size:16px}@media(min-width: 767px){.sh3{font-size:calc(0.7782101167vw + 10.0311284047px)}}@media(min-width: 1024px){.sh3{font-size:18px}}@media(min-width: 768px){.sh3{line-height:1.4444444444}}.type{font-family:louize_reg;font-size:.875rem;font-weight:normal;letter-spacing:0;line-height:1.4285714286;margin:0;font-size:14px}@media(min-width: 767px){.type{font-size:calc(0.7782101167vw + 8.0311284047px)}}@media(min-width: 1024px){.type{font-size:16px}}@media(min-width: 768px){.type{line-height:1.5}}.type--small{font-size:.75rem;line-height:1.4166666667;font-size:12px}@media(min-width: 767px){.type--small{font-size:calc(0.7782101167vw + 6.0311284047px)}}@media(min-width: 1024px){.type--small{font-size:14px}}@media(min-width: 768px){.type--small{line-height:1.5714285714}}.type--large{font-size:.875rem;line-height:1.3333333333;font-size:18px}@media(min-width: 767px){.type--large{font-size:calc(2.3346303502vw + 0.093385214px)}}@media(min-width: 1024px){.type--large{font-size:24px}}@media(min-width: 768px){.type--large{line-height:1.2916666667}}.label{color:#757577;font-family:fakt_reg;font-size:.875rem;font-weight:normal;letter-spacing:0;line-height:1.4285714286;margin:0}@media(min-width: 768px){.label{line-height:1.5714285714}}.label--small{font-size:.75rem;line-height:1.4166666667}@media(min-width: 768px){.label--small{line-height:1.4166666667}}.label--large{font-size:.875rem}@media(min-width: 768px){.label--large{font-size:.875rem;line-height:1.4285714286}}.email__title{font-size:2.125rem;line-height:1.1176470588}@media(min-width: 1024px){.email__title{font-size:3.375rem;line-height:1.0740740741}}.page-content.helping-from-home{margin:0;background:#f7f4f0;position:relative;overflow:hidden}.page-content.stores{padding-top:0}',""]),G.locals={},e.exports=G},1547:function(e,t,o){"use strict";o.r(t);var n=o(1),r=o(1175),l=o(1189),c=o(36),f=o(265),d=o(1196),h=o(1178),m={components:{ContentfulRevisionTag:o(1182).a,PageContent:l.a},computed:{...Object(n.c)("space",["getMetatag"]),getHandleContainerName(){return`${this.computedHandle}-container`},computedHandle(){return this.handle||this.page&&this.page.handle}},mixins:[Object(f.a)("page"),Object(r.a)(),c.b,d.a,Object(h.a)("organization,webSite,localBusiness")],data:()=>({handle:null,page:null,noPageData:!1}),mounted(){this.noPageData&&this.$router.push("/404"),this.checkVisibleHolidaySection()},head(){var e,t,o,n,r;const l={},meta=[],title=(null===(e=this.page)||void 0===e||null===(e=e.fields)||void 0===e?void 0:e.metaTitle)||(null===(t=this.page)||void 0===t?void 0:t.title),c=null===(o=this.page)||void 0===o||null===(o=o.fields)||void 0===o?void 0:o.metaDescription,image=null===(n=this.page)||void 0===n||null===(n=n.fields)||void 0===n||null===(n=n.metaImage)||void 0===n||null===(n=n.fields)||void 0===n||null===(n=n.file)||void 0===n?void 0:n.url;if(l.title=title||(null===(r=this.getMetatag("title"))||void 0===r?void 0:r.value),title&&(meta.push({hid:"og:title",property:"og:title",content:title}),meta.push({hid:"twitter:title",property:"twitter:title",content:title})),c&&(meta.push({hid:"description",name:"description",content:c}),meta.push({hid:"og:description",property:"og:description",content:this.stripTags(c)}),meta.push({hid:"twitter:description",property:"twitter:description",content:this.stripTags(c)})),image){const e=this.transformContentfulImage(image);meta.push({hid:"og:image",property:"og:image",content:e,name:"image"}),meta.push({hid:"og:image:secure",property:"og:image:secure",content:e,name:"image"}),meta.push({hid:"twitter:image",property:"twitter:image",content:e})}return{...l,meta:meta}}},_=(o(1421),o(0)),component=Object(_.a)(m,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"page",class:e.getHandleContainerName},[e.page&&e.$metaInfo&&e.$metaInfo.title?t("h1",{staticClass:"visually-hidden",attrs:{"aria-hidden":"false","aria-live":"assertive","aria-atomic":"true"}},[e._v("\n    "+e._s(e.$metaInfo.title)+"\n  ")]):e._e(),e._v(" "),t("page-content",{attrs:{page:e.page}}),e._v(" "),t("contentful-revision-tag")],1)}),[],!1,null,null,null);t.default=component.exports}}]);