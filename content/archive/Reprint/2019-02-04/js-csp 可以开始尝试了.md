---
title: 'js-csp 可以开始尝试了' 
date: 2019-02-04 2:30:58
hidden: true
slug: 715t2v0d4e5
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">CSP 的用例</h3>
<p>CSP 的用法最早是 Go 语言传开来的, 看一下我从网上扒的代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package main

import &quot;fmt&quot;

func ping(pings chan<- string, msg string) {
    pings <- msg
}

func pong(pings <-chan string, pongs chan<- string) {
    msg := <-pings
    pongs <- msg
}

func main() {
    pings := make(chan string, 1)
    pongs := make(chan string, 1)
    ping(pings, &quot;passed message&quot;)
    pong(pings, pongs)
    fmt.Println(<-pongs)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="go hljs"><code class="go"><span class="hljs-keyword">package</span> main

<span class="hljs-keyword">import</span> <span class="hljs-string">"fmt"</span>

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">ping</span><span class="hljs-params">(pings <span class="hljs-keyword">chan</span>&lt;- <span class="hljs-keyword">string</span>, msg <span class="hljs-keyword">string</span>)</span></span> {
    pings &lt;- msg
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">pong</span><span class="hljs-params">(pings &lt;-<span class="hljs-keyword">chan</span> <span class="hljs-keyword">string</span>, pongs <span class="hljs-keyword">chan</span>&lt;- <span class="hljs-keyword">string</span>)</span></span> {
    msg := &lt;-pings
    pongs &lt;- msg
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">main</span><span class="hljs-params">()</span></span> {
    pings := <span class="hljs-built_in">make</span>(<span class="hljs-keyword">chan</span> <span class="hljs-keyword">string</span>, <span class="hljs-number">1</span>)
    pongs := <span class="hljs-built_in">make</span>(<span class="hljs-keyword">chan</span> <span class="hljs-keyword">string</span>, <span class="hljs-number">1</span>)
    ping(pings, <span class="hljs-string">"passed message"</span>)
    pong(pings, pongs)
    fmt.Println(&lt;-pongs)
}</code></pre>
<p>其中 <code>&lt;-</code> 符号是往 channel 当中写入数据的操作.<br>同时注意一般 <code>&lt;-</code> 的位置对于 goroutine 来说是阻塞的,<br>由于 channel 能够处理异步操作, 也就是说能做到异步代码用同步写法.<br>更多的细节搜索 "go channel" 应该就能找到.</p>
<p>除了 Go, Clojure 也实现了对于 CSP 的支持, 也就是 <code>core.async</code> 这个库,<br>在 Clojure 当中语法做了调整, 成了 <code>&gt;!</code> <code>&lt;!</code> 这样的写法, 有点怪,<br>但是基本功能差不多, <code>&gt;!</code> 和 <code>&lt;!</code> 都是模仿的阻塞, channel 概念也一样:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(let [c1 (chan)
      c2 (chan)]
  (go (while true
        (let [[v ch] (alts! [c1 c2])]
          (println &quot;Read&quot; v &quot;from&quot; ch))))
  (go (>! c1 &quot;hi&quot;))
  (go (>! c2 &quot;there&quot;)))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="clojure hljs"><code class="clojure">(<span class="hljs-name"><span class="hljs-builtin-name">let</span></span> [c1 (<span class="hljs-name">chan</span>)
      c2 (<span class="hljs-name">chan</span>)]
  (<span class="hljs-name">go</span> (<span class="hljs-name"><span class="hljs-builtin-name">while</span></span> <span class="hljs-literal">true</span>
        (<span class="hljs-name"><span class="hljs-builtin-name">let</span></span> [[v ch] (<span class="hljs-name">alts!</span> [c1 c2])]
          (<span class="hljs-name">println</span> <span class="hljs-string">"Read"</span> v <span class="hljs-string">"from"</span> ch))))
  (<span class="hljs-name">go</span> (<span class="hljs-name">&gt;!</span> c1 <span class="hljs-string">"hi"</span>))
  (<span class="hljs-name">go</span> (<span class="hljs-name">&gt;!</span> c2 <span class="hljs-string">"there"</span>)))</code></pre>
