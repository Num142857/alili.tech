---
title: '使用Intersection Observer API创建无限加载组件.md' 
date: 2018-11-18 3:32:07
hidden: true
slug: zwmck9o6xs
categories: [reprint]
---

{{< raw >}}
<p>&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x7ECF;&#x5E38;&#x4F1A;&#x9047;&#x5230;&#x9700;&#x8981;&#x5904;&#x7406;&#x5927;&#x91CF;&#x6570;&#x636E;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x6BD4;&#x5982;&#x5217;&#x8868;&#x3001;&#x5386;&#x53F2;&#x8BB0;&#x5F55;&#x7B49;&#xFF0C;&#x901A;&#x5E38;&#x9009;&#x62E9;&#x65E0;&#x9650;&#x52A0;&#x8F7D;&#x548C;&#x5206;&#x9875;&#x5BFC;&#x822A;&#x3002;</p><p>&#x4F20;&#x7EDF;&#x540E;&#x7AEF;&#x6E32;&#x67D3;&#xFF0C;&#x4E00;&#x822C;&#x4F1A;&#x9009;&#x62E9;&#x5206;&#x9875;&#x5BFC;&#x822A;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x8F7B;&#x677E;&#x8DF3;&#x8F6C;&#xFF0C;&#x751A;&#x81F3;&#x4E00;&#x6B21;&#x8DF3;&#x8F6C;&#x51E0;&#x4E2A;&#x9875;&#x9762;&#xFF0C;&#x73B0;&#x5728;SPA&#x76DB;&#x884C;&#xFF0C;&#x65E0;&#x9650;&#x6EDA;&#x52A8;&#x52A0;&#x8F7D;&#x662F;&#x66F4;&#x597D;&#x7684;&#x65B9;&#x6848;&#xFF0C;&#x53EF;&#x4EE5;&#x7ED9;&#x7528;&#x6237;&#x66F4;&#x597D;&#x7684;&#x4F53;&#x9A8C;&#xFF0C;&#x5C24;&#x5176;&#x662F;&#x5728;&#x79FB;&#x52A8;&#x7AEF;&#x3002;</p><p>&#x5728;Awesome Vue&#x4E2D;&#xFF0C;&#x6709;&#x5982;&#x4E0B;&#x65E0;&#x9650;&#x6EDA;&#x52A8;&#x7EC4;&#x4EF6;</p><ul><li><a href="https://github.com/PeachScript/vue-infinite-loading" rel="nofollow noreferrer" target="_blank">vue-infinite-loading</a> - An infinite scroll plugin for Vue.js 1.0 &amp; Vue.js 2.0.</li><li><a href="https://github.com/egoist/vue-mugen-scroll" rel="nofollow noreferrer" target="_blank">vue-mugen-scroll</a> - Infinite scroll component for Vue.js 2.</li><li><a href="https://github.com/ElemeFE/vue-infinite-scroll" rel="nofollow noreferrer" target="_blank">vue-infinite-scroll</a> - An infinite scroll directive for vue.js.</li><li><a href="https://github.com/lookstudios/vue-loop" rel="nofollow noreferrer" target="_blank">vue-loop</a> - An infinite content loop component for Vue.js 2.</li><li><a href="https://github.com/wangdahoo/vue-scroller" rel="nofollow noreferrer" target="_blank">vue-scroller</a> - An infinite content loop component for Vue.js 2, including functionalities such as &apos;pull-to-refresh&apos;, &apos;infinite-loading&apos;, &apos;snaping-scroll&apos;.</li><li><a href="https://github.com/legeneek/vue-infinite-list" rel="nofollow noreferrer" target="_blank">vue-infinite-list</a> - An infinite list mixin can recycle dom for Vue.js 2</li><li><a href="https://github.com/biigpongsatorn/vue-infinite-slide-bar" rel="nofollow noreferrer" target="_blank">vue-infinite-slide-bar</a> - &#x221E; Infinite slide bar component.</li><li><a href="https://github.com/zuolei828/vue-virtual-infinite-scroll" rel="nofollow noreferrer" target="_blank">vue-virtual-infinite-scroll</a> - A vue2 component based on Iscroll, supports big data list with high performance scroll, infinite load and pull refresh.</li></ul><p>Intersection Observer API&#x7684;&#x51FA;&#x73B0;&#xFF0C;&#x8BA9;&#x5F00;&#x53D1;&#x65E0;&#x9650;&#x6EDA;&#x52A8;&#x7EC4;&#x4EF6;&#x53D8;&#x5F97;&#x66F4;&#x52A0;&#x7B80;&#x5355;&#x65B9;&#x4FBF;&#x3002;</p><h3 id="articleHeader0">Intersection Observer API</h3><p>Intersection Observer API&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x53EF;&#x8BA2;&#x9605;&#x7684;&#x6A21;&#x578B;&#xFF0C;&#x53EF;&#x4EE5;&#x89C2;&#x5BDF;&#x8BE5;&#x6A21;&#x578B;&#xFF0C;&#x4EE5;&#x4FBF;&#x5728;&#x5143;&#x7D20;&#x8FDB;&#x5165;&#x89C6;&#x53E3;&#x65F6;&#x5F97;&#x5230;&#x901A;&#x77E5;&#x3002;</p><p>&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x89C2;&#x5BDF;&#x8005;&#x5B9E;&#x4F8B;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;IntersectionObserver&#x7684;&#x65B0;&#x5B9E;&#x4F8B;&#x5E76;&#x8C03;&#x7528;observe&#x65B9;&#x6CD5;&#xFF0C;&#x4F20;&#x9012;&#x4E00;&#x4E2A;DOM&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const observer = new IntersectionObserver();

