---
title: 'webpack 构建性能优化策略小结' 
date: 2019-01-29 2:30:10
hidden: true
slug: hs6kypgssw5
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">背景</h2>
<p>如今前端工程化的概念早已经深入人心，选择一款合适的编译和资源管理工具已经成为了所有前端工程中的标配，而在诸多的构建工具中，<a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">webpack</a>以其丰富的功能和灵活的配置而深受业内吹捧，逐步取代了grunt和gulp成为大多数前端工程实践中的首选，React，Vue，Angular等诸多知名项目也都相继选用其作为官方构建工具，极受业内追捧。但是，随者工程开发的复杂程度和代码规模不断地增加，webpack暴露出来的各种性能问题也愈发明显，极大的影响着开发过程中的体验。</p>
<p><span class="img-wrap"><img data-src="/img/bVHgXt?w=1213&amp;h=231" src="https://static.alili.tech/img/bVHgXt?w=1213&amp;h=231" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">问题归纳</h2>
<p>历经了多个web项目的实战检验，我们对webapck在构建中逐步暴露出来的性能问题归纳主要有如下几个方面：</p>
<ul>
<li>代码全量构建速度过慢，即使是很小的改动，也要等待长时间才能查看到更新与编译后的结果（引入HMR热更新后有明显改进）；</li>
<li>随着项目业务的复杂度增加，工程模块的体积也会急剧增大，构建后的模块通常要以M为单位计算；</li>
<li>多个项目之间共用基础资源存在重复打包，基础库代码复用率不高；</li>
<li>node的单进程实现在耗cpu计算型loader中表现不佳；</li>
</ul>
<p>针对以上的问题，我们来看看怎样利用webpack现有的一些机制和第三方扩展插件来逐个击破。</p>
<h2 id="articleHeader2">慢在何处</h2>
<p>作为工程师，我们一直鼓励要理性思考，用数据和事实说话，“我觉得很慢”，“太卡了”，“太大了”之类的表述难免显得太笼统和太抽象，那么我们不妨从如下几个方面来着手进行分析：</p>
<p><span class="img-wrap"><img data-src="/img/bV0CM3?w=3304&amp;h=2144" src="https://static.alili.tech/img/bV0CM3?w=3304&amp;h=2144" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<ul>
<li>从项目结构着手，代码组织是否合理，依赖使用是否合理；</li>
<li>从webpack自身提供的优化手段着手，看看哪些api未做优化配置；</li>
<li>从webpack自身的不足着手，做有针对性的扩展优化，进一步提升效率；</li>
</ul>
<p>在这里我们推荐使用一个wepback的可视化资源分析工具：<a href="https://github.com/webpack-contrib/webpack-bundle-analyzer" rel="nofollow noreferrer" target="_blank">webpack-bundle-analyzer</a>，在webpack构建的时候会自动帮你计算出各个模块在你的项目工程中的依赖与分布情况，方便做更精确的资源依赖和引用的分析。</p>
<p>从上图中我们不难发现大多数的工程项目中，依赖库的体积永远是大头，通常体积可以占据整个工程项目的7-9成，而且在每次开发过程中也会重新读取和编译对应的依赖资源，这其实是很大的的资源开销浪费，而且对编译结果影响微乎其微，毕竟在实际业务开发中，我们很少会去主动修改第三方库中的源码，改进方案如下：</p>
<h3 id="articleHeader3">方案一、合理配置 CommonsChunkPlugin</h3>
<p>webpack的资源入口通常是以entry为单元进行编译提取，那么当多entry共存的时候，CommonsChunkPlugin的作用就会发挥出来，对所有依赖的chunk进行公共部分的提取，但是在这里可能很多人会误认为抽取公共部分指的是能抽取某个代码片段，其实并非如此，它是以module为单位进行提取。</p>
<p>假设我们的页面中存在entry1，entry2，entry3三个入口，这些入口中可能都会引用如utils，loadash，fetch等这些通用模块，那么就可以考虑对这部分的共用部分机提取。通常提取方式有如下四种实现：</p>
<p><strong>1、传入字符串参数，由chunkplugin自动计算提取</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.optimize.CommonsChunkPlugin('common.js')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin(<span class="hljs-string">'common.js'</span>)</code></pre>
<p>这种做法默认会把所有入口节点的公共代码提取出来, 生成一个common.js</p>
<p><strong>2、有选择的提取公共代码</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.optimize.CommonsChunkPlugin('common.js',['entry1','entry2']);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin(<span class="hljs-string">'common.js'</span>,[<span class="hljs-string">'entry1'</span>,<span class="hljs-string">'entry2'</span>]);</code></pre>
<p>只提取entry1节点和entry2中的共用部分模块, 生成一个common.js</p>
<p><strong>3、将entry下所有的模块的公共部分（可指定引用次数）提取到一个通用的chunk中</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.optimize.CommonsChunkPlugin({
    name: 'vendors',
    minChunks: function (module, count) {
       return (
          module.resource &amp;&amp;
          /\.js$/.test(module.resource) &amp;&amp;
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
       )
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
    <span class="hljs-attr">name</span>: <span class="hljs-string">'vendors'</span>,
    <span class="hljs-attr">minChunks</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, count</span>) </span>{
       <span class="hljs-keyword">return</span> (
          <span class="hljs-built_in">module</span>.resource &amp;&amp;
          <span class="hljs-regexp">/\.js$/</span>.test(<span class="hljs-built_in">module</span>.resource) &amp;&amp;
          <span class="hljs-built_in">module</span>.resource.indexOf(
            path.join(__dirname, <span class="hljs-string">'../node_modules'</span>)
          ) === <span class="hljs-number">0</span>
       )
    }
});</code></pre>
<p>提取所有node_modules中的模块至vendors中，也可以指定minChunks中的最小引用数；</p>
<p><strong>4、抽取enry中的一些lib抽取到vendors中</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry = {
    vendors: ['fetch', 'loadash']
};
new webpack.optimize.CommonsChunkPlugin({
    name: &quot;vendors&quot;,
    minChunks: Infinity
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">entry = {
    <span class="hljs-attr">vendors</span>: [<span class="hljs-string">'fetch'</span>, <span class="hljs-string">'loadash'</span>]
};
<span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
    <span class="hljs-attr">name</span>: <span class="hljs-string">"vendors"</span>,
    <span class="hljs-attr">minChunks</span>: <span class="hljs-literal">Infinity</span>
});</code></pre>
<p>添加一个entry名叫为vendors，并把vendors设置为所需要的资源库，CommonsChunk会自动提取指定库至vendors中。</p>
<h3 id="articleHeader4">方案二、通过 externals 配置来提取常用库</h3>
<p>在实际项目开发过程中，我们并不需要实时调试各种库的源码，这时候就可以考虑使用external选项了。</p>
<p><span class="img-wrap"><img data-src="/img/bVHgYb?w=654&amp;h=607" src="https://static.alili.tech/img/bVHgYb?w=654&amp;h=607" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>简单来说external就是把我们的依赖资源声明为一个外部依赖，然后通过script外链脚本引入。这也是我们早期页面开发中资源引入的一种翻版，只是通过配置后可以告知webapck遇到此类变量名时就可以不用解析和编译至模块的内部文件中，而改用从外部变量中读取，这样能极大的提升编译速度，同时也能更好的利用CDN来实现缓存。</p>
<p>external的配置相对比较简单，只需要完成如下三步：</p>
<p><strong>1、在页面中加入需要引入的lib地址</strong>，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<head>
<script src=&quot;//cdn.bootcss.com/jquery.min.js&quot;></script>
<script src=&quot;//cdn.bootcss.com/underscore.min.js&quot;></script>
<script src=&quot;/static/common/react.min.js&quot;></script>
<script src=&quot;/static/common/react-dom.js&quot;></script>
<script src=&quot;/static/common/react-router.js&quot;></script>
<script src=&quot;/static/common/immutable.js&quot;></script>
</head>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/underscore.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/static/common/react.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/static/common/react-dom.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/static/common/react-router.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/static/common/immutable.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></code></pre>
<p><strong>2、在webapck.config.js中加入external配置项：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.export = {
    externals: {
        'react-router': {
            amd: 'react-router',
            root: 'ReactRouter',
            commonjs: 'react-router',
            commonjs2: 'react-router'
        },
        react: {
            amd: 'react',
            root: 'React',
            commonjs: 'react',
            commonjs2: 'react'
        },
        'react-dom': {
            amd: 'react-dom',
            root: 'ReactDOM',
            commonjs: 'react-dom',
            commonjs2: 'react-dom'
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sml"><code>module.export = {
    externals: {
        <span class="hljs-symbol">'react</span>-router': {
            amd: <span class="hljs-symbol">'react</span>-router',
            root: <span class="hljs-symbol">'ReactRouter'</span>,
            commonjs: <span class="hljs-symbol">'react</span>-router',
            commonjs2: <span class="hljs-symbol">'react</span>-router'
        },
        react: {
            amd: <span class="hljs-symbol">'react'</span>,
            root: <span class="hljs-symbol">'React'</span>,
            commonjs: <span class="hljs-symbol">'react'</span>,
            commonjs2: <span class="hljs-symbol">'react'</span>
        },
        <span class="hljs-symbol">'react</span>-dom': {
            amd: <span class="hljs-symbol">'react</span>-dom',
            root: <span class="hljs-symbol">'ReactDOM'</span>,
            commonjs: <span class="hljs-symbol">'react</span>-dom',
            commonjs2: <span class="hljs-symbol">'react</span>-dom'
        }
    }
}</code></pre>
<p>这里要提到的一个细节是：此类文件在配置前，构建这些资源包时需要采用amd/commonjs/cmd相关的模块化进行兼容封装，即打包好的库已经是umd模式包装过的，如在node_modules/react-router中我们可以看到umd/ReactRouter.js之类的文件，只有这样webpack中的require和import * from 'xxxx'才能正确读到该类包的引用，在这类js的头部一般也能看到如下字样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
if (typeof exports === 'object' &amp;&amp; typeof module === 'object') {
    module.exports = factory(require(&quot;react&quot;));
} else if (typeof define === 'function' &amp;&amp; define.amd) {
    define([&quot;react&quot;], factory);
} else if (typeof exports === 'object') {
    exports[&quot;ReactRouter&quot;] = factory(require(&quot;react&quot;));
} else {
    root[&quot;ReactRouter&quot;] = factory(root[&quot;React&quot;]);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> exports === <span class="hljs-string">'object'</span> &amp;&amp; <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">module</span> === <span class="hljs-string">'object'</span>) {
    <span class="hljs-built_in">module</span>.exports = factory(<span class="hljs-built_in">require</span>(<span class="hljs-string">"react"</span>));
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> define === <span class="hljs-string">'function'</span> &amp;&amp; define.amd) {
    define([<span class="hljs-string">"react"</span>], factory);
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> exports === <span class="hljs-string">'object'</span>) {
    exports[<span class="hljs-string">"ReactRouter"</span>] = factory(<span class="hljs-built_in">require</span>(<span class="hljs-string">"react"</span>));
} <span class="hljs-keyword">else</span> {
    root[<span class="hljs-string">"ReactRouter"</span>] = factory(root[<span class="hljs-string">"React"</span>]);
}</code></pre>
<p><strong>3、非常重要的是一定要在output选项中加入如下一句话：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="output: {
  libraryTarget: 'umd'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">output: {
  <span class="hljs-attr">libraryTarget</span>: <span class="hljs-string">'umd'</span>
}</code></pre>
<p>由于通过external提取过的js模块是不会被记录到webapck的chunk信息中，通过libraryTarget可告知我们构建出来的业务模块，当读到了externals中的key时，需要以umd的方式去获取资源名，否则会有出现找不到module的情况。</p>
<p>通过配置后，我们可以看到对应的资源信息已经可以在浏览器的source map中读到了。</p>
<p><span class="img-wrap"><img data-src="/img/bVHgYW?w=693&amp;h=338" src="https://static.alili.tech/img/bVHgYW?w=693&amp;h=338" alt="externals.png" title="externals.png" style="cursor: pointer;"></span></p>
<p>对应的资源也可以直接由页面外链载入，有效地减小了资源包的体积。</p>
<p><span class="img-wrap"><img data-src="/img/bVHgY0?w=664&amp;h=225" src="https://static.alili.tech/img/bVHgY0?w=664&amp;h=225" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">方案三、利用 DllPlugin 和 DllReferencePlugin 预编译资源模块</h3>
<p>我们的项目依赖中通常会引用大量的npm包，而这些包在正常的开发过程中并不会进行修改，但是在每一次构建过程中却需要反复的将其解析，如何来规避此类损耗呢？这两个插件就是干这个用的。</p>
<p>简单来说DllPlugin的作用是预先编译一些模块，而DllReferencePlugin则是把这些预先编译好的模块引用起来。这边需要注意的是DllPlugin必须要在DllReferencePlugin执行前先执行一次，dll这个概念应该也是借鉴了windows程序开发中的dll文件的设计理念。</p>
<p>相对于externals，dllPlugin有如下几点优势：</p>
<ul>
<li>dll预编译出来的模块可以作为静态资源链接库可被重复使用，尤其适合多个项目之间的资源共享，如同一个站点pc和手机版等；</li>
<li>
<p>dll资源能有效地解决资源循环依赖的问题，部分依赖库如：react-addons-css-transition-group这种原先从react核心库中抽取的资源包，整个代码只有一句话：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = require('react/lib/ReactCSSTransitionGroup');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">module</span>.exports = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react/lib/ReactCSSTransitionGroup'</span>);</code></pre>
<p>却因为重新指向了react/lib中，这也会导致在通过externals引入的资源只能识别react,寻址解析react/lib则会出现无法被正确索引的情况。</p>
</li>
<li>由于externals的配置项需要对每个依赖库进行逐个定制，所以每次增加一个组件都需要手动修改，略微繁琐，而通过dllPlugin则能完全通过配置读取，减少维护的成本；</li>
</ul>
<p><strong>1、配置dllPlugin对应资源表并编译文件</strong></p>
<p>那么externals该如何使用呢，其实只需要增加一个配置文件：webpack.dll.config.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require('webpack');
const path = require('path');
const isDebug = process.env.NODE_ENV === 'development';
const outputPath = isDebug ? path.join(__dirname, '../common/debug') : path.join(__dirname, '../common/dist');
const fileName = '[name].js';

// 资源依赖包，提前编译
const lib = [
  'react',
  'react-dom',
  'react-router',
  'history',
  'react-addons-pure-render-mixin',
  'react-addons-css-transition-group',
  'redux',
  'react-redux',
  'react-router-redux',
  'redux-actions',
  'redux-thunk',
  'immutable',
  'whatwg-fetch',
  'byted-people-react-select',
  'byted-people-reqwest'
];

const plugin = [
  new webpack.DllPlugin({
    /**
     * path
     * 定义 manifest 文件生成的位置
     * [name]的部分由entry的名字替换
     */
    path: path.join(outputPath, 'manifest.json'),
    /**
     * name
     * dll bundle 输出到那个全局变量上
     * 和 output.library 一样即可。
     */
    name: '[name]',
    context: __dirname
  }),
  new webpack.optimize.OccurenceOrderPlugin()
];

if (!isDebug) {
  plugin.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['$', 'exports', 'require']
      },
      compress: { warnings: false },
      output: { comments: false }
    })
  )
}

