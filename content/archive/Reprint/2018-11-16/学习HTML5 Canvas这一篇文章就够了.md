---
title: '学习HTML5 Canvas这一篇文章就够了' 
date: 2018-11-16 2:30:06
hidden: true
slug: a8jp5hlin5s
categories: reprint
---

{{< raw >}}
<blockquote>&#x672C;&#x6587;&#x4F5C;&#x8005;&#x5229;&#x7528;&#x4E00;&#x4E9B;&#x7B80;&#x5355;&#x7684; demo &#x5BF9; Canvas &#x8FDB;&#x884C;&#x4E86;&#x7CFB;&#x7EDF;&#x7684;&#x603B;&#x7ED3;&#xFF0C;&#x53D7;&#x76CA;&#x532A;&#x6D45;&#xFF0C;&#x6BEB;&#x4E0D;&#x5938;&#x5F20;&#x7684;&#x8BF4;&#xFF0C;&#x5B66;&#x4E60; Canvas &#x8FD9;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x5C31;&#x591F;&#x4E86;&#xFF01;</blockquote><h1 id="articleHeader0">&#x4E00;&#x3001;canvas&#x7B80;&#x4ECB;</h1><p>&#x200B; <code>&lt;canvas&gt;</code> &#x662F; <code>HTML5</code> &#x65B0;&#x589E;&#x7684;&#xFF0C;&#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x811A;&#x672C;(&#x901A;&#x5E38;&#x4E3A;<code>JavaScript</code>)&#x5728;&#x5176;&#x4E2D;&#x7ED8;&#x5236;&#x56FE;&#x50CF;&#x7684; <code>HTML</code> &#x5143;&#x7D20;&#x3002;&#x5B83;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x5236;&#x4F5C;&#x7167;&#x7247;&#x96C6;&#x6216;&#x8005;&#x5236;&#x4F5C;&#x7B80;&#x5355;(&#x4E5F;&#x4E0D;&#x662F;&#x90A3;&#x4E48;&#x7B80;&#x5355;)&#x7684;&#x52A8;&#x753B;&#xFF0C;&#x751A;&#x81F3;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x5B9E;&#x65F6;&#x89C6;&#x9891;&#x5904;&#x7406;&#x548C;&#x6E32;&#x67D3;&#x3002;</p><p>&#x200B; &#x5B83;&#x6700;&#x521D;&#x7531;&#x82F9;&#x679C;&#x5185;&#x90E8;&#x4F7F;&#x7528;&#x81EA;&#x5DF1;<code>MacOS X WebKit</code>&#x63A8;&#x51FA;&#xFF0C;&#x4F9B;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x4F7F;&#x7528;&#x50CF;&#x4EEA;&#x8868;&#x76D8;&#x7684;&#x6784;&#x4EF6;&#x548C; <code>Safari</code> &#x6D4F;&#x89C8;&#x5668;&#x4F7F;&#x7528;&#x3002; &#x540E;&#x6765;&#xFF0C;&#x6709;&#x4EBA;&#x901A;&#x8FC7;<code>Gecko</code>&#x5185;&#x6838;&#x7684;&#x6D4F;&#x89C8;&#x5668; (&#x5C24;&#x5176;&#x662F;<code>Mozilla</code>&#x548C;<code>Firefox</code>)&#xFF0C;<code>Opera</code>&#x548C;<code>Chrome</code>&#x548C;&#x8D85;&#x6587;&#x672C;&#x7F51;&#x7EDC;&#x5E94;&#x7528;&#x6280;&#x672F;&#x5DE5;&#x4F5C;&#x7EC4;&#x5EFA;&#x8BAE;&#x4E3A;&#x4E0B;&#x4E00;&#x4EE3;&#x7684;&#x7F51;&#x7EDC;&#x6280;&#x672F;&#x4F7F;&#x7528;&#x8BE5;&#x5143;&#x7D20;&#x3002;</p><p>&#x200B; <code>Canvas</code>&#x662F;&#x7531;<code>HTML</code>&#x4EE3;&#x7801;&#x914D;&#x5408;&#x9AD8;&#x5EA6;&#x548C;&#x5BBD;&#x5EA6;&#x5C5E;&#x6027;&#x800C;&#x5B9A;&#x4E49;&#x51FA;&#x7684;&#x53EF;&#x7ED8;&#x5236;&#x533A;&#x57DF;&#x3002;<code>JavaScript</code>&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x8BE5;&#x533A;&#x57DF;&#xFF0C;&#x7C7B;&#x4F3C;&#x4E8E;&#x5176;&#x4ED6;&#x901A;&#x7528;&#x7684;&#x4E8C;&#x7EF4;<code>API</code>&#xFF0C;&#x901A;&#x8FC7;&#x4E00;&#x5957;&#x5B8C;&#x6574;&#x7684;&#x7ED8;&#x56FE;&#x51FD;&#x6570;&#x6765;&#x52A8;&#x6001;&#x751F;&#x6210;&#x56FE;&#x5F62;&#x3002;</p><p>&#x200B; Mozilla &#x7A0B;&#x5E8F;&#x4ECE; Gecko 1.8 (Firefox 1.5)&#x5F00;&#x59CB;&#x652F;&#x6301; <code>&lt;canvas&gt;</code>, Internet Explorer &#x4ECE;IE9&#x5F00;&#x59CB;<code>&lt;canvas&gt;</code> &#x3002;Chrome&#x548C;Opera 9+ &#x4E5F;&#x652F;&#x6301; <code>&lt;canvas&gt;</code>&#x3002;</p><h1 id="articleHeader1">&#x4E8C;&#x3001;Canvas&#x57FA;&#x672C;&#x4F7F;&#x7528;</h1><h2 id="articleHeader2">2.1 <code>&lt;canvas&gt;</code>&#x5143;&#x7D20;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;canvas id=&quot;tutorial&quot; width=&quot;300&quot; height=&quot;300&quot;&gt;&lt;/canvas&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">canvas</span> id=<span class="hljs-string">&quot;tutorial&quot;</span> <span class="hljs-attribute">width</span>=<span class="hljs-string">&quot;300&quot;</span> height=<span class="hljs-string">&quot;300&quot;</span>&gt;&lt;/canvas&gt;
</code></pre><p>&#x200B; <code>&lt;canvas&gt;</code>&#x770B;&#x8D77;&#x6765;&#x548C;<code>&lt;img&gt;</code>&#x6807;&#x7B7E;&#x4E00;&#x6837;&#xFF0C;&#x53EA;&#x662F; <code>&lt;canvas&gt;</code> &#x53EA;&#x6709;&#x4E24;&#x4E2A;&#x53EF;&#x9009;&#x7684;&#x5C5E;&#x6027; <code>width&#x3001;heigth</code> &#x5C5E;&#x6027;&#xFF0C;&#x800C;&#x6CA1;&#x6709; <code>src&#x3001;alt</code> &#x5C5E;&#x6027;&#x3002;</p><p>&#x200B; &#x5982;&#x679C;&#x4E0D;&#x7ED9;<code>&lt;canvas&gt;</code>&#x8BBE;&#x7F6E;<code>widht&#x3001;height</code>&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x5219;&#x9ED8;&#x8BA4; <code>width</code>&#x4E3A;300&#x3001;<code>height</code>&#x4E3A;150,&#x5355;&#x4F4D;&#x90FD;&#x662F;<code>px</code>&#x3002;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>css</code>&#x5C5E;&#x6027;&#x6765;&#x8BBE;&#x7F6E;&#x5BBD;&#x9AD8;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x5BBD;&#x9AD8;&#x5C5E;&#x6027;&#x548C;&#x521D;&#x59CB;&#x6BD4;&#x4F8B;&#x4E0D;&#x4E00;&#x81F4;&#xFF0C;&#x4ED6;&#x4F1A;&#x51FA;&#x73B0;&#x626D;&#x66F2;&#x3002;&#x6240;&#x4EE5;&#xFF0C;&#x5EFA;&#x8BAE;&#x6C38;&#x8FDC;&#x4E0D;&#x8981;&#x4F7F;&#x7528;<code>css</code>&#x5C5E;&#x6027;&#x6765;&#x8BBE;&#x7F6E;<code>&lt;canvas&gt;</code>&#x7684;&#x5BBD;&#x9AD8;&#x3002;</p><h3 id="articleHeader3">&#x66FF;&#x6362;&#x5185;&#x5BB9;</h3><p>&#x200B; &#x7531;&#x4E8E;&#x67D0;&#x4E9B;&#x8F83;&#x8001;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#xFF08;&#x5C24;&#x5176;&#x662F;IE9&#x4E4B;&#x524D;&#x7684;IE&#x6D4F;&#x89C8;&#x5668;&#xFF09;&#x6216;&#x8005;&#x6D4F;&#x89C8;&#x5668;&#x4E0D;&#x652F;&#x6301;HTML&#x5143;&#x7D20;<code>&lt;canvas&gt;</code>&#xFF0C;&#x5728;&#x8FD9;&#x4E9B;&#x6D4F;&#x89C8;&#x5668;&#x4E0A;&#x4F60;&#x5E94;&#x8BE5;&#x603B;&#x662F;&#x80FD;&#x5C55;&#x793A;&#x66FF;&#x4EE3;&#x5185;&#x5BB9;&#x3002;</p><p>&#x200B; &#x652F;&#x6301;<code>&lt;canvas&gt;</code>&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x53EA;&#x6E32;&#x67D3;<code>&lt;canvas&gt;</code>&#x6807;&#x7B7E;&#xFF0C;&#x800C;&#x5FFD;&#x7565;&#x5176;&#x4E2D;&#x7684;&#x66FF;&#x4EE3;&#x5185;&#x5BB9;&#x3002;&#x4E0D;&#x652F;&#x6301; <code>&lt;canvas&gt;</code> &#x7684;&#x6D4F;&#x89C8;&#x5668;&#x5219; &#x4F1A;&#x76F4;&#x63A5;&#x6E32;&#x67D3;&#x66FF;&#x4EE3;&#x5185;&#x5BB9;&#x3002;</p><blockquote>&#x7528;&#x6587;&#x672C;&#x66FF;&#x6362;&#xFF1A;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;canvas&gt;
    &#x4F60;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x4E0D;&#x652F;&#x6301;canvas,&#x8BF7;&#x5347;&#x7EA7;&#x4F60;&#x7684;&#x6D4F;&#x89C8;&#x5668;
&lt;/canvas&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span>&gt;</span>
    &#x4F60;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x4E0D;&#x652F;&#x6301;canvas,&#x8BF7;&#x5347;&#x7EA7;&#x4F60;&#x7684;&#x6D4F;&#x89C8;&#x5668;
<span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
</code></pre><blockquote>&#x7528; <code>&lt;img&gt;</code> &#x66FF;&#x6362;&#xFF1A;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;canvas&gt;
    &lt;img src=&quot;./&#x7F8E;&#x5973;.jpg&quot; alt=&quot;&quot;&gt; 
&lt;/canvas&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./&#x7F8E;&#x5973;.jpg&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;&quot;</span>&gt;</span> 
<span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
</code></pre><h3 id="articleHeader4">&#x7ED3;&#x675F;&#x6807;&#x7B7E;<code>&lt;/canvas&gt;</code>&#x4E0D;&#x53EF;&#x7701;</h3><p>&#x4E0E; <code>&lt;img&gt;</code>&#x5143;&#x7D20;&#x4E0D;&#x540C;&#xFF0C;<code>&lt;canvas&gt;</code>&#x5143;&#x7D20;<strong>&#x9700;&#x8981;</strong>&#x7ED3;&#x675F;&#x6807;&#x7B7E;(<code>&lt;/canvas&gt;</code>)&#x3002;&#x5982;&#x679C;&#x7ED3;&#x675F;&#x6807;&#x7B7E;&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x5219;&#x6587;&#x6863;&#x7684;&#x5176;&#x4F59;&#x90E8;&#x5206;&#x4F1A;&#x88AB;&#x8BA4;&#x4E3A;&#x662F;&#x66FF;&#x4EE3;&#x5185;&#x5BB9;&#xFF0C;&#x5C06;&#x4E0D;&#x4F1A;&#x663E;&#x793A;&#x51FA;&#x6765;&#x3002;</p><h2 id="articleHeader5">2.2 &#x6E32;&#x67D3;&#x4E0A;&#x4E0B;&#x6587;(Thre Rending Context)</h2><p>&#x200B; <code>&lt;canvas&gt;</code>&#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x56FA;&#x5B9A;&#x5927;&#x5C0F;&#x7684;&#x753B;&#x5E03;&#xFF0C;&#x4F1A;&#x516C;&#x5F00;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A; <strong>&#x6E32;&#x67D3;&#x4E0A;&#x4E0B;&#x6587;</strong>(&#x753B;&#x7B14;)&#xFF0C;&#x4F7F;&#x7528; <strong>&#x6E32;&#x67D3;&#x4E0A;&#x4E0B;&#x6587;</strong>&#x6765;&#x7ED8;&#x5236;&#x548C;&#x5904;&#x7406;&#x8981;&#x5C55;&#x793A;&#x7684;&#x5185;&#x5BB9;&#x3002;</p><p>&#x200B; &#x6211;&#x4EEC;&#x91CD;&#x70B9;&#x7814;&#x7A76; 2D&#x6E32;&#x67D3;&#x4E0A;&#x4E0B;&#x6587;&#x3002; &#x5176;&#x4ED6;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#x6211;&#x4EEC;&#x6682;&#x4E0D;&#x7814;&#x7A76;&#xFF0C;&#x6BD4;&#x5982;&#xFF0C; WebGL&#x4F7F;&#x7528;&#x4E86;&#x57FA;&#x4E8E;OpenGL ES&#x7684;3D&#x4E0A;&#x4E0B;&#x6587; (&#x201C;experimental-webgl&#x201D;) &#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = document.getElementById(&apos;tutorial&apos;);
//&#x83B7;&#x5F97; 2d &#x4E0A;&#x4E0B;&#x6587;&#x5BF9;&#x8C61;
var ctx = canvas.getContext(&apos;2d&apos;);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;tutorial&apos;</span>);
<span class="hljs-comment">//&#x83B7;&#x5F97; 2d &#x4E0A;&#x4E0B;&#x6587;&#x5BF9;&#x8C61;</span>
<span class="hljs-keyword">var</span> ctx = canvas.getContext(<span class="hljs-string">&apos;2d&apos;</span>);
</code></pre><h2 id="articleHeader6">2.3 &#x68C0;&#x6D4B;&#x652F;&#x6301;&#x6027;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = document.getElementById(&apos;tutorial&apos;);

if (canvas.getContext){
  var ctx = canvas.getContext(&apos;2d&apos;);
  // drawing code here
} else {
  // canvas-unsupported code here
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;tutorial&apos;</span>);

