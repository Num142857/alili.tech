---
title: 'JavaScript函数式编程（一）' 
date: 2019-02-06 2:30:09
hidden: true
slug: 7qeo5sv9wre
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">一、引言</h3>
<p>说到函数式编程，大家可能第一印象都是学院派的那些晦涩难懂的代码，充满了一大堆抽象的不知所云的符号，似乎只有大学里的计算机教授才会使用这些东西。在曾经的某个时代可能确实如此，但是近年来随着技术的发展，函数式编程已经在实际生产中发挥巨大的作用了，越来越多的语言开始加入闭包，匿名函数等非常典型的函数式编程的特性，从某种程度上来讲，函数式编程正在逐步“同化”命令式编程。</p>
<p>JavaScript 作为一种典型的多范式编程语言，这两年随着React的火热，函数式编程的概念也开始流行起来，RxJS、cycleJS、lodashJS、underscoreJS等多种开源库都使用了函数式的特性。所以下面介绍一些函数式编程的知识和概念。</p>
<h3 id="articleHeader1">二、纯函数</h3>
<p>如果你还记得一些初中的数学知识的话，函数 <code>f</code> 的概念就是，对于输入 <code>x</code> 产生一个输出 <code>y = f(x)</code>。这便是一种最简单的纯函数。<strong>纯函数的定义是，对于相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用，也不依赖外部环境的状态。</strong></p>
<p>下面来举个栗子，比如在Javascript中对于数组的操作，有些是纯的，有些就不是纯的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3,4,5];

// Array.slice是纯函数，因为它没有副作用，对于固定的输入，输出总是固定的
// 可以，这很函数式
xs.slice(0,3);
//=> [1,2,3]
xs.slice(0,3);
//=> [1,2,3]


// Array.splice是不纯的，它有副作用，对于固定的输入，输出不是固定的
// 这不函数式
xs.splice(0,3);
//=> [1,2,3]
xs.splice(0,3);
//=> [4,5]
xs.splice(0,3);
//=> []" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];

<span class="hljs-comment">// Array.slice是纯函数，因为它没有副作用，对于固定的输入，输出总是固定的</span>
<span class="hljs-comment">// 可以，这很函数式</span>
xs.slice(<span class="hljs-number">0</span>,<span class="hljs-number">3</span>);
<span class="hljs-comment">//=&gt; [1,2,3]</span>
xs.slice(<span class="hljs-number">0</span>,<span class="hljs-number">3</span>);
<span class="hljs-comment">//=&gt; [1,2,3]</span>


<span class="hljs-comment">// Array.splice是不纯的，它有副作用，对于固定的输入，输出不是固定的</span>
<span class="hljs-comment">// 这不函数式</span>
xs.splice(<span class="hljs-number">0</span>,<span class="hljs-number">3</span>);
<span class="hljs-comment">//=&gt; [1,2,3]</span>
xs.splice(<span class="hljs-number">0</span>,<span class="hljs-number">3</span>);
<span class="hljs-comment">//=&gt; [4,5]</span>
xs.splice(<span class="hljs-number">0</span>,<span class="hljs-number">3</span>);
<span class="hljs-comment">//=&gt; []</span></code></pre>
<p>在函数式编程中，我们想要的是 <code>slice</code> 这样的纯函数，而不是 <code>splice</code>这种每次调用后都会把数据弄得一团乱的函数。</p>
<p>为什么函数式编程会排斥不纯的函数呢？下面再看一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//不纯的
var min = 18;
var checkage = age => age > min;

//纯的，这很函数式
var checkage = age => age > 18;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//不纯的</span>
<span class="hljs-keyword">var</span> min = <span class="hljs-number">18</span>;
<span class="hljs-keyword">var</span> checkage = <span class="hljs-function"><span class="hljs-params">age</span> =&gt;</span> age &gt; min;

