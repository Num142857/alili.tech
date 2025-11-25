---
title: '〔总结〕容易遗忘的JS知识点整理' 
date: 2018-12-22 2:30:10
hidden: true
slug: 2d7jwc5heht
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.hasOwnProperty相关</h2>
<p>为了判断一个对象是否包含自定义属性而不是原型链上的属性，我们需要使用继承自 <code>Object.prototype</code> 的 <code>hasOwnProperty</code>方法。<br><code>hasOwnProperty</code> 是 <code>JavaScript</code> 中唯一一个处理属性但是不查找原型链的函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 修改Object.prototype
Object.prototype.bar = 1; 
var foo = {goo: undefined};

foo.bar; // 1
'bar' in foo; // true

foo.hasOwnProperty('bar'); // false
foo.hasOwnProperty('goo'); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 修改Object.prototype</span>
<span class="hljs-built_in">Object</span>.prototype.bar = <span class="hljs-number">1</span>; 
<span class="hljs-keyword">var</span> foo = {<span class="hljs-attr">goo</span>: <span class="hljs-literal">undefined</span>};

foo.bar; <span class="hljs-comment">// 1</span>
<span class="hljs-string">'bar'</span> <span class="hljs-keyword">in</span> foo; <span class="hljs-comment">// true</span>

foo.hasOwnProperty(<span class="hljs-string">'bar'</span>); <span class="hljs-comment">// false</span>
foo.hasOwnProperty(<span class="hljs-string">'goo'</span>); <span class="hljs-comment">// true</span></code></pre>
<blockquote>注意: 通过判断一个属性是否<code> undefined</code> 是不够的。 因为一个属性可能确实存在，只不过它的值被设置为<code> undefined</code>。</blockquote>
<h3 id="articleHeader1">hasOwnProperty 作为属性</h3>
<p>JavaScript 不会保护<code> hasOwnProperty </code>被非法占用，因此如果一个对象碰巧存在这个属性， 就需要使用外部的 <code>hasOwnProperty </code>函数来获取正确的结果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = {
    hasOwnProperty: function() {
        return false;
    },
    bar: 'Here be dragons'
};

foo.hasOwnProperty('bar'); // 总是返回 false

// 使用其它对象的 hasOwnProperty，并将其上下文设置为foo
({}).hasOwnProperty.call(foo, 'bar'); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> foo = {
    hasOwnProperty: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    },
    bar: <span class="hljs-string">'Here be dragons'</span>
};

foo.hasOwnProperty(<span class="hljs-string">'bar'</span>); <span class="hljs-comment">// 总是返回 false</span>

<span class="hljs-comment">// 使用其它对象的 hasOwnProperty，并将其上下文设置为foo</span>
({}).hasOwnProperty.call(foo, <span class="hljs-string">'bar'</span>); <span class="hljs-comment">// true</span></code></pre>
<p>当检查对象上某个属性是否存在时，<code>hasOwnProperty</code> 是唯一可用的方法。 同时在使用<code> for in loop</code>遍历对象时，推荐总是使用 <code>hasOwnProperty </code>方法， 这将会避免原型对象扩展带来的干扰。</p>
<h3 id="articleHeader2">for in 循环</h3>
<p>和 <code>in</code> 操作符一样，<code>for in </code>循环同样在查找对象属性时遍历原型链上的所有属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 修改 Object.prototype
Object.prototype.bar = 1;