<span class="hljs-keyword">if</span> (canvas.getContext){
  <span class="hljs-keyword">var</span> ctx = canvas.getContext(<span class="hljs-string">&apos;2d&apos;</span>);
  <span class="hljs-comment">// drawing code here</span>
} <span class="hljs-keyword">else</span> {
  <span class="hljs-comment">// canvas-unsupported code here</span>
}
</code></pre><h2 id="articleHeader7">2.4 &#x4EE3;&#x7801;&#x6A21;&#x677F;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Canvas tutorial&lt;/title&gt;
    &lt;style type=&quot;text/css&quot;&gt;
        canvas {
            border: 1px solid black;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;canvas id=&quot;tutorial&quot; width=&quot;300&quot; height=&quot;300&quot;&gt;&lt;/canvas&gt;
&lt;/body&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
    function draw(){
        var canvas = document.getElementById(&apos;tutorial&apos;);
        if(!canvas.getContext) return;
        var ctx = canvas.getContext(&quot;2d&quot;);
        //&#x5F00;&#x59CB;&#x4EE3;&#x7801;

    }
    draw();
&lt;/script&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Canvas tutorial<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/css&quot;</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">canvas</span> {
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid black;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;tutorial&quot;</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;300&quot;</span> <span class="hljs-attr">height</span>=<span class="hljs-string">&quot;300&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;tutorial&apos;</span>);
        <span class="hljs-keyword">if</span>(!canvas.getContext) <span class="hljs-keyword">return</span>;
        <span class="hljs-keyword">var</span> ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);
        <span class="hljs-comment">//&#x5F00;&#x59CB;&#x4EE3;&#x7801;</span>

    }
    draw();
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><h2 id="articleHeader8">2.5 &#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x4F8B;&#x5B50;</h2><blockquote>&#x7ED8;&#x5236;&#x4E24;&#x4E2A;&#x957F;&#x65B9;&#x5F62;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Canvas tutorial&lt;/title&gt;
    &lt;style type=&quot;text/css&quot;&gt;
        canvas {
            border: 1px solid black;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;canvas id=&quot;tutorial&quot; width=&quot;300&quot; height=&quot;300&quot;&gt;&lt;/canvas&gt;
&lt;/body&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
    function draw(){
        var canvas = document.getElementById(&apos;tutorial&apos;);
        if(!canvas.getContext) return;
        var ctx = canvas.getContext(&quot;2d&quot;);
        ctx.fillStyle = &quot;rgb(200,0,0)&quot;;
        //&#x7ED8;&#x5236;&#x77E9;&#x5F62;
        ctx.fillRect (10, 10, 55, 50);

        ctx.fillStyle = &quot;rgba(0, 0, 200, 0.5)&quot;;
        ctx.fillRect (30, 30, 55, 50);
    }
    draw();
&lt;/script&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Canvas tutorial<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/css&quot;</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">canvas</span> {
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid black;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;tutorial&quot;</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;300&quot;</span> <span class="hljs-attr">height</span>=<span class="hljs-string">&quot;300&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;tutorial&apos;</span>);
        <span class="hljs-keyword">if</span>(!canvas.getContext) <span class="hljs-keyword">return</span>;
        <span class="hljs-keyword">var</span> ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);
        ctx.fillStyle = <span class="hljs-string">&quot;rgb(200,0,0)&quot;</span>;
        <span class="hljs-comment">//&#x7ED8;&#x5236;&#x77E9;&#x5F62;</span>
        ctx.fillRect (<span class="hljs-number">10</span>, <span class="hljs-number">10</span>, <span class="hljs-number">55</span>, <span class="hljs-number">50</span>);

        ctx.fillStyle = <span class="hljs-string">&quot;rgba(0, 0, 200, 0.5)&quot;</span>;
        ctx.fillRect (<span class="hljs-number">30</span>, <span class="hljs-number">30</span>, <span class="hljs-number">55</span>, <span class="hljs-number">50</span>);
    }
    draw();
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><h1 id="articleHeader9">&#x4E09;&#x3001;&#x7ED8;&#x5236;&#x5F62;&#x72B6;</h1><h2 id="articleHeader10">3.1 &#x6805;&#x683C;<code>(grid)</code>&#x548C;&#x5750;&#x6807;&#x7A7A;&#x95F4;</h2><p>&#x200B; &#x5982;&#x4E0B;&#x56FE;&#x6240;&#x793A;&#xFF0C;<code>canvas</code>&#x5143;&#x7D20;&#x9ED8;&#x8BA4;&#x88AB;&#x7F51;&#x683C;&#x6240;&#x8986;&#x76D6;&#x3002;&#x901A;&#x5E38;&#x6765;&#x8BF4;&#x7F51;&#x683C;&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x5355;&#x5143;&#x76F8;&#x5F53;&#x4E8E;<code>canvas</code>&#x5143;&#x7D20;&#x4E2D;&#x7684;&#x4E00;&#x50CF;&#x7D20;&#x3002;&#x6805;&#x683C;&#x7684;&#x8D77;&#x70B9;&#x4E3A;&#x5DE6;&#x4E0A;&#x89D2;&#xFF08;&#x5750;&#x6807;&#x4E3A;&#xFF08;0,0&#xFF09;&#xFF09;&#x3002;&#x6240;&#x6709;&#x5143;&#x7D20;&#x7684;&#x4F4D;&#x7F6E;&#x90FD;&#x76F8;&#x5BF9;&#x4E8E;&#x539F;&#x70B9;&#x6765;&#x5B9A;&#x4F4D;&#x3002;&#x6240;&#x4EE5;&#x56FE;&#x4E2D;&#x84DD;&#x8272;&#x65B9;&#x5F62;&#x5DE6;&#x4E0A;&#x89D2;&#x7684;&#x5750;&#x6807;&#x4E3A;&#x8DDD;&#x79BB;&#x5DE6;&#x8FB9;&#xFF08;X&#x8F74;&#xFF09;x&#x50CF;&#x7D20;&#xFF0C;&#x8DDD;&#x79BB;&#x4E0A;&#x8FB9;&#xFF08;Y&#x8F74;&#xFF09;y&#x50CF;&#x7D20;&#xFF08;&#x5750;&#x6807;&#x4E3A;&#xFF08;x,y&#xFF09;&#xFF09;&#x3002;</p><p>&#x200B; &#x540E;&#x9762;&#x6211;&#x4EEC;&#x4F1A;&#x6D89;&#x53CA;&#x5230;&#x5750;&#x6807;&#x539F;&#x70B9;&#x7684;&#x5E73;&#x79FB;&#x3001;&#x7F51;&#x683C;&#x7684;&#x65CB;&#x8F6C;&#x4EE5;&#x53CA;&#x7F29;&#x653E;&#x7B49;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000006922114?w=220&amp;h=220" src="https://static.alili.tech/img/remote/1460000006922114?w=220&amp;h=220" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader11">3.2 &#x7ED8;&#x5236;&#x77E9;&#x5F62;</h2><p>&#x200B; <code>&lt;canvas&gt;</code> &#x53EA;&#x652F;&#x6301;&#x4E00;&#x79CD;&#x539F;&#x751F;&#x7684; &#x56FE;&#x5F62;&#x7ED8;&#x5236;&#xFF1A;&#x77E9;&#x5F62;&#x3002;&#x6240;&#x6709;&#x5176;&#x4ED6;&#x56FE;&#x5F62;&#x90FD;&#x81F3;&#x5C11;&#x9700;&#x8981;&#x751F;&#x6210;&#x4E00;&#x79CD;&#x8DEF;&#x5F84;(<code>path</code>)&#x3002;&#x4E0D;&#x8FC7;&#xFF0C;&#x6211;&#x4EEC;&#x62E5;&#x6709;&#x4F17;&#x591A;&#x8DEF;&#x5F84;&#x751F;&#x6210;&#x7684;&#x65B9;&#x6CD5;&#x8BA9;&#x590D;&#x6742;&#x56FE;&#x5F62;&#x7684;&#x7ED8;&#x5236;&#x6210;&#x4E3A;&#x4E86;&#x53EF;&#x80FD;&#x3002;</p><blockquote><code>canvas</code>t &#x63D0;&#x4F9B;&#x4E86;&#x4E09;&#x79CD;&#x65B9;&#x6CD5;&#x7ED8;&#x5236;&#x77E9;&#x5F62;&#xFF1A;</blockquote><ol><li><code>fillRect(x, y, width, height)</code><p>&#x7ED8;&#x5236;&#x4E00;&#x4E2A;&#x586B;&#x5145;&#x7684;&#x77E9;&#x5F62;</p></li><li><code>strockRect(x, y, width, height)</code><p>&#x7ED8;&#x5236;&#x4E00;&#x4E2A;&#x77E9;&#x5F62;&#x7684;&#x8FB9;&#x6846;</p></li><li><code>clearRect(x, y, widh, height)</code><p>&#x6E05;&#x9664;&#x6307;&#x5B9A;&#x7684;&#x77E9;&#x5F62;&#x533A;&#x57DF;&#xFF0C;&#x7136;&#x540E;&#x8FD9;&#x5757;&#x533A;&#x57DF;&#x4F1A;&#x53D8;&#x7684;&#x5B8C;&#x5168;&#x900F;&#x660E;&#x3002;</p></li></ol><p>&#x8BF4;&#x660E;&#xFF1A;</p><p>&#x200B; &#x8FD9;3&#x4E2A;&#x65B9;&#x6CD5;&#x5177;&#x6709;&#x76F8;&#x540C;&#x7684;&#x53C2;&#x6570;&#x3002;</p><p>&#x200B; <code>x, y</code>&#xFF1A;&#x6307;&#x7684;&#x662F;&#x77E9;&#x5F62;&#x7684;&#x5DE6;&#x4E0A;&#x89D2;&#x7684;&#x5750;&#x6807;&#x3002;(&#x76F8;&#x5BF9;&#x4E8E;<code>canvas</code>&#x7684;&#x5750;&#x6807;&#x539F;&#x70B9;)</p><p>&#x200B; <code>width, height</code>&#xFF1A;&#x6307;&#x7684;&#x662F;&#x7ED8;&#x5236;&#x7684;&#x77E9;&#x5F62;&#x7684;&#x5BBD;&#x548C;&#x9AD8;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function draw(){
    var canvas = document.getElementById(&apos;tutorial&apos;);
    if(!canvas.getContext) return;
    var ctx = canvas.getContext(&quot;2d&quot;);
    ctx.fillRect(10, 10, 100, 50);  //&#x7ED8;&#x5236;&#x77E9;&#x5F62;,&#x586B;&#x5145;&#x7684;&#x9ED8;&#x8BA4;&#x989C;&#x8272;&#x4E3A;&#x9ED1;&#x8272;
    ctx.strokeRect(10, 70, 100, 50);  //&#x7ED8;&#x5236;&#x77E9;&#x5F62;&#x8FB9;&#x6846;

}
draw();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;tutorial&apos;</span>);
    <span class="hljs-keyword">if</span>(!canvas.getContext) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">var</span> ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);
    ctx.fillRect(<span class="hljs-number">10</span>, <span class="hljs-number">10</span>, <span class="hljs-number">100</span>, <span class="hljs-number">50</span>);  <span class="hljs-comment">//&#x7ED8;&#x5236;&#x77E9;&#x5F62;,&#x586B;&#x5145;&#x7684;&#x9ED8;&#x8BA4;&#x989C;&#x8272;&#x4E3A;&#x9ED1;&#x8272;</span>
    ctx.strokeRect(<span class="hljs-number">10</span>, <span class="hljs-number">70</span>, <span class="hljs-number">100</span>, <span class="hljs-number">50</span>);  <span class="hljs-comment">//&#x7ED8;&#x5236;&#x77E9;&#x5F62;&#x8FB9;&#x6846;</span>

}
draw();
</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016031118?w=389&amp;h=317" src="https://static.alili.tech/img/remote/1460000016031118?w=389&amp;h=317" alt="" title="" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.clearRect(15, 15, 50, 25);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>ctx.clearRect(<span class="hljs-number">15</span>, <span class="hljs-number">15</span>, <span class="hljs-number">50</span>, <span class="hljs-number">25</span>);
</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016031119" src="https://static.alili.tech/img/remote/1460000016031119" alt="" title="" style="cursor:pointer;display:inline"></span></p><h1 id="articleHeader12">&#x56DB;&#x3001;&#x7ED8;&#x5236;&#x8DEF;&#x5F84;(<code>path</code>)</h1><p>&#x200B; &#x56FE;&#x5F62;&#x7684;&#x57FA;&#x672C;&#x5143;&#x7D20;&#x662F;&#x8DEF;&#x5F84;&#x3002;</p><p>&#x200B; &#x8DEF;&#x5F84;&#x662F;&#x901A;&#x8FC7;&#x4E0D;&#x540C;&#x989C;&#x8272;&#x548C;&#x5BBD;&#x5EA6;&#x7684;&#x7EBF;&#x6BB5;&#x6216;&#x66F2;&#x7EBF;&#x76F8;&#x8FDE;&#x5F62;&#x6210;&#x7684;&#x4E0D;&#x540C;&#x5F62;&#x72B6;&#x7684;&#x70B9;&#x7684;&#x96C6;&#x5408;&#x3002;</p><p>&#x200B; &#x4E00;&#x4E2A;&#x8DEF;&#x5F84;&#xFF0C;&#x751A;&#x81F3;&#x4E00;&#x4E2A;&#x5B50;&#x8DEF;&#x5F84;&#xFF0C;&#x90FD;&#x662F;&#x95ED;&#x5408;&#x7684;&#x3002;</p><blockquote>&#x4F7F;&#x7528;&#x8DEF;&#x5F84;&#x7ED8;&#x5236;&#x56FE;&#x5F62;&#x9700;&#x8981;&#x4E00;&#x4E9B;&#x989D;&#x5916;&#x7684;&#x6B65;&#x9AA4;&#xFF1A;</blockquote><ol><li>&#x521B;&#x5EFA;&#x8DEF;&#x5F84;&#x8D77;&#x59CB;&#x70B9;</li><li>&#x8C03;&#x7528;&#x7ED8;&#x5236;&#x65B9;&#x6CD5;&#x53BB;&#x7ED8;&#x5236;&#x51FA;&#x8DEF;&#x5F84;</li><li>&#x628A;&#x8DEF;&#x5F84;&#x5C01;&#x95ED;</li><li>&#x4E00;&#x65E6;&#x8DEF;&#x5F84;&#x751F;&#x6210;&#xFF0C;&#x901A;&#x8FC7;&#x63CF;&#x8FB9;&#x6216;&#x586B;&#x5145;&#x8DEF;&#x5F84;&#x533A;&#x57DF;&#x6765;&#x6E32;&#x67D3;&#x56FE;&#x5F62;&#x3002;</li></ol><blockquote>&#x4E0B;&#x9762;&#x662F;&#x9700;&#x8981;&#x7528;&#x5230;&#x7684;&#x65B9;&#x6CD5;&#xFF1A;</blockquote><ol><li><code>beginPath()</code><p>&#x65B0;&#x5EFA;&#x4E00;&#x6761;&#x8DEF;&#x5F84;&#xFF0C;&#x8DEF;&#x5F84;&#x4E00;&#x65E6;&#x521B;&#x5EFA;&#x6210;&#x529F;&#xFF0C;&#x56FE;&#x5F62;&#x7ED8;&#x5236;&#x547D;&#x4EE4;&#x88AB;&#x6307;&#x5411;&#x5230;&#x8DEF;&#x5F84;&#x4E0A;&#x751F;&#x6210;&#x8DEF;&#x5F84;</p></li><li><code>moveTo(x, y)</code><p>&#x628A;&#x753B;&#x7B14;&#x79FB;&#x52A8;&#x5230;&#x6307;&#x5B9A;&#x7684;&#x5750;&#x6807;<code>(x, y)</code>&#x3002;&#x76F8;&#x5F53;&#x4E8E;&#x8BBE;&#x7F6E;&#x8DEF;&#x5F84;&#x7684;&#x8D77;&#x59CB;&#x70B9;&#x5750;&#x6807;&#x3002;</p></li><li><code>closePath()</code><p>&#x95ED;&#x5408;&#x8DEF;&#x5F84;&#x4E4B;&#x540E;&#xFF0C;&#x56FE;&#x5F62;&#x7ED8;&#x5236;&#x547D;&#x4EE4;&#x53C8;&#x91CD;&#x65B0;&#x6307;&#x5411;&#x5230;&#x4E0A;&#x4E0B;&#x6587;&#x4E2D;</p></li><li><code>stroke()</code><p>&#x901A;&#x8FC7;&#x7EBF;&#x6761;&#x6765;&#x7ED8;&#x5236;&#x56FE;&#x5F62;&#x8F6E;&#x5ED3;</p></li><li><code>fill()</code><p>&#x901A;&#x8FC7;&#x586B;&#x5145;&#x8DEF;&#x5F84;&#x7684;&#x5185;&#x5BB9;&#x533A;&#x57DF;&#x751F;&#x6210;&#x5B9E;&#x5FC3;&#x7684;&#x56FE;&#x5F62;</p></li></ol><h2 id="articleHeader13">4.1 &#x7ED8;&#x5236;&#x7EBF;&#x6BB5;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function draw(){
    var canvas = document.getElementById(&apos;tutorial&apos;);
    if (!canvas.getContext) return;
    var ctx = canvas.getContext(&quot;2d&quot;);
    ctx.beginPath(); //&#x65B0;&#x5EFA;&#x4E00;&#x6761;path
    ctx.moveTo(50, 50); //&#x628A;&#x753B;&#x7B14;&#x79FB;&#x52A8;&#x5230;&#x6307;&#x5B9A;&#x7684;&#x5750;&#x6807;
    ctx.lineTo(200, 50);  //&#x7ED8;&#x5236;&#x4E00;&#x6761;&#x4ECE;&#x5F53;&#x524D;&#x4F4D;&#x7F6E;&#x5230;&#x6307;&#x5B9A;&#x5750;&#x6807;(200, 50)&#x7684;&#x76F4;&#x7EBF;.
    //&#x95ED;&#x5408;&#x8DEF;&#x5F84;&#x3002;&#x4F1A;&#x62C9;&#x4E00;&#x6761;&#x4ECE;&#x5F53;&#x524D;&#x70B9;&#x5230;path&#x8D77;&#x59CB;&#x70B9;&#x7684;&#x76F4;&#x7EBF;&#x3002;&#x5982;&#x679C;&#x5F53;&#x524D;&#x70B9;&#x4E0E;&#x8D77;&#x59CB;&#x70B9;&#x91CD;&#x5408;&#xFF0C;&#x5219;&#x4EC0;&#x4E48;&#x90FD;&#x4E0D;&#x505A;
    ctx.closePath();
    ctx.stroke(); //&#x7ED8;&#x5236;&#x8DEF;&#x5F84;&#x3002;
}
draw();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;tutorial&apos;</span>);
    <span class="hljs-keyword">if</span> (!canvas.getContext) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">var</span> ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);
    ctx.beginPath(); <span class="hljs-comment">//&#x65B0;&#x5EFA;&#x4E00;&#x6761;path</span>
    ctx.moveTo(<span class="hljs-number">50</span>, <span class="hljs-number">50</span>); <span class="hljs-comment">//&#x628A;&#x753B;&#x7B14;&#x79FB;&#x52A8;&#x5230;&#x6307;&#x5B9A;&#x7684;&#x5750;&#x6807;</span>
    ctx.lineTo(<span class="hljs-number">200</span>, <span class="hljs-number">50</span>);  <span class="hljs-comment">//&#x7ED8;&#x5236;&#x4E00;&#x6761;&#x4ECE;&#x5F53;&#x524D;&#x4F4D;&#x7F6E;&#x5230;&#x6307;&#x5B9A;&#x5750;&#x6807;(200, 50)&#x7684;&#x76F4;&#x7EBF;.</span>
    <span class="hljs-comment">//&#x95ED;&#x5408;&#x8DEF;&#x5F84;&#x3002;&#x4F1A;&#x62C9;&#x4E00;&#x6761;&#x4ECE;&#x5F53;&#x524D;&#x70B9;&#x5230;path&#x8D77;&#x59CB;&#x70B9;&#x7684;&#x76F4;&#x7EBF;&#x3002;&#x5982;&#x679C;&#x5F53;&#x524D;&#x70B9;&#x4E0E;&#x8D77;&#x59CB;&#x70B9;&#x91CD;&#x5408;&#xFF0C;&#x5219;&#x4EC0;&#x4E48;&#x90FD;&#x4E0D;&#x505A;</span>
    ctx.closePath();
    ctx.stroke(); <span class="hljs-comment">//&#x7ED8;&#x5236;&#x8DEF;&#x5F84;&#x3002;</span>
}
draw();
</code></pre><h2 id="articleHeader14">4.2 &#x7ED8;&#x5236;&#x4E09;&#x89D2;&#x5F62;&#x8FB9;&#x6846;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function draw(){
    var canvas = document.getElementById(&apos;tutorial&apos;);
    if (!canvas.getContext) return;
    var ctx = canvas.getContext(&quot;2d&quot;);
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(200, 50);
    ctx.lineTo(200, 200);
    ctx.closePath(); //&#x867D;&#x7136;&#x6211;&#x4EEC;&#x53EA;&#x7ED8;&#x5236;&#x4E86;&#x4E24;&#x6761;&#x7EBF;&#x6BB5;&#xFF0C;&#x4F46;&#x662F;closePath&#x4F1A;closePath&#xFF0C;&#x4ECD;&#x7136;&#x662F;&#x4E00;&#x4E2A;3&#x89D2;&#x5F62;
    ctx.stroke(); //&#x63CF;&#x8FB9;&#x3002;stroke&#x4E0D;&#x4F1A;&#x81EA;&#x52A8;closePath()
}
draw();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;tutorial&apos;</span>);
    <span class="hljs-keyword">if</span> (!canvas.getContext) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">var</span> ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);
    ctx.beginPath();
    ctx.moveTo(<span class="hljs-number">50</span>, <span class="hljs-number">50</span>);
    ctx.lineTo(<span class="hljs-number">200</span>, <span class="hljs-number">50</span>);
    ctx.lineTo(<span class="hljs-number">200</span>, <span class="hljs-number">200</span>);
    ctx.closePath(); <span class="hljs-comment">//&#x867D;&#x7136;&#x6211;&#x4EEC;&#x53EA;&#x7ED8;&#x5236;&#x4E86;&#x4E24;&#x6761;&#x7EBF;&#x6BB5;&#xFF0C;&#x4F46;&#x662F;closePath&#x4F1A;closePath&#xFF0C;&#x4ECD;&#x7136;&#x662F;&#x4E00;&#x4E2A;3&#x89D2;&#x5F62;</span>
    ctx.stroke(); <span class="hljs-comment">//&#x63CF;&#x8FB9;&#x3002;stroke&#x4E0D;&#x4F1A;&#x81EA;&#x52A8;closePath()</span>
}
draw();
</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016031120?w=378&amp;h=319" src="https://static.alili.tech/img/remote/1460000016031120?w=378&amp;h=319" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader15">4.3 &#x586B;&#x5145;&#x4E09;&#x89D2;&#x5F62;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function draw(){
    var canvas = document.getElementById(&apos;tutorial&apos;);
    if (!canvas.getContext) return;
    var ctx = canvas.getContext(&quot;2d&quot;);
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(200, 50);
    ctx.lineTo(200, 200);

    ctx.fill(); //&#x586B;&#x5145;&#x95ED;&#x5408;&#x533A;&#x57DF;&#x3002;&#x5982;&#x679C;path&#x6CA1;&#x6709;&#x95ED;&#x5408;&#xFF0C;&#x5219;fill()&#x4F1A;&#x81EA;&#x52A8;&#x95ED;&#x5408;&#x8DEF;&#x5F84;&#x3002;
}
draw();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;tutorial&apos;</span>);
    <span class="hljs-keyword">if</span> (!canvas.getContext) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">var</span> ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);
    ctx.beginPath();
    ctx.moveTo(<span class="hljs-number">50</span>, <span class="hljs-number">50</span>);
    ctx.lineTo(<span class="hljs-number">200</span>, <span class="hljs-number">50</span>);
    ctx.lineTo(<span class="hljs-number">200</span>, <span class="hljs-number">200</span>);

    ctx.fill(); <span class="hljs-comment">//&#x586B;&#x5145;&#x95ED;&#x5408;&#x533A;&#x57DF;&#x3002;&#x5982;&#x679C;path&#x6CA1;&#x6709;&#x95ED;&#x5408;&#xFF0C;&#x5219;fill()&#x4F1A;&#x81EA;&#x52A8;&#x95ED;&#x5408;&#x8DEF;&#x5F84;&#x3002;</span>
}
draw();
</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016031121?w=330&amp;h=320" src="https://static.alili.tech/img/remote/1460000016031121?w=330&amp;h=320" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader16">4.4 &#x7ED8;&#x5236;&#x5706;&#x5F27;</h2><blockquote>&#x6709;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x7ED8;&#x5236;&#x5706;&#x5F27;&#xFF1A;</blockquote><ol><li><p><code>arc(x, y, r, startAngle, endAngle, anticlockwise)</code>:</p><p>&#x4EE5;<code>(x, y)</code>&#x4E3A;&#x5706;&#x5FC3;&#xFF0C;&#x4EE5;<code>r</code>&#x4E3A;&#x534A;&#x5F84;&#xFF0C;&#x4ECE; <code>startAngle</code>&#x5F27;&#x5EA6;&#x5F00;&#x59CB;&#x5230;<code>endAngle</code>&#x5F27;&#x5EA6;&#x7ED3;&#x675F;&#x3002;<code>anticlosewise</code>&#x662F;&#x5E03;&#x5C14;&#x503C;&#xFF0C;<code>true</code>&#x8868;&#x793A;&#x9006;&#x65F6;&#x9488;&#xFF0C;<code>false</code>&#x8868;&#x793A;&#x987A;&#x65F6;&#x9488;&#x3002;(&#x9ED8;&#x8BA4;&#x662F;&#x987A;&#x65F6;&#x9488;)</p><p>&#x6CE8;&#x610F;&#xFF1A;</p><ol><li>&#x8FD9;&#x91CC;&#x7684;&#x5EA6;&#x6570;&#x90FD;&#x662F;&#x5F27;&#x5EA6;&#x3002;</li><li><code>0</code>&#x5F27;&#x5EA6;&#x662F;&#x6307;&#x7684;<code>x</code>&#x8F74;&#x6B63;&#x65B9;&#x5F62;<p>radians=(Math.PI/180)*degrees //&#x89D2;&#x5EA6;&#x8F6C;&#x6362;&#x6210;&#x5F27;&#x5EA6;</p></li></ol></li><li><code>arcTo(x1, y1, x2, y2, radius)</code>:<p>&#x6839;&#x636E;&#x7ED9;&#x5B9A;&#x7684;&#x63A7;&#x5236;&#x70B9;&#x548C;&#x534A;&#x5F84;&#x753B;&#x4E00;&#x6BB5;&#x5706;&#x5F27;&#xFF0C;&#x6700;&#x540E;&#x518D;&#x4EE5;&#x76F4;&#x7EBF;&#x8FDE;&#x63A5;&#x4E24;&#x4E2A;&#x63A7;&#x5236;&#x70B9;&#x3002;</p></li></ol><h3 id="articleHeader17">&#x5706;&#x5F27;&#x6848;&#x4F8B;1&#xFF1A;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function draw(){
    var canvas = document.getElementById(&apos;tutorial&apos;);
    if (!canvas.getContext) return;
    var ctx = canvas.getContext(&quot;2d&quot;);
    ctx.beginPath();
    ctx.arc(50, 50, 40, 0, Math.PI / 2, false);
    ctx.stroke();
}
draw();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;tutorial&apos;</span>);
    <span class="hljs-keyword">if</span> (!canvas.getContext) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">var</span> ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);
    ctx.beginPath();
    ctx.arc(<span class="hljs-number">50</span>, <span class="hljs-number">50</span>, <span class="hljs-number">40</span>, <span class="hljs-number">0</span>, <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">2</span>, <span class="hljs-literal">false</span>);
    ctx.stroke();
}
draw();
</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016031122" src="https://static.alili.tech/img/remote/1460000016031122" alt="" title="" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader18">&#x5706;&#x5F27;&#x6848;&#x4F8B;2&#xFF1A;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function draw(){
    var canvas = document.getElementById(&apos;tutorial&apos;);
    if (!canvas.getContext) return;
    var ctx = canvas.getContext(&quot;2d&quot;);
    ctx.beginPath();
    ctx.arc(50, 50, 40, 0, Math.PI / 2, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(150, 50, 40, 0, -Math.PI / 2, true);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(50, 150, 40, -Math.PI / 2, Math.PI / 2, false);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(150, 150, 40, 0, Math.PI, false);
    ctx.fill();

}
draw();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>function draw(){
    var canvas = document.getElementById(&apos;tutorial&apos;);
    if (!canvas.getContext) return;
    var ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);
    ctx.beginPath();
    ctx.arc(<span class="hljs-number">50</span>, <span class="hljs-number">50</span>, <span class="hljs-number">40</span>, <span class="hljs-number">0</span>, Math.<span class="hljs-literal">PI</span> / <span class="hljs-number">2</span>, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(<span class="hljs-number">150</span>, <span class="hljs-number">50</span>, <span class="hljs-number">40</span>, <span class="hljs-number">0</span>, -Math.<span class="hljs-literal">PI</span> / <span class="hljs-number">2</span>, true);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(<span class="hljs-number">50</span>, <span class="hljs-number">150</span>, <span class="hljs-number">40</span>, -Math.<span class="hljs-literal">PI</span> / <span class="hljs-number">2</span>, Math.<span class="hljs-literal">PI</span> / <span class="hljs-number">2</span>, false);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(<span class="hljs-number">150</span>, <span class="hljs-number">150</span>, <span class="hljs-number">40</span>, <span class="hljs-number">0</span>, Math.<span class="hljs-literal">PI</span>, false);
    ctx.fill();

}
draw();
</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016031123?w=359&amp;h=320" src="https://static.alili.tech/img/remote/1460000016031123?w=359&amp;h=320" alt="" title="" style="cursor:pointer"></span></p><h3 id="articleHeader19">&#x5706;&#x5F27;&#x6848;&#x4F8B;3&#xFF1A;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function draw(){
    var canvas = document.getElementById(&apos;tutorial&apos;);
    if (!canvas.getContext) return;
    var ctx = canvas.getContext(&quot;2d&quot;);
    ctx.beginPath();
    ctx.moveTo(50, 50);
    //&#x53C2;&#x6570;1&#x3001;2&#xFF1A;&#x63A7;&#x5236;&#x70B9;1&#x5750;&#x6807;   &#x53C2;&#x6570;3&#x3001;4&#xFF1A;&#x63A7;&#x5236;&#x70B9;2&#x5750;&#x6807;  &#x53C2;&#x6570;4&#xFF1A;&#x5706;&#x5F27;&#x534A;&#x5F84;
    ctx.arcTo(200, 50, 200, 200, 100);
    ctx.lineTo(200, 200)
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(50, 50, 10, 10);
    ctx.rect(200, 50, 10, 10)
    ctx.rect(200, 200, 10, 10)
    ctx.fill()
}
draw();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>function draw(){
    var canvas = document.getElementById(&apos;tutorial&apos;);
    if (!canvas.getContext) return;
    var ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);
    ctx.beginPath();
    ctx.moveTo(<span class="hljs-number">50</span>, <span class="hljs-number">50</span>);
    <span class="hljs-comment">//&#x53C2;&#x6570;1&#x3001;2&#xFF1A;&#x63A7;&#x5236;&#x70B9;1&#x5750;&#x6807;   &#x53C2;&#x6570;3&#x3001;4&#xFF1A;&#x63A7;&#x5236;&#x70B9;2&#x5750;&#x6807;  &#x53C2;&#x6570;4&#xFF1A;&#x5706;&#x5F27;&#x534A;&#x5F84;</span>
    ctx.arcTo(<span class="hljs-number">200</span>, <span class="hljs-number">50</span>, <span class="hljs-number">200</span>, <span class="hljs-number">200</span>, <span class="hljs-number">100</span>);
    ctx.lineTo(<span class="hljs-number">200</span>, <span class="hljs-number">200</span>)
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(<span class="hljs-number">50</span>, <span class="hljs-number">50</span>, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
    ctx.rect(<span class="hljs-number">200</span>, <span class="hljs-number">50</span>, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>)
    ctx.rect(<span class="hljs-number">200</span>, <span class="hljs-number">200</span>, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>)
    ctx.fill()
}
draw();
</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016031124" src="https://static.alili.tech/img/remote/1460000016031124" alt="" title="" style="cursor:pointer"></span></p><p><code>arcTo</code>&#x65B9;&#x6CD5;&#x7684;&#x8BF4;&#x660E;&#xFF1A;</p><p>&#x200B; &#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x7406;&#x89E3;&#x3002;&#x7ED8;&#x5236;&#x7684;&#x5F27;&#x5F62;&#x662F;&#x7531;&#x4E24;&#x6761;&#x5207;&#x7EBF;&#x6240;&#x51B3;&#x5B9A;&#x3002;</p><p>&#x200B; &#x7B2C; 1 &#x6761;&#x5207;&#x7EBF;&#xFF1A;&#x8D77;&#x59CB;&#x70B9;&#x548C;&#x63A7;&#x5236;&#x70B9;1&#x51B3;&#x5B9A;&#x7684;&#x76F4;&#x7EBF;&#x3002;</p><p>&#x200B; &#x7B2C; 2 &#x6761;&#x5207;&#x7EBF;&#xFF1A;&#x63A7;&#x5236;&#x70B9;1 &#x548C;&#x63A7;&#x5236;&#x70B9;2&#x51B3;&#x5B9A;&#x7684;&#x76F4;&#x7EBF;&#x3002;</p><p>&#x200B; <strong>&#x5176;&#x5B9E;&#x7ED8;&#x5236;&#x7684;&#x5706;&#x5F27;&#x5C31;&#x662F;&#x4E0E;&#x8FD9;&#x4E24;&#x6761;&#x76F4;&#x7EBF;&#x76F8;&#x5207;&#x7684;&#x5706;&#x5F27;&#x3002;</strong></p><h2 id="articleHeader20">4.5 &#x7ED8;&#x5236;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;</h2><h3 id="articleHeader21">4.5.1 &#x4EC0;&#x4E48;&#x662F;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;</h3><p>&#x200B; &#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;(B&#xE9;zier curve)&#xFF0C;&#x53C8;&#x79F0;&#x8D1D;&#x5179;&#x66F2;&#x7EBF;&#x6216;&#x8D1D;&#x6D4E;&#x57C3;&#x66F2;&#x7EBF;&#xFF0C;&#x662F;&#x5E94;&#x7528;&#x4E8E;&#x4E8C;&#x7EF4;&#x56FE;&#x5F62;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x7684;&#x6570;&#x5B66;&#x66F2;&#x7EBF;&#x3002;</p><p>&#x200B; &#x4E00;&#x822C;&#x7684;&#x77E2;&#x91CF;&#x56FE;&#x5F62;&#x8F6F;&#x4EF6;&#x901A;&#x8FC7;&#x5B83;&#x6765;&#x7CBE;&#x786E;&#x753B;&#x51FA;&#x66F2;&#x7EBF;&#xFF0C;&#x8D1D;&#x5179;&#x66F2;&#x7EBF;&#x7531;&#x7EBF;&#x6BB5;&#x4E0E;&#x8282;&#x70B9;&#x7EC4;&#x6210;&#xFF0C;&#x8282;&#x70B9;&#x662F;&#x53EF;&#x62D6;&#x52A8;&#x7684;&#x652F;&#x70B9;&#xFF0C;&#x7EBF;&#x6BB5;&#x50CF;&#x53EF;&#x4F38;&#x7F29;&#x7684;&#x76AE;&#x7B4B;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x7ED8;&#x56FE;&#x5DE5;&#x5177;&#x4E0A;&#x770B;&#x5230;&#x7684;&#x94A2;&#x7B14;&#x5DE5;&#x5177;&#x5C31;&#x662F;&#x6765;&#x505A;&#x8FD9;&#x79CD;&#x77E2;&#x91CF;&#x66F2;&#x7EBF;&#x7684;&#x3002;</p><p>&#x200B; &#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;&#x662F;&#x8BA1;&#x7B97;&#x673A;&#x56FE;&#x5F62;&#x5B66;&#x4E2D;&#x76F8;&#x5F53;&#x91CD;&#x8981;&#x7684;&#x53C2;&#x6570;&#x66F2;&#x7EBF;&#xFF0C;&#x5728;&#x4E00;&#x4E9B;&#x6BD4;&#x8F83;&#x6210;&#x719F;&#x7684;&#x4F4D;&#x56FE;&#x8F6F;&#x4EF6;&#x4E2D;&#x4E5F;&#x6709;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;&#x5DE5;&#x5177;&#x5982;PhotoShop&#x7B49;&#x3002;&#x5728;Flash4&#x4E2D;&#x8FD8;&#x6CA1;&#x6709;&#x5B8C;&#x6574;&#x7684;&#x66F2;&#x7EBF;&#x5DE5;&#x5177;&#xFF0C;&#x800C;&#x5728;Flash5&#x91CC;&#x9762;&#x5DF2;&#x7ECF;&#x63D0;&#x4F9B;&#x51FA;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;&#x5DE5;&#x5177;&#x3002;</p><p>&#x200B; &#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;&#x4E8E;1962&#xFF0C;&#x7531;&#x6CD5;&#x56FD;&#x5DE5;&#x7A0B;&#x5E08;&#x76AE;&#x57C3;&#x5C14;&#xB7;&#x8D1D;&#x585E;&#x5C14;&#xFF08;Pierre B&#xE9;zier&#xFF09;&#x6240;&#x5E7F;&#x6CDB;&#x53D1;&#x8868;&#xFF0C;&#x4ED6;&#x8FD0;&#x7528;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;&#x6765;&#x4E3A;&#x6C7D;&#x8F66;&#x7684;&#x4E3B;&#x4F53;&#x8FDB;&#x884C;&#x8BBE;&#x8BA1;&#x3002;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;&#x6700;&#x521D;&#x7531;Paul de Casteljau&#x4E8E;1959&#x5E74;&#x8FD0;&#x7528;de Casteljau&#x6F14;&#x7B97;&#x6CD5;&#x5F00;&#x53D1;&#xFF0C;&#x4EE5;&#x7A33;&#x5B9A;&#x6570;&#x503C;&#x7684;&#x65B9;&#x6CD5;&#x6C42;&#x51FA;&#x8D1D;&#x5179;&#x66F2;&#x7EBF;&#x3002;</p><h4>&#x4E00;&#x6B21;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;(&#x7EBF;&#x6027;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;)</h4><p>&#x200B; &#x4E00;&#x6B21;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;&#x5176;&#x5B9E;&#x662F;&#x4E00;&#x6761;&#x76F4;&#x7EBF;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016031125" src="https://static.alili.tech/img/remote/1460000016031125" alt="" title="" style="cursor:pointer"></span></p><h4>&#x4E8C;&#x6B21;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;</h4><p><span class="img-wrap"><img data-src="/img/remote/1460000016031126" src="https://static.alili.tech/img/remote/1460000016031126" alt="" title="" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016031127?w=385&amp;h=169" src="https://static.alili.tech/img/remote/1460000016031127?w=385&amp;h=169" alt="" title="" style="cursor:pointer"></span></p><h4>&#x4E09;&#x6B21;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;</h4><p><span class="img-wrap"><img data-src="/img/remote/1460000016031128" src="https://static.alili.tech/img/remote/1460000016031128" alt="" title="" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016031129" src="https://static.alili.tech/img/remote/1460000016031129" alt="" title="" style="cursor:pointer"></span></p><h3 id="articleHeader22">4.5.2 &#x7ED8;&#x5236;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;</h3><h4>&#x7ED8;&#x5236;&#x4E8C;&#x6B21;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;</h4><p><code>quadraticCurveTo(cp1x, cp1y, x, y)</code>:</p><p><strong>&#x8BF4;&#x660E;&#xFF1A;</strong></p><p>&#x200B; &#x53C2;&#x6570;1&#x548C;2&#xFF1A;&#x63A7;&#x5236;&#x70B9;&#x5750;&#x6807;</p><p>&#x200B; &#x53C2;&#x6570;3&#x548C;4&#xFF1A;&#x7ED3;&#x675F;&#x70B9;&#x5750;&#x6807;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function draw(){
    var canvas = document.getElementById(&apos;tutorial&apos;);
    if (!canvas.getContext) return;
    var ctx = canvas.getContext(&quot;2d&quot;);
    ctx.beginPath();
    ctx.moveTo(10, 200); //&#x8D77;&#x59CB;&#x70B9;
    var cp1x = 40, cp1y = 100;  //&#x63A7;&#x5236;&#x70B9;
    var x = 200, y = 200; // &#x7ED3;&#x675F;&#x70B9;
    //&#x7ED8;&#x5236;&#x4E8C;&#x6B21;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;
    ctx.quadraticCurveTo(cp1x, cp1y, x, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(10, 200, 10, 10);
    ctx.rect(cp1x, cp1y, 10, 10);
    ctx.rect(x, y, 10, 10);
    ctx.fill();

}
draw();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>function draw(){
    var canvas = document.getElementById(&apos;tutorial&apos;);
    if (!canvas.getContext) return;
    var ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);
    ctx.beginPath();
    ctx.moveTo(<span class="hljs-number">10</span>, <span class="hljs-number">200</span>); <span class="hljs-comment">//&#x8D77;&#x59CB;&#x70B9;</span>
    var cp1x = <span class="hljs-number">40</span>, cp1y = <span class="hljs-number">100</span>;  <span class="hljs-comment">//&#x63A7;&#x5236;&#x70B9;</span>
    var x = <span class="hljs-number">200</span>, y = <span class="hljs-number">200</span>; <span class="hljs-comment">// &#x7ED3;&#x675F;&#x70B9;</span>
    <span class="hljs-comment">//&#x7ED8;&#x5236;&#x4E8C;&#x6B21;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;</span>
    ctx.quadraticCurveTo(cp1x, cp1y, x, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(<span class="hljs-number">10</span>, <span class="hljs-number">200</span>, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
    ctx.rect(cp1x, cp1y, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
    ctx.rect(x, y, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
    ctx.fill();

}
draw();
</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016031130?w=418&amp;h=420" src="https://static.alili.tech/img/remote/1460000016031130?w=418&amp;h=420" alt="" title="" style="cursor:pointer"></span></p><h4>&#x7ED8;&#x5236;&#x4E09;&#x6B21;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;</h4><p><code>bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)</code>&#xFF1A;</p><p>&#x8BF4;&#x660E;&#xFF1A;</p><p>&#x200B; &#x53C2;&#x6570;1&#x548C;2&#xFF1A;&#x63A7;&#x5236;&#x70B9;1&#x7684;&#x5750;&#x6807;</p><p>&#x200B; &#x53C2;&#x6570;3&#x548C;4&#xFF1A;&#x63A7;&#x5236;&#x70B9;2&#x7684;&#x5750;&#x6807;</p><p>&#x200B; &#x53C2;&#x6570;5&#x548C;6&#xFF1A;&#x7ED3;&#x675F;&#x70B9;&#x7684;&#x5750;&#x6807;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function draw(){
    var canvas = document.getElementById(&apos;tutorial&apos;);
    if (!canvas.getContext) return;
    var ctx = canvas.getContext(&quot;2d&quot;);
    ctx.beginPath();
    ctx.moveTo(40, 200); //&#x8D77;&#x59CB;&#x70B9;
    var cp1x = 20, cp1y = 100;  //&#x63A7;&#x5236;&#x70B9;1
    var cp2x = 100, cp2y = 120;  //&#x63A7;&#x5236;&#x70B9;2
    var x = 200, y = 200; // &#x7ED3;&#x675F;&#x70B9;
    //&#x7ED8;&#x5236;&#x4E8C;&#x6B21;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(40, 200, 10, 10);
    ctx.rect(cp1x, cp1y, 10, 10);
    ctx.rect(cp2x, cp2y, 10, 10);
    ctx.rect(x, y, 10, 10);
    ctx.fill();

}
draw();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>function draw(){
    var canvas = document.getElementById(&apos;tutorial&apos;);
    if (!canvas.getContext) return;
    var ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);
    ctx.beginPath();
    ctx.moveTo(<span class="hljs-number">40</span>, <span class="hljs-number">200</span>); <span class="hljs-comment">//&#x8D77;&#x59CB;&#x70B9;</span>
    var cp1x = <span class="hljs-number">20</span>, cp1y = <span class="hljs-number">100</span>;  <span class="hljs-comment">//&#x63A7;&#x5236;&#x70B9;1</span>
    var cp2x = <span class="hljs-number">100</span>, cp2y = <span class="hljs-number">120</span>;  <span class="hljs-comment">//&#x63A7;&#x5236;&#x70B9;2</span>
    var x = <span class="hljs-number">200</span>, y = <span class="hljs-number">200</span>; <span class="hljs-comment">// &#x7ED3;&#x675F;&#x70B9;</span>
    <span class="hljs-comment">//&#x7ED8;&#x5236;&#x4E8C;&#x6B21;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;</span>
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(<span class="hljs-number">40</span>, <span class="hljs-number">200</span>, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
    ctx.rect(cp1x, cp1y, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
    ctx.rect(cp2x, cp2y, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
    ctx.rect(x, y, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
    ctx.fill();

}
draw();
</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016031131" src="https://static.alili.tech/img/remote/1460000016031131" alt="" title="" style="cursor:pointer"></span></p><h1 id="articleHeader23">&#x4E94;&#x3001;&#x6DFB;&#x52A0;&#x6837;&#x5F0F;&#x548C;&#x989C;&#x8272;</h1><p>&#x200B; &#x5728;&#x524D;&#x9762;&#x7684;&#x7ED8;&#x5236;&#x77E9;&#x5F62;&#x7AE0;&#x8282;&#x4E2D;&#xFF0C;&#x53EA;&#x7528;&#x5230;&#x4E86;&#x9ED8;&#x8BA4;&#x7684;&#x7EBF;&#x6761;&#x548C;&#x989C;&#x8272;&#x3002;</p><p>&#x200B; &#x5982;&#x679C;&#x60F3;&#x8981;&#x7ED9;&#x56FE;&#x5F62;&#x4E0A;&#x8272;&#xFF0C;&#x6709;&#x4E24;&#x4E2A;&#x91CD;&#x8981;&#x7684;&#x5C5E;&#x6027;&#x53EF;&#x4EE5;&#x505A;&#x5230;&#x3002;</p><ol><li><code>fillStyle = color</code><p>&#x8BBE;&#x7F6E;&#x56FE;&#x5F62;&#x7684;&#x586B;&#x5145;&#x989C;&#x8272;</p></li><li><code>strokeStyle = color</code><p>&#x8BBE;&#x7F6E;&#x56FE;&#x5F62;&#x8F6E;&#x5ED3;&#x7684;&#x989C;&#x8272;</p></li></ol><blockquote>&#x5907;&#x6CE8;&#xFF1A;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. `color` &#x53EF;&#x4EE5;&#x662F;&#x8868;&#x793A; `css` &#x989C;&#x8272;&#x503C;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x3001;&#x6E10;&#x53D8;&#x5BF9;&#x8C61;&#x6216;&#x8005;&#x56FE;&#x6848;&#x5BF9;&#x8C61;&#x3002;
2. &#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x7EBF;&#x6761;&#x548C;&#x586B;&#x5145;&#x989C;&#x8272;&#x90FD;&#x662F;&#x9ED1;&#x8272;&#x3002;
3. &#x4E00;&#x65E6;&#x60A8;&#x8BBE;&#x7F6E;&#x4E86; `strokeStyle` &#x6216;&#x8005; `fillStyle` &#x7684;&#x503C;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x65B0;&#x503C;&#x5C31;&#x4F1A;&#x6210;&#x4E3A;&#x65B0;&#x7ED8;&#x5236;&#x7684;&#x56FE;&#x5F62;&#x7684;&#x9ED8;&#x8BA4;&#x503C;&#x3002;&#x5982;&#x679C;&#x4F60;&#x8981;&#x7ED9;&#x6BCF;&#x4E2A;&#x56FE;&#x5F62;&#x4E0A;&#x4E0D;&#x540C;&#x7684;&#x989C;&#x8272;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x8BBE;&#x7F6E; `fillStyle` &#x6216; `strokeStyle` &#x7684;&#x503C;&#x3002;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs autohotkey"><code><span class="hljs-number">1</span>. `color` &#x53EF;&#x4EE5;&#x662F;&#x8868;&#x793A; `css` &#x989C;&#x8272;&#x503C;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x3001;&#x6E10;&#x53D8;&#x5BF9;&#x8C61;&#x6216;&#x8005;&#x56FE;&#x6848;&#x5BF9;&#x8C61;&#x3002;
<span class="hljs-number">2</span>. &#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x7EBF;&#x6761;&#x548C;&#x586B;&#x5145;&#x989C;&#x8272;&#x90FD;&#x662F;&#x9ED1;&#x8272;&#x3002;
<span class="hljs-number">3</span>. &#x4E00;&#x65E6;&#x60A8;&#x8BBE;&#x7F6E;&#x4E86; `strokeStyle` &#x6216;&#x8005; `fillStyle` &#x7684;&#x503C;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x65B0;&#x503C;&#x5C31;&#x4F1A;&#x6210;&#x4E3A;&#x65B0;&#x7ED8;&#x5236;&#x7684;&#x56FE;&#x5F62;&#x7684;&#x9ED8;&#x8BA4;&#x503C;&#x3002;&#x5982;&#x679C;&#x4F60;&#x8981;&#x7ED9;&#x6BCF;&#x4E2A;&#x56FE;&#x5F62;&#x4E0A;&#x4E0D;&#x540C;&#x7684;&#x989C;&#x8272;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x8BBE;&#x7F6E; `fillStyle` &#x6216; `strokeStyle` &#x7684;&#x503C;&#x3002;

</code></pre><h2 id="articleHeader24"><code>fillStyle</code></h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function draw(){
  var canvas = document.getElementById(&apos;tutorial&apos;);
  if (!canvas.getContext) return;
  var ctx = canvas.getContext(&quot;2d&quot;);
  for (var i = 0; i &lt; 6; i++){
    for (var j = 0; j &lt; 6; j++){
      ctx.fillStyle = &apos;rgb(&apos; + Math.floor(255 - 42.5 * i) + &apos;,&apos; +
        Math.floor(255 - 42.5 * j) + &apos;,0)&apos;;
      ctx.fillRect(j * 50, i * 50, 50, 50);
    }
  }
}
draw();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;tutorial&apos;</span>);
  <span class="hljs-keyword">if</span> (!canvas.getContext) <span class="hljs-keyword">return</span>;
  <span class="hljs-keyword">var</span> ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">6</span>; i++){
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; <span class="hljs-number">6</span>; j++){
      ctx.fillStyle = <span class="hljs-string">&apos;rgb(&apos;</span> + <span class="hljs-built_in">Math</span>.floor(<span class="hljs-number">255</span> - <span class="hljs-number">42.5</span> * i) + <span class="hljs-string">&apos;,&apos;</span> +
        <span class="hljs-built_in">Math</span>.floor(<span class="hljs-number">255</span> - <span class="hljs-number">42.5</span> * j) + <span class="hljs-string">&apos;,0)&apos;</span>;
      ctx.fillRect(j * <span class="hljs-number">50</span>, i * <span class="hljs-number">50</span>, <span class="hljs-number">50</span>, <span class="hljs-number">50</span>);
    }
  }
}
draw();
</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016031132?w=792&amp;h=320" src="https://static.alili.tech/img/remote/1460000016031132?w=792&amp;h=320" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader25"><code>strokeStyle</code></h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script type=&quot;text/javascript&quot;&gt;
    function draw(){
        var canvas = document.getElementById(&apos;tutorial&apos;);
        if (!canvas.getContext) return;
        var ctx = canvas.getContext(&quot;2d&quot;);
        for (var i = 0; i &lt; 6; i++){
            for (var j = 0; j &lt; 6; j++){
                ctx.strokeStyle = `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
                ctx.strokeRect(j * 50, i * 50, 40, 40);
            }
        }
    }
    draw();
    /**
     &#x4F5C;&#x8005;:&#x674E;&#x632F;&#x8D85;      4 Jun 2017 12:12
     &#x8FD4;&#x56DE;&#x968F;&#x673A;&#x7684; [from, to] &#x4E4B;&#x95F4;&#x7684;&#x6574;&#x6570;(&#x5305;&#x62EC;from&#xFF0C;&#x4E5F;&#x5305;&#x62EC;to)
     */
    function randomInt(from, to){
        return parseInt(Math.random() * (to - from + 1) + from);
    }

&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;tutorial&apos;</span>);
        <span class="hljs-keyword">if</span> (!canvas.getContext) <span class="hljs-keyword">return</span>;
        <span class="hljs-keyword">var</span> ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">6</span>; i++){
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; <span class="hljs-number">6</span>; j++){
                ctx.strokeStyle = <span class="hljs-string">`rgb(<span class="hljs-subst">${randomInt(<span class="hljs-number">0</span>, <span class="hljs-number">255</span>)}</span>,<span class="hljs-subst">${randomInt(<span class="hljs-number">0</span>, <span class="hljs-number">255</span>)}</span>,<span class="hljs-subst">${randomInt(<span class="hljs-number">0</span>, <span class="hljs-number">255</span>)}</span>)`</span>;
                ctx.strokeRect(j * <span class="hljs-number">50</span>, i * <span class="hljs-number">50</span>, <span class="hljs-number">40</span>, <span class="hljs-number">40</span>);
            }
        }
    }
    draw();
    <span class="hljs-comment">/**
     &#x4F5C;&#x8005;:&#x674E;&#x632F;&#x8D85;      4 Jun 2017 12:12
     &#x8FD4;&#x56DE;&#x968F;&#x673A;&#x7684; [from, to] &#x4E4B;&#x95F4;&#x7684;&#x6574;&#x6570;(&#x5305;&#x62EC;from&#xFF0C;&#x4E5F;&#x5305;&#x62EC;to)
     */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">randomInt</span>(<span class="hljs-params">from, to</span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Math</span>.random() * (to - <span class="hljs-keyword">from</span> + <span class="hljs-number">1</span>) + <span class="hljs-keyword">from</span>);
    }

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016031133?w=331&amp;h=320" src="https://static.alili.tech/img/remote/1460000016031133?w=331&amp;h=320" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader26"><code>Transparency(&#x900F;&#x660E;&#x5EA6;)</code></h2><p><code>globalAlpha = transparencyValue</code></p><p>&#x200B; &#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x5F71;&#x54CD;&#x5230; canvas &#x91CC;&#x6240;&#x6709;&#x56FE;&#x5F62;&#x7684;&#x900F;&#x660E;&#x5EA6;&#xFF0C;&#x6709;&#x6548;&#x7684;&#x503C;&#x8303;&#x56F4;&#x662F; 0.0 &#xFF08;&#x5B8C;&#x5168;&#x900F;&#x660E;&#xFF09;&#x5230; 1.0&#xFF08;&#x5B8C;&#x5168;&#x4E0D;&#x900F;&#x660E;&#xFF09;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F; 1.0&#x3002;</p><p>&#x200B; <code>globalAlpha</code> &#x5C5E;&#x6027;&#x5728;&#x9700;&#x8981;&#x7ED8;&#x5236;&#x5927;&#x91CF;&#x62E5;&#x6709;&#x76F8;&#x540C;&#x900F;&#x660E;&#x5EA6;&#x7684;&#x56FE;&#x5F62;&#x65F6;&#x5019;&#x76F8;&#x5F53;&#x9AD8;&#x6548;&#x3002;&#x4E0D;&#x8FC7;&#xFF0C;&#x6211;&#x8BA4;&#x4E3A;&#x4F7F;&#x7528;<code>rgba()</code>&#x8BBE;&#x7F6E;&#x900F;&#x660E;&#x5EA6;&#x66F4;&#x52A0;&#x597D;&#x4E00;&#x4E9B;&#x3002;</p><h2 id="articleHeader27"><code>line style</code></h2><h3 id="articleHeader28">1. <code>lineWidth = value</code></h3><p>&#x7EBF;&#x5BBD;&#x3002;&#x53EA;&#x80FD;&#x662F;&#x6B63;&#x503C;&#x3002;&#x9ED8;&#x8BA4;&#x662F;<code>1.0</code>&#x3002;</p><p>&#x8D77;&#x59CB;&#x70B9;&#x548C;&#x7EC8;&#x70B9;&#x7684;&#x8FDE;&#x7EBF;&#x4E3A;&#x4E2D;&#x5FC3;&#xFF0C;<strong>&#x4E0A;&#x4E0B;&#x5404;&#x5360;&#x7EBF;&#x5BBD;&#x7684;&#x4E00;&#x534A;</strong></p><p>&#x201C;`javascript<br>ctx.beginPath();<br>ctx.moveTo(10, 10);<br>ctx.lineTo(100, 10);<br>ctx.lineWidth = 10;<br>ctx.stroke();</p><p>ctx.beginPath();<br>ctx.moveTo(110, 10);<br>ctx.lineTo(160, 10)<br>ctx.lineWidth = 20;<br>ctx.stroke()<br>&#x201C;`</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016031134" src="https://static.alili.tech/img/remote/1460000016031134" alt="" title="" style="cursor:pointer"></span></p><h3 id="articleHeader29">2. <code>lineCap = type</code></h3><p>&#x7EBF;&#x6761;&#x672B;&#x7AEF;&#x6837;&#x5F0F;&#x3002;</p><p>&#x5171;&#x6709;3&#x4E2A;&#x503C;&#xFF1A;</p><ol><li><code>butt</code>&#xFF1A;&#x7EBF;&#x6BB5;&#x672B;&#x7AEF;&#x4EE5;&#x65B9;&#x5F62;&#x7ED3;&#x675F;</li><li><code>round</code>&#xFF1A;&#x7EBF;&#x6BB5;&#x672B;&#x7AEF;&#x4EE5;&#x5706;&#x5F62;&#x7ED3;&#x675F;</li><li><p><code>square</code>&#xFF1A;&#x7EBF;&#x6BB5;&#x672B;&#x7AEF;&#x4EE5;&#x65B9;&#x5F62;&#x7ED3;&#x675F;&#xFF0C;&#x4F46;&#x662F;&#x589E;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;&#x5BBD;&#x5EA6;&#x548C;&#x7EBF;&#x6BB5;&#x76F8;&#x540C;&#xFF0C;&#x9AD8;&#x5EA6;&#x662F;&#x7EBF;&#x6BB5;&#x539A;&#x5EA6;&#x4E00;&#x534A;&#x7684;&#x77E9;&#x5F62;&#x533A;&#x57DF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var lineCaps = [&quot;butt&quot;, &quot;round&quot;, &quot;square&quot;];

for (var i = 0; i &lt; 3; i++){
   ctx.beginPath();
   ctx.moveTo(20 + 30 * i, 30);
   ctx.lineTo(20 + 30 * i, 100);
   ctx.lineWidth = 20;
   ctx.lineCap = lineCaps[i];
   ctx.stroke();
}

ctx.beginPath();
ctx.moveTo(0, 30);
ctx.lineTo(300, 30);

ctx.moveTo(0, 100);
ctx.lineTo(300, 100)

ctx.strokeStyle = &quot;red&quot;;
ctx.lineWidth = 1;
ctx.stroke();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>var lineCaps = [<span class="hljs-string">&quot;butt&quot;</span>, <span class="hljs-string">&quot;round&quot;</span>, <span class="hljs-string">&quot;square&quot;</span>];

for (var i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">3</span>; i++){
   ctx.beginPath();
   ctx.moveTo(<span class="hljs-number">20</span> + <span class="hljs-number">30</span> * i, <span class="hljs-number">30</span>);
   ctx.lineTo(<span class="hljs-number">20</span> + <span class="hljs-number">30</span> * i, <span class="hljs-number">100</span>);
   ctx.lineWidth = <span class="hljs-number">20</span>;
   ctx.lineCap = lineCaps[i];
   ctx.stroke();
}

ctx.beginPath();
ctx.moveTo(<span class="hljs-number">0</span>, <span class="hljs-number">30</span>);
ctx.lineTo(<span class="hljs-number">300</span>, <span class="hljs-number">30</span>);

ctx.moveTo(<span class="hljs-number">0</span>, <span class="hljs-number">100</span>);
ctx.lineTo(<span class="hljs-number">300</span>, <span class="hljs-number">100</span>)

ctx.strokeStyle = <span class="hljs-string">&quot;red&quot;</span>;
ctx.lineWidth = <span class="hljs-number">1</span>;
ctx.stroke();
</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016031135?w=476&amp;h=416" src="https://static.alili.tech/img/remote/1460000016031135?w=476&amp;h=416" alt="" title="" style="cursor:pointer"></span></p></li></ol><h3 id="articleHeader30">3. <code>lineJoin = type</code></h3><p>&#x540C;&#x4E00;&#x4E2A;path&#x5185;&#xFF0C;&#x8BBE;&#x5B9A;&#x7EBF;&#x6761;&#x4E0E;&#x7EBF;&#x6761;&#x95F4;&#x63A5;&#x5408;&#x5904;&#x7684;&#x6837;&#x5F0F;&#x3002;</p><p>&#x5171;&#x6709;3&#x4E2A;&#x503C;<code>round</code>, <code>bevel</code> &#x548C; <code>miter</code>&#xFF1A;</p><ol><li><code>round</code><p>&#x901A;&#x8FC7;&#x586B;&#x5145;&#x4E00;&#x4E2A;&#x989D;&#x5916;&#x7684;&#xFF0C;&#x5706;&#x5FC3;&#x5728;&#x76F8;&#x8FDE;&#x90E8;&#x5206;&#x672B;&#x7AEF;&#x7684;&#x6247;&#x5F62;&#xFF0C;&#x7ED8;&#x5236;&#x62D0;&#x89D2;&#x7684;&#x5F62;&#x72B6;&#x3002; &#x5706;&#x89D2;&#x7684;&#x534A;&#x5F84;&#x662F;&#x7EBF;&#x6BB5;&#x7684;&#x5BBD;&#x5EA6;&#x3002;</p></li><li><code>bevel</code><p>&#x5728;&#x76F8;&#x8FDE;&#x90E8;&#x5206;&#x7684;&#x672B;&#x7AEF;&#x586B;&#x5145;&#x4E00;&#x4E2A;&#x989D;&#x5916;&#x7684;&#x4EE5;&#x4E09;&#x89D2;&#x5F62;&#x4E3A;&#x5E95;&#x7684;&#x533A;&#x57DF;&#xFF0C; &#x6BCF;&#x4E2A;&#x90E8;&#x5206;&#x90FD;&#x6709;&#x5404;&#x81EA;&#x72EC;&#x7ACB;&#x7684;&#x77E9;&#x5F62;&#x62D0;&#x89D2;&#x3002;</p></li><li><p><code>miter</code>(&#x9ED8;&#x8BA4;)</p><p>&#x901A;&#x8FC7;&#x5EF6;&#x4F38;&#x76F8;&#x8FDE;&#x90E8;&#x5206;&#x7684;&#x5916;&#x8FB9;&#x7F18;&#xFF0C;&#x4F7F;&#x5176;&#x76F8;&#x4EA4;&#x4E8E;&#x4E00;&#x70B9;&#xFF0C;&#x5F62;&#x6210;&#x4E00;&#x4E2A;&#x989D;&#x5916;&#x7684;&#x83F1;&#x5F62;&#x533A;&#x57DF;&#x3002;</p><p>function draw(){</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = document.getElementById(&apos;tutorial&apos;);
if (!canvas.getContext) return;
var ctx = canvas.getContext(&quot;2d&quot;);

var lineJoin = [&apos;round&apos;, &apos;bevel&apos;, &apos;miter&apos;];
ctx.lineWidth = 20;

for (var i = 0; i &lt; lineJoin.length; i++){
    ctx.lineJoin = lineJoin[i];
    ctx.beginPath();
    ctx.moveTo(50, 50 + i * 50);
    ctx.lineTo(100, 100 + i * 50);
    ctx.lineTo(150, 50 + i * 50);
    ctx.lineTo(200, 100 + i * 50);
    ctx.lineTo(250, 50 + i * 50);
    ctx.stroke();
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>var canvas = document.getElementById(&apos;tutorial&apos;);
if (!canvas.getContext) return;
var ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);

var lineJoin = [&apos;round&apos;, &apos;bevel&apos;, &apos;miter&apos;];
ctx.lineWidth = <span class="hljs-number">20</span>;

for (var i = <span class="hljs-number">0</span>; i &lt; lineJoin.length; i++){
    ctx.lineJoin = lineJoin[i];
    ctx.beginPath();
    ctx.moveTo(<span class="hljs-number">50</span>, <span class="hljs-number">50</span> + i * <span class="hljs-number">50</span>);
    ctx.lineTo(<span class="hljs-number">100</span>, <span class="hljs-number">100</span> + i * <span class="hljs-number">50</span>);
    ctx.lineTo(<span class="hljs-number">150</span>, <span class="hljs-number">50</span> + i * <span class="hljs-number">50</span>);
    ctx.lineTo(<span class="hljs-number">200</span>, <span class="hljs-number">100</span> + i * <span class="hljs-number">50</span>);
    ctx.lineTo(<span class="hljs-number">250</span>, <span class="hljs-number">50</span> + i * <span class="hljs-number">50</span>);
    ctx.stroke();
}
</code></pre><p>}<br>draw();</p></li></ol><p><span class="img-wrap"><img data-src="/img/remote/1460000016031136" src="https://static.alili.tech/img/remote/1460000016031136" alt="" title="" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader31">4. &#x865A;&#x7EBF;</h3><p>&#x7528; <code>setLineDash</code> &#x65B9;&#x6CD5;&#x548C; <code>lineDashOffset</code> &#x5C5E;&#x6027;&#x6765;&#x5236;&#x5B9A;&#x865A;&#x7EBF;&#x6837;&#x5F0F;. <code>setLineDash</code> &#x65B9;&#x6CD5;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x6765;&#x6307;&#x5B9A;&#x7EBF;&#x6BB5;&#x4E0E;&#x95F4;&#x9699;&#x7684;&#x4EA4;&#x66FF;&#xFF1B;<code>lineDashOffset</code>&#x5C5E;&#x6027;&#x8BBE;&#x7F6E;&#x8D77;&#x59CB;&#x504F;&#x79FB;&#x91CF;.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function draw(){
    var canvas = document.getElementById(&apos;tutorial&apos;);
    if (!canvas.getContext) return;
    var ctx = canvas.getContext(&quot;2d&quot;);

    ctx.setLineDash([20, 5]);  // [&#x5B9E;&#x7EBF;&#x957F;&#x5EA6;, &#x95F4;&#x9699;&#x957F;&#x5EA6;]
    ctx.lineDashOffset = -0;
    ctx.strokeRect(50, 50, 210, 210);
}
draw();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;tutorial&apos;</span>);
    <span class="hljs-keyword">if</span> (!canvas.getContext) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">var</span> ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);

    ctx.setLineDash([<span class="hljs-number">20</span>, <span class="hljs-number">5</span>]);  <span class="hljs-comment">// [&#x5B9E;&#x7EBF;&#x957F;&#x5EA6;, &#x95F4;&#x9699;&#x957F;&#x5EA6;]</span>
    ctx.lineDashOffset = <span class="hljs-number">-0</span>;
    ctx.strokeRect(<span class="hljs-number">50</span>, <span class="hljs-number">50</span>, <span class="hljs-number">210</span>, <span class="hljs-number">210</span>);
}
draw();
</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016031137?w=678&amp;h=416" src="https://static.alili.tech/img/remote/1460000016031137?w=678&amp;h=416" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x5907;&#x6CE8;&#xFF1A;</p><p>&#x200B; <code>getLineDash()</code>:&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5305;&#x542B;&#x5F53;&#x524D;&#x865A;&#x7EBF;&#x6837;&#x5F0F;&#xFF0C;&#x957F;&#x5EA6;&#x4E3A;&#x975E;&#x8D1F;&#x5076;&#x6570;&#x7684;&#x6570;&#x7EC4;&#x3002;</p><h1 id="articleHeader32">&#x516D;&#x3001;&#x7ED8;&#x5236;&#x6587;&#x672C;</h1><h2 id="articleHeader33">&#x7ED8;&#x5236;&#x6587;&#x672C;&#x7684;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;</h2><p>canvas &#x63D0;&#x4F9B;&#x4E86;&#x4E24;&#x79CD;&#x65B9;&#x6CD5;&#x6765;&#x6E32;&#x67D3;&#x6587;&#x672C;:</p><ol><li><code>fillText(text, x, y [, maxWidth])</code><p>&#x5728;&#x6307;&#x5B9A;&#x7684;(x,y)&#x4F4D;&#x7F6E;&#x586B;&#x5145;&#x6307;&#x5B9A;&#x7684;&#x6587;&#x672C;&#xFF0C;&#x7ED8;&#x5236;&#x7684;&#x6700;&#x5927;&#x5BBD;&#x5EA6;&#x662F;&#x53EF;&#x9009;&#x7684;.</p></li><li><p><code>strokeText(text, x, y [, maxWidth])</code></p><p>&#x5728;&#x6307;&#x5B9A;&#x7684;(x,y)&#x4F4D;&#x7F6E;&#x7ED8;&#x5236;&#x6587;&#x672C;&#x8FB9;&#x6846;&#xFF0C;&#x7ED8;&#x5236;&#x7684;&#x6700;&#x5927;&#x5BBD;&#x5EA6;&#x662F;&#x53EF;&#x9009;&#x7684;.</p><p>var ctx;<br>function draw(){</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = document.getElementById(&apos;tutorial&apos;);
if (!canvas.getContext) return;
ctx = canvas.getContext(&quot;2d&quot;);
ctx.font = &quot;100px sans-serif&quot;
ctx.fillText(&quot;&#x5929;&#x82E5;&#x6709;&#x60C5;&quot;, 10, 100);
ctx.strokeText(&quot;&#x5929;&#x82E5;&#x6709;&#x60C5;&quot;, 10, 200)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mel"><code>var <span class="hljs-keyword">canvas</span> = document.getElementById(<span class="hljs-string">&apos;tutorial&apos;</span>);
<span class="hljs-keyword">if</span> (!<span class="hljs-keyword">canvas</span>.getContext) <span class="hljs-keyword">return</span>;
ctx = <span class="hljs-keyword">canvas</span>.getContext(<span class="hljs-string">&quot;2d&quot;</span>);
ctx.font = <span class="hljs-string">&quot;100px sans-serif&quot;</span>
ctx.fillText(<span class="hljs-string">&quot;&#x5929;&#x82E5;&#x6709;&#x60C5;&quot;</span>, <span class="hljs-number">10</span>, <span class="hljs-number">100</span>);
ctx.strokeText(<span class="hljs-string">&quot;&#x5929;&#x82E5;&#x6709;&#x60C5;&quot;</span>, <span class="hljs-number">10</span>, <span class="hljs-number">200</span>)</code></pre><p>}<br>draw();</p></li></ol><p><span class="img-wrap"><img data-src="/img/remote/1460000016031138?w=647&amp;h=423" src="https://static.alili.tech/img/remote/1460000016031138?w=647&amp;h=423" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader34">&#x7ED9;&#x6587;&#x672C;&#x6DFB;&#x52A0;&#x6837;&#x5F0F;</h2><ol><li><code>font = value</code><p>&#x5F53;&#x524D;&#x6211;&#x4EEC;&#x7528;&#x6765;&#x7ED8;&#x5236;&#x6587;&#x672C;&#x7684;&#x6837;&#x5F0F;&#x3002;&#x8FD9;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x4F7F;&#x7528;&#x548C; <code>CSS font</code>&#x5C5E;&#x6027;&#x76F8;&#x540C;&#x7684;&#x8BED;&#x6CD5;. &#x9ED8;&#x8BA4;&#x7684;&#x5B57;&#x4F53;&#x662F; <code>10px sans-serif</code>&#x3002;</p></li><li><code>textAlign = value</code><p>&#x6587;&#x672C;&#x5BF9;&#x9F50;&#x9009;&#x9879;. &#x53EF;&#x9009;&#x7684;&#x503C;&#x5305;&#x62EC;&#xFF1A;<code>start</code>, <code>end</code>, <code>left</code>, <code>right</code> or <code>center</code>. &#x9ED8;&#x8BA4;&#x503C;&#x662F; <code>start</code>&#x3002;</p></li><li><code>textBaseline = value</code><p>&#x57FA;&#x7EBF;&#x5BF9;&#x9F50;&#x9009;&#x9879;&#xFF0C;&#x53EF;&#x9009;&#x7684;&#x503C;&#x5305;&#x62EC;&#xFF1A;<code>top</code>, <code>hanging</code>, <code>middle</code>, <code>alphabetic</code>, <code>ideographic</code>, <code>bottom</code>&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x662F; <code>alphabetic&#x3002;</code></p></li><li><code>direction = value</code><p>&#x6587;&#x672C;&#x65B9;&#x5411;&#x3002;&#x53EF;&#x80FD;&#x7684;&#x503C;&#x5305;&#x62EC;&#xFF1A;<code>ltr</code>, <code>rtl</code>, <code>inherit</code>&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x662F; <code>inherit&#x3002;</code></p></li></ol><h1 id="articleHeader35">&#x4E03;&#x3001;&#x7ED8;&#x5236;&#x56FE;&#x7247;</h1><p>&#x200B; &#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;<code>canvas</code>&#x4E0A;&#x76F4;&#x63A5;&#x7ED8;&#x5236;&#x56FE;&#x7247;&#x3002;</p><h2 id="articleHeader36">7.1 &#x7531;&#x96F6;&#x5F00;&#x59CB;&#x521B;&#x5EFA;&#x56FE;&#x7247;</h2><h3 id="articleHeader37">&#x521B;&#x5EFA;<code>&lt;img&gt;</code>&#x5143;&#x7D20;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var img = new Image();   // &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&lt;img&gt;&#x5143;&#x7D20;
img.src = &apos;myImage.png&apos;; // &#x8BBE;&#x7F6E;&#x56FE;&#x7247;&#x6E90;&#x5730;&#x5740;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> img = <span class="hljs-keyword">new</span> <span class="hljs-type">Image</span>();   <span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&lt;img&gt;&#x5143;&#x7D20;</span>
img.src = <span class="hljs-string">&apos;myImage.png&apos;</span>; <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x56FE;&#x7247;&#x6E90;&#x5730;&#x5740;</span>
</code></pre><p>&#x811A;&#x672C;&#x6267;&#x884C;&#x540E;&#x56FE;&#x7247;&#x5F00;&#x59CB;&#x88C5;&#x8F7D;</p><h3 id="articleHeader38">&#x7ED8;&#x5236;<code>img</code></h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x53C2;&#x6570;1&#xFF1A;&#x8981;&#x7ED8;&#x5236;&#x7684;img  &#x53C2;&#x6570;2&#x3001;3&#xFF1A;&#x7ED8;&#x5236;&#x7684;img&#x5728;canvas&#x4E2D;&#x7684;&#x5750;&#x6807;
ctx.drawImage(img,0,0); 
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code><span class="hljs-comment">//&#x53C2;&#x6570;1&#xFF1A;&#x8981;&#x7ED8;&#x5236;&#x7684;img  &#x53C2;&#x6570;2&#x3001;3&#xFF1A;&#x7ED8;&#x5236;&#x7684;img&#x5728;canvas&#x4E2D;&#x7684;&#x5750;&#x6807;</span>
ctx.drawImage(img,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>); 
</code></pre><p>&#x6CE8;&#x610F;&#xFF1A;</p><p>&#x200B; &#x8003;&#x8651;&#x5230;&#x56FE;&#x7247;&#x662F;&#x4ECE;&#x7F51;&#x7EDC;&#x52A0;&#x8F7D;&#xFF0C;&#x5982;&#x679C; <code>drawImage</code> &#x7684;&#x65F6;&#x5019;&#x56FE;&#x7247;&#x8FD8;&#x6CA1;&#x6709;&#x5B8C;&#x5168;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#xFF0C;&#x5219;&#x4EC0;&#x4E48;&#x90FD;&#x4E0D;&#x505A;&#xFF0C;&#x4E2A;&#x522B;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x629B;&#x5F02;&#x5E38;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x5E94;&#x8BE5;&#x4FDD;&#x8BC1;&#x5728; <code>img</code> &#x7ED8;&#x5236;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#x518D; <code>drawImage</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var img = new Image();   // &#x521B;&#x5EFA;img&#x5143;&#x7D20;
img.onload = function(){
  ctx.drawImage(img, 0, 0)
}
img.src = &apos;myImage.png&apos;; // &#x8BBE;&#x7F6E;&#x56FE;&#x7247;&#x6E90;&#x5730;&#x5740;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> img = <span class="hljs-keyword">new</span> Image();   <span class="hljs-comment">// &#x521B;&#x5EFA;img&#x5143;&#x7D20;</span>
img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
  ctx.drawImage(img, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)
}
img.src = <span class="hljs-string">&apos;myImage.png&apos;</span>; <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x56FE;&#x7247;&#x6E90;&#x5730;&#x5740;</span>
</code></pre><h2 id="articleHeader39">7.2 &#x7ED8;&#x5236; <code>img</code> &#x6807;&#x7B7E;&#x5143;&#x7D20;&#x4E2D;&#x7684;&#x56FE;&#x7247;</h2><p>&#x200B; <code>img</code> &#x53EF;&#x4EE5; <code>new</code> &#x4E5F;&#x53EF;&#x4EE5;&#x6765;&#x6E90;&#x4E8E;&#x6211;&#x4EEC;&#x9875;&#x9762;&#x7684; <code>&lt;img&gt;</code>&#x6807;&#x7B7E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;img src=&quot;./&#x7F8E;&#x5973;.jpg&quot; alt=&quot;&quot; width=&quot;300&quot;&gt;&lt;br&gt;
&lt;canvas id=&quot;tutorial&quot; width=&quot;600&quot; height=&quot;400&quot;&gt;&lt;/canvas&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
    function draw(){
        var canvas = document.getElementById(&apos;tutorial&apos;);
        if (!canvas.getContext) return;
        var ctx = canvas.getContext(&quot;2d&quot;);
        var img = document.querySelector(&quot;img&quot;);
        ctx.drawImage(img, 0, 0);
    }
    document.querySelector(&quot;img&quot;).onclick = function (){
        draw();
    }

&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./&#x7F8E;&#x5973;.jpg&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;&quot;</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;300&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;tutorial&quot;</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;600&quot;</span> <span class="hljs-attr">height</span>=<span class="hljs-string">&quot;400&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;tutorial&apos;</span>);
        <span class="hljs-keyword">if</span> (!canvas.getContext) <span class="hljs-keyword">return</span>;
        <span class="hljs-keyword">var</span> ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);
        <span class="hljs-keyword">var</span> img = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&quot;img&quot;</span>);
        ctx.drawImage(img, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
    }
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&quot;img&quot;</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
        draw();
    }

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre><p>&#x7B2C;&#x4E00;&#x5F20;&#x56FE;&#x7247;&#x5C31;&#x662F;&#x9875;&#x9762;&#x4E2D;&#x7684;<code>&lt;img&gt;</code>&#x6807;&#x7B7E;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016031139" src="https://static.alili.tech/img/remote/1460000016031139" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader40">7.3 &#x7F29;&#x653E;&#x56FE;&#x7247;</h2><p><code>drawImage()</code> &#x4E5F;&#x53EF;&#x4EE5;&#x518D;&#x6DFB;&#x52A0;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;</p><p>&#x200B; <code>drawImage(image, x, y, width, height)</code></p><p>&#x200B; &#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x591A;&#x4E86;2&#x4E2A;&#x53C2;&#x6570;&#xFF1A;<code>width</code> &#x548C; <code>height&#xFF0C;</code>&#x8FD9;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x7528;&#x6765;&#x63A7;&#x5236; &#x5F53;&#x50CF;canvas&#x753B;&#x5165;&#x65F6;&#x5E94;&#x8BE5;&#x7F29;&#x653E;&#x7684;&#x5927;&#x5C0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.drawImage(img, 0, 0, 400, 200)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>ctx.drawImage(img, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">400</span>, <span class="hljs-number">200</span>)
</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016031140" src="https://static.alili.tech/img/remote/1460000016031140" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader41">7.4 &#x5207;&#x7247;(<code>slice</code>)</h2><p><code>drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)</code></p><p>&#x200B; &#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x548C;&#x5176;&#x5B83;&#x7684;&#x662F;&#x76F8;&#x540C;&#x7684;&#xFF0C;&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x56FE;&#x50CF;&#x6216;&#x8005;&#x53E6;&#x4E00;&#x4E2A; canvas &#x7684;&#x5F15;&#x7528;&#x3002;</p><p>&#x5176;&#x4ED6;8&#x4E2A;&#x53C2;&#x6570;&#xFF1A;</p><p>&#x200B; &#x524D;4&#x4E2A;&#x662F;&#x5B9A;&#x4E49;&#x56FE;&#x50CF;&#x6E90;&#x7684;&#x5207;&#x7247;&#x4F4D;&#x7F6E;&#x548C;&#x5927;&#x5C0F;&#xFF0C;</p><p>&#x200B; &#x540E;4&#x4E2A;&#x5219;&#x662F;&#x5B9A;&#x4E49;&#x5207;&#x7247;&#x7684;&#x76EE;&#x6807;&#x663E;&#x793A;&#x4F4D;&#x7F6E;&#x548C;&#x5927;&#x5C0F;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016031141" src="https://static.alili.tech/img/remote/1460000016031141" alt="" title="" style="cursor:pointer"></span></p><h1 id="articleHeader42">&#x516B;&#x3001;&#x72B6;&#x6001;&#x7684;&#x4FDD;&#x5B58;&#x548C;&#x6062;&#x590D;</h1><p><code>Saving and restoring state</code>&#x662F;&#x7ED8;&#x5236;&#x590D;&#x6742;&#x56FE;&#x5F62;&#x65F6;&#x5FC5;&#x4E0D;&#x53EF;&#x5C11;&#x7684;&#x64CD;&#x4F5C;&#x3002;</p><p><code>save()&#x548C;restore()</code></p><p>&#x200B; <code>save</code> &#x548C; <code>restore</code> &#x65B9;&#x6CD5;&#x662F;&#x7528;&#x6765;&#x4FDD;&#x5B58;&#x548C;&#x6062;&#x590D; <code>canvas</code> &#x72B6;&#x6001;&#x7684;&#xFF0C;&#x90FD;&#x6CA1;&#x6709;&#x53C2;&#x6570;&#x3002;</p><p>&#x200B; <code>Canvas</code> &#x7684;&#x72B6;&#x6001;&#x5C31;&#x662F;&#x5F53;&#x524D;&#x753B;&#x9762;&#x5E94;&#x7528;&#x7684;&#x6240;&#x6709;&#x6837;&#x5F0F;&#x548C;&#x53D8;&#x5F62;&#x7684;&#x4E00;&#x4E2A;&#x5FEB;&#x7167;&#x3002;</p><ol><li><p>&#x5173;&#x4E8E; <code>save()</code></p><p>Canvas&#x72B6;&#x6001;&#x5B58;&#x50A8;&#x5728;&#x6808;&#x4E2D;&#xFF0C;&#x6BCF;&#x5F53;<code>save()</code>&#x65B9;&#x6CD5;&#x88AB;&#x8C03;&#x7528;&#x540E;&#xFF0C;&#x5F53;&#x524D;&#x7684;&#x72B6;&#x6001;&#x5C31;&#x88AB;&#x63A8;&#x9001;&#x5230;&#x6808;&#x4E2D;&#x4FDD;&#x5B58;&#x3002;&#x4E00;&#x4E2A;&#x7ED8;&#x753B;&#x72B6;&#x6001;&#x5305;&#x62EC;&#xFF1A;</p><ul><li>&#x5F53;&#x524D;&#x5E94;&#x7528;&#x7684;&#x53D8;&#x5F62;&#xFF08;&#x5373;&#x79FB;&#x52A8;&#xFF0C;&#x65CB;&#x8F6C;&#x548C;&#x7F29;&#x653E;&#xFF09;</li><li><code>strokeStyle</code>, <code>fillStyle</code>, <code>globalAlpha</code>, <code>lineWidth</code>, <code>lineCap</code>, <code>lineJoin</code>, <code>miterLimit</code>, <code>shadowOffsetX</code>, <code>shadowOffsetY</code>, <code>shadowBlur</code>, <code>shadowColor</code>, <code>globalCompositeOperation &#x7684;&#x503C;</code></li><li>&#x5F53;&#x524D;&#x7684;&#x88C1;&#x5207;&#x8DEF;&#x5F84;&#xFF08;<code>clipping path</code>&#xFF09;</li></ul></li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x200B;

