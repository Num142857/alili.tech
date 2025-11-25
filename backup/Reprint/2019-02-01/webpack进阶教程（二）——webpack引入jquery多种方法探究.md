---
title: 'webpack进阶教程（二）——webpack引入jquery多种方法探究' 
date: 2019-02-01 2:30:10
hidden: true
slug: ch1stq5e90s
categories: [reprint]
---

{{< raw >}}

                    
<p>对于webapck的初学者来讲，最受挫的就是引入<code>jQuery</code>及<code>jQuery插件</code>时，总是会遇到各种问题。在网上一搜，总能发现多种解决方案，什么<code>externals</code>，<code>providePlugin</code>，<code>vendor</code>,<code>export-loader</code>等等。我们搞不清楚，为什么会有那么多的引用方法，我只是想引用一个<code>jQuery插件</code>而已。其实，<code>webpack</code>引用<code>jQuery</code>困难，是因为jQuery插件众多，有的插件提供了模块化支持，比如支持<code>UMD</code>，有的则没有支持模块化，直接引用全局的<code>jQuery</code>或<code>window.jQuery</code>。下面，我们来分几中情况，来讨论一下<code>webpack</code>引入<code>jQuery</code>的几种方法和它们的区别，来方便大家在实际项目中取舍。</p>
<h1 id="articleHeader0">1.cdn引用jQuery</h1>
<p>网上很多问，"怎样在webpack里全局引用<code>jQuery</code>"。我对"全局引用"的理解，就是把<code>jQuery</code>暴露到全局（浏览器是<code>window</code>）。虽然把<code>jQuery</code>暴露到全局是不推荐的，但是很多插件，尤其早期的插件，是依赖全局的<code>jQuery</code>变量的。cdn引用<code>jQuery</code>，大多是全局的引用。我们来看个例子<br><strong>注：以下例子源码在<code>github</code>上，可通过相应的链接打开，<code>clone</code>下来后，可以直接运行<code>webpack-dev-server</code>看效果，我的<code>webpack</code>和<code>webpack-dev-server</code>是全局安装，你的如果不是全局安装，运行前请自行安装</strong>）。</p>
<p>例子源代码，可以<a href="https://github.com/a932455223/webpackDemo/tree/master/jQueryDemo/example1" rel="nofollow noreferrer" target="_blank">点击这里</a></p>
<p><code>jqGreen.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//没有模块化
(function($){
    $.fn.green = function(){
        $(this).each(function(){
            $(this).css('color','green');
        })
    }
})(jQuery);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="javascrit"><span class="hljs-comment">//没有模块化</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$</span>)</span>{
    $.fn.green = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        $(<span class="hljs-keyword">this</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            $(<span class="hljs-keyword">this</span>).css(<span class="hljs-string">'color'</span>,<span class="hljs-string">'green'</span>);
        })
    }
})(jQuery);</code></pre>
<p><code>index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('./jqGreen');
$('#green').green();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>(<span class="hljs-string">'./jqGreen'</span>);
$(<span class="hljs-string">'#green'</span>).green();</code></pre>
<p><code>index.html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <title>webpack引入jQuery（一）</title>
</head>
<body>
<div id=&quot;green&quot;>该段文字应该为绿色</div>
<script src='http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js'></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>webpack引入jQuery（一）<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"green"</span>&gt;</span>该段文字应该为绿色<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js'</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><code>webpack.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var htmlPlugin = require('html-webpack-plugin');
module.exports = {
    entry:{
        index:'./src/index.js'
    },
    output:{
        path:'builds',
        filename:'[name].js',
        chunkFilename:'chunk.[name].js'
    },
    plugins:[
        new htmlPlugin({
            filename:__dirname+'/builds/index.html',
            template:'./index.html'
        })
    ],
    devServer:{
        contentBase:'./builds',
        inline:true
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> htmlPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>:{
        <span class="hljs-attr">index</span>:<span class="hljs-string">'./src/index.js'</span>
    },
    <span class="hljs-attr">output</span>:{
        <span class="hljs-attr">path</span>:<span class="hljs-string">'builds'</span>,
        <span class="hljs-attr">filename</span>:<span class="hljs-string">'[name].js'</span>,
        <span class="hljs-attr">chunkFilename</span>:<span class="hljs-string">'chunk.[name].js'</span>
    },
    <span class="hljs-attr">plugins</span>:[
        <span class="hljs-keyword">new</span> htmlPlugin({
            <span class="hljs-attr">filename</span>:__dirname+<span class="hljs-string">'/builds/index.html'</span>,
            <span class="hljs-attr">template</span>:<span class="hljs-string">'./index.html'</span>
        })
    ],
    <span class="hljs-attr">devServer</span>:{
        <span class="hljs-attr">contentBase</span>:<span class="hljs-string">'./builds'</span>,
        <span class="hljs-attr">inline</span>:<span class="hljs-literal">true</span>
    }
}</code></pre>
<p><code>jqGreen.js</code>是一个简单的插件，功能是把选中的元素的<code>color</code>属性设置为<code>green</code>。我们在<code>index.js</code>引用了这个插件。需要重点说明的是，<code>jqGreen</code>这个插件，没有采用任何模块化的方案，很多早期的jQuery插件都是这种写法。上面的例子，没有用<code>externals</code>，但是也能正常跑起来。关键就是这个插件<code>jqGreen</code>没有任何模块化方案。</p>
<p>我们运行<code>webpack</code>命令，编译后的文件输出到<code>builds</code>文件下，再运行<code>webpack-dev-server</code>，程序是可以直接跑起来的。我<a href="https://github.com/a932455223/webpackDemo/tree/master/jQueryDemo/example1" rel="nofollow noreferrer" target="_blank">例子</a>里的代码是编译过的，大家<code>clone</code>下来后，可以直接在命令行运行<code>webpack-dev-server</code>把demo跑起来，然后打开<code>http://localhost:8080</code>查看效果。</p>
<p><strong>结论：如果jquery插件没有采用任何模块化方案，直接引用cdn上的jQuery，然后正常引用插件并打包就可以正常使用。</strong></p>
<p>那么，如果我的jQuery插件，有模块化方案呢？<br>我们来改一下上面的<code>jqGreen.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//UMD模块方案
(function(window,factory){
    if(typeof exports === 'object'){
        module.exports = factory(require('jquery'));
    }else if(typeof define === 'function' &amp;&amp; define.amd){
        define(['jquery'],factory);
    }else{
        factor();
    }
})(window,function($){
    $.fn.green = function(){
        $(this).each(function(){
            $(this).css('color','green');
        });
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//UMD模块方案</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">window,factory</span>)</span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> exports === <span class="hljs-string">'object'</span>){
        <span class="hljs-built_in">module</span>.exports = factory(<span class="hljs-built_in">require</span>(<span class="hljs-string">'jquery'</span>));
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> define === <span class="hljs-string">'function'</span> &amp;&amp; define.amd){
        define([<span class="hljs-string">'jquery'</span>],factory);
    }<span class="hljs-keyword">else</span>{
        factor();
    }
})(<span class="hljs-built_in">window</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$</span>)</span>{
    $.fn.green = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        $(<span class="hljs-keyword">this</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            $(<span class="hljs-keyword">this</span>).css(<span class="hljs-string">'color'</span>,<span class="hljs-string">'green'</span>);
        });
    }
});</code></pre>
<p>注意，这个时候，我们的jQuery插件采用了<code>UMD</code>模块化的方案。大家可以直接把<code>jqGreen</code>改成上面的这种<code>UMD</code>形式但不修改<code>webpack.config.js</code>文件。在<code>example1</code>运行<code>webpack</code>命令，会报错，会提示找不到<code>jquery</code>。我们查看<code>builds</code>文件夹下面的<code>index.js</code>文件时候，会发现<br><code>if(typeof exports === 'object')</code>被webpack替换成了<code>if(true)</code>，就是说，webpack编译后的代码，会执行<code>module.exports = factory(require('jquery'));</code>这段代码。注意这里面的<code>require('jquery')</code>，我们并没有在本地安装<code>jquery</code>(没有<code>npm install jquery --save-dev</code>)，而是引用的cdn上的<code>jquery</code>，所以，<code>require('jquery')</code>是找不到'jquery'的，因为他不知道我们是引用cdn上的<code>jquery</code>。那么，怎么才能让webpack不报错，能争取引用呢？答案是<code>externals</code>。</p>
<h2 id="articleHeader1">externals引用'jquery'</h2>
<p>我们只需要在<code>webpack.config.js</code>文件里添加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="externals:{
        'jquery':'window.jQuery'
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">externals:{
        <span class="hljs-string">'jquery'</span>:<span class="hljs-string">'window.jQuery'</span>
    }</code></pre>
