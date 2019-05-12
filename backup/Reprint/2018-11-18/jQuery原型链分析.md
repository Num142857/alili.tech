---
title: 'jQuery原型链分析' 
date: 2018-11-18 2:30:10
hidden: true
slug: dfcktlnfeo
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">&#x524D;&#x8A00;</h3><p>&#x81EA;&#x5DF1;&#x642D;&#x5EFA;&#x4E86;&#x4E2A;&#x4EFF;jQuery&#x7684;&#x539F;&#x578B;&#x8BBE;&#x8BA1;&#xFF0C;JQuery&#x7684;&#x539F;&#x578B;&#x8BBE;&#x8BA1;&#x4E5F;&#x662F;&#x6309;&#x8FD9;&#x6837;&#x6765;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x7B80;&#x5355;&#x7684;&#x8BF4;&#x5C31;&#x662F;&#x8BA9;_mJQ.init&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x548C;_mJQ&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x5171;&#x7528;&#xFF0C;&#x7136;&#x540E;new &#x4E00;&#x4E2A;_mJQ.init&#xFF0C;&#x5F88;&#x5BB9;&#x6613;&#x7406;&#x89E3;&#x5427;</p><h3 id="articleHeader1">&#x6B63;&#x6587;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(global, factory) {
    if (typeof global.document === &apos;undefined&apos;) {
        throw new Error(&apos;the environment must have a window Object with document !&apos;)
    }
    // &#x82E5;&#x73AF;&#x5883;&#x5B58;&#x5728;&#x5219;&#x6267;&#x884C;factory
    factory(global);
})(typeof window !== &apos;undefined&apos; ? window : this, function (window) {
    var _mJQ = function (selector) {
        return new _mJQ.init(selector);
    }
    // &#x521D;&#x59CB;&#x5316;
    _mJQ.init = function(selector) {
        // &#x8FDB;&#x884C;selector&#x5339;&#x914D;&#xFF0C;&#x6BD4;&#x5982;class,attr,id&#x7B49;...
        if (selector === &apos;#test&apos;) {
            const elem = document.getElementById(&apos;test&apos;)
            this.elem = elem
            return this
        }
        return this
    }
    // &#x8BA9;init&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x6307;&#x5411;_mJQ&#x7684;&#x539F;&#x578B;
    _mJQ.init.prototype = _mJQ.prototype = {
        // &#x529F;&#x80FD;
        each: function() {
            // &#x5FAA;&#x73AF;
        },
        html: function() {},
        css: function (name, value) {
            console.log(this)
            this.elem.style[name] = value
        }
    }
    // &#x8BBE;&#x7F6E;contructor&#x6307;&#x5411;&#x95EE;&#x9898;
    Object.defineProperty(_mJQ.prototype, &apos;constructor&apos;, {
        enumerable: false,
        value: _mJQ
    })
    // &#x6302;&#x8F7D;&#x5230;window
    window.$ = window.mJQ = _mJQ;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">global, factory</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> global.document === <span class="hljs-string">&apos;undefined&apos;</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;the environment must have a window Object with document !&apos;</span>)
    }
    <span class="hljs-comment">// &#x82E5;&#x73AF;&#x5883;&#x5B58;&#x5728;&#x5219;&#x6267;&#x884C;factory</span>
    factory(global);
})(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> !== <span class="hljs-string">&apos;undefined&apos;</span> ? <span class="hljs-built_in">window</span> : <span class="hljs-keyword">this</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">window</span>) </span>{
    <span class="hljs-keyword">var</span> _mJQ = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">selector</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> _mJQ.init(selector);
    }
    <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;</span>
    _mJQ.init = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">selector</span>) </span>{
        <span class="hljs-comment">// &#x8FDB;&#x884C;selector&#x5339;&#x914D;&#xFF0C;&#x6BD4;&#x5982;class,attr,id&#x7B49;...</span>
        <span class="hljs-keyword">if</span> (selector === <span class="hljs-string">&apos;#test&apos;</span>) {
            <span class="hljs-keyword">const</span> elem = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;test&apos;</span>)
            <span class="hljs-keyword">this</span>.elem = elem
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
        }
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
    }
    <span class="hljs-comment">// &#x8BA9;init&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x6307;&#x5411;_mJQ&#x7684;&#x539F;&#x578B;</span>
    _mJQ.init.prototype = _mJQ.prototype = {
        <span class="hljs-comment">// &#x529F;&#x80FD;</span>
        each: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// &#x5FAA;&#x73AF;</span>
        },
        <span class="hljs-attr">html</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-attr">css</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name, value</span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
            <span class="hljs-keyword">this</span>.elem.style[name] = value
        }
    }
    <span class="hljs-comment">// &#x8BBE;&#x7F6E;contructor&#x6307;&#x5411;&#x95EE;&#x9898;</span>
    <span class="hljs-built_in">Object</span>.defineProperty(_mJQ.prototype, <span class="hljs-string">&apos;constructor&apos;</span>, {
        <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">value</span>: _mJQ
    })
    <span class="hljs-comment">// &#x6302;&#x8F7D;&#x5230;window</span>
    <span class="hljs-built_in">window</span>.$ = <span class="hljs-built_in">window</span>.mJQ = _mJQ;
})</code></pre><h3 id="articleHeader2">&#x6D4B;&#x8BD5;&#x7ED3;&#x679C;</h3><p><span class="img-wrap"><img data-src="/img/bVbeRn1?w=481&amp;h=254" src="https://static.alili.tech/img/bVbeRn1?w=481&amp;h=254" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jQuery原型链分析

## 原文链接
[https://segmentfault.com/a/1190000015895800](https://segmentfault.com/a/1190000015895800)

