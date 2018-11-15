---
title: JavaScript .filter() 方法全解析
reprint: true
categories: reprint
abbrlink: 136637be
date: 2018-10-18 00:00:00
---

{{% raw %}}

            <p>.filter是一个内置的数组迭代方法，它接受一个“谓词（译者注: 指代一个过滤条件的函数）”，该“谓词”针对每个值进行调用，并返回一个符合该条件(“truthy值”)的数组。</p>
<p>上面那句话包含了很多信息，让我们来逐一解答一下。</p>
<ul>
<li><p>“内置”只是意味着它是语言的一部分 - 您不需要添加任何库来访问此功能。</p>
</li>
<li><p>“迭代方法”是指接受针对数组的每个项运行的函数。.map和.reduce都是迭代方法的示例。</p>
</li>
<li><p>“谓词”是指.fiflter中接受的的函数。</p>
</li>
<li><p>“truthy值”是强制转换为布尔值时计算为true的任何值。几乎所有值都是真实的，除了：undefined，null，false，0，NaN或“”（空字符串）。</p>
</li>
</ul>
<p>让我们来看看下面这个例子，看一下.filter是怎么运行的。</p>
<pre><code class="hljs sqf">const restaurants = [
    {
        <span class="hljs-built_in">name</span>: <span class="hljs-string">"Dan's Hamburgers"</span>,
        price: <span class="hljs-string">'Cheap'</span>,
        cuisine: <span class="hljs-string">'Burger'</span>,
    },
    {
        <span class="hljs-built_in">name</span>: <span class="hljs-string">"Austin's Pizza"</span>,
        price: <span class="hljs-string">'Cheap'</span>,
        cuisine: <span class="hljs-string">'Pizza'</span>,
    },
    {
        <span class="hljs-built_in">name</span>: <span class="hljs-string">"Via 313"</span>,
        price: <span class="hljs-string">'Moderate'</span>,
        cuisine: <span class="hljs-string">'Pizza'</span>,
    },
    {
        <span class="hljs-built_in">name</span>: <span class="hljs-string">"Bufalina"</span>,
        price: <span class="hljs-string">'Expensive'</span>,
        cuisine: <span class="hljs-string">'Pizza'</span>,
    },
    {
        <span class="hljs-built_in">name</span>: <span class="hljs-string">"P. Terry's"</span>,
        price: <span class="hljs-string">'Cheap'</span>,
        cuisine: <span class="hljs-string">'Burger'</span>,
    },
    {
        <span class="hljs-built_in">name</span>: <span class="hljs-string">"Hopdoddy"</span>,
        price: <span class="hljs-string">'Expensive'</span>,
        cuisine: <span class="hljs-string">'Burger'</span>,
    },
    {
        <span class="hljs-built_in">name</span>: <span class="hljs-string">"Whataburger"</span>,
        price: <span class="hljs-string">'Moderate'</span>,
        cuisine: <span class="hljs-string">'Burger'</span>,
    },
    {
        <span class="hljs-built_in">name</span>: <span class="hljs-string">"Chuy's"</span>,
        cuisine: <span class="hljs-string">'Tex-Mex'</span>,
        price: <span class="hljs-string">'Moderate'</span>,
    },
    {
        <span class="hljs-built_in">name</span>: <span class="hljs-string">"Taquerias Arandina"</span>,
        cuisine: <span class="hljs-string">'Tex-Mex'</span>,
        price: <span class="hljs-string">'Cheap'</span>,
    },
    {
        <span class="hljs-built_in">name</span>: <span class="hljs-string">"El Alma"</span>,
        cuisine: <span class="hljs-string">'Tex-Mex'</span>,
        price: <span class="hljs-string">'Expensive'</span>,
    },
    {
        <span class="hljs-built_in">name</span>: <span class="hljs-string">"Maudie's"</span>,
        cuisine: <span class="hljs-string">'Tex-Mex'</span>,
        price: <span class="hljs-string">'Moderate'</span>,
    },
];

</code></pre><p>这是很多信息。我现在想要一个汉堡，所以让我们过滤掉一下这个数组。</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">const isBurger</span> = ({cuisine}) =&gt; cuisine === <span class="hljs-string">'Burger'</span>;
<span class="hljs-attribute">const burgerJoints</span> = restaurants.filter(isBurger);