module.exports = {
  devtool: '#source-map',
  entry: {
    lib: lib
  },
  output: {
    path: outputPath,
    filename: fileName,
    /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.vendor_library`
     */
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: plugin
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> isDebug = process.env.NODE_ENV === <span class="hljs-string">'development'</span>;
<span class="hljs-keyword">const</span> outputPath = isDebug ? path.join(__dirname, <span class="hljs-string">'../common/debug'</span>) : path.join(__dirname, <span class="hljs-string">'../common/dist'</span>);
<span class="hljs-keyword">const</span> fileName = <span class="hljs-string">'[name].js'</span>;

<span class="hljs-comment">// 资源依赖包，提前编译</span>
<span class="hljs-keyword">const</span> lib = [
  <span class="hljs-string">'react'</span>,
  <span class="hljs-string">'react-dom'</span>,
  <span class="hljs-string">'react-router'</span>,
  <span class="hljs-string">'history'</span>,
  <span class="hljs-string">'react-addons-pure-render-mixin'</span>,
  <span class="hljs-string">'react-addons-css-transition-group'</span>,
  <span class="hljs-string">'redux'</span>,
  <span class="hljs-string">'react-redux'</span>,
  <span class="hljs-string">'react-router-redux'</span>,
  <span class="hljs-string">'redux-actions'</span>,
  <span class="hljs-string">'redux-thunk'</span>,
  <span class="hljs-string">'immutable'</span>,
  <span class="hljs-string">'whatwg-fetch'</span>,
  <span class="hljs-string">'byted-people-react-select'</span>,
  <span class="hljs-string">'byted-people-reqwest'</span>
];

<span class="hljs-keyword">const</span> plugin = [
  <span class="hljs-keyword">new</span> webpack.DllPlugin({
    <span class="hljs-comment">/**
     * path
     * 定义 manifest 文件生成的位置
     * [name]的部分由entry的名字替换
     */</span>
    path: path.join(outputPath, <span class="hljs-string">'manifest.json'</span>),
    <span class="hljs-comment">/**
     * name
     * dll bundle 输出到那个全局变量上
     * 和 output.library 一样即可。
     */</span>
    name: <span class="hljs-string">'[name]'</span>,
    <span class="hljs-attr">context</span>: __dirname
  }),
  <span class="hljs-keyword">new</span> webpack.optimize.OccurenceOrderPlugin()
];

<span class="hljs-keyword">if</span> (!isDebug) {
  plugin.push(
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env.NODE_ENV'</span>: <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-string">'production'</span>)
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
      <span class="hljs-attr">mangle</span>: {
        <span class="hljs-attr">except</span>: [<span class="hljs-string">'$'</span>, <span class="hljs-string">'exports'</span>, <span class="hljs-string">'require'</span>]
      },
      <span class="hljs-attr">compress</span>: { <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span> },
      <span class="hljs-attr">output</span>: { <span class="hljs-attr">comments</span>: <span class="hljs-literal">false</span> }
    })
  )
}

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">devtool</span>: <span class="hljs-string">'#source-map'</span>,
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">lib</span>: lib
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: outputPath,
    <span class="hljs-attr">filename</span>: fileName,
    <span class="hljs-comment">/**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.vendor_library`
     */</span>
    library: <span class="hljs-string">'[name]'</span>,
    <span class="hljs-attr">libraryTarget</span>: <span class="hljs-string">'umd'</span>,
    <span class="hljs-attr">umdNamedDefine</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-attr">plugins</span>: plugin
};</code></pre>
<p>然后执行命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" $ NODE_ENV=development webpack --config  webpack.dll.lib.js --progress
 $ NODE_ENV=production webpack --config  webpack.dll.lib.js --progress 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> $ NODE_ENV=development webpack --config  webpack<span class="hljs-selector-class">.dll</span><span class="hljs-selector-class">.lib</span><span class="hljs-selector-class">.js</span> --progress
 $ NODE_ENV=production webpack --config  webpack<span class="hljs-selector-class">.dll</span><span class="hljs-selector-class">.lib</span><span class="hljs-selector-class">.js</span> --progress 
</code></pre>
<p>即可分别编译出支持调试版和生产环境中lib静态资源库，在构建出来的文件中我们也可以看到会自动生成如下资源：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="common
├── debug
│   ├── lib.js
│   ├── lib.js.map
│   └── manifest.json
└── dist
    ├── lib.js
    ├── lib.js.map
    └── manifest.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">common
├── debug
│   ├── lib.js
│   ├── lib.js.map
│   └── manifest.json
└── dist
    ├── lib.js
    ├── lib.js.map
    └── manifest.json</code></pre>
<p>文件说明：</p>
<ul>
<li>lib.js可以作为编译好的静态资源文件直接在页面中通过src链接引入，与externals的资源引入方式一样，生产与开发环境可以通过类似charles之类的代理转发工具来做路由替换；</li>
<li>manifest.json中保存了webpack中的预编译信息，这样等于提前拿到了依赖库中的chunk信息，在实际开发过程中就无需要进行重复编译；</li>
</ul>
<p><strong>2、dllPlugin的静态资源引入</strong></p>
<p>lib.js和manifest.json存在一一对应的关系，所以我们在调用的过程也许遵循这个原则，如当前处于开发阶段，对应我们可以引入common/debug文件夹下的lib.js和manifest.json，切换到生产环境的时候则需要引入common/dist下的资源进行对应操作，这里考虑到手动切换和维护的成本，我们推荐使用<a href="https://github.com/SimenB/add-asset-html-webpack-plugin" rel="nofollow noreferrer" target="_blank">add-asset-html-webpack-plugin</a>进行依赖资源的注入，可得到如下结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<head>
<script src=&quot;/static/common/lib.js&quot;></script>
</head>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/static/common/lib.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></code></pre>
<p>在webpack.config.js文件中增加如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const isDebug = (process.env.NODE_ENV === 'development');
const libPath = isDebug ? '../dll/lib/manifest.json' : 
'../dll/dist/lib/manifest.json';

// 将mainfest.json添加到webpack的构建中

module.export = {
  plugins: [
       new webpack.DllReferencePlugin({
       context: __dirname,
       manifest: require(libPath),
      })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> isDebug = (process.env.NODE_ENV === <span class="hljs-string">'development'</span>);
<span class="hljs-keyword">const</span> libPath = isDebug ? <span class="hljs-string">'../dll/lib/manifest.json'</span> : 
<span class="hljs-string">'../dll/dist/lib/manifest.json'</span>;

<span class="hljs-comment">// 将mainfest.json添加到webpack的构建中</span>

<span class="hljs-built_in">module</span>.export = {
  <span class="hljs-attr">plugins</span>: [
       <span class="hljs-keyword">new</span> webpack.DllReferencePlugin({
       <span class="hljs-attr">context</span>: __dirname,
       <span class="hljs-attr">manifest</span>: <span class="hljs-built_in">require</span>(libPath),
      })
  ]
}</code></pre>
<p>配置完成后我们能发现对应的资源包已经完成了纯业务模块的提取</p>
<p><span class="img-wrap"><img data-src="/img/bVHgZQ?w=954&amp;h=207" src="https://static.alili.tech/img/bVHgZQ?w=954&amp;h=207" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>多个工程之间如果需要使用共同的lib资源，也只需要引入对应的lib.js和manifest.js即可，plugin配置中也支持多个webpack.DllReferencePlugin同时引入使用，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.export = {
  plugins: [
     new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require(libPath),
      }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require(ChartsPath),
      })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.export = {
  <span class="hljs-attr">plugins</span>: [
     <span class="hljs-keyword">new</span> webpack.DllReferencePlugin({
        <span class="hljs-attr">context</span>: __dirname,
        <span class="hljs-attr">manifest</span>: <span class="hljs-built_in">require</span>(libPath),
      }),
      <span class="hljs-keyword">new</span> webpack.DllReferencePlugin({
        <span class="hljs-attr">context</span>: __dirname,
        <span class="hljs-attr">manifest</span>: <span class="hljs-built_in">require</span>(ChartsPath),
      })
  ]
}</code></pre>
<h3 id="articleHeader6">方案四、使用 Happypack 加速你的代码构建</h3>
<p>以上介绍均为针对webpack中的chunk计算和编译内容的优化与改进，对资源的实际体积改进上也较为明显，那么除此之外，我们能否针对资源的编译过程和速度优化上做些尝试呢？</p>
<p>众所周知，webpack中为了方便各种资源和类型的加载，设计了以loader加载器的形式读取资源，但是受限于node的编程模型影响，所有的loader虽然以async的形式来并发调用，但是还是运行在单个 node的进程以及在同一个事件循环中，这就直接导致了当我们需要同时读取多个loader文件资源时，比如babel-loader需要transform各种jsx，es6的资源文件。在这种同步计算同时需要大量耗费cpu运算的过程中，node的单进程模型就无优势了，那么happypack就针对解决此类问题而生。</p>
<h4>开启happypack的线程池</h4>
<p>happypack的处理思路是将原有的webpack对loader的执行过程从单一进程的形式扩展多进程模式，原本的流程保持不变，这样可以在不修改原有配置的基础上来完成对编译过程的优化，具体配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const HappyPack = require('happypack');
 const os = require('os')
 const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length}); // 启动线程池});

