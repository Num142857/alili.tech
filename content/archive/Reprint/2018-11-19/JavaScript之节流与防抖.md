---
title: 'JavaScript之节流与防抖' 
date: 2018-11-19 2:32:04
hidden: true
slug: 3e0mhmbd7tk
categories: [reprint]
---

{{< raw >}}
<p><a href="http://www.wclimb.site/2018/06/12/JavaScript%E4%B9%8B%E8%8A%82%E6%B5%81%E4%B8%8E%E9%98%B2%E6%8A%96/" rel="nofollow noreferrer" target="_blank">&#x4E2A;&#x4EBA;&#x535A;&#x5BA2;&#x539F;&#x6587;&#x5730;&#x5740;</a></p><h1 id="articleHeader0">&#x80CC;&#x666F;</h1><p>&#x6211;&#x4EEC;&#x5728;&#x5F00;&#x53D1;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x4F1A;&#x7ECF;&#x5E38;&#x4F7F;&#x7528;&#x5982;scroll&#x3001;resize&#x3001;touchmove&#x7B49;&#x4E8B;&#x4EF6;&#xFF0C;&#x5982;&#x679C;&#x6B63;&#x5E38;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;&#x7684;&#x8BDD;&#xFF0C;&#x6709;&#x53EF;&#x80FD;&#x5728;&#x5F88;&#x77ED;&#x7684;&#x65F6;&#x95F4;&#x5185;&#x591A;&#x6B21;&#x8FDE;&#x7EED;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#xFF0C;&#x5341;&#x5206;&#x5F71;&#x54CD;&#x6027;&#x80FD;&#x3002;<br>&#x56E0;&#x6B64;&#x9488;&#x5BF9;&#x8FD9;&#x7C7B;&#x4E8B;&#x4EF6;&#x8981;&#x8FDB;&#x884C;&#x8282;&#x6D41;&#x6216;&#x8005;&#x9632;&#x6296;&#x5904;&#x7406;</p><h1 id="articleHeader1">&#x8282;&#x6D41;</h1><p>&#x8282;&#x6D41;&#x7684;&#x610F;&#x601D;&#x662F;&#xFF0C;&#x5728;&#x89C4;&#x5B9A;&#x7684;&#x65F6;&#x95F4;&#x5185;&#x53EA;&#x4F1A;&#x89E6;&#x53D1;&#x4E00;&#x6B21;&#x51FD;&#x6570;&#xFF0C;&#x5982;&#x6211;&#x4EEC;&#x8BBE;&#x7F6E;&#x51FD;&#x6570;<code>500ms</code>&#x89E6;&#x53D1;&#x4E00;&#x6B21;&#xFF0C;&#x4E4B;&#x540E;&#x4F60;&#x65E0;&#x8BBA;&#x4F60;&#x89E6;&#x53D1;&#x4E86;&#x591A;&#x5C11;&#x6B21;&#x51FD;&#x6570;&#xFF0C;&#x5728;&#x8FD9;&#x4E2A;&#x65F6;&#x95F4;&#x5185;&#x4E5F;&#x53EA;&#x4F1A;&#x6709;&#x4E00;&#x6B21;&#x6267;&#x884C;&#x6548;&#x679C;</p><p>&#x5148;&#x6765;&#x770B;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;</p><p><a href="https://codepen.io/wclimb/pen/gKWLpO/" rel="nofollow noreferrer" target="_blank">https://codepen.io/wclimb/pen...</a><button class="btn btn-xs btn-default ml10 preview" data-url="wclimb/pen/gKWLpO/" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><p>&#x6211;&#x4EEC;&#x770B;&#x5230;&#x4F7F;&#x7528;&#x4E86;&#x8282;&#x6D41;&#x7684;&#x5728;<code>1000ms</code>&#x5185;&#x53EA;&#x89E6;&#x53D1;&#x4E86;&#x4E00;&#x6B21;&#xFF0C;&#x800C;&#x6CA1;&#x6709;&#x4F7F;&#x7528;&#x8282;&#x6D41;&#x7684;&#x5219;&#x9891;&#x7E41;&#x89E6;&#x53D1;&#x4E86;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;</p><p>&#x63A5;&#x4E0B;&#x6765;&#x770B;&#x770B;&#x4EE3;&#x7801;&#x5B9E;&#x73B0;<br>v1 &#x7B2C;&#x4E00;&#x6B21;&#x4E0D;&#x89E6;&#x53D1;&#xFF0C;&#x4E0D;&#x4F20;&#x53C2;&#x5B9E;&#x73B0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function throttle(fn,interval){
    var timer;
    return function(){
        if(timer){
            return
        }
        timer = setTimeout(() =&gt; {
            clearTimeout(timer)
            timer = null
            fn()
        }, interval || 1000);
    }   
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttle</span>(<span class="hljs-params">fn,interval</span>)</span>{
    <span class="hljs-keyword">var</span> timer;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span>(timer){
            <span class="hljs-keyword">return</span>
        }
        timer = setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            clearTimeout(timer)
            timer = <span class="hljs-literal">null</span>
            fn()
        }, interval || <span class="hljs-number">1000</span>);
    }   
}</code></pre><p>&#x6548;&#x679C;&#x662F;&#x5B9E;&#x73B0;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x5728;&#x5C1D;&#x8BD5;&#x5728;&#x6267;&#x884C;&#x51FD;&#x6570;&#x91CC;<code>console.log(this)</code>&#xFF0C;&#x7ED3;&#x679C;&#x53D1;&#x73B0;<code>this</code>&#x6307;&#x5411;&#x7684;&#x662F;<code>window</code>&#xFF0C;&#x800C;&#x4E14;&#x8FD8;&#x53D1;&#x73B0;&#x6211;&#x4EEC;&#x4E0D;&#x80FD;&#x4F20;&#x9012;&#x53C2;&#x6570;&#xFF0C;&#x4E0B;&#x9762;&#x5C31;&#x6765;&#x6539;&#x8FDB;&#x4E00;&#x4E0B;</p><p>v2 &#x7B2C;&#x4E00;&#x6B21;&#x89E6;&#x53D1;&#x51FD;&#x6570;&#xFF0C;&#x63A5;&#x6536;&#x53C2;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function throttle(fn,interval){
    var timer,
        isFirst = true;
    return function(){
        var args = arguments,
            that = this;
        if(isFirst){
            fn.apply(that,args)
            return isFirst = false
        }
        if(timer){
            return
        }
        timer = setTimeout(() =&gt; {
            clearTimeout(timer)
            timer = null
            fn.apply(that,args)
        }, interval || 1000);
    }   
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttle</span>(<span class="hljs-params">fn,interval</span>)</span>{
    <span class="hljs-keyword">var</span> timer,
        isFirst = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">arguments</span>,
            that = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">if</span>(isFirst){
            fn.apply(that,args)
            <span class="hljs-keyword">return</span> isFirst = <span class="hljs-literal">false</span>
        }
        <span class="hljs-keyword">if</span>(timer){
            <span class="hljs-keyword">return</span>
        }
        timer = setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            clearTimeout(timer)
            timer = <span class="hljs-literal">null</span>
            fn.apply(that,args)
        }, interval || <span class="hljs-number">1000</span>);
    }   
}</code></pre><h1 id="articleHeader2">&#x9632;&#x6296;</h1><p>&#x9632;&#x6296;&#x7684;&#x610F;&#x601D;&#x662F;&#x65E0;&#x8BBA;&#x4F60;&#x89E6;&#x53D1;&#x591A;&#x5C11;&#x6B21;&#x51FD;&#x6570;&#xFF0C;&#x53EA;&#x4F1A;&#x89E6;&#x53D1;&#x6700;&#x540E;&#x4E00;&#x6B21;&#x51FD;&#x6570;&#x3002;&#x6700;&#x5E38;&#x7528;&#x7684;&#x5C31;&#x662F;&#x5728;&#x8868;&#x5355;&#x63D0;&#x4EA4;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x7528;&#x6237;&#x53EF;&#x80FD;&#x4F1A;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x5185;&#x70B9;&#x51FB;&#x5F88;&#x591A;&#x6B21;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x589E;&#x52A0;&#x9632;&#x6296;&#x5904;&#x7406;&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x6700;&#x540E;&#x4E00;&#x6B21;&#x89E6;&#x53D1;&#x7684;&#x4E8B;&#x4EF6;</p><p>&#x5148;&#x6765;&#x770B;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;</p><p><a href="https://codepen.io/wclimb/pen/pKPeyv/" rel="nofollow noreferrer" target="_blank">https://codepen.io/wclimb/pen...</a><button class="btn btn-xs btn-default ml10 preview" data-url="wclimb/pen/pKPeyv/" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><p>&#x6211;&#x4EEC;&#x770B;&#x5230;&#x4F7F;&#x7528;&#x4E86;&#x9632;&#x6296;&#x7684;&#x65B9;&#x6846;&#xFF0C;&#x65E0;&#x8BBA;&#x4F60;&#x5728;&#x91CC;&#x9762;&#x89E6;&#x53D1;&#x4E86;&#x591A;&#x5C11;&#x6B21;&#x51FD;&#x6570;&#xFF0C;&#x90FD;&#x53EA;&#x4F1A;&#x89E6;&#x53D1;&#x6700;&#x540E;&#x7684;&#x90A3;&#x4E00;&#x6B21;&#x51FD;&#x6570;&#xFF0C;&#x800C;&#x6CA1;&#x6709;&#x4F7F;&#x7528;&#x9632;&#x6296;&#x7684;&#x5219;&#x9891;&#x7E41;&#x89E6;&#x53D1;&#x4E86;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;</p><p>v1 &#x7B2C;&#x4E00;&#x6B21;&#x4E0D;&#x89E6;&#x53D1;&#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function debounce(fn,interval){
    var timer;
    return function(){
        var args = arguments,
            that = this;
        if(timer){
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() =&gt; {
            fn.apply(null,args)
        }, interval || 1000);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">debounce</span>(<span class="hljs-params">fn,interval</span>)</span>{
    <span class="hljs-keyword">var</span> timer;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">arguments</span>,
            that = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">if</span>(timer){
            clearTimeout(timer)
            timer = <span class="hljs-literal">null</span>
        }
        timer = setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            fn.apply(<span class="hljs-literal">null</span>,args)
        }, interval || <span class="hljs-number">1000</span>);
    }
}</code></pre><p>&#x4E0A;&#x9762;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x4ECD;&#x7136;&#x53EF;&#x4EE5;&#x6B63;&#x5E38;&#x6267;&#x884C;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x5E76;&#x6CA1;&#x6709;&#x6307;&#x5B9A;&#x4ED6;&#x7684;<code>this</code></p><p>v2 &#x7B2C;&#x4E00;&#x6B21;&#x5C31;&#x89E6;&#x53D1;&#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function debounce(fn,interval){
    var timer,
        isFirst  = true,
            can = false;
    return function(){
        var args = arguments,
            that = this;
        if(timer){
            clearTimeout(timer)
            timer = null
        }
        if(isFirst){
            fn.apply(that,args)
            isFirst = false
            setTimeout(() =&gt; {
                can = true
            }, interval || 1000);
        }else if(can){
            timer = setTimeout(() =&gt; {
                fn.apply(null,args)
            }, interval || 1000);
        }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">debounce</span>(<span class="hljs-params">fn,interval</span>)</span>{
    <span class="hljs-keyword">var</span> timer,
        isFirst  = <span class="hljs-literal">true</span>,
            can = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">arguments</span>,
            that = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">if</span>(timer){
            clearTimeout(timer)
            timer = <span class="hljs-literal">null</span>
        }
        <span class="hljs-keyword">if</span>(isFirst){
            fn.apply(that,args)
            isFirst = <span class="hljs-literal">false</span>
            setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                can = <span class="hljs-literal">true</span>
            }, interval || <span class="hljs-number">1000</span>);
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(can){
            timer = setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                fn.apply(<span class="hljs-literal">null</span>,args)
            }, interval || <span class="hljs-number">1000</span>);
        }
    }
}</code></pre><p>&#x5982;&#x6709;&#x96F7;&#x540C;&#xFF0C;&#x7EAF;&#x5C5E;&#x6284;&#x6211;&#xFF08;&#x5F00;&#x73A9;&#x7B11;&#xFF09;</p><p>&#x5982;&#x6709;&#x9519;&#x8BEF;&#xFF0C;&#x8FD8;&#x671B;&#x6307;&#x6B63;&#xFF0C;&#x4EC5;&#x4F9B;&#x53C2;&#x8003;</p><p>GitHub&#xFF1A;<a href="https://github.com/wclimb" rel="nofollow noreferrer" target="_blank">wclimb</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript之节流与防抖

## 原文链接
[https://segmentfault.com/a/1190000015833729](https://segmentfault.com/a/1190000015833729)

