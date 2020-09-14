---
title: 'JS打包工具rollup——完全入门指南' 
date: 2019-01-04 2:30:11
hidden: true
slug: hvvo3rmt3dj
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>最近在做一个提供给浏览器和node同时使用的js的url模板工具类，在用什么打包工具上纠结了一段时间，正好有一天在知乎上看到了关于rollup的介绍，在自己试了试之后，就决定用rollup.js来打包自己的工具类了。</p>
<p>这篇文章主要是为了让对rollup.js也有兴趣的同学能够快速入门rollup的使用方式而写的，文章除了开始对rollup.js的基本介绍之外，主要用多个demo来介绍rollup.js的不同使用方法，以及介绍一些比较常用的rollup插件。读者可以选择自己有兴趣的部分查看。</p>
<p><a href="http://blog.kainstar.cn/2017/08/12/JS%E6%89%93%E5%8C%85%E5%B7%A5%E5%85%B7rollup%E2%80%94%E5%AE%8C%E5%85%A8%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97/" rel="nofollow noreferrer" target="_blank">文章博客链接</a></p>
<p>本教程相关的所有demo都已上传到github，<a href="https://github.com/hzxszsk/rollup-demos" rel="nofollow noreferrer" target="_blank">rollup-demos</a>，欢迎star。</p>
<h2 id="articleHeader1">rollup.js简介</h2>
<p><a href="https://rollupjs.org/" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/bVSKQh?w=488&amp;h=172" src="https://static.alili.tech/img/bVSKQh?w=488&amp;h=172" alt="rollup.js" title="rollup.js" style="cursor: pointer;"></span></a></p>
<p>首先简单介绍一下rollup.JS。根据官方的介绍，rollup.js是一个模块打包工具，可以帮助你从一个入口文件开始，将所有使用到的模块文件都打包到一个最终的发布文件中（极其适合构建一个工具库，这也是我选择用rollup来打包的原因）。</p>
<p>rollup.js有两个重要的特性，其中一个就是它使用ES6的模块标准，这意味着你可以直接使用<code>import</code>和<code>export</code>而不需要引入babel（当然，在现在的项目中，babel可以说是必用的工具了）。</p>
<p>rollup.js的另一个重要特性叫做'tree-shaking'，这个特性可以帮助你将无用代码（即没有使用到的代码）从最终的生成文件中删去。举个例子，我在A.js文件中定义了A1和A2两个方法，同时在B文件中引入了这两个方法，但是在B文件中只引入了A文件中的A1方法，那么在最后打包B文件时，rollup就不会将A2方法引入到最终文件中。（这个特性是基于ES6模块的静态分析的，也就是说，只有export而没有import的变量是不会被打包到最终代码中的）</p>
<h2 id="articleHeader2">rollup.js实例</h2>
<h3 id="articleHeader3">demo0 开始使用rollup</h3>
<p>初始化一个工程，创建一个依赖模块文件lib.js和入口文件index.js。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function logA() {
    console.log('function logA called')
}

export function logB() {
    console.log('function logB called')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="lib.js"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logA</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'function logA called'</span>)
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logB</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'function logB called'</span>)
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { logA } from './lib'

logA()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="index.js">import { logA } from <span class="hljs-string">'./lib'</span>

<span class="hljs-function"><span class="hljs-title">logA</span><span class="hljs-params">()</span></span></code></pre>
<p>现在我们要把lib.js和index.js打包成dist.js，首先要做的就是安装rollup.js。</p>
<p>在这里我们有两种安装方法：</p>
<ol><li>全局安装：</li></ol>
<p>打开你的命令行，输入<code>npm install rollup -g</code>，等待rollup安装完毕。安装完成之后，试着输入<code>rollup -v</code>来查看一下rollup是否安装成功了</p>
<p><span class="img-wrap"><img data-src="/img/bVSKQD?w=518&amp;h=63" src="https://static.alili.tech/img/bVSKQD?w=518&amp;h=63" alt="查看rollup版本" title="查看rollup版本" style="cursor: pointer;"></span></p>
<p>成功安装完rollup之后，进入到工程目录下，输入打包命令<code>rollup index.js -o dist.js</code>，index.js 是我们的入口文件， -o 表示输出文件的路径，在 -o 后面跟着的 dist.js 就是我们要生成的最终打包文件了。（其实这里本来应该加上一个参数-i，用来表示入口文件的路径，但rollup是会把没有加参数的文件默认为是入口文件，因此我们在这里省略了这个参数）</p>
<p><span class="img-wrap"><img data-src="/img/bVSKQE?w=504&amp;h=73" src="https://static.alili.tech/img/bVSKQE?w=504&amp;h=73" alt="使用全局rollup进行打包" title="使用全局rollup进行打包" style="cursor: pointer;"></span></p>
<p>显示出这条信息之后，我们发现目录下已经多出了一个 dist.js 文件，打开文件，我们发现里面的代码是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function logA() {
    console.log('function logA called');
}

logA();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code class="dist.js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logA</span><span class="hljs-params">()</span> {</span>
    console.<span class="hljs-built_in">log</span>('<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logA</span> <span class="hljs-title">called</span>');
}

<span class="hljs-title">logA</span><span class="hljs-params">()</span>;</span></code></pre>
<p>此时我们就已经完成了打包作业，可以将dist.js引入到HTML文件或是node模块中了</p>
<ol><li>项目本地安装：</li></ol>
<p>进入到项目目录，打开命令行输入<code>npm install rollup --save-dev</code>，把rollup加入到开发依赖中，然后在命令行中输入<code>./node_modules/.bin/rollup index.js -o dist.js</code></p>
<p><span class="img-wrap"><img data-src="/img/bVSKQ9?w=494&amp;h=75" src="https://static.alili.tech/img/bVSKQ9?w=494&amp;h=75" alt="使用项目本地rollup进行打包" title="使用项目本地rollup进行打包" style="cursor: pointer;"></span></p>
<p>或者在<code>package.json</code>文件中添加npm scripts命令<code>"build": "rollup index.js -o dist.js"</code>，在命令行中输入<code>npm run build</code>来进行打包</p>
<p><span class="img-wrap"><img data-src="/img/bVSKRe?w=543&amp;h=133" src="https://static.alili.tech/img/bVSKRe?w=543&amp;h=133" alt="使用项目本地rollup进行打包" title="使用项目本地rollup进行打包" style="cursor: pointer;"></span></p>
<p>在打包完成之后，我们查看一下效果，新建一个index.html文件，在这个文件中引入我们打包出来的dist.js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
    <head>
        <title>rollup 打包测试</title>
        <meta charset=&quot;UTF-8&quot;>
        <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;>
    </head>
    <body>
        <script src=&quot;./dist.js&quot;></script>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="index.html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>rollup 打包测试<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./dist.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>用浏览器打开index.html文件，打开控制台，我们可以看到控制台上输出了一行文字</p>
<p><span class="img-wrap"><img data-src="/img/bVSKRf?w=428&amp;h=124" src="https://static.alili.tech/img/bVSKRf?w=428&amp;h=124" alt="rollup打包文件测试" title="rollup打包文件测试" style="cursor: pointer;"></span></p>
<p>使用命令行运行dist.js文件，我们也可以看到命令行中输出了一行文字</p>
<p><span class="img-wrap"><img data-src="/img/bVSKRm?w=496&amp;h=65" src="https://static.alili.tech/img/bVSKRm?w=496&amp;h=65" alt="rollup打包文件测试" title="rollup打包文件测试" style="cursor: pointer;"></span></p>
<p>这说明我们的打包文件dist.js是可以运行的，打包成功。</p>
<p><strong>PS：</strong></p>
<ol>
<li>接下来的demo中，默认在项目内安装了rollup</li>
<li>接下来的demo中，非必要情况下不会对打包结果进行运行结果测试，读者若需要验证打包效果，请自己编写其他测试代码。</li>
</ol>
<h2 id="articleHeader4">demo1 使用rollup进行模块化打包</h2>
<p>在之前打包的过程中，命令行中输出了一行<code>No format option was supplied – defaulting to 'es'</code>，这表示rollup并没有收到任何模块化的格式指令，因此会用默认的es模块标准来对文件进行打包。</p>
<p>如果在demo0中的index.js文件中把<code>logA()</code>改成<code>export default logA()</code>，那么rollup最后的打包结果就会是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function logA() {
    console.log('function logA called');
}

var index = logA();

export default index;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="dist.js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logA</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'function logA called'</span>);
}