var foo = {moo: 2};
for(var i in foo) {
    console.log(i); // 输出两个属性：bar 和 moo
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 修改 Object.prototype</span>
<span class="hljs-built_in">Object</span>.prototype.bar = <span class="hljs-number">1</span>;

<span class="hljs-keyword">var</span> foo = {<span class="hljs-attr">moo</span>: <span class="hljs-number">2</span>};
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> foo) {
    <span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">// 输出两个属性：bar 和 moo</span>
}</code></pre>
<blockquote>注意: 由于 for in 总是要遍历整个原型链，因此如果一个对象的继承层次太深的话会影响性能。</blockquote>
<p>由于不可能改变 <code>for in</code> 自身的行为，因此有必要过滤出那些不希望出现在循环体中的属性， 这可以通过<code> Object.prototype</code> 原型上的 <code>hasOwnProperty</code> 函数来完成。</p>
<h3 id="articleHeader3">使用 hasOwnProperty 过滤</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// foo 变量是上例中的
for(var i in foo) {
    if (foo.hasOwnProperty(i)) {
        console.log(i);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// foo 变量是上例中的</span>
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> foo) {
    <span class="hljs-keyword">if</span> (foo.hasOwnProperty(i)) {
        <span class="hljs-built_in">console</span>.log(i);
    }
}</code></pre>
<blockquote>推荐总是使用 <code>hasOwnProperty</code>。不要对代码运行的环境做任何假设，不要假设原生对象是否已经被扩展了。</blockquote>
<h2 id="articleHeader4">2.命名函数的赋值表达式</h2>
<p>另外一个特殊的情况是将命名函数赋值给一个变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = function bar() {
    bar(); // 正常运行
}
bar(); // 出错：ReferenceError" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span><span class="hljs-params">()</span> </span>{
    bar(); <span class="hljs-comment">// 正常运行</span>
}
bar(); <span class="hljs-comment">// 出错：ReferenceError</span></code></pre>
<p><code>bar</code> 函数声明外是不可见的，这是因为我们已经把函数赋值给了 <code>foo</code>； 然而在<code> bar</code> 内部依然可见。这是由于<code> JavaScript</code> 的命名处理所致， 函数名在函数内总是可见的。</p>
<blockquote>注意:在<code>IE8及IE8以下</code>版本浏览器bar在外部也是可见的，是因为浏览器对命名函数赋值表达式进行了错误的解析， 解析成两个函数 <code>foo 和 bar</code>
</blockquote>
<h2 id="articleHeader5">3.方法的赋值表达式</h2>
<p>另一个看起来奇怪的地方是函数别名，也就是将一个方法赋值给一个变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var test = someObject.methodTest;
test();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">test</span> = someObject.methodTest;
<span class="hljs-keyword">test</span>();</code></pre>
<p>上例中，<code>test</code> 就像一个普通的函数被调用；因此，函数内的 <code>this </code>将不再被指向到 <code>someObject </code>对象。而是指向了<code>window</code>。</p>
<h2 id="articleHeader6">4.循环中的闭包</h2>
<p>一个常见的错误出现在循环中使用闭包，假设我们需要在每次循环中调用循环序号</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i = 0; i < 10; i++) {
    setTimeout(function() {
        console.log(i);  
    }, 1000);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(i);  
    }, <span class="hljs-number">1000</span>);
}</code></pre>
<p>上面的代码不会输出数字<code> 0</code>到<code> 9</code>，而是会输出数字<code>10</code> 十次。</p>
<p>当 <code>console.log </code>被调用的时候，匿名函数保持对外部变量i的引用，此时 for循环已经结束，i的值被修改成了<code>10</code>.</p>
<p>为了得到想要的结果，需要在每次循环中创建变量<code> i</code>的拷贝。</p>
<p>为了避免引用错误，为了正确的获得循环序号，最好使用 匿名包装器（注：其实就是我们通常说的自执行匿名函数）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i = 0; i < 10; i++) {
    (function(e) {
        setTimeout(function() {
            console.log(e);  
        }, 1000);
    })(i);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>for(<span class="hljs-name">var</span> i = <span class="hljs-number">0</span><span class="hljs-comment">; i &lt; 10; i++) {</span>
    (<span class="hljs-name">function</span>(<span class="hljs-name">e</span>) {
        setTimeout(<span class="hljs-name">function</span>() {
            console.log(<span class="hljs-name">e</span>)<span class="hljs-comment">;  </span>
        }, <span class="hljs-number">1000</span>)<span class="hljs-comment">;</span>
    })(<span class="hljs-name">i</span>)<span class="hljs-comment">;</span>
}</code></pre>
<p>外部的匿名函数会立即执行，并把 i 作为它的参数，此时函数内 e 变量就拥有了 i 的一个拷贝。</p>
<p>当传递给 setTimeout 的匿名函数执行时，它就拥有了对 e 的引用，而这个值是不会被循环改变的。</p>
<p>有另一个方法完成同样的工作，那就是从匿名包装器中返回一个函数。这和上面的代码效果一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i = 0; i < 10; i++) {
    setTimeout((function(e) {
        return function() {
            console.log(e);
        }
    })(i), 1000)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>for(<span class="hljs-name">var</span> i = <span class="hljs-number">0</span><span class="hljs-comment">; i &lt; 10; i++) {</span>
    setTimeout((<span class="hljs-name">function</span>(<span class="hljs-name">e</span>) {
        return function() {
            console.log(<span class="hljs-name">e</span>)<span class="hljs-comment">;</span>
        }
    })(<span class="hljs-name">i</span>), <span class="hljs-number">1000</span>)
}</code></pre>
<h2 id="articleHeader7">5.对象使用和属性</h2>
<p>JavaScript 中所有变量都可以当作对象使用，除了两个例外 <code>null</code> 和 <code>undefined</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="false.toString(); // 'false'
[1, 2, 3].toString(); // '1,2,3'

function Foo(){}
Foo.bar = 1;
Foo.bar; // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-literal">false</span>.toString(); <span class="hljs-comment">// 'false'</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].toString(); <span class="hljs-comment">// '1,2,3'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span><span class="hljs-params">()</span></span>{}
Foo.bar = <span class="hljs-number">1</span>;
Foo.bar; <span class="hljs-comment">// 1</span></code></pre>
<p>一个常见的误解是<code>数字的字面值</code>（literal）<code>不能当作对象使用</code>。这是因为 JavaScript 解析器的一个错误， 它试图将<code>点操作符</code>解析为<code>浮点数字面值</code>的一部分。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2.toString(); // 出错：SyntaxError" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">2</span><span class="hljs-selector-class">.toString</span>(); <span class="hljs-comment">// 出错：SyntaxError</span></code></pre>
<p>有很多变通方法可以让数字的字面值看起来像对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2..toString(); // 第二个点号可以正常解析
2 .toString(); // 注意点号前面的空格
(2).toString(); // 2先被计算" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">2</span>.<span class="hljs-selector-class">.toString</span>(); <span class="hljs-comment">// 第二个点号可以正常解析</span>
<span class="hljs-selector-tag">2</span> <span class="hljs-selector-class">.toString</span>(); <span class="hljs-comment">// 注意点号前面的空格</span>
(<span class="hljs-number">2</span>)<span class="hljs-selector-class">.toString</span>(); <span class="hljs-comment">// 2先被计算</span></code></pre>
<p>删除属性的唯一方法是使用 <code>delete </code>操作符；设置属性为<code> undefined</code> 或者 <code>null</code> 并不能真正的删除属性， 而仅仅是移除了属性和值的关联。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    bar: 1,
    foo: 2,
    baz: 3
};
obj.bar = undefined;
obj.foo = null;
delete obj.baz;

