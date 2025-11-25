---
title: 'JS 实现全屏预览 F11功能' 
date: 2018-11-22 2:30:10
hidden: true
slug: gq7liv6z5pe
categories: [reprint]
---

{{< raw >}}
<p>&#x8001;&#x662F;&#x4E0D;&#x901A;&#x8FC7;&#xFF0C;&#x6CA1;&#x529E;&#x6CD5;&#xFF0C;&#x53EA;&#x80FD;&#x662F;&#x91CD;&#x65B0;&#x53D1;&#x5E03;&#x4E86;&#xFF0C;&#x53CD;&#x6B63;&#x6211;&#x5C31;&#x662F;&#x6760;&#x4E0A;&#x4E86;&#xFF0C;&#x5927;&#x5927;&#x5C0F;&#x5C0F;&#x5199;&#x8FC7;&#x5F88;&#x591A;&#x524D;&#x7AEF;&#x7279;&#x6548;&#xFF0C;&#x5F53;&#x7136;&#x4E5F;&#x7ECF;&#x5E38;&#x5728;&#x7F51;&#x4E0A;copy&#x6216;&#x8005;&#x4FEE;&#x6539;&#x4EBA;&#x5BB6;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x6211;&#x89C9;&#x5F97;&#x4E5F;&#x633A;&#x597D;&#x7684;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#xFF1F;&#xFF01;&#x56E0;&#x4E3A;&#x6211;&#x60F3;&#x8FD9;&#x6837;&#xFF0C;&#x4F60;&#x80FD;&#x600E;&#x4E48;&#x529E;&#xFF0C;&#x6253;&#x6211;&#xFF1F;<br>&#x5C11;&#x5E9F;&#x8BDD;&#xFF0C;&#x76F4;&#x63A5;&#x4E0A;&#x4EE3;&#x7801;&#xFF0C;<br><strong>JS&#x4EE3;&#x7801;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fullScreen(el) {
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,
        wscript;
 
    if(typeof rfs != &quot;undefined&quot; &amp;&amp; rfs) {
        rfs.call(el);
        return;
    }
 
    if(typeof window.ActiveXObject != &quot;undefined&quot;) {
        wscript = new ActiveXObject(&quot;WScript.Shell&quot;);
        if(wscript) {
            wscript.SendKeys(&quot;{F11}&quot;);
        }
    }
}
 
