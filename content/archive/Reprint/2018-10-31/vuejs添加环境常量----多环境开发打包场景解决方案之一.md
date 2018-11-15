---
title: vuejs添加环境常量----多环境开发打包场景解决方案之一
reprint: true
categories: reprint
abbrlink: e5a44fb1
date: 2018-10-31 02:30:10
---

{{% raw %}}
<p>2018/8/24&#x66F4;&#x65B0;&#xFF1A;<br>&#x76EE;&#x524D;VUE CLI 3.0 &#x5DF2;&#x7ECF;&#x63D0;&#x4F9B;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x914D;&#x7F6E;&#x4E86;&#xFF0C;&#x5EFA;&#x8BAE;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x3002;</p><h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>vue-cli&#x6784;&#x5EFA;&#x7684;&#x9879;&#x76EE;&#x6CA1;&#x6709;angular-cli&#x6807;&#x914D;&#x7684;environments&#x73AF;&#x5883;&#x4F9D;&#x8D56;&#xFF0C;&#x53EA;&#x533A;&#x5206;&#x5F00;&#x53D1;&#x6A21;&#x5F0F;&#x3001;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x6A21;&#x5F0F;&#x548C;&#x751F;&#x4EA7;&#x6A21;&#x5F0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//config
dev.env.js
test.env.js
prod.env.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-comment">//config</span>
dev<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span>
test<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span>
prod<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span></code></pre><p>&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x5F00;&#x53D1;&#x8C03;&#x8BD5;&#x8FC7;&#x7A0B;&#x80AF;&#x5B9A;&#x4E0D;&#x6B62;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x548C;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#xFF0C;&#x7531;&#x4E8E;&#x7F3A;&#x5C11;&#x73AF;&#x5883;&#x5E38;&#x91CF;&#xFF0C;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x5E38;&#x5E38;&#x9700;&#x8981;&#x624B;&#x52A8;&#x4FEE;&#x6539;BASE_URL&#xFF0C;&#x8FDB;&#x800C;&#x5BFC;&#x81F4;&#x5982;&#x679C;&#x9879;&#x76EE;&#x5B58;&#x5728;&#x591A;&#x4E2A;&#x73AF;&#x5883;&#x65F6;&#xFF0C;&#x591A;&#x51FA;&#x7684;&#x73AF;&#x5883;&#x6CA1;&#x529E;&#x6CD5;&#x81EA;&#x52A8;&#x5316;&#x6784;&#x5EFA;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.defaults.baseURL = &apos;http://xxx.xxx.xx.xx/&apos; //&#x66F4;&#x6539;&#x73AF;&#x5883;api&#x9700;&#x8981;&#x624B;&#x52A8;&#x4FEE;&#x6539;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">axios<span class="hljs-selector-class">.defaults</span><span class="hljs-selector-class">.baseURL</span> = <span class="hljs-string">&apos;http://xxx.xxx.xx.xx/&apos;</span> <span class="hljs-comment">//&#x66F4;&#x6539;&#x73AF;&#x5883;api&#x9700;&#x8981;&#x624B;&#x52A8;&#x4FEE;&#x6539;</span></code></pre><h2 id="articleHeader1">&#x89E3;&#x51B3;&#x601D;&#x8DEF;</h2><p>&#x5229;&#x7528;<a href="http://nodejs.cn/api/process.html" rel="nofollow noreferrer" target="_blank">process&#x5BF9;&#x8C61;</a>&#xFF0C;&#x83B7;&#x53D6;&#x542F;&#x52A8;Node.js&#x8FDB;&#x7A0B;&#x65F6;&#x7684;&#x547D;&#x4EE4;&#x884C;&#x53C2;&#x6570;&#xFF08;process.argv&#xFF09;,&#x5339;&#x914D;&#x5F53;&#x524D;&#x5F00;&#x53D1;&#x6216;&#x751F;&#x4EA7;&#x7684;&#x73AF;&#x5883;&#x5E38;&#x91CF;&#x6302;&#x8F7D;&#x5230;process.env&#x3002;</p><h2 id="articleHeader2">&#x5177;&#x4F53;&#x5B9E;&#x73B0;</h2><p>/config<br>&#x6DFB;&#x52A0;env-config.js&#x6587;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&apos;use strict&apos;