module:{
    rules: [
      {
        test: /\.(js|jsx)$/,
        // use: ['babel-loader?cacheDirectory'],
        use: 'happypack/loader?id=jsx',
        exclude: /^node_modules$/
      }
    ]
  },
  plugins:[
    new HappyPack({
     id: 'jsx',
     cache: true,
     threadPool: HappyThreadPool,
     loaders: ['babel-loader']
   })
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> <span class="hljs-keyword">const</span> HappyPack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'happypack'</span>);
 <span class="hljs-keyword">const</span> os = <span class="hljs-built_in">require</span>(<span class="hljs-string">'os'</span>)
 <span class="hljs-keyword">const</span> HappyThreadPool = HappyPack.ThreadPool({ <span class="hljs-attr">size</span>: os.cpus().length}); <span class="hljs-comment">// 启动线程池});</span>

<span class="hljs-built_in">module</span>:{
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(js|jsx)$/</span>,
        <span class="hljs-comment">// use: ['babel-loader?cacheDirectory'],</span>
        use: <span class="hljs-string">'happypack/loader?id=jsx'</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/^node_modules$/</span>
      }
    ]
  },
  <span class="hljs-attr">plugins</span>:[
    <span class="hljs-keyword">new</span> HappyPack({
     <span class="hljs-attr">id</span>: <span class="hljs-string">'jsx'</span>,
     <span class="hljs-attr">cache</span>: <span class="hljs-literal">true</span>,
     <span class="hljs-attr">threadPool</span>: HappyThreadPool,
     <span class="hljs-attr">loaders</span>: [<span class="hljs-string">'babel-loader'</span>]
   })
  ]</code></pre>
