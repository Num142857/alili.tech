---
title: 'React优化-JSX模板优化-标签化' 
date: 2018-11-27 2:30:13
hidden: true
slug: oskrodaordl
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">&#x4EC0;&#x4E48;&#x662F;JSX</h3><p>JSX&#x662F;JavaScrip&#x7684;&#x4E00;&#x79CD;&#x6269;&#x5C55;&#x8BED;&#x6CD5;&#xFF0C;JSX&#x7684;&#x6807;&#x7B7E;&#x8BED;&#x6CD5;&#x65E2;&#x4E0D;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x4E5F;&#x4E0D;&#x662F;HTML&#xFF1B;<br>&#x4ECE;&#x672C;&#x8D28;&#x4E0A;&#x8BB2;&#xFF0C;JSX&#x53EA;&#x662F;&#x4E3A;React.createElement(component, props, ...children)&#x51FD;&#x6570;&#x63D0;&#x4F9B;&#x7684;&#x8BED;&#x6CD5;&#x7CD6;&#x3002;</p><h4>JSX&#x7684;&#x75DB;&#x70B9;&#xFF08;&#x9879;&#x76EE;&#x5F00;&#x53D1;&#x4E2D;&#x9047;&#x5230;&#x7684;&#xFF09;</h4><p>&#x5199;jsx&#x6A21;&#x677F;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x9047;&#x5230;&#x5FAA;&#x73AF;&#x8F93;&#x51FA;&#x5B50;&#x7EC4;&#x4EF6;&#x6216;&#x8005;&#x6807;&#x7B7E;&#xFF0C;&#x9700;&#x8981;&#x901A;&#x8FC7;Array.forEach&#x6216;&#x8005;for&#x5FAA;&#x73AF;&#x8F93;&#x51FA;&#xFF1B;&#x5224;&#x65AD;&#x9009;&#x62E9;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9700;&#x8981;&#x901A;&#x8FC7;if&#x6216;&#x8005;&#x4E09;&#x5143;&#x5224;&#x65AD;&#x8F93;&#x51FA;&#xFF1B;&#x4E00;&#x4E2A;&#x6A21;&#x677F;&#x91CC;&#x9762;&#x6211;&#x4EEC;&#x4F1A;&#x5F88;&#x591A;&#x903B;&#x8F91;&#xFF0C;&#x8FD9;&#x4E9B;&#x903B;&#x8F91;&#x770B;&#x8D77;&#x6765;&#x8DDF;jsx&#x4E0D;&#x662F;&#x5F88;&#x548C;&#x8C10;&#xFF01;&#x6709;&#x6CA1;&#x6709;&#x529E;&#x6CD5;&#x505A;&#x5230;&#x6807;&#x7B7E;&#x5316;&#xFF0C;&#x8DDF;jsx&#x8BED;&#x6CD5;&#x4E00;&#x81F4;&#x5C3C;&#xFF1F;</p><h3 id="articleHeader1">jsx-control-statements&#x4ECB;&#x7ECD;</h3><p>&#x5B89;&#x88C5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev babel-plugin-jsx-control-statements" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">npm install --save-dev babel-plugin-jsx-control-statements</code></pre><p>&#x914D;&#x7F6E;<strong>.babelrc</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  ...
  &quot;plugins&quot;: [&quot;jsx-control-statements&quot;]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">{
  ...
  <span class="hljs-string">&quot;plugins&quot;</span>: [<span class="hljs-string">&quot;jsx-control-statements&quot;</span>]
}</code></pre><h3 id="articleHeader2">jsx-control-statements&#x8BED;&#x6CD5;</h3><p><strong>If&#xFF08;&#x4F46;&#x662F;&#x76EE;&#x524D;&#x4E0D;&#x652F;&#x6301;Else&#xFF0C;&#x8FD9;&#x4E5F;&#x662F;&#x53EF;&#x60DC;&#x7684;&#xFF09;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7B80;&#x5355;&#x4F8B;&#x5B50;
&lt;If condition={ true }&gt;
  &lt;span&gt;IfBlock&lt;/span&gt;
