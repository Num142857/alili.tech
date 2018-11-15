---
title: 日常 Python 编程优雅之道
reprint: true
categories: reprint
abbrlink: 18851f44
date: 2018-10-19 00:00:00
---

{{% raw %}}

            <h1><a href="#日常-python-编程优雅之道"></a>日常 Python 编程优雅之道</h1>
<blockquote>
<p>3 个可以使你的 Python 代码更优雅、可读、直观和易于维护的工具。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/1bf02c6ae37d5830e4f879b09f1bde0aef1eef22/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f6c6561642d696d616765732f73657276696e672d626f776c2d666f726b732d64696e6e65722e706e673f69746f6b3d6133597150777235"><img src="https://p0.ssl.qhimg.com/t0126e2480793c94104.png" alt=""></a></p>
<p>Python 提供了一组独特的工具和语言特性来使你的代码更加优雅、可读和直观。为正确的问题选择合适的工具，你的代码将更易于维护。在本文中，我们将研究其中的三个工具：魔术方法、迭代器和生成器，以及方法魔术。</p>
<h3><a href="#魔术方法"></a>魔术方法</h3>
<p>魔术方法可以看作是 Python 的管道。它们被称为“底层”方法，用于某些内置的方法、符号和操作。你可能熟悉的常见魔术方法是 <code>__init__()</code>，当我们想要初始化一个类的新实例时，它会被调用。</p>
<p>你可能已经看过其他常见的魔术方法，如 <code>__str__</code> 和 <code>__repr__</code>。Python 中有一整套魔术方法，通过实现其中的一些方法，我们可以修改一个对象的行为，甚至使其行为类似于内置数据类型，例如数字、列表或字典。</p>
<p>让我们创建一个 <code>Money</code> 类来示例：</p>
<pre><code class="hljs ruby"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Money</span>:</span>

    currency_rates = {
        <span class="hljs-string">'$'</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">'€'</span>: <span class="hljs-number">0</span>.<span class="hljs-number">88</span>,
    }

    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">__init__</span><span class="hljs-params">(<span class="hljs-keyword">self</span>, symbol, amount)</span></span>:
        <span class="hljs-keyword">self</span>.symbol = symbol
        <span class="hljs-keyword">self</span>.amount = amount

    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">__repr__</span><span class="hljs-params">(<span class="hljs-keyword">self</span>)</span></span>:
        <span class="hljs-keyword">return</span> <span class="hljs-string">'%s%.2f'</span> % (<span class="hljs-keyword">self</span>.symbol, <span class="hljs-keyword">self</span>.amount)

    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">convert</span><span class="hljs-params">(<span class="hljs-keyword">self</span>, other)</span></span>:
        <span class="hljs-string">""</span><span class="hljs-string">" Convert other amount to our currency "</span><span class="hljs-string">""</span>
        new_amount = (
            other.amount / <span class="hljs-keyword">self</span>.currency_rates[other.symbol]
            * <span class="hljs-keyword">self</span>.currency_rates[<span class="hljs-keyword">self</span>.symbol])

        <span class="hljs-keyword">return</span> Money(<span class="hljs-keyword">self</span>.symbol, new_amount)

</code></pre><p>该类定义为给定的货币符号和汇率定义了一个货币汇率，指定了一个初始化器（也称为构造函数），并实现 <code>__repr__</code>，因此当我们打印这个类时，我们会看到一个友好的表示，例如 <code>$2.00</code> ，这是一个带有货币符号和金额的 <code>Money('$', 2.00)</code> 实例。最重要的是，它定义了一种方法，允许你使用不同的汇率在不同的货币之间进行转换。</p>
<p>打开 Python shell，假设我们已经定义了使用两种不同货币的食品的成本，如下所示：</p>
<pre><code class="hljs ruby"><span class="hljs-meta">&gt;&gt;</span>&gt; soda_cost = Money(<span class="hljs-string">'$'</span>, <span class="hljs-number">5.25</span>)
<span class="hljs-meta">&gt;&gt;</span>&gt; soda_cost
    $5.<span class="hljs-number">25</span>

