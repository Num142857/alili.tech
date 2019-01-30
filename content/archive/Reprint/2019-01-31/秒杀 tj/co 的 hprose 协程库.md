---
title: '秒杀 tj/co 的 hprose 协程库' 
date: 2019-01-31 2:31:16
hidden: true
slug: i03s5xgoq1
categories: [reprint]
---

{{< raw >}}

                    
<p>ES6 中引入了 Generator，Generator 通过封装之后，可以作为协程来进行使用。</p>
<p>其中对 Generator 封装最为著名的当属 tj/co，但是 tj/co 跟 ES2016 的 async/await 相比的话，还存在一些比较严重的缺陷。</p>
<p>hprose 中也引入了对 Generator 封装的协程支持，但是比 tj/co 更加完善，下面我们就来详细介绍一下它们之间的差别。</p>
<p><a href="https://github.com/tj/co" rel="nofollow noreferrer" target="_blank"><code>tj/co</code></a> 有以下几个方面的问题：</p>
<p>首先，<code>tj/co</code> 库中的 <code>yield</code> 只支持 thunk 函数，生成器函数，promise 对象，以及数组和对象，但是不支持普通的基本类型的数据，比如 <code>null</code>, 数字，字符串等都不支持。这对于 <code>yield</code> 一个类型不确定的变量来说，是很不方便的。而且这跟 <code>await</code> 也是不兼容的。</p>
<p>其次，在 <code>yield</code> 数组和对象时，<code>tj/co</code> 库会自动对数组中的元素和对象中的字段递归的遍历，将其中的所有的 <code>Promise</code> 元素和字段替换为实际值，这对于简单的数据来说，会方便一些。但是对于带有循环引用的数组和对象来说，会导致无法获取到结果，这是一个致命的问题。即使对于不带有循环引用结构的数组和对象来说，如果该数组和对象比较复杂，这也会消耗大量的时间。而且这跟 <code>await</code> 也是不兼容的。</p>
<p>再次，对于 thunk 函数，<code>tj/co</code> 库会认为回调函数第一个参数必须是表示错误，从第二个参数开始才表示返回值。而这对于回调函数只有一个返回值参数的函数，或者回调函数的第一个参数不表示错误的函数来说，<code>tj/co</code> 库就无法使用了。</p>
<p>而 <code>hprose.co</code> 对 <code>yield</code> 的支持则跟 <code>await</code> 完全兼容，支持对所有类型的数据进行 <code>yield</code>。</p>
<p>当 <code>hprose.co</code> 对 chunk 函数进行 <code>yield</code> 时，如果回调函数第一个参数是 <code>Error</code> 类型的对象才会被当做错误处理。如果回调函数只有一个参数且不是 <code>Error</code> 类型的对象，则作为返回值对待。如果回调函数有两个以上的参数，如果第一个参数为 <code>null</code> 或 <code>undefined</code>，则第一个参数被当做无错误被忽略，否则，全部回调参数都被当做返回值对待。如果被当做返回值的回调参数有多个，则这多个参数被当做数组结果对待，如果只有一个，则该参数被直接当做返回值对待。</p>
<p>下面我们来举例说明一下：</p>
<h2 id="articleHeader0">yield 基本类型</h2>
<p>首先我们来看一下 <code>tj/co</code> 库的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var co = require('co');

co(function*() {
    try {
        console.log(yield Promise.resolve(&quot;promise&quot;));
        console.log(yield function *() { return &quot;generator&quot; });
        console.log(yield new Date());
        console.log(yield 123);
        console.log(yield 3.14);
        console.log(yield &quot;hello&quot;);
        console.log(yield true);
    }
    catch (e) {
        console.error(e);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> co = <span class="hljs-built_in">require</span>(<span class="hljs-string">'co'</span>);

co(<span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">"promise"</span>));
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> <span class="hljs-function"><span class="hljs-keyword">function</span> *(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-string">"generator"</span> });
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>());
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> <span class="hljs-number">123</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> <span class="hljs-number">3.14</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> <span class="hljs-string">"hello"</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> <span class="hljs-literal">true</span>);
    }
    <span class="hljs-keyword">catch</span> (e) {
        <span class="hljs-built_in">console</span>.error(e);
    }
});</code></pre>
<p>该程序运行结果为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="promise
generator
TypeError: You may only yield a function, promise, generator, array, or object, but the following object was passed: &quot;Sat Nov 19 2016 14:51:09 GMT+0800 (CST)&quot;
    at next (/usr/local/lib/node_modules/co/index.js:101:25)
    at onFulfilled (/usr/local/lib/node_modules/co/index.js:69:7)
    at process._tickCallback (internal/process/next_tick.js:103:7)
    at Module.runMain (module.js:577:11)
    at run (bootstrap_node.js:352:7)
    at startup (bootstrap_node.js:144:9)
    at bootstrap_node.js:467:3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>promise