const coolElement = document.querySelector(&quot;#coolElement&quot;);
observer.observe(coolElement);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code>
<span class="hljs-keyword">const</span> observer = <span class="hljs-keyword">new</span> IntersectionObserver();

<span class="hljs-keyword">const</span> coolElement = <span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">&quot;#coolElement&quot;</span>);
observer.observe(coolElement);
</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x56DE;&#x8C03;&#x65B9;&#x5F0F;&#x5C06;&#x53C2;&#x6570;&#x4F20;&#x7ED9;InersectionObserver&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const observer = new IntersectionObserver(entries =&gt; {
  const firstEntry = entries[0];
  if (firstEntry.isIntersecting) {
    // Handle intersection here...
  }
});

const coolDiv = document.querySelector(&quot;#coolDiv&quot;);
observer.observe(coolDiv);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code>
<span class="hljs-keyword">const</span> observer = <span class="hljs-keyword">new</span> IntersectionObserver(entries =&gt; {
  <span class="hljs-keyword">const</span> firstEntry = entries[<span class="hljs-number">0</span>];
  <span class="hljs-keyword">if</span> (firstEntry.isIntersecting) {
    <span class="hljs-comment">// Handle intersection here...</span>
  }
});

<span class="hljs-keyword">const</span> coolDiv = <span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">&quot;#coolDiv&quot;</span>);
observer.observe(coolDiv);
</code></pre><p>&#x56DE;&#x8C03;&#x63A5;&#x6536;entries&#x4F5C;&#x4E3A;&#x5176;&#x53C2;&#x6570;&#x3002; &#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x56E0;&#x4E3A;&#x5F53;&#x4F60;&#x4F7F;&#x7528;&#x9608;&#x503C;&#x65F6;&#x4F60;&#x53EF;&#x4EE5;&#x6709;&#x51E0;&#x4E2A;&#x6761;&#x76EE;&#xFF0C;&#x4F46;&#x4E8B;&#x5B9E;&#x5E76;&#x975E;&#x5982;&#x6B64;&#xFF0C;&#x6240;&#x4EE5;&#x53EA;&#x5F97;&#x5230;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x3002;<br>&#x7136;&#x540E;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;firstEntry.isIntersection&#x5C5E;&#x6027;&#x68C0;&#x67E5;&#x5B83;&#x662F;&#x5426;&#x76F8;&#x4EA4;&#x3002; &#x8FD9;&#x662F;&#x8FDB;&#x884C;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x5E76;&#x68C0;&#x7D22;&#x4E0B;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x7684;&#x6570;&#x636E;&#x3002;</p><p>IntersectionObserver&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F7F;&#x7528;&#x4EE5;&#x4E0B;&#x8868;&#x793A;&#x6CD5;&#x63A5;&#x6536;&#x9009;&#x9879;&#x7EC4;&#x4EF6;&#x4F5C;&#x4E3A;&#x5176;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const options = {
  root: document.querySelector(&quot;#scrollArea&quot;),
  rootMargin: &quot;0px&quot;,
  threshold: 1.0
};

const observer = new IntersectionObserver(callback, options);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code>
<span class="hljs-keyword">const</span> options = {
  root: <span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">&quot;#scrollArea&quot;</span>),
  rootMargin: <span class="hljs-string">&quot;0px&quot;</span>,
  threshold: <span class="hljs-number">1.0</span>
};

<span class="hljs-keyword">const</span> observer = <span class="hljs-keyword">new</span> IntersectionObserver(callback, options);
</code></pre><p>&#x5173;&#x4E8E;options&#x91CC;&#x7684;&#x53C2;&#x6570;&#x89E3;&#x91CA;&#xFF0C;&#x622A;&#x81EA;<a href="http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html" rel="nofollow noreferrer" target="_blank">ruanyifeng intersectionobserver_api</a></p><p>==root==&#xFF1A;&#x6027;&#x6307;&#x5B9A;&#x76EE;&#x6807;&#x5143;&#x7D20;&#x6240;&#x5728;&#x7684;&#x5BB9;&#x5668;&#x8282;&#x70B9;&#xFF08;&#x5373;&#x6839;&#x5143;&#x7D20;&#xFF09;&#x3002;&#x6CE8;&#x610F;&#xFF0C;&#x5BB9;&#x5668;&#x5143;&#x7D20;&#x5FC5;&#x987B;&#x662F;&#x76EE;&#x6807;&#x5143;&#x7D20;&#x7684;&#x7956;&#x5148;&#x8282;&#x70B9;</p><p>==rootMargin==:<br>&#x5B9A;&#x4E49;&#x6839;&#x5143;&#x7D20;&#x7684;margin&#xFF0C;&#x7528;&#x6765;&#x6269;&#x5C55;&#x6216;&#x7F29;&#x5C0F;rootBounds&#x8FD9;&#x4E2A;&#x77E9;&#x5F62;&#x7684;&#x5927;&#x5C0F;&#xFF0C;&#x4ECE;&#x800C;&#x5F71;&#x54CD;intersectionRect&#x4EA4;&#x53C9;&#x533A;&#x57DF;&#x7684;&#x5927;&#x5C0F;&#x3002;&#x5B83;&#x4F7F;&#x7528;CSS&#x7684;&#x5B9A;&#x4E49;&#x65B9;&#x6CD5;&#xFF0C;&#x6BD4;&#x5982;10px 20px 30px 40px&#xFF0C;&#x8868;&#x793A; top&#x3001;right&#x3001;bottom &#x548C; left &#x56DB;&#x4E2A;&#x65B9;&#x5411;&#x7684;&#x503C;&#x3002;</p><p>&#x8FD9;&#x6837;&#x8BBE;&#x7F6E;&#x4EE5;&#x540E;&#xFF0C;&#x4E0D;&#x7BA1;&#x662F;&#x7A97;&#x53E3;&#x6EDA;&#x52A8;&#x6216;&#x8005;&#x5BB9;&#x5668;&#x5185;&#x6EDA;&#x52A8;&#xFF0C;&#x53EA;&#x8981;&#x76EE;&#x6807;&#x5143;&#x7D20;&#x53EF;&#x89C1;&#x6027;&#x53D8;&#x5316;&#xFF0C;&#x90FD;&#x4F1A;&#x89E6;&#x53D1;&#x89C2;&#x5BDF;&#x5668;</p><p>==threshold==&#xFF1A;&#x51B3;&#x5B9A;&#x4E86;&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x89E6;&#x53D1;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;&#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x6BCF;&#x4E2A;&#x6210;&#x5458;&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x95E8;&#x69DB;&#x503C;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;[0]&#xFF0C;&#x5373;&#x4EA4;&#x53C9;&#x6BD4;&#x4F8B;&#xFF08;intersectionRatio&#xFF09;&#x8FBE;&#x5230;0&#x65F6;&#x89E6;&#x53D1;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;<br>&#x6BD4;&#x5982;&#xFF0C;<code>[0, 0.25, 0.5, 0.75, 1]</code>&#x5C31;&#x8868;&#x793A;&#x5F53;&#x76EE;&#x6807;&#x5143;&#x7D20;<code>0%&#x3001;25%&#x3001;50%&#x3001;75%&#x3001;100%</code>&#x53EF;&#x89C1;&#x65F6;&#xFF0C;&#x4F1A;&#x89E6;&#x53D1;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;</p><p>&#x7531;&#x4E8E;&#x9700;&#x8981;&#x4F7F;&#x7528;dom&#x5143;&#x7D20;&#x4F5C;&#x4E3A;&#x89C2;&#x5BDF;&#x8005;&#xFF0C;&#x5728;Vue&#x4E2D;&#xFF0C;&#x4F7F;&#x7528;mounted&#xFF0C;React&#x4E2D;&#x4F7F;&#x7528;componentDidMount</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// Observer.vue
export default {
  data: () =&gt; ({
    observer: null
  }),
  mounted() {
    this.observer = new IntersectionObserver(([entry]) =&gt; {
      if (entry &amp;&amp; entry.isIntersecting) {
        // ...
      }
    });

    this.observer.observe(this.$el);
  }
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>
<span class="hljs-regexp">//</span> Observer.vue
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
    observer: <span class="hljs-literal">null</span>
  }),
  mounted() {
    <span class="hljs-keyword">this</span>.observer = <span class="hljs-keyword">new</span> IntersectionObserver(<span class="hljs-function"><span class="hljs-params">([entry])</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (entry &amp;&amp; entry.isIntersecting) {
        <span class="hljs-regexp">//</span> ...
      }
    });

    <span class="hljs-keyword">this</span>.observer.observe(<span class="hljs-keyword">this</span>.$el);
  }
};
</code></pre><blockquote>&#x6CE8;&#x610F;&#xFF1A;&#x6211;&#x4EEC;&#x5728;<em> [entry] </em>&#x53C2;&#x6570;&#x4E0A;&#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x89E3;&#x6784;&#xFF0C;&#x4F7F;&#x7528;this.$el&#x4F5C;&#x4E3A;root&#x4EE5;&#x4FBF;&#x89C2;&#x5BDF;</blockquote><p>&#x4E3A;&#x4E86;&#x4F7F;&#x5176;&#x53EF;&#x91CD;&#x7528;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x8BA9;&#x7236;&#x7EC4;&#x4EF6;&#xFF08;&#x4F7F;&#x7528;Observer&#x7EC4;&#x4EF6;&#x7684;&#x7EC4;&#x4EF6;&#xFF09;&#x5904;&#x7406;&#x76F8;&#x4EA4;&#x7684;&#x4E8B;&#x4EF6;&#x3002; &#x4E3A;&#x6B64;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x5B83;&#x76F8;&#x4EA4;&#x65F6;&#x53D1;&#x51FA;&#x4E00;&#x4E2A;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  mounted() {
    this.observer = new IntersectionObserver(([entry]) =&gt; {
      if (entry &amp;&amp; entry.isIntersecting) {
        this.$emit(&quot;intersect&quot;);
      }
    });

    this.observer.observe(this.$el);
  }
  // ...
};

