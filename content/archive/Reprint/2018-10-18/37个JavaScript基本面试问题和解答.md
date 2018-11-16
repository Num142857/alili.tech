---
title: 37个JavaScript基本面试问题和解答
hidden: true
categories: [reprint]
slug: 933bbe19
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <h3>1、使用typeof bar ===“object”来确定bar是否是一个对象时有什么潜在的缺陷？这个陷阱如何避免？</h3>
<p>尽管typeof bar ===“object”是检查bar是否是对象的可靠方法，但JavaScript中令人惊讶的问题是<em>null</em>也被认为是一个对象！</p>
<p>因此，下面的代码打印到控制台的是true而不是false：</p>
<pre><code class="hljs gauss">var <span class="hljs-built_in">bar</span> = <span class="hljs-built_in">null</span>;
console.<span class="hljs-built_in">log</span>(typeof <span class="hljs-built_in">bar</span> === <span class="hljs-string">"object"</span>);  <span class="hljs-comment">// logs true!</span>

</code></pre>
<p>只要知道这一点，就可以通过检查bar是否为空来轻松避免该问题：</p>
<pre><code class="hljs gauss">console.<span class="hljs-built_in">log</span>((<span class="hljs-built_in">bar</span> !== <span class="hljs-built_in">null</span>) &amp;&amp; (typeof <span class="hljs-built_in">bar</span> === <span class="hljs-string">"object"</span>));  <span class="hljs-comment">// logs false</span>

</code></pre>
<p>为了在我们的答案更加的完整，还有两件事值得注意：</p>
<p>首先，如果bar是一个函数，上面的解决方案将返回false。在大多数情况下，这是所期望的行为，但是在您希望函数返回true的情况下，您可以将上述解决方案修改为：</p>
<pre><code class="hljs gauss">console.<span class="hljs-built_in">log</span>((<span class="hljs-built_in">bar</span> !== <span class="hljs-built_in">null</span>) &amp;&amp; ((typeof <span class="hljs-built_in">bar</span> === <span class="hljs-string">"object"</span>) || (typeof <span class="hljs-built_in">bar</span> === <span class="hljs-string">"function"</span>)));

</code></pre>
<p>其次，如果bar是数组，则上述解决方案将返回true（例如，如果var bar = [];）。在大多数情况下，这是所希望的行为，因为数组确实是对象，但是在您想要对数组也是false的情况下，可以将上述解决方案修改为：</p>
<pre><code class="hljs gauss">console.<span class="hljs-built_in">log</span>((<span class="hljs-built_in">bar</span> !== <span class="hljs-built_in">null</span>) &amp;&amp; (typeof <span class="hljs-built_in">bar</span> === <span class="hljs-string">"object"</span>) &amp;&amp; (toString.<span class="hljs-keyword">call</span>(<span class="hljs-built_in">bar</span>) !== <span class="hljs-string">"[object Array]"</span>));

</code></pre>
<p>但是，还有一个替代方法对空值，数组和函数返回false，但对于对象则为true：</p>
<pre><code class="hljs gauss">console.<span class="hljs-built_in">log</span>((<span class="hljs-built_in">bar</span> !== <span class="hljs-built_in">null</span>) &amp;&amp; (<span class="hljs-built_in">bar</span>.constructor === Object));

</code></pre>
<p>或者，如果您使用jQuery：</p>
<pre><code class="hljs gauss">console.<span class="hljs-built_in">log</span>((<span class="hljs-built_in">bar</span> !== <span class="hljs-built_in">null</span>) &amp;&amp; (typeof <span class="hljs-built_in">bar</span> === <span class="hljs-string">"object"</span>) &amp;&amp; (! $.isArray(<span class="hljs-built_in">bar</span>)));

</code></pre>
<p>ES5使得数组的情况非常简单，包括它自己的空检查：</p>
<pre><code class="hljs vbscript">console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">Array</span>.<span class="hljs-built_in">isArray</span>(bar));

</code></pre>
<h3>2、下面的代码将输出到控制台的是什么，为什么？</h3>
<pre><code class="hljs javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> a = b = <span class="hljs-number">3</span>;
})();

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"a defined? "</span> + (<span class="hljs-keyword">typeof</span> a !== <span class="hljs-string">'undefined'</span>));
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"b defined? "</span> + (<span class="hljs-keyword">typeof</span> b !== <span class="hljs-string">'undefined'</span>));

</code></pre><p>由于a和b都在函数的封闭范围内定义，并且由于它们所在的行以var关键字开头，因此大多数JavaScript开发人员会希望typeof a和typeof b在上面的示例中都未定义。</p>
<p>但是，情况并非如此。这里的问题是大多数开发人员错误地理解语句var a = b = 3;以下简写为：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">var b</span> = 3;
<span class="hljs-attribute">var a</span> = b;

</code></pre><p>但实际上，var a = b = 3;其实是速记：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">b</span> = 3;
<span class="hljs-attribute">var a</span> = b;

</code></pre><p>因此（如果您不使用严格模式），代码片段的输出将为：</p>
<pre><code class="hljs crmsh">a <span class="hljs-keyword">defined</span>? <span class="hljs-literal">false</span>
b <span class="hljs-keyword">defined</span>? <span class="hljs-literal">true</span>

</code></pre><p>但是如何在封闭函数的范围之外定义b？那么，因为声明var a = b = 3;是语句b = 3的简写;并且var a = b; b最终成为一个全局变量（因为它不在var关键字后面），因此它仍然在作用域内，即使在封闭函数之外。</p>
<p>注意，在严格模式下（即，使用<a href="http://www.w3schools.com/js/js_strict.asp">strict</a>），语句var a = b = 3;会产生一个ReferenceError的运行时错误：b没有定义，从而避免了可能导致的任何头headfakes/bugs。 （这就是为什么你应该在你的代码中使用strict，一个重要的例子！）</p>
<h3>3、下面的代码将输出到控制台的是什么？，为什么？</h3>
<pre><code class="hljs javascript"><span class="hljs-keyword">var</span> myObject = {
    <span class="hljs-attr">foo</span>: <span class="hljs-string">"bar"</span>,
    <span class="hljs-attr">func</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"outer func:  this.foo = "</span> + <span class="hljs-keyword">this</span>.foo);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"outer func:  self.foo = "</span> + self.foo);
        (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"inner func:  this.foo = "</span> + <span class="hljs-keyword">this</span>.foo);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"inner func:  self.foo = "</span> + self.foo);
        }());
    }
};
myObject.func();

</code></pre><p>以上代码将输出到控制台：</p>
<pre><code class="hljs autoit">outer <span class="hljs-function"><span class="hljs-keyword">func</span>:  <span class="hljs-title">this</span>.<span class="hljs-title">foo</span> = <span class="hljs-title">bar</span></span>
outer <span class="hljs-function"><span class="hljs-keyword">func</span>:  <span class="hljs-title">self</span>.<span class="hljs-title">foo</span> = <span class="hljs-title">bar</span></span>
inner <span class="hljs-function"><span class="hljs-keyword">func</span>:  <span class="hljs-title">this</span>.<span class="hljs-title">foo</span> = <span class="hljs-title">undefined</span></span>
inner <span class="hljs-function"><span class="hljs-keyword">func</span>:  <span class="hljs-title">self</span>.<span class="hljs-title">foo</span> = <span class="hljs-title">bar</span></span>

