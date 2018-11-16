---
title: 'JavaScript 私有成员' 
date: 2018-11-17 2:30:12
hidden: true
slug: z1ogrtmdjid
categories: reprint
---

{{< raw >}}
<p>Class field declarations for JavaScript&#xFF08;JavaScript &#x7C7B;&#x7684;&#x5B57;&#x6BB5;&#x58F0;&#x660E;&#xFF09;&#x76EE;&#x524D;&#x5DF2;&#x7ECF;&#x8FDB;&#x5165;&#x4E86; stage-3&#xFF0C;&#x5176;&#x4E2D;&#x5305;&#x542B;&#x4E00;&#x9879; OOP &#x5F00;&#x53D1;&#x8005;&#x90FD;&#x5F88;&#x5173;&#x6CE8;&#x7684;&#x5185;&#x5BB9;&#xFF1A;Private fields&#x3002;JavaScript &#x4E00;&#x76F4;&#x6CA1;&#x6709;&#x79C1;&#x6709;&#x6210;&#x5458;&#x5E76;&#x4E0D;&#x662F;&#x6CA1;&#x6709;&#x539F;&#x56E0;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x4E00;&#x63D0;&#x8BAE;&#x7ED9; JavaScript &#x5E26;&#x6765;&#x4E86;&#x65B0;&#x7684;&#x6311;&#x6218;&#x3002;&#x4F46;&#x540C;&#x65F6;&#xFF0C;JavaScript &#x5728; ES2015 &#x53D1;&#x5E03;&#x7684;&#x65F6;&#x5019;&#x5DF2;&#x7ECF;&#x5728;&#x8003;&#x8651;&#x79C1;&#x6709;&#x5316;&#x7684;&#x95EE;&#x9898;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x8981;&#x5B9E;&#x73B0;&#x79C1;&#x6709;&#x6210;&#x5458;&#x4E5F;&#x5E76;&#x975E;&#x6BEB;&#x65E0;&#x57FA;&#x7840;&#x3002;</p><p>&#x7B14;&#x8005;&#x5728;&#x4E13;&#x680F;&#x300A;<a href="http://blog.51cto.com/cloumn/detail/11" rel="nofollow noreferrer" target="_blank">JavaScript &#x5168;&#x6808;&#x5DE5;&#x7A0B;&#x5E08;&#x517B;&#x6210;&#x8BB0;</a>&#x300B;&#x7684;&#x7B2C;&#x56DB;&#x7AE0;&#x8BB2;&#x5230;&#x4E86;&#x539F;&#x578B; OOP &#x5173;&#x7CFB;&#x548C;&#x7EE7;&#x627F; OOP &#x5173;&#x7CFB;&#x7684;&#x5173;&#x952E;&#x533A;&#x522B;&#x3002;&#x4ECA;&#x5929;&#x8FD9;&#x91CC;&#x5C31;&#x7814;&#x7A76;&#x4E00;&#x4E0B; JavaScript &#x79C1;&#x6709;&#x6210;&#x5458;&#x7684;&#x95EE;&#x9898;&#x3002;</p><h2 id="articleHeader0">&#x5751;</h2><p>&#x9996;&#x5148;&#x6316;&#x4E2A;&#x5751; &#x2014;&#x2014; &#x8FD9;&#x662F;&#x4E00;&#x6BB5; JS &#x4EE3;&#x7801;&#xFF0C;<code>BusinessView</code> &#x4E2D;&#x8981;&#x5E72;&#x4E24;&#x4EF6;&#x4E8B;&#x60C5;&#xFF0C;&#x5373;&#x5BF9;&#x8868;&#x5355;&#x548C;&#x5730;&#x56FE;&#x8FDB;&#x884C;&#x5E03;&#x5C40;&#x3002;</p><blockquote>&#x4EE3;&#x8868;&#x5C06; <code>_</code> &#x524D;&#x7F00;&#x7EA6;&#x5B9A;&#x4E3A;&#x79C1;&#x6709;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class BaseView {
    layout() {
        console.log(&quot;BaseView Layout&quot;);
    }
}

class BusinessView extends BaseView  {
    layout() {
        super.layout();
        this._layoutForm();
        this._layoutMap();
    }

    _layoutForm() {
        // ....
    }

