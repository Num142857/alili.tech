---
title: 'JavaScript ES6 最值得掌握的5个特性' 
date: 2019-01-24 2:30:11
hidden: true
slug: b5thnqii2yf
categories: [reprint]
---

{{< raw >}}

            <h1>JavaScript ES6 最值得掌握的5个特性</h1>
<p><em>Posted: Sept 20th, 2017</em></p>
<p>JavaScript ES6 添加了一系列新的语言特性，其中一些特性比其它更具有开创性以及更广的可用性。比如像 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">ES6 类</a> 这样的特性，虽然新奇，但其实仅仅是在 JavaScript 中创建类的已有方法之上的一种语法糖。而像生成器（generator）这样的功能，虽然非常强大，但却是为了针对性的任务所保留的。</p>
<p>从在过去的12个月里所从事的不同 JavaScript 相关项目中，我发现有 5 个 ES6 特性是不可或缺的，因为它们真正简化了 JavaScript 普通任务的完成方式。你心中的前 5 名可能和我的不一样，如果是的话，我希望你能在结尾的评论区分享它们。</p>
<p>让我们正式开始！</p>
<ol>
<li><p><a href="#arrowfunctions">箭头函数（Arrow Functions）</a></p>
</li>
<li><p><a href="#javascriptpromises">Promises</a></p>
</li>
<li><p><a href="#asyncfunctions">异步函数（Async Functions）</a></p>
</li>
<li><p><a href="#destructuring">解构（Destructuring）</a></p>
</li>
<li><p><a href="#defaultandspreadparameters">默认和剩余参数（Default and Rest Parameters）</a></p>
</li>
</ol>
<h2>1) JavaScript 箭头函数</h2>
<p>在 ES6 JavaScript 中，我最喜欢的新增特性之一并不是一个全新特性，而是一个我每次使用都能让我微笑的新语法。我说的就是箭头函数，它提供了一种极致优雅和简洁的方式来定义匿名函数。</p>
<p>简而言之，箭头函数就是丢掉了关键字 <code>function</code>，然后用一个箭头 <code>=&gt;</code> 来分离一个匿名函数的参数部分和函数体：</p>
<pre><code class="hljs lisp">(<span class="hljs-name">x</span>, y) =&gt; x * y<span class="hljs-comment">;</span>
</code></pre>
<p>这相当于:</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(x, y)</span></span>{
    <span class="hljs-keyword">return</span> x * y;
}
</code></pre>
<p>或者:</p>
<pre><code class="hljs maxima">(x, y) =&gt; {
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">factor</span> = <span class="hljs-number">5</span>;
    <span class="hljs-built_in">var</span> growth = (x-y) * <span class="hljs-built_in">factor</span>;
}
</code></pre>
<p>完全等价于:</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(x, y)</span></span>{
    <span class="hljs-keyword">var</span> factor = <span class="hljs-number">5</span>;
    <span class="hljs-keyword">var</span> growth = (x-y) * factor;
}
</code></pre>
<p>在使用传统的匿名函数时，箭头函数还消除了一个关键的错误源，即函数内的 <code>this</code> 对象的值。使用箭头函数，<code>this</code> 是基于词法绑定，这仅仅是意味着它的值被绑定到父级作用域的一种奇特的方式，并且永远不会改变。如果一个箭头函数定义在一个自定义对象  <code>countup</code> 中，<code>this</code> 值毫无疑问地指向 <code>countup</code>。比如：</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">var</span> countup = {
    counter: <span class="hljs-number">15</span>,

    start:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            alert(<span class="hljs-keyword">this</span>.counter) <span class="hljs-comment">// correctly alerts 15 due to lexical binding of this</span>
        })
    }
};