<p>我们可以看到通过在loader中配置直接指向happypack提供的loader，对于文件实际匹配的处理 loader，则是通过配置在plugin属性来传递说明，这里happypack提供的loader与plugin的衔接匹配，则是通过id=happybabel来完成。配置完成后，laoder的工作模式就转变成了如下所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVHg1f?w=1141&amp;h=720" src="https://static.alili.tech/img/bVHg1f?w=1141&amp;h=720" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>happypack在编译过程中除了利用多进程的模式加速编译，还同时开启了cache计算，能充分利用缓存读取构建文件，对构建的速度提升也是非常明显的，经过测试，最终的构建速度提升如下：</p>
<p>优化前：<br><span class="img-wrap"><img data-src="/img/bVHg0C?w=896&amp;h=154" src="https://static.alili.tech/img/bVHg0C?w=896&amp;h=154" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>优化后：<br><span class="img-wrap"><img data-src="/img/bVHg0D?w=650&amp;h=136" src="https://static.alili.tech/img/bVHg0D?w=650&amp;h=136" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>关于happyoack的更多介绍可以查看：</p>
<ul>
<li><a href="https://github.com/amireh/happypack" rel="nofollow noreferrer" target="_blank">happypack</a></li>
<li><a href="http://taobaofed.org/blog/2016/12/08/happypack-source-code-analysis/?utm_source=tuicool&amp;utm_medium=referral" rel="nofollow noreferrer" target="_blank">happypack 原理解析</a></li>
</ul>
<h3 id="articleHeader7">方案五、增强 uglifyPlugin</h3>
<p>uglifyJS凭借基于node开发，压缩比例高，使用方便等诸多优点已经成为了js压缩工具中的首选，但是我们在webpack的构建中观察发现，当webpack build进度走到80%前后时，会发生很长一段时间的停滞，经测试对比发现这一过程正是uglfiyJS在对我们的output中的bunlde部分进行压缩耗时过长导致，针对这块我们可以使用<a href="https://github.com/tradingview/webpack-uglify-parallel" rel="nofollow noreferrer" target="_blank">webpack-uglify-parallel</a>来提升压缩速度。</p>
<p>从插件源码中可以看到，webpack-uglify-parallel的是实现原理是采用了多核并行压缩的方式来提升我们的压缩速度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugin.nextWorker().send({
    input: input,
    inputSourceMap: inputSourceMap,
    file: file,
    options: options
});

