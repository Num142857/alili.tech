---
title: 'ES6新语法疑点简析' 
date: 2019-01-27 2:31:00
hidden: true
slug: ukfvl3yzohq
categories: [reprint]
---

{{< raw >}}

                    
<p>本文涵盖了一些ES6新语法可能造成疑惑的地方和一些建议。</p>
<h2 id="articleHeader0">1# 箭头函数</h2>
<p>箭头函数看起来像是匿名函数表达式<code>function(){}</code>的简写，然而它不是。</p>
<p>这个例子应该很容易看出来会有怎样的问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Apple(){}

Apple.prototype.check = ()=>{
    console.log(this instanceof Apple);
};

(new Apple()).check() // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Apple</span>(<span class="hljs-params"></span>)</span>{}

Apple.prototype.check = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Apple);
};

(<span class="hljs-keyword">new</span> Apple()).check() <span class="hljs-comment">// false</span></code></pre>
<p>使用apply、call、bind改变箭头函数的this指向呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var i = 0;
var xx = ()=>{ console.log(++i, this) };
var yy = function(){ console.log(++i, this) };

xx();             // 1 window
xx.apply([]);     // 2 window
xx.bind([])();    // 3 window
yy();             // 4 window
yy.apply([]);     // 5 []
yy.bind([])();    // 6 []" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;
<span class="hljs-keyword">var</span> xx = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{ <span class="hljs-built_in">console</span>.log(++i, <span class="hljs-keyword">this</span>) };
<span class="hljs-keyword">var</span> yy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-built_in">console</span>.log(++i, <span class="hljs-keyword">this</span>) };

