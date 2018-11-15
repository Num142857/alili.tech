---
title: "JavaScript：处理'undefined'的7个技巧"
reprint: true
categories: reprint
abbrlink: 25e884f1
date: 2018-10-18 00:00:00
---

{{% raw %}}

            <p>我刚刚开始学习JavaScript时，大约是八年前，当时我对于undefined 和 null 比较困惑 ，因为他们都表示空值。他们有什么明确的区别吗？他们似乎都可以定义一个空值，而且 当你进行 在做null ===undefined 的比较时，结果是true。</p>
<p>现在的大多数语言，像Ruby, Python or Java，他们有一个单独的空值（nil 或 null），这似乎才合理。</p>
<p>而在JavaScript里，当你要获取一个变量或对象（未初始化）的值时，js引擎会返回 undefined。</p>
<p><a href="https://repl.it/HK1B/0">Try in repl.it</a></p>
<pre><code class="hljs ceylon"><span class="hljs-keyword">let</span> company;  
company;    <span class="hljs-comment">// =&gt; undefined  </span>
<span class="hljs-keyword">let</span> person = { name: <span class="hljs-string">'John Smith'</span> };  
person.age; <span class="hljs-comment">// =&gt; undefined  </span>

</code></pre>
<p>另一方面，对象引用错误会返回null。Javascript本身并不会给将变量或者对象属性的值设为 null。一些js原生的方法会返回null，比如string.prototypt.match() 参数不是对象时，会返回null，来表示对象缺失</p>
<p><a href="https://repl.it/HK1F/0">Try in repl.it</a></p>
<pre><code class="hljs yaml"><span class="hljs-string">let</span> <span class="hljs-string">array</span> <span class="hljs-string">=</span> <span class="hljs-literal">null</span><span class="hljs-string">;</span>  
<span class="hljs-string">array;</span>                <span class="hljs-string">//</span> <span class="hljs-string">=&gt;</span> <span class="hljs-literal">null</span>  
<span class="hljs-string">let</span> <span class="hljs-string">movie</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span> <span class="hljs-attr">name:</span> <span class="hljs-string">'Starship Troopers'</span><span class="hljs-string">,</span>  <span class="hljs-attr">musicBy:</span> <span class="hljs-literal">null</span> <span class="hljs-string">};</span>  
<span class="hljs-string">movie.musicBy;</span>        <span class="hljs-string">//</span> <span class="hljs-string">=&gt;</span> <span class="hljs-literal">null</span>  
<span class="hljs-string">'abc'</span><span class="hljs-string">.match(/[0-9]/);</span> <span class="hljs-string">//</span> <span class="hljs-string">=&gt;</span> <span class="hljs-literal">null</span>  

</code></pre>
<p>由于JavaScript的宽容特性，开发人员有访问未初始化值的诱惑。 我也犯了这种不好的做法。</p>
<p>通常这种冒险行为会产生“未定义”的相关错误，从而快速结束脚本。 相关的常见错误消息是：</p>
<ul>
<li>TypeError：'undefined'不是函数</li>
<li>TypeError：无法读取未定义的属性'&lt;prop-name&gt;''</li>
<li>和类似<em>type errors</em>。</li>
</ul>
<p>JavaScript开发能够理解这个笑话:</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">undefined</span><span class="hljs-params">()</span> </span>{  
  <span class="hljs-comment">// problem solved</span>
}

</code></pre>
<p>为了减少这种错误的风险，您必须了解产生“undefined”时的情况。 更重要的是抑制其外观并在应用程序中传播，从而提高代码的耐用性。</p>
<p>我们来详细探讨<code>undefined</code>及其对代码安全的影响。</p>
<h2>1. 什么是<code>undefined</code></h2>
<p>JavaScript 的 6 基本类型:</p>
<ul>
<li><em>Boolean</em>: <code>true</code> or <code>false</code></li>
<li><em>Number</em>: <code>1</code>, <code>6.7</code>, <code>0xFF</code></li>
<li><em>String</em>: <code>"Gorilla and banana"</code></li>
<li><em>Symbol</em>: <code>Symbol("name")</code> (starting ES2015)</li>
<li><em>Null</em>: <code>null</code></li>
<li><em>Undefined</em>: <code>undefined</code>.</li>
</ul>
<p>And a separated <em>object type</em>: <code>{name: "Dmitri"}</code>, <code>["apple", "orange"]</code>.</p>
<p>从6个基本类型<code>undefined</code>是一个特殊的值，它的类型为Undefined。 根据[ECMAScript规范]（<a href="https://www.ecma-international.org/ecma-262/7.0/#sec-undefined-value）：">https://www.ecma-international.org/ecma-262/7.0/#sec-undefined-value）：</a></p>
<blockquote>
<p><strong>未定义的值</strong>原始值在变量未被赋值时使用。</p>
</blockquote>
<p>该标准明确规定，在访问未初始化的变量，不存在的对象属性，不存在的数组元素等时，您将收到未定义的值。 例如：</p>
<p><a href="https://repl.it/HK1J/0">Try in repl.it</a></p>
<pre><code class="hljs typescript"><span class="hljs-keyword">let</span> <span class="hljs-built_in">number</span>;  
<span class="hljs-built_in">number</span>;     <span class="hljs-comment">// =&gt; undefined</span>

<span class="hljs-keyword">let</span> movie = { name: <span class="hljs-string">'Interstellar'</span> };  
movie.year; <span class="hljs-comment">// =&gt; undefined</span>

<span class="hljs-keyword">let</span> movies = [<span class="hljs-string">'Interstellar'</span>, <span class="hljs-string">'Alexander'</span>];  
movies[<span class="hljs-number">3</span>];  <span class="hljs-comment">// =&gt; undefined  </span>

</code></pre>
<p>ECMAScript规范定义了“未定义”值的类型：</p>
<blockquote>
<p><strong>未定义类型</strong>是唯一值为“未定义”值的类型。</p>
</blockquote>
<p><a href="https://repl.it/HK1L/0">Try in repl.it</a></p>
<pre><code class="hljs actionscript"><span class="hljs-keyword">typeof</span> <span class="hljs-literal">undefined</span> === <span class="hljs-string">'undefined'</span>; <span class="hljs-comment">// =&gt; true  </span>

</code></pre>
<p><a href="https://repl.it/HK1M/0">Try in repl.it</a></p>
<pre><code class="hljs vbnet"><span class="hljs-keyword">let</span> <span class="hljs-literal">nothing</span>;  
<span class="hljs-built_in">typeof</span> <span class="hljs-literal">nothing</span> === <span class="hljs-comment">'undefined';   // =&gt; true  </span>