<span class="hljs-keyword">var</span> index = logA();

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> index;</code></pre>
<p>显然这样的代码是不能直接在浏览器端和node端运行的，我们需要把原先的ES6模块转化成浏览器和node支持的形式。</p>
<p>那么要去哪里找rollup把ES6代码转化成其他形式的方法呢？这里有两个方案，一是去<a href="https://rollupjs.org/" rel="nofollow noreferrer" target="_blank">rollup的官网</a>找相关的资料，二是使用rollup命令行的帮助命令，看看能不能找到相关的参数</p>
<p>我们使用rollup命令行的帮助命令，在命令行中输入<code>rollup -h</code></p>
<p><span class="img-wrap"><img data-src="/img/bVSKRv?w=656&amp;h=290" src="https://static.alili.tech/img/bVSKRv?w=656&amp;h=290" alt="rollup命令行帮助" title="rollup命令行帮助" style="cursor: pointer; display: inline;"></span></p>
<p>在这里我们可以看到类似版本号，帮助，使用配置文件等一系列参数。在这里我们可以找到<code>-f</code>这个参数，他的说明是输出的类型（amd，cjs，es，iife，umd），从括号里的内容我们可以看出，使用这个参数可以确定打包完后的文件的模块处理方式。（如果你还不知道这几种模块之间的区别，建议先去找一下相关的资料学习一下）</p>
<p>接下来我们用rollup来打包一下，在demo0中的index.js文件里将<code>logA()</code>改成<code>export default logA()</code>，在package.json文件中写好不同模块的打包命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;build:amd&quot;: &quot;rollup index.js -f amd -o ./dist/dist.amd.js&quot;,
&quot;build:cjs&quot;: &quot;rollup index.js -f cjs -o ./dist/dist.cjs.js&quot;,
&quot;build:es&quot;: &quot;rollup index.js -f es -o ./dist/dist.es.js&quot;,
&quot;build:iife&quot;: &quot;rollup index.js -f iife -n result -o ./dist/dist.iife.js&quot;,
&quot;build:umd&quot;: &quot;rollup index.js -f umd -n result -o ./dist/dist.umd.js&quot;,
&quot;build:all&quot;: &quot;npm run build:amd &amp;&amp; npm run build:cjs &amp;&amp; npm run build:es &amp;&amp; npm run build:iife &amp;&amp; npm run build:umd&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code class="package.json">"<span class="hljs-keyword">build</span>:amd<span class="hljs-string">": "</span>rollup <span class="hljs-keyword">index</span>.js -f amd -o ./dist/dist.amd.js<span class="hljs-string">",
"</span><span class="hljs-keyword">build</span>:cjs<span class="hljs-string">": "</span>rollup <span class="hljs-keyword">index</span>.js -f cjs -o ./dist/dist.cjs.js<span class="hljs-string">",
"</span><span class="hljs-keyword">build</span>:es<span class="hljs-string">": "</span>rollup <span class="hljs-keyword">index</span>.js -f es -o ./dist/dist.es.js<span class="hljs-string">",
"</span><span class="hljs-keyword">build</span>:iife<span class="hljs-string">": "</span>rollup <span class="hljs-keyword">index</span>.js -f iife -n result -o ./dist/dist.iife.js<span class="hljs-string">",
"</span><span class="hljs-keyword">build</span>:umd<span class="hljs-string">": "</span>rollup <span class="hljs-keyword">index</span>.js -f umd -n result -o ./dist/dist.umd.js<span class="hljs-string">",
"</span><span class="hljs-keyword">build</span>:<span class="hljs-keyword">all</span><span class="hljs-string">": "</span>npm run <span class="hljs-keyword">build</span>:amd &amp;&amp; npm run <span class="hljs-keyword">build</span>:cjs &amp;&amp; npm run <span class="hljs-keyword">build</span>:es &amp;&amp; npm run <span class="hljs-keyword">build</span>:iife &amp;&amp; npm run <span class="hljs-keyword">build</span>:umd<span class="hljs-string">"</span></code></pre>
<p>在这里我们发现在设置模块为iife（立即执行函数）和umd时，还加上了一个参数<code>-n</code>，这是因为我们将logA()的结果设置为模块的输出结果，那么在使用iife和umd时，需要事先设定模块的名称，才能让其他人通过这个模块名称引用到你的模块的输出结果。</p>
<p>在命令行中输入<code>npm run build:all</code>，运行所有打包命令，查看效果</p>
<p><span class="img-wrap"><img data-src="/img/bVSKRB?w=153&amp;h=162" src="https://static.alili.tech/img/bVSKRB?w=153&amp;h=162" alt="demo1打包结果" title="demo1打包结果" style="cursor: pointer;"></span></p>
<p>可以看到已经输出了5种不同模块标准的打包文件，由于字数原因，在这里我们只查看一个打包文件（dist.iife.js）的内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = (function () {
'use strict';

function logA() {
    console.log('function logA called');
}

var index = logA();

return index;

}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="dist.iife.js"><span class="hljs-keyword">var</span> result = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">'use strict'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logA</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'function logA called'</span>);
}

<span class="hljs-keyword">var</span> index = logA();

<span class="hljs-keyword">return</span> index;

}());</code></pre>
<p>可以看到所有代码都被打包到了一个立即执行函数中，并且将函数的返回值（模块的输出内容）赋值给了一个全局变量，而这个全局变量的名称就是我们之前设置的模块名称。</p>
<p><strong>PS：</strong> 使用amd模块打包方式时，若不指定模块名称，则会打包成匿名函数，若想打包成一个具名函数，则需要使用<code>-u</code>或<code>--id</code>来指定具名函数名称。</p>
<p>除了-f之外，还有许多其他的参数可以使用，看到这里可能有些同学会觉得麻烦了，这么多参数用起来好麻烦，每次都要输一长串的命令，那么有没有更好的方法来控制rollup的参数配置呢？</p>
<p>当然有，接下来我们就尝试使用配置文件来控制rollup打包。</p>
<h2 id="articleHeader5">demo2 使用配置文件来进行rollup打包</h2>
<p>创建一个demo2，沿用之前demo1的内容，我们在demo2的项目下创建一个文件，取名为<code>rollup.config.js</code>，这个文件就是rollup的配置文件了，rollup根据配置文件的输出配置来进行打包，接下来我们在配置文件中输入配置代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  entry: 'index.js',
  format: 'cjs',
  dest: './dist/dist.js'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="rollup.config.js"><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> {
  <span class="hljs-attribute">entry</span>: <span class="hljs-string">'index.js'</span>,
  format: <span class="hljs-string">'cjs'</span>,
  dest: <span class="hljs-string">'./dist/dist.js'</span>
}</code></pre>
<p><code>entry</code>表示打包的入口文件，<code>format</code>表示要打包成的模块类型，<code>dest</code>表示输出文件的名称路径</p>
<p><strong>PS：</strong> 若使用iife或umd模块打包，需要添加属性<code>moduleName</code>，用来表示模块的名称；若用amd模块打包，可以配置amd相关的参数（使用umd模块模式时，也会使用到amd相关配置参数）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="amd: {
    id: 'amd-name',   // amd具名函数名称
    define: 'def'     // 用来代替define函数的函数名称
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code class="rollup.config.js"><span class="hljs-attribute">amd</span>: {
    <span class="hljs-attribute">id</span>: <span class="hljs-string">'amd-name'</span>,   <span class="hljs-comment">// amd具名函数名称</span>
    <span class="hljs-attribute">define</span>: <span class="hljs-string">'def'</span>     <span class="hljs-comment">// 用来代替define函数的函数名称</span>
}</code></pre>
<p>在这里我们发现配置文件也是使用了ES6语法，这是因为rollup可以自己处理配置文件，所以能够直接用ES6的模块输出（当然，你也可以选择使用node的<code>module.exports</code>方式来输出配置。</p>
<p>在package.json文件中编写npm scripts命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;build&quot;: &quot;rollup -c&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code class="package.json" style="word-break: break-word; white-space: initial;"><span class="hljs-string">"build"</span>: <span class="hljs-string">"rollup -c"</span></code></pre>
<p><code>-c</code>这个参数表示使用配置文件来进行打包，若后面没有指定使用的配置文件路径，则使用默认的配置文件名称<code>rollup.config.js</code>。</p>
<p>在命令行中输入<code>npm run build</code>，执行打包，可以看到生成了打包文件dist.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';

function logA() {
    console.log('function logA called');
}

var index = logA();

module.exports = index;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="dist.js"><span class="hljs-meta">'use strict'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logA</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'function logA called'</span>);
}

<span class="hljs-keyword">var</span> index = logA();