xx();             <span class="hljs-comment">// 1 window</span>
xx.apply([]);     <span class="hljs-comment">// 2 window</span>
xx.bind([])();    <span class="hljs-comment">// 3 window</span>
yy();             <span class="hljs-comment">// 4 window</span>
yy.apply([]);     <span class="hljs-comment">// 5 []</span>
yy.bind([])();    <span class="hljs-comment">// 6 []</span></code></pre>
<p>显然apply、call、bind无法改变箭头函数的this指向，箭头函数的this确定后无法更改。</p>
<p>在这些场景中不要使用箭头函数:</p>
<ul>
<li><p>当你需要正常使用this binding时，如函数构造器、prototype</p></li>
<li><p>当你需要动态改变this的时候</p></li>
<li><p>针对工作报酬和代码量呈反比的程序猿，在需要用到this binding的场景里，可能比较适合的简写形式是在新对象字面量语法里提供的：</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    hello() { // 少写了一个function耶！
        console.log('world')
    } 
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {
    hello() { <span class="hljs-comment">// 少写了一个function耶！</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'world'</span>)
    } 
};</code></pre>
<h2 id="articleHeader1">2# Promise</h2>
<h3 id="articleHeader2">2.1# then</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//1
fetch(xx, oo).then(handleResultAndReturnsAnPromise(result));
//2 
fetch(xx, oo).then(handleResultAndReturnsAnPromise);
//3 
fetch(xx, oo).then((result) => handleResultAndReturnsAnPromise(result));
//4
fetch(xx, oo).then(function(result) { handleResultAndReturnsAnPromise(result) });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//1</span>
fetch(xx, oo).then(handleResultAndReturnsAnPromise(result));
<span class="hljs-comment">//2 </span>
fetch(xx, oo).then(handleResultAndReturnsAnPromise);
<span class="hljs-comment">//3 </span>
fetch(xx, oo).then(<span class="hljs-function">(<span class="hljs-params">result</span>) =&gt;</span> handleResultAndReturnsAnPromise(result));
<span class="hljs-comment">//4</span>
fetch(xx, oo).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>) </span>{ handleResultAndReturnsAnPromise(result) });</code></pre>
<ul>
<li><p>1与2、3、4均不等价：1同步调用了handleResultAndReturnsAnPromise；而2～4均会导致handleResultAndReturnsAnPromise在fetch之后完成</p></li>
<li><p>2与3/4则是运行时的调用栈有区别，3/4额外创建了一个匿名函数。</p></li>
<li><p>3与4除了this binding的区别，4的调用返回值没有进行返回，这样将导致promise链断裂。</p></li>
<li><p>1中需要注意的是，<code>then(promise)</code>里面传一个 Promise 对象是没有什么意义的，它会被当成<code>then(null)</code>，在下面推荐的文章中，它被称作“Promise 穿透”</p></li>
</ul>
<p>更多的令人混淆的案例，请继续阅读《<a href="http://efe.baidu.com/blog/promises-anti-pattern/" rel="nofollow noreferrer" target="_blank">谈谈使用 promise 时候的一些反模式</a>》。</p>
<h3 id="articleHeader3">2.2# catch</h3>
<p>在node的一些版本中，采用Promise并忘记给promise链增加<code>catch(fn)</code>或<code>then(null, fn)</code>，将导致代码中的异常被吞掉。</p>
<p>这个问题在新的v8中（<a href="https://nodejs.org/en/blog/release/v6.6.0/" rel="nofollow noreferrer" target="_blank">node 6.6+</a>，chrome最新版）会导致一个<code>UnhandledPromiseRejectionWarning</code>，防止开发遗漏。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node -e 'Promise.reject()'
# UnhandledPromiseRejectionWarning: Unhandled promise rejection" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">node <span class="hljs-_">-e</span> <span class="hljs-string">'Promise.reject()'</span>
<span class="hljs-comment"># UnhandledPromiseRejectionWarning: Unhandled promise rejection</span></code></pre>
<h3 id="articleHeader4">2.3# resolve</h3>
<p>Promise接口和jQuery实现的接口不一样，<code>resolve</code>只接受单参数，<code>then</code>的回调也只能拿到单参数。</p>
<p>在Promise规范中的单参数链式调用场景下，可以利用解构、<code>_.spread</code>、访问自由变量等方式来处理多个过程中得到的值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise(function(resolve, reject){
    let something = 1,
        otherstuff = 2;
    resolve({something, otherstuff});
}).then(function({something, otherstuff}){
    // handle something and otherstuff
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
    <span class="hljs-keyword">let</span> something = <span class="hljs-number">1</span>,
        otherstuff = <span class="hljs-number">2</span>;
    resolve({something, otherstuff});
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">{something, otherstuff}</span>)</span>{
    <span class="hljs-comment">// handle something and otherstuff</span>
});</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.all([
    Promise.resolve(40), Promise.resolve(36)
]).then(
    _.spread(function(first, second){
        // first: 40, second: 36
    })
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.all([
    <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">40</span>), <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">36</span>)
]).then(
    _.spread(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">first, second</span>)</span>{
        <span class="hljs-comment">// first: 40, second: 36</span>
    })
);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let someMiddleResult;
fetch()
    .then(function(fetchResult){
        someMiddleResult = fetchResult;
    })
    .then(otherHandleFn)
    .then(function(otherHandleFnResult){
        // use both someMiddleResult and otherHandleFnResult now
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>let someMiddleResult;
fetch()
    .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(fetchResult)</span></span>{
        someMiddleResult = fetchResult;
    })
    .<span class="hljs-keyword">then</span>(otherHandleFn)
    .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(otherHandleFnResult)</span></span>{
        // <span class="hljs-keyword">use</span> both someMiddleResult and otherHandleFnResult now
    })</code></pre>
