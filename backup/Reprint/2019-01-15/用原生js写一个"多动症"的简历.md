---
title: '用原生js写一个"多动症"的简历' 
date: 2019-01-15 2:30:12
hidden: true
slug: co5ryhdfy5a
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">用原生js写一个"多动症"的简历</h2>
<p><a href="https://qianlongo.github.io/resume-native/dist/" rel="nofollow noreferrer" target="_blank">预览地址</a><br><a href="https://github.com/qianlongo/resume-native" rel="nofollow noreferrer" target="_blank">源码地址</a></p>
<blockquote><p>最近在知乎上看到@方应杭用vue写了一个<a href="https://zhuanlan.zhihu.com/p/25541520" rel="nofollow noreferrer" target="_blank">会动的简历</a>，觉得挺好玩的，研究一下其实现思路，决定试试用原生js来实现。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009269324?w=800&amp;h=450" src="https://static.alili.tech/img/remote/1460000009269324?w=800&amp;h=450" alt="http://odssgnnpf.bkt.clouddn.com/return.gif" title="http://odssgnnpf.bkt.clouddn.com/return.gif" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">会动的简历实现思路</h2>
<blockquote><p>这张会<code>动</code>的简历，就好像一个打字员在不断地录入文字，页面呈现动态效果。又好像一个早已经录制好影片，而我们只是坐在放映机前观看。</p></blockquote>
<p><strong>原理分两个部分</strong></p>
<ol>
<li><p>页面能看见的不断跳动着的增加的文字，由innerHTML控制</p></li>
<li><p>页面的布局效果由藏在"背后的"<code>style</code>标签完成</p></li>
</ol>
<p><strong>想象一下你要往一张网页每间隔0.1秒增加一个<code>啊</code>字，是不是开个定时器，间断地往body里面塞<code>啊</code>，就可以啊！没错，做到这一步就完成了原理的第一部分</strong></p>
<p><strong>再想象一下，在往页面里面塞<code>啊</code>的时候，我还想改变啊字的字体颜色以及网页背景颜色，那应该怎么做呢，是不是执行下面的代码就可以呢，没错，只不过更改字体和背景色不是突然改变的，而是也是开个定时器，间断地往<code>style</code>标签中塞入以下代码，这样就完成了原理的第二步，是不是好简单 ???， 接下来让我们一步步完成它</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".xxx{
  color: blue;
  background: red; 
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="style"><span class="hljs-selector-class">.xxx</span>{
  <span class="hljs-attribute">color</span>: blue;
  <span class="hljs-attribute">background</span>: red; 
}
</code></pre>
<h2 id="articleHeader2">项目搭建</h2>
<blockquote><p>在这个项目中我们</p></blockquote>
<ol>
<li><p>使用webpack2来完成项目的构建</p></li>
<li><p>使用yarn来处理依赖包的管理</p></li>
<li><p>使用es6的写法</p></li>
<li><p>使用部分原生dom操作api</p></li>
<li><p>standard.js(代码风格约束利器)</p></li>
</ol>
<p>目录结构如下</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009269325?w=1096&amp;h=1338" src="https://static.alili.tech/img/remote/1460000009269325?w=1096&amp;h=1338" alt="目录结构" title="目录结构" style="cursor: pointer;"></span></p>
<p>最重要的几个模块分别是<code>resumeEditor(简历编辑模块)</code> 、 <code>stylesEditor(简历样式编辑模块)</code> 、 <code>以及vQuery(封装的dom操作模块)</code><br>最后<code>app.js(入口模块)</code>再将几个模块的功能结合起来完成整个项目。</p>
<h2 id="articleHeader3">vQuery(封装的dom操作模块)</h2>
<blockquote><p>因为后面的几个模块都要依赖这个小模块，所以我们先简单的看下。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Vquery {
  constructor (selector, context) {
    this.elements = getEles(selector, context)
  }

  optimizeCb (callback) {
    ...
  }

  get (index) {
    ...
  }

  html (sHtml) {
    ...
  }

  addClass (iClass) {
    ...
  }

  css (styles) {
    ...
  }

  height (h) {
    ...
  }

  scrollTop (top) {
    ...
  }
}