</code></pre><p>在外部函数中，this和self都引用myObject，因此都可以正确地引用和访问foo。</p>
<p>但在内部函数中，这不再指向myObject。因此，this.foo在内部函数中是未定义的，而对局部变量self的引用仍然在范围内并且可以在那里访问。</p>
<h3>4、在功能块中封装JavaScript源文件的全部内容的重要性和原因是什么？</h3>
<p>这是一种日益普遍的做法，被许多流行的JavaScript库（jQuery，Node.js等）所采用。这种技术在文件的全部内容周围创建一个闭包，这可能最重要的是创建一个私有名称空间，从而有助于避免不同JavaScript模块和库之间的潜在名称冲突。</p>
<p>这种技术的另一个特点是为全局变量提供一个容易引用（可能更短）的别名。例如，这通常用于jQuery插件。 jQuery允许您使用jQuery.noConflict（）来禁用对jQuery名称空间的$引用。如果这样做了，你的代码仍然可以使用$使用闭包技术，如下所示：</p>
<pre><code class="hljs clojure">(<span class="hljs-name">function</span>($) { /* jQuery plugin code referencing $ */ } )(<span class="hljs-name">jQuery</span>)<span class="hljs-comment">;</span>

</code></pre><h3>5、在JavaScript源文件的开头包含'use strict'的意义和有什么好处？</h3>
<p>这里最简单也是最重要的答案是use strict是<em>一种在运行时自动执行更严格的JavaScript代码解析和错误处理的方法</em>。如果代码错误被忽略或失败，将会产生错误或抛出异常。总的来说，这是一个很好的做法。</p>
<p>严格模式的一些主要优点包括：</p>
<ul>
<li><strong>使调试更容易。</strong> 如果代码错误本来会被忽略或失败，那么现在将会产生错误或抛出异常，从而更快地发现代码中的问题，并更快地指引它们的源代码。</li>
<li><strong>防止意外全局。</strong> 如果没有严格模式，将值赋给未声明的变量会自动创建一个具有该名称的全局变量。这是JavaScript中最常见的错误之一。在严格模式下，尝试这样做会引发错误。</li>
<li><strong>消除隐藏威胁。</strong>在没有严格模式的情况下，对null或undefined的这个值的引用会自动强制到全局。这可能会导致许多<em>headfakes</em>和<em>pull-out-your-hair</em>类型的错误。在严格模式下，引用null或undefined的这个值会引发错误。</li>
<li><strong>不允许重复的参数值。</strong> 严格模式在检测到函数的重复命名参数（例如，函数foo（val1，val2，val1）{}）时会引发错误，从而捕获代码中几乎可以肯定存在的错误，否则您可能会浪费大量的时间追踪。<ul>
<li>注意：它曾经是（在ECMAScript 5中）strict模式将禁止重复的属性名称（例如var object = {foo：“bar”，foo：“baz”};）但是从<a href="https://stackoverflow.com/questions/30617139/whats-the-purpose-of-allowing-duplicate-property-names">ECMAScript 2015</a> 开始，就不再有这种情况了。</li>
</ul>
</li>
<li><strong>使eval（）更安全。</strong>  eval（）在严格模式和非严格模式下的行为方式有些不同。最重要的是，在严格模式下，在eval（）语句内部声明的变量和函数不会在包含范围中创建（它们是以非严格模式在包含范围中创建的，这也可能是问题的常见来源）。</li>
<li><strong>抛出无效的使用错误的删除符。</strong> 删除操作符（用于从对象中删除属性）不能用于对象的不可配置属性。当试图删除一个不可配置的属性时，非严格代码将自动失败，而在这种情况下，严格模式会引发错误。</li>
</ul>
<h3>6、考虑下面的两个函数。他们都会返回同样的值吗？为什么或者为什么不？</h3>
<pre><code class="hljs ada"><span class="hljs-keyword">function</span> <span class="hljs-title">foo1</span>()
{
  <span class="hljs-keyword">return</span> <span class="hljs-type">{</span>
      bar: <span class="hljs-string">"hello"</span>
  };
}

<span class="hljs-keyword">function</span> <span class="hljs-title">foo2</span>()
{
  <span class="hljs-keyword">return</span>
  <span class="hljs-type">{</span>
      bar: <span class="hljs-string">"hello"</span>
  };
}

</code></pre><p>令人惊讶的是，这两个函数不会返回相同的结果。而是：</p>
<pre><code class="hljs 1c">console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"foo1 returns:"</span>);
console.<span class="hljs-built_in">log</span>(foo1());
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"foo2 returns:"</span>);
console.<span class="hljs-built_in">log</span>(foo2());

</code></pre><p>会产生：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">foo1</span> <span class="hljs-selector-tag">returns</span>:
<span class="hljs-selector-tag">Object</span> {<span class="hljs-attribute">bar</span>: <span class="hljs-string">"hello"</span>}
<span class="hljs-selector-tag">foo2</span> <span class="hljs-selector-tag">returns</span>:
<span class="hljs-selector-tag">undefined</span> 

</code></pre><p>这不仅令人惊讶，而且特别令人烦恼的是，foo2（）返回未定义而没有引发任何错误。</p>
<p>原因与JavaScript中分号在技术上是可选的事实有关（尽管忽略它们通常是非常糟糕的形式）。因此，在foo2（）中遇到包含return语句的行（没有其他内容）时，<em>会在return语句之后立即自动插入分号。</em></p>
<p>由于代码的其余部分是完全有效的，即使它没有被调用或做任何事情（它只是一个未使用的代码块，它定义了一个属性栏，它等于字符串“hello”），所以不会抛出任何错误。</p>
<p>这种行为也被认为是遵循了在JavaScript中将一行开头大括号放在行尾的约定，而不是在新行的开头。如此处所示，这不仅仅是JavaScript中的一种风格偏好。</p>
<h3>7、什么是NaN？它的类型是什么？如何可靠地测试一个值是否等于NaN？</h3>
<p>NaN属性表示“不是数字”的值。这个特殊值是由于一个操作数是非数字的（例如“abc”/ 4）或者因为操作的结果是非数字而无法执行的。</p>
<p>虽然这看起来很简单，但NaN有一些令人惊讶的特征，如果人们没有意识到这些特征，就会导致bug。</p>
<p>一方面，虽然NaN的意思是“不是数字”，但它的类型是，数字：</p>
<pre><code class="hljs javascript"><span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-literal">NaN</span> === <span class="hljs-string">"number"</span>);  <span class="hljs-comment">// logs "true"</span>

</code></pre><p>此外，NaN相比任何事情 - 甚至本身！ - 是false：</p>
<pre><code class="hljs javascript"><span class="hljs-built_in">console</span>.log(<span class="hljs-literal">NaN</span> === <span class="hljs-literal">NaN</span>);  <span class="hljs-comment">// logs "false"</span>

</code></pre><p>测试数字是否等于NaN的半可靠方法是使用内置函数isNaN（），但即使使用<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN#Confusing_special-case_behavior">isNaN（）也不是一个好的解决方案。</a>.</p>
<p>一个更好的解决方案要么是使用value！==值，如果该值等于NaN，那么只会生成true。另外，ES6提供了一个新的<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN">Number.isNaN（）函数</a> ，它与旧的全局isNaN（）函数不同，也更加可靠。</p>
<h3>8、下面的代码输出什么？解释你的答案。</h3>
<pre><code class="hljs lsl">console.log(<span class="hljs-number">0.1</span> + <span class="hljs-number">0.2</span>);
console.log(<span class="hljs-number">0.1</span> + <span class="hljs-number">0.2</span> == <span class="hljs-number">0.3</span>);

</code></pre>
<p>对这个问题的一个有教养的回答是：“你不能确定。它可能打印出0.3和true，或者可能不打印。 JavaScript中的数字全部用浮点精度处理，因此可能不会总是产生预期的结果。“</p>
<p>上面提供的示例是演示此问题的经典案例。令人惊讶的是，它会打印出来：</p>
<pre><code class="hljs yaml"><span class="hljs-number">0.30000000000000004</span>
<span class="hljs-literal">false</span>

