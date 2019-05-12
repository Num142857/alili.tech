---
title: 'JS中的柯里化 及 精巧的自动柯里化实现' 
date: 2018-12-23 2:30:06
hidden: true
slug: y3hmumwy0tk
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">什么是柯里化？</h1>
<blockquote>在计算机科学中，柯里化<strong>（Currying）</strong>是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数且返回结果的新函数的技术。这个技术由 <strong>Christopher Strachey</strong> 以逻辑学家 <strong>Haskell Curry</strong> 命名的，尽管它是 <strong>Moses Schnfinkel</strong> 和 <strong>Gottlob Frege</strong> 发明的。</blockquote>
<p>理论看着头大？没关系，先看看代码：</p>
<h3 id="articleHeader1">柯里化应用</h3>
<p>假设我们需要实现一个对列表元素进行某种处理的功能，比如说返回一个原列表内每一个元素加一的新列表，那么很容易想到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const list = [0, 1, 2, 3];
const list1 = list.map(elem => elem + 1); // => [1, 2, 3, 4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>const <span class="hljs-type">list</span> = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
const list1 = <span class="hljs-type">list</span>.map(elem =&gt; elem + <span class="hljs-number">1</span>); <span class="hljs-comment">// =&gt; [1, 2, 3, 4]</span></code></pre>
<p>很简单是吧？如果又要加2呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const list = [0, 1, 2, 3];
const list1 = list.map(elem => elem + 1); // => [1, 2, 3, 4]
const list2 = list.map(elem => elem + 2); // => [2, 3, 4, 5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>const <span class="hljs-type">list</span> = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
const list1 = <span class="hljs-type">list</span>.map(elem =&gt; elem + <span class="hljs-number">1</span>); <span class="hljs-comment">// =&gt; [1, 2, 3, 4]</span>
const list2 = <span class="hljs-type">list</span>.map(elem =&gt; elem + <span class="hljs-number">2</span>); <span class="hljs-comment">// =&gt; [2, 3, 4, 5]</span></code></pre>
<p>看上去效率有点低，处理函数封装下？<br>可是map的回调函数只接受当前元素 <strong>elem</strong> 这一个参数，看上去好像没有办法封装...</p>
<p>你也许会想：如果能拿到一个<strong>部分配置好的函数</strong>就好了，比如说：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// plus返回部分配置好的函数
const plus1 = plus(1);
const plus2 = plus(2);

plus1(5); // => 6
plus2(7); // => 9" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// plus返回部分配置好的函数</span>
const plus1 = plus(<span class="hljs-number">1</span>);
const plus2 = plus(<span class="hljs-number">2</span>);

plus1(<span class="hljs-number">5</span>); <span class="hljs-comment">// =&gt; 6</span>
plus2(<span class="hljs-number">7</span>); <span class="hljs-comment">// =&gt; 9</span></code></pre>
<p>把这样的函数传进map：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const list = [0, 1, 2, 3];
const list1 = list.map(plus1); // => [1, 2, 3, 4]
const list2 = list.map(plus2); // => [2, 3, 4, 5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">const</span> <span class="hljs-built_in">list</span> = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-keyword">const</span> list1 = <span class="hljs-built_in">list</span>.<span class="hljs-built_in">map</span>(plus1); <span class="hljs-comment">// =&gt; [1, 2, 3, 4]</span>
<span class="hljs-keyword">const</span> list2 = <span class="hljs-built_in">list</span>.<span class="hljs-built_in">map</span>(plus2); <span class="hljs-comment">// =&gt; [2, 3, 4, 5]</span></code></pre>
<p>是不是很棒棒？这样一来不管是加多少，只需要<code>list.map(plus(x))</code>就好了，完美实现了封装，可读性大大提高！ (☆ﾟ∀ﾟ)</p>
<p>不过问题来了：<br><strong>这样的plus函数要怎么实现呢？</strong></p>
<p><strong>这时候柯里化就能派上用场了：</strong></p>
<h2 id="articleHeader2">柯里化函数</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 原始的加法函数
function origPlus(a, b) {
  return a + b;
}

// 柯里化后的plus函数
function plus(a) {
  return function(b) {
    return a + b;
  }
}

