---
title: 'jQuery动画效果、jQuery插件使用' 
date: 2018-11-18 3:32:07
hidden: true
slug: vk9yw00bwcq
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x4E00;&#x3001;&#x4E8B;&#x4EF6;&#x7684;&#x7ED1;&#x5B9A;&#x4E0E;&#x89E3;&#x7ED1;</h1><h2 id="articleHeader1">1.1 jQuery&#x7684;&#x7B80;&#x5355;&#x7ED1;&#x5B9A;</h2><h3 id="articleHeader2">1.1.1 on(events,fn)&#x4E8B;&#x4EF6;(&#x65B0;&#x7248;&#x672C;&#x4F7F;&#x7528;)</h3><blockquote>&#x4E3A;&#x6307;&#x5B9A;&#x7684;&#x5143;&#x7D20;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x7A0B;&#x5E8F;&#xFF0C;&#x5E76;&#x89C4;&#x5B9A;&#x5F53;&#x8FD9;&#x4E2A;&#x4E8B;&#x4EF6;&#x53D1;&#x751F;&#x65F6;&#x8FD0;&#x884C;&#x7684;&#x51FD;&#x6570;&#x3002;on()&#x65B9;&#x6CD5;&#x9002;&#x7528;&#x4E8E;&#x5F53;&#x524D;&#x6216;&#x672A;&#x6765;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x5982;&#x7528;&#x811A;&#x672C;&#x521B;&#x5EFA;&#x7684;&#x65B0;&#x5143;&#x7D20;&#x3002;</blockquote><p>&#x53C2;&#x6570;&#x8BF4;&#x660E;&#xFF1A;</p><ul><li>events &#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x7528;&#x7A7A;&#x683C;&#x5206;&#x9694;&#x7684;&#x4E8B;&#x4EF6;&#x7C7B;&#x578B;</li><li>fn &#x8BE5;&#x4E8B;&#x4EF6;&#x88AB;&#x89E6;&#x53D1;&#x65F6;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;</li><li>eg&#xFF1A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;div id=&quot;box&quot;&gt;hello  world!&lt;/div&gt;
    &lt;script src=&quot;js/jquery.js&quot;&gt;&lt;/script&gt;
    &lt;script&gt;
    $(&quot;#box&quot;).on(&quot;click&quot;,functiong(){
        // js &#x539F;&#x751F;
      alert(this.innerText);
      // jQuery  
      alert($(this).text());
    });
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;div id=<span class="hljs-string">&quot;box&quot;</span>&gt;hello  world!<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;script src=<span class="hljs-string">&quot;js/jquery.js&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
    &lt;script&gt;
    $(<span class="hljs-string">&quot;#box&quot;</span>).on(<span class="hljs-string">&quot;click&quot;</span>,functiong(){
        <span class="hljs-comment">// js &#x539F;&#x751F;</span>
      alert(<span class="hljs-keyword">this</span>.innerText);
      <span class="hljs-comment">// jQuery  </span>
      alert($(<span class="hljs-keyword">this</span>).text());
    });
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p>jQuery &#x7684;&#x5176;&#x4ED6;&#x4E8B;&#x4EF6;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbeNq8?w=731&amp;h=479" src="https://static.alili.tech/img/bVbeNq8?w=731&amp;h=479" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h3 id="articleHeader3">1.1.2 on (events,{data},fn)&#x4E8B;&#x4EF6;</h3><p>&#x53C2;&#x6570;&#x8BF4;&#x660E;&#xFF1A;</p><ul><li>events: &#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x7528;&#x7A7A;&#x683C;&#x5206;&#x9694;&#x7684;&#x4E8B;&#x4EF6;&#x7C7B;&#x578B;</li><li>data: &#x9700;&#x8981;&#x4F20;&#x9012;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x4F5C;&#x4E3A;event.data&#x7684;&#x5C5E;&#x6027;&#x503C;</li><li>fn: &#x8BE5;&#x4E8B;&#x4EF6;&#x88AB;&#x89E6;&#x53D1;&#x65F6;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#x3002;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &lt;div id=&quot;box&quot; style=&quot;width:100px;height:100px;border:1px solid red&quot;&gt;&lt;/div&gt;
  &lt;script src=&quot;js/jquery.js&quot;&gt;&lt;/script&gt;
  &lt;script&gt;
    $(&quot;#box&quot;).on(&quot;mouseover&quot;,{
      &quot;fruit&quot;:&quot;banana&quot;,
      &quot;play&quot;:&quot;run&quot;
    },function(event){
      $(this).text(event.data.fruit);
    });
    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"> &lt;div id=<span class="hljs-string">&quot;box&quot;</span> style=<span class="hljs-string">&quot;width:100px;height:100px;border:1px solid red&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  &lt;script src=<span class="hljs-string">&quot;js/jquery.js&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
  &lt;script&gt;
    $(<span class="hljs-string">&quot;#box&quot;</span>).on(<span class="hljs-string">&quot;mouseover&quot;</span>,{
      <span class="hljs-string">&quot;fruit&quot;</span>:<span class="hljs-string">&quot;banana&quot;</span>,
      <span class="hljs-string">&quot;play&quot;</span>:<span class="hljs-string">&quot;run&quot;</span>
    },<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
      $(<span class="hljs-keyword">this</span>).text(event.data.fruit);
    });
    </code></pre><h3 id="articleHeader4">1.1.3 bind(events ,fn)&#x4E8B;&#x4EF6;</h3><blockquote>&#x4E3A;&#x6307;&#x5B9A;&#x7684;&#x5143;&#x7D20;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x7A0B;&#x5E8F;&#xFF0C;&#x5E76;&#x89C4;&#x5B9A;&#x5F53;&#x8FD9;&#x4E2A;&#x4E8B;&#x4EF6;&#x53D1;&#x751F;&#x65F6;&#x8FD0;&#x884C;&#x7684;&#x51FD;&#x6570;&#x3002;bind()&#x65B9;&#x6CD5;&#x9002;&#x7528;&#x4E8E;&#x5F53;&#x524D;&#x6216;&#x672A;&#x6765;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x5982;&#x7528;&#x811A;&#x672C;&#x521B;&#x5EFA;&#x7684;&#x65B0;&#x5143;&#x7D20;</blockquote><p>&#x53C2;&#x6570;&#x8BF4;&#x660E;&#xFF1A;</p><ul><li>events: &#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x7528;&#x7A7A;&#x683C;&#x5206;&#x9694;&#x7684;&#x4E8B;&#x4EF6;&#x7C7B;&#x578B;</li><li>fn: &#x8BE5;&#x4E8B;&#x4EF6;&#x88AB;&#x89E6;&#x53D1;&#x65F6;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#x3002;</li></ul><p>eg&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;div&gt;&#x4ECE;&#x524D;&#x4ECE;&#x524D;&lt;/div&gt;
&lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
&lt;script&gt;
  $(&quot;div&quot;).bind(&quot;mousemove&quot;,function(){
    console.log($(this).text());
  });
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;div&gt;&#x4ECE;&#x524D;&#x4ECE;&#x524D;&lt;<span class="hljs-regexp">/div&gt;
&lt;script src=&apos;js/</span>jquery.js<span class="hljs-string">&apos;&gt;&lt;/script&gt;
&lt;script&gt;
  $(&quot;div&quot;).bind(&quot;mousemove&quot;,function(){
    console.log($(this).text());
  });
