---
title: '40 行代码内实现一个 React.js' 
date: 2019-01-26 2:30:18
hidden: true
slug: 4ns5cwxsi05
categories: [reprint]
---

{{< raw >}}

                    
<p>作者：<a href="https://www.zhihu.com/people/hu-zi-da-ha/activities" rel="nofollow noreferrer" target="_blank">胡子大哈</a><br>原文链接：<a href="http://huziketang.com/blog/posts/detail?postId=58aea515204d50674934c3ac" rel="nofollow noreferrer" target="_blank">http://huziketang.com/blog/posts/detail?postId=58aea515204d50674934c3ac</a></p>
<p>转载请注明出处，保留原文链接和作者信息。</p>
<h2 id="articleHeader0">目录</h2>
<ul>
<li><p>1 前言</p></li>
<li><p>2 一切从点赞说起</p></li>
<li>
<p>3 实现可复用性</p>
<ul>
<li><p>3.1 结构复用</p></li>
<li><p>3.2 生成 DOM 元素并且添加事件</p></li>
</ul>
</li>
<li>
<p>4 为什么不暴力一点？</p>
<ul>
<li><p>4.1 状态改变 -&gt; 构建新的 DOM 元素</p></li>
<li><p>4.2 重新插入新的 DOM 元素</p></li>
</ul>
</li>
<li><p>5 抽象出 Component 类</p></li>
<li><p>6 总结</p></li>
</ul>
<h2 id="articleHeader1">1 前言</h2>
<p>本文会教你如何在 50 行代码内，不依赖任何第三方的库，用纯 JavaScript 实现一个 React.js 。</p>
<p>本文的目的是：揭开对初学者看起来很很难理解的 React.js 的组件化形式的外衣，让你有更多的精力和注意力去学习 React.js 精髓的地方。如果你刚开始学习 React.js 并且感觉很迷茫，那么看完这篇文章以后就能够解除一些疑惑。</p>
<p>另外注意，本文所实现的代码只用于说明教学展示，并不适用于生产环境。代码托管这个 <a href="https://github.com/huzidaha/reactjs-in-40" rel="nofollow noreferrer" target="_blank">仓库</a>  。心急如焚的同学可以先去看代码，但本文会从最基础的内容开始解释。</p>
<h2 id="articleHeader2">2 一切从点赞说起</h2>
<p>接下来所有的代码都会从一个基本的点赞功能开始演化，你会逐渐看到，文章代码慢慢地越来越像 React.js 的组件代码。而在这个过程里面，大家需要只需要跟着文章的思路，就可以在代码的演化当中体会到组件化形式。</p>
<p>假设现在我们需要实现一个点赞、取消点赞的功能。</p>
<p>[image:B4B41FF2-519A-4A7C-8035-0D5CD4EE8FFA-86900-00013723B2CAE361/8D274601-162D-4B36-B1E0-9C65FB0C494F.png]</p>
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
      </div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'wrapper'</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'like-btn'</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'like-text'</span>&gt;</span>点赞<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>?<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>为了现实当中的实际情况，所以这里特易把这个 <code>button</code> 的 HTML 结构搞得稍微复杂一些。有了这个 HTML 结构，现在就给它加入一些 JavaScript 的行为：</p>
<p>JavaScript：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const button = document.querySelector('.like-btn')
  const buttonText = button.querySelector('.like-text')
  let isLiked = false
  button.addEventListener('click', function () {
    isLiked = !isLiked
    if (isLiked) {
      buttonText.innerHTML = '取消'
    } else {
      buttonText.innerHTML = '点赞'
    }
  }, false)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>  const <span class="hljs-selector-tag">button</span> = document.querySelector(<span class="hljs-string">'.like-btn'</span>)
  const buttonText = <span class="hljs-selector-tag">button</span>.querySelector(<span class="hljs-string">'.like-text'</span>)
  let isLiked = false
  <span class="hljs-selector-tag">button</span>.addEventListener(<span class="hljs-string">'click'</span>, function () {
    isLiked = !isLiked
    <span class="hljs-keyword">if</span> (isLiked) {
      buttonText<span class="hljs-selector-class">.innerHTML</span> = <span class="hljs-string">'取消'</span>
    } <span class="hljs-keyword">else</span> {
      buttonText<span class="hljs-selector-class">.innerHTML</span> = <span class="hljs-string">'点赞'</span>
    }
  }, false)</code></pre>
