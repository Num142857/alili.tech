---
title: 'React.js 小书 Lesson9 - 事件监听' 
date: 2018-12-26 2:30:14
hidden: true
slug: c90jqqgb2d9
categories: [reprint]
---

{{< raw >}}

                    
<hr>
<h2 id="articleHeader0">React.js 小书 Lesson9 - 事件监听</h2>
<blockquote><p>本文作者：<a href="http://huziketang.com/books/react" rel="nofollow noreferrer" target="_blank">胡子大哈</a><br>本文原文：<a href="http://huziketang.com/books/react/lesson9" rel="nofollow noreferrer" target="_blank">http://huziketang.com/books/react/lesson9</a></p></blockquote>
<p><strong>转载请注明出处，保留原文链接以及作者信息</strong></p>
<p>在线阅读：<a href="http://huziketang.com/books/react" rel="nofollow noreferrer" target="_blank">http://huziketang.com/books/react</a></p>
<hr>
<p>在 React.js 里面监听事件是很容易的事情，你只需要给需要监听事件的元素加上属性类似于 <code>onClick</code>、<code>onKeyDown</code> 这样的属性，例如我们现在要给 <code>Title</code> 加上点击的事件监听：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Title extends Component {
  handleClickOnTitle () {
    console.log('Click on title.')
  }

  render () {
    return (
      <h1 onClick={this.handleClickOnTitle}>React 小书</h1>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Title</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  handleClickOnTitle () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Click on title.'</span>)
  }

  render () {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClickOnTitle}</span>&gt;</span>React 小书<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
    )
  }
}</code></pre>
<p>只需要给 <code>h1</code> 标签加上 <code>onClick</code> 的事件，<code>onClick</code> 紧跟着是一个表达式插入，这个表达式返回一个 <code>Title</code> 自己的一个实例方法。当用户点击 <code>h1</code> 的时候，React.js 就会调用这个方法，所以你在控制台就可以看到 <code>Click on title.</code> 打印出来。</p>
<p>在 React.js 不需要手动调用浏览器原生的 <code>addEventListener</code> 进行事件监听。React.js 帮我们封装好了一系列的 <code>on*</code> 的属性，当你需要为某个元素监听某个事件的时候，只需要简单地给它加上 <code>on*</code> 就可以了。而且你不需要考虑不同浏览器兼容性的问题，React.js 都帮我们封装好这些细节了。</p>
<p>React.js 封装了不同类型的事件，这里就不一一列举，有兴趣的同学可以参考官网文档： <a href="https://facebook.github.io/react/docs/events.html#supported-events" rel="nofollow noreferrer" target="_blank">SyntheticEvent - React</a>，多尝试不同的事件。另外要注意的是，这些事件属性名都必须要用驼峰命名法。</p>
<p>没有经过特殊处理的话，<em>这些 <code>on*</code> 的事件监听只能用在普通的 HTML 的标签上，而不能用在组件标签上</em>。也就是说，<code>&lt;Header onClick={…} /&gt;</code> 这样的写法不会有什么效果的。这一点要注意，但是有办法可以做到这样的绑定，以后我们会提及。现在只要记住一点就可以了：这些 <code>on*</code> 的事件监听只能用在普通的 HTML 的标签上，而不能用在组件标签上。</p>
<h2 id="articleHeader1">event 对象</h2>
<p>和普通浏览器一样，事件监听函数会被自动传入一个 <code>event</code>  对象，这个对象和普通的浏览器 <code>event</code> 对象所包含的方法和属性都基本一致。不同的是 React.js 中的 <code>event</code> 对象并不是浏览器提供的，而是它自己内部所构建的。React.js 将浏览器原生的 <code>event</code> 对象封装了一下，对外提供统一的 API 和属性，这样你就不用考虑不同浏览器的兼容性问题。这个 <code>event</code> 对象是符合 W3C 标准（ <a href="https://www.w3.org/TR/DOM-Level-3-Events/" rel="nofollow noreferrer" target="_blank">W3C UI Events</a> ）的，它具有类似于<code>event.stopPropagation</code>、<code>event.preventDefault</code> 这种常用的方法。</p>
<p>我们来尝试一下，这次尝试当用户点击 <code>h1</code> 的时候，把 <code>h1</code> 的 <code>innerHTML</code> 打印出来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Title extends Component {
  handleClickOnTitle (e) {
    console.log(e.target.innerHTML)
  }

  render () {
    return (
      <h1 onClick={this.handleClickOnTitle}>React 小书</h1>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Title</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  handleClickOnTitle (e) {
    <span class="hljs-built_in">console</span>.log(e.target.innerHTML)
  }

  render () {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClickOnTitle}</span>&gt;</span>React 小书<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
    )
  }
}</code></pre>
<p>再看看控制台，每次点击的时候就会打印”React 小书“。</p>
<h2 id="articleHeader2">关于事件中的 this</h2>
<p>一般在某个类的实例方法里面的 <code>this</code> 指的是这个实例本身。但是你在上面的 <code>handleClickOnTitle</code> 中把 <code>this</code> 打印出来，你会看到 <code>this</code> 是 <code>null</code> 或者 <code>undefined</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
  handleClickOnTitle (e) {
    console.log(this) // => null or undefined
  }
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">...
  handleClickOnTitle (e) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>) <span class="hljs-comment">// =&gt; null or undefined</span>
  }