</code></pre><p>一个典型的解决方案是比较两个数字与特殊常数Number.EPSILON之间的绝对差值：</p>
<pre><code class="hljs fortran"><span class="hljs-function"><span class="hljs-keyword">function</span></span> areTheNumbersAlmostEqual(num1, num2) {
    <span class="hljs-keyword">return</span> Math.<span class="hljs-built_in">abs</span>( num1 - num2 ) &lt; <span class="hljs-keyword">Number</span>.<span class="hljs-built_in">EPSILON</span>;
}
console.<span class="hljs-built_in">log</span>(areTheNumbersAlmostEqual(<span class="hljs-number">0.1</span> + <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>));

</code></pre>
<p>讨论写函数的可能方法isInteger（x），它确定x是否是一个整数。</p>
<p>这听起来很平凡，事实上，ECMAscript 6为此正好引入了一个新的Number.isInteger（）函数，这是微不足道的。但是，在ECMAScript 6之前，这有点复杂，因为没有提供与Number.isInteger（）方法等价的方法。</p>
<p>问题在于，在ECMAScript规范中，整数只在概念上存在;即数值始终作为浮点值存储。</p>
<p>考虑到这一点，最简单，最清洁的ECMAScript-6之前的解决方案（即使将非数字值（例如字符串或空值）传递给该函数，该解决方案也具有足够的可靠性以返回false）将成为以下用法按位异或运算符：</p>
<pre><code class="hljs ada"><span class="hljs-keyword">function</span> <span class="hljs-title">isInteger</span>(x) { <span class="hljs-keyword">return</span> <span class="hljs-type">(x</span> ^ <span class="hljs-number">0</span>) === x; } 

</code></pre>
<p>下面的解决方案也可以工作，尽管不如上面那样高雅</p>
<pre><code class="hljs ada"><span class="hljs-keyword">function</span> <span class="hljs-title">isInteger</span>(x) { <span class="hljs-keyword">return</span> <span class="hljs-type">Math.round(x)</span> === x; }

</code></pre>
<p>请注意，在上面的实现中Math.ceil（）或Math.floor（）可以同样使用（而不是Math.round（））。</p>
<p>或者：</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isInteger</span><span class="hljs-params">(x)</span> </span>{ <span class="hljs-keyword">return</span> (<span class="hljs-keyword">typeof</span> x === <span class="hljs-string">'number'</span>) &amp;&amp; (x % <span class="hljs-number">1</span> === <span class="hljs-number">0</span>); }

</code></pre>
<p>一个相当常见的不正确的解决方案如下：</p>
<pre><code class="hljs ada"><span class="hljs-keyword">function</span> <span class="hljs-title">isInteger</span>(x) { <span class="hljs-keyword">return</span> <span class="hljs-type">parseInt(x,</span> <span class="hljs-number">10</span>) === x; }

</code></pre>
<p>虽然这个基于parseInt的方法对许多x值很有效，但一旦x变得相当大，它将无法正常工作。问题是parseInt（）在解析数字之前将其第一个参数强制转换为字符串。因此，一旦数字变得足够大，其字符串表示将以指数形式呈现（例如1e + 21）。因此，parseInt（）将尝试解析1e + 21，但是当它到达e字符时将停止解析，因此将返回值1.观察：</p>
<pre><code class="hljs arduino">&gt; <span class="hljs-keyword">String</span>(<span class="hljs-number">1000000000000000000000</span>)
<span class="hljs-string">'1e+21'</span>

</code></pre>
<pre><code class="hljs lsl">&gt; parseInt(<span class="hljs-number">1000000000000000000000</span>, <span class="hljs-number">10</span>)
<span class="hljs-number">1</span>

</code></pre>
<pre><code class="hljs lsl">&gt; parseInt(<span class="hljs-number">1000000000000000000000</span>, <span class="hljs-number">10</span>) === <span class="hljs-number">1000000000000000000000</span>
false

</code></pre>
<h3>9、执行下面的代码时，按什么顺序将数字1-4记录到控制台？为什么？</h3>
<pre><code class="hljs scheme">(<span class="hljs-name">function</span>() {
    console.log(<span class="hljs-name">1</span>)<span class="hljs-comment">; </span>
    setTimeout(<span class="hljs-name">function</span>(){console.log(<span class="hljs-name">2</span>)}, <span class="hljs-number">1000</span>)<span class="hljs-comment">; </span>
    setTimeout(<span class="hljs-name">function</span>(){console.log(<span class="hljs-name">3</span>)}, <span class="hljs-number">0</span>)<span class="hljs-comment">; </span>
    console.log(<span class="hljs-name">4</span>)<span class="hljs-comment">;</span>
})()<span class="hljs-comment">;</span>

</code></pre><p>这些值将按以下顺序记录：</p>
<pre><code class="hljs lsl"><span class="hljs-number">1</span>
<span class="hljs-number">4</span>
<span class="hljs-number">3</span>
<span class="hljs-number">2</span>

</code></pre><p>我们先来解释一下这些可能更为明显的部分：</p>
<ul>
<li><p>首先显示1和4，因为它们是通过简单调用console.log（）而没有任何延迟记录的</p>
</li>
<li><p>在3之后显示，因为在延迟1000毫秒（即1秒）之后记录2，而在0毫秒的延迟之后记录3。</p>
</li>
</ul>
<p>好的。但是，如果在延迟0毫秒后记录3，这是否意味着它正在被立即记录？而且，如果是这样，不应该在4之前记录它，因为4是由后面的代码行记录的吗？</p>
<p>答案与正确理解<a href="http://javascript.info/tutorial/events-and-timing-depth">JavaScript事件和时间有关。 </a>.</p>
<p>浏览器有一个事件循环，它检查事件队列并处理未决事件。例如，如果在浏览器繁忙时（例如，处理onclick）在后台发生事件（例如脚本onload事件），则该事件被附加到队列中。当onclick处理程序完成时，将检查队列并处理该事件（例如，执行onload脚本）。</p>
<p>同样，如果浏览器繁忙，setTimeout（）也会将其引用函数的执行放入事件队列中。</p>
<p>当值为零作为setTimeout（）的第二个参数传递时，它将尝试“尽快”执行指定的函数。具体来说，函数的执行放置在事件队列中，以在下一个计时器滴答时发生。但请注意，这不是直接的;该功能不会执行，直到下一个滴答声。这就是为什么在上面的例子中，调用console.log（4）发生在调用console.log（3）之前（因为调用console.log（3）是通过setTimeout调用的，所以稍微延迟了一点）。</p>
<h3>10、编写一个简单的函数（少于160个字符），返回一个布尔值，指示字符串是否是<a href="http://www.palindromelist.net/">palindrome</a>。</h3>
<p>如果str是回文，以下一行函数将返回true;否则，它返回false。</p>
<pre><code class="hljs processing">function isPalindrome(<span class="hljs-built_in">str</span>) {
  <span class="hljs-built_in">str</span> = <span class="hljs-built_in">str</span>.replace(/\W/g, <span class="hljs-string">''</span>).toLowerCase();
  <span class="hljs-keyword">return</span> (<span class="hljs-built_in">str</span> == <span class="hljs-built_in">str</span>.<span class="hljs-built_in">split</span>(<span class="hljs-string">''</span>).<span class="hljs-built_in">reverse</span>().<span class="hljs-built_in">join</span>(<span class="hljs-string">''</span>));
}

</code></pre>
<p>例如：</p>
<pre><code class="hljs 1c">console.<span class="hljs-built_in">log</span>(isPalindrome(<span class="hljs-string">"level"</span>));                   <span class="hljs-comment">// logs 'true'</span>
console.<span class="hljs-built_in">log</span>(isPalindrome(<span class="hljs-string">"levels"</span>));                  <span class="hljs-comment">// logs 'false'</span>
console.<span class="hljs-built_in">log</span>(isPalindrome(<span class="hljs-string">"A car, a man, a maraca"</span>));  <span class="hljs-comment">// logs 'true'</span>

