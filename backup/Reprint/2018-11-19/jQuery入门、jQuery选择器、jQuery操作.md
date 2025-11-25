---
title: 'jQuery入门、jQuery选择器、jQuery操作' 
date: 2018-11-19 2:30:10
hidden: true
slug: i1ssbzvy0i
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x4E00;&#x3001;&#x4EC0;&#x4E48;&#x662F;jQuery&#x53CA;&#x5982;&#x4F55;&#x4F7F;&#x7528;</h1><h2 id="articleHeader1">1.1 jQuery &#x7B80;&#x4ECB;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jQuery&#x662F;&#x4E00;&#x4E2A;&#x517C;&#x5BB9;&#x591A;&#x6D4F;&#x89C8;&#x5668;&#x7684;javascript&#x51FD;&#x6570;&#x5E93;(&#x628A;&#x6211;&#x4EEC;&#x5E38;&#x7528;&#x7684;&#x4E00;&#x4E9B;&#x529F;&#x80FD;&#x8FDB;&#x884C;&#x4E86;&#x5C01;&#x88C5;&#xFF0C;&#x65B9;&#x4FBF;&#x6211;&#x4EEC;&#x6765;&#x8C03;&#x7528;&#xFF0C;&#x63D0;&#x9AD8;&#x6211;&#x4EEC;&#x7684;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x3002;)&#xFF0C;&#x6838;&#x5FC3;&#x7406;&#x5FF5;&#x662F;write less,do more(&#x5199;&#x5F97;&#x66F4;&#x5C11;,&#x505A;&#x5F97;&#x66F4;&#x591A;)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gcode"><code>jQuery&#x662F;&#x4E00;&#x4E2A;&#x517C;&#x5BB9;&#x591A;&#x6D4F;&#x89C8;&#x5668;&#x7684;javascript&#x51FD;&#x6570;&#x5E93;<span class="hljs-comment">(&#x628A;&#x6211;&#x4EEC;&#x5E38;&#x7528;&#x7684;&#x4E00;&#x4E9B;&#x529F;&#x80FD;&#x8FDB;&#x884C;&#x4E86;&#x5C01;&#x88C5;&#xFF0C;&#x65B9;&#x4FBF;&#x6211;&#x4EEC;&#x6765;&#x8C03;&#x7528;&#xFF0C;&#x63D0;&#x9AD8;&#x6211;&#x4EEC;&#x7684;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x3002;)</span>&#xFF0C;&#x6838;&#x5FC3;&#x7406;&#x5FF5;&#x662F;write less,<span class="hljs-keyword">do</span> more<span class="hljs-comment">(&#x5199;&#x5F97;&#x66F4;&#x5C11;,&#x505A;&#x5F97;&#x66F4;&#x591A;)</span>
</code></pre><h2 id="articleHeader2">1.2 jQuery &#x548C; Js &#x7684;&#x533A;&#x522B;</h2><p><strong>Javascript&#x662F;&#x4E00;&#x95E8;&#x7F16;&#x7A0B;&#x8BED;&#x8A00;&#xFF0C;&#x6211;&#x4EEC;&#x7528;&#x5B83;&#x6765;&#x7F16;&#x5199;&#x5BA2;&#x6237;&#x7AEF;&#x6D4F;&#x89C8;&#x5668;&#x811A;&#x672C;&#x3002;</strong><br><strong>jQuery&#x662F;javascript&#x7684;&#x4E00;&#x4E2A;&#x5E93;&#xFF08;&#x6846;&#x67B6;&#xFF09;&#xFF0C;&#x5305;&#x542B;&#x591A;&#x4E2A;&#x53EF;&#x91CD;&#x7528;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x6765;&#x8F85;&#x52A9;&#x6211;&#x4EEC;&#x7B80;&#x5316;javascript&#x5F00;&#x53D1;&#x3002;</strong></p><p><span class="img-wrap"><img data-src="/img/bVbeFPW?w=756&amp;h=455" src="https://static.alili.tech/img/bVbeFPW?w=756&amp;h=455" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x6CE8;&#x610F;&#xFF1A;jQuery&#x80FD;&#x505A;&#x7684;javascipt&#x90FD;&#x80FD;&#x505A;&#x5230;&#xFF0C;&#x800C;javascript&#x80FD;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;jQuer&#x4E0D;&#x4E00;&#x5B9A;&#x80FD;&#x505A;&#x5230;&#x3002;</p><h1 id="articleHeader3">&#x4E8C;&#x3001;jQuery &#x7684;&#x57FA;&#x672C;&#x4F7F;&#x7528;</h1><h2 id="articleHeader4">2.1 jQuery &#x7684;&#x5165;&#x53E3;&#x51FD;&#x6570;</h2><ul><li>&#x5165;&#x53E3;&#x65B9;&#x5F0F;&#x4E00;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     $(document).ready(function() {
     
    });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">     $(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
     
    });</code></pre><ul><li>&#x5165;&#x53E3;&#x65B9;&#x5F0F;&#x4E8C;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    $(function() {
    
    });
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    
    });
</code></pre><h2 id="articleHeader5">2.2 $(document).ready&#x548C;window.onload &#x533A;&#x522B;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="windows.onload&#x65B9;&#x6CD5;&#x662F;&#x5728;&#x7F51;&#x9875;&#x4E2D;&#x6240;&#x6709;&#x7684;&#x5143;&#x7D20;&#xFF08;&#x5305;&#x62EC;&#x5143;&#x7D20;&#x7684;&#x6240;&#x6709;&#x5173;&#x8054;&#x6587;&#x4EF6;&#xFF09;&#x5B8C;&#x5168;&#x52A0;&#x8F7D;&#x5230;&#x6D4F;&#x89C8;&#x5668;&#x540E;&#x624D;&#x6267;&#x884C;&#xFF0C;&#x5373;Javascript&#x6B64;&#x65F6;&#x624D;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x7F51;&#x9875;&#x4E2D;&#x7684;&#x4EFB;&#x4F55;&#x5143;&#x7D20;&#x3002;


jQuery&#x4E2D;&#x7684;$&#xFF08;document&#xFF09;.ready&#xFF08;&#xFF09;&#x65B9;&#x6CD5;&#x6CE8;&#x518C;&#x7684;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x7A0B;&#x5E8F;&#xFF0C; &#x5728;DOM&#x5B8C;&#x5168;&#x5C31;&#x7EEA;&#x65F6;&#x5C31;&#x53EF;&#x4EE5;&#x88AB;&#x8C03;&#x7528;&#x3002;&#x6B64;&#x65F6;&#xFF0C;&#x7F51;&#x9875;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x5BF9;jQuery&#x800C;&#x8A00;&#x90FD;&#x662F;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#xFF0C;&#x8FD9;&#x5E76;&#x4E0D;&#x610F;&#x5473;&#x7740;&#x8FD9;&#x4E9B;&#x5143;&#x7D20;&#x5173;&#x8054;&#x7684;&#x6587;&#x4EF6;&#x90FD;&#x5DF2;&#x7ECF;&#x4E0B;&#x8F7D;&#x5B8C;&#x6BD5;&#x3002;


" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code>windows.onload&#x65B9;&#x6CD5;&#x662F;&#x5728;&#x7F51;&#x9875;&#x4E2D;&#x6240;&#x6709;&#x7684;&#x5143;&#x7D20;&#xFF08;&#x5305;&#x62EC;&#x5143;&#x7D20;&#x7684;&#x6240;&#x6709;&#x5173;&#x8054;&#x6587;&#x4EF6;&#xFF09;&#x5B8C;&#x5168;&#x52A0;&#x8F7D;&#x5230;&#x6D4F;&#x89C8;&#x5668;&#x540E;&#x624D;&#x6267;&#x884C;&#xFF0C;&#x5373;<span class="hljs-keyword">Javascript&#x6B64;&#x65F6;&#x624D;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x7F51;&#x9875;&#x4E2D;&#x7684;&#x4EFB;&#x4F55;&#x5143;&#x7D20;&#x3002;
</span>

<span class="hljs-keyword">jQuery&#x4E2D;&#x7684;$&#xFF08;document&#xFF09;.ready&#xFF08;&#xFF09;&#x65B9;&#x6CD5;&#x6CE8;&#x518C;&#x7684;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x7A0B;&#x5E8F;&#xFF0C; </span>&#x5728;DOM&#x5B8C;&#x5168;&#x5C31;&#x7EEA;&#x65F6;&#x5C31;&#x53EF;&#x4EE5;&#x88AB;&#x8C03;&#x7528;&#x3002;&#x6B64;&#x65F6;&#xFF0C;&#x7F51;&#x9875;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x5BF9;<span class="hljs-keyword">jQuery&#x800C;&#x8A00;&#x90FD;&#x662F;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#xFF0C;&#x8FD9;&#x5E76;&#x4E0D;&#x610F;&#x5473;&#x7740;&#x8FD9;&#x4E9B;&#x5143;&#x7D20;&#x5173;&#x8054;&#x7684;&#x6587;&#x4EF6;&#x90FD;&#x5DF2;&#x7ECF;&#x4E0B;&#x8F7D;&#x5B8C;&#x6BD5;&#x3002;
</span>