**&#x53EF;&#x4EE5;&#x8C03;&#x7528;&#x4EFB;&#x610F;&#x591A;&#x6B21; `save`&#x65B9;&#x6CD5;&#x3002;**(&#x7C7B;&#x4F3C;&#x6570;&#x7EC4;&#x7684;`push()`)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs autohotkey"><code>&#x200B;

**&#x53EF;&#x4EE5;&#x8C03;&#x7528;&#x4EFB;&#x610F;&#x591A;&#x6B21; `save`&#x65B9;&#x6CD5;&#x3002;**(&#x7C7B;&#x4F3C;&#x6570;&#x7EC4;&#x7684;`push()`)
</code></pre><ol><li><p>&#x5173;&#x4E8E;<code>restore()</code></p><p>&#x6BCF;&#x4E00;&#x6B21;&#x8C03;&#x7528; <code>restore</code> &#x65B9;&#x6CD5;&#xFF0C;&#x4E0A;&#x4E00;&#x4E2A;&#x4FDD;&#x5B58;&#x7684;&#x72B6;&#x6001;&#x5C31;&#x4ECE;&#x6808;&#x4E2D;&#x5F39;&#x51FA;&#xFF0C;&#x6240;&#x6709;&#x8BBE;&#x5B9A;&#x90FD;&#x6062;&#x590D;&#x3002;(&#x7C7B;&#x4F3C;&#x6570;&#x7EC4;&#x7684;<code>pop()</code>)</p><p>var ctx;<br>function draw(){</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = document.getElementById(&apos;tutorial&apos;);
if (!canvas.getContext) return;
var ctx = canvas.getContext(&quot;2d&quot;);

