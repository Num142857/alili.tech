---
title: 'Javascript 中 Y 组合子的推导' 
date: 2019-01-27 2:31:00
hidden: true
slug: 13j072ppoyf
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>Y 组合子是 lambda 演算中的一个概念，是任意函数的不动点，在函数式编程中主要作用是 <strong>提供一种匿名函数的递归方式</strong>。</p></blockquote>
<p>Y 组合子如下：</p>
<p><span class="MathJax_Preview"></span><div class="MathJax_Display" style="text-align: center;"><span class="MathJax" id="MathJax-Element-1-Frame" tabindex="0" style=""><nobr><span class="math" id="MathJax-Span-1" role="math" style="width: 11.283em; display: inline-block;"><span style="display: inline-block; position: relative; width: 9.311em; height: 0px; font-size: 121%;"><span style="position: absolute; clip: rect(1.631em, 1009.26em, 2.852em, -1000em); top: -2.479em; left: 0em;"><span class="mrow" id="MathJax-Span-2"><span class="texatom" id="MathJax-Span-3"><span class="mrow" id="MathJax-Span-4"><span class="mo" id="MathJax-Span-5" style="font-family: STIXGeneral-Regular;">λ</span></span></span><span class="mi" id="MathJax-Span-6" style="font-family: STIXGeneral-Italic;">f<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.146em;"></span></span><span class="mo" id="MathJax-Span-7" style="font-family: STIXGeneral-Regular;">.</span><span class="mo" id="MathJax-Span-8" style="font-family: STIXGeneral-Regular; padding-left: 0.188em;">(</span><span class="texatom" id="MathJax-Span-9"><span class="mrow" id="MathJax-Span-10"><span class="mo" id="MathJax-Span-11" style="font-family: STIXGeneral-Regular;">λ</span></span></span><span class="mi" id="MathJax-Span-12" style="font-family: STIXGeneral-Italic;">x<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.003em;"></span></span><span class="mo" id="MathJax-Span-13" style="font-family: STIXGeneral-Regular;">.</span><span class="mi" id="MathJax-Span-14" style="font-family: STIXGeneral-Italic; padding-left: 0.188em;">f<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.146em;"></span></span><span class="mo" id="MathJax-Span-15" style="font-family: STIXGeneral-Regular;">(</span><span class="mi" id="MathJax-Span-16" style="font-family: STIXGeneral-Italic;">x<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.003em;"></span></span><span class="mi" id="MathJax-Span-17" style="font-family: STIXGeneral-Italic;">x<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.003em;"></span></span><span class="mo" id="MathJax-Span-18" style="font-family: STIXGeneral-Regular;">)</span><span class="mo" id="MathJax-Span-19" style="font-family: STIXGeneral-Regular;">)</span><span class="mo" id="MathJax-Span-20" style="font-family: STIXGeneral-Regular;">(</span><span class="texatom" id="MathJax-Span-21"><span class="mrow" id="MathJax-Span-22"><span class="mo" id="MathJax-Span-23" style="font-family: STIXGeneral-Regular;">λ</span></span></span><span class="mi" id="MathJax-Span-24" style="font-family: STIXGeneral-Italic;">x<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.003em;"></span></span><span class="mo" id="MathJax-Span-25" style="font-family: STIXGeneral-Regular;">.</span><span class="mi" id="MathJax-Span-26" style="font-family: STIXGeneral-Italic; padding-left: 0.188em;">f<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.146em;"></span></span><span class="mo" id="MathJax-Span-27" style="font-family: STIXGeneral-Regular;">(</span><span class="mi" id="MathJax-Span-28" style="font-family: STIXGeneral-Italic;">x<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.003em;"></span></span><span class="mi" id="MathJax-Span-29" style="font-family: STIXGeneral-Italic;">x<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.003em;"></span></span><span class="mo" id="MathJax-Span-30" style="font-family: STIXGeneral-Regular;">)</span><span class="mo" id="MathJax-Span-31" style="font-family: STIXGeneral-Regular;">)</span></span><span style="display: inline-block; width: 0px; height: 2.479em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -0.317em; border-left: 0px solid; width: 0px; height: 1.21em;"></span></span></nobr></span></div><script type="math/tex; mode=display" id="MathJax-Element-1"> λf.(λx.f(x x))(λx.f(x x)) </script></p>
<p>本文将尽量通俗易懂的以 <strong>实现匿名函数递归</strong> 为导向，推导出这一式子。</p>
<h2 id="articleHeader0">一、简介</h2>
<h3 id="articleHeader1">1. lambda 表达式简介</h3>
<blockquote><p>这部分通过 js 函数介绍 lambda 表达式，如果已经了解 <a href="https://en.wikipedia.org/wiki/Lambda_calculus" rel="nofollow noreferrer" target="_blank">lambda 演算</a> 可以跳过这一部分。</p></blockquote>
<p>了解一个新领域的最好方法是用已有知识进行类比。<br>我们可以把每一个 lambda 表达式解释为一个 js 函数：</p>
<ul>
<li><p>"λ" 字符可以看作 function 声明，"."字符前为参数列表，"."字符后为函数体。</p></li>
<li><p>lambda 表达式不能被命名（赋值给变量），这也是为什么lambda演算需要引入 Y组合子的原因。</p></li>
<li><p>lambda 表达式只允许定义一个参数。</p></li>
</ul>
<table>
<thead><tr>
<th align="right">使用</th>
<th>lamda 表达式</th>
<th>javascript 箭头函数</th>
<th>javascript 函数表达式</th>
</tr></thead>
<tbody>
<tr>
<td align="right">函数</td>
<td><code>λx.x+1</code></td>
<td><code>x=&gt;x+1;</code></td>
<td><code>(function(x){return x+1;});</code></td>
</tr>
<tr>
<td align="right">函数调用</td>
<td><code>(λx.x+1)4</code></td>
<td><code>(x=&gt;x+1)(4);</code></td>
<td><code>(function(x){return x+1;})(4);</code></td>
</tr>
</tbody>
</table>
<h2 id="articleHeader2">2. 组合子与不动点</h2>
<p>组合子对照 js 可以理解为：<strong>函数体内，没有使用外部变量</strong>。</p>
<p>不动点是函数的一个特征：<strong>对于函数 <span class="MathJax_Preview"></span><span class="MathJax" id="MathJax-Element-2-Frame" tabindex="0" style=""><nobr><span class="math" id="MathJax-Span-32" role="math" style="width: 1.95em; display: inline-block;"><span style="display: inline-block; position: relative; width: 1.559em; height: 0px; font-size: 124%;"><span style="position: absolute; clip: rect(1.688em, 1001.51em, 2.895em, -1000em); top: -2.527em; left: 0em;"><span class="mrow" id="MathJax-Span-33"><span class="mi" id="MathJax-Span-34" style="font-family: STIXGeneral-Italic;">f<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.146em;"></span></span><span class="mo" id="MathJax-Span-35" style="font-family: STIXGeneral-Regular;">(</span><span class="mi" id="MathJax-Span-36" style="font-family: STIXGeneral-Italic;">x<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.003em;"></span></span><span class="mo" id="MathJax-Span-37" style="font-family: STIXGeneral-Regular;">)</span></span><span style="display: inline-block; width: 0px; height: 2.527em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -0.323em; border-left: 0px solid; width: 0px; height: 1.231em;"></span></span></nobr></span><script type="math/tex" id="MathJax-Element-2">f(x)</script>，如果有变量 &nbsp;<span class="MathJax_Preview"></span><span class="MathJax" id="MathJax-Element-3-Frame" tabindex="0" style=""><nobr><span class="math" id="MathJax-Span-38" role="math" style="width: 0.617em; display: inline-block;"><span style="display: inline-block; position: relative; width: 0.484em; height: 0px; font-size: 124%;"><span style="position: absolute; clip: rect(1.925em, 1000.46em, 2.699em, -1000em); top: -2.527em; left: 0em;"><span class="mrow" id="MathJax-Span-39"><span class="mi" id="MathJax-Span-40" style="font-family: STIXGeneral-Italic;">a</span></span><span style="display: inline-block; width: 0px; height: 2.527em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -0.08em; border-left: 0px solid; width: 0px; height: 0.694em;"></span></span></nobr></span><script type="math/tex" id="MathJax-Element-3">a</script> 使得&nbsp;&nbsp;<span class="MathJax_Preview"></span><span class="MathJax" id="MathJax-Element-4-Frame" tabindex="0" style=""><nobr><span class="math" id="MathJax-Span-41" role="math" style="width: 4.15em; display: inline-block;"><span style="display: inline-block; position: relative; width: 3.333em; height: 0px; font-size: 124%;"><span style="position: absolute; clip: rect(1.688em, 1003.31em, 2.895em, -1000em); top: -2.527em; left: 0em;"><span class="mrow" id="MathJax-Span-42"><span class="mi" id="MathJax-Span-43" style="font-family: STIXGeneral-Italic;">f<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.146em;"></span></span><span class="mo" id="MathJax-Span-44" style="font-family: STIXGeneral-Regular;">(</span><span class="mi" id="MathJax-Span-45" style="font-family: STIXGeneral-Italic;">a</span><span class="mo" id="MathJax-Span-46" style="font-family: STIXGeneral-Regular;">)</span><span class="mo" id="MathJax-Span-47" style="font-family: STIXGeneral-Regular; padding-left: 0.313em;">=</span><span class="mi" id="MathJax-Span-48" style="font-family: STIXGeneral-Italic; padding-left: 0.313em;">a</span></span><span style="display: inline-block; width: 0px; height: 2.527em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -0.323em; border-left: 0px solid; width: 0px; height: 1.231em;"></span></span></nobr></span><script type="math/tex" id="MathJax-Element-4">f(a)=a</script> 成立，则称 <span class="MathJax_Preview"></span><span class="MathJax" id="MathJax-Element-5-Frame" tabindex="0" style=""><nobr><span class="math" id="MathJax-Span-49" role="math" style="width: 0.617em; display: inline-block;"><span style="display: inline-block; position: relative; width: 0.484em; height: 0px; font-size: 124%;"><span style="position: absolute; clip: rect(1.925em, 1000.46em, 2.699em, -1000em); top: -2.527em; left: 0em;"><span class="mrow" id="MathJax-Span-50"><span class="mi" id="MathJax-Span-51" style="font-family: STIXGeneral-Italic;">a</span></span><span style="display: inline-block; width: 0px; height: 2.527em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -0.08em; border-left: 0px solid; width: 0px; height: 0.694em;"></span></span></nobr></span><script type="math/tex" id="MathJax-Element-5">a</script> 是函数 <span class="MathJax_Preview"></span><span class="MathJax" id="MathJax-Element-6-Frame" tabindex="0" style=""><nobr><span class="math" id="MathJax-Span-52" role="math" style="width: 0.55em; display: inline-block;"><span style="display: inline-block; position: relative; width: 0.43em; height: 0px; font-size: 124%;"><span style="position: absolute; clip: rect(1.688em, 1000.43em, 2.895em, -1000em); top: -2.527em; left: 0em;"><span class="mrow" id="MathJax-Span-53"><span class="mi" id="MathJax-Span-54" style="font-family: STIXGeneral-Italic;">f<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.146em;"></span></span></span><span style="display: inline-block; width: 0px; height: 2.527em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -0.323em; border-left: 0px solid; width: 0px; height: 1.231em;"></span></span></nobr></span><script type="math/tex" id="MathJax-Element-6">f</script> 上的一个不动点</strong>。</p>
<h2 id="articleHeader3">二、递归</h2>
<h3 id="articleHeader4">1. 普通的递归</h3>
<p>递归就是函数不断调用自身</p>
<p>一个最基本的调用自身的函数是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var f = () => f();
f();
//> f()
//> f()
//> ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> f();
f();
<span class="hljs-comment">//&gt; f()</span>
<span class="hljs-comment">//&gt; f()</span>
<span class="hljs-comment">//&gt; ...</span></code></pre>
<p>但这个函数仅仅是不断的调用自身，什么也没做。</p>
<p>一个正常的递归函数应该有一个状态，每次调用不断的递进状态，最终可以通过判断状态结束递归：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var f = p => judge(p) ? f(step(p)) : value;