</code></pre><p>isBurger是谓词，而burgerJoints是<em>new</em>数组，它是餐馆的子集。<strong>值得注意的是，restaurants 这个数组是不变。</strong></p>
<p>下面是两个正在呈现的列表的简单示例 - 一个原始的餐馆数组，以及一个过滤的burgerJoints数组。</p>
<p>See the Pen <a href="https://codepen.io/AdamGiese/pen/ajLZNz/">.filter - isBurger</a> by Adam Giese (<a href="https://codepen.io/AdamGiese">@AdamGiese</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<h3>否定谓词</h3>
<blockquote>
<p>对于每个谓词，都有一个相反的否定谓词。</p>
</blockquote>
<p>谓词是一个返回布尔值的函数。由于布尔值只有true 和 false，这意味着很容易“翻转”谓词的值。</p>
<p>我吃了汉堡已经过了几个小时，现在又饿了。这一次，我想过滤<em>out</em>汉堡尝试新的东西。一种选择是从头开始编写新的isNotBurger谓词。</p>
<pre><code class="hljs coffeescript">const isBurger = <span class="hljs-function"><span class="hljs-params">({cuisine})</span> =&gt;</span> cuisine === <span class="hljs-string">'Burger'</span>;
const isNotBurger = <span class="hljs-function"><span class="hljs-params">({cuisine})</span> =&gt;</span> cuisine !== <span class="hljs-string">'Burger'</span>;

</code></pre><p>但是，请查看两个谓词之间的相似程度。这不是 <a href="https://en.wikipedia.org/wiki/Don%27t_repeat_yourself">DRY code</a>。另一种选择是调用isBurger谓词并翻转结果。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> isBurger = <span class="hljs-function">(<span class="hljs-params">{cuisine}</span>) =&gt;</span> cuisine === <span class="hljs-string">'Burger'</span>;
<span class="hljs-keyword">const</span> isNotBurger = <span class="hljs-function"><span class="hljs-params">restaurant</span> =&gt;</span> !isBurger(restaurant);

</code></pre><p>这个更好！如果汉堡的定义发生变化，您只需要在一个地方更改逻辑。但是，如果我们想要一些否定的谓词呢？由于这是我们可能经常想要做的事情，因此编写否定函数可能是个好主意。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> negate = <span class="hljs-function"><span class="hljs-params">predicate</span> =&gt;</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> !predicate.apply(<span class="hljs-literal">null</span>, <span class="hljs-built_in">arguments</span>);
}

<span class="hljs-keyword">const</span> isBurger = <span class="hljs-function">(<span class="hljs-params">{cuisine}</span>) =&gt;</span> cuisine === <span class="hljs-string">'Burger'</span>;
<span class="hljs-keyword">const</span> isNotBurger = negate(isBurger);

<span class="hljs-keyword">const</span> isPizza = <span class="hljs-function">(<span class="hljs-params">{cuisine}</span>) =&gt;</span> cuisine === <span class="hljs-string">'Pizza'</span>;
<span class="hljs-keyword">const</span> isNotPizza = negate(isPizza);

</code></pre><p>你可能有一些问题。</p>
<h4>什么是.apply？</h4>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply">MDN:</a></p>
<blockquote>
<p>apply（）方法调用具有给定this的函数，并将参数作为数组（或类数组对象）提供。</p>
</blockquote>
<h4>什么是arguments?</h4>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments">MDN:</a></p>
<blockquote>
<p>arguments对象是所有（非箭头）函数中可用的局部变量。您可以使用参数在函数内引用函数的参数object.</p>
</blockquote>
<h4>为什么要使用旧的function，而不使用更酷的箭头函数？</h4>
<p>在这种情况下，使用传统函数是必要的，因为arguments对象在传统函数上是_唯一_可用的。</p>
<p><strong>到2018年8月20日。</strong>正如一些评论家所正确指出的那样, 你可以使用<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters">rest参数</a>用<a href="https://css-tricks.com/level-up-your-filter-game/#comment-1651631">箭头函数写\ negate \</a>。</p>
<h3>返回谓词</h3>
<p>正如我们在使用negate函数看到的那样，函数很容易在JavaScript中返回一个新函数。这对于编写“谓词”非常有用。例如，让我们回顾一下我们的isBurger和isPizza谓词。</p>
<pre><code class="hljs coffeescript">const isBurger = <span class="hljs-function"><span class="hljs-params">({cuisine})</span> =&gt;</span> cuisine === <span class="hljs-string">'Burger'</span>;
const isPizza  = <span class="hljs-function"><span class="hljs-params">({cuisine})</span> =&gt;</span> cuisine === <span class="hljs-string">'Pizza'</span>;