</code></pre><h2 id="articleHeader6">2.3 &#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x7A0B;&#x5E8F;</h2><ul><li>&#x4E8B;&#x4EF6;&#x6E90;</li></ul><p>&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;JS&#x65B9;&#x5F0F;&#xFF1A;document.getElementById(&#x201C;id&#x201D;);</p><p>&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;jQuery&#x65B9;&#x5F0F;&#xFF1A;$(&#x201C;#id&#x201D;);</p><ul><li>&#x4E8B;&#x4EF6;</li></ul><p>&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;Js&#x65B9;&#x5F0F; :document.getElementById(&#x201C;id&#x201D;).onclick</p><p>&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;jQuery&#x65B9;&#x5F0F;: $(&#x201C;#id&#x201D;).click</p><blockquote>&#x4E8B;&#x4EF6;&#x533A;&#x522B;&#xFF1A;jQuery &#x4E8B;&#x4EF6;&#x4E0D;&#x5E26;on</blockquote><ul><li>&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x7A0B;&#x5E8F;</li></ul><p>&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;JS&#x7684;&#x4E66;&#x5199;&#x65B9;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        document.getElementById(&#x201C;id&#x201D;).onclick = function(){
                  // &#x8BED;&#x53E5;
              }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">        <span class="hljs-built_in">document</span>.getElementById(&#x201C;id&#x201D;).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                  <span class="hljs-comment">// &#x8BED;&#x53E5;</span>
              }</code></pre><p>&#xA0;&#xA0;&#xA0;&#xA0;&#xA0; jQuery &#x7684;&#x4E66;&#x5199;&#x65B9;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        $(&#x201C;#id&#x201D;).click(function(){
                // &#x8BED;&#x53E5;
            });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">        $(&#x201C;#id&#x201D;).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-comment">// &#x8BED;&#x53E5;</span>
            });</code></pre><h2 id="articleHeader7">2.4 jQuery &#x521D;&#x63A2;</h2><p>jQuery &#x8BED;&#x6CD5;&#x662F;&#x4E3B;&#x8981;&#x4E3A; HTML&#x5143;&#x7D20;&#x7684;&#x9009;&#x53D6;&#x7F16;&#x5236;&#x7684;&#xFF0C;&#x53EF;&#x4EE5;&#x5BF9;&#x5143;&#x7D20;&#x6267;&#x884C;&#x67D0;&#x4E9B;&#x64CD;&#x4F5C;&#x3002;</p><p>&#x57FA;&#x672C;&#x8BED;&#x6CD5;&#x662F;&#xFF1A;$(selector).action()</p><ul><li>&#x7F8E;&#x5143;&#x7B26;&#x53F7;&#x5B9A;&#x4E49; jQuery</li><li>&#x9009;&#x62E9;&#x5668;&#xFF08;selector&#xFF09;&#x201C;&#x67E5;&#x8BE2;&#x201D;&#x548C;&#x201C;&#x67E5;&#x627E;&#x201D; HTML &#x5143;&#x7D20;</li><li>jQuery&#x7684;action() &#x6267;&#x884C;&#x5BF9;&#x5143;&#x7D20;&#x7684;&#x64CD;&#x4F5C;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        &lt;input type=&quot;text&quot; id=&quot;username&quot; value=&quot;&#x8BF7;&#x8F93;&#x5165;&#x7528;&#x6237;&#x540D;&quot;&gt;
    &lt;!-- &#x5F15;&#x7528;&#x5916;&#x90E8;jQuery --&gt;
    &lt;script src=&quot;js/jquery.js&quot;&gt;&lt;/script&gt;
        &lt;script&gt;
        // &#x9700;&#x6C42; - &#x83B7;&#x53D6;id&#x4E3A;username&#x5143;&#x7D20;,&#x5E76;&#x4E14;&#x6253;&#x5370;value&#x5C5E;&#x6027;&#x503C;
        // DOM&#x5BF9;&#x8C61;
        var username = document.getElementById(&quot;username&quot;);
        console.log(username.value);
        // jQuery&#x5BF9;&#x8C61;
        var username =$(&quot;#username&quot;)
        console.log(username.val());
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">        &lt;input type=<span class="hljs-string">&quot;text&quot;</span> id=<span class="hljs-string">&quot;username&quot;</span> value=<span class="hljs-string">&quot;&#x8BF7;&#x8F93;&#x5165;&#x7528;&#x6237;&#x540D;&quot;</span>&gt;
    <span class="xml"><span class="hljs-comment">&lt;!-- &#x5F15;&#x7528;&#x5916;&#x90E8;jQuery --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;js/jquery.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-comment">// &#x9700;&#x6C42; - &#x83B7;&#x53D6;id&#x4E3A;username&#x5143;&#x7D20;,&#x5E76;&#x4E14;&#x6253;&#x5370;value&#x5C5E;&#x6027;&#x503C;</span>
        <span class="hljs-comment">// DOM&#x5BF9;&#x8C61;</span>
        <span class="hljs-keyword">var</span> username = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;username&quot;</span>);
        <span class="hljs-built_in">console</span>.log(username.value);
        <span class="hljs-comment">// jQuery&#x5BF9;&#x8C61;</span>
        <span class="hljs-keyword">var</span> username =$(<span class="hljs-string">&quot;#username&quot;</span>)
        <span class="hljs-built_in">console</span>.log(username.val());
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFP6?w=779&amp;h=168" src="https://static.alili.tech/img/bVbeFP6?w=779&amp;h=168" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h1 id="articleHeader8">&#x4E09;&#x3001;DOM&#x5BF9;&#x8C61;&#x4E0E;jQuery&#x5BF9;&#x8C61;&#x7684;&#x8F6C;&#x6362;</h1><h2 id="articleHeader9">3.1 DOM&#x539F;&#x751F;&#x5BF9;&#x8C61;&#x8F6C;&#x6362;&#x4E3A;jQuery&#x5BF9;&#x8C61;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;input type=&quot;text&quot; id=&quot;username&quot; value=&quot;&#x8BF7;&#x8F93;&#x5165;&#x7528;&#x6237;&#x540D;&quot;&gt;
    &lt;!-- &#x5F15;&#x7528;&#x5916;&#x90E8;jQuery --&gt;
    &lt;script src=&quot;js/jquery.js&quot;&gt;&lt;/script&gt;
        &lt;script&gt;
        // DOM&#x5BF9;&#x8C61;
        var username = document.getElementById(&quot;username&quot;);
        // DOM&#x5BF9;&#x8C61;&#x8F6C;&#x6362;&#x6210; jQueruy&#x5BF9;&#x8C61;
        username = $(username);
        // &#x6253;&#x5370;jQueruy&#x5BF9;&#x8C61;
        console.log(username);
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;input type=<span class="hljs-string">&quot;text&quot;</span> id=<span class="hljs-string">&quot;username&quot;</span> value=<span class="hljs-string">&quot;&#x8BF7;&#x8F93;&#x5165;&#x7528;&#x6237;&#x540D;&quot;</span>&gt;
    <span class="xml"><span class="hljs-comment">&lt;!-- &#x5F15;&#x7528;&#x5916;&#x90E8;jQuery --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;js/jquery.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-comment">// DOM&#x5BF9;&#x8C61;</span>
        <span class="hljs-keyword">var</span> username = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;username&quot;</span>);
        <span class="hljs-comment">// DOM&#x5BF9;&#x8C61;&#x8F6C;&#x6362;&#x6210; jQueruy&#x5BF9;&#x8C61;</span>
        username = $(username);
        <span class="hljs-comment">// &#x6253;&#x5370;jQueruy&#x5BF9;&#x8C61;</span>
        <span class="hljs-built_in">console</span>.log(username);
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFP8?w=646&amp;h=297" src="https://static.alili.tech/img/bVbeFP8?w=646&amp;h=297" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader10">3.2 jQuery&#x5BF9;&#x8C61;&#x8F6C;&#x6362;&#x4E3A;DOM&#x539F;&#x751F;&#x5BF9;&#x8C61;</h2><p>&#x6709;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;</p><ol><li>jQuery&#x63D0;&#x4F9B;get(index)&#x65B9;&#x6CD5;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     &lt;div&gt;hello world!&lt;/div&gt;
    &lt;!-- &#x5F15;&#x7528;&#x5916;&#x90E8;jQuery --&gt;
    &lt;script src=&quot;js/jquery.js&quot;&gt;&lt;/script&gt;
        &lt;script&gt;
        // jQuery&#x5BF9;&#x8C61;&#x8F6C;&#x6362;&#x6210;DOM&#x5BF9;&#x8C61;
        var myGet = $(&quot;div&quot;).get(0);
        // &#x6253;&#x5370;DOM&#x5BF9;&#x8C61;
        console.log(myGet);
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">     &lt;div&gt;hello world!<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;!-- &#x5F15;&#x7528;&#x5916;&#x90E8;jQuery --&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;js/jquery.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
        &lt;script&gt;
        <span class="hljs-comment">// jQuery&#x5BF9;&#x8C61;&#x8F6C;&#x6362;&#x6210;DOM&#x5BF9;&#x8C61;</span>
        <span class="hljs-keyword">var</span> myGet = $(<span class="hljs-string">&quot;div&quot;</span>).get(<span class="hljs-number">0</span>);
        <span class="hljs-comment">// &#x6253;&#x5370;DOM&#x5BF9;&#x8C61;</span>
        <span class="hljs-built_in">console</span>.log(myGet);
  <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFQa?w=565&amp;h=257" src="https://static.alili.tech/img/bVbeFQa?w=565&amp;h=257" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><ol><li>jQuery&#x5BF9;&#x8C61;&#x662F;&#x7C7B;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;($(selector)[index])</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;div&gt;hello world!&lt;/div&gt;
    &lt;!-- &#x5F15;&#x7528;&#x5916;&#x90E8;jQuery --&gt;
    &lt;script src=&quot;js/jquery.js&quot;&gt;&lt;/script&gt;
        &lt;script&gt;
        // jQuery&#x5BF9;&#x8C61;&#x8F6C;&#x6362;&#x6210;DOM&#x5BF9;&#x8C61;
        var myGet = $(&quot;div&quot;)[0];
        // &#x6253;&#x5370;DOM&#x5BF9;&#x8C61;
        console.log(myGet);
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;div&gt;hello world!<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;!-- &#x5F15;&#x7528;&#x5916;&#x90E8;jQuery --&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;js/jquery.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
        &lt;script&gt;
        <span class="hljs-comment">// jQuery&#x5BF9;&#x8C61;&#x8F6C;&#x6362;&#x6210;DOM&#x5BF9;&#x8C61;</span>
        <span class="hljs-keyword">var</span> myGet = $(<span class="hljs-string">&quot;div&quot;</span>)[<span class="hljs-number">0</span>];
        <span class="hljs-comment">// &#x6253;&#x5370;DOM&#x5BF9;&#x8C61;</span>
        <span class="hljs-built_in">console</span>.log(myGet);
  <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><h1 id="articleHeader11">&#x56DB;&#x3001;jQuery &#x9009;&#x62E9;&#x5668;</h1><h2 id="articleHeader12">4.1 CSS&#x57FA;&#x672C;&#x9009;&#x62E9;&#x5668;</h2><p><span class="img-wrap"><img data-src="/img/bVbeFQf?w=713&amp;h=354" src="https://static.alili.tech/img/bVbeFQf?w=713&amp;h=354" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x7528;&#x6CD5;&#x89C1;&#x4E0B;&#x9762;&#x7684;&#x5C0F;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        &lt;div id=&quot;demo1&quot;&gt;Hello&lt;/div&gt;
    &lt;div class=&quot;demo&quot;&gt;Hi&lt;/div&gt;
    &lt;h2&gt;Good&lt;/h2&gt;
    &lt;div class=&quot;demo2&quot;&gt;World!&lt;/div&gt;
    &lt;div id=&quot;demo3&quot;&gt;Haha&lt;/div&gt;
    &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
    &lt;script type=&quot;text/javascript&quot;&gt;
        // &#x901A;&#x7528;&#x9009;&#x62E9;&#x5668;
        $(&quot;*&quot;).css(&quot;background&quot;,&quot;pink&quot;);
        // ID&#x9009;&#x62E9;&#x5668;
        $(&quot;#demo1&quot;).css({
            &quot;fontSize&quot;: 24,
            &quot;color&quot;: &quot;skyblue&quot;
        });
        // class &#x9009;&#x62E9;&#x5668;
        $(&quot;.demo&quot;).css({
            &quot;fontWeight&quot;:&quot;bold&quot;,
            &quot;color&quot;:&quot;orange&quot;,
            &quot;fontSize&quot;:36
        });
        // &#x6807;&#x7B7E;&#x9009;&#x62E9;&#x5668;
        $(&quot;h2&quot;).css(&quot;color&quot;,&quot;red&quot;);
        // &#x5E76;&#x96C6;&#x9009;&#x62E9;&#x5668;
        $(&quot;.demo2,#demo3&quot;).css(&quot;fontSize&quot;,&quot;50px&quot;);
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">        &lt;div id=<span class="hljs-string">&quot;demo1&quot;</span>&gt;Hello&lt;<span class="hljs-regexp">/div&gt;
    &lt;div class=&quot;demo&quot;&gt;Hi&lt;/</span>div&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Good<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></span>
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;demo2&quot;</span>&gt;World!<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;div id=<span class="hljs-string">&quot;demo3&quot;</span>&gt;Haha&lt;<span class="hljs-regexp">/div&gt;
    &lt;script src=&apos;js/</span>jquery.js<span class="hljs-string">&apos;&gt;&lt;/script&gt;
    &lt;script type=&quot;text/javascript&quot;&gt;
        // &#x901A;&#x7528;&#x9009;&#x62E9;&#x5668;
        $(&quot;*&quot;).css(&quot;background&quot;,&quot;pink&quot;);
        // ID&#x9009;&#x62E9;&#x5668;
        $(&quot;#demo1&quot;).css({
            &quot;fontSize&quot;: 24,
            &quot;color&quot;: &quot;skyblue&quot;
        });
        // class &#x9009;&#x62E9;&#x5668;
        $(&quot;.demo&quot;).css({
            &quot;fontWeight&quot;:&quot;bold&quot;,
            &quot;color&quot;:&quot;orange&quot;,
            &quot;fontSize&quot;:36
        });
        // &#x6807;&#x7B7E;&#x9009;&#x62E9;&#x5668;
        $(&quot;h2&quot;).css(&quot;color&quot;,&quot;red&quot;);
        // &#x5E76;&#x96C6;&#x9009;&#x62E9;&#x5668;
        $(&quot;.demo2,#demo3&quot;).css(&quot;fontSize&quot;,&quot;50px&quot;);
    &lt;/script&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFQh?w=600&amp;h=296" src="https://static.alili.tech/img/bVbeFQh?w=600&amp;h=296" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader13">4.2 &#x5C42;&#x7EA7;&#x9009;&#x62E9;&#x5668;</h2><p><span class="img-wrap"><img data-src="/img/bVbeFQi?w=693&amp;h=429" src="https://static.alili.tech/img/bVbeFQi?w=693&amp;h=429" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        &lt;div class=&quot;box&quot;&gt;&lt;span&gt;hello world!&lt;/span&gt;&lt;/div&gt;
    &lt;ul style=&quot;list-style: none;&quot;&gt;
        &lt;li&gt;Hi&lt;/li&gt;
        &lt;li&gt;Ha&lt;/li&gt;
        &lt;li&gt;God&lt;/li&gt;
    &lt;/ul&gt;
    &lt;span&gt;&lt;p id=&quot;demo&quot;&gt;I&lt;/p&gt;&lt;p&gt;LOVE&lt;/p&gt;&lt;P&gt;YOU&lt;/P&gt;&lt;/span&gt;
    &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
    &lt;script type=&quot;text/javascript&quot;&gt;
    // &#x5B50;&#x5143;&#x7D20;&#x9009;&#x62E9;&#x5668;
        $(&quot;.box&gt;span&quot;).css({
            &quot;fontSize&quot;:30,
            &quot;color&quot;:&quot;red&quot;
        });
    // &#x540E;&#x4EE3;&#x9009;&#x62E9;&#x5668;
        $(&quot;ul li&quot;).css({
            &quot;color&quot;:&quot;skyblue&quot;,
            &quot;fontWeight&quot;:&quot;bold&quot;
        });
    // &#x7D27;&#x90BB;&#x540C;&#x8F88;&#x9009;&#x62E9;&#x5668;
    $(&quot;li+li&quot;).css(&quot;background&quot;,&quot;pink&quot;);
    // &#x76F8;&#x90BB;&#x540C;&#x8F88;&#x9009;&#x62E9;&#x5668;&#x3001;
    $(&quot;#demo~p&quot;).css(&quot;color&quot;,&quot;orange&quot;);
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">        &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;box&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>hello world!<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;ul style=<span class="hljs-string">&quot;list-style: none;&quot;</span>&gt;
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Hi<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
        &lt;li&gt;Ha&lt;<span class="hljs-regexp">/li&gt;
        &lt;li&gt;God&lt;/</span>li&gt;
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
    &lt;span&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;demo&quot;</span>&gt;</span>I<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>LOVE<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">P</span>&gt;</span>YOU<span class="hljs-tag">&lt;/<span class="hljs-name">P</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
    &lt;script src=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
    &lt;script type=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;
    <span class="hljs-comment">// &#x5B50;&#x5143;&#x7D20;&#x9009;&#x62E9;&#x5668;</span>
        $(<span class="hljs-string">&quot;.box&gt;span&quot;</span>).css({
            <span class="hljs-string">&quot;fontSize&quot;</span>:<span class="hljs-number">30</span>,
            <span class="hljs-string">&quot;color&quot;</span>:<span class="hljs-string">&quot;red&quot;</span>
        });
    <span class="hljs-comment">// &#x540E;&#x4EE3;&#x9009;&#x62E9;&#x5668;</span>
        $(<span class="hljs-string">&quot;ul li&quot;</span>).css({
            <span class="hljs-string">&quot;color&quot;</span>:<span class="hljs-string">&quot;skyblue&quot;</span>,
            <span class="hljs-string">&quot;fontWeight&quot;</span>:<span class="hljs-string">&quot;bold&quot;</span>
        });
    <span class="hljs-comment">// &#x7D27;&#x90BB;&#x540C;&#x8F88;&#x9009;&#x62E9;&#x5668;</span>
    $(<span class="hljs-string">&quot;li+li&quot;</span>).css(<span class="hljs-string">&quot;background&quot;</span>,<span class="hljs-string">&quot;pink&quot;</span>);
    <span class="hljs-comment">// &#x76F8;&#x90BB;&#x540C;&#x8F88;&#x9009;&#x62E9;&#x5668;&#x3001;</span>
    $(<span class="hljs-string">&quot;#demo~p&quot;</span>).css(<span class="hljs-string">&quot;color&quot;</span>,<span class="hljs-string">&quot;orange&quot;</span>);
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFQk?w=731&amp;h=288" src="https://static.alili.tech/img/bVbeFQk?w=731&amp;h=288" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader14">4.3 &#x8868;&#x5355;&#x57DF;&#x9009;&#x62E9;&#x5668;</h2><p>&#x8868;&#x5355;&#x57DF;&#x6307;&#x7F51;&#x9875;&#x4E2D;&#x7684;input textarea select button&#x5143;&#x7D20;&#x3002; jQuery&#x4E2D;&#x8868;&#x5355;&#x57DF;&#x9009;&#x62E9;&#x5668;&#x4E13;&#x95E8;&#x7528;&#x4E8E;&#x4ECE;&#x6587;&#x6863;&#x4E2D;&#x9009;&#x62E9;&#x8868;&#x5355;&#x57DF;</p><p><span class="img-wrap"><img data-src="/img/bVbeFQx?w=696&amp;h=455" src="https://static.alili.tech/img/bVbeFQx?w=696&amp;h=455" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x8FD9;&#x91CC;&#x5462;&#xFF0C;&#x5C0F;&#x7F16;&#x5C31;&#x6311;&#x51E0;&#x4E2A;&#x91CD;&#x8981;&#x7684;&#x9009;&#x62E9;&#x5668;&#x7ED9;&#x5927;&#x5BB6;&#x6F14;&#x793A;&#x4E00;&#x4E0B;&#x5C31;&#x884C;&#x4E86;&#xFF0C;&#x5176;&#x5B9E;&#xFF0C;&#x638C;&#x63E1;&#x524D;&#x4E24;&#x79CD;&#x7684;&#x9009;&#x62E9;&#x5668;&#x5C31;&#x591F;&#x7528;&#x4E86;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       &lt;input type=&quot;text&quot; name=&quot;&quot;&gt;
    &lt;button&gt;&#x70B9;&#x51FB;&lt;/button&gt;
    &lt;input type=&quot;password&quot; name=&quot;&quot;&gt;
    &lt;p hidden&gt;Hello World&#xFF01;&lt;/p&gt;
    &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
    &lt;script type=&quot;text/javascript&quot;&gt;
    // :input
        $(&quot;:input&quot;).css(&quot;background&quot;,&quot;skyblue&quot;);
    // :text
        $(&quot;:text&quot;).val(&quot;&#x4F60;&#x597D;&quot;);
    // :password
        $(&quot;:password&quot;).val(&quot;123&quot;);
    // :hide
        $(&quot;p:hidden&quot;).show();
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">       &lt;input type=<span class="hljs-string">&quot;text&quot;</span> name=<span class="hljs-string">&quot;&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>&#x70B9;&#x51FB;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
    &lt;input type=<span class="hljs-string">&quot;password&quot;</span> name=<span class="hljs-string">&quot;&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">hidden</span>&gt;</span>Hello World&#xFF01;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
    &lt;script src=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
    &lt;script type=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;
    <span class="hljs-comment">// :input</span>
        $(<span class="hljs-string">&quot;:input&quot;</span>).css(<span class="hljs-string">&quot;background&quot;</span>,<span class="hljs-string">&quot;skyblue&quot;</span>);
    <span class="hljs-comment">// :text</span>
        $(<span class="hljs-string">&quot;:text&quot;</span>).val(<span class="hljs-string">&quot;&#x4F60;&#x597D;&quot;</span>);
    <span class="hljs-comment">// :password</span>
        $(<span class="hljs-string">&quot;:password&quot;</span>).val(<span class="hljs-string">&quot;123&quot;</span>);
    <span class="hljs-comment">// :hide</span>
        $(<span class="hljs-string">&quot;p:hidden&quot;</span>).show();
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFQD?w=578&amp;h=129" src="https://static.alili.tech/img/bVbeFQD?w=578&amp;h=129" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader15">4.4 &#x8868;&#x5355;&#x57DF;&#x5C5E;&#x6027;&#x8FC7;&#x6EE4;&#x9009;&#x62E9;&#x5668;</h2><p><span class="img-wrap"><img data-src="/img/bVbeFQL?w=709&amp;h=217" src="https://static.alili.tech/img/bVbeFQL?w=709&amp;h=217" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>eg&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      &lt;button id=&quot;btn1&quot;&gt;&#x6211;&#x53EF;&#x4EE5;&#x7F16;&#x8F91;&lt;/button&gt;
   &lt;button id=&quot;btn2&quot;&gt;&#x6211;&#x4E0D;&#x80FD;&#x7F16;&#x8F91;&lt;/button&gt;&lt;br/&gt;&lt;br/&gt;
   &lt;input type=&quot;text&quot; name=&quot;on&quot; value=&quot;&#x5728;&#x6211;&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x7F16;&#x8F91;&quot;&gt;
   &lt;input type=&quot;text&quot; name=&quot;off&quot; value=&quot;&#x5728;&#x6211;&#x8FD9;&#x91CC;&#x4E0D;&#x80FD;&#x7F16;&#x8F91;&quot; disabled&gt;
   &lt;!-- &#x591A;&#x9009;&#x6846; --&gt;
   &lt;h2&gt;&#x6211;&#x7684;&#x7231;&#x597D;&#x662F;:&lt;/h2&gt;
   &lt;input type=&quot;checkbox&quot; name=&quot;&quot;  value=&quot;&quot;&gt;&#x6E38;&#x6CF3;
   &lt;input type=&quot;checkbox&quot; name=&quot;&quot;  value=&quot;&quot;&gt;&#x753B;&#x753B;
   &lt;input type=&quot;checkbox&quot; name=&quot;&quot;  value=&quot;&quot;&gt;&#x6572;&#x4EE3;&#x7801;
   &lt;div id=&quot;has-div&quot;&gt;&lt;/div&gt;
   &lt;br/&gt;&lt;br/&gt;
   &lt;!-- &#x4E0B;&#x62C9;&#x5217;&#x8868; --&gt;
   &lt;h2&gt;&#x559C;&#x6B22;&#x7684;&#x57CE;&#x5E02;&#xFF1A;&lt;/h2&gt;
    &lt;select&gt;
       &lt;option value=&quot;&quot; &gt;&#x4E0A;&#x6D77;&lt;/option&gt;
       &lt;option value=&quot;&quot; &gt;&#x5317;&#x4EAC;&lt;/option&gt;
       &lt;option value=&quot;&quot; selected=&quot;&quot;&gt;&#x82CF;&#x5DDE;&lt;/option&gt;
       &lt;option value=&quot;&quot;&gt;&#x6DF1;&#x5733;&lt;/option&gt;
       &lt;option value=&quot;&quot;&gt;&#x5E7F;&#x5DDE;&lt;/option&gt;
       &lt;option value=&quot;&quot;&gt;&#x676D;&#x5DDE;&lt;/option&gt;
    &lt;/select&gt;
    &lt;br/&gt;&lt;br/&gt;
    &lt;div id=&quot;has-div1&quot;&gt;&lt;/div&gt;
   &lt;!-- &#x5916;&#x90E8;&#x5F15;&#x7528;jQ --&gt;
    &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
    &lt;script type=&quot;text/javascript&quot;&gt;
    // &#x80FD;&#x591F;&#x6539;&#x53D8;&#x7684;input
    $(&quot;#btn1&quot;).click(function(){
        $(&quot;input[name=&apos;on&apos;]&quot;).val(&quot;&#x6211;&#x662F;&#x53EF;&#x4EE5;&#x6539;&#x53D8;&#x7684;&quot;);
        return fasle;
    });
    // &#x4E0D;&#x80FD;&#x6539;&#x53D8;&#x7684;input
      $(&quot;#btn2&quot;).click(function(){
        $(&quot;input[name=&apos;off&apos;]&quot;).val(&quot;&#x6211;&#x662F;&#x4E0D;&#x80FD;&#x6539;&#x53D8;&#x7684;&quot;);
        return fasle;
    });
    // &#x591A;&#x9009;&#x6846;
    $(&quot;:checkbox&quot;).click(function(){
        // &#x9009;&#x4E2D;&#x7684;&#x4E2A;&#x6570;
        var n = $(&quot;input:checked&quot;).length;
        $(&quot;#has-div&quot;).css({
            &quot;width&quot;:200,
            &quot;height&quot;:200,
            &quot;border&quot;:&quot;1px solid red&quot;,
            &quot;marginLeft&quot;:500

        }).html(&quot;&#x60A8;&#x9009;&#x4E2D;&quot;+n+&quot;&#x7231;&#x597D;&quot;);
    });
    // &#x4E0B;&#x62C9;&#x5217;&#x8868;
    $(&quot;select&quot;).click(function(){
        var str = $(&quot;select&gt;option:selected&quot;).text();
        $(&quot;#has-div1&quot;).css({
            &quot;width&quot;:100,
            &quot;height&quot;:100,
            &quot;border&quot;:&quot;1px solid red&quot;,
            &quot;marginLeft&quot;:100
        }).html(&quot;&lt;strong&gt;&#x559C;&#x6B22;&#x7684;&#x57CE;&#x5E02;&#xFF1A;&quot;+str+&quot;&lt;/strong&gt;&quot;);
        return false;
    });
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">      &lt;button id=<span class="hljs-string">&quot;btn1&quot;</span>&gt;&#x6211;&#x53EF;&#x4EE5;&#x7F16;&#x8F91;&lt;<span class="hljs-regexp">/button&gt;
   &lt;button id=&quot;btn2&quot;&gt;&#x6211;&#x4E0D;&#x80FD;&#x7F16;&#x8F91;&lt;/</span>button&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span></span>
   &lt;input type=<span class="hljs-string">&quot;text&quot;</span> name=<span class="hljs-string">&quot;on&quot;</span> value=<span class="hljs-string">&quot;&#x5728;&#x6211;&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x7F16;&#x8F91;&quot;</span>&gt;
   &lt;input type=&quot;text&quot; name=&quot;off&quot; value=&quot;&#x5728;&#x6211;&#x8FD9;&#x91CC;&#x4E0D;&#x80FD;&#x7F16;&#x8F91;&quot; disabled&gt;
   &lt;!-- &#x591A;&#x9009;&#x6846; --&gt;
   &lt;h2&gt;&#x6211;&#x7684;&#x7231;&#x597D;&#x662F;:&lt;/h2&gt;
   &lt;input type=&quot;checkbox&quot; name=&quot;&quot;  value=&quot;&quot;&gt;&#x6E38;&#x6CF3;
   &lt;input type=&quot;checkbox&quot; name=&quot;&quot;  value=&quot;&quot;&gt;&#x753B;&#x753B;
   &lt;input type=&quot;checkbox&quot; name=&quot;&quot;  value=&quot;&quot;&gt;&#x6572;&#x4EE3;&#x7801;
   &lt;div id=&quot;has-div&quot;&gt;&lt;/div&gt;
   &lt;br/&gt;&lt;br/&gt;
   &lt;!-- &#x4E0B;&#x62C9;&#x5217;&#x8868; --&gt;
   &lt;h2&gt;&#x559C;&#x6B22;&#x7684;&#x57CE;&#x5E02;&#xFF1A;&lt;/h2&gt;
    &lt;select&gt;
       &lt;option value=&quot;&quot; &gt;&#x4E0A;&#x6D77;&lt;/option&gt;
       &lt;option value=&quot;&quot; &gt;&#x5317;&#x4EAC;&lt;/option&gt;
       &lt;option value=&quot;&quot; selected=&quot;&quot;&gt;&#x82CF;&#x5DDE;&lt;/option&gt;
       &lt;option value=&quot;&quot;&gt;&#x6DF1;&#x5733;&lt;/option&gt;
       &lt;option value=&quot;&quot;&gt;&#x5E7F;&#x5DDE;&lt;/option&gt;
       &lt;option value=&quot;&quot;&gt;&#x676D;&#x5DDE;&lt;/option&gt;
    &lt;/select&gt;
    &lt;br/&gt;&lt;br/&gt;
    &lt;div id=&quot;has-div1&quot;&gt;&lt;/div&gt;
   &lt;!-- &#x5916;&#x90E8;&#x5F15;&#x7528;jQ --&gt;
    &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
    &lt;script type=&quot;text/javascript&quot;&gt;
    // &#x80FD;&#x591F;&#x6539;&#x53D8;&#x7684;input
    $(&quot;#btn1&quot;).click(function(){
        $(&quot;input[name=&apos;on&apos;]&quot;).val(&quot;&#x6211;&#x662F;&#x53EF;&#x4EE5;&#x6539;&#x53D8;&#x7684;&quot;);
        return fasle;
    });
    // &#x4E0D;&#x80FD;&#x6539;&#x53D8;&#x7684;input
      $(&quot;#btn2&quot;).click(function(){
        $(&quot;input[name=&apos;off&apos;]&quot;).val(&quot;&#x6211;&#x662F;&#x4E0D;&#x80FD;&#x6539;&#x53D8;&#x7684;&quot;);
        return fasle;
    });
    // &#x591A;&#x9009;&#x6846;
    $(&quot;:checkbox&quot;).click(function(){
        // &#x9009;&#x4E2D;&#x7684;&#x4E2A;&#x6570;
        var n = $(&quot;input:checked&quot;).length;
        $(&quot;#has-div&quot;).css({
            &quot;width&quot;:200,
            &quot;height&quot;:200,
            &quot;border&quot;:&quot;1px solid red&quot;,
            &quot;marginLeft&quot;:500

        }).html(&quot;&#x60A8;&#x9009;&#x4E2D;&quot;+n+&quot;&#x7231;&#x597D;&quot;);
    });
    // &#x4E0B;&#x62C9;&#x5217;&#x8868;
    $(&quot;select&quot;).click(function(){
        var str = $(&quot;select&gt;option:selected&quot;).text();
        $(&quot;#has-div1&quot;).css({
            &quot;width&quot;:100,
            &quot;height&quot;:100,
            &quot;border&quot;:&quot;1px solid red&quot;,
            &quot;marginLeft&quot;:100
        }).html(&quot;&lt;strong&gt;&#x559C;&#x6B22;&#x7684;&#x57CE;&#x5E02;&#xFF1A;&quot;+str+&quot;&lt;/strong&gt;&quot;);
        return false;
    });
    &lt;/script&gt;</code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFQS?w=726&amp;h=564" src="https://static.alili.tech/img/bVbeFQS?w=726&amp;h=564" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader16">4.5 &#x4F2A;&#x7C7B;&#x8FC7;&#x6EE4;&#x9009;&#x62E9;&#x5668;</h2><p>&#x6839;&#x636E;&#x7D22;&#x5F15;&#x503C;&#x5BF9;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x7B5B;&#x9009;&#xFF0C;&#x7C7B;&#x4F3C;&#x4E8E;CSS&#x7684;&#x4F2A;&#x7C7B;&#x9009;&#x62E9;&#x5668;&#xFF0C;&#x4EE5;&#x5192;&#x53F7;(:)&#x5F00;&#x5934;&#xFF1B;&#x5E76;&#x4E14;&#x548C;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x9009;&#x62E9;&#x5668;&#x4E00;&#x8D77;&#x4F7F;&#x7528;&#xFF08;header animated&#x9664;&#x5916;&#xFF09;</p><p><span class="img-wrap"><img data-src="/img/bVbeFQX?w=583&amp;h=487" src="https://static.alili.tech/img/bVbeFQX?w=583&amp;h=487" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        &lt;p&gt;hello&lt;/p&gt;
    &lt;p&gt;hi&lt;/p&gt;
    &lt;p&gt;good&lt;/p&gt;
    &lt;ul style=&quot;list-style: none;&quot;&gt;
        &lt;li&gt;11111&lt;/li&gt;
        &lt;li&gt;22222&lt;/li&gt;
        &lt;li&gt;33333&lt;/li&gt;
        &lt;li&gt;44444&lt;/li&gt;
    &lt;/ul&gt;
    &lt;h2&gt;&#x4F60;&#x597D;&lt;/h2&gt;
    &lt;h3&gt;&#x6211;&#x597D;&lt;/h3&gt;
    &lt;h4&gt;&#x5927;&#x5BB6;&#x597D;&lt;/h4&gt;
    &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
    &lt;script type=&quot;text/javascript&quot;&gt;
    // p:first &#x7B2C;&#x4E00;&#x4E2A;p&#x5143;&#x7D20;
    $(&quot;p:first&quot;).css(&quot;color&quot;,&quot;pink&quot;);
    // p:last  &#x6700;&#x540E;&#x4E00;&#x4E2A;p &#x5143;&#x7D20;
    $(&quot;p:last&quot;).css(&quot;color&quot;,&quot;blue&quot;);
    // &#x6240;&#x6709;&#x5076;&#x6570;&#x5143;&#x7D20; &#x7D22;&#x5F15;&#x503C;&#x4ECE;&#x96F6;&#x5F00;&#x59CB;
    $(&quot;ul&gt;li:even&quot;).css(&quot;color&quot;,&quot;yellow&quot;);
    // &#x6240;&#x6709;&#x7684;&#x5947;&#x6570;&#x5143;&#x7D20; &#x7D22;&#x5F15;&#x503C;&#x4ECE;&#x96F6;&#x5F00;&#x59CB;
     $(&quot;ul&gt;li:odd&quot;).css(&quot;color&quot;,&quot;red&quot;);
     // :header &#x9009;&#x62E9;&#x5668; &#x9009;&#x53D6;&#x6240;&#x6709;&#x7684;&#x6807;&#x9898;&#x5143;&#x7D20;
     $(&quot;:header&quot;).css(&quot;color&quot;,&quot;red&quot;);
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">        &lt;p&gt;hello&lt;<span class="hljs-regexp">/p&gt;
    &lt;p&gt;hi&lt;/</span>p&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>good<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
    &lt;ul style=<span class="hljs-string">&quot;list-style: none;&quot;</span>&gt;
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>11111<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
        &lt;li&gt;<span class="hljs-number">22222</span>&lt;<span class="hljs-regexp">/li&gt;
        &lt;li&gt;33333&lt;/</span>li&gt;
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>44444<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;<span class="hljs-regexp">/ul&gt;
    &lt;h2&gt;&#x4F60;&#x597D;&lt;/</span>h2&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>&#x6211;&#x597D;<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span></span>
    &lt;h4&gt;&#x5927;&#x5BB6;&#x597D;&lt;<span class="hljs-regexp">/h4&gt;
    &lt;script src=&apos;js/</span>jquery.js<span class="hljs-string">&apos;&gt;&lt;/script&gt;
    &lt;script type=&quot;text/javascript&quot;&gt;
    // p:first &#x7B2C;&#x4E00;&#x4E2A;p&#x5143;&#x7D20;
    $(&quot;p:first&quot;).css(&quot;color&quot;,&quot;pink&quot;);
    // p:last  &#x6700;&#x540E;&#x4E00;&#x4E2A;p &#x5143;&#x7D20;
    $(&quot;p:last&quot;).css(&quot;color&quot;,&quot;blue&quot;);
    // &#x6240;&#x6709;&#x5076;&#x6570;&#x5143;&#x7D20; &#x7D22;&#x5F15;&#x503C;&#x4ECE;&#x96F6;&#x5F00;&#x59CB;
    $(&quot;ul&gt;li:even&quot;).css(&quot;color&quot;,&quot;yellow&quot;);
    // &#x6240;&#x6709;&#x7684;&#x5947;&#x6570;&#x5143;&#x7D20; &#x7D22;&#x5F15;&#x503C;&#x4ECE;&#x96F6;&#x5F00;&#x59CB;
     $(&quot;ul&gt;li:odd&quot;).css(&quot;color&quot;,&quot;red&quot;);
     // :header &#x9009;&#x62E9;&#x5668; &#x9009;&#x53D6;&#x6240;&#x6709;&#x7684;&#x6807;&#x9898;&#x5143;&#x7D20;
     $(&quot;:header&quot;).css(&quot;color&quot;,&quot;red&quot;);
    &lt;/script&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFQ1?w=195&amp;h=362" src="https://static.alili.tech/img/bVbeFQ1?w=195&amp;h=362" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader17">4.6 &#x5185;&#x5BB9;&#x8FC7;&#x6EE4;&#x9009;&#x62E9;&#x5668;</h2><p>html&#x6587;&#x6863;&#x4E2D;&#xFF0C;&#x5143;&#x7D20;&#x7684;&#x5185;&#x5BB9;&#x53EF;&#x4EE5;&#x662F;&#x6587;&#x672C;&#x6216;&#x5B50;&#x5143;&#x7D20;</p><p><span class="img-wrap"><img data-src="/img/bVbeFRa?w=573&amp;h=338" src="https://static.alili.tech/img/bVbeFRa?w=573&amp;h=338" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        &lt;div&gt;he&lt;/div&gt;
    &lt;p &gt;hello&lt;/p&gt;
    &lt;span&gt;hehe&lt;/span&gt;
    &lt;p&gt; &lt;span&gt;&lt;/span&gt;&lt;/p&gt;
    &lt;p&gt;&lt;span&gt;123&#x6211;&#x7231;&#x4F60;&lt;/span&gt;&lt;/p&gt;
    &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
    &lt;script type=&quot;text/javascript&quot;&gt;
    // :contains(string);
    $(&quot;:contains(&apos;he&apos;)&quot;).css(&quot;color&quot;,&quot;red&quot;);
    // :empty  &#x4E3A;&#x7A7A;&#x5143;&#x7D20;&#x6DFB;&#x52A0;&#x81EA;&#x5DF1;&#x60F3;&#x8981;&#x7684;&#x6837;&#x5F0F;&#x548C;&#x5185;&#x5BB9;
    $(&quot;:empty&quot;).text(&quot;nihao&quot;);
    // select1:has(select2);
    $(&quot;p:has(span)&quot;).css(&quot;background&quot;,&quot;black&quot;);
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">        &lt;div&gt;he&lt;<span class="hljs-regexp">/div&gt;
    &lt;p &gt;hello&lt;/</span>p&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>hehe<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
    &lt;p&gt; <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
    &lt;p&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>123&#x6211;&#x7231;&#x4F60;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
    &lt;script src=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
    &lt;script type=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;
    <span class="hljs-comment">// :contains(string);</span>
    $(<span class="hljs-string">&quot;:contains(&apos;he&apos;)&quot;</span>).css(<span class="hljs-string">&quot;color&quot;</span>,<span class="hljs-string">&quot;red&quot;</span>);
    <span class="hljs-comment">// :empty  &#x4E3A;&#x7A7A;&#x5143;&#x7D20;&#x6DFB;&#x52A0;&#x81EA;&#x5DF1;&#x60F3;&#x8981;&#x7684;&#x6837;&#x5F0F;&#x548C;&#x5185;&#x5BB9;</span>
    $(<span class="hljs-string">&quot;:empty&quot;</span>).text(<span class="hljs-string">&quot;nihao&quot;</span>);
    <span class="hljs-comment">// select1:has(select2);</span>
    $(<span class="hljs-string">&quot;p:has(span)&quot;</span>).css(<span class="hljs-string">&quot;background&quot;</span>,<span class="hljs-string">&quot;black&quot;</span>);
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFRc?w=536&amp;h=219" src="https://static.alili.tech/img/bVbeFRc?w=536&amp;h=219" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader18">4.7 &#x7B80;&#x5355;&#x5C5E;&#x6027;&#x8FC7;&#x6EE4;&#x9009;&#x62E9;&#x5668;</h2><p><span class="img-wrap"><img data-src="/img/bVbeFRe?w=583&amp;h=431" src="https://static.alili.tech/img/bVbeFRe?w=583&amp;h=431" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        &lt;div id=&quot;box&quot;&gt;hello &lt;/div&gt;
    &lt;div id=&quot;box&quot;&gt;world &lt;/div&gt;
    &lt;p id=&quot;deom&quot;&gt;&#x5C0F;&#x5468;&#x672B;&lt;/p&gt;
    &lt;p id=&quot;deom&quot;&gt;123&#x6211;&#x7231;&#x4F60;&lt;/p&gt;
    &lt;input type=&quot;text&quot; name=&quot;new&quot; value=&quot;&#x8BB2;&#x771F;&#x7684;&quot;&gt;
    &lt;input type=&quot;button&quot; name=&quot;new&quot; value=&quot;&#x70B9;&#x51FB;&quot;&gt;
    &lt;div class=&quot;old&quot;&gt;&#x8001;&#x7537;&#x5B69;&lt;/div&gt;
    &lt;div class=&quot;old&quot;&gt;&#x660E;&#x4EBA;&#x4E0D;&#x8BF4;&#x6697;&#x8BDD;&lt;/div&gt;
    &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
    &lt;script type=&quot;text/javascript&quot;&gt;
        // &#x67E5;&#x627E;&#x6240;&#x6709;&#x542B;&#x6709;&#x5C5E;&#x6027;id&#x7684;div&#x5143;&#x7D20; div[id]
        $(&quot;div[id]&quot;).css(&apos;color&apos;,&apos;red&apos;);
        // &#x67E5;&#x627E;&#x6240;&#x6709;&#x542B;&#x6709;&#x5C5E;&#x6027;id&#x7684;p&#x5143;&#x7D20; p[id=&quot;demo&quot;]
        $(&quot;p[id=&apos;deom&apos;]&quot;).css({
            &quot;fontSize&quot;:30,
            &quot;fontWeight&quot;:&quot;bold&quot;,
            &quot;color&quot;:&quot;orange&quot;
        });
        // &#x67E5;&#x627E;&#x6240;&#x6709;&#x542B;&#x6709;&#x5C5E;&#x6027; name=&apos;name&apos; &#x7684;&#x5143;&#x7D20;
        $(&quot;input*[name=&apos;new&apos;]&quot;).css(&quot;background&quot;,&apos;red&apos;);
        // &#x67E5;&#x627E;&#x6240;&#x6709;&#x542B;&#x6709;&#x5C5E;&#x6027;&#x503C;&#x4E3A;old(&#x5355;&#x8BCD;)&#x7684;&#x5143;&#x7D20;
        $(&quot;div~[class=&apos;old&apos;]&quot;).css(&quot;color&quot;,&quot;blue&quot;);
        // &#x67E5;&#x627E;&#x6240;&#x6709;&#x542B;&#x6709; &#x5355;&#x8BCD; b &#x5F00;&#x59CB;&#x7684;&#x5143;&#x7D20;
        $(&quot;div[id^=&apos;b&apos;]&quot;).css(&quot;background&quot;,&quot;skyblue&quot;);
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">        &lt;div id=<span class="hljs-string">&quot;box&quot;</span>&gt;hello &lt;<span class="hljs-regexp">/div&gt;
    &lt;div id=&quot;box&quot;&gt;world &lt;/</span>div&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;deom&quot;</span>&gt;</span>&#x5C0F;&#x5468;&#x672B;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
    &lt;p id=<span class="hljs-string">&quot;deom&quot;</span>&gt;<span class="hljs-number">123</span>&#x6211;&#x7231;&#x4F60;&lt;<span class="hljs-regexp">/p&gt;
    &lt;input type=&quot;text&quot; name=&quot;new&quot; value=&quot;&#x8BB2;&#x771F;&#x7684;&quot;&gt;
    &lt;input type=&quot;button&quot; name=&quot;new&quot; value=&quot;&#x70B9;&#x51FB;&quot;&gt;
    &lt;div class=&quot;old&quot;&gt;&#x8001;&#x7537;&#x5B69;&lt;/</span>div&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;old&quot;</span>&gt;</span>&#x660E;&#x4EBA;&#x4E0D;&#x8BF4;&#x6697;&#x8BDD;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;script src=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
    &lt;script type=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;
        <span class="hljs-comment">// &#x67E5;&#x627E;&#x6240;&#x6709;&#x542B;&#x6709;&#x5C5E;&#x6027;id&#x7684;div&#x5143;&#x7D20; div[id]</span>
        $(<span class="hljs-string">&quot;div[id]&quot;</span>).css(<span class="hljs-string">&apos;color&apos;</span>,<span class="hljs-string">&apos;red&apos;</span>);
        <span class="hljs-comment">// &#x67E5;&#x627E;&#x6240;&#x6709;&#x542B;&#x6709;&#x5C5E;&#x6027;id&#x7684;p&#x5143;&#x7D20; p[id=&quot;demo&quot;]</span>
        $(<span class="hljs-string">&quot;p[id=&apos;deom&apos;]&quot;</span>).css({
            <span class="hljs-string">&quot;fontSize&quot;</span>:<span class="hljs-number">30</span>,
            <span class="hljs-string">&quot;fontWeight&quot;</span>:<span class="hljs-string">&quot;bold&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>:<span class="hljs-string">&quot;orange&quot;</span>
        });
        <span class="hljs-comment">// &#x67E5;&#x627E;&#x6240;&#x6709;&#x542B;&#x6709;&#x5C5E;&#x6027; name=&apos;name&apos; &#x7684;&#x5143;&#x7D20;</span>
        $(<span class="hljs-string">&quot;input*[name=&apos;new&apos;]&quot;</span>).css(<span class="hljs-string">&quot;background&quot;</span>,<span class="hljs-string">&apos;red&apos;</span>);
        <span class="hljs-comment">// &#x67E5;&#x627E;&#x6240;&#x6709;&#x542B;&#x6709;&#x5C5E;&#x6027;&#x503C;&#x4E3A;old(&#x5355;&#x8BCD;)&#x7684;&#x5143;&#x7D20;</span>
        $(<span class="hljs-string">&quot;div~[class=&apos;old&apos;]&quot;</span>).css(<span class="hljs-string">&quot;color&quot;</span>,<span class="hljs-string">&quot;blue&quot;</span>);
        <span class="hljs-comment">// &#x67E5;&#x627E;&#x6240;&#x6709;&#x542B;&#x6709; &#x5355;&#x8BCD; b &#x5F00;&#x59CB;&#x7684;&#x5143;&#x7D20;</span>
        $(<span class="hljs-string">&quot;div[id^=&apos;b&apos;]&quot;</span>).css(<span class="hljs-string">&quot;background&quot;</span>,<span class="hljs-string">&quot;skyblue&quot;</span>);
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFRf?w=592&amp;h=307" src="https://static.alili.tech/img/bVbeFRf?w=592&amp;h=307" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader19">4.8 &#x5B50;&#x5143;&#x7D20;&#x8FC7;&#x6EE4;&#x9009;&#x62E9;&#x5668;</h2><p>&#x6CE8;&#x610F;&#xFF1A;&#x5B50;&#x5143;&#x7D20;&#x8FC7;&#x6EE4;&#x9009;&#x62E9;&#x5668;&#x5FC5;&#x987B;&#x67D0;&#x4E2A;&#x9009;&#x62E9;&#x5668;&#x4E00;&#x8D77;&#x4F7F;&#x7528;<br><span class="img-wrap"><img data-src="/img/bVbeFRo?w=578&amp;h=465" src="https://static.alili.tech/img/bVbeFRo?w=578&amp;h=465" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        &lt;ul style=&quot;list-style: none;&quot;&gt;
        &lt;li&gt;&#x609F;&#x7A7A;&lt;/li&gt;
        &lt;li&gt;Alone&lt;/li&gt;
        &lt;li&gt;&#x6EE1;&#x6EE1;&lt;/li&gt;
        &lt;li&gt;&#x9ED1;&#x767D;&#x60C5;&#x4E66;&lt;/li&gt;
    &lt;/ul&gt;
    &lt;div id=&quot;box&quot;&gt;&lt;span&gt;&#x7EB8;&#x77ED;&#x60C5;&#x957F;&lt;/span&gt;&lt;/div&gt;
    &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
    &lt;script&gt;
        // :first-child &#x9009;&#x62E9;&#x5668;&#x9009;&#x53D6;&#x5C5E;&#x4E8E;&#x5176;&#x7236;&#x5143;&#x7D20;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5B50;&#x5143;&#x7D20;&#x3002;
        $(&quot;li:first-child&quot;).css(&quot;color&quot;,&quot;orange&quot;);
        // :last-child &#x9009;&#x62E9;&#x5668;&#x9009;&#x53D6;&#x5C5E;&#x4E8E;&#x5176;&#x7236;&#x5143;&#x7D20;&#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5B50;&#x5143;&#x7D20;&#x3002;
        $(&quot;li:last-child&quot;).css(&quot;color&quot;,&quot;red&quot;);
        // :nth-child(inde/even/odd) &#x9009;&#x53D6;&#x7B2C;&#x51E0;&#x4E2A;&#x5B50;&#x5143;&#x7D20; &#x4ECE;1 &#x5F00;&#x59CB;
        $(&quot;li:nth-child(2)&quot;).css(&quot;background&quot;,&quot;skyblue&quot;);
        // only-child &#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x5B69;&#x5B50;&#x7684;&#x7236;&#x5143;&#x7D20;
        $(&quot;span:only-child&quot;).css(&quot;fontSize&quot;,50);
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">        &lt;ul style=<span class="hljs-string">&quot;list-style: none;&quot;</span>&gt;
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x609F;&#x7A7A;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
        &lt;li&gt;Alone&lt;<span class="hljs-regexp">/li&gt;
        &lt;li&gt;&#x6EE1;&#x6EE1;&lt;/</span>li&gt;
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x9ED1;&#x767D;&#x60C5;&#x4E66;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;<span class="hljs-regexp">/ul&gt;
    &lt;div id=&quot;box&quot;&gt;&lt;span&gt;&#x7EB8;&#x77ED;&#x60C5;&#x957F;&lt;/</span>span&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;script src=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
    &lt;script&gt;
        <span class="hljs-comment">// :first-child &#x9009;&#x62E9;&#x5668;&#x9009;&#x53D6;&#x5C5E;&#x4E8E;&#x5176;&#x7236;&#x5143;&#x7D20;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5B50;&#x5143;&#x7D20;&#x3002;</span>
        $(<span class="hljs-string">&quot;li:first-child&quot;</span>).css(<span class="hljs-string">&quot;color&quot;</span>,<span class="hljs-string">&quot;orange&quot;</span>);
        <span class="hljs-comment">// :last-child &#x9009;&#x62E9;&#x5668;&#x9009;&#x53D6;&#x5C5E;&#x4E8E;&#x5176;&#x7236;&#x5143;&#x7D20;&#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5B50;&#x5143;&#x7D20;&#x3002;</span>
        $(<span class="hljs-string">&quot;li:last-child&quot;</span>).css(<span class="hljs-string">&quot;color&quot;</span>,<span class="hljs-string">&quot;red&quot;</span>);
        <span class="hljs-comment">// :nth-child(inde/even/odd) &#x9009;&#x53D6;&#x7B2C;&#x51E0;&#x4E2A;&#x5B50;&#x5143;&#x7D20; &#x4ECE;1 &#x5F00;&#x59CB;</span>
        $(<span class="hljs-string">&quot;li:nth-child(2)&quot;</span>).css(<span class="hljs-string">&quot;background&quot;</span>,<span class="hljs-string">&quot;skyblue&quot;</span>);
        <span class="hljs-comment">// only-child &#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x5B69;&#x5B50;&#x7684;&#x7236;&#x5143;&#x7D20;</span>
        $(<span class="hljs-string">&quot;span:only-child&quot;</span>).css(<span class="hljs-string">&quot;fontSize&quot;</span>,<span class="hljs-number">50</span>);
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFRq?w=390&amp;h=233" src="https://static.alili.tech/img/bVbeFRq?w=390&amp;h=233" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h1 id="articleHeader20">&#x4E94;&#x3001;&#x5C0F;&#x6848;&#x4F8B;</h1><h2 id="articleHeader21">5.1 &#x5B9E;&#x73B0;&#x591A;&#x6807;&#x7B7E;&#x9875;&#x6548;&#x679C;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    *{margin:0;padding:0;}
        ul li{float: left; list-style: none; width: 80px;height: 40px;line-height: 40px;cursor: pointer;text-align: center;}
        #container{position:relative;}
        #content1,#content2,#content3{position:absolute;top:40px;left: 0;width:300px;height:200px;padding:30px;}
        #tab1,#content1{background:pink;}
        #tab2,#content2{background:skyblue;}
        #tab3,#content3{background:orange;}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">    *{<span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;}
        <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span>{<span class="hljs-attribute">float</span>: left; <span class="hljs-attribute">list-style</span>: none; <span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;<span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;<span class="hljs-attribute">cursor</span>: pointer;<span class="hljs-attribute">text-align</span>: center;}
        <span class="hljs-selector-id">#container</span>{<span class="hljs-attribute">position</span>:relative;}
        <span class="hljs-selector-id">#content1</span>,<span class="hljs-selector-id">#content2</span>,<span class="hljs-selector-id">#content3</span>{<span class="hljs-attribute">position</span>:absolute;<span class="hljs-attribute">top</span>:<span class="hljs-number">40px</span>;<span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;<span class="hljs-attribute">width</span>:<span class="hljs-number">300px</span>;<span class="hljs-attribute">height</span>:<span class="hljs-number">200px</span>;<span class="hljs-attribute">padding</span>:<span class="hljs-number">30px</span>;}
        <span class="hljs-selector-id">#tab1</span>,<span class="hljs-selector-id">#content1</span>{<span class="hljs-attribute">background</span>:pink;}
        <span class="hljs-selector-id">#tab2</span>,<span class="hljs-selector-id">#content2</span>{<span class="hljs-attribute">background</span>:skyblue;}
        <span class="hljs-selector-id">#tab3</span>,<span class="hljs-selector-id">#content3</span>{<span class="hljs-attribute">background</span>:orange;}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;h2&gt;&#x5B9E;&#x73B0;&#x591A;&#x9875;&#x6807;&#x7B7E;&#x5207;&#x6362;&lt;/h2&gt;&lt;br/&gt;&lt;br/&gt;
   &lt;ul id=&quot;tab&quot;&gt;
       &lt;li id=&quot;tab1&quot; value=&quot;1&quot;&gt;&#x5173;&#x4E8E;&#x6211;&lt;/li&gt;
       &lt;li id=&quot;tab2&quot; value=&quot;2&quot;&gt;&#x4E2A;&#x4EBA;&#x7ECF;&#x5386;&lt;/li&gt;
       &lt;li id=&quot;tab3&quot; value=&quot;3&quot;&gt;&#x6559;&#x80B2;&#x80CC;&#x666F;&lt;/li&gt;
   &lt;/ul&gt;
   &lt;div id=&quot;container&quot;&gt;
       &lt;div id=&quot;content1&quot; style=&quot;z-index: 1;&quot;&gt; &#x5177;&#x6709;&#x8F83;&#x5F3A;&#x7684;&#x7528;&#x6237;&#x7814;&#x7A76;&#x3001;&#x5E02;&#x573A;&#x5206;&#x6790;&#x80FD;&#x529B;&#xFF0C;&#x5BF9;&#x4E2D;&#x56FD;&#x7528;&#x6237;&#x7684;&#x793E;&#x4F1A;&#x5F62;&#x6001;&#x3001;&#x751F;&#x6D3B;&#x65B9;&#x5F0F;&#x6709;&#x4E30;&#x5BCC;&#x7684;&#x8BA4;&#x8BC6;&#x548C;&#x72EC;&#x7279;&#x7684;&#x89C1;&#x89E3;;&#x5BF9;&#x8272;&#x5F69;&#x3001;&#x6750;&#x8D28;&#x611F;&#x89C9;&#x7EC6;&#x817B;&#x800C;&#x654F;&#x611F;&#xFF0C;&#x5177;&#x6709;&#x8272;&#x5F69;&#x3001;&#x6750;&#x8D28;&#x3001;&#x8868;&#x9762;&#x5904;&#x7406;&#x7684;&#x7814;&#x7A76;&#x548C;&#x8D8B;&#x52BF;&#x5206;&#x6790;&#x80FD;&#x529B;&#xFF0C;&#x5BF9;&#x5F53;&#x4EE3;&#x4E2D;&#x56FD;&#x7684;&#x8272;&#x5F69;&#x5177;&#x6709;&#x6DF1;&#x5165;&#x7684;&#x7406;&#x89E3;&#x548C;&#x81EA;&#x5DF1;&#x7684;&#x89C2;&#x70B9;;&#x80FD;&#x591F;&#x51C6;&#x786E;&#x628A;&#x63E1;&#x793E;&#x4F1A;&#x6587;&#x5316;&#x3001;&#x6D41;&#x884C;&#x8D8B;&#x52BF;&#xFF0C;&#x5BF9;&#x4E2D;&#x56FD;&#x73B0;&#x4EE3;&#x793E;&#x4F1A;&#x53CA;&#x4F20;&#x7EDF;&#x6587;&#x5316;&#x80CC;&#x666F;&#x6709;&#x4ED4;&#x7EC6;&#x7684;&#x7814;&#x7A76;&#x548C;&#x6DF1;&#x523B;&#x7684;&#x7406;&#x89E3;;&#x5BF9;&#x8BBE;&#x8BA1;&#x5DE5;&#x4F5C;&#x5145;&#x6EE1;&#x70ED;&#x60C5;&#xFF0C;&#x6709;&#x8F83;&#x5F3A;&#x7684;&#x8BBE;&#x8BA1;&#x80FD;&#x529B;&#xFF0C;&#x8BBE;&#x8BA1;&#x7684;&#x4EA7;&#x54C1;&#x8303;&#x56F4;&#x5E7F;&#x6CDB;&#x3002;&lt;/div&gt;
       &lt;div id=&quot;content2&quot;&gt;
           2017&#x5E74;5&#x6708;&#xFF0C;&#x5177;&#x6709;&#x8BBE;&#x8BA1;&#x7231;&#x597D;&#x7684;&#x4E09;&#x4EBA;&#x5728;&#x4E00;&#x6B21;&#x7535;&#x8BDD;&#x5171;&#x540C;&#x7EC4;&#x5EFA;&#x4E09;&#x4EBA;&#x5C0F;&#x7EC4;&#xFF0C;&#x7545;&#x8C08;&#x73B0;&#x5982;&#x4ECA;&#x8BBE;&#x8BA1;&#x884C;&#x4E1A;&#x53D1;&#x5C55;&#x8D8B;&#x52BF;&#xFF0C;6&#x6708;&#x7ED3;&#x4EA4;&#x5728;&#x4E00;&#x8D77;&#xFF0C;&#x5171;&#x540C;&#x534F;&#x5546;&#x5343;&#x5178;&#x54C1;&#x724C;&#x8BBE;&#x8BA1;&#x516C;&#x53F8;&#x53D1;&#x5C55;&#x6D41;&#x7A0B;&#xFF0C;7&#x6708;&#x6B63;&#x662F;&#x6CE8;&#x518C;&#x6CB3;&#x5357;&#x5343;&#x5178;&#x6587;&#x5316;&#x4F20;&#x64AD;&#x6709;&#x9650;&#x516C;&#x53F8;&#x6210;&#x7ACB;&#x3002;&#x521B;&#x5B9A;&#x6CD5;&#x5B9A;&#x4EE3;&#x8868;&#x4EBA;,&#x516C;&#x53F8;&#x7ECF;&#x8425;&#x8303;&#x56F4;&#x5305;&#x62EC;&#xFF1A;&#x8BBE;&#x8BA1;&#x3001;&#x5236;&#x4F5C;&#x3001;&#x4EE3;&#x7406;&#x3001;&#x53D1;&#x5E03;&#x56FD;&#x5185;&#x5E7F;&#x544A;&#xFF0C;&#x4F01;&#x4E1A;&#x7BA1;&#x7406;&#x54A8;&#x8BE2;&#xFF0C;&#x4F01;&#x4E1A;&#x8425;&#x9500;&#x7B56;&#x5212;&#xFF0C;&#x5C55;&#x89C8;&#x5C55;&#x793A;&#x7B56;&#x5212;&#xFF0C;&#x6587;&#x5316;&#x827A;&#x672F;&#x4EA4;&#x6D41;&#x6D3B;&#x52A8;&#x7B56;&#x5212;&#xFF0C;&#x5E73;&#x9762;&#x8BBE;&#x8BA1;&#xFF0C;&#x5305;&#x88C5;&#x8BBE;&#x8BA1;&#xFF0C;&#x4F01;&#x4E1A;&#x5F62;&#x8C61;&#x7B56;&#x5212;&#x7B49;&#x3002;
       &lt;/div&gt;
       &lt;div id=&quot;content3&quot;&gt;
           Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo
       &lt;/div&gt;
   &lt;/div&gt;
   &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
   &lt;script&gt;
       $(&quot;#tab&gt;li&quot;).click(function(event){
           // &#x5F53;&#x70B9;&#x51FB;&#x5230;&#x67D0;&#x4E2A;&#x5143;&#x7D20;&#x4E0A;&#x65F6;&#xFF0C;&#x6539;&#x53D8;&#x4ED6;&#x7684;&#x884C;&#x5185;&#x6837;&#x5F0F;&#xFF0C;&#x5E76;&#x8BA9;&#x4ED6;&#x7684;&#x5144;&#x5F1F;&#x5143;&#x7D20;&#x6CA1;&#x6709;&#x4ED6;&#x7684;&#x7EA7;&#x522B;&#x9AD8;
           $(&quot;#content&quot;+this.value).attr(&quot;style&quot;, &quot;z-index:1&quot;).siblings(&apos;div&apos;).css(&quot;z-index&quot;, 0);
       });
   &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;h2&gt;&#x5B9E;&#x73B0;&#x591A;&#x9875;&#x6807;&#x7B7E;&#x5207;&#x6362;&lt;<span class="hljs-regexp">/h2&gt;&lt;br/</span>&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span></span>
   &lt;ul id=<span class="hljs-string">&quot;tab&quot;</span>&gt;
       <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;tab1&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;1&quot;</span>&gt;</span>&#x5173;&#x4E8E;&#x6211;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
       &lt;li id=<span class="hljs-string">&quot;tab2&quot;</span> value=<span class="hljs-string">&quot;2&quot;</span>&gt;&#x4E2A;&#x4EBA;&#x7ECF;&#x5386;&lt;<span class="hljs-regexp">/li&gt;
       &lt;li id=&quot;tab3&quot; value=&quot;3&quot;&gt;&#x6559;&#x80B2;&#x80CC;&#x666F;&lt;/</span>li&gt;
   <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
   &lt;div id=<span class="hljs-string">&quot;container&quot;</span>&gt;
       <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;content1&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;z-index: 1;&quot;</span>&gt;</span> &#x5177;&#x6709;&#x8F83;&#x5F3A;&#x7684;&#x7528;&#x6237;&#x7814;&#x7A76;&#x3001;&#x5E02;&#x573A;&#x5206;&#x6790;&#x80FD;&#x529B;&#xFF0C;&#x5BF9;&#x4E2D;&#x56FD;&#x7528;&#x6237;&#x7684;&#x793E;&#x4F1A;&#x5F62;&#x6001;&#x3001;&#x751F;&#x6D3B;&#x65B9;&#x5F0F;&#x6709;&#x4E30;&#x5BCC;&#x7684;&#x8BA4;&#x8BC6;&#x548C;&#x72EC;&#x7279;&#x7684;&#x89C1;&#x89E3;;&#x5BF9;&#x8272;&#x5F69;&#x3001;&#x6750;&#x8D28;&#x611F;&#x89C9;&#x7EC6;&#x817B;&#x800C;&#x654F;&#x611F;&#xFF0C;&#x5177;&#x6709;&#x8272;&#x5F69;&#x3001;&#x6750;&#x8D28;&#x3001;&#x8868;&#x9762;&#x5904;&#x7406;&#x7684;&#x7814;&#x7A76;&#x548C;&#x8D8B;&#x52BF;&#x5206;&#x6790;&#x80FD;&#x529B;&#xFF0C;&#x5BF9;&#x5F53;&#x4EE3;&#x4E2D;&#x56FD;&#x7684;&#x8272;&#x5F69;&#x5177;&#x6709;&#x6DF1;&#x5165;&#x7684;&#x7406;&#x89E3;&#x548C;&#x81EA;&#x5DF1;&#x7684;&#x89C2;&#x70B9;;&#x80FD;&#x591F;&#x51C6;&#x786E;&#x628A;&#x63E1;&#x793E;&#x4F1A;&#x6587;&#x5316;&#x3001;&#x6D41;&#x884C;&#x8D8B;&#x52BF;&#xFF0C;&#x5BF9;&#x4E2D;&#x56FD;&#x73B0;&#x4EE3;&#x793E;&#x4F1A;&#x53CA;&#x4F20;&#x7EDF;&#x6587;&#x5316;&#x80CC;&#x666F;&#x6709;&#x4ED4;&#x7EC6;&#x7684;&#x7814;&#x7A76;&#x548C;&#x6DF1;&#x523B;&#x7684;&#x7406;&#x89E3;;&#x5BF9;&#x8BBE;&#x8BA1;&#x5DE5;&#x4F5C;&#x5145;&#x6EE1;&#x70ED;&#x60C5;&#xFF0C;&#x6709;&#x8F83;&#x5F3A;&#x7684;&#x8BBE;&#x8BA1;&#x80FD;&#x529B;&#xFF0C;&#x8BBE;&#x8BA1;&#x7684;&#x4EA7;&#x54C1;&#x8303;&#x56F4;&#x5E7F;&#x6CDB;&#x3002;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
       &lt;div id=<span class="hljs-string">&quot;content2&quot;</span>&gt;
           <span class="hljs-number">2017</span>&#x5E74;<span class="hljs-number">5</span>&#x6708;&#xFF0C;&#x5177;&#x6709;&#x8BBE;&#x8BA1;&#x7231;&#x597D;&#x7684;&#x4E09;&#x4EBA;&#x5728;&#x4E00;&#x6B21;&#x7535;&#x8BDD;&#x5171;&#x540C;&#x7EC4;&#x5EFA;&#x4E09;&#x4EBA;&#x5C0F;&#x7EC4;&#xFF0C;&#x7545;&#x8C08;&#x73B0;&#x5982;&#x4ECA;&#x8BBE;&#x8BA1;&#x884C;&#x4E1A;&#x53D1;&#x5C55;&#x8D8B;&#x52BF;&#xFF0C;<span class="hljs-number">6</span>&#x6708;&#x7ED3;&#x4EA4;&#x5728;&#x4E00;&#x8D77;&#xFF0C;&#x5171;&#x540C;&#x534F;&#x5546;&#x5343;&#x5178;&#x54C1;&#x724C;&#x8BBE;&#x8BA1;&#x516C;&#x53F8;&#x53D1;&#x5C55;&#x6D41;&#x7A0B;&#xFF0C;<span class="hljs-number">7</span>&#x6708;&#x6B63;&#x662F;&#x6CE8;&#x518C;&#x6CB3;&#x5357;&#x5343;&#x5178;&#x6587;&#x5316;&#x4F20;&#x64AD;&#x6709;&#x9650;&#x516C;&#x53F8;&#x6210;&#x7ACB;&#x3002;&#x521B;&#x5B9A;&#x6CD5;&#x5B9A;&#x4EE3;&#x8868;&#x4EBA;,&#x516C;&#x53F8;&#x7ECF;&#x8425;&#x8303;&#x56F4;&#x5305;&#x62EC;&#xFF1A;&#x8BBE;&#x8BA1;&#x3001;&#x5236;&#x4F5C;&#x3001;&#x4EE3;&#x7406;&#x3001;&#x53D1;&#x5E03;&#x56FD;&#x5185;&#x5E7F;&#x544A;&#xFF0C;&#x4F01;&#x4E1A;&#x7BA1;&#x7406;&#x54A8;&#x8BE2;&#xFF0C;&#x4F01;&#x4E1A;&#x8425;&#x9500;&#x7B56;&#x5212;&#xFF0C;&#x5C55;&#x89C8;&#x5C55;&#x793A;&#x7B56;&#x5212;&#xFF0C;&#x6587;&#x5316;&#x827A;&#x672F;&#x4EA4;&#x6D41;&#x6D3B;&#x52A8;&#x7B56;&#x5212;&#xFF0C;&#x5E73;&#x9762;&#x8BBE;&#x8BA1;&#xFF0C;&#x5305;&#x88C5;&#x8BBE;&#x8BA1;&#xFF0C;&#x4F01;&#x4E1A;&#x5F62;&#x8C61;&#x7B56;&#x5212;&#x7B49;&#x3002;
       &lt;<span class="hljs-regexp">/div&gt;
       &lt;div id=&quot;content3&quot;&gt;
           Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo
       &lt;/</span>div&gt;
   <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
   &lt;script src=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
   &lt;script&gt;
       $(<span class="hljs-string">&quot;#tab&gt;li&quot;</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
           <span class="hljs-comment">// &#x5F53;&#x70B9;&#x51FB;&#x5230;&#x67D0;&#x4E2A;&#x5143;&#x7D20;&#x4E0A;&#x65F6;&#xFF0C;&#x6539;&#x53D8;&#x4ED6;&#x7684;&#x884C;&#x5185;&#x6837;&#x5F0F;&#xFF0C;&#x5E76;&#x8BA9;&#x4ED6;&#x7684;&#x5144;&#x5F1F;&#x5143;&#x7D20;&#x6CA1;&#x6709;&#x4ED6;&#x7684;&#x7EA7;&#x522B;&#x9AD8;</span>
           $(<span class="hljs-string">&quot;#content&quot;</span>+<span class="hljs-keyword">this</span>.value).attr(<span class="hljs-string">&quot;style&quot;</span>, <span class="hljs-string">&quot;z-index:1&quot;</span>).siblings(<span class="hljs-string">&apos;div&apos;</span>).css(<span class="hljs-string">&quot;z-index&quot;</span>, <span class="hljs-number">0</span>);
       });
   <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFRD?w=726&amp;h=472" src="https://static.alili.tech/img/bVbeFRD?w=726&amp;h=472" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h1 id="articleHeader22">&#x516D;&#x3001;dom&#x7684;&#x64CD;&#x4F5C;&#x3001;&#x4E8B;&#x4EF6;</h1><h2 id="articleHeader23">6.1 dom&#x57FA;&#x672C;&#x64CD;&#x4F5C;&#x65B9;&#x6CD5;</h2><p>html()&#xFF0C;text()&#xFF0C;val()&#xFF0C;attr()&#xFF0C;removeAttr()</p><h3 id="articleHeader24">6.1.1 html()</h3><p>html() &#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x6216;&#x8BBE;&#x7F6E;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x7684;&#x5185;&#x5BB9; (inner HTML)</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &lt;ul style=&quot;list-style: none;&quot;&gt;
    &lt;li&gt;&#x4ECE;&#x524D;&#x4ECE;&#x524D;&lt;/li&gt;
    &lt;li&gt;&#x56E0;&#x4E3A;&#x7231;&#x6240;&#x4EE5;&#x7231;&lt;/li&gt;
    &lt;li&gt;&#x4E24;&#x9897;&#x4E0D;&#x518D;&#x76F8;&#x9047;&#x7684;&#x884C;&#x661F;&lt;/li&gt;
    &lt;li&gt;&#x604B;&#x7231;&#x5566;&lt;/li&gt;
  &lt;/ul&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
  // &#x6253;&#x5370;ul&#x4E0B;&#x7684;&#x6240;&#x6709;&#x7684;&#x5B50;&#x5143;&#x7D20;
    console.log($(&quot;ul&quot;).html());
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"> &lt;ul style=<span class="hljs-string">&quot;list-style: none;&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x4ECE;&#x524D;&#x4ECE;&#x524D;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li&gt;&#x56E0;&#x4E3A;&#x7231;&#x6240;&#x4EE5;&#x7231;&lt;<span class="hljs-regexp">/li&gt;
    &lt;li&gt;&#x4E24;&#x9897;&#x4E0D;&#x518D;&#x76F8;&#x9047;&#x7684;&#x884C;&#x661F;&lt;/</span>li&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x604B;&#x7231;&#x5566;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  &lt;<span class="hljs-regexp">/ul&gt;
  &lt;script src=&apos;js/</span>jquery.js<span class="hljs-string">&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
  // &#x6253;&#x5370;ul&#x4E0B;&#x7684;&#x6240;&#x6709;&#x7684;&#x5B50;&#x5143;&#x7D20;
    console.log($(&quot;ul&quot;).html());
  &lt;/script&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFRA?w=637&amp;h=340" src="https://static.alili.tech/img/bVbeFRA?w=637&amp;h=340" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h3 id="articleHeader25">6.1.2 text()</h3><p>text()&#x65B9;&#x6CD5;&#x662F;&#x53D6;&#x5F97;&#x6216;&#x8BBE;&#x7F6E;&#x6240;&#x6709;&#x5339;&#x914D;&#x5143;&#x7D20;&#x7684;&#x6587;&#x672C;&#x5185;&#x5BB9;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    
  &lt;ul style=&quot;list-style: none;&quot;&gt;
    &lt;li&gt;&#x4ECE;&#x524D;&#x4ECE;&#x524D;&lt;/li&gt;
    &lt;li&gt;&#x56E0;&#x4E3A;&#x7231;&#x6240;&#x4EE5;&#x7231;&lt;/li&gt;
    &lt;li&gt;&#x4E24;&#x9897;&#x4E0D;&#x518D;&#x76F8;&#x9047;&#x7684;&#x884C;&#x661F;&lt;/li&gt;
    &lt;li&gt;&#x604B;&#x7231;&#x5566;&lt;/li&gt;
  &lt;/ul&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
  // &#x6253;&#x5370;ul&#x4E0B;&#x7684;&#x6240;&#x6709;&#x7684;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x6587;&#x672C;
    console.log($(&quot;ul&quot;).text());
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    
  &lt;ul style=<span class="hljs-string">&quot;list-style: none;&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x4ECE;&#x524D;&#x4ECE;&#x524D;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li&gt;&#x56E0;&#x4E3A;&#x7231;&#x6240;&#x4EE5;&#x7231;&lt;<span class="hljs-regexp">/li&gt;
    &lt;li&gt;&#x4E24;&#x9897;&#x4E0D;&#x518D;&#x76F8;&#x9047;&#x7684;&#x884C;&#x661F;&lt;/</span>li&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x604B;&#x7231;&#x5566;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  &lt;<span class="hljs-regexp">/ul&gt;
  &lt;script src=&apos;js/</span>jquery.js<span class="hljs-string">&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
  // &#x6253;&#x5370;ul&#x4E0B;&#x7684;&#x6240;&#x6709;&#x7684;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x6587;&#x672C;
    console.log($(&quot;ul&quot;).text());
  &lt;/script&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFRK?w=561&amp;h=343" src="https://static.alili.tech/img/bVbeFRK?w=561&amp;h=343" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h3 id="articleHeader26">6.1.3 text&#xFF08;&#xFF09;&#x65B9;&#x6CD5;&#x548C;html&#xFF08;&#xFF09;&#x65B9;&#x6CD5;&#x533A;&#x522B;:</h3><blockquote>text()&#x7528;&#x6765;&#x8BBE;&#x7F6E;dom&#x8282;&#x70B9;&#x7684;&#x6587;&#x672C;&#x5185;&#x5BB9;&#x65F6;&#xFF08;&#x4E0D;&#x8BC6;&#x522B;&#x6807;&#x7B7E;&#x5143;&#x7D20;&#xFF0C;&#x6309;&#x7167;&#x6587;&#x672C;&#x663E;&#x793A;&#xFF09;; html()&#x7528;&#x6765;&#x8BBE;&#x7F6E;dom&#x8282;&#x70B9;&#x5185;&#x5BB9;&#x65F6;&#xFF08;&#x8BC6;&#x522B;&#x6807;&#x7B7E;&#x5143;&#x7D20;&#xFF09;&#x3002;</blockquote><h3 id="articleHeader27">6.1.4 val()</h3><p>val()&#x65B9;&#x6CD5;&#x662F;&#x8BBE;&#x7F6E;&#x6216;&#x8FD4;&#x56DE;&#x8868;&#x5355;&#x5B57;&#x6BB5;&#x7684;&#x503C;</p><ul><li>$(selector).val(value)</li></ul><p><strong>&#x4E3A;&#x6807;&#x7B7E;&#x5143;&#x7D20;&#x6DFB;&#x52A0;&#x503C;&#xFF0C;&#x5982;&#x679C;&#x6807;&#x7B7E;&#x5143;&#x7D20;&#x6709;&#x503C;&#xFF0C;&#x5219;&#x4FEE;&#x6539;&#x76F8;&#x5E94;&#x7684;&#x503C;</strong><br>eg&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &lt;input type=&quot;text&quot; name=&quot;&quot; value=&quot;hello&quot;&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    $(&quot;input[type=&apos;text&apos;]&quot;).val(&quot;&#x4F60;&#x597D;&quot;);//input&#x7684;&#x4E2D;&#x7684;value&#x4F1A;&#x6539;&#x53D8;&#x6210;&#x201C;&#x4F60;&#x597D;&#x201D;
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"> &lt;input type=<span class="hljs-string">&quot;text&quot;</span> name=<span class="hljs-string">&quot;&quot;</span> value=<span class="hljs-string">&quot;hello&quot;</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
  &lt;script&gt;
    $(<span class="hljs-string">&quot;input[type=&apos;text&apos;]&quot;</span>).val(<span class="hljs-string">&quot;&#x4F60;&#x597D;&quot;</span>);<span class="hljs-comment">//input&#x7684;&#x4E2D;&#x7684;value&#x4F1A;&#x6539;&#x53D8;&#x6210;&#x201C;&#x4F60;&#x597D;&#x201D;</span>
  &lt;<span class="hljs-regexp">/script&gt;</span></code></pre><ul><li>$(selector).val()</li></ul><p><strong>&#x67E5;&#x627E;&#x6807;&#x7B7E;&#x5143;&#x7D20;&#x7684;value&#x503C;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;input type=&quot;text&quot; name=&quot;&quot; value=&quot;hello&quot;&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    console.log($(&quot;input[type=&apos;text&apos;]&quot;).val());// hello
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;input type=<span class="hljs-string">&quot;text&quot;</span> name=<span class="hljs-string">&quot;&quot;</span> value=<span class="hljs-string">&quot;hello&quot;</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
  &lt;script&gt;
    <span class="hljs-built_in">console</span>.log($(<span class="hljs-string">&quot;input[type=&apos;text&apos;]&quot;</span>).val());<span class="hljs-comment">// hello</span>
  &lt;<span class="hljs-regexp">/script&gt;</span></code></pre><h3 id="articleHeader28">6.1.5 attr()</h3><p><strong>&#x8BBE;&#x7F6E;&#x6216;&#x8FD4;&#x56DE;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x7684;&#x5C5E;&#x6027;&#x503C;&#xFF0C;&#x4F1A;&#x8986;&#x76D6;&#x539F;&#x6709;&#x5C5E;&#x6027;</strong></p><ul><li>$(selector).attr(attribute)</li></ul><p>&#x67E5;&#x627E;&#x8BE5;&#x5C5E;&#x6027;&#x6240;&#x5BF9;&#x5E94;&#x7684;&#x5C5E;&#x6027;&#x503C;<br>eg&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      &lt;input type=&quot;text&quot; name=&quot;name&quot; value=&quot;hello&quot;&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    console.log($(&quot;input[type=&apos;text&apos;]&quot;).attr(&apos;name&apos;));// name
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">      &lt;input type=<span class="hljs-string">&quot;text&quot;</span> name=<span class="hljs-string">&quot;name&quot;</span> value=<span class="hljs-string">&quot;hello&quot;</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
  &lt;script&gt;
    <span class="hljs-built_in">console</span>.log($(<span class="hljs-string">&quot;input[type=&apos;text&apos;]&quot;</span>).attr(<span class="hljs-string">&apos;name&apos;</span>));<span class="hljs-comment">// name</span>
  &lt;<span class="hljs-regexp">/script&gt;</span></code></pre><ul><li>$(selector).attr(attribute,value) &#x8BBE;&#x7F6E;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x503C;</li></ul><p>&#x53EF;&#x4EE5;&#x4E3A;&#x8BE5;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x6837;&#x5F0F;&#x6216;&#x8005;&#x589E;&#x52A0;&#x5C5E;&#x6027;<br>eg&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      &lt;input type=&quot;text&quot; name=&quot;name&quot; value=&quot;hello&quot;&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
  // &#x6539;&#x53D8;&#x8BE5;&#x8868;&#x5355;&#x7684;&#x5C5E;&#x6027;
    $(&quot;input[type=&apos;text&apos;]&quot;).attr(&apos;style&apos;,&apos;background:red&apos;);
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">      &lt;input type=<span class="hljs-string">&quot;text&quot;</span> name=<span class="hljs-string">&quot;name&quot;</span> value=<span class="hljs-string">&quot;hello&quot;</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
  &lt;script&gt;
  <span class="hljs-comment">// &#x6539;&#x53D8;&#x8BE5;&#x8868;&#x5355;&#x7684;&#x5C5E;&#x6027;</span>
    $(<span class="hljs-string">&quot;input[type=&apos;text&apos;]&quot;</span>).attr(<span class="hljs-string">&apos;style&apos;</span>,<span class="hljs-string">&apos;background:red&apos;</span>);
  <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFRR?w=518&amp;h=90" src="https://static.alili.tech/img/bVbeFRR?w=518&amp;h=90" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h3 id="articleHeader29">6.1.6 removeAttr()</h3><p>&#x4ECE;&#x5B57;&#x9762;&#x610F;&#x601D;&#x89E3;&#x91CA;&#x5C31;&#x662F; &#x79FB;&#x9664;&#x76F8;&#x5E94;&#x5C5E;&#x6027;</p><p>eg&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;div class=&quot;box&quot;&gt;helloworld&lt;/div&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
  // &#x6539;&#x53D8;&#x8BE5;&#x8868;&#x5355;&#x7684;&#x5C5E;&#x6027;
    $(&quot;div&quot;).removeAttr(&quot;class&quot;);// &#x628A;div&#x7684;&#x6837;&#x5F0F;&#x79FB;&#x9664;&#x6389;
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;box&quot;</span>&gt;helloworld&lt;<span class="hljs-regexp">/div&gt;
  &lt;script src=&apos;js/</span>jquery.js<span class="hljs-string">&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
  // &#x6539;&#x53D8;&#x8BE5;&#x8868;&#x5355;&#x7684;&#x5C5E;&#x6027;
    $(&quot;div&quot;).removeAttr(&quot;class&quot;);// &#x628A;div&#x7684;&#x6837;&#x5F0F;&#x79FB;&#x9664;&#x6389;
  &lt;/script&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .box{width: 100px;height:100px;background:pink;}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css" style="word-break:break-word;white-space:initial">    <span class="hljs-selector-class">.box</span>{<span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;<span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;<span class="hljs-attribute">background</span>:pink;}</code></pre><h1 id="articleHeader30">&#x4E03;&#x3001;jQuery&#x7684;&#x64CD;&#x4F5C;&#x6837;&#x5F0F;</h1><h2 id="articleHeader31">7.1 $(selector).attr(attribute,value)</h2><p>&#x5C0F;&#x7F16;&#x5BC4;&#x8BED;&#xFF1A;attr() &#x53EF;&#x4EE5;&#x6539;&#x53D8;&#x5143;&#x7D20;&#x7684;&#x73B0;&#x6709;&#x6837;&#x5F0F;&#xFF0C;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x5C0F;&#x4F8B;&#x5B50;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .one{width: 100px;height:100px;background:pink;}
      .two{width:200px;height:200px;background:orange;}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">    <span class="hljs-selector-class">.one</span>{<span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;<span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;<span class="hljs-attribute">background</span>:pink;}
      <span class="hljs-selector-class">.two</span>{<span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;<span class="hljs-attribute">height</span>:<span class="hljs-number">200px</span>;<span class="hljs-attribute">background</span>:orange;}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      &lt;div class=&quot;one&quot;&gt;&lt;/div&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
  // &#x8BA9;div&#x7684;&#x6837;&#x5F0F;&#x6709; one &#x6539;&#x53D8;&#x4E3A; two
    $(&quot;div&quot;).attr(&quot;class&quot;,&quot;two&quot;);
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">      &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;one&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  &lt;script src=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
  &lt;script&gt;
  <span class="hljs-comment">// &#x8BA9;div&#x7684;&#x6837;&#x5F0F;&#x6709; one &#x6539;&#x53D8;&#x4E3A; two</span>
    $(<span class="hljs-string">&quot;div&quot;</span>).attr(<span class="hljs-string">&quot;class&quot;</span>,<span class="hljs-string">&quot;two&quot;</span>);
  <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFR4?w=509&amp;h=233" src="https://static.alili.tech/img/bVbeFR4?w=509&amp;h=233" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader32">7.2 $(selector).addClass(class)</h2><p>&#x5C0F;&#x7F16;&#x5BC4;&#x8BED;&#xFF1A;&#x8FD9;&#x4E2A;&#x610F;&#x601D;&#x5C31;&#x662F;&#x5728;&#x539F;&#x6709;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#x518D;&#x6DFB;&#x52A0;&#x4E00;&#x4E9B;&#x5176;&#x4ED6;&#x7684;&#x7C7B;&#xFF0C;&#x770B;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .one{width: 100px;height:100px;background:pink;}
      /* &#x6DFB;&#x52A0;&#x8FB9;&#x6846; */
      .two{border:5px solid red;}
      /* &#x6DFB;&#x52A0;&#x9634;&#x5F71; */
      .three{box-shadow:5px 5px orange;}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">    <span class="hljs-selector-class">.one</span>{<span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;<span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;<span class="hljs-attribute">background</span>:pink;}
      <span class="hljs-comment">/* &#x6DFB;&#x52A0;&#x8FB9;&#x6846; */</span>
      <span class="hljs-selector-class">.two</span>{<span class="hljs-attribute">border</span>:<span class="hljs-number">5px</span> solid red;}
      <span class="hljs-comment">/* &#x6DFB;&#x52A0;&#x9634;&#x5F71; */</span>
      <span class="hljs-selector-class">.three</span>{<span class="hljs-attribute">box-shadow</span>:<span class="hljs-number">5px</span> <span class="hljs-number">5px</span> orange;}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;div class=&quot;one&quot;&gt;&lt;/div&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
  // &#x8FD9;&#x91CC;&#x589E;&#x52A0;&#x4E24;&#x4E2A;&#x7C7B;
    $(&quot;div&quot;).addClass(&quot;two three&quot;);
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;one&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  &lt;script src=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
  &lt;script&gt;
  <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x589E;&#x52A0;&#x4E24;&#x4E2A;&#x7C7B;</span>
    $(<span class="hljs-string">&quot;div&quot;</span>).addClass(<span class="hljs-string">&quot;two three&quot;</span>);
  <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFR5?w=356&amp;h=140" src="https://static.alili.tech/img/bVbeFR5?w=356&amp;h=140" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader33">7.3 $(selector).removeClass(class)</h2><p>&#x6CE8;&#x610F;: &#x79FB;&#x9664;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x7C7B;</p><ol><li>&#x4E0D;&#x4F20;&#x53C2; - &#x5220;&#x9664;&#x6240;&#x6709;&#x6837;&#x5F0F;</li></ol><p>eg&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;style&gt;
      .one{width: 100px;height:100px;background:pink;}
      /* &#x6DFB;&#x52A0;&#x8FB9;&#x6846; */
      .two{border:5px solid red;}
      /* &#x6DFB;&#x52A0;&#x9634;&#x5F71; */
      .three{box-shadow:5px 5px orange;}
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div class=&quot;one two three&quot;&gt;hello world&#xFF01;&lt;/div&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
  // &#x8FD9;&#x91CC;&#x628A;&#x6240;&#x6709;&#x7684;&#x6837;&#x5F0F;&#x5168;&#x90E8;&#x5220;&#x9664;
    $(&quot;div&quot;).removeClass();
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;style&gt;
      .one{<span class="hljs-attr">width</span>: <span class="hljs-number">100</span>px;height:<span class="hljs-number">100</span>px;background:pink;}
      <span class="hljs-comment">/* &#x6DFB;&#x52A0;&#x8FB9;&#x6846; */</span>
      .two{<span class="hljs-attr">border</span>:<span class="hljs-number">5</span>px solid red;}
      <span class="hljs-comment">/* &#x6DFB;&#x52A0;&#x9634;&#x5F71; */</span>
      .three{box-shadow:<span class="hljs-number">5</span>px <span class="hljs-number">5</span>px orange;}
    &lt;<span class="hljs-regexp">/style&gt;
&lt;/</span>head&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;one two three&quot;</span>&gt;</span>hello world&#xFF01;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x628A;&#x6240;&#x6709;&#x7684;&#x6837;&#x5F0F;&#x5168;&#x90E8;&#x5220;&#x9664;</span>
    $(<span class="hljs-string">&quot;div&quot;</span>).removeClass();
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFR6?w=419&amp;h=113" src="https://static.alili.tech/img/bVbeFR6?w=419&amp;h=113" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><ol><li>&#x4F20;&#x53C2; - &#x5220;&#x9664;&#x6307;&#x5B9A;&#x6837;&#x5F0F;</li></ol><p>&#x770B;&#x4F8B;&#x5B50;&#xFF1A;<br>eg:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     &lt;style&gt;
      .one{width: 100px;height:100px;background:pink;}
      /* &#x6DFB;&#x52A0;&#x8FB9;&#x6846; */
      .two{border:5px solid red;}
      /* &#x6DFB;&#x52A0;&#x9634;&#x5F71; */
      .three{box-shadow:5px 5px orange;}
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div class=&quot;one two three&quot;&gt;hello world&#xFF01;&lt;/div&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
  // &#x8FD9;&#x91CC;&#x5220;&#x9664;&#x7C7B;&#x4E3A; two
    $(&quot;div&quot;).removeClass(&quot;two&quot;);
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">     &lt;style&gt;
      .one{<span class="hljs-attr">width</span>: <span class="hljs-number">100</span>px;height:<span class="hljs-number">100</span>px;background:pink;}
      <span class="hljs-comment">/* &#x6DFB;&#x52A0;&#x8FB9;&#x6846; */</span>
      .two{<span class="hljs-attr">border</span>:<span class="hljs-number">5</span>px solid red;}
      <span class="hljs-comment">/* &#x6DFB;&#x52A0;&#x9634;&#x5F71; */</span>
      .three{box-shadow:<span class="hljs-number">5</span>px <span class="hljs-number">5</span>px orange;}
    &lt;<span class="hljs-regexp">/style&gt;
&lt;/</span>head&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;one two three&quot;</span>&gt;</span>hello world&#xFF01;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x5220;&#x9664;&#x7C7B;&#x4E3A; two</span>
    $(<span class="hljs-string">&quot;div&quot;</span>).removeClass(<span class="hljs-string">&quot;two&quot;</span>);
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFR9?w=443&amp;h=199" src="https://static.alili.tech/img/bVbeFR9?w=443&amp;h=199" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader34">7.4 $(selector).toggleClass(class)</h2><p>&#x7ED9;&#x5927;&#x5BB6;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x8BB0;&#x6CD5;&#xFF1A; &#x6709;&#x8FD9;&#x4E2A;&#x4E1C;&#x897F;&#x5C31;&#x5220;&#x6389;&#xFF0C;&#x6CA1;&#x6709;&#x5C31;&#x52A0;&#x4E0A;<br>&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x4E3E;&#x4F8B;&#x5B50;&#x4E86;&#xFF0C;&#x6709;&#x5FC3;&#x7684;&#x4F60;&#x53EF;&#x4EE5;&#x628A; 7.3 7.2 &#x7684;&#x4E1C;&#x897F; &#x7CC5;&#x5408;&#x4E00;&#x4E0B;&#x5C31;&#x884C;&#x4E86;</p><h2 id="articleHeader35">7.5 $(selector).hasClass(class)</h2><p>&#x8FD9;&#x4E2A;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x610F;&#x601D;&#x5C31;&#x662F;&#xFF0C;&#x68C0;&#x67E5;&#x6709;&#x6CA1;&#x6709;&#x8FD9;&#x4E2A;&#x7C7B;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x8FD4;&#x56DE;true&#xFF0C;&#x6CA1;&#x6709;&#x8FD4;&#x56DE;false&#xFF0C;&#x8FD9;&#x4E2A;&#x5C31;&#x4E0D;&#x4E3E;&#x4F8B;&#x5B50;&#xFF0C;&#x4F60;&#x4EEC;&#x53EF;&#x4EE5;&#x5C1D;&#x8BD5;&#x4E00;&#x4E0B;&#xFF0C;&#x8FD9;&#x4E2A;&#x4E0D;&#x7ECF;&#x5E38;&#x7528;.</p><h2 id="articleHeader36">7.6 css() &#x65B9;&#x6CD5;</h2><p>&#x8BBE;&#x7F6E;&#x6216;&#x8FD4;&#x56DE;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x7684;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x6837;&#x5F0F;&#x5C5E;&#x6027;.&#x524D;&#x9762;&#x5C0F;&#x7F16;&#x4E5F;&#x7ECF;&#x5E38;&#x7528;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x6765;&#x8BBE;&#x7F6E;&#x5143;&#x7D20;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x8FD9;&#x91CC;&#x7ED9;&#x51FA;&#x5177;&#x4F53;&#x8BE6;&#x89E3;.</p><ol><li>css(&quot;propertyname&quot;); // &#x83B7;&#x53D6;&#x6837;&#x5F0F;&#x7684;&#x5C5E;&#x6027;&#x503C;</li><li>css(&quot;propertyname&quot;, &quot;value&quot;); //&#x8BBE;&#x7F6E;&#x5355;&#x4E2A;&#x6837;&#x5F0F;</li><li>css({&quot;propertyname&quot;:&quot;value&quot;,&quot;propertyname&quot;:&quot;value&quot;,...}); // &#x8BBE;&#x7F6E;&#x591A;&#x4E2A;&#x6837;&#x5F0F;</li></ol><p>&#x7EFC;&#x5408;&#x4E0A;&#x9762;&#x4E09;&#x6761;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;style&gt;
      .one{width: 100px;height:100px;background:pink;}
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div class=&quot;one &quot;&gt;&lt;/div&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
  // &#x6253;&#x5370;div&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#x5C5E;&#x6027;&#x503C;
   console.log( $(&quot;div&quot;).css(&apos;width&apos;));
   // &#x4E3A;div&#x5143;&#x7D20; &#x589E;&#x52A0;&#x4E00;&#x4E2A;&#x6837;&#x5F0F;&#x5C5E;&#x6027;
   $(&quot;div&quot;).css(&quot;border&quot;,&quot;5px solid red&quot;);
   // &#x4E3A;div&#x5143;&#x7D20; &#x589E;&#x52A0;&#x591A;&#x4E2A;&#x6837;&#x5F0F;&#x5C5E;&#x6027;
   $(&quot;div&quot;).css({
      &quot;boxShadow&quot;:&quot;0px 0px  15px  black&quot;,
      &quot;borderRadius&quot;:&quot;50%&quot;
   });
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;style&gt;
      .one{<span class="hljs-attr">width</span>: <span class="hljs-number">100</span>px;height:<span class="hljs-number">100</span>px;background:pink;}
    &lt;<span class="hljs-regexp">/style&gt;
&lt;/</span>head&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;one &quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-comment">// &#x6253;&#x5370;div&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#x5C5E;&#x6027;&#x503C;</span>
   <span class="hljs-built_in">console</span>.log( $(<span class="hljs-string">&quot;div&quot;</span>).css(<span class="hljs-string">&apos;width&apos;</span>));
   <span class="hljs-comment">// &#x4E3A;div&#x5143;&#x7D20; &#x589E;&#x52A0;&#x4E00;&#x4E2A;&#x6837;&#x5F0F;&#x5C5E;&#x6027;</span>
   $(<span class="hljs-string">&quot;div&quot;</span>).css(<span class="hljs-string">&quot;border&quot;</span>,<span class="hljs-string">&quot;5px solid red&quot;</span>);
   <span class="hljs-comment">// &#x4E3A;div&#x5143;&#x7D20; &#x589E;&#x52A0;&#x591A;&#x4E2A;&#x6837;&#x5F0F;&#x5C5E;&#x6027;</span>
   $(<span class="hljs-string">&quot;div&quot;</span>).css({
      <span class="hljs-string">&quot;boxShadow&quot;</span>:<span class="hljs-string">&quot;0px 0px  15px  black&quot;</span>,
      <span class="hljs-string">&quot;borderRadius&quot;</span>:<span class="hljs-string">&quot;50%&quot;</span>
   });
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFSj?w=496&amp;h=245" src="https://static.alili.tech/img/bVbeFSj?w=496&amp;h=245" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h1 id="articleHeader37">&#x516B;&#x3001;jQuery&#x904D;&#x5386;&#x8282;&#x70B9;</h1><h2 id="articleHeader38">8.1 parent() &#x65B9;&#x6CD5;</h2><blockquote>&#x8FD4;&#x56DE;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x7684;&#x76F4;&#x63A5;&#x7236;&#x5143;&#x7D20;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;div&gt;&lt;span&gt;hello world!&lt;/span&gt;&lt;/div&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    console.log($(&quot;span&quot;).parent());
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;div&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>hello world!<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  &lt;script src=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
  &lt;script&gt;
    <span class="hljs-built_in">console</span>.log($(<span class="hljs-string">&quot;span&quot;</span>).parent());
  <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFSk?w=551&amp;h=312" src="https://static.alili.tech/img/bVbeFSk?w=551&amp;h=312" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader39">8.2 parents() &#x65B9;&#x6CD5;</h2><blockquote>&#x8FD4;&#x56DE;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x7684;&#x6240;&#x6709;&#x7956;&#x5148;&#x5143;&#x7D20;&#xFF0C;&#x5B83;&#x4E00;&#x8DEF;&#x5411;&#x4E0A;&#x76F4;&#x5230;&#x6587;&#x6863;&#x7684;&#x6839;&#x5143;&#x7D20; (&lt;html&gt;)</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     &lt;div&gt;&lt;span&gt;hello world!&lt;/span&gt;&lt;/div&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    console.log($(&quot;span&quot;).parents());
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">     &lt;div&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>hello world!<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  &lt;script src=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
  &lt;script&gt;
    <span class="hljs-built_in">console</span>.log($(<span class="hljs-string">&quot;span&quot;</span>).parents());
  <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFSq?w=597&amp;h=345" src="https://static.alili.tech/img/bVbeFSq?w=597&amp;h=345" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader40">8.3 children() &#x65B9;&#x6CD5;</h2><blockquote>&#x8FD4;&#x56DE;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x7684;&#x6240;&#x6709;&#x76F4;&#x63A5;&#x5B50;&#x5143;&#x7D20;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;div&gt;&lt;span&gt;hello world!&lt;/span&gt;&lt;p&gt;&#x4F60;&#x597D;&#xFF0C;&#x4E16;&#x754C;&#xFF01;&lt;/p&gt;&lt;/div&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    console.log($(&quot;div&quot;).children());
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;div&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>hello world!<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x4F60;&#x597D;&#xFF0C;&#x4E16;&#x754C;&#xFF01;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  &lt;script src=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
  &lt;script&gt;
    <span class="hljs-built_in">console</span>.log($(<span class="hljs-string">&quot;div&quot;</span>).children());
  <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFSs?w=553&amp;h=323" src="https://static.alili.tech/img/bVbeFSs?w=553&amp;h=323" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader41">8.4 find(elem) &#x65B9;&#x6CD5;</h2><blockquote>&#x8FD4;&#x56DE;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x7684;&#x540E;&#x4EE3;&#x5143;&#x7D20;&#xFF0C;&#x4E00;&#x8DEF;&#x5411;&#x4E0B;&#x76F4;&#x5230;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x540E;&#x4EE3;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;ul&gt;
    &lt;li&gt;hello&lt;/li&gt;
    &lt;li&gt;world&lt;/li&gt;
    &lt;li&gt;hello world&lt;/li&gt;
    &lt;li&gt;&#x4F60;&#x597D;&#xFF0C;&#x4E16;&#x754C;&#xFF01;&lt;/li&gt;
  &lt;/ul&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    console.log($(&quot;ul&quot;).find(&apos;li&apos;));
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">&lt;ul&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>hello<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li&gt;world&lt;<span class="hljs-regexp">/li&gt;
    &lt;li&gt;hello world&lt;/</span>li&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x4F60;&#x597D;&#xFF0C;&#x4E16;&#x754C;&#xFF01;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  &lt;<span class="hljs-regexp">/ul&gt;
  &lt;script src=&apos;js/</span>jquery.js<span class="hljs-string">&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    console.log($(&quot;ul&quot;).find(&apos;</span>li<span class="hljs-string">&apos;));
  &lt;/script&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFSB?w=745&amp;h=350" src="https://static.alili.tech/img/bVbeFSB?w=745&amp;h=350" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader42">8.5 prev() &#x65B9;&#x6CD5;</h2><blockquote>&#x8FD4;&#x56DE;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x7684;&#x4E0A;&#x4E00;&#x4E2A;&#x540C;&#x80DE;&#x5143;&#x7D20;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;ul&gt;
    &lt;li&gt;hello&lt;/li&gt;
    &lt;li id=&quot;demo&quot;&gt;world&lt;/li&gt;
    &lt;li&gt;hello world&lt;/li&gt;
    &lt;li&gt;&#x4F60;&#x597D;&#xFF0C;&#x4E16;&#x754C;&#xFF01;&lt;/li&gt;
  &lt;/ul&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    console.log($(&quot;#demo&quot;).prev());
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;ul&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>hello<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li id=<span class="hljs-string">&quot;demo&quot;</span>&gt;world&lt;<span class="hljs-regexp">/li&gt;
    &lt;li&gt;hello world&lt;/</span>li&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x4F60;&#x597D;&#xFF0C;&#x4E16;&#x754C;&#xFF01;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  &lt;<span class="hljs-regexp">/ul&gt;
  &lt;script src=&apos;js/</span>jquery.js<span class="hljs-string">&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    console.log($(&quot;#demo&quot;).prev());
  &lt;/script&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFSw?w=487&amp;h=290" src="https://static.alili.tech/img/bVbeFSw?w=487&amp;h=290" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader43">8.6 next() &#x65B9;&#x6CD5;</h2><blockquote>&#x8FD4;&#x56DE;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x7684;&#x4E0B;&#x4E00;&#x4E2A;&#x540C;&#x80DE;&#x5143;&#x7D20;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;ul&gt;
    &lt;li&gt;hello&lt;/li&gt;
    &lt;li id=&quot;demo&quot;&gt;world&lt;/li&gt;
    &lt;li&gt;hello world&lt;/li&gt;
    &lt;li&gt;&#x4F60;&#x597D;&#xFF0C;&#x4E16;&#x754C;&#xFF01;&lt;/li&gt;
  &lt;/ul&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    console.log($(&quot;#demo&quot;).next());
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">&lt;ul&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>hello<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li id=<span class="hljs-string">&quot;demo&quot;</span>&gt;world&lt;<span class="hljs-regexp">/li&gt;
    &lt;li&gt;hello world&lt;/</span>li&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x4F60;&#x597D;&#xFF0C;&#x4E16;&#x754C;&#xFF01;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  &lt;<span class="hljs-regexp">/ul&gt;
  &lt;script src=&apos;js/</span>jquery.js<span class="hljs-string">&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    console.log($(&quot;#demo&quot;).next());
  &lt;/script&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFSF?w=560&amp;h=305" src="https://static.alili.tech/img/bVbeFSF?w=560&amp;h=305" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader44">8.7 siblings() &#x65B9;&#x6CD5;</h2><blockquote>&#x8FD4;&#x56DE;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x7684;&#x6240;&#x6709;&#x540C;&#x80DE;&#x5143;&#x7D20;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     &lt;ul&gt;
    &lt;li&gt;hello&lt;/li&gt;
    &lt;li id=&quot;demo&quot;&gt;world&lt;/li&gt;
    &lt;li&gt;hello world&lt;/li&gt;
    &lt;li&gt;&#x4F60;&#x597D;&#xFF0C;&#x4E16;&#x754C;&#xFF01;&lt;/li&gt;
  &lt;/ul&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    console.log($(&quot;#demo&quot;).siblings());
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">     &lt;ul&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>hello<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li id=<span class="hljs-string">&quot;demo&quot;</span>&gt;world&lt;<span class="hljs-regexp">/li&gt;
    &lt;li&gt;hello world&lt;/</span>li&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x4F60;&#x597D;&#xFF0C;&#x4E16;&#x754C;&#xFF01;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  &lt;<span class="hljs-regexp">/ul&gt;
  &lt;script src=&apos;js/</span>jquery.js<span class="hljs-string">&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    console.log($(&quot;#demo&quot;).siblings());
  &lt;/script&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFSK?w=638&amp;h=329" src="https://static.alili.tech/img/bVbeFSK?w=638&amp;h=329" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h1 id="articleHeader45">&#x4E5D;&#x3001;&#x64CD;&#x4F5C;DOM&#x8282;&#x70B9;</h1><h2 id="articleHeader46">9.1 DOM&#x5185;&#x90E8;&#x63D2;&#x5165;(&#x6216;&#x8FFD;&#x52A0;)&#x6570;&#x636E;</h2><ul><li>append(content) -&#x5411;&#x6BCF;&#x4E2A;&#x5339;&#x914D;&#x7684;&#x5143;&#x7D20;&#x5185;&#x90E8;&#x8FFD;&#x52A0;&#x5185;&#x5BB9;&#x6216;&#x8FFD;&#x52A0;&#x5B50;&#x8282;&#x70B9;</li><li>appendTo(content)&#x628A;&#x6240;&#x6709;&#x5339;&#x914D;&#x7684;&#x5143;&#x7D20;&#x8FFD;&#x52A0;&#x5230;&#x53E6;&#x4E00;&#x4E2A;&#x6307;&#x5B9A;&#x7684;&#x5143;&#x7D20;&#x96C6;&#x5408;&#x4E2D;</li><li>prepend(content) &#x5728;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x7684;&#x5F00;&#x5934;&#x63D2;&#x5165;&#x5185;&#x5BB9;</li><li>prependTo(content) &#x628A;&#x6240;&#x6709;&#x5339;&#x914D;&#x7684;&#x5143;&#x7D20;&#x524D;&#x7F6E;&#x5230;&#x6307;&#x5B9A;&#x7684;&#x5143;&#x7D20;&#x96C6;&#x5408;&#x4E2D;</li></ul><p>&#x4EE5;&#x4E0A;&#x56DB;&#x79CD;&#x60C5;&#x51B5;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     &lt;div&gt;&lt;/div&gt;
 &lt;p&gt;good&#xFF01;&lt;/p&gt;
 &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
 &lt;script&gt;
 // &#x5728;div&#x5143;&#x7D20;&#x91CC;&#x6DFB;&#x52A0;&#x5B50;&#x8282;&#x70B9; &lt;span&gt;&lt;/span&gt;
 $(&quot;div&quot;).append(&apos;&lt;span&gt;hello world&#xFF01;&lt;/span&gt;&apos;);
 // &#x628A; p &#x6DFB;&#x52A0;&#x5230;div&#x4E2D;
 $(&quot;p&quot;).appendTo($(&quot;div&quot;));
 // &#x5728;div&#x5F00;&#x5934;&#x63D2;&#x5165;&#x5185;&#x5BB9;
 $(&quot;div&quot;).prepend($(&quot;&lt;h2&gt;123&lt;/h2&gt;&quot;));
 &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">     &lt;div&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
 &lt;p&gt;good&#xFF01;&lt;<span class="hljs-regexp">/p&gt;
 &lt;script src=&apos;js/</span>jquery.js<span class="hljs-string">&apos;&gt;&lt;/script&gt;
 &lt;script&gt;
 // &#x5728;div&#x5143;&#x7D20;&#x91CC;&#x6DFB;&#x52A0;&#x5B50;&#x8282;&#x70B9; &lt;span&gt;&lt;/span&gt;
 $(&quot;div&quot;).append(&apos;</span>&lt;span&gt;hello world&#xFF01;&lt;<span class="hljs-regexp">/span&gt;&apos;);
 /</span><span class="hljs-regexp">/ &#x628A; p &#x6DFB;&#x52A0;&#x5230;div&#x4E2D;
 $(&quot;p&quot;).appendTo($(&quot;div&quot;));
 /</span><span class="hljs-regexp">/ &#x5728;div&#x5F00;&#x5934;&#x63D2;&#x5165;&#x5185;&#x5BB9;
 $(&quot;div&quot;).prepend($(&quot;&lt;h2&gt;123&lt;/</span>h2&gt;<span class="hljs-string">&quot;));
 &lt;/script&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFSO?w=475&amp;h=186" src="https://static.alili.tech/img/bVbeFSO?w=475&amp;h=186" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader47">9.2 jQuery&#x5916;&#x90E8;&#x63D2;&#x5165;</h2><ul><li>after(content) &#x5728;&#x6BCF;&#x4E2A;&#x5339;&#x914D;&#x7684;&#x5143;&#x7D20;&#x4E4B;&#x540E;&#x4F5C;&#x4E3A;&#x5144;&#x5F1F;&#x8282;&#x70B9;&#x63D2;&#x5165;&#x5185;&#x5BB9;</li><li>before(content) &#x65B9;&#x6CD5;&#x5728;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x4E4B;&#x524D;&#x4F5C;&#x4E3A;&#x5144;&#x5F1F;&#x8282;&#x70B9;&#x63D2;&#x5165;&#x5185;&#x5BB9;</li><li>insertAfter(content) &#x628A;&#x5143;&#x7D20;&#x63D2;&#x5165;&#x5230;&#x6240;&#x6709;&#x5339;&#x914D;&#x7684;&#x5143;&#x7D20;&#x7684;&#x540E;&#x9762;</li><li>insertBefore(content) &#x628A;&#x5143;&#x7D20;&#x63D2;&#x5165;&#x5230;&#x6240;&#x6709;&#x5339;&#x914D;&#x7684;&#x5143;&#x7D20;&#x7684;&#x540E;&#x9762;</li></ul><p>&#x524D;&#x4E24;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;ul&gt;
    &lt;li id=&quot;fruit&quot;&gt;
      &#x6C34;&#x679C;
      &lt;ul id=&quot;demo1&quot;&gt;
          &lt;li&gt;&#x9999;&#x8549;&lt;/li&gt;
          &lt;li&gt;&#x8461;&#x8404;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/li&gt;
    &lt;li id=&quot;play&quot;&gt;&#x8FD0;&#x52A8;
        &lt;ul id=&quot;demo&quot;&gt;
            &lt;li&gt;&#x8DD1;&#x6B65;&lt;/li&gt;
            &lt;li&gt;&#x6253;&#x7BEE;&#x7403;&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/li&gt;
    &lt;li id=&quot;dir&quot;&gt;&#x65B9;&#x5411;
      &lt;ul id=&quot;demo2&quot;&gt;
          &lt;li&gt;&#x4E1C;&#x5357;&lt;/li&gt;
          &lt;li&gt;&#x897F;&#x5317;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
  &lt;div&gt;&lt;/div&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
  // &#x5728;&quot;&#x6253;&#x7BEE;&#x7403;&quot;&#x4E4B;&#x540E;&#x63D2;&#x5165;&quot;&#x897F;&#x5317;&quot;&#x8282;&#x70B9;
 $(&quot;#demo&gt;li:last-child&quot;).after($(&quot;#demo2&gt;li:last-child&quot;));
 // &#x5728;&quot;&#x9999;&#x8549;&quot;&#x4E4B;&#x524D;&#x63D2;&#x5165;&quot;&#x8DD1;&#x6B65;&quot;&#x8282;&#x70B9;
 $(&quot;#demo1&gt;li:first-child&quot;).before($(&quot;#demo&gt;li:first-child&quot;));
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;ul&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;fruit&quot;</span>&gt;</span>
      &#x6C34;&#x679C;
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;demo1&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x9999;&#x8549;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x8461;&#x8404;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li id=<span class="hljs-string">&quot;play&quot;</span>&gt;&#x8FD0;&#x52A8;
        &lt;ul id=<span class="hljs-string">&quot;demo&quot;</span>&gt;
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x8DD1;&#x6B65;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
            &lt;li&gt;&#x6253;&#x7BEE;&#x7403;&lt;<span class="hljs-regexp">/li&gt;
        &lt;/u</span>l&gt;
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li id=<span class="hljs-string">&quot;dir&quot;</span>&gt;&#x65B9;&#x5411;
      &lt;ul id=<span class="hljs-string">&quot;demo2&quot;</span>&gt;
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x4E1C;&#x5357;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
          &lt;li&gt;&#x897F;&#x5317;&lt;<span class="hljs-regexp">/li&gt;
      &lt;/u</span>l&gt;
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  &lt;<span class="hljs-regexp">/ul&gt;
  &lt;div&gt;&lt;/</span>div&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
  &lt;script&gt;
  <span class="hljs-comment">// &#x5728;&quot;&#x6253;&#x7BEE;&#x7403;&quot;&#x4E4B;&#x540E;&#x63D2;&#x5165;&quot;&#x897F;&#x5317;&quot;&#x8282;&#x70B9;</span>
 $(<span class="hljs-string">&quot;#demo&gt;li:last-child&quot;</span>).after($(<span class="hljs-string">&quot;#demo2&gt;li:last-child&quot;</span>));
 <span class="hljs-comment">// &#x5728;&quot;&#x9999;&#x8549;&quot;&#x4E4B;&#x524D;&#x63D2;&#x5165;&quot;&#x8DD1;&#x6B65;&quot;&#x8282;&#x70B9;</span>
 $(<span class="hljs-string">&quot;#demo1&gt;li:first-child&quot;</span>).before($(<span class="hljs-string">&quot;#demo&gt;li:first-child&quot;</span>));
  <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFSS?w=408&amp;h=229" src="https://static.alili.tech/img/bVbeFSS?w=408&amp;h=229" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span><br>&#x540E;&#x4E24;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      &lt;ul&gt;
    &lt;li id=&quot;fruit&quot;&gt;
      &#x6C34;&#x679C;
      &lt;ul id=&quot;demo&quot;&gt;
          &lt;li&gt;&#x9999;&#x8549;&lt;/li&gt;
          &lt;li&gt;&#x8461;&#x8404;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/li&gt;
    &lt;li id=&quot;play&quot;&gt;&#x8FD0;&#x52A8;
        &lt;ul id=&quot;demo&quot;&gt;
            &lt;li&gt;&#x8DD1;&#x6B65;&lt;/li&gt;
            &lt;li&gt;&#x6253;&#x7BEE;&#x7403;&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/li&gt;
    &lt;li id=&quot;dir&quot;&gt;&#x65B9;&#x5411;
      &lt;ul id=&quot;demo2&quot;&gt;
          &lt;li&gt;&#x4E1C;&#x5357;&lt;/li&gt;
          &lt;li&gt;&#x897F;&#x5317;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
  &lt;div&gt;&lt;/div&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
  // &#x628A;&#x7B26;&#x5408;demo&#x7684;&#x5143;&#x7D20;&#x5168;&#x90E8;&#x63D2;&#x5165;&#x5230;demo2&#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x540E;&#x9762;
  $(&quot;#demo&gt;li:last-child&quot;).insertAfter($(&quot;#demo2&gt;li:last-child&quot;));
  // // &#x628A;&#x7B26;&#x5408;demo&#x7684;&#x5143;&#x7D20;&#x5168;&#x90E8;&#x63D2;&#x5165;&#x5230;demo2&#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x524D;&#x9762;
  $(&quot;#demo&gt;li:last-child&quot;).insertBefore($(&quot;#demo2&gt;li:last-child&quot;));
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">      &lt;ul&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;fruit&quot;</span>&gt;</span>
      &#x6C34;&#x679C;
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;demo&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x9999;&#x8549;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x8461;&#x8404;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li id=<span class="hljs-string">&quot;play&quot;</span>&gt;&#x8FD0;&#x52A8;
        &lt;ul id=<span class="hljs-string">&quot;demo&quot;</span>&gt;
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x8DD1;&#x6B65;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
            &lt;li&gt;&#x6253;&#x7BEE;&#x7403;&lt;<span class="hljs-regexp">/li&gt;
        &lt;/u</span>l&gt;
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li id=<span class="hljs-string">&quot;dir&quot;</span>&gt;&#x65B9;&#x5411;
      &lt;ul id=<span class="hljs-string">&quot;demo2&quot;</span>&gt;
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x4E1C;&#x5357;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
          &lt;li&gt;&#x897F;&#x5317;&lt;<span class="hljs-regexp">/li&gt;
      &lt;/u</span>l&gt;
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  &lt;<span class="hljs-regexp">/ul&gt;
  &lt;div&gt;&lt;/</span>div&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
  &lt;script&gt;
  <span class="hljs-comment">// &#x628A;&#x7B26;&#x5408;demo&#x7684;&#x5143;&#x7D20;&#x5168;&#x90E8;&#x63D2;&#x5165;&#x5230;demo2&#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x540E;&#x9762;</span>
  $(<span class="hljs-string">&quot;#demo&gt;li:last-child&quot;</span>).insertAfter($(<span class="hljs-string">&quot;#demo2&gt;li:last-child&quot;</span>));
  <span class="hljs-comment">// // &#x628A;&#x7B26;&#x5408;demo&#x7684;&#x5143;&#x7D20;&#x5168;&#x90E8;&#x63D2;&#x5165;&#x5230;demo2&#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x524D;&#x9762;</span>
  $(<span class="hljs-string">&quot;#demo&gt;li:last-child&quot;</span>).insertBefore($(<span class="hljs-string">&quot;#demo2&gt;li:last-child&quot;</span>));
  <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFSV?w=247&amp;h=227" src="https://static.alili.tech/img/bVbeFSV?w=247&amp;h=227" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader48">9.3 jQuery&#x5220;&#x9664;&#x5143;&#x7D20;</h2><blockquote>remove() - &#x5220;&#x9664;&#x88AB;&#x9009;&#x5143;&#x7D20;&#xFF08;&#x53CA;&#x5176;&#x540E;&#x4EE3;&#xFF09;<br>empty() - &#x4ECE;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x4E2D;&#x5220;&#x9664;&#x5B50;&#x5143;&#x7D20;&#xFF0C;&#x6E05;&#x7A7A;&#x5185;&#x5BB9;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     &lt;ul&gt;
    &lt;li id=&quot;fruit&quot;&gt;
      &#x6C34;&#x679C;
      &lt;ul id=&quot;demo&quot;&gt;
          &lt;li&gt;&#x9999;&#x8549;&lt;/li&gt;
          &lt;li&gt;&#x8461;&#x8404;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/li&gt;
    &lt;li id=&quot;play&quot;&gt;&#x8FD0;&#x52A8;
        &lt;ul id=&quot;demo&quot;&gt;
            &lt;li&gt;&#x8DD1;&#x6B65;&lt;/li&gt;
            &lt;li&gt;&#x6253;&#x7BEE;&#x7403;&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/li&gt;
    &lt;li id=&quot;dir&quot;&gt;&#x65B9;&#x5411;
      &lt;ul id=&quot;demo2&quot;&gt;
          &lt;li&gt;&#x4E1C;&#x5357;&lt;/li&gt;
          &lt;li&gt;&#x897F;&#x5317;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
  &lt;div&gt;&lt;/div&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
  //$(&quot;#fruit&quot;).remove();
  $(&quot;#fruit&quot;).empty();
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">     &lt;ul&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;fruit&quot;</span>&gt;</span>
      &#x6C34;&#x679C;
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;demo&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x9999;&#x8549;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x8461;&#x8404;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li id=<span class="hljs-string">&quot;play&quot;</span>&gt;&#x8FD0;&#x52A8;
        &lt;ul id=<span class="hljs-string">&quot;demo&quot;</span>&gt;
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x8DD1;&#x6B65;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
            &lt;li&gt;&#x6253;&#x7BEE;&#x7403;&lt;<span class="hljs-regexp">/li&gt;
        &lt;/u</span>l&gt;
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li id=<span class="hljs-string">&quot;dir&quot;</span>&gt;&#x65B9;&#x5411;
      &lt;ul id=<span class="hljs-string">&quot;demo2&quot;</span>&gt;
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x4E1C;&#x5357;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
          &lt;li&gt;&#x897F;&#x5317;&lt;<span class="hljs-regexp">/li&gt;
      &lt;/u</span>l&gt;
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  &lt;<span class="hljs-regexp">/ul&gt;
  &lt;div&gt;&lt;/</span>div&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
  &lt;script&gt;
  <span class="hljs-comment">//$(&quot;#fruit&quot;).remove();</span>
  $(<span class="hljs-string">&quot;#fruit&quot;</span>).empty();
  <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFS7?w=283&amp;h=147" src="https://static.alili.tech/img/bVbeFS7?w=283&amp;h=147" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span><br><span class="img-wrap"><img data-src="/img/bVbeFS8?w=263&amp;h=166" src="https://static.alili.tech/img/bVbeFS8?w=263&amp;h=166" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p><strong>&#x5C0F;&#x7F16;&#x5206;&#x6790;&#xFF1A;&#x4E4D;&#x4E00;&#x770B;&#x4E24;&#x5F20;&#x7167;&#x7247;&#x6CA1;&#x4EC0;&#x4E48;&#x533A;&#x522B;&#xFF0C;&#x5176;&#x5B9E;&#x662F;&#x4E0D;&#x4E00;&#x6837;&#x6EF4;&#xFF0C;remove &#x5220;&#x9664;&#x7684;&#x6BD4;&#x8F83;&#x5F7B;&#x5E95;&#xFF0C;&#x800C;empty &#x5220;&#x9664;&#x7684;&#x4E0D;&#x662F;&#x5F88;&#x5F7B;&#x5E95;&#xFF0C;&#x7B2C;&#x4E00;&#x5F20;&#x662F;remove&#x5220;&#x9664;&#x540E;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x800C;&#x53E6;&#x4E00;&#x5F20;&#x662F;empty&#x5220;&#x9664;&#x7684;&#x7ED3;&#x679C;</strong></p><h2 id="articleHeader49">9.4 jQuery&#x66FF;&#x6362;&#x5143;&#x7D20;</h2><ul><li>replaceWith(content) &#x5C06;&#x5339;&#x914D;&#x5143;&#x7D20;&#x66FF;&#x6362;&#x6210;&#x6307;&#x5B9A;&#x7684;HTML&#x6216;DOM&#x5143;&#x7D20;</li></ul><blockquote>&#x524D;&#x9762;&#x7684;&#x5143;&#x7D20;&#x662F;&#x88AB;&#x66FF;&#x6362;&#x5143;&#x7D20;,&#x540E;&#x9762;&#x7684;&#x5143;&#x7D20;&#x662F;&#x66FF;&#x6362;&#x5143;&#x7D20;</blockquote><ul><li>replaceAll(selector) &#x5C06;&#x5143;&#x7D20;&#x66FF;&#x6362;&#x6389; selector&#x5339;&#x914D;&#x5230;&#x7684;&#x5143;&#x7D20;</li></ul><blockquote>&#x524D;&#x9762;&#x7684;&#x5143;&#x7D20;&#x662F;&#x66FF;&#x6362;&#x5143;&#x7D20;,&#x540E;&#x9762;&#x7684;&#x5143;&#x7D20;&#x662F;&#x88AB;&#x66FF;&#x6362;&#x5143;&#x7D20;</blockquote><p>eg&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     &lt;div&gt;Hi&lt;/div&gt;
  &lt;span&gt;Good&#xFF01;&lt;/span&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
  // &#x5143;&#x7D20;div&#x88AB;&#x66FF;&#x6362;&#x6210;&#x4E86; &#x6807;&#x9898;&#x6807;&#x7B7E; h2
  $(&quot;div&quot;).replaceWith($(&quot;&lt;h2&gt;Hello&lt;/h2&gt;&quot;));
  // &#x628A;span&#x66FF;&#x6362;&#x6210;h3
  $(&quot;&lt;h3&gt;&#x4F60;&#x597D;&#xFF0C;&#x4E16;&#x754C;&#xFF01;&lt;/h3&gt;&quot;).replaceAll($(&quot;span&quot;));
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">     &lt;div&gt;Hi&lt;<span class="hljs-regexp">/div&gt;
  &lt;span&gt;Good&#xFF01;&lt;/</span>span&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
  &lt;script&gt;
  <span class="hljs-comment">// &#x5143;&#x7D20;div&#x88AB;&#x66FF;&#x6362;&#x6210;&#x4E86; &#x6807;&#x9898;&#x6807;&#x7B7E; h2</span>
  $(<span class="hljs-string">&quot;div&quot;</span>).replaceWith($(<span class="hljs-string">&quot;&lt;h2&gt;Hello&lt;/h2&gt;&quot;</span>));
  <span class="hljs-comment">// &#x628A;span&#x66FF;&#x6362;&#x6210;h3</span>
  $(<span class="hljs-string">&quot;&lt;h3&gt;&#x4F60;&#x597D;&#xFF0C;&#x4E16;&#x754C;&#xFF01;&lt;/h3&gt;&quot;</span>).replaceAll($(<span class="hljs-string">&quot;span&quot;</span>));
  <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFTg?w=309&amp;h=121" src="https://static.alili.tech/img/bVbeFTg?w=309&amp;h=121" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader50">9.5 jQuery&#x514B;&#x9686;&#x5143;&#x7D20;</h2><ul><li>&#x8BED;&#x6CD5;&#xFF1A; clone([Even1], [Even2])</li><li>&#x89E3;&#x91CA;&#x4E00;&#xFF1A;&#x65E0;&#x53C2;&#x6570;&#xFF0C;&#x53EA;&#x590D;&#x5236;&#x5143;&#x7D20;&#xFF0C;&#x4E0D;&#x590D;&#x5236;&#x8BE5;&#x5143;&#x7D20;&#x7684;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;&#xFF0C;</li><li>&#x7528;&#x6CD5;&#xFF1A;$(&quot;p&quot;).clone().appendTo(&apos;.box1&apos;);</li><li>&#x89E3;&#x91CA;&#x4E8C;&#xFF1A; &#x6709;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;true&#xFF0C;&#x590D;&#x5236;&#x5143;&#x7D20;&#x53CA;&#x5176;&#x672C;&#x8EAB;&#x7684;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;</li><li>&#x7528;&#x6CD5;&#xFF1A;$(&quot;p&quot;).clone(true).appendTo(&apos;.box1&apos;);</li><li>&#x89E3;&#x91CA;&#x4E09;&#xFF1A;&#x6709;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;true&#xFF08;&#x7B2C;&#x4E8C;&#x4E2A;&#x9ED8;&#x8BA4;&#x4E3A;true&#xFF09;&#x4E0D;&#x4EC5;&#x590D;&#x5236;&#x5143;&#x7D20;&#x53CA;&#x5176;&#x672C;&#x8EAB;&#x7684;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;&#x800C;&#x4E14;&#x4F1A;&#x590D;&#x5236;&#x5B50;&#x5143;&#x7D20;</li><li>&#x7528;&#x6CD5;&#xFF1A;$(&quot;p&quot;).clone(true, true).appendTo(&apos;.box1&apos;);</li></ul><p>&#x65E0;&#x53C2;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;div&gt;&lt;/div&gt;&lt;br/&gt;&lt;br/&gt;&lt;br/&gt;
  &lt;span&gt;Hello&lt;/span&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    $(&quot;span&quot;).click(function(){alert(&quot;&#x6211;&#x88AB;&#x590D;&#x5236;&#x4E86;&quot;)});
    $(&quot;span&quot;).clone().appendTo($(&quot;div&quot;));
    //$(&quot;span&quot;).clone(true).appendTo($(&quot;div&quot;));
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;div&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span></span>
  &lt;span&gt;Hello&lt;<span class="hljs-regexp">/span&gt;
  &lt;script src=&apos;js/</span>jquery.js<span class="hljs-string">&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    $(&quot;span&quot;).click(function(){alert(&quot;&#x6211;&#x88AB;&#x590D;&#x5236;&#x4E86;&quot;)});
    $(&quot;span&quot;).clone().appendTo($(&quot;div&quot;));
    //$(&quot;span&quot;).clone(true).appendTo($(&quot;div&quot;));
  &lt;/script&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFTo?w=726&amp;h=198" src="https://static.alili.tech/img/bVbeFTo?w=726&amp;h=198" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     &lt;div&gt;&lt;/div&gt;&lt;br/&gt;&lt;br/&gt;&lt;br/&gt;
  &lt;span&gt;Hello&lt;/span&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    $(&quot;span&quot;).click(function(){alert(&quot;&#x6211;&#x88AB;&#x590D;&#x5236;&#x4E86;&quot;)});
    //$(&quot;span&quot;).clone().appendTo($(&quot;div&quot;));
    $(&quot;span&quot;).clone(true).appendTo($(&quot;div&quot;));
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">     &lt;div&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span></span>
  &lt;span&gt;Hello&lt;<span class="hljs-regexp">/span&gt;
  &lt;script src=&apos;js/</span>jquery.js<span class="hljs-string">&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    $(&quot;span&quot;).click(function(){alert(&quot;&#x6211;&#x88AB;&#x590D;&#x5236;&#x4E86;&quot;)});
    //$(&quot;span&quot;).clone().appendTo($(&quot;div&quot;));
    $(&quot;span&quot;).clone(true).appendTo($(&quot;div&quot;));
  &lt;/script&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFTr?w=726&amp;h=198" src="https://static.alili.tech/img/bVbeFTr?w=726&amp;h=198" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;div&gt;&lt;/div&gt;&lt;br/&gt;&lt;br/&gt;&lt;br/&gt;
  &lt;p&gt;Hello &lt;span&gt;&#x4F60;&#x662F;&#x6211;&#x7684;&#x5C0F;&#x53EF;&#x7231;&lt;/span&gt;&lt;/p&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    $(&quot;span&quot;).click(function(){alert(&quot;&#x5C0F;&#x53EF;&#x7231;&#x4E5F;&#x88AB;&#x590D;&#x5236;&#x4E86;&quot;)});
    //$(&quot;span&quot;).clone().appendTo($(&quot;div&quot;));
    //$(&quot;span&quot;).clone(true).appendTo($(&quot;div&quot;));
    $(&quot;span&quot;).clone(true,true).appendTo($(&quot;div&quot;));
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;div&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span></span>
  &lt;p&gt;Hello &lt;span&gt;&#x4F60;&#x662F;&#x6211;&#x7684;&#x5C0F;&#x53EF;&#x7231;&lt;<span class="hljs-regexp">/span&gt;&lt;/</span>p&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
  &lt;script&gt;
    $(<span class="hljs-string">&quot;span&quot;</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{alert(<span class="hljs-string">&quot;&#x5C0F;&#x53EF;&#x7231;&#x4E5F;&#x88AB;&#x590D;&#x5236;&#x4E86;&quot;</span>)});
    <span class="hljs-comment">//$(&quot;span&quot;).clone().appendTo($(&quot;div&quot;));</span>
    <span class="hljs-comment">//$(&quot;span&quot;).clone(true).appendTo($(&quot;div&quot;));</span>
    $(<span class="hljs-string">&quot;span&quot;</span>).clone(<span class="hljs-literal">true</span>,<span class="hljs-literal">true</span>).appendTo($(<span class="hljs-string">&quot;div&quot;</span>));
  <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFTx?w=726&amp;h=198" src="https://static.alili.tech/img/bVbeFTx?w=726&amp;h=198" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h1 id="articleHeader51">&#x5341;&#x3001;&#x5C0F;&#x6848;&#x4F8B;</h1><h2 id="articleHeader52">10.1 &#x5B9E;&#x73B0;&#x5F00;&#x5173;&#x95E8;&#x6548;&#x679C;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        &lt;style type=&quot;text/css&quot;&gt;
        div {float: left;height: 100px;line-height: 100px;
        }
        #d1, #d3 {background-color: #ccff00;}
        #d2 { cursor: pointer;background-color: #ffcc00;}
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id=&quot;d1&quot;&gt;&#x6811;&#x5F62;&#x5217;&#x8868;&lt;/div&gt;
    &lt;div id=&quot;d2&quot;&gt;&amp;lt;&amp;lt;&lt;/div&gt;
    &lt;div id=&quot;d3&quot;&gt;&#x5185;&#x5BB9;&#x7684;&#x4E3B;&#x4F53;&lt;/div&gt;
    &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
    &lt;script&gt;
    $(&quot;#d2&quot;).click(function(){
        if($(&quot;#d1&quot;).is(&quot;:hidden&quot;)){
            // if #d1 &#x7684;&#x5143;&#x7D20;&#x9690;&#x85CF;&#xFF0C;&#x5219;&#x8BA9;&#x4ED6;&#x663E;&#x793A;&#xFF0C;&#x5E76;&#x6539;&#x53D8;&#x76F8;&#x5E94;&#x7684;&#x65B9;&#x5411;&#xFF0C;&#x5426;&#x5219;&#x76F8;&#x53CD;
            $(&quot;#d1&quot;).show();
            $(&quot;#d2&quot;).text(&quot;&lt;&lt;&quot;);
        }else{
            $(&quot;#d1&quot;).hide();
            $(&quot;#d2&quot;).text(&quot;&gt;&gt;&quot;);
        }
    });
    &lt;/script&gt;
&lt;/body&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">        &lt;style type=<span class="hljs-string">&quot;text/css&quot;</span>&gt;
        div {<span class="hljs-attr">float</span>: left;height: <span class="hljs-number">100</span>px;line-height: <span class="hljs-number">100</span>px;
        }
        #d1, #d3 {background-color: #ccff00;}
        #d2 { <span class="hljs-attr">cursor</span>: pointer;background-color: #ffcc00;}
    &lt;<span class="hljs-regexp">/style&gt;
&lt;/</span>head&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;d1&quot;</span>&gt;</span>&#x6811;&#x5F62;&#x5217;&#x8868;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;d2&quot;</span>&gt;</span>&amp;lt;&amp;lt;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;d3&quot;</span>&gt;</span>&#x5185;&#x5BB9;&#x7684;&#x4E3B;&#x4F53;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-string">&quot;#d2&quot;</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span>($(<span class="hljs-string">&quot;#d1&quot;</span>).is(<span class="hljs-string">&quot;:hidden&quot;</span>)){
            <span class="hljs-comment">// if #d1 &#x7684;&#x5143;&#x7D20;&#x9690;&#x85CF;&#xFF0C;&#x5219;&#x8BA9;&#x4ED6;&#x663E;&#x793A;&#xFF0C;&#x5E76;&#x6539;&#x53D8;&#x76F8;&#x5E94;&#x7684;&#x65B9;&#x5411;&#xFF0C;&#x5426;&#x5219;&#x76F8;&#x53CD;</span>
            $(<span class="hljs-string">&quot;#d1&quot;</span>).show();
            $(<span class="hljs-string">&quot;#d2&quot;</span>).text(<span class="hljs-string">&quot;&lt;&lt;&quot;</span>);
        }<span class="hljs-keyword">else</span>{
            $(<span class="hljs-string">&quot;#d1&quot;</span>).hide();
            $(<span class="hljs-string">&quot;#d2&quot;</span>).text(<span class="hljs-string">&quot;&gt;&gt;&quot;</span>);
        }
    });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeFTC?w=726&amp;h=198" src="https://static.alili.tech/img/bVbeFTC?w=726&amp;h=198" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h1 id="articleHeader53">&#x5341;&#x4E00;&#x3001;&#x603B;&#x7ED3;</h1><p>&#x786E;&#x5B9E;&#x6709;&#x70B9;&#x591A;&#xFF0C;&#x4E0D;&#x8FC7;&#x6CA1;&#x5173;&#x7CFB;&#xFF0C;&#x6162;&#x6162;&#x6765;&#xFF01;&#x76F8;&#x4FE1;&#x81EA;&#x5DF1;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jQuery入门、jQuery选择器、jQuery操作

## 原文链接
[https://segmentfault.com/a/1190000015851671](https://segmentfault.com/a/1190000015851671)

