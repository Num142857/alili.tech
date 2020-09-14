---
title: '为什么要用原生 JavaScript 代替 jQuery？' 
date: 2019-01-27 2:30:59
hidden: true
slug: 6lp3aa7vyfk
categories: [reprint]
---

{{< raw >}}

                    
<p>随着 JavaScript 本身的完善，越来越多的人开始喜欢使用原生 JavaScript 开发代替各种库，其中不少人发出了用原生 JavaScript 代替 jQuery 的声音。这并不是什么坏事，但也不见得就是好事。如果你真的想把 jQuery 从前端依赖库中移除掉，我建议你慎重考虑。</p>
<p>首先 jQuery 是一个第三方库。库存在的价值之一在于它能极大地简化开发。一般情况下，第三方库都是由原生语言特性和基础 API 库实现的。因此，理论上来说，任何库第三方库都是可以用原生语言特性代替的，问题在于<strong>是否值得？</strong></p>
<h2 id="articleHeader0">jQuery 的作用</h2>
<p>引用一段 jQuery 官网的话：</p>
<blockquote><p>jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document <strong><em>traversal</em></strong> and <strong><em>manipulation</em></strong>, <strong><em>event handling</em></strong>, <strong><em>animation</em></strong>, and <strong><em>Ajax</em></strong> much simpler with an easy-to-use API that works across <strong><em>a multitude of</em></strong> browsers.</p></blockquote>
<p>这一段话很谦虚的介绍了 jQuery 在处理 DOM 和跨浏览器方面做出的贡献。而事实上，这也正是我们选用 jQuery 的主要原因，并顺带使用了它带来的一些工具，比如数组工具，Deferred 等。</p>
<p>对于我来说，最常用的功能包括</p>
<ul>
<li>在 DOM 树中进行查询</li>
<li>修改 DOM 树及 DOM 相关操作</li>
<li>事件处理</li>
<li>Ajax</li>
<li>Deferred 和 Promise</li>
<li>对象和数组处理</li>
<li>还有一个一直在用却很难在列清单时想到的——跨浏览器</li>
</ul>
<h2 id="articleHeader1">到底是谁在替代谁？</h2>
<p>上面提到的所有功能都能用原生代码来实现。从本质上来说，jQuery 就是用来代替原生实现，以达到减少代码，增强可读性的目的的——所以，到底是用 jQuery 代替原生代码，还是用原生代码代替 jQuery？这个先后因果关系可否搞明白？</p>
<p>我看到说用 <code>querySelectorAll()</code> 代替 <code>$()</code> 的时候，不禁在想，用 jQuery 一个字符就能解决的，为什么要写十六个字符？大部分浏览器是有实现 <code>$()</code>，但是写原生代码的时候你会考虑 <code>$()</code> 的浏览器兼容性吗？jQuery 已经考虑了！</p>
<p>我看到一大堆创建 DOM 结构的原生 JavaScript 代码的时候，不禁在想，用 jQuery 只需要一个方法链就解决了，我甚至可以用和 HTML 结构类似的代码(包含缩进)，比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建一个 ul 列表并加在 #container 中
$(&quot;<ul>&quot;).append(
    $(&quot;<li>&quot;).append(
        $(&quot;<a>&quot;).attr(&quot;href&quot;, &quot;#&quot;).text(&quot;first&quot;)),
    $(&quot;<li>&quot;).append(
        $(&quot;<a>&quot;).attr(&quot;href&quot;, &quot;#&quot;).text(&quot;second&quot;)),
    $(&quot;<li>&quot;).append(
        $(&quot;<a>&quot;).attr(&quot;href&quot;, &quot;#&quot;).text(&quot;third&quot;))
).appendTo($(&quot;#container&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 创建一个 ul 列表并加在 #container 中</span>
$(<span class="hljs-string">"&lt;ul&gt;"</span>).append(
    $(<span class="hljs-string">"&lt;li&gt;"</span>).append(
        $(<span class="hljs-string">"&lt;a&gt;"</span>).attr(<span class="hljs-string">"href"</span>, <span class="hljs-string">"#"</span>).text(<span class="hljs-string">"first"</span>)),
    $(<span class="hljs-string">"&lt;li&gt;"</span>).append(
        $(<span class="hljs-string">"&lt;a&gt;"</span>).attr(<span class="hljs-string">"href"</span>, <span class="hljs-string">"#"</span>).text(<span class="hljs-string">"second"</span>)),
    $(<span class="hljs-string">"&lt;li&gt;"</span>).append(
        $(<span class="hljs-string">"&lt;a&gt;"</span>).attr(<span class="hljs-string">"href"</span>, <span class="hljs-string">"#"</span>).text(<span class="hljs-string">"third"</span>))
).appendTo($(<span class="hljs-string">"#container"</span>));</code></pre>
<p>这段代码用 <code>document.createElement()</code> 来实现完全没有问题，只不过代码量要大得多，而且会出现大量重复(或类似)的代码。当然是可以把这些重复代码提取出来写成函数的……不过 jQuery 已经做了。</p>
<blockquote><p>注，拼 HTML 的方法实在弱爆了，既容易出错，又不易阅读。如果有 ES6 的字符串模板之后，用它来写 HTML 也是个不错的主意。</p></blockquote>
<p>就 DOM 操作这一部分来说，jQuery 仍然是一个非常好用的工具。这是 jQuery 替代了原生 JavaScript，以前如此，现在仍然如此。</p>
<h2 id="articleHeader2">没落的 jQuery 工具函数</h2>
<p>jQuery 2006 年被发明出来的时候，还没有 ES5(2011年6月发布)。即使在 ES5 发布之后很长一段时间里，也不是所有浏览器都支持。因此在这一时期，除 DOM 操作外，jQuery 的巨大贡献在于解决跨浏览器的问题，以及提供了方便的对象和数组操作工具，比如 <code>each()</code>、<code>index()</code> 和 <code>filter</code> 等。</p>
<p>如今 ECMAScript 刚刚发布了 2017 的标准，浏览器标准混乱的问题也已经得到了很好的解决，前端界还出现了 Babel 这样的转译工具和 TypeScript 之类的新语言。所以现在大家都尽可放心的使用各种新的语言特性，哪怕 ECMAScript 的相关标准还在制定中。在这一时期，jQuery 提供的大量工具方法都已经有了原生替代品——在使用上差别不大的情况下，确实宁愿用原生实现。</p>
<p>事实上，jQuery 也在极尽可能地采用原生实现，以提高执行效率。jQuery 没有放弃这些已有原生实现的工具函数/方法，主要还是因为向下兼容，以及一如既往的提供浏览器兼容性——毕竟不是每一个使用 jQuery 的开发者都会使用转译工具。</p>
<p>那么，对于 JavaScript 开发者而言，jQuery 确实有很多工具方法可以被原生 JavaScript 函数/方法替代。比如</p>
<ul>
<li>
<code>$.parseJSON()</code> 可以用 <code>JSON.parse()</code> 替代，而且 <code>JSON.stringify()</code> 还弥补了 jQuery <strong>没有</strong> <code>$.toJSON()</code> 的不足；</li>
<li>
<code>$.extend()</code> 的部分功能可以由 <code>Object.assign()</code> 替代`</li>
<li>
<code>$.fn</code> 的一些数据处理工具方法，比如 <code>each()</code>、<code>index()</code> 等都可以用 <code>Array.prototype</code> 中相应的工具方法替代，比如 <code>forEach()</code>、<code>indexOf()</code> 等。</li>
<li>
<code>$.Deferred()</code> 和 jQuery Promise 在某些情况下可以用原生 Promise 替代。它们在没有 ES6 之前也算是个不错的 Promise 实现。</li>
<li><code>......</code></li>
</ul>
<blockquote><p><code>$.fn</code> 就是 <code>jQuery.prototype</code>，也就是 jQuery 对象的原型。所以在其上定义的方法就是 jQuery 对象的方法。</p></blockquote>
<p>这些工具方法在原生 JavaScript 中已经逐渐补充完善，但它们仍然只是在某些情况下可以被替代……因为 jQuery 对象是一个特有的数据结构，针对 jQuery 自身创建的工具方法在作用于 jQuery 对象的时候会有一些针对性的实现——既然 DOM 操作仍然不能把 jQuery 抛开，那这些方法也就不可能被完全替换掉。</p>
<h2 id="articleHeader3">jQuery 与原生 JavaScript 的结合</h2>
<p>有时候需要用 jQuery，有时候不需要用，该如何分辨？</p>
<p>jQuery 的优势在于它的 DOM 处理、Ajax，以及跨浏览器。如果在项目中引入 jQuery，多半是因为对这些功能的需求。而对于不操作 DOM，也不需要考虑跨浏览器(比如用于转译工具)的部分，则考虑尽可能的用原生 JavaScript 实现。</p>
<p>如此以来，一定会存在 jQuery 和原生 JavaScript 的交集，那么，就不得不说说需要注意的地方。</p>
<h3 id="articleHeader4">jQuery 对象实现了部分数组功能的伪数组</h3>
<p>首先要注意的一点，就是 jQuery 对象是一个伪数组，它是对原生数组或伪数组(比如 DOM 节点列表)的封装。</p>
<p>如果要获得某个元素，可以用 <code>[]</code> 运算符或 <code>get(index)</code> 方法；如果要获得包含所有元素的数组，可以使用 <code>toArray()</code> 方法，或者通过 ES6 中引入的 <code>Array.from()</code> 来转换。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 将普通数组转换成 jQuery 对象
const jo = $([1, 2, 3]);
jo instanceof jQuery;   // true
Array.isArray(jo);      // false

// 从 jQuery 对象获取元素值
const a1 = jo[0];       // 1
const a2 = jo.get(1);   // 2

// 将 jQuery 对象转换成普通数组
const arr1 = jo.toArray();      // [1, 2, 3]
Array.isArray(arr1);            // true
const arr2 = Array.from(jo);    // [1, 2, 3]
Array.isArray(arr2);            // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 将普通数组转换成 jQuery 对象</span>
<span class="hljs-keyword">const</span> jo = $([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);
jo <span class="hljs-keyword">instanceof</span> jQuery;   <span class="hljs-comment">// true</span>
<span class="hljs-built_in">Array</span>.isArray(jo);      <span class="hljs-comment">// false</span>

<span class="hljs-comment">// 从 jQuery 对象获取元素值</span>
<span class="hljs-keyword">const</span> a1 = jo[<span class="hljs-number">0</span>];       <span class="hljs-comment">// 1</span>
<span class="hljs-keyword">const</span> a2 = jo.get(<span class="hljs-number">1</span>);   <span class="hljs-comment">// 2</span>

<span class="hljs-comment">// 将 jQuery 对象转换成普通数组</span>
<span class="hljs-keyword">const</span> arr1 = jo.toArray();      <span class="hljs-comment">// [1, 2, 3]</span>
<span class="hljs-built_in">Array</span>.isArray(arr1);            <span class="hljs-comment">// true</span>
<span class="hljs-keyword">const</span> arr2 = <span class="hljs-built_in">Array</span>.from(jo);    <span class="hljs-comment">// [1, 2, 3]</span>
<span class="hljs-built_in">Array</span>.isArray(arr2);            <span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader5">注意 <code>each/map</code> 和 <code>forEach/map</code> 回调函数的参数顺序</h3>
<p>jQuery 定义在 <code>$.fn</code> 上的 <code>each()</code> 和 <code>map()</code> 方法与定义在 <code>Array.prototype</code> 上的原生方法 <code>forEach()</code> 和 <code>map()</code> 对应，它们的参数都是回调函数，但它们的回调函数定义有一些细节上的差别。</p>
<p><code>$.fn.each()</code> 的回调定义如下：</p>
<blockquote><p><code>Function(Integer index, Element element )</code></p></blockquote>
<p>回调的第一个参数是数组元素所在的位置(序号，从 <code>0</code> 开始)，第二个参数是元素本身。</p>
<p>而 <code>Array.prototype.forEach()</code> 的回调定义是</p>
<blockquote><p><code>Function(currentValue, index, array)</code></p></blockquote>
<p>回调的第一个参数是数组元素本身，第二个参数才是元素所有的位置(序号)。而且这个回调有第三个参数，即整个数组的引用。</p>
<p>请特别注意这两个回调定义的第一个参数和第二个参数，所表示的意义正好交换，这在混用 jQuery 和原生代码的时候很容易发生失误。</p>
<p>对于 <code>$.fn.map()</code> 和 <code>Array.prototype.map()</code> 的回调也是如此，而且由于这两个方法同名，发生失误的概率会更大。</p>
<h3 id="articleHeader6">注意 <code>each()/map()</code> 中的 <code>this</code>
</h3>
<p><code>$.fn.each()</code> 和 <code>$.fn.map()</code> 回调中经常会使用 <code>this</code>，这个 <code>this</code> 指向的就是当前数组元素。正是因为有这个便利，所以 jQuery 在定义回请贩时候没有把元素本身作为第一个参数，而是把序号作为第一个参数。</p>
<p>不过 ES6 带来了箭头函数。箭头函数最常见的作用就是用于回调。箭头函数中的 <code>this</code> 与箭头函数定义的上下文相关，而不像普通函数中的 <code>this</code> 是与调用者相关。</p>
<p>现在问题来了，如果把箭头函数作为 <code>$.fn.each()</code> 或 <code>$.fn.map()</code> 的回调，需要特别注意 <code>this</code> 的使用——箭头函数中的 <code>this</code> 不再是元素本身。鉴于这个问题，建议若非必要，仍然使用函数表达式作为 <code>$.fn.each()</code> 和 <code>$.fn.map()</code> 的回调，以保持原有的 jQuery 编程习惯。实在需要使用箭头函数来引用上下文 <code>this</code> 的情况下，千万记得用其回调定义的第二个参数作为元素引用，而不是 <code>this</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 将所有输入控制的 name 设置为其 id
$(&quot;:input&quot;).each((index, input) => {
    // const $input = $(this) 这是错误的！！！
    const $input = $(input);
    $input.prop(&quot;name&quot;, $input.prop(&quot;id&quot;));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 将所有输入控制的 name 设置为其 id</span>
$(<span class="hljs-string">":input"</span>).each(<span class="hljs-function">(<span class="hljs-params">index, input</span>) =&gt;</span> {
    <span class="hljs-comment">// const $input = $(this) 这是错误的！！！</span>
    <span class="hljs-keyword">const</span> $input = $(input);
    $input.prop(<span class="hljs-string">"name"</span>, $input.prop(<span class="hljs-string">"id"</span>));
});</code></pre>
<h3 id="articleHeader7">
<code>$.fn.map()</code> 返回的并不是数组</h3>
<p>与 <code>Array.prototype.map()</code> 不同，<code>$.fn.map()</code> 返回的不是数组，而是 jQuery 对象，是伪数组。如果需要得到原生数组，可以采用 <code>toArray()</code> 或 <code>Array.from()</code> 输出。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const codes = $([97, 98, 99]);
const chars = codes.map(function() {
    return String.fromCharCode(this);
});     // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]

chars instanceof jQuery;    // true
Array.isArray(chars);       // false

const chars2 = chars.toArray();
Array.isArray(chars2);      // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> codes = $([<span class="hljs-number">97</span>, <span class="hljs-number">98</span>, <span class="hljs-number">99</span>]);
<span class="hljs-keyword">const</span> chars = codes.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">String</span>.fromCharCode(<span class="hljs-keyword">this</span>);
});     <span class="hljs-comment">// ["a", "b", "c"]</span>

chars <span class="hljs-keyword">instanceof</span> jQuery;    <span class="hljs-comment">// true</span>
<span class="hljs-built_in">Array</span>.isArray(chars);       <span class="hljs-comment">// false</span>

<span class="hljs-keyword">const</span> chars2 = chars.toArray();
<span class="hljs-built_in">Array</span>.isArray(chars2);      <span class="hljs-comment">// true</span></code></pre>
<h2 id="articleHeader8">jQuery Promise</h2>
<p>jQuery 是通过 <code>$.Deferred()</code> 来实现的 Promise 功能。在 ES6 以前，如果引用了 jQuery，基本上不需要再专门引用一个 Promise 库，jQuery 已经实现了 Promise 的基本功能。</p>
<p>不过 jQuery Promise 虽然实现了 <code>then()</code>，却没有实现 <code>catch()</code>，所以它不能兼容原生的 Promise，不过用于 <a href="https://github.com/tj/co" rel="nofollow noreferrer" target="_blank">co</a> 或者 ES2017 的 <code>async/await</code> 毫无压力。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 模拟异步操作
function mock(value, ms = 200) {
    const d = $.Deferred();
    setTimeout(() => {
        d.resolve(value);
    }, ms);
    return d.promise();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 模拟异步操作</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mock</span>(<span class="hljs-params">value, ms = <span class="hljs-number">200</span></span>) </span>{
    <span class="hljs-keyword">const</span> d = $.Deferred();
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        d.resolve(value);
    }, ms);
    <span class="hljs-keyword">return</span> d.promise();
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// co 实现
co(function* () {
    const r1 = yield mock([&quot;first&quot;]);
    const r2 = yield mock([...r1, &quot;second&quot;]);
    const r3 = yield mock([...r2, &quot;third&quot;]);
    console.log(r1, r2, r3);
});

// ['first']
// ['first', 'second']
// ['first', 'second', 'third']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// co 实现</span>
co(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> r1 = <span class="hljs-keyword">yield</span> mock([<span class="hljs-string">"first"</span>]);
    <span class="hljs-keyword">const</span> r2 = <span class="hljs-keyword">yield</span> mock([...r1, <span class="hljs-string">"second"</span>]);
    <span class="hljs-keyword">const</span> r3 = <span class="hljs-keyword">yield</span> mock([...r2, <span class="hljs-string">"third"</span>]);
    <span class="hljs-built_in">console</span>.log(r1, r2, r3);
});

<span class="hljs-comment">// ['first']</span>
<span class="hljs-comment">// ['first', 'second']</span>
<span class="hljs-comment">// ['first', 'second', 'third']</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// async/await 实现，需要 Chrome 55 以上版本测试
(async () => {
    const r1 = await mock([&quot;first&quot;]);
    const r2 = await mock([...r1, &quot;second&quot;]);
    const r3 = await mock([...r2, &quot;third&quot;]);
    console.log(r1, r2, r3);
})();

// ['first']
// ['first', 'second']
// ['first', 'second', 'third']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// async/await 实现，需要 Chrome 55 以上版本测试</span>
(<span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> r1 = <span class="hljs-keyword">await</span> mock([<span class="hljs-string">"first"</span>]);
    <span class="hljs-keyword">const</span> r2 = <span class="hljs-keyword">await</span> mock([...r1, <span class="hljs-string">"second"</span>]);
    <span class="hljs-keyword">const</span> r3 = <span class="hljs-keyword">await</span> mock([...r2, <span class="hljs-string">"third"</span>]);
    <span class="hljs-built_in">console</span>.log(r1, r2, r3);
})();

<span class="hljs-comment">// ['first']</span>
<span class="hljs-comment">// ['first', 'second']</span>
<span class="hljs-comment">// ['first', 'second', 'third']</span></code></pre>
<p>虽然 jQuery 的 Promise 没有 <code>catch()</code>，但是提供了 <code>fail</code> 事件处理，这个事件在 Deferred <code>reject()</code> 的时候触发。相应的还有 <code>done</code> 事件，在 Deferred <code>resovle()</code> 的时候触发，以及 <code>always</code> 事件，不论什么情况都会触发。</p>
<p>与一次性的 <code>then()</code> 不同，事件可以注册多个处理函数，在事件触发的时候，相应的处理函数会依次执行。另外，事件不具备传递性，所以 <code>fail()</code> 不能在写在 <code>then()</code> 链的最后。</p>
<h2 id="articleHeader9">结语</h2>
<p>总的来说，在大量操作 DOM 的前端代码中使用 jQuery 可以带来极大的便利，也使 DOM 操作的相关代码更易读。另一方面，原生 JavaScript 带来的新特性确实可以替代 jQuery 的部分工具函数/方法，以降低项目对 jQuery 的依赖程序。</p>
<p>jQuery 和原生 JavaScript 应该是共生关系，而不是互斥关系。应该在合适的时候选用合适的方法，而不是那么绝对的非要用谁代替谁。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为什么要用原生 JavaScript 代替 jQuery？

## 原文链接
[https://segmentfault.com/a/1190000008234056](https://segmentfault.com/a/1190000008234056)

