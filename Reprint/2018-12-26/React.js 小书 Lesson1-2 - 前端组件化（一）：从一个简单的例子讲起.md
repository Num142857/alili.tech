---
title: 'React.js 小书 Lesson1-2 - 前端组件化（一）：从一个简单的例子讲起' 
date: 2018-12-26 2:30:14
hidden: true
slug: 5xcvaou0lu8
categories: [reprint]
---

{{< raw >}}

                    
<hr>
<h2 id="articleHeader0">React.js 小书 Lesson1-2 - 前端组件化（一）：从一个简单的例子讲起</h2>
<blockquote><p>本文作者：<a href="http://huziketang.com/books/react/" rel="nofollow noreferrer" target="_blank">胡子大哈</a><br>本文原文：<a href="http://huziketang.com/books/react/lesson2" rel="nofollow noreferrer" target="_blank">http://huziketang.com/books/react/lesson2</a></p></blockquote>
<p><strong>转载请注明出处，保留原文链接以及作者信息</strong></p>
<p>在线阅读：<a href="http://huziketang.com/books/react/" rel="nofollow noreferrer" target="_blank">http://huziketang.com/books/react/</a></p>
<hr>
<p>React.js 是一个帮助你构建页面 UI 的库。如果你熟悉 MVC 概念的话，那么 React 的组件就相当于 MVC 里面的 View。如果你不熟悉也没关系，你可以简单地理解为，React.js 将帮助我们将界面分成了各个独立的小块，每一个块就是组件，这些组件之间可以组合、嵌套，就成了我们的页面。</p>
<p>一个组件的显示形态和行为有可能是由某些数据决定的。而数据是可能发生改变的，这时候组件的显示形态就会发生相应的改变。而 React.js 也提供了一种非常高效的方式帮助我们做到了数据和组件显示形态之间的同步。</p>
<p>React.js 不是一个框架，它只是一个库。它只提供 UI （view）层面的解决方案。在实际的项目当中，它并不能解决我们所有的问题，需要结合其它的库，例如 Redux、React-router 等来协助提供完整的解决方法。</p>
<hr>
<p>很多课程一上来就给大家如何配置环境、怎么写 React.js 组件。但是本课程还是希望大家对问题的根源有一个更加深入的了解，其实很多的库、框架都是解决类似的问题。只有我们对这些库、框架解决的问题有深入的了解和思考以后，我们才能得心应手地使用它们，并且有新的框架出来也不会太过迷茫；因为其实它们解决都是同一个问题。</p>
<p>这两节课我们来探讨一下是什么样的问题导致了我们需要前端页面进行组件化，前端页面的组件化需要解决什么样的问题。后续课程我们再来看看 React.js 是怎么解决这些问题的。</p>
<p>所以这几节所讲的内容将和 React.js 的内容没有太大的关系，但是如果你能顺利了解这几节的内容，那么后面哪些对新手来说很复杂的概念对你来说就是非常自然的事。</p>
<h2 id="articleHeader1">一个简单的点赞功能</h2>
<p>我们会从一个简单的点赞功能讲起。 假设现在我们需要实现一个点赞、取消点赞的功能。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011968224?w=600&amp;h=228" src="https://static.alili.tech/img/remote/1460000011968224?w=600&amp;h=228" alt="示例图片" title="示例图片" style="cursor: pointer; display: inline;"></span></p>
<p>如果你对前端稍微有一点了解，你就顺手拈来：</p>
<p>HTML:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <body>
    <div class='wrapper'>
      <button class='like-btn'>
        <span class='like-text'>点赞</span>
        <span>?</span>
      </button>
    </div>
  </body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  &lt;body&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'wrapper'</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'like-btn'</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'like-text'</span>&gt;</span>点赞<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>?<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  &lt;<span class="hljs-regexp">/body&gt;</span></code></pre>
<p>为了模拟现实当中的实际情况，所以这里特意把这个 <code>button</code> 里面的 HTML 结构搞得稍微复杂一些。有了这个 HTML 结构，现在就给它加入一些 JavaScript 的行为：</p>
<p>JavaScript：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const button = document.querySelector('.like-btn')
  const buttonText = button.querySelector('.like-text')
  let isLiked = false
  button.addEventListener('click', () => {
    isLiked = !isLiked
    if (isLiked) {
      buttonText.innerHTML = '取消'
    } else {
      buttonText.innerHTML = '点赞'
    }
  }, false)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">const</span> button = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.like-btn'</span>)
  <span class="hljs-keyword">const</span> buttonText = button.querySelector(<span class="hljs-string">'.like-text'</span>)
  <span class="hljs-keyword">let</span> isLiked = <span class="hljs-literal">false</span>
  button.addEventListener(<span class="hljs-string">'click'</span>, () =&gt; {
    isLiked = !isLiked
    <span class="hljs-keyword">if</span> (isLiked) {
      buttonText.innerHTML = <span class="hljs-string">'取消'</span>
    } <span class="hljs-keyword">else</span> {
      buttonText.innerHTML = <span class="hljs-string">'点赞'</span>
    }
  }, <span class="hljs-literal">false</span>)</code></pre>
