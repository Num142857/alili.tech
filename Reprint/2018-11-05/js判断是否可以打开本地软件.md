---
title: js判断是否可以打开本地软件
hidden: true
categories: [reprint]
slug: 2644af5c
date: 2018-11-05 02:30:11
---

{{< raw >}}
<h2 id="articleHeader0">js &#x5224;&#x65AD;&#x662F;&#x5426;&#x5B89;&#x88C5;&#x63D2;&#x4EF6;</h2><blockquote>&#x6700;&#x8FD1;&#x9047;&#x5230;&#x4E00;&#x4E2A;&#x9700;&#x6C42;&#xFF1A;&#x70B9;&#x51FB;&#x4E00;&#x4E2A;&#x6309;&#x94AE;&#xFF0C;&#x7136;&#x540E;&#x6253;&#x5F00;&#x672C;&#x5730;&#x7684;&#x8F6F;&#x4EF6;&#x3002;&#x7C7B;&#x4F3C;&#x4E00;&#x4E9B;&#x7F51;&#x7AD9;&#x6253;&#x5F00; qq &#x4E00;&#x6837;&#x3002;&#x4F46;&#x662F;&#x540E;&#x6765;&#x9047;&#x5230;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x5982;&#x679C;&#x672C;&#x5730;&#x6CA1;&#x6709;&#x5B89;&#x88C5;&#x8FD9;&#x4E2A;&#x6307;&#x5B9A;&#x7684;&#x8F6F;&#x4EF6;&#xFF0C;&#x5219;&#x65E0;&#x6CD5;&#x6253;&#x5F00;&#x3002;&#x6240;&#x4EE5;&#x9700;&#x8981;&#x5224;&#x65AD;&#x5F53;&#x524D;&#x7684;&#x7535;&#x8111;&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x5B89;&#x88C5;&#x6307;&#x5B9A;&#x8F6F;&#x4EF6;&#xFF0C;&#x5982;&#x679C;&#x5DF2;&#x5B89;&#x88C5;&#xFF0C;&#x5219;&#x6253;&#x5F00;&#x8F6F;&#x4EF6;&#xFF1B;&#x5426;&#x5219;&#xFF0C;&#x5F39;&#x51FA;&#x6A21;&#x6001;&#x6846;&#xFF0C;&#x63D0;&#x793A;&#x4E0B;&#x8F7D;&#x5E76;&#x5B89;&#x88C5;&#x8F6F;&#x4EF6;&#x3002;</blockquote><p>&#x521A;&#x5F00;&#x59CB;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E00;&#x76F4;&#x5728;&#x8003;&#x8651;&#x5982;&#x4F55;&#x4F7F;&#x7528; js &#x6765;&#x5224;&#x65AD;&#x67D0;&#x4E2A;&#x8F6F;&#x4EF6;&#x662F;&#x5426;&#x5B89;&#x88C5;&#xFF08;&#x53EF;&#x4EE5;&#x88AB;&#x6D4F;&#x89C8;&#x5668;&#x8C03;&#x7528;&#x7684;&#x8F6F;&#x4EF6;&#xFF09;&#x3002;&#x5374;&#x4E00;&#x76F4;&#x6CA1;&#x6709;&#x5934;&#x7EEA;&#x3002;&#x540E;&#x6765;&#x5728;&#x5404;&#x5927;&#x7F51;&#x7AD9;&#x627E;&#x5230;&#x4E00;&#x4E9B;&#x65B9;&#x6CD5;&#xFF1A;</p><ol><li><a href="https://blog.csdn.net/hsany330/article/details/73872866" rel="nofollow noreferrer" target="_blank">ActiveXObject</a></li><li><a href="https://blog.csdn.net/zhuang902/article/details/38323051" rel="nofollow noreferrer" target="_blank">navigator.plugins</a></li></ol><p>&#x4F46;&#x540E;&#x6765;&#x53D1;&#x73B0;&#x8FD9;&#x4E9B;&#x65B9;&#x6CD5;&#x90FD;&#x65E0;&#x6548;&#xFF0C;&#x5F88;&#x662F;&#x5931;&#x671B;&#x3002;</p><p>&#x6700;&#x540E;&#x5728; github &#x4E0A;&#x627E;&#x5230;&#x4E86;&#x4E00;&#x4E2A;&#x63D2;&#x4EF6;&#xFF1A;<br><a href="https://github.com/ismailhabib/custom-protocol-detection" rel="nofollow noreferrer" target="_blank">Custom Protocol Detection in Browser</a></p><p>&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x53C2;&#x8003;&#x91CC;&#x9762;&#x7684;<code>example</code>&#x5373;&#x53EF;&#x3002;</p><h3 id="articleHeader1">&#x57FA;&#x4E8E;&#x63D2;&#x4EF6;&#x539F;&#x7406;&#x7684;&#x91CD;&#x6784;</h3><p>&#x5728;&#x63D2;&#x4EF6;&#x4E2D;&#x6709;&#x4E00;&#x4E2A;&#x90E8;&#x5206;&#x7684;&#x539F;&#x7406;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;<br>&#x5982;&#x679C;&#x672C;&#x5730;&#x5B89;&#x88C5;&#x4E86;&#x63D2;&#x4EF6;&#xFF0C;&#x5F53;&#x5C1D;&#x8BD5;&#x4F7F;&#x7528;&#x63D2;&#x4EF6;&#x6253;&#x5F00;&#x65F6;&#xFF0C;<code>window</code>&#x540E;&#x89E6;&#x53D1;<code>blur</code>&#x4E8B;&#x4EF6;&#xFF1B;&#x5982;&#x679C;&#x65E0;&#x6CD5;&#x6253;&#x5F00;&#x63D2;&#x4EF6;&#xFF0C;&#x5219;&#x4EC0;&#x4E48;&#x90FD;&#x4E0D;&#x4F1A;&#x53D1;&#x751F;&#x3002;</p><p>&#x6839;&#x636E;&#x8FD9;&#x4E2A;&#x539F;&#x7406;&#xFF0C;&#x8FDB;&#x884C;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x5C01;&#x88C5;&#x3002;&#xFF08;&#x5176;&#x5B9E;&#x4E5F;&#x4E0D;&#x7B97;&#x662F;&#x5C01;&#x88C5;&#xFF0C;&#x53EA;&#x662F;&#x7B80;&#x5355;&#x7684;&#x628A;&#x5176;&#x4E2D;&#x7684;&#x539F;&#x7406;&#x5C55;&#x73B0;&#x51FA;&#x6765;&#x800C;&#x5DF2;&#xFF09;</p><p>&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x7684;&#x662F;<code>es5</code>&#x4EE3;&#x7801;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x4E3A;&#x4E86;&#x517C;&#x4EFB;&#x4F4E;&#x7248;&#x672C;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x7406;&#x89E3;&#x5176;&#x4E2D;&#x7684;&#x539F;&#x7406;&#x540E;&#xFF0C;&#x79FB;&#x690D;&#x5230;&#x76F8;&#x5E94;&#x7684;&#x9879;&#x76EE;&#x6216;&#x8005;&#x6846;&#x67B6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// dom&#x90E8;&#x5206;
&lt;p class=&quot;link&quot; data-link=&quot;blahblah:randomstuff&quot;&gt;plugin 1&lt;/p&gt;
&lt;p class=&quot;link&quot; data-link=&quot;mailto:johndoe@somewhere.com&quot;&gt;plugin 2&lt;/p&gt;
&lt;p class=&quot;link&quot; data-link=&quot;tencent://message&quot;&gt;plugin 3&lt;/p&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code><span class="hljs-comment">// dom&#x90E8;&#x5206;</span>
&lt;p <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;link&quot;</span> data-link=<span class="hljs-string">&quot;blahblah:randomstuff&quot;</span>&gt;plugin <span class="hljs-number">1</span>&lt;/p&gt;
&lt;p <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;link&quot;</span> data-link=<span class="hljs-string">&quot;mailto:johndoe@somewhere.com&quot;</span>&gt;plugin <span class="hljs-number">2</span>&lt;/p&gt;
&lt;p <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;link&quot;</span> data-link=<span class="hljs-string">&quot;tencent://message&quot;</span>&gt;plugin <span class="hljs-number">3</span>&lt;/p&gt;</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// js&#x90E8;&#x5206;
var links = document.getElementsByClassName(&apos;link&apos;)
var readyToBlur = false
var hasPlugin = null
var timeout = 1000

