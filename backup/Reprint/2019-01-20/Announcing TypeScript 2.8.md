---
title: 'Announcing TypeScript 2.8' 
date: 2019-01-20 2:30:11
hidden: true
slug: dvmh7vmzmkv
categories: [reprint]
---

{{< raw >}}

            <p>TypeScript 2.8 在这里，我们带来一些你会十分喜爱的功能!</p>
<p>你熟悉 TypeScript 吗？ 它是一种将可选的静态类型添加到JavaScript的语言。
这些静态类型会让你的代码不犯拼写错误以及其他的愚蠢错误。
基于围绕这些类型所构建的组件，还可以实现代码自动补全和项目索引等更多美妙的功能。
把你的代码交给 TypeScript 编译器运行后，将只剩下清晰，可读性强且符合标准的JavaScript代码。
也可以将你的代码重写为大部分仅支持 es5 甚至 es3 旧版浏览器所能运行的代码。想要了解 TypeScript 的更多相关信息 , <a href="https://www.typescriptlang.org/docs/home.html">请查看我们的文档</a>.</p>
<p>如果你现在急不可待，你可以通过 <a href="https://www.nuget.org/packages/Microsoft.TypeScript.MSBuild">NuGet</a> 下载或者运行以下指令：</p>
<pre><code class="hljs cmake">npm <span class="hljs-keyword">install</span> -g typescript
</code></pre><p>你能获得以下编辑器支持：</p>
<ul>
<li><a href="https://gist.github.com/DanielRosenwasser/download.microsoft.com/download/6/D/8/6D8381B0-03C1-4BD2-AE65-30FF0A4C62DA/2.8.1-TS-release-dev14update3-20180323.2/TypeScript_Dev14Full.exe">Visual Studio 2015</a> (requires update 3)</li>
<li><a href="http://download.microsoft.com/download/7/0/A/70A6AC0E-8934-4396-A43E-445059F430EA/2.8.1-TS-release-dev14update3-20180323.2/TypeScript_SDK.exe">Visual Studio 2017</a> (requires 15.2 or later)</li>
<li><a href="https://packagecontrol.io/packages/TypeScript">Sublime Text 3 via PackageControl</a></li>
<li>Visual Studio Code with the next release, or <a href="https://code.visualstudio.com/Docs/languages/typescript#_using-newer-typescript-versions">by following instructions here</a>.</li>
</ul>
<p>对 <a href="https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support">其他编辑器</a> 的支持更新时间可能会不同， 但会尽快提供。</p>
<p>为了快速浏览我们在此版本中发布的内容，我们将其组合成列表放在一起便于浏览:</p>
<ul>
<li><a href="https://blogs.msdn.microsoft.com/#conditional-types">Conditional types</a></li>
<li><a href="https://blogs.msdn.microsoft.com/#declaration-only-emit">Declaration-only emit</a></li>
<li><a href="https://blogs.msdn.microsoft.com/#jsx-pragma-comments"><code>@jsx</code> pragma comments</a></li>
<li><a href="https://blogs.msdn.microsoft.com/#jsx-namespace-resolution"><code>JSX</code> now resolved within factory functions</a></li>
<li><a href="https://blogs.msdn.microsoft.com/#granular-control-mapped-type-modifiers">Granular control on mapped type modifiers</a></li>
<li><a href="https://blogs.msdn.microsoft.com/#organize-imports">Organize imports</a></li>
<li><a href="https://blogs.msdn.microsoft.com/#uninitialized-properties">Fixing uninitialized properties</a></li>
</ul>
<p>如果你升级版本，你需要记住一些细微部分的 <a href="https://gist.github.com/DanielRosenwasser/6f1913483c5699155ad0777dc37a59b1#breaking-changes">调整</a> .</p>
<p>除此之外，让我们来看看 TypeScript 2.8带来的新功能吧！!</p>
<h2>条件类型 （Conditional types）</h2>
<p>条件类型是 TypeScript 中的一个新构造，它允许我们根据其他类型来选择类型。
它们的表现形式是：</p>
<pre><code class="hljs groovy">A <span class="hljs-keyword">extends</span> B ? C : D
</code></pre><p>其中a，b，c和d是所有类型。
你应将其看作 " 当类型a可赋值给b时，那么这种类型是c;
否则，它是d。"
如果你曾在JavaScript中使用过条件语法，你将会感到很熟悉。</p>
<p>我们举两个具体的例子：</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">interface</span> Animal {
    live(): <span class="hljs-built_in">void</span>;
}
<span class="hljs-keyword">interface</span> Dog <span class="hljs-keyword">extends</span> Animal {
    woof(): <span class="hljs-built_in">void</span>;
}

