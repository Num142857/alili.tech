---
title: '精益 React 学习指南 （Lean React）- 1.1 React 介绍' 
date: 2019-02-10 2:30:42
hidden: true
slug: vyn9t1ebvhq
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://segmentfault.com/a/1190000005136764">书籍完整目录</a></p></blockquote>
<h1 id="articleHeader0">1.1 React 介绍</h1>
<p><span class="img-wrap"><img data-src="/img/bVvJgS" src="https://static.alili.tech/img/bVvJgS" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">1.1.1 React 是什么</h2>
<blockquote><p>React IS A JAVASCRIPT LIBRARY FOR BUILDING USER INTERFACES <br>来自：<a href="http://facebook.github.io/react/" rel="nofollow noreferrer" target="_blank">React 官方网站</a></p></blockquote>
<p>狭义来讲 React 是 Facebook 内部开源出来的一个前端 UI 开发框架，广义来讲 React 不仅仅是 js 框架本身，更是一套完整的前端开发生态体系，这套体系包括：</p>
<ol>
<li><p>React.js</p></li>
<li><p>ReactRenders: ReactDOM / ReactServer / ReactCanvas</p></li>
<li><p>Flux 模式及其实现（Redux , Fluxxor）</p></li>
<li><p>React 开源组件</p></li>
<li><p>React Native</p></li>
<li><p>GraphQl + Relay</p></li>
</ol>
<p>任何技术都是一样，技术本身的核心不会太复杂，但是围绕这个主体会有很多依附的知识点形成了体系化的技术栈。 所以我们谈学习 React 并不仅仅是学习 React 本身，而是学习这套开发体系，整个技术栈， 本书也是围绕这个技术栈系统的讲解。</p>
<blockquote><p>本书中除了 React Native 以外都会进行系统的讲解，React Native 是相对于 WEB 来说另外一个较大的技术体系，本书会把重点放于 React Web 开发。</p></blockquote>
<h2 id="articleHeader2">1.1.2 React 中的基本概念</h2>
<p>我们先来认识一下 React 中的基本概念</p>
<p><strong>React.js</strong><br>React.js 是 React 的核心库，在应用中必须先加载核心库。 </p>
<p><strong>ReactDOM.js</strong> <br>ReactDOM.js 是 React 的 DOM 渲染器，React 将核心库和渲染器分离开了，为了在 web 页面中显示开发的组件，需要调用 ReactDOM.render 方法， 第一个参数是 React 组件，第二个参数为 HTMLElement。</p>
<p><strong>JSX</strong><br>JSX 是 React 自定义的语法，最终 JSX 会转化为 JS 运行于页面当中。</p>
<p><strong>组件</strong><br>组件是 React 中的核心概念，页面当中的所有元素都是通过 React 组件来表达， 我们将要写的 React 代码绝大部分都是在做 React 组件的开发。</p>
<p><strong>VIRTUAL DOM</strong><br>React 抽象出来的虚拟 DOM 树，虚拟树是 React 高性能的关键。</p>
<p><strong>单向数据流：one-way reactive data flow</strong><br>React 应用的核心设计模式，数据流向自顶向下</p>
<h2 id="articleHeader3">1.1.3 Hello React World</h2>
<p>我也是性子急的人，按照技术界的惯例，在学习一个技术前，首先得说一句: “Hello World!”。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
  <head>
    <meta charset=&quot;UTF-8&quot; />
    <title>Hello React!</title>
    <script src=&quot;http://facebook.github.io/react/js/react.js&quot;></script>
    <script src=&quot;http://facebook.github.io/react/js/react-dom.js&quot;></script>
    <script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js&quot;></script>
  </head>
  <body>
    <div id=&quot;example&quot;></div>
    <script type=&quot;text/babel&quot;>
        var Hello = React.createClass({
          render: function() {
            return <div>Hello {this.props.name}</div>;
          }
        });

        ReactDOM.render(
          <Hello name=&quot;World&quot; />,
          document.getElementById('example')
        );
    </script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Hello React!<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://facebook.github.io/react/js/react.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://facebook.github.io/react/js/react-dom.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/babel"</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> Hello = React.createClass({
          <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello {this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
          }
        });

        ReactDOM.render(
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Hello</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"World"</span> /&gt;</span>,
          document.getElementById('example')
        );
    </span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<blockquote><p>读者可以复制代码到一个新的 HTML 文件中，并通过浏览器打开，上面的 html 中目前我们只用关心 script 标签内的代码，script 标签内的语法为 JSX 语法，ReactDOM 是 React 的 DOM 渲染器。</p></blockquote>