<p>功能和实现都很简单，按钮已经可以提供点赞和取消点赞的功能。这时候你的同事跑过来了，说他很喜欢你的按钮，他也想用你写的这个点赞功能。你就会发现这种实现方式很致命：你的同事要把整个  <code>button</code>  和里面的结构复制过去，还有整段 JavaScript 代码也要复制过去。这样的实现方式没有任何可复用性。</p>
<h2 id="articleHeader3">3 实现可复用性</h2>
<p>所以现在我们来想办法解决这个问题，让这个点赞功能具有较好的可复用的效果，那么你的同事们就可以轻松自在地使用这个点赞功能。</p>
<h3 id="articleHeader4">3.1 结构复用</h3>
<p>现在我们来重新编写这个点赞功能。这次我们先写一个类，这个类有 render 方法，这个方法里面直接返回一个表示 HTML 结构的字符串：</p>
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
      </div><pre class="hljs coffeescript"><code>  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LikeButton</span> {</span>
    render () {
      <span class="hljs-keyword">return</span> `<span class="javascript">
        &lt;button id=<span class="hljs-string">'like-btn'</span>&gt;
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'like-text'</span>&gt;</span>赞<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
          &lt;span&gt;?<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
        &lt;<span class="hljs-regexp">/button&gt;
      </span></span>`
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
      </div><pre class="hljs dart"><code>  <span class="hljs-keyword">const</span> wrapper = <span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">'.wrapper'</span>)
  <span class="hljs-keyword">const</span> likeButton1 = <span class="hljs-keyword">new</span> LikeButton()
  wrapper.innerHTML = likeButton1.render()
  
  <span class="hljs-keyword">const</span> likeButton2 = <span class="hljs-keyword">new</span> LikeButton()
  wrapper.innerHTML += likeButton2.render()</code></pre>
<p>[image:4AEFC6B6-F913-440E-9306-CCC454A7A30C-87312-00013B98FB6F8354/4555573C-8435-4079-9D64-C76913AB6E40.png]</p>
<p>这里非常暴力地使用了 innerHTML ，把两个按钮粗鲁地插入了 wrapper 当中。虽然你可能会对这种实现方式非常不满意，但我们还是勉强了实现了结构的复用。我们后面再来优化它。</p>
<h3 id="articleHeader5">3.2 生成 DOM 元素并且添加事件</h3>
<p>你一定会发现，现在的按钮是死的，你点击它它根本不会有什么反应。因为根本没有往上面添加事件。但是问题来了，<code>LikeButton</code>  类里面是虽然说有一个  <code>button</code>，但是这玩意根本就是在字符串里面的。你怎么能往一个字符串里面添加事件呢？DOM 事件的 API 只有 DOM 结构才能用。</p>
<p>我们需要 DOM 结构，准确地来说：<em>我们需要这个点赞功能的 HTML 字符串代表的 DOM 结构</em>。假设我们现在有一个函数  <code>createDOMFromString</code> ，你往这个函数传入 HTML 字符串，但是它会把相应的 DOM 元素返回给你。这个问题就可以额解决了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ::String => ::Document
const createDOMFromString = (domString) => {
  // TODO 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ::String =&gt; ::Document</span>
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
      </div><pre class="hljs coffeescript"><code>  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LikeButton</span> {</span>
    render () {
      <span class="hljs-keyword">this</span>.el = createDOMFromString(`<span class="javascript">
        &lt;button <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">'like-button'</span>&gt;
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'like-text'</span>&gt;</span>点赞<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
          &lt;span&gt;?<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
        &lt;<span class="hljs-regexp">/button&gt;
      </span></span>`)
      <span class="hljs-keyword">this</span>.el.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'click'</span>), <span class="hljs-literal">false</span>)
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.el
    }
  }</code></pre>
<p>现在  <code>render()</code> 返回的不是一个 html 字符串了，而是一个由这个 html 字符串所生成的 DOM。在返回 DOM 元素之前会先给这个 DOM 元素上添加事件在返回。</p>
<p>因为现在 <code>render</code> 返回的是 DOM 元素，所以不能用 <code>innerHTML</code> 暴力地插入 wrapper。而是要用 DOM API 插进去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const wrapper = document.querySelector('.wrapper')

  const likeButton1 = new LikeButton()
  wrapper.appendChild(likeButton1.render())

  const likeButton2 = new LikeButton()
  wrapper.appendChild(likeButton2.render())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>    <span class="hljs-keyword">const</span> wrapper = <span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">'.wrapper'</span>)

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
      if (this.state.isLiked) {
        likeText.innerHTML = '取消'
      } else {
        likeText.innerHTML = '点赞'
      }
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
      </div><pre class="hljs kotlin"><code>  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LikeButton</span> </span>{
    <span class="hljs-keyword">constructor</span> () {
      <span class="hljs-keyword">this</span>.state = { isLiked: <span class="hljs-literal">false</span> }
    }

    changeLikeText () {
      const likeText = <span class="hljs-keyword">this</span>.el.querySelector(<span class="hljs-string">'.like-text'</span>)
      <span class="hljs-keyword">this</span>.state.isLiked = !<span class="hljs-keyword">this</span>.state.isLiked
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.isLiked) {
        likeText.innerHTML = <span class="hljs-string">'取消'</span>
      } <span class="hljs-keyword">else</span> {
        likeText.innerHTML = <span class="hljs-string">'点赞'</span>
      }
    }

    render () {
      <span class="hljs-keyword">this</span>.el = createDOMFromString(`
        &lt;button <span class="hljs-class"><span class="hljs-keyword">class</span>='<span class="hljs-title">like</span>-<span class="hljs-title">button</span>'&gt;</span>
          &lt;span <span class="hljs-class"><span class="hljs-keyword">class</span>='<span class="hljs-title">like</span>-<span class="hljs-title">text</span>'&gt;点赞&lt;<span class="hljs-type">/span</span>&gt;</span>
          &lt;span&gt;?&lt;/span&gt;
        &lt;/button&gt;
      `)
      <span class="hljs-keyword">this</span>.el.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-keyword">this</span>.changeLikeText.bind(<span class="hljs-keyword">this</span>), <span class="hljs-literal">false</span>)
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.el
    }
  }</code></pre>
