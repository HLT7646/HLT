(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{1176:function(t,e,n){"use strict";var o=n(1);e.a={computed:{...Object(o.c)("space",["getMetatag"])},head(){if(this.page){var t,e,n,o;const l={},meta=[],title=null===(t=this.page.fields)||void 0===t?void 0:t.metaTitle,r=null===(e=this.page.fields)||void 0===e?void 0:e.metaDescription,image=null===(n=this.page.fields)||void 0===n||null===(n=n.metaImage)||void 0===n||null===(n=n.fields)||void 0===n||null===(n=n.file)||void 0===n?void 0:n.url;return l.title=title||(null===(o=this.getMetatag("title"))||void 0===o?void 0:o.value),title&&(meta.push({hid:"og:title",property:"og:title",content:title}),meta.push({hid:"twitter:title",property:"twitter:title",content:title})),r&&(meta.push({hid:"description",name:"description",content:r}),meta.push({hid:"og:description",property:"og:description",content:r}),meta.push({hid:"twitter:description",property:"twitter:description",content:r})),image&&(meta.push({hid:"og:image",property:"og:image",content:image}),meta.push({hid:"og:image:secure",property:"og:image:secure",content:image}),meta.push({hid:"twitter:image",property:"twitter:image",content:image})),{...l,meta:meta}}}}},1177:function(t,e,n){"use strict";(function(t){e.a={name:"ContentfulRevisionTag",data:()=>({json:[]}),async fetch(){try{const e="xenophilius:lovegood",n=t.from(e).toString("base64"),o="/"===(null==this?void 0:this.$route.path),l=this.$route.path.split("/").filter(Boolean).pop();if(!l&&!o)return;const r=await fetch(`https://the-quibbler.ext.production.bollandbranch.io/api/content/${o?"homepage":l}`,{method:"get",headers:{Authorization:"Basic "+n}}),d=await r.json();this.json=null!=d?d:[]}catch(t){console.warn("Encountered error fetching contentful rev from the build service:"),console.warn(t),this.json=[]}},computed:{parsedJson(){var t;if(null==this||!this.json||0===(null==this||null===(t=this.json)||void 0===t?void 0:t.length))return null;const e=JSON.parse(this.json),n={publishedVersion:null==e?void 0:e.publishedVersion,publishedAt:null==e?void 0:e.publishedAt};return JSON.stringify(n)}}}}).call(this,n(119).Buffer)},1182:function(t,e,n){"use strict";var o=n(1177).a,l=n(0),component=Object(l.a)(o,(function(){var t=this,e=t._self._c;return e("div",[t.parsedJson?e("script",{attrs:{"data-contentful-revisions":t.parsedJson}}):t._e()])}),[],!1,null,"09959f5b",null);e.a=component.exports},1541:function(t,e,n){"use strict";n.r(e);var o=n(1175),l=n(1176),r=n(506),d=n(162),c=n(1189),h=n(1182),v={components:{ContentStoreLocator:r.a,ContentBannerModule:d.a,PageContent:c.a,ContentfulRevisionTag:h.a},computed:{pageTitle(){var t;return null===(t=this.page)||void 0===t||null===(t=t.fields)||void 0===t?void 0:t.title},bannerItems(){var t;return null===(t=this.page)||void 0===t||null===(t=t.fields)||void 0===t||null===(t=t.sections[0])||void 0===t||null===(t=t.fields)||void 0===t?void 0:t.items},height(){var t;return(null===(t=this.page)||void 0===t||null===(t=t.fields)||void 0===t||null===(t=t.sections[0])||void 0===t||null===(t=t.fields)||void 0===t?void 0:t.height)||465}},mixins:[Object(o.a)({pageHandle:"store-locations"}),l.a]},f=n(0),component=Object(f.a)(v,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"store-locator"},[t.pageTitle?e("h1",{staticClass:"visually-hidden",attrs:{"aria-hidden":"false","aria-live":"assertive","aria-atomic":"true"}},[t._v("\n    "+t._s(t.pageTitle)+"\n  ")]):t._e(),t._v(" "),e("page-content",{attrs:{page:t.page}}),t._v(" "),e("content-store-locator"),t._v(" "),e("contentful-revision-tag")],1)}),[],!1,null,null,null);e.default=component.exports}}]);