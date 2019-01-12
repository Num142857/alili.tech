---
title: '从 JavaScript 到 TypeScript - 声明类型' 
date: 2019-01-13 2:30:11
hidden: true
slug: ot1d53crzc
categories: [reprint]
---

{{< raw >}}

                    
<p>从 JavaScript 语法改写为 TypeScript 语法，有两个关键点，一点是类成员变量(Field)需要声明，另一点是要为各种东西(变量、参数、函数/方法等)声明类型。而这两个点直接引出了两个关键性的问题，有哪些类型？怎样声明？</p>
<h2 id="articleHeader0">类型</h2>
<p>在说 TypeScript 的类型之前，我们先复习一下 JavaScript 的七种类型：</p>
<ul>
<li><p>undefined</p></li>
<li><p>function</p></li>
<li><p>boolean</p></li>
<li><p>number</p></li>
<li><p>string</p></li>
<li><p>object</p></li>
<li><p>symbol</p></li>
</ul>
<p>这七种类型都是可以通过 <code>typeof</code> 运算符算出来的，但其中并没有我们常见的 <code>Array</code>、<code>null</code>，<code>Date</code> 之类的类型——因为它们其实都是 <code>object</code>。</p>
<p>TypeScript 的重要特性之一就是类型，所以 TypeScript 中的类型要讲究得多，除了 JavaScript 中的类型之外，还定义了其它一些(不完全列表)</p>
<ul>
<li><p><code>Array&lt;T&gt;</code>，或 <code>T[]</code>，表示 T 类型的数组</p></li>
<li><p><code>null</code>，空类型，其作用与 <code>strictNullChecks</code> 编译参数有关</p></li>
<li><p>Tuple(元组)，形如 <code>[Number, String]</code></p></li>
<li><p><code>enum T</code>，定义枚举类型 <code>T</code>，可理解为集中对数值常量进行命名</p></li>
<li><p><code>interface T</code>，接口，<code>T</code> 是一种接口类型</p></li>
<li><p><code>class T</code>，类，<code>T</code> 是一种类型</p></li>
<li><p><code>any</code>，代表任意类型</p></li>
<li><p><code>void</code>，表示没有类型，用于声明函数类型</p></li>
<li><p><code>never</code>，表示函数不可返回的神奇类型</p></li>
<li><p>……</p></li>
</ul>
<p>具体的类型这里就不详述了，官方 Handbook 的 <a href="http://www.typescriptlang.org/docs/handbook/classes.html" rel="nofollow noreferrer" target="_blank">Basic Type</a>、<a href="http://www.typescriptlang.org/docs/handbook/interfaces.html" rel="nofollow noreferrer" target="_blank">Interfaces</a>、<a href="http://www.typescriptlang.org/docs/handbook/classes.html" rel="nofollow noreferrer" target="_blank">Classes</a>、<a href="http://www.typescriptlang.org/docs/handbook/enums.html" rel="nofollow noreferrer" target="_blank">Enum</a>、<a href="http://www.typescriptlang.org/docs/handbook/advanced-types.html" rel="nofollow noreferrer" target="_blank">Advanced Types</a> 这几部分说得非常清楚。</p>
<p>不过仍然有一种类型相关的特性不得不提——泛型。如果只是说数据类型，纯粹的 JSer 们还可以理解，毕竟类型不是新鲜玩意儿，只是扩展了点种类。但是泛型这个东西，纯粹的 JSer 们可能就没啥概念了。</p>
<p>泛型主要是用一个符号来表示一些类型，只要是符合约束条件(默认无约束)的类型，都可以替换掉这个类型符号来使用，比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test<T>(v: T) {
    console.log(v);
}

test<boolean>(true);    // 显式指定 T 由 boolean 替代
test(&quot;hello&quot;);          // 推断(隐式) T 被 string 替代
test(123);              // 推断(隐式) T 被 number 替代" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>&lt;<span class="hljs-title">T</span>&gt;(<span class="hljs-params">v: T</span>) </span>{
    <span class="hljs-built_in">console</span>.log(v);
}

