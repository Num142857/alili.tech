---
title: 'JS单例模式《JavaScript设计模式与开发实践》阅读笔记' 
date: 2018-11-29 2:30:08
hidden: true
slug: 3jatxjg6jy4
categories: [reprint]
---

{{< raw >}}
<p><em>&#x6B64;&#x6587;&#x4EC5;&#x8BB0;&#x5F55;&#x672C;&#x4EBA;&#x9605;&#x8BFB;&#x300A;JavaScript&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x4E0E;&#x5F00;&#x53D1;&#x5B9E;&#x8DF5;&#x300B;&#x8FD9;&#x4E2A;&#x672C;&#x65F6;&#x7684;&#x611F;&#x53D7;&#xFF0C;&#x611F;&#x8C22;&#x4F5C;&#x8005;&#x66FE;&#x63A2;&#x5199;&#x51FA;&#x8FD9;&#x4E48;&#x597D;&#x7684;&#x4E00;&#x672C;&#x4E66;&#x3002;&#x5982;&#x6709;&#x5192;&#x72AF;&#xFF0C;&#x5982;&#x6709;&#x9519;&#x8BEF;&#xFF0C;&#x8BF7;&#x8054;&#x7CFB;&#x672C;&#x4EBA;&#xFF1A;luogao_lg@sina.com&#x5904;&#x7406;&#x3002;</em></p><p>&#x8FD9;&#x4E00;&#x7AE0;&#x8BA9;&#x6211;&#x77E5;&#x9053;&#x4E86;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;&#x7684;&#x6838;&#x5FC3;&#x5C31;&#x662F;&#xFF1A;<strong>&#x4FDD;&#x8BC1;&#x4E00;&#x4E2A;&#x7C7B;&#x4EC5;&#x6709;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#xFF0C;&#x5E76;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x8BBF;&#x95EE;&#x5B83;&#x7684;&#x5168;&#x5C40;&#x8BBF;&#x95EE;&#x70B9;</strong>&#x3002;&#x4F46;&#x5728;JavaScript&#x4E2D;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;&#x6709;&#x522B;&#x7684;&#x533A;&#x522B;&#x4E8E;&#x4F20;&#x7EDF;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x8BED;&#x8A00;&#x7684;&#x5E94;&#x7528;&#xFF0C;&#x60F0;&#x6027;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;&#x5728;&#x5B9E;&#x9645;&#x7684;&#x5F00;&#x53D1;&#x4E2D;&#x6709;&#x5F88;&#x591A;&#x7528;&#x9014;&#xFF0C;&#x4F8B;&#x5982;&#x63D0;&#x9AD8;&#x9875;&#x9762;&#x6027;&#x80FD;&#xFF0C;&#x907F;&#x514D;&#x4E0D;&#x5FC5;&#x8981;&#x7684;DOM&#x64CD;&#x4F5C;&#x7B49;&#x3002;</p><h2 id="articleHeader0">&#x4E3A;&#x4F55;&#x8981;&#x6709;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;</h2><p>&#x4E66;&#x4E2D;&#x6709;&#x4E3E;&#x51FA;&#x4E00;&#x4E2A;&#x5B9E;&#x9645;&#x573A;&#x666F;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x70B9;&#x51FB;&#x767B;&#x9646;&#x6309;&#x94AE;&#x65F6;&#xFF0C;&#x9875;&#x9762;&#x4E2D;&#x53EF;&#x80FD;&#x4F1A;&#x51FA;&#x73B0;&#x4E00;&#x4E2A;&#x5F39;&#x6846;&#xFF0C;&#x800C;&#x8FD9;&#x4E2A;&#x5F39;&#x6846;&#x662F;&#x552F;&#x4E00;&#x7684;&#xFF0C;&#x65E0;&#x8BBA;&#x70B9;&#x591A;&#x5C11;&#x6B21;&#x767B;&#x9646;&#x6309;&#x94AE;&#xFF0C;&#x5F39;&#x6846;&#x53EA;&#x4F1A;&#x88AB;&#x521B;&#x5EFA;&#x4E00;&#x6B21;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#x5C31;&#x9002;&#x5408;&#x7528;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;&#x6765;&#x521B;&#x5EFA;&#x5F39;&#x6846;&#x3002;</p><h3 id="articleHeader1">&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;</h3><p>&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#x6765;&#x81EA;&#x4E66;&#x4E2D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CreateDiv = (function(html) {
    var instance
    var CreateDiv = function() {
        if (instance) {
            return instance
        }
        this.html = html
        this.init()
        return instance = this
    }
    CreateDiv.prototype.init = function() {
        var div = document.createElement(&apos;div&apos;)
        div.innerHTML = this.html
        document.appendChild(div)
    }
    return CreateDiv
})()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> CreateDiv = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">html</span>) </span>{
    <span class="hljs-keyword">var</span> instance
    <span class="hljs-keyword">var</span> CreateDiv = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (instance) {
            <span class="hljs-keyword">return</span> instance
        }
        <span class="hljs-keyword">this</span>.html = html
        <span class="hljs-keyword">this</span>.init()
        <span class="hljs-keyword">return</span> instance = <span class="hljs-keyword">this</span>
    }
    CreateDiv.prototype.init = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> div = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;div&apos;</span>)
        div.innerHTML = <span class="hljs-keyword">this</span>.html
        <span class="hljs-built_in">document</span>.appendChild(div)
    }
    <span class="hljs-keyword">return</span> CreateDiv
})()</code></pre><blockquote>&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#x901A;&#x8FC7;&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;&#x548C;&#x95ED;&#x5305;&#x5C06;instance&#x5C01;&#x88C5;&#x8D77;&#x6765;&#x3002;&#x5E76;&#x4E14;&#x8FD4;&#x56DE;&#x4E86;&#x771F;&#x6B63;&#x7684;<code>Singleton</code>&#x6784;&#x9020;&#x65B9;&#x6CD5;&#x3002;</blockquote><p>&#x901A;&#x8FC7;&#x89C2;&#x5BDF;&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x53D1;&#x73B0;<code>CreateDiv</code>&#x91CC;&#x6267;&#x884C;&#x4E86;&#x4E24;&#x4E2A;&#x64CD;&#x4F5C;&#xFF1A;</p><ul><li>1.&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x5E76;&#x4E14;&#x6267;&#x884C;<code>init</code>&#x65B9;&#x6CD5;&#x3002;</li><li>2.&#x4FDD;&#x8BC1;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x3002;&#x8FD9;&#x91CC;&#x5C31;&#x66B4;&#x9732;&#x51FA;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#x3002;</li></ul><p>&#x5982;&#x679C;&#x67D0;&#x5929;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7528;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x5411;&#x9875;&#x9762;&#x4E2D;&#x521B;&#x5EFA;&#x66F4;&#x591A;&#x7684;&#x5143;&#x7D20;&#x3002;&#x90A3;&#x6211;&#x4EEC;&#x5FC5;&#x987B;&#x8981;&#x6539;&#x5199;<code>CreateDiv</code>&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x7ED3;&#x5408;&#x201C;<strong>&#x5355;&#x4E00;&#x804C;&#x8D23;&#x539F;&#x5219;</strong>&#x201D;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x77E5;&#x9053;&#x8981;&#x53BB;&#x628A;&#x4FDD;&#x8BC1;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x8FD9;&#x4E2A;&#x64CD;&#x4F5C;&#x4ECE;<code>CreateDiv</code>&#x62BD;&#x79BB;&#x51FA;&#x6765;&#x3002;&#x8FD9;&#x4E2A;&#x76EE;&#x7684;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4EE3;&#x7406;&#x6765;&#x5B9E;&#x73B0;&#x3002;</p><h2 id="articleHeader2">&#x7528;&#x4EE3;&#x7406;&#x5B9E;&#x73B0;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;</h2><p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x628A;&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#x7684;<code>CreateDiv</code>&#x65B9;&#x6CD5;&#x6539;&#x5199;&#x6210;&#x4E00;&#x4E2A;&#x53EA;&#x8D1F;&#x8D23;&#x521B;&#x5EFA;DIV&#x7684;&#x7C7B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CreateDiv = function(html) {
    this.html = html
    this.init()
}

