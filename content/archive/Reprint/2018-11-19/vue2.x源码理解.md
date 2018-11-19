---
title: 'vue2.x源码理解' 
date: 2018-11-19 2:30:10
hidden: true
slug: qzjvci1wlyk
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x4E5F;&#x4E0D;&#x77E5;&#x9053;&#x54EA;&#x80A1;&#x98CE;&#x6F6E;&#xFF0C;&#x94BB;&#x7814;&#x6E90;&#x7801;&#x7ADF;&#x6210;&#x4E86;&#x6DF1;&#x5165;&#x7406;&#x89E3;&#x7684;&#x6807;&#x914D;&#x3002;&#x6211;&#x53EA;&#x60F3;&#x8BF4;&#x4E00;&#x53E5;&#xFF0C;&#x8BF4;&#x7684;&#x5F88;&#x5BF9;</blockquote><h2 id="articleHeader0">&#x51C6;&#x5907;&#x5DE5;&#x4F5C;</h2><ol><li>&#x4ECE;GitHub&#x4E0A;&#x9762;&#x4E0B;&#x8F7D;vue&#x7684;&#x6E90;&#x7801;&#xFF08;<a href="https://github.com/vuejs/vue" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue</a>&#xFF09;</li><li>&#x4E86;&#x89E3;&#x4E0B;Flow,Flow &#x662F; facebook &#x51FA;&#x54C1;&#x7684; JavaScript &#x9759;&#x6001;&#x7C7B;&#x578B;&#x68C0;&#x67E5;&#x5DE5;&#x5177;&#x3002;Vue.js &#x7684;&#x6E90;&#x7801;&#x5229;&#x7528;&#x4E86; Flow &#x505A;&#x4E86;&#x9759;&#x6001;&#x7C7B;&#x578B;&#x68C0;&#x67E5;</li><li>vue.js &#x6E90;&#x7801;&#x76EE;&#x5F55;&#x8BBE;&#x8BA1;,vue.js&#x7684;&#x6E90;&#x7801;&#x90FD;&#x5728; src &#x76EE;&#x5F55;&#x4E0B;(\vue-dev\src)<br>src<br>&#x251C;&#x2500;&#x2500; compiler # &#x7F16;&#x8BD1;&#x76F8;&#x5173;<br>&#x251C;&#x2500;&#x2500; core # &#x6838;&#x5FC3;&#x4EE3;&#x7801;<br>&#x251C;&#x2500;&#x2500; platforms # &#x4E0D;&#x540C;&#x5E73;&#x53F0;&#x7684;&#x652F;&#x6301;<br>&#x251C;&#x2500;&#x2500; server # &#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;<br>&#x251C;&#x2500;&#x2500; sfc # .vue &#x6587;&#x4EF6;&#x89E3;&#x6790;<br>&#x251C;&#x2500;&#x2500; shared # &#x5171;&#x4EAB;&#x4EE3;&#x7801;<p><strong>core &#x76EE;&#x5F55;&#xFF1A;</strong>&#x5305;&#x542B;&#x4E86; Vue.js &#x7684;&#x6838;&#x5FC3;&#x4EE3;&#x7801;&#xFF0C;&#x5305;&#x62EC;&#x5185;&#x7F6E;&#x7EC4;&#x4EF6;&#x3001;&#x5168;&#x5C40; API &#x5C01;&#x88C5;&#xFF0C;Vue &#x5B9E;&#x4F8B;&#x5316;&#x3001;&#x89C2;&#x5BDF;&#x8005;&#x3001;&#x865A;&#x62DF; DOM&#x3001;&#x5DE5;&#x5177;&#x51FD;&#x6570;&#x7B49;&#x7B49;&#x3002;&#x8FD9;&#x91CC;&#x7684;&#x4EE3;&#x7801;&#x53EF;&#x8C13;&#x662F; Vue.js &#x7684;&#x7075;&#x9B42;</p><p><strong>platform&#x76EE;&#x5F55;&#xFF1A;</strong>Vue.js &#x662F;&#x4E00;&#x4E2A;&#x8DE8;&#x5E73;&#x53F0;&#x7684; MVVM &#x6846;&#x67B6;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x8DD1;&#x5728; web &#x4E0A;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x914D;&#x5408; weex &#x8DD1;&#x5728; natvie &#x5BA2;&#x6237;&#x7AEF;&#x4E0A;&#x3002;platform &#x662F; Vue.js &#x7684;&#x5165;&#x53E3;&#xFF0C;2 &#x4E2A;&#x76EE;&#x5F55;&#x4EE3;&#x8868; 2 &#x4E2A;&#x4E3B;&#x8981;&#x5165;&#x53E3;&#xFF0C;&#x5206;&#x522B;&#x6253;&#x5305;&#x6210;&#x8FD0;&#x884C;&#x5728; web &#x4E0A;&#x548C; weex &#x4E0A;&#x7684; Vue.js&#x3002;&#x6BD4;&#x5982;&#x73B0;&#x5728;&#x6BD4;&#x8F83;&#x706B;&#x70ED;&#x7684;mpvue&#x6846;&#x67B6;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x5728;&#x8FD9;&#x4E2A;&#x76EE;&#x5F55;&#x4E0B;&#x9762;&#x591A;&#x4E86;&#x4E00;&#x4E2A;&#x5C0F;&#x7A0B;&#x5E8F;&#x7684;&#x8FD0;&#x884C;&#x5E73;&#x53F0;&#x76F8;&#x5173;&#x5185;&#x5BB9;&#x3002;</p></li></ol><p><span class="img-wrap"><img data-src="/img/bVbeEBT?w=993&amp;h=365" src="https://static.alili.tech/img/bVbeEBT?w=993&amp;h=365" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><ol><li>vue2.0&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x5206;&#x4E3A;4&#x4E3B;&#x8981;&#x4E2A;&#x8FC7;&#x7A0B;:<br>4.1 create:&#x521B;&#x5EFA;---&#x5B9E;&#x4F8B;&#x5316;Vue(new Vue) &#x65F6;&#xFF0C;&#x4F1A;&#x5148;&#x8FDB;&#x884C;create&#x3002;<br>4.2 mount:&#x6302;&#x8F7D;---&#x6839;&#x636E;el, template, render&#x65B9;&#x6CD5;&#x7B49;&#x5C5E;&#x6027;&#xFF0C;&#x4F1A;&#x751F;&#x6210;DOM&#xFF0C;&#x5E76;&#x6DFB;&#x52A0;&#x5230;&#x5BF9;&#x5E94;&#x4F4D;&#x7F6E;&#x3002;<br>4.3 update:&#x66F4;&#x65B0;---&#x5F53;&#x6570;&#x636E;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x540E;&#xFF0C;&#x66F4;&#x65B0;DOM&#x3002;<br>4.4 destory:&#x9500;&#x6BC1;---&#x9500;&#x6BC1;&#x65F6;&#x6267;&#x884C;</li></ol><h2 id="articleHeader1">new Vue()&#x53D1;&#x751F;&#x4E86;&#x4EC0;&#x4E48;</h2><p>&#x5728;vue&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x4E0A;&#x7B2C;&#x4E00;&#x4E2A;&#x5C31;&#x662F; new Vue() &#x521B;&#x5EFA;&#x4E00;&#x4E2A;vue&#x5B9E;&#x4F8B;&#x51FA;&#x6765;&#xFF0C;&#x5BF9;&#x5E94;&#x5230;&#x6E90;&#x7801;&#x5728;\vue-dev\src\core\instance\index.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { initMixin } from &apos;./init&apos;
import { stateMixin } from &apos;./state&apos;
import { renderMixin } from &apos;./render&apos;
import { eventsMixin } from &apos;./events&apos;
import { lifecycleMixin } from &apos;./lifecycle&apos;
import { warn } from &apos;../util/index&apos;

