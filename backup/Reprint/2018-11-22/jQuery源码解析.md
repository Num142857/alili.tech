---
title: 'jQuery源码解析' 
date: 2018-11-22 2:30:10
hidden: true
slug: 2o6dhaa9146
categories: [reprint]
---

{{< raw >}}
<p>jQuery &#x662F;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x4F18;&#x79C0;&#x4E14;&#x7ECF;&#x5178;&#x7684;&#x5E93;&#x3002;&#x600E;&#x4E48;&#x5F62;&#x5BB9;&#x5B83;&#x7684;&#x4F18;&#x79C0;&#x5462;&#xFF1F;&#x5373;&#x4F7F;&#x8FD1;&#x4E24;&#x5E74;&#x6D41;&#x884C;&#x4E86;&#x5982; Vue &#x3001; React &#x7B49;&#x4F17;&#x591A;&#x70ED;&#x95E8;&#x7684;&#x5E93;&#xFF0C;&#x4F46;&#x5BF9;&#x4E8E;&#x5C01;&#x88C5;&#x65B9;&#x6CD5;&#x3001;&#x601D;&#x60F3;&#x800C;&#x8A00;&#xFF0C;&#x8FD9;&#x4E9B;&#x5E93;&#x90FD;&#x4E0D;&#x66FE;&#x8D85;&#x8D8A;jQuery&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x5BF9;&#x4E8E;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;&#x800C;&#x8A00;&#xFF0C;&#x9605;&#x8BFB; jQuery &#x6E90;&#x7801;&#x662F;&#x4E00;&#x6761;&#x63D0;&#x5347;&#x81EA;&#x6211;&#x7684;&#x5FC5;&#x7ECF;&#x4E4B;&#x8DEF;&#x3002;&#x90A3;&#x4E48;&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x5C31;&#x8BA9;&#x6211;&#x4EEC;&#x4E00;&#x8D77;&#x8D70;&#x8FDB; jQuery &#x5185;&#x5E55;&#x7684;&#x4E16;&#x754C;&#x3002;</p><h3 id="articleHeader0">&#x4E00;&#x3001;jQuery&#x6E90;&#x7801;&#x76EE;&#x5F55;&#x89E3;&#x6790;</h3><h5>1&#xFF09;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x89E3;&#x6790;</h5><p>&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x4ECE; jQuery &#x6E90;&#x7801;&#x7684; <a href="https://github.com/jquery/jquery" rel="nofollow noreferrer" target="_blank">github</a> &#x4E0A;&#x4E0B;&#x8F7D;&#x5E76;&#x4F7F;&#x7528; vscode &#x6253;&#x5F00; jQuery &#x6E90;&#x7801;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbd8Rc?w=624&amp;h=1106" src="https://static.alili.tech/img/bVbd8Rc?w=624&amp;h=1106" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x6253;&#x5F00; jQuery &#x76EE;&#x5F55;&#xFF0C;&#x53EF;&#x4EE5;&#x5F88;&#x660E;&#x663E;&#x7684;&#x770B;&#x89C1; package.json &#x548C; gruntfile.js &#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x719F;&#x6089; grunt &#x7684;&#x5C0F;&#x4F19;&#x4F34;&#xFF0C;&#x770B;&#x89C1; gruntfile.js &#x5C31;&#x5F88;&#x6E05;&#x695A;&#xFF0C;&#x8BE5;&#x76EE;&#x5F55;&#x4EE3;&#x7801;&#x4F7F;&#x7528;&#x7684;&#x662F; grunt &#x4F5C;&#x4E3A;&#x5176;&#x6784;&#x5EFA;&#x5DE5;&#x5177;&#x3002;</p><ul><li>&#x6211;&#x4EEC;&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x4F7F;&#x7528;&#x6784;&#x5EFA;&#x5DE5;&#x5177;&#x5462;&#xFF1F;</li><li>&#x4E00;&#x53E5;&#x8BDD;&#xFF1A;&#x81EA;&#x52A8;&#x5316;&#x3002;&#x5BF9;&#x4E8E;&#x9700;&#x8981;&#x53CD;&#x590D;&#x91CD;&#x590D;&#x7684;&#x4EFB;&#x52A1;&#xFF0C;&#x4F8B;&#x5982;&#x538B;&#x7F29;&#x3001;&#x7F16;&#x8BD1;&#x3001;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x3001;linting&#x7B49;&#xFF0C;&#x81EA;&#x52A8;&#x5316;&#x5DE5;&#x5177;&#x53EF;&#x4EE5;&#x51CF;&#x8F7B;&#x4F60;&#x7684;&#x52B3;&#x52A8;&#xFF0C;&#x7B80;&#x5316;&#x4F60;&#x7684;&#x5DE5;&#x4F5C;&#x3002;</li><li>&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x4F7F;&#x7528; Grunt &#x5462;&#xFF1F;</li><li>Grunt &#x751F;&#x6001;&#x7CFB;&#x7EDF;&#x975E;&#x5E38;&#x5E9E;&#x5927;&#xFF0C;&#x5E76;&#x4E14;&#x4E00;&#x76F4;&#x5728;&#x589E;&#x957F;&#x3002;&#x7531;&#x4E8E;&#x62E5;&#x6709;&#x6570;&#x91CF;&#x5E9E;&#x5927;&#x7684;&#x63D2;&#x4EF6;&#x53EF;&#x4F9B;&#x9009;&#x62E9;&#xFF0C;&#x56E0;&#x6B64;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x5229;&#x7528; Grunt &#x81EA;&#x52A8;&#x5B8C;&#x6210;&#x4EFB;&#x4F55;&#x4E8B;&#xFF0C;&#x5E76;&#x4E14;&#x82B1;&#x8D39;&#x6700;&#x5C11;&#x7684;&#x4EE3;&#x4EF7;&#x3002;</li></ul><p>&#x6253;&#x5F00;src&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x6587;&#x4EF6;&#x5939;&#x91CC;&#x9762;&#x5C31;&#x662F; jQuery &#x7684;&#x6E90;&#x7801;&#x76EE;&#x5F55;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4ECE;&#x76EE;&#x5F55;&#x6E05;&#x6670;&#x7684;&#x770B;&#x89C1;jQuery&#x7684;&#x5404;&#x4E2A;&#x6A21;&#x5757;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbd8TR?w=316&amp;h=843" src="https://static.alili.tech/img/bVbd8TR?w=316&amp;h=843" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x6253;&#x5F00;src&#x6587;&#x4EF6;&#x5939;&#x4E2D;&#x7684;jquery.js&#xFF0C;&#x5373;&#x53EF;&#x770B;&#x5230; jQuery &#x7684;&#x4EE3;&#x7801;&#x52A0;&#x8F7D;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbd8TV?w=1006&amp;h=763" src="https://static.alili.tech/img/bVbd8TV?w=1006&amp;h=763" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span><br>&#x4ECE;&#x56FE;&#x7247;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x89C1;&#xFF0C;&#x91C7;&#x7528;&#x7684;&#x662F;AMD&#x65B9;&#x5F0F;&#x5B9A;&#x4E49;&#x3002;&#x6211;&#x4EEC;&#x751A;&#x81F3;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4ECE;&#x8BE5;&#x6587;&#x4EF6;&#x770B;&#x51FA; jQuery &#x6709;&#x54EA;&#x4E9B;&#x529F;&#x80FD;&#xFF0C;&#x53EF;&#x4F9B;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x3002;</p><h3 id="articleHeader1">&#x4E8C;&#x3001;jQuery&#x7ECF;&#x5178;&#x7EC6;&#x8282;&#x89E3;&#x6790;</h3><h5>1&#xFF09;&#x7ECF;&#x5178;&#x7EC6;&#x8282;1&#x2014;&#x2014;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;</h5><p>&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4ECE;jquery&#x5B98;&#x7F51;&#xFF0C;&#x4F7F;&#x7528;grunt&#x7F16;&#x8BD1;&#x4E00;&#x4E0B; jQuery &#x6E90;&#x7801;&#x6216;&#x4E0B;&#x8F7D;&#x7F16;&#x8BD1;&#x8FC7;&#x540E;&#x3001;&#x672A;&#x538B;&#x7F29;&#x7248;&#x672C;&#x7684; jQuery &#x3002;&#x82E5;&#x4F7F;&#x7528;grunt&#x7F16;&#x8BD1;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4ECE;dist/jquery.js&#x4E2D;&#xFF0C;&#x770B;&#x5230;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbd81y?w=1382&amp;h=827" src="https://static.alili.tech/img/bVbd81y?w=1382&amp;h=827" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(global, factory){
    ...
})(typeof window !== &quot;undefined&quot; ? window : this, function( window, noGlobal(){...});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs hy"><code>(<span class="hljs-name">function</span>(<span class="hljs-name"><span class="hljs-builtin-name">global</span></span>, factory){
    ...
})(<span class="hljs-name">typeof</span> window !== <span class="hljs-string">&quot;undefined&quot;</span> ? window : this, function( window, noGlobal(){...})<span class="hljs-comment">;</span></code></pre><p>&#x6211;&#x4EEC;&#x5BF9;&#x5176;&#xFF0C;&#x8FDB;&#x884C;&#x4E00;&#x756A;&#x7B80;&#x5316;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(global,factory){
    ...
})(window,funciton(){});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs hy"><code>(<span class="hljs-name">function</span>(<span class="hljs-name"><span class="hljs-builtin-name">global</span></span>,factory){
    ...
})(<span class="hljs-name">window</span>,funciton(){})<span class="hljs-comment">;</span></code></pre><p>&#x8FD9;&#x6837;&#xFF0C;&#x5C31;&#x975E;&#x5E38;&#x4E00;&#x76EE;&#x4E86;&#x7136;&#x4E86;&#xFF0C;&#x8FD9;&#x662F;&#x7ECF;&#x5178;&#x7684;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;&#xFF08;IIFE&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){ ... })()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clojure"><code style="word-break:break-word;white-space:initial">(<span class="hljs-name">function</span>(){ ... })()</code></pre><p><strong>Q</strong>&#xFF1A;&#x91C7;&#x7528;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x6837;&#x505A;&#xFF0C;&#x6709;&#x4EC0;&#x4E48;&#x597D;&#x5904;&#x5462;&#xFF1F;<br><strong>A</strong>&#xFF1A;&#x901A;&#x8FC7;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x533F;&#x540D;&#x51FD;&#x6570;&#xFF0C;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x201C;&#x79C1;&#x6709;&#x201D;&#x7684;&#x547D;&#x540D;&#x7A7A;&#x95F4;&#xFF0C;&#x8BE5;&#x547D;&#x540D;&#x7A7A;&#x95F4;&#x7684;&#x53D8;&#x91CF;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x4E0D;&#x4F1A;&#x7834;&#x574F;&#x6C61;&#x67D3;&#x5168;&#x5C40;&#x7684;&#x547D;&#x540D;&#x7A7A;&#x95F4;&#x3002;&#x6B64;&#x65F6;&#x82E5;&#x662F;&#x60F3;&#x8BBF;&#x95EE;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#xFF0C;&#x5C06;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x4EE5;&#x53C2;&#x6570;&#x5F62;&#x5F0F;&#x4F20;&#x8FDB;&#x53BB;&#x5373;&#x53EF;&#x3002;&#x6B64;&#x5916;&#xFF0C;&#x65B0;&#x4F5C;&#x7528;&#x57DF;&#x5185;&#x5BF9;&#x8C61;&#x60F3;&#x8BBF;&#x95EE;&#x4F20;&#x5165;&#x7684;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x65F6;&#xFF0C;&#x5C31;&#x4E0D;&#x9700;&#x8981;&#x4E00;&#x6B65;&#x4E00;&#x6B65;&#x7684;&#x5F80;&#x4E0A;&#x627E;&#xFF0C;&#x53EF;&#x63D0;&#x9AD8;&#x6548;&#x7387;&#x3002;</p><h5>2&#xFF09;&#x7ECF;&#x5178;&#x7EC6;&#x8282;2&#x2014;&#x2014;init()</h5><p>&#x6211;&#x4EEC;&#x770B;&#x5982;&#x4E0B;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var s = new $(&apos;.test&apos;);
var p = $(&apos;.test&apos;);
console.log(s);
console.log(p);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> s = <span class="hljs-keyword">new</span> $(<span class="hljs-string">&apos;.test&apos;</span>);
<span class="hljs-keyword">var</span> p = $(<span class="hljs-string">&apos;.test&apos;</span>);
<span class="hljs-built_in">console</span>.log(s);
<span class="hljs-built_in">console</span>.log(p);</code></pre><p>&#x6211;&#x4EEC;&#x5F15;&#x5165;&#x4E00;&#x4E0B;jQuery&#xFF0C;&#x5E76;&#x5904;&#x7406;&#x4E00;&#x4E0B;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbd85y?w=1408&amp;h=640" src="https://static.alili.tech/img/bVbd85y?w=1408&amp;h=640" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span><br>&#x4EE4;&#x4EBA;&#x60CA;&#x8BB6;&#x7684;&#x662F;&#xFF0C;new&#x51FA;&#x6765;&#x7684;&#x548C;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#x7684;&#xFF0C;&#x5C45;&#x7136;&#x662F;&#x4E00;&#x6A21;&#x4E00;&#x6837;&#x7684;&#x3002;<br>&#x8FD9;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;<br>&#x8FD9;&#x5C31;&#x6D89;&#x53CA;&#x5230;&#x4E86;jQuery&#x7684;&#x7ECF;&#x5178;&#x7684;init&#x64CD;&#x4F5C;&#xFF1A;</p><p>&#x6211;&#x4EEC;&#x6253;&#x5F00;jQuery&#x76EE;&#x5F55;&#x4E0B;&#x7684;src/core.js&#x6587;&#x4EF6;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x89C1;&#x4E00;&#x6BB5;&#x975E;&#x5E38;&#x7ECF;&#x5178;&#x7684;&#x4EE3;&#x7801;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbd8US?w=1382&amp;h=827" src="https://static.alili.tech/img/bVbd8US?w=1382&amp;h=827" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x4ECE;&#x4E0A;&#x9762;&#x8FD9;&#x5F20;&#x56FE;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4E86;&#x89E3;&#x5230;&#xFF1A;</p><ul><li>&#x7B2C;&#x4E00;&#x4E2A;&#x7EA2;&#x6846;&#xFF1A;&#x8C03;&#x7528; jQuery &#xFF0C;&#x8FD4;&#x56DE;&#x7684;&#x662F;new jQuery.fn.init(selector,context);&#x800C;init&#x65B9;&#x6CD5;&#x88AB;&#x6302;&#x5728;&#x5230;&#x4E86;jQuery.fn&#x4E0A;&#x7684;&#x3002;</li><li>&#x7B2C;&#x4E8C;&#x4E2A;&#x7EA2;&#x6846;&#xFF1A;jQuery.fn = jQuery.prototype = {...};</li></ul><p>[&#x6CE8;]&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x4ECE;src/core/init.js&#x4E2D;&#xFF0C;&#x770B;init&#x662F;&#x5982;&#x4F55;&#x5177;&#x4F53;&#x5B9E;&#x73B0;&#x521D;&#x59CB;&#x5316;&#x7684;&#x3002;</p><p>&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x8BB2;&#x89E3;&#xFF0C;&#x6211;&#x4EEC;&#x5BF9;&#x5176;&#x8FDB;&#x884C;&#x4E00;&#x4E9B;&#x7B80;&#x5316;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//1
jQuery = function( selector, context ) {
    return new jQuery.fn.init( selector, context );
}
//2
jQuery.fn = jQuery.prototype = {
    init:function( selector, context ){
        ...
    }
}
//3
init = jQuery.fn.init = function( selector, context, root ){
    ...
}
init.prototype = jQuery.fn;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-comment">//1</span>
jQuery = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">( selector, context )</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> jQuery.fn.init( selector, context );
}
<span class="hljs-comment">//2</span>
jQuery.fn = jQuery.prototype = {
    init:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">( selector, context )</span></span>{
        ...
    }
}
<span class="hljs-comment">//3</span>
init = jQuery.fn.init = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">( selector, context, root )</span></span>{
    ...
}
init.prototype = jQuery.fn;</code></pre><ul><li>&#x6B65;&#x9AA4;1&#xFF1A;&#x6211;&#x4EEC;&#x4ECE;&#x4EE3;&#x7801;&#x5757;2&#x5F00;&#x59CB;&#x770B;&#xFF0C;jQuery.prototype = jQuery.fn&#xFF0C;&#x4E14;&#x90FD;&#x6302;&#x8F7D;&#x4E86;init()&#x51FD;&#x6570;&#x3002;</li><li>&#x6B65;&#x9AA4;2&#xFF1A;&#x518D;&#x770B;&#x4EE3;&#x7801;&#x5757;3&#xFF0C;jQuery.fn.init.prototype = jQuery.fn&#xFF0C;&#x800C;&#x6211;&#x4EEC;&#x4ECE;&#x6B65;&#x9AA4;1&#x4E2D;&#xFF0C;&#x4E86;&#x89E3;&#x5230;jQuery.prototype = jQuery.fn&#x3002;&#x56E0;&#x6B64;&#xFF0C;jQuery.fn.init.prototype = jQuery.fn = jQuery.prototype&#x3002;</li><li>&#x6B65;&#x9AA4;3&#xFF1A;&#x6700;&#x540E;&#xFF0C;&#x518D;&#x56DE;&#x8FC7;&#x6765;&#x770B;&#x4EE3;&#x7801;&#x5757;1&#xFF0C;function&#x8FD4;&#x56DE;&#x7684;&#x662F;new jQuery.fn.init(..)&#x3002;&#x6211;&#x4EEC;&#x518D;&#x770B;&#x6B65;&#x9AA4;2&#xFF0C;jQuery.fn.init.prototype = jQuery.prototype&#x3002;&#x90A3;&#x4E48;&#xFF0C;new jQuery.fn.init(..)&#x5C31;&#x76F8;&#x5F53;&#x4E8E;function&#x8FD4;&#x56DE;&#x4E86;&#x4E00;&#x4E2A;new jQuery()&#x3002;</li></ul><p><code>&#x9976;&#x4E86;&#x4E00;&#x5927;&#x5708;&#xFF0C;&#x5C31;&#x76F8;&#x5F53;&#x4E8E; jQuery = new JQuery();</code></p><p>Q:&#x90A3;&#x4E48;&#xFF0C;&#x4E3A;&#x5565;&#x8981;&#x7ED5;&#x90A3;&#x4E48;&#x8FDC;&#x5462;&#xFF1F;<br>A:&#x4E3A;&#x4E86;&#x5F97;&#x5230;jQuery&#x539F;&#x578B;&#x94FE;&#x4E0A;&#x7684;&#x65B9;&#x6CD5;&#x3002;</p><p>[&#x7279;&#x522B;&#x6807;&#x6CE8;]&#x5982;&#x679C;&#x4F60;&#x770B;&#x4E86;&#x4E94;&#x904D;&#xFF0C;&#x4F9D;&#x65E7;&#x770B;&#x4E0D;&#x61C2;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#xFF0C;&#x4EA6;&#x6216;&#x5BF9;Q/A&#x6CA1;&#x6709;&#x770B;&#x61C2;&#xFF0C;&#x4F60;&#x53EF;&#x80FD;&#x5BF9;js&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;&#x3001;&#x539F;&#x578B;&#x6A21;&#x5F0F;&#x3001;&#x7EC4;&#x5408;&#x6A21;&#x5F0F;&#x7B49;&#x7684;&#x7406;&#x89E3;&#x8FD8;&#x4E0D;&#x591F;&#x6DF1;&#x523B;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x6233;&#x6211;&#x8FD9;&#x7BC7;<a href="https://segmentfault.com/a/1190000013547498">&#x535A;&#x6587;</a>&#x5B66;&#x4E60;&#x4E00;&#x4E0B;&#xFF0C;&#x4EA6;&#x53EF;&#x7FFB;&#x9605;&#x300A;javascript &#x9AD8;&#x7EA7;&#x7A0B;&#x5E8F;&#x8BBE;&#x8BA1;&#x300B;&#x7B2C;&#x516D;&#x7AE0;-&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7684;&#x7A0B;&#x5E8F;&#x8BBE;&#x8BA1;&#x4E2D;&#x7684;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x90E8;&#x5206;&#x5185;&#x5BB9;&#x3002;</p><h5>3&#xFF09;&#x7ECF;&#x5178;&#x7EC6;&#x8282;3&#x2014;&#x2014;&#x2014;&#x2014;&#x94FE;&#x5F0F;&#x8C03;&#x7528;</h5><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x770B;&#x4E00;&#x6BB5;&#x5B98;&#x65B9;&#x7ED9;&#x7684;jQuery&#x94FE;&#x5F0F;&#x5BF9;&#x8C61;&#x7684;&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//html
&lt;div class=&quot;grandparent&quot;&gt;
    &lt;div class=&quot;parent&quot;&gt;
        &lt;div class=&quot;child&quot;&gt;
           &lt;div class=&quot;subchild&quot;&gt;&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;surrogateParent1&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;surrogateParent2&quot;&gt;&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//html</span>
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;grandparent&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;child&quot;</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;subchild&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;surrogateParent1&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;surrogateParent2&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//js
//return [div.surrogateParent1]
$(&quot;div,parent&quot;).nextAll().first();