<p>这个例子当中 <code>(chan)</code> 生成 channel, 然后用 <code>go</code> 生成 3 个线索...<br>虽然用了 <code>while true</code>, 但是通过 <code>alts!</code> 也形成了阻塞.<br>更新细节搜索 "core.async" 可以找到.</p>
<h3 id="articleHeader1">为什么用 CSP</h3>
<p>看 Wiki <a href="https://en.wikipedia.org/wiki/Communicating_sequential_processes" rel="nofollow noreferrer" target="_blank">https://en.wikipedia.org/wiki...</a></p>
<blockquote><p>In computer science, communicating sequential processes (CSP) is a formal language for describing patterns of interaction in concurrent systems.[1] It is a member of the family of mathematical theories of concurrency known as process algebras, or process calculi, based on message passing via channels. CSP was highly influential in the design of the occam programming language,1 and also influenced the design of programming languages such as Limbo[3] and Go.[4]</p></blockquote>
<p>CSP 本来是用于描述并发的系统之间如何交互的, 也就是在 Go 当中的用法.<br>由于并发的操作通常都是异步的, 所以 CSP 也能适合异步的行为.<br>最主要的概念就是 Channel, 也叫做"管道", Channel 可以用于传输数据,<br>因而就有对于管道读和写的操作, 分别是 <code>take!</code> 和 <code>put!</code>, Clojure 里的叫法.<br>前面说了, 管道看上去是阻塞代码执行的, 也就是说读和写可以进行等待.<br>这样就能模拟一些场景, 比如抓取网络数据再打印, 就很容易写出来了.</p>
<p>常见功能还有 <code>alts!</code>, 对应 Go 的 <code>select</code>, 就是多个 Channel 取首先返回的数据,<br>还有 <code>merge</code> 记不大清, 好像是汇总多个 Channel 返回的数据, 变成一个?<br>其他的 filter, map 等等序列的操作, 在 Channel 上也有类似实行,<br>另一方面 CSP 在实用当中应该是进行了扩展, 实际功能不止这些.<br>比如说增加了 <code>(timeout 1000)</code> 这样的 Channel 等待一秒返回数据,<br>还有对 Channel 进行 Buffer 的功能, 以及异步的推数据等等.</p>
<p>听起来很花哨, 但是如果有动画可以展示一下就很清楚了, 我还没找到...<br>从整体的思路上说, 这是对于异步事件的一种抽象, 可以用来实现很多业务.<br>想想办法再解释细节吧, 我这里先介绍 JavaScript 这边的情况...</p>
<h3 id="articleHeader2">js-csp 的现状</h3>
<p>由于 Node 6 开始有 <code>yield</code>, 用同步代码写异步成为了可能,<br>于是有就有了 <code>js-csp</code> 这个模块, 通过 yield 实现了 CSP 的功能,<br>我还看到一个用了 async 的, 估计不能用, 但是供参考:</p>
<p><a href="https://github.com/ubolonton/js-csp" rel="nofollow noreferrer" target="_blank">https://github.com/ubolonton/...</a><br><a href="https://github.com/dvlsg/async-csp" rel="nofollow noreferrer" target="_blank">https://github.com/dvlsg/asyn...</a></p>
<p>我直接贴一遍 README 当中的例子, 自己看看能不能看懂:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* player(name, table) {
  while (true) {
    var ball = yield csp.take(table); // 等待取得数据
    if (ball === csp.CLOSED) { // 关闭状态特殊处理
      console.log(name + &quot;: table's gone&quot;);
      return;
    }
    ball.hits += 1;
    console.log(name + &quot; &quot; + ball.hits);
    yield csp.timeout(100); // 等待延时结束
    yield csp.put(table, ball); // 推数据并等待对方取
  }
}

csp.go(function* () {
  var table = csp.chan(); // 创建 Channel

  csp.go(player, [&quot;ping&quot;, table]); // 相当于启动 goroutine
  csp.go(player, [&quot;pong&quot;, table]); // 相当于启动 goroutine

  yield csp.put(table, {hits: 0}); // 推数据等待对方取
  yield csp.timeout(1000); // 等待延时结束
  table.close();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">player</span>(<span class="hljs-params">name, table</span>) </span>{
  <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">var</span> ball = <span class="hljs-keyword">yield</span> csp.take(table); <span class="hljs-comment">// 等待取得数据</span>
    <span class="hljs-keyword">if</span> (ball === csp.CLOSED) { <span class="hljs-comment">// 关闭状态特殊处理</span>
      <span class="hljs-built_in">console</span>.log(name + <span class="hljs-string">": table's gone"</span>);
      <span class="hljs-keyword">return</span>;
    }
    ball.hits += <span class="hljs-number">1</span>;
    <span class="hljs-built_in">console</span>.log(name + <span class="hljs-string">" "</span> + ball.hits);
    <span class="hljs-keyword">yield</span> csp.timeout(<span class="hljs-number">100</span>); <span class="hljs-comment">// 等待延时结束</span>
    <span class="hljs-keyword">yield</span> csp.put(table, ball); <span class="hljs-comment">// 推数据并等待对方取</span>
  }
}

csp.go(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> table = csp.chan(); <span class="hljs-comment">// 创建 Channel</span>

  csp.go(player, [<span class="hljs-string">"ping"</span>, table]); <span class="hljs-comment">// 相当于启动 goroutine</span>
  csp.go(player, [<span class="hljs-string">"pong"</span>, table]); <span class="hljs-comment">// 相当于启动 goroutine</span>

  <span class="hljs-keyword">yield</span> csp.put(table, {<span class="hljs-attr">hits</span>: <span class="hljs-number">0</span>}); <span class="hljs-comment">// 推数据等待对方取</span>
  <span class="hljs-keyword">yield</span> csp.timeout(<span class="hljs-number">1000</span>); <span class="hljs-comment">// 等待延时结束</span>
  table.close();
});</code></pre>
<p>运行的效果是:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="=>> node go.js
ping 1
pong 2
ping 3
pong 4
ping 5
pong 6
ping 7
pong 8
ping 9
pong 10
ping: table's gone
pong: table's gone" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code class="text">=&gt;&gt; node go.js
ping <span class="hljs-number">1</span>
pong <span class="hljs-number">2</span>
ping <span class="hljs-number">3</span>
pong <span class="hljs-number">4</span>
ping <span class="hljs-number">5</span>
pong <span class="hljs-number">6</span>
ping <span class="hljs-number">7</span>
pong <span class="hljs-number">8</span>
ping <span class="hljs-number">9</span>
pong <span class="hljs-number">10</span>
<span class="hljs-built_in">pi</span><span class="hljs-symbol">ng:</span> table's gone
po<span class="hljs-symbol">ng:</span> table's gone</code></pre>
<p>这样模拟的就是两个进程之间相互发送数据的场景.</p>
<p>但实际上 CSP 可以对事件流进行抽象, 也就能做出更强大的功能.<br>这就是在我之前推荐的这篇文章上的做的介绍, 点进去看吧:<br><a href="http://jlongster.com/Taming-the-Asynchronous-Beast-with-CSP-in-JavaScript" rel="nofollow noreferrer" target="_blank">http://jlongster.com/Taming-t...</a></p>
<p>随着浏览器和 Node 对 yield 支持的完善, 使用 js-csp 已经可以做到.<br>考虑到方案的灵活性, 我认为值得往深了去挖一挖.</p>
<h3 id="articleHeader3">和 Rx 的对比</h3>
<p>事件流的另一套有名的方案就是 Rx, 有 js 版本的 Rxjs.<br>大概来说, Rx 是用 OOP 语法封装的 FP 风格的响应式编程方案, 操作繁多,<br>而 CSP 通过管道提供的是一些灵活但过于基础的原语,<br>看社区的讨论, 其实有很大的重叠的部分, 尽管细节还很难说...<br>我搜集了一些文章:</p>
<p><a href="https://medium.com/@puppybits/rxjs-is-great-so-why-have-i-moved-on-534c513e7af3" rel="nofollow noreferrer" target="_blank">https://medium.com/@puppybits...</a></p>
<p>还有 GitHub 上的一些讨论:</p>
<p><a href="https://github.com/ubolonton/js-csp/issues/40" rel="nofollow noreferrer" target="_blank">https://github.com/ubolonton/...</a><br><a href="https://github.com/cyclejs/cyclejs/issues/74" rel="nofollow noreferrer" target="_blank">https://github.com/cyclejs/cy...</a></p>
<p>另外还有某人用 Rx 写法模仿 CSP 方案的博客:</p>
<p><a href="http://swannodette.github.io/2013/07/31/extracting-processes" rel="nofollow noreferrer" target="_blank">http://swannodette.github.io/...</a><br><a href="http://swannodette.github.io/2013/07/12/communicating-sequential-processes" rel="nofollow noreferrer" target="_blank">http://swannodette.github.io/...</a><br><a href="http://potetm.github.io/2014/01/07/frp.html" rel="nofollow noreferrer" target="_blank">http://potetm.github.io/2014/...</a><br><a href="http://potetm.github.io/2014/01/27/responsive-design-csp.html" rel="nofollow noreferrer" target="_blank">http://potetm.github.io/2014/...</a></p>
<h2 id="articleHeader4">小结</h2>
<p>说起来我还没怎么消化这东西.. 但是如果看过文章里的 Demo, 你一定印象深刻,<br>流是数据和时间绑定在一起形成的产物, 普通的编程手法很难处理,<br>但是 CSP 的概念让处理 Channel 中传递的数据成为了而比较灵活的事情.<br>参考国外社区的评论, 这是具备相当大价值的一块知识, 所以在持续跟进.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js-csp 可以开始尝试了

## 原文链接
[https://segmentfault.com/a/1190000006865102](https://segmentfault.com/a/1190000006865102)

