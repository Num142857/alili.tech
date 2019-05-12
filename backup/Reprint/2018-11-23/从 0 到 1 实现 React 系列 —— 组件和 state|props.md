---
title: '从 0 到 1 实现 React 系列 —— 组件和 state|props' 
date: 2018-11-23 2:30:11
hidden: true
slug: 0j9gbrz7btfb
categories: [reprint]
---

{{< raw >}}
<p>&#x9605;&#x8BFB;&#x6E90;&#x7801;&#x4E00;&#x4E2A;&#x75DB;&#x5904;&#x662F;&#x4F1A;&#x9677;&#x8FDB;&#x7406;&#x4E0D;&#x987A;&#x4E3B;&#x5E72;&#x7684;&#x56F0;&#x5C40;&#x4E2D;&#xFF0C;&#x672C;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x5728;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A; (x)react &#x7684;&#x540C;&#x65F6;&#x7406;&#x987A; React &#x6846;&#x67B6;&#x7684;&#x4E3B;&#x5E72;&#x5185;&#x5BB9;(JSX/&#x865A;&#x62DF;DOM/&#x7EC4;&#x4EF6;/...)</p><h3 id="articleHeader0">&#x7EC4;&#x4EF6;&#x5373;&#x51FD;&#x6570;</h3><p>&#x5728;&#x4E0A;&#x4E00;&#x7BC7; <a href="https://github.com/MuYunyun/blog/issues/24" rel="nofollow noreferrer" target="_blank">JSX &#x548C; Virtual DOM</a> &#x4E2D;&#xFF0C;&#x89E3;&#x91CA;&#x4E86; JSX &#x6E32;&#x67D3;&#x5230;&#x754C;&#x9762;&#x7684;&#x8FC7;&#x7A0B;&#x5E76;&#x5B9E;&#x73B0;&#x4E86;&#x76F8;&#x5E94;&#x4EE3;&#x7801;&#xFF0C;&#x4EE3;&#x7801;&#x8C03;&#x7528;&#x5982;&#x4E0B;&#x6240;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;
import ReactDOM from &apos;react-dom&apos;

const element = (
  &lt;div className=&quot;title&quot;&gt;
    hello&lt;span className=&quot;content&quot;&gt;world!&lt;/span&gt;
  &lt;/div&gt;
)

ReactDOM.render(
  element,
  document.getElementById(&apos;root&apos;)
)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-dom&apos;</span>

<span class="hljs-keyword">const</span> element = (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;title&quot;</span>&gt;</span>
    hello<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;content&quot;</span>&gt;</span>world!<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)

ReactDOM.render(
  element,
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;root&apos;</span>)
)</code></pre><p>&#x672C;&#x5C0F;&#x8282;&#xFF0C;&#x6211;&#x4EEC;&#x63A5;&#x7740;&#x63A2;&#x7A76;&#x7EC4;&#x4EF6;&#x6E32;&#x67D3;&#x5230;&#x754C;&#x9762;&#x7684;&#x8FC7;&#x7A0B;&#x3002;&#x5728;&#x6B64;&#x6211;&#x4EEC;&#x5F15;&#x5165;&#x7EC4;&#x4EF6;&#x7684;&#x6982;&#x5FF5;&#xFF0C;<code>&#x7EC4;&#x4EF6;&#x672C;&#x8D28;&#x4E0A;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;</code>&#xFF0C;&#x5982;&#x4E0B;&#x5C31;&#x662F;&#x4E00;&#x6BB5;&#x6807;&#x51C6;&#x7EC4;&#x4EF6;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;

// &#x5199;&#x6CD5; 1&#xFF1A;
class A {
  render() {
    return &lt;div&gt;I&apos;m componentA&lt;/div&gt;
  }
}

// &#x5199;&#x6CD5; 2&#xFF1A;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;
const A = () =&gt; &lt;div&gt;I&apos;m componentA&lt;/div&gt;

ReactDOM.render(&lt;A /&gt;, document.body)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code class="jsx"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">&apos;reac</span>t&apos;

<span class="hljs-comment">// &#x5199;&#x6CD5; 1&#xFF1A;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;div&gt;<span class="hljs-type">I</span><span class="hljs-symbol">&apos;m</span> componentA&lt;/div&gt;
  }
}

<span class="hljs-comment">// &#x5199;&#x6CD5; 2&#xFF1A;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;</span>
const <span class="hljs-type">A</span> = () =&gt; &lt;div&gt;<span class="hljs-type">I</span><span class="hljs-symbol">&apos;m</span> componentA&lt;/div&gt;