</code></pre>
<h3>11、写一个sum方法，当使用下面的语法调用时它将正常工作。</h3>
<pre><code class="hljs gams">console.<span class="hljs-built-in">log</span>(<span class="hljs-keyword">sum</span>(<span class="hljs-number">2</span>,<span class="hljs-number">3</span>));   <span class="hljs-comment">// Outputs 5</span>
console.<span class="hljs-built-in">log</span>(<span class="hljs-keyword">sum</span>(<span class="hljs-number">2</span>)(<span class="hljs-number">3</span>));  <span class="hljs-comment">// Outputs 5</span>

</code></pre><p>有（至少）两种方法可以做到这一点：</p>
<p><strong>METHOD 1</strong></p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">arguments</span>.length == <span class="hljs-number">2</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] + <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>];
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">y</span>) </span>{ <span class="hljs-keyword">return</span> x + y; };
  }
}

</code></pre><p>在JavaScript中，函数提供对参数对象的访问，该对象提供对传递给函数的实际参数的访问。这使我们能够使用length属性在运行时确定传递给函数的参数的数量</p>
<p>如果传递两个参数，我们只需将它们相加并返回。</p>
<p>否则，我们假设它是以sum（2）（3）的形式被调用的，所以我们返回一个匿名函数，它将传递给sum（）（在本例中为2）的参数和传递给匿名函数的参数这种情况3）。</p>
<p><strong>METHOD 2</strong></p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span><span class="hljs-params">(x, y)</span> </span>{
  <span class="hljs-keyword">if</span> (y !== <span class="hljs-literal">undefined</span>) {
    <span class="hljs-keyword">return</span> x + y;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(y)</span> </span>{ <span class="hljs-keyword">return</span> x + y; };
  }
}

</code></pre><p>当函数被调用时，JavaScript不需要参数的数量来匹配函数定义中参数的数量。如果传递的参数数量超过了函数定义中参数的数量，则超出的参数将被忽略。另一方面，如果传递的参数数量少于函数定义中的参数数量，则在函数内引用时，缺少的参数将具有未定义的值。因此，在上面的例子中，通过简单地检查第二个参数是否未定义，我们可以确定函数被调用的方式并相应地继续。</p>
<h3>12、考虑下面的代码片段</h3>
<pre><code class="hljs javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
  <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'button'</span>);
  btn.appendChild(<span class="hljs-built_in">document</span>.createTextNode(<span class="hljs-string">'Button '</span> + i));
  btn.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-built_in">console</span>.log(i); });
  <span class="hljs-built_in">document</span>.body.appendChild(btn);
}

</code></pre>
<p>(a) 当用户点击“按钮4”时，什么被记录到控制台？为什么？</p>
<p>(b) 提供一个或多个可按预期工作的替代实现。</p>
<p>答：</p>
<p>(a) 无论用户点击哪个按钮，数字5将始终记录到控制台。这是因为，在调用onclick方法（对于任何按钮）时，for循环已经完成，并且变量i已经具有值5.（如果受访者知道足够的话就可以获得奖励点数关于执行上下文，变量对象，激活对象和内部“范围”属性如何影响闭包行为。）</p>
<p>(b) 使这项工作的关键是通过将它传递给新创建的函数对象来捕获每次通过for循环的i的值。以下是四种可能的方法来实现这一点：</p>
<pre><code class="hljs lisp">for (<span class="hljs-name">var</span> i = <span class="hljs-number">0</span><span class="hljs-comment">; i &lt; 5; i++) {</span>
  var btn = document.createElement('button')<span class="hljs-comment">;</span>
  btn.appendChild(<span class="hljs-name">document</span>.createTextNode('Button ' + i))<span class="hljs-comment">;</span>
  btn.addEventListener('click', (<span class="hljs-name">function</span>(<span class="hljs-name">i</span>) {
    return function() { console.log(<span class="hljs-name">i</span>)<span class="hljs-comment">; };</span>
  })(<span class="hljs-name">i</span>))<span class="hljs-comment">;</span>
  document.body.appendChild(<span class="hljs-name">btn</span>)<span class="hljs-comment">;</span>
}

</code></pre>
<p>或者，您可以将新的匿名函数中的整个调用包装为btn.addEventListener：</p>
<pre><code class="hljs lisp">for (<span class="hljs-name">var</span> i = <span class="hljs-number">0</span><span class="hljs-comment">; i &lt; 5; i++) {</span>
  var btn = document.createElement('button')<span class="hljs-comment">;</span>
  btn.appendChild(<span class="hljs-name">document</span>.createTextNode('Button ' + i))<span class="hljs-comment">;</span>
  (<span class="hljs-name">function</span> (<span class="hljs-name">i</span>) {
    btn.addEventListener('click', function() { console.log(<span class="hljs-name">i</span>)<span class="hljs-comment">; });</span>
  })(<span class="hljs-name">i</span>)<span class="hljs-comment">;</span>
  document.body.appendChild(<span class="hljs-name">btn</span>)<span class="hljs-comment">;</span>
}

</code></pre>
<p>或者，我们可以通过调用数组对象的原生forEach方法来替换for循环：</p>
<pre><code class="hljs javascript">[<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'d'</span>, <span class="hljs-string">'e'</span>].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value, i</span>) </span>{
  <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'button'</span>);
  btn.appendChild(<span class="hljs-built_in">document</span>.createTextNode(<span class="hljs-string">'Button '</span> + i));
  btn.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(i); });
  <span class="hljs-built_in">document</span>.body.appendChild(btn);
});

</code></pre>
<p>最后，最简单的解决方案，如果你在ES6 / ES2015上下文中，就是使用let i而不是var i：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
  <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'button'</span>);
  btn.appendChild(<span class="hljs-built_in">document</span>.createTextNode(<span class="hljs-string">'Button '</span> + i));
  btn.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-built_in">console</span>.log(i); });
  <span class="hljs-built_in">document</span>.body.appendChild(btn);
}

</code></pre>
<h3>13、假设d是范围内的“空”对象：</h3>
<pre><code class="hljs ebnf"><span class="hljs-attribute">var d</span> = {};

</code></pre>
<p>...使用下面的代码完成了什么？</p>
<pre><code class="hljs actionscript">[ <span class="hljs-string">'zebra'</span>, <span class="hljs-string">'horse'</span> ].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(k)</span> </span>{
    d[k] = <span class="hljs-literal">undefined</span>;
});

</code></pre>
<p>上面显示的代码片段在对象d上设置了两个属性。理想情况下，对具有未设置键的JavaScript对象执行的查找评估为未定义。但是运行这段代码会将这些属性标记为对象的“自己的属性”。</p>
<p>这是确保对象具有一组给定属性的有用策略。将该对象传递给Object.keys将返回一个包含这些设置键的数组（即使它们的值未定义）。</p>
<h3>14、下面的代码将输出到控制台，为什么？</h3>
<pre><code class="hljs maxima"><span class="hljs-built_in">var</span> arr1 = <span class="hljs-string">"john"</span>.<span class="hljs-built_in">split</span>('');
<span class="hljs-built_in">var</span> arr2 = arr1.<span class="hljs-built_in">reverse</span>();
<span class="hljs-built_in">var</span> arr3 = <span class="hljs-string">"jones"</span>.<span class="hljs-built_in">split</span>('');
arr2.<span class="hljs-built_in">push</span>(arr3);
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"array 1: length="</span> + arr1.<span class="hljs-built_in">length</span> + <span class="hljs-string">" last="</span> + arr1.slice(-<span class="hljs-number">1</span>));
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"array 2: length="</span> + arr2.<span class="hljs-built_in">length</span> + <span class="hljs-string">" last="</span> + arr2.slice(-<span class="hljs-number">1</span>));