function Vue (options) {
  if (process.env.NODE_ENV !== &apos;production&apos; &amp;&amp;
    !(this instanceof Vue)
  ) {
    warn(&apos;Vue is a constructor and should be called with the `new` keyword&apos;)
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { initMixin } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./init&apos;</span>
<span class="hljs-keyword">import</span> { stateMixin } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./state&apos;</span>
<span class="hljs-keyword">import</span> { renderMixin } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./render&apos;</span>
<span class="hljs-keyword">import</span> { eventsMixin } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./events&apos;</span>
<span class="hljs-keyword">import</span> { lifecycleMixin } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./lifecycle&apos;</span>
<span class="hljs-keyword">import</span> { warn } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../util/index&apos;</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Vue</span> (<span class="hljs-params">options</span>) </span>{
  <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">&apos;production&apos;</span> &amp;&amp;
    !(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Vue)
  ) {
    warn(<span class="hljs-string">&apos;Vue is a constructor and should be called with the `new` keyword&apos;</span>)
  }
  <span class="hljs-keyword">this</span>._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Vue</code></pre><p>&#x53EF;&#x4EE5;&#x901A;&#x8FC7;index.js&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x770B;&#x5230;&#xFF0C;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x4E00;&#x4E2A;function,&#x5728;es5&#x4E2D;&#x5B9E;&#x73B0;class&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x5728;function vue&#x4E2D;&#x8FD8;&#x52A0;&#x5165;&#x4E86;if&#x5224;&#x65AD;&#xFF0C;&#x8868;&#x793A;vue&#x5FC5;&#x987B;&#x901A;&#x8FC7;new&#x5173;&#x952E;&#x5B57;&#x8FDB;&#x884C;&#x5B9E;&#x4F8B;&#x5316;&#x3002;&#x8FD9;&#x91CC;&#x6709;&#x4E2A;&#x7591;&#x95EE;&#x5C31;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;vue&#x4E2D;&#x6CA1;&#x6709;&#x4F7F;&#x7528;es6&#x7684;&#x65B9;&#x5F0F;&#x8FDB;&#x884C;&#x5B9A;&#x4E49;&#xFF1F;&#x901A;&#x8FC7;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x5F97;&#x5230;&#x89E3;&#x7B54;&#x3002;</p><p>function vue&#x4E0B;&#x5B9A;&#x4E49;&#x4E86;&#x8BB8;&#x591A;Mixin&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#xFF0C;&#x5E76;&#x4E14;&#x628A;vue&#x7C7B;&#x5F53;&#x4F5C;&#x53C2;&#x6570;&#x4F20;&#x9012;&#x8FDB;&#x53BB;&#xFF0C;&#x4E0B;&#x9762;&#x6765;&#x8FDB;&#x5165;initMixin(Vue)&#x4E0B;&#xFF0C;&#x6765;&#x81EA;import { initMixin } from &apos;./init&apos;&#xFF0C;&#x9009;&#x53D6;&#x4E86;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function initMixin (Vue: Class&lt;Component&gt;) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== &apos;production&apos; &amp;&amp; config.performance &amp;&amp; mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initMixin</span> (<span class="hljs-params">Vue: Class&lt;Component&gt;</span>) </span>{
  Vue.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options?: Object</span>) </span>{
    <span class="hljs-keyword">const</span> vm: Component = <span class="hljs-keyword">this</span>
    <span class="hljs-comment">// a uid</span>
    vm._uid = uid++

    <span class="hljs-keyword">let</span> startTag, endTag
    <span class="hljs-comment">/* istanbul ignore if */</span>
    <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">&apos;production&apos;</span> &amp;&amp; config.performance &amp;&amp; mark) {
      startTag = <span class="hljs-string">`vue-perf-start:<span class="hljs-subst">${vm._uid}</span>`</span>
      endTag = <span class="hljs-string">`vue-perf-end:<span class="hljs-subst">${vm._uid}</span>`</span>
      mark(startTag)
    }</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;initMixin&#x65B9;&#x6CD5;&#x5C31;&#x662F;&#x5F80;vue&#x7684;&#x539F;&#x578B;&#x4E0A;&#x6302;&#x8F7D;&#x4E86;&#x4E00;&#x4E2A;_init&#x65B9;&#x6CD5;&#xFF0C;&#x5176;&#x4ED6;&#x7684;Mixin&#x4E5F;&#x662F;&#x540C;&#x7406;&#xFF0C;&#x90FD;&#x662F;&#x5F80;vue&#x7684;&#x539F;&#x578B;&#x4E0A;&#x6302;&#x8F7D;&#x5404;&#x79CD;&#x65B9;&#x6CD5;&#xFF0C;&#x800C;&#x6700;&#x5F00;&#x59CB;&#x521B;&#x5EFA;vue&#x7C7B;&#x65F6;&#x901A;&#x8FC7;es5 function&#x7684;&#x65B9;&#x5F0F;&#x521B;&#x5EFA;&#x4E5F;&#x662F;&#x4E3A;&#x4E86;&#x540E;&#x9762;&#x53EF;&#x4EE5;&#x66F4;&#x52A0;&#x7075;&#x6D3B;&#x64CD;&#x4F5C;&#xFF0C;&#x53EF;&#x4EE5;&#x5C06;&#x65B9;&#x6CD5;&#x5199;&#x5165;&#x5230;&#x5404;&#x4E2A;js&#x6587;&#x4EF6;&#xFF0C;&#x4E0D;&#x7528;&#x4E00;&#x6B21;&#x5199;&#x5728;&#x4E00;&#x4E2A;&#x4E0B;&#x9762;&#xFF0C;&#x66F4;&#x52A0;&#x65B9;&#x4FBF;&#x4EE3;&#x7801;&#x540E;&#x671F;&#x7684;&#x7EF4;&#x62A4;&#xFF0C;&#x8FD9;&#x4E2A;&#x4E5F;&#x662F;&#x9009;&#x62E9;es5&#x521B;&#x5EFA;&#x7684;&#x539F;&#x56E0;&#x3002;</p><p>&#x5F53;&#x8C03;&#x7528;new Vue&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E8B;&#x5B9E;&#x4E0A;&#x5C31;&#x8C03;&#x7528;&#x7684;Vue&#x539F;&#x578B;&#x4E0A;&#x7684;_init&#x65B9;&#x6CD5;.</p><p>vue &#x521D;&#x59CB;&#x5316;&#x4E3B;&#x8981;&#x5C31;&#x5E72;&#x4E86;&#x51E0;&#x4EF6;&#x4E8B;&#x60C5;&#xFF0C;&#x5408;&#x5E76;&#x914D;&#x7F6E;&#xFF0C;&#x521D;&#x59CB;&#x5316;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x521D;&#x59CB;&#x5316;&#x4E8B;&#x4EF6;&#x4E2D;&#x5FC3;&#xFF0C;&#x521D;&#x59CB;&#x5316;&#x6E32;&#x67D3;&#xFF0C;&#x521D;&#x59CB;&#x5316; data&#x3001;props&#x3001;computed&#x3001;watcher &#x7B49;&#x7B49;</p><h2 id="articleHeader2">Vue&#x7684;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x539F;&#x7406;</h2><p>&#x4ECE;index.js&#x5165;&#x53E3;&#x5206;&#x6790;&#x540E;&#xFF0C;&#x8D8A;&#x5F80;&#x91CC;&#x53D1;&#x73B0;&#x5404;&#x4E2A;&#x6587;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x5F15;&#x7528;&#x7406;&#x4E0D;&#x4E71;&#x526A;&#x8FD8;&#x4E71;&#xFF0C;&#x4E8E;&#x662F;&#x4E4E;&#x4ECE;&#x539F;&#x6765;&#x7684;&#x770B;&#x6E90;&#x7801;&#x53D8;&#x6210;&#x6A21;&#x4EFF;&#x7740;&#x5199;&#x96CF;&#x5F62;&#xFF0C;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x53EF;&#x80FD;&#x4F1A;&#x7406;&#x89E3;&#x7684;&#x66F4;&#x52A0;&#x6DF1;&#x523B;&#x4E00;&#x4E9B;&#xFF0C;&#x548C;&#x5927;&#x5BB6;&#x5171;&#x52C9;&#x3002;</p><p>vue&#x4E2D;&#x7684;&#x53CC;&#x5411;&#x6570;&#x636E;&#x662F;&#x901A;&#x8FC7;&#x6570;&#x636E;&#x52AB;&#x6301;(Object.defineProperty())&#x7ED3;&#x5408;&#x53D1;&#x5E03;&#x8005;-&#x8BA2;&#x9605;&#x8005;&#x6A21;&#x5F0F;&#x6765;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;Object.defineProperty()&#x65B9;&#x6CD5;&#x4F1A;&#x76F4;&#x63A5;&#x5728;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x4E0A;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x65B0;&#x5C5E;&#x6027;&#xFF0C;&#x6216;&#x8005;&#x4FEE;&#x6539;&#x4E00;&#x4E2A;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x7684;&#x5C5E;&#x6027;&#xFF0C; &#x5E76;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x3002;</p><p><strong>Object.defineProperty()&#x4F7F;&#x7528;</strong></p><p>&#x505A;&#x4E2A;&#x5C0F;&#x6848;&#x4F8B;&#xFF0C;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;svue.js&#x6587;&#x4EF6;&#xFF0C;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;book&#x5BF9;&#x8C61;&#xFF0C;&#x5E76;&#x8D4B;&#x503C;&#x8F93;&#x51FA;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Book = {
    name: &apos;vue&#x6743;&#x5A01;&#x6307;&#x5357;&apos;
  };