<span class="hljs-type">ReactDOM</span>.render(&lt;<span class="hljs-type">A</span> /&gt;, document.body)</code></pre><p><code>&lt;A name=&quot;componentA&quot; /&gt;</code> &#x662F; JSX &#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x548C;<a href="https://github.com/MuYunyun/blog/issues/24" rel="nofollow noreferrer" target="_blank">&#x4E0A;&#x4E00;&#x7BC7;</a>&#x540C;&#x7406;&#xFF0C;babel &#x5C06;&#x5176;&#x8F6C;&#x5316;&#x4E3A; React.createElement() &#x7684;&#x5F62;&#x5F0F;&#xFF0C;<a href="https://babeljs.io/en/repl#?babili=false&amp;browsers=&amp;build=&amp;builtIns=false&amp;spec=false&amp;loose=false&amp;code_lz=MYGwhgzhAECC0FMAeAXBA7AJjAwgewFsAHPdDFaAbwCgBIAJw0wXoAoBKKuhhFAV3rpoAHkwBLAG4A-AJIByAlRQALMRAB0ReniIb0YAggC-wgPTjpAbjpHqt6sPj7DAXgBEwQiTLoUsN9CmUtRAA&amp;debug=false&amp;forceAllTransforms=false&amp;shippedProposals=false&amp;circleciRepo=&amp;evaluate=false&amp;fileSize=false&amp;sourceType=module&amp;lineWrap=true&amp;presets=react&amp;prettier=false&amp;targets=&amp;version=6.26.0&amp;envVersion=" rel="nofollow noreferrer" target="_blank">&#x8F6C;&#x5316;&#x7ED3;&#x679C;</a>&#x5982;&#x4E0B;&#x6240;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.createElement(A, null)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">React.createElement(A, <span class="hljs-literal">null</span>)</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5F53; JSX &#x4E2D;&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#xFF0C;createElement &#x540E;&#x63A5;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x53D8;&#x4E3A;&#x4E86;&#x51FD;&#x6570;&#xFF0C;&#x5728; <a href="https://preactjs.com/repl" rel="nofollow noreferrer" target="_blank">repl</a> &#x6253;&#x5370; <code>&lt;A name=&quot;componentA&quot; /&gt;</code>&#xFF0C;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  attributes: undefined,
  children: [],
  key: undefined,
  nodeName: &#x192; A()
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>{
  <span class="hljs-attribute">attributes</span>: undefined,
  children: [],
  key: undefined,
  nodeName: &#x192; <span class="hljs-built_in">A</span>()
}</code></pre><p>&#x6CE8;&#x610F;&#x8FD9;&#x65F6;&#x8FD4;&#x56DE;&#x7684; Virtual DOM &#x4E2D;&#x7684; nodeName &#x4E5F;&#x53D8;&#x4E3A;&#x4E86;&#x51FD;&#x6570;&#x3002;&#x6839;&#x636E;&#x8FD9;&#x4E9B;&#x7EBF;&#x7D22;&#xFF0C;&#x6211;&#x4EEC;&#x5BF9;&#x4E4B;&#x524D;&#x7684; <code>render</code> &#x51FD;&#x6570;&#x8FDB;&#x884C;&#x6539;&#x9020;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render(vdom, container) {
  if (_.isFunction(vdom.nodeName)) { // &#x5982;&#x679C; JSX &#x4E2D;&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;
    let component, returnVdom
    if (vdom.nodeName.prototype.render) {
      component = new vdom.nodeName()
      returnVdom = component.render()
    } else {
      returnVdom = vdom.nodeName() // &#x9488;&#x5BF9;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#xFF1A;const A = () =&gt; &lt;div&gt;I&apos;m componentsA&lt;/div&gt;
    }
    render(returnVdom, container)
    return
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params">vdom, container</span>) </span>{
  <span class="hljs-keyword">if</span> (_.isFunction(vdom.nodeName)) { <span class="hljs-comment">// &#x5982;&#x679C; JSX &#x4E2D;&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;</span>
    <span class="hljs-keyword">let</span> component, returnVdom
    <span class="hljs-keyword">if</span> (vdom.nodeName.prototype.render) {
      component = <span class="hljs-keyword">new</span> vdom.nodeName()
      returnVdom = component.render()
    } <span class="hljs-keyword">else</span> {
      returnVdom = vdom.nodeName() <span class="hljs-comment">// &#x9488;&#x5BF9;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#xFF1A;const A = () =&gt; &lt;div&gt;I&apos;m componentsA&lt;/div&gt;</span>
    }
    render(returnVdom, container)
    <span class="hljs-keyword">return</span>
  }
}</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x5B8C;&#x6210;&#x4E86;&#x5BF9;&#x7EC4;&#x4EF6;&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;&#x3002;</p><h3 id="articleHeader1">props &#x548C; state &#x7684;&#x5B9E;&#x73B0;</h3><p>&#x5728;&#x4E0A;&#x4E2A;&#x5C0F;&#x8282;&#x7EC4;&#x4EF6; A &#x4E2D;&#xFF0C;&#x662F;&#x6CA1;&#x6709;&#x5F15;&#x5165;&#x4EFB;&#x4F55;&#x5C5E;&#x6027;&#x548C;&#x72B6;&#x6001;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x7EC4;&#x4EF6;&#x95F4;&#x80FD;&#x8FDB;&#x884C;&#x5C5E;&#x6027;&#x7684;&#x4F20;&#x9012;(props)&#x4EE5;&#x53CA;&#x7EC4;&#x4EF6;&#x5185;&#x80FD;&#x8FDB;&#x884C;&#x72B6;&#x6001;&#x7684;&#x8BB0;&#x5F55;(state)&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;