<span class="hljs-built_in">module</span>.exports = index;</code></pre>
<p><strong>进阶：</strong> 当rollup配置文件最终输出的不是一个对象而是一个数组时，rollup会把每一个数组元素当成一个配置输出结果，因此可以在一个配置文件内设置多种输出配置</p>
<p>例如，我们添加一个indexB.js文件，在这个文件中我们将logA替换为logB，并将rollup配置文件改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default [{
  entry: 'index.js',
  format: 'cjs',
  dest: './dist/distA.js'
},{
  entry: 'indexB.js',
  format: 'iife',
  moduleName: 'indexB',
  dest: './dist/distB.js'
}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code class="rollup.config.js">export default [{
  entry: <span class="hljs-string">'index.js'</span>,
  forma<span class="hljs-variable">t:</span> <span class="hljs-string">'cjs'</span>,
  des<span class="hljs-variable">t:</span> <span class="hljs-string">'./dist/distA.js'</span>
},{
  entry: <span class="hljs-string">'indexB.js'</span>,
  forma<span class="hljs-variable">t:</span> <span class="hljs-string">'iife'</span>,
  moduleName: <span class="hljs-string">'indexB'</span>,
  des<span class="hljs-variable">t:</span> <span class="hljs-string">'./dist/distB.js'</span>
}]</code></pre>
<p>运行打包命令，发现在dist目录下生成了distA.js和distB.js两个文件，说明多项配置打包成功。</p>
<p>除了上面这种输出一个配置数组之外，你还可以通过配置target属性来输出多个打包文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  entry: 'index.js',
  targets: [{
      dest: 'dist/bundle.cjs.js',
      format: 'cjs'
    },
    {
      dest: 'dist/bundle.umd.js',
      moduleName: 'res',
      format: 'umd'
    },
    {
      dest: 'dist/bundle.es.js',
      format: 'es'
    },
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="rollup.config.js"><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> {
  <span class="hljs-attribute">entry</span>: <span class="hljs-string">'index.js'</span>,
  targets: [{
      dest: <span class="hljs-string">'dist/bundle.cjs.js'</span>,
      format: <span class="hljs-string">'cjs'</span>
    },
    {
      <span class="hljs-attribute">dest</span>: <span class="hljs-string">'dist/bundle.umd.js'</span>,
      moduleName: <span class="hljs-string">'res'</span>,
      format: <span class="hljs-string">'umd'</span>
    },
    {
      <span class="hljs-attribute">dest</span>: <span class="hljs-string">'dist/bundle.es.js'</span>,
      format: <span class="hljs-string">'es'</span>
    },
  ]
}</code></pre>
<p>这样配置会在dist目录下面输出<code>bundle.cjs.js</code>，<code>bundle.umd.js</code>和<code>bundle.es.js</code>三个打包文件，同时umd模块的名称会被定义成res。</p>
<h2 id="articleHeader6">demo3 监听文件变化，随时打包</h2>
<p>我们在开发过程中，需要频繁对源文件进行修改，如果每次都自己手动输一遍打包命令，那真的是要烦死。因此，我们选择使用rollup提供的监听功能，安装<code>rollup-wacth</code>模块，再在rollup命令后面加上<code>-w</code>参数，就能让rollup监听文件变化，即时打包。</p>
<p>安装watch包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i rollup-watch --save-dev
// or
yarn add rollup-watch --dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>npm i rollup-watch <span class="hljs-comment">--save-dev</span><span class="hljs-comment">
// or</span>
yarn <span class="hljs-built_in">add</span> rollup-watch <span class="hljs-comment">--dev</span></code></pre>
<p>编写npm scripts：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;dev&quot;: &quot;rollup -c -w&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code class="package.json" style="word-break: break-word; white-space: initial;"><span class="hljs-string">"dev"</span>: <span class="hljs-string">"rollup -c -w"</span></code></pre>
<p>执行<code>npm run dev</code>，看到下面的提示：</p>
<p><span class="img-wrap"><img data-src="/img/bVSKTL?w=518&amp;h=142" src="https://static.alili.tech/img/bVSKTL?w=518&amp;h=142" alt="rollup 监听文件变化" title="rollup 监听文件变化" style="cursor: pointer;"></span></p>
<p>好了，这个时候你就可以随便修改你的源文件了，rollup会自动为你打包的。</p>
<p><strong>PS：</strong> 若是你不想监听某些文件，只要在配置文件中加上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch: {
    exclude: ['path/to/file/which/you/want/to/ignore']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="rollup.config.js"><span class="hljs-selector-tag">watch</span>: {
    <span class="hljs-attribute">exclude</span>: [<span class="hljs-string">'path/to/file/which/you/want/to/ignore'</span>]
}</code></pre>
<p>就行了,其中的exclude表示你想要忽略的文件的路径（支持glob模式匹配)</p>
<h2 id="articleHeader7">demo4 是时候写ES6了</h2>
<p>ES6可以说是现代JS开发100%会用到的技术了，rollup虽然支持了解析<code>import</code>和<code>export</code>两种语法，但是却不会将其他的ES6代码转化成ES5代码，因此我们在编写ES6代码的时候，需要引入插件来支持ES6代码的解析。</p>
<ol><li>安装插件和你需要的babel preset：</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i rollup-plugin-babel babel-preset-es2015 --save-dev
// or
yarn add rollup-plugin-babel babel-preset-es2015 --dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">npm</span> i rollup-plugin-<span class="hljs-keyword">babel </span><span class="hljs-keyword">babel-preset-es2015 </span>--save-dev
// or
<span class="hljs-symbol">yarn</span> <span class="hljs-keyword">add </span>rollup-plugin-<span class="hljs-keyword">babel </span><span class="hljs-keyword">babel-preset-es2015 </span>--dev</code></pre>
<ol><li>创建.babalrc文件：</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    [&quot;es2015&quot;, {
        &quot;modules&quot;: false
    }]
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code class=".babelrc">{
  <span class="hljs-attr">"presets"</span>: [
    [<span class="hljs-string">"es2015"</span>, {
        <span class="hljs-attr">"modules"</span>: <span class="hljs-literal">false</span>
    }]
  ]
}</code></pre>
<p>之所以使用<code>modules:false</code>这个参数，是因为rollup默认是通过ES6模块语法来解析文件间的依赖，rollup默认是不支持解析common.js的模块规范的（怎么让rollup支持我会在接下来的demo中讲解），因此需要让babel不转化模块相关的语法，不然rollup在使用过程中会报错。</p>
<ol><li>编写rollup配置文件：</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import babel from 'rollup-plugin-babel';

export default [{
  entry: 'index.js',
  format: 'iife',
  dest: './dist/dist.js',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="rollup.config.js"><span class="hljs-keyword">import</span> babel <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-babel'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> [{
  entry: <span class="hljs-string">'index.js'</span>,
  format: <span class="hljs-string">'iife'</span>,
  dest: <span class="hljs-string">'./dist/dist.js'</span>,
  plugins: [
    babel({
      exclude: <span class="hljs-string">'node_modules/**'</span>
    })
  ]
}]</code></pre>
<p>rollup的配置文件的plugins属性可以让你添加在rollup打包过程中所要用到的插件，但是要注意的是，<strong>插件的添加顺序决定了它们在打包过程中的使用顺序</strong>，因此要注意配置文件的插件使用顺序。</p>
<ol><li>编写ES6代码</li></ol>
<p>在这里我们新建三个文件，两个类Person和Man和一个入口文件index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class Person {
    constructor (name, gender = '男') {
        this.name = name
        this.gender = gender
    }

    say () {
        console.log(`我的名字是${this.name}，是一个${this.gender}生`)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="Person.js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
    <span class="hljs-keyword">constructor</span> (name, gender = '男') {
        <span class="hljs-keyword">this</span>.name = name
        <span class="hljs-keyword">this</span>.gender = gender
    }

    say () {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`我的名字是<span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span>，是一个<span class="hljs-subst">${<span class="hljs-keyword">this</span>.gender}</span>生`</span>)
    }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Person from './Person'

export default class Man extends Person {
    constructor (name) {
        super(name, '男')
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="Man.js"><span class="hljs-keyword">import</span> <span class="hljs-type">Person</span> from './<span class="hljs-type">Person</span>'

export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Man</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Person</span> </span>{
    constructor (name) {
        <span class="hljs-keyword">super</span>(name, '男')
    }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Man from './src/Man'

new Man('KainStar').say()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="index.js"><span class="hljs-keyword">import</span> Man <span class="hljs-keyword">from</span> <span class="hljs-string">'./src/Man'</span>

<span class="hljs-keyword">new</span> Man(<span class="hljs-string">'KainStar'</span>).say()</code></pre>
<ol><li>运行打包命令<code>npm run build</code>
</li></ol>
<p><span class="img-wrap"><img data-src="/img/bVSKUR?w=753&amp;h=160" src="https://static.alili.tech/img/bVSKUR?w=753&amp;h=160" alt="rollup babel打包1" title="rollup babel打包1" style="cursor: pointer;"></span></p>
<p>可以看到rollup输出了一段提示文字，我们先不去管它，先看看打包出来的文件能不能运行，执行<code>node dist/dist.js</code></p>
<p><span class="img-wrap"><img data-src="/img/bVSKUZ?w=315&amp;h=58" src="https://static.alili.tech/img/bVSKUZ?w=315&amp;h=58" alt="rollup babel打包2" title="rollup babel打包2" style="cursor: pointer;"></span></p>
<p>可以看到代码运行成功了，那么我们回来继续看之前的提示文字，它的意思是'classCallCheck'这个babel helper函数使用了多次，rollup推荐我们使用external-helpers这个插件或es2015-rollup这个babel-preset来简化打包出来的代码。</p>
<p>我们查看一下打包出来的dist.js文件，发现_classCallCheck这个函数被定义了两次，分别被取名为_classCallCheck和_classCallCheck$1，这样的代码肯定是可以简化的，因此我们引入external-helpers这个插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i babel-plugin-external-helpers --save-dev
// or
yarn add babel-plugin-external-helpers --dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>npm i babel-plugin-<span class="hljs-keyword">external</span>-helpers --<span class="hljs-keyword">save</span>-dev
<span class="hljs-comment">// or</span>
yarn add babel-plugin-<span class="hljs-keyword">external</span>-helpers --dev</code></pre>
<p>修改.babelrc文件为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;presets&quot;: [
        [&quot;es2015&quot;, {
            &quot;modules&quot;: false
        }]
    ],
    &quot;plugins&quot;: [
        &quot;external-helpers&quot;
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code class=".babelrc">{
    <span class="hljs-attr">"presets"</span>: [
        [<span class="hljs-string">"es2015"</span>, {
            <span class="hljs-attr">"modules"</span>: <span class="hljs-literal">false</span>
        }]
    ],
    <span class="hljs-attr">"plugins"</span>: [
        <span class="hljs-string">"external-helpers"</span>
    ]
}</code></pre>
<p><strong>或者</strong>在配置文件中使用babel配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
    babel({
        plugins: ['external-helpers']
    })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">plugins</span>: [
    babel({
        <span class="hljs-attribute">plugins</span>: [<span class="hljs-string">'external-helpers'</span>]
    })
]</code></pre>
<p><strong>注意！</strong> 在rollup-plugin-babel的官方github仓库中有一段配置是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
    babel({
      plugins: ['external-helpers'],
      externalHelpers: true
    })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">plugins:</span> <span class="hljs-string">[</span>
    <span class="hljs-string">babel({</span>
<span class="hljs-attr">      plugins:</span> <span class="hljs-string">['external-helpers'],</span>
<span class="hljs-attr">      externalHelpers:</span> <span class="hljs-literal">true</span>
    <span class="hljs-string">})</span>
<span class="hljs-string">]</span></code></pre>
<p>这段配置的使用要求是你需要设置全局的<code>babelHelpers</code>对象，以此来将打包文件中的babel相关代码删除，所以一般情况下不需要使用<code>externalHelpers</code>这个属性。</p>
<p><strong>PS：</strong> 你也可以使用babel-preset-es2015-rollup这个包（搭配babel-core），它集成了babel-preset-es2015，babel-plugin-transform-es2015-modules-commonjs和babel-plugin-external-helpers三个模块，使用起来更加方便，只要将.babelrc文件修改成<code>{ "presets": ["es2015-rollup"] }</code>就可以使用了。</p>
<h2 id="articleHeader8">demo5 解析cjs，打包第三方模块</h2>
<p>有时候我们会引入一些其他模块的文件（第三方的或是自己编写的），但是这些第三方的模块为了能够直接使用，往往不是ES6模块而是用commonjs的模块方式编写的，这个时候我们需要将commonjs的模块转化为ES6模块，这样才能让rollup进行正确的解析。</p>
<ol><li>解析commonjs</li></ol>
<p>解析commonjs需要引入一个rollup插件——<code>rollup-plugin-commonjs</code></p>
<p>安装插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i rollup-plugin-commonjs --save-dev
// or
yarn add rollup-plugin-commonjs --dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>npm i rollup-plugin-commonjs <span class="hljs-comment">--save-dev</span><span class="hljs-comment">
// or</span>
yarn <span class="hljs-built_in">add</span> rollup-plugin-commonjs <span class="hljs-comment">--dev</span></code></pre>
<p>在配置文件中配置插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'index_cjs.js',
  format: 'iife',
  dest: './js/dist_cjs.js',
  plugins: [
    commonjs()
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="rollup.plugin.js"><span class="hljs-keyword">import</span> commonjs <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-commonjs'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  entry: <span class="hljs-string">'index_cjs.js'</span>,
  format: <span class="hljs-string">'iife'</span>,
  dest: <span class="hljs-string">'./js/dist_cjs.js'</span>,
  plugins: [
    commonjs()
  ]
}</code></pre>
<p>编写cjs模块的文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.logA = function logA() {
    console.log('function logA called')
}

exports.logB = function logB() {
    console.log('function logB called')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code class="lib.js">exports.logA = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logA</span><span class="hljs-params">()</span> {</span>
    console.<span class="hljs-built_in">log</span>('<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logA</span> <span class="hljs-title">called</span>')
}

<span class="hljs-title">exports</span>.<span class="hljs-title">logB</span> =</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logB</span><span class="hljs-params">()</span> {</span>
    console.<span class="hljs-built_in">log</span>('<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logB</span> <span class="hljs-title">called</span>')
}</span></code></pre>
<p>执行打包，可以看到打包成功，也没有输出任何提示信息</p>
<p><span class="img-wrap"><img data-src="/img/bVSKVi?w=525&amp;h=95" src="https://static.alili.tech/img/bVSKVi?w=525&amp;h=95" alt="rollup cjs打包" title="rollup cjs打包" style="cursor: pointer;"></span></p>
<ol><li>打包第三方模块</li></ol>
<p>在打包第三方模块的过程中，rollup无法直接解析npm模块，因此需要引入插件<code>rollup-plugin-node-resolve</code>并配合之前的commonjs插件来解析这些第三方模块</p>
<p>安装插件和第三方模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i rollup-plugin-node-resolve lodash --save-dev
// or
yarn add rollup-plugin-node-resolve lodash --dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>npm i rollup-plugin-<span class="hljs-keyword">node</span><span class="hljs-title">-resolve</span> lodash --save-dev
// <span class="hljs-keyword">or</span>
yarn add rollup-plugin-<span class="hljs-keyword">node</span><span class="hljs-title">-resolve</span> lodash --dev</code></pre>
<p>在配置文件中配置插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'index_module.js',
  format: 'iife',
  dest: './js/dist_module.js',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs()
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="rollup.plugin.js"><span class="hljs-keyword">import</span> commonjs <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-commonjs'</span>
<span class="hljs-keyword">import</span> resolve <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-node-resolve'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  entry: <span class="hljs-string">'index_module.js'</span>,
  format: <span class="hljs-string">'iife'</span>,
  dest: <span class="hljs-string">'./js/dist_module.js'</span>,
  plugins: [
    resolve({
      jsnext: <span class="hljs-literal">true</span>,
      main: <span class="hljs-literal">true</span>,
      browser: <span class="hljs-literal">true</span>
    }),
    commonjs()
  ]
}</code></pre>
<p>jsnext表示将原来的node模块转化成ES6模块，main和browser则决定了要将第三方模块内的哪些代码打包到最终文件中。</p>
<p>由于<a href="https://github.com/rollup/rollup-plugin-commonjs" rel="nofollow noreferrer" target="_blank">commonjs</a>和<a href="https://github.com/rollup/rollup-plugin-node-resolve" rel="nofollow noreferrer" target="_blank">node-resolve</a>中的配置属性很多，因此不一一解释，希望了解更多的同学可以去官方仓库查看说明。</p>
<p>编写入口文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import compact from 'lodash/compact'

const array = [0, 1, false, 2, '', 3]
const compctedArray = compact(array)
console.log(compctedArray)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="index_module.js"><span class="hljs-keyword">import</span> compact <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash/compact'</span>

<span class="hljs-keyword">const</span> array = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-literal">false</span>, <span class="hljs-number">2</span>, <span class="hljs-string">''</span>, <span class="hljs-number">3</span>]
<span class="hljs-keyword">const</span> compctedArray = compact(array)
<span class="hljs-built_in">console</span>.log(compctedArray)</code></pre>
<p>在这里我们只引用了lodash中的compact方法，那么在最终代码里，应该也只会添加compact方法的代码。</p>
<p>执行打包命令，查看打包出来的文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function () {
'use strict';

/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `&quot;&quot;`, `undefined`, and `NaN` are falsey.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.compact([0, 1, false, 2, '', 3]);
 * // => [1, 2, 3]
 */
function compact(array) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value) {
      result[resIndex++] = value;
    }
  }
  return result;
}

var compact_1$1 = compact;

const array = [0, 1, false, 2, '', 3];
const compctedArray = compact_1$1(array);
console.log(compctedArray);

}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code class="dist_module.js">(function () {
'use strict';

/**
 * Creates an<span class="hljs-built_in"> array </span>with all falsey values removed. The values `false`, `null`,
 * `0`, `<span class="hljs-string">""</span>`, `undefined`,<span class="hljs-built_in"> and </span>`NaN` are falsey.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array}<span class="hljs-built_in"> array </span>The<span class="hljs-built_in"> array </span>to compact.
 * @returns {Array} Returns the<span class="hljs-built_in"> new </span>array of filtered values.
 * @example
 *
 * _.compact([0, 1, false, 2, '', 3]);
 * // =&gt; [1, 2, 3]
 */
function compact(array) {
  var index = -1,
      length =<span class="hljs-built_in"> array </span>== null ? 0<span class="hljs-keyword"> :</span> array.length,
      resIndex = 0,
      result = [];

  while (++index &lt; length) {
    var value = array[index];
   <span class="hljs-built_in"> if </span>(value) {
      result[resIndex++] = value;
    }
  }
 <span class="hljs-built_in"> return </span>result;
}

var compact_1$1 = compact;
<span class="hljs-built_in">
const </span>array = [0, 1, false, 2, '', 3];<span class="hljs-built_in">
const </span>compctedArray = compact_1$1(array);
console.log(compctedArray);

}());</code></pre>
<p>确实只添加了compact方法的代码，而没有将lodash全部引入。</p>
<h2 id="articleHeader9">demo6 不要打包到一个文件，为rollup设置外部模块和全局变量</h2>
<p>在平时的开发中，我们经常会引入其他的模块，但是在使用的时候，我们又不想把它们打包到一个文件里，想让他们作为单独的模块（或文件）来使用，方便浏览器端进行缓存，这个时候就需要使用配置文件中的<code>external</code>属性了</p>
<p>我们<strong>在demo5的基础上</strong>，把jquery安装到第三方模块中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i jquery --save-dev
// or
yarn add jquery --dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>npm i jquery <span class="hljs-comment">--save-dev</span><span class="hljs-comment">
// or</span>
yarn <span class="hljs-built_in">add</span> jquery <span class="hljs-comment">--dev</span></code></pre>
<p>将配置文件改成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'index.js',
  format: 'iife',
  dest: './js/dist.js',
  external: ['jquery'],
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs()
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="rollup.config.js"><span class="hljs-keyword">import</span> commonjs <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-commonjs'</span>
<span class="hljs-keyword">import</span> resolve <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-node-resolve'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  entry: <span class="hljs-string">'index.js'</span>,
  format: <span class="hljs-string">'iife'</span>,
  dest: <span class="hljs-string">'./js/dist.js'</span>,
  external: [<span class="hljs-string">'jquery'</span>],
  plugins: [
    resolve({
      jsnext: <span class="hljs-literal">true</span>,
      main: <span class="hljs-literal">true</span>,
      browser: <span class="hljs-literal">true</span>
    }),
    commonjs()
  ]
}</code></pre>
<p>external用来表示一个模块是否要被当成外部模块使用，属性的值可以是一个字符串数组或一个方法，当传入的是一个字符串数组时，所有数组内的模块名称都会被当成是外部模块，不会被打包到最终文件中</p>
<p>当传入的是一个方法时，方法有一个参数id，表示解析的模块的名称，我们可以自定义解析方式，若是要当做外部模块不打包到最终文件中，则返回true，若要一起打包到最终文件中，则返回false</p>
<p>在这里我们把jquery当成一个外部模块，执行打包命令：</p>
<p><span class="img-wrap"><img data-src="/img/bVSKVx?w=723&amp;h=136" src="https://static.alili.tech/img/bVSKVx?w=723&amp;h=136" alt="rollup 添加外部模块" title="rollup 添加外部模块" style="cursor: pointer;"></span></p>
<p>检查打包出来的文件，我们发现lodash的compact方法依旧被打包进了最终文件中，但是jquery却没有被打包进去，而是以$的全局变量形式被传入到了立即执行函数中。</p>
<p>在这里rollup又给我们输出了一条提示信息，意思是我们没有在配置文件中给外部模块jquery设置全局变量名称，因此rollup自己猜测了一个名称$，当成是依赖的全局变量名。</p>
<p>如果直接使用全局的$的话，可能会因为变量$被其他引入的代码覆盖而报错，因此我们要将$替换为不容易冲突的jQuery变量，在配置文件中添加<code>globals</code>属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="globals: {
    jquery: 'jQuery'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="rollup.config.js"><span class="hljs-selector-tag">globals</span>: {
    <span class="hljs-attribute">jquery</span>: <span class="hljs-string">'jQuery'</span>
}</code></pre>
<p>globals的值是一个对象，key表示使用的模块名称（npm模块名），value表示在打包文件中引用的全局变量名，在这里我们就是把jquery模块的全局变量名设置为jQuery，重新打包</p>
<p>在重新打包出来的文件中，我们发现最后传入的参数已经由<code>$</code>变为了<code>jQuery</code>，而且rollup也没有输出提示信息。</p>
<h2 id="articleHeader10">demo7 打包node内置模块</h2>
<p>有时候我们想要在浏览器端使用node自带的一些内置模块，一般情况下会使用<code>browserify</code>这个工具来打包，但是browserify打包出来的文件实在太大，因此我们用rollup选择性地导入我们需要的node内置模块</p>
<p>安装插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i rollup-plugin-node-builtins --save-dev
// or
yarn add rollup-plugin-node-builtins --dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>npm i rollup-plugin-<span class="hljs-keyword">node</span><span class="hljs-title">-builtins</span> --save-dev
// <span class="hljs-keyword">or</span>
yarn add rollup-plugin-<span class="hljs-keyword">node</span><span class="hljs-title">-builtins</span> --dev</code></pre>
<p><strong>PS：</strong> node-builtins对不同的node内置模块支持不同，有些模块可能需要使用其他的插件（例如<a href="https://github.com/calvinmetcalf/rollup-plugin-node-globals" rel="nofollow noreferrer" target="_blank">rollup-plugin-node-globals</a>）才能正常打包，具体的支持情况可以查看node-builtins的<a href="https://github.com/calvinmetcalf/rollup-plugin-node-builtins" rel="nofollow noreferrer" target="_blank">官方仓库</a>。</p>
<p>编写配置文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import builtins from 'rollup-plugin-node-builtins'

export default {
  entry: 'index.js',
  format: 'iife',
  dest: './dist/dist.js',
  plugins: [
    builtins()
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> builtins <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-node-builtins'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  entry: <span class="hljs-string">'index.js'</span>,
  format: <span class="hljs-string">'iife'</span>,
  dest: <span class="hljs-string">'./dist/dist.js'</span>,
  plugins: [
    builtins()
  ]
}</code></pre>
<p>编写入口文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { join } from 'path'

const path_base = 'E://node'
const path_joined = join(path_basem, 'bin')
console.log(path_joined)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code class="index.js"><span class="hljs-keyword">import</span> { <span class="hljs-built_in">join</span> } from <span class="hljs-string">'path'</span>

<span class="hljs-keyword">const</span> path_base = <span class="hljs-string">'E://node'</span>
<span class="hljs-keyword">const</span> path_joined = <span class="hljs-built_in">join</span>(path_basem, <span class="hljs-string">'bin'</span>)
console.<span class="hljs-built_in">log</span>(path_joined)</code></pre>
<p>在这里我们使用node内置的path模块，运行打包命令，发现dist.js文件中引入了额外的100多行代码，这100多行代码就实现了path模块的join方法供我们使用。</p>
<p><strong>PS：</strong> 我建议，如果不是必要的情况，最好能够使用其他人编写的第三方实现库或自己造轮子实现，而不是使用node内置的模块，因为在引用某些模块时，node-builtins可能会引入过多的代码，这样会大大增加最后打包的文件的大小，使用他人的第三方库或自己的实现可控性更高</p>
<h2 id="articleHeader11">demo8 配合CDN来使用rollup</h2>
<p>有时候我们可能会使用CDN服务器上的js文件，但是又不想在本地安装一个相同的模块（也有可能没有对应的模块），可能在版本升级的时候会产生一些问题，这个时候我们就需要使用rollup的<code>paths</code>属性了，这个属性可以帮助你把依赖的代码文件地址注入到打包之后的文件里。</p>
<p>编写配置文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  entry: 'index.js',
  format: 'amd',
  dest: './dist/dist.js',
  external: ['jquery'],
  paths: {
    jquery: 'https://cdn.bootcss.com/jquery/3.2.1/jquery.js'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> {
  <span class="hljs-attribute">entry</span>: <span class="hljs-string">'index.js'</span>,
  <span class="hljs-attribute">format</span>: <span class="hljs-string">'amd'</span>,
  <span class="hljs-attribute">dest</span>: <span class="hljs-string">'./dist/dist.js'</span>,
  <span class="hljs-attribute">external</span>: [<span class="hljs-string">'jquery'</span>],
  <span class="hljs-attribute">paths</span>: {
    <span class="hljs-attribute">jquery</span>: <span class="hljs-string">'https://cdn.bootcss.com/jquery/3.2.1/jquery.js'</span>
  }
}</code></pre>
<p>在这里我们要使用cdn上的jquery文件，paths属性的值可以是一个对象或用法与<code>external</code>属性方法相似的方法（只是返回的不是boolean值而是文件的地址）。若使用对象来表示，则key值为需要引入的模块名称，value值为对应的文件地址</p>
<p>编写源文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import $ from 'jquery'

$('#p').html('rollup 使用paths属性配合CDN')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> $ <span class="hljs-keyword">from</span> <span class="hljs-string">'jquery'</span>

$(<span class="hljs-string">'#p'</span>).html(<span class="hljs-string">'rollup 使用paths属性配合CDN'</span>)</code></pre>
<p>执行打包命令，最后打包出来的文件内容是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(['https://cdn.bootcss.com/jquery/3.2.1/jquery.js'], function ($) { 'use strict';

$ = $ &amp;&amp; $.hasOwnProperty('default') ? $['default'] : $;

$('#p').html('rollup 使用paths属性配合CDN');

});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code class="dist.js">define([<span class="hljs-string">'https://cdn.bootcss.com/jquery/3.2.1/jquery.js'</span>], function (<span class="hljs-variable">$)</span> { <span class="hljs-string">'use strict'</span>;

<span class="hljs-variable">$ </span>= <span class="hljs-variable">$ </span>&amp;&amp; <span class="hljs-variable">$.</span>hasOwnProperty(<span class="hljs-string">'default'</span>) ? <span class="hljs-variable">$[</span><span class="hljs-string">'default'</span>] : <span class="hljs-variable">$;</span>

<span class="hljs-variable">$(</span><span class="hljs-string">'#p'</span>).html(<span class="hljs-string">'rollup 使用paths属性配合CDN'</span>);

});</code></pre>
<p>可以看到rollup已经把我们需要的CDN地址作为依赖加入到了打包文件中。</p>
<h2 id="articleHeader12">demo9 最小化你的代码</h2>
<p>代码发布时，我们经常会把自己的代码压缩到最小，以减少网络请求中的传输文件大小。</p>
<p>rollup的插件<code>rollup-plugin-uglify</code>就是来帮助你压缩代码的，我们接下来就用这个插件来压缩一下我们的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i rollup-plugin-uglify --save-dev
// or
yarn add rollup-plugin-uglify --dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>npm i rollup-plugin-uglify <span class="hljs-comment">--save-dev</span><span class="hljs-comment">
// or</span>
yarn <span class="hljs-built_in">add</span> rollup-plugin-uglify <span class="hljs-comment">--dev</span></code></pre>
<p>编写配置文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'index.js',
  format: 'iife',
  dest: './dist/dist.js',
  plugins: [
    uglify()
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="rollup.config.js"><span class="hljs-keyword">import</span> uglify <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-uglify'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  entry: <span class="hljs-string">'index.js'</span>,
  format: <span class="hljs-string">'iife'</span>,
  dest: <span class="hljs-string">'./dist/dist.js'</span>,
  plugins: [
    uglify()
  ]
}</code></pre>
<p>运行打包命令，查看dist.js文件，发现代码已经被压缩了</p>
<p>但是，压缩过的代码在debug时会带来很大的不便，因此我们需要在压缩代码的同时生成一个sourceMap文件</p>
<p>幸运的是，rollup自己就支持sourceMap文件的生成，不需要我们去引入其他插件，只需要在配置文件中加上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sourceMap: true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">sourceMap:</span> <span class="hljs-literal">true</span></code></pre>
<p>就可以了。</p>
<p>重新打包，我们发现不仅生成了dist.js.map文件，而且dist文件最后加上了一行<code>//# sourceMappingURL=dist.js.map</code>，并且在浏览器中可以正确加载源文件</p>
<p><span class="img-wrap"><img data-src="/img/bVSKVA?w=583&amp;h=244" src="https://static.alili.tech/img/bVSKVA?w=583&amp;h=244" alt="rollup sourceMap" title="rollup sourceMap" style="cursor: pointer;"></span></p>
<p><strong>PS：</strong> 若是将sourceMap属性的值设置为<code>inline</code>，则会将sourceMap的内容添加到打包文件的最后。</p>
<h2 id="articleHeader13">demo10 为你的代码添eslint检查</h2>
<p>在大型工程的团队开发中，我们需要保证团队代码风格的一致性，因此需要引入eslint，而且在打包时需要检测源文件是否符合eslint设置的规范，若是不符合则抛出异常并停止打包。在这里我们使用rollup的eslint插件<code>rollup-plugin-eslint</code>:</p>
<p>安装插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i eslint rollup-plugin-eslint --save-dev
// or
yarn add eslint rollup-plugin-eslint --dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>npm i eslint rollup-plugin-eslint <span class="hljs-comment">--save-dev</span><span class="hljs-comment">
// or</span>
yarn <span class="hljs-built_in">add</span> eslint rollup-plugin-eslint <span class="hljs-comment">--dev</span></code></pre>
<p>编写eslint配置文件<code>.eslintrc</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;env&quot;: {
        &quot;browser&quot;: true,
        &quot;commonjs&quot;: true,
        &quot;es6&quot;: true,
        &quot;node&quot;: true
    },
    &quot;parserOptions&quot;: {
        &quot;ecmaFeatures&quot;: {
            &quot;jsx&quot;: false
        },
        &quot;sourceType&quot;: &quot;module&quot;
    },
    &quot;rules&quot;: {
        &quot;semi&quot;: [&quot;error&quot;,&quot;never&quot;]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"env"</span>: {
        <span class="hljs-attr">"browser"</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">"commonjs"</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">"es6"</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">"node"</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-attr">"parserOptions"</span>: {
        <span class="hljs-attr">"ecmaFeatures"</span>: {
            <span class="hljs-attr">"jsx"</span>: <span class="hljs-literal">false</span>
        },
        <span class="hljs-attr">"sourceType"</span>: <span class="hljs-string">"module"</span>
    },
    <span class="hljs-attr">"rules"</span>: {
        <span class="hljs-attr">"semi"</span>: [<span class="hljs-string">"error"</span>,<span class="hljs-string">"never"</span>]
    }
}</code></pre>
<p>在这里我们强制要求不使用分号，然后在源文件中加上一个分号</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo(element);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code style="word-break: break-word; white-space: initial;">foo(<span class="hljs-name">element</span>)<span class="hljs-comment">;</span></code></pre>
<p>编写rollup配置文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import eslint from 'rollup-plugin-eslint';

export default {
  entry: './src/index.js',
  format: 'iife',
  dest: './dist/dist.js',
  plugins: [
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**']
    })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">import</span> eslint <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-eslint'</span>;

export <span class="hljs-keyword">default</span> {
  entry: <span class="hljs-string">'./src/index.js'</span>,
  format: <span class="hljs-string">'iife'</span>,
  dest: <span class="hljs-string">'./dist/dist.js'</span>,
  plugins: [
    eslint({
      throwOnError: <span class="hljs-keyword">true</span>,
      throwOnWarning: <span class="hljs-keyword">true</span>,
      <span class="hljs-keyword">include</span>: [<span class="hljs-string">'src/**'</span>],
      <span class="hljs-keyword">exclude</span>: [<span class="hljs-string">'node_modules/**'</span>]
    })
  ]
}</code></pre>
<p>eslint插件有两个属性需要说明：throwOnError和throwOnWarning设置为true时，如果在eslint的检查过程中发现了error或warning，就会抛出异常，阻止打包继续执行（如果设置为false，就只会输出eslint检测结果，而不会停止打包）</p>
<p>执行打包命令，发现eslint在输出了检查结果之后抛出了异常，而且dist.js文件也没有生成</p>
<p><span class="img-wrap"><img data-src="/img/bVSKV2?w=753&amp;h=443" src="https://static.alili.tech/img/bVSKV2?w=753&amp;h=443" alt="rollup eslint抛出异常" title="rollup eslint抛出异常" style="cursor: pointer;"></span></p>
<p>删除index.js文件中的分号，重新打包，发现打包成功</p>
<p><strong>进阶：</strong> 在平时的开发过程中，我们经常会使用IDE或编辑器的eslint插件，以便提早发现问题，但是有时候这些插件会去检查打包完的文件，导致你的提示框里一直会有eslint检测到错误的消息</p>
<p>我们现在有两种解决方案，一是创建一个<code>.eslintignore</code>文件，将打包文件加进去，让eslint忽略这个文件</p>
<p>还有一种就是让rollup在打包文件的开始和最后自动生成注释来阻止eslint检测代码，使用这种方法时，需要使用rollup配置文件的两个属性：banner和footer，这两个属性会在<strong>生成文件</strong>的开头和结尾插入一段你自定义的字符串。我们利用这个属性，在打包文件的开头添加<code>/*eslint-disable */</code>注释，让eslint不检测这个文件。</p>
<p>添加banner和footer属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="banner: '/*eslint-disable */'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">banner:</span> <span class="hljs-string">'/*eslint-disable */'</span></code></pre>
<p>重新打包，我们发现打包文件的开头被插入了这段注释字符串，而且eslint插件也不报dist.js文件的错了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*eslint-disable */
(function () {
'use strict';

// 具体代码

}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/*eslint-disable */</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">'use strict'</span>;

<span class="hljs-comment">// 具体代码</span>

}());</code></pre>
<h2 id="articleHeader14">demo11 控制开发环境和生产环境下的配置</h2>
<ol><li>配置文件的开发/生产环境配置</li></ol>
<p>有时候我们会需要区分开发环境和生产环境，针对不同的打包要求输出不同的打包配置，但是我们又不想写<code>rollup.config.dev.js</code>和<code>rollup.config.prod.js</code>两个文件，因为可能两者之间的区别只是一个uglify插件。</p>
<p>因此，我们就需要用变量来控制配置文件的输出内容，rollup命令行给我们提供了一个设置环境变量的参数<code>--environment</code>，在这个参数后面加上你需要设置的环境变量，不同变量间用逗号分隔，用冒号后面的字符串表示对应变量的值（若不加冒号，则默认将值设为字符串true）：</p>
<p>在package.json文件中编写对应的npm scripts命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;dev&quot;: &quot;rollup -c --environment NODE_ENV:development&quot;,
&quot;build&quot;: &quot;rollup -c --environment NODE_ENV:production&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">"dev"</span>: <span class="hljs-string">"rollup -c --environment NODE_ENV:development"</span>,
<span class="hljs-string">"build"</span>: <span class="hljs-string">"rollup -c --environment NODE_ENV:production"</span></code></pre>
<p>最后修改我们的rollup配置文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import uglify from 'rollup-plugin-uglify'

let isProd = process.env.NODE_ENV === 'production'

// 通用的插件
const basePlugins = []
// 开发环境需要使用的插件
const devPlugins = []
// 生产环境需要使用的插件
const prodPlugins = [uglify()]

let plugins = [...basePlugins].concat(isProd ? prodPlugins:devPlugins)
let destFilePath = isProd ? './dist/dist.min.js': './dist/dist.js'

export default {
  entry: 'index.js',
  format: 'iife',
  dest: destFilePath,
  sourceMap: isProd,
  plugins: plugins
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="rollup.config.js"><span class="hljs-keyword">import</span> uglify <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-uglify'</span>

<span class="hljs-keyword">let</span> isProd = process.env.NODE_ENV === <span class="hljs-string">'production'</span>

<span class="hljs-comment">// 通用的插件</span>
<span class="hljs-keyword">const</span> basePlugins = []
<span class="hljs-comment">// 开发环境需要使用的插件</span>
<span class="hljs-keyword">const</span> devPlugins = []
<span class="hljs-comment">// 生产环境需要使用的插件</span>
<span class="hljs-keyword">const</span> prodPlugins = [uglify()]

<span class="hljs-keyword">let</span> plugins = [...basePlugins].concat(isProd ? prodPlugins:devPlugins)
<span class="hljs-keyword">let</span> destFilePath = isProd ? <span class="hljs-string">'./dist/dist.min.js'</span>: <span class="hljs-string">'./dist/dist.js'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'index.js'</span>,
  <span class="hljs-attr">format</span>: <span class="hljs-string">'iife'</span>,
  <span class="hljs-attr">dest</span>: destFilePath,
  <span class="hljs-attr">sourceMap</span>: isProd,
  <span class="hljs-attr">plugins</span>: plugins
}</code></pre>
<p>我们分别运行两个npm scripts命令，查看打包的结果：</p>
<p><span class="img-wrap"><img data-src="/img/bVSKWa?w=245&amp;h=109" src="https://static.alili.tech/img/bVSKWa?w=245&amp;h=109" alt="rollup 开发环境和生产环境打包结果" title="rollup 开发环境和生产环境打包结果" style="cursor: pointer;"></span></p>
<ol><li>源文件开发/生产环境信息注入</li></ol>
<p>上面是在配置文件里通过变量来改变输出的配置类型，但是我们有时候需要将生产环境信息添加到源文件里，这个时候就需要使用rollup的配置属性intro和outro了</p>
<p>如果说banner和footer是在文件开始和结尾添加字符串，那么intro和outro就是在被打包的代码开头和结尾添加字符串了，以iife模式来举例，如果我们配置了这四个属性，那么输出结果就会是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// banner字符串
(function () {
'use strict';
// intro字符串

// 被打包的代码

// outro字符串
}());
// footer字符串" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// banner字符串</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">'use strict'</span>;
<span class="hljs-comment">// intro字符串</span>

<span class="hljs-comment">// 被打包的代码</span>

<span class="hljs-comment">// outro字符串</span>
}());
<span class="hljs-comment">// footer字符串</span></code></pre>
<p>这样的形式</p>
<p>下面我们实际使用一下，在index.js文件里加上一段需要依赖的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (DEVELOPMENT) {
    console.log('处于开发环境')
} else {
    console.log('处于生产环境')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code><span class="hljs-keyword">if</span> (DEVELOPMENT) {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'处于开发环境'</span>)
} <span class="hljs-keyword">else</span> {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'处于生产环境'</span>)
}</code></pre>
<p>然后在我们的rollup配置文件里添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="intro: 'var DEVELOPMENT = ' + !isProd," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang-repl"><code style="word-break: break-word; white-space: initial;">intro: <span class="hljs-string">'var DEVELOPMENT = '</span> + !isProd,</code></pre>
<p>这样，当我们最后生成的代码时，就会输出开发环境或生产环境的提示：</p>
<p><span class="img-wrap"><img data-src="/img/bVSKWm?w=497&amp;h=213" src="https://static.alili.tech/img/bVSKWm?w=497&amp;h=213" alt="rollup 开发环境和生产环境信息打包结果" title="rollup 开发环境和生产环境信息打包结果" style="cursor: pointer;"></span></p>
<ol><li>源文件开发/生产环境信息替换</li></ol>
<p>有时候我们会把开发/生产环境的信息直接写在源文件里面，这个时候用intro来注入代码的方式就不适合了。这个时候我们就需要使用<code>rollup-plugin-replace</code>插件来对源代码的变量值进行替换：</p>
<p>安装插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i rollup-plugin-replace --save-dev
// or
yarn add rollup-plugin-replace --dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm i rollup-plugin-<span class="hljs-keyword">replace</span> <span class="hljs-comment">--save-dev</span>
// <span class="hljs-keyword">or</span>
yarn <span class="hljs-keyword">add</span> <span class="hljs-keyword">rollup</span>-<span class="hljs-keyword">plugin</span>-<span class="hljs-keyword">replace</span> <span class="hljs-comment">--dev</span></code></pre>
<p>编写配置文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const basePlugins = [replace({
  DEVELOPMENT: !isProd
})]

