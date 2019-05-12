---
title: '如何实现一个脚手架进阶版（Vue-cli v2.9学习篇）' 
date: 2018-12-15 2:30:11
hidden: true
slug: 6evszfrp1g
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>在之前一篇博客介绍了关于Node脚手架的一些基础的知识，这篇博客是在之前的基础上针对在Node中开发脚手架中遇到的问题，如：</p>
<ul>
<li>终端样式、交互问题</li>
<li>文件处理问题</li>
</ul>
<p>通过对Vue-cli 2.9.2的源码进行分析，解决相关问题。</p>
<p>如果没有看过之前一篇博客的，或者对Node.js的脚手架没有了解过的同学，推荐先看上一篇：<a href="https://segmentfault.com/a/1190000012262311">如何实现一个简单的Node.js脚手架</a>。</p>
<h1 id="articleHeader1">正文</h1>
<h2 id="articleHeader2">终端</h2>
<h3 id="articleHeader3">怎么自定义终端的样式</h3>
<p><a href="https://github.com/chalk/chalk" rel="nofollow noreferrer" target="_blank">chalk</a>是一个日志的样式库，可以在终端上面调整日志的样式。</p>
<p>以下的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const chalk = require('chalk');

console.log(chalk.red('hello world'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chalk'</span>);

<span class="hljs-built_in">console</span>.log(chalk.red(<span class="hljs-string">'hello world'</span>));</code></pre>
<p>转换为具体样式为：</p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2Oxf" src="https://static.alili.techhttps://segmentfault.com/img/bV2Oxf" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>通过说明文档，我们可以知道，chalk可以支持文字颜色和背景颜色。</p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2Otc" src="https://static.alili.techhttps://segmentfault.com/img/bV2Otc" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">怎么实现终端中的Loading图</h3>
<p><a href="https://github.com/sindresorhus/ora" rel="nofollow noreferrer" target="_blank">ora</a>可以在终端实现Loading的效果，可以在与用户进行交互后使用。</p>
<p>从官网的实例来看，我们可以实现以下的效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013091104" src="https://static.alili.tech/img/remote/1460000013091104" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">怎么在终端中和用户进行交互</h3>
<p>在终端中和用户进行交互，获取用户输入是一个很常见的需求。</p>
<p><a href="https://github.com/SBoudrias/Inquirer.js" rel="nofollow noreferrer" target="_blank">Inquirer</a>这个库能够通过终端让我们和用户进行一些交互，比如下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var inquirer = require('inquirer');
inquirer.prompt([{type: 'confirm', name: 'OK', message: 'Are you OK?', default: false}]).then(answers => {
    console.log(answers);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> inquirer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'inquirer'</span>);
inquirer.prompt([{<span class="hljs-attr">type</span>: <span class="hljs-string">'confirm'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'OK'</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">'Are you OK?'</span>, <span class="hljs-attr">default</span>: <span class="hljs-literal">false</span>}]).then(<span class="hljs-function"><span class="hljs-params">answers</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(answers);
});</code></pre>
<p>得到的结果内容为：</p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2OIi" src="https://static.alili.techhttps://segmentfault.com/img/bV2OIi" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">文件相关</h2>
<h3 id="articleHeader7">怎么能够方便下载有目录结构的模板文件</h3>
<p>最常见的文件模板下载，都是通过将文件上传到CDN中，然后再通过某个特定的格式下载到页面上。</p>
<p>但是，如果你想要通过比较优雅的方式来进行文件下载，可以通过<a href="https://github.com/flipxfx/download-git-repo" rel="nofollow noreferrer" target="_blank">download-git-repo</a>来下载你再Git上面已经准备好的模板，这样就能够在下载的过程中保证文件目录和顺序，比之前自己创建和检测文件夹会简便很多。</p>
<h3 id="articleHeader8">怎么对下载的文件进行处理</h3>
<p>当你提供的模板不仅仅是一个纯粹的文件，而是可以通过某些参数进行编译，得到不同的目标文件时，你可以通过<a href="https://github.com/segmentio/metalsmith" rel="nofollow noreferrer" target="_blank">metalsmith</a>来对文件进行操作。</p>
<p>它是一个用来构建静态网站的类库，也能够用来对文件进行处理。</p>
<p>你可以通过编写一些处理的回调函数来对你的模板文件进行处理。</p>
<h3 id="articleHeader9">怎么编译模板语言</h3>
<p>如果你想要一套现成的模板编译工具，可以使用现成的如<a href="https://github.com/daaain/Handlebars" rel="nofollow noreferrer" target="_blank">Handlebars</a>。</p>
<p>他能够像后端模板语言一样，直接针对类HTML文件进行处理，我们可以看下官方的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;entry&quot;>
  <h1>"{{"title"}}"</h1>
  <div class=&quot;body&quot;>
    "{{"body"}}"
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"entry"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>"{{"title"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"body"</span>&gt;</span>
    "{{"body"}}"
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>针对上述模板，在编译时填入<code>title</code>和<code>body</code>两个字段，即可得到完整的HTML片段。</p>
<p>在<code>Vue-cli</code>中，使用了模板引擎合并库<a href="https://github.com/tj/consolidate.js/" rel="nofollow noreferrer" target="_blank">consolidate.js</a>,通过这个库的<code>render</code>方法来编写metalsmith的处理函数，从而在渲染的过程中对模板进行处理，具体代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.handlebars.render = function(str, options, fn) {
  return promisify(fn, function(fn) {
    var engine = requires.handlebars || (requires.handlebars = require('handlebars'));
    try {
      for (var partial in options.partials) {
        engine.registerPartial(partial, options.partials[partial]);
      }
      for (var helper in options.helpers) {
        engine.registerHelper(helper, options.helpers[helper]);
      }
      var tmpl = cache(options) || cache(options, engine.compile(str, options));
      fn(null, tmpl(options));
    } catch (err) {
      fn(err);
    }
  });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">exports.handlebars.render = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">str, options, fn</span>) </span>{
  <span class="hljs-keyword">return</span> promisify(fn, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">var</span> engine = requires.handlebars || (requires.handlebars = <span class="hljs-built_in">require</span>(<span class="hljs-string">'handlebars'</span>));
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> partial <span class="hljs-keyword">in</span> options.partials) {
        engine.registerPartial(partial, options.partials[partial]);
      }
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> helper <span class="hljs-keyword">in</span> options.helpers) {
        engine.registerHelper(helper, options.helpers[helper]);
      }
      <span class="hljs-keyword">var</span> tmpl = cache(options) || cache(options, engine.compile(str, options));
      fn(<span class="hljs-literal">null</span>, tmpl(options));
    } <span class="hljs-keyword">catch</span> (err) {
      fn(err);
    }
  });
};</code></pre>
<p>因此，他可以利用已经安装好的handlebar模板引擎来注册helper，从而进行模板的处理。</p>
<h1 id="articleHeader10">总结</h1>
<p>通过对<code>Vue-cli</code>源码的简单学习，我们可以发现在日常中需要处理的与用户交互、文件处理编译等需求也有了一个比较好的解决方案。</p>
<p>当然，上面提供的方案不是唯一的，仅提供给大家进行一个参考和快速实现。大家也可以通过一些其他的方法来实现相同的功能。</p>
<p>有任何问题欢迎进行交流。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何实现一个脚手架进阶版（Vue-cli v2.9学习篇）

## 原文链接
[https://segmentfault.com/a/1190000013091099](https://segmentfault.com/a/1190000013091099)

