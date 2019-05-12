---
title: 'ES6 系列之箭头函数' 
date: 2018-11-29 9:27:38
hidden: true
slug: 2fggbw88gwo
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">&#x56DE;&#x987E;</h2>
<p>&#x6211;&#x4EEC;&#x5148;&#x6765;&#x56DE;&#x987E;&#x4E0B;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;&#x57FA;&#x672C;&#x8BED;&#x6CD5;&#x3002;</p>
<p>ES6 &#x589E;&#x52A0;&#x4E86;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let func = value =&gt; value;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> func = <span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> value;</code></pre>
<p>&#x76F8;&#x5F53;&#x4E8E;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let func = function (value) {
    return value;
};" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> func = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">return</span> value;
};</code></pre>
<p>&#x5982;&#x679C;&#x9700;&#x8981;&#x7ED9;&#x51FD;&#x6570;&#x4F20;&#x5165;&#x591A;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let func = (value, num) =&gt; value * num;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> func = <span class="hljs-function">(<span class="hljs-params">value, num</span>) =&gt;</span> value * num;</code></pre>
<p>&#x5982;&#x679C;&#x51FD;&#x6570;&#x7684;&#x4EE3;&#x7801;&#x5757;&#x9700;&#x8981;&#x591A;&#x6761;&#x8BED;&#x53E5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let func = (value, num) =&gt; {
    return value * num
};" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> func = <span class="hljs-function">(<span class="hljs-params">value, num</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> value * num
};</code></pre>
<p>&#x5982;&#x679C;&#x9700;&#x8981;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let func = (value, num) =&gt; ({total: value * num});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> func = <span class="hljs-function">(<span class="hljs-params">value, num</span>) =&gt;</span> ({<span class="hljs-attr">total</span>: value * num});</code></pre>
<p>&#x4E0E;&#x53D8;&#x91CF;&#x89E3;&#x6784;&#x7ED3;&#x5408;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let func = ({value, num}) =&gt; ({total: value * num})

// &#x4F7F;&#x7528;
var result = func({
    value: 10,
    num: 10
})

console.log(result); // {total: 100}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> func = <span class="hljs-function">(<span class="hljs-params">{value, num}</span>) =&gt;</span> ({<span class="hljs-attr">total</span>: value * num})

<span class="hljs-comment">// &#x4F7F;&#x7528;</span>
<span class="hljs-keyword">var</span> result = func({
    <span class="hljs-attr">value</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">num</span>: <span class="hljs-number">10</span>
})

