---
title: 'Go 语言编译期断言' 
date: 2019-01-23 2:30:08
hidden: true
slug: gh3n2hj4vgk
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#go-语言编译期断言"></a>Go 语言编译期断言</h1>
<p>这篇文章是关于一个鲜为人知的让 Go 在编译期断言的方法。你可能不会使用它，但是了解一下也很有趣。</p>
<p>作为一个热身，来看一个在 Go 中熟知的编译期断言：接口满意度检查。</p>
<p>在这段代码（<a href="https://play.golang.org/p/MJ6zF1oNsX">playground</a>）中，<code>var _ =</code> 行确保类型 <code>W</code> 是一个 <code>stringWriter</code>，其由 <a href="https://golang.org/pkg/io/#WriteString"><code>io.WriteString</code></a> 检查。</p>
<pre><code class="hljs go"><span class="hljs-keyword">package</span> main

<span class="hljs-keyword">import</span> <span class="hljs-string">"io"</span>

<span class="hljs-keyword">type</span> W <span class="hljs-keyword">struct</span>{}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(w W)</span> <span class="hljs-title">Write</span><span class="hljs-params">(b []<span class="hljs-keyword">byte</span>)</span> <span class="hljs-params">(<span class="hljs-keyword">int</span>, error)</span></span>       { <span class="hljs-keyword">return</span> <span class="hljs-built_in">len</span>(b), <span class="hljs-literal">nil</span> }
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(w W)</span> <span class="hljs-title">WriteString</span><span class="hljs-params">(s <span class="hljs-keyword">string</span>)</span> <span class="hljs-params">(<span class="hljs-keyword">int</span>, error)</span></span> { <span class="hljs-keyword">return</span> <span class="hljs-built_in">len</span>(s), <span class="hljs-literal">nil</span> }

<span class="hljs-keyword">type</span> stringWriter <span class="hljs-keyword">interface</span> {
    WriteString(<span class="hljs-keyword">string</span>) (<span class="hljs-keyword">int</span>, error)
}

<span class="hljs-keyword">var</span> _ stringWriter = W{}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">main</span><span class="hljs-params">()</span></span> {
    <span class="hljs-keyword">var</span> w W
    io.WriteString(w, <span class="hljs-string">"very long string"</span>)
}

</code></pre><p>如果你注释掉了 <code>W</code> 的 <code>WriteString</code> 方法，代码将无法编译：</p>
<pre><code class="hljs oxygene">main.go:<span class="hljs-number">14</span>: cannot use W literal (<span class="hljs-keyword">type</span> W) <span class="hljs-keyword">as</span> <span class="hljs-keyword">type</span> stringWriter <span class="hljs-keyword">in</span> assignment:
    W does <span class="hljs-keyword">not</span> implement stringWriter (missing WriteString <span class="hljs-function"><span class="hljs-keyword">method</span>)