CreateDiv.prototype.init = function() {
    var div = document.createElement(&apos;div&apos;)
    div.innerHTML = this.html
    document.appendChild(div)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> CreateDiv = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">html</span>) </span>{
    <span class="hljs-keyword">this</span>.html = html
    <span class="hljs-keyword">this</span>.init()
}

CreateDiv.prototype.init = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> div = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;div&apos;</span>)
    div.innerHTML = <span class="hljs-keyword">this</span>.html
    <span class="hljs-built_in">document</span>.appendChild(div)
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x5F15;&#x5165;&#x4EE3;&#x7406;&#x7C7B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ProxysingletonCreateDiv = (function() {
    var instance
    return function(html) {
        if (!instance) {
            instance = new CreateDiv(html)
        }
        return instance
    }
})()
var a = new ProxysingletonCreateDiv(&apos;test1&apos;)
var b = new ProxysingletonCreateDiv(&apos;test2&apos;)

alert(a === b) // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> ProxysingletonCreateDiv = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> instance
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">html</span>) </span>{
        <span class="hljs-keyword">if</span> (!instance) {
            instance = <span class="hljs-keyword">new</span> CreateDiv(html)
        }
        <span class="hljs-keyword">return</span> instance
    }
})()
<span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> ProxysingletonCreateDiv(<span class="hljs-string">&apos;test1&apos;</span>)
<span class="hljs-keyword">var</span> b = <span class="hljs-keyword">new</span> ProxysingletonCreateDiv(<span class="hljs-string">&apos;test2&apos;</span>)