</code></pre>
<h2>2. 创建未定义的常见场景`</h2>
<h3>2.1 未初始化的变量</h3>
<blockquote>
<p>一个尚未赋值的声明变量（<strong> uninitialized </strong>）默认为undefined。</p>
</blockquote>
<p>Plain and simple:</p>
<p><a href="https://repl.it/HK1N/0">Try in repl.it</a></p>
<pre><code class="hljs abnf">let myVariable<span class="hljs-comment">;  </span>
myVariable<span class="hljs-comment">; // =&gt; undefined  </span>

</code></pre>
<p>解决未初始化变量问题的一种有效方法是尽可能分配一个初始值_。 变量在未初始化状态下存在的越少越好。 理想情况下，您可以在声明`const myVariable ='初始值'后立即分配一个值，但这并非总是可行。</p>
<p><strong>Tip 1: 赞成<code>const</code>，否则使用<code>let</code>，但是告别<code>var</code></strong></p>
<p>在我看来，ECMAScript 2015的最佳功能之一是使用<code>const</code>和<code>let</code>声明变量的新方法。 这是一个很大的进步，这些声明是块范围的（与旧函数作用域<code>var</code>相反）并存在于[暂时死区]（<a href="https://rainsoft.io/variables-lifecycle-and-why-let-">https://rainsoft.io/variables-lifecycle-and-why-let-</a> 没有被吊起/＃5letvariableslifecycle）直到宣告行。</p>
<p>当变量只接收一个值时，我建议使用<code>const</code>声明。 它创建一个[不可变绑定]（<a href="https://mathiasbynens.be/notes/es6-const）。">https://mathiasbynens.be/notes/es6-const）。</a></p>
<p><code>const</code>的一个很好的特性是 - 你必须给初始值赋予变量<code>const myVariable ='initial'</code>。 变量不会暴露于未初始化的状态，并且访问<code>undefined</code>根本不可能。</p>
<p>让我们检查一下验证单词是否是回文的函数：</p>
<p><a href="https://repl.it/HK1O/0">Try in repl.it</a></p>
<pre><code class="hljs glsl">function isPalindrome(word) {  
  <span class="hljs-keyword">const</span> <span class="hljs-built_in">length</span> = word.<span class="hljs-built_in">length</span>;
  <span class="hljs-keyword">const</span> half = Math.<span class="hljs-built_in">floor</span>(<span class="hljs-built_in">length</span> / <span class="hljs-number">2</span>);
  <span class="hljs-keyword">for</span> (let <span class="hljs-keyword">index</span> = <span class="hljs-number">0</span>; <span class="hljs-keyword">index</span> `&lt; half; <span class="hljs-keyword">index</span>++) {
    <span class="hljs-keyword">if</span> (word[<span class="hljs-keyword">index</span>] !== word[<span class="hljs-built_in">length</span> - <span class="hljs-keyword">index</span> - <span class="hljs-number">1</span>]) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}
isPalindrome('madam'); <span class="hljs-comment">// =&gt;` true  </span>
isPalindrome('hello'); <span class="hljs-comment">// =&gt; false  </span>

</code></pre>
<p><img src="https://p0.ssl.qhimg.com/t014cae895cf3ba6bb1.png" alt="不要写var，写const，let"></p>
<p><code>var</code>声明的问题是整个函数范围内的[变量提升]（<a href="https://rainsoft.io/javascript-hoisting-in-details/#hoistingandvar）。">https://rainsoft.io/javascript-hoisting-in-details/#hoistingandvar）。</a> 你可以在函数范围的末尾声明一个<code>var</code>变量，但是它仍然可以在声明之前被访问：并且你会得到一个<code>undefined</code>。</p>
<p><a href="https://repl.it/HK1P/0">Try in repl.it</a></p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bigFunction</span><span class="hljs-params">()</span> </span>{  
  <span class="hljs-comment">// code...</span>
  myVariable; <span class="hljs-comment">// =&gt; undefined</span>
  <span class="hljs-comment">// code...</span>
  <span class="hljs-keyword">var</span> myVariable = <span class="hljs-string">'Initial value'</span>;
  <span class="hljs-comment">// code...</span>
  myVariable; <span class="hljs-comment">// =&gt; 'Initial value'</span>
}
bigFunction();  

</code></pre>
<p>相反，在声明行之前不能访问<code>let</code>（包括<code>const</code>）变量。 发生这种情况是因为该变量在声明之前处于[暂时死区]（<a href="https://rainsoft.io/variables-lifecycle-and-why-let-is-not-hoisted/#5letvariableslifecycle）中。">https://rainsoft.io/variables-lifecycle-and-why-let-is-not-hoisted/#5letvariableslifecycle）中。</a> 这很好，因为你访问<code>undefined</code>的机会较少。</p>
<p>上面的例子用let改写后，会出错。</p>
<p><a href="https://repl.it/HK1T/0">Try in repl.it</a></p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bigFunction</span>(<span class="hljs-params"></span>) </span>{  
  <span class="hljs-comment">// code...</span>
  myVariable; <span class="hljs-comment">// =&gt; Throws 'ReferenceError: myVariable is not defined'</span>
  <span class="hljs-comment">// code...</span>
  <span class="hljs-keyword">let</span> myVariable = <span class="hljs-string">'Initial value'</span>;
  <span class="hljs-comment">// code...</span>
  myVariable; <span class="hljs-comment">// =&gt; 'Initial value'</span>
}
bigFunction();  

</code></pre>
<p><strong>Tip 2: 增强内聚性</strong></p>
<p>[Cohesion]（<a href="https://en.wikipedia.org/wiki/Cohesion_（computer_science））描述了模块（命名空间，类，方法，代码块）的元素所属的程度。">https://en.wikipedia.org/wiki/Cohesion_（computer_science））描述了模块（命名空间，类，方法，代码块）的元素所属的程度。</a> 内聚的测量通常被描述为<em>高内聚</em>或低内聚_。</p>
<p>高内聚是最好的，因为它建议设计模块的元素只专注于单个任务。 它使模块：</p>
<ul>
<li><em>Focused</em> and <em>understandable</em>: easier to understand what the module does</li>
<li>功能单一且容易理解</li>
<li><em>Maintainable</em> and <em>easier to refactor</em>: the change in the module affects fewer modules</li>
<li>易于维护和复用</li>
<li><em>Reusable</em>: being focusing on a single task, it makes the module easier to reuse</li>
<li>重复利用</li>
<li><em>Testable</em>: you would easier test a module that's focused on a single task</li>
<li>易于测试</li>
</ul>
<p><img src="http://s4.qhres.com/static/366a28d7a5d76f82.svg" alt="组件耦合和内聚"></p>
<p>高内聚力伴随[松耦合]（<a href="https://en.wikipedia.org/wiki/Loose_coupling）是设计良好的系统的特点。">https://en.wikipedia.org/wiki/Loose_coupling）是设计良好的系统的特点。</a></p>
<p>一个代码块本身可能被认为是一个小模块。 为了从高内聚的好处中受益，您需要尽可能使变量尽可能靠近使用它们的代码块。</p>
<p>例如，如果一个变量完全存在以形成块范围的逻辑，则声明并允许该变量仅存在于该块内（使用<code>const</code>或<code>let</code>声明）。 不要将这个变量暴露给外部块作用域，因为外部块不应该关心这个变量。</p>
<p>不必要的扩展变量生命周期的一个典型例子是在函数内使用<code>for</code>循环：</p>
<pre><code class="hljs n1ql">function someFunc(array) {  
  var <span class="hljs-keyword">index</span>, item, <span class="hljs-built_in">length</span> = <span class="hljs-keyword">array</span>.<span class="hljs-built_in">length</span>;
  // some code...
  // some code...
  for (<span class="hljs-keyword">index</span> = <span class="hljs-number">0</span>; <span class="hljs-keyword">index</span> &lt; <span class="hljs-built_in">length</span>; <span class="hljs-keyword">index</span>++) {
    item = <span class="hljs-keyword">array</span>[<span class="hljs-keyword">index</span>];
    // some code...
  }
  return 'some result';
}

</code></pre>
<p><code>index</code>，<code>item</code>和<code>length</code>变量在函数体的开头声明。 然而，它们只用于接近尾声。 那么这种方法有什么问题？</p>
<p>在顶部的声明和<code>for</code>语句中的用法之间，变量<code>index</code>，<code>item</code>都是未初始化的并且暴露给<code>undefined</code>。 它们在整个功能范围内的生命周期不合理。</p>
<p>更好的方法是将这些变量尽可能靠近他们的使用地点：</p>
<pre><code class="hljs glsl">function someFunc(array) {  
  <span class="hljs-comment">// some code...</span>
  <span class="hljs-comment">// some code...</span>
  <span class="hljs-keyword">const</span> <span class="hljs-built_in">length</span> = array.<span class="hljs-built_in">length</span>;
  <span class="hljs-keyword">for</span> (let <span class="hljs-keyword">index</span> = <span class="hljs-number">0</span>; <span class="hljs-keyword">index</span> `&lt; <span class="hljs-built_in">length</span>; <span class="hljs-keyword">index</span>++) {
    <span class="hljs-keyword">const</span> item = array[<span class="hljs-keyword">index</span>];
    <span class="hljs-comment">// some </span>
  }
  <span class="hljs-keyword">return</span> 'some result';
}

</code></pre>
<p>为什么修改后的版本比最初版本更好？ 让我们来看看：</p>
<ul>
<li>变量不会暴露于未初始化的状态，因此您没有访问未定义的风险</li>
<li>尽可能将变量移动到它们的使用地点增加了代码的可读性</li>
<li>高度连贯的代码块在需要时更容易重构并提取为分离的函数</li>
</ul>
<h3>2.2 访问不存在的属性</h3>
<blockquote>
<p><code>When accessing a **non-existing object property**, JavaScript returns</code>undefined`.
当访问不再的属性时，会返回undefined</p>
</blockquote>
<p>看例子：</p>
<p><a href="https://repl.it/HK1W/1">Try in repl.it</a></p>
<pre><code class="hljs ceylon"><span class="hljs-keyword">let</span> favoriteMovie = {  
  title: <span class="hljs-string">'Blade Runner'</span>
};
favoriteMovie.actors; <span class="hljs-comment">// =&gt; undefined  </span>

</code></pre>
<p>本身访问不存在的属性不会引发错误。 尝试从不存在的属性值获取数据时出现真正的问题。 这是最常见的<code>undefined</code>相关陷阱，反映在众所周知的错误消息'TypeError：Can not read property<code>&lt;prop&gt;</code>of undefined`中。</p>
<p>让我们稍微修改前面的代码片段来说明一个“TypeError”抛出：</p>
<p><a href="https://repl.it/HK1Z/0">Try in repl.it</a></p>
<pre><code class="hljs xquery"><span class="hljs-keyword">let</span> favoriteMovie = {  
  title: <span class="hljs-string">'Blade Runner'</span>
};
favoriteMovie.actors[<span class="hljs-number">0</span>];  
// TypeError: Cannot read property <span class="hljs-string">'0'</span> <span class="hljs-keyword">of</span> undefined

</code></pre>
<p>允许访问不存在的属性的JavaScript的宽容性质是混淆的来源：该属性可能被设置，或者可能不是。 绕过这个问题的理想方法是限制对象始终定义它所拥有的属性。</p>
<p>不幸的是，您经常无法控制您使用的对象。 这些对象在不同情况下可能具有不同的属性集。 所以你必须手动处理所有这些场景。</p>
<p>让我们实现一个函数append（array，toAppend），它在数组的开始和/或结尾添加新的元素。 <code>toAppend</code>参数接受一个具有属性的对象：</p>
<ul>
<li><code>first</code>: element inserted at the beginning of <code>array</code></li>
<li><code>last</code>: element inserted at the end of <code>array</code>.</li>
</ul>
<p><a href="https://repl.it/HK11/2">Try in repl.it</a></p>
<pre><code class="hljs maxima">function <span class="hljs-built_in">append</span>(<span class="hljs-built_in">array</span>, toAppend) {  
  const arrayCopy = <span class="hljs-built_in">array</span>.slice();
  <span class="hljs-keyword">if</span> (toAppend.<span class="hljs-built_in">first</span>) {
    arrayCopy.unshift(toAppend.<span class="hljs-built_in">first</span>);
  }
  <span class="hljs-keyword">if</span> (toAppend.<span class="hljs-built_in">last</span>) {
    arrayCopy.<span class="hljs-built_in">push</span>(toAppend.<span class="hljs-built_in">last</span>);
  }
  <span class="hljs-built_in">return</span> arrayCopy;
}
<span class="hljs-built_in">append</span>([<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>], { <span class="hljs-built_in">first</span>: <span class="hljs-number">1</span>, <span class="hljs-built_in">last</span>: <span class="hljs-number">5</span> }); // =&gt; [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]  
<span class="hljs-built_in">append</span>(['Hello'], { <span class="hljs-built_in">last</span>: 'World' });     // =&gt; ['Hello', 'World']  
<span class="hljs-built_in">append</span>([<span class="hljs-number">8</span>, <span class="hljs-number">16</span>], { <span class="hljs-built_in">first</span>: <span class="hljs-number">4</span> });            // =&gt; [<span class="hljs-number">4</span>, <span class="hljs-number">8</span>, <span class="hljs-number">16</span>]  

</code></pre>
<p><a href="https://repl.it/HK11/3">Try in repl.it</a></p>
<pre><code class="hljs groovy">append([<span class="hljs-number">10</span>], { <span class="hljs-string">first:</span> <span class="hljs-number">0</span>, <span class="hljs-string">last:</span> <span class="hljs-literal">false</span> }); <span class="hljs-comment">// =&gt; [10]  </span>

</code></pre>
<p>下面的提示解释了如何正确检查属性是否存在。</p>
<p><strong>Tip 3: 检查属性是否存在</strong></p>
<p>幸运的是，JavaScript提供了很多方法来确定对象是否具有特定属性：</p>
<p>*<code>obj.prop！== undefined</code>：直接与<code>undefined</code>进行比较</p>
<ul>
<li>typeof obj.prop！=='undefined'：验证属性值的类型
*<code>obj.hasOwnProperty（'prop'）</code>：验证对象是否拥有自己的属性</li>
<li>obj`中的'prop'：验证对象是否有自己的或继承的属性</li>
</ul>
<p>我的建议是使用<code>in</code>运算符。它有一个简短而甜美的语法。 <code>in</code>操作符存在意味着明确的目的是检查对象是否具有特定的属性，而不访问实际的属性值。</p>
<p>！[不要写var，写const并在JavaScript中放置]（<a href="https://p0.ssl.qhimg.com/t010effea86a232d8a4.png）">https://p0.ssl.qhimg.com/t010effea86a232d8a4.png）</a></p>
<p><code>obj.hasOwnProperty（'prop'）</code>也是一个不错的解决方案。它比<code>in</code>运算符略长，并且只在对象自己的属性中进行验证。</p>
<p>涉及与'undefined'比较的两种方式可能会起作用......但在我看来<code>obj.prop！== undefined</code>和<code>typeof obj.prop！=='undefined`</code>看起来冗长而怪异，并且暴露直接处理<code>undefined</code>的怀疑路径。</p>
<p>让我们使用<code>in</code>运算符来改进<code>append（array，toAppend）</code>函数：</p>
<p><a href="https://repl.it/HK13/1">Try in repl.it</a></p>
<pre><code class="hljs maxima">function <span class="hljs-built_in">append</span>(<span class="hljs-built_in">array</span>, toAppend) {  
  const arrayCopy = <span class="hljs-built_in">array</span>.slice();
  <span class="hljs-keyword">if</span> ('<span class="hljs-built_in">first</span>' <span class="hljs-keyword">in</span> toAppend) {
    arrayCopy.unshift(toAppend.<span class="hljs-built_in">first</span>);
  }
  <span class="hljs-keyword">if</span> ('<span class="hljs-built_in">last</span>' <span class="hljs-keyword">in</span> toAppend) {
    arrayCopy.<span class="hljs-built_in">push</span>(toAppend.<span class="hljs-built_in">last</span>);
  }
  <span class="hljs-built_in">return</span> arrayCopy;
}
<span class="hljs-built_in">append</span>([<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>], { <span class="hljs-built_in">first</span>: <span class="hljs-number">1</span>, <span class="hljs-built_in">last</span>: <span class="hljs-number">5</span> }); // =&gt; [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]  
<span class="hljs-built_in">append</span>([<span class="hljs-number">10</span>], { <span class="hljs-built_in">first</span>: <span class="hljs-number">0</span>, <span class="hljs-built_in">last</span>: <span class="hljs-literal">false</span> });  // =&gt; [<span class="hljs-number">0</span>, <span class="hljs-number">10</span>, <span class="hljs-literal">false</span>]  

</code></pre>
<p><strong>Tip 4: 用对象结构的方式访问对象的属性</strong></p>
<p>访问对象属性时，如果该属性不存在，有时需要指示默认值。</p>
<p>你可以使用<code>in</code>伴随着三元运算符来实现：</p>
<p><a href="https://repl.it/HK14/0">Try in repl.it</a></p>
<pre><code class="hljs cs"><span class="hljs-keyword">const</span> <span class="hljs-keyword">object</span> = { };  
<span class="hljs-keyword">const</span> prop = <span class="hljs-string">'prop'</span> <span class="hljs-keyword">in</span> <span class="hljs-keyword">object</span> ? <span class="hljs-keyword">object</span>.prop : <span class="hljs-string">'default'</span>;  
prop; <span class="hljs-comment">// =&gt; 'default'  </span>

</code></pre>
<p>当要检查的属性数量增加时，三元运算符语法的使用会变得艰巨。 对于每个属性，你必须创建一个新的代码行来处理默认值，增加类似外观的三元运算符的丑陋墙。</p>
<p>为了使用更优雅的方法，让我们熟悉称为<em>object destructuring</em>的一个伟大的ES2015功能。
[对象解构]（<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring）允许直接将对象属性值直接提取到变量中，并设置默认值if">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring）允许直接将对象属性值直接提取到变量中，并设置默认值if</a> 该属性不存在。 避免直接处理undefined的简便语法。</p>
<p>事实上，现在的属性解析看起来简短且明了：</p>
<p><a href="https://repl.it/HK16/0">Try in repl.it</a></p>
<pre><code class="hljs cs"><span class="hljs-keyword">const</span> <span class="hljs-keyword">object</span> = {  };  
<span class="hljs-keyword">const</span> { prop = <span class="hljs-string">'default'</span> } = <span class="hljs-keyword">object</span>;  
prop; <span class="hljs-comment">// =&gt; 'default'  </span>

</code></pre>
<p>为了看到实际情况，让我们定义一个有用的函数，将字符串包装在引号中。 <code>quote（subject，config）</code>接受第一个参数作为要包装的字符串。 第二个参数<code>config</code>是一个具有以下属性的对象：</p>
<p><em><code>char</code>：引号字符，例如 <code>（单引号）或</code>（双引号），默认为<code>`</code>。
</em><code>skipIfQuoted</code>：如果字符串已被引用，则跳过引用的布尔值。 默认为<code>true</code>。</p>
<p>应用对象解构的好处，让我们实现反引号的使用<code></code>：</p>
<p><a href="https://repl.it/HK17/0">Try in repl.it</a></p>
<pre><code class="hljs rust">function quote(<span class="hljs-built_in">str</span>, config) {  
  <span class="hljs-keyword">const</span> { <span class="hljs-built_in">char</span> = <span class="hljs-string">'"'</span>, skipIfQuoted = <span class="hljs-literal">true</span> } = config;
  <span class="hljs-keyword">const</span> length = <span class="hljs-built_in">str</span>.length;
  <span class="hljs-keyword">if</span> (skipIfQuoted
      &amp;&amp; <span class="hljs-built_in">str</span>[<span class="hljs-number">0</span>] === <span class="hljs-built_in">char</span>
      &amp;&amp; <span class="hljs-built_in">str</span>[length - <span class="hljs-number">1</span>] === <span class="hljs-built_in">char</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">str</span>;
  }
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">char</span> + <span class="hljs-built_in">str</span> + <span class="hljs-built_in">char</span>;
}
quote(<span class="hljs-symbol">'Hello</span> World', { <span class="hljs-built_in">char</span>: <span class="hljs-string">'*'</span> });        <span class="hljs-comment">// =&gt; '*Hello World*'  </span>
quote('<span class="hljs-string">"Welcome"</span>', { skipIfQuoted: <span class="hljs-literal">true</span> }); <span class="hljs-comment">// =&gt; '"Welcome"'  </span>

``
`<span class="hljs-keyword">const</span> {<span class="hljs-built_in">char</span> =<span class="hljs-string">'''</span>，skipIfQuoted = <span class="hljs-literal">true</span>} = config`解构赋值在一行中从`config`对象中提取属性`<span class="hljs-built_in">char</span>`和`skipIfQuoted`如果某些属性在`config`对象中不可用， 解构赋值将默认值设置为：<span class="hljs-string">'''</span><span class="hljs-string">'''</span>为<span class="hljs-symbol">'char</span><span class="hljs-string">'，'</span><span class="hljs-literal">false</span><span class="hljs-string">'为'</span>skipIfQuoted`。

幸运的是，该功能还有改进的空间。
让我们将解构赋值移到参数部分。 并为`config`参数设置一个默认值（一个空对象`{}`），以在默认设置足够时跳过第二个参数。

[Try <span class="hljs-keyword">in</span> repl.it](https:<span class="hljs-comment">//repl.it/HK1b/0)</span>

```javascript
function quote(<span class="hljs-built_in">str</span>, { <span class="hljs-built_in">char</span> = <span class="hljs-string">'"'</span>, skipIfQuoted = <span class="hljs-literal">true</span> } = {}) {  
  <span class="hljs-keyword">const</span> length = <span class="hljs-built_in">str</span>.length;
  <span class="hljs-keyword">if</span> (skipIfQuoted
      &amp;&amp; <span class="hljs-built_in">str</span>[<span class="hljs-number">0</span>] === <span class="hljs-built_in">char</span>
      &amp;&amp; <span class="hljs-built_in">str</span>[length - <span class="hljs-number">1</span>] === <span class="hljs-built_in">char</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">str</span>;
  }
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">char</span> + <span class="hljs-built_in">str</span> + <span class="hljs-built_in">char</span>;
}
quote(<span class="hljs-symbol">'Hello</span> World', { <span class="hljs-built_in">char</span>: <span class="hljs-string">'*'</span> }); <span class="hljs-comment">// =&gt; '*Hello World*'  </span>
quote(<span class="hljs-symbol">'Sunny</span> day');                  <span class="hljs-comment">// =&gt; '"Sunny day"'  </span>

</code></pre>
<p>请注意，解构赋值将替换函数签名中的“config”参数。 我喜欢这样：<code>quote（）</code>变成一行更短。 在解构赋值右侧的<code>= {}</code>确保在第二个参数没有在quote（'Sunny day'）`中被指定时使用空对象。</p>
<p>对象解构是一个强大的功能，可以有效地处理从对象中提取属性。 我喜欢在访问的属性不存在时指定要返回的默认值的可能性。 因此，避免了“未定义”以及与处理它有关的问题。</p>
<p><strong>Tip 5:  用默认属性填充对象</strong></p>
<p>如果不需要像解构分配那样为每个属性创建变量，则缺少某些属性的对象可以用缺省值填充。</p>
<p>ES2015<code>Object.assign（target，source1，source2，...）</code>将所有可枚举属性的值从一个或多个源对象复制到目标对象中。 该函数返回目标对象。</p>
<p>例如，您需要访问<code>unsafeOptions</code>对象的属性，该属性并不总是包含其全部属性。</p>
<p>为了在<code>unsafeOptions</code>中访问一个不存在的属性时避免<code>undefined</code>，让我们做一些调整：</p>
<ul>
<li>定义一个保存默认属性值的对象<code>defaults</code></li>
<li>调用<code>Object.assign（{}，defaults，unsafeOptions）</code>来构建一个新的对象<code>options</code>。 新对象接收来自<code>unsafeOptions</code>的所有属性，但缺少的属性来自<code>defaults</code>。</li>
</ul>
<p><a href="https://repl.it/HK1c/0">Try in repl.it</a></p>
<pre><code class="hljs processing"><span class="hljs-keyword">const</span> unsafeOptions = {  
  fontSize: <span class="hljs-number">18</span>
};
<span class="hljs-keyword">const</span> defaults = {  
  fontSize: <span class="hljs-number">16</span>,
  <span class="hljs-built_in">color</span>: <span class="hljs-string">'black'</span>
};
<span class="hljs-keyword">const</span> options = <span class="hljs-keyword">Object</span>.assign({}, defaults, unsafeOptions);  
options.fontSize; <span class="hljs-comment">// =&gt; 18  </span>
options.<span class="hljs-built_in">color</span>;    <span class="hljs-comment">// =&gt; 'black'  </span>

</code></pre>
<p><code>Object.assign（）</code>将第一个参数作为目标对象<code>{}</code>。 目标对象从<code>unsafeOptions</code>源对象接收<code>fontSize</code>属性的值。 并且来自<code>defaults</code>源对象的<code>color</code>属性的值，因为<code>unsafeOptions</code>不包含<code>color</code>。 枚举源对象的顺序很重要：稍后的源对象属性将覆盖先前的对象属性。</p>
<p>您现在可以安全地访问<code>options</code>对象的任何属性，包括最初在<code>unsafeOptions</code>中不可用的<code>options.color</code>。</p>
<p>幸运的是，使用默认属性填充对象的方式更简单轻松。 我建议使用一个新的JavaScript特性（现在在[stage 3]（<a href="https://tc39.github.io/process-document/）），它允许[在对象初始化器中传播属性]（https://github.com/">https://tc39.github.io/process-document/）），它允许[在对象初始化器中传播属性]（https://github.com/</a> TC39/提议对象，其余的扩展）。</p>
<p>代替Object.assign（）调用，使用对象扩展语法将来自源对象的所有属性和可枚举属性复制到目标对象中：</p>
<p><a href="https://repl.it/HK1e/0">Try in repl.it</a></p>
<pre><code class="hljs processing"><span class="hljs-keyword">const</span> unsafeOptions = {  
  fontSize: <span class="hljs-number">18</span>
};
<span class="hljs-keyword">const</span> defaults = {  
  fontSize: <span class="hljs-number">16</span>,
  <span class="hljs-built_in">color</span>: <span class="hljs-string">'black'</span>
};
<span class="hljs-keyword">const</span> options = {  
  ...defaults,
  ...unsafeOptions
};
options.fontSize; <span class="hljs-comment">// =&gt; 18  </span>
options.<span class="hljs-built_in">color</span>;    <span class="hljs-comment">// =&gt; 'black'  </span>

</code></pre>
<p>对象初始值设定项从<code>defaults</code>和<code>unsafeOptions</code>源对象传播属性。 指定源对象的顺序很重要：稍后的源对象属性会覆盖先前的对象属性。</p>
<p>使用默认属性值填充不完整的对象是使代码安全和稳定的有效策略。 不管情况如何，对象总是包含全部属性：'undefined'不能生成。</p>
<h3>2.3 函数的参数</h3>
<blockquote>
<p>函数参数默认默认为<code>undefined</code>。</p>
</blockquote>
<p>通常，应使用相同数量的参数调用使用特定数量的参数定义的函数。 在这种情况下，这些参数将获得您期望的值：</p>
<p><a href="https://repl.it/HK1f/0">Try in repl.it</a></p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">multiply</span><span class="hljs-params">(a, b)</span> </span>{  
  a; <span class="hljs-comment">// =&gt; 5</span>
  b; <span class="hljs-comment">// =&gt; 3</span>
  <span class="hljs-keyword">return</span> a * b;
}
multiply(<span class="hljs-number">5</span>, <span class="hljs-number">3</span>); <span class="hljs-comment">// =&gt; 15  </span>

</code></pre>
<p>当您在调用中省略参数时会发生什么？ 函数内部的参数变成<code>undefined</code>。</p>
<p>让我们稍微修改前面的例子，只用一个参数调用函数：</p>
<p><a href="https://repl.it/HK1j/0">Try in repl.it</a></p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">multiply</span><span class="hljs-params">(a, b)</span> </span>{  
  a; <span class="hljs-comment">// =&gt; 5</span>
  b; <span class="hljs-comment">// =&gt; undefined</span>
  <span class="hljs-keyword">return</span> a * b;
}
multiply(<span class="hljs-number">5</span>); <span class="hljs-comment">// =&gt; NaN  </span>

</code></pre>
<p><strong>Tip 6: 给参数默认值</strong></p>
<p>有时函数不需要调用的全套参数。 可以简单地为没有值的参数设置默认值。</p>
<p>看例子：</p>
<p><a href="https://repl.it/HK1l/0">Try in repl.it</a></p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">multiply</span><span class="hljs-params">(a, b)</span> </span>{  
  <span class="hljs-keyword">if</span> (b === <span class="hljs-literal">undefined</span>) {
    b = <span class="hljs-number">2</span>;
  }
  a; <span class="hljs-comment">// =&gt; 5</span>
  b; <span class="hljs-comment">// =&gt; 2</span>
  <span class="hljs-keyword">return</span> a * b;
}
multiply(<span class="hljs-number">5</span>); <span class="hljs-comment">// =&gt; 10  </span>

</code></pre>
<p>The function is invoked with a single argument <code>multiply(5)</code>. Initially <code>a</code> parameter is <code>2</code> and <code>b</code> is <code>undefined</code>. The conditional statement verifies whether <code>b</code> is <code>undefined</code>. If it happens, <code>b = 2</code> assignment sets a default value.</p>
<p>尽管提供了分配默认值的方式，但我不建议直接比较'undefined'。 它很冗长，看起来像一个黑客。</p>
<p>更好的方法是使用ES2015 [默认参数]（<a href="https://www.sitepoint.com/es6-default-parameters/）功能。">https://www.sitepoint.com/es6-default-parameters/）功能。</a> 它很短，很有表现力，并且与'undefined`没有直接的对比。</p>
<p>例子修改，添加默认值:</p>
<p><a href="https://repl.it/HK1m/0">Try in repl.it</a></p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">multiply</span><span class="hljs-params">(a, b = 2)</span> </span>{  
  a; <span class="hljs-comment">// =&gt; 5</span>
  b; <span class="hljs-comment">// =&gt; 2</span>
  <span class="hljs-keyword">return</span> a * b;
}
multiply(<span class="hljs-number">5</span>);            <span class="hljs-comment">// =&gt; 10  </span>
multiply(<span class="hljs-number">5</span>, <span class="hljs-literal">undefined</span>); <span class="hljs-comment">// =&gt; 10  </span>
</code></pre>
<p>ES2015的默认参数功能非常直观和高效。 始终使用它来为可选参数设置默认值。</p>
<h3>2.4 函数返回值</h3>
<blockquote>
<p>隐式地，没有<code>return</code>语句，JavaScript函数返回<code>undefined</code>。</p>
</blockquote>
<p>在JavaScript中，没有任何<code>return</code>语句的函数隐式地返回<code>undefined</code>：</p>
<p><a href="https://repl.it/HK1n/0">Try in repl.it</a></p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">square</span><span class="hljs-params">(x)</span> </span>{  
  <span class="hljs-keyword">const</span> res = x * x;
}
square(<span class="hljs-number">2</span>); <span class="hljs-comment">// =&gt; undefined  </span>

</code></pre>
<p><code>square（）</code>函数不返回任何计算结果。 函数调用结果是'未定义的'。</p>
<p>当<code>return</code>语句存在时会发生同样的情况，但是附近没有表达式：</p>
<p><a href="https://repl.it/HK1o/0">Try in repl.it</a></p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">square</span><span class="hljs-params">(x)</span> </span>{  
  <span class="hljs-keyword">const</span> res = x * x;
  <span class="hljs-keyword">return</span>;
}
square(<span class="hljs-number">2</span>); <span class="hljs-comment">// =&gt; undefined  </span>

</code></pre>
<p><code>return;</code>语句被执行，但它不返回任何表达式。 调用结果也是<code>undefined</code>。</p>
<p>当然，在'return'附近表示要返回的表达式按预期工作：</p>
<p><a href="https://repl.it/HK1q/0">Try in repl.it</a></p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">square</span><span class="hljs-params">(x)</span> </span>{  
  <span class="hljs-keyword">const</span> res = x * x;
  <span class="hljs-keyword">return</span> res;
}
square(<span class="hljs-number">2</span>); <span class="hljs-comment">// =&gt; 4  </span>

</code></pre>
<p><strong>Tip 7: 不要相信自动分号插入</strong></p>
<p>以下JavaScript语句列表必须以分号（<code>;</code>）结尾：</p>
<ul>
<li>空的陈述</li>
<li><code>let</code>，<code>const</code>，<code>var</code>，<code>import</code>，<code>export</code>声明</li>
<li>表达式语句</li>
<li><code>调试器</code>语句</li>
<li><code>继续</code>语句，<code>break</code>语句</li>
<li><code>抛出</code>声明</li>
<li><code>return</code>语句</li>
</ul>
<p>如果你使用上述语句之一，请务必在末尾指明分号：</p>
<p><a href="https://repl.it/HK1r/0">Try in repl.it</a></p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getNum</span>(<span class="hljs-params"></span>) </span>{  
  <span class="hljs-comment">// Notice the semicolons at the end</span>
  <span class="hljs-keyword">let</span> num = <span class="hljs-number">1</span>; 
  <span class="hljs-keyword">return</span> num;
}
getNum(); <span class="hljs-comment">// =&gt; 1  </span>

</code></pre>
<p>在<code>let</code>声明和<code>return</code>声明结尾处写了一个强制性分号。</p>
<p>当你不想添加这些分号时会发生什么？ 例如减少源文件的大小。</p>
<p>在这种情况下，ECMAScript提供了[Automatic Semicolon Insertion]（<a href="http://www.ecma-international.org/ecma-262/6.0/index.html#sec-automatic-semicolon-insertion）（ASI）机制，该机制可以插入">http://www.ecma-international.org/ecma-262/6.0/index.html#sec-automatic-semicolon-insertion）（ASI）机制，该机制可以插入</a> 你丢失的分号。</p>
<p>在ASI的帮助下，你可以从前面的示例中删除分号：</p>
<p><a href="https://repl.it/HK1t/0">Try in repl.it</a></p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getNum</span>(<span class="hljs-params"></span>) </span>{  
  <span class="hljs-comment">// Notice that semicolons are missing</span>
  <span class="hljs-keyword">let</span> num = <span class="hljs-number">1</span>
  <span class="hljs-keyword">return</span> num
}
getNum() <span class="hljs-comment">// =&gt; 1  </span>

</code></pre>
<p>以上文字是有效的JavaScript代码。 缺少的分号会自动插入。</p>
<p>乍一看，它看起来很有希望。 ASI机制让你跳过不必要的分号。 您可以使JavaScript代码更小，更易于阅读。</p>
<p>ASI有一个小而烦人的陷阱。 当一个换行符位于<code>return</code>和返回的表达式'return \ n expression<code>之间时，ASI自动在换行符之前插入一个分号</code>; \ n表达式。</p>
<p>在函数内部意味着什么<code>return;</code>语句？ 该函数返回<code>undefined</code>。 如果您不详细了解ASI的机制，那么意外返回的“未定义”是误导性的。</p>
<p>例如，让我们研究<code>getPrimeNumbers（）</code>调用的返回值：</p>
<p><a href="https://repl.it/HK1x/1">Try in repl.it</a></p>
<pre><code class="hljs lsl">function getPrimeNumbers() {  
  return 
    [ <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>, <span class="hljs-number">11</span>, <span class="hljs-number">13</span>, <span class="hljs-number">17</span> ]
}
getPrimeNumbers() <span class="hljs-comment">// =&gt; undefined  </span>

</code></pre>
<p>在<code>return</code>语句和数组文字表达式之间存在一个新行。 JavaScript在<code>return</code>后自动插入一个分号，解释代码如下：</p>
<p><a href="https://repl.it/HK2C/0">Try in repl.it</a></p>
<pre><code class="hljs lsl">function getPrimeNumbers() {  
  return; 
  [ <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>, <span class="hljs-number">11</span>, <span class="hljs-number">13</span>, <span class="hljs-number">17</span> ];
}
getPrimeNumbers(); <span class="hljs-comment">// =&gt; undefined  </span>

</code></pre>
<p>语句<code>return;</code>使getPrimeNumbers（）函数返回undefined而不是期望的数组。</p>
<p>通过删除<code>return</code>和数组literal之间的换行符可以解决问题：</p>
<p><a href="https://repl.it/HK2D/0">Try in repl.it</a></p>
<pre><code class="hljs lsl">function getPrimeNumbers() {  
  return [ 
    <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>, <span class="hljs-number">11</span>, <span class="hljs-number">13</span>, <span class="hljs-number">17</span> 
  ];
}
getPrimeNumbers(); <span class="hljs-comment">// =&gt; [2, 3, 5, 7, 11, 13, 17]  </span>

</code></pre>
<p>我的建议是研究[确切地说]（<a href="http://www.bradoncode.com/blog/2015/08/26/javascript-semi-colon-insertion/）">http://www.bradoncode.com/blog/2015/08/26/javascript-semi-colon-insertion/）</a>
自动分号插入的作用，以避免这种情况。</p>
<p>Of course, never put a newline between <code>return</code> and the returned expression.</p>
<h3>2.5 <code>void</code> 运算</h3>
<p>void运算，计算一个表达式，不返回计算结果，所以返回值为undefined</p>
<p><a href="https://repl.it/HK2E/0">Try in repl.it</a></p>
<pre><code class="hljs groovy"><span class="hljs-keyword">void</span> <span class="hljs-number">1</span>;                    <span class="hljs-comment">// =&gt; undefined  </span>
<span class="hljs-keyword">void</span> (<span class="hljs-literal">false</span>);              <span class="hljs-comment">// =&gt; undefined  </span>
<span class="hljs-keyword">void</span> {<span class="hljs-string">name:</span> <span class="hljs-string">'John Smith'</span>}; <span class="hljs-comment">// =&gt; undefined  </span>
<span class="hljs-keyword">void</span> Math.min(<span class="hljs-number">1</span>, <span class="hljs-number">3</span>);       <span class="hljs-comment">// =&gt; undefined  </span>

</code></pre>
<p>[void use]运算符的[一个用例]（<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void#JavaScript_URIs）是将表达式评估抑制为undefined，依赖">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void#JavaScript_URIs）是将表达式评估抑制为undefined，依赖</a> 关于评估的一些副作用。</p>
<h2>3.  数组中的<code>undefined</code></h2>
<p>You get when accessing an array element with an out of bounds index.
当你试图想要获取一个超出数组界限范围的下标时，会返回 <code>undefined</code></p>
<p><a href="https://repl.it/HK2H/0">Try in repl.it</a></p>
<pre><code class="hljs actionscript"><span class="hljs-keyword">const</span> colors = [<span class="hljs-string">'blue'</span>, <span class="hljs-string">'white'</span>, <span class="hljs-string">'red'</span>];  
colors[<span class="hljs-number">5</span>];  <span class="hljs-comment">// =&gt; undefined  </span>
colors[<span class="hljs-number">-1</span>]; <span class="hljs-comment">// =&gt; undefined  </span>

</code></pre>
<p>数组<code>colors</code> 有3个元素array has 3 elements, 对应的下标分别是  <code>0</code>, <code>1</code> and <code>2</code>。 因为在该数组中不存在下标5和-1，所以当你t访问<code>colors[5]</code> 和 <code>colors[-1]</code>会返回  <code>undefined</code>.</p>
<p>在JavaScript中你可能遇到所谓的稀疏数组。 这些是有间隙的数组，即在某些索引中没有定义元素。</p>
<p>当在一个稀疏数组中访问一个间隙（又名空槽）时，你也会得到一个'undefined`。</p>
<p>以下示例将生成稀疏数组并尝试访问其空插槽：</p>
<p><a href="https://repl.it/HK2I/1">Try in repl.it</a></p>
<pre><code class="hljs prolog">const sparse1 = new <span class="hljs-symbol">Array</span>(<span class="hljs-number">3</span>);  
sparse1;       // =&gt; [<span class="hljs-string">`&lt;empty slot&gt;`</span>, <span class="hljs-string">`&lt;empty slot&gt;`</span>, <span class="hljs-string">`&lt;empty slot&gt;`</span>]  
sparse1[<span class="hljs-number">0</span>];    // =&gt; undefined  
sparse1[<span class="hljs-number">1</span>];    // =&gt; undefined  
const sparse2 = [<span class="hljs-string">'white'</span>,  ,<span class="hljs-string">'blue'</span>]  
sparse2;       // =&gt; [<span class="hljs-string">'white'</span>, <span class="hljs-string">`&lt;empty slot&gt;`</span>, <span class="hljs-string">'blue'</span>]  
sparse2[<span class="hljs-number">1</span>];    // =&gt; undefined  

</code></pre>
<p><code>sparse1</code> 是通过调用构造函数“Array”构造函数来创建的。 它有3个空插槽。 <code>sparse2</code>是用字面量的形式来创建了一个第二个元素为空的数组。 在任何这些稀疏数组中，访问一个空插槽的结果都是“undefined”。</p>
<p>在处理数组时，为了避免捕获<code>undefined</code>，一定要使用有效的数组索引，并避免创建稀疏数组。</p>
<h2>4. <code>undefined</code> and <code>null</code>  之间的不同</h2>
<p>这里有个合理的问题： <code>undefined</code> and <code>null</code>他们之间的主要区别是什么？都是一个指定值用来表示一个空状态。</p>
<p>主要的区别是：<code>undefined</code>是用来表示一个变量的值没有被定义。 <code>null</code> 这是代表一个对象不存在。</p>
<p>我们来看一下这些区别：</p>
<p>当变量<code>number</code> 被定义，但是没有给它赋值进行初始化：</p>
<p><a href="https://repl.it/HK2J/0">Try in repl.it</a></p>
<pre><code class="hljs typescript"><span class="hljs-keyword">let</span> <span class="hljs-built_in">number</span>;  
<span class="hljs-built_in">number</span>; <span class="hljs-comment">// =&gt; undefined  </span>

</code></pre>
<p>因此变量<code>number</code>的值为 <code>undefined</code>, .这明确表明了则是一个没有初始化的变量</p>
<p>同样的，当你获取一个对象存在的属性时，也会发生这样的情况：该属性未初始化。</p>
<p><a href="https://repl.it/HK2L/0">Try in repl.it</a></p>
<pre><code class="hljs actionscript"><span class="hljs-keyword">const</span> obj = { firstName: <span class="hljs-string">'Dmitri'</span> };  
obj.lastName; <span class="hljs-comment">// =&gt; undefined  </span>

</code></pre>
<p>上面例子，因为 obj没有<code>lastName</code>属性，所以JavaScript会把 <code>obj.lastName</code> 解析为 <code>undefined</code>.</p>
<p>还有另一种情况，当一个变量期待是一个对象或者是一个方法返回一个对象时，但是由于某些原因，你不能实例化一个对象。。那么这样的情况下，null就会是一个有意义的指示器，来表示对象缺失。</p>
<p>例如：clone()` 是一个用来复制JavaScript对象的 函数，这个函数期望能够返回的是一个对象。</p>
<p><a href="https://repl.it/HK2M/2">Try in repl.it</a></p>
<pre><code class="hljs php"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">clone</span><span class="hljs-params">(obj)</span> </span>{  
  <span class="hljs-keyword">if</span> (typeof obj === <span class="hljs-string">'object'</span> &amp;&amp; obj !== <span class="hljs-keyword">null</span>) {
    <span class="hljs-keyword">return</span> Object.assign({}, obj);
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">null</span>;
}
<span class="hljs-keyword">clone</span>({name: <span class="hljs-string">'John'</span>}); <span class="hljs-comment">// =&gt; {name: 'John'}  </span>
<span class="hljs-keyword">clone</span>(<span class="hljs-number">15</span>);             <span class="hljs-comment">// =&gt; null  </span>
<span class="hljs-keyword">clone</span>(<span class="hljs-keyword">null</span>);           <span class="hljs-comment">// =&gt; null  </span>

</code></pre>
<p>然后，可能会传入一个不是对象的参数：15，null。这种情况下，该函数就不能进行对象复制，所以会返回 <code>null</code>  -- 来表示对象缺失</p>
<p><code>typeof</code> 运算 能够看出两个值之间的区别</p>
<p><a href="https://repl.it/HK2M/1">Try in repl.it</a></p>
<pre><code class="hljs actionscript"><span class="hljs-keyword">typeof</span> <span class="hljs-literal">undefined</span>; <span class="hljs-comment">// =&gt; 'undefined'  </span>
<span class="hljs-keyword">typeof</span> <span class="hljs-literal">null</span>;      <span class="hljs-comment">// =&gt; 'object'  </span>

</code></pre>
<p>The <a href="https://rainsoft.io/the-legend-of-javascript-equality-operator/#theidentityoperator">全等运算符</a> <code>===</code> 对于<code>undefined</code> 和<code>null</code>，也显示不相等。</p>
<p><a href="https://repl.it/HLI0/0">Try in repl.it</a></p>
<pre><code class="hljs nix"><span class="hljs-keyword">let</span> <span class="hljs-attr">nothing</span> = undefined;  
<span class="hljs-keyword">let</span> <span class="hljs-attr">missingObject</span> = <span class="hljs-literal">null</span>;  
<span class="hljs-attr">nothing</span> === missingObject; // =&gt; <span class="hljs-literal">false</span>  

</code></pre>
<h2>5.总结</h2>
<p>undefined的存在是JavaScript随意性所造成的，他允许一下任意情况的使用：</p>
<ul>
<li>uninitialized variables </li>
<li>未初始化的对象</li>
<li>non-existing object properties or methods </li>
<li>对象没有的方法或属性</li>
<li>out of bounds indexes to access array elements  </li>
<li>数组的超出长度下标的元素</li>
<li>the invocation result of a function that returns nothing</li>
<li>当方法调用返回空时</li>
</ul>
<p>大多数情况下，直接与'undefined'进行比较是一种不好的做法，因为你可能依赖于上面提到的允许但不鼓励的做法。</p>
<p>一个有效的策略是减少代码中未定义关键字的出现。 在此期间，请总是以令人惊讶的方式记住它的潜在外观，并通过应用下列有益习惯来防止这种情况发生：</p>
<ul>
<li>减少未初始化变量的使用</li>
<li>使变量生命周期变短并接近其使用的来源</li>
<li>尽可能为变量分配一个初始值</li>
<li>支持<code>const</code>，否则使用<code>let</code></li>
<li>使用默认值作为无意义的函数参数</li>
<li>验证属性的存在或用缺省属性填充不安全的对象</li>
<li>避免使用稀疏数组</li>
</ul>
<p><em>What's your opinion about <code>undefined</code> in JavaScript? Feel free to write a comment bellow!</em></p>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/7-tips-to-handle-undefined-in-javascript-dmitri-pavlutin](https://www.zcfy.cc/article/7-tips-to-handle-undefined-in-javascript-dmitri-pavlutin)
原文标题: JavaScript：处理'undefined'的7个技巧
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