generator
TypeError: You may only yield <span class="hljs-selector-tag">a</span> function, promise, generator, array, or <span class="hljs-selector-tag">object</span>, but the following <span class="hljs-selector-tag">object</span> was passed: <span class="hljs-string">"Sat Nov 19 2016 14:51:09 GMT+0800 (CST)"</span>
    at next (/usr/local/lib/node_modules/co/index<span class="hljs-selector-class">.js</span>:<span class="hljs-number">101</span>:<span class="hljs-number">25</span>)
    at onFulfilled (/usr/local/lib/node_modules/co/index<span class="hljs-selector-class">.js</span>:<span class="hljs-number">69</span>:<span class="hljs-number">7</span>)
    at process._tickCallback (internal/process/next_tick<span class="hljs-selector-class">.js</span>:<span class="hljs-number">103</span>:<span class="hljs-number">7</span>)
    at Module<span class="hljs-selector-class">.runMain</span> (module<span class="hljs-selector-class">.js</span>:<span class="hljs-number">577</span>:<span class="hljs-number">11</span>)
    at run (bootstrap_node<span class="hljs-selector-class">.js</span>:<span class="hljs-number">352</span>:<span class="hljs-number">7</span>)
    at startup (bootstrap_node<span class="hljs-selector-class">.js</span>:<span class="hljs-number">144</span>:<span class="hljs-number">9</span>)
    at bootstrap_node<span class="hljs-selector-class">.js</span>:<span class="hljs-number">467</span>:<span class="hljs-number">3</span></code></pre>
<p>其实除了前两个，后面的几个基本类型的数据都不能被 <code>yield</code>。如果我们把上面代码的第一句改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var co = require('hprose').co;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> co = <span class="hljs-built_in">require</span>(<span class="hljs-string">'hprose'</span>).co;</code></pre>
<p>后面的代码都不需要修改，我们来看看运行结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="promise
generator
2016-11-19T06:54:30.081Z
123
3.14
hello
true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">promise</span>
<span class="hljs-selector-tag">generator</span>
2016<span class="hljs-selector-tag">-11-19T06</span><span class="hljs-selector-pseudo">:54</span><span class="hljs-selector-pseudo">:30.081Z</span>
123
3<span class="hljs-selector-class">.14</span>
<span class="hljs-selector-tag">hello</span>
<span class="hljs-selector-tag">true</span></code></pre>
<p>也就是说，<code>hprose.co</code> 支持对所有类型进行 <code>yield</code> 操作。下面我们再来看看 async/await 是什么效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(async function() {
    try {
        console.log(await Promise.resolve(&quot;promise&quot;));
        console.log(await function *() { return &quot;generator&quot; });
        console.log(await new Date());
        console.log(await 123);
        console.log(await 3.14);
        console.log(await &quot;hello&quot;);
        console.log(await true);
    }
    catch (e) {
        console.error(e);
    }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">"promise"</span>));
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> <span class="hljs-function"><span class="hljs-keyword">function</span> *(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-string">"generator"</span> });
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>());
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> <span class="hljs-number">123</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> <span class="hljs-number">3.14</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> <span class="hljs-string">"hello"</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> <span class="hljs-literal">true</span>);
    }
    <span class="hljs-keyword">catch</span> (e) {
        <span class="hljs-built_in">console</span>.error(e);
    }
})();</code></pre>
<p>上面的代码基本上就是把 <code>co(function*...)</code> 替换成了 <code>async function...</code>，把 <code>yield</code> 替换成了 <code>await</code>。</p>
<p>我们来运行上面的程序，注意，对于当前版本的 node 运行时需要加上 <code>--harmony_async_await</code> 参数，运行结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="promise
[Function]
2016-11-19T08:16:25.316Z
123
3.14
hello
true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">promise</span>
<span class="hljs-selector-attr">[Function]</span>
2016<span class="hljs-selector-tag">-11-19T08</span><span class="hljs-selector-pseudo">:16</span><span class="hljs-selector-pseudo">:25.316Z</span>
123
3<span class="hljs-selector-class">.14</span>
<span class="hljs-selector-tag">hello</span>
<span class="hljs-selector-tag">true</span></code></pre>
<p>我们可以看出，<code>await</code> 和 <code>hprose.co</code> 除了对生成器的处理不同以外，其它的都相同。对于生成器函数，<code>await</code> 是按原样返回的，而 <code>hprose.co</code> 则是按照 <code>tj/co</code> 的方式处理。也就是说 <code>hprose.co</code> 综合了 <code>await</code> 和 <code>tj/co</code> 的全部优点。使用 <code>hprose.co</code> 比使用 <code>await</code> 或 <code>tj/co</code> 都方便。</p>
<h2 id="articleHeader1">yield 数组或对象</h2>
<p>我们来看第二个让 <code>tj/co</code> 崩溃的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var co = require('co');

