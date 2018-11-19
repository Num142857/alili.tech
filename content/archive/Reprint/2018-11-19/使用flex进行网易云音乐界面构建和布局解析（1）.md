---
title: '使用flex进行网易云音乐界面构建和布局解析（1）' 
date: 2018-11-19 2:30:10
hidden: true
slug: fv6dk0ldjuo
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x4F7F;&#x7528;flex&#x8FDB;&#x884C;&#x7F51;&#x6613;&#x4E91;&#x97F3;&#x4E50;&#x754C;&#x9762;&#x6784;&#x5EFA;&#x548C;&#x5E03;&#x5C40;&#x89E3;&#x6790;</h2><h3 id="articleHeader1">1.&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x7528;flex&#x8FDB;&#x884C;webapp&#x5E03;&#x5C40;</h3><p>&#x7B2C;&#x4E00;&#xFF0C;float&#x5E03;&#x5C40; &#x9700;&#x8981;&#x6E05;&#x9664;&#x6D6E;&#x52A8;&#xFF0C;&#x5F88;&#x9EBB;&#x70E6;&#x3002;</p><p>&#x7B2C;&#x4E8C;&#xFF0C;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x9700;&#x8981;&#x8003;&#x8651;&#x4F4D;&#x7F6E;&#x548C;&#x7A7A;&#x95F4;&#x5360;&#x4F4D;</p><p>&#x7B2C;&#x4E09;&#xFF0C;&#x5143;&#x7D20;&#x5782;&#x76F4;&#x6C34;&#x5E73;&#x5C45;&#x4E2D;&#x95EE;&#x9898;&#x3002;</p><h3 id="articleHeader2">2.&#x7F51;&#x6613;&#x4E91;&#x97F3;&#x4E50;&#x9996;&#x9875;&#x5206;&#x6790;</h3><p><span class="img-wrap"><img data-src="/img/bVbeEv6?w=728&amp;h=910" src="https://static.alili.tech/img/bVbeEv6?w=728&amp;h=910" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader3">3.&#x5565;&#x4E5F;&#x522B;&#x8BF4;&#xFF0C;&#x76F4;&#x63A5;&#x4E0A;&#x4EE3;&#x7801;</h3><p>&#x5148;&#x6765;&#x4E00;&#x4E2A;html,</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
    &lt;title&gt;001&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
   &lt;div id=&quot;app&quot;&gt;
       &lt;div id=&quot;header&quot;&gt;&lt;/div&gt;
       &lt;div id=&quot;navbar&quot;&gt;&lt;/div&gt;
       &lt;div class=&quot;routerview&quot;&gt;
           &lt;div id=&quot;banner&quot;&gt;&lt;/div&gt;
           &lt;div id=&quot;recommend-items&quot;&gt;&lt;/div&gt; 
           &lt;div class=&quot;reco-list&quot;&gt;&lt;/div&gt;
       &lt;/div&gt;
       &lt;div id=&quot;footer&quot;&gt;&lt;/div&gt;
   &lt;/div&gt; 
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>001<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;header&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;navbar&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;routerview&quot;</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;banner&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;recommend-items&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> 
           <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;reco-list&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
       <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;footer&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> 
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x522B;&#x7684;&#x4E0D;&#x8BF4;&#x54B1;&#x4EEC;&#x5148;&#x7528;&#x8272;&#x5757;&#x628A;&#x5404;&#x90E8;&#x5206;&#x5806;&#x51FA;&#x6765;&#xFF0C;&#x8FD9;&#x4E2A;&#x8DDF;flex&#x6CA1;&#x534A;&#x6BDB;&#x94B1;&#x5173;&#x7CFB;&#xFF0C;&#x53EA;&#x662F;&#x7528;&#x4E86;rem.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html{
    font-size: 100px;
}
#header{
    background-color: #d32f2f;
    min-height: 0.48rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;

}
#navbar {
    position: fixed;
    top: 0.48rem;
    left: 0;
    right: 0;
    z-index: 1000;
    background: #ccc;
    min-height: 0.3rem;

}

#footer {
    height: 0.49rem;
    background: #2f2d2e;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    color: rgba(255, 255, 255, .87);
    font-size: 0.12rem;
}

.routerview {
    padding-bottom: 0.49rem;
}
.routerview {
    position: absolute;
    left: 0;
    top: 0.81rem;
    width: 100%;
    height: 2000px;
    background: #eeeeee;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">html</span>{
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">100px</span>;
}
<span class="hljs-selector-id">#header</span>{
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#d32f2f</span>;
    <span class="hljs-attribute">min-height</span>: <span class="hljs-number">0.48rem</span>;
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1000</span>;

}
<span class="hljs-selector-id">#navbar</span> {
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0.48rem</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1000</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">min-height</span>: <span class="hljs-number">0.3rem</span>;

}