<p>了解了基本概念以及看过 Hello World 后，读者可能会开始产生疑问了：</p>
<ol><li><p><strong>jsx 语法怎么和 HTML 写法一样？</strong></p></li></ol>
<p>答：是的，看上去一样， 但jsx 和 HTML 本质的不同是 jsx 直接在函数中写 xml 标签。在 1.2 节中，会详细介绍 jsx 以及和 HTML 做更多的对比。</p>
<ol><li><p><strong>看上去 React 除了 jsx 以外，并没有什么特殊的地方，不就是将模板字符串渲染到 DOM 中吗？你能告诉我 React 和其他框架有什么不同之处吗？</strong></p></li></ol>
<p>答：答案见 1.1.4 节</p>
<ol><li><p><strong>Hello World 也并不能看出 React 的能力，你能先告诉我 React 能做些什么吗？</strong></p></li></ol>
<p>答：答案见 1.1.5 节</p>
<h2 id="articleHeader4">1.1.4 React 的独特之处</h2>
<p>相比其他前端框架，为什么 React 独树一帜，能够脱颖而出呢？</p>
<ol>
<li><p>组件的组合模式</p></li>
<li><p>单向数据流的设计</p></li>
<li><p>高效的性能</p></li>
<li><p>分离的设计</p></li>
</ol>
<h3 id="articleHeader5">1.1.4.1 组件的组合模式</h3>
<blockquote><p>组合模式：组合模式有时候又叫做部分-整体模式，它使我们树型结构的问题中，模糊了简单元素和复杂元素的概念，客户程序可以向处理简单元素一样来处理复杂元素,从而使得客户程序与复杂元素的内部结构解耦。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVvJhV" src="https://static.alili.tech/img/bVvJhV" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>React 就是基于组合模式， 无论是应用等级还是一个表单亦或是一个按钮都视为一个组件， 然后基于组件的组合构建整个应用，这样的结构一直是前端界想要却迟迟不来的 web component。 </p>
<p>React 中组件的组合：</p>
<p><span class="img-wrap"><img data-src="/img/bVvJk2" src="https://static.alili.tech/img/bVvJk2" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>基于组合模式的优点：</p>
<ol>
<li><p>构建可重用的组件：组件的开发能够形成公司的组件库，每个业务的开发都能积累可重用的组件。</p></li>
<li><p>无学习障碍：天然符合 HTML 的结构， 对前端开发者来说几乎没有学习障碍。</p></li>
<li><p>具有弹性的架构：组合模式很简单却很有效，能够构建简单的页面也能构建大型的前端应用。</p></li>
<li><p>源码高可维护性：开发只是工作中的一部分，应用的上线才是噩梦的开始，很多大型应用因为复制的业务逻辑导致无法快速响应业务需求，可维护性低。</p></li>
</ol>
<h3 id="articleHeader6">1.1.4.2 单向数据流的设计</h3>
<p>我们都知道 Javascript 是脚本语言，不能像静态语言一样通过编译定位为题，想要清晰的定位到应用中的 bug 需要深入了解业务代码，对于大型前端应用来说，因为业务代码量很大且复杂，很难定位到 bug。 然而 React 的单向数据流的设计让前端 bug 定位变得简单， 页面的 UI 和数据的对应是唯一的,我们可以通过定位数据变化就可以定位页面展现问题。 </p>
<p>单向数据流设计：</p>
<p><span class="img-wrap"><img data-src="/img/bVvJr6" src="https://static.alili.tech/img/bVvJr6" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">1.1.4.3 高效的性能</h3>
<p>这里要提一个概念， 可能你已经了解或听说了，就是 virtual dom。 React 之所以能够这样设计要归功于 Virtual DOM 算法， 基于算法可以让只有需要改变的元素才去重渲染。在后面的内部实现章节中会详细讲解 virtual DOM 算法的实现</p>
<h3 id="articleHeader8">1.1.4.4 分离的框架设计</h3>
<p>React.js 现在的版本已经将源码分开为 ReactDOM 和 React.js . 这就意味着 React 不仅仅能够在 web 端工作， 甚至可以在服务端（nodejs），Native 端运行。 </p>
<p>与此同时， 我们可以自定义自己的渲染器， 实现比如 Three.js， Pixi.js， D3.js 的 React 方式渲染。</p>
<h2 id="articleHeader9">1.1.5 React 应用范围</h2>
<p>React 可应用的范围：</p>
<p><span class="img-wrap"><img data-src="/img/bVvJXr" src="https://static.alili.tech/img/bVvJXr" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li><p>web 端应用</p></li>
<li><p>原生应用 - IOS、Android、Native 应用</p></li>
<li><p>Node.Js 服务端渲染</p></li>
</ol>
<h3 id="articleHeader10">1.1.5.1 Web 端应用</h3>
<p>Web 应用是 React 的出发点，我们可以通过 React 构建从简单的 TODOAPP 到大型的电商购物网站应用。 同时除了能够处理 HTML 以外， 在 Web 端， 我们同样可以通过 React 来实现数据可视化， 图表展现，甚至是游戏开发：</p>
<h3 id="articleHeader11">1.1.5.2 原生应用</h3>
<p>除了 Web 端以外，我们可以使用同样的 jsx 语法构建 IOS 或者 Android 应用， 这要归功于 facebook 开源的 React Native。 基于 React Native ， 我们将可以使用 jsx 来实现具有原生应用性能的 UI 运行于 IOS 和 android 中，同时我们也可以通过 NW.js 或者 Electron 来实现基于 React 的桌面应用。</p>
<h3 id="articleHeader12">1.1.5.3 服务端渲染</h3>
<p>React 除了在 Web 和 Native 环境以外， 也可以通过 React 实现在服务器端渲染出 HTML。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精益 React 学习指南 （Lean React）- 1.1 React 介绍

## 原文链接
[https://segmentfault.com/a/1190000005140569](https://segmentfault.com/a/1190000005140569)