<h3 id="articleHeader5">2.4# reject / throw</h3>
<p>出现<code>reject</code>接口，应该是第一次前端有机会拿异常处理流程做正常流程（比如<a href="https://segmentfault.com/q/1010000007933194/a-1020000007933838">＊</a>）。不要这样做。</p>
<p>由于<code>reject(new Error(""))</code>、<code>throw new Error("")</code>都能作为<code>catch</code>的入口，一些不可预知的错误被抛出的时候，这样的处理方式将会复杂化catch内的代码。不要用异常处理逻辑来做正常处理流程，这个规则保证了代码可读性与可维护性。</p>
<p><code>throw</code>和<code>reject</code>都可以作为<code>catch</code>的入口，它们更加详细的区别如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise((resolve, reject) => {
    setTimeout(function(){
        reject(new Error('hello'));
    });
}).catch(() => console.log('reject'));
// reject

new Promise((resolve, reject) => {
    setTimeout(function(){
        throw new Error('hello');
    });
}).catch(() => console.log('throw'));
// Uncaught Error: hello" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'hello'</span>));
    });
}).catch(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'reject'</span>));
<span class="hljs-comment">// reject</span>

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'hello'</span>);
    });
}).catch(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'throw'</span>));
<span class="hljs-comment">// Uncaught Error: hello</span></code></pre>
<p><code>reject</code>能够“穿透”回调；而<code>throw</code>限于函数作用域，无法“穿透”回调。</p>
<p>建议：</p>
<ol>
<li><p>正常流程请选择在<code>then</code>的时候<code>if..else</code>，不要用<code>reject</code>替代</p></li>
<li><p>在需要走异常处理流程的时候封装<code>Error</code>抛出，可以最大化的化简<code>catch</code>回调里面的处理逻辑，类似于<code>e instanceof MyDesignedError</code></p></li>
<li><p>由于回调函数里的<code>throw</code>无法被自动捕获到，如果需要在回调中<code>reject</code>当前 promise，那么我们需要用<code>reject</code>而不是<code>throw</code></p></li>
<li><p>在使用<code>Promise</code>接口的 polyfill 的场景，应当在<code>reject</code>后加一个<code>return</code></p></li>
</ol>
<h2 id="articleHeader6">3# let &amp; const &amp; var</h2>
<p>看起来<code>let</code>和<code>const</code>的组合就像是一个能完全灭掉<code>var</code>的新特性，但对旧代码不能简单的正则替换掉<code>var</code>，因为我们太习惯于滥用它的特性了——主要是声明提升。</p>
<p>一些情形下会造成语法错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
    let a = 10;

    if (a > 2) {
        throw new Error();
    }

    // ...
} catch (err) {
    console.log(a);
    // 若为var声明，不报错
    // 若为const、let声明：Uncaught ReferenceError: a is not defined
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">let</span> a = <span class="hljs-number">10</span>;

    <span class="hljs-keyword">if</span> (a &gt; <span class="hljs-number">2</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>();
    }

    <span class="hljs-comment">// ...</span>
} <span class="hljs-keyword">catch</span> (err) {
    <span class="hljs-built_in">console</span>.log(a);
    <span class="hljs-comment">// 若为var声明，不报错</span>
    <span class="hljs-comment">// 若为const、let声明：Uncaught ReferenceError: a is not defined</span>
}</code></pre>
<p>除了<code>try..catch</code>，隐式造就的块级作用域在<code>for</code>和<code>if..else</code>中也将造成问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(false) {
    let my = 'bad';
} else {
    console.log(my); // ReferenceError: my is not defined
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span>(<span class="hljs-literal">false</span>) {
    <span class="hljs-keyword">let</span> my = <span class="hljs-string">'bad'</span>;
} <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">console</span>.log(my); <span class="hljs-comment">// ReferenceError: my is not defined</span>
}</code></pre>
<p>解决方案倒是很简单，将作用域内的<code>let</code>放在更靠外层的位置即可。</p>
<p><code>var</code>、<code>let</code>和<code>const</code>的区别如下（部分参考自stackoverflow<a href="http://stackoverflow.com/questions/762011/whats-the-difference-between-using-let-and-var-to-declare-a-variable" rel="nofollow noreferrer" target="_blank">＊</a>）：</p>
<ol>
<li><p>作用域：<code>let</code>和<code>const</code>将创造一个块级作用域，在作用域之外此变量不可见，作用域外访问将导致<code>SyntaxError</code>；<code>var</code>遵循函数级作用域</p></li>
<li><p>全局影响：全局作用域下的<code>var</code>使用等同于设置<code>window</code>/<code>global</code>之上的内容，但<code>let</code>和<code>const</code>不会</p></li>
<li><p>提升行为：<code>var</code>声明有提升到当前函数作用域顶部的特性，但<code>const</code>和<code>let</code>没有，在声明前访问变量将导致<code>SyntaxError</code></p></li>
<li><p>重新赋值：对<code>const</code>变量所做的重新赋值将导致<code>TypeError</code>，而<code>var</code>和<code>let</code>不会</p></li>
<li><p>重新声明：<code>var</code>声明的变量使用<code>var</code>再次声明不会出现<code>SyntaxError</code>，但<code>const</code>、<code>let</code>声明的变量不能被重新声明，也不能覆盖掉之前任何形式的声明：</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vVar = 1;
const vConst = 2;
let vLet = 3;

