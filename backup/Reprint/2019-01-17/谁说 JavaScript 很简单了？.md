---
title: '谁说 JavaScript 很简单了？' 
date: 2019-01-17 2:30:25
hidden: true
slug: wbtiznqt8tj
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000009024651?w=500&amp;h=373" src="https://static.alili.tech/img/remote/1460000009024651?w=500&amp;h=373" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote>
<p>本文作者：Aurélien Hervé <br>编译：<a href="https://www.zhihu.com/people/hu-zi-da-ha" rel="nofollow noreferrer" target="_blank">胡子大哈</a> </p>
<p>翻译原文：<a href="http://huziketang.com/blog/posts/detail?postId=58e06b98a58c240ae35bb8dd" rel="nofollow noreferrer" target="_blank">http://huziketang.com/blog/posts/detail?postId=58e06b98a58c240ae35bb8dd</a>  <br>英文连接：<a href="https://hackernoon.com/who-said-javascript-easy-f4a1d5b399b8#.pq7pap6gh" rel="nofollow noreferrer" target="_blank">Who said javascript was easy ?</a></p>
</blockquote>
<p><strong>转载请注明出处，保留原文链接以及作者信息</strong></p>
<p>本文介绍了 JavaScript 初学者应该知道的一些技巧和陷阱。如果你是老司机，就当做回顾了，哪里有写的不好的地方欢迎指出。</p>
<h2 id="articleHeader0">1. 你是否尝试过对一个数字数组进行排序呢？</h2>
<p>JavaScript 中的 <code>sort()</code> 默认是按字母排序的。所以比如你这样 <code>[1,2,5,10].sort()</code>，会输出 <code>[1,10,2,5]</code>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009024652?w=497&amp;h=400" src="https://static.alili.tech/img/remote/1460000009024652?w=497&amp;h=400" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>正确的排序可以使用 <code>[1,2,5,10].sort((a, b) =&gt; a — b)</code>。</p>
<p>是不是很简单，这个知识点是告诉你第一种方式排序是有问题的。</p>
<h2 id="articleHeader1">2. new Date() 很好用</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009024653?w=495&amp;h=211" src="https://static.alili.tech/img/remote/1460000009024653?w=495&amp;h=211" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><code>new Date()</code> 可以接收：</p>
<ul>
<li><p>无参数：返回当前时间；</p></li>
<li><p>1 个参数 x：返回 1970 年 1 月 1 日 + x 毫秒时间。Unix 的小伙伴知道为什么是这样；</p></li>
<li><p>new Date(1,1,1) 返回 1901 年 2 月 1 日：第一个 “1” 代表 1900 年以后的第 1 年；第二个 “1” 代表这一年的第 <strong>2</strong> 个月（并不是像你想象的那样从 1 月开始）；第三个 “1” 代表这个月的第 1 天（这个确实是如你想象的那样从 1 开始）。</p></li>
<li><p>new Date(2017,1,1) ：这并不是表示 1900 + 2017了，它就是表示 2017 年 1 月 1 日。</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009024654?w=640&amp;h=315" src="https://static.alili.tech/img/remote/1460000009024654?w=640&amp;h=315" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">3. 替换，实际上并没有替换</h2>
<p>对于原始串不被替换掉，我是双手赞同的，我不喜欢一个函数的输入总是在变化。另外你应该知道 <code>replace</code> 只会替换第一个匹配上的字符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let s = &quot;bob&quot;
    const replaced = s.replace('b', 'l')
    replaced === &quot;lob&quot; // 只替换第一个匹配上的
    s === &quot;bob&quot; // 原始串始终没变" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-keyword">let</span> s = <span class="hljs-string">"bob"</span>
    <span class="hljs-keyword">const</span> replaced = s.replace(<span class="hljs-string">'b'</span>, <span class="hljs-string">'l'</span>)
    replaced === <span class="hljs-string">"lob"</span> <span class="hljs-comment">// 只替换第一个匹配上的</span>
    s === <span class="hljs-string">"bob"</span> <span class="hljs-comment">// 原始串始终没变</span></code></pre>
