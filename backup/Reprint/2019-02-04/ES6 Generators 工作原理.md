---
title: 'ES6 Generators 工作原理' 
date: 2019-02-04 2:30:58
hidden: true
slug: yt4n0dkfxl
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">文章摘要</h2>
<p>Generator 是 ES6 添加的一个特性，允许函数的暂停和恢复，本文使用 generator 构建了一个惰性队列，并分析其原理。</p>
<h2 id="articleHeader1">文章正文</h2>
<p>编写正确运行的软件可能是困难的，但是我们知道这仅仅是挑战的开始。对一个好的解决方案建模可以把编程从 “可以运行” 转换到 “这样做更好”。相对的，有些事就像下面的注释一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//
//亲爱的代码维护者：
// 
//一旦你试图优化代码，
//并且最终意识到这是一个错误的决定，
//请把下面的变量加一，
//来警告下一个家伙
//
//total_hours_wasted_here = 42
//" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//</span>
<span class="hljs-comment">//亲爱的代码维护者：</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">//一旦你试图优化代码，</span>
<span class="hljs-comment">//并且最终意识到这是一个错误的决定，</span>
<span class="hljs-comment">//请把下面的变量加一，</span>
<span class="hljs-comment">//来警告下一个家伙</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">//total_hours_wasted_here = 42</span>
<span class="hljs-comment">//</span></code></pre>
<p>(源自： <a href="http://stackoverflow.com/questions/184618/what-is-the-best-comment-in-source-code-you-have-ever-encountered/482129#482129)" rel="nofollow noreferrer" target="_blank">http://stackoverflow.com/ques...</a></p>
<p>今天，我们会去探索 ES6 Generators 的工作原理，从而更好的理解它并用新的方式来解决一些老的问题。</p>
<h2 id="articleHeader2">非阻塞</h2>
<p>你可能已经听过编写非阻塞 javascript 代码的重要性。当我们处理 I/O 操作，比如发送 HTTP 请求或者写数据库，我们通常都会使用回调或者 promises。阻塞代码会冻结整个应用，在绝大多数场景下都不是一个可以被使用的方案。</p>
<p>这样做的另外一个后果是，如果你写了一段无限循环的 javascript 代码，比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node -e 'while(true) {}'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">node -e <span class="hljs-string">'while(true) {}'</span></code></pre>
<p>它将很可能冻结你的电脑并且需要系统重启，请不要在家尝试。</p>
<p>考虑到这些，当听到 ES6 Generators 允许我们在函数的中间暂停执行然后在未来的某个时候恢复执行时，感到非常好奇。<br>虽然有些工具比如 Regenerator 和 Babel 已经把这些特性部署到了 ES5。你是否困惑过它们是怎样做到这些的？今天，我们会找到真相。<br>希望我们可以更深入的理解 generators, 更好的发挥它的作用。</p>
<h2 id="articleHeader3">一个惰性序列</h2>
<p>让我们从一个简单的例子开始。比如你要操作一个序列，你可能会创建一个数组并且按照数组的方式操作其值。但是如果这个序列是无限长的呢？数组就不行了，我们可以使用 generator 函数来做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* generateRandoms (max) {
  max = max || 1;

  while (true) {
    let newMax = yield Math.random() * max;
    if (newMax !== undefined) {
      max = newMax;
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">generateRandoms</span> (<span class="hljs-params">max</span>) </span>{
  max = max || <span class="hljs-number">1</span>;

  <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">let</span> newMax = <span class="hljs-keyword">yield</span> <span class="hljs-built_in">Math</span>.random() * max;
    <span class="hljs-keyword">if</span> (newMax !== <span class="hljs-literal">undefined</span>) {
      max = newMax;
    }
  }
}</code></pre>
<p>注意 function* 部分，它标示这是一个 “generator 函数”，并且表现与普通函数不同。另一个重要的部分是 yield 关键字。普通的函数仅仅通过 return 返回结果，而 generator 函数在 yield 时返回结果。</p>
<p>我们可以读出上面函数的意图 “每次你请求下一个值，它都会给你一个从 0  到 max 的值，直到程序退出（直到人类科技毁灭）。”</p>
<p>根据上面的解读，我们仅仅在需要时才会得到一个值，这是非常重要的，否则，无限序列会很快的耗尽我们的内存。我们使用迭代器来获取需要的值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var iterator = generateRandoms();

console.log(iterator.next());     // { value: 0.4900301224552095, done: false }
console.log(iterator.next());     // { value: 0.8244022422935814, done: false }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> iterator = generateRandoms();

<span class="hljs-built_in">console</span>.log(iterator.next());     <span class="hljs-comment">// { value: 0.4900301224552095, done: false }</span>
<span class="hljs-built_in">console</span>.log(iterator.next());     <span class="hljs-comment">// { value: 0.8244022422935814, done: false }</span></code></pre>
<p>Generators 允许两种交互，正如我们下面将要看到的，generators 在没有被调用时会被挂起，而当迭代器请求下一个值时会被唤醒。所以当我们屌用 iterator.next 并且传递了参数后，参数会被赋值到 newMax：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(iterator.next());     // { value: 0.4900301224552095, done: false }

// 为 `newMax` 赋值，该值会一直存在
console.log(iterator.next(1000)); // { value: 963.7744706124067, done: false }
console.log(iterator.next());     // { value: 714.516609441489, done: false }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(iterator.next());     <span class="hljs-comment">// { value: 0.4900301224552095, done: false }</span>

<span class="hljs-comment">// 为 `newMax` 赋值，该值会一直存在</span>
<span class="hljs-built_in">console</span>.log(iterator.next(<span class="hljs-number">1000</span>)); <span class="hljs-comment">// { value: 963.7744706124067, done: false }</span>
<span class="hljs-built_in">console</span>.log(iterator.next());     <span class="hljs-comment">// { value: 714.516609441489, done: false }</span></code></pre>
<h2 id="articleHeader4">在 ES5 中使用 Generators</h2>
<p>为了更好的理解 generators 工作原理，我们可以看一下 generators 是怎样转换成 ES5 代码的。你可以安装 babel 然后看一下它转换后的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g babel

babel generate-randoms.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">npm install -g babel

babel generate-randoms.js</code></pre>
<p>下面是转换后的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var generateRandoms = regeneratorRuntime.mark(function generateRandoms(max) {
  var newMax;
  return regeneratorRuntime.wrap(function generateRandoms$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        max = max || 1;

      case 1:
        if (!true) {
          context$1$0.next = 8;
          break;
        }
        context$1$0.next = 4;
        return Math.random() * max;
      case 4:
        newMax = context$1$0.sent;
        if (newMax !== undefined) {
          max = newMax;
        }
        context$1$0.next = 1;
        break;
      case 8:
      case &quot;end&quot;:
        return context$1$0.stop();
    }
  }, generateRandoms, this);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> generateRandoms = regeneratorRuntime.mark(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateRandoms</span>(<span class="hljs-params">max</span>) </span>{
  <span class="hljs-keyword">var</span> newMax;
  <span class="hljs-keyword">return</span> regeneratorRuntime.wrap(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateRandoms$</span>(<span class="hljs-params">context$<span class="hljs-number">1</span>$<span class="hljs-number">0</span></span>) </span>{
    <span class="hljs-keyword">while</span> (<span class="hljs-number">1</span>) <span class="hljs-keyword">switch</span> (context$<span class="hljs-number">1</span>$<span class="hljs-number">0.</span>prev = context$<span class="hljs-number">1</span>$<span class="hljs-number">0.</span>next) {
      <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:
        max = max || <span class="hljs-number">1</span>;

      <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
        <span class="hljs-keyword">if</span> (!<span class="hljs-literal">true</span>) {
          context$<span class="hljs-number">1</span>$<span class="hljs-number">0.</span>next = <span class="hljs-number">8</span>;
          <span class="hljs-keyword">break</span>;
        }
        context$<span class="hljs-number">1</span>$<span class="hljs-number">0.</span>next = <span class="hljs-number">4</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.random() * max;
      <span class="hljs-keyword">case</span> <span class="hljs-number">4</span>:
        newMax = context$<span class="hljs-number">1</span>$<span class="hljs-number">0.</span>sent;
        <span class="hljs-keyword">if</span> (newMax !== <span class="hljs-literal">undefined</span>) {
          max = newMax;
        }
        context$<span class="hljs-number">1</span>$<span class="hljs-number">0.</span>next = <span class="hljs-number">1</span>;
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-number">8</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">"end"</span>:
        <span class="hljs-keyword">return</span> context$<span class="hljs-number">1</span>$<span class="hljs-number">0.</span>stop();
    }
  }, generateRandoms, <span class="hljs-keyword">this</span>);
});</code></pre>
<p>如你所见，generator 函数的核心代码被转换成了 switch 块， 这对于我们探索其内部原理提供了很有价值的线索。我们可以把 generator 想象成一个循环状态机，它根据我们的交互切换不同的状态。变量 <code>context$1$0</code> 保存了当前的状态，case 语句都在该状态中之行。</p>
<p>看一下这些 switch 块的条件：</p>
<ul>
<li><p><code>case 0: </code> 初始化 max 的值并且执行到了 <code>case1</code>。</p></li>
<li><p><code>case 1:</code> 返回一个随机值然后 <code>GOTO 4</code></p></li>
<li><p><code>case 4:</code> 检查迭代器是否设置了 newMax 的值，如果是，就更新 max 的值，然后 <code>GOTO 1</code>, 返回一个随机值。</p></li>
</ul>
<p>这就解释了为什么 generator 可以在遵循非阻塞的原则上可以无限循环和暂停。</p>
<h2 id="articleHeader5">何时退出循环</h2>
<p>读者可能注意到我跳过了 9-12 行的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!true) {
    context$1$0.next = 8;
    break;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (!<span class="hljs-literal">true</span>) {
    context$<span class="hljs-number">1</span>$<span class="hljs-number">0.</span>next = <span class="hljs-number">8</span>;
    <span class="hljs-keyword">break</span>;
}</code></pre>
<p>这里发生了什么？它其实是原始代码 <code>while (true)</code> 被转换后的代码。每当状态机循环时，它都会检查是否已经到了最后一步。在我们的示例中，是没有循环结束的，但你在编码时可能会遇到很多时候需要退出循环。当符合循环结束条件时，状态机 <code>GOTO 8</code>， generator 之行完毕。</p>
<h2 id="articleHeader6">迭代器中的私有状态</h2>
<p>另外一个有趣的事情是 generator 是如何为每一个独立的迭代器保存私有状态的。因为变量 max 在 <code>regeneratorRuntime.wrap</code> 的外层作用域，它的值会被保留以供之后的 <code>iterator.next()</code> 访问。<br>如果我们调用 <code>randomNumbers()</code> 创建一个新的迭代器，那么一个新的闭包也会被创建。这也就解释了迭代器在使用同一个 generator 时有自己的私有状态而不会相互影响。</p>
<h2 id="articleHeader7">状态机内部</h2>
<p>目前为止，我们已经看到 switch 的本质就是状态机。你可能已经注意到这个函数被包了两层：<code>regeneratorRuntime.mark</code>，<code>regeneratorRuntime.wrap</code>。<br>这些是 <a href="https://github.com/facebook/regenerator" rel="nofollow noreferrer" target="_blank">regenerator</a> 模块，它可以在 ES5 中定义 ES6 generator 形式的状态机。</p>
<p>Regenerator runtime 是一个很长的话题，但是我们会覆盖一些有趣的部分。首先，我们可以看到 generator 从 “Suspended Start” 状态开始：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeInvokeMethod</span>(<span class="hljs-params">innerFn, self, context</span>) </span>{
    <span class="hljs-keyword">var</span> state = GenStateSuspendedStart;

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">invoke</span>(<span class="hljs-params">method, arg</span>) </span>{
</code></pre>
<p>源代码： <a href="https://github.com/facebook/regenerator/blob/v0.8.22/runtime.js#L130-L133" rel="nofollow noreferrer" target="_blank">runtime.js:130,133</a></p>
<p>在这里并没有发生什么事，它仅仅是创建并返回了一个函数。这也意味着当我们调用 <code>var iterator = generateRandoms()</code>， generateRandoms 内部并没有执行。</p>
<p>当我们调用 <code>iterator.next()</code>， generator 函数（之前switch 块中的内容）会在 tryCatch 中被调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var record = tryCatch(innerFn, self, context);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> record = tryCatch(innerFn, self, context);</code></pre>
<p>源代码： <a href="https://github.com/facebook/regenerator/blob/v0.8.22/runtime.js#L234" rel="nofollow noreferrer" target="_blank">runtime.js:234</a></p>
<p>如果返回结果是普通的 return (而不是 throw)， 会把结果包装成 <code>{value, done}</code>。新的状态是 <code>GenStateCompleted</code> 或者 <code>GenStateSuspendedYield</code>。由于我们的示例是无限循环，所以将总是跳转到挂起状态。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var record = tryCatch(innerFn, self, context);
        if (record.type === &quot;normal&quot;) {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> record = tryCatch(innerFn, self, context);
        <span class="hljs-keyword">if</span> (record.type === <span class="hljs-string">"normal"</span>) {
          <span class="hljs-comment">// If an exception is thrown from innerFn, we leave state ===</span>
          <span class="hljs-comment">// GenStateExecuting and loop back for another invocation.</span>
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          <span class="hljs-keyword">var</span> info = {
            <span class="hljs-attr">value</span>: record.arg,
            <span class="hljs-attr">done</span>: context.done
          };</code></pre>
<p>源代码： <a href="https://github.com/facebook/regenerator/blob/v0.8.22/runtime.js#L234-L245" rel="nofollow noreferrer" target="_blank">runtime.js:234,245</a></p>
<h2 id="articleHeader8">你可以用它做什么？</h2>
<p>今天我们用 generator 函数实现了一个惰性序列状态机。这个特性现在就可以使用： 现代浏览器都已经原生支持了 generator， 而对于老的浏览器，也很容易做代码转换。</p>
<p>通常，做一件事情的方式有多种。从这种层面上讲，你可能不需要 generators，但如果它允许我们以一种更富表现力的方式完成目标，那就是值得的。</p>
<hr>
<p>作者信息</p>
<ul>
<li><p>原文作者： Josh Johnston</p></li>
<li><p>原文链接： <a href="http://x-team.com/2015/04/generators-work/" rel="nofollow noreferrer" target="_blank">http://x-team.com/2015/04/gen...</a></p></li>
</ul>
<p>翻译自MaxLeap团队_前端研发人员：Henry Bai<br>译者简介：多年后端及前端开发经验，现任MaxLeap UX团队成员，主要从事MaxLeap相关开发，目前对React Native有浓厚兴趣。<br>中文链接：<a href="https://blog.maxleap.cn/archives/1136" rel="nofollow noreferrer" target="_blank">https://blog.maxleap.cn/archi...</a></p>
<p>相关文章<br><a href="https://blog.maxleap.cn/archives/727" rel="nofollow noreferrer" target="_blank">webpack 入门</a></p>
<p>作者往期佳作<br><a href="https://blog.maxleap.cn/archives/930" rel="nofollow noreferrer" target="_blank">Redux 最佳实践「译」</a></p>
<p>欢迎订阅微信公众号：MaxLeap_yidongyanfa</p>
<hr>
<p><strong>关于MaxLeap</strong><br>MaxLeap 移动业务研发的云服务平台，为企业提供包括应用开发所需的后端云数据库、云数据源、云代码、云容器、 IM、移动支付、应用内社交、第三方登录、社交分享、数据分析、推送营销，用户支持等服务， MaxLeap 致力于让移动应用开发更快速简单。<br>官网：<a href="https://maxleap.cn/" rel="nofollow noreferrer" target="_blank">https://maxleap.cn/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 Generators 工作原理

## 原文链接
[https://segmentfault.com/a/1190000006777434](https://segmentfault.com/a/1190000006777434)