...</code></pre>
<p>这是因为 React.js 调用你所传给它的方法的时候，并不是通过对象方法的方式调用（<code>this.handleClickOnTitle</code>），而是直接通过函数调用 （<code>handleClickOnTitle</code>），所以事件监听函数内并不能通过 <code>this</code> 获取到实例。</p>
<p>如果你想在事件函数当中使用当前的实例，你需要手动地将实例方法 <code>bind</code> 到当前实例上再传入给 React.js。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Title extends Component {
  handleClickOnTitle (e) {
    console.log(this)
  }

  render () {
    return (
      <h1 onClick={this.handleClickOnTitle.bind(this)}>React 小书</h1>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Title</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  handleClickOnTitle (e) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
  }

  render () {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClickOnTitle.bind(this)}</span>&gt;</span>React 小书<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
    )
  }
}</code></pre>
<p><code>bind</code> 会把实例方法绑定到当前实例上，然后我们再把绑定后的函数传给 React.js 的 <code>onClick</code> 事件监听。这时候你再看看，点击 <code>h1</code> 的时候，就会把当前的实例打印出来：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011946410" src="https://static.alili.tech/img/remote/1460000011946410" alt="示例图片" title="示例图片" style="cursor: pointer;"></span></p>
<p>你也可以在 <code>bind</code> 的时候给事件监听函数传入一些参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Title extends Component {
  handleClickOnTitle (word, e) {
    console.log(this, word)
  }

  render () {
    return (
      <h1 onClick={this.handleClickOnTitle.bind(this, 'Hello')}>React 小书</h1>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Title</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  handleClickOnTitle (word, e) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>, word)
  }

  render () {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClickOnTitle.bind(this,</span> '<span class="hljs-attr">Hello</span>')}&gt;</span>React 小书<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
    )
  }
}</code></pre>
<p>这种 <code>bind</code> 模式在 React.js 的事件监听当中非常常见，<code>bind</code> 不仅可以帮我们把事件监听方法中的 <code>this</code> 绑定到当前组件实例上；还可以帮助我们在在渲染列表元素的时候，把列表元素传入事件监听函数当中——这个将在以后的章节提及。</p>
<p>如果有些同学对 JavaScript 的 <code>this</code> 模式或者 <code>bind</code> 函数的使用方式不是特别了解到话，可能会对这部分内容会有些迷惑，可以补充对 JavaScript 的  <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this" rel="nofollow noreferrer" target="_blank">this</a> 和 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind" rel="nofollow noreferrer" target="_blank">bind</a> 相关的知识再来回顾这部分内容。</p>
<h2 id="articleHeader3">总结</h2>
<p>为 React 的组件添加事件监听是很简单的事情，你只需要使用 React.js 提供了一系列的 <code>on*</code> 方法即可。</p>
<p>React.js 会给每个事件监听传入一个 <code>event</code> 对象，这个对象提供的功能和浏览器提供的功能一致，而且它是兼容所有浏览器的。</p>
<p>React.js 的事件监听方法需要手动 <code>bind</code> 到当前实例，这种模式在 React.js 中非常常用。</p>
<p>下一节中我们将介绍<a href="http://huziketang.com/books/react/lesson10" rel="nofollow noreferrer" target="_blank">《React.js 小书 Lesson10 - 组件的 state 和 setState》</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React.js 小书 Lesson9 - 事件监听

## 原文链接
[https://segmentfault.com/a/1190000011946405](https://segmentfault.com/a/1190000011946405)