// 将intro属性注释掉
// intro: 'var DEVELOPMENT = ' + !isProd," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code class="rollup.config.js"><span class="hljs-keyword">const</span> basePlugins = [<span class="hljs-keyword">replace</span>({
  DEVELOPMENT: !isProd
})]

<span class="hljs-comment">// 将intro属性注释掉</span>
<span class="hljs-comment">// intro: 'var DEVELOPMENT = ' + !isProd,</span></code></pre>
<p>这里我们使用replace插件，以key-value对象的形式，将<code>DEVELOPMENT</code>的值替换为<code>!isProd</code>的值</p>
<p>执行打包命令，并检查打包结果：</p>
<p><span class="img-wrap"><img data-src="/img/bVSKWr?w=591&amp;h=448" src="https://static.alili.tech/img/bVSKWr?w=591&amp;h=448" alt="rollup 开发环境和生产环境信息打包结果" title="rollup 开发环境和生产环境信息打包结果" style="cursor: pointer;"></span></p>
<p><strong>进阶：</strong> replace除了直接使用key-value的形式替换对应key同名变量的方法之外，还可以通过配置<code>delimiters</code>参数来实现模板功能：</p>
<p>配置replace插件参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="VERSION: '1.0.0',
delimiters: ['"{{"', '"}}"']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code class="rollup.config.js"><span class="hljs-string">VERSION:</span> <span class="hljs-string">'1.0.0'</span>,
<span class="hljs-string">delimiters:</span> [<span class="hljs-string">'"{{"'</span>, <span class="hljs-string">'"}}"'</span>]</code></pre>
<p>通过这个配置，在打包过程中，<code>"{{"VERSION"}}"</code>会被替换成<code>1.0.0</code></p>
<p>在index.js文件内添加相关代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var version = '"{{"VERSION"}}"'
console.log('版本 v' + version)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>var <span class="hljs-built_in">version</span> = <span class="hljs-string">'"{{"VERSION"}}"'</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'版本 v'</span> + <span class="hljs-built_in">version</span>)</code></pre>
<p>打包的结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var version = '1.0.0';
console.log('版本 v' + version);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> version = <span class="hljs-string">'1.0.0'</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'版本 v'</span> + version);</code></pre>
<h2 id="articleHeader15">demo12 使用rollup的API</h2>
<p>有时候我们会需要在打包的前后执行一些其他的代码，但是又不想引入其他构建工具（例如gulp），那么就可以使用rollup提供的node API来编写你自己的打包流程。</p>
<p>rollup模块只提供了一个rollup函数，这个函数的参数和我们编写配置文件时导出的参数不同，减少了很多配置属性，留下来的主要是一些输入相关的配置。（具体的配置属性可以查看rollup wiki的<a href="https://github.com/rollup/rollup/wiki/JavaScript-API" rel="nofollow noreferrer" target="_blank">javascript API</a>一节）</p>
<p>执行这个函数返回的是一个Promise，并且在then方法中提供一个bundle对象作为参数，这个对象保存了rollup对源文件编译一次之后的结果，而且提供了<code>generate</code>和<code>write</code>两个方法</p>
<p>write方法提供了编译并将打包结果输出到文件里的功能，返回的是一个没有参数的Promise，可以让你自定义接下来执行的代码</p>
<p>generate方法是只提供了编译的功能，返回一个Promise，这个Promise有一个对象参数，包含了code（编译完之后的代码）和map（分析出来的sourceMap对象）两个属性，一般用在插件开发中</p>
<p>write和gengerate方法都接受有编译相关属性的对象作为传入的编译参数，而write方法还额外接受<code>dset</code>属性作为导出文件的名称。</p>
<p>在这里我们只使用write方法来编写一个为所有模块类型打包，并输出打包完毕提示的文件，至于generate的使用方法我们会放在编写插件一节中介绍。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const rollup = require('rollup').rollup