</code></pre>
<p>记录的输出将是：</p>
<pre><code class="hljs 1c"><span class="hljs-string">"array 1: length=5 last=j,o,n,e,s"</span>
<span class="hljs-string">"array 2: length=5 last=j,o,n,e,s"</span>

</code></pre><p>arr1和arr2是相同的（即['n'，'h'，'o'，'j'，['j'，'o'，'n'，'e'，'s']]）上述代码由于以下原因而被执行：</p>
<ul>
<li><p>调用数组对象的reverse（）方法不仅以相反的顺序返回数组，它还颠倒了数组本身的顺序（即在这种情况下，arr1）。</p>
</li>
<li><p>reverse（）方法返回对数组本身的引用（即，在这种情况下为arr1）。因此，arr2仅仅是对arr1的引用（而不是副本）。因此，当对arr2做任何事情时（即，当我们调用arr2.push（arr3）;）时，arr1也会受到影响，因为arr1和arr2只是对同一个对象的引用。</p>
</li>
</ul>
<p>这里有几个观点可以让人们回答这个问题：</p>
<ul>
<li><p>将数组传递给另一个数组的push（）方法会将整个数组作为单个元素推入数组的末尾。结果，声明arr2.push（arr3）;将arr3作为一个整体添加到arr2的末尾（即，它不连接两个数组，这就是concat（）方法的用途）。</p>
</li>
<li><p>像Python一样，JavaScript在调用像slice（）这样的数组方法时，会承认负面下标，以此作为在数组末尾引用元素的方式;例如，下标-1表示数组中的最后一个元素，依此类推。</p>
</li>
</ul>
<h3>15、下面的代码将输出到控制台，为什么？</h3>
<pre><code class="hljs 1c">console.<span class="hljs-built_in">log</span>(<span class="hljs-number">1</span> +  <span class="hljs-string">"2"</span> + <span class="hljs-string">"2"</span>);
console.<span class="hljs-built_in">log</span>(<span class="hljs-number">1</span> +  +<span class="hljs-string">"2"</span> + <span class="hljs-string">"2"</span>);
console.<span class="hljs-built_in">log</span>(<span class="hljs-number">1</span> +  -<span class="hljs-string">"1"</span> + <span class="hljs-string">"2"</span>);
console.<span class="hljs-built_in">log</span>(+<span class="hljs-string">"1"</span> +  <span class="hljs-string">"1"</span> + <span class="hljs-string">"2"</span>);
console.<span class="hljs-built_in">log</span>( <span class="hljs-string">"A"</span> - <span class="hljs-string">"B"</span> + <span class="hljs-string">"2"</span>);
console.<span class="hljs-built_in">log</span>( <span class="hljs-string">"A"</span> - <span class="hljs-string">"B"</span> + <span class="hljs-number">2</span>);

</code></pre><p>以上代码将输出到控制台：</p>
<pre><code class="hljs javascript"><span class="hljs-string">"122"</span>
<span class="hljs-string">"32"</span>
<span class="hljs-string">"02"</span>
<span class="hljs-string">"112"</span>
<span class="hljs-string">"NaN2"</span>
<span class="hljs-literal">NaN</span>

</code></pre><p>这是为什么...</p>
<p>这里的基本问题是JavaScript（ECMAScript）是一种松散类型的语言，它对值执行自动类型转换以适应正在执行的操作。让我们来看看这是如何与上面的每个例子进行比较。</p>
<p>示例1：1 +“2”+“2”输出：“122”说明：第一个操作在1 +“2”中执行。由于其中一个操作数（“2”）是一个字符串，所以JavaScript假定需要执行字符串连接，因此将1的类型转换为“1”，1 +“2”转换为“12”。然后，“12”+“2”产生“122”。</p>
<p>示例2：1 + +“2”+“2”输出：“32”说明：根据操作顺序，要执行的第一个操作是+“2”（第一个“2”之前的额外+被视为一个一元运算符）。因此，JavaScript将“2”的类型转换为数字，然后将一元+符号应用于它（即将其视为正数）。结果，下一个操作现在是1 + 2，当然这会产生3.但是，我们有一个数字和一个字符串之间的操作（即3和“2”），所以JavaScript再次转换数值赋给一个字符串并执行字符串连接，产生“32”。</p>
<p>示例3：1 + - “1”+“2”输出：“02”说明：这里的解释与前面的示例相同，只是一元运算符是 - 而不是+。因此，“1”变为1，然后在应用 - 时将其变为-1，然后将其加1到产生0，然后转换为字符串并与最终的“2”操作数连接，产生“02”。</p>
<p>示例4：+“1”+“1”+“2”输出：“112”说明：尽管第一个“1”操作数是基于其前面的一元+运算符的数值类型转换的，当它与第二个“1”操作数连接在一起时返回一个字符串，然后与最终的“2”操作数连接，产生字符串“112”。</p>
<p>示例5：“A” - “B”+“2”输出：“NaN2”说明：由于 - 运算符不能应用于字符串，并且既不能将“A”也不能将“B”转换为数值， “ - ”B“产生NaN，然后​​与字符串”2“串联产生”NaN2“。</p>
<p>例6：“A” - “B”+2输出：NaN说明：在前面的例子中，“A” - “B”产生NaN。但是任何运算符应用于NaN和其他数字操作数仍然会产生NaN。</p>
<h3>16、如果数组列表太大，以下递归代码将导致堆栈溢出。你如何解决这个问题，仍然保留递归模式？</h3>
<pre><code class="hljs php"><span class="hljs-keyword">var</span> <span class="hljs-keyword">list</span> = readHugeList();

<span class="hljs-keyword">var</span> nextListItem = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> item = <span class="hljs-keyword">list</span>.pop();

    <span class="hljs-keyword">if</span> (item) {
        <span class="hljs-comment">// process the list item...</span>
        nextListItem();
    }
};

</code></pre><p>通过修改nextListItem函数可以避免潜在的堆栈溢出，如下所示：</p>
<pre><code class="hljs php"><span class="hljs-keyword">var</span> <span class="hljs-keyword">list</span> = readHugeList();

<span class="hljs-keyword">var</span> nextListItem = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> item = <span class="hljs-keyword">list</span>.pop();

    <span class="hljs-keyword">if</span> (item) {
        <span class="hljs-comment">// process the list item...</span>
        setTimeout( nextListItem, <span class="hljs-number">0</span>);
    }
};

</code></pre><p>堆栈溢出被消除，因为事件循环处理递归，而不是调用堆栈。当nextListItem运行时，如果item不为null，则将超时函数（nextListItem）推送到事件队列，并且函数退出，从而使调用堆栈清零。当事件队列运行超时事件时，将处理下一个项目，并设置一个计时器以再次调用nextListItem。因此，该方法从头到尾不经过直接递归调用即可处理，因此调用堆栈保持清晰，无论迭代次数如何。</p>
<h3>17、什么是JavaScript中的“闭包”？举一个例子。</h3>
<p>闭包是一个内部函数，它可以访问外部（封闭）函数的作用域链中的变量。闭包可以访问三个范围内的变量;具体来说：（1）变量在其自己的范围内，（2）封闭函数范围内的变量，以及（3）全局变量。</p>
<p>这里是一个例子：</p>
<pre><code class="hljs lisp">var globalVar = <span class="hljs-string">"xyz"</span><span class="hljs-comment">;</span>

(<span class="hljs-name">function</span> outerFunc(<span class="hljs-name">outerArg</span>) {
    var outerVar = 'a'<span class="hljs-comment">;</span>

    (<span class="hljs-name">function</span> innerFunc(<span class="hljs-name">innerArg</span>) {
    var innerVar = 'b'<span class="hljs-comment">;</span>

    console.log(
        <span class="hljs-string">"outerArg = "</span> + outerArg + <span class="hljs-string">"\n"</span> +
        <span class="hljs-string">"innerArg = "</span> + innerArg + <span class="hljs-string">"\n"</span> +
        <span class="hljs-string">"outerVar = "</span> + outerVar + <span class="hljs-string">"\n"</span> +
        <span class="hljs-string">"innerVar = "</span> + innerVar + <span class="hljs-string">"\n"</span> +
        <span class="hljs-string">"globalVar = "</span> + globalVar)<span class="hljs-comment">;</span>

    })(<span class="hljs-number">456</span>)<span class="hljs-comment">;</span>
})(<span class="hljs-number">123</span>)<span class="hljs-comment">;</span>

