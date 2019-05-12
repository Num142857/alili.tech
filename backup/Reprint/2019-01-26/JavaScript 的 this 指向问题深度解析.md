---
title: 'JavaScript 的 this 指向问题深度解析' 
date: 2019-01-26 2:30:18
hidden: true
slug: y82i9j2q4n
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript 中的 <code>this</code> 指向问题有很多博客在解释，仍然有很多人问。上周我们的开发团队连续两个人遇到相关问题，所以我不得不将关于前端构建技术的交流会延长了半个时候讨论 <code>this</code> 的问题。</p></blockquote>
<p>与我们常见的很多语言不同，JavaScript 函数中的 <code>this</code> 指向并不是在函数定义的时候确定的，而是在调用的时候确定的。换句话说，<strong>函数的调用方式决定了 <code>this</code> 指向</strong>。</p>
<p>JavaScript 中，普通的函数调用方式有三种：直接调用、方法调用和 <code>new</code> 调用。除此之外，还有一些特殊的调用方式，比如通过 <code>bind()</code> 将函数绑定到对象之后再进行调用、通过 <code>call()</code>、<code>apply()</code> 进行调用等。而 es6 引入了箭头函数之后，箭头函数调用时，其 <code>this</code> 指向又有所不同。下面就来分析这些情况下的 <code>this</code> 指向。</p>
<h2 id="articleHeader0">直接调用</h2>
<p>直接调用，就是通过 <code>函数名(...)</code> 这种方式调用。这时候，函数内部的 <code>this</code> 指向全局对象，在浏览器中全局对象是 <code>window</code>，在 NodeJs 中全局对象是 <code>global</code>。</p>
<p>来看一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 简单兼容浏览器和 NodeJs 的全局对象
const _global = typeof window === &quot;undefined&quot; ? global : window;

function test() {
    console.log(this === _global);    // true
}

test();    // 直接调用" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 简单兼容浏览器和 NodeJs 的全局对象</span>
<span class="hljs-keyword">const</span> _global = <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> === <span class="hljs-string">"undefined"</span> ? global : <span class="hljs-built_in">window</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === _global);    <span class="hljs-comment">// true</span>
}

test();    <span class="hljs-comment">// 直接调用</span></code></pre>
<p>这里需要注意的一点是，直接调用并不是指在全局作用域下进行调用，在任何作用域下，直接通过 <code>函数名(...)</code> 来对函数进行调用的方式，都称为直接调用。比如下面这个例子也是直接调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(_global) {
    // 通过 IIFE 限定作用域

    function test() {
        console.log(this === _global);  // true
    }

    test();     // 非全局作用域下的直接调用
})(typeof window === &quot;undefined&quot; ? global : window);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">_global</span>) </span>{
    <span class="hljs-comment">// 通过 IIFE 限定作用域</span>

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === _global);  <span class="hljs-comment">// true</span>
    }

    test();     <span class="hljs-comment">// 非全局作用域下的直接调用</span>
})(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> === <span class="hljs-string">"undefined"</span> ? global : <span class="hljs-built_in">window</span>);</code></pre>
<h3 id="articleHeader1">bind() 对直接调用的影响</h3>
<p>还有一点需要注意的是 <code>bind()</code> 的影响。<code>Function.prototype.bind()</code> 的作用是将当前函数与指定的对象绑定，并返回一个新函数，这个新函数无论以什么样的方式调用，其 <code>this</code> 始终指向绑定的对象。还是来看例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = {};

function test() {
    console.log(this === obj);
}

const testObj = test.bind(obj);
test();     // false
testObj();  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> obj = {};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === obj);
}

<span class="hljs-keyword">const</span> testObj = test.bind(obj);
test();     <span class="hljs-comment">// false</span>
testObj();  <span class="hljs-comment">// true</span></code></pre>
<p>那么 <code>bind()</code> 干了啥？不妨模拟一个 <code>bind()</code> 来了解它是如何做到对 <code>this</code> 产生影响的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = {};

function test() {
    console.log(this === obj);
}

// 自定义的函数，模拟 bind() 对 this 的影响
function myBind(func, target) {
    return function() {
        return func.apply(target, arguments);
    };
}

const testObj = myBind(test, obj);
test();     // false
testObj();  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> obj = {};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === obj);
}

<span class="hljs-comment">// 自定义的函数，模拟 bind() 对 this 的影响</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myBind</span>(<span class="hljs-params">func, target</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> func.apply(target, <span class="hljs-built_in">arguments</span>);
    };
}