ctx.fillRect(0, 0, 150, 150);   // &#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x8BBE;&#x7F6E;&#x7ED8;&#x5236;&#x4E00;&#x4E2A;&#x77E9;&#x5F62;
ctx.save();                  // &#x4FDD;&#x5B58;&#x9ED8;&#x8BA4;&#x72B6;&#x6001;

ctx.fillStyle = &apos;red&apos;       // &#x5728;&#x539F;&#x6709;&#x914D;&#x7F6E;&#x57FA;&#x7840;&#x4E0A;&#x5BF9;&#x989C;&#x8272;&#x505A;&#x6539;&#x53D8;
ctx.fillRect(15, 15, 120, 120); // &#x4F7F;&#x7528;&#x65B0;&#x7684;&#x8BBE;&#x7F6E;&#x7ED8;&#x5236;&#x4E00;&#x4E2A;&#x77E9;&#x5F62;

ctx.save();                  // &#x4FDD;&#x5B58;&#x5F53;&#x524D;&#x72B6;&#x6001;
ctx.fillStyle = &apos;#FFF&apos;       // &#x518D;&#x6B21;&#x6539;&#x53D8;&#x989C;&#x8272;&#x914D;&#x7F6E;
ctx.fillRect(30, 30, 90, 90);   // &#x4F7F;&#x7528;&#x65B0;&#x7684;&#x914D;&#x7F6E;&#x7ED8;&#x5236;&#x4E00;&#x4E2A;&#x77E9;&#x5F62;