&lt;/script&gt;</span></code></pre><h3 id="articleHeader5">1.1.4 bind(events,{data},fn)&#x4E8B;&#x4EF6;</h3><p>&#x9488;&#x5BF9;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x7684;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x4E8B;&#x4EF6;&#x7684;&#x8BBE;&#x7F6E;</p><ul><li>events: &#x6307;&#x5B9A;&#x7ED1;&#x5B9A;&#x7684;&#x4E8B;&#x4EF6;&#x540D;&#x79F0;&#xFF0C;&#x591A;&#x4E2A;&#x53C2;&#x6570;&#x7528;&#x7A7A;&#x683C;&#x9694;&#x5F00;</li><li>data: &#x4F5C;&#x4E3A;event.data&#x5C5E;&#x6027;&#x503C;&#x4F20;&#x9012;&#x7ED9;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;&#x7684;&#x989D;&#x5916;&#x6570;&#x636E;&#x5BF9;&#x8C61;</li><li>fn: &#x56DE;&#x8C03;&#x51FD;&#x6570;(&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;)</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;button&gt;&#x70B9;&#x51FB;&lt;/button&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    $(&quot;button&quot;).bind(&quot;click&quot;,{
      &quot;info&quot;:&quot;&#x56E0;&#x4E3A;&#x7231;&#x6240;&#x4EE5;&#x7231;&quot;
    },function(event){
      alert(event.data.info);
    });
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;button&gt;&#x70B9;&#x51FB;&lt;<span class="hljs-regexp">/button&gt;
  &lt;script src=&apos;js/</span>jquery.js<span class="hljs-string">&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    $(&quot;button&quot;).bind(&quot;click&quot;,{
      &quot;info&quot;:&quot;&#x56E0;&#x4E3A;&#x7231;&#x6240;&#x4EE5;&#x7231;&quot;
    },function(event){
      alert(event.data.info);
    });
  &lt;/script&gt;</span></code></pre><p>bind &#x652F;&#x6301;&#x7684;&#x4E8B;&#x4EF6;&#x540D;&#x79F0;</p><p>blur, focus, focusin, focusout, load, resize, scroll, unload, click, dblclick, mousedown, mouseup, mousemove, mouseover, mouseout, mouseenter, mouseleave, change, select, submit, keydown, keypress, keyup, error</p><h2 id="articleHeader6">1.2 jQuery&#x591A;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;</h2><p>&#x4F7F;&#x7528;mouseover&#x3001;mouseout&#x4F5C;&#x4E3A;&#x6848;&#x4F8B;;&#xFF08;mouseenter mouseleave&#xFF09;</p><h3 id="articleHeader7">1.2.1 &#x76F4;&#x63A5;&#x4E8B;&#x4EF6;&#x7684;&#x7ED1;&#x5B9A;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;button&gt;&#x79FB;&#x52A8;/&#x79BB;&#x5F00;&lt;/button&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
  // &#x94FE;&#x5F0F;&#x7F16;&#x7A0B;
    $(&quot;button&quot;).mousemove(function(){
      console.log(&quot;&#x6211;&#x6765;&#x4E86;&#xFF01;&quot;);
    }).mouseout(function(){
      console.log(&quot;&#x6211;&#x79BB;&#x5F00;&#x4E86;&#xFF01;&quot;);
    });
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;button&gt;&#x79FB;&#x52A8;/&#x79BB;&#x5F00;&lt;<span class="hljs-regexp">/button&gt;
  &lt;script src=&apos;js/</span>jquery.js<span class="hljs-string">&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
  // &#x94FE;&#x5F0F;&#x7F16;&#x7A0B;
    $(&quot;button&quot;).mousemove(function(){
      console.log(&quot;&#x6211;&#x6765;&#x4E86;&#xFF01;&quot;);
    }).mouseout(function(){
      console.log(&quot;&#x6211;&#x79BB;&#x5F00;&#x4E86;&#xFF01;&quot;);
    });
  &lt;/script&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeNra?w=726&amp;h=281" src="https://static.alili.tech/img/bVbeNra?w=726&amp;h=281" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h3 id="articleHeader8">1.2.2 on &#x591A;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     &lt;button&gt;&#x79FB;&#x52A8;/&#x70B9;&#x51FB;&lt;/button&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    $(&quot;button&quot;).on(&quot;mouseover click&quot;,function(){
      console.log(&quot;123&quot;);
    });
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">     &lt;button&gt;&#x79FB;&#x52A8;/&#x70B9;&#x51FB;&lt;<span class="hljs-regexp">/button&gt;
  &lt;script src=&apos;js/</span>jquery.js<span class="hljs-string">&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    $(&quot;button&quot;).on(&quot;mouseover click&quot;,function(){
      console.log(&quot;123&quot;);
    });
  &lt;/script&gt;</span></code></pre><h3 id="articleHeader9">1.2.3 on &#x7ED9;&#x4E0D;&#x540C;&#x7684;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;&#x4E0D;&#x540C;&#x7684;&#x51FD;&#x6570;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;button&gt;&#x653E;&#x4E0A;/&#x70B9;&#x51FB;/&#x79BB;&#x5F00;&lt;/button&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    $(&quot;button&quot;).on({
      mouseover:function(){
        console.log(&quot;I&quot;);
      },
      click:function(){
        console.log(&quot;LOVE&quot;);
      },
      mouseout:function(){
        console.log(&quot;YOU&quot;);
      }
    });
  &lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;button&gt;&#x653E;&#x4E0A;/&#x70B9;&#x51FB;/&#x79BB;&#x5F00;&lt;<span class="hljs-regexp">/button&gt;
  &lt;script src=&apos;js/</span>jquery.js<span class="hljs-string">&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    $(&quot;button&quot;).on({
      mouseover:function(){
        console.log(&quot;I&quot;);
      },
      click:function(){
        console.log(&quot;LOVE&quot;);
      },
      mouseout:function(){
        console.log(&quot;YOU&quot;);
      }
    });
  &lt;/script&gt;