window.addEventListener(&apos;blur&apos;, function () {
    if (readyToBlur) {
        hasPlugin = true
        console.log(&apos;has plugin&apos;)
    }
})

for (var i = 0; i &lt; links.length; i++) {
    (function (id, win) {
        links[id].addEventListener(&apos;click&apos;, function () {
            readyToBlur = true
            hasPlugin = false
            window.location.href = links[id].getAttribute(&apos;data-link&apos;)
            var t = setTimeout(function () {
                win.readyToBlur = false
                !hasPlugin &amp;&amp; onHasNoPlugin(links[id].innerText)
                clearTimeout(t)
            }, timeout)
        })
    })(i, window)
}

function onHasNoPlugin(pluginName) {
    console.log(&apos;no plugin: &apos; + pluginName)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// js&#x90E8;&#x5206;</span>
<span class="hljs-keyword">var</span> links = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">&apos;link&apos;</span>)
<span class="hljs-keyword">var</span> readyToBlur = <span class="hljs-literal">false</span>
<span class="hljs-keyword">var</span> hasPlugin = <span class="hljs-literal">null</span>
<span class="hljs-keyword">var</span> timeout = <span class="hljs-number">1000</span>

<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">&apos;blur&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (readyToBlur) {
        hasPlugin = <span class="hljs-literal">true</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;has plugin&apos;</span>)
    }
})

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; links.length; i++) {
    (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">id, win</span>) </span>{
        links[id].addEventListener(<span class="hljs-string">&apos;click&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            readyToBlur = <span class="hljs-literal">true</span>
            hasPlugin = <span class="hljs-literal">false</span>
            <span class="hljs-built_in">window</span>.location.href = links[id].getAttribute(<span class="hljs-string">&apos;data-link&apos;</span>)
            <span class="hljs-keyword">var</span> t = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                win.readyToBlur = <span class="hljs-literal">false</span>
                !hasPlugin &amp;&amp; onHasNoPlugin(links[id].innerText)
                clearTimeout(t)
            }, timeout)
        })
    })(i, <span class="hljs-built_in">window</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onHasNoPlugin</span>(<span class="hljs-params">pluginName</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;no plugin: &apos;</span> + pluginName)
}</code></pre><h3 id="articleHeader2">&#x539F;&#x7406;&#x5206;&#x6790;</h3><p>&#x6253;&#x5F00;&#x672C;&#x5730;&#x63D2;&#x4EF6;&#xFF08;&#x8F6F;&#x4EF6;&#xFF0C;&#x4F8B;&#x5982; qq&#xFF09;&#x7684;&#x65B9;&#x6CD5;&#x57FA;&#x672C;&#x662F;&#x8BA9;&#x6D4F;&#x89C8;&#x5668;&#x7684; url &#x53D1;&#x751F;&#x6539;&#x53D8;&#xFF0C;&#x4E00;&#x822C;&#x6709;&#x4EE5;&#x4E0B;&#x65B9;&#x6CD5;&#xFF1A;</p><ol><li>&#x4F7F;&#x7528;<code>a</code>&#x6807;&#x7B7E;&#xFF0C;&#x5E76;&#x4F7F;&#x7528;<code>href</code>&#x5C5E;&#x6027;&#x3002;<code>&lt;a href=&quot;plugin:data&quot;&gt;plugin&lt;/a&gt;</code></li><li><code>window.location.href = &apos;plugin:data&apos;</code></li><li><code>window.open(&apos;plugin:data&apos;)</code></li></ol><p>&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x7684;&#x662F;&#x7B2C;&#x4E8C;&#x79CD;&#x65B9;&#x6CD5;&#x3002;&#x7B2C;&#x4E00;&#x79CD;&#x4E0D;&#x597D;&#x505A;&#x62E6;&#x622A;&#xFF0C;&#x7B2C;&#x4E09;&#x79CD;&#x65E0;&#x8BBA;&#x662F;&#x5426;&#x5B89;&#x88C5;&#x90FD;&#x4F1A;&#x6253;&#x5F00;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x7A97;&#x53E3;&#x3002;</p><p>&#x5F53;&#x5C1D;&#x8BD5;&#x6253;&#x5F00;&#x8F6F;&#x4EF6;&#x65F6;&#xFF0C;&#x5F00;&#x59CB;&#x76D1;&#x542C;<code>window</code>&#x7684;<code>blur</code>&#x4E8B;&#x4EF6;&#x3002;&#x5728;&#x6307;&#x5B9A;&#x7684;&#x4E8B;&#x4EF6;&#x5185;&#xFF0C;&#x5982;&#x679C;&#x89E6;&#x53D1;&#x4E86;<code>blur</code>&#x4E8B;&#x4EF6;&#xFF0C;&#x8BF4;&#x660E;&#x8F6F;&#x4EF6;&#x5DF2;&#x7ECF;&#x5B89;&#x88C5;&#xFF0C;&#x4FEE;&#x6539;<code>hasPlugin</code>&#x6807;&#x8BC6;&#xFF1B;&#x5426;&#x5219;&#x65E0;&#x64CD;&#x4F5C;&#x3002;&#x7136;&#x540E;&#x5F53;&#x65F6;&#x95F4;&#x5230;&#x671F;&#x65F6;&#xFF0C;&#x79FB;&#x9664;&#x76D1;&#x542C;&#xFF0C;&#x5E76;&#x5224;&#x65AD;<code>hasPlugin</code>&#x7684;&#x503C;&#xFF0C;&#x5982;&#x679C;&#x4E3A;<code>false</code>&#xFF0C;&#x5219;&#x8BF4;&#x660E;&#x6CA1;&#x6709;&#x5B89;&#x88C5;&#x63D2;&#x4EF6;&#xFF0C;&#x6267;&#x884C;&#x76F8;&#x5E94;&#x7684;&#x5904;&#x7406;&#x51FD;&#x6570;&#x3002;</p><blockquote>&#x53E6;&#x5916;&#x8FD8;&#x9700;&#x6CE8;&#x610F;&#x4E00;&#x70B9;&#xFF0C;&#x8FD9;&#x91CC;&#x8BBE;&#x7F6E;&#x7684; timeout &#x662F;&#x6839;&#x636E;&#x5B9E;&#x9645;&#x60C5;&#x51B5;&#x800C;&#x5B9A;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x6709;&#x4E00;&#x4E9B;&#x8F6F;&#x4EF6;&#x6253;&#x5F00;&#x7684;&#x901F;&#x5EA6;&#x53EF;&#x80FD;&#x5F88;&#x6162;&#xFF0C;&#x4E0D;&#x4F1A;&#x50CF; qq &#x8FD9;&#x6837;&#x7684;&#x8F6F;&#x4EF6;&#x4E00;&#x70B9;&#x51FB;&#x5C31;&#x4F1A;&#x9A6C;&#x4E0A;&#x6253;&#x5F00;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x628A;&#x76D1;&#x542C;&#x7684; timeout &#x8BBE;&#x7F6E;&#x4E3A; 1 &#x79D2;&#x3002;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js判断是否可以打开本地软件

## 原文链接
[https://segmentfault.com/a/1190000016629408](https://segmentfault.com/a/1190000016629408)

