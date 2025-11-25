---
title: '关于javascript函数式编程中compose的实现' 
date: 2019-01-26 2:30:18
hidden: true
slug: lesk6ny754
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://segmentfault.com/a/1190000008248646">上一篇</a>文章介绍了<code>javascript</code>函数式编程中<code>curry</code>（柯里化）的实现，当然那个柯里化是有限参数的柯里化，等有机会在补上无限参数的那一种柯里化，这次主要说的是<code>javascript</code>函数式编程中另外一个很重要的函数<code>compose</code>，<code>compose</code>函数的作用就是组合函数的，将函数串联起来执行，将多个函数组合起来，一个函数的输出结果是另一个函数的输入参数，一旦第一个函数开始执行，就会像多米诺骨牌一样推导执行了。</p>
<h3 id="articleHeader0">简介</h3>
<p>比如有这样的需求，要输入一个名字，这个名字有由<code>firstName</code>,<code>lastName</code>组合而成，然后把这个名字全部变成大写输出来，比如输入<code>jack</code>，<code>smith</code>我们就要打印出来，<code>‘HELLO，JACK SMITH’</code> 。 <br>我们考虑用函数组合的方法来解决这个问题，需要两个函数<code>greeting</code>, <code>toUpper</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var greeting = (firstName, lastName) => 'hello, ' + firstName + ' ' + lastName
var toUpper = str => str.toUpperCase()
var fn = compose(toUpper, greeting)
console.log(fn('jack', 'smith'))
// ‘HELLO，JACK SMITH’
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> greeting = <span class="hljs-function">(<span class="hljs-params">firstName, lastName</span>) =&gt;</span> <span class="hljs-string">'hello, '</span> + firstName + <span class="hljs-string">' '</span> + lastName
<span class="hljs-keyword">var</span> toUpper = <span class="hljs-function"><span class="hljs-params">str</span> =&gt;</span> str.toUpperCase()
<span class="hljs-keyword">var</span> fn = compose(toUpper, greeting)
<span class="hljs-built_in">console</span>.log(fn(<span class="hljs-string">'jack'</span>, <span class="hljs-string">'smith'</span>))
<span class="hljs-comment">// ‘HELLO，JACK SMITH’</span>
</code></pre>
<p>这就是compose大致的使用，总结下来要注意的有以下几点</p>
<ul>
<li><p><code>compose</code>的参数是函数，返回的也是一个函数</p></li>
<li><p>因为除了第一个函数的接受参数，其他函数的接受参数都是上一个函数的返回值，所以初始函数的参数是<code>多元</code>的，而其他函数的接受值是<code>一元</code>的</p></li>
<li><p><code>compsoe</code>函数可以接受任意的参数，所有的参数都是函数，且执行方向是<code>自右向左</code>的，初始函数一定放到参数的<code>最右面</code></p></li>
</ul>
<p>知道这三点后，就很容易的分析出上个例子的执行过程了，执行<code>fn('jack', 'smith')</code>的时候，初始函数为<code>greeting</code>，执行结果作为参数传递给<code>toUpper</code>，再执行<code>toUpper</code>，得出最后的结果，compose的好处我简单提一下，如果还想再加一个处理函数，不需要修改<code>fn</code>，只需要在执行一个<code>compose</code>，比如我们再想加一个<code>trim</code>，只需要这样做</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var trim = str => str.trim()
var newFn = compose(trim, fn)
console.log(newFn('jack', 'smith'))
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> trim = str =&gt; str.trim()
<span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Fn</span> = compose(trim, fn)
console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Fn</span>(<span class="hljs-string">'jack'</span>, <span class="hljs-string">'smith'</span>))
</code></pre>
<p>就可以了，可以看出不论维护和扩展都十分的方便。</p>
<h3 id="articleHeader1">实现</h3>
<p>例子分析完了，本着究其根本的原则，还是要探究与一下<code>compose</code>到底是如何实现的，首先解释介绍一下我是如何实现的，然后再探求一下，<code>javascript</code>函数式编程的两大类库，<code>lodash.js</code>和<code>ramda.js</code>是如何实现的，其中<code>ramda.js</code>实现的过程非常函数式。</p>
<h4>我的实现</h4>
<p>我的思路是，既然函数像多米诺骨牌式的执行，我首先就想到了递归，下面就一步一步的实现这个<code>compose</code>，首先，<code>compose</code>返回一个函数,为了记录递归的执行情况，还要记录参数的长度<code>len</code>,还要给返回的函数添加一个名字<code>f1</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var compose = function(...args) {
    var len = args.length
    return function f1() {
        
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> compose = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{
    <span class="hljs-keyword">var</span> len = args.length
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span><span class="hljs-params">()</span> </span>{
        
    }
}</code></pre>
<p>函数体里面要做的事情就是不断的执行<code>args</code>中的函数，将上一个函数的执行结果作为下一个执行函数的输入参数,需要一个游标<code>count</code>来记录<code>args</code>函数列表的执行情况。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var compose = function(...args) {
    var len = args.length
    var count = len - 1
    var result
    return function f1(...args1) {
        result = args[count].apply(this, args1)
        count--
        return f1.call(null, result)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> compose = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{
    <span class="hljs-keyword">var</span> len = args.length
    <span class="hljs-keyword">var</span> count = len - <span class="hljs-number">1</span>
    <span class="hljs-keyword">var</span> result
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span><span class="hljs-params">(<span class="hljs-rest_arg">...args1</span>)</span> </span>{
        result = args[count].apply(<span class="hljs-keyword">this</span>, args1)
        count--
        <span class="hljs-keyword">return</span> f1.call(<span class="hljs-literal">null</span>, result)
    }
}</code></pre>
<p>这个就是思路，当然这样是不行的，没有退出条件，递归的退出条件就是最后一个函数执行完的时候，也就是<code>count</code>为<code>0</code>的时候，这时候，有一点要注意，递归退出的时候，<code>count</code>游标一定要回归初始状态，最后补充一下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var compose = function(...args) {
        var len = args.length
        var count = len - 1
        var result
        return function f1(...args1) {
            result = args[count].apply(this, args1)
            if (count <= 0) {
                count = len - 1
                return result
            } else {
                count--
                return f1.call(null, result)
            }
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> compose = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{
        <span class="hljs-keyword">var</span> len = args.length
        <span class="hljs-keyword">var</span> count = len - <span class="hljs-number">1</span>
        <span class="hljs-keyword">var</span> result
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span><span class="hljs-params">(<span class="hljs-rest_arg">...args1</span>)</span> </span>{
            result = args[count].apply(<span class="hljs-keyword">this</span>, args1)
            <span class="hljs-keyword">if</span> (count &lt;= <span class="hljs-number">0</span>) {
                count = len - <span class="hljs-number">1</span>
                <span class="hljs-keyword">return</span> result
            } <span class="hljs-keyword">else</span> {
                count--
                <span class="hljs-keyword">return</span> f1.call(<span class="hljs-literal">null</span>, result)
            }
        }
    }</code></pre>
<p>这样就实现了这个<code>compose</code>函数。后来我发现递归这个完全可以使用迭代来实现，使用<code>while</code>函数看起来更容易明白，其实<code>lodash.js</code>就是这么实现的。</p>
<h4>
<code>lodash</code>实现</h4>
<p><code>lodash</code>的思路同上，不过是用迭代实现的，我就把它的源代码贴过来看一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var flow = function(funcs) {
    var length = funcs.length
    var index = length
    while (index--) {
        if (typeof funcs[index] !== 'function') {
            throw new TypeError('Expected a function');
        }
    }
    return function(...args) {
        var index = 0
        var result = length ? funcs[index].apply(this, args) : args[0]
        while (++index < length) {
            result = funcs[index].call(this, result)
        }
        return result
    }
}
var flowRight = function(funcs) {
    return flow(funcs.reverse())
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> flow = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(funcs)</span> </span>{
    <span class="hljs-keyword">var</span> length = funcs.length
    <span class="hljs-keyword">var</span> index = length
    <span class="hljs-keyword">while</span> (index--) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> funcs[index] !== <span class="hljs-string">'function'</span>) {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> TypeError(<span class="hljs-string">'Expected a function'</span>);
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{
        <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>
        <span class="hljs-keyword">var</span> result = length ? funcs[index].apply(<span class="hljs-keyword">this</span>, args) : args[<span class="hljs-number">0</span>]
        <span class="hljs-keyword">while</span> (++index &lt; length) {
            result = funcs[index].call(<span class="hljs-keyword">this</span>, result)
        }
        <span class="hljs-keyword">return</span> result
    }
}
<span class="hljs-keyword">var</span> flowRight = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(funcs)</span> </span>{
    <span class="hljs-keyword">return</span> flow(funcs.reverse())
}</code></pre>
<p>可以看出，<code>lodash</code>的本来实现是<code>从左到右</code>的，但也提供了<code>从右到左</code>的<code>flowRight</code>，还多了一层函数的校验，而且接收的是<code>数组</code>，不是<code>参数序列</code>,而且从这行<code>var result = length ? funcs[index].apply(this, args) : args[0]</code>可以看出允许数组为空，可以看出还是非常严谨的。我写的就缺少这种严谨的异常处理。</p>
<h3 id="articleHeader2">结论</h3>
<p>这次主要介绍了函数式编程中的<code>compose</code>函数的原理和实现方法，由于篇幅原因，我把打算分析的<code>ramda.js</code>源码实现放到下一篇来介绍，可以说<code>ramda.js</code>实现的<code>compose</code>更加函数式，需要单独好好分析。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于javascript函数式编程中compose的实现

## 原文链接
[https://segmentfault.com/a/1190000008394749](https://segmentfault.com/a/1190000008394749)

