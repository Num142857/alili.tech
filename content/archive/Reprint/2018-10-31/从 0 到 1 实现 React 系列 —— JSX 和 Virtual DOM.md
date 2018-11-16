---
title: 从 0 到 1 实现 React 系列 —— JSX 和 Virtual DOM
hidden: true
categories: [reprint]
slug: e9e32d3a
date: 2018-10-31 02:30:10
---

{{< raw >}}
<p><a href="https://github.com/MuYunyun/blog" rel="nofollow noreferrer" target="_blank">&#x4F5C;&#x8005;&#x7684;&#x535A;&#x5BA2;</a></p><p>&#x770B;&#x6E90;&#x7801;&#x4E00;&#x4E2A;&#x75DB;&#x5904;&#x662F;&#x4F1A;&#x9677;&#x8FDB;&#x7406;&#x4E0D;&#x987A;&#x4E3B;&#x5E72;&#x7684;&#x56F0;&#x5C40;&#x4E2D;&#xFF0C;&#x672C;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x5728;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A; (x)react &#x7684;&#x540C;&#x65F6;&#x7406;&#x987A; React &#x6846;&#x67B6;&#x7684;&#x4E3B;&#x5E72;&#x5185;&#x5BB9;(JSX/&#x865A;&#x62DF;DOM/...)</p><h3 id="articleHeader0">&#x73AF;&#x5883;&#x51C6;&#x5907;</h3><p>&#x9879;&#x76EE;&#x6253;&#x5305;&#x5DE5;&#x5177;&#x9009;&#x62E9;&#x4E86; parcel&#xFF0C;&#x4F7F;&#x7528;&#x5176;&#x53EF;&#x4EE5;&#x5FEB;&#x901F;&#x5730;&#x8FDB;&#x5165;&#x9879;&#x76EE;&#x5F00;&#x53D1;&#x7684;&#x72B6;&#x6001;&#x3002;<a href="https://parceljs.org/getting_started.html" rel="nofollow noreferrer" target="_blank">&#x5FEB;&#x901F;&#x5F00;&#x59CB;</a></p><p>&#x6B64;&#x5916;&#x9700;&#x8981;&#x5B89;&#x88C5;&#x4EE5;&#x4E0B; babel &#x63D2;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;babel-core&quot;: &quot;^6.26.0&quot;,
&quot;babel-preset-env&quot;: &quot;^1.6.1&quot;,
&quot;babel-plugin-transform-react-jsx&quot;: &quot;^6.24.1&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-string">&quot;babel-core&quot;</span>: <span class="hljs-string">&quot;^6.26.0&quot;</span>,
<span class="hljs-string">&quot;babel-preset-env&quot;</span>: <span class="hljs-string">&quot;^1.6.1&quot;</span>,
<span class="hljs-string">&quot;babel-plugin-transform-react-jsx&quot;</span>: <span class="hljs-string">&quot;^6.24.1&quot;</span></code></pre><p>&#x540C;&#x65F6; <code>.babelrc</code> &#x914D;&#x7F6E;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;presets&quot;: [&quot;env&quot;],
    &quot;plugins&quot;: [
        // &#x63D2;&#x4EF6;&#x5982;&#x5176;&#x540D;&#xFF1A;&#x8F6C;&#x5316; JSX &#x8BED;&#x6CD5;&#x4E3A;&#x5B9A;&#x4E49;&#x7684;&#x5F62;&#x5F0F;
        [&quot;transform-react-jsx&quot;, {
            &quot;pragma&quot;: &quot;React.createElement&quot;
        }]
    ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-string">&quot;presets&quot;</span>: [<span class="hljs-string">&quot;env&quot;</span>],
    <span class="hljs-string">&quot;plugins&quot;</span>: [
        <span class="hljs-comment">// &#x63D2;&#x4EF6;&#x5982;&#x5176;&#x540D;&#xFF1A;&#x8F6C;&#x5316; JSX &#x8BED;&#x6CD5;&#x4E3A;&#x5B9A;&#x4E49;&#x7684;&#x5F62;&#x5F0F;</span>
        [<span class="hljs-string">&quot;transform-react-jsx&quot;</span>, {
            <span class="hljs-string">&quot;pragma&quot;</span>: <span class="hljs-string">&quot;React.createElement&quot;</span>
        }]
    ]
}</code></pre><h3 id="articleHeader1">JSX &#x548C; &#x865A;&#x62DF; DOM</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = (
  &lt;div className=&quot;title&quot;&gt;
    hello&lt;span className=&quot;content&quot;&gt;world!&lt;/span&gt;
  &lt;/div&gt;
)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> element = (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;title&quot;</span>&gt;</span>
    hello<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;content&quot;</span>&gt;</span>world!<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)</code></pre><p>JSX &#x662F;&#x4E00;&#x79CD;&#x8BED;&#x6CD5;&#x7CD6;&#xFF0C;&#x7ECF;&#x8FC7; <a href="https://babeljs.io/en/repl" rel="nofollow noreferrer" target="_blank">babel</a> &#x8F6C;&#x6362;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF0C;&#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#x5B9E;&#x9645;&#x4E0A;&#x8F6C;&#x5316;&#x6210; <code>React.createElement()</code> &#x7684;&#x5F62;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var element = React.createElement(
  &quot;div&quot;,
  { className: &quot;title&quot; },
  &quot;hello&quot;,
  React.createElement(
    &quot;span&quot;,
    { className: &quot;content&quot; },
    &quot;world!&quot;
  )
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> element = React.createElement(
  <span class="hljs-string">&quot;div&quot;</span>,
  { <span class="hljs-attr">className</span>: <span class="hljs-string">&quot;title&quot;</span> },
  <span class="hljs-string">&quot;hello&quot;</span>,
  React.createElement(
    <span class="hljs-string">&quot;span&quot;</span>,
    { <span class="hljs-attr">className</span>: <span class="hljs-string">&quot;content&quot;</span> },
    <span class="hljs-string">&quot;world!&quot;</span>
  )
);</code></pre><p><a href="https://preactjs.com/repl" rel="nofollow noreferrer" target="_blank">&#x6253;&#x5370;</a> element, &#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  attributes: {className: &quot;title&quot;}
  children: [&quot;hello&quot;, t] // t &#x548C;&#x5916;&#x5C42;&#x5BF9;&#x8C61;&#x76F8;&#x540C;
  key: undefined
  nodeName: &quot;div&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">attributes</span>: {<span class="hljs-attr">className</span>: <span class="hljs-string">&quot;title&quot;</span>}
  children: [<span class="hljs-string">&quot;hello&quot;</span>, t] <span class="hljs-comment">// t &#x548C;&#x5916;&#x5C42;&#x5BF9;&#x8C61;&#x76F8;&#x540C;</span>
  key: <span class="hljs-literal">undefined</span>
  nodeName: <span class="hljs-string">&quot;div&quot;</span>
}</code></pre><p>&#x56E0;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x5F97;&#x51FA;&#x7ED3;&#x8BBA;&#xFF1A;JSX &#x8BED;&#x6CD5;&#x7CD6;&#x7ECF;&#x8FC7; Babel &#x7F16;&#x8BD1;&#x540E;&#x8F6C;&#x6362;&#x6210;&#x4E00;&#x79CD;&#x5BF9;&#x8C61;&#xFF0C;&#x8BE5;&#x5BF9;&#x8C61;&#x5373;&#x6240;&#x8C13;&#x7684;<code>&#x865A;&#x62DF; DOM</code>&#xFF0C;&#x4F7F;&#x7528;&#x865A;&#x62DF; DOM &#x80FD;&#x8BA9;&#x9875;&#x9762;&#x8FDB;&#x884C;&#x66F4;&#x4E3A;&#x9AD8;&#x6548;&#x7684;&#x6E32;&#x67D3;&#x3002;</p><p>&#x6211;&#x4EEC;&#x6309;&#x7167;&#x8FD9;&#x79CD;&#x601D;&#x8DEF;&#x8FDB;&#x884C;&#x51FD;&#x6570;&#x7684;&#x6784;&#x9020;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const React = {
  createElement
}