<span class="hljs-meta">&gt;&gt;</span>&gt; pizza_cost = Money(<span class="hljs-string">'€'</span>, <span class="hljs-number">7.99</span>)
<span class="hljs-meta">&gt;&gt;</span>&gt; pizza_cost
    €<span class="hljs-number">7.99</span>

</code></pre><p>我们可以使用魔术方法使得这个类的实例之间可以相互交互。假设我们希望能够将这个类的两个实例一起加在一起，即使它们是不同的货币。为了实现这一点，我们可以在 <code>Money</code> 类上实现 <code>__add__</code> 这个魔术方法：</p>
<pre><code class="hljs python"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Money</span>:</span>

    <span class="hljs-comment"># ... previously defined methods ...</span>

    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">__add__</span><span class="hljs-params">(self, other)</span>:</span>
        <span class="hljs-string">""" Add 2 Money instances using '+' """</span>
        new_amount = self.amount + self.convert(other).amount
        <span class="hljs-keyword">return</span> Money(self.symbol, new_amount)

</code></pre><p>现在我们可以以非常直观的方式使用这个类：</p>
<pre><code class="hljs ruby"><span class="hljs-meta">&gt;&gt;</span>&gt; soda_cost = Money(<span class="hljs-string">'$'</span>, <span class="hljs-number">5.25</span>)
<span class="hljs-meta">&gt;&gt;</span>&gt; pizza_cost = Money(<span class="hljs-string">'€'</span>, <span class="hljs-number">7.99</span>)
<span class="hljs-meta">&gt;&gt;</span>&gt; soda_cost + pizza_cost
    $14.<span class="hljs-number">33</span>
<span class="hljs-meta">&gt;&gt;</span>&gt; pizza_cost + soda_cost
    €<span class="hljs-number">12.61</span>

</code></pre><p>当我们将两个实例加在一起时，我们得到以第一个定义的货币符号所表示的结果。所有的转换都是在底层无缝完成的。如果我们想的话，我们也可以为减法实现 <code>__sub__</code>，为乘法实现 <code>__mul__</code> 等等。阅读<a href="https://docs.python.org/3/reference/datamodel.html#emulating-numeric-types">模拟数字类型</a>或<a href="https://rszalski.github.io/magicmethods/">魔术方法指南</a>来获得更多信息。</p>
<p>我们学习到 <code>__add__</code> 映射到内置运算符 <code>+</code>。其他魔术方法可以映射到像 <code>[]</code> 这样的符号。例如，在字典中通过索引或键来获得一项，其实是使用了 <code>__getitem__</code> 方法：</p>
<pre><code class="hljs ruby"><span class="hljs-meta">&gt;&gt;</span>&gt; d = {<span class="hljs-string">'one'</span>: <span class="hljs-number">1</span>, <span class="hljs-string">'two'</span>: <span class="hljs-number">2</span>}
<span class="hljs-meta">&gt;&gt;</span>&gt; d[<span class="hljs-string">'two'</span>]
<span class="hljs-number">2</span>
<span class="hljs-meta">&gt;&gt;</span>&gt; d.__getitem_<span class="hljs-number">_</span>(<span class="hljs-string">'two'</span>)
<span class="hljs-number">2</span>

</code></pre><p>一些魔术方法甚至映射到内置函数，例如 <code>__len__()</code> 映射到 <code>len()</code>。</p>
<pre><code class="hljs ruby"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Alphabet</span>:</span>
    letters = <span class="hljs-string">'ABCDEFGHIJKLMNOPQRSTUVWXYZ'</span>

    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">__len__</span><span class="hljs-params">(<span class="hljs-keyword">self</span>)</span></span>:
        <span class="hljs-keyword">return</span> len(<span class="hljs-keyword">self</span>.letters)