<span class="hljs-comment">//纯的，这很函数式</span>
<span class="hljs-keyword">var</span> checkage = <span class="hljs-function"><span class="hljs-params">age</span> =&gt;</span> age &gt; <span class="hljs-number">18</span>;</code></pre>
<p>在不纯的版本中，<code>checkage</code> 这个函数的行为不仅取决于输入的参数 <code>age</code>，还取决于一个外部的变量 <code>min</code>，换句话说，这个函数的行为需要由外部的系统环境决定。对于大型系统来说，这种对于外部状态的依赖是造成系统复杂性大大提高的主要原因。</p>
<p>可以注意到，纯的 <code>checkage</code> 把关键数字 <code>18</code> 硬编码在函数内部，扩展性比较差，我们可以在后面的<strong>柯里化</strong>中看到如何用优雅的函数式解决这种问题。</p>
<p>纯函数不仅可以有效降低系统的复杂度，还有很多很棒的特性，比如可缓存性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import _ from 'lodash';

var sin = _.memorize(x => Math.sin(x));
//第一次计算的时候会稍慢一点
var a = sin(1);
//第二次有了缓存，速度极快
var b = sin(1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;

<span class="hljs-keyword">var</span> sin = _.memorize(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">Math</span>.sin(x));
<span class="hljs-comment">//第一次计算的时候会稍慢一点</span>
<span class="hljs-keyword">var</span> a = sin(<span class="hljs-number">1</span>);
<span class="hljs-comment">//第二次有了缓存，速度极快</span>
<span class="hljs-keyword">var</span> b = sin(<span class="hljs-number">1</span>);</code></pre>
<h3 id="articleHeader2">三、函数的柯里化</h3>
<p>函数柯里化（curry）的定义很简单：传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。</p>
<p>比如对于加法函数 <code>var add = (x, y) =&gt;　x + y</code> ，我们可以这样进行柯里化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//比较容易读懂的ES5写法
var add = function(x){
    return function(y){
        return x + y
    }
}

//ES6写法，也是比较正统的函数式写法
var add = x => (y => x + y);

//试试看
var add2 = add(2);
var add200 = add(200);

add2(2); // =>4
add200(50); // =>250" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//比较容易读懂的ES5写法</span>
<span class="hljs-keyword">var</span> add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">y</span>)</span>{
        <span class="hljs-keyword">return</span> x + y
    }
}

<span class="hljs-comment">//ES6写法，也是比较正统的函数式写法</span>
<span class="hljs-keyword">var</span> add = <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> (<span class="hljs-function"><span class="hljs-params">y</span> =&gt;</span> x + y);

<span class="hljs-comment">//试试看</span>
<span class="hljs-keyword">var</span> add2 = add(<span class="hljs-number">2</span>);
<span class="hljs-keyword">var</span> add200 = add(<span class="hljs-number">200</span>);

add2(<span class="hljs-number">2</span>); <span class="hljs-comment">// =&gt;4</span>
add200(<span class="hljs-number">50</span>); <span class="hljs-comment">// =&gt;250</span></code></pre>
<p>对于加法这种极其简单的函数来说，柯里化并没有什么大用处。</p>
<p>还记得上面那个checkage的函数吗？我们可以这样柯里化它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var checkage = min => (age => age > min);
var checkage18 = checkage(18);

checkage18(20);
// =>true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> checkage = <span class="hljs-function"><span class="hljs-params">min</span> =&gt;</span> (<span class="hljs-function"><span class="hljs-params">age</span> =&gt;</span> age &gt; min);
<span class="hljs-keyword">var</span> checkage18 = checkage(<span class="hljs-number">18</span>);

checkage18(<span class="hljs-number">20</span>);
<span class="hljs-comment">// =&gt;true</span></code></pre>
<p><strong>事实上柯里化是一种“预加载”函数的方法，通过传递较少的参数，得到一个已经记住了这些参数的新函数，某种意义上讲，这是一种对参数的“缓存”，是一种非常高效的编写函数的方法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { curry } from 'lodash';

//首先柯里化两个纯函数
var match = curry((reg, str) => str.match(reg));
var filter = curry((f, arr) => arr.filter(f));

//判断字符串里有没有空格
var haveSpace = match(/\s+/g);

haveSpace(&quot;ffffffff&quot;);
//=>null
haveSpace(&quot;a b&quot;);
//=>[&quot; &quot;]

filter(haveSpace, [&quot;abcdefg&quot;, &quot;Hello World&quot;]);
//=>[&quot;Hello world&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { curry } <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;

