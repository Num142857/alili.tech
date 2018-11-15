---
title: 实现移动端上拉加载和下拉刷新的vue插件(mescroll.js)
hidden: true
categories: reprint
slug: e694032e
date: 2018-11-10 02:30:09
---

{{< raw >}}
<blockquote>&#x505A;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x79FB;&#x52A8;&#x7AEF;&#x5C55;&#x793A;&#x9879;&#x76EE;&#xFF0C;&#x540E;&#x53F0;&#x5206;&#x9875;&#x540E;&#x524D;&#x7AEF;&#x52A0;&#x8F7D;&#xFF0C;&#x5B9E;&#x73B0;&#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x4E0B;&#x4E00;&#x9875;&#xFF0C;&#x627E;&#x4E86;&#x4E0B;&#xFF0C;&#x8FD8;&#x662F;&#x7528;&#x8FD9;&#x4E2A;mescroll.js&#x63D2;&#x4EF6;&#x597D;&#x4E00;&#x70B9;</blockquote><h1 id="articleHeader0">1.npm&#x5B89;&#x88C5;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save mescroll.js   //&#x4E0D;&#x8981;&#x4F7F;&#x7528;cnpm&#x5B89;&#x88C5;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">npm install --save mescroll<span class="hljs-selector-class">.js</span>   <span class="hljs-comment">//&#x4E0D;&#x8981;&#x4F7F;&#x7528;cnpm&#x5B89;&#x88C5;</span></code></pre><ul><li>&#x5BFC;&#x5165;(&#x5728;&#x54EA;&#x4E2A;&#x9875;&#x9762;&#x4F7F;&#x7528;,&#x5219;&#x5728;&#x54EA;&#x4E2A;&#x9875;&#x9762;&#x5BFC;&#x5165;(&#x8FD9;&#x91CC;&#x7684;&#x8BDD;&#xFF0C;&#x6211;&#x4F7F;&#x7528;&#x5168;&#x5C40;&#x5BFC;&#x5165;&#x4F1A;&#x51FA;&#x73B0;&#x95EE;&#x9898;,&#x82E5;&#x6709;&#x9519;,&#x8FD8;&#x8BF7;&#x5927;&#x5BB6;&#x6307;&#x51FA;,&#x6682;&#x65F6;&#x60F3;&#x5230;&#x7684;&#x5C31;&#x662F;&#x5C40;&#x90E8;&#x5F15;&#x5165;))&#xFF1A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import MescrollVue from &#x2018;mescroll.js/mescroll.vue&#x2019;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs capnproto"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">import</span> MescrollVue <span class="hljs-keyword">from</span> &#x2018;mescroll.js/mescroll.vue&#x2019;</code></pre><ul><li>&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#xFF1A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="components: {
    MescrollVue // &#x6CE8;&#x518C;mescroll&#x7EC4;&#x4EF6;
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code><span class="hljs-symbol">components:</span> {
    MescrollVue <span class="hljs-comment">// &#x6CE8;&#x518C;mescroll&#x7EC4;&#x4EF6;</span>
},</code></pre><ul><li>template&#x4F7F;&#x7528;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;mescroll-vue ref=&quot;mescroll&quot; :down=&quot;mescrollDown&quot; :up=&quot;mescrollUp&quot; @init=&quot;mescrollInit&quot; class=&quot;scrollView&quot;&gt;&lt;/mescroll-vue&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code style="word-break:break-word;white-space:initial">&lt;mescroll-vue <span class="hljs-keyword">ref</span>=<span class="hljs-string">&quot;mescroll&quot;</span> :down=<span class="hljs-string">&quot;mescrollDown&quot;</span> :up=<span class="hljs-string">&quot;mescrollUp&quot;</span> @init=<span class="hljs-string">&quot;mescrollInit&quot;</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;scrollView&quot;</span>&gt;&lt;/mescroll-vue&gt;</code></pre><h1 id="articleHeader1">2.data&#x91CC;&#x8FDB;&#x884C;&#x76F8;&#x5173;&#x914D;&#x7F6E;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data () {
  return {
    mescroll: null, // mescroll&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;
    mescrollDown:{}, //&#x4E0B;&#x62C9;&#x5237;&#x65B0;&#x7684;&#x914D;&#x7F6E;. (&#x5982;&#x679C;&#x4E0B;&#x62C9;&#x5237;&#x65B0;&#x548C;&#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x5904;&#x7406;&#x7684;&#x903B;&#x8F91;&#x662F;&#x4E00;&#x6837;&#x7684;,&#x5219;mescrollDown&#x53EF;&#x4E0D;&#x7528;&#x5199;&#x4E86;)
    mescrollUp: { // &#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x7684;&#x914D;&#x7F6E;.
        callback: this.upCallback, // &#x4E0A;&#x62C9;&#x56DE;&#x8C03;,&#x6B64;&#x5904;&#x7B80;&#x5199;; &#x76F8;&#x5F53;&#x4E8E; callback: function(page, mescroll) { }
        //&#x4EE5;&#x4E0B;&#x662F;&#x4E00;&#x4E9B;&#x5E38;&#x7528;&#x7684;&#x914D;&#x7F6E;,&#x5F53;&#x7136;&#x4E0D;&#x5199;&#x4E5F;&#x53EF;&#x4EE5;&#x7684;.
        page: {
           num: 0, //&#x5F53;&#x524D;&#x9875; &#x9ED8;&#x8BA4;0,&#x56DE;&#x8C03;&#x4E4B;&#x524D;&#x4F1A;&#x52A0;1; &#x5373;callback(page)&#x4F1A;&#x4ECE;1&#x5F00;&#x59CB;
           size: 10 //&#x6BCF;&#x9875;&#x6570;&#x636E;&#x6761;&#x6570;,&#x9ED8;&#x8BA4;10
        },
        noMoreSize: 5, //&#x5982;&#x679C;&#x5217;&#x8868;&#x5DF2;&#x65E0;&#x6570;&#x636E;,&#x53EF;&#x8BBE;&#x7F6E;&#x5217;&#x8868;&#x7684;&#x603B;&#x6570;&#x91CF;&#x8981;&#x5927;&#x4E8E;5&#x624D;&#x663E;&#x793A;&#x65E0;&#x66F4;&#x591A;&#x6570;&#x636E;;&#x907F;&#x514D;&#x5217;&#x8868;&#x6570;&#x636E;&#x8FC7;&#x5C11;(&#x6BD4;&#x5982;&#x53EA;&#x6709;&#x4E00;&#x6761;&#x6570;&#x636E;),&#x663E;&#x793A;&#x65E0;&#x66F4;&#x591A;&#x6570;&#x636E;&#x4F1A;&#x4E0D;&#x597D;&#x770B;
        toTop: {
            //&#x56DE;&#x5230;&#x9876;&#x90E8;&#x6309;&#x94AE;
            src: &quot;./static/mescroll/mescroll-totop.png&quot;, //&#x56FE;&#x7247;&#x8DEF;&#x5F84;,&#x9ED8;&#x8BA4;null,&#x652F;&#x6301;&#x7F51;&#x7EDC;&#x56FE;
            offset: 1000 //&#x5217;&#x8868;&#x6EDA;&#x52A8;1000px&#x624D;&#x663E;&#x793A;&#x56DE;&#x5230;&#x9876;&#x90E8;&#x6309;&#x94AE;
        },
        htmlContent: &apos;&lt;p class=&quot;downwarp-progress&quot;&gt;&lt;/p&gt;&lt;p class=&quot;downwarp-tip&quot;&gt;&#x4E0B;&#x62C9;&#x5237;&#x65B0; &lt;/p&gt;&apos;, //&#x5E03;&#x5C40;&#x5185;&#x5BB9;
        empty: {
           //&#x5217;&#x8868;&#x7B2C;&#x4E00;&#x9875;&#x65E0;&#x4EFB;&#x4F55;&#x6570;&#x636E;&#x65F6;,&#x663E;&#x793A;&#x7684;&#x7A7A;&#x63D0;&#x793A;&#x5E03;&#x5C40;; &#x9700;&#x914D;&#x7F6E;warpId&#x624D;&#x663E;&#x793A;
           warpId: &quot;xxid&quot;, //&#x7236;&#x5E03;&#x5C40;&#x7684;id (1.3.5&#x7248;&#x672C;&#x652F;&#x6301;&#x4F20;&#x5165;dom&#x5143;&#x7D20;)
           icon: &quot;./static/mescroll/mescroll-empty.png&quot;, //&#x56FE;&#x6807;,&#x9ED8;&#x8BA4;null,&#x652F;&#x6301;&#x7F51;&#x7EDC;&#x56FE;
           tip: &quot;&#x6682;&#x65E0;&#x76F8;&#x5173;&#x6570;&#x636E;~&quot; //&#x63D0;&#x793A;
        }
   },
   articleList: [] // &#x5217;&#x8868;&#x6570;&#x636E;
 }
},
beforeRouteEnter (to, from, next) { // &#x5982;&#x679C;&#x6CA1;&#x6709;&#x914D;&#x7F6E;&#x56DE;&#x5230;&#x9876;&#x90E8;&#x6309;&#x94AE;&#x6216;isBounce,&#x5219;beforeRouteEnter&#x4E0D;&#x7528;&#x5199;
   next(vm =&gt; {
      vm.$refs.mescroll.beforeRouteEnter() // &#x8FDB;&#x5165;&#x8DEF;&#x7531;&#x65F6;,&#x6EDA;&#x52A8;&#x5230;&#x539F;&#x6765;&#x7684;&#x5217;&#x8868;&#x4F4D;&#x7F6E;,&#x6062;&#x590D;&#x56DE;&#x5230;&#x9876;&#x90E8;&#x6309;&#x94AE;&#x548C;isBounce&#x7684;&#x914D;&#x7F6E;
   })
},
beforeRouteLeave (to, from, next) { // &#x5982;&#x679C;&#x6CA1;&#x6709;&#x914D;&#x7F6E;&#x56DE;&#x5230;&#x9876;&#x90E8;&#x6309;&#x94AE;&#x6216;isBounce,&#x5219;beforeRouteLeave&#x4E0D;&#x7528;&#x5199;
   this.$refs.mescroll.beforeRouteLeave() // &#x9000;&#x51FA;&#x8DEF;&#x7531;&#x65F6;,&#x8BB0;&#x5F55;&#x5217;&#x8868;&#x6EDA;&#x52A8;&#x7684;&#x4F4D;&#x7F6E;,&#x9690;&#x85CF;&#x56DE;&#x5230;&#x9876;&#x90E8;&#x6309;&#x94AE;&#x548C;isBounce&#x7684;&#x914D;&#x7F6E;
   next()
},
methods: {
  mescrollInit(mescroll) {
     this.mescroll = mescroll;
  },
  upCallback(page, mescroll) {
    this.$Request({
       url: &quot;&quot;,
       method: &quot;get&quot;,
       data: {
         page: page.num
       },
       success: res =&gt; {
         if (res.status == 1) {
           let data = page.num == 1 ? [] : this.articleList;
           data.push(...res.result.data);
           this.articleList = data;
           // &#x6570;&#x636E;&#x6E32;&#x67D3;&#x6210;&#x529F;&#x540E;,&#x9690;&#x85CF;&#x4E0B;&#x62C9;&#x5237;&#x65B0;&#x7684;&#x72B6;&#x6001;
           this.$nextTick(() =&gt; {
              mescroll.endSuccess(res.result.data.length);
           });
         }
       }
    });
  }
 }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-keyword">data</span> () {
  <span class="hljs-keyword">return</span> {
    mescroll: <span class="hljs-literal">null</span>, <span class="hljs-comment">// mescroll&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;</span>
    mescrollDown:{}, <span class="hljs-comment">//&#x4E0B;&#x62C9;&#x5237;&#x65B0;&#x7684;&#x914D;&#x7F6E;. (&#x5982;&#x679C;&#x4E0B;&#x62C9;&#x5237;&#x65B0;&#x548C;&#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x5904;&#x7406;&#x7684;&#x903B;&#x8F91;&#x662F;&#x4E00;&#x6837;&#x7684;,&#x5219;mescrollDown&#x53EF;&#x4E0D;&#x7528;&#x5199;&#x4E86;)</span>
    mescrollUp: { <span class="hljs-comment">// &#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x7684;&#x914D;&#x7F6E;.</span>
        callback: <span class="hljs-keyword">this</span>.upCallback, <span class="hljs-comment">// &#x4E0A;&#x62C9;&#x56DE;&#x8C03;,&#x6B64;&#x5904;&#x7B80;&#x5199;; &#x76F8;&#x5F53;&#x4E8E; callback: function(page, mescroll) { }</span>
        <span class="hljs-comment">//&#x4EE5;&#x4E0B;&#x662F;&#x4E00;&#x4E9B;&#x5E38;&#x7528;&#x7684;&#x914D;&#x7F6E;,&#x5F53;&#x7136;&#x4E0D;&#x5199;&#x4E5F;&#x53EF;&#x4EE5;&#x7684;.</span>
        page: {
           num: <span class="hljs-number">0</span>, <span class="hljs-comment">//&#x5F53;&#x524D;&#x9875; &#x9ED8;&#x8BA4;0,&#x56DE;&#x8C03;&#x4E4B;&#x524D;&#x4F1A;&#x52A0;1; &#x5373;callback(page)&#x4F1A;&#x4ECE;1&#x5F00;&#x59CB;</span>
           size: <span class="hljs-number">10</span> <span class="hljs-comment">//&#x6BCF;&#x9875;&#x6570;&#x636E;&#x6761;&#x6570;,&#x9ED8;&#x8BA4;10</span>
        },
        noMoreSize: <span class="hljs-number">5</span>, <span class="hljs-comment">//&#x5982;&#x679C;&#x5217;&#x8868;&#x5DF2;&#x65E0;&#x6570;&#x636E;,&#x53EF;&#x8BBE;&#x7F6E;&#x5217;&#x8868;&#x7684;&#x603B;&#x6570;&#x91CF;&#x8981;&#x5927;&#x4E8E;5&#x624D;&#x663E;&#x793A;&#x65E0;&#x66F4;&#x591A;&#x6570;&#x636E;;&#x907F;&#x514D;&#x5217;&#x8868;&#x6570;&#x636E;&#x8FC7;&#x5C11;(&#x6BD4;&#x5982;&#x53EA;&#x6709;&#x4E00;&#x6761;&#x6570;&#x636E;),&#x663E;&#x793A;&#x65E0;&#x66F4;&#x591A;&#x6570;&#x636E;&#x4F1A;&#x4E0D;&#x597D;&#x770B;</span>
        toTop: {
            <span class="hljs-comment">//&#x56DE;&#x5230;&#x9876;&#x90E8;&#x6309;&#x94AE;</span>
            src: <span class="hljs-string">&quot;./static/mescroll/mescroll-totop.png&quot;</span>, <span class="hljs-comment">//&#x56FE;&#x7247;&#x8DEF;&#x5F84;,&#x9ED8;&#x8BA4;null,&#x652F;&#x6301;&#x7F51;&#x7EDC;&#x56FE;</span>
            offset: <span class="hljs-number">1000</span> <span class="hljs-comment">//&#x5217;&#x8868;&#x6EDA;&#x52A8;1000px&#x624D;&#x663E;&#x793A;&#x56DE;&#x5230;&#x9876;&#x90E8;&#x6309;&#x94AE;</span>
        },
        htmlContent: <span class="hljs-string">&apos;&lt;p class=&quot;downwarp-progress&quot;&gt;&lt;/p&gt;&lt;p class=&quot;downwarp-tip&quot;&gt;&#x4E0B;&#x62C9;&#x5237;&#x65B0; &lt;/p&gt;&apos;</span>, <span class="hljs-comment">//&#x5E03;&#x5C40;&#x5185;&#x5BB9;</span>
        empty: {
           <span class="hljs-comment">//&#x5217;&#x8868;&#x7B2C;&#x4E00;&#x9875;&#x65E0;&#x4EFB;&#x4F55;&#x6570;&#x636E;&#x65F6;,&#x663E;&#x793A;&#x7684;&#x7A7A;&#x63D0;&#x793A;&#x5E03;&#x5C40;; &#x9700;&#x914D;&#x7F6E;warpId&#x624D;&#x663E;&#x793A;</span>
           warpId: <span class="hljs-string">&quot;xxid&quot;</span>, <span class="hljs-comment">//&#x7236;&#x5E03;&#x5C40;&#x7684;id (1.3.5&#x7248;&#x672C;&#x652F;&#x6301;&#x4F20;&#x5165;dom&#x5143;&#x7D20;)</span>
           icon: <span class="hljs-string">&quot;./static/mescroll/mescroll-empty.png&quot;</span>, <span class="hljs-comment">//&#x56FE;&#x6807;,&#x9ED8;&#x8BA4;null,&#x652F;&#x6301;&#x7F51;&#x7EDC;&#x56FE;</span>
           tip: <span class="hljs-string">&quot;&#x6682;&#x65E0;&#x76F8;&#x5173;&#x6570;&#x636E;~&quot;</span> <span class="hljs-comment">//&#x63D0;&#x793A;</span>
        }
   },
   articleList: [] <span class="hljs-comment">// &#x5217;&#x8868;&#x6570;&#x636E;</span>
 }
},
beforeRouteEnter (to, from, next) { <span class="hljs-comment">// &#x5982;&#x679C;&#x6CA1;&#x6709;&#x914D;&#x7F6E;&#x56DE;&#x5230;&#x9876;&#x90E8;&#x6309;&#x94AE;&#x6216;isBounce,&#x5219;beforeRouteEnter&#x4E0D;&#x7528;&#x5199;</span>
   next(vm =&gt; {
      vm.$refs.mescroll.beforeRouteEnter() <span class="hljs-comment">// &#x8FDB;&#x5165;&#x8DEF;&#x7531;&#x65F6;,&#x6EDA;&#x52A8;&#x5230;&#x539F;&#x6765;&#x7684;&#x5217;&#x8868;&#x4F4D;&#x7F6E;,&#x6062;&#x590D;&#x56DE;&#x5230;&#x9876;&#x90E8;&#x6309;&#x94AE;&#x548C;isBounce&#x7684;&#x914D;&#x7F6E;</span>
   })
},
beforeRouteLeave (to, from, next) { <span class="hljs-comment">// &#x5982;&#x679C;&#x6CA1;&#x6709;&#x914D;&#x7F6E;&#x56DE;&#x5230;&#x9876;&#x90E8;&#x6309;&#x94AE;&#x6216;isBounce,&#x5219;beforeRouteLeave&#x4E0D;&#x7528;&#x5199;</span>
   <span class="hljs-keyword">this</span>.$refs.mescroll.beforeRouteLeave() <span class="hljs-comment">// &#x9000;&#x51FA;&#x8DEF;&#x7531;&#x65F6;,&#x8BB0;&#x5F55;&#x5217;&#x8868;&#x6EDA;&#x52A8;&#x7684;&#x4F4D;&#x7F6E;,&#x9690;&#x85CF;&#x56DE;&#x5230;&#x9876;&#x90E8;&#x6309;&#x94AE;&#x548C;isBounce&#x7684;&#x914D;&#x7F6E;</span>
   next()
},
methods: {
  mescrollInit(mescroll) {
     <span class="hljs-keyword">this</span>.mescroll = mescroll;
  },
  upCallback(page, mescroll) {
    <span class="hljs-keyword">this</span>.$Request({
       url: <span class="hljs-string">&quot;&quot;</span>,
       method: <span class="hljs-string">&quot;get&quot;</span>,
       <span class="hljs-keyword">data</span>: {
         page: page.num
       },
       success: res =&gt; {
         <span class="hljs-keyword">if</span> (res.status == <span class="hljs-number">1</span>) {
           let <span class="hljs-keyword">data</span> = page.num == <span class="hljs-number">1</span> ? [] : <span class="hljs-keyword">this</span>.articleList;
           <span class="hljs-keyword">data</span>.push(...res.result.<span class="hljs-keyword">data</span>);
           <span class="hljs-keyword">this</span>.articleList = <span class="hljs-keyword">data</span>;
           <span class="hljs-comment">// &#x6570;&#x636E;&#x6E32;&#x67D3;&#x6210;&#x529F;&#x540E;,&#x9690;&#x85CF;&#x4E0B;&#x62C9;&#x5237;&#x65B0;&#x7684;&#x72B6;&#x6001;</span>
           <span class="hljs-keyword">this</span>.$nextTick(() =&gt; {
              mescroll.endSuccess(res.result.<span class="hljs-keyword">data</span>.length);
           });
         }
       }
    });
  }
 }
}</code></pre><h1 id="articleHeader2">3.style&#x6837;&#x5F0F;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="style
.mescroll {
    position: fixed;
    padding-bottom: 1rem;
    top: 2px;
    bottom: 0;
    height: auto;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">style</span>
<span class="hljs-selector-class">.mescroll</span> {
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">padding-bottom</span>: <span class="hljs-number">1rem</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">2px</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: auto;
}</code></pre><blockquote>&#x5177;&#x4F53;&#x7684;&#x914D;&#x7F6E;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#xFF1A;<a href="http://www.mescroll.com/api.html#options" rel="nofollow noreferrer" target="_blank">mescroll&#x914D;&#x7F6E;</a></blockquote><h1 id="articleHeader3">4.&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#x540E;</h1><ul><li>&#x53EF;&#x4EE5;&#x5728;data&#x4E2D;&#x7684;mescrollUp&#x9879;&#x4E2D;&#x8FDB;&#x884C;&#x5E95;&#x90E8;&#x6CA1;&#x6709;&#x66F4;&#x591A;&#x6570;&#x636E;&#x65F6;&#x7684;&#x63D0;&#x793A;&#x4FE1;&#x606F;,&apos;END&apos;&#x53CA;&apos;&#x52A0;&#x8F7D;&#x4E2D;...&apos;&#x8FD9;&#x4E9B;&#x5185;&#x5BB9;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x8BBE;&#x7F6E;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="htmlLoading: &apos;&lt;p class=&quot;upwarp-progress mescroll-rotate&quot;&gt;&lt;/p&gt;&lt;p class=&quot;upwarp-tip&quot;&gt;&#x52A0;&#x8F7D;&#x4E2D;..&lt;/p&gt;&apos;, //&#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x4E2D;&#x7684;&#x5E03;&#x5C40;
htmlNodata: &apos;&lt;p class=&quot;upwarp-nodata&quot;&gt;-- END --&lt;/p&gt;&apos;, //&#x65E0;&#x6570;&#x636E;&#x7684;&#x5E03;&#x5C40;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code>htmlLoading: &apos;&lt;p <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;upwarp-progress mescroll-rotate&quot;</span>&gt;&lt;/p&gt;&lt;p <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;upwarp-tip&quot;</span>&gt;&#x52A0;&#x8F7D;&#x4E2D;..&lt;/p&gt;&apos;, <span class="hljs-comment">//&#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x4E2D;&#x7684;&#x5E03;&#x5C40;</span>
htmlNodata: &apos;&lt;p <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;upwarp-nodata&quot;</span>&gt;-- <span class="hljs-type">END</span> --&lt;/p&gt;&apos;, <span class="hljs-comment">//&#x65E0;&#x6570;&#x636E;&#x7684;&#x5E03;&#x5C40;</span></code></pre><blockquote>&#x53EF;&#x4EE5;&#x67E5;&#x770B;&#x6E90;&#x7801;&#x8FDB;&#x884C;&#x8BBE;&#x7F6E;: <a href="https://github.com/mescroll/mescroll/blob/master/demo/base/mescroll-options.html" rel="nofollow noreferrer" target="_blank">mescroll&#x6E90;&#x7801;&#xFF08;GitHub&#xFF09;</a></blockquote><h1 id="articleHeader4">5.scroll&#x5C5E;&#x6027;&#x5728;ios&#x624B;&#x673A;&#x4E0A;&#x56DE;&#x51FA;&#x73B0;&#x5361;&#x987F;&#x95EE;&#x9898;</h1><ul><li>&#x5728;&#x8FDB;&#x884C;&#x6EDA;&#x52A8;&#x7684;&#x8FD9;&#x4E2A;&#x5BB9;&#x5668;&#x6837;&#x5F0F;&#x4E2D;&#x6DFB;&#x52A0;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#xFF1A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-webkit-overflow-scrolling:touch;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code style="word-break:break-word;white-space:initial">-webkit-<span class="hljs-attribute">overflow</span>-scrolling:touch;</code></pre><ul><li>&#x4F46;&#x662F;&#x7684;&#x8BDD;&#xFF0C;&#x586B;&#x52A0;&#x4E86;&#x8FD9;&#x4E2A;&#x517C;&#x5BB9;&#x4F1A;&#x5BFC;&#x81F4;&#x5B9A;&#x4F4D;&#x4E3A;position&#xFF1A;fixed&#x7684;&#x5931;&#x53BB;&#x6548;&#x679C;&#xFF0C;&#x770B;&#x4E86;&#x4E00;&#x4E9B;&#x8D44;&#x6599;&#xFF0C;&#x4F7F;&#x7528;position&#xFF1A;absolute&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#xFF0C;&#x8FD9;&#x4E2A;&#x6211;&#x6CA1;&#x6709;&#x5177;&#x4F53;&#x7684;&#x518D;&#x53BB;&#x5B9E;&#x9A8C;&#x4E0B;&#xFF0C;&#x82E5;&#x6709;&#x597D;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x8FD8;&#x8BF7;&#x5927;&#x5BB6;&#x80FD;&#x591F;&#x5728;&#x8BC4;&#x8BBA;&#x91CC;&#x544A;&#x77E5;&#x4E0B;&#xFF0C;&#x611F;&#x6FC0;&#x4E0D;&#x5C3D;</li></ul><blockquote>&#x6B63;&#x5728;&#x52AA;&#x529B;&#x5B66;&#x4E60;&#x4E2D;&#xFF0C;&#x82E5;&#x5BF9;&#x4F60;&#x7684;&#x5B66;&#x4E60;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x7559;&#x4E0B;&#x4F60;&#x7684;&#x5370;&#x8BB0;&#x5457;&#xFF08;&#x70B9;&#x4E2A;&#x8D5E;&#x54AF;^_^&#xFF09;</blockquote><ul><li><p>&#x5F80;&#x671F;&#x597D;&#x6587;&#x63A8;&#x8350;&#xFF1A;</p><ul><li><a href="https://segmentfault.com/a/1190000016068450">webpack&#x6253;&#x5305;&#xFF08;&#x6709;&#x9762;&#x8BD5;&#x9898;&#xFF09;</a></li><li><a href="https://segmentfault.com/a/1190000016255824" target="_blank">&#x7EAF;css&#x5B9E;&#x73B0;&#x7011;&#x5E03;&#x6D41;&#xFF08;multi-column&#x591A;&#x5217;&#x53CA;flex&#x5E03;&#x5C40;&#xFF09;</a></li><li><a href="https://segmentfault.com/a/1190000016082968">&#x753B;&#x4E09;&#x89D2;&#x5F62;</a></li></ul></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
实现移动端上拉加载和下拉刷新的vue插件(mescroll.js)

## 原文链接
[https://segmentfault.com/a/1190000016400608](https://segmentfault.com/a/1190000016400608)

