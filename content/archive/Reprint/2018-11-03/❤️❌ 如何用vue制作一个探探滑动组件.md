---
title: ❤️❌ 如何用vue制作一个探探滑动组件
hidden: true
categories: reprint
slug: bccad607
date: 2018-11-03 02:30:13
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/remote/1460000013559744?w=887&amp;h=625" src="https://static.alili.tech/img/remote/1460000013559744?w=887&amp;h=625" alt="&#x6700;&#x7EC8;&#x6548;&#x679C;" title="&#x6700;&#x7EC8;&#x6548;&#x679C;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x55E8;&#xFF0C;&#x8BF4;&#x8D77;&#x63A2;&#x63A2;&#x60F3;&#x5FC5;&#x5404;&#x4F4D;&#x7A0B;&#x5E8F;&#x6C6A;&#x90FD;&#x4E0D;&#x964C;&#x751F;(&#x6BD5;&#x7ADF;&#x59B9;&#x5B50;&#x5F88;&#x591A;)&#xFF0C;&#x80FD;&#x5728;&#x4E0A;&#x9762;&#x4E1D;&#x6ED1;&#x7684;&#x7FFB;&#x724C;&#x5B50;&#xFF0C;&#x63A2;&#x63A2;&#x7684;&#x7684;&#x5806;&#x53E0;&#x6ED1;&#x52A8;&#x7EC4;&#x4EF6;&#x8D77;&#x5230;&#x4E86;&#x5173;&#x952E;&#x7684;&#x4F5C;&#x7528;&#xFF0C;&#x4E0B;&#x9762;&#x5C31;&#x6765;&#x770B;&#x770B;&#x5982;&#x4F55;&#x7528;vue&#x5199;&#x4E00;&#x4E2A;&#x63A2;&#x63A2;&#x7684;&#x5806;&#x53E0;&#x7EC4;&#x4EF6; ?</p><h2 id="articleHeader1">&#x4E00;. &#x529F;&#x80FD;&#x5206;&#x6790;</h2><p>&#x7B80;&#x5355;&#x4F7F;&#x7528;&#x4E0B;&#x63A2;&#x63A2;&#x4F1A;&#x53D1;&#x73B0;&#xFF0C;&#x5806;&#x53E0;&#x6ED1;&#x52A8;&#x7684;&#x529F;&#x80FD;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x7528;&#x4E00;&#x5F20;&#x56FE;&#x6982;&#x62EC;&#x5C31;&#x662F;:<br><span class="img-wrap"><img data-src="/img/remote/1460000013559745?w=886&amp;h=467" src="https://static.alili.tech/img/remote/1460000013559745?w=886&amp;h=467" alt="" title="" style="cursor:pointer"></span><br>&#x7B80;&#x5355;&#x5F52;&#x7EB3;&#x4E0B;&#x91CC;&#x9762;&#x5305;&#x542B;&#x7684;&#x57FA;&#x672C;&#x529F;&#x80FD;&#x70B9;:</p><ul><li>&#x56FE;&#x7247;&#x7684;&#x5806;&#x53E0;</li><li>&#x56FE;&#x7247;&#x7B2C;&#x4E00;&#x5F20;&#x7684;&#x6ED1;&#x52A8;</li><li>&#x6761;&#x4EF6;&#x6210;&#x529F;&#x540E;&#x7684;&#x6ED1;&#x51FA;&#xFF0C;&#x6761;&#x4EF6;&#x5931;&#x8D25;&#x540E;&#x7684;&#x56DE;&#x5F39;</li><li>&#x6ED1;&#x51FA;&#x540E;&#x4E0B;&#x4E00;&#x5F20;&#x56FE;&#x7247;&#x5806;&#x53E0;&#x5230;&#x9876;&#x90E8;</li></ul><p>&#x4F53;&#x9A8C;&#x4F18;&#x5316;</p><ul><li>&#x6839;&#x636E;&#x89E6;&#x6478;&#x70B9;&#x7684;&#x4E0D;&#x540C;&#xFF0C;&#x6ED1;&#x52A8;&#x65F6;&#x9996;&#x56FE;&#x6709;&#x4E0D;&#x540C;&#x89D2;&#x5EA6;&#x504F;&#x79FB;</li><li>&#x504F;&#x79FB;&#x9762;&#x79EF;&#x5224;&#x5B9A;&#x662F;&#x5426;&#x6210;&#x529F;&#x6ED1;&#x51FA;</li></ul><h2 id="articleHeader2">&#x4E8C;. &#x5177;&#x4F53;&#x5B9E;&#x73B0;</h2><p>&#x6709;&#x4E86;&#x5F52;&#x7EB3;&#x597D;&#x7684;&#x529F;&#x80FD;&#x70B9;&#xFF0C;&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x7EC4;&#x4EF6;&#x7684;&#x601D;&#x8DEF;&#x4F1A;&#x66F4;&#x6E05;&#x6670;</p><h3 id="articleHeader3">1. &#x5806;&#x53E0;&#x6548;&#x679C;</h3><p>&#x5806;&#x53E0;&#x56FE;&#x7247;&#x6548;&#x679C;&#x5728;&#x7F51;&#x4E0A;&#x6709;&#x5927;&#x91CF;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x5B9E;&#x73B0;&#x7684;&#x65B9;&#x6CD5;&#x5927;&#x540C;&#x5C0F;&#x5F02;&#xFF0C;&#x4E3B;&#x8981;&#x901A;&#x8FC7;&#x5728;&#x7236;&#x5C42;&#x8BBE;&#x5B9A;<a href="http://www.w3school.com.cn/cssref/pr_perspective.asp" rel="nofollow noreferrer" target="_blank">perspective</a>&#x53CA;<a href="http://www.w3school.com.cn/cssref/pr_perspective-origin.asp" rel="nofollow noreferrer" target="_blank">perspective-origin</a>&#xFF0C;&#x6765;&#x5B9E;&#x73B0;&#x5B50;&#x5C42;&#x7684;&#x900F;&#x89C6;&#xFF0C;&#x5B50;&#x5C42;&#x8BBE;&#x5B9A;&#x597D;translate3d Z&#x8F74;&#x6570;&#x503C;&#x5373;&#x53EF;&#x6A21;&#x62DF;&#x51FA;&#x5806;&#x53E0;&#x6548;&#x679C;&#xFF0C;&#x5177;&#x4F53;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x56FE;&#x7247;&#x5806;&#x53E0;dom
 &lt;!--opacity: 0 &#x9690;&#x85CF;&#x6211;&#x4EEC;&#x4E0D;&#x60F3;&#x770B;&#x5230;&#x7684;stack-item&#x5C42;&#x7EA7;--&gt;
 &lt;!--z-index: -1 &#x8C03;&#x6574;stack-item&#x5C42;&#x7EA7;&quot;--&gt;
&lt;ul class=&quot;stack&quot;&gt;
 &lt;li class=&quot;stack-item&quot; style=&quot;transform: translate3d(0px, 0px, 0px);opacity: 1;z-index: 10;&quot;&gt;&lt;img src=&quot;1.png&quot; alt=&quot;01&quot;&gt;&lt;/li&gt;
 &lt;li class=&quot;stack-item&quot; style=&quot;transform: translate3d(0px, 0px, -60px);opacity: 1;z-index: 1&quot;&gt;&lt;img src=&quot;2.png&quot; alt=&quot;02&quot;&gt;&lt;/li&gt;
 &lt;li class=&quot;stack-item&quot; style=&quot;transform: translate3d(0px, 0px, -120px);opacity: 1;z-index: 1&quot;&gt;&lt;img src=&quot;3.png&quot; alt=&quot;03&quot;&gt;&lt;/li&gt;
 &lt;li class=&quot;stack-item&quot; style=&quot;transform: translate3d(0px, 0px, -180px);opacity: 0;z-index: -1&quot;&gt;&lt;img src=&quot;4.png&quot; alt=&quot;04&quot;&gt;&lt;/li&gt;
 &lt;li class=&quot;stack-item&quot; style=&quot;transform: translate3d(0px, 0px, -180px);opacity: 0;z-index: -1&quot;&gt;&lt;img src=&quot;5.png&quot; alt=&quot;05&quot;&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;style&gt;