// 再加上“计算”的步骤，这样这个函数才有价值：

var f = p => judge(p) ? calc(f(step(p)),p) : value;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-params">p</span> =&gt;</span> judge(p) ? f(step(p)) : value;

<span class="hljs-comment">// 再加上“计算”的步骤，这样这个函数才有价值：</span>

<span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-params">p</span> =&gt;</span> judge(p) ? calc(f(step(p)),p) : value;</code></pre>
<p>一个具体的例子，计算阶乘的函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var factorial = n => n ? factorial(n-1)*n : 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">var</span> factorial = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> n ? factorial(n<span class="hljs-number">-1</span>)*n : <span class="hljs-number">1</span>;</code></pre>
<p>调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="factorial(4);
//=> 24" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">factorial(<span class="hljs-number">4</span>);
<span class="hljs-comment">//=&gt; 24</span></code></pre>
<h3 id="articleHeader5">2. 让匿名函数递归</h3>
<p>由于不能给函数命名，我们需要把函数作为参数传入一个高阶函数。这样，在高阶函数中，就可以使用 <strong>参数名</strong> 来引用函数，相当于变相地给函数命了名。</p>
<p>构造一个高阶函数<code>invokeWithSelf</code>，它接受一个函数作为参数，并让这个函数将自身作为参数调用其自身：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var invokeWithSelf = f => f(f);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> invokeWithSelf = <span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> f(f);</code></pre>
<p>当这个函数传入自身作为参数时</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="invokeWithSelf(invokeWithSelf);
//> (f=>f(f))(f=>f(f));
//> (f=>f(f))(f=>f(f));
//> ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">invokeWithSelf(invokeWithSelf);
<span class="hljs-comment">//&gt; (f=&gt;f(f))(f=&gt;f(f));</span>
<span class="hljs-comment">//&gt; (f=&gt;f(f))(f=&gt;f(f));</span>
<span class="hljs-comment">//&gt; ...</span></code></pre>
<p>我们得到了一个匿名的无限递归函数，仿照上一节，我们可以把这个函数改造成可以使用的递归函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//首先需要有一个参数来保存递归状态
var func = f => p => f(f)(p);