console.log(Book.name);  // vue&#x6743;&#x5A01;&#x6307;&#x5357;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code>var Book = {
    <span class="hljs-built_in">name</span>: <span class="hljs-string">&apos;vue&#x6743;&#x5A01;&#x6307;&#x5357;&apos;</span>
  };
console.<span class="hljs-built_in">log</span>(Book.<span class="hljs-built_in">name</span>);  <span class="hljs-comment">// vue&#x6743;&#x5A01;&#x6307;&#x5357;</span></code></pre><p>&#x5F97;&#x5230;&#x7684;&#x7ED3;&#x679C;&#x5C31;&#x662F;&#x201C;vue&#x6743;&#x5A01;&#x6307;&#x5357;&#x201D;&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x8981;&#x5728;&#x6267;&#x884C;console.log(book.name)&#x7684;&#x540C;&#x65F6;&#xFF0C;&#x76F4;&#x63A5;&#x7ED9;&#x4E66;&#x540D;&#x52A0;&#x4E2A;&#x4E66;&#x540D;&#x53F7;&#x600E;&#x4E48;&#x505A;&#xFF1F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;Object.defineProperty()&#x6765;&#x5B8C;&#x6210;&#xFF0C;&#x4FEE;&#x6539;&#x540E;&#x7684;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Book = {}
var name = &apos;&apos;;
Object.defineProperty(Book, &apos;name&apos;, {
  set: function (value) {
    name = value;
    console.log(&apos;&#x4F60;&#x53D6;&#x4E86;&#x4E00;&#x4E2A;&#x4E66;&#x540D;&#x53EB;&#x505A;&apos; + value);
  },
  get: function () {
    return &apos;&#x300A;&apos; + name + &apos;&#x300B;&apos;
  }
})
 
Book.name = &apos;vue&#x6743;&#x5A01;&#x6307;&#x5357;&apos;;  // &#x4F60;&#x53D6;&#x4E86;&#x4E00;&#x4E2A;&#x4E66;&#x540D;&#x53EB;&#x505A;vue&#x6743;&#x5A01;&#x6307;&#x5357;
console.log(Book.name);  // &#x300A;vue&#x6743;&#x5A01;&#x6307;&#x5357;&#x300B;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> Book = {}
<span class="hljs-keyword">var</span> name = <span class="hljs-string">&apos;&apos;</span>;
<span class="hljs-built_in">Object</span>.defineProperty(Book, <span class="hljs-string">&apos;name&apos;</span>, {
  <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
    name = value;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x4F60;&#x53D6;&#x4E86;&#x4E00;&#x4E2A;&#x4E66;&#x540D;&#x53EB;&#x505A;&apos;</span> + value);
  },
  <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;&#x300A;&apos;</span> + name + <span class="hljs-string">&apos;&#x300B;&apos;</span>
  }
})
 
Book.name = <span class="hljs-string">&apos;vue&#x6743;&#x5A01;&#x6307;&#x5357;&apos;</span>;  <span class="hljs-comment">// &#x4F60;&#x53D6;&#x4E86;&#x4E00;&#x4E2A;&#x4E66;&#x540D;&#x53EB;&#x505A;vue&#x6743;&#x5A01;&#x6307;&#x5357;</span>
<span class="hljs-built_in">console</span>.log(Book.name);  <span class="hljs-comment">// &#x300A;vue&#x6743;&#x5A01;&#x6307;&#x5357;&#x300B;</span></code></pre><p>&#x901A;&#x8FC7;Object.defineProperty()&#x5BF9;Book&#x5BF9;&#x8C61;&#x7684;name&#x5C5E;&#x6027;&#x7684;get&#x548C;set&#x8FDB;&#x884C;&#x4E86;&#x91CD;&#x5199;&#x64CD;&#x4F5C;&#xFF0C;&#x5F53;&#x8BBF;&#x95EE;name&#x5C5E;&#x6027;&#x65F6;&#x4F1A;&#x89E6;&#x53D1;get&#x6267;&#x884C;&#x3002;</p><h2 id="articleHeader3">&#x52A8;&#x624B;&#x6A21;&#x62DF;&#x5199;&#x6570;&#x636E;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;</h2><p>&#x5B9E;&#x73B0;mvvm&#x4E3B;&#x8981;&#x5305;&#x542B;&#x4E24;&#x4E2A;&#x65B9;&#x9762;&#xFF0C;&#x6570;&#x636E;&#x53D8;&#x5316;&#x66F4;&#x65B0;&#x89C6;&#x56FE;&#xFF0C;&#x89C6;&#x56FE;&#x53D8;&#x5316;&#x66F4;&#x65B0;&#x6570;&#x636E;&#x3002;&#x5206;&#x4E3A;3&#x4E2A;&#x6B65;&#x9AA4;&#x6765;&#x505A;&#xFF1A;</p><p><strong>(1) &#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x76D1;&#x542C;&#x5668;Observer&#xFF0C;&#x7528;&#x6765;&#x52AB;&#x6301;&#x5E76;&#x76D1;&#x542C;&#x6240;&#x6709;&#x5C5E;&#x6027;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x53D8;&#x52A8;&#x7684;&#xFF0C;&#x5C31;&#x901A;&#x77E5;&#x8BA2;&#x9605;&#x8005;</strong><br>Observer&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x76D1;&#x542C;&#x5668;&#xFF0C;&#x5176;&#x5B9E;&#x73B0;&#x6838;&#x5FC3;&#x65B9;&#x6CD5;&#x5C31;&#x662F;&#x524D;&#x6587;&#x6240;&#x8BF4;&#x7684;Object.defineProperty( )&#x3002;&#x5982;&#x679C;&#x8981;&#x5BF9;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x90FD;&#x8FDB;&#x884C;&#x76D1;&#x542C;&#x7684;&#x8BDD;&#xFF0C;&#x90A3;&#x4E48;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x9012;&#x5F52;&#x65B9;&#x6CD5;&#x904D;&#x5386;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x503C;&#xFF0C;&#x5E76;&#x5BF9;&#x5176;&#x8FDB;&#x884C;Object.defineProperty( )&#x5904;&#x7406;&#x3002;</p><p>&#x5BF9;&#x5E94;&#x5230;&#x6E90;&#x7801;&#x7684;&#x76EE;&#x5F55;&#x662F;&#xFF1A;/vue-dev/src/core/observer/index.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function defineReactive(data, key, val) {
    observe(val); // &#x9012;&#x5F52;&#x904D;&#x5386;&#x6240;&#x6709;&#x5B50;&#x5C5E;&#x6027;
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            return val;
        },
        set: function(newVal) {
            val = newVal;
            console.log(&apos;&#x5C5E;&#x6027;&apos; + key + &apos;&#x5DF2;&#x7ECF;&#x88AB;&#x76D1;&#x542C;&#x4E86;&#xFF0C;&#x73B0;&#x5728;&#x503C;&#x4E3A;&#xFF1A;&#x201C;&apos; + newVal.toString() + &apos;&#x201D;&apos;);
        }
    });
}
 