co(function*() {
    try {
        var a = [];
        for (i = 0; i < 1000000; i++) {
            a[i] = i;
        }
        var start = Date.now();;
        yield a;
        var end = Date.now();;
        console.log(end - start);
    }
    catch (e) {
        console.error(e);
    }
});

co(function*() {
    try {
        var a = [];
        a[0] = a;
        console.log(yield a);
    }
    catch (e) {
        console.error(e);
    }
});

co(function*() {
    try {
        var o = {};
        o.self = o;
        console.log(yield o);
    }
    catch (e) {
        console.error(e);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> co = <span class="hljs-built_in">require</span>(<span class="hljs-string">'co'</span>);

co(<span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">var</span> a = [];
        <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1000000</span>; i++) {
            a[i] = i;
        }
        <span class="hljs-keyword">var</span> start = <span class="hljs-built_in">Date</span>.now();;
        <span class="hljs-keyword">yield</span> a;
        <span class="hljs-keyword">var</span> end = <span class="hljs-built_in">Date</span>.now();;
        <span class="hljs-built_in">console</span>.log(end - start);
    }
    <span class="hljs-keyword">catch</span> (e) {
        <span class="hljs-built_in">console</span>.error(e);
    }
});

co(<span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">var</span> a = [];
        a[<span class="hljs-number">0</span>] = a;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> a);
    }
    <span class="hljs-keyword">catch</span> (e) {
        <span class="hljs-built_in">console</span>.error(e);
    }
});