var vVar = 4;     // success
let vVar = 5;     // SyntaxError
const vVar = 6;   // SyntaxError

var vConst = 7;   // SyntaxError
let vConst = 8;   // SyntaxError
const vConst = 9; // SyntaxError

var vLet = 10;    // SyntaxError
let vLet = 11;    // SyntaxError
const vLet = 12;  // SyntaxError" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">var</span> vVar = <span class="hljs-number">1</span>;
<span class="hljs-keyword">const</span> vConst = <span class="hljs-number">2</span>;
<span class="hljs-keyword">let</span> vLet = <span class="hljs-number">3</span>;

<span class="hljs-keyword">var</span> vVar = <span class="hljs-number">4</span>;     <span class="hljs-comment">// success</span>
<span class="hljs-keyword">let</span> vVar = <span class="hljs-number">5</span>;     <span class="hljs-comment">// SyntaxError</span>
<span class="hljs-keyword">const</span> vVar = <span class="hljs-number">6</span>;   <span class="hljs-comment">// SyntaxError</span>

<span class="hljs-keyword">var</span> vConst = <span class="hljs-number">7</span>;   <span class="hljs-comment">// SyntaxError</span>
<span class="hljs-keyword">let</span> vConst = <span class="hljs-number">8</span>;   <span class="hljs-comment">// SyntaxError</span>
<span class="hljs-keyword">const</span> vConst = <span class="hljs-number">9</span>; <span class="hljs-comment">// SyntaxError</span>

<span class="hljs-keyword">var</span> vLet = <span class="hljs-number">10</span>;    <span class="hljs-comment">// SyntaxError</span>
<span class="hljs-keyword">let</span> vLet = <span class="hljs-number">11</span>;    <span class="hljs-comment">// SyntaxError</span>
<span class="hljs-keyword">const</span> vLet = <span class="hljs-number">12</span>;  <span class="hljs-comment">// SyntaxError</span></code></pre>
<h2 id="articleHeader7">4# 边界</h2>
<p>本篇章集结 ES6 给予的不同边界条件，部分编译自 <a href="https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/ch6.md" rel="nofollow noreferrer" target="_blank">You don't know JS</a></p>
<h3 id="articleHeader8">4.1# 函数默认参数值</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function before(a) { var a = a || 1; console.log(a); }
function after(a = 1) { console.log(a); }

before(NaN) // 1
after(NaN) // NaN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">before</span>(<span class="hljs-params">a</span>) </span>{ <span class="hljs-keyword">var</span> a = a || <span class="hljs-number">1</span>; <span class="hljs-built_in">console</span>.log(a); }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">after</span>(<span class="hljs-params">a = <span class="hljs-number">1</span></span>) </span>{ <span class="hljs-built_in">console</span>.log(a); }