export default (selector, context) => {
  return new Vquery(selector, context)
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Vquery</span> </span>{
  <span class="hljs-keyword">constructor</span> (selector, context) {
    <span class="hljs-keyword">this</span>.elements = getEles(selector, context)
  }

  optimizeCb (callback) {
    ...
  }

  get (index) {
    ...
  }

  html (sHtml) {
    ...
  }

  addClass (iClass) {
    ...
  }

  css (styles) {
    ...
  }

  height (h) {
    ...
  }

  scrollTop (top) {
    ...
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (selector, context) =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Vquery(selector, context)
}

</code></pre>
<p><strong>可以看出它做的事就是封装一个构造函数Vquery，它的实例会有一些简单的dom操作方法，最后为了能够像jQuery那样使用$().funcName的形式去使用，我们导出了一个匿名函数，在匿名函数中去new Vquery</strong></p>
<h3 id="articleHeader4">stylesEditor(简历样式编辑模块)</h3>
<blockquote><p>简历所展现的布局效果都是由这个模块完成的,核心方法是showStyles。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const showStyles = (num, callback) => {
  let style = styles[num]
  let length
  let prevLength

  if (!style) {
    return
  }

  length = styles.filter((item, i) => { // 计算数组styles前n个元素的长度
    return i <= num
  }).reduce((result, item) => {
    result += item.length
    return result
  }, 0)

  prevLength = length - style.length

  clearInterval(timer)
  timer = setInterval(() => {
    let start = currentStyle.length - prevLength
    let char = style.substring(start, start + 1) || ''
    currentStyle += char
    if (currentStyle.length === length) { // 数组styles前n个元素已经全部塞入，则关闭定时器，并且执行外面传进来的回调，进而执行下一步操作
      clearInterval(timer)
      callback &amp;&amp; callback()
    } else {
      let top = $stylePre.height() - MAX_HEIGHT
      if (top > 0) { // 当塞入的内容已经超过了容器的高度，我们需要设置一下滚动距离才方便演示接下来的内容
        goBottom(top)
      }
      $style.html(currentStyle)
      $stylePre.html(Prism.highlight(currentStyle, Prism.languages.css))
    }
  }, delay)
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> showStyles = <span class="hljs-function">(<span class="hljs-params">num, callback</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> style = styles[num]
  <span class="hljs-keyword">let</span> length
  <span class="hljs-keyword">let</span> prevLength

  <span class="hljs-keyword">if</span> (!style) {
    <span class="hljs-keyword">return</span>
  }

  length = styles.filter(<span class="hljs-function">(<span class="hljs-params">item, i</span>) =&gt;</span> { <span class="hljs-comment">// 计算数组styles前n个元素的长度</span>
    <span class="hljs-keyword">return</span> i &lt;= num
  }).reduce(<span class="hljs-function">(<span class="hljs-params">result, item</span>) =&gt;</span> {
    result += item.length
    <span class="hljs-keyword">return</span> result
  }, <span class="hljs-number">0</span>)

  prevLength = length - style.length

  clearInterval(timer)
  timer = setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> start = currentStyle.length - prevLength
    <span class="hljs-keyword">let</span> char = style.substring(start, start + <span class="hljs-number">1</span>) || <span class="hljs-string">''</span>
    currentStyle += char
    <span class="hljs-keyword">if</span> (currentStyle.length === length) { <span class="hljs-comment">// 数组styles前n个元素已经全部塞入，则关闭定时器，并且执行外面传进来的回调，进而执行下一步操作</span>
      clearInterval(timer)
      callback &amp;&amp; callback()
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">let</span> top = $stylePre.height() - MAX_HEIGHT
      <span class="hljs-keyword">if</span> (top &gt; <span class="hljs-number">0</span>) { <span class="hljs-comment">// 当塞入的内容已经超过了容器的高度，我们需要设置一下滚动距离才方便演示接下来的内容</span>
        goBottom(top)
      }
      $style.html(currentStyle)
      $stylePre.html(Prism.highlight(currentStyle, Prism.languages.css))
    }
  }, delay)
}

</code></pre>
<h2 id="articleHeader5">stylesEditor(简历样式编辑模块)</h2>
<blockquote><p>简历编辑模块用来展示简历内容，主要会经历由markdown格式往html页面形式的转换。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const markdownToHtml = (callback) => {
  $resumeMarkdown.css({
    display: 'none'
  })
  $resumeWrap.addClass(iClass)
  $resumetag.html(marked(resumeMarkdown)) // 借助marked工具将markdown转化为html
  callback &amp;&amp; callback() // 执行后续的回调
}

const showResume = (callback) => { // 原理基本上同stylesEditor， 不断地往简历编辑的容器中塞入事先准备好的简历内容，当全部塞入的时候再关闭定时器，并执行后续的回调操作
  clearInterval(timer)
  timer = setInterval(() => {
    currentMarkdown += resumeMarkdown.substring(start, start + 1)
    if (currentMarkdown.length === length) {
      clearInterval(timer)
      callback &amp;&amp; callback()
    } else {
      $resumeMarkdown.html(currentMarkdown)
      start++
    }
  }, delay)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">const</span> markdownToHtml = (callback) =&gt; {
  $resumeMarkdown.css({
    display: <span class="hljs-string">'none'</span>
  })
  $resumeWrap.addClass(iClass)
  $resumetag.html(marked(resumeMarkdown)) <span class="hljs-comment">// 借助marked工具将markdown转化为html</span>
  callback &amp;&amp; callback() <span class="hljs-comment">// 执行后续的回调</span>
}

<span class="hljs-keyword">const</span> showResume = (callback) =&gt; { <span class="hljs-comment">// 原理基本上同stylesEditor， 不断地往简历编辑的容器中塞入事先准备好的简历内容，当全部塞入的时候再关闭定时器，并执行后续的回调操作</span>
  clearInterval(timer)
  timer = setInterval(() =&gt; {
    currentMarkdown += resumeMarkdown.substring(start, start + <span class="hljs-number">1</span>)
    <span class="hljs-keyword">if</span> (currentMarkdown.length === length) {
      clearInterval(timer)
      callback &amp;&amp; callback()
    } <span class="hljs-keyword">else</span> {
      $resumeMarkdown.html(currentMarkdown)
      start++
    }
  }, delay)
}
</code></pre>
<h2 id="articleHeader6">app(入口模块)</h2>
<blockquote><p>最后由app入口模块将以上几个模块整合完成项目的功能，我们找出其中的核心代码来, ?，你没看错，传说中的回调地狱，亮瞎了我的狗眼啊。想必大家和我一样都是不愿意看到这坨恶心的代码的，但对于处理异步问题，回调又的确是一直以来的解决方案之一。</p></blockquote>
<p><strong>因为定时器的操作是异步行为，而我们的简历生成过程会涉及到多个异步操作，所以为了看到如首页预览链接的效果，必须等前一个步骤完成之后，才能执行下一步步骤，这里首先使用的回调函数的解决方案，大家可以从github上拉取代码，分别切换以下几个分支来查看不同的解决方案</strong></p>
<ol>
<li><p>master(使用回调函数处理)</p></li>
<li><p>promise(使用promise处理)</p></li>
<li><p>generator-thunk(使用generator + thunk函数处理)</p></li>
<li><p>generator-promise(使用generator + promise处理)</p></li>
<li><p>async(使用async处理)</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009269326?w=472&amp;h=274" src="https://static.alili.tech/img/remote/1460000009269326?w=472&amp;h=274" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="showStyles(0, () => {
  showResume(() => {
    showStyles(1, () => {
      markdownToHtml(() => {
        showStyles(2)
      })
    })
  })
})

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">showStyles(<span class="hljs-number">0</span>, () =&gt; {
  showResume(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    showStyles(<span class="hljs-number">1</span>, () =&gt; {
      markdownToHtml(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        showStyles(<span class="hljs-number">2</span>)
      })
    })
  })
})

