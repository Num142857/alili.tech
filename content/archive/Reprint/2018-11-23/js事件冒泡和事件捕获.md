---
title: 'js事件冒泡和事件捕获' 
date: 2018-11-23 2:30:11
hidden: true
slug: cjmja2pzsps
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x4E8B;&#x4EF6;&#x5192;&#x6CE1; &#x3001;&#x4E8B;&#x4EF6;&#x6355;&#x83B7; &#x3001; &#x4E8B;&#x4EF6;&#x59D4;&#x6258;</h2><h4>1&#x3001;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1; &#x3001;&#x4E8B;&#x4EF6;&#x6355;&#x83B7; &#x4E8C;&#x8005;&#x8054;&#x7CFB;&#x4E0E;&#x533A;&#x522B;</h4><p><code>&#x8054;&#x7CFB;&#xFF1A;</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(1)&#x3001;&#x90FD;&#x662F; &#x4E8B;&#x4EF6;&#x89E6;&#x53D1;&#x65F6;&#x5E8F;&#x95EE;&#x9898; &#x7684;&#x672F;&#x8BED;&#x3002;
(2)&#x3001;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x65B9;&#x6CD5;&#xFF08;addEventListener&#xFF09;&#x7684;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x63A7;&#x5236;&#x4E8B;&#x4EF6;&#x89E6;&#x53D1;&#x987A;&#x5E8F;&#x7684;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;false&#xFF0C;&#x5373;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;&#xFF1B;&#x82E5;&#x4E3A;true,&#x5373;&#x4E8B;&#x4EF6;&#x6355;&#x83B7;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>(<span class="hljs-number">1</span>)&#x3001;&#x90FD;&#x662F; &#x4E8B;&#x4EF6;&#x89E6;&#x53D1;&#x65F6;&#x5E8F;&#x95EE;&#x9898; &#x7684;&#x672F;&#x8BED;&#x3002;
(<span class="hljs-number">2</span>)&#x3001;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x65B9;&#x6CD5;&#xFF08;addEventListener&#xFF09;&#x7684;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x63A7;&#x5236;&#x4E8B;&#x4EF6;&#x89E6;&#x53D1;&#x987A;&#x5E8F;&#x7684;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;<span class="hljs-literal">false</span>&#xFF0C;&#x5373;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;&#xFF1B;&#x82E5;&#x4E3A;<span class="hljs-literal">true</span>,&#x5373;&#x4E8B;&#x4EF6;&#x6355;&#x83B7;&#x3002;
</code></pre><p><code>&#x533A;&#x522B;&#xFF1A;</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(1)&#x3001;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;&#xFF1A; &#x4ECE;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x7684;&#x90A3;&#x4E2A;&#x8282;&#x70B9;&#x4E00;&#x76F4;&#x5230;document&#xFF0C;&#x662F;&#x81EA;&#x4E0B;&#x800C;&#x4E0A;&#x7684;&#x53BB;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x3002;
(2)&#x3001;&#x4E8B;&#x4EF6;&#x6355;&#x83B7;&#xFF1A; &#x4ECE;document&#x5230;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x7684;&#x90A3;&#x4E2A;&#x8282;&#x70B9;&#xFF0C;&#x5373;&#x81EA;&#x4E0A;&#x800C;&#x4E0B;&#x7684;&#x53BB;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>(<span class="hljs-number">1</span>)&#x3001;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;&#xFF1A; &#x4ECE;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x7684;&#x90A3;&#x4E2A;&#x8282;&#x70B9;&#x4E00;&#x76F4;&#x5230;<span class="hljs-built_in">document</span>&#xFF0C;&#x662F;&#x81EA;&#x4E0B;&#x800C;&#x4E0A;&#x7684;&#x53BB;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x3002;
(<span class="hljs-number">2</span>)&#x3001;&#x4E8B;&#x4EF6;&#x6355;&#x83B7;&#xFF1A; &#x4ECE;<span class="hljs-built_in">document</span>&#x5230;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x7684;&#x90A3;&#x4E2A;&#x8282;&#x70B9;&#xFF0C;&#x5373;&#x81EA;&#x4E0A;&#x800C;&#x4E0B;&#x7684;&#x53BB;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x3002;
</code></pre><h4>2&#x3001;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;</h4><blockquote>&#xFF08;1&#xFF09;&#x3001;&#x5192;&#x6CE1;&#x4E8B;&#x4EF6;&#x56FE;&#x793A;&#xFF1A;</blockquote><p><span class="img-wrap"><img data-src="/img/bVbdIp0?w=536&amp;h=488" src="https://static.alili.tech/img/bVbdIp0?w=536&amp;h=488" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &lt;div id=&quot;father&quot;&gt;
    &lt;div id=&quot;son&quot;&gt;&#x4E8B;&#x4EF6;&#x6D4B;&#x8BD5;&lt;/div&gt;
 &lt;/div&gt;
 &lt;script src=&quot;jquery.min.js&quot;&gt;&lt;/script&gt;
 &lt;script&gt;
    window.onload = function () {
        //addEventListener&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x9ED8;&#x8BA4;&#x4E3A;false
        document.getElementById(&quot;father&quot;).addEventListener(&quot;click&quot;, function () {
            console.log(&quot;&#x8FD9;&#x662F;&#x7236;&#x4EB2;=&gt;&quot; + this.id)
        });
        //addEventListener&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x9ED8;&#x8BA4;&#x4E3A;false
        document.getElementById(&quot;son&quot;).addEventListener(&quot;click&quot;, function () {
            console.log(&quot;&#x8FD9;&#x662F;&#x513F;&#x5B50;=&gt;&quot; + this.id)
        })
    }
  &lt;/script&gt;
  
 //&#x7ED3;&#x679C;&#xFF1A;
     &#x70B9;&#x51FB;father&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#xFF1A; &#x8FD9;&#x662F;&#x7236;&#x4EB2;=&gt;father
     
     &#x70B9;&#x51FB;son&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#xFF1A;   &#x8FD9;&#x662F;&#x513F;&#x5B50;=&gt;son    &#x8FD9;&#x662F;&#x7236;&#x4EB2;=&gt;father   &#xFF08;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;&#xFF1A;&#x5148;son&#xFF0C;&#x540E;father&#xFF09;
 " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code> <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;father&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;son&quot;</span>&gt;</span>&#x4E8B;&#x4EF6;&#x6D4B;&#x8BD5;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;jquery.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//addEventListener&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x9ED8;&#x8BA4;&#x4E3A;false</span>
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;father&quot;</span>).addEventListener(<span class="hljs-string">&quot;click&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x8FD9;&#x662F;&#x7236;&#x4EB2;=&gt;&quot;</span> + <span class="hljs-keyword">this</span>.id)
        });
        <span class="hljs-comment">//addEventListener&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x9ED8;&#x8BA4;&#x4E3A;false</span>
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;son&quot;</span>).addEventListener(<span class="hljs-string">&quot;click&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x8FD9;&#x662F;&#x513F;&#x5B50;=&gt;&quot;</span> + <span class="hljs-keyword">this</span>.id)
        })
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  
 //&#x7ED3;&#x679C;&#xFF1A;
     &#x70B9;&#x51FB;father&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#xFF1A; &#x8FD9;&#x662F;&#x7236;&#x4EB2;=&gt;father
     
     &#x70B9;&#x51FB;son&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#xFF1A;   &#x8FD9;&#x662F;&#x513F;&#x5B50;=&gt;son    &#x8FD9;&#x662F;&#x7236;&#x4EB2;=&gt;father   &#xFF08;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;&#xFF1A;&#x5148;son&#xFF0C;&#x540E;father&#xFF09;
 </code></pre><blockquote>&#xFF08;2&#xFF09;&#x3001;&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x91C7;&#x7528;&#x7684;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;&#x673A;&#x5236;&#xFF1A;<br>1.&#x5F53;&#x70B9;&#x51FB;son&#x5143;&#x7D20;&#x65F6;&#xFF0C;&#x5148;&#x89E6;&#x53D1;son&#x7684;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#xFF0C;&#x518D;&#x89E6;&#x53D1;father&#x7684;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#xFF0C;&#x6253;&#x5370;&#x76F8;&#x5E94;&#x7684;&#x5185;&#x5BB9;&#xFF1B;<br>2.&#x5F53;&#x70B9;&#x51FB;father&#x5143;&#x7D20;&#x65F6;&#xFF0C;&#x53EA;&#x89E6;&#x53D1;father&#x7684;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#xFF0C;&#x56E0;&#x4E3A;father&#x5143;&#x7D20;&#x5192;&#x6CE1;&#x4E0A;&#x53BB;&#x6CA1;&#x6709;dom&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x4E86;click&#x4E8B;&#x4EF6;&#x7684;&#x51FD;&#x6570;</blockquote><p>&#xFF08;3&#xFF09;&#x3001;&#x963B;&#x6B62;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="e.stopPropagation();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs abnf"><code>e.stopPropagation()<span class="hljs-comment">;</span>
