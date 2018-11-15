---
title: 如何避免async await地狱
hidden: true
categories: reprint
slug: fd2ef994
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>async/await 让我们摆脱了回调地狱，但人们开始滥用它 - 这就导致async/await 地狱的诞生。</p>
<p>在本文中，我将尝试解释什么是async/await hell，我也会分享一些提示来避免它。</p>
<h3>什么是async/await hell</h3>
<p>在使用异步JavaScript时，人们通常会依次编写多个语句，并在函数调用之前进行等待。这会导致性能问题，因为一个语句多次不依赖于前一个语句 - 但是您仍然必须等待前一个语句完成。</p>
<h3>举个关于async/await hell的例子</h3>
<p>假如你是写了一个脚本来订购比萨饼和饮料，那这个脚本可能是这个样子的：</p>
<pre><code class="hljs dart">(<span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> pizzaData = <span class="hljs-keyword">await</span> getPizzaData()    <span class="hljs-comment">// async call</span>
  <span class="hljs-keyword">const</span> drinkData = <span class="hljs-keyword">await</span> getDrinkData()    <span class="hljs-comment">// async call</span>
  <span class="hljs-keyword">const</span> chosenPizza = choosePizza()    <span class="hljs-comment">// sync call</span>
  <span class="hljs-keyword">const</span> chosenDrink = chooseDrink()    <span class="hljs-comment">// sync call</span>
  <span class="hljs-keyword">await</span> addPizzaToCart(chosenPizza)    <span class="hljs-comment">// async call</span>
  <span class="hljs-keyword">await</span> addDrinkToCart(chosenDrink)    <span class="hljs-comment">// async call</span>
  orderItems()    <span class="hljs-comment">// async call</span>
})()
</code></pre><p>表面上它看起来是正确的，它确实有效。但是这不是一个好的实现，因为他并没有考虑到并发性。让我们了解它在做什么，以便我们能够确定问题</p>
<h4>说明：</h4>
<p>我们将我们的代码封装在一个 async <a href="https://developer.mozilla.org/en-US/docs/Glossary/IIFE">IIFE</a>. （IIFE（立即调用函数表达式）是一个JavaScript函数，它在定义时就运行。）那么它将按照以下顺序执行：</p>
<ol>
<li>Get the list of pizzas.（获取一个披萨的列表）</li>
<li>Get the list of drinks.（获取一个饮料的列表）</li>
<li>Choose one pizza from the list.（在这个列表中选择一个披萨）</li>
<li>Choose one drink from the list.（在这个列表中选择一个饮料）</li>
<li>Add the chosen pizza to the cart.（将选中的比萨加入购物车）</li>
<li>Add the chosen drink to the cart.（将选中的饮料加入购物车）</li>
<li>Order the items in the cart.（订购购物车中的物品）</li>
</ol>
<h4>那么现在有个什么问题了 ?</h4>
<p>正如我先前强调的那样，所有这些陈述都是一一执行的。这里没有并发。仔细想想：为什么我们在尝试获得饮料清单之前等待获得比萨饼列表？我们应该试着将这两个列表放在一起。然而，当我们需要选择比萨时，我们确实需要事先得到比萨饼的名单。这同样适用于饮料。</p>
<p>所以我们可以得出结论，披萨相关的工作和饮料相关的工作可以并行进行，但涉及披萨相关工作的各个步骤需要按顺序（逐个）进行。</p>
<h4>另一个糟糕的实施例子</h4>
<p>此JavaScript代码将获取购物车中的商品并发出订购请求。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">orderItems</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> items = <span class="hljs-keyword">await</span> getCartItems()    <span class="hljs-comment">// async call</span>
  <span class="hljs-keyword">const</span> noOfItems = items.length
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; noOfItems; i++) {
    <span class="hljs-keyword">await</span> sendRequest(items[i])    <span class="hljs-comment">// async call</span>
  }
}
</code></pre><p>在这种情况下，for循环必须等待sendRequest（）函数完成后才能继续下一次迭代。但是，我们并不需要等待。我们希望尽快发送所有请求，然后我们可以等待所有请求完成。</p>
<p>我希望现在你越来越接近理解什么是async/await hell，以及它对程序性能的影响有多严重。现在我想问你一个问题。</p>
<h3>如果我们忘记了await关键字会怎么样 ?</h3>
<p>如果在调用异步函数时忘记使用await，则该函数开始执行。这意味着执行该功能不需要等待。异步函数将返回一个promise，您可以稍后使用。</p>
<pre><code class="hljs clojure">(<span class="hljs-name">async</span> () =&gt; {
  const value = doSomeAsyncTask()
  console.log(<span class="hljs-name">value</span>) // an unresolved promise
})()
</code></pre><p>另一个结果是编译器不会知道你想等待函数完全执行。因此，编译器将退出程序而不完成异步任务。所以我们确实需要<strong>await</strong>关键字。</p>
<p>promises的一个有趣属性是，你可以在一行中得到promise，并等待它在另一行中解决。这是避免async/await hel的关键。</p>
<pre><code class="hljs clojure">(<span class="hljs-name">async</span> () =&gt; {
  const promise = doSomeAsyncTask()
  const value = await promise
  console.log(<span class="hljs-name">value</span>) // the actual value
})()
</code></pre><p>正如你所看到的，doSomeAsyncTask（）正在返回一个promises。此时doSomeAsyncTask（）已经开始执行。为了得到promise的解析值，我们使用await关键字，它会告诉JavaScript不要立即执行下一行，而是等待promises解决，然后执行下一行。</p>
<h3>如何摆脱 async/await地狱 ?</h3>
<p>你应该按照这些步骤来避免async/await地狱。</p>
<h4>查找依赖于其他语句执行的语句</h4>
<p>在我们的第一个例子中，我们选择了一个披萨和一杯饮料。我们的结论是，在选择比萨饼之前，我们需要有比萨饼的名单。在将比萨加入购物车之前，我们需要选择比萨饼。所以我们可以说这三个步骤取决于对方。在完成前一件事之前我们不能做一件事。</p>
<p>但如果我们更广泛地来看，我们发现选择比萨不依赖于选择饮料，所以我们可以并行选择它们。</p>
<p>因此我们发现了一些依赖于其他语句执行的语句，有些则没有。</p>
<h4>Group-dependent statements in async functions将需要async的函数封装在一起</h4>
<p>将需要async的函数封装在一起</p>
<p>正如我们所看到的，选择比萨包括从属陈述，比如获得比萨饼列表，选择一个，然后将选择的比​​萨加入购物车。我们应该将这些语句分组为异步函数。这样我们就得到了两个异步函数selectPizza（）和selectDrink（）。</p>
<h4>同时执行这些异步功能</h4>
<p>然后我们利用事件循环同时运行这些异步非阻塞函数。这样做的两种常见模式是早日返回Promise和Promise.all方法。</p>
<h3>我们来修复这些例子</h3>
<p>遵循这三个步骤，让我们将它们应用于我们的示例</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">selectPizza</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> pizzaData = <span class="hljs-keyword">await</span> getPizzaData()    <span class="hljs-comment">// async call</span>
  <span class="hljs-keyword">const</span> chosenPizza = choosePizza()    <span class="hljs-comment">// sync call</span>
  <span class="hljs-keyword">await</span> addPizzaToCart(chosenPizza)    <span class="hljs-comment">// async call</span>
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">selectDrink</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> drinkData = <span class="hljs-keyword">await</span> getDrinkData()    <span class="hljs-comment">// async call</span>
  <span class="hljs-keyword">const</span> chosenDrink = chooseDrink()    <span class="hljs-comment">// sync call</span>
  <span class="hljs-keyword">await</span> addDrinkToCart(chosenDrink)    <span class="hljs-comment">// async call</span>
}