class A extends Component {
  render() {
    return &lt;div&gt;I&apos;m {this.props.name}&lt;/div&gt;
  }
}

ReactDOM.render(&lt;A name=&quot;componentA&quot; /&gt;, document.body)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code class="jsx"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">&apos;reac</span>t&apos;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;div&gt;<span class="hljs-type">I</span><span class="hljs-symbol">&apos;m</span> {<span class="hljs-keyword">this</span>.props.name}&lt;/div&gt;
  }
}

<span class="hljs-type">ReactDOM</span>.render(&lt;<span class="hljs-type">A</span> name=<span class="hljs-string">&quot;componentA&quot;</span> /&gt;, document.body)</code></pre><p>&#x5728;&#x4E0A;&#x9762;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x770B;&#x5230; A &#x51FD;&#x6570;&#x7EE7;&#x627F;&#x81EA; Component&#x3002;&#x6211;&#x4EEC;&#x6765;&#x6784;&#x9020;&#x8FD9;&#x4E2A;&#x7236;&#x7C7B; Component&#xFF0C;&#x5E76;&#x5728;&#x5176;&#x6DFB;&#x52A0; state&#x3001;props&#x3001;setState &#x7B49;&#x5C5E;&#x6027;&#x65B9;&#x6CD5;&#xFF0C;&#x4ECE;&#x800C;&#x8BA9;&#x5B50;&#x7C7B;&#x7EE7;&#x627F;&#x5230;&#x5B83;&#x4EEC;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Component(props) {
  this.props = props
  this.state = this.state || {}
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Component</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">this</span>.props = props
  <span class="hljs-keyword">this</span>.state = <span class="hljs-keyword">this</span>.state || {}
}</code></pre><p>&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x7EC4;&#x4EF6;&#x5916;&#x7684; props &#x4F20;&#x8FDB;&#x7EC4;&#x4EF6;&#x5185;&#xFF0C;&#x4FEE;&#x6539; render &#x51FD;&#x6570;&#x4E2D;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render(vdom, container) {
  if (_.isFunction(vdom.nodeName)) {
    let component, returnVdom
    if (vdom.nodeName.prototype.render) {
      component = new vdom.nodeName(vdom.attributes) // &#x5C06;&#x7EC4;&#x4EF6;&#x5916;&#x7684; props &#x4F20;&#x8FDB;&#x7EC4;&#x4EF6;&#x5185;
      returnVdom = component.render()
    } else {
      returnVdom = vdom.nodeName(vdom.attributes)     // &#x5904;&#x7406;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#xFF1A;const A = (props) =&gt; &lt;div&gt;I&apos;m {props.name}&lt;/div&gt;
    }
    ...
  }
  ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params">vdom, container</span>) </span>{
  <span class="hljs-keyword">if</span> (_.isFunction(vdom.nodeName)) {
    <span class="hljs-keyword">let</span> component, returnVdom
    <span class="hljs-keyword">if</span> (vdom.nodeName.prototype.render) {
      component = <span class="hljs-keyword">new</span> vdom.nodeName(vdom.attributes) <span class="hljs-comment">// &#x5C06;&#x7EC4;&#x4EF6;&#x5916;&#x7684; props &#x4F20;&#x8FDB;&#x7EC4;&#x4EF6;&#x5185;</span>
      returnVdom = component.render()
    } <span class="hljs-keyword">else</span> {
      returnVdom = vdom.nodeName(vdom.attributes)     <span class="hljs-comment">// &#x5904;&#x7406;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#xFF1A;const A = (props) =&gt; &lt;div&gt;I&apos;m {props.name}&lt;/div&gt;</span>
    }
    ...
  }
  ...
}</code></pre><p>&#x5B9E;&#x73B0;&#x5B8C;&#x7EC4;&#x4EF6;&#x95F4; props &#x7684;&#x4F20;&#x9012;&#x540E;&#xFF0C;&#x518D;&#x6765;&#x804A;&#x804A; state&#xFF0C;&#x5728; react &#x4E2D;&#x662F;&#x901A;&#x8FC7; setState &#x6765;&#x5B8C;&#x6210;&#x7EC4;&#x4EF6;&#x72B6;&#x6001;&#x7684;&#x6539;&#x53D8;&#x7684;&#xFF0C;&#x540E;&#x7EED;&#x7AE0;&#x8282;&#x4F1A;&#x5BF9;&#x8FD9;&#x4E2A; api&#xFF08;&#x5F02;&#x6B65;&#xFF09;&#x6DF1;&#x5165;&#x63A2;&#x7A76;&#xFF0C;&#x8FD9;&#x91CC;&#x7B80;&#x5355;&#x5B9E;&#x73B0;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Component(props) {
  this.props = props
  this.state = this.state || {}
}