</code></pre><h4>3&#x3001;&#x4E8B;&#x4EF6;&#x6355;&#x83B7;</h4><blockquote>&#x4E8B;&#x4EF6;&#x6355;&#x83B7;&#x56FE;&#x793A;&#xFF1A;</blockquote><p><span class="img-wrap"><img data-src="/img/bVbdIqk?w=564&amp;h=490" src="https://static.alili.tech/img/bVbdIqk?w=564&amp;h=490" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;father&quot;&gt;
    &lt;div id=&quot;son&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;script src=&quot;jquery.min.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
    window.onload = function () {
        //addEventListener&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x9ED8;&#x8BA4;&#x4E3A;true
        document.getElementById(&quot;father&quot;).addEventListener(&quot;click&quot;, function () {
            console.log(&quot;&#x8FD9;&#x662F;&#x7236;&#x4EB2;=&gt;&quot; + this.id)
        },true);
        //addEventListener&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x9ED8;&#x8BA4;&#x4E3A;true
        document.getElementById(&quot;son&quot;).addEventListener(&quot;click&quot;, function () {
            console.log(&quot;&#x8FD9;&#x662F;&#x513F;&#x5B50;=&gt;&quot; + this.id)
        },true)
    }
&lt;/script&gt;   

   //&#x7ED3;&#x679C;&#xFF1A;
    &#x70B9;&#x51FB;father&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#xFF1A;   &#x8FD9;&#x662F;&#x7236;&#x4EB2;=&gt;father
    &#x70B9;&#x51FB;son&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#xFF1A;    &#x8FD9;&#x662F;&#x7236;&#x4EB2;=&gt;father   &#x8FD9;&#x662F;&#x513F;&#x5B50;=&gt;son  (&#x4E8B;&#x4EF6;&#x6355;&#x83B7;&#xFF1A;&#x5148;father,&#x540E;son)
    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;father&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;son&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;jquery.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//addEventListener&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x9ED8;&#x8BA4;&#x4E3A;true</span>
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;father&quot;</span>).addEventListener(<span class="hljs-string">&quot;click&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x8FD9;&#x662F;&#x7236;&#x4EB2;=&gt;&quot;</span> + <span class="hljs-keyword">this</span>.id)
        },<span class="hljs-literal">true</span>);
        <span class="hljs-comment">//addEventListener&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x9ED8;&#x8BA4;&#x4E3A;true</span>
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;son&quot;</span>).addEventListener(<span class="hljs-string">&quot;click&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x8FD9;&#x662F;&#x513F;&#x5B50;=&gt;&quot;</span> + <span class="hljs-keyword">this</span>.id)
        },<span class="hljs-literal">true</span>)
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>   

   //&#x7ED3;&#x679C;&#xFF1A;
    &#x70B9;&#x51FB;father&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#xFF1A;   &#x8FD9;&#x662F;&#x7236;&#x4EB2;=&gt;father
    &#x70B9;&#x51FB;son&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#xFF1A;    &#x8FD9;&#x662F;&#x7236;&#x4EB2;=&gt;father   &#x8FD9;&#x662F;&#x513F;&#x5B50;=&gt;son  (&#x4E8B;&#x4EF6;&#x6355;&#x83B7;&#xFF1A;&#x5148;father,&#x540E;son)
    </code></pre><blockquote>&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x91C7;&#x7528;&#x4E8B;&#x4EF6;&#x6355;&#x6349;&#x673A;&#x5236;&#xFF1A;<br>1.&#x5F53;&#x70B9;&#x51FB;son&#x5143;&#x7D20;&#x65F6;&#xFF0C;&#x5148;&#x89E6;&#x53D1;father&#x7684;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#xFF0C;&#x518D;&#x89E6;&#x53D1;son&#x7684;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#xFF0C;&#x6253;&#x5370;&#x76F8;&#x5E94;&#x7684;&#x5185;&#x5BB9;&#xFF1B;<br>2.&#x5F53;&#x70B9;&#x51FB;father&#x5143;&#x7D20;&#x65F6;&#xFF0C;&#x53EA;&#x89E6;&#x53D1;father&#x7684;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#xFF0C;&#x56E0;&#x4E3A;father&#x5143;&#x7D20;&#x4ECE;&#x4E0A;&#x9762;&#x6355;&#x6349;&#x4E0B;&#x6765;&#x4E00;&#x76F4;&#x5230;father&#x5143;&#x7D20;&#x6CA1;&#x6709;dom&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x4E86;click&#x4E8B;&#x4EF6;&#x7684;&#x51FD;&#x6570;&#xFF1B;</blockquote><h4>4&#x3001;&#x4E8B;&#x4EF6;&#x59D4;&#x6258;</h4><p><strong>&#xFF08;1&#xFF09;&#x3001;</strong>&#x5B9A;&#x4E49;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   &#x4E8B;&#x4EF6;&#x59D4;&#x6258;&#xFF1A;&#x5229;&#x7528;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;&#x7684;&#x539F;&#x7406;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs"><code style="word-break:break-word;white-space:initial">   &#x4E8B;&#x4EF6;&#x59D4;&#x6258;&#xFF1A;&#x5229;&#x7528;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;&#x7684;&#x539F;&#x7406;&#x3002;</code></pre><p><strong>&#xFF08;2)&#x3001;</strong>&#x4F7F;&#x7528;&#x60C5;&#x51B5;&#xFF1A; &#x5F53;&#x6709;&#x591A;&#x4E2A;&#x7C7B;&#x4F3C;&#x5143;&#x7D20;&#x9700;&#x8981;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x65F6;&#xFF0C;&#x4E00;&#x4E2A;&#x4E00;&#x4E2A;&#x53BB;&#x7ED1;&#x5B9A;&#x65E2;&#x6D6A;&#x8D39;&#x65F6;&#x95F4;&#xFF0C;&#x53C8;&#x4E0D;&#x5229;&#x4E8E;&#x6027;&#x80FD;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E8B;&#x4EF6;&#x59D4;&#x6258;&#xFF0C;&#x7ED9;&#x4ED6;&#x4EEC;&#x7684;&#x4E00;&#x4E2A;&#x5171;&#x540C;&#x7236;&#x7EA7;&#x5143;&#x7D20;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x4E8B;&#x4EF6;&#x51FD;&#x6570;&#x53BB;&#x5904;&#x7406;&#x4ED6;<br>&#x4EEC;&#x6240;&#x6709;&#x7684;&#x4E8B;&#x4EF6;&#x60C5;&#x51B5;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;ul id=&quot;newslist&quot;&gt;
    &lt;li&gt;1234567890987654&lt;/li&gt;
    &lt;li&gt;1234567890987654&lt;/li&gt;
    &lt;li&gt;1234567890987654&lt;/li&gt;
    &lt;li&gt;1234567890987654&lt;/li&gt;
    &lt;li&gt;1234567890987654&lt;/li&gt;
    &lt;li&gt;1234567890987654&lt;/li&gt;