function createElement(tag, attr, ...child) {
  return {
    attributes: attr,
    children: child,
    key: undefined,
    nodeName: tag,
  }
}

// &#x6D4B;&#x8BD5;
const element = (
  &lt;div className=&quot;title&quot;&gt;
    hello&lt;span className=&quot;content&quot;&gt;world!&lt;/span&gt;
  &lt;/div&gt;
)

console.log(element) // &#x6253;&#x5370;&#x7ED3;&#x679C;&#x7B26;&#x5408;&#x9884;&#x671F;
// {
//   attributes: {className: &quot;title&quot;}
//   children: [&quot;hello&quot;, t] // t &#x548C;&#x5916;&#x5C42;&#x5BF9;&#x8C61;&#x76F8;&#x540C;
//   key: undefined
//   nodeName: &quot;div&quot;
// }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> React = {
  createElement
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createElement</span>(<span class="hljs-params">tag, attr, ...child</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">attributes</span>: attr,
    <span class="hljs-attr">children</span>: child,
    <span class="hljs-attr">key</span>: <span class="hljs-literal">undefined</span>,
    <span class="hljs-attr">nodeName</span>: tag,
  }
}

<span class="hljs-comment">// &#x6D4B;&#x8BD5;</span>
<span class="hljs-keyword">const</span> element = (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;title&quot;</span>&gt;</span>
    hello<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;content&quot;</span>&gt;</span>world!<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)