before(<span class="hljs-literal">NaN</span>) <span class="hljs-comment">// 1</span>
after(<span class="hljs-literal">NaN</span>) <span class="hljs-comment">// NaN</span></code></pre>
<p>新的写法的fallback逻辑只针对<code>undefined</code>有效。</p>
<h3 id="articleHeader9">4.2# Object.assign</h3>
<p><code>Object.assign</code>将赋予所有的可枚举值，但不包含从原型链继承来的值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [1, 2, 3],
    obj = {};
Object.assign(obj, arr);

obj[1] // 2
obj.length // undefined
Object.getOwnPropertyDescriptors(arr).length.enumerable // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>let arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>],
    obj = {};
Object.assign(obj, arr);

obj[<span class="hljs-number">1</span>] <span class="hljs-comment">// 2</span>
obj.length <span class="hljs-comment">// undefined</span>
Object.getOwnPropertyDescriptors(arr).length.enumerable <span class="hljs-comment">// false</span></code></pre>
<p>此外：<code>Object.assign</code>仅仅进行浅拷贝：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var orig = {
    a: [1, 2, 3]
},
    nObj = {};

Object.assign(nObj, orig);
orig.a.push(4);
nObj.a // [1, 2, 3, 4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> orig = <span class="hljs-comment">{
    a: [1, 2, 3]
}</span>,
    nObj = <span class="hljs-comment">{}</span>;