&lt;/ul&gt;
&lt;script src=&quot;jquery.min.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
    $(document).ready(function () {
        $(&quot;#newslist&quot;).on(&quot;click&quot;, function (e) {
            $(e.target).css({ &quot;background&quot;: &quot;#f00&quot; }).siblings().css({ &quot;background&quot;: &quot;#fff&quot; });
        })
     })
&lt;/script&gt;     
    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;newslist&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>1234567890987654<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>1234567890987654<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>1234567890987654<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>1234567890987654<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>1234567890987654<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>1234567890987654<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;jquery.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-string">&quot;#newslist&quot;</span>).on(<span class="hljs-string">&quot;click&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
            $(e.target).css({ <span class="hljs-string">&quot;background&quot;</span>: <span class="hljs-string">&quot;#f00&quot;</span> }).siblings().css({ <span class="hljs-string">&quot;background&quot;</span>: <span class="hljs-string">&quot;#fff&quot;</span> });
        })
     })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>     
    </code></pre><blockquote>&#x6CE8;&#x610F;&#xFF1A;hover&#x4E8B;&#x4EF6;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;&#x4E8B;&#x4EF6;&#x59D4;&#x6258;&#x65B9;&#x5F0F;&#x3002;</blockquote><p><strong>&#xFF08;3&#xFF09;&#x3001;</strong>&#x867D;&#x7136;&#x4E0A;&#x8FF0;&#x4F8B;&#x5B50;&#x4E2D;&#x6CA1;&#x6709;&#x7ED9;li&#x6DFB;&#x52A0;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x70B9;&#x51FB;&#x76F8;&#x5E94;&#x7684;li&#x4F1A;&#x4EA7;&#x751F;&#x6548;&#x679C;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#xFF1A;&#x867D;&#x7136;&#x6211;&#x4EEC;&#x6CA1;&#x6709;&#x7ED9;li&#x8BBE;&#x7F6E;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#xFF0C;&#x4F46;&#x662F;&#x9ED8;&#x8BA4;&#x7684;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#x662F;&#x91C7;&#x7528;&#x7684;&#x65F6;&#x95F4;&#x5192;&#x6CE1;&#xFF0C;&#x5192;&#x6CE1;&#x5230;&#x7236;<br>&#x7EA7;&#x5143;&#x7D20;&#x7684;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#x662F;&#x7528;&#x4E8B;&#x4EF6;&#x7684;target&#x5C5E;&#x6027;&#x5224;&#x65AD;&#x8FDB;&#x884C;&#x70B9;&#x51FB;&#x7684;&#x5143;&#x7D20;</p><ul><li>e.target &#x8868;&#x793A;&#x5728;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;&#x4E2D;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x7684;&#x6E90;&#x5143;&#x7D20;&#x3002;</li><li><p>&#x5E76;&#x4E14;e.target&#x6709;&#x5F88;&#x591A;&#x5C5E;&#x6027;&#x53EF;&#x64CD;&#x4F5C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- e.target.nodeName  //&#x83B7;&#x53D6;&#x4E8B;&#x4EF6;&#x89E6;&#x53D1;&#x5143;&#x7D20;&#x6807;&#x7B7E;&#x7684;name