    _layoutMap() {
        // ....
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BaseView</span> </span>{
    layout() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;BaseView Layout&quot;</span>);
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BusinessView</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">BaseView</span>  </span>{
    layout() {
        <span class="hljs-keyword">super</span>.layout();
        <span class="hljs-keyword">this</span>._layoutForm();
        <span class="hljs-keyword">this</span>._layoutMap();
    }

    _layoutForm() {
        <span class="hljs-comment">// ....</span>
    }

    _layoutMap() {
        <span class="hljs-comment">// ....</span>
    }
}</code></pre><p>&#x7136;&#x540E;&#xFF0C;&#x7531;&#x4E8E;&#x4E1A;&#x52A1;&#x7684;&#x53D1;&#x5C55;&#xFF0C;&#x53D1;&#x73B0;&#x6709;&#x5F88;&#x591A;&#x89C6;&#x56FE;&#x90FD;&#x5B58;&#x5728;&#x5730;&#x56FE;&#x5E03;&#x5C40;&#x3002;&#x8FD9;&#x91CC;&#x9009;&#x7528;&#x7EE7;&#x627F;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x5B9E;&#x73B0;&#xFF0C;&#x6240;&#x4EE5;&#x4ECE; <code>BusinessView</code> &#x4E2D;&#x628A;&#x5730;&#x56FE;&#x76F8;&#x5173;&#x7684;&#x5185;&#x5BB9;&#x62BD;&#x8C61;&#x6210;&#x4E00;&#x4E2A;&#x57FA;&#x7C7B;&#x53EB; <code>MapView</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MapView extends BaseView {
    layout() {
        super.layout();
        this._layoutMap();
    }

    _layoutMap() {
        console.log(&quot;MapView layout map&quot;);
    }
}

class BusinessView extends MapView {
    layout() {
        super.layout();
        this._layoutForm();
        this._layoutMap();
    }

    _layoutForm() {
        // ....
    }

    _layoutMap() {
        console.log(&quot;BusinessView layout map&quot;);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MapView</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">BaseView</span> </span>{
    layout() {
        <span class="hljs-keyword">super</span>.layout();
        <span class="hljs-keyword">this</span>._layoutMap();
    }

    _layoutMap() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;MapView layout map&quot;</span>);
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BusinessView</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">MapView</span> </span>{
    layout() {
        <span class="hljs-keyword">super</span>.layout();
        <span class="hljs-keyword">this</span>._layoutForm();
        <span class="hljs-keyword">this</span>._layoutMap();
    }

    _layoutForm() {
        <span class="hljs-comment">// ....</span>
    }

