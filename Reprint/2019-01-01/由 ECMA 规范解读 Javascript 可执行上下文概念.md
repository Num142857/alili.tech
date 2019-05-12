---
title: '由 ECMA 规范解读 Javascript 可执行上下文概念' 
date: 2019-01-01 2:30:07
hidden: true
slug: kvm1l1mbytb
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<blockquote><p>其实规范这东西不是给人看的，它更多的是给语言实现者提供参考。但是当碰到问题找不到答案时，规范往往能提供想要的答案 。偶尔读一下能够带来很大的启发和思考，如果只读一章 Javascript 规范，大神们觉得非第10章莫属。</p></blockquote>
<p>我们来试试看，这次选用的是 <code>ECMA2.2</code>的 5.1 版，整个规范才200页， 而第10章共10页，可以感受到 <code>Javascript</code> 的精简，目前的版本加了太多 ES6 的东西，让人望而生畏。</p>
<p>资料地址：<a href="http://www.ecma-international.org/ecma-262/5.1/Ecma-262.pdf" rel="nofollow noreferrer" target="_blank">http://www.ecma-international...</a></p>
<h2 id="articleHeader1">任务</h2>
<p>阅读 <code>ECMA262</code> 5.1 第10章 <code>Executable Code and Execution Contexts</code> (可执行代码与执行上下文)<br>你能针对这章内容提出问题吗？ 即知道答案找出问题。<br>你能使用图来更形象地表达文章内容吗？</p>
<h2 id="articleHeader2">开始我们的探险之旅</h2>
<p>原汁原味 <a href="http://www.ecma-international.org/ecma-262/5.1" rel="nofollow noreferrer" target="_blank">ECMAScript 5.1 英文版</a><br>平易近人 <a href="https://www.w3.org/html/ig/zh/wiki/ES5/%E5%8F%AF%E6%89%A7%E8%A1%8C%E4%BB%A3%E7%A0%81%E4%B8%8E%E6%89%A7%E8%A1%8C%E7%8E%AF%E5%A2%83" rel="nofollow noreferrer" target="_blank">ECMAScript 5.1 中文版</a></p>
<h2 id="articleHeader3">可执行代码类型</h2>
<blockquote><p>像 <code>v8</code> 等 <code>JavaScript</code> 引擎都是按照 <code>ecma-262</code> 的规范来实现的，<code>JavaScript</code> 引擎在解释 <code>JavaScript</code> 代码时，将可执行代码分为了三种。分别是：</p></blockquote>
<ul>
<li>
<p><strong>全局代码</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="代码加载时首先进入的环境。
例如加载外部的 JavaScript 文件或者本地 <script></script> 标签内的代码。
但不包括任何 function 体内的代码。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>代码加载时首先进入的环境。
例如加载外部的 JavaScript 文件或者本地 <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> 标签内的代码。
但不包括任何 function 体内的代码。
</code></pre>
</li>
<li>
<p><strong> 函数代码</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="是指作为 function 被解析的源代码。
不包括作为其嵌套函数的 function 被解析的源代码。
因为 JavaScript 函数中还可以嵌套函数，因此这也是三种可执行代码中最复杂的一种。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>是指作为 <span class="hljs-keyword">function</span> <span class="hljs-title">被解析的源代码。</span>
不包括作为其嵌套函数的 <span class="hljs-keyword">function</span> <span class="hljs-title">被解析的源代码。</span>
因为 JavaScript 函数中还可以嵌套函数，因此这也是三种可执行代码中最复杂的一种。
</code></pre>
</li>
<li>
<p><strong> <code>eval</code>代码</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="指的是传递给 eval 内置函数的代码。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>指的是传递给 <span class="hljs-built_in">eval</span> 内置函数的代码。
</code></pre>
</li>
</ul>
<p>注：不了解 <code>eval（string）</code> 的小伙伴，请参考 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval" rel="nofollow noreferrer" target="_blank">eval() - JavaScript | MDN</a></p>
<blockquote><p>当 <code>JavaScript</code> 引擎开始执行（进入）一段可执行代码之后，会生成一个执行环境（Execution Context)，或执行上下文。引擎用执行环境来维护执行当前代码所需要的变量声明、this指向等。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVWLdR?w=1544&amp;h=516" src="https://static.alili.tech/img/bVWLdR?w=1544&amp;h=516" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">词法环境 (Lexical Environments)</h2>
<p><code>词法环境</code> 是执行环境的三个组成的状态之一。</p>
<p><code>官方解释：</code>词法环境是用来定义特定变量和函数标识符的。一个词法环境由一个<strong>环境记录项</strong>和可能为空的<strong>外部词法环境</strong>引用构成。</p>
<blockquote>
<p>通常词法环境会与 <code>ECMAScript</code> 代码诸如 <code>函数声明（FunctionDeclaration）</code>、<code>WithStatement</code> 或者 <code>TryStatement</code> 的 <code>Catch</code> 块这样的特定句法结构相联系，且类似代码每次执行都会<strong>有一个新的词法环境</strong>被创建出来。</p>
<p><strong>外部词法环境引用</strong> 用于表示词法环境的逻辑嵌套关系模型。（内部）词法环境的外部引用是逻辑上包含内部词法环境的词法环境。外部词法环境自然也可能有多个内部词法环境。</p>
<p>例如，如果一个 FunctionDeclaration 包含两个嵌套的 FunctionDeclaration，那么每个内嵌函数的词法环境都是外部函数本次执行所产生的词法环境。</p>
</blockquote>
<p><strong>环境记录项</strong> 又可以分为两种<strong>声明式环境记录项</strong>和<strong>对象式环境记录项</strong>。</p>
<p>声明式环境记录项 用于标识标识符和<code>函数声明</code>、<code>变量声明</code>、<code>catch 语句</code>等语法元素的绑定。对象式环境记录项 主要用于定义那些将标识符与具体对象的属性绑定的语法元素。</p>
<p>咬文嚼字，不好理解？</p>
<p><code>通俗点讲：</code> 词法环境就是 JavaScript 引擎在执行代码过程中用来标识函数声明、变量声明这一类的。我们每次声明一个函数，或者使用 <code>with</code> 、<code>catch</code>语句的时候，就会有新的词法环境被创建出来。全局词法环境的外部词法环境就是空的，因为他已经是最外层的词法环境了。</p>
<p>我们用个例子来说明词法环境：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 10;
function foo(y){
    var z = 30;
    function bar(q){
        return x+y+z+q;
    }
    return bar;
}
var bar = foo(20);
bar(40);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> x = <span class="hljs-number">10</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">y</span>)</span>{
    <span class="hljs-keyword">var</span> z = <span class="hljs-number">30</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params">q</span>)</span>{
        <span class="hljs-keyword">return</span> x+y+z+q;
    }
    <span class="hljs-keyword">return</span> bar;
}
<span class="hljs-keyword">var</span> bar = foo(<span class="hljs-number">20</span>);
bar(<span class="hljs-number">40</span>);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVWLfv?w=1858&amp;h=804" src="https://static.alili.tech/img/bVWLfv?w=1858&amp;h=804" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">词法环境的运算</h3>
<p>给出一个标识符字符串，首先在当前的词法环境内寻找，如果存在，返回引用的标识符字符串，如果不存在，再在当前词法环境的外部词法环境寻找。</p>
<p>咦，怎么感觉和作用域链的概念很相似？他们有什么关系吗？</p>
<ul>
<li>
<strong>执行环境</strong> 当执行流进入一个函数时，函数的环境会被推入一个环境栈中。当函数执行之后，环境栈将其弹出，把控制权返回给之前的执行环境。</li>
<li>
<strong>作用域链</strong> 当代码在一个环境中执行时，会创建变量对象的一个作用域链。其用途是保证对执行环境有权访问的所有变量和函数的<strong>有序访问</strong>。一个包含环境的变量对象到另一个包含环境的变量对象，最后到全局执行环境的变量对象。</li>
</ul>
<p>函数只要被创建，就会有自己的“地盘”，有自己的作用域。但是只有函数被执行的时候，才会有自己的执行环境。函数执行完毕的时候，执行环境就会退出。而且一个作用域下可能存在多个执行环境，比如闭包。</p>
<h3 id="articleHeader6">小总结</h3>
<p>1、词法环境分为了两部分：环境记录项和外部词法环境。<br>2、环境记录项根据绑定的 ECMA 脚本元素的不同也分为了两部分。<br>3、函数声明或者使用 <code>with</code> 、<code>catch</code>语句时，就会有新的词法环境被创建出来。</p>
<h2 id="articleHeader7">执行环境（Execution Contexts）</h2>
<p>如果我们的 <code>JavaScript</code> 程序有各种函数，函数之间还有嵌套的情况，那 <code>JavaScript</code> 引擎怎么解释各种声明和执行上下文哪？</p>
<p>当控制器转入 <code>ECMA</code> 脚本的可执行代码时，上文已经说了有三种可执行代码，不管进入哪一种控制器都会进入一个执行环境。多个执行环境在逻辑上形成一个<strong>栈结构</strong>。栈结构最顶层的执行环境称为当前运行的执行环境，最底层是全局执行环境。</p>
<p>用一张图解释</p>
<p><span class="img-wrap"><img data-src="/img/bVVL6D?w=1138&amp;h=610" src="https://static.alili.tech/img/bVVL6D?w=1138&amp;h=610" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>因为 JS 引擎被实现为单线程，也就是同一时间只能发生一件事情，其他的行为就会依次排队。</p>
<p>你可以有任意多个函数执行环境，每次调用函数创建一个新的执行环境，会创建一个私有作用域，函数内部声明的任何变量都不能在当前函数作用域外部直接访问。函数能访问当前执行环境外面的变量声明，但在外部执行环境不能访问内部的变量/函数声明。</p>
<h3 id="articleHeader8">小总结</h3>
<p>关于执行栈（调用栈）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="单线程。
同步执行。
一个全局上下文。
无限制函数上下文。
每次函数被调用创建新的执行上下文，包括调用自己。
return 或者抛出异常退出一个执行环境。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>单线程。
同步执行。
一个全局上下文。
无限制函数上下文。
每次函数被调用创建新的执行上下文，包括调用自己。
<span class="hljs-keyword">return</span> 或者抛出异常退出一个执行环境。
</code></pre>
<p>我们用一个具体的函数理解：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(i) {
  if (i < 0) return;
  console.log('begin:' + i);
  foo(i - 1);
  console.log('end:' + i);
}
foo(2);