</code></pre>
<p>在上面的例子中，innerFunc，outerFunc和全局名称空间的变量都在innerFunc的范围内。上面的代码将产生以下输出：</p>
<pre><code class="hljs ini"><span class="hljs-attr">outerArg</span> = <span class="hljs-number">123</span>
<span class="hljs-attr">innerArg</span> = <span class="hljs-number">456</span>
<span class="hljs-attr">outerVar</span> = a
<span class="hljs-attr">innerVar</span> = b
<span class="hljs-attr">globalVar</span> = xyz

</code></pre><h3>18、以下代码的输出是什么：</h3>
<pre><code class="hljs javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(i); }, i * <span class="hljs-number">1000</span> );
}

</code></pre>
<p>解释你的答案。如何在这里使用闭包？</p>
<p>显示的代码示例不会显示值0,1,2,3和4，这可能是预期的;而是显示5,5,5,5。</p>
<p>这是因为循环内执行的每个函数将在整个循环完成后执行，因此所有函数都会引用存储在i中的最后一个值，即5。</p>
<p>通过为每次迭代创建一个<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures">唯一的作用域</a> ，可以使用闭包来防止这个问题，并将该变量的每个唯一值存储在其作用域中，如下所示：</p>
<pre><code class="hljs lisp">for (<span class="hljs-name">var</span> i = <span class="hljs-number">0</span><span class="hljs-comment">; i &lt; 5; i++) {</span>
    (<span class="hljs-name">function</span>(<span class="hljs-name">x</span>) {
        setTimeout(<span class="hljs-name">function</span>() { console.log(<span class="hljs-name">x</span>)<span class="hljs-comment">; }, x * 1000 );</span>
    })(<span class="hljs-name">i</span>)<span class="hljs-comment">;</span>
}

</code></pre>
<p>这会产生将0,1,2,3和4记录到控制台的可能结果。</p>
<p>在<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#Creating_closures_in_loops_A_common_mistake">ES2015上下文中</a>，您可以在原始代码中简单地使用let而不是var：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(i); }, i * <span class="hljs-number">1000</span> );
}

</code></pre>
<h3>19、以下几行代码输出到控制台？</h3>
<pre><code class="hljs 1c">console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"0 || 1 = "</span>+(<span class="hljs-number">0</span> <span class="hljs-string">|| 1));</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"1 || 2 = "</span>+(<span class="hljs-number">1</span> <span class="hljs-string">|| 2));</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"0 &amp;&amp; 1 = "</span>+(<span class="hljs-number">0</span> <span class="hljs-meta">&amp;&amp; 1));</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"1 &amp;&amp; 2 = "</span>+(<span class="hljs-number">1</span> <span class="hljs-meta">&amp;&amp; 2));</span>

</code></pre>
<p>解释你的答案。 </p>
<p>该代码将输出以下四行：</p>
<pre><code class="hljs basic"><span class="hljs-symbol">0 </span>|| <span class="hljs-number">1</span> = <span class="hljs-number">1</span>
<span class="hljs-symbol">1 </span>|| <span class="hljs-number">2</span> = <span class="hljs-number">1</span>
<span class="hljs-symbol">0 </span>&amp;&amp; <span class="hljs-number">1</span> = <span class="hljs-number">0</span>
<span class="hljs-symbol">1 </span>&amp;&amp; <span class="hljs-number">2</span> = <span class="hljs-number">2</span>

</code></pre>
<p>在JavaScript中，都是||和&amp;&amp;是逻辑运算符，当从左向右计算时返回第一个完全确定的“逻辑值”。</p>
<p>或（||）运算符。在形式为X || Y的表达式中，首先计算X并将其解释为布尔值。如果此布尔值为真，则返回true（1），并且不计算Y，因为“或”条件已经满足。但是，如果此布尔值为“假”，我们仍然不知道X || Y是真还是假，直到我们评估Y，并将其解释为布尔值。</p>
<p>因此，0 || 1评估为真（1），正如1 || 2。</p>
<p>和（&amp;&amp;）运算符。在X &amp;&amp; Y形式的表达式中，首先评估X并将其解释为布尔值。如果此布尔值为false，则返回false（0）并且不评估Y，因为“and”条件已失败。但是，如果这个布尔值为“真”，我们仍然不知道X &amp;&amp; Y是真还是假，直到我们评估Y，并将其解释为布尔值。</p>
<p>然而，&amp;&amp;运算符的有趣之处在于，当表达式评估为“真”时，则返回表达式本身。这很好，因为它在逻辑表达式中被视为“真”，但也可以用于在您关心时返回该值。这解释了为什么，有点令人惊讶的是，1 &amp;&amp; 2返回2（而你可能会期望它返回true或1）。</p>
<h3>20 、下面的代码执行时输出是什么？说明。</h3>
<pre><code class="hljs cpp">console.<span class="hljs-built_in">log</span>(<span class="hljs-literal">false</span> == <span class="hljs-string">'0'</span>)
console.<span class="hljs-built_in">log</span>(<span class="hljs-literal">false</span> === <span class="hljs-string">'0'</span>)

</code></pre>
<p>该代码将输出：</p>
<pre><code class="hljs yaml"><span class="hljs-literal">true</span>
<span class="hljs-literal">false</span>

</code></pre><p>在JavaScript中，有两套相等运算符。三重相等运算符===的行为与任何传统的相等运算符相同：如果两侧的两个表达式具有相同的类型和相同的值，则计算结果为true。然而，双等号运算符在比较它们之前试图强制这些值。因此，通常使用===而不是==。对于！== vs！=也是如此。</p>
<h3>21、以下代码的输出是什么？解释你的答案。</h3>
<pre><code class="hljs mipsasm">var a={},
    <span class="hljs-keyword">b={key:'b'},
</span>    c={key:<span class="hljs-string">'c'</span>}<span class="hljs-comment">;</span>

a[<span class="hljs-keyword">b]=123;
</span>a[c]=<span class="hljs-number">456</span><span class="hljs-comment">;</span>

console.log(a[<span class="hljs-keyword">b]);
</span>
</code></pre>
<p>此代码的输出将是456（不是123）。</p>
<p>原因如下：设置对象属性时，JavaScript会隐式地将参数值串联起来。在这种情况下，由于b和c都是对象，它们都将被转换为“[object Object]”。因此，a [b]和a [c]都等价于[“[object Object]”]，并且可以互换使用。因此，设置或引用[c]与设置或引用[b]完全相同。</p>
<h3>22、以下代码将输出到控制台中.</h3>
<pre><code class="hljs matlab">console.<span class="hljs-built_in">log</span>((<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span><span class="hljs-params">(n)</span>{<span class="hljs-title">return</span> <span class="hljs-params">((n &gt; 1)</span> ? <span class="hljs-title">n</span> * <span class="hljs-title">f</span><span class="hljs-params">(n-1)</span> : <span class="hljs-title">n</span>)})<span class="hljs-params">(10)</span>);</span>