rollup({
    entry: 'index.js'
}).then(bundle => {

    // 保存所有Promise的列表
    let writePromiseList = []
    // 声明所有需要打包的模块类型
    let moduleTypesList = ['es','cjs','amd','umd','iife']

    moduleTypesList.forEach(function(moduleType) {
        writePromiseList.push(bundle.write({
            dest: './dist/dist.' + moduleType + '.js',
            format: moduleType,
            sourceMap: true
        }))
    })

    return Promise.all(writePromiseList)

}).then(() => {
    console.log('全部模块格式打包完毕')
    // 其他代码
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="rollup.js"><span class="hljs-keyword">const</span> rollup = <span class="hljs-built_in">require</span>(<span class="hljs-string">'rollup'</span>).rollup

rollup({
    <span class="hljs-attr">entry</span>: <span class="hljs-string">'index.js'</span>
}).then(<span class="hljs-function"><span class="hljs-params">bundle</span> =&gt;</span> {

    <span class="hljs-comment">// 保存所有Promise的列表</span>
    <span class="hljs-keyword">let</span> writePromiseList = []
    <span class="hljs-comment">// 声明所有需要打包的模块类型</span>
    <span class="hljs-keyword">let</span> moduleTypesList = [<span class="hljs-string">'es'</span>,<span class="hljs-string">'cjs'</span>,<span class="hljs-string">'amd'</span>,<span class="hljs-string">'umd'</span>,<span class="hljs-string">'iife'</span>]

    moduleTypesList.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">moduleType</span>) </span>{
        writePromiseList.push(bundle.write({
            <span class="hljs-attr">dest</span>: <span class="hljs-string">'./dist/dist.'</span> + moduleType + <span class="hljs-string">'.js'</span>,
            <span class="hljs-attr">format</span>: moduleType,
            <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span>
        }))
    })

    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.all(writePromiseList)

}).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'全部模块格式打包完毕'</span>)
    <span class="hljs-comment">// 其他代码</span>
})</code></pre>
<p>将package.json文件内的npm scripts命令修改为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;build&quot;: &quot;node rollup.js&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">"build"</span>: <span class="hljs-string">"node rollup.js"</span></code></pre>
<p>执行打包命令，查看打包结果</p>
<p><span class="img-wrap"><img data-src="/img/bVSKWD?w=557&amp;h=123" src="https://static.alili.tech/img/bVSKWD?w=557&amp;h=123" alt="rollup 自定义打包结果1" title="rollup 自定义打包结果1" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVSKWN?w=268&amp;h=262" src="https://static.alili.tech/img/bVSKWN?w=268&amp;h=262" alt="rollup 自定义打包结果2" title="rollup 自定义打包结果2" style="cursor: pointer; display: inline;"></span></p>
<p>在这里我们可以看到，一个bundle可以被重复使用多次，因此我们可以用Promise.all方法来等待所有模块打包完成后再输出打包完毕的提示。</p>
<h2 id="articleHeader16">demo13 除了打包JS，我们还能……</h2>
<p>一个web项目内肯定不会只有js文件，还有css、html（也可能是模板文件）和其他类型的文件，那么我们在打包的时候能不能把这些文件一起打包呢？</p>
<p>我们需要区分一下，在这里的打包有两种意思，一种是让这些文件可以像JS文件一样，在源代码中被import并使用；还有一种是通过在源文件中import这些文件，最后将它们合并到一起并导出到一个最终文件内。</p>
<p>不同的rollup插件有不同的效果，在使用的时候一定要查看插件的相关说明</p>
<p>安装插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i rollup-plugin-scss --save-dev
// or
yarn add rollup-plugin-scss --dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>npm i rollup-plugin-scss <span class="hljs-comment">--save-dev</span><span class="hljs-comment">
// or</span>
yarn <span class="hljs-built_in">add</span> rollup-plugin-scss <span class="hljs-comment">--dev</span></code></pre>
<p>编写配置文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import scss from 'rollup-plugin-scss'

