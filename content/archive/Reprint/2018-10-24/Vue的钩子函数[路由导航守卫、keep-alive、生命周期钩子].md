---
title: 'Vue的钩子函数[路由导航守卫、keep-alive、生命周期钩子]'
hidden: true
categories: reprint
slug: e6561d69
date: 2018-10-24 08:17:53
---

{{< raw >}}

                    
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000015727282?w=500&amp;h=317" del-src="https://static.alili.tech/img/remote/1460000015727282?w=500&amp;h=317" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2>
<p>&#x8BF4;&#x5230;Vue&#x7684;&#x94A9;&#x5B50;&#x51FD;&#x6570;&#xFF0C;&#x53EF;&#x80FD;&#x5F88;&#x591A;&#x4EBA;&#x53EA;&#x505C;&#x7559;&#x5728;&#x4E00;&#x4E9B;&#x5F88;&#x7B80;&#x5355;&#x5E38;&#x7528;&#x7684;&#x94A9;&#x5B50;(<code>created</code>,<code>mounted</code>)&#xFF0C;&#x800C;&#x4E14;&#x5BF9;&#x4E8E;&#x91CC;&#x9762;&#x7684;&#x533A;&#x522B;&#xFF0C;&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x8BE5;&#x7528;&#x4EC0;&#x4E48;&#x94A9;&#x5B50;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x4ED4;&#x7EC6;&#x7684;&#x53BB;&#x7814;&#x7A76;&#x8FC7;&#xFF0C;&#x4E14;Vue&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x5728;&#x9762;&#x8BD5;&#x4E2D;&#x4E5F;&#x7B97;&#x662F;&#x6BD4;&#x8F83;&#x9AD8;&#x9891;&#x7684;&#x8003;&#x70B9;&#xFF0C;&#x90A3;&#x4E48;&#x8BE5;&#x5982;&#x4F55;&#x56DE;&#x7B54;&#x8FD9;&#x7C7B;&#x95EE;&#x9898;&#xFF0C;&#x8BA9;&#x4EBA;&#x6709;&#x773C;&#x524D;&#x4E00;&#x4EAE;&#x7684;&#x611F;&#x89C9;&#x5462;...</p>
<blockquote>&#x4E2A;&#x4EBA;&#x535A;&#x5BA2;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;&#xFF1A;<a href="http://obkoro1.com/" rel="nofollow noreferrer" target="_blank">obkoro1.com</a>
</blockquote>
<hr>
<h2 id="articleHeader1">Vue-Router&#x5BFC;&#x822A;&#x5B88;&#x536B;&#xFF1A;</h2>
<p>&#x6709;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x901A;&#x8FC7;&#x8DEF;&#x7531;&#x6765;&#x8FDB;&#x884C;&#x4E00;&#x4E9B;&#x64CD;&#x4F5C;&#xFF0C;&#x6BD4;&#x5982;&#x6700;&#x5E38;&#x89C1;&#x7684;&#x767B;&#x5F55;&#x6743;&#x9650;&#x9A8C;&#x8BC1;&#xFF0C;&#x5F53;&#x7528;&#x6237;&#x6EE1;&#x8DB3;&#x6761;&#x4EF6;&#x65F6;&#xFF0C;&#x624D;&#x8BA9;&#x5176;&#x8FDB;&#x5165;&#x5BFC;&#x822A;&#xFF0C;&#x5426;&#x5219;&#x5C31;&#x53D6;&#x6D88;&#x8DF3;&#x8F6C;&#xFF0C;&#x5E76;&#x8DF3;&#x5230;&#x767B;&#x5F55;&#x9875;&#x9762;&#x8BA9;&#x5176;&#x767B;&#x5F55;&#x3002;</p>
<p>&#x4E3A;&#x6B64;&#x6211;&#x4EEC;&#x6709;&#x5F88;&#x591A;&#x79CD;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x690D;&#x5165;&#x8DEF;&#x7531;&#x7684;&#x5BFC;&#x822A;&#x8FC7;&#x7A0B;&#xFF1A;<strong>&#x5168;&#x5C40;&#x7684;, &#x5355;&#x4E2A;&#x8DEF;&#x7531;&#x72EC;&#x4EAB;&#x7684;, &#x6216;&#x8005;&#x7EC4;&#x4EF6;&#x7EA7;&#x7684;</strong>,&#x63A8;&#x8350;&#x4F18;&#x5148;&#x9605;&#x8BFB;<a href="https://router.vuejs.org/zh/guide/advanced/navigation-guards.html" rel="nofollow noreferrer" target="_blank">&#x8DEF;&#x7531;&#x6587;&#x6863;</a></p>
<h3 id="articleHeader2">&#x5168;&#x5C40;&#x5B88;&#x536B;</h3>
<p>vue-router&#x5168;&#x5C40;&#x6709;&#x4E09;&#x4E2A;&#x5B88;&#x536B;&#xFF1A;</p>
<ol>
<li>router.beforeEach &#x5168;&#x5C40;&#x524D;&#x7F6E;&#x5B88;&#x536B; &#x8FDB;&#x5165;&#x8DEF;&#x7531;&#x4E4B;&#x524D;</li>
<li>router.beforeResolve &#x5168;&#x5C40;&#x89E3;&#x6790;&#x5B88;&#x536B;(2.5.0+) &#x5728;beforeRouteEnter&#x8C03;&#x7528;&#x4E4B;&#x540E;&#x8C03;&#x7528;</li>
<li>router.afterEach &#x5168;&#x5C40;&#x540E;&#x7F6E;&#x94A9;&#x5B50; &#x8FDB;&#x5165;&#x8DEF;&#x7531;&#x4E4B;&#x540E;</li>
</ol>
<p><strong>&#x4F7F;&#x7528;&#x65B9;&#x6CD5;</strong>&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // main.js &#x5165;&#x53E3;&#x6587;&#x4EF6;
    import router from &apos;./router&apos;; // &#x5F15;&#x5165;&#x8DEF;&#x7531;
    router.beforeEach((to, from, next) =&gt; { 
      next();
    });
    router.beforeResolve((to, from, next) =&gt; {
      next();
    });
    router.afterEach((to, from) =&gt; {
      console.log(&apos;afterEach &#x5168;&#x5C40;&#x540E;&#x7F6E;&#x94A9;&#x5B50;&apos;);
    });
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs moonscript"><code>    // main.js &#x5165;&#x53E3;&#x6587;&#x4EF6;
    <span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./router&apos;</span>; // &#x5F15;&#x5165;&#x8DEF;&#x7531;
    router.beforeEach(<span class="hljs-function"><span class="hljs-params">(to, <span class="hljs-keyword">from</span>, <span class="hljs-built_in">next</span>)</span> =&gt;</span> { 
      <span class="hljs-built_in">next</span>();
    });
    router.beforeResolve(<span class="hljs-function"><span class="hljs-params">(to, <span class="hljs-keyword">from</span>, <span class="hljs-built_in">next</span>)</span> =&gt;</span> {
      <span class="hljs-built_in">next</span>();
    });
    router.afterEach(<span class="hljs-function"><span class="hljs-params">(to, <span class="hljs-keyword">from</span>)</span> =&gt;</span> {
      console.log(<span class="hljs-string">&apos;afterEach &#x5168;&#x5C40;&#x540E;&#x7F6E;&#x94A9;&#x5B50;&apos;</span>);
    });
</code></pre>
<h4>to,from,next &#x8FD9;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;</h4>
<p>to&#x548C;from&#x662F;<strong>&#x5C06;&#x8981;&#x8FDB;&#x5165;&#x548C;&#x5C06;&#x8981;&#x79BB;&#x5F00;&#x7684;&#x8DEF;&#x7531;&#x5BF9;&#x8C61;</strong>,&#x8DEF;&#x7531;&#x5BF9;&#x8C61;&#x6307;&#x7684;&#x662F;&#x5E73;&#x65F6;&#x901A;&#x8FC7;this.$route&#x83B7;&#x53D6;&#x5230;&#x7684;&#x8DEF;&#x7531;&#x5BF9;&#x8C61;&#x3002;</p>
<p><strong>next:Function</strong> &#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x4E14;<strong>&#x5FC5;&#x987B;&#x8C03;&#x7528;&#xFF0C;&#x5426;&#x5219;&#x4E0D;&#x80FD;&#x8FDB;&#x5165;&#x8DEF;&#x7531;</strong>(&#x9875;&#x9762;&#x7A7A;&#x767D;)&#x3002;</p>
<ul>
<li>next() &#x8FDB;&#x5165;&#x8BE5;&#x8DEF;&#x7531;&#x3002;</li>
<li>next(false): &#x53D6;&#x6D88;&#x8FDB;&#x5165;&#x8DEF;&#x7531;&#xFF0C;url&#x5730;&#x5740;&#x91CD;&#x7F6E;&#x4E3A;from&#x8DEF;&#x7531;&#x5730;&#x5740;(&#x4E5F;&#x5C31;&#x662F;&#x5C06;&#x8981;&#x79BB;&#x5F00;&#x7684;&#x8DEF;&#x7531;&#x5730;&#x5740;)&#x3002;</li>
<li>next &#x8DF3;&#x8F6C;&#x65B0;&#x8DEF;&#x7531;&#xFF0C;&#x5F53;&#x524D;&#x7684;&#x5BFC;&#x822A;&#x88AB;&#x4E2D;&#x65AD;&#xFF0C;&#x91CD;&#x65B0;&#x5F00;&#x59CB;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x5BFC;&#x822A;&#x3002;<p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x8DF3;&#x8F6C;&#xFF1A;next(&apos;path&#x5730;&#x5740;&apos;)&#x6216;&#x8005;next({path:&apos;&apos;})&#x6216;&#x8005;next({name:&apos;&apos;})<br>&#x4E14;&#x5141;&#x8BB8;&#x8BBE;&#x7F6E;&#x8BF8;&#x5982; replace: true&#x3001;name: &apos;home&apos; &#x4E4B;&#x7C7B;&#x7684;&#x9009;&#x9879;<br>&#x4EE5;&#x53CA;&#x4F60;&#x7528;&#x5728;router-link&#x6216;router.push&#x7684;&#x5BF9;&#x8C61;&#x9009;&#x9879;&#x3002;</p>
</li>
</ul>
<h3 id="articleHeader3">&#x8DEF;&#x7531;&#x72EC;&#x4EAB;&#x5B88;&#x536B;</h3>
<p>&#x5982;&#x679C;&#x4F60;&#x4E0D;&#x60F3;&#x5168;&#x5C40;&#x914D;&#x7F6E;&#x5B88;&#x536B;&#x7684;&#x8BDD;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x4E3A;&#x67D0;&#x4E9B;&#x8DEF;&#x7531;&#x5355;&#x72EC;&#x914D;&#x7F6E;&#x5B88;&#x536B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const router = new VueRouter({
      routes: [
        {
          path: &apos;/foo&apos;,
          component: Foo,
          beforeEnter: (to, from, next) =&gt; { 
            // &#x53C2;&#x6570;&#x7528;&#x6CD5;&#x4EC0;&#x4E48;&#x7684;&#x90FD;&#x4E00;&#x6837;,&#x8C03;&#x7528;&#x987A;&#x5E8F;&#x5728;&#x5168;&#x5C40;&#x524D;&#x7F6E;&#x5B88;&#x536B;&#x540E;&#x9762;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x4F1A;&#x88AB;&#x5168;&#x5C40;&#x5B88;&#x536B;&#x8986;&#x76D6;
            // ...
          }
        }
      ]
    })
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
      <span class="hljs-attr">routes</span>: [
        {
          <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/foo&apos;</span>,
          <span class="hljs-attr">component</span>: Foo,
          <span class="hljs-attr">beforeEnter</span>: <span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> { 
            <span class="hljs-comment">// &#x53C2;&#x6570;&#x7528;&#x6CD5;&#x4EC0;&#x4E48;&#x7684;&#x90FD;&#x4E00;&#x6837;,&#x8C03;&#x7528;&#x987A;&#x5E8F;&#x5728;&#x5168;&#x5C40;&#x524D;&#x7F6E;&#x5B88;&#x536B;&#x540E;&#x9762;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x4F1A;&#x88AB;&#x5168;&#x5C40;&#x5B88;&#x536B;&#x8986;&#x76D6;</span>
            <span class="hljs-comment">// ...</span>
          }
        }
      ]
    })