</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeNrb?w=726&amp;h=323" src="https://static.alili.tech/img/bVbeNrb?w=726&amp;h=323" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader10">1.3 jQuery&#x4E8B;&#x4EF6;&#x89E3;&#x7ED1;</h2><p><strong>Off(events, selector, fn)</strong></p><ul><li>events: &#x60F3;&#x8981;&#x79FB;&#x9664;&#x7684;&#x4E8B;&#x4EF6;&#x540D;&#x79F0;</li><li>selector: &#x79FB;&#x9664;&#x90A3;&#x4E00;&#x4E2A;DOM&#x8282;&#x70B9;&#x7684;&#x4E8B;&#x4EF6;(&#x5FC5;&#x987B;&#x548C;&#x4F20;&#x5165;&#x7684;DOM&#x8282;&#x70B9;&#x4E00;&#x81F4;)</li><li>fn: &#x60F3;&#x8981;&#x79FB;&#x9664;&#x7684;&#x7ED1;&#x5B9A;&#x51FD;&#x6570;</li></ul><p><strong>&#x4E8B;&#x4EF6;&#x89E3;&#x7ED1;&#x5206;&#x4E3A;&#x4EE5;&#x4E0B;&#x51E0;&#x79CD;&#x60C5;&#x51B5;&#xFF1A;</strong></p><ul><li>$(selector).unbind(); &#x79FB;&#x9664;&#x6240;&#x6709;&#x7684;&#x4E8B;&#x4EF6;&#xFF0C;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;button&gt;&#x653E;&#x4E0A;/&#x70B9;&#x51FB;/&#x79BB;&#x5F00;&lt;/button&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    $(&quot;button&quot;).on({
      mouseover:function(){
        console.log(&quot;I&quot;);
      },
      click:function(){
        console.log(&quot;LOVE&quot;);
      },
      mouseout:function(){
        console.log(&quot;YOU&quot;);
      }
    });
    // &#x79FB;&#x9664;button&#x5143;&#x7D20;&#x7684;&#x6240;&#x6709;&#x4E8B;&#x4EF6;&#x5305;&#x62EC;&#x4E8B;&#x4EF6;&#x51FD;&#x6570;
    $(&quot;button&quot;).unbind();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;button&gt;&#x653E;&#x4E0A;/&#x70B9;&#x51FB;/&#x79BB;&#x5F00;&lt;<span class="hljs-regexp">/button&gt;
  &lt;script src=&apos;js/</span>jquery.js<span class="hljs-string">&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    $(&quot;button&quot;).on({
      mouseover:function(){
        console.log(&quot;I&quot;);
      },
      click:function(){
        console.log(&quot;LOVE&quot;);
      },
      mouseout:function(){
        console.log(&quot;YOU&quot;);
      }
    });
    // &#x79FB;&#x9664;button&#x5143;&#x7D20;&#x7684;&#x6240;&#x6709;&#x4E8B;&#x4EF6;&#x5305;&#x62EC;&#x4E8B;&#x4EF6;&#x51FD;&#x6570;
    $(&quot;button&quot;).unbind();</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeNrh?w=726&amp;h=299" src="https://static.alili.tech/img/bVbeNrh?w=726&amp;h=299" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><ul><li>$(selector).unbind(&quot;mouseover mouseout&quot;);//&#x79FB;&#x9664;&#x6307;&#x5B9A;&#x7684;&#x4E8B;&#x4EF6;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;button&gt;&#x653E;&#x4E0A;/&#x70B9;&#x51FB;/&#x79BB;&#x5F00;&lt;/button&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    $(&quot;button&quot;).on({
      mouseover:function(){
        console.log(&quot;I&quot;);
      },
      click:function(){
        console.log(&quot;LOVE&quot;);
      },
      mouseout:function(){
        console.log(&quot;YOU&quot;);
      }
    });
    // &#x79FB;&#x9664;button&#x5143;&#x7D20;&#x7684;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;
    $(&quot;button&quot;).unbind(&quot;click&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;button&gt;&#x653E;&#x4E0A;/&#x70B9;&#x51FB;/&#x79BB;&#x5F00;&lt;<span class="hljs-regexp">/button&gt;
  &lt;script src=&apos;js/</span>jquery.js<span class="hljs-string">&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    $(&quot;button&quot;).on({
      mouseover:function(){
        console.log(&quot;I&quot;);
      },
      click:function(){
        console.log(&quot;LOVE&quot;);
      },
      mouseout:function(){
        console.log(&quot;YOU&quot;);
      }
    });
    // &#x79FB;&#x9664;button&#x5143;&#x7D20;&#x7684;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;
    $(&quot;button&quot;).unbind(&quot;click&quot;);</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeNrj?w=726&amp;h=299" src="https://static.alili.tech/img/bVbeNrj?w=726&amp;h=299" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><ul><li>$(selector).off(); // &#x79FB;&#x9664;&#x6240;&#x6709; &#x8FD9;&#x4E2A;&#x548C;&#x4E0A;&#x9762;&#x7684;bind&#x4E00;&#x6837;&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x5728;&#x4E3E;&#x4F8B;&#x5B50;&#x4E86;</li><li>$(selector).off(&apos;click&apos;); // &#x79FB;&#x9664;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#xFF08;&#x800C;&#x4E0D;&#x4F1A;&#x79FB;&#x9664;&#x5176;&#x4ED6;&#x7684;&#x4E8B;&#x4EF6;&#xFF09;,&#x8FD9;&#x91CC;&#x4E5F;&#x4E0D;&#x4E3E;&#x4F8B;&#x5B50;&#x4E86;</li><li>$(&#x201C;body&#x201D;).off(events,selector&#xFF0C;fn); // &#x79FB;&#x9664;&#x4E8B;&#x4EF6;&#xFF0C;&#x540C;&#x65F6;&#x4F1A;&#x79FB;&#x9664;&#x51FD;&#x6570;</li></ul><p>eg:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      function change(){
      console.log(&quot;I LOVE YOU&quot;)
    }
    $(&quot;body&quot;).on(&quot;mouseover click mouseout&quot;,&quot;button&quot;,change);
    $(&quot;body&quot;).off(&quot;mouseover&quot;,&quot;button&quot;,change);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">change</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;I LOVE YOU&quot;</span>)
    }
    $(<span class="hljs-string">&quot;body&quot;</span>).on(<span class="hljs-string">&quot;mouseover click mouseout&quot;</span>,<span class="hljs-string">&quot;button&quot;</span>,change);
    $(<span class="hljs-string">&quot;body&quot;</span>).off(<span class="hljs-string">&quot;mouseover&quot;</span>,<span class="hljs-string">&quot;button&quot;</span>,change);</code></pre><p><span class="img-wrap"><img data-src="/img/bVbeNrl?w=726&amp;h=299" src="https://static.alili.tech/img/bVbeNrl?w=726&amp;h=299" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h1 id="articleHeader11">&#x4E8C;&#x3001;jQuery&#x6A21;&#x62DF;&#x4E8B;&#x4EF6;</h1><ul><li>&#x8BED;&#x6CD5;&#xFF1A;trigger(type,data)</li><li>&#x89E3;&#x91CA;&#x4E00;&#xFF1A;type: &#x6307;&#x5B9A;&#x8981;&#x6A21;&#x62DF;&#x7684;&#x4E8B;&#x4EF6;&#x540D;&#x79F0;</li><li>&#x89E3;&#x91CA;&#x4E8C;&#xFF1A;data: &#x4F20;&#x9012;&#x7ED9;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;&#x7684;&#x9644;&#x52A0;&#x53C2;&#x6570;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     &lt;!-- &#x6A21;&#x62DF;&#x4E8B;&#x4EF6; --&gt;
    &lt;div&gt;&#x70B9;&#x51FB;&lt;/div&gt;
    &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
    &lt;script&gt;
    $(&quot;div&quot;).on(&quot;click&quot;,function(){
     console.log(&quot;hello&quot;);
    }).trigger(&quot;click&quot;);
    &lt;/script&gt;// &#x9ED8;&#x8BA4;&#x8BA9;&#x8BE5;&#x51FD;&#x6570;&#x8F93;&#x51FA;&#x4E00;&#x6B21;&#xFF0C;&#x662F;&#x6A21;&#x62DF;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x7136;&#x540E;&#x70B9;&#x51FB;&#x6570;&#x65F6;&#x5728;&#x89E6;&#x53D1;&#x4E00;&#x6B21;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">     &lt;!-- &#x6A21;&#x62DF;&#x4E8B;&#x4EF6; --&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x70B9;&#x51FB;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;script src=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
    &lt;script&gt;
    $(<span class="hljs-string">&quot;div&quot;</span>).on(<span class="hljs-string">&quot;click&quot;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;hello&quot;</span>);
    }).trigger(<span class="hljs-string">&quot;click&quot;</span>);
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span><span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x8BA9;&#x8BE5;&#x51FD;&#x6570;&#x8F93;&#x51FA;&#x4E00;&#x6B21;&#xFF0C;&#x662F;&#x6A21;&#x62DF;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x7136;&#x540E;&#x70B9;&#x51FB;&#x6570;&#x65F6;&#x5728;&#x89E6;&#x53D1;&#x4E00;&#x6B21;</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeNrq?w=726&amp;h=299" src="https://static.alili.tech/img/bVbeNrq?w=726&amp;h=299" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h1 id="articleHeader12">&#x4E09;&#x3001;&#x52A8;&#x753B;&#x663E;&#x793A;&#x4E0E;&#x9690;&#x85CF;</h1><h2 id="articleHeader13">3.1 show([speed,[easing],[fn]])</h2><ul><li>&#x8BED;&#x6CD5;&#xFF1A;&#x663E;&#x793A;&#x9690;&#x85CF;&#x7684;&#x5339;&#x914D;&#x5143;&#x7D20;</li><li>&#x89E3;&#x91CA;&#x4E00;&#xFF1A;speed: &quot;slow&quot;, &quot;normal&quot;(400), or &quot;fast&quot;&#x6216;&#x6BEB;&#x79D2;&#x6570;&#x503C;(&#x5982;&#xFF1A;1000)</li><li>&#x89E3;&#x91CA;&#x4E8C;&#xFF1A;easing: &#x9ED8;&#x8BA4;&#x662F;&quot;swing&quot;&#x53D8;&#x52A0;&#x901F;&#x8FD0;&#x52A8;&#xFF0C;&#x53C2;&#x6570;&quot;linear&quot;&#x5300;&#x901F;&#x8FD0;&#x52A8;</li><li>&#x89E3;&#x91CA;&#x4E09;&#xFF1A;fn: &#x5728;&#x52A8;&#x753B;&#x5B8C;&#x6210;&#x65F6;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x6267;&#x884C;&#x4E00;&#x6B21;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     &lt;p hidden&gt;&#x7231;&#x4F60;&#x54DF;&#xFF01;&lt;/p&gt;
    &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
    &lt;script&gt;
      $(&quot;p&quot;).show(1000,&quot;linear&quot;,function(){
        $(this).css({
          &quot;fontSize&quot;:24,
          &quot;fontWeight&quot;:&quot;bold&quot;,
          &quot;color&quot;:&quot;orange&quot;
        });
      });
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">     &lt;p hidden&gt;&#x7231;&#x4F60;&#x54DF;&#xFF01;&lt;<span class="hljs-regexp">/p&gt;
    &lt;script src=&apos;js/</span>jquery.js<span class="hljs-string">&apos;&gt;&lt;/script&gt;
    &lt;script&gt;
      $(&quot;p&quot;).show(1000,&quot;linear&quot;,function(){
        $(this).css({
          &quot;fontSize&quot;:24,
          &quot;fontWeight&quot;:&quot;bold&quot;,
          &quot;color&quot;:&quot;orange&quot;
        });
      });
    &lt;/script&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeNrt?w=726&amp;h=186" src="https://static.alili.tech/img/bVbeNrt?w=726&amp;h=186" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader14">3.2 hide([speed,[easing],[fn])</h2><ul><li>&#x8BED;&#x6CD5;&#xFF1A;&#x9690;&#x85CF;&#x663E;&#x793A;&#x7684;&#x5143;&#x7D20;</li><li>&#x89E3;&#x91CA;&#x4E00;&#xFF1A;speed: &quot;slow&quot;, &quot;normal&quot;, or &quot;fast&quot;&#x6216;&#x6BEB;&#x79D2;&#x6570;&#x503C;(&#x5982;&#xFF1A;1000)</li><li>&#x89E3;&#x91CA;&#x4E8C;&#xFF1A;easing: &#x9ED8;&#x8BA4;&#x662F;&quot;swing&quot;&#x53D8;&#x52A0;&#x901F;&#x8FD0;&#x52A8;&#xFF0C;&#x53C2;&#x6570;&quot;linear&quot;&#x5300;&#x901F;&#x8FD0;&#x52A8;</li><li>&#x89E3;&#x91CA;&#x4E09;&#xFF1A;fn: &#x5728;&#x52A8;&#x753B;&#x5B8C;&#x6210;&#x65F6;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x6267;&#x884C;&#x4E00;&#x6B21;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     &lt;p&gt;&#x7231;&#x4F60;&#x54DF;&#xFF01;&lt;/p&gt;
    &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
    &lt;script&gt;
      $(&quot;p&quot;).hide(1000,&quot;linear&quot;,function(){
        $(this).css({
          &quot;fontSize&quot;:24,
          &quot;fontWeight&quot;:&quot;bold&quot;,
          &quot;color&quot;:&quot;orange&quot;
        });
      });
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">     &lt;p&gt;&#x7231;&#x4F60;&#x54DF;&#xFF01;&lt;<span class="hljs-regexp">/p&gt;
    &lt;script src=&apos;js/</span>jquery.js<span class="hljs-string">&apos;&gt;&lt;/script&gt;
    &lt;script&gt;
      $(&quot;p&quot;).hide(1000,&quot;linear&quot;,function(){
        $(this).css({
          &quot;fontSize&quot;:24,
          &quot;fontWeight&quot;:&quot;bold&quot;,
          &quot;color&quot;:&quot;orange&quot;
        });
      });
    &lt;/script&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeNru?w=726&amp;h=186" src="https://static.alili.tech/img/bVbeNru?w=726&amp;h=186" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader15">3.3 toggle([speed],[easing], [callback])</h2><ul><li>&#x8BED;&#x6CD5;&#xFF1A;&#x5728;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x4E0A;&#x8FDB;&#x884C; hide() &#x548C; show() &#x4E4B;&#x95F4;&#x7684;&#x5207;&#x6362;</li></ul><p>&#x6CE8;&#x610F;&#xFF1A; &#x8FD9;&#x91CC;&#x7684;&#x4F8B;&#x5B50;&#x5C31;&#x4E0D;&#x4E3E;&#x4E86;&#xFF0C;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x4E00;&#x53E5;&#x8BDD;&#xFF1A;&#x663E;&#x793A;&#x7684;&#x65F6;&#x5019;&#x8BA9;&#x4ED6;&#x6D88;&#x5931;&#xFF0C;&#x9690;&#x85CF;&#x7684;&#x65F6;&#x5019;&#x8BA9;&#x4ED6;&#x7ED3;&#x675F;</p><h2 id="articleHeader16">3.4 slideDown([speed],[easing],[fn])</h2><ul><li>&#x7528;&#x6CD5;&#xFF1A;&#x5411;&#x4E0B;&#x5C55;&#x5F00;&#x52A8;&#x6001;&#x663E;&#x793A;&#x5143;&#x7D20;</li></ul><h2 id="articleHeader17">3.5 slideUp([speed,[easing],[fn]])</h2><ul><li>&#x7528;&#x6CD5;&#xFF1A;&#x5411;&#x4E0A;&#x5C55;&#x5F00;&#x52A8;&#x6001;&#x663E;&#x793A;&#x5143;&#x7D20;</li></ul><p>&#x4EE5;&#x4E0A;&#x4E24;&#x79CD;&#x5408;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     &lt;button id=&quot;btn1&quot;&gt;&#x6298;&#x53E0;&lt;/button&gt;
     &lt;button id=&quot;btn2&quot;&gt;&#x4F38;&#x5C55;&lt;/button&gt;
    &lt;div&gt;&lt;/div&gt;
    &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
    &lt;script&gt;
    $(&quot;#btn1&quot;).click(function(){
      $(&quot;div&quot;).slideUp()
    });
     $(&quot;#btn2&quot;).click(function(){
      $(&quot;div&quot;).slideDown()
    });
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">     &lt;button id=<span class="hljs-string">&quot;btn1&quot;</span>&gt;&#x6298;&#x53E0;&lt;<span class="hljs-regexp">/button&gt;
     &lt;button id=&quot;btn2&quot;&gt;&#x4F38;&#x5C55;&lt;/</span>button&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;script src=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
    &lt;script&gt;
    $(<span class="hljs-string">&quot;#btn1&quot;</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      $(<span class="hljs-string">&quot;div&quot;</span>).slideUp()
    });
     $(<span class="hljs-string">&quot;#btn2&quot;</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      $(<span class="hljs-string">&quot;div&quot;</span>).slideDown()
    });
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeNrE?w=726&amp;h=269" src="https://static.alili.tech/img/bVbeNrE?w=726&amp;h=269" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader18">3.6 fadeIn([speed],[easing], [callback])</h2><ul><li>&#x8BED;&#x6CD5;&#xFF1A;&#x6DE1;&#x5165;&#xFF08;&#x9690;&#x85CF;&#xFF09;</li></ul><h2 id="articleHeader19">3.7 fadeOut([speed],[easing], [callback])</h2><ul><li>&#x8BED;&#x6CD5;&#xFF1A; &#x6DE1;&#x51FA;&#xFF08;&#x663E;&#x793A;&#xFF09;</li></ul><p>&#x4EE5;&#x4E0A;&#x4E24;&#x4E2A;&#x5408;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;button id=&quot;btn1&quot;&gt;&#x6DE1;&#x5165;&lt;/button&gt;
  &lt;button id=&quot;btn2&quot;&gt;&#x6DE1;&#x51FA;&lt;/button&gt;
  &lt;div&gt;&lt;/div&gt;
  &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
  &lt;script&gt;
    $(&quot;#btn1&quot;).click(function(){
      $(&quot;div&quot;).fadeIn(3000);
    });
     $(&quot;#btn2&quot;).click(function(){
      $(&quot;div&quot;).fadeOut(3000);
    });
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;button id=<span class="hljs-string">&quot;btn1&quot;</span>&gt;&#x6DE1;&#x5165;&lt;<span class="hljs-regexp">/button&gt;
  &lt;button id=&quot;btn2&quot;&gt;&#x6DE1;&#x51FA;&lt;/</span>button&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  &lt;script src=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
  &lt;script&gt;
    $(<span class="hljs-string">&quot;#btn1&quot;</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      $(<span class="hljs-string">&quot;div&quot;</span>).fadeIn(<span class="hljs-number">3000</span>);
    });
     $(<span class="hljs-string">&quot;#btn2&quot;</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      $(<span class="hljs-string">&quot;div&quot;</span>).fadeOut(<span class="hljs-number">3000</span>);
    });
  <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeNrF?w=726&amp;h=269" src="https://static.alili.tech/img/bVbeNrF?w=726&amp;h=269" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader20">3.8 fodeTo(speed,opcity,fn)</h2><ul><li>&#x8BED;&#x6CD5;&#xFF1A;&#x5C06;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x7684;&#x4E0D;&#x900F;&#x660E;&#x5EA6;&#x9010;&#x6E10;&#x5730;&#x6539;&#x53D8;&#x4E3A;&#x6307;&#x5B9A;&#x7684;&#x503C;</li><li>opcity:&#x5FC5;&#x9700;&#x3002;&#x89C4;&#x5B9A;&#x8981;&#x6DE1;&#x5165;&#x6216;&#x6DE1;&#x51FA;&#x7684;&#x900F;&#x660E;&#x5EA6;&#x3002;&#x5FC5;&#x987B;&#x662F;&#x4ECB;&#x4E8E; 0.00 &#x4E0E; 1.00 &#x4E4B;&#x95F4;&#x7684;&#x6570;&#x5B57;</li></ul><h2 id="articleHeader21">3.9 &#x5176;&#x4ED6;&#x51FD;&#x6570;</h2><p><strong>fadeToggle&#x548C;slideToggle</strong></p><p>&#x89E3;&#x91CA;&#x4E00;&#x4E0B;&#x5C31;&#x884C;&#x4E86;&#xFF1A;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x610F;&#x601D;&#x5C31;&#x662F; &#x6709;&#x5219;&#x663E;&#x793A;&#x6CA1;&#x6709;&#xFF0C;&#x6CA1;&#x6709;&#x5219;&#x6709;</p><h1 id="articleHeader22">&#x56DB;&#x3001;&#x81EA;&#x5B9A;&#x4E49;&#x52A8;&#x753B;</h1><h2 id="articleHeader23">4.1 animate(properties,[duration],[easing],[callback])</h2><p><strong>&#x53C2;&#x6570;&#x89E3;&#x91CA;</strong></p><ul><li>properties: &#x8BBE;&#x7F6E;&#x76F8;&#x5173;&#x52A8;&#x753B;&#x9700;&#x8981;&#x7684;CSS&#x7684;&#x5C5E;&#x6027;&#x5185;&#x5BB9;</li><li>duration: &#x8BBE;&#x7F6E;&#x81EA;&#x5B9A;&#x4E49;&#x52A8;&#x753B;&#x6267;&#x884C;&#x7684;&#x65F6;&#x957F;(&#x6BEB;&#x79D2;)</li><li>easing: &#x9ED8;&#x8BA4;jQuery&#x63D0;&#x4F9B;&quot;linear&quot; &#x548C; &quot;swing</li><li>callback: &#x81EA;&#x5B9A;&#x4E49;&#x52A8;&#x753B;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#x540E;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     &lt;button&gt;&#x70B9;&#x51FB;&lt;/button&gt;
    &lt;div style=&quot;width:50px;height:50px;background:red;&quot;&gt;&lt;/div&gt;
    &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
    &lt;script&gt;
    $(&quot;button&quot;).click(function(){
      start();
      function start(){
        $(&quot;div&quot;).animate({height:&quot;500px&quot;},2000,&quot;linear&quot;);
       $(&quot;div&quot;).animate({width:&quot;500px&quot;},2000,&quot;linear&quot;);
       $(&quot;div&quot;).animate({height:&quot;50px&quot;},2000,&quot;linear&quot;);
       $(&quot;div&quot;).animate({width:&quot;50px&quot;},2000,&quot;linear&quot;,start);
      }

    });
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">     &lt;button&gt;&#x70B9;&#x51FB;&lt;<span class="hljs-regexp">/button&gt;
    &lt;div style=&quot;width:50px;height:50px;background:red;&quot;&gt;&lt;/</span>div&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
    &lt;script&gt;
    $(<span class="hljs-string">&quot;button&quot;</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      start();
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params"></span>)</span>{
        $(<span class="hljs-string">&quot;div&quot;</span>).animate({<span class="hljs-attr">height</span>:<span class="hljs-string">&quot;500px&quot;</span>},<span class="hljs-number">2000</span>,<span class="hljs-string">&quot;linear&quot;</span>);
       $(<span class="hljs-string">&quot;div&quot;</span>).animate({<span class="hljs-attr">width</span>:<span class="hljs-string">&quot;500px&quot;</span>},<span class="hljs-number">2000</span>,<span class="hljs-string">&quot;linear&quot;</span>);
       $(<span class="hljs-string">&quot;div&quot;</span>).animate({<span class="hljs-attr">height</span>:<span class="hljs-string">&quot;50px&quot;</span>},<span class="hljs-number">2000</span>,<span class="hljs-string">&quot;linear&quot;</span>);
       $(<span class="hljs-string">&quot;div&quot;</span>).animate({<span class="hljs-attr">width</span>:<span class="hljs-string">&quot;50px&quot;</span>},<span class="hljs-number">2000</span>,<span class="hljs-string">&quot;linear&quot;</span>,start);
      }

    });
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeNrG?w=726&amp;h=275" src="https://static.alili.tech/img/bVbeNrG?w=726&amp;h=275" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader24">4.2 animate(properties,options)</h2><p>&#x53C2;&#x6570;&#x89E3;&#x91CA;</p><ul><li>properties: &#x8BBE;&#x7F6E;&#x76F8;&#x5173;&#x52A8;&#x753B;&#x9700;&#x8981;&#x7684;CSS&#x7684;&#x5C5E;&#x6027;&#x5185;&#x5BB9;</li><li>options&#x5305;&#x62EC;&#x4EE5;&#x4E0B;&#x5C5E;&#x6027;</li></ul><p>&#xF075; duration - &#x8BBE;&#x7F6E;&#x81EA;&#x5B9A;&#x4E49;&#x52A8;&#x753B;&#x6267;&#x884C;&#x7684;&#x65F6;&#x957F;(&#x6BEB;&#x79D2;)<br>&#xF075; easing - &#x9ED8;&#x8BA4;jQuery&#x63D0;&#x4F9B;&quot;linear&quot; &#x548C; &quot;swing&quot;.<br>&#xF075; complete - &#x81EA;&#x5B9A;&#x4E49;&#x52A8;&#x753B;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#x540E;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;<br>&#xF075; queue - Boolean&#x503C;,(&#x9ED8;&#x8BA4;&#x503C;: true) &#x8BBE;&#x5B9A;&#x4E3A;false&#x5C06;&#x4F7F;&#x6B64;&#x52A8;&#x753B;&#x4E0D;&#x8FDB;&#x5165;&#x52A8;&#x753B;&#x961F;&#x5217;&#xFF0C;&#x4F1A;&#x7ACB;&#x523B;&#x6267;&#x884C;</p><p>eg&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;button&gt;&#x70B9;&#x51FB;&lt;/button&gt;
    &lt;div style=&quot;width:50px;height:50px;background:red;position: relative;&quot;&gt;&lt;/div&gt;
    &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
    &lt;script&gt;
    $(&quot;button&quot;).click(function(){
      start();
      function start(){
        $(&quot;div&quot;).animate({width:&quot;200px&quot;,height:&quot;200px&quot;},{
        duration:3000
      }).animate({left:500},{duration:3000,queue:true}).animate({left:0,width:50,height:50},{duration:3000,queue:true,start})
    }
  });
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;button&gt;&#x70B9;&#x51FB;&lt;<span class="hljs-regexp">/button&gt;
    &lt;div style=&quot;width:50px;height:50px;background:red;position: relative;&quot;&gt;&lt;/</span>div&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
    &lt;script&gt;
    $(<span class="hljs-string">&quot;button&quot;</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      start();
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params"></span>)</span>{
        $(<span class="hljs-string">&quot;div&quot;</span>).animate({<span class="hljs-attr">width</span>:<span class="hljs-string">&quot;200px&quot;</span>,<span class="hljs-attr">height</span>:<span class="hljs-string">&quot;200px&quot;</span>},{
        <span class="hljs-attr">duration</span>:<span class="hljs-number">3000</span>
      }).animate({<span class="hljs-attr">left</span>:<span class="hljs-number">500</span>},{<span class="hljs-attr">duration</span>:<span class="hljs-number">3000</span>,<span class="hljs-attr">queue</span>:<span class="hljs-literal">true</span>}).animate({<span class="hljs-attr">left</span>:<span class="hljs-number">0</span>,<span class="hljs-attr">width</span>:<span class="hljs-number">50</span>,<span class="hljs-attr">height</span>:<span class="hljs-number">50</span>},{<span class="hljs-attr">duration</span>:<span class="hljs-number">3000</span>,<span class="hljs-attr">queue</span>:<span class="hljs-literal">true</span>,start})
    }
  });
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeNrI?w=726&amp;h=275" src="https://static.alili.tech/img/bVbeNrI?w=726&amp;h=275" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h1 id="articleHeader25">&#x4E94;&#x3001;jQuery&#x5E38;&#x89C1;&#x63D2;&#x4EF6;&#x7684;&#x4F7F;&#x7528;</h1><h2 id="articleHeader26">5.1 .data()&#x8DDF;.attr() &#x65B9;&#x6CD5;&#x7684;&#x533A;&#x522B;</h2><ul><li>&#x83B7;&#x53D6;&#x6570;&#x636E;&#x7684;&#x65F6;&#x5019;&#xFF0C;attr&#x65B9;&#x6CD5;&#x9700;&#x8981;&#x4F20;&#x5165;&#x53C2;&#x6570;&#xFF0C;data&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x4E0D;&#x4F20;&#x5165;&#x53C2;&#x6570;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x83B7;&#x53D6;&#x5230;&#x7684;&#x662F;&#x4E00;&#x4E2A;js&#x5BF9;&#x8C61;&#xFF0C;&#x5373;&#x4F7F;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;data&#x5C5E;&#x6027;</li><li>&#x83B7;&#x53D6;&#x5230;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x4E0D;&#x540C;&#xFF0C;attr&#x65B9;&#x6CD5;&#x83B7;&#x53D6;&#x5230;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x662F;&#x5B57;&#x7B26;&#x4E32;(String)&#xFF0C;data&#x65B9;&#x6CD5;&#x83B7;&#x53D6;&#x5230;&#x7684;&#x662F;&#x76F8;&#x5E94;&#x7684;&#x7C7B;&#x578B;&#x3002;</li><li>data&#x65B9;&#x6CD5;&#x83B7;&#x53D6;&#x5230;&#x6570;&#x636E;&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x6765;&#x63A5;&#x6536;&#x5B83;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x64CD;&#x4F5C;(&#x8BBE;&#x7F6E;&#x503C;&#x6216;&#x83B7;&#x53D6;&#x503C;)&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x800C;attr&#x65B9;&#x6CD5;&#x4E0D;&#x53EF;&#x4EE5;</li><li>data-attribute&#x5C5E;&#x6027;&#x4F1A;&#x5728;&#x9875;&#x9762;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#x653E;&#x5230;jQuery&#x5BF9;&#x8C61;&#xFF0C;&#x88AB;&#x7F13;&#x5B58;&#x8D77;&#x6765;&#xFF0C;&#x800C;attr&#x65B9;&#x6CD5;&#x4E0D;&#x4F1A;</li></ul><h2 id="articleHeader27">5.2 &#x5168;&#x5C40;jQuery&#x5BF9;&#x8C61;&#x6269;&#x5C55;&#x65B9;&#x6CD5;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        &lt;input type=&quot;text&quot; name=&quot;&quot; value=&quot;&quot;&gt;
    &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
    &lt;script&gt;
        $.log = function(){
            setInterval(function(){
            //&#x83B7;&#x53D6;&#x79D2;&#x6570;&#x4FDD;&#x5B58;&#x5728;input&#x4E2D;
               $(&quot;input&quot;).val(new Date().getSeconds());
            },1000)
        }
        $.log();
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">        &lt;input type=<span class="hljs-string">&quot;text&quot;</span> name=<span class="hljs-string">&quot;&quot;</span> value=<span class="hljs-string">&quot;&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
    &lt;script&gt;
        $.log = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-comment">//&#x83B7;&#x53D6;&#x79D2;&#x6570;&#x4FDD;&#x5B58;&#x5728;input&#x4E2D;</span>
               $(<span class="hljs-string">&quot;input&quot;</span>).val(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getSeconds());
            },<span class="hljs-number">1000</span>)
        }
        $.log();
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeNrJ?w=726&amp;h=107" src="https://static.alili.tech/img/bVbeNrJ?w=726&amp;h=107" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader28">5.3 &#x666E;&#x901A;jQuery DOM&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x6269;&#x5C55;&#x65B9;&#x6CD5;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;input type=&quot;text&quot; name=&quot;&quot; value=&quot;&quot;&gt;
    &lt;script src=&apos;js/jquery.js&apos;&gt;&lt;/script&gt;
    &lt;script&gt;
        $.fn.log = function(){
            setInterval(function(){
           // &#x83B7;&#x53D6;1976&#x5E74;&#x5230;&#x73B0;&#x5728;&#x7684;&#x6BEB;&#x79D2;&#x6570;
               $(&quot;input&quot;).val(new Date().getTime());
            },1000)
        }
        $.fn.log();
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;input type=<span class="hljs-string">&quot;text&quot;</span> name=<span class="hljs-string">&quot;&quot;</span> value=<span class="hljs-string">&quot;&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&apos;js/jquery.js&apos;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
    &lt;script&gt;
        $.fn.log = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
           <span class="hljs-comment">// &#x83B7;&#x53D6;1976&#x5E74;&#x5230;&#x73B0;&#x5728;&#x7684;&#x6BEB;&#x79D2;&#x6570;</span>
               $(<span class="hljs-string">&quot;input&quot;</span>).val(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime());
            },<span class="hljs-number">1000</span>)
        }
        $.fn.log();
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeNrK?w=726&amp;h=107" src="https://static.alili.tech/img/bVbeNrK?w=726&amp;h=107" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader29">5.4 &#x7B2C;&#x4E09;&#x65B9;&#x63D2;&#x4EF6;( laydate &#x63D2;&#x4EF6; )</h2><p><strong>layDate &#x65E5;&#x671F;&#x4E0E;&#x65F6;&#x95F4;&#x7EC4;&#x4EF6;</strong></p><ol><li>&#x5B98;&#x7F51;&#xFF1A;<a href="http://laydate.layui.com/" rel="nofollow noreferrer" target="_blank">http://laydate.layui.com/</a></li><li>&#x5982;&#x4F55;&#x4F7F;&#x7528;laydate&#x63D2;&#x4EF6;</li></ol><p>&#xF0D8; &#x4E0B;&#x8F7D;&#x89E3;&#x538B;&#x3002;<br>&#xF0D8; &#x5C06;laydate&#x6574;&#x4E2A;&#x6587;&#x4EF6;&#x653E;&#x81F3;&#x9879;&#x76EE;&#x7684;&#x4EFB;&#x610F;&#x76EE;&#x5F55; ( &#x4E0D;&#x8981;&#x79FB;&#x52A8;&#x5176;&#x6587;&#x4EF6;&#x7ED3;&#x6784;&#xFF0C;&#x5B83;&#x4EEC;&#x5177;&#x6709;&#x5B8C;&#x6574;&#x7684;&#x4F9D;&#x8D56;&#x4F53;&#x7CFB; )&#x3002;<br>&#xF0D8; &#x53EA;&#x9700;&#x5728;&#x9875;&#x9762;&#x5F15;&#x5165;laydate.js&#x5373;&#x53EF;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;!-- &#x5F15;&#x7528;laydate&#x7684;&#x63D2;&#x4EF6; --&gt;
    &lt;script src=&apos;laydate/laydate.js&apos;&gt;&lt;/script&gt;
    &lt;input type=&quot;text&quot; name=&quot;&quot; value=&quot;&quot;&gt;
    &lt;script&gt;
       laydate.render({
        // &#x6307;&#x5B9A;&#x5143;&#x7D20;
        elem: &apos;input&apos;
          ,type: &apos;year&apos;// &#x5E74;&#x9009;&#x62E9;
    });
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;!-- &#x5F15;&#x7528;laydate&#x7684;&#x63D2;&#x4EF6; --&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&apos;laydate/laydate.js&apos;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
    &lt;input type=<span class="hljs-string">&quot;text&quot;</span> name=<span class="hljs-string">&quot;&quot;</span> value=<span class="hljs-string">&quot;&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
       laydate.render({
        <span class="hljs-comment">// &#x6307;&#x5B9A;&#x5143;&#x7D20;</span>
        elem: <span class="hljs-string">&apos;input&apos;</span>
          ,type: <span class="hljs-string">&apos;year&apos;</span><span class="hljs-comment">// &#x5E74;&#x9009;&#x62E9;</span>
    });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbeNrO?w=411&amp;h=388" src="https://static.alili.tech/img/bVbeNrO?w=411&amp;h=388" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x6CE8;&#x610F;&#xFF1A;&#x8FD8;&#x6709;&#x5176;&#x4ED6;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x8FD9;&#x91CC;&#x5C0F;&#x7F16;&#x5C31;&#x4E0D;&#x4E00;&#x4E00;&#x5199;&#x4E86;&#xFF0C;&#x5173;&#x952E;&#x65F6;&#x592A;&#x591A;&#x4E86;&#xFF0C;&#x8981;&#x662F;&#x4F60;&#x6709;&#x7528;&#x5230;&#x8FD9;&#x4E2A;&#x4E1C;&#x897F;&#xFF0C;&#x5C31;&#x53BB;&#x5B98;&#x7F51;&#x4E0A;&#x8FDB;&#x884C;&#x67E5;&#x770B;</p><h2 id="articleHeader30">5.5 &#x7B2C;&#x4E09;&#x65B9;&#x63D2;&#x4EF6;( jQuery.lazyload.js )</h2><blockquote>Lazy Load &#x662F;&#x4E00;&#x4E2A;&#x7528; JavaScript &#x7F16;&#x5199;&#x7684; jQuery &#x63D2;&#x4EF6;. &#x5B83;&#x53EF;&#x4EE5;&#x5EF6;&#x8FDF;&#x52A0;&#x8F7D;&#x957F;&#x9875;&#x9762;&#x4E2D;&#x7684;&#x56FE;&#x7247;. &#x5728;&#x6D4F;&#x89C8;&#x5668;&#x53EF;&#x89C6;&#x533A;&#x57DF;&#x5916;&#x7684;&#x56FE;&#x7247;&#x4E0D;&#x4F1A;&#x88AB;&#x8F7D;&#x5165;, &#x76F4;&#x5230;&#x7528;&#x6237;&#x5C06;&#x9875;&#x9762;&#x6EDA;&#x52A8;&#x5230;&#x5B83;&#x4EEC;&#x6240;&#x5728;&#x7684;&#x4F4D;&#x7F6E;. &#x8FD9;&#x4E0E;&#x56FE;&#x7247;&#x9884;&#x52A0;&#x8F7D;&#x7684;&#x5904;&#x7406;&#x65B9;&#x5F0F;&#x6B63;&#x597D;&#x662F;&#x76F8;&#x53CD;&#x7684;&#x3002;<p>&#x5728;&#x5305;&#x542B;&#x5F88;&#x591A;&#x5927;&#x56FE;&#x7247;&#x957F;&#x9875;&#x9762;&#x4E2D;&#x5EF6;&#x8FDF;&#x52A0;&#x8F7D;&#x56FE;&#x7247;&#x53EF;&#x4EE5;&#x52A0;&#x5FEB;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x901F;&#x5EA6;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x5C06;&#x4F1A;&#x5728;&#x52A0;&#x8F7D;&#x53EF;&#x89C1;&#x56FE;&#x7247;&#x4E4B;&#x540E;&#x5373;&#x8FDB;&#x5165;&#x5C31;&#x7EEA;&#x72B6;&#x6001;,&#x5728;&#x67D0;&#x4E9B;&#x60C5;&#x51B5;&#x4E0B;&#x8FD8;&#x53EF;&#x4EE5;&#x5E2E;&#x52A9;&#x964D;&#x4F4E;&#x670D;&#x52A1;&#x5668;&#x8D1F;&#x62C5;.</p></blockquote><ul><li>&#x5B98;&#x7F51;&#x5730;&#x5740;&#xFF1A;<a href="http://www.jq22.com/jquery-info390" rel="nofollow noreferrer" target="_blank">http://www.jq22.com/jquery-in...</a></li><li>&#x8FD9;&#x4E9B;&#x4E1C;&#x897F;&#x5C0F;&#x7F16;&#x771F;&#x7684;&#x8BB2;&#x4E0D;&#x901A;&#xFF0C;&#x53EA;&#x6709;&#x901A;&#x8FC7;&#x5B98;&#x7F51;&#x81EA;&#x5DF1;&#x53BB;&#x770B;&#xFF0C;&#x8FD8;&#x6709;&#x771F;&#x7684;&#x662F;&#x592A;&#x591A;&#x4E86;</li></ul><h2 id="articleHeader31">5.6 &#x7B2C;&#x4E09;&#x65B9;&#x63D2;&#x4EF6;( masonry )&#x7011;&#x5E03;&#x6D41;</h2><ul><li>&#x5B98;&#x7F51;: <a href="http://masonry.desandro.com/" rel="nofollow noreferrer" target="_blank">http://masonry.desandro.com/</a></li><li>Masonry&#x662F; &#x4E00;&#x6B3E;&#x975E;&#x5E38;&#x5F3A;&#x5927;&#x7684;jQuery&#x52A8;&#x6001;&#x7F51;&#x683C;&#x5E03;&#x5C40;&#x63D2;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x5E2E;&#x52A9;&#x5F00; &#x53D1;&#x4EBA;&#x5458;&#x5FEB;&#x901F;&#x5F00;&#x53D1;&#x7011;&#x5E03;&#x6D41;&#x6548;&#x679C;&#x3002;&#x5F88;&#x591A;&#x7F51;&#x7AD9;&#x90FD;&#x6709;&#x4F7F;&#x7528;&#x8FD9;&#x6837;&#x7684;&#x5E03;&#x5C40;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;&#x6DD8; &#x5B9D;&#x7684;&#x54C7;&#x54E6;&#x3001;&#x82B1;&#x74E3;&#x7F51;&#x3001;&#x8611;&#x83C7;&#x8857;</li><li>&#x5177;&#x4F53;&#x7528;&#x6CD5;&#xFF1A;&#x627E;&#x5B98;&#x7F51;</li></ul><h2 id="articleHeader32">5.7 &#x7B2C;&#x4E09;&#x65B9;&#x63D2;&#x4EF6;(Swiper)</h2><ul><li>&#x5B98;&#x7F51;&#x5730;&#x5740;&#xFF1A;<a href="https://www.swiper.com.cn/" rel="nofollow noreferrer" target="_blank">https://www.swiper.com.cn/</a></li><li>&#x5F15;&#x5165;swiper.css</li></ul><blockquote>&lt;link rel=&quot;stylesheet&quot; href=&quot;lib/Swiper-3.3.1/dist/css/swiper.min.css&quot;&gt;<br>&lt;script type=&quot;text/javascript&quot; src=&quot;lib/jquery-1.11.3.js&quot;&gt;&lt;/script&gt;.</blockquote><ul><li>&#x5F15;&#x5165;swiper.jquery.min.js</li></ul><blockquote>&lt;script type=&quot;text/javascript&quot; src=&quot;lib/Swiper-3.3.1/dist/js/swiper.jquery.min.js&quot;&gt;&lt;/script&gt;</blockquote><ul><li>&#x5177;&#x4F53;&#x7528;&#x6CD5;&#xFF1A;&#x89C1;&#x5B98;&#x65B9;</li></ul><h2 id="articleHeader33">5.8 unslider(&#x8F6E;&#x64AD;&#x63D2;&#x4EF6;)</h2><p>&#x5C0F;&#x7F16;&#x61D2;&#x8BED;&#xFF1A;&#x8FD9;&#x4E9B;&#x63D2;&#x4EF6;&#x5E76;&#x4E0D;&#x662F;&#x4E00;&#x65F6;&#x534A;&#x4F1A;&#x5C31;&#x5B66;&#x4F1A;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x9700;&#x8981;&#x90A3;&#x4E2A;&#x5C31;&#x53BB;&#x5B98;&#x65B9;&#x7F51;&#x7AD9;&#x4E0A;&#x8FDB;&#x884C;&#x67E5;&#x627E;&#xFF0C;&#x91CC;&#x9762;&#x6709;&#x538B;&#x7F29;&#x5305;&#xFF0C;&#x8FD8;&#x6709;&#x5177;&#x4F53;&#x7684;&#x7528;&#x6CD5;</p><h2 id="articleHeader34">5.9 echarts</h2><p>&#x5B98;&#x65B9;&#x5730;&#x5740;&#xFF1A;<a href="http://echarts.baidu.com/" rel="nofollow noreferrer" target="_blank">http://echarts.baidu.com/</a></p><h2 id="articleHeader35">5.10 highcharts</h2><p>&#x5B98;&#x65B9;&#x5730;&#x5740;&#xFF1A;<a href="http://www.hcharts.cn/" rel="nofollow noreferrer" target="_blank">http://www.hcharts.cn/</a></p><h2 id="articleHeader36">5.11 &#x63D2;&#x4EF6;&#x5C01;&#x88C5;&#x6A21;&#x677F;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
        ;(function($) {
                $.fn.table = function(options) {
                    // &#x9ED8;&#x8BA4;&#x53C2;&#x6570;
                    var defaultOptions = {
                        
                    }

                    // &#x5C06;&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;&#x5408;&#x5E76;&#x6210;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;
                    var endOptions = $.extend(defaultOptions, options)

                    $(this).each(function() {
                        
                    })

                    return $(this);
                }
        })(jQuery);
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    &lt;script&gt;
        ;(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$</span>) </span>{
                $.fn.table = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options</span>) </span>{
                    <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x53C2;&#x6570;</span>
                    <span class="hljs-keyword">var</span> defaultOptions = {
                        
                    }

                    <span class="hljs-comment">// &#x5C06;&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;&#x5408;&#x5E76;&#x6210;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;</span>
                    <span class="hljs-keyword">var</span> endOptions = $.extend(defaultOptions, options)

                    $(<span class="hljs-keyword">this</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                        
                    })

                    <span class="hljs-keyword">return</span> $(<span class="hljs-keyword">this</span>);
                }
        })(jQuery);
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><h2 id="articleHeader37">5.12 fullpage&#x63D2;&#x4EF6;</h2><p>&#x5B98;&#x7F51;&#xFF1A;<a href="http://www.jq22.com/jquery-info1124" rel="nofollow noreferrer" target="_blank">http://www.jq22.com/jquery-in...</a></p><h1 id="articleHeader38">&#x516D;&#x3001;&#x603B;&#x7ED3;</h1><p>&#x5C0F;&#x7F16;&#x5199;&#x7684;&#x8FD9;&#x8282;&#x5185;&#x5BB9;&#x6709;&#x6C34;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x6BD4;&#x5982; &#x63D2;&#x4EF6;&#xFF0C;&#x5176;&#x5B9E;&#x63D2;&#x4EF6;&#x8FD9;&#x90E8;&#x5206;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x53BB;&#x6478;&#x7D22;&#xFF0C;&#x81EA;&#x5DF1;&#x53BB;&#x5B98;&#x7F51;&#x67E5;&#x770B;&#xFF0C;&#x6211;&#x53EA;&#x662F;&#x5217;&#x4E3E;&#x4E86;&#x51E0;&#x4E2A;&#x91CD;&#x8981;&#x7684;&#x63D2;&#x4EF6;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x6709;&#x9700;&#x8981;&#xFF0C;&#x5C31;&#x8BA4;&#x771F;&#x4E00;&#x70B9;&#x53BB;&#x5B98;&#x7F51;&#x4E0A;&#x770B;&#x770B;&#xFF0C;&#x6216;&#x8005;&#x81EA;&#x5DF1;&#x5199;&#x4E00;&#x4E2A;&#x8BA9;&#x5C0F;&#x7F16;&#x6211;see see&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jQuery动画效果、jQuery插件使用

## 原文链接
[https://segmentfault.com/a/1190000015880662](https://segmentfault.com/a/1190000015880662)