</code></pre>
<h2 id="articleHeader7">解决回调地狱之promise</h2>
<blockquote><p>回调方式能够解决异步操作问题，但是代码写起来非常的不美观，可读性差，代码呈横向发展趋势...伟大的程序员们开疆扩土发明了promise的解决方案。我们来看一下promise分支中app模块最终的写法</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="showStylesWrap(0)
  .then(showResumeWrap)
  .then(showStylesWrap.bind(null, 1))
  .then(markdownToHtmlWrap)
  .then(showStylesWrap.bind(null, 2))
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">showStylesWrap(<span class="hljs-number">0</span>)
  .then(showResumeWrap)
  .then(showStylesWrap.bind(<span class="hljs-literal">null</span>, <span class="hljs-number">1</span>))
  .then(markdownToHtmlWrap)
  .then(showStylesWrap.bind(<span class="hljs-literal">null</span>, <span class="hljs-number">2</span>))
</code></pre>
<p><strong>可以看到，代码清爽了很多，纵向发展，应用第一步第二步第三步...一眼就能够看出来，当然实现的逻辑是将原来的相关的模块用Promise包装起来，并且在原来回调函数执行的地方resolve即可，详细实现，欢迎查看项目源码</strong></p>
<h2 id="articleHeader8">解决回调地狱之generator-thunk，generator-promise</h2>
<blockquote><p>两种方式比较类似，都要用到es6中的generator。关于什么是generator，thunk函数，可以查看软大神关于<a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">ECMAScript 6 入门</a>,这里简要地讲述一下，其如何处理异步操作问题使得可以将异步行为写起来如同步般爽。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function timeOut1 () {
  setTimeout(() => {
    console.log(1111)
  }, 1000)
}

