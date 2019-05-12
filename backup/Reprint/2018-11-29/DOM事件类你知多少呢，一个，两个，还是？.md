---
title: 'DOM事件类你知多少呢，一个，两个，还是？' 
date: 2018-11-29 2:30:09
hidden: true
slug: ncufb1oyo3
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">DOM &#x4E8B;&#x4EF6;&#x7C7B;</h2><ol><li>&#x57FA;&#x672C;&#x6982;&#x5FF5;&#xFF1A; DOM &#x4E8B;&#x4EF6;&#x7684;&#x7EA7;&#x522B;</li><li>DOM &#x4E8B;&#x4EF6;&#x6A21;&#x578B;</li><li>DOM &#x4E8B;&#x4EF6;&#x6D41;</li><li>&#x63CF;&#x8FF0; DOM &#x4E8B;&#x4EF6;&#x6355;&#x83B7;&#x7684;&#x5177;&#x4F53;&#x6D41;&#x7A0B;</li><li>Event &#x5BF9;&#x8C61;&#x7684;&#x5E38;&#x89C1;&#x5E94;&#x7528;</li><li>&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;</li></ol><h4>1. DOM &#x4E8B;&#x4EF6;&#x7684;&#x7EA7;&#x522B;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DOM0  element.onclick = function(){}

DOM2  element.addEventListener(&apos;click&apos;,function(){},false)

DOM3  element.addEventListener(&apos;keyup&apos;,function(){},false)

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>DOM0  element.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}

DOM2  element.addEventListener(<span class="hljs-string">&apos;click&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{},<span class="hljs-literal">false</span>)

DOM3  element.addEventListener(<span class="hljs-string">&apos;keyup&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{},<span class="hljs-literal">false</span>)

</code></pre><h4>2. DOM &#x4E8B;&#x4EF6;&#x6A21;&#x578B;</h4><p><span class="img-wrap"><img data-src="/img/bVbb5Nm?w=436&amp;h=249" src="https://static.alili.tech/img/bVbb5Nm?w=436&amp;h=249" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h4>3. DOM &#x4E8B;&#x4EF6;&#x6D41;</h4><p>&#x6355;&#x83B7; --&gt; &#x76EE;&#x6807;&#x9636;&#x6BB5; --&gt; &#x5192;&#x6CE1;</p><p><span class="img-wrap"><img data-src="/img/bVbb5Nz?w=458&amp;h=246" src="https://static.alili.tech/img/bVbb5Nz?w=458&amp;h=246" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h4>4. &#x63CF;&#x8FF0; DOM &#x4E8B;&#x4EF6;&#x6355;&#x83B7;&#x7684;&#x5177;&#x4F53;&#x6D41;&#x7A0B;</h4><p><span class="img-wrap"><img data-src="/img/bVbb5N0?w=480&amp;h=229" src="https://static.alili.tech/img/bVbb5N0?w=480&amp;h=229" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h4>5. Event &#x5BF9;&#x8C61;&#x7684;&#x5E38;&#x89C1;&#x5E94;&#x7528;</h4><ul><li>event.preventDefault():&#x963B;&#x6B62;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x9ED8;&#x8BA4;&#x884C;&#x4E3A;</li><li>event.stopPropagation(): &#x963B;&#x6B62;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x5192;&#x6CE1;</li><li>event.stopImmediatePropagation(): &#x6267;&#x884C;&#x5B8C;&#x5F53;&#x524D;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x7A0B;&#x5E8F;&#x4E4B;&#x540E;&#xFF0C;&#x505C;&#x6B62;&#x5F53;&#x524D;&#x8282;&#x70B9;&#x4EE5;&#x53CA;&#x6240;&#x6709;&#x540E;&#x7EED;&#x8282;&#x70B9;&#x7684;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x7A0B;&#x5E8F;&#x7684;&#x8FD0;&#x884C;&#x3002;</li></ul><blockquote>ps:&#x4ECE;&#x6982;&#x5FF5;&#x4E0A;&#x8BB2;&#xFF0C;&#x5728;&#x8C03;&#x7528;&#x5B8C;stopPropagation&#x51FD;&#x6570;&#x4E4B;&#x540E;&#xFF0C;&#x5C31;&#x4F1A;&#x7ACB;&#x5373;&#x505C;&#x6B62;&#x5BF9;&#x540E;&#x7EED;&#x8282;&#x70B9;&#x7684;&#x8BBF;&#x95EE;&#xFF0C;&#x4F46;&#x662F;&#x4F1A;&#x6267;&#x884C;&#x5B8C;&#x7ED1;&#x5B9A;&#x5230;&#x5F53;&#x524D;&#x8282;&#x70B9;&#x4E0A;&#x7684;&#x6240;&#x6709;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x7A0B;&#x5E8F;&#xFF1B;&#x800C;&#x8C03;&#x7528;stopImmediatePropagation&#x51FD;&#x6570;&#x4E4B;&#x540E;&#xFF0C;&#x9664;&#x4E86;&#x6240;&#x6709;&#x540E;&#x7EED;&#x8282;&#x70B9;&#xFF0C;&#x7ED1;&#x5B9A;&#x5230;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x4E0A;&#x7684;&#x3001;&#x5F53;&#x524D;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x7A0B;&#x5E8F;&#x4E4B;&#x540E;&#x7684;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x7A0B;&#x5E8F;&#x5C31;&#x4E0D;&#x4F1A;&#x518D;&#x6267;&#x884C;&#x4E86;</blockquote><ul><li>event.target: &#x8FD4;&#x56DE;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x7684;&#x5143;&#x7D20;</li><li>event.currentTarget: &#x8FD4;&#x56DE;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;&#x5143;&#x7D20;</li></ul><h4>6. &#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var eve = new Event(&apos;myEvent&apos;);
ev.addEventListener(&apos;myEvent&apos;,function() {
  console.log(&apos;&#x5C0F;&#x667A;&#x52A0;&#x6CB9;&apos;)
})
// &#x89E6;&#x53D1;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;
ev.dispatcEvent(eve);

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> eve = <span class="hljs-keyword">new</span> Event(<span class="hljs-string">&apos;myEvent&apos;</span>);
ev.addEventListener(<span class="hljs-string">&apos;myEvent&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x5C0F;&#x667A;&#x52A0;&#x6CB9;&apos;</span>)
})
<span class="hljs-comment">// &#x89E6;&#x53D1;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;</span>
ev.dispatcEvent(eve);