countup.start();
</code></pre>
<p>对比传统匿名函数，<code>this</code> 的值在哪变化取决于它被定义的上下文环境。当在上面的例子中尝试引用 <code>this.counter</code>，结果将返回 <code>undefined</code>，这种行为可能会把很多不熟悉动态绑定的复杂性的人搞糊涂。使用箭头函数，<code>this</code> 的值总是可预测并且容易推断的。</p>
<p>对于箭头函数的详细讲解， 请看 "<a href="http://www.javascriptkit.com/javatutors/javascriptarrowfunctions.shtml">Overview of JavaScript Arrow Functions</a>".</p>
<h2>2) JavaScript Promises</h2>
<p>JavaScript ES6 Promises 使异步任务的处理方式变成线性， 这是大多数现代Web应用程序中的一项任务。 而不是依靠回调函数 —— 通过JavaScript框架（如jQuery）普及。JavaScript Promises 使用一个中心直观的机制来跟踪和响应异步事件。它不仅使调试异步代码变得更容易，而且使得编写它也是一种乐趣。</p>
<p>所有 JavaScript Promise 都是通过 <code>Promise()</code> 构造函数开始和结束:</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> mypromise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
 <span class="hljs-comment">// 在这编写异步代码</span>
 <span class="hljs-comment">// 调用 resolve() 来表示任务成功完成</span>
 <span class="hljs-comment">// 调用 reject() 来表示任务失败</span>
})
</code></pre>
<p>在内部使用 <code>resolve()</code> 和 <code>reject()</code> 方法，当一个 Promise 被完成或拒绝时，我们可以分别向一个 Promise 对象发出信号。 <code>then()</code> 与 <code>catch()</code> 方法随后可以被调用，用以处理完成或拒绝 Promise 后的工作。</p>
<p>我用下面一个被注入 XMLHttpRequest 函数的 Promise 的变种，来一个接一个的检索外部文件内容：</p>
<pre><code class="hljs coffeescript">function getasync(url) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
        const xhr = <span class="hljs-keyword">new</span> XMLHttpRequest()
        xhr.open(<span class="hljs-string">"GET"</span>, url)
        xhr.onload = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(xhr.responseText)
        xhr.onerror = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> reject(xhr.statusText)
        xhr.send()
    })
}

getasync(<span class="hljs-string">'test.txt'</span>).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(msg)</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(msg) <span class="hljs-regexp">//</span> echos contents <span class="hljs-keyword">of</span> text.txt
    <span class="hljs-keyword">return</span> getasync(<span class="hljs-string">'test2.txt'</span>)
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(msg)</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(msg) <span class="hljs-regexp">//</span> echos contents <span class="hljs-keyword">of</span> text2.txt
    <span class="hljs-keyword">return</span> getasync(<span class="hljs-string">'test3.txt'</span>)
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(msg)</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(msg) <span class="hljs-regexp">//</span> echos contents <span class="hljs-keyword">of</span> text3.txt
})
</code></pre>
<p>要掌握 JavaScript Promises 的关键点，例如 Promise 链和并行执行 Promise，请阅读 "<a href="http://www.javascriptkit.com/javatutors/javascriptpromises.shtml">Beginner's Guide to Promises</a>".</p>
<h2>3) JavaScript 异步函数</h2>
<p>除了 JavaScript Promise，异步函数进一步重写了传统的异步代码结构，使其更具可读性。每当我向客户展示带有async 编程功能的代码时，第一个反应总是令人惊讶，随之而来的是了解它是如何工作的好奇心。</p>
<p>一个异步函数由两部分构成:</p>
<p><strong>1) 一个以 <code>async</code> 为前缀的常规函数</strong></p>
<pre><code class="hljs javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchdata</span>(<span class="hljs-params">url</span>)</span>{
    <span class="hljs-comment">// Do something</span>
    <span class="hljs-comment">// Always returns a promise</span>
}
</code></pre>
<p><strong>2) 在异步函数（Async function）内，使用 <code>await</code> 关键字调用异步操作函数</strong></p>
<p>一个例子胜过千言万语。下面是基于上面示例重写的 Promise，以便使用 <strong>Async functions</strong>代替：</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getasync</span>(<span class="hljs-params">url</span>) </span>{ <span class="hljs-comment">// same as original function</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest()
        xhr.open(<span class="hljs-string">"GET"</span>, url)
        xhr.onload = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(xhr.responseText)
        xhr.onerror = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> reject(xhr.statusText)
        xhr.send()
    })
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchdata</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">// main Async function</span>
    <span class="hljs-keyword">var</span> text1 = <span class="hljs-keyword">await</span> getasync(<span class="hljs-string">'test.txt'</span>)
    <span class="hljs-built_in">console</span>.log(text1)
    <span class="hljs-keyword">var</span> text2 = <span class="hljs-keyword">await</span> getasync(<span class="hljs-string">'test2.txt'</span>)
    <span class="hljs-built_in">console</span>.log(text2)
    <span class="hljs-keyword">var</span> text3 = <span class="hljs-keyword">await</span> getasync(<span class="hljs-string">'test3.txt'</span>)
    <span class="hljs-built_in">console</span>.log(text3)
    <span class="hljs-keyword">return</span> <span class="hljs-string">"Finished"</span>
}

