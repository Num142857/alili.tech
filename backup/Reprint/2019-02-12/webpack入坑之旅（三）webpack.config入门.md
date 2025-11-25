---
title: 'webpack入坑之旅（三）webpack.config入门' 
date: 2019-02-12 2:30:12
hidden: true
slug: 4cn0pc3w09
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>转自个人博客：<a href="http://guowenfh.github.io/2016/03/24/vue-webpack-03-config/" rel="nofollow noreferrer" target="_blank">原地址</a></p></blockquote>
<p>这是一系列文章，此系列所有的练习都存在了我的github仓库中<a href="https://github.com/guowenfh/vue-webpack" rel="nofollow noreferrer" target="_blank">vue-webpack</a>，在本人有了新的理解与认识之后,会对文章有不定时的更正与更新。下面是目前完成的列表：</p>
<ul>
<li><p><a href="http://guowenfh.github.io/2016/03/24/vue-webpack-01-base/" rel="nofollow noreferrer" target="_blank">webpack入坑之旅（一）不是开始的开始</a></p></li>
<li><p><a href="http://guowenfh.github.io/2016/03/24/vue-webpack-02-deploy/" rel="nofollow noreferrer" target="_blank">webpack入坑之旅（二）loader入门</a></p></li>
<li><p><a href="http://guowenfh.github.io/2016/03/24/vue-webpack-03-config/" rel="nofollow noreferrer" target="_blank">webpack入坑之旅（三）webpack.config入门</a></p></li>
<li><p><a href="http://guowenfh.github.io/2016/03/24/vue-webpack-04-custom/" rel="nofollow noreferrer" target="_blank">webpack入坑之旅（四）扬帆起航</a></p></li>
<li><p><a href="http://guowenfh.github.io/2016/03/25/vue-webpack-05-vue/" rel="nofollow noreferrer" target="_blank">webpack入坑之旅（五）加载vue单文件组件</a></p></li>
</ul>
<p>在上面我们已经尝试过了两种对于loader的使用方式，无论是在<code>require</code>的时候编写我们<code>loader</code>的前缀，还是在我们的命令行中进根据扩展名来自动绑定我们的<code>loader</code>，显然都不够自动化，在需要编译的语言继续增加的情况下，显然会是一个噩梦。<br>所以webapck实际上为我们提供了一个简单的方法，下面就一起来看看。</p>
<h2 id="articleHeader0">了解webpack配置</h2>
<p>Webpack在执行的时候，除了在命令行传入参数，还可以通过指定的配置文件来执行。默认情况下，会搜索当前目录的<code>webpack.config.js</code>文件，这个文件是一个 <code>node.js</code> 模块，返回一个 <code>json</code> 格式的配置信息对象，或者通过 <code>--config</code> 选项来指定配置文件。</p>
<p>所以现在我们就来新建一个<code>webpack.config.js</code>，在里面填写进下面的内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Webpack = require(&quot;webpack&quot;);
module.exports = {
    entry: [&quot;./entry.js&quot;],
    output: {
        path: __dirname,
        filename: &quot;bundle.js&quot;
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: &quot;style!css&quot;
        }]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: [<span class="hljs-string">"./entry.js"</span>],
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: __dirname,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">"bundle.js"</span>
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">loaders</span>: [{
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
            <span class="hljs-attr">loader</span>: <span class="hljs-string">"style!css"</span>
        }]
    }
}</code></pre>
<p>我们现在仅仅需要运行:<code>webpack</code>，如果你的配置没有问题的话，可以在命令行中看到正确的输出，因为这个命令会自动在当前目录中查找<code>webpack.config.js</code>的配置文件，并按照里面定义的规则来进行执行。</p>
<p>去修改我们的css文件吧，感受一下它的便利。</p>
<p>上面我们仅仅是使用了这个配置文件，我们肯定想在实际的工作环境中，自我对于项目进行针对性的配置。下面我们就先来简单的了解一下里面参数的意义：</p>
<ul>
<li><p><code>entry</code>：指入口文件的配置项，它是一个数组的原因是webpack允许多个入口点。 当然如果你只有一个入口的话，也可以直接使用双引号<code>"./entry.js"</code></p></li>
<li><p><code>output</code>：配置打包结果，<code>path</code>定义了输出的文件夹，filename则定义了打包结果文件的名称</p></li>
<li><p><code>module</code>：定义了对模块的处理逻辑，这里可以用<code>loaders</code>定义了一系列的加载器，以及一些正则。当需要加载的文件匹配test的正则时，就会调用后面的<code>loader</code>对文件进行处理，这正是<code>webpack</code>强大的原因。</p></li>
</ul>
<p>在这里仅仅能做一些很简单的介绍，如果想要真正做到在项目中的实际应用，还需要大量的练习与尝试。在此暂时不做过多的探究。等真正用到了再记录下来。</p>
<h3 id="articleHeader1">了解webpack插件</h3>
<p>下面就来看看<code>webpack</code>中的插件：</p>
<p>插件可以完成更多loader不能完成的功能。插件的使用一般是在<code>webpack.config.js</code>中的<code>plugins</code> 选项中指定。</p>
<p><code>Webpack</code>本身内置了一些常用的插件，还可以通过npm安装第三方插件。</p>
<p>接下来，我们从一个最简单的，用来给输出的文件头部添加注释信息<code>BannerPlugin</code>的内置插件来实践插件的配置和运行。</p>
<p>修改<code> webpack.config.js，</code>添加 plugins配置项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Webpack = require(&quot;webpack&quot;);//必须引入
module:{
},
plugins: [
    new webpack.BannerPlugin(&quot;这里是打包文件头部注释！&quot;)//注意这是一个数组..
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>);<span class="hljs-comment">//必须引入</span>
<span class="hljs-built_in">module</span>:{
},
<span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.BannerPlugin(<span class="hljs-string">"这里是打包文件头部注释！"</span>)<span class="hljs-comment">//注意这是一个数组..</span>
]</code></pre>
<p>运行正确的话应该是这样的，打开<code>bundle.js</code>，会发现在文件头部已经有了我们添加的注释：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*! 这里是打包文件头部注释 */
/******/ (function(modules) { // webpackBootstrap
/******/    // The module cache
/******/    var installedModules = {};
        /***  省略 ***/
        })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/*! 这里是打包文件头部注释 */</span>
<span class="hljs-comment">/******/</span> (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">modules</span>) </span>{ <span class="hljs-comment">// webpackBootstrap</span>
<span class="hljs-comment">/******/</span>    <span class="hljs-comment">// The module cache</span>
<span class="hljs-comment">/******/</span>    <span class="hljs-keyword">var</span> installedModules = {};
        <span class="hljs-comment">/***  省略 ***/</span>
        })</code></pre>
<p>最简单的插件使用方式就是这样的了，就如上面一样的，平淡无奇。</p>
<p>如果看到了这里，相信你对于<code>webpack</code>的最基本的了解应该就差不多了，下面正式进入实战的阶段，来看看我们的一些<code>loader</code>到底是怎么样使用的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack入坑之旅（三）webpack.config入门

## 原文链接
[https://segmentfault.com/a/1190000004690490](https://segmentfault.com/a/1190000004690490)

