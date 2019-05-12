---
title: '前端工程化——Webpack入门使用' 
date: 2019-02-02 2:30:10
hidden: true
slug: jjcqxm4awyd
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p><code>webpack</code> 是什么？来自一位小白的疑问。</p>
<p>是构建工具，还是打包工具？</p>
<p><code>webpack</code>是一个模块加载器兼打包工具，它能够让你非常清晰的把编写模块化的代码，什么编译都交给<code>webpack</code>就好了，当它也能实现简单的打包，比如合并js，压缩等。</p>
<p>下面我们简单说下<code>webpack</code>和<code>gulp</code>的区别，好加深下webpack的理解。</p>
<p>本质上来说，<code>gulp</code>是通过一系列的插件实现了原本复杂繁琐的任务自动化，比如拷贝啊，替换文件啥的，是一个纯粹的工具。它并不能将你的<code>css</code>，图片等非js资源模块化。但是<code>webpack</code>可以做到将<code>非js</code>资源模块化，比如图片等。</p>
<p>总的来说，<code>gulp</code>是一个自动化任务的工具，所以在项目的开发中，你也可以采用 <code>gulp + webpack</code> 组合大招更好的提升项目效率。</p>
<h2 id="articleHeader1">Webpack的入门使用</h2>
<p>说那么多概念还不如写个小<code>demo</code>来的实在，相比各位看官也是这么想得。</p>
<p>其实，我们记住webpack的核心功能是将静态资源模块化，<code>js，css</code>，图片啊等等，都能通过require的方式进行加载。当然你也可以利用<code>ES6</code>语法<code>improt</code>来引入，这个后面说。</p>
<p>下面我们开始进行咱们的项目吧。</p>
<p>1.首先创建一个空目录，执行命令进行初始化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" > npm init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"> &gt; <span class="hljs-built_in">npm</span> init</code></pre>
<p>这样，咱们就有<code>package.json</code>了，下面我们先把文件目录搭建一下哈。</p>
<p>目录结构如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVEw78?w=418&amp;h=205" src="https://static.alili.tech/img/bVEw78?w=418&amp;h=205" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>好。文件我们建完了，该干活写代码了。</p>
<p>第一个是 <code>index.html</code> 首页，这里我们的很简单外部只是引入了一个 <code>bundle.js</code>，相信大家现在也找不到这个<code>bundle.js</code>，因为这个文件是后面<code>webpack</code>编译打包生成的。他会将<code>style.css，index.js</code>打包成一个<code>js</code>，这样能加快浏览器的加载效率。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.html

<!DOCTYPE html>
    <html lang=&quot;en&quot;>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        <title>demo1</title>
    </head>
    <body>
        <div>Hello,world</div>
        <img src=&quot;./demo.png&quot; alt=&quot;&quot;>
        <script src=&quot;../dist/bundle.js&quot;></script>
    </body>
    </html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>//index.html

<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>demo1<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello,world<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./demo.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../dist/bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>再看看 <code>style.css</code>，很简单，就一句话。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// style.css

