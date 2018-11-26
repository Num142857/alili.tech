---
title: '精读《React 八种条件渲染》' 
date: 2018-11-27 2:30:13
hidden: true
slug: 2femnyyg3qj
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">1 &#x5F15;&#x8A00;</h2><p>&#x672C;&#x671F;&#x7CBE;&#x8BFB;&#x7684;&#x6587;&#x7AE0;&#x662F;&#xFF1A;<a href="https://blog.logrocket.com/conditional-rendering-in-react-c6b0e5af381e" rel="nofollow noreferrer" target="_blank">8 React conditional rendering methods</a></p><p>&#x4ECB;&#x7ECD;&#x4E86;&#x516B;&#x79CD; React &#x6761;&#x4EF6;&#x6E32;&#x67D3;&#x65B9;&#x5F0F;&#x3002;</p><p>&#x6A21;&#x7248;&#x6761;&#x4EF6;&#x6E32;&#x67D3;&#x975E;&#x5E38;&#x5E38;&#x89C1;&#xFF0C;&#x9047;&#x5230;&#x7684;&#x65F6;&#x5019;&#x5F80;&#x5F80;&#x4F1A;&#x968F;&#x673A;&#x9009;&#x62E9;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#x4F7F;&#x7528;&#xFF0C;&#x90A3;&#x4E48;&#x600E;&#x4E48;&#x5199;&#x4F1A;&#x6709;&#x8F83;&#x597D;&#x7684;&#x7EF4;&#x62A4;&#x6027;&#x5462;&#xFF1F;&#x5148;&#x4E00;&#x8D77;&#x4E86;&#x89E3;&#x4E0B;&#x6709;&#x54EA;&#x516B;&#x79CD;&#x6761;&#x4EF6;&#x6E32;&#x67D3;&#x65B9;&#x5F0F;&#x5427;&#xFF01;</p><h2 id="articleHeader1">2 &#x6982;&#x8FF0;</h2><h3 id="articleHeader2">IF/ELSE</h3><p>&#x65E2;&#x7136; JSX &#x652F;&#x6301; js &#x4E0E; html &#x6DF7;&#x5199;&#xFF0C;&#x90A3;&#x4E48;&#x4EA4;&#x66FF;&#x4F7F;&#x7528;&#x5C31;&#x80FD;&#x89E3;&#x51B3;&#x6761;&#x4EF6;&#x6E32;&#x67D3;&#x7684;&#x95EE;&#x9898;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render() {
  if (renderComponent1) {
    return &lt;Component1 /&gt;;
  } else {
    return &lt;div /&gt;;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code class="tsx"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">if</span> (renderComponent1) {
    <span class="hljs-keyword">return</span> &lt;Component1 /&gt;;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> &lt;div /&gt;;
  }
}</code></pre><h3 id="articleHeader3">return <code>null</code></h3><p>&#x5982;&#x679C;&#x4E0D;&#x60F3;&#x6E32;&#x67D3;&#x7A7A;&#x5143;&#x7D20;&#xFF0C;&#x6700;&#x597D;&#x4F7F;&#x7528; <code>null</code> &#x4EE3;&#x66FF;&#x7A7A;&#x7684; <code>div</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render() {
  if (renderComponent1) {
    return &lt;Component1 /&gt;;
  } else {
    return null;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code class="tsx"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">if</span> (renderComponent1) {
    <span class="hljs-keyword">return</span> &lt;Component1 /&gt;;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
  }
}</code></pre><p>&#x8FD9;&#x6837;&#x5BF9; React &#x6E32;&#x67D3;&#x6548;&#x7387;&#x6709;&#x63D0;&#x5347;&#x3002;</p><h3 id="articleHeader4">&#x7EC4;&#x4EF6;&#x53D8;&#x91CF;</h3><p>&#x5C06;&#x7EC4;&#x4EF6;&#x8D4B;&#x503C;&#x5230;&#x53D8;&#x91CF;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5728; return &#x524D;&#x4EFB;&#x610F;&#x4FEE;&#x6539;&#x5B83;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render() {
  let component = null;

  if (renderComponent1) {
    component = &lt;Component1 /&gt;;
  }

  return component;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code class="tsx"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> component = <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">if</span> (renderComponent1) {
    component = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Component1</span> /&gt;</span>;
  }

  return component;
}</span></code></pre><h3 id="articleHeader5">&#x4E09;&#x5143;&#x8FD0;&#x7B97;&#x7B26;</h3><p><a href="https://en.wikipedia.org/wiki/%3F:" rel="nofollow noreferrer" target="_blank">&#x4E09;&#x5143;&#x8FD0;&#x7B97;&#x7B26;</a>&#x7684;&#x8BED;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="condition ? expr_if_true : expr_if_false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ceylon"><code class="text" style="word-break:break-word;white-space:initial">condition ? expr<span class="hljs-number">_</span><span class="hljs-keyword">if</span><span class="hljs-number">_</span>true : expr<span class="hljs-number">_</span><span class="hljs-keyword">if</span><span class="hljs-number">_f</span>alse</code></pre><p>&#x7528;&#x5728; JSX &#x4E0A;&#x4E5F;&#x5F88;&#x65B9;&#x4FBF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render() {
  return renderComponent1 ? &lt;Component1 /&gt; : null;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code class="tsx"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>() {
  <span class="hljs-keyword">return</span> <span class="hljs-type">renderComponent1</span> ? &lt;Component1 /&gt; : <span class="hljs-keyword"><span class="hljs-keyword">null</span></span>;
}</code></pre><p>&#x4F46;&#x4E09;&#x5143;&#x8FD0;&#x7B97;&#x7B26;&#x4EA7;&#x751F;&#x5D4C;&#x5957;&#x65F6;&#xFF0C;&#x7406;&#x89E3;&#x6210;&#x672C;&#x4F1A;&#x53D8;&#x5F97;&#x5F88;&#x9AD8;&#x3002;</p><h3 id="articleHeader6">&amp;&amp;</h3><p>&#x8FD9;&#x4E2A;&#x662F;&#x6700;&#x5E38;&#x7528;&#x4E86;&#xFF0C;&#x56E0;&#x4E3A;&#x4EE3;&#x7801;&#x91CF;&#x6700;&#x5C11;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render() {
  return renderComponent1 &amp;&amp; &lt;Component1 /&gt;;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code class="tsx"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>() {
  <span class="hljs-keyword">return</span> <span class="hljs-type">renderComponent1</span> &amp;&amp; &lt;Component1 /&gt;;
}</code></pre><h3 id="articleHeader7">IIFE</h3><p>IIFE &#x542B;&#x4E49;&#x662F;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function myFunction(/* arguments */) {
  // ...
})(/* arguments */);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript">(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunction</span>(<span class="hljs-params"><span class="hljs-comment">/* arguments */</span></span>) </span>{
  <span class="hljs-comment">// ...</span>
})(<span class="hljs-comment">/* arguments */</span>);</code></pre><p>&#x5F53;&#x6DF1;&#x9677; JSX &#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x53C8;&#x60F3;&#x5199;&#x4E00;&#x5927;&#x5757;&#x903B;&#x8F91;&#x65F6;&#xFF0C;&#x9664;&#x4E86;&#x56DE;&#x5230;&#x4E0A;&#x65B9;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; IIFE&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render() {
  return (
    &lt;div&gt;
      {(() =&gt; {
        if (renderComponent1) {
          return &lt;Component1 /&gt;;
        } else {
          return &lt;div /&gt;;
        }
      })()}
    &lt;/div&gt;
  );
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code class="tsx"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> (
    &lt;div&gt;
      {<span class="hljs-function">(<span class="hljs-params">(<span class="hljs-params"></span>) =&gt; {
        <span class="hljs-keyword">if</span> (<span class="hljs-params">renderComponent1</span>) {
          <span class="hljs-keyword">return</span> &lt;Component1 /&gt;;
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">return</span> &lt;div /&gt;;
        }
      }</span>)<span class="hljs-params">()</span>}
    &lt;/<span class="hljs-params">div</span>&gt;
  );
}</span></code></pre><h3 id="articleHeader8">&#x5B50;&#x7EC4;&#x4EF6;</h3><p>&#x8FD9;&#x662F; IIFE &#x7684;&#x53D8;&#x79CD;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x628A;&#x8FD9;&#x6BB5;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;&#x66FF;&#x6362;&#x6210;&#x4E00;&#x4E2A;&#x666E;&#x901A;&#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render() {
  return (
    &lt;div&gt;
      &lt;SubRender /&gt;
    &lt;/div&gt;
  );
}