// ES6写法
const plus = a => b => a + b;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 原始的加法函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">origPlus</span>(<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-keyword">return</span> a + b;
}

<span class="hljs-comment">// 柯里化后的plus函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">plus</span>(<span class="hljs-params">a</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">b</span>) </span>{
    <span class="hljs-keyword">return</span> a + b;
  }
}

<span class="hljs-comment">// ES6写法</span>
<span class="hljs-keyword">const</span> plus = <span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> b =&gt; a + b;</code></pre>
<p>可以看到，柯里化的 plus 函数首先接受<strong>一个参数</strong> a，然后返回一个接受<strong>一个参数</strong> b 的函数，由于<strong>闭包</strong>的原因，返回的函数可以访问到父函数的参数 a，所以举个例子：<code>const plus2 = plus(2)</code>就可等效视为<code>function plus2(b) { return 2 + b; }</code>，这样就实现了<strong>部分配置</strong>。</p>
<p>通俗地讲，柯里化就是一个部分配置<strong>多参数函数</strong>的过程，每一步都返回一个接受<strong>单个参数</strong>的部分配置好的函数。一些极端的情况可能需要分很多次来部分配置一个函数，比如说多次相加:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="multiPlus(1)(2)(3); // => 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code style="word-break: break-word; white-space: initial;">multiPlus<span class="hljs-comment">(1)</span><span class="hljs-comment">(2)</span><span class="hljs-comment">(3)</span>; <span class="hljs-comment">// =&gt; 6</span></code></pre>
<p>这种写法看着很奇怪吧？不过如果入了JS的函数式编程这个大坑的话，这会是常态。（笑）</p>
<h1 id="articleHeader3">JS中自动柯里化的精巧实现</h1>
<blockquote>柯里化<strong>（Currying）</strong>是函数式编程中很重要的一环，很多函数式语言<strong>（eg. Haskell）</strong>都会默认将函数自动柯里化。然而JS并不会这样，因此我们需要自己来实现自动柯里化的函数。</blockquote>
<p>先上代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES5
function curry(fn) {
  function _c(restNum, argsList) {
    return restNum === 0 ?
      fn.apply(null, argsList) :
      function(x) {
        return _c(restNum - 1, argsList.concat(x));
      };
  }
  return _c(fn.length, []);
}

// ES6
const curry = fn => {
  const _c = (restNum, argsList) => restNum === 0 ?
    fn(...argsList) : x => _c(restNum - 1, [...argsList, x]);

  return _c(fn.length, []);
}

/***************** 使用 *********************/

var plus = curry(function(a, b) {
  return a + b;
});

// ES6
const plus = curry((a, b) => a + b);

plus(2)(4); // => 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ES5</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">curry</span>(<span class="hljs-params">fn</span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_c</span>(<span class="hljs-params">restNum, argsList</span>) </span>{
    <span class="hljs-keyword">return</span> restNum === <span class="hljs-number">0</span> ?
      fn.apply(<span class="hljs-literal">null</span>, argsList) :
      <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{
        <span class="hljs-keyword">return</span> _c(restNum - <span class="hljs-number">1</span>, argsList.concat(x));
      };
  }
  <span class="hljs-keyword">return</span> _c(fn.length, []);
}

<span class="hljs-comment">// ES6</span>
<span class="hljs-keyword">const</span> curry = <span class="hljs-function"><span class="hljs-params">fn</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> _c = <span class="hljs-function">(<span class="hljs-params">restNum, argsList</span>) =&gt;</span> restNum === <span class="hljs-number">0</span> ?
    fn(...argsList) : <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> _c(restNum - <span class="hljs-number">1</span>, [...argsList, x]);

  <span class="hljs-keyword">return</span> _c(fn.length, []);
}

<span class="hljs-comment">/***************** 使用 *********************/</span>

<span class="hljs-keyword">var</span> plus = curry(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-keyword">return</span> a + b;
});

<span class="hljs-comment">// ES6</span>
<span class="hljs-keyword">const</span> plus = curry(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b);