ctx.restore();               // &#x91CD;&#x65B0;&#x52A0;&#x8F7D;&#x4E4B;&#x524D;&#x7684;&#x989C;&#x8272;&#x72B6;&#x6001;
ctx.fillRect(45, 45, 60, 60);   // &#x4F7F;&#x7528;&#x4E0A;&#x4E00;&#x6B21;&#x7684;&#x914D;&#x7F6E;&#x7ED8;&#x5236;&#x4E00;&#x4E2A;&#x77E9;&#x5F62;

ctx.restore();               // &#x52A0;&#x8F7D;&#x9ED8;&#x8BA4;&#x989C;&#x8272;&#x914D;&#x7F6E;
ctx.fillRect(60, 60, 30, 30);   // &#x4F7F;&#x7528;&#x52A0;&#x8F7D;&#x7684;&#x914D;&#x7F6E;&#x7ED8;&#x5236;&#x4E00;&#x4E2A;&#x77E9;&#x5F62;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>var canvas = document.getElementById(&apos;tutorial&apos;);
if (!canvas.getContext) return;
var ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);

ctx.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">150</span>, <span class="hljs-number">150</span>);   <span class="hljs-comment">// &#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x8BBE;&#x7F6E;&#x7ED8;&#x5236;&#x4E00;&#x4E2A;&#x77E9;&#x5F62;</span>
ctx.save();                  <span class="hljs-comment">// &#x4FDD;&#x5B58;&#x9ED8;&#x8BA4;&#x72B6;&#x6001;</span>