function observe(data) {
    if (!data || typeof data !== &apos;object&apos;) {
        return;
    }
    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key]);
    });
};
 
var library = {
    book1: {
        name: &apos;&apos;
    },
    book2: &apos;&apos;
};
observe(library);
library.book1.name = &apos;vue&#x6743;&#x5A01;&#x6307;&#x5357;&apos;; // &#x5C5E;&#x6027;name&#x5DF2;&#x7ECF;&#x88AB;&#x76D1;&#x542C;&#x4E86;&#xFF0C;&#x73B0;&#x5728;&#x503C;&#x4E3A;&#xFF1A;&#x201C;vue&#x6743;&#x5A01;&#x6307;&#x5357;&#x201D;
library.book2 = &apos;&#x6CA1;&#x6709;&#x6B64;&#x4E66;&#x7C4D;&apos;;  // &#x5C5E;&#x6027;book2&#x5DF2;&#x7ECF;&#x88AB;&#x76D1;&#x542C;&#x4E86;&#xFF0C;&#x73B0;&#x5728;&#x503C;&#x4E3A;&#xFF1A;&#x201C;&#x6CA1;&#x6709;&#x6B64;&#x4E66;&#x7C4D;&#x201D;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span>(<span class="hljs-params">data, key, val</span>) </span>{
    observe(val); <span class="hljs-comment">// &#x9012;&#x5F52;&#x904D;&#x5386;&#x6240;&#x6709;&#x5B50;&#x5C5E;&#x6027;</span>
    <span class="hljs-built_in">Object</span>.defineProperty(data, key, {
        <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> val;
        },
        <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newVal</span>) </span>{
            val = newVal;
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x5C5E;&#x6027;&apos;</span> + key + <span class="hljs-string">&apos;&#x5DF2;&#x7ECF;&#x88AB;&#x76D1;&#x542C;&#x4E86;&#xFF0C;&#x73B0;&#x5728;&#x503C;&#x4E3A;&#xFF1A;&#x201C;&apos;</span> + newVal.toString() + <span class="hljs-string">&apos;&#x201D;&apos;</span>);
        }
    });
}
 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">observe</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">if</span> (!data || <span class="hljs-keyword">typeof</span> data !== <span class="hljs-string">&apos;object&apos;</span>) {
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-built_in">Object</span>.keys(data).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key</span>) </span>{
        defineReactive(data, key, data[key]);
    });
};
 
<span class="hljs-keyword">var</span> library = {
    <span class="hljs-attr">book1</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;&apos;</span>
    },
    <span class="hljs-attr">book2</span>: <span class="hljs-string">&apos;&apos;</span>
};
observe(library);
library.book1.name = <span class="hljs-string">&apos;vue&#x6743;&#x5A01;&#x6307;&#x5357;&apos;</span>; <span class="hljs-comment">// &#x5C5E;&#x6027;name&#x5DF2;&#x7ECF;&#x88AB;&#x76D1;&#x542C;&#x4E86;&#xFF0C;&#x73B0;&#x5728;&#x503C;&#x4E3A;&#xFF1A;&#x201C;vue&#x6743;&#x5A01;&#x6307;&#x5357;&#x201D;</span>
library.book2 = <span class="hljs-string">&apos;&#x6CA1;&#x6709;&#x6B64;&#x4E66;&#x7C4D;&apos;</span>;  <span class="hljs-comment">// &#x5C5E;&#x6027;book2&#x5DF2;&#x7ECF;&#x88AB;&#x76D1;&#x542C;&#x4E86;&#xFF0C;&#x73B0;&#x5728;&#x503C;&#x4E3A;&#xFF1A;&#x201C;&#x6CA1;&#x6709;&#x6B64;&#x4E66;&#x7C4D;&#x201D;</span></code></pre><p>&#x56E0;&#x4E3A;&#x8BA2;&#x9605;&#x8005;&#x662F;&#x6709;&#x5F88;&#x591A;&#x4E2A;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x6709;&#x4E00;&#x4E2A;&#x6D88;&#x606F;&#x8BA2;&#x9605;&#x5668;Dep&#x6765;&#x4E13;&#x95E8;&#x6536;&#x96C6;&#x8FD9;&#x4E9B;&#x8BA2;&#x9605;&#x8005;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x76D1;&#x542C;&#x5668;Observer&#x548C;&#x8BA2;&#x9605;&#x8005;Watcher&#x4E4B;&#x95F4;&#x8FDB;&#x884C;&#x7EDF;&#x4E00;&#x7BA1;&#x7406;&#x7684;,&#x6240;&#x4EE5;&#x8981;&#x4FEE;&#x6539;&#x4E0B;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function defineReactive(data, key, val) {
    observe(val); // &#x9012;&#x5F52;&#x904D;&#x5386;&#x6240;&#x6709;&#x5B50;&#x5C5E;&#x6027;
    var dep = new Dep(); 
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            if (Dep.target) { //&#x662F;&#x5426;&#x9700;&#x8981;&#x6DFB;&#x52A0;&#x8BA2;&#x9605;&#x8005;(Dep.target&#x540E;&#x7C7B;&#x4E2D;&#x52A0;&#x5165;)
                dep.addSub(Dep.target); // &#x5728;&#x8FD9;&#x91CC;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x8BA2;&#x9605;&#x8005;
            }
            return val;
        },
        set: function(newVal) {
            if (val === newVal) {
                return;
            }
            val = newVal;
            console.log(&apos;&#x5C5E;&#x6027;&apos; + key + &apos;&#x5DF2;&#x7ECF;&#x88AB;&#x76D1;&#x542C;&#x4E86;&#xFF0C;&#x73B0;&#x5728;&#x503C;&#x4E3A;&#xFF1A;&#x201C;&apos; + newVal.toString() + &apos;&#x201D;&apos;);
            dep.notify(); // &#x5982;&#x679C;&#x6570;&#x636E;&#x53D8;&#x5316;&#xFF0C;&#x901A;&#x77E5;&#x6240;&#x6709;&#x8BA2;&#x9605;&#x8005;
        }
    });
}
function observe(data) {
    if (!data || typeof data !== &apos;object&apos;) {
        return;
    }
    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key]);
    });
};
 