<span class="hljs-comment">// 类型是 'number'</span>
<span class="hljs-keyword">type</span> Foo = Dog <span class="hljs-keyword">extends</span> Animal ? <span class="hljs-built_in">number</span> : <span class="hljs-built_in">string</span>;
<span class="hljs-comment">// 类型是 'string'</span>
<span class="hljs-keyword">type</span> Bar = <span class="hljs-built_in">RegExp</span> <span class="hljs-keyword">extends</span> Dog ? <span class="hljs-built_in">number</span> : <span class="hljs-built_in">string</span>;
</code></pre><p>你可能会想知道改变为什么会立即生效。我们可以知道 <code>Foo</code> 是数字，而 <code>Bar</code> 会是字符串，所以我们不妨明确地写出它。但条件类型的真正强大之处来自于它们与泛型的使用。</p>
<p>例如，让我们来看看以下几个方法：</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">interface</span> Id { id: <span class="hljs-built_in">number</span>, <span class="hljs-comment">/* other fields */</span> }
<span class="hljs-keyword">interface</span> Name { name: <span class="hljs-built_in">string</span>, <span class="hljs-comment">/* other fields */</span> }

<span class="hljs-keyword">declare</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createLabel</span>(<span class="hljs-params">id: <span class="hljs-built_in">number</span></span>): <span class="hljs-title">Id</span></span>;
<span class="hljs-keyword">declare</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createLabel</span>(<span class="hljs-params">name: <span class="hljs-built_in">string</span></span>): <span class="hljs-title">Name</span></span>;
<span class="hljs-keyword">declare</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createLabel</span>(<span class="hljs-params">name: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span></span>): <span class="hljs-title">Id</span> | <span class="hljs-title">Name</span></span>;
</code></pre><p>这些用于<code>createlabel</code>的重载，向我们展示了一个根据其输入类型作出选择的单个javascript函数。请注意以下两点：</p>
<ol>
<li>如果一个资源必须在整个api中反复进行同样的选择，这会变得很麻烦。</li>
<li>我们必须创建三个重载：一个用于确定类型的每个案例，另一个用于最常见的案例。
对于我们必须处理的其他情况，重载次数会呈指数级增长。</li>
</ol>
<p>相反，我们可以使用条件类型将我们的两个重载忽略到一个，并创建一个类型别名，以便我们可以重用该逻辑。</p>
<pre><code class="hljs scala"><span class="hljs-class"><span class="hljs-keyword">type</span> <span class="hljs-title">IdOrName&lt;T</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">number</span> <span class="hljs-title">|</span> <span class="hljs-title">string&gt;=T</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">number</span> <span class="hljs-title">?</span> <span class="hljs-title">Id</span> </span>: <span class="hljs-type">Name</span>;
declare function createLabel&lt;<span class="hljs-type">T</span> <span class="hljs-keyword">extends</span> number | string&gt;(idOrName: <span class="hljs-type">T</span>): <span class="hljs-type">T</span> <span class="hljs-keyword">extends</span> number ? <span class="hljs-type">Id</span> : <span class="hljs-type">Name</span>;
let a = createLabel(<span class="hljs-string">"typescript"</span>);
<span class="hljs-comment">// Name</span>
let b = createLabel(<span class="hljs-number">2.8</span>);
<span class="hljs-comment">// Id</span>
let c = createLabel(<span class="hljs-string">""</span> as any);
<span class="hljs-comment">// Id | Name</span>
let d = createLabel(<span class="hljs-string">""</span> as never);
<span class="hljs-comment">// never</span>
</code></pre><p>如同JavaScript可以根据一个值的特性在运行时做出决定一般，条件类型让 TypeScript 根据其他类型的特征在类型系统中作出判断。</p>
<p>作为另一个例子，我们也可以编写一个名为<code>flatten</code>的类型，将数组类型平移为它们的元素类型，但是另外保留它们：</p>
<pre><code class="hljs excel">// 如果我们有一个数组，当我们用 'number' 索引时，将会得到这个类型。
// 否则，单独留下类型。
<span class="hljs-built_in">type</span> Flatten`&lt;<span class="hljs-built_in">T</span>&gt;`
= <span class="hljs-built_in">T</span> extends any[] ? <span class="hljs-built_in">T</span>[number] <span class="hljs-symbol">:</span> <span class="hljs-built_in">T</span>;
</code></pre><h3>在条件类型内的推断</h3>
<p>条件类型也为我们提供了一种方法，通过使用 <code>infer</code> 关键字从我们在真正分支中比较的类型推断出来。例如，我们可以在<code>flatten</code>中推断出元素类型，而不用去动手取出它</p>
<pre><code class="hljs excel">// 我们可以使用 '(infer U)[]' 而不是 'Array`&lt;infer U&gt;`'
<span class="hljs-built_in">type</span> Flatten`&lt;<span class="hljs-built_in">T</span>&gt;`
= <span class="hljs-built_in">T</span> extends Array`&lt;infer U&gt;`
? U <span class="hljs-symbol">:</span> <span class="hljs-built_in">T</span>;
</code></pre><p>在这里，我们已经声明式地引入了一个名为<code>u</code> 的新的泛型类型变量，而不是指定如何检索 <code>t</code>的元素类型。这使我们不再考虑如何获取想要的类型。</p>
<h3>通过条件分配给联合体（ unions ）</h3>
<p>当条件类型对单个类型参数起作用时，它们分布在各个联合体中。 所以在下面的例子中，<code>Bar</code>的类型是 <code>string [] | number []</code> 因为<code>Foo</code>应用于联合类型<code>string |number</code>。</p>
<pre><code class="hljs applescript">type Foo`&lt;T&gt;`= T extends any ? T[] : never;
/**
 * Foo distributes <span class="hljs-keyword">on</span> '<span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>' <span class="hljs-keyword">to</span> <span class="hljs-keyword">the</span> type
 *
 *    (<span class="hljs-built_in">string</span> extends any ? <span class="hljs-built_in">string</span>[] : never) |
 *    (<span class="hljs-built_in">number</span> extends any ? <span class="hljs-built_in">number</span>[] : never)
 * 
 * which boils down <span class="hljs-keyword">to</span>
 *
 *    <span class="hljs-built_in">string</span>[] | <span class="hljs-built_in">number</span>[]
 */