//加上状态改变和判断
var func = f => p => judge(p) ? f(f)(step(p)) : value;

//增加计算
var func = f => p => judge(p) ? calc(f(f)(step(p)),p) : value;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//首先需要有一个参数来保存递归状态</span>
<span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> p =&gt; f(f)(p);

<span class="hljs-comment">//加上状态改变和判断</span>
<span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> p =&gt; judge(p) ? f(f)(step(p)) : value;

<span class="hljs-comment">//增加计算</span>
<span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> p =&gt; judge(p) ? calc(f(f)(step(p)),p) : value;</code></pre>
<p>具体例子，计算阶乘的函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var func = f => n => n ? f(f)(n-1)*n : 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> n =&gt; n ? f(f)(n<span class="hljs-number">-1</span>)*n : <span class="hljs-number">1</span>;</code></pre>
<p>调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="func(func)(4);
//> 24" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">func(func)(<span class="hljs-number">4</span>);
<span class="hljs-comment">//&gt; 24</span></code></pre>
<p>匿名调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(f => n => n ? f(f)(n-1)*n : 1)(f => n => n ? f(f)(n-1)*n : 1)(4);
//> 24" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> n =&gt; n ? f(f)(n<span class="hljs-number">-1</span>)*n : <span class="hljs-number">1</span>)(<span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> n =&gt; n ? f(f)(n<span class="hljs-number">-1</span>)*n : <span class="hljs-number">1</span>)(<span class="hljs-number">4</span>);
<span class="hljs-comment">//&gt; 24</span></code></pre>
<p>现在我们得到了一个匿名的递归函数，不过它只能用来计算阶乘。为了将其通用，我们希望将 <strong>函数的具体计算方式</strong>与其<strong>递归的形式</strong>剥离开来。</p>
<h2 id="articleHeader6">三、推导</h2>
<h3 id="articleHeader7">1. 解耦递归逻辑与计算逻辑，得到 javascript 中的 Y 组合子</h3>
<p>对于刚才的函数<code>func</code>，我们尝试一步步将它分解成 <strong>计算逻辑</strong> 和 <strong>递归逻辑</strong> 两部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var func = (f => n => n ? f(f)(n-1)*n : 1)(f => n => n ? f(f)(n-1)*n : 1);