function Dep () {
    this.subs = []; //&#x8BA2;&#x9605;&#x8005;&#x7684;list
}
Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span>(<span class="hljs-params">data, key, val</span>) </span>{
    observe(val); <span class="hljs-comment">// &#x9012;&#x5F52;&#x904D;&#x5386;&#x6240;&#x6709;&#x5B50;&#x5C5E;&#x6027;</span>
    <span class="hljs-keyword">var</span> dep = <span class="hljs-keyword">new</span> Dep(); 
    <span class="hljs-built_in">Object</span>.defineProperty(data, key, {
        <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (Dep.target) { <span class="hljs-comment">//&#x662F;&#x5426;&#x9700;&#x8981;&#x6DFB;&#x52A0;&#x8BA2;&#x9605;&#x8005;(Dep.target&#x540E;&#x7C7B;&#x4E2D;&#x52A0;&#x5165;)</span>
                dep.addSub(Dep.target); <span class="hljs-comment">// &#x5728;&#x8FD9;&#x91CC;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x8BA2;&#x9605;&#x8005;</span>
            }
            <span class="hljs-keyword">return</span> val;
        },
        <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newVal</span>) </span>{
            <span class="hljs-keyword">if</span> (val === newVal) {
                <span class="hljs-keyword">return</span>;
            }
            val = newVal;
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x5C5E;&#x6027;&apos;</span> + key + <span class="hljs-string">&apos;&#x5DF2;&#x7ECF;&#x88AB;&#x76D1;&#x542C;&#x4E86;&#xFF0C;&#x73B0;&#x5728;&#x503C;&#x4E3A;&#xFF1A;&#x201C;&apos;</span> + newVal.toString() + <span class="hljs-string">&apos;&#x201D;&apos;</span>);
            dep.notify(); <span class="hljs-comment">// &#x5982;&#x679C;&#x6570;&#x636E;&#x53D8;&#x5316;&#xFF0C;&#x901A;&#x77E5;&#x6240;&#x6709;&#x8BA2;&#x9605;&#x8005;</span>
        }
    });
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">observe</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">if</span> (!data || <span class="hljs-keyword">typeof</span> data !== <span class="hljs-string">&apos;object&apos;</span>) {
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-built_in">Object</span>.keys(data).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key</span>) </span>{
        defineReactive(data, key, data[key]);
    });
};
 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dep</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.subs = []; <span class="hljs-comment">//&#x8BA2;&#x9605;&#x8005;&#x7684;list</span>
}
Dep.prototype = {
    <span class="hljs-attr">addSub</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">sub</span>) </span>{
        <span class="hljs-keyword">this</span>.subs.push(sub);
    },
    <span class="hljs-attr">notify</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.subs.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">sub</span>) </span>{
            sub.update();
        });
    }
};</code></pre><p>&#x5728;setter&#x51FD;&#x6570;&#x91CC;&#x9762;&#xFF0C;&#x5982;&#x679C;&#x6570;&#x636E;&#x53D8;&#x5316;&#xFF0C;&#x5C31;&#x4F1A;&#x53BB;&#x901A;&#x77E5;&#x6240;&#x6709;&#x8BA2;&#x9605;&#x8005;&#xFF0C;&#x8BA2;&#x9605;&#x8005;&#x4EEC;&#x5C31;&#x4F1A;&#x53BB;&#x6267;&#x884C;&#x5BF9;&#x5E94;&#x7684;&#x66F4;&#x65B0;&#x7684;&#x51FD;&#x6570;<br><strong>(2) &#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x8BA2;&#x9605;&#x8005;Watcher&#xFF0C;&#x53EF;&#x4EE5;&#x6536;&#x5230;&#x5C5E;&#x6027;&#x7684;&#x53D8;&#x5316;&#x901A;&#x77E5;&#x5E76;&#x6267;&#x884C;&#x76F8;&#x5E94;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x4ECE;&#x800C;&#x66F4;&#x65B0;&#x89C6;&#x56FE;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.value = this.get();  // &#x5C06;&#x81EA;&#x5DF1;&#x6DFB;&#x52A0;&#x5230;&#x8BA2;&#x9605;&#x5668;&#x7684;&#x64CD;&#x4F5C;
}
 