<span class="hljs-keyword">const</span> testObj = myBind(test, obj);
test();     <span class="hljs-comment">// false</span>
testObj();  <span class="hljs-comment">// true</span></code></pre>
<p>从上面的示例可以看到，首先，通过闭包，保持了 <code>target</code>，即绑定的对象；然后在调用函数的时候，对原函数使用了 <code>apply</code> 方法来指定函数的 <code>this</code>。当然原生的 <code>bind()</code> 实现可能会不同，而且更高效。但这个示例说明了 <code>bind()</code> 的可行性。</p>
<h3 id="articleHeader2">call 和 apply 对 this 的影响</h3>
<p>上面的示例中用到了 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply" rel="nofollow noreferrer" target="_blank">Function.prototype.apply()</a>，与之类似的还有 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call" rel="nofollow noreferrer" target="_blank">Function.prototype.call()</a>。这两方法的用法请大家自己通过链接去看文档。不过，它们的第一个参数都是指定函数运行时其中的 <code>this</code> 指向。</p>
<p>不过使用 <code>apply</code> 和 <code>call</code> 的时候仍然需要注意，如果目录函数本身是一个绑定了 <code>this</code> 对象的函数，那 <code>apply</code> 和 <code>call</code> 不会像预期那样执行，比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = {};

function test() {
    console.log(this === obj);
}

// 绑定到一个新对象，而不是 obj
const testObj = test.bind({});
test.apply(obj);    // true

// 期望 this 是 obj，即输出 true
// 但是因为 testObj 绑定了不是 obj 的对象，所以会输出 false
testObj.apply(obj); // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> obj = {};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === obj);
}

<span class="hljs-comment">// 绑定到一个新对象，而不是 obj</span>
<span class="hljs-keyword">const</span> testObj = test.bind({});
test.apply(obj);    <span class="hljs-comment">// true</span>

<span class="hljs-comment">// 期望 this 是 obj，即输出 true</span>
<span class="hljs-comment">// 但是因为 testObj 绑定了不是 obj 的对象，所以会输出 false</span>
testObj.apply(obj); <span class="hljs-comment">// false</span></code></pre>
<p>由此可见，<code>bind()</code> 对函数的影响是深远的，慎用！</p>
<h2 id="articleHeader3">方法调用</h2>
<p>方法调用是指通过对象来调用其方法函数，它是 <code>对象.方法函数(...)</code> 这样的调用形式。这种情况下，函数中的 <code>this</code> 指向调用该方法的对象。但是，同样需要注意 <code>bind()</code> 的影响。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = {
    // 第一种方式，定义对象的时候定义其方法
    test() {
        console.log(this === obj);
    }
};

// 第二种方式，对象定义好之后为其附加一个方法(函数表达式)
obj.test2 = function() {
    console.log(this === obj);
};

// 第三种方式和第二种方式原理相同
// 是对象定义好之后为其附加一个方法(函数定义)
function t() {
    console.log(this === obj);
}
obj.test3 = t;

// 这也是为对象附加一个方法函数
// 但是这个函数绑定了一个不是 obj 的其它对象
obj.test4 = (function() {
    console.log(this === obj);
}).bind({});

obj.test();     // true
obj.test2();    // true
obj.test3();    // true

// 受 bind() 影响，test4 中的 this 指向不是 obj
obj.test4();    // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> obj = {
    <span class="hljs-comment">// 第一种方式，定义对象的时候定义其方法</span>
    test() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === obj);
    }
};

<span class="hljs-comment">// 第二种方式，对象定义好之后为其附加一个方法(函数表达式)</span>
obj.test2 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === obj);
};

<span class="hljs-comment">// 第三种方式和第二种方式原理相同</span>
<span class="hljs-comment">// 是对象定义好之后为其附加一个方法(函数定义)</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">t</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === obj);
}
obj.test3 = t;

<span class="hljs-comment">// 这也是为对象附加一个方法函数</span>
<span class="hljs-comment">// 但是这个函数绑定了一个不是 obj 的其它对象</span>
obj.test4 = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === obj);
}).bind({});

obj.test();     <span class="hljs-comment">// true</span>
obj.test2();    <span class="hljs-comment">// true</span>
obj.test3();    <span class="hljs-comment">// true</span>

<span class="hljs-comment">// 受 bind() 影响，test4 中的 this 指向不是 obj</span>
obj.test4();    <span class="hljs-comment">// false</span></code></pre>
<p>这里需要注意的是，后三种方式都是预定定义函数，再将其附加给 <code>obj</code> 对象作为其方法。再次强调，函数内部的 <code>this</code> 指向与定义无关，受调用方式的影响。</p>
<h3 id="articleHeader4">方法中 this 指向全局对象的情况</h3>
<p>注意这里说的是<strong>方法</strong>中而不是<strong>方法调用</strong>中。方法中的 <code>this</code> 指向全局对象，如果不是因为 <code>bind()</code>，那就一定是因为不是用的方法调用方式，比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = {
    test() {
        console.log(this === obj);
    }
};

const t = obj.test;
t();    // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> obj = {
    test() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === obj);
    }
};