<span class="hljs-built_in">console</span>.log(result); <span class="hljs-comment">// {total: 100}</span></code></pre>
<p>&#x5F88;&#x591A;&#x65F6;&#x5019;&#xFF0C;&#x4F60;&#x53EF;&#x80FD;&#x60F3;&#x4E0D;&#x5230;&#x8981;&#x8FD9;&#x6837;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x518D;&#x6765;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x6BD4;&#x5982;&#x5728; React &#x4E0E; Immutable &#x7684;&#x6280;&#x672F;&#x9009;&#x578B;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5904;&#x7406;&#x4E00;&#x4E2A;&#x4E8B;&#x4EF6;&#x4F1A;&#x8FD9;&#x6837;&#x505A;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleEvent = () =&gt; {
  this.setState({
    data: this.state.data.set(&quot;key&quot;, &quot;value&quot;)
  })
};" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">handleEvent = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">this</span>.setState({
    <span class="hljs-attr">data</span>: <span class="hljs-keyword">this</span>.state.data.set(<span class="hljs-string">&quot;key&quot;</span>, <span class="hljs-string">&quot;value&quot;</span>)
  })
};</code></pre>
<p>&#x5176;&#x5B9E;&#x5C31;&#x53EF;&#x4EE5;&#x7B80;&#x5316;&#x4E3A;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleEvent = () =&gt; {
  this.setState(({data}) =&gt; ({
    data: data.set(&quot;key&quot;, &quot;value&quot;)
  }))
};" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">handleEvent = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">this</span>.setState(<span class="hljs-function">(<span class="hljs-params">{data}</span>) =&gt;</span> ({
    <span class="hljs-attr">data</span>: data.set(<span class="hljs-string">&quot;key&quot;</span>, <span class="hljs-string">&quot;value&quot;</span>)
  }))
};</code></pre>
<h2 id="articleHeader1">&#x6BD4;&#x8F83;</h2>
<p>&#x672C;&#x7BC7;&#x6211;&#x4EEC;&#x91CD;&#x70B9;&#x6BD4;&#x8F83;&#x4E00;&#x4E0B;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4E0E;&#x666E;&#x901A;&#x51FD;&#x6570;&#x3002;</p>
<p>&#x4E3B;&#x8981;&#x533A;&#x522B;&#x5305;&#x62EC;&#xFF1A;</p>
<h3 id="articleHeader2">1.&#x6CA1;&#x6709; this</h3>
<p><strong>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6CA1;&#x6709; this&#xFF0C;&#x6240;&#x4EE5;&#x9700;&#x8981;&#x901A;&#x8FC7;&#x67E5;&#x627E;&#x4F5C;&#x7528;&#x57DF;&#x94FE;&#x6765;&#x786E;&#x5B9A; this &#x7684;&#x503C;&#x3002;</strong></p>
<p>&#x8FD9;&#x5C31;&#x610F;&#x5473;&#x7740;&#x5982;&#x679C;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x88AB;&#x975E;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x5305;&#x542B;&#xFF0C;this &#x7ED1;&#x5B9A;&#x7684;&#x5C31;&#x662F;&#x6700;&#x8FD1;&#x4E00;&#x5C42;&#x975E;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684; this&#x3002;</p>
<p>&#x6A21;&#x62DF;&#x4E00;&#x4E2A;&#x5B9E;&#x9645;&#x5F00;&#x53D1;&#x4E2D;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p>
<p>&#x6211;&#x4EEC;&#x7684;&#x9700;&#x6C42;&#x662F;&#x70B9;&#x51FB;&#x4E00;&#x4E2A;&#x6309;&#x94AE;&#xFF0C;&#x6539;&#x53D8;&#x8BE5;&#x6309;&#x94AE;&#x7684;&#x80CC;&#x666F;&#x8272;&#x3002;</p>
<p>&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x5F00;&#x53D1;&#xFF0C;&#x6211;&#x4EEC;&#x62BD;&#x79BB;&#x4E00;&#x4E2A; Button &#x7EC4;&#x4EF6;&#xFF0C;&#x5F53;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x76F4;&#x63A5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4F20;&#x5165;&#x5143;&#x7D20; id &#x503C;&#x5373;&#x53EF;&#x7ED1;&#x5B9A;&#x8BE5;&#x5143;&#x7D20;&#x70B9;&#x51FB;&#x65F6;&#x6539;&#x53D8;&#x80CC;&#x666F;&#x8272;&#x7684;&#x4E8B;&#x4EF6;
new Button(&quot;button&quot;)" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x4F20;&#x5165;&#x5143;&#x7D20; id &#x503C;&#x5373;&#x53EF;&#x7ED1;&#x5B9A;&#x8BE5;&#x5143;&#x7D20;&#x70B9;&#x51FB;&#x65F6;&#x6539;&#x53D8;&#x80CC;&#x666F;&#x8272;&#x7684;&#x4E8B;&#x4EF6;</span>
<span class="hljs-keyword">new</span> Button(<span class="hljs-string">&quot;button&quot;</span>)</code></pre>
<p>HTML &#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;button id=&quot;button&quot;&gt;&#x70B9;&#x51FB;&#x53D8;&#x8272;&lt;/button&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;button&quot;</span>&gt;</span>&#x70B9;&#x51FB;&#x53D8;&#x8272;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<p>JavaScript &#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Button(id) {
    this.element = document.querySelector(&quot;#&quot; + id);
    this.bindEvent();
}

Button.prototype.bindEvent = function() {
    this.element.addEventListener(&quot;click&quot;, this.setBgColor, false);
};

