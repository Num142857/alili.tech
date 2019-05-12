---
title: Chrome 小插件开发 - 提醒我点餐
hidden: true
categories: [reprint]
slug: 1f2689af
date: 2018-11-05 02:30:10
---

{{< raw >}}
<h1 id="articleHeader0">&#x80CC;&#x666F;</h1><hr><p>&#x4E00;&#x5FD9;&#x8D77;&#x6765;&#xFF0C; &#x8001;&#x662F;&#x5FD8;&#x8BB0;&#x70B9;Shopee&#x7684;&#x665A;&#x9910;&#xFF0C;&#x665A;&#x9910;&#x5F88;&#x4E30;&#x76DB;&#xFF0C; &#x91CD;&#x70B9;&#x662F;<code>&#x514D;&#x8D39;!</code>, &#x4E8E;&#x662F;&#x62BD;&#x7A7A;&#x5199;&#x4E86;&#x4E2A;&#x5C0F;&#x63D2;&#x4EF6;&#xFF0C;&#x63D0;&#x9192;&#x6211;&#x70B9;&#x9910;, &#x5728;&#x8FD9;&#x7B80;&#x5355;&#x5206;&#x4EAB;&#x4E00;&#x4E0B;&#x3002;</p><h2 id="articleHeader1">&#x5148;&#x7779;&#x4E3A;&#x5FEB;</h2><p>&#x5230;&#x70B9;&#x81EA;&#x52A8;&#x63D0;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhZxD?w=712&amp;h=146" src="https://static.alili.tech/img/bVbhZxD?w=712&amp;h=146" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x4E0D;&#x5149;&#x6709;&#x5F39;&#x51FA;&#x63D0;&#x793A;&#xFF0C; &#x4F34;&#x968F;&#x7684;&#x8FD8;&#x6709;&#x8BED;&#x97F3;&#x3002;&#x70B9;&#x51FB;&#x5F39;&#x51FA;&#x7684;&#x63D0;&#x793A;&#xFF0C;&#x5C31;&#x5230;&#x70B9;&#x9910;&#x8BE6;&#x60C5;&#x9875;&#x9762;&#x9009;&#x83DC;&#x53BB;&#x4E86;&#x3002;</p><p>&#x90FD;&#x6709;&#x4EC0;&#x4E48;&#x83DC; ? &#x4E0A;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhZBi?w=2744&amp;h=1600" src="https://static.alili.tech/img/bVbhZBi?w=2744&amp;h=1600" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x56DE;&#x5230;&#x6B63;&#x9898;..&#x4F7F;&#x7528;&#x7684;Notify &#x63D2;&#x4EF6;&#x6765;&#x81EA;&#x793E;&#x533A;&#xFF1A;<a href="https://wangchujiang.com/iNotify/" rel="nofollow noreferrer" target="_blank">iNotify</a></p><p>&#x67E5;&#x770B;&#x6548;&#x679C;&#x8BF7;&#x6233;: <a href="https://wangchujiang.com/iNotify/" rel="nofollow noreferrer" target="_blank">Demo</a></p><h2 id="articleHeader2">&#x4E3B;&#x8981;&#x601D;&#x8DEF;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8BBE;&#x7F6E;&#x4E2A;&#x5B9A;&#x65F6;&#x5668;&#x6BCF;&#x5929;&#x5B9A;&#x65F6;&#x63D0;&#x9192;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs"><code>&#x8BBE;&#x7F6E;&#x4E2A;&#x5B9A;&#x65F6;&#x5668;&#x6BCF;&#x5929;&#x5B9A;&#x65F6;&#x63D0;&#x9192;&#x3002;
</code></pre><p>&#x4E3B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function noticeMe() {
    clearTimeout(t);
    notify.player().notify({
      openurl: &quot;http://dinner.szoa.shopee.com/&quot;
    });

    notifyTime = 24 * 60 * 60 * 1000;
    t = setTimeout(noticeMe, notifyTime);
  }

  function checkTime() {
    if (currentTime &gt; threePm) {
      notifyTime = threePm + 24 * 60 * 60 * 1000;
    } else {
      notifyTime = threePm - currentTime;
    }
    setTimeout(noticeMe, notifyTime);
  }

  checkTime();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">noticeMe</span><span class="hljs-params">()</span> </span>{
    clearTimeout(t);
    notify.player().notify({
      openurl: <span class="hljs-string">&quot;http://dinner.szoa.shopee.com/&quot;</span>
    });

    notifyTime = <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>;
    t = setTimeout(noticeMe, notifyTime);
  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkTime</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">if</span> (currentTime &gt; threePm) {
      notifyTime = threePm + <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>;
    } <span class="hljs-keyword">else</span> {
      notifyTime = threePm - currentTime;
    }
    setTimeout(noticeMe, notifyTime);
  }

  checkTime();
