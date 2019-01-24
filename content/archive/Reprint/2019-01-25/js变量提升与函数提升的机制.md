---
title: 'js变量提升与函数提升的机制' 
date: 2019-01-25 2:30:23
hidden: true
slug: 75qxzac296q
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">问题</h2>
<p><span class="img-wrap"><img data-src="/img/bVJ614?w=222&amp;h=165" src="https://static.alili.tech/img/bVJ614?w=222&amp;h=165" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在这个例子中它应该输出什么？输出的结果是6。</p>
<p><span class="img-wrap"><img data-src="/img/bVJ62a?w=198&amp;h=157" src="https://static.alili.tech/img/bVJ62a?w=198&amp;h=157" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这个例子中它又该输出什么？输出的结果是a()，也就是输出了函数指针a。</p>
<p>这虽然是个变量和函数提升的问题，但是这两者到底是怎么提升的？</p>
<h2 id="articleHeader1">js是怎么创建变量的</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a=1;
var b=2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var a</span>=1;
<span class="hljs-attribute">var b</span>=2;</code></pre>
<p>这是不是声明了变量就立马接着给声明的变量赋值了？</p>
<p>js解析这个代码时，它实际上是按照如下方式解析的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a;
var b;
a=1;
b=2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>var a<span class="hljs-comment">;</span>
var b<span class="hljs-comment">;</span>
<span class="hljs-attribute">a</span>=<span class="hljs-number">1</span><span class="hljs-comment">;</span>
<span class="hljs-attribute">b</span>=<span class="hljs-number">2</span><span class="hljs-comment">;</span></code></pre>
<p>也就是js会先把所有变量都声明好了之后，然后才进行赋值，并不是声明一个变量就赋值，再声明一个再赋值。js所谓变量提升，提升就是为了事先声明变量。</p>
<p><span class="img-wrap"><img data-src="/img/bVJ63a?w=556&amp;h=204" src="https://static.alili.tech/img/bVJ63a?w=556&amp;h=204" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>上图中左边的例子，js解析时候是按照按照右边的代码解析的。js会把所有变量都集中提升到作用域顶部事先声明好，但是它赋值就就并不是像变量声明那样集中着一个个挨着赋值。原本书写赋值时写在哪里，那么js解析运行到那一行之后才会进行赋值，还没有运行到的就不会事先赋值。也就是变量会事先声明，但是变量不会事先赋值。</p>
<h2 id="articleHeader2">函数和变量都提升时，谁提到前面谁提到后面</h2>
<p>在作用域中，不管变量和函数写在什么位置，所有变量会被整体提升到作用域顶部，所有函数也会被整体提升到作用域顶部，但是函数整体在变量整体的后面。</p>
<p><span class="img-wrap"><img data-src="/img/bVJ7jS?w=562&amp;h=598" src="https://static.alili.tech/img/bVJ7jS?w=562&amp;h=598" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>从这个例子中可以看到，变量和函数都整体提升后，函数整体在变量的后面。变量提升之后，但其赋值还是留在原本的位置等js运行到了之后动态赋值，而函数提升之后直接相当于在代码里抽空了。</p>
<p><span class="img-wrap"><img data-src="/img/bVJ7jt?w=706&amp;h=493" src="https://static.alili.tech/img/bVJ7jt?w=706&amp;h=493" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在这个更复杂一点的例子中，变量和函数提升后，js实际上就把它转变为了右边的代码在运行。</p>
<p>搞明白这个例子也就搞懂了作用域中变量和函数是怎么提升的。</p>
<h2 id="articleHeader3">结语</h2>
<p>回到开头的两个问题</p>
<p><span class="img-wrap"><img data-src="/img/bVJ7jN?w=629&amp;h=463" src="https://static.alili.tech/img/bVJ7jN?w=629&amp;h=463" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>它们各自被js转换后如上</p>
<p><span class="img-wrap"><img data-src="/img/bVJ7jy?w=241&amp;h=167" src="https://static.alili.tech/img/bVJ7jy?w=241&amp;h=167" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>一个思考题，这个例子该输出什么？</p>
<p>“提升”的本质就是为了事先声明变量和函数，当然函数只有声明式函数才会被提升，字面量函数不会被提升。这种提升就是存在于作用域中，包括全局作用域、函数作用域（闭包形成的作用域也是个函数作用域），总之都是在作用域中声明变量和函数时，会提升到作用域顶部，进行事先声明。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js变量提升与函数提升的机制

## 原文链接
[https://segmentfault.com/a/1190000008568071](https://segmentfault.com/a/1190000008568071)

