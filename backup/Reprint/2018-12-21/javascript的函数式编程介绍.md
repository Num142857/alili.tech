---
title: 'javascript的函数式编程介绍' 
date: 2018-12-21 2:30:11
hidden: true
slug: b7h9a2i0va
categories: [reprint]
---

{{< raw >}}

                    
<p>在编程的世界里有两种基本类型的编程：<br>函数式编程（OFP）：强调将一系列的“动作”组合成一个体系；<br>对象式编程（OOP）：强调将一系列的成分聚合到一个类中；<br>对于javascript这种弱类语言来说，它既有OOP的特点（通过class或者prototype封装一个类）,又有OFP的特点。而接下来主要介绍一下js的OFP。</p>
<p>本博客主要以几个方面介绍js的OFP：一等函数，闭包，高阶函数，函数柯里化，函数的纯度；</p>
<ul><li><strong>一等函数</strong></li></ul>
<p>定义：形容函数可以像数值一样自由穿梭在程序的不同地方；<br>1）可以像数值一样保存在一个变量之中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a1 = 1
const a2 = function(){...}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-keyword">const</span> a1 = <span class="hljs-number">1</span>
<span class="hljs-keyword">const</span> a2 = function()<span class="hljs-meta">{...}</span></code></pre>
<p>2)可以像数值一样保存在数组中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [10, 12, function(){...}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> arr = [<span class="hljs-number">10</span>, <span class="hljs-number">12</span>, function()<span class="hljs-meta">{...}</span>]</code></pre>
<p>3)可以和数值一样成为对象的成员：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = {
                a: 1,
                b: function(){...}
             }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-keyword">const</span> obj = {
                a: <span class="hljs-number">1</span>,
                b: function()<span class="hljs-meta">{...}</span>
             }</code></pre>
