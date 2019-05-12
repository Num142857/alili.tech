---
title: '一篇缺失的 TypeScript 介绍' 
date: 2019-01-22 2:30:08
hidden: true
slug: 28bisc87nkn
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#一篇缺失的-typescript-介绍"></a>一篇缺失的 TypeScript 介绍</h1>
<p><strong>下文是 James Henry（<a href="https://twitter.com/MrJamesHenry">@MrJamesHenry</a>）所提交的内容。我是 ESLint 核心团队的一员，也是 TypeScript 布道师。我正在和 Todd 在 <a href="https://ultimateangular.com/courses">UltimateAngular</a> 平台上合作发布 Angular 和 TypeScript 的精品课程。</strong></p>
<blockquote>
<p>本文的主旨是为了介绍我们是如何看待 TypeScript 的以及它在加强 JavaScript 开发中所起的作用。</p>
<p>我们也将尽可能地给出那些类型和编译方面的那些时髦词汇的准确定义。</p>
</blockquote>
<p>TypeScript 强大之处远远不止这些，本篇文章无法涵盖，想要了解更多请阅读<a href="http://www.typescriptlang.org/docs">官方文档</a>，或者学习 <a href="https://ultimateangular.com/courses#typescript">UltimateAngular 上的 TypeScript 课程</a> ，从初学者成为一位 TypeScript 高手。</p>
<h3><a href="#背景"></a>背景</h3>
<p>TypeScript 是个出乎意料强大的工具，而且它真的很容易掌握。</p>
<p>然而，TypeScript 可能比 JavaScript 要更为复杂一些，因为 TypeScript 可能向我们同时引入了一系列以前没有考虑过的 JavaScript 程序相关的技术概念。</p>
<p>每当我们谈论到类型、编译器等这些概念的时候，你会发现很快会变的不知所云起来。</p>
<p>这篇文章就是一篇为了解答你需要知道的许许多多不知所云的概念，来帮助你 TypeScript 快速入门的教程，可以让你轻松自如的应对这些概念。</p>
<h3><a href="#关键知识的掌握"></a>关键知识的掌握</h3>
<p>在 Web 浏览器中运行我们的代码这件事或许使我们对它是如何工作的产生一些误解，“它不用经过编译，是吗？”，“我敢肯定这里面是没有类型的...”</p>
<p>更有意思的是，上述的说法既是正确的也是不正确的，这取决于上下文环境和我们是如何定义这些概念的。</p>
<p>首先，我们要作的是明确这些。</p>
<h4><a href="#javascript-是解释型语言还是编译型语言"></a>JavaScript 是解释型语言还是编译型语言？</h4>
<p>传统意义上，程序员经常将自己的程序编译之后运行出结果就认为这种语言是编译型语言。</p>
<blockquote>
<p>从初学者的角度来说，编译的过程就是将我们自己编辑好的高级语言程序转换成机器实际运行的格式。</p>
</blockquote>
<p>就像 Go 语言，可以使用 <code>go build</code> 的命令行工具编译 .go 的文件，将其编译成代码的低级形式，它可以直接执行、运行。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> We manually compile our .go file into something we can run</span>
<span class="hljs-meta">#</span><span class="bash"> using the <span class="hljs-built_in">command</span> line tool <span class="hljs-string">"go build"</span></span>
go build ultimate-angular.go
<span class="hljs-meta">#</span><span class="bash"> ...<span class="hljs-keyword">then</span> we execute it!</span>
./ultimate-angular