// 输出:

// begin:2
// begin:1
// begin:0
// end:0
// end:1
// end:2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">i</span>) </span>{
  <span class="hljs-keyword">if</span> (i &lt; <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'begin:'</span> + i);
  foo(i - <span class="hljs-number">1</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'end:'</span> + i);
}
foo(<span class="hljs-number">2</span>);

<span class="hljs-comment">// 输出:</span>

<span class="hljs-comment">// begin:2</span>
<span class="hljs-comment">// begin:1</span>
<span class="hljs-comment">// begin:0</span>
<span class="hljs-comment">// end:0</span>
<span class="hljs-comment">// end:1</span>
<span class="hljs-comment">// end:2</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVUK78?w=1958&amp;h=1246" src="https://static.alili.tech/img/bVUK78?w=1958&amp;h=1246" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>代码的执行流程进入内部函数，创建一个新的执行上下文并把它压入执行栈的顶部。<strong>浏览器总会执行位于栈顶的执行上下文，一旦当前上下文函数执行结束，它将被从栈顶弹出，并将上下文控制权交给当前的栈。</strong> 这样，堆栈中的上下文就会被依次执行并且弹出堆栈，直到回到全局的上下文。</p>
<blockquote><p>执行环境包含所有用于追踪与其相关的代码的执行进度的状态。精确地说，每个执行环境包含如下表列出的组件。</p></blockquote>
<p>执行环境的三个状态</p>
<table>
<thead><tr>
<th>组件</th>
<th>作用目的</th>
</tr></thead>
<tbody>
<tr>
<td>词法环境</td>
<td>指定一个词法环境对象，用于解析该执行环境内的代码创建的标识符引用。</td>
</tr>
<tr>
<td>变量环境</td>
<td>指定一个词法环境对象，其环境数据用于保存由该执行环境内的代码通过 变量表达式 和 函数表达式 创建的绑定。</td>
</tr>
<tr>
<td>this 绑定</td>
<td>指定该执行环境内的 <code>ECMA</code> 脚本代码中 <code>this</code> 关键字所关联的值。</td>
</tr>
</tbody>
</table>
<p>当创建一个执行环境时，其词法环境组件和变量环境组件最初是同一个值。在该执行环境相关联的代码的执行过程中，变量环境组件永远不变，而词法环境组件有可能改变。变量环境的不变和词法环境的可能改变都是指引用的改变。</p>
<p><span class="img-wrap"><img data-src="/img/bVWLdR?w=1544&amp;h=516" src="https://static.alili.tech/img/bVWLdR?w=1544&amp;h=516" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader9">建立执行环境</h2>
<blockquote>
<p>解释执行全局代码或使用 <code>eval</code> 函数输入的代码会创建并进入一个新的执行环境。每次调用 <code>ECMA</code> 脚本代码定义的函数也会建立并进入一个新的执行环境，即便函数是自身递归调用的。</p>
<p>每一次 <code>return</code> 都会退出一个执行环境。抛出异常也可退出一个或多个执行环境。</p>
<p><strong>当控制流进入一个执行环境时，会设置该执行环境的 <code>this</code> 绑定组件，定义变量环境和初始词法环境，并执行声明式绑定初始化过程。</strong>以上这些步骤的严格执行方式由进入的代码的类型决定。</p>
</blockquote>
<h3 id="articleHeader10">进入全局代码</h3>
<p>执行以下步骤：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、将变量环境设置为 全局环境 。 
2、将词法环境设置为 全局环境 。
3、将 this 绑定设置为 全局对象 。
4、使用全局代码执行声明式绑定初始化化步骤。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>、将变量环境设置为 全局环境 。 
<span class="hljs-number">2</span>、将词法环境设置为 全局环境 。
<span class="hljs-number">3</span>、将 this 绑定设置为 全局对象 。
<span class="hljs-number">4</span>、使用全局代码执行声明式绑定初始化化步骤。
</code></pre>
<h3 id="articleHeader11">进入函数代码</h3>
<blockquote><p>当控制流根据一个函数对象 F、调用者提供的 <code>thisArg</code> 以及调用者提供的 <code>argumentList</code>，进入函数代码的执行环境时，执行以下步骤</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如果函数代码是严格模式下的代码，设 this 绑定 为 thisArg。
否则如果 thisArg 是 null 或 undefined，则设 this 绑定 为全局对象。
否则如果 Type(thisArg) 的结果不为 Object，则设 this 绑定 为 ToObject(thisArg)。
否则设 this 绑定 为 thisArg。
以 F 的 [[Scope]] 内部属性为参数调用 NewDeclarativeEnvironment(新建声明式词法环境)，并令 localEnv 为调用的结果。
设 词法环境组件 为 localEnv。
设 变量环境组件 为 localEnv。
令 code 为 F 的 [[Code]] 内部属性的值。
使用函数代码 code 和 argumentList 执行声明式绑定初始化化步骤。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>如果函数代码是严格模式下的代码，设 this 绑定 为 thisArg。
否则如果 thisArg 是 null 或 undefined，则设 this 绑定 为全局对象。
否则如果 Type(thisArg) 的结果不为 Object，则设 this 绑定 为 ToObject(thisArg)。
否则设 this 绑定 为 thisArg。
以 F 的 <span class="hljs-string">[[Scope]]</span> 内部属性为参数调用 NewDeclarativeEnvironment(新建声明式词法环境)，并令 localEnv 为调用的结果。
设 词法环境组件 为 localEnv。
设 变量环境组件 为 localEnv。
令 code 为 F 的 <span class="hljs-string">[[Code]]</span> 内部属性的值。
使用函数代码 code 和 argumentList 执行声明式绑定初始化化步骤。
</code></pre>
<p>我们用伪代码表示一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(是 严格模式) {
    this = thisArg
} else if(thisArg === null || thisArg === undefined) {
    this = window
} else if(typeof thisArg != 'object') {
    this = Object(thisArg)
} else {
    this = thisArg
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span>(是 严格模式) {
    <span class="hljs-keyword">this</span> = thisArg
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(thisArg === <span class="hljs-literal">null</span> || thisArg === <span class="hljs-literal">undefined</span>) {
    <span class="hljs-keyword">this</span> = <span class="hljs-built_in">window</span>
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> thisArg != <span class="hljs-string">'object'</span>) {
    <span class="hljs-keyword">this</span> = <span class="hljs-built_in">Object</span>(thisArg)
} <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span> = thisArg
}</code></pre>
<p>哎，这里的 <code>thisArg</code> 指的是什么？上文说了 <code>thisArg</code> 来自于函数的调用者。</p>
<p>这里代表函数的 <code>apply</code>，<code>call</code>，<code>bind</code> 等设置 <code>this</code> 绑定的参数：</p>
<p>通过 <code>call</code> 或者 <code>apply</code> 调用函数时，<code>thisArg</code> 的值比较明显，为传入的第一个参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.apply (thisArg, argArray)

Function.prototype.call (thisArg [ , arg1 [ , arg2, … ] ] )" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-type">Function</span>.proto<span class="hljs-keyword">type</span>.apply (thisArg, argArray)

<span class="hljs-type">Function</span>.proto<span class="hljs-keyword">type</span>.call (thisArg [ , arg1 [ , arg2, … ] ] )</code></pre>
<p>当然 <code>thisArg</code> 还有其他的可能，具体的可以参考这篇文章 <a href="http://www.cnblogs.com/Kingle/p/3281816.html" rel="nofollow noreferrer" target="_blank">Javascript this 解析</a></p>
<p>对上面的伪代码做一下解释：</p>
<p><strong>严格模式:</strong> 也就是说，在严格模式下，<code>this</code> 只能为 <code>thisArg</code>，而当 <code>thisArg</code> 为 <code>undefined</code> 时，<code>this</code> 就是 <code>undefined</code> ，而不是 <code>window</code>。</p>
<p><strong>非严格模式:</strong> 如果 <code>thisArg</code> 是 <code>null</code> (如 <code>fun.call(null)</code>) 或 <code>undefined</code> （直接调用函数），则 <code>this</code> 为全局对象，浏览器里就是 <code>window</code>。</p>
<p>否则，如果 传入了 <code>thisArg</code>, 但不是个对象，则把它转为对象，并赋给 <code>this</code>，比如，当 <code>fun.call('hhh')</code> 时，打印 fun 内的 <code>this</code> 为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="String {0: &quot;h&quot;, 1: &quot;h&quot;, 2: &quot;h&quot;, length: 3, [[PrimitiveValue]]: &quot;hhh&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code style="word-break: break-word; white-space: initial;">String {<span class="hljs-number">0</span>: <span class="hljs-string">"h"</span>, <span class="hljs-number">1</span>: <span class="hljs-string">"h"</span>, <span class="hljs-number">2</span>: <span class="hljs-string">"h"</span>, length: <span class="hljs-number">3</span>, <span class="hljs-string">[[PrimitiveValue]]</span>: <span class="hljs-string">"hhh"</span>}</code></pre>
<p>否则 ，也就是仅剩的一种情况，显式的传入了一个对象作为 <code>thisArg</code> 参数的情况下，设 <code>this</code> 绑定为 <code>thisArg</code>。</p>
<h2 id="articleHeader12">声明式绑定初始化</h2>
<p>每个执行环境都有一个关联的 <code>变量环境</code>。当在一个执行环境下评估一段 <code>ECMA</code> 脚本时，变量和函数定义会以绑定的形式添加到这个 <code>变量环境</code> 的环境记录中。对于函数代码，参数也同样会以绑定的形式添加到这个 <code>变量环境</code> 的环境记录中。</p>
<h2 id="articleHeader13">总结</h2>
<p><code>ECMAScript</code> 代码的执行由运行环境来完成。不同的运行环境可能采取不同的执行方式，但基本的流程是相同的。如浏览器在解析 <code>HTML</code> 页面中遇到 <code>&lt;script&gt;</code> 元素时，会下载对应的代码来运行，或直接执行内嵌的代码。代码的基本执行方式是从上到下，顺序执行。在调用函数之后，代码的执行会进入一个执行上下文之中。由于在一个函数的执行过程中会调用其他的函数，执行过程中的活动执行上下文会形成一个堆栈结构。在栈顶的是当前正在执行的代码。当函数返回时，会退出当前的执行上下文，而回到之前的执行上下文中。如果代码执行中出现异常，则可能从多个执行上下文中退出。</p>
<p>在代码执行过程中很重要的一步是标识符的解析。比如当执行过程中遇到语句 <code>alert(val)</code> 时，首先要做的是解析标识符 <code>val</code> 的值。<code>ECMAScript</code> 不同于 <code>Java</code> 和 <code>C/C++</code> 等语言，在进行标识符解析时需要利用词法环境并与函数调用方式相关。具体来说，标识符解析由当前代码所对应的执行上下文来完成。为了描述标识符的解析过程，<code>ECMAScript</code> 规范中使用了词法环境的概念来进行描述。一个词法环境描述了标识符与变量或函数之间的对应关系。一个词法环境由两个部分组成：一部分是记录标识符与变量之间的绑定关系的环境记录，另一部分是包围当前词法环境的外部词法环境。环境记录可以看成是一个标识符与变量或函数之间的映射表。不同词法环境之间可以互相嵌套，而内部词法环境会持有一个包围它的外部词法环境的引用。在进行标识符解析时，如果当前词法环境中找不到标识符所对应的变量或函数，则使用外部词法环境来尝试解析。递归查找下去，直到解析成功或外部词法环境为 <code>null</code>。</p>
<p>具体来说，根据标识符关联方式的不同，环境记录可以进一步分成两类。两种类型分别对应不同的 <code>ECMAScript</code> 中不同的语法结构。当使用这些语法结构时，会对环境记录中的内容产生影响，进而影响标识符的解析过程。第一类环境记录是声明式环境记录。顾名思义，声明式环境记录用来绑定 <code>ECMAScript</code> 代码中的变量声明。当使用 <code>var</code> 声明变量或使用类似 <code>function func(){}</code> 的形式声明函数时，对应的变量或函数会被绑定到相应的环境记录中。另一类环境记录是对象环境记录。对象环境记录并不绑定具体的变量或函数，而是绑定另外一个对象中的属性。对象环境变量主要用来描述 <code>ECMAScript</code> 中 <code>with</code> 操作符的行为。</p>
<p>每个执行上下文会对应两个不同的词法环境。一个是用来进行标识符解析的词法环境，可能随着代码的执行而发生变化；另外一个是包含执行上下文对应的作用域中的变量或函数声明的词法环境。</p>
<h2 id="articleHeader14">提问</h2>
<p>读完这篇文章，问问自己，能够回答下面的问题吗？</p>
<p>1、ECMAScript 中可执行代码有几种？<br>2、什么情况下会创建一个执行环境？<br>3、什么情况下会退出一个执行环境？<br>4、作用域链和执行环境的关系？<br>5、执行环境的存在是为了解决什么？<br>6、词法环境和变量环境的异同？<br>7、this 的绑定的几种情况？</p>
<h2 id="articleHeader15">参考</h2>
<p><a href="https://www.w3.org/html/ig/zh/wiki/ES5/%E5%8F%AF%E6%89%A7%E8%A1%8C%E4%BB%A3%E7%A0%81%E4%B8%8E%E6%89%A7%E8%A1%8C%E7%8E%AF%E5%A2%83#.E6.A0.87.E8.AF.86.E7.AC.A6.E8.A7.A3.E6.9E.90" rel="nofollow noreferrer" target="_blank">ES5/可执行代码与执行环境</a><br><a href="http://www.cnblogs.com/TomXu/archive/2012/01/13/2308101.html" rel="nofollow noreferrer" target="_blank">深入理解JavaScript系列（11）：执行上下文（Execution Contexts）</a><br><a href="http://yanhaijing.com/javascript/2014/04/29/what-is-the-execution-context-in-javascript/" rel="nofollow noreferrer" target="_blank">了解JavaScript的执行上下文</a><br><a href="https://segmentfault.com/a/1190000009041008">深入理解JavaScript执行上下文、函数堆栈、提升的概念</a><br><a href="https://guxinyan.github.io/2017/01/12/%E5%85%B3%E4%BA%8Ejs%E4%BD%9C%E7%94%A8%E5%9F%9F%E9%82%A3%E4%BA%9B%E4%BA%8B/" rel="nofollow noreferrer" target="_blank">关于js作用域那些事</a><br><a href="http://blog.csdn.net/zmhawk/article/details/76013924" rel="nofollow noreferrer" target="_blank"> 从 ECMAScript 规范来看 JS 的 this 绑定规则</a><br><a href="https://www.ibm.com/developerworks/cn/web/1305_chengfu_ecmascript5/" rel="nofollow noreferrer" target="_blank">深入探讨 ECMAScript 规范</a></p>
<h2 id="articleHeader16">推荐阅读</h2>
<p><a href="http://www.html5jscss.com/js-data-scope.html" rel="nofollow noreferrer" target="_blank">JavaScript欲速则不达—通过解析过程了解JavaScript</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
由 ECMA 规范解读 Javascript 可执行上下文概念

## 原文链接
[https://segmentfault.com/a/1190000011105170](https://segmentfault.com/a/1190000011105170)