(<span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> pizzaPromise = selectPizza()
  <span class="hljs-keyword">const</span> drinkPromise = selectDrink()
  <span class="hljs-keyword">await</span> pizzaPromise
  <span class="hljs-keyword">await</span> drinkPromise
  orderItems()    <span class="hljs-comment">// async call</span>
})()

<span class="hljs-comment">// Although I prefer it this way </span>

(<span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-built_in">Promise</span>.all([selectPizza(), selectDrink()]).then(orderItems)   <span class="hljs-comment">// async call</span>
})()
</code></pre><p>现在我们将这些语句分成两个函数。在函数内部，每个语句都依赖于前一个语句的执行。然后我们同时执行函数selectPizza（）和selectDrink（）。</p>
<p>在第二个例子中，我们需要处理未知数量的promises。处理这种情况非常简单：我们只需创建一个数组并在其中实现承诺。然后使用Promise.all（）我们同时等待所有的承诺解决。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">orderItems</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> items = <span class="hljs-keyword">await</span> getCartItems()    <span class="hljs-comment">// async call</span>
  <span class="hljs-keyword">const</span> noOfItems = items.length
  <span class="hljs-keyword">const</span> promises = []
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; noOfItems; i++) {
    <span class="hljs-keyword">const</span> orderPromise = sendRequest(items[i])    <span class="hljs-comment">// async call</span>
    promises.push(orderPromise)    <span class="hljs-comment">// sync call</span>
  }
  <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all(promises)    <span class="hljs-comment">// async call</span>
}
</code></pre><p>我希望这篇文章能够帮助您超越async / await的基础知识，并帮助您提高应用程序的性能。</p>
<p>如果你喜欢这篇文章，请点赞。提示 - 你可以点50次！ 
也请分享Fb和Twitter。如果您想获得更新，请在 <a href="https://twitter.com/dev__adi">Twitter</a>和<a href="https://medium.com/@adityaa803/">Medium</a>上关注我。如果有什么不清楚或者你想指出什么，请在下面评论。</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/how-to-escape-async-await-hell](https://www.zcfy.cc/article/how-to-escape-async-await-hell)
原文标题: 如何避免async/await地狱
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