</code></pre><p>作为一个 JavaScript 程序员（这一刻，请先忽略我们对新一代构建工具和模块加载程序的热爱），我们在日常的 JavaScript 开发中并没有编译的这一基本步骤，</p>
<p>我们写一些 JavaScript 代码，把它放在浏览器的 <code>&lt;script&gt;</code> 标签中，它就能运行了（或者在服务端环境运行，比如：node.js）。</p>
<p><strong>好吧，因此 JavaScript 没有进行过编译，那它一定是解释型语言了，是吗？</strong></p>
<p>实际上，我们能够确定的一点是，JavaScript 不是我们自己编译的，现在让我们简单的回顾一个简单的解释型语言的例子，再来谈 JavaScript 的编译问题。</p>
<blockquote>
<p>解释型计算机语言的执行的过程就像人们看书一样，从上到下、一行一行的阅读。</p>
</blockquote>
<p>我们所熟知的解释型语言的典型例子是 bash 脚本。我们终端中的 bash 解释器逐行读取我们的命令并且执行它。</p>
<p>现在我们回到 JavaScript 是解释执行还是编译执行的讨论中，我们要将逐行读取和逐行执行程序分开理解（对“解释型”的简单理解），不要混在一起。</p>
<p>以此代码为例：</p>
<pre><code class="hljs javascript">hello();
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Hello"</span>)
}

</code></pre><p>这是真正意义上 JavaScript 输出 Hello 单词的程序代码，但是，在 <code>hello()</code> 在我们定义它之前就已经使用了这个函数，这是简单的逐行执行办不到的，因为 <code>hello()</code> 在第一行没有任何意义的，直到我们在第二行声明了它。</p>
<p>像这样在 JavaScript 是存在的，因为我们的代码实际上在执行之前就被所谓的“JavaScript 引擎”或者是“特定的编译环境”编译过，这个编译的过程取决于具体的实现（比如，使用 V8 引擎的 node.js 和 Chome 就和使用 SpiderMonkey 的 FireFox 就有所不同）。</p>
<p>在这里，我们不会在进一步的讲解编译型执行和解释型执行微妙之处（这里的定义已经很好了）。</p>
<blockquote>
<p>请务必记住，我们编写的 JavaScript 代码已经不是我们的用户实际执行的代码了，即使是我们简单地将其放在 HTML 中的 <code>&lt;script&gt;</code> ，也是不一样的。</p>
</blockquote>
<h4><a href="#运行时间-vs-编译时间"></a>运行时间 VS 编译时间</h4>
<p>现在我们已经正确理解了编译和运行是两个不同的阶段，那“运行阶段Run Time”和“编译阶段Compile Time”理解起来也就容易多了。</p>
<p>编译阶段，就是我们在我们的编辑器或者 IDE 当中的代码转换成其它格式的代码的阶段。</p>
<p>运行阶段，就是我们程序实际执行的阶段，例如：上面的 <code>hello()</code> 函数就执行在“运行阶段”。</p>
<h4><a href="#typescript-编译器"></a>TypeScript 编译器</h4>
<p>现在我们了解了程序的生命周期中的关键阶段，接下来我们可以介绍 TypeScript 编译器了。</p>
<p>TypeScript 编译器是帮助我们编写代码的关键。比如，我们不需将 JavaScript 代码包含到 <code>&lt;script&gt;</code> 标签当中，只需要通过 TypeScript 编译器传递它，就可以在运行程序之前得到改进程序的建议。</p>
<blockquote>
<p>我们可以将这个新的步骤作为我们自己的个人“编译阶段”，这将在我们的程序抵达 JavaScript 主引擎之前，确保我们的程序是以我们预期的方式编写的。</p>
</blockquote>
<p>它与上面 Go 语言的实例类似，但是 TypeScript 编译器只是基于我们编写程序的方式提供提示信息，并不会将其转换成低级的可执行文件，它只会生成纯 JavaScript 代码。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> One option <span class="hljs-keyword">for</span> passing our <span class="hljs-built_in">source</span> .ts file through the TypeScript</span>
<span class="hljs-meta">#</span><span class="bash"> compiler is to use the <span class="hljs-built_in">command</span> line tool <span class="hljs-string">"tsc"</span></span>
tsc ultimate-angular.ts
<span class="hljs-meta">
#</span><span class="bash"> ...this will produce a .js file of the same name</span>
<span class="hljs-meta">#</span><span class="bash"> i.e. ultimate-angular.js</span>

