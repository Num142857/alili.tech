---
title: 'JS 中的闭包是什么？' 
date: 2018-12-18 2:30:11
hidden: true
slug: wkhb4hakuk
categories: [reprint]
---

{{< raw >}}

                    
<p>本文为<a href="https://jirengu.com" rel="nofollow noreferrer" target="_blank">饥人谷讲师方方</a>原创文章，首发于 <a href="https://zhuanlan.zhihu.com/study-fe" rel="nofollow noreferrer" target="_blank">前端学习指南</a>。</p>
<p>大名鼎鼎的闭包！面试必问。<br>请用自己的话简述</p>
<ol>
<li>什么是「闭包」。</li>
<li>「闭包」的作用是什么。</li>
</ol>
<h2 id="articleHeader0">首先来简述什么是闭包</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012785217?w=689&amp;h=394" src="https://static.alili.tech/img/remote/1460000012785217?w=689&amp;h=394" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>假设上面三行代码在一个立即执行函数中（为简明起见，我就不写立即执行函数了，影响读者理解）。</p>
<p>评论里没看完就说我写得有问题的，请看清楚哦：</p>
<p>上面三行代码在一个立即执行函数中。</p>
<p>三行代码中，有一个局部变量 local，有一个函数 foo，foo 里面可以访问到 local 变量。</p>
<p>好了这就是一个闭包：</p>
<p><strong>「函数」和「函数内部能访问到的变量」（也叫环境）的总和，就是一个闭包。</strong></p>
<p>就这么简单。</p>
<p>有的同学就疑惑了，闭包这么简单么？</p>
<p>「我听说闭包是需要函数套函数，然后 return 一个函数的呀！」</p>
<p>比如这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
  var local = 1
  function bar(){
    local++
    return local
  }
  return bar
}

var func = foo()
func()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>function foo(){
  var <span class="hljs-keyword">local</span> = <span class="hljs-number">1</span>
  function bar(){
    <span class="hljs-keyword">local</span>++
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">local</span>
  }
  <span class="hljs-keyword">return</span> bar
}