<p>4)可以像数值一样立刻运算：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="（function(){...})（）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code style="word-break: break-word; white-space: initial;">（function()<span class="hljs-meta">{...}</span>)（）</code></pre>
<p>5）可以作为函数的参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function A (){...}
function B (A){...}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>function A ()<span class="hljs-meta">{...}</span>
function B (A)<span class="hljs-meta">{...}</span></code></pre>
<p>6)可以作为函数的返回值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function A(){ 
    return function(){...}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>function A(){ 
    <span class="hljs-keyword">return</span> function()<span class="hljs-meta">{...}</span>
}</code></pre>
<ul><li><strong>闭包</strong></li></ul>
<p>定义：（闭包的定义有多种多样，而这里的定义是本人的理解）闭包实际上是一个函数，该函数作用域能捕捉外部的绑定，并以值的形式作为外部函数的返回值；外部的绑定其实都是为了闭包的调用而定义和设置。<br>外部的绑定：就是外部函数定义的局部变量或者外部函数的传参（后面会比较详细介绍）<br>特点：被捕捉的外部绑定不会随着外部函数回收而回收，而是一会被闭包所引用，一直存在。<br>demo:</p>
<p><span class="img-wrap"><img data-src="/img/bV0rtY?w=824&amp;h=572" src="https://static.alili.tech/img/bV0rtY?w=824&amp;h=572" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>1)自由变量<br>闭包函数中所绑定的外部函数的变量；<br>特点：<br>a)自由变量一定不会在闭包函数内定义；<br>b)自由变量可以是外部函数内的声明，也可以是外部函数的传参；<br>c)自由变量可以是变量，也可以是函数；</p>
<p><span class="img-wrap"><img data-src="/img/bV0ru9?w=470&amp;h=388" src="https://static.alili.tech/img/bV0ru9?w=470&amp;h=388" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>2）变量遮蔽：<br>定义：两个变量的命名相同，则出现变量遮蔽现象（该两个变量可能存在于同一个作用域，可以能处于不同的作用域）<br>特点：该变量被调用时，离该变量最近的同名变量会覆盖上面的同名变量；（简单的说就是就近原则）</p>
<ul><li><strong>高阶函数</strong></li></ul>
<p>定义：函数必须是一等函数，且函数的参数中至少存在一个数参数为函数或者该函数的返回值是一个函数。</p>
<p>特点：扩展性好，灵活多变；</p>
<p>1）函数参数的高阶函数：<br>注意：每个函数参数都必须要确定它在函数中的作用和功能；<br>demo：<br>[{a:1，b:‘today’},{a:2，b:‘tomorrow’}]最大值所对应的元素；</p>
<p><span class="img-wrap"><img data-src="/img/bV0rFF?w=1104&amp;h=358" src="https://static.alili.tech/img/bV0rFF?w=1104&amp;h=358" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>2)闭包的高阶函数<br>注意：通过获取外层函数的自由变量，从而定义闭包函数的行为和作动；</p>
<p><span class="img-wrap"><img data-src="/img/bV0rGz?w=834&amp;h=590" src="https://static.alili.tech/img/bV0rGz?w=834&amp;h=590" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<ul><li><strong>函数柯里化</strong></li></ul>
<p>定义：将一个接受多个参数只调用一次的函数，转变成接受一部分参数且多次调用的函数<br>形式：f(a1,a2,a3,...an) 等效于fn(a1,a2)(a3,...)....(an)<br>特点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="每执行一个逻辑参数都会返回一个函数，知道最后一个参数调用完，参数才会执行完。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>每执行一个逻辑参数都会返回一个函数，知道最后一个参数调用完，参数才会执行完。
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0rHH?w=580&amp;h=490" src="https://static.alili.tech/img/bV0rHH?w=580&amp;h=490" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li><strong>函数的纯度</strong></li></ul>
<p>纯函数：一个函数的输入，输出的值都是确定且有相同的结构，且函数内部不存在不确定的因素的函数。<br>优点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1)便于单独测试；
2）输入输出的值结构固定，不易报错且可预测；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>)便于单独测试；
<span class="hljs-number">2</span>）输入输出的值结构固定，不易报错且可预测；</code></pre>
<p>缺点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="由于结构固定，所以失去了js函数的灵活性和动态性；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs x86asm"><code style="word-break: break-word; white-space: initial;">由于结构固定，所以失去了<span class="hljs-keyword">js</span>函数的灵活性和动态性；</code></pre>
<p>demo：</p>
<p><span class="img-wrap"><img data-src="/img/bV0rIM?w=588&amp;h=296" src="https://static.alili.tech/img/bV0rIM?w=588&amp;h=296" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>redux中的reducer就是一个纯函数形式；</p>
<p>不纯函数：函数内部具有不确定的因素存在，常见的因素有Math.random，异步操作，输入输出不确定或者结构不相同等；</p>
<p>优点：动态性比较好，灵活（开发中经常出现）<br>缺点：不便于预测返回的结果；</p>
<p>分离函数纯度：<br>因为在日常的开发中，不纯函数经常出现，主要是因为它不像纯函数那样处处受限制，相对灵活；然而正因为比较灵活，使得函数不好控制，处理不好就经常出现错误；所以可以在不纯函数中分离函数纯度；<br>定义:将不纯函数中纯洁部分和不纯部分分开处理；<br>做法：将纯洁部分封装在一个内部函数中，该内部函数就成为不纯函数的一个私有属性；<br>demo：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const A = () => {
    const B = (a) => {
       return a + 1;
    }
    return Math.random + B();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> A = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> B = <span class="hljs-function">(<span class="hljs-params">a</span>) =&gt;</span> {
       <span class="hljs-keyword">return</span> a + <span class="hljs-number">1</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.random + B();
}</code></pre>
<p>函数式编程具有一定的优雅性和艺术性，很多优秀的前端框架都包含着大量的具有函数式编程   的思想。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript的函数式编程介绍

## 原文链接
[https://segmentfault.com/a/1190000012460646](https://segmentfault.com/a/1190000012460646)