function exitFullScreen(el) {
    var el= document,
        cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,
        wscript;
 
    if (typeof cfs != &quot;undefined&quot; &amp;&amp; cfs) {
      cfs.call(el);
      return;
    }
 
    if (typeof window.ActiveXObject != &quot;undefined&quot;) {
        wscript = new ActiveXObject(&quot;WScript.Shell&quot;);
        if (wscript != null) {
            wscript.SendKeys(&quot;{F11}&quot;);
        }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fullScreen</span>(<span class="hljs-params">el</span>) </span>{
    <span class="hljs-keyword">var</span> rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,
        wscript;
 
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> rfs != <span class="hljs-string">&quot;undefined&quot;</span> &amp;&amp; rfs) {
        rfs.call(el);
        <span class="hljs-keyword">return</span>;
    }
 
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span>.ActiveXObject != <span class="hljs-string">&quot;undefined&quot;</span>) {
        wscript = <span class="hljs-keyword">new</span> ActiveXObject(<span class="hljs-string">&quot;WScript.Shell&quot;</span>);
        <span class="hljs-keyword">if</span>(wscript) {
            wscript.SendKeys(<span class="hljs-string">&quot;{F11}&quot;</span>);
        }
    }
}
 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">exitFullScreen</span>(<span class="hljs-params">el</span>) </span>{
    <span class="hljs-keyword">var</span> el= <span class="hljs-built_in">document</span>,
        cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,
        wscript;
 
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> cfs != <span class="hljs-string">&quot;undefined&quot;</span> &amp;&amp; cfs) {
      cfs.call(el);
      <span class="hljs-keyword">return</span>;
    }
 
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span>.ActiveXObject != <span class="hljs-string">&quot;undefined&quot;</span>) {
        wscript = <span class="hljs-keyword">new</span> ActiveXObject(<span class="hljs-string">&quot;WScript.Shell&quot;</span>);
        <span class="hljs-keyword">if</span> (wscript != <span class="hljs-literal">null</span>) {
            wscript.SendKeys(<span class="hljs-string">&quot;{F11}&quot;</span>);
        }
  }
}</code></pre><p><strong>HTML&#x4EE3;&#x7801;</strong><br>&#x6700;&#x8FD1;&#x53D7;&#x4E86;&#x4E00;&#x70B9;&#x70B9;&#x5C0F;&#x523A;&#x6FC0;&#xFF0C;&#x5BF9;&#x81EA;&#x5DF1;&#x505A;&#x7684;&#x5DE5;&#x4F5C;&#x4EA7;&#x751F;&#x8FF7;&#x832B;&#xFF0C;&#x4E0D;&#x77E5;&#x9053;&#x8FD8;&#x8981;&#x505A;&#x8FD9;&#x4E2A;&#x505A;&#x591A;&#x4E45;&#xFF0C;&#x8FD8;&#x6709;&#x6211;&#x5176;&#x5B9E;&#x8FD8;&#x662F;&#x559C;&#x6B22;&#x8BBE;&#x8BA1;&#x591A;&#x4E00;&#x4E9B;&#xFF0C;&#x8FD8;&#x6709;&#x6211;&#x559C;&#x6B22;&#x8BBE;&#x8BA1;&#xFF0C;&#x4F46;&#x662F;&#x8BBE;&#x8BA1;&#x592A;&#x96BE;&#x4E86;&#xFF0C;&#x7ECF;&#x5E38;&#x89C9;&#x5F97;&#x81EA;&#x5DF1;&#x505A;&#x7684;&#x4E1C;&#x897F;&#x8DDF;&#x522B;&#x4EBA;&#x7684;&#xFF0C;&#x6BD4;&#x8D77;&#x6765;&#x5DEE;&#x4E2A;&#x597D;&#x51E0;&#x4E07;&#x5757;&#x94B1;&#xFF0C;Why?&#x4F60;&#x95EE;&#x6211;&#xFF0C;&#x6211;&#x95EE;&#x8C01;&#x3002;&#x597D;&#x5427;&#xFF0C;&#x6211;&#x4E5F;&#x5F88;&#x65E0;&#x8D56;&#x3002;<br>&#x4E3E;&#x4E2A;&#x5C0F;&#x5C0F;&#x4F8B;&#x5B50;&#xFF0C;&#x968F;&#x4FBF;&#x6765;&#x4E00;&#x4E2A;&#x6309;&#x94AE;&#x8BD5;&#x8BD5;&#xFF0C;&#x6309;&#x94AE;&#x4E0A;&#x5728;&#x6765;&#x4E2A;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#x5207;&#x6362;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;html id=&quot;Content&quot;&gt;
    &lt;body&gt;
        &lt;ul&gt;
            &lt;li&gt;
                &lt;a id=&quot;BtnFullOpen&quot; href=&quot;javascript:void(0);&quot; title=&quot;&#x6309;&#x201C;F11&#x201D;&#x8FDB;&#x5165;&#x5168;&#x5C4F;&#x6A21;&#x5F0F;&quot;&gt;
                    &lt;i class=&quot;ace-icon fa fa-arrows-alt&quot;&gt;&lt;/i&gt;&#x5168;&#x5C4F;&#x67E5;&#x770B;
                &lt;/a&gt;
                &lt;a id=&quot;BtnFullQuite&quot; href=&quot;javascript:void(0);&quot; title=&quot;&#x6309;&#x201C;F11&#x201D;&#x5173;&#x95ED;&#x5168;&#x5C4F;&#x6A21;&#x5F0F;&quot; style=&quot;display:none;&quot;&gt;
                    &lt;i class=&quot;ace-icon fa fa-arrows-alt&quot;&gt;&lt;/i&gt;&#x5168;&#x5C4F;&#x5173;&#x95ED;
                &lt;/a&gt;
            &lt;/li&gt;
            &lt;li&gt;2&lt;/li&gt;
            &lt;li&gt;3&lt;/li&gt;
            &lt;li&gt;5&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;Content&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;BtnFullOpen&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:void(0);&quot;</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;&#x6309;&#x201C;F11&#x201D;&#x8FDB;&#x5165;&#x5168;&#x5C4F;&#x6A21;&#x5F0F;&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ace-icon fa fa-arrows-alt&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>&#x5168;&#x5C4F;&#x67E5;&#x770B;
                <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;BtnFullQuite&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:void(0);&quot;</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;&#x6309;&#x201C;F11&#x201D;&#x5173;&#x95ED;&#x5168;&#x5C4F;&#x6A21;&#x5F0F;&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;display:none;&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ace-icon fa fa-arrows-alt&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>&#x5168;&#x5C4F;&#x5173;&#x95ED;
                <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>5<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x8BB0;&#x5F97;&#x4E00;&#x5B9A;&#x8981;&#x52A0;&#x4E0A;&#x8C03;&#x7528;&#x4EE3;&#x7801;&#xFF0C;&#x8C03;&#x7528;&#x4EE3;&#x7801;&#xFF0C;&#x8C03;&#x7528;&#x4EE3;&#x7801;&#xFF0C;&#x8BF4;&#x4E09;&#x904D;...<br><strong>JS&#x8C03;&#x7528;&#x4EE3;&#x7801;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var oBtnFullOpen = document.getElementById(&apos;BtnFullOpen&apos;);
