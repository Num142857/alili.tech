---
title: '给初学者：JavaScript 中数组操作注意点' 
date: 2018-12-21 2:30:11
hidden: true
slug: 1ga5x1zwy5jj
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">不要用 for_in 遍历数组</h2>
<p>这是 JavaScript 初学者常见的误区。for_in 用于遍历对象中包括原型链上的所有可枚举的（enumerable）的 key，本来不是为遍历数组而存在。</p>
<p>使用 for_in 遍历数组有三点问题：</p>
<ol><li>遍历顺序不固定</li></ol>
<p>JavaScript 引擎不保证对象的遍历顺序。当把数组作为普通对象遍历时同样不保证遍历出的索引顺序。</p>
<ol><li>会遍历出对象原型链上的值。</li></ol>
<p>如果你改变了数组的原型对象（比如 polyfill）而没有将其设为 <code>enumerable: false</code>，for_in 会把这些东西遍历出来。</p>
<ol><li>运行效率低下。</li></ol>
<p>尽管理论上 JavaScript 使用对象的形式储存数组，JavaScript 引擎还是会对数组这一非常常用的内置对象特别优化。  <a href="https://jsperf.com/for-in-vs-for-of-vs-foreach" rel="nofollow noreferrer" target="_blank">https://jsperf.com/for-in-vs-...</a>  <br>可以看到使用 for_in 遍历数组要比使用下标遍历数组慢 50 倍以上</p>
<p>PS：你可能是想找 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of" rel="nofollow noreferrer" target="_blank">for_of</a></p>
<h2 id="articleHeader1">不要用 JSON.parse(JSON.stringify()) 深拷贝数组</h2>
<p>有人使用 JSON 中深拷贝对象或数组。这虽然在多数情况是个简单方便的手段，但也可能引发未知 bug，因为：</p>
<ol><li>会使某些特定值转换为 <code>null</code>
</li></ol>
<p>NaN, undefined, Infinity 对于 JSON 中不支持的这些值，会在序列化 JSON 时被转换为 null，反序列化回来后自然也就是 null</p>
<ol><li>会丢失值为 undefined 的键值对</li></ol>
<p>JSON 序列化时会忽略值为 undefined 的 key，反序列化回来后自然也就丢失了</p>
<ol><li>会将 Date 对象转换为字符串</li></ol>
<p>JSON 不支持对象类型，对于 JS 中 Date 对象的处理方式为转换为 ISO8601 格式的字符串。然而反序列化并不会把时间格式的字符串转化为 Date 对象</p>
<ol><li>运行效率低下。</li></ol>
<p>作为原生函数，<code>JSON.stringify</code> 和 <code>JSON.parse</code> 自身操作 JSON 字符串的速度是很快的。然而为了深拷贝数组把对象序列化成 JSON 再反序列化回来完全没有必要。</p>
<p>我花了一些时间写了一个简单的深拷贝数组或对象的函数，测试发现运行速度差不多是使用 JSON 中转的 6 倍左右，顺便还支持了 TypedArray、RegExp 的对象的复制</p>
<p><a href="https://jsperf.com/deep-clone-array-using-native-json-and-custom-deepclone" rel="nofollow noreferrer" target="_blank">https://jsperf.com/deep-clone...</a></p>
<h2 id="articleHeader2">不要用 arr.find 代替 arr.some</h2>
<p><code>Array.prototype.find</code> 是 ES2015 中新增的数组查找函数，与 <code>Array.prototype.some</code> 有相似之处，但不能替代后者。</p>
<p><code>Array.prototype.find</code> 返回第一个符合条件的值，直接拿这个值做 <code>if</code> 判断是否存在，如果这个符合条件的值恰好是 0 怎么办？</p>
<p><code>arr.find</code> 是找到数组中的值后对其进一步处理，一般用于对象数组的情况；<code>arr.some</code> 才是检查存在性；两者不可混用。</p>
<h2 id="articleHeader3">不要用 arr.map 代替 arr.forEach</h2>
<p>也是一个 JavaScript 初学者常常犯的错误，他们往往并没有分清 <code>Array.prototype.map</code> 和 <code>Array.prototype.forEach</code> 的实际含义。</p>
<p><code>map</code> 中文叫做 <code>映射</code>，它通过将某个序列依次执行某个函数导出另一个新的序列。这个函数通常是不含副作用的，更不会修改原始的数组（所谓纯函数）。</p>
<p><code>forEach</code> 就没有那么多说法，它就是简单的把数组中所有项都用某个函数处理一遍。由于 <code>forEach</code> 没有返回值（返回 undefined），所以它的回调函数通常是包含副作用的，否则这个 <code>forEach</code> 写了毫无意义。</p>
<p>确实 <code>map</code> 比 <code>forEach</code> 更加强大，但是 <code>map</code> 会创建一个新的数组，占用内存。如果你不用 <code>map</code> 的返回值，那你就应当使用 <code>forEach</code></p>
<h2 id="articleHeader4">补：对数组排序时，永远记得传入比较函数</h2>
<p><code>arr.sort</code> 默认会将数组中所有元素转换成字符串后以字典序排序。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1,2,3,4,5,6,7,8,9,10].sort() // => [1,10,2,3,4,5,6,7,8,9]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>,<span class="hljs-number">10</span>].sort() <span class="hljs-comment">// =&gt; [1,10,2,3,4,5,6,7,8,9]</span></code></pre>
<p>除非你是给字符串数组排序，否则请给它传入一个比较函数。</p>
<p>PS：不要手写排序算法了</p>
<h2 id="articleHeader5">补：forEach 与 break</h2>
<p>ES6 以前，遍历数组主要就是两种方法：手写循环用下标迭代，使用 <code>Array.prototype.forEach</code>。前者万能，效率最高，可就是写起来比较繁琐——它不能直接获取到数组中的值。</p>
<p>笔者个人是喜欢后者的：可以直接获取到迭代的下标和值，而且函数式风格（注意 FP 注重的是不可变数据结构，forEach 天生为副作用存在，所以只有 FP 的形而没有神）写起来爽快无比。但是！不知各位同学注意过没有：forEach 一旦开始就停不下来了。。。</p>
<p>forEach 接受一个回调函数，你可以提前 <code>return</code>，相当于手写循环中的 <code>continue</code>。但是你不能 <code>break</code>——因为回调函数中没有循环让你去 <code>break</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2, 3, 4, 5].forEach(x => {
  console.log(x);
  if (x === 3) {
    break;  // SyntaxError: Illegal break statement
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>].forEach(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(x);
  <span class="hljs-keyword">if</span> (x === <span class="hljs-number">3</span>) {
    <span class="hljs-keyword">break</span>;  <span class="hljs-comment">// SyntaxError: Illegal break statement</span>
  }
});</code></pre>
<p>解决方案还是有的。其他函数式编程语言例如 <code>scala</code> 就遇到了类似问题，它提供了一个<strong>函数</strong><br><a href="https://www.scala-lang.org/api/current/scala/util/control/Breaks.html" rel="nofollow noreferrer" target="_blank">break</a>，作用是抛出一个异常。</p>
<p><span class="img-wrap"><img data-src="/img/bV0sRJ?w=1442&amp;h=250" src="https://static.alili.tech/img/bV0sRJ?w=1442&amp;h=250" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们可以仿照这样的做法，来实现 <code>arr.forEach</code> 的 <code>break</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
  [1, 2, 3, 4, 5].forEach(x => {
    console.log(x);
    if (x === 3) {
      throw 'break';
    }
  });
} catch (e) {
  if (e !== 'break') throw e; // 不要勿吞异常。。。
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">try</span> {
  [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>].forEach(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(x);
    <span class="hljs-keyword">if</span> (x === <span class="hljs-number">3</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-string">'break'</span>;
    }
  });
} <span class="hljs-keyword">catch</span> (e) {
  <span class="hljs-keyword">if</span> (e !== <span class="hljs-string">'break'</span>) <span class="hljs-keyword">throw</span> e; <span class="hljs-comment">// 不要勿吞异常。。。</span>
}</code></pre>
<p>恶心的一Ｂ对不对。还有其他方法，比如用 <code>Array.prototype.some</code> 代替 <code>Array.prototype.forEach</code>。</p>
<p>考虑 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some#Description" rel="nofollow noreferrer" target="_blank">Array.prototype.some</a> 的特性，当 <code>some</code> 找到一个符合条件的值（回调函数返回 <code>true</code>）时会<strong>立即</strong>终止循环，利用这样的特性可以模拟 <code>break</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2, 3, 4, 5].some(x => {
  console.log(x);
  if (x === 3) {
    return true; // break
  }
  // return undefined; 相当于 false
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>].some(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(x);
  <span class="hljs-keyword">if</span> (x === <span class="hljs-number">3</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>; <span class="hljs-comment">// break</span>
  }
  <span class="hljs-comment">// return undefined; 相当于 false</span>
});</code></pre>
<p><code>some</code> 的返回值被忽略掉了，它已经脱离了<strong>判断数组中是否有元素符合给出的条件</strong>这一原始的含义。</p>
<p>在 ES6 前，笔者主要使用该法（其实因为 Babel 代码膨胀的缘故，现在也偶尔使用），ES6 不一样了，我们有了 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of" rel="nofollow noreferrer" target="_blank">for...of</a>。<code>for...of</code> 是真正的循环，可以 <code>break</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (const x of [1, 2, 3, 4, 5]) {
  console.log(x);
  if (x === 3) {
    break;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> x <span class="hljs-keyword">of</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]) {
  <span class="hljs-built_in">console</span>.log(x);
  <span class="hljs-keyword">if</span> (x === <span class="hljs-number">3</span>) {
    <span class="hljs-keyword">break</span>;
  }
}</code></pre>
<p>但是有个问题，<code>for...of</code> 似乎拿不到循环的下标。其实 JavaScript 语言制定者想到了这个问题，可以如下解决：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (const [index, value] of [1, 2, 3, 4, 5].entries()) {
  console.log(`arr[${index}] = ${value}`);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> [index, value] <span class="hljs-keyword">of</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>].entries()) {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`arr[<span class="hljs-subst">${index}</span>] = <span class="hljs-subst">${value}</span>`</span>);
}</code></pre>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries" rel="nofollow noreferrer" target="_blank">Array.prototype.entries</a></p>
<p><code>for...of</code> 和 <code>forEach</code> 的性能测试：<a href="https://jsperf.com/array-foreach-vs-for-of-entries/1" rel="nofollow noreferrer" target="_blank">https://jsperf.com/array-fore...</a> Chrome 中 <code>for...of</code> 要快一些哦?</p>
<h2 id="articleHeader6">如果有更多建议欢迎留言指出</h2>
<p>完</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
给初学者：JavaScript 中数组操作注意点

## 原文链接
[https://segmentfault.com/a/1190000012463583](https://segmentfault.com/a/1190000012463583)