</code></pre><p>该代码将输出10阶乘的值（即10！或3,628,800）。</p>
<p>原因如下： </p>
<p>命名函数f（）以递归方式调用自身，直到它调用f（1），它简单地返回1.因此，这就是它的作用：</p>
<pre><code class="hljs stata"><span class="hljs-built_in">f</span>(1): returns <span class="hljs-keyword">n</span>, <span class="hljs-keyword">which</span> is 1
<span class="hljs-built_in">f</span>(2): returns 2 * <span class="hljs-built_in">f</span>(1), <span class="hljs-keyword">which</span> is 2
<span class="hljs-built_in">f</span>(3): returns 3 * <span class="hljs-built_in">f</span>(2), <span class="hljs-keyword">which</span> is 6
<span class="hljs-built_in">f</span>(4): returns 4 * <span class="hljs-built_in">f</span>(3), <span class="hljs-keyword">which</span> is 24
<span class="hljs-built_in">f</span>(5): returns 5 * <span class="hljs-built_in">f</span>(4), <span class="hljs-keyword">which</span> is 120
<span class="hljs-built_in">f</span>(6): returns 6 * <span class="hljs-built_in">f</span>(5), <span class="hljs-keyword">which</span> is 720
<span class="hljs-built_in">f</span>(7): returns 7 * <span class="hljs-built_in">f</span>(6), <span class="hljs-keyword">which</span> is 5040
<span class="hljs-built_in">f</span>(8): returns 8 * <span class="hljs-built_in">f</span>(7), <span class="hljs-keyword">which</span> is 40320
<span class="hljs-built_in">f</span>(9): returns 9 * <span class="hljs-built_in">f</span>(8), <span class="hljs-keyword">which</span> is 362880
<span class="hljs-built_in">f</span>(10): returns 10 * <span class="hljs-built_in">f</span>(9), <span class="hljs-keyword">which</span> is 3628800

</code></pre><h3>23 、考虑下面的代码片段。控制台的输出是什么，为什么？</h3>
<pre><code class="hljs clojure">(<span class="hljs-name">function</span>(<span class="hljs-name">x</span>) {
    return (<span class="hljs-name">function</span>(<span class="hljs-name">y</span>) {
        console.log(<span class="hljs-name">x</span>)<span class="hljs-comment">;</span>
    })(<span class="hljs-number">2</span>)
})(<span class="hljs-number">1</span>)<span class="hljs-comment">;</span>

</code></pre><p>输出将为1，即使x的值从未在内部函数中设置。原因如下：</p>
<p>正如我们的<a href="https://www.toptal.com/javascript#hiring-guide">JavaScript招聘指南</a>中所解释的，闭包是一个函数，以及创建闭包时在范围内的所有变量或函数。在JavaScript中，闭包被实现为“内部函数”;即在另一功能的主体内定义的功能。闭包的一个重要特征是内部函数仍然可以访问外部函数的变量。</p>
<p>因此，在这个例子中，因为x没有在内部函数中定义，所以在外部函数的作用域中搜索一个定义的变量x，该变量的值为1。</p>
<h3>24、以下代码将输出到控制台以及为什么</h3>
<pre><code class="hljs javascript"><span class="hljs-keyword">var</span> hero = {
    <span class="hljs-attr">_name</span>: <span class="hljs-string">'John Doe'</span>,
    <span class="hljs-attr">getSecretIdentity</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._name;
    }
};

<span class="hljs-keyword">var</span> stoleSecretIdentity = hero.getSecretIdentity;

<span class="hljs-built_in">console</span>.log(stoleSecretIdentity());
<span class="hljs-built_in">console</span>.log(hero.getSecretIdentity());

</code></pre><p>这段代码有什么问题，以及如何解决这个问题。</p>
<p>该代码将输出：</p>
<pre><code class="hljs actionscript"><span class="hljs-literal">undefined</span>
John Doe

</code></pre><p>第一个console.log打印未定义，因为我们从hero对象中提取方法，所以stoleSecretIdentity（）在_name属性不存在的全局上下文（即窗口对象）中被调用。</p>
<p>修复stoleSecretIdentity（）函数的一种方法如下：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">var stoleSecretIdentity</span> = hero.getSecretIdentity.bind(hero);

</code></pre><h3>25、创建一个函数，给定页面上的DOM元素，将访问元素本身及其所有后代（<em>不仅仅是它的直接子元素</em>）。对于每个访问的元素，函数应该将该元素传递给提供的回调函数。</h3>
<p>该函数的参数应该是：</p>
<ul>
<li>一个 DOM 元素</li>
<li>一个回调函数（以DOM元素作为参数）</li>
</ul>
<p>访问树中的所有元素（DOM）是[经典的深度优先搜索算法]<a href="https://en.wikipedia.org/wiki/Depth-first_search">Depth-First-Search algorithm</a>应用程序。以下是一个示例解决方案：</p>
<pre><code class="hljs php"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Traverse</span><span class="hljs-params">(p_element,p_callback)</span> </span>{
   p_callback(p_element);
   <span class="hljs-keyword">var</span> <span class="hljs-keyword">list</span> = p_element.children;
   <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">list</span>.length; i++) {
       Traverse(<span class="hljs-keyword">list</span>[i],p_callback);  <span class="hljs-comment">// recursive call</span>
   }
}

</code></pre><h3>27、在JavaScript中测试您的这些知识：以下代码的输出是什么？</h3>
<pre><code class="hljs javascript"><span class="hljs-keyword">var</span> length = <span class="hljs-number">10</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.length);
}

<span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">length</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attr">method</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{
    fn();
    <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]();
  }
};

obj.method(fn, <span class="hljs-number">1</span>);

</code></pre>
<p>输出：</p>
<pre><code class="hljs lsl"><span class="hljs-number">10</span>
<span class="hljs-number">2</span>

</code></pre><p>为什么不是10和5？</p>
<p>首先，由于fn作为函数方法的参数传递，函数fn的作用域（this）是窗口。 var length = 10;在窗口级别声明。它也可以作为window.length或length或this.length来访问（当这个===窗口时）。</p>
<p>方法绑定到Object obj，obj.method用参数fn和1调用。虽然方法只接受一个参数，但调用它时已经传递了两个参数;第一个是函数回调，其他只是一个数字。</p>
<p>当在内部方法中调用fn（）时，该函数在全局级别作为参数传递，this.length将有权访问在Object obj中定义的var length = 10（全局声明）而不是length = 5。</p>
<p>现在，我们知道我们可以使用arguments []数组访问JavaScript函数中的任意数量的参数。</p>
<p>因此arguments0只不过是调用fn（）。在fn里面，这个函数的作用域成为参数数组，并且记录参数[]的长度将返回2。</p>
<p>因此输出将如上所述。</p>
<h3>28、考虑下面的代码。输出是什么，为什么？</h3>
<pre><code class="hljs clojure">(<span class="hljs-name">function</span> () {
    try {
        throw new Error()<span class="hljs-comment">;</span>
    } catch (<span class="hljs-name">x</span>) {
        var x = <span class="hljs-number">1</span>, y = <span class="hljs-number">2</span><span class="hljs-comment">;</span>
        console.log(<span class="hljs-name">x</span>)<span class="hljs-comment">;</span>
    }
    console.log(<span class="hljs-name">x</span>)<span class="hljs-comment">;</span>
    console.log(<span class="hljs-name">y</span>)<span class="hljs-comment">;</span>
})()<span class="hljs-comment">;</span>

</code></pre>
<pre><code class="hljs lsl"><span class="hljs-number">1</span>
undefined
<span class="hljs-number">2</span>

</code></pre><p>var语句被挂起（没有它们的值初始化）到它所属的全局或函数作用域的顶部，即使它位于with或catch块内。但是，错误的标识符只在catch块内部可见。它相当于：</p>
<pre><code class="hljs javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> x, y; <span class="hljs-comment">// outer and hoisted</span>
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>();
    } <span class="hljs-keyword">catch</span> (x <span class="hljs-comment">/* inner */</span>) {
        x = <span class="hljs-number">1</span>; <span class="hljs-comment">// inner x, not the outer one</span>
        y = <span class="hljs-number">2</span>; <span class="hljs-comment">// there is only one y, which is in the outer scope</span>
        <span class="hljs-built_in">console</span>.log(x <span class="hljs-comment">/* inner */</span>);
    }
    <span class="hljs-built_in">console</span>.log(x);
    <span class="hljs-built_in">console</span>.log(y);
})();