    _layoutMap() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;BusinessView layout map&quot;</span>);
    }
}</code></pre><p>&#x4E0A;&#x9762;&#x8FD9;&#x4E24;&#x6BB5;&#x4EE3;&#x7801;&#x662F;&#x5F88;&#x5178;&#x578B;&#x7684;&#x57FA;&#x4E8E;&#x7EE7;&#x627F;&#x7684; OOP &#x601D;&#x60F3;&#xFF0C;&#x672C;&#x610F;&#x662F;&#x671F;&#x671B;&#x5404;&#x4E2A;&#x5C42;&#x6B21;&#x7684;&#x7C7B;&#x90FD;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <code>layout()</code> &#x6765;&#x8FDB;&#x884C;&#x5404;&#x5C42;&#x6B21;&#x5E94;&#x8BE5;&#x8D1F;&#x8D23;&#x7684;&#x5E03;&#x5C40;&#x4EFB;&#x52A1;&#x3002;&#x4F46;&#x7406;&#x60F3;&#x548C;&#x73B0;&#x5B9E;&#x603B;&#x662F;&#x6709;&#x5DEE;&#x8DDD;&#x7684;&#xFF0C;&#x5728; JavaScript &#x4E2D;&#x8FD0;&#x884C;&#x5C31;&#x4F1A;&#x53D1;&#x73B0; <code>BusinessView._layoutMap()</code> &#x88AB;&#x6267;&#x884C;&#x4E86;&#x4E24;&#x6B21;&#xFF0C;&#x800C; <code>MapView._layoutMap()</code> &#x672A;&#x6267;&#x884C;&#x3002;<strong>&#x4E3A;&#x4EC0;&#x4E48;&#xFF1F;</strong></p><h2 id="articleHeader1">&#x865A;&#x51FD;&#x6570;</h2><p>JavaScript &#x4E2D;&#x5982;&#x679C;&#x5728;&#x7956;&#x5148;&#x548C;&#x5B50;&#x5B59;&#x7C7B;&#x4E2D;&#x5B9A;&#x4E49;&#x4E86;&#x76F8;&#x540C;&#x7684;&#x540D;&#x79F0;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x9ED8;&#x8BA4;&#x4F1A;&#x8C03;&#x7528;&#x5B50;&#x5B59;&#x7C7B;&#x4E2D;&#x7684;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x3002;&#x5982;&#x679C;&#x60F3;&#x8C03;&#x7528;&#x7956;&#x5148;&#x7C7B;&#x4E2D;&#x7684;&#x540C;&#x540D;&#x65B9;&#x6CD5;&#xFF0C;&#x9700;&#x8981;&#x5728;&#x5B50;&#x5B59;&#x7C7B;&#x4E2D;&#x901A;&#x8FC7; <code>super.</code> &#x6765;&#x8C03;&#x7528;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x5206;&#x6790;&#x4E00;&#x4E0B;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#xFF1A;</p><p>&#x5728;&#x5B50;&#x7C7B;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5176;&#x7C7B;&#x548C;&#x6240;&#x6709;&#x7956;&#x5148;&#x7C7B;&#x7684;&#x5B9A;&#x4E49;&#x90FD;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x4E86;&#x3002;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;</p><ul><li>&#x8C03;&#x7528; <code>BusinessView.layout()</code></li><li>&#x627E;&#x5230; <code>super.layout()</code>&#xFF0C;&#x5F00;&#x59CB;&#x8C03;&#x7528; <code>MapView.layout()</code></li><li><p><code>MapView.layout()</code> &#x4E2D;&#x8C03;&#x7528;<code>this._layoutMap()</code></p><ul><li>&#x4E8E;&#x662F;&#x4ECE;&#x5F53;&#x524D;&#x5BF9;&#x8C61;&#xFF08;<code>BusinessView</code> &#x5BF9;&#x8C61;&#xFF09;&#x5BFB;&#x627E; <code>_layoutMap()</code></li><li>&#x627E;&#x5230;&#xFF0C;&#x8C03;&#x7528;&#x5B83;</li></ul></li></ul><p>&#x4F60;&#x770B;&#xFF0C;&#x7531;&#x4E8E; <code>BusinessView</code> &#x5B9A;&#x4E49;&#x4E86; <code>_layoutMap</code>&#xFF0C;&#x6240;&#x4EE5;&#x538B;&#x6839;&#x90FD;&#x6CA1;&#x53BB;&#x641C;&#x7D22;&#x539F;&#x578B;&#x94FE;&#x3002;&#x5BF9;&#x7684;&#xFF0C;&#x8FD9;&#x662F;&#x57FA;&#x4E8E;&#x539F;&#x578B;&#x5173;&#x7CFB;&#x7684; OOP &#x7684;&#x5C40;&#x9650;&#x3002;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x770B;&#x770B; C# &#x7684;&#x5904;&#x7406;&#x8FC7;&#x7A0B;&#xFF0C;&#x5C31;&#x4F1A;&#x53D1;&#x73B0;&#x6709;&#x6240;&#x4E0D;&#x540C;</p><ul><li>&#x8C03;&#x7528; <code>BusinessView.layout()</code></li><li>&#x627E;&#x5230; <code>base.layout()</code>&#xFF0C;&#x5F00;&#x59CB;&#x8C03;&#x7528; <code>MapView.layout()</code></li><li><p><code>MapView.layout()</code> &#x4E2D;&#x8C03;&#x7528; <code>this._layoutMap()</code></p><ul><li>&#x5728; <code>MapView</code> &#x4E2D;&#x627E;&#x5230; <code>_layoutMap()</code></li><li><p>&#x68C0;&#x67E5;&#x662F;&#x5426;&#x865A;&#x51FD;&#x6570;</p><ul><li>&#x5982;&#x679C;&#x662F;&#xFF0C;&#x5F80;&#x5B50;&#x7C7B;&#x627E;&#x5230;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x91CD;&#x8F7D;&#xFF08;override&#xFF09;&#x51FD;&#x6570;&#xFF0C;&#x8C03;&#x7528;</li><li>&#x5982;&#x679C;&#x4E0D;&#x662F;&#xFF0C;&#x76F4;&#x63A5;&#x8C03;&#x7528;</li></ul></li></ul></li></ul><p>&#x53D1;&#x73B0;&#x533A;&#x522B;&#x4E86;&#x5417;&#xFF1F;&#x5173;&#x952E;&#x662F;&#x5728;&#x4E8E;&#x5224;&#x65AD;&#x201C;&#x865A;&#x51FD;&#x6570;&#x201D;&#x3002;</p><p>&#x7136;&#x800C;&#xFF0C;&#x8FD9;&#x8DDF;&#x79C1;&#x6709;&#x6210;&#x5458;&#x53C8;&#x6709;&#x4EC0;&#x4E48;&#x5173;&#x7CFB;&#x5462;&#xFF1F;&#x56E0;&#x4E3A;&#x79C1;&#x6709;&#x51FD;&#x6570;&#x80AF;&#x5B9A;&#x4E0D;&#x662F;&#x865A;&#x51FD;&#x6570;&#xFF0C;&#x6240;&#x4EE5;&#x5728; C# &#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x5C06; <code>_layoutMap</code> &#x5B9A;&#x4E49;&#x4E3A;&#x79C1;&#x6709;&#xFF0C;&#x90A3; <code>MapView.layout()</code> &#x8C03;&#x7528;&#x7684;&#x5C31;&#x4E00;&#x5B9A;&#x662F; <code>MapView._layoutMap()</code>&#x3002;</p><blockquote>&#x865A;&#x51FD;&#x6570;&#x7684;&#x6982;&#x5FF5;&#x6709;&#x70B9;&#x5C0F;&#x590D;&#x6742;&#x3002;&#x4E0D;&#x8FC7;&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x7406;&#x89E3;&#x4E3A;&#xFF0C;&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x6210;&#x5458;&#x65B9;&#x6CD5;&#x88AB;&#x58F0;&#x660E;&#x4E3A;&#x865A;&#x51FD;&#x6570;&#xFF0C;&#x5728;&#x8C03;&#x7528;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x4F1A;&#x5EF6;&#x7740;&#x5176;&#x865A;&#x51FD;&#x6570;&#x94FE;&#x627E;&#x5230;&#x6700;&#x540E;&#x7684;&#x91CD;&#x8F7D;&#x6765;&#x8FDB;&#x884C;&#x8C03;&#x7528;&#x3002;</blockquote><p>JavaScript &#x4E2D;&#x867D;&#x7136;&#x7EA6;&#x5B9A; <code>_</code> &#x524D;&#x7F00;&#x7684;&#x662F;&#x79C1;&#x6709;&#xFF0C;&#x90A3;&#x4E5F;&#x53EA;&#x662F;&#x541B;&#x5B50;&#x4E4B;&#x7EA6;&#xFF0C;&#x5B83;&#x5B9E;&#x8D28;&#x4E0A;&#x4ECD;&#x7136;&#x4E0D;&#x662F;&#x79C1;&#x6709;&#x3002;&#x541B;&#x5B50;&#x4E4B;&#x7EA6;&#x5BF9;&#x4EBA;&#x6709;&#x6548;&#xFF0C;&#x8BA1;&#x7B97;&#x673A;&#x53C8;&#x4E0D;&#x77E5;&#x9053;&#x4F60;&#x6709;&#x8FD9;&#x4E2A;&#x7EA6;&#x5B9A;&#x2026;&#x2026;&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x5982;&#x679C; JavaScript &#x771F;&#x7684;&#x5B9E;&#x73B0;&#x4E86;&#x79C1;&#x6709;&#x6210;&#x5458;&#xFF0C;&#x90A3;&#x4E48;&#x8BA1;&#x7B97;&#x673A;&#x5C31;&#x77E5;&#x9053;&#x4E86;&#xFF0C;<code>_layoutMap()</code> &#x662F;&#x4E2A;&#x79C1;&#x6709;&#x65B9;&#x6CD5;&#xFF0C;&#x5E94;&#x8BE5;&#x8C03;&#x7528;&#x672C;&#x7C7B;&#x4E2D;&#x7684;&#x5B9A;&#x4E49;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x53BB;&#x5BFB;&#x627E;&#x5B50;&#x7C7B;&#x4E2D;&#x7684;&#x5B9A;&#x4E49;&#x3002;</p><h2 id="articleHeader2">&#x89E3;&#x51B3;&#x5F53;&#x4E0B;&#x7684;&#x79C1;&#x6709;&#x5316;&#x95EE;&#x9898;</h2><p>JavaScript &#x5F53;&#x4E0B;&#x6CA1;&#x6709;&#x79C1;&#x6709;&#x6210;&#x5458;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x53C8;&#x9700;&#x8981;&#x5207;&#x65F6;&#x6709;&#x6548;&#x5730;&#x89E3;&#x51B3;&#x79C1;&#x6709;&#x6210;&#x5458;&#x95EE;&#x9898;&#xFF0C;&#x600E;&#x4E48;&#x529E;&#xFF1F;&#x5F53;&#x7136;&#x6709;&#x529E;&#x6CD5;&#xFF0C;&#x7528; <code>Symbol</code> &#x548C;&#x95ED;&#x5305;&#x6765;&#x89E3;&#x51B3;&#x3002;</p><blockquote>&#x6CE8;&#x610F;&#xFF0C;&#x8FD9;&#x91CC;&#x7684;&#x95ED;&#x5305;&#x4E0D;&#x662F;&#x6307;&#x5BFC;&#x5728;&#x51FD;&#x6570;&#x51FD;&#x6570;&#x4E2D;&#x751F;&#x6210;&#x95ED;&#x5305;&#xFF0C;&#x8BF7;&#x7EE7;&#x7EED;&#x5F80;&#x4E0B;&#x770B;</blockquote><p>&#x9996;&#x5148;&#x641E;&#x6E05;&#x695A;&#xFF0C;&#x6211;&#x4EEC;&#x53D8;&#x901A;&#x7684;&#x770B;&#x5F85;&#x8FD9;&#x4E2A;&#x79C1;&#x6709;&#x5316;&#x95EE;&#x9898; &#x2014;&#x2014; &#x5C31;&#x662F;&#x8BA9;&#x7956;&#x5148;&#x7C7B;&#x8C03;&#x7528;&#x8005;&#x5728;&#x8C03;&#x7528;&#x67D0;&#x4E2A;&#x65B9;&#x6CD5;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5B83;&#x4E0D;&#x4F1A;&#x5148;&#x53BB;&#x5B50;&#x7C7B;&#x4E2D;&#x5BFB;&#x627E;&#x3002;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x4ECE;&#x8BED;&#x6CD5;&#x4E0A;&#x89E3;&#x51B3;&#x4E0D;&#x4E86;&#xFF0C;JavaScript &#x5C31;&#x662F;&#x8981;&#x4ECE;&#x5177;&#x4F53;&#x7684;&#x5B9E;&#x4F8B;&#x4ECE;&#x540E;&#x5F80;&#x524D;&#x53BB;&#x5BFB;&#x627E;&#x6307;&#x5B9A;&#x540D;&#x79F0;&#x7684;&#x65B9;&#x6CD5;&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x5982;&#x679C;&#x627E;&#x4E0D;&#x5230;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x540D;&#x5462;&#xFF1F;</p><p>&#x4E4B;&#x6240;&#x4EE5;&#x80FD;&#x627E;&#x5230;&#xFF0C;&#x56E0;&#x4E3A;&#x65B9;&#x6CD5;&#x540D;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x3002;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x5728;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x5185;&#x90FD;&#x8868;&#x793A;&#x7740;&#x540C;&#x6837;&#x7684;&#x610F;&#x4E49;&#x3002;&#x4F46;&#x662F; ES2015 &#x5E26;&#x6765;&#x4E86; <code>Symbol</code>&#xFF0C;&#x5B83;&#x5FC5;&#x987B;&#x5B9E;&#x4F8B;&#x5316;&#xFF0C;&#x800C;&#x4E14;&#x6BCF;&#x6B21;&#x5B9E;&#x4F8B;&#x5316;&#x51FA;&#x6765;&#x4E00;&#x5B9A;&#x4EE3;&#x8868;&#x7740;&#x4E0D;&#x540C;&#x7684;&#x6807;&#x8BC6; &#x2014;&#x2014; &#x5982;&#x679C;&#x6211;&#x4EEC;&#x5C06;&#x7C7B;&#x5B9A;&#x4E49;&#x5728;&#x4E00;&#x4E2A;&#x95ED;&#x5305;&#x4E2D;&#xFF0C;&#x5728;&#x8FD9;&#x4E2A;&#x95ED;&#x5305;&#x4E2D;&#x58F0;&#x660E;&#x4E00;&#x4E2A; <code>Symbol</code>&#xFF0C;&#x7528;&#x5B83;&#x6765;&#x4F5C;&#x4E3A;&#x79C1;&#x6709;&#x6210;&#x5458;&#x7684;&#x540D;&#x79F0;&#xFF0C;&#x95EE;&#x9898;&#x5C31;&#x89E3;&#x51B3;&#x4E86;&#xFF0C;&#x6BD4;&#x5982;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const MapView = (() =&gt; {
    const _layoutMap = Symbol();

    return class MapView extends BaseView {
        layout() {
            super.layout();
            this[_layoutMap]();
        }

        [_layoutMap]() {
            console.log(&quot;MapView layout map&quot;);
        }
    }
})();

