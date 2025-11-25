---
title: '【译】webpack之谜' 
date: 2019-02-01 2:30:10
hidden: true
slug: hm7juizboc
categories: [reprint]
---

{{< raw >}}

                    
<p>【注】本文原发自<a href="https://segmentfault.com/a/1190000007429897">此处</a>，转载请注明出处。</p>
<p><em>本文译自【Webpack-The Confusing Parts】<a href="https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9#.m63u83at2" rel="nofollow noreferrer" target="_blank">原文</a></em></p>
<p>本文已同步发表在<a href="http://hualuyao.com/2016/11/09/secret-webpack/" rel="nofollow noreferrer" target="_blank">我的博客</a></p>
<h2 id="articleHeader0">前言</h2>
<p><code>webpack</code>是当前最受欢迎的模块管理器（<code>module bundler</code>），对于使用<code>React</code>开发的项目来说堪称神器。当然，对于使用其他框架，比如<code>Angular</code>或者<code>Backbone</code>等的开发者来说，<code>webpack</code>也是种很好的工具。</p>
<p>第一次配置<code>webpack.config.js</code>时，有很多地方使我很困惑。在使用了<code>webpack</code>一段时间后，我认识到正是这些地方让<code>webpack</code>如此强大和迷人。</p>
<h2 id="articleHeader1">
<code>webpack</code>核心理念</h2>
<ul>
<li>一切都是模块。—— 在<code>webpack</code>中，不仅<code>js</code>文件可以作为一个模块，其他文件（<code>css</code>，<code>images</code>，<code>html</code>）都可以作为模块。这就是说，你可以在其他文件中加载这些模块，<code>require('myJSfile.js')</code>，或者<code>require('myCSSfile.css')</code>。这意味着我们将任意文件拆分成便于管理的小文件，然后通过在其他文件中加载这些小文件来达到重复利用的目的。</li>
<li>按需加载（<code>Load only "what" you need and "when" you need</code>）—— 一般情况下打包工具会将我们所有的模块打包生成一个最终的文件<code>bundle.js</code>。但是在实际应用中，<code>bundle.js</code>通常会很大（10M~15M），需要很长时间才能加载完成。<code>webpack</code>提供了多种<code>code splitting</code>的方法，会生成过个打包后的文件，且支持按需加载。这样我们只有在需要用到某个模块的时候才会异步加载该模块。</li>
</ul>
<p>现在我们来看下这些令人困惑的部分。</p>
<h2 id="articleHeader2">开发环境和生产环境（Development Vs Production）</h2>
<p>首先要明确的一点是，<code>webpack</code>有很多特性，有些只在开发环境使用，还有些只在生产环境使用，当然还有在生产环境和开发环境都可以使用的。如下图所示：<br><span class="img-wrap"><img data-src="/img/bVFkeE?w=1600&amp;h=898" src="https://static.alili.tech/img/bVFkeE?w=1600&amp;h=898" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote>所以通常我们会有两个<code>config</code>文件，以针对开发环境和生产环境作不同配置。</blockquote>
<p>在<code>package.json</code>做如下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  //npm run build to build production bundles
  &quot;build&quot;: &quot;webpack --config webpack.config.prod.js&quot;,
  //npm run dev to generate development bundles and run dev. server
  &quot;dev&quot;: &quot;webpack-dev-server&quot;
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code><span class="hljs-string">"scripts"</span>: {
  //npm <span class="hljs-built_in">run</span> build <span class="hljs-keyword">to</span> build production bundles
  <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack --config webpack.config.prod.js"</span>,
  //npm <span class="hljs-built_in">run</span> dev <span class="hljs-keyword">to</span> generate development bundles <span class="hljs-literal">and</span> <span class="hljs-built_in">run</span> dev. server
  <span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack-dev-server"</span>
 }</code></pre>
