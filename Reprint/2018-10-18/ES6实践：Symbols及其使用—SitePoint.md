---
title: ES6实践：Symbols及其使用—SitePoint
hidden: true
categories: [reprint]
slug: e33ba1d1
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p><strong>虽然ES2015已经引入了许多开发人员期待已久的语言特性，但还有一些新特性不太为人所知和理解，其好处也不太清楚——比如symbols。</strong></p>
<p>symbol（符号）是一种新的原始数据类型，一个确保不会和其它符号冲突的唯一令牌。从这个意义上讲，你可以把符号看作是一种<a href="https://en.wikipedia.org/wiki/Universally_unique_identifier">UUID</a>（通用唯一识别码）。 让我们看看符号是如何工作的，以及我们能用它做些什么。</p>
<h2>创建符号</h2>
<p>创建符号非常直接，就是简单地调用<a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol">Symbol</a>函数。需要注意的是这只是一个标准的函数而不是一个对象构造器。使用new操作符调用它会导致一个类型错误。每次调用Symbol函数的时候，都会得到一个全新的唯一的值。</p>
<pre><code class="hljs dart"><span class="hljs-keyword">const</span> foo = <span class="hljs-built_in">Symbol</span>();
<span class="hljs-keyword">const</span> bar = <span class="hljs-built_in">Symbol</span>();

foo === bar
<span class="hljs-comment">// &lt;-- false</span>


</code></pre><p>创建符号的时候可以给符号添加一个标签，方式是传递字符串作为第一个参数。标签并不能影响符号的值，只是利于调试，并且当符号的<code>toString()</code>方法被调用的时候会显示出来。创建具有相同标签的多个符号是可行的，但是这样做没有任何好处，并很可能引起疑惑。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">let</span> foo = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'baz'</span>);
<span class="hljs-keyword">let</span> bar = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'baz'</span>);

foo === bar
<span class="hljs-comment">// &lt;-- false</span>
<span class="hljs-built_in">console</span>.log(foo);
<span class="hljs-comment">// &lt;-- Symbol(baz)</span>


</code></pre><h2>符号能用来做什么？</h2>
<p>符号可以很好地替代作为类/模块常量的字符串或者整数：</p>
<pre><code class="hljs javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Application</span> </span>{
  <span class="hljs-keyword">constructor</span>(mode) {
    <span class="hljs-keyword">switch</span> (mode) {
      <span class="hljs-keyword">case</span> Application.DEV:
        <span class="hljs-comment">// Set up app for development environment</span>
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> Application.PROD:
        <span class="hljs-comment">// Set up app for production environment</span>
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-keyword">default</span>:
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Invalid application mode: '</span> + mode);
    }
  }
}

Application.DEV = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'dev'</span>);
Application.PROD = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'prod'</span>);

<span class="hljs-comment">// Example use</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Application(Application.DEV);


</code></pre><p>字符串和整数并不是唯一的值；比如数字<code>2</code>或者字符串<code>development</code>也可能在程序的其它地方被用于不同的目的。使用符号意味着我们可以对提供的值更有信心。</p>
<p>符号的另外一个有趣的用法是作为对象属性的键值。如果你曾经把JavaScript对象作为<a href="https://en.wikipedia.org/wiki/Hash_table">hashmap</a>（PHP术语中的关联数组或者Python中的字典）使用，你就会对使用括号语法获取/设置属性很熟悉：</p>
<pre><code class="hljs kotlin">const <span class="hljs-keyword">data</span> = [];

<span class="hljs-keyword">data</span>[<span class="hljs-string">'name'</span>] = <span class="hljs-string">'Ted Mosby'</span>;
<span class="hljs-keyword">data</span>[<span class="hljs-string">'nickname'</span>] = <span class="hljs-string">'Teddy Westside'</span>;
<span class="hljs-keyword">data</span>[<span class="hljs-string">'city'</span>] = <span class="hljs-string">'New York'</span>;


