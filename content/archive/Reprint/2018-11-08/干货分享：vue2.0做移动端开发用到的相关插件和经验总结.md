---
title: 干货分享：vue2.0做移动端开发用到的相关插件和经验总结
reprint: true
categories: reprint
abbrlink: a428074f
date: 2018-11-08 02:30:09
---

{{% raw %}}
<p>&#x6700;&#x8FD1;&#x4E00;&#x76F4;&#x5728;&#x505A;&#x79FB;&#x52A8;&#x7AEF;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#x9879;&#x76EE;&#x7684;&#x5F00;&#x53D1;&#xFF0C;&#x4E5F;&#x662F;&#x6211;&#x9996;&#x6B21;&#x7528;vue&#x6765;&#x5F00;&#x53D1;&#x79FB;&#x52A8;&#x7AEF;&#x9879;&#x76EE;&#xFF0C;&#x524D;&#x671F;&#x79EF;&#x7D2F;&#x7684;&#x79FB;&#x52A8;&#x7AEF;&#x5F00;&#x53D1;&#x7ECF;&#x9A8C;&#x8F83;&#x5C11;&#x3002;&#x7ECF;&#x8FC7;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x953B;&#x70BC;&#xFF0C;&#x52A0;&#x6DF1;&#x4E86;&#x5BF9;vue&#x76F8;&#x5173;&#x77E5;&#x8BC6;&#x70B9;&#x7684;&#x7406;&#x89E3;&#x548C;&#x8FD0;&#x7528;&#xFF0C;&#x540C;&#x65F6;&#xFF0C;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x6240;&#x6D89;&#x53CA;&#x5230;&#x7684;&#x5FAE;&#x4FE1;api(&#x5FAE;&#x4FE1;&#x5206;&#x4EAB;&#xFF0C;&#x5FAE;&#x4FE1;&#x652F;&#x4ED8;)&#xFF0C;&#x767E;&#x5EA6;&#x5730;&#x56FE;api(&#x5982;&#x4F55;&#x5B9E;&#x4F8B;&#x5316;&#x5730;&#x56FE;&#xFF0C;&#x7ED9;&#x5730;&#x56FE;&#x6DFB;&#x52A0;&#x81EA;&#x5B9A;&#x4E49;&#x8986;&#x76D6;&#x7269;&#xFF0C;&#x7ED9;&#x5730;&#x56FE;&#x6DFB;&#x52A0;&#x81EA;&#x5B9A;&#x4E49;&#x6807;&#x6CE8;&#xFF0C;&#x5BF9;&#x5730;&#x56FE;&#x8FDB;&#x884C;&#x7F29;&#x653E;&#xFF0C;&#x62D6;&#x62FD;&#x7B49;)&#x7684;&#x76F8;&#x5173;&#x4F7F;&#x7528;&#xFF0C;&#x5F00;&#x9614;&#x4E86;&#x81EA;&#x5DF1;&#x7684;&#x77E5;&#x8BC6;&#x773C;&#x754C;&#xFF1B;&#x73B0;&#x5C06;&#x6211;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#x79EF;&#x7D2F;&#x7684;&#x76F8;&#x5173;&#x7ECF;&#x9A8C;&#x4E0E;&#x5927;&#x5BB6;&#x8FDB;&#x884C;&#x5206;&#x4EAB;&#xFF0C;&#x5E0C;&#x671B;&#x548C;&#x5927;&#x5BB6;&#x4E00;&#x8D77;&#x5B66;&#x4E60;&#x548C;&#x8FDB;&#x6B65;....</p><ul><li>vux&#xFF1A;Vue &#x79FB;&#x52A8;&#x7AEF; UI &#x7EC4;&#x4EF6;&#x5E93;&#x7684;&#x4F7F;&#x7528;&#xFF1B;</li><li>vue-lazyload &#xFF1A;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x6613;&#x7528;&#x7684; Vue &#x56FE;&#x7247;&#x5EF6;&#x8FDF;&#x52A0;&#x8F7D;&#x63D2;&#x4EF6;&#xFF1B;</li><li>vuex&#xFF1A;vue&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x5DE5;&#x5177;&#x8BE6;&#x7EC6;&#x5165;&#x95E8;&#xFF1B;</li><li>async/await&#xFF1A;&#x5F02;&#x6B65;&#x795E;&#x5668;&#x6765;&#x5C01;&#x88C5;&#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#x6587;&#x4EF6;fetch.js</li><li>vue &#x9879;&#x76EE;&#x4E2D;&#x7684;&#x8FED;&#x4EE3;&#x5224;&#x65AD;&#x6280;&#x5DE7;&#xFF1B;</li><li>vue &#x9879;&#x76EE;&#x4E2D;&#x5E38;&#x7528;&#x7684;&#x56FE;&#x7247;&#x5F15;&#x5165;&#x65B9;&#x5F0F;&#xFF1B;</li><li><p>&#x5FAE;&#x4FE1;api&#x5728;vue&#x9879;&#x76EE;&#x4E2D;&#x7684;&#x4F7F;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. vue2&#x5B9E;&#x73B0;&#x5FAE;&#x4FE1;&#x5206;&#x4EAB;&#x5751;&#x70B9;&#x548C;&#x7ECF;&#x9A8C; &#xFF1B;

2. vue2&#x5B9E;&#x73B0;&#x5FAE;&#x4FE1;&#x652F;&#x4ED8;&#x5751;&#x70B9;&#x548C;&#x7ECF;&#x9A8C;&#xFF1B;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>vue2&#x5B9E;&#x73B0;&#x5FAE;&#x4FE1;&#x5206;&#x4EAB;&#x5751;&#x70B9;&#x548C;&#x7ECF;&#x9A8C; &#xFF1B;

<span class="hljs-bullet">2. </span>vue2&#x5B9E;&#x73B0;&#x5FAE;&#x4FE1;&#x652F;&#x4ED8;&#x5751;&#x70B9;&#x548C;&#x7ECF;&#x9A8C;&#xFF1B;
</code></pre></li><li><p>&#x767E;&#x5EA6;&#x5730;&#x56FE;api&#x5728;vue&#x9879;&#x76EE;&#x4E2D;&#x7684;&#x4F7F;&#x7528;:&#xA0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.  vue2.0&#x9879;&#x76EE;&#x4E2D;&#x5982;&#x4F55;&#x4F7F;&#x7528;&#x767E;&#x5EA6;&#x5730;&#x56FE;api

2.  vue2&#x5982;&#x4F55;&#x7ED9;&#x5730;&#x56FE;&#x6DFB;&#x52A0;&#x623F;&#x6E90;&#x8986;&#x76D6;&#x7269;&#xFF1B;

3. &#x5982;&#x4F55;&#x7ED9;&#x5730;&#x56FE;&#x6DFB;&#x52A0;&#x81EA;&#x5B9A;&#x4E49;&#x5B9A;&#x4F4D;&#x63A7;&#x4EF6;&#x5E76;&#x66F4;&#x6362;&#x63A7;&#x4EF6;&#x7684;&#x56FE;&#x6807;&#xFF1B;

4. &#x5982;&#x4F55;&#x7ED9;&#x5730;&#x56FE;&#x6DFB;&#x52A0;&#x81EA;&#x5B9A;&#x4E49;&#x5F53;&#x524D;&#x4F4D;&#x7F6E;&#x5B9A;&#x4F4D;&#x6807;&#x6CE8;

5. &#x51E0;&#x4E2A;&#x5E38;&#x7528;&#x7684;api(&#x5730;&#x56FE;&#x7F29;&#x653E;&#xFF0C;&#x62D6;&#x62FD;&#xFF0C;&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x4F4D;&#x7F6E;)&#x7B49;&#x529F;&#x80FD;&#x7684;&#x5B9E;&#x73B0;&#xFF1B;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>  vue2<span class="hljs-number">.0</span>&#x9879;&#x76EE;&#x4E2D;&#x5982;&#x4F55;&#x4F7F;&#x7528;&#x767E;&#x5EA6;&#x5730;&#x56FE;api

<span class="hljs-number">2.</span>  vue2&#x5982;&#x4F55;&#x7ED9;&#x5730;&#x56FE;&#x6DFB;&#x52A0;&#x623F;&#x6E90;&#x8986;&#x76D6;&#x7269;&#xFF1B;

<span class="hljs-number">3.</span> &#x5982;&#x4F55;&#x7ED9;&#x5730;&#x56FE;&#x6DFB;&#x52A0;&#x81EA;&#x5B9A;&#x4E49;&#x5B9A;&#x4F4D;&#x63A7;&#x4EF6;&#x5E76;&#x66F4;&#x6362;&#x63A7;&#x4EF6;&#x7684;&#x56FE;&#x6807;&#xFF1B;

<span class="hljs-number">4.</span> &#x5982;&#x4F55;&#x7ED9;&#x5730;&#x56FE;&#x6DFB;&#x52A0;&#x81EA;&#x5B9A;&#x4E49;&#x5F53;&#x524D;&#x4F4D;&#x7F6E;&#x5B9A;&#x4F4D;&#x6807;&#x6CE8;

<span class="hljs-number">5.</span> &#x51E0;&#x4E2A;&#x5E38;&#x7528;&#x7684;api(&#x5730;&#x56FE;&#x7F29;&#x653E;&#xFF0C;&#x62D6;&#x62FD;&#xFF0C;&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x4F4D;&#x7F6E;)&#x7B49;&#x529F;&#x80FD;&#x7684;&#x5B9E;&#x73B0;&#xFF1B;
</code></pre></li></ul><h3 id="articleHeader0">VUX - Vue &#x79FB;&#x52A8;&#x7AEF; UI &#x7EC4;&#x4EF6;&#x5E93;&#x7684;&#x4F7F;&#x7528;&#xFF1B;</h3><p>vux&#x4ECB;&#x7ECD;&#xFF1A;&#x8BE6;&#x7EC6;&#x8BF7;&#x53C2;&#x89C1;<a href="https://vux.li/" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x6587;&#x6863;</a>&#x3002;</p><p>&#x7531;&#x4E8E;&#x662F;&#x505A;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#x79FB;&#x52A8;&#x7AEF;&#x9879;&#x76EE;&#xFF0C;&#x6211;&#x4EEC;&#x5BF9;&#x6BD4;&#x4E86;&#x51E0;&#x4E2A;vuejs&#x7684;&#x79FB;&#x52A8;&#x7AEF;UI&#x5E93;&#xFF0C;&#x77E5;&#x9053;vux&#x662F;&#x57FA;&#x4E8E;WeUI&#x548C;Vue(2.x)&#x5F00;&#x53D1;&#x7684;&#x79FB;&#x52A8;&#x7AEF;UI&#x7EC4;&#x4EF6;&#x5E93;&#xFF0C;&#x4E3B;&#x8981;&#x670D;&#x52A1;&#x4E8E;&#x5FAE;&#x4FE1;&#x9875;&#x9762;&#xFF1B;&#x867D;&#x7136;&#x5B83;&#x5C5E;&#x4E8E;&#x4E2A;&#x4EBA;&#x7EF4;&#x62A4;&#xFF0C;&#x4F53;&#x9A8C;&#x4E0A;&#x9700;&#x8981;&#x4E00;&#x4E9B;&#x6539;&#x8FDB;&#x3002;&#x4F46;&#x9879;&#x76EE;&#x4E2D;&#x51E0;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684;&#x4F7F;&#x7528;&#xFF0C;&#x5927;&#x5927;&#x63D0;&#x5347;&#x4E86;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x3002;</p><p>&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><ul><li>&#x5B89;&#x88C5;- vux:</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vux --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">npm install vux --save</code></pre><h5>&#x6CE8;&#x610F;&#x4E8B;&#x9879;&#xFF1A;</h5><p>vux2&#x5FC5;&#x987B;&#x914D;&#x5408;vux-loader&#x4F7F;&#x7528;, &#x8BF7;&#x5728;build/webpack.base.conf.js&#x91CC;&#x53C2;&#x7167;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x914D;&#x7F6E;&#xFF1A;vux2&#x5FC5;&#x987B;&#x914D;&#x5408;vux-loader&#x4F7F;&#x7528;, &#x8BF7;&#x5728;build/webpack.base.conf.js&#x91CC;&#x53C2;&#x7167;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x914D;&#x7F6E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const vuxLoader = require(&apos;vux-loader&apos;)
const webpackConfig = originalConfig // &#x539F;&#x6765;&#x7684; module.exports &#x4EE3;&#x7801;&#x8D4B;&#x503C;&#x7ED9;&#x53D8;&#x91CF; webpackConfig

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: [&apos;vux-ui&apos;]
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> vuxLoader = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;vux-loader&apos;</span>)
<span class="hljs-keyword">const</span> webpackConfig = originalConfig <span class="hljs-comment">// &#x539F;&#x6765;&#x7684; module.exports &#x4EE3;&#x7801;&#x8D4B;&#x503C;&#x7ED9;&#x53D8;&#x91CF; webpackConfig</span>

