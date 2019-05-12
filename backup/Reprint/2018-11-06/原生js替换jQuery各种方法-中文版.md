---
title: 原生js替换jQuery各种方法-中文版
hidden: true
categories: [reprint]
slug: fbfa9898
date: 2018-11-06 02:30:12
---

{{< raw >}}
<p>&#x539F;&#x6587;<a href="https://github.com/nefe/You-Dont-Need-jQuery/blob/master/README.zh-CN.md" rel="nofollow noreferrer" target="_blank">https://github.com/nefe/You-D...</a></p><h2 id="articleHeader0">You Don&apos;t Need jQuery <a href="https://travis-ci.org/oneuijs/You-Dont-Need-jQuery" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000016594038" src="https://static.alili.tech/img/remote/1460000016594038" alt="Build Status" title="Build Status" style="cursor:pointer;display:inline"></span></a></h2><p>&#x524D;&#x7AEF;&#x53D1;&#x5C55;&#x5F88;&#x5FEB;&#xFF0C;&#x73B0;&#x4EE3;&#x6D4F;&#x89C8;&#x5668;&#x539F;&#x751F; API &#x5DF2;&#x7ECF;&#x8DB3;&#x591F;&#x597D;&#x7528;&#x3002;&#x6211;&#x4EEC;&#x5E76;&#x4E0D;&#x9700;&#x8981;&#x4E3A;&#x4E86;&#x64CD;&#x4F5C; DOM&#x3001;Event &#x7B49;&#x518D;&#x5B66;&#x4E60;&#x4E00;&#x4E0B; jQuery &#x7684; API&#x3002;&#x540C;&#x65F6;&#x7531;&#x4E8E; React&#x3001;Angular&#x3001;Vue &#x7B49;&#x6846;&#x67B6;&#x7684;&#x6D41;&#x884C;&#xFF0C;&#x76F4;&#x63A5;&#x64CD;&#x4F5C; DOM &#x4E0D;&#x518D;&#x662F;&#x597D;&#x7684;&#x6A21;&#x5F0F;&#xFF0C;jQuery &#x4F7F;&#x7528;&#x573A;&#x666F;&#x5927;&#x5927;&#x51CF;&#x5C11;&#x3002;&#x672C;&#x9879;&#x76EE;&#x603B;&#x7ED3;&#x4E86;&#x5927;&#x90E8;&#x5206; jQuery API &#x66FF;&#x4EE3;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x6682;&#x65F6;&#x53EA;&#x652F;&#x6301; IE10 &#x4EE5;&#x4E0A;&#x6D4F;&#x89C8;&#x5668;&#x3002;</p><h2 id="articleHeader1">&#x76EE;&#x5F55;</h2><ol><li><a href="#translations">Translations</a></li><li><a href="#query-selector">Query Selector</a></li><li><a href="#css--style">CSS &amp; Style</a></li><li><a href="#dom-manipulation">DOM Manipulation</a></li><li><a href="#ajax">Ajax</a></li><li><a href="#events">Events</a></li><li><a href="#utilities">Utilities</a></li><li><a href="#promises">Promises</a></li><li><a href="#animation">Animation</a></li><li><a href="#alternatives">Alternatives</a></li><li><a href="#browser-support">Browser Support</a></li></ol><h2 id="articleHeader2">Translations</h2><ul><li><a>&#xD55C;&#xAD6D;&#xC5B4;</a></li><li><a>&#x7B80;&#x4F53;&#x4E2D;&#x6587;</a></li><li><a>Bahasa Melayu</a></li><li><a>Bahasa Indonesia</a></li><li><a>Portugu&#xEA;s(PT-BR)</a></li><li><a>Ti&#x1EBF;ng Vi&#x1EC7;t Nam</a></li><li><a>Espa&#xF1;ol</a></li><li><a>&#x420;&#x443;&#x441;&#x441;&#x43A;&#x438;&#x439;</a></li><li><a>&#x41A;&#x44B;&#x440;&#x433;&#x44B;&#x437;&#x447;&#x430;</a></li><li><a>T&#xFC;rk&#xE7;e</a></li><li><a>Italiano</a></li><li><a>Fran&#xE7;ais</a></li><li><a>&#x65E5;&#x672C;&#x8A9E;</a></li><li><a>Polski</a></li></ul><h2 id="articleHeader3">Query Selector</h2><p>&#x5E38;&#x7528;&#x7684; class&#x3001;id&#x3001;&#x5C5E;&#x6027; &#x9009;&#x62E9;&#x5668;&#x90FD;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <code>document.querySelector</code> &#x6216; <code>document.querySelectorAll</code> &#x66FF;&#x4EE3;&#x3002;&#x533A;&#x522B;&#x662F;</p><ul><li><code>document.querySelector</code> &#x8FD4;&#x56DE;&#x7B2C;&#x4E00;&#x4E2A;&#x5339;&#x914D;&#x7684; Element</li><li><code>document.querySelectorAll</code> &#x8FD4;&#x56DE;&#x6240;&#x6709;&#x5339;&#x914D;&#x7684; Element &#x7EC4;&#x6210;&#x7684; NodeList&#x3002;&#x5B83;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <code>[].slice.call()</code> &#x628A;&#x5B83;&#x8F6C;&#x6210; Array</li><li>&#x5982;&#x679C;&#x5339;&#x914D;&#x4E0D;&#x5230;&#x4EFB;&#x4F55; Element&#xFF0C;jQuery &#x8FD4;&#x56DE;&#x7A7A;&#x6570;&#x7EC4; <code>[]</code>&#xFF0C;&#x4F46; <code>document.querySelector</code> &#x8FD4;&#x56DE; <code>null</code>&#xFF0C;&#x6CE8;&#x610F;&#x7A7A;&#x6307;&#x9488;&#x5F02;&#x5E38;&#x3002;&#x5F53;&#x627E;&#x4E0D;&#x5230;&#x65F6;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <code>||</code> &#x8BBE;&#x7F6E;&#x9ED8;&#x8BA4;&#x7684;&#x503C;&#xFF0C;&#x5982; <code>document.querySelectorAll(selector) || []</code></li></ul><blockquote>&#x6CE8;&#x610F;&#xFF1A;<code>document.querySelector</code> &#x548C; <code>document.querySelectorAll</code> &#x6027;&#x80FD;&#x5F88;<strong>&#x5DEE;</strong>&#x3002;&#x5982;&#x679C;&#x60F3;&#x63D0;&#x9AD8;&#x6027;&#x80FD;&#xFF0C;&#x5C3D;&#x91CF;&#x4F7F;&#x7528; <code>document.getElementById</code>&#x3001;<code>document.getElementsByClassName</code> &#x6216; <code>document.getElementsByTagName</code>&#x3002;</blockquote><ul><li><p><a href="#1.0">1.0</a> <a></a> &#x9009;&#x62E9;&#x5668;&#x67E5;&#x8BE2;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$(&apos;selector&apos;);