co(<span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">var</span> o = {};
        o.self = o;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> o);
    }
    <span class="hljs-keyword">catch</span> (e) {
        <span class="hljs-built_in">console</span>.error(e);
    }
});</code></pre>
<p>运行该程序，我们会看到程序会卡一会儿，然后出现下面的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2530
(node:70754) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): RangeError: Maximum call stack size exceeded
(node:70754) DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
(node:70754) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 2): RangeError: Maximum call stack size exceeded" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-number">2530</span>
(<span class="hljs-keyword">node</span><span class="hljs-title">:70754</span>) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: <span class="hljs-number">1</span>): RangeError: Maximum call stack size exceeded
(<span class="hljs-keyword">node</span><span class="hljs-title">:70754</span>) DeprecationWarning: Unhandled promise rejections are deprecated. <span class="hljs-keyword">In</span> the future, promise rejections that are not handled will terminate the <span class="hljs-keyword">Node</span>.<span class="hljs-title">js</span> process with a non-zero exit code.
(<span class="hljs-keyword">node</span><span class="hljs-title">:70754</span>) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: <span class="hljs-number">2</span>): RangeError: Maximum call stack size exceeded</code></pre>
<p>上面的 <code>2530</code> 是第一个 <code>co</code> 程序段输出的结果，也就是说这个 <code>yield</code> 要等待 2.5 秒才能返回结果。而后面两个 <code>co</code> 程序段则直接调用栈溢出了。如果在实际应用中，出现了这样的数据，使用 <code>tj/co</code> 你的程序就会变得很慢，或者直接崩溃了。</p>
<p>下面看看 <code>hprose.co</code> 的效果，同样只替换第一句话为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var co = require('hprose').co;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> co = <span class="hljs-built_in">require</span>(<span class="hljs-string">'hprose'</span>).co;</code></pre>
<p>后面的代码都不需要修改，我们来看看运行结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="7
[ [Circular] ]
{ self: [Circular] }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>7
<span class="hljs-selector-attr">[ [Circular]</span> ]
{ <span class="hljs-attribute">self</span>: [Circular] }</code></pre>
<p>第一个 <code>co</code> 程序段用时很短，只需要 <code>7</code> ms。注意，这还是包含了后面两个程序段的时间，因为这三个协程是并发的，如果去掉后面两个程序段，你看的输出可能是 <code>1</code> ms 或者 <code>0</code> ms。而后面两个程序段也完美的返回了带有循环引用的数据。这才是我们期望的结果。</p>
<p>我们再来看看 <code>async/await</code> 下是什么效果，程序代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(async function() {
    try {
        var a = [];
        for (i = 0; i < 1000000; i++) {
            a[i] = i;
        }
        var start = Date.now();
        await a;
        var end = Date.now();
        console.log(end - start);
    }
    catch (e) {
        console.error(e);
    }
})();

(async function() {
    try {
        var a = [];
        a[0] = a;
        console.log(await a);
    }
    catch (e) {
        console.error(e);
    }
})();

(async function() {
    try {
        var o = {};
        o.self = o;
        console.log(await o);
    }
    catch (e) {
        console.error(e);
    }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">var</span> a = [];
        <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1000000</span>; i++) {
            a[i] = i;
        }
        <span class="hljs-keyword">var</span> start = <span class="hljs-built_in">Date</span>.now();
        <span class="hljs-keyword">await</span> a;
        <span class="hljs-keyword">var</span> end = <span class="hljs-built_in">Date</span>.now();
        <span class="hljs-built_in">console</span>.log(end - start);
    }
    <span class="hljs-keyword">catch</span> (e) {
        <span class="hljs-built_in">console</span>.error(e);
    }
})();

(<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">var</span> a = [];
        a[<span class="hljs-number">0</span>] = a;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> a);
    }
    <span class="hljs-keyword">catch</span> (e) {
        <span class="hljs-built_in">console</span>.error(e);
    }
})();

(<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">var</span> o = {};
        o.self = o;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> o);
    }
    <span class="hljs-keyword">catch</span> (e) {
        <span class="hljs-built_in">console</span>.error(e);
    }
})();</code></pre>
<p>运行结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="14
[ [Circular] ]
{ self: [Circular] }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>14
<span class="hljs-selector-attr">[ [Circular]</span> ]
{ <span class="hljs-attribute">self</span>: [Circular] }</code></pre>
<p>我们发现 <code>async/await</code> 的输出结果跟 <code>hprose.co</code> 是一致的，但是在性能上，<code>hprose.co</code> 则比 <code>async/await</code> 还要快 1 倍。因此，第二个回合，<code>hprose.co</code> 仍然是完胜 <code>tj/co</code> 和 <code>async/await</code>。</p>
<h2 id="articleHeader2">yield thunk 函数</h2>
<p>我们再来看看 <code>tj/co</code> 和 <code>tj/thunkify</code> 是多么的让人抓狂，以及 <code>hprose.co</code> 和 <code>hprose.thunkify</code> 是如何优雅的解决 <code>tj/co</code> 和 <code>tj/thunkify</code> 带来的这些让人抓狂的问题的。</p>
<p>首先我们来看第一个问题：</p>
<p><code>tj/thunkify</code> 返回的 thunk 函数的执行结果是一次性的，不能像 <code>promise</code> 结果那样被使用多次，我们来看看下面这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var co = require(&quot;co&quot;);
var thunkify = require(&quot;thunkify&quot;);

var sum = thunkify(function(a, b, callback) {
    callback(null, a + b);
});