&lt;/If&gt;

// &#x4F7F;&#x7528;&#x591A;&#x4E2A;&#x5B50;&#x5143;&#x7D20;&#x6216;&#x8005;&#x8868;&#x8FBE;&#x5F0F;
&lt;If condition={ true }&gt;
  one
  { &quot;two&quot; }
  &lt;span&gt;three&lt;/span&gt;
  &lt;span&gt;four&lt;/span&gt;
&lt;/If&gt;

// &#x8F6C;&#x5316;&#x524D;
&lt;If condition={ test }&gt;
  &lt;span&gt;Truth&lt;/span&gt;
&lt;/If&gt;

// &#x8F6C;&#x5316;&#x540E;
{ test ? &lt;span&gt;Truth&lt;/span&gt; : null }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code><span class="hljs-comment">// &#x7B80;&#x5355;&#x4F8B;&#x5B50;</span>
<span class="hljs-params">&lt;If condition={ true }&gt;</span>
  <span class="hljs-params">&lt;span&gt;</span>IfBlock<span class="hljs-params">&lt;/span&gt;</span>
<span class="hljs-params">&lt;/If&gt;</span>

<span class="hljs-comment">// &#x4F7F;&#x7528;&#x591A;&#x4E2A;&#x5B50;&#x5143;&#x7D20;&#x6216;&#x8005;&#x8868;&#x8FBE;&#x5F0F;</span>
<span class="hljs-params">&lt;If condition={ true }&gt;</span>
  one
  { <span class="hljs-string">&quot;two&quot;</span> }
  <span class="hljs-params">&lt;span&gt;</span>three<span class="hljs-params">&lt;/span&gt;</span>
  <span class="hljs-params">&lt;span&gt;</span>four<span class="hljs-params">&lt;/span&gt;</span>
<span class="hljs-params">&lt;/If&gt;</span>

<span class="hljs-comment">// &#x8F6C;&#x5316;&#x524D;</span>
<span class="hljs-params">&lt;If condition={ test }&gt;</span>
  <span class="hljs-params">&lt;span&gt;</span>Truth<span class="hljs-params">&lt;/span&gt;</span>
<span class="hljs-params">&lt;/If&gt;</span>

<span class="hljs-comment">// &#x8F6C;&#x5316;&#x540E;</span>
{ test ? <span class="hljs-params">&lt;span&gt;</span>Truth<span class="hljs-params">&lt;/span&gt;</span> : null }</code></pre><p><strong>Choose&#x3001;When&#x3001;Otherwise&#xFF08; &#x76F8;&#x5F53;&#x4E8E;switch case defualt&#xFF09;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x8F6C;&#x5316;&#x524D;
&lt;Choose&gt;
  &lt;When condition={ test1 }&gt;
    &lt;span&gt;IfBlock1&lt;/span&gt;
  &lt;/When&gt;
  &lt;When condition={ test2 }&gt;
    &lt;span&gt;IfBlock2&lt;/span&gt;
  &lt;/When&gt;
  &lt;Otherwise&gt;
    &lt;span&gt;ElseBlock&lt;/span&gt;
  &lt;/Otherwise&gt;
&lt;/Choose&gt;

// &#x8F6C;&#x5316;&#x540E;
{ test1 ? &lt;span&gt;IfBlock1&lt;/span&gt; : test2 ? &lt;span&gt;IfBlock2&lt;/span&gt; : &lt;span&gt;ElseBlock&lt;/span&gt; }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>// &#x8F6C;&#x5316;&#x524D;
<span class="hljs-tag">&lt;<span class="hljs-name">Choose</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">When</span> <span class="hljs-attr">condition</span>=<span class="hljs-string">{</span> <span class="hljs-attr">test1</span> }&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>IfBlock1<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">When</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">When</span> <span class="hljs-attr">condition</span>=<span class="hljs-string">{</span> <span class="hljs-attr">test2</span> }&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>IfBlock2<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">When</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Otherwise</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>ElseBlock<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Otherwise</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Choose</span>&gt;</span>

