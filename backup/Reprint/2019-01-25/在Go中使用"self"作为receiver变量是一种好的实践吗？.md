---
title: '在Go中使用"self"作为receiver变量是一种好的实践吗？' 
date: 2019-01-25 2:30:23
hidden: true
slug: c6xx088rgej
categories: [reprint]
---

{{< raw >}}

            <p>原帖：<a href="https://stackoverflow.com/questions/23482068/in-go-is-naming-the-receiver-variable-self-misleading-or-good-practice/23494386#23494386">stackoverflow</a></p>
<h1>原问题</h1>
<p>我回忆了一下，没有任何博客或者视频的作者在Go中以<code>self</code>或<code>this</code>作为方法的receiver，但是在stack overflow的很多问题下面就经常能看见有人以<code>self</code>或<code>this</code>作为方法的receiver。这让我感到疑惑，用<code>self</code>作为receiver名有什么问题吗？</p>
<p>好像曾经在哪里看到过有人说receiver并不完全是一个指向自身的指针，谁能解释一下这种说法吗。把<code>self</code>看做指向自身的指针有什么问题吗？</p>
<p>例子：</p>
<pre><code class="hljs elm"><span class="hljs-keyword">type</span> <span class="hljs-type">MyStruct</span> struct {
  <span class="hljs-type">Name</span> string
}
</code></pre>
<p>那种方式比较合适呢，还是两种都ok？</p>
<pre><code class="hljs autoit"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(m *MyStruct)</span> <span class="hljs-title">MyMethod</span><span class="hljs-params">()</span> <span class="hljs-title">error</span> {</span>
  // <span class="hljs-keyword">do</span> something useful
}
</code></pre>
<p>or</p>
<pre><code class="hljs autoit"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(self *MyStruct)</span> <span class="hljs-title">MyMethod</span><span class="hljs-params">()</span> <span class="hljs-title">error</span> {</span>
  // <span class="hljs-keyword">do</span> something useful
}
</code></pre>
<h1>回答</h1>
<p>其他的人都说的很好了，我再补充几点重要的：</p>
<h2>以普通函数的方式调用Method Set里的方法</h2>
<p>在Go里，不但可以通过receiver的方式调用一个方法，还可以像一个普通的函数一样调用。在type的名称后跟上相应方法的名称并将receiver作为第一个参数传入（这种使用方式叫做使用<a href="https://golang.org/ref/spec#Method_expressions">method expression</a>）。</p>
<p>demo:</p>
<pre><code class="hljs go"><span class="hljs-keyword">package</span> main

<span class="hljs-keyword">import</span> <span class="hljs-string">"fmt"</span>

<span class="hljs-keyword">type</span> Foo <span class="hljs-keyword">int</span>

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(f Foo)</span> <span class="hljs-title">Bar</span><span class="hljs-params">()</span></span> {
    fmt.Printf(<span class="hljs-string">"My receiver is %v\n"</span>, f)
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">main</span><span class="hljs-params">()</span></span> {
    a := Foo(<span class="hljs-number">46</span>)
    a.Bar()
    b := Foo(<span class="hljs-number">51</span>)
    Foo.Bar(b)
}
</code></pre>
<p>运行结果：</p>
<pre><code class="hljs actionscript">My receiver <span class="hljs-keyword">is</span> <span class="hljs-number">46</span>
My receiver <span class="hljs-keyword">is</span> <span class="hljs-number">51</span>
</code></pre>
<p>可以看出来，你手动调用并赋予了执行的上下文环境，使得<code>self</code>失去了他的语义，与面向对象编程中广泛引用的一句话“调用一个对象的方法就是给这个对象传递信息”的概念没有一点联系。</p>
<p>总的来说，在Go里方法其实就是将函数语义化地绑定在指定type上，并接受一个叫做receiver的参数，不管你以哪种方式调用方法，调用过程其实都是一样的。与大多数主流语言不同，Go并没有将方法调用的细节隐藏起来。</p>
<h2>receiver并不一定能在方法内部被改变</h2>
<p>在上面的demo中可以看到我定义了一个<code>Bar()</code>方法，他的receiver并不是一个指针类型，如果试着在方法内部为receiver赋值就会发现赋值是可以赋值，但是并不会影响到方法的调用者，因为receiver的值（Go中所有的值都一样）是按值传递的（所以这里的receiver只是调用者的一份拷贝）。</p>
<p>为了能在方法里改变receiver能影响到方法调用者，你需要定义一个指针类型的receiver：</p>
<pre><code class="hljs go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(f *Foo)</span> <span class="hljs-title">Bar</span><span class="hljs-params">()</span></span> {
    <span class="hljs-comment">// here you can mutate the value via *f, like</span>
    *f = <span class="hljs-number">73</span>
}
</code></pre>
<p>例子中的方法接收了一个确定类型的值，可以看出使用<code>self</code>表示“自身”已经毫无意义了。这与传统面向对象语言默认将对象按引用传递不同，在Go里你可以在任何东西“里”定义方法（包括在方法上定义方法，<code>net/http</code>标准库就是这么做的），“对象里的方法”这种概念已经不复存在了。</p>
<h2>同样的值在不同时候可以有不同的方法</h2>
<p>在Go里，方法可以非常方便用与组织特定类型的各种功能。在代码执行期间，同样的值可以拥有有不一样的方法，结合Go提供的接口，鸭子类型的编码风格，使得这种（动态织入方法）编码方式非常流行。我们经常能看到编码时会定义一个“Support”类型，在其中放很多为其他不同类型提供的方法。</p>
<p>标准库<code>sort</code>就是一个很好的例子：在<code>sort</code>包里提供一种<code>IntSlice</code>类型，这种类型允许你对整数类型的slice（<code>[]int</code>）进行排序。只要将slice转换为<code>IntSlice</code>之后就拥有了各种对slice进行排序的方法，并且排序时原来的slice值并不会被改变（因为<code>IntSlice</code>就是<a href="https://golang.org/pkg/sort/#IntSlice">type IntSlice []int</a>）。很难去说<code>IntSlice</code>里的所有方法的receive带有<code>self</code>这层含义，因为这里所有的方法都是提供给其他类型使用的。从哲♂学的角度上看，这些工具类型并不存在“self”的概念。</p>
<h2>总结</h2>
<p>所以，不要给自己的思维加上太多枷锁，并不一定要使用语义化的方式去解释Go所提供的清晰明了的编码哲学。我自己对Go语言的学习理解来看，Go语言首要的编码风格应该是实用（与务虚相反）。所以每当你“感觉”某些概念很不自然，你就可以试着去弄清楚为什么这些东西在Go里要这样设计，大多数情况你最后会发现这种设计真是精妙。（我觉得熟悉C语言对于理解Go语言里<code>methods</code>设计有很大的帮助，更有助于理解这个问题。）</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在Go中使用'self'作为receiver变量是一种好的实践吗？

## 原文链接
[https://www.zcfy.cc/article/in-go-is-naming-the-receiver-variable-self-misleading-or-good-practice-stack-overflow](https://www.zcfy.cc/article/in-go-is-naming-the-receiver-variable-self-misleading-or-good-practice-stack-overflow)

