---
title: 配置webpack中dev.env.js、prod.env.js，解决不同命令下项目启动和打包到指定的环境
hidden: true
categories: [reprint]
slug: e17e1faa
date: 2018-11-12 02:30:05
---

{{< raw >}}
<p>&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#x7684;&#x9879;&#x76EE;&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x6709;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x3001;&#x6D4B;&#x8BD5;&#x73AF;&#x5883;&#x3001;&#x9884;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x548C;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x3002;</p><blockquote><strong>1</strong>&#x3001;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E0B;&#x8C03;&#x8BD5;&#x63A5;&#x53E3;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E00;&#x822C;&#x90FD;&#x4F1A;&#x6709;&#x597D;&#x51E0;&#x4E2A;&#x63A5;&#x53E3;&#x5730;&#x5740;&#xFF08;&#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#x7684;&#xFF0C;&#x672C;&#x5730;&#x7684;&#xFF0C;&#x63A5;&#x53E3;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x7684;&#xFF0C;&#x4E03;&#x4E03;&#x516B;&#x516B;&#x7684;&#x63A5;&#x53E3;&#x5730;&#x5740;&#xFF09;&#xFF0C;&#x8981;&#x6839;&#x636E;&#x60C5;&#x51B5;&#x624B;&#x52A8;&#x6765;&#x5207;&#x6362;&#x63A5;&#x53E3;&#x5730;&#x5740;&#x3002;<p><strong>2</strong>&#x3001;&#x6253;&#x5305;&#x65F6;&#x8981;&#x90E8;&#x7F72;&#x9879;&#x76EE;&#x5230;&#x4E0D;&#x540C;&#x7684;&#x73AF;&#x5883;&#xFF0C;&#x800C;&#x8FD9;&#x4E5F;&#x9700;&#x8981;&#x6BCF;&#x6B21;&#x90FD;&#x6839;&#x636E;&#x60C5;&#x51B5;&#x5207;&#x6362;&#x63A5;&#x53E3;&#x5730;&#x5740;&#x3002;</p></blockquote><p>&#x867D;&#x8BF4;&#x624B;&#x52A8;&#x6765;&#x5207;&#x6362;&#x5730;&#x5740;&#x662F;&#x53EF;&#x4EE5;&#x6EE1;&#x8DB3;&#x9700;&#x6C42;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x5B9E;&#x5C5E;&#x4E0D;&#x662F;&#x4E00;&#x79CD;&#x8F83;&#x4E3A;&#x4F18;&#x96C5;&#x7684;&#x5904;&#x7406;&#x65B9;&#x5F0F;&#x3002;&#x90A3;&#x4E48;&#xFF0C;&#x6211;&#x4EEC;&#x6362;&#x4E00;&#x79CD;&#x4F18;&#x96C5;&#x4E00;&#x70B9;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x89E3;&#x51B3;&#x3002;</p><p><strong>&#x901A;&#x8FC7;&#x4FEE;&#x6539;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x8BA9;&#x542F;&#x52A8;&#x548C;&#x6253;&#x5305;&#x9879;&#x76EE;&#x65F6;&#x6839;&#x636E;&#x4E0D;&#x540C;&#x7684;&#x547D;&#x4EE4;&#xFF0C;&#x8FBE;&#x5230;&#x9884;&#x671F;&#x7684;&#x7ED3;&#x679C;&#x3002;</strong></p><p>&#x4E0B;&#x9762;&#x5C31;&#x4EE5;Vue&#x9879;&#x76EE;&#x4E3A;&#x4F8B;&#xFF0C;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;&#x4E0A;&#x8FF0;&#x7684;&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF0C;&#x5982;&#x679C;&#x60A8;&#x6709;&#x66F4;&#x597D;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x70E6;&#x8BF7;&#x8054;&#x7CFB;&#x6211;&#xFF0C;&#x5927;&#x5BB6;&#x76F8;&#x4E92;&#x4EA4;&#x6D41;&#x5B66;&#x4E60;&#x3002;</p><p><strong>1</strong>&#x3001;&#x542F;&#x52A8;&#x9879;&#x76EE;&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x4FEE;&#x6539;<code>/package.json</code>&#x3001;<code>/config/dev.env.js</code>&#x548C;<code>/src/main.js</code>&#x6587;&#x4EF6;<br>&#x3000;1). &#x5728;<code>/package.json</code>&#x4E2D;&#xFF0C;&#x4E3A;&#x542F;&#x52A8;&#x547D;&#x4EE4;&#x8BBE;&#x7F6E;&#x4E0D;&#x540C;&#x7684;&#x53C2;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;dev&quot;: &quot;webpack-dev-server --inline --progress --config build/webpack.dev.conf.js&quot;,
    &quot;dev_test&quot;: &quot;webpack-dev-server --inline --progress --env=test --config build/webpack.dev.conf.js&quot;,
    &quot;dev_prod&quot;: &quot;webpack-dev-server --inline --progress --env=prod --config build/webpack.dev.conf.js&quot;,
    &quot;start&quot;: &quot;npm run dev&quot;,
    &quot;e2e&quot;: &quot;node test/e2e/runner.js&quot;,
    &quot;test&quot;: &quot;npm run unit &amp;&amp; npm run e2e&quot;,
    &quot;lint&quot;: &quot;eslint --ext .js,.vue src test/unit test/e2e/specs&quot;,
    &quot;build&quot;: &quot;node build/build.js&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-string">&quot;scripts&quot;</span>: {
    <span class="hljs-string">&quot;dev&quot;</span>: <span class="hljs-string">&quot;webpack-dev-server --inline --progress --config build/webpack.dev.conf.js&quot;</span>,
    <span class="hljs-string">&quot;dev_test&quot;</span>: <span class="hljs-string">&quot;webpack-dev-server --inline --progress --env=test --config build/webpack.dev.conf.js&quot;</span>,
    <span class="hljs-string">&quot;dev_prod&quot;</span>: <span class="hljs-string">&quot;webpack-dev-server --inline --progress --env=prod --config build/webpack.dev.conf.js&quot;</span>,
    <span class="hljs-string">&quot;start&quot;</span>: <span class="hljs-string">&quot;npm run dev&quot;</span>,
    <span class="hljs-string">&quot;e2e&quot;</span>: <span class="hljs-string">&quot;node test/e2e/runner.js&quot;</span>,
    <span class="hljs-string">&quot;test&quot;</span>: <span class="hljs-string">&quot;npm run unit &amp;&amp; npm run e2e&quot;</span>,
    <span class="hljs-string">&quot;lint&quot;</span>: <span class="hljs-string">&quot;eslint --ext .js,.vue src test/unit test/e2e/specs&quot;</span>,
    <span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;node build/build.js&quot;</span>
}</code></pre><p>&#x3000;2). &#x5728;<code>/config/dev.env.js</code>&#x4E2D;&#xFF0C;&#x901A;&#x8FC7;process.argv&#x83B7;&#x53D6;&#x4E00;&#x4E2A;&#x547D;&#x4EE4;&#x6570;&#x7EC4;&#xFF0C;&#x5E76;&#x4E3A;&#x5176;&#x914D;&#x7F6E;&#x76F8;&#x5E94;&#x7684;&#x63A5;&#x53E3;&#x5730;&#x5740;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;use strict&apos;
const merge = require(&apos;webpack-merge&apos;)
const prodEnv = require(&apos;./prod.env&apos;)