//调用：
func(4);
//> 24" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> func = (<span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> n =&gt; n ? f(f)(n<span class="hljs-number">-1</span>)*n : <span class="hljs-number">1</span>)(<span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> n =&gt; n ? f(f)(n<span class="hljs-number">-1</span>)*n : <span class="hljs-number">1</span>);

<span class="hljs-comment">//调用：</span>
func(<span class="hljs-number">4</span>);
<span class="hljs-comment">//&gt; 24</span></code></pre>
<p>开始化简 <code>func</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var func = n => {
    return (f => n => n ? f(f)(n-1)*n : 1)(f => n => n ? f(f)(n-1)*n : 1);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> (<span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> n =&gt; n ? f(f)(n<span class="hljs-number">-1</span>)*n : <span class="hljs-number">1</span>)(<span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> n =&gt; n ? f(f)(n<span class="hljs-number">-1</span>)*n : <span class="hljs-number">1</span>);
}</code></pre>
<p>提取重复形式 <code>f =&gt; n =&gt; n ? f(f)(n-1)*n : 1</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var func = n => {
    var fa = f => n => n ? f(f)(n-1)*n : 1;
    return fa(fa);
};

//改写形式
var func = n => {
    var fa = f => {
        return n => n ? f(f)(n-1)*n : 1;
    };
    return fa(fa);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> {
    <span class="hljs-keyword">var</span> fa = <span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> n =&gt; n ? f(f)(n<span class="hljs-number">-1</span>)*n : <span class="hljs-number">1</span>;
    <span class="hljs-keyword">return</span> fa(fa);
};

<span class="hljs-comment">//改写形式</span>
<span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> {
    <span class="hljs-keyword">var</span> fa = <span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> n ? f(f)(n<span class="hljs-number">-1</span>)*n : <span class="hljs-number">1</span>;
    };
    <span class="hljs-keyword">return</span> fa(fa);
};</code></pre>
<p>可以看出，其主要递归逻辑来自 <code>f(f)</code>, 我们将这一部分解耦：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var func = n => {
    var fa = f => {
        var fb = n => f(f)(n);
        return n => n ? fb(n-1)*n : 1;
    };
    return fa(fa);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> {
    <span class="hljs-keyword">var</span> fa = <span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> {
        <span class="hljs-keyword">var</span> fb = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> f(f)(n);
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> n ? fb(n<span class="hljs-number">-1</span>)*n : <span class="hljs-number">1</span>;
    };
    <span class="hljs-keyword">return</span> fa(fa);
};</code></pre>
<p>可以看到 返回值 不再需要 <code>fc</code> 接收的参数 <code>f</code>, 将返回值表达式具名, 以便提取出 <code>fc</code>, 分离逻辑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var func = n => {
    var fa = f => {
        var fb = n => f(f)(n);
        var fc = n => n ? fb(n-1)*n : 1;
        return fc;
    };
    return fa(fa);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> {
    <span class="hljs-keyword">var</span> fa = <span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> {
        <span class="hljs-keyword">var</span> fb = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> f(f)(n);
        <span class="hljs-keyword">var</span> fc = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> n ? fb(n<span class="hljs-number">-1</span>)*n : <span class="hljs-number">1</span>;
        <span class="hljs-keyword">return</span> fc;
    };
    <span class="hljs-keyword">return</span> fa(fa);
};</code></pre>
<p><code>fc</code> 还在依赖 <code>fb</code>, 将 <code>fb</code> 作为参数传入 <code>fc</code>, 解除 <code>fc</code> 对 <code>fb</code> 的依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var func = n => {
    var fa = f => {
        var fb = n => f(f)(n);
        var fc = fb => n => n ? fb(n-1)*n : 1;
        return fc(fb);
    };
    return fa(fa);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> {
    <span class="hljs-keyword">var</span> fa = <span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> {
        <span class="hljs-keyword">var</span> fb = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> f(f)(n);
        <span class="hljs-keyword">var</span> fc = <span class="hljs-function"><span class="hljs-params">fb</span> =&gt;</span> n =&gt; n ? fb(n<span class="hljs-number">-1</span>)*n : <span class="hljs-number">1</span>;
        <span class="hljs-keyword">return</span> fc(fb);
    };
    <span class="hljs-keyword">return</span> fa(fa);
};</code></pre>
<p>可以发现 <code>fc</code> 是计算逻辑部分，将 <code>fc</code> 提取出 <code>fa</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var func = n => {
    var fa = fc => f => {
        var fb = n => f(f)(n);
        return fc(fb);
    };
    var fc = fb => n => n ? fb(n-1)*n : 1;
    return fa(fc)(fa(fc));
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> {
    <span class="hljs-keyword">var</span> fa = <span class="hljs-function"><span class="hljs-params">fc</span> =&gt;</span> f =&gt; {
        <span class="hljs-keyword">var</span> fb = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> f(f)(n);
        <span class="hljs-keyword">return</span> fc(fb);
    };
    <span class="hljs-keyword">var</span> fc = <span class="hljs-function"><span class="hljs-params">fb</span> =&gt;</span> n =&gt; n ? fb(n<span class="hljs-number">-1</span>)*n : <span class="hljs-number">1</span>;
    <span class="hljs-keyword">return</span> fa(fc)(fa(fc));
};</code></pre>
<p>构造一个函数 <code>fd</code>, 化简返回值的形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var func = n => {
    var fa = fc => f => {
        var fb = n => f(f)(n);
        return fc(fb);
    };
    var fc = fb => n => n ? fb(n-1)*n : 1;
    var fd = fa => fc => {
        return fa(fc)(fa(fc));
    }
    return fd(fa)(fc);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> {
    <span class="hljs-keyword">var</span> fa = <span class="hljs-function"><span class="hljs-params">fc</span> =&gt;</span> f =&gt; {
        <span class="hljs-keyword">var</span> fb = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> f(f)(n);
        <span class="hljs-keyword">return</span> fc(fb);
    };
    <span class="hljs-keyword">var</span> fc = <span class="hljs-function"><span class="hljs-params">fb</span> =&gt;</span> n =&gt; n ? fb(n<span class="hljs-number">-1</span>)*n : <span class="hljs-number">1</span>;
    <span class="hljs-keyword">var</span> fd = <span class="hljs-function"><span class="hljs-params">fa</span> =&gt;</span> fc =&gt; {
        <span class="hljs-keyword">return</span> fa(fc)(fa(fc));
    }
    <span class="hljs-keyword">return</span> fd(fa)(fc);
};</code></pre>
<p>将 <code>fa</code> 带入 <code>fd</code>, 得到递归逻辑部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var func = n => {
    var fc = fb => n => n ? fb(n-1)*n : 1;
    var fd = fc => {
        var fa = fc => f => {
            var fb = n => f(f)(n);
            return fc(fb);
        };
        return fa(fc)(fa(fc));
    }
    return fd(fc);
};

//化简fd
var func = n => {
    var fc = fb => n => n ? fb(n-1)*n : 1;
    var fd = fc => {
        var fa = f => {
            var fb = n => f(f)(n);
            return fc(fb);
        };
        return fa(fa);
    }
    return fd(fc);
};

//化简fd
var func = n => {
    var fc = fb => n => n ? fb(n-1)*n : 1;
    var fd = fc => (f => fc(n => f(f)(n)))(f => fc(n => f(f)(n)));
    return fd(fc);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> {
    <span class="hljs-keyword">var</span> fc = <span class="hljs-function"><span class="hljs-params">fb</span> =&gt;</span> n =&gt; n ? fb(n<span class="hljs-number">-1</span>)*n : <span class="hljs-number">1</span>;
    <span class="hljs-keyword">var</span> fd = <span class="hljs-function"><span class="hljs-params">fc</span> =&gt;</span> {
        <span class="hljs-keyword">var</span> fa = <span class="hljs-function"><span class="hljs-params">fc</span> =&gt;</span> f =&gt; {
            <span class="hljs-keyword">var</span> fb = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> f(f)(n);
            <span class="hljs-keyword">return</span> fc(fb);
        };
        <span class="hljs-keyword">return</span> fa(fc)(fa(fc));
    }
    <span class="hljs-keyword">return</span> fd(fc);
};

<span class="hljs-comment">//化简fd</span>
<span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> {
    <span class="hljs-keyword">var</span> fc = <span class="hljs-function"><span class="hljs-params">fb</span> =&gt;</span> n =&gt; n ? fb(n<span class="hljs-number">-1</span>)*n : <span class="hljs-number">1</span>;
    <span class="hljs-keyword">var</span> fd = <span class="hljs-function"><span class="hljs-params">fc</span> =&gt;</span> {
        <span class="hljs-keyword">var</span> fa = <span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> {
            <span class="hljs-keyword">var</span> fb = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> f(f)(n);
            <span class="hljs-keyword">return</span> fc(fb);
        };
        <span class="hljs-keyword">return</span> fa(fa);
    }
    <span class="hljs-keyword">return</span> fd(fc);
};

<span class="hljs-comment">//化简fd</span>
<span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> {
    <span class="hljs-keyword">var</span> fc = <span class="hljs-function"><span class="hljs-params">fb</span> =&gt;</span> n =&gt; n ? fb(n<span class="hljs-number">-1</span>)*n : <span class="hljs-number">1</span>;
    <span class="hljs-keyword">var</span> fd = <span class="hljs-function"><span class="hljs-params">fc</span> =&gt;</span> (<span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> fc(<span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> f(f)(n)))(<span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> fc(<span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> f(f)(n)));
    <span class="hljs-keyword">return</span> fd(fc);
};</code></pre>
<p>可以看到，两部分逻辑已经分离，可以得到 javascript 中的 Y 组合子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fn = fc;
var Y = fd;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fn = fc;
<span class="hljs-keyword">var</span> Y = fd;</code></pre>
<p>将参数名替换一下，得到 Y 组合子与计算逻辑 <code>fn</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fn = f => n => n ? f(n-1)*n : 1;
var Y = y => (x => y(n => x(x)(n)))(x => y(n => x(x)(n)));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fn = <span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> n =&gt; n ? f(n<span class="hljs-number">-1</span>)*n : <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> Y = <span class="hljs-function"><span class="hljs-params">y</span> =&gt;</span> (<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> y(<span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> x(x)(n)))(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> y(<span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> x(x)(n)));</code></pre>
<p>调用测试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Y(fn)(4);
//> 24" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Y(fn)(<span class="hljs-number">4</span>);
<span class="hljs-comment">//&gt; 24</span></code></pre>
<h3 id="articleHeader8">2. Y组合子与惰性求值</h3>
<p>你可能注意到，刚才推导出的 Y 组合子形式与 其 λ 表达式的等价形式不一致</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*λ 表达式的等价形式*/
Y = y => (x => y(x(x)))(x => y(x(x)));

/*推导出的形式*/
Y = y => (x => y(n => x(x)(n)))(x => y(n => x(x)(n)));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*λ 表达式的等价形式*/</span>
Y = <span class="hljs-function"><span class="hljs-params">y</span> =&gt;</span> (<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> y(x(x)))(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> y(x(x)));

<span class="hljs-comment">/*推导出的形式*/</span>
Y = <span class="hljs-function"><span class="hljs-params">y</span> =&gt;</span> (<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> y(<span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> x(x)(n)))(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> y(<span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> x(x)(n)));</code></pre>
<p>对比不难发现 <code>n =&gt; x(x)(n)</code> 应化为 <code>x(x)</code>，并且尝试直接使用等价形式时会发生爆栈</p>
<p>我们知道，上面的两种形式几乎是等价的，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var print = str => console.log(str);

// 在一个参数的情况下，等价于：
var print = console.log;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> print = <span class="hljs-function"><span class="hljs-params">str</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(str);

<span class="hljs-comment">// 在一个参数的情况下，等价于：</span>
<span class="hljs-keyword">var</span> print = <span class="hljs-built_in">console</span>.log;</code></pre>
<p>但当它们作为函数参数时，其实有着略微不同：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//接收一个函数，但不使用它
var y = xn => {
    console.log(&quot;run y&quot;);
    return false ? xn(1) : 0;
};

//接收任意一个参数，返回一个函数
var x = n => {
    console.log(&quot;run x&quot;);
    return n1 => n1;
};

//调用，将参数直接传入
y(x(1));
//> &quot;run x&quot;
//> &quot;run y&quot;

//调用，将参数包裹在匿名函数中传入
y((n1)=>x(1)(n1));
//> &quot;run y&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//接收一个函数，但不使用它</span>
<span class="hljs-keyword">var</span> y = <span class="hljs-function"><span class="hljs-params">xn</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"run y"</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span> ? xn(<span class="hljs-number">1</span>) : <span class="hljs-number">0</span>;
};

<span class="hljs-comment">//接收任意一个参数，返回一个函数</span>
<span class="hljs-keyword">var</span> x = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"run x"</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">n1</span> =&gt;</span> n1;
};

<span class="hljs-comment">//调用，将参数直接传入</span>
y(x(<span class="hljs-number">1</span>));
<span class="hljs-comment">//&gt; "run x"</span>
<span class="hljs-comment">//&gt; "run y"</span>

<span class="hljs-comment">//调用，将参数包裹在匿名函数中传入</span>
y(<span class="hljs-function">(<span class="hljs-params">n1</span>)=&gt;</span>x(<span class="hljs-number">1</span>)(n1));
<span class="hljs-comment">//&gt; "run y"</span></code></pre>
<p>可以看到，在 <code>y(x(1))</code> 的过程中，根本没有用到参数 <code>x(1)</code> 的值，但程序不在乎这一点，首先求出了 <code>x(1)</code> 的值；  <br>第二个表达式中参数 <code>x(1)</code> 被“包裹”在一个匿名函数中，并没有运行。</p>
<blockquote>
<p>对于函数参数的求值策略，不同的语言不相同：</p>
<ul>
<li><p>在函数调用时，立即求值，称作“严格求值”(<a href="https://en.wikipedia.org/wiki/Eager_evaluation" rel="nofollow noreferrer" target="_blank">Eager evaluation</a>), js / c++ / c# 均使用严格求值</p></li>
<li><p>在函数运行时动态地求值，称作“惰性求值”(<a href="https://en.wikipedia.org/wiki/Lazy_evaluation" rel="nofollow noreferrer" target="_blank">Lazy evaluation</a>), 以 Haskell 为代表的函数式编程语言默认使用</p></li>
</ul>
</blockquote>
<p>javascript 中使用的是严格求值，而 lambda 表达式中使用的是惰性求值。</p>
<p>若将 <code>n =&gt; x(x)(n)</code> 替换为 <code>x(x)</code>，将导致 Y 组合子中的 <code>x(x)</code> 作为 <code>y</code> 的参数被立即求值。  <br>由于右边部分中 <code>x(x)</code> 是一个无限递归的的式子，对它求值会使它不断地调用自身，最终导致堆栈溢出。</p>
<p>只进行左边部分的替换并不会导致无限调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Y = y => (x => y(n => x(x)(n)))(x => y(n => x(x)(n)));

//可化为
Y = y => (x => y(x(x))(x => y(n => x(x)(n)));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Y = <span class="hljs-function"><span class="hljs-params">y</span> =&gt;</span> (<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> y(<span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> x(x)(n)))(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> y(<span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> x(x)(n)));

<span class="hljs-comment">//可化为</span>
Y = <span class="hljs-function"><span class="hljs-params">y</span> =&gt;</span> (<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> y(x(x))(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> y(<span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> x(x)(n)));</code></pre>
<p>在计算这个式子时，会首先计算 参数 <code>y</code> 的值  <br>完成后在计算左边的 <code>x(x)</code> 之前、会计算左边部分中 <code>x</code> 参数的值  <br>而左边式子中 <code>x</code> 的值取决于右边部分的结果，右边返回值使左边的 <code>x(x)</code> 不再是无限递归。</p>
<h2 id="articleHeader9">四、总结</h2>
<p>函数式编程的方法感觉着实有点烧脑，还没怎么实操过。</p>
<p>不过 js 真是厉害，什么编程方法都能用...</p>
<p>一直希望能够找到一种符合人们思考方式（至少符合我自己）的编程方法，让程序变得自然、易读、易写。不断尝试中。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript 中 Y 组合子的推导

## 原文链接
[https://segmentfault.com/a/1190000008212076](https://segmentfault.com/a/1190000008212076)