function timeOut2 () {
  setTimeout(() => {
    console.log(2222)
  }, 200)
}

function * gen () {
  yield timeOut1()
  yield timeOut2()
}

let g = gen()
g.next()
g.next()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeOut1</span> (<span class="hljs-params"></span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1111</span>)
  }, <span class="hljs-number">1000</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeOut2</span> (<span class="hljs-params"></span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2222</span>)
  }, <span class="hljs-number">200</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> * <span class="hljs-title">gen</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> timeOut1()
  <span class="hljs-keyword">yield</span> timeOut2()
}

<span class="hljs-keyword">let</span> g = gen()
g.next()
g.next()</code></pre>
<p><strong>上面的代码在过了200毫秒会log出2222，过了1秒钟之后log出1111</strong></p>
<p>这，要?了，你不是说generator写起来同步可以解决异步问题吗，为毛这里timeOut2没有在timeOut1之后执行呢，毕竟gen函数中看起来是希望这样的嘛。</p>
<p>其实不然，timeOut2啥时候执行取决于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="g.next()
g.next()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">g.next()
g.next()
</code></pre>
<p>试想两个函数几乎同时执行，那在定时器中当然是200毫秒后的timeOut2先打印出2222来，但是有没有办法，让timeOut2在timeOut1后执行呢？答案是有的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function timeOut1 () {
  setTimeout(() => {
    console.log(1111)
    g.next()
  }, 1000)
}

function timeOut2 () {
  setTimeout(() => {
    console.log(2222)
  }, 200)
}

function * gen () {
  yield timeOut1()
  yield timeOut2()
}