plugin._queue_len++;
                
if (!plugin._queue_len) {
    callback();
}               

if (this.workers.length < this.maxWorkers) {
    var worker = fork(__dirname + '/lib/worker');
    worker.on('message', this.onWorkerMessage.bind(this));
    worker.on('error', this.onWorkerError.bind(this));
    this.workers.push(worker);
}

this._next_worker++;
return this.workers[this._next_worker % this.maxWorkers];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">plugin.nextWorker().send({
    <span class="hljs-attr">input</span>: input,
    <span class="hljs-attr">inputSourceMap</span>: inputSourceMap,
    <span class="hljs-attr">file</span>: file,
    <span class="hljs-attr">options</span>: options
});

plugin._queue_len++;
                
<span class="hljs-keyword">if</span> (!plugin._queue_len) {
    callback();
}               

<span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.workers.length &lt; <span class="hljs-keyword">this</span>.maxWorkers) {
    <span class="hljs-keyword">var</span> worker = fork(__dirname + <span class="hljs-string">'/lib/worker'</span>);
    worker.on(<span class="hljs-string">'message'</span>, <span class="hljs-keyword">this</span>.onWorkerMessage.bind(<span class="hljs-keyword">this</span>));
    worker.on(<span class="hljs-string">'error'</span>, <span class="hljs-keyword">this</span>.onWorkerError.bind(<span class="hljs-keyword">this</span>));
    <span class="hljs-keyword">this</span>.workers.push(worker);
}