<span class="hljs-built_in">module</span>.exports = vuxLoader.merge(webpackConfig, {
  <span class="hljs-attr">plugins</span>: [<span class="hljs-string">&apos;vux-ui&apos;</span>]
})</code></pre><ul><li>&#x4EE5;&#x8F6E;&#x64AD;&#x7EC4;&#x4EF6;swiper&#x4E3A;&#x4F8B;</li></ul><p>&#x5982;&#x679C;&#x4F60;&#x8981;&#x4F7F;&#x7528;&#x7684;&#x7EC4;&#x4EF6;&#x53EA;&#x662F;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x4E2D;&#x4F7F;&#x7528;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x53EA;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x4E2D;&#x5F15;&#x5165;&#x5373;&#x53EF;&#x3002;&#x5982;&#x679C;&#x5728;&#x5F88;&#x591A;&#x9875;&#x9762;&#x4E2D;&#x90FD;&#x6709;&#x4F7F;&#x7528;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;main.js&#x4E2D;&#x4EE5;&#x5168;&#x5C40;&#x65B9;&#x5F0F;&#x5F15;&#x7528;&#x3002;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &lt;template&gt;
    &lt;swiper auto loop :interval=&quot;interval&quot; :duration=&quot;duration&quot; id=&quot;swiper-banner&quot;
            class=&quot;swiper-banner&quot;
            :height=&quot;height&quot;&gt;  
        &lt;swiper-item 
                class=&quot;swiper-demo-img&quot;
                v-for=&quot;(item, index) in bannerList&quot;
                :key=&quot;index&quot;&gt;
                    &lt;img :src=&quot;item.img&quot;&gt;
        &lt;/swiper-item&gt;
    &lt;/swiper&gt;
 &lt;/template&gt;

 &lt;script&gt;
   import { Swiper, SwiperItem } from &quot;vux&quot;;

   export default {
        name: &quot;swiper&quot;,
        data() {
            interval:4000,// &#x8F6E;&#x64AD;&#x505C;&#x7559;&#x65F6;&#x95F4;
            duration:300// &#x5207;&#x6362;&#x52A8;&#x753B;&#x65F6;&#x95F4;
            height:&quot;10.19rem&quot;, // &#x9AD8;&#x5EA6;&#x503C;
            bannerList:[
                {img: &apos;https://static.vux.li/demo/1.jpg&apos;,title: &apos;&#x9001;&#x4F60;&#x4E00;&#x6735;fua&apos;},
                {img: &apos;https://static.vux.li/demo/5.jpg&apos;,title: &apos;&#x5C0F;&#x82B1;&apos;}
            ]
        }
   }

 &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"> &lt;template&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">swiper</span> <span class="hljs-attr">auto</span> <span class="hljs-attr">loop</span> <span class="hljs-attr">:interval</span>=<span class="hljs-string">&quot;interval&quot;</span> <span class="hljs-attr">:duration</span>=<span class="hljs-string">&quot;duration&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;swiper-banner&quot;</span>
            <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;swiper-banner&quot;</span>
            <span class="hljs-attr">:height</span>=<span class="hljs-string">&quot;height&quot;</span>&gt;</span>  
        <span class="hljs-tag">&lt;<span class="hljs-name">swiper-item</span> 
                <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;swiper-demo-img&quot;</span>
                <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(item, index) in bannerList&quot;</span>
                <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;index&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">&quot;item.img&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">swiper-item</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">swiper</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

 <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
   <span class="hljs-keyword">import</span> { Swiper, SwiperItem } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vux&quot;</span>;

   <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;swiper&quot;</span>,
        data() {
            <span class="hljs-attr">interval</span>:<span class="hljs-number">4000</span>,<span class="hljs-comment">// &#x8F6E;&#x64AD;&#x505C;&#x7559;&#x65F6;&#x95F4;</span>
            duration:<span class="hljs-number">300</span><span class="hljs-comment">// &#x5207;&#x6362;&#x52A8;&#x753B;&#x65F6;&#x95F4;</span>
            height:<span class="hljs-string">&quot;10.19rem&quot;</span>, <span class="hljs-comment">// &#x9AD8;&#x5EA6;&#x503C;</span>
            bannerList:[
                {<span class="hljs-attr">img</span>: <span class="hljs-string">&apos;https://static.vux.li/demo/1.jpg&apos;</span>,<span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x9001;&#x4F60;&#x4E00;&#x6735;fua&apos;</span>},
                {<span class="hljs-attr">img</span>: <span class="hljs-string">&apos;https://static.vux.li/demo/5.jpg&apos;</span>,<span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x5C0F;&#x82B1;&apos;</span>}
            ]
        }
   }

 </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p>&#x5C5E;&#x6027;auto,&#x9ED8;&#x8BA4;&#x4E3A;false&#xFF0C;&#x8868;&#x793A;&#x662F;&#x5426;&#x81EA;&#x52A8;&#x8F6E;&#x64AD;&#xFF1B;&#x5C5E;&#x6027;loop,&#x9ED8;&#x8BA4;&#x4E3A;false&#xFF0C;&#x8868;&#x793A;&#x662F;&#x5426;&#x5FAA;&#x73AF;;</p><h3 id="articleHeader1">vue-lazyload &#xFF1A;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x6613;&#x7528;&#x7684; Vue &#x56FE;&#x7247;&#x5EF6;&#x8FDF;&#x52A0;&#x8F7D;&#x63D2;&#x4EF6;</h3><p>&#x5B98;&#x65B9;&#x7F51;&#x5740;&#xFF1A;<a href="https://github.com/hilongjw/vue-lazyload" rel="nofollow noreferrer" target="_blank">vue-lazyload</a></p><p>&#x4ECB;&#x7ECD;&#xFF1A;<br>vue-lazyload&#x4E3B;&#x8981;&#x5E94;&#x7528;&#x4E8E;&#x56FE;&#x7247;&#x5EF6;&#x8FDF;&#x52A0;&#x8F7D;&#x3002;&#x5305;&#x542B;&#x5982;&#x4E0B;&#x7684;&#x7279;&#x70B9;&#xFF1A;</p><ul><li>&#x5C0F;&#x5DE7;&#x8F7B;&#x4FBF;&#xFF0C;&#x529F;&#x80FD;&#x5F3A;&#x5927;&#xFF0C;&#x6613;&#x4E8E;&#x4F7F;&#x7528;</li><li>&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x52A0;&#x8F7D;&#x4EFB;&#x4F55;&#x56FE;&#x50CF;&#x7C7B;&#x578B;</li><li>&#x652F;&#x6301;Vue 1.0&#x548C;Vue 2.0</li></ul><p>&#x7406;&#x89E3;&#x56FE;&#x7247;&#x5EF6;&#x8FDF;&#x52A0;&#x8F7D;:</p><p>&#x5F53;&#x67D0;&#x4E2A;&#x7F51;&#x9875;&#x4E2D;&#x5448;&#x73B0;&#x7684;&#x56FE;&#x7247;&#x8F83;&#x591A;&#x65F6;&#xFF0C;&#x7531;&#x4E8E;&#x7F51;&#x7EDC;&#x7B49;&#x539F;&#x56E0;&#xFF0C;&#x8BBF;&#x95EE;&#x8BE5;&#x7F51;&#x9875;&#x65F6;&#xFF0C;&#x6240;&#x6709;&#x7684;&#x56FE;&#x7247;&#x4E0D;&#x4F1A;&#x7ACB;&#x9A6C;&#x5168;&#x90E8;&#x8FDB;&#x884C;&#x663E;&#x793A;&#x51FA;&#x6765;&#xFF0C;&#x4F1A;&#x51FA;&#x73B0;&#x4E00;&#x5B9A;&#x7684;&#x7F51;&#x7EDC;&#x5EF6;&#x8FDF;&#x52A0;&#x8F7D;&#x7684;&#x73B0;&#x8C61;&#xFF0C;&#x5F71;&#x54CD;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#xFF1B;&#x4F46;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;vue-lazyload&#x63D2;&#x4EF6;&#x6765;&#x5B9E;&#x73B0;&#x5728;&#x56FE;&#x7247;&#x52A0;&#x8F7D;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x5148;&#x663E;&#x793A;&#x51FA;&#x9ED8;&#x8BA4;&#x7684;&#x52A0;&#x8F7D;&#x56FE;&#x7247;&#xFF0C;&#x76F4;&#x5230;&#x56FE;&#x7247;&#x5B8C;&#x5168;&#x663E;&#x793A;&#xFF0C;&#x9ED8;&#x8BA4;&#x56FE;&#x7247;&#x6D88;&#x5931;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x4F1A;&#x5927;&#x5927;&#x7684;&#x63D0;&#x5347;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#x3002;</p><p>&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><p>1&#x3001;&#x901A;&#x8FC7;npm&#x5B89;&#x88C5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-lazyload -s" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css" style="word-break:break-word;white-space:initial"><span class="hljs-selector-tag">npm</span> <span class="hljs-selector-tag">install</span> <span class="hljs-selector-tag">vue-lazyload</span> <span class="hljs-selector-tag">-s</span></code></pre><p>2&#x3001;&#x5728;main.js&#x4E2D;&#x8FDB;&#x884C;&#x5F15;&#x7528;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import App from &apos;./App.vue&apos;
import VueLazyload from &apos;vue-lazyload&apos;

Vue.use(VueLazyload, {
  preLoad: 1.3, // &#x9884;&#x538B;&#x9AD8;&#x5EA6;&#x7684;&#x6BD4;&#x4F8B;
  error: &apos;../assets/img/no-pic.png&apos;, // &#x56FE;&#x50CF;&#x7684;&#x52A0;&#x8F7D;&#x5931;&#x8D25;&#x65F6; &#x663E;&#x793A;&#x7684;error&#x56FE;&#x6807;
  loading: &apos;../assets/imgLoading.png&apos;, // &#x56FE;&#x50CF;&#x6B63;&#x5E38;&#x52A0;&#x8F7D;&#x65F6; &#x663E;&#x793A;&#x7684;loading&#x56FE;&#x6807;
  attempt: 1 // &#x56FE;&#x50CF;&#x5C1D;&#x8BD5;&#x52A0;&#x8F7D; &#x6B21;&#x6570;
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">import</span> <span class="hljs-selector-tag">Vue</span> <span class="hljs-selector-tag">from</span> &apos;<span class="hljs-selector-tag">vue</span>&apos;
<span class="hljs-selector-tag">import</span> <span class="hljs-selector-tag">App</span> <span class="hljs-selector-tag">from</span> &apos;./<span class="hljs-selector-tag">App</span><span class="hljs-selector-class">.vue</span>&apos;
<span class="hljs-selector-tag">import</span> <span class="hljs-selector-tag">VueLazyload</span> <span class="hljs-selector-tag">from</span> &apos;<span class="hljs-selector-tag">vue-lazyload</span>&apos;

<span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.use</span>(<span class="hljs-selector-tag">VueLazyload</span>, {
  <span class="hljs-attribute">preLoad</span>: <span class="hljs-number">1.3</span>, // &#x9884;&#x538B;&#x9AD8;&#x5EA6;&#x7684;&#x6BD4;&#x4F8B;
  error: <span class="hljs-string">&apos;../assets/img/no-pic.png&apos;</span>, // &#x56FE;&#x50CF;&#x7684;&#x52A0;&#x8F7D;&#x5931;&#x8D25;&#x65F6; &#x663E;&#x793A;&#x7684;error&#x56FE;&#x6807;
  loading: <span class="hljs-string">&apos;../assets/imgLoading.png&apos;</span>, // &#x56FE;&#x50CF;&#x6B63;&#x5E38;&#x52A0;&#x8F7D;&#x65F6; &#x663E;&#x793A;&#x7684;loading&#x56FE;&#x6807;
  attempt: <span class="hljs-number">1</span> // &#x56FE;&#x50CF;&#x5C1D;&#x8BD5;&#x52A0;&#x8F7D; &#x6B21;&#x6570;
})
</code></pre><p>3&#x3001;&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;img v-lazy=&quot;item.picUrl&quot; alt=&quot;&quot;&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">img</span> <span class="hljs-selector-tag">v-lazy</span>=&quot;<span class="hljs-selector-tag">item</span><span class="hljs-selector-class">.picUrl</span>&quot; <span class="hljs-selector-tag">alt</span>=&quot;&quot;&gt;
</code></pre><p>4&#x3001;&#x5B9E;&#x73B0;&#x6548;&#x679C;&#x4EE5;&#x540E;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x6839;&#x636E;API&#x8FDB;&#x884C;&#x529F;&#x80FD;&#x6269;&#x5C55;&#x3002;</p><p>&#x76F8;&#x5E94;&#x7684;&#x53C2;&#x6570;&#x53EF;&#x53C2;&#x8003;<a href="https://www.npmjs.com/package/vue-lazyload" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;API</a>&#x8FDB;&#x884C;&#x8BBE;&#x7F6E;&#x3002;</p><p>5&#x3001;vue-lazyLoad&#x6587;&#x4EF6;&#x6574;&#x7406;&#xFF0C;&#x8BF7;&#x53C2;&#x7167;&#xFF1A;<a href="https://github.com/wdlhao/vue2-plugs-demo" rel="nofollow noreferrer" target="_blank">vue2-plugs-demo</a>&#x9879;&#x76EE;&#x4E2D;src/components/LazyLoad/index.vue &#x548C; src/main.js&#x90E8;&#x5206;&#xFF1B;&#xFF1B;</p><h3 id="articleHeader2">vuex:vue&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x5DE5;&#x5177;&#x8BE6;&#x7EC6;&#x5165;&#x95E8;&#xFF1B;</h3><h4>vuex&#x4ECB;&#x7ECD;&#xFF1A;</h4><p>&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x8BF7;&#x53C2;&#x89C1;<a href="https://vuex.vuejs.org/zh/" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x7F51;&#x7AD9;</a>&#x3002;Vuex &#x662F;&#x4E00;&#x4E2A;&#x4E13;&#x4E3A; Vue.js &#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x5F00;&#x53D1;&#x7684;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x6A21;&#x5F0F;&#x3002;&#x5B83;&#x91C7;&#x7528;&#x96C6;&#x4E2D;&#x5F0F;&#x5B58;&#x50A8;&#x7BA1;&#x7406;&#x5E94;&#x7528;&#x7684;&#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x5E76;&#x4EE5;&#x76F8;&#x5E94;&#x7684;&#x89C4;&#x5219;&#x4FDD;&#x8BC1;&#x72B6;&#x6001;&#x4EE5;&#x4E00;&#x79CD;&#x53EF;&#x9884;&#x6D4B;&#x7684;&#x65B9;&#x5F0F;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x3002;<br>&#x4EC0;&#x4E48;&#x60C5;&#x51B5;&#x4E0B;&#x6211;&#x5E94;&#x8BE5;&#x4F7F;&#x7528; Vuex&#xFF1F;<br>&#x5982;&#x679C;&#x60A8;&#x9700;&#x8981;&#x6784;&#x5EFA;&#x4E00;&#x4E2A;&#x4E2D;&#x5927;&#x578B;&#x5355;&#x9875;&#x5E94;&#x7528;&#xFF0C;&#x60A8;&#x5F88;&#x53EF;&#x80FD;&#x4F1A;&#x8003;&#x8651;&#x5982;&#x4F55;&#x66F4;&#x597D;&#x5730;&#x5728;&#x7EC4;&#x4EF6;&#x5916;&#x90E8;&#x7BA1;&#x7406;&#x72B6;&#x6001;&#xFF0C;Vuex &#x5C06;&#x4F1A;&#x6210;&#x4E3A;&#x81EA;&#x7136;&#x800C;&#x7136;&#x7684;&#x9009;&#x62E9;&#x3002;<br>&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#xFF1A;</p><ul><li>&#x5B89;&#x88C5;vuex:</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vuex --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">npm install vuex --save</code></pre><ul><li>&#x5728;mins.js&#x4E2D;&#x5F15;&#x7528;&#xFF1A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vuex from &quot;vuex&quot;;
Vue.use(Vuex);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vuex&quot;</span>;
Vue.use(Vuex);</code></pre><h4>&#x7406;&#x89E3;vuex&#x7684;5&#x4E2A;&#x57FA;&#x672C;&#x5BF9;&#x8C61;&#xFF1A;</h4><ul><li>state&#xFF1A;&#x5B58;&#x50A8;&#x72B6;&#x6001;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x53D8;&#x91CF;&#xFF1B;</li><li>getters&#xFF1A;&#x6D3E;&#x751F;&#x72B6;&#x6001;&#x3002;&#x4E5F;&#x5C31;&#x662F;set&#x3001;get&#x4E2D;&#x7684;get&#xFF0C;&#x6709;&#x4E24;&#x4E2A;&#x53EF;&#x9009;&#x53C2;&#x6570;&#xFF1A;state&#x3001;getters&#x5206;&#x522B;&#x53EF;&#x4EE5;&#x83B7;&#x53D6;state&#x4E2D;&#x7684;&#x53D8;&#x91CF;&#x548C;&#x5176;&#x4ED6;&#x7684;getters&#x3002;&#x5916;&#x90E8;&#x8C03;&#x7528;&#x65B9;&#x5F0F;&#xFF1A;store.getters.personInfo()&#x3002;&#x5C31;&#x548C;vue&#x7684;computed&#x5DEE;&#x4E0D;&#x591A;&#xFF1B;</li><li>mutations&#xFF1A;&#x63D0;&#x4EA4;&#x72B6;&#x6001;&#x4FEE;&#x6539;&#x3002;&#x4E5F;&#x5C31;&#x662F;set&#x3001;get&#x4E2D;&#x7684;set&#xFF0C;&#x8FD9;&#x662F;vuex&#x4E2D;&#x552F;&#x4E00;&#x4FEE;&#x6539;state&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x4F46;&#x4E0D;&#x652F;&#x6301;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x3002;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x9ED8;&#x8BA4;&#x662F;state&#x3002;&#x5916;&#x90E8;&#x8C03;&#x7528;&#x65B9;&#x5F0F;&#xFF1A;store.commit(&apos;SET_AGE&apos;, 18)&#x3002;&#x548C;vue&#x4E2D;&#x7684;methods&#x7C7B;&#x4F3C;&#x3002;</li><li>actions&#xFF1A;&#x548C;mutations&#x7C7B;&#x4F3C;&#x3002;&#x4E0D;&#x8FC7;actions&#x652F;&#x6301;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x3002;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x9ED8;&#x8BA4;&#x662F;&#x548C;store&#x5177;&#x6709;&#x76F8;&#x540C;&#x53C2;&#x6570;&#x5C5E;&#x6027;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#x5916;&#x90E8;&#x8C03;&#x7528;&#x65B9;&#x5F0F;&#xFF1A;store.dispatch(&apos;nameAsyn&apos;)&#x3002;</li><li>modules&#xFF1A;store&#x7684;&#x5B50;&#x6A21;&#x5757;&#xFF0C;&#x5185;&#x5BB9;&#x5C31;&#x76F8;&#x5F53;&#x4E8E;&#x662F;store&#x7684;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x3002;&#x8C03;&#x7528;&#x65B9;&#x5F0F;&#x548C;&#x524D;&#x9762;&#x4ECB;&#x7ECD;&#x7684;&#x76F8;&#x4F3C;&#xFF0C;&#x53EA;&#x662F;&#x8981;&#x52A0;&#x4E0A;&#x5F53;&#x524D;&#x5B50;&#x6A21;&#x5757;&#x540D;&#xFF0C;&#x5982;&#xFF1A;store.a.getters.xxx()&#x3002;</li></ul><h4>vue-cli&#x4E2D;&#x4F7F;&#x7528;vuex&#x7684;&#x65B9;&#x5F0F;</h4><p>&#x4E00;&#x822C;&#x6765;&#x8BB2;&#xFF0C;&#x6211;&#x4EEC;&#x90FD;&#x4F1A;&#x91C7;&#x7528;vue-cli&#x6765;&#x8FDB;&#x884C;&#x5B9E;&#x9645;&#x7684;&#x5F00;&#x53D1;&#xFF0C;&#x5728;vue-cli&#x4E2D;&#xFF0C;&#x5F00;&#x53D1;&#x548C;&#x8C03;&#x7528;&#x65B9;&#x5F0F;&#x7A0D;&#x5FAE;&#x4E0D;&#x540C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x251C;&#x2500;&#x2500; index.html
&#x251C;&#x2500;&#x2500; main.js
&#x251C;&#x2500;&#x2500; components
&#x2514;&#x2500;&#x2500; store
    &#x251C;&#x2500;&#x2500; index.js          # &#x6211;&#x4EEC;&#x7EC4;&#x88C5;&#x6A21;&#x5757;&#x5E76;&#x5BFC;&#x51FA; store &#x7684;&#x5730;&#x65B9;
    &#x251C;&#x2500;&#x2500; state.js          # &#x8DDF;&#x7EA7;&#x522B;&#x7684; state
    &#x251C;&#x2500;&#x2500; getters.js        # &#x8DDF;&#x7EA7;&#x522B;&#x7684; getter
    &#x251C;&#x2500;&#x2500; mutation-types.js # &#x6839;&#x7EA7;&#x522B;&#x7684;mutations&#x540D;&#x79F0;&#xFF08;&#x5B98;&#x65B9;&#x63A8;&#x8350;mutions&#x65B9;&#x6CD5;&#x540D;&#x4F7F;&#x7528;&#x5927;&#x5199;&#xFF09;
    &#x251C;&#x2500;&#x2500; mutations.js      # &#x6839;&#x7EA7;&#x522B;&#x7684; mutation
    &#x251C;&#x2500;&#x2500; actions.js        # &#x6839;&#x7EA7;&#x522B;&#x7684; action
    &#x2514;&#x2500;&#x2500; modules
        &#x251C;&#x2500;&#x2500; index.js         # &#x6A21;&#x5757;&#x96C6;&#x5408;
        &#x251C;&#x2500;&#x2500; m1.js         # &#x6A21;&#x5757;1
        &#x251C;&#x2500;&#x2500; m2.js         # &#x6A21;&#x5757;2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">&#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.html</span>
&#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">main</span><span class="hljs-selector-class">.js</span>
&#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">components</span>
&#x2514;&#x2500;&#x2500; <span class="hljs-selector-tag">store</span>
    &#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>          # &#x6211;&#x4EEC;&#x7EC4;&#x88C5;&#x6A21;&#x5757;&#x5E76;&#x5BFC;&#x51FA; <span class="hljs-selector-tag">store</span> &#x7684;&#x5730;&#x65B9;
    &#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">state</span><span class="hljs-selector-class">.js</span>          # &#x8DDF;&#x7EA7;&#x522B;&#x7684; <span class="hljs-selector-tag">state</span>
    &#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">getters</span><span class="hljs-selector-class">.js</span>        # &#x8DDF;&#x7EA7;&#x522B;&#x7684; <span class="hljs-selector-tag">getter</span>
    &#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">mutation-types</span><span class="hljs-selector-class">.js</span> # &#x6839;&#x7EA7;&#x522B;&#x7684;<span class="hljs-selector-tag">mutations</span>&#x540D;&#x79F0;&#xFF08;&#x5B98;&#x65B9;&#x63A8;&#x8350;<span class="hljs-selector-tag">mutions</span>&#x65B9;&#x6CD5;&#x540D;&#x4F7F;&#x7528;&#x5927;&#x5199;&#xFF09;
    &#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">mutations</span><span class="hljs-selector-class">.js</span>      # &#x6839;&#x7EA7;&#x522B;&#x7684; <span class="hljs-selector-tag">mutation</span>
    &#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">actions</span><span class="hljs-selector-class">.js</span>        # &#x6839;&#x7EA7;&#x522B;&#x7684; <span class="hljs-selector-tag">action</span>
    &#x2514;&#x2500;&#x2500; <span class="hljs-selector-tag">modules</span>
        &#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>         # &#x6A21;&#x5757;&#x96C6;&#x5408;
        &#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">m1</span><span class="hljs-selector-class">.js</span>         # &#x6A21;&#x5757;1
        &#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">m2</span><span class="hljs-selector-class">.js</span>         # &#x6A21;&#x5757;2</code></pre><p>state.js&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const state = {
    name: &apos;weish&apos;,
    age: 22
};

export default state;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">const</span> <span class="hljs-selector-tag">state</span> = {
    <span class="hljs-attribute">name</span>: <span class="hljs-string">&apos;weish&apos;</span>,
    age: <span class="hljs-number">22</span>
};

<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">state</span>;</code></pre><p>getters.js&#x793A;&#x4F8B;&#xFF08;&#x6211;&#x4EEC;&#x4E00;&#x822C;&#x4F7F;&#x7528;getters&#x6765;&#x83B7;&#x53D6;state&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x76F4;&#x63A5;&#x4F7F;&#x7528;state&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const name = (state) =&gt; {
    return state.name;
}

export const age = (state) =&gt; {
    return state.age
}

export const other = (state) =&gt; {
    return `My name is ${state.name}, I am ${state.age}.`;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">const</span> <span class="hljs-selector-tag">name</span> = (<span class="hljs-selector-tag">state</span>) =&gt; {
    return state.name;
}

<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">const</span> <span class="hljs-selector-tag">age</span> = (<span class="hljs-selector-tag">state</span>) =&gt; {
    return state.age
}

<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">const</span> <span class="hljs-selector-tag">other</span> = (<span class="hljs-selector-tag">state</span>) =&gt; {
    return `My name is ${state.name}, <span class="hljs-selector-tag">I</span> <span class="hljs-selector-tag">am</span> ${state.age}.`;
}</code></pre><p>mutation-type.js&#x793A;&#x4F8B;&#xFF08;&#x6211;&#x4EEC;&#x4F1A;&#x5C06;&#x6240;&#x6709;mutations&#x7684;&#x51FD;&#x6570;&#x540D;&#x653E;&#x5728;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x91CC;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const SET_NAME = &apos;SET_NAME&apos;;
export const SET_AGE = &apos;SET_AGE&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">const</span> <span class="hljs-selector-tag">SET_NAME</span> = &apos;<span class="hljs-selector-tag">SET_NAME</span>&apos;;
<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">const</span> <span class="hljs-selector-tag">SET_AGE</span> = &apos;<span class="hljs-selector-tag">SET_AGE</span>&apos;;</code></pre><p>mutations.js&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as types from &apos;./mutation-type.js&apos;;

