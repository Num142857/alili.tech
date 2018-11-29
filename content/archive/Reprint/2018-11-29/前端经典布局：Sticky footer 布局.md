---
title: '前端经典布局：Sticky footer 布局' 
date: 2018-11-29 9:27:39
hidden: true
slug: rcn1w4f7fpe
categories: [reprint]
---

{{< raw >}}

                    
<p>&#x4EC0;&#x4E48;&#x662F;<strong>Sticky footer</strong>&#x5E03;&#x5C40;&#xFF1F;<br>&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x4E2D;&#x5927;&#x90E8;&#x5206;&#x7F51;&#x7AD9;&#xFF0C;&#x90FD;&#x4F1A;&#x628A;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x5206;&#x4E3A;&#x5934;&#x90E8;&#x533A;&#x5757;&#x3001;&#x5185;&#x5BB9;&#x533A;&#x5757;&#x3001;&#x9875;&#x811A;&#x533A;&#x5757;&#xFF0C;&#x8FD9;&#x4E5F;&#x662F;&#x6BD4;&#x8F83;&#x3002;&#x5F80;&#x5F80;&#x5E95;&#x90E8;&#x90FD;&#x8981;&#x6C42;&#x80FD;&#x56FA;&#x5B9A;&#x5728;&#x5C4F;&#x5E55;&#x7684;&#x5E95;&#x90E8;&#xFF0C;&#x800C;&#x975E;&#x968F;&#x7740;&#x6587;&#x6863;&#x6D41;&#x6392;&#x5E03;&#x3002;&#x8981;&#x5B9E;&#x73B0;&#x7684;&#x6837;&#x5F0F;&#x53EF;&#x4EE5;&#x6982;&#x62EC;&#x5982;&#x4E0B;&#xFF1A;&#x5982;&#x679C;&#x9875;&#x9762;&#x5185;&#x5BB9;&#x4E0D;&#x591F;&#x957F;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9875;&#x811A;&#x533A;&#x5757;&#x5728;&#x5C4F;&#x5E55;&#x7684;&#x5E95;&#x90E8;&#xFF1B;&#x5982;&#x679C;&#x5185;&#x5BB9;&#x8DB3;&#x591F;&#x957F;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9875;&#x811A;&#x533A;&#x5757;&#x4F1A;&#x88AB;&#x5185;&#x5BB9;&#x5411;&#x4E0B;&#x63A8;&#x9001;&#x3002;&#x53EF;&#x4EE5;&#x4EE5;&#x4E0B;&#x56FE;&#x5C55;&#x793A;<strong>Sticky footer</strong>&#x5B9E;&#x73B0;&#x7684;&#x6548;&#x679C;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbbCoa?w=431&amp;h=641" src="https://static.alili.tech/img/bVbbCoa?w=431&amp;h=641" alt="&#x5728;&#x6B63;&#x5E38;&#x7684;&#x6587;&#x6863;&#x6D41;&#x4E2D;&#xFF0C;&#x9875;&#x9762;&#x5185;&#x5BB9;&#x8F83;&#x5C11;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x505A;&#x5904;&#x7406;&#xFF0C;&#x9875;&#x811A;&#x90E8;&#x5206;&#x4E0D;&#x662F;&#x56FA;&#x5B9A;&#x5728;&#x89C6;&#x7A97;&#x5E95;&#x90E8;&#x7684;&#x3002;" title="&#x5728;&#x6B63;&#x5E38;&#x7684;&#x6587;&#x6863;&#x6D41;&#x4E2D;&#xFF0C;&#x9875;&#x9762;&#x5185;&#x5BB9;&#x8F83;&#x5C11;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x505A;&#x5904;&#x7406;&#xFF0C;&#x9875;&#x811A;&#x90E8;&#x5206;&#x4E0D;&#x662F;&#x56FA;&#x5B9A;&#x5728;&#x89C6;&#x7A97;&#x5E95;&#x90E8;&#x7684;&#x3002;" style="cursor: pointer; display: inline;"></span></p>
<p><em>&#x5728;&#x6B63;&#x5E38;&#x7684;&#x6587;&#x6863;&#x6D41;&#x4E2D;&#xFF0C;&#x9875;&#x9762;&#x5185;&#x5BB9;&#x8F83;&#x5C11;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x505A;&#x5904;&#x7406;&#xFF0C;&#x9875;&#x811A;&#x90E8;&#x5206;&#x4E0D;&#x662F;&#x56FA;&#x5B9A;&#x5728;&#x89C6;&#x7A97;&#x5E95;&#x90E8;&#x7684;&#x3002;</em></p>
<p><span class="img-wrap"><img data-src="/img/bVbbCon?w=416&amp;h=649" src="https://static.alili.tech/img/bVbbCon?w=416&amp;h=649" alt="&#x4F7F;&#x7528;sticky footer&#x5E03;&#x5C40;&#x8FBE;&#x5230;&#x4E86;&#x9884;&#x671F;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x53CA;&#x65F6;&#x5185;&#x5BB9;&#x533A;&#x8F83;&#x5C11;&#xFF0C;&#x9875;&#x811A;&#x533A;&#x5757;&#x4E5F;&#x662F;&#x56FA;&#x5B9A;&#x5728;&#x5E95;&#x90E8;&#x3002;" title="&#x4F7F;&#x7528;sticky footer&#x5E03;&#x5C40;&#x8FBE;&#x5230;&#x4E86;&#x9884;&#x671F;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x53CA;&#x65F6;&#x5185;&#x5BB9;&#x533A;&#x8F83;&#x5C11;&#xFF0C;&#x9875;&#x811A;&#x533A;&#x5757;&#x4E5F;&#x662F;&#x56FA;&#x5B9A;&#x5728;&#x5E95;&#x90E8;&#x3002;" style="cursor: pointer; display: inline;"></span></p>
<p><em>&#x4F7F;&#x7528;sticky footer&#x5E03;&#x5C40;&#x8FBE;&#x5230;&#x4E86;&#x9884;&#x671F;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x53CA;&#x65F6;&#x5185;&#x5BB9;&#x533A;&#x8F83;&#x5C11;&#xFF0C;&#x9875;&#x811A;&#x533A;&#x5757;&#x4E5F;&#x662F;&#x56FA;&#x5B9A;&#x5728;&#x5E95;&#x90E8;&#x3002;</em></p>
<p><strong>&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;</strong><br>&#x9996;&#x5148;&#x6784;&#x5EFA;&#x7B80;&#x5355;&#x7684;&#x5E03;&#x5C40;&#x4EE3;&#x7801;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;body&gt;
    &lt;div class=&quot;content&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;footer&quot;&gt;&lt;/div&gt;