export default {
  entry: './src/js/index.js',
  format: 'iife',
  dest: './dist/js/dist.js',
  sourceMap: true,
  plugins: [
    scss({
      output: './dist/css/style.css'
    })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="rollup.config.js"><span class="hljs-keyword">import</span> scss <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-scss'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  entry: <span class="hljs-string">'./src/js/index.js'</span>,
  format: <span class="hljs-string">'iife'</span>,
  dest: <span class="hljs-string">'./dist/js/dist.js'</span>,
  sourceMap: <span class="hljs-literal">true</span>,
  plugins: [
    scss({
      output: <span class="hljs-string">'./dist/css/style.css'</span>
    })
  ]
}</code></pre>
<p>在这里我们尝试编译和打包scss文件，将其合并成一个style.css文件，并输出到dist/css目录下</p>
<p>编写scss文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$blue: #69c4eb;

.bg-blue {
    background-color: $blue
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code class="bg.scss">$<span class="hljs-built_in">blue</span>: #<span class="hljs-number">69</span>c4eb;

.bg-<span class="hljs-built_in">blue</span> {
    <span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>: $<span class="hljs-built_in">blue</span>
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$white: #fff;

.text-white {
    color: $white;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code class="text.scss"><span class="hljs-variable">$white</span>: <span class="hljs-number">#fff</span>;

<span class="hljs-selector-class">.text-white</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-variable">$white</span>;
}</code></pre>
<p>然后在源文件中引用这两个scss文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import '../scss/text.scss'
import '../scss/bg.scss'

var html = `
    <div class=&quot;bg-blue&quot;>
        <p class=&quot;text-white&quot;>测试文字</p>
    </div>
`

document.body.innerHTML = html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="index.js">import <span class="hljs-string">'../scss/text.scss'</span>
import <span class="hljs-string">'../scss/bg.scss'</span>

<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">html</span> = `
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"bg-blue"</span>&gt;
        &lt;<span class="hljs-selector-tag">p</span> class=<span class="hljs-string">"text-white"</span>&gt;测试文字&lt;/p&gt;
    &lt;/div&gt;
`

document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.innerHTML</span> = html</code></pre>
<p>执行打包命令，查看效果</p>
<p><span class="img-wrap"><img data-src="/img/bVSKWY?w=259&amp;h=125" src="https://static.alili.tech/img/bVSKWY?w=259&amp;h=125" alt="rollup 打包scss效果" title="rollup 打包scss效果" style="cursor: pointer;"></span></p>
<h2 id="articleHeader17">extra 编写你自己的rollup插件</h2>
<p>有时候我们可能需要自己编写rollup插件来实现需求，rollup官方在wiki上提供了关于<a href="https://github.com/rollup/rollup/wiki/Plugins#creating-plugins" rel="nofollow noreferrer" target="_blank">编写插件的一些介绍</a>，下面我们就根据这些介绍来写一个自己的rollup插件。</p>
<p>我们在这里仿照scss插件编写一个stylus的rollup插件，让使用者可以import stylus文件，并编译打包导出到指定的目录下（为了节省代码量，只写了输出到指定路径的功能代码，其他的功能可以参考<a href="https://github.com/thgh/rollup-plugin-scss" rel="nofollow noreferrer" target="_blank">scss插件</a>的具体代码）。</p>
<p>首先创建项目，在package.json文件中，除了一般信息之外，还要加上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;main&quot;: &quot;index.cjs.js&quot;,
&quot;module&quot;: &quot;index.es.js&quot;,
&quot;jsnext:main&quot;: &quot;index.es.js&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="package.json">"<span class="hljs-selector-tag">main</span>": "<span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.cjs</span><span class="hljs-selector-class">.js</span>",
"<span class="hljs-selector-tag">module</span>": "<span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.es</span><span class="hljs-selector-class">.js</span>",
"<span class="hljs-selector-tag">jsnext</span><span class="hljs-selector-pseudo">:main"</span>: "<span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.es</span><span class="hljs-selector-class">.js</span>"</code></pre>
<p>这些信息用来区分使用不同模块规范时使用的文件</p>
<p>安装我们需要用到的模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i rollup rollup-plugin-babel babel-preset-es2015-rollup babel-core --save-dev
npm i rollup-pluginutils stylus --save
// or
yarn add rollup rollup-plugin-babel babel-preset-es2015-rollup babel-core --dev
yarn add rollup-pluginutils stylus" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">npm</span> i rollup rollup-plugin-<span class="hljs-keyword">babel </span><span class="hljs-keyword">babel-preset-es2015-rollup </span><span class="hljs-keyword">babel-core </span>--save-dev
<span class="hljs-symbol">npm</span> i rollup-pluginutils stylus --save
// or
<span class="hljs-symbol">yarn</span> <span class="hljs-keyword">add </span>rollup rollup-plugin-<span class="hljs-keyword">babel </span><span class="hljs-keyword">babel-preset-es2015-rollup </span><span class="hljs-keyword">babel-core </span>--dev
<span class="hljs-symbol">yarn</span> <span class="hljs-keyword">add </span>rollup-pluginutils stylus</code></pre>
<p>rollup-pluginutils和stylus是我们运行时需要的两个模块，stylus用来解析stylus文件，<a href="https://github.com/rollup/rollup-pluginutils" rel="nofollow noreferrer" target="_blank">pluginutils</a>则提供给了我们一些编写插件常用的函数</p>
<p>编写rollup配置文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import babel from 'rollup-plugin-babel'

export default {
    entry: './index.es.js',
    dest: './index.cjs.js',
    format: 'cjs',
    plugins: [
        babel()
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="rollup.config.js"><span class="hljs-keyword">import</span> babel <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-babel'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    entry: <span class="hljs-string">'./index.es.js'</span>,
    dest: <span class="hljs-string">'./index.cjs.js'</span>,
    format: <span class="hljs-string">'cjs'</span>,
    plugins: [
        babel()
    ]
}</code></pre>
<p>rollup插件需要一个含有指定属性的对象作为插件内容，rollup官方建议我们在编写插件的时候，export一个返回值为插件对象的函数，这样可以方便使用者指定插件的参数。</p>
<p>rollup会将解析的部分结果作为参数调用插件返回的对象中的一些函数属性，这些函数会在合适的时候被rollup调用（相当于rollup在执行各个操作时的钩子函数），下面我们介绍一些常用的属性：</p>
<ul>
<li>name：插件的名称，提供给rollup进行相关信息的输出</li>
<li>load：不指定这个属性时，解析模块会默认去读取对应路径文件的内容；而当该值为函数（id =&gt; code）时，可以将函数最后的返回值作为文件的内容提供给rollup（可以用来生成自定义格式的代码）</li>
<li>resolveId：一个（ (importee, importer) =&gt; id）形式的函数，用来解析ES6的import语句，最后需要返回一个模块的id</li>
<li>transform：最常使用的属性，是一个函数，当rollup解析一个import时，会获取到对应路径文件的内容，并将内容和模块的名称作为参数提供给我们；这个函数执行完毕之后，需要返回一个作为代码的字符串或是类似<code>{ code, map }</code>结构的对象，用来表示解析完之后该模块的实际内容，map指的是sourceMap，而如果我们没有要导出的sourceMap，就可以将返回的map值设为<code>{mappings: ''}</code>
</li>
<li>ongenerate：当我们或rollup调用generate方法时，会被调用的一个钩子函数，接受generate的option作为参数</li>
<li>onwrite：和ongenerate一样，调用write方法时，会被调用的一个钩子函数，接受write的option作为参数</li>
</ul>
<p>一般情况下，我们通过transform函数来获取文件的id和内容，并对内容做一些处理，若需要输出文件则使用ongenerate或onwrite在rollup打包的最后阶段来做相应的输出。</p>
<p>load和resolveId在一般情况下不会使用，除非你有特殊的需求（例如对路径、模块id进行修改等)</p>
<p>根据上面这些内容，我们编写具体的插件内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createFilter } from 'rollup-pluginutils'
import fs from 'fs'
import path from 'path'
import stylus from 'stylus'

// 递归创建文件夹
function mkdirs(dir) {
    return new Promise((resolve, reject) => {
        fs.exists(dir, (exist) => {
            if (exist) {
                resolve()
            } else {
                mkdirs(path.dirname(dir)).then(() => {
                    fs.mkdir(dir, (err) => {
                        if (err) {
                            reject()
                        } else {
                            resolve()
                        }
                    })
                })
            }
        })
    })
}

// 导出一个function
export default function stylusPlugin(options = {}) {
    // 创建一个文件过滤器，过滤以css，styl结尾的文件
    const stylusFilter = createFilter(options.include || ['**/*.css', '**/*.styl'], options.exclude)

    // dest用来保存指定的输出路径
    let dest = options.output,
    // styleNodes用来暂存不同文件的css代码
        styleNodes = {}

    // 编译stylus文件
    function complier(str, stylusOpt) {
        return new Promise((resolve, reject) => {
            stylus.render(str, stylusOpt, (err, css) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(css)
                }
            })
        })
    }

    return {
        // 插件名称
        name: 'rollup-plugin-stylus',

        // 解析import时调用，获取文件名称和具体代码，将它们保存起来
        transform (code, id) {
            if (!stylusFilter(id)) {
                return
            }

            styleNodes[id] = code
            return ''
        },
        // generate时调用，用stylus解析代码，并输出到指定目录中
        async ongenerate (genOpt) {
            let css = ''
            for (let id in styleNodes) {
                // 合并所有css代码
                css += styleNodes[id] || ''
            }

            // 编译stylus代码
            if (css.length) {
                try {
                    css = await complier(css, Object.assign({}, options.stylusOpt))
                } catch (error) {
                    console.log(error)
                }
            }

            // 没有指定输出文件路径时，设置一个默认文件
            if (typeof dest !== 'string') {
                if (!css.length) {
                    return
                }

                dest = genOpt.dest || 'bundle.js'
                if (dest.endsWith('.js')) {
                    dest = dest.slice(0, -3)
                }
                dest = dest + '.css'
            }

            // 创建目录，并将css写入到结果文件内
            await mkdirs(path.dirname(dest))
            return new Promise((resolve, reject) => {
                fs.writeFile(dest, css, (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                })
            })
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> { createFilter } <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-pluginutils'</span>
<span class="hljs-keyword">import</span> fs <span class="hljs-keyword">from</span> <span class="hljs-string">'fs'</span>
<span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">'path'</span>
<span class="hljs-keyword">import</span> stylus <span class="hljs-keyword">from</span> <span class="hljs-string">'stylus'</span>

<span class="hljs-comment">// 递归创建文件夹</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mkdirs</span>(<span class="hljs-params">dir</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        fs.exists(dir, <span class="hljs-function">(<span class="hljs-params">exist</span>) =&gt;</span> {
            <span class="hljs-keyword">if</span> (exist) {
                resolve()
            } <span class="hljs-keyword">else</span> {
                mkdirs(path.dirname(dir)).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                    fs.mkdir(dir, <span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
                        <span class="hljs-keyword">if</span> (err) {
                            reject()
                        } <span class="hljs-keyword">else</span> {
                            resolve()
                        }
                    })
                })
            }
        })
    })
}

<span class="hljs-comment">// 导出一个function</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stylusPlugin</span>(<span class="hljs-params">options = {}</span>) </span>{
    <span class="hljs-comment">// 创建一个文件过滤器，过滤以css，styl结尾的文件</span>
    <span class="hljs-keyword">const</span> stylusFilter = createFilter(options.include || [<span class="hljs-string">'**/*.css'</span>, <span class="hljs-string">'**/*.styl'</span>], options.exclude)

    <span class="hljs-comment">// dest用来保存指定的输出路径</span>
    <span class="hljs-keyword">let</span> dest = options.output,
    <span class="hljs-comment">// styleNodes用来暂存不同文件的css代码</span>
        styleNodes = {}

    <span class="hljs-comment">// 编译stylus文件</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">complier</span>(<span class="hljs-params">str, stylusOpt</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
            stylus.render(str, stylusOpt, <span class="hljs-function">(<span class="hljs-params">err, css</span>) =&gt;</span> {
                <span class="hljs-keyword">if</span> (err) {
                    reject(err)
                } <span class="hljs-keyword">else</span> {
                    resolve(css)
                }
            })
        })
    }

    <span class="hljs-keyword">return</span> {
        <span class="hljs-comment">// 插件名称</span>
        name: <span class="hljs-string">'rollup-plugin-stylus'</span>,

        <span class="hljs-comment">// 解析import时调用，获取文件名称和具体代码，将它们保存起来</span>
        transform (code, id) {
            <span class="hljs-keyword">if</span> (!stylusFilter(id)) {
                <span class="hljs-keyword">return</span>
            }

            styleNodes[id] = code
            <span class="hljs-keyword">return</span> <span class="hljs-string">''</span>
        },
        <span class="hljs-comment">// generate时调用，用stylus解析代码，并输出到指定目录中</span>
        <span class="hljs-keyword">async</span> ongenerate (genOpt) {
            <span class="hljs-keyword">let</span> css = <span class="hljs-string">''</span>
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> id <span class="hljs-keyword">in</span> styleNodes) {
                <span class="hljs-comment">// 合并所有css代码</span>
                css += styleNodes[id] || <span class="hljs-string">''</span>
            }

            <span class="hljs-comment">// 编译stylus代码</span>
            <span class="hljs-keyword">if</span> (css.length) {
                <span class="hljs-keyword">try</span> {
                    css = <span class="hljs-keyword">await</span> complier(css, <span class="hljs-built_in">Object</span>.assign({}, options.stylusOpt))
                } <span class="hljs-keyword">catch</span> (error) {
                    <span class="hljs-built_in">console</span>.log(error)
                }
            }

            <span class="hljs-comment">// 没有指定输出文件路径时，设置一个默认文件</span>
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> dest !== <span class="hljs-string">'string'</span>) {
                <span class="hljs-keyword">if</span> (!css.length) {
                    <span class="hljs-keyword">return</span>
                }

                dest = genOpt.dest || <span class="hljs-string">'bundle.js'</span>
                <span class="hljs-keyword">if</span> (dest.endsWith(<span class="hljs-string">'.js'</span>)) {
                    dest = dest.slice(<span class="hljs-number">0</span>, <span class="hljs-number">-3</span>)
                }
                dest = dest + <span class="hljs-string">'.css'</span>
            }

            <span class="hljs-comment">// 创建目录，并将css写入到结果文件内</span>
            <span class="hljs-keyword">await</span> mkdirs(path.dirname(dest))
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
                fs.writeFile(dest, css, <span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
                    <span class="hljs-keyword">if</span> (err) {
                        reject(err)
                    } <span class="hljs-keyword">else</span> {
                        resolve()
                    }
                })
            })
        }
    }
}</code></pre>
<p>这样，一个解析并打包stylus文件的rollup插件就写好了，你可以在你的工程中引用这个文件，也可以将其作为一个模块发布，以便于分享给其他人使用。</p>
<h2 id="articleHeader18">总结 and 一个完整的rollup项目的模板</h2>
<p>rollup在打包JS上是一个十分快捷方便的工具，但和webpack相比，他的生态圈还是不够强大，对于大型web工程的适应度相对不足</p>
<p>rollup的优点在于方便的配置，天然的ES6模块支持让我们可以直接使用import和export语法，在打包JS上，不实现自己的模块机制，而是使用目前常见的模块规范有助于其他工具（例如requirejs）来引用打包文件；tree-shaking的特性也有助于减少代码量，因此我认为rollup比起构建应用工程项目，更适合用来构建一个JS库或node模块</p>
<p>我将上面介绍的插件集合到一起，添加了测试的支持，制作了一个较为完整的rollup工程模板。放在<code>rollup-project-template</code>目录下，需要的同学可以自取（你也可以增加或删除任意你需要的模块，来组建属于你自己的rollup项目模板）</p>
<h2 id="articleHeader19">参考资料</h2>
<ul>
<li><a href="https://github.com/rollup/rollup/wiki" rel="nofollow noreferrer" target="_blank">rollup官方wiki</a></li>
<li><a href="https://github.com/rollup/rollup/wiki/Plugins" rel="nofollow noreferrer" target="_blank">rollup插件合集</a></li>
<li><a href="https://zhuanlan.zhihu.com/p/28096758" rel="nofollow noreferrer" target="_blank">如何通过 Rollup.js 打包 JavaScript —— 知乎专栏</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS打包工具rollup——完全入门指南

## 原文链接
[https://segmentfault.com/a/1190000010628352](https://segmentfault.com/a/1190000010628352)