<span class="hljs-meta">&gt;&gt;</span>&gt; my_alphabet = Alphabet()
<span class="hljs-meta">&gt;&gt;</span>&gt; len(my_alphabet)
    <span class="hljs-number">26</span>

</code></pre><h3><a href="#自定义迭代器"></a>自定义迭代器</h3>
<p>对于新的和经验丰富的 Python 开发者来说，自定义迭代器是一个非常强大的但令人迷惑的主题。</p>
<p>许多内置类型，例如列表、集合和字典，已经实现了允许它们在底层迭代的协议。这使我们可以轻松地遍历它们。</p>
<pre><code class="hljs python"><span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">for</span> food <span class="hljs-keyword">in</span> [<span class="hljs-string">'Pizza'</span>, <span class="hljs-string">'Fries'</span>]:

         print(food + <span class="hljs-string">'. Yum!'</span>)

Pizza. Yum!
Fries. Yum!

</code></pre><p>我们如何迭代我们自己的自定义类？首先，让我们来澄清一些术语。</p>
<ul>
<li>要成为一个可迭代对象，一个类需要实现 <code>__iter__()</code></li>
<li><code>__iter__()</code> 方法需要返回一个迭代器</li>
<li>要成为一个迭代器，一个类需要实现 <code>__next__()</code>（或<a href="https://docs.python.org/2/library/stdtypes.html#iterator.next">在 Python 2</a>中是 <code>next()</code>），当没有更多的项要迭代时，必须抛出一个 <code>StopIteration</code> 异常。</li>
</ul>
<p>呼！这听起来很复杂，但是一旦你记住了这些基本概念，你就可以在任何时候进行迭代。</p>
<p>我们什么时候想使用自定义迭代器？让我们想象一个场景，我们有一个 <code>Server</code> 实例在不同的端口上运行不同的服务，如 <code>http</code> 和 <code>ssh</code>。其中一些服务处于 <code>active</code> 状态，而其他服务则处于 <code>inactive</code> 状态。</p>
<pre><code class="hljs python"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Server</span>:</span>

    services = [
        {<span class="hljs-string">'active'</span>: <span class="hljs-keyword">False</span>, <span class="hljs-string">'protocol'</span>: <span class="hljs-string">'ftp'</span>, <span class="hljs-string">'port'</span>: <span class="hljs-number">21</span>},
        {<span class="hljs-string">'active'</span>: <span class="hljs-keyword">True</span>, <span class="hljs-string">'protocol'</span>: <span class="hljs-string">'ssh'</span>, <span class="hljs-string">'port'</span>: <span class="hljs-number">22</span>},
        {<span class="hljs-string">'active'</span>: <span class="hljs-keyword">True</span>, <span class="hljs-string">'protocol'</span>: <span class="hljs-string">'http'</span>, <span class="hljs-string">'port'</span>: <span class="hljs-number">80</span>},
    ]

</code></pre><p>当我们遍历 <code>Server</code> 实例时，我们只想遍历那些处于 <code>active</code> 的服务。让我们创建一个 <code>IterableServer</code> 类：</p>
<pre><code class="hljs ruby"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">IterableServer</span>:</span>
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">__init__</span><span class="hljs-params">(<span class="hljs-keyword">self</span>)</span></span>:
        <span class="hljs-keyword">self</span>.current_pos = <span class="hljs-number">0</span>
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">__next__</span><span class="hljs-params">(<span class="hljs-keyword">self</span>)</span></span>:
        pass  <span class="hljs-comment"># <span class="hljs-doctag">TODO:</span> 实现并记得抛出 StopIteration</span>