Button.prototype.setBgColor = function() {
    this.element.style.backgroundColor = &apos;#1abc9c&apos;
};

var button = new Button(&quot;button&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Button</span>(<span class="hljs-params">id</span>) </span>{
    <span class="hljs-keyword">this</span>.element = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&quot;#&quot;</span> + id);
    <span class="hljs-keyword">this</span>.bindEvent();
}

Button.prototype.bindEvent = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.element.addEventListener(<span class="hljs-string">&quot;click&quot;</span>, <span class="hljs-keyword">this</span>.setBgColor, <span class="hljs-literal">false</span>);
};

Button.prototype.setBgColor = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.element.style.backgroundColor = <span class="hljs-string">&apos;#1abc9c&apos;</span>
};

<span class="hljs-keyword">var</span> button = <span class="hljs-keyword">new</span> Button(<span class="hljs-string">&quot;button&quot;</span>);</code></pre>
<p>&#x770B;&#x7740;&#x597D;&#x50CF;&#x6CA1;&#x6709;&#x95EE;&#x9898;&#xFF0C;&#x7ED3;&#x679C;&#x5374;&#x662F;&#x62A5;&#x9519; <code>Uncaught TypeError: Cannot read property &apos;style&apos; of undefined</code></p>
<p>&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x5F53;&#x4F7F;&#x7528; addEventListener() &#x4E3A;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x6CE8;&#x518C;&#x4E8B;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E8B;&#x4EF6;&#x51FD;&#x6570;&#x91CC;&#x7684; this &#x503C;&#x662F;&#x8BE5;&#x5143;&#x7D20;&#x7684;&#x5F15;&#x7528;&#x3002;</p>
<p>&#x6240;&#x4EE5;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x5728; setBgColor &#x4E2D; <code>console.log(this)</code>&#xFF0C;this &#x6307;&#x5411;&#x7684;&#x662F;&#x6309;&#x94AE;&#x5143;&#x7D20;&#xFF0C;&#x90A3; this.element &#x5C31;&#x662F; undefined&#xFF0C;&#x62A5;&#x9519;&#x81EA;&#x7136;&#x5C31;&#x7406;&#x6240;&#x5F53;&#x7136;&#x4E86;&#x3002;</p>
<p>&#x4E5F;&#x8BB8;&#x4F60;&#x4F1A;&#x95EE;&#xFF0C;&#x65E2;&#x7136; this &#x90FD;&#x6307;&#x5411;&#x4E86;&#x6309;&#x94AE;&#x5143;&#x7D20;&#xFF0C;&#x90A3;&#x6211;&#x4EEC;&#x76F4;&#x63A5;&#x4FEE;&#x6539; setBgColor &#x51FD;&#x6570;&#x4E3A;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Button.prototype.setBgColor = function() {
    this.style.backgroundColor = &apos;#1abc9c&apos;
};" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Button.prototype.setBgColor = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.style.backgroundColor = <span class="hljs-string">&apos;#1abc9c&apos;</span>
};</code></pre>
<p>&#x4E0D;&#x5C31;&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x4E86;&#xFF1F;</p>
<p>&#x786E;&#x5B9E;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x505A;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x5B9E;&#x9645;&#x7684;&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x80FD;&#x4F1A;&#x5728; setBgColor &#x4E2D;&#x8FD8;&#x8C03;&#x7528;&#x5176;&#x4ED6;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x6BD4;&#x5982;&#x5199;&#x6210;&#x8FD9;&#x79CD;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Button.prototype.setBgColor = function() {
    this.setElementColor();
    this.setOtherElementColor();
};" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Button.prototype.setBgColor = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.setElementColor();
    <span class="hljs-keyword">this</span>.setOtherElementColor();
};</code></pre>
<p>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x8FD8;&#x662F;&#x5E0C;&#x671B; setBgColor &#x4E2D;&#x7684; this &#x662F;&#x6307;&#x5411;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x7684;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x8C03;&#x7528;&#x5176;&#x4ED6;&#x7684;&#x51FD;&#x6570;&#x3002;</p>
<p>&#x5229;&#x7528; ES5&#xFF0C;&#x6211;&#x4EEC;&#x4E00;&#x822C;&#x4F1A;&#x8FD9;&#x6837;&#x505A;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Button.prototype.bindEvent = function() {
    this.element.addEventListener(&quot;click&quot;, this.setBgColor.bind(this), false);
};" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Button.prototype.bindEvent = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.element.addEventListener(<span class="hljs-string">&quot;click&quot;</span>, <span class="hljs-keyword">this</span>.setBgColor.bind(<span class="hljs-keyword">this</span>), <span class="hljs-literal">false</span>);
};</code></pre>
<p>&#x4E3A;&#x907F;&#x514D; addEventListener &#x7684;&#x5F71;&#x54CD;&#xFF0C;&#x4F7F;&#x7528; bind &#x5F3A;&#x5236;&#x7ED1;&#x5B9A; setBgColor() &#x7684; this &#x4E3A;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;</p>
<p>&#x4F7F;&#x7528; ES6&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x66F4;&#x597D;&#x7684;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Button.prototype.bindEvent = function() {
    this.element.addEventListener(&quot;click&quot;, event =&gt; this.setBgColor(event), false);
};" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Button.prototype.bindEvent = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.element.addEventListener(<span class="hljs-string">&quot;click&quot;</span>, event =&gt; <span class="hljs-keyword">this</span>.setBgColor(event), <span class="hljs-literal">false</span>);
};</code></pre>
<p>&#x7531;&#x4E8E;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6CA1;&#x6709; this&#xFF0C;&#x6240;&#x4EE5;&#x4F1A;&#x5411;&#x5916;&#x5C42;&#x67E5;&#x627E; this &#x7684;&#x503C;&#xFF0C;&#x5373; bindEvent &#x4E2D;&#x7684; this&#xFF0C;&#x6B64;&#x65F6; this &#x6307;&#x5411;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x6B63;&#x786E;&#x7684;&#x8C03;&#x7528; this.setBgColor &#x65B9;&#x6CD5;&#xFF0C; &#x800C; this.setBgColor &#x4E2D;&#x7684; this &#x4E5F;&#x4F1A;&#x6B63;&#x786E;&#x6307;&#x5411;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x3002;</p>
<p>&#x5728;&#x8FD9;&#x91CC;&#x518D;&#x989D;&#x5916;&#x63D0;&#x4E00;&#x70B9;&#xFF0C;&#x5C31;&#x662F;&#x6CE8;&#x610F; bindEvent &#x548C;  setBgColor &#x5728;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x7684;&#x662F;&#x666E;&#x901A;&#x51FD;&#x6570;&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x800C;&#x975E;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x6539;&#x6210;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;&#x51FD;&#x6570;&#x91CC;&#x7684; this &#x6307;&#x5411; window &#x5BF9;&#x8C61; (&#x975E;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;)&#x3002;</p>
<p>&#x6700;&#x540E;&#xFF0C;&#x56E0;&#x4E3A;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6CA1;&#x6709; this&#xFF0C;&#x6240;&#x4EE5;&#x4E5F;&#x4E0D;&#x80FD;&#x7528; call()&#x3001;apply()&#x3001;bind() &#x8FD9;&#x4E9B;&#x65B9;&#x6CD5;&#x6539;&#x53D8; this &#x7684;&#x6307;&#x5411;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var value = 1;
var result = (() =&gt; this.value).bind({value: 2})();
console.log(result); // 1" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> value = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> result = <span class="hljs-function">(<span class="hljs-params">(</span>) =&gt;</span> <span class="hljs-keyword">this</span>.value).bind({<span class="hljs-attr">value</span>: <span class="hljs-number">2</span>})();
<span class="hljs-built_in">console</span>.log(result); <span class="hljs-comment">// 1</span></code></pre>
<h3 id="articleHeader3">2. &#x6CA1;&#x6709; arguments</h3>
<p>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x81EA;&#x5DF1;&#x7684; arguments &#x5BF9;&#x8C61;&#xFF0C;&#x8FD9;&#x4E0D;&#x4E00;&#x5B9A;&#x662F;&#x4EF6;&#x574F;&#x4E8B;&#xFF0C;&#x56E0;&#x4E3A;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5916;&#x56F4;&#x51FD;&#x6570;&#x7684; arguments &#x5BF9;&#x8C61;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function constant() {
    return () =&gt; arguments[0]
}

