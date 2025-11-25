---
title: 'JavaScript 在 V8 中的元素种类及性能优化' 
date: 2018-12-30 2:30:10
hidden: true
slug: 0lylrmvx75zb
categories: [reprint]
---

{{< raw >}}

                    
<p>原文：<a href="https://v8project.blogspot.com/2017/09/elements-kinds-in-v8.html" rel="nofollow noreferrer" target="_blank">“Elements kinds” in V8</a></p>
<p>JavaScript 对象可以具有与它们相关联的任意属性。对象属性的名称可以包含任何字符。JavaScript 引擎可以进行优化的一个有趣的例子是当属性名是纯数字时，一个特例就是<a href="https://tc39.github.io/ecma262/#sec-object-type" rel="nofollow noreferrer" target="_blank">数组索引</a>的属性。</p>
<p>在 V8 中，如果属性名是数字（最常见的形式是 Array 构造函数生成的对象）会被特殊处理。尽管在许多情况下，这些数字索引属性的行为与其他属性一样，V8 选择将它们与非数字属性分开存储以进行优化。在引擎内部，V8 甚至给这些属性一个特殊的名称：元素。对象具有映射到值的<a href="https://v8project.blogspot.com/2017/08/fast-properties.html" rel="nofollow noreferrer" target="_blank">属性</a>，而数组具有映射到元素的索引。</p>
<p>尽管这些内部结构从未直接暴露给 JavaScript 开发人员，但它们解释了为什么某些代码模式比其他代码模式更快。</p>
<h2 id="articleHeader0">常见的元素种类</h2>
<p>运行 JavaScript 代码时，V8 会跟踪每个数组所包含的元素。这些信息可以帮助 V8 优化数组元素的操作。例如，当您在数组上调用 <code>reduce</code>，<code>map</code> 或 <code>forEach</code> 时，V8 可以根据数组包含哪些元素来优化这些操作。</p>
<p>拿这个数组举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const array = [1, 2, 3];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];</code></pre>
<p>它包含什么样的元素？如果你使用 <code>typeof</code> 操作符，它会告诉你数组包含 <code>numbers</code>。在语言层面，这就是你所得到的：JavaScript 不区分整数，浮点数和双精度 - 它们只是数字。然而，在引擎级别，我们可以做出更精确的区分。这个数组的元素是 <strong>PACKED_SMI_ELEMENTS</strong>。在 V8<br> 中，术语 Smi 是指用于存储小整数的特定格式。（后面我们会在 <code>PACKED</code> 部分中说明。）</p>
<p>稍后在这个数组中添加一个浮点数将其转换为更通用的元素类型：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const array = [1, 2, 3];
// 元素类型: PACKED_SMI_ELEMENTS
array.push(4.56);
// 元素类型: PACKED_DOUBLE_ELEMENTS" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-comment">// 元素类型: PACKED_SMI_ELEMENTS</span>
array.push(<span class="hljs-number">4.56</span>);
<span class="hljs-comment">// 元素类型: PACKED_DOUBLE_ELEMENTS</span></code></pre>
<p>向数组添加字符串再次改变其元素类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const array = [1, 2, 3];
// 元素类型: PACKED_SMI_ELEMENTS
array.push(4.56);
// 元素类型: PACKED_DOUBLE_ELEMENTS
array.push('x');
// 元素类型: PACKED_ELEMENTS" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-comment">// 元素类型: PACKED_SMI_ELEMENTS</span>
array.push(<span class="hljs-number">4.56</span>);
<span class="hljs-comment">// 元素类型: PACKED_DOUBLE_ELEMENTS</span>
array.push(<span class="hljs-string">'x'</span>);
<span class="hljs-comment">// 元素类型: PACKED_ELEMENTS</span></code></pre>
<p>到目前为止，我们已经看到三种不同的元素，具有以下基本类型：</p>
<ul>
<li>小整数，又称 Smi。</li>
<li>双精度浮点数，浮点数和不能表示为 Smi 的整数。</li>
<li>常规元素，不能表示为 Smi 或双精度的值。</li>
</ul>
<p>请注意，双精度浮点数是 Smi 的更为一般的变体，而常规元素是双精度浮点数之上的另一个概括。可以表示为 Smi 的数字集合是可以表示为<br> double 的数字的子集。</p>
<p>这里重要的一点是，元素种类转换只能从一个方向进行：从特定的（例如 <code>PACKED_SMI_ELEMENTS</code>）到更一般的（例如 <code>PACKED_ELEMENTS</code>）。例如，一旦数组被标记为 <code>PACKED_ELEMENTS</code>，它就不能回到 <code>PACKED_DOUBLE_ELEMENTS</code>。</p>
<p>到目前为止，我们已经学到了以下内容：</p>
<p>V8 为每个数组分配一个元素种类。数组的元素种类并没有被捆绑在一起 - 它可以在运行时改变。在前面的例子中，我们从 <code>PACKED_SMI_ELEMENTS</code> 过渡到 <code>PACKED_ELEMENTS</code>。元素种类转换只能从特定种类转变为更普遍的种类。</p>
<h2 id="articleHeader1">PACKED vs HOLEY</h2>
<p>密集数组 <code>PACKED</code> 和稀疏数组 <code>HOLEY</code>。</p>
<p>到目前为止，我们只处理密集或打包（<code>PACKED</code>）数组。在数组中创建稀疏数组将元素降级到其 <code>HOLEY</code> 变体：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const array = [1, 2, 3, 4.56, 'x'];
// 元素类型: PACKED_ELEMENTS
array.length; // 5
array[9] = 1; // array[5] until array[8] are now holes
// 元素类型: HOLEY_ELEMENTS" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4.56</span>, <span class="hljs-string">'x'</span>];
<span class="hljs-comment">// 元素类型: PACKED_ELEMENTS</span>
array.length; <span class="hljs-comment">// 5</span>
array[<span class="hljs-number">9</span>] = <span class="hljs-number">1</span>; <span class="hljs-comment">// array[5] until array[8] are now holes</span>
<span class="hljs-comment">// 元素类型: HOLEY_ELEMENTS</span></code></pre>
<p>V8 之所以做这个区别是因为 <code>PACKED</code> 数组的操作比在 <code>HOLEY</code> 数组上的操作更利于进行优化。对于 <code>PACKED</code> 数组，大多数操作可以有效执行。相比之下， <code>HOLEY</code> 数组的操作需要对原型链进行额外的检查和昂贵的查找。</p>
<p>到目前为止，我们看到的每个基本元素（即 Smis，double 和常规元素）有两种：<code>PACKED</code> 和 <code>HOLEY</code>。我们不仅可以从 <code>PACKED_SMI_ELEMENTS</code> 转变为 <code>PACKED_DOUBLE_ELEMENTS</code> 我们也可以从任何 <code>PACKED</code> 形式转变成 <code>HOLEY</code> 形式。</p>
<p>回顾一下：</p>
<p>最常见的元素种类 <code>PACKED</code> 和 <code>HOLEY</code>。<code>PACKED</code> 数组的操作比在 <code>HOLEY</code> 数组上的操作更为有效。元素种类可从过渡 <code>PACKED</code> 转变为 <code>HOLEY</code>。</p>
<h2 id="articleHeader2">The elements kind lattice</h2>
<h2 id="articleHeader3">元素种类的格</h2>
<p>V8 将这个变换系统实现为<a href="https://en.wikipedia.org/wiki/Lattice_%28order%29" rel="nofollow noreferrer" target="_blank">格(数学概念)</a>。这是一个简化的可视化，仅显示最常见的元素种类：</p>
<p><span class="img-wrap"><img data-src="/img/bVUVTt?w=1312&amp;h=560" src="https://static.alili.tech/img/bVUVTt?w=1312&amp;h=560" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>只能通过格子向下过渡。一旦将单精度浮点数添加到 Smi 数组中，即使稍后用 Smi 覆盖浮点数，它也会被标记为 <code>DOUBLE</code>。类似地，一旦在数组中创建了一个洞，它将被永久标记为有洞 <code>HOLEY</code>，即使稍后填充它也是如此。</p>
<p>V8 目前有 <a href="https://cs.chromium.org/chromium/src/v8/src/elements-kind.h?l=14&amp;rcl=a7e622ba330d046295b61bf6fa9f296a99aafa77" rel="nofollow noreferrer" target="_blank">21 种不同的元素种类</a>，每种元素都有自己的一组可能的优化。</p>
<p>一般来说，更具体的元素种类可以进行更细粒度的优化。元素类型的在格子中越是向下，该对象的操作越慢。为了获得最佳性能，请避免不必要的不具体类型 - 坚持使用符合您情况的最具体的类型。</p>
<h2 id="articleHeader4">性能提示</h2>
<p>在大多数情况下，元素种类的跟踪操作都隐藏在引擎下面，您不需要担心。但是，为了从系统中获得最大的收益，您可以采取以下几方面。再次重申:更具体的元素种类可以进行更细粒度的优化。元素类型的在格子中越是向下，该对象的操作越慢。为了获得最佳性能，请避免不必要的不具体类型 - 坚持使用符合您情况的最具体的类型。</p>
<h3 id="articleHeader5">避免创建洞(hole)</h3>
<p>假设我们正在尝试创建一个数组，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const array = new Array(3);
// 此时，数组是稀疏的，所以它被标记为 `HOLEY_SMI_ELEMENTS`
// i.e. 给出当前信息的最具体的可能性。
array[0] = 'a';
// 接着，这是一个字符串，而不是一个小整数...所以过渡到`HOLEY_ELEMENTS`。
array[1] = 'b';
array[2] = 'c';
// 这时，数组中的所有三个位置都被填充，所以数组被打包（即不再稀疏）。
// 但是，我们无法转换为更具体的类型，例如 “PACKED_ELEMENTS”。
// 元素类保留为“HOLEY_ELEMENTS”。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> array = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">3</span>);
<span class="hljs-comment">// 此时，数组是稀疏的，所以它被标记为 `HOLEY_SMI_ELEMENTS`</span>
<span class="hljs-comment">// i.e. 给出当前信息的最具体的可能性。</span>
array[<span class="hljs-number">0</span>] = <span class="hljs-string">'a'</span>;
<span class="hljs-comment">// 接着，这是一个字符串，而不是一个小整数...所以过渡到`HOLEY_ELEMENTS`。</span>
array[<span class="hljs-number">1</span>] = <span class="hljs-string">'b'</span>;
array[<span class="hljs-number">2</span>] = <span class="hljs-string">'c'</span>;
<span class="hljs-comment">// 这时，数组中的所有三个位置都被填充，所以数组被打包（即不再稀疏）。</span>
<span class="hljs-comment">// 但是，我们无法转换为更具体的类型，例如 “PACKED_ELEMENTS”。</span>
<span class="hljs-comment">// 元素类保留为“HOLEY_ELEMENTS”。</span></code></pre>
<p><strong>一旦数组被标记为有洞，它永远是有洞的 - 即使它被打包了</strong>！从那时起，数组上的任何操作都可能变慢。如果您计划在数组上执行大量操作，并且希望对这些操作进行优化，请避免在数组中创建空洞。V8 可以更有效地处理密集数组。</p>
<p>创建数组的一种更好的方法是使用字面量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const array = ['a', 'b', 'c'];
// elements kind: PACKED_ELEMENTS" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> array = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>];
<span class="hljs-comment">// elements kind: PACKED_ELEMENTS</span></code></pre>
<p>如果您提前不知道元素的所有值，那么可以创建一个空数组，然后再 <code>push</code> 值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const array = [];
// …
array.push(someValue);
// …
array.push(someOtherValue);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> array = [];
<span class="hljs-comment">// …</span>
array.push(someValue);
<span class="hljs-comment">// …</span>
array.push(someOtherValue);</code></pre>
<p>这种方法确保数组不会被转换为 holey elements。因此，V8 可以更有效地优化数组上的任何操作。</p>
<h3 id="articleHeader6">避免读取超出数组的长度</h3>
<p>当读数超过数组的长度时，例如读取 <code>array[42]</code> 时，会发生类似的情况 <code>array.length === 5</code>。在这种情况下，数组索引 <code>42</code> 超出范围，该属性不存在于数组本身上，因此 JavaScript 引擎必须执行相同的昂贵的原型链查找。</p>
<p>不要这样写你的循环：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Don’t do this!
for (let i = 0, item; (item = items[i]) != null; i++) {
  doSomething(item);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Don’t do this!</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, item; (item = items[i]) != <span class="hljs-literal">null</span>; i++) {
  doSomething(item);
}</code></pre>
<p>该代码读取数组中的所有元素，然后再次读取。直到它找到一个元素为 <code>undefined</code> 或 <code>null</code> 时停止。（jQuery 在几个地方使用这种模式。）</p>
<p>相反，将你的循环写成老式的方式，只需要一直迭代到最后一个元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let index = 0; index < items.length; index++) {
  const item = items[index];
  doSomething(item);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> index = <span class="hljs-number">0</span>; index &lt; items.length; index++) {
  <span class="hljs-keyword">const</span> item = items[index];
  doSomething(item);
}</code></pre>
<p>当你循环的集合是可迭代的（数组和 <code>NodeLists</code>），还有更好的选择：只需要使用 for-of。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (const item of items) {
  doSomething(item);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> item <span class="hljs-keyword">of</span> items) {
  doSomething(item);
}</code></pre>
<p>对于数组，您可以使用内置的 <code>forEach</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="items.forEach((item) => {
  doSomething(item);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">items.forEach(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
  doSomething(item);
});</code></pre>
<p>如今，两者的性能 <code>for-of</code> 和 <code>forEach</code> 可以和旧式的 <code>for</code> 循环相提并论。</p>
<p>避免读数超出数组的长度！这样做和数组中的洞一样糟糕。在这种情况下，V8 的边界检查失败，检查属性是否存在失败，然后我们需要查找原型链。</p>
<h3 id="articleHeader7">避免元素种类转换</h3>
<p>一般来说，如果您需要在数组上执行大量操作，请尝试坚持尽可能具体的元素类型，以便 V8 可以尽可能优化这些操作。</p>
<p>这比看起来更难。例如，只需给数组添加一个 <code>-0</code>，一个小整数的数组即可将其转换为 <code>PACKED_DOUBLE_ELEMENTS</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const array = [3, 2, 1, +0];
// PACKED_SMI_ELEMENTS
array.push(-0);
// PACKED_DOUBLE_ELEMENTS" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> array = [<span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, +<span class="hljs-number">0</span>];
<span class="hljs-comment">// PACKED_SMI_ELEMENTS</span>
array.push(<span class="hljs-number">-0</span>);
<span class="hljs-comment">// PACKED_DOUBLE_ELEMENTS</span></code></pre>
<p>因此，此数组上的任何操作都将以与 Smi 完全不同的方式进行优化。</p>
<p>避免 <code>-0</code>，除非你需要在代码中明确区分 <code>-0</code> 和 <code>+0</code>。（你可能并不需要）</p>
<p>同样还有 <code>NaN</code> 和 <code>Infinity</code>。它们被表示为双精度，因此添加一个 <code>NaN</code> 或 <code>Infinity</code> 会将 <code>SMI_ELEMENTS</code> 转换为<br><code>DOUBLE_ELEMENTS</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const array = [3, 2, 1];
// PACKED_SMI_ELEMENTS
array.push(NaN, Infinity);
// PACKED_DOUBLE_ELEMENTS" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> array = [<span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>];
<span class="hljs-comment">// PACKED_SMI_ELEMENTS</span>
array.push(<span class="hljs-literal">NaN</span>, <span class="hljs-literal">Infinity</span>);
<span class="hljs-comment">// PACKED_DOUBLE_ELEMENTS</span></code></pre>
<p>如果您计划对整数数组执行大量操作，在初始化的时候请考虑规范化 <code>-0</code>，并且防止 <code>NaN</code> 以及 <code>Infinity</code>。这样数组就会保持 <code>PACKED_SMI_ELEMENTS</code>。</p>
<p>事实上，如果你对数组进行数学运算，可以考虑使用 <code>TypedArray</code>。每个数组都有专门的元素类型。</p>
<h3 id="articleHeader8">类数组对象 vs 数组</h3>
<p>JavaScript 中的某些对象 - 特别是在 DOM 中 - 虽然它们不是真正的数组，但是他们看起来像数组。可以自己创建类数组的对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arrayLike = {};
arrayLike[0] = 'a';
arrayLike[1] = 'b';
arrayLike[2] = 'c';
arrayLike.length = 3;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> arrayLike = {};
arrayLike[<span class="hljs-number">0</span>] = <span class="hljs-string">'a'</span>;
arrayLike[<span class="hljs-number">1</span>] = <span class="hljs-string">'b'</span>;
arrayLike[<span class="hljs-number">2</span>] = <span class="hljs-string">'c'</span>;
arrayLike.length = <span class="hljs-number">3</span>;</code></pre>
<p>该对象具有 length 并支持索引元素访问（就像数组！），但它的原型上缺少数组方法，如 <code>forEach</code>。尽管如此，仍然可以调用数组泛型：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.forEach.call(arrayLike, (value, index) => {
  console.log(`${ index }: ${ value }`);
});
// This logs '0: a', then '1: b', and finally '2: c'." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Array</span>.prototype.forEach.call(arrayLike, (value, index) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${ index }</span>: <span class="hljs-subst">${ value }</span>`</span>);
});
<span class="hljs-comment">// This logs '0: a', then '1: b', and finally '2: c'.</span></code></pre>
<p>这个代码工作原理如下，在类数组对象上调用数组内置的 <code>Array.prototype.forEach</code>。但是，这比在真正的数组中调用 <code>forEach</code> 慢，引擎数组的 <code>forEach</code> 在 V8 中是高度优化的。如果你打算在这个对象上多次使用数组内置函数，可以考虑先把它变成一个真正的数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const actualArray = Array.prototype.slice.call(arrayLike, 0);
actualArray.forEach((value, index) => {
  console.log(`${ index }: ${ value }`);
});
// This logs '0: a', then '1: b', and finally '2: c'." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> actualArray = <span class="hljs-built_in">Array</span>.prototype.slice.call(arrayLike, <span class="hljs-number">0</span>);
actualArray.forEach(<span class="hljs-function">(<span class="hljs-params">value, index</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${ index }</span>: <span class="hljs-subst">${ value }</span>`</span>);
});
<span class="hljs-comment">// This logs '0: a', then '1: b', and finally '2: c'.</span></code></pre>
<p>为了后续的优化，进行一次性转换的成本是值得的，特别是如果您计划在数组上执行大量操作。</p>
<p>例如，<code>arguments</code> 对象是类数组的对象。可以在其上调用数组内置函数，但是这样的操作将不会被完全优化，因为这些优化只针对真正的数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const logArgs = function() {
  Array.prototype.forEach.call(arguments, (value, index) => {
    console.log(`${ index }: ${ value }`);
  });
};
logArgs('a', 'b', 'c');
// This logs '0: a', then '1: b', and finally '2: c'." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> logArgs = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">Array</span>.prototype.forEach.call(<span class="hljs-built_in">arguments</span>, (value, index) =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${ index }</span>: <span class="hljs-subst">${ value }</span>`</span>);
  });
};
logArgs(<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>);
<span class="hljs-comment">// This logs '0: a', then '1: b', and finally '2: c'.</span></code></pre>
<p>ES2015 的 rest 参数在这里很有帮助。它们产生真正的数组，可以优雅的代替类似数组的对象 <code>arguments</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const logArgs = (...args) => {
  args.forEach((value, index) => {
    console.log(`${ index }: ${ value }`);
  });
};
logArgs('a', 'b', 'c');
// This logs '0: a', then '1: b', and finally '2: c'." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> logArgs = <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> {
  args.forEach(<span class="hljs-function">(<span class="hljs-params">value, index</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${ index }</span>: <span class="hljs-subst">${ value }</span>`</span>);
  });
};
logArgs(<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>);
<span class="hljs-comment">// This logs '0: a', then '1: b', and finally '2: c'.</span></code></pre>
<p>如今，没有理由直接使用对象 <code>arguments</code>。</p>
<p>通常，尽可能避免使用数组类对象，应该使用真正的数组。</p>
<h3 id="articleHeader9">避免多态</h3>
<p>如果您的代码需要处理包含多种不同元素类型的数组，则可能会比单个元素类型数组要慢，因为你的代码要对不同类型的数组元素进行多态操作。</p>
<p>考虑以下示例，其中使用了各种元素种类调用。（请注意，这不是本机 <code>Array.prototype.forEach</code>，它具有自己的一些优化，这些优化不同于本文中讨论的元素种类优化。）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const each = (array, callback) => {
  for (let index = 0; index < array.length; ++index) {
    const item = array[index];
    callback(item);
  }
};
const doSomething = (item) => console.log(item);

each([], () => {});

each(['a', 'b', 'c'], doSomething);
// `each` is called with `PACKED_ELEMENTS`. V8 uses an inline cache
// (or “IC”) to remember that `each` is called with this particular
// elements kind. V8 is optimistic and assumes that the
// `array.length` and `array[index]` accesses inside the `each`
// function are monomorphic (i.e. only ever receive a single kind
// of elements) until proven otherwise. For every future call to
// `each`, V8 checks if the elements kind is `PACKED_ELEMENTS`. If
// so, V8 can re-use the previously-generated code. If not, more work
// is needed.

each([1.1, 2.2, 3.3], doSomething);
// `each` is called with `PACKED_DOUBLE_ELEMENTS`. Because V8 has
// now seen different elements kinds passed to `each` in its IC, the
// `array.length` and `array[index]` accesses inside the `each`
// function get marked as polymorphic. V8 now needs an additional
// check every time `each` gets called: one for `PACKED_ELEMENTS`
// (like before), a new one for `PACKED_DOUBLE_ELEMENTS`, and one for
// any other elements kinds (like before). This incurs a performance
// hit.

each([1, 2, 3], doSomething);
// `each` is called with `PACKED_SMI_ELEMENTS`. This triggers another
// degree of polymorphism. There are now three different elements
// kinds in the IC for `each`. For every `each` call from now on, yet
// another elements kind check is needed to re-use the generated code
// for `PACKED_SMI_ELEMENTS`. This comes at a performance cost." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> each = <span class="hljs-function">(<span class="hljs-params">array, callback</span>) =&gt;</span> {
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> index = <span class="hljs-number">0</span>; index &lt; array.length; ++index) {
    <span class="hljs-keyword">const</span> item = array[index];
    callback(item);
  }
};
<span class="hljs-keyword">const</span> doSomething = <span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(item);

each([], () =&gt; {});

each([<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>], doSomething);
<span class="hljs-comment">// `each` is called with `PACKED_ELEMENTS`. V8 uses an inline cache</span>
<span class="hljs-comment">// (or “IC”) to remember that `each` is called with this particular</span>
<span class="hljs-comment">// elements kind. V8 is optimistic and assumes that the</span>
<span class="hljs-comment">// `array.length` and `array[index]` accesses inside the `each`</span>
<span class="hljs-comment">// function are monomorphic (i.e. only ever receive a single kind</span>
<span class="hljs-comment">// of elements) until proven otherwise. For every future call to</span>
<span class="hljs-comment">// `each`, V8 checks if the elements kind is `PACKED_ELEMENTS`. If</span>
<span class="hljs-comment">// so, V8 can re-use the previously-generated code. If not, more work</span>
<span class="hljs-comment">// is needed.</span>

each([<span class="hljs-number">1.1</span>, <span class="hljs-number">2.2</span>, <span class="hljs-number">3.3</span>], doSomething);
<span class="hljs-comment">// `each` is called with `PACKED_DOUBLE_ELEMENTS`. Because V8 has</span>
<span class="hljs-comment">// now seen different elements kinds passed to `each` in its IC, the</span>
<span class="hljs-comment">// `array.length` and `array[index]` accesses inside the `each`</span>
<span class="hljs-comment">// function get marked as polymorphic. V8 now needs an additional</span>
<span class="hljs-comment">// check every time `each` gets called: one for `PACKED_ELEMENTS`</span>
<span class="hljs-comment">// (like before), a new one for `PACKED_DOUBLE_ELEMENTS`, and one for</span>
<span class="hljs-comment">// any other elements kinds (like before). This incurs a performance</span>
<span class="hljs-comment">// hit.</span>

each([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], doSomething);
<span class="hljs-comment">// `each` is called with `PACKED_SMI_ELEMENTS`. This triggers another</span>
<span class="hljs-comment">// degree of polymorphism. There are now three different elements</span>
<span class="hljs-comment">// kinds in the IC for `each`. For every `each` call from now on, yet</span>
<span class="hljs-comment">// another elements kind check is needed to re-use the generated code</span>
<span class="hljs-comment">// for `PACKED_SMI_ELEMENTS`. This comes at a performance cost.</span></code></pre>
<p>内置方法（如 <code>Array.prototype.forEach</code>）可以更有效地处理这种多态性，因此在性能敏感的情况下考虑使用它们而不是用户库函数。</p>
<p>V8 中单态与多态的另一个例子涉及对象形状（object shape），也称为对象的隐藏类。要了解更多，请查看 <a href="http://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html" rel="nofollow noreferrer" target="_blank">Vyacheslav 的文章</a>。</p>
<h2 id="articleHeader10">调试元素种类</h2>
<p>找出一个给定的对象的“元素种类”，可以使用一个调试版本 d8（参见“<a href="https://github.com/v8/v8/wiki/Building-from-Source" rel="nofollow noreferrer" target="_blank">从源代码构建</a>”），并运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ out.gn/x64.debug/d8 --allow-natives-syntax" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code class="shell" style="word-break: break-word; white-space: initial;">$ <span class="hljs-keyword">out</span>.gn/x64.debug/d8 <span class="hljs-comment">--allow-natives-syntax</span></code></pre>
<p>这将打开 d8 REPL 中的特殊函数，如 <code>%DebugPrint(object)</code>。输出中的“元素”字段显示您传递给它的任何对象的“元素种类”。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="d8> const array = [1, 2, 3]; %DebugPrint(array);
DebugPrint: 0x1fbbad30fd71: [JSArray]
 - map = 0x10a6f8a038b1 [FastProperties]
 - prototype = 0x1212bb687ec1
 - elements = 0x1fbbad30fd19 <FixedArray[3]> [PACKED_SMI_ELEMENTS (COW)]
 - length = 3
 - properties = 0x219eb0702241 <FixedArray[0]> {
    #length: 0x219eb0764ac9 <AccessorInfo> (const accessor descriptor)
 }
 - elements= 0x1fbbad30fd19 <FixedArray[3]> {
           0: 1
           1: 2
           2: 3
 }
[…]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>d8&gt; const array = [1, 2, 3]; %DebugPrint(array);
DebugPrint: 0x1fbbad30fd71: [JSArray]
 -<span class="ruby"> map = <span class="hljs-number">0x10a6f8a038b1</span> [FastProperties]
</span> -<span class="ruby"> prototype = <span class="hljs-number">0x1212bb687ec1</span>
</span> -<span class="ruby"> elements = <span class="hljs-number">0x1fbbad30fd19</span> &lt;FixedArray[<span class="hljs-number">3</span>]&gt; [PACKED_SMI_ELEMENTS (COW)]
</span> -<span class="ruby"> length = <span class="hljs-number">3</span>
</span> -<span class="ruby"> properties = <span class="hljs-number">0x219eb0702241</span> &lt;FixedArray[<span class="hljs-number">0</span>]&gt; {
</span>    #length: 0x219eb0764ac9 &lt;AccessorInfo&gt; (const accessor descriptor)
 }
 -<span class="ruby"> elements= <span class="hljs-number">0x1fbbad30fd19</span> &lt;FixedArray[<span class="hljs-number">3</span>]&gt; {
</span>           0: 1
           1: 2
           2: 3
 }
[…]</code></pre>
<p>请注意，“COW” 表示写时复制，这是另一个内部优化。现在不要担心 - 这是另一个博文的主题！</p>
<p>调试版本中可用的另一个有用的标志是 <code>--trace-elements-transitions</code>。启用它让 V8 在任何元素发生类型转换时通知您。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cat my-script.js
const array = [1, 2, 3];
array[3] = 4.56;

$ out.gn/x64.debug/d8 --trace-elements-transitions my-script.js
elements transition [PACKED_SMI_ELEMENTS -> PACKED_DOUBLE_ELEMENTS] in ~+34 at x.js:2 for 0x1df87228c911 <JSArray[3]> from 0x1df87228c889 <FixedArray[3]> to 0x1df87228c941 <FixedDoubleArray[22]>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>$ cat my-script.js
const array = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
array[<span class="hljs-number">3</span>] = <span class="hljs-number">4.56</span>;

$ <span class="hljs-keyword">out</span>.gn/x64.<span class="hljs-keyword">debug</span>/d8 --trace-elements-transitions my-script.js
elements transition [PACKED_SMI_ELEMENTS -&gt; PACKED_DOUBLE_ELEMENTS] <span class="hljs-keyword">in</span> ~+<span class="hljs-number">34</span> at x.js:<span class="hljs-number">2</span> <span class="hljs-keyword">for</span> <span class="hljs-number">0</span>x1df87228c911 <span class="hljs-variable">&lt;JSArray[3]&gt;</span> <span class="hljs-keyword">from</span> <span class="hljs-number">0</span>x1df87228c889 <span class="hljs-variable">&lt;FixedArray[3]&gt;</span> <span class="hljs-keyword">to</span> <span class="hljs-number">0</span>x1df87228c941 <span class="hljs-variable">&lt;FixedDoubleArray[22]&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 在 V8 中的元素种类及性能优化

## 原文链接
[https://segmentfault.com/a/1190000011303679](https://segmentfault.com/a/1190000011303679)