function SubRender() {
  if (renderComponent1) {
    return &lt;Component1 /&gt;;
  } else {
    return &lt;div /&gt;;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code class="tsx"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">SubRender</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SubRender</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (renderComponent1) {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Component1</span> /&gt;</span>;
  } else {
    return <span class="hljs-tag">&lt;<span class="hljs-name">div</span> /&gt;</span>;
  }
}</span></code></pre><h3 id="articleHeader9">IF &#x7EC4;&#x4EF6;</h3><p>&#x505A;&#x4E00;&#x4E2A;&#x6761;&#x4EF6;&#x6E32;&#x67D3;&#x7EC4;&#x4EF6; <code>IF</code> &#x4EE3;&#x66FF; js &#x51FD;&#x6570;&#x7684; <code>if</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;If condition={true}&gt;
  &lt;span&gt;Hi!&lt;/span&gt;
&lt;/If&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code class="tsx"><span class="hljs-tag">&lt;<span class="hljs-name">If</span> <span class="hljs-attr">condition</span>=<span class="hljs-string">{true}</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Hi!<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">If</span>&gt;</span></code></pre><p>&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x5B9E;&#x73B0;&#x4E5F;&#x5F88;&#x7B80;&#x5355;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const If = props =&gt; {
  const condition = props.condition || false;
  const positive = props.then || null;
  const negative = props.else || null;

  return condition ? positive : negative;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs autoit"><code class="tsx"><span class="hljs-keyword">const</span> <span class="hljs-keyword">If</span> = props =&gt; {
  <span class="hljs-keyword">const</span> condition = props.condition || <span class="hljs-literal">false</span><span class="hljs-comment">;</span>
  <span class="hljs-keyword">const</span> positive = props.<span class="hljs-keyword">then</span> || <span class="hljs-literal">null</span><span class="hljs-comment">;</span>
  <span class="hljs-keyword">const</span> negative = props.<span class="hljs-keyword">else</span> || <span class="hljs-literal">null</span><span class="hljs-comment">;</span>

  <span class="hljs-keyword">return</span> condition ? positive : negative<span class="hljs-comment">;</span>
}<span class="hljs-comment">;</span></code></pre><h3 id="articleHeader10">&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;</h3><p>&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#xFF0C;&#x5C31;&#x662F;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7EC4;&#x4EF6;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x3002;</p><p>&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x5C31;&#x80FD;&#x5728;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x91CC;&#x5199;&#x6761;&#x4EF6;&#x8BED;&#x53E5;&#xFF0C;&#x8FD4;&#x56DE;&#x4E0D;&#x540C;&#x7684;&#x7EC4;&#x4EF6;&#x5373;&#x53EF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function higherOrderComponent(Component) {
  return function EnhancedComponent(props) {
    if (condition) {
      return &lt;AnotherComponent {...props} /&gt;;
    }

    return &lt;Component {...props} /&gt;;
  };
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code class="tsx"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">higherOrderComponent</span><span class="hljs-params">(Component)</span> </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">EnhancedComponent</span><span class="hljs-params">(props)</span> </span>{
    <span class="hljs-keyword">if</span> (condition) {
      <span class="hljs-keyword">return</span> &lt;AnotherComponent {...props} /&gt;;
    }

    <span class="hljs-keyword">return</span> &lt;Component {...props} /&gt;;
  };
}</code></pre><h2 id="articleHeader11">3 &#x7CBE;&#x8BFB;</h2><p>&#x8FD9;&#x4E48;&#x591A;&#x65B9;&#x6CD5;&#x90FD;&#x80FD;&#x5B9E;&#x73B0;&#x6761;&#x4EF6;&#x6E32;&#x67D3;&#xFF0C;&#x90A3;&#x4E48;&#x91CD;&#x70B9;&#x5728;&#x4E8E;&#x53EF;&#x8BFB;&#x6027;&#x4E0E;&#x53EF;&#x7EF4;&#x62A4;&#x6027;&#x3002;</p><p>&#x6BD4;&#x5982;&#x901A;&#x8FC7;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x5B9E;&#x73B0;&#x7EC4;&#x4EF6;&#x6E32;&#x67D3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div&gt;{renderButton()}&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code class="tsx" style="word-break:break-word;white-space:initial"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-template-variable">{renderButton()}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre><p>&#x770B;&#x4E0A;&#x53BB;&#x8FD8;&#x662F;&#x6BD4;&#x8F83;&#x5197;&#x4F59;&#xFF0C;&#x5982;&#x679C;&#x4F7F;&#x7528; <code>renderButton</code> getter &#x5B9A;&#x4E49;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x8FD9;&#x4E48;&#x5199;&#x5B83;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div&gt;{button}&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code class="tsx" style="word-break:break-word;white-space:initial"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-template-variable">{button}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre><p>&#x5176;&#x5B9E;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x5C31;&#x662F; button&#xFF0C;&#x800C;&#x4E0D;&#x662F; <code>renderButton</code>&#x3002;&#x90A3;&#x4E48;&#x8FD8;&#x53EF;&#x4EE5;&#x8FDB;&#x4E00;&#x6B65;&#xFF0C;&#x5E72;&#x8106;&#x5C01;&#x88C5;&#x6210; JSX &#x7EC4;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div&gt;
  &lt;Button /&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs apache"><code class="tsx"><span class="hljs-section">&lt;div&gt;</span>
  <span class="hljs-section">&lt;Button /&gt;</span>