<span class="hljs-comment">//首先柯里化两个纯函数</span>
<span class="hljs-keyword">var</span> match = curry(<span class="hljs-function">(<span class="hljs-params">reg, str</span>) =&gt;</span> str.match(reg));
<span class="hljs-keyword">var</span> filter = curry(<span class="hljs-function">(<span class="hljs-params">f, arr</span>) =&gt;</span> arr.filter(f));

<span class="hljs-comment">//判断字符串里有没有空格</span>
<span class="hljs-keyword">var</span> haveSpace = match(<span class="hljs-regexp">/\s+/g</span>);

haveSpace(<span class="hljs-string">"ffffffff"</span>);
<span class="hljs-comment">//=&gt;null</span>
haveSpace(<span class="hljs-string">"a b"</span>);
<span class="hljs-comment">//=&gt;[" "]</span>

filter(haveSpace, [<span class="hljs-string">"abcdefg"</span>, <span class="hljs-string">"Hello World"</span>]);
<span class="hljs-comment">//=&gt;["Hello world"]</span></code></pre>
<h3 id="articleHeader3">四、函数组合</h3>
<p>学会了使用纯函数以及如何把它柯里化之后，我们会很容易写出这样的“包菜式”代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="h(g(f(x)));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code style="word-break: break-word; white-space: initial;">h(<span class="hljs-name">g</span>(<span class="hljs-name">f</span>(<span class="hljs-name">x</span>)))<span class="hljs-comment">;</span></code></pre>
<p>虽然这也是函数式的代码，但它依然存在某种意义上的“不优雅”。为了解决函数嵌套的问题，我们需要用到“函数组合”：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//两个函数的组合
var compose = function(f, g) {
    return function(x) {
        return f(g(x));
    };
};

//或者
var compose = (f, g) => (x => f(g(x)));

var add1 = x => x + 1;
var mul5 = x => x * 5;

compose(mul5, add1)(2);
// =>15 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//两个函数的组合</span>
<span class="hljs-keyword">var</span> compose = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">f, g</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{
        <span class="hljs-keyword">return</span> f(g(x));
    };
};

<span class="hljs-comment">//或者</span>
<span class="hljs-keyword">var</span> compose = <span class="hljs-function">(<span class="hljs-params">f, g</span>) =&gt;</span> (<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> f(g(x)));

<span class="hljs-keyword">var</span> add1 = <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x + <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> mul5 = <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x * <span class="hljs-number">5</span>;

compose(mul5, add1)(<span class="hljs-number">2</span>);
<span class="hljs-comment">// =&gt;15 </span></code></pre>
<p>我们定义的<code>compose</code>就像双面胶一样，可以把任何两个纯函数结合到一起。当然你也可以扩展出组合三个函数的“三面胶”，甚至“四面胶”“N面胶”。</p>
<p>这种灵活的组合可以让我们像拼积木一样来组合函数式的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var first = arr => arr[0];
var reverse = arr => arr.reverse();

var last = compose(first, reverse);

last([1,2,3,4,5]);
// =>5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> first = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> arr[<span class="hljs-number">0</span>];
<span class="hljs-keyword">var</span> reverse = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> arr.reverse();

<span class="hljs-keyword">var</span> last = compose(first, reverse);

last([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>]);
<span class="hljs-comment">// =&gt;5</span></code></pre>
<h3 id="articleHeader4">五、Point Free</h3>
<p>有了柯里化和函数组合的基础知识，下面介绍一下Point Free这种代码风格。</p>
<p>细心的话你可能会注意到，之前的代码中我们总是喜欢把一些对象自带的方法转化成纯函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var map = (f, arr) => arr.map(f);
var toUpperCase = word => word.toUpperCase();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> map = <span class="hljs-function">(<span class="hljs-params">f, arr</span>) =&gt;</span> arr.map(f);
<span class="hljs-keyword">var</span> toUpperCase = <span class="hljs-function"><span class="hljs-params">word</span> =&gt;</span> word.toUpperCase();</code></pre>
<p>这种做法是有原因的。</p>
<p>Point Free这种模式现在还暂且没有中文的翻译，有兴趣的话可以看看这里的英文解释：<br><a href="https://en.wikipedia.org/wiki/Tacit_programming" rel="nofollow noreferrer" target="_blank">https://en.wikipedia.org/wiki...</a></p>
<p>用中文解释的话大概就是，不要命名转瞬即逝的中间变量，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这不Piont free
var f = str => str.toUpperCase().split(' ');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//这不Piont free</span>
<span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-params">str</span> =&gt;</span> str.toUpperCase().split(<span class="hljs-string">' '</span>);</code></pre>
<p>这个函数中，我们使用了 <code>str</code> 作为我们的中间变量，但这个中间变量除了让代码变得长了一点以外是毫无意义的。下面改造一下这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var toUpperCase = word => word.toUpperCase();
var split = x => (str => str.split(x));