<span class="hljs-keyword">Object</span>.assign(nObj, orig);
orig.a.push(<span class="hljs-number">4</span>);
nObj.a <span class="hljs-comment">// [1, 2, 3, 4]</span></code></pre>
<h3 id="articleHeader10">4.3# NaN</h3>
<p><code>Number.isNaN</code>和全局空间中的<code>isNaN</code>的区别在于不存在隐式转换：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="isNaN('number') // true
Number.isNaN('number') // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">isNaN</span><span class="hljs-params">(<span class="hljs-string">'number'</span>)</span></span> <span class="hljs-comment">// true</span>
Number.isNaN(<span class="hljs-string">'number'</span>) <span class="hljs-comment">// false</span></code></pre>
<p><code>Object.is</code>除了区分<a href="http://www.cnblogs.com/ziyunfei/archive/2012/12/10/2777099.html" rel="nofollow noreferrer" target="_blank">正负零这个非常小众的边界</a>，这个接口相对<code>===</code>更大的意义是判断NaN：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.is(NaN, NaN); // true
NaN === NaN; // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Object</span>.is(<span class="hljs-literal">NaN</span>, <span class="hljs-literal">NaN</span>); <span class="hljs-comment">// true</span>
<span class="hljs-literal">NaN</span> === <span class="hljs-literal">NaN</span>; <span class="hljs-comment">// false</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.is(+0, -0); // false
+0 === -0; // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Object</span>.is(+<span class="hljs-number">0</span>, <span class="hljs-number">-0</span>); <span class="hljs-comment">// false</span>
+<span class="hljs-number">0</span> === <span class="hljs-number">-0</span>; <span class="hljs-comment">// true</span></code></pre>
<p>同样的，<code>arr.includes(xx)</code>比<code>arr.lastIndexOf(xx) &gt; -1</code>好的地方也包括对于NaN的处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2, NaN].includes(NaN); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-literal">NaN</span>].includes(<span class="hljs-literal">NaN</span>); <span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader11">4.4# Number</h3>
<p><code>isFinite</code>和<code>Number.isFinite</code>的区别也是后者不存在隐式转换：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="isFinite(&quot;42&quot;);        // true
Number.isFinite(&quot;42&quot;); // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>isFinite(<span class="hljs-string">"42"</span>);        <span class="hljs-regexp">//</span> <span class="hljs-keyword">true</span>
Number.isFinite(<span class="hljs-string">"42"</span>); <span class="hljs-regexp">//</span> <span class="hljs-keyword">false</span></code></pre>
<p><code>Number.isInteger</code>表示一个数是不是小数，和<code>x === Math.floor(x)</code>的区别在于对<code>Infinity</code>的处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number.isInteger(Infinity);        // false
Infinity === Math.floor(Infinity); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Number</span>.isInteger(<span class="hljs-literal">Infinity</span>);        <span class="hljs-comment">// false</span>
<span class="hljs-literal">Infinity</span> === <span class="hljs-built_in">Math</span>.floor(<span class="hljs-literal">Infinity</span>); <span class="hljs-comment">// true</span></code></pre>
<p><code>Number.isSafeInteger</code>表示传入的数值有没有精度损失，它比较的是数字是否在<code>Number.MIN_SAFE_INTEGER</code>和<code>Number.MAX_SAFE_INTEGER</code>之间：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number.isSafeInteger(Math.pow(2, 53) - 1); // true
Number.isSafeInteger(Math.pow(2, 53)); // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>Number.isSafeInteger(Math.pow(<span class="hljs-number">2</span>, <span class="hljs-number">53</span>) - <span class="hljs-number">1</span>); <span class="hljs-comment">// true</span>
Number.isSafeInteger(Math.pow(<span class="hljs-number">2</span>, <span class="hljs-number">53</span>)); <span class="hljs-comment">// false</span></code></pre>
<p>我曾整理过Number的数轴(<a href="https://segmentfault.com/a/1190000000407658">＊</a>)，也写过<a href="http://alvarto.github.io/VisualNumeric64/#1" rel="nofollow noreferrer" target="_blank">JavaScript中的一些数字内存模型的demo</a>，其中有一部分值没有直接的量来表示，但现在有了。</p>
<p>从负无穷往正无穷来看，是这样的：</p>
<ul>
<li><p><code>Number.NEGATIVE_INFINITY</code> 负无穷</p></li>
<li><p><code>-Number.MAX_VALUE</code> 能表示的最小数字，更小被视为负无穷，等于<code>-(2^53-1)*(2^971)</code></p></li>
<li><p><code>Number.MIN_SAFE_INTEGER</code><sup>（新）</sup> 没有精度误差的最小数，等于<code>-(2^53-1)</code></p></li>
<li><p><code>0</code> 正负零</p></li>
<li><p><code>Number.EPSILON</code><sup>（新）</sup> IEEE 754规范下的精度位允许的最小差异值，等于<code>2^-52</code></p></li>
<li><p><code>Number.MIN_VALUE</code> 能表示的最小正整数，这是一个IEEE 754规范下的反规格化值，等于<code>2^-1074</code></p></li>
<li><p><code>Number.MAX_SAFE_INTEGER</code><sup>（新）</sup> 没有精度误差的最大数，，等于<code>2^53-1</code></p></li>
<li><p><code>Number.MAX_VALUE</code> 能表示的最大数字，更大被视为正无穷，等于<code>(2^53-1)*(2^971)</code></p></li>
<li><p><code>Number.INFINITY</code> 正无穷</p></li>
</ul>
<p>比较令人混淆的是<code>Number.EPSILON</code>和<code>Number.MIN_VALUE</code>，前者为精度位允许的最小差异值，考虑的是浮点数的精度位；而后者考虑的是利用到浮点数的所有位置能够表示的最小正数值。</p>
<h2 id="articleHeader12">5# 怪奇错误展</h2>
<p>本节收集了一些奇奇怪怪的错误提示，正常写出的代码不会导致它们，没有兴趣可以略过。</p>
<h3 id="articleHeader13">5.1# 新接口的迭代器参数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.from(1, 2, 3) // Array.of(1,2,3)的误调用
// 2 is not a function" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Array</span>.from(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>) <span class="hljs-comment">// Array.of(1,2,3)的误调用</span>
<span class="hljs-comment">// 2 is not a function</span></code></pre>
<p><code>Array.from</code>、<code>Promise.all</code>接口及集合类构造器的参数，可以放入支持迭代器的内容，而不局限于数组（node 0.12+兼容）。这里其实尝试去调用了参数的迭代器<code>Symbol.iterator</code>。</p>
<h3 id="articleHeader14">5.2# 新集合类容器的构造器</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array(); // []
Set(); // Uncaught TypeError: Constructor Set requires 'new'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Array</span>(); <span class="hljs-comment">// []</span>
<span class="hljs-built_in">Set</span>(); <span class="hljs-comment">// Uncaught TypeError: Constructor Set requires 'new'</span></code></pre>
<p>集合类容器<code>Int8Array</code> <code>Uint8Array</code> <code>Uint8ClampedArray</code> <code>Int16Array</code> <code>Uint16Array</code> <code>Int32Array</code> <code>Uint32Array</code> <code>Float32Array</code> <code>Float64Array</code> <code>Set</code>不可以通过非new方式来构造。</p>
<h3 id="articleHeader15">5.3# Tagged Template</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 30
`abcdefg`
// Uncaught TypeError: 30 is not a function" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> x = <span class="hljs-number">30</span>
<span class="hljs-string">`abcdefg`</span>
<span class="hljs-comment">// Uncaught TypeError: 30 is not a function</span></code></pre>
<p>模版语法可能是ES6最为显然的语法，但它的扩展形式Tagged Template在极端场景可能造成一个奇怪的报错，算是对不写分号党造成的又一个暴击<a href="https://zhuanlan.zhihu.com/p/24612490" rel="nofollow noreferrer" target="_blank">＊</a>。</p>
<h2 id="articleHeader16">6# 欺负新来的</h2>
<p>本篇章集结一些被滥用的特性。</p>
<h3 id="articleHeader17">6.1</h3>
<p>解构特性很棒，它可以在promise这样的单参数链式调用场景或是正则匹配场景中大方光芒，更为经典的是python风格的<code>[y, x] = [x, y]</code>。</p>
<p>但如果一个人铁了心要疯狂解构，新来维护这份代码的人就要默默流下痛苦的眼泪了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 新人：是什么阻止了你用 a2 = [o1[a], o1[b], o1[c]] ……
var o1 = { a: 1, b: 2, c: 3 },
    a2 = [];

