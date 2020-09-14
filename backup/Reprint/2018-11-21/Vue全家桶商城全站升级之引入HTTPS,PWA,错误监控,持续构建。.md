---
title: 'Vue全家桶商城全站升级之引入HTTPS,PWA,错误监控,持续构建。' 
date: 2018-11-21 2:30:10
hidden: true
slug: h69u1gx0x1
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/remote/1460000012773891?w=370&amp;h=661" src="https://static.alili.tech/img/remote/1460000012773891?w=370&amp;h=661" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x5728;&#x7EBF;&#x5730;&#x5740;:<a href="https://fancy.czero.cn" rel="nofollow noreferrer" target="_blank">https://fancy.czero.cn</a></p><p>&#x624B;&#x673A;&#x626B;&#x63CF;&#x4E8C;&#x7EF4;&#x7801;&#x67E5;&#x770B;:</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015771236?w=280&amp;h=280" src="https://static.alili.tech/img/remote/1460000015771236?w=280&amp;h=280" alt="" title="" style="cursor:pointer;display:inline"></span></p><p><a href="http://github.czero.cn/fancyapp.apk" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x51FB;&#x4E0B;&#x8F7D;&#x5B89;&#x5353;apk&#x5B89;&#x88C5;&#x5305;</a></p><p>&#x6E90;&#x7801;&#x5730;&#x5740;:<a href="https://github.com/czero1995/fancy-store" rel="nofollow noreferrer" target="_blank">https://github.com/czero1995/fancy-store</a></p><h3 id="articleHeader0">&#x9879;&#x76EE;&#x4E3B;&#x67B6;&#x6784;</h3><p><span class="img-wrap"><img data-src="/img/remote/1460000012773893?w=515&amp;h=751" src="https://static.alili.tech/img/remote/1460000012773893?w=515&amp;h=751" alt="" title="" style="cursor:pointer"></span></p><h3 id="articleHeader1">&#x4F7F;&#x7528;&#x7684;&#x5E93;</h3><ul><li>vue-cli (vue+webpack&#x811A;&#x624B;&#x67B6;)</li><li>vue-router(&#x8DEF;&#x7531;&#x8DF3;&#x8F6C;)</li><li>vuex(&#x72B6;&#x6001;&#x7BA1;&#x7406;)</li><li>axios(&#x6570;&#x636E;&#x8BF7;&#x6C42;)</li><li>mock.js(&#x6A21;&#x62DF;&#x540E;&#x53F0;&#x6570;&#x636E;)</li><li>vue-touch(&#x624B;&#x52BF;&#x5224;&#x65AD;)</li><li>fastclick(&#x89E3;&#x51B3;&#x79FB;&#x52A8;&#x7AEF;&#x6D4F;&#x89C8;&#x5668; 300 &#x6BEB;&#x79D2;&#x70B9;&#x51FB;&#x5EF6;&#x8FDF;&#x95EE;&#x9898;)</li><li>vue-lazyload(&#x56FE;&#x7247;&#x61D2;&#x52A0;&#x8F7D;)</li><li>swiper(&#x8F6E;&#x64AD;)</li></ul><h2 id="articleHeader2">&#x8BBE;&#x8BA1;&#x5E03;&#x5C40;:</h2><ul><li>HTML5</li><li>CSS3</li><li>Less</li><li>rem(&#x963F;&#x91CC;&#x7528;&#x7684;&#x90A3;&#x5957;rem&#x7B97;&#x6CD5;)</li><li>Flex(&#x5F39;&#x6027;&#x5E03;&#x5C40;)</li><li>vue-touch(&#x7528;&#x4E8E;&#x5B9E;&#x73B0;&#x8D2D;&#x7269;&#x8F66;&#x5DE6;&#x6ED1;&#x5220;&#x9664;&#x529F;&#x80FD;)</li></ul><p>*&#x52A8;&#x753B;&#xFF08;vue&#x539F;&#x751F;transition&#x5B9E;&#x73B0;&#x539F;&#x751F;app&#x7684;&#x6548;&#x679C;&#xFF09;</p><h2 id="articleHeader3">&#x6570;&#x636E;&#x8BF7;&#x6C42;&#xFF1A;</h2><ul><li>Mock(&#x6A21;&#x62DF;&#x540E;&#x53F0;&#x6570;&#x636E;)</li><li>Axios(&#x8BF7;&#x6C42;&#x6570;&#x636E;)</li></ul><h2 id="articleHeader4">&#x903B;&#x8F91;&#x4EA4;&#x4E92;&#xFF1A;</h2><ul><li>vue(&#x6570;&#x636E;&#x6E32;&#x67D3;,&#x5404;&#x4E2A;&#x7EC4;&#x4EF6;&#x95F4;&#x7684;&#x6570;&#x503C;&#x4F20;&#x9012;)</li><li>vue-router(&#x7EC4;&#x4EF6;&#x95F4;&#x7684;&#x8DEF;&#x7531;&#x8DF3;&#x8F6C;)</li><li>vuex(&#x5168;&#x5C40;&#x72B6;&#x6001;&#x7684;&#x7BA1;&#x7406;)</li></ul><h2 id="articleHeader5">&#x8C03;&#x8BD5;</h2><ul><li>vConsole(&#x5728;&#x79FB;&#x52A8;&#x7AEF;&#x67E5;&#x770B;&#x8C03;&#x8BD5;&#x5668;)</li></ul><h2 id="articleHeader6">&#x4F18;&#x5316;&#x65B9;&#x6848;:</h2><ul><li>&#x817E;&#x8BAF;&#x667A;&#x56FE;(&#x538B;&#x7F29;&#x56FE;&#x7247;&#xFF0C;&#x51CF;&#x5C11;&#x56FE;&#x7247;&#x7684;&#x4F53;&#x79EF;)</li><li>vue-lazyload(&#x56FE;&#x7247;&#x61D2;&#x52A0;&#x8F7D;&#xFF0C;&#x7F13;&#x89E3;&#x52A0;&#x8F7D;&#x6570;&#x636E;,&#x63D0;&#x9AD8;&#x7F51;&#x9875;&#x6027;&#x80FD;)</li><li>fastclick(&#x89E3;&#x51B3;&#x79FB;&#x52A8;&#x7AEF;300ms&#x5EF6;&#x8FDF;&#xFF0C;&#x63D0;&#x9AD8;&#x9875;&#x9762;&#x4EA4;&#x4E92;&#x6D41;&#x7545;&#x5EA6;)</li><li>vue-rouer(&#x8DEF;&#x7531;&#x61D2;&#x52A0;&#x8F7D;,&#x5206;&#x79BB;app&#x7684;js&#x4E3A;&#x591A;&#x4E2A;js&#x6587;&#x4EF6;&#xFF0C;&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x9875;&#x9762;&#x518D;&#x6267;&#x884C;&#x5BF9;&#x5E94;&#x7684;js)</li><li>webpack(config/index.js&#x6587;&#x4EF6;&#x5185;&#x7684;productionSourceMap&#x6539;&#x4E3A;false,&#x8FD9;&#x6837;&#x6253;&#x5305;&#x51FA;&#x6765;&#x7684;&#x6587;&#x4EF6;&#x53EF;&#x4EE5;&#x6CA1;&#x6709;.map&#x7ED3;&#x5C3E;&#x7684;js&#x6587;&#x4EF6;&#xFF0C;&#x4E14;&#x6587;&#x4EF6;&#x4F53;&#x79EF;&#x51CF;&#x5C11;&#x81F3;&#x5C11;&#x4E00;&#x534A;)</li></ul><h2 id="articleHeader7">Vuex&#x5237;&#x65B0;&#x4FDD;&#x5B58;&#x72B6;&#x6001;</h2><p>&#x4F7F;&#x7528;Vuex&#x505A;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5F53;&#x7528;&#x6237;&#x5237;&#x65B0;&#x9875;&#x9762;&#xFF0C;Vuex&#x91CC;&#x9762;&#x7684;&#x72B6;&#x6001;&#x4F1A;&#x5168;&#x90E8;&#x4E22;&#x5931;&#xFF0C;&#x4ECE;&#x800C;&#x5F15;&#x8D77;&#x7A0B;&#x5E8F;&#x7684;&#x4E00;&#x573A;&#x3002;&#x89E3;&#x51B3;&#x601D;&#x8DEF;&#x662F;&#x5728;creared()&#x94A9;&#x5B50;&#x51FD;&#x6570;&#x91CC;&#x9762;&#x6DFB;&#x52A0;&#x4EE5;&#x4E0B;&#x65B9;&#x6CD5;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
created(){
   console.log(&apos;&#x9875;&#x9762;&#x6267;&#x884C;&#x5237;&#x65B0;&#x65F6;&#xFF0C;&#x4FDD;&#x5B58;Vuex&#x7684;&#x72B6;&#x6001;&#x5230;LocalStorage&apos;)
    //&#x5728;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x65F6;&#x8BFB;&#x53D6;localStorage&#x91CC;&#x7684;&#x72B6;&#x6001;&#x4FE1;&#x606F;
    localStorage.getItem(&quot;userMsg&quot;) &amp;&amp; this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem(&quot;userMsg&quot;))));
    
    //&#x5728;&#x9875;&#x9762;&#x5237;&#x65B0;&#x65F6;&#x5C06;vuex&#x91CC;&#x7684;&#x4FE1;&#x606F;&#x4FDD;&#x5B58;&#x5230;localStorage&#x91CC;
    window.addEventListener(&quot;beforeunload&quot;,()=&gt;{
        localStorage.setItem(&quot;userMsg&quot;,JSON.stringify(this.$store.state))
    })
  }  " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>