let params = process.argv[4]
let baseUrl = &apos;&apos;
switch (params) {
    case &apos;--env=test&apos;:
      baseUrl = &apos;&quot;http://a.com&quot;&apos;
      break
    case &apos;--env=prod&apos;:
      baseUrl = &apos;&quot;http://b.com&quot;&apos;
      break
    default:
      baseUrl = &apos;&quot;http://c.com&quot;&apos;
}
module.exports = merge(prodEnv, {
  NODE_ENV: &apos;&quot;development&quot;&apos;,
  
&#x3000;baseUrl: baseUrl
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">&apos;use strict&apos;</span>
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-merge&apos;</span>)
<span class="hljs-keyword">const</span> prodEnv = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./prod.env&apos;</span>)

<span class="hljs-keyword">let</span> params = process.argv[<span class="hljs-number">4</span>]
<span class="hljs-keyword">let</span> baseUrl = <span class="hljs-string">&apos;&apos;</span>
<span class="hljs-keyword">switch</span> (params) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;--env=test&apos;</span>:
      baseUrl = <span class="hljs-string">&apos;&quot;http://a.com&quot;&apos;</span>
      <span class="hljs-keyword">break</span>
    <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;--env=prod&apos;</span>:
      baseUrl = <span class="hljs-string">&apos;&quot;http://b.com&quot;&apos;</span>
      <span class="hljs-keyword">break</span>
    <span class="hljs-keyword">default</span>:
      baseUrl = <span class="hljs-string">&apos;&quot;http://c.com&quot;&apos;</span>
}
<span class="hljs-built_in">module</span>.exports = merge(prodEnv, {
  <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-string">&apos;&quot;development&quot;&apos;</span>,
  
&#x3000;<span class="hljs-attr">baseUrl</span>: baseUrl
})</code></pre><p>&#x3000;3). &#x5728;<code>/src/main.js</code>&#x4E2D;&#xFF0C;&#x901A;&#x8FC7;process.env.baseUrl &#x83B7;&#x53D6;<code>/config/dev.env.js</code>&#x6587;&#x4EF6;&#x7684;baseUrl&#x5E76;&#x5C06;&#x5176;&#x6302;&#x8F7D;&#x5728;Vue&#x7684;&#x539F;&#x578B;&#x4E0A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import App from &apos;./App&apos;
import router from &apos;./router&apos;