<span class="hljs-built_in">console</span>.log(element) <span class="hljs-comment">// &#x6253;&#x5370;&#x7ED3;&#x679C;&#x7B26;&#x5408;&#x9884;&#x671F;</span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   attributes: {className: &quot;title&quot;}</span>
<span class="hljs-comment">//   children: [&quot;hello&quot;, t] // t &#x548C;&#x5916;&#x5C42;&#x5BF9;&#x8C61;&#x76F8;&#x540C;</span>
<span class="hljs-comment">//   key: undefined</span>
<span class="hljs-comment">//   nodeName: &quot;div&quot;</span>
<span class="hljs-comment">// }</span></code></pre><h3 id="articleHeader2">&#x865A;&#x62DF; DOM &#x8F6C;&#x5316;&#x4E3A;&#x771F;&#x5B9E; DOM</h3><p>&#x4E0A;&#x4E2A;&#x5C0F;&#x8282;&#x4ECB;&#x7ECD;&#x4E86; JSX &#x8F6C;&#x5316;&#x4E3A;&#x865A;&#x62DF; DOM &#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x8FD9;&#x4E2A;&#x5C0F;&#x8282;&#x63A5;&#x7740;&#x6765;&#x5B9E;&#x73B0;&#x5C06;&#x865A;&#x62DF; DOM &#x8F6C;&#x5316;&#x4E3A;&#x771F;&#x5B9E; DOM (&#x9875;&#x9762;&#x4E0A;&#x6E32;&#x67D3;&#x7684;&#x662F;&#x771F;&#x5B9E; DOM)&#x3002;</p><p>&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x5728; React &#x4E2D;&#xFF0C;&#x5C06;&#x865A;&#x62DF; DOM &#x8F6C;&#x5316;&#x4E3A;&#x771F;&#x5B9E; DOM &#x662F;&#x4F7F;&#x7528; <code>ReactDOM.render</code> &#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x4F7F;&#x7528;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.render(
  element, // &#x4E0A;&#x6587;&#x7684; element&#xFF0C;&#x5373;&#x865A;&#x62DF; dom
  document.getElementById(&apos;root&apos;)
)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">ReactDOM.render(
  element, <span class="hljs-comment">// &#x4E0A;&#x6587;&#x7684; element&#xFF0C;&#x5373;&#x865A;&#x62DF; dom</span>
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;root&apos;</span>)
)</code></pre><p>&#x63A5;&#x7740;&#x6765;&#x5B9E;&#x73B0; <code>ReactDOM.render</code> &#x7684;&#x903B;&#x8F91;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ReactDOM = {
  render
}

/**
 * &#x5C06;&#x865A;&#x62DF; DOM &#x8F6C;&#x5316;&#x4E3A;&#x771F;&#x5B9E; DOM
 * @param {*} vdom      &#x865A;&#x62DF; DOM
 * @param {*} container &#x9700;&#x8981;&#x63D2;&#x5165;&#x7684;&#x4F4D;&#x7F6E;
 */
function render(vdom, container) {
  if (typeof(vdom) === &apos;string&apos;) {
    container.innerText = vdom
    return
  }
  const dom = document.createElement(vdom.nodeName)
  for (let attr in vdom.attributes) {
    setAttribute(dom, attr, vdom.attributes[attr])
  }
  vdom.children.forEach(vdomChild =&gt; render(vdomChild, dom))
  container.appendChild(dom)
}

/**
 * &#x7ED9;&#x8282;&#x70B9;&#x8BBE;&#x7F6E;&#x5C5E;&#x6027;
 * @param {*} dom   &#x64CD;&#x4F5C;&#x5143;&#x7D20;
 * @param {*} attr  &#x64CD;&#x4F5C;&#x5143;&#x7D20;&#x5C5E;&#x6027;
 * @param {*} value &#x64CD;&#x4F5C;&#x5143;&#x7D20;&#x503C;
 */