<p>如果你想替换所有的，那就是用正则符 <code>/g</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &quot;bob&quot;.replace(/b/g, 'l') === 'lol' // 替换所有串" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;">    <span class="hljs-string">"bob"</span>.replace(<span class="hljs-regexp">/b/g</span>, <span class="hljs-string">'l'</span>) === <span class="hljs-string">'lol'</span> <span class="hljs-comment">// 替换所有串</span></code></pre>
<h2 id="articleHeader3">4. 小心使用比较</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // These are ok
    'abc' === 'abc' // true
    1 === 1         // true
    
    // These are not
    [1,2,3] === [1,2,3] // false
    {a: 1} === {a: 1}   // false
    {} === {}           // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-comment">// These are ok</span>
    <span class="hljs-string">'abc'</span> === <span class="hljs-string">'abc'</span> <span class="hljs-comment">// true</span>
    <span class="hljs-number">1</span> === <span class="hljs-number">1</span>         <span class="hljs-comment">// true</span>
    
    <span class="hljs-comment">// These are not</span>
    [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>] === [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>] <span class="hljs-comment">// false</span>
    {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>} === {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>}   <span class="hljs-comment">// false</span>
    {} === {}           <span class="hljs-comment">// false</span></code></pre>
<p>原因：[1,2,3] 和 [1,2,3] 是两个数组，它们只是恰巧值相等罢了，他们的引用是不同的，所以不能用简单的 <code>===</code> 来比较。</p>
<h2 id="articleHeader4">5. 数组不是原始类型</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    typeof {} === 'object'  // true
    typeof 'a' === 'string' // true
    typeof 1 === number     // true
    // But....
    typeof [] === 'object'  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-keyword">typeof</span> {} === <span class="hljs-string">'object'</span>  <span class="hljs-comment">// true</span>
    <span class="hljs-keyword">typeof</span> <span class="hljs-string">'a'</span> === <span class="hljs-string">'string'</span> <span class="hljs-comment">// true</span>
    <span class="hljs-keyword">typeof</span> <span class="hljs-number">1</span> === number     <span class="hljs-comment">// true</span>
    <span class="hljs-comment">// But....</span>
    <span class="hljs-keyword">typeof</span> [] === <span class="hljs-string">'object'</span>  <span class="hljs-comment">// true</span></code></pre>
<p>想知道你的变量是不是数组，仍然可以使用 <code>Array.isArray(myVar)</code>。</p>
<h2 id="articleHeader5">6. 闭包</h2>
<p>这是很出名的一道 JavaScript 面试题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const Greeters = []
    for (var i = 0 ; i < 10 ; i++) {
      Greeters.push(function () { return console.log(i) })
    }
    
    Greeters[0]() // 10
    Greeters[1]() // 10
    Greeters[2]() // 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-keyword">const</span> Greeters = []
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span> ; i &lt; <span class="hljs-number">10</span> ; i++) {
      Greeters.push(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.log(i) })
    }
    
    Greeters[<span class="hljs-number">0</span>]() <span class="hljs-comment">// 10</span>
    Greeters[<span class="hljs-number">1</span>]() <span class="hljs-comment">// 10</span>
    Greeters[<span class="hljs-number">2</span>]() <span class="hljs-comment">// 10</span></code></pre>
