---
title: vue轮播图插件之vue-awesome-swiper
hidden: true
categories: reprint
slug: 4fedc77b
date: 2018-11-09 02:30:06
---

{{< raw >}}
<blockquote>&#x79FB;&#x52A8;&#x7AEF;&#x8F6E;&#x64AD;&#x56FE;&#x63D2;&#x4EF6;&#xFF0C;&#x5728;&#x4F7F;&#x7528;iview&#x56FE;&#x5F62;&#x754C;&#x9762;&#x63D2;&#x4EF6;&#x4E2D;&#x7684;carousel&#x7EC4;&#x4EF6;&#x65E0;&#x6CD5;&#x5B9E;&#x73B0;&#x89E6;&#x6478;&#x6ED1;&#x52A8;&#x540E;&#xFF0C;&#x8F6C;&#x800C;&#x4F7F;&#x7528;vue-awesome-swiper&#x63D2;&#x4EF6;</blockquote><h1 id="articleHeader0">1.npm&#x5B89;&#x88C5;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i vue-awesome-swiper -S" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-selector-tag">i</span> vue-awesome-swiper -S</code></pre><ul><li>&#x6211;&#x8FD9;&#x91CC;&#x5B89;&#x88C5;&#x7684;&#x662F;&#x4E0B;&#x9762;&#x7684;&#x8FD9;&#x4E2A;&#x7248;&#x672C;</li></ul><blockquote><span class="img-wrap"><img data-src="/img/bVbgYQC?w=810&amp;h=43" src="https://static.alili.tech/img/bVbgYQC?w=810&amp;h=43" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></blockquote><h1 id="articleHeader1">2.&#x4F7F;&#x7528;</h1><ul><li>&#x5168;&#x5C40;&#x5BFC;&#x5165;&#xFF1A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import vueSwiper from &apos;vue-awesome-swiper&apos;
/* &#x6837;&#x5F0F;&#x7684;&#x8BDD;&#xFF0C;&#x6211;&#x8FD9;&#x91CC;&#x6709;&#x7528;&#x5230;&#x5206;&#x9875;&#x5668;&#xFF0C;&#x5C31;&#x5728;&#x5168;&#x5C40;&#x4E2D;&#x5F15;&#x5165;&#x4E86;&#x6837;&#x5F0F; */
import &apos;swiper/dist/css/swiper.css&apos;
Vue.use(vueSwiper);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> vueSwiper <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue-awesome-swiper&apos;</span>
<span class="hljs-comment">/* &#x6837;&#x5F0F;&#x7684;&#x8BDD;&#xFF0C;&#x6211;&#x8FD9;&#x91CC;&#x6709;&#x7528;&#x5230;&#x5206;&#x9875;&#x5668;&#xFF0C;&#x5C31;&#x5728;&#x5168;&#x5C40;&#x4E2D;&#x5F15;&#x5165;&#x4E86;&#x6837;&#x5F0F; */</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;swiper/dist/css/swiper.css&apos;</span>
Vue.use(vueSwiper);</code></pre><ul><li>&#x7EC4;&#x4EF6;&#x5F15;&#x5165;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { swiper, swiperSlide } from &quot;vue-awesome-swiper&quot;;
require(&quot;swiper/dist/css/swiper.css&quot;);
components: {
  swiper,
  swiperSlide
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code>import { <span class="hljs-keyword">swiper, </span><span class="hljs-keyword">swiperSlide </span>} from <span class="hljs-string">&quot;vue-awesome-swiper&quot;</span><span class="hljs-comment">;</span>
require(<span class="hljs-string">&quot;swiper/dist/css/swiper.css&quot;</span>)<span class="hljs-comment">;</span>
<span class="hljs-symbol">components:</span> {
  <span class="hljs-keyword">swiper,
</span>  <span class="hljs-keyword">swiperSlide
</span>},</code></pre><ul><li>&#x5728;template&#x4E2D;&#x4F7F;&#x7528;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;swiper :options=&quot;swiperOption&quot; class=&quot;swiper-wrap&quot;  ref=&quot;mySwiper&quot; v-if=&quot;banner.length!=0&quot;&gt;
  &lt;swiper-slide v-for=&quot;(item,index) in banner&quot; :key=&quot;index&quot; &gt;
    &lt;img :src=&quot;item.image&quot; alt=&quot;&quot; /&gt;
  &lt;/swiper-slide&gt;
  &lt;!-- &#x5E38;&#x89C1;&#x7684;&#x5C0F;&#x5706;&#x70B9; --&gt;
  &lt;div class=&quot;swiper-pagination&quot;  v-for=&quot;(item,index) in banner&quot; :key=&quot;index&quot; slot=&quot;pagination&quot; &gt;&lt;/div&gt;
&lt;/swiper&gt;
&lt;!-- &#x663E;&#x793A;&#x6570;&#x5B57; --&gt;
&lt;div class=&quot;number&quot;&gt;{{imgIndex}}/{{detailimages.length}}&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">swiper</span> <span class="hljs-attr">:options</span>=<span class="hljs-string">&quot;swiperOption&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;swiper-wrap&quot;</span>  <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;mySwiper&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;banner.length!=0&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">swiper-slide</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(item,index) in banner&quot;</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;index&quot;</span> &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">&quot;item.image&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">swiper-slide</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- &#x5E38;&#x89C1;&#x7684;&#x5C0F;&#x5706;&#x70B9; --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;swiper-pagination&quot;</span>  <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(item,index) in banner&quot;</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;index&quot;</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;pagination&quot;</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">swiper</span>&gt;</span>
<span class="hljs-comment">&lt;!-- &#x663E;&#x793A;&#x6570;&#x5B57; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;number&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{"imgIndex"}}"</span><span class="xml">/</span><span class="hljs-template-variable">"{{"detailimages.length"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre><blockquote><span class="img-wrap"><img data-src="/img/bVbgYUq?w=319&amp;h=44" src="https://static.alili.tech/img/bVbgYUq?w=319&amp;h=44" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><p><span class="img-wrap"><img data-src="/img/bVbgYUQ?w=326&amp;h=32" src="https://static.alili.tech/img/bVbgYUQ?w=326&amp;h=32" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p></blockquote><ul><li>data&#x4E2D;&#x914D;&#x7F6E;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data() {
    const that = this;
    return {
      imgIndex: 1,
      swiperOption: {
        //&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x81EA;&#x6709;&#x5C5E;&#x6027;&#xFF0C;&#x5982;&#x679C;notNextTick&#x8BBE;&#x7F6E;&#x4E3A;true&#xFF0C;&#x7EC4;&#x4EF6;&#x5219;&#x4E0D;&#x4F1A;&#x901A;&#x8FC7;NextTick&#x6765;&#x5B9E;&#x4F8B;&#x5316;swiper&#xFF0C;&#x4E5F;&#x5C31;&#x610F;&#x5473;&#x7740;&#x4F60;&#x53EF;&#x4EE5;&#x5728;&#x7B2C;&#x4E00;&#x65F6;&#x95F4;&#x83B7;&#x53D6;&#x5230;swiper&#x5BF9;&#x8C61;&#xFF0C;&#x5047;&#x5982;&#x4F60;&#x9700;&#x8981;&#x521A;&#x52A0;&#x8F7D;&#x904D;&#x4F7F;&#x7528;&#x83B7;&#x53D6;swiper&#x5BF9;&#x8C61;&#x6765;&#x505A;&#x4EC0;&#x4E48;&#x4E8B;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x4E00;&#x5B9A;&#x8981;&#x662F;true
        notNextTick: true,
        //&#x5FAA;&#x73AF;
        loop: true,
        //&#x8BBE;&#x5B9A;&#x521D;&#x59CB;&#x5316;&#x65F6;slide&#x7684;&#x7D22;&#x5F15;
        initialSlide: 0,
        //&#x81EA;&#x52A8;&#x64AD;&#x653E;
        autoplay: {
          delay: 1500,
          stopOnLastSlide: false,
          /* &#x89E6;&#x6478;&#x6ED1;&#x52A8;&#x540E;&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x8F6E;&#x64AD; */
          disableOnInteraction: false
        },
        //&#x6ED1;&#x52A8;&#x901F;&#x5EA6;
        speed: 800,
        //&#x6ED1;&#x52A8;&#x65B9;&#x5411;
        direction: &quot;horizontal&quot;,
        //&#x5C0F;&#x624B;&#x638C;&#x6293;&#x53D6;&#x6ED1;&#x52A8;
        grabCursor: true,
        on: {
          //&#x6ED1;&#x52A8;&#x4E4B;&#x540E;&#x56DE;&#x8C03;&#x51FD;&#x6570;
          slideChangeTransitionStart: function() {
            /* realIndex&#x4E3A;&#x6EDA;&#x52A8;&#x5230;&#x5F53;&#x524D;&#x7684;slide&#x7D22;&#x5F15;&#x503C; */
            that.imgIndex= this.realIndex - 1;
          },
        },
        //&#x5206;&#x9875;&#x5668;&#x8BBE;&#x7F6E;
        pagination: {
          el: &quot;.swiper-pagination&quot;,
          clickable: true,
          type: &quot;bullets&quot;
        }
      }
   };
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code>data() {
    const that = this;
    <span class="hljs-class">return </span>{
<span class="hljs-symbol">      imgIndex:</span> <span class="hljs-number">1</span>,
<span class="hljs-symbol">      swiperOption:</span> {
        <span class="hljs-comment">//&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x81EA;&#x6709;&#x5C5E;&#x6027;&#xFF0C;&#x5982;&#x679C;notNextTick&#x8BBE;&#x7F6E;&#x4E3A;true&#xFF0C;&#x7EC4;&#x4EF6;&#x5219;&#x4E0D;&#x4F1A;&#x901A;&#x8FC7;NextTick&#x6765;&#x5B9E;&#x4F8B;&#x5316;swiper&#xFF0C;&#x4E5F;&#x5C31;&#x610F;&#x5473;&#x7740;&#x4F60;&#x53EF;&#x4EE5;&#x5728;&#x7B2C;&#x4E00;&#x65F6;&#x95F4;&#x83B7;&#x53D6;&#x5230;swiper&#x5BF9;&#x8C61;&#xFF0C;&#x5047;&#x5982;&#x4F60;&#x9700;&#x8981;&#x521A;&#x52A0;&#x8F7D;&#x904D;&#x4F7F;&#x7528;&#x83B7;&#x53D6;swiper&#x5BF9;&#x8C61;&#x6765;&#x505A;&#x4EC0;&#x4E48;&#x4E8B;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x4E00;&#x5B9A;&#x8981;&#x662F;true</span>
<span class="hljs-symbol">        notNextTick:</span> true,
        <span class="hljs-comment">//&#x5FAA;&#x73AF;</span>
<span class="hljs-symbol">        loop:</span> true,
        <span class="hljs-comment">//&#x8BBE;&#x5B9A;&#x521D;&#x59CB;&#x5316;&#x65F6;slide&#x7684;&#x7D22;&#x5F15;</span>
<span class="hljs-symbol">        initialSlide:</span> <span class="hljs-number">0</span>,
        <span class="hljs-comment">//&#x81EA;&#x52A8;&#x64AD;&#x653E;</span>
<span class="hljs-symbol">        autoplay:</span> {
<span class="hljs-symbol">          delay:</span> <span class="hljs-number">1500</span>,
<span class="hljs-symbol">          stopOnLastSlide:</span> false,
          <span class="hljs-comment">/* &#x89E6;&#x6478;&#x6ED1;&#x52A8;&#x540E;&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x8F6E;&#x64AD; */</span>
<span class="hljs-symbol">          disableOnInteraction:</span> false
        },
        <span class="hljs-comment">//&#x6ED1;&#x52A8;&#x901F;&#x5EA6;</span>
<span class="hljs-symbol">        speed:</span> <span class="hljs-number">800</span>,
        <span class="hljs-comment">//&#x6ED1;&#x52A8;&#x65B9;&#x5411;</span>
<span class="hljs-symbol">        direction:</span> <span class="hljs-string">&quot;horizontal&quot;</span>,
        <span class="hljs-comment">//&#x5C0F;&#x624B;&#x638C;&#x6293;&#x53D6;&#x6ED1;&#x52A8;</span>
<span class="hljs-symbol">        grabCursor:</span> true,
<span class="hljs-symbol">        on:</span> {
          <span class="hljs-comment">//&#x6ED1;&#x52A8;&#x4E4B;&#x540E;&#x56DE;&#x8C03;&#x51FD;&#x6570;</span>
<span class="hljs-symbol">          slideChangeTransitionStart:</span> function() {
            <span class="hljs-comment">/* realIndex&#x4E3A;&#x6EDA;&#x52A8;&#x5230;&#x5F53;&#x524D;&#x7684;slide&#x7D22;&#x5F15;&#x503C; */</span>
            that.imgIndex= this.realIndex - <span class="hljs-number">1</span>;
          },
        },
        <span class="hljs-comment">//&#x5206;&#x9875;&#x5668;&#x8BBE;&#x7F6E;</span>
<span class="hljs-symbol">        pagination:</span> {
<span class="hljs-symbol">          el:</span> <span class="hljs-string">&quot;.swiper-pagination&quot;</span>,
<span class="hljs-symbol">          clickable:</span> true,
<span class="hljs-symbol">          type:</span> <span class="hljs-string">&quot;bullets&quot;</span>
        }
      }
   };
},</code></pre><h1 id="articleHeader2">3.&#x9047;&#x89C1;&#x7684;&#x95EE;&#x9898;</h1><ul><li>&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#xFF0C;&#x5728;&#x56FE;&#x7247;&#x53EA;&#x6709;&#x4E00;&#x5F20;&#x65F6;&#xFF0C;&#x4ECD;&#x7136;&#x4F1A;&#x81EA;&#x52A8;&#x6EDA;&#x52A8;</li></ul><blockquote>&#x8FD9;&#x91CC;&#x5F88;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x4E00;&#x70B9;&#x5C31;&#x662F;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x76F4;&#x63A5;&#x8BBE;&#x7F6E;autoplay&#x4E3A;true&#x7684;&#x8BDD;&#xFF0C;&#x5728;&#x4F60;&#x89E6;&#x6478;&#x6ED1;&#x52A8;&#x56FE;&#x7247;&#x540E;&#xFF0C;&#x4ED6;&#x5C31;&#x4E0D;&#x4F1A;&#x518D;&#x81EA;&#x52A8;&#x6EDA;&#x52A8;&#x4E86;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x8FD9;&#x91CC;&#x6211;&#x662F;&#x5728;&#x4F7F;&#x7528;&#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#x540E;&#xFF0C;&#x5BF9;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x5224;&#x65AD; */
created() {
  this.$Request({
    url: &apos;&apos;,
    method: &apos;get&apos;,
    success: res =&gt; {
      this.swiperOption.autoplay = res.result.data.length != 1 ? {
        delay: 1500,
        stopOnLastSlide: false,
        disableOnInteraction: false
        } : false;
     }
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-string">/*</span> <span class="hljs-string">&#x8FD9;&#x91CC;&#x6211;&#x662F;&#x5728;&#x4F7F;&#x7528;&#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#x540E;&#xFF0C;&#x5BF9;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x5224;&#x65AD;</span> <span class="hljs-string">*/</span>
<span class="hljs-string">created()</span> <span class="hljs-string">{</span>
  <span class="hljs-string">this.$Request({</span>
<span class="hljs-attr">    url:</span> <span class="hljs-string">&apos;&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">    method:</span> <span class="hljs-string">&apos;get&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">    success:</span> <span class="hljs-string">res</span> <span class="hljs-string">=&gt;</span> <span class="hljs-string">{</span>
      <span class="hljs-string">this.swiperOption.autoplay</span> <span class="hljs-string">=</span> <span class="hljs-string">res.result.data.length</span> <span class="hljs-string">!=</span> <span class="hljs-number">1</span> <span class="hljs-string">?</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        delay:</span> <span class="hljs-number">1500</span><span class="hljs-string">,</span>
<span class="hljs-attr">        stopOnLastSlide:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">        disableOnInteraction:</span> <span class="hljs-literal">false</span>
        <span class="hljs-string">}</span> <span class="hljs-string">:</span> <span class="hljs-literal">false</span><span class="hljs-string">;</span>
     <span class="hljs-string">}</span>
  <span class="hljs-string">})</span>
<span class="hljs-string">}</span></code></pre><ul><li>&#x5728;on&#x91CC;&#x9762;&#xFF0C;&#x76D1;&#x542C;slideChangeTransitionStart&#x65B9;&#x6CD5;&#x65F6;&#xFF0C;&#x5728;&#x5F00;&#x59CB;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x7528;&#x7684;&#x662F;activeIndex&#x6765;&#x8BBE;&#x7F6E;&#x5BF9;&#x5E94;&#x7684;&#x7D22;&#x5F15;&#x503C;&#xFF0C;&#x8FD9;&#x4E2A;&#x7684;&#x8BDD;&#xFF0C;&#x6ED1;&#x5411;&#x4E0B;&#x4E00;&#x5F20;&#x6CA1;&#x6709;&#x53D1;&#x73B0;&#x95EE;&#x9898;&#xFF0C;&#x540E;&#x9762;&#xFF0C;&#x81EA;&#x5DF1;&#x8BD5;&#x7740;&#x6ED1;&#x5411;&#x4E0A;&#x4E00;&#x5F20;&#x56FE;&#x7247;&#xFF0C;&#x5C31;&#x53D1;&#x73B0;&#x51FA;&#x73B0;&#x95EE;&#x9898;&#xFF0C;&#x8FD9;&#x4E2A;&#x503C;&#x4E0D;&#x5BF9;&#x5E94;&#x4E86;,&#x4F7F;&#x7528;realIndex</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="on: {
   slideChangeTransitionStart: function() {
      that.imgIndex = this.realIndex + 1;
   },
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">on</span>: {
   <span class="hljs-attribute">slideChangeTransitionStart</span>: <span class="hljs-built_in">function</span>() {
      that.imgIndex = this.realIndex + <span class="hljs-number">1</span>;
   },
},</code></pre><ul><li>&#x5728;swiper&#x8FD9;&#x4E2A;&#x5BB9;&#x5668;&#x4E2D;&#xFF0C;&#x4F1A;&#x51FA;&#x73B0;&#x6EDA;&#x52A8;&#x5230;&#x6700;&#x540E;&#x4E00;&#x5F20;&#x56FE;&#x7247;&#x540E;&#x5C31;&#x4E0D;&#x81EA;&#x52A8;&#x6EDA;&#x52A8;&#x4E86;&#xFF0C;&#x4EE5;&#x53CA;&#x51FA;&#x73B0;&#x5E95;&#x8FB9;&#x7684;&#x5C0F;&#x5706;&#x70B9;&#x5199;&#x4E86;&#x540E;&#x4E0D;&#x663E;&#x793A;&#x7684;&#x95EE;&#x9898;</li></ul><blockquote>&#x539F;&#x56E0;&#x662F;&#x56E0;&#x4E3A;this.commodity&#x521A;&#x5F00;&#x59CB;&#x6570;&#x636E;&#x4E3A;[],&#x540E;&#x6765;&#x8D4B;&#x503C;&#x624D;&#x6709;&#x503C;&#xFF0C;&#x6240;&#x4EE5;&#x8981;&#x5148;&#x5224;&#x65AD;this.commodity&#x662F;&#x5426;&#x4E3A;&#x7A7A;,&#x8FD9;&#x91CC;&#x5C31;&#x5728;swiper&#x8FD9;&#x4E2A;&#x5BB9;&#x5668;&#x4E2D;&#x8FDB;&#x884C;&#x5224;&#x65AD;&#xFF0C;&#x82E5;&#x6570;&#x636E;&#x957F;&#x5EA6;&#x4E3A;0&#xFF0C;&#x5C31;&#x4E0D;&#x663E;&#x793A;&#x8FD9;&#x4E2A;&#x5BB9;&#x5668;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;swiper class=&apos;swiImgs&apos; :options=&quot;swiperOption&quot; v-if=&quot;commodity.length!=0&quot;&gt;&lt;/swiper&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code style="word-break:break-word;white-space:initial">&lt;swiper <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&apos;swiImgs&apos;</span> :options=<span class="hljs-string">&quot;swiperOption&quot;</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">&quot;commodity.length!=0&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">swiper</span>&gt;</span></span></code></pre><blockquote>&#x6B63;&#x5728;&#x52AA;&#x529B;&#x5B66;&#x4E60;&#x4E2D;&#xFF0C;&#x82E5;&#x5BF9;&#x4F60;&#x7684;&#x5B66;&#x4E60;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x7559;&#x4E0B;&#x4F60;&#x7684;&#x5370;&#x8BB0;&#x5457;&#xFF08;&#x70B9;&#x4E2A;&#x8D5E;&#x54AF;^_^&#xFF09;</blockquote><ul><li><p>&#x5F80;&#x671F;&#x597D;&#x6587;&#x63A8;&#x8350;&#xFF1A;</p><ul><li><a href="https://segmentfault.com/a/1190000016068450">webpack&#x6253;&#x5305;&#xFF08;&#x6709;&#x9762;&#x8BD5;&#x9898;&#xFF09;</a></li><li><a href="https://segmentfault.com/a/1190000016255824" target="_blank">&#x7EAF;css&#x5B9E;&#x73B0;&#x7011;&#x5E03;&#x6D41;&#xFF08;multi-column&#x591A;&#x5217;&#x53CA;flex&#x5E03;&#x5C40;&#xFF09;</a></li><li><a href="https://segmentfault.com/a/1190000016082968">&#x753B;&#x4E09;&#x89D2;&#x5F62;</a></li></ul></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue轮播图插件之vue-awesome-swiper

## 原文链接
[https://segmentfault.com/a/1190000016402768](https://segmentfault.com/a/1190000016402768)