</code></pre><p>这两个谓词具有相同的逻辑;他们只是在比较上有所不同。因此，我们可以将共享逻辑包装在isCuisine函数中。</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">const isCuisine</span> = comparison =&gt; ({cuisine}) =&gt; cuisine === comparison;
<span class="hljs-attribute">const isBurger</span>  = isCuisine(<span class="hljs-string">'Burger'</span>);
<span class="hljs-attribute">const isPizza</span>   = isCuisine(<span class="hljs-string">'Pizza'</span>);

</code></pre><p>现在，如果我们想开始检查价格怎么办？</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">const isPrice</span> = comparison =&gt; ({price}) =&gt; price === comparison;
<span class="hljs-attribute">const isCheap</span> = isPrice(<span class="hljs-string">'Cheap'</span>);
<span class="hljs-attribute">const isExpensive</span> = isPrice(<span class="hljs-string">'Expensive'</span>);

</code></pre><p>现在isCheap和isExpensive 都是DRY（译者注：Don't repeat yourself ，一种编程原则，不也要写重复的代码），isPizza和isBurger都是DRY，但isPrice和isCuisine可以公用他们的逻辑！</p>
<pre><code class="hljs cs"><span class="hljs-keyword">const</span> isKeyEqualToValue = key =&gt; <span class="hljs-keyword">value</span> =&gt; <span class="hljs-keyword">object</span> =&gt; <span class="hljs-keyword">object</span>[key] === <span class="hljs-keyword">value</span>;

<span class="hljs-comment">// these can be rewritten</span>
<span class="hljs-keyword">const</span> isCuisine = isKeyEqualToValue(<span class="hljs-string">'cuisine'</span>);
<span class="hljs-keyword">const</span> isPrice = isKeyEqualToValue(<span class="hljs-string">'price'</span>);

<span class="hljs-comment">// these don't need to change</span>
<span class="hljs-keyword">const</span> isBurger = isCuisine(<span class="hljs-string">'Burger'</span>);
<span class="hljs-keyword">const</span> isPizza = isCuisine(<span class="hljs-string">'Pizza'</span>);
<span class="hljs-keyword">const</span> isCheap = isPrice(<span class="hljs-string">'Cheap'</span>);
<span class="hljs-keyword">const</span> isExpensive = isPrice(<span class="hljs-string">'Expensive'</span>);