type Bar = Foo&lt;<span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>&gt;;
</code></pre><p>如果你想要避免在联合体（unions）中发布内容，则可以使用中括号括住“extends”关键字的两侧：</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">type</span> Foo<span class="hljs-string">`&lt;T&gt;`</span> = [T] <span class="hljs-keyword">extends</span> [<span class="hljs-built_in">any</span>] ? T[] : never;
<span class="hljs-comment">// Boils down to Array&lt;string | number&gt;</span>
<span class="hljs-keyword">type</span> Bar = Foo&lt;<span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>&gt;;
</code></pre><p>虽然条件类型起初可能看起来有点吓人，但当你需要进一步推动类型系统以获得准确类型时，我们相信它们将为你带来大量的灵活性。</p>
<h3>新的内置助手</h3>
<p>TypeScript 2.8 在<code>lib.d.ts</code>中提供了几种利用条件类型的新类型别名：</p>
<pre><code class="hljs scala"><span class="hljs-comment">// 这些都已经内置到lib.d.ts中！</span>

<span class="hljs-comment">/**
 * Exclude from T those types that are assignable to U
 */</span>
<span class="hljs-class"><span class="hljs-keyword">type</span> <span class="hljs-title">Exclude</span>`<span class="hljs-title">&lt;T</span>, <span class="hljs-title">U&gt;</span>` </span>= <span class="hljs-type">T</span> <span class="hljs-keyword">extends</span> <span class="hljs-type">U</span> ? never : <span class="hljs-type">T</span>;

<span class="hljs-comment">/**
 * Extract from T those types that are assignable to U
 */</span>
