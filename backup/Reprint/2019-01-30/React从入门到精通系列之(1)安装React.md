---
title: 'React从入门到精通系列之(1)安装React' 
date: 2019-01-30 2:30:22
hidden: true
slug: gy5kh8cvrue
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、安装React</h2>
<p>React是灵活的，可以在各种类型的项目中使用。 你可以使用它创建一个全新的应用程序，也可以逐步将其引入现有的项目中，而不需要重写整个项目。</p>
<h3 id="articleHeader1">创建一个单页面应用</h3>
<p><code>Create React App</code>是开始构建新的React单页应用程序的最佳方式。 它可以帮助您快速集成您的开发环境，以便您可以使用最新的JavaScript功能，它提供了一个很好的开发体验，并可以有效优化您的应用程序,提升开发效率。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install -g create-react-app
$ create-react-app hello-world
$ cd hello-world
$ npm run start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ npm install -g create-react-app
$ create-react-app hello-world
$ <span class="hljs-built_in">cd</span> hello-world
$ npm run start</code></pre>
<p>上面只是创建了一个React应用，不需要关心也需要不处理后端逻辑或数据库; <br>它只是一个React的前端环境集成工具,负责创建前端的开发环境，所以你可以使用它与你想要的任何后端进行交互。 它内部使用了webpack，Babel和ESLint，你可以单独配置它们，来达到定制化的效果。</p>
<h3 id="articleHeader2">在已经开发的项目中使用React</h3>
<p>您不需要重新编写应用程序即可开始使用React。<br>我们建议将React添加到应用程序的一小部分，例如单个小部件，以便您可以看到它是否适合您的用例。<br>虽然React可以在没有构建工具的情况下使用，但我们建议使用并设置它，以便提高生产力。 现代构建工具通常包括：</p>
<ul>
<li><p>一个包管理器，例如<code>npm</code></p></li>
<li><p>一个打包工具，例如<code>webpack</code></p></li>
<li><p>一个编译工具，例如<code>Babel</code></p></li>
</ul>
<h3 id="articleHeader3">安装React</h3>
<p>我们建议使用Yarn或npm来管理React前端模块的依赖。</p>
<p>通过Yarn安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add react react-dom" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">yarn add react react-dom</code></pre>
<p>通过npm安卓：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save react react-dom" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install --save react react-dom</code></pre>
<h3 id="articleHeader4">使用ES6和JSX</h3>
<p>我们建议您使用Babel中的React配置让您在JavaScript代码中可以使用ES6和JSX。 ES6是一组现代JavaScript特性，使开发更容易，JSX是对React非常有效的JavaScript语言的扩展。</p>
<p>具体请百度Babel如何在许多不同的构建环境中配置Babel。首先 确保你安装了<code>babel-preset-react</code>和<code>babel-preset-es2015</code>，并已经在<code>.babelrc</code>配置中启用它们。</p>
<h3 id="articleHeader5">使用ES6和JSX写一个HelloWorld的例子</h3>
<p>我们建议使用像<code>webpack</code>或<code>Browserify</code>这样的打包工具，以便您可以编写模块化代码，它们可以将不同的代码模块打包捆绑到一起，用来优化的代码加载时间。</p>
<p>一个简单的React示例如下所示：</p>
<p>这里我使用的是bower来安装react和react-dom。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir hello-world &amp; cd hello-world
bower install react babel --save
touch index.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">mkdir hello-world &amp; <span class="hljs-built_in">cd</span> hello-world
bower install react babel --save
touch index.html</code></pre>
<p>然后在index.html中写入以下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <script src=&quot;bower_components/react/react.js&quot;></script>
    <script src=&quot;bower_components/react/react-dom.js&quot;></script>
    <script src=&quot;bower_components/babel/browser.js&quot;></script>
    <script type=&quot;text/babel&quot;>
        var doc = document;
        ReactDOM.render(
                <h1>你好，react</h1>,
                doc.getElementById('app')
        )
    </script>
    <title>ReactDOM.render</title>
</head>
<body>
<div id=&quot;app&quot;></div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bower_components/react/react.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bower_components/react/react-dom.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bower_components/babel/browser.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/babel"</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> doc = <span class="hljs-built_in">document</span>;
        ReactDOM.render(
                <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>你好，react<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>,
                doc.getElementById(<span class="hljs-string">'app'</span>)
        )
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>ReactDOM.render<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>最后在浏览器中打开这个页面，就可以看到最终效果。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React从入门到精通系列之(1)安装React

## 原文链接
[https://segmentfault.com/a/1190000007790578](https://segmentfault.com/a/1190000007790578)