</code></pre><p>在<a href="http://www.typescriptlang.org/docs">官方文档</a>中，有许多关于将 TypeScript 编译器以各种方式融入到你的现有工作流程中的文章。这些已经超出本文范围。</p>
<h4><a href="#动态类型与静态类型"></a>动态类型与静态类型</h4>
<p>就像对比编译程序与解释程序一样，动态类型与静态类型的对比在现有的资料中也是极其模棱两可的。</p>
<p>让我们先回顾一下我们在 JavaScript 中对于类型的理解。</p>
<p>我们的代码如下：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">var name</span> = <span class="hljs-string">'James'</span>;
<span class="hljs-attribute">var sum</span> = 1 + 2;

</code></pre><p>我们如何给别人描述这段代码？</p>
<p>“我们声明了一个变量 <code>name</code>，它被分配了一个 “James” 的<strong>字符串</strong>，然后我们又申请了一个变量 <code>sum</code>，它被分配了一个<strong>数字</strong> 1 和<strong>数字</strong> 2 的求和的数值结果。”</p>
<p>即使在这样一个简单的程序中，我们也使用了两个 JavaScript 的基本类型：<code>String</code> 和 <code>Number</code>。</p>
<p>就像上面我们讲编译一样，我们不会陷入编程语言类型的学术细节当中，关键是要理解在 JavaScript 中类型表示的是什么，并扩展到 TypeScript 的类型的理解上。</p>
<p>从每夜拜读的最新 ECMAScript 规范中我们可以学到（LOL, JK - “wat’s an ECMA?”），它大量引用了 JavaScript 的类型及其用法。</p>
<p>直接引自官方规范：</p>
<blockquote>
<p>ECMAScript 语言的类型取决于使用 ECMAScript 语言的 ECMAScript 程序员所直接操作的值。</p>
<p>ECMAScript 语言的类型有 Undefined、Null、Boolean、String、Symbol、Number 和 Object。</p>
</blockquote>
<p>我们可以看到，JavaScript 语言有 7 种正式类型，其中我们在我们现在程序中使用了 6 种（Symbol 首次在 ES2015 中引入，也就是 ES6）。</p>
<p>现在我们来深入一点看上面的 JavaScript 代码中的 “name 和 sum”。</p>
<p>我们可以把我们当前被分配了字符串“James”的变量 <code>name</code> 重新赋值为我们的第二个变量 sum 的当前值，目前是数字 3。</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">var name</span> = <span class="hljs-string">'James'</span>;
<span class="hljs-attribute">var sum</span> = 1 + 2;

<span class="hljs-attribute">name</span> = sum;

</code></pre><p>该 <code>name</code> 变量开始“存有”一个字符串，但现在它“存有”一个数字。这凸显了 JavaScript 中变量和类型的基本特性：</p>
<p>“James” 值一直是字符串类型，而 <code>name</code> 变量可以分配任何类型的值。和 <code>sum</code> 赋值的情况相同，1 是一个数字类型，<code>sum</code> 变量可以分配任何可能的值。</p>
<blockquote>
<p>在 JavaScript 中，值是具有类型的，而变量是可以随时保存任何类型的值。</p>
</blockquote>
<p>这也恰好是一个“动态类型语言”的定义。</p>
<p>相比之下，我们可以将“静态类型语言”视为我们可以（也必须）将类型信息与特定变量相关联的语言：</p>
<pre><code class="hljs delphi"><span class="hljs-keyword">var</span> <span class="hljs-keyword">name</span>: <span class="hljs-keyword">string</span> ＝ ‘James’;