<p>你预期的是输出：0,1,2...吗？你知道这是为什么吗？你知道怎么 fix 吗？</p>
<p>我来提两种可能的解决方案来解决这个问题：</p>
<ul><li><p>第一种：使用 <code>let</code>，不用 <code>var</code>。Duang！解决了~</p></li></ul>
<blockquote><p><code>let</code> 和 <code>var</code> 的区别是作用域。<code>var</code> 的作用域是最近的函数块。而 <code>let</code> 的作用域是最近的封闭块。如果两个都是在块外的，那两个都是全局的。最近的封闭块，要比最近的函数块范围小。这里是<a href="http://stackoverflow.com/questions/762011/whats-the-difference-between-using-let-and-var-to-declare-a-variable" rel="nofollow noreferrer" target="_blank">源码</a>。</p></blockquote>
<ul><li><p>第二种：使用 <code>bind</code>。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Greeters.push(console.log.bind(null, i))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;">    Greeters.push(<span class="hljs-built_in">console</span>.log.bind(<span class="hljs-literal">null</span>, i))</code></pre>
<p>还有很多方法可以解决这一问题，这里列出了我个人的两种最优选择。</p>
<h2 id="articleHeader6">7. 聊一聊 bind</h2>
<p>你觉得下面的代码会输出什么？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    class Foo {
      constructor (name) {
        this.name = name
      }
    
      greet () {
        console.log('hello, this is ', this.name)
      }
    
      someThingAsync () {
        return Promise.resolve()
      }
    
      asyncGreet () {
        this.someThingAsync()
        .then(this.greet)
      }
    }
    
    new Foo('dog').asyncGreet()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Foo</span> </span>{
      <span class="hljs-keyword">constructor</span> (name) {
        <span class="hljs-keyword">this</span>.name = name
      }
    
      greet () {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello, this is '</span>, <span class="hljs-keyword">this</span>.name)
      }
    
      someThingAsync () {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve()
      }
    
      asyncGreet () {
        <span class="hljs-keyword">this</span>.someThingAsync()
        .then(<span class="hljs-keyword">this</span>.greet)
      }
    }
    
    <span class="hljs-keyword">new</span> Foo(<span class="hljs-string">'dog'</span>).asyncGreet()</code></pre>
<p>给你点提示，你认为是否会抛出异常呢？<code>Cannot read property 'name' of undefined</code>。</p>
<p>原因：<code>greet</code> 没有在恰当的上下文中执行。依旧，有很多种方法解决这个问题。</p>
<ul><li><p>第一种：我个人比较喜欢如下解决方法。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    asyncGreet () {
      this.someThingAsync()
      .then(this.greet.bind(this))
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    asyncGreet () {
      <span class="hljs-keyword">this</span>.someThingAsync()
      .then(<span class="hljs-keyword">this</span>.greet.bind(<span class="hljs-keyword">this</span>))
    }</code></pre>
<p>这种方式可以保证 <code>greet</code> 是在类已经实例化以后被调用。</p>
<ul><li><p>第二种：如果你想确保 <code>greet</code> 始终可以正确调用，可以绑定到构造函数中。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    class Foo {
      constructor (name) {
        this.name = name
        this.greet = this.greet.bind(this)
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Foo</span> </span>{
      <span class="hljs-keyword">constructor</span> (name) {
        <span class="hljs-keyword">this</span>.name = name
        <span class="hljs-keyword">this</span>.greet = <span class="hljs-keyword">this</span>.greet.bind(<span class="hljs-keyword">this</span>)
      }
    }</code></pre>
<ul><li><p>第三种：你还应该知道箭头函数（<code>=&gt;</code>）可以保护上下文，也可以解决这个问题。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    asyncGreet () {
      this.someThingAsync()
      .then(() => {
        this.greet()
      })
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    asyncGreet () {
      <span class="hljs-keyword">this</span>.someThingAsync()
      .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.greet()
      })
    }</code></pre>
<p>虽然我觉得最后一种解决方案这个例子中很不优雅……</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009024655?w=236&amp;h=243" src="https://static.alili.tech/img/remote/1460000009024655?w=236&amp;h=243" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">结束语</h2>
<p>恭喜！到现在你知道了 JavaScript 中的一些坑，和一点技巧。JavaScript 中还有很多知识等待着你去学习，不过起码在这几个问题上，你不会再犯错误了。Cheers！ o/</p>
<p>如果你认为文章中还需要注意什么，或者添加什么，<a href="https://www.zhihu.com/people/hu-zi-da-ha" rel="nofollow noreferrer" target="_blank">请让我知道</a>。</p>
<hr>
<p>我最近正在写一本<a href="http://huziketang.com/books/react/" rel="nofollow noreferrer" target="_blank">《React.js 小书》</a>，对 React.js 感兴趣的童鞋，<a href="http://huziketang.com/books/react/" rel="nofollow noreferrer" target="_blank">欢迎指点</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
谁说 JavaScript 很简单了？

## 原文链接
[https://segmentfault.com/a/1190000009024648](https://segmentfault.com/a/1190000009024648)