alert(a === b) <span class="hljs-comment">// true</span></code></pre><p>&#x81F3;&#x6B64;&#x5229;&#x7528;&#x4EE3;&#x7406;&#x7C7B;&#x4E5F;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;&#x3002;&#x4F46;&#x76EE;&#x524D;&#x6211;&#x4EEC;&#x8BA8;&#x8BBA;&#x7684;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;&#x8DDF;&#x63A5;&#x8FD1;&#x4F20;&#x7EDF;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x8BED;&#x8A00;&#x4E2D;&#x7684;&#x5B9E;&#x73B0;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x6765;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;JavaScript&#x4E2D;&#x7684;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;&#x3002;</p><h2 id="articleHeader3">JavaScript&#x4E2D;&#x7684;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;&#x2014;&#x2014;&#x60F0;&#x6027;&#x5355;&#x4F8B;</h2><p>&#x4E86;&#x89E3;&#x4E86;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;&#x7684;&#x4E00;&#x4E9B;&#x5B9E;&#x73B0;&#x65B9;&#x6CD5;&#x4E4B;&#x540E;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x6765;&#x770B;&#x770B;&#x60F0;&#x6027;&#x5355;&#x4F8B;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x8FD9;&#x79CD;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x5728;JavaScript&#x7684;&#x5B9E;&#x9645;&#x7F16;&#x7A0B;&#x4E2D;&#x662F;&#x5F88;&#x5B9E;&#x7528;&#x7684;&#x3002;</p><h3 id="articleHeader4">&#x60F0;&#x6027;&#x5355;&#x4F8B;</h3><p>&#x60F0;&#x6027;&#x5355;&#x4F8B;&#x662F;&#x6307;&#x5728;&#x9700;&#x8981;&#x7684;&#x65F6;&#x5019;&#x624D;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x5B9E;&#x4F8B;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x50CF;&#x4E4B;&#x524D;&#x7684;&#x4EE3;&#x7801;&#x90A3;&#x6837;&#xFF0C;&#x5229;&#x7528;&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;&#x5728;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x65F6;&#x5C31;&#x628A;&#x5BF9;&#x8C61;&#x5B9E;&#x4F8B;&#x521B;&#x5EFA;&#x3002;</p><p>&#x6BD4;&#x5982;&#x6700;&#x5F00;&#x59CB;&#x5C31;&#x63D0;&#x5230;&#xFF0C;&#x5F53;&#x6253;&#x5F00;&#x4E00;&#x4E2A;&#x7F51;&#x7AD9;&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x767B;&#x5F55;&#xFF0C;&#x4F46;&#x767B;&#x9646;&#x7684;&#x5F39;&#x7A97;&#x53EA;&#x4F1A;&#x5728;&#x70B9;&#x51FB;&#x767B;&#x9646;&#x6309;&#x94AE;&#x65F6;&#x51FA;&#x73B0;&#xFF0C;&#x751A;&#x81F3;&#x6709;&#x7684;&#x7F51;&#x7AD9;&#x4E0D;&#x9700;&#x8981;&#x767B;&#x5F55;&#x5C31;&#x80FD;&#x76F4;&#x63A5;&#x6D4F;&#x89C8;&#x3002;&#x8FD9;&#x65F6;&#x6211;&#x4EEC;&#x5E76;&#x4E0D;&#x9700;&#x8981;&#x5728;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x65F6;&#x5C31;&#x53BB;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5F39;&#x7A97;&#x3002;&#x6211;&#x4EEC;&#x5927;&#x53EF;&#x5728;&#x9700;&#x8981;&#x7528;&#x7684;&#x65F6;&#x5019;&#x53BB;&#x521B;&#x5EFA;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;html&gt;
    &lt;body&gt;
        &lt;button id=&quot;loginBtn&quot;&gt;&#x767B;&#x5F55;&lt;/button&gt;
    &lt;/body&gt;
    &lt;script&gt;
        var createLoginLayer = (function() {
            var div
            return function() {
                if (!div) {
                    var div = document.createElement(&apos;div&apos;)
                    div.innerHTML = &apos;&#x6211;&#x662F;&#x767B;&#x5F55;&#x5F39;&#x7A97;&apos;
                    div.style.display = &apos;none&apos;
                    document.appendChild(div)
                }
                return div
            }
        })()
        document.getElementById(&apos;loginBtn&apos;).onclick = function() {
            var loginLayer = createLoginLayer()
            loginLayer.style.display = &apos;block&apos;
        }
    &lt;/script&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;loginBtn&quot;</span>&gt;</span>&#x767B;&#x5F55;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> createLoginLayer = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> div
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">if</span> (!div) {
                    <span class="hljs-keyword">var</span> div = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;div&apos;</span>)
                    div.innerHTML = <span class="hljs-string">&apos;&#x6211;&#x662F;&#x767B;&#x5F55;&#x5F39;&#x7A97;&apos;</span>
                    div.style.display = <span class="hljs-string">&apos;none&apos;</span>
                    <span class="hljs-built_in">document</span>.appendChild(div)
                }
                <span class="hljs-keyword">return</span> div
            }
        })()
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;loginBtn&apos;</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> loginLayer = createLoginLayer()
            loginLayer.style.display = <span class="hljs-string">&apos;block&apos;</span>
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x4EE5;&#x4E0A;&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;&#x7684;&#x5F39;&#x7A97;&#x3002;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x8FD8;&#x662F;&#x53EF;&#x4EE5;&#x628A;&#x5176;&#x4E2D;&#x7684;&#x63A7;&#x5236;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x64CD;&#x4F5C;&#x62BD;&#x79BB;&#x51FA;&#x6765;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x901A;&#x7528;&#x7684;&#x60F0;&#x6027;&#x5355;&#x4F8B;&#x3002;</p><h3 id="articleHeader5">&#x901A;&#x7528;&#x60F0;&#x6027;&#x5355;&#x4F8B;</h3><p>&#x901A;&#x7528;&#x60F0;&#x6027;&#x5355;&#x4F8B;&#x7684;&#x5B9E;&#x73B0;&#x5C31;&#x662F;&#x8981;&#x62BD;&#x79BB;&#x6240;&#x6709;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;&#x90FD;&#x8981;&#x5B9E;&#x73B0;&#x7684;&#x2014;&#x2014;&#x63A7;&#x5236;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x3002;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;&#x63A7;&#x5236;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x64CD;&#x4F5C;&#x62BD;&#x8C61;&#x51FA;&#x6765;&#x662F;&#x4E2A;&#x4EC0;&#x4E48;&#x6837;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj 
if (!obj) {
    obj = xxx
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj 
<span class="hljs-keyword">if</span> (!obj) {
    obj = xxx
}</code></pre><p>&#x4E8E;&#x662F;&#x5C31;&#x53EF;&#x4EE5;&#x628A;&#x8FD9;&#x4E2A;&#x64CD;&#x4F5C;&#x7684;&#x903B;&#x8F91;&#x5C01;&#x88C5;&#x5230;&#x4E00;&#x4E2A;<code>getSingle</code>&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x7136;&#x540E;&#x628A;&#x8981;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#x5F53;&#x4F5C;&#x53C2;&#x6570;&#x4F20;&#x5165;&#x8FDB;&#x53BB;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getSingle = function(fn) {
    var result
    return function() {
        result || (result = fn.apply(this, arguments))
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> getSingle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">var</span> result
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        result || (result = fn.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>))
    }
}</code></pre><p>&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x4E0A;&#x9762;&#x5199;&#x7684;&#x521B;&#x5EFA;&#x5F39;&#x7A97;&#x7684;&#x65B9;&#x6CD5;&#x5C31;&#x53EF;&#x4EE5;&#x5B8C;&#x5168;&#x62BD;&#x79BB;&#x51FA;&#x6765;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var createLoginLayer = function() {
    var div = document.createElement(&apos;div&apos;)
    div.innerHTML = &apos;&#x6211;&#x662F;&#x767B;&#x5F55;&#x5F39;&#x7A97;&apos;
    div.style.display = &apos;none&apos;
    document.appendChild(div)
    return div
}