plus(<span class="hljs-number">2</span>)(<span class="hljs-number">4</span>); <span class="hljs-comment">// =&gt; 6</span></code></pre>
<p>这样就实现了自动的柯里化！(╭￣3￣)╭♡</p>
<p><strong>如果你看得懂发生了什么的话，那么恭喜你！大家口中的大佬就是你！╰(<em>°▽°</em>)╯，快留下赞然后去开始你的函数式生涯吧（滑稽</strong></p>
<p>如果你没看懂发生了什么，别担心，我现在开始帮你理一下思路。</p>
<h2 id="articleHeader4">需求分析</h2>
<p>我们需要一个 curry 函数，它接受一个待柯里化的函数为参数，返回一个用于接收一个参数的函数，接收到的参数放到一个列表中，当参数数量足够时，执行原函数并返回结果。</p>
<h2 id="articleHeader5">实现方式</h2>
<p>简单思考可以知道，柯里化部分配置函数的步骤数等于 <strong>fn</strong> 的参数个数，也就是说有<strong>两个参数</strong>的 plus 函数需要分<strong>两步</strong>来部分配置。函数的参数个数可以通过<code>fn.length</code>获取。</p>
<p>总的想法就是每传一次参，就把该参数放入一个参数列表 <strong>argsList</strong> 中，如果已经没有要传的参数了，那么就调用<code>fn.apply(null, argsList)</code>将原函数执行。要实现这点，我们就需要一个内部的判断函数 <strong>_c(restNum, argsList)</strong>，函数接受两个参数，一个是剩余参数个数 <strong>restNum</strong>，另一个是已获取的参数的列表 <strong>argsList</strong>；<strong>_c</strong> 的功能就是判断是否还有未传入的参数，当 <strong>restNum</strong> 为零时，就是时候通过<code>fn.apply(null, argsList)</code>执行原函数并返回结果了。如果还有参数需要传递的话，也就是说 <strong>restNum</strong> 不为零时，就需要返回一个<strong>单参数函数</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function(x) {
  return _c(restNum - 1, argsList.concat(x));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(x)</span> </span>{
  <span class="hljs-keyword">return</span> _c(restNum - <span class="hljs-number">1</span>, argsList.concat(x));
}</code></pre>
<p>来继续接收参数。这里形成了一个尾递归，函数接受了一个参数后，剩余需要参数数量 <strong>restNum</strong> 减一，并将新参数 <strong>x</strong> 加入 <strong>argsList</strong> 后传入 <strong>_c</strong> 进行递归调用。结果就是，当参数数量不足时，返回负责接收新参数的单参数函数，当参数够了时，就调用原函数并返回。</p>
<p>现在再来看：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function curry(fn) {
  function _c(restNum, argsList) {
    return restNum === 0 ?
      fn.apply(null, argsList) :
      function(x) {
        return _c(restNum - 1, argsList.concat(x));
      };
  }
  return _c(fn.length, []); // 递归开始
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">curry</span>(<span class="hljs-params">fn</span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_c</span>(<span class="hljs-params">restNum, argsList</span>) </span>{
    <span class="hljs-keyword">return</span> restNum === <span class="hljs-number">0</span> ?
      fn.apply(<span class="hljs-literal">null</span>, argsList) :
      <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{
        <span class="hljs-keyword">return</span> _c(restNum - <span class="hljs-number">1</span>, argsList.concat(x));
      };
  }
  <span class="hljs-keyword">return</span> _c(fn.length, []); <span class="hljs-comment">// 递归开始</span>
}</code></pre>
<p>是不是开始清晰起来了？ (<em>ﾟ▽ﾟ</em>)</p>
<p>ES6写法的由于使用了 <strong>数组解构</strong> 及 <strong>箭头函数</strong> 等语法糖，看上去精简很多，不过思想都是一样的啦～</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES6
const curry = fn => {
  const _c = (restNum, argsList) => restNum === 0 ?
    fn(...argsList) : x => _c(restNum - 1, [...argsList, x]);

  return _c(fn.length, []);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ES6</span>
<span class="hljs-keyword">const</span> curry = <span class="hljs-function"><span class="hljs-params">fn</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> _c = <span class="hljs-function">(<span class="hljs-params">restNum, argsList</span>) =&gt;</span> restNum === <span class="hljs-number">0</span> ?
    fn(...argsList) : <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> _c(restNum - <span class="hljs-number">1</span>, [...argsList, x]);

  <span class="hljs-keyword">return</span> _c(fn.length, []);
}</code></pre>
<h1 id="articleHeader6">与其他方法的对比</h1>
<p>还有一种大家常用的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function curry(fn) {
  const len = fn.length;
  return function judge(...args1) {
    return args1.length >= len ?
    fn(...args1):
    function(...args2) {
      return judge(...[...args1, ...args2]);
    }
  }
}