var result = constant(1);
console.log(result()); // 1" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">constant</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]
}

<span class="hljs-keyword">var</span> result = constant(<span class="hljs-number">1</span>);
<span class="hljs-built_in">console</span>.log(result()); <span class="hljs-comment">// 1</span></code></pre>
<p>&#x90A3;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x5C31;&#x662F;&#x8981;&#x8BBF;&#x95EE;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x5462;&#xFF1F;</p>
<p>&#x4F60;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x547D;&#x540D;&#x53C2;&#x6570;&#x6216;&#x8005; rest &#x53C2;&#x6570;&#x7684;&#x5F62;&#x5F0F;&#x8BBF;&#x95EE;&#x53C2;&#x6570;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let nums = (...nums) =&gt; nums;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> nums = <span class="hljs-function">(<span class="hljs-params">...nums</span>) =&gt;</span> nums;</code></pre>
<h3 id="articleHeader4">3. &#x4E0D;&#x80FD;&#x901A;&#x8FC7; new &#x5173;&#x952E;&#x5B57;&#x8C03;&#x7528;</h3>
<p>JavaScript &#x51FD;&#x6570;&#x6709;&#x4E24;&#x4E2A;&#x5185;&#x90E8;&#x65B9;&#x6CD5;&#xFF1A;[[Call]] &#x548C; [[Construct]]&#x3002;</p>
<p>&#x5F53;&#x901A;&#x8FC7; new &#x8C03;&#x7528;&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x6267;&#x884C; [[Construct]] &#x65B9;&#x6CD5;&#xFF0C;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x6267;&#x884C;&#x51FD;&#x6570;&#x4F53;&#xFF0C;&#x5C06; this &#x7ED1;&#x5B9A;&#x5230;&#x5B9E;&#x4F8B;&#x4E0A;&#x3002;</p>
<p>&#x5F53;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6267;&#x884C; [[Call]] &#x65B9;&#x6CD5;&#xFF0C;&#x76F4;&#x63A5;&#x6267;&#x884C;&#x51FD;&#x6570;&#x4F53;&#x3002;</p>
<p>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x5E76;&#x6CA1;&#x6709; [[Construct]] &#x65B9;&#x6CD5;&#xFF0C;&#x4E0D;&#x80FD;&#x88AB;&#x7528;&#x4F5C;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x5982;&#x679C;&#x901A;&#x8FC7; new &#x7684;&#x65B9;&#x5F0F;&#x8C03;&#x7528;&#xFF0C;&#x4F1A;&#x62A5;&#x9519;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Foo = () =&gt; {};
var foo = new Foo(); // TypeError: Foo is not a constructor" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Foo = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {};
<span class="hljs-keyword">var</span> foo = <span class="hljs-keyword">new</span> Foo(); <span class="hljs-comment">// TypeError: Foo is not a constructor</span></code></pre>
<h3 id="articleHeader5">4. &#x6CA1;&#x6709; new.target</h3>
<p>&#x56E0;&#x4E3A;&#x4E0D;&#x80FD;&#x4F7F;&#x7528; new &#x8C03;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x4E5F;&#x6CA1;&#x6709; new.target &#x503C;&#x3002;</p>
<p>&#x5173;&#x4E8E; new.target&#xFF0C;&#x53EF;&#x4EE5;&#x53C2;&#x8003; <a href="http://es6.ruanyifeng.com/#docs/class#new-target-%E5%B1%9E%E6%80%A7" rel="nofollow noreferrer" target="_blank">http://es6.ruanyifeng.com/#docs/class#new-target-%E5%B1%9E%E6%80%A7</a></p>
<h3 id="articleHeader6">5. &#x6CA1;&#x6709;&#x539F;&#x578B;</h3>
<p>&#x7531;&#x4E8E;&#x4E0D;&#x80FD;&#x4F7F;&#x7528; new &#x8C03;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;&#x6240;&#x4EE5;&#x4E5F;&#x6CA1;&#x6709;&#x6784;&#x5EFA;&#x539F;&#x578B;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x4E8E;&#x662F;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4E5F;&#x4E0D;&#x5B58;&#x5728; prototype &#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Foo = () =&gt; {};
console.log(Foo.prototype); // undefined" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Foo = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {};
<span class="hljs-built_in">console</span>.log(Foo.prototype); <span class="hljs-comment">// undefined</span></code></pre>
<h3 id="articleHeader7">6. &#x6CA1;&#x6709; super</h3>
<p>&#x8FDE;&#x539F;&#x578B;&#x90FD;&#x6CA1;&#x6709;&#xFF0C;&#x81EA;&#x7136;&#x4E5F;&#x4E0D;&#x80FD;&#x901A;&#x8FC7; super &#x6765;&#x8BBF;&#x95EE;&#x539F;&#x578B;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x6240;&#x4EE5;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4E5F;&#x662F;&#x6CA1;&#x6709; super &#x7684;&#xFF0C;&#x4E0D;&#x8FC7;&#x8DDF; this&#x3001;arguments&#x3001;new.target &#x4E00;&#x6837;&#xFF0C;&#x8FD9;&#x4E9B;&#x503C;&#x7531;&#x5916;&#x56F4;&#x6700;&#x8FD1;&#x4E00;&#x5C42;&#x975E;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x51B3;&#x5B9A;&#x3002;</p>
<h2 id="articleHeader8">&#x603B;&#x7ED3;</h2>
<p>&#x6700;&#x540E;&#xFF0C;&#x5173;&#x4E8E;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;&#x5F15;&#x7528; MDN &#x7684;&#x4ECB;&#x7ECD;&#x5C31;&#x662F;&#xFF1A;</p>
<blockquote>An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target. These function expressions are best suited for non-method functions, and they cannot be used as constructors.</blockquote>
<p>&#x7FFB;&#x8BD1;&#x8FC7;&#x6765;&#x5C31;&#x662F;&#xFF1A;</p>
<p>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x8BED;&#x6CD5;&#x6BD4;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x66F4;&#x77ED;&#xFF0C;&#x5E76;&#x4E14;&#x4E0D;&#x7ED1;&#x5B9A;&#x81EA;&#x5DF1;&#x7684;this&#xFF0C;arguments&#xFF0C;super&#x6216; new.target&#x3002;&#x8FD9;&#x4E9B;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x6700;&#x9002;&#x5408;&#x7528;&#x4E8E;&#x975E;&#x65B9;&#x6CD5;&#x51FD;&#x6570;(non-method functions)&#xFF0C;&#x5E76;&#x4E14;&#x5B83;&#x4EEC;&#x4E0D;&#x80FD;&#x7528;&#x4F5C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;</p>
<p>&#x90A3;&#x4E48;&#x4EC0;&#x4E48;&#x662F; non-method functions &#x5462;&#xFF1F;</p>
<p>&#x6211;&#x4EEC;&#x5148;&#x6765;&#x770B;&#x770B; method &#x7684;&#x5B9A;&#x4E49;&#xFF1A;</p>
<blockquote>A method is a function which is a property of an object.</blockquote>
<p>&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x4E2D;&#x7684;&#x51FD;&#x6570;&#x5C31;&#x88AB;&#x79F0;&#x4E4B;&#x4E3A; method&#xFF0C;&#x90A3;&#x4E48; non-mehtod &#x5C31;&#x662F;&#x6307;&#x4E0D;&#x88AB;&#x7528;&#x4F5C;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x4E2D;&#x7684;&#x51FD;&#x6570;&#x4E86;&#xFF0C;&#x53EF;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#x8BF4;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x66F4;&#x9002;&#x5408; non-method &#x5462;&#xFF1F;</p>
<p>&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#x5C31;&#x660E;&#x767D;&#x4E86;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
  i: 10,
  b: () =&gt; console.log(this.i, this),
  c: function() {
    console.log( this.i, this)
  }
}
obj.b();
// undefined Window
obj.c();
// 10, Object {...}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">i</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">b</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.i, <span class="hljs-keyword">this</span>),
  <span class="hljs-attr">c</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.i, <span class="hljs-keyword">this</span>)
  }
}
obj.b();
<span class="hljs-comment">// undefined Window</span>
obj.c();
<span class="hljs-comment">// 10, Object {...}</span></code></pre>
<h2 id="articleHeader9">&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;</h2>
<p>&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;&#x7684;&#x5F62;&#x5F0F;&#x4E3A;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
    console.log(1)
})()" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
})()</code></pre>
<p>&#x6216;&#x8005;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
    console.log(1)
}())" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
}())</code></pre>
<p>&#x5229;&#x7528;&#x7BAD;&#x5934;&#x7B80;&#x5316;&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;&#x7684;&#x5199;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(() =&gt; {
    console.log(1)
})()" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
})()</code></pre>
<p>&#x4F46;&#x662F;&#x6CE8;&#x610F;&#xFF1A;&#x4F7F;&#x7528;&#x4EE5;&#x4E0B;&#x8FD9;&#x79CD;&#x5199;&#x6CD5;&#x5374;&#x4F1A;&#x62A5;&#x9519;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(() =&gt; {
    console.log(1)
}())" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
}())</code></pre>
<p>&#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x62A5;&#x9519;&#x5462;&#xFF1F;&#x563F;&#x563F;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x77E5;&#x9053;&#xFF0C;&#x53EF;&#x4EE5;&#x544A;&#x8BC9;&#x6211;~</p>
<h2 id="articleHeader10">ES6 &#x7CFB;&#x5217;</h2>
<p>ES6 &#x7CFB;&#x5217;&#x76EE;&#x5F55;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a></p>
<p>ES6 &#x7CFB;&#x5217;&#x9884;&#x8BA1;&#x5199;&#x4E8C;&#x5341;&#x7BC7;&#x5DE6;&#x53F3;&#xFF0C;&#x65E8;&#x5728;&#x52A0;&#x6DF1; ES6 &#x90E8;&#x5206;&#x77E5;&#x8BC6;&#x70B9;&#x7684;&#x7406;&#x89E3;&#xFF0C;&#x91CD;&#x70B9;&#x8BB2;&#x89E3;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x3001;&#x6807;&#x7B7E;&#x6A21;&#x677F;&#x3001;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x3001;Symbol&#x3001;Set&#x3001;Map &#x4EE5;&#x53CA; Promise &#x7684;&#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x3001;&#x6A21;&#x5757;&#x52A0;&#x8F7D;&#x65B9;&#x6848;&#x3001;&#x5F02;&#x6B65;&#x5904;&#x7406;&#x7B49;&#x5185;&#x5BB9;&#x3002;</p>
<p>&#x5982;&#x679C;&#x6709;&#x9519;&#x8BEF;&#x6216;&#x8005;&#x4E0D;&#x4E25;&#x8C28;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x8BF7;&#x52A1;&#x5FC5;&#x7ED9;&#x4E88;&#x6307;&#x6B63;&#xFF0C;&#x5341;&#x5206;&#x611F;&#x8C22;&#x3002;&#x5982;&#x679C;&#x559C;&#x6B22;&#x6216;&#x8005;&#x6709;&#x6240;&#x542F;&#x53D1;&#xFF0C;&#x6B22;&#x8FCE; star&#xFF0C;&#x5BF9;&#x4F5C;&#x8005;&#x4E5F;&#x662F;&#x4E00;&#x79CD;&#x9F13;&#x52B1;&#x3002;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 系列之箭头函数

## 原文链接
[https://segmentfault.com/a/1190000015162781](https://segmentfault.com/a/1190000015162781)