<span class="hljs-selector-id">#footer</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0.49rem</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#2f2d2e</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-built_in">rgba</span>(255, 255, 255, .87);
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0.12rem</span>;
}

<span class="hljs-selector-class">.routerview</span> {
    <span class="hljs-attribute">padding-bottom</span>: <span class="hljs-number">0.49rem</span>;
}
<span class="hljs-selector-class">.routerview</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0.81rem</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2000px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#eeeeee</span>;
}</code></pre><p>&#x63A5;&#x7740;&#x5F80;&#x4E0B;&#x5C31;&#x662F;&#x91CD;&#x70B9;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;&#x5934;&#x90E8;&#x7EC6;&#x8282;&#x7EC6;&#x8282;&#xFF0C;&#x5DE6;&#x53F3;&#x56FE;&#x6807;&#xFF0C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       &lt;div id=&quot;header&quot;&gt;
        &lt;div class=&quot;logo&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;logo&quot;&gt;&lt;/div&gt;
       &lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>       &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">&quot;header&quot;</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;logo&quot;</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;logo&quot;</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
       &lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><p>css&#x90E8;&#x5206;&#xFF0C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#header{
    align-items: center;
    justify-content: space-between;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-id">#header</span>{
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: space-between;
}</code></pre><p>&#x90A3;&#x4E2D;&#x95F4;&#x90E8;&#x5206;&#x4E09;&#x4E2A;&#x7B49;&#x8DDD;&#x600E;&#x4E48;&#x529E;&#xFF1F;</p><p>html,</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;header&quot;&gt;
    &lt;div class=&quot;logo&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;title&quot;&gt;
    &lt;div class=&quot;logo&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;logo&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;logo&quot;&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;logo&quot;&gt;&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">&quot;header&quot;</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;logo&quot;</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;title&quot;</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;logo&quot;</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;logo&quot;</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;logo&quot;</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;logo&quot;</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><p>&#x4E0A;css,</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".title {
    display: flex;
    justify-content: center;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.title</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: center;
}</code></pre><p>&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF0C;</p><p><span class="img-wrap"><img data-src="/img/bVbeEwy?w=600&amp;h=902" src="https://static.alili.tech/img/bVbeEwy?w=600&amp;h=902" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x6700;&#x590D;&#x6742;&#x7684;&#x90E8;&#x5206;&#x5DF2;&#x7ECF;&#x7ED3;&#x675F;&#x4E86;&#xFF0C;&#x5269;&#x4E0B;&#x7684;&#x5C31;&#x5F88;OK&#x4E86;&#x3002;</p><p>&#x6700;&#x540E;&#x7ED9;&#x5927;&#x5BB6;&#x4E09;&#x4E2A;&#x5C0F;&#x5C1D;&#x8BD5;&#x5427;&#x3002;</p><p>1.&#x5269;&#x4E0B;&#x7684;&#x90E8;&#x5206;&#x5207;&#x51FA;&#x6765;&#x3002;</p><p>2.&#x89E3;&#x51B3;&#x52A8;&#x6001;&#x7684;&#x591A;&#x5C4F;&#x5E55;&#x9002;&#x914D;&#x95EE;&#x9898;&#xFF08;&#x63D0;&#x793A;&#xFF1A;js+rem&#x52A8;&#x6001;&#x8BA1;&#x7B97;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x53C2;&#x8003;&#x4EE3;&#x7801;&#xFF1A;
function getRem(pwidth,prem){
    var html = document.getElementsByTagName(&quot;html&quot;)[0];
    var oWidth = 2*document.body.clientWidth || document.documentElement.clientWidth;
    html.style.fontSize = oWidth/pwidth*prem + &quot;px&quot;;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x53C2;&#x8003;&#x4EE3;&#x7801;&#xFF1A;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getRem</span>(<span class="hljs-params">pwidth,prem</span>)</span>{
    <span class="hljs-keyword">var</span> html = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">&quot;html&quot;</span>)[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">var</span> oWidth = <span class="hljs-number">2</span>*<span class="hljs-built_in">document</span>.body.clientWidth || <span class="hljs-built_in">document</span>.documentElement.clientWidth;
    html.style.fontSize = oWidth/pwidth*prem + <span class="hljs-string">&quot;px&quot;</span>;
}</code></pre><p>3.flex&#x517C;&#x5BB9;&#x6027;&#xFF08;&#x63D0;&#x793A;&#xFF1A;postcss&#xFF09;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用flex进行网易云音乐界面构建和布局解析（1）

## 原文链接
[https://segmentfault.com/a/1190000015846688](https://segmentfault.com/a/1190000015846688)

