---
title: '[译] A Prettier JavaScript Formatter' 
date: 2019-01-17 2:30:25
hidden: true
slug: oi6abiw4f3b
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文 <a href="http://jlongster.com/A-Prettier-Formatter" rel="nofollow noreferrer" target="_blank">http://jlongster.com/A-Pretti...</a></p></blockquote>
<p>今天我发布 Prettier, 一个 JavaScript 格式化工具. 它的灵感来源于 refmt, 它对于 ES2017, JSX 和 Flow 的语言特性有着高级的支持. 通过将 JavaScript 解析为 AST 并且基于 AST 美化和打印, Prettier 会丢掉几乎全部的原始的代码风格, 从而保证 JavaScript 代码风格的一致性. 跟 ESLint 不一样的在于它没有大量的 options 和 rules 需要管理. 不过同时有一点也很重要, 一切都是确定好的.<br>我很高兴的随着离开 Mozilla 之后我有时间做自己的开源工作了, 这是我 2017 年的开始.</p>
<p>下面是一个在线运行的 Demo. 注意语法是支持 JSX 和 Flow 的. 你可以在下面的编辑器里输入任何代码, 代码会被自动格式化.<br>行长的最大值是 60. 两个编辑器当中上面一个是原始输入, 下面是格式化之后的版本.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//                                           60 chars -->   |
function makeComponent() : int {
  return {
    longCall() {
      complicatedFunction(importantArgument(), secondaryArgument())
      weirdStyle({ prop: 1 },
        1, 2, 3);
    },
    render() {
      const user = {
        name: &quot;James&quot;
      };
    return <div>
        hello ${name}! JSX is <strong>supported</strong>
      </div>;
    }
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//                                           60 chars --&gt;   |</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeComponent</span>(<span class="hljs-params"></span>) : <span class="hljs-title">int</span> </span>{
  <span class="hljs-keyword">return</span> {
    longCall() {
      complicatedFunction(importantArgument(), secondaryArgument())
      weirdStyle({ <span class="hljs-attr">prop</span>: <span class="hljs-number">1</span> },
        <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
    },
    render() {
      <span class="hljs-keyword">const</span> user = {
        <span class="hljs-attr">name</span>: <span class="hljs-string">"James"</span>
      };
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        hello ${name}! JSX is <span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>supported<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
    }
  };
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//                                           60 chars -->   |
function makeComponent(): int {
  return {
    longCall() {
      complicatedFunction(
        importantArgument(),
        secondaryArgument()
      );
      weirdStyle({ prop: 1 }, 1, 2, 3);
    },
    render() {
      const user = { name: &quot;James&quot; };
      return (
        <div>
           hello ${name}! JSX is <strong>supported</strong>
        </div>
      );
    }
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//                                           60 chars --&gt;   |</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeComponent</span>(<span class="hljs-params"></span>): <span class="hljs-title">int</span> </span>{
  <span class="hljs-keyword">return</span> {
    longCall() {
      complicatedFunction(
        importantArgument(),
        secondaryArgument()
      );
      weirdStyle({ <span class="hljs-attr">prop</span>: <span class="hljs-number">1</span> }, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
    },
    render() {
      <span class="hljs-keyword">const</span> user = { <span class="hljs-attr">name</span>: <span class="hljs-string">"James"</span> };
      <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
           hello ${name}! JSX is <span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>supported<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );
    }
  };
}</code></pre>
<p>(上面的 Demo 运行在 Prettier 0.0.8)</p>
<p>很多人知道我在写 React 代码的时候通常不会写 JSX. 一个月之前我想试试了, 我猜意识到挡在我前面的是 Emacs 对 JSX 支持不足的问题. Emacs 对代码缩进本来有不错的支持. 我从来不需要手动多缩进什么东西. 但是对于 JSX 却不起作用, 我看了下其他的编辑器, 也看到了类似地问题(其他的编辑器在强制纠正缩进规则这方面基本上做的更差).</p>
<p>大概在同时我用了一段时间 Reason, Reason 提供了 refmt 工具用来自动格式化代码. 我就被迷住了. refmt 屏蔽了写代码当中很多让人分心的因素. 你可以按自己的习惯随便写, 然后格式化掉. 我意识到这不仅可以解决 JSX 的问题, 它也可以对任何编辑器提供强制整个团队代码样式的一致性的工具.</p>
<p>如果说计算机擅长做某个事情的话, 计算机会擅长解析代码和分析代码. 所以我准备把这个事情做出来, 这样就有了 Prettier. 我并不打算从底层开始写, 所以 Prettier 是从 fork <a href="https://github.com/benjamn/recast" rel="nofollow noreferrer" target="_blank">recast</a> 的 printer 开始的, 内部用 Wadler 在 <a href="http://homepages.inf.ed.ac.uk/wadler/papers/prettier/prettier.pdf" rel="nofollow noreferrer" target="_blank">"A prettier printer"</a> 的算法进行了重写.</p>
<p>为什么选这套算法? 首先要看下为什么已有的样式格式化工具并没有实际的效验.</p>
<p>已有的样式格式化工具缺失了一个极为重要的部分: 最大的行长. 当然, 你是可以用让 ESLint 在行长过大时警告的(ESLint 不会知道怎样修复它). 最大行长是格式化工具决定性的一个部分, 特别是用在布局和折叠代码.</p>
<p>比如看下面的代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo(arg1, arg2, arg3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">foo(arg1, arg2, arg3);</code></pre>
<p>看上去格式化的方式是对的. 然而我们都会遇到这样的情况:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">foo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());</code></pre>
<p>我之前的格式突然就不正常了, 因为太长了. 你多半会这样来处理:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo(
  reallyLongArg(),
  omgSoManyParameters(),
  IShouldRefactorThis(),
  isThereSeriouslyAnotherOne()
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">foo(
  reallyLongArg(),
  omgSoManyParameters(),
  IShouldRefactorThis(),
  isThereSeriouslyAnotherOne()
);</code></pre>
<p>这个例子清楚地展出了最大行长对于我们想要的代码的样式有着直接的影响. 目前的样式工具无视了这一点, 也就意味着在这个麻烦的场景当中它们毫无帮助. 团队里的每个人会按照他们自己不一样的规则调整代码的样式, 因而我们也就失去了我们想要的一致性.</p>
<p>Wadler 算法的论文描述了基于约束的代码的局部系统. 它会"测算"代码的长度, 如果超过了最大行长, 就会折行.</p>
<p>即便我们不顾行长, 在各种 linter 工具里也有很多办法偷懒. 我所知道的最严格的 linter 也会让这样代码的代码通过:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo({ num: 3 },
  1, 2)

foo(
  { num: 3 },
  1, 2)

foo(
  { num: 3 },
  1,
  2
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">foo({ <span class="hljs-attr">num</span>: <span class="hljs-number">3</span> },
  <span class="hljs-number">1</span>, <span class="hljs-number">2</span>)

foo(
  { <span class="hljs-attr">num</span>: <span class="hljs-number">3</span> },
  <span class="hljs-number">1</span>, <span class="hljs-number">2</span>)

foo(
  { <span class="hljs-attr">num</span>: <span class="hljs-number">3</span> },
  <span class="hljs-number">1</span>,
  <span class="hljs-number">2</span>
)</code></pre>
<p>Prettier 通过解析代码和基于 AST 重新生成满足自己的规则的代码, 计算考虑了最大行长, 必要时进行代码的折行, 最终屏蔽了各种过于自由的样式.</p>
<h3 id="articleHeader0">关于模式</h3>
<p>为了让 Prettier 变得实用我做了大量的工作. 目前输出的代码已经不错了, 我估计后面还有很多让大家能觉得更好的调整.</p>
<p>我们尽量让代码能遵循特定的模式. 比如这个写法在 JavaScript 很流行:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myPromise
  .then(() => {
    // ...
  })
  .then(() => {
    // ...
  })
  .catch(() => {
    // ..
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">myPromise
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-comment">// ...</span>
  })
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-comment">// ...</span>
  })
  .catch(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-comment">// ..</span>
  });</code></pre>
<p>简单的 printer 会把它折叠成下面这样:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myPromise.then(() => {
  // ...
}).then(() => {
  // ...
}).catch(() => {
  // ..
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">myPromise.then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">// ...</span>
}).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">// ...</span>
}).catch(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">// ..</span>
});</code></pre>
<p>不过在这场, 我们检测到"链式调用"的模式然后特意把每个 <code>.then</code> 生成在独立的一行.</p>
<p>如果你用到了某个 Prettier 没有格式化好的模式, 请提交一个 Issue, 我们来讨论一下如何检测这个规则以及如何有针对性地处理你的场景.</p>
<h3 id="articleHeader1">默契的团队</h3>
<p>在团队中工作时, 很需要减少摩擦, 特别是在大型团队里. 尽管无法完全避免摩擦, 我们更多能做的是通过工具变得更容易在一起协作.</p>
<p>你可能觉得配置一下 ESLint 不会消耗太多时间, 或者说团队里不会话很多时间争论语法. 根据我的经验, 实际上不是. 即便你配置了大量的 ESLint 规则, 它实际上还是无法捕捉到全部的样式的差异. 团队仍然会努力去强制一套统一的样式, 而这显得很让人分心.</p>
<p>语法的细节其实没那么重要. 就让 Prettier 这样的工具来做格式和排版就好了, 程序员应该关注在那些真正的问题上.</p>
<h3 id="articleHeader2">自由度</h3>
<p>结果好像的用了 Prettier 之后你写代码更加自由了, 怎么写都可以, 因为随后一格式化马上就纠正回来了!</p>
<p>不想关心分号的问题? 当然, 直接写就好了:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  var x = 5
  var y = 6
  var z = 7
  return x + y + z
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> x = <span class="hljs-number">5</span>
  <span class="hljs-keyword">var</span> y = <span class="hljs-number">6</span>
  <span class="hljs-keyword">var</span> z = <span class="hljs-number">7</span>
  <span class="hljs-keyword">return</span> x + y + z
}</code></pre>
<p>把这段代码贴到上面去, 你会看到 Prettier 已经帮你把分号插入好了.</p>
<p>处理特别复杂的问题的时候想要写点脏代码的? 当然可以, 全写在一行都可以. 用自己习惯写的脏的语法就好了. 然后只要一个快捷键就能把代码格式化掉.</p>
<p>试一试 <a href="https://github.com/jlongster/prettier" rel="nofollow noreferrer" target="_blank">Prettier</a>!</p>
<p>鸣谢:</p>
<ul>
<li><p><a href="https://twitter.com/vjeux" rel="nofollow noreferrer" target="_blank">Christopher Chedeau</a> 鼓励我把这些弄到能用的程度, 还有添加了 Jest 测试工具</p></li>
<li><p><a href="https://twitter.com/_pieterv" rel="nofollow noreferrer" target="_blank">Pieter Vanderwerff</a> 在做相似的项目, 帮忙讨论了解决方案</p></li>
<li><p><a href="https://twitter.com/jordwalke/" rel="nofollow noreferrer" target="_blank">Jordan Walke</a> 写的 refmt, 也是 Prettier 的直接灵感来源</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] A Prettier JavaScript Formatter

## 原文链接
[https://segmentfault.com/a/1190000008861384](https://segmentfault.com/a/1190000008861384)