//return [div.surrogateParent2]
$(&quot;div.parent&quot;).nextAll().last();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//js</span>
<span class="hljs-comment">//return [div.surrogateParent1]</span>
$(<span class="hljs-string">&quot;div,parent&quot;</span>).nextAll().first();

<span class="hljs-comment">//return [div.surrogateParent2]</span>
$(<span class="hljs-string">&quot;div.parent&quot;</span>).nextAll().last();</code></pre><p>$(&quot;div,parent&quot;).nextAll().first()&#x8FD9;&#x662F;&#x6211;&#x4EEC;&#x4F7F;&#x7528;jQuery&#x65F6;&#xFF0C;&#x7ECF;&#x5E38;&#x4F7F;&#x7528;&#x7684;&#x8C03;&#x7528;&#x65B9;&#x6CD5;&#xFF0C;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x3002;&#x90A3;&#x5B83;&#x662F;&#x5982;&#x4F55;&#x505A;&#x5230;&#x7684;&#x5462;&#xFF1F;&#x6211;&#x4EEC;&#x5148;&#x770B;&#x4E00;&#x773C;&#x8FD9;&#x4E2A;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var test = {
    a:function(){
        console.log(&apos;a&apos;);
    },
    b:function(){
        console.log(&apos;b&apos;);
    },
    c:function(){
        console.log(&apos;c&apos;);
    }
}
test.a().b().c();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> test = {
    <span class="hljs-attr">a</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;a&apos;</span>);
    },
    <span class="hljs-attr">b</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;b&apos;</span>);
    },
    <span class="hljs-attr">c</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;c&apos;</span>);
    }
}
test.a().b().c();</code></pre><p>&#x7ED3;&#x679C;&#x5982;&#x4F55;&#x5462;&#xFF1F;<br><span class="img-wrap"><img data-src="/img/bVbd9tj?w=711&amp;h=307" src="https://static.alili.tech/img/bVbd9tj?w=711&amp;h=307" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span><br>&#x7B54;&#x6848;&#x5F88;&#x660E;&#x663E;&#xFF0C;b()&#x548C;c()&#x662F;&#x65E0;&#x6CD5;&#x8BBF;&#x95EE;&#x7684;&#x3002;jQuery&#x662F;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x5B83;&#x7684;&#x5462;&#xFF1F;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x8FD4;&#x56DE;&#x5B83;&#x672C;&#x8EAB;&#x5373;&#x53EF;&#x3002;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var test = {
    a:function(){
        console.log(&apos;a&apos;);
        return this;
    },
    b:function(){
        console.log(&apos;b&apos;);
        return this;
    },
    c:function(){
        console.log(&apos;c&apos;);
    }
}
test.a().b().c();
//a 
//b 
//c" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> test = {
    <span class="hljs-attr">a</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;a&apos;</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    },
    <span class="hljs-attr">b</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;b&apos;</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    },
    <span class="hljs-attr">c</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;c&apos;</span>);
    }
}
test.a().b().c();
<span class="hljs-comment">//a </span>
<span class="hljs-comment">//b </span>
<span class="hljs-comment">//c</span></code></pre><h5>4&#xFF09;&#x7ECF;&#x5178;&#x7EC6;&#x8282;4&#x2014;&#x2014;&#x2014;&#x2014;&#x95ED;&#x5305;&#x4E0B;&#x7684;&#x91CD;&#x8F7D;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&apos;.test&apos;,&apos;td&apos;)
$([&apos;.test&apos;,&apos;#id&apos;])
$(function(){...})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nimrod"><code>$(&apos;.test&apos;,&apos;td&apos;)
$([&apos;.test&apos;,&apos;<span class="hljs-comment">#id&apos;])</span>
$(function()<span class="hljs-meta">{...}</span>)</code></pre><p>$()&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x53C2;&#x6570;&#x4E0D;&#x540C;&#xFF0C;&#x5C31;&#x6D89;&#x53CA;&#x5230;&#x4E86;&#x51FD;&#x6570;&#x7684;&#x91CD;&#x8F7D;&#x3002;&#x53C2;&#x6570;&#x4E2A;&#x6570;&#x4E0D;&#x7B49;&#xFF0C;&#x7528;&#x4F20;&#x7EDF;js&#x5B9E;&#x73B0;&#x8D77;&#x6765;&#x975E;&#x5E38;&#x56F0;&#x96BE;&#x3002;&#x90A3;&#x4E48;jQuery&#x7A76;&#x7ADF;&#x662F;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x7684;&#x5462;&#xFF1F;</p><p>&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x4E24;&#x6BB5;&#x4EE3;&#x7801;&#xFF0C;&#x9886;&#x609F;&#x5B83;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#xFF1A;<br>&#xFF08;1&#xFF09;&#x9996;&#x5148;&#x6211;&#x4EEC;&#x770B;&#x4E00;&#x4E2A;&#x666E;&#x901A;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function addMethod( object, name, func ) {
    var old = object[name];
    object[name] = function(){
        if(func.length === arguments.length){
            return func.apply(this,arguments);
        }else{
            return old.apply(this,arguments);
        }
    }
}
var people = {
    name:[&quot;a&quot;,&quot;b&quot;,&quot;c&quot;]
}
var find0 = function(){
    return this.name;
}
addMethod(people,&apos;find&apos;,find0);
console.log(people.find());//[&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addMethod</span>(<span class="hljs-params"> object, name, func </span>) </span>{
    <span class="hljs-keyword">var</span> old = object[name];
    object[name] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span>(func.length === <span class="hljs-built_in">arguments</span>.length){
            <span class="hljs-keyword">return</span> func.apply(<span class="hljs-keyword">this</span>,<span class="hljs-built_in">arguments</span>);
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">return</span> old.apply(<span class="hljs-keyword">this</span>,<span class="hljs-built_in">arguments</span>);
        }
    }
}
<span class="hljs-keyword">var</span> people = {
    <span class="hljs-attr">name</span>:[<span class="hljs-string">&quot;a&quot;</span>,<span class="hljs-string">&quot;b&quot;</span>,<span class="hljs-string">&quot;c&quot;</span>]
}
<span class="hljs-keyword">var</span> find0 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
}
addMethod(people,<span class="hljs-string">&apos;find&apos;</span>,find0);
<span class="hljs-built_in">console</span>.log(people.find());<span class="hljs-comment">//[&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]</span></code></pre><p>&#x8C03;&#x7528;people.find&#xFF0C;&#x5C06;find()&#x65B9;&#x6CD5;&#x52A0;&#x5230;&#x4E86;people&#x4E2D;&#xFF0C;&#x8C03;&#x7528;people&#x4E0B;&#x7684;find()&#x65B9;&#x6CD5;&#x540E;&#xFF0C;&#x8FD4;&#x56DE;&#x7684;&#x662F;people.name&#xFF0C;&#x5373;&#xFF1A;[&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]&#x3002;</p><p>&#xFF08;2&#xFF09;&#x6211;&#x4EEC;&#x52A0;&#x4E0A;&#x4E00;&#x4E9B;&#x4EE3;&#x7801;&#xFF0C;&#x5F62;&#x6210;&#x91CD;&#x8F7D;&#xFF0C;&#x518D;&#x6765;&#x770B;&#x770B;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;<br>&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;addMethod(people,&apos;find&apos;,find1)&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function addMethod( object, name, func ) {
    var old = object[name];
    object[name] = function(){
        if(func.length === arguments.length){
            return func.apply(this,arguments);
        }else{
            return old.apply(this,arguments);
        }
    }
}
var people = {
    name:[&quot;a&quot;,&quot;b&quot;,&quot;c&quot;]
}
var find0 = function(){
    return this.name;
}
//&#x65B0;&#x589E;
var find1 = function(name){
    var arr = this.name;
    for(var i = 0;i &lt;= arr.length;i++ ){
        if(arr[i]=name){
            return arr[i];
        }
    }
}
addMethod(people,&apos;find&apos;,find0);
//&#x65B0;&#x589E;
addMethod(people,&apos;find&apos;,find1);
console.log(people.find());//[&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]
console.log(people.find(&quot;a&quot;));//a" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addMethod</span>(<span class="hljs-params"> object, name, func </span>) </span>{
    <span class="hljs-keyword">var</span> old = object[name];
    object[name] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span>(func.length === <span class="hljs-built_in">arguments</span>.length){
            <span class="hljs-keyword">return</span> func.apply(<span class="hljs-keyword">this</span>,<span class="hljs-built_in">arguments</span>);
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">return</span> old.apply(<span class="hljs-keyword">this</span>,<span class="hljs-built_in">arguments</span>);
        }
    }
}
<span class="hljs-keyword">var</span> people = {
    <span class="hljs-attr">name</span>:[<span class="hljs-string">&quot;a&quot;</span>,<span class="hljs-string">&quot;b&quot;</span>,<span class="hljs-string">&quot;c&quot;</span>]
}
<span class="hljs-keyword">var</span> find0 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
}
<span class="hljs-comment">//&#x65B0;&#x589E;</span>
<span class="hljs-keyword">var</span> find1 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-keyword">var</span> arr = <span class="hljs-keyword">this</span>.name;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;i &lt;= arr.length;i++ ){
        <span class="hljs-keyword">if</span>(arr[i]=name){
            <span class="hljs-keyword">return</span> arr[i];
        }
    }
}
addMethod(people,<span class="hljs-string">&apos;find&apos;</span>,find0);
<span class="hljs-comment">//&#x65B0;&#x589E;</span>
addMethod(people,<span class="hljs-string">&apos;find&apos;</span>,find1);
<span class="hljs-built_in">console</span>.log(people.find());<span class="hljs-comment">//[&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]</span>
<span class="hljs-built_in">console</span>.log(people.find(<span class="hljs-string">&quot;a&quot;</span>));<span class="hljs-comment">//a</span></code></pre><p>&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x6267;&#x884C;addMethod&#x65B9;&#x6CD5;&#x662F;&#xFF0C;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x662F;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1&#x3001;object -&gt; people&#xFF0C;name -&gt; find&#xFF0C;func -&gt; find0&#xFF1B;
2&#x3001;old -&gt; people[find]&#xFF0C;&#x4E3A;undefined
3&#x3001;people[find]&#xFF0C;&#x5173;&#x8054;&#x7684;&#x662F;find0" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xl"><code><span class="hljs-number">1</span>&#x3001;<span class="hljs-function"><span class="hljs-title">object</span> -&gt;</span> <span class="hljs-function"><span class="hljs-title">people</span>&#xFF0C;<span class="hljs-keyword">name</span> -&gt;</span> <span class="hljs-function"><span class="hljs-title">find</span>&#xFF0C;func -&gt;</span> find0&#xFF1B;
<span class="hljs-number">2</span>&#x3001;<span class="hljs-function"><span class="hljs-title">old</span> -&gt;</span> people[find]&#xFF0C;&#x4E3A;undefined
<span class="hljs-number">3</span>&#x3001;people[find]&#xFF0C;&#x5173;&#x8054;&#x7684;&#x662F;find0</code></pre><p>&#x5728;&#x7B2C;&#x4E8C;&#x6B21;&#x6267;&#x884C;addMethod&#x65B9;&#x6CD5;&#x662F;&#xFF0C;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x662F;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1&#x3001;object -&gt; people&#xFF0C;name -&gt; find&#xFF0C;func -&gt; find1&#xFF1B;
2&#x3001;old &#x4E3A; object[name]&#xFF0C;&#x5373;&#x4E0A;&#x4E00;&#x6B21;&#x6267;&#x884C;object[name]=function(){..}&#x65F6;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x5173;&#x8054;&#x7684;&#x662F;find0&#x3002;
3&#x3001;people[find]&#xFF0C;&#x5173;&#x8054;&#x7684;&#x662F;find1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nimrod"><code><span class="hljs-number">1</span>&#x3001;<span class="hljs-keyword">object</span> -&gt; people&#xFF0C;name -&gt; find&#xFF0C;func -&gt; find1&#xFF1B;
<span class="hljs-number">2</span>&#x3001;old &#x4E3A; <span class="hljs-keyword">object</span>[name]&#xFF0C;&#x5373;&#x4E0A;&#x4E00;&#x6B21;&#x6267;&#x884C;<span class="hljs-keyword">object</span>[name]=function()<span class="hljs-meta">{..}</span>&#x65F6;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x5173;&#x8054;&#x7684;&#x662F;find0&#x3002;
<span class="hljs-number">3</span>&#x3001;people[find]&#xFF0C;&#x5173;&#x8054;&#x7684;&#x662F;find1</code></pre><p>&#x4E24;&#x6B21;&#x8C03;&#x7528;&#x540E;&#xFF0C;&#x6B64;&#x65F6;&#xFF0C;&#x82E5;&#x8C03;&#x7528;people.find(&quot;a&quot;)&#x7684;&#x8BDD;&#xFF0C;&#x8FC7;&#x7A0B;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1&#x3001;&#x4E24;&#x6B21;addMethod()&#x540E;&#xFF0C;&#x5F62;&#x5F0F;&#x53C2;&#x6570;&#x4E3A;1&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x8C03;&#x7528;people.find(&quot;a&quot;)&#xFF0C;&#x5B9E;&#x9645;&#x53C2;&#x6570;&#x4E3A;1&#x4E2A;&#x53C2;&#x6570;
2&#x3001;&#x5F62;&#x53C2;&#x957F;&#x5EA6;&#x4E0E;&#x5B9E;&#x53C2;&#x957F;&#x5EA6;&#x76F8;&#x7B49;&#xFF0C;&#x8C03;&#x7528;return func.apply(this,arguments)&#xFF0C;&#x5373;find1
3&#x3001;&#x8FD0;&#x884C;find1&#xFF0C;&#x6253;&#x5370;&#x51FA;&#x201C;a&#x201D;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code><span class="hljs-number">1</span>&#x3001;&#x4E24;&#x6B21;addMethod()&#x540E;&#xFF0C;&#x5F62;&#x5F0F;&#x53C2;&#x6570;&#x4E3A;<span class="hljs-number">1</span>&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x8C03;&#x7528;people.find(<span class="hljs-string">&quot;a&quot;</span>)&#xFF0C;&#x5B9E;&#x9645;&#x53C2;&#x6570;&#x4E3A;<span class="hljs-number">1</span>&#x4E2A;&#x53C2;&#x6570;
<span class="hljs-number">2</span>&#x3001;&#x5F62;&#x53C2;&#x957F;&#x5EA6;&#x4E0E;&#x5B9E;&#x53C2;&#x957F;&#x5EA6;&#x76F8;&#x7B49;&#xFF0C;&#x8C03;&#x7528;return func.apply(this,arguments)&#xFF0C;&#x5373;find1
<span class="hljs-number">3</span>&#x3001;&#x8FD0;&#x884C;find1&#xFF0C;&#x6253;&#x5370;&#x51FA;&#x201C;a&#x201D;</code></pre><p>&#x4F60;&#x770B;&#x5230;&#x8FD9;&#xFF0C;&#x662F;&#x5426;&#x4E5F;&#x548C;&#x535A;&#x4E3B;&#x4E00;&#x6837;&#xFF0C;&#x89C9;&#x5F97;&#x8FD9;&#x662F;&#x65E0;&#x6240;&#x5FC5;&#x8981;&#x7684;&#x5462;&#xFF1F;&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x5C31;&#x662F;&#x4EE4;&#x4F60;&#x5174;&#x594B;&#x7684;&#x65F6;&#x523B;&#xFF1A;<br>&#x82E5;&#x8C03;&#x7528;people.find()&#x7684;&#x8BDD;&#xFF0C;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x4F1A;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1&#x3001;&#x4E24;&#x6B21;addMethod()&#x540E;&#xFF0C;&#x5F62;&#x5F0F;&#x53C2;&#x6570;&#x4E3A;1&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x8C03;&#x7528;people.find()&#xFF0C;&#x5B9E;&#x9645;&#x53C2;&#x6570;&#x4E3A;0&#x4E2A;&#x53C2;&#x6570;
2&#x3001;&#x5F62;&#x53C2;&#x957F;&#x5EA6;&#x4E0E;&#x5B9E;&#x53C2;&#x957F;&#x5EA6;&#x4E0D;&#x76F8;&#x7B49;&#xFF0C;&#x5148;&#x8C03;&#x7528;return old.apply(this,arguments)&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x7B2C;&#x4E8C;&#x6B21;&#x8C03;&#x7528;addMethod&#x4E2D;&#x9610;&#x8FF0;&#x4E86;&#xFF0C;&#x5B83;&#x5173;&#x8054;&#x7684;&#x662F;find0&#xFF0C;&#x56E0;&#x800C;&#xFF0C;&#x6B64;&#x65F6;&#x7684;&#x7A0B;&#x5E8F;&#xFF0C;&#x4F1A;&#x518D;&#x6B21;&#x8C03;&#x7528;&#x7B2C;&#x4E00;&#x6B21;addMethod&#x4E2D;&#x65E0;&#x53C2;&#x6570;&#x7684;function(){...}&#xFF0C;&#x5373;find0
3&#x3001;&#x6B64;&#x65F6;&#x7684;&#x5F62;&#x5F0F;&#x53C2;&#x6570;&#x4E3A;0&#x4E2A;&#xFF0C;&#x5B9E;&#x9645;&#x53C2;&#x6570;&#x4E3A;0&#x4E2A;
3&#x3001;&#x8FD0;&#x884C;find0&#xFF0C;&#x6253;&#x5370;&#x51FA;[&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nimrod"><code><span class="hljs-number">1</span>&#x3001;&#x4E24;&#x6B21;addMethod()&#x540E;&#xFF0C;&#x5F62;&#x5F0F;&#x53C2;&#x6570;&#x4E3A;<span class="hljs-number">1</span>&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x8C03;&#x7528;people.find()&#xFF0C;&#x5B9E;&#x9645;&#x53C2;&#x6570;&#x4E3A;<span class="hljs-number">0</span>&#x4E2A;&#x53C2;&#x6570;
<span class="hljs-number">2</span>&#x3001;&#x5F62;&#x53C2;&#x957F;&#x5EA6;&#x4E0E;&#x5B9E;&#x53C2;&#x957F;&#x5EA6;&#x4E0D;&#x76F8;&#x7B49;&#xFF0C;&#x5148;&#x8C03;&#x7528;<span class="hljs-keyword">return</span> old.apply(this,arguments)&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x7B2C;&#x4E8C;&#x6B21;&#x8C03;&#x7528;addMethod&#x4E2D;&#x9610;&#x8FF0;&#x4E86;&#xFF0C;&#x5B83;&#x5173;&#x8054;&#x7684;&#x662F;find0&#xFF0C;&#x56E0;&#x800C;&#xFF0C;&#x6B64;&#x65F6;&#x7684;&#x7A0B;&#x5E8F;&#xFF0C;&#x4F1A;&#x518D;&#x6B21;&#x8C03;&#x7528;&#x7B2C;&#x4E00;&#x6B21;addMethod&#x4E2D;&#x65E0;&#x53C2;&#x6570;&#x7684;function()<span class="hljs-meta">{...}</span>&#xFF0C;&#x5373;find0
<span class="hljs-number">3</span>&#x3001;&#x6B64;&#x65F6;&#x7684;&#x5F62;&#x5F0F;&#x53C2;&#x6570;&#x4E3A;<span class="hljs-number">0</span>&#x4E2A;&#xFF0C;&#x5B9E;&#x9645;&#x53C2;&#x6570;&#x4E3A;<span class="hljs-number">0</span>&#x4E2A;
<span class="hljs-number">3</span>&#x3001;&#x8FD0;&#x884C;find0&#xFF0C;&#x6253;&#x5370;&#x51FA;[<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;b&quot;</span>, <span class="hljs-string">&quot;c&quot;</span>]</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jQuery源码解析

## 原文链接
[https://segmentfault.com/a/1190000015727062](https://segmentfault.com/a/1190000015727062)