<span class="hljs-class"><span class="hljs-keyword">type</span> <span class="hljs-title">Extract</span>`<span class="hljs-title">&lt;T</span>, <span class="hljs-title">U&gt;</span>` </span>= <span class="hljs-type">T</span> <span class="hljs-keyword">extends</span> <span class="hljs-type">U</span> ? <span class="hljs-type">T</span> : never;

<span class="hljs-comment">/**
 * Exclude null and undefined from T
 */</span>
<span class="hljs-class"><span class="hljs-keyword">type</span> <span class="hljs-title">NonNullable</span>`<span class="hljs-title">&lt;T&gt;</span>` </span>= <span class="hljs-type">T</span> <span class="hljs-keyword">extends</span> <span class="hljs-literal">null</span> | undefined ? never : <span class="hljs-type">T</span>;

<span class="hljs-comment">/**
 * Obtain the return type of a function type
 */</span>
<span class="hljs-class"><span class="hljs-keyword">type</span> <span class="hljs-title">ReturnType</span>`<span class="hljs-title">&lt;T</span> <span class="hljs-keyword">extends</span> (<span class="hljs-params">...args: any[]</span>) <span class="hljs-title">=&gt;</span>` <span class="hljs-title">any&gt;</span> </span>= <span class="hljs-type">T</span> <span class="hljs-keyword">extends</span> (...args: any[]) =&gt; infer <span class="hljs-type">R</span> ? <span class="hljs-type">R</span> : any;

<span class="hljs-comment">/**
 * Obtain the return type of a constructor function type
 */</span>