</code></pre><p>首先，我们将当前位置初始化为 <code>0</code>。然后，我们定义一个 <code>__next__()</code> 方法来返回下一项。我们还将确保在没有更多项返回时抛出 <code>StopIteration</code>。到目前为止都很好！现在，让我们实现这个 <code>__next__()</code> 方法。</p>
<pre><code class="hljs ruby"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">IterableServer</span>:</span>
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">__init__</span><span class="hljs-params">(<span class="hljs-keyword">self</span>)</span></span>:
        <span class="hljs-keyword">self</span>.current_pos = <span class="hljs-number">0</span>.  <span class="hljs-comment"># 我们初始化当前位置为 0</span>
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">__iter__</span><span class="hljs-params">(<span class="hljs-keyword">self</span>)</span></span>:  <span class="hljs-comment"># 我们可以在这里返回 self，因为实现了 __next__</span>
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">self</span>
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">__next__</span><span class="hljs-params">(<span class="hljs-keyword">self</span>)</span></span>:
        <span class="hljs-keyword">while</span> <span class="hljs-keyword">self</span>.current_pos &lt; len(<span class="hljs-keyword">self</span>.services):
            service = <span class="hljs-keyword">self</span>.services[<span class="hljs-keyword">self</span>.current_pos]
            <span class="hljs-keyword">self</span>.current_pos += <span class="hljs-number">1</span>
            <span class="hljs-keyword">if</span> service[<span class="hljs-string">'active'</span>]:
                <span class="hljs-keyword">return</span> service[<span class="hljs-string">'protocol'</span>], service[<span class="hljs-string">'port'</span>]
        raise StopIteration
    <span class="hljs-keyword">next</span> = __next_<span class="hljs-number">_</span>  <span class="hljs-comment"># 可选的 Python2 兼容性</span>

</code></pre><p>我们对列表中的服务进行遍历，而当前的位置小于服务的个数，但只有在服务处于活动状态时才返回。一旦我们遍历完服务，就会抛出一个 <code>StopIteration</code> 异常。</p>
<p>因为我们实现了 <code>__next__()</code> 方法，当它耗尽时，它会抛出 <code>StopIteration</code>。我们可以从 <code>__iter__()</code> 返回 <code>self</code>，因为 <code>IterableServer</code> 类遵循 <code>iterable</code> 协议。</p>
<p>现在我们可以遍历一个 <code>IterableServer</code> 实例，这将允许我们查看每个处于活动的服务，如下所示：</p>
<pre><code class="hljs applescript">&gt;&gt;&gt; <span class="hljs-keyword">for</span> protocol, port <span class="hljs-keyword">in</span> IterableServer():

        print('service %s <span class="hljs-keyword">is</span> <span class="hljs-built_in">running</span> <span class="hljs-keyword">on</span> port %d' % (protocol, port))

service ssh <span class="hljs-keyword">is</span> <span class="hljs-built_in">running</span> <span class="hljs-keyword">on</span> port <span class="hljs-number">22</span>

service http <span class="hljs-keyword">is</span> <span class="hljs-built_in">running</span> <span class="hljs-keyword">on</span> port <span class="hljs-number">21</span>


</code></pre><p>太棒了，但我们可以做得更好！在这样类似的实例中，我们的迭代器不需要维护大量的状态，我们可以简化代码并使用 <a href="https://docs.python.org/3/library/stdtypes.html#generator-types">generator（生成器）</a> 来代替。</p>
<pre><code class="hljs python"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Server</span>:</span>
    services = [
        {<span class="hljs-string">'active'</span>: <span class="hljs-keyword">False</span>, <span class="hljs-string">'protocol'</span>: <span class="hljs-string">'ftp'</span>, <span class="hljs-string">'port'</span>: <span class="hljs-number">21</span>},
        {<span class="hljs-string">'active'</span>: <span class="hljs-keyword">True</span>, <span class="hljs-string">'protocol'</span>: <span class="hljs-string">'ssh'</span>, <span class="hljs-string">'port'</span>: <span class="hljs-number">22</span>},
        {<span class="hljs-string">'active'</span>: <span class="hljs-keyword">True</span>, <span class="hljs-string">'protocol'</span>: <span class="hljs-string">'http'</span>, <span class="hljs-string">'port'</span>: <span class="hljs-number">21</span>},
    ]
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">__iter__</span><span class="hljs-params">(self)</span>:</span>
        <span class="hljs-keyword">for</span> service <span class="hljs-keyword">in</span> self.services:
            <span class="hljs-keyword">if</span> service[<span class="hljs-string">'active'</span>]:
                <span class="hljs-keyword">yield</span> service[<span class="hljs-string">'protocol'</span>], service[<span class="hljs-string">'port'</span>]