Watcher.prototype = {
    update: function() {
        this.run();
    },
    run: function() {
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    get: function() {
        Dep.target = this;  // &#x7F13;&#x5B58;&#x81EA;&#x5DF1;
        var value = this.vm.data[this.exp]  // &#x5F3A;&#x5236;&#x6267;&#x884C;&#x76D1;&#x542C;&#x5668;&#x91CC;&#x7684;get&#x51FD;&#x6570;
        Dep.target = null;  // &#x91CA;&#x653E;&#x81EA;&#x5DF1;
        return value;
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>function Watcher(vm, exp, cb) {
    <span class="hljs-keyword">this</span>.cb = cb;
    <span class="hljs-keyword">this</span>.vm = vm;
    <span class="hljs-keyword">this</span>.exp = exp;
    <span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">this</span>.<span class="hljs-keyword">get</span>();  <span class="hljs-comment">// &#x5C06;&#x81EA;&#x5DF1;&#x6DFB;&#x52A0;&#x5230;&#x8BA2;&#x9605;&#x5668;&#x7684;&#x64CD;&#x4F5C;</span>
}
 
Watcher.prototype = {
    update: function() {
        <span class="hljs-keyword">this</span>.run();
    },
    run: function() {
        <span class="hljs-keyword">var</span> value = <span class="hljs-keyword">this</span>.vm.<span class="hljs-keyword">data</span>[<span class="hljs-keyword">this</span>.exp];
        <span class="hljs-keyword">var</span> oldVal = <span class="hljs-keyword">this</span>.value;
        <span class="hljs-keyword">if</span> (value !== oldVal) {
            <span class="hljs-keyword">this</span>.value = value;
            <span class="hljs-keyword">this</span>.cb.call(<span class="hljs-keyword">this</span>.vm, value, oldVal);
        }
    },
    <span class="hljs-keyword">get</span>: function() {
        Dep.target = <span class="hljs-keyword">this</span>;  <span class="hljs-comment">// &#x7F13;&#x5B58;&#x81EA;&#x5DF1;</span>
        <span class="hljs-keyword">var</span> value = <span class="hljs-keyword">this</span>.vm.<span class="hljs-keyword">data</span>[<span class="hljs-keyword">this</span>.exp]  <span class="hljs-comment">// &#x5F3A;&#x5236;&#x6267;&#x884C;&#x76D1;&#x542C;&#x5668;&#x91CC;&#x7684;get&#x51FD;&#x6570;</span>
        Dep.target = <span class="hljs-literal">null</span>;  <span class="hljs-comment">// &#x91CA;&#x653E;&#x81EA;&#x5DF1;</span>
        <span class="hljs-keyword">return</span> value;
    }
};</code></pre><p>&#x7B80;&#x5355;&#x7248;&#x7684;Watcher&#x8BBE;&#x8BA1;&#x5B8C;&#x6BD5;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x53EA;&#x8981;&#x5C06;Observer&#x548C;Watcher&#x5173;&#x8054;&#x8D77;&#x6765;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x6570;&#x636E;&#x4E86;,&#x5B9A;&#x4E49;index.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function SelfVue (data, el, exp) {
    this.data = data; //&#x4F20;&#x9012;&#x8FDB;&#x6765;&#x7684;{}&#x5BF9;&#x8C61;&#x6570;&#x636E;
    observe(data);//&#x76D1;&#x542C;
    el.innerHTML = this.data[exp];  // &#x521D;&#x59CB;&#x5316;&#x6A21;&#x677F;&#x6570;&#x636E;&#x7684;&#x503C; this.data[name]
    //&#x8BA2;&#x9605;&#x8005; function&#x66F4;&#x65B0;&#x4F1A;&#x5728;watcher.js&#x4E2D;&#x56DE;&#x8C03;
    new Watcher(this, exp, function (value) {
        el.innerHTML = value;
    });
    return this;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs fortran"><code><span class="hljs-function"><span class="hljs-keyword">function</span></span> SelfVue (<span class="hljs-keyword">data</span>, el, <span class="hljs-built_in">exp</span>) {
    this.<span class="hljs-keyword">data</span> = <span class="hljs-keyword">data</span>; //&#x4F20;&#x9012;&#x8FDB;&#x6765;&#x7684;{}&#x5BF9;&#x8C61;&#x6570;&#x636E;
    observe(<span class="hljs-keyword">data</span>);//&#x76D1;&#x542C;
    el.innerHTML = this.<span class="hljs-keyword">data</span>[<span class="hljs-built_in">exp</span>];  // &#x521D;&#x59CB;&#x5316;&#x6A21;&#x677F;&#x6570;&#x636E;&#x7684;&#x503C; this.<span class="hljs-keyword">data</span>[<span class="hljs-keyword">name</span>]
    //&#x8BA2;&#x9605;&#x8005; <span class="hljs-function"><span class="hljs-keyword">function</span></span>&#x66F4;&#x65B0;&#x4F1A;&#x5728;watcher.js&#x4E2D;&#x56DE;&#x8C03;
    new Watcher(this, <span class="hljs-built_in">exp</span>, <span class="hljs-function"><span class="hljs-keyword">function</span></span> (<span class="hljs-keyword">value</span>) {
        el.innerHTML = <span class="hljs-keyword">value</span>;
    });
    <span class="hljs-keyword">return</span> this;
}</code></pre><p>&#x5B9A;&#x4E49;index.html&#x5F15;&#x5165;&#x4EE5;&#x4E0A;3&#x4E2A;js&#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x6D4B;&#x8BD5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1 id=&quot;name&quot;&gt;"{{"name"}}"&lt;/h1&gt;
&lt;/body&gt;
&lt;script src=&quot;observer.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;watcher.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;index.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
    var ele = document.querySelector(&apos;#name&apos;);
    var selfVue = new SelfVue({
        name: &apos;hello world&apos;
    }, ele, &apos;name&apos;);
 
    window.setTimeout(function () {
        console.log(&apos;name&#x503C;&#x6539;&#x53D8;&#x4E86;&apos;);
        selfVue.data.name = &apos;66666666&apos;;
    }, 2000);
 
&lt;/script&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;name&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{"name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;observer.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;watcher.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;index.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> ele = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;#name&apos;</span>);
    <span class="hljs-keyword">var</span> selfVue = <span class="hljs-keyword">new</span> SelfVue({
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;hello world&apos;</span>
    }, ele, <span class="hljs-string">&apos;name&apos;</span>);
 
    <span class="hljs-built_in">window</span>.setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;name&#x503C;&#x6539;&#x53D8;&#x4E86;&apos;</span>);
        selfVue.data.name = <span class="hljs-string">&apos;66666666&apos;</span>;
    }, <span class="hljs-number">2000</span>);
 
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre><p><strong>(3) &#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x89E3;&#x6790;&#x5668;Compile&#xFF0C;&#x53EF;&#x4EE5;&#x626B;&#x63CF;&#x548C;&#x89E3;&#x6790;&#x6BCF;&#x4E2A;&#x8282;&#x70B9;&#x7684;&#x76F8;&#x5173;&#x6307;&#x4EE4;&#xFF0C;&#x5E76;&#x6839;&#x636E;&#x521D;&#x59CB;&#x5316;&#x6A21;&#x677F;&#x6570;&#x636E;&#x4EE5;&#x53CA;&#x521D;&#x59CB;&#x5316;&#x76F8;&#x5E94;&#x7684;&#x8BA2;&#x9605;&#x5668;</strong><br>&#x867D;&#x7136;&#x4E0A;&#x9762;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x53CC;&#x5411;&#x6570;&#x636E;&#x7ED1;&#x5B9A;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x4F46;&#x662F;&#x6574;&#x4E2A;&#x8FC7;&#x7A0B;&#x90FD;&#x6CA1;&#x6709;&#x53BB;&#x89E3;&#x6790;dom&#x8282;&#x70B9;&#xFF0C;&#x800C;&#x662F;&#x76F4;&#x63A5;&#x56FA;&#x5B9A;&#x67D0;&#x4E2A;&#x8282;&#x70B9;&#x8FDB;&#x884C;&#x66FF;&#x6362;&#x6570;&#x636E;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x63A5;&#x4E0B;&#x6765;&#x9700;&#x8981;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x89E3;&#x6790;&#x5668;Compile&#x6765;&#x505A;&#x89E3;&#x6790;&#x548C;&#x7ED1;&#x5B9A;&#x5DE5;&#x4F5C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Compile(el, vm) {
    this.vm = vm;
    this.el = document.querySelector(el);
    this.fragment = null;
    this.init();
}

Compile.prototype = {
    init: function () {
        if (this.el) {
            this.fragment = this.nodeToFragment(this.el);
            this.compileElement(this.fragment);
            this.el.appendChild(this.fragment);
        } else {
            console.log(&apos;Dom&#x5143;&#x7D20;&#x4E0D;&#x5B58;&#x5728;&apos;);
        }
    },
    nodeToFragment: function (el) {
        var fragment = document.createDocumentFragment();
        var child = el.firstChild;
        while (child) {
            // &#x5C06;Dom&#x5143;&#x7D20;&#x79FB;&#x5165;fragment&#x4E2D;
            fragment.appendChild(child);
            child = el.firstChild
        }
        return fragment;
    },
    compileElement: function (el) {
        var childNodes = el.childNodes;
        var self = this;
        [].slice.call(childNodes).forEach(function(node) {
            var reg = /\{\{(.*)\}\}/;
            var text = node.textContent;

            if (self.isTextNode(node) &amp;&amp; reg.test(text)) {  // &#x5224;&#x65AD;&#x662F;&#x5426;&#x662F;&#x7B26;&#x5408;&#x8FD9;&#x79CD;&#x5F62;&#x5F0F;"{{""}}"&#x7684;&#x6307;&#x4EE4;
                self.compileText(node, reg.exec(text)[1]);
            }

            if (node.childNodes &amp;&amp; node.childNodes.length) {
                self.compileElement(node);  // &#x7EE7;&#x7EED;&#x9012;&#x5F52;&#x904D;&#x5386;&#x5B50;&#x8282;&#x70B9;
            }
        });
    },
    compileText: function(node, exp) {
        var self = this;
        var initText = this.vm[exp];
        this.updateText(node, initText);  // &#x5C06;&#x521D;&#x59CB;&#x5316;&#x7684;&#x6570;&#x636E;&#x521D;&#x59CB;&#x5316;&#x5230;&#x89C6;&#x56FE;&#x4E2D;
        new Watcher(this.vm, exp, function (value) { // &#x751F;&#x6210;&#x8BA2;&#x9605;&#x5668;&#x5E76;&#x7ED1;&#x5B9A;&#x66F4;&#x65B0;&#x51FD;&#x6570;
            self.updateText(node, value);
        });
    },
    updateText: function (node, value) {
        node.textContent = typeof value == &apos;undefined&apos; ? &apos;&apos; : value;
    },
    isTextNode: function(node) {
        return node.nodeType == 3;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Compile</span>(<span class="hljs-params">el, vm</span>) </span>{
    <span class="hljs-keyword">this</span>.vm = vm;
    <span class="hljs-keyword">this</span>.el = <span class="hljs-built_in">document</span>.querySelector(el);
    <span class="hljs-keyword">this</span>.fragment = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.init();
}

Compile.prototype = {
    <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.el) {
            <span class="hljs-keyword">this</span>.fragment = <span class="hljs-keyword">this</span>.nodeToFragment(<span class="hljs-keyword">this</span>.el);
            <span class="hljs-keyword">this</span>.compileElement(<span class="hljs-keyword">this</span>.fragment);
            <span class="hljs-keyword">this</span>.el.appendChild(<span class="hljs-keyword">this</span>.fragment);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Dom&#x5143;&#x7D20;&#x4E0D;&#x5B58;&#x5728;&apos;</span>);
        }
    },
    <span class="hljs-attr">nodeToFragment</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el</span>) </span>{
        <span class="hljs-keyword">var</span> fragment = <span class="hljs-built_in">document</span>.createDocumentFragment();
        <span class="hljs-keyword">var</span> child = el.firstChild;
        <span class="hljs-keyword">while</span> (child) {
            <span class="hljs-comment">// &#x5C06;Dom&#x5143;&#x7D20;&#x79FB;&#x5165;fragment&#x4E2D;</span>
            fragment.appendChild(child);
            child = el.firstChild
        }
        <span class="hljs-keyword">return</span> fragment;
    },
    <span class="hljs-attr">compileElement</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el</span>) </span>{
        <span class="hljs-keyword">var</span> childNodes = el.childNodes;
        <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
        [].slice.call(childNodes).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>) </span>{
            <span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/\{\{(.*)\}\}/</span>;
            <span class="hljs-keyword">var</span> text = node.textContent;

            <span class="hljs-keyword">if</span> (self.isTextNode(node) &amp;&amp; reg.test(text)) {  <span class="hljs-comment">// &#x5224;&#x65AD;&#x662F;&#x5426;&#x662F;&#x7B26;&#x5408;&#x8FD9;&#x79CD;&#x5F62;&#x5F0F;"{{""}}"&#x7684;&#x6307;&#x4EE4;</span>
                self.compileText(node, reg.exec(text)[<span class="hljs-number">1</span>]);
            }

            <span class="hljs-keyword">if</span> (node.childNodes &amp;&amp; node.childNodes.length) {
                self.compileElement(node);  <span class="hljs-comment">// &#x7EE7;&#x7EED;&#x9012;&#x5F52;&#x904D;&#x5386;&#x5B50;&#x8282;&#x70B9;</span>
            }
        });
    },
    <span class="hljs-attr">compileText</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node, exp</span>) </span>{
        <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">var</span> initText = <span class="hljs-keyword">this</span>.vm[exp];
        <span class="hljs-keyword">this</span>.updateText(node, initText);  <span class="hljs-comment">// &#x5C06;&#x521D;&#x59CB;&#x5316;&#x7684;&#x6570;&#x636E;&#x521D;&#x59CB;&#x5316;&#x5230;&#x89C6;&#x56FE;&#x4E2D;</span>
        <span class="hljs-keyword">new</span> Watcher(<span class="hljs-keyword">this</span>.vm, exp, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{ <span class="hljs-comment">// &#x751F;&#x6210;&#x8BA2;&#x9605;&#x5668;&#x5E76;&#x7ED1;&#x5B9A;&#x66F4;&#x65B0;&#x51FD;&#x6570;</span>
            self.updateText(node, value);
        });
    },
    <span class="hljs-attr">updateText</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node, value</span>) </span>{
        node.textContent = <span class="hljs-keyword">typeof</span> value == <span class="hljs-string">&apos;undefined&apos;</span> ? <span class="hljs-string">&apos;&apos;</span> : value;
    },
    <span class="hljs-attr">isTextNode</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>) </span>{
        <span class="hljs-keyword">return</span> node.nodeType == <span class="hljs-number">3</span>;
    }
}</code></pre><p>&#x4FEE;&#x6539;index.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function SelfVue (options) {
    var self = this;
    this.vm = this;
    this.data = options.data;

    Object.keys(this.data).forEach(function(key) {
        self.proxyKeys(key);
    });

    observe(this.data);
    new Compile(options.el, this.vm);
    return this;
}