for(var i in obj) {
    if (obj.hasOwnProperty(i)) {
        console.log(i, '' + obj[i]);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">bar</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">foo</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">baz</span>: <span class="hljs-number">3</span>
};
obj.bar = <span class="hljs-literal">undefined</span>;
obj.foo = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">delete</span> obj.baz;

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> obj) {
    <span class="hljs-keyword">if</span> (obj.hasOwnProperty(i)) {
        <span class="hljs-built_in">console</span>.log(i, <span class="hljs-string">''</span> + obj[i]);
    }
}</code></pre>
<p>上面的输出结果有<code> bar undefined</code> 和<code> foo null</code> - 只有<code> baz</code> 被真正的删除了，所以从输出结果中消失。</p>
<h2 id="articleHeader8">6.arguments 对象</h2>
<p>JavaScript 中每个函数内都能访问一个特别变量<code> arguments</code>。这个变量维护着所有传递到这个函数中的参数列表。</p>
<p><code>arguments </code>变量不是一个<code>数组</code>（Array）。 尽管在语法上它有数组相关的属性 <code>length</code>，但它不从 <code>Array.prototype</code> 继承，实际上它是一个<code>对象</code>（Object）。</p>
<p>因此，无法对<code> arguments </code>变量使用标准的数组方法，比如 <code>push</code>, <code>pop</code> 或者 <code>slic</code>e。 虽然使用 <code>for </code>循环遍历也是可以的，但是为了更好的使用数组方法，最好把它转化为一个真正的数组。</p>
<h3 id="articleHeader9">转化为数组</h3>
<p>下面的代码将会创建一个新的数组，包含所有 <code>arguments </code>对象中的元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.slice.call(arguments);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">Array</span><span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.slice</span><span class="hljs-selector-class">.call</span>(<span class="hljs-selector-tag">arguments</span>);</code></pre>
<p><code>arguments</code> 对象为其内部属性以及函数形式参数创建<code> getter </code>和 <code>setter </code>方法。</p>
<p>因此，改变形参的值会影响到 arguments 对象的值，反之亦然。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(a, b, c) {
    arguments[0] = 2;
    a; // 2                                                           

    b = 4;
    arguments[1]; // 4

    var d = c;
    d = 9;
    c; // 3
}
foo(1, 2, 3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>function foo(a, b, c) {
    arguments[<span class="hljs-number">0</span>] = <span class="hljs-number">2</span>;
    a; <span class="hljs-comment">// 2                                                           </span>

    b = <span class="hljs-number">4</span>;
    arguments[<span class="hljs-number">1</span>]; <span class="hljs-comment">// 4</span>

    var d = c;
    d = <span class="hljs-number">9</span>;
    c; <span class="hljs-comment">// 3</span>
}
foo(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);</code></pre>
<p>如下一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sidEffecting(ary) { 
  ary[0] = ary[2];
}
function bar(a,b,c) { 
  c = 10
  sidEffecting(arguments);
  return a + b + c;
}
bar(1,1,1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sidEffecting</span>(<span class="hljs-params">ary</span>) </span>{ 
  ary[<span class="hljs-number">0</span>] = ary[<span class="hljs-number">2</span>];
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params">a,b,c</span>) </span>{ 
  c = <span class="hljs-number">10</span>
  sidEffecting(<span class="hljs-built_in">arguments</span>);
  <span class="hljs-keyword">return</span> a + b + c;
}
bar(<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>)</code></pre>
<p>这里所有的更改都将生效，a和c的值都为10，a+b+c的值将为21。</p>
<h2 id="articleHeader10">7.类型相关</h2>
<h3 id="articleHeader11">测试为定义变量</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typeof foo !== 'undefined'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">typeof</span> foo !== <span class="hljs-string">'undefined'</span></code></pre>
<p>上面代码会检测 <code>foo</code> 是否已经定义；如果没有定义而直接使用会导致 <code>ReferenceError</code> 的异常。 这是 <code>typeof</code> 唯一有用的地方。当然也能判断出来基本类型。</p>
<h3 id="articleHeader12">Object.prototype.toString检测一个对象的类型</h3>
<p>为了检测一个对象的类型，强烈推荐使用 <code>Object.prototype.toString</code> 方法</p>
<p>如下例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.prototype.toString.call([])    // &quot;[object Array]&quot;
Object.prototype.toString.call({})    // &quot;[object Object]&quot;
Object.prototype.toString.call(2)    // &quot;[object Number]&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>Object<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.toString</span><span class="hljs-selector-class">.call</span>([])    <span class="hljs-comment">// "[object Array]"</span>
Object<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.toString</span><span class="hljs-selector-class">.call</span>({})    <span class="hljs-comment">// "[object Object]"</span>
Object<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.toString</span><span class="hljs-selector-class">.call</span>(<span class="hljs-number">2</span>)    <span class="hljs-comment">// "[object Number]"</span></code></pre>
<h3 id="articleHeader13">类型转换</h3>
<p>内置类型（比如 <code>Number</code> 和 <code>String</code>）的构造函数在被调用时，使用或者不使用<code> new </code>的结果完全不同。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Number(10) === 10;     // False, 对象与数字的比较
Number(10) === 10;         // True, 数字与数字的比较
new Number(10) + 0 === 10; // True, 由于隐式的类型转换" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>new Number(<span class="hljs-number">10</span>) === <span class="hljs-number">10</span>;     <span class="hljs-comment">// False, 对象与数字的比较</span>
Number(<span class="hljs-number">10</span>) === <span class="hljs-number">10</span>;         <span class="hljs-comment">// True, 数字与数字的比较</span>
new Number(<span class="hljs-number">10</span>) + <span class="hljs-number">0</span> === <span class="hljs-number">10</span>; <span class="hljs-comment">// True, 由于隐式的类型转换</span></code></pre>
<p><strong>转换为字符串</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'' + 10 === '10'; // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">''</span> + <span class="hljs-number">10</span> === <span class="hljs-string">'10'</span>; <span class="hljs-regexp">//</span> <span class="hljs-keyword">true</span></code></pre>
<p>将一个值加上空字符串可以轻松转换为字符串类型。</p>
<p><strong>转换为数字</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+'10' === 10; // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">+<span class="hljs-string">'10'</span> === <span class="hljs-number">10</span>; <span class="hljs-regexp">//</span> <span class="hljs-keyword">true</span></code></pre>
<p>使用一元的加号操作符，可以把字符串转换为数字。</p>
<p><strong>转换为布尔型</strong></p>
<p>通过使用<code> 否</code> 操作符两次，可以把一个值转换为布尔型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="!!'foo';   // true
!!'';      // false
!!'0';     // true
!!'1';     // true
!!'-1'     // true
!!{};      // true
!!true;    // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang-repl"><code>!!<span class="hljs-string">'foo'</span>;   // true
!!<span class="hljs-string">''</span>;      // false
!!<span class="hljs-string">'0'</span>;     // true
!!<span class="hljs-string">'1'</span>;     // true
!!<span class="hljs-string">'-1'</span>     // true
!!{};      // true
!!true;    // true</code></pre>
<h2 id="articleHeader14">8.为什么不要使用 eval</h2>
<p><code>eval </code>函数会在当前作用域中执行一段 JavaScript 代码字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = 1;
function test() {
    var foo = 2;
    eval('foo = 3');
    return foo;
}
test(); // 3
foo; // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> foo = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> foo = <span class="hljs-number">2</span>;
    <span class="hljs-built_in">eval</span>(<span class="hljs-string">'foo = 3'</span>);
    <span class="hljs-keyword">return</span> foo;
}
test(); <span class="hljs-comment">// 3</span>
foo; <span class="hljs-comment">// 1</span></code></pre>
<p>但是 <code>eval</code> 只在被直接调用并且调用函数就是<code> eval </code>本身时，才在当前作用域中执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = 1;
function test() {
    var foo = 2;
    var bar = eval;
    bar('foo = 3');
    return foo;
}
test(); // 2
foo; // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> foo = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> foo = <span class="hljs-number">2</span>;
    <span class="hljs-keyword">var</span> bar = <span class="hljs-built_in">eval</span>;
    bar(<span class="hljs-string">'foo = 3'</span>);
    <span class="hljs-keyword">return</span> foo;
}
test(); <span class="hljs-comment">// 2</span>
foo; <span class="hljs-comment">// 3</span></code></pre>
<p>上面的代码等价于在全局作用域中调用 <code>eval</code>，和下面两种写法效果一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 写法一：直接调用全局作用域下的 foo 变量
var foo = 1;
function test() {
    var foo = 2;
    window.foo = 3;
    return foo;
}
test(); // 2
foo; // 3