</code></pre><h2 id="articleHeader1">&#x4E8B;&#x4EF6;&#x6355;&#x83B7;&#x9636;&#x6BB5;&#x6F14;&#x793A;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &lt;style&gt;
    html,*{
      padding: 0;margin: 0;
    }
    #ev{
      width: 300px;height: 100px;
      background: red;color: #fff;
      text-align: center;line-height: 100px;
    }
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div id=&quot;ev&quot;&gt;
    &#x76EE;&#x6807;&#x5143;&#x7D20;
  &lt;/div&gt;
  &lt;script&gt;
    var ev = document.getElementById(&apos;ev&apos;);

    window.addEventListener(&apos;click&apos;,function(){
      console.log(&apos;window captrue&apos;);
    },true);

    document.addEventListener(&apos;click&apos;,function(){
      console.log(&apos;document captrue&apos;);
    },true)

    document.documentElement.addEventListener(&apos;click&apos;,function(){
      console.log(&apos;html captrue&apos;);
    },true);

    document.body.addEventListener(&apos;click&apos;,function(){
      console.log(&apos;body captrue&apos;);
    },true);

    ev.addEventListener(&apos;click&apos;,function(){
      console.log(&apos;ev captrue&apos;);
    },true);

  &lt;/script&gt;
  " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">html</span>,*{
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;<span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-id">#ev</span>{
      <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
      <span class="hljs-attribute">background</span>: red;<span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
      <span class="hljs-attribute">text-align</span>: center;<span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;ev&quot;</span>&gt;</span>
    &#x76EE;&#x6807;&#x5143;&#x7D20;
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> ev = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;ev&apos;</span>);

    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">&apos;click&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;window captrue&apos;</span>);
    },<span class="hljs-literal">true</span>);

    <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">&apos;click&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;document captrue&apos;</span>);
    },<span class="hljs-literal">true</span>)

    <span class="hljs-built_in">document</span>.documentElement.addEventListener(<span class="hljs-string">&apos;click&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;html captrue&apos;</span>);
    },<span class="hljs-literal">true</span>);

    <span class="hljs-built_in">document</span>.body.addEventListener(<span class="hljs-string">&apos;click&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;body captrue&apos;</span>);
    },<span class="hljs-literal">true</span>);

    ev.addEventListener(<span class="hljs-string">&apos;click&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;ev captrue&apos;</span>);
    },<span class="hljs-literal">true</span>);

  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  </code></pre><p>&#x6253;&#x5370;&#x7ED3;&#x679C; &#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbb5Rm?w=610&amp;h=362" src="https://static.alili.tech/img/bVbb5Rm?w=610&amp;h=362" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader2">&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x6F14;&#x793A;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &lt;style&gt;
    html,*{
      padding: 0;margin: 0;
    }
    #ev{
      width: 300px;height: 100px;
      background: red;color: #fff;
      text-align: center;line-height: 100px;
    }
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div id=&quot;ev&quot;&gt;
    &#x76EE;&#x6807;&#x5143;&#x7D20;
  &lt;/div&gt;
  &lt;script&gt;
    var ev = document.getElementById(&apos;ev&apos;);
    var eve = new Event(&apos;myEvent&apos;);
    ev.addEventListener(&apos;myEvent&apos;, function(){
      console.log(&apos;myEvent dispatch&apos;);
    })

    ev.dispatchEvent(eve)

  &lt;/script&gt;
&lt;/body&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">html</span>,*{
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;<span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-id">#ev</span>{
      <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
      <span class="hljs-attribute">background</span>: red;<span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
      <span class="hljs-attribute">text-align</span>: center;<span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;ev&quot;</span>&gt;</span>
    &#x76EE;&#x6807;&#x5143;&#x7D20;
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> ev = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;ev&apos;</span>);
    <span class="hljs-keyword">var</span> eve = <span class="hljs-keyword">new</span> Event(<span class="hljs-string">&apos;myEvent&apos;</span>);
    ev.addEventListener(<span class="hljs-string">&apos;myEvent&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;myEvent dispatch&apos;</span>);
    })

    ev.dispatchEvent(eve)

  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
</code></pre><p>&#x6253;&#x5370;&#x7ED3;&#x679C;:</p><p><span class="img-wrap"><img data-src="/img/bVbb5RL?w=499&amp;h=300" src="https://static.alili.tech/img/bVbb5RL?w=499&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><blockquote>&#x613F;&#x4F60;&#x6210;&#x4E3A;&#x7EC8;&#x8EAB;&#x5B66;&#x4E60;&#x8005;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
DOM事件类你知多少呢，一个，两个，还是？

## 原文链接
[https://segmentfault.com/a/1190000015236479](https://segmentfault.com/a/1190000015236479)

