---
title: '[译]函数式JavaScript之Functors' 
date: 2019-02-13 2:31:22
hidden: true
slug: 2l59mrk8evj
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Functors</h1>
<p>先看看如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function plus1(value) {  
    return value + 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">plus1</span>(<span class="hljs-params">value</span>) </span>{  
    <span class="hljs-keyword">return</span> value + <span class="hljs-number">1</span>;
}</code></pre>
<p>这就是一个普通函数，接收一个<code>integer</code>作为参数，再加1返回。类似的，我们还能再来一个加2的函数。稍后我们会用到这几个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function plus2(value) {  
    return value + 2;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">plus2</span>(<span class="hljs-params">value</span>) </span>{  
    <span class="hljs-keyword">return</span> value + <span class="hljs-number">2</span>;
}</code></pre>
<p>下面我们来写一个如下的组合函数，来按需执行上述函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function F(value, fn) {  
    return fn(value);
}

F(1, plus1) ==>> 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span>(<span class="hljs-params">value, fn</span>) </span>{  
    <span class="hljs-keyword">return</span> fn(value);
}

F(<span class="hljs-number">1</span>, plus1) ==&gt;&gt; <span class="hljs-number">2</span></code></pre>
<p>当传入正确的<code>integer</code>参数时，这个组合函数<code>F</code>工作正常，那如果传入的数据类型是<code>Array</code>呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="F([1, 2, 3], plus1)   ==>> '1,2,31'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">F([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], plus1)   ==&gt;&gt; <span class="hljs-string">'1,2,31'</span></code></pre>
<p>我擦，我们给了一个<code>Array of integers</code>，想让她们和<code>plus1</code>中的数值相加，结果返回的是个<code>string</code>?！结果不对不说，我们是以<code>Array</code>开头儿的，结果返回一个<code>string</code>，类型也没对上啊！换句话说，我们这个程序把输入的结构也给整岔劈了。我们还是希望函数<code>F</code>能做“正确的事儿”－维护输入参数的数据结构，并使其被各<code>handler</code>正确处理。</p>
<p>OK，我这儿说的“维护输入参数的数据结构”是？这个函数<code>F</code>应该把传入的<code>Array</code>拆开并得到其中的每一个值。然后依次交给<code>handler</code>处理。然后把<code>handler</code>处理后的各个结果再封装成一个新的<code>Array</code>，然后返回这个新<code>Array</code>。好消息是我这一堆废话说的东西都不用你写了，<code>JavaScript</code>已经写好这么一个函数了，她叫<code>map</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2, 3].map(plus1)   ==>> [2, 3, 4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(plus1)   ==&gt;&gt; [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]</code></pre>
<p><code>map</code>就是一个<code>functor</code>！</p>
<p><code>functor</code>就是一个函数，接收一个数值、一个<code>handler</code>，然后做事儿！</p>
<p>再说细点儿</p>
<p><code>functor</code>就是一个函数，接收一个数值、一个<code>handler</code>，拆开传入的原始值，得到其中的各个分解后的值，然后调用<code>handler</code>依次处理每一个上一步的到的数据，再将处理后的多个数据再封装成一个新的结构体，最后返回这个新的结构体。</p>
<p>这里要注意传入值的类型，拆开后的各个数值可能是原始数据类型，也可能是集合。</p>
<p>而且，最后返回的数据类型也不必一定和传入的数据类型一模一样。在我们上面的例子里，<code>map</code>的输入和返回值是一样的数据类型，都是<code>Array</code>。返回的数据结构可以是任意结构，只要能分别获取其中的数值即可。所以，假设你有一个函数，接收一个<code>Array</code>作为参数，但返回一个包含了<code>keys</code>的<code>Object</code>，每个<code>key</code>都指向一个对应的数值，那这也是一个<code>functor</code>。</p>
<p>在<code>JavaScript</code>里，<code>filter</code>就是一个<code>functor</code>，因为她依旧返回一个<code>Array</code>，但<code>forEach</code>就不是，因为她返回<code>undefined</code>。这就是我们说的，<code>forEach</code>没有“维护输入参数的数据结构”。</p>
<p><code>Functors</code>是数学里关于"homomorphisms between categories"的概念，不懂没关系，我们分别换个词儿再读一下：</p>
<ul>
<li><p>homo = 一些、多个</p></li>
<li><p>morphisms = 维护数据结构的函数</p></li>
<li><p>category = 类型</p></li>
</ul>
<p>根据上述词汇分析，函数<code>F</code>可以看作是两个普通函数<code>f</code>和<code>g</code>的组合。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="F(f . g) = F(f) . F(g)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">F(f . g) = F(f) . F(g)</code></pre>
<p>其中<code>.</code>就是表示组合。即：<code>functors</code>必须保存组合特性。</p>
<p>基于这个方程式，我们就能得出一个函数是否是<code>functor</code>的结论。</p>
<h2 id="articleHeader1">Array Functor</h2>
<p>刚才我们看到<code>map</code>就是一个操作<code>Array</code>的<code>functor</code>。下面我们来证明一下<code>Array.map</code>就是一个<code>functor</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function compose(f, g) {
    return function(x) {
        return f(g(x));
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compose</span>(<span class="hljs-params">f, g</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{
        <span class="hljs-keyword">return</span> f(g(x));
    };
}</code></pre>
<p>组合多个函数就是通过将前一个函数的执行结果传给后一个函数作为参数的形式来依次调用多个函数。注意：我们上面这个<code>compose</code>是从右向左执行的，将<code>g</code>的执行结果传给<code>f</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2, 3].map(compose(plus1, plus2))   ==>> [ 4, 5, 6 ]

[1, 2, 3].map(plus2).map(plus1)        ==>> [ 4, 5, 6 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(compose(plus1, plus2))   ==&gt;&gt; [ <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span> ]

[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(plus2).map(plus1)        ==&gt;&gt; [ <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span> ]</code></pre>
<p>看看！随你怎么写，结果都一样。 所以<code>map</code>就是一个<code>functor</code>。</p>
<p>下面我们来试试其他<code>functors</code>。<code>functors</code>传入参数的类型可以是任意类型，只要你有办法拆开她的值，然后返回一个新的数据结构。</p>
<h2 id="articleHeader2">String Functor</h2>
<p>OK，那我们是不是也可以写一个能处理<code>string</code>的<code>functor</code>？</p>
<p>先来文个问题，你能“拆开”一个<code>string</code>么？  必须的呀(这里如果有疑问，就是你的不对了哦)，如果你把一个<code>string</code>当成一个<code>Array of chars</code>，是不是可以拆开了？所以啊，问题就在于你是如何思考的。</p>
<p>然后，我们也知道每一个<code>char</code>其实都有一个<code>integer</code>的<code>char code</code>。那我都可以使用上面的<code>plus1</code>操作每一个<code>char</code>，然后将所有结果封装回<code>string</code>，再返回！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function stringFunctor(value, fn) {  
    var chars = value.split('');
    return chars.map(function(char) {  
        return String.fromCharCode(fn(char.charCodeAt(0)));
    }).join('');
}

stringFunctor(&quot;ABCD&quot;, plus1) ==>> &quot;BCDE&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stringFunctor</span>(<span class="hljs-params">value, fn</span>) </span>{  
    <span class="hljs-keyword">var</span> chars = value.split(<span class="hljs-string">''</span>);
    <span class="hljs-keyword">return</span> chars.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">char</span>) </span>{  
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">String</span>.fromCharCode(fn(char.charCodeAt(<span class="hljs-number">0</span>)));
    }).join(<span class="hljs-string">''</span>);
}

stringFunctor(<span class="hljs-string">"ABCD"</span>, plus1) ==&gt;&gt; <span class="hljs-string">"BCDE"</span></code></pre>
<p>开始感受到牛逼之处了么？估计你都能基于<code>string functor</code>写一个XX解析器了。</p>
<h2 id="articleHeader3">Function Functor</h2>
<p>在<code>JavaScript</code>中，函数是一等公民(first class citizens)。意思是你可以像其他任何类型那样使用函数。所以我们可以写一个服务于函数的<code>functor</code>么？</p>
<p>答案是肯定的！</p>
<p>但怎么拆开一个函数是个问题！简单点儿，你可以直接执行这个函数，然后用她的返回值。不过傻子也知道这肯定有问题(执行是需要参数的)！切记这里我们一定要把传入的函数本身当做那个传入的“值”。明确了这一点，我们只要再返回一个函数，看上去就是<code>functor</code>了吧？当这个返回的函数执行时，我们传入指定参数，其实她内部是将传入的参数递给<code>value</code>函数，再将<code>value(initial)</code>的结果传给<code>fn</code>，最后的到最终返回值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function functionFunctor(value, fn) {
    return function(initial) {
        return function() {
            return fn(value(initial));
        };
    };
}

var init = functionFunctor(function(x) {return x * x}, plus1);
var final = init(2);
final() ==> 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">functionFunctor</span>(<span class="hljs-params">value, fn</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">initial</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> fn(value(initial));
        };
    };
}