</span></code></pre><p>这是很有用的。对于大多数同时满足 <code>io.Writer</code> 和 <code>stringWriter</code> 的类型，如果你删除 <code>WriteString</code> 方法，一切都会像以前一样继续工作，但性能较差。</p>
<p>你可以使用编译期断言保护你的代码，而不是试图使用<a href="https://golang.org/pkg/testing/#AllocsPerRun">`testing.T.AllocsPerRun'</a>为性能回归编写一个脆弱的测试。</p>
<p>这是<a href="https://github.com/golang/go/blob/go1.8rc2/src/io/multi.go#L72">一个实际的 io 包中的技术例子</a>。</p>
<hr>
<p>好的，让我们低调一点！</p>
<p>接口满意检查是很棒的。但是如果你想检查一个简单的布尔表达式，如 <code>1 + 1 == 2</code> ？</p>
<p>考虑这个代码（[playground] <a href="https://play.golang.org/p/mjIMWsWu4V">5</a>）：</p>
<pre><code class="hljs go"><span class="hljs-keyword">package</span> main

<span class="hljs-keyword">import</span> <span class="hljs-string">"crypto/md5"</span>

<span class="hljs-keyword">type</span> Hash [<span class="hljs-number">16</span>]<span class="hljs-keyword">byte</span>

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">init</span><span class="hljs-params">()</span></span> {
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(Hash{}) &lt; md5.Size {
        <span class="hljs-built_in">panic</span>(<span class="hljs-string">"Hash is too small"</span>)
    }
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">main</span><span class="hljs-params">()</span></span> {
    <span class="hljs-comment">// ...</span>
}

</code></pre><p><code>Hash</code> 可能是某种抽象的哈希结果。<code>init</code> 函数确保它将与 <a href="https://golang.org/pkg/crypto/md5/">crypto/md5</a> 一起工作。如果你改变 <code>Hash</code> 为（比如说）<code>[8]byte</code>，它会在进程启动时发生崩溃。但是，这是一个运行时检查。如果我们想要早点发现怎么办？</p>
<p>如下。（没有 playground 链接，因为这在 playground 上不起作用。）</p>
<pre><code class="hljs go"><span class="hljs-keyword">package</span> main

<span class="hljs-keyword">import</span> <span class="hljs-string">"C"</span>

<span class="hljs-keyword">import</span> <span class="hljs-string">"crypto/md5"</span>

<span class="hljs-keyword">type</span> Hash [<span class="hljs-number">16</span>]<span class="hljs-keyword">byte</span>

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">hashIsTooSmall</span><span class="hljs-params">()</span>

<span class="hljs-title">func</span> <span class="hljs-title">init</span><span class="hljs-params">()</span></span> {
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(Hash{}) &lt; md5.Size {
        hashIsTooSmall()
    }
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">main</span><span class="hljs-params">()</span></span> {
    <span class="hljs-comment">// ...</span>
}

</code></pre><p>现在如果你改变 <code>Hash</code> 为 <code>[8]byte</code>，它将在编译过程中失败。（实际上，它在链接过程中失败。足够接近我们的目标了。）</p>
<pre><code class="hljs avrasm">$ go build .
<span class="hljs-meta"># demo</span>
<span class="hljs-symbol">main.hashIsTooSmall:</span> <span class="hljs-keyword">call</span> to external function
<span class="hljs-symbol">main.init.1:</span> relocation target main.hashIsTooSmall not defined
<span class="hljs-symbol">main.init.1:</span> undefined: <span class="hljs-string">"main.hashIsTooSmall"</span>

</code></pre><p>这里发生了什么？</p>
<p><code>hashIsTooSmall</code> 是<a href="https://golang.org/ref/spec#Function_declarations">一个没有函数体的声明</a>。编译器假定别人将提供一个实现，也许是一个汇编程序。</p>
<p>当编译器可以证明 <code>len（Hash {}）&lt; md5.Size</code> 时，它消除了 if 语句中的代码。结果，没有人使用函数 <code>hashIsTooSmall</code>，所以链接器会消除它。没有其他损害。一旦断言失败，if 语句中的代码将被保留。不会消除 <code>hashIsTooSmall</code>。链接器然后注意到没有人提供了函数的实现然后链接失败，并出现错误，这是我们的目标。</p>
<p>最后一个奇怪的点：为什么是 <code>import "C"</code>？ go 工具知道在正常的 Go 代码中，所有函数都必须有主体，并指示编译器强制执行。通过切换到 cgo，我们删除该检查。（如果你在上面的代码中运行 <code>go build -x</code>，而没有添加 <code>import "C"</code> 这行，你会看到编译器是用 <code>-complete</code> 标志调用的。）另一种方法是添加 <code>import "C"</code> 来<a href="https://github.com/golang/go/blob/go1.8rc2/src/os/signal/sig.s">向包中添加一个名为 <code>foo.s</code> 的空文件</a>。</p>
<p>我仅见过一次这种技术的使用，是在<a href="https://github.com/golang/go/blob/go1.8rc2/test/fixedbugs/issue9608.dir/issue9608.go">编译器测试套件</a>中。还有其他<a href="https://github.com/golang/go/blob/go1.8rc2/src/runtime/hashmap.go#L261">可以发挥想象力的使用</a>，但我还没见到过。</p>
<p>可能就是这样吧。 :)</p>
<hr>
<p>via: <a href="http://commaok.xyz/post/compile-time-assertions">http://commaok.xyz/post/compile-time-assertions</a></p>
<p>作者：<a href="https://twitter.com/commaok">Josh Bleecher Snyder</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Go 语言编译期断言

## 原文链接
[https://www.zcfy.cc/article/compile-time-assertions-in-go](https://www.zcfy.cc/article/compile-time-assertions-in-go)

