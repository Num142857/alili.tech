---
title: '懒程序员必备的React写法' 
date: 2018-11-29 2:30:08
hidden: true
slug: gkno9v1sigo
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x4F7F;&#x7528;&#x88C5;&#x9970;&#x5668;</h2><h3 id="articleHeader1">Redux&#x7684;connect</h3><p>&#x6559;&#x7A0B;&#x91CC;&#x7684;&#x5199;&#x6CD5;&#x4E00;&#x822C;&#x662F;<code>export default connect(mapToProps)(SomeComponent)</code>&#xFF0C;&#x90A3;&#x4E48;&#x6709;&#x6CA1;&#x6709;&#x66F4;&#x8212;&#x670D;&#x7684;&#x505A;&#x6CD5;&#x5462;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@connect((state) =&gt; {
  return {
    a: state.a,
    b: state.b,
  };
})
export class App extends React.Component {}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">@connect(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">a</span>: state.a,
    <span class="hljs-attr">b</span>: state.b,
  };
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{}
</code></pre><p>&#x4E00;&#x65B9;&#x9762;&#x53EF;&#x4EE5;&#x5BFC;&#x51FA;&#x6A21;&#x5757;&#x540D;&#xFF0C;&#x53E6;&#x4E00;&#x65B9;&#x9762;&#x66F4;&#x52A0;&#x76F4;&#x89C2;&#xFF0C;&#x5C24;&#x5176;&#x662F;&#x4F60;&#x8981;&#x4F7F;&#x7528;&#x591A;&#x4E2A;<strong>&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#xFF08;HOC&#xFF09;</strong>&#x7684;&#x65F6;&#x5019;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@hocA()
@hocB()
@connect()
export class App extends React.Component {}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">@hocA()
@hocB()
@connect()
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{}
</code></pre><hr><h3 id="articleHeader2">&#x81EA;&#x52A8;&#x7ED1;&#x5B9A;this</h3><p>&#x4F60;&#x53EF;&#x80FD;&#x4F1A;&#x5728;<strong>&#x6784;&#x9020;&#x51FD;&#x6570;</strong>&#x91CC;&#x505A;&#x8FD9;&#x6837;&#x7684;&#x4E8B;&#x60C5;&#xFF1A;<code>this.handleClick = this.handleClick.bind(this)</code>&#x3002;<br>&#x6069;&#xFF0C;&#x5728;render&#x7684;&#x65F6;&#x5019;&#xFF0C;eventHandler&#x5982;&#x679C;&#x4E0D;&#x5148;&#x7ED1;&#x5B9A;this&#x7684;&#x8BDD;&#xFF0C;this&#x7684;&#x6307;&#x5411;&#x5E76;&#x4E0D;&#x662F;&#x7EC4;&#x4EF6;&#x672C;&#x8EAB;&#x3002;&#x90A3;&#x4E48;&#x6709;&#x6CA1;&#x6709;&#x66F4;&#x8212;&#x670D;&#x7684;&#x505A;&#x6CD5;&#x5462;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {autobind} from &apos;core-decorators&apos;;

export class App extends React.Component {
  @autobind
  handleClick(e) {
    // todo
  }