</code></pre>
<h3 id="articleHeader4">&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x5185;&#x7684;&#x5B88;&#x536B;&#xFF1A;</h3>
<ol>
<li>beforeRouteEnter &#x8FDB;&#x5165;&#x8DEF;&#x7531;&#x524D;</li>
<li>beforeRouteUpdate (2.2) &#x8DEF;&#x7531;&#x590D;&#x7528;&#x540C;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x65F6;</li>
<li>beforeRouteLeave &#x79BB;&#x5F00;&#x5F53;&#x524D;&#x8DEF;&#x7531;&#x65F6;</li>
</ol>
<p><strong>&#x6587;&#x6863;&#x4E2D;&#x7684;&#x4ECB;&#x7ECD;&#xFF1A;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  beforeRouteEnter (to, from, next) {
    // &#x5728;&#x8DEF;&#x7531;&#x72EC;&#x4EAB;&#x5B88;&#x536B;&#x540E;&#x8C03;&#x7528; &#x4E0D;&#xFF01;&#x80FD;&#xFF01;&#x83B7;&#x53D6;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B; `this`&#xFF0C;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x8FD8;&#x6CA1;&#x88AB;&#x521B;&#x5EFA;
  },
  beforeRouteUpdate (to, from, next) {
    // &#x5728;&#x5F53;&#x524D;&#x8DEF;&#x7531;&#x6539;&#x53D8;&#xFF0C;&#x4F46;&#x662F;&#x8BE5;&#x7EC4;&#x4EF6;&#x88AB;&#x590D;&#x7528;&#x65F6;&#x8C03;&#x7528; &#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B; `this`
    // &#x4E3E;&#x4F8B;&#x6765;&#x8BF4;&#xFF0C;&#x5BF9;&#x4E8E;&#x4E00;&#x4E2A;&#x5E26;&#x6709;&#x52A8;&#x6001;&#x53C2;&#x6570;&#x7684;&#x8DEF;&#x5F84; /foo/:id&#xFF0C;&#x5728; /foo/1 &#x548C; /foo/2 &#x4E4B;&#x95F4;&#x8DF3;&#x8F6C;&#x7684;&#x65F6;&#x5019;&#xFF0C;
    // &#x7531;&#x4E8E;&#x4F1A;&#x6E32;&#x67D3;&#x540C;&#x6837;&#x7684; Foo &#x7EC4;&#x4EF6;&#xFF0C;&#x56E0;&#x6B64;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x4F1A;&#x88AB;&#x590D;&#x7528;&#x3002;&#x800C;&#x8FD9;&#x4E2A;&#x94A9;&#x5B50;&#x5C31;&#x4F1A;&#x5728;&#x8FD9;&#x4E2A;&#x60C5;&#x51B5;&#x4E0B;&#x88AB;&#x8C03;&#x7528;&#x3002;
  },
  beforeRouteLeave (to, from, next) {
    // &#x5BFC;&#x822A;&#x79BB;&#x5F00;&#x8BE5;&#x7EC4;&#x4EF6;&#x7684;&#x5BF9;&#x5E94;&#x8DEF;&#x7531;&#x65F6;&#x8C03;&#x7528;&#xFF0C;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B; `this`
  }
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs awk"><code>  beforeRouteEnter (to, from, <span class="hljs-keyword">next</span>) {
    <span class="hljs-regexp">//</span> &#x5728;&#x8DEF;&#x7531;&#x72EC;&#x4EAB;&#x5B88;&#x536B;&#x540E;&#x8C03;&#x7528; &#x4E0D;&#xFF01;&#x80FD;&#xFF01;&#x83B7;&#x53D6;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B; `this`&#xFF0C;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x8FD8;&#x6CA1;&#x88AB;&#x521B;&#x5EFA;
  },
  beforeRouteUpdate (to, from, <span class="hljs-keyword">next</span>) {
    <span class="hljs-regexp">//</span> &#x5728;&#x5F53;&#x524D;&#x8DEF;&#x7531;&#x6539;&#x53D8;&#xFF0C;&#x4F46;&#x662F;&#x8BE5;&#x7EC4;&#x4EF6;&#x88AB;&#x590D;&#x7528;&#x65F6;&#x8C03;&#x7528; &#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B; `this`
    <span class="hljs-regexp">//</span> &#x4E3E;&#x4F8B;&#x6765;&#x8BF4;&#xFF0C;&#x5BF9;&#x4E8E;&#x4E00;&#x4E2A;&#x5E26;&#x6709;&#x52A8;&#x6001;&#x53C2;&#x6570;&#x7684;&#x8DEF;&#x5F84; <span class="hljs-regexp">/foo/</span>:id&#xFF0C;&#x5728; <span class="hljs-regexp">/foo/</span><span class="hljs-number">1</span> &#x548C; <span class="hljs-regexp">/foo/</span><span class="hljs-number">2</span> &#x4E4B;&#x95F4;&#x8DF3;&#x8F6C;&#x7684;&#x65F6;&#x5019;&#xFF0C;
    <span class="hljs-regexp">//</span> &#x7531;&#x4E8E;&#x4F1A;&#x6E32;&#x67D3;&#x540C;&#x6837;&#x7684; Foo &#x7EC4;&#x4EF6;&#xFF0C;&#x56E0;&#x6B64;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x4F1A;&#x88AB;&#x590D;&#x7528;&#x3002;&#x800C;&#x8FD9;&#x4E2A;&#x94A9;&#x5B50;&#x5C31;&#x4F1A;&#x5728;&#x8FD9;&#x4E2A;&#x60C5;&#x51B5;&#x4E0B;&#x88AB;&#x8C03;&#x7528;&#x3002;
  },
  beforeRouteLeave (to, from, <span class="hljs-keyword">next</span>) {
    <span class="hljs-regexp">//</span> &#x5BFC;&#x822A;&#x79BB;&#x5F00;&#x8BE5;&#x7EC4;&#x4EF6;&#x7684;&#x5BF9;&#x5E94;&#x8DEF;&#x7531;&#x65F6;&#x8C03;&#x7528;&#xFF0C;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B; `this`
  }
</code></pre>
<p><strong>beforeRouteEnter&#x8BBF;&#x95EE;this</strong></p>
<p>&#x56E0;&#x4E3A;&#x94A9;&#x5B50;&#x5728;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x8FD8;&#x6CA1;&#x88AB;&#x521B;&#x5EFA;&#x7684;&#x65F6;&#x5019;&#x8C03;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x80FD;&#x83B7;&#x53D6;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B; <code>this</code>&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4F20;&#x4E00;&#x4E2A;&#x56DE;&#x8C03;&#x7ED9;<code>next</code>&#x6765;&#x8BBF;&#x95EE;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;<br>&#x3002;</p>
<p>&#x4F46;&#x662F;<strong>&#x56DE;&#x8C03;&#x7684;&#x6267;&#x884C;&#x65F6;&#x673A;&#x5728;mounted&#x540E;&#x9762;</strong>,&#x6240;&#x4EE5;&#x5728;&#x6211;&#x770B;&#x6765;&#x8FD9;&#x91CC;&#x5BF9;this&#x7684;&#x8BBF;&#x95EE;&#x610F;&#x4E49;&#x4E0D;&#x592A;&#x5927;&#xFF0C;&#x53EF;&#x4EE5;&#x653E;&#x5728;<code>created</code>&#x6216;&#x8005;<code>mounted</code>&#x91CC;&#x9762;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    beforeRouteEnter (to, from, next) {
    console.log(&apos;&#x5728;&#x8DEF;&#x7531;&#x72EC;&#x4EAB;&#x5B88;&#x536B;&#x540E;&#x8C03;&#x7528;&apos;);
      next(vm =&gt; {
        // &#x901A;&#x8FC7; `vm` &#x8BBF;&#x95EE;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;`this` &#x6267;&#x884C;&#x56DE;&#x8C03;&#x7684;&#x65F6;&#x673A;&#x5728;mounted&#x540E;&#x9762;&#xFF0C;
      })
    }
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>    beforeRouteEnter (to, <span class="hljs-keyword">from</span>, next) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x5728;&#x8DEF;&#x7531;&#x72EC;&#x4EAB;&#x5B88;&#x536B;&#x540E;&#x8C03;&#x7528;&apos;</span>);
      next(vm =&gt; {
        <span class="hljs-regexp">//</span> &#x901A;&#x8FC7; `<span class="javascript">vm</span>` &#x8BBF;&#x95EE;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;`<span class="javascript"><span class="hljs-keyword">this</span></span>` &#x6267;&#x884C;&#x56DE;&#x8C03;&#x7684;&#x65F6;&#x673A;&#x5728;mounted&#x540E;&#x9762;&#xFF0C;
      })
    }