</code></pre>
<h3>29、这段代码的输出是什么？</h3>
<pre><code class="hljs javascript"><span class="hljs-keyword">var</span> x = <span class="hljs-number">21</span>;
<span class="hljs-keyword">var</span> girl = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(x);
    <span class="hljs-keyword">var</span> x = <span class="hljs-number">20</span>;
};
girl ();

</code></pre>
<p>21，也不是20，结果是‘undefined’的</p>
<p>这是因为JavaScript初始化没有被挂起。</p>
<p>（为什么它不显示21的全局值？原因是当函数执行时，它检查是否存在本地x变量但尚未声明它，因此它不会查找全局变量。 ）</p>
<h3>30、你如何克隆一个对象？</h3>
<pre><code class="hljs delphi"><span class="hljs-keyword">var</span> obj = <span class="hljs-comment">{a: 1 ,b: 2}</span>
<span class="hljs-keyword">var</span> objclone = <span class="hljs-keyword">Object</span>.assign(<span class="hljs-comment">{}</span>,obj);

</code></pre>
<p>现在objclone的值是{a：1，b：2}，但指向与obj不同的对象。</p>
<p>但请注意潜在的缺陷：Object.clone（）只会执行浅拷贝，而不是深拷贝。这意味着嵌套的对象不会被复制。他们仍然引用与原始相同的嵌套对象：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">let</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">c</span>: {
        <span class="hljs-attr">age</span>: <span class="hljs-number">30</span>
    }
};

<span class="hljs-keyword">var</span> objclone = <span class="hljs-built_in">Object</span>.assign({},obj);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'objclone: '</span>, objclone);

obj.c.age = <span class="hljs-number">45</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'After Change - obj: '</span>, obj);           <span class="hljs-comment">// 45 - This also changes</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'After Change - objclone: '</span>, objclone); <span class="hljs-comment">// 45</span>

</code></pre>
<pre><code class="hljs javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(i); }, i * <span class="hljs-number">1000</span> );
}

</code></pre>
<h3>31、此代码将打印什么？</h3>
<pre><code class="hljs javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(i); }, i * <span class="hljs-number">1000</span> );
}
</code></pre><p>它会打印0 1 2 3 4，因为我们在这里使用let而不是var。变量i只能在for循环的块范围中看到。</p>
<h3>32、以下几行输出什么，为什么？</h3>
<pre><code class="hljs lsl">console.log(<span class="hljs-number">1</span> &lt; <span class="hljs-number">2</span> &lt; <span class="hljs-number">3</span>);
console.log(<span class="hljs-number">3</span> &gt; <span class="hljs-number">2</span> &gt; <span class="hljs-number">1</span>);

</code></pre>
<p>第一条语句返回true，如预期的那样。</p>
<p>第二个返回false是因为引擎如何针对&lt;和&gt;的操作符关联性工作。它比较从左到右，所以3&gt; 2&gt; 1 JavaScript翻译为true&gt; 1. true具有值1，因此它比较1&gt; 1，这是错误的。</p>
<h3>33、如何在数组的开头添加元素？最后如何添加一个？</h3>
<pre><code class="hljs prolog">var myArray = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'d'</span>];
myArray.push(<span class="hljs-string">'end'</span>);
myArray.unshift(<span class="hljs-string">'start'</span>);
console.log(myArray); // [<span class="hljs-string">"start"</span>, <span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>, <span class="hljs-string">"d"</span>, <span class="hljs-string">"end"</span>]

</code></pre>
<p>使用ES6，可以使用扩展运算符：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">myArray</span> = [<span class="hljs-string">'start'</span>, ...myArray];
<span class="hljs-attribute">myArray</span> = [...myArray, <span class="hljs-string">'end'</span>];

</code></pre>
<p>或者，简而言之：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">myArray</span> = [<span class="hljs-string">'start'</span>, ...myArray, <span class="hljs-string">'end'</span>];

</code></pre>
<h3>34、想象一下你有这样的代码:</h3>
<pre><code class="hljs lsl">var a = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];

</code></pre>
<p>a）这会导致崩溃吗？</p>
<pre><code class="hljs ini"><span class="hljs-attr">a[10]</span> = <span class="hljs-number">99</span>;

</code></pre>
<p>b）这个输出是什么？</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-selector-tag">a</span><span class="hljs-selector-attr">[6]</span>);

</code></pre>
<p>a）它不会崩溃。 JavaScript引擎将使阵列插槽3至9成为“空插槽”。</p>
<p>b）在这里，a [6]将输出未定义的值，但时隙仍为空，而不是未定义的。在某些情况下，这可能是一个重要的细微差别。例如，使用map（）时，map（）的输出中的空插槽将保持为空，但未定义的插槽将使用传递给它的函数重映射：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">var</span> b = [<span class="hljs-literal">undefined</span>];
b[<span class="hljs-number">2</span>] = <span class="hljs-number">1</span>;
<span class="hljs-built_in">console</span>.log(b);             <span class="hljs-comment">// (3) [undefined, empty × 1, 1]</span>
<span class="hljs-built_in">console</span>.log(b.map(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> <span class="hljs-number">7</span>)); <span class="hljs-comment">// (3) [7,         empty × 1, 7]</span>

</code></pre>
<h3>35、typeof undefined == typeof NULL的值是什么？</h3>
<p>该表达式将被评估为true，因为NULL将被视为任何其他未定义的变量。</p>
<blockquote>
<p>注意：JavaScript区分大小写，我们在这里使用NULL而不是null。</p>
</blockquote>
<h3>36、代码返回后会怎么样？</h3>
<pre><code class="hljs coffeescript"><span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">typeof</span> <span class="hljs-number">1</span>);

</code></pre>
<p>string</p>
<p>typeof 1将返回“number”，typeof“number”将返回字符串。</p>
<h3>37、以下代码输出什么？为什么？</h3>
<pre><code class="hljs javascript"><span class="hljs-keyword">var</span> b = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">outer</span>(<span class="hljs-params"></span>)</span>{
       <span class="hljs-keyword">var</span> b = <span class="hljs-number">2</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inner</span>(<span class="hljs-params"></span>)</span>{
        b++;
        <span class="hljs-keyword">var</span> b = <span class="hljs-number">3</span>;
        <span class="hljs-built_in">console</span>.log(b)
    }
    inner();
}
outer();

</code></pre>
<p>输出到控制台将是“3”。</p>
<p>在这个例子中有三个闭包，每个都有它自己的var b声明。当调用变量时，将按照从本地到全局的顺序检查闭包，直到找到实例。由于内部闭包有自己的b变量，这就是输出。</p>
<p>此外，由于提升内部的代码将被解释如下：</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inner</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> b; <span class="hljs-comment">// b is undefined</span>
    b++; <span class="hljs-comment">// b is NaN</span>
    b = <span class="hljs-number">3</span>; <span class="hljs-comment">// b is 3</span>
    <span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// output "3"</span>
}

</code></pre>
<p>面试比棘手的技术问题要多，所以这些仅仅是作为指导。并不是每个值得聘用的“A”候选人都能够回答所有问题，也不会回答他们都保证有“A”候选人。<a href="https://www.toptal.com/freelance/in-search-of-the-elite-few-finding-and-hiring-the-best-developers-in-the-industry">在这一天结束时，招聘仍然是一门艺术，一门科学 - 还有很多工作。</a>.</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/37-essential-javascript-interview-questions-and-answers](https://www.zcfy.cc/article/37-essential-javascript-interview-questions-and-answers)
原文标题: 37个JavaScript基本面试问题和解答
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