</code></pre><p>&#x7B80;&#x5355;&#x7684;&#x903B;&#x8F91;&#xFF0C; &#x4E00;&#x770B;&#x5C31;&#x61C2;&#xFF0C; &#x5C31;&#x4E0D;&#x591A;&#x89E3;&#x91CA;&#x4E86;&#x3002;</p><p>&#x60F3;&#x62FF;&#x4E0B;&#x6765;&#x81EA;&#x5DF1;&#x73A9;&#x4E00;&#x73A9;&#x7684;&#xFF0C; &#x8BF7;&#x5230;<a href="https://github.com/beMySun/orderDish" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a>&#x67E5;&#x770B;&#x3002;</p><h1 id="articleHeader3">&#x5982;&#x4F55;&#x5199;&#x4E00;&#x4E2A;&#x6D4F;&#x89C8;&#x5668;&#x63D2;&#x4EF6;</h1><p>&#x7C7B;&#x4F3C;&#x6559;&#x7A0B;&#x5F88;&#x591A;&#x4E86;&#xFF0C; &#x4E0D;&#x518D;&#x8D58;&#x8FF0;&#xFF0C; &#x611F;&#x5174;&#x8DA3;&#x7684;&#x8BDD;&#x81EA;&#x5DF1;&#x53BB;&#x67E5;&#x5427;&#x3002;</p><h1 id="articleHeader4">&#x6D4F;&#x89C8;&#x5668;&#x4E5F;&#x80FD;&#x8BF4;&#x8BDD;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var msg = new SpeechSynthesisUtterance(&quot;&#x8BE5;&#x70B9;&#x9910;&#x4E86;&quot;);
 speechSynthesis.speak(msg);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code> <span class="hljs-keyword">var</span> msg = <span class="hljs-keyword">new</span> <span class="hljs-type">SpeechSynthesisUtterance</span>(<span class="hljs-string">&quot;&#x8BE5;&#x70B9;&#x9910;&#x4E86;&quot;</span>);
 speechSynthesis.speak(msg);
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbhZzA?w=2524&amp;h=930" src="https://static.alili.tech/img/bVbhZzA?w=2524&amp;h=930" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x517C;&#x5BB9;&#x6027;&#x8FD8;&#x662F;&#x633A;&#x4E0D;&#x9519;&#xFF0C; &#x53EF;&#x4EE5;&#x5728;&#x5408;&#x9002;&#x7684;&#x573A;&#x666F;&#x641E;&#x70B9;<code>&#x8BED;&#x97F3;&#x63D0;&#x793A;</code>&#x60F3;&#x5FC5;&#x662F;&#x6781;&#x597D;&#x7684;&#x3002;</p><h1 id="articleHeader5">&#x7ED3;&#x8BED;</h1><p>&#x672C;&#x6765;&#x5C31;&#x60F3;&#x5199;&#x8FD9;&#x4E48;&#x4E2A;&#x63D2;&#x4EF6;&#x7684;&#xFF0C;&#x4E00;&#x76F4;&#x6CA1;&#x52A8;&#x624B;&#xFF0C; &#x4ECA;&#x5929;&#x53C8;&#x53C8;&#x53C8;&#x5FD8;&#x8BB0;&#x70B9;&#x996D;&#x4E86;&#xFF0C; &#x4E8E;&#x662F;&#x64B8;&#x8D77;&#x8896;&#x5B50;&#x5C31;&#x5199;&#x4E86;&#x4E00;&#x4E2A;&#xFF0C; &#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C; &#x540E;&#x9762;&#x5B8C;&#x5584;&#x4E00;&#x4E0B;&#x8FD8;&#x80FD;&#x7ED9;&#x5176;&#x4ED6;&#x4EBA;&#x7528;&#xFF0C; &#x7F8E;&#x6ECB;&#x6ECB; :)</p><p>End.</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Chrome 小插件开发 - 提醒我点餐

## 原文链接
[https://segmentfault.com/a/1190000016642260](https://segmentfault.com/a/1190000016642260)

