---
title: '微信Webapp开发的各种变态路由需求及解决办法!' 
date: 2018-11-24 2:30:10
hidden: true
slug: ytqsuf84pp8
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x6700;&#x8FD1;&#x5728;&#x4F7F;&#x7528;<code>BUI Webapp</code>&#x5F00;&#x53D1;&#x7684;&#x4E00;&#x4E2A;&#x5C0F;&#x5546;&#x57CE;&#x9879;&#x76EE;&#x5728;&#x5FAE;&#x4FE1;&#x4E0A;&#x9047;&#x5230;&#x4E00;&#x4E9B;&#x5751;&#x53CA;&#x53D8;&#x6001;&#x9700;&#x6C42;, &#x5C42;&#x5C42;&#x6DF1;&#x5165;, &#x6574;&#x7406;&#x4E00;&#x4E0B;&#x7ED9;&#x540E;&#x6765;&#x4EBA;&#x53C2;&#x8003;. &#x4E00;&#x5B9A;&#x6709;&#x4F60;&#x8FD8;&#x4E0D;&#x77E5;&#x9053;&#x7684;!</p><p><span class="img-wrap"><img data-src="/img/bVbdapf?w=380&amp;h=671" src="https://static.alili.tech/img/bVbdapf?w=380&amp;h=671" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">&#x8C03;&#x8BD5;&#x7F13;&#x5B58;</h2><p><strong>&#x95EE;&#x9898;&#x63CF;&#x8FF0;:</strong> &#x5FAE;&#x4FE1;&#x6253;&#x5F00;&#x7684;web&#x9875;&#x9762;&#x9ED8;&#x8BA4;&#x662F;&#x4F1A;&#x7F13;&#x5B58;&#x7684;,&#x8FD9;&#x662F;&#x4E3A;&#x4E86;&#x52A0;&#x8F7D;&#x66F4;&#x5FEB;,&#x672C;&#x6765;&#x662F;&#x597D;&#x4E8B;,&#x4F46;&#x5BF9;&#x4E8E;&#x7528;&#x6765;&#x8C03;&#x8BD5;&#x7684;&#x6211;&#x4EEC;&#x5C31;&#x6BD4;&#x8F83;&#x75DB;&#x82E6;&#x4E86;,&#x6BCF;&#x6BCF;&#x66F4;&#x6539;&#x4E00;&#x4E9B;js,html, &#x5237;&#x65B0;&#x4EE5;&#x540E;,&#x600E;&#x4E48;&#x6837;&#x90FD;&#x53BB;&#x4E0D;&#x6389;.</p><p><strong>&#x89E3;&#x51B3;&#x529E;&#x6CD5;:</strong> &#x6BCF;&#x6B21;&#x4FEE;&#x6539;html &#x5728;&#x540E;&#x9762;&#x589E;&#x52A0;? &#x53C2;&#x6570;, &#x6BCF;&#x6B21;&#x4FEE;&#x6539;js, &#x5728;&#x9875;&#x9762;&#x5F15;&#x5165;&#x7684;&#x65F6;&#x5019;, &#x589E;&#x52A0;&#x95EE;&#x53F7;&#x52A0;&#x65F6;&#x95F4;&#x6233;&#x7684;&#x65B9;&#x5F0F;..&#x4F46;&#x4F9D;&#x7136;&#x5F88;&#x75DB;&#x82E6;.</p><p><code>BUI Webapp</code> &#x7684;&#x5904;&#x7406;&#x65B9;&#x6848;:</p><p><code>index.js</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x53BB;&#x9664;&#x6A21;&#x5757;&#x7F13;&#x5B58;
window.loader = bui.loader({
    cache: false
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code><span class="hljs-comment">// &#x53BB;&#x9664;&#x6A21;&#x5757;&#x7F13;&#x5B58;</span>
<span class="hljs-built_in">window</span>.loader = bui.loader({
    cache: <span class="hljs-keyword">false</span>
})</code></pre><p>&#x5728;&#x8DEF;&#x7531;&#x521D;&#x59CB;&#x5316;&#x4E4B;&#x524D;,&#x5148;&#x53BB;&#x6389;&#x6A21;&#x5757;&#x7684;&#x7F13;&#x5B58;, &#x8FD9;&#x6837;&#x6BCF;&#x6B21;&#x8FDB;&#x5165;&#x9875;&#x9762;,&#x90FD;&#x4F1A;&#x662F;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x811A;&#x672C;, &#x4E5F;&#x5C31;&#x6CA1;&#x6709;&#x7F13;&#x5B58;&#x95EE;&#x9898;&#x4E86;.</p><h2 id="articleHeader2">&#x540E;&#x9000;&#x9875;&#x9762;&#x5237;&#x65B0;</h2><p><strong>&#x95EE;&#x9898;&#x63CF;&#x8FF0;:</strong> &#x8DDF;&#x524D;&#x9762;&#x7684;&#x7F13;&#x5B58;&#x6709;&#x70B9;&#x5173;&#x7CFB;,&#x6B63;&#x5E38;web&#x9875;&#x9762;&#x7B2C;&#x4E00;&#x6B21;&#x52A0;&#x8F7D;&#x4EE5;&#x540E;&#x5C31;&#x4F1A;&#x88AB;&#x7F13;&#x5B58;&#x4E0B;&#x6765;, &#x6240;&#x4EE5;&#x4F60;&#x60F3;&#x8981;&#x540E;&#x9000;&#x5E76;&#x5237;&#x65B0;,&#x90A3;&#x662F;&#x4E0D;&#x597D;&#x5904;&#x7406;&#x7684;.</p><p><code>BUI Webapp</code> &#x7684;&#x5904;&#x7406;&#x65B9;&#x6848;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x65B9;&#x6848;: &#x540E;&#x9000;&#x5168;&#x5C40;&#x5237;&#x65B0;
router.back({
    callback: function(){
        router.refresh()
    }
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-comment">// &#x65B9;&#x6848;: &#x540E;&#x9000;&#x5168;&#x5C40;&#x5237;&#x65B0;</span>
router.back({
    callback: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        router.refresh()
    }
})
</code></pre><h2 id="articleHeader3">&#x540E;&#x9000;&#x5C40;&#x90E8;&#x5237;&#x65B0;</h2><p><strong>&#x95EE;&#x9898;&#x63CF;&#x8FF0;:</strong> &#x5982;&#x679C;&#x8BF4;&#x540E;&#x9000;&#x5237;&#x65B0;&#x8FD8;&#x6BD4;&#x8F83;&#x7B80;&#x5355;,&#x90A3;&#x5982;&#x679C;&#x9875;&#x9762;&#x9700;&#x8981;&#x5C40;&#x90E8;&#x5237;&#x65B0;&#x5462;, &#x5BA2;&#x6237;&#x5C31;&#x4E0D;&#x60F3;&#x51FA;&#x73B0;&#x95EA;&#x767D;.</p><p><code>BUI Webapp</code> &#x7684;&#x5904;&#x7406;&#x65B9;&#x6848;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x65B9;&#x6848;: &#x540E;&#x9000;&#x5C40;&#x90E8;&#x5237;&#x65B0;
router.back({
    callback: function(mod){
        // mod&#x4E3A;&#x540E;&#x9000;&#x4EE5;&#x540E;&#x9875;&#x9762;&#x629B;&#x51FA;&#x6765;&#x7684;&#x6A21;&#x5757;. &#x4F60;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;&#x4F60;&#x7684;&#x5C40;&#x90E8;&#x65B9;&#x6CD5;&#x5904;&#x7406;.
        mod.init()
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-comment">// &#x65B9;&#x6848;: &#x540E;&#x9000;&#x5C40;&#x90E8;&#x5237;&#x65B0;</span>
router.back({
    callback: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(mod)</span></span>{
        <span class="hljs-comment">// mod&#x4E3A;&#x540E;&#x9000;&#x4EE5;&#x540E;&#x9875;&#x9762;&#x629B;&#x51FA;&#x6765;&#x7684;&#x6A21;&#x5757;. &#x4F60;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;&#x4F60;&#x7684;&#x5C40;&#x90E8;&#x65B9;&#x6CD5;&#x5904;&#x7406;.</span>
        mod.init()
    }
})</code></pre><h2 id="articleHeader4">&#x540E;&#x9000;&#x591A;&#x5C42;&#x5237;&#x65B0;</h2><p><strong>&#x95EE;&#x9898;&#x63CF;&#x8FF0;:</strong> &#x6BD4;&#x65B9;&#x5F53;&#x524D;&#x8DEF;&#x7531;&#x72B6;&#x6001;: &#x9996;&#x9875;-&gt;&#x5217;&#x8868;&#x9875;-&gt;&#x8868;&#x5355;&#x9875;-&gt;&#x6210;&#x529F;&#x5931;&#x8D25;--&gt;&#x5217;&#x8868;&#x9875;, <code>&#x6210;&#x529F;&#x5931;&#x8D25;&#x9875;</code>&#x4EE5;&#x540E;&#x8981;&#x8DF3;&#x56DE;<code>&#x5217;&#x8868;&#x9875;</code>.</p><p><code>BUI Webapp</code> &#x7684;&#x5904;&#x7406;&#x65B9;&#x6848;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x65B9;&#x6848;: &#x540E;&#x9000;2&#x5C42;&#x5237;&#x65B0;
router.back({
    index: -2,
    callback: function(mod){
        // mod&#x4E3A;&#x540E;&#x9000;&#x4EE5;&#x540E;&#x5F53;&#x524D;&#x9875;&#x9762;&#x629B;&#x51FA;&#x6765;&#x7684;list&#x6A21;&#x5757;. &#x4F60;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;&#x4F60;&#x7684;&#x5237;&#x65B0;&#x5904;&#x7406;.
        mod.init()
    }
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs fortran"><code>// &#x65B9;&#x6848;: &#x540E;&#x9000;<span class="hljs-number">2</span>&#x5C42;&#x5237;&#x65B0;
router.back({
    <span class="hljs-built_in">index</span>: -<span class="hljs-number">2</span>,
    callback: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(mod)</span></span>{
        // <span class="hljs-built_in">mod</span>&#x4E3A;&#x540E;&#x9000;&#x4EE5;&#x540E;&#x5F53;&#x524D;&#x9875;&#x9762;&#x629B;&#x51FA;&#x6765;&#x7684;list&#x6A21;&#x5757;. &#x4F60;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;&#x4F60;&#x7684;&#x5237;&#x65B0;&#x5904;&#x7406;.
        <span class="hljs-built_in">mod</span>.init()
    }
})
</code></pre><h2 id="articleHeader5">&#x540E;&#x9000;&#x5230;&#x6307;&#x5B9A;&#x9875;&#x9762;</h2><p><strong>&#x95EE;&#x9898;&#x63CF;&#x8FF0;:</strong> &#x5F53;&#x4F60;&#x7684;&#x9875;&#x9762;&#x6709;&#x591A;&#x4E2A;&#x5165;&#x53E3;,&#x5165;&#x53E3;&#x7684;&#x5C42;&#x7EA7;&#x4E0D;&#x4E00;&#x81F4;, &#x901A;&#x8FC7;&#x7D22;&#x5F15;&#x540E;&#x9000;&#x7684;&#x65B9;&#x5F0F;&#x5C31;&#x4E0D;&#x80FD;&#x7528;&#x4E86;,<br>&#x6BD4;&#x65B9;<code>&#x8868;&#x5355;&#x9875;</code>, &#x5165;&#x53E3;1: &#x9996;&#x9875;-&gt;&#x5217;&#x8868;&#x9875;-&gt;&#x8868;&#x5355;&#x9875; &#x5165;&#x53E3;2: &#x9996;&#x9875;-&gt;&#x8868;&#x5355;&#x9875;, &#x8FD9;&#x65F6;&#x8868;&#x5355;&#x9875;&#x7684;&#x540E;&#x9000;&#x600E;&#x6837;&#x624D;&#x80FD;&#x540E;&#x9000;&#x5230;&#x9996;&#x9875;?</p><p><code>BUI Webapp</code> &#x7684;&#x5904;&#x7406;&#x65B9;&#x6848;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x65B9;&#x6848;: &#x901A;&#x8FC7;&#x6307;&#x5B9A;&#x6A21;&#x5757;&#x540D;&#x540E;&#x9000;,&#x6A21;&#x5757;&#x540D;&#x9ED8;&#x8BA4;&#x4E3A;&#x9875;&#x9762;&#x7684;&#x8DEF;&#x5F84;. `main` &#x5219;&#x4E3A;&#x9996;&#x9875;&#x5DF2;&#x7ECF;&#x58F0;&#x660E;&#x7684;&#x9ED8;&#x8BA4;&#x6A21;&#x5757;.
router.back({
    name: &quot;main&quot;,
    callback: function(mod){
        // mod&#x4E3A;&#x540E;&#x9000;&#x4EE5;&#x540E;&#x5F53;&#x524D;&#x9875;&#x9762;&#x629B;&#x51FA;&#x6765;&#x7684;&#x6A21;&#x5757;. &#x4F60;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;&#x4F60;&#x7684;&#x5237;&#x65B0;&#x5904;&#x7406;.
        mod.init()
    }
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-comment">// &#x65B9;&#x6848;: &#x901A;&#x8FC7;&#x6307;&#x5B9A;&#x6A21;&#x5757;&#x540D;&#x540E;&#x9000;,&#x6A21;&#x5757;&#x540D;&#x9ED8;&#x8BA4;&#x4E3A;&#x9875;&#x9762;&#x7684;&#x8DEF;&#x5F84;. `main` &#x5219;&#x4E3A;&#x9996;&#x9875;&#x5DF2;&#x7ECF;&#x58F0;&#x660E;&#x7684;&#x9ED8;&#x8BA4;&#x6A21;&#x5757;.</span>
<span class="hljs-selector-tag">router</span><span class="hljs-selector-class">.back</span>({
    <span class="hljs-attribute">name</span>: <span class="hljs-string">&quot;main&quot;</span>,
    <span class="hljs-attribute">callback</span>: function(mod){
        <span class="hljs-comment">// mod&#x4E3A;&#x540E;&#x9000;&#x4EE5;&#x540E;&#x5F53;&#x524D;&#x9875;&#x9762;&#x629B;&#x51FA;&#x6765;&#x7684;&#x6A21;&#x5757;. &#x4F60;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;&#x4F60;&#x7684;&#x5237;&#x65B0;&#x5904;&#x7406;.</span>
        mod.init()
    }
})
</code></pre><h2 id="articleHeader6">&#x540E;&#x9000;&#x6307;&#x5B9A;&#x9875;&#x9762;&#x5E76;&#x6307;&#x5B9A;&#x7B2C;&#x51E0;&#x4E2A;TAB</h2><p><strong>&#x95EE;&#x9898;&#x63CF;&#x8FF0;:</strong> &#x9996;&#x9875;&#x5E95;&#x90E8;&#x6709;5&#x4E2A;TAB, &#x6211;&#x5728;&#x8868;&#x5355;&#x9875;&#x540E;&#x9000;&#x7684;&#x65F6;&#x5019;,&#x60F3;&#x540E;&#x9000;&#x5230;&#x9996;&#x9875;&#x7B2C;4&#x4E2A;tab-<code>&#x8D2D;&#x7269;&#x8F66;</code> .</p><p><code>BUI Webapp</code> &#x7684;&#x5904;&#x7406;&#x65B9;&#x6848;:<br>main.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="loader.define(function(){
    var pageview = {};
    // slide &#x63A7;&#x4EF6;&#x4E3A;BUI&#x7684;TAB&#x9009;&#x9879;&#x5361;
    pageview.slide = bui.slide();
    pageview.init = function(){}
    
    pageview.init();
    
    // &#x629B;&#x51FA;main&#x6A21;&#x5757;&#x7684;&#x65B9;&#x6CD5;
    return pageview;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>loader.define(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> pageview = {};
    <span class="hljs-comment">// slide &#x63A7;&#x4EF6;&#x4E3A;BUI&#x7684;TAB&#x9009;&#x9879;&#x5361;</span>
    pageview.slide = bui.slide();
    pageview.init = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}
    
    pageview.init();
    
    <span class="hljs-comment">// &#x629B;&#x51FA;main&#x6A21;&#x5757;&#x7684;&#x65B9;&#x6CD5;</span>
    <span class="hljs-keyword">return</span> pageview;
})</code></pre><p>form.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x65B9;&#x6848;: &#x901A;&#x8FC7;&#x6307;&#x5B9A;&#x6A21;&#x5757;&#x540D;&#x540E;&#x9000;,&#x6A21;&#x5757;&#x540D;&#x9ED8;&#x8BA4;&#x4E3A;&#x9875;&#x9762;&#x7684;&#x8DEF;&#x5F84;. `main` &#x5219;&#x4E3A;&#x9996;&#x9875;&#x5DF2;&#x7ECF;&#x58F0;&#x660E;&#x7684;&#x9ED8;&#x8BA4;&#x6A21;&#x5757;.
router.back({
    name: &quot;main&quot;,
    callback: function(mod){
        // mod&#x4E3A;&#x540E;&#x9000;&#x4EE5;&#x540E;&#x5F53;&#x524D;&#x9875;&#x9762;&#x629B;&#x51FA;&#x6765;&#x7684;main&#x6A21;&#x5757;. &#x62FF;&#x5230;slide&#x8C03;&#x7528;&#x63A7;&#x4EF6;&#x7684;to&#x65B9;&#x6CD5;,&#x7D22;&#x5F15;&#x4ECE;0&#x5F00;&#x59CB;.
        mod.slide.to(2);
    }
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs monkey"><code>// &#x65B9;&#x6848;: &#x901A;&#x8FC7;&#x6307;&#x5B9A;&#x6A21;&#x5757;&#x540D;&#x540E;&#x9000;,&#x6A21;&#x5757;&#x540D;&#x9ED8;&#x8BA4;&#x4E3A;&#x9875;&#x9762;&#x7684;&#x8DEF;&#x5F84;. `main` &#x5219;&#x4E3A;&#x9996;&#x9875;&#x5DF2;&#x7ECF;&#x58F0;&#x660E;&#x7684;&#x9ED8;&#x8BA4;&#x6A21;&#x5757;.
router.back({
    name: <span class="hljs-string">&quot;main&quot;</span>,
    callback: <span class="hljs-function"><span class="hljs-keyword">function</span>(</span><span class="hljs-literal">mod</span>){
        // <span class="hljs-literal">mod</span>&#x4E3A;&#x540E;&#x9000;&#x4EE5;&#x540E;&#x5F53;&#x524D;&#x9875;&#x9762;&#x629B;&#x51FA;&#x6765;&#x7684;main&#x6A21;&#x5757;. &#x62FF;&#x5230;slide&#x8C03;&#x7528;&#x63A7;&#x4EF6;&#x7684;<span class="hljs-keyword">to</span>&#x65B9;&#x6CD5;,&#x7D22;&#x5F15;&#x4ECE;<span class="hljs-number">0</span>&#x5F00;&#x59CB;.
        <span class="hljs-literal">mod</span>.slide.<span class="hljs-keyword">to</span>(<span class="hljs-number">2</span>);
    }
})
</code></pre><h2 id="articleHeader7">&#x7269;&#x7406;&#x6309;&#x952E;&#x540E;&#x9000;&#x5237;&#x65B0;</h2><p><strong>&#x95EE;&#x9898;&#x63CF;&#x8FF0;:</strong> &#x5F00;&#x53D1;&#x79FB;&#x52A8;webapp&#x5C11;&#x4E0D;&#x4E86;&#x8981;&#x5BF9;&#x79FB;&#x52A8;&#x7269;&#x7406;&#x6309;&#x952E;&#x7684;&#x76D1;&#x542C;,&#x901A;&#x8FC7;&#x4E0A;&#x9762;&#x7684;&#x65B9;&#x6848;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x6309;&#x94AE;&#x70B9;&#x51FB;&#x7684;&#x65F6;&#x5019;&#x540E;&#x9000;&#x5237;&#x65B0;, &#x800C;&#x7528;&#x6237;&#x5982;&#x679C;&#x70B9;&#x51FB;&#x7684;&#x662F;&#x5B89;&#x5353;&#x7684;&#x7269;&#x7406;&#x540E;&#x9000;&#x6309;&#x952E;&#x5462;?</p><p><code>BUI Webapp</code> &#x7684;&#x5904;&#x7406;&#x65B9;&#x6848;: &#x901A;&#x8FC7;&#x5728;&#x9996;&#x9875;&#x76D1;&#x542C;&#x5168;&#x5C40;&#x540E;&#x9000;&#x4E8B;&#x4EF6;&#x5904;&#x7406;.</p><p>index.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.on(&quot;back&quot;,function(e){
    var nowPid = e.target.pid,
        prevPid = e.prevTarget.pid;
    // &#x5982;&#x679C;&#x540E;&#x9000;&#x5230;&#x9996;&#x9875;&#x5219;&#x5237;&#x65B0;    
    if( nowPid === &quot;main&quot; ){
        // &#x52A0;&#x8F7D;&#x9996;&#x9875;&#x6A21;&#x5757;&#x7684;&#x65B9;&#x6CD5;
        loader.require(nowPid,function(mod){
            mod.init();
        })
    }
    
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code>router.on(<span class="hljs-string">&quot;back&quot;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span></span>{
    <span class="hljs-keyword">var</span> nowPid = e.target.pid,
        prevPid = e.prevTarget.pid;
    <span class="hljs-comment">// &#x5982;&#x679C;&#x540E;&#x9000;&#x5230;&#x9996;&#x9875;&#x5219;&#x5237;&#x65B0;    </span>
    <span class="hljs-keyword">if</span>( nowPid === <span class="hljs-string">&quot;main&quot;</span> ){
        <span class="hljs-comment">// &#x52A0;&#x8F7D;&#x9996;&#x9875;&#x6A21;&#x5757;&#x7684;&#x65B9;&#x6CD5;</span>
        loader.<span class="hljs-keyword">require</span>(nowPid,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(mod)</span></span>{
            mod.init();
        })
    }
    
})
</code></pre><h2 id="articleHeader8">&#x82F9;&#x679C;&#x5FAE;&#x4FE1;&#x7684;&#x5E95;&#x90E8;&#x5BFC;&#x822A;&#x6761;&#x906E;&#x6321;</h2><p><strong>&#x95EE;&#x9898;&#x63CF;&#x8FF0;:</strong> &#x9996;&#x9875;&#x5E95;&#x90E8;&#x6709;4&#x4E2A;TAB,&#x5F53;&#x70B9;&#x51FB;&#x8FDB;&#x5165;&#x7B2C;2&#x4E2A;&#x9875;&#x9762;&#x7684;&#x65F6;&#x5019;, &#x5982;&#x679C;&#x7B2C;2&#x4E2A;&#x9875;&#x9762;&#x4E5F;&#x6709;TAB, &#x4F1A;&#x88AB;&#x5FAE;&#x4FE1;&#x5E95;&#x90E8;&#x7684;&#x5DE5;&#x5177;&#x680F;&#x906E;&#x6321;, &#x8FD9;&#x662F;&#x82F9;&#x679C;&#x7248;&#x5FAE;&#x4FE1;&#x72EC;&#x6709;&#x7684;.</p><p><code>BUI Webapp</code> &#x7684;&#x5904;&#x7406;&#x65B9;&#x6848;: &#x8FD9;&#x4E2A;&#x5751;&#x662F;&#x56E0;&#x4E3A;&#x5386;&#x53F2;&#x8BB0;&#x5F55;&#x5F15;&#x8D77;&#x7684;, &#x9488;&#x5BF9;IOS&#x7684;&#x8DEF;&#x7531;&#x521D;&#x59CB;&#x5316;&#x65F6;&#x53BB;&#x9664;&#x5386;&#x53F2;&#x7EAA;&#x5F55;.</p><p>index.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bui.ready(function () {
    // IOS&#x7248;&#x7684;&#x5FAE;&#x4FE1;,&#x4E0D;&#x9700;&#x8981;&#x540C;&#x6B65;&#x5386;&#x53F2;&#x8BB0;&#x5F55;
    var needHistory = bui.platform.isIos() &amp;&amp; bui.platform.isWeiXin() ? false : true;
    // &#x521D;&#x59CB;&#x5316;&#x8DEF;&#x7531;
    router.init({
        id: &quot;#bui-router&quot;,
        syncHistory: needHistory,
    })
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>bui.ready(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// IOS&#x7248;&#x7684;&#x5FAE;&#x4FE1;,&#x4E0D;&#x9700;&#x8981;&#x540C;&#x6B65;&#x5386;&#x53F2;&#x8BB0;&#x5F55;</span>
    <span class="hljs-keyword">var</span> needHistory = bui.platform.isIos() &amp;&amp; bui.platform.isWeiXin() ? <span class="hljs-literal">false</span> : <span class="hljs-literal">true</span>;
    <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x8DEF;&#x7531;</span>
    router.init({
        id: <span class="hljs-string">&quot;#bui-router&quot;</span>,
        syncHistory: needHistory,
    })
})</code></pre><h2 id="articleHeader9">&#x9875;&#x9762;&#x8DF3;&#x8F6C;&#x5230;&#x6307;&#x5B9A;TAB</h2><p><strong>&#x95EE;&#x9898;&#x63CF;&#x8FF0;:</strong> A&#x9875;&#x9762;&#x6709;2&#x4E2A;&#x6309;&#x94AE;, &#x70B9;&#x51FB;&#x5206;&#x522B;&#x8DF3;&#x8F6C;&#x5230;B&#x9875;&#x9762;&#x7684;2&#x4E2A;TAB&#x9009;&#x9879;&#x5361;.</p><p><code>BUI Webapp</code> &#x7684;&#x5904;&#x7406;&#x65B9;&#x6848;:</p><p>A.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;#btn1&quot;).on(&quot;click&quot;,function(){
    bui.load({
        url: &quot;pages/b.html&quot;,
        param: {
            index: 0
        }
    })
})

$(&quot;#btn2&quot;).on(&quot;click&quot;,function(){
    bui.load({
        url: &quot;pages/b.html&quot;,
        param: {
            index: 1
        }
    })
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code>$(<span class="hljs-string">&quot;#btn1&quot;</span>).<span class="hljs-keyword">on</span>(<span class="hljs-string">&quot;click&quot;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span>{</span>
    bui.load({
        ur<span class="hljs-variable">l:</span> <span class="hljs-string">&quot;pages/b.html&quot;</span>,
        param: {
            <span class="hljs-built_in">index</span>: <span class="hljs-number">0</span>
        }
    })
})

$(<span class="hljs-string">&quot;#btn2&quot;</span>).<span class="hljs-keyword">on</span>(<span class="hljs-string">&quot;click&quot;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span>{</span>
    bui.load({
        ur<span class="hljs-variable">l:</span> <span class="hljs-string">&quot;pages/b.html&quot;</span>,
        param: {
            <span class="hljs-built_in">index</span>: <span class="hljs-number">1</span>
        }
    })
})</code></pre><p>B.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x63A5;&#x6536;&#x9875;&#x9762;&#x4F20;&#x8FC7;&#x6765;&#x7684;&#x53C2;&#x6570;
var param = router.getPageParams();
// &#x521D;&#x59CB;&#x5316;&#x9009;&#x9879;&#x5361;&#x5728;&#x7B2C;&#x51E0;&#x4E2A;
var slide = bui.slide({
    index: param.index || 0,
    ...
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code><span class="hljs-comment">// &#x63A5;&#x6536;&#x9875;&#x9762;&#x4F20;&#x8FC7;&#x6765;&#x7684;&#x53C2;&#x6570;</span>
<span class="hljs-built_in">var</span> param = router.getPageParams();
<span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x9009;&#x9879;&#x5361;&#x5728;&#x7B2C;&#x51E0;&#x4E2A;</span>
<span class="hljs-built_in">var</span> slide = bui.slide({
    index: param.index || <span class="hljs-number">0</span>,
    <span class="hljs-params">...</span>
})
</code></pre><h2 id="articleHeader10">&#x66F4;&#x591A;&#x5410;&#x69FD;</h2><p><strong>&#x6B22;&#x8FCE;&#x4E00;&#x8D77;&#x5410;&#x69FD;&#x4F60;&#x9047;&#x5230;&#x8FC7;&#x7684;&#x53D8;&#x6001;&#x9700;&#x6C42;!!</strong></p><h2 id="articleHeader11">&#x5173;&#x4E8E;BUI Webapp</h2><p><code>BUI Webapp</code>&#x662F;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E;Zeptojs&#x6216;jQuery&#x7684;UI&#x4EA4;&#x4E92;&#x6846;&#x67B6;, &#x4E13;&#x6CE8;Webapp&#x5F00;&#x53D1;, &#x63D0;&#x4F9B;<code>&#x4E30;&#x5BCC;&#x7684;&#x7EC4;&#x4EF6;</code>,&#x7075;&#x6D3B;&#x7684;&#x5B9A;&#x5236;,<code>&#x8D85;&#x591A;&#x7684;&#x6A21;&#x677F;</code>&#x53CA;<code>&#x53C2;&#x8003;&#x6848;&#x4F8B;</code>, &#x5E2E;&#x52A9;&#x5F00;&#x53D1;&#x8005;&#x5FEB;&#x901F;&#x6784;&#x5EFA;Webapp, &#x6700;&#x7EC8;&#x53EF;&#x4EE5;&#x5728;&#x6D4F;&#x89C8;&#x5668;,&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#x8FD0;&#x884C;,&#x4EE5;&#x53CA;&#x7ED3;&#x5408;Dcloud,ApiCloud,Appcan &#x7B49;&#x7B2C;&#x4E09;&#x65B9;&#x5E73;&#x53F0;&#x6253;&#x5305;&#x6210; Hybrid App, &#x5B8C;&#x7F8E;&#x9002;&#x914D;, &#x4E00;&#x6B21;&#x5F00;&#x53D1;, &#x591A;&#x7AEF;&#x8FD0;&#x884C;, &#x5E76;&#x4FDD;&#x6301;&#x4E00;&#x81F4;&#x4F53;&#x9A8C;.</p><p><span class="img-wrap"><img data-src="/img/bVbdagR?w=319&amp;h=568" src="https://static.alili.tech/img/bVbdagR?w=319&amp;h=568" alt="BUI&#x5355;&#x9875;&#x8DEF;&#x7531;" title="BUI&#x5355;&#x9875;&#x8DEF;&#x7531;" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微信Webapp开发的各种变态路由需求及解决办法!

## 原文链接
[https://segmentfault.com/a/1190000015493097](https://segmentfault.com/a/1190000015493097)

