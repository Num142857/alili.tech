---
title: 'JavaScript专题之递归' 
date: 2018-12-31 2:30:30
hidden: true
slug: 066fknl8qjoa
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript 专题系列第十八篇，讲解递归和尾递归</p></blockquote>
<h2 id="articleHeader0">定义</h2>
<p>程序调用自身的编程技巧称为递归(recursion)。</p>
<h2 id="articleHeader1">阶乘</h2>
<p>以阶乘为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function factorial(n) {
    if (n == 1) return n;
    return n * factorial(n - 1)
}

console.log(factorial(5)) // 5 * 4 * 3 * 2 * 1 = 120" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">factorial</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-keyword">if</span> (n == <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> n;
    <span class="hljs-keyword">return</span> n * factorial(n - <span class="hljs-number">1</span>)
}

<span class="hljs-built_in">console</span>.log(factorial(<span class="hljs-number">5</span>)) <span class="hljs-comment">// 5 * 4 * 3 * 2 * 1 = 120</span></code></pre>
<p>示意图(图片来自 <a>wwww.penjee.com</a>)：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011142880" src="https://static.alili.tech/img/remote/1460000011142880" alt="阶乘" title="阶乘" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">斐波那契数列</h2>
<p>在<a href="https://github.com/mqyqingfeng/Blog/issues/46" rel="nofollow noreferrer" target="_blank">《JavaScript专题之函数记忆》</a>中讲到过的斐波那契数列也使用了递归：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fibonacci(n){
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(5)) // 1 1 2 3 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fibonacci</span>(<span class="hljs-params">n</span>)</span>{
    <span class="hljs-keyword">return</span> n &lt; <span class="hljs-number">2</span> ? n : fibonacci(n - <span class="hljs-number">1</span>) + fibonacci(n - <span class="hljs-number">2</span>);
}

<span class="hljs-built_in">console</span>.log(fibonacci(<span class="hljs-number">5</span>)) <span class="hljs-comment">// 1 1 2 3 5</span></code></pre>
<h2 id="articleHeader3">递归条件</h2>
<p>从这两个例子中，我们可以看出：</p>
<p>构成递归需具备边界条件、递归前进段和递归返回段，当边界条件不满足时，递归前进，当边界条件满足时，递归返回。阶乘中的 <code>n == 1</code> 和 斐波那契数列中的 <code>n &lt; 2</code> 都是边界条件。</p>
<p>总结一下递归的特点：</p>
<ol>
<li><p>子问题须与原始问题为同样的事，且更为简单；</p></li>
<li><p>不能无限制地调用本身，须有个出口，化简为非递归状况处理。</p></li>
</ol>
<p>了解这些特点可以帮助我们更好的编写递归函数。</p>
<h2 id="articleHeader4">执行上下文栈</h2>
<p>在<a href="https://github.com/mqyqingfeng/Blog/issues/4" rel="nofollow noreferrer" target="_blank">《JavaScript深入之执行上下文栈》</a>中，我们知道：</p>
<p>当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。</p>
<p>试着对阶乘函数分析执行的过程，我们会发现，JavaScript 会不停的创建执行上下文压入执行上下文栈，对于内存而言，维护这么多的执行上下文也是一笔不小的开销呐！那么，我们该如何优化呢？</p>
<p>答案就是尾调用。</p>
<h2 id="articleHeader5">尾调用</h2>
<p>尾调用，是指函数内部的最后一个动作是函数调用。该调用的返回值，直接返回给函数。</p>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 尾调用
function f(x){
    return g(x);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 尾调用</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">x</span>)</span>{
    <span class="hljs-keyword">return</span> g(x);
}</code></pre>
<p>然而</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 非尾调用
function f(x){
    return g(x) + 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 非尾调用</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">x</span>)</span>{
    <span class="hljs-keyword">return</span> g(x) + <span class="hljs-number">1</span>;
}</code></pre>
<p>并不是尾调用，因为 g(x) 的返回值还需要跟 1 进行计算后，f(x)才会返回值。</p>
<p>两者又有什么区别呢？答案就是执行上下文栈的变化不一样。</p>
<p>为了模拟执行上下文栈的行为，让我们定义执行上下文栈是一个数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ECStack = [];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">    ECStack = [];</code></pre>
<p>我们模拟下第一个尾调用函数执行时的执行上下文栈变化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 伪代码
ECStack.push(<f> functionContext);

ECStack.pop();

ECStack.push(<g> functionContext);

ECStack.pop();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 伪代码</span>
ECStack.push(&lt;f&gt; functionContext);

ECStack.pop();

ECStack.push(&lt;g&gt; functionContext);

ECStack.pop();</code></pre>
<p>我们再来模拟一下第二个非尾调用函数执行时的执行上下文栈变化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ECStack.push(<f> functionContext);

ECStack.push(<g> functionContext);

ECStack.pop();

ECStack.pop();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">ECStack.push(&lt;f&gt; functionContext);

ECStack.push(&lt;g&gt; functionContext);

ECStack.pop();