</code></pre><p>使用括号语法，我们也可以使用符号做为属性的键值。这样做有很多优点。首先，可以确保基于符号的键值不会冲突，不像字符串键值有可能会和对象已有的属性或者方法冲突。其次，符号不会被<code>for ... in</code>枚举，并且会被<code>Object.keys()</code>，<code>Object.getOwnPropertyNames()</code>，<code>JSON.stringify()</code>等方法忽略。对于在序列化对象时不想被包含的属性来说，符号是一个理想的选择。</p>
<pre><code class="hljs dockerfile">const <span class="hljs-keyword">user</span> = {};
const email = Symbol();

<span class="hljs-keyword">user</span>.name = <span class="hljs-string">'Fred'</span>;
<span class="hljs-keyword">user</span>.age = <span class="hljs-number">30</span>;
<span class="hljs-keyword">user</span>[email] = <span class="hljs-string">'fred@example.com'</span>;

Object.keys(<span class="hljs-keyword">user</span>);
// &lt;-- Array [ <span class="hljs-string">"name"</span>, <span class="hljs-string">"age"</span> ]

Object.getOwnPropertyNames(<span class="hljs-keyword">user</span>);
// &lt;-- Array [ <span class="hljs-string">"name"</span>, <span class="hljs-string">"age"</span> ]

JSON.stringify(<span class="hljs-keyword">user</span>);
// &lt;-- <span class="hljs-string">"{"</span>name<span class="hljs-string">":"</span>Fred<span class="hljs-string">","</span>age<span class="hljs-string">":30}"</span>


</code></pre><p>然而，值得注意的是，使用符号做为键值并不能保证私有。有一些新的工具允许访问符号类型的属性键值。<code>Object.getOwnPropertySymbols()</code>返回基于符号的键值组成的数组，<code>Reflect.ownKeys()</code>返回所有键值，包含符号键值，组成的数组。</p>
<pre><code class="hljs julia">Object.getOwnPropertySymbols(user);
// &lt;-- <span class="hljs-built_in">Array</span> [ <span class="hljs-built_in">Symbol</span>() ]

Reflect.ownKeys(user)
// &lt;-- <span class="hljs-built_in">Array</span> [ <span class="hljs-string">"name"</span>, <span class="hljs-string">"age"</span>, <span class="hljs-built_in">Symbol</span>() ]


</code></pre><h2>有名的符号</h2>
<p>因为以符号做为键值的属性在ES6之前的代码中是不可见的，所以在保证向后兼容的同时，符号是给JavaScript现有类型添加新功能的理想选择。所谓“有名”的符号是预定义在<code>Symbol</code>函数上的属性，它们被用来自定义某些语言特性的行为，实现新的功能，比如迭代器。</p>
<p><code>Symbol.iterator</code>是一个有名的符号，被用来给对象添加一个特殊的方法，使得对象可以被迭代：</p>
<pre><code class="hljs elixir">const band = [<span class="hljs-string">'Freddy'</span>, <span class="hljs-string">'Brian'</span>, <span class="hljs-string">'John'</span>, <span class="hljs-string">'Roger'</span>];
const iterator = band[Symbol.iterator]();

iterator.<span class="hljs-keyword">next</span>().value;
<span class="hljs-regexp">//</span> &lt;-- { <span class="hljs-symbol">value:</span> <span class="hljs-string">"Freddy"</span>, <span class="hljs-symbol">done:</span> <span class="hljs-keyword">false</span> }
iterator.<span class="hljs-keyword">next</span>().value;
<span class="hljs-regexp">//</span> &lt;-- { <span class="hljs-symbol">value:</span> <span class="hljs-string">"Brian"</span>, <span class="hljs-symbol">done:</span> <span class="hljs-keyword">false</span> }
iterator.<span class="hljs-keyword">next</span>().value;
<span class="hljs-regexp">//</span> &lt;-- { <span class="hljs-symbol">value:</span> <span class="hljs-string">"John"</span>, <span class="hljs-symbol">done:</span> <span class="hljs-keyword">false</span> }
iterator.<span class="hljs-keyword">next</span>().value;
<span class="hljs-regexp">//</span> &lt;-- { <span class="hljs-symbol">value:</span> <span class="hljs-string">"Roger"</span>, <span class="hljs-symbol">done:</span> <span class="hljs-keyword">false</span> }
iterator.<span class="hljs-keyword">next</span>().value;
<span class="hljs-regexp">//</span> &lt;-- { <span class="hljs-symbol">value:</span> undefined, <span class="hljs-symbol">done:</span> <span class="hljs-keyword">true</span> }