const chalk = require(&apos;chalk&apos;)
/*
* &#x73AF;&#x5883;&#x5217;&#x8868;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x73AF;&#x5883;&#x4E3A;&#x9ED8;&#x8BA4;&#x73AF;&#x5883;
* envName: &#x6307;&#x660E;&#x73B0;&#x5728;&#x4F7F;&#x7528;&#x7684;&#x73AF;&#x5883;
* dirName: &#x6253;&#x5305;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x53EA;&#x5728;build&#x7684;&#x65F6;&#x5019;&#x6709;&#x7528;
* baseUrl: &#x8FD9;&#x4E2A;&#x73AF;&#x5883;&#x4E0B;&#x9762;&#x7684;api &#x8BF7;&#x6C42;&#x7684;&#x57DF;&#x540D;
* assetsPublicPath: &#x9759;&#x6001;&#x8D44;&#x6E90;&#x5B58;&#x653E;&#x7684;&#x57DF;&#x540D;&#xFF0C;&#x672A;&#x6307;&#x5B9A;&#x5219;&#x4F7F;&#x7528;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;
* */
const ENV_LIST = [
    {
        envName: &apos;dev&apos;,
        dirName: &apos;dev&apos;,
        baseUrl: &apos;http://192.168.xx.xx:8000/&apos;,
        assetsPublicPath:&apos;./&apos;
    },
    {
        envName: &apos;test&apos;,
        dirName: &apos;test&apos;,
        baseUrl: &apos;http://192.168.xx.xx:8000/&apos;,
        assetsPublicPath: &apos;./&apos;
    },
    {
        envName: &apos;pro&apos;,
        dirName: &apos;pro&apos;,
        baseUrl: &apos;http://webapi.xxx.com/&apos;,
        assetsPublicPath:&apos;./&apos;
    },

]