Component.prototype.setState = function() {
  this.state = Object.assign({}, this.state, updateObj) // &#x8FD9;&#x91CC;&#x7B80;&#x5355;&#x5B9E;&#x73B0;&#xFF0C;&#x540E;&#x7EED;&#x7BC7;&#x7AE0;&#x4F1A;&#x6DF1;&#x5165;&#x63A2;&#x7A76;
  const returnVdom = this.render() // &#x91CD;&#x65B0;&#x6E32;&#x67D3;
  document.getElementById(&apos;root&apos;).innerHTML = null
  render(returnVdom, document.getElementById(&apos;root&apos;))
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Component</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">this</span>.props = props
  <span class="hljs-keyword">this</span>.state = <span class="hljs-keyword">this</span>.state || {}
}

Component.prototype.setState = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.state = <span class="hljs-built_in">Object</span>.assign({}, <span class="hljs-keyword">this</span>.state, updateObj) <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x7B80;&#x5355;&#x5B9E;&#x73B0;&#xFF0C;&#x540E;&#x7EED;&#x7BC7;&#x7AE0;&#x4F1A;&#x6DF1;&#x5165;&#x63A2;&#x7A76;</span>
  <span class="hljs-keyword">const</span> returnVdom = <span class="hljs-keyword">this</span>.render() <span class="hljs-comment">// &#x91CD;&#x65B0;&#x6E32;&#x67D3;</span>
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;root&apos;</span>).innerHTML = <span class="hljs-literal">null</span>
  render(returnVdom, <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;root&apos;</span>))
}</code></pre><p>&#x6B64;&#x65F6;&#x867D;&#x7136;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x4E86; setState &#x7684;&#x529F;&#x80FD;&#xFF0C;&#x4F46;&#x662F; <code>document.getElementById(&apos;root&apos;)</code> &#x8282;&#x70B9;&#x5199;&#x6B7B;&#x5728; setState &#x4E2D;&#x663E;&#x7136;&#x4E0D;&#x662F;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x5C06; dom &#x8282;&#x70B9;&#x76F8;&#x5173;&#x8F6C;&#x79FB;&#x5230; _render &#x51FD;&#x6570;&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Component.prototype.setState = function(updateObj) {
  this.state = Object.assign({}, this.state, updateObj)
  _render(this) // &#x91CD;&#x65B0;&#x6E32;&#x67D3;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">Component.prototype.setState = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">updateObj</span>) </span>{
  <span class="hljs-keyword">this</span>.state = <span class="hljs-built_in">Object</span>.assign({}, <span class="hljs-keyword">this</span>.state, updateObj)
  _render(<span class="hljs-keyword">this</span>) <span class="hljs-comment">// &#x91CD;&#x65B0;&#x6E32;&#x67D3;</span>
}</code></pre><p>&#x81EA;&#x7136;&#x5730;&#xFF0C;&#x91CD;&#x6784;&#x4E0E;&#x4E4B;&#x76F8;&#x5173;&#x7684; render &#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render(vdom, container) {
  let component
  if (_.isFunction(vdom.nodeName)) {
    if (vdom.nodeName.prototype.render) {
      component = new vdom.nodeName(vdom.attributes)
    } else {
      component = vdom.nodeName(vdom.attributes) // &#x5904;&#x7406;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#xFF1A;const A = (props) =&gt; &lt;div&gt;I&apos;m {props.name}&lt;/div&gt;
    }
  }
  component ? _render(component, container) : _render(vdom, container)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params">vdom, container</span>) </span>{
  <span class="hljs-keyword">let</span> component
  <span class="hljs-keyword">if</span> (_.isFunction(vdom.nodeName)) {
    <span class="hljs-keyword">if</span> (vdom.nodeName.prototype.render) {
      component = <span class="hljs-keyword">new</span> vdom.nodeName(vdom.attributes)
    } <span class="hljs-keyword">else</span> {
      component = vdom.nodeName(vdom.attributes) <span class="hljs-comment">// &#x5904;&#x7406;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#xFF1A;const A = (props) =&gt; &lt;div&gt;I&apos;m {props.name}&lt;/div&gt;</span>
    }
  }
  component ? _render(component, container) : _render(vdom, container)
}</code></pre><p>&#x5728; render &#x51FD;&#x6570;&#x4E2D;&#x5206;&#x79BB;&#x51FA; _render &#x51FD;&#x6570;&#x7684;&#x76EE;&#x7684;&#x662F;&#x4E3A;&#x4E86;&#x8BA9; setState &#x51FD;&#x6570;&#x4E2D;&#x4E5F;&#x80FD;&#x8C03;&#x7528; _render &#x903B;&#x8F91;&#x3002;&#x5B8C;&#x6574; _render &#x51FD;&#x6570;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _render(component, container) {
  const vdom = component.render ? component.render() : component
  if (_.isString(vdom) || _.isNumber(vdom)) {
    container.innerText = container.innerText + vdom
    return
  }
  const dom = document.createElement(vdom.nodeName)
  for (let attr in vdom.attributes) {
    setAttribute(dom, attr, vdom.attributes[attr])
  }
  vdom.children.forEach(vdomChild =&gt; render(vdomChild, dom))
  if (component.container) {  // &#x6CE8;&#x610F;&#xFF1A;&#x8C03;&#x7528; setState &#x65B9;&#x6CD5;&#x65F6;&#x662F;&#x8FDB;&#x5165;&#x8FD9;&#x6BB5;&#x903B;&#x8F91;&#xFF0C;&#x4ECE;&#x800C;&#x5B9E;&#x73B0;&#x6211;&#x4EEC;&#x5C06; dom &#x7684;&#x903B;&#x8F91;&#x4E0E; setState &#x51FD;&#x6570;&#x5206;&#x79BB;&#x7684;&#x76EE;&#x6807;&#xFF1B;&#x77E5;&#x8BC6;&#x70B9;: new &#x51FA;&#x6765;&#x7684;&#x540C;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;
    component.container.innerHTML = null
    component.container.appendChild(dom)
    return
  }
  component.container = container
  container.appendChild(dom)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_render</span>(<span class="hljs-params">component, container</span>) </span>{
  <span class="hljs-keyword">const</span> vdom = component.render ? component.render() : component
  <span class="hljs-keyword">if</span> (_.isString(vdom) || _.isNumber(vdom)) {
    container.innerText = container.innerText + vdom
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-keyword">const</span> dom = <span class="hljs-built_in">document</span>.createElement(vdom.nodeName)
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> attr <span class="hljs-keyword">in</span> vdom.attributes) {
    setAttribute(dom, attr, vdom.attributes[attr])
  }
  vdom.children.forEach(<span class="hljs-function"><span class="hljs-params">vdomChild</span> =&gt;</span> render(vdomChild, dom))
  <span class="hljs-keyword">if</span> (component.container) {  <span class="hljs-comment">// &#x6CE8;&#x610F;&#xFF1A;&#x8C03;&#x7528; setState &#x65B9;&#x6CD5;&#x65F6;&#x662F;&#x8FDB;&#x5165;&#x8FD9;&#x6BB5;&#x903B;&#x8F91;&#xFF0C;&#x4ECE;&#x800C;&#x5B9E;&#x73B0;&#x6211;&#x4EEC;&#x5C06; dom &#x7684;&#x903B;&#x8F91;&#x4E0E; setState &#x51FD;&#x6570;&#x5206;&#x79BB;&#x7684;&#x76EE;&#x6807;&#xFF1B;&#x77E5;&#x8BC6;&#x70B9;: new &#x51FA;&#x6765;&#x7684;&#x540C;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;</span>
    component.container.innerHTML = <span class="hljs-literal">null</span>
    component.container.appendChild(dom)
    <span class="hljs-keyword">return</span>
  }
  component.container = container
  container.appendChild(dom)
}</code></pre><p>&#x8BA9;&#x6211;&#x4EEC;&#x7528;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x7528;&#x4F8B;&#x8DD1;&#x4E0B;&#x5199;&#x597D;&#x7684; react &#x5427;&#xFF01;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class A extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 1
    }
  }

  click() {
    this.setState({
      count: ++this.state.count
    })
  }

  render() {
    return (
      &lt;div&gt;
        &lt;button onClick={this.click.bind(this)}&gt;Click Me!&lt;/button&gt;
        &lt;div&gt;{this.props.name}:{this.state.count}&lt;/div&gt;
      &lt;/div&gt;
    )
  }
}