</code></pre><p>在这段代码中，我们能够更好地显式声明我们对变量 <code>name</code> 的意图，我们希望它总是用作一个字符串。</p>
<p>你猜怎么着？我们刚刚看到我们的第一个 TypeScript 程序。</p>
<p>当我们反思reflect我们自己的代码（非编程方面的双关语“反射”）时，我们可以得出的结论，即使我们使用动态语言（如 JavaScript），在几乎所有的情况下，当我们初次定义变量和函数参数时，我们应该有非常明确的使用意图。如果这些变量和参数被重新赋值为与我们原先赋值不同类型的值，那么有可能某些东西并不是我们预期的那样工作的。</p>
<blockquote>
<p>作为 JavaScript 开发者，TypeScript 的静态类型注释给我们的一个巨大的帮助，它能够清楚地表达我们对变量的意图。</p>
</blockquote>
<blockquote>
<p>这种改进不仅有益于 TypeScript 编译器，还可以让我们的同事和将来的自己明白我们的代码。代码是用来读的。</p>
</blockquote>
<h3><a href="#typescript-在我们的-javascript-工作流程中的作用"></a>TypeScript 在我们的 JavaScript 工作流程中的作用</h3>
<p>我们已经开始看到“为什么经常说 TypeScript 只是 JavaScript + 静态类型”的说法了。<code>: string</code> 对于我们的 <code>name</code> 变量就是我们所谓的“类型注释”，在编译时被使用（换句话说，当我们让代码通过 TypeScript 编译器时），以确保其余的代码符合我们原来的意图。</p>
<p>我们再来看看我们的程序，并添加显式注释，这次是我们的 <code>sum</code> 变量：</p>
<pre><code class="hljs delphi"><span class="hljs-keyword">var</span> <span class="hljs-keyword">name</span>: <span class="hljs-keyword">string</span> = <span class="hljs-string">'James'</span>;
<span class="hljs-keyword">var</span> sum: number = <span class="hljs-number">1</span> + <span class="hljs-number">2</span>;

<span class="hljs-keyword">name</span> = sum;

</code></pre><p>如果我们使用 TypeScript 编译器编译这个代码，我们现在就会收到一个在 <code>name = sum</code> 这行的错误： <code>Type 'number' is not assignable to type 'string'</code>，我们的这种“偷渡”被警告，我们执行的代码可能有问题。</p>
<blockquote>
<p>重要的是，如果我们想要继续执行，我们可以选择忽略 TypeScript 编译器的错误，因为它只是在将 JavaScript 代码发送给我们的用户之前给我们反馈的工具。</p>
</blockquote>
<p>TypeScript 编译器为我们输出的最终 JavaScript 代码将与上述原始源代码完全相同：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">var name</span> = <span class="hljs-string">'James'</span>;
<span class="hljs-attribute">var sum</span> = 1 + 2;

<span class="hljs-attribute">name</span> = sum;

</code></pre><p>类型注释全部为我们自动删除了，现在我们可以运行我们的代码了。</p>
<blockquote>
<p>注意：在此示例中，即使我们没有提供显式类型注释的 <code>: string</code> 和 <code>: number</code> ，TypeScript 编译器也可以为我们提供完全相同的错误 。</p>
</blockquote>
<blockquote>
<p>TypeScript 通常能够从我们使用它的方式推断变量的类型！</p>
</blockquote>
<h4><a href="#我们的源文件是我们的文档typescript-是我们的拼写检查"></a>我们的源文件是我们的文档，TypeScript 是我们的拼写检查</h4>
<p>对于 TypeScript 与我们的源代码的关系来说，一个很好的类比，就是拼写检查与我们在 Microsoft Word 中写的文档的关系。</p>
<p>这两个例子有三个关键的共同点：</p>
<ol>
<li><strong>它能告诉我们写的东西的客观的、直接的错误：</strong><ul>
<li><em>拼写检查</em>：“我们已经写了字典中不存在的字”</li>
<li><em>TypeScript</em>：“我们引用了一个符号（例如一个变量），它没有在我们的程序中声明”</li>
</ul>
</li>
<li><strong>它可以提醒我们写的可能是错误的：</strong><ul>
<li><em>拼写检查</em>：“该工具无法完全推断特定语句的含义，并建议重写”</li>
<li><em>TypeScript</em>：“该工具不能完全推断特定变量的类型，并警告不要这样使用它”</li>
</ul>
</li>
<li><strong>我们的来源可以用于其原始目的，无论工具是否存在错误：</strong><ul>
<li><em>拼写检查</em>：“即使您的文档有很多拼写错误，您仍然可以打印出来，并把它当成文档使用”</li>
<li><em>TypeScript</em>：“即使您的源代码具有 TypeScript 错误，它仍然会生成您可以执行的 JavaScript 代码”</li>
</ul>
</li>
</ol>
<h3><a href="#typescript-是一种可以启用其它工具的工具"></a>TypeScript 是一种可以启用其它工具的工具</h3>
<p>TypeScript 编译器由几个不同的部分或阶段组成。我们将通过查看这些部分之一 The Parser（语法分析程序）来结束这篇文章，除了 TypeScript 已经为我们做的以外，它为我们提供了在其上构建其它开发工具的机会。</p>
<p>编译过程的“解析器步骤”的结果是所谓的抽象语法树，简称为 AST。</p>
<h4><a href="#什么是抽象语法树ast"></a>什么是抽象语法树（AST）？</h4>
<p>我们以普通文本形式编写我们的程序，因为这是我们人类与计算机交互的最好方式，让它们能够做我们想要的东西。我们并不是很擅长于手工编写复杂的数据结构！</p>
<p>然而，不管在哪种情况下，普通文本在编译器里面实际上是一个非常棘手的事情。它可能包含程序运作不必要的东西，例如空格，或者可能存在有歧义的部分。</p>
<p>因此，我们希望将我们的程序转换成数据结构，将数据结构全部映射为我们所使用的所谓“标记”，并将其插入到我们的程序中。</p>
<p>这个数据结构正是 AST！</p>
<p>AST 可以通过多种不同的方式表示，我使用 JSON 来看一看。</p>
<p>我们从这个极其简单的基本源代码来看：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">var a</span> = 1;