<span class="hljs-class"><span class="hljs-keyword">type</span> <span class="hljs-title">InstanceType</span>`<span class="hljs-title">&lt;T</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">new</span> (<span class="hljs-params">...args: any[]</span>) <span class="hljs-title">=&gt;</span>` <span class="hljs-title">any&gt;</span> </span>= <span class="hljs-type">T</span> <span class="hljs-keyword">extends</span> <span class="hljs-keyword">new</span> (...args: any[]) =&gt; infer <span class="hljs-type">R</span> ? <span class="hljs-type">R</span> : any;
</code></pre><p>而<code>Nonnullable</code>，<code>Returntype</code>和<code>Instancetype</code>相对不言而喻，<code>Exclude</code>和<code>Extract</code>则更有趣一些。</p>
<p><code>Extract</code> 从第一个参数中选择用于给第二个参数分配的类型：</p>
<pre><code class="hljs typescript"><span class="hljs-comment">// string[] | number[]</span>
<span class="hljs-keyword">type</span> Foo = Extract&lt;<span class="hljs-built_in">boolean</span> | <span class="hljs-built_in">string</span>[] | <span class="hljs-built_in">number</span>[], <span class="hljs-built_in">any</span>[]&gt;;
</code></pre><p><code>Exclude</code> 则相反，它从第一个参数中删除不能分配给第二个参数的类型 :</p>
<pre><code class="hljs typescript"><span class="hljs-comment">// boolean</span>
<span class="hljs-keyword">type</span> Bar = Exclude&lt;<span class="hljs-built_in">boolean</span> | <span class="hljs-built_in">string</span>[] | <span class="hljs-built_in">number</span>[], <span class="hljs-built_in">any</span>[]&gt;;
</code></pre><h2>只有声明才会发出</h2>
<p>感谢来自<a href="https://github.com/nojvek">Manoj Patel</a>的<a href="https://github.com/Microsoft/TypeScript/pull/20735">一个pull请求</a>，TypeScript 现在提供了一个<code>--emitDeclarationOnly</code>标志，当你有一个发送JavaScript文件的替代构建步骤时，可以使用这个标志，但需要单独发出声明文件。
在这种模式下，不会生成JavaScript文件和源代码文件;只是可以用于资源使用者的<code>.d.ts</code>文件。</p>
<p>其中一个用例就是使用备用编译器来处理TypeScript，例如babel 7.对于利用此标志的存储库示例，check out <a href="https://github.com/FormidableLabs/urql/tree/ce9fb3cc02c8530e0b70cfb31d09690dab8b02dc">urql from Formidable Labs</a>，或查看<a href="https://github.com/Microsoft/TypeScript-Babel-Starter">our Babel starter repo</a>。</p>
<h2><code>@jsx</code> 预处理指令（pragma comments）</h2>
<p>通常，jsx的用户希望将其jsx标记重写为<code>React.createElement</code>。然而，如果你使用的库有类似React的工厂api，比如Preact, Stencil, Inferno, Cycle其他等，你可能想稍微调整一下。</p>
<p>曾经，TypeScript 只允许用户使用<code>jsxFactory</code>选项（以及不赞成使用的<code>reactNamespace</code>选项）在全局级别控制jsx的发送。但如果你想在同一个应用程序中混合使用这些库，那 jsx 将无法使用。</p>
<p>幸运的是，TypeScript 2.8现在允许你通过在文件顶部添加一个<code>// @ jsx</code>注释来逐个文件地设置你的jsx工厂。如果你在babel中使用了相同的功能，这应该看起来有些熟悉。</p>
<pre><code class="hljs javascript"><span class="hljs-comment">/** @jsx dom */</span>
<span class="hljs-keyword">import</span> { dom } <span class="hljs-keyword">from</span> <span class="hljs-string">"./renderer"</span>
&lt;h&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h</span>&gt;</span></span>
</code></pre><p>上面的示例导入了一个名为<code>dom</code>的函数，并使用<code>jsx</code>编译指示选择<code>dom</code>作为文件中所有jsx表达式的工厂。TypeScript 2.8 在编译为commonjs和es5时会将其重写为以下内容：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">var</span> renderer_1 = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./renderer"</span>);
renderer_1.dom(<span class="hljs-string">"h"</span>, <span class="hljs-literal">null</span>);
</code></pre><h2><code>JSX</code> 通过jsx工厂解决</h2>
<p>目前，当typescript使用jsx时，它会查找全局<code>JSX</code>命名空间来查找某些类型（例如“什么是jsx组件的类型？”）。在 TypeScript 2.8中，编译器将尝试根据jsx工厂的位置查找<code>JSX</code>命名空间。例如，如果您的jsx工厂是<code>React.createElement</code>，那么 TypeScript 将尝试首先解析<code>React.JSX</code>，然后解析当前范围内的<code>JSX</code>。</p>
<p>当混合和匹配不同库（例如: React 和 Preact）或特定库的不同版本（例如: React14和React16）时，这可能是有用的，因为将jsx名称空间放置在全局范围中可能导致问题。</p>
<p>今后，我们建议新的面向jsx的库避免将<code>JSX</code>放在全局范围内，而是将它从相应的工厂函数的相同位置导出。然而，为了能够向后兼容，TypeScript 将在必要时继续回落到全局范围。</p>
<h2>精确地控制映射类型的修饰符</h2>
<p>TypeScript 的映射对象类型是一个非常强大的构造。它有个便利的功能：是允许用户创建新的类型，其中包含为其所有属性设置的修饰符。例如，以下类型创建一个基于<code>T</code>的新类型，并且<code>T</code>中的每个属性都变为<code>只读</code>和可选(<code>?</code>)。</p>
<pre><code class="hljs elm">// 创建一个包含 <span class="hljs-type">T</span> 中所有属性的类型，,
// 但标记为只读和可选.
<span class="hljs-keyword">type</span> <span class="hljs-type">ReadonlyAndPartial</span>`&lt;<span class="hljs-type">T</span>&gt;` = {
    readonly [<span class="hljs-type">P</span> in keyof <span class="hljs-type">T</span>]?: <span class="hljs-type">T</span>[<span class="hljs-type">P</span>]
}
</code></pre><p>所以映射的对象类型可以添加修饰符，但直到此时，无法从<code>T</code>删除<em>remove</em>修饰符。</p>
<p>TypeScript 2.8提供了用<code>-</code>运算符去除映射类型中的修饰符的新语法，以及用<code>+</code>运算符添加修饰符的新的更加明确的语法。例如:</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">type</span> Mutable<span class="hljs-string">`&lt;T&gt;`</span> = {
    -readonly [P <span class="hljs-keyword">in</span> keyof T]: T[P]
}