Vue.config.productionTip = false

Vue.prototype.$baseUrl = process.env.baseUrl

/* eslint-disable no-new */
new Vue({
  el: &apos;#app&apos;,
  router,
  components: { App },
  template: &apos;&lt;App/&gt;&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./App&apos;</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./router&apos;</span>

Vue.config.productionTip = <span class="hljs-literal">false</span>

Vue.prototype.$baseUrl = process.env.baseUrl

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
  router,
  <span class="hljs-attr">components</span>: { App },
  <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;App/&gt;&apos;</span>
})</code></pre><p>&#x5728;&#x4E0D;&#x540C;&#x63A5;&#x53E3;&#x5730;&#x5740;&#x4E0B;&#x542F;&#x52A8;&#x9879;&#x76EE;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x76F4;&#x63A5;&#x7528;&#x5BF9;&#x5E94;&#x7684;&#x547D;&#x4EE4;<strong>npm run dev</strong>&#x3001;<strong>npm run dev_test</strong>&#x3001;<strong>npm run dev_prod</strong>&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x518D;&#x4E5F;&#x4E0D;&#x7528;&#x53BB;&#x6587;&#x4EF6;&#x4E2D;&#x4FEE;&#x6539;&#x63A5;&#x53E3;&#x5730;&#x5740;&#x4E86;&#x3002;</p><p><strong>2</strong>&#x3001;&#x6253;&#x5305;&#x9879;&#x76EE;&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x4FEE;&#x6539;<code>/config/prod.env.js</code>&#x548C;<code>/src/main.js</code>&#x6587;&#x4EF6;<br>&#x3000;1). &#x5728;<code>/config/prod.env.js</code>&#x4E2D;&#xFF0C;&#x901A;&#x8FC7;process.argv&#x83B7;&#x53D6;&#x4E00;&#x4E2A;&#x547D;&#x4EE4;&#x6570;&#x7EC4;&#xFF0C;&#x5E76;&#x4E3A;&#x5176;&#x914D;&#x7F6E;&#x76F8;&#x5E94;&#x7684;&#x63A5;&#x53E3;&#x5730;&#x5740;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;use strict&apos;
let params = process.argv[2]
let baseUrl = &apos;&apos;
switch (params) {
    case &apos;test&apos;:
      baseUrl = &apos;&quot;http://a.com&quot;&apos;
      break
    case &apos;prod&apos;:
      baseUrl = &apos;&quot;http://b.com&quot;&apos;
      break
    default:
      baseUrl = &apos;&quot;http://c.com&quot;&apos;
}
module.exports = merge(prodEnv, {
  NODE_ENV: &apos;&quot;production&quot;&apos;,
  
&#x3000;baseUrl: baseUrl
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">&apos;use strict&apos;</span>
<span class="hljs-keyword">let</span> params = process.argv[<span class="hljs-number">2</span>]
<span class="hljs-keyword">let</span> baseUrl = <span class="hljs-string">&apos;&apos;</span>
<span class="hljs-keyword">switch</span> (params) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;test&apos;</span>:
      baseUrl = <span class="hljs-string">&apos;&quot;http://a.com&quot;&apos;</span>
      <span class="hljs-keyword">break</span>
    <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;prod&apos;</span>:
      baseUrl = <span class="hljs-string">&apos;&quot;http://b.com&quot;&apos;</span>
      <span class="hljs-keyword">break</span>
    <span class="hljs-keyword">default</span>:
      baseUrl = <span class="hljs-string">&apos;&quot;http://c.com&quot;&apos;</span>
}
<span class="hljs-built_in">module</span>.exports = merge(prodEnv, {
  <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-string">&apos;&quot;production&quot;&apos;</span>,
  
&#x3000;<span class="hljs-attr">baseUrl</span>: baseUrl
})</code></pre><p>&#x3000;2). &#x5728;<code>/src/main.js</code>&#x4E2D;&#xFF0C;&#x901A;&#x8FC7;process.env.baseUrl &#x83B7;&#x53D6;<code>/config/prod.env.js</code>&#x6587;&#x4EF6;&#x7684;baseUrl&#x5E76;&#x5C06;&#x5176;&#x6302;&#x8F7D;&#x5728;Vue&#x7684;&#x539F;&#x578B;&#x4E0A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import App from &apos;./App&apos;
import router from &apos;./router&apos;

Vue.config.productionTip = false

Vue.prototype.$baseUrl = process.env.baseUrl

/* eslint-disable no-new */
new Vue({
  el: &apos;#app&apos;,
  router,
  components: { App },
  template: &apos;&lt;App/&gt;&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./App&apos;</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./router&apos;</span>

Vue.config.productionTip = <span class="hljs-literal">false</span>

Vue.prototype.$baseUrl = process.env.baseUrl

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
  router,
  <span class="hljs-attr">components</span>: { App },
  <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;App/&gt;&apos;</span>
})</code></pre><p>&#x5728;&#x6253;&#x5305;&#x4E0D;&#x540C;&#x73AF;&#x5883;&#x4E0B;&#x9879;&#x76EE;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x76F4;&#x63A5;&#x7528;&#x5BF9;&#x5E94;&#x7684;&#x547D;&#x4EE4;<strong>npm run build</strong>&#x3001;<strong>npm run build test</strong>&#x3001;<strong>npm run build prod</strong>&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x518D;&#x4E5F;&#x4E0D;&#x7528;&#x53BB;&#x6587;&#x4EF6;&#x4E2D;&#x4FEE;&#x6539;&#x63A5;&#x53E3;&#x5730;&#x5740;&#x4E86;&#x3002;</p><p>&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x4E00;&#x52B3;&#x6C38;&#x9038;&#x4E86;&#xFF0C;&#x5728;&#x542F;&#x52A8;&#x548C;&#x6253;&#x5305;&#x9879;&#x76EE;&#x7684;&#x65F6;&#x5019;&#x4E00;&#x6761;&#x547D;&#x4EE4;&#x76F4;&#x63A5;&#x641E;&#x5B9A;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
配置webpack中dev.env.js、prod.env.js，解决不同命令下项目启动和打包到指定的环境

## 原文链接
[https://segmentfault.com/a/1190000016308995](https://segmentfault.com/a/1190000016308995)