<p>这里的代码稍微长了一些，但是还是很好理解。只不过是在给 <code>LikeButton</code> 类添加了构造函数，这个构造函数会给每一个 <code>LikeButton</code> 的实例添加一个对象 <code>state</code>，<code>state</code> 里面保存了每个按钮自己是否点赞的状态。还改写了原来的事件绑定函数：原来只打印  <code>click</code>，现在点击的按钮的时候会调用  <code>changeLikeText</code> 方法，这个方法会根据 <code>this.state</code> 的状态改变点赞按钮的文本。</p>
<p>如果你现在还能跟得上文章的思路，那么你留意下，现在的代码已经和 React.js 的组件代码有点类似了。但其实我们根本没有讲 React.js 的任何内容，我们一心一意只想怎么做好“组件化”。</p>
<p>现在这个组件的可复用性已经很不错了，你的同事们只要实例化一下然后插入到 DOM 里面去就好了。</p>
<h2 id="articleHeader6">4 为什么不暴力一点？</h2>
<p>仔细留意一下  <code>changeLikeText</code> 函数，这个函数包含了 DOM 操作，现在看起来比较简单，那是因为现在只有 <code>isLiked</code> 一个状态。但想一下，因为你的数据状态改变了你就需要去更新页面的内容，所以如果你的组件包含了很多状态，那么你的组件基本全部都是 DOM 操作。一个组件包含很多状态的情况非常常见，所以这里还有优化的空间：如何尽量减少这种手动 DOM 操作？</p>
<h3 id="articleHeader7">4.1 状态改变 -&gt; 构建新的 DOM 元素</h3>
<p>这里要提出的一种解决方案：<em>一旦状态发生改变，就重新调用  <code>render</code>  方法，构建一个新的 DOM 元素</em>。这样做的好处是什么呢？好处就是你可以在 <code>render</code> 方法里面使用最新的 <code>this.state</code> 来构造不同 HTML 结构的字符串，并且通过这个字符串构造不同的 DOM 元素。页面就更新了！听起来有点绕，看看代码怎么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  class LikeButton {
    constructor () {
      this.state = { isLiked: false }
    }

    setState (state) {
      this.state = state
      this.el = this.render()
    }

    changeLikeText () {
      this.setState({
        isLiked: !this.state.isLiked
      })
    }

    render () {
      this.el = createDOMFromString(`
        <button class='like-btn'>
          <span class='like-text'>${this.state.isLiked ? '取消' : '点赞'}</span>
          <span>?</span>
        </button>
      `)
      this.el.addEventListener('click', this.changeLikeText.bind(this), false)
      return this.el
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LikeButton</span> </span>{
    <span class="hljs-keyword">constructor</span> () {
      <span class="hljs-keyword">this</span>.state = { isLiked: <span class="hljs-literal">false</span> }
    }

    setState (state) {
      <span class="hljs-keyword">this</span>.state = state
      <span class="hljs-keyword">this</span>.el = <span class="hljs-keyword">this</span>.render()
    }

    changeLikeText () {
      <span class="hljs-keyword">this</span>.setState({
        isLiked: !<span class="hljs-keyword">this</span>.state.isLiked
      })
    }

    render () {
      <span class="hljs-keyword">this</span>.el = createDOMFromString(`
        &lt;button <span class="hljs-class"><span class="hljs-keyword">class</span>='<span class="hljs-title">like</span>-<span class="hljs-title">btn</span>'&gt;</span>
          &lt;span <span class="hljs-class"><span class="hljs-keyword">class</span>='<span class="hljs-title">like</span>-<span class="hljs-title">text</span>'&gt;$</span>{<span class="hljs-keyword">this</span>.state.isLiked ? <span class="hljs-string">'取消'</span> : <span class="hljs-string">'点赞'</span>}&lt;/span&gt;
          &lt;span&gt;?&lt;/span&gt;
        &lt;/button&gt;
      `)
      <span class="hljs-keyword">this</span>.el.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-keyword">this</span>.changeLikeText.bind(<span class="hljs-keyword">this</span>), <span class="hljs-literal">false</span>)
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.el
    }
  }</code></pre>
<p>其实只是改了几个小地方：</p>
<ol>
<li><p><code>render</code> 函数里面的 HTML 字符串会根据 <code>this.state</code> 不同而不同（这里是用了 ES6 的字符串特性，做这种事情很方便）。</p></li>
<li><p>新增一个 <code>setState</code> 函数，这个函数接受一个对象作为参数；它会设置实例的 <code>state</code>，然后重新调用一下 <code>render</code> 方法。</p></li>
<li><p>当用户点击按钮的时候， <code>changeLikeText</code>  会构建新的 <code>state</code> 对象，这个新的 <code>state</code> ，传入 <code>setState</code> 函数当中。</p></li>
</ol>
<p>这样的结果就是，用户每次点击，<code>changeLikeText</code> 都会调用改变组件状态然后调用 <code>setState</code> ；<code>setState</code> 会调用 <code>render</code> 方法重新构建新的 DOM 元素；<code>render</code> 方法会根据  <code>state</code> 的不同构建不同的 DOM 元素。</p>
<p>也就是说，你只要调用 <code>setState</code>，组件就会重新渲染。我们顺利地消除了没必要的 DOM 操作。</p>
<h3 id="articleHeader8">4.2 重新插入新的 DOM 元素</h3>
<p>上面的改进不会有什么效果，因为你仔细看一下就会发现，其实重新渲染的 DOM 元素并没有插入到页面当中。所以这个组件之外，你需要知道这个组件发生了改变，并且把新的 DOM 元素更新到页面当中。</p>
<p>重新修改一下 <code>setState</code> 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
    setState (state) {
        const oldEl = this.el
      this.state = state
      this.el = this.render()
        if (this.onStateChange) this.onStateChange(oldEl, this.el)
    }
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>...
    <span class="hljs-built_in">set</span>State (<span class="hljs-keyword">state</span>) {
        const oldEl = this.el
      this.<span class="hljs-keyword">state</span> = <span class="hljs-keyword">state</span>
      this.el = this.render()
        if (this.<span class="hljs-keyword">on</span>StateChange) this.<span class="hljs-keyword">on</span>StateChange(oldEl, this.el)
    }
...</code></pre>
<p>使用这个组件的时候：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const likeButton = new LikeButton()
wrapper.appendChild(likeButton.render()) // 第一次插入 DOM 元素
component.onStateChange = (oldEl, newEl) => {
  wrapper.insertBefore(newEl, oldEl) // 插入新的元素
  wrapper.removeChild(oldEl) // 删除旧的元素
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>const likeButton = <span class="hljs-keyword">new</span> <span class="hljs-type">LikeButton</span>()
wrapper.appendChild(likeButton.render()) <span class="hljs-comment">// 第一次插入 DOM 元素</span>
component.onStateChange = (oldEl, <span class="hljs-keyword">new</span><span class="hljs-type">El</span>) =&gt; {
  wrapper.insertBefore(<span class="hljs-keyword">new</span><span class="hljs-type">El</span>, oldEl) <span class="hljs-comment">// 插入新的元素</span>
  wrapper.removeChild(oldEl) <span class="hljs-comment">// 删除旧的元素</span>
}</code></pre>
<p>这里每次 <code>setState</code> 都会调用 <code>onStateChange</code> 方法，而这个方法是实例化以后时候被设置的，所以你可以自定义 <code>onStateChange</code> 的行为。<em>这里做的事是，每当 <code>setState</code> 的时候，就会把插入新的 DOM 元素，然后删除旧的元素，页面就更新了</em>。这里已经做到了进一步的优化了：现在不需要再手动更新页面了。</p>
<p>非一般的暴力。不过没有关系，这种暴力行为可以被 Virtual-DOM 的 diff 策略规避掉，但这不是本文章所讨论的范围。</p>
<p>这个版本的点赞功能很不错，我可以继续往上面加功能，而且还不需要手动操作DOM。但是有一个不好的地方，如果我要重新另外做一个新组件，譬如说评论组件，那么里面的这些 <code>setState</code> 方法要重新写一遍，其实这些东西都可以抽出来。</p>
<h2 id="articleHeader9">5 抽象出 Component 类</h2>
<p>为了让代码更灵活，可以写更多的组件，我把这种模式抽象出来，放到一个 Component 类当中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  class Component {
    constructor (props = {}) {
      this.props = props
    }

    setState (state) {
      const oldEl = this.el
      this.state = state
      this.el = this.renderDOM()
      if (this.onStateChange) this.onStateChange(oldEl, this.el)
    }

    renderDOM () {
      this.el = createDOMFromString(this.render())
      if (this.onClick) {
        this.el.addEventListener('click', this.onClick.bind(this), false)
      }
      return this.el
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span> (props = {}) {
      <span class="hljs-keyword">this</span>.props = props
    }

    setState (state) {
      const oldEl = <span class="hljs-keyword">this</span>.el
      <span class="hljs-keyword">this</span>.state = state
      <span class="hljs-keyword">this</span>.el = <span class="hljs-keyword">this</span>.renderDOM()
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.onStateChange) <span class="hljs-keyword">this</span>.onStateChange(oldEl, <span class="hljs-keyword">this</span>.el)
    }

    renderDOM () {
      <span class="hljs-keyword">this</span>.el = createDOMFromString(<span class="hljs-keyword">this</span>.render())
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.onClick) {
        <span class="hljs-keyword">this</span>.el.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-keyword">this</span>.onClick.bind(<span class="hljs-keyword">this</span>), <span class="hljs-literal">false</span>)
      }
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.el
    }
  }</code></pre>
<p>还有一个额外的  <code>mount</code>  的方法，其实就是把组件的 DOM 元素插入页面，并且在 <code>setState</code> 的时候更新页面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const mount = (wrapper, component) => {
    wrapper.appendChild(component.renderDOM())
    component.onStateChange = (oldEl, newEl) => {
      wrapper.insertBefore(newEl, oldEl)
      wrapper.removeChild(oldEl)
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>  const mount = <span class="hljs-function"><span class="hljs-params">(wrapper, component)</span> =&gt;</span> {
    wrapper.appendChild(component.renderDOM())
    component.onStateChange = <span class="hljs-function"><span class="hljs-params">(oldEl, newEl)</span> =&gt;</span> {
      wrapper.insertBefore(newEl, oldEl)
      wrapper.removeChild(oldEl)
    }
  }</code></pre>
<p>这样的话我们重新写点赞组件就会变成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  class LikeButton extends Component {
    constructor (props) {
      super(props)
      this.state = { isLiked: false }
    }

    onClick () {
      this.setState({
        isLiked: !this.state.isLiked
      })
    }

    render () {
      return `
        <button class='like-btn'>
          <span class='like-text'>${this.props.word || ''} ${this.state.isLiked ? '取消' : '点赞'}</span>
          <span>?</span>
        </button>
      `
    }
  }

  mount(wrapper, new LikeButton({ word: 'hello' }))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LikeButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    constructor (props) {
      <span class="hljs-keyword">super</span>(props)
      <span class="hljs-keyword">this</span>.state = { isLiked: <span class="hljs-literal">false</span> }
    }

    onClick () {
      <span class="hljs-keyword">this</span>.setState({
        isLiked: !<span class="hljs-keyword">this</span>.state.isLiked
      })
    }

    render () {
      <span class="hljs-keyword">return</span> `
        &lt;button <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-symbol">'like</span>-btn'&gt;
          &lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-symbol">'like</span>-text'&gt;${<span class="hljs-keyword">this</span>.props.word || ''} ${<span class="hljs-keyword">this</span>.state.isLiked ? '取消' : '点赞'}&lt;/span&gt;
          &lt;span&gt;?&lt;/span&gt;
        &lt;/button&gt;
      `
    }
  }

  mount(wrapper, <span class="hljs-keyword">new</span> <span class="hljs-type">LikeButton</span>({ word: <span class="hljs-symbol">'hell</span>o' }))</code></pre>
<p>有没有发现你写的代码已经和 React.js 的组件写法很相似了？而且还是可以正常运作的代码，而且我们从头到尾都是用纯的 JavaScript，没有依赖任何第三方库。（注意这里加入了上面没有提到过点  <code>props</code>，可以给组件传入配置属性，跟 React.js 一样）。</p>
<p>只要有了上面那个 <code>Component</code> 类和 <code>mount</code> 方法加起来不足40行代码就可以做到组件化。如果我们需要写另外一个组件，只需要像上面那样，简单地继承一下  <code>Component</code> 类就好了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  class RedBlueButton extends Component {
    constructor (props) {
      super(props)
      this.state = {
        color: 'red'
      }
    }

    onClick () {
      this.setState({
        color: 'blue'
      })
    }

    render () {
      return `
        <div style='color: ${this.state.color};'>${this.state.color}</div>
      `
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">RedBlueButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    constructor (props) {
      <span class="hljs-keyword">super</span>(props)
      <span class="hljs-keyword">this</span>.state = {
        color: <span class="hljs-symbol">'re</span>d'
      }
    }

    onClick () {
      <span class="hljs-keyword">this</span>.setState({
        color: <span class="hljs-symbol">'blu</span>e'
      })
    }

    render () {
      <span class="hljs-keyword">return</span> `
        &lt;div style=<span class="hljs-symbol">'color</span>: ${<span class="hljs-keyword">this</span>.state.color};'&gt;${<span class="hljs-keyword">this</span>.state.color}&lt;/div&gt;
      `
    }
  }</code></pre>
<p>简单好用，完整的代码可以在这里找到： <a href="https://github.com/huzidaha/reactjs-in-40" rel="nofollow noreferrer" target="_blank">仓库</a> </p>
<p>噢，忘了，还有一个神秘的 <code>createDOMFromString</code>，其实它更简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const createDOMFromString = (domString) => {
    const div = document.createElement('div')
    div.innerHTML = domString
    return div
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>  const createDOMFromString = (domString) =&gt; {
    const <span class="hljs-selector-tag">div</span> = document.createElement(<span class="hljs-string">'div'</span>)
    <span class="hljs-selector-tag">div</span><span class="hljs-selector-class">.innerHTML</span> = domString
    return <span class="hljs-selector-tag">div</span>
  }</code></pre>
<h2 id="articleHeader10">6 总结</h2>
<p>你到底从文章能从文章中获取到什么？</p>
<p>好吧，我承认我标题党了，这个 40 行不到的代码其实是一个残废而且智障版的 React.js，没有 JSX ，没有组件嵌套等等。它只是 React.js 组件化表现形式的一种实现而已。它根本没有触碰到 React.js 的精髓。</p>
<p>其实 React.js 的最最精髓的地方可能就在于它的 Virtual DOM 算法，而它的  <code>setState</code> 、<code>props</code> 等等都只不过是一种形式，而很多初学者会被它这种形式作迷惑。<em>本篇文章其实就是揭露了这种组件化形式的实现原理。如果你正在学习或者学习 React.js 过程很迷茫，那么看完这篇文章以后就能够解除一些疑惑。</em></p>
<p>本文并没有涉及到 Virtual DOM 的任何内容，有需要的同学可以参考一下这篇<a href="https://github.com/livoras/blog/issues/13" rel="nofollow noreferrer" target="_blank">博客</a> ，介绍的很详尽。有兴趣的同学可以把两者结合起来，把 Virtual DOM 替代本文暴力处理的 <code>mount</code> 中的实现，真正实现一个 React.js。</p>
<p>如果你对本文的内容有疑惑，可以关注我的<a href="https://zhuanlan.zhihu.com/qianduandaha" rel="nofollow noreferrer" target="_blank">知乎专栏</a>并且评论或者给我知乎发私信。</p>
<hr>
<p>我最近正在写一本<a href="http://huziketang.com/books/react/" rel="nofollow noreferrer" target="_blank">《React.js 小书》</a>，对 React.js 感兴趣的童鞋，<a href="http://huziketang.com/books/react/" rel="nofollow noreferrer" target="_blank">欢迎指点</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
40 行代码内实现一个 React.js

## 原文链接
[https://segmentfault.com/a/1190000008472941](https://segmentfault.com/a/1190000008472941)

