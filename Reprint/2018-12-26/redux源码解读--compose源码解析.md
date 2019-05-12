---
title: 'redux源码解读--compose源码解析' 
date: 2018-12-26 2:30:14
hidden: true
slug: mwbi7limzr
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">compose源码解析</h2>
<p><code>compose</code>模块的代码十分简练，但是实现的作用却是十分强大。<code>redux</code>为何称为redux？有人说就是<code>reduce</code>和<code>flux</code>的结合体，而<code>reduce</code>正是<code>compose</code>模块的核心。</p>
<p><code>compose</code>模块所实现的功能强大而简单：<strong>从右到左,组合参数(函数)。</strong>所以，传递给<code>compose</code>方法的参数，必须都是函数类型的(这一点，在源码中没有判断，可能是因为这个模块是redux内部使用的模块，没有对外暴露，所以不需要很强的校验。)。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" compose(f, g, h) ====> (...args) => f(g(h(...args)))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"> compose(f, g, h) ====&gt; <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> f(g(h(...args)))</code></pre>
<p>模块的代码很简单，但是涉及到的内容却很重要，下面一点一点的看。</p>
<p><strong>reduce是什么？</strong></p>
<p><code>reduce</code>是<code>es5</code>中的数组的一个方法，对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。函数签名为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.reduce(callback[, initialValue])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">arr.reduce(callback[, initialValue])</code></pre>
<p><strong>callback</strong>是执行数组中每个元素的函数，这个函数接收几个参数：</p>
<ul>
<li>
<strong>accumulator</strong>:上一次callback调用的返回值，如果是第一次调用，则这个值就是initialValue。如果没有提供initialValue则使用数组的第一个元素。</li>
<li>
<strong>currentValue</strong>: 数组正在处理的元素</li>
<li>
<strong>currentIndex</strong>: 数组正在处理的元素的当前的索引</li>
<li>
<strong>array</strong>: 调用reduce方法的数组</li>
</ul>
<p>综上，reduce方法详细的签名就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.reduce(function (accumulator, currentValue, currentIndex, array) {}[, initialValue]) " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">arr.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">accumulator, currentValue, currentIndex, array</span>) </span>{}[, initialValue]) </code></pre>
<p><strong>几个小Demo</strong></p>
<ul><li>数组求和</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1,2,3,4,5].reduce((a, b) => a + b) // 15" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>].reduce(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b) <span class="hljs-comment">// 15</span></code></pre>
<ul><li>数组拉平</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[[0, 1], [2, 3], [4, 5]].reduce((a, b) => {
  return a.concat(b);
}, []);  // [ 0, 1, 2, 3, 4, 5 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>]].reduce(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> a.concat(b);
}, []);  <span class="hljs-comment">// [ 0, 1, 2, 3, 4, 5 ]</span></code></pre>
<blockquote><p>关于reduce详细的文档可以参考<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce" rel="nofollow noreferrer" target="_blank">Array.prototype.reduce</a></p></blockquote>
<p>明白了<code>reduce</code>是怎么回事之后，我们先来看一下<code>compose</code>有什么神奇的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import compose from '../src/compose'

// function f
const f = (arg) => `函数f(${arg})` 

// function g
const g = (arg) => `函数g(${arg})`

// function h 最后一个函数可以接受多个参数
const h = (...arg) => `函数h(${arg.join('_')})`

const r = compose(f, g, h)

console.log(typeof r) // function

console.log(r(1,2,3)) //函数f(函数g(函数h(1_2_3)))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> compose <span class="hljs-keyword">from</span> <span class="hljs-string">'../src/compose'</span>

<span class="hljs-comment">// function f</span>
<span class="hljs-keyword">const</span> f = <span class="hljs-function">(<span class="hljs-params">arg</span>) =&gt;</span> <span class="hljs-string">`函数f(<span class="hljs-subst">${arg}</span>)`</span> 

<span class="hljs-comment">// function g</span>
<span class="hljs-keyword">const</span> g = <span class="hljs-function">(<span class="hljs-params">arg</span>) =&gt;</span> <span class="hljs-string">`函数g(<span class="hljs-subst">${arg}</span>)`</span>

<span class="hljs-comment">// function h 最后一个函数可以接受多个参数</span>
<span class="hljs-keyword">const</span> h = <span class="hljs-function">(<span class="hljs-params">...arg</span>) =&gt;</span> <span class="hljs-string">`函数h(<span class="hljs-subst">${arg.join(<span class="hljs-string">'_'</span>)}</span>)`</span>

<span class="hljs-keyword">const</span> r = compose(f, g, h)

<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> r) <span class="hljs-comment">// function</span>

<span class="hljs-built_in">console</span>.log(r(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>)) <span class="hljs-comment">//函数f(函数g(函数h(1_2_3)))</span></code></pre>
<p>从上面可以的代码可以看出：<strong>compose的运行结果是一个函数，调用这个函数所传递的参数将会作为compose最后一个参数的参数，从而像'洋葱圈'似的，由内向外，逐步调用。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVX1BG?w=1310&amp;h=988" src="https://static.alili.tech/img/bVX1BG?w=1310&amp;h=988" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><em>源码</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function compose(...funcs) {
  // funcs是一个保存着所有参数函数的数组
  // 如果没有传递任何参数，就返回一个函数，这个函数是输入什么得到什么。
  if (funcs.length === 0) {
    return arg => arg
  }
  // 只传递一个参数的时候，就直接把这个函数返回
  if (funcs.length === 1) {
    return funcs[0]
  }
  // 返回组合函数
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compose</span>(<span class="hljs-params">...funcs</span>) </span>{
  <span class="hljs-comment">// funcs是一个保存着所有参数函数的数组</span>
  <span class="hljs-comment">// 如果没有传递任何参数，就返回一个函数，这个函数是输入什么得到什么。</span>
  <span class="hljs-keyword">if</span> (funcs.length === <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">arg</span> =&gt;</span> arg
  }
  <span class="hljs-comment">// 只传递一个参数的时候，就直接把这个函数返回</span>
  <span class="hljs-keyword">if</span> (funcs.length === <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">return</span> funcs[<span class="hljs-number">0</span>]
  }
  <span class="hljs-comment">// 返回组合函数</span>
  <span class="hljs-keyword">return</span> funcs.reduce(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> (...args) =&gt; a(b(...args)))
}</code></pre>
<p>这就是对<code>compose</code>源码的一个整体解读，水平有限，欢迎拍砖。后续的源码解读和测试例子可以关注：<a href="https://github.com/SourceCooode/__redux" rel="nofollow noreferrer" target="_blank">redux源码解读仓库</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
redux源码解读--compose源码解析

## 原文链接
[https://segmentfault.com/a/1190000011883516](https://segmentfault.com/a/1190000011883516)