</code></pre><p><code>yield</code> 关键字到底是什么？在定义生成器函数时使用 yield。这有点像 <code>return</code>，虽然 <code>return</code> 在返回值后退出函数，但 <code>yield</code> 会暂停执行直到下次调用它。这允许你的生成器的功能在它恢复之前保持状态。查看 <a href="https://docs.python.org/3/reference/expressions.html#yieldexpr">yield 的文档</a>以了解更多信息。使用生成器，我们不必通过记住我们的位置来手动维护状态。生成器只知道两件事：它现在需要做什么以及计算下一个项目需要做什么。一旦我们到达执行点，即 <code>yield</code> 不再被调用，我们就知道停止迭代。</p>
<p>这是因为一些内置的 Python 魔法。在 <a href="https://docs.python.org/3/reference/datamodel.html#object.__iter__">Python 关于 <code>__iter__()</code> 的文档</a>中我们可以看到，如果 <code>__iter__()</code> 是作为一个生成器实现的，它将自动返回一个迭代器对象，该对象提供 <code>__iter__()</code> 和 <code>__next__()</code> 方法。阅读这篇很棒的文章，深入了解<a href="http://nvie.com/posts/iterators-vs-generators/">迭代器，可迭代对象和生成器</a>。</p>
<h3><a href="#方法魔法"></a>方法魔法</h3>
<p>由于其独特的方面，Python 提供了一些有趣的方法魔法作为语言的一部分。</p>
<p>其中一个例子是别名功能。因为函数只是对象，所以我们可以将它们赋值给多个变量。例如：</p>
<pre><code class="hljs ruby"><span class="hljs-meta">&gt;&gt;</span>&gt; <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span></span>:
       return <span class="hljs-string">'foo'</span>
<span class="hljs-meta">&gt;&gt;</span>&gt; foo()
<span class="hljs-string">'foo'</span>
<span class="hljs-meta">&gt;&gt;</span>&gt; bar = foo
<span class="hljs-meta">&gt;&gt;</span>&gt; bar()
<span class="hljs-string">'foo'</span>

</code></pre><p>我们稍后会看到它的作用。</p>
<p>Python 提供了一个方便的内置函数<a href="https://docs.python.org/3/library/functions.html#getattr">称为 <code>getattr()</code></a>，它接受 <code>object, name, default</code> 参数并在 <code>object</code> 上返回属性 <code>name</code>。这种编程方式允许我们访问实例变量和方法。例如：</p>
<pre><code class="hljs ruby"><span class="hljs-meta">&gt;&gt;</span>&gt; <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dog</span>:</span>
        sound = <span class="hljs-string">'Bark'</span>
        <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">speak</span><span class="hljs-params">(<span class="hljs-keyword">self</span>)</span></span>:
            print(<span class="hljs-keyword">self</span>.sound + <span class="hljs-string">'!'</span>, <span class="hljs-keyword">self</span>.sound + <span class="hljs-string">'!'</span>)

<span class="hljs-meta">&gt;&gt;</span>&gt; fido = Dog()

<span class="hljs-meta">&gt;&gt;</span>&gt; fido.sound
<span class="hljs-string">'Bark'</span>
<span class="hljs-meta">&gt;&gt;</span>&gt; getattr(fido, <span class="hljs-string">'sound'</span>)
<span class="hljs-string">'Bark'</span>