co(function*() {
    var result = sum(1, 2);
    console.log(yield result);
    console.log(yield sum(2, 3));
    console.log(yield result);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> co = <span class="hljs-built_in">require</span>(<span class="hljs-string">"co"</span>);
<span class="hljs-keyword">var</span> thunkify = <span class="hljs-built_in">require</span>(<span class="hljs-string">"thunkify"</span>);

<span class="hljs-keyword">var</span> sum = thunkify(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b, callback</span>) </span>{
    callback(<span class="hljs-literal">null</span>, a + b);
});

co(<span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> result = sum(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> result);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> sum(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>));
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> result);
});</code></pre>
<p>这个例子很简单，输出结果你猜是啥？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="3
5
3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">3</span>
<span class="hljs-number">5</span>
<span class="hljs-number">3</span></code></pre>
<p>是上面的结果吗？恭喜你，答错了！不过，这不是你的错，而是 <code>tj/thunkify</code> 的错，它的结果是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="3
5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">3</span>
<span class="hljs-number">5</span></code></pre>
<p>什么？最后的 <code>console.log(yield result)</code> 输出结果哪儿去了？不好意思，<code>tj/thunkify</code> 解释说是为了防止 <code>callback</code> 被重复执行，所以就只能这么玩了。可是真的是这样吗？</p>
<p>我们来看看使用 <code>hprose.co</code> 和 <code>hprose.thunkify</code> 的执行结果吧，把开头两行换成下面三行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var hprose = require(&quot;hprose&quot;);
var co = hprose.co;
var thunkify = hprose.thunkify;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> hprose = <span class="hljs-built_in">require</span>(<span class="hljs-string">"hprose"</span>);
<span class="hljs-keyword">var</span> co = hprose.co;
<span class="hljs-keyword">var</span> thunkify = hprose.thunkify;</code></pre>
<p>其它代码都不用改，运行它，你会发现预期的结果出来了，就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="3
5
3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">3</span>
<span class="hljs-number">5</span>
<span class="hljs-number">3</span></code></pre>
<p>可能你还不服气，你会说，<code>tj/thunkify</code> 这样做是为了防止类似被 <code>thunkify</code> 的函数中，回调被多次调用时，<code>yield</code> 的结果不正确，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sum = thunkify(function(a, b, callback) {
    callback(null, a + b);
    callback(null, a + b + a);
});

co(function*() {
    var result = sum(1, 2);
    console.log(yield result);
    console.log(yield sum(2, 3));
    console.log(yield result);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> sum = thunkify(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b, callback</span>) </span>{
    callback(<span class="hljs-literal">null</span>, a + b);
    callback(<span class="hljs-literal">null</span>, a + b + a);
});

co(<span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> result = sum(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> result);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> sum(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>));
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> result);
});</code></pre>
<p>如果 <code>tj/thunkify</code> 不这样做，结果可能就会变成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="3
4
5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">3</span>
<span class="hljs-number">4</span>
<span class="hljs-number">5</span></code></pre>
<p>可是真的是这样吗？你会发现，即使改成上面的样子，<code>hprose.thunkify</code> 配合 <code>hprose.co</code> 返回的结果仍然是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="3
5
3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">3</span>
<span class="hljs-number">5</span>
<span class="hljs-number">3</span></code></pre>
<p>跟预期的一样，回调函数并没有重复执行，错误的结果并没有出现。而且当需要重复 <code>yield</code> 结果函数时，还能够正确得到结果。</p>
<p>最后我们再来看一下，<code>tj/thunkify</code> 这样做真的解决了问题了吗？我们把代码改成下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sum = thunkify(function(a, b, callback) {
    console.log(&quot;call sum(&quot; + Array.prototype.join.call(arguments) + &quot;)&quot;);
    callback(null, a + b);
    callback(null, a + b + a);
});

co(function*() {
    var result = sum(1, 2);
    console.log(yield result);
    console.log(yield sum(2, 3));
    console.log(yield result);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> sum = thunkify(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b, callback</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"call sum("</span> + <span class="hljs-built_in">Array</span>.prototype.join.call(<span class="hljs-built_in">arguments</span>) + <span class="hljs-string">")"</span>);
    callback(<span class="hljs-literal">null</span>, a + b);
    callback(<span class="hljs-literal">null</span>, a + b + a);
});