</code></pre><p>对我来说，这就是箭头功能之美。在一行中，您可以优雅地创建三阶函数。</p>
<p>看看从原始餐馆阵列创建多个筛选列表是多么容易？</p>
<p>See the Pen <a href="https://codepen.io/AdamGiese/pen/mjqvdo/">.filter - returning predicates</a> by Adam Giese (<a href="https://codepen.io/AdamGiese">@AdamGiese</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<h3>撰写谓词</h3>
<p>我们现在可以通过汉堡或廉价的价格过滤我们的阵列......但是如果你想要<em>cheap burgers</em>怎么办？一种选择是将两个过滤器链接在一起。</p>
<pre><code class="hljs processing"><span class="hljs-keyword">const</span> cheapBurgers = restaurants.<span class="hljs-built_in">filter</span>(isCheap).<span class="hljs-built_in">filter</span>(isBurger);

</code></pre><p>另一个选择是将两个谓词“组合”成一个谓词。</p>
<pre><code class="hljs lisp">const isCheapBurger = restaurant =&gt; isCheap(<span class="hljs-name">restaurant</span>) &amp;&amp; isBurger(<span class="hljs-name">restaurant</span>)<span class="hljs-comment">;</span>
const isCheapPizza = restaurant =&gt; isCheap(<span class="hljs-name">restaurant</span>) &amp;&amp; isPizza(<span class="hljs-name">restaurant</span>)<span class="hljs-comment">;</span>

</code></pre><p>看看所有重复的代码。我们绝对可以将它包装成一个新功能！</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">const both</span> = (predicate1, predicate2) =&gt; value =&gt;
  predicate1(value) &amp;&amp; predicate2(value);

<span class="hljs-attribute">const isCheapBurger</span> = both(isCheap, isBurger);
<span class="hljs-attribute">const isCheapPizza</span> = both(isCheap, isPizza);

<span class="hljs-attribute">const cheapBurgers</span> = restaurants.filter(isCheapBurger);
<span class="hljs-attribute">const cheapPizza</span> = restaurants.filter(isCheapPizza);

</code></pre><p>如果你没有披萨或汉堡包怎么办？</p>
<pre><code class="hljs cs"><span class="hljs-keyword">const</span> either = (predicate1, predicate2) =&gt; <span class="hljs-keyword">value</span> =&gt;
  predicate1(<span class="hljs-keyword">value</span>) || predicate2(<span class="hljs-keyword">value</span>);

<span class="hljs-keyword">const</span> isDelicious = either(isBurger, isPizza);
<span class="hljs-keyword">const</span> deliciousFood = restaurants.filter(isDelicious);

</code></pre><p>这是朝着正确方向迈出的一步，但是如果您想要包含两种以上的食物呢？这不是一种可扩展的方法。有两种内置的数组方法在这里派上用场。.every和.some都是谓词方法，也接受谓词。.every检查数组的每个成员是否传递谓词，而.some检查数组的<em>any</em>成员是否通过谓词。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> isDelicious = <span class="hljs-function"><span class="hljs-params">restaurant</span> =&gt;</span>
  [isPizza, isBurger, isBbq].some(<span class="hljs-function"><span class="hljs-params">predicate</span> =&gt;</span> predicate(restaurant));

<span class="hljs-keyword">const</span> isCheapAndDelicious = <span class="hljs-function"><span class="hljs-params">restaurant</span> =&gt;</span>
  [isDelicious, isCheap].every(<span class="hljs-function"><span class="hljs-params">predicate</span> =&gt;</span> predicate(restaurant));

</code></pre><p>并且，像往常一样，让我们​​将它们包装成一些有用的抽象。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> isEvery = <span class="hljs-function"><span class="hljs-params">predicates</span> =&gt;</span> value =&gt;
  predicates.every(<span class="hljs-function"><span class="hljs-params">predicate</span> =&gt;</span> predicate(value));

<span class="hljs-keyword">const</span> isAny = <span class="hljs-function"><span class="hljs-params">predicates</span> =&gt;</span> value =&gt;
  predicates.some(<span class="hljs-function"><span class="hljs-params">predicate</span> =&gt;</span> predicate(value));

<span class="hljs-keyword">const</span> isDelicious = isAny([isBurger, isPizza, isBbq]);
<span class="hljs-keyword">const</span> isCheapAndDelicious = isEvery([isCheap, isDelicious]);

</code></pre><p>isEvery和isAny都接受一个谓词数组并返回一个谓词。</p>
<p>由于所有这些谓词都可以通过高阶函数轻松创建，因此根据用户的交互创建和应用这些谓词并不困难。综合我们学到的所有课程，这里是一个应用程序示例，通过应用基于按钮点击的过滤器来搜索餐馆。</p>
<p>See the Pen <a href="https://codepen.io/AdamGiese/pen/xJPMrJ/">.filter - dynamic filters</a> by Adam Giese (<a href="https://codepen.io/AdamGiese">@AdamGiese</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<h3>总结</h3>
<p>过滤器是JavaScript开发的重要组成部分。无论您是从API响应中挑选出错误数据还是响应用户交互，您都会无数次想要数组值的子集。我希望这个概述有助于您可以操作谓词来编写更易读和可维护的代码。</p>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/level-up-your-filter-game](https://www.zcfy.cc/article/level-up-your-filter-game)
原文标题: JavaScript .filter() 方法全解析
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
