---
title: '【前端】ES6入门基础知识' 
date: 2018-12-27 2:30:12
hidden: true
slug: 8gyvlr4vx9p
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>关于ES6的入门了解</strong></p>
<blockquote><p>新增模板字符串（为JavaScript提供了简单的字符串插值功能）、箭头函数（操作符左边为输入的参数，而右边则是进行的操作以及返回的值Inputs=&gt;outputs。）、for-of（用来遍历数据—例如数组中的值。）arguments对象可被不定参数和默认参数完美代替。ES6将promise对象纳入规范，提供了原生的Promise对象。增加了let和const命令，用来声明变量。增加了块级作用域。let命令实际上就增加了块级作用域。ES6规定，var命令和function命令声明的全局变量，属于全局对象的属性；let命令、const命令、class命令声明的全局变量，不属于全局对象的属性。。还有就是引入module模块的概念</p></blockquote>
<p><strong>对Promise的理解</strong></p>
<ul>
<li>
<p>依照 Promise/A+ 的定义，Promise 有四种状态：</p>
<ul>
<li>pending: 初始状态, 非 fulfilled 或 rejected.</li>
<li>fulfilled: 成功的操作.</li>
<li>rejected: 失败的操作.</li>
<li>settled: Promise已被fulfilled或rejected，且不是pending</li>
</ul>
</li>
<li>另外， fulfilled 与 rejected 一起合称 settled</li>
<li>Promise 对象用来进行延迟(deferred) 和异步(asynchronous ) 计算</li>
</ul>
<p><strong>Promise 的构造函数</strong></p>
<ul><li>构造一个 Promise，最基本的用法如下：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var promise = new Promise(function(resolve, reject) {

        if (...) {  // succeed

            resolve(result);

        } else {   // fails

            reject(Error(errMessage));

        }
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{

        <span class="hljs-keyword">if</span> (...) {  <span class="hljs-comment">// succeed</span>

            resolve(result);

        } <span class="hljs-keyword">else</span> {   <span class="hljs-comment">// fails</span>

            reject(<span class="hljs-built_in">Error</span>(errMessage));

        }
    });</code></pre>
<ul><li>Promise 实例拥有 then 方法（具有 then 方法的对象，通常被称为thenable）。它的使用方法如下：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="promise.then(onFulfilled, onRejected)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mercury"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">promise</span>.<span class="hljs-built_in">then</span>(onFulfilled, onRejected)</code></pre>
<ul><li>接收两个函数作为参数，一个在 fulfilled 的时候被调用，一个在rejected的时候被调用，接收参数就是 future，onFulfilled 对应 resolve, onRejected 对应 reject</li></ul>
<p><strong>什么是 Promise ？</strong></p>
<ul>
<li>Promise 就是一个对象，用来表示并传递异步操作的最终结果</li>
<li>Promise 最主要的交互方式：将回调函数传入 then 方法来获得最终结果或出错原因</li>
<li>Promise 代码书写上的表现：以“链式调用”代替回调函数层层嵌套（回调地狱）</li>
</ul>
<p><strong>ECMAScript6的新特性</strong></p>
<ul>
<li>块级作用区域              <code>let a = 1;</code>
</li>
<li>可定义常量                <code>const PI = 3.141592654;</code>
</li>
<li>变量解构赋值              <code>var [a, b, c] = [1, 2, 3];</code>
</li>
<li>字符串的扩展(模板字符串)  <code> var sum = </code>${a + b}<code>;</code>
</li>
<li>数组的扩展(转换数组类型)   <code>Array.from($('li'));</code>
</li>
<li>函数的扩展(扩展运算符)     <code>[1, 2].push(...[3, 4, 5]);</code>
</li>
<li>对象的扩展(同值相等算法)   <code> Object.is(NaN, NaN);</code>
</li>
<li>新增数据类型(Symbol)      <code>let uid = Symbol('uid');</code>
</li>
<li>新增数据结构(Map)        <code> let set = new Set([1, 2, 2, 3]);</code>
</li>
<li>for...of循环            <code>for(let val of arr){};</code>
</li>
<li>Promise对象            <code> var promise = new Promise(func);</code>
</li>
<li>Generator函数          <code> function* foo(x){yield x; return x*x;}</code>
</li>
<li>引入Class(类)          <code> class Foo {}</code>
</li>
<li>引入模块体系            <code> export default func;</code>
</li>
<li>引入async函数[ES7]</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function asyncPrint(value, ms) {
      await timeout(ms);
      console.log(value)
     }
     " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncPrint</span>(<span class="hljs-params">value, ms</span>) </span>{
      <span class="hljs-keyword">await</span> timeout(ms);
      <span class="hljs-built_in">console</span>.log(value)
     }
     </code></pre>
<p><strong>Object.is() 与原来的比较操作符 ===、== 的区别？</strong></p>
<ul>
<li>== 相等运算符，比较时会自动进行数据类型转换</li>
<li>=== 严格相等运算符，比较时不进行隐式类型转换</li>
<li>Object.is 同值相等算法，在 === 基础上对 0 和 NaN 特别处理</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>+<span class="hljs-number">0</span> === <span class="hljs-number">-0</span> <span class="hljs-comment">//true</span>
<span class="hljs-literal">NaN</span> === <span class="hljs-literal">NaN</span> <span class="hljs-comment">// false</span>

<span class="hljs-built_in">Object</span>.is(+<span class="hljs-number">0</span>, <span class="hljs-number">-0</span>) <span class="hljs-comment">// false</span>
<span class="hljs-built_in">Object</span>.is(<span class="hljs-literal">NaN</span>, <span class="hljs-literal">NaN</span>) <span class="hljs-comment">// true</span></code></pre>
<p><strong>什么是 Babel ？</strong></p>
<ul>
<li>Babel 是一个 JS 编译器，自带一组 ES6 语法转化器，用于转化 JS 代码。<br>这些转化器让开发者提前使用最新的 JS语法(ES6/ES7)，而不用等浏览器全部兼容。</li>
<li>Babel 默认只转换新的 JS 句法(syntax)，而不转换新的API。</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【前端】ES6入门基础知识

## 原文链接
[https://segmentfault.com/a/1190000011794415](https://segmentfault.com/a/1190000011794415)