test&lt;<span class="hljs-built_in">boolean</span>&gt;(<span class="hljs-literal">true</span>);    <span class="hljs-comment">// 显式指定 T 由 boolean 替代</span>
test(<span class="hljs-string">"hello"</span>);          <span class="hljs-comment">// 推断(隐式) T 被 string 替代</span>
test(<span class="hljs-number">123</span>);              <span class="hljs-comment">// 推断(隐式) T 被 number 替代</span></code></pre>
<p>泛型与强类型相关，即需要进行严格的类型检查，又想少写相似代码，所以干脆用某个符号来代替类型。泛型这个名称本身可能并不是很好理解，但是如果借用 C++ 的“模板”概念，就好理解了。比如上面的泛型函数，根据后面的调用，可以被解释为三个函数，相当于套用模板，用实际类型代替了 <code>T</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test(v: boolean) { ... }
function test(v: string) { ... }
function test(v: number) { ... }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params">v: <span class="hljs-built_in">boolean</span></span>) </span>{ ... }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params">v: <span class="hljs-built_in">string</span></span>) </span>{ ... }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params">v: <span class="hljs-built_in">number</span></span>) </span>{ ... }</code></pre>
<p>关于泛型，更详细的内容可以参考 Handbook 的 <a>Generic</a> 部分。</p>
<p>类型就简述到这里，简单的类型一看就能明白，高级一点的类型我们以后再开专题来详述。不过既然选择使用 TypeScript，必然会用到它的静态类型特性，那就必须强化识别类型的意识，并养成这样的习惯。对于纯 JSer 来说，这是一个巨大的挑战。</p>
<h2 id="articleHeader1">声明类型</h2>
<p>声明类型，主要是指声明变量/常量，函数/方法和类成员的类型。JS 中使用 var 声明一个变量，ES6 扩展了 let 和 const。这几种声明 TypeScript 都支持。要为变量或者常量指定类型也很简单，就是在变量/常量名后面加个冒号，再指定类型即可，比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// # typescript

// 声明函数 pow 是 number 类型，即返回值是 number 类型
// 声明参数 n 是 number 类型
function pow(n: number): number {
    return n * n;
}

// 声明 test 是无返回值的
function test(): void {
    for (let i: number = 0; i < 10; i++) {  // 声明 i 是 number
        console.log(pow(i));
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// # typescript</span>

<span class="hljs-comment">// 声明函数 pow 是 number 类型，即返回值是 number 类型</span>
<span class="hljs-comment">// 声明参数 n 是 number 类型</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pow</span>(<span class="hljs-params">n: number</span>): <span class="hljs-title">number</span> </span>{
    <span class="hljs-keyword">return</span> n * n;
}

<span class="hljs-comment">// 声明 test 是无返回值的</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>): <span class="hljs-title">void</span> </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i: number = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {  <span class="hljs-comment">// 声明 i 是 number</span>
        <span class="hljs-built_in">console</span>.log(pow(i));
    }
}</code></pre>
<p>这段代码演示了对函数类型、参数类型和变量类型地声明。这相对于 JavaScript 代码来说，似乎变得更复杂了。但是考虑下，如果我们在某处不小心这样调用了 <code>pow</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// # javascript

let n = &quot;a&quot;;
let r = pow(n);     // 这里存在一个潜在的错误" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// # javascript</span>

<span class="hljs-keyword">let</span> n = <span class="hljs-string">"a"</span>;
<span class="hljs-keyword">let</span> r = pow(n);     <span class="hljs-comment">// 这里存在一个潜在的错误</span></code></pre>
<p>JavaScript 不会提前检查错误的，只有在执行到 <code>r = pow(n)</code> 的时候给 <code>r</code> 赋值为 <code>NaN</code>。然后如果别处又用到 <code>r</code>，可能就会造成连锁错误，可能很要调试一阵才把问题找得出来。</p>
<p>不过上面两行代码在 TypeScript 里是通不过转译的，它会报告一个类型不匹配的错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Argument of type 'string' is not assignable to parameter of type 'number'." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code style="word-break: break-word; white-space: initial;">Argument <span class="hljs-keyword">of</span> <span class="hljs-keyword">type</span> <span class="hljs-string">'string'</span> <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> assignable <span class="hljs-keyword">to</span> parameter <span class="hljs-keyword">of</span> <span class="hljs-keyword">type</span> <span class="hljs-string">'number'</span>.</code></pre>
<h2 id="articleHeader2">声明类成员</h2>
<p>这时先来看一段 JavaScript 代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// # javascript (es6)

class Person {
    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// # javascript (es6)</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
    <span class="hljs-keyword">constructor</span>(name) {
        <span class="hljs-keyword">this</span>._name = name;
    }

    get name() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._name;
    }
}</code></pre>
<p>这段 JavaScript 代码如果翻译成 TypeScript 代码，会是这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// # typescript