&lt;/body&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;body&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;content&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;footer&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/body&gt;</span></code></pre>
<p>&#x5176;&#x4E2D;content&#x4E3A;&#x5185;&#x5BB9;&#x533A;&#x3002;&#x65B9;&#x6CD5;&#x4ECB;&#x7ECD;&#x3002;<br>&#x4E00;&#x3001;&#x4E3A;&#x5185;&#x5BB9;&#x533A;&#x57DF;&#x6DFB;&#x52A0;&#x6700;&#x5C0F;&#x9AD8;&#x5EA6;<br>&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x91CD;&#x8981;&#x7528;vh(viewpoint height)&#x6765;&#x8BA1;&#x7B97;&#x6574;&#x4F53;&#x89C6;&#x7A97;&#x7684;&#x9AD8;&#x5EA6;(1vh&#x7B49;&#x4E8E;&#x89C6;&#x7A97;&#x9AD8;&#x5EA6;&#x7684;1%),&#x7136;&#x540E;&#x51CF;&#x53BB;&#x5E95;&#x90E8;footer&#x7684;&#x9AD8;&#x5EA6;&#xFF0C;&#x4ECE;&#x800C;&#x6C42;&#x5F97;&#x5185;&#x5BB9;&#x533A;&#x57DF;&#x7684;&#x6700;&#x5C0F;&#x9AD8;&#x5EA6;&#x3002;&#x4F8B;&#x5982;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x6DFB;&#x52A0;&#x5982;&#x4E0B;&#x6837;&#x5F0F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".content {
    min-height: calc(100vh-footer&#x7684;&#x9AD8;&#x5EA6;)
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.content</span> {
    <span class="hljs-attribute">min-height</span>: <span class="hljs-built_in">calc</span>(100vh-footer&#x7684;&#x9AD8;&#x5EA6;)
}</code></pre>
<p>&#x6B64;&#x65B9;&#x6CD5;&#x9700;&#x8981;&#x77E5;&#x9053;footer&#x7684;&#x9AD8;&#x5EA6;&#xFF0C;&#x5982;&#x679C;&#x9AD8;&#x5EA6;&#x4E0D;&#x786E;&#x5B9A;&#x6B64;&#x65B9;&#x6CD5;&#x4E0D;&#x63A8;&#x8350;&#x3002;content&#x7684;&#x9AD8;&#x5EA6;&#x4E5F;&#x53EF;&#x4EE5;&#x7528;&#x767E;&#x5206;&#x6BD4;&#x6765;&#x8868;&#x793A;&#x3002;</p>
<p>&#x4E8C;&#x3001;flex&#x5E03;&#x5C40;&#x65B9;&#x5F0F;<br>html&#x4EE3;&#x7801;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body { 
    display: flex; 
    flex-flow: column; 
    min-height: 100vh;
}
.content {
    flex: 1; 
}
.footer{
    flex: 0;      
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> { 
    <span class="hljs-attribute">display</span>: flex; 
    <span class="hljs-attribute">flex-flow</span>: column; 
    <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100vh</span>;
}
<span class="hljs-selector-class">.content</span> {
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>; 
}
<span class="hljs-selector-class">.footer</span>{
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">0</span>;      
}</code></pre>
<p>&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x5C31;&#x662F;&#x5229;&#x7528;flex&#x5E03;&#x5C40;&#x5BF9;&#x89C6;&#x7A97;&#x9AD8;&#x5EA6;&#x8FDB;&#x884C;&#x5206;&#x5272;&#x3002;footer&#x7684;flex&#x8BBE;&#x4E3A;0&#xFF0C;&#x8FD9;&#x6837;footer&#x83B7;&#x5F97;&#x5176;&#x56FA;&#x6709;&#x7684;&#x9AD8;&#x5EA6;;content&#x7684;flex&#x8BBE;&#x4E3A;1&#xFF0C;&#x8FD9;&#x6837;&#x5B83;&#x4F1A;&#x5145;&#x6EE1;&#x9664;&#x53BB;footer&#x7684;&#x5176;&#x4ED6;&#x90E8;&#x5206;&#x3002;</p>
<p>&#x4E8C;&#x3001;&#x8D1F;margin&#x5E03;&#x5C40;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;<br>&#x57FA;&#x672C;&#x6784;&#x67B6;&#xFF1A;<br>html&#x4EE3;&#x7801;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;wrapper clearfix&quot;&gt;
    &lt;div class=&quot;content&quot;&gt;
      // &#x8FD9;&#x91CC;&#x662F;&#x9875;&#x9762;&#x5185;&#x5BB9;
    &lt;/div&gt;  
&lt;/div&gt;
&lt;div class=&quot;footer&quot;&gt;
    // &#x8FD9;&#x91CC;&#x662F;footer&#x7684;&#x5185;&#x5BB9;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs cs"><code>&lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;wrapper clearfix&quot;</span>&gt;
    &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;content&quot;</span>&gt;
      <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x662F;&#x9875;&#x9762;&#x5185;&#x5BB9;</span>
    &lt;/div&gt;  
&lt;/div&gt;
&lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;footer&quot;</span>&gt;
    <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x662F;footer&#x7684;&#x5185;&#x5BB9;</span>
&lt;/div&gt;</code></pre>
<p>css&#x4EE3;&#x7801;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrapper {
    min-height: 100%;
}

.wrapper .content{
    padding-bottom: 50px; /* footer&#x533A;&#x5757;&#x7684;&#x9AD8;&#x5EA6; */
}

.footer {
    position: relative;
    margin-top: -50px;  /* &#x4F7F;footer&#x533A;&#x5757;&#x6B63;&#x597D;&#x5904;&#x4E8E;content&#x7684;padding-bottom&#x4F4D;&#x7F6E; */
    height: 50px;
    clear: both;
}

.clearfix::after {
    display: block;
    content: &quot;.&quot;;
    height: 0;
    clear: both;
    visibility: hidden;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.wrapper</span> {
    <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100%</span>;
}

<span class="hljs-selector-class">.wrapper</span> <span class="hljs-selector-class">.content</span>{
    <span class="hljs-attribute">padding-bottom</span>: <span class="hljs-number">50px</span>; <span class="hljs-comment">/* footer&#x533A;&#x5757;&#x7684;&#x9AD8;&#x5EA6; */</span>
}

<span class="hljs-selector-class">.footer</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">50px</span>;  <span class="hljs-comment">/* &#x4F7F;footer&#x533A;&#x5757;&#x6B63;&#x597D;&#x5904;&#x4E8E;content&#x7684;padding-bottom&#x4F4D;&#x7F6E; */</span>
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">clear</span>: both;
}

<span class="hljs-selector-class">.clearfix</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;.&quot;</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">clear</span>: both;
    <span class="hljs-attribute">visibility</span>: hidden;
}</code></pre>
<p>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#xFF1A;content&#x5143;&#x7D20;&#x7684;padding-bottom&#x4E0E;footer&#x5143;&#x7D20;&#x7684;&#x9AD8;&#x5EA6;&#x4EE5;&#x53CA;footer&#x5143;&#x7D20;&#x7684;margin-top&#x503C;&#x5FC5;&#x987B;&#x8981;&#x4FDD;&#x6301;&#x4E00;&#x81F4;&#x3002;<br>&#x8FD9;&#x79CD;&#x8D1F;margin&#x7684;&#x5E03;&#x5C40;&#x65B9;&#x5F0F;&#xFF0C;&#x662F;&#x517C;&#x5BB9;&#x6027;&#x6700;&#x4F73;&#x7684;&#x5E03;&#x5C40;&#x65B9;&#x6848;&#xFF0C;&#x5404;&#x5927;&#x6D4F;&#x89C8;&#x5668;&#x5747;&#x53EF;&#x5B8C;&#x7F8E;&#x517C;&#x5BB9;&#xFF0C;&#x9002;&#x5408;&#x5404;&#x79CD;&#x573A;&#x666F;&#xFF0C;&#x4F46;&#x4F7F;&#x7528;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x7684;&#x524D;&#x63D0;&#x662F;&#x5FC5;&#x987B;&#x8981;&#x77E5;&#x9053;footer&#x5143;&#x7D20;&#x7684;&#x9AD8;&#x5EA6;&#xFF0C;&#x4E14;&#x7ED3;&#x6784;&#x76F8;&#x5BF9;&#x8F83;&#x590D;&#x6742;&#x3002;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端经典布局：Sticky footer 布局

## 原文链接
[https://segmentfault.com/a/1190000015123189](https://segmentfault.com/a/1190000015123189)