ctx.fillStyle = &apos;red&apos;       <span class="hljs-comment">// &#x5728;&#x539F;&#x6709;&#x914D;&#x7F6E;&#x57FA;&#x7840;&#x4E0A;&#x5BF9;&#x989C;&#x8272;&#x505A;&#x6539;&#x53D8;</span>
ctx.fillRect(<span class="hljs-number">15</span>, <span class="hljs-number">15</span>, <span class="hljs-number">120</span>, <span class="hljs-number">120</span>); <span class="hljs-comment">// &#x4F7F;&#x7528;&#x65B0;&#x7684;&#x8BBE;&#x7F6E;&#x7ED8;&#x5236;&#x4E00;&#x4E2A;&#x77E9;&#x5F62;</span>

ctx.save();                  <span class="hljs-comment">// &#x4FDD;&#x5B58;&#x5F53;&#x524D;&#x72B6;&#x6001;</span>
ctx.fillStyle = &apos;#FFF&apos;       <span class="hljs-comment">// &#x518D;&#x6B21;&#x6539;&#x53D8;&#x989C;&#x8272;&#x914D;&#x7F6E;</span>
ctx.fillRect(<span class="hljs-number">30</span>, <span class="hljs-number">30</span>, <span class="hljs-number">90</span>, <span class="hljs-number">90</span>);   <span class="hljs-comment">// &#x4F7F;&#x7528;&#x65B0;&#x7684;&#x914D;&#x7F6E;&#x7ED8;&#x5236;&#x4E00;&#x4E2A;&#x77E9;&#x5F62;</span>

ctx.restore();               <span class="hljs-comment">// &#x91CD;&#x65B0;&#x52A0;&#x8F7D;&#x4E4B;&#x524D;&#x7684;&#x989C;&#x8272;&#x72B6;&#x6001;</span>
ctx.fillRect(<span class="hljs-number">45</span>, <span class="hljs-number">45</span>, <span class="hljs-number">60</span>, <span class="hljs-number">60</span>);   <span class="hljs-comment">// &#x4F7F;&#x7528;&#x4E0A;&#x4E00;&#x6B21;&#x7684;&#x914D;&#x7F6E;&#x7ED8;&#x5236;&#x4E00;&#x4E2A;&#x77E9;&#x5F62;</span>

ctx.restore();               <span class="hljs-comment">// &#x52A0;&#x8F7D;&#x9ED8;&#x8BA4;&#x989C;&#x8272;&#x914D;&#x7F6E;</span>
ctx.fillRect(<span class="hljs-number">60</span>, <span class="hljs-number">60</span>, <span class="hljs-number">30</span>, <span class="hljs-number">30</span>);   <span class="hljs-comment">// &#x4F7F;&#x7528;&#x52A0;&#x8F7D;&#x7684;&#x914D;&#x7F6E;&#x7ED8;&#x5236;&#x4E00;&#x4E2A;&#x77E9;&#x5F62;</span></code></pre><p>}<br>draw();</p></li></ol><h1 id="articleHeader43">&#x4E5D;&#x3001;&#x53D8;&#x5F62;</h1><h2 id="articleHeader44">9.1 translate</h2><p><code>translate(x, y)</code></p><p>&#x200B; &#x7528;&#x6765;&#x79FB;&#x52A8; <code>canvas</code> &#x7684;<strong>&#x539F;&#x70B9;</strong>&#x5230;&#x6307;&#x5B9A;&#x7684;&#x4F4D;&#x7F6E;</p><p>&#x200B; <code>translate</code>&#x65B9;&#x6CD5;&#x63A5;&#x53D7;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x3002;<code>x</code> &#x662F;&#x5DE6;&#x53F3;&#x504F;&#x79FB;&#x91CF;&#xFF0C;<code>y</code> &#x662F;&#x4E0A;&#x4E0B;&#x504F;&#x79FB;&#x91CF;&#xFF0C;&#x5982;&#x53F3;&#x56FE;&#x6240;&#x793A;&#x3002;</p><p>&#x5728;&#x505A;&#x53D8;&#x5F62;&#x4E4B;&#x524D;&#x5148;&#x4FDD;&#x5B58;&#x72B6;&#x6001;&#x662F;&#x4E00;&#x4E2A;&#x826F;&#x597D;&#x7684;&#x4E60;&#x60EF;&#x3002;&#x5927;&#x591A;&#x6570;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x8C03;&#x7528; <code>restore</code> &#x65B9;&#x6CD5;&#x6BD4;&#x624B;&#x52A8;&#x6062;&#x590D;&#x539F;&#x5148;&#x7684;&#x72B6;&#x6001;&#x8981;&#x7B80;&#x5355;&#x5F97;&#x591A;&#x3002;&#x53C8;&#x5982;&#x679C;&#x4F60;&#x662F;&#x5728;&#x4E00;&#x4E2A;&#x5FAA;&#x73AF;&#x4E2D;&#x505A;&#x4F4D;&#x79FB;&#x4F46;&#x6CA1;&#x6709;&#x4FDD;&#x5B58;&#x548C;&#x6062;&#x590D;<code>canvas</code> &#x7684;&#x72B6;&#x6001;&#xFF0C;&#x5F88;&#x53EF;&#x80FD;&#x5230;&#x6700;&#x540E;&#x4F1A;&#x53D1;&#x73B0;&#x600E;&#x4E48;&#x6709;&#x4E9B;&#x4E1C;&#x897F;&#x4E0D;&#x89C1;&#x4E86;&#xFF0C;&#x90A3;&#x662F;&#x56E0;&#x4E3A;&#x5B83;&#x5F88;&#x53EF;&#x80FD;&#x5DF2;&#x7ECF;&#x8D85;&#x51FA; <code>canvas</code> &#x8303;&#x56F4;&#x4EE5;&#x5916;&#x4E86;&#x3002;</p><p>&#x200B; &#x6CE8;&#x610F;&#xFF1A;<code>translate</code>&#x79FB;&#x52A8;&#x7684;&#x662F;<code>canvas</code>&#x7684;&#x5750;&#x6807;&#x539F;&#x70B9;&#x3002;(&#x5750;&#x6807;&#x53D8;&#x6362;)</p><p>&#x200B; <span class="img-wrap"><img data-src="/img/remote/1460000016031142?w=220&amp;h=220" src="https://static.alili.tech/img/remote/1460000016031142?w=220&amp;h=220" alt="" title="" style="cursor:pointer"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ctx;
function draw(){
    var canvas = document.getElementById(&apos;tutorial1&apos;);
    if (!canvas.getContext) return;
    var ctx = canvas.getContext(&quot;2d&quot;);
    ctx.save(); //&#x4FDD;&#x5B58;&#x5750;&#x539F;&#x70B9;&#x5E73;&#x79FB;&#x4E4B;&#x524D;&#x7684;&#x72B6;&#x6001;
    ctx.translate(100, 100);
    ctx.strokeRect(0, 0, 100, 100)
    ctx.restore(); //&#x6062;&#x590D;&#x5230;&#x6700;&#x521D;&#x72B6;&#x6001;
    ctx.translate(220, 220);
    ctx.fillRect(0, 0, 100, 100)
}
draw();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>var ctx;
function draw(){
    var canvas = document.getElementById(&apos;tutorial1&apos;);
    if (!canvas.getContext) return;
    var ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);
    ctx.save(); <span class="hljs-comment">//&#x4FDD;&#x5B58;&#x5750;&#x539F;&#x70B9;&#x5E73;&#x79FB;&#x4E4B;&#x524D;&#x7684;&#x72B6;&#x6001;</span>
    ctx.translate(<span class="hljs-number">100</span>, <span class="hljs-number">100</span>);
    ctx.strokeRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">100</span>, <span class="hljs-number">100</span>)
    ctx.restore(); <span class="hljs-comment">//&#x6062;&#x590D;&#x5230;&#x6700;&#x521D;&#x72B6;&#x6001;</span>
    ctx.translate(<span class="hljs-number">220</span>, <span class="hljs-number">220</span>);
    ctx.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">100</span>, <span class="hljs-number">100</span>)
}
draw();
</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016031143" src="https://static.alili.tech/img/remote/1460000016031143" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader45">9.2 rotate</h2><p><code>rotate(angle)</code></p><p>&#x200B; &#x65CB;&#x8F6C;&#x5750;&#x6807;&#x8F74;&#x3002;</p><p>&#x200B; &#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x53EA;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;&#x65CB;&#x8F6C;&#x7684;&#x89D2;&#x5EA6;(angle)&#xFF0C;&#x5B83;&#x662F;&#x987A;&#x65F6;&#x9488;&#x65B9;&#x5411;&#x7684;&#xFF0C;&#x4EE5;&#x5F27;&#x5EA6;&#x4E3A;&#x5355;&#x4F4D;&#x7684;&#x503C;&#x3002;</p><p>&#x200B; &#x65CB;&#x8F6C;&#x7684;&#x4E2D;&#x5FC3;&#x662F;&#x5750;&#x6807;&#x539F;&#x70B9;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016031144?w=220&amp;h=220" src="https://static.alili.tech/img/remote/1460000016031144?w=220&amp;h=220" alt="" title="" style="cursor:pointer"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ctx;
function draw(){
  var canvas = document.getElementById(&apos;tutorial1&apos;);
  if (!canvas.getContext) return;
  var ctx = canvas.getContext(&quot;2d&quot;);

  ctx.fillStyle = &quot;red&quot;;
  ctx.save();

  ctx.translate(100, 100);
  ctx.rotate(Math.PI / 180 * 45);
  ctx.fillStyle = &quot;blue&quot;;
  ctx.fillRect(0, 0, 100, 100);
  ctx.restore();

  ctx.save();
  ctx.translate(0, 0);
  ctx.fillRect(0, 0, 50, 50)
  ctx.restore();
}
draw();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>var ctx;
function draw(){
  var canvas = document.getElementById(&apos;tutorial1&apos;);
  if (!canvas.getContext) return;
  var ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);

  ctx.fillStyle = <span class="hljs-string">&quot;red&quot;</span>;
  ctx.save();

  ctx.translate(<span class="hljs-number">100</span>, <span class="hljs-number">100</span>);
  ctx.rotate(Math.<span class="hljs-literal">PI</span> / <span class="hljs-number">180</span> * <span class="hljs-number">45</span>);
  ctx.fillStyle = <span class="hljs-string">&quot;blue&quot;</span>;
  ctx.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">100</span>, <span class="hljs-number">100</span>);
  ctx.restore();

  ctx.save();
  ctx.translate(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
  ctx.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">50</span>, <span class="hljs-number">50</span>)
  ctx.restore();
}
draw();
</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016031145" src="https://static.alili.tech/img/remote/1460000016031145" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader46">9.3 scale</h2><p><code>scale(x, y)</code></p><p>&#x200B; &#x6211;&#x4EEC;&#x7528;&#x5B83;&#x6765;&#x589E;&#x51CF;&#x56FE;&#x5F62;&#x5728; <code>canvas</code> &#x4E2D;&#x7684;&#x50CF;&#x7D20;&#x6570;&#x76EE;&#xFF0C;&#x5BF9;&#x5F62;&#x72B6;&#xFF0C;&#x4F4D;&#x56FE;&#x8FDB;&#x884C;&#x7F29;&#x5C0F;&#x6216;&#x8005;&#x653E;&#x5927;&#x3002;</p><p>&#x200B; <code>scale</code>&#x65B9;&#x6CD5;&#x63A5;&#x53D7;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x3002;<code>x,y</code>&#x5206;&#x522B;&#x662F;&#x6A2A;&#x8F74;&#x548C;&#x7EB5;&#x8F74;&#x7684;&#x7F29;&#x653E;&#x56E0;&#x5B50;&#xFF0C;&#x5B83;&#x4EEC;&#x90FD;&#x5FC5;&#x987B;&#x662F;&#x6B63;&#x503C;&#x3002;&#x503C;&#x6BD4; 1.0 &#x5C0F;&#x8868;&#x793A;&#x7F29; &#x5C0F;&#xFF0C;&#x6BD4; 1.0 &#x5927;&#x5219;&#x8868;&#x793A;&#x653E;&#x5927;&#xFF0C;&#x503C;&#x4E3A; 1.0 &#x65F6;&#x4EC0;&#x4E48;&#x6548;&#x679C;&#x90FD;&#x6CA1;&#x6709;&#x3002;</p><p>&#x200B; &#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;<code>canvas</code> &#x7684; 1 &#x5355;&#x4F4D;&#x5C31;&#x662F; 1 &#x4E2A;&#x50CF;&#x7D20;&#x3002;&#x4E3E;&#x4F8B;&#x8BF4;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x8BBE;&#x7F6E;&#x7F29;&#x653E;&#x56E0;&#x5B50;&#x662F; 0.5&#xFF0C;1 &#x4E2A;&#x5355;&#x4F4D;&#x5C31;&#x53D8;&#x6210;&#x5BF9;&#x5E94; 0.5 &#x4E2A;&#x50CF;&#x7D20;&#xFF0C;&#x8FD9;&#x6837;&#x7ED8;&#x5236;&#x51FA;&#x6765;&#x7684;&#x5F62;&#x72B6;&#x5C31;&#x4F1A;&#x662F;&#x539F;&#x5148;&#x7684;&#x4E00;&#x534A;&#x3002;&#x540C;&#x7406;&#xFF0C;&#x8BBE;&#x7F6E;&#x4E3A; 2.0 &#x65F6;&#xFF0C;1 &#x4E2A;&#x5355;&#x4F4D;&#x5C31;&#x5BF9;&#x5E94;&#x53D8;&#x6210;&#x4E86; 2 &#x50CF;&#x7D20;&#xFF0C;&#x7ED8;&#x5236;&#x7684;&#x7ED3;&#x679C;&#x5C31;&#x662F;&#x56FE;&#x5F62;&#x653E;&#x5927;&#x4E86; 2 &#x500D;&#x3002;</p><h2 id="articleHeader47">9.4 transform(&#x53D8;&#x5F62;&#x77E9;&#x9635;)</h2><p><code>transform(a, b, c, d, e, f)</code></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016031146" src="https://static.alili.tech/img/remote/1460000016031146" alt="" title="" style="cursor:pointer;display:inline"></span></p><p><code>a (m11)</code></p><p>&#x200B; Horizontal scaling.</p><p><code>b (m12)</code></p><p>&#x200B; Horizontal skewing.</p><p><code>c (m21)</code></p><p>&#x200B; Vertical skewing.</p><p><code>d (m22)</code></p><p>&#x200B; Vertical scaling.</p><p><code>e (dx)</code></p><p>&#x200B; Horizontal moving.</p><p><code>f (dy)</code></p><p>&#x200B; Vertical moving.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ctx;
function draw(){
    var canvas = document.getElementById(&apos;tutorial1&apos;);
    if (!canvas.getContext) return;
    var ctx = canvas.getContext(&quot;2d&quot;);
    ctx.transform(1, 1, 0, 1, 0, 0);
    ctx.fillRect(0, 0, 100, 100);
}
draw();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> ctx;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;tutorial1&apos;</span>);
    <span class="hljs-keyword">if</span> (!canvas.getContext) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">var</span> ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);
    ctx.transform(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
    ctx.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">100</span>, <span class="hljs-number">100</span>);
}
draw();
</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016031147?w=623&amp;h=408" src="https://static.alili.tech/img/remote/1460000016031147?w=623&amp;h=408" alt="" title="" style="cursor:pointer"></span></p><h1 id="articleHeader48">&#x5341;&#x3001;&#x5408;&#x6210;</h1><p>&#x200B; &#x5728;&#x524D;&#x9762;&#x7684;&#x6240;&#x6709;&#x4F8B;&#x5B50;&#x4E2D;&#x3001;&#xFF0C;&#x6211;&#x4EEC;&#x603B;&#x662F;&#x5C06;&#x4E00;&#x4E2A;&#x56FE;&#x5F62;&#x753B;&#x5728;&#x53E6;&#x4E00;&#x4E2A;&#x4E4B;&#x4E0A;&#xFF0C;&#x5BF9;&#x4E8E;&#x5176;&#x4ED6;&#x66F4;&#x591A;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x4EC5;&#x4EC5;&#x8FD9;&#x6837;&#x662F;&#x8FDC;&#x8FDC;&#x4E0D;&#x591F;&#x7684;&#x3002;&#x6BD4;&#x5982;&#xFF0C;&#x5BF9;&#x5408;&#x6210;&#x7684;&#x56FE;&#x5F62;&#x6765;&#x8BF4;&#xFF0C;&#x7ED8;&#x5236;&#x987A;&#x5E8F;&#x4F1A;&#x6709;&#x9650;&#x5236;&#x3002;&#x4E0D;&#x8FC7;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5229;&#x7528; <code>globalCompositeOperation</code> &#x5C5E;&#x6027;&#x6765;&#x6539;&#x53D8;&#x8FD9;&#x79CD;&#x72B6;&#x51B5;&#x3002;</p><p><code>globalCompositeOperation = type</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var ctx;
    function draw(){
        var canvas = document.getElementById(&apos;tutorial1&apos;);
        if (!canvas.getContext) return;
        var ctx = canvas.getContext(&quot;2d&quot;);

        ctx.fillStyle = &quot;blue&quot;;
        ctx.fillRect(0, 0, 200, 200);

        ctx.globalCompositeOperation = &quot;source-over&quot;; //&#x5168;&#x5C40;&#x5408;&#x6210;&#x64CD;&#x4F5C;
        ctx.fillStyle = &quot;red&quot;;
        ctx.fillRect(100, 100, 200, 200);
    }
    draw();

