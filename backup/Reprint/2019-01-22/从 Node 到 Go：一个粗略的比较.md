---
title: '从 Node 到 Go：一个粗略的比较' 
date: 2019-01-22 2:30:07
hidden: true
slug: dmbc9wijdz9
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#从-node-到-go一个粗略的比较"></a>从 Node 到 Go：一个粗略的比较</h1>
<p>在 XO 公司，我们最初使用 Node 和 Ruby 构建相互连接的服务系统。我们享受 Node 带来的明显性能优势，以及可以访问已有的大型软件包仓库。我们也可以轻松地在公司内部发布并复用已有的插件和模块。极大地提高了开发效率，使得我们可以快速编写出可拓展的和可靠的应用。而且，庞大的 Node 社区使我们的工程师向开源软件贡献更加容易（比如 <a href="https://medium.com/xo-tech/bunnybus-building-a-data-transit-system-b9647f6283e5#.l64fdvfys">BunnyBus</a> 和 <a href="https://medium.com/xo-tech/introducing-felicity-7b6d0b734ce#.hmloiiyx8">Felicity</a>）。</p>
<p>虽然我在大学时期和刚刚工作的一些时间在使用更严谨的编译语言，比如 C++ 和 C#，而后来我开始使用 JavaScript。我很喜欢它的自由和灵活，但是我最近开始怀念静态和结构化的语言，因为当时有一个同事让我对 Go 语言产生了兴趣。</p>
<p>我从写 JavaScript 到写 Go，我发现两种语言有很多相似之处。两者学习起来都很快并且易于上手，都具有充满表现力的语法，并且在开发者社区中都有很多工作机会。没有完美的编程语言，所以你应该总是选择一个适合手头项目的语言。在这篇文章中，我将要说明这两种语言深层次上的关键区别，希望能鼓励没有用过 Go 语言的用户可以有机会使用 Go 。</p>
<h3><a href="#大体上的差异"></a>大体上的差异</h3>
<p>在深入细节之前，我们应该先了解一下两种语言之间的重要区别。</p>
<p>Go，或称 Golang，是 Google 在 2007 年创建的自由开源编程语言。它以快速和简单为设计目标。Go 被直接编译成机器码，这就是它速度的来源。使用编译语言调试是相当容易的，因为你可以在早期捕获大量错误。Go 也是一种强类型的语言，它有助于数据完整，并可以在编译时查找类型错误。</p>
<p>另一方面，JavaScript 是一种弱类型语言。除了忽略验证数据的类型和真值判断陷阱所带来的额外负担之外，使用弱类型语言也有自己的好处。比起使用接口interfaces和范型generics，柯里化currying和可变的形参个数flexible arity让函数变得更加灵活。JavaScript 在运行时进行解释，这可能导致错误处理和调试的问题。Node 是一款基于 Google V8 虚拟机的 JavaScript 运行库，这使它成为一个轻量和快速的 Web 开发平台。</p>
<h3><a href="#语法"></a>语法</h3>
<p>作为原来的 JavaScript 开发者，Go 简单和直观的语法很吸引我。由于两种语言的语法可以说都是从 C 语言演变而来的，所以它们的语法有很多相同之处。Go 被普遍认为是一种“容易学习的语言”。那是因为它的对开发者友好的工具、精简的语法和固守惯例（LCTT 译注：惯例优先）。</p>
<p>Go 包含大量有助于简化开发的内置特性。你可以用标准 Go 构建工具把你的程序用 <code>go build</code> 命令编译成二进制可执行文件。使用内置的测试套件进行测试只需要运行 <code>go test</code> 即可。 诸如原生支持的并发等特性甚至在语言层面上提供。</p>
<p><a href="https://golang.org/doc/faq">Google 的 Go 开发者</a>认为，现在的编程太复杂了，太多的“记账一样，重复劳动和文书工作”。这就是为什么 Go 的语法被设计得如此简单和干净，以减少混乱、提高效率和增强可读性。它还鼓励开发人员编写明确的、易于理解的代码。Go 只有 <a href="https://golang.org/ref/spec#Keywords">25 个保留关键字</a>和一种循环（<code>for</code> 循环），而不像 JavaScript 有 <a href="https://www.w3schools.com/js/js_reserved.asp">大约 84 个关键字</a>（包括保留关键字字、对象、属性和方法）。</p>
<p>为了说明语法的一些差异和相似之处，我们来看几个例子：</p>
<ul>
<li>标点符号： Go 去除了所有多余的符号以提高效率和可读性。尽管 JavaScript 中需要符号的地方也不多（参见： <a href="https://en.wikipedia.org/wiki/Lisp_%28programming_language%29">Lisp</a>），而且经常是可选的，但我更加喜欢 Go 的简单。</li>
</ul>
<p>// JavaScript 的逗号和分号 for (var i = 0; i &lt; 10; i++) { console.log(i); }</p>
<pre><code class="hljs mipsasm">
    *<span class="hljs-keyword">JavaScript </span>中的标点*