  render() {
    return &lt;button onClick={this.handleClick}&gt;Click Me&lt;/button&gt;;
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> {autobind} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;core-decorators&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  @autobind
  handleClick(e) {
    <span class="hljs-comment">// todo</span>
  }

  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick}</span>&gt;</span>Click Me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
  }</code></pre><p>&#x501F;&#x52A9;&#x63D2;&#x4EF6;<a href="https://github.com/jayphelps/core-decorators" rel="nofollow noreferrer" target="_blank">core-decorators</a>&#x53EF;&#x4EE5;&#x5E2E;&#x4F60;&#x81EA;&#x52A8;&#x7ED1;&#x5B9A;this&#x7684;&#x6307;&#x5411;&#xFF0C;&#x5B9E;&#x5728;&#x662F;&#x65B9;&#x4FBF;&#x3002;&#x60F3;&#x60F3;&#x5982;&#x679C;&#x4F60;&#x7684;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x91CC;&#x6709;&#x8D85;&#x591A;&#x7684;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#xFF0C;&#x90A3;&#x4E48;&#x6784;&#x9020;&#x51FD;&#x6570;&#x91CC;&#x7684;bind&#x8BED;&#x53E5;&#x662F;&#x4E0D;&#x662F;&#x8981;&#x7206;&#x70B8;&#x4E86;&#x3002;&#x53CD;&#x6B63;&#x7B14;&#x8005;&#x4EE5;&#x524D;&#x5C31;&#x4EB2;&#x8EAB;&#x7ECF;&#x5386;&#x4E86;&#x3002;</p><h2 id="articleHeader3">&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#x4F20;&#x53C2;</h2><p>&#x5E9F;&#x8BDD;&#x4E0D;&#x591A;&#x8BF4;&#xFF0C;&#x770B;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class App extends React.Component {
  handleClick(value, event) {
    console.log(value); // 1 || 2 || 3
  }

  render() {
    const arr = [1, 2, 3];
    
    return arr.map((value) =&gt; {
      return (
        &lt;button
         key={value}
         onClick={this.handleClick.bind(this, value)}
        &gt;
          {value}
        &lt;/button&gt;
      );
    });
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  handleClick(value, event) {
    <span class="hljs-built_in">console</span>.log(value); <span class="hljs-comment">// 1 || 2 || 3</span>
  }

  render() {
    <span class="hljs-keyword">const</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
    
    <span class="hljs-keyword">return</span> arr.map(<span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
         <span class="hljs-attr">key</span>=<span class="hljs-string">{value}</span>
         <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick.bind(this,</span> <span class="hljs-attr">value</span>)}
        &gt;</span>
          {value}
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
      );
    });
  }
}</code></pre><p>&#x8FD9;&#x4E2A;&#x4EE3;&#x7801;&#x6709;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x5C31;&#x662F;&#x4F60;&#x4F7F;&#x7528;bind&#x7684;&#x8BDD;&#xFF0C;&#x4F1A;&#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x51FD;&#x6570;&#x7ED9;&#x4F60;&#xFF0C;&#x610F;&#x5473;&#x7740;&#x6709;&#x51E0;&#x6B21;&#x5FAA;&#x73AF;&#xFF0C;&#x5C31;&#x4F1A;&#x751F;&#x6210;&#x591A;&#x5C11;&#x65B0;&#x7684;&#x51FD;&#x6570;&#x3002;&#x8FD9;&#x8FD8;&#x53EA;&#x662F;&#x4E00;&#x6B21;render&#x7684;&#x6D88;&#x8017;&#x3002;&#x6709;&#x6CA1;&#x6709;&#x529E;&#x6CD5;&#x89E3;&#x51B3;&#x5462;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {autobind} from &apos;core-decorators&apos;;

export class App extends React.Component {
  @autobind
  handleClick(e) {
    console.log(e.target.getAttribute(&apos;data-value&apos;)); // 1 || 2 || 3
  }