class Person {
    private _name: string;

    public constructor(name: string) {
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// # typescript</span>

<span class="hljs-keyword">class</span> Person {
    <span class="hljs-keyword">private</span> _name: <span class="hljs-built_in">string</span>;

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">constructor</span>(<span class="hljs-params">name: <span class="hljs-built_in">string</span></span>) {
        <span class="hljs-keyword">this</span>._name = name;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">get</span> name(): <span class="hljs-built_in">string</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._name;
    }
}</code></pre>
<p>注意到 <code>private _name: string</code>，这句话是在声明类成员变量 <code>_name</code>。JavaScript 里是不需要声明的，对 <code>this._name</code> 赋值，它自然就有了，但在 TypeScript 里如果不声明，就会报告属性不存在的错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Property '_name' does not exist on type 'Person'." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">Property</span> <span class="hljs-string">'_name'</span> does <span class="hljs-keyword">not</span> exist <span class="hljs-keyword">on</span> <span class="hljs-keyword">type</span> <span class="hljs-string">'Person'</span>.</code></pre>
<p>虽然写起来麻烦了一点，但是我也能理解 TypeScript 的苦衷。如果没有这些声明，tsc 就搞不清楚你在使用 <code>obj.xxxx</code> 或者 <code>this.xxxx</code> 的时候，这个 <code>xxxx</code> 到底确实是你想要添加的属性名称呢，还是你不小心写错了的呢？</p>
<p>另外要注意到的是 <code>private</code> 和 <code>public</code> 修饰符。JavaScript 中存在私有成员，为了实现私有，大家都想了不少办法，比如闭包。</p>
<p>TypeScript 提供了 <code>private</code> 来修饰私有成员，<code>protected</code> 修改保护(子类可用)成员，<code>public</code> 修饰公共成员。如果不添加修饰符，默认作为 <code>public</code>，以兼容 JavaScript 的类成员定义。不过特别需要注意的是，这些修饰符只在 TypeScript 环境(比如转译过程)有效，转译成 JavaScript 之后，仍然所有成员都是公共访问权限的。比如上例中的 TypeScript 代码转译出来基本上就是之前的 JavaScript 代码，其 <code>_name</code> 属性在外部仍可访问。</p>
<p>当然在 TypeScript 代码中，如果外部访问了 <code>_name</code>，tsc 是会报告错误的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Property '_name' is private and only accessible within class 'Person'." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">Property</span> <span class="hljs-string">'_name'</span> <span class="hljs-keyword">is</span> <span class="hljs-keyword">private</span> <span class="hljs-keyword">and</span> only accessible within <span class="hljs-keyword">class</span> <span class="hljs-string">'Person'</span>.</code></pre>
<p>所以应用内使用 <code>private</code> 完全没问题，但是如果你写的东西需要做为第三方库发布，那就要想一些手段来进行“私有化”了，其手段和 JavaScript 并没什么不同。</p>
<h2 id="articleHeader3">小结</h2>
<p>从 JavaScript 语法改写 TypeScript 语法，我们来做个简单的总结：</p>
<ol>
<li><p>类成员需要声明。</p></li>
<li><p>变量、函数参数和返回值需要申明类型。</p></li>
</ol>
<p>如果所有这些东西都要声明类型，工作量还是满大的，所以我建议：就接口部分声明类型。也就是说，类成员、函数/方法的参数和返回类型要声明类型，便于编辑器进行语法提示，局部使用的变量或者箭头函数，在能明确推导出其类型的时候，可以不声明类型。</p>
<h2 id="articleHeader4">扩展阅读</h2>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000008996172">从 JavaScript 到 TypeScript - 模块化和构建</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000010774159" target="_blank">从 JavaScript 到 TypeScript - 泛型</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000010979494">从 JavaScript 到 TypeScript - 接口</a></p></li>
</ul>
<hr>
<p>关注作者的公众号“边城客栈” →</p>
<p><span class="img-wrap"><img data-src="https://sfault-avatar.b0.upaiyun.com/291/548/2915488432-59576fecc6382_huge256" src="https://static.alili.techhttps://sfault-avatar.b0.upaiyun.com/291/548/2915488432-59576fecc6382_huge256" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从 JavaScript 到 TypeScript - 声明类型

## 原文链接
[https://segmentfault.com/a/1190000009653948](https://segmentfault.com/a/1190000009653948)