// &#x8F6C;&#x5316;&#x540E;
{ test1 ? <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>IfBlock1<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> : test2 ? <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>IfBlock2<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> : <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>ElseBlock<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> }</code></pre><p><strong>For</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5FAA;&#x73AF;&#x8F93;&#x51FA;&#x7684;&#x65F6;&#x5019;&#x5FC5;&#x987B;&#x63D0;&#x4F9B;key
&lt;For each=&quot;item&quot; of={ this.props.items }&gt;
    &lt;span key={ item.id }&gt;{ item.title }&lt;/span&gt;
&lt;/For&gt;

// &#x5982;&#x679C;&#x6570;&#x7EC4;&#x6539;&#x53D8;&#xFF0C;&#x5219;&#x4F7F;&#x7528;&#x7D22;&#x5F15;&#x4F5C;&#x4E3A;&#x952E;&#x5C5E;&#x6027;&#x662F;&#x4E0D;&#x7A33;&#x5B9A;&#x7684;
&lt;For each=&quot;item&quot; index=&quot;idx&quot; of={ [1,2,3] }&gt;
    &lt;span key={ idx }&gt;{ item }&lt;/span&gt;
    &lt;span key={ idx + &apos;_2&apos; }&gt;Static Text&lt;/span&gt;
&lt;/For&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml">// &#x5FAA;&#x73AF;&#x8F93;&#x51FA;&#x7684;&#x65F6;&#x5019;&#x5FC5;&#x987B;&#x63D0;&#x4F9B;key
<span class="hljs-tag">&lt;<span class="hljs-name">For</span> <span class="hljs-attr">each</span>=<span class="hljs-string">&quot;item&quot;</span> <span class="hljs-attr">of</span>=</span></span><span class="hljs-template-variable">{ this.props.items }</span><span class="xml"><span class="hljs-tag">&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">key</span>=</span></span><span class="hljs-template-variable">{ item.id }</span><span class="xml"><span class="hljs-tag">&gt;</span></span><span class="hljs-template-variable">{ item.title }</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">For</span>&gt;</span>

// &#x5982;&#x679C;&#x6570;&#x7EC4;&#x6539;&#x53D8;&#xFF0C;&#x5219;&#x4F7F;&#x7528;&#x7D22;&#x5F15;&#x4F5C;&#x4E3A;&#x952E;&#x5C5E;&#x6027;&#x662F;&#x4E0D;&#x7A33;&#x5B9A;&#x7684;
<span class="hljs-tag">&lt;<span class="hljs-name">For</span> <span class="hljs-attr">each</span>=<span class="hljs-string">&quot;item&quot;</span> <span class="hljs-attr">index</span>=<span class="hljs-string">&quot;idx&quot;</span> <span class="hljs-attr">of</span>=</span></span><span class="hljs-template-variable">{ [1,2,3] }</span><span class="xml"><span class="hljs-tag">&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">key</span>=</span></span><span class="hljs-template-variable">{ idx }</span><span class="xml"><span class="hljs-tag">&gt;</span></span><span class="hljs-template-variable">{ item }</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">key</span>=</span></span><span class="hljs-template-variable">{ idx + &apos;_2&apos; }</span><span class="xml"><span class="hljs-tag">&gt;</span>Static Text<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">For</span>&gt;</span></span></code></pre><h3 id="articleHeader3">&#x53C2;&#x8003;</h3><p><a href="https://github.com/AlexGilleran/jsx-control-statements" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/AlexGilleran/jsx-control-statements" rel="nofollow noreferrer" target="_blank">https://github.com/AlexGiller...</a><br><a href="http://www.css88.com/react/docs/introducing-jsx.html" rel="nofollow noreferrer" target="_blank">JSX &#x4ECB;&#x7ECD;</a><br><a href="http://www.css88.com/react/docs/jsx-in-depth.html" rel="nofollow noreferrer" target="_blank">JSX &#x6DF1;&#x5165;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React优化-JSX模板优化-标签化

## 原文链接
[https://segmentfault.com/a/1190000015325818](https://segmentfault.com/a/1190000015325818)