  render() {
    const arr = [1, 2, 3];
    
    return arr.map((value) =&gt; {
      return (
        &lt;button
         key={value}
         data-value={value}
         onClick={this.handleClick}
        &gt;
          {value}
        &lt;/button&gt;
      );
    });
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> {autobind} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;core-decorators&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  @autobind
  handleClick(e) {
    <span class="hljs-built_in">console</span>.log(e.target.getAttribute(<span class="hljs-string">&apos;data-value&apos;</span>)); <span class="hljs-comment">// 1 || 2 || 3</span>
  }

  render() {
    <span class="hljs-keyword">const</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
    
    <span class="hljs-keyword">return</span> arr.map(<span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
         <span class="hljs-attr">key</span>=<span class="hljs-string">{value}</span>
         <span class="hljs-attr">data-value</span>=<span class="hljs-string">{value}</span>
         <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick}</span>
        &gt;</span>
          {value}
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
      );
    });
  }
}</code></pre><p>&#x5229;&#x7528;dom&#x7684;&#x7279;&#x6027;&#xFF0C;&#x5728;dom&#x4E0A;&#x6302;&#x4E00;&#x4E2A;<code>data-</code>&#x524D;&#x7F00;&#xFF08;<strong>html5</strong>&#x89C4;&#x8303;&#xFF09;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x70B9;&#x51FB;&#x7684;&#x65F6;&#x5019;&#x987A;&#x4FBF;&#x53BB;&#x62FF;&#x8FD9;&#x4E2A;&#x503C;&#x4E86;&#x3002;</p><hr><h2 id="articleHeader4">&#x8FD4;&#x56DE;&#x56FA;&#x5B9A;&#x6570;&#x7EC4;</h2><p>&#x5982;&#x679C;&#x4F60;&#x5728;render&#x4E2D;&#x8FD4;&#x56DE;&#x6570;&#x7EC4;&#xFF0C;&#x90A3;&#x4E48;react&#x662F;&#x4F1A;&#x8B66;&#x544A;&#x4F60;&#x7ED9;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x52A0;key&#x7684;&#x3002;&#x8FD9;&#x662F;&#x6CA1;&#x9519;&#x7684;&#x5566;&#xFF0C;&#x56E0;&#x4E3A;&#x4E0D;&#x52A0;key&#x7684;&#x8BDD;&#xFF0C;&#x5982;&#x679C;&#x4E0B;&#x6B21;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x987A;&#x5E8F;&#x8C03;&#x6362;&#x4E86;&#xFF0C;react&#x4E0D;&#x4F1A;&#x7ED9;&#x4F60;&#x66F4;&#x65B0;&#x7684;&#xFF0C;&#x76F4;&#x63A5;gg&#x3002;<br>&#x4F46;&#x6709;&#x65F6;&#x5019;&#x5176;&#x5B9E;&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x5B83;&#x5C31;&#x662F;&#x56FA;&#x5B9A;&#x4E0D;&#x4F1A;&#x53D8;&#x7684;&#x554A;&#xFF0C;&#x600E;&#x4E48;&#x6837;&#x5C11;&#x5199;&#x51E0;&#x4E2A;key&#x5462;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Fragment} from &apos;react&apos;;

class App extends React.Component {
  render() {
    return (
      &lt;Fragment&gt;
        &lt;li&gt;&#x4F60;&#x597D;&lt;/li&gt;
        &lt;li&gt;&#x539F;&#x7F6A;&lt;/li&gt;
      &lt;/Fragment&gt;
    );
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, {Fragment} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Fragment</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x4F60;&#x597D;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x539F;&#x7F6A;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Fragment</span>&gt;</span></span>
    );
  }
}</code></pre><p>&#x52A0;&#x4E2A;<a href="http://www.css88.com/react/docs/fragments.html" rel="nofollow noreferrer" target="_blank">Fragment</a>&#xFF0C;&#x5176;&#x5B9E;&#x4ECE;&#x67D0;&#x79CD;&#x610F;&#x4E49;&#x8BB2;&#xFF0C;&#x8FD9;&#x4E1C;&#x897F;&#x5C31;&#x662F;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x8FD9;&#x79CD;&#x573A;&#x666F;&#x7684;&#x3002;&#x5B83;&#x662F;&#x4E2A;&#x7A7A;&#x6807;&#x7B7E;&#xFF0C;&#x4E0D;&#x4F1A;&#x5728;dom&#x91CC;&#x9762;&#x4EA7;&#x751F;&#x6807;&#x7B7E;&#x7684;&#x3002;</p><hr><p>&#x5E38;&#x5E74;&#x66F4;&#x65B0;...</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
懒程序员必备的React写法

## 原文链接
[https://segmentfault.com/a/1190000015247530](https://segmentfault.com/a/1190000015247530)