fetchdata().then(<span class="hljs-function">(<span class="hljs-params">msg</span>) =&gt;</span>{
    <span class="hljs-built_in">console</span>.log(msg) <span class="hljs-comment">// logs "finished"</span>
})
</code></pre>
<p>上面的例子运行时会输出“test.txt”，“test2.txt”，“test3.txt”，最后是“Finished”。</p>
<p>如你所见，在异步函数中，我们把异步函数 <code>getasync()</code> 当作是同步函数调用 - 没有 <code>then()</code> 方法或回调函数通知进行下一步。无论何时遇到关键字 <code>await</code>，执行都会暂停，直到 <code>getasync()</code> 解决，然后再转到异步函数中的下一行。结果与纯粹的基于 Promise，使用一串 <code>then</code> 方法的方式一样。</p>
<p>要掌握异步函数，包括如何 <code>await</code> 并行执行函数，请阅读 "<a href="http://www.javascriptkit.com/javatutors/intro-javascript-async-functions.shtml">Introduction to JavaScript Async Functions- Promises simplified</a>"</p>
<h2>4) JavaScript 解构</h2>
<p>除了箭头函数，这是我每天使用最多的 ES6 功能。ES6 解构并非一个新功能，而是一个新的赋值语法，可以让您快速解压缩对象属性和数组中的值，并将它们分配给各个变量。</p>
<pre><code class="hljs sqf">var profile = {<span class="hljs-built_in">name</span>:<span class="hljs-string">'George'</span>, age:<span class="hljs-number">39</span>, hobby:<span class="hljs-string">'Tennis'</span>}
var {<span class="hljs-built_in">name</span>, hobby} = profile <span class="hljs-comment">// destructure profile object</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">name</span>) <span class="hljs-comment">// "George"</span>
console.<span class="hljs-built_in">log</span>(hobby) <span class="hljs-comment">// "Tennis"</span>
</code></pre>
<p>这里我用解构快速提取 <code>profile</code> 对象的 <code>name</code> 和 <code>hobby</code> 属性 。</p>
<p>使用别名，你可以使用与你正在提取值的对象属性不同的变量名：</p>
<pre><code class="hljs groovy">var profile = {<span class="hljs-string">name:</span><span class="hljs-string">'George'</span>, <span class="hljs-string">age:</span><span class="hljs-number">39</span>, <span class="hljs-string">hobby:</span><span class="hljs-string">'Tennis'</span>}
var {<span class="hljs-string">name:</span>n, <span class="hljs-string">hobby:</span>h} = profile <span class="hljs-comment">// destructure profile object</span>
console.log(n) <span class="hljs-comment">// "George"</span>
console.log(h) <span class="hljs-comment">// "Tennis"</span>
</code></pre>
<h3>嵌套对象解构</h3>
<p>解构也可以与嵌套对象一起工作，我一直使用它来快速解开来自复杂的JSON请求的值：</p>
<pre><code class="hljs lasso"><span class="hljs-built_in">var</span> jsondata = {
    title: <span class="hljs-string">'Top 5 JavaScript ES6 Features'</span>,
    Details: {
        <span class="hljs-built_in">date</span>: {
            created: <span class="hljs-string">'2017/09/19'</span>,
            modified: <span class="hljs-string">'2017/09/20'</span>,
        },
        Category: <span class="hljs-string">'JavaScript'</span>,
    },
    url: <span class="hljs-string">'/top-5-es6-features/'</span>
};

