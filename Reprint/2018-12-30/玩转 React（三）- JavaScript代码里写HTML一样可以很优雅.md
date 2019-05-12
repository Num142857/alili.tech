---
title: '玩转 React（三）- JavaScript代码里写HTML一样可以很优雅' 
date: 2018-12-30 2:30:10
hidden: true
slug: jsw96tlo95b
categories: [reprint]
---

{{< raw >}}

                    
<p>这是《玩转 React》系列的第三篇，看到本篇的标题，了解过 React 的同学可能已经大致猜到我要讲什么了，本篇中要讲的内容对于刚接触 React 的同学来说，可能有些难以接受，但希望你能坚持学下去，这是 Facebook 的前端大神们为前端开发做出的革命性创新。</p>
<h2 id="articleHeader0">React 第一印象</h2>
<p>废话不多说，先看一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

ReactDOM.render(<HelloMessage name=&quot;John&quot; />, mountNode);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloMessage</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;div&gt;<span class="hljs-type">Hello</span> {<span class="hljs-keyword">this</span>.props.name}&lt;/div&gt;;
  }
}

<span class="hljs-type">ReactDOM</span>.render(&lt;<span class="hljs-type">HelloMessage</span> name=<span class="hljs-string">"John"</span> /&gt;, mountNode);</code></pre>
<p>这是从 React 官网首页粘贴过来的一段示例代码，简单解释一下，这段代码实现了一个名为 HelloMessage 的组件，它接收一个 name 属性，可以在页面上展示出 Hello xxx。<code>ReactDOM.render</code> 是用来将某个组件渲染到页面的某个 DOM 节点上。</p>
<p>在之后的文章中，我们会详细讲解如何创建 React 组件以及如何开发一个完整的 React 项目。现在，我更想跟大家探讨的是，你看了上述这段代码，算是对 React 有了第一印象，内心是怎样的感受？</p>
<p>我相信，很多人第一次看到这样的代码时的感受都是：“我擦，这是什么玩意儿，HTML怎么都写到JavaScript代码里去了，展示与业务逻辑分离，这都不懂？”，说实话，这就是我当时真实的内心感受。很幸运我坚持了下去，并一直用到现在，现在我对 React 的感受是：“我擦，好爽，好牛逼”。</p>
<p>刚开始有这种想法很好理解，好多人像我一样被“展示要与业务逻辑分离”这句话洗脑太久了，其实，这句话真正发挥价值的时候，是在 MVC 开发模式出现之前，那时候 web 程序逻辑很简单，可能页面开始处是连接数据库，查询数据，接在下面就是 HTML 代码来展示查询结果了。如果你了解一点 PHP，在 PHP 文件的开始处有个 <code>&lt;?php</code> 结尾处可能有个 <code>?&gt;</code>，这就是那个年代用来分隔 PHP 代码和 HTML 代码的。但是随着 web 程序逻辑越来越复杂，业务逻辑代码跟 HTML 代码混到一起就变得越来越难以维护，所以就有了 MVC 开发模式。</p>
<p>并不是说现在“展示要与业务逻辑分离”这句话已经不适用于现在的 web开发，我想说的是，我们看问题，要回归问题的本质，我们要不要接受 React 的这种写法，判断依据应该是基于 React 的这种写法有没有让我们的前端代码变得更清晰、易维护性更强，而不是 JavaScript 中是不是写了类似于 HTML 语法的东西，千万不要为了分离而分离。</p>
<h2 id="articleHeader1">其实只是给JavaScript加了点糖 - JSX</h2>
<p>上面这种在 JavaScript 中写类似 HMTL 代码的语法被称为 JSX。你可以理解为扩展版的 JavaScript。显然，这种语法在浏览器环境中是不能执行的，所以在代码加载到页面中之前，我们需要通过工具将它转译成标准的 JavaScript 语法，就像我们现在为什么可以用 ES6 的语法一样，尽管目前浏览器对它支持得还不好。例如下面这两段代码，实际上是等价的。</p>
<p>JSX 语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = (
  <h1 className=&quot;greeting&quot;>
    Hello, world!
  </h1>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> element = (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"greeting"</span>&gt;</span>
    Hello, world!
  <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
);</code></pre>
<p>由上面代码转译而来的标准 JavaScript 语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">const element</span> = React.createElement(
  <span class="hljs-string">'h1'</span>,
  {className: <span class="hljs-string">'greeting'</span>},
  <span class="hljs-string">'Hello, world!'</span>
);</code></pre>
<p>是不是感觉 JSX 语法更直观，写起来更简洁？所以说 JSX 实际上是 <code>React.createElement(component, props, ...children)</code> 的语法糖。</p>
<p>如果你熟悉 HTML，那么 JSX 对于你来说是没有任何压力的，因为 HTML 中的所有标签，在 JSX 中都是支持的，基本上没有学习成本，只有如下几点略微的不同：</p>
<ul>
<li>class 属性变为 className</li>
<li>tabindex 属性变为 tabIndex</li>
<li>for 属性变为 htmlFor</li>
<li>textarea 的值通过需要通过 value 属性来指定</li>
<li>style 属性的值接收一个对象，css 的属性变为驼峰写法，如：backgroundColor。</li>
</ul>
<p>在上一篇中，我们有提到组件，实际上，我们可以把在 JSX 中写的 HTML 标签看作是 React 内部已经实现了的基础组件。在下一篇中我将详细为大家介绍如何利用这些基础组件来创造一个新的组件，也就是上一篇提到的 React 所提供的创建一个新的 HTML 标签的能力。</p>
<h2 id="articleHeader2">写在最后</h2>
<p>这篇文章的主要目的是希望大家对 JSX 有个基本的印象，我了解到有很多同学就是因为看了一眼 JSX 的语法就放弃继续看下去了。真的很遗憾……</p>
<p>这里我还想跟大家分享一个个人经验，简单说就是保持谦虚，就像乔布斯说的那样：“Stay hungry，Stay foolish.”。</p>
<p>当你接触到一个新的框架、新的技术时，当它与你已有的经验产生冲突的时候，觉得它设计得垃圾的时候，千万不要着急吐槽。尤其是对一些相对还比较流行的框架或技术，更是如此。你要相信，那些框架的设计者的技术能力和工程经验，远在你之上，你觉得不爽的地方，你觉得他们就真的没有考虑到吗？认真去思考框架设计者在设计这套框架时候的心路历程，认真去学习别人在这个框架上的最佳实践，结果往往都会出乎你的意料。</p>
<p>类似的，当你发现框架确实在某方面的能力有所欠缺的时候，不要着急去造轮子，先去社区搜索下，你遇到的问题，可能别人早已经讨论了很久，并有了相当不错的解决方案，就算没有，这个过程也能给你很多启发。</p>
<p>切身体会，屡试不爽，望君受用，谢谢大家。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
玩转 React（三）- JavaScript代码里写HTML一样可以很优雅

## 原文链接
[https://segmentfault.com/a/1190000011403495](https://segmentfault.com/a/1190000011403495)