ECStack.pop();</code></pre>
<p>也就说尾调用函数执行时，虽然也调用了一个函数，但是因为原来的的函数执行完毕，执行上下文会被弹出，执行上下文栈中相当于只多压入了一个执行上下文。然而非尾调用函数，就会创建多个执行上下文压入执行上下文栈。</p>
<p>函数调用自身，称为递归。如果尾调用自身，就称为尾递归。</p>
<p>所以我们只用把阶乘函数改造成一个尾递归形式，就可以避免创建那么多的执行上下文。但是我们该怎么做呢？</p>
<h2 id="articleHeader6">阶乘函数优化</h2>
<p>我们需要做的就是把所有用到的内部变量改写成函数的参数，以阶乘函数为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function factorial(n, res) {
    if (n == 1) return res;
    return factorial2(n - 1, n * res)
}

console.log(factorial(4, 1)) // 24" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">factorial</span>(<span class="hljs-params">n, res</span>) </span>{
    <span class="hljs-keyword">if</span> (n == <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> res;
    <span class="hljs-keyword">return</span> factorial2(n - <span class="hljs-number">1</span>, n * res)
}

<span class="hljs-built_in">console</span>.log(factorial(<span class="hljs-number">4</span>, <span class="hljs-number">1</span>)) <span class="hljs-comment">// 24</span></code></pre>
<p>然而这个很奇怪呐……我们计算 4 的阶乘，结果函数要传入 4 和 1，我就不能只传入一个 4 吗？</p>
<p>这个时候就要用到我们在<a href="https://github.com/mqyqingfeng/Blog/issues/42" rel="nofollow noreferrer" target="_blank">《JavaScript专题之柯里化》</a>中编写的 curry 函数了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var newFactorial = curry(factorial, _, 1)

newFactorial(5) // 24" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> newFactorial = curry(factorial, _, <span class="hljs-number">1</span>)

newFactorial(<span class="hljs-number">5</span>) <span class="hljs-comment">// 24</span></code></pre>
<h2 id="articleHeader7">应用</h2>
<p>如果你看过 <a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">JavaScript 专题系列</a>的文章，你会发现递归有着很多的应用。</p>
<p>作为专题系列的第十八篇，我们来盘点下之前的文章中都有哪些涉及到了递归：</p>
<p>1.<a href="https://github.com/mqyqingfeng/Blog/issues/36" rel="nofollow noreferrer" target="_blank">《JavaScript 专题之数组扁平化》</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function flatten(arr) {
    return arr.reduce(function(prev, next){
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    }, [])
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flatten</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">return</span> arr.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prev, next</span>)</span>{
        <span class="hljs-keyword">return</span> prev.concat(<span class="hljs-built_in">Array</span>.isArray(next) ? flatten(next) : next)
    }, [])
}</code></pre>
<p>2.<a href="https://github.com/mqyqingfeng/Blog/issues/32" rel="nofollow noreferrer" target="_blank">《JavaScript 专题之深浅拷贝》</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var deepCopy = function(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> deepCopy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> obj !== <span class="hljs-string">'object'</span>) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">var</span> newObj = obj <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span> ? [] : {};
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj) {
        <span class="hljs-keyword">if</span> (obj.hasOwnProperty(key)) {
            newObj[key] = <span class="hljs-keyword">typeof</span> obj[key] === <span class="hljs-string">'object'</span> ? deepCopy(obj[key]) : obj[key];
        }
    }
    <span class="hljs-keyword">return</span> newObj;
}</code></pre>
<p>3.<a href="https://github.com/mqyqingfeng/Blog/issues/33" rel="nofollow noreferrer" target="_blank">JavaScript 专题之从零实现 jQuery 的 extend</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 非完整版本，完整版本请点击查看具体的文章
function extend() {

    ...

    // 循环遍历要复制的对象们
    for (; i < length; i++) {
        // 获取当前对象
        options = arguments[i];
        // 要求不能为空 避免extend(a,,b)这种情况
        if (options != null) {
            for (name in options) {
                // 目标属性值
                src = target[name];
                // 要复制的对象的属性值
                copy = options[name];

                if (deep &amp;&amp; copy &amp;&amp; typeof copy == 'object') {
                    // 递归调用
                    target[name] = extend(deep, src, copy);
                }
                else if (copy !== undefined){
                    target[name] = copy;
                }
            }
        }
    }

    ...

};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 非完整版本，完整版本请点击查看具体的文章</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">extend</span>(<span class="hljs-params"></span>) </span>{

    ...

    <span class="hljs-comment">// 循环遍历要复制的对象们</span>
    <span class="hljs-keyword">for</span> (; i &lt; length; i++) {
        <span class="hljs-comment">// 获取当前对象</span>
        options = <span class="hljs-built_in">arguments</span>[i];
        <span class="hljs-comment">// 要求不能为空 避免extend(a,,b)这种情况</span>
        <span class="hljs-keyword">if</span> (options != <span class="hljs-literal">null</span>) {
            <span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> options) {
                <span class="hljs-comment">// 目标属性值</span>
                src = target[name];
                <span class="hljs-comment">// 要复制的对象的属性值</span>
                copy = options[name];

                <span class="hljs-keyword">if</span> (deep &amp;&amp; copy &amp;&amp; <span class="hljs-keyword">typeof</span> copy == <span class="hljs-string">'object'</span>) {
                    <span class="hljs-comment">// 递归调用</span>
                    target[name] = extend(deep, src, copy);
                }
                <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (copy !== <span class="hljs-literal">undefined</span>){
                    target[name] = copy;
                }
            }
        }
    }

    ...

};</code></pre>
<p>4.<a href="https://github.com/mqyqingfeng/Blog/issues/41" rel="nofollow noreferrer" target="_blank">《JavaScript 专题之如何判断两个对象相等》</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 非完整版本，完整版本请点击查看具体的文章
// 属于间接调用
function eq(a, b, aStack, bStack) {

    ...

    // 更复杂的对象使用 deepEq 函数进行深度比较
    return deepEq(a, b, aStack, bStack);
};