body{
    background:red;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-comment">// style.css</span>

body{
    <span class="hljs-built_in">background</span>:<span class="hljs-built_in">red</span>;
}
</code></pre>
<p>再下一下步，我们看看 <code>index.js</code>，它也很简单，而且它的目的是<code>webpack</code>的入口文件，<code>webpack</code>打包就是通过入口文件将里面<code>require</code>的资源一个个加载编译打包。你可以把<code>index.js</code>看成一个向导，指引着<code>webpack</code>去寻找那些需要被解救编译打包的文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.js

require('./style.css');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//index.js</span>

<span class="hljs-built_in">require</span>(<span class="hljs-string">'./style.css'</span>);
</code></pre>
<p>The Next,我们看看编写 <code>webpack.config.js</code> ，特别声明，这个文件是<code>webpack</code>的默认配置，一般你没啥需求也别改它的名字了，但是你要修改的话，自己百度去吧。</p>
<p>修改<code>webpack</code>配置文件命令如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> webpack --config XXX.js
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>&gt; webpack --<span class="hljs-built_in">config</span> XXX.<span class="hljs-keyword">js
</span></code></pre>
<p>具体<code>webpack.config.js</code>配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js

var path = require('path')
var webpack = require('webpack');

module.exports = {
  entry: ['./src/index'],  // 指定编译打包入口文件
  output: {   // 编译完了，输出到这个目录，这个文件名
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [  // 这个是插件配置噢
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    })
  ],
  module: {  // 这个是引入的模块，可以用来做一些其他的事儿
    loaders: [{  //比如这个loaders模块，可以给每种类型文件指定加载器
      test: /\.css$/,
      loaders: ['style', 'css']
    },
    ]
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// webpack.config.js</span>

<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-built_in">module</span>.exports = {
  entry: [<span class="hljs-string">'./src/index'</span>],  <span class="hljs-comment">// 指定编译打包入口文件</span>
  output: {   <span class="hljs-comment">// 编译完了，输出到这个目录，这个文件名</span>
    path: path.join(__dirname, <span class="hljs-string">'dist'</span>),
    filename: <span class="hljs-string">'bundle.js'</span>
  },
  plugins: [  <span class="hljs-comment">// 这个是插件配置噢</span>
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: <span class="hljs-literal">false</span>,
      },
    })
  ],
  <span class="hljs-keyword">module</span>: {  <span class="hljs-comment">// 这个是引入的模块，可以用来做一些其他的事儿</span>
    loaders: [{  <span class="hljs-comment">//比如这个loaders模块，可以给每种类型文件指定加载器</span>
      test: <span class="hljs-regexp">/\.css$/</span>,
      loaders: [<span class="hljs-string">'style'</span>, <span class="hljs-string">'css'</span>]
    },
    ]
  }
}
</code></pre>
<p>好了，到现在我们的业务代码都写完了，该安装所需的插件了。</p>
<p>这里一下安装了多个插件，可能会比较慢，可以先换成国内的淘宝npm镜像:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> npm --registry https://registry.npm.taobao.org info underscore " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tcl"><code style="word-break: break-word; white-space: initial;">&gt; npm --<span class="hljs-keyword">registry</span> https://<span class="hljs-keyword">registry</span>.npm.taobao.org <span class="hljs-keyword">info</span> underscore </code></pre>
<p>安装插件命令如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> npm install style-loader css-loader webpack --save
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>&gt; npm install <span class="hljs-built_in">style</span>-loader css-loader webpack --<span class="hljs-built_in">save</span>
</code></pre>
<p><code>--save</code> 是将依赖写入到<code>package.json</code>里，后面代码给其他人用，直接<code>npm install</code>就能自动安装所有的依赖了。</p>
<p>安装完成后，咱们开始打包！！！</p>
<p>在项目目录执行以下命令：别傻乎乎的把 &gt; 也拷贝进去啊，就是只有一个 <code>webpack</code>！！！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> webpack
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-quote">&gt; webpack</span>
</code></pre>
<p>执行完上面的<code>webpack</code>命令，会出现以下令人欣喜的画面，啥？没出现？自己上去找找看看哪里步骤漏了。<br>这里顺便推荐一个好用的windows下面的命令行工具：  <a href="http://cmder.net/" rel="nofollow noreferrer" target="_blank">cmder</a></p>
<p><span class="img-wrap"><img data-src="/img/bVEw9q?w=412&amp;h=181" src="https://static.alili.tech/img/bVEw9q?w=412&amp;h=181" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>然后你再打开你项目目录的 <code>index.html</code> ，直接双击用浏览器打开噢。</p>
<p>就能看的如下画面。相信你的<code>require('./style.css')</code>也就生效了。</p>
<p><span class="img-wrap"><img data-src="/img/bVExcQ?w=526&amp;h=322" src="https://static.alili.tech/img/bVExcQ?w=526&amp;h=322" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">写在最后</h2>
<p>一个入门级的使用就到这儿了，webpack还有很多黑魔法，本文也只是一个入门使用，后续的我用完再继续跟大家分享一下，对了，还请大神看到有误的地方多多指点哈，提点提点小弟。</p>
<p>如果对你有点点帮助，嘿嘿，回复一下点个赞就是我最大的动力，感激不尽。</p>
<h2 id="articleHeader3">参考文献</h2>
<p><a href="http://www.cnblogs.com/pqjwyn/p/5380689.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/pqjwyn...</a><br><a href="https://github.com/wangning0/Autumn_Ning_Blog/blob/master/blogs/3-12/webpack.md#webpack" rel="nofollow noreferrer" target="_blank">https://github.com/wangning0/...</a>学习之路</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端工程化——Webpack入门使用

## 原文链接
[https://segmentfault.com/a/1190000007238519](https://segmentfault.com/a/1190000007238519)