<p>大家可以看我的<a href="https://github.com/a932455223/webpackDemo/tree/master/jQueryDemo/example2" rel="nofollow noreferrer" target="_blank">例子源码</a>，例子是可以直接跑起来的。<br>上面的<code>externals</code>配置，告诉webpack，在编译时，看到require('jquery')，就把它替换成<code>window.jQuery</code>。这样，就实现了引用全局上的<code>jQuery</code>，我们的例子，也能正常跑起来啦。<br>这里多说一下，对于刚才我们的第一个例子，就是没有采用任何模块化方案的例子，用<code>externals</code>配置也是可以的，那样<code>externals</code>什么也不会做，但是程序也能跑起来。</p>
<p><strong>总之，如果要全局引用<code>jQuery</code>，不管你的jQuery有没有支持模块化，用<code>externals</code>就对了。</strong></p>
<h1 id="articleHeader2">.IgnorePlugin引用jQuery</h1>
<p><a href="https://github.com/a932455223/webpackDemo/tree/master/jQueryDemo/example3" rel="nofollow noreferrer" target="_blank">IgnorePlugin的示例代码</a><br><code>IgnorePlugin</code>和<code>cnd</code>引用<code>jQuery</code>，都是引用的未处理的<code>jquery</code>源码文件。<code>cdn</code>上的<code>jquery</code>是没法打包（除非下载下来），而本地的<code>jquery</code>webpack默认会对其打包，所以要用<code>IgnorePlugin</code>来告诉webpack不要打包。所以这种引用方式，也需要用<code>externals</code>来暴露全局变量，大家通过上面贴出来的链接，看看示例代码就ok。</p>
<p>注意，我们上面的例子，都是不对<code>jquery</code>打包的，所以页面上的<code>jquery.js</code>都是一个单独的文件。webpack当然也能把<code>jquery</code>打包在内，那样就会用到<code>CommonChunks</code>、<code>vendor</code>等等，下次再聊那种情况。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack进阶教程（二）——webpack引入jquery多种方法探究

## 原文链接
[https://segmentfault.com/a/1190000007249293](https://segmentfault.com/a/1190000007249293)