( { a: a2[0], b: a2[1], c: a2[2] } = o1 );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>// 新人：是什么阻止了你用 <span class="hljs-built_in">a2</span> = [o1[a], o1[<span class="hljs-keyword">b], </span>o1[c]] ……
<span class="hljs-symbol">var</span> o1 = { a: <span class="hljs-number">1</span>, <span class="hljs-keyword">b: </span><span class="hljs-number">2</span>, c: <span class="hljs-number">3</span> },
    <span class="hljs-built_in">a2</span> = []<span class="hljs-comment">;</span>

( { a: <span class="hljs-built_in">a2</span>[<span class="hljs-number">0</span>], <span class="hljs-keyword">b: </span><span class="hljs-built_in">a2</span>[<span class="hljs-number">1</span>], c: <span class="hljs-built_in">a2</span>[<span class="hljs-number">2</span>] } = o1 )<span class="hljs-comment">;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 老人：看得爽吗
var { a: { b: [ c, d ], e: { f } }, g } = obj;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// 老人：看得爽吗</span>
var { <span class="hljs-string">a:</span> { <span class="hljs-string">b:</span> [ c, d ], <span class="hljs-string">e:</span> { f } }, g } = obj;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 主管：写到一半这个程序猿已经被打死了
var x = 200, y = 300, z = 100;
var o1 = { x: { y: 42 }, z: { y: z } };