<span class="hljs-built_in">var</span> {title, Details: {<span class="hljs-built_in">date</span>: {created, modified"}}"} = jsondata
console.<span class="hljs-keyword">log</span>(title) <span class="hljs-comment">// 'Top 5 JavaScript ES6 Features'</span>
console.<span class="hljs-keyword">log</span>(created) <span class="hljs-comment">// '2017/09/19'</span>
console.<span class="hljs-keyword">log</span>(modified) <span class="hljs-comment">// '2017/09/20'</span>
</code></pre>
<h3>解构数组</h3>
<p>数组的解构与在对象上的工作方式类似，除了左边的花括号使用方括号代替：</p>
<pre><code class="hljs stylus"><span class="hljs-selector-tag">var</span> soccerteam = [<span class="hljs-string">'George'</span>, <span class="hljs-string">'Dennis'</span>, <span class="hljs-string">'Sandy'</span>]
<span class="hljs-selector-tag">var</span> [<span class="hljs-selector-tag">a</span>, b] = soccerteam <span class="hljs-comment">// destructure soccerteam array</span>
console.log(a) <span class="hljs-comment">// "George"</span>
console.log(b) <span class="hljs-comment">// "Dennis"</span>
</code></pre>
<p>你可以跳过某些数组元素，通过使用逗号（，）：</p>
<pre><code class="hljs stylus"><span class="hljs-selector-tag">var</span> soccerteam = [<span class="hljs-string">'George'</span>, <span class="hljs-string">'Dennis'</span>, <span class="hljs-string">'Sandy'</span>]
<span class="hljs-selector-tag">var</span> [<span class="hljs-selector-tag">a</span>,,b] = soccerteam <span class="hljs-comment">// destructure soccerteam array</span>
console.log(a) <span class="hljs-comment">// "George"</span>
console.log(b) <span class="hljs-comment">// "Sandy"</span>
</code></pre>
<p>对我而言，解构消除了传统方式提取和分配对象属性和数组值的所有摩擦。要充分掌握ES6解构的复杂性和潜力，请阅读"<a href="https://hackernoon.com/getting-to-grips-with-es6-destructuring-e5b5ddb34990">Getting to Grips with ES6: Destructuring</a>".</p>
<h2>5) 默认和剩余参数（Default and Rest Parameters）</h2>
<p>最后，我最想提出的ES6的两个特性是处理函数参数。几乎我们在JavaScript中创建的每个函数都接受用户数据，所以这两个特性在一个月中不止一次地派上用场。</p>
<h3>默认参数（Default Parameters）</h3>
<p>我们都使用过一下模式来创建具有默认值的参数：</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getarea</span><span class="hljs-params">(w,h)</span></span>{
  <span class="hljs-keyword">var</span> w = w || <span class="hljs-number">10</span>
  <span class="hljs-keyword">var</span> h = h || <span class="hljs-number">15</span>
  <span class="hljs-keyword">return</span> w * h
}
</code></pre>
<p>有了ES6对默认参数的支持，显式定义的参数值的日子已经结束：</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getarea</span><span class="hljs-params">(w=10, h=15)</span></span>{
  <span class="hljs-keyword">return</span> w * h
}
getarea(<span class="hljs-number">5</span>) <span class="hljs-comment">// returns 75</span>
</code></pre>
<p>关于 ES6 默认参数的更多详情 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters">在这</a>.</p>
<h3>剩余参数（Rest Parameters）</h3>
<p>ES6中的 Rest Parameters 使得将函数参数转换成数组的操作变得简单。</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addit</span><span class="hljs-params">(<span class="hljs-rest_arg">...theNumbers</span>)</span></span>{
  <span class="hljs-comment">// get the sum of the array elements</span>
    <span class="hljs-keyword">return</span> theNumbers.reduce((prevnum, curnum) =&gt; prevnum + curnum, <span class="hljs-number">0</span>) 
}

addit(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>) <span class="hljs-comment">// returns 10</span>
</code></pre>
<p>通过在命名参数前添加3个点 <code>...</code>，在该位置和之后输入到函数中的参数将自动转换为数组。</p>
<p> 没有 Rest Parameters, 我们不得不做一些复杂的操作比如 <a href="http://www.javascriptkit.com/javatutors/arrayprototypeslice.shtml">手动将参数转换为数组</a> ：</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addit</span>(<span class="hljs-params">theNumbers</span>)</span>{
    <span class="hljs-comment">// force arguments object into array</span>
    <span class="hljs-keyword">var</span> numArray = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>) 
    <span class="hljs-keyword">return</span> numArray.reduce(<span class="hljs-function">(<span class="hljs-params">prevnum, curnum</span>) =&gt;</span> prevnum + curnum, <span class="hljs-number">0</span>)
}

addit(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>) <span class="hljs-comment">// returns 10</span>
</code></pre>
<p>Rest parameters 只能应用于函数的参数的一个子集，就像下面这样，它只会将参数从第二个开始转换为数组：</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span><span class="hljs-params">(date, <span class="hljs-rest_arg">...lucknumbers</span>)</span></span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">'The Lucky Numbers for '</span> + date + <span class="hljs-string">' are: '</span> + lucknumbers.join(<span class="hljs-string">', '</span>)
}

alert( f1(<span class="hljs-string">'2017/09/29'</span>, <span class="hljs-number">3</span>, <span class="hljs-number">32</span>, <span class="hljs-number">43</span>, <span class="hljs-number">52</span>) ) <span class="hljs-comment">// alerts "The Lucky Numbers for 2017/09/29 are 3,32,43,52"</span>
</code></pre>
<p>对于 ES6 中 Rest Parameters 完整规范，<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters">看这里</a>.</p>
<h2>结论</h2>
<p>你同意我所说的 ES6 特性的前五名吗？哪个是你最常用的，请在评论区和大家分享。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript ES6 最值得掌握的5个特性

## 原文链接
[https://www.zcfy.cc/article/top-five-features-in-javascript-es6-worth-mastering](https://www.zcfy.cc/article/top-five-features-in-javascript-es6-worth-mastering)

