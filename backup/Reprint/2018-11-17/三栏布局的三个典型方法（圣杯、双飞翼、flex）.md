---
title: '三栏布局的三个典型方法（圣杯、双飞翼、flex）' 
date: 2018-11-17 14:34:54
hidden: true
slug: wyqwl2g0zy8
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x804A;&#x804A;&#x4E09;&#x680F;&#x5E03;&#x5C40;----&#x5DE6;&#x53F3;&#x5B9A;&#x5BBD;&#xFF0C;&#x4E2D;&#x95F4;&#x81EA;&#x9002;&#x5E94;&#x3002;</h2><p>&#x6548;&#x679C;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbe3Ek?w=1083&amp;h=587" src="https://static.alili.tech/img/bVbe3Ek?w=1083&amp;h=587" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader1">&#x5723;&#x676F;&#x5E03;&#x5C40;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head lang=&quot;en&quot;&gt;
&lt;title&gt;&#x5723;&#x676F;&lt;/title&gt;
&lt;style&gt;
.container{
    padding:0 200px 0 180px;
    height:100px;
}
.left{
    float:left;
    width:180px;
    height:100px;
    margin-left:-100%;
    background:red;
    position:relative;
    left:-180px;
}
.main{
    float:left;
    width:100%;
    height:100px;
    background:blue;
}

.right{
    float:left;
    width:200px;
    height:100px;
    margin-left:-200px;
    background:green;
    position:relative;
    right:-200px;
}

&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class=&quot;container&quot;&gt;
  &lt;div class=&quot;main&quot;&gt;middle&lt;/div&gt;
  &lt;div class=&quot;left&quot;&gt;left&lt;/div&gt;
  &lt;div class=&quot;right&quot;&gt;right&lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;


" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>&#x5723;&#x676F;<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.container</span>{
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span> <span class="hljs-number">200px</span> <span class="hljs-number">0</span> <span class="hljs-number">180px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">float</span>:left;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">180px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">margin-left</span>:-<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">background</span>:red;
    <span class="hljs-attribute">position</span>:relative;
    <span class="hljs-attribute">left</span>:-<span class="hljs-number">180px</span>;
}
<span class="hljs-selector-class">.main</span>{
    <span class="hljs-attribute">float</span>:left;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background</span>:blue;
}

<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">float</span>:left;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">margin-left</span>:-<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">background</span>:green;
    <span class="hljs-attribute">position</span>:relative;
    <span class="hljs-attribute">right</span>:-<span class="hljs-number">200px</span>;
}

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;main&quot;</span>&gt;</span>middle<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;left&quot;</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;right&quot;</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>


</code></pre><h3 id="articleHeader2">&#x53CC;&#x98DE;&#x7FFC;&#x5E03;&#x5C40;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head lang=&quot;en&quot;&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;&#x53CC;&#x98DE;&#x7FFC;&lt;/title&gt;
    &lt;style&gt;
.main{
    float:left;
    width:100%; 
    height:100px;
    background:blue;
}
.left{
    float:left;
    width:180px;
    height:100px;
    margin-left:-100%;
    background:red;
}
.right{
    float:left;
    width:200px;
    height:100px;
    margin-left:-200px;
    background:green;
}
.inline{
margin:0 200px 0 180px;
}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div class=&quot;main&quot;&gt;
    &lt;div class=&quot;inline&quot;&gt;middle&lt;/div&gt; 
  &lt;/div&gt;
  &lt;div class=&quot;left&quot;&gt;left&lt;/div&gt;
  &lt;div class=&quot;right&quot;&gt;right&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>&#x53CC;&#x98DE;&#x7FFC;<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.main</span>{
    <span class="hljs-attribute">float</span>:left;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>; 
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background</span>:blue;
}
<span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">float</span>:left;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">180px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">margin-left</span>:-<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">background</span>:red;
}
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">float</span>:left;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">margin-left</span>:-<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">background</span>:green;
}
<span class="hljs-selector-class">.inline</span>{
<span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> <span class="hljs-number">200px</span> <span class="hljs-number">0</span> <span class="hljs-number">180px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;main&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;inline&quot;</span>&gt;</span>middle<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> 
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;left&quot;</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;right&quot;</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p><code>&#x6CE8;&#x610F;</code>&#xFF1A;&#x4E00;&#x5B9A;&#x8981;&#x5728;&#x8981;&#x5728;main&#x4E2D;&#x518D;&#x5305;&#x88F9;&#x4E00;&#x4E2A;&lt;div&gt;&#x5E76;&#x8BBE;&#x7F6E;&#x5B83;&#x7684;margin:0 180px 0 200px&#x3002;</p><h3 id="articleHeader3">Flex&#x5E03;&#x5C40;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;Flex&lt;/title&gt;
    &lt;style&gt;
.flex {
    display: flex;
    flex-flow: row;
}
.left{
    width: 180px;
    height: 100px;    
    background-color: red;
}
.main{
    flex: 1; 
    height: 100px;
    background-color: blue;
}
.right {
    width: 200px;
    height: 100px;
    background-color: green;
}
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class=&quot;flex&quot;&gt;
    &lt;div class=&quot;left&quot;&gt;left&lt;/div&gt;
    &lt;div class=&quot;main&quot;&gt;middle&lt;/div&gt;
    &lt;div class=&quot;right&quot;&gt;right&lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Flex<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.flex</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-flow</span>: row;
}
<span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">180px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;    
    <span class="hljs-attribute">background-color</span>: red;
}
<span class="hljs-selector-class">.main</span>{
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>; 
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background-color</span>: blue;
}
<span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background-color</span>: green;
}
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;left&quot;</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;main&quot;</span>&gt;</span>middle<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;right&quot;</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x6700;&#x91CD;&#x8981;&#x7684;&#x8FD8;&#x662F;&#x8981;&#x7406;&#x89E3;&#x6D6E;&#x52A8;&#x548C;&#x8D1F;margin&#x6280;&#x672F;&#x4EE5;&#x53CA;width:100%&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
三栏布局的三个典型方法（圣杯、双飞翼、flex）

## 原文链接
[https://segmentfault.com/a/1190000015943175](https://segmentfault.com/a/1190000015943175)