<span class="hljs-meta">&gt;&gt;</span>&gt; fido.speak
&lt;bound method Dog.speak of &lt;__main_<span class="hljs-number">_</span>.Dog object at <span class="hljs-number">0x102db8828</span><span class="hljs-meta">&gt;&gt;
</span>&gt;&gt;&gt; getattr(fido, <span class="hljs-string">'speak'</span>)
&lt;bound method Dog.speak of &lt;__main_<span class="hljs-number">_</span>.Dog object at <span class="hljs-number">0x102db8828</span><span class="hljs-meta">&gt;&gt;


</span>&gt;&gt;&gt; fido.speak()
Bark! Bark!
<span class="hljs-meta">&gt;&gt;</span>&gt; speak_method = getattr(fido, <span class="hljs-string">'speak'</span>)
<span class="hljs-meta">&gt;&gt;</span>&gt; speak_method()
Bark! Bark!

</code></pre><p>这是一个很酷的技巧，但是我们如何在实际中使用 <code>getattr</code> 呢？让我们看一个例子，我们编写一个小型命令行工具来动态处理命令。</p>
<pre><code class="hljs ruby"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Operations</span>:</span>
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">say_hi</span><span class="hljs-params">(<span class="hljs-keyword">self</span>, name)</span></span>:
        print(<span class="hljs-string">'Hello,'</span>, name)
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">say_bye</span><span class="hljs-params">(<span class="hljs-keyword">self</span>, name)</span></span>:
        print (<span class="hljs-string">'Goodbye,'</span>, name)
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">default</span><span class="hljs-params">(<span class="hljs-keyword">self</span>, arg)</span></span>:
        print (<span class="hljs-string">'This operation is not supported.'</span>)

<span class="hljs-keyword">if</span> __name_<span class="hljs-number">_</span> == <span class="hljs-string">'__main__'</span>:
    operations = Operations()
    <span class="hljs-comment"># 假设我们做了错误处理</span>
    command, argument = input(<span class="hljs-string">'&gt; '</span>).split()
    func_to_call = getattr(operations, command, operations.default)
    func_to_call(argument)

</code></pre><p>脚本的输出是：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> python getattr.py</span>
<span class="hljs-meta">&gt;</span><span class="bash"> say_hi Nina</span>
Hello, Nina
<span class="hljs-meta">&gt;</span><span class="bash"> blah blah</span>
This operation is not supported.

</code></pre><p>接下来，我们来看看 <code>partial</code>。例如，<code>functool.partial(func, *args, **kwargs)</code> 允许你返回一个新的 <a href="https://docs.python.org/3/library/functools.html#functools.partial">partial 对象</a>，它的行为类似 <code>func</code>，参数是 <code>args</code> 和 <code>kwargs</code>。如果传入更多的 <code>args</code>，它们会被附加到 <code>args</code>。如果传入更多的 <code>kwargs</code>，它们会扩展并覆盖 <code>kwargs</code>。让我们通过一个简短的例子来看看：</p>
<pre><code class="hljs shell"><span class="hljs-meta">&gt;</span><span class="bash">&gt;&gt; from functools import partial</span>
<span class="hljs-meta">&gt;</span><span class="bash">&gt;&gt; basetwo = partial(int, base=2)</span>
<span class="hljs-meta">&gt;</span><span class="bash">&gt;&gt; basetwo</span>
&lt;functools.partial object at 0x1085a09f0&gt;
<span class="hljs-meta">&gt;</span><span class="bash">&gt;&gt; basetwo(<span class="hljs-string">'10010'</span>)</span>
18
<span class="hljs-meta">
#</span><span class="bash"> 这等同于</span>
<span class="hljs-meta">&gt;</span><span class="bash">&gt;&gt; int(<span class="hljs-string">'10010'</span>, base=2)</span>