.stack {
    width: 100%;
    height: 100%;
    position: relative;
    perspective: 1000px; //&#x5B50;&#x5143;&#x7D20;&#x89C6;&#x8DDD;
    perspective-origin: 50% 150%; //&#x5B50;&#x5143;&#x7D20;&#x900F;&#x89C6;&#x4F4D;&#x7F6E;
    -webkit-perspective: 1000px;
    -webkit-perspective-origin: 50% 150%;
    margin: 0;
    padding: 0;
  }
  .stack-item{
    background: #fff;
    height: 100%;
    width: 100%;
    border-radius: 4px;
    text-align: center;
    overflow: hidden;
  }
  .stack-item img {
    width: 100%;
    display: block;
    pointer-events: none;
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>// &#x56FE;&#x7247;&#x5806;&#x53E0;dom
 <span class="hljs-comment">&lt;!--opacity: 0 &#x9690;&#x85CF;&#x6211;&#x4EEC;&#x4E0D;&#x60F3;&#x770B;&#x5230;&#x7684;stack-item&#x5C42;&#x7EA7;--&gt;</span>
 <span class="hljs-comment">&lt;!--z-index: -1 &#x8C03;&#x6574;stack-item&#x5C42;&#x7EA7;&quot;--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;stack&quot;</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;stack-item&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;transform: translate3d(0px, 0px, 0px);opacity: 1;z-index: 10;&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;1.png&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;01&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;stack-item&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;transform: translate3d(0px, 0px, -60px);opacity: 1;z-index: 1&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;2.png&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;02&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;stack-item&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;transform: translate3d(0px, 0px, -120px);opacity: 1;z-index: 1&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;3.png&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;03&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;stack-item&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;transform: translate3d(0px, 0px, -180px);opacity: 0;z-index: -1&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;4.png&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;04&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;stack-item&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;transform: translate3d(0px, 0px, -180px);opacity: 0;z-index: -1&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;5.png&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;05&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
.stack {
    width: 100%;
    height: 100%;
    position: relative;
    perspective: 1000px; //&#x5B50;&#x5143;&#x7D20;&#x89C6;&#x8DDD;
    perspective-origin: 50% 150%; //&#x5B50;&#x5143;&#x7D20;&#x900F;&#x89C6;&#x4F4D;&#x7F6E;
    -webkit-perspective: 1000px;
    -webkit-perspective-origin: 50% 150%;
    margin: 0;
    padding: 0;
  }
  .stack-item{
    background: #fff;
    height: 100%;
    width: 100%;
    border-radius: 4px;
    text-align: center;
    overflow: hidden;
  }
  .stack-item img {
    width: 100%;
    display: block;
    pointer-events: none;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><p>&#x4E0A;&#x9762;&#x53EA;&#x662F;&#x4E00;&#x7EC4;&#x9759;&#x6001;&#x4EE3;&#x7801;&#xFF0C;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x5F97;&#x5230;&#x7684;&#x662F;vue&#x7EC4;&#x4EF6;&#xFF0C;&#x6240;&#x4EE5;&#x9700;&#x8981;&#x5148;&#x5EFA;&#x7ACB;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x6A21;&#x677F;stack.vue&#xFF0C;&#x5728;&#x6A21;&#x677F;&#x4E2D;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;v-for&#xFF0C;&#x904D;&#x5386;&#x51FA;stack&#x8282;&#x70B9;&#xFF0C;&#x4F7F;&#x7528;:style &#x6765;&#x4FEE;&#x6539;&#x5404;&#x4E2A;item&#x7684;style&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;ul class=&quot;stack&quot;&gt;
      &lt;li class=&quot;stack-item&quot; v-for=&quot;(item, index) in pages&quot; :style=&quot;[transform(index)]&quot;&gt;
        &lt;img :src=&quot;item.src&quot;&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  props: {
    // pages&#x6570;&#x636E;&#x5305;&#x542B;&#x57FA;&#x7840;&#x7684;&#x56FE;&#x7247;&#x6570;&#x636E;
    pages: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      // basicdata&#x6570;&#x636E;&#x5305;&#x542B;&#x7EC4;&#x4EF6;&#x57FA;&#x672C;&#x6570;&#x636E;
      basicdata: {
        currentPage: 0 // &#x9ED8;&#x8BA4;&#x9996;&#x56FE;&#x7684;&#x5E8F;&#x5217;
      },
      // temporaryData&#x6570;&#x636E;&#x5305;&#x542B;&#x7EC4;&#x4EF6;&#x4E34;&#x65F6;&#x6570;&#x636E;
      temporaryData: {
        opacity: 1, // &#x8BB0;&#x5F55;opacity
        zIndex: 10, // &#x8BB0;&#x5F55;zIndex
        visible: 3 // &#x8BB0;&#x5F55;&#x9ED8;&#x8BA4;&#x663E;&#x793A;&#x5806;&#x53E0;&#x6570;visible
      }
    }
  },
  methods: {
    // &#x904D;&#x5386;&#x6837;&#x5F0F;
    transform (index) {
      if (index &gt;= this.basicdata.currentPage) {
        let style = {}
        let visible = this.temporaryData.visible
        let perIndex = index - this.basicdata.currentPage
        // visible&#x53EF;&#x89C1;&#x6570;&#x91CF;&#x524D;&#x6ED1;&#x5757;&#x7684;&#x6837;&#x5F0F;
        if (index &lt;= this.basicdata.currentPage + visible - 1) {
          style[&apos;opacity&apos;] = &apos;1&apos;
          style[&apos;transform&apos;] = &apos;translate3D(0,0,&apos; + -1 * perIndex * 60 + &apos;px&apos; + &apos;)&apos;
          style[&apos;zIndex&apos;] = visible - index + this.basicdata.currentPage
          style[&apos;transitionTimingFunction&apos;] = &apos;ease&apos;
          style[&apos;transitionDuration&apos;] = 300 + &apos;ms&apos;
        } else {
          style[&apos;zIndex&apos;] = &apos;-1&apos;
          style[&apos;transform&apos;] = &apos;translate3D(0,0,&apos; + -1 * visible * 60 + &apos;px&apos; + &apos;)&apos;
        }
        return style
      }
    }
  }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;stack&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;stack-item&quot;</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(item, index) in pages&quot;</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;[transform(index)]&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">&quot;item.src&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: {
    <span class="hljs-comment">// pages&#x6570;&#x636E;&#x5305;&#x542B;&#x57FA;&#x7840;&#x7684;&#x56FE;&#x7247;&#x6570;&#x636E;</span>
    pages: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Array</span>,
      <span class="hljs-attr">default</span>: []
    }
  },
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-comment">// basicdata&#x6570;&#x636E;&#x5305;&#x542B;&#x7EC4;&#x4EF6;&#x57FA;&#x672C;&#x6570;&#x636E;</span>
      basicdata: {
        <span class="hljs-attr">currentPage</span>: <span class="hljs-number">0</span> <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x9996;&#x56FE;&#x7684;&#x5E8F;&#x5217;</span>
      },
      <span class="hljs-comment">// temporaryData&#x6570;&#x636E;&#x5305;&#x542B;&#x7EC4;&#x4EF6;&#x4E34;&#x65F6;&#x6570;&#x636E;</span>
      temporaryData: {
        <span class="hljs-attr">opacity</span>: <span class="hljs-number">1</span>, <span class="hljs-comment">// &#x8BB0;&#x5F55;opacity</span>
        zIndex: <span class="hljs-number">10</span>, <span class="hljs-comment">// &#x8BB0;&#x5F55;zIndex</span>
        visible: <span class="hljs-number">3</span> <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x9ED8;&#x8BA4;&#x663E;&#x793A;&#x5806;&#x53E0;&#x6570;visible</span>
      }
    }
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-comment">// &#x904D;&#x5386;&#x6837;&#x5F0F;</span>
    transform (index) {
      <span class="hljs-keyword">if</span> (index &gt;= <span class="hljs-keyword">this</span>.basicdata.currentPage) {
        <span class="hljs-keyword">let</span> style = {}
        <span class="hljs-keyword">let</span> visible = <span class="hljs-keyword">this</span>.temporaryData.visible
        <span class="hljs-keyword">let</span> perIndex = index - <span class="hljs-keyword">this</span>.basicdata.currentPage
        <span class="hljs-comment">// visible&#x53EF;&#x89C1;&#x6570;&#x91CF;&#x524D;&#x6ED1;&#x5757;&#x7684;&#x6837;&#x5F0F;</span>
        <span class="hljs-keyword">if</span> (index &lt;= <span class="hljs-keyword">this</span>.basicdata.currentPage + visible - <span class="hljs-number">1</span>) {
          style[<span class="hljs-string">&apos;opacity&apos;</span>] = <span class="hljs-string">&apos;1&apos;</span>
          style[<span class="hljs-string">&apos;transform&apos;</span>] = <span class="hljs-string">&apos;translate3D(0,0,&apos;</span> + <span class="hljs-number">-1</span> * perIndex * <span class="hljs-number">60</span> + <span class="hljs-string">&apos;px&apos;</span> + <span class="hljs-string">&apos;)&apos;</span>
          style[<span class="hljs-string">&apos;zIndex&apos;</span>] = visible - index + <span class="hljs-keyword">this</span>.basicdata.currentPage
          style[<span class="hljs-string">&apos;transitionTimingFunction&apos;</span>] = <span class="hljs-string">&apos;ease&apos;</span>
          style[<span class="hljs-string">&apos;transitionDuration&apos;</span>] = <span class="hljs-number">300</span> + <span class="hljs-string">&apos;ms&apos;</span>
        } <span class="hljs-keyword">else</span> {
          style[<span class="hljs-string">&apos;zIndex&apos;</span>] = <span class="hljs-string">&apos;-1&apos;</span>
          style[<span class="hljs-string">&apos;transform&apos;</span>] = <span class="hljs-string">&apos;translate3D(0,0,&apos;</span> + <span class="hljs-number">-1</span> * visible * <span class="hljs-number">60</span> + <span class="hljs-string">&apos;px&apos;</span> + <span class="hljs-string">&apos;)&apos;</span>
        }
        <span class="hljs-keyword">return</span> style
      }
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><h4>&#x5173;&#x952E;&#x70B9;</h4><ul><li><a href="https://cn.vuejs.org/v2/guide/class-and-style.html#ad" rel="nofollow noreferrer" target="_blank">:style</a>&#x53EF;&#x4EE5;&#x7ED1;&#x5B9A;&#x5BF9;&#x8C61;&#x7684;&#x540C;&#x65F6;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x7ED1;&#x5B9A;&#x6570;&#x7EC4;&#x548C;&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x5728;&#x904D;&#x5386;&#x7684;&#x65F6;&#x5019;&#x5F88;&#x6709;&#x7528;</li></ul><p>&#x6700;&#x57FA;&#x672C;&#x7684;dom&#x7ED3;&#x6784;&#x5DF2;&#x7ECF;&#x6784;&#x5EFA;&#x5B8C;&#x6BD5;&#xFF0C;&#x4E0B;&#x4E00;&#x6B65;&#x662F;&#x8BA9;&#x9996;&#x5F20;&#x56FE;&#x7247;&#x201C;&#x52A8;&#x201D;&#x8D77;&#x6765;</p><h3 id="articleHeader4">2. &#x56FE;&#x7247;&#x6ED1;&#x52A8;</h3><p>&#x56FE;&#x7247;&#x6ED1;&#x52A8;&#x6548;&#x679C;&#xFF0C;&#x5728;&#x5F88;&#x591A;&#x573A;&#x666F;&#x4E2D;&#x90FD;&#x6709;&#x51FA;&#x73B0;&#xFF0C;&#x5176;&#x539F;&#x7406;&#x65E0;&#x975E;&#x662F;&#x76D1;&#x542C;touchs&#x4E8B;&#x4EF6;&#xFF0C;&#x5F97;&#x5230;&#x4F4D;&#x79FB;&#xFF0C;&#x518D;&#x901A;&#x8FC7;translate3D&#x6539;&#x53D8;&#x76EE;&#x6807;&#x4F4D;&#x79FB;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x8981;&#x5B9E;&#x73B0;&#x7684;&#x6B65;&#x9AA4;&#x5982;&#x4E0B;</p><ul><li>&#x5BF9;stack&#x8FDB;&#x884C;touchs&#x4E8B;&#x4EF6;&#x7684;&#x7ED1;&#x5B9A;</li><li>&#x76D1;&#x542C;&#x5E76;&#x50A8;&#x5B58;&#x624B;&#x52BF;&#x4F4D;&#x7F6E;&#x53D8;&#x5316;&#x7684;&#x6570;&#x503C;</li><li>&#x6539;&#x53D8;&#x9996;&#x56FE;css&#x5C5E;&#x6027;&#x4E2D;translate3D&#x7684;x&#xFF0C;y&#x503C;</li></ul><h4>&#x5177;&#x4F53;&#x5B9E;&#x73B0;</h4><p>&#x5728;vue&#x6846;&#x67B6;&#x4E2D;&#xFF0C;&#x4E0D;&#x5EFA;&#x8BAE;&#x76F4;&#x63A5;&#x64CD;&#x4F5C;&#x8282;&#x70B9;&#xFF0C;&#x800C;&#x662F;&#x901A;&#x8FC7;&#x6307;&#x4EE4;v-on&#x5BF9;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x7ED1;&#x5B9A;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x5C06;&#x7ED1;&#x5B9A;&#x90FD;&#x5199;&#x5728;v-for&#x904D;&#x5386;&#x91CC;&#xFF0C;&#x901A;&#x8FC7;index&#x8FDB;&#x884C;&#x5224;&#x65AD;&#x5176;&#x662F;&#x5426;&#x662F;&#x9996;&#x56FE;&#xFF0C;&#x518D;&#x4F7F;&#x7528;:style&#x4FEE;&#x6539;&#x9996;&#x9875;&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x5177;&#x4F53;&#x4EE3;&#x7801;&#x5982;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;ul class=&quot;stack&quot;&gt;
      &lt;li class=&quot;stack-item&quot; v-for=&quot;(item, index) in pages&quot;
      :style=&quot;[transformIndex(index),transform(index)]&quot;
      @touchstart.stop.capture=&quot;touchstart&quot;
      @touchmove.stop.capture=&quot;touchmove&quot;
      @touchend.stop.capture=&quot;touchend&quot;
      @mousedown.stop.capture=&quot;touchstart&quot;
      @mouseup.stop.capture=&quot;touchend&quot;
      @mousemove.stop.capture=&quot;touchmove&quot;&gt;
        &lt;img :src=&quot;item.src&quot;&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  props: {
    // pages&#x6570;&#x636E;&#x5305;&#x542B;&#x57FA;&#x7840;&#x7684;&#x56FE;&#x7247;&#x6570;&#x636E;
    pages: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      // basicdata&#x6570;&#x636E;&#x5305;&#x542B;&#x7EC4;&#x4EF6;&#x57FA;&#x672C;&#x6570;&#x636E;
      basicdata: {
        start: {}, // &#x8BB0;&#x5F55;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;
        end: {}, // &#x8BB0;&#x5F55;&#x7EC8;&#x70B9;&#x4F4D;&#x7F6E;
        currentPage: 0 // &#x9ED8;&#x8BA4;&#x9996;&#x56FE;&#x7684;&#x5E8F;&#x5217;
      },
      // temporaryData&#x6570;&#x636E;&#x5305;&#x542B;&#x7EC4;&#x4EF6;&#x4E34;&#x65F6;&#x6570;&#x636E;
      temporaryData: {
        poswidth: &apos;&apos;, // &#x8BB0;&#x5F55;&#x4F4D;&#x79FB;
        posheight: &apos;&apos;, // &#x8BB0;&#x5F55;&#x4F4D;&#x79FB;
        tracking: false // &#x662F;&#x5426;&#x5728;&#x6ED1;&#x52A8;&#xFF0C;&#x9632;&#x6B62;&#x591A;&#x6B21;&#x64CD;&#x4F5C;&#xFF0C;&#x5F71;&#x54CD;&#x4F53;&#x9A8C;
      }
    }
  },
  methods: {
    touchstart (e) {
      if (this.temporaryData.tracking) {
        return
      }
      // &#x662F;&#x5426;&#x4E3A;touch
      if (e.type === &apos;touchstart&apos;) {
        if (e.touches.length &gt; 1) {
          this.temporaryData.tracking = false
          return
        } else {
          // &#x8BB0;&#x5F55;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;
          this.basicdata.start.t = new Date().getTime()
          this.basicdata.start.x = e.targetTouches[0].clientX
          this.basicdata.start.y = e.targetTouches[0].clientY
          this.basicdata.end.x = e.targetTouches[0].clientX
          this.basicdata.end.y = e.targetTouches[0].clientY
        }
      // pc&#x64CD;&#x4F5C;
      } else {
        this.basicdata.start.t = new Date().getTime()
        this.basicdata.start.x = e.clientX
        this.basicdata.start.y = e.clientY
        this.basicdata.end.x = e.clientX
        this.basicdata.end.y = e.clientY
      }
      this.temporaryData.tracking = true
    },
    touchmove (e) {
      // &#x8BB0;&#x5F55;&#x6ED1;&#x52A8;&#x4F4D;&#x7F6E;
      if (this.temporaryData.tracking &amp;&amp; !this.temporaryData.animation) {
        if (e.type === &apos;touchmove&apos;) {
          this.basicdata.end.x = e.targetTouches[0].clientX
          this.basicdata.end.y = e.targetTouches[0].clientY
        } else {
          this.basicdata.end.x = e.clientX
          this.basicdata.end.y = e.clientY
        }
        // &#x8BA1;&#x7B97;&#x6ED1;&#x52A8;&#x503C;
        this.temporaryData.poswidth = this.basicdata.end.x - this.basicdata.start.x
        this.temporaryData.posheight = this.basicdata.end.y - this.basicdata.start.y
      }
    },
    touchend (e) {
      this.temporaryData.tracking = false
      // &#x6ED1;&#x52A8;&#x7ED3;&#x675F;&#xFF0C;&#x89E6;&#x53D1;&#x5224;&#x65AD;
    },
    // &#x975E;&#x9996;&#x9875;&#x6837;&#x5F0F;&#x5207;&#x6362;
    transform (index) {
      if (index &gt; this.basicdata.currentPage) {
        let style = {}
        let visible = 3
        let perIndex = index - this.basicdata.currentPage
        // visible&#x53EF;&#x89C1;&#x6570;&#x91CF;&#x524D;&#x6ED1;&#x5757;&#x7684;&#x6837;&#x5F0F;
        if (index &lt;= this.basicdata.currentPage + visible - 1) {
          style[&apos;opacity&apos;] = &apos;1&apos;
          style[&apos;transform&apos;] = &apos;translate3D(0,0,&apos; + -1 * perIndex * 60 + &apos;px&apos; + &apos;)&apos;
          style[&apos;zIndex&apos;] = visible - index + this.basicdata.currentPage
          style[&apos;transitionTimingFunction&apos;] = &apos;ease&apos;
          style[&apos;transitionDuration&apos;] = 300 + &apos;ms&apos;
        } else {
          style[&apos;zIndex&apos;] = &apos;-1&apos;
          style[&apos;transform&apos;] = &apos;translate3D(0,0,&apos; + -1 * visible * 60 + &apos;px&apos; + &apos;)&apos;
        }
        return style
      }
    },
    // &#x9996;&#x9875;&#x6837;&#x5F0F;&#x5207;&#x6362;
    transformIndex (index) {
      // &#x5904;&#x7406;3D&#x6548;&#x679C;
      if (index === this.basicdata.currentPage) {
        let style = {}
        style[&apos;transform&apos;] = &apos;translate3D(&apos; + this.temporaryData.poswidth + &apos;px&apos; + &apos;,&apos; + this.temporaryData.posheight + &apos;px&apos; + &apos;,0px)&apos;
        style[&apos;opacity&apos;] = 1
        style[&apos;zIndex&apos;] = 10
        return style
      }
    }
  }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code>&lt;<span class="hljs-keyword">template</span>&gt;
    &lt;ul <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;stack&quot;</span>&gt;
      &lt;li <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;stack-item&quot;</span> v-<span class="hljs-built_in">for</span>=<span class="hljs-string">&quot;(item, index) in pages&quot;</span>
      :style=<span class="hljs-string">&quot;[transformIndex(index),transform(index)]&quot;</span>
      @touchstart.<span class="hljs-built_in">stop</span>.capture=<span class="hljs-string">&quot;touchstart&quot;</span>
      @touchmove.<span class="hljs-built_in">stop</span>.capture=<span class="hljs-string">&quot;touchmove&quot;</span>
      @touchend.<span class="hljs-built_in">stop</span>.capture=<span class="hljs-string">&quot;touchend&quot;</span>
      @mousedown.<span class="hljs-built_in">stop</span>.capture=<span class="hljs-string">&quot;touchstart&quot;</span>
      @mouseup.<span class="hljs-built_in">stop</span>.capture=<span class="hljs-string">&quot;touchend&quot;</span>
      @mousemove.<span class="hljs-built_in">stop</span>.capture=<span class="hljs-string">&quot;touchmove&quot;</span>&gt;
        &lt;img :src=<span class="hljs-string">&quot;item.src&quot;</span>&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