&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> ctx;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;tutorial1&apos;</span>);
        <span class="hljs-keyword">if</span> (!canvas.getContext) <span class="hljs-keyword">return</span>;
        <span class="hljs-keyword">var</span> ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);

        ctx.fillStyle = <span class="hljs-string">&quot;blue&quot;</span>;
        ctx.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">200</span>, <span class="hljs-number">200</span>);

        ctx.globalCompositeOperation = <span class="hljs-string">&quot;source-over&quot;</span>; <span class="hljs-comment">//&#x5168;&#x5C40;&#x5408;&#x6210;&#x64CD;&#x4F5C;</span>
        ctx.fillStyle = <span class="hljs-string">&quot;red&quot;</span>;
        ctx.fillRect(<span class="hljs-number">100</span>, <span class="hljs-number">100</span>, <span class="hljs-number">200</span>, <span class="hljs-number">200</span>);
    }
    draw();

<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre><p>&#x6CE8;&#xFF1A;&#x4E0B;&#x9762;&#x7684;&#x5C55;&#x793A;&#x4E2D;&#xFF0C;&#x84DD;&#x8272;&#x662F;&#x539F;&#x6709;&#x7684;&#xFF0C;&#x7EA2;&#x8272;&#x662F;&#x65B0;&#x7684;&#x3002;</p><p>type `&#x662F;&#x4E0B;&#x9762; 13 &#x79CD;&#x5B57;&#x7B26;&#x4E32;&#x503C;&#x4E4B;&#x4E00;&#xFF1A;</p><h2 id="articleHeader49">1. <code>source-over(default)</code></h2><p>&#x8FD9;&#x662F;&#x9ED8;&#x8BA4;&#x8BBE;&#x7F6E;&#xFF0C;&#x65B0;&#x56FE;&#x50CF;&#x4F1A;&#x8986;&#x76D6;&#x5728;&#x539F;&#x6709;&#x56FE;&#x50CF;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016031148?w=622&amp;h=413" src="https://static.alili.tech/img/remote/1460000016031148?w=622&amp;h=413" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader50">2. <code>source-in</code></h2><p>&#x4EC5;&#x4EC5;&#x4F1A;&#x51FA;&#x73B0;&#x65B0;&#x56FE;&#x50CF;&#x4E0E;&#x539F;&#x6765;&#x56FE;&#x50CF;&#x91CD;&#x53E0;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x5176;&#x4ED6;&#x533A;&#x57DF;&#x90FD;&#x53D8;&#x6210;&#x900F;&#x660E;&#x7684;&#x3002;(&#x5305;&#x62EC;&#x5176;&#x4ED6;&#x7684;&#x8001;&#x56FE;&#x50CF;&#x533A;&#x57DF;&#x4E5F;&#x4F1A;&#x900F;&#x660E;)</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016031149" src="https://static.alili.tech/img/remote/1460000016031149" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader51">3. <code>source-out</code></h2><p>&#x4EC5;&#x4EC5;&#x663E;&#x793A;&#x65B0;&#x56FE;&#x50CF;&#x4E0E;&#x8001;&#x56FE;&#x50CF;&#x6CA1;&#x6709;&#x91CD;&#x53E0;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x5176;&#x4F59;&#x90E8;&#x5206;&#x5168;&#x90E8;&#x900F;&#x660E;&#x3002;(&#x8001;&#x56FE;&#x50CF;&#x4E5F;&#x4E0D;&#x663E;&#x793A;)</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016031150?w=617&amp;h=413" src="https://static.alili.tech/img/remote/1460000016031150?w=617&amp;h=413" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader52">4. <code>source-atop</code></h2><p>&#x65B0;&#x56FE;&#x50CF;&#x4EC5;&#x4EC5;&#x663E;&#x793A;&#x4E0E;&#x8001;&#x56FE;&#x50CF;&#x91CD;&#x53E0;&#x533A;&#x57DF;&#x3002;&#x8001;&#x56FE;&#x50CF;&#x4ECD;&#x7136;&#x53EF;&#x4EE5;&#x663E;&#x793A;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016031151" src="https://static.alili.tech/img/remote/1460000016031151" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader53">5. <code>destination-over</code></h2><p>&#x65B0;&#x56FE;&#x50CF;&#x4F1A;&#x5728;&#x8001;&#x56FE;&#x50CF;&#x7684;&#x4E0B;&#x9762;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016031152" src="https://static.alili.tech/img/remote/1460000016031152" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader54">6. <code>destination-in</code></h2><p>&#x4EC5;&#x4EC5;&#x65B0;&#x8001;&#x56FE;&#x50CF;&#x91CD;&#x53E0;&#x90E8;&#x5206;&#x7684;&#x8001;&#x56FE;&#x50CF;&#x88AB;&#x663E;&#x793A;&#xFF0C;&#x5176;&#x4ED6;&#x533A;&#x57DF;&#x5168;&#x90E8;&#x900F;&#x660E;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016031153?w=614&amp;h=412" src="https://static.alili.tech/img/remote/1460000016031153?w=614&amp;h=412" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader55">7. <code>destination-out</code></h2><p>&#x4EC5;&#x4EC5;&#x8001;&#x56FE;&#x50CF;&#x4E0E;&#x65B0;&#x56FE;&#x50CF;&#x6CA1;&#x6709;&#x91CD;&#x53E0;&#x7684;&#x90E8;&#x5206;&#x3002; &#x6CE8;&#x610F;&#x663E;&#x793A;&#x7684;&#x662F;&#x8001;&#x56FE;&#x50CF;&#x7684;&#x90E8;&#x5206;&#x533A;&#x57DF;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016031154?w=613&amp;h=415" src="https://static.alili.tech/img/remote/1460000016031154?w=613&amp;h=415" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader56">8. <code>destination-atop</code></h2><p>&#x8001;&#x56FE;&#x50CF;&#x4EC5;&#x4EC5;&#x4EC5;&#x4EC5;&#x663E;&#x793A;&#x91CD;&#x53E0;&#x90E8;&#x5206;&#xFF0C;&#x65B0;&#x56FE;&#x50CF;&#x4F1A;&#x663E;&#x793A;&#x5728;&#x8001;&#x56FE;&#x50CF;&#x7684;&#x4E0B;&#x9762;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016031155" src="https://static.alili.tech/img/remote/1460000016031155" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader57">9. <code>lighter</code></h2><p>&#x65B0;&#x8001;&#x56FE;&#x50CF;&#x90FD;&#x663E;&#x793A;&#xFF0C;&#x4F46;&#x662F;&#x91CD;&#x53E0;&#x533A;&#x57DF;&#x7684;&#x989C;&#x8272;&#x505A;&#x52A0;&#x5904;&#x7406;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016031156?w=613&amp;h=413" src="https://static.alili.tech/img/remote/1460000016031156?w=613&amp;h=413" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader58">10. <code>darken</code></h2><p>&#x4FDD;&#x7559;&#x91CD;&#x53E0;&#x90E8;&#x5206;&#x6700;&#x9ED1;&#x7684;&#x50CF;&#x7D20;&#x3002;(&#x6BCF;&#x4E2A;&#x989C;&#x8272;&#x4F4D;&#x8FDB;&#x884C;&#x6BD4;&#x8F83;&#xFF0C;&#x5F97;&#x5230;&#x6700;&#x5C0F;&#x7684;)</p><p><code>blue: #0000ff</code></p><p><code>red: #ff0000</code></p><p>&#x6240;&#x4EE5;&#x91CD;&#x53E0;&#x90E8;&#x5206;&#x7684;&#x989C;&#x8272;&#xFF1A;<code>#000000</code></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016031157" src="https://static.alili.tech/img/remote/1460000016031157" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader59">11. <code>lighten</code></h2><p>&#x4FDD;&#x8BC1;&#x91CD;&#x53E0;&#x90E8;&#x5206;&#x6700;&#x91CF;&#x7684;&#x50CF;&#x7D20;&#x3002;(&#x6BCF;&#x4E2A;&#x989C;&#x8272;&#x4F4D;&#x8FDB;&#x884C;&#x6BD4;&#x8F83;&#xFF0C;&#x5F97;&#x5230;&#x6700;&#x5927;&#x7684;)</p><p><code>blue: #0000ff</code></p><p><code>red: #ff0000</code></p><p>&#x6240;&#x4EE5;&#x91CD;&#x53E0;&#x90E8;&#x5206;&#x7684;&#x989C;&#x8272;&#xFF1A;<code>#ff00ff</code></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016031158" src="https://static.alili.tech/img/remote/1460000016031158" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader60">12. <code>xor</code></h2><p>&#x91CD;&#x53E0;&#x90E8;&#x5206;&#x4F1A;&#x53D8;&#x6210;&#x900F;&#x660E;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016031159?w=615&amp;h=416" src="https://static.alili.tech/img/remote/1460000016031159?w=615&amp;h=416" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader61">13. <code>copy</code></h2><p>&#x53EA;&#x6709;&#x65B0;&#x56FE;&#x50CF;&#x4F1A;&#x88AB;&#x4FDD;&#x7559;&#xFF0C;&#x5176;&#x4F59;&#x7684;&#x5168;&#x90E8;&#x88AB;&#x6E05;&#x9664;(&#x8FB9;&#x900F;&#x660E;)<span class="img-wrap"><img data-src="/img/remote/1460000016031160?w=612&amp;h=412" src="https://static.alili.tech/img/remote/1460000016031160?w=612&amp;h=412" alt="" title="" style="cursor:pointer"></span></p><h1 id="articleHeader62">&#x5341;&#x4E00;&#x3001;&#x88C1;&#x526A;&#x8DEF;&#x5F84;</h1><p><code>clip()</code></p><p>&#x200B; &#x628A;&#x5DF2;&#x7ECF;&#x521B;&#x5EFA;&#x7684;&#x8DEF;&#x5F84;&#x8F6C;&#x6362;&#x6210;&#x88C1;&#x526A;&#x8DEF;&#x5F84;&#x3002;</p><p>&#x200B; &#x88C1;&#x526A;&#x8DEF;&#x5F84;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x906E;&#x7F69;&#x3002;&#x53EA;&#x663E;&#x793A;&#x88C1;&#x526A;&#x8DEF;&#x5F84;&#x5185;&#x7684;&#x533A;&#x57DF;&#xFF0C;&#x88C1;&#x526A;&#x8DEF;&#x5F84;&#x5916;&#x7684;&#x533A;&#x57DF;&#x4F1A;&#x88AB;&#x9690;&#x85CF;&#x3002;</p><p>&#x200B; &#x6CE8;&#x610F;&#xFF1A;<code>clip()</code>&#x53EA;&#x80FD;&#x906E;&#x7F69;&#x5728;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x8C03;&#x7528;&#x4E4B;&#x540E;&#x7ED8;&#x5236;&#x7684;&#x56FE;&#x50CF;&#xFF0C;&#x5982;&#x679C;&#x662F;<code>clip()</code>&#x65B9;&#x6CD5;&#x8C03;&#x7528;&#x4E4B;&#x524D;&#x7ED8;&#x5236;&#x7684;&#x56FE;&#x50CF;&#xFF0C;&#x5219;&#x65E0;&#x6CD5;&#x5B9E;&#x73B0;&#x906E;&#x7F69;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016031162" src="https://static.alili.tech/img/remote/1460000016031162" alt="" title="" style="cursor:pointer"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ctx;
function draw(){
    var canvas = document.getElementById(&apos;tutorial1&apos;);
    if (!canvas.getContext) return;
    var ctx = canvas.getContext(&quot;2d&quot;);

    ctx.beginPath();
    ctx.arc(20,20, 100, 0, Math.PI * 2);
    ctx.clip();

    ctx.fillStyle = &quot;pink&quot;;
    ctx.fillRect(20, 20, 100,100);
}
draw();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> ctx;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;tutorial1&apos;</span>);
    <span class="hljs-keyword">if</span> (!canvas.getContext) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">var</span> ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);

    ctx.beginPath();
    ctx.arc(<span class="hljs-number">20</span>,<span class="hljs-number">20</span>, <span class="hljs-number">100</span>, <span class="hljs-number">0</span>, <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>);
    ctx.clip();

    ctx.fillStyle = <span class="hljs-string">&quot;pink&quot;</span>;
    ctx.fillRect(<span class="hljs-number">20</span>, <span class="hljs-number">20</span>, <span class="hljs-number">100</span>,<span class="hljs-number">100</span>);
}
draw();
</code></pre><h1 id="articleHeader63">&#x5341;&#x4E8C;&#x3001;&#x52A8;&#x753B;</h1><h2 id="articleHeader64">&#x52A8;&#x753B;&#x7684;&#x57FA;&#x672C;&#x6B65;&#x9AA4;</h2><ol><li><strong>&#x6E05;&#x7A7A;<code>canvas</code></strong><p>&#x518D;&#x7ED8;&#x5236;&#x6BCF;&#x4E00;&#x5E27;&#x52A8;&#x753B;&#x4E4B;&#x524D;&#xFF0C;&#x9700;&#x8981;&#x6E05;&#x7A7A;&#x6240;&#x6709;&#x3002;&#x6E05;&#x7A7A;&#x6240;&#x6709;&#x6700;&#x7B80;&#x5355;&#x7684;&#x505A;&#x6CD5;&#x5C31;&#x662F;<code>clearRect()</code>&#x65B9;&#x6CD5;</p></li><li><strong>&#x4FDD;&#x5B58;<code>canvas</code>&#x72B6;&#x6001;</strong><p>&#x5982;&#x679C;&#x5728;&#x7ED8;&#x5236;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x4F1A;&#x66F4;&#x6539;<code>canvas</code>&#x7684;&#x72B6;&#x6001;(&#x989C;&#x8272;&#x3001;&#x79FB;&#x52A8;&#x4E86;&#x5750;&#x6807;&#x539F;&#x70B9;&#x7B49;),&#x53C8;&#x5728;&#x7ED8;&#x5236;&#x6BCF;&#x4E00;&#x5E27;&#x65F6;&#x90FD;&#x662F;&#x539F;&#x59CB;&#x72B6;&#x6001;&#x7684;&#x8BDD;&#xFF0C;&#x5219;&#x6700;&#x597D;&#x4FDD;&#x5B58;&#x4E0B;<code>canvas</code>&#x7684;&#x72B6;&#x6001;</p></li><li><strong>&#x7ED8;&#x5236;&#x52A8;&#x753B;&#x56FE;&#x5F62;</strong><p>&#x8FD9;&#x4E00;&#x6B65;&#x624D;&#x662F;&#x771F;&#x6B63;&#x7684;&#x7ED8;&#x5236;&#x52A8;&#x753B;&#x5E27;</p></li><li><strong>&#x6062;&#x590D;<code>canvas</code>&#x72B6;&#x6001;</strong><p>&#x5982;&#x679C;&#x4F60;&#x524D;&#x9762;&#x4FDD;&#x5B58;&#x4E86;<code>canvas</code>&#x72B6;&#x6001;&#xFF0C;&#x5219;&#x5E94;&#x8BE5;&#x5728;&#x7ED8;&#x5236;&#x5B8C;&#x6210;&#x4E00;&#x5E27;&#x4E4B;&#x540E;&#x6062;&#x590D;<code>canvas</code>&#x72B6;&#x6001;&#x3002;</p></li></ol><h2 id="articleHeader65">&#x63A7;&#x5236;&#x52A8;&#x753B;</h2><p>&#x6211;&#x4EEC;&#x53EF;&#x7528;&#x901A;&#x8FC7;<code>canvas</code>&#x7684;&#x65B9;&#x6CD5;&#x6216;&#x8005;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x65B9;&#x6CD5;&#x628A;&#x56FE;&#x50CF;&#x4F1A;&#x77E5;&#x9053;&#x5230;<code>canvas</code>&#x4E0A;&#x3002;&#x6B63;&#x5E38;&#x60C5;&#x51B5;&#xFF0C;&#x6211;&#x4EEC;&#x80FD;&#x770B;&#x5230;&#x7ED8;&#x5236;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x5728;&#x811A;&#x672C;&#x6267;&#x884C;&#x7ED3;&#x675F;&#x4E4B;&#x540E;&#x3002;&#x4F8B;&#x5982;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x53EF;&#x80FD;&#x5728;&#x4E00;&#x4E2A; <code>for</code> &#x5FAA;&#x73AF;&#x5185;&#x90E8;&#x5B8C;&#x6210;&#x52A8;&#x753B;&#x3002;</p><p>&#x4E5F;&#x5C31;&#x662F;&#xFF0C;&#x4E3A;&#x4E86;&#x6267;&#x884C;&#x52A8;&#x753B;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4E00;&#x4E9B;&#x53EF;&#x4EE5;&#x5B9A;&#x65F6;&#x6267;&#x884C;&#x91CD;&#x7ED8;&#x7684;&#x65B9;&#x6CD5;&#x3002;</p><p>&#x4E00;&#x822C;&#x7528;&#x5230;&#x4E0B;&#x9762;&#x4E09;&#x4E2A;&#x65B9;&#x6CD5;&#xFF1A;</p><ol><li><code>setInterval()</code></li><li><code>setTimeout()</code></li><li><code>requestAnimationFrame()</code></li></ol><h2 id="articleHeader66">&#x6848;&#x4F8B;1&#xFF1A;&#x592A;&#x9633;&#x7CFB;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let sun;
let earth;
let moon;
let ctx;
function init(){
    sun = new Image();
    earth = new Image();
    moon = new Image();
    sun.src = &quot;sun.png&quot;;
    earth.src = &quot;earth.png&quot;;
    moon.src = &quot;moon.png&quot;;

    let canvas = document.querySelector(&quot;#solar&quot;);
    ctx = canvas.getContext(&quot;2d&quot;);

    sun.onload = function (){
        draw()
    }

}
init();
function draw(){
    ctx.clearRect(0, 0, 300, 300); //&#x6E05;&#x7A7A;&#x6240;&#x6709;&#x7684;&#x5185;&#x5BB9;
    /*&#x7ED8;&#x5236; &#x592A;&#x9633;*/
    ctx.drawImage(sun, 0, 0, 300, 300);

    ctx.save();
    ctx.translate(150, 150);

    //&#x7ED8;&#x5236;earth&#x8F68;&#x9053;
    ctx.beginPath();
    ctx.strokeStyle = &quot;rgba(255,255,0,0.5)&quot;;
    ctx.arc(0, 0, 100, 0, 2 * Math.PI)
    ctx.stroke()

    let time = new Date();
    //&#x7ED8;&#x5236;&#x5730;&#x7403;
    ctx.rotate(2 * Math.PI / 60 * time.getSeconds() + 2 * Math.PI / 60000 * time.getMilliseconds())
    ctx.translate(100, 0);
    ctx.drawImage(earth, -12, -12)

    //&#x7ED8;&#x5236;&#x6708;&#x7403;&#x8F68;&#x9053;
    ctx.beginPath();
    ctx.strokeStyle = &quot;rgba(255,255,255,.3)&quot;;
    ctx.arc(0, 0, 40, 0, 2 * Math.PI);
    ctx.stroke();

    //&#x7ED8;&#x5236;&#x6708;&#x7403;
    ctx.rotate(2 * Math.PI / 6 * time.getSeconds() + 2 * Math.PI / 6000 * time.getMilliseconds());
    ctx.translate(40, 0);
    ctx.drawImage(moon, -3.5, -3.5);
    ctx.restore();

    requestAnimationFrame(draw);
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>let sun;
let earth;
let moon;
let ctx;
function init(){
    sun = new Image();
    earth = new Image();
    moon = new Image();
    sun.src = <span class="hljs-string">&quot;sun.png&quot;</span>;
    earth.src = <span class="hljs-string">&quot;earth.png&quot;</span>;
    moon.src = <span class="hljs-string">&quot;moon.png&quot;</span>;

    let canvas = document.querySelector(<span class="hljs-string">&quot;#solar&quot;</span>);
    ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);

    sun.onload = function (){
        draw()
    }

}
init();
function draw(){
    ctx.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">300</span>, <span class="hljs-number">300</span>); <span class="hljs-comment">//&#x6E05;&#x7A7A;&#x6240;&#x6709;&#x7684;&#x5185;&#x5BB9;</span>
    <span class="hljs-comment">/*&#x7ED8;&#x5236; &#x592A;&#x9633;*/</span>
    ctx.drawImage(sun, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">300</span>, <span class="hljs-number">300</span>);

    ctx.save();
    ctx.translate(<span class="hljs-number">150</span>, <span class="hljs-number">150</span>);

    <span class="hljs-comment">//&#x7ED8;&#x5236;earth&#x8F68;&#x9053;</span>
    ctx.beginPath();
    ctx.strokeStyle = <span class="hljs-string">&quot;rgba(255,255,0,0.5)&quot;</span>;
    ctx.arc(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">100</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span> * Math.<span class="hljs-literal">PI</span>)
    ctx.stroke()

    let time = new Date();
    <span class="hljs-comment">//&#x7ED8;&#x5236;&#x5730;&#x7403;</span>
    ctx.rotate(<span class="hljs-number">2</span> * Math.<span class="hljs-literal">PI</span> / <span class="hljs-number">60</span> * time.getSeconds() + <span class="hljs-number">2</span> * Math.<span class="hljs-literal">PI</span> / <span class="hljs-number">60000</span> * time.getMilliseconds())
    ctx.translate(<span class="hljs-number">100</span>, <span class="hljs-number">0</span>);
    ctx.drawImage(earth, <span class="hljs-number">-12</span>, <span class="hljs-number">-12</span>)

    <span class="hljs-comment">//&#x7ED8;&#x5236;&#x6708;&#x7403;&#x8F68;&#x9053;</span>
    ctx.beginPath();
    ctx.strokeStyle = <span class="hljs-string">&quot;rgba(255,255,255,.3)&quot;</span>;
    ctx.arc(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">40</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span> * Math.<span class="hljs-literal">PI</span>);
    ctx.stroke();

    <span class="hljs-comment">//&#x7ED8;&#x5236;&#x6708;&#x7403;</span>
    ctx.rotate(<span class="hljs-number">2</span> * Math.<span class="hljs-literal">PI</span> / <span class="hljs-number">6</span> * time.getSeconds() + <span class="hljs-number">2</span> * Math.<span class="hljs-literal">PI</span> / <span class="hljs-number">6000</span> * time.getMilliseconds());
    ctx.translate(<span class="hljs-number">40</span>, <span class="hljs-number">0</span>);
    ctx.drawImage(moon, <span class="hljs-number">-3.5</span>, <span class="hljs-number">-3.5</span>);
    ctx.restore();

    requestAnimationFrame(draw);
}
</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016031163" src="https://static.alili.tech/img/remote/1460000016031163" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader67">&#x6848;&#x4F8B;2&#xFF1A;&#x6A21;&#x62DF;&#x65F6;&#x949F;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;Title&lt;/title&gt;
    &lt;style&gt;
        body {
            padding: 0;
            margin: 0;
            background-color: rgba(0, 0, 0, 0.1)
        }

        canvas {
            display: block;
            margin: 200px auto;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;canvas id=&quot;solar&quot; width=&quot;300&quot; height=&quot;300&quot;&gt;&lt;/canvas&gt;
&lt;script&gt;
    init();

    function init(){
        let canvas = document.querySelector(&quot;#solar&quot;);
        let ctx = canvas.getContext(&quot;2d&quot;);
        draw(ctx);
    }

    function draw(ctx){
        requestAnimationFrame(function step(){
            drawDial(ctx); //&#x7ED8;&#x5236;&#x8868;&#x76D8;
            drawAllHands(ctx); //&#x7ED8;&#x5236;&#x65F6;&#x5206;&#x79D2;&#x9488;
            requestAnimationFrame(step);
        });
    }
    /*&#x7ED8;&#x5236;&#x65F6;&#x5206;&#x79D2;&#x9488;*/
    function drawAllHands(ctx){
        let time = new Date();

        let s = time.getSeconds();
        let m = time.getMinutes();
        let h = time.getHours();

        let pi = Math.PI;
        let secondAngle = pi / 180 * 6 * s;  //&#x8BA1;&#x7B97;&#x51FA;&#x6765;s&#x9488;&#x7684;&#x5F27;&#x5EA6;
        let minuteAngle = pi / 180 * 6 * m + secondAngle / 60;  //&#x8BA1;&#x7B97;&#x51FA;&#x6765;&#x5206;&#x9488;&#x7684;&#x5F27;&#x5EA6;
        let hourAngle = pi / 180 * 30 * h + minuteAngle / 12;  //&#x8BA1;&#x7B97;&#x51FA;&#x6765;&#x65F6;&#x9488;&#x7684;&#x5F27;&#x5EA6;

        drawHand(hourAngle, 60, 6, &quot;red&quot;, ctx);  //&#x7ED8;&#x5236;&#x65F6;&#x9488;
        drawHand(minuteAngle, 106, 4, &quot;green&quot;, ctx);  //&#x7ED8;&#x5236;&#x5206;&#x9488;
        drawHand(secondAngle, 129, 2, &quot;blue&quot;, ctx);  //&#x7ED8;&#x5236;&#x79D2;&#x9488;
    }
    /*&#x7ED8;&#x5236;&#x65F6;&#x9488;&#x3001;&#x6216;&#x5206;&#x9488;&#x3001;&#x6216;&#x79D2;&#x9488;
     * &#x53C2;&#x6570;1&#xFF1A;&#x8981;&#x7ED8;&#x5236;&#x7684;&#x9488;&#x7684;&#x89D2;&#x5EA6;
     * &#x53C2;&#x6570;2&#xFF1A;&#x8981;&#x7ED8;&#x5236;&#x7684;&#x9488;&#x7684;&#x957F;&#x5EA6;
     * &#x53C2;&#x6570;3&#xFF1A;&#x8981;&#x7ED8;&#x5236;&#x7684;&#x9488;&#x7684;&#x5BBD;&#x5EA6;
     * &#x53C2;&#x6570;4&#xFF1A;&#x8981;&#x7ED8;&#x5236;&#x7684;&#x9488;&#x7684;&#x989C;&#x8272;
     * &#x53C2;&#x6570;4&#xFF1A;ctx
     * */
    function drawHand(angle, len, width, color, ctx){
        ctx.save();
        ctx.translate(150, 150); //&#x628A;&#x5750;&#x6807;&#x8F74;&#x7684;&#x8FDC;&#x70B9;&#x5E73;&#x79FB;&#x5230;&#x539F;&#x6765;&#x7684;&#x4E2D;&#x5FC3;
        ctx.rotate(-Math.PI / 2 + angle);  //&#x65CB;&#x8F6C;&#x5750;&#x6807;&#x8F74;&#x3002; x&#x8F74;&#x5C31;&#x662F;&#x9488;&#x7684;&#x89D2;&#x5EA6;
        ctx.beginPath();
        ctx.moveTo(-4, 0);
        ctx.lineTo(len, 0);  // &#x6CBF;&#x7740;x&#x8F74;&#x7ED8;&#x5236;&#x9488;
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.lineCap = &quot;round&quot;;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    /*&#x7ED8;&#x5236;&#x8868;&#x76D8;*/
    function drawDial(ctx){
        let pi = Math.PI;

        ctx.clearRect(0, 0, 300, 300); //&#x6E05;&#x9664;&#x6240;&#x6709;&#x5185;&#x5BB9;
        ctx.save();

        ctx.translate(150, 150); //&#x4E00;&#x5B9A;&#x5750;&#x6807;&#x539F;&#x70B9;&#x5230;&#x539F;&#x6765;&#x7684;&#x4E2D;&#x5FC3;
        ctx.beginPath();
        ctx.arc(0, 0, 148, 0, 2 * pi); //&#x7ED8;&#x5236;&#x5706;&#x5468;
        ctx.stroke();
        ctx.closePath();

        for (let i = 0; i &lt; 60; i++){//&#x7ED8;&#x5236;&#x523B;&#x5EA6;&#x3002;
            ctx.save();
            ctx.rotate(-pi / 2 + i * pi / 30);  //&#x65CB;&#x8F6C;&#x5750;&#x6807;&#x8F74;&#x3002;&#x5750;&#x6807;&#x8F74;x&#x7684;&#x6B63;&#x65B9;&#x5F62;&#x4ECE; &#x5411;&#x4E0A;&#x5F00;&#x59CB;&#x7B97;&#x8D77;
            ctx.beginPath();
            ctx.moveTo(110, 0);
            ctx.lineTo(140, 0);
            ctx.lineWidth = i % 5 ? 2 : 4;
            ctx.strokeStyle = i % 5 ? &quot;blue&quot; : &quot;red&quot;;
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
        ctx.restore();
    }
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.1)
        }

        <span class="hljs-selector-tag">canvas</span> {
            <span class="hljs-attribute">display</span>: block;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">200px</span> auto;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;solar&quot;</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;300&quot;</span> <span class="hljs-attr">height</span>=<span class="hljs-string">&quot;300&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    init();

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">let</span> canvas = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&quot;#solar&quot;</span>);
        <span class="hljs-keyword">let</span> ctx = canvas.getContext(<span class="hljs-string">&quot;2d&quot;</span>);
        draw(ctx);
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params">ctx</span>)</span>{
        requestAnimationFrame(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">step</span>(<span class="hljs-params"></span>)</span>{
            drawDial(ctx); <span class="hljs-comment">//&#x7ED8;&#x5236;&#x8868;&#x76D8;</span>
            drawAllHands(ctx); <span class="hljs-comment">//&#x7ED8;&#x5236;&#x65F6;&#x5206;&#x79D2;&#x9488;</span>
            requestAnimationFrame(step);
        });
    }
    <span class="hljs-comment">/*&#x7ED8;&#x5236;&#x65F6;&#x5206;&#x79D2;&#x9488;*/</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawAllHands</span>(<span class="hljs-params">ctx</span>)</span>{
        <span class="hljs-keyword">let</span> time = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();

        <span class="hljs-keyword">let</span> s = time.getSeconds();
        <span class="hljs-keyword">let</span> m = time.getMinutes();
        <span class="hljs-keyword">let</span> h = time.getHours();

        <span class="hljs-keyword">let</span> pi = <span class="hljs-built_in">Math</span>.PI;
        <span class="hljs-keyword">let</span> secondAngle = pi / <span class="hljs-number">180</span> * <span class="hljs-number">6</span> * s;  <span class="hljs-comment">//&#x8BA1;&#x7B97;&#x51FA;&#x6765;s&#x9488;&#x7684;&#x5F27;&#x5EA6;</span>
        <span class="hljs-keyword">let</span> minuteAngle = pi / <span class="hljs-number">180</span> * <span class="hljs-number">6</span> * m + secondAngle / <span class="hljs-number">60</span>;  <span class="hljs-comment">//&#x8BA1;&#x7B97;&#x51FA;&#x6765;&#x5206;&#x9488;&#x7684;&#x5F27;&#x5EA6;</span>
        <span class="hljs-keyword">let</span> hourAngle = pi / <span class="hljs-number">180</span> * <span class="hljs-number">30</span> * h + minuteAngle / <span class="hljs-number">12</span>;  <span class="hljs-comment">//&#x8BA1;&#x7B97;&#x51FA;&#x6765;&#x65F6;&#x9488;&#x7684;&#x5F27;&#x5EA6;</span>

        drawHand(hourAngle, <span class="hljs-number">60</span>, <span class="hljs-number">6</span>, <span class="hljs-string">&quot;red&quot;</span>, ctx);  <span class="hljs-comment">//&#x7ED8;&#x5236;&#x65F6;&#x9488;</span>
        drawHand(minuteAngle, <span class="hljs-number">106</span>, <span class="hljs-number">4</span>, <span class="hljs-string">&quot;green&quot;</span>, ctx);  <span class="hljs-comment">//&#x7ED8;&#x5236;&#x5206;&#x9488;</span>
        drawHand(secondAngle, <span class="hljs-number">129</span>, <span class="hljs-number">2</span>, <span class="hljs-string">&quot;blue&quot;</span>, ctx);  <span class="hljs-comment">//&#x7ED8;&#x5236;&#x79D2;&#x9488;</span>
    }
    <span class="hljs-comment">/*&#x7ED8;&#x5236;&#x65F6;&#x9488;&#x3001;&#x6216;&#x5206;&#x9488;&#x3001;&#x6216;&#x79D2;&#x9488;
     * &#x53C2;&#x6570;1&#xFF1A;&#x8981;&#x7ED8;&#x5236;&#x7684;&#x9488;&#x7684;&#x89D2;&#x5EA6;
     * &#x53C2;&#x6570;2&#xFF1A;&#x8981;&#x7ED8;&#x5236;&#x7684;&#x9488;&#x7684;&#x957F;&#x5EA6;
     * &#x53C2;&#x6570;3&#xFF1A;&#x8981;&#x7ED8;&#x5236;&#x7684;&#x9488;&#x7684;&#x5BBD;&#x5EA6;
     * &#x53C2;&#x6570;4&#xFF1A;&#x8981;&#x7ED8;&#x5236;&#x7684;&#x9488;&#x7684;&#x989C;&#x8272;
     * &#x53C2;&#x6570;4&#xFF1A;ctx
     * */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawHand</span>(<span class="hljs-params">angle, len, width, color, ctx</span>)</span>{
        ctx.save();
        ctx.translate(<span class="hljs-number">150</span>, <span class="hljs-number">150</span>); <span class="hljs-comment">//&#x628A;&#x5750;&#x6807;&#x8F74;&#x7684;&#x8FDC;&#x70B9;&#x5E73;&#x79FB;&#x5230;&#x539F;&#x6765;&#x7684;&#x4E2D;&#x5FC3;</span>
        ctx.rotate(-<span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">2</span> + angle);  <span class="hljs-comment">//&#x65CB;&#x8F6C;&#x5750;&#x6807;&#x8F74;&#x3002; x&#x8F74;&#x5C31;&#x662F;&#x9488;&#x7684;&#x89D2;&#x5EA6;</span>
        ctx.beginPath();
        ctx.moveTo(<span class="hljs-number">-4</span>, <span class="hljs-number">0</span>);
        ctx.lineTo(len, <span class="hljs-number">0</span>);  <span class="hljs-comment">// &#x6CBF;&#x7740;x&#x8F74;&#x7ED8;&#x5236;&#x9488;</span>
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.lineCap = <span class="hljs-string">&quot;round&quot;</span>;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    <span class="hljs-comment">/*&#x7ED8;&#x5236;&#x8868;&#x76D8;*/</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawDial</span>(<span class="hljs-params">ctx</span>)</span>{
        <span class="hljs-keyword">let</span> pi = <span class="hljs-built_in">Math</span>.PI;

        ctx.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">300</span>, <span class="hljs-number">300</span>); <span class="hljs-comment">//&#x6E05;&#x9664;&#x6240;&#x6709;&#x5185;&#x5BB9;</span>
        ctx.save();

        ctx.translate(<span class="hljs-number">150</span>, <span class="hljs-number">150</span>); <span class="hljs-comment">//&#x4E00;&#x5B9A;&#x5750;&#x6807;&#x539F;&#x70B9;&#x5230;&#x539F;&#x6765;&#x7684;&#x4E2D;&#x5FC3;</span>
        ctx.beginPath();
        ctx.arc(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">148</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span> * pi); <span class="hljs-comment">//&#x7ED8;&#x5236;&#x5706;&#x5468;</span>
        ctx.stroke();
        ctx.closePath();

        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">60</span>; i++){<span class="hljs-comment">//&#x7ED8;&#x5236;&#x523B;&#x5EA6;&#x3002;</span>
            ctx.save();
            ctx.rotate(-pi / <span class="hljs-number">2</span> + i * pi / <span class="hljs-number">30</span>);  <span class="hljs-comment">//&#x65CB;&#x8F6C;&#x5750;&#x6807;&#x8F74;&#x3002;&#x5750;&#x6807;&#x8F74;x&#x7684;&#x6B63;&#x65B9;&#x5F62;&#x4ECE; &#x5411;&#x4E0A;&#x5F00;&#x59CB;&#x7B97;&#x8D77;</span>
            ctx.beginPath();
            ctx.moveTo(<span class="hljs-number">110</span>, <span class="hljs-number">0</span>);
            ctx.lineTo(<span class="hljs-number">140</span>, <span class="hljs-number">0</span>);
            ctx.lineWidth = i % <span class="hljs-number">5</span> ? <span class="hljs-number">2</span> : <span class="hljs-number">4</span>;
            ctx.strokeStyle = i % <span class="hljs-number">5</span> ? <span class="hljs-string">&quot;blue&quot;</span> : <span class="hljs-string">&quot;red&quot;</span>;
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
        ctx.restore();
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016031164?w=312&amp;h=314" src="https://static.alili.tech/img/remote/1460000016031164?w=312&amp;h=314" alt="" title="" style="cursor:pointer"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
学习HTML5 Canvas这一篇文章就够了

## 原文链接
[https://segmentfault.com/a/1190000016031115](https://segmentfault.com/a/1190000016031115)

