---
title: '精读《async/await 是把双刃剑》' 
date: 2018-12-01 2:30:12
hidden: true
slug: arpkyjshflo
categories: [reprint]
---

{{< raw >}}

                    
<p>本周精读内容是 <a href="https://medium.freecodecamp.org/avoiding-the-async-await-hell-c77a0fb71c4c" rel="nofollow noreferrer" target="_blank">《逃离 async/await 地狱》</a>。</p>
<h2 id="articleHeader0">1 引言</h2>
<p>终于，async/await 也被吐槽了。Aditya Agarwal 认为 async/await 语法让我们陷入了新的麻烦之中。</p>
<p>其实，笔者也早就觉得哪儿不对劲了，终于有个人把实话说了出来，async/await 可能会带来麻烦。</p>
<h2 id="articleHeader1">2 概述</h2>
<p>下面是随处可见的现代化前端代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(async () => {
  const pizzaData = await getPizzaData(); // async call
  const drinkData = await getDrinkData(); // async call
  const chosenPizza = choosePizza(); // sync call
  const chosenDrink = chooseDrink(); // sync call
  await addPizzaToCart(chosenPizza); // async call
  await addDrinkToCart(chosenDrink); // async call
  orderItems(); // async call
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">(<span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> pizzaData = <span class="hljs-keyword">await</span> getPizzaData(); <span class="hljs-comment">// async call</span>
  <span class="hljs-keyword">const</span> drinkData = <span class="hljs-keyword">await</span> getDrinkData(); <span class="hljs-comment">// async call</span>
  <span class="hljs-keyword">const</span> chosenPizza = choosePizza(); <span class="hljs-comment">// sync call</span>
  <span class="hljs-keyword">const</span> chosenDrink = chooseDrink(); <span class="hljs-comment">// sync call</span>
  <span class="hljs-keyword">await</span> addPizzaToCart(chosenPizza); <span class="hljs-comment">// async call</span>
  <span class="hljs-keyword">await</span> addDrinkToCart(chosenDrink); <span class="hljs-comment">// async call</span>
  orderItems(); <span class="hljs-comment">// async call</span>
})();</code></pre>
<p>await 语法本身没有问题，有时候可能是使用者用错了。当 <code>pizzaData</code> 与 <code>drinkData</code> 之间没有依赖时，顺序的 await 会最多让执行时间增加一倍的 <code>getPizzaData</code> 函数时间，因为 <code>getPizzaData</code> 与 <code>getDrinkData</code> 应该并行执行。</p>
<p>回到我们吐槽的回调地狱，虽然代码比较丑，带起码两行回调代码并不会带来阻塞。</p>
<p>看来语法的简化，带来了性能问题，而且直接影响到用户体验，是不是值得我们反思一下？</p>
<p>正确的做法应该是先同时执行函数，再 await 返回值，这样可以并行执行异步函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(async () => {
  const pizzaPromise = selectPizza();
  const drinkPromise = selectDrink();
  await pizzaPromise;
  await drinkPromise;
  orderItems(); // async call
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">(<span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> pizzaPromise = selectPizza();
  <span class="hljs-keyword">const</span> drinkPromise = selectDrink();
  <span class="hljs-keyword">await</span> pizzaPromise;
  <span class="hljs-keyword">await</span> drinkPromise;
  orderItems(); <span class="hljs-comment">// async call</span>
})();</code></pre>
<p>或者使用 <code>Promise.all</code> 可以让代码更可读：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(async () => {
  Promise.all([selectPizza(), selectDrink()]).then(orderItems); // async call
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">(<span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-built_in">Promise</span>.all([selectPizza(), selectDrink()]).then(orderItems); <span class="hljs-comment">// async call</span>
})();</code></pre>
<p>看来不要随意的 await，它很可能让你代码性能降低。</p>
<h2 id="articleHeader2">3 精读</h2>
<p>仔细思考为什么 async/await 会被滥用，笔者认为是它的功能比较反直觉导致的。</p>
<p>首先 async/await 真的是语法糖，功能也仅是让代码写的舒服一些。先不看它的语法或者特性，仅从语法糖三个字，就能看出它一定是局限了某些能力。</p>
<p>举个例子，我们利用 html 标签封装了一个组件，带来了便利性的同时，其功能一定是 html 的子集。又比如，某个轮子哥觉得某个组件 api 太复杂，于是基于它封装了一个语法糖，我们多半可以认为这个便捷性是牺牲了部分功能换来的。</p>
<p>功能完整度与使用便利度一直是相互博弈的，很多框架思想的不同开源版本，几乎都是把功能完整度与便利度按照不同比例混合的结果。</p>
<p>那么回到 async/await 它的解决的问题是回调地狱带来的灾难：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a(() => {
  b(() => {
    c();
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">a(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  b(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    c();
  });
});</code></pre>
<p>为了减少嵌套结构太多对大脑造成的冲击，async/await 决定这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="await a();
await b();
await c();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">await</span> a();
<span class="hljs-keyword">await</span> b();
<span class="hljs-keyword">await</span> c();</code></pre>
<p>虽然层级上一致了，但逻辑上还是嵌套关系，这不是另一个程度上增加了大脑负担吗？而且这个转换还是隐形的，所以许多时候，我们倾向于忽略它，所以造成了语法糖的滥用。</p>
<h3 id="articleHeader3">理解语法糖</h3>
<p>虽然要正确理解 async/await 的真实效果比较反人类，但为了清爽的代码结构，以及防止写出低性能的代码，还是挺有必要认真理解 async/await 带来的改变。</p>
<p>首先 async/await 只能实现一部分回调支持的功能，也就是仅能方便应对层层嵌套的场景。其他场景，就要动一些脑子了。</p>
<p>比如两对回调：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a(() => {
  b();
});