</code></pre>
<p><strong>beforeRouteLeave&#xFF1A;</strong></p>
<p>&#x5BFC;&#x822A;&#x79BB;&#x5F00;&#x8BE5;&#x7EC4;&#x4EF6;&#x7684;&#x5BF9;&#x5E94;&#x8DEF;&#x7531;&#x65F6;&#x8C03;&#x7528;&#xFF0C;&#x6211;&#x4EEC;&#x7528;&#x5B83;&#x6765;&#x7981;&#x6B62;&#x7528;&#x6237;&#x79BB;&#x5F00;&#xFF0C;&#x6BD4;&#x5982;&#x8FD8;&#x672A;&#x4FDD;&#x5B58;&#x8349;&#x7A3F;&#xFF0C;&#x6216;&#x8005;&#x5728;&#x7528;&#x6237;&#x79BB;&#x5F00;&#x524D;&#xFF0C;&#x5C06;<code>setInterval</code>&#x9500;&#x6BC1;&#xFF0C;&#x9632;&#x6B62;&#x79BB;&#x5F00;&#x4E4B;&#x540E;&#xFF0C;&#x5B9A;&#x65F6;&#x5668;&#x8FD8;&#x5728;&#x8C03;&#x7528;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    beforeRouteLeave (to, from , next) {
      if (&#x6587;&#x7AE0;&#x4FDD;&#x5B58;) {
        next(); // &#x5141;&#x8BB8;&#x79BB;&#x5F00;&#x6216;&#x8005;&#x53EF;&#x4EE5;&#x8DF3;&#x5230;&#x522B;&#x7684;&#x8DEF;&#x7531; &#x4E0A;&#x9762;&#x8BB2;&#x8FC7;&#x4E86;
      } else {
        next(false); // &#x53D6;&#x6D88;&#x79BB;&#x5F00;
      }
    }
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs gradle"><code>    beforeRouteLeave (to, <span class="hljs-keyword">from</span> , <span class="hljs-keyword">next</span>) {
      <span class="hljs-keyword">if</span> (&#x6587;&#x7AE0;&#x4FDD;&#x5B58;) {
        <span class="hljs-keyword">next</span>(); <span class="hljs-comment">// &#x5141;&#x8BB8;&#x79BB;&#x5F00;&#x6216;&#x8005;&#x53EF;&#x4EE5;&#x8DF3;&#x5230;&#x522B;&#x7684;&#x8DEF;&#x7531; &#x4E0A;&#x9762;&#x8BB2;&#x8FC7;&#x4E86;</span>
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">next</span>(<span class="hljs-keyword">false</span>); <span class="hljs-comment">// &#x53D6;&#x6D88;&#x79BB;&#x5F00;</span>
      }
    }
</code></pre>
<h3 id="articleHeader5">&#x5173;&#x4E8E;&#x94A9;&#x5B50;&#x7684;&#x4E00;&#x4E9B;&#x77E5;&#x8BC6;&#xFF1A;</h3>
<h4>&#x8DEF;&#x7531;&#x94A9;&#x5B50;&#x51FD;&#x6570;&#x7684;&#x9519;&#x8BEF;&#x6355;&#x83B7;</h4>
<p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x5728;&#x5168;&#x5C40;&#x5B88;&#x536B;/&#x8DEF;&#x7531;&#x72EC;&#x4EAB;&#x5B88;&#x536B;/&#x7EC4;&#x4EF6;&#x8DEF;&#x7531;&#x5B88;&#x536B;&#x7684;&#x94A9;&#x5B50;&#x51FD;&#x6570;&#x4E2D;&#x6709;&#x9519;&#x8BEF;&#xFF0C;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x6355;&#x83B7;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    router.onError(callback =&gt; { 
    // 2.4.0&#x65B0;&#x589E; &#x5E76;&#x4E0D;&#x5E38;&#x7528;&#xFF0C;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;&#x5C31;&#x53EF;&#x4EE5;&#x4E86; 
      console.log(callback, &apos;callback&apos;);
    });
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>    router.onError(<span class="hljs-function"><span class="hljs-params">callback</span> =&gt;</span> { 
    <span class="hljs-comment">// 2.4.0&#x65B0;&#x589E; &#x5E76;&#x4E0D;&#x5E38;&#x7528;&#xFF0C;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;&#x5C31;&#x53EF;&#x4EE5;&#x4E86; </span>
      <span class="hljs-built_in">console</span>.log(callback, <span class="hljs-string">&apos;callback&apos;</span>);
    });
</code></pre>
<p>&#x5728;&#x8DEF;&#x7531;&#x6587;&#x6863;&#x4E2D;&#x8FD8;&#x6709;&#x66F4;&#x591A;&#x7684;<a href="https://router.vuejs.org/zh/api/#router-%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95" rel="nofollow noreferrer" target="_blank">&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;</a>&#xFF1A;&#x52A8;&#x6001;&#x6DFB;&#x52A0;&#x8DEF;&#x7531;&#x7B49;&#xFF0C;&#x6709;&#x5174;&#x8DA3;&#x53EF;&#x4EE5;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;&#x3002;</p>
<h4>&#x8DF3;&#x8F6C;&#x6B7B;&#x5FAA;&#x73AF;&#xFF0C;&#x9875;&#x9762;&#x6C38;&#x8FDC;&#x7A7A;&#x767D;</h4>
<p>&#x6211;&#x4E86;&#x89E3;&#x5230;&#x7684;&#xFF0C;&#x5F88;&#x591A;&#x4EBA;&#x4F1A;&#x78B0;&#x5230;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x6765;&#x770B;&#x4E00;&#x4E0B;&#x8FD9;&#x6BB5;&#x4F2A;&#x4EE3;&#x7801;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    router.beforeEach((to, from, next) =&gt; {
      if(&#x767B;&#x5F55;){
         next()
      }else{
          next({ name: &apos;login&apos; }); 
      }
    });
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs moonscript"><code>    router.beforeEach(<span class="hljs-function"><span class="hljs-params">(to, <span class="hljs-keyword">from</span>, <span class="hljs-built_in">next</span>)</span> =&gt;</span> {
      <span class="hljs-keyword">if</span>(&#x767B;&#x5F55;){
         <span class="hljs-built_in">next</span>()
      }<span class="hljs-keyword">else</span>{
          <span class="hljs-built_in">next</span>({ <span class="hljs-name">name</span>: <span class="hljs-string">&apos;login&apos;</span> }); 
      }
    });
</code></pre>
<p>&#x770B;&#x903B;&#x8F91;&#x8C8C;&#x4F3C;&#x662F;&#x5BF9;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x5F53;&#x6211;&#x4EEC;&#x8DF3;&#x8F6C;&#x5230;<code>login</code>&#x4E4B;&#x540E;&#xFF0C;&#x56E0;&#x4E3A;&#x6B64;&#x65F6;&#x8FD8;&#x662F;&#x672A;&#x767B;&#x5F55;&#x72B6;&#x6001;&#xFF0C;&#x6240;&#x4EE5;&#x4F1A;&#x4E00;&#x76F4;&#x8DF3;&#x8F6C;&#x5230;<code>login</code>&#x7136;&#x540E;&#x6B7B;&#x5FAA;&#x73AF;&#xFF0C;&#x9875;&#x9762;&#x4E00;&#x76F4;&#x662F;&#x7A7A;&#x767D;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#xFF1A;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x628A;&#x5224;&#x65AD;&#x6761;&#x4EF6;&#x7A0D;&#x5FAE;&#x6539;&#x4E00;&#x4E0B;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    if(&#x767B;&#x5F55; || to.name === &apos;login&apos;){ next() } // &#x767B;&#x5F55;&#xFF0C;&#x6216;&#x8005;&#x5C06;&#x8981;&#x524D;&#x5F80;login&#x9875;&#x9762;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x5141;&#x8BB8;&#x8FDB;&#x5165;&#x8DEF;&#x7531;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs sqf"><code>    <span class="hljs-keyword">if</span>(&#x767B;&#x5F55; || <span class="hljs-keyword">to</span>.<span class="hljs-built_in">name</span> === <span class="hljs-string">&apos;login&apos;</span>){ next() } <span class="hljs-comment">// &#x767B;&#x5F55;&#xFF0C;&#x6216;&#x8005;&#x5C06;&#x8981;&#x524D;&#x5F80;login&#x9875;&#x9762;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x5141;&#x8BB8;&#x8FDB;&#x5165;&#x8DEF;&#x7531;</span>
</code></pre>
<h4>&#x5168;&#x5C40;&#x540E;&#x7F6E;&#x94A9;&#x5B50;&#x7684;&#x8DF3;&#x8F6C;&#xFF1A;</h4>
<p>&#x6587;&#x6863;&#x4E2D;&#x63D0;&#x5230;&#x56E0;&#x4E3A;router.afterEach&#x4E0D;&#x63A5;&#x53D7;<code>next</code>&#x51FD;&#x6570;&#x6240;&#x4EE5;&#x4E5F;&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x5BFC;&#x822A;&#x672C;&#x8EAB;&#xFF0C;&#x610F;&#x601D;&#x5C31;&#x662F;&#x53EA;&#x80FD;&#x5F53;&#x6210;&#x4E00;&#x4E2A;&#x94A9;&#x5B50;&#x6765;&#x4F7F;&#x7528;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x81EA;&#x5DF1;&#x5728;&#x8BD5;&#x7684;&#x65F6;&#x5019;&#x53D1;&#x73B0;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8FD9;&#x79CD;&#x5F62;&#x5F0F;&#x6765;&#x5B9E;&#x73B0;&#x8DF3;&#x8F6C;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // main.js &#x5165;&#x53E3;&#x6587;&#x4EF6;
    import router from &apos;./router&apos;; // &#x5F15;&#x5165;&#x8DEF;&#x7531;
    router.afterEach((to, from) =&gt; {
      if (&#x672A;&#x767B;&#x5F55; &amp;&amp; to.name !== &apos;login&apos;) {
        router.push({ name: &apos;login&apos; }); // &#x8DF3;&#x8F6C;login
      }
    });
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs sqf"><code>    <span class="hljs-comment">// main.js &#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
    import router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./router&apos;</span>; <span class="hljs-comment">// &#x5F15;&#x5165;&#x8DEF;&#x7531;</span>
    router.afterEach((<span class="hljs-keyword">to</span>, <span class="hljs-keyword">from</span>) =&gt; {
      <span class="hljs-keyword">if</span> (&#x672A;&#x767B;&#x5F55; &amp;&amp; <span class="hljs-keyword">to</span>.<span class="hljs-built_in">name</span> !== <span class="hljs-string">&apos;login&apos;</span>) {
        router.push({ <span class="hljs-built_in">name</span>: <span class="hljs-string">&apos;login&apos;</span> }); <span class="hljs-comment">// &#x8DF3;&#x8F6C;login</span>
      }
    });
