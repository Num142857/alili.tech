---
title: '【全栈React】第2天: 什么是 JSX?' 
date: 2019-01-05 2:30:11
hidden: true
slug: 6fxunuqiuco
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文转载自：<a href="http://www.zcfy.cc" rel="nofollow noreferrer" target="_blank">众成翻译</a><br>译者：<a href="http://www.zcfy.cc/@jiaxianhua" rel="nofollow noreferrer" target="_blank">iOSDevLog</a><br>链接：<a href="http://www.zcfy.cc/article/3797" rel="nofollow noreferrer" target="_blank">http://www.zcfy.cc/article/3797</a><br>原文：<a href="https://www.fullstackreact.com/30-days-of-react/day-2/" rel="nofollow noreferrer" target="_blank">https://www.fullstackreact.com/30-days-of-react/day-2/</a></p></blockquote>
<p>现在我们知道React是什么，让我们来看看这个系列的其余部分将会出现的几个术语和概念。</p>
<p>在我们前面的文章中，我们看了一下<a href="https://facebook.github.io/react/" rel="nofollow noreferrer" target="_blank">React</a>，并在高级别上讨论了它的工作原理。 在本文中，我们将介绍React生态系统的一部分：ES6和JSX。</p>
<h2 id="articleHeader0">JSX/ES5/ES6 什么鬼东西??!</h2>
<p>在互联网上的任何粗略的搜索寻找React材料，毫无疑问，你已经遇到了术语<code>JSX</code>，ES5和ES6。这些难懂的首字母缩略词可能会很快混乱。</p>
<p>ES5（<code>ES</code> 代表ECMAScript）基本上是“常规JavaScript”。第5次更新JavaScript，ES5在2009年完成。它已被所有主要浏览器支持多年。因此，如果你在最近写过或看过任何JavaScript，很可能是ES5。</p>
<p>ES6是一个新版本的JavaScript，添加了一些不错的语法和功能添加。它在2015年完成。ES6  <a href="http://kangax.github.io/compat-table/es6/" rel="nofollow noreferrer" target="_blank">几乎完全支持</a> 所有主要的浏览器。但这将是一段时间，直到较旧版本的Web浏览器逐步停止使用。例如，Internet Explorer 11不支持ES6，但是具有大约12％的浏览器市场份额。</p>
<p>为了获得ES6的好处今天，我们必须做一些事情，使它工作在尽可能多的浏览器，我们可以：</p>
<ol>
<li>我们必须 <em>转换</em> 我们的代码，以便更广泛的浏览器了解我们的JavaScript。这意味着将ES6 JavaScript转换为ES5 JavaScript。</li>
<li>We have to include a <em>shim</em> or <em>polyfill</em> that provides additional functionality added in ES6 that a browser may or may not have.</li>
<li>我们必须包括一个垫片或polyfill，提供在ES6中添加的浏览器可能具有或可能没有的附加功能。</li>
</ol>
<p>我们将在本系列的稍后部分看到我们如何做到这一点。</p>
<blockquote><p>我们将在本系列中编写的大多数代码都可以轻松地转换为ES5。在我们使用ES6的情况下，我们将首先介绍功能，然后通过它。</p></blockquote>
<p>我们将看到，所有的React组件都有一个<code>render</code>函数，它指定了React组件的HTML输出。<strong>JavaScript eXtension</strong>，或更常见的<strong>JSX</strong>，是一个React扩展，允许我们编写看起来像 HTML的JavaScript 。</p>
<blockquote><p>尽管在以前的范例中，将JavaScript和标记包含在同一个地方被认为是一种不好的习惯，但是结果是将视图与功能相结合使得对视图的推理变得非常简单。</p></blockquote>
<p>看看这是什么意思，想象一下，我们有一个React组件来呈现一个<code>h1</code> HTML标签。JSX允许我们以非常类似于HTML的方式声明这个元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Header extends React.Component {
  render() {
    return (
      <h1 className='large'>Hello World</h1>
    );
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Header</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;h1 className=<span class="hljs-symbol">'larg</span>e'&gt;<span class="hljs-type">Hello</span> <span class="hljs-type">World</span>&lt;/h1&gt;
    );
  }
}
</code></pre>
<p>这个<code>HelloWorld</code>组件中的<code>render()</code>函数看起来像它的返回HTML，但其实这是JSX。JSX 在运行时被翻译成常规JavaScript。那个组件，翻译后，看起来像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class HelloWorld extends React.Component {
  render() {
    return (
      React.createElement(
        'h1',
        {className: 'large'},
        'Hello World'
      )
    );
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloWorld</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="hljs-type">React</span>.createElement(
        <span class="hljs-symbol">'h</span>1',
        {className: <span class="hljs-symbol">'larg</span>e'},
        <span class="hljs-symbol">'Hello</span> <span class="hljs-type">World</span>'
      )
    );
  }
}
</code></pre>
<p>虽然JSX看起来像HTML，但它实际上只是一种更灵敏的方式<code>React.createElement()</code>来编写声明。当组件渲染时，它输出一个React元素树或该组件输出的HTML元素的<strong>虚拟表示</strong>。React然后将基于此React元素表示来确定对实际DOM所做的更改。在<code>HelloWorld</code>组件的情况下，React写入DOM的HTML将如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h1 class='large'>Hello World</h1>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'large'</span>&gt;</span>Hello World<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
</code></pre>
<blockquote>
<p>在<code>class extends</code>我们在第一个作出反应组件使用的语法是ES6语法。它允许我们使用熟悉的面向对象样式编写对象。<br>在ES6中，<code>class</code> 语法可能翻译为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var HelloWorld = function() {}
Object.extends(HelloWorld, React.Component)
HelloWorld.prototype.render = function() {} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> HelloWorld = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
<span class="hljs-built_in">Object</span>.extends(HelloWorld, React.Component)
HelloWorld.prototype.render = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{} </code></pre>
</blockquote>
<p>因为JSX是JavaScript，我们不能使用JavaScript保留字。这包括<code>class</code>和像<code>for</code>。</p>
<p>React提供了我们的属性<code>className</code>。我们使用它在<code>HelloWorld</code>来设置我们的<code>h1</code>标签上的<code>large</code> 类。还有一些其他属性，如标签上的属性<code>for</code>为转换<code>htmlFor</code> ，因为<code>for</code> 也是保留字。当我们开始使用它们时，我们将看看这些。</p>
<p>如果我们想要编写纯JavaScript而不是依赖于JSX编译器，我们可以只写该<code>React.createElement()</code>函数，而不必担心抽象层。但我们喜欢JSX。它特别是更复杂的组件可读性。考虑下面的JSX：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <img src=&quot;profile.jpg&quot; alt=&quot;Profile photo&quot; />
  <h1>Welcome back Ari</h1>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"profile.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"Profile photo"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Welcome back Ari<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>传送到浏览器的JavaScript看起来像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.createElement(&quot;div&quot;, null, 
  React.createElement(&quot;img&quot;, {src: &quot;profile.jpg&quot;, alt: &quot;Profile photo&quot;}),
  React.createElement(&quot;h1&quot;, null, &quot;Welcome back Ari&quot;)
);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>React.createElement(<span class="hljs-string">"div"</span>, <span class="hljs-literal">null</span>, 
  React.createElement(<span class="hljs-string">"img"</span>, {<span class="hljs-string">src:</span> <span class="hljs-string">"profile.jpg"</span>, <span class="hljs-string">alt:</span> <span class="hljs-string">"Profile photo"</span>}),
  React.createElement(<span class="hljs-string">"h1"</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">"Welcome back Ari"</span>)
);
</code></pre>
<p>再提一下，虽然你可以跳过JSX并直接编写后者，但JSX语法非常适合表示嵌套的HTML元素。</p>
<p>现在我们了解JSX，我们可以开始编写我们的第一个React组件。明天加入我们，当我们跳进我们的第一个React应用程序。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【全栈React】第2天: 什么是 JSX?

## 原文链接
[https://segmentfault.com/a/1190000010465188](https://segmentfault.com/a/1190000010465188)