var createSingleLoginLayer = getsingle(createLoginLayer)

document.getElementById(&apos;loginBtn&apos;).onclick = function() {
    var loginLayer = createSingleLoginLayer()
    loginLayer.style.display = &apos;block&apos;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> createLoginLayer = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> div = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;div&apos;</span>)
    div.innerHTML = <span class="hljs-string">&apos;&#x6211;&#x662F;&#x767B;&#x5F55;&#x5F39;&#x7A97;&apos;</span>
    div.style.display = <span class="hljs-string">&apos;none&apos;</span>
    <span class="hljs-built_in">document</span>.appendChild(div)
    <span class="hljs-keyword">return</span> div
}

<span class="hljs-keyword">var</span> createSingleLoginLayer = getsingle(createLoginLayer)

<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;loginBtn&apos;</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> loginLayer = createSingleLoginLayer()
    loginLayer.style.display = <span class="hljs-string">&apos;block&apos;</span>
}</code></pre><p>&#x81F3;&#x6B64;&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;<code>getSingle</code>&#x51FD;&#x6570;&#x6765;&#x5E2E;&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x7684;&#x76EE;&#x7684;&#xFF0C;&#x5E76;&#x4E14;&#x5C06;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x8981;&#x505A;&#x7684;&#x6307;&#x8D23;&#x72EC;&#x7ACB;&#x51FA;&#x6765;&#xFF0C;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x4E92;&#x4E0D;&#x6253;&#x6270;&#x3002;</p><h2 id="articleHeader6">&#x6700;&#x540E;</h2><p>&#x611F;&#x8C22;&#x9605;&#x8BFB;&#x3002;</p><p>&#x535A;&#x5BA2;&#x5730;&#x5740;&#xFF1A;<a href="https://www.lglzy.cn/blog" rel="nofollow noreferrer" target="_blank">https://www.lglzy.cn/blog</a></p><p>&#x90AE;&#x7BB1;&#xFF1A;luogao_lg@sina.com</p><h2 id="articleHeader7">&#x53C2;&#x8003;</h2><p>&#x300A;JavaScript&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x4E0E;&#x5F00;&#x53D1;&#x5B9E;&#x8DF5;&#x300B;&#x2014;&#x2014; &#x66FE;&#x63A2;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS单例模式《JavaScript设计模式与开发实践》阅读笔记

## 原文链接
[https://segmentfault.com/a/1190000015252115](https://segmentfault.com/a/1190000015252115)