<span class="hljs-keyword">const</span> t = obj.test;
t();    <span class="hljs-comment">// false</span></code></pre>
<p><code>t</code> 就是 <code>obj</code> 的 <code>test</code> 方法，但是 <code>t()</code> 调用时，其中的 <code>this</code> 指向了全局。</p>
<p>之所以要特别提出这种情况，主要是因为常常将一个对象方法作为回调传递给某个函数之后，却发现运行结果与预期不符——因为忽略了调用方式对 <code>this</code> 的影响。比如下面的例子是在页面中对某些事情进行封装之后特别容易遇到的问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Handlers {
    // 这里 $button 假设是一个指向某个按钮的 jQuery 对象
    constructor(data, $button) {
        this.data = data;
        $button.on(&quot;click&quot;, this.onButtonClick);
    }

    onButtonClick(e) {
        console.log(this.data);
    }
}

const handlers = new Handlers(&quot;string data&quot;, $(&quot;#someButton&quot;));
// 对 #someButton 进行点击操作之后
// 输出 undefined
// 但预期是输出 string data" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Handlers</span> </span>{
    <span class="hljs-comment">// 这里 $button 假设是一个指向某个按钮的 jQuery 对象</span>
    <span class="hljs-keyword">constructor</span>(data, $button) {
        <span class="hljs-keyword">this</span>.data = data;
        $button.on(<span class="hljs-string">"click"</span>, <span class="hljs-keyword">this</span>.onButtonClick);
    }

    onButtonClick(e) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.data);
    }
}

<span class="hljs-keyword">const</span> handlers = <span class="hljs-keyword">new</span> Handlers(<span class="hljs-string">"string data"</span>, $(<span class="hljs-string">"#someButton"</span>));
<span class="hljs-comment">// 对 #someButton 进行点击操作之后</span>
<span class="hljs-comment">// 输出 undefined</span>
<span class="hljs-comment">// 但预期是输出 string data</span></code></pre>
<p><code>this.onButtonClick</code> 作为一个参数传入 <code>on()</code> 之后，事件触发时，理论上是对这个函数进行的直接调用，而不是方法调用，所以其中的 <code>this</code> 会指向全局对象 —— 但实际上由于调用事件处理函数的时候，<code>this</code> 指向会绑定到触发事件的 DOM 元素上，所以这里的 <code>this</code> 是指向触发事件的的 DOM 元素(注意：<code>this</code> 并非 jQuery 对象)，即 <code>$button.get(0)</code>(注意代码前注释中的假设)。</p>
<p>要解决这个问题有很多种方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这是在 es5 中的解决办法之一
var _this = this;
$button.on(&quot;click&quot;, function() {
    _this.onButtonClick();
});

// 也可以通过 bind() 来解决
$button.on(&quot;click&quot;, this.onButtonClick.bind(this));

// es6 中可以通过箭头函数来处理，在 jQuery 中慎用
$button.on(&quot;click&quot;, e => this.onButtonClick(e));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 这是在 es5 中的解决办法之一</span>
<span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
$button.on(<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    _this.onButtonClick();
});

<span class="hljs-comment">// 也可以通过 bind() 来解决</span>
$button.on(<span class="hljs-string">"click"</span>, <span class="hljs-keyword">this</span>.onButtonClick.bind(<span class="hljs-keyword">this</span>));

<span class="hljs-comment">// es6 中可以通过箭头函数来处理，在 jQuery 中慎用</span>
$button.on(<span class="hljs-string">"click"</span>, e =&gt; <span class="hljs-keyword">this</span>.onButtonClick(e));</code></pre>
<p>不过请注意，将箭头函数用作 jQuery 的回调时造成要小心函数内对 <code>this</code> 的使用。jQuery 大多数回调函数(非箭头函数)中的 <code>this</code> 都是表示调用目标，所以可以写 <code>$(this).text()</code> 这样的语句，但 jQuery 无法改变箭头函数的 <code>this</code> 指向，同样的语句语义完全不同。</p>
<h2 id="articleHeader5">new 调用</h2>
<p>在 es6 之前，每一个函数都可以当作是构造函数，通过 <code>new</code> 调用来产生新的对象(函数内无特定返回值的情况下)。而 es6 改变了这种状态，虽然 <code>class</code> 定义的类用 <code>typeof</code> 运算符得到的仍然是 <code>"function"</code>，但它不能像普通函数一样直接调用；同时，<code>class</code> 中定义的方法函数，也不能当作构造函数用 <code>new</code> 来调用。</p>
<p>而在 es5 中，用 <code>new</code> 调用一个构造函数，会创建一个新对象，而其中的 <code>this</code> 就指向这个新对象。这没有什么悬念，因为 <code>new</code> 本身就是设计来创建新对象的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = &quot;Hi&quot;;    // 全局变量

function AClass(data) {
    this.data = data;
}