co(<span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> result = sum(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> result);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> sum(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>));
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> result);
});</code></pre>
<p>然后替换不同的 <code>co</code> 和 <code>thunkify</code>，然后执行，我们会发现，<code>tj</code> 版本的输出如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="call sum(1,2,function (){
        if (called) return;
        called = true;
        done.apply(null, arguments);
      })
3
call sum(2,3,function (){
        if (called) return;
        called = true;
        done.apply(null, arguments);
      })
5
call sum(1,2,function (){
        if (called) return;
        called = true;
        done.apply(null, arguments);
      },function (){
        if (called) return;
        called = true;
        done.apply(null, arguments);
      })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>call sum(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span> (called) <span class="hljs-keyword">return</span>;
        called = <span class="hljs-literal">true</span>;
        done.apply(<span class="hljs-literal">null</span>, <span class="hljs-built_in">arguments</span>);
      })
<span class="hljs-number">3</span>
call sum(<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span> (called) <span class="hljs-keyword">return</span>;
        called = <span class="hljs-literal">true</span>;
        done.apply(<span class="hljs-literal">null</span>, <span class="hljs-built_in">arguments</span>);
      })
<span class="hljs-number">5</span>
call sum(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span> (called) <span class="hljs-keyword">return</span>;
        called = <span class="hljs-literal">true</span>;
        done.apply(<span class="hljs-literal">null</span>, <span class="hljs-built_in">arguments</span>);
      },<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span> (called) <span class="hljs-keyword">return</span>;
        called = <span class="hljs-literal">true</span>;
        done.apply(<span class="hljs-literal">null</span>, <span class="hljs-built_in">arguments</span>);
      })</code></pre>
<p>而 <code>hprose</code> 版本的输出结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="call sum(1,2,function () {
                thisArg = this;
                results.resolve(arguments);
            })
3
call sum(2,3,function () {
                thisArg = this;
                results.resolve(arguments);
            })
5
3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>call sum(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                thisArg = <span class="hljs-keyword">this</span>;
                results.resolve(<span class="hljs-built_in">arguments</span>);
            })
<span class="hljs-number">3</span>
call sum(<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                thisArg = <span class="hljs-keyword">this</span>;
                results.resolve(<span class="hljs-built_in">arguments</span>);
            })
<span class="hljs-number">5</span>
<span class="hljs-number">3</span></code></pre>
<p>从这里，我们可以看出，<code>tj</code> 版本的程序在执行第二次 <code>yield result</code> 时，简直错的离谱，它不但没有让我们得到预期的结果，反而还重复执行了 <code>thunkify</code> 后的函数，而且带入的参数也完全不对了，所以，这是一个完全错误的实现。</p>
<p>而从 <code>hprose</code> 版本的输出来看，<code>hprose</code> 不但完美的避免了回调被重复执行，而且保证了被 <code>thunkify</code> 后的函数执行的结果被多次 <code>yield</code> 时，也不会被重复执行，而且还能够得到预期的结果，可以实现跟返回 promise 对象一样的效果。</p>
<p><code>tj</code> 因为没有解决他所实现的 <code>thunkify</code> 函数带来的这些问题，所以在后期推荐大家放弃 <code>thunkify</code>，转而投奔到返回 <code>promise</code> 对象的怀抱中，而实际上，这个问题并非是不能解决的。</p>
<p><code>hprose</code> 在对 <code>thunkify</code> 函数的处理上，再次完胜 <code>tj</code>。而这个回合中，<code>async/await</code> 就不用提了，因为 <code>async/await</code> 完全不支持对 thunk 函数进行 <code>await</code>。</p>
<p>这还不是 <code>hprose.co</code> 和 <code>hprose.thunkify</code> 的全部呢，再继续看下面这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sum = thunkify(function(a, b, callback) {
    callback(a + b);
});