</code></pre><p>TypeScript 编译器的 Parser（语法分析程序）阶段的（简化后的）输出将是以下 AST：</p>
<pre><code class="hljs json">{
  <span class="hljs-attr">"pos"</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">"end"</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">"kind"</span>: <span class="hljs-number">256</span>,
  <span class="hljs-attr">"text"</span>: <span class="hljs-string">"var a = 1;"</span>,
  <span class="hljs-attr">"statements"</span>: [
    {
      <span class="hljs-attr">"pos"</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">"end"</span>: <span class="hljs-number">10</span>,
      <span class="hljs-attr">"kind"</span>: <span class="hljs-number">200</span>,
      <span class="hljs-attr">"declarationList"</span>: {
        <span class="hljs-attr">"pos"</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">"end"</span>: <span class="hljs-number">9</span>,
        <span class="hljs-attr">"kind"</span>: <span class="hljs-number">219</span>,
        <span class="hljs-attr">"declarations"</span>: [
          {
            <span class="hljs-attr">"pos"</span>: <span class="hljs-number">3</span>,
            <span class="hljs-attr">"end"</span>: <span class="hljs-number">9</span>,
            <span class="hljs-attr">"kind"</span>: <span class="hljs-number">218</span>,
            <span class="hljs-attr">"name"</span>: {
              <span class="hljs-attr">"pos"</span>: <span class="hljs-number">3</span>,
              <span class="hljs-attr">"end"</span>: <span class="hljs-number">5</span>,
              <span class="hljs-attr">"text"</span>: <span class="hljs-string">"a"</span>
            },
            <span class="hljs-attr">"initializer"</span>: {
              <span class="hljs-attr">"pos"</span>: <span class="hljs-number">7</span>,
              <span class="hljs-attr">"end"</span>: <span class="hljs-number">9</span>,
              <span class="hljs-attr">"kind"</span>: <span class="hljs-number">8</span>,
              <span class="hljs-attr">"text"</span>: <span class="hljs-string">"1"</span>
            }
          }
        ]
      }
    }
  ]
}

</code></pre><p>我们的 AST 中的对象称为节点。</p>
<h4><a href="#示例在-vs-code-中重命名符号"></a>示例：在 VS Code 中重命名符号</h4>
<p>在内部，TypeScript 编译器将使用 Parser 生成的 AST 来提供一些非常重要的事情，例如，发生在编译程序时的类型检查。</p>
<p>但它不止于此！</p>
<blockquote>
<p>我们可以使用 AST 在 TypeScript 之上开发自己的工具，如代码美化工具、代码格式化工具和分析工具。</p>
</blockquote>
<p>建立在这个 AST 代码之上的工具的一个很好的例子是：语言服务器Language Server。</p>
<p>深入了解语言服务器的工作原理超出了本文的范围，但是当我们编写程序时，它能为我们提供一个绝对重量级别功能，就是“重命名符号”。</p>
<p>假设我们有以下源代码：</p>
<pre><code class="hljs 1c"><span class="hljs-comment">// The name of the author is James</span>
var first_name = 'James';
console.<span class="hljs-built_in">log</span>(first_name);