SelfVue.prototype = {
    proxyKeys: function (key) {
        var self = this;
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function proxyGetter() {
                return self.data[key];
            },
            set: function proxySetter(newVal) {
                self.data[key] = newVal;
            }
        });
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>function SelfVue (options) {
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">this</span>.vm = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">this</span>.<span class="hljs-keyword">data</span> = options.<span class="hljs-keyword">data</span>;

    Object.keys(<span class="hljs-keyword">this</span>.<span class="hljs-keyword">data</span>).forEach(function(key) {
        self.proxyKeys(key);
    });

    observe(<span class="hljs-keyword">this</span>.<span class="hljs-keyword">data</span>);
    new Compile(options.el, <span class="hljs-keyword">this</span>.vm);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}

SelfVue.prototype = {
    proxyKeys: function (key) {
        <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
        Object.defineProperty(<span class="hljs-keyword">this</span>, key, {
            enumerable: <span class="hljs-literal">false</span>,
            configurable: <span class="hljs-literal">true</span>,
            <span class="hljs-keyword">get</span>: function proxyGetter() {
                <span class="hljs-keyword">return</span> self.<span class="hljs-keyword">data</span>[key];
            },
            <span class="hljs-keyword">set</span>: function proxySetter(newVal) {
                self.<span class="hljs-keyword">data</span>[key] = newVal;
            }
        });
    }
}</code></pre><p>&#x4FEE;&#x6539;index.html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id=&quot;app&quot;&gt;
        &lt;h2&gt;"{{"title"}}"&lt;/h2&gt;
        &lt;h1&gt;"{{"name"}}"&lt;/h1&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;script src=&quot;observer.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;watcher.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;compile.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;index.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
    var selfVue = new SelfVue({
        el: &apos;#app&apos;,
        data: {
            title: &apos;hello world&apos;,
            name: &apos;&apos;
        }
    });
 
    window.setTimeout(function () {
        selfVue.title = &apos;&#x4F60;&#x597D;&apos;;
    }, 2000);
 
    window.setTimeout(function () {
        selfVue.name = &apos;canfoo&apos;;
    }, 2500);
 
&lt;/script&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span></span><span class="hljs-template-variable">"{{"title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{"name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;observer.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;watcher.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;compile.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;index.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> selfVue = <span class="hljs-keyword">new</span> SelfVue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;hello world&apos;</span>,
            <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;&apos;</span>
        }
    });
 
    <span class="hljs-built_in">window</span>.setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        selfVue.title = <span class="hljs-string">&apos;&#x4F60;&#x597D;&apos;</span>;
    }, <span class="hljs-number">2000</span>);
 
    <span class="hljs-built_in">window</span>.setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        selfVue.name = <span class="hljs-string">&apos;canfoo&apos;</span>;
    }, <span class="hljs-number">2500</span>);
 
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre><p><strong>&#x73B0;&#x5728;&#x5DF2;&#x7ECF;&#x53EF;&#x4EE5;&#x89E3;&#x6790;&#x51FA;"{{""}}"&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x8981;&#x652F;&#x6301;&#x66F4;&#x591A;&#x7684;&#x6307;&#x4EE4;,&#x7EE7;&#x7EED;&#x5B8C;&#x5584;compile.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Compile(el, vm) {
    this.vm = vm;
    this.el = document.querySelector(el);
    this.fragment = null;
    this.init();
}