<span class="hljs-keyword">var</span> init = functionFunctor(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{<span class="hljs-keyword">return</span> x * x}, plus1);
<span class="hljs-keyword">var</span> final = init(<span class="hljs-number">2</span>);
final() ==&gt; <span class="hljs-number">5</span></code></pre>
<p>说白了，上面这个<code>Function functor</code>没做什么特别的事。但要注意的是，除非你最终执行该<code>functor</code>，否则什么事都不会发生哦！所有东西都被暂存起来，直到你执行最终<code>functor</code>。由<code>Function functor</code>可以衍生出来其他函数式编程的内容，譬如：状态维护、连续调用甚至是<code>Promise</code>。有兴趣的，可以自己尝试根据已学知识来把这几个概念实现一下。</p>
<h2 id="articleHeader4">MayBe Functor</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mayBe(value, fn) {
    return value === null || value === undefined ? value : fn(value);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mayBe</span>(<span class="hljs-params">value, fn</span>) </span>{
    <span class="hljs-keyword">return</span> value === <span class="hljs-literal">null</span> || value === <span class="hljs-literal">undefined</span> ? value : fn(value);
}</code></pre>
<p>看，这也是个合法的<code>functor</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mayBe(undefined, compose(plus1, plus2))     ==>> undefined
mayBe(mayBe(undefined, plus2), plus1)       ==>> undefined
mayBe(1, compose(plus1, plus2))             ==>> 4
mayBe(mayBe(1, plus2), plus1)               ==>> 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">mayBe(<span class="hljs-literal">undefined</span>, compose(plus1, plus2))     ==&gt;&gt; <span class="hljs-literal">undefined</span>
mayBe(mayBe(<span class="hljs-literal">undefined</span>, plus2), plus1)       ==&gt;&gt; <span class="hljs-literal">undefined</span>
mayBe(<span class="hljs-number">1</span>, compose(plus1, plus2))             ==&gt;&gt; <span class="hljs-number">4</span>
mayBe(mayBe(<span class="hljs-number">1</span>, plus2), plus1)               ==&gt;&gt; <span class="hljs-number">4</span></code></pre>
<p><code>mayBe</code>通过了我们上面的测试。这儿还真没有什么拆开和重新封装。如果传入是空，那返回也是空。<code>mayBe</code>是一中简单有效的路径选择函数，和一下这种写法相同：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (result === null) {
    return null;
} else {
    doSomething(result);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (result === <span class="hljs-literal">null</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
} <span class="hljs-keyword">else</span> {
    doSomething(result);
}</code></pre>
<h2 id="articleHeader5">Identity Function</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function id(x) {
    return x;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">id</span>(<span class="hljs-params">x</span>) </span>{
    <span class="hljs-keyword">return</span> x;
}</code></pre>
<p>上面这个就是所谓的<code>identity function</code>。她就把传入的参数又返回了一遍。她就是这么叫的，我也没辙，因为在数学计算里，这就表示组合函数的ID。</p>
<p>前面我们学了<code>functor</code>就是要保存组合特性。其实<code>functor</code>也得保存她的<code>identity</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="F(value, id) = value" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">F(value, id) = value</code></pre>
<p>我们来拿<code>map</code>试一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2, 3].map(id)    ==>>  [ 1, 2, 3 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(id)    ==&gt;&gt;  [ <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span> ]</code></pre>
<h2 id="articleHeader6">Type Signature</h2>
<p><code>Type Signature</code>声明了一个函数的参数及返回值的形态。那之前我们写的<code>plus1</code>函数的<code>Type Signature</code>就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="f: int -> int" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="haskell hljs"><code class="haskell" style="word-break: break-word; white-space: initial;"><span class="hljs-title">f</span>: int -&gt; int</code></pre>
<p><code>map</code>作为<code>functor</code>，她的<code>Type Signature</code>依赖于<code>handler</code>的<code>Type Signature</code>。譬如：<code>map</code>和<code>plus1</code>组合使用的话，她的<code>Type Signature</code>是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="map: [int] -> [int]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="haskell hljs"><code class="haskell" style="word-break: break-word; white-space: initial;"><span class="hljs-title">map</span>: [int] -&gt; [int]</code></pre>
<p>不过，由于<code>handler</code>的<code>Type Signature</code>不必前后一致，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="f: int -> string" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="haskell hljs"><code class="haskell" style="word-break: break-word; white-space: initial;"><span class="hljs-title">f</span>: int -&gt; string</code></pre>
<p>那<code>map</code>的<code>Type Signature</code>也可以是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="map: [int] -> [string]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="haskell hljs"><code class="haskell" style="word-break: break-word; white-space: initial;"><span class="hljs-title">map</span>: [int] -&gt; [string]</code></pre>
<p>这就是说，类型变化不会影响<code>functor</code>的函数组合特性。一般来说，<code>functor</code>的<code>Type Signature</code>可以这么定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="F: A -> B" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="haskell hljs"><code class="haskell" style="word-break: break-word; white-space: initial;"><span class="hljs-type">F</span>: <span class="hljs-type">A</span> -&gt; <span class="hljs-type">B</span></code></pre>
<p>举例说，就是<code>map</code>可以传入数值数组，但是却返回一个字符串数组，她依旧是<code>functor</code>。</p>
<p><code>Monads</code>是一种特殊类型的<code>functor</code>，定义如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="M: A -> A" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="haskell hljs"><code class="haskell" style="word-break: break-word; white-space: initial;"><span class="hljs-type">M</span>: <span class="hljs-type">A</span> -&gt; <span class="hljs-type">A</span></code></pre>
<p>更多内容，且看下回分解！</p>
<p>原文地址：<a href="http://functionaljavascript.blogspot.com/2013/07/functors.html" rel="nofollow noreferrer" target="_blank">Functional JavaScript - functors</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译]函数式JavaScript之Functors

## 原文链接
[https://segmentfault.com/a/1190000004604628](https://segmentfault.com/a/1190000004604628)

