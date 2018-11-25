---
title: '使用gulp将Vue.component文件中的template转成render函数' 
date: 2018-11-26 2:30:10
hidden: true
slug: r215cjpn3hi
categories: [reprint]
---

{{< raw >}}
<h6>&#x3000;&#x3000;&#x5728;&#x4F7F;&#x7528;vue.js&#x5F00;&#x53D1;&#x9879;&#x76EE;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x80FD;&#x7528;webpack&#xFF0C;&#x8981;&#x4EE5;&#x4F20;&#x7EDF;&#x65B9;&#x5F0F;&#x5F00;&#x53D1;&#x9879;&#x76EE;&#x7684;&#x8BDD;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x5C06;&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#x5199;&#x6210;</h6><h6>Vue.component&#x5F62;&#x5F0F;&#x7684;js&#x6587;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x76F4;&#x63A5;&#x5728;&#x9875;&#x9762;&#x4E2D;&#x5F15;&#x5165;&#x3002;&#x4F46;&#x662F;ie&#x6D4F;&#x89C8;&#x5668;&#x6709;&#x65F6;&#x5019;&#x4E0D;&#x652F;&#x6301;template&#x5F62;&#x5F0F;&#x7684;&#x6A21;&#x677F;html&#xFF0C;</h6><h6>&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x5C31;&#x8981;&#x7528;&#x5230;&#x4E00;&#x4E2A;gulp&#x63D2;&#x4EF6;vue-template-inline&#xFF0C;&#x5C06;js&#x6587;&#x4EF6;&#x4E2D;&#x7684;template&#x8F6C;&#x6210;ie&#x652F;&#x6301;&#x7684;render&#x51FD;&#x6570;&#x3002;</h6><h6>&#x3000;&#x3000;&#x63D2;&#x4EF6;github&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/leeseean/vue-template-inline" rel="nofollow noreferrer" target="_blank">https://github.com/leeseean/v...</a>&#xFF0C;&#x6C42;star&#xFF0C;&#x591A;&#x8C22;&#xFF01;</h6><h1 id="articleHeader0">&#x4F7F;&#x7528;&#x8BF4;&#x660E;</h1><h1 id="articleHeader1">&#x5B89;&#x88C5;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-template-inline --save-dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> vue-<span class="hljs-keyword">template</span>-inline <span class="hljs-comment">--save-dev</span></code></pre><h1 id="articleHeader2">&#x7528;&#x6CD5;</h1><p>&#x672A;&#x7ECF;&#x5904;&#x7406;&#x524D;&#x7684;js&#x6587;&#x4EF6;</p><p>myView.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;example&apos;, {
    template: `
        &lt;div&gt;
            &lt;div v-if=&quot;show&quot; v-for=&quot;(item, index) in list&quot;&gt;"{{"item"}}"&lt;/div&gt;
        &lt;/div&gt;
    `,
    data() {
        return {
            show: true,
            list: [1,2,3,4,5],
        };
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>Vue.component(&apos;example&apos;, {
    template: `
        &lt;<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">&quot;show&quot;</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">&quot;(item, index) in list&quot;</span>&gt;"{{"<span class="hljs-built_in">item</span>"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    `,
    data() {
<span class="hljs-built_in">        return</span> {
            show: <span class="hljs-literal">true</span>,
            <span class="hljs-built_in">list</span>: [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>],
        };
    }
});</code></pre><p>&#x5F15;&#x5165;vue-template-inline&#x5904;&#x7406;js&#x6587;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var inlineVue = require(&apos;vue-template-inline&apos;);

gulp.task(&apos;inline-vue&apos;, function () {
  return gulp.src(&apos;./src/**/*.js&apos;)
    .pipe(inlineVue())
    .pipe(gulp.dest(&apos;./dist&apos;));
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> inlineVue = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;vue-template-inline&apos;</span>);

gulp.task(<span class="hljs-string">&apos;inline-vue&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">&apos;./src/**/*.js&apos;</span>)
    .pipe(inlineVue())
    .pipe(gulp.dest(<span class="hljs-string">&apos;./dist&apos;</span>));
});</code></pre><p>&#x8F93;&#x51FA;&#x5904;&#x7406;&#x540E;&#x7684;js&#x6587;&#x4EF6;:</p><p>myView.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;
Vue.component(&quot;example&quot;, {
    render: function () {
        var n = this,
            e = n.$createElement,
            r = n._self._c || e;
        return r(&quot;div&quot;, n._l(n.list, function (e, t) {
            return n.show ? r(&quot;div&quot;, [n._v(n._s(e))]) : n._e()
        }))
    },
    data: function () {
        return {
            show: !0,
            list: [1, 2, 3, 4, 5]
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-meta">&quot;use strict&quot;</span>;
Vue.component(<span class="hljs-string">&quot;example&quot;</span>, {
    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> n = <span class="hljs-keyword">this</span>,
            e = n.$createElement,
            r = n._self._c || e;
        <span class="hljs-keyword">return</span> r(<span class="hljs-string">&quot;div&quot;</span>, n._l(n.list, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e, t</span>) </span>{
            <span class="hljs-keyword">return</span> n.show ? r(<span class="hljs-string">&quot;div&quot;</span>, [n._v(n._s(e))]) : n._e()
        }))
    },
    <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">show</span>: !<span class="hljs-number">0</span>,
            <span class="hljs-attr">list</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]
        }
    }
});</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用gulp将Vue.component文件中的template转成render函数

## 原文链接
[https://segmentfault.com/a/1190000015367258](https://segmentfault.com/a/1190000015367258)