Compile.prototype = {
    init: function () {
        if (this.el) {
            this.fragment = this.nodeToFragment(this.el);
            this.compileElement(this.fragment);
            this.el.appendChild(this.fragment);
        } else {
            console.log(&apos;Dom&#x5143;&#x7D20;&#x4E0D;&#x5B58;&#x5728;&apos;);
        }
    },
    nodeToFragment: function (el) {
        var fragment = document.createDocumentFragment();
        var child = el.firstChild;
        while (child) {
            // &#x5C06;Dom&#x5143;&#x7D20;&#x79FB;&#x5165;fragment&#x4E2D;
            fragment.appendChild(child);
            child = el.firstChild
        }
        return fragment;
    },
    compileElement: function (el) {
        var childNodes = el.childNodes;
        var self = this;
        [].slice.call(childNodes).forEach(function(node) {
            var reg = /\{\{(.*)\}\}/;
            var text = node.textContent;

            if (self.isElementNode(node)) {  
                self.compile(node);
            } else if (self.isTextNode(node) &amp;&amp; reg.test(text)) {
                self.compileText(node, reg.exec(text)[1]);
            }

            if (node.childNodes &amp;&amp; node.childNodes.length) {
                self.compileElement(node);
            }
        });
    },
    compile: function(node) {
        var nodeAttrs = node.attributes;
        var self = this;
        Array.prototype.forEach.call(nodeAttrs, function(attr) {
            var attrName = attr.name;
            if (self.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);
                if (self.isEventDirective(dir)) {  // &#x4E8B;&#x4EF6;&#x6307;&#x4EE4;
                    self.compileEvent(node, self.vm, exp, dir);
                } else {  // v-model &#x6307;&#x4EE4;
                    self.compileModel(node, self.vm, exp, dir);
                }
                node.removeAttribute(attrName);
            }
        });
    },
    compileText: function(node, exp) {
        var self = this;
        var initText = this.vm[exp];
        this.updateText(node, initText);
        new Watcher(this.vm, exp, function (value) {
            self.updateText(node, value);
        });
    },
    compileEvent: function (node, vm, exp, dir) {
        var eventType = dir.split(&apos;:&apos;)[1];
        var cb = vm.methods &amp;&amp; vm.methods[exp];

        if (eventType &amp;&amp; cb) {
            node.addEventListener(eventType, cb.bind(vm), false);
        }
    },
    compileModel: function (node, vm, exp, dir) {
        var self = this;
        var val = this.vm[exp];
        this.modelUpdater(node, val);
        new Watcher(this.vm, exp, function (value) {
            self.modelUpdater(node, value);
        });

        node.addEventListener(&apos;input&apos;, function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            self.vm[exp] = newValue;
            val = newValue;
        });
    },
    updateText: function (node, value) {
        node.textContent = typeof value == &apos;undefined&apos; ? &apos;&apos; : value;
    },
    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == &apos;undefined&apos; ? &apos;&apos; : value;
    },
    isDirective: function(attr) {
        return attr.indexOf(&apos;v-&apos;) == 0;
    },
    isEventDirective: function(dir) {
        return dir.indexOf(&apos;on:&apos;) === 0;
    },
    isElementNode: function (node) {
        return node.nodeType == 1;
    },
    isTextNode: function(node) {
        return node.nodeType == 3;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Compile</span>(<span class="hljs-params">el, vm</span>) </span>{
    <span class="hljs-keyword">this</span>.vm = vm;
    <span class="hljs-keyword">this</span>.el = <span class="hljs-built_in">document</span>.querySelector(el);
    <span class="hljs-keyword">this</span>.fragment = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.init();
}

Compile.prototype = {
    <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.el) {
            <span class="hljs-keyword">this</span>.fragment = <span class="hljs-keyword">this</span>.nodeToFragment(<span class="hljs-keyword">this</span>.el);
            <span class="hljs-keyword">this</span>.compileElement(<span class="hljs-keyword">this</span>.fragment);
            <span class="hljs-keyword">this</span>.el.appendChild(<span class="hljs-keyword">this</span>.fragment);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Dom&#x5143;&#x7D20;&#x4E0D;&#x5B58;&#x5728;&apos;</span>);
        }
    },
    <span class="hljs-attr">nodeToFragment</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el</span>) </span>{
        <span class="hljs-keyword">var</span> fragment = <span class="hljs-built_in">document</span>.createDocumentFragment();
        <span class="hljs-keyword">var</span> child = el.firstChild;
        <span class="hljs-keyword">while</span> (child) {
            <span class="hljs-comment">// &#x5C06;Dom&#x5143;&#x7D20;&#x79FB;&#x5165;fragment&#x4E2D;</span>
            fragment.appendChild(child);
            child = el.firstChild
        }
        <span class="hljs-keyword">return</span> fragment;
    },
    <span class="hljs-attr">compileElement</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el</span>) </span>{
        <span class="hljs-keyword">var</span> childNodes = el.childNodes;
        <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
        [].slice.call(childNodes).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>) </span>{
            <span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/\{\{(.*)\}\}/</span>;
            <span class="hljs-keyword">var</span> text = node.textContent;

            <span class="hljs-keyword">if</span> (self.isElementNode(node)) {  
                self.compile(node);
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (self.isTextNode(node) &amp;&amp; reg.test(text)) {
                self.compileText(node, reg.exec(text)[<span class="hljs-number">1</span>]);
            }

            <span class="hljs-keyword">if</span> (node.childNodes &amp;&amp; node.childNodes.length) {
                self.compileElement(node);
            }
        });
    },
    <span class="hljs-attr">compile</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>) </span>{
        <span class="hljs-keyword">var</span> nodeAttrs = node.attributes;
        <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
        <span class="hljs-built_in">Array</span>.prototype.forEach.call(nodeAttrs, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">attr</span>) </span>{
            <span class="hljs-keyword">var</span> attrName = attr.name;
            <span class="hljs-keyword">if</span> (self.isDirective(attrName)) {
                <span class="hljs-keyword">var</span> exp = attr.value;
                <span class="hljs-keyword">var</span> dir = attrName.substring(<span class="hljs-number">2</span>);
                <span class="hljs-keyword">if</span> (self.isEventDirective(dir)) {  <span class="hljs-comment">// &#x4E8B;&#x4EF6;&#x6307;&#x4EE4;</span>
                    self.compileEvent(node, self.vm, exp, dir);
                } <span class="hljs-keyword">else</span> {  <span class="hljs-comment">// v-model &#x6307;&#x4EE4;</span>
                    self.compileModel(node, self.vm, exp, dir);
                }
                node.removeAttribute(attrName);
            }
        });
    },
    <span class="hljs-attr">compileText</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node, exp</span>) </span>{
        <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">var</span> initText = <span class="hljs-keyword">this</span>.vm[exp];
        <span class="hljs-keyword">this</span>.updateText(node, initText);
        <span class="hljs-keyword">new</span> Watcher(<span class="hljs-keyword">this</span>.vm, exp, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
            self.updateText(node, value);
        });
    },
    <span class="hljs-attr">compileEvent</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node, vm, exp, dir</span>) </span>{
        <span class="hljs-keyword">var</span> eventType = dir.split(<span class="hljs-string">&apos;:&apos;</span>)[<span class="hljs-number">1</span>];
        <span class="hljs-keyword">var</span> cb = vm.methods &amp;&amp; vm.methods[exp];

        <span class="hljs-keyword">if</span> (eventType &amp;&amp; cb) {
            node.addEventListener(eventType, cb.bind(vm), <span class="hljs-literal">false</span>);
        }
    },
    <span class="hljs-attr">compileModel</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node, vm, exp, dir</span>) </span>{
        <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">var</span> val = <span class="hljs-keyword">this</span>.vm[exp];
        <span class="hljs-keyword">this</span>.modelUpdater(node, val);
        <span class="hljs-keyword">new</span> Watcher(<span class="hljs-keyword">this</span>.vm, exp, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
            self.modelUpdater(node, value);
        });

        node.addEventListener(<span class="hljs-string">&apos;input&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
            <span class="hljs-keyword">var</span> newValue = e.target.value;
            <span class="hljs-keyword">if</span> (val === newValue) {
                <span class="hljs-keyword">return</span>;
            }
            self.vm[exp] = newValue;
            val = newValue;
        });
    },
    <span class="hljs-attr">updateText</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node, value</span>) </span>{
        node.textContent = <span class="hljs-keyword">typeof</span> value == <span class="hljs-string">&apos;undefined&apos;</span> ? <span class="hljs-string">&apos;&apos;</span> : value;
    },
    <span class="hljs-attr">modelUpdater</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node, value, oldValue</span>) </span>{
        node.value = <span class="hljs-keyword">typeof</span> value == <span class="hljs-string">&apos;undefined&apos;</span> ? <span class="hljs-string">&apos;&apos;</span> : value;
    },
    <span class="hljs-attr">isDirective</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">attr</span>) </span>{
        <span class="hljs-keyword">return</span> attr.indexOf(<span class="hljs-string">&apos;v-&apos;</span>) == <span class="hljs-number">0</span>;
    },
    <span class="hljs-attr">isEventDirective</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dir</span>) </span>{
        <span class="hljs-keyword">return</span> dir.indexOf(<span class="hljs-string">&apos;on:&apos;</span>) === <span class="hljs-number">0</span>;
    },
    <span class="hljs-attr">isElementNode</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node</span>) </span>{
        <span class="hljs-keyword">return</span> node.nodeType == <span class="hljs-number">1</span>;
    },
    <span class="hljs-attr">isTextNode</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>) </span>{
        <span class="hljs-keyword">return</span> node.nodeType == <span class="hljs-number">3</span>;
    }
}</code></pre><p>&#x4FEE;&#x6539;index.html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id=&quot;app&quot;&gt;
        &lt;h2&gt;"{{"title"}}"&lt;/h2&gt;
        &lt;input v-model=&quot;name&quot;&gt;
        &lt;h1&gt;"{{"name"}}"&lt;/h1&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;script src=&quot;observer.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;watcher.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;compile.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;index.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
    var selfVue = new SelfVue({
        el: &apos;#app&apos;,
        data: {
            title: &apos;hello world&apos;,
            name: &apos;&apos;
        }
    });
 
&lt;/script&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span></span><span class="hljs-template-variable">"{{"title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;name&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{"name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;observer.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;watcher.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;compile.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;index.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> selfVue = <span class="hljs-keyword">new</span> SelfVue({
        el: <span class="hljs-string">&apos;#app&apos;</span>,
        data: {
            title: <span class="hljs-string">&apos;hello world&apos;</span>,
            name: <span class="hljs-string">&apos;&apos;</span>
        }
    });
 
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre><p>&#x5C31;&#x80FD;&#x770B;&#x5230;v-model&#x7684;&#x6548;&#x679C;&#x4E86;</p><h2 id="articleHeader4">&#x672A;&#x5B8C;&#x5F85;&#x7EED;</h2>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2.x源码理解

## 原文链接
[https://segmentfault.com/a/1190000015846104](https://segmentfault.com/a/1190000015846104)