const BusinessView = (() =&gt; {
    const _layoutForm = Symbol();
    const _layoutMap = Symbol();

    return class BusinessView extends MapView {
        layout() {
            super.layout();
            this[_layoutForm]();
            this[_layoutMap]();
        }

        [_layoutForm]() {
            // ....
        }

        [_layoutMap]() {
            console.log(&quot;BusinessView layout map&quot;);
        }
    }
})();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> MapView = <span class="hljs-function">(<span class="hljs-params">(</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> _layoutMap = <span class="hljs-built_in">Symbol</span>();

    <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MapView</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">BaseView</span> </span>{
        layout() {
            <span class="hljs-keyword">super</span>.layout();
            <span class="hljs-keyword">this</span>[_layoutMap]();
        }

        [_layoutMap]() {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;MapView layout map&quot;</span>);
        }
    }
})();

<span class="hljs-keyword">const</span> BusinessView = <span class="hljs-function">(<span class="hljs-params">(</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> _layoutForm = <span class="hljs-built_in">Symbol</span>();
    <span class="hljs-keyword">const</span> _layoutMap = <span class="hljs-built_in">Symbol</span>();

    <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BusinessView</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">MapView</span> </span>{
        layout() {
            <span class="hljs-keyword">super</span>.layout();
            <span class="hljs-keyword">this</span>[_layoutForm]();
            <span class="hljs-keyword">this</span>[_layoutMap]();
        }

        [_layoutForm]() {
            <span class="hljs-comment">// ....</span>
        }

        [_layoutMap]() {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;BusinessView layout map&quot;</span>);
        }
    }
})();</code></pre><p>&#x800C;&#x73B0;&#x4EE3;&#x57FA;&#x4E8E;&#x6A21;&#x5757;&#x7684;&#x5B9A;&#x4E49;&#xFF0C;&#x751A;&#x81F3;&#x8FDE;&#x95ED;&#x5305;&#x90FD;&#x53EF;&#x4EE5;&#x7701;&#x4E86;&#xFF08;&#x6A21;&#x5757;&#x7CFB;&#x7EDF;&#x4F1A;&#x81EA;&#x52A8;&#x5C01;&#x95ED;&#x4F5C;&#x7528;&#x57DF;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const _layoutMap = Symbol();