co(function*() {
    var result = sum(1, 2);
    console.log(yield result);
    console.log(yield sum(2, 3));
    console.log(yield result);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> sum = thunkify(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b, callback</span>) </span>{
    callback(a + b);
});

co(<span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> result = sum(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> result);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> sum(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>));
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">yield</span> result);
});</code></pre>
<p>这里开头对 <code>hprose</code> 和 <code>tj</code> 版本的不同 <code>co</code> 和 <code>thunkify</code> 实现的引用就省略了，请大家自行脑补。</p>
<p>上面这段程序，如果使用 <code>tj</code> 版本的 <code>co</code> 和 <code>thunkify</code> 实现，运行结果是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(node:75927) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 2): 3
(node:75927) DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>(<span class="hljs-keyword">node</span><span class="hljs-title">:75927</span>) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: <span class="hljs-number">2</span>): <span class="hljs-number">3</span>
(<span class="hljs-keyword">node</span><span class="hljs-title">:75927</span>) DeprecationWarning: Unhandled promise rejections are deprecated. <span class="hljs-keyword">In</span> the future, promise rejections that are not handled will terminate the <span class="hljs-keyword">Node</span>.<span class="hljs-title">js</span> process with a non-zero exit code.</code></pre>
<p>而如果使用 <code>hprose</code> 版本的 <code>co</code> 和 <code>thunkify</code> 实现，运行结果是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="3
5
3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">3</span>
<span class="hljs-number">5</span>
<span class="hljs-number">3</span></code></pre>
<p><code>hprose</code> 版本的运行结果再次符合预期，而 <code>tj</code> 版本的运行结果再次让人失望之极。</p>
<p>进过上面三个回合的较量，我们发现 hprose 的协程完胜 <code>tj</code> 和 <code>async/await</code>，而且 <code>tj</code> 的实现是惨败，<code>async/await</code> 虽然比 <code>tj</code> 稍微好那么一点，但是跟 <code>hprose</code> 所实现协程比起来，也是望尘莫及。</p>
<p>所以，用 <code>tj/co</code> 和 <code>async/await</code> 感觉很不爽的同学，可以试试 <code>hprose.co</code> 了，绝对让你爽歪歪。</p>
<p>hprose 有 4 个 JavaScript 版本，它们都支持上面的协程库，它们的地址分别是：</p>
<ul>
<li><p><a href="https://github.com/hprose/hprose-nodejs" rel="nofollow noreferrer" target="_blank">hprose for Node.js</a>(<a href="https://git.oschina.net/andot/hprose-nodejs" rel="nofollow noreferrer" target="_blank">oschina镜像</a>)</p></li>
<li><p><a href="https://github.com/hprose/hprose-html5" rel="nofollow noreferrer" target="_blank">hprose for HTML5</a>(<a href="https://git.oschina.net/andot/hprose-html5" rel="nofollow noreferrer" target="_blank">oschina镜像</a>)</p></li>
<li><p><a href="https://github.com/hprose/hprose-js" rel="nofollow noreferrer" target="_blank">hprose for JavaScript</a>(<a href="https://git.oschina.net/andot/hprose-js" rel="nofollow noreferrer" target="_blank">oschina镜像</a>)</p></li>
<li><p><a href="https://github.com/hprose/hprose-wx" rel="nofollow noreferrer" target="_blank">hprose for 微信小程序</a>(<a href="https://git.oschina.net/andot/hprose-wx" rel="nofollow noreferrer" target="_blank">oschina镜像</a>)</p></li>
</ul>
<p>另外，如果你不需要使用 hprose 序列化和远程调用的话，下面还有一个专门的从 hprose 中精简出来的 Promise A+ 实现和协程库：<a href="https://github.com/andot/future-js" rel="nofollow noreferrer" target="_blank">Future.js</a>(<a href="https://git.oschina.net/hprose/future-js" rel="nofollow noreferrer" target="_blank">oschina镜像</a>)</p>
<p>当然该协程库的功能不止于此，更多介绍请参见：</p>
<ul>
<li><p><a href="https://github.com/hprose/hprose-nodejs/wiki/Promise-%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B" rel="nofollow noreferrer" target="_blank">Promise 异步编程</a></p></li>
<li><p><a href="https://github.com/hprose/hprose-nodejs/wiki/%E5%8D%8F%E7%A8%8B" rel="nofollow noreferrer" target="_blank">协程</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
秒杀 tj/co 的 hprose 协程库

## 原文链接
[https://segmentfault.com/a/1190000007573266](https://segmentfault.com/a/1190000007573266)