c(() => {
  d();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">a(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  b();
});

c(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  d();
});</code></pre>
<p>如果写成下面的方式，虽然一定能保证功能一致，但变成了最低效的执行方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="await a();
await b();
await c();
await d();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">await</span> a();
<span class="hljs-keyword">await</span> b();
<span class="hljs-keyword">await</span> c();
<span class="hljs-keyword">await</span> d();</code></pre>
<p>因为翻译成回调，就变成了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a(() => {
  b(() => {
    c(() => {
      d();
    });
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">a(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  b(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    c(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      d();
    });
  });
});</code></pre>
<p>然而我们发现，原始代码中，函数 <code>c</code> 可以与 <code>a</code> 同时执行，但 async/await 语法会让我们倾向于在 <code>b</code> 执行完后，再执行 <code>c</code>。</p>
<p>所以当我们意识到这一点，可以优化一下性能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const resA = a();
const resC = c();

await resA;
b();
await resC;
d();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> resA = a();
<span class="hljs-keyword">const</span> resC = c();

<span class="hljs-keyword">await</span> resA;
b();
<span class="hljs-keyword">await</span> resC;
d();</code></pre>
<p>但其实这个逻辑也无法达到回调的效果，虽然 <code>a</code> 与 <code>c</code> 同时执行了，但 <code>d</code> 原本只要等待 <code>c</code> 执行完，现在如果 <code>a</code> 执行时间比 <code>c</code> 长，就变成了:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a(() => {
  d();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">a(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  d();
});</code></pre>
<p>看来只有完全隔离成两个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(async () => {
  await a();
  b();
})();

(async () => {
  await c();
  d();
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">(<span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-keyword">await</span> a();
  b();
})();

<span class="hljs-function">(<span class="hljs-params"><span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">await</span> c(<span class="hljs-params"></span>);
  d(<span class="hljs-params"></span>);
}</span>)<span class="hljs-params">()</span>;</span></code></pre>
<p>或者利用 <code>Promise.all</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function ab() {
  await a();
  b();
}

async function cd() {
  await c();
  d();
}

Promise.all([ab(), cd()]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ab</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">await</span> a();
  b();
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cd</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">await</span> c();
  d();
}

<span class="hljs-built_in">Promise</span>.all([ab(), cd()]);</code></pre>
<p>这就是我想表达的可怕之处。回调方式这么简单的过程式代码，换成 async/await 居然写完还要反思一下，再反推着去优化性能，这简直比回调地狱还要可怕。</p>
<p>而且大部分场景代码是非常复杂的，同步与 await 混杂在一起，想捋清楚其中的脉络，并正确优化性能往往是很困难的。但是我们为什么要自己挖坑再填坑呢？很多时候还会导致忘了填。</p>
<p>原文作者给出了 <code>Promise.all</code> 的方式简化逻辑，但笔者认为，不要一昧追求 async/await 语法，在必要情况下适当使用回调，是可以增加代码可读性的。</p>
<h2 id="articleHeader4">4 总结</h2>
<p>async/await 回调地狱提醒着我们，不要过渡依赖新特性，否则可能带来的代码执行效率的下降，进而影响到用户体验。同时，笔者认为，也不要过渡利用新特性修复新特性带来的问题，这样反而导致代码可读性下降。</p>
<p>当我翻开 redux 刚火起来那段时期的老代码，看到了许多过渡抽象、为了用而用的代码，硬是把两行代码能写完的逻辑，拆到了 3 个文件，分散在 6 行不同位置，我只好用字符串搜索的方式查找线索，最后发现这个抽象代码整个项目仅用了一次。</p>
<p>写出这种代码的可能性只有一个，就是在精神麻木的情况下，一口气喝完了 redux 提供的全部鸡汤。</p>
<p>就像 async/await 地狱一样，看到这种 redux 代码，我觉得远不如所谓没跟上时代的老前端写出的 jquery 代码。</p>
<p>决定代码质量的是思维，而非框架或语法，async/await 虽好，但也要适度哦。</p>
<h2 id="articleHeader5">5 更多讨论</h2>
<blockquote>讨论地址是：<a href="https://github.com/dt-fe/weekly/issues/82" rel="nofollow noreferrer" target="_blank">精读《逃离 async/await 地狱》 · Issue #82 · dt-fe/weekly</a>
</blockquote>
<p><strong>如果你想参与讨论，请<a href="https://github.com/dt-fe/weekly" rel="nofollow noreferrer" target="_blank">点击这里</a>，每周都有新的主题，周末或周一发布。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精读《async/await 是把双刃剑》

## 原文链接
[https://segmentfault.com/a/1190000014753495](https://segmentfault.com/a/1190000014753495)