var a = new AClass(&quot;Hello World&quot;);
console.log(a.data);    // Hello World
console.log(data);      // Hi

var b = new AClass(&quot;Hello World&quot;);
console.log(a === b);   // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> data = <span class="hljs-string">"Hi"</span>;    <span class="hljs-comment">// 全局变量</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">AClass</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">this</span>.data = data;
}

<span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> AClass(<span class="hljs-string">"Hello World"</span>);
<span class="hljs-built_in">console</span>.log(a.data);    <span class="hljs-comment">// Hello World</span>
<span class="hljs-built_in">console</span>.log(data);      <span class="hljs-comment">// Hi</span>

<span class="hljs-keyword">var</span> b = <span class="hljs-keyword">new</span> AClass(<span class="hljs-string">"Hello World"</span>);
<span class="hljs-built_in">console</span>.log(a === b);   <span class="hljs-comment">// false</span></code></pre>
<h2 id="articleHeader6">箭头函数中的 this</h2>
<p>先来看看 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions" rel="nofollow noreferrer" target="_blank">MDN 上对箭头函数的说明</a></p>
<blockquote><p>An arrow function expression has a shorter syntax than a function expression and does <strong>not</strong> bind its own <code>this</code>, <code>arguments</code>, <code>super</code>, or <code>new.target</code>. Arrow functions are always anonymous. These function expressions are best suited for non-method functions, and they cannot be used as constructors.</p></blockquote>
<p>这里已经清楚了说明了，箭头函数没有自己的 <code>this</code> 绑定。箭头函数中使用的 <code>this</code>，其实是直接包含它的那个函数或函数表达式中的 <code>this</code>。比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = {
    test() {
        const arrow = () => {
            // 这里的 this 是 test() 中的 this，
            // 由 test() 的调用方式决定
            console.log(this === obj);
        };
        arrow();
    },

    getArrow() {
        return () => {
            // 这里的 this 是 getArrow() 中的 this，
            // 由 getArrow() 的调用方式决定
            console.log(this === obj);
        };
    }
};

obj.test();     // true

const arrow = obj.getArrow();
arrow();        // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> obj = {
    test() {
        <span class="hljs-keyword">const</span> arrow = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-comment">// 这里的 this 是 test() 中的 this，</span>
            <span class="hljs-comment">// 由 test() 的调用方式决定</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === obj);
        };
        arrow();
    },

    getArrow() {
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-comment">// 这里的 this 是 getArrow() 中的 this，</span>
            <span class="hljs-comment">// 由 getArrow() 的调用方式决定</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === obj);
        };
    }
};

obj.test();     <span class="hljs-comment">// true</span>

<span class="hljs-keyword">const</span> arrow = obj.getArrow();
arrow();        <span class="hljs-comment">// true</span></code></pre>
<p>示例中的两个 <code>this</code> 都是由箭头函数的直接外层函数(方法)决定的，而方法函数中的 <code>this</code> 是由其调用方式决定的。上例的调用方式都是方法调用，所以 <code>this</code> 都指向方法调用的对象，即 <code>obj</code>。</p>
<p>箭头函数让大家在使用闭包的时候不需要太纠结 <code>this</code>，不需要通过像 <code>_this</code> 这样的局部变量来临时引用 <code>this</code> 给闭包函数使用。来看一段 Babel 对箭头函数的转译可能能加深理解：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES6
const obj = {
    getArrow() {
        return () => {
            console.log(this === obj);
        };
    }
}    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ES6</span>
<span class="hljs-keyword">const</span> obj = {
    getArrow() {
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === obj);
        };
    }
}    </code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES5，由 Babel 转译
var obj = {
    getArrow: function getArrow() {
        var _this = this;
        return function () {
            console.log(_this === obj);
        };
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ES5，由 Babel 转译</span>
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">getArrow</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getArrow</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(_this === obj);
        };
    }
};</code></pre>
<p>另外需要注意的是，箭头函数不能用 <code>new</code> 调用，不能 <code>bind()</code> 到某个对象(虽然 <code>bind()</code> 方法调用没问题，但是不会产生预期效果)。不管在什么情况下使用箭头函数，它本身是没有绑定 <code>this</code> 的，它用的是直接外层函数(即包含它的最近的一层函数或函数表达式)绑定的 <code>this</code>。</p>
<h2 id="articleHeader7">勘误</h2>
<ul><li>this.onButtonClick 用于 jQuery 事件的时候，<code>this</code> 已经被 jQuery 改为指向触发事件的元素，感谢 <a href="/u/yuelianggege">@月亮哥哥</a> 和 <a href="/u/qovoq">@QoVoQ</a> 指出。此错误已经在文中修改了。</li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 的 this 指向问题深度解析

## 原文链接
[https://segmentfault.com/a/1190000008400124](https://segmentfault.com/a/1190000008400124)