&lt;template&gt;
  &lt;div class=&quot;observer&quot;/&gt;
&lt;/template&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  mounted() {
    <span class="hljs-keyword">this</span>.observer = <span class="hljs-keyword">new</span> IntersectionObserver(<span class="hljs-function">(<span class="hljs-params">[entry]</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (entry &amp;&amp; entry.isIntersecting) {
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&quot;intersect&quot;</span>);
      }
    });

    <span class="hljs-keyword">this</span>.observer.observe(<span class="hljs-keyword">this</span>.$el);
  }
  <span class="hljs-comment">// ...</span>
};

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;observer&quot;</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre><p>&#x7EC4;&#x4EF6;&#x9500;&#x6BC1;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8BB0;&#x5F97;&#x5173;&#x95ED;observer</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  destroyed() {
    this.observer.disconnect();
  }
  // ...
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code><span class="hljs-keyword">export</span> <span class="hljs-built_in">default</span> {
  destroyed() {
    <span class="hljs-keyword">this</span>.observer.<span class="hljs-built_in">disconnect</span>();
  }
  <span class="hljs-comment">// ...</span>
};</code></pre><p>&#x4E0E;==unobserve==&#x4E0D;&#x540C;&#x7684;&#x662F;&#xFF0C;unobserve&#x5173;&#x95ED;&#x5F53;&#x524D;&#x88AB;&#x89C2;&#x5BDF;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x800C;disconnect&#x5173;&#x95ED;&#x6240;&#x6709;&#x88AB;&#x89C2;&#x5BDF;&#x7684;&#x5143;&#x7D20;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- Observer.vue --&gt;
&lt;template&gt;
  &lt;div class=&quot;observer&quot;/&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  props: [&apos;options&apos;],
  data: () =&gt; ({
    observer: null,
  }),
  mounted() {
    const options = this.options || {};
    this.observer = new IntersectionObserver(([entry]) =&gt; {
      if (entry &amp;&amp; entry.isIntersecting) {
        this.$emit(&quot;intersect&quot;);
      }
    }, options);

    this.observer.observe(this.$el);
  },
  destroyed() {
    this.observer.disconnect();
  },
};
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Observer.vue --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;observer&quot;</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: [<span class="hljs-string">&apos;options&apos;</span>],
  <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
    <span class="hljs-attr">observer</span>: <span class="hljs-literal">null</span>,
  }),
  mounted() {
    <span class="hljs-keyword">const</span> options = <span class="hljs-keyword">this</span>.options || {};
    <span class="hljs-keyword">this</span>.observer = <span class="hljs-keyword">new</span> IntersectionObserver(<span class="hljs-function">(<span class="hljs-params">[entry]</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (entry &amp;&amp; entry.isIntersecting) {
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&quot;intersect&quot;</span>);
      }
    }, options);

    <span class="hljs-keyword">this</span>.observer.observe(<span class="hljs-keyword">this</span>.$el);
  },
  destroyed() {
    <span class="hljs-keyword">this</span>.observer.disconnect();
  },
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><h3 id="articleHeader1">&#x521B;&#x5EFA;&#x65E0;&#x9650;&#x6EDA;&#x52A8;&#x7EC4;&#x4EF6;Vue</h3><p>&#x5047;&#x5982;&#x6709;&#x5982;&#x4E0B;&#x7C7B;&#x4F3C;&#x9700;&#x6C42;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div&gt;
    &lt;ul&gt;
      &lt;li class=&quot;list-item&quot; v-for=&quot;item in items&quot; :key=&quot;item.id&quot;&gt;
        "{{"item.name"}}"
      &lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data: () =&gt; ({ page: 1, items: [] }),
  async mounted() {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${
        this.page
      }&amp;_limit=50`
    );

    this.items = await res.json();
  }
};
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;list-item&quot;</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;item in items&quot;</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;item.id&quot;</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"item.name"}}"</span><span class="xml">
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({ <span class="hljs-attr">page</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">items</span>: [] }),
  <span class="hljs-keyword">async</span> mounted() {
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> fetch(
      <span class="hljs-string">`https://jsonplaceholder.typicode.com/comments?_page=<span class="hljs-subst">${
        <span class="hljs-keyword">this</span>.page
      }</span>&amp;_limit=50`</span>
    );

    <span class="hljs-keyword">this</span>.items = <span class="hljs-keyword">await</span> res.json();
  }
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p>&#x5F15;&#x5165;Observer&#x7EC4;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div&gt;
    &lt;ul&gt;
      &lt;li class=&quot;list-item&quot; v-for=&quot;item in items&quot; :key=&quot;item.id&quot;&gt;
        "{{"item.name"}}"
      &lt;/li&gt;
    &lt;/ul&gt;
    &lt;Observer @intersect=&quot;intersected&quot;/&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import Observer from &quot;./Observer&quot;;
export default {
  data: () =&gt; ({ page: 1, items: [] }),
  async mounted() {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${
        this.page
      }&amp;_limit=50`
    );

    this.items = await res.json();
  },
  components: {
    Observer
  }
};
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;list-item&quot;</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;item in items&quot;</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;item.id&quot;</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"item.name"}}"</span><span class="xml">
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Observer</span> @<span class="hljs-attr">intersect</span>=<span class="hljs-string">&quot;intersected&quot;</span>/&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Observer <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./Observer&quot;</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({ <span class="hljs-attr">page</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">items</span>: [] }),
  <span class="hljs-keyword">async</span> mounted() {
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> fetch(
      <span class="hljs-string">`https://jsonplaceholder.typicode.com/comments?_page=<span class="hljs-subst">${
        <span class="hljs-keyword">this</span>.page
      }</span>&amp;_limit=50`</span>
    );

    <span class="hljs-keyword">this</span>.items = <span class="hljs-keyword">await</span> res.json();
  },
  <span class="hljs-attr">components</span>: {
    Observer
  }
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p>&#x5C06;==mounted==&#x94A9;&#x5B50;&#x91CC;&#x7684;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x79FB;&#x5230;==methods==&#x91CC;&#xFF0C;&#x5E76;&#x52A0;&#x4E0A;&#x81EA;&#x589E;page&#x4EE5;&#x53CA;&#x5408;&#x5E76;items&#x6570;&#x636E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  data: () =&gt; ({ page: 1, items: [] }),
  methods: {
    async intersected() {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=${
          this.page
        }&amp;_limit=50`
      );

      this.page++;
      const items = await res.json();
      this.items = [...this.items, ...items];
    }
  }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({ <span class="hljs-attr">page</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">items</span>: [] }),
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-keyword">async</span> intersected() {
      <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> fetch(
        <span class="hljs-string">`https://jsonplaceholder.typicode.com/comments?_page=<span class="hljs-subst">${
          <span class="hljs-keyword">this</span>.page
        }</span>&amp;_limit=50`</span>
      );

      <span class="hljs-keyword">this</span>.page++;
      <span class="hljs-keyword">const</span> items = <span class="hljs-keyword">await</span> res.json();
      <span class="hljs-keyword">this</span>.items = [...this.items, ...items];
    }
  }
};</code></pre><blockquote>this.items = [...this.items, ...items] &#x7B49;&#x4EF7;&#x4E8E; this.items.concat(items)</blockquote><p>&#x5230;&#x6B64;InfiniteScroll.vue&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- InfiniteScroll.vue --&gt;
&lt;template&gt;
  &lt;div&gt;
    &lt;ul&gt;
      &lt;li class=&quot;list-item&quot; v-for=&quot;item in items&quot; :key=&quot;item.id&quot;&gt;"{{"item.name"}}"&lt;/li&gt;
    &lt;/ul&gt;
    &lt;Observer @intersect=&quot;intersected&quot;/&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import Observer from &quot;./Observer&quot;;

export default {
  data: () =&gt; ({ page: 1, items: [] }),
  methods: {
    async intersected() {
      const res = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${
        this.page
      }&amp;_limit=50`);

      this.page++;
      const items = await res.json();
      this.items = [...this.items, ...items];
    },
  },
  components: {
    Observer,
  },
};
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!-- InfiniteScroll.vue --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;list-item&quot;</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;item in items&quot;</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;item.id&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Observer</span> @<span class="hljs-attr">intersect</span>=<span class="hljs-string">&quot;intersected&quot;</span>/&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Observer <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./Observer&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({ <span class="hljs-attr">page</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">items</span>: [] }),
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-keyword">async</span> intersected() {
      <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">`https://jsonplaceholder.typicode.com/comments?_page=<span class="hljs-subst">${
        <span class="hljs-keyword">this</span>.page
      }</span>&amp;_limit=50`</span>);

      <span class="hljs-keyword">this</span>.page++;
      <span class="hljs-keyword">const</span> items = <span class="hljs-keyword">await</span> res.json();
      <span class="hljs-keyword">this</span>.items = [...this.items, ...items];
    },
  },
  <span class="hljs-attr">components</span>: {
    Observer,
  },
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p>&#x503C;&#x5F97;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;intersection Observer api&#x517C;&#x5BB9;&#x6027;&#x5E76;&#x4E0D;&#x662F;&#x592A;&#x597D;&#xFF0C;&#x7ECF;&#x672C;&#x4EBA;&#x6D4B;&#x8BD5;&#xFF0C;chrome&#x4E0A;&#x65E0;&#x538B;&#x529B;&#xFF0C;&#x5176;&#x4F59;&#x5168;&#x4E0D;&#x517C;&#x5BB9;&#xFF0C;&#x4E0D;&#x8FC7;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<a href="https://github.com/w3c/IntersectionObserver/tree/master/polyfill" rel="nofollow noreferrer" target="_blank">W3C&#x2019;s Intersection Observer</a>&#xFF0C;<code>npm install intersection-observer</code>&#xFF0C;&#x7136;&#x540E;&#x5728;Observer.vue&#x4E2D;&#x52A0;&#x5165;<code>require(&apos;intersection-observer&apos;);</code>&#x5373;&#x53EF;&#x3002;</p><p>Demo&#x5728;&#x6B64;:<a href="https://codesandbox.io/s/kxm8wlnn85" rel="nofollow noreferrer" target="_blank">https://codesandbox.io/s/kxm8...</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Intersection Observer API创建无限加载组件.md

## 原文链接
[https://segmentfault.com/a/1190000015871163](https://segmentfault.com/a/1190000015871163)