function deepEq(a, b, aStack, bStack) {

    ...

    // 数组判断
    if (areArrays) {

        length = a.length;
        if (length !== b.length) return false;

        while (length--) {
            if (!eq(a[length], b[length], aStack, bStack)) return false;
        }
    }
    // 对象判断
    else {

        var keys = Object.keys(a),
            key;
        length = keys.length;

        if (Object.keys(b).length !== length) return false;
        while (length--) {

            key = keys[length];
            if (!(b.hasOwnProperty(key) &amp;&amp; eq(a[key], b[key], aStack, bStack))) return false;
        }
    }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 非完整版本，完整版本请点击查看具体的文章</span>
<span class="hljs-comment">// 属于间接调用</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">eq</span>(<span class="hljs-params">a, b, aStack, bStack</span>) </span>{

    ...

    <span class="hljs-comment">// 更复杂的对象使用 deepEq 函数进行深度比较</span>
    <span class="hljs-keyword">return</span> deepEq(a, b, aStack, bStack);
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepEq</span>(<span class="hljs-params">a, b, aStack, bStack</span>) </span>{

    ...

    <span class="hljs-comment">// 数组判断</span>
    <span class="hljs-keyword">if</span> (areArrays) {

        length = a.length;
        <span class="hljs-keyword">if</span> (length !== b.length) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

        <span class="hljs-keyword">while</span> (length--) {
            <span class="hljs-keyword">if</span> (!eq(a[length], b[length], aStack, bStack)) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
    }
    <span class="hljs-comment">// 对象判断</span>
    <span class="hljs-keyword">else</span> {

        <span class="hljs-keyword">var</span> keys = <span class="hljs-built_in">Object</span>.keys(a),
            key;
        length = keys.length;

        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.keys(b).length !== length) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">while</span> (length--) {

            key = keys[length];
            <span class="hljs-keyword">if</span> (!(b.hasOwnProperty(key) &amp;&amp; eq(a[key], b[key], aStack, bStack))) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
    }

}</code></pre>
<p>5.<a href="https://github.com/mqyqingfeng/Blog/issues/42" rel="nofollow noreferrer" target="_blank">《JavaScript 专题之函数柯里化》</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 非完整版本，完整版本请点击查看具体的文章
function curry(fn, args) {
    length = fn.length;

    args = args || [];

    return function() {

        var _args = args.slice(0),

            arg, i;

        for (i = 0; i < arguments.length; i++) {

            arg = arguments[i];

            _args.push(arg);

        }
        if (_args.length < length) {
            return curry.call(this, fn, _args);
        }
        else {
            return fn.apply(this, _args);
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 非完整版本，完整版本请点击查看具体的文章</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">curry</span>(<span class="hljs-params">fn, args</span>) </span>{
    length = fn.length;

    args = args || [];

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

        <span class="hljs-keyword">var</span> _args = args.slice(<span class="hljs-number">0</span>),

            arg, i;

        <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">arguments</span>.length; i++) {

            arg = <span class="hljs-built_in">arguments</span>[i];

            _args.push(arg);

        }
        <span class="hljs-keyword">if</span> (_args.length &lt; length) {
            <span class="hljs-keyword">return</span> curry.call(<span class="hljs-keyword">this</span>, fn, _args);
        }
        <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-keyword">this</span>, _args);
        }
    }
}</code></pre>
<h2 id="articleHeader8">写在最后</h2>
<p>递归的内容远不止这些，比如还有汉诺塔、二叉树遍历等递归场景，本篇就不过多展开，真希望未来能写个算法系列。</p>
<h2 id="articleHeader9">专题系列</h2>
<p>JavaScript专题系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>JavaScript专题系列预计写二十篇左右，主要研究日常开发中一些功能点的实现，比如防抖、节流、去重、类型判断、拷贝、最值、扁平、柯里、递归、乱序、排序等，特点是研(chao)究(xi) underscore 和 jQuery 的实现方式。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎 star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript专题之递归

## 原文链接
[https://segmentfault.com/a/1190000011142875](https://segmentfault.com/a/1190000011142875)