// Native
document.querySelectorAll(&apos;selector&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$(<span class="hljs-string">&apos;selector&apos;</span>);

<span class="hljs-comment">// Native</span>
<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">&apos;selector&apos;</span>);</code></pre></li><li><p><a href="#1.1">1.1</a> <a></a> class &#x67E5;&#x8BE2;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$(&apos;.class&apos;);

// Native
document.querySelectorAll(&apos;.class&apos;);

// or
document.getElementsByClassName(&apos;class&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$(<span class="hljs-string">&apos;.class&apos;</span>);

<span class="hljs-comment">// Native</span>
<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">&apos;.class&apos;</span>);

<span class="hljs-comment">// or</span>
<span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">&apos;class&apos;</span>);</code></pre></li><li><p><a href="#1.2">1.2</a> <a></a> id &#x67E5;&#x8BE2;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$(&apos;#id&apos;);

// Native
document.querySelector(&apos;#id&apos;);

// or
document.getElementById(&apos;id&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$(<span class="hljs-string">&apos;#id&apos;</span>);

<span class="hljs-comment">// Native</span>
<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;#id&apos;</span>);

<span class="hljs-comment">// or</span>
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;id&apos;</span>);</code></pre></li><li><p><a href="#1.3">1.3</a> <a></a> &#x5C5E;&#x6027;&#x67E5;&#x8BE2;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$(&apos;a[target=_blank]&apos;);

// Native
document.querySelectorAll(&apos;a[target=_blank]&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$(<span class="hljs-string">&apos;a[target=_blank]&apos;</span>);

<span class="hljs-comment">// Native</span>
<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">&apos;a[target=_blank]&apos;</span>);</code></pre></li><li><p><a href="#1.4">1.4</a> <a></a> &#x540E;&#x4EE3;&#x67E5;&#x8BE2;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.find(&apos;li&apos;);

// Native
el.querySelectorAll(&apos;li&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.find(<span class="hljs-string">&apos;li&apos;</span>);

<span class="hljs-comment">// Native</span>
el.querySelectorAll(<span class="hljs-string">&apos;li&apos;</span>);</code></pre></li><li><p><a href="#1.5">1.5</a> <a></a> &#x5144;&#x5F1F;&#x53CA;&#x4E0A;&#x4E0B;&#x5143;&#x7D20;</p><ul><li><p>&#x5144;&#x5F1F;&#x5143;&#x7D20;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.siblings();

// Native - latest, Edge13+
[...el.parentNode.children].filter((child) =&gt;
  child !== el
);
// Native (alternative) - latest, Edge13+
Array.from(el.parentNode.children).filter((child) =&gt;
  child !== el
);
// Native - IE10+
Array.prototype.filter.call(el.parentNode.children, (child) =&gt;
  child !== el
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.siblings();

<span class="hljs-comment">// Native - latest, Edge13+</span>
[...el.parentNode.children].filter(<span class="hljs-function">(<span class="hljs-params">child</span>) =&gt;</span>
  child !== el
);
<span class="hljs-comment">// Native (alternative) - latest, Edge13+</span>
<span class="hljs-built_in">Array</span>.from(el.parentNode.children).filter(<span class="hljs-function">(<span class="hljs-params">child</span>) =&gt;</span>
  child !== el
);
<span class="hljs-comment">// Native - IE10+</span>
<span class="hljs-built_in">Array</span>.prototype.filter.call(el.parentNode.children, (child) =&gt;
  child !== el
);</code></pre></li><li><p>&#x4E0A;&#x4E00;&#x4E2A;&#x5143;&#x7D20;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.prev();

// Native
el.previousElementSibling;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.prev();

<span class="hljs-comment">// Native</span>
el.previousElementSibling;
</code></pre></li><li><p>&#x4E0B;&#x4E00;&#x4E2A;&#x5143;&#x7D20;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// next
$el.next();

// Native
el.nextElementSibling;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// next</span>
$el.next();

<span class="hljs-comment">// Native</span>
el.nextElementSibling;</code></pre></li></ul></li><li><p><a href="#1.6">1.6</a> <a></a> Closest</p><p>Closest &#x83B7;&#x5F97;&#x5339;&#x914D;&#x9009;&#x62E9;&#x5668;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x7956;&#x5148;&#x5143;&#x7D20;&#xFF0C;&#x4ECE;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#x6CBF; DOM &#x6811;&#x5411;&#x4E0A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.closest(queryString);

// Native - Only latest, NO IE
el.closest(selector);

// Native - IE10+
function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    } else {
      el = el.parentElement;
    }
  }
  return null;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.closest(queryString);

<span class="hljs-comment">// Native - Only latest, NO IE</span>
el.closest(selector);

<span class="hljs-comment">// Native - IE10+</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">closest</span>(<span class="hljs-params">el, selector</span>) </span>{
  <span class="hljs-keyword">const</span> matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

  <span class="hljs-keyword">while</span> (el) {
    <span class="hljs-keyword">if</span> (matchesSelector.call(el, selector)) {
      <span class="hljs-keyword">return</span> el;
    } <span class="hljs-keyword">else</span> {
      el = el.parentElement;
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}</code></pre></li><li><p><a href="#1.7">1.7</a> <a></a> Parents Until</p><p>&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x6BCF;&#x4E00;&#x4E2A;&#x5339;&#x914D;&#x5143;&#x7D20;&#x96C6;&#x7684;&#x7956;&#x5148;&#xFF0C;&#x4E0D;&#x5305;&#x62EC;&#x5339;&#x914D;&#x5143;&#x7D20;&#x7684;&#x672C;&#x8EAB;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.parentsUntil(selector, filter);

// Native
function parentsUntil(el, selector, filter) {
  const result = [];
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

  // match start from parent
  el = el.parentElement;
  while (el &amp;&amp; !matchesSelector.call(el, selector)) {
    if (!filter) {
      result.push(el);
    } else {
      if (matchesSelector.call(el, filter)) {
        result.push(el);
      }
    }
    el = el.parentElement;
  }
  return result;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.parentsUntil(selector, filter);

<span class="hljs-comment">// Native</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parentsUntil</span>(<span class="hljs-params">el, selector, filter</span>) </span>{
  <span class="hljs-keyword">const</span> result = [];
  <span class="hljs-keyword">const</span> matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

  <span class="hljs-comment">// match start from parent</span>
  el = el.parentElement;
  <span class="hljs-keyword">while</span> (el &amp;&amp; !matchesSelector.call(el, selector)) {
    <span class="hljs-keyword">if</span> (!filter) {
      result.push(el);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">if</span> (matchesSelector.call(el, filter)) {
        result.push(el);
      }
    }
    el = el.parentElement;
  }
  <span class="hljs-keyword">return</span> result;
}</code></pre></li><li><p><a href="#1.8">1.8</a> <a></a> Form</p><ul><li><p>Input/Textarea</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$(&apos;#my-input&apos;).val();

// Native
document.querySelector(&apos;#my-input&apos;).value;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$(<span class="hljs-string">&apos;#my-input&apos;</span>).val();

<span class="hljs-comment">// Native</span>
<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;#my-input&apos;</span>).value;</code></pre></li><li><p>&#x83B7;&#x53D6; e.currentTarget &#x5728; <code>.radio</code> &#x4E2D;&#x7684;&#x6570;&#x7EC4;&#x7D22;&#x5F15;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$(&apos;.radio&apos;).index(e.currentTarget);

// Native
Array.prototype.indexOf.call(document.querySelectorAll(&apos;.radio&apos;), e.currentTarget);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$(<span class="hljs-string">&apos;.radio&apos;</span>).index(e.currentTarget);

<span class="hljs-comment">// Native</span>
<span class="hljs-built_in">Array</span>.prototype.indexOf.call(<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">&apos;.radio&apos;</span>), e.currentTarget);</code></pre></li></ul></li><li><p><a href="#1.9">1.9</a> <a></a> Iframe Contents</p><p>jQuery &#x5BF9;&#x8C61;&#x7684; iframe <code>contents()</code> &#x8FD4;&#x56DE;&#x7684;&#x662F; iframe &#x5185;&#x7684; <code>document</code></p><ul><li><p>Iframe contents</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$iframe.contents();

// Native
iframe.contentDocument;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$iframe.contents();

<span class="hljs-comment">// Native</span>
iframe.contentDocument;</code></pre></li><li><p>Iframe Query</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$iframe.contents().find(&apos;.css&apos;);

// Native
iframe.contentDocument.querySelectorAll(&apos;.css&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$iframe.contents().find(<span class="hljs-string">&apos;.css&apos;</span>);

<span class="hljs-comment">// Native</span>
iframe.contentDocument.querySelectorAll(<span class="hljs-string">&apos;.css&apos;</span>);</code></pre></li></ul></li><li><p><a href="#1.10">1.10</a> <a></a> &#x83B7;&#x53D6; body</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$(&apos;body&apos;);

// Native
document.body;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$(<span class="hljs-string">&apos;body&apos;</span>);

<span class="hljs-comment">// Native</span>
<span class="hljs-built_in">document</span>.body;</code></pre></li><li><p><a href="#1.11">1.11</a> <a></a> &#x83B7;&#x53D6;&#x6216;&#x8BBE;&#x7F6E;&#x5C5E;&#x6027;</p><ul><li><p>&#x83B7;&#x53D6;&#x5C5E;&#x6027;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.attr(&apos;foo&apos;);

// Native
el.getAttribute(&apos;foo&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.attr(<span class="hljs-string">&apos;foo&apos;</span>);

<span class="hljs-comment">// Native</span>
el.getAttribute(<span class="hljs-string">&apos;foo&apos;</span>);</code></pre></li><li><p>&#x8BBE;&#x7F6E;&#x5C5E;&#x6027;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery, note that this works in memory without change the DOM
$el.attr(&apos;foo&apos;, &apos;bar&apos;);

// Native
el.setAttribute(&apos;foo&apos;, &apos;bar&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery, note that this works in memory without change the DOM</span>
$el.attr(<span class="hljs-string">&apos;foo&apos;</span>, <span class="hljs-string">&apos;bar&apos;</span>);

<span class="hljs-comment">// Native</span>
el.setAttribute(<span class="hljs-string">&apos;foo&apos;</span>, <span class="hljs-string">&apos;bar&apos;</span>);</code></pre></li><li><p>&#x83B7;&#x53D6; <code>data-</code> &#x5C5E;&#x6027;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.data(&apos;foo&apos;);

// Native (use `getAttribute`)
el.getAttribute(&apos;data-foo&apos;);

// Native (use `dataset` if only need to support IE 11+)
el.dataset[&apos;foo&apos;];" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.data(<span class="hljs-string">&apos;foo&apos;</span>);

<span class="hljs-comment">// Native (use `getAttribute`)</span>
el.getAttribute(<span class="hljs-string">&apos;data-foo&apos;</span>);

<span class="hljs-comment">// Native (use `dataset` if only need to support IE 11+)</span>
el.dataset[<span class="hljs-string">&apos;foo&apos;</span>];</code></pre></li></ul></li></ul><p><strong><a href="#%E7%9B%AE%E5%BD%95"><span style="font-weight:400">&#x2B06;</span> &#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h2 id="articleHeader4">CSS &amp; Style</h2><ul><li><p><a href="#2.1">2.1</a> <a></a> CSS</p><ul><li><p>Get style</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.css(&quot;color&quot;);

// Native
// &#x6CE8;&#x610F;&#xFF1A;&#x6B64;&#x5904;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x5F53; style &#x503C;&#x4E3A; auto &#x65F6;&#xFF0C;&#x8FD4;&#x56DE; auto &#x7684;&#x95EE;&#x9898;
const win = el.ownerDocument.defaultView;

// null &#x7684;&#x610F;&#x601D;&#x662F;&#x4E0D;&#x8FD4;&#x56DE;&#x4F2A;&#x7C7B;&#x5143;&#x7D20;
win.getComputedStyle(el, null).color;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.css(<span class="hljs-string">&quot;color&quot;</span>);

<span class="hljs-comment">// Native</span>
<span class="hljs-comment">// &#x6CE8;&#x610F;&#xFF1A;&#x6B64;&#x5904;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x5F53; style &#x503C;&#x4E3A; auto &#x65F6;&#xFF0C;&#x8FD4;&#x56DE; auto &#x7684;&#x95EE;&#x9898;</span>
<span class="hljs-keyword">const</span> win = el.ownerDocument.defaultView;

<span class="hljs-comment">// null &#x7684;&#x610F;&#x601D;&#x662F;&#x4E0D;&#x8FD4;&#x56DE;&#x4F2A;&#x7C7B;&#x5143;&#x7D20;</span>
win.getComputedStyle(el, <span class="hljs-literal">null</span>).color;</code></pre></li><li><p>Set style</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.css({ color: &quot;#ff0011&quot; });

// Native
el.style.color = &apos;#ff0011&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.css({ <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;#ff0011&quot;</span> });

<span class="hljs-comment">// Native</span>
el.style.color = <span class="hljs-string">&apos;#ff0011&apos;</span>;</code></pre></li><li>Get/Set Styles<p>&#x6CE8;&#x610F;&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x4E00;&#x6B21;&#x8BBE;&#x7F6E;&#x591A;&#x4E2A; style&#xFF0C;&#x53EF;&#x4EE5;&#x53C2;&#x8003; oui-dom-utils &#x4E2D; <a href="https://github.com/oneuijs/oui-dom-utils/blob/master/src/index.js#L194" rel="nofollow noreferrer" target="_blank">setStyles</a> &#x65B9;&#x6CD5;</p></li><li><p>Add class</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.addClass(className);

// Native
el.classList.add(className);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.addClass(className);

<span class="hljs-comment">// Native</span>
el.classList.add(className);</code></pre></li><li><p>Remove class</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.removeClass(className);

// Native
el.classList.remove(className);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.removeClass(className);

<span class="hljs-comment">// Native</span>
el.classList.remove(className);</code></pre></li><li><p>has class</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.hasClass(className);

// Native
el.classList.contains(className);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.hasClass(className);

<span class="hljs-comment">// Native</span>
el.classList.contains(className);</code></pre></li><li><p>Toggle class</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.toggleClass(className);

// Native
el.classList.toggle(className);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.toggleClass(className);

<span class="hljs-comment">// Native</span>
el.classList.toggle(className);</code></pre></li></ul></li><li><p><a href="#2.2">2.2</a> <a></a> Width &amp; Height</p><p>Width &#x4E0E; Height &#x83B7;&#x53D6;&#x65B9;&#x6CD5;&#x76F8;&#x540C;&#xFF0C;&#x4E0B;&#x9762;&#x4EE5; Height &#x4E3A;&#x4F8B;&#xFF1A;</p><ul><li><p>Window height</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// window height
$(window).height();

// &#x542B; scrollbar
window.document.documentElement.clientHeight;

// &#x4E0D;&#x542B; scrollbar&#xFF0C;&#x4E0E; jQuery &#x884C;&#x4E3A;&#x4E00;&#x81F4;
window.innerHeight;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// window height</span>
$(<span class="hljs-built_in">window</span>).height();

<span class="hljs-comment">// &#x542B; scrollbar</span>
<span class="hljs-built_in">window</span>.document.documentElement.clientHeight;

<span class="hljs-comment">// &#x4E0D;&#x542B; scrollbar&#xFF0C;&#x4E0E; jQuery &#x884C;&#x4E3A;&#x4E00;&#x81F4;</span>
<span class="hljs-built_in">window</span>.innerHeight;</code></pre></li><li><p>Document height</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$(document).height();

// Native
const body = document.body;
const html = document.documentElement;
const height = Math.max(
  body.offsetHeight,
  body.scrollHeight,
  html.clientHeight,
  html.offsetHeight,
  html.scrollHeight
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$(<span class="hljs-built_in">document</span>).height();

<span class="hljs-comment">// Native</span>
<span class="hljs-keyword">const</span> body = <span class="hljs-built_in">document</span>.body;
<span class="hljs-keyword">const</span> html = <span class="hljs-built_in">document</span>.documentElement;
<span class="hljs-keyword">const</span> height = <span class="hljs-built_in">Math</span>.max(
  body.offsetHeight,
  body.scrollHeight,
  html.clientHeight,
  html.offsetHeight,
  html.scrollHeight
);</code></pre></li><li><p>Element height</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.height();

// Native
function getHeight(el) {
  const styles = this.getComputedStyle(el);
  const height = el.offsetHeight;
  const borderTopWidth = parseFloat(styles.borderTopWidth);
  const borderBottomWidth = parseFloat(styles.borderBottomWidth);
  const paddingTop = parseFloat(styles.paddingTop);
  const paddingBottom = parseFloat(styles.paddingBottom);
  return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
}

// &#x7CBE;&#x786E;&#x5230;&#x6574;&#x6570;&#xFF08;border-box &#x65F6;&#x4E3A; height - border &#x503C;&#xFF0C;content-box &#x65F6;&#x4E3A; height + padding &#x503C;&#xFF09;
el.clientHeight;

// &#x7CBE;&#x786E;&#x5230;&#x5C0F;&#x6570;&#xFF08;border-box &#x65F6;&#x4E3A; height &#x503C;&#xFF0C;content-box &#x65F6;&#x4E3A; height + padding + border &#x503C;&#xFF09;
el.getBoundingClientRect().height;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.height();

<span class="hljs-comment">// Native</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getHeight</span>(<span class="hljs-params">el</span>) </span>{
  <span class="hljs-keyword">const</span> styles = <span class="hljs-keyword">this</span>.getComputedStyle(el);
  <span class="hljs-keyword">const</span> height = el.offsetHeight;
  <span class="hljs-keyword">const</span> borderTopWidth = <span class="hljs-built_in">parseFloat</span>(styles.borderTopWidth);
  <span class="hljs-keyword">const</span> borderBottomWidth = <span class="hljs-built_in">parseFloat</span>(styles.borderBottomWidth);
  <span class="hljs-keyword">const</span> paddingTop = <span class="hljs-built_in">parseFloat</span>(styles.paddingTop);
  <span class="hljs-keyword">const</span> paddingBottom = <span class="hljs-built_in">parseFloat</span>(styles.paddingBottom);
  <span class="hljs-keyword">return</span> height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
}

<span class="hljs-comment">// &#x7CBE;&#x786E;&#x5230;&#x6574;&#x6570;&#xFF08;border-box &#x65F6;&#x4E3A; height - border &#x503C;&#xFF0C;content-box &#x65F6;&#x4E3A; height + padding &#x503C;&#xFF09;</span>
el.clientHeight;

<span class="hljs-comment">// &#x7CBE;&#x786E;&#x5230;&#x5C0F;&#x6570;&#xFF08;border-box &#x65F6;&#x4E3A; height &#x503C;&#xFF0C;content-box &#x65F6;&#x4E3A; height + padding + border &#x503C;&#xFF09;</span>
el.getBoundingClientRect().height;</code></pre></li></ul></li><li><p><a href="#2.3">2.3</a> <a></a> Position &amp; Offset</p><ul><li><p>Position</p><p>&#x83B7;&#x5F97;&#x5339;&#x914D;&#x5143;&#x7D20;&#x76F8;&#x5BF9;&#x7236;&#x5143;&#x7D20;&#x7684;&#x504F;&#x79FB;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.position();

// Native
{ left: el.offsetLeft, top: el.offsetTop }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.position();

<span class="hljs-comment">// Native</span>
{ <span class="hljs-attr">left</span>: el.offsetLeft, <span class="hljs-attr">top</span>: el.offsetTop }</code></pre></li><li><p>Offset</p><p>&#x83B7;&#x5F97;&#x5339;&#x914D;&#x5143;&#x7D20;&#x76F8;&#x5BF9;&#x6587;&#x6863;&#x7684;&#x504F;&#x79FB;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.offset();

// Native
function getOffset (el) {
  const box = el.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset - document.documentElement.clientTop,
    left: box.left + window.pageXOffset - document.documentElement.clientLeft
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.offset();

<span class="hljs-comment">// Native</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getOffset</span> (<span class="hljs-params">el</span>) </span>{
  <span class="hljs-keyword">const</span> box = el.getBoundingClientRect();

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">top</span>: box.top + <span class="hljs-built_in">window</span>.pageYOffset - <span class="hljs-built_in">document</span>.documentElement.clientTop,
    <span class="hljs-attr">left</span>: box.left + <span class="hljs-built_in">window</span>.pageXOffset - <span class="hljs-built_in">document</span>.documentElement.clientLeft
  }
}</code></pre></li></ul></li><li><a href="#2.4">2.4</a> <a></a> Scroll Top</li></ul><p>&#x83B7;&#x53D6;&#x5143;&#x7D20;&#x6EDA;&#x52A8;&#x6761;&#x5782;&#x76F4;&#x4F4D;&#x7F6E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$(window).scrollTop();

// Native
(document.documentElement &amp;&amp; document.documentElement.scrollTop) || document.body.scrollTop;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$(<span class="hljs-built_in">window</span>).scrollTop();

<span class="hljs-comment">// Native</span>
(<span class="hljs-built_in">document</span>.documentElement &amp;&amp; <span class="hljs-built_in">document</span>.documentElement.scrollTop) || <span class="hljs-built_in">document</span>.body.scrollTop;</code></pre><p><strong><a href="#%E7%9B%AE%E5%BD%95"><span style="font-weight:400">&#x2B06;</span> &#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h2 id="articleHeader5">DOM Manipulation</h2><ul><li><p><a href="#3.1">3.1</a> <a></a> Remove</p><p>&#x4ECE; DOM &#x4E2D;&#x79FB;&#x9664;&#x5143;&#x7D20;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.remove();

// Native
el.parentNode.removeChild(el);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.remove();

<span class="hljs-comment">// Native</span>
el.parentNode.removeChild(el);</code></pre></li><li><p><a href="#3.2">3.2</a> <a></a> Text</p><ul><li><p>Get text</p><p>&#x8FD4;&#x56DE;&#x6307;&#x5B9A;&#x5143;&#x7D20;&#x53CA;&#x5176;&#x540E;&#x4EE3;&#x7684;&#x6587;&#x672C;&#x5185;&#x5BB9;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.text();

// Native
el.textContent;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.text();

<span class="hljs-comment">// Native</span>
el.textContent;</code></pre></li><li><p>Set text</p><p>&#x8BBE;&#x7F6E;&#x5143;&#x7D20;&#x7684;&#x6587;&#x672C;&#x5185;&#x5BB9;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.text(string);

// Native
el.textContent = string;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.text(string);

<span class="hljs-comment">// Native</span>
el.textContent = string;</code></pre></li></ul></li><li><p><a href="#3.3">3.3</a> <a></a> HTML</p><ul><li><p>Get HTML</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.html();

// Native
el.innerHTML;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.html();

<span class="hljs-comment">// Native</span>
el.innerHTML;</code></pre></li><li><p>Set HTML</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.html(htmlString);

// Native
el.innerHTML = htmlString;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.html(htmlString);

<span class="hljs-comment">// Native</span>
el.innerHTML = htmlString;</code></pre></li></ul></li><li><p><a href="#3.4">3.4</a> <a></a> Append</p><p>Append &#x63D2;&#x5165;&#x5230;&#x5B50;&#x8282;&#x70B9;&#x7684;&#x672B;&#x5C3E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.append(&quot;&lt;div id=&apos;container&apos;&gt;hello&lt;/div&gt;&quot;);

// Native (HTML string)
el.insertAdjacentHTML(&apos;beforeend&apos;, &apos;&lt;div id=&quot;container&quot;&gt;Hello World&lt;/div&gt;&apos;);

// Native (Element)
el.appendChild(newEl);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.append(<span class="hljs-string">&quot;&lt;div id=&apos;container&apos;&gt;hello&lt;/div&gt;&quot;</span>);

<span class="hljs-comment">// Native (HTML string)</span>
el.insertAdjacentHTML(<span class="hljs-string">&apos;beforeend&apos;</span>, <span class="hljs-string">&apos;&lt;div id=&quot;container&quot;&gt;Hello World&lt;/div&gt;&apos;</span>);

<span class="hljs-comment">// Native (Element)</span>
el.appendChild(newEl);</code></pre></li><li><p><a href="#3.5">3.5</a> <a></a> Prepend</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.prepend(&quot;&lt;div id=&apos;container&apos;&gt;hello&lt;/div&gt;&quot;);

// Native (HTML string)
el.insertAdjacentHTML(&apos;afterbegin&apos;, &apos;&lt;div id=&quot;container&quot;&gt;Hello World&lt;/div&gt;&apos;);

// Native (Element)
el.insertBefore(newEl, el.firstChild);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.prepend(<span class="hljs-string">&quot;&lt;div id=&apos;container&apos;&gt;hello&lt;/div&gt;&quot;</span>);

<span class="hljs-comment">// Native (HTML string)</span>
el.insertAdjacentHTML(<span class="hljs-string">&apos;afterbegin&apos;</span>, <span class="hljs-string">&apos;&lt;div id=&quot;container&quot;&gt;Hello World&lt;/div&gt;&apos;</span>);

<span class="hljs-comment">// Native (Element)</span>
el.insertBefore(newEl, el.firstChild);</code></pre></li><li><p><a href="#3.6">3.6</a> <a></a> insertBefore</p><p>&#x5728;&#x9009;&#x4E2D;&#x5143;&#x7D20;&#x524D;&#x63D2;&#x5165;&#x65B0;&#x8282;&#x70B9;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$newEl.insertBefore(queryString);

// Native (HTML string)
el.insertAdjacentHTML(&apos;beforebegin &apos;, &apos;&lt;div id=&quot;container&quot;&gt;Hello World&lt;/div&gt;&apos;);

// Native (Element)
const el = document.querySelector(selector);
if (el.parentNode) {
  el.parentNode.insertBefore(newEl, el);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$newEl.insertBefore(queryString);

<span class="hljs-comment">// Native (HTML string)</span>
el.insertAdjacentHTML(<span class="hljs-string">&apos;beforebegin &apos;</span>, <span class="hljs-string">&apos;&lt;div id=&quot;container&quot;&gt;Hello World&lt;/div&gt;&apos;</span>);

<span class="hljs-comment">// Native (Element)</span>
<span class="hljs-keyword">const</span> el = <span class="hljs-built_in">document</span>.querySelector(selector);
<span class="hljs-keyword">if</span> (el.parentNode) {
  el.parentNode.insertBefore(newEl, el);
}</code></pre></li><li><p><a href="#3.7">3.7</a> <a></a> insertAfter</p><p>&#x5728;&#x9009;&#x4E2D;&#x5143;&#x7D20;&#x540E;&#x63D2;&#x5165;&#x65B0;&#x8282;&#x70B9;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$newEl.insertAfter(queryString);

// Native (HTML string)
el.insertAdjacentHTML(&apos;afterend&apos;, &apos;&lt;div id=&quot;container&quot;&gt;Hello World&lt;/div&gt;&apos;);

// Native (Element)
const el = document.querySelector(selector);
if (el.parentNode) {
  el.parentNode.insertBefore(newEl, el.nextSibling);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$newEl.insertAfter(queryString);

<span class="hljs-comment">// Native (HTML string)</span>
el.insertAdjacentHTML(<span class="hljs-string">&apos;afterend&apos;</span>, <span class="hljs-string">&apos;&lt;div id=&quot;container&quot;&gt;Hello World&lt;/div&gt;&apos;</span>);

<span class="hljs-comment">// Native (Element)</span>
<span class="hljs-keyword">const</span> el = <span class="hljs-built_in">document</span>.querySelector(selector);
<span class="hljs-keyword">if</span> (el.parentNode) {
  el.parentNode.insertBefore(newEl, el.nextSibling);
}</code></pre></li><li><p><a href="#3.8">3.8</a> <a></a> is</p><p>&#x5982;&#x679C;&#x5339;&#x914D;&#x7ED9;&#x5B9A;&#x7684;&#x9009;&#x62E9;&#x5668;&#xFF0C;&#x8FD4;&#x56DE;true</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.is(selector);

// Native
el.matches(selector);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.is(selector);

<span class="hljs-comment">// Native</span>
el.matches(selector);</code></pre></li><li><p><a href="#3.9">3.9</a> <a></a> clone</p><p>&#x6DF1;&#x62F7;&#x8D1D;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x3002;&#xFF08;&#x751F;&#x6210;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x7684;&#x526F;&#x672C;&#xFF0C;&#x5305;&#x542B;&#x5B50;&#x8282;&#x70B9;&#x3001;&#x6587;&#x672C;&#x548C;&#x5C5E;&#x6027;&#x3002;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//jQuery
$el.clone();

//Native
el.cloneNode();

//&#x6DF1;&#x62F7;&#x8D1D;&#x6DFB;&#x52A0;&#x53C2;&#x6570;&#x2018;true&#x2019;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//jQuery</span>
$el.clone();

<span class="hljs-comment">//Native</span>
el.cloneNode();

<span class="hljs-comment">//&#x6DF1;&#x62F7;&#x8D1D;&#x6DFB;&#x52A0;&#x53C2;&#x6570;&#x2018;true&#x2019;</span></code></pre></li><li><a href="#3.10">3.10</a> <a></a> empty<p>&#x79FB;&#x9664;&#x6240;&#x6709;&#x5B50;&#x8282;&#x70B9;</p></li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//jQuery
$el.empty();

//Native
el.innerHTML = &apos;&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//jQuery</span>
$el.empty();

<span class="hljs-comment">//Native</span>
el.innerHTML = <span class="hljs-string">&apos;&apos;</span>;</code></pre><ul><li><p><a href="#3.11">3.11</a> <a></a> wrap</p><p>&#x628A;&#x6BCF;&#x4E2A;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x653E;&#x7F6E;&#x5728;&#x6307;&#x5B9A;&#x7684;HTML&#x7ED3;&#x6784;&#x4E2D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//jQuery
$(&quot;.inner&quot;).wrap(&apos;&lt;div class=&quot;wrapper&quot;&gt;&lt;/div&gt;&apos;);

//Native
Array.prototype.forEach.call(document.querySelector(&apos;.inner&apos;), (el) =&gt; {
   const wrapper = document.createElement(&apos;div&apos;);
   wrapper.className = &apos;wrapper&apos;;
   el.parentNode.insertBefore(wrapper, el);
   el.parentNode.removeChild(el);
   wrapper.appendChild(el);
});
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//jQuery</span>
$(<span class="hljs-string">&quot;.inner&quot;</span>).wrap(<span class="hljs-string">&apos;&lt;div class=&quot;wrapper&quot;&gt;&lt;/div&gt;&apos;</span>);

<span class="hljs-comment">//Native</span>
<span class="hljs-built_in">Array</span>.prototype.forEach.call(<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;.inner&apos;</span>), (el) =&gt; {
   <span class="hljs-keyword">const</span> wrapper = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;div&apos;</span>);
   wrapper.className = <span class="hljs-string">&apos;wrapper&apos;</span>;
   el.parentNode.insertBefore(wrapper, el);
   el.parentNode.removeChild(el);
   wrapper.appendChild(el);
});
</code></pre></li><li><p><a href="#3.12">3.12</a> <a></a> unwrap</p><p>&#x79FB;&#x9664;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x7684;&#x7236;&#x5143;&#x7D20;&#x7684;DOM&#x7ED3;&#x6784;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$(&apos;.inner&apos;).unwrap();

// Native
Array.prototype.forEach.call(document.querySelectorAll(&apos;.inner&apos;), (el) =&gt; {
      let elParentNode = el.parentNode

      if(elParentNode !== document.body) {
          elParentNode.parentNode.insertBefore(el, elParentNode)
          elParentNode.parentNode.removeChild(elParentNode)
      }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$(<span class="hljs-string">&apos;.inner&apos;</span>).unwrap();

<span class="hljs-comment">// Native</span>
<span class="hljs-built_in">Array</span>.prototype.forEach.call(<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">&apos;.inner&apos;</span>), (el) =&gt; {
      <span class="hljs-keyword">let</span> elParentNode = el.parentNode

      <span class="hljs-keyword">if</span>(elParentNode !== <span class="hljs-built_in">document</span>.body) {
          elParentNode.parentNode.insertBefore(el, elParentNode)
          elParentNode.parentNode.removeChild(elParentNode)
      }
});</code></pre></li><li><p><a href="#3.13">3.13</a> <a></a> replaceWith</p><p>&#x7528;&#x6307;&#x5B9A;&#x7684;&#x5143;&#x7D20;&#x66FF;&#x6362;&#x88AB;&#x9009;&#x7684;&#x5143;&#x7D20;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//jQuery
$(&apos;.inner&apos;).replaceWith(&apos;&lt;div class=&quot;outer&quot;&gt;&lt;/div&gt;&apos;);

//Native
Array.prototype.forEach.call(document.querySelectorAll(&apos;.inner&apos;),(el) =&gt; {
  const outer = document.createElement(&quot;div&quot;);
  outer.className = &quot;outer&quot;;
  el.parentNode.insertBefore(outer, el);
  el.parentNode.removeChild(el);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//jQuery</span>
$(<span class="hljs-string">&apos;.inner&apos;</span>).replaceWith(<span class="hljs-string">&apos;&lt;div class=&quot;outer&quot;&gt;&lt;/div&gt;&apos;</span>);

<span class="hljs-comment">//Native</span>
<span class="hljs-built_in">Array</span>.prototype.forEach.call(<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">&apos;.inner&apos;</span>),(el) =&gt; {
  <span class="hljs-keyword">const</span> outer = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&quot;div&quot;</span>);
  outer.className = <span class="hljs-string">&quot;outer&quot;</span>;
  el.parentNode.insertBefore(outer, el);
  el.parentNode.removeChild(el);
});</code></pre></li><li><p><a href="#3.14">3.14</a> <a></a> simple parse</p><p>&#x89E3;&#x6790; HTML/SVG/XML &#x5B57;&#x7B26;&#x4E32;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$(`&lt;ol&gt;
  &lt;li&gt;a&lt;/li&gt;
  &lt;li&gt;b&lt;/li&gt;
&lt;/ol&gt;
&lt;ol&gt;
  &lt;li&gt;c&lt;/li&gt;
  &lt;li&gt;d&lt;/li&gt;
&lt;/ol&gt;`);

// Native
range = document.createRange();
parse = range.createContextualFragment.bind(range);

parse(`&lt;ol&gt;
  &lt;li&gt;a&lt;/li&gt;
  &lt;li&gt;b&lt;/li&gt;
&lt;/ol&gt;
&lt;ol&gt;
  &lt;li&gt;c&lt;/li&gt;
  &lt;li&gt;d&lt;/li&gt;
&lt;/ol&gt;`);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$(<span class="hljs-string">`&lt;ol&gt;
  &lt;li&gt;a&lt;/li&gt;
  &lt;li&gt;b&lt;/li&gt;
&lt;/ol&gt;
&lt;ol&gt;
  &lt;li&gt;c&lt;/li&gt;
  &lt;li&gt;d&lt;/li&gt;
&lt;/ol&gt;`</span>);

<span class="hljs-comment">// Native</span>
range = <span class="hljs-built_in">document</span>.createRange();
parse = range.createContextualFragment.bind(range);

parse(<span class="hljs-string">`&lt;ol&gt;
  &lt;li&gt;a&lt;/li&gt;
  &lt;li&gt;b&lt;/li&gt;
&lt;/ol&gt;
&lt;ol&gt;
  &lt;li&gt;c&lt;/li&gt;
  &lt;li&gt;d&lt;/li&gt;
&lt;/ol&gt;`</span>);</code></pre></li></ul><p><strong><a href="#%E7%9B%AE%E5%BD%95"><span style="font-weight:400">&#x2B06;</span> &#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h2 id="articleHeader6">Ajax</h2><p><a href="https://fetch.spec.whatwg.org/" rel="nofollow noreferrer" target="_blank">Fetch API</a> &#x662F;&#x7528;&#x4E8E;&#x66FF;&#x6362; XMLHttpRequest &#x5904;&#x7406; ajax &#x7684;&#x65B0;&#x6807;&#x51C6;&#xFF0C;Chrome &#x548C; Firefox &#x5747;&#x652F;&#x6301;&#xFF0C;&#x65E7;&#x6D4F;&#x89C8;&#x5668;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; polyfills &#x63D0;&#x4F9B;&#x652F;&#x6301;&#x3002;</p><p>IE9+ &#x8BF7;&#x4F7F;&#x7528; <a href="http://github.com/github/fetch" rel="nofollow noreferrer" target="_blank">github/fetch</a>&#xFF0C;IE8+ &#x8BF7;&#x4F7F;&#x7528; <a href="https://github.com/camsong/fetch-ie8/" rel="nofollow noreferrer" target="_blank">fetch-ie8</a>&#xFF0C;JSONP &#x8BF7;&#x4F7F;&#x7528; <a href="https://github.com/camsong/fetch-jsonp" rel="nofollow noreferrer" target="_blank">fetch-jsonp</a>&#x3002;</p><ul><li><p><a href="#4.1">4.1</a> <a></a> &#x4ECE;&#x670D;&#x52A1;&#x5668;&#x8BFB;&#x53D6;&#x6570;&#x636E;&#x5E76;&#x66FF;&#x6362;&#x5339;&#x914D;&#x5143;&#x7D20;&#x7684;&#x5185;&#x5BB9;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$(selector).load(url, completeCallback)

// Native
fetch(url).then(data =&gt; data.text()).then(data =&gt; {
  document.querySelector(selector).innerHTML = data
}).then(completeCallback)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$(selector).load(url, completeCallback)

<span class="hljs-comment">// Native</span>
fetch(url).then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> data.text()).then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
  <span class="hljs-built_in">document</span>.querySelector(selector).innerHTML = data
}).then(completeCallback)</code></pre></li></ul><p><strong><a href="#%E7%9B%AE%E5%BD%95"><span style="font-weight:400">&#x2B06;</span> &#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h2 id="articleHeader7">Events</h2><p>&#x5B8C;&#x6574;&#x5730;&#x66FF;&#x4EE3;&#x547D;&#x540D;&#x7A7A;&#x95F4;&#x548C;&#x4E8B;&#x4EF6;&#x4EE3;&#x7406;&#xFF0C;&#x94FE;&#x63A5;&#x5230; <a href="https://github.com/oneuijs/oui-dom-events" rel="nofollow noreferrer" target="_blank">https://github.com/oneuijs/ou...</a></p><ul><li><p><a href="#5.0">5.0</a> <a></a> Document ready by <code>DOMContentLoaded</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$(document).ready(eventHandler);

// Native
// &#x68C0;&#x6D4B; DOMContentLoaded &#x662F;&#x5426;&#x5DF2;&#x5B8C;&#x6210;
if (document.readyState !== &apos;loading&apos;) {
  eventHandler();
} else {
  document.addEventListener(&apos;DOMContentLoaded&apos;, eventHandler);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$(<span class="hljs-built_in">document</span>).ready(eventHandler);

<span class="hljs-comment">// Native</span>
<span class="hljs-comment">// &#x68C0;&#x6D4B; DOMContentLoaded &#x662F;&#x5426;&#x5DF2;&#x5B8C;&#x6210;</span>
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.readyState !== <span class="hljs-string">&apos;loading&apos;</span>) {
  eventHandler();
} <span class="hljs-keyword">else</span> {
  <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">&apos;DOMContentLoaded&apos;</span>, eventHandler);
}</code></pre></li><li><p><a href="#5.1">5.1</a> <a></a> &#x4F7F;&#x7528; on &#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.on(eventName, eventHandler);

// Native
el.addEventListener(eventName, eventHandler);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.on(eventName, eventHandler);

<span class="hljs-comment">// Native</span>
el.addEventListener(eventName, eventHandler);</code></pre></li><li><p><a href="#5.2">5.2</a> <a></a> &#x4F7F;&#x7528; off &#x89E3;&#x7ED1;&#x4E8B;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.off(eventName, eventHandler);

// Native
el.removeEventListener(eventName, eventHandler);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.off(eventName, eventHandler);

<span class="hljs-comment">// Native</span>
el.removeEventListener(eventName, eventHandler);</code></pre></li><li><p><a href="#5.3">5.3</a> <a></a> Trigger</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$(el).trigger(&apos;custom-event&apos;, {key1: &apos;data&apos;});

// Native
if (window.CustomEvent) {
  const event = new CustomEvent(&apos;custom-event&apos;, {detail: {key1: &apos;data&apos;}});
} else {
  const event = document.createEvent(&apos;CustomEvent&apos;);
  event.initCustomEvent(&apos;custom-event&apos;, true, true, {key1: &apos;data&apos;});
}

el.dispatchEvent(event);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$(el).trigger(<span class="hljs-string">&apos;custom-event&apos;</span>, {<span class="hljs-attr">key1</span>: <span class="hljs-string">&apos;data&apos;</span>});

<span class="hljs-comment">// Native</span>
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.CustomEvent) {
  <span class="hljs-keyword">const</span> event = <span class="hljs-keyword">new</span> CustomEvent(<span class="hljs-string">&apos;custom-event&apos;</span>, {<span class="hljs-attr">detail</span>: {<span class="hljs-attr">key1</span>: <span class="hljs-string">&apos;data&apos;</span>}});
} <span class="hljs-keyword">else</span> {
  <span class="hljs-keyword">const</span> event = <span class="hljs-built_in">document</span>.createEvent(<span class="hljs-string">&apos;CustomEvent&apos;</span>);
  event.initCustomEvent(<span class="hljs-string">&apos;custom-event&apos;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, {<span class="hljs-attr">key1</span>: <span class="hljs-string">&apos;data&apos;</span>});
}

el.dispatchEvent(event);</code></pre></li></ul><p><strong><a href="#%E7%9B%AE%E5%BD%95"><span style="font-weight:400">&#x2B06;</span> &#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h2 id="articleHeader8">Utilities</h2><p>&#x5927;&#x90E8;&#x5206;&#x5B9E;&#x7528;&#x5DE5;&#x5177;&#x90FD;&#x80FD;&#x5728; native API &#x4E2D;&#x627E;&#x5230;. &#x5176;&#x4ED6;&#x9AD8;&#x7EA7;&#x529F;&#x80FD;&#x53EF;&#x4EE5;&#x9009;&#x7528;&#x4E13;&#x6CE8;&#x4E8E;&#x8BE5;&#x9886;&#x57DF;&#x7684;&#x7A33;&#x5B9A;&#x6027;&#x548C;&#x6027;&#x80FD;&#x90FD;&#x66F4;&#x597D;&#x7684;&#x5E93;&#x6765;&#x4EE3;&#x66FF;&#xFF0C;&#x63A8;&#x8350; <a href="https://lodash.com" rel="nofollow noreferrer" target="_blank">lodash</a>&#x3002;</p><ul><li><p><a href="#6.1">6.1</a> <a></a> &#x57FA;&#x672C;&#x5DE5;&#x5177;</p><ul><li>isArray</li></ul></li></ul><p>&#x68C0;&#x6D4B;&#x53C2;&#x6570;&#x662F;&#x4E0D;&#x662F;&#x6570;&#x7EC4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$.isArray(range);

// Native
Array.isArray(range);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$.isArray(range);

<span class="hljs-comment">// Native</span>
<span class="hljs-built_in">Array</span>.isArray(range);</code></pre><ul><li>isWindow</li></ul><p>&#x68C0;&#x6D4B;&#x53C2;&#x6570;&#x662F;&#x4E0D;&#x662F; window&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$.isWindow(obj);

// Native
function isWindow(obj) {
  return obj !== null &amp;&amp; obj !== undefined &amp;&amp; obj === obj.window;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$.isWindow(obj);

<span class="hljs-comment">// Native</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isWindow</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">return</span> obj !== <span class="hljs-literal">null</span> &amp;&amp; obj !== <span class="hljs-literal">undefined</span> &amp;&amp; obj === obj.window;
}</code></pre><ul><li>inArray</li></ul><p>&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x641C;&#x7D22;&#x6307;&#x5B9A;&#x503C;&#x5E76;&#x8FD4;&#x56DE;&#x7D22;&#x5F15; (&#x627E;&#x4E0D;&#x5230;&#x5219;&#x8FD4;&#x56DE; -1)&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$.inArray(item, array);

// Native
array.indexOf(item) &gt; -1;

// ES6-way
array.includes(item);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$.inArray(item, array);

<span class="hljs-comment">// Native</span>
array.indexOf(item) &gt; <span class="hljs-number">-1</span>;

<span class="hljs-comment">// ES6-way</span>
array.includes(item);</code></pre><ul><li>isNumeric</li></ul><p>&#x68C0;&#x6D4B;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x662F;&#x4E0D;&#x662F;&#x6570;&#x5B57;&#x3002;<br>Use <code>typeof</code> to decide the type or the <code>type</code> example for better accuracy.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$.isNumeric(item);

// Native
function isNumeric(n) {
  return !isNaN(parseFloat(n)) &amp;&amp; isFinite(n);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$.isNumeric(item);

<span class="hljs-comment">// Native</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isNumeric</span>(<span class="hljs-params">n</span>) </span>{
  <span class="hljs-keyword">return</span> !<span class="hljs-built_in">isNaN</span>(<span class="hljs-built_in">parseFloat</span>(n)) &amp;&amp; <span class="hljs-built_in">isFinite</span>(n);
}</code></pre><ul><li>isFunction</li></ul><p>&#x68C0;&#x6D4B;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x662F;&#x4E0D;&#x662F; JavaScript &#x51FD;&#x6570;&#x5BF9;&#x8C61;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$.isFunction(item);

// Native
function isFunction(item) {
  if (typeof item === &apos;function&apos;) {
    return true;
  }
  var type = Object.prototype.toString(item);
  return type === &apos;[object Function]&apos; || type === &apos;[object GeneratorFunction]&apos;;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$.isFunction(item);

<span class="hljs-comment">// Native</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isFunction</span>(<span class="hljs-params">item</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> item === <span class="hljs-string">&apos;function&apos;</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }
  <span class="hljs-keyword">var</span> type = <span class="hljs-built_in">Object</span>.prototype.toString(item);
  <span class="hljs-keyword">return</span> type === <span class="hljs-string">&apos;[object Function]&apos;</span> || type === <span class="hljs-string">&apos;[object GeneratorFunction]&apos;</span>;
}</code></pre><ul><li>isEmptyObject</li></ul><p>&#x68C0;&#x6D4B;&#x5BF9;&#x8C61;&#x662F;&#x5426;&#x4E3A;&#x7A7A; (&#x5305;&#x62EC;&#x4E0D;&#x53EF;&#x679A;&#x4E3E;&#x5C5E;&#x6027;).</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$.isEmptyObject(obj);

// Native
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$.isEmptyObject(obj);

<span class="hljs-comment">// Native</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isEmptyObject</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.keys(obj).length === <span class="hljs-number">0</span>;
}</code></pre><ul><li>isPlainObject</li></ul><p>&#x68C0;&#x6D4B;&#x662F;&#x4E0D;&#x662F;&#x6241;&#x5E73;&#x5BF9;&#x8C61; (&#x4F7F;&#x7528; &#x201C;{}&#x201D; &#x6216; &#x201C;new Object&#x201D; &#x521B;&#x5EFA;).</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$.isPlainObject(obj);

// Native
function isPlainObject(obj) {
  if (typeof (obj) !== &apos;object&apos; || obj.nodeType || obj !== null &amp;&amp; obj !== undefined &amp;&amp; obj === obj.window) {
    return false;
  }

  if (obj.constructor &amp;&amp;
      !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, &apos;isPrototypeOf&apos;)) {
    return false;
  }

  return true;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$.isPlainObject(obj);

<span class="hljs-comment">// Native</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isPlainObject</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> (obj) !== <span class="hljs-string">&apos;object&apos;</span> || obj.nodeType || obj !== <span class="hljs-literal">null</span> &amp;&amp; obj !== <span class="hljs-literal">undefined</span> &amp;&amp; obj === obj.window) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

  <span class="hljs-keyword">if</span> (obj.constructor &amp;&amp;
      !<span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(obj.constructor.prototype, <span class="hljs-string">&apos;isPrototypeOf&apos;</span>)) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}</code></pre><ul><li>extend</li></ul><p>&#x5408;&#x5E76;&#x591A;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x5185;&#x5BB9;&#x5230;&#x7B2C;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x3002;<br>object.assign &#x662F; ES6 API&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <a href="https://github.com/ljharb/object.assign" rel="nofollow noreferrer" target="_blank">polyfill</a>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$.extend({}, defaultOpts, opts);

// Native
Object.assign({}, defaultOpts, opts);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$.extend({}, defaultOpts, opts);

<span class="hljs-comment">// Native</span>
<span class="hljs-built_in">Object</span>.assign({}, defaultOpts, opts);</code></pre><ul><li>trim</li></ul><p>&#x79FB;&#x9664;&#x5B57;&#x7B26;&#x4E32;&#x5934;&#x5C3E;&#x7A7A;&#x767D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$.trim(string);

// Native
string.trim();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$.trim(string);

<span class="hljs-comment">// Native</span>
string.trim();</code></pre><ul><li>map</li></ul><p>&#x5C06;&#x6570;&#x7EC4;&#x6216;&#x5BF9;&#x8C61;&#x8F6C;&#x5316;&#x4E3A;&#x5305;&#x542B;&#x65B0;&#x5185;&#x5BB9;&#x7684;&#x6570;&#x7EC4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$.map(array, (value, index) =&gt; {
});

// Native
array.map((value, index) =&gt; {
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$.map(array, (value, index) =&gt; {
});

<span class="hljs-comment">// Native</span>
array.map(<span class="hljs-function">(<span class="hljs-params">value, index</span>) =&gt;</span> {
});</code></pre><ul><li>each</li></ul><p>&#x8F6E;&#x8BE2;&#x51FD;&#x6570;&#xFF0C;&#x53EF;&#x7528;&#x4E8E;&#x5E73;&#x6ED1;&#x7684;&#x8F6E;&#x8BE2;&#x5BF9;&#x8C61;&#x548C;&#x6570;&#x7EC4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$.each(array, (index, value) =&gt; {
});

// Native
array.forEach((value, index) =&gt; {
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$.each(array, (index, value) =&gt; {
});

<span class="hljs-comment">// Native</span>
array.forEach(<span class="hljs-function">(<span class="hljs-params">value, index</span>) =&gt;</span> {
});</code></pre><ul><li>grep</li></ul><p>&#x627E;&#x5230;&#x6570;&#x7EC4;&#x4E2D;&#x7B26;&#x5408;&#x8FC7;&#x6EE4;&#x51FD;&#x6570;&#x7684;&#x5143;&#x7D20;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$.grep(array, (value, index) =&gt; {
});

// Native
array.filter((value, index) =&gt; {
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$.grep(array, (value, index) =&gt; {
});

<span class="hljs-comment">// Native</span>
array.filter(<span class="hljs-function">(<span class="hljs-params">value, index</span>) =&gt;</span> {
});</code></pre><ul><li>type</li></ul><p>&#x68C0;&#x6D4B;&#x5BF9;&#x8C61;&#x7684; JavaScript [Class] &#x5185;&#x90E8;&#x7C7B;&#x578B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$.type(obj);

// Native
function type(item) {
  const reTypeOf = /(?:^\[object\s(.*?)\]$)/;
  return Object.prototype.toString.call(item)
    .replace(reTypeOf, &apos;$1&apos;)
    .toLowerCase();
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$.type(obj);

<span class="hljs-comment">// Native</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">type</span>(<span class="hljs-params">item</span>) </span>{
  <span class="hljs-keyword">const</span> reTypeOf = <span class="hljs-regexp">/(?:^\[object\s(.*?)\]$)/</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(item)
    .replace(reTypeOf, <span class="hljs-string">&apos;$1&apos;</span>)
    .toLowerCase();
}</code></pre><ul><li>merge</li></ul><p>&#x5408;&#x5E76;&#x7B2C;&#x4E8C;&#x4E2A;&#x6570;&#x7EC4;&#x5185;&#x5BB9;&#x5230;&#x7B2C;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$.merge(array1, array2);

// Native
// &#x4F7F;&#x7528; concat&#xFF0C;&#x4E0D;&#x80FD;&#x53BB;&#x9664;&#x91CD;&#x590D;&#x503C;
function merge(...args) {
  return [].concat(...args)
}

// ES6&#xFF0C;&#x540C;&#x6837;&#x4E0D;&#x80FD;&#x53BB;&#x9664;&#x91CD;&#x590D;&#x503C;
array1 = [...array1, ...array2]

// &#x4F7F;&#x7528; Set&#xFF0C;&#x53EF;&#x4EE5;&#x53BB;&#x9664;&#x91CD;&#x590D;&#x503C;
function merge(...args) {
  return Array.from(new Set([].concat(...args)))
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$.merge(array1, array2);

<span class="hljs-comment">// Native</span>
<span class="hljs-comment">// &#x4F7F;&#x7528; concat&#xFF0C;&#x4E0D;&#x80FD;&#x53BB;&#x9664;&#x91CD;&#x590D;&#x503C;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">merge</span>(<span class="hljs-params">...args</span>) </span>{
  <span class="hljs-keyword">return</span> [].concat(...args)
}

<span class="hljs-comment">// ES6&#xFF0C;&#x540C;&#x6837;&#x4E0D;&#x80FD;&#x53BB;&#x9664;&#x91CD;&#x590D;&#x503C;</span>
array1 = [...array1, ...array2]

<span class="hljs-comment">// &#x4F7F;&#x7528; Set&#xFF0C;&#x53EF;&#x4EE5;&#x53BB;&#x9664;&#x91CD;&#x590D;&#x503C;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">merge</span>(<span class="hljs-params">...args</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.from(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([].concat(...args)))
}</code></pre><ul><li>now</li></ul><p>&#x8FD4;&#x56DE;&#x5F53;&#x524D;&#x65F6;&#x95F4;&#x7684;&#x6570;&#x5B57;&#x5448;&#x73B0;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$.now();

// Native
Date.now();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$.now();

<span class="hljs-comment">// Native</span>
<span class="hljs-built_in">Date</span>.now();</code></pre><ul><li>proxy</li></ul><p>&#x4F20;&#x5165;&#x51FD;&#x6570;&#x5E76;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x51FD;&#x6570;&#xFF0C;&#x8BE5;&#x51FD;&#x6570;&#x7ED1;&#x5B9A;&#x6307;&#x5B9A;&#x4E0A;&#x4E0B;&#x6587;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$.proxy(fn, context);

// Native
fn.bind(context);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$.proxy(fn, context);

<span class="hljs-comment">// Native</span>
fn.bind(context);</code></pre><ul><li>makeArray</li></ul><p>&#x7C7B;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x8F6C;&#x5316;&#x4E3A;&#x771F;&#x6B63;&#x7684; JavaScript &#x6570;&#x7EC4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$.makeArray(arrayLike);

// Native
Array.prototype.slice.call(arrayLike);

// ES6-way
Array.from(arrayLike);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$.makeArray(arrayLike);

<span class="hljs-comment">// Native</span>
<span class="hljs-built_in">Array</span>.prototype.slice.call(arrayLike);

<span class="hljs-comment">// ES6-way</span>
<span class="hljs-built_in">Array</span>.from(arrayLike);</code></pre><ul><li><p><a href="#6.2">6.2</a> <a></a> &#x5305;&#x542B;</p><p>&#x68C0;&#x6D4B; DOM &#x5143;&#x7D20;&#x662F;&#x4E0D;&#x662F;&#x5176;&#x4ED6; DOM &#x5143;&#x7D20;&#x7684;&#x540E;&#x4EE3;.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$.contains(el, child);

// Native
el !== child &amp;&amp; el.contains(child);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$.contains(el, child);

<span class="hljs-comment">// Native</span>
el !== child &amp;&amp; el.contains(child);</code></pre></li><li><p><a href="#6.3">6.3</a> <a></a> Globaleval</p><p>&#x5168;&#x5C40;&#x6267;&#x884C; JavaScript &#x4EE3;&#x7801;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$.globaleval(code);

// Native
function Globaleval(code) {
  const script = document.createElement(&apos;script&apos;);
  script.text = code;

  document.head.appendChild(script).parentNode.removeChild(script);
}

// Use eval, but context of eval is current, context of $.Globaleval is global.
eval(code);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$.globaleval(code);

<span class="hljs-comment">// Native</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Globaleval</span>(<span class="hljs-params">code</span>) </span>{
  <span class="hljs-keyword">const</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;script&apos;</span>);
  script.text = code;

  <span class="hljs-built_in">document</span>.head.appendChild(script).parentNode.removeChild(script);
}

<span class="hljs-comment">// Use eval, but context of eval is current, context of $.Globaleval is global.</span>
<span class="hljs-built_in">eval</span>(code);</code></pre></li><li><p><a href="#6.4">6.4</a> <a></a> &#x89E3;&#x6790;</p><ul><li>parseHTML</li></ul></li></ul><p>&#x89E3;&#x6790;&#x5B57;&#x7B26;&#x4E32;&#x4E3A; DOM &#x8282;&#x70B9;&#x6570;&#x7EC4;.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$.parseHTML(htmlString);

// Native
function parseHTML(string) {
  const context = document.implementation.createHTMLDocument();

  // Set the base href for the created document so any parsed elements with URLs
  // are based on the document&apos;s URL
  const base = context.createElement(&apos;base&apos;);
  base.href = document.location.href;
  context.head.appendChild(base);

  context.body.innerHTML = string;
  return context.body.children;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$.parseHTML(htmlString);

<span class="hljs-comment">// Native</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parseHTML</span>(<span class="hljs-params">string</span>) </span>{
  <span class="hljs-keyword">const</span> context = <span class="hljs-built_in">document</span>.implementation.createHTMLDocument();

  <span class="hljs-comment">// Set the base href for the created document so any parsed elements with URLs</span>
  <span class="hljs-comment">// are based on the document&apos;s URL</span>
  <span class="hljs-keyword">const</span> base = context.createElement(<span class="hljs-string">&apos;base&apos;</span>);
  base.href = <span class="hljs-built_in">document</span>.location.href;
  context.head.appendChild(base);

  context.body.innerHTML = string;
  <span class="hljs-keyword">return</span> context.body.children;
}</code></pre><ul><li>parseJSON</li></ul><p>&#x4F20;&#x5165;&#x683C;&#x5F0F;&#x6B63;&#x786E;&#x7684; JSON &#x5B57;&#x7B26;&#x4E32;&#x5E76;&#x8FD4;&#x56DE; JavaScript &#x503C;.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$.parseJSON(str);

// Native
JSON.parse(str);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$.parseJSON(str);

<span class="hljs-comment">// Native</span>
<span class="hljs-built_in">JSON</span>.parse(str);</code></pre><p><strong><a href="#%E7%9B%AE%E5%BD%95"><span style="font-weight:400">&#x2B06;</span> &#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h2 id="articleHeader9">Promises</h2><p>Promise &#x4EE3;&#x8868;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x7684;&#x6700;&#x7EC8;&#x7ED3;&#x679C;&#x3002;jQuery &#x7528;&#x5B83;&#x81EA;&#x5DF1;&#x7684;&#x65B9;&#x5F0F;&#x5904;&#x7406; promises&#xFF0C;&#x539F;&#x751F; JavaScript &#x9075;&#x5FAA; <a href="http://promises-aplus.github.io/promises-spec/" rel="nofollow noreferrer" target="_blank">Promises/A+</a> &#x6807;&#x51C6;&#x5B9E;&#x73B0;&#x4E86;&#x6700;&#x5C0F; API &#x6765;&#x5904;&#x7406; promises&#x3002;</p><ul><li><p><a href="#7.1">7.1</a> <a></a> done, fail, always</p><p><code>done</code> &#x4F1A;&#x5728; promise &#x89E3;&#x51B3;&#x65F6;&#x8C03;&#x7528;&#xFF0C;<code>fail</code> &#x4F1A;&#x5728; promise &#x62D2;&#x7EDD;&#x65F6;&#x8C03;&#x7528;&#xFF0C;<code>always</code> &#x603B;&#x4F1A;&#x8C03;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$promise.done(doneCallback).fail(failCallback).always(alwaysCallback)

// Native
promise.then(doneCallback, failCallback).then(alwaysCallback, alwaysCallback)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$promise.done(doneCallback).fail(failCallback).always(alwaysCallback)

<span class="hljs-comment">// Native</span>
promise.then(doneCallback, failCallback).then(alwaysCallback, alwaysCallback)</code></pre></li><li><p><a href="#7.2">7.2</a> <a></a> when</p><p><code>when</code> &#x7528;&#x4E8E;&#x5904;&#x7406;&#x591A;&#x4E2A; promises&#x3002;&#x5F53;&#x5168;&#x90E8; promises &#x88AB;&#x89E3;&#x51B3;&#x65F6;&#x8FD4;&#x56DE;&#xFF0C;&#x5F53;&#x4EFB;&#x4E00; promise &#x88AB;&#x62D2;&#x7EDD;&#x65F6;&#x62D2;&#x7EDD;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$.when($promise1, $promise2).done((promise1Result, promise2Result) =&gt; {
});

// Native
Promise.all([$promise1, $promise2]).then([promise1Result, promise2Result] =&gt; {});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$.when($promise1, $promise2).done(<span class="hljs-function">(<span class="hljs-params">promise1Result, promise2Result</span>) =&gt;</span> {
});

<span class="hljs-comment">// Native</span>
<span class="hljs-built_in">Promise</span>.all([$promise1, $promise2]).then([promise1Result, promise2Result] =&gt; {});</code></pre></li><li><p><a href="#7.3">7.3</a> <a></a> Deferred</p><p>Deferred &#x662F;&#x521B;&#x5EFA; promises &#x7684;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
function asyncFunc() {
  const defer = new $.Deferred();
  setTimeout(() =&gt; {
    if(true) {
      defer.resolve(&apos;some_value_computed_asynchronously&apos;);
    } else {
      defer.reject(&apos;failed&apos;);
    }
  }, 1000);

  return defer.promise();
}

// Native
function asyncFunc() {
  return new Promise((resolve, reject) =&gt; {
    setTimeout(() =&gt; {
      if (true) {
        resolve(&apos;some_value_computed_asynchronously&apos;);
      } else {
        reject(&apos;failed&apos;);
      }
    }, 1000);
  });
}

// Deferred way
function defer() {
  const deferred = {};
  const promise = new Promise((resolve, reject) =&gt; {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  deferred.promise = () =&gt; {
    return promise;
  };

  return deferred;
}

function asyncFunc() {
  const defer = defer();
  setTimeout(() =&gt; {
    if(true) {
      defer.resolve(&apos;some_value_computed_asynchronously&apos;);
    } else {
      defer.reject(&apos;failed&apos;);
    }
  }, 1000);

  return defer.promise();
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncFunc</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> defer = <span class="hljs-keyword">new</span> $.Deferred();
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">if</span>(<span class="hljs-literal">true</span>) {
      defer.resolve(<span class="hljs-string">&apos;some_value_computed_asynchronously&apos;</span>);
    } <span class="hljs-keyword">else</span> {
      defer.reject(<span class="hljs-string">&apos;failed&apos;</span>);
    }
  }, <span class="hljs-number">1000</span>);

  <span class="hljs-keyword">return</span> defer.promise();
}

<span class="hljs-comment">// Native</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncFunc</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
        resolve(<span class="hljs-string">&apos;some_value_computed_asynchronously&apos;</span>);
      } <span class="hljs-keyword">else</span> {
        reject(<span class="hljs-string">&apos;failed&apos;</span>);
      }
    }, <span class="hljs-number">1000</span>);
  });
}

<span class="hljs-comment">// Deferred way</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defer</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> deferred = {};
  <span class="hljs-keyword">const</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  deferred.promise = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> promise;
  };

  <span class="hljs-keyword">return</span> deferred;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncFunc</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> defer = defer();
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">if</span>(<span class="hljs-literal">true</span>) {
      defer.resolve(<span class="hljs-string">&apos;some_value_computed_asynchronously&apos;</span>);
    } <span class="hljs-keyword">else</span> {
      defer.reject(<span class="hljs-string">&apos;failed&apos;</span>);
    }
  }, <span class="hljs-number">1000</span>);

  <span class="hljs-keyword">return</span> defer.promise();
}</code></pre></li></ul><p><strong><a href="#%E7%9B%AE%E5%BD%95"><span style="font-weight:400">&#x2B06;</span> &#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h2 id="articleHeader10">Animation</h2><ul><li><p><a href="#8.1">8.1</a> <a></a> Show &amp; Hide</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.show();
$el.hide();

// Native
// &#x66F4;&#x591A; show &#x65B9;&#x6CD5;&#x7684;&#x7EC6;&#x8282;&#x8BE6;&#x89C1; https://github.com/oneuijs/oui-dom-utils/blob/master/src/index.js#L363
el.style.display = &apos;&apos;|&apos;inline&apos;|&apos;inline-block&apos;|&apos;inline-table&apos;|&apos;block&apos;;
el.style.display = &apos;none&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.show();
$el.hide();

<span class="hljs-comment">// Native</span>
<span class="hljs-comment">// &#x66F4;&#x591A; show &#x65B9;&#x6CD5;&#x7684;&#x7EC6;&#x8282;&#x8BE6;&#x89C1; https://github.com/oneuijs/oui-dom-utils/blob/master/src/index.js#L363</span>
el.style.display = <span class="hljs-string">&apos;&apos;</span>|<span class="hljs-string">&apos;inline&apos;</span>|<span class="hljs-string">&apos;inline-block&apos;</span>|<span class="hljs-string">&apos;inline-table&apos;</span>|<span class="hljs-string">&apos;block&apos;</span>;
el.style.display = <span class="hljs-string">&apos;none&apos;</span>;</code></pre></li><li><p><a href="#8.2">8.2</a> <a></a> Toggle</p><p>&#x663E;&#x793A;&#x6216;&#x9690;&#x85CF;&#x5143;&#x7D20;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.toggle();

// Native
if (el.ownerDocument.defaultView.getComputedStyle(el, null).display === &apos;none&apos;) {
  el.style.display = &apos;&apos;|&apos;inline&apos;|&apos;inline-block&apos;|&apos;inline-table&apos;|&apos;block&apos;;
} else {
  el.style.display = &apos;none&apos;;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.toggle();

<span class="hljs-comment">// Native</span>
<span class="hljs-keyword">if</span> (el.ownerDocument.defaultView.getComputedStyle(el, <span class="hljs-literal">null</span>).display === <span class="hljs-string">&apos;none&apos;</span>) {
  el.style.display = <span class="hljs-string">&apos;&apos;</span>|<span class="hljs-string">&apos;inline&apos;</span>|<span class="hljs-string">&apos;inline-block&apos;</span>|<span class="hljs-string">&apos;inline-table&apos;</span>|<span class="hljs-string">&apos;block&apos;</span>;
} <span class="hljs-keyword">else</span> {
  el.style.display = <span class="hljs-string">&apos;none&apos;</span>;
}</code></pre></li><li><p><a href="#8.3">8.3</a> <a></a> FadeIn &amp; FadeOut</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.fadeIn(3000);
$el.fadeOut(3000);

// Native
el.style.transition = &apos;opacity 3s&apos;;
// fadeIn
el.style.opacity = &apos;1&apos;;
// fadeOut
el.style.opacity = &apos;0&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.fadeIn(<span class="hljs-number">3000</span>);
$el.fadeOut(<span class="hljs-number">3000</span>);

<span class="hljs-comment">// Native</span>
el.style.transition = <span class="hljs-string">&apos;opacity 3s&apos;</span>;
<span class="hljs-comment">// fadeIn</span>
el.style.opacity = <span class="hljs-string">&apos;1&apos;</span>;
<span class="hljs-comment">// fadeOut</span>
el.style.opacity = <span class="hljs-string">&apos;0&apos;</span>;</code></pre></li><li><p><a href="#8.4">8.4</a> <a></a> FadeTo</p><p>&#x8C03;&#x6574;&#x5143;&#x7D20;&#x900F;&#x660E;&#x5EA6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.fadeTo(&apos;slow&apos;,0.15);
// Native
el.style.transition = &apos;opacity 3s&apos;; // &#x5047;&#x8BBE; &apos;slow&apos; &#x7B49;&#x4E8E; 3 &#x79D2;
el.style.opacity = &apos;0.15&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.fadeTo(<span class="hljs-string">&apos;slow&apos;</span>,<span class="hljs-number">0.15</span>);
<span class="hljs-comment">// Native</span>
el.style.transition = <span class="hljs-string">&apos;opacity 3s&apos;</span>; <span class="hljs-comment">// &#x5047;&#x8BBE; &apos;slow&apos; &#x7B49;&#x4E8E; 3 &#x79D2;</span>
el.style.opacity = <span class="hljs-string">&apos;0.15&apos;</span>;</code></pre></li><li><p><a href="#8.5">8.5</a> <a></a> FadeToggle</p><p>&#x52A8;&#x753B;&#x8C03;&#x6574;&#x900F;&#x660E;&#x5EA6;&#x7528;&#x6765;&#x663E;&#x793A;&#x6216;&#x9690;&#x85CF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.fadeToggle();

// Native
el.style.transition = &apos;opacity 3s&apos;;
const { opacity } = el.ownerDocument.defaultView.getComputedStyle(el, null);
if (opacity === &apos;1&apos;) {
  el.style.opacity = &apos;0&apos;;
} else {
  el.style.opacity = &apos;1&apos;;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.fadeToggle();

<span class="hljs-comment">// Native</span>
el.style.transition = <span class="hljs-string">&apos;opacity 3s&apos;</span>;
<span class="hljs-keyword">const</span> { opacity } = el.ownerDocument.defaultView.getComputedStyle(el, <span class="hljs-literal">null</span>);
<span class="hljs-keyword">if</span> (opacity === <span class="hljs-string">&apos;1&apos;</span>) {
  el.style.opacity = <span class="hljs-string">&apos;0&apos;</span>;
} <span class="hljs-keyword">else</span> {
  el.style.opacity = <span class="hljs-string">&apos;1&apos;</span>;
}</code></pre></li><li><p><a href="#8.6">8.6</a> <a></a> SlideUp &amp; SlideDown</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.slideUp();
$el.slideDown();

// Native
const originHeight = &apos;100px&apos;;
el.style.transition = &apos;height 3s&apos;;
// slideUp
el.style.height = &apos;0px&apos;;
// slideDown
el.style.height = originHeight;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.slideUp();
$el.slideDown();

<span class="hljs-comment">// Native</span>
<span class="hljs-keyword">const</span> originHeight = <span class="hljs-string">&apos;100px&apos;</span>;
el.style.transition = <span class="hljs-string">&apos;height 3s&apos;</span>;
<span class="hljs-comment">// slideUp</span>
el.style.height = <span class="hljs-string">&apos;0px&apos;</span>;
<span class="hljs-comment">// slideDown</span>
el.style.height = originHeight;</code></pre></li><li><p><a href="#8.7">8.7</a> <a></a> SlideToggle</p><p>&#x6ED1;&#x52A8;&#x5207;&#x6362;&#x663E;&#x793A;&#x6216;&#x9690;&#x85CF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.slideToggle();

// Native
const originHeight = &apos;100px&apos;;
el.style.transition = &apos;height 3s&apos;;
const { height } = el.ownerDocument.defaultView.getComputedStyle(el, null);
if (parseInt(height, 10) === 0) {
  el.style.height = originHeight;
}
else {
 el.style.height = &apos;0px&apos;;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.slideToggle();

<span class="hljs-comment">// Native</span>
<span class="hljs-keyword">const</span> originHeight = <span class="hljs-string">&apos;100px&apos;</span>;
el.style.transition = <span class="hljs-string">&apos;height 3s&apos;</span>;
<span class="hljs-keyword">const</span> { height } = el.ownerDocument.defaultView.getComputedStyle(el, <span class="hljs-literal">null</span>);
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">parseInt</span>(height, <span class="hljs-number">10</span>) === <span class="hljs-number">0</span>) {
  el.style.height = originHeight;
}
<span class="hljs-keyword">else</span> {
 el.style.height = <span class="hljs-string">&apos;0px&apos;</span>;
}</code></pre></li><li><p><a href="#8.8">8.8</a> <a></a> Animate</p><p>&#x6267;&#x884C;&#x4E00;&#x7CFB;&#x5217; CSS &#x5C5E;&#x6027;&#x52A8;&#x753B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery
$el.animate({ params }, speed);

// Native
el.style.transition = &apos;all &apos; + speed;
Object.keys(params).forEach((key) =&gt;
  el.style[key] = params[key];
)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// jQuery</span>
$el.animate({ params }, speed);

<span class="hljs-comment">// Native</span>
el.style.transition = <span class="hljs-string">&apos;all &apos;</span> + speed;
<span class="hljs-built_in">Object</span>.keys(params).forEach(<span class="hljs-function">(<span class="hljs-params">key</span>) =&gt;</span>
  el.style[key] = params[key];
)</code></pre></li></ul><p><strong><a href="#%E7%9B%AE%E5%BD%95"><span style="font-weight:400">&#x2B06;</span> &#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h2 id="articleHeader11">Alternatives</h2><ul><li><a href="http://youmightnotneedjquery.com/" rel="nofollow noreferrer" target="_blank">&#x4F60;&#x53EF;&#x80FD;&#x4E0D;&#x9700;&#x8981; jQuery (You Might Not Need jQuery)</a> - &#x5982;&#x4F55;&#x4F7F;&#x7528;&#x539F;&#x751F; JavaScript &#x5B9E;&#x73B0;&#x901A;&#x7528;&#x4E8B;&#x4EF6;&#xFF0C;&#x5143;&#x7D20;&#xFF0C;ajax &#x7B49;&#x7528;&#x6CD5;&#x3002;</li><li><a href="http://github.com/npm-dom" rel="nofollow noreferrer" target="_blank">npm-dom</a> &#x4EE5;&#x53CA; <a href="http://github.com/webmodules" rel="nofollow noreferrer" target="_blank">webmodules</a> - &#x5728; NPM &#x4E0A;&#x63D0;&#x4F9B;&#x72EC;&#x7ACB; DOM &#x6A21;&#x5757;&#x7684;&#x7EC4;&#x7EC7;</li></ul><h2 id="articleHeader12">Browser Support</h2><table><thead><tr><th><span class="img-wrap"><img data-src="/img/remote/1460000015548820?w=48&amp;h=48" src="https://static.alili.tech/img/remote/1460000015548820?w=48&amp;h=48" alt="Chrome" title="Chrome" style="cursor:pointer"></span></th><th><span class="img-wrap"><img data-src="/img/remote/1460000015548821?w=48&amp;h=48" src="https://static.alili.tech/img/remote/1460000015548821?w=48&amp;h=48" alt="Firefox" title="Firefox" style="cursor:pointer"></span></th><th><span class="img-wrap"><img data-src="/img/remote/1460000015548825?w=48&amp;h=48" src="https://static.alili.tech/img/remote/1460000015548825?w=48&amp;h=48" alt="IE" title="IE" style="cursor:pointer"></span></th><th><span class="img-wrap"><img data-src="/img/remote/1460000015548823?w=48&amp;h=48" src="https://static.alili.tech/img/remote/1460000015548823?w=48&amp;h=48" alt="Opera" title="Opera" style="cursor:pointer"></span></th><th><span class="img-wrap"><img data-src="/img/remote/1460000015548822?w=48&amp;h=48" src="https://static.alili.tech/img/remote/1460000015548822?w=48&amp;h=48" alt="Safari" title="Safari" style="cursor:pointer"></span></th></tr></thead><tbody><tr><td>Latest &#x2714;</td><td>Latest &#x2714;</td><td>10+ &#x2714;</td><td>Latest &#x2714;</td><td>6.1+ &#x2714;</td><td></td></tr></tbody></table><h1 id="articleHeader13">License</h1><p>MIT</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
原生js替换jQuery各种方法-中文版

## 原文链接
[https://segmentfault.com/a/1190000016594035](https://segmentfault.com/a/1190000016594035)