</code></pre>
<p>&#x989D;&#xFF0C;&#x901A;&#x8FC7;router.beforeEach &#x4E5F;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x4E14;&#x66F4;&#x597D;&#xFF0C;&#x6211;&#x5C31;&#x9A9A;&#x4E00;&#x4E0B;&#x3002;</p>
<h3 id="articleHeader6">&#x5B8C;&#x6574;&#x7684;&#x8DEF;&#x7531;&#x5BFC;&#x822A;&#x89E3;&#x6790;&#x6D41;&#x7A0B;(&#x4E0D;&#x5305;&#x62EC;&#x5176;&#x4ED6;&#x751F;&#x547D;&#x5468;&#x671F;)&#xFF1A;</h3>
<ol>
<li>&#x89E6;&#x53D1;&#x8FDB;&#x5165;&#x5176;&#x4ED6;&#x8DEF;&#x7531;&#x3002;</li>
<li>&#x8C03;&#x7528;&#x8981;&#x79BB;&#x5F00;&#x8DEF;&#x7531;&#x7684;&#x7EC4;&#x4EF6;&#x5B88;&#x536B;<code>beforeRouteLeave </code>
</li>
<li>&#x8C03;&#x7528;&#x5C40;&#x524D;&#x7F6E;&#x5B88;&#x536B;&#xFF1A;<code>beforeEach</code>
</li>
<li>&#x5728;&#x91CD;&#x7528;&#x7684;&#x7EC4;&#x4EF6;&#x91CC;&#x8C03;&#x7528; <code>beforeRouteUpdate</code>
</li>
<li>&#x8C03;&#x7528;&#x8DEF;&#x7531;&#x72EC;&#x4EAB;&#x5B88;&#x536B; <code>beforeEnter</code>&#x3002;</li>
<li>&#x89E3;&#x6790;&#x5F02;&#x6B65;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x3002;</li>
<li>&#x5728;&#x5C06;&#x8981;&#x8FDB;&#x5165;&#x7684;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x4E2D;&#x8C03;&#x7528;<code>beforeRouteEnter</code>
</li>
<li>&#x8C03;&#x7528;&#x5168;&#x5C40;&#x89E3;&#x6790;&#x5B88;&#x536B; <code>beforeResolve</code>
</li>
<li>&#x5BFC;&#x822A;&#x88AB;&#x786E;&#x8BA4;&#x3002;</li>
<li>&#x8C03;&#x7528;&#x5168;&#x5C40;&#x540E;&#x7F6E;&#x94A9;&#x5B50;&#x7684; <code>afterEach</code> &#x94A9;&#x5B50;&#x3002;</li>
<li>&#x89E6;&#x53D1;DOM&#x66F4;&#x65B0;(<code>mounted</code>)&#x3002;</li>
<li>&#x6267;&#x884C;<code>beforeRouteEnter</code> &#x5B88;&#x536B;&#x4E2D;&#x4F20;&#x7ED9; next &#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;</li>
</ol>
<hr>
<h2 id="articleHeader7">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;keep-alive[&#x6211;&#x731C;&#x4F60;&#x4E0D;&#x77E5;&#x9053;]</h2>
<p>&#x5728;&#x5F00;&#x53D1;Vue&#x9879;&#x76EE;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5927;&#x90E8;&#x5206;&#x7EC4;&#x4EF6;&#x662F;&#x6CA1;&#x5FC5;&#x8981;&#x591A;&#x6B21;&#x6E32;&#x67D3;&#x7684;&#xFF0C;&#x6240;&#x4EE5;Vue&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x5185;&#x7F6E;&#x7EC4;&#x4EF6;<code>keep-alive</code>&#x6765;<strong>&#x7F13;&#x5B58;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x72B6;&#x6001;&#xFF0C;&#x907F;&#x514D;&#x91CD;&#x65B0;&#x6E32;&#x67D3;</strong>&#xFF0C;<a href="https://cn.vuejs.org/v2/api/#keep-alive" rel="nofollow noreferrer" target="_blank">&#x6587;&#x6863;&#x5728;&#x8FD9;&#x91CC;</a>&#x3002;</p>
<blockquote>&#x6587;&#x6863;&#xFF1A;&#x548C; <code>&lt;transition&gt; </code>&#x76F8;&#x4F3C;&#xFF0C;<code>&lt;keep-alive&gt;</code> &#x662F;&#x4E00;&#x4E2A;&#x62BD;&#x8C61;&#x7EC4;&#x4EF6;&#xFF1A;&#x5B83;&#x81EA;&#x8EAB;&#x4E0D;&#x4F1A;&#x6E32;&#x67D3;&#x4E00;&#x4E2A; DOM &#x5143;&#x7D20;&#xFF0C;&#x4E5F;&#x4E0D;&#x4F1A;&#x51FA;&#x73B0;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x94FE;&#x4E2D;&#x3002;</blockquote>
<h3 id="articleHeader8">&#x7528;&#x6CD5;&#xFF1A;</h3>
<p><strong>&#x7F13;&#x5B58;&#x52A8;&#x6001;&#x7EC4;&#x4EF6;&#xFF1A;</strong></p>
<p><code>&lt;keep-alive&gt; </code>&#x5305;&#x88F9;&#x52A8;&#x6001;&#x7EC4;&#x4EF6;&#x65F6;&#xFF0C;&#x4F1A;&#x7F13;&#x5B58;&#x4E0D;&#x6D3B;&#x52A8;&#x7684;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x9500;&#x6BC1;&#x5B83;&#x4EEC;&#xFF0C;&#x6B64;&#x79CD;&#x65B9;&#x5F0F;&#x5E76;&#x65E0;&#x592A;&#x5927;&#x7684;&#x5B9E;&#x7528;&#x610F;&#x4E49;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;!-- &#x57FA;&#x672C; --&gt;
    &lt;keep-alive&gt;
      &lt;component :is=&quot;view&quot;&gt;&lt;/component&gt;
    &lt;/keep-alive&gt;
    
    &lt;!-- &#x591A;&#x4E2A;&#x6761;&#x4EF6;&#x5224;&#x65AD;&#x7684;&#x5B50;&#x7EC4;&#x4EF6; --&gt;
    &lt;keep-alive&gt;
      &lt;comp-a v-if=&quot;a &gt; 1&quot;&gt;&lt;/comp-a&gt;
      &lt;comp-b v-else&gt;&lt;/comp-b&gt;
    &lt;/keep-alive&gt;

" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-comment">&lt;!-- &#x57FA;&#x672C; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">&quot;view&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>
    
    <span class="hljs-comment">&lt;!-- &#x591A;&#x4E2A;&#x6761;&#x4EF6;&#x5224;&#x65AD;&#x7684;&#x5B50;&#x7EC4;&#x4EF6; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">comp-a</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;a &gt; 1&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comp-a</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">comp-b</span> <span class="hljs-attr">v-else</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comp-b</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>

</code></pre>
<p><strong>&#x7F13;&#x5B58;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#xFF1A;</strong></p>
<p>&#x4F7F;&#x7528;<code>keep-alive</code>&#x53EF;&#x4EE5;&#x5C06;&#x6240;&#x6709;&#x8DEF;&#x5F84;&#x5339;&#x914D;&#x5230;&#x7684;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x90FD;&#x7F13;&#x5B58;&#x8D77;&#x6765;&#xFF0C;&#x5305;&#x62EC;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x91CC;&#x9762;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;<code>keep-alive</code>&#x5927;&#x591A;&#x6570;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x5C31;&#x662F;&#x8FD9;&#x79CD;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;keep-alive&gt;
        &lt;router-view&gt;&lt;/router-view&gt;
    &lt;/keeo-alive&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs apache"><code>    <span class="hljs-section">&lt;keep-alive&gt;</span>
        <span class="hljs-section">&lt;router-view&gt;</span><span class="hljs-section">&lt;/router-view&gt;</span>
    <span class="hljs-section">&lt;/keeo-alive&gt;</span>
</code></pre>
<h3 id="articleHeader9">&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;&#xFF1A;</h3>
<p>&#x8FD9;&#x7BC7;&#x65E2;&#x7136;&#x662F;Vue&#x94A9;&#x5B50;&#x51FD;&#x6570;&#x7684;&#x4E13;&#x573A;&#xFF0C;&#x90A3;&#x80AF;&#x5B9A;&#x8981;&#x6263;&#x9898;&#x5440;~</p>
<p>&#x5728;&#x88AB;<code>keep-alive</code>&#x5305;&#x542B;&#x7684;&#x7EC4;&#x4EF6;/&#x8DEF;&#x7531;&#x4E2D;&#xFF0C;&#x4F1A;&#x591A;&#x51FA;&#x4E24;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#x7684;&#x94A9;&#x5B50;:<code>activated</code> &#x4E0E; <code>deactivated</code>&#x3002;</p>
<blockquote>&#x6587;&#x6863;&#xFF1A;&#x5728; 2.2.0 &#x53CA;&#x5176;&#x66F4;&#x9AD8;&#x7248;&#x672C;&#x4E2D;&#xFF0C;activated &#x548C; deactivated &#x5C06;&#x4F1A;&#x5728; &lt;keep-alive&gt; &#x6811;&#x5185;&#x7684;<strong>&#x6240;&#x6709;&#x5D4C;&#x5957;&#x7EC4;&#x4EF6;</strong>&#x4E2D;&#x89E6;&#x53D1;&#x3002;</blockquote>
<p><strong>activated&#x5728;&#x7EC4;&#x4EF6;&#x7B2C;&#x4E00;&#x6B21;&#x6E32;&#x67D3;&#x65F6;&#x4F1A;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x4E4B;&#x540E;&#x5728;&#x6BCF;&#x6B21;&#x7F13;&#x5B58;&#x7EC4;&#x4EF6;&#x88AB;&#x6FC0;&#x6D3B;&#x65F6;&#x8C03;&#x7528;</strong>&#x3002;</p>
<p><strong>activated&#x8C03;&#x7528;&#x65F6;&#x673A;&#xFF1A;</strong></p>
<p>&#x7B2C;&#x4E00;&#x6B21;&#x8FDB;&#x5165;&#x7F13;&#x5B58;&#x8DEF;&#x7531;/&#x7EC4;&#x4EF6;&#xFF0C;&#x5728;<code>mounted</code>&#x540E;&#x9762;&#xFF0C;<code>beforeRouteEnter</code>&#x5B88;&#x536B;&#x4F20;&#x7ED9; next &#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E4B;&#x524D;&#x8C03;&#x7528;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    beforeMount=&gt; &#x5982;&#x679C;&#x4F60;&#x662F;&#x4ECE;&#x522B;&#x7684;&#x8DEF;&#x7531;/&#x7EC4;&#x4EF6;&#x8FDB;&#x6765;(&#x7EC4;&#x4EF6;&#x9500;&#x6BC1;destroyed/&#x6216;&#x79BB;&#x5F00;&#x7F13;&#x5B58;deactivated)=&gt;
    mounted=&gt; activated &#x8FDB;&#x5165;&#x7F13;&#x5B58;&#x7EC4;&#x4EF6; =&gt; &#x6267;&#x884C; beforeRouteEnter&#x56DE;&#x8C03;

" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs coq"><code>    beforeMount=&gt; &#x5982;&#x679C;&#x4F60;&#x662F;&#x4ECE;&#x522B;&#x7684;&#x8DEF;&#x7531;/&#x7EC4;&#x4EF6;&#x8FDB;&#x6765;(&#x7EC4;&#x4EF6;&#x9500;&#x6BC1;destroyed/&#x6216;&#x79BB;&#x5F00;&#x7F13;&#x5B58;deactivated)=&gt;
    mounted=&gt; activated &#x8FDB;&#x5165;&#x7F13;&#x5B58;&#x7EC4;&#x4EF6; =&gt; &#x6267;&#x884C; beforeRouteEnter&#x56DE;&#x8C03;

</code></pre>
<p>&#x56E0;&#x4E3A;&#x7EC4;&#x4EF6;&#x88AB;&#x7F13;&#x5B58;&#x4E86;&#xFF0C;<strong>&#x518D;&#x6B21;&#x8FDB;&#x5165;&#x7F13;&#x5B58;&#x8DEF;&#x7531;/&#x7EC4;&#x4EF6;&#x65F6;&#xFF0C;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;&#x8FD9;&#x4E9B;&#x94A9;&#x5B50;</strong>&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    // beforeCreate created beforeMount mounted &#x90FD;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs armasm"><code>
    // <span class="hljs-keyword">beforeCreate </span>created <span class="hljs-keyword">beforeMount </span>mounted &#x90FD;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;&#x3002;
</code></pre>
<p>&#x6240;&#x4EE5;&#x4E4B;&#x540E;&#x7684;&#x8C03;&#x7528;&#x65F6;&#x673A;&#x662F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &#x7EC4;&#x4EF6;&#x9500;&#x6BC1;destroyed/&#x6216;&#x79BB;&#x5F00;&#x7F13;&#x5B58;deactivated =&gt; activated &#x8FDB;&#x5165;&#x5F53;&#x524D;&#x7F13;&#x5B58;&#x7EC4;&#x4EF6; 
    =&gt; &#x6267;&#x884C; beforeRouteEnter&#x56DE;&#x8C03;
    // &#x7EC4;&#x4EF6;&#x7F13;&#x5B58;&#x6216;&#x9500;&#x6BC1;&#xFF0C;&#x5D4C;&#x5957;&#x7EC4;&#x4EF6;&#x7684;&#x9500;&#x6BC1;&#x548C;&#x7F13;&#x5B58;&#x4E5F;&#x5728;&#x8FD9;&#x91CC;&#x89E6;&#x53D1;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs dart"><code>    &#x7EC4;&#x4EF6;&#x9500;&#x6BC1;destroyed/&#x6216;&#x79BB;&#x5F00;&#x7F13;&#x5B58;deactivated =&gt; activated &#x8FDB;&#x5165;&#x5F53;&#x524D;&#x7F13;&#x5B58;&#x7EC4;&#x4EF6; 
    =&gt; &#x6267;&#x884C; beforeRouteEnter&#x56DE;&#x8C03;
    <span class="hljs-comment">// &#x7EC4;&#x4EF6;&#x7F13;&#x5B58;&#x6216;&#x9500;&#x6BC1;&#xFF0C;&#x5D4C;&#x5957;&#x7EC4;&#x4EF6;&#x7684;&#x9500;&#x6BC1;&#x548C;&#x7F13;&#x5B58;&#x4E5F;&#x5728;&#x8FD9;&#x91CC;&#x89E6;&#x53D1;</span>
</code></pre>
<p><strong>deactivated&#xFF1A;&#x7EC4;&#x4EF6;&#x88AB;&#x505C;&#x7528;(&#x79BB;&#x5F00;&#x8DEF;&#x7531;)&#x65F6;&#x8C03;&#x7528;</strong></p>
<p><strong>&#x4F7F;&#x7528;&#x4E86;<code>keep-alive</code>&#x5C31;&#x4E0D;&#x4F1A;&#x8C03;&#x7528;<code>beforeDestroy</code>(&#x7EC4;&#x4EF6;&#x9500;&#x6BC1;&#x524D;&#x94A9;&#x5B50;)&#x548C;<code>destroyed</code>(&#x7EC4;&#x4EF6;&#x9500;&#x6BC1;)&#xFF0C;&#x56E0;&#x4E3A;&#x7EC4;&#x4EF6;&#x6CA1;&#x88AB;&#x9500;&#x6BC1;&#xFF0C;&#x88AB;&#x7F13;&#x5B58;&#x8D77;&#x6765;&#x4E86;</strong>&#x3002;</p>
<p>&#x8FD9;&#x4E2A;&#x94A9;&#x5B50;&#x53EF;&#x4EE5;&#x770B;&#x4F5C;<code>beforeDestroy</code>&#x7684;&#x66FF;&#x4EE3;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x7F13;&#x5B58;&#x4E86;&#x7EC4;&#x4EF6;&#xFF0C;&#x8981;&#x5728;&#x7EC4;&#x4EF6;&#x9500;&#x6BC1;&#x7684;&#x7684;&#x65F6;&#x5019;&#x505A;&#x4E00;&#x4E9B;&#x4E8B;&#x60C5;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x653E;&#x5728;&#x8FD9;&#x4E2A;&#x94A9;&#x5B50;&#x91CC;&#x3002;</p>
<p>&#x5982;&#x679C;&#x4F60;&#x79BB;&#x5F00;&#x4E86;&#x8DEF;&#x7531;&#xFF0C;&#x4F1A;&#x4F9D;&#x6B21;&#x89E6;&#x53D1;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &#x7EC4;&#x4EF6;&#x5185;&#x7684;&#x79BB;&#x5F00;&#x5F53;&#x524D;&#x8DEF;&#x7531;&#x94A9;&#x5B50;beforeRouteLeave =&gt;  &#x8DEF;&#x7531;&#x524D;&#x7F6E;&#x5B88;&#x536B; beforeEach =&gt;
    &#x5168;&#x5C40;&#x540E;&#x7F6E;&#x94A9;&#x5B50;afterEach =&gt; deactivated &#x79BB;&#x5F00;&#x7F13;&#x5B58;&#x7EC4;&#x4EF6; =&gt; activated &#x8FDB;&#x5165;&#x7F13;&#x5B58;&#x7EC4;&#x4EF6;(&#x5982;&#x679C;&#x4F60;&#x8FDB;&#x5165;&#x7684;&#x4E5F;&#x662F;&#x7F13;&#x5B58;&#x8DEF;&#x7531;)
    // &#x5982;&#x679C;&#x79BB;&#x5F00;&#x7684;&#x7EC4;&#x4EF6;&#x6CA1;&#x6709;&#x7F13;&#x5B58;&#x7684;&#x8BDD; beforeDestroy&#x4F1A;&#x66FF;&#x6362;deactivated 
    // &#x5982;&#x679C;&#x8FDB;&#x5165;&#x7684;&#x8DEF;&#x7531;&#x4E5F;&#x6CA1;&#x6709;&#x7F13;&#x5B58;&#x7684;&#x8BDD;  &#x5168;&#x5C40;&#x540E;&#x7F6E;&#x94A9;&#x5B50;afterEach=&gt;&#x9500;&#x6BC1; destroyed=&gt; beforeCreate&#x7B49;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs coq"><code>    &#x7EC4;&#x4EF6;&#x5185;&#x7684;&#x79BB;&#x5F00;&#x5F53;&#x524D;&#x8DEF;&#x7531;&#x94A9;&#x5B50;beforeRouteLeave =&gt;  &#x8DEF;&#x7531;&#x524D;&#x7F6E;&#x5B88;&#x536B; beforeEach =&gt;
    &#x5168;&#x5C40;&#x540E;&#x7F6E;&#x94A9;&#x5B50;afterEach =&gt; deactivated &#x79BB;&#x5F00;&#x7F13;&#x5B58;&#x7EC4;&#x4EF6; =&gt; activated &#x8FDB;&#x5165;&#x7F13;&#x5B58;&#x7EC4;&#x4EF6;(&#x5982;&#x679C;&#x4F60;&#x8FDB;&#x5165;&#x7684;&#x4E5F;&#x662F;&#x7F13;&#x5B58;&#x8DEF;&#x7531;)
    // &#x5982;&#x679C;&#x79BB;&#x5F00;&#x7684;&#x7EC4;&#x4EF6;&#x6CA1;&#x6709;&#x7F13;&#x5B58;&#x7684;&#x8BDD; beforeDestroy&#x4F1A;&#x66FF;&#x6362;deactivated 
    // &#x5982;&#x679C;&#x8FDB;&#x5165;&#x7684;&#x8DEF;&#x7531;&#x4E5F;&#x6CA1;&#x6709;&#x7F13;&#x5B58;&#x7684;&#x8BDD;  &#x5168;&#x5C40;&#x540E;&#x7F6E;&#x94A9;&#x5B50;afterEach=&gt;&#x9500;&#x6BC1; destroyed=&gt; beforeCreate&#x7B49;
</code></pre>
<p>&#x90A3;&#x4E48;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x53EA;&#x662F;&#x60F3;&#x7F13;&#x5B58;&#x5176;&#x4E2D;&#x51E0;&#x4E2A;&#x8DEF;&#x7531;/&#x7EC4;&#x4EF6;&#xFF0C;&#x90A3;&#x8BE5;&#x600E;&#x4E48;&#x505A;&#xFF1F;</p>
<h3 id="articleHeader10">&#x7F13;&#x5B58;&#x4F60;&#x60F3;&#x7F13;&#x5B58;&#x7684;&#x8DEF;&#x7531;&#xFF1A;</h3>
<h4>Vue2.1.0&#x4E4B;&#x524D;:</h4>
<p>&#x60F3;&#x5B9E;&#x73B0;&#x7C7B;&#x4F3C;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#xFF1A;</p>
<ol>
<li>&#x914D;&#x7F6E;&#x4E00;&#x4E0B;&#x8DEF;&#x7531;&#x5143;&#x4FE1;&#x606F;</li>
<li>&#x521B;&#x5EFA;&#x4E24;&#x4E2A;<code>keep-alive</code>&#x6807;&#x7B7E;</li>
<li>
<p>&#x4F7F;&#x7528;<code>v-if</code>&#x901A;&#x8FC7;&#x8DEF;&#x7531;&#x5143;&#x4FE1;&#x606F;&#x5224;&#x65AD;&#x7F13;&#x5B58;&#x54EA;&#x4E9B;&#x8DEF;&#x7531;&#x3002;</p>
<p>&lt;keep-alive&gt;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;router-view v-if=&quot;$route.meta.keepAlive&quot;&gt;
        &lt;!--&#x8FD9;&#x91CC;&#x662F;&#x4F1A;&#x88AB;&#x7F13;&#x5B58;&#x7684;&#x8DEF;&#x7531;--&gt;
    &lt;/router-view&gt;
&lt;/keep-alive&gt;       
&lt;router-view v-if=&quot;!$route.meta.keepAlive&quot;&gt;
    &lt;!--&#x56E0;&#x4E3A;&#x7528;&#x7684;&#x662F;v-if &#x6240;&#x4EE5;&#x4E0B;&#x9762;&#x8FD8;&#x8981;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x672A;&#x7F13;&#x5B58;&#x7684;&#x8DEF;&#x7531;&#x89C6;&#x56FE;&#x51FA;&#x53E3;--&gt;
&lt;/router-view&gt;
//router&#x914D;&#x7F6E;
new Router({
  routes: [
    {
      path: &apos;/&apos;,
      name: &apos;home&apos;,
      component: Home,
      meta: {
        keepAlive: true // &#x9700;&#x8981;&#x88AB;&#x7F13;&#x5B58;
      }
    },
    {
      path: &apos;/:id&apos;,
      name: &apos;edit&apos;,
      component: Edit,
      meta: {
        keepAlive: false // &#x4E0D;&#x9700;&#x8981;&#x88AB;&#x7F13;&#x5B58;
      }
    }
  ]
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;$route.meta.keepAlive&quot;</span>&gt;</span>
        <span class="hljs-comment">&lt;!--&#x8FD9;&#x91CC;&#x662F;&#x4F1A;&#x88AB;&#x7F13;&#x5B58;&#x7684;&#x8DEF;&#x7531;--&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>       
<span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;!$route.meta.keepAlive&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!--&#x56E0;&#x4E3A;&#x7528;&#x7684;&#x662F;v-if &#x6240;&#x4EE5;&#x4E0B;&#x9762;&#x8FD8;&#x8981;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x672A;&#x7F13;&#x5B58;&#x7684;&#x8DEF;&#x7531;&#x89C6;&#x56FE;&#x51FA;&#x53E3;--&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
//router&#x914D;&#x7F6E;
new Router(</span><span class="hljs-template-variable">{
  routes: [
    {
      path: &apos;/&apos;,
      name: &apos;home&apos;,
      component: Home,
      meta: {
        keepAlive: true // &#x9700;&#x8981;&#x88AB;&#x7F13;&#x5B58;
      }</span><span class="xml">
    },
    </span><span class="hljs-template-variable">{
      path: &apos;/:id&apos;,
      name: &apos;edit&apos;,
      component: Edit,
      meta: {
        keepAlive: false // &#x4E0D;&#x9700;&#x8981;&#x88AB;&#x7F13;&#x5B58;
      }</span><span class="xml">
    }
  ]
});
</span></code></pre>
</li>
</ol>
<h4>Vue2.1.0&#x7248;&#x672C;&#x4E4B;&#x540E;&#xFF1A;</h4>
<p>&#x4F7F;&#x7528;&#x8DEF;&#x7531;&#x5143;&#x4FE1;&#x606F;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x8981;&#x591A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;<code>router-view</code>&#x6807;&#x7B7E;&#xFF0C;&#x5E76;&#x4E14;&#x6BCF;&#x4E2A;&#x8DEF;&#x7531;&#x90FD;&#x8981;&#x914D;&#x7F6E;&#x4E00;&#x4E2A;&#x5143;&#x4FE1;&#x606F;&#xFF0C;&#x662F;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x4F46;&#x662F;&#x8FC7;&#x4E8E;&#x7E41;&#x7410;&#x4E86;&#x70B9;&#x3002;</p>
<p>&#x5E78;&#x8FD0;&#x7684;&#x662F;&#x5728;Vue2.1.0&#x4E4B;&#x540E;&#xFF0C;Vue&#x65B0;&#x589E;&#x4E86;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x914D;&#x5408;<code>keep-alive</code>&#x6765;&#x6709;&#x6761;&#x4EF6;&#x5730;&#x7F13;&#x5B58; &#x8DEF;&#x7531;/&#x7EC4;&#x4EF6;&#x3002;</p>
<p><strong>&#x65B0;&#x589E;&#x5C5E;&#x6027;&#xFF1A;</strong></p>
<ul>
<li>
<code>include</code>&#xFF1A;&#x5339;&#x914D;&#x7684; &#x8DEF;&#x7531;/&#x7EC4;&#x4EF6; &#x4F1A;&#x88AB;&#x7F13;&#x5B58;</li>
<li>
<code>exclude</code>&#xFF1A;&#x5339;&#x914D;&#x7684; &#x8DEF;&#x7531;/&#x7EC4;&#x4EF6; &#x4E0D;&#x4F1A;&#x88AB;&#x7F13;&#x5B58;</li>
</ul>
<p><code>include</code>&#x548C;<code>exclude</code>&#x652F;&#x6301;&#x4E09;&#x79CD;&#x65B9;&#x5F0F;&#x6765;&#x6709;&#x6761;&#x4EF6;&#x7684;&#x7F13;&#x5B58;&#x8DEF;&#x7531;&#xFF1A;&#x91C7;&#x7528;&#x9017;&#x53F7;&#x5206;&#x9694;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x5F62;&#x5F0F;&#xFF0C;&#x6B63;&#x5219;&#x5F62;&#x5F0F;&#xFF0C;&#x6570;&#x7EC4;&#x5F62;&#x5F0F;&#x3002;</p>
<p>&#x6B63;&#x5219;&#x548C;&#x6570;&#x7EC4;&#x5F62;&#x5F0F;&#xFF0C;&#x5FC5;&#x987B;&#x91C7;&#x7528;<code>v-bind</code>&#x5F62;&#x5F0F;&#x6765;&#x4F7F;&#x7528;&#x3002;</p>
<p><strong>&#x7F13;&#x5B58;&#x7EC4;&#x4EF6;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;</strong>&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;!-- &#x9017;&#x53F7;&#x5206;&#x9694;&#x5B57;&#x7B26;&#x4E32; --&gt;
    &lt;keep-alive include=&quot;a,b&quot;&gt;
      &lt;component :is=&quot;view&quot;&gt;&lt;/component&gt;
    &lt;/keep-alive&gt;
    
    &lt;!-- &#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F; (&#x4F7F;&#x7528; `v-bind`) --&gt;
    &lt;keep-alive :include=&quot;/a|b/&quot;&gt;
      &lt;component :is=&quot;view&quot;&gt;&lt;/component&gt;
    &lt;/keep-alive&gt;
    
    &lt;!-- &#x6570;&#x7EC4; (&#x4F7F;&#x7528; `v-bind`) --&gt;
    &lt;keep-alive :include=&quot;[&apos;a&apos;, &apos;b&apos;]&quot;&gt;
      &lt;component :is=&quot;view&quot;&gt;&lt;/component&gt;
    &lt;/keep-alive&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-comment">&lt;!-- &#x9017;&#x53F7;&#x5206;&#x9694;&#x5B57;&#x7B26;&#x4E32; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span> <span class="hljs-attr">include</span>=<span class="hljs-string">&quot;a,b&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">&quot;view&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>
    
    <span class="hljs-comment">&lt;!-- &#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F; (&#x4F7F;&#x7528; `v-bind`) --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span> <span class="hljs-attr">:include</span>=<span class="hljs-string">&quot;/a|b/&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">&quot;view&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>
    
    <span class="hljs-comment">&lt;!-- &#x6570;&#x7EC4; (&#x4F7F;&#x7528; `v-bind`) --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span> <span class="hljs-attr">:include</span>=<span class="hljs-string">&quot;[&apos;a&apos;, &apos;b&apos;]&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">&quot;view&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>
</code></pre>
<p><strong>&#x4F46;&#x66F4;&#x591A;&#x573A;&#x666F;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x4F7F;&#x7528;<code>keep-alive</code>&#x6765;&#x7F13;&#x5B58;&#x8DEF;&#x7531;</strong>&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;keep-alive include=&apos;a&apos;&gt;
    &lt;router-view&gt;&lt;/router-view&gt;
&lt;/keeo-alive&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span> <span class="hljs-attr">include</span>=<span class="hljs-string">&apos;a&apos;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keeo-alive</span>&gt;</span>
</code></pre>
<p><strong>&#x5339;&#x914D;&#x89C4;&#x5219;&#xFF1A;</strong></p>
<ol>
<li>
<strong>&#x9996;&#x5148;&#x5339;&#x914D;&#x7EC4;&#x4EF6;&#x7684;name&#x9009;&#x9879;</strong>&#xFF0C;&#x5982;&#x679C;<code>name</code>&#x9009;&#x9879;&#x4E0D;&#x53EF;&#x7528;&#x3002;</li>
<li>&#x5219;&#x5339;&#x914D;&#x5B83;&#x7684;<strong>&#x5C40;&#x90E8;&#x6CE8;&#x518C;&#x540D;&#x79F0;</strong>&#x3002; (&#x7236;&#x7EC4;&#x4EF6; <code>components</code> &#x9009;&#x9879;&#x7684;&#x952E;&#x503C;)</li>
<li>
<strong>&#x533F;&#x540D;&#x7EC4;&#x4EF6;&#xFF0C;&#x4E0D;&#x53EF;&#x5339;&#x914D;</strong>&#x3002;</li>
</ol>
<p>&#x6BD4;&#x5982;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x6CA1;&#x6709;<code>name</code>&#x9009;&#x9879;&#xFF0C;&#x5E76;&#x4E14;&#x6CA1;&#x6709;&#x6CE8;&#x518C;&#x7684;&#x7EC4;&#x4EF6;&#x540D;&#x3002;</p>
<ol><li>&#x53EA;&#x80FD;&#x5339;&#x914D;&#x5F53;&#x524D;&#x88AB;&#x5305;&#x88F9;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;<strong>&#x4E0D;&#x80FD;&#x5339;&#x914D;&#x66F4;&#x4E0B;&#x9762;&#x5D4C;&#x5957;&#x7684;&#x5B50;&#x7EC4;&#x4EF6;</strong>&#x3002;</li></ol>
<p>&#x6BD4;&#x5982;&#x7528;&#x5728;&#x8DEF;&#x7531;&#x4E0A;&#xFF0C;&#x53EA;&#x80FD;&#x5339;&#x914D;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x7684;<code>name</code>&#x9009;&#x9879;&#xFF0C;&#x4E0D;&#x80FD;&#x5339;&#x914D;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x91CC;&#x9762;&#x7684;&#x5D4C;&#x5957;&#x7EC4;&#x4EF6;&#x7684;<code>name</code>&#x9009;&#x9879;&#x3002;</p>
<ol>
<li>&#x6587;&#x6863;&#xFF1A;<code>&lt;keep-alive&gt; </code><strong>&#x4E0D;&#x4F1A;&#x5728;&#x51FD;&#x6570;&#x5F0F;&#x7EC4;&#x4EF6;&#x4E2D;&#x6B63;&#x5E38;&#x5DE5;&#x4F5C;</strong>&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x4EEC;&#x6CA1;&#x6709;&#x7F13;&#x5B58;&#x5B9E;&#x4F8B;&#x3002;</li>
<li><strong><code>exclude</code>&#x7684;&#x4F18;&#x5148;&#x7EA7;&#x5927;&#x4E8E;<code>include</code></strong></li>
</ol>
<p>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF1A;&#x5F53;<code>include</code>&#x548C;<code>exclude</code>&#x540C;&#x65F6;&#x5B58;&#x5728;&#x65F6;&#xFF0C;<code>exclude</code>&#x751F;&#x6548;&#xFF0C;<code>include</code>&#x4E0D;&#x751F;&#x6548;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &lt;keep-alive include=&quot;a,b&quot; exclude=&quot;a&quot;&gt;
    &lt;!--&#x53EA;&#x6709;a&#x4E0D;&#x88AB;&#x7F13;&#x5B58;--&gt;
    &lt;router-view&gt;&lt;/router-view&gt;
  &lt;/keep-alive&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span> <span class="hljs-attr">include</span>=<span class="hljs-string">&quot;a,b&quot;</span> <span class="hljs-attr">exclude</span>=<span class="hljs-string">&quot;a&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!--&#x53EA;&#x6709;a&#x4E0D;&#x88AB;&#x7F13;&#x5B58;--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>
</code></pre>
<p><strong>&#x5F53;&#x7EC4;&#x4EF6;&#x88AB;<code>exclude</code>&#x5339;&#x914D;&#xFF0C;&#x8BE5;&#x7EC4;&#x4EF6;&#x5C06;&#x4E0D;&#x4F1A;&#x88AB;&#x7F13;&#x5B58;&#xFF0C;&#x4E0D;&#x4F1A;&#x8C03;&#x7528;<code>activated</code> &#x548C; <code>deactivated</code></strong>&#x3002;</p>
<hr>
<h2 id="articleHeader11">&#x7EC4;&#x4EF6;&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;&#xFF1A;</h2>
<p>&#x5173;&#x4E8E;&#x7EC4;&#x4EF6;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x662F;&#x65F6;&#x5019;&#x653E;&#x51FA;&#x8FD9;&#x5F20;&#x56FE;&#x7247;&#x4E86;&#xFF1A;</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000015727283?w=1200&amp;h=2800" del-src="https://static.alili.tech/img/remote/1460000015727282?w=500&amp;h=317" alt="" title="" style="cursor: pointer;"></span></p>
<p>&#x8FD9;&#x5F20;&#x56FE;&#x7247;&#x5DF2;&#x7ECF;&#x8BB2;&#x5F97;&#x5F88;&#x6E05;&#x695A;&#x4E86;&#xFF0C;&#x5F88;&#x591A;&#x4EBA;&#x8FD9;&#x90E8;&#x5206;&#x4E5F;&#x5F88;&#x6E05;&#x695A;&#x4E86;&#xFF0C;&#x5927;&#x90E8;&#x5206;&#x751F;&#x547D;&#x5468;&#x671F;&#x5E76;&#x4E0D;&#x4F1A;&#x7528;&#x5230;&#xFF0C;&#x8FD9;&#x91CC;&#x63D0;&#x4E00;&#x4E0B;&#x51E0;&#x70B9;&#xFF1A;</p>
<ol>
<li>
<strong>ajax&#x8BF7;&#x6C42;&#x6700;&#x597D;&#x653E;&#x5728;<code>created</code>&#x91CC;&#x9762;</strong>&#xFF0C;&#x56E0;&#x4E3A;&#x6B64;&#x65F6;&#x5DF2;&#x7ECF;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;<code>this</code>&#x4E86;&#xFF0C;&#x8BF7;&#x6C42;&#x5230;&#x6570;&#x636E;&#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x653E;&#x5728;<code>data</code>&#x91CC;&#x9762;&#x3002;<p>&#x8FD9;&#x91CC;&#x4E5F;&#x78B0;&#x5230;&#x8FC7;&#x51E0;&#x6B21;&#xFF0C;&#x9762;&#x8BD5;&#x5B98;&#x95EE;&#xFF1A;ajax&#x8BF7;&#x6C42;&#x5E94;&#x8BE5;&#x653E;&#x5728;&#x54EA;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#x3002;</p>
</li>
<li>
<strong>&#x5173;&#x4E8E;dom&#x7684;&#x64CD;&#x4F5C;&#x8981;&#x653E;&#x5728;<code>mounted</code>&#x91CC;&#x9762;</strong>&#xFF0C;&#x5728;<code>mounted</code>&#x524D;&#x9762;&#x8BBF;&#x95EE;dom&#x4F1A;&#x662F;<code>undefined</code>&#x3002;</li>
<li>&#x6BCF;&#x6B21;&#x8FDB;&#x5165;/&#x79BB;&#x5F00;&#x7EC4;&#x4EF6;&#x90FD;&#x8981;&#x505A;&#x4E00;&#x4E9B;&#x4E8B;&#x60C5;&#xFF0C;&#x7528;&#x4EC0;&#x4E48;&#x94A9;&#x5B50;&#xFF1A;</li>
</ol>
<ul>
<li>&#x4E0D;&#x7F13;&#x5B58;&#xFF1A;<p>&#x8FDB;&#x5165;&#x7684;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x7528;<code>created</code>&#x548C;<code>mounted</code>&#x94A9;&#x5B50;&#xFF0C;&#x79BB;&#x5F00;&#x7684;&#x65F6;&#x5019;&#x7528;<code>beforeDestory</code>&#x548C;<code>destroyed</code>&#x94A9;&#x5B50;,<code>beforeDestory</code>&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;<code>this</code>&#xFF0C;<code>destroyed</code>&#x4E0D;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;<code>this</code>&#x3002;</p>
</li>
<li>&#x7F13;&#x5B58;&#x4E86;&#x7EC4;&#x4EF6;&#xFF1A;<p>&#x7F13;&#x5B58;&#x4E86;&#x7EC4;&#x4EF6;&#x4E4B;&#x540E;&#xFF0C;&#x518D;&#x6B21;&#x8FDB;&#x5165;&#x7EC4;&#x4EF6;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;<code>beforeCreate</code>&#x3001;<code>created</code> &#x3001;<code>beforeMount</code>&#x3001; <code>mounted</code>&#xFF0C;<strong>&#x5982;&#x679C;&#x4F60;&#x60F3;&#x6BCF;&#x6B21;&#x8FDB;&#x5165;&#x7EC4;&#x4EF6;&#x90FD;&#x505A;&#x4E00;&#x4E9B;&#x4E8B;&#x60C5;&#x7684;&#x8BDD;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x653E;&#x5728;<code>activated</code>&#x8FDB;&#x5165;&#x7F13;&#x5B58;&#x7EC4;&#x4EF6;&#x7684;&#x94A9;&#x5B50;&#x4E2D;</strong>&#x3002;</p>
<p>&#x540C;&#x7406;&#xFF1A;&#x79BB;&#x5F00;&#x7F13;&#x5B58;&#x7EC4;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#xFF0C;<code>beforeDestroy</code>&#x548C;<code>destroyed</code>&#x5E76;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>deactivated</code>&#x79BB;&#x5F00;&#x7F13;&#x5B58;&#x7EC4;&#x4EF6;&#x7684;&#x94A9;&#x5B50;&#x6765;&#x4EE3;&#x66FF;&#x3002;</p>
</li>
</ul>
<hr>
<h2 id="articleHeader12">&#x89E6;&#x53D1;&#x94A9;&#x5B50;&#x7684;&#x5B8C;&#x6574;&#x987A;&#x5E8F;&#xFF1A;</h2>
<p>&#x5C06;&#x8DEF;&#x7531;&#x5BFC;&#x822A;&#x3001;<code>keep-alive</code>&#x3001;&#x548C;&#x7EC4;&#x4EF6;&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;&#x7ED3;&#x5408;&#x8D77;&#x6765;&#x7684;&#xFF0C;&#x89E6;&#x53D1;&#x987A;&#x5E8F;&#xFF0C;&#x5047;&#x8BBE;&#x662F;&#x4ECE;a&#x7EC4;&#x4EF6;&#x79BB;&#x5F00;&#xFF0C;&#x7B2C;&#x4E00;&#x6B21;&#x8FDB;&#x5165;b&#x7EC4;&#x4EF6;&#xFF1A;</p>
<ol>
<li>
<code>beforeRouteLeave</code>:&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x7684;&#x7EC4;&#x4EF6;&#x79BB;&#x5F00;&#x8DEF;&#x7531;&#x524D;&#x94A9;&#x5B50;&#xFF0C;&#x53EF;&#x53D6;&#x6D88;&#x8DEF;&#x7531;&#x79BB;&#x5F00;&#x3002;</li>
<li>
<code>beforeEach</code>: &#x8DEF;&#x7531;&#x5168;&#x5C40;&#x524D;&#x7F6E;&#x5B88;&#x536B;&#xFF0C;&#x53EF;&#x7528;&#x4E8E;&#x767B;&#x5F55;&#x9A8C;&#x8BC1;&#x3001;&#x5168;&#x5C40;&#x8DEF;&#x7531;loading&#x7B49;&#x3002;</li>
<li>
<code>beforeEnter</code>: &#x8DEF;&#x7531;&#x72EC;&#x4EAB;&#x5B88;&#x536B;</li>
<li>
<code>beforeRouteEnter</code>: &#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x7684;&#x7EC4;&#x4EF6;&#x8FDB;&#x5165;&#x8DEF;&#x7531;&#x524D;&#x94A9;&#x5B50;&#x3002;</li>
<li>
<code>beforeResolve</code>:<a href="https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E8%A7%A3%E6%9E%90%E5%AE%88%E5%8D%AB" rel="nofollow noreferrer" target="_blank">&#x8DEF;&#x7531;&#x5168;&#x5C40;&#x89E3;&#x6790;&#x5B88;&#x536B;</a>
</li>
<li>
<code>afterEach</code>:&#x8DEF;&#x7531;&#x5168;&#x5C40;&#x540E;&#x7F6E;&#x94A9;&#x5B50;</li>
<li>
<code>beforeCreate</code>:&#x7EC4;&#x4EF6;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x4E0D;&#x80FD;&#x8BBF;&#x95EE;<code>this</code>&#x3002;</li>
<li>
<code>created</code>:&#x7EC4;&#x4EF6;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;<code>this</code>&#xFF0C;&#x4E0D;&#x80FD;&#x8BBF;&#x95EE;dom&#x3002;</li>
<li>
<code>beforeMount</code>:&#x7EC4;&#x4EF6;&#x751F;&#x547D;&#x5468;&#x671F;</li>
<li>
<code>deactivated</code>: &#x79BB;&#x5F00;&#x7F13;&#x5B58;&#x7EC4;&#x4EF6;a&#xFF0C;&#x6216;&#x8005;&#x89E6;&#x53D1;a&#x7684;<code>beforeDestroy</code>&#x548C;<code>destroyed</code>&#x7EC4;&#x4EF6;&#x9500;&#x6BC1;&#x94A9;&#x5B50;&#x3002;</li>
<li>
<code>mounted</code>:&#x8BBF;&#x95EE;/&#x64CD;&#x4F5C;dom&#x3002;</li>
<li>
<code>activated</code>:&#x8FDB;&#x5165;&#x7F13;&#x5B58;&#x7EC4;&#x4EF6;&#xFF0C;&#x8FDB;&#x5165;a&#x7684;&#x5D4C;&#x5957;&#x5B50;&#x7EC4;&#x4EF6;(&#x5982;&#x679C;&#x6709;&#x7684;&#x8BDD;)&#x3002;</li>
<li>&#x6267;&#x884C;beforeRouteEnter&#x56DE;&#x8C03;&#x51FD;&#x6570;next&#x3002;</li>
</ol>
<hr>
<h2 id="articleHeader13">&#x7ED3;&#x8BED;</h2>
<p>Vue&#x63D0;&#x4F9B;&#x4E86;&#x5F88;&#x591A;&#x94A9;&#x5B50;&#xFF0C;&#x4F46;&#x5F88;&#x591A;&#x94A9;&#x5B50;&#x6211;&#x4EEC;&#x51E0;&#x4E4E;&#x4E0D;&#x4F1A;&#x7528;&#x5230;&#xFF0C;&#x53EA;&#x6709;&#x6E05;&#x695A;&#x8FD9;&#x4E9B;&#x94A9;&#x5B50;&#x51FD;&#x6570;&#x7684;&#x89E6;&#x53D1;&#x987A;&#x5E8F;&#x4EE5;&#x53CA;&#x80CC;&#x540E;&#x7684;&#x4E00;&#x4E9B;&#x9650;&#x5236;&#x7B49;&#xFF0C;&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x624D;&#x80FD;&#x591F;&#x6B63;&#x786E;&#x7684;&#x4F7F;&#x7528;&#x8FD9;&#x4E9B;&#x94A9;&#x5B50;&#xFF0C;&#x5E0C;&#x671B;&#x770B;&#x4E86;&#x672C;&#x6587;&#x7684;&#x540C;&#x5B66;&#xFF0C;&#x80FD;&#x5BF9;&#x8FD9;&#x4E9B;&#x94A9;&#x5B50;&#x6709;&#x66F4;&#x52A0;&#x6E05;&#x6670;&#x7684;&#x8BA4;&#x8BC6;&#xFF0C;&#x4F7F;&#x7528;&#x8D77;&#x6765;&#x66F4;&#x52A0;&#x5F97;&#x5FC3;&#x5E94;&#x624B;&#x3002;</p>
<h3 id="articleHeader14">&#x5E0C;&#x671B;&#x770B;&#x5B8C;&#x7684;&#x670B;&#x53CB;&#x53EF;&#x4EE5;&#x70B9;&#x4E2A;&#x559C;&#x6B22;/&#x5173;&#x6CE8;&#xFF0C;&#x60A8;&#x7684;&#x652F;&#x6301;&#x662F;&#x5BF9;&#x6211;&#x6700;&#x5927;&#x7684;&#x9F13;&#x52B1;&#x3002;</h3>
<p><strong><a href="http://obkoro1.com/" rel="nofollow noreferrer" target="_blank">&#x4E2A;&#x4EBA;blog</a></strong> and <strong><a href="https://juejin.im/user/58714f0eb123db4a2eb95372" rel="nofollow noreferrer" target="_blank">&#x6398;&#x91D1;&#x4E2A;&#x4EBA;&#x4E3B;&#x9875;</a></strong>&#xFF0C;&#x5982;&#x9700;&#x8F6C;&#x8F7D;&#xFF0C;&#x8BF7;&#x653E;&#x4E0A;&#x539F;&#x6587;&#x94FE;&#x63A5;&#x5E76;&#x7F72;&#x540D;&#x3002;&#x7801;&#x5B57;&#x4E0D;&#x6613;&#xFF0C;<strong>&#x611F;&#x8C22;</strong>&#x652F;&#x6301;&#xFF01;</p>
<p>&#x5982;&#x679C;&#x559C;&#x6B22;&#x672C;&#x6587;&#x7684;&#x8BDD;&#xFF0C;&#x6B22;&#x8FCE;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x8BA2;&#x9605;&#x53F7;&#xFF0C;&#x6F2B;&#x6F2B;&#x6280;&#x672F;&#x8DEF;&#xFF0C;&#x671F;&#x5F85;&#x672A;&#x6765;&#x5171;&#x540C;&#x5B66;&#x4E60;&#x6210;&#x957F;&#x3002;</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000014694068?w=344&amp;h=344" del-src="https://static.alili.tech/img/remote/1460000015727282?w=500&amp;h=317" alt="" title="" style="cursor: pointer;"></span></p>
<p>&#x4EE5;&#x4E0A;2018.7.21</p>
<p>&#x53C2;&#x8003;&#x8D44;&#x6599;&#xFF1A;</p>
<p>Vue&#x6587;&#x6863;</p>
<p><a href="https://segmentfault.com/a/1190000010546663">keep-alive&#x7684;&#x6DF1;&#x5165;&#x7406;&#x89E3;&#x4E0E;&#x4F7F;&#x7528;(&#x914D;&#x5408;router-view&#x7F13;&#x5B58;&#x6574;&#x4E2A;&#x8DEF;&#x7531;&#x9875;&#x9762;)</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue的钩子函数[路由导航守卫、keep-alive、生命周期钩子]

## 原文链接
[https://segmentfault.com/a/1190000015727279](https://segmentfault.com/a/1190000015727279)

