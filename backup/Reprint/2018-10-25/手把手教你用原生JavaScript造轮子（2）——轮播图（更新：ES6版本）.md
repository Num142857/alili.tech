---
title: 手把手教你用原生JavaScript造轮子（2）——轮播图（更新：ES6版本）
hidden: true
categories: [reprint]
slug: 87da424a
date: 2018-10-25 09:08:15
---

{{< raw >}}
<p>&#x901A;&#x8FC7;<a href="https://rekodsc.com/detail/10" rel="nofollow noreferrer" target="_blank">&#x4E0A;&#x4E00;&#x7BC7;</a>&#x6587;&#x7AE0;&#x7684;&#x5B66;&#x4E60;&#xFF0C;&#x6211;&#x4EEC;&#x57FA;&#x672C;&#x638C;&#x63E1;&#x4E86;&#x4E00;&#x4E2A;&#x8F6E;&#x5B50;&#x7684;&#x5C01;&#x88C5;&#x548C;&#x5F00;&#x53D1;&#x6D41;&#x7A0B;&#x3002;&#x90A3;&#x4E48;&#x8FD9;&#x6B21;&#x5C06;&#x5E26;&#x5927;&#x5BB6;&#x5F00;&#x53D1;&#x4E00;&#x4E2A;&#x66F4;&#x6709;&#x96BE;&#x5EA6;&#x7684;&#x9879;&#x76EE;&#x2014;&#x2014;&#x8F6E;&#x64AD;&#x56FE;&#xFF0C;&#x5E0C;&#x671B;&#x80FD;&#x8FDB;&#x4E00;&#x6B65;&#x52A0;&#x6DF1;&#x5927;&#x5BB6;&#x5BF9;&#x4E8E;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x63D2;&#x4EF6;&#x5F00;&#x53D1;&#x7684;&#x7406;&#x89E3;&#x548C;&#x8BA4;&#x8BC6;&#x3002;</p><p>So, Let&apos;s begin!</p><blockquote>&#x76EE;&#x524D;&#x9879;&#x76EE;&#x4F7F;&#x7528; ES5&#x53CA;UMD &#x89C4;&#x8303;&#x5C01;&#x88C5;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x524D;&#x7AEF;&#x6682;&#x65F6;&#x53EA;&#x652F;&#x6301;<code>&lt;script&gt;</code>&#x6807;&#x7B7E;&#x7684;&#x5F15;&#x5165;&#x65B9;&#x5F0F;&#xFF0C;&#x672A;&#x6765;&#x4F1A;&#x9010;&#x6B65;&#x7528; ES6 &#x8FDB;&#x884C;&#x91CD;&#x6784;</blockquote><blockquote>&#x6F14;&#x793A;&#x5730;&#x5740;&#xFF1A;<em><a href="https://csdoker.github.io/csdemos/carousel/pc/" rel="nofollow noreferrer" target="_blank">carousel</a></em> <em><a href="https://csdoker.github.io/csdemos/carousel/mobile/" rel="nofollow noreferrer" target="_blank">carousel-mobile</a></em><br>Github&#xFF1A;<em><a href="https://github.com/csdoker/csdwheels" rel="nofollow noreferrer" target="_blank">csdwheels</a></em><br><em>&#x5982;&#x679C;&#x89C9;&#x5F97;&#x597D;&#x7528;&#x5C31;&#x70B9;&#x4E2A;Star&#x5427;~(&#x3003;&apos;&#x25BD;&apos;&#x3003;)</em></blockquote><p><span class="img-wrap"><img data-src="/img/remote/1460000015976693?w=900&amp;h=600" src="https://static.alili.tech/img/remote/1460000015976693?w=900&amp;h=600" alt="carousel" title="carousel" style="cursor:pointer;display:inline"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000015976694?w=900&amp;h=600" src="https://static.alili.tech/img/remote/1460000015976694?w=900&amp;h=600" alt="carousel-mobile" title="carousel-mobile" style="cursor:pointer;display:inline"></span></p><h1 id="articleHeader0">Web&#x8F6E;&#x64AD;</h1><h2 id="articleHeader1">&#x601D;&#x8DEF;&#x5206;&#x6790;</h2><p>&#x8001;&#x89C4;&#x77E9;&#xFF0C;&#x5728;&#x5199;&#x4EE3;&#x7801;&#x4E4B;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5BF9;&#x8981;&#x5F00;&#x53D1;&#x7684;&#x4E1C;&#x897F;&#x6709;&#x4E2A;&#x611F;&#x6027;&#x7684;&#x8BA4;&#x8BC6;&#xFF0C;&#x6BD4;&#x5982;&#x4F60;&#x53EF;&#x4EE5;&#x5148;&#x5728;&#x8111;&#x4E2D;&#x5927;&#x81F4;&#x8FC7;&#x4E00;&#x904D;&#x6700;&#x7EC8;&#x7684;&#x9879;&#x76EE;&#x6548;&#x679C;&#x662F;&#x5982;&#x4F55;&#x7684;&#xFF0C;&#x800C;&#x5728;&#x8FD9;&#x91CC;&#x4F60;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x770B;&#x4E0A;&#x9762;&#x7684;&#x52A8;&#x6001;&#x56FE;or&#x9879;&#x76EE;&#x9875;&#x9762;&#x8FDB;&#x884C;&#x4F53;&#x9A8C;&#x3002;&#x5B9E;&#x9645;&#x7684;&#x5F00;&#x53D1;&#x9636;&#x6BB5;&#x4E4B;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x66F4;&#x8981;&#x5BF9;&#x63D2;&#x4EF6;&#x7684;&#x903B;&#x8F91;&#x601D;&#x8DEF;&#x6709;&#x4E00;&#x4E2A;&#x6574;&#x4F53;&#x7684;&#x5206;&#x6790;&#xFF0C;&#x8FD9;&#x6837;&#x5728;&#x5F00;&#x53D1;&#x65F6;&#x624D;&#x4F1A;&#x66F4;&#x6709;&#x6548;&#x7387;&#xFF0C;&#x5E76;&#x4E14;&#x53EF;&#x4EE5;&#x6709;&#x6548;&#x907F;&#x514D;&#x56E0;&#x4E3A;&#x601D;&#x8DEF;&#x4E0D;&#x6E05;&#x6670;&#x800C;&#x5BFC;&#x81F4;&#x7684;&#x95EE;&#x9898;&#x3002;</p><p>&#x9996;&#x5148;&#x6765;&#x770B;&#x770B;Web&#x8F6E;&#x64AD;&#x7684;&#x6548;&#x679C;&#x53CA;&#x4EA4;&#x4E92;&#x6709;&#x54EA;&#x4E9B;&#xFF1A;</p><ol><li>&#x6BCF;&#x9694;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x81EA;&#x52A8;&#x8F6E;&#x64AD;</li><li>&#x5DE6;&#x53F3;&#x7BAD;&#x5934;&#x53EF;&#x5207;&#x6362;&#x8F6E;&#x64AD;</li><li>&#x5706;&#x70B9;&#x53EF;&#x5207;&#x6362;&#x8F6E;&#x64AD;</li><li>&#x5F53;&#x9F20;&#x6807;&#x5728;&#x8F6E;&#x64AD;&#x533A;&#x57DF;&#x5185;&#x65F6;&#xFF0C;&#x8F6E;&#x64AD;&#x6682;&#x505C;&#xFF1B;&#x79BB;&#x5F00;&#x533A;&#x57DF;&#x540E;&#xFF0C;&#x8F6E;&#x64AD;&#x91CD;&#x65B0;&#x5F00;&#x59CB;</li><li>&#x8F6E;&#x64AD;&#x5207;&#x6362;&#x65F6;&#xFF0C;&#x4F1A;&#x6709;&#x4E00;&#x4E2A;&#x5300;&#x901F;&#x8FD0;&#x52A8;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;</li><li>&#x5F53;&#x5411;&#x53F3;&#x5207;&#x6362;&#x5230;&#x6700;&#x540E;&#x4E00;&#x5F20;&#x65F6;&#xFF0C;&#x4F1A;&#x81EA;&#x52A8;&#x5FAA;&#x73AF;&#x5230;&#x7B2C;&#x4E00;&#x5F20;&#xFF1B;&#x5411;&#x5DE6;&#x5207;&#x6362;&#x5230;&#x7B2C;&#x4E00;&#x5F20;&#x65F6;&#xFF0C;&#x5FAA;&#x73AF;&#x5230;&#x6700;&#x540E;&#x4E00;&#x5F20;</li></ol><p>&#x5982;&#x4E0A;&#x51E0;&#x70B9;&#xFF0C;&#x53EF;&#x4EE5;&#x8BF4;&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x8F6E;&#x64AD;&#x56FE;&#x5FC5;&#x987B;&#x5B9E;&#x73B0;&#x7684;&#x7ECF;&#x5178;&#x6548;&#x679C;&#x4E86;&#x3002;&#x5176;&#x4ED6;&#x6548;&#x679C;&#x5148;&#x5FFD;&#x7565;&#xFF0C;&#x7B2C;&#x516D;&#x70B9;&#x5BF9;&#x4E8E;&#x65B0;&#x624B;&#x6765;&#x8BF4;&#x660E;&#x663E;&#x662F;&#x6700;&#x6709;&#x96BE;&#x5EA6;&#x7684;&#xFF0C;&#x4E8B;&#x5B9E;&#x4E0A;&#x8FD9;&#x4E2A;&#x6548;&#x679C;&#x6709;&#x4E2A;&#x5E38;&#x89C1;&#x7684;&#x540D;&#x5B57;&#x2014;&#x2014;&#x65E0;&#x7F1D;&#x8F6E;&#x64AD;&#x3002;&#x201C;&#x65E0;&#x7F1D;&#x201D;&#x4E5F;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x65E0;&#x9650;&#x5FAA;&#x73AF;&#xFF0C;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x53EF;&#x4EE5;&#x8BA9;&#x8F6E;&#x64AD;&#x671D;&#x7740;&#x4E00;&#x4E2A;&#x65B9;&#x5411;&#x4E00;&#x76F4;&#x5207;&#x6362;&#xFF0C;&#x5E76;&#x4E14;&#x81EA;&#x52A8;&#x5728;&#x5207;&#x6362;&#x5230;&#x5934;&#x5C3E;&#x56FE;&#x7247;&#x65F6;&#x5FAA;&#x73AF;&#x3002;</p><p>&#x6BD4;&#x5982;&#x73B0;&#x5728;&#x6709;&#x4E94;&#x5F20;&#x56FE;&#x7247;&#xFF0C;&#x6211;&#x4EEC;&#x628A;&#x5B83;&#x4EEC;&#x7F16;&#x53F7;&#x4E3A;&#xFF1A;</p><blockquote>1 2 3 4 5</blockquote><p>&#x8981;&#x5B9E;&#x73B0;&#x4E0A;&#x9762;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x4F60;&#x53EF;&#x80FD;&#x4F1A;&#x60F3;&#x5230;&#x5728;&#x5207;&#x6362;&#x81F3;&#x5934;&#x5C3E;&#x65F6;&#x52A0;&#x4E2A;&#x5224;&#x65AD;&#xFF0C;&#x5F3A;&#x5236;&#x6539;&#x53D8;&#x56FE;&#x7247;&#x4F4D;&#x7F6E;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x8FD9;&#x4E48;&#x505A;&#x7684;&#x8BDD;&#xFF0C;&#x5F53;&#x4F60;&#x6700;&#x540E;&#x4E00;&#x5F20;&#x56FE;&#x5207;&#x6362;&#x56DE;&#x7B2C;&#x4E00;&#x5F20;&#x56FE;&#x65F6;&#x5C31;&#x4F1A;&#x51FA;&#x73B0;&#x7A7A;&#x767D;&#xFF0C;&#x56E0;&#x6B64;&#x8FD8;&#x9700;&#x8981;&#x5728;&#x5934;&#x5C3E;&#x5206;&#x522B;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x5C3E;&#x90E8;&#x548C;&#x5934;&#x90E8;&#x7684;&#x5143;&#x7D20;&#x4F5C;&#x4E3A;&#x4F4D;&#x7F6E;&#x6539;&#x53D8;&#x65F6;&#x7684;&#x8FC7;&#x6E21;&#xFF1A;</p><blockquote>5 1 2 3 4 5 1</blockquote><p>&#x6709;&#x4E86;&#x8FD9;&#x4E24;&#x5F20;&#x8F85;&#x52A9;&#x56FE;&#xFF0C;&#x4E0A;&#x9762;&#x7684;&#x6548;&#x679C;&#x5C31;&#x80FD;&#x987A;&#x5229;&#x5B9E;&#x73B0;&#x4E86;&#x3002;&#x5230;&#x6B64;&#xFF0C;&#x9879;&#x76EE;&#x7684;&#x57FA;&#x7840;&#x601D;&#x8DEF;&#x5206;&#x6790;&#x5B8C;&#x6BD5;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x8FDB;&#x5165;&#x7F16;&#x7801;&#x9636;&#x6BB5;&#x5427;&#xFF01;</p><h2 id="articleHeader2">&#x57FA;&#x672C;&#x67B6;&#x6784;</h2><p>&#x6B63;&#x5F0F;&#x5F00;&#x59CB;&#x4E4B;&#x524D;&#xFF0C;&#x8FD8;&#x662F;&#x9700;&#x8981;&#x5148;&#x628A;&#x9879;&#x76EE;&#x7684;&#x57FA;&#x672C;&#x67B6;&#x6784;&#x642D;&#x5EFA;&#x8D77;&#x6765;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(root, factory) {
    if (typeof define === &quot;function&quot; &amp;&amp; define.amd) {
      define([], factory);
    } else if (typeof module === &quot;object&quot; &amp;&amp; module.exports) {
      module.exports = factory();
    } else {
      root.Carousel = factory();
    }
  })(typeof self !== &quot;undefined&quot; ? self : this, function() {
    &quot;use strict&quot;;

    // ID-NAMES
    var ID = {
      CAROUSEL_WRAP: &apos;#carouselWrap&apos;,
      CAROUSEL_DOTS: &apos;#carouselDots&apos;,
      ARROW_LEFT: &apos;#arrowLeft&apos;,
      ARROW_RIGHT: &apos;#arrowRight&apos;
    };

    var CLASS = {
      CAROUSEL_WRAP: &apos;carousel-wrap&apos;,
      CAROUSEL_IMG: &apos;carousel-image&apos;,
      CAROUSEL_DOTS_WRAP: &apos;carousel-buttons-wrap&apos;,
      CAROUSEL_DOTS: &apos;carousel-buttons&apos;,
      CAROUSEL_DOT: &apos;carousel-button&apos;,
      CAROUSEL_DOT_ON: &apos;carousel-button on&apos;,
      CAROUSEL_ARROW_LEFT: &apos;carousel-arrow arrow-left&apos;,
      CAROUSEL_ARROW_RIGHT: &apos;carousel-arrow arrow-right&apos;
    };

    // Polyfills
    function addEvent(element, type, handler) {
      if (element.addEventListener) {
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent) {
        element.attachEvent(&quot;on&quot; + type, handler);
      } else {
        element[&quot;on&quot; + type] = handler;
      }
    }

    // &#x5408;&#x5E76;&#x5BF9;&#x8C61;
    function extend(o, n, override) {
      for (var p in n) {
        if (n.hasOwnProperty(p) &amp;&amp; (!o.hasOwnProperty(p) || override))
          o[p] = n[p];
      }
    }

    // &#x8F6E;&#x64AD;-&#x6784;&#x9020;&#x51FD;&#x6570;
    var Carousel = function (selector, userOptions) {
      var _this = this;
      // &#x5408;&#x5E76;&#x914D;&#x7F6E;
      extend(this.carouselOptions, userOptions, true);
      // &#x83B7;&#x53D6;&#x8F6E;&#x64AD;&#x5143;&#x7D20;
      _this.carousel = document.querySelector(selector);
      // &#x521D;&#x59CB;&#x5316;&#x8F6E;&#x64AD;&#x5217;&#x8868;
      _this.carousel.appendChild(_this.getImgs());
      // &#x83B7;&#x53D6;&#x8F6E;&#x64AD;&#x5217;&#x8868;
      _this.carouselWrap = document.querySelector(ID.CAROUSEL_WRAP);
      // &#x6BCF;&#x9694; 50ms &#x68C0;&#x6D4B;&#x4E00;&#x6B21;&#x8F6E;&#x64AD;&#x662F;&#x5426;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;
      var checkInterval = 50;
      var checkTimer = setInterval(function () {
        // &#x68C0;&#x6D4B;&#x8F6E;&#x64AD;&#x662F;&#x5426;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;
        if (_this.isCarouselComplete()) {
          // &#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#x540E;&#x6E05;&#x9664;&#x5B9A;&#x65F6;&#x5668;
          clearInterval(checkTimer);
          // &#x521D;&#x59CB;&#x5316;&#x8F6E;&#x64AD;
          _this.initCarousel();
          // &#x521D;&#x59CB;&#x5316;&#x5706;&#x70B9;
          _this.initDots();
          // &#x521D;&#x8BC6;&#x5316;&#x7BAD;&#x5934;
          _this.initArrows();
        }
      }, checkInterval);
    };
    // &#x8F6E;&#x64AD;-&#x539F;&#x578B;&#x5BF9;&#x8C61;
    Carousel.prototype = {
      carouselOptions: {
        // &#x662F;&#x5426;&#x663E;&#x793A;&#x8F6E;&#x64AD;&#x7BAD;&#x5934;
        showCarouselArrow: true,
        // &#x662F;&#x5426;&#x663E;&#x793A;&#x8F6E;&#x64AD;&#x5706;&#x70B9;
        showCarouselDot: true,
        // &#x8F6E;&#x64AD;&#x81EA;&#x52A8;&#x64AD;&#x653E;&#x95F4;&#x9694;
        carouselInterval: 3000,
        // &#x8F6E;&#x64AD;&#x52A8;&#x753B;&#x603B;&#x65F6;&#x95F4;
        carouselAnimateTime: 150,
        // &#x8F6E;&#x64AD;&#x52A8;&#x753B;&#x95F4;&#x9694;
        carouselAnimateInterval: 10
      },
      isCarouselComplete: function () {
        // &#x68C0;&#x6D4B;&#x9875;&#x9762;&#x56FE;&#x7247;&#x662F;&#x5426;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;
        var completeCount = 0;
        for (var i = 0; i &lt; this.carouselWrap.children.length; i++) {
          if (this.carouselWrap.children[i].complete) {
            completeCount++;
          }
        }
        return completeCount === this.carouselWrap.children.length ? true : false;
      }
    };
    return Carousel;
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">root, factory</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> define === <span class="hljs-string">&quot;function&quot;</span> &amp;&amp; define.amd) {
      define([], factory);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">module</span> === <span class="hljs-string">&quot;object&quot;</span> &amp;&amp; <span class="hljs-built_in">module</span>.exports) {
      <span class="hljs-built_in">module</span>.exports = factory();
    } <span class="hljs-keyword">else</span> {
      root.Carousel = factory();
    }
  })(<span class="hljs-keyword">typeof</span> self !== <span class="hljs-string">&quot;undefined&quot;</span> ? self : <span class="hljs-keyword">this</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">    &quot;use strict&quot;</span>;

    <span class="hljs-comment">// ID-NAMES</span>
    <span class="hljs-keyword">var</span> ID = {
      <span class="hljs-attr">CAROUSEL_WRAP</span>: <span class="hljs-string">&apos;#carouselWrap&apos;</span>,
      <span class="hljs-attr">CAROUSEL_DOTS</span>: <span class="hljs-string">&apos;#carouselDots&apos;</span>,
      <span class="hljs-attr">ARROW_LEFT</span>: <span class="hljs-string">&apos;#arrowLeft&apos;</span>,
      <span class="hljs-attr">ARROW_RIGHT</span>: <span class="hljs-string">&apos;#arrowRight&apos;</span>
    };

    <span class="hljs-keyword">var</span> CLASS = {
      <span class="hljs-attr">CAROUSEL_WRAP</span>: <span class="hljs-string">&apos;carousel-wrap&apos;</span>,
      <span class="hljs-attr">CAROUSEL_IMG</span>: <span class="hljs-string">&apos;carousel-image&apos;</span>,
      <span class="hljs-attr">CAROUSEL_DOTS_WRAP</span>: <span class="hljs-string">&apos;carousel-buttons-wrap&apos;</span>,
      <span class="hljs-attr">CAROUSEL_DOTS</span>: <span class="hljs-string">&apos;carousel-buttons&apos;</span>,
      <span class="hljs-attr">CAROUSEL_DOT</span>: <span class="hljs-string">&apos;carousel-button&apos;</span>,
      <span class="hljs-attr">CAROUSEL_DOT_ON</span>: <span class="hljs-string">&apos;carousel-button on&apos;</span>,
      <span class="hljs-attr">CAROUSEL_ARROW_LEFT</span>: <span class="hljs-string">&apos;carousel-arrow arrow-left&apos;</span>,
      <span class="hljs-attr">CAROUSEL_ARROW_RIGHT</span>: <span class="hljs-string">&apos;carousel-arrow arrow-right&apos;</span>
    };

    <span class="hljs-comment">// Polyfills</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addEvent</span>(<span class="hljs-params">element, type, handler</span>) </span>{
      <span class="hljs-keyword">if</span> (element.addEventListener) {
        element.addEventListener(type, handler, <span class="hljs-literal">false</span>);
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (element.attachEvent) {
        element.attachEvent(<span class="hljs-string">&quot;on&quot;</span> + type, handler);
      } <span class="hljs-keyword">else</span> {
        element[<span class="hljs-string">&quot;on&quot;</span> + type] = handler;
      }
    }

    <span class="hljs-comment">// &#x5408;&#x5E76;&#x5BF9;&#x8C61;</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">extend</span>(<span class="hljs-params">o, n, override</span>) </span>{
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> p <span class="hljs-keyword">in</span> n) {
        <span class="hljs-keyword">if</span> (n.hasOwnProperty(p) &amp;&amp; (!o.hasOwnProperty(p) || override))
          o[p] = n[p];
      }
    }

    <span class="hljs-comment">// &#x8F6E;&#x64AD;-&#x6784;&#x9020;&#x51FD;&#x6570;</span>
    <span class="hljs-keyword">var</span> Carousel = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">selector, userOptions</span>) </span>{
      <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
      <span class="hljs-comment">// &#x5408;&#x5E76;&#x914D;&#x7F6E;</span>
      extend(<span class="hljs-keyword">this</span>.carouselOptions, userOptions, <span class="hljs-literal">true</span>);
      <span class="hljs-comment">// &#x83B7;&#x53D6;&#x8F6E;&#x64AD;&#x5143;&#x7D20;</span>
      _this.carousel = <span class="hljs-built_in">document</span>.querySelector(selector);
      <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x8F6E;&#x64AD;&#x5217;&#x8868;</span>
      _this.carousel.appendChild(_this.getImgs());
      <span class="hljs-comment">// &#x83B7;&#x53D6;&#x8F6E;&#x64AD;&#x5217;&#x8868;</span>
      _this.carouselWrap = <span class="hljs-built_in">document</span>.querySelector(ID.CAROUSEL_WRAP);
      <span class="hljs-comment">// &#x6BCF;&#x9694; 50ms &#x68C0;&#x6D4B;&#x4E00;&#x6B21;&#x8F6E;&#x64AD;&#x662F;&#x5426;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;</span>
      <span class="hljs-keyword">var</span> checkInterval = <span class="hljs-number">50</span>;
      <span class="hljs-keyword">var</span> checkTimer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// &#x68C0;&#x6D4B;&#x8F6E;&#x64AD;&#x662F;&#x5426;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;</span>
        <span class="hljs-keyword">if</span> (_this.isCarouselComplete()) {
          <span class="hljs-comment">// &#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#x540E;&#x6E05;&#x9664;&#x5B9A;&#x65F6;&#x5668;</span>
          clearInterval(checkTimer);
          <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x8F6E;&#x64AD;</span>
          _this.initCarousel();
          <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x5706;&#x70B9;</span>
          _this.initDots();
          <span class="hljs-comment">// &#x521D;&#x8BC6;&#x5316;&#x7BAD;&#x5934;</span>
          _this.initArrows();
        }
      }, checkInterval);
    };
    <span class="hljs-comment">// &#x8F6E;&#x64AD;-&#x539F;&#x578B;&#x5BF9;&#x8C61;</span>
    Carousel.prototype = {
      <span class="hljs-attr">carouselOptions</span>: {
        <span class="hljs-comment">// &#x662F;&#x5426;&#x663E;&#x793A;&#x8F6E;&#x64AD;&#x7BAD;&#x5934;</span>
        showCarouselArrow: <span class="hljs-literal">true</span>,
        <span class="hljs-comment">// &#x662F;&#x5426;&#x663E;&#x793A;&#x8F6E;&#x64AD;&#x5706;&#x70B9;</span>
        showCarouselDot: <span class="hljs-literal">true</span>,
        <span class="hljs-comment">// &#x8F6E;&#x64AD;&#x81EA;&#x52A8;&#x64AD;&#x653E;&#x95F4;&#x9694;</span>
        carouselInterval: <span class="hljs-number">3000</span>,
        <span class="hljs-comment">// &#x8F6E;&#x64AD;&#x52A8;&#x753B;&#x603B;&#x65F6;&#x95F4;</span>
        carouselAnimateTime: <span class="hljs-number">150</span>,
        <span class="hljs-comment">// &#x8F6E;&#x64AD;&#x52A8;&#x753B;&#x95F4;&#x9694;</span>
        carouselAnimateInterval: <span class="hljs-number">10</span>
      },
      <span class="hljs-attr">isCarouselComplete</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// &#x68C0;&#x6D4B;&#x9875;&#x9762;&#x56FE;&#x7247;&#x662F;&#x5426;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;</span>
        <span class="hljs-keyword">var</span> completeCount = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.carouselWrap.children.length; i++) {
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.carouselWrap.children[i].complete) {
            completeCount++;
          }
        }
        <span class="hljs-keyword">return</span> completeCount === <span class="hljs-keyword">this</span>.carouselWrap.children.length ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>;
      }
    };
    <span class="hljs-keyword">return</span> Carousel;
});</code></pre><p><code>addEvent()</code>&#x548C;<code>extend()</code>&#x51FD;&#x6570;&#x4E0A;&#x7BC7;&#x5DF2;&#x7ECF;&#x4ECB;&#x7ECD;&#x8FC7;&#x4E86;&#xFF0C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x5404;&#x79CD;&#x914D;&#x7F6E;&#x9879;&#x4E5F;&#x90FD;&#x662F;&#x9879;&#x76EE;&#x4E2D;&#x8981;&#x7528;&#x5230;&#x7684;&#xFF0C;&#x4E0D;&#x5FC5;&#x591A;&#x8BF4;&#x3002;&#x8FD9;&#x91CC;&#x7684;&#x91CD;&#x70B9;&#x662F;<code>checkTimer</code>&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x5B83;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x6BCF;&#x9694;&#x4E00;&#x5B9A;&#x65F6;&#x95F4;&#x53BB;&#x68C0;&#x67E5;&#x9875;&#x9762;&#x4E0A;&#x7684;&#x56FE;&#x7247;&#x5143;&#x7D20;&#x662F;&#x5426;&#x5168;&#x90E8;&#x52A0;&#x8F7D;&#x5B8C;&#x6BD5;&#xFF0C;&#x5982;&#x679C;&#x52A0;&#x8F7D;&#x5B8C;&#x6BD5;&#x518D;&#x8FDB;&#x884C;&#x9879;&#x76EE;&#x7684;&#x521D;&#x59CB;&#x5316;&#x3002;<br>&#x4E3A;&#x4EC0;&#x4E48;&#x9700;&#x8981;&#x8FD9;&#x4E48;&#x505A;&#x5462;&#xFF1F;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x7684;&#x56FE;&#x7247;&#x5143;&#x7D20;&#x662F;&#x5728;JS&#x4E2D;&#x4F7F;&#x7528;DOM&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x80FD;&#x4F1A;&#x51FA;&#x73B0;&#x56FE;&#x7247;&#x8FD8;&#x6CA1;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#x5C31;&#x6267;&#x884C;&#x4E86;JS&#x4E2D;&#x7684;&#x4E00;&#x4E9B;&#x903B;&#x8F91;&#x8BED;&#x53E5;&#xFF0C;&#x5BFC;&#x81F4;&#x4E0D;&#x80FD;&#x901A;&#x8FC7;DOM API&#x6B63;&#x786E;&#x83B7;&#x53D6;&#x5230;&#x56FE;&#x7247;&#x548C;&#x5BF9;&#x5E94;&#x5143;&#x7D20;&#x5C5E;&#x6027;&#x7684;&#x73B0;&#x8C61;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x5728;<code>isCarouselComplete()</code>&#x51FD;&#x6570;&#x4E2D;&#x6211;&#x4EEC;&#x5229;&#x7528;<code>img</code>&#x5143;&#x7D20;&#x7684;<code>complete</code>&#x5C5E;&#x6027;&#xFF0C;&#x5224;&#x65AD;&#x5F53;&#x524D;&#x9875;&#x9762;&#x4E0A;&#x7684;&#x6240;&#x6709;&#x56FE;&#x7247;&#x662F;&#x5426;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#xFF0C;&#x7136;&#x540E;&#x5C31;&#x80FD;&#x4FDD;&#x8BC1;DOM&#x5C5E;&#x6027;&#x7684;&#x6B63;&#x786E;&#x83B7;&#x53D6;&#x4E86;&#x3002;</p><h2 id="articleHeader3">&#x521D;&#x59CB;&#x5316;&#x8F6E;&#x64AD;</h2><p>&#x5B8C;&#x6210;<code>initCarousel()</code>&#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="initCarousel: function(selector, userOptions) {
    // &#x83B7;&#x53D6;&#x8F6E;&#x64AD;&#x6570;&#x91CF;
    this.carouselCount = this.carouselWrap.children.length;
    // &#x8BBE;&#x7F6E;&#x8F6E;&#x64AD;
    this.setCarousel();
    // &#x521D;&#x59CB;&#x5316;&#x8F6E;&#x64AD;&#x5E8F;&#x53F7;
    this.carouselIndex = 1;
    // &#x521D;&#x59CB;&#x5316;&#x5B9A;&#x65F6;&#x5668;
    this.carouselIntervalr = null;
    // &#x6BCF;&#x6B21;&#x4F4D;&#x79FB;&#x91CF; = &#x603B;&#x504F;&#x79FB;&#x91CF; / &#x6B21;&#x6570;
    this.carouselAnimateSpeed = this.carouselWidth / (this.carouselOptions.carouselAnimateTime / this.carouselOptions.carouselAnimateInterval);
    // &#x5224;&#x65AD;&#x662F;&#x5426;&#x5904;&#x4E8E;&#x8F6E;&#x64AD;&#x52A8;&#x753B;&#x72B6;&#x6001;
    this.isCarouselAnimate = false;
    // &#x5224;&#x65AD;&#x5706;&#x70B9;&#x662F;&#x5426;&#x70B9;&#x51FB;
    this.isDotClick = false;
    // &#x7ED1;&#x5B9A;&#x8F6E;&#x64AD;&#x56FE;&#x4E8B;&#x4EF6;
    this.bindCarousel();
    // &#x64AD;&#x653E;&#x8F6E;&#x64AD;
    this.playCarousel();
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">initCarousel: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">selector, userOptions</span>) </span>{
    <span class="hljs-comment">// &#x83B7;&#x53D6;&#x8F6E;&#x64AD;&#x6570;&#x91CF;</span>
    <span class="hljs-keyword">this</span>.carouselCount = <span class="hljs-keyword">this</span>.carouselWrap.children.length;
    <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x8F6E;&#x64AD;</span>
    <span class="hljs-keyword">this</span>.setCarousel();
    <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x8F6E;&#x64AD;&#x5E8F;&#x53F7;</span>
    <span class="hljs-keyword">this</span>.carouselIndex = <span class="hljs-number">1</span>;
    <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x5B9A;&#x65F6;&#x5668;</span>
    <span class="hljs-keyword">this</span>.carouselIntervalr = <span class="hljs-literal">null</span>;
    <span class="hljs-comment">// &#x6BCF;&#x6B21;&#x4F4D;&#x79FB;&#x91CF; = &#x603B;&#x504F;&#x79FB;&#x91CF; / &#x6B21;&#x6570;</span>
    <span class="hljs-keyword">this</span>.carouselAnimateSpeed = <span class="hljs-keyword">this</span>.carouselWidth / (<span class="hljs-keyword">this</span>.carouselOptions.carouselAnimateTime / <span class="hljs-keyword">this</span>.carouselOptions.carouselAnimateInterval);
    <span class="hljs-comment">// &#x5224;&#x65AD;&#x662F;&#x5426;&#x5904;&#x4E8E;&#x8F6E;&#x64AD;&#x52A8;&#x753B;&#x72B6;&#x6001;</span>
    <span class="hljs-keyword">this</span>.isCarouselAnimate = <span class="hljs-literal">false</span>;
    <span class="hljs-comment">// &#x5224;&#x65AD;&#x5706;&#x70B9;&#x662F;&#x5426;&#x70B9;&#x51FB;</span>
    <span class="hljs-keyword">this</span>.isDotClick = <span class="hljs-literal">false</span>;
    <span class="hljs-comment">// &#x7ED1;&#x5B9A;&#x8F6E;&#x64AD;&#x56FE;&#x4E8B;&#x4EF6;</span>
    <span class="hljs-keyword">this</span>.bindCarousel();
    <span class="hljs-comment">// &#x64AD;&#x653E;&#x8F6E;&#x64AD;</span>
    <span class="hljs-keyword">this</span>.playCarousel();
}</code></pre><p>&#x901A;&#x8FC7;<code>this.carouselWidth / (this.carouselOptions.carouselAnimateTime / this.carouselOptions.carouselAnimateInterval)</code>&#x8FD9;&#x4E2A;&#x516C;&#x5F0F;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA1;&#x7B97;&#x51FA;&#x6BCF;&#x6B21;&#x8F6E;&#x64AD;&#x52A8;&#x753B;&#x4F4D;&#x79FB;&#x7684;&#x504F;&#x79FB;&#x91CF;&#xFF0C;&#x540E;&#x9762;&#x5B8C;&#x6210;&#x52A8;&#x753B;&#x51FD;&#x6570;&#x65F6;&#x4F1A;&#x7528;&#x5230;&#x3002;</p><p>&#x5728;<code>setCarousel()</code>&#x91CC;&#x8FDB;&#x884C;&#x8F6E;&#x64AD;&#x57FA;&#x672C;&#x5C5E;&#x6027;&#x7684;&#x8BBE;&#x7F6E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setCarousel: function () {
    // &#x590D;&#x5236;&#x9996;&#x5C3E;&#x8282;&#x70B9;
    var first = this.carouselWrap.children[0].cloneNode(true);
    var last = this.carouselWrap.children[this.carouselCount - 1].cloneNode(true);
    // &#x6DFB;&#x52A0;&#x8FC7;&#x6E21;&#x5143;&#x7D20;
    this.carouselWrap.insertBefore(last, this.carouselWrap.children[0]);
    this.carouselWrap.appendChild(first);
    // &#x8BBE;&#x7F6E;&#x8F6E;&#x64AD;&#x5BBD;&#x5EA6;
    this.setWidth(this.carousel, this.carouselOptions.carouselWidth);
    // &#x8BBE;&#x7F6E;&#x8F6E;&#x64AD;&#x9AD8;&#x5EA6;
    this.setHeight(this.carousel, this.carouselOptions.carouselHeight);
    // &#x83B7;&#x53D6;&#x8F6E;&#x64AD;&#x5BBD;&#x5EA6;
    this.carouselWidth = this.getWidth(this.carousel);
    // &#x8BBE;&#x7F6E;&#x521D;&#x59CB;&#x4F4D;&#x7F6E;
    this.setLeft(this.carouselWrap, -this.carouselWidth);
    // &#x8BBE;&#x7F6E;&#x8F6E;&#x64AD;&#x957F;&#x5EA6;
    this.setWidth(this.carouselWrap, this.carouselWidth * this.carouselWrap.children.length);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">setCarousel: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// &#x590D;&#x5236;&#x9996;&#x5C3E;&#x8282;&#x70B9;</span>
    <span class="hljs-keyword">var</span> first = <span class="hljs-keyword">this</span>.carouselWrap.children[<span class="hljs-number">0</span>].cloneNode(<span class="hljs-literal">true</span>);
    <span class="hljs-keyword">var</span> last = <span class="hljs-keyword">this</span>.carouselWrap.children[<span class="hljs-keyword">this</span>.carouselCount - <span class="hljs-number">1</span>].cloneNode(<span class="hljs-literal">true</span>);
    <span class="hljs-comment">// &#x6DFB;&#x52A0;&#x8FC7;&#x6E21;&#x5143;&#x7D20;</span>
    <span class="hljs-keyword">this</span>.carouselWrap.insertBefore(last, <span class="hljs-keyword">this</span>.carouselWrap.children[<span class="hljs-number">0</span>]);
    <span class="hljs-keyword">this</span>.carouselWrap.appendChild(first);
    <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x8F6E;&#x64AD;&#x5BBD;&#x5EA6;</span>
    <span class="hljs-keyword">this</span>.setWidth(<span class="hljs-keyword">this</span>.carousel, <span class="hljs-keyword">this</span>.carouselOptions.carouselWidth);
    <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x8F6E;&#x64AD;&#x9AD8;&#x5EA6;</span>
    <span class="hljs-keyword">this</span>.setHeight(<span class="hljs-keyword">this</span>.carousel, <span class="hljs-keyword">this</span>.carouselOptions.carouselHeight);
    <span class="hljs-comment">// &#x83B7;&#x53D6;&#x8F6E;&#x64AD;&#x5BBD;&#x5EA6;</span>
    <span class="hljs-keyword">this</span>.carouselWidth = <span class="hljs-keyword">this</span>.getWidth(<span class="hljs-keyword">this</span>.carousel);
    <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x521D;&#x59CB;&#x4F4D;&#x7F6E;</span>
    <span class="hljs-keyword">this</span>.setLeft(<span class="hljs-keyword">this</span>.carouselWrap, -<span class="hljs-keyword">this</span>.carouselWidth);
    <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x8F6E;&#x64AD;&#x957F;&#x5EA6;</span>
    <span class="hljs-keyword">this</span>.setWidth(<span class="hljs-keyword">this</span>.carouselWrap, <span class="hljs-keyword">this</span>.carouselWidth * <span class="hljs-keyword">this</span>.carouselWrap.children.length);
}</code></pre><p>&#x6DFB;&#x52A0;&#x9996;&#x5C3E;&#x7684;&#x8FC7;&#x6E21;&#x5143;&#x7D20;&#x3001;&#x8BBE;&#x7F6E;&#x9AD8;&#x5EA6;&#x5BBD;&#x5EA6;&#x7B49;&#x3002;</p><h2 id="articleHeader4">&#x7ED1;&#x5B9A;&#x8F6E;&#x64AD;&#x4E8B;&#x4EF6;</h2><p>&#x7136;&#x540E;&#x662F;&#x9F20;&#x6807;&#x79FB;&#x5165;&#x79FB;&#x51FA;&#x4E8B;&#x4EF6;&#x7684;&#x7ED1;&#x5B9A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="playCarousel: function () {
    var _this = this;
    this.carouselIntervalr = window.setInterval(function() {
        _this.nextCarousel();
    }, this.carouselOptions.carouselInterval);
},
bindCarousel: function () {
    var _this = this;
    // &#x9F20;&#x6807;&#x79FB;&#x5165;&#x79FB;&#x51FA;&#x4E8B;&#x4EF6;
    addEvent(this.carousel, &apos;mouseenter&apos;, function(e) {
        clearInterval(_this.carouselIntervalr);
    });
    addEvent(this.carousel, &apos;mouseleave&apos;, function(e) {
        _this.playCarousel();
    });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">playCarousel: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">this</span>.carouselIntervalr = <span class="hljs-built_in">window</span>.setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        _this.nextCarousel();
    }, <span class="hljs-keyword">this</span>.carouselOptions.carouselInterval);
},
<span class="hljs-attr">bindCarousel</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
    <span class="hljs-comment">// &#x9F20;&#x6807;&#x79FB;&#x5165;&#x79FB;&#x51FA;&#x4E8B;&#x4EF6;</span>
    addEvent(<span class="hljs-keyword">this</span>.carousel, <span class="hljs-string">&apos;mouseenter&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        clearInterval(_this.carouselIntervalr);
    });
    addEvent(<span class="hljs-keyword">this</span>.carousel, <span class="hljs-string">&apos;mouseleave&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        _this.playCarousel();
    });
}</code></pre><p>&#x79FB;&#x5165;&#x65F6;&#x505C;&#x6B62;&#x8F6E;&#x64AD;&#x64AD;&#x653E;&#x7684;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x79FB;&#x51FA;&#x540E;&#x81EA;&#x52A8;&#x5F00;&#x59CB;&#x4E0B;&#x4E00;&#x5F20;&#x7684;&#x64AD;&#x653E;&#x3002;</p><p>&#x5B8C;&#x6210;<code>nextCarousel()</code>&#x548C;<code>prevCarousel()</code>&#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="prevCarousel: function () {
    if (!this.isCarouselAnimate) {
        // &#x6539;&#x53D8;&#x8F6E;&#x64AD;&#x5E8F;&#x53F7;
        this.carouselIndex--;
        if (this.carouselIndex &lt; 1) {
            this.carouselIndex = this.carouselCount;
        }
        // &#x8BBE;&#x7F6E;&#x8F6E;&#x64AD;&#x4F4D;&#x7F6E;
        this.moveCarousel(this.isFirstCarousel(), this.carouselWidth);
        if (this.carouselOptions.showCarouselDot) {
            // &#x663E;&#x793A;&#x5F53;&#x524D;&#x5706;&#x70B9;
            this.setDot();
        }
    }
},
nextCarousel: function () {
    if (!this.isCarouselAnimate) {
        this.carouselIndex++;
        if (this.carouselIndex &gt; this.carouselCount) {
            this.carouselIndex = 1;
        }
        this.moveCarousel(this.isLastCarousel(), -this.carouselWidth);
        if (this.carouselOptions.showCarouselDot) {
            // &#x663E;&#x793A;&#x5F53;&#x524D;&#x5706;&#x70B9;
            this.setDot();
        }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">prevCarousel: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.isCarouselAnimate) {
        <span class="hljs-comment">// &#x6539;&#x53D8;&#x8F6E;&#x64AD;&#x5E8F;&#x53F7;</span>
        <span class="hljs-keyword">this</span>.carouselIndex--;
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.carouselIndex &lt; <span class="hljs-number">1</span>) {
            <span class="hljs-keyword">this</span>.carouselIndex = <span class="hljs-keyword">this</span>.carouselCount;
        }
        <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x8F6E;&#x64AD;&#x4F4D;&#x7F6E;</span>
        <span class="hljs-keyword">this</span>.moveCarousel(<span class="hljs-keyword">this</span>.isFirstCarousel(), <span class="hljs-keyword">this</span>.carouselWidth);
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.carouselOptions.showCarouselDot) {
            <span class="hljs-comment">// &#x663E;&#x793A;&#x5F53;&#x524D;&#x5706;&#x70B9;</span>
            <span class="hljs-keyword">this</span>.setDot();
        }
    }
},
<span class="hljs-attr">nextCarousel</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.isCarouselAnimate) {
        <span class="hljs-keyword">this</span>.carouselIndex++;
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.carouselIndex &gt; <span class="hljs-keyword">this</span>.carouselCount) {
            <span class="hljs-keyword">this</span>.carouselIndex = <span class="hljs-number">1</span>;
        }
        <span class="hljs-keyword">this</span>.moveCarousel(<span class="hljs-keyword">this</span>.isLastCarousel(), -<span class="hljs-keyword">this</span>.carouselWidth);
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.carouselOptions.showCarouselDot) {
            <span class="hljs-comment">// &#x663E;&#x793A;&#x5F53;&#x524D;&#x5706;&#x70B9;</span>
            <span class="hljs-keyword">this</span>.setDot();
        }
    }
}</code></pre><p>&#x529F;&#x80FD;&#x662F;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x6539;&#x53D8;&#x8F6E;&#x64AD;&#x5E8F;&#x53F7;&#xFF0C;&#x7136;&#x540E;&#x8FDB;&#x884C;&#x8F6E;&#x64AD;&#x7684;&#x79FB;&#x52A8;&#x3002;&#x5728;<code>moveCarousel()</code>&#x4E2D;&#x5B8C;&#x6210;&#x5BF9;&#x8FC7;&#x6E21;&#x5143;&#x7D20;&#x7684;&#x5904;&#x7406;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="moveCarousel: function (status, carouselWidth) {
    var left = 0;
    if (status) {
        left = -this.carouselIndex * this.carouselWidth;
    } else {
        left = this.getLeft(this.carouselWrap) + carouselWidth;
    }
    this.setLeft(this.carouselWrap, left);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">moveCarousel: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">status, carouselWidth</span>) </span>{
    <span class="hljs-keyword">var</span> left = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">if</span> (status) {
        left = -<span class="hljs-keyword">this</span>.carouselIndex * <span class="hljs-keyword">this</span>.carouselWidth;
    } <span class="hljs-keyword">else</span> {
        left = <span class="hljs-keyword">this</span>.getLeft(<span class="hljs-keyword">this</span>.carouselWrap) + carouselWidth;
    }
    <span class="hljs-keyword">this</span>.setLeft(<span class="hljs-keyword">this</span>.carouselWrap, left);
}</code></pre><p>&#x8F6E;&#x64AD;&#x76F8;&#x5173;&#x5C5E;&#x6027;&#x548C;&#x4E8B;&#x4EF6;&#x7684;&#x8BBE;&#x7F6E;&#x5C31;&#x5B8C;&#x6210;&#x4E86;&#x3002;</p><h2 id="articleHeader5">&#x7ED1;&#x5B9A;&#x5706;&#x70B9;&#x4E8B;&#x4EF6;</h2><p>&#x63A5;&#x4E0B;&#x6765;&#x662F;&#x5C0F;&#x5706;&#x70B9;&#x7684;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bindDots: function () {
    var _this = this;
    for (var i = 0, len = this.carouselDots.children.length; i &lt; len; i++) {
        (function(i) {
            addEvent(_this.carouselDots.children[i], &apos;click&apos;, function (ev) {
                // &#x83B7;&#x53D6;&#x70B9;&#x51FB;&#x7684;&#x5706;&#x70B9;&#x5E8F;&#x53F7;
                _this.dotIndex = i + 1;
                if (!_this.isCarouselAnimate &amp;&amp; _this.carouselIndex !== _this.dotIndex) {
                // &#x6539;&#x53D8;&#x5706;&#x70B9;&#x70B9;&#x51FB;&#x72B6;&#x6001;
                _this.isDotClick = true;
                // &#x6539;&#x53D8;&#x5706;&#x70B9;&#x4F4D;&#x7F6E;
                _this.moveDot();
                }
            });
        })(i);
    }
},
moveDot: function () {
    // &#x6539;&#x53D8;&#x5F53;&#x524D;&#x8F6E;&#x64AD;&#x5E8F;&#x53F7;
    this.carouselIndex = this.dotIndex;
    // &#x8BBE;&#x7F6E;&#x8F6E;&#x64AD;&#x4F4D;&#x7F6E;
    this.setLeft(this.carouselWrap, -this.carouselIndex * this.carouselWidth);
    // &#x91CD;&#x8BBE;&#x5F53;&#x524D;&#x5706;&#x70B9;&#x6837;&#x5F0F;
    this.setDot();
},
setDot: function () {
    for (var i = 0, len = this.carouselDots.children.length; i &lt; len; i++) {
        this.carouselDots.children[i].setAttribute(&apos;class&apos;, CLASS.CAROUSEL_DOT);
    }
    this.carouselDots.children[this.carouselIndex - 1].setAttribute(&apos;class&apos;, CLASS.CAROUSEL_DOT_ON);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">bindDots: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = <span class="hljs-keyword">this</span>.carouselDots.children.length; i &lt; len; i++) {
        (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i</span>) </span>{
            addEvent(_this.carouselDots.children[i], <span class="hljs-string">&apos;click&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ev</span>) </span>{
                <span class="hljs-comment">// &#x83B7;&#x53D6;&#x70B9;&#x51FB;&#x7684;&#x5706;&#x70B9;&#x5E8F;&#x53F7;</span>
                _this.dotIndex = i + <span class="hljs-number">1</span>;
                <span class="hljs-keyword">if</span> (!_this.isCarouselAnimate &amp;&amp; _this.carouselIndex !== _this.dotIndex) {
                <span class="hljs-comment">// &#x6539;&#x53D8;&#x5706;&#x70B9;&#x70B9;&#x51FB;&#x72B6;&#x6001;</span>
                _this.isDotClick = <span class="hljs-literal">true</span>;
                <span class="hljs-comment">// &#x6539;&#x53D8;&#x5706;&#x70B9;&#x4F4D;&#x7F6E;</span>
                _this.moveDot();
                }
            });
        })(i);
    }
},
<span class="hljs-attr">moveDot</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// &#x6539;&#x53D8;&#x5F53;&#x524D;&#x8F6E;&#x64AD;&#x5E8F;&#x53F7;</span>
    <span class="hljs-keyword">this</span>.carouselIndex = <span class="hljs-keyword">this</span>.dotIndex;
    <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x8F6E;&#x64AD;&#x4F4D;&#x7F6E;</span>
    <span class="hljs-keyword">this</span>.setLeft(<span class="hljs-keyword">this</span>.carouselWrap, -<span class="hljs-keyword">this</span>.carouselIndex * <span class="hljs-keyword">this</span>.carouselWidth);
    <span class="hljs-comment">// &#x91CD;&#x8BBE;&#x5F53;&#x524D;&#x5706;&#x70B9;&#x6837;&#x5F0F;</span>
    <span class="hljs-keyword">this</span>.setDot();
},
<span class="hljs-attr">setDot</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = <span class="hljs-keyword">this</span>.carouselDots.children.length; i &lt; len; i++) {
        <span class="hljs-keyword">this</span>.carouselDots.children[i].setAttribute(<span class="hljs-string">&apos;class&apos;</span>, CLASS.CAROUSEL_DOT);
    }
    <span class="hljs-keyword">this</span>.carouselDots.children[<span class="hljs-keyword">this</span>.carouselIndex - <span class="hljs-number">1</span>].setAttribute(<span class="hljs-string">&apos;class&apos;</span>, CLASS.CAROUSEL_DOT_ON);
}</code></pre><p>&#x529F;&#x80FD;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x70B9;&#x51FB;&#x5706;&#x70B9;&#x540E;&#xFF0C;&#x8DF3;&#x8F6C;&#x5230;&#x5BF9;&#x5E94;&#x5E8F;&#x53F7;&#x7684;&#x8F6E;&#x64AD;&#x56FE;&#xFF0C;&#x5E76;&#x91CD;&#x8BBE;&#x5C0F;&#x5706;&#x70B9;&#x6837;&#x5F0F;&#x3002;</p><h2 id="articleHeader6">&#x7ED1;&#x5B9A;&#x7BAD;&#x5934;&#x4E8B;&#x4EF6;</h2><p>&#x6700;&#x540E;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x7ED1;&#x5B9A;&#x7BAD;&#x5934;&#x4E8B;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bindArrows: function () {
    var _this = this;
    // &#x7BAD;&#x5934;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;
    addEvent(this.arrowLeft, &apos;click&apos;, function(e) {
        _this.prevCarousel();
    });
    addEvent(this.arrowRight, &apos;click&apos;, function(e) {
        _this.nextCarousel();
    });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">bindArrows: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
    <span class="hljs-comment">// &#x7BAD;&#x5934;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;</span>
    addEvent(<span class="hljs-keyword">this</span>.arrowLeft, <span class="hljs-string">&apos;click&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        _this.prevCarousel();
    });
    addEvent(<span class="hljs-keyword">this</span>.arrowRight, <span class="hljs-string">&apos;click&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        _this.nextCarousel();
    });
}</code></pre><p>&#x8FD9;&#x6837;&#xFF0C;&#x4E00;&#x4E2A;&#x6CA1;&#x6709;&#x52A8;&#x753B;&#x7684;&#x65E0;&#x7F1D;&#x8F6E;&#x64AD;&#x6548;&#x679C;&#x5C31;&#x5B8C;&#x6210;&#x4E86;&#xFF0C;&#x89C1;&#x4E0B;&#x56FE;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000015976695?w=900&amp;h=600" src="https://static.alili.tech/img/remote/1460000015976695?w=900&amp;h=600" alt="carousel-test" title="carousel-test" style="cursor:pointer"></span></p><h2 id="articleHeader7">&#x5B9E;&#x73B0;&#x52A8;&#x753B;&#x6548;&#x679C;</h2><p>&#x4E0A;&#x4E00;&#x8282;&#x6211;&#x4EEC;&#x5206;&#x6790;&#x540E;&#x7684;&#x601D;&#x8DEF;&#x57FA;&#x672C;&#x662F;&#x5B9E;&#x73B0;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x8F6E;&#x64AD;&#x5207;&#x6362;&#x65F6;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#x53C8;&#x8BE5;&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#x5462;&#xFF1F;</p><p>&#x65E2;&#x7136;&#x8981;&#x5B9E;&#x73B0;&#x52A8;&#x753B;&#xFF0C;&#x90A3;&#x6211;&#x4EEC;&#x5148;&#x8981;&#x627E;&#x5230;&#x4EA7;&#x751F;&#x52A8;&#x753B;&#x7684;&#x6E90;&#x5934;&#x2014;&#x2014;&#x5373;&#x8BA9;&#x8F6E;&#x64AD;&#x53D1;&#x751F;&#x5207;&#x6362;&#x7684;<code>moveCarousel()</code>&#x51FD;&#x6570;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5148;&#x5BF9;&#x5B83;&#x8FDB;&#x884C;&#x4FEE;&#x6539;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="moveCarousel: function (target, speed) {
    var _this = this;
    _this.isCarouselAnimate = true;
    function animateCarousel () {
        if ((speed &gt; 0 &amp;&amp; _this.getLeft(_this.carouselWrap) &lt; target) ||
            (speed &lt; 0 &amp;&amp; _this.getLeft(_this.carouselWrap) &gt; target)) {
        _this.setLeft(_this.carouselWrap, _this.getLeft(_this.carouselWrap) + speed);
        timer = window.setTimeout(animateCarousel, _this.carouselOptions.carouselAnimateInterval);
        } else {
        window.clearTimeout(timer);
        // &#x91CD;&#x7F6E;&#x8F6E;&#x64AD;&#x72B6;&#x6001;
        _this.resetCarousel(target, speed);
        }
    }
    var timer = animateCarousel();
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">moveCarousel: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">target, speed</span>) </span>{
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
    _this.isCarouselAnimate = <span class="hljs-literal">true</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">animateCarousel</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> ((speed &gt; <span class="hljs-number">0</span> &amp;&amp; _this.getLeft(_this.carouselWrap) &lt; target) ||
            (speed &lt; <span class="hljs-number">0</span> &amp;&amp; _this.getLeft(_this.carouselWrap) &gt; target)) {
        _this.setLeft(_this.carouselWrap, _this.getLeft(_this.carouselWrap) + speed);
        timer = <span class="hljs-built_in">window</span>.setTimeout(animateCarousel, _this.carouselOptions.carouselAnimateInterval);
        } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">window</span>.clearTimeout(timer);
        <span class="hljs-comment">// &#x91CD;&#x7F6E;&#x8F6E;&#x64AD;&#x72B6;&#x6001;</span>
        _this.resetCarousel(target, speed);
        }
    }
    <span class="hljs-keyword">var</span> timer = animateCarousel();
}</code></pre><p>&#x6539;&#x9020;&#x4E4B;&#x540E;&#x7684;<code>moveCarousel()</code>&#x51FD;&#x6570;&#x63A5;&#x53D7;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;<code>target</code>&#x8868;&#x793A;&#x8981;&#x79FB;&#x52A8;&#x5230;&#x7684;&#x8F6E;&#x64AD;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;<code>speed</code>&#x5373;&#x4E3A;&#x6211;&#x4EEC;&#x524D;&#x9762;&#x8BA1;&#x7B97;&#x51FA;&#x7684;&#x90A3;&#x4E2A;&#x504F;&#x79FB;&#x91CF;&#x7684;&#x503C;&#x3002;&#x7136;&#x540E;&#x901A;&#x8FC7;<code>animateCarousel()</code>&#x51FD;&#x6570;&#x8FDB;&#x884C;<code>setTimeout()</code>&#x7684;&#x9012;&#x5F52;&#x8C03;&#x7528;&#xFF0C;&#x6A21;&#x62DF;&#x51FA;&#x4E00;&#x79CD;&#x5B9A;&#x65F6;&#x5668;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x5F53;&#x5224;&#x65AD;&#x672A;&#x5230;&#x8FBE;&#x76EE;&#x6807;&#x4F4D;&#x7F6E;&#x65F6;&#x7EE7;&#x7EED;&#x9012;&#x5F52;&#xFF0C;&#x5982;&#x679C;&#x5230;&#x8FBE;&#x540E;&#x5C31;&#x91CD;&#x7F6E;&#x8F6E;&#x64AD;&#x72B6;&#x6001;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4E0D;&#x7B26;&#x5408;&#x4F4D;&#x79FB;&#x6761;&#x4EF6;&#xFF0C;&#x628A;&#x5F53;&#x524D;left&#x503C;&#x7F6E;&#x4E3A;&#x76EE;&#x6807;&#x503C;
this.setLeft(this.carouselWrap, target);
//&#x5982;&#x5F53;&#x524D;&#x5728;&#x8F85;&#x52A9;&#x56FE;&#x4E0A;&#xFF0C;&#x5C31;&#x5F52;&#x4F4D;&#x5230;&#x771F;&#x7684;&#x56FE;&#x4E0A;
if (target &gt; -this.carouselWidth ) {
    this.setLeft(this.carouselWrap, -this.carouselCount * this.carouselWidth);
}
if (target &lt; (-this.carouselWidth * this.carouselCount)) {
    this.setLeft(this.carouselWrap, -this.carouselWidth);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x4E0D;&#x7B26;&#x5408;&#x4F4D;&#x79FB;&#x6761;&#x4EF6;&#xFF0C;&#x628A;&#x5F53;&#x524D;left&#x503C;&#x7F6E;&#x4E3A;&#x76EE;&#x6807;&#x503C;</span>
<span class="hljs-keyword">this</span>.setLeft(<span class="hljs-keyword">this</span>.carouselWrap, target);
<span class="hljs-comment">//&#x5982;&#x5F53;&#x524D;&#x5728;&#x8F85;&#x52A9;&#x56FE;&#x4E0A;&#xFF0C;&#x5C31;&#x5F52;&#x4F4D;&#x5230;&#x771F;&#x7684;&#x56FE;&#x4E0A;</span>
<span class="hljs-keyword">if</span> (target &gt; -<span class="hljs-keyword">this</span>.carouselWidth ) {
    <span class="hljs-keyword">this</span>.setLeft(<span class="hljs-keyword">this</span>.carouselWrap, -<span class="hljs-keyword">this</span>.carouselCount * <span class="hljs-keyword">this</span>.carouselWidth);
}
<span class="hljs-keyword">if</span> (target &lt; (-<span class="hljs-keyword">this</span>.carouselWidth * <span class="hljs-keyword">this</span>.carouselCount)) {
    <span class="hljs-keyword">this</span>.setLeft(<span class="hljs-keyword">this</span>.carouselWrap, -<span class="hljs-keyword">this</span>.carouselWidth);
}</code></pre><p>&#x91CD;&#x7F6E;&#x7684;&#x8FC7;&#x7A0B;&#x548C;&#x524D;&#x9762;&#x7684;&#x5B9E;&#x73B0;&#x662F;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x4E0D;&#x518D;&#x8D58;&#x8FF0;&#x3002;&#x5B8C;&#x6210;&#x65B0;&#x7684;<code>moveCarousel()</code>&#x51FD;&#x6570;&#x4E4B;&#x540E;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x5BF9;<code>prevCarousel()</code>&#x53CA;<code>nextCarousel()</code>&#x8FDB;&#x884C;&#x6539;&#x9020;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="prevCarousel: function () {
    if (!this.isCarouselAnimate) {
        // &#x6539;&#x53D8;&#x8F6E;&#x64AD;&#x5E8F;&#x53F7;
        this.carouselIndex--;
        if (this.carouselIndex &lt; 1) {
            this.carouselIndex = this.carouselCount;
        }
        // &#x8BBE;&#x7F6E;&#x8F6E;&#x64AD;&#x4F4D;&#x7F6E;
        this.moveCarousel(this.getLeft(this.carouselWrap) + this.carouselWidth, this.carouselAnimateSpeed);
        if (this.carouselOptions.showCarouselDot) {
            // &#x663E;&#x793A;&#x5F53;&#x524D;&#x5706;&#x70B9;
            this.setDot();
        }
    }
},
nextCarousel: function () {
    if (!this.isCarouselAnimate) {
        this.carouselIndex++;
        if (this.carouselIndex &gt; this.carouselCount) {
            this.carouselIndex = 1;
        }
        this.moveCarousel(this.getLeft(this.carouselWrap) - this.carouselWidth,  -this.carouselAnimateSpeed);
        if (this.carouselOptions.showCarouselDot) {
            // &#x663E;&#x793A;&#x5F53;&#x524D;&#x5706;&#x70B9;
            this.setDot();
        }
    }
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">prevCarousel: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.isCarouselAnimate) {
        <span class="hljs-comment">// &#x6539;&#x53D8;&#x8F6E;&#x64AD;&#x5E8F;&#x53F7;</span>
        <span class="hljs-keyword">this</span>.carouselIndex--;
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.carouselIndex &lt; <span class="hljs-number">1</span>) {
            <span class="hljs-keyword">this</span>.carouselIndex = <span class="hljs-keyword">this</span>.carouselCount;
        }
        <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x8F6E;&#x64AD;&#x4F4D;&#x7F6E;</span>
        <span class="hljs-keyword">this</span>.moveCarousel(<span class="hljs-keyword">this</span>.getLeft(<span class="hljs-keyword">this</span>.carouselWrap) + <span class="hljs-keyword">this</span>.carouselWidth, <span class="hljs-keyword">this</span>.carouselAnimateSpeed);
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.carouselOptions.showCarouselDot) {
            <span class="hljs-comment">// &#x663E;&#x793A;&#x5F53;&#x524D;&#x5706;&#x70B9;</span>
            <span class="hljs-keyword">this</span>.setDot();
        }
    }
},
<span class="hljs-attr">nextCarousel</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.isCarouselAnimate) {
        <span class="hljs-keyword">this</span>.carouselIndex++;
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.carouselIndex &gt; <span class="hljs-keyword">this</span>.carouselCount) {
            <span class="hljs-keyword">this</span>.carouselIndex = <span class="hljs-number">1</span>;
        }
        <span class="hljs-keyword">this</span>.moveCarousel(<span class="hljs-keyword">this</span>.getLeft(<span class="hljs-keyword">this</span>.carouselWrap) - <span class="hljs-keyword">this</span>.carouselWidth,  -<span class="hljs-keyword">this</span>.carouselAnimateSpeed);
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.carouselOptions.showCarouselDot) {
            <span class="hljs-comment">// &#x663E;&#x793A;&#x5F53;&#x524D;&#x5706;&#x70B9;</span>
            <span class="hljs-keyword">this</span>.setDot();
        }
    }
},</code></pre><p>&#x5176;&#x5B9E;&#x5C31;&#x66FF;&#x6362;&#x4E86;&#x4E00;&#x4E0B;<code>moveCarousel()</code>&#x8C03;&#x7528;&#x7684;&#x53C2;&#x6570;&#x800C;&#x5DF2;&#x3002;&#x5B8C;&#x6210;&#x8FD9;&#x51E0;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x6539;&#x9020;&#x540E;&#xFF0C;&#x52A8;&#x753B;&#x6548;&#x679C;&#x521D;&#x6B65;&#x5B9E;&#x73B0;&#x4E86;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000015976696?w=900&amp;h=600" src="https://static.alili.tech/img/remote/1460000015976696?w=900&amp;h=600" alt="carousel-test1" title="carousel-test1" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader8">&#x4F18;&#x5316;&#x52A8;&#x753B;&#x6548;&#x679C;</h2><p>&#x5728;&#x9875;&#x9762;&#x4E0A;&#x8FDB;&#x884C;&#x5B9E;&#x9645;&#x6D4B;&#x8BD5;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x80FD;&#x5076;&#x5C14;&#x4F1A;&#x53D1;&#x73B0;&#x6709;&#x5361;&#x987F;&#x7684;&#x60C5;&#x51B5;&#x51FA;&#x73B0;&#xFF0C;&#x8FD9;&#x4E3B;&#x8981;&#x662F;&#x56E0;&#x4E3A;&#x7528;<code>setTimeout()</code>&#x9012;&#x5F52;&#x540E;&#x6A21;&#x62DF;&#x52A8;&#x753B;&#x7684;&#x65F6;&#x5019;&#x4EA7;&#x751F;&#x7684;&#xFF08;&#x76F4;&#x63A5;&#x7528;<code>setInterval()</code>&#x540C;&#x6837;&#x4F1A;&#x51FA;&#x73B0;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#xFF09;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7528;<code>requestAnimationFrame</code>&#x8FD9;&#x4E2A;HTML5&#x7684;&#x65B0;API&#x8FDB;&#x884C;&#x52A8;&#x753B;&#x6548;&#x7387;&#x7684;&#x4F18;&#x5316;&#xFF0C;&#x518D;&#x6B21;&#x6539;&#x9020;<code>moveCarousel()</code>&#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="moveCarousel: function (target, speed) {
    var _this = this;
    _this.isCarouselAnimate = true;
    function animateCarousel () {
        if ((speed &gt; 0 &amp;&amp; _this.getLeft(_this.carouselWrap) &lt; target) ||
            (speed &lt; 0 &amp;&amp; _this.getLeft(_this.carouselWrap) &gt; target)) {
            _this.setLeft(_this.carouselWrap, _this.getLeft(_this.carouselWrap) + speed);
            timer = window.requestAnimationFrame(animateCarousel);
        } else {
            window.cancelAnimationFrame(timer);
            // &#x91CD;&#x7F6E;&#x8F6E;&#x64AD;&#x72B6;&#x6001;
            _this.resetCarousel(target, speed);
        }
    }
    var timer = window.requestAnimationFrame(animateCarousel);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">moveCarousel: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">target, speed</span>) </span>{
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
    _this.isCarouselAnimate = <span class="hljs-literal">true</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">animateCarousel</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> ((speed &gt; <span class="hljs-number">0</span> &amp;&amp; _this.getLeft(_this.carouselWrap) &lt; target) ||
            (speed &lt; <span class="hljs-number">0</span> &amp;&amp; _this.getLeft(_this.carouselWrap) &gt; target)) {
            _this.setLeft(_this.carouselWrap, _this.getLeft(_this.carouselWrap) + speed);
            timer = <span class="hljs-built_in">window</span>.requestAnimationFrame(animateCarousel);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">window</span>.cancelAnimationFrame(timer);
            <span class="hljs-comment">// &#x91CD;&#x7F6E;&#x8F6E;&#x64AD;&#x72B6;&#x6001;</span>
            _this.resetCarousel(target, speed);
        }
    }
    <span class="hljs-keyword">var</span> timer = <span class="hljs-built_in">window</span>.requestAnimationFrame(animateCarousel);
}</code></pre><p>&#x4E24;&#x79CD;&#x65B9;&#x6CD5;&#x7684;&#x8C03;&#x7528;&#x65B9;&#x5F0F;&#x662F;&#x7C7B;&#x4F3C;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x5B9E;&#x9645;&#x770B;&#x8D77;&#x6765;&#xFF0C;&#x52A8;&#x753B;&#x5374;&#x6D41;&#x7545;&#x4E86;&#x4E0D;&#x5C11;&#xFF0C;&#x6700;&#x91CD;&#x8981;&#x7684;&#xFF0C;&#x5B83;&#x8BA9;&#x6211;&#x4EEC;&#x52A8;&#x753B;&#x7684;&#x6548;&#x7387;&#x5F97;&#x5230;&#x4E86;&#x5F88;&#x5927;&#x63D0;&#x5347;&#x3002;</p><p>&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x5F00;&#x53D1;&#x5C31;&#x7ED3;&#x675F;&#x4E86;&#x5417;&#xFF1F;<br>&#x7528;&#x4E0A;&#x9762;&#x7684;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x5B8C;&#x52A8;&#x753B;&#x540E;&#xFF0C;&#x5F53;&#x4F60;&#x70B9;&#x51FB;&#x5706;&#x70B9;&#x65F6;&#xFF0C;&#x8F6E;&#x64AD;&#x7684;&#x5207;&#x6362;&#x662F;&#x8DF3;&#x8DC3;&#x5F0F;&#x7684;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x8FBE;&#x5230;&#x6211;&#x4EEC;&#x5F00;&#x5934;gif&#x4E2D;&#x90A3;&#x79CD;&#x5B8C;&#x6210;&#x540E;&#x7684;&#x6548;&#x679C;&#x3002;&#x8981;&#x8BA9;&#x4EFB;&#x610F;&#x5706;&#x70B9;&#x70B9;&#x51FB;&#x540E;&#x7684;&#x5207;&#x6362;&#x6548;&#x679C;&#x4ECD;&#x7136;&#x50CF;&#x76F8;&#x90BB;&#x56FE;&#x7247;&#x4E00;&#x6837;&#x7684;&#x5207;&#x6362;&#xFF0C;&#x8FD9;&#x91CC;&#x8FD8;&#x9700;&#x8981;&#x4E00;&#x79CD;&#x65B0;&#x7684;&#x601D;&#x8DEF;&#x3002;</p><p>&#x5047;&#x5982;&#x6211;&#x4EEC;&#x5F53;&#x524D;&#x5728;&#x7B2C;&#x4E00;&#x5F20;&#x56FE;&#x7247;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x7684;&#x5E8F;&#x53F7;&#x4E3A;1&#xFF0C;&#x800C;&#x70B9;&#x51FB;&#x7684;&#x5706;&#x70B9;&#x5BF9;&#x5E94;&#x56FE;&#x7247;&#x5E8F;&#x53F7;&#x4E3A;5&#x7684;&#x8BDD;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8FD9;&#x4E48;&#x5904;&#x7406;&#xFF1A;&#x5728;&#x5E8F;&#x53F7;1&#x5BF9;&#x5E94;&#x56FE;&#x7247;&#x8282;&#x70B9;&#x7684;&#x540E;&#x9762;&#x63D2;&#x5165;&#x4E00;&#x4E2A;&#x5E8F;&#x53F7;5&#x5BF9;&#x5E94;&#x7684;&#x56FE;&#x7247;&#x8282;&#x70B9;&#xFF0C;&#x7136;&#x540E;&#x8BA9;&#x8F6E;&#x64AD;&#x5207;&#x6362;&#x5230;&#x8FD9;&#x5F20;&#x65B0;&#x589E;&#x7684;&#x56FE;&#x7247;&#xFF0C;&#x5207;&#x6362;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x7ACB;&#x5373;&#x6539;&#x53D8;&#x56FE;&#x7247;&#x4F4D;&#x7F6E;&#x4E3A;&#x771F;&#x6B63;&#x7684;&#x5E8F;&#x53F7;5&#x56FE;&#x7247;&#xFF0C;&#x6700;&#x540E;&#x5220;&#x9664;&#x65B0;&#x589E;&#x7684;&#x8282;&#x70B9;&#xFF0C;&#x8FC7;&#x7A0B;&#x5982;&#x4E0B;&#xFF1A;</p><blockquote>&#x7B2C;&#x4E00;&#x6B65;&#xFF1A;&#x63D2;&#x5165;&#x4E00;&#x4E2A;&#x65B0;&#x8282;&#x70B9; 5 1 5 2 3 4 5 1<p>&#x7B2C;&#x4E8C;&#x6B65;&#xFF1A;&#x6539;&#x53D8;&#x56FE;&#x7247;&#x4F4D;&#x7F6E;&#xFF0C;&#x8282;&#x70B9;&#x987A;&#x5E8F;&#x4E0D;&#x53D8;</p><p>&#x7B2C;&#x4E09;&#x6B65;&#xFF1A;&#x5220;&#x9664;&#x65B0;&#x8282;&#x70B9;&#xFF0C;&#x8FD8;&#x539F;&#x8282;&#x70B9;&#x987A;&#x5E8F; 5 1 2 3 4 5 1</p></blockquote><p>&#x7528;&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#x51FA;&#x6765;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="moveDot: function () {
    // &#x6539;&#x53D8;&#x8F6E;&#x64AD;DOM&#xFF0C;&#x589E;&#x52A0;&#x8FC7;&#x6E21;&#x6548;&#x679C;
    this.changeCarousel();
    // &#x6539;&#x53D8;&#x5F53;&#x524D;&#x8F6E;&#x64AD;&#x5E8F;&#x53F7;
    this.carouselIndex = this.dotIndex;
    // &#x91CD;&#x8BBE;&#x5F53;&#x524D;&#x5706;&#x70B9;&#x6837;&#x5F0F;
    this.setDot();
},
changeCarousel: function () {
    // &#x4FDD;&#x5B58;&#x5F53;&#x524D;&#x8282;&#x70B9;&#x4F4D;&#x7F6E;
    this.currentNode = this.carouselWrap.children[this.carouselIndex];
    // &#x83B7;&#x53D6;&#x76EE;&#x6807;&#x8282;&#x70B9;&#x4F4D;&#x7F6E;
    var targetNode = this.carouselWrap.children[this.dotIndex];
    // &#x5224;&#x65AD;&#x70B9;&#x51FB;&#x5706;&#x70B9;&#x4E0E;&#x5F53;&#x524D;&#x7684;&#x76F8;&#x5BF9;&#x4F4D;&#x7F6E;
    if (this.carouselIndex &lt; this.dotIndex) {
        // &#x5728;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x53F3;&#x8FB9;&#x63D2;&#x5165;&#x76EE;&#x6807;&#x8282;&#x70B9;
        var nextNode = this.currentNode.nextElementSibling;
        this.carouselWrap.insertBefore(targetNode.cloneNode(true), nextNode);
        this.moveCarousel(this.getLeft(this.carouselWrap) - this.carouselWidth, -this.carouselAnimateSpeed);
    }
    if (this.carouselIndex &gt; this.dotIndex) {
        // &#x5728;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x5DE6;&#x8FB9;&#x63D2;&#x5165;&#x76EE;&#x6807;&#x8282;&#x70B9;
        this.carouselWrap.insertBefore(targetNode.cloneNode(true), this.currentNode);
        // &#x56E0;&#x4E3A;&#x5411;&#x5DE6;&#x8FB9;&#x63D2;&#x5165;&#x8282;&#x70B9;&#x540E;&#xFF0C;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x4F4D;&#x7F6E;&#x88AB;&#x6539;&#x53D8;&#xFF0C;&#x5BFC;&#x81F4;&#x753B;&#x9762;&#x6709;&#x6296;&#x52A8;&#x73B0;&#x8C61;&#xFF0C;&#x8FD9;&#x91CC;&#x91CD;&#x7F6E;&#x4E3A;&#x65B0;&#x7684;&#x4F4D;&#x7F6E;
        this.setLeft(this.carouselWrap, -(this.carouselIndex + 1) * this.carouselWidth);
        this.moveCarousel(this.getLeft(this.carouselWrap) + this.carouselWidth, this.carouselAnimateSpeed);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">moveDot: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// &#x6539;&#x53D8;&#x8F6E;&#x64AD;DOM&#xFF0C;&#x589E;&#x52A0;&#x8FC7;&#x6E21;&#x6548;&#x679C;</span>
    <span class="hljs-keyword">this</span>.changeCarousel();
    <span class="hljs-comment">// &#x6539;&#x53D8;&#x5F53;&#x524D;&#x8F6E;&#x64AD;&#x5E8F;&#x53F7;</span>
    <span class="hljs-keyword">this</span>.carouselIndex = <span class="hljs-keyword">this</span>.dotIndex;
    <span class="hljs-comment">// &#x91CD;&#x8BBE;&#x5F53;&#x524D;&#x5706;&#x70B9;&#x6837;&#x5F0F;</span>
    <span class="hljs-keyword">this</span>.setDot();
},
<span class="hljs-attr">changeCarousel</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// &#x4FDD;&#x5B58;&#x5F53;&#x524D;&#x8282;&#x70B9;&#x4F4D;&#x7F6E;</span>
    <span class="hljs-keyword">this</span>.currentNode = <span class="hljs-keyword">this</span>.carouselWrap.children[<span class="hljs-keyword">this</span>.carouselIndex];
    <span class="hljs-comment">// &#x83B7;&#x53D6;&#x76EE;&#x6807;&#x8282;&#x70B9;&#x4F4D;&#x7F6E;</span>
    <span class="hljs-keyword">var</span> targetNode = <span class="hljs-keyword">this</span>.carouselWrap.children[<span class="hljs-keyword">this</span>.dotIndex];
    <span class="hljs-comment">// &#x5224;&#x65AD;&#x70B9;&#x51FB;&#x5706;&#x70B9;&#x4E0E;&#x5F53;&#x524D;&#x7684;&#x76F8;&#x5BF9;&#x4F4D;&#x7F6E;</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.carouselIndex &lt; <span class="hljs-keyword">this</span>.dotIndex) {
        <span class="hljs-comment">// &#x5728;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x53F3;&#x8FB9;&#x63D2;&#x5165;&#x76EE;&#x6807;&#x8282;&#x70B9;</span>
        <span class="hljs-keyword">var</span> nextNode = <span class="hljs-keyword">this</span>.currentNode.nextElementSibling;
        <span class="hljs-keyword">this</span>.carouselWrap.insertBefore(targetNode.cloneNode(<span class="hljs-literal">true</span>), nextNode);
        <span class="hljs-keyword">this</span>.moveCarousel(<span class="hljs-keyword">this</span>.getLeft(<span class="hljs-keyword">this</span>.carouselWrap) - <span class="hljs-keyword">this</span>.carouselWidth, -<span class="hljs-keyword">this</span>.carouselAnimateSpeed);
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.carouselIndex &gt; <span class="hljs-keyword">this</span>.dotIndex) {
        <span class="hljs-comment">// &#x5728;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x5DE6;&#x8FB9;&#x63D2;&#x5165;&#x76EE;&#x6807;&#x8282;&#x70B9;</span>
        <span class="hljs-keyword">this</span>.carouselWrap.insertBefore(targetNode.cloneNode(<span class="hljs-literal">true</span>), <span class="hljs-keyword">this</span>.currentNode);
        <span class="hljs-comment">// &#x56E0;&#x4E3A;&#x5411;&#x5DE6;&#x8FB9;&#x63D2;&#x5165;&#x8282;&#x70B9;&#x540E;&#xFF0C;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x4F4D;&#x7F6E;&#x88AB;&#x6539;&#x53D8;&#xFF0C;&#x5BFC;&#x81F4;&#x753B;&#x9762;&#x6709;&#x6296;&#x52A8;&#x73B0;&#x8C61;&#xFF0C;&#x8FD9;&#x91CC;&#x91CD;&#x7F6E;&#x4E3A;&#x65B0;&#x7684;&#x4F4D;&#x7F6E;</span>
        <span class="hljs-keyword">this</span>.setLeft(<span class="hljs-keyword">this</span>.carouselWrap, -(<span class="hljs-keyword">this</span>.carouselIndex + <span class="hljs-number">1</span>) * <span class="hljs-keyword">this</span>.carouselWidth);
        <span class="hljs-keyword">this</span>.moveCarousel(<span class="hljs-keyword">this</span>.getLeft(<span class="hljs-keyword">this</span>.carouselWrap) + <span class="hljs-keyword">this</span>.carouselWidth, <span class="hljs-keyword">this</span>.carouselAnimateSpeed);
    }
}</code></pre><p>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x8FD9;&#x91CC;&#x8981;&#x5224;&#x65AD;&#x70B9;&#x51FB;&#x7684;&#x5706;&#x70B9;&#x5E8F;&#x53F7;&#x4E0E;&#x5F53;&#x524D;&#x5E8F;&#x53F7;&#x7684;&#x5173;&#x7CFB;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x5728;&#x5F53;&#x524D;&#x5E8F;&#x53F7;&#x7684;&#x5DE6;&#x8FB9;&#x8FD8;&#x662F;&#x53F3;&#x8FB9;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x5DE6;&#x8FB9;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x5BF9;&#x4F4D;&#x7F6E;&#x8FDB;&#x884C;&#x91CD;&#x7F6E;&#x3002;&#x6700;&#x540E;&#x4E00;&#x6B65;&#xFF0C;&#x5B8C;&#x6210;&#x65B0;&#x589E;&#x8282;&#x70B9;&#x7684;&#x5220;&#x9664;&#x51FD;&#x6570;<code>resetMoveDot()</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resetCarousel: function (target, speed) {
    // &#x5224;&#x65AD;&#x5706;&#x70B9;&#x662F;&#x5426;&#x70B9;&#x51FB;
    if (this.isDotClick) {
        // &#x91CD;&#x7F6E;&#x5706;&#x70B9;&#x70B9;&#x51FB;&#x540E;&#x7684;&#x72B6;&#x6001;
        this.resetMoveDot(speed);
    } else {
        // &#x91CD;&#x7F6E;&#x7BAD;&#x5934;&#x6216;&#x8005;&#x81EA;&#x52A8;&#x8F6E;&#x64AD;&#x540E;&#x7684;&#x72B6;&#x6001;
        this.resetMoveCarousel(target);
    }
    this.isDotClick = false;
    this.isCarouselAnimate = false;
},
resetMoveDot: function (speed) {
    // &#x5982;&#x679C;&#x662F;&#x5706;&#x70B9;&#x70B9;&#x51FB;&#x89E6;&#x53D1;&#x52A8;&#x753B;&#xFF0C;&#x9700;&#x8981;&#x5220;&#x9664;&#x65B0;&#x589E;&#x7684;&#x8FC7;&#x5EA6;&#x8282;&#x70B9;&#x5E76;&#x5C06;&#x8F6E;&#x64AD;&#x4F4D;&#x7F6E;&#x91CD;&#x7F6E;&#x5230;&#x5B9E;&#x9645;&#x4F4D;&#x7F6E;
    this.setLeft(this.carouselWrap, -this.dotIndex * this.carouselWidth);
    // &#x5224;&#x65AD;&#x70B9;&#x51FB;&#x5706;&#x70B9;&#x548C;&#x5F53;&#x524D;&#x5706;&#x70B9;&#x7684;&#x76F8;&#x5BF9;&#x4F4D;&#x7F6E;
    if (speed &lt; 0) {
        this.carouselWrap.removeChild(this.currentNode.nextElementSibling);
    } else {
        this.carouselWrap.removeChild(this.currentNode.previousElementSibling);
    }
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">resetCarousel: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">target, speed</span>) </span>{
    <span class="hljs-comment">// &#x5224;&#x65AD;&#x5706;&#x70B9;&#x662F;&#x5426;&#x70B9;&#x51FB;</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isDotClick) {
        <span class="hljs-comment">// &#x91CD;&#x7F6E;&#x5706;&#x70B9;&#x70B9;&#x51FB;&#x540E;&#x7684;&#x72B6;&#x6001;</span>
        <span class="hljs-keyword">this</span>.resetMoveDot(speed);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// &#x91CD;&#x7F6E;&#x7BAD;&#x5934;&#x6216;&#x8005;&#x81EA;&#x52A8;&#x8F6E;&#x64AD;&#x540E;&#x7684;&#x72B6;&#x6001;</span>
        <span class="hljs-keyword">this</span>.resetMoveCarousel(target);
    }
    <span class="hljs-keyword">this</span>.isDotClick = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">this</span>.isCarouselAnimate = <span class="hljs-literal">false</span>;
},
<span class="hljs-attr">resetMoveDot</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">speed</span>) </span>{
    <span class="hljs-comment">// &#x5982;&#x679C;&#x662F;&#x5706;&#x70B9;&#x70B9;&#x51FB;&#x89E6;&#x53D1;&#x52A8;&#x753B;&#xFF0C;&#x9700;&#x8981;&#x5220;&#x9664;&#x65B0;&#x589E;&#x7684;&#x8FC7;&#x5EA6;&#x8282;&#x70B9;&#x5E76;&#x5C06;&#x8F6E;&#x64AD;&#x4F4D;&#x7F6E;&#x91CD;&#x7F6E;&#x5230;&#x5B9E;&#x9645;&#x4F4D;&#x7F6E;</span>
    <span class="hljs-keyword">this</span>.setLeft(<span class="hljs-keyword">this</span>.carouselWrap, -<span class="hljs-keyword">this</span>.dotIndex * <span class="hljs-keyword">this</span>.carouselWidth);
    <span class="hljs-comment">// &#x5224;&#x65AD;&#x70B9;&#x51FB;&#x5706;&#x70B9;&#x548C;&#x5F53;&#x524D;&#x5706;&#x70B9;&#x7684;&#x76F8;&#x5BF9;&#x4F4D;&#x7F6E;</span>
    <span class="hljs-keyword">if</span> (speed &lt; <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">this</span>.carouselWrap.removeChild(<span class="hljs-keyword">this</span>.currentNode.nextElementSibling);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.carouselWrap.removeChild(<span class="hljs-keyword">this</span>.currentNode.previousElementSibling);
    }
},</code></pre><p>&#x67E5;&#x770B;&#x4E00;&#x4E0B;&#x6548;&#x679C;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000015976697?w=900&amp;h=600" src="https://static.alili.tech/img/remote/1460000015976697?w=900&amp;h=600" alt="carousel-test2" title="carousel-test2" style="cursor:pointer"></span></p><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;&#xFF01;</p><h1 id="articleHeader9">H5&#x8F6E;&#x64AD;</h1><p>&#x5728;Web&#x7248;&#x8F6E;&#x64AD;&#x7684;&#x5B9E;&#x73B0;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5BF9;&#x4F4D;&#x7F6E;&#x7684;&#x63A7;&#x5236;&#x662F;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x5143;&#x7D20;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x540E;&#x7684;<code>left</code>&#x503C;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x8FD9;&#x79CD;&#x529E;&#x6CD5;&#x867D;&#x7136;&#x517C;&#x5BB9;&#x6027;&#x597D;&#xFF0C;&#x4F46;&#x662F;&#x6548;&#x7387;&#x76F8;&#x5BF9;&#x662F;&#x6BD4;&#x8F83;&#x4F4E;&#x7684;&#x3002;&#x5728;&#x79FB;&#x52A8;&#x7AEF;&#x7248;&#x672C;&#x7684;&#x5B9E;&#x73B0;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x4E0D;&#x7528;&#x8003;&#x8651;&#x8FD9;&#x79CD;&#x517C;&#x5BB9;&#x6027;&#x7684;&#x95EE;&#x9898;&#x4E86;&#xFF0C;&#x800C;&#x53EF;&#x4EE5;&#x5C3D;&#x91CF;&#x7528;&#x66F4;&#x9AD8;&#x6548;&#x7684;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x52A8;&#x753B;&#x6548;&#x679C;&#x3002;</p><p>&#x5982;&#x679C;&#x5927;&#x5BB6;&#x5BF9;CSS3&#x6709;&#x6240;&#x4E86;&#x89E3;&#xFF0C;&#x90A3;&#x60F3;&#x5FC5;&#x4E00;&#x5B9A;&#x77E5;&#x9053;<code>transform</code>&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x3002;&#x4ECE;&#x5B57;&#x9762;&#x4E0A;&#x6765;&#x8BB2;&#xFF0C;&#x5B83;&#x5C31;&#x662F;&#x53D8;&#x5F62;&#xFF0C;&#x6539;&#x53D8;&#x7684;&#x610F;&#x601D;&#xFF0C;&#x800C;&#x5B83;&#x7684;&#x503C;&#x5927;&#x81F4;&#x5305;&#x62EC;<code>&#x65CB;&#x8F6C;rotate</code>&#x3001;<code>&#x626D;&#x66F2;skew</code>&#x3001;<code>&#x7F29;&#x653E;scale</code>&#x548C;<code>&#x79FB;&#x52A8;translate</code>&#x4EE5;&#x53CA;<code>&#x77E9;&#x9635;&#x53D8;&#x5F62;matrix</code>&#x7B49;&#x51E0;&#x79CD;&#x7C7B;&#x578B;&#x3002;&#x6211;&#x4EEC;&#x4ECA;&#x5929;&#x9700;&#x8981;&#x7528;&#x5230;&#x7684;&#x5C31;&#x662F;<code>translate</code>&#xFF0C;&#x901A;&#x8FC7;&#x4F7F;&#x7528;&#x5B83;&#x4EE5;&#x53CA;<code>transition</code>&#x7B49;&#x52A8;&#x753B;&#x5C5E;&#x6027;&#xFF0C;&#x53EF;&#x4EE5;&#x66F4;&#x9AD8;&#x6548;&#x7B80;&#x6D01;&#x7684;&#x5B9E;&#x73B0;&#x79FB;&#x52A8;&#x7AEF;&#x56FE;&#x7247;&#x8F6E;&#x64AD;&#x7684;&#x79FB;&#x52A8;&#x3002;</p><p>&#x7531;&#x4E8E;&#x57FA;&#x672C;&#x601D;&#x8DEF;&#x4E0E;&#x67B6;&#x6784;&#x548C;Web&#x7248;&#x662F;&#x5DEE;&#x4E0D;&#x591A;&#x7684;&#xFF0C;&#x800C;H5&#x7248;&#x662F;&#x57FA;&#x4E8E;Web&#x7248;&#x91CD;&#x5199;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x53EA;&#x8BF4;&#x4E0B;&#x9700;&#x8981;&#x6539;&#x53D8;&#x7684;&#x51E0;&#x4E2A;&#x5730;&#x65B9;&#x3002;</p><h2 id="articleHeader10">&#x66FF;&#x6362;Left&#x7684;&#x64CD;&#x4F5C;&#x65B9;&#x6CD5;</h2><p>&#x65E2;&#x7136;&#x662F;&#x7528;&#x65B0;&#x5C5E;&#x6027;&#x6765;&#x5B9E;&#x73B0;&#xFF0C;&#x90A3;&#x9996;&#x5148;&#x5C31;&#x8981;&#x91CD;&#x5199;<code>setLeft()</code>&#x548C;<code>getLeft()</code>&#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x76F4;&#x63A5;&#x66FF;&#x6362;&#x4E3A;&#x4E24;&#x4E2A;&#x65B0;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setLeft: function (elem, value) {
  elem.style.left = value + &apos;px&apos;;
},
getLeft: function (elem) {
  return parseInt(elem.style.left);
}

