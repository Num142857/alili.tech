---
title: '【全栈React】第1天: 什么是 React?' 
date: 2019-01-06 2:30:09
hidden: true
slug: rtayooq1lb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文转载自：<a href="http://www.zcfy.cc" rel="nofollow noreferrer" target="_blank">众成翻译</a><br>译者：<a href="http://www.zcfy.cc/@jiaxianhua" rel="nofollow noreferrer" target="_blank">iOSDevLog</a><br>链接：<a href="http://www.zcfy.cc/article/3765" rel="nofollow noreferrer" target="_blank">http://www.zcfy.cc/article/3765</a><br>原文：<a href="https://www.fullstackreact.com/30-days-of-react/day-1/" rel="nofollow noreferrer" target="_blank">https://www.fullstackreact.com/30-days-of-react/day-1/</a></p></blockquote>
<p>今天，我们从一开始就开始。让我们看看React是什么，是什么让React运转起来。我们将讨论为什么要使用它。</p>
<p>在接下来的30天内，您可以体验到<a href="https://facebook.github.io/react/" rel="nofollow noreferrer" target="_blank">React</a>网页框架及其生态系统的各个部分。</p>
<p>我们的30天冒险中的每一天都将建立在前一天的材料上，所以在系列结束之后，您不仅可以了解框架如何工作的术语，概念和基础，而且可以在您的 下一个Web应用程序</p>
<p>让我们开始吧。 我们将从<a href="https://www.youtube.com/watch?v=1RW3nDRmu6k" rel="nofollow noreferrer" target="_blank">在零开始</a>因为它是一个非常好的开始的地方。</p>
<h2 id="articleHeader0">什么是React？</h2>
<p><a href="https://facebook.github.io/react/" rel="nofollow noreferrer" target="_blank">React</a>是一个用于构建用户界面的JavaScript库。它是Web应用程序的视图层。</p>
<p>所有React应用程序的核心是<strong>组件(components)</strong>。组件是一个自包含的模块，它提供一些输出。我们可以将类似按钮或输入字段的接口元素作为React组件。组件是可组合的。组件可以在其输出中包括一个或多个其他组件。</p>
<p>一般来说，为了编写React应用程序，我们编写了对应于各种接口元素的React组件。然后，我们将这些组件组织在定义应用程序结构的更高级组件中。</p>
<p>例如，拿到一个表单。表单可能包含许多界面元素，例如输入字段，标签或按钮。窗体中的每个元素都可以写为React组件。然后我们写一个更高级的组件，形式组件本身。表单组件将指定表单的结构，并在其中包括每个这些接口元素。</p>
<p>重要的是，React应用程序中的每个组件都遵守严格的数据管理原则。复杂的交互式用户界面通常涉及复杂的数据和应用程序状态。React的表面区域是有限的，目的是给我们提供工具，以便能够预测我们的应用程序在给定的情况下的外观。我们在后面的课程中探讨这些原则。</p>
<h2 id="articleHeader1">好吧，那么我们如何使用呢？</h2>
<p>React是一个JavaScript框架。使用框架就像在我们的HTML中包含一个JavaScript文件一样简单，并在我们JavaScript的应用程序中使用<code>React</code> 导出。</p>
<p>例如，React网站的_Hello world_示例可以如下简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>
  <meta charset=&quot;utf-8&quot;>
  <title>Hello world</title>
  <!-- Script tags including React -->
  <script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.min.js&quot;></script>
  <script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.min.js&quot;></script>
  <script src=&quot;https://npmcdn.com/babel-core@5.8.38/browser.min.js&quot;></script>

</head>
<body>
  <div id=&quot;app&quot;></div>
  <script type=&quot;text/babel&quot;>
    ReactDOM.render(
      <h1>Hello world</h1>,
      document.querySelector('#app')
    );
  </script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Hello world<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Script tags including React --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://npmcdn.com/babel-core@5.8.38/browser.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/babel"</span>&gt;</span><span class="javascript">
    ReactDOM.render(
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello world<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>,
      <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#app'</span>)
    );
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>虽然它可能看起来有点可怕，JavaScript代码是一行动态添加_Hello world_的页面。注意，我们只需要包括一些JavaScript文件，以使一切工作。</p>
<h2 id="articleHeader2">它是如何工作的？</h2>
<p>与许多其前身不同，React不是直接在浏览器的文档对象模型（DOM）上运行，而是在<strong>虚拟DOM(virtual DOM)</strong>上运行。也就是说，而不是<code>document</code> 在更改我们的数据之后在浏览器中操作（这可能很慢），它解决了其虚拟DOM中的更改。在更新虚拟DOM之后，React会智能地确定对实际DOM所做的更改。</p>
<p><a href="https://facebook.github.io/react/docs/dom-differences.html" rel="nofollow noreferrer" target="_blank">虚拟DOM</a> 完全存在于内存中，并且是网络浏览器的DOM的表示。因此，当我们写一个React组件时，我们不是直接写入DOM，而是写一个虚拟组件，React将变成DOM。</p>
<p>在下一篇文章中，我们将看看这对我们构建React组件和跳到JSX并编写我们的第一个真正组件意味着什么。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【全栈React】第1天: 什么是 React?

## 原文链接
[https://segmentfault.com/a/1190000010465140](https://segmentfault.com/a/1190000010465140)