</code></pre><p>让我们看看在我喜欢的一个<a href="https://github.com/mozilla/agithub">名为 <code>agithub</code></a> 的库中的一些示例代码中，这个方法魔术是如何结合在一起的，这是一个（名字起得很 low 的） REST API 客户端，它具有透明的语法，允许你以最小的配置快速构建任何 REST API 原型（不仅仅是 GitHub）。我发现这个项目很有趣，因为它非常强大，但只有大约 400 行 Python 代码。你可以在大约 30 行配置代码中添加对任何 REST API 的支持。<code>agithub</code> 知道协议所需的一切（<code>REST</code>、<code>HTTP</code>、<code>TCP</code>），但它不考虑上游 API。让我们深入到它的实现中。</p>
<p>以下是我们如何为 GitHub API 和任何其他相关连接属性定义端点 URL 的简化版本。在这里查看<a href="https://github.com/mozilla/agithub/blob/master/agithub/GitHub.py">完整代码</a>。</p>
<pre><code class="hljs ruby"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">GitHub</span>(<span class="hljs-title">API</span>):</span>
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">__init__</span><span class="hljs-params">(<span class="hljs-keyword">self</span>, token=None, *args, **kwargs)</span></span>:
        props = ConnectionProperties(api_url = kwargs.pop(<span class="hljs-string">'api_url'</span>, <span class="hljs-string">'api.github.com'</span>))
        <span class="hljs-keyword">self</span>.setClient(Client(*args, **kwargs))
        <span class="hljs-keyword">self</span>.setConnectionProperties(props)

</code></pre><p>然后，一旦配置了<a href="https://github.com/settings/tokens">访问令牌</a>，就可以开始使用 <a href="https://developer.github.com/v3/repos/#list-your-repositories">GitHub API</a>。</p>
<pre><code class="hljs ruby"><span class="hljs-meta">&gt;&gt;</span>&gt; gh = GitHub(<span class="hljs-string">'token'</span>)
<span class="hljs-meta">&gt;&gt;</span>&gt; status, data = gh.user.repos.get(visibility=<span class="hljs-string">'public'</span>, sort=<span class="hljs-string">'created'</span>)
<span class="hljs-meta">&gt;&gt;</span>&gt; <span class="hljs-comment"># ^ 映射到 GET /user/repos</span>
<span class="hljs-meta">&gt;&gt;</span>&gt; data
... [<span class="hljs-string">'tweeter'</span>, <span class="hljs-string">'snipey'</span>, <span class="hljs-string">'...'</span>]

</code></pre><p>请注意，你要确保 URL 拼写正确，因为我们没有验证 URL。如果 URL 不存在或出现了其他任何错误，将返回 API 抛出的错误。那么，这一切是如何运作的呢？让我们找出答案。首先，我们将查看一个 <a href="https://github.com/mozilla/agithub/blob/dbf7014e2504333c58a39153aa11bbbdd080f6ac/agithub/base.py#L30-L58"><code>API</code> 类</a>的简化示例：</p>
<pre><code class="hljs ruby"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">API</span>:</span>
    <span class="hljs-comment"># ... other methods ...</span>
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">__getattr__</span><span class="hljs-params">(<span class="hljs-keyword">self</span>, key)</span></span>:
        <span class="hljs-keyword">return</span> IncompleteRequest(<span class="hljs-keyword">self</span>.client).__getattr_<span class="hljs-number">_</span>(key)
    __getitem_<span class="hljs-number">_</span> = __getattr_<span class="hljs-number">_</span>