<span class="hljs-section">&lt;/div&gt;</span></code></pre><p>&#x662F;&#x5426;&#x8981;&#x4ED8;&#x51FA;&#x8FD9;&#x4E9B;&#x52AA;&#x529B;&#xFF0C;&#x53D6;&#x51B3;&#x4E8E;&#x5E94;&#x7528;&#x7684;&#x590D;&#x6742;&#x5EA6;&#x3002;&#x5982;&#x679C;&#x5E94;&#x7528;&#x590D;&#x6742;&#x5EA6;&#x975E;&#x5E38;&#x9AD8;&#xFF0C;&#x90A3;&#x4F60;&#x5E94;&#x5F53;&#x5C3D;&#x91CF;&#x4F7F;&#x7528;&#x6700;&#x540E;&#x4E00;&#x79CD;&#x5C01;&#x88C5;&#xFF0C;&#x8BA9;&#x6BCF;&#x4E2A;&#x6587;&#x4EF6;&#x7684;&#x903B;&#x8F91;&#x5C3D;&#x91CF;&#x72EC;&#x7ACB;&#x3001;&#x7B80;&#x5355;&#x3002;</p><p>&#x5982;&#x679C;&#x5E94;&#x7528;&#x590D;&#x6742;&#x5EA6;&#x6BD4;&#x8F83;&#x4F4E;&#xFF0C;&#x90A3;&#x4E48;&#x6CE8;&#x610F;&#x4E0D;&#x8981;&#x8FC7;&#x5EA6;&#x5C01;&#x88C5;&#xFF0C;&#x4EE5;&#x514D;&#x628A;&#x81EA;&#x5DF1;&#x7ED5;&#x8FDB;&#x53BB;&#x3002;</p><p>&#x6240;&#x4EE5;&#x770B;&#x6765;&#x8FD9;&#x53C8;&#x662F;&#x4E00;&#x4E2A;&#x6CA1;&#x6709;&#x56FA;&#x5B9A;&#x7B54;&#x6848;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x9009;&#x62E9;&#x4F55;&#x79CD;&#x65B9;&#x5F0F;&#x5C01;&#x88C5;&#xFF0C;&#x53D6;&#x51B3;&#x4E8E;&#x5E94;&#x7528;&#x590D;&#x6742;&#x5EA6;&#x3002;</p><h3 id="articleHeader12">&#x5E94;&#x7528;&#x590D;&#x6742;&#x5EA6;</h3><p>&#x5BF9;&#x4EFB;&#x4F55;&#x4EE3;&#x7801;&#x5C01;&#x88C5;&#xFF0C;&#x90FD;&#x4F1A;&#x589E;&#x52A0;&#x8FD9;&#x6BB5; <strong>&#x8FDE;&#x63A5;&#x903B;&#x8F91;</strong> &#x7684;&#x590D;&#x6742;&#x5EA6;&#x3002;</p><p>&#x5047;&#x5B9A;&#x65E0;&#x8BBA;&#x5982;&#x4F55;&#x4EE3;&#x7801;&#x7684;&#x590D;&#x6742;&#x5EA6;&#x90FD;&#x662F;&#x6052;&#x5B9A;&#x4E0D;&#x53D8;&#x7684;&#xFF0C;&#x4E0B;&#x9762;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#xFF0C;&#x8FDE;&#x63A5;&#x590D;&#x6742;&#x5EA6;&#x4E3A; 0&#xFF0C;&#x800C;&#x5BF9;&#x4E8E; <code>render</code> &#x51FD;&#x6570;&#x800C;&#x8A00;&#xFF0C;&#x903B;&#x8F91;&#x590D;&#x6742;&#x5EA6;&#x662F; 100&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render() {
  if (renderComponent) {
    return isOk ? &lt;Component1 /&gt; : &lt;Component2 /&gt;;
  } else {
    return &lt;div /&gt;;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code class="tsx"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>() {
  if (renderComponent) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">isOk</span> ? &lt;Component1 /&gt; : &lt;<span class="hljs-type">Component2</span> /&gt;;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> &lt;div /&gt;;
  }
}</code></pre><p>&#x4E0B;&#x9762;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x62C6;&#x6210;&#x4E86;&#x4E24;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x903B;&#x8F91;&#x590D;&#x6742;&#x5EA6;&#x5BF9; <code>render</code> <code>SubComponent</code> &#x6765;&#x8BF4;&#x90FD;&#x662F; 50&#xFF0C;&#x4F46;&#x8FDE;&#x63A5;&#x590D;&#x6742;&#x5EA6;&#x662F; 50&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render() {
  if (renderComponent) {
    return &lt;SubComponent&gt;;
  } else {
    return &lt;div /&gt;;
  }
}