ReactDOM.render(
  &lt;A name=&quot;count&quot; /&gt;,
  document.getElementById(&apos;root&apos;)
)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props)
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">count</span>: <span class="hljs-number">1</span>
    }
  }

  click() {
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">count</span>: ++<span class="hljs-keyword">this</span>.state.count
    })
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.click.bind(this)}</span>&gt;</span>Click Me!<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{this.props.name}:{this.state.count}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}

ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">A</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;count&quot;</span> /&gt;</span>,
  document.getElementById(&apos;root&apos;)
)</span></code></pre><p>&#x6548;&#x679C;&#x56FE;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015609913?w=274&amp;h=177" src="https://static.alili.tech/img/remote/1460000015609913?w=274&amp;h=177" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x81F3;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x4E86; props &#x548C; state &#x90E8;&#x5206;&#x7684;&#x903B;&#x8F91;&#x3002;</p><h3 id="articleHeader2">&#x5C0F;&#x7ED3;</h3><p>&#x7EC4;&#x4EF6;&#x5373;&#x51FD;&#x6570;&#xFF1B;&#x5F53; JSX &#x4E2D;&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x65F6;&#xFF0C;&#x7ECF;&#x8FC7; babel &#x8F6C;&#x5316;&#x540E;&#x7684; React.createElement(fn, ..) &#x540E;&#x4E2D;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x53D8;&#x4E3A;&#x4E86;&#x51FD;&#x6570;&#xFF0C;&#x9664;&#x6B64;&#x4E4B;&#x5916;&#x5176;&#x5B83;&#x903B;&#x8F91;&#x4E0E; JSX &#x4E2D;&#x4E3A; html &#x5143;&#x7D20;&#x7684;&#x65F6;&#x5019;&#x76F8;&#x540C;&#xFF1B;</p><p>&#x6B64;&#x5916;&#x6211;&#x4EEC;&#x5C06; state/props/setState &#x7B49; api &#x5C01;&#x88C5;&#x8FDB;&#x4E86;&#x7236;&#x7C7B; React.Component &#x4E2D;&#xFF0C;&#x4ECE;&#x800C;&#x5728;&#x5B50;&#x7C7B;&#x4E2D;&#x80FD;&#x8C03;&#x7528;&#x8FD9;&#x4E9B;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x3002;</p><p>&#x5728;&#x4E0B;&#x7BC7;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x7EE7;&#x7EED;&#x5B9E;&#x73B0;&#x751F;&#x547D;&#x5468;&#x671F;&#x673A;&#x5236;&#xFF0C;&#x5982;&#x6709;&#x758F;&#x6F0F;&#xFF0C;&#x6B22;&#x8FCE;&#x65A7;&#x6B63;&#x3002;</p><p><a href="https://github.com/MuYunyun/cpreact" rel="nofollow noreferrer" target="_blank">&#x9879;&#x76EE;&#x5730;&#x5740;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从 0 到 1 实现 React 系列 —— 组件和 state|props

## 原文链接
[https://segmentfault.com/a/1190000015609910](https://segmentfault.com/a/1190000015609910)