</code></pre><p>在 <code>API</code> 类上的每次调用都会调用 <a href="https://github.com/mozilla/agithub/blob/dbf7014e2504333c58a39153aa11bbbdd080f6ac/agithub/base.py#L60-L100"><code>IncompleteRequest</code> 类</a>作为指定的 <code>key</code>。</p>
<pre><code class="hljs ruby"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">IncompleteRequest</span>:</span>
    <span class="hljs-comment"># ... other methods ...</span>
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">__getattr__</span><span class="hljs-params">(<span class="hljs-keyword">self</span>, key)</span></span>:
        <span class="hljs-keyword">if</span> key <span class="hljs-keyword">in</span> <span class="hljs-keyword">self</span>.client.<span class="hljs-symbol">http_methods:</span>
            htmlMethod = getattr(<span class="hljs-keyword">self</span>.client, key)
            <span class="hljs-keyword">return</span> partial(htmlMethod, url=<span class="hljs-keyword">self</span>.url)
        <span class="hljs-symbol">else:</span>
            <span class="hljs-keyword">self</span>.url += <span class="hljs-string">'/'</span> + str(key)
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">self</span>
    __getitem_<span class="hljs-number">_</span> = __getattr_<span class="hljs-number">_</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Client</span>:</span>
    http_methods = (<span class="hljs-string">'get'</span>)  <span class="hljs-comment"># 还有 post, put, patch 等等。</span>
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">get</span><span class="hljs-params">(<span class="hljs-keyword">self</span>, url, headers={}, **params)</span></span>:
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">self</span>.request(<span class="hljs-string">'GET'</span>, url, None, headers)

</code></pre><p>如果最后一次调用不是 HTTP 方法（如 <code>get</code>、<code>post</code> 等），则返回带有附加路径的 <code>IncompleteRequest</code>。否则，它从<a href="https://github.com/mozilla/agithub/blob/dbf7014e2504333c58a39153aa11bbbdd080f6ac/agithub/base.py#L102-L231"><code>Client</code> 类</a>获取 HTTP 方法对应的正确函数，并返回 <code>partial</code>。</p>
<p>如果我们给出一个不存在的路径会发生什么？</p>
<pre><code class="hljs stylus">&gt;&gt;&gt; status, data = this<span class="hljs-selector-class">.path</span><span class="hljs-selector-class">.doesnt</span><span class="hljs-selector-class">.exist</span><span class="hljs-selector-class">.get</span>()
&gt;&gt;&gt; status
... <span class="hljs-number">404</span>

</code></pre><p>因为 <code>__getattr__</code> 别名为 <code>__getitem__</code>：</p>
<pre><code class="hljs ruby"><span class="hljs-meta">&gt;&gt;</span>&gt; owner, repo = <span class="hljs-string">'nnja'</span>, <span class="hljs-string">'tweeter'</span>
<span class="hljs-meta">&gt;&gt;</span>&gt; status, data = gh.repos[owner][repo].pulls.get()
<span class="hljs-meta">&gt;&gt;</span>&gt; <span class="hljs-comment"># ^ Maps to GET /repos/nnja/tweeter/pulls</span>
<span class="hljs-meta">&gt;&gt;</span>&gt; data
.... <span class="hljs-comment"># {....}</span>

</code></pre><p>这真心是一些方法魔术！</p>
<h3><a href="#了解更多"></a>了解更多</h3>
<p>Python 提供了大量工具，使你的代码更优雅，更易于阅读和理解。挑战在于找到合适的工具来完成工作，但我希望本文为你的工具箱添加了一些新工具。而且，如果你想更进一步，你可以在我的博客 <a href="http://nnja.io">nnja.io</a> 上阅读有关装饰器、上下文管理器、上下文生成器和命名元组的内容。随着你成为一名更好的 Python 开发人员，我鼓励你到那里阅读一些设计良好的项目的源代码。<a href="https://github.com/requests/requests">Requests</a> 和 <a href="https://github.com/pallets/flask">Flask</a> 是两个很好的起步的代码库。</p>
<hr>
<p>via: <a href="https://opensource.com/article/18/4/elegant-solutions-everyday-python-problems">https://opensource.com/article/18/4/elegant-solutions-everyday-python-problems</a></p>
<p>作者：<a href="https://opensource.com/users/nnja">Nina Zakharenko</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/MjSeven">MjSeven</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/3-practical-python-tools-magic-methods-iterators-and-generators-and-method-magic](https://www.zcfy.cc/article/3-practical-python-tools-magic-methods-iterators-and-generators-and-method-magic)
原文标题: 日常 Python 编程优雅之道
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