- e.target.id  //&#x83B7;&#x53D6;&#x4E8B;&#x4EF6;&#x89E6;&#x53D1;&#x5143;&#x7D20;&#x7684;id
- e.target.className  //&#x83B7;&#x53D6;&#x4E8B;&#x4EF6;&#x89E6;&#x53D1;&#x5143;&#x7D20;&#x7684;className
- e.target.innerHTML  //&#x83B7;&#x53D6;&#x4E8B;&#x4EF6;&#x89E6;&#x53D1;&#x5143;&#x7D20;&#x7684;&#x5185;&#x5BB9;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>- e<span class="hljs-selector-class">.target</span><span class="hljs-selector-class">.nodeName</span>  <span class="hljs-comment">//&#x83B7;&#x53D6;&#x4E8B;&#x4EF6;&#x89E6;&#x53D1;&#x5143;&#x7D20;&#x6807;&#x7B7E;&#x7684;name</span>
- e<span class="hljs-selector-class">.target</span><span class="hljs-selector-class">.id</span>  <span class="hljs-comment">//&#x83B7;&#x53D6;&#x4E8B;&#x4EF6;&#x89E6;&#x53D1;&#x5143;&#x7D20;&#x7684;id</span>
- e<span class="hljs-selector-class">.target</span><span class="hljs-selector-class">.className</span>  <span class="hljs-comment">//&#x83B7;&#x53D6;&#x4E8B;&#x4EF6;&#x89E6;&#x53D1;&#x5143;&#x7D20;&#x7684;className</span>
- e<span class="hljs-selector-class">.target</span><span class="hljs-selector-class">.innerHTML</span>  <span class="hljs-comment">//&#x83B7;&#x53D6;&#x4E8B;&#x4EF6;&#x89E6;&#x53D1;&#x5143;&#x7D20;&#x7684;&#x5185;&#x5BB9;</span>
</code></pre></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js事件冒泡和事件捕获

## 原文链接
[https://segmentfault.com/a/1190000015603334](https://segmentfault.com/a/1190000015603334)

