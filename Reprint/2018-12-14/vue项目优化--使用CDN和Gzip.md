---
title: 'vue项目优化--使用CDN和Gzip' 
date: 2018-12-14 2:30:11
hidden: true
slug: xdmnff8m1c
categories: [reprint]
---

{{< raw >}}

                    
<p>使用vue-cli构建的vue项目，在打包发布的时候，发现打包后的文件体积很大，使用<code>webpack-bundle-analyzer</code>分析后，发现占用空间最多的是引用的第三方依赖。第三方的依赖文件可以使用cdn外链的方式引入，这样就能大大缩小项目文件的体积。</p>
<p><strong>具体实现</strong>（以我个人项目为例）<br>我的项目中引入了以下模块<code>vue</code> <code>vue-router</code> <code>vuex</code> <code>axios</code> <code>moment</code>  <code>highlight.js</code>。</p>
<p><strong>引入cdn文件</strong><br>我使用的是<a href="http://www.bootcdn.cn/" rel="nofollow noreferrer" target="_blank">bootcdn</a><br>其中moment.js需要额外引入中文语言<br>highlight.js需要引入自己需要的语言<br>我的项目中会展示javascript/html/css/bash/markdown (html支持需要引入xml)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.html

 <script src=&quot;https://cdn.bootcss.com/vue/2.5.13/vue.min.js&quot;></script>
  <script src=&quot;https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js&quot;></script>
  <script src=&quot;https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js&quot;></script>
  <script src=&quot;https://cdn.bootcss.com/axios/0.17.1/axios.min.js&quot;></script>
  <script src=&quot;https://cdn.bootcss.com/moment.js/2.20.1/moment.min.js&quot;></script>
  <script src=&quot;https://cdn.bootcss.com/moment.js/2.20.1/locale/zh-cn.js&quot;></script>
  <script src=&quot;https://cdn.bootcss.com/highlight.js/9.12.0/highlight.min.js&quot;></script>
  <script src=&quot;https://cdn.bootcss.com/highlight.js/9.12.0/languages/javascript.min.js&quot;></script>
  <script src=&quot;https://cdn.bootcss.com/highlight.js/9.12.0/languages/bash.min.js&quot;></script>
  <script src=&quot;https://cdn.bootcss.com/highlight.js/9.12.0/languages/xml.min.js&quot;></script>
  <script src=&quot;https://cdn.bootcss.com/highlight.js/9.12.0/languages/css.min.js&quot;></script>
  <script src=&quot;https://cdn.bootcss.com/highlight.js/9.12.0/languages/markdown.min.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>//index.html

 <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.5.13/vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/axios/0.17.1/axios.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/moment.js/2.20.1/moment.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/moment.js/2.20.1/locale/zh-cn.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/highlight.js/9.12.0/highlight.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/highlight.js/9.12.0/languages/javascript.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/highlight.js/9.12.0/languages/bash.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/highlight.js/9.12.0/languages/xml.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/highlight.js/9.12.0/languages/css.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/highlight.js/9.12.0/languages/markdown.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>删除依赖</strong><br>这些依赖以前是使用npm安装，现在需要在项目文件注释掉（或直接删除这些依赖），所有用到这些你需要替换的第三方依赖文件的代码都需要删除或注释</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="eg:
// import Vue from 'vue'
// import VueRouter from 'vue-router'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>eg:
<span class="hljs-regexp">//</span> <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-regexp">//</span> <span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span></code></pre>
<p>然后在webpack的配置文件里加入如下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios',
    'moment': 'moment',
    'highlight.js': 'highlight.js'
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sml"><code>  externals: {
    <span class="hljs-symbol">'vue'</span>: <span class="hljs-symbol">'Vue'</span>,
    <span class="hljs-symbol">'vue</span>-router': <span class="hljs-symbol">'VueRouter'</span>,
    <span class="hljs-symbol">'vuex'</span>: <span class="hljs-symbol">'Vuex'</span>,
    <span class="hljs-symbol">'axios'</span>: <span class="hljs-symbol">'axios'</span>,
    <span class="hljs-symbol">'moment'</span>: <span class="hljs-symbol">'moment'</span>,
    <span class="hljs-symbol">'highlight</span>.js': <span class="hljs-symbol">'highlight</span>.js'
  }</code></pre>
<p>注意后面的名称是改模块暴露出来的名称，具体不熟悉的可以到引入的js源码里查看。</p>
<p><strong>开启gzip加速</strong><br>打包时，可以将<code>config/index.j</code>s文件的<code>productionGzip</code>设置为<code>true</code><br>主要是<code>webpack</code>里<a href="https://doc.webpack-china.org/plugins/compression-webpack-plugin/" rel="nofollow noreferrer" target="_blank">compression-webpack-plugin</a>模块的实现。</p>
<p>使用node服务器需要安装 <a href="https://github.com/expressjs/compression" rel="nofollow noreferrer" target="_blank">compression</a>模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="express实现
const compression = require('compression')
const express = require('express')
const app = express()
app.use(compression({ threshold: 9 }))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>express实现
<span class="hljs-keyword">const</span> compression = <span class="hljs-keyword">require</span>(<span class="hljs-string">'compression'</span>)
<span class="hljs-keyword">const</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">const</span> app = express()
app.<span class="hljs-keyword">use</span>(compression({ threshold: <span class="hljs-number">9</span> }))</code></pre>
<p>nginx实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //conf文件里
  server {
        listen       8088;
        server_name  localhost;
        location / {
            gzip on;
            gzip_min_length 1k;
            gzip_buffers 16 64k;
            gzip_http_version 1.1;
            gzip_comp_level 9;
            gzip_types text/plain text/javascript application/javascript image/jpeg image/gif image/png application/font-woff application/x-javascript text/css application/xml;
            gzip_vary on;
            root   /xxx/xxx/xxx;
            index index.html
        }
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>  //conf文件里
  server {
        listen       <span class="hljs-number">8088</span><span class="hljs-comment">;</span>
        server_name  localhost<span class="hljs-comment">;</span>
        location / {
            gzip on<span class="hljs-comment">;</span>
            gzip_min_length <span class="hljs-number">1</span>k<span class="hljs-comment">;</span>
            gzip_buffers <span class="hljs-number">16</span> <span class="hljs-number">64</span>k<span class="hljs-comment">;</span>
            gzip_http_version <span class="hljs-number">1.1</span><span class="hljs-comment">;</span>
            gzip_comp_level <span class="hljs-number">9</span><span class="hljs-comment">;</span>
            gzip_types text/plain text/javascript application/javascript image/jpeg image/gif image/png application/font-woff application/x-javascript text/css application/xml<span class="hljs-comment">;</span>
            gzip_vary on<span class="hljs-comment">;</span>
            root   /xxx/xxx/xxx<span class="hljs-comment">;</span>
            index index.html
        }
        }</code></pre>
<p>构建项目，重启服务。<br>然后就享受页面秒开的算酸爽吧.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue项目优化--使用CDN和Gzip

## 原文链接
[https://segmentfault.com/a/1190000013239622](https://segmentfault.com/a/1190000013239622)