function setAttribute(dom, attr, value) {
  if (attr === &apos;className&apos;) {
    attr = &apos;class&apos;
  }
  if (attr.match(&apos;/on\w+/&apos;)) {   // &#x5904;&#x7406;&#x4E8B;&#x4EF6;&#x7684;&#x5C5E;&#x6027;:
    const eventName = attr.toLowerCase().splice(1)
    dom.addEventListener(eventName, value)
  } else if (attr === &apos;style&apos;) { // &#x5904;&#x7406;&#x6837;&#x5F0F;&#x7684;&#x5C5E;&#x6027;:
    let styleStr = &apos;&apos;
    let standardCss
    for (let klass in value) {
      standardCss = humpToStandard(klass) // &#x5904;&#x7406;&#x9A7C;&#x5CF0;&#x6837;&#x5F0F;&#x4E3A;&#x6807;&#x51C6;&#x6837;&#x5F0F;
      styleStr += `${standardCss}: ${value[klass]};`
    }
    dom.setAttribute(attr, styleStr)
  } else {                       // &#x5176;&#x5B83;&#x5C5E;&#x6027;
    dom.setAttribute(attr, value)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> ReactDOM = {
  render
}

<span class="hljs-comment">/**
 * &#x5C06;&#x865A;&#x62DF; DOM &#x8F6C;&#x5316;&#x4E3A;&#x771F;&#x5B9E; DOM
 * @param {*} vdom      &#x865A;&#x62DF; DOM
 * @param {*} container &#x9700;&#x8981;&#x63D2;&#x5165;&#x7684;&#x4F4D;&#x7F6E;
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params">vdom, container</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span>(vdom) === <span class="hljs-string">&apos;string&apos;</span>) {
    container.innerText = vdom
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-keyword">const</span> dom = <span class="hljs-built_in">document</span>.createElement(vdom.nodeName)
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> attr <span class="hljs-keyword">in</span> vdom.attributes) {
    setAttribute(dom, attr, vdom.attributes[attr])
  }
  vdom.children.forEach(<span class="hljs-function"><span class="hljs-params">vdomChild</span> =&gt;</span> render(vdomChild, dom))
  container.appendChild(dom)
}

<span class="hljs-comment">/**
 * &#x7ED9;&#x8282;&#x70B9;&#x8BBE;&#x7F6E;&#x5C5E;&#x6027;
 * @param {*} dom   &#x64CD;&#x4F5C;&#x5143;&#x7D20;
 * @param {*} attr  &#x64CD;&#x4F5C;&#x5143;&#x7D20;&#x5C5E;&#x6027;
 * @param {*} value &#x64CD;&#x4F5C;&#x5143;&#x7D20;&#x503C;
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setAttribute</span>(<span class="hljs-params">dom, attr, value</span>) </span>{
  <span class="hljs-keyword">if</span> (attr === <span class="hljs-string">&apos;className&apos;</span>) {
    attr = <span class="hljs-string">&apos;class&apos;</span>
  }
  <span class="hljs-keyword">if</span> (attr.match(<span class="hljs-string">&apos;/on\w+/&apos;</span>)) {   <span class="hljs-comment">// &#x5904;&#x7406;&#x4E8B;&#x4EF6;&#x7684;&#x5C5E;&#x6027;:</span>
    <span class="hljs-keyword">const</span> eventName = attr.toLowerCase().splice(<span class="hljs-number">1</span>)
    dom.addEventListener(eventName, value)
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (attr === <span class="hljs-string">&apos;style&apos;</span>) { <span class="hljs-comment">// &#x5904;&#x7406;&#x6837;&#x5F0F;&#x7684;&#x5C5E;&#x6027;:</span>
    <span class="hljs-keyword">let</span> styleStr = <span class="hljs-string">&apos;&apos;</span>
    <span class="hljs-keyword">let</span> standardCss
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> klass <span class="hljs-keyword">in</span> value) {
      standardCss = humpToStandard(klass) <span class="hljs-comment">// &#x5904;&#x7406;&#x9A7C;&#x5CF0;&#x6837;&#x5F0F;&#x4E3A;&#x6807;&#x51C6;&#x6837;&#x5F0F;</span>
      styleStr += <span class="hljs-string">`<span class="hljs-subst">${standardCss}</span>: <span class="hljs-subst">${value[klass]}</span>;`</span>
    }
    dom.setAttribute(attr, styleStr)
  } <span class="hljs-keyword">else</span> {                       <span class="hljs-comment">// &#x5176;&#x5B83;&#x5C5E;&#x6027;</span>
    dom.setAttribute(attr, value)
  }
}</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x6210;&#x529F;&#x5C06;&#x865A;&#x62DF; DOM &#x590D;&#x539F;&#x4E3A;&#x771F;&#x5B9E; DOM&#xFF0C;&#x5C55;&#x793A;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015552391?w=400&amp;h=498" src="https://static.alili.tech/img/remote/1460000015552391?w=400&amp;h=498" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x53E6;&#x5916;&#x914D;&#x5408;&#x70ED;&#x66F4;&#x65B0;&#xFF0C;&#x5728;&#x70ED;&#x66F4;&#x65B0;&#x7684;&#x65F6;&#x5019;&#x6E05;&#x7A7A;&#x4E4B;&#x524D;&#x7684; dom &#x5143;&#x7D20;&#xFF0C;&#x6539;&#x52A8;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ReactDOM = {
  render(vdom, container) {
    container.innerHTML = null
    render(vdom, container)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> ReactDOM = {
  render(vdom, container) {
    container.innerHTML = <span class="hljs-literal">null</span>
    render(vdom, container)
  }
}</code></pre><h3 id="articleHeader3">&#x603B;&#x7ED3;</h3><p><code>JSX</code> &#x7ECF;&#x8FC7; babel &#x7F16;&#x8BD1;&#x4E3A; React.createElement() &#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x5176;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x5C31;&#x662F; <code>Virtual DOM</code>&#xFF0C;&#x6700;&#x540E;&#x901A;&#x8FC7; ReactDOM.render() &#x5C06; Virtual DOM &#x8F6C;&#x5316;&#x4E3A;&#x771F;&#x5B9E;&#x7684; DOM &#x5C55;&#x73B0;&#x5728;&#x754C;&#x9762;&#x4E0A;&#x3002;&#x6D41;&#x7A0B;&#x56FE;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015552392?w=936&amp;h=282" src="https://static.alili.tech/img/remote/1460000015552392?w=936&amp;h=282" alt="" title="" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader4">&#x601D;&#x8003;&#x9898;</h3><p>&#x5982;&#x4E0B;&#x662F;&#x4E00;&#x4E2A; react/preact &#x7684;&#x5E38;&#x7528;&#x7EC4;&#x4EF6;&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x90A3;&#x4E48;&#x4E3A;&#x4EC0;&#x4E48;&#x8981; import &#x4E00;&#x4E2A; React &#x6216;&#x8005; h &#x5462;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos; // react
// import { h, Component } from &apos;preact&apos; // preact

class A extends Component {
  render() {
    return &lt;div&gt;I&apos;m componentA&lt;/div&gt;
  }
}

render(&lt;A /&gt;, document.body) // &#x7EC4;&#x4EF6;&#x7684;&#x6302;&#x8F7D;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code class="jsx"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">&apos;reac</span>t&apos; <span class="hljs-comment">// react</span>
<span class="hljs-comment">// import { h, Component } from &apos;preact&apos; // preact</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;div&gt;<span class="hljs-type">I</span><span class="hljs-symbol">&apos;m</span> componentA&lt;/div&gt;
  }
}

render(&lt;<span class="hljs-type">A</span> /&gt;, document.body) <span class="hljs-comment">// &#x7EC4;&#x4EF6;&#x7684;&#x6302;&#x8F7D;</span></code></pre><h3 id="articleHeader5">&#x9879;&#x76EE;&#x8BF4;&#x660E;</h3><p>&#x8BE5;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x4F1A;&#x5C3D;&#x53EF;&#x80FD;&#x7684;&#x5206;&#x6790;&#x9879;&#x76EE;&#x7EC6;&#x8282;&#xFF0C;&#x5177;&#x4F53;&#x7684;&#x8FD8;&#x662F;&#x4EE5;&#x9879;&#x76EE;&#x5B9E;&#x9645;&#x4EE3;&#x7801;&#x4E3A;&#x51C6;&#x3002;</p><p><a href="https://github.com/MuYunyun/cpreact" rel="nofollow noreferrer" target="_blank">&#x9879;&#x76EE;&#x5730;&#x5740;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从 0 到 1 实现 React 系列 —— JSX 和 Virtual DOM

## 原文链接
[https://segmentfault.com/a/1190000015552387](https://segmentfault.com/a/1190000015552387)

