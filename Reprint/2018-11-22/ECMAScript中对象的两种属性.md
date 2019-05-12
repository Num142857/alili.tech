---
title: 'ECMAScript中对象的两种属性' 
date: 2018-11-22 11:48:10
hidden: true
slug: uafzcef7xvf
categories: [reprint]
---

{{< raw >}}
<p>1&#x3001;&#x6570;&#x636E;&#x5C5E;&#x6027;<br>&#x6570;&#x636E;&#x5C5E;&#x6027;&#x5305;&#x542B;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x503C;&#x7684;&#x4F4D;&#x7F6E;&#x3002;&#x8FD9;&#x4E2A;&#x4F4D;&#x7F6E;&#x53EF;&#x4EE5;&#x8BFB;&#x53D6;&#x548C;&#x5199;&#x5165;&#x503C;&#x3002;&#x6570;&#x636E;&#x5C5E;&#x6027;&#x6709;4&#x4E2A;&#x63CF;&#x8FF0;&#x5176;&#x884C;&#x4E3A;&#x7684;&#x7279;&#x6027;&#x3002;<br>[ [ Configurable ] ] &#x8868;&#x793A;&#x80FD;&#x5426;&#x901A;&#x8FC7;delete&#x5220;&#x9664;&#x5C5E;&#x6027;&#x4ECE;&#x800C;&#x91CD;&#x65B0;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;&#xFF0C;&#x80FD;&#x5426;&#x4FEE;&#x6539;&#x5C5E;&#x6027;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x6216;&#x8005;&#x80FD;&#x5426;&#x628A;&#x5C5E;&#x6027;&#x4FEE;&#x6539;&#x4E3A;&#x8BBF;&#x95EE;&#x5C5E;&#x6027;&#x3002;&#x9ED8;&#x8BA4;&#x4E3A;true<br>[ [ Enumerable] ] &#x8868;&#x793A;&#x80FD;&#x5426;&#x901A;&#x8FC7;for-in&#x5FAA;&#x73AF;&#x8FD4;&#x56DE;&#x5C5E;&#x6027;&#x3002;&#x9ED8;&#x8BA4;&#x4E3A;true<br>[ [ Writable ] ] &#x8868;&#x793A;&#x80FD;&#x5426;&#x4FEE;&#x6539;&#x5C5E;&#x6027;&#x7684;&#x503C;&#x3002;&#x9ED8;&#x8BA4;&#x4E3A;true<br>[ [ Value ] ] &#x5305;&#x542B;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x3002;&#x8BFB;&#x53D6;&#x5C5E;&#x6027;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4ECE;&#x8FD9;&#x4E2A;&#x4F4D;&#x7F6E;&#x8BFB;&#x53D6;&#xFF0C;&#x5199;&#x5165;&#x5C5E;&#x6027;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x628A;&#x65B0;&#x503C;&#x4FDD;&#x5B58;&#x5728;&#x8FD9;&#x4E2A;&#x4F4D;&#x7F6E;&#x3002;&#x9ED8;&#x8BA4;&#x4E3A;undefined<br>eg&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = {};
Object.defineProperty(p, &quot;name&quot;, {
    writable: false,
    value: &apos;nihao&apos; 
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code><span class="hljs-keyword">var</span> p = {};
Object.defineProperty(p, <span class="hljs-string">&quot;name&quot;</span>, {
    writable: <span class="hljs-literal">false</span>,
    <span class="hljs-keyword">value</span>: <span class="hljs-string">&apos;nihao&apos;</span> 
})
</code></pre><p>2&#x3001;&#x8BBF;&#x95EE;&#x5668;&#x5C5E;&#x6027;<br>&#x8BBF;&#x95EE;&#x5668;&#x5C5E;&#x6027;&#x4E0D;&#x5305;&#x542B;&#x6570;&#x636E;&#x503C;&#xFF0C;&#x4ED6;&#x4EEC;&#x5305;&#x542B;&#x4E00;&#x5BF9;&#x513F;getter&#x548C;setter&#x51FD;&#x6570;&#xFF08;&#x4E0D;&#x8FC7;&#xFF0C;&#x8FD9;&#x4E24;&#x4E2A;&#x51FD;&#x6570;&#x90FD;&#x4E0D;&#x662F;&#x5FC5;&#x987B;&#x7684;&#xFF09;&#x5728;&#x8BFB;&#x53D6;&#x8BBF;&#x95EE;&#x5668;&#x5C5E;&#x6027;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x8C03;&#x7528;getter&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x8D1F;&#x8D23;&#x8FD4;&#x56DE;&#x6709;&#x6548;&#x7684;&#x503C;&#x3002;&#x5728;&#x5199;&#x5165;&#x8BBF;&#x95EE;&#x5668;&#x5C5E;&#x6027;&#x662F;&#xFF0C;&#x4F1A;&#x8C03;&#x7528;setter&#x51FD;&#x6570;&#x5E76;&#x4F20;&#x5165;&#x65B0;&#x503C;&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x8D1F;&#x8D23;&#x51B3;&#x5B9A;&#x5982;&#x4F55;&#x5904;&#x7406;&#x6570;&#x636E;<br>[ [ Configurable ] ] &#x8868;&#x793A;&#x80FD;&#x5426;&#x901A;&#x8FC7;delete&#x5220;&#x9664;&#x5C5E;&#x6027;&#x4ECE;&#x800C;&#x91CD;&#x65B0;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;&#xFF0C;&#x80FD;&#x5426;&#x4FEE;&#x6539;&#x5C5E;&#x6027;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x6216;&#x8005;&#x80FD;&#x5426;&#x628A;&#x5C5E;&#x6027;&#x4FEE;&#x6539;&#x4E3A;&#x8BBF;&#x95EE;&#x5C5E;&#x6027;&#x3002;&#x9ED8;&#x8BA4;&#x4E3A;true<br>[ [ Enumerable] ] &#x8868;&#x793A;&#x80FD;&#x5426;&#x901A;&#x8FC7;for-in&#x5FAA;&#x73AF;&#x8FD4;&#x56DE;&#x5C5E;&#x6027;&#x3002;&#x9ED8;&#x8BA4;&#x4E3A;true<br>[ [ Get ] ] &#x5728;&#x8BFB;&#x53D6;&#x5C5E;&#x6027;&#x65F6;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;undefined<br>[ [ Set ] ] &#x5728;&#x5199;&#x5165;&#x5C5E;&#x6027;&#x65F6;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;undefined<br>eg:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = {get: 0};
Object.defineProperty(p, &quot;name&quot;, {
    get: function (){
        console.log(&apos;get&apos;);
        return this.get;
    },
    set: function (newVal) {
        console.log(&apos;set&apos;);
        this.get = newVal;
    }
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> p = {<span class="hljs-keyword">get</span>: <span class="hljs-number">0</span>};
<span class="hljs-built_in">Object</span>.defineProperty(p, <span class="hljs-string">&quot;name&quot;</span>, {
    <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;get&apos;</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.get;
    },
    <span class="hljs-keyword">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">newVal</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;set&apos;</span>);
        <span class="hljs-keyword">this</span>.get = newVal;
    }
})
</code></pre><p>3&#x3001;&#x8BFB;&#x53D6;&#x5C5E;&#x6027;&#x7684;&#x7279;&#x6027;<br>Object.getOwnPropertyDescriptor(&#x5C5E;&#x6027;&#x6240;&#x5728;&#x7684;&#x5BF9;&#x8C61;, &#x5C5E;&#x6027;&#x540D;&#x79F0;);<br>&#x8FD4;&#x56DE;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x8BBF;&#x95EE;&#x5C5E;&#x6027;configurable &#x3001;enumerable&#x3001;get&#x3001;set&#x56DB;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;<br>&#x5982;&#x679C;&#x662F;&#x6570;&#x503C;&#x5C5E;&#x6027;&#xFF0C;&#x8FD4;&#x56DE;&#x7684;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x6709;configurable &#x3001;enumerable&#x3001;writable&#x3001;value&#x56DB;&#x4E2A;&#x5C5E;&#x6027;<br>&#x5907;&#x6CE8;&#xFF1A;<br>Object.defineProperties()&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x5B9A;&#x4E49;&#x591A;&#x4E2A;&#x5C5E;&#x6027;<br>eg:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = {get: 0};
Object.defineProperties(p, {&quot;name&quot;, {
    get: function (){
        console.log(&apos;get&apos;);
        return this.get;
    },
    set: function (newVal) {
        console.log(&apos;set&apos;);
        this.get = newVal;
    }
}, &quot;age&quot;: {
       writable: true,
       value: 11
   }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> p = {<span class="hljs-keyword">get</span>: <span class="hljs-number">0</span>};
<span class="hljs-built_in">Object</span>.defineProperties(p, {<span class="hljs-string">&quot;name&quot;</span>, {
    <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;get&apos;</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.get;
    },
    <span class="hljs-keyword">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">newVal</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;set&apos;</span>);
        <span class="hljs-keyword">this</span>.get = newVal;
    }
}, <span class="hljs-string">&quot;age&quot;</span>: {
       writable: <span class="hljs-literal">true</span>,
       value: <span class="hljs-number">11</span>
   }
})</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ECMAScript中对象的两种属性

## 原文链接
[https://segmentfault.com/a/1190000015661720](https://segmentfault.com/a/1190000015661720)

