---
title: 'vue+webpack+scss+jade(pug)的环境搭建' 
date: 2019-01-31 2:31:16
hidden: true
slug: ct6tykgs2rk
categories: [reprint]
---

{{< raw >}}

                    
<p>标签：<strong>vue</strong>,<strong>webpack</strong>,<strong>jade</strong>,<strong>scss</strong><br><strong>声明：转载须经本人同意</strong><br>这篇博客就聊一聊如何用webpack搭建vue2.0的环境，以及拓展了下如何在搭建好的环境中使用scss以及pug（jade），废话不多说，直接进入主题。</p>
<h1 id="articleHeader0">第一步 准备工作</h1>
<p>1.1首先要保证自己的环境中安装了node.js，我们可以通过命令行<code>node -v</code>查看</p>
<p><span class="img-wrap"><img data-src="/img/bVFR1K?w=383&amp;h=57" src="https://static.alili.tech/img/bVFR1K?w=383&amp;h=57" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如果出现版本号，说明已经安装成功了。我这里的node版本是7.0.0，建议大家不要使用过老的版本。如果显示<code>node: command not found</code>则需要安装node，大家直接在node的官网下载安装就好了<br>1.2安装了node以后我们就可以使用npm包管理工具了，由于npm下载模块速度很慢，所以这里建议大家先安装淘宝的npm镜像<strong>cnpm</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g cnpm" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> -g cnpm</code></pre>
<p>安装成功后我们就可以使用cnpm安装依赖了，速度很快。</p>
<h1 id="articleHeader1">第二步 开始搭建</h1>
<p>2.1为了方便起见，我们直接选择<a href="https://vuefe.cn/guide/installation.html" rel="nofollow noreferrer" target="_blank">vue的官方脚手架工具vue-cli安装</a>，该工具提供开箱即用的构建工具配置，带来现代化的前端开发流程。只需一分钟即可启动带热重载、保存时静态检查以及可用于生产环境的构建配置的项目：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 全局安装 vue-cli
$ npm install --global vue-cli
# 创建一个基于 webpack 模板的新项目
$  vue init webpack my-project(你要建立的文件名称，可任意)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code><span class="hljs-comment"># 全局安装 vue-cli</span>
$ npm install <span class="hljs-comment">--global vue-cli</span>
<span class="hljs-comment"># 创建一个基于 webpack 模板的新项目</span>
$  vue init webpack <span class="hljs-keyword">my</span>-project(你要建立的文件名称，可任意)</code></pre>
<p><code>vue init webpack my-project</code>的时候会有一些配置供开发者选择，我简单解释一下：</p>
<p><span class="img-wrap"><img data-src="/img/bVFR1X?w=537&amp;h=411" src="https://static.alili.tech/img/bVFR1X?w=537&amp;h=411" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>2.2接着输入如下命令，你的环境就算初步搭建成功了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 进入目录
$ cd my-project
# 安装依赖，npm可替换为cnpm加快速度
$ npm install
# 运行环境
$ npm run dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code><span class="hljs-comment"># 进入目录</span>
$ cd my-project
<span class="hljs-comment"># 安装依赖，npm可替换为cnpm加快速度</span>
$ npm install
<span class="hljs-comment"># 运行环境</span>
$ npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span></code></pre>
<p>这时我们可以看到一个命令行工具打开了一个端口为8080的本地服务器，在浏览器输入该地址后就可以打开vue的页面，到了这一步，我们就算把vue+webpack的环境搭建完毕了。</p>
<h1 id="articleHeader2">第三步 补充scss，pug依赖（扩展）</h1>
<p>现在，我们搭建的环境并不支持scss，pug语法，我们需要再“加工”一下配置。用到scss，pug的同学相信webpack已经玩的很溜了，我这里就不详细讲了，直接上命令行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#安装支持pug依赖
npm install pug pug-loader pug-filters -D
#安装支持jade依赖
npm install jade jade-loader -D
#安装支持scss依赖
npm install sass sass-loader node-sass -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code><span class="hljs-comment">#安装支持pug依赖</span>
npm <span class="hljs-keyword">install </span>pug pug-loader pug-filters -D
<span class="hljs-comment">#安装支持jade依赖</span>
npm <span class="hljs-keyword">install </span><span class="hljs-keyword">jade </span><span class="hljs-keyword">jade-loader </span>-D
<span class="hljs-comment">#安装支持scss依赖</span>
npm <span class="hljs-keyword">install </span>sass sass-loader node-sass -D</code></pre>
<p>安装完成后，进入到<code>/build</code>目录下，打开<code>webpack.base.conf.js</code> 文件,找到如下图位置：</p>
<p><span class="img-wrap"><img data-src="/img/bVFR15?w=389&amp;h=627" src="https://static.alili.tech/img/bVFR15?w=389&amp;h=627" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>将红框中的内容添加进文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  test: /\.scss$/,
  loader: 'style!css!sass?sourceMap'
},
{
  test: /\.jade$/,
  loader: &quot;jade&quot;
},
{
  test: /\.pug$/,
  loader: 'pug'
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
  <span class="hljs-attribute">test</span>: /\.scss$/,
  loader: <span class="hljs-string">'style!css!sass?sourceMap'</span>
},
{
  <span class="hljs-attribute">test</span>: /\.jade$/,
  loader: <span class="hljs-string">"jade"</span>
},
{
  <span class="hljs-attribute">test</span>: /\.pug$/,
  loader: <span class="hljs-string">'pug'</span>
},</code></pre>
<p>这样，我们的<code>.vue</code>文件就可以支持pug，scss语法了<br>例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//使用pug语法
<template lang=&quot;pug&quot;>
  #app
    img.vue(src=&quot;./assets/logo.png&quot;)
    Hello
</template>
//使用scss语法
<style lang=&quot;scss&quot;>
  *{margin:0;padding: 0}
  body{
    background-image: url(&quot;/static/images/background.png&quot;);
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
      img.vue{
        width: 80px;
        height: auto;
      }
    }
  }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//使用pug语法</span>
&lt;template lang=<span class="hljs-string">"pug"</span>&gt;
  <span class="hljs-selector-id">#app</span>
    <span class="hljs-selector-tag">img</span>.vue(src=<span class="hljs-string">"./assets/logo.png"</span>)
    Hello
&lt;/template&gt;
<span class="hljs-comment">//使用scss语法</span>
&lt;style lang=<span class="hljs-string">"scss"</span>&gt;
  *{<span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>}
  body{
    <span class="hljs-attribute">background-image</span>: url(<span class="hljs-string">"/static/images/background.png"</span>);
    <span class="hljs-selector-id">#app</span> {
      <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'Avenir'</span>, Helvetica, Arial, sans-serif;
      -webkit-<span class="hljs-attribute">font</span>-smoothing: antialiased;
      -moz-osx-<span class="hljs-attribute">font</span>-smoothing: grayscale;
      <span class="hljs-attribute">text-align</span>: center;
      <span class="hljs-attribute">color</span>: <span class="hljs-number">#2c3e50</span>;
      <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">60px</span>;
      <span class="hljs-selector-tag">img</span>.vue{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;
        <span class="hljs-attribute">height</span>: auto;
      }
    }
  }
&lt;/style&gt;</code></pre>
<p><a href="https://github.com/Zegendary/vue-demo/tree/master/vue-search" rel="nofollow noreferrer" target="_blank">搭建源码外加小项目</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue+webpack+scss+jade(pug)的环境搭建

## 原文链接
[https://segmentfault.com/a/1190000007556806](https://segmentfault.com/a/1190000007556806)