export default {
    [types.SET_NAME](state, name) {
        state.name = name;
    },
    [types.SET_AGE](state, age) {
        state.age = age;
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">import</span> * <span class="hljs-selector-tag">as</span> <span class="hljs-selector-tag">types</span> <span class="hljs-selector-tag">from</span> &apos;./<span class="hljs-selector-tag">mutation-type</span><span class="hljs-selector-class">.js</span>&apos;;

<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> {
    [types.SET_NAME](state, name) {
        state.name = name;
    },
    <span class="hljs-selector-attr">[types.SET_AGE]</span>(<span class="hljs-selector-tag">state</span>, <span class="hljs-selector-tag">age</span>) {
        state.age = age;
    }
};</code></pre><p>actions.js&#x793A;&#x4F8B;&#xFF08;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x3001;&#x591A;&#x4E2A;commit&#x65F6;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as types from &apos;./mutation-type.js&apos;;

export default {
    nameAsyn({commit}, {age, name}) {
        commit(types.SET_NAME, name);
        commit(types.SET_AGE, age);
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">import</span> * <span class="hljs-selector-tag">as</span> <span class="hljs-selector-tag">types</span> <span class="hljs-selector-tag">from</span> &apos;./<span class="hljs-selector-tag">mutation-type</span><span class="hljs-selector-class">.js</span>&apos;;

<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> {
    nameAsyn({commit}, {age, name}) {
        commit(types.SET_NAME, name);
        commit(types.SET_AGE, age);
    }
};</code></pre><p>modules/m1.js&#x793A;&#x4F8B;,m2&#x540C;&#x7406;&#x3002;&#xFF08;&#x5982;&#x679C;&#x4E0D;&#x662F;&#x5F88;&#x590D;&#x6742;&#x7684;&#x5E94;&#x7528;&#xFF0C;&#x4E00;&#x822C;&#x6765;&#x8BB2;&#x662F;&#x4E0D;&#x4F1A;&#x5206;&#x6A21;&#x5757;&#x7684;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    state: {},
    getters: {},
    mutations: {},
    actions: {}
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> {
    <span class="hljs-attribute">state</span>: {},
    <span class="hljs-selector-tag">getters</span>: {},
    <span class="hljs-selector-tag">mutations</span>: {},
    <span class="hljs-selector-tag">actions</span>: {}
};</code></pre><p>modules/indes.js,&#x5C06;modules&#x6587;&#x4EF6;&#x96C6;&#x4E2D;&#x7BA1;&#x7406;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import m1 from &apos;./m1&apos;;
import m2 from &apos;./m2&apos;;

export default {
  m1,
  m2
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">import</span> <span class="hljs-selector-tag">m1</span> <span class="hljs-selector-tag">from</span> &apos;./<span class="hljs-selector-tag">m1</span>&apos;;
<span class="hljs-selector-tag">import</span> <span class="hljs-selector-tag">m2</span> <span class="hljs-selector-tag">from</span> &apos;./<span class="hljs-selector-tag">m2</span>&apos;;

<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> {
  m1,
  m2
}
</code></pre><p>index.js&#x793A;&#x4F8B;&#xFF08;&#x7EC4;&#x88C5;vuex&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5982;&#x679C;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x4F7F;&#x7528;&#x7684;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x64CD;&#x4F5C;&#x975E;&#x5E38;&#x9891;&#x7E41;&#xFF0C;&#x53EF;&#x4EE5;&#x5C06;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x7684;&#x5BF9;&#x8C61;&#x8FDB;&#x884C;&#x7EC6;&#x5206;&#xFF0C;&#x6700;&#x540E;&#x6C47;&#x96C6;&#x4E4B;&#x540E;&#x96C6;&#x4E2D;&#x7BA1;&#x7406;&#xFF1B;
import vue from &apos;vue&apos;
import vuex from &apos;vuex&apos;

import state from &apos;./state&apos;
import * as getters from &apos;./getters&apos;
import mutations from &apos;./mutations&apos;
import actions from &apos;./actions&apos;
import modules from &apos;./modules&apos;

vue.use(vuex)

export default new vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">// &#x5982;&#x679C;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x4F7F;&#x7528;&#x7684;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x64CD;&#x4F5C;&#x975E;&#x5E38;&#x9891;&#x7E41;&#xFF0C;&#x53EF;&#x4EE5;&#x5C06;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x7684;&#x5BF9;&#x8C61;&#x8FDB;&#x884C;&#x7EC6;&#x5206;&#xFF0C;&#x6700;&#x540E;&#x6C47;&#x96C6;&#x4E4B;&#x540E;&#x96C6;&#x4E2D;&#x7BA1;&#x7406;&#xFF1B;
<span class="hljs-selector-tag">import</span> <span class="hljs-selector-tag">vue</span> <span class="hljs-selector-tag">from</span> &apos;<span class="hljs-selector-tag">vue</span>&apos;
<span class="hljs-selector-tag">import</span> <span class="hljs-selector-tag">vuex</span> <span class="hljs-selector-tag">from</span> &apos;<span class="hljs-selector-tag">vuex</span>&apos;

<span class="hljs-selector-tag">import</span> <span class="hljs-selector-tag">state</span> <span class="hljs-selector-tag">from</span> &apos;./<span class="hljs-selector-tag">state</span>&apos;
<span class="hljs-selector-tag">import</span> * <span class="hljs-selector-tag">as</span> <span class="hljs-selector-tag">getters</span> <span class="hljs-selector-tag">from</span> &apos;./<span class="hljs-selector-tag">getters</span>&apos;
<span class="hljs-selector-tag">import</span> <span class="hljs-selector-tag">mutations</span> <span class="hljs-selector-tag">from</span> &apos;./<span class="hljs-selector-tag">mutations</span>&apos;
<span class="hljs-selector-tag">import</span> <span class="hljs-selector-tag">actions</span> <span class="hljs-selector-tag">from</span> &apos;./<span class="hljs-selector-tag">actions</span>&apos;
<span class="hljs-selector-tag">import</span> <span class="hljs-selector-tag">modules</span> <span class="hljs-selector-tag">from</span> &apos;./<span class="hljs-selector-tag">modules</span>&apos;

<span class="hljs-selector-tag">vue</span><span class="hljs-selector-class">.use</span>(<span class="hljs-selector-tag">vuex</span>)

<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">vuex</span><span class="hljs-selector-class">.Store</span>({
  state,
  getters,
  mutations,
  actions,
  modules
})
</code></pre><p>&#x6700;&#x540E;&#x5C06;store&#x5B9E;&#x4F8B;&#x6302;&#x8F7D;&#x5230;main.js&#x91CC;&#x9762;&#x7684;vue&#x4E0A;&#x53BB;&#x5C31;&#x884C;&#x4E86;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import store from &apos;./store&apos;;

new Vue({
  el: &apos;#app&apos;,
  store,
  render: h =&gt; h(App)
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">import</span> <span class="hljs-selector-tag">store</span> <span class="hljs-selector-tag">from</span> &apos;./<span class="hljs-selector-tag">store</span>&apos;;

<span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
  <span class="hljs-attribute">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
  store,
  render: h =&gt; <span class="hljs-built_in">h</span>(App)
});</code></pre><p>&#x5728;vue&#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x5E38;&#x4F1A;&#x4F7F;&#x7528;mapGetters&#x3001;mapActions&#x3001;mapMutations&#xFF0C;&#x7136;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x6309;&#x7167;vue&#x8C03;&#x7528;methods&#x548C;computed&#x7684;&#x65B9;&#x5F0F;&#x53BB;&#x8C03;&#x7528;&#x8FD9;&#x4E9B;&#x53D8;&#x91CF;&#x6216;&#x51FD;&#x6570;&#xFF0C;&#x793A;&#x4F8B;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {mapGetters, mapMutations, mapActions} from &apos;vuex&apos;;

/* &#x53EA;&#x5199;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;script&#x90E8;&#x5206; */
export default {
    computed: {
        ...mapGetters([
            name,
            age
        ])
    },
    methods: {
        ...mapMutations({
            setName: &apos;SET_NAME&apos;, // &#x6620;&#x5C04; this.setName() &#x4E3A; this.$store.commit(&apos;SET_NAME&apos;)
            setAge: &apos;SET_AGE&apos;
        }),
        ...mapActions([
            nameAsyn // &#x5C06; this.nameAsyn() &#x6620;&#x5C04;&#x4E3A; this.$store.dispatch(&apos;increment&apos;)
        ])
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">import</span> {mapGetters, mapMutations, mapActions} <span class="hljs-selector-tag">from</span> &apos;<span class="hljs-selector-tag">vuex</span>&apos;;

<span class="hljs-comment">/* &#x53EA;&#x5199;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;script&#x90E8;&#x5206; */</span>
<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> {
    <span class="hljs-attribute">computed</span>: {
        ...<span class="hljs-built_in">mapGetters</span>([
            name,
            age
        ])
    },
    <span class="hljs-selector-tag">methods</span>: {
        ...mapMutations({
            <span class="hljs-attribute">setName</span>: <span class="hljs-string">&apos;SET_NAME&apos;</span>, // &#x6620;&#x5C04; this.<span class="hljs-built_in">setName</span>() &#x4E3A; this.$store.<span class="hljs-built_in">commit</span>(<span class="hljs-string">&apos;SET_NAME&apos;</span>)
            setAge: <span class="hljs-string">&apos;SET_AGE&apos;</span>
        }),
        ..<span class="hljs-selector-class">.mapActions</span>(<span class="hljs-selector-attr">[
            nameAsyn // &#x5C06; this.nameAsyn() &#x6620;&#x5C04;&#x4E3A; this.$store.dispatch(&apos;increment&apos;)
       </span> ])
    }
};</code></pre><p>mapGetters&#xFF0C;mapMutations&#xFF0C;mapActions&#x7684;&#x4F7F;&#x7528;&#xFF0C;&#x76F8;&#x5F53;&#x4E0E;&#x5C06;&#x5DF2;&#x7ECF;&#x5B9A;&#x4E49;&#x597D;&#x7684;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x6570;&#x636E;&#xFF08;&#x53D8;&#x91CF;&#xFF0C;&#x51FD;&#x6570;&#xFF09;&#x5F15;&#x7528;&#x5230;vue&#x5BF9;&#x8C61;&#x7684;computed&#x548C;methods&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x9875;&#x9762;&#x4E2D;&#xFF0C;&#x53EA;&#x7BA1;&#x4F7F;&#x7528;&#x5C31;&#x884C;&#xFF1B;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#xFF0C;&#x5982;&#xFF1A;<br>&#x83B7;&#x53D6;computed&#x4E2D;&#x7684;&#x53D8;&#x91CF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.name;
this.age;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.name</span>;
<span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.age</span>;</code></pre><p>&#x83B7;&#x53D6;methods&#x4E2D;&#x7684;&#x53D8;&#x91CF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setName(this.name)&#xFF1B;// &#x6620;&#x5C04;&#x4E3A; `this.$store.commit(&apos;setName&apos;, this.name)`
this.setAge();
this.nameAsyn();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.setName</span>(<span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.name</span>)&#xFF1B;// &#x6620;&#x5C04;&#x4E3A; `<span class="hljs-selector-tag">this</span>.$<span class="hljs-selector-tag">store</span><span class="hljs-selector-class">.commit</span>(&apos;<span class="hljs-selector-tag">setName</span>&apos;, <span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.name</span>)`
<span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.setAge</span>();
<span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.nameAsyn</span>();</code></pre><h4>&#x603B;&#x7ED3;&#xFF1A;</h4><p>1&#x3001;&#x5982;&#x679C;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x4F7F;&#x7528;&#x7684;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x64CD;&#x4F5C;&#x975E;&#x5E38;&#x9891;&#x7E41;&#xFF0C;&#x53EF;&#x4EE5;&#x5C06;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x7684;&#x5BF9;&#x8C61;&#x8FDB;&#x884C;&#x7EC6;&#x5206;&#xFF0C;&#x5982;&#x533A;&#x5206;&#x4E0D;&#x540C;&#x7684;&#x5BF9;&#x8C61;&#x6587;&#x4EF6;&#x5939;&#xFF08;state,getters,mutations,actions,modules&#xFF09;,&#x6700;&#x540E;&#x6C47;&#x96C6;&#x4E4B;&#x540E;&#x96C6;&#x4E2D;&#x7BA1;&#x7406;&#xFF1B;</p><p>2&#x3001;&#x5982;&#x679C;&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;&#x7684;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x7684;&#x53D8;&#x91CF;&#x8F83;&#x5C11;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x91C7;&#x7528;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x96C6;&#x4E2D;&#x7BA1;&#x7406;&#xFF1B;</p><p>vuex&#x9879;&#x76EE;&#x6574;&#x7406;&#xFF0C;&#x8BF7;&#x53C2;&#x7167;&#xFF1A;<a href="https://github.com/wdlhao/vue2-plugs-demo" rel="nofollow noreferrer" target="_blank">vue2-plugs-demo</a>&#x9879;&#x76EE;&#x4E2D;src/store &#x548C; src/store2&#x90E8;&#x5206;&#xFF1B;</p><h3 id="articleHeader3">async/await&#xFF1A;&#x5F02;&#x6B65;&#x795E;&#x5668;&#x6765;&#x5C01;&#x88C5;&#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#x6587;&#x4EF6;fetch.js</h3><p>&#x5728;&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#x7684;&#x9879;&#x76EE;&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;&#x524D;&#x7AEF;&#x4EBA;&#x5458;&#x5982;&#x679C;&#x8981;&#x901A;&#x8FC7;&#x63A5;&#x53E3;&#x83B7;&#x53D6;&#x540E;&#x7AEF;&#x6570;&#x636E;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x4E00;&#x822C;&#x4F1A;&#x72EC;&#x7ACB;&#x5C01;&#x88C5;&#x81EA;&#x5DF1;&#x7684;&#x63A5;&#x53E3;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x65B9;&#x6CD5;&#xFF0C;&#x4EE5;&#x4FBF;&#x5728;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x4E2D;&#x90FD;&#x80FD;&#x591F;&#x8F7B;&#x677E;&#x7684;&#x8FDB;&#x884C;&#x5F15;&#x7528;&#xFF1B;</p><p>&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;async/await &#x6765;&#x5904;&#x7406;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#xFF0C;&#x5C01;&#x88C5;&#x7684;&#x65B9;&#x6CD5;&#xFF08;utils/fetch.js&#xFF09;&#x5982;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
export default async (url = &apos;&apos;, data = {}, type = &apos;POST&apos;, method = &apos;fetch&apos;) =&gt; {
  type = type.toUpperCase()

  // get&#x8BF7;&#x6C42;&#x9700;&#x8981;&#x8FDB;&#x884C;url&#x548C;&#x53C2;&#x6570;&#x7684;&#x91CD;&#x65B0;&#x62FC;&#x63A5;
  if (type === &apos;GET&apos;) {
    let dataStr = &apos;&apos; 
    Object.keys(data).forEach(key =&gt; {
      dataStr += key + &apos;=&apos; + data[key] + &apos;&amp;&apos;
    })

    if (dataStr !== &apos;&apos;) {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf(&apos;&amp;&apos;))
      url = url + &apos;?&apos; + dataStr 
    }
  }
  // &#x5982;&#x679C;&#x652F;&#x6301;fecth&#x8BED;&#x6CD5;(es7&#x8BED;&#x6CD5;)&#x5E76;&#x4E14;&#x8BF7;&#x6C42;&#x65B9;&#x5F0F;&#x4E3A;&apos;fetch&apos;
  if (window.fetch &amp;&amp; method === &apos;fetch&apos;) {
    let requestConfig = {
      credentials: &apos;include&apos;,
      method: type,
      headers: {
        &apos;Accept&apos;: &apos;application/json;charset=UTF-8&apos;,
        &apos;Content-Type&apos;: &apos;application/json;charset=UTF-8&apos;
      },
      mode: &apos;cors&apos;,
      cache: &apos;force-cache&apos;
    }
    // &apos;POST&apos;&#x8BF7;&#x6C42;&#xFF0C;&#x5C06;&#x76F8;&#x5173;&#x7684;&#x8BF7;&#x6C42;&#x53C2;&#x6570;&#x6DFB;&#x52A0;&#x5230;&apos;body&apos;&#x4E2D;&#x3002;
    if (type === &apos;POST&apos;) {
      Object.defineProperty(requestConfig, &apos;body&apos;, {
        value: JSON.stringify(data)
      })
    }
    // await fetch,&#x4EE5;&#x540C;&#x6B65;&#x7684;&#x65B9;&#x5F0F;&#x5C06;&#x6570;&#x636E;&#xFF08;json&#x5F62;&#x5F0F;&#xFF09;&#x8FDB;&#x884C;&#x8FD4;&#x56DE;&#xFF0C;&#x524D;&#x7AEF;&#x901A;&#x8FC7;&#x53D8;&#x91CF;&#x63A5;&#x6536;&#x5373;&#x53EF;&#xFF1B;
    try {
      const response = await fetch(url, requestConfig)
      const responseJson = await response.json()
      return responseJson
    } catch (error) {
      throw new Error(error)
    }
  } else { // &#x5982;&#x679C;&#x5148;&#x6D4F;&#x89C8;&#x5668;&#x4E0D;&#x652F;&#x6301;fetch&#x8BED;&#x6CD5;&#xFF0C;&#x5219;&#x7528;es6&#x4E2D;promise()&#x6765;&#x5C01;&#x88C5;&#x5F02;&#x6B65;&#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#xFF1B;
    return new Promise((resolve, reject) =&gt; {
      let requestObj
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest()
      } else {
        let ActiveXObject = window.ActiveXObject
        requestObj = new ActiveXObject()
      }

      let sendData = &apos;&apos;
      if (type === &apos;POST&apos;) {
        sendData = JSON.stringify(data)
      }
      requestObj.open(type, url, true)
      requestObj.setRequestHeader(&apos;Content-type&apos;, &apos;application/x-www-form-urlencoded&apos;)
      requestObj.send(sendData)

      requestObj.onreadystatechange = () =&gt; {
        if (requestObj.readyState === 4) {
          if (requestObj.status === 200) {
            let obj = requestObj.response
            if (typeof obj !== &apos;object&apos;) {
              console.log(obj)
              obj = JSON.parse(obj)
            }
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">
<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">async</span> (<span class="hljs-selector-tag">url</span> = &apos;&apos;, <span class="hljs-selector-tag">data</span> = {}, <span class="hljs-selector-tag">type</span> = &apos;<span class="hljs-selector-tag">POST</span>&apos;, <span class="hljs-selector-tag">method</span> = &apos;<span class="hljs-selector-tag">fetch</span>&apos;) =&gt; {
  type = type.toUpperCase()

  // get&#x8BF7;&#x6C42;&#x9700;&#x8981;&#x8FDB;&#x884C;url&#x548C;&#x53C2;&#x6570;&#x7684;&#x91CD;&#x65B0;&#x62FC;&#x63A5;
  if (type === &apos;GET&apos;) {
    let dataStr = &apos;&apos; 
    Object.keys(data).forEach(key =&gt; {
      dataStr += key + &apos;=&apos; + data[key] + &apos;&amp;&apos;
    })

    <span class="hljs-selector-tag">if</span> (<span class="hljs-selector-tag">dataStr</span> !== &apos;&apos;) {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf(&apos;&amp;&apos;))
      url = url + &apos;?&apos; + dataStr 
    }
  }
  // &#x5982;&#x679C;&#x652F;&#x6301;<span class="hljs-selector-tag">fecth</span>&#x8BED;&#x6CD5;(<span class="hljs-selector-tag">es7</span>&#x8BED;&#x6CD5;)&#x5E76;&#x4E14;&#x8BF7;&#x6C42;&#x65B9;&#x5F0F;&#x4E3A;&apos;<span class="hljs-selector-tag">fetch</span>&apos;
  <span class="hljs-selector-tag">if</span> (<span class="hljs-selector-tag">window</span><span class="hljs-selector-class">.fetch</span> &amp;&amp; <span class="hljs-selector-tag">method</span> === &apos;<span class="hljs-selector-tag">fetch</span>&apos;) {
    let requestConfig = {
      <span class="hljs-attribute">credentials</span>: <span class="hljs-string">&apos;include&apos;</span>,
      method: type,
      headers: {
        <span class="hljs-string">&apos;Accept&apos;</span>: <span class="hljs-string">&apos;application/json;charset=UTF-8&apos;</span>,
        <span class="hljs-string">&apos;Content-Type&apos;</span>: <span class="hljs-string">&apos;application/json;charset=UTF-8&apos;</span>
      },
      <span class="hljs-selector-tag">mode</span>: &apos;<span class="hljs-selector-tag">cors</span>&apos;,
      <span class="hljs-selector-tag">cache</span>: &apos;<span class="hljs-selector-tag">force-cache</span>&apos;
    }
    // &apos;<span class="hljs-selector-tag">POST</span>&apos;&#x8BF7;&#x6C42;&#xFF0C;&#x5C06;&#x76F8;&#x5173;&#x7684;&#x8BF7;&#x6C42;&#x53C2;&#x6570;&#x6DFB;&#x52A0;&#x5230;&apos;<span class="hljs-selector-tag">body</span>&apos;&#x4E2D;&#x3002;
    <span class="hljs-selector-tag">if</span> (<span class="hljs-selector-tag">type</span> === &apos;<span class="hljs-selector-tag">POST</span>&apos;) {
      Object.defineProperty(requestConfig, &apos;body&apos;, {
        <span class="hljs-attribute">value</span>: JSON.<span class="hljs-built_in">stringify</span>(data)
      })
    }
    // <span class="hljs-selector-tag">await</span> <span class="hljs-selector-tag">fetch</span>,&#x4EE5;&#x540C;&#x6B65;&#x7684;&#x65B9;&#x5F0F;&#x5C06;&#x6570;&#x636E;&#xFF08;<span class="hljs-selector-tag">json</span>&#x5F62;&#x5F0F;&#xFF09;&#x8FDB;&#x884C;&#x8FD4;&#x56DE;&#xFF0C;&#x524D;&#x7AEF;&#x901A;&#x8FC7;&#x53D8;&#x91CF;&#x63A5;&#x6536;&#x5373;&#x53EF;&#xFF1B;
    <span class="hljs-selector-tag">try</span> {
      const response = await fetch(url, requestConfig)
      const responseJson = await response.json()
      return responseJson
    } <span class="hljs-selector-tag">catch</span> (<span class="hljs-selector-tag">error</span>) {
      throw new Error(error)
    }
  } <span class="hljs-selector-tag">else</span> { // &#x5982;&#x679C;&#x5148;&#x6D4F;&#x89C8;&#x5668;&#x4E0D;&#x652F;&#x6301;fetch&#x8BED;&#x6CD5;&#xFF0C;&#x5219;&#x7528;es6&#x4E2D;promise()&#x6765;&#x5C01;&#x88C5;&#x5F02;&#x6B65;&#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#xFF1B;
    return new Promise((resolve, reject) =&gt; {
      let requestObj
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest()
      } <span class="hljs-selector-tag">else</span> {
        let ActiveXObject = window.ActiveXObject
        requestObj = new ActiveXObject()
      }

      <span class="hljs-selector-tag">let</span> <span class="hljs-selector-tag">sendData</span> = &apos;&apos;
      <span class="hljs-selector-tag">if</span> (<span class="hljs-selector-tag">type</span> === &apos;<span class="hljs-selector-tag">POST</span>&apos;) {
        sendData = JSON.stringify(data)
      }
      <span class="hljs-selector-tag">requestObj</span><span class="hljs-selector-class">.open</span>(<span class="hljs-selector-tag">type</span>, <span class="hljs-selector-tag">url</span>, <span class="hljs-selector-tag">true</span>)
      <span class="hljs-selector-tag">requestObj</span><span class="hljs-selector-class">.setRequestHeader</span>(&apos;<span class="hljs-selector-tag">Content-type</span>&apos;, &apos;<span class="hljs-selector-tag">application</span>/<span class="hljs-selector-tag">x-www-form-urlencoded</span>&apos;)
      <span class="hljs-selector-tag">requestObj</span><span class="hljs-selector-class">.send</span>(<span class="hljs-selector-tag">sendData</span>)

      <span class="hljs-selector-tag">requestObj</span><span class="hljs-selector-class">.onreadystatechange</span> = () =&gt; {
        if (requestObj.readyState === 4) {
          if (requestObj.status === 200) {
            let obj = requestObj.response
            if (typeof obj !== &apos;object&apos;) {
              console.log(obj)
              obj = JSON.parse(obj)
            }
            <span class="hljs-selector-tag">resolve</span>(<span class="hljs-selector-tag">obj</span>)
          } <span class="hljs-selector-tag">else</span> {
            reject(requestObj)
          }
        }
      }
    })
  }
}
</code></pre><p>&#x5982;&#x767B;&#x5F55;&#x754C;&#x9762;&#x7684;&#x7528;&#x5230;&#x7684;api,&#x7EDF;&#x4E00;&#x7BA1;&#x7406;&#x5728;login/api/index.js&#x4E2D;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import fetch from &quot;@/utils/fetch&quot;;

/**
* &#x767B;&#x5F55;
*/
export const login = (reqData) =&gt; fetch(&quot;/v2/cotton/user/app_login&quot;, reqData);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">import</span> <span class="hljs-selector-tag">fetch</span> <span class="hljs-selector-tag">from</span> &quot;@/<span class="hljs-keyword">utils</span>/<span class="hljs-keyword">fetch</span>&quot;;

<span class="hljs-comment">/**
* &#x767B;&#x5F55;
*/</span>
<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">const</span> <span class="hljs-selector-tag">login</span> = (<span class="hljs-selector-tag">reqData</span>) =&gt; <span class="hljs-selector-tag">fetch</span>(&quot;/<span class="hljs-selector-tag">v2</span>/<span class="hljs-selector-tag">cotton</span>/<span class="hljs-selector-tag">user</span>/<span class="hljs-selector-tag">app_login</span>&quot;, <span class="hljs-selector-tag">reqData</span>);
</code></pre><p>api&#x7EDF;&#x4E00;&#x7BA1;&#x7406;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;&#x9875;&#x9762;&#x4E2D;&#x8FDB;&#x884C;&#x8C03;&#x7528;&#xFF0C;&#x83B7;&#x53D6;&#x6570;&#x636E;&#xFF0C;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { getyancode, login } from &quot;./api&quot;;
methods: {
        async login() {
            // &#x63D0;&#x4EA4;&#x65F6;&#xFF0C;&#x505A;&#x9A8C;&#x8BC1;&#xFF1B;
            if (this.checkMobile() &amp;&amp; this.checkMsgCode()) {
                this.loading.show = true;
                let reqData = {
                    phone: mutils.replaceAllSpace(this.telphone),
                    code: mutils.replaceAllSpace(this.yancode)
                };
                try{ // try{}catch(){}&#x7528;&#x4E8E;&#x5904;&#x7406;&#x5F02;&#x5E38;
                    const res = await login(reqData);
                    if (res.status.code == &quot;200&quot;) {
                       console.log(&apos;&#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#x6210;&#x529F;~&apos;);
                    } else {
                       console.log(&apos;&#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#x5931;&#x8D25;~&apos;);
                    }
                }catch(err){
                  console.log(err)
                }
            }
        }
 }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">import</span> { getyancode, login } <span class="hljs-selector-tag">from</span> &quot;./<span class="hljs-selector-tag">api</span>&quot;;
<span class="hljs-selector-tag">methods</span>: {
        async login() {
            // &#x63D0;&#x4EA4;&#x65F6;&#xFF0C;&#x505A;&#x9A8C;&#x8BC1;&#xFF1B;
            if (this.checkMobile() &amp;&amp; this.checkMsgCode()) {
                this.loading.show = true;
                let reqData = {
                    <span class="hljs-attribute">phone</span>: mutils.<span class="hljs-built_in">replaceAllSpace</span>(this.telphone),
                    code: mutils.<span class="hljs-built_in">replaceAllSpace</span>(this.yancode)
                };
                <span class="hljs-selector-tag">try</span>{ // try{}<span class="hljs-selector-tag">catch</span>(){}&#x7528;&#x4E8E;&#x5904;&#x7406;&#x5F02;&#x5E38;
                    <span class="hljs-selector-tag">const</span> <span class="hljs-selector-tag">res</span> = <span class="hljs-selector-tag">await</span> <span class="hljs-selector-tag">login</span>(<span class="hljs-selector-tag">reqData</span>);
                    <span class="hljs-selector-tag">if</span> (<span class="hljs-selector-tag">res</span><span class="hljs-selector-class">.status</span><span class="hljs-selector-class">.code</span> == &quot;200&quot;) {
                       console.log(&apos;&#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#x6210;&#x529F;~&apos;);
                    } <span class="hljs-selector-tag">else</span> {
                       console.log(&apos;&#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#x5931;&#x8D25;~&apos;);
                    }
                }<span class="hljs-selector-tag">catch</span>(<span class="hljs-selector-tag">err</span>){
                  console.log(err)
                }
            }
        }
 }</code></pre><p>&#x901A;&#x8FC7;&#x5F02;&#x6B65;&#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x83B7;&#x53D6;&#x5230;&#x76F8;&#x5173;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5F00;&#x59CB;&#x540E;&#x7EED;&#x7684;&#x64CD;&#x4F5C;&#x4E86;&#x3002;<br>&#x5F02;&#x6B65;&#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#x5C01;&#x88C5;&#x65B9;&#x5F0F;&#x5206;&#x6790;&#xFF1A;<br>async/ await&#x6765;&#x53D1;&#x9001;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#xFF0C;&#x4ECE;&#x670D;&#x52A1;&#x7AEF;&#x83B7;&#x53D6;&#x6570;&#x636E;&#xFF0C;&#x4EE3;&#x7801;&#x5F88;&#x7B80;&#x6D01;&#xFF0C;&#x540C;&#x65F6;async/await &#x5DF2;&#x7ECF;&#x88AB;&#x6807;&#x51C6;&#x5316;&#x3002;<br>async&#x7684;&#x7528;&#x6CD5;&#xFF0C;&#x5B83;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x5173;&#x952E;&#x5B57;&#x653E;&#x5230;&#x51FD;&#x6570;&#x524D;&#x9762;&#xFF0C;&#x7528;&#x4E8E;&#x8868;&#x793A;&#x51FD;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#xFF0C;&#x4E5F;&#x5C31;&#x610F;&#x5473;&#x7740;&#x8BE5;&#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;&#x4E0D;&#x4F1A;&#x963B;&#x585E;&#x540E;&#x9762;&#x4EE3;&#x7801;&#x7684;&#x6267;&#x884C;&#x3002;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function timeout() {
    return &apos;hello world&apos;
}
timeout();
console.log(&apos;&#x867D;&#x7136;&#x5728;&#x540E;&#x9762;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x5148;&#x6267;&#x884C;&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">async</span> <span class="hljs-selector-tag">function</span> <span class="hljs-selector-tag">timeout</span>() {
    return &apos;hello world&apos;
}
<span class="hljs-selector-tag">timeout</span>();
<span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(&apos;&#x867D;&#x7136;&#x5728;&#x540E;&#x9762;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x5148;&#x6267;&#x884C;&apos;);</code></pre><p>async &#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x4E00;&#x4E2A;promise &#x5BF9;&#x8C61;&#xFF0C;&#x5982;&#x679C;&#x8981;&#x83B7;&#x53D6;&#x5230;promise &#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x6211;&#x4EEC;&#x5E94;&#x8BE5;&#x7528;then &#x65B9;&#x6CD5;&#xFF0C;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function timeout() {
    return &apos;hello world&apos;
}
timeout().then(result =&gt; {
    console.log(result);
})
console.log(&apos;&#x867D;&#x7136;&#x5728;&#x540E;&#x9762;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x5148;&#x6267;&#x884C;&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">async</span> <span class="hljs-selector-tag">function</span> <span class="hljs-selector-tag">timeout</span>() {
    return &apos;hello world&apos;
}
<span class="hljs-selector-tag">timeout</span>()<span class="hljs-selector-class">.then</span>(<span class="hljs-selector-tag">result</span> =&gt; {
    console.log(result);
})
<span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(&apos;&#x867D;&#x7136;&#x5728;&#x540E;&#x9762;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x5148;&#x6267;&#x884C;&apos;);</code></pre><p>&#x6267;&#x884C;&#x7ED3;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x867D;&#x7136;&#x5728;&#x540E;&#x9762;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x5148;&#x6267;&#x884C;
hello world" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">&#x867D;&#x7136;&#x5728;&#x540E;&#x9762;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x5148;&#x6267;&#x884C;
<span class="hljs-selector-tag">hello</span> <span class="hljs-selector-tag">world</span></code></pre><p>&#x3000;async&#x548C;await&#x7ED3;&#x5408;&#x4F7F;&#x7528;&#xFF0C;await&#x8868;&#x793A;&#x7B49;&#x5F85;&#x7684;&#x610F;&#x601D;&#xFF0C;&#x6CE8;&#x610F;await &#x5173;&#x952E;&#x5B57;&#x53EA;&#x80FD;&#x653E;&#x5230;async &#x51FD;&#x6570;&#x91CC;&#x9762;&#x3002;&#x73B0;&#x5728;&#x5199;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x8BA9;&#x5B83;&#x8FD4;&#x56DE;promise &#x5BF9;&#x8C61;&#xFF0C;&#x8BE5;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x662F;2s &#x4E4B;&#x540E;&#x8BA9;&#x6570;&#x503C;&#x4E58;&#x4EE5;2&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 2s &#x4E4B;&#x540E;&#x8FD4;&#x56DE;&#x53CC;&#x500D;&#x7684;&#x503C;
function doubleAfter2seconds(num) {
   return new Promise((resolve, reject) =&gt; {
       setTimeout(() =&gt; {
           resolve(2 * num)
       }, 2000);
   } )
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">// 2<span class="hljs-selector-tag">s</span> &#x4E4B;&#x540E;&#x8FD4;&#x56DE;&#x53CC;&#x500D;&#x7684;&#x503C;
<span class="hljs-selector-tag">function</span> <span class="hljs-selector-tag">doubleAfter2seconds</span>(<span class="hljs-selector-tag">num</span>) {
   return new Promise((resolve, reject) =&gt; {
       setTimeout(() =&gt; {
           resolve(2 * num)
       }, 2000);
   } )
}</code></pre><p>&#x73B0;&#x5728;&#x518D;&#x5199;&#x4E00;&#x4E2A;async &#x51FD;&#x6570;&#xFF0C;&#x4ECE;&#x800C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;await &#x5173;&#x952E;&#x5B57;&#xFF0C; await &#x540E;&#x9762;&#x653E;&#x7F6E;&#x7684;&#x5C31;&#x662F;&#x8FD4;&#x56DE;promise&#x5BF9;&#x8C61;&#x7684;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x6240;&#x4EE5;&#x5B83;&#x540E;&#x9762;&#x53EF;&#x4EE5;&#x5199;&#x4E0A; doubleAfter2seconds &#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function testResult() {
    let result = await doubleAfter2seconds(30);
    console.log(result);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">async</span> <span class="hljs-selector-tag">function</span> <span class="hljs-selector-tag">testResult</span>() {
    let result = await doubleAfter2seconds(30);
    console.log(result);
}</code></pre><p>&#x73B0;&#x5728;&#x8C03;&#x7528;testResult &#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="testResult();
&#x7ED3;&#x679C;&#x4E3A;&#xFF1A;60" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">testResult</span>();
&#x7ED3;&#x679C;&#x4E3A;&#xFF1A;60</code></pre><p>&#x5F53;&#x7136;&#x6211;&#x4EEC;&#x5728;&#x4F7F;&#x7528;async/await&#x6765;&#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x8FDB;&#x884C;&#x5F02;&#x5E38;&#x5904;&#x7406;&#x3002;&#x5B83;&#x7528;&#x7684;&#x662F;try/catch &#x6765;&#x6355;&#x83B7;&#x5F02;&#x5E38;&#xFF0C;&#x628A;await &#x653E;&#x5230; try &#x4E2D;&#x8FDB;&#x884C;&#x6267;&#x884C;&#xFF0C;&#x5982;&#x6709;&#x5F02;&#x5E38;&#xFF0C;&#x5C31;&#x4F7F;&#x7528;catch &#x8FDB;&#x884C;&#x5904;&#x7406;&#x3002;</p><p>fetch.js&#x6587;&#x4EF6;&#x6574;&#x7406;&#xFF0C;&#x8BF7;&#x53C2;&#x7167;&#xFF1A;<a href="https://github.com/wdlhao/vue2-plugs-demo" rel="nofollow noreferrer" target="_blank">vue2-plugs-demo</a>&#x9879;&#x76EE;&#x4E2D;utils/fetch.js &#x548C; src/login&#x90E8;&#x5206;&#xFF1B;</p><h3 id="articleHeader4">vue &#x9879;&#x76EE;&#x4E2D;&#x7684;&#x8FED;&#x4EE3;&#x5224;&#x65AD;&#x6280;&#x5DE7;</h3><p>&#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;&#x5217;&#x8868;&#xFF0C;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x80FD;&#x663E;&#x793A;&#x6211;&#x4EEC;&#x5F53;&#x524D;&#x9009;&#x4E2D;&#x7684;&#x90A3;&#x4E00;&#x4E2A;&#xFF0C;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x5462;&#xFF1F;<br>&#x57FA;&#x672C;&#x601D;&#x8DEF;&#x662F;&#x901A;&#x8FC7;$index&#x6765;&#x5224;&#x65AD;&#x662F;&#x5426;&#x662F;&#x5F53;&#x524D;&#x8FED;&#x4EE3;&#x5BF9;&#x8C61;&#xFF0C;&#x7136;&#x540E;&#x53BB;&#x589E;&#x51CF;class&#x6216;&#x8005;style&#x6765;&#x5B9E;&#x73B0;&#x4E0D;&#x540C;&#x7684;&#x6837;&#x5F0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;ul&gt;
      &lt;!-- &#x65B9;&#x6CD5;1 class--&gt;
      &lt;li v-for=&quot;item in list&quot; :class=&quot;{&apos;active&apos;: $index === activeId}&quot;&gt;{{item}}&lt;/li&gt;

      &lt;!-- &#x65B9;&#x6CD5;2 style--&gt;
      &lt;li v-for=&quot;item in list&quot; :style=&quot;{backgroundColor: $index === activeId ? &apos;red&apos; : &apos;white&apos;}&quot;&gt;{{item}}&lt;/li&gt;
    &lt;/ul&gt;
&lt;/template&gt;

&lt;script&gt;
    data () {
      return {
        list: [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;],
        activeId: 0
      }
    }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">template</span>&gt;
    &lt;<span class="hljs-selector-tag">ul</span>&gt;
      &lt;!<span class="hljs-selector-tag">--</span> &#x65B9;&#x6CD5;1 <span class="hljs-selector-tag">class--</span>&gt;
      &lt;<span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">v-for</span>=&quot;<span class="hljs-selector-tag">item</span> <span class="hljs-selector-tag">in</span> <span class="hljs-selector-tag">list</span>&quot; <span class="hljs-selector-pseudo">:class</span>=&quot;{&apos;active&apos;: $index === activeId}&quot;&gt;{{item}}&lt;/<span class="hljs-selector-tag">li</span>&gt;

      &lt;!<span class="hljs-selector-tag">--</span> &#x65B9;&#x6CD5;2 <span class="hljs-selector-tag">style--</span>&gt;
      &lt;<span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">v-for</span>=&quot;<span class="hljs-selector-tag">item</span> <span class="hljs-selector-tag">in</span> <span class="hljs-selector-tag">list</span>&quot; <span class="hljs-selector-pseudo">:style</span>=&quot;{<span class="hljs-attribute">backgroundColor</span>: $index === activeId ? <span class="hljs-string">&apos;red&apos;</span> : <span class="hljs-string">&apos;white&apos;</span>}&quot;&gt;{{item}}&lt;/<span class="hljs-selector-tag">li</span>&gt;
    &lt;/<span class="hljs-selector-tag">ul</span>&gt;
&lt;/<span class="hljs-selector-tag">template</span>&gt;

&lt;<span class="hljs-selector-tag">script</span>&gt;
    <span class="hljs-selector-tag">data</span> () {
      return {
        <span class="hljs-attribute">list</span>: [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;c&apos;</span>],
        activeId: <span class="hljs-number">0</span>
      }
    }
&lt;/<span class="hljs-selector-tag">script</span>&gt;</code></pre><h3 id="articleHeader5">vue &#x9879;&#x76EE;&#x4E2D;&#x5E38;&#x7528;&#x7684;&#x56FE;&#x7247;&#x5F15;&#x5165;&#x65B9;&#x5F0F;</h3><ol><li>&#x5728;img&#x6807;&#x7B7E;&#x4E2D;&#x4F7F;&#x7528;&#x56FE;&#x7247;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data () {
    return {
        img: require(&apos;path/to/your/source&apos;)
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">data</span> () {
    return {
        <span class="hljs-attribute">img</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path/to/your/source&apos;</span>)
    }
}</code></pre><p>&#x7136;&#x540E;&#x5728;template&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;img :src=&quot;img&quot; /&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css" style="word-break:break-word;white-space:initial">&lt;<span class="hljs-selector-tag">img</span> <span class="hljs-selector-pseudo">:src</span>=&quot;<span class="hljs-selector-tag">img</span>&quot; /&gt;</code></pre><ol><li>&#x4EE5;&#x80CC;&#x666F;&#x56FE;&#x7684;&#x65B9;&#x5F0F;&#x4F7F;&#x7528;&#x56FE;&#x7247;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data () {
    return {
        img: require(&apos;path/to/your/source&apos;)
    }
}

&lt;div :style=&quot;{backgroundImage: &apos;url(&apos; + img + &apos;)&apos;}&quot;&gt;&lt;/div&gt;

&#x6216;&#x8005;&#x76F4;&#x63A5;&#x5728;css&#x4E2D;&#x5B9A;&#x4E49;

background-image: url(&apos;path/to/your/source&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">data</span> () {
    return {
        <span class="hljs-attribute">img</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path/to/your/source&apos;</span>)
    }
}

&lt;<span class="hljs-selector-tag">div</span> <span class="hljs-selector-pseudo">:style</span>=&quot;{<span class="hljs-attribute">backgroundImage</span>: <span class="hljs-string">&apos;url(&apos;</span> + img + <span class="hljs-string">&apos;)&apos;</span>}&quot;&gt;&lt;/<span class="hljs-selector-tag">div</span>&gt;

&#x6216;&#x8005;&#x76F4;&#x63A5;&#x5728;<span class="hljs-selector-tag">css</span>&#x4E2D;&#x5B9A;&#x4E49;

<span class="hljs-selector-tag">background-image</span>: <span class="hljs-selector-tag">url</span>(&apos;<span class="hljs-selector-tag">path</span>/<span class="hljs-selector-tag">to</span>/<span class="hljs-selector-tag">your</span>/<span class="hljs-selector-tag">source</span>&apos;);</code></pre><h3 id="articleHeader6">&#x5FAE;&#x4FE1;api&#x5728;vue&#x9879;&#x76EE;&#x4E2D;&#x7684;&#x4F7F;&#x7528;&#xFF1A;</h3><ul><li>vue2&#x5B9E;&#x73B0;&#x5FAE;&#x4FE1;&#x5206;&#x4EAB;&#x5751;&#x70B9;&#x548C;&#x7ECF;&#x9A8C; &#xFF1B;</li></ul><p>&#x5B98;&#x65B9;&#x7F51;&#x5740;&#xFF1A;<a href="https://mp.weixin.qq.com/wiki?t=resource/res_main&amp;id=mp1421141115" rel="nofollow noreferrer" target="_blank">&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x5E73;&#x53F0;&#x6280;&#x672F;&#x6587;&#x6863;/&#x5FAE;&#x4FE1;JS-SDK&#x8BF4;&#x660E;&#x6587;&#x6863;</a></p><p>&#x5F53;&#x7136;&#x8981;&#x8FDB;&#x884C;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#x5F00;&#x53D1;&#xFF0C;&#x524D;&#x671F;&#x662F;&#x8981;&#x7ECF;&#x8FC7;&#x7528;&#x6237;&#x6CE8;&#x518C;&#x5E76;&#x7ED1;&#x5B9A;&#x76F8;&#x5173;&#x7684;&#x8D26;&#x53F7;&#xFF0C;&#x624D;&#x4F1A;&#x5F97;&#x5230;&#x5FAE;&#x4FE1;&#x5B98;&#x7F51;&#x7ED9;&#x51FA;&#x7684;&#x76F8;&#x5173;&#x7684;&#x6743;&#x9650;&#xFF0C;&#x624D;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x540E;&#x7EED;&#x7684;&#x5F00;&#x53D1;&#x6D41;&#x7A0B;&#x53CA;api&#x7684;&#x8C03;&#x7528;&#xFF0C;&#x4E3B;&#x4F53;&#x6B65;&#x9AA4;&#x8BF7;&#x53C2;&#x89C1;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#x6280;&#x672F;&#x6587;&#x6863;&#x3002;&#x6211;&#x5728;&#x8FD9;&#x91CC;&#xFF0C;&#x53EA;&#x662F;&#x4ECB;&#x7ECD;&#x6CE8;&#x518C;&#x6D41;&#x7A0B;&#x8D70;&#x5B8C;&#x4E4B;&#x540E;&#xFF0C;&#x5982;&#x4F55;&#x8FDB;&#x884C;api&#x7684;&#x8C03;&#x7528;&#x3002;</p><p>&#x7531;&#x4E8E;&#x5728;&#x505A;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;vue2.0&#x524D;&#x7AEF;&#x9879;&#x76EE;&#x5F00;&#x53D1;&#xFF0C;&#x6839;&#x636E;&#x4EA7;&#x54C1;&#x9700;&#x8981;&#xFF0C;&#x9879;&#x76EE;&#x4E2D;&#x6709;&#x4E00;&#x4E9B;&#x81EA;&#x5B9A;&#x4E49;&#x5206;&#x4EAB;&#x7684;&#x529F;&#x80FD;&#x548C;&#x8BBE;&#x8BA1;&#xFF1B;&#x7531;&#x4E8E;&#x5FAE;&#x4FE1;&#x81EA;&#x5E26;&#x7684;&#x5206;&#x4EAB;&#x662F;&#x4E00;&#x4E2A;&#x6BD4;&#x8F83;&#x666E;&#x901A;&#xFF0C;&#x662F;&#x4EE5;&#x5B83;&#x81EA;&#x5DF1;&#x7684;&#x5206;&#x4EAB;&#x673A;&#x5236;&#xFF0C;&#x53EA;&#x662F;&#x5BF9;&#x67D0;&#x4E2A;&#x9875;&#x9762;&#x8FDB;&#x884C;&#x901A;&#x5E38;&#x7684;&#x5448;&#x73B0;&#x3002;&#x81EA;&#x5B9A;&#x4E49;&#x5206;&#x4EAB;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x6211;&#x4EEC;&#x8C03;&#x7528;&#x5FAE;&#x4FE1;&#x5206;&#x4EAB;api,&#x8FDB;&#x884C;&#x81EA;&#x5B9A;&#x4E49;&#x914D;&#x7F6E;&#x3002;</p><p>&#x5206;&#x4EAB;&#x5230;&#x5FAE;&#x4FE1;&#x597D;&#x53CB;&#x548C;QQ&#x597D;&#x53CB;&#xFF0C;&#x6548;&#x679C;&#x5982;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016433384?w=338&amp;h=103" src="https://static.alili.tech/img/remote/1460000016433384?w=338&amp;h=103" alt="" title="" style="cursor:pointer"></span></p><p>&#x5206;&#x4EAB;&#x5230;&#x5FAE;&#x4FE1;&#x670B;&#x53CB;&#x5708;&#xFF0C;&#x6548;&#x679C;&#x5982;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016433385" src="https://static.alili.tech/img/remote/1460000016433385" alt="" title="" style="cursor:pointer"></span></p><p>&#x5F00;&#x53D1;&#x6B65;&#x9AA4;&#x5982;&#x4E0B;&#xFF1A;</p><p>1&#x3001;&#x5728;index.html&#x4E2D;&#x5F15;&#x5165;jweixin-1.2.0.js&#xFF1B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script type=&quot;text/javascript&quot; src=&quot;http://res.wx.qq.com/open/js/jweixin-1.2.0.js&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css" style="word-break:break-word;white-space:initial">&lt;<span class="hljs-selector-tag">script</span> <span class="hljs-selector-tag">type</span>=&quot;<span class="hljs-selector-tag">text</span>/<span class="hljs-selector-tag">javascript</span>&quot; <span class="hljs-selector-tag">src</span>=&quot;<span class="hljs-selector-tag">http</span>://<span class="hljs-selector-tag">res</span><span class="hljs-selector-class">.wx</span><span class="hljs-selector-class">.qq</span><span class="hljs-selector-class">.com</span>/<span class="hljs-selector-tag">open</span>/<span class="hljs-selector-tag">js</span>/<span class="hljs-selector-tag">jweixin-1</span><span class="hljs-selector-class">.2</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.js</span>&quot;&gt;&lt;/<span class="hljs-selector-tag">script</span>&gt;</code></pre><p>2&#x3001;&#x76F8;&#x5173;&#x5FAE;&#x4FE1;api&#x914D;&#x7F6E;&#x6587;&#x4EF6;utils/wx.js,&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import fetch from &quot;./fetch&quot;;
/**
  * baseUrl:&#x670D;&#x52A1;&#x5668;&#x5730;&#x5740;
  * shareOosImg&#xFF1A;&#x5206;&#x4EAB;&#x9ED8;&#x8BA4;&#x7684;&#x56FE;&#x6807;
  * wechatId&#xFF1A;&#x7533;&#x8BF7;&#x6210;&#x529F;&#x7684;wechatId
  **/
import { baseUrl,shareOosImg,wechatId } from &quot;@/utils/env&quot;; 

/**
  * &#x83B7;&#x53D6;&#x5FAE;&#x4FE1;&#x7AEF;&#x7B7E;&#x540D;&#xFF0C;&#x65F6;&#x95F4;&#x6233;&#x7B49;&#x4FE1;&#x606F;
  */
export const getCompactHouseList = (reqData) =&gt; fetch(&quot;/v2/cotton/user/get_wechat_authorize&quot;, reqData);

export function setWxConfig(link, title, desc, pic) {
    let url = window.location.href.split(&quot;#&quot;)[0];
    // &#x516C;&#x4F17;&#x53F7;&#x7533;&#x8BF7;&#x6D41;&#x7A0B;&#x8D70;&#x5B8C;&#x4E4B;&#x540E;&#xFF0C;&#x5B98;&#x65B9;&#x4F1A;&#x7ED9;&#x7ED9;&#x51FA;&#x4E00;&#x4E2A;&quot;wechatId&quot;,&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#x53BB;&#x8BF7;&#x6C42;&#x6211;&#x4EEC;&#x7684;&#x540E;&#x53F0;&#x63A5;&#x53E3;&#xFF0C;&#x5C31;&#x4F1A;&#x5F97;&#x5230;&#x76F8;&#x5173;&#x5DF2;&#x7ECF;&#x914D;&#x7F6E;&#x597D;&#x7684;&#x4FE1;&#x606F;&#x3002;
    getCompactHouseList({ &quot;wechatId&quot;: wechatId, &quot;url&quot;: url }).then((res) =&gt; {
        if (res.status.code == 200) {
            let wxConfigObj = res.result.parment;
            let myLink = link ? link : &quot;&quot;;
            let myTitle = title ? title : &quot;&#x5C0F;&#x7231;&#x79D1;&#x6280;&quot;;
            let Mydesc = desc ? desc : &quot;&#x60CA;&#x559C;&#x591A;&#x591A;!&#x4F18;&#x60E0;&#x591A;&#x591A;!&quot;;
            let mypic = pic ? pic : shareOosImg;
            wxConfig(wxConfigObj, myLink, myTitle, Mydesc, mypic);
        }
    }).catch((err) =&gt; {
        console.log(err);
    });
};

function wxConfig(wxConfigObj, link, title, desc, pic) {
    // &#x8FDB;&#x884C;&#x521D;&#x59CB;&#x5316;&#x914D;&#x7F6E;&#x3002;
    wx.config({
        debug: false, // &#x5F00;&#x542F;&#x8C03;&#x8BD5;&#x6A21;&#x5F0F;,&#x8C03;&#x7528;&#x7684;&#x6240;&#x6709;api&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x4F1A;&#x5728;&#x5BA2;&#x6237;&#x7AEF;alert&#x51FA;&#x6765;&#xFF0C;&#x82E5;&#x8981;&#x67E5;&#x770B;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;pc&#x7AEF;&#x6253;&#x5F00;&#xFF0C;&#x53C2;&#x6570;&#x4FE1;&#x606F;&#x4F1A;&#x901A;&#x8FC7;log&#x6253;&#x51FA;&#xFF0C;&#x4EC5;&#x5728;pc&#x7AEF;&#x65F6;&#x624D;&#x4F1A;&#x6253;&#x5370;&#x3002;
        appId: wxConfigObj.appid, // &#x5FC5;&#x586B;&#xFF0C;&#x516C;&#x4F17;&#x53F7;&#x7684;&#x552F;&#x4E00;&#x6807;&#x8BC6;
        timestamp: wxConfigObj.timestamp, // &#x5FC5;&#x586B;&#xFF0C;&#x751F;&#x6210;&#x7B7E;&#x540D;&#x7684;&#x65F6;&#x95F4;&#x6233;
        nonceStr: wxConfigObj.noncestr, // &#x5FC5;&#x586B;&#xFF0C;&#x751F;&#x6210;&#x7B7E;&#x540D;&#x7684;&#x968F;&#x673A;&#x4E32;
        signature: wxConfigObj.signature, // &#x5FC5;&#x586B;&#xFF0C;&#x7B7E;&#x540D;
        jsApiList: [&quot;checkJsApi&quot;,&quot;onMenuShareTimeline&quot;, &quot;onMenuShareAppMessage&quot;, &quot;onMenuShareQQ&quot;,&quot;chooseWXPay&quot;, &quot;chooseImage&quot; ] // &#x5FC5;&#x586B;&#xFF0C;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x7684;JS&#x63A5;&#x53E3;&#x5217;&#x8868;
    });
    wx.ready(() =&gt; {
           //&#x5206;&#x4EAB;&#x5230;&#x670B;&#x53CB;&#x5708;
        wx.onMenuShareTimeline({
            title: title, // &#x5206;&#x4EAB;&#x6807;&#x9898;
            link: link, // &#x5206;&#x4EAB;&#x94FE;&#x63A5;&#xFF0C;&#x8BE5;&#x94FE;&#x63A5;&#x57DF;&#x540D;&#x6216;&#x8DEF;&#x5F84;&#x5FC5;&#x987B;&#x4E0E;&#x5F53;&#x524D;&#x9875;&#x9762;&#x5BF9;&#x5E94;&#x7684;&#x516C;&#x4F17;&#x53F7;JS&#x5B89;&#x5168;&#x57DF;&#x540D;&#x4E00;&#x81F4;
            imgUrl: pic, // &#x5206;&#x4EAB;&#x56FE;&#x6807;
            success: function () {
                // alert(&quot;&#x5206;&#x4EAB;&#x670B;&#x53CB;&#x5708;&#x6210;&#x529F;&quot;);
            }
        });
               // &#x5206;&#x4EAB;&#x7ED9;&#x5FAE;&#x4FE1;&#x670B;&#x53CB;
        wx.onMenuShareAppMessage({
            title: title, // &#x5206;&#x4EAB;&#x6807;&#x9898;
            desc: desc, // &#x5206;&#x4EAB;&#x63CF;&#x8FF0;
            link: link, // &#x5206;&#x4EAB;&#x94FE;&#x63A5;&#xFF0C;&#x8BE5;&#x94FE;&#x63A5;&#x57DF;&#x540D;&#x6216;&#x8DEF;&#x5F84;&#x5FC5;&#x987B;&#x4E0E;&#x5F53;&#x524D;&#x9875;&#x9762;&#x5BF9;&#x5E94;&#x7684;&#x516C;&#x4F17;&#x53F7;JS&#x5B89;&#x5168;&#x57DF;&#x540D;&#x4E00;&#x81F4;
            imgUrl: pic, // &#x5206;&#x4EAB;&#x56FE;&#x6807;
            type: &quot;&quot;, // &#x5206;&#x4EAB;&#x7C7B;&#x578B;,music&#x3001;video&#x6216;link&#xFF0C;&#x4E0D;&#x586B;&#x9ED8;&#x8BA4;&#x4E3A;link
            dataUrl: &quot;&quot;, // &#x5982;&#x679C;type&#x662F;music&#x6216;video&#xFF0C;&#x5219;&#x8981;&#x63D0;&#x4F9B;&#x6570;&#x636E;&#x94FE;&#x63A5;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&#x7A7A;
            success: function () {
                // &#x7528;&#x6237;&#x70B9;&#x51FB;&#x4E86;&#x5206;&#x4EAB;&#x540E;&#x6267;&#x884C;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;
                //alert(&quot;&#x5206;&#x4EAB;&#x670B;&#x53CB;&#x6210;&#x529F;&quot;);
            }
        });
                // &#x5206;&#x4EAB;&#x5230;QQ
                wx.onMenuShareQQ({
                        title: title, // &#x5206;&#x4EAB;&#x6807;&#x9898;
                        desc: desc, // &#x5206;&#x4EAB;&#x63CF;&#x8FF0;
                        link: link, // &#x5206;&#x4EAB;&#x94FE;&#x63A5;
                        imgUrl: pic, // &#x5206;&#x4EAB;&#x56FE;&#x6807;
                        success: function () {
                        // &#x7528;&#x6237;&#x786E;&#x8BA4;&#x5206;&#x4EAB;&#x540E;&#x6267;&#x884C;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;
                        },
                        cancel: function () {
                        // &#x7528;&#x6237;&#x53D6;&#x6D88;&#x5206;&#x4EAB;&#x540E;&#x6267;&#x884C;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;
                        }
                });
        wx.checkJsApi({
            jsApiList: [&apos;chooseImage&apos;], // &#x9700;&#x8981;&#x68C0;&#x6D4B;&#x7684;JS&#x63A5;&#x53E3;&#x5217;&#x8868;&#xFF0C;&#x6240;&#x6709;JS&#x63A5;&#x53E3;&#x5217;&#x8868;&#x89C1;&#x9644;&#x5F55;2,
            success: function(res) {
                console.log(res);
            // &#x4EE5;&#x952E;&#x503C;&#x5BF9;&#x7684;&#x5F62;&#x5F0F;&#x8FD4;&#x56DE;&#xFF0C;&#x53EF;&#x7528;&#x7684;api&#x503C;true&#xFF0C;&#x4E0D;&#x53EF;&#x7528;&#x4E3A;false
            // &#x5982;&#xFF1A;{&quot;checkResult&quot;:{&quot;chooseImage&quot;:true},&quot;errMsg&quot;:&quot;checkJsApi:ok&quot;}
            }
        });
    });
    wx.error(() =&gt; {
    });
};

export function chooseWXPay(data, This) {// &#x652F;&#x4ED8;
    wx.chooseWXPay({
        timestamp: data.timeStamp, // &#x652F;&#x4ED8;&#x7B7E;&#x540D;&#x65F6;&#x95F4;&#x6233;&#xFF0C;&#x6CE8;&#x610F;&#x5FAE;&#x4FE1;jssdk&#x4E2D;&#x7684;&#x6240;&#x6709;&#x4F7F;&#x7528;timestamp&#x5B57;&#x6BB5;&#x5747;&#x4E3A;&#x5C0F;&#x5199;&#x3002;&#x4F46;&#x6700;&#x65B0;&#x7248;&#x7684;&#x652F;&#x4ED8;&#x540E;&#x53F0;&#x751F;&#x6210;&#x7B7E;&#x540D;&#x4F7F;&#x7528;&#x7684;timeStamp&#x5B57;&#x6BB5;&#x540D;&#x9700;&#x5927;&#x5199;&#x5176;&#x4E2D;&#x7684;S&#x5B57;&#x7B26;
        nonceStr: data.nonceStr, // &#x652F;&#x4ED8;&#x7B7E;&#x540D;&#x968F;&#x673A;&#x4E32;&#xFF0C;&#x4E0D;&#x957F;&#x4E8E; 32 &#x4F4D;
        package: data.package, // &#x7EDF;&#x4E00;&#x652F;&#x4ED8;&#x63A5;&#x53E3;&#x8FD4;&#x56DE;&#x7684;prepay_id&#x53C2;&#x6570;&#x503C;&#xFF0C;&#x63D0;&#x4EA4;&#x683C;&#x5F0F;&#x5982;&#xFF1A;prepay_id=\*\*\*&#xFF09;
        signType: data.signType, // &#x7B7E;&#x540D;&#x65B9;&#x5F0F;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&apos;SHA1&apos;&#xFF0C;&#x4F7F;&#x7528;&#x65B0;&#x7248;&#x652F;&#x4ED8;&#x9700;&#x4F20;&#x5165;&apos;MD5&apos;
        paySign: data.paySign, // &#x652F;&#x4ED8;&#x7B7E;&#x540D;
        success: function (res) {
            This.$router.push({ path: &quot;/myReserve&quot;, query: { &quot;reserve&quot;: &quot;reservation&quot; } });
        }
    });
};

//&#x62CD;&#x7167;&#x6216;&#x4ECE;&#x624B;&#x673A;&#x76F8;&#x518C;&#x4E2D;&#x9009;&#x56FE;&#x63A5;&#x53E3;
export function chooseImage(callback) {
    wx.chooseImage({
        count: 6, // &#x9ED8;&#x8BA4;9
        sizeType: [&apos;original&apos;, &apos;compressed&apos;], // &#x53EF;&#x4EE5;&#x6307;&#x5B9A;&#x662F;&#x539F;&#x56FE;&#x8FD8;&#x662F;&#x538B;&#x7F29;&#x56FE;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E8C;&#x8005;&#x90FD;&#x6709;
        sourceType: [&apos;album&apos;, &apos;camera&apos;], // &#x53EF;&#x4EE5;&#x6307;&#x5B9A;&#x6765;&#x6E90;&#x662F;&#x76F8;&#x518C;&#x8FD8;&#x662F;&#x76F8;&#x673A;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E8C;&#x8005;&#x90FD;&#x6709;
        success: function (res) {
            callback(res);
        }
    });
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">import</span> <span class="hljs-selector-tag">fetch</span> <span class="hljs-selector-tag">from</span> &quot;./<span class="hljs-selector-tag">fetch</span>&quot;;
<span class="hljs-comment">/**
  * baseUrl:&#x670D;&#x52A1;&#x5668;&#x5730;&#x5740;
  * shareOosImg&#xFF1A;&#x5206;&#x4EAB;&#x9ED8;&#x8BA4;&#x7684;&#x56FE;&#x6807;
  * wechatId&#xFF1A;&#x7533;&#x8BF7;&#x6210;&#x529F;&#x7684;wechatId
  **/</span>
<span class="hljs-selector-tag">import</span> { baseUrl,shareOosImg,wechatId } <span class="hljs-selector-tag">from</span> &quot;@/<span class="hljs-keyword">utils</span>/<span class="hljs-keyword">env</span>&quot;; 

<span class="hljs-comment">/**
  * &#x83B7;&#x53D6;&#x5FAE;&#x4FE1;&#x7AEF;&#x7B7E;&#x540D;&#xFF0C;&#x65F6;&#x95F4;&#x6233;&#x7B49;&#x4FE1;&#x606F;
  */</span>
<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">const</span> <span class="hljs-selector-tag">getCompactHouseList</span> = (<span class="hljs-selector-tag">reqData</span>) =&gt; <span class="hljs-selector-tag">fetch</span>(&quot;/<span class="hljs-selector-tag">v2</span>/<span class="hljs-selector-tag">cotton</span>/<span class="hljs-selector-tag">user</span>/<span class="hljs-selector-tag">get_wechat_authorize</span>&quot;, <span class="hljs-selector-tag">reqData</span>);

<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">function</span> <span class="hljs-selector-tag">setWxConfig</span>(<span class="hljs-selector-tag">link</span>, <span class="hljs-selector-tag">title</span>, <span class="hljs-selector-tag">desc</span>, <span class="hljs-selector-tag">pic</span>) {
    let url = window.location.href.split(&quot;#&quot;)[0];
    // &#x516C;&#x4F17;&#x53F7;&#x7533;&#x8BF7;&#x6D41;&#x7A0B;&#x8D70;&#x5B8C;&#x4E4B;&#x540E;&#xFF0C;&#x5B98;&#x65B9;&#x4F1A;&#x7ED9;&#x7ED9;&#x51FA;&#x4E00;&#x4E2A;&quot;wechatId&quot;,&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#x53BB;&#x8BF7;&#x6C42;&#x6211;&#x4EEC;&#x7684;&#x540E;&#x53F0;&#x63A5;&#x53E3;&#xFF0C;&#x5C31;&#x4F1A;&#x5F97;&#x5230;&#x76F8;&#x5173;&#x5DF2;&#x7ECF;&#x914D;&#x7F6E;&#x597D;&#x7684;&#x4FE1;&#x606F;&#x3002;
    getCompactHouseList({ &quot;wechatId&quot;: wechatId, &quot;url&quot;: url })<span class="hljs-selector-class">.then</span>((<span class="hljs-selector-tag">res</span>) =&gt; {
        if (res.status.code == 200) {
            let wxConfigObj = res.result.parment;
            let myLink = link ? <span class="hljs-attribute">link </span>: <span class="hljs-string">&quot;&quot;</span>;
            let myTitle = title ? <span class="hljs-attribute">title </span>: <span class="hljs-string">&quot;&#x5C0F;&#x7231;&#x79D1;&#x6280;&quot;</span>;
            let Mydesc = desc ? <span class="hljs-attribute">desc </span>: <span class="hljs-string">&quot;&#x60CA;&#x559C;&#x591A;&#x591A;!&#x4F18;&#x60E0;&#x591A;&#x591A;!&quot;</span>;
            let mypic = pic ? <span class="hljs-attribute">pic </span>: shareOosImg;
            wxConfig(wxConfigObj, myLink, myTitle, Mydesc, mypic);
        }
    })<span class="hljs-selector-class">.catch</span>((<span class="hljs-selector-tag">err</span>) =&gt; {
        console.log(err);
    });
};

<span class="hljs-selector-tag">function</span> <span class="hljs-selector-tag">wxConfig</span>(<span class="hljs-selector-tag">wxConfigObj</span>, <span class="hljs-selector-tag">link</span>, <span class="hljs-selector-tag">title</span>, <span class="hljs-selector-tag">desc</span>, <span class="hljs-selector-tag">pic</span>) {
    // &#x8FDB;&#x884C;&#x521D;&#x59CB;&#x5316;&#x914D;&#x7F6E;&#x3002;
    wx.config({
        <span class="hljs-attribute">debug</span>: false, // &#x5F00;&#x542F;&#x8C03;&#x8BD5;&#x6A21;&#x5F0F;,&#x8C03;&#x7528;&#x7684;&#x6240;&#x6709;api&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x4F1A;&#x5728;&#x5BA2;&#x6237;&#x7AEF;alert&#x51FA;&#x6765;&#xFF0C;&#x82E5;&#x8981;&#x67E5;&#x770B;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;pc&#x7AEF;&#x6253;&#x5F00;&#xFF0C;&#x53C2;&#x6570;&#x4FE1;&#x606F;&#x4F1A;&#x901A;&#x8FC7;log&#x6253;&#x51FA;&#xFF0C;&#x4EC5;&#x5728;pc&#x7AEF;&#x65F6;&#x624D;&#x4F1A;&#x6253;&#x5370;&#x3002;
        appId: wxConfigObj.appid, // &#x5FC5;&#x586B;&#xFF0C;&#x516C;&#x4F17;&#x53F7;&#x7684;&#x552F;&#x4E00;&#x6807;&#x8BC6;
        timestamp: wxConfigObj.timestamp, // &#x5FC5;&#x586B;&#xFF0C;&#x751F;&#x6210;&#x7B7E;&#x540D;&#x7684;&#x65F6;&#x95F4;&#x6233;
        nonceStr: wxConfigObj.noncestr, // &#x5FC5;&#x586B;&#xFF0C;&#x751F;&#x6210;&#x7B7E;&#x540D;&#x7684;&#x968F;&#x673A;&#x4E32;
        signature: wxConfigObj.signature, // &#x5FC5;&#x586B;&#xFF0C;&#x7B7E;&#x540D;
        jsApiList: [<span class="hljs-string">&quot;checkJsApi&quot;</span>,<span class="hljs-string">&quot;onMenuShareTimeline&quot;</span>, <span class="hljs-string">&quot;onMenuShareAppMessage&quot;</span>, <span class="hljs-string">&quot;onMenuShareQQ&quot;</span>,<span class="hljs-string">&quot;chooseWXPay&quot;</span>, <span class="hljs-string">&quot;chooseImage&quot;</span> ] // &#x5FC5;&#x586B;&#xFF0C;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x7684;JS&#x63A5;&#x53E3;&#x5217;&#x8868;
    });
    <span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.ready</span>(() =&gt; {
           //&#x5206;&#x4EAB;&#x5230;&#x670B;&#x53CB;&#x5708;
        wx.onMenuShareTimeline({
            <span class="hljs-attribute">title</span>: title, // &#x5206;&#x4EAB;&#x6807;&#x9898;
            link: link, // &#x5206;&#x4EAB;&#x94FE;&#x63A5;&#xFF0C;&#x8BE5;&#x94FE;&#x63A5;&#x57DF;&#x540D;&#x6216;&#x8DEF;&#x5F84;&#x5FC5;&#x987B;&#x4E0E;&#x5F53;&#x524D;&#x9875;&#x9762;&#x5BF9;&#x5E94;&#x7684;&#x516C;&#x4F17;&#x53F7;JS&#x5B89;&#x5168;&#x57DF;&#x540D;&#x4E00;&#x81F4;
            imgUrl: pic, // &#x5206;&#x4EAB;&#x56FE;&#x6807;
            success: function () {
                // <span class="hljs-built_in">alert</span>(<span class="hljs-string">&quot;&#x5206;&#x4EAB;&#x670B;&#x53CB;&#x5708;&#x6210;&#x529F;&quot;</span>);
            }
        });
               // &#x5206;&#x4EAB;&#x7ED9;&#x5FAE;&#x4FE1;&#x670B;&#x53CB;
        <span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.onMenuShareAppMessage</span>({
            <span class="hljs-attribute">title</span>: title, // &#x5206;&#x4EAB;&#x6807;&#x9898;
            desc: desc, // &#x5206;&#x4EAB;&#x63CF;&#x8FF0;
            link: link, // &#x5206;&#x4EAB;&#x94FE;&#x63A5;&#xFF0C;&#x8BE5;&#x94FE;&#x63A5;&#x57DF;&#x540D;&#x6216;&#x8DEF;&#x5F84;&#x5FC5;&#x987B;&#x4E0E;&#x5F53;&#x524D;&#x9875;&#x9762;&#x5BF9;&#x5E94;&#x7684;&#x516C;&#x4F17;&#x53F7;JS&#x5B89;&#x5168;&#x57DF;&#x540D;&#x4E00;&#x81F4;
            imgUrl: pic, // &#x5206;&#x4EAB;&#x56FE;&#x6807;
            type: <span class="hljs-string">&quot;&quot;</span>, // &#x5206;&#x4EAB;&#x7C7B;&#x578B;,music&#x3001;video&#x6216;link&#xFF0C;&#x4E0D;&#x586B;&#x9ED8;&#x8BA4;&#x4E3A;link
            dataUrl: <span class="hljs-string">&quot;&quot;</span>, // &#x5982;&#x679C;type&#x662F;music&#x6216;video&#xFF0C;&#x5219;&#x8981;&#x63D0;&#x4F9B;&#x6570;&#x636E;&#x94FE;&#x63A5;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&#x7A7A;
            success: function () {
                // &#x7528;&#x6237;&#x70B9;&#x51FB;&#x4E86;&#x5206;&#x4EAB;&#x540E;&#x6267;&#x884C;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;
                //<span class="hljs-built_in">alert</span>(<span class="hljs-string">&quot;&#x5206;&#x4EAB;&#x670B;&#x53CB;&#x6210;&#x529F;&quot;</span>);
            }
        });
                // &#x5206;&#x4EAB;&#x5230;<span class="hljs-selector-tag">QQ</span>
                <span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.onMenuShareQQ</span>({
                        <span class="hljs-attribute">title</span>: title, // &#x5206;&#x4EAB;&#x6807;&#x9898;
                        desc: desc, // &#x5206;&#x4EAB;&#x63CF;&#x8FF0;
                        link: link, // &#x5206;&#x4EAB;&#x94FE;&#x63A5;
                        imgUrl: pic, // &#x5206;&#x4EAB;&#x56FE;&#x6807;
                        success: function () {
                        // &#x7528;&#x6237;&#x786E;&#x8BA4;&#x5206;&#x4EAB;&#x540E;&#x6267;&#x884C;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;
                        },
                        <span class="hljs-selector-tag">cancel</span>: <span class="hljs-selector-tag">function</span> () {
                        // &#x7528;&#x6237;&#x53D6;&#x6D88;&#x5206;&#x4EAB;&#x540E;&#x6267;&#x884C;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;
                        }
                });
        <span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.checkJsApi</span>({
            <span class="hljs-attribute">jsApiList</span>: [<span class="hljs-string">&apos;chooseImage&apos;</span>], // &#x9700;&#x8981;&#x68C0;&#x6D4B;&#x7684;JS&#x63A5;&#x53E3;&#x5217;&#x8868;&#xFF0C;&#x6240;&#x6709;JS&#x63A5;&#x53E3;&#x5217;&#x8868;&#x89C1;&#x9644;&#x5F55;<span class="hljs-number">2</span>,
            success: <span class="hljs-built_in">function</span>(res) {
                console.<span class="hljs-built_in">log</span>(res);
            // &#x4EE5;&#x952E;&#x503C;&#x5BF9;&#x7684;&#x5F62;&#x5F0F;&#x8FD4;&#x56DE;&#xFF0C;&#x53EF;&#x7528;&#x7684;api&#x503C;true&#xFF0C;&#x4E0D;&#x53EF;&#x7528;&#x4E3A;false
            // &#x5982;&#xFF1A;{&quot;checkResult&quot;:{&quot;chooseImage&quot;:true},&quot;<span class="hljs-selector-tag">errMsg</span>&quot;<span class="hljs-selector-pseudo">:&quot;checkJsApi</span><span class="hljs-selector-pseudo">:ok&quot;</span>}
            }
        });
    });
    <span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.error</span>(() =&gt; {
    });
};

<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">function</span> <span class="hljs-selector-tag">chooseWXPay</span>(<span class="hljs-selector-tag">data</span>, <span class="hljs-selector-tag">This</span>) {// &#x652F;&#x4ED8;
    wx.chooseWXPay({
        <span class="hljs-attribute">timestamp</span>: data.timeStamp, // &#x652F;&#x4ED8;&#x7B7E;&#x540D;&#x65F6;&#x95F4;&#x6233;&#xFF0C;&#x6CE8;&#x610F;&#x5FAE;&#x4FE1;jssdk&#x4E2D;&#x7684;&#x6240;&#x6709;&#x4F7F;&#x7528;timestamp&#x5B57;&#x6BB5;&#x5747;&#x4E3A;&#x5C0F;&#x5199;&#x3002;&#x4F46;&#x6700;&#x65B0;&#x7248;&#x7684;&#x652F;&#x4ED8;&#x540E;&#x53F0;&#x751F;&#x6210;&#x7B7E;&#x540D;&#x4F7F;&#x7528;&#x7684;timeStamp&#x5B57;&#x6BB5;&#x540D;&#x9700;&#x5927;&#x5199;&#x5176;&#x4E2D;&#x7684;S&#x5B57;&#x7B26;
        nonceStr: data.nonceStr, // &#x652F;&#x4ED8;&#x7B7E;&#x540D;&#x968F;&#x673A;&#x4E32;&#xFF0C;&#x4E0D;&#x957F;&#x4E8E; <span class="hljs-number">32</span> &#x4F4D;
        package: data.package, // &#x7EDF;&#x4E00;&#x652F;&#x4ED8;&#x63A5;&#x53E3;&#x8FD4;&#x56DE;&#x7684;prepay_id&#x53C2;&#x6570;&#x503C;&#xFF0C;&#x63D0;&#x4EA4;&#x683C;&#x5F0F;&#x5982;&#xFF1A;prepay_id=\*\*\*&#xFF09;
        signType: data.signType, // &#x7B7E;&#x540D;&#x65B9;&#x5F0F;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;<span class="hljs-string">&apos;SHA1&apos;</span>&#xFF0C;&#x4F7F;&#x7528;&#x65B0;&#x7248;&#x652F;&#x4ED8;&#x9700;&#x4F20;&#x5165;<span class="hljs-string">&apos;MD5&apos;</span>
        paySign: data.paySign, // &#x652F;&#x4ED8;&#x7B7E;&#x540D;
        success: function (res) {
            This.$router.<span class="hljs-built_in">push</span>({ path: <span class="hljs-string">&quot;/myReserve&quot;</span>, query: { <span class="hljs-string">&quot;reserve&quot;</span>: <span class="hljs-string">&quot;reservation&quot;</span> } });
        }
    });
};

//&#x62CD;&#x7167;&#x6216;&#x4ECE;&#x624B;&#x673A;&#x76F8;&#x518C;&#x4E2D;&#x9009;&#x56FE;&#x63A5;&#x53E3;
<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">function</span> <span class="hljs-selector-tag">chooseImage</span>(<span class="hljs-selector-tag">callback</span>) {
    wx.chooseImage({
        <span class="hljs-attribute">count</span>: <span class="hljs-number">6</span>, // &#x9ED8;&#x8BA4;<span class="hljs-number">9</span>
        sizeType: [<span class="hljs-string">&apos;original&apos;</span>, <span class="hljs-string">&apos;compressed&apos;</span>], // &#x53EF;&#x4EE5;&#x6307;&#x5B9A;&#x662F;&#x539F;&#x56FE;&#x8FD8;&#x662F;&#x538B;&#x7F29;&#x56FE;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E8C;&#x8005;&#x90FD;&#x6709;
        sourceType: [<span class="hljs-string">&apos;album&apos;</span>, <span class="hljs-string">&apos;camera&apos;</span>], // &#x53EF;&#x4EE5;&#x6307;&#x5B9A;&#x6765;&#x6E90;&#x662F;&#x76F8;&#x518C;&#x8FD8;&#x662F;&#x76F8;&#x673A;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E8C;&#x8005;&#x90FD;&#x6709;
        success: function (res) {
            <span class="hljs-built_in">callback</span>(res);
        }
    });
}
</code></pre><p>3&#x3001;&#x5728;main.js&#x4E2D;&#x5F15;&#x7528;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &quot;vue&quot;;
import * as wx &quot;@/utils/wx&quot;;
Vue.use(wx);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">import</span> <span class="hljs-selector-tag">Vue</span> <span class="hljs-selector-tag">from</span> &quot;<span class="hljs-selector-tag">vue</span>&quot;;
<span class="hljs-selector-tag">import</span> * <span class="hljs-selector-tag">as</span> <span class="hljs-selector-tag">wx</span> &quot;@/<span class="hljs-keyword">utils</span>/<span class="hljs-keyword">wx</span>&quot;;
<span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.use</span>(<span class="hljs-selector-tag">wx</span>);</code></pre><p>3&#x3001;&#x9875;&#x9762;&#x4E2D;&#x5F15;&#x7528;&#x5206;&#x4EAB;&#x65B9;&#x6CD5;</p><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong>&#x5982;&#x679C;&#x8FD9;&#x4E2A;&#x9875;&#x9762;&#xFF0C;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x5206;&#x4EAB;&#x51FA;&#x53BB;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x662F;&#x6309;&#x4EA7;&#x54C1;&#x8BBE;&#x8BA1;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x5728;<br>&#x65B9;&#x6CD5;&#x4E2D;&#x8C03;&#x7528;&#x5206;&#x4EAB;&#x65B9;&#x6CD5;&#xFF1B;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x4E0D;&#x5173;&#x5FC3;&#x8FD9;&#x4E2A;&#x9875;&#x9762;&#x7684;&#x5206;&#x4EAB;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4E0D;&#x7528;&#x8C03;&#x7528;&#x914D;&#x7F6E;&#x597D;&#x7684;&#x5206;&#x4EAB;&#x65B9;&#x6CD5;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&#x5FAE;&#x4FE1;&#x81EA;&#x5E26;&#x7684;&#x5206;&#x4EAB;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.wx.setWxConfig(`${baseUrl}/tuijianDetail`,&quot;&#x6211;&#x5728;&#x5C0F;&#x7231;&#x79D1;&#x6280;&#x7B49;&#x4F60;&#x6765;~&quot;,&quot;&#x60CA;&#x559C;&#x591A;&#x591A;&#xFF01;&#x4F18;&#x60E0;&#x591A;&#x591A;&#xFF01;&#x63A8;&#x8350;&#x597D;&#x53CB;&#x5173;&#x6CE8;&#x6709;&#x7EA2;&#x5305;~&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css" style="word-break:break-word;white-space:initial"><span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.wx</span><span class="hljs-selector-class">.setWxConfig</span>(`${baseUrl}/<span class="hljs-selector-tag">tuijianDetail</span>`,&quot;&#x6211;&#x5728;&#x5C0F;&#x7231;&#x79D1;&#x6280;&#x7B49;&#x4F60;&#x6765;~&quot;,&quot;&#x60CA;&#x559C;&#x591A;&#x591A;&#xFF01;&#x4F18;&#x60E0;&#x591A;&#x591A;&#xFF01;&#x63A8;&#x8350;&#x597D;&#x53CB;&#x5173;&#x6CE8;&#x6709;&#x7EA2;&#x5305;~&quot;);</code></pre><p>&#x8FD9;&#x6837;&#x4F7F;&#x7528;&#x5FAE;&#x4FE1;&#x53F3;&#x4E0A;&#x89D2;&#x7684;&#x5206;&#x4EAB;&#x529F;&#x80FD;&#xFF0C;&#x6210;&#x529F;&#x5206;&#x4EAB;&#x51FA;&#x53BB;&#x4E4B;&#x540E;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x60F3;&#x8981;&#x7684;&#x5185;&#x5BB9;&#x4E86;&#x3002;</p><ul><li>vue2&#x5B9E;&#x73B0;&#x5FAE;&#x4FE1;&#x652F;&#x4ED8;&#x5751;&#x70B9;&#x548C;&#x7ECF;&#x9A8C;&#xFF1B;</li></ul><p>&#x540C;&#x7406;&#xFF0C;&#x5FAE;&#x4FE1;&#x652F;&#x4ED8;&#xFF0C;&#x9700;&#x8981;&#x8C03;&#x53D6;&#x5FAE;&#x4FE1;&#x652F;&#x4ED8;api&#x3002;&#x7531;&#x4E8E;&#x5FAE;&#x4FE1;&#x652F;&#x4ED8;api,&#x662F;&#x5728;&#x6211;&#x4EEC;&#x70B9;&#x51FB;&#x6309;&#x94AE;&#x65F6;&#x89E6;&#x53D1;&#xFF0C;&#x6240;&#x6709;&#x5C31;&#x4E0D;&#x9700;&#x8981;&#x5199;&#x5728; wx.ready(() =&gt; {}&#xFF09;&#x91CC;&#x9762;&#x4E86;&#x3002;</p><ol><li>&#x76F8;&#x540C;&#x7684;&#x65B9;&#x6CD5;&#x5B9A;&#x4E49;wx.js&#x4E2D;&#xFF1A;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function chooseWXPay(data, This) {// &#x652F;&#x4ED8;
    wx.chooseWXPay({
        timestamp: data.timeStamp, // &#x652F;&#x4ED8;&#x7B7E;&#x540D;&#x65F6;&#x95F4;&#x6233;&#xFF0C;&#x6CE8;&#x610F;&#x5FAE;&#x4FE1;jssdk&#x4E2D;&#x7684;&#x6240;&#x6709;&#x4F7F;&#x7528;timestamp&#x5B57;&#x6BB5;&#x5747;&#x4E3A;&#x5C0F;&#x5199;&#x3002;&#x4F46;&#x6700;&#x65B0;&#x7248;&#x7684;&#x652F;&#x4ED8;&#x540E;&#x53F0;&#x751F;&#x6210;&#x7B7E;&#x540D;&#x4F7F;&#x7528;&#x7684;timeStamp&#x5B57;&#x6BB5;&#x540D;&#x9700;&#x5927;&#x5199;&#x5176;&#x4E2D;&#x7684;S&#x5B57;&#x7B26;
        nonceStr: data.nonceStr, // &#x652F;&#x4ED8;&#x7B7E;&#x540D;&#x968F;&#x673A;&#x4E32;&#xFF0C;&#x4E0D;&#x957F;&#x4E8E; 32 &#x4F4D;
        package: data.package, // &#x7EDF;&#x4E00;&#x652F;&#x4ED8;&#x63A5;&#x53E3;&#x8FD4;&#x56DE;&#x7684;prepay_id&#x53C2;&#x6570;&#x503C;&#xFF0C;&#x63D0;&#x4EA4;&#x683C;&#x5F0F;&#x5982;&#xFF1A;prepay_id=\*\*\*&#xFF09;
        signType: data.signType, // &#x7B7E;&#x540D;&#x65B9;&#x5F0F;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&apos;SHA1&apos;&#xFF0C;&#x4F7F;&#x7528;&#x65B0;&#x7248;&#x652F;&#x4ED8;&#x9700;&#x4F20;&#x5165;&apos;MD5&apos;
        paySign: data.paySign, // &#x652F;&#x4ED8;&#x7B7E;&#x540D;
        success: function (res) {
            This.$router.push({ path: &quot;/myReserve&quot;, query: { &quot;reserve&quot;: &quot;reservation&quot; } });
        }
    });
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">function</span> <span class="hljs-selector-tag">chooseWXPay</span>(<span class="hljs-selector-tag">data</span>, <span class="hljs-selector-tag">This</span>) {// &#x652F;&#x4ED8;
    wx.chooseWXPay({
        <span class="hljs-attribute">timestamp</span>: data.timeStamp, // &#x652F;&#x4ED8;&#x7B7E;&#x540D;&#x65F6;&#x95F4;&#x6233;&#xFF0C;&#x6CE8;&#x610F;&#x5FAE;&#x4FE1;jssdk&#x4E2D;&#x7684;&#x6240;&#x6709;&#x4F7F;&#x7528;timestamp&#x5B57;&#x6BB5;&#x5747;&#x4E3A;&#x5C0F;&#x5199;&#x3002;&#x4F46;&#x6700;&#x65B0;&#x7248;&#x7684;&#x652F;&#x4ED8;&#x540E;&#x53F0;&#x751F;&#x6210;&#x7B7E;&#x540D;&#x4F7F;&#x7528;&#x7684;timeStamp&#x5B57;&#x6BB5;&#x540D;&#x9700;&#x5927;&#x5199;&#x5176;&#x4E2D;&#x7684;S&#x5B57;&#x7B26;
        nonceStr: data.nonceStr, // &#x652F;&#x4ED8;&#x7B7E;&#x540D;&#x968F;&#x673A;&#x4E32;&#xFF0C;&#x4E0D;&#x957F;&#x4E8E; <span class="hljs-number">32</span> &#x4F4D;
        package: data.package, // &#x7EDF;&#x4E00;&#x652F;&#x4ED8;&#x63A5;&#x53E3;&#x8FD4;&#x56DE;&#x7684;prepay_id&#x53C2;&#x6570;&#x503C;&#xFF0C;&#x63D0;&#x4EA4;&#x683C;&#x5F0F;&#x5982;&#xFF1A;prepay_id=\*\*\*&#xFF09;
        signType: data.signType, // &#x7B7E;&#x540D;&#x65B9;&#x5F0F;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;<span class="hljs-string">&apos;SHA1&apos;</span>&#xFF0C;&#x4F7F;&#x7528;&#x65B0;&#x7248;&#x652F;&#x4ED8;&#x9700;&#x4F20;&#x5165;<span class="hljs-string">&apos;MD5&apos;</span>
        paySign: data.paySign, // &#x652F;&#x4ED8;&#x7B7E;&#x540D;
        success: function (res) {
            This.$router.<span class="hljs-built_in">push</span>({ path: <span class="hljs-string">&quot;/myReserve&quot;</span>, query: { <span class="hljs-string">&quot;reserve&quot;</span>: <span class="hljs-string">&quot;reservation&quot;</span> } });
        }
    });
};</code></pre><ol><li>&#x9875;&#x9762;&#x4E2D;&#x8C03;&#x7528;&#x5982;&#x4E0B;&#xFF1A;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.wx.chooseWXPay(res.result.list,This);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css" style="word-break:break-word;white-space:initial"><span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.wx</span><span class="hljs-selector-class">.chooseWXPay</span>(<span class="hljs-selector-tag">res</span><span class="hljs-selector-class">.result</span><span class="hljs-selector-class">.list</span>,<span class="hljs-selector-tag">This</span>);</code></pre><p>&#x652F;&#x4ED8;&#x6210;&#x529F;&#x4E4B;&#x540E;&#xFF0C;&#x901A;&#x8FC7;&#x8DEF;&#x7531;&#x8DF3;&#x8F6C;&#x5230;&#x5176;&#x4ED6;&#x9875;&#x9762;&#xFF1B;</p><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong>&#x5FAE;&#x4FE1;api&#x7684;&#x6210;&#x529F;&#x9A8C;&#x8BC1;&#xFF0C;&#x5FC5;&#x987B;&#x8981;&#x5916;&#x7F51;&#x5730;&#x5740;&#xFF08;&#x80FD;&#x591F;&#x8BBF;&#x95EE;&#x7684;&#x670D;&#x52A1;&#x5668;&#x5730;&#x5740;&#xFF09;&#xFF0C;&#x5982;&#x679C;&#x4F7F;&#x7528;&#x81EA;&#x5DF1;&#x672C;&#x673A;&#x7684;&#x5730;&#x5740;&#xFF0C;&#x653E;&#x5230;&#x624B;&#x673A;&#x4E0A;&#x6D4B;&#x8BD5;&#xFF0C;&#x662F;&#x65E0;&#x6CD5;&#x6210;&#x529F;&#x7684;&#x3002;</p><h3 id="articleHeader7">&#x767E;&#x5EA6;&#x5730;&#x56FE;api&#x5728;vue&#x9879;&#x76EE;&#x4E2D;&#x7684;&#x4F7F;&#x7528;:</h3><p><a href="http://lbsyun.baidu.com/index.php?title=jspopular" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x7F51;&#x5740;</a>&#x3001;<a href="http://lbsyun.baidu.com/jsdemo.htm#a1_2" rel="nofollow noreferrer" target="_blank">&#x793A;&#x4F8B;demo</a>&#x3001;<a href="http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html" rel="nofollow noreferrer" target="_blank">&#x53C2;&#x8003;&#x7C7B;</a>&#x3002;</p><p>&#x7531;&#x4E8E;&#x6700;&#x8FD1;&#x9879;&#x76EE;&#x7684;&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;&#x8981;&#x4F7F;&#x7528;&#x5230;&#x5730;&#x56FE;&#x8FDB;&#x884C;&#x76F8;&#x5173;&#x7684;&#x57CE;&#x5E02;&#x533A;&#x57DF;&#xFF0C;&#x533A;&#x57DF;&#x4E2D;&#x623F;&#x6E90;&#x6570;&#x636E;&#x7684;&#x663E;&#x793A;&#xFF0C;&#x56E0;&#x6B64;&#x9009;&#x62E9;&#x4E86;&#x4F7F;&#x7528;&#x767E;&#x5EA6;&#x5730;&#x56FE;&#x3002;</p><p>&#x767E;&#x5EA6;&#x5730;&#x56FE;JavaScript API&#x662F;&#x4E00;&#x5957;&#x7531;JavaScript&#x8BED;&#x8A00;&#x7F16;&#x5199;&#x7684;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x63A5;&#x53E3;&#xFF0C;&#x53EF;&#x5E2E;&#x52A9;&#x60A8;&#x5728;&#x7F51;&#x7AD9;&#x4E2D;&#x6784;&#x5EFA;&#x529F;&#x80FD;&#x4E30;&#x5BCC;&#x3001;&#x4EA4;&#x4E92;&#x6027;&#x5F3A;&#x7684;&#x5730;&#x56FE;&#x5E94;&#x7528;&#xFF0C;&#x652F;&#x6301;PC&#x7AEF;&#x548C;&#x79FB;&#x52A8;&#x7AEF;&#x57FA;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x5730;&#x56FE;&#x5E94;&#x7528;&#x5F00;&#x53D1;&#xFF0C;&#x4E14;&#x652F;&#x6301;HTML5&#x7279;&#x6027;&#x7684;&#x5730;&#x56FE;&#x5F00;&#x53D1;&#x3002;<br>&#x767E;&#x5EA6;&#x5730;&#x56FE;JavaScript API&#x652F;&#x6301;HTTP&#x548C;HTTPS&#xFF0C;&#x514D;&#x8D39;&#x5BF9;&#x5916;&#x5F00;&#x653E;&#xFF0C;&#x53EF;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x3002;&#x63A5;&#x53E3;&#x4F7F;&#x7528;&#x65E0;&#x6B21;&#x6570;&#x9650;&#x5236;&#x3002;</p><ul><li>vue2.0&#x9879;&#x76EE;&#x4E2D;&#x5982;&#x4F55;&#x4F7F;&#x7528;&#x767E;&#x5EA6;&#x5730;&#x56FE;api</li></ul><p>&#x4F7F;&#x7528;api&#x4E4B;&#x524D;&#xFF0C;&#x8981;&#x6CE8;&#x518C;&#x767E;&#x5EA6;&#x8D26;&#x53F7;&#xFF0C;&#x7533;&#x8BF7;&#x6210;&#x4E3A;&#x767E;&#x5EA6;&#x5F00;&#x53D1;&#x8005;&#xFF0C;&#x83B7;&#x53D6;&#x670D;&#x52A1;&#x5BC6;&#x94A5;&#xFF08;ak&#xFF09;,&#x624D;&#x80FD;&#x4F7F;&#x7528;&#x76F8;&#x5173;&#x7684;&#x670D;&#x52A1;&#x529F;&#x80FD;&#x3002;</p><p>&#x5F00;&#x53D1;&#x6B65;&#x9AA4;&#x5982;&#x4E0B;&#xFF1A;</p><p>1&#x3001;&#x7533;&#x8BF7;&#x767E;&#x5EA6;&#x8D26;&#x53F7;&#x548C;ak&#xFF0C;<a href="http://lbsyun.baidu.com/apiconsole/key" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x6211;&#x7533;&#x8BF7;</a></p><p>2&#x3001;&#x51C6;&#x5907;&#x9875;&#x9762;<br>&#x6839;&#x636E;HTML&#x6807;&#x51C6;&#xFF0C;&#x6BCF;&#x4E00;&#x4EFD;HTML&#x6587;&#x6863;&#x90FD;&#x5E94;&#x8BE5;&#x58F0;&#x660E;&#x6B63;&#x786E;&#x7684;&#x6587;&#x6863;&#x7C7B;&#x578B;&#xFF0C;&#x6211;&#x4EEC;&#x5EFA;&#x8BAE;&#x60A8;&#x4F7F;&#x7528;&#x6700;&#x65B0;&#x7684;&#x7B26;&#x5408;HTML5&#x89C4;&#x8303;&#x7684;&#x6587;&#x6863;&#x58F0;&#x660E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &lt;!DOCTYPE html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css" style="word-break:break-word;white-space:initial"> &lt;!<span class="hljs-selector-tag">DOCTYPE</span> <span class="hljs-selector-tag">html</span>&gt;</code></pre><p>3&#x3001;&#x9002;&#x5E94;&#x79FB;&#x52A8;&#x7AEF;&#x9875;&#x9762;&#x5C55;&#x793A;</p><p>&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;meta&#x6807;&#x7B7E;&#xFF0C;&#x4EE5;&#x4FBF;&#x4F7F;&#x60A8;&#x7684;&#x9875;&#x9762;&#x66F4;&#x597D;&#x7684;&#x5728;&#x79FB;&#x52A8;&#x5E73;&#x53F0;&#x4E0A;&#x5C55;&#x793A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;meta name=&quot;viewport&quot; content=&quot;initial-scale=1.0, user-scalable=no&quot; /&gt;  " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css" style="word-break:break-word;white-space:initial">&lt;<span class="hljs-selector-tag">meta</span> <span class="hljs-selector-tag">name</span>=&quot;<span class="hljs-selector-tag">viewport</span>&quot; <span class="hljs-selector-tag">content</span>=&quot;<span class="hljs-selector-tag">initial-scale</span>=1<span class="hljs-selector-class">.0</span>, <span class="hljs-selector-tag">user-scalable</span>=<span class="hljs-selector-tag">no</span>&quot; /&gt;  </code></pre><p>4&#x3001;&#x8BBE;&#x7F6E;&#x5BB9;&#x5668;&#x6837;&#x5F0F;<br>&#x8BBE;&#x7F6E;&#x5BB9;&#x5668;&#x6837;&#x5F0F;&#x5927;&#x5C0F;&#xFF0C;&#x4F7F;&#x5730;&#x56FE;&#x5145;&#x6EE1;&#x6574;&#x4E2A;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style type=&quot;text/css&quot;&gt;  
    html{height:100%}    
    body{height:100%;margin:0px;padding:0px}    
    #container{height:100%}    
&lt;/style&gt; " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">style</span> <span class="hljs-selector-tag">type</span>=&quot;<span class="hljs-selector-tag">text</span>/<span class="hljs-selector-tag">css</span>&quot;&gt;  
    <span class="hljs-selector-tag">html</span>{<span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>}    
    <span class="hljs-selector-tag">body</span>{<span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>;<span class="hljs-attribute">margin</span>:<span class="hljs-number">0px</span>;<span class="hljs-attribute">padding</span>:<span class="hljs-number">0px</span>}    
    <span class="hljs-selector-id">#container</span>{<span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>}    
&lt;/<span class="hljs-selector-tag">style</span>&gt; </code></pre><p>5&#x3001;&#x5728;index.html&#x4E2D;&#x5F15;&#x7528;&#x767E;&#x5EA6;&#x5730;&#x56FE;API&#x6587;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script type=&quot;text/javascript&quot; src=&quot;http://api.map.baidu.com/api?v=3.0&amp;ak=&#x60A8;&#x7684;&#x5BC6;&#x94A5;&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css" style="word-break:break-word;white-space:initial">&lt;<span class="hljs-selector-tag">script</span> <span class="hljs-selector-tag">type</span>=&quot;<span class="hljs-selector-tag">text</span>/<span class="hljs-selector-tag">javascript</span>&quot; <span class="hljs-selector-tag">src</span>=&quot;<span class="hljs-selector-tag">http</span>://<span class="hljs-selector-tag">api</span><span class="hljs-selector-class">.map</span><span class="hljs-selector-class">.baidu</span><span class="hljs-selector-class">.com</span>/<span class="hljs-selector-tag">api</span>?<span class="hljs-selector-tag">v</span>=3<span class="hljs-selector-class">.0</span>&amp;<span class="hljs-selector-tag">ak</span>=&#x60A8;&#x7684;&#x5BC6;&#x94A5;&quot;&gt;&lt;/<span class="hljs-selector-tag">script</span>&gt;</code></pre><p>6&#x3001;&#x521B;&#x5EFA;&#x5730;&#x56FE;&#x5BB9;&#x5668;&#x5143;&#x7D20;<br>&#x5730;&#x56FE;&#x9700;&#x8981;&#x4E00;&#x4E2A;HTML&#x5143;&#x7D20;&#x4F5C;&#x4E3A;&#x5BB9;&#x5668;&#xFF0C;&#x8FD9;&#x6837;&#x624D;&#x80FD;&#x5C55;&#x73B0;&#x5230;&#x9875;&#x9762;&#x4E0A;&#x3002;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;div&#x5143;&#x7D20;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;container&quot;&gt;&lt;/div&gt; " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css" style="word-break:break-word;white-space:initial">&lt;<span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">id</span>=&quot;<span class="hljs-selector-tag">container</span>&quot;&gt;&lt;/<span class="hljs-selector-tag">div</span>&gt; </code></pre><p>7&#x3001;&#x521B;&#x5EFA;&#x5730;&#x56FE;&#x5B9E;&#x4F8B;<br>&#x4F4D;&#x4E8E;BMap&#x547D;&#x540D;&#x7A7A;&#x95F4;&#x4E0B;&#x7684;Map&#x7C7B;&#x8868;&#x793A;&#x5730;&#x56FE;&#xFF0C;&#x901A;&#x8FC7;new&#x64CD;&#x4F5C;&#x7B26;&#x53EF;&#x4EE5;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5730;&#x56FE;&#x5B9E;&#x4F8B;&#x3002;&#x5176;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x662F;&#x5143;&#x7D20;id&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x5143;&#x7D20;&#x5BF9;&#x8C61;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var map = new BMap.Map(&quot;container&quot;); " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css" style="word-break:break-word;white-space:initial"><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">map</span> = <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">BMap</span><span class="hljs-selector-class">.Map</span>(&quot;<span class="hljs-selector-tag">container</span>&quot;); </code></pre><p>8&#x3001;&#x8BBE;&#x7F6E;&#x4E2D;&#x5FC3;&#x70B9;&#x5750;&#x6807;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var point = new BMap.Point(116.404, 39.915);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css" style="word-break:break-word;white-space:initial"><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">point</span> = <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">BMap</span><span class="hljs-selector-class">.Point</span>(116<span class="hljs-selector-class">.404</span>, 39<span class="hljs-selector-class">.915</span>);</code></pre><p>9&#x3001;&#x5730;&#x56FE;&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x540C;&#x65F6;&#x8BBE;&#x7F6E;&#x5730;&#x56FE;&#x5C55;&#x793A;&#x7EA7;&#x522B;<br>&#x5728;&#x521B;&#x5EFA;&#x5730;&#x56FE;&#x5B9E;&#x4F8B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5BF9;&#x5176;&#x8FDB;&#x884C;&#x521D;&#x59CB;&#x5316;&#xFF0C;BMap.Map.centerAndZoom()&#x65B9;&#x6CD5;&#x8981;&#x6C42;&#x8BBE;&#x7F6E;&#x4E2D;&#x5FC3;&#x70B9;&#x5750;&#x6807;&#x548C;&#x5730;&#x56FE;&#x7EA7;&#x522B;&#x3002; &#x5730;&#x56FE;&#x5FC5;&#x987B;&#x7ECF;&#x8FC7;&#x521D;&#x59CB;&#x5316;&#x624D;&#x53EF;&#x4EE5;&#x6267;&#x884C;&#x5176;&#x4ED6;&#x64CD;&#x4F5C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="map.centerAndZoom(point, 15);  " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css" style="word-break:break-word;white-space:initial"><span class="hljs-selector-tag">map</span><span class="hljs-selector-class">.centerAndZoom</span>(<span class="hljs-selector-tag">point</span>, 15);  </code></pre><p>&#x81F3;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x5FEB;&#x901F;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x5F20;&#x4EE5;&#x5929;&#x5B89;&#x95E8;&#x4E3A;&#x4E2D;&#x5FC3;&#x7684;&#x5730;&#x56FE;~</p><ul><li>vue2&#x5982;&#x4F55;&#x7ED9;&#x5730;&#x56FE;&#x6DFB;&#x52A0;&#x623F;&#x6E90;&#x8986;&#x76D6;&#x7269;&#xFF1B;</li></ul><p>&#x5982;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016433386?w=668&amp;h=458" src="https://static.alili.tech/img/remote/1460000016433386?w=668&amp;h=458" alt="" title="" style="cursor:pointer"></span></p><p>&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5730;&#x56FE;&#x521D;&#x59CB;&#x5316;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#xFF0C;&#x81EA;&#x5B9A;&#x4E49;&#x76F8;&#x5173;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x6765;&#x6DFB;&#x52A0;&#x8986;&#x76D6;&#x7269;&#xFF1B;</p><p>&#x6839;&#x636E;&#x5B98;&#x65B9;&#x6587;&#x6863;&#xFF0C;&#x81EA;&#x5B9A;&#x4E49;&#x6807;&#x6CE8;&#x6216;&#x5730;&#x56FE;&#x8986;&#x76D6;&#x7269;&#x3002;&#x5177;&#x4F53;&#x7684;&#x5B9E;&#x73B0;&#x4EE3;&#x7801;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x5B98;&#x65B9;api&#x8FDB;&#x884C;&#x5F00;&#x53D1;&#x3002;</p><p>1&#x3001;&#x5B9A;&#x4E49;&#x6784;&#x9020;&#x51FD;&#x6570;&#x5E76;&#x7EE7;&#x627F;Overlay<br>&#x9996;&#x5148;&#x60A8;&#x9700;&#x8981;&#x5B9A;&#x4E49;&#x81EA;&#x5B9A;&#x4E49;&#x8986;&#x76D6;&#x7269;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x901A;&#x8FC7;&#x6784;&#x9020;&#x51FD;&#x6570;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x4F20;&#x9012;&#x4E00;&#x4E9B;&#x81EA;&#x7531;&#x7684;&#x53D8;&#x91CF;&#x3002;&#x8BBE;&#x7F6E;&#x81EA;&#x5B9A;&#x4E49;&#x8986;&#x76D6;&#x7269;&#x5BF9;&#x8C61;&#x7684;prototype&#x5C5E;&#x6027;&#x4E3A;Overlay&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x4EE5;&#x4FBF;&#x7EE7;&#x627F;&#x8986;&#x76D6;&#x7269;&#x57FA;&#x7C7B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5B9A;&#x4E49;&#x81EA;&#x5B9A;&#x4E49;&#x8986;&#x76D6;&#x7269;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;  
function SquareOverlay(center, length, color){
    this._center = center;
    his._length = length;
    this._color = color;
}
// &#x7EE7;&#x627F;API&#x7684;BMap.Overlay
SquareOverlay.prototype = new BMap.Overlay();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">// &#x5B9A;&#x4E49;&#x81EA;&#x5B9A;&#x4E49;&#x8986;&#x76D6;&#x7269;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;  
<span class="hljs-selector-tag">function</span> <span class="hljs-selector-tag">SquareOverlay</span>(<span class="hljs-selector-tag">center</span>, <span class="hljs-selector-tag">length</span>, <span class="hljs-selector-tag">color</span>){
    this._center = center;
    his._length = length;
    this._color = color;
}
// &#x7EE7;&#x627F;<span class="hljs-selector-tag">API</span>&#x7684;<span class="hljs-selector-tag">BMap</span><span class="hljs-selector-class">.Overlay</span>
<span class="hljs-selector-tag">SquareOverlay</span><span class="hljs-selector-class">.prototype</span> = <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">BMap</span><span class="hljs-selector-class">.Overlay</span>();</code></pre><p>2&#x3001;&#x521D;&#x59CB;&#x5316;&#x81EA;&#x5B9A;&#x4E49;&#x8986;&#x76D6;&#x7269;</p><p>&#x5B9E;&#x73B0;initialize&#x65B9;&#x6CD5;&#xFF0C;&#x5F53;&#x8C03;&#x7528;map.addOverlay&#x65B9;&#x6CD5;&#x65F6;&#xFF0C;API&#x4F1A;&#x8C03;&#x7528;&#x6B64;&#x65B9;&#x6CD5;&#x3002;<br>&#x5F53;&#x8C03;&#x7528;map.addOverlay&#x65B9;&#x6CD5;&#x6DFB;&#x52A0;&#x81EA;&#x5B9A;&#x4E49;&#x8986;&#x76D6;&#x7269;&#x65F6;&#xFF0C;API&#x4F1A;&#x8C03;&#x7528;&#x8BE5;&#x5BF9;&#x8C61;&#x7684;initialize&#x65B9;&#x6CD5;&#x7528;&#x6765;&#x521D;&#x59CB;&#x5316;&#x8986;&#x76D6;&#x7269;&#xFF0C;&#x5728;&#x521D;&#x59CB;&#x5316;&#x8FC7;&#x7A0B;&#x4E2D;&#x9700;&#x8981;&#x521B;&#x5EFA;&#x8986;&#x76D6;&#x7269;&#x6240;&#x9700;&#x8981;&#x7684;DOM&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x6DFB;&#x52A0;&#x5230;&#x5730;&#x56FE;&#x76F8;&#x5E94;&#x7684;&#x5BB9;&#x5668;&#x4E2D;&#x3002;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x9009;&#x62E9;&#x6DFB;&#x52A0;&#x5728;&#x5BB9;&#x5668;markerPane&#x4E0A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5B9E;&#x73B0;&#x521D;&#x59CB;&#x5316;&#x65B9;&#x6CD5;  
SquareOverlay.prototype.initialize = function(map){
    // &#x4FDD;&#x5B58;map&#x5BF9;&#x8C61;&#x5B9E;&#x4F8B;
    his._map = map;
    // &#x521B;&#x5EFA;div&#x5143;&#x7D20;&#xFF0C;&#x4F5C;&#x4E3A;&#x81EA;&#x5B9A;&#x4E49;&#x8986;&#x76D6;&#x7269;&#x7684;&#x5BB9;&#x5668;
    var div = document.createElement(&quot;div&quot;);
    div.style.position = &quot;absolute&quot;;
    // &#x53EF;&#x4EE5;&#x6839;&#x636E;&#x53C2;&#x6570;&#x8BBE;&#x7F6E;&#x5143;&#x7D20;&#x5916;&#x89C2;
    div.style.width = this._length + &quot;px&quot;;
    div.style.height = this._length + &quot;px&quot;;
    div.style.background = this._color;
    // &#x5C06;div&#x6DFB;&#x52A0;&#x5230;&#x8986;&#x76D6;&#x7269;&#x5BB9;&#x5668;&#x4E2D;
    map.getPanes().markerPane.appendChild(div);
    // &#x4FDD;&#x5B58;div&#x5B9E;&#x4F8B;
    this._div = div;
    // &#x9700;&#x8981;&#x5C06;div&#x5143;&#x7D20;&#x4F5C;&#x4E3A;&#x65B9;&#x6CD5;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x5F53;&#x8C03;&#x7528;&#x8BE5;&#x8986;&#x76D6;&#x7269;&#x7684;show&#x3001;
    // hide&#x65B9;&#x6CD5;&#xFF0C;&#x6216;&#x8005;&#x5BF9;&#x8986;&#x76D6;&#x7269;&#x8FDB;&#x884C;&#x79FB;&#x9664;&#x65F6;&#xFF0C;API&#x90FD;&#x5C06;&#x64CD;&#x4F5C;&#x6B64;&#x5143;&#x7D20;&#x3002;
    return div;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">// &#x5B9E;&#x73B0;&#x521D;&#x59CB;&#x5316;&#x65B9;&#x6CD5;  
<span class="hljs-selector-tag">SquareOverlay</span><span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.initialize</span> = <span class="hljs-selector-tag">function</span>(<span class="hljs-selector-tag">map</span>){
    // &#x4FDD;&#x5B58;map&#x5BF9;&#x8C61;&#x5B9E;&#x4F8B;
    his._map = map;
    // &#x521B;&#x5EFA;div&#x5143;&#x7D20;&#xFF0C;&#x4F5C;&#x4E3A;&#x81EA;&#x5B9A;&#x4E49;&#x8986;&#x76D6;&#x7269;&#x7684;&#x5BB9;&#x5668;
    var div = document.createElement(&quot;div&quot;);
    div.style.position = &quot;absolute&quot;;
    // &#x53EF;&#x4EE5;&#x6839;&#x636E;&#x53C2;&#x6570;&#x8BBE;&#x7F6E;&#x5143;&#x7D20;&#x5916;&#x89C2;
    div.style.width = this._length + &quot;px&quot;;
    div.style.height = this._length + &quot;px&quot;;
    div.style.background = this._color;
    // &#x5C06;div&#x6DFB;&#x52A0;&#x5230;&#x8986;&#x76D6;&#x7269;&#x5BB9;&#x5668;&#x4E2D;
    map.getPanes().markerPane.appendChild(div);
    // &#x4FDD;&#x5B58;div&#x5B9E;&#x4F8B;
    this._div = div;
    // &#x9700;&#x8981;&#x5C06;div&#x5143;&#x7D20;&#x4F5C;&#x4E3A;&#x65B9;&#x6CD5;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x5F53;&#x8C03;&#x7528;&#x8BE5;&#x8986;&#x76D6;&#x7269;&#x7684;show&#x3001;
    // hide&#x65B9;&#x6CD5;&#xFF0C;&#x6216;&#x8005;&#x5BF9;&#x8986;&#x76D6;&#x7269;&#x8FDB;&#x884C;&#x79FB;&#x9664;&#x65F6;&#xFF0C;API&#x90FD;&#x5C06;&#x64CD;&#x4F5C;&#x6B64;&#x5143;&#x7D20;&#x3002;
    return div;
}</code></pre><p>3&#x3001;&#x7ED8;&#x5236;&#x8986;&#x76D6;&#x7269;</p><p>&#x5B9E;&#x73B0;draw&#x65B9;&#x6CD5;&#x3002;<br>&#x5230;&#x76EE;&#x524D;&#x4E3A;&#x6B62;&#xFF0C;&#x6211;&#x4EEC;&#x4EC5;&#x4EC5;&#x628A;&#x8986;&#x76D6;&#x7269;&#x6DFB;&#x52A0;&#x5230;&#x4E86;&#x5730;&#x56FE;&#x4E0A;&#xFF0C;&#x4F46;&#x662F;&#x5E76;&#x6CA1;&#x6709;&#x5C06;&#x5B83;&#x653E;&#x7F6E;&#x5728;&#x6B63;&#x786E;&#x7684;&#x4F4D;&#x7F6E;&#x4E0A;&#x3002;<br>&#x60A8;&#x9700;&#x8981;&#x5728;draw&#x65B9;&#x6CD5;&#x4E2D;&#x8BBE;&#x7F6E;&#x8986;&#x76D6;&#x7269;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x6BCF;&#x5F53;&#x5730;&#x56FE;&#x72B6;&#x6001;&#x53D1;&#x751F;&#x53D8;&#x5316;&#xFF08;&#x6BD4;&#x5982;&#xFF1A;&#x4F4D;&#x7F6E;&#x79FB;&#x52A8;&#x3001;&#x7EA7;&#x522B;&#x53D8;&#x5316;&#xFF09;&#x65F6;&#xFF0C;API&#x90FD;&#x4F1A;&#x8C03;&#x7528;&#x8986;&#x76D6;&#x7269;&#x7684;draw&#x65B9;&#x6CD5;&#xFF0C;&#x7528;&#x4E8E;&#x91CD;&#x65B0;&#x8BA1;&#x7B97;&#x8986;&#x76D6;&#x7269;&#x7684;&#x4F4D;&#x7F6E;&#x3002;<br>&#x901A;&#x8FC7;map.pointToOverlayPixel&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x5C06;&#x5730;&#x7406;&#x5750;&#x6807;&#x8F6C;&#x6362;&#x5230;&#x8986;&#x76D6;&#x7269;&#x7684;&#x6240;&#x9700;&#x8981;&#x7684;&#x50CF;&#x7D20;&#x5750;&#x6807;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5B9E;&#x73B0;&#x7ED8;&#x5236;&#x65B9;&#x6CD5;   
SquareOverlay.prototype.draw = function(){    
// &#x6839;&#x636E;&#x5730;&#x7406;&#x5750;&#x6807;&#x8F6C;&#x6362;&#x4E3A;&#x50CF;&#x7D20;&#x5750;&#x6807;&#xFF0C;&#x5E76;&#x8BBE;&#x7F6E;&#x7ED9;&#x5BB9;&#x5668;    
   var position = this._map.pointToOverlayPixel(this._center);    
   this._div.style.left = position.x - this._length / 2 + &quot;px&quot;;    
   this._div.style.top = position.y - this._length / 2 + &quot;px&quot;;    
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">// &#x5B9E;&#x73B0;&#x7ED8;&#x5236;&#x65B9;&#x6CD5;   
<span class="hljs-selector-tag">SquareOverlay</span><span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.draw</span> = <span class="hljs-selector-tag">function</span>(){    
// &#x6839;&#x636E;&#x5730;&#x7406;&#x5750;&#x6807;&#x8F6C;&#x6362;&#x4E3A;&#x50CF;&#x7D20;&#x5750;&#x6807;&#xFF0C;&#x5E76;&#x8BBE;&#x7F6E;&#x7ED9;&#x5BB9;&#x5668;    
   var position = this._map.pointToOverlayPixel(this._center);    
   this._div.style.left = position.x - this._length / 2 + &quot;px&quot;;    
   this._div.style.top = position.y - this._length / 2 + &quot;px&quot;;    
}</code></pre><p>4&#x3001;&#x79FB;&#x9664;&#x8986;&#x76D6;&#x7269;<br>&#x5F53;&#x8C03;&#x7528;map.removeOverlay&#x6216;&#x8005;map.clearOverlays&#x65B9;&#x6CD5;&#x65F6;&#xFF0C;API&#x4F1A;&#x81EA;&#x52A8;&#x5C06;initialize&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x7684;DOM&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x79FB;&#x9664;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="map.removeOverlay();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">map</span><span class="hljs-selector-class">.removeOverlay</span>();
</code></pre><p>5&#x3001;&#x6DFB;&#x52A0;&#x8986;&#x76D6;&#x7269;<br>&#x60A8;&#x73B0;&#x5728;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x8986;&#x76D6;&#x7269;&#x7684;&#x7F16;&#x5199;&#xFF0C;&#x53EF;&#x4EE5;&#x6DFB;&#x52A0;&#x5230;&#x5730;&#x56FE;&#x4E0A;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x521D;&#x59CB;&#x5316;&#x5730;&#x56FE;  
var map = new BMap.Map(&quot;container&quot;);    
var point = new BMap.Point(116.404, 39.915);    
map.centerAndZoom(point, 15);    
// &#x6DFB;&#x52A0;&#x81EA;&#x5B9A;&#x4E49;&#x8986;&#x76D6;&#x7269;   
var mySquare = new SquareOverlay(map.getCenter(), 100, &quot;red&quot;);    
map.addOverlay(mySquare);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">// &#x521D;&#x59CB;&#x5316;&#x5730;&#x56FE;  
<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">map</span> = <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">BMap</span><span class="hljs-selector-class">.Map</span>(&quot;<span class="hljs-selector-tag">container</span>&quot;);    
<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">point</span> = <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">BMap</span><span class="hljs-selector-class">.Point</span>(116<span class="hljs-selector-class">.404</span>, 39<span class="hljs-selector-class">.915</span>);    
<span class="hljs-selector-tag">map</span><span class="hljs-selector-class">.centerAndZoom</span>(<span class="hljs-selector-tag">point</span>, 15);    
// &#x6DFB;&#x52A0;&#x81EA;&#x5B9A;&#x4E49;&#x8986;&#x76D6;&#x7269;   
<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">mySquare</span> = <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">SquareOverlay</span>(<span class="hljs-selector-tag">map</span><span class="hljs-selector-class">.getCenter</span>(), 100, &quot;<span class="hljs-selector-tag">red</span>&quot;);    
<span class="hljs-selector-tag">map</span><span class="hljs-selector-class">.addOverlay</span>(<span class="hljs-selector-tag">mySquare</span>);</code></pre><ul><li>&#x5982;&#x4F55;&#x7ED9;&#x5730;&#x56FE;&#x6DFB;&#x52A0;&#x81EA;&#x5B9A;&#x4E49;&#x5B9A;&#x4F4D;&#x63A7;&#x4EF6;&#x5E76;&#x66F4;&#x6362;&#x63A7;&#x4EF6;&#x7684;&#x56FE;&#x6807;&#xFF1B;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000016433387" src="https://static.alili.tech/img/remote/1460000016433387" alt="" title="" style="cursor:pointer"></span></p><p>&#x7ED9;&#x5730;&#x56FE;&#x6DFB;&#x52A0;&#x81EA;&#x5B9A;&#x4E49;&#x63A7;&#x4EF6;&#xFF0C;&#x9700;&#x8981;&#x7528;&#x5230;&#x63A7;&#x4EF6;&#x7C7B;&#xFF1A;ZoomControl&#xFF0C;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="addControlLocation(){
    var that = this;
    // &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x63A7;&#x4EF6;&#x7C7B;&#xFF0C;&#x5373;function    
    function ZoomControl(){    
        // &#x8BBE;&#x7F6E;&#x9ED8;&#x8BA4;&#x505C;&#x9760;&#x4F4D;&#x7F6E;&#x548C;&#x504F;&#x79FB;&#x91CF;  
        this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;    
        this.defaultOffset = new BMap.Size(20, 50);    
    }    
    // &#x901A;&#x8FC7;JavaScript&#x7684;prototype&#x5C5E;&#x6027;&#x7EE7;&#x627F;&#x4E8E;BMap.Control   
    ZoomControl.prototype = new BMap.Control();
    ZoomControl.prototype.initialize = function(map){    
        // &#x521B;&#x5EFA;&#x4E00;&#x4E2A;DOM&#x5143;&#x7D20;   
        var img = document.createElement(&quot;img&quot;);    
        img.setAttribute(&apos;src&apos;,that.locationImg)
        // &#x8BBE;&#x7F6E;&#x6837;&#x5F0F;    
        img.style.cursor = &quot;pointer&quot;;
        // &#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#xFF0C;&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x57CE;&#x5E02;    
        img.onclick = function(e){...   }    
        // &#x6DFB;&#x52A0;DOM&#x5143;&#x7D20;&#x5230;&#x5730;&#x56FE;&#x4E2D;   
        map.getContainer().appendChild(img);    
        // &#x5C06;DOM&#x5143;&#x7D20;&#x8FD4;&#x56DE;  
        return img;    
    }
    // &#x521B;&#x5EFA;&#x63A7;&#x4EF6;&#x5B9E;&#x4F8B;    
    var myZoomCtrl = new ZoomControl();    
    // &#x6DFB;&#x52A0;&#x5230;&#x5730;&#x56FE;&#x5F53;&#x4E2D;    
    this.mp.addControl(myZoomCtrl);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">addControlLocation</span>(){
    var that = this;
    // &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x63A7;&#x4EF6;&#x7C7B;&#xFF0C;&#x5373;function    
    function ZoomControl(){    
        // &#x8BBE;&#x7F6E;&#x9ED8;&#x8BA4;&#x505C;&#x9760;&#x4F4D;&#x7F6E;&#x548C;&#x504F;&#x79FB;&#x91CF;  
        this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;    
        this.defaultOffset = new BMap.Size(20, 50);    
    }    
    // &#x901A;&#x8FC7;<span class="hljs-selector-tag">JavaScript</span>&#x7684;<span class="hljs-selector-tag">prototype</span>&#x5C5E;&#x6027;&#x7EE7;&#x627F;&#x4E8E;<span class="hljs-selector-tag">BMap</span><span class="hljs-selector-class">.Control</span>   
    <span class="hljs-selector-tag">ZoomControl</span><span class="hljs-selector-class">.prototype</span> = <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">BMap</span><span class="hljs-selector-class">.Control</span>();
    <span class="hljs-selector-tag">ZoomControl</span><span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.initialize</span> = <span class="hljs-selector-tag">function</span>(<span class="hljs-selector-tag">map</span>){    
        // &#x521B;&#x5EFA;&#x4E00;&#x4E2A;DOM&#x5143;&#x7D20;   
        var img = document.createElement(&quot;img&quot;);    
        img.setAttribute(&apos;src&apos;,that.locationImg)
        // &#x8BBE;&#x7F6E;&#x6837;&#x5F0F;    
        img.style.cursor = &quot;pointer&quot;;
        // &#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#xFF0C;&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x57CE;&#x5E02;    
        img.onclick = function(e){...   }    
        // &#x6DFB;&#x52A0;<span class="hljs-selector-tag">DOM</span>&#x5143;&#x7D20;&#x5230;&#x5730;&#x56FE;&#x4E2D;   
        <span class="hljs-selector-tag">map</span><span class="hljs-selector-class">.getContainer</span>()<span class="hljs-selector-class">.appendChild</span>(<span class="hljs-selector-tag">img</span>);    
        // &#x5C06;<span class="hljs-selector-tag">DOM</span>&#x5143;&#x7D20;&#x8FD4;&#x56DE;  
        <span class="hljs-selector-tag">return</span> <span class="hljs-selector-tag">img</span>;    
    }
    // &#x521B;&#x5EFA;&#x63A7;&#x4EF6;&#x5B9E;&#x4F8B;    
    <span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">myZoomCtrl</span> = <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">ZoomControl</span>();    
    // &#x6DFB;&#x52A0;&#x5230;&#x5730;&#x56FE;&#x5F53;&#x4E2D;    
    <span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.mp</span><span class="hljs-selector-class">.addControl</span>(<span class="hljs-selector-tag">myZoomCtrl</span>);
}</code></pre><p>&#x5728;&#x5730;&#x56FE;&#x521D;&#x59CB;&#x5316;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x8C03;&#x7528;addControlLocation()&#x65B9;&#x6CD5;&#x5373;&#x53EF;&#xFF1B;</p><ul><li>&#x6DFB;&#x52A0;&#x81EA;&#x5B9A;&#x4E49; &#x5F53;&#x524D;&#x4F4D;&#x7F6E;&#x5B9A;&#x4F4D;&#x6807;&#x6CE8;</li></ul><p>&#x5982;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016433388?w=244&amp;h=146" src="https://static.alili.tech/img/remote/1460000016433388?w=244&amp;h=146" alt="" title="" style="cursor:pointer"></span></p><p>&#x9700;&#x8981;&#x7528;&#x5230;new BMap.Marker();&#x8BBE;&#x7F6E;&#x56FE;&#x6807;&#x5927;&#x5C0F;&#x7528; myIcon.setImageSize();</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="addCurrentMarker(){ // &#x6DFB;&#x52A0;&#x81EA;&#x5B9A;&#x4E49; &#x5F53;&#x524D;&#x4F4D;&#x7F6E;&#x5B9A;&#x4F4D;&#x6807;&#x6CE8;
           var myIcon = new BMap.Icon(this.redLocation,{
               offset: new BMap.Size(10, 25), // &#x6307;&#x5B9A;&#x5B9A;&#x4F4D;&#x4F4D;&#x7F6E;
               imageOffset: new BMap.Size(0, 0 - 10 * 25) // &#x8BBE;&#x7F6E;&#x56FE;&#x7247;&#x504F;&#x79FB;
           });
           // myIcon.setStyle({width: &apos;.666rem&apos;, height: &apos;.666rem&apos;});
           myIcon.setImageSize(new BMap.Size(60,60)); // &#x8BBE;&#x7F6E; &#x56FE;&#x6807;&#x5927;&#x5C0F;
           let point = new BMap.Point(this.currentPoint.lng,this.currentPoint.lat);  //  &#x6807;&#x6CE8;&#x7684;&#x4E2D;&#x5FC3;&#x70B9;&#xFF0C;&#x5E94;&#x8BE5;&#x662F;&#x59CB;&#x7EC8;&#x662F;&#x7528;&#x6237;&#x5F53;&#x524D;&#x4F4D;&#x7F6E;
           let marker = new BMap.Marker(point,{icon:myIcon});  // &#x521B;&#x5EFA;Marker&#x6807;&#x6CE8;
           this.mp.addOverlay(marker);  // &#x6DFB;&#x52A0;&#x5F53;&#x524D;&#x5B9A;&#x4F4D;&#x70B9;
       }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">addCurrentMarker</span>(){ // &#x6DFB;&#x52A0;&#x81EA;&#x5B9A;&#x4E49; &#x5F53;&#x524D;&#x4F4D;&#x7F6E;&#x5B9A;&#x4F4D;&#x6807;&#x6CE8;
           var myIcon = new BMap.Icon(this.redLocation,{
               <span class="hljs-attribute">offset</span>: new BMap.<span class="hljs-built_in">Size</span>(10, 25), // &#x6307;&#x5B9A;&#x5B9A;&#x4F4D;&#x4F4D;&#x7F6E;
               imageOffset: new BMap.<span class="hljs-built_in">Size</span>(0, 0 - 10 * 25) // &#x8BBE;&#x7F6E;&#x56FE;&#x7247;&#x504F;&#x79FB;
           });
           // <span class="hljs-selector-tag">myIcon</span><span class="hljs-selector-class">.setStyle</span>({<span class="hljs-attribute">width</span>: <span class="hljs-string">&apos;.666rem&apos;</span>, height: <span class="hljs-string">&apos;.666rem&apos;</span>});
           <span class="hljs-selector-tag">myIcon</span><span class="hljs-selector-class">.setImageSize</span>(<span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">BMap</span><span class="hljs-selector-class">.Size</span>(60,60)); // &#x8BBE;&#x7F6E; &#x56FE;&#x6807;&#x5927;&#x5C0F;
           <span class="hljs-selector-tag">let</span> <span class="hljs-selector-tag">point</span> = <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">BMap</span><span class="hljs-selector-class">.Point</span>(<span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.currentPoint</span><span class="hljs-selector-class">.lng</span>,<span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.currentPoint</span><span class="hljs-selector-class">.lat</span>);  //  &#x6807;&#x6CE8;&#x7684;&#x4E2D;&#x5FC3;&#x70B9;&#xFF0C;&#x5E94;&#x8BE5;&#x662F;&#x59CB;&#x7EC8;&#x662F;&#x7528;&#x6237;&#x5F53;&#x524D;&#x4F4D;&#x7F6E;
           <span class="hljs-selector-tag">let</span> <span class="hljs-selector-tag">marker</span> = <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">BMap</span><span class="hljs-selector-class">.Marker</span>(<span class="hljs-selector-tag">point</span>,{<span class="hljs-attribute">icon</span>:myIcon});  // &#x521B;&#x5EFA;<span class="hljs-selector-tag">Marker</span>&#x6807;&#x6CE8;
           <span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.mp</span><span class="hljs-selector-class">.addOverlay</span>(<span class="hljs-selector-tag">marker</span>);  // &#x6DFB;&#x52A0;&#x5F53;&#x524D;&#x5B9A;&#x4F4D;&#x70B9;
       },</code></pre><ul><li>&#x51E0;&#x4E2A;&#x5E38;&#x7528;&#x7684;api(&#x5730;&#x56FE;&#x7F29;&#x653E;&#xFF0C;&#x62D6;&#x62FD;&#xFF0C;&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x4F4D;&#x7F6E;)&#x7B49;&#x529F;&#x80FD;&#x7684;&#x5B9E;&#x73B0;&#xFF1B;</li></ul><ol><li><p>&#x5730;&#x56FE;&#x8868;&#x9762;&#x89E6;&#x53D1;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.mp.addEventListener(&quot;touchstart&quot;, () =&gt; {}&#xFF09;&#xFF1B;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css" style="word-break:break-word;white-space:initial"><span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.mp</span><span class="hljs-selector-class">.addEventListener</span>(&quot;<span class="hljs-selector-tag">touchstart</span>&quot;, () =&gt; {}&#xFF09;&#xFF1B;</code></pre></li><li><p>&#x5730;&#x56FE;&#x7F29;&#x653E;&#x4E8B;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.mp.addEventListener(&quot;zoomend&quot;, () =&gt; {}&#xFF09;&#xFF1B;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css" style="word-break:break-word;white-space:initial"><span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.mp</span><span class="hljs-selector-class">.addEventListener</span>(&quot;<span class="hljs-selector-tag">zoomend</span>&quot;, () =&gt; {}&#xFF09;&#xFF1B;</code></pre></li><li>&#x5730;&#x56FE;&#x62D6;&#x62FD;&#x4E8B;&#x4EF6;&#xFF1A;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.mp.addEventListener(&quot;dragstart&quot;,()=&gt;{}&#xFF09;&#xFF1B;
this.mp.addEventListener(&quot;dragend&quot;,()=&gt;{}&#xFF09;&#xFF1B;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.mp</span><span class="hljs-selector-class">.addEventListener</span>(&quot;<span class="hljs-selector-tag">dragstart</span>&quot;,()=&gt;{}&#xFF09;&#xFF1B;
<span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.mp</span><span class="hljs-selector-class">.addEventListener</span>(&quot;<span class="hljs-selector-tag">dragend</span>&quot;,()=&gt;{}&#xFF09;&#xFF1B;</code></pre><ol><li>&#x83B7;&#x53D6;&#x7528;&#x6237;&#x5F53;&#x524D;&#x4F4D;&#x7F6E;(&#x7ECF;&#x7EAC;&#x5EA6;&#x5BF9;&#x8C61;)&#xFF1A;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function getLocationData(fn) {
    let geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            fn(r.point);
        }
    });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">function</span> <span class="hljs-selector-tag">getLocationData</span>(<span class="hljs-selector-tag">fn</span>) {
    let geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            fn(r.point);
        }
    });
}</code></pre><ol><li>&#x6839;&#x636E;&#x7ECF;&#x7EAC;&#x5EA6;&#x89E3;&#x6790;&#x5730;&#x5740;&#x4FE1;&#x606F;&#xFF0C;&#x5206;&#x522B;&#x8FD4;&#x56DE;&#x7701;&#x5E02;&#x533A;&#x8857;&#x7B49;:</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let gc = new BMap.Geocoder();//Geocoder&#x5730;&#x5740;&#x7F16;&#x7801;
gc.getLocation(item, function (rs) {   //getLocation&#x51FD;&#x6570;&#x7528;&#x6765;&#x89E3;&#x6790;&#x5730;&#x5740;&#x4FE1;&#x606F;&#xFF0C;&#x5206;&#x522B;&#x8FD4;&#x56DE;&#x7701;&#x5E02;&#x533A;&#x8857;&#x7B49; r.point&#x91CC;&#x6709;&#x7ECF;&#x7EAC;&#x5EA6;
        let addComp = rs.addressComponents;
        let province = addComp.province;//&#x83B7;&#x53D6;&#x7701;&#x4EFD;
        let city = addComp.city;//&#x83B7;&#x53D6;&#x57CE;&#x5E02;
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">let</span> <span class="hljs-selector-tag">gc</span> = <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">BMap</span><span class="hljs-selector-class">.Geocoder</span>();//<span class="hljs-selector-tag">Geocoder</span>&#x5730;&#x5740;&#x7F16;&#x7801;
<span class="hljs-selector-tag">gc</span><span class="hljs-selector-class">.getLocation</span>(<span class="hljs-selector-tag">item</span>, <span class="hljs-selector-tag">function</span> (<span class="hljs-selector-tag">rs</span>) {   //getLocation&#x51FD;&#x6570;&#x7528;&#x6765;&#x89E3;&#x6790;&#x5730;&#x5740;&#x4FE1;&#x606F;&#xFF0C;&#x5206;&#x522B;&#x8FD4;&#x56DE;&#x7701;&#x5E02;&#x533A;&#x8857;&#x7B49; r.point&#x91CC;&#x6709;&#x7ECF;&#x7EAC;&#x5EA6;
        let addComp = rs.addressComponents;
        let province = addComp.province;//&#x83B7;&#x53D6;&#x7701;&#x4EFD;
        let city = addComp.city;//&#x83B7;&#x53D6;&#x57CE;&#x5E02;
});</code></pre><p>&#x9879;&#x76EE;&#x5B9E;&#x8DF5;&#xFF1A;&#x57FA;&#x4E8E;<a href="https://juejin.im/post/5a3f223351882506e50cda5c" rel="nofollow noreferrer" target="_blank">vue2.0 +vuex+ element-ui</a>&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x7CFB;&#x7EDF;</p><p>&#x6B22;&#x8FCE;&#x52A0;&#x5165;&#x8BA8;&#x8BBA;&#x7EC4;&#xFF0C;&#x4E00;&#x8D77;&#x6765;&#x5B66;&#x4E60;&#x7528;<a href="https://juejin.im/post/5a3f223351882506e50cda5c" rel="nofollow noreferrer" target="_blank">vue,vuex,element,express,mongodb</a>&#x6765;&#x6784;&#x5EFA;&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x7CFB;&#x7EDF;&#xFF1B;</p><p>&#x4E00;&#x8D77;&#x6765;&#x7528;&#x9879;&#x76EE;&#x5B9E;&#x6218;&#x52A0;&#x6DF1;&#x81EA;&#x5DF1;&#x5BF9;&#x77E5;&#x8BC6;&#x7684;&#x7406;&#x89E3;&#x3002;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
干货分享：vue2.0做移动端开发用到的相关插件和经验总结

## 原文链接
[https://segmentfault.com/a/1190000016433381](https://segmentfault.com/a/1190000016433381)