export class MapView extends BaseView {
    layout() {
        super.layout();
        this[_layoutMap]();
    }

    [_layoutMap]() {
        console.log(&quot;MapView layout map&quot;);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> _layoutMap = <span class="hljs-built_in">Symbol</span>();

<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MapView</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">BaseView</span> </span>{
    layout() {
        <span class="hljs-keyword">super</span>.layout();
        <span class="hljs-keyword">this</span>[_layoutMap]();
    }

    [_layoutMap]() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;MapView layout map&quot;</span>);
    }
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const _layoutForm = Symbol();
const _layoutMap = Symbol();

export class BusinessView extends MapView {
    layout() {
        super.layout();
        this[_layoutForm]();
        this[_layoutMap]();
    }

    [_layoutForm]() {
        // ....
    }

    [_layoutMap]() {
        console.log(&quot;BusinessView layout map&quot;);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> _layoutForm = <span class="hljs-built_in">Symbol</span>();
<span class="hljs-keyword">const</span> _layoutMap = <span class="hljs-built_in">Symbol</span>();

<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BusinessView</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">MapView</span> </span>{
    layout() {
        <span class="hljs-keyword">super</span>.layout();
        <span class="hljs-keyword">this</span>[_layoutForm]();
        <span class="hljs-keyword">this</span>[_layoutMap]();
    }

    [_layoutForm]() {
        <span class="hljs-comment">// ....</span>
    }

    [_layoutMap]() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;BusinessView layout map&quot;</span>);
    }
}</code></pre><p>&#x6539;&#x9769;&#x8FC7;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x5C31;&#x53EF;&#x4EE5;&#x6309;&#x9884;&#x671F;&#x8F93;&#x51FA;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="BaseView Layout
MapView layout map
BusinessView layout map" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre><code class="nohighlight">BaseView Layout
MapView layout map
BusinessView layout map</code></pre><h2 id="articleHeader3">&#x540E;&#x8BB0;</h2><p>&#x7B14;&#x8005;&#x5728;&#x591A;&#x5E74;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#x517B;&#x6210;&#x4E86;&#x5206;&#x6790;&#x548C;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#x7684;&#x4E00;&#x7CFB;&#x5217;&#x601D;&#x7EF4;&#x4E60;&#x60EF;&#xFF0C;&#x6240;&#x4EE5;&#x5E38;&#x5E38;&#x53EF;&#x4EE5;&#x8FC5;&#x901F;&#x7684;&#x900F;&#x8FC7;&#x73B0;&#x8C61;&#x770B;&#x5230;&#x9700;&#x8981;&#x89E3;&#x51B3;&#x7684;&#x5B9E;&#x8D28;&#x6027;&#x95EE;&#x9898;&#xFF0C;&#x5E76;&#x57FA;&#x4E8E;&#x73B0;&#x6709;&#x6761;&#x4EF6;&#x6765;&#x89E3;&#x51B3;&#x5B83;&#x3002;&#x786E;&#x5B9E;&#xFF0C;<code>Symbol</code> &#x51FA;&#x73B0;&#x7684;&#x7406;&#x7531;&#x4E4B;&#x4E00;&#x5C31;&#x662F;&#x89E3;&#x51B3;&#x79C1;&#x6709;&#x5316;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x7528;&#x4EE5;&#x53CA;&#x600E;&#x4E48;&#x7528;&#x5C31;&#x9700;&#x8981;&#x53BB;&#x5206;&#x6790;&#x548C;&#x601D;&#x8003;&#x4E86;&#x3002;</p><p>&#x5B66;&#x4E60;&#x53EF;&#x4EE5;&#x8BA9;&#x4EBA;&#x89E3;&#x51B3;&#x76F8;&#x540C;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x601D;&#x8003;&#x53EF;&#x4EE5;&#x8BA9;&#x4EBA;&#x89E3;&#x51B3;&#x76F8;&#x4F3C;&#x7684;&#x95EE;&#x9898;&#x3002;&#x6B22;&#x8FCE;&#x8BFB;&#x8005;&#x4EEC;&#x6765;&#x5B66;&#x4E60;&#x7B14;&#x8005;&#x7684;&#x4E13;&#x680F;&#x300A;<a href="http://blog.51cto.com/cloumn/detail/11" rel="nofollow noreferrer" target="_blank">JavaScript &#x5168;&#x6808;&#x5DE5;&#x7A0B;&#x5E08;&#x517B;&#x6210;&#x8BB0;</a>&#x300B;&#xFF0C;&#x5E76;&#x8DDF;&#x7740;&#x7B14;&#x8005;&#x4E00;&#x8D77;&#x601D;&#x8003;&#x3001;&#x5206;&#x6790;&#x548C;&#x89E3;&#x51B3;&#x8F6F;&#x4EF6;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x82E5;&#x5E72;&#x95EE;&#x9898;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 私有成员

## 原文链接
[https://segmentfault.com/a/1190000015987646](https://segmentfault.com/a/1190000015987646)