var f = compose(split(' '), toUpperCase);

f(&quot;abcd efgh&quot;);
// =>[&quot;ABCD&quot;, &quot;EFGH&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> toUpperCase = <span class="hljs-function"><span class="hljs-params">word</span> =&gt;</span> word.toUpperCase();
<span class="hljs-keyword">var</span> split = <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> (<span class="hljs-function"><span class="hljs-params">str</span> =&gt;</span> str.split(x));

<span class="hljs-keyword">var</span> f = compose(split(<span class="hljs-string">' '</span>), toUpperCase);

f(<span class="hljs-string">"abcd efgh"</span>);
<span class="hljs-comment">// =&gt;["ABCD", "EFGH"]</span></code></pre>
<p>这种风格能够帮助我们减少不必要的命名，让代码保持简洁和通用。当然，为了在一些函数中写出Point Free的风格，在代码的其它地方必然是不那么Point Free的，这个地方需要自己取舍。</p>
<h3 id="articleHeader5">六、声明式与命令式代码</h3>
<p>命令式代码的意思就是，我们通过编写一条又一条指令去让计算机执行一些动作，这其中一般都会涉及到很多繁杂的细节。</p>
<p>而声明式就要优雅很多了，我们通过写表达式的方式来声明我们想干什么，而不是通过一步一步的指示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//命令式
var CEOs = [];
for(var i = 0; i < companies.length; i++){
    CEOs.push(companies[i].CEO)
}

//声明式
var CEOs = companies.map(c => c.CEO);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//命令式</span>
<span class="hljs-keyword">var</span> CEOs = [];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; companies.length; i++){
    CEOs.push(companies[i].CEO)
}

<span class="hljs-comment">//声明式</span>
<span class="hljs-keyword">var</span> CEOs = companies.map(<span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> c.CEO);</code></pre>
<p>命令式的写法要先实例化一个数组，然后再对 companies 数组进行for循环遍历，手动命名、判断、增加计数器，就好像你开了一辆零件全部暴露在外的汽车一样，虽然很机械朋克风，但这并不是优雅的程序员应该做的。</p>
<p>声明式的写法是一个表达式，如何进行计数器迭代，返回的数组如何收集，这些细节都隐藏了起来。它指明的是做什么，而不是怎么做。除了更加清晰和简洁之外，map 函数还可以进一步独立优化，甚至用解释器内置的速度极快的 map 函数，这么一来我们主要的业务代码就无须改动了。</p>
<p>函数式编程的一个明显的好处就是这种声明式的代码，对于无副作用的纯函数，我们完全可以不考虑函数内部是如何实现的，专注于编写业务代码。优化代码时，目光只需要集中在这些稳定坚固的函数内部即可。</p>
<p>相反，不纯的不函数式的代码会产生副作用或者依赖外部系统环境，使用它们的时候总是要考虑这些不干净的副作用。在复杂的系统中，这对于程序员的心智来说是极大的负担。</p>
<h3 id="articleHeader6">七、尾声</h3>
<p>任何代码都是要有实际用处才有意义，对于JS来说也是如此。然而现实的编程世界显然不如范例中的函数式世界那么美好，实际应用中的JS是要接触到ajax、DOM操作，NodeJS环境中读写文件、网络操作这些对于外部环境强依赖，有明显副作用的“很脏”的工作。</p>
<p>这对于函数式编程来说也是很大的挑战，所以我们也需要更强大的技术去解决这些“脏问题”。我会在下一篇文章中介绍函数式编程的更加高阶一些的知识，例如Functor、Monad等等概念。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript函数式编程（一）

## 原文链接
[https://segmentfault.com/a/1190000006046508](https://segmentfault.com/a/1190000006046508)

