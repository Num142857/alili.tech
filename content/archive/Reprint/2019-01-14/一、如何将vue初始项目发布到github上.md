---
title: '一、如何将vue初始项目发布到github上' 
date: 2019-01-14 2:30:07
hidden: true
slug: 3314y817hb8
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">使用vue-cli构建一个新项目发布到github上并浏览</h1>
<h2 id="articleHeader1">一、vue项目的创建</h2>
<p>1、首先第一肯定是要有Node.js及npm这个不多说了<br>2、安装脚手架<br><span class="img-wrap"><img data-src="/img/bVN8In?w=841&amp;h=249" src="https://static.alili.tech/img/bVN8In?w=841&amp;h=249" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p>此时可以直接浏览<br>-但是现在肯定有很多小白想将他发布到gitHub上并可以浏览，使用vue全家桶制作自己的博客。</p></li>
<li><p>现在就有我来说说如何讲vue项目发布到github上</p></li>
</ul>
<h2 id="articleHeader2">二、vue项目的打包</h2>
<p>1、大家都知道使用<code>npm run build</code>进行打包，这个时候你直接打开<code>dist/</code>下的<code>index.html</code>,会发现文件可以打开，但是所有的<code>js，css，img</code>等路径有问题是指向根目录的，此时需要修改<code>config/index.js</code>里的<code>assetsPublicPath</code>的字段，初始项目是<code>/</code>他是指向项目根目录的也是为什么会出现错误，这时改为<code>./</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code>  <span class="hljs-keyword">build</span>: {
    env: require(<span class="hljs-string">'./prod.env'</span>),
    <span class="hljs-keyword">index</span>: <span class="hljs-keyword">path</span>.resolve(__dirname, <span class="hljs-string">'../dist/index.html'</span>),
    assetsRoot: <span class="hljs-keyword">path</span>.resolve(__dirname, <span class="hljs-string">'../dist'</span>),
    assetsSubDirectory: <span class="hljs-string">'static'</span>,
    assetsPublicPath: <span class="hljs-string">'./'</span>,
    productionSourceMap: <span class="hljs-literal">true</span>,
    // Gzip off <span class="hljs-keyword">by</span> default <span class="hljs-keyword">as</span> many popular static hosts such <span class="hljs-keyword">as</span>
    // Surge <span class="hljs-keyword">or</span> Netlify already gzip <span class="hljs-keyword">all</span> static assets <span class="hljs-keyword">for</span> you.
    // Before setting <span class="hljs-keyword">to</span> <span class="hljs-symbol">`true`</span>, make sure <span class="hljs-keyword">to</span>:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: <span class="hljs-literal">false</span>,
    productionGzipExtensions: [<span class="hljs-string">'js'</span>, <span class="hljs-string">'css'</span>],
    // Run the <span class="hljs-keyword">build</span> command <span class="hljs-keyword">with</span> an extra argument <span class="hljs-keyword">to</span>
    // <span class="hljs-keyword">View</span> the bundle analyzer report after <span class="hljs-keyword">build</span> finishes:
    // <span class="hljs-symbol">`npm run build --report`</span>
    // <span class="hljs-keyword">Set</span> <span class="hljs-keyword">to</span> <span class="hljs-symbol">`true`</span> <span class="hljs-keyword">or</span> <span class="hljs-symbol">`false`</span> <span class="hljs-keyword">to</span> always turn it <span class="hljs-keyword">on</span> <span class="hljs-keyword">or</span> off
    bundleAnalyzerReport: process.env.npm_config_report
  }</code></pre>
<ul><li><p>在从dist根目录打开<code>index</code>文件就可以访问了。</p></li></ul>
<h2 id="articleHeader3">三、github pages</h2>
<p>1、首页创建一个仓库，此处直接忽略<br><span class="img-wrap"><img data-src="/img/bVN8KU?w=855&amp;h=85" src="https://static.alili.tech/img/bVN8KU?w=855&amp;h=85" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>2、在这里选择master或者/doc 上传代码到master <br><span class="img-wrap"><img data-src="/img/bVN8Li?w=705&amp;h=416" src="https://static.alili.tech/img/bVN8Li?w=705&amp;h=416" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>3、上面有一行域名就是你自己的页面可以看到自己发布的项目</p>
<p><span class="img-wrap"><img data-src="/img/bVN8LH?w=1263&amp;h=670" src="https://static.alili.tech/img/bVN8LH?w=1263&amp;h=670" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">四、自定义域名</h2>
<p>1、这个时候就可以浏览自己的项目了，但是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="username.github.io/xxx/dist
这样的地址着实不是很美观，大家可以去阿里云上，自己买个域名，解析一下，网上都有，可以进行自定义的域名，来制作的自己的博客，代码部署到github上。这篇文章这里就先不做讲解了，有想使用自定义域名，也可以私信我。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>username<span class="hljs-selector-class">.github</span><span class="hljs-selector-class">.io</span>/xxx/dist
这样的地址着实不是很美观，大家可以去阿里云上，自己买个域名，解析一下，网上都有，可以进行自定义的域名，来制作的自己的博客，代码部署到github上。这篇文章这里就先不做讲解了，有想使用自定义域名，也可以私信我。
</code></pre>
<h1 id="articleHeader5">总结</h1>
<ul>
<li><p>这里发布页面，其实最主要的时候坑是路径问题，需要修改配置文件，大家没事可以多多浏览文档了解vue的整体架构逻辑，后续再给大家带来框架从入门到放弃。</p></li>
<li><p>项目地址：<br><a href="https://github.com/zhengjianli126/zoe" rel="nofollow noreferrer" target="_blank">https://github.com/zhengjianl...</a></p></li>
<li><p>预览地址：<br><a href="https://zhengjianli126.github.io/zoe/dist" rel="nofollow noreferrer" target="_blank">https://zhengjianli126.github...</a></p></li>
<li><p>后续会就在这个目录一步一步拆分给大家带来如何使用vue2全家桶+webpack2构建一个博客</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一、如何将vue初始项目发布到github上

## 原文链接
[https://segmentfault.com/a/1190000009527796](https://segmentfault.com/a/1190000009527796)