<p>功能和实现都很简单，按钮已经可以提供点赞和取消点赞的功能。这时候你的同事跑过来了，说他很喜欢你的按钮，他也想用你写的这个点赞功能。这时候问题就来了，你就会发现这种实现方式很致命：你的同事要把整个  <code>button</code>  和里面的结构复制过去，还有整段 JavaScript 代码也要复制过去。这样的实现方式没有任何可复用性。</p>
<h2 id="articleHeader2">结构复用</h2>
<p>现在我们来重新编写这个点赞功能，让它具备一定的可复用。这次我们先写一个类，这个类有 render 方法，这个方法里面直接返回一个表示 HTML 结构的字符串：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  class LikeButton {
    render () {
      return `
        <button id='like-btn'>
          <span class='like-text'>赞</span>
          <span>?</span>
        </button>
      `
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LikeButton</span> </span>{
    render () {
      <span class="hljs-keyword">return</span> <span class="hljs-string">`
        &lt;button id='like-btn'&gt;
          &lt;span class='like-text'&gt;赞&lt;/span&gt;
          &lt;span&gt;?&lt;/span&gt;
        &lt;/button&gt;
      `</span>
    }
  }</code></pre>
<p>然后可以用这个类来构建不同的点赞功能的实例，然后把它们插到页面中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const wrapper = document.querySelector('.wrapper')
  const likeButton1 = new LikeButton()
  wrapper.innerHTML = likeButton1.render()
  
  const likeButton2 = new LikeButton()
  wrapper.innerHTML += likeButton2.render()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">const</span> wrapper = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.wrapper'</span>)
  <span class="hljs-keyword">const</span> likeButton1 = <span class="hljs-keyword">new</span> LikeButton()
  wrapper.innerHTML = likeButton1.render()
  
  <span class="hljs-keyword">const</span> likeButton2 = <span class="hljs-keyword">new</span> LikeButton()
  wrapper.innerHTML += likeButton2.render()</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011968225?w=600&amp;h=228" src="https://static.alili.tech/img/remote/1460000011968225?w=600&amp;h=228" alt="示例图片" title="示例图片" style="cursor: pointer;"></span></p>
<p>这里非常暴力地使用了 innerHTML ，把两个按钮粗鲁地插入了 wrapper 当中。虽然你可能会对这种实现方式非常不满意，但我们还是勉强了实现了结构的复用。我们后面再来优化它。</p>
<h2 id="articleHeader3">实现简单的组件化</h2>
<p>你一定会发现，现在的按钮是死的，你点击它它根本不会有什么反应。因为根本没有往上面添加事件。但是问题来了，<code>LikeButton</code>  类里面是虽然说有一个  <code>button</code>，但是这玩意根本就是在字符串里面的。你怎么能往一个字符串里面添加事件呢？DOM 事件的 API 只有 DOM 结构才能用。</p>
<p>我们需要 DOM 结构，准确地来说：<em>我们需要这个点赞功能的 HTML 字符串表示的 DOM 结构</em>。假设我们现在有一个函数  <code>createDOMFromString</code> ，你往这个函数传入 HTML 字符串，但是它会把相应的 DOM 元素返回给你。这个问题就可以额解决了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ::String => ::Document
const createDOMFromString = (domString) => {
  // TODO 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ::String =&gt; ::Document</span>
<span class="hljs-keyword">const</span> createDOMFromString = <span class="hljs-function">(<span class="hljs-params">domString</span>) =&gt;</span> {
  <span class="hljs-comment">// TODO </span>
}</code></pre>
<p>先不用管这个函数应该怎么实现，先知道它是干嘛的。拿来用就好，这时候用它来改写一下 <code>LikeButton</code> 类：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  class LikeButton {
    render () {
      this.el = createDOMFromString(`
        <button class='like-button'>
          <span class='like-text'>点赞</span>
          <span>?</span>
        </button>
      `)
      this.el.addEventListener('click', () => console.log('click'), false)
      return this.el
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LikeButton</span> </span>{
    render () {
      <span class="hljs-keyword">this</span>.el = createDOMFromString(<span class="hljs-string">`
        &lt;button class='like-button'&gt;
          &lt;span class='like-text'&gt;点赞&lt;/span&gt;
          &lt;span&gt;?&lt;/span&gt;
        &lt;/button&gt;
      `</span>)
      <span class="hljs-keyword">this</span>.el.addEventListener(<span class="hljs-string">'click'</span>, () =&gt; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'click'</span>), <span class="hljs-literal">false</span>)
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.el
    }
  }</code></pre>
<p>现在  <code>render()</code> 返回的不是一个 html 字符串了，而是一个由这个 html 字符串所生成的 DOM。在返回 DOM 元素之前会先给这个 DOM 元素上添加事件再返回。</p>
<p>因为现在 <code>render</code> 返回的是 DOM 元素，所以不能用 <code>innerHTML</code> 暴力地插入 wrapper。而是要用 DOM API 插进去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const wrapper = document.querySelector('.wrapper')

  const likeButton1 = new LikeButton()
  wrapper.appendChild(likeButton1.render())

  const likeButton2 = new LikeButton()
  wrapper.appendChild(likeButton2.render())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">const</span> wrapper = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.wrapper'</span>)

  <span class="hljs-keyword">const</span> likeButton1 = <span class="hljs-keyword">new</span> LikeButton()
  wrapper.appendChild(likeButton1.render())

  <span class="hljs-keyword">const</span> likeButton2 = <span class="hljs-keyword">new</span> LikeButton()
  wrapper.appendChild(likeButton2.render())</code></pre>
<p>现在你点击这两个按钮，每个按钮都会在控制台打印 <code>click</code>，说明事件绑定成功了。但是按钮上的文本还是没有发生改变，只要稍微改动一下 <code>LikeButton</code> 的代码就可以完成完整的功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  class LikeButton {
    constructor () {
      this.state = { isLiked: false }
    }

    changeLikeText () {
      const likeText = this.el.querySelector('.like-text')
      this.state.isLiked = !this.state.isLiked
      likeText.innerHTML = this.state.isLiked ? '取消' : '点赞'
    }

    render () {
      this.el = createDOMFromString(`
        <button class='like-button'>
          <span class='like-text'>点赞</span>
          <span>?</span>
        </button>
      `)
      this.el.addEventListener('click', this.changeLikeText.bind(this), false)
      return this.el
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LikeButton</span> </span>{
    <span class="hljs-keyword">constructor</span> () {
      <span class="hljs-keyword">this</span>.state = { <span class="hljs-attr">isLiked</span>: <span class="hljs-literal">false</span> }
    }

    changeLikeText () {
      <span class="hljs-keyword">const</span> likeText = <span class="hljs-keyword">this</span>.el.querySelector(<span class="hljs-string">'.like-text'</span>)
      <span class="hljs-keyword">this</span>.state.isLiked = !<span class="hljs-keyword">this</span>.state.isLiked
      likeText.innerHTML = <span class="hljs-keyword">this</span>.state.isLiked ? <span class="hljs-string">'取消'</span> : <span class="hljs-string">'点赞'</span>
    }

    render () {
      <span class="hljs-keyword">this</span>.el = createDOMFromString(<span class="hljs-string">`
        &lt;button class='like-button'&gt;
          &lt;span class='like-text'&gt;点赞&lt;/span&gt;
          &lt;span&gt;?&lt;/span&gt;
        &lt;/button&gt;
      `</span>)
      <span class="hljs-keyword">this</span>.el.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-keyword">this</span>.changeLikeText.bind(<span class="hljs-keyword">this</span>), <span class="hljs-literal">false</span>)
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.el
    }
  }</code></pre>
<p>这里的代码稍微长了一些，但是还是很好理解。只不过是在给 <code>LikeButton</code> 类添加了构造函数，这个构造函数会给每一个 <code>LikeButton</code> 的实例添加一个对象 <code>state</code>，<code>state</code> 里面保存了每个按钮自己是否点赞的状态。还改写了原来的事件绑定函数：原来只打印  <code>click</code>，现在点击的按钮的时候会调用  <code>changeLikeText</code> 方法，这个方法会根据 <code>this.state</code> 的状态改变点赞按钮的文本。</p>
<p>现在这个组件的可复用性已经很不错了，你的同事们只要实例化一下然后插入到 DOM 里面去就好了。</p>
<p>下一节<a href="http://huziketang.com/books/react/lesson3" rel="nofollow noreferrer" target="_blank">《React.js 小书 Lesson3 - 前端组件化（二）：优化 DOM 操作》</a>中我们继续优化这个例子，让它更加通用。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React.js 小书 Lesson1-2 - 前端组件化（一）：从一个简单的例子讲起

## 原文链接
[https://segmentfault.com/a/1190000011940365](https://segmentfault.com/a/1190000011940365)