// 使用箭头函数
const curry = fn => {
  const len = fn.length;
  const judge = (...args1) => args1.length >= len ?
    fn(...args1) : (...args2) => judge(...[...args1, ...args2]);
  return judge;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">curry</span><span class="hljs-params">(fn)</span> </span>{
  <span class="hljs-keyword">const</span> len = fn.length;
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">judge</span><span class="hljs-params">(<span class="hljs-rest_arg">...args1</span>)</span> </span>{
    <span class="hljs-keyword">return</span> args1.length &gt;= len ?
    fn(...args1):
    <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-rest_arg">...args2</span>)</span> </span>{
      <span class="hljs-keyword">return</span> judge(...[...args1, ...args2]);
    }
  }
}

<span class="hljs-comment">// 使用箭头函数</span>
<span class="hljs-keyword">const</span> curry = fn =&gt; {
  <span class="hljs-keyword">const</span> len = fn.length;
  <span class="hljs-keyword">const</span> judge = (...args1) =&gt; args1.length &gt;= len ?
    fn(...args1) : (...args2) =&gt; judge(...[...args1, ...args2]);
  <span class="hljs-keyword">return</span> judge;
}</code></pre>
<p>与本篇文章先前提到的方法对比的话，发现这种方法有两个问题：</p>
<ol>
<li>依赖ES6的解构（函数参数中的 <strong>...args1</strong> 与 <strong>...args2</strong>）；</li>
<li>性能稍差一点。</li>
</ol>
<h2 id="articleHeader7">性能问题</h2>
<p>做个测试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.time(&quot;curry&quot;);

const plus = curry((a, b, c, d, e) => a + b + c + d + e);
plus(1)(2)(3)(4)(5);

console.timeEnd(&quot;curry&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>console.time(<span class="hljs-string">"curry"</span>)<span class="hljs-comment">;</span>

const plus = curry((a, <span class="hljs-keyword">b, </span>c, d, e) =&gt; a + <span class="hljs-keyword">b </span>+ c + d + e)<span class="hljs-comment">;</span>
plus(<span class="hljs-number">1</span>)(<span class="hljs-number">2</span>)(<span class="hljs-number">3</span>)(<span class="hljs-number">4</span>)(<span class="hljs-number">5</span>)<span class="hljs-comment">;</span>

console.timeEnd(<span class="hljs-string">"curry"</span>)<span class="hljs-comment">;</span></code></pre>
<p>在我的电脑<em>（Manjaro Linux，Intel Xeon E5 2665，32GB DDR3 四通道1333Mhz，Node.js 9.2.0）</em>上：</p>
<ul>
<li>本篇提到的方法耗时约 <strong>0.325ms</strong>
</li>
<li>其他方法的耗时约 <strong>0.345ms</strong>
</li>
</ul>
<p>差的这一点<strong>猜测</strong>是<strong>闭包</strong>的原因。由于闭包的访问比较耗性能，而这种方式形成了两个<strong>闭包</strong>：<strong>fn</strong> 和 <strong>len</strong>，前面提到的方法只形成了 <strong>fn</strong> 一个闭包，所以造成了这一微小的差距。</p>
<p>也希望大家能自己测试下并说说自己的看法～</p>
<p>有问题欢迎留言～ ⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄.</p>
<p><strong>&lt;!-- End --&gt;</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS中的柯里化 及 精巧的自动柯里化实现

## 原文链接
[https://segmentfault.com/a/1190000012364000](https://segmentfault.com/a/1190000012364000)