</code></pre><p>经过代码审查和对完美的适当追求，我们决定应该改换我们的变量命名惯例；使用驼峰式命名方式，而不是我们当前正在使用这种蛇式命名。</p>
<p>在我们的代码编辑器中，我们一直以来可以选择多个相同的文本，并使用多个光标来一次更改它们。</p>
<p><a href="https://camo.githubusercontent.com/2286c10db0932a04513f807b5d18b69b2a2cb328/68747470733a2f2f746f64646d6f74746f2e636f6d2f696d672f706f7374732f747970657363726970742d7468652d6d697373696e672d696e74726f64756374696f6e2f6d616e75616c6c792d73656c6563742d6d617463682e676966"><img src="https://p0.ssl.qhimg.com/t0196505857f16bae7c.gif" alt="Manually select matches"></a></p>
<p>当我们把程序也视作文本这样继续操作时，我们已经陷入了一个典型的陷阱中。</p>
<p>那个注释中我们不想修改的“name”单词，在我们的手动匹配中却被误选中了。我们可以看到在现实世界的应用程序中这样更改代码是有多危险。</p>
<p>正如我们在上面学到的那样，像 TypeScript 这样的东西在幕后生成一个 AST 的时候，与我们的程序不再像普通文本那样可以交互，每个标记在 AST 中都有自己的位置，而且它有很清晰的映射关系。</p>
<p>当我们右键单击我们的 <code>first_name</code> 变量时，我们可以在 VS Code 中直接“重命名符号”（TypeScript 语言服务器插件也可用于其他编辑器）。</p>
<p><a href="https://camo.githubusercontent.com/cc5e2fb89fdb9cd966af9232f99a7eb76c456dfd/68747470733a2f2f746f64646d6f74746f2e636f6d2f696d672f706f7374732f747970657363726970742d7468652d6d697373696e672d696e74726f64756374696f6e2f72656e616d652d73796d626f6c2d6578616d706c652e676966"><img src="https://p0.ssl.qhimg.com/t01df809ce7745fd733.gif" alt="Rename Symbol Example"></a></p>
<p>非常好！现在我们的 <code>first_name</code> 变量是唯一需要改变的东西，如果需要的话，这个改变甚至会发生在我们项目中的多个文件中（与导出和导入的值一样）！</p>
<h3><a href="#总结"></a>总结</h3>
<p>哦，我们在这篇文章中已经讲了很多的内容。</p>
<p>我们把有关学术方面的规避开，围绕编译器和类型还有很多专业术语给出了通俗的定义。</p>
<p>我们对比了编译语言与解释语言、运行阶段与编译阶段、动态类型与静态类型，以及抽象语法树（AST）如何为我们的程序构建工具提供了更为优化的方法。</p>
<p>重要的是，我们提供了 TypeScript 作为我们 JavaScript 开发工具的一种思路，以及如何在其上构建更棒的工具，比如说作为重构代码的一种方式的重命名符号。</p>
<p>快来 UltimateAngular 平台上学习从初学者到 TypeScript 高手的课程吧，开启你的学习之旅！</p>
<hr>
<p>via: <a href="https://toddmotto.com/typescript-the-missing-introduction">https://toddmotto.com/typescript-the-missing-introduction</a></p>
<p>作者：James Henry 译者：<a href="https://github.com/MonkeyDEcho">MonkeyDEcho</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一篇缺失的 TypeScript 介绍

## 原文链接
[https://www.zcfy.cc/article/typescript-the-missing-introduction](https://www.zcfy.cc/article/typescript-the-missing-introduction)