function SubComponent() {
  return isOk ? &lt;Component1 /&gt; : &lt;Component2 /&gt;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (renderComponent) {
    <span class="hljs-keyword">return</span> &lt;SubComponent&gt;;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> &lt;div /&gt;;
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SubComponent</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> isOk ? &lt;Component1 /&gt; : &lt;Component2 /&gt;
}</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x51FD;&#x6570;&#x62C6;&#x5206;&#xFF0C;&#x964D;&#x4F4E;&#x4E86;&#x6BCF;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x903B;&#x8F91;&#x590D;&#x6742;&#x5EA6;&#xFF0C;&#x4F46;&#x5374;&#x63D0;&#x9AD8;&#x4E86;&#x8FDE;&#x63A5;&#x590D;&#x6742;&#x5EA6;&#x3002;</p><p>&#x4E0B;&#x9762;&#x6765;&#x505A;&#x4E00;&#x4E2A;&#x6BD4;&#x8F83;&#xFF0C;&#x6211;&#x4EEC;&#x5047;&#x8BBE;&#x4E00;&#x4E2A;&#x6B63;&#x5E38;&#x7684;&#x7A0B;&#x5E8F;&#x5458;&#xFF0C;&#x53EF;&#x4EE5;&#x4E00;&#x6B21;&#x6027;&#x8F7B;&#x677E;&#x8BB0;&#x5FC6; 10 &#x4E2A;&#x51FD;&#x6570;&#x3002;&#x5982;&#x679C;&#x518D;&#x591A;&#xFF0C;&#x51FD;&#x6570;&#x4E4B;&#x95F4;&#x7684;&#x8C03;&#x7528;&#x5173;&#x7CFB;&#x5C31;&#x4F1A;&#x8BA9;&#x4EBA;&#x6478;&#x4E0D;&#x7740;&#x5934;&#x8111;&#x3002;</p><h4>&#x5E94;&#x7528;&#x8F83;&#x5C0F;&#x65F6;</h4><p>&#x5728;&#x5E94;&#x7528;&#x4EE3;&#x7801;&#x91CF;&#x6BD4;&#x8F83;&#x5C0F;&#x65F6;&#xFF0C;&#x5047;&#x8BBE;&#x4E00;&#x5171;&#x6709; 10 &#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5982;&#x679C;&#x505A;&#x4E86;&#x903B;&#x8F91;&#x62BD;&#x8C61;&#xFF0C;&#x62C6;&#x5206;&#x51FA;&#x4E86; 10 &#x4E2A;&#x5B50;&#x51FD;&#x6570;&#xFF0C;&#x90A3;&#x4E48;&#x603B;&#x903B;&#x8F91;&#x590D;&#x6742;&#x5EA6;&#x4E0D;&#x53D8;&#xFF0C;&#x51FD;&#x6570;&#x53D8;&#x6210;&#x4E86; 20 &#x4E2A;&#x3002;</p><p>&#x6B64;&#x65F6;&#x5C0F;&#x738B;&#x8981;&#x4FEE;&#x6539;&#x6B64;&#x9879;&#x76EE;&#xFF0C;&#x4ED6;&#x9700;&#x8981;&#x627E;&#x5230;&#x5173;&#x952E;&#x4EE3;&#x7801;&#x7684;&#x4F4D;&#x7F6E;&#x3002;</p><p>&#x5982;&#x679C;&#x6CA1;&#x6709;&#x505A;&#x903B;&#x8F91;&#x62BD;&#x8C61;&#xFF0C;&#x5C0F;&#x738B;&#x4E00;&#x4E0B;&#x5B50;&#x5C31;&#x8BB0;&#x4F4F;&#x4E86; 10 &#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x5F88;&#x5FEB;&#x5B8C;&#x6210;&#x4E86;&#x9700;&#x6C42;&#x3002;</p><p>&#x5982;&#x679C;&#x5E94;&#x7528;&#x505A;&#x4E86;&#x903B;&#x8F91;&#x62BD;&#x8C61;&#xFF0C;&#x4ED6;&#x9700;&#x8981;&#x7406;&#x89E3;&#x7684;&#x903B;&#x8F91;&#x590D;&#x6742;&#x5EA6;&#x662F;&#x4E0D;&#x53D8;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x8981;&#x8BFB;&#x7684;&#x51FD;&#x6570;&#x53D8;&#x6210;&#x4E86; 20 &#x4E2A;&#x3002;&#x5C0F;&#x738B;&#x9700;&#x8981;&#x50CF;&#x4FA6;&#x63A2;&#x4E00;&#x6837;&#x5728;&#x7EBF;&#x7D22;&#x4E2D;&#x4E0D;&#x65AD;&#x8DF3;&#x8F6C;&#xFF0C;&#x4ED6;&#x8FD8;&#x662F;&#x53EA;&#x627E;&#x4E86; 10 &#x4E2A;&#x5173;&#x952E;&#x51FD;&#x6570;&#xFF0C;&#x4F46;&#x4E00;&#x5171;&#x4E5F;&#x5C31; 20 &#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x903B;&#x8F91;&#x5E76;&#x4E0D;&#x590D;&#x6742;&#xFF0C;&#x8FD9;&#x503C;&#x5F97;&#x5417;&#xFF1F;</p><p>&#x5C0F;&#x738B;&#x5FC3;&#x91CC;&#x53EF;&#x80FD;&#x4F1A;&#x5600;&#x5495;&#xFF1A;&#x7B80;&#x5355;&#x7684;&#x903B;&#x8F91;&#x778E;&#x62BD;&#x8C61;&#xFF0C;&#x5BB3;&#x6211;&#x6587;&#x4EF6;&#x627E;&#x4E86;&#x534A;&#x5929;&#xFF01;</p><h4>&#x5E94;&#x7528;&#x8F83;&#x5927;&#x65F6;</h4><p>&#x6B64;&#x65F6;&#x5E94;&#x7528;&#x4EE3;&#x7801;&#x91CF;&#x6BD4;&#x8F83;&#x5927;&#xFF0C;&#x5047;&#x8BBE;&#x4E00;&#x5171;&#x6709; 500 &#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x8003;&#x8651;&#x62BD;&#x8C61;&#x540E;&#x5E26;&#x6765;&#x7684;&#x590D;&#x7528;&#x597D;&#x5904;&#xFF0C;&#x5047;&#x8BBE;&#x90FD;&#x65E0;&#x6CD5;&#x590D;&#x7528;&#xFF0C;&#x90A3;&#x4E48;&#x505A;&#x4E86;&#x903B;&#x8F91;&#x62BD;&#x8C61;&#x540E;&#xFF0C;&#x90A3;&#x4E48;&#x603B;&#x903B;&#x8F91;&#x590D;&#x6742;&#x5EA6;&#x4E0D;&#x53D8;&#xFF0C;&#x51FD;&#x6570;&#x53D8;&#x6210;&#x4E86; 1000 &#x4E2A;&#x3002;</p><p>&#x6B64;&#x65F6;&#x5C0F;&#x738B;&#x63A5;&#x5230;&#x4E86;&#x9700;&#x6C42;&#xFF0C;&#x7EC8;&#x4E8E;&#x7EF4;&#x62A4;&#x4E86;&#x4E00;&#x4E2A;&#x5927;&#x9879;&#x76EE;&#x3002;</p><p>&#x5C0F;&#x738B;&#x77E5;&#x9053;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x5F88;&#x590D;&#x6742;&#xFF0C;&#x4ECE;&#x4E00;&#x5F00;&#x59CB;&#x5C31;&#x6CA1;&#x89C9;&#x5F97;&#x80FD;&#x7406;&#x89E3;&#x9879;&#x76EE;&#x5168;&#x8C8C;&#xFF0C;&#x6240;&#x4EE5;&#x628A;&#x81EA;&#x5DF1;&#x5F53;&#x4F5C;&#x4E00;&#x540D;&#x4FA6;&#x63A2;&#xFF0C;&#x51C6;&#x5907;&#x4E00;&#x6B65;&#x6B65;&#x63A2;&#x7D22;&#x3002;</p><p>&#x73B0;&#x5728;&#x6709;&#x4E24;&#x79CD;&#x9009;&#x62E9;&#xFF0C;&#x4E00;&#x79CD;&#x662F;&#x5728;&#x672A;&#x505A;&#x903B;&#x8F91;&#x62BD;&#x8C61;&#x65F6;&#x63A2;&#x7D22;&#xFF0C;&#x4E00;&#x79CD;&#x662F;&#x5728;&#x505A;&#x8FC7;&#x903B;&#x8F91;&#x62BD;&#x8C61;&#x540E;&#x63A2;&#x7D22;&#x3002;</p><p>&#x5982;&#x679C;&#x6CA1;&#x505A;&#x903B;&#x8F91;&#x62BD;&#x8C61;&#xFF0C;&#x5C0F;&#x738B;&#x9700;&#x8981;&#x9762;&#x5BF9; <code>500</code> &#x4E2A;&#x8FD9;&#x79CD;&#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render() {
  if (renderComponent) {
    return isOk ? &lt;Component1 /&gt; : &lt;Component2 /&gt;;
  } else {
    return isReady ? &lt;Component3 /&gt; : &lt;Component4 /&gt;;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code class="tsx"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>() {
  if (renderComponent) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">isOk</span> ? &lt;Component1 /&gt; : &lt;<span class="hljs-type">Component2</span> /&gt;;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> isReady ? &lt;Component3 /&gt; : &lt;<span class="hljs-type">Component4</span> /&gt;;
  }
}</code></pre><p>&#x5982;&#x679C;&#x505A;&#x4E86;&#x903B;&#x8F91;&#x62BD;&#x8C61;&#xFF0C;&#x5C0F;&#x738B;&#x9700;&#x8981;&#x9762;&#x5BF9; <code>1000</code> &#x4E2A;&#x8FD9;&#x79CD;&#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render() {
  if (renderComponent) {
    return &lt;Component1And2 /&gt;;
  } else {
    return &lt;Component3And4 /&gt;;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code class="tsx"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">if</span> (renderComponent) {
    <span class="hljs-keyword">return</span> &lt;Component1And2 /&gt;;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> &lt;Component3And4 /&gt;;
  }
}</code></pre><p>&#x5728;&#x9879;&#x76EE;&#x5E9E;&#x5927;&#x540E;&#xFF0C;&#x603B;&#x51FD;&#x6570;&#x6570;&#x91CF;&#x5E76;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x5BF9;&#x7EBF;&#x7D22;&#x7684;&#x67E5;&#x627E;&#xFF0C;&#x800C;&#x603B;&#x7EBF;&#x7D22;&#x6DF1;&#x5EA6;&#x4E5F;&#x51E0;&#x4E4E;&#x603B;&#x662F;&#x56FA;&#x5B9A;&#x7684;&#xFF0C;&#x4E00;&#x822C;&#x5728; 5 &#x5C42;&#x5DE6;&#x53F3;&#x3002;</p><p>&#x5C0F;&#x738B;&#x7406;&#x89E3; 5 &#x4E2A;&#x6216; 10 &#x4E2A;&#x51FD;&#x6570;&#x6210;&#x672C;&#x90FD;&#x5DEE;&#x4E0D;&#x591A;&#xFF0C;&#x4F46;&#x6CA1;&#x6709;&#x505A;&#x903B;&#x8F91;&#x62BD;&#x8C61;&#x65F6;&#xFF0C;&#x8FD9; 5 &#x4E2A;&#x51FD;&#x6570;&#x5404;&#x81EA;&#x53C2;&#x6742;&#x4E86;&#x5176;&#x4ED6;&#x903B;&#x8F91;&#xFF0C;&#x53CD;&#x800C;&#x5F71;&#x54CD;&#x5BF9;&#x51FD;&#x6570;&#x7684;&#x7406;&#x89E3;&#x3002;</p><p>&#x8FD9;&#x65F6;&#x505A;&#x903B;&#x8F91;&#x62BD;&#x8C61;&#x662F;&#x5408;&#x9002;&#x7684;&#x3002;</p><h2 id="articleHeader13">4 &#x603B;&#x7ED3;</h2><p>&#x6240;&#x4EE5;&#x603B;&#x7684;&#x6765;&#x8BF4;&#xFF0C;&#x7B14;&#x8005;&#x66F4;&#x503E;&#x5411;&#x4F7F;&#x7528;&#x5B50;&#x51FD;&#x6570;&#x3001;&#x5B50;&#x7EC4;&#x4EF6;&#x3001;IF &#x7EC4;&#x4EF6;&#x3001;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x505A;&#x6761;&#x4EF6;&#x6E32;&#x67D3;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x56DB;&#x79CD;&#x65B9;&#x5F0F;&#x90FD;&#x80FD;&#x63D0;&#x9AD8;&#x7A0B;&#x5E8F;&#x7684;&#x62BD;&#x8C61;&#x80FD;&#x529B;&#x3002;</p><p>&#x5F80;&#x5F80;&#x62BD;&#x8C61;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x4F1A;&#x66F4;&#x5177;&#x6709;&#x590D;&#x7528;&#x6027;&#xFF0C;&#x5355;&#x4E2A;&#x51FD;&#x6570;&#x903B;&#x8F91;&#x66F4;&#x6E05;&#x6670;&#xFF0C;&#x5728;&#x5207;&#x9762;&#x7F16;&#x7A0B;&#x65F6;&#x66F4;&#x5229;&#x4E8E;&#x7406;&#x89E3;&#x3002;</p><p>&#x5F53;&#x9879;&#x76EE;&#x5F88;&#x7B80;&#x5355;&#x65F6;&#xFF0C;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x7406;&#x89E3;&#x6210;&#x672C;&#x90FD;&#x5F88;&#x4F4E;&#xFF0C;&#x62BD;&#x8C61;&#x5E26;&#x6765;&#x7684;&#x590D;&#x6742;&#x5EA6;&#x53CD;&#x800C;&#x8BA9;&#x9879;&#x76EE;&#x53D8;&#x6210;&#x4E86;&#x9700;&#x8981;&#x5207;&#x9762;&#x7F16;&#x7A0B;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x5F97;&#x4E0D;&#x507F;&#x5931;&#x4E86;&#x3002;</p><p>&#x603B;&#x7ED3;&#x4E00;&#x4E0B;&#xFF1A;</p><ul><li>&#x5F53;&#x9879;&#x76EE;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x6216;&#x8005;&#x6761;&#x4EF6;&#x6E32;&#x67D3;&#x7684;&#x903B;&#x8F91;&#x786E;&#x8BA4;&#x65E0;&#x6CD5;&#x590D;&#x7528;&#x65F6;&#xFF0C;&#x63A8;&#x8350;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x7528; <code>&amp;&amp;</code> &#x6216;&#x8005;&#x4E09;&#x5143;&#x8FD0;&#x7B97;&#x7B26;&#x3001;IIFE &#x7B49;&#x76F4;&#x63A5;&#x5B9E;&#x73B0;&#x6761;&#x4EF6;&#x6E32;&#x67D3;&#x3002;</li><li>&#x5F53;&#x9879;&#x76EE;&#x5F88;&#x590D;&#x6742;&#x65F6;&#xFF0C;&#x5C3D;&#x91CF;&#x90FD;&#x4F7F;&#x7528; &#x5B50;&#x51FD;&#x6570;&#x3001;&#x5B50;&#x7EC4;&#x4EF6;&#x3001;IF &#x7EC4;&#x4EF6;&#x3001;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6; &#x7B49;&#x65B9;&#x5F0F;&#x505A;&#x66F4;&#x6709;&#x62BD;&#x8C61;&#x5EA6;&#x7684;&#x6761;&#x4EF6;&#x6E32;&#x67D3;&#x3002;</li><li>&#x5728;&#x505A;&#x903B;&#x8F91;&#x62BD;&#x8C61;&#x65F6;&#xFF0C;&#x8003;&#x8651;&#x4E0B;&#x9879;&#x76EE;&#x7684;&#x590D;&#x6742;&#x5EA6;&#xFF0C;&#x907F;&#x514D;&#x56E0;&#x4E3A;&#x62BD;&#x8C61;&#x5E26;&#x6765;&#x7684;&#x6210;&#x672C;&#x589E;&#x52A0;&#xFF0C;&#x8BA9;&#x672C;&#x53EF;&#x4EE5;&#x6574;&#x4F53;&#x7406;&#x89E3;&#x7684;&#x9879;&#x76EE;&#x53D8;&#x5F97;&#x652F;&#x79BB;&#x7834;&#x788E;&#x3002;</li></ul><h2 id="articleHeader14">5 &#x66F4;&#x591A;&#x8BA8;&#x8BBA;</h2><blockquote>&#x8BA8;&#x8BBA;&#x5730;&#x5740;&#x662F;&#xFF1A;<a href="https://github.com/dt-fe/weekly/issues/90" rel="nofollow noreferrer" target="_blank">&#x7CBE;&#x8BFB;&#x300A;React &#x516B;&#x79CD;&#x6761;&#x4EF6;&#x6E32;&#x67D3;&#x300B; &#xB7; Issue #90 &#xB7; dt-fe/weekly</a></blockquote><p><strong>&#x5982;&#x679C;&#x4F60;&#x60F3;&#x53C2;&#x4E0E;&#x8BA8;&#x8BBA;&#xFF0C;&#x8BF7;<a href="https://github.com/dt-fe/weekly" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x51FB;&#x8FD9;&#x91CC;</a>&#xFF0C;&#x6BCF;&#x5468;&#x90FD;&#x6709;&#x65B0;&#x7684;&#x4E3B;&#x9898;&#xFF0C;&#x5468;&#x672B;&#x6216;&#x5468;&#x4E00;&#x53D1;&#x5E03;&#x3002;</strong></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精读《React 八种条件渲染》

## 原文链接
[https://segmentfault.com/a/1190000015317668](https://segmentfault.com/a/1190000015317668)