</code></pre><p>内建类型字符串，数组，类型数组，Map（映射）和Set（集合）都有一个默认的<code>Symbol.iterator</code>方法。当上述类型的实例被<code>for ... of</code>循环或者用于扩展运算符的时候就会调用这个方法。浏览器也开始使用<code>Symbol.iterator</code>键值让DOM结构，比如<code>NodeList</code>和<code>HTMLCollection</code>以同样的方式被迭代。</p>
<h2>全局注册表</h2>
<p>规范还定义了一个运行时范围的符号注册表，这意味着你可以在不同的执行上下文，比如在文档、内嵌iframe或者service worker之间，存储和获取符号。</p>
<p><code>Symbol.for(key)</code>用来获取注册表中给定键值的符号。如果对应这个键值的符号不存在，会返回一个新的符号。正如你预期的那样，对于同一个值，后续的调用都会返回同一个符号。</p>
<p><code>Symbol.keyFor(symbol)</code>允许你获取给定符号的键值。如果注册表中不存在给定的符号，那么会返回<code>undefined</code>：</p>
<pre><code class="hljs dart"><span class="hljs-keyword">const</span> debbie = <span class="hljs-built_in">Symbol</span>.<span class="hljs-keyword">for</span>(<span class="hljs-string">'user'</span>);
<span class="hljs-keyword">const</span> mike   = <span class="hljs-built_in">Symbol</span>.<span class="hljs-keyword">for</span>(<span class="hljs-string">'user'</span>);

debbie === mike
<span class="hljs-comment">// &lt;-- true</span>

<span class="hljs-built_in">Symbol</span>.keyFor(debbie);
<span class="hljs-comment">// &lt;-- "user"</span>


</code></pre><h2>用例</h2>
<p>在一些用例中，使用符号提供了优势。其中之一是在文章开头提到的，当给一个对象添加不想被对象序列化的时候包含在内的属性，就好像属性是“隐藏”的时候，使用符号就是一个很好的选择。</p>
<p>代码库的作者可以放心地使用符号给客户端对象添加属性和方法，而不用担心覆盖已有的键值（或者自己添加的键值被别的代码覆盖）。例如，小部件组件（比如时间选择器）在初始化的时候会产生很多选项和状态，这些选项和状态需要存储在某个地方。把组件实例赋值给DOM元素对象的一个属性并不是理想的选择，因为这个属性有可能会和其它的键值冲突。使用基于符号的键值可以巧妙地解决这个问题，确保组件实例不会被覆盖。有关这个想法更详细的探索，请查看Mozilla Hacks的博客<a href="https://hacks.mozilla.org/2015/06/es6-in-depth-symbols/">ES6 in Depth: Symbols</a>。</p>
<h2>浏览器支持情况</h2>
<p>如果你想体验符号，主流浏览器的支持<a href="https://kangax.github.io/compat-table/es6/">是很好的</a>。如你所见，Chrome，Firefox，Microsoft Edge和Opera的当前版本，移动设备上的Android 5.1和iOS 9都原生支持符号了。如果需要兼容较老版本的浏览器，可以使用<a href="https://github.com/medikoo/es6-symbol">腻子脚本</a>。</p>
<h2>总结</h2>
<p>虽然引入符号的主要原因似乎是为了在兼容现有代码的前提下为语言添加新功能，但它们确实有一些有趣的用途。对于所有开发人员来说，至少对它们有一个基本的了解，并且熟悉最常用的、有名的符号及其用途是值得的。</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/es6-in-action-symbols-and-their-uses-sitepoint](https://www.zcfy.cc/article/es6-in-action-symbols-and-their-uses-sitepoint)
原文标题: ES6实践：Symbols及其使用—SitePoint
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