<span class="hljs-keyword">this</span>._next_worker++;
<span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.workers[<span class="hljs-keyword">this</span>._next_worker % <span class="hljs-keyword">this</span>.maxWorkers];</code></pre>
<p>使用配置也非常简单，只需要将我们原来webpack中自带的uglifyPlugin配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.optimize.UglifyJsPlugin({
   exclude:/\.min\.js$/
   mangle:true,
   compress: { warnings: false },
   output: { comments: false }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
   <span class="hljs-attr">exclude</span>:<span class="hljs-regexp">/\.min\.js$/</span>
   mangle:<span class="hljs-literal">true</span>,
   <span class="hljs-attr">compress</span>: { <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span> },
   <span class="hljs-attr">output</span>: { <span class="hljs-attr">comments</span>: <span class="hljs-literal">false</span> }
})</code></pre>
<p>修改成如下代码即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const os = require('os');
    const UglifyJsParallelPlugin = require('webpack-uglify-parallel');
    
    new UglifyJsParallelPlugin({
      workers: os.cpus().length,
      mangle: true,
      compressor: {
        warnings: false,
        drop_console: true,
        drop_debugger: true
       }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> os = <span class="hljs-built_in">require</span>(<span class="hljs-string">'os'</span>);
    <span class="hljs-keyword">const</span> UglifyJsParallelPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-uglify-parallel'</span>);
    
    <span class="hljs-keyword">new</span> UglifyJsParallelPlugin({
      <span class="hljs-attr">workers</span>: os.cpus().length,
      <span class="hljs-attr">mangle</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">compressor</span>: {
        <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">drop_console</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">drop_debugger</span>: <span class="hljs-literal">true</span>
       }
    })</code></pre>
<p>目前webpack官方也维护了一个支持多核压缩的UglifyJs插件：<a href="https://webpack.js.org/plugins/uglifyjs-webpack-plugin/" rel="nofollow noreferrer" target="_blank">uglifyjs-webpack-plugin</a>,使用方式类似，优势在于完全兼容webpack.optimize.UglifyJsPlugin中的配置，可以通过uglifyOptions写入，因此也做为<strong>推荐使用</strong>，参考配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
  new UglifyJsPlugin({
    uglifyOptions: {
      ie8: false,
      ecma: 8,
      mangle: true,
      output: { comments: false },
      compress: { warnings: false }
    },
    sourceMap: false,
    cache: true,
    parallel: os.cpus().length * 2
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> <span class="hljs-keyword">const</span> UglifyJsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'uglifyjs-webpack-plugin'</span>);
  <span class="hljs-keyword">new</span> UglifyJsPlugin({
    <span class="hljs-attr">uglifyOptions</span>: {
      <span class="hljs-attr">ie8</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">ecma</span>: <span class="hljs-number">8</span>,
      <span class="hljs-attr">mangle</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">output</span>: { <span class="hljs-attr">comments</span>: <span class="hljs-literal">false</span> },
      <span class="hljs-attr">compress</span>: { <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span> }
    },
    <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">cache</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">parallel</span>: os.cpus().length * <span class="hljs-number">2</span>
  })</code></pre>
<h3 id="articleHeader8">方案六、Tree-shaking &amp; Scope Hoisting</h3>
<p>wepback在2.X和3.X中从rolluo中借鉴了<a href="https://webpack.js.org/guides/tree-shaking" rel="nofollow noreferrer" target="_blank">tree-shaking</a>和<a href="https://webpack.js.org/plugins/module-concatenation-plugin" rel="nofollow noreferrer" target="_blank">Scope Hoisting</a>，利用es6的module特性，利用AST对所有引用的模块和方法做了静态分析，从而能有效地剔除项目中的没有引用到的方法，并将相关方法调用归纳到了独立的webpack_module中，对打包构建的体积优化也较为明显，但是前提是所有的模块写法必须使用ES6 Module进行实现，具体配置参考如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // .babelrc: 通过配置减少没有引用到的方法
  {
    &quot;presets&quot;: [
      [&quot;env&quot;, {
        &quot;targets&quot;: {
          &quot;browsers&quot;: [&quot;last 2 versions&quot;, &quot;safari >= 7&quot;]
        }
      }],
      // https://www.zhihu.com/question/41922432
      [&quot;es2015&quot;, {&quot;modules&quot;: false}]  // tree-shaking
    ]
  }

  // webpack.config: Scope Hoisting
  {
    plugins:[
      // https://zhuanlan.zhihu.com/p/27980441
      new webpack.optimize.ModuleConcatenationPlugin()
    ]
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> <span class="hljs-comment">// .babelrc: 通过配置减少没有引用到的方法</span>
  {
    <span class="hljs-string">"presets"</span>: [
      [<span class="hljs-string">"env"</span>, {
        <span class="hljs-string">"targets"</span>: {
          <span class="hljs-string">"browsers"</span>: [<span class="hljs-string">"last 2 versions"</span>, <span class="hljs-string">"safari &gt;= 7"</span>]
        }
      }],
      <span class="hljs-comment">// https://www.zhihu.com/question/41922432</span>
      [<span class="hljs-string">"es2015"</span>, {<span class="hljs-string">"modules"</span>: <span class="hljs-literal">false</span>}]  <span class="hljs-comment">// tree-shaking</span>
    ]
  }

  <span class="hljs-comment">// webpack.config: Scope Hoisting</span>
  {
    <span class="hljs-attr">plugins</span>:[
      <span class="hljs-comment">// https://zhuanlan.zhihu.com/p/27980441</span>
      <span class="hljs-keyword">new</span> webpack.optimize.ModuleConcatenationPlugin()
    ]
  }</code></pre>
<h4>适用场景</h4>
<p>在实际的开发过程中，可灵活地选择适合自身业务场景的优化手段。</p>
<table>
<thead><tr>
<th>优化手段</th>
<th>开发环境</th>
<th>生产环境</th>
</tr></thead>
<tbody>
<tr>
<td>CommonsChunk</td>
<td>√</td>
<td>√</td>
</tr>
<tr>
<td>externals</td>
<td>&nbsp;</td>
<td>√</td>
</tr>
<tr>
<td>DllPlugin</td>
<td>√</td>
<td>√</td>
</tr>
<tr>
<td>Happypack</td>
<td>√</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>uglify-parallel</td>
<td>&nbsp;</td>
<td>√</td>
</tr>
</tbody>
</table>
<p><a href="https://github.com/taikongfeizhu/webpack-dll-demo" rel="nofollow noreferrer" target="_blank">工程演示demo</a></p>
<h2 id="articleHeader9">温馨提醒</h2>
<p>本文中的所有例子已经重新优化，支持最新的webpack3特性，并附带有分享ppt地址，可以在线<a href="http://taikongfeizhu.github.io/webpack3-in-action/index.html" rel="nofollow noreferrer" target="_blank">点击查看</a></p>
<h2 id="articleHeader10">小结</h2>
<p>性能优化无小事，追求快没有止境，在前端工程日益庞大复杂的今天，针对实际项目，持续改进构建工具的性能，对项目开发效率的提升和工具深度理解都是极其有益的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack 构建性能优化策略小结

## 原文链接
[https://segmentfault.com/a/1190000007891318](https://segmentfault.com/a/1190000007891318)