let g = gen()
g.next()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeOut1</span> (<span class="hljs-params"></span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1111</span>)
    g.next()
  }, <span class="hljs-number">1000</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeOut2</span> (<span class="hljs-params"></span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2222</span>)
  }, <span class="hljs-number">200</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> * <span class="hljs-title">gen</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> timeOut1()
  <span class="hljs-keyword">yield</span> timeOut2()
}

<span class="hljs-keyword">let</span> g = gen()
g.next()
</code></pre>
<p>可以看到我们在timeOut1执行完成之后，再将指针指向下一个位置，即timeOut2再去执行，这样的结果就和gen函数中两个yield的写起来同步感觉一样了。但是含有一个问题，如果涉及到很多个异步操作，我们是很难通过上面的方式将异步流程管理起来的。于是我们需要做下面一件事</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function co (fn) {
  var gen = fn();

  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next); // thunk和promise不同地方之一在这里， promise是result.value.then(next)
  }

  next();
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">co</span> (<span class="hljs-params">fn</span>) </span>{
  <span class="hljs-keyword">var</span> gen = fn();

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params">err, data</span>) </span>{
    <span class="hljs-keyword">var</span> result = gen.next(data);
    <span class="hljs-keyword">if</span> (result.done) <span class="hljs-keyword">return</span>;
    result.value(next); <span class="hljs-comment">// thunk和promise不同地方之一在这里， promise是result.value.then(next)</span>
  }

  next();
}
</code></pre>
<p>内部的next函数就是 thunk 的回调函数。next函数先将指针移到 generator 函数的下一步（gen.next方法），然后判断 generator 函数是否结束（result.done属性），如果没结束，就将next函数再传入 thunk 函数（result.value属性），否则就直接退出。</p>
<p><strong>最后我们在看一下通过co函数的写法完成上面的例子</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function timeOut1() {
  return (callback) => {
    setTimeout(() => {
      console.log(1111)
      callback()
    }, 1000)
  }

}

function timeOut2() {
  return (callback) => {
    setTimeout(() => {
      console.log(2222)
      callback()
    }, 200)
  }
}

function co(fn) {
  var gen = fn();

  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next); // thunk和promise不同地方之一在这里， promise是result.value.then(next)
  }

  next();
}

co(function * () {
  yield timeOut1()
  yield timeOut2()
})

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeOut1</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">callback</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1111</span>)
      callback()
    }, <span class="hljs-number">1000</span>)
  }

}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeOut2</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">callback</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2222</span>)
      callback()
    }, <span class="hljs-number">200</span>)
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">co</span>(<span class="hljs-params">fn</span>) </span>{
  <span class="hljs-keyword">var</span> gen = fn();

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params">err, data</span>) </span>{
    <span class="hljs-keyword">var</span> result = gen.next(data);
    <span class="hljs-keyword">if</span> (result.done) <span class="hljs-keyword">return</span>;
    result.value(next); <span class="hljs-comment">// thunk和promise不同地方之一在这里， promise是result.value.then(next)</span>
  }

  next();
}

co(<span class="hljs-function"><span class="hljs-keyword">function</span> * (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> timeOut1()
  <span class="hljs-keyword">yield</span> timeOut2()
})

</code></pre>
<h2 id="articleHeader9">解决回调地狱之async</h2>
<blockquote><p>async其实就是generator函数的语法糖。大家如果把generator弄明白了，使用它一定不再话下，关于这个项目的用法，欢迎查看async分支源代码，这里不再赘述。</p></blockquote>
<h2 id="articleHeader10">尾述</h2>
<blockquote><p>本文中可能存在阐述不当的地方，欢迎大家指正。???，最后点个赞，点个star好不好呀。</p></blockquote>
<p><a href="https://github.com/qianlongo/resume-native" rel="nofollow noreferrer" target="_blank">源码地址</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用原生js写一个"多动症"的简历

## 原文链接
[https://segmentfault.com/a/1190000009269321](https://segmentfault.com/a/1190000009269321)