var oContent = document.getElementById(&apos;Content&apos;);
oBtnFullOpen.onclick = function() {
    fullScreen(oContent);
    oBtnFullQuite.setAttribute(&quot;style&quot;, &quot;display:block&quot;);
    oBtnFullOpen.setAttribute(&quot;style&quot;, &quot;display:none&quot;);
}
var oBtnFullQuite = document.getElementById(&apos;BtnFullQuite&apos;);
oBtnFullQuite.onclick = function() {
    exitFullScreen(oContent);
    oBtnFullQuite.setAttribute(&quot;style&quot;, &quot;display:none&quot;);
    oBtnFullOpen.setAttribute(&quot;style&quot;, &quot;display:block&quot;);
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> oBtnFullOpen = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;BtnFullOpen&apos;</span>);
<span class="hljs-keyword">var</span> oContent = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;Content&apos;</span>);
oBtnFullOpen.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    fullScreen(oContent);
    oBtnFullQuite.setAttribute(<span class="hljs-string">&quot;style&quot;</span>, <span class="hljs-string">&quot;display:block&quot;</span>);
    oBtnFullOpen.setAttribute(<span class="hljs-string">&quot;style&quot;</span>, <span class="hljs-string">&quot;display:none&quot;</span>);
}
<span class="hljs-keyword">var</span> oBtnFullQuite = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;BtnFullQuite&apos;</span>);
oBtnFullQuite.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    exitFullScreen(oContent);
    oBtnFullQuite.setAttribute(<span class="hljs-string">&quot;style&quot;</span>, <span class="hljs-string">&quot;display:none&quot;</span>);
    oBtnFullOpen.setAttribute(<span class="hljs-string">&quot;style&quot;</span>, <span class="hljs-string">&quot;display:block&quot;</span>);
};</code></pre><p>&#x53EA;&#x505A;&#x4E2A;&#x4EBA;&#x5907;&#x5FD8;&#xFF0C;&#x4E0D;&#x505A;&#x4EFB;&#x4F55;&#x53D1;&#x8868;&#xFF0C;&#x4E0D;&#x505A;&#x4FE1;&#x606F;&#x4EA4;&#x6D41;&#x3002;<br>&#x5C3D;&#x7BA1;&#x62FF;&#x53BB;&#x7528;&#xFF0C;&#x4E0D;&#x8C22;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS 实现全屏预览 F11功能

## 原文链接
[https://segmentfault.com/a/1190000015709926](https://segmentfault.com/a/1190000015709926)

