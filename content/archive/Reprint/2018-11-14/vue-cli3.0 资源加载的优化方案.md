---
title: vue-cli3.0 资源加载的优化方案
hidden: true
categories: [reprint]
slug: 500e4f5b
date: 2018-11-14 02:30:09
---

{{< raw >}}
<h1>20180829 &#x66F4;&#x65B0;</h1><p>&#x4ECA;&#x5929;&#x53CD;&#x590D;&#x8BD5;&#x4E86;&#xFF0C;&#x4E0D;&#x7528;&#x533A;&#x5206; &#x6D4B;&#x8BD5;&#x73AF;&#x5883;&#x8FD8;&#x662F; &#x751F;&#x4EA7;&#x73AF;&#x5883;&#xFF0C;&#x7EDF;&#x4E00;&#x90FD;&#x7528; cdn &#x5C31;&#x53EF;&#x4EE5;&#x4E86;</p><h1>&#x80CC;&#x666F;</h1><p>&#x4E4B;&#x524D;&#x81EA;&#x5DF1;&#x642D;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A; vue + tp5.1 &#x7684;&#x540E;&#x53F0;&#x9879;&#x76EE;&#xFF08;<a href="https://segmentfault.com/a/1190000015619977">https://segmentfault.com/a/11...</a>&#xFF09;&#xFF0C;&#x5751;&#x5F88;&#x591A;&#xFF0C;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x5C31;&#x662F;&#x8D44;&#x6E90;&#x52A0;&#x8F7D;&#x7684;&#x65B9;&#x6848;&#xFF0C;&#x7531;&#x4E8E;&#x662F;&#x540E;&#x53F0;&#x9879;&#x76EE;&#xFF0C;&#x4E4B;&#x524D;&#x4E00;&#x76F4;&#x6CA1;&#x653E;&#x5728;&#x5FC3;&#x4E0A;&#xFF0C;&#x770B;&#x5230;&#x4E00;&#x4E9B;&#x8D44;&#x6E90;&#x4F18;&#x5316;&#x65B9;&#x6848;&#x540E;&#xFF08;<a href="https://juejin.im/post/5a291092518825293b50366d" rel="nofollow noreferrer">https://juejin.im/post/5a2910...</a>&#xFF09;&#xFF0C;&#x89C9;&#x5F97;&#x6709;&#x5FC5;&#x8981;&#x5F04;&#x4E00;&#x4E0B;&#x3002;</p><h1>&#x8001;&#x7248;&#x672C;</h1><pre><code>&#x901A;&#x8FC7;&#xFF1A;npm run build &#x540E;</code></pre><p><span class="img-wrap"><img data-src="/img/bVbf2RX?w=640&amp;h=461" src="https://static.alili.tech/img/bVbf2RX?w=640&amp;h=461" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C; &#x6587;&#x4EF6;&#x5927;&#x5C0F;&#x6700;&#x5927;&#x7684; 820kb&#xFF0C;&#x5373;&#x4F7F;&#x7528; Gzipped &#x538B;&#x7F29;&#x540E;&#x4E5F;&#x662F; 219kb&#xFF0C;&#x968F;&#x7740;&#x9879;&#x76EE;&#x4E0D;&#x65AD;&#x53D8;&#x5927;&#xFF0C;&#x8FD9;&#x4E2A;&#x503C;&#x8FD8;&#x4F1A;&#x4E0D;&#x65AD;&#x589E;&#x5927;</p><h1>&#x4F7F;&#x7528;CDN&#x52A0;&#x901F;</h1><p>&#x8FD9;&#x91CC;&#x8BF7;&#x5148;&#x53C2;&#x8003; <a href="https://juejin.im/post/5a291092518825293b50366d" rel="nofollow noreferrer">https://juejin.im/post/5a2910...</a>&#xFF0C;&#x8FD9;&#x91CC;&#x53EA;&#x505A;vue-cli@3.0&#x7684;&#x914D;&#x7F6E;&#x4FEE;&#x6539;</p><ul><li>index.html&#x6587;&#x4EF6;</li></ul><pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1.0&quot;&gt;
    &lt;link rel=&quot;icon&quot; href=&quot;&lt;%= BASE_URL %&gt;favicon.ico&quot;&gt;
    &lt;title&gt;VUE&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x7CFB;&#x7EDF;&lt;/title&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://unpkg.com/element-ui/lib/theme-chalk/index.css&quot;&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;
&lt;!-- built files will be auto injected --&gt;
&lt;script src=&quot;https://unpkg.com/vue@2.5.16/dist/vue.runtime.min.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;https://unpkg.com/vuex@3.0.1/dist/vuex.min.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;https://unpkg.com/vue-router@3.0.1/dist/vue-router.min.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;https://unpkg.com/element-ui/lib/index.js&quot;&gt;&lt;/script&gt;

&lt;/body&gt;

&lt;/html&gt;

</code></pre><ul><li>vue.config.js &#x6587;&#x4EF6;</li></ul><pre><code>module.exports = {
    baseUrl: process.env.NODE_ENV === &quot;production&quot; ? &quot;./&quot; : &quot;/&quot;,
    outputDir: process.env.outputDir,
    configureWebpack: {
        externals: {
            vue: &quot;Vue&quot;,
            vuex: &quot;Vuex&quot;,
            &quot;vue-router&quot;: &quot;VueRouter&quot;,
            &quot;element-ui&quot;: &quot;ELEMENT&quot;
        }
    }
};
</code></pre><h1>&#x9875;&#x9762;&#x4F18;&#x5316;&#x540E;</h1><p><span class="img-wrap"><img data-src="/img/bVbf2V0?w=669&amp;h=476" src="https://static.alili.tech/img/bVbf2V0?w=669&amp;h=476" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli3.0 资源加载的优化方案

## 原文链接
[https://segmentfault.com/a/1190000016178566](https://segmentfault.com/a/1190000016178566)