setTransform: function(elem ,value) {
  elem.style.transform =
    &quot;translate3d(&quot; + value + &quot;px, 0px, 0px)&quot;;
  elem.style[&quot;-webkit-transform&quot;] =
    &quot;translate3d(&quot; + value + &quot;px, 0px, 0px)&quot;;
  elem.style[&quot;-ms-transform&quot;] =
    &quot;translate3d(&quot; + value + &quot;px, 0px, 0px)&quot;;
},
getTransform: function() {
  var x =
    this.carouselWrap.style.transform ||
    this.carouselWrap.style[&quot;-webkit-transform&quot;] ||
    this.carouselWrap.style[&quot;-ms-transform&quot;];
  x = x.substring(12);
  x = x.match(/(\S*)px/)[1];
  return Number(x);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">setLeft: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">elem, value</span>) </span>{
  elem.style.left = value + <span class="hljs-string">&apos;px&apos;</span>;
},
<span class="hljs-attr">getLeft</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">elem</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">parseInt</span>(elem.style.left);
}

setTransform: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">elem ,value</span>) </span>{
  elem.style.transform =
    <span class="hljs-string">&quot;translate3d(&quot;</span> + value + <span class="hljs-string">&quot;px, 0px, 0px)&quot;</span>;
  elem.style[<span class="hljs-string">&quot;-webkit-transform&quot;</span>] =
    <span class="hljs-string">&quot;translate3d(&quot;</span> + value + <span class="hljs-string">&quot;px, 0px, 0px)&quot;</span>;
  elem.style[<span class="hljs-string">&quot;-ms-transform&quot;</span>] =
    <span class="hljs-string">&quot;translate3d(&quot;</span> + value + <span class="hljs-string">&quot;px, 0px, 0px)&quot;</span>;
},
<span class="hljs-attr">getTransform</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> x =
    <span class="hljs-keyword">this</span>.carouselWrap.style.transform ||
    <span class="hljs-keyword">this</span>.carouselWrap.style[<span class="hljs-string">&quot;-webkit-transform&quot;</span>] ||
    <span class="hljs-keyword">this</span>.carouselWrap.style[<span class="hljs-string">&quot;-ms-transform&quot;</span>];
  x = x.substring(<span class="hljs-number">12</span>);
  x = x.match(<span class="hljs-regexp">/(\S*)px/</span>)[<span class="hljs-number">1</span>];
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Number</span>(x);
}</code></pre><p>&#x65B0;&#x7248;&#x7684;&#x65B9;&#x6CD5;&#x529F;&#x80FD;&#x4E0E;&#x8001;&#x7248;&#x5B8C;&#x5168;&#x4E00;&#x76F4;&#xFF0C;&#x53EA;&#x662F;&#x5B9E;&#x73B0;&#x6240;&#x7528;&#x5230;&#x7684;&#x65B9;&#x6CD5;&#x4E0D;&#x4E00;&#x6837;&#x4E86;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4E00;&#x4E2A;<code>transition</code>&#x503C;&#x7684;&#x8BBE;&#x7F6E;&#x65B9;&#x6CD5;&#xFF0C;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x52A8;&#x753B;&#x5C5E;&#x6027;&#xFF0C;&#x8FDE;<code>requestAnimationFrame</code>&#x7684;&#x76F8;&#x5173;&#x64CD;&#x4F5C;&#x4E5F;&#x4E0D;&#x9700;&#x8981;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTransition: function(elem, value) {
  elem.style.transition = value + &apos;ms&apos;;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">setTransition: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">elem, value</span>) </span>{
  elem.style.transition = value + <span class="hljs-string">&apos;ms&apos;</span>;
}</code></pre><p>&#x6709;&#x4E86;&#x8FD9;&#x4E09;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x53EF;&#x4EE5;&#x91CD;&#x5199;<code>moveCarousel()</code>&#x3001;<code>resetCarousel()</code>&#x548C;<code>resetMoveCarousel()</code>&#x65B9;&#x6CD5;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="moveCarousel: function(target) {
  this.isCarouselAnimate = true;
  this.setTransition(this.carouselWrap, this.carouselOptions.carouselDuration);
  this.setTransform(this.carouselWrap, target);
  this.resetCarousel(target);
},
resetCarousel: function(target) {
  var _this = this;
  window.setTimeout(function() {
    // &#x91CD;&#x7F6E;&#x7BAD;&#x5934;&#x6216;&#x8005;&#x81EA;&#x52A8;&#x8F6E;&#x64AD;&#x540E;&#x7684;&#x72B6;&#x6001;
    _this.resetMoveCarousel(target);
    _this.isCarouselAnimate = false;
  }, _this.carouselOptions.carouselDuration);
},
resetMoveCarousel: function(target) {
  this.setTransition(this.carouselWrap, 0);
  // &#x4E0D;&#x7B26;&#x5408;&#x4F4D;&#x79FB;&#x6761;&#x4EF6;&#xFF0C;&#x628A;&#x5F53;&#x524D;left&#x503C;&#x7F6E;&#x4E3A;&#x76EE;&#x6807;&#x503C;
  this.setTransform(this.carouselWrap, target);
  //&#x5982;&#x5F53;&#x524D;&#x5728;&#x8F85;&#x52A9;&#x56FE;&#x4E0A;&#xFF0C;&#x5C31;&#x5F52;&#x4F4D;&#x5230;&#x771F;&#x7684;&#x56FE;&#x4E0A;
  if (target &gt; -this.carouselWidth) {
    this.setTransform(this.carouselWrap, -this.carouselCount * this.carouselWidth);
  }
  if (target &lt; -this.carouselWidth * this.carouselCount) {
    this.setTransform(this.carouselWrap, -this.carouselWidth);
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">moveCarousel: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target</span>) </span>{
  <span class="hljs-keyword">this</span>.isCarouselAnimate = <span class="hljs-literal">true</span>;
  <span class="hljs-keyword">this</span>.setTransition(<span class="hljs-keyword">this</span>.carouselWrap, <span class="hljs-keyword">this</span>.carouselOptions.carouselDuration);
  <span class="hljs-keyword">this</span>.setTransform(<span class="hljs-keyword">this</span>.carouselWrap, target);
  <span class="hljs-keyword">this</span>.resetCarousel(target);
},
<span class="hljs-attr">resetCarousel</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target</span>) </span>{
  <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
  <span class="hljs-built_in">window</span>.setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// &#x91CD;&#x7F6E;&#x7BAD;&#x5934;&#x6216;&#x8005;&#x81EA;&#x52A8;&#x8F6E;&#x64AD;&#x540E;&#x7684;&#x72B6;&#x6001;</span>
    _this.resetMoveCarousel(target);
    _this.isCarouselAnimate = <span class="hljs-literal">false</span>;
  }, _this.carouselOptions.carouselDuration);
},
<span class="hljs-attr">resetMoveCarousel</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target</span>) </span>{
  <span class="hljs-keyword">this</span>.setTransition(<span class="hljs-keyword">this</span>.carouselWrap, <span class="hljs-number">0</span>);
  <span class="hljs-comment">// &#x4E0D;&#x7B26;&#x5408;&#x4F4D;&#x79FB;&#x6761;&#x4EF6;&#xFF0C;&#x628A;&#x5F53;&#x524D;left&#x503C;&#x7F6E;&#x4E3A;&#x76EE;&#x6807;&#x503C;</span>
  <span class="hljs-keyword">this</span>.setTransform(<span class="hljs-keyword">this</span>.carouselWrap, target);
  <span class="hljs-comment">//&#x5982;&#x5F53;&#x524D;&#x5728;&#x8F85;&#x52A9;&#x56FE;&#x4E0A;&#xFF0C;&#x5C31;&#x5F52;&#x4F4D;&#x5230;&#x771F;&#x7684;&#x56FE;&#x4E0A;</span>
  <span class="hljs-keyword">if</span> (target &gt; -<span class="hljs-keyword">this</span>.carouselWidth) {
    <span class="hljs-keyword">this</span>.setTransform(<span class="hljs-keyword">this</span>.carouselWrap, -<span class="hljs-keyword">this</span>.carouselCount * <span class="hljs-keyword">this</span>.carouselWidth);
  }
  <span class="hljs-keyword">if</span> (target &lt; -<span class="hljs-keyword">this</span>.carouselWidth * <span class="hljs-keyword">this</span>.carouselCount) {
    <span class="hljs-keyword">this</span>.setTransform(<span class="hljs-keyword">this</span>.carouselWrap, -<span class="hljs-keyword">this</span>.carouselWidth);
  }
}</code></pre><p>&#x4E4B;&#x6240;&#x4EE5;&#x5728;&#x6BCF;&#x6B21;<code>setTransform()</code>&#x6539;&#x53D8;&#x4F4D;&#x7F6E;&#x4E4B;&#x524D;&#x90FD;&#x8981;&#x91CD;&#x65B0;&#x8BBE;&#x7F6E;<code>transition</code>&#x7684;&#x503C;&#xFF0C;&#x662F;&#x56E0;&#x4E3A;<code>transition</code>&#x4F1A;&#x4F7F;&#x6BCF;&#x6B21;&#x4F4D;&#x7F6E;&#x7684;&#x6539;&#x53D8;&#x90FD;&#x5E26;&#x4E0A;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x800C;&#x6211;&#x4EEC;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x505A;&#x7684;&#x8FC7;&#x6E21;&#x64CD;&#x4F5C;&#x53C8;&#x4E0D;&#x5E0C;&#x671B;&#x7528;&#x6237;&#x76F4;&#x63A5;&#x770B;&#x5230;&#xFF0C;&#x56E0;&#x6B64;&#xFF0C;&#x91CD;&#x8BBE;&#x5B83;&#x7684;&#x503C;&#x540E;&#x624D;&#x80FD;&#x548C;&#x4EE5;&#x524D;&#x7684;&#x5B9E;&#x73B0;&#x6548;&#x679C;&#x4FDD;&#x6301;&#x4E00;&#x81F4;&#x3002;</p><h2 id="articleHeader11">&#x6DFB;&#x52A0;touch&#x4E8B;&#x4EF6;</h2><p>&#x5728;&#x79FB;&#x52A8;&#x7AEF;&#x4E0A;&#x6211;&#x4EEC;&#x901A;&#x5E38;&#x4E60;&#x60EF;&#x7528;&#x624B;&#x6307;&#x76F4;&#x63A5;&#x89E6;&#x6478;&#x5C4F;&#x5E55;&#x6765;&#x64CD;&#x4F5C;&#x5E94;&#x7528;&#xFF0C;&#x6240;&#x4EE5;Web&#x7AEF;&#x5706;&#x70B9;&#x548C;&#x7BAD;&#x5934;&#x7684;&#x4EA4;&#x4E92;&#x65B9;&#x5F0F;&#x8FD9;&#x65F6;&#x5019;&#x5C31;&#x663E;&#x5F97;&#x4E0D;&#x90A3;&#x4E48;&#x5408;&#x9002;&#x4E86;&#xFF0C;&#x53D6;&#x800C;&#x4EE3;&#x4E4B;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x6539;&#x5199;&#x6210;&#x89E6;&#x6478;&#x7684;&#x4EA4;&#x4E92;&#x65B9;&#x5F0F;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;<code>touch</code>&#x4E8B;&#x4EF6;&#x5B9E;&#x73B0;&#x7684;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bindCarousel: function() {
  var _this = this;
  // &#x9F20;&#x6807;&#x79FB;&#x5165;&#x79FB;&#x51FA;&#x4E8B;&#x4EF6;
  addEvent(this.carousel, &quot;touchstart&quot;, function(e) {
    if (!_this.isCarouselAnimate) {
      clearInterval(_this.carouselIntervalr);
      _this.carouselTouch.startX = _this.getTransform();
      _this.carouselTouch.start = e.changedTouches[e.changedTouches.length - 1].clientX;
    }
  });
  addEvent(this.carousel, &quot;touchmove&quot;, function(e) {
    if (!_this.isCarouselAnimate &amp;&amp; _this.carouselTouch.start != -1) {
      clearInterval(_this.carouselIntervalr);
      _this.carouselTouch.move =
        e.changedTouches[e.changedTouches.length - 1].clientX - _this.carouselTouch.start;
      _this.setTransform(_this.carouselWrap, _this.carouselTouch.move + _this.carouselTouch.startX);
    }
  });
  addEvent(this.carousel, &quot;touchend&quot;, function(e) {
    if (!_this.isCarouselAnimate &amp;&amp; _this.carouselTouch.start != -1) {
      clearInterval(_this.carouselIntervalr);
      _this.setTransform(_this.carouselWrap, _this.carouselTouch.move + _this.carouselTouch.startX);
      var x = _this.getTransform();
      x +=
        _this.carouselTouch.move &gt; 0
          ? _this.carouselWidth * _this.carouselTouch.offset
          : _this.carouselWidth * -_this.carouselTouch.offset;
      _this.carouselIndex = Math.round(x / _this.carouselWidth) * -1;
      _this.moveCarousel(
        _this.carouselIndex * -_this.carouselWidth
      );
      if (_this.carouselIndex &gt; _this.carouselCount) {
        _this.carouselIndex = 1;
      }
      if (_this.carouselIndex &lt; 1) {
        _this.carouselIndex = _this.carouselCount;
      }
      _this.playCarousel();
    }
  });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">bindCarousel: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
  <span class="hljs-comment">// &#x9F20;&#x6807;&#x79FB;&#x5165;&#x79FB;&#x51FA;&#x4E8B;&#x4EF6;</span>
  addEvent(<span class="hljs-keyword">this</span>.carousel, <span class="hljs-string">&quot;touchstart&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">if</span> (!_this.isCarouselAnimate) {
      clearInterval(_this.carouselIntervalr);
      _this.carouselTouch.startX = _this.getTransform();
      _this.carouselTouch.start = e.changedTouches[e.changedTouches.length - <span class="hljs-number">1</span>].clientX;
    }
  });
  addEvent(<span class="hljs-keyword">this</span>.carousel, <span class="hljs-string">&quot;touchmove&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">if</span> (!_this.isCarouselAnimate &amp;&amp; _this.carouselTouch.start != <span class="hljs-number">-1</span>) {
      clearInterval(_this.carouselIntervalr);
      _this.carouselTouch.move =
        e.changedTouches[e.changedTouches.length - <span class="hljs-number">1</span>].clientX - _this.carouselTouch.start;
      _this.setTransform(_this.carouselWrap, _this.carouselTouch.move + _this.carouselTouch.startX);
    }
  });
  addEvent(<span class="hljs-keyword">this</span>.carousel, <span class="hljs-string">&quot;touchend&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">if</span> (!_this.isCarouselAnimate &amp;&amp; _this.carouselTouch.start != <span class="hljs-number">-1</span>) {
      clearInterval(_this.carouselIntervalr);
      _this.setTransform(_this.carouselWrap, _this.carouselTouch.move + _this.carouselTouch.startX);
      <span class="hljs-keyword">var</span> x = _this.getTransform();
      x +=
        _this.carouselTouch.move &gt; <span class="hljs-number">0</span>
          ? _this.carouselWidth * _this.carouselTouch.offset
          : _this.carouselWidth * -_this.carouselTouch.offset;
      _this.carouselIndex = <span class="hljs-built_in">Math</span>.round(x / _this.carouselWidth) * <span class="hljs-number">-1</span>;
      _this.moveCarousel(
        _this.carouselIndex * -_this.carouselWidth
      );
      <span class="hljs-keyword">if</span> (_this.carouselIndex &gt; _this.carouselCount) {
        _this.carouselIndex = <span class="hljs-number">1</span>;
      }
      <span class="hljs-keyword">if</span> (_this.carouselIndex &lt; <span class="hljs-number">1</span>) {
        _this.carouselIndex = _this.carouselCount;
      }
      _this.playCarousel();
    }
  });
}</code></pre><p>&#x7B80;&#x5355;&#x6765;&#x8BF4;&#xFF0C;&#x6211;&#x4EEC;&#x628A;&#x89E6;&#x6478;&#x4E8B;&#x4EF6;&#x5206;&#x4E3A;&#x4E09;&#x4E2A;&#x8FC7;&#x7A0B;&#x2014;&#x2014;&#x5F00;&#x59CB;&#x3001;&#x79FB;&#x52A8;&#x3001;&#x7ED3;&#x675F;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x8FD9;&#x4E09;&#x4E2A;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5206;&#x522B;&#x5B9E;&#x73B0;&#x5BF9;&#x5E94;&#x7684;&#x903B;&#x8F91;&#x4E0E;&#x64CD;&#x4F5C;&#x4E86;&#xFF1A;</p><ol><li>touchmove&#x83B7;&#x53D6;&#x89E6;&#x6478;&#x7684;&#x8D77;&#x59CB;&#x70B9;</li><li>touchmove&#x8BA1;&#x7B97;&#x89E6;&#x6478;&#x540E;&#x7684;&#x504F;&#x79FB;&#x91CF;</li><li>&#x5224;&#x65AD;&#x504F;&#x79FB;&#x7684;&#x65B9;&#x5411;&#xFF0C;&#x6539;&#x53D8;&#x56FE;&#x7247;&#x4F4D;&#x7F6E;</li></ol><p>&#x901A;&#x8FC7;&#x8FD9;&#x5957;&#x903B;&#x8F91;&#xFF0C;&#x6211;&#x4EEC;&#x6A21;&#x62DF;&#x7684;&#x79FB;&#x52A8;&#x8BBE;&#x5907;&#x7684;&#x89E6;&#x6478;&#x6548;&#x679C;&#x5C31;&#x80FD;&#x6210;&#x529F;&#x5B9E;&#x73B0;&#x4E86;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000015976698?w=600&amp;h=400" src="https://static.alili.tech/img/remote/1460000015976698?w=600&amp;h=400" alt="carousel-test4" title="carousel-test4" style="cursor:pointer"></span></p><blockquote>&#x6587;&#x7AE0;&#x672C;&#x8EAB;&#x53EA;&#x662F;&#x5BF9;&#x9879;&#x76EE;&#x6574;&#x4F53;&#x601D;&#x8DEF;&#x548C;&#x91CD;&#x70B9;&#x90E8;&#x5206;&#x7684;&#x8BB2;&#x89E3;&#xFF0C;&#x4E00;&#x4E9B;&#x7EC6;&#x8282;&#x70B9;&#x4E5F;&#x4E0D;&#x53EF;&#x80FD;&#x9762;&#x9762;&#x4FF1;&#x5230;&#xFF0C;&#x8FD8;&#x8BF7;&#x5927;&#x5BB6;&#x5BF9;&#x7167;&#x6E90;&#x7801;&#x81EA;&#x884C;&#x7406;&#x89E3;&#x5B66;&#x4E60;~</blockquote><p>&#x6700;&#x540E;&#x6211;&#x60F3;&#x8BF4;&#x7684;&#x662F;&#xFF0C;&#x7C7B;&#x4F3C;&#x8F6E;&#x64AD;&#x8FD9;&#x6837;&#x7684;&#x4F18;&#x79C0;&#x63D2;&#x4EF6;&#x5176;&#x5B9E;&#x5DF2;&#x7ECF;&#x6709;&#x5F88;&#x591A;&#x4E86;&#xFF0C;&#x4F46;&#x8FD9;&#x5E76;&#x4E0D;&#x59A8;&#x788D;&#x6211;&#x4EEC;&#x5199;&#x4E00;&#x4E2A;&#x81EA;&#x5DF1;&#x7684;&#x7248;&#x672C;&#x3002;&#x56E0;&#x4E3A;&#x53EA;&#x6709;&#x81EA;&#x5DF1;&#x5199;&#x4E00;&#x904D;&#xFF0C;&#x5E76;&#x5728;&#x8111;&#x4E2D;&#x8D70;&#x4E00;&#x904D;&#x81EA;&#x5DF1;&#x7684;&#x601D;&#x7EF4;&#x8FC7;&#x7A0B;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x5B66;&#x4E60;&#x4E00;&#x4E9B;&#x4F18;&#x79C0;&#x7684;&#x6E90;&#x7801;&#x53CA;&#x5B9E;&#x73B0;&#x65F6;&#x624D;&#x4E0D;&#x81F3;&#x4E8E;&#x61F5;&#x5708;&#x3002;</p><p>&#x5230;&#x6B62;&#x4E3A;&#x6B62;&#xFF0C;&#x6211;&#x4EEC;&#x7B2C;&#x4E8C;&#x4E2A;&#x8F6E;&#x5B50;&#x7684;&#x5F00;&#x53D1;&#x4E5F;&#x7B97;&#x987A;&#x5229;&#x5B8C;&#x6210;&#x4E86;&#xFF0C;&#x6240;&#x6709;&#x6E90;&#x7801;&#x5DF2;&#x540C;&#x6B65;&#x66F4;&#x65B0;&#x5230;<code>github</code>&#xFF0C;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x53D1;&#x73B0;&#x6709;bug&#x6216;&#x5176;&#x4ED6;&#x95EE;&#x9898;&#xFF0C;&#x53EF;&#x4EE5;&#x56DE;&#x590D;&#x5728;&#x9879;&#x76EE;&#x7684;<code>issue</code>&#x4E2D;&#xFF0C;&#x54B1;&#x4EEC;&#x540E;&#x4F1A;&#x6709;&#x671F;&#xFF01;&#xFF08;&#x6316;&#x5751;&#x4E0D;&#x586B;&#xFF0C;&#x9003;&#x3002;&#x3002;</p><h1 id="articleHeader12">&#x66F4;&#x65B0;&#xFF08;2018-8-14&#xFF09;</h1><p>&#x5DF2;&#x66F4;&#x65B0;&#x4F7F;&#x7528;Webpack&#x6253;&#x5305;&#x540E;&#x7684;ES6&#x7248;&#x672C;&#xFF0C;&#x652F;&#x6301;ES6&#x6A21;&#x5757;&#x5316;&#x5F15;&#x5165;&#x65B9;&#x5F0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Carousel } from &apos;csdwheels&apos;
import { CarouselMobile } from &apos;csdwheels&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { Carousel } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;csdwheels&apos;</span>
<span class="hljs-keyword">import</span> { CarouselMobile } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;csdwheels&apos;</span></code></pre><p>&#x5177;&#x4F53;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x8BF7;&#x53C2;&#x8003;<a href="https://github.com/csdoker/csdwheels/blob/master/README.md" rel="nofollow noreferrer" target="_blank">README</a></p><p>To be continued...</p><h1 id="articleHeader13">&#x53C2;&#x8003;&#x5185;&#x5BB9;</h1><ul><li><a href="https://www.zhihu.com/question/37809744" rel="nofollow noreferrer" target="_blank">JS &#x8DD1;&#x9A6C;&#x706F;&#xFF08;&#x8F6E;&#x64AD;&#x56FE;&#xFF09;&#x6548;&#x679C;&#x4E2D;&#xFF0C;&#x6700;&#x540E;&#x4E00;&#x5F20;&#x6EDA;&#x56DE;&#x5230;&#x7B2C;&#x4E00;&#x5F20;&#xFF0C;&#x600E;&#x6837;&#x4F18;&#x5316;&#x201C;&#x89C6;&#x89C9;&#x5012;&#x9000;&#x201D;&#xFF1F;</a></li><li><a href="https://www.cnblogs.com/yewenxiang/p/6115931.html" rel="nofollow noreferrer" target="_blank">&#x7528;&#x539F;&#x751F;&#x7684;javascript &#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x65E0;&#x9650;&#x6EDA;&#x52A8;&#x7684;&#x8F6E;&#x64AD;&#x56FE;</a></li><li><a href="https://kongwsh.github.io/2016/09/28/carousel/" rel="nofollow noreferrer" target="_blank">&#x539F;&#x751F;JavaScript&#x5B9E;&#x73B0;&#x8F6E;&#x64AD;&#x56FE;</a></li><li><a href="https://www.cnblogs.com/zhuzhenwei918/p/6416880.html" rel="nofollow noreferrer" target="_blank">&#x539F;&#x751F;js&#x5B9E;&#x73B0;&#x8F6E;&#x64AD;&#x56FE;</a></li><li><a href="http://www.cnblogs.com/LIUYANZUO/p/5679753.html" rel="nofollow noreferrer" target="_blank">&#x624B;&#x628A;&#x624B;&#x539F;&#x751F;js&#x7B80;&#x5355;&#x8F6E;&#x64AD;&#x56FE;</a></li><li><a href="https://github.com/zwhGithub/vue-swiper" rel="nofollow noreferrer" target="_blank">vue-swiper</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手教你用原生JavaScript造轮子（2）——轮播图（更新：ES6版本）

## 原文链接
[https://segmentfault.com/a/1190000015976690](https://segmentfault.com/a/1190000015976690)