created(){
   console.<span class="hljs-keyword">log</span>(&apos;&#x9875;&#x9762;&#x6267;&#x884C;&#x5237;&#x65B0;&#x65F6;&#xFF0C;&#x4FDD;&#x5B58;Vuex&#x7684;&#x72B6;&#x6001;&#x5230;LocalStorage&apos;)
    //&#x5728;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x65F6;&#x8BFB;&#x53D6;localStorage&#x91CC;&#x7684;&#x72B6;&#x6001;&#x4FE1;&#x606F;
    localStorage.getItem(<span class="hljs-string">&quot;userMsg&quot;</span>) &amp;&amp; this.<span class="hljs-variable">$store</span>.replaceState(Object.assign(this.<span class="hljs-variable">$store</span>.<span class="hljs-keyword">state</span>,JSON.parse(localStorage.getItem(<span class="hljs-string">&quot;userMsg&quot;</span>))));
    
    //&#x5728;&#x9875;&#x9762;&#x5237;&#x65B0;&#x65F6;&#x5C06;vuex&#x91CC;&#x7684;&#x4FE1;&#x606F;&#x4FDD;&#x5B58;&#x5230;localStorage&#x91CC;
    window.addEventListener(<span class="hljs-string">&quot;beforeunload&quot;</span>,()=&gt;{
        localStorage.<span class="hljs-built_in">set</span>Item(<span class="hljs-string">&quot;userMsg&quot;</span>,JSON.stringify(this.<span class="hljs-variable">$store</span>.<span class="hljs-keyword">state</span>))
    })
  }  </code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x7684;&#x539F;&#x7406;&#x662F;&#xFF0C;&#x5F53;&#x9875;&#x9762;&#x5237;&#x65B0;&#x65F6;&#xFF0C;&#x4F1A;&#x5C06;&#x5F53;&#x524D;Vuex&#x7684;&#x72B6;&#x6001;&#x5B58;&#x50A8;&#x5230;LocalStorage&#x91CC;&#x9762;&#xFF0C;&#x5237;&#x65B0;&#x6210;&#x529F;&#xFF0C;&#x518D;&#x4ECE;LocalStorage&#x8D4B;&#x503C;&#x5230;Vuex&#x91CC;&#x9762;.</p><h2 id="articleHeader8">&#x5B9E;&#x73B0;&#x7EC6;&#x8282;</h2><h3 id="articleHeader9">&#x5AB2;&#x7F8E;&#x539F;&#x751F;&#x7684;&#x9875;&#x9762;&#x524D;&#x8FDB;&#x548C;&#x540E;&#x9000;&#x7684;&#x52A8;&#x753B;&#x5B9E;&#x73B0;:</h3><p><span class="img-wrap"><img data-src="/img/remote/1460000012773894?w=363&amp;h=667" src="https://static.alili.tech/img/remote/1460000012773894?w=363&amp;h=667" alt="" title="" style="cursor:pointer"></span></p><ul><li>&#x6307;&#x5B9A;transition:name</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000012773895?w=954&amp;h=272" src="https://static.alili.tech/img/remote/1460000012773895?w=954&amp;h=272" alt="" title="" style="cursor:pointer"></span></p><ul><li>&#x5728;data&#x4E2D;&#x58F0;&#x660E;&#x9ED8;&#x8BA4;&#x7684;&#x8FDB;&#x51FA;&#x52A8;&#x753B;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000012773896?w=494&amp;h=241" src="https://static.alili.tech/img/remote/1460000012773896?w=494&amp;h=241" alt="" title="" style="cursor:pointer"></span></p><ul><li>&#x5728;mounted()&#x6570;&#x636E;&#x6E32;&#x67D3;&#x521D;&#x59CB;&#x5316;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#x8FDB;&#x884C;&#x5224;&#x65AD;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000012773897?w=1091&amp;h=499" src="https://static.alili.tech/img/remote/1460000012773897?w=1091&amp;h=499" alt="" title="" style="cursor:pointer"></span></p><ul><li>&#x62FF;&#x5230;vuex&#x7684;&#x72B6;&#x6001;&#x503C;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000012773898?w=818&amp;h=146" src="https://static.alili.tech/img/remote/1460000012773898?w=818&amp;h=146" alt="" title="" style="cursor:pointer"></span></p><ul><li>&#x7136;&#x540E;&#x8FDB;&#x884C;&#x5224;&#x65AD;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000012773899?w=818&amp;h=146" src="https://static.alili.tech/img/remote/1460000012773899?w=818&amp;h=146" alt="" title="" style="cursor:pointer"></span></p><ul><li>&#x6700;&#x540E;&#x5C06;&#x5F53;&#x524D;&#x7684;&#x7EC4;&#x4EF6;&#x540D;&#x5B57;&#x4F20;&#x7ED9;vuex,&#x5B9E;&#x73B0;&#x4E0D;&#x540C;&#x7684;&#x7EC4;&#x4EF6;&#x8FDB;&#x53BB;&#x5C31;&#x6709;&#x4E0D;&#x540C;&#x7684;&#x5207;&#x6362;&#x52A8;&#x753B;&#x3002;</li></ul><h4>&#x4E0B;&#x4E00;&#x9875;&#x52A8;&#x753B;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".slide-go-enter-active,
.slide-go-leave-active {
    transition: all .5s;
    opacity: .8;
}

.slide-go-enter,
.slide-go-leave-to {
    transition: all .5s;
    transform: translate3d(100%, 0, 0);
    opacity: .8;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.slide-go-enter-active</span>,
<span class="hljs-selector-class">.slide-go-leave-active</span> {
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">5s</span>;
    <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">8</span>;
}

<span class="hljs-selector-class">.slide-go-enter</span>,
<span class="hljs-selector-class">.slide-go-leave-to</span> {
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">5s</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(100%, 0, 0);
    <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">8</span>;
}
</code></pre><h3 id="articleHeader10">&#x8FD4;&#x56DE;&#x4E0A;&#x4E00;&#x9875;&#x52A8;&#x753B;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".slide-back-enter-active,
.slide-back-leave-active {
    transition: all .5s;
}

.slide-back-enter,
.slide-back-leave-to {
    transition: all .5s;
    transform: translate3d(-100%, 0, 0);
}

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.slide-back-enter-active</span>,
<span class="hljs-selector-class">.slide-back-leave-active</span> {
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">5s</span>;
}

<span class="hljs-selector-class">.slide-back-enter</span>,
<span class="hljs-selector-class">.slide-back-leave-to</span> {
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">5s</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(-100%, 0, 0);
}

</code></pre><h2 id="articleHeader11">&#x8D2D;&#x7269;&#x8F66;&#x5DE6;&#x6ED1;&#x5220;&#x9664;</h2><p><span class="img-wrap"><img data-src="/img/remote/1460000012773900?w=363&amp;h=667" src="https://static.alili.tech/img/remote/1460000012773900?w=363&amp;h=667" alt="" title="" style="cursor:pointer"></span></p><h3 id="articleHeader12">v-touch</h3><p>&#x5728;css&#x4E2D;&#x8BBE;&#x7F6E;&#x597D;&#x5220;&#x9664;&#x6309;&#x94AE;&#x7684;&#x504F;&#x79FB;&#x91CF;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-webkit-transform: translate(-12%, 0);
-webkit-transition: all 0.3s linear;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>-<span class="ruby">webkit-<span class="hljs-symbol">transform:</span> translate(-<span class="hljs-number">12</span>%, <span class="hljs-number">0</span>);
</span>-<span class="ruby">webkit-<span class="hljs-symbol">transition:</span> all <span class="hljs-number">0</span>.<span class="hljs-number">3</span>s linear;
</span></code></pre><h2 id="articleHeader13">&#x5DE6;&#x53F3;&#x6ED1;&#x65B9;&#x6CD5;</h2><p><span class="img-wrap"><img data-src="/img/remote/1460000012773901?w=352&amp;h=206" src="https://static.alili.tech/img/remote/1460000012773901?w=352&amp;h=206" alt="" title="" style="cursor:pointer"></span></p><p>&#x6ED1;&#x52A8;&#x7684;&#x65F6;&#x5019;&#x89E6;&#x53D1;select&#x6837;&#x5F0F;&#xFF0C;&#x8FDB;&#x884C;&#x7ED1;&#x5B9A;</p><p>&#x8BA9;&#x5F53;&#x524D;&#x7684;&#x5217;&#x8868;&#x9879;==&#x8D2D;&#x7269;&#x8F66;&#x7684;&#x5217;&#x8868;&#xFF0C;&#x6837;&#x5F0F;&#x4F1A;&#x88AB;&#x6FC0;&#x6D3B;&#xFF0C;&#x51FA;&#x73B0;&#x5DE6;&#x6ED1;&#x5220;&#x9664;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012773902?w=694&amp;h=29" src="https://static.alili.tech/img/remote/1460000012773902?w=694&amp;h=29" alt="" title="" style="cursor:pointer"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000012773903?w=1082&amp;h=64" src="https://static.alili.tech/img/remote/1460000012773903?w=1082&amp;h=64" alt="" title="" style="cursor:pointer"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x6CE8;&#x610F;&#x9875;&#x9762;&#x7684;&#x76D2;&#x5B50;&#x4F7F;&#x7528;&#x76D2;&#x5B50;&#x4E4B;&#x540E;&#x4F1A;&#x548C;&#x539F;&#x751F;&#x9875;&#x9762;&#x51FA;&#x73B0;&#x51B2;&#x7A81;&#xFF0C;&#x5BFC;&#x81F4;&#x6ED1;&#x52A8;&#x4E0D;&#x6D41;&#x7545;
&#x56E0;&#x6B64;&#xFF0C;&#x9700;&#x8981;&#x5728;main.js&#x6307;&#x5B9A;&#x9ED8;&#x8BA4;&#x7684;&#x6ED1;&#x52A8;&#x65B9;&#x5F0F;&#x4E3A;&#x6A2A;&#x5411;&#x6ED1;&#x52A8;&#x89E6;&#x53D1;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>&#x6CE8;&#x610F;&#x9875;&#x9762;&#x7684;&#x76D2;&#x5B50;&#x4F7F;&#x7528;&#x76D2;&#x5B50;&#x4E4B;&#x540E;&#x4F1A;&#x548C;&#x539F;&#x751F;&#x9875;&#x9762;&#x51FA;&#x73B0;&#x51B2;&#x7A81;&#xFF0C;&#x5BFC;&#x81F4;&#x6ED1;&#x52A8;&#x4E0D;&#x6D41;&#x7545;
&#x56E0;&#x6B64;&#xFF0C;&#x9700;&#x8981;&#x5728;<span class="hljs-selector-tag">main</span><span class="hljs-selector-class">.js</span>&#x6307;&#x5B9A;&#x9ED8;&#x8BA4;&#x7684;&#x6ED1;&#x52A8;&#x65B9;&#x5F0F;&#x4E3A;&#x6A2A;&#x5411;&#x6ED1;&#x52A8;&#x89E6;&#x53D1;

</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000012773904?w=713&amp;h=86" src="https://static.alili.tech/img/remote/1460000012773904?w=713&amp;h=86" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader14">&#x8BA2;&#x5355;&#x9875;&#x9762;&#xFF0C;&#x70B9;&#x51FB;&#x9876;&#x90E8;&#x5BFC;&#x822A;&#x548C;&#x5DE6;&#x53F3;&#x6ED1;&#x52A8;&#x8FDB;&#x884C;&#x7EC4;&#x4EF6;&#x7684;&#x5207;&#x6362;&#x4EE5;&#x53CA;&#x52A8;&#x753B;&#x6837;&#x5F0F;&#x7684;&#x5224;&#x65AD;</h2><p><span class="img-wrap"><img data-src="/img/remote/1460000012773905?w=363&amp;h=667" src="https://static.alili.tech/img/remote/1460000012773905?w=363&amp;h=667" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x4E5F;&#x662F;&#x4F7F;&#x7528;&#x7684;v-touch&#x7EC4;&#x4EF6;&#xFF0C;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x548C;&#x7EC4;&#x4EF6;&#x5207;&#x6362;&#x7C7B;&#x4F3C;&#x3002;<br>&#x6211;&#x7ED9;&#x6BCF;&#x4E2A;&#x8BA2;&#x5355;&#x72B6;&#x6001;&#x7684;&#x7EC4;&#x4EF6;&#x4E00;&#x4E2A;&#x4E0D;&#x540C;&#x7684;&#x6570;&#x5B57;&#xFF0C;&#x6839;&#x636E;&#x8FD9;&#x4E2A;&#x6570;&#x5B57;&#xFF0C;&#x5224;&#x65AD;&#x7EC4;&#x4EF6;&#x662F;&#x5DE6;&#x6ED1;&#x52A8;&#x7684;&#x52A8;&#x753B;&#x8FD8;&#x662F;&#x53C8;&#x6ED1;&#x52A8;&#x7684;&#x52A8;&#x753B;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012773906?w=657&amp;h=160" src="https://static.alili.tech/img/remote/1460000012773906?w=657&amp;h=160" alt="" title="" style="cursor:pointer;display:inline"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000012773907?w=389&amp;h=145" src="https://static.alili.tech/img/remote/1460000012773907?w=389&amp;h=145" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader15">Vue-cli&#x5F00;&#x542F;PWA(Service Worker)&#x548C;&#x5F15;&#x5165;&#x9AA8;&#x67B6;&#x5C4F;</h2><p><span class="img-wrap"><img data-src="/img/remote/1460000015771237?w=2712&amp;h=1150" src="https://static.alili.tech/img/remote/1460000015771237?w=2712&amp;h=1150" alt="" title="" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/remote/1460000015771238?w=2840&amp;h=1076" src="https://static.alili.tech/img/remote/1460000015771238?w=2840&amp;h=1076" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x53C2;&#x8003;&#x6587;&#x7AE0;:</p><p><a href="https://github.com/czero1995/vue-pwa-skeleton" rel="nofollow noreferrer" target="_blank">https://github.com/czero1995/vue-pwa-skeleton</a></p><p><a href="https://zhuanlan.zhihu.com/p/37408373" rel="nofollow noreferrer" target="_blank">https://zhuanlan.zhihu.com/p/37408373</a></p><h2 id="articleHeader16">&#x6301;&#x7EED;&#x96C6;&#x6210;&#x670D;&#x52A1; Travis CI</h2><p>&#x5229;&#x7528;Travis CI&#xFF0C;&#x76D1;&#x542C;Github&#x9879;&#x76EE;master&#xFF0C;&#x4E00;&#x65E6;&#x68C0;&#x6D4B;&#x5230;master&#x6709;&#x4EE3;&#x7801;&#x53D8;&#x52A8;&#xFF0C;&#x81EA;&#x52A8;&#x6267;&#x884C;&#x811A;&#x672C;&#xFF0C;&#x5E76;&#x628A;&#x7F16;&#x8BD1;&#x6253;&#x5305;&#x5B8C;&#x6210;&#x7684;&#x9879;&#x76EE;&#x81EA;&#x52A8;&#x53D1;&#x9001;&#x90E8;&#x7F72;&#x5230;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x4E0D;&#x7528;&#x518D;&#x50CF;&#x4EE5;&#x524D;&#x4E00;&#x6837;&#xFF0C;&#x9700;&#x8981;ssh&#x767B;&#x5F55;&#x5230;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x518D;&#x6267;&#x884C;git pull&#x64CD;&#x4F5C;&#x3002;<br>&#x672C;&#x5730;&#x6DFB;&#x52A0;.travis.yml</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="language: node_js
node_js:
- 8
branchs:
  only:
  - master
before_install:
- openssl aes-256-cbc -K $encrypted_87bf11d507f0_key -iv $encrypted_87bf11d507f0_iv
  -in id_rsa.enc -out ~/.ssh/id_rsa -d
- chmod 600 ~/.ssh/id_rsa
- echo -e &quot;Host 47.98.240.154\n\tStrictHostKeyChecking no\n&quot; &gt;&gt; ~/.ssh/config
script:
- npm install cnpm --registry=https://registry.npm.taobao.org
- cnpm install
- npm run build
- scp -r dist root@47.98.240.154:/var/www/html/fancy
- 


" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>language: node_js
node_js:
-<span class="ruby"> <span class="hljs-number">8</span>
</span>branchs:
  only:
  -<span class="ruby"> master
</span>before_install:
-<span class="ruby"> openssl aes-<span class="hljs-number">256</span>-cbc -K $encrypted_87bf11d507f0_key -iv $encrypted_87bf11d507f0_iv
</span>  -<span class="ruby"><span class="hljs-keyword">in</span> id_rsa.enc -out ~<span class="hljs-regexp">/.ssh/id</span>_rsa -d
</span>-<span class="ruby"> chmod <span class="hljs-number">600</span> ~<span class="hljs-regexp">/.ssh/id</span>_rsa
</span>-<span class="ruby"> echo -e <span class="hljs-string">&quot;Host 47.98.240.154\n\tStrictHostKeyChecking no\n&quot;</span> <span class="hljs-meta">&gt;&gt; </span>~<span class="hljs-regexp">/.ssh/config</span>
</span>script:
-<span class="ruby"> npm install cnpm --registry=<span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/registry.npm.taobao.org
</span></span>-<span class="ruby"><span class="hljs-regexp"> cnpm install
</span></span>-<span class="ruby"><span class="hljs-regexp"> npm run build
</span></span>-<span class="ruby"><span class="hljs-regexp"> scp -r dist root@47.98.240.154:/var</span><span class="hljs-regexp">/www/html</span><span class="hljs-regexp">/fancy
</span></span>-<span class="ruby"><span class="hljs-regexp"> 
</span></span>

</code></pre><p>&#x9047;&#x5230;&#x4E86;&#x5F88;&#x591A;&#x7684;&#x5751;&#xFF0C;&#x5931;&#x8D25;&#x4E86;&#x65E0;&#x6570;&#x6B21;&#xFF0C;&#x7EC8;&#x4E8E;&#x77E5;&#x9053;&#x95EE;&#x9898;&#x6240;&#x5728;:</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015771239?w=1577&amp;h=980" src="https://static.alili.tech/img/remote/1460000015771239?w=1577&amp;h=980" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader17">&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x9519;&#x8BEF;&#x76D1;&#x63A7;</h2><p><a href="https://sentry.io/welcome/" rel="nofollow noreferrer" target="_blank">sentry</a>&#x662F;&#x56FD;&#x5916;&#x5F00;&#x6E90;&#x7684;&#x9519;&#x8BEF;&#x76D1;&#x63A7;&#x5E93;&#xFF0C;&#x6709;&#x7EBF;&#x4E0A;&#x73AF;&#x5883;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x90E8;&#x7F72;&#x5230;&#x81EA;&#x5DF1;&#x7684;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x53EF;&#x4EE5;&#x8DDF;&#x8E2A;&#x9519;&#x8BEF;&#x51FA;&#x73B0;&#x7684;&#x6B65;&#x9AA4;&#x548C;&#x9519;&#x8BEF;&#x7684;&#x8BE6;&#x7EC6;&#x4FE1;&#x606F;&#xFF0C;&#x65B9;&#x4FBF;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x8FDB;&#x884C;&#x5FEB;&#x901F;&#x5B9A;&#x4F4D;&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000015771240?w=1204&amp;h=426" src="https://static.alili.tech/img/remote/1460000015771240?w=1204&amp;h=426" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader18">&#x514D;&#x8D39;&#x5347;&#x7EA7;&#x5230;HTTPS</h2><p>`&#x5347;&#x7EA7;&#x5230;https&#x540E;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x53EF;&#x4EE5;&#x5F00;&#x542F;http2.0&#x7248;&#x672C;&#xFF0C;&#x5BF9;&#x6BD4;http1.x&#x6027;&#x80FD;&#x548C;&#x7F13;&#x5B58;&#x5404;&#x65B9;&#x9762;&#x8981;&#x66F4;&#x597D;&#xFF0C;&#x8FD8;&#x6709;&#x5176;&#x4ED6;&#x65B0;&#x7279;&#x6027;&#xFF0C;<br>&#x53EF;&#x4EE5;&#x542F;&#x52A8;service work&#x529F;&#x80FD;&#xFF0C;&#x66F4;&#x597D;&#x7684;&#x8FDB;&#x884C;&#x79BB;&#x7EBF;&#x7F13;&#x5B58;&#xFF0C;&#x66F4;&#x597D;&#x7684;&#x79BB;&#x7EBF;&#x4F53;&#x9A8C;&#x3002;<br>HTTPS&#x8BC1;&#x4E66;&#x53EF;&#x4EE5;&#x514D;&#x8D39;&#x7533;&#x8BF7;&#xFF0C;&#x963F;&#x91CC;&#x4E91;&#x8DDF;&#x817E;&#x8BAF;&#x4E91;&#x90FD;&#x53EF;&#x4EE5;&#x7533;&#x8BF7;&#xFF0C;&#x6309;&#x7167;&#x6587;&#x6863;&#x6307;&#x793A;&#x8FDB;&#x884C;&#x7533;&#x8BF7;&#x4E0B;&#x8F7D;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x4E0B;&#x8F7D;&#x7684;&#x8BC1;&#x4E66;&#x4E0A;&#x4F20;&#x5230;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x914D;&#x7F6E;&#x670D;&#x52A1;&#x5668;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5F00;&#x542F;https&#x3001;http2.0&#x3001;service work&#x7B49;&#x529F;&#x80FD;&#x4E86;&#x3002;<br>`<br><span class="img-wrap"><img data-src="/img/remote/1460000015771241?w=666&amp;h=90" src="https://static.alili.tech/img/remote/1460000015771241?w=666&amp;h=90" alt="" title="" style="cursor:pointer"></span></p><h3 id="articleHeader19">&#x9879;&#x76EE;&#x4EE3;&#x7801;&#x5DF2;&#x7ECF;&#x90FD;&#x505A;&#x597D;&#x6CE8;&#x91CA;&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x67E5;&#x770B;&#x6E90;&#x7801;&#xFF0C;<a href="https://github.com/czero1995/fancy-store" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x51FB;&#x8FD9;&#x91CC;</a></h3><h1 id="articleHeader20">&#x4F7F;&#x7528;&#x8BF4;&#x660E;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#&#x514B;&#x9686;&#x9879;&#x76EE;
git clone https://github.com/czero1995/fancy-store.git

# &#x5B89;&#x88C5;&#x4F9D;&#x8D56;
npm install

# DLL&#x6784;&#x5EFA;&#x5E93;(&#x63D0;&#x9AD8;&#x6253;&#x5305;&#x548C;&#x7F16;&#x8BD1;&#x7684;&#x901F;&#x5EA6;)
npm run dll

# &#x672C;&#x5730;&#x5F00;&#x53D1;&#x73AF;&#x5883; &#x8BBF;&#x95EE;http://localhost:8080
npm run dev

# &#x6784;&#x5EFA;&#x751F;&#x4EA7;
npm run build

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code><span class="hljs-comment">#&#x514B;&#x9686;&#x9879;&#x76EE;</span>
git clone https://github.com/czero1995/fancy-store.git

<span class="hljs-comment"># &#x5B89;&#x88C5;&#x4F9D;&#x8D56;</span>
npm install

<span class="hljs-comment"># DLL&#x6784;&#x5EFA;&#x5E93;(&#x63D0;&#x9AD8;&#x6253;&#x5305;&#x548C;&#x7F16;&#x8BD1;&#x7684;&#x901F;&#x5EA6;)</span>
npm <span class="hljs-keyword">run</span><span class="bash"> dll
</span>
<span class="hljs-comment"># &#x672C;&#x5730;&#x5F00;&#x53D1;&#x73AF;&#x5883; &#x8BBF;&#x95EE;http://localhost:8080</span>
npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span>
<span class="hljs-comment"># &#x6784;&#x5EFA;&#x751F;&#x4EA7;</span>
npm <span class="hljs-keyword">run</span><span class="bash"> build
</span>
</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue全家桶商城全站升级之引入HTTPS,PWA,错误监控,持续构建。

## 原文链接
[https://segmentfault.com/a/1190000015771233](https://segmentfault.com/a/1190000015771233)