&lt;/<span class="hljs-keyword">template</span>&gt;
&lt;script&gt;
<span class="hljs-keyword">export</span> <span class="hljs-built_in">default</span> {
  props: {
    <span class="hljs-comment">// pages&#x6570;&#x636E;&#x5305;&#x542B;&#x57FA;&#x7840;&#x7684;&#x56FE;&#x7247;&#x6570;&#x636E;</span>
    pages: {
      type: Array,
      <span class="hljs-built_in">default</span>: []
    }
  },
  data () {
    <span class="hljs-built_in">return</span> {
      <span class="hljs-comment">// basicdata&#x6570;&#x636E;&#x5305;&#x542B;&#x7EC4;&#x4EF6;&#x57FA;&#x672C;&#x6570;&#x636E;</span>
      basicdata: {
        start: {}, <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;</span>
        <span class="hljs-built_in">end</span>: {}, <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x7EC8;&#x70B9;&#x4F4D;&#x7F6E;</span>
        currentPage: <span class="hljs-number">0</span> <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x9996;&#x56FE;&#x7684;&#x5E8F;&#x5217;</span>
      },
      <span class="hljs-comment">// temporaryData&#x6570;&#x636E;&#x5305;&#x542B;&#x7EC4;&#x4EF6;&#x4E34;&#x65F6;&#x6570;&#x636E;</span>
      temporaryData: {
        poswidth: <span class="hljs-string">&apos;&apos;</span>, <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x4F4D;&#x79FB;</span>
        posheight: <span class="hljs-string">&apos;&apos;</span>, <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x4F4D;&#x79FB;</span>
        tracking: false <span class="hljs-comment">// &#x662F;&#x5426;&#x5728;&#x6ED1;&#x52A8;&#xFF0C;&#x9632;&#x6B62;&#x591A;&#x6B21;&#x64CD;&#x4F5C;&#xFF0C;&#x5F71;&#x54CD;&#x4F53;&#x9A8C;</span>
      }
    }
  },
  methods: {
    touchstart (e) {
      <span class="hljs-built_in">if</span> (<span class="hljs-keyword">this</span>.temporaryData.tracking) {
        <span class="hljs-built_in">return</span>
      }
      <span class="hljs-comment">// &#x662F;&#x5426;&#x4E3A;touch</span>
      <span class="hljs-built_in">if</span> (e.type === <span class="hljs-string">&apos;touchstart&apos;</span>) {
        <span class="hljs-built_in">if</span> (e.touches.length &gt; <span class="hljs-number">1</span>) {
          <span class="hljs-keyword">this</span>.temporaryData.tracking = false
          <span class="hljs-built_in">return</span>
        } <span class="hljs-built_in">else</span> {
          <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;</span>
          <span class="hljs-keyword">this</span>.basicdata.start.t = <span class="hljs-keyword">new</span> Date().getTime()
          <span class="hljs-keyword">this</span>.basicdata.start.x = e.targetTouches[<span class="hljs-number">0</span>].clientX
          <span class="hljs-keyword">this</span>.basicdata.start.y = e.targetTouches[<span class="hljs-number">0</span>].clientY
          <span class="hljs-keyword">this</span>.basicdata.<span class="hljs-built_in">end</span>.x = e.targetTouches[<span class="hljs-number">0</span>].clientX
          <span class="hljs-keyword">this</span>.basicdata.<span class="hljs-built_in">end</span>.y = e.targetTouches[<span class="hljs-number">0</span>].clientY
        }
      <span class="hljs-comment">// pc&#x64CD;&#x4F5C;</span>
      } <span class="hljs-built_in">else</span> {
        <span class="hljs-keyword">this</span>.basicdata.start.t = <span class="hljs-keyword">new</span> Date().getTime()
        <span class="hljs-keyword">this</span>.basicdata.start.x = e.clientX
        <span class="hljs-keyword">this</span>.basicdata.start.y = e.clientY
        <span class="hljs-keyword">this</span>.basicdata.<span class="hljs-built_in">end</span>.x = e.clientX
        <span class="hljs-keyword">this</span>.basicdata.<span class="hljs-built_in">end</span>.y = e.clientY
      }
      <span class="hljs-keyword">this</span>.temporaryData.tracking = true
    },
    touchmove (e) {
      <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x6ED1;&#x52A8;&#x4F4D;&#x7F6E;</span>
      <span class="hljs-built_in">if</span> (<span class="hljs-keyword">this</span>.temporaryData.tracking &amp;&amp; !<span class="hljs-keyword">this</span>.temporaryData.animation) {
        <span class="hljs-built_in">if</span> (e.type === <span class="hljs-string">&apos;touchmove&apos;</span>) {
          <span class="hljs-keyword">this</span>.basicdata.<span class="hljs-built_in">end</span>.x = e.targetTouches[<span class="hljs-number">0</span>].clientX
          <span class="hljs-keyword">this</span>.basicdata.<span class="hljs-built_in">end</span>.y = e.targetTouches[<span class="hljs-number">0</span>].clientY
        } <span class="hljs-built_in">else</span> {
          <span class="hljs-keyword">this</span>.basicdata.<span class="hljs-built_in">end</span>.x = e.clientX
          <span class="hljs-keyword">this</span>.basicdata.<span class="hljs-built_in">end</span>.y = e.clientY
        }
        <span class="hljs-comment">// &#x8BA1;&#x7B97;&#x6ED1;&#x52A8;&#x503C;</span>
        <span class="hljs-keyword">this</span>.temporaryData.poswidth = <span class="hljs-keyword">this</span>.basicdata.<span class="hljs-built_in">end</span>.x - <span class="hljs-keyword">this</span>.basicdata.start.x
        <span class="hljs-keyword">this</span>.temporaryData.posheight = <span class="hljs-keyword">this</span>.basicdata.<span class="hljs-built_in">end</span>.y - <span class="hljs-keyword">this</span>.basicdata.start.y
      }
    },
    touchend (e) {
      <span class="hljs-keyword">this</span>.temporaryData.tracking = false
      <span class="hljs-comment">// &#x6ED1;&#x52A8;&#x7ED3;&#x675F;&#xFF0C;&#x89E6;&#x53D1;&#x5224;&#x65AD;</span>
    },
    <span class="hljs-comment">// &#x975E;&#x9996;&#x9875;&#x6837;&#x5F0F;&#x5207;&#x6362;</span>
    transform (index) {
      <span class="hljs-built_in">if</span> (index &gt; <span class="hljs-keyword">this</span>.basicdata.currentPage) {
        let style = {}
        let visible = <span class="hljs-number">3</span>
        let perIndex = index - <span class="hljs-keyword">this</span>.basicdata.currentPage
        <span class="hljs-comment">// visible&#x53EF;&#x89C1;&#x6570;&#x91CF;&#x524D;&#x6ED1;&#x5757;&#x7684;&#x6837;&#x5F0F;</span>
        <span class="hljs-built_in">if</span> (index &lt;= <span class="hljs-keyword">this</span>.basicdata.currentPage + visible - <span class="hljs-number">1</span>) {
          style[<span class="hljs-string">&apos;opacity&apos;</span>] = <span class="hljs-string">&apos;1&apos;</span>
          style[<span class="hljs-string">&apos;transform&apos;</span>] = <span class="hljs-string">&apos;translate3D(0,0,&apos;</span> + <span class="hljs-number">-1</span> * perIndex * <span class="hljs-number">60</span> + <span class="hljs-string">&apos;px&apos;</span> + <span class="hljs-string">&apos;)&apos;</span>
          style[<span class="hljs-string">&apos;zIndex&apos;</span>] = visible - index + <span class="hljs-keyword">this</span>.basicdata.currentPage
          style[<span class="hljs-string">&apos;transitionTimingFunction&apos;</span>] = <span class="hljs-string">&apos;ease&apos;</span>
          style[<span class="hljs-string">&apos;transitionDuration&apos;</span>] = <span class="hljs-number">300</span> + <span class="hljs-string">&apos;ms&apos;</span>
        } <span class="hljs-built_in">else</span> {
          style[<span class="hljs-string">&apos;zIndex&apos;</span>] = <span class="hljs-string">&apos;-1&apos;</span>
          style[<span class="hljs-string">&apos;transform&apos;</span>] = <span class="hljs-string">&apos;translate3D(0,0,&apos;</span> + <span class="hljs-number">-1</span> * visible * <span class="hljs-number">60</span> + <span class="hljs-string">&apos;px&apos;</span> + <span class="hljs-string">&apos;)&apos;</span>
        }
        <span class="hljs-built_in">return</span> style
      }
    },
    <span class="hljs-comment">// &#x9996;&#x9875;&#x6837;&#x5F0F;&#x5207;&#x6362;</span>
    transformIndex (index) {
      <span class="hljs-comment">// &#x5904;&#x7406;3D&#x6548;&#x679C;</span>
      <span class="hljs-built_in">if</span> (index === <span class="hljs-keyword">this</span>.basicdata.currentPage) {
        let style = {}
        style[<span class="hljs-string">&apos;transform&apos;</span>] = <span class="hljs-string">&apos;translate3D(&apos;</span> + <span class="hljs-keyword">this</span>.temporaryData.poswidth + <span class="hljs-string">&apos;px&apos;</span> + <span class="hljs-string">&apos;,&apos;</span> + <span class="hljs-keyword">this</span>.temporaryData.posheight + <span class="hljs-string">&apos;px&apos;</span> + <span class="hljs-string">&apos;,0px)&apos;</span>
        style[<span class="hljs-string">&apos;opacity&apos;</span>] = <span class="hljs-number">1</span>
        style[<span class="hljs-string">&apos;zIndex&apos;</span>] = <span class="hljs-number">10</span>
        <span class="hljs-built_in">return</span> style
      }
    }
  }
}
&lt;/script&gt;</code></pre><h3 id="articleHeader5">3. &#x6761;&#x4EF6;&#x6210;&#x529F;&#x540E;&#x7684;&#x6ED1;&#x51FA;&#xFF0C;&#x6761;&#x4EF6;&#x5931;&#x8D25;&#x540E;&#x7684;&#x56DE;&#x5F39;</h3><p>&#x6761;&#x4EF6;&#x7684;&#x89E6;&#x53D1;&#x5224;&#x65AD;&#x662F;&#x5728;touchend/mouseup&#x540E;&#x8FDB;&#x884C;&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x5148;&#x7528;&#x7B80;&#x5355;&#x7684;&#x6761;&#x4EF6;&#x8FDB;&#x884C;&#x5224;&#x5B9A;&#xFF0C;&#x540C;&#x65F6;&#x7ED9;&#x4E88;&#x9996;&#x56FE;&#x5F39;&#x51FA;&#x53CA;&#x56DE;&#x5F39;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;ul class=&quot;stack&quot;&gt;
      &lt;li class=&quot;stack-item&quot; v-for=&quot;(item, index) in pages&quot;
      :style=&quot;[transformIndex(index),transform(index)]&quot;
      @touchmove.stop.capture=&quot;touchmove&quot;
      @touchstart.stop.capture=&quot;touchstart&quot;
      @touchend.stop.capture=&quot;touchend&quot;
      @mousedown.stop.capture=&quot;touchstart&quot;
      @mouseup.stop.capture=&quot;touchend&quot;
      @mousemove.stop.capture=&quot;touchmove&quot;&gt;
        &lt;img :src=&quot;item.src&quot;&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  props: {
     // pages&#x6570;&#x636E;&#x5305;&#x542B;&#x57FA;&#x7840;&#x7684;&#x56FE;&#x7247;&#x6570;&#x636E;
    pages: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      // basicdata&#x6570;&#x636E;&#x5305;&#x542B;&#x7EC4;&#x4EF6;&#x57FA;&#x672C;&#x6570;&#x636E;
      basicdata: {
        start: {}, // &#x8BB0;&#x5F55;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;
        end: {}, // &#x8BB0;&#x5F55;&#x7EC8;&#x70B9;&#x4F4D;&#x7F6E;
        currentPage: 0 // &#x9ED8;&#x8BA4;&#x9996;&#x56FE;&#x7684;&#x5E8F;&#x5217;
      },
      // temporaryData&#x6570;&#x636E;&#x5305;&#x542B;&#x7EC4;&#x4EF6;&#x4E34;&#x65F6;&#x6570;&#x636E;
      temporaryData: {
        poswidth: &apos;&apos;, // &#x8BB0;&#x5F55;&#x4F4D;&#x79FB;
        posheight: &apos;&apos;, // &#x8BB0;&#x5F55;&#x4F4D;&#x79FB;
        tracking: false, // &#x662F;&#x5426;&#x5728;&#x6ED1;&#x52A8;&#xFF0C;&#x9632;&#x6B62;&#x591A;&#x6B21;&#x64CD;&#x4F5C;&#xFF0C;&#x5F71;&#x54CD;&#x4F53;&#x9A8C;
        animation: false, // &#x9996;&#x56FE;&#x662F;&#x5426;&#x542F;&#x7528;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&#x5426;
        opacity: 1 // &#x8BB0;&#x5F55;&#x9996;&#x56FE;&#x900F;&#x660E;&#x5EA6;
      }
    }
  },
  methods: {
    touchstart (e) {
      if (this.temporaryData.tracking) {
        return
      }
      // &#x662F;&#x5426;&#x4E3A;touch
      if (e.type === &apos;touchstart&apos;) {
        if (e.touches.length &gt; 1) {
          this.temporaryData.tracking = false
          return
        } else {
          // &#x8BB0;&#x5F55;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;
          this.basicdata.start.t = new Date().getTime()
          this.basicdata.start.x = e.targetTouches[0].clientX
          this.basicdata.start.y = e.targetTouches[0].clientY
          this.basicdata.end.x = e.targetTouches[0].clientX
          this.basicdata.end.y = e.targetTouches[0].clientY
        }
      // pc&#x64CD;&#x4F5C;
      } else {
        this.basicdata.start.t = new Date().getTime()
        this.basicdata.start.x = e.clientX
        this.basicdata.start.y = e.clientY
        this.basicdata.end.x = e.clientX
        this.basicdata.end.y = e.clientY
      }
      this.temporaryData.tracking = true
      this.temporaryData.animation = false
    },
    touchmove (e) {
      // &#x8BB0;&#x5F55;&#x6ED1;&#x52A8;&#x4F4D;&#x7F6E;
      if (this.temporaryData.tracking &amp;&amp; !this.temporaryData.animation) {
        if (e.type === &apos;touchmove&apos;) {
          this.basicdata.end.x = e.targetTouches[0].clientX
          this.basicdata.end.y = e.targetTouches[0].clientY
        } else {
          this.basicdata.end.x = e.clientX
          this.basicdata.end.y = e.clientY
        }
        // &#x8BA1;&#x7B97;&#x6ED1;&#x52A8;&#x503C;
        this.temporaryData.poswidth = this.basicdata.end.x - this.basicdata.start.x
        this.temporaryData.posheight = this.basicdata.end.y - this.basicdata.start.y
      }
    },
    touchend (e) {
      this.temporaryData.tracking = false
      this.temporaryData.animation = true
      // &#x6ED1;&#x52A8;&#x7ED3;&#x675F;&#xFF0C;&#x89E6;&#x53D1;&#x5224;&#x65AD;
      // &#x7B80;&#x5355;&#x5224;&#x65AD;&#x6ED1;&#x52A8;&#x5BBD;&#x5EA6;&#x8D85;&#x51FA;100&#x50CF;&#x7D20;&#x65F6;&#x89E6;&#x53D1;&#x6ED1;&#x51FA;
      if (Math.abs(this.temporaryData.poswidth) &gt;= 100) {
        // &#x6700;&#x7EC8;&#x4F4D;&#x79FB;&#x7B80;&#x5355;&#x8BBE;&#x5B9A;&#x4E3A;x&#x8F74;200&#x50CF;&#x7D20;&#x7684;&#x504F;&#x79FB;
        let ratio = Math.abs(this.temporaryData.posheight / this.temporaryData.poswidth)
        this.temporaryData.poswidth = this.temporaryData.poswidth &gt;= 0 ? this.temporaryData.poswidth + 200 : this.temporaryData.poswidth - 200
        this.temporaryData.posheight = this.temporaryData.posheight &gt;= 0 ? Math.abs(this.temporaryData.poswidth * ratio) : -Math.abs(this.temporaryData.poswidth * ratio)
        this.temporaryData.opacity = 0
      // &#x4E0D;&#x6EE1;&#x8DB3;&#x6761;&#x4EF6;&#x5219;&#x6ED1;&#x5165;
      } else {
        this.temporaryData.poswidth = 0
        this.temporaryData.posheight = 0
      }
    },
    // &#x975E;&#x9996;&#x9875;&#x6837;&#x5F0F;&#x5207;&#x6362;
    transform (index) {
      if (index &gt; this.basicdata.currentPage) {
        let style = {}
        let visible = 3
        let perIndex = index - this.basicdata.currentPage
        // visible&#x53EF;&#x89C1;&#x6570;&#x91CF;&#x524D;&#x6ED1;&#x5757;&#x7684;&#x6837;&#x5F0F;
        if (index &lt;= this.basicdata.currentPage + visible - 1) {
          style[&apos;opacity&apos;] = &apos;1&apos;
          style[&apos;transform&apos;] = &apos;translate3D(0,0,&apos; + -1 * perIndex * 60 + &apos;px&apos; + &apos;)&apos;
          style[&apos;zIndex&apos;] = visible - index + this.basicdata.currentPage
          style[&apos;transitionTimingFunction&apos;] = &apos;ease&apos;
          style[&apos;transitionDuration&apos;] = 300 + &apos;ms&apos;
        } else {
          style[&apos;zIndex&apos;] = &apos;-1&apos;
          style[&apos;transform&apos;] = &apos;translate3D(0,0,&apos; + -1 * visible * 60 + &apos;px&apos; + &apos;)&apos;
        }
        return style
      }
    },
    // &#x9996;&#x9875;&#x6837;&#x5F0F;&#x5207;&#x6362;
    transformIndex (index) {
      // &#x5904;&#x7406;3D&#x6548;&#x679C;
      if (index === this.basicdata.currentPage) {
        let style = {}
        style[&apos;transform&apos;] = &apos;translate3D(&apos; + this.temporaryData.poswidth + &apos;px&apos; + &apos;,&apos; + this.temporaryData.posheight + &apos;px&apos; + &apos;,0px)&apos;
        style[&apos;opacity&apos;] = this.temporaryData.opacity
        style[&apos;zIndex&apos;] = 10
        if (this.temporaryData.animation) {
          style[&apos;transitionTimingFunction&apos;] = &apos;ease&apos;
          style[&apos;transitionDuration&apos;] = 300 + &apos;ms&apos;
        }
        return style
      }
    }
  }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;stack&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;stack-item&quot;</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(item, index) in pages&quot;</span>
      <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;[transformIndex(index),transform(index)]&quot;</span>
      @<span class="hljs-attr">touchmove.stop.capture</span>=<span class="hljs-string">&quot;touchmove&quot;</span>
      @<span class="hljs-attr">touchstart.stop.capture</span>=<span class="hljs-string">&quot;touchstart&quot;</span>
      @<span class="hljs-attr">touchend.stop.capture</span>=<span class="hljs-string">&quot;touchend&quot;</span>
      @<span class="hljs-attr">mousedown.stop.capture</span>=<span class="hljs-string">&quot;touchstart&quot;</span>
      @<span class="hljs-attr">mouseup.stop.capture</span>=<span class="hljs-string">&quot;touchend&quot;</span>
      @<span class="hljs-attr">mousemove.stop.capture</span>=<span class="hljs-string">&quot;touchmove&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">&quot;item.src&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: {
     <span class="hljs-comment">// pages&#x6570;&#x636E;&#x5305;&#x542B;&#x57FA;&#x7840;&#x7684;&#x56FE;&#x7247;&#x6570;&#x636E;</span>
    pages: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Array</span>,
      <span class="hljs-attr">default</span>: []
    }
  },
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-comment">// basicdata&#x6570;&#x636E;&#x5305;&#x542B;&#x7EC4;&#x4EF6;&#x57FA;&#x672C;&#x6570;&#x636E;</span>
      basicdata: {
        <span class="hljs-attr">start</span>: {}, <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;</span>
        end: {}, <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x7EC8;&#x70B9;&#x4F4D;&#x7F6E;</span>
        currentPage: <span class="hljs-number">0</span> <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x9996;&#x56FE;&#x7684;&#x5E8F;&#x5217;</span>
      },
      <span class="hljs-comment">// temporaryData&#x6570;&#x636E;&#x5305;&#x542B;&#x7EC4;&#x4EF6;&#x4E34;&#x65F6;&#x6570;&#x636E;</span>
      temporaryData: {
        <span class="hljs-attr">poswidth</span>: <span class="hljs-string">&apos;&apos;</span>, <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x4F4D;&#x79FB;</span>
        posheight: <span class="hljs-string">&apos;&apos;</span>, <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x4F4D;&#x79FB;</span>
        tracking: <span class="hljs-literal">false</span>, <span class="hljs-comment">// &#x662F;&#x5426;&#x5728;&#x6ED1;&#x52A8;&#xFF0C;&#x9632;&#x6B62;&#x591A;&#x6B21;&#x64CD;&#x4F5C;&#xFF0C;&#x5F71;&#x54CD;&#x4F53;&#x9A8C;</span>
        animation: <span class="hljs-literal">false</span>, <span class="hljs-comment">// &#x9996;&#x56FE;&#x662F;&#x5426;&#x542F;&#x7528;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&#x5426;</span>
        opacity: <span class="hljs-number">1</span> <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x9996;&#x56FE;&#x900F;&#x660E;&#x5EA6;</span>
      }
    }
  },
  <span class="hljs-attr">methods</span>: {
    touchstart (e) {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.temporaryData.tracking) {
        <span class="hljs-keyword">return</span>
      }
      <span class="hljs-comment">// &#x662F;&#x5426;&#x4E3A;touch</span>
      <span class="hljs-keyword">if</span> (e.type === <span class="hljs-string">&apos;touchstart&apos;</span>) {
        <span class="hljs-keyword">if</span> (e.touches.length &gt; <span class="hljs-number">1</span>) {
          <span class="hljs-keyword">this</span>.temporaryData.tracking = <span class="hljs-literal">false</span>
          <span class="hljs-keyword">return</span>
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;</span>
          <span class="hljs-keyword">this</span>.basicdata.start.t = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime()
          <span class="hljs-keyword">this</span>.basicdata.start.x = e.targetTouches[<span class="hljs-number">0</span>].clientX
          <span class="hljs-keyword">this</span>.basicdata.start.y = e.targetTouches[<span class="hljs-number">0</span>].clientY
          <span class="hljs-keyword">this</span>.basicdata.end.x = e.targetTouches[<span class="hljs-number">0</span>].clientX
          <span class="hljs-keyword">this</span>.basicdata.end.y = e.targetTouches[<span class="hljs-number">0</span>].clientY
        }
      <span class="hljs-comment">// pc&#x64CD;&#x4F5C;</span>
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.basicdata.start.t = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime()
        <span class="hljs-keyword">this</span>.basicdata.start.x = e.clientX
        <span class="hljs-keyword">this</span>.basicdata.start.y = e.clientY
        <span class="hljs-keyword">this</span>.basicdata.end.x = e.clientX
        <span class="hljs-keyword">this</span>.basicdata.end.y = e.clientY
      }
      <span class="hljs-keyword">this</span>.temporaryData.tracking = <span class="hljs-literal">true</span>
      <span class="hljs-keyword">this</span>.temporaryData.animation = <span class="hljs-literal">false</span>
    },
    touchmove (e) {
      <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x6ED1;&#x52A8;&#x4F4D;&#x7F6E;</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.temporaryData.tracking &amp;&amp; !<span class="hljs-keyword">this</span>.temporaryData.animation) {
        <span class="hljs-keyword">if</span> (e.type === <span class="hljs-string">&apos;touchmove&apos;</span>) {
          <span class="hljs-keyword">this</span>.basicdata.end.x = e.targetTouches[<span class="hljs-number">0</span>].clientX
          <span class="hljs-keyword">this</span>.basicdata.end.y = e.targetTouches[<span class="hljs-number">0</span>].clientY
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">this</span>.basicdata.end.x = e.clientX
          <span class="hljs-keyword">this</span>.basicdata.end.y = e.clientY
        }
        <span class="hljs-comment">// &#x8BA1;&#x7B97;&#x6ED1;&#x52A8;&#x503C;</span>
        <span class="hljs-keyword">this</span>.temporaryData.poswidth = <span class="hljs-keyword">this</span>.basicdata.end.x - <span class="hljs-keyword">this</span>.basicdata.start.x
        <span class="hljs-keyword">this</span>.temporaryData.posheight = <span class="hljs-keyword">this</span>.basicdata.end.y - <span class="hljs-keyword">this</span>.basicdata.start.y
      }
    },
    touchend (e) {
      <span class="hljs-keyword">this</span>.temporaryData.tracking = <span class="hljs-literal">false</span>
      <span class="hljs-keyword">this</span>.temporaryData.animation = <span class="hljs-literal">true</span>
      <span class="hljs-comment">// &#x6ED1;&#x52A8;&#x7ED3;&#x675F;&#xFF0C;&#x89E6;&#x53D1;&#x5224;&#x65AD;</span>
      <span class="hljs-comment">// &#x7B80;&#x5355;&#x5224;&#x65AD;&#x6ED1;&#x52A8;&#x5BBD;&#x5EA6;&#x8D85;&#x51FA;100&#x50CF;&#x7D20;&#x65F6;&#x89E6;&#x53D1;&#x6ED1;&#x51FA;</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Math</span>.abs(<span class="hljs-keyword">this</span>.temporaryData.poswidth) &gt;= <span class="hljs-number">100</span>) {
        <span class="hljs-comment">// &#x6700;&#x7EC8;&#x4F4D;&#x79FB;&#x7B80;&#x5355;&#x8BBE;&#x5B9A;&#x4E3A;x&#x8F74;200&#x50CF;&#x7D20;&#x7684;&#x504F;&#x79FB;</span>
        <span class="hljs-keyword">let</span> ratio = <span class="hljs-built_in">Math</span>.abs(<span class="hljs-keyword">this</span>.temporaryData.posheight / <span class="hljs-keyword">this</span>.temporaryData.poswidth)
        <span class="hljs-keyword">this</span>.temporaryData.poswidth = <span class="hljs-keyword">this</span>.temporaryData.poswidth &gt;= <span class="hljs-number">0</span> ? <span class="hljs-keyword">this</span>.temporaryData.poswidth + <span class="hljs-number">200</span> : <span class="hljs-keyword">this</span>.temporaryData.poswidth - <span class="hljs-number">200</span>
        <span class="hljs-keyword">this</span>.temporaryData.posheight = <span class="hljs-keyword">this</span>.temporaryData.posheight &gt;= <span class="hljs-number">0</span> ? <span class="hljs-built_in">Math</span>.abs(<span class="hljs-keyword">this</span>.temporaryData.poswidth * ratio) : -<span class="hljs-built_in">Math</span>.abs(<span class="hljs-keyword">this</span>.temporaryData.poswidth * ratio)
        <span class="hljs-keyword">this</span>.temporaryData.opacity = <span class="hljs-number">0</span>
      <span class="hljs-comment">// &#x4E0D;&#x6EE1;&#x8DB3;&#x6761;&#x4EF6;&#x5219;&#x6ED1;&#x5165;</span>
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.temporaryData.poswidth = <span class="hljs-number">0</span>
        <span class="hljs-keyword">this</span>.temporaryData.posheight = <span class="hljs-number">0</span>
      }
    },
    <span class="hljs-comment">// &#x975E;&#x9996;&#x9875;&#x6837;&#x5F0F;&#x5207;&#x6362;</span>
    transform (index) {
      <span class="hljs-keyword">if</span> (index &gt; <span class="hljs-keyword">this</span>.basicdata.currentPage) {
        <span class="hljs-keyword">let</span> style = {}
        <span class="hljs-keyword">let</span> visible = <span class="hljs-number">3</span>
        <span class="hljs-keyword">let</span> perIndex = index - <span class="hljs-keyword">this</span>.basicdata.currentPage
        <span class="hljs-comment">// visible&#x53EF;&#x89C1;&#x6570;&#x91CF;&#x524D;&#x6ED1;&#x5757;&#x7684;&#x6837;&#x5F0F;</span>
        <span class="hljs-keyword">if</span> (index &lt;= <span class="hljs-keyword">this</span>.basicdata.currentPage + visible - <span class="hljs-number">1</span>) {
          style[<span class="hljs-string">&apos;opacity&apos;</span>] = <span class="hljs-string">&apos;1&apos;</span>
          style[<span class="hljs-string">&apos;transform&apos;</span>] = <span class="hljs-string">&apos;translate3D(0,0,&apos;</span> + <span class="hljs-number">-1</span> * perIndex * <span class="hljs-number">60</span> + <span class="hljs-string">&apos;px&apos;</span> + <span class="hljs-string">&apos;)&apos;</span>
          style[<span class="hljs-string">&apos;zIndex&apos;</span>] = visible - index + <span class="hljs-keyword">this</span>.basicdata.currentPage
          style[<span class="hljs-string">&apos;transitionTimingFunction&apos;</span>] = <span class="hljs-string">&apos;ease&apos;</span>
          style[<span class="hljs-string">&apos;transitionDuration&apos;</span>] = <span class="hljs-number">300</span> + <span class="hljs-string">&apos;ms&apos;</span>
        } <span class="hljs-keyword">else</span> {
          style[<span class="hljs-string">&apos;zIndex&apos;</span>] = <span class="hljs-string">&apos;-1&apos;</span>
          style[<span class="hljs-string">&apos;transform&apos;</span>] = <span class="hljs-string">&apos;translate3D(0,0,&apos;</span> + <span class="hljs-number">-1</span> * visible * <span class="hljs-number">60</span> + <span class="hljs-string">&apos;px&apos;</span> + <span class="hljs-string">&apos;)&apos;</span>
        }
        <span class="hljs-keyword">return</span> style
      }
    },
    <span class="hljs-comment">// &#x9996;&#x9875;&#x6837;&#x5F0F;&#x5207;&#x6362;</span>
    transformIndex (index) {
      <span class="hljs-comment">// &#x5904;&#x7406;3D&#x6548;&#x679C;</span>
      <span class="hljs-keyword">if</span> (index === <span class="hljs-keyword">this</span>.basicdata.currentPage) {
        <span class="hljs-keyword">let</span> style = {}
        style[<span class="hljs-string">&apos;transform&apos;</span>] = <span class="hljs-string">&apos;translate3D(&apos;</span> + <span class="hljs-keyword">this</span>.temporaryData.poswidth + <span class="hljs-string">&apos;px&apos;</span> + <span class="hljs-string">&apos;,&apos;</span> + <span class="hljs-keyword">this</span>.temporaryData.posheight + <span class="hljs-string">&apos;px&apos;</span> + <span class="hljs-string">&apos;,0px)&apos;</span>
        style[<span class="hljs-string">&apos;opacity&apos;</span>] = <span class="hljs-keyword">this</span>.temporaryData.opacity
        style[<span class="hljs-string">&apos;zIndex&apos;</span>] = <span class="hljs-number">10</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.temporaryData.animation) {
          style[<span class="hljs-string">&apos;transitionTimingFunction&apos;</span>] = <span class="hljs-string">&apos;ease&apos;</span>
          style[<span class="hljs-string">&apos;transitionDuration&apos;</span>] = <span class="hljs-number">300</span> + <span class="hljs-string">&apos;ms&apos;</span>
        }
        <span class="hljs-keyword">return</span> style
      }
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><h3 id="articleHeader6">4. &#x6ED1;&#x51FA;&#x540E;&#x4E0B;&#x4E00;&#x5F20;&#x56FE;&#x7247;&#x5806;&#x53E0;&#x5230;&#x9876;&#x90E8;</h3><p>&#x91CD;&#x65B0;&#x5806;&#x53E0;&#x662F;&#x7EC4;&#x4EF6;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x529F;&#x80FD;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x662F;&#x6700;&#x91CD;&#x8981;&#x548C;&#x590D;&#x6742;&#x7684;&#x529F;&#x80FD;&#x3002;&#x5728;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#x91CC;&#xFF0C;stack-item&#x7684;&#x6392;&#x5E8F;&#x4F9D;&#x8D56;&#x7ED1;&#x5B9A;:style&#x7684;transformIndex&#x548C;transform&#x51FD;&#x6570;&#xFF0C;&#x51FD;&#x6570;&#x91CC;&#x5224;&#x5B9A;&#x7684;&#x6761;&#x4EF6;&#x662F;currentPage&#xFF0C;&#x90A3;&#x662F;&#x4E0D;&#x662F;&#x6539;&#x53D8;currentPage&#xFF0C;&#x8BA9;&#x5176;+1&#xFF0C;&#x5373;&#x53EF;&#x5B8C;&#x6210;&#x91CD;&#x65B0;&#x5806;&#x53E0;&#x5462;&#xFF1F;</p><p>&#x7B54;&#x6848;&#x6CA1;&#x6709;&#x90A3;&#x4E48;&#x7B80;&#x5355;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x6ED1;&#x51FA;&#x662F;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x4F1A;&#x8FDB;&#x884C;300ms&#x7684;&#x65F6;&#x95F4;&#xFF0C;&#x800C;currentPage&#x53D8;&#x5316;&#x5F15;&#x8D77;&#x7684;&#x91CD;&#x6392;&#xFF0C;&#x4F1A;&#x7ACB;&#x5373;&#x53D8;&#x5316;&#xFF0C;&#x6253;&#x65AD;&#x52A8;&#x753B;&#x7684;&#x8FDB;&#x884C;&#x3002;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5148;&#x4FEE;&#x6539;transform&#x51FD;&#x6570;&#x7684;&#x6392;&#x5E8F;&#x6761;&#x4EF6;&#xFF0C;&#x540E;&#x6539;&#x53D8;currentPage&#x3002;<br>#### &#x5177;&#x4F53;&#x5B9E;&#x73B0;</p><ul><li>&#x4FEE;&#x6539;transform&#x51FD;&#x6570;&#x6392;&#x5E8F;&#x6761;&#x4EF6;</li><li>&#x8BA9;currentPage+1</li><li>&#x6DFB;&#x52A0;onTransitionEnd&#x4E8B;&#x4EF6;&#xFF0C;&#x5728;&#x6ED1;&#x51FA;&#x7ED3;&#x675F;&#x540E;&#xFF0C;&#x91CD;&#x65B0;&#x653E;&#x7F6E;stack&#x5217;&#x8868;&#x4E2D;</li></ul><p>&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;ul class=&quot;stack&quot;&gt;
      &lt;li class=&quot;stack-item&quot; v-for=&quot;(item, index) in pages&quot;
      :style=&quot;[transformIndex(index),transform(index)]&quot;
      @touchmove.stop.capture=&quot;touchmove&quot;
      @touchstart.stop.capture=&quot;touchstart&quot;
      @touchend.stop.capture=&quot;touchend&quot;
      @mousedown.stop.capture=&quot;touchstart&quot;
      @mouseup.stop.capture=&quot;touchend&quot;
      @mousemove.stop.capture=&quot;touchmove&quot;
      @webkit-transition-end=&quot;onTransitionEnd&quot;
      @transitionend=&quot;onTransitionEnd&quot;
      &gt;
        &lt;img :src=&quot;item.src&quot;&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  props: {
    // pages&#x6570;&#x636E;&#x5305;&#x542B;&#x57FA;&#x7840;&#x7684;&#x56FE;&#x7247;&#x6570;&#x636E;
    pages: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      // basicdata&#x6570;&#x636E;&#x5305;&#x542B;&#x7EC4;&#x4EF6;&#x57FA;&#x672C;&#x6570;&#x636E;
      basicdata: {
        start: {}, // &#x8BB0;&#x5F55;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;
        end: {}, // &#x8BB0;&#x5F55;&#x7EC8;&#x70B9;&#x4F4D;&#x7F6E;
        currentPage: 0 // &#x9ED8;&#x8BA4;&#x9996;&#x56FE;&#x7684;&#x5E8F;&#x5217;
      },
      // temporaryData&#x6570;&#x636E;&#x5305;&#x542B;&#x7EC4;&#x4EF6;&#x4E34;&#x65F6;&#x6570;&#x636E;
      temporaryData: {
        poswidth: &apos;&apos;, // &#x8BB0;&#x5F55;&#x4F4D;&#x79FB;
        posheight: &apos;&apos;, // &#x8BB0;&#x5F55;&#x4F4D;&#x79FB;
        lastPosWidth: &apos;&apos;, // &#x8BB0;&#x5F55;&#x4E0A;&#x6B21;&#x6700;&#x7EC8;&#x4F4D;&#x79FB;
        lastPosHeight: &apos;&apos;, // &#x8BB0;&#x5F55;&#x4E0A;&#x6B21;&#x6700;&#x7EC8;&#x4F4D;&#x79FB;
        tracking: false, // &#x662F;&#x5426;&#x5728;&#x6ED1;&#x52A8;&#xFF0C;&#x9632;&#x6B62;&#x591A;&#x6B21;&#x64CD;&#x4F5C;&#xFF0C;&#x5F71;&#x54CD;&#x4F53;&#x9A8C;
        animation: false, // &#x9996;&#x56FE;&#x662F;&#x5426;&#x542F;&#x7528;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&#x5426;
        opacity: 1, // &#x8BB0;&#x5F55;&#x9996;&#x56FE;&#x900F;&#x660E;&#x5EA6;
        swipe: false // onTransition&#x5224;&#x5B9A;&#x6761;&#x4EF6;
      }
    }
  },
  methods: {
    touchstart (e) {
      if (this.temporaryData.tracking) {
        return
      }
      // &#x662F;&#x5426;&#x4E3A;touch
      if (e.type === &apos;touchstart&apos;) {
        if (e.touches.length &gt; 1) {
          this.temporaryData.tracking = false
          return
        } else {
          // &#x8BB0;&#x5F55;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;
          this.basicdata.start.t = new Date().getTime()
          this.basicdata.start.x = e.targetTouches[0].clientX
          this.basicdata.start.y = e.targetTouches[0].clientY
          this.basicdata.end.x = e.targetTouches[0].clientX
          this.basicdata.end.y = e.targetTouches[0].clientY
        }
      // pc&#x64CD;&#x4F5C;
      } else {
        this.basicdata.start.t = new Date().getTime()
        this.basicdata.start.x = e.clientX
        this.basicdata.start.y = e.clientY
        this.basicdata.end.x = e.clientX
        this.basicdata.end.y = e.clientY
      }
      this.temporaryData.tracking = true
      this.temporaryData.animation = false
    },
    touchmove (e) {
      // &#x8BB0;&#x5F55;&#x6ED1;&#x52A8;&#x4F4D;&#x7F6E;
      if (this.temporaryData.tracking &amp;&amp; !this.temporaryData.animation) {
        if (e.type === &apos;touchmove&apos;) {
          this.basicdata.end.x = e.targetTouches[0].clientX
          this.basicdata.end.y = e.targetTouches[0].clientY
        } else {
          this.basicdata.end.x = e.clientX
          this.basicdata.end.y = e.clientY
        }
        // &#x8BA1;&#x7B97;&#x6ED1;&#x52A8;&#x503C;
        this.temporaryData.poswidth = this.basicdata.end.x - this.basicdata.start.x
        this.temporaryData.posheight = this.basicdata.end.y - this.basicdata.start.y
      }
    },
    touchend (e) {
      this.temporaryData.tracking = false
      this.temporaryData.animation = true
      // &#x6ED1;&#x52A8;&#x7ED3;&#x675F;&#xFF0C;&#x89E6;&#x53D1;&#x5224;&#x65AD;
      // &#x7B80;&#x5355;&#x5224;&#x65AD;&#x6ED1;&#x52A8;&#x5BBD;&#x5EA6;&#x8D85;&#x51FA;100&#x50CF;&#x7D20;&#x65F6;&#x89E6;&#x53D1;&#x6ED1;&#x51FA;
      if (Math.abs(this.temporaryData.poswidth) &gt;= 100) {
        // &#x6700;&#x7EC8;&#x4F4D;&#x79FB;&#x7B80;&#x5355;&#x8BBE;&#x5B9A;&#x4E3A;x&#x8F74;200&#x50CF;&#x7D20;&#x7684;&#x504F;&#x79FB;
        let ratio = Math.abs(this.temporaryData.posheight / this.temporaryData.poswidth)
        this.temporaryData.poswidth = this.temporaryData.poswidth &gt;= 0 ? this.temporaryData.poswidth + 200 : this.temporaryData.poswidth - 200
        this.temporaryData.posheight = this.temporaryData.posheight &gt;= 0 ? Math.abs(this.temporaryData.poswidth * ratio) : -Math.abs(this.temporaryData.poswidth * ratio)
        this.temporaryData.opacity = 0
        this.temporaryData.swipe = true
        // &#x8BB0;&#x5F55;&#x6700;&#x7EC8;&#x6ED1;&#x52A8;&#x8DDD;&#x79BB;
        this.temporaryData.lastPosWidth = this.temporaryData.poswidth
        this.temporaryData.lastPosHeight = this.temporaryData.posheight
        // currentPage+1 &#x5F15;&#x53D1;&#x6392;&#x5E8F;&#x53D8;&#x5316;
        this.basicdata.currentPage += 1
        // currentPage&#x5207;&#x6362;&#xFF0C;&#x6574;&#x4F53;dom&#x8FDB;&#x884C;&#x53D8;&#x5316;&#xFF0C;&#x628A;&#x7B2C;&#x4E00;&#x5C42;&#x6ED1;&#x52A8;&#x7F6E;&#x96F6;
        this.$nextTick(() =&gt; {
          this.temporaryData.poswidth = 0
          this.temporaryData.posheight = 0
          this.temporaryData.opacity = 1
        })
      // &#x4E0D;&#x6EE1;&#x8DB3;&#x6761;&#x4EF6;&#x5219;&#x6ED1;&#x5165;
      } else {
        this.temporaryData.poswidth = 0
        this.temporaryData.posheight = 0
        this.temporaryData.swipe = false
      }
    },
    onTransitionEnd (index) {
      // dom&#x53D1;&#x751F;&#x53D8;&#x5316;&#x540E;&#xFF0C;&#x6B63;&#x5728;&#x6267;&#x884C;&#x7684;&#x52A8;&#x753B;&#x6ED1;&#x52A8;&#x5E8F;&#x5217;&#x5DF2;&#x7ECF;&#x53D8;&#x4E3A;&#x4E0A;&#x4E00;&#x5C42;
      if (this.temporaryData.swipe &amp;&amp; index === this.basicdata.currentPage - 1) {
        this.temporaryData.animation = true
        this.temporaryData.lastPosWidth = 0
        this.temporaryData.lastPosHeight = 0
        this.temporaryData.swipe = false
      }
    },
    // &#x975E;&#x9996;&#x9875;&#x6837;&#x5F0F;&#x5207;&#x6362;
    transform (index) {
      if (index &gt; this.basicdata.currentPage) {
        let style = {}
        let visible = 3
        let perIndex = index - this.basicdata.currentPage
        // visible&#x53EF;&#x89C1;&#x6570;&#x91CF;&#x524D;&#x6ED1;&#x5757;&#x7684;&#x6837;&#x5F0F;
        if (index &lt;= this.basicdata.currentPage + visible - 1) {
          style[&apos;opacity&apos;] = &apos;1&apos;
          style[&apos;transform&apos;] = &apos;translate3D(0,0,&apos; + -1 * perIndex * 60 + &apos;px&apos; + &apos;)&apos;
          style[&apos;zIndex&apos;] = visible - index + this.basicdata.currentPage
          style[&apos;transitionTimingFunction&apos;] = &apos;ease&apos;
          style[&apos;transitionDuration&apos;] = 300 + &apos;ms&apos;
        } else {
          style[&apos;zIndex&apos;] = &apos;-1&apos;
          style[&apos;transform&apos;] = &apos;translate3D(0,0,&apos; + -1 * visible * 60 + &apos;px&apos; + &apos;)&apos;
        }
        return style
      // &#x5DF2;&#x6ED1;&#x52A8;&#x6A21;&#x5757;&#x91CA;&#x653E;&#x540E;
      } else if (index === this.basicdata.currentPage - 1) {
        let style = {}
        // &#x7EE7;&#x7EED;&#x6267;&#x884C;&#x52A8;&#x753B;
        style[&apos;transform&apos;] = &apos;translate3D(&apos; + this.temporaryData.lastPosWidth + &apos;px&apos; + &apos;,&apos; + this.temporaryData.lastPosHeight + &apos;px&apos; + &apos;,0px)&apos;
        style[&apos;opacity&apos;] = &apos;0&apos;
        style[&apos;zIndex&apos;] = &apos;-1&apos;
        style[&apos;transitionTimingFunction&apos;] = &apos;ease&apos;
        style[&apos;transitionDuration&apos;] = 300 + &apos;ms&apos;
        return style
      }
    },
    // &#x9996;&#x9875;&#x6837;&#x5F0F;&#x5207;&#x6362;
    transformIndex (index) {
      // &#x5904;&#x7406;3D&#x6548;&#x679C;
      if (index === this.basicdata.currentPage) {
        let style = {}
        style[&apos;transform&apos;] = &apos;translate3D(&apos; + this.temporaryData.poswidth + &apos;px&apos; + &apos;,&apos; + this.temporaryData.posheight + &apos;px&apos; + &apos;,0px)&apos;
        style[&apos;opacity&apos;] = this.temporaryData.opacity
        style[&apos;zIndex&apos;] = 10
        if (this.temporaryData.animation) {
          style[&apos;transitionTimingFunction&apos;] = &apos;ease&apos;
          style[&apos;transitionDuration&apos;] = 300 + &apos;ms&apos;
        }
        return style
      }
    }
  }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;stack&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;stack-item&quot;</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(item, index) in pages&quot;</span>
      <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;[transformIndex(index),transform(index)]&quot;</span>
      @<span class="hljs-attr">touchmove.stop.capture</span>=<span class="hljs-string">&quot;touchmove&quot;</span>
      @<span class="hljs-attr">touchstart.stop.capture</span>=<span class="hljs-string">&quot;touchstart&quot;</span>
      @<span class="hljs-attr">touchend.stop.capture</span>=<span class="hljs-string">&quot;touchend&quot;</span>
      @<span class="hljs-attr">mousedown.stop.capture</span>=<span class="hljs-string">&quot;touchstart&quot;</span>
      @<span class="hljs-attr">mouseup.stop.capture</span>=<span class="hljs-string">&quot;touchend&quot;</span>
      @<span class="hljs-attr">mousemove.stop.capture</span>=<span class="hljs-string">&quot;touchmove&quot;</span>
      @<span class="hljs-attr">webkit-transition-end</span>=<span class="hljs-string">&quot;onTransitionEnd&quot;</span>
      @<span class="hljs-attr">transitionend</span>=<span class="hljs-string">&quot;onTransitionEnd&quot;</span>
      &gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">&quot;item.src&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: {
    <span class="hljs-comment">// pages&#x6570;&#x636E;&#x5305;&#x542B;&#x57FA;&#x7840;&#x7684;&#x56FE;&#x7247;&#x6570;&#x636E;</span>
    pages: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Array</span>,
      <span class="hljs-attr">default</span>: []
    }
  },
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-comment">// basicdata&#x6570;&#x636E;&#x5305;&#x542B;&#x7EC4;&#x4EF6;&#x57FA;&#x672C;&#x6570;&#x636E;</span>
      basicdata: {
        <span class="hljs-attr">start</span>: {}, <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;</span>
        end: {}, <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x7EC8;&#x70B9;&#x4F4D;&#x7F6E;</span>
        currentPage: <span class="hljs-number">0</span> <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x9996;&#x56FE;&#x7684;&#x5E8F;&#x5217;</span>
      },
      <span class="hljs-comment">// temporaryData&#x6570;&#x636E;&#x5305;&#x542B;&#x7EC4;&#x4EF6;&#x4E34;&#x65F6;&#x6570;&#x636E;</span>
      temporaryData: {
        <span class="hljs-attr">poswidth</span>: <span class="hljs-string">&apos;&apos;</span>, <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x4F4D;&#x79FB;</span>
        posheight: <span class="hljs-string">&apos;&apos;</span>, <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x4F4D;&#x79FB;</span>
        lastPosWidth: <span class="hljs-string">&apos;&apos;</span>, <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x4E0A;&#x6B21;&#x6700;&#x7EC8;&#x4F4D;&#x79FB;</span>
        lastPosHeight: <span class="hljs-string">&apos;&apos;</span>, <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x4E0A;&#x6B21;&#x6700;&#x7EC8;&#x4F4D;&#x79FB;</span>
        tracking: <span class="hljs-literal">false</span>, <span class="hljs-comment">// &#x662F;&#x5426;&#x5728;&#x6ED1;&#x52A8;&#xFF0C;&#x9632;&#x6B62;&#x591A;&#x6B21;&#x64CD;&#x4F5C;&#xFF0C;&#x5F71;&#x54CD;&#x4F53;&#x9A8C;</span>
        animation: <span class="hljs-literal">false</span>, <span class="hljs-comment">// &#x9996;&#x56FE;&#x662F;&#x5426;&#x542F;&#x7528;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&#x5426;</span>
        opacity: <span class="hljs-number">1</span>, <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x9996;&#x56FE;&#x900F;&#x660E;&#x5EA6;</span>
        swipe: <span class="hljs-literal">false</span> <span class="hljs-comment">// onTransition&#x5224;&#x5B9A;&#x6761;&#x4EF6;</span>
      }
    }
  },
  <span class="hljs-attr">methods</span>: {
    touchstart (e) {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.temporaryData.tracking) {
        <span class="hljs-keyword">return</span>
      }
      <span class="hljs-comment">// &#x662F;&#x5426;&#x4E3A;touch</span>
      <span class="hljs-keyword">if</span> (e.type === <span class="hljs-string">&apos;touchstart&apos;</span>) {
        <span class="hljs-keyword">if</span> (e.touches.length &gt; <span class="hljs-number">1</span>) {
          <span class="hljs-keyword">this</span>.temporaryData.tracking = <span class="hljs-literal">false</span>
          <span class="hljs-keyword">return</span>
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;</span>
          <span class="hljs-keyword">this</span>.basicdata.start.t = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime()
          <span class="hljs-keyword">this</span>.basicdata.start.x = e.targetTouches[<span class="hljs-number">0</span>].clientX
          <span class="hljs-keyword">this</span>.basicdata.start.y = e.targetTouches[<span class="hljs-number">0</span>].clientY
          <span class="hljs-keyword">this</span>.basicdata.end.x = e.targetTouches[<span class="hljs-number">0</span>].clientX
          <span class="hljs-keyword">this</span>.basicdata.end.y = e.targetTouches[<span class="hljs-number">0</span>].clientY
        }
      <span class="hljs-comment">// pc&#x64CD;&#x4F5C;</span>
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.basicdata.start.t = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime()
        <span class="hljs-keyword">this</span>.basicdata.start.x = e.clientX
        <span class="hljs-keyword">this</span>.basicdata.start.y = e.clientY
        <span class="hljs-keyword">this</span>.basicdata.end.x = e.clientX
        <span class="hljs-keyword">this</span>.basicdata.end.y = e.clientY
      }
      <span class="hljs-keyword">this</span>.temporaryData.tracking = <span class="hljs-literal">true</span>
      <span class="hljs-keyword">this</span>.temporaryData.animation = <span class="hljs-literal">false</span>
    },
    touchmove (e) {
      <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x6ED1;&#x52A8;&#x4F4D;&#x7F6E;</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.temporaryData.tracking &amp;&amp; !<span class="hljs-keyword">this</span>.temporaryData.animation) {
        <span class="hljs-keyword">if</span> (e.type === <span class="hljs-string">&apos;touchmove&apos;</span>) {
          <span class="hljs-keyword">this</span>.basicdata.end.x = e.targetTouches[<span class="hljs-number">0</span>].clientX
          <span class="hljs-keyword">this</span>.basicdata.end.y = e.targetTouches[<span class="hljs-number">0</span>].clientY
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">this</span>.basicdata.end.x = e.clientX
          <span class="hljs-keyword">this</span>.basicdata.end.y = e.clientY
        }
        <span class="hljs-comment">// &#x8BA1;&#x7B97;&#x6ED1;&#x52A8;&#x503C;</span>
        <span class="hljs-keyword">this</span>.temporaryData.poswidth = <span class="hljs-keyword">this</span>.basicdata.end.x - <span class="hljs-keyword">this</span>.basicdata.start.x
        <span class="hljs-keyword">this</span>.temporaryData.posheight = <span class="hljs-keyword">this</span>.basicdata.end.y - <span class="hljs-keyword">this</span>.basicdata.start.y
      }
    },
    touchend (e) {
      <span class="hljs-keyword">this</span>.temporaryData.tracking = <span class="hljs-literal">false</span>
      <span class="hljs-keyword">this</span>.temporaryData.animation = <span class="hljs-literal">true</span>
      <span class="hljs-comment">// &#x6ED1;&#x52A8;&#x7ED3;&#x675F;&#xFF0C;&#x89E6;&#x53D1;&#x5224;&#x65AD;</span>
      <span class="hljs-comment">// &#x7B80;&#x5355;&#x5224;&#x65AD;&#x6ED1;&#x52A8;&#x5BBD;&#x5EA6;&#x8D85;&#x51FA;100&#x50CF;&#x7D20;&#x65F6;&#x89E6;&#x53D1;&#x6ED1;&#x51FA;</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Math</span>.abs(<span class="hljs-keyword">this</span>.temporaryData.poswidth) &gt;= <span class="hljs-number">100</span>) {
        <span class="hljs-comment">// &#x6700;&#x7EC8;&#x4F4D;&#x79FB;&#x7B80;&#x5355;&#x8BBE;&#x5B9A;&#x4E3A;x&#x8F74;200&#x50CF;&#x7D20;&#x7684;&#x504F;&#x79FB;</span>
        <span class="hljs-keyword">let</span> ratio = <span class="hljs-built_in">Math</span>.abs(<span class="hljs-keyword">this</span>.temporaryData.posheight / <span class="hljs-keyword">this</span>.temporaryData.poswidth)
        <span class="hljs-keyword">this</span>.temporaryData.poswidth = <span class="hljs-keyword">this</span>.temporaryData.poswidth &gt;= <span class="hljs-number">0</span> ? <span class="hljs-keyword">this</span>.temporaryData.poswidth + <span class="hljs-number">200</span> : <span class="hljs-keyword">this</span>.temporaryData.poswidth - <span class="hljs-number">200</span>
        <span class="hljs-keyword">this</span>.temporaryData.posheight = <span class="hljs-keyword">this</span>.temporaryData.posheight &gt;= <span class="hljs-number">0</span> ? <span class="hljs-built_in">Math</span>.abs(<span class="hljs-keyword">this</span>.temporaryData.poswidth * ratio) : -<span class="hljs-built_in">Math</span>.abs(<span class="hljs-keyword">this</span>.temporaryData.poswidth * ratio)
        <span class="hljs-keyword">this</span>.temporaryData.opacity = <span class="hljs-number">0</span>
        <span class="hljs-keyword">this</span>.temporaryData.swipe = <span class="hljs-literal">true</span>
        <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x6700;&#x7EC8;&#x6ED1;&#x52A8;&#x8DDD;&#x79BB;</span>
        <span class="hljs-keyword">this</span>.temporaryData.lastPosWidth = <span class="hljs-keyword">this</span>.temporaryData.poswidth
        <span class="hljs-keyword">this</span>.temporaryData.lastPosHeight = <span class="hljs-keyword">this</span>.temporaryData.posheight
        <span class="hljs-comment">// currentPage+1 &#x5F15;&#x53D1;&#x6392;&#x5E8F;&#x53D8;&#x5316;</span>
        <span class="hljs-keyword">this</span>.basicdata.currentPage += <span class="hljs-number">1</span>
        <span class="hljs-comment">// currentPage&#x5207;&#x6362;&#xFF0C;&#x6574;&#x4F53;dom&#x8FDB;&#x884C;&#x53D8;&#x5316;&#xFF0C;&#x628A;&#x7B2C;&#x4E00;&#x5C42;&#x6ED1;&#x52A8;&#x7F6E;&#x96F6;</span>
        <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          <span class="hljs-keyword">this</span>.temporaryData.poswidth = <span class="hljs-number">0</span>
          <span class="hljs-keyword">this</span>.temporaryData.posheight = <span class="hljs-number">0</span>
          <span class="hljs-keyword">this</span>.temporaryData.opacity = <span class="hljs-number">1</span>
        })
      <span class="hljs-comment">// &#x4E0D;&#x6EE1;&#x8DB3;&#x6761;&#x4EF6;&#x5219;&#x6ED1;&#x5165;</span>
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.temporaryData.poswidth = <span class="hljs-number">0</span>
        <span class="hljs-keyword">this</span>.temporaryData.posheight = <span class="hljs-number">0</span>
        <span class="hljs-keyword">this</span>.temporaryData.swipe = <span class="hljs-literal">false</span>
      }
    },
    onTransitionEnd (index) {
      <span class="hljs-comment">// dom&#x53D1;&#x751F;&#x53D8;&#x5316;&#x540E;&#xFF0C;&#x6B63;&#x5728;&#x6267;&#x884C;&#x7684;&#x52A8;&#x753B;&#x6ED1;&#x52A8;&#x5E8F;&#x5217;&#x5DF2;&#x7ECF;&#x53D8;&#x4E3A;&#x4E0A;&#x4E00;&#x5C42;</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.temporaryData.swipe &amp;&amp; index === <span class="hljs-keyword">this</span>.basicdata.currentPage - <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">this</span>.temporaryData.animation = <span class="hljs-literal">true</span>
        <span class="hljs-keyword">this</span>.temporaryData.lastPosWidth = <span class="hljs-number">0</span>
        <span class="hljs-keyword">this</span>.temporaryData.lastPosHeight = <span class="hljs-number">0</span>
        <span class="hljs-keyword">this</span>.temporaryData.swipe = <span class="hljs-literal">false</span>
      }
    },
    <span class="hljs-comment">// &#x975E;&#x9996;&#x9875;&#x6837;&#x5F0F;&#x5207;&#x6362;</span>
    transform (index) {
      <span class="hljs-keyword">if</span> (index &gt; <span class="hljs-keyword">this</span>.basicdata.currentPage) {
        <span class="hljs-keyword">let</span> style = {}
        <span class="hljs-keyword">let</span> visible = <span class="hljs-number">3</span>
        <span class="hljs-keyword">let</span> perIndex = index - <span class="hljs-keyword">this</span>.basicdata.currentPage
        <span class="hljs-comment">// visible&#x53EF;&#x89C1;&#x6570;&#x91CF;&#x524D;&#x6ED1;&#x5757;&#x7684;&#x6837;&#x5F0F;</span>
        <span class="hljs-keyword">if</span> (index &lt;= <span class="hljs-keyword">this</span>.basicdata.currentPage + visible - <span class="hljs-number">1</span>) {
          style[<span class="hljs-string">&apos;opacity&apos;</span>] = <span class="hljs-string">&apos;1&apos;</span>
          style[<span class="hljs-string">&apos;transform&apos;</span>] = <span class="hljs-string">&apos;translate3D(0,0,&apos;</span> + <span class="hljs-number">-1</span> * perIndex * <span class="hljs-number">60</span> + <span class="hljs-string">&apos;px&apos;</span> + <span class="hljs-string">&apos;)&apos;</span>
          style[<span class="hljs-string">&apos;zIndex&apos;</span>] = visible - index + <span class="hljs-keyword">this</span>.basicdata.currentPage
          style[<span class="hljs-string">&apos;transitionTimingFunction&apos;</span>] = <span class="hljs-string">&apos;ease&apos;</span>
          style[<span class="hljs-string">&apos;transitionDuration&apos;</span>] = <span class="hljs-number">300</span> + <span class="hljs-string">&apos;ms&apos;</span>
        } <span class="hljs-keyword">else</span> {
          style[<span class="hljs-string">&apos;zIndex&apos;</span>] = <span class="hljs-string">&apos;-1&apos;</span>
          style[<span class="hljs-string">&apos;transform&apos;</span>] = <span class="hljs-string">&apos;translate3D(0,0,&apos;</span> + <span class="hljs-number">-1</span> * visible * <span class="hljs-number">60</span> + <span class="hljs-string">&apos;px&apos;</span> + <span class="hljs-string">&apos;)&apos;</span>
        }
        <span class="hljs-keyword">return</span> style
      <span class="hljs-comment">// &#x5DF2;&#x6ED1;&#x52A8;&#x6A21;&#x5757;&#x91CA;&#x653E;&#x540E;</span>
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (index === <span class="hljs-keyword">this</span>.basicdata.currentPage - <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">let</span> style = {}
        <span class="hljs-comment">// &#x7EE7;&#x7EED;&#x6267;&#x884C;&#x52A8;&#x753B;</span>
        style[<span class="hljs-string">&apos;transform&apos;</span>] = <span class="hljs-string">&apos;translate3D(&apos;</span> + <span class="hljs-keyword">this</span>.temporaryData.lastPosWidth + <span class="hljs-string">&apos;px&apos;</span> + <span class="hljs-string">&apos;,&apos;</span> + <span class="hljs-keyword">this</span>.temporaryData.lastPosHeight + <span class="hljs-string">&apos;px&apos;</span> + <span class="hljs-string">&apos;,0px)&apos;</span>
        style[<span class="hljs-string">&apos;opacity&apos;</span>] = <span class="hljs-string">&apos;0&apos;</span>
        style[<span class="hljs-string">&apos;zIndex&apos;</span>] = <span class="hljs-string">&apos;-1&apos;</span>
        style[<span class="hljs-string">&apos;transitionTimingFunction&apos;</span>] = <span class="hljs-string">&apos;ease&apos;</span>
        style[<span class="hljs-string">&apos;transitionDuration&apos;</span>] = <span class="hljs-number">300</span> + <span class="hljs-string">&apos;ms&apos;</span>
        <span class="hljs-keyword">return</span> style
      }
    },
    <span class="hljs-comment">// &#x9996;&#x9875;&#x6837;&#x5F0F;&#x5207;&#x6362;</span>
    transformIndex (index) {
      <span class="hljs-comment">// &#x5904;&#x7406;3D&#x6548;&#x679C;</span>
      <span class="hljs-keyword">if</span> (index === <span class="hljs-keyword">this</span>.basicdata.currentPage) {
        <span class="hljs-keyword">let</span> style = {}
        style[<span class="hljs-string">&apos;transform&apos;</span>] = <span class="hljs-string">&apos;translate3D(&apos;</span> + <span class="hljs-keyword">this</span>.temporaryData.poswidth + <span class="hljs-string">&apos;px&apos;</span> + <span class="hljs-string">&apos;,&apos;</span> + <span class="hljs-keyword">this</span>.temporaryData.posheight + <span class="hljs-string">&apos;px&apos;</span> + <span class="hljs-string">&apos;,0px)&apos;</span>
        style[<span class="hljs-string">&apos;opacity&apos;</span>] = <span class="hljs-keyword">this</span>.temporaryData.opacity
        style[<span class="hljs-string">&apos;zIndex&apos;</span>] = <span class="hljs-number">10</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.temporaryData.animation) {
          style[<span class="hljs-string">&apos;transitionTimingFunction&apos;</span>] = <span class="hljs-string">&apos;ease&apos;</span>
          style[<span class="hljs-string">&apos;transitionDuration&apos;</span>] = <span class="hljs-number">300</span> + <span class="hljs-string">&apos;ms&apos;</span>
        }
        <span class="hljs-keyword">return</span> style
      }
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>ok~ &#x5B8C;&#x6210;&#x4E86;&#x4E0A;&#x9762;&#x7684;&#x56DB;&#x6B65;&#xFF0C;&#x5806;&#x53E0;&#x7EC4;&#x4EF6;&#x7684;&#x57FA;&#x672C;&#x529F;&#x80FD;&#x5C31;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#xFF0C;&#x5FEB;&#x6765;&#x770B;&#x770B;&#x6548;&#x679C;&#x5427;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000013559746?w=375&amp;h=375" src="https://static.alili.tech/img/remote/1460000013559746?w=375&amp;h=375" alt="" title="" style="cursor:pointer"></span><br>&#x5806;&#x53E0;&#x6ED1;&#x52A8;&#x6548;&#x679C;&#x5DF2;&#x7ECF;&#x51FA;&#x6765;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x63A2;&#x63A2;&#x5728;&#x4F53;&#x9A8C;&#x4E0A;&#xFF0C;&#x8FD8;&#x589E;&#x52A0;&#x4E86;&#x89E6;&#x78B0;&#x89D2;&#x5EA6;&#x504F;&#x79FB;&#xFF0C;&#x4EE5;&#x53CA;&#x5224;&#x5B9A;&#x6ED1;&#x51FA;&#x9762;&#x79EF;&#x6BD4;&#x4F8B;</p><p>&#x89D2;&#x5EA6;&#x504F;&#x79FB;&#x7684;&#x539F;&#x7406;&#xFF0C;&#x662F;&#x5728;&#x7528;&#x6237;&#x6BCF;&#x6B21;&#x8FDB;&#x884C;touch&#x65F6;&#xFF0C;&#x8BB0;&#x5F55;&#x7528;&#x6237;&#x89E6;&#x78B0;&#x4F4D;&#x7F6E;&#xFF0C;&#x8BA1;&#x7B97;&#x51FA;&#x6700;&#x5927;&#x7684;&#x504F;&#x79FB;&#x89D2;&#x5EA6;&#xFF0C;&#x5728;&#x6ED1;&#x52A8;&#x51FA;&#x73B0;&#x4F4D;&#x79FB;&#x65F6;&#xFF0C;&#x7EBF;&#x6027;&#x589E;&#x52A0;&#x89D2;&#x5EA6;&#x4EE5;&#x81F3;&#x6700;&#x5927;&#x7684;&#x504F;&#x79FB;&#x89D2;&#x5EA6;&#x3002;<br>&#x4F7F;&#x7528;&#x5728;stack&#x4E2D;&#x5177;&#x4F53;&#x8981;&#x505A;&#x7684;&#x662F;&#xFF1A;</p><ul><li>touchmove&#x4E2D;&#x8BA1;&#x7B97;&#x51FA;&#x6240;&#x9700;&#x89D2;&#x5EA6;&#x548C;&#x65B9;&#x5411;</li><li>touchend&#x53CA;onTransitionEnd&#x4E2D;&#x5C06;&#x89D2;&#x5EA6;&#x81F3;&#x96F6;</li></ul><p>&#x5224;&#x5B9A;&#x6ED1;&#x51FA;&#x9762;&#x79EF;&#x6BD4;&#x4F8B;&#xFF0C;&#x4E3B;&#x8981;&#x901A;&#x8FC7;&#x504F;&#x79FB;&#x91CF;&#x8BA1;&#x7B97;&#x51FA;&#x504F;&#x79FB;&#x9762;&#x79EF;&#xFF0C;&#x4ECE;&#x800C;&#x5F97;&#x5230;&#x9762;&#x79EF;&#x6BD4;&#x4F8B;&#xFF0C;&#x5B8C;&#x6210;&#x5224;&#x65AD;</p><p><strong>&#x5B8C;&#x6574;&#x7684;&#x4EE3;&#x7801;&#x548C;demo&#x53EF;&#x4EE5;&#x5728;<a href="https://github.com/warpcgd/vue-tantan-stack" rel="nofollow noreferrer" target="_blank">github</a>&#x4E0A;&#x67E5;&#x770B;&#x6E90;&#x7801;&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x8D34;&#x51FA;&#x6765;&#x4E86;</strong></p><p>&#x8C22;&#x8C22;&#x5927;&#x5BB6;&#x770B;&#x5B8C;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x559C;&#x6B22;&#x53EF;&#x4EE5;&#x5728;github&#x4E0A;&#x7ED9;&#x4E2A;&#x2B50;&#xFE0F; &#xFF0C;&#x6700;&#x540E;&#x795D;&#x5927;&#x5BB6;&#x5728;&#x63A2;&#x63A2;&#x4E0A;&#x90FD;&#x80FD;&#x627E;&#x5230;&#x524D;&#x5973;&#x53CB;?</p><blockquote>&#x5206;&#x4EAB;&#x6211;&#x5199;&#x7684;&#x53E6;&#x4E00;&#x4E2A;vue-slider&#x7EC4;&#x4EF6;<a href="https://github.com/warpcgd/vue-concise-slider" rel="nofollow noreferrer" target="_blank">vue-consise-slider</a><p>&#x6700;&#x8FD1;&#x5728;&#x627E;&#x65B0;&#x5DE5;&#x4F5C;&#xFF0C;&#x5750;&#x6807;&#x5E7F;&#x5DDE;&#xFF0C;&#x4E09;&#x5E74;&#x524D;&#x7AEF;&#x7ECF;&#x9A8C;&#xFF0C;&#x719F;&#x6089;vue&#xFF0C;&#x6709;&#x5DE5;&#x4F5C;&#x4ECB;&#x7ECD;&#x7684;&#x670B;&#x53CB;&#x53EF;&#x4EE5;&#x90AE;&#x7BB1;&#x8054;&#x7CFB;&#x6211;warpcgd@qq.com</p></blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
❤️❌ 如何用vue制作一个探探滑动组件

## 原文链接
[https://segmentfault.com/a/1190000013559739](https://segmentfault.com/a/1190000013559739)