<span class="hljs-keyword">interface</span> Foo {
    readonly abc: <span class="hljs-built_in">number</span>;
    def?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// 'abc'</span>
is no longer read-only, but <span class="hljs-string">'def'</span>
is still optional.
<span class="hljs-keyword">type</span> TotallyMutableFoo = Mutable<span class="hljs-string">`&lt;Foo&gt;`</span>
</code></pre><p>在上面的例子中，<code>Mutable</code>从它映射的类型的每个属性中删除<code>readonly</code>。
同样，TypeScript 现在在<code>lib.d.ts</code>中提供了一个新的<code>Required</code>类型，用于从每个属性中删除选项：</p>
<pre><code class="hljs elm">/**
 * <span class="hljs-type">Make</span> all properties <span class="hljs-keyword">in</span> <span class="hljs-type">T</span> required
 */
<span class="hljs-keyword">type</span> <span class="hljs-type">Required</span>`&lt;<span class="hljs-type">T</span>&gt;` = {
    [<span class="hljs-type">P</span> in keyof <span class="hljs-type">T</span>]-?: <span class="hljs-type">T</span>[<span class="hljs-type">P</span>];
}
</code></pre><p>当你想调出一个映射类型添加修饰符时，<code>+</code>操作符可以很方便的实现。例如，我们从上面的<code>ReadonlyAndPartial</code>可以定义如下：</p>
<pre><code class="hljs elm"><span class="hljs-keyword">type</span> <span class="hljs-type">ReadonlyAndPartial</span>`&lt;<span class="hljs-type">T</span>&gt;` = {
    +readonly [<span class="hljs-type">P</span> in keyof <span class="hljs-type">T</span>]+?: <span class="hljs-type">T</span>[<span class="hljs-type">P</span>];
}
</code></pre><h2>组织导入（Organize imports）</h2>
<p>TypeScript 的语言服务现在提供了组织导入的功能。此功能将删除所有未使用的导入，按文件路径对现有导入进行排序，并对命名导入进行排序。</p>
<p><img src="https://p0.ssl.qhimg.com/t01b5a3ee0d3f639578.gif" alt=""></p>
<h2>修复未初始化的属性</h2>
<p>TypeScript 2.7引入了对类中未初始化属性的额外检查，感谢来自<a href="https://github.com/Kingwl">Wenlu Wang</a> 的<a href="https://github.com/Microsoft/TypeScript/pull/21528">a pull request</a>。 TypeScript 2.8带来了一些有用的快速修复，使其更容易添加到您的代码库中。</p>
<p><img src="https://p0.ssl.qhimg.com/t018fdcb62c9f7b564e.gif" alt=""></p>
<h2>突破性的改变</h2>
<h3>在<code>--noUnusedParameters</code>下检查未使用的类型参数</h3>
<p>未使用的类型参数先前在<code>--noUnusedLocals</code>下报告过，但是现在报告在<code>--noUnusedParameters</code>下。</p>
<h3><code>HTMLObjectElement</code> 不再具有 <code>alt</code> 属性</h3>
<p>这种行为不包含在 WHATWG 标准中。</p>
<h2>下一步是什么？</h2>
<p>我们希望 TypeScript 2.8能够进一步推动 envelope 提供一种真正代表 JavaScript 作为语言本质的类型系统。因此，我们相信我们可以在你编码的过程中，为你创造出一种更高效、更快乐的体验。 </p>
<p>在接下来的几周内，我们将更清楚地了解 TypeScript 2.9的存储情况，但是和往常一样，你可以留意 <a href="https://github.com/Microsoft/TypeScript/wiki/Roadmap">TypeScript 路线图</a> ，看看我们正在为下一个版本做些什么。你也可以尝试我们的夜间发布，今天就能体验未来！例如，通用的jsx元素已经出现在 TypeScript 最近的夜间版本中！</p>
<p>让我们知道你对这个版本的看法，请写在<a href="http://twitter.com/typescriptlang/">Twitter</a> 上或者在下面的评论中, 并随时向我们提交建议和 <a href="https://github.com/Microsoft/TypeScript/issues">a GitHub issue</a>.</p>
<p>可劲儿造吧！（Happy Hacking!）</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Announcing TypeScript 2.8

## 原文链接
[https://www.zcfy.cc/article/announcing-typescript-2-8](https://www.zcfy.cc/article/announcing-typescript-2-8)