</code></pre><p>// Go 使用最少数量标点
for i := 0; i &lt; 10; i++ {
    fmt.Println(i)
}</p>
<pre><code class="hljs">
</code></pre><p><em>Go 中的标点</em></p>
<pre><code class="hljs markdown">
<span class="hljs-bullet">*   </span>赋值：由于 Go 是强类型语言，所以你在初始化变量时可以使用 <span class="hljs-code">`:=`</span> 操作符来进行类型推断，以避免[<span class="hljs-string">重复声明</span>](<span class="hljs-link">https://golang.org/doc/faq#principles</span>)，而 JavaScript 则在运行时声明类型。


// JavaScript 赋值 var foo = "bar";

</code></pre><pre><code class="hljs clean">*JavaScript 中的赋值*

```
</code></pre><p>// Go 的赋值
var foo string //不使用类型推导
foo = "bar"
foo := "bar" //使用类型推导</p>
<pre><code class="hljs">
</code></pre><p><em>Go 的赋值</em></p>
<pre><code class="hljs coffeescript">
*   导出：在 JavaScript 中，你必须从某个模块中显式地导出。 在 Go 中，任何大写的函数将被默认导出。


const Bar = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}; <span class="hljs-built_in">module</span>.exports = { Bar }

</code></pre><pre><code class="hljs clean">*JavaScript 中的导出*

```
</code></pre><p>// Go 中的导出
package foo // 定义包名
func Bar (s string) string {
    // Bar 将被导出
}</p>
<pre><code class="hljs">
</code></pre><p><em>Go 中的导出</em></p>
<pre><code class="hljs clean">
*   导入：在 JavaScript 中 `required` 库是导入依赖项和模块所必需的，而 Go 则利用原生的 `<span class="hljs-keyword">import</span>` 关键字通过包的路径导入模块。另一个区别是，与 Node 的中央 NPM 存储库不同，Go 使用 URL 作为路径来导入非标准库的包，这是为了从包的源码仓库直接克隆依赖。


<span class="hljs-comment">// Javascript 的导入 var foo = require('foo'); foo.bar();</span>

</code></pre><pre><code class="hljs clean">*JavaScript 的导入*

```
</code></pre><p>// Go 的导入
import (
    "fmt" // Go 的标准库部分
    "github.com/foo/foo" // 直接从仓库导入
)
foo.Bar()</p>
<pre><code class="hljs">
</code></pre><p><em>Go 的导入</em></p>
<pre><code class="hljs ada">
*   返回值：通过 Go 的多值返回特性可以优雅地传递和处理返回值和错误，并且通过传递引用减少了不正确的值传递。在 JavaScript 中需要通过一个对象或者数组来返回多个值。


// Javascript - 返回多值 <span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>() { <span class="hljs-keyword">return</span> <span class="hljs-type">{a:</span> <span class="hljs-number">1</span>, b: <span class="hljs-number">2</span>}; } const { a, b } = foo();

</code></pre><pre><code class="hljs clean">*JavaScript 的返回*

```
</code></pre><p>// Go - 返回多值
func foo() (int, int) {
    return 1, 2
}
a, b := foo()</p>
<pre><code class="hljs">
</code></pre><p><em>Go 的返回</em></p>
<pre><code class="hljs awk">
*   错误处理：Go 推荐在错误出现的地方捕获它们，而不是像 Node 一样在回调中让错误冒泡。


<span class="hljs-regexp">//</span> Node 的错误处理 foo(<span class="hljs-string">'bar'</span>, <span class="hljs-keyword">function</span>(err, data) { <span class="hljs-regexp">//</span> 处理错误 }

</code></pre><pre><code class="hljs clean">*JavaScript 的错误处理*

```
</code></pre><p>//Go 的错误处理
foo, err := bar()
if err != nil {
    // 用 defer、 panic、 recover 或 log.fatal 等等处理错误.
}</p>
<pre><code class="hljs">
</code></pre><p><em>Go  的错误处理</em></p>
<pre><code class="hljs actionscript">
*   可变参数函数：Go 和 JavaScript 的函数都支持传入不定数量的参数。


<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span> <span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{ console.log(args.length); } foo(); <span class="hljs-comment">// 0 foo(1, 2, 3); // 3</span>

</code></pre><pre><code class="hljs clean">*JavaScript 中的可变参数函数*

```
</code></pre><p>func foo (args ...int) {
    fmt.Println(len(args))
}
func main() {
    foo() // 0
    foo(1,2,3) // 3
}</p>
<pre><code class="hljs">
</code></pre><p><em>Go 中的可变参数函数</em></p>
<pre><code class="hljs markdown">
<span class="hljs-section">### [](#社区)社区</span>

当比较 Go 和 Node 提供的编程范式哪种更方便时，两边都有不同的拥护者。Node 在软件包数量和社区的大小上完全胜过了 Go。Node 包管理器（NPM），是世界上最大的软件仓库，拥有[<span class="hljs-string">超过 410,000 个软件包，每天以 555 个新软件包的惊人速度增长</span>](<span class="hljs-link">http://www.modulecounts.com/</span>)。这个数字可能看起来令人吃惊（确实是），但是需要注意的是，这些包许多是重复的，且质量不足以用在生产环境。 相比之下，Go 大约有 13 万个包。

[<span class="hljs-string">![</span>](<span class="hljs-link">https://camo.githubusercontent.com/a6ec6ab081114541a68ee04a0939a9c668f8c96b/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f302a306f556e56564b7875557276564733462e</span>)](<span class="hljs-link">https://camo.githubusercontent.com/a6ec6ab081114541a68ee04a0939a9c668f8c96b/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f302a306f556e56564b7875557276564733462e</span>)

<span class="hljs-emphasis">_Node 和 Go 包的数量_</span>

尽管 Node 和 Go 岁数相仿，但 JavaScript 使用更加广泛，并拥有巨大的开发者和开源社区。因为 Node 是为所有人开发的，并在开始的时候就带有一个强壮的包管理器，而 Go 是特地为 Google 开发的。下面的[<span class="hljs-string">Spectrum 排行榜</span>](<span class="hljs-link">http://spectrum.ieee.org/static/interactive-the-top-programming-languages-2016</span>)显示了当前流行的的顶尖 Web 开发语言。

[<span class="hljs-string">![</span>](<span class="hljs-link">https://camo.githubusercontent.com/d812496b1c3e1f37265de6960515aa1a2ecc9e02/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f302a6f32536d6e556f36377865614662595a2e</span>)](<span class="hljs-link">https://camo.githubusercontent.com/d812496b1c3e1f37265de6960515aa1a2ecc9e02/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f302a6f32536d6e556f36377865614662595a2e</span>)

<span class="hljs-emphasis">_Web 开发语言排行榜前 7 名_</span>

JavaScript 的受欢迎程度近年来似乎保持相对稳定，而 [<span class="hljs-string">Go 一直在保持上升趋势</span>](<span class="hljs-link">http://www.tiobe.com/tiobe-index/</span>)。

[<span class="hljs-string">![</span>](<span class="hljs-link">https://camo.githubusercontent.com/c718290606b012f8aefa378901580690145c8595/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f302a7a583559673377684c637a705369665f2e</span>)](<span class="hljs-link">https://camo.githubusercontent.com/c718290606b012f8aefa378901580690145c8595/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f302a7a583559673377684c637a705369665f2e</span>)

<span class="hljs-emphasis">_编程语言趋势_</span>

<span class="hljs-section">### [](#性能)性能</span>

如果你的主要关注点是速度呢？当今似乎人们比以前更重视性能的优化。用户不喜欢等待信息。 事实上，如果网页的加载时间超过 3 秒，[<span class="hljs-string">40％ 的用户会放弃访问您的网站</span>](<span class="hljs-link">https://hostingfacts.com/internet-facts-stats-2016/</span>)。

因为它的非阻塞异步 I/O，Node 经常被认为是高性能的语言。另外，正如我之前提到的，Node 运行在针对动态语言进行了优化的 Google V8 引擎上。而 Go 的设计也考虑到速度。[<span class="hljs-string">Google 的开发者们</span>](<span class="hljs-link">https://golang.org/doc/faq</span>)通过建立了一个“充满表现力而轻量级的类型系统；并发和垃圾回收机制；强制地指定依赖版本等等”，达成了这一目标。

我运行了一些测试来比较 Node 和 Go 之间的性能。这些测试注重于语言提供的初级能力。如果我准备测试例如 HTTP 请求或者 CPU 密集型运算，我会使用 Go 语言级别的并发工具（goroutines/channels）。但是我更注重于各个语言提供的基本特性（参见 [<span class="hljs-string">三种并发方法</span>](<span class="hljs-link">https://medium.com/xo-tech/concurrency-in-three-flavors-51ed709876fb#.khvqrttxa</span>) 了解关于 goroutines 和 channels 的更多知识）。

我在基准测试中也加入了 Python，所以无论如何我们对 Node 和 Go 的结果都很满意。

<span class="hljs-section">#### [](#循环算术)循环/算术</span>

迭代十亿项并把它们相加：

</code></pre><p>var r = 0;
for (var c = 0; c &lt; 1000000000; c++) {
    r += c;
}</p>
<pre><code class="hljs nginx">
<span class="hljs-attribute">_Node_</span>

</code></pre><p>package main
func main() {
    var r int
    for c := 0; c &lt; 1000000000; c++ {
        r += c
    }
}</p>
<pre><code class="hljs nginx">
<span class="hljs-attribute">_Go_</span>

</code></pre><p>sum(xrange(1000000000))</p>
<pre><code class="hljs markdown">
<span class="hljs-emphasis">_Python_</span>

[<span class="hljs-string">![</span>](<span class="hljs-link">https://camo.githubusercontent.com/c6a452ff225288a0dafbb910068599c24364ca03/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a35753051396e6d706b637370326c747a6d4c4f3643512e706e67</span>)](<span class="hljs-link">https://camo.githubusercontent.com/c6a452ff225288a0dafbb910068599c24364ca03/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a35753051396e6d706b637370326c747a6d4c4f3643512e706e67</span>)

<span class="hljs-emphasis">_结果_</span>

这里的输家无疑是 Python，花了超过 7 秒的 CPU 时间。而 Node 和 Go 都相当高效，分别用了 900 ms 和 408 ms。

<span class="hljs-emphasis">_修正：由于一些评论表明 Python 的性能还可以提高。我更新了结果来反映这些变化。同时，使用 PyPy 大大地提高了性能。当使用 Python 3.6.1 和 PyPy 3.5.7 运行时，性能提升到 1.234 秒，但仍然不及 Go 和 Node 。_</span>

<span class="hljs-section">#### [](#io)I/O</span>

遍历一百万个数字并将其写入一个文件。

</code></pre><p>var fs = require('fs');
var wstream = fs.createWriteStream('node');</p>
<p>for (var c = 0; c &lt; 1000000; ++c) {
  wstream.write(c.toString());
}
wstream.end();</p>
<pre><code class="hljs nginx">
<span class="hljs-attribute">_Node_</span>

</code></pre><p>package main</p>
<p>import (
    "bufio"
    "os"
    "strconv"
)</p>
<p>func main() {
    file, _ := os.Create("go")
    b := bufio.NewWriter(file)
    for c := 0; c &lt; 1000000; c++ {
        num := strconv.Itoa(c)
        b.WriteString(num)
    }
    file.Close()
}</p>
<pre><code class="hljs nginx">
<span class="hljs-attribute">_Go_</span>

</code></pre><p>with open("python", "a") as text_file:
    for i in range(1000000):
        text_file.write(str(i))</p>
<pre><code class="hljs crmsh">
_Python_

[![](https://camo.githubusercontent.com/<span class="hljs-number">157</span>c3c1a4b6c77c2e1d33208d55f701c0fc03b3e/<span class="hljs-number">68747470733</span>a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a67485a6f575635774959526d5931386568706a6e55512e706e67)](https://camo.githubusercontent.com/<span class="hljs-number">157</span>c3c1a4b6c77c2e1d33208d55f701c0fc03b3e/<span class="hljs-number">68747470733</span>a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a67485a6f575635774959526d5931386568706a6e55512e706e67)

_结果_

Python 以 <span class="hljs-number">7.82</span> 秒再次排名第三。 这次测试中，<span class="hljs-keyword">Node</span> <span class="hljs-title">和 Go</span> 之间的差距很大，<span class="hljs-keyword">Node</span> <span class="hljs-title">花费大约 1</span>.<span class="hljs-number">172</span> 秒，Go 花费了 <span class="hljs-number">213</span> 毫秒。真正令人印象深刻的是，Go 大部分的处理时间花费在编译上。如果我们将代码编译，以二进制运行，这个 I/O 测试仅花费 <span class="hljs-number">78</span> 毫秒——要比 <span class="hljs-keyword">Node</span> <span class="hljs-title">快 15</span> 倍。

_修正：修改了 Go 代码以实现缓存 I/O。_

<span class="hljs-comment">#### [](#冒泡排序)冒泡排序</span>

将含有十个元素的数组排序一千万次。

</code></pre><p>function bubbleSort(input) {
    var n = input.length;
    var swapped = true;
    while (swapped) {
        swapped = false;
        for (var i = 0; i &lt; n; i++) {
            if (input[i - 1] &gt; input [i]) {
                [input[i], input[i - 1]] = [input[i - 1], input[i]];
                swapped = true;
            }
        }
    }
}</p>
<p>for (var c = 0; c &lt; 1000000; c++) {
    const toBeSorted = [1, 3, 2, 4, 8, 6, 7, 2, 3, 0];
    bubbleSort(toBeSorted);
}</p>
<pre><code class="hljs nginx">
<span class="hljs-attribute">_Node_</span>

</code></pre><p>package main</p>
<p>var toBeSorted [10]int = [10]int{1, 3, 2, 4, 8, 6, 7, 2, 3, 0}</p>
<p>func bubbleSort(input [10]int) {
    n := len(input)
    swapped := true
    for swapped {
        swapped = false
        for i := 1; i &lt; n; i++ {
            if input[i-1] &gt; input[i] {
                input[i], input[i-1] = input[i-1], input[i]
                swapped = true
            }
        }
    }
}</p>
<p>func main() {
    for c := 0; c &lt; 1000000; c++ {
        bubbleSort(toBeSorted)
    }
}</p>
<pre><code class="hljs nginx">
<span class="hljs-attribute">_Go_</span>

</code></pre><p>def bubbleSort(input):
    length = len(input)
    swapped = True</p>
<pre><code class="hljs stylus">while swapped:
    swapped = False
    <span class="hljs-keyword">for</span> <span class="hljs-selector-tag">i</span> <span class="hljs-keyword">in</span> range(<span class="hljs-number">1</span>,length):
        <span class="hljs-keyword">if</span> <span class="hljs-selector-tag">input</span>[<span class="hljs-selector-tag">i</span> - <span class="hljs-number">1</span>] &gt; <span class="hljs-selector-tag">input</span>[i]:
            <span class="hljs-selector-tag">input</span>[i], <span class="hljs-selector-tag">input</span>[<span class="hljs-selector-tag">i</span> - <span class="hljs-number">1</span>] = <span class="hljs-selector-tag">input</span>[<span class="hljs-selector-tag">i</span> - <span class="hljs-number">1</span>], <span class="hljs-selector-tag">input</span>[i]
            swapped = True
</code></pre><p>for i in range(1000000):
    toBeSorted = [1, 3, 2, 4, 8, 6, 7, 2, 3, 0]
    bubbleSort(toBeSorted)</p>
<p><code>`</code></p>
<p><em>Python</em></p>
<p><a href="https://camo.githubusercontent.com/f453110a18b065b4994cfd23b7eb3c0bafa4e2c7/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a305f322d692d477751306c306e3830704543484555512e706e67"><img src="" alt=""></a></p>
<p>_结果_</p>
<p>像刚才一样，Python 的表现是最差的，大约花费 15 秒完成了任务。 Go 完成任务的速度是 Node 的 16 倍。</p>
<h4><a href="#判决"></a>判决</h4>
<p>Go 无疑是这三个测试中的赢家，而 Node 大部分表现都很出色。Python 也表现不错。要清楚，性能不是选择编程语言需要考虑的全部内容。如果您的应用不需要处理大量数据，那么 Node 和 Go 之间的性能差异可能是微不足道的。 有关性能的一些其他比较，请参阅以下内容：</p>
<ul>
<li><a href="https://jaxbot.me/articles/node-vs-go-2014">Node Vs. Go</a></li>
<li><a href="https://hashnode.com/post/comparison-nodejs-php-c-go-python-and-ruby-cio352ydg000ym253frmfnt70">Multiple Language Performance Test</a></li>
<li><a href="https://benchmarksgame.alioth.debian.org/u64q/compare.php?lang=go&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;lang2=node">Benchmarks Game</a></li>
</ul>
<h3><a href="#结论"></a>结论</h3>
<p>这个帖子不是为了证明一种语言比另一种语言更好。由于各种原因，每种编程语言都在软件开发社区中占有一席之地。 我的意图是强调 Go 和 Node 之间的差异，并且促进展示一种新的 Web 开发语言。 在为一个项目选择语言时，有各种因素需要考虑，比如开发人员的熟悉程度、花费和实用性。 我鼓励在决定哪种语言适合您时进行一次彻底的底层分析。</p>
<p>正如我们所看到的，Go 有如下的优点：接近底层语言的性能，简单的语法和相对简单的学习曲线使它成为构建可拓展和安全的 Web 应用的理想选择。随着 Go 的使用率和社区活动的快速增长，它将会成为现代网络开发中的重要角色。话虽如此，我相信如果 Node 被正确地实现，它正在向正确的方向努力，仍然是一种强大而有用的语言。它具有大量的追随者和活跃的社区，使其成为一个简单的平台，可以让 Web 应用在任何时候启动和运行。</p>
<h3><a href="#资料"></a>资料</h3>
<p>如果你对学习 Go 语言感兴趣，可以参阅下面的资源：</p>
<ul>
<li><a href="https://golang.org/doc/#learning">Golang 网站</a></li>
<li><a href="https://github.com/golang/go/wiki/Learn">Golang Wiki</a></li>
<li><a href="https://www.reddit.com/r/golang/">Golang Subreddit</a></li>
</ul>
<hr>
<p>via: <a href="https://medium.com/xo-tech/from-node-to-go-a-high-level-comparison-56c8b717324a#.byltlz535">https://medium.com/xo-tech/from-node-to-go-a-high-level-comparison-56c8b717324a#.byltlz535</a></p>
<p>作者：<a href="https://medium.com/@johnstamatakos?source=post_header_lockup">John Stamatakos</a> 译者：<a href="https://github.com/trnhoe">trnhoe</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从 Node 到 Go：一个粗略的比较

## 原文链接
[https://www.zcfy.cc/article/from-node-to-go-a-high-level-comparison](https://www.zcfy.cc/article/from-node-to-go-a-high-level-comparison)