( { y: x = { y: y } } = o1 );
( { z: y = { y: z } } = o1 );
( { x: z = { y: x } } = o1 );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// 主管：写到一半这个程序猿已经被打死了</span>
var x = <span class="hljs-number">200</span>, y = <span class="hljs-number">300</span>, z = <span class="hljs-number">100</span>;
var o1 = { <span class="hljs-string">x:</span> { <span class="hljs-string">y:</span> <span class="hljs-number">42</span> }, <span class="hljs-string">z:</span> { <span class="hljs-string">y:</span> z } };

( { <span class="hljs-string">y:</span> x = { <span class="hljs-string">y:</span> y } } = o1 );
( { <span class="hljs-string">z:</span> y = { <span class="hljs-string">y:</span> z } } = o1 );
( { <span class="hljs-string">x:</span> z = { <span class="hljs-string">y:</span> x } } = o1 );</code></pre>
<p>一个可以尝试的保持代码可读性的方法，是尽量保证解构的层次低。</p>
<h3 id="articleHeader18">6.2</h3>
<p>新对象字面量也很不错，新的rest操作符也很实用，但是如果你们把它们混在一起……下面进一段代码赏析（<a href="http://www.zcfy.cc/article/es6-is-great-but-use-it-cautiously-sergey-abakumoff-medium-1761.html" rel="nofollow noreferrer" target="_blank">＊</a>）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const sharePostStatus = createReducer( {}, {
    [ PUBLICIZE_SHARE ]: ( state, { siteId, postId } ) => ( { ...state, [ siteId ]: { ...state[ siteId ], [ postId ]: {
        requesting: true,
    } } } ),
    [ PUBLICIZE_SHARE_SUCCESS ]: ( state, { siteId, postId } ) => ( { ...state, [ siteId ]: { ...state[ siteId ], [ postId ]: {
        requesting: false,
        success: true,
    } } } ),
    [ PUBLICIZE_SHARE_FAILURE ]: ( state, { siteId, postId, error } ) => ( { ...state, [ siteId ]: { ...state[ siteId ], [ postId ]: {
        requesting: false,
        success: false,
        error,
    } } } ),
    [ PUBLICIZE_SHARE_DISMISS ]: ( state, { siteId, postId } ) => ( { ...state, [ siteId ]: {
        ...state[ siteId ], [ postId ]: undefined
    } } ),
} );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>export const sharePostStatus = createReducer( {}, {
    [ PUBLICIZE_SHARE ]: ( <span class="hljs-keyword">state</span>, { siteId, postId } ) =&gt; ( { ...<span class="hljs-keyword">state</span>, [ siteId ]: { ...<span class="hljs-keyword">state</span>[ siteId ], [ postId ]: {
        requesting: true,
    } } } ),
    [ PUBLICIZE_SHARE_SUCCESS ]: ( <span class="hljs-keyword">state</span>, { siteId, postId } ) =&gt; ( { ...<span class="hljs-keyword">state</span>, [ siteId ]: { ...<span class="hljs-keyword">state</span>[ siteId ], [ postId ]: {
        requesting: false,
        success: true,
    } } } ),
    [ PUBLICIZE_SHARE_FAILURE ]: ( <span class="hljs-keyword">state</span>, { siteId, postId, error } ) =&gt; ( { ...<span class="hljs-keyword">state</span>, [ siteId ]: { ...<span class="hljs-keyword">state</span>[ siteId ], [ postId ]: {
        requesting: false,
        success: false,
        error,
    } } } ),
    [ PUBLICIZE_SHARE_DISMISS ]: ( <span class="hljs-keyword">state</span>, { siteId, postId } ) =&gt; ( { ...<span class="hljs-keyword">state</span>, [ siteId ]: {
        ...<span class="hljs-keyword">state</span>[ siteId ], [ postId ]: undefined
    } } ),
} );</code></pre>
<p>尽可能的保持代码的可读性，一行只用不超过2个ES6特性或许是一个可操作的方案。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6新语法疑点简析

## 原文链接
[https://segmentfault.com/a/1190000008203048](https://segmentfault.com/a/1190000008203048)