<h2 id="articleHeader3">
<code>webpack CLI</code> Vs <code>webpack-dev-server</code>
</h2>
<p>需要知道<code>webpack</code>提供了两个接口</p>
<ol>
<li>
<code>webpack</code>命令行工具(<code>webpack CLI tool</code>) —— 默认使用这种方式，无需单独安装，被集成在<code>webpack</code>中。</li>
<li>
<code>webpack-dev-server</code> —— <code>node.js</code> 服务器，需要单独安装</li>
</ol>
<h3 id="articleHeader4">Webpack CLI (适用于生产环境构建）</h3>
<p>可以通过命令行添加参数，也可以通过配置文件（默认为<code>webpack.config.js</code>），<code>webpack</code>打包时会读取这些配置。</p>
<blockquote>最初学习<code>webpack</code>时你可能用的就是命令行方式，之后大部分使用命令行的场景为生产环境打包。</blockquote>
<p><strong>使用方法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="方法 1: 
//全局安装
npm install webpack --g
//在命令行使用
$ webpack //<--Generates bundle using webpack.config.js

方法 2 :
//本地安装并保存在package.json中
npm install webpack --save
//在scripts中添加
&quot;scripts&quot;: {
 &quot;build&quot;: &quot;webpack --config webpack.config.prod.js -p&quot;,
 ...
 }
//按以下方式运行
&quot;npm run build&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>方法 <span class="hljs-number">1</span>: 
<span class="hljs-comment">//全局安装</span>
npm install webpack --g
<span class="hljs-comment">//在命令行使用</span>
$ webpack <span class="hljs-comment">//&lt;--Generates bundle using webpack.config.js</span>

方法 <span class="hljs-number">2</span> :
<span class="hljs-comment">//本地安装并保存在package.json中</span>
npm install webpack --save
<span class="hljs-comment">//在scripts中添加</span>
<span class="hljs-string">"scripts"</span>: {
 <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack --config webpack.config.prod.js -p"</span>,
 ...
 }
<span class="hljs-comment">//按以下方式运行</span>
<span class="hljs-string">"npm run build"</span></code></pre>
<h3 id="articleHeader5">
<code>webpack-dev-server</code>（适用于开发环境构建）</h3>
<p><code>webpack-dev-server</code>是一个基于<code>Express</code>的<code>node</code>服务器，默认使用<code>8080</code>端口。这个方式的优点是它提供了浏览器热加载（<code>Hot Module Replacement</code>）。<br><strong>使用方法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="方法一：
//全局安装
npm install webpack-dev-server -g
//在命令行使用
$ webpack-dev-server --inline --hot

方法二：
//添加到package.json中
&quot;script&quot;: {
     &quot;start&quot;: &quot;webpack-dev-server --inline --hot&quot;,
     ...
}
//在命令行使用
$ npm start

在浏览器中打开
http://localhost:8080/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>方法一：
<span class="hljs-comment">//全局安装</span>
npm install webpack-dev-<span class="hljs-keyword">server</span> -g
<span class="hljs-comment">//在命令行使用</span>
$ webpack-dev-<span class="hljs-keyword">server</span> --inline --hot

方法二：
<span class="hljs-comment">//添加到package.json中</span>
<span class="hljs-string">"script"</span>: {
     <span class="hljs-string">"start"</span>: <span class="hljs-string">"webpack-dev-server --inline --hot"</span>,
     ...
}
<span class="hljs-comment">//在命令行使用</span>
$ npm start

在浏览器中打开
http:<span class="hljs-comment">//localhost:8080/</span></code></pre>
<h3 id="articleHeader6">
<code>webpack</code>和<code>webpack-dev-server</code>选项</h3>
<p>需要注意的一点是，像<code>inline</code>和<code>hot</code>这些选项，只有<code>webpack-dev-server</code>有；而另一些比如<code>hide-modules</code>是单独为<code>webpack</code>命令行方式提供的选项。</p>
<h3 id="articleHeader7">
<code>webpack-dev-server</code>参数</h3>
<p>为<code>webpack-dev-server</code>提供参数有两种方式。</p>
<ol>
<li>通过<code>webpack.config.js</code>中的<code>devServer</code>
</li>
<li>通过<code>CLI</code>选项</li>
</ol>
<p><strong>使用方法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//通过CLI
$ webpack-dev-server --hot --inline

//通过webpack.config.js
devServer: {
    inline: true,
    hot: true
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">//通过CLI</span>
<span class="hljs-string">$</span> <span class="hljs-string">webpack-dev-server</span> <span class="hljs-bullet">--hot</span> <span class="hljs-bullet">--inline</span>

<span class="hljs-string">//通过webpack.config.js</span>
<span class="hljs-attr">devServer:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    inline:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    hot:</span> <span class="hljs-literal">true</span>
<span class="hljs-string">}</span></code></pre>
<blockquote>我发现通过<code>devServer</code>设置的配置项（<code>hot: true, inline: true</code>）有时不起作用。所以我更喜欢使用<code>CLI</code>的方式，在<code>package.json</code>中添加如下代码：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package.json
{
    &quot;script&quot;: {
        &quot;start&quot;: &quot;webpack-dev-server --hot --inline&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-class"><span class="hljs-keyword">package</span>.<span class="hljs-title">json</span>
{</span>
    <span class="hljs-string">"script"</span>: {
        <span class="hljs-string">"start"</span>: <span class="hljs-string">"webpack-dev-server --hot --inline"</span>
    }
}</code></pre>
<blockquote>注意<code>不要</code>同时设置<code>devServer</code>中<code>hot: true</code>和<code>CLI</code>中<code>--hot</code>
</blockquote>
<h3 id="articleHeader8">
<code>"hot"</code> Vs <code>"inline"</code>
</h3>
<p><code>inline</code>模式会触发页面的动态重载（<code>live reloading</code>）；<code>hot</code>模式会触发页面的热加载（<code>hot Module Replacement</code>）,这种模式只重载页面中变化了的部分。如果同时设置了<code>inline</code>和<code>hot</code>，<code>webpack-dev-server</code>会先尝试<code>HMR</code>，如果<code>HMR</code>失败了，则重载整个页面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//当代码发生变化时，以下3种方式都会重新打包，但是：

//1. 不会重载页面
$ webpack-dev-server

//2. 会重载整个页面
$ webpack-dev-server --inline

//3. HMR, 若失败则加载整个页面
$ webpack-dev-server --inline --hot" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code><span class="hljs-comment">//当代码发生变化时，以下3种方式都会重新打包，但是：</span>

<span class="hljs-comment">//1. 不会重载页面</span>
$ webpack-dev-<span class="hljs-keyword">server</span>

<span class="hljs-comment">//2. 会重载整个页面</span>
$ webpack-dev-<span class="hljs-keyword">server</span> --inline

<span class="hljs-comment">//3. HMR, 若失败则加载整个页面</span>
$ webpack-dev-<span class="hljs-keyword">server</span> --inline --hot</code></pre>
<h2 id="articleHeader9">
<code>entry</code>(<code>String</code> Vs <code>Array</code> Vs <code>Object</code>)</h2>
<p><code>entry</code>指出了打包入口文件，支持<code>字符串</code>,<code>数组</code>和<code>对象</code>三种形式。这三种形式有何区别呢？</p>
<blockquote>如果为单一入口文件，也就是说入口文件只有一个，那这三种方式会得到相同的结果。</blockquote>
<h3 id="articleHeader10">
<code>entry</code> — <code>Array</code>
</h3>
<p>若有多个入口文件，且彼此独立，那么可以使用数组方式。比如入口文件为<code>a.js</code>，<code>b.js</code>，使用数组方式会将<code>b.js</code>的内容追加到<code>bundle.js</code>的内容后。<br>一个很常见的场景就是在<code>html</code>文件加入统计代码，比如<code>googleAnalytics.js</code>，就可以用数组的方式告知<code>webpack</code>将其打包到<code>bundle.js</code>末尾，如下：<br><span class="img-wrap"><img data-src="/img/bVFkiF?w=1200&amp;h=410" src="https://static.alili.tech/img/bVFkiF?w=1200&amp;h=410" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader11">
<code>entry</code> — <code>Object</code>
</h3>
<p>这种方式主要针对多页面应用（指包含多个<code>html</code>文件）。这种方式可以使<code>webpack</code>根据这个对象一次就打包出多个文件。<br>如下这种配置可以打包出两个<code>js</code>文件：<code>indexEntry.js</code>和<code>profileEntry.js</code>，可以分别在<code>index.html</code>和<code>profile.html</code>中引入。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    entry: {
        &quot;indexEntry&quot;: &quot;./public/src/index.js&quot;,
        &quot;profileEntry&quot;: &quot;./public/src/profile.js&quot;
    },
    output: {
        path: &quot;/dist&quot;,
        filename: &quot;[name].js&quot;  //indexEntry.js &amp; profileEntry.js
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">entry</span>: {
        <span class="hljs-string">"indexEntry"</span>: <span class="hljs-string">"./public/src/index.js"</span>,
        <span class="hljs-string">"profileEntry"</span>: <span class="hljs-string">"./public/src/profile.js"</span>
    },
    <span class="hljs-selector-tag">output</span>: {
        <span class="hljs-attribute">path</span>: <span class="hljs-string">"/dist"</span>,
        filename: <span class="hljs-string">"[name].js"</span>  //indexEntry.js &amp; profileEntry.js
    }
}</code></pre>
<p><strong> 使用方法 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//profile.html
<script src=&quot;dist/profileEntry.js&quot;></script>

//index.html
<script src=&quot;dist/indexEntry.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>//profile.html
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"dist/profileEntry.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

//index.html
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"dist/indexEntry.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong> 注： </strong> <code>output</code>中<code>name</code>对应的是<code>entry</code>中的属性名。</p>
<h3 id="articleHeader12">
<code>entry</code> — 结合使用<code>array</code>和<code>object</code>
</h3>
<p>可以在<code>object</code>内部再使用<code>array</code>方式。比如如下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    entry: {
        &quot;vendor&quot;: ['jquery', 'analytics.js', 'optimizely.js'],
        &quot;index&quot;: &quot;./public/src/index.js&quot;,
        &quot;profile&quot;: &quot;./public/src/profile.js&quot;
    },
    
    output: {
        path: &quot;/dist&quot;,
        filename: &quot;[name].js&quot;  //vendor.js, index.js &amp; profile.js
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">entry</span>: {
        <span class="hljs-string">"vendor"</span>: [<span class="hljs-string">'jquery'</span>, <span class="hljs-string">'analytics.js'</span>, <span class="hljs-string">'optimizely.js'</span>],
        <span class="hljs-string">"index"</span>: <span class="hljs-string">"./public/src/index.js"</span>,
        <span class="hljs-string">"profile"</span>: <span class="hljs-string">"./public/src/profile.js"</span>
    },
    
    <span class="hljs-selector-tag">output</span>: {
        <span class="hljs-attribute">path</span>: <span class="hljs-string">"/dist"</span>,
        filename: <span class="hljs-string">"[name].js"</span>  //vendor.js, index.js &amp; profile.js
    }
}</code></pre>
<h2 id="articleHeader13">
<code>output</code> — <code>path</code>和<code>publicPath</code>
</h2>
<p><code>output</code>设定了打包生成文件的路径。它有两个属性<code>path</code>和<code>publicPath</code>。<br><code>path</code>告知<code>webpack</code>将打包生成后的文件存储于什么路径，比如我们希望将文件打包到<code>dist</code>文件夹下，只需设置<code>path</code>为<code>/dist</code>即可；<code>publicPath</code>用于在生产环境打包时更新文件（包括<code>css</code>、<code>html</code>）中的<code>url</code>。<br>如下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//开发环境config
entry: __dirname + &quot;/app/main.js&quot;,

output: {
    path: __dirname + &quot;/public&quot;,
    
    //开发环境中不需要使用publicPath, 除非你的静态资源比如图片等没有存储在本地开发环境。
    //publicPath: &quot;http://mycdn.com&quot;,
    filename: &quot;bundle.js&quot;
}

//生产环境config
entry: __dirname + &quot;/app/main.js&quot;,

output: {
    path: __dirname + &quot;/public&quot;,
    
    //publicPath: 一些插件（url-loader, file-loader, HtmlWebpackPlugin等)
    //在生成图片，样式表等的url路径时会用到该配置
    //比如：
    //.image {
    //    background-image: url('./test/png');
    //}
    //按如下配置打包后会变成：
    //.image {
    //    background-image: url('http://mycdn.com/test.png');
    //}
    publicPath: &quot;http://mycdn.com/&quot;,
    filename: &quot;bundle.js&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">//开发环境config</span>
<span class="hljs-symbol">entry:</span> __dirname + <span class="hljs-string">"/app/main.js"</span>,
<span class="hljs-symbol">
output:</span> {
<span class="hljs-symbol">    path:</span> __dirname + <span class="hljs-string">"/public"</span>,
    
    <span class="hljs-comment">//开发环境中不需要使用publicPath, 除非你的静态资源比如图片等没有存储在本地开发环境。</span>
    <span class="hljs-comment">//publicPath: "http://mycdn.com",</span>
<span class="hljs-symbol">    filename:</span> <span class="hljs-string">"bundle.js"</span>
}

<span class="hljs-comment">//生产环境config</span>
<span class="hljs-symbol">entry:</span> __dirname + <span class="hljs-string">"/app/main.js"</span>,
<span class="hljs-symbol">
output:</span> {
<span class="hljs-symbol">    path:</span> __dirname + <span class="hljs-string">"/public"</span>,
    
    <span class="hljs-comment">//publicPath: 一些插件（url-loader, file-loader, HtmlWebpackPlugin等)</span>
    <span class="hljs-comment">//在生成图片，样式表等的url路径时会用到该配置</span>
    <span class="hljs-comment">//比如：</span>
    <span class="hljs-comment">//.image {</span>
    <span class="hljs-comment">//    background-image: url('./test/png');</span>
    <span class="hljs-comment">//}</span>
    <span class="hljs-comment">//按如下配置打包后会变成：</span>
    <span class="hljs-comment">//.image {</span>
    <span class="hljs-comment">//    background-image: url('http://mycdn.com/test.png');</span>
    <span class="hljs-comment">//}</span>
<span class="hljs-symbol">    publicPath:</span> <span class="hljs-string">"http://mycdn.com/"</span>,
<span class="hljs-symbol">    filename:</span> <span class="hljs-string">"bundle.js"</span>
}</code></pre>
<p>举个例子，在你的<code>css</code>文件中，用到了<code>./test.png</code>这个<code>url</code>去加载本地的图片。但是在生产环境中，这张图片<code>test.png</code>会存储在<code>cdn</code>服务器上。这样如果还是用<code>./test.png</code>就会访问不到该图片，必须把文件中所有的<code>url</code>手动改成<code>cdn</code>的路径才能在生产环境使用。</p>
<p><code>webpack</code>为我们提供的<code>publicPath</code>这个属性使我们可以很方便地处理这类问题。只需要将<code>publicPath</code>设置为生产环境的路径，这些识别<code>publicPath</code>的插件，比如<code>url-loader</code>,就会自动为我们处理好<code>url</code>。如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVFkvF?w=1200&amp;h=856" src="https://static.alili.tech/img/bVFkvF?w=1200&amp;h=856" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//开发环境，server和image都在本地
.image {
    background-image: url('./test.png');
}

//生产环境, server在HeroKu服务器上，而image在cdn上
.image {
    background-image: url('https://someCDN/test.png');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">//开发环境，server和image都在本地</span>
.<span class="hljs-built_in">image</span> {
    <span class="hljs-built_in">background</span>-<span class="hljs-built_in">image</span>: url(<span class="hljs-string">'./test.png'</span>);
}

<span class="hljs-comment">//生产环境, server在HeroKu服务器上，而image在cdn上</span>
.<span class="hljs-built_in">image</span> {
    <span class="hljs-built_in">background</span>-<span class="hljs-built_in">image</span>: url(<span class="hljs-string">'https://someCDN/test.png'</span>);
}</code></pre>
<p>（<code>译者注：</code> <code>publicPath</code>还用于指定在使用<code>webpack-dev-server</code>时，如何访问其暂存于内存中的打包后的文件。）</p>
<h2 id="articleHeader14">加载器和链式加载器（<code>Loaders And Chaining Loaders</code>）</h2>
<p>加载器是一些<code>node</code>模块，可以加载（<code>load</code>）或者引入（<code>import</code>）各种类型的文件使其转化成浏览器支持的文件格式，包括<code>js</code>,<code>css</code>等等。<br>比如：可以使用<code>babel-loader</code>将使用<code>ES6</code>写的<code>js</code>文件转换为浏览器支持的<code>ES5</code>格式。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module {
    loaders: [
        {
            test: /\.js$/,  //检测js文件，如果是，则对其使用loader处理
            exclude: /node_modules/,  //不对node_modules下文件处理
            loader: 'babel'   //使用babel (对babel-loader的简写)
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">module</span> {
    loaders: [
        {
            test: <span class="hljs-regexp">/\.js$/</span>,  <span class="hljs-comment">//检测js文件，如果是，则对其使用loader处理</span>
            exclude: <span class="hljs-regexp">/node_modules/</span>,  <span class="hljs-comment">//不对node_modules下文件处理</span>
            loader: <span class="hljs-string">'babel'</span>   <span class="hljs-comment">//使用babel (对babel-loader的简写)</span>
        }
    ]
}</code></pre>
<h3 id="articleHeader15">链式加载（从右至左）</h3>
<p>对同一种类型的文件可以链式运用多个加载器。链式调用为从右向左，通过<code>!</code>分割加载器。<br>举例：我们有一个<code>css</code>文件<code>myCSSFile.css</code>，我们想将这个文件中的内容转换成<code>&lt;style&gt;CSS content&lt;/style&gt;</code>的形式插入到我们的<code>html</code>页面中。可以使用两个加载器<code>css-loader</code>和<code>style-loader</code>来达成以上目的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="modules: {
    loaders: [
        {
            test: /\.css$/,
            loader: 'style!css'  //style-loader!css-loader的简写
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">modules</span>: {
    <span class="hljs-attribute">loaders</span>: [
        {
            test: /\.css$/,
            loader: <span class="hljs-string">'style!css'</span>  //style-loader!css-loader的简写
        }
    ]
}</code></pre>
<p>如下展示了其原理：<br><span class="img-wrap"><img data-src="/img/remote/1460000007429900" src="https://static.alili.tech/img/remote/1460000007429900" alt="图片" title="图片" style="cursor: pointer; display: inline;"></span><br>1、<code>webpack</code>查找模块中依赖的<code>css</code>文件。也就是说，<code>webpack</code>会检查<code>js</code>文件中是否引用了<code>myCSSFile.css</code>。如果找到了依赖，<code>webpack</code>会先用<code>css-loader</code>对其进行处理。<br>2、<code>css-loader</code>会加载所有的<code>css</code>和这个<code>css</code>的依赖（比如<code>@import otherCSS</code>），并将<code>css</code>的内容处理为<code>JSON</code>数据格式。然后将结果传给<code>style-loader</code>进行处理。<br>3、<code>style-loader</code>会对接收到的<code>json</code>数据进行处理，并将其处理为<code>style</code>标签——<code>&lt;style&gt;CSS contents&lt;/style&gt;</code>，然后插入到<code>html</code>页面中。</p>
<h2 id="articleHeader16">加载器可配置</h2>
<p>可以向<code>loaders</code>传递各种参数进行配置。<br>在以下这个例子中，我们对<code>url-loader</code>进行了配置：小于1024字节的图片将会被转为为<code>base64</code>格式，而大于1024字节的图片还是使用图片<code>url</code>。有两种方式进行配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//方式1 使用'?'
{
    test: /\.png$/,
    loader: &quot;url-loader?limit=1024&quot;
}

//方式2 使用'query'属性
{
    test: /\.png$/,
    loader: &quot;url-loader&quot;,
    query: {limit: 1024}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">//方式1 使用'?'</span>
{
<span class="hljs-symbol">    test:</span> /\.png$/,
<span class="hljs-symbol">    loader:</span> <span class="hljs-string">"url-loader?limit=1024"</span>
}

<span class="hljs-comment">//方式2 使用'query'属性</span>
{
<span class="hljs-symbol">    test:</span> /\.png$/,
<span class="hljs-symbol">    loader:</span> <span class="hljs-string">"url-loader"</span>,
<span class="hljs-symbol">    query:</span> {limit: <span class="hljs-number">1024</span>}
}</code></pre>
<h2 id="articleHeader17">
<code>.babelrc</code>文件</h2>
<p>使用<code>babel-loader</code>的话，需要配置<code>presets</code>才能正确转化，包括将<code>es6</code>转换为<code>es5</code>，将<code>JSX</code>转为<code>js</code>。可以通过如下方式设置参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    loaders: [
        {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">module</span>: {
    <span class="hljs-attribute">loaders</span>: [
        {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: <span class="hljs-string">'babel'</span>,
            query: {
                presets: [<span class="hljs-string">'react'</span>, <span class="hljs-string">'es2015'</span>]
            }
        }
    ]
}</code></pre>
<p>但是在很多项目中<code>babel</code>的配置可能会比较大，所以可以单独在<code>babel</code>的配置文件<code>.babelrc</code>中配置。如果有<code>.babelrc</code>，<code>babel-loader</code>会自动加载该文件。<br>如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack.config.js
module: {
    loaders: [
        {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        }
    ]
}

//.babelrc
{
    &quot;presets&quot;: [&quot;react&quot;, &quot;es2015&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//webpack.config.js</span>
<span class="hljs-keyword">module</span>: {
    loaders: [
        {
            test: <span class="hljs-regexp">/\.jsx?$/</span>,
            exclude: <span class="hljs-regexp">/(node_modules|bower_components)/</span>,
            loader: <span class="hljs-string">'babel'</span>
        }
    ]
}

<span class="hljs-comment">//.babelrc</span>
{
    <span class="hljs-string">"presets"</span>: [<span class="hljs-string">"react"</span>, <span class="hljs-string">"es2015"</span>]
}</code></pre>
<h2 id="articleHeader18">插件（<code>Plugins</code>）</h2>
<p>插件是一些<code>node</code>模块，可以对生成的打包文件进行处理。<br>比如，<code>uglifyJSPlugin</code>插件可以对打包后得到的<code>bundle.js</code>进行压缩处理，减小文件体积。<br><code>extract-text-webpack-plugin</code>运用了<code>css-loader</code>和<code>style-loader</code>将所有的<code>css</code>统一处理并根据结果生成一个单独的<code>css</code>文件（<code>style.css</code>），将文件链接插入到<code>html</code>文件中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack.config.js
//获取所有的css文件，并将其内容整合，生成一个单独的css文件'style.css'
var ETP = require('extract-text-webpack-plugin');

module: {
    loaders: [
        {
            test: /\.css$/,
            loader: ETP.extract('style-loader', 'css-loader')
        }
    ]
},

plugins: [
    new ExtractTextPlugin(&quot;style.css&quot;)
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//webpack.config.js</span>
<span class="hljs-comment">//获取所有的css文件，并将其内容整合，生成一个单独的css文件'style.css'</span>
<span class="hljs-keyword">var</span> ETP = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);

<span class="hljs-keyword">module</span>: {
    loaders: [
        {
            test: <span class="hljs-regexp">/\.css$/</span>,
            loader: ETP.extract(<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>)
        }
    ]
},

plugins: [
    <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">"style.css"</span>)
]</code></pre>
<p><strong> 注： </strong> <br>如果你只是想使用内联<code>css</code>样式，在<code>html</code>页面中加入<code>style</code>标签，可以只用<code>css</code>和<code>style</code>加载器。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    loaders: [
        {
            test: /\.css$/,
            loader: 'style!css'
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">module</span>: {
    <span class="hljs-attribute">loaders</span>: [
        {
            test: /\.css$/,
            loader: <span class="hljs-string">'style!css'</span>
        }
    ]
}</code></pre>
<h2 id="articleHeader19">加载器和插件(<code>Loaders Vs Plugins</code>)</h2>
<p>可以看到，加载器作用于单独的文件，在<code>bundle</code>生成之前完成；<br>插件作用于<code>bundle</code>或<code>chunk</code>，通常是在<code>bundle</code>生成过程的最后进行。一些插件比如<code>commonsChunksPlugins</code>甚至会影响<code>bundle</code>如何生成。（<code>译者注</code>:该插件用于提取出各个模块中引用的相同模块，下篇文章<code>code splitting</code>中会详细说明）</p>
<h2 id="articleHeader20">文件后缀处理(<code>Resolving File Extensions</code>)</h2>
<p>很多<code>webpack</code>配置文件中都包含一个<code>resolve extensions</code>的属性，其中包含一个空字符串。这个空字符串就是用于正确加载不含后缀的文件的。比如：<code>require('./myJSFile')</code> 或 <code>import myJSFile from  './myJSFile' </code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">resolve</span>: {
        extensions: [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.jsx'</span>]
    }
}</code></pre>
<p><strong> 注： </strong> 翻译水平有限，如有问题还希望大家能不吝赐教，希望和大家共同进步。</p>
<p>(本文完）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】webpack之谜

## 原文链接
[https://segmentfault.com/a/1190000007429897](https://segmentfault.com/a/1190000007429897)