var <span class="hljs-function"><span class="hljs-keyword">func</span> = <span class="hljs-title">foo</span><span class="hljs-params">()</span></span>
<span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span></span></code></pre>
<p>这里面确实有闭包，local 变量和 bar 函数就组成了一个闭包（Closure）。</p>
<p><strong>为什么要函数套函数呢？</strong></p>
<p>是因为需要局部变量，所以才把 local 放在一个函数里，如果不把 local 放在一个函数里，local 就是一个全局变量了，达不到使用闭包的目的——隐藏变量（等会会讲）。</p>
<p>这也是为什么我上面要说「运行在一个立即执行函数中」。</p>
<p>有些人看到「闭包」这个名字，就一定觉得要用什么包起来才行。其实这是翻译问题，闭包的原文是 Closure，跟「包」没有任何关系。</p>
<p>所以函数套函数只是为了造出一个局部变量，跟闭包无关。</p>
<p><strong>为什么要 return bar 呢？</strong></p>
<p>因为如果不 return，你就无法使用这个闭包。把 return bar 改成 window.bar = bar 也是一样的，只要让外面可以访问到这个 bar 函数就行了。</p>
<p>所以 return bar 只是为了 bar 能被使用，也跟闭包无关。</p>
<h2 id="articleHeader1">闭包的作用</h2>
<p>闭包常常用来「间接访问一个变量」。换句话说，「隐藏一个变量」。</p>
<p>假设我们在做一个游戏，在写其中关于「还剩几条命」的代码。<br>如果不用闭包，你可以直接用一个全局变量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.lives = 30 // 还有三十条命" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">window<span class="hljs-selector-class">.lives</span> = <span class="hljs-number">30</span> <span class="hljs-comment">// 还有三十条命</span></code></pre>
<p>这样看起来很不妥。万一不小心把这个值改成 -1 了怎么办。所以我们不能让别人「直接访问」这个变量。怎么办呢？</p>
<p>用局部变量。</p>
<p>但是用局部变量别人又访问不到，怎么办呢？</p>
<p>暴露一个访问器（函数），让别人可以「间接访问」。</p>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="!function(){

  var lives = 50

  window.奖励一条命 = function(){
    lives += 1
  }

  window.死一条命 = function(){
    lives -= 1
  }

}()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>!<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

  <span class="hljs-keyword">var</span> lives = <span class="hljs-number">50</span>

  <span class="hljs-built_in">window</span>.奖励一条命 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    lives += <span class="hljs-number">1</span>
  }

  <span class="hljs-built_in">window</span>.死一条命 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    lives -= <span class="hljs-number">1</span>
  }

}()</code></pre>
<p>简明起见，我用了中文 :)</p>
<p>那么在其他的 JS 文件，就可以使用 window.奖励一条命() 来涨命，使用 window.死一条命() 来让角色掉一条命。</p>
<p>看到闭包在哪了吗？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012785218?w=720&amp;h=397" src="https://static.alili.tech/img/remote/1460000012785218?w=720&amp;h=397" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">闭包到底是什么？</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012785219?w=720&amp;h=452" src="https://static.alili.tech/img/remote/1460000012785219?w=720&amp;h=452" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>五年前，我也被这个问题困扰，于是去搜了 stackoverflow 并总结下来。你在百度搜闭包，那篇《JavaScript闭包——懂不懂由你，反正我是懂了》就是我写的。当时我还是新手，一直不理解为什么大家口中的闭包这么模糊、这么琢磨不定呢。<br>我们重新来审视一下闭包的代码：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012785220?w=689&amp;h=394" src="https://static.alili.tech/img/remote/1460000012785220?w=689&amp;h=394" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>第一句是变量声明，第二句是函数声明，第三句是 console.log。<br>每一句我都学过，为什么合起来我就看不出来是闭包？</p>
<p>我告诉你答案，你根本不需要知道闭包这个概念，一样可以使用闭包！</p>
<p>闭包是 JS 函数作用域的副产品。</p>
<p>换句话说，正是由于 JS 的函数内部可以使用函数外部的变量，所以这段代码正好符合了闭包的定义。而不是 JS 故意要使用闭包。</p>
<p>很多编程语言也支持闭包，另外有一些语言则不支持闭包。</p>
<p>只要你懂了 JS 的作用域，你自然而然就懂了闭包，即使你不知道那就是闭包！</p>
<h2 id="articleHeader3">所谓闭包的作用</h2>
<p>如果我们在写代码时，根本就不知道闭包，只是按照自己的意图写，最后，发现满足了闭包的定义。</p>
<p>那么请问，这算是闭包的作用吗？</p>
<p>这个问题，留给你思考。</p>
<h2 id="articleHeader4">关于闭包的谣言</h2>
<p>闭包会造成内存泄露？</p>
<p>错。</p>
<p>说这话的人根本不知道什么是内存泄露。内存泄露是指你用不到（访问不到）的变量，依然占居着内存空间，不能被再次利用起来。</p>
<p>闭包里面的变量明明就是我们需要的变量（lives），凭什么说是内存泄露？</p>
<p>这个谣言是如何来的？</p>
<p>因为 IE。IE 有 bug，IE 在我们使用完闭包之后，依然回收不了闭包里面引用的变量。</p>
<p>这是 IE 的问题，不是闭包的问题。参见司徒正美的<a href="http://www.cnblogs.com/rubylouvre/p/3345294.html" rel="nofollow noreferrer" target="_blank">这篇文章</a>。</p>
<h2 id="articleHeader5">一个小经验</h2>
<p>编程界崇尚以简洁优雅唯美，很多时候</p>
<p>如果你觉得一个概念很复杂，那么很可能是你理解错了。</p>
<p>完。</p>
<p>加微信号: astak10或者长按识别下方二维码进入前端技术交流群 ，暗号：写代码啦</p>
<p>每日一题，每周资源推荐，精彩博客推荐，工作、笔试、面试经验交流解答，免费直播课，群友轻分享... ，数不尽的福利免费送</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012605904?w=200&amp;h=200" src="https://static.alili.tech/img/remote/1460000012605904?w=200&amp;h=200" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS 中的闭包是什么？

## 原文链接
[https://segmentfault.com/a/1190000012785212](https://segmentfault.com/a/1190000012785212)