//&#x83B7;&#x53D6;&#x547D;&#x4EE4;&#x884C;&#x53C2;&#x6570; http://nodejs.cn/api/process.html#process_process_argv
const argv = JSON.parse(process.env.npm_config_argv).original || process.argv
const HOST_ENV = argv[2] ? argv[2].replace(/[^a-z]+/ig,&quot;&quot;) : &apos;&apos;
//&#x6CA1;&#x6709;&#x8BBE;&#x7F6E;&#x73AF;&#x5883;&#xFF0C;&#x5219;&#x9ED8;&#x8BA4;&#x4E3A;&#x7B2C;&#x4E00;&#x4E2A;
const HOST_CONF = HOST_ENV  ? ENV_LIST.find(item =&gt; item.envName === HOST_ENV) : ENV_LIST[0] 
// &#x628A;&#x73AF;&#x5883;&#x5E38;&#x91CF;&#x6302;&#x8F7D;&#x5230;process.env.HOST_ENV&#x65B9;&#x4FBF;&#x5BA2;&#x6237;&#x7AEF;&#x4F7F;&#x7528;
process.env.BASE_URL = HOST_CONF.baseUrl
// log&#x9009;&#x4E2D;&#x7684;&#x53D8;&#x91CF;
console.log(chalk.green(&apos;&#x5F53;&#x524D;&#x73AF;&#x5883;&#x5E38;&#x91CF;&#xFF1A;&apos;))
console.log(HOST_CONF)

module.exports.HOST_CONF = HOST_CONF
module.exports.ENV_LIST = ENV_LIST" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-meta">
&apos;use strict&apos;</span>

<span class="hljs-keyword">const</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;chalk&apos;</span>)
<span class="hljs-comment">/*
* &#x73AF;&#x5883;&#x5217;&#x8868;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x73AF;&#x5883;&#x4E3A;&#x9ED8;&#x8BA4;&#x73AF;&#x5883;
* envName: &#x6307;&#x660E;&#x73B0;&#x5728;&#x4F7F;&#x7528;&#x7684;&#x73AF;&#x5883;
* dirName: &#x6253;&#x5305;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x53EA;&#x5728;build&#x7684;&#x65F6;&#x5019;&#x6709;&#x7528;
* baseUrl: &#x8FD9;&#x4E2A;&#x73AF;&#x5883;&#x4E0B;&#x9762;&#x7684;api &#x8BF7;&#x6C42;&#x7684;&#x57DF;&#x540D;
* assetsPublicPath: &#x9759;&#x6001;&#x8D44;&#x6E90;&#x5B58;&#x653E;&#x7684;&#x57DF;&#x540D;&#xFF0C;&#x672A;&#x6307;&#x5B9A;&#x5219;&#x4F7F;&#x7528;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;
* */</span>
<span class="hljs-keyword">const</span> ENV_LIST = [
    {
        <span class="hljs-attr">envName</span>: <span class="hljs-string">&apos;dev&apos;</span>,
        <span class="hljs-attr">dirName</span>: <span class="hljs-string">&apos;dev&apos;</span>,
        <span class="hljs-attr">baseUrl</span>: <span class="hljs-string">&apos;http://192.168.xx.xx:8000/&apos;</span>,
        <span class="hljs-attr">assetsPublicPath</span>:<span class="hljs-string">&apos;./&apos;</span>
    },
    {
        <span class="hljs-attr">envName</span>: <span class="hljs-string">&apos;test&apos;</span>,
        <span class="hljs-attr">dirName</span>: <span class="hljs-string">&apos;test&apos;</span>,
        <span class="hljs-attr">baseUrl</span>: <span class="hljs-string">&apos;http://192.168.xx.xx:8000/&apos;</span>,
        <span class="hljs-attr">assetsPublicPath</span>: <span class="hljs-string">&apos;./&apos;</span>
    },
    {
        <span class="hljs-attr">envName</span>: <span class="hljs-string">&apos;pro&apos;</span>,
        <span class="hljs-attr">dirName</span>: <span class="hljs-string">&apos;pro&apos;</span>,
        <span class="hljs-attr">baseUrl</span>: <span class="hljs-string">&apos;http://webapi.xxx.com/&apos;</span>,
        <span class="hljs-attr">assetsPublicPath</span>:<span class="hljs-string">&apos;./&apos;</span>
    },

]

<span class="hljs-comment">//&#x83B7;&#x53D6;&#x547D;&#x4EE4;&#x884C;&#x53C2;&#x6570; http://nodejs.cn/api/process.html#process_process_argv</span>
<span class="hljs-keyword">const</span> argv = <span class="hljs-built_in">JSON</span>.parse(process.env.npm_config_argv).original || process.argv
<span class="hljs-keyword">const</span> HOST_ENV = argv[<span class="hljs-number">2</span>] ? argv[<span class="hljs-number">2</span>].replace(<span class="hljs-regexp">/[^a-z]+/ig</span>,<span class="hljs-string">&quot;&quot;</span>) : <span class="hljs-string">&apos;&apos;</span>
<span class="hljs-comment">//&#x6CA1;&#x6709;&#x8BBE;&#x7F6E;&#x73AF;&#x5883;&#xFF0C;&#x5219;&#x9ED8;&#x8BA4;&#x4E3A;&#x7B2C;&#x4E00;&#x4E2A;</span>
<span class="hljs-keyword">const</span> HOST_CONF = HOST_ENV  ? ENV_LIST.find(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item.envName === HOST_ENV) : ENV_LIST[<span class="hljs-number">0</span>] 
<span class="hljs-comment">// &#x628A;&#x73AF;&#x5883;&#x5E38;&#x91CF;&#x6302;&#x8F7D;&#x5230;process.env.HOST_ENV&#x65B9;&#x4FBF;&#x5BA2;&#x6237;&#x7AEF;&#x4F7F;&#x7528;</span>
process.env.BASE_URL = HOST_CONF.baseUrl
<span class="hljs-comment">// log&#x9009;&#x4E2D;&#x7684;&#x53D8;&#x91CF;</span>
<span class="hljs-built_in">console</span>.log(chalk.green(<span class="hljs-string">&apos;&#x5F53;&#x524D;&#x73AF;&#x5883;&#x5E38;&#x91CF;&#xFF1A;&apos;</span>))
<span class="hljs-built_in">console</span>.log(HOST_CONF)

<span class="hljs-built_in">module</span>.exports.HOST_CONF = HOST_CONF
<span class="hljs-built_in">module</span>.exports.ENV_LIST = ENV_LIST</code></pre><p>//build/webpack.base.conf.js &#x901A;&#x8FC7;webpack&#x4F20;&#x5165;&#x5BA2;&#x6237;&#x7AEF;&#x4E2D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  plugins: [
    new webpack.DefinePlugin({
      &apos;process.env.BASE_URL&apos;: &apos;\&quot;&apos; + process.env.BASE_URL + &apos;\&quot;&apos;
    })
  ],

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>  plugins: [
    new webpack.DefinePlugin({
      <span class="hljs-string">&apos;process.env.BASE_URL&apos;</span>: <span class="hljs-string">&apos;\&quot;&apos;</span> + process<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.BASE_URL</span> + <span class="hljs-string">&apos;\&quot;&apos;</span>
    })
  ],

</code></pre><h2 id="articleHeader3">&#x5177;&#x4F53;&#x4F7F;&#x7528;</h2><p>&#x6307;&#x5B9A;&#x5F00;&#x53D1;&#x65F6;&#x7684;&#x73AF;&#x5883;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;dev&#x73AF;&#x5883;&#xFF0C;envName&#x4E3A;config/env-config.js&#x914D;&#x7F6E;&#x7684;&#x73AF;&#x5883;&#x5E38;&#x91CF;&#xFF0C;&#x5BF9;&#x5E94;&#x7684;process.env.BASE_URL&#x7684;&#x503C;&#x5C31;&#x662F; &#x5BF9;&#x5E94;&#x7684;ENV_LIST&#x4E2D;&#x7684;baseUrl</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev --[envName]
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> dev --[envName]
</span></code></pre><p>&#x6307;&#x5B9A;&#x73AF;&#x5883;&#x6253;&#x5305;,&#x8F93;&#x51FA;&#x81F3;dist/[envName]</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build --[envName]
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> build --[envName]
</span></code></pre><p>//&#x6253;&#x5305;&#x6D4B;&#x8BD5;&#x73AF;&#x5883;</p><p><span class="img-wrap"><img data-src="/img/bVbaGn7?w=597&amp;h=208" src="https://static.alili.tech/img/bVbaGn7?w=597&amp;h=208" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>//&#x672C;&#x5730;&#x8C03;&#x8BD5;&#x751F;&#x4EA7;&#x73AF;&#x5883;</p><p><span class="img-wrap"><img data-src="/img/bVbaGiR?w=581&amp;h=278" src="https://static.alili.tech/img/bVbaGiR?w=581&amp;h=278" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader4">&#x6253;&#x5305;&#x6240;&#x6709;&#x73AF;&#x5883;</h2><p>/package.json &#x201C;script&quot;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &quot;build-all&quot;: &quot;npm run build --dev &amp;&amp; npm run build --test &amp;&amp; npm run build --pro&quot;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs n1ql"><code> &quot;<span class="hljs-keyword">build</span>-<span class="hljs-keyword">all</span><span class="hljs-string">&quot;: &quot;</span>npm run <span class="hljs-keyword">build</span> --dev &amp;&amp; npm run <span class="hljs-keyword">build</span> --test &amp;&amp; npm run <span class="hljs-keyword">build</span> --pro<span class="hljs-string">&quot;
</span></code></pre><h2 id="articleHeader5">&#x76EE;&#x524D;&#x53D1;&#x73B0;&#x7684;&#x95EE;&#x9898;</h2><p>&#x547D;&#x4EE4;&#x884C;&#x53C2;&#x6570;&#xFF08;process.argv&#xFF09;&#x6709;&#x4FDD;&#x7559;&#x5173;&#x952E;&#x5B57;&#x6216;&#x8005;&#x662F;&#x88AB;&#x5360;&#x7528;&#x7684;&#xFF0C;&#x5982;prod,&#x9700;&#x8981;&#x6CE8;&#x610F;&#x89C4;&#x907F;&#x3002;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vuejs添加环境常量----多环境开发打包场景解决方案之一

## 原文链接
[https://segmentfault.com/a/1190000014899779](https://segmentfault.com/a/1190000014899779)