// 写法二：使用 call 函数修改 eval 执行的上下文为全局作用域
var foo = 1;
function test() {
    var foo = 2;
    eval.call(window, 'foo = 3');
    return foo;
}
test(); // 2
foo; // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 写法一：直接调用全局作用域下的 foo 变量</span>
<span class="hljs-keyword">var</span> foo = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> foo = <span class="hljs-number">2</span>;
    <span class="hljs-built_in">window</span>.foo = <span class="hljs-number">3</span>;
    <span class="hljs-keyword">return</span> foo;
}
test(); <span class="hljs-comment">// 2</span>
foo; <span class="hljs-comment">// 3</span>

<span class="hljs-comment">// 写法二：使用 call 函数修改 eval 执行的上下文为全局作用域</span>
<span class="hljs-keyword">var</span> foo = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> foo = <span class="hljs-number">2</span>;
    <span class="hljs-built_in">eval</span>.call(<span class="hljs-built_in">window</span>, <span class="hljs-string">'foo = 3'</span>);
    <span class="hljs-keyword">return</span> foo;
}
test(); <span class="hljs-comment">// 2</span>
foo; <span class="hljs-comment">// 3</span></code></pre>
<p>在任何情况下我们都应该避免使用<code> eval</code> 函数。99.9% 使用<code> eval</code> 的场景都有不使用 <code>eval </code>的解决方案。</p>
<p><code>eval</code> 也存在<code>安全问题</code>，因为它会执行任意传给它的代码， 在代码字符串未知或者是来自一个不信任的源时，绝对不要使用<code> eval</code> 函数。</p>
<h2 id="articleHeader15">9.定时器</h2>
<h3 id="articleHeader16">手工清空定时器</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var id = setTimeout(foo, 1000);
clearTimeout(id);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>var id = setTimeout(<span class="hljs-name">foo</span>, <span class="hljs-number">1000</span>)<span class="hljs-comment">;</span>
clearTimeout(<span class="hljs-name">id</span>)<span class="hljs-comment">;</span></code></pre>
<h3 id="articleHeader17">清除所有定时器</h3>
<p>由于没有内置的清除所有定时器的方法，可以采用一种暴力的方式来达到这一目的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 清空&quot;所有&quot;的定时器
for(var i = 1; i < 1000; i++) {
    clearTimeout(i);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>// 清空<span class="hljs-string">"所有"</span>的定时器
for(var i = <span class="hljs-number">1</span><span class="hljs-comment">; i &lt; 1000; i++) {</span>
    clearTimeout(i)<span class="hljs-comment">;</span>
}</code></pre>
<p>可能还有些定时器不会在上面代码中被清除（注：如果定时器调用时返回的 ID 值大于 1000）， 因此我们可以事先保存所有的定时器 ID，然后一把清除。</p>
<p>建议不要在调用定时器函数时，为了向回调函数传递参数而使用字符串的形式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(a, b, c) {}

// 不要这样做
setTimeout('foo(1,2, 3)', 1000)

// 可以使用匿名函数完成相同功能
setTimeout(function() {
    foo(1, 2, 3);
}, 1000)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>function foo(a, b, c) {}

<span class="hljs-comment">// 不要这样做</span>
setTimeout('foo(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>, <span class="hljs-number">3</span>)', <span class="hljs-number">1000</span>)

<span class="hljs-comment">// 可以使用匿名函数完成相同功能</span>
setTimeout(function() {
    foo(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
}, <span class="hljs-number">1000</span>)</code></pre>
<blockquote>绝对不要使用字符串作为 <code>setTimeout</code> 或者 <code>setInterval </code>的第一个参数， 这么写的代码明显质量很差。当需要向回调函数传递参数时，可以创建一个匿名函数，在函数内执行真实的回调函数。<p>另外，应该避免使用 setInterval，因为它的定时执行不会被 JavaScript 阻塞。</p>
</blockquote>
<p>后续逐渐添加</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
〔总结〕容易遗忘的JS知识点整理

## 原文链接
[https://segmentfault.com/a/1190000012435722](https://segmentfault.com/a/1190000012435722)

