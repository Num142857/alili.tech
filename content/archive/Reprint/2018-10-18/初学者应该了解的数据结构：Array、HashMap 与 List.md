---
title: 初学者应该了解的数据结构：Array、HashMap 与 List
hidden: true
categories: reprint
slug: 6bceb83f
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p><img src="https://p0.ssl.qhimg.com/t019eeef36aa559bfc6.jpg" alt="Data Structures for Beginners: Arrays, HashMaps, and Lists"> </p>
<p>当开发程序时，我们（通常）需要在内存中存储数据。根据操作数据方式的不同，可能会选择不同的数据结构。有很多常用的数据结构，如：Array、Map、Set、List、Tree、Graph 等等。（然而）为程序选取合适的数据结构可能并不容易。因此，希望这篇文章能帮助你了解（不同数据结构的）表现，以求在工作中合理地使用它们。</p>
<p>本文主要聚焦于线性的数据结构，如：Array、Set、List、Sets、Stacks、Queues 等等。</p>
<hr>
<p>本篇是以下教程的一部分（译者注：如果大家觉得还不错，我会翻译整个系列的文章）:</p>
<p><strong>初学者应该了解的数据结构与算法（DSA）</strong></p>
<ol>
<li><a href="https://adrianmejia.com/blog/2018/04/04/how-you-can-change-the-world-learning-data-structures-algorithms-free-online-course-tutorial/">算法的时间复杂性与大 O 符号</a></li>
<li><a href="https://adrianmejia.com/blog/2018/04/05/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/">每个程序员应该知道的八种时间复杂度</a></li>
<li>初学者应该了解的数据结构：Array、HashMap 与 List  <strong>👈 即本文</strong></li>
<li><a href="https://adrianmejia.com/blog/2018/05/14/Data-Structures-for-Beginners-Graphs-Time-Complexity-tutorial/">初学者应该了解的数据结构： Graph</a></li>
<li>初学者应该了解的数据结构：Tree (<strong>敬请期待</strong>)</li>
<li><a href="https://adrianmejia.com/blog/2018/04/24/Analysis-of-Recursive-Algorithms/">附录 I：递归算法分析</a></li>
</ol>
<hr>
<h1>（操作）数据结构的时间复杂度</h1>
<p>下表是本文所讨论内容的概括。</p>
<blockquote>
<p>加个书签、收藏或分享本文，以便不时之需。</p>
</blockquote>
<p>* = 运行时分摊</p>
<table>
<thead>
<tr>
<th>数据结构</th>
<th>插入</th>
<th>访问</th>
<th>查找</th>
<th>删除</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Array</strong></td>
<td><em>O(n)</em></td>
<td><em>O(1)</em></td>
<td><em>O(n)</em></td>
<td><em>O(n)</em></td>
<td>插入最后位置复杂度为  <em>O(1)</em>。</td>
</tr>
<tr>
<td>(Hash)<strong>Map</strong></td>
<td><em>O(1)*</em></td>
<td><em>O(1)*</em></td>
<td><em>O(1)*</em></td>
<td><em>O(1)*</em></td>
<td>重新计算哈希会影响插入时间。</td>
</tr>
<tr>
<td><strong>Map</strong></td>
<td><em>O(log(n))</em></td>
<td>-</td>
<td><em>O(log(n))</em></td>
<td><em>O(log(n))</em></td>
<td>通过二叉搜索树实现</td>
</tr>
<tr>
<td><strong>Set</strong>（使用 HashMap）</td>
<td><em>O(1）*</em></td>
<td>-</td>
<td><em>O(1)*</em></td>
<td><em>O(1)*</em></td>
<td>由 HashMap 实现</td>
</tr>
<tr>
<td><strong>Set</strong> (使用 List)</td>
<td><em><a href="https://www.ecma-international.org/ecma-262/6.0/#sec-set.prototype.add">O(n)</a></em></td>
<td>-</td>
<td><em><a href="https://www.ecma-international.org/ecma-262/6.0/#sec-set.prototype.has">O(n)</a>]</em></td>
<td><em><a href="https://www.ecma-international.org/ecma-262/6.0/#sec-set.prototype.delete">O(n)</a></em></td>
<td>通过 List 实现</td>
</tr>
<tr>
<td><strong>Set</strong> (使用二叉搜索树)</td>
<td><em>O(log(n))</em></td>
<td>-</td>
<td><em>O(log(n))</em></td>
<td><em>O(log(n))</em></td>
<td>通过二叉搜索树实现</td>
</tr>
<tr>
<td><strong>Linked List</strong> (单向)</td>
<td><em>O(n)</em></td>
<td>-</td>
<td><em>O(n)</em></td>
<td><em>O(n)</em></td>
<td>在起始位置添加或删除元素，复杂度为  <em>O(1)</em></td>
</tr>
<tr>
<td><strong>Linked List</strong> (双向）</td>
<td><em>O(n)</em></td>
<td>-</td>
<td><em>O(n)</em></td>
<td><em>O(n)</em></td>
<td>在起始或结尾添加或删除元素，复杂度为  <em>O(1)</em>。然而在其他位置是  <em>O(n)</em>。</td>
</tr>
<tr>
<td><strong>Stack</strong> (由 Array 实现)</td>
<td><em>O(1)</em></td>
<td>-</td>
<td>-</td>
<td><em>O(1)]</em></td>
<td>插入与删除都遵循与后进先出（LIFO）</td>
</tr>
<tr>
<td><strong>Queue</strong> (简单地由 Array 实现)</td>
<td><em>O(n)</em></td>
<td>-</td>
<td>-</td>
<td><em>O(1)</em></td>
<td>插入（Array.shift）操作的复杂度是 <em>O(n)</em></td>
</tr>
<tr>
<td><strong>Queue</strong> (由 Array 实现，但进行了改进)</td>
<td><em>O(1)*</em></td>
<td>-</td>
<td>-</td>
<td><em>O(1)</em></td>
<td>插入操作的最差情况复杂度是 <em>O(n)</em>。然而分摊后是 <em>O(1)</em></td>
</tr>
<tr>
<td><strong>Queue</strong> (由 List 实现)</td>
<td><em>O(1)</em></td>
<td>-</td>
<td>-</td>
<td><em>O(1)</em></td>
<td>使用双向链表</td>
</tr>
</tbody>
</table>
<p>注意： <strong>二叉搜索树</strong> 与其他树结构、图结构，将在另一篇文章中讨论。 </p>
<h1>原始数据类型</h1>
<p>原始数据类型是构成数据结构最基础的元素。下面列举出一些原始原始数据类型：</p>
<ul>
<li>整数，如：1, 2, 3, …</li>
<li>字符，如：a, b, "1", "*"</li>
<li>布尔值， true 与 false.</li>
<li>浮点数 ，如：3.14159, 1483e-2.</li>
</ul>
<h1>Array</h1>
<p>数组可由零个或多个元素组成。由于数组易于使用且检索性能优越，它是最常用的数据结构之一。</p>
<p>你可以将数组想象成一个抽屉，可以将数据存到匣子中。</p>
<p><strong>数组就像是将东西存到匣子中的抽屉</strong> </p>
<p><img src="https://p0.ssl.qhimg.com/t01065921bb094fc5ae.jpg" alt="" title="Array is like a drawer that stores things on bins"></p>
<p>当你想查找某个元素时，你可以直接打开对应编号的匣子（时间复杂度为 <em>O(1)</em>）。然而，如果你忘记了匣子里存着什么，就必须逐个打开所有的匣子（时间复杂度为 <em>O(n)</em>），直到找到所需的东西。数组也是如此。</p>
<p>根据编程语言的不同，数组存在一些差异。对于 JavaScript 和 Ruby 等动态语言而言，数组可以包含不同的数据类型：数字，字符串，对象甚至函数。而在 Java 、 C 、C ++ 之类的强类型语言中，你必须在使用数组之前，定好它的长度与数据类型。JavaScript 会在需要时自动增加数组的长度。</p>
<h2>Array 的内置方法</h2>
<p>根据编程序言的不同，数组（方法）的实现稍有不同。</p>
<p>比如在 JavaScript 中，我们可以使用 <code>unshift</code> 与 <code>push</code> 添加元素到数组的头或尾，同时也可以使用 <code>shift</code> 与 <code>pop</code> 删除数组的首个或最后一个元素。让我们来定义一些本文用到的数组常用方法。</p>
<p><strong>常用的 JS 数组内置函数</strong></p>
<table>
<thead>
<tr>
<th>函数</th>
<th>复杂度</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push">array.<strong>push</strong>(element1[, …[, elementN]])</a></td>
<td><em>O(1)</em></td>
<td>将一个或多个元素添加到数组的末尾</td>
</tr>
<tr>
<td><a href="http://devdocs.io/javascript/global_objects/array/pop">array.<strong>pop</strong>()</a></td>
<td><em>O(1)</em></td>
<td>移除数组末尾的元素</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift">array.<strong>shift</strong>()</a></td>
<td><em>O(n)</em></td>
<td>移除数组开头的元素</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift">array.<strong>unshift</strong>(element1[, …[, elementN]])</a></td>
<td><em>O(n)</em></td>
<td>将一个或多个元素添加到数组的开头</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice">array.<strong>slice</strong>([beginning[, end]])</a></td>
<td><em>O(n)</em></td>
<td>返回浅拷贝原数组从 <code>beginning</code> 到 <code>end</code>（不包括 <code>end</code>）部分组成的新数组</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice">array.<strong>splice</strong>(start[, deleteCount[, item1[,…]]])</a></td>
<td><em>O(n)</em></td>
<td>改变 (插入或删除) 数组</td>
</tr>
</tbody>
</table>
<h2>向数组插入元素</h2>
<p>将元素插入到数组有很多方式。你可以将新数据添加到数组末尾，也可以添加到数组开头。</p>
<p>先看看如何添加到末尾：</p>
<pre><code class="hljs cpp"><span class="hljs-function">function <span class="hljs-title">insertToTail</span><span class="hljs-params">(<span class="hljs-built_in">array</span>, element)</span> </span>{
  <span class="hljs-built_in">array</span>.push(element);
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">array</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-built_in">array</span> = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
console.<span class="hljs-built_in">log</span>(insertToTail(<span class="hljs-built_in">array</span>, <span class="hljs-number">4</span>)); <span class="hljs-comment">// =&gt; [ 1, 2, 3, 4 ]</span>
</code></pre><p>根据<a href="https://tc39.github.io/ecma262/#sec-array.prototype.push">规范</a>，<code>push</code> 操作只是将一个新元素添加到数组的末尾。因此，</p>
<blockquote>
<p><code>Array.push</code> 的时间复杂度度是 <em>O(1)</em>。</p>
</blockquote>
<p>现在看看如添加到开头：</p>
<pre><code class="hljs cpp"><span class="hljs-function">function <span class="hljs-title">insertToHead</span><span class="hljs-params">(<span class="hljs-built_in">array</span>, element)</span> </span>{
  <span class="hljs-built_in">array</span>.unshift(element);
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">array</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-built_in">array</span> = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
console.<span class="hljs-built_in">log</span>(insertToHead(<span class="hljs-built_in">array</span>, <span class="hljs-number">0</span>));<span class="hljs-comment">// =&gt; [ 0, 1, 2, 3, ]</span>
</code></pre><p>你觉得添加元素到数组开头的函数，时间复杂度是什么呢？看起来和上面（<code>push</code>）差不多，除了调用的方法是 <code>unshift</code> 而不是 <code>push</code>。但这有个问题，<a href="https://tc39.github.io/ecma262/#sec-array.prototype.unshift"><code>unshift</code></a> 是通过将数组的每一项移到下一项，腾出首项的空间来容纳新添加的元素。所以它是遍历了一次数组的。</p>
<blockquote>
<p><code>Array.unshift</code> 的时间复杂度度是 <em>O(n)</em>。</p>
</blockquote>
<h2>访问数组中的元素</h2>
<p>如果你知道待查找元素在数组中的索引，那你可以通过以下方法直接访问该元素：</p>
<pre><code class="hljs php"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">access</span><span class="hljs-params">(array, index)</span> </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">array</span>[index];
}

<span class="hljs-keyword">const</span> <span class="hljs-keyword">array</span> = [<span class="hljs-number">1</span>, <span class="hljs-string">'word'</span>, <span class="hljs-number">3.14</span>, { a: <span class="hljs-number">1</span> }];
access(<span class="hljs-keyword">array</span>, <span class="hljs-number">0</span>);<span class="hljs-comment">// =&gt; 1</span>
access(<span class="hljs-keyword">array</span>, <span class="hljs-number">3</span>);<span class="hljs-comment">// =&gt; {a: 1}</span>
</code></pre><p>正如上面你所看到的的代码一样，访问数组中的元素耗时是恒定的：</p>
<blockquote>
<p>访问数组中元素的时间复杂度是  <em>O(1)</em>。</p>
</blockquote>
<p><em>注意：通过索引修改数组的值所花费的时间也是恒定的。</em></p>
<h2>在数组中查找元素</h2>
<p>如果你想查找某个元素但不知道对应的索引时，那只能通过遍历数组的每个元素，直到找到为止。</p>
<pre><code class="hljs zephir"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">search</span><span class="hljs-params">(array, element)</span> </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> index = <span class="hljs-number">0</span>;
       index &lt; <span class="hljs-keyword">array</span>.length;
       index++) {
    <span class="hljs-keyword">if</span> (element === <span class="hljs-keyword">array</span>[index]) {
      <span class="hljs-keyword">return</span> index;
    }
  }
}

<span class="hljs-keyword">const</span> <span class="hljs-keyword">array</span> = [<span class="hljs-number">1</span>, <span class="hljs-string">'word'</span>, <span class="hljs-number">3.14</span>, { a: <span class="hljs-number">1</span> }];
console.log(search(<span class="hljs-keyword">array</span>, <span class="hljs-string">'word'</span>));<span class="hljs-comment">// =&gt; 1</span>
console.log(search(<span class="hljs-keyword">array</span>, <span class="hljs-number">3.14</span>));<span class="hljs-comment">// =&gt; 2</span>
</code></pre><p>鉴于使用了 <code>for</code> 循环，那么：</p>
<blockquote>
<p>在数组中查找元素的时间复杂度是  <em>O(n)</em></p>
</blockquote>
<h2>在数组中删除元素</h2>
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
<p>先一起思考下这两种情况：</p>
<ol>
<li>从数组的末尾删除元素所需时间是恒定的，也就是  <em>O(1)</em>。</li>
<li>然而，无论是从数组的开头或是中间位置删除元素，你都需要调整（删除元素后面的）元素位置。因此复杂度为 <em>O(n)</em>。</li>
</ol>
<p>说多无谓，看代码好了：</p>
<pre><code class="hljs cpp"><span class="hljs-function">function <span class="hljs-title">remove</span><span class="hljs-params">(<span class="hljs-built_in">array</span>, element)</span> </span>{
  <span class="hljs-keyword">const</span> index = search(<span class="hljs-built_in">array</span>, element);
  <span class="hljs-built_in">array</span>.splice(index, <span class="hljs-number">1</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">array</span>;
}

<span class="hljs-keyword">const</span> array1 = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
console.<span class="hljs-built_in">log</span>(remove(array1, <span class="hljs-number">1</span>));<span class="hljs-comment">// =&gt; [ 0, 2, 3 ]</span>
</code></pre><p>我们使用了上面定义的 <code>search</code> 函数来查找元素的的索引，复杂度为 <em>O(n)</em>。然后使用<a href="https://tc39.github.io/ecma262/#sec-array.prototype.splice">JS 内置的 <code>splice</code></a> 方法，它的复杂度也是 <em>O(n)</em>。那（删除函数）总的时间复杂度不是 <em>O(2n)</em> 吗?记住，（对于时间复杂度而言，）我们并不关心常量。</p>
<p>对于上面列举的两种情况，考虑最坏的情况：</p>
<blockquote>
<p>在数组中删除某项元素的时间复杂度是  <em>O(n)</em>。</p>
</blockquote>
<h2>数组方法的时间复杂度</h2>
<p>在下表中，小结了数组（方法）的时间复杂度：</p>
<p><strong>数组方法的时间复杂度</strong></p>
<table>
<thead>
<tr>
<th>操作方法</th>
<th>最坏情况</th>
</tr>
</thead>
<tbody>
<tr>
<td>访问 (<code>Array.[]</code>)</td>
<td><em>O(1)</em></td>
</tr>
<tr>
<td>添加新元素至开头 (<code>Array.unshift</code>)</td>
<td><em>O(n)</em></td>
</tr>
<tr>
<td>添加新元素至末尾 (<code>Array.push</code>)</td>
<td><em>O(1)</em></td>
</tr>
<tr>
<td>查找 (通过值而非索引)</td>
<td><em>O(n)</em></td>
</tr>
<tr>
<td>删除 (<code>Array.splice</code>)</td>
<td><em>O(n)</em></td>
</tr>
</tbody>
</table>
<h1>HashMaps</h1>
<p>HashMap有很多名字，如 HashTableHashMap、Map、Dictionary、Associative Array 等。概念上它们都是一致的，实现上稍有不同。</p>
<blockquote>
<p>哈希表是一种将键  <strong>映射到</strong>  值的数据结构。</p>
</blockquote>
<p>回想一下关于抽屉的比喻，现在匣子有了标签，不再是按数字顺序了。</p>
<p><strong>HashMap 也和抽屉一样存储东西，通过不同标识来区分不同匣子。</strong></p>
<p><img src="https://p0.ssl.qhimg.com/t0163970c4b4cfa192e.jpg" alt="" title="HashMap is like a drawer that stores things on bins and label them"></p>
<p>此例中，如果你要找一个玩具，你不需要依次打开第一个、第二个和第三个匣子来查看玩具是否在内。直接代开被标识为“玩具”的匣子即可。这是一个巨大的进步，查找元素的时间复杂度从 <em>O(n)</em> 降为  <em>O(1)</em> 了。</p>
<p>数字是数组的索引，而标识则作为 HashMap 存储数据的键。HashMap 内部通过 <em>哈希函数</em> 将键（也就是标识）转化为索引。</p>
<p>至少有两种方式可以实现 hashmap：</p>
<ol>
<li><strong>数组</strong>：通过哈希函数将键映射为数组的索引。（查找）最差情况： O(n)，平均： O(1)。</li>
<li><strong>二叉搜索树</strong>: 使用自平衡二叉搜索树查找值（另外的文章会详细介绍）。 （查找）最差情况： <em>O(log n)</em>，平均：<em>O(log n)</em>。</li>
</ol>
<p>我们会介绍树与二叉搜索树，现在先不用担心太多。实现 Map 最常用的方式是使用 <strong>数组</strong>与哈希转换函数。让我们（通过数组）来实现它吧</p>
<p><strong>通过数组实现 HashMap</strong> </p>
<p><img src="https://p0.ssl.qhimg.com/t011f6faa6e24b662ce.jpg" alt="" title="HashMap: hash function translates keys into bucket (array) indexes"></p>
<p>正如上图所示，每个键都被转换为一个 <strong>hash code</strong>。由于数组的大小是有限的（如此例中是10），（如发生冲突，）我们必须使用模函数找到对应的桶（译者注：桶指的是数组的项），再循环遍历该桶（来寻找待查询的值）。每个桶内，我们存储的是一组组的键值对，如果桶内存储了多个键值对，将采用集合来存储它们。</p>
<p>我们将讲述 HashMap 的组成，让我们先从<strong>哈希函数</strong>开始吧。</p>
<h2>哈希函数</h2>
<p>实现 HashMap 的第一步是写出一个哈希函数。这个函数会将键映射为对应（索引的）值。</p>
<blockquote>
<p><strong>完美的哈希函数</strong> 是为每一个不同的键映射为不同的索引。</p>
</blockquote>
<p>借助理想的哈希函数，可以实现访问与查找在恒定时间内完成。然而，完美的哈希函数在实践中是难以实现的。你很可能会碰到两个不同的键被映射为同一索引的情况，也就是 _冲突_。</p>
<p>当使用类似数组之类的数据结构作为 HashMap 的实现时，冲突是难以避免的。因此，解决冲突的其中一种方式是在同一个桶中存储多个值。当我们试图访问某个键对应的值时，如果在对应的桶中发现多组键值对，则需要遍历它们（以寻找该键对应的值），时间复杂度为 <em>O(n)</em>。然而，在大多数（HashMap）的实现中， HashMap 会动态调整数组的长度以免冲突发生过多。因此我们可以说<strong>分摊后</strong>的查找时间为 <em>O(1)</em>。本文中我们将通过一个例子，讲述分摊的含义。</p>
<h2>HashMap 的简单实现</h2>
<p>一个简单（但糟糕）的哈希函数可以是这样的：</p>
<pre><code class="hljs processing">class NaiveHashMap {

  constructor(initialCapacity = <span class="hljs-number">2</span>) {
    <span class="hljs-keyword">this</span>.buckets = <span class="hljs-keyword">new</span> <span class="hljs-keyword">Array</span>(initialCapacity);
  }

  <span class="hljs-built_in">set</span>(<span class="hljs-built_in">key</span>, value) {
    <span class="hljs-keyword">const</span> index = <span class="hljs-keyword">this</span>.getIndex(<span class="hljs-built_in">key</span>);
    <span class="hljs-keyword">this</span>.buckets[index] = value;
  }

  <span class="hljs-built_in">get</span>(<span class="hljs-built_in">key</span>) {
    <span class="hljs-keyword">const</span> index = <span class="hljs-keyword">this</span>.getIndex(<span class="hljs-built_in">key</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.buckets[index];
  }

  hash(<span class="hljs-built_in">key</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">key</span>.toString().length;
  }

  getIndex(<span class="hljs-built_in">key</span>) {
    <span class="hljs-keyword">const</span> indexHash = <span class="hljs-keyword">this</span>.hash(<span class="hljs-built_in">key</span>);
    <span class="hljs-keyword">const</span> index = indexHash % <span class="hljs-keyword">this</span>.buckets.length;
    <span class="hljs-keyword">return</span> index;
  }
}
</code></pre><p><a href="https://github.com/amejiarosario/algorithms.js/blob/master/lib/data-structures/hash-maps/hash-map-1.js">完整代码</a></p>
<p>我们直接使用桶而不是抽屉与匣子，相信你能明白喻义的意思 :)</p>
<p>HashMap 的初始容量（译者注：容量指的是用于存储数据的数组长度，即桶的数量）是2（两个桶）。当我们往里面存储多个元素时，通过求余 <code>%</code> 计算出该键应存入桶的编号（，并将数据存入该桶中）。</p>
<p>留意代码的第18行（即 <code>return key.toString().length;</code>）。之后我们会对此进行一点讨论。现在先让我们使用一下这个新的 HashMap 吧。</p>
<pre><code class="hljs processing"><span class="hljs-comment">// Usage:</span>
<span class="hljs-keyword">const</span> <span class="hljs-keyword">assert</span> = require(<span class="hljs-string">'assert'</span>);
<span class="hljs-keyword">const</span> hashMap = <span class="hljs-keyword">new</span> NaiveHashMap();
hashMap.<span class="hljs-built_in">set</span>(<span class="hljs-string">'cat'</span>, <span class="hljs-number">2</span>);
hashMap.<span class="hljs-built_in">set</span>(<span class="hljs-string">'rat'</span>, <span class="hljs-number">7</span>);
hashMap.<span class="hljs-built_in">set</span>(<span class="hljs-string">'dog'</span>, <span class="hljs-number">1</span>);
hashMap.<span class="hljs-built_in">set</span>(<span class="hljs-string">'art'</span>, <span class="hljs-number">8</span>);
console.<span class="hljs-built_in">log</span>(hashMap.buckets);
<span class="hljs-comment">/*
  bucket #0: &lt;1 empty item&gt;,
  bucket #1: 8
*/</span>
<span class="hljs-keyword">assert</span>.equal(hashMap.<span class="hljs-built_in">get</span>(<span class="hljs-string">'art'</span>), <span class="hljs-number">8</span>); <span class="hljs-comment">// this one is ok</span>
<span class="hljs-keyword">assert</span>.equal(hashMap.<span class="hljs-built_in">get</span>(<span class="hljs-string">'cat'</span>), <span class="hljs-number">8</span>); <span class="hljs-comment">// got overwritten by art 😱</span>
<span class="hljs-keyword">assert</span>.equal(hashMap.<span class="hljs-built_in">get</span>(<span class="hljs-string">'rat'</span>), <span class="hljs-number">8</span>); <span class="hljs-comment">// got overwritten by art 😱</span>
<span class="hljs-keyword">assert</span>.equal(hashMap.<span class="hljs-built_in">get</span>(<span class="hljs-string">'dog'</span>), <span class="hljs-number">8</span>); <span class="hljs-comment">// got overwritten by art 😱</span>
</code></pre><p>这个 HashMap 允许我们通过 <code>set</code> 方法设置一组键值对，通过往 <code>get</code> 方法传入一个键来获取对应的值。其中的关键是哈希函数，当我们存入多组键值时，看看这 HashMap 的表现。</p>
<p>你能说出这个简单实现的 HashMap 存在的问题吗？</p>
<p><strong>1) Hash function</strong> 转换出太多相同的索引。如：</p>
<pre><code class="hljs stylus"><span class="hljs-function"><span class="hljs-title">hash</span><span class="hljs-params">(<span class="hljs-string">'cat'</span>)</span></span> <span class="hljs-comment">// 3</span>
<span class="hljs-function"><span class="hljs-title">hash</span><span class="hljs-params">(<span class="hljs-string">'dog'</span>)</span></span> <span class="hljs-comment">// 3</span>
</code></pre><p>这会产生非常多的冲突。</p>
<p><strong>2)</strong> 完全不处理<strong>冲突</strong>的情况。<code>cat</code> 与 <code>dog</code> 会重写彼此在 HashMap 中的值（它们均在桶 #1 中）。</p>
<p><strong>3 数组长度</strong>。 即使我们有一个更好的哈希函数，由于数组的长度是2，少于存入元素的数量，还是会产生很多冲突。我们希望 HashMap 的初始容量大于我们存入数据的数量。</p>
<h2>改进哈希函数</h2>
<blockquote>
<p>HashMap 的主要目标是将数组查找与访问的时间复杂度，从  <em>O(n)</em>  降至 <em>O(1)</em>。</p>
</blockquote>
<p>为此，我们需要：</p>
<ol>
<li>一个合适的哈希函数，尽可能地减少冲突。</li>
<li>一个长度足够大的数组用于保存数据。</li>
</ol>
<p>让我们重新设计哈希函数，不再采用字符串的长度为 hash code，取而代之是使用字符串中每个字符的<a href="https://simple.wikipedia.org/wiki/ASCII">ascii 码</a>的总和为 hash code。</p>
<pre><code class="hljs glsl">hash(key) {
  let hashValue = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">const</span> stringKey = key.toString();
  <span class="hljs-keyword">for</span> (let <span class="hljs-keyword">index</span> = <span class="hljs-number">0</span>; <span class="hljs-keyword">index</span> &lt; stringKey.<span class="hljs-built_in">length</span>; <span class="hljs-keyword">index</span>++) {
    <span class="hljs-keyword">const</span> charCode = stringKey.charCodeAt(<span class="hljs-keyword">index</span>);
    hashValue += charCode;
  }
  <span class="hljs-keyword">return</span> hashValue;
}
</code></pre><p>再试一次：</p>
<pre><code class="hljs stylus"><span class="hljs-function"><span class="hljs-title">hash</span><span class="hljs-params">(<span class="hljs-string">'cat'</span>)</span></span> <span class="hljs-comment">// 312  (c=99 + a=97 + t=116)</span>
<span class="hljs-function"><span class="hljs-title">hash</span><span class="hljs-params">(<span class="hljs-string">'dog'</span>)</span></span> <span class="hljs-comment">// 314 (d=100 + o=111 + g=103)</span>
</code></pre><p>这函数比之前的要好！这是因为相同长度的单词由不一样的字母组成，因而 ascii 码的总和不一样。</p>
<p>然而，仍然有问题！单词 rat 与 art 转换后都是327，产生<strong>冲突</strong>了！ 💥</p>
<p>可以通过根据字符位置左移它的 ascii 码来解决：</p>
<pre><code class="hljs glsl">hash(key) {
  let hashValue = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">const</span> stringKey = `${key}`;
  <span class="hljs-keyword">for</span> (let <span class="hljs-keyword">index</span> = <span class="hljs-number">0</span>; <span class="hljs-keyword">index</span> &lt; stringKey.<span class="hljs-built_in">length</span>; <span class="hljs-keyword">index</span>++) {
    <span class="hljs-keyword">const</span> charCode = stringKey.charCodeAt(<span class="hljs-keyword">index</span>);
    hashValue += charCode &lt;&lt; (<span class="hljs-keyword">index</span> * <span class="hljs-number">8</span>);
  }
  <span class="hljs-keyword">return</span> hashValue;
}
</code></pre><p>现在继续试验，下面列举出了十六进制的数字，这样可以方便我们观察位移。</p>
<pre><code class="hljs less"><span class="hljs-comment">// r = 114 or 0x72; a = 97 or 0x61; t = 116 or 0x74</span>

<span class="hljs-selector-tag">hash</span>(<span class="hljs-string">'rat'</span>); <span class="hljs-comment">// 7,627,122 (r: 114 * 1 + a: 97 * 256 + t: 116 * 65,536) or in hex: 0x726174 (r: 0x72 + a: 0x6100 + t: 0x740000)</span>

<span class="hljs-selector-tag">hash</span>(<span class="hljs-string">'art'</span>); <span class="hljs-comment">// 7,631,457 or 0x617274</span>
</code></pre><p>然而，以下两种类型有何不同呢？</p>
<pre><code class="hljs less"><span class="hljs-selector-tag">hash</span>(<span class="hljs-number">1</span>); <span class="hljs-comment">// 49</span>
<span class="hljs-selector-tag">hash</span>(<span class="hljs-string">'1'</span>); <span class="hljs-comment">// 49</span>
<span class="hljs-selector-tag">hash</span>(<span class="hljs-string">'1,2,3'</span>); <span class="hljs-comment">// 741485668</span>
<span class="hljs-selector-tag">hash</span>([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]); <span class="hljs-comment">// 741485668</span>
<span class="hljs-selector-tag">hash</span>(<span class="hljs-string">'undefined'</span>) <span class="hljs-comment">// 3402815551</span>
<span class="hljs-selector-tag">hash</span>(undefined) <span class="hljs-comment">// 3402815551</span>
</code></pre><p>天啊，仍然有问题！！不同的数据类型不应该返回相同的 hash code！</p>
<p>该如何解决呢？</p>
<p>其中一种方式是在哈希函数中，将数据的类型作为转换 hash code 的一部分。</p>
<pre><code class="hljs glsl">hash(key) {
  let hashValue = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">const</span> stringTypeKey = `${key}${typeof key}`;
  <span class="hljs-keyword">for</span> (let <span class="hljs-keyword">index</span> = <span class="hljs-number">0</span>; <span class="hljs-keyword">index</span> &lt; stringTypeKey.<span class="hljs-built_in">length</span>; <span class="hljs-keyword">index</span>++) {
    <span class="hljs-keyword">const</span> charCode = stringTypeKey.charCodeAt(<span class="hljs-keyword">index</span>);
    hashValue += charCode &lt;&lt; (<span class="hljs-keyword">index</span> * <span class="hljs-number">8</span>);
  }
  <span class="hljs-keyword">return</span> hashValue;
}
</code></pre><p>让我们让我们再试一次：</p>
<pre><code class="hljs javascript"><span class="hljs-built_in">console</span>.log(hash(<span class="hljs-number">1</span>)); <span class="hljs-comment">// 1843909523</span>
<span class="hljs-built_in">console</span>.log(hash(<span class="hljs-string">'1'</span>)); <span class="hljs-comment">// 1927012762</span>
<span class="hljs-built_in">console</span>.log(hash(<span class="hljs-string">'1,2,3'</span>)); <span class="hljs-comment">// 2668498381</span>
<span class="hljs-built_in">console</span>.log(hash([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>])); <span class="hljs-comment">// 2533949129</span>
<span class="hljs-built_in">console</span>.log(hash(<span class="hljs-string">'undefined'</span>)); <span class="hljs-comment">// 5329828264</span>
<span class="hljs-built_in">console</span>.log(hash(<span class="hljs-literal">undefined</span>)); <span class="hljs-comment">// 6940203017</span>
</code></pre><p>Yay!!! 🎉 我们终于有了更好的哈希函数！</p>
<p>同时，我们可以改变 HashMap 的原始容量以减少冲突，让我们在下一节中优化 HashMap。</p>
<h2>更完善的 HashMap 实现</h2>
<p>通过优化好的哈希函数，HashMap 可以表现得更好。</p>
<p>尽管冲突仍可能发生，但通过一些方式可以很好地处理它们。</p>
<p>对于我们的 HashMap，希望有以下改进：</p>
<ul>
<li><strong>哈希函数</strong>， 检查类型与计算各字符（ascii 码的总和）以减少冲突的发生。</li>
<li><strong>处理冲突</strong>，通过将值添加到集合中来解决这问题，同时需要一个计数器追踪冲突的数量。 </li>
</ul>
<p>更完善 HashMap 实现<a href="https://github.com/amejiarosario/algorithms.js/blob/master/lib/data-structures/hash-maps/hash-map-2.js">完整代码</a></p>
<pre><code class="hljs processing">class DecentHashMap {
  constructor(initialCapacity = <span class="hljs-number">2</span>) {
    <span class="hljs-keyword">this</span>.buckets = <span class="hljs-keyword">new</span> <span class="hljs-keyword">Array</span>(initialCapacity);
    <span class="hljs-keyword">this</span>.collisions = <span class="hljs-number">0</span>;
  }
  <span class="hljs-built_in">set</span>(<span class="hljs-built_in">key</span>, value) {
    <span class="hljs-keyword">const</span> bucketIndex = <span class="hljs-keyword">this</span>.getIndex(<span class="hljs-built_in">key</span>);
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.buckets[bucketIndex]) {
      <span class="hljs-keyword">this</span>.buckets[bucketIndex].push({<span class="hljs-built_in">key</span>, value});
      <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.buckets[bucketIndex].length &gt; <span class="hljs-number">1</span>) { <span class="hljs-keyword">this</span>.collisions++; }
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>.buckets[bucketIndex] = [{<span class="hljs-built_in">key</span>, value}];
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }
  <span class="hljs-built_in">get</span>(<span class="hljs-built_in">key</span>) {
    <span class="hljs-keyword">const</span> bucketIndex = <span class="hljs-keyword">this</span>.getIndex(<span class="hljs-built_in">key</span>);
    <span class="hljs-keyword">for</span> (let arrayIndex = <span class="hljs-number">0</span>; arrayIndex &lt; <span class="hljs-keyword">this</span>.buckets[bucketIndex].length; arrayIndex++) {
      <span class="hljs-keyword">const</span> entry = <span class="hljs-keyword">this</span>.buckets[bucketIndex][arrayIndex];
      <span class="hljs-keyword">if</span>(entry.<span class="hljs-built_in">key</span> === <span class="hljs-built_in">key</span>) {
        <span class="hljs-keyword">return</span> entry.value
      }
    }
  }
  hash(<span class="hljs-built_in">key</span>) {
    let hashValue = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">const</span> stringTypeKey = `${<span class="hljs-built_in">key</span>}${typeof <span class="hljs-built_in">key</span>}`;
    <span class="hljs-keyword">for</span> (let index = <span class="hljs-number">0</span>; index &lt; stringTypeKey.length; index++) {
      <span class="hljs-keyword">const</span> charCode = stringTypeKey.charCodeAt(index);
      hashValue += charCode &lt;&lt; (index * <span class="hljs-number">8</span>);
    }
    <span class="hljs-keyword">return</span> hashValue;
  }
  getIndex(<span class="hljs-built_in">key</span>) {
    <span class="hljs-keyword">const</span> indexHash = <span class="hljs-keyword">this</span>.hash(<span class="hljs-built_in">key</span>);
    <span class="hljs-keyword">const</span> index = indexHash % <span class="hljs-keyword">this</span>.buckets.length;
    <span class="hljs-keyword">return</span> index;
  }
}
</code></pre><p>看看这个 HashMap 表现如何：</p>
<pre><code class="hljs processing"><span class="hljs-comment">// Usage:</span>
<span class="hljs-keyword">const</span> <span class="hljs-keyword">assert</span> = require(<span class="hljs-string">'assert'</span>);
<span class="hljs-keyword">const</span> hashMap = <span class="hljs-keyword">new</span> DecentHashMap();
hashMap.<span class="hljs-built_in">set</span>(<span class="hljs-string">'cat'</span>, <span class="hljs-number">2</span>);
hashMap.<span class="hljs-built_in">set</span>(<span class="hljs-string">'rat'</span>, <span class="hljs-number">7</span>);
hashMap.<span class="hljs-built_in">set</span>(<span class="hljs-string">'dog'</span>, <span class="hljs-number">1</span>);
hashMap.<span class="hljs-built_in">set</span>(<span class="hljs-string">'art'</span>, <span class="hljs-number">8</span>);
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'collisions: '</span>, hashMap.collisions); <span class="hljs-comment">// 2</span>
console.<span class="hljs-built_in">log</span>(hashMap.buckets);
<span class="hljs-comment">/*
  bucket #0: [ { key: 'cat', value: 2 }, { key: 'art', value: 8 } ]
  bucket #1: [ { key: 'rat', value: 7 }, { key: 'dog', value: 1 } ]
*/</span>
<span class="hljs-keyword">assert</span>.equal(hashMap.<span class="hljs-built_in">get</span>(<span class="hljs-string">'art'</span>), <span class="hljs-number">8</span>); <span class="hljs-comment">// this one is ok</span>
<span class="hljs-keyword">assert</span>.equal(hashMap.<span class="hljs-built_in">get</span>(<span class="hljs-string">'cat'</span>), <span class="hljs-number">2</span>); <span class="hljs-comment">// Good. Didn't got overwritten by art</span>
<span class="hljs-keyword">assert</span>.equal(hashMap.<span class="hljs-built_in">get</span>(<span class="hljs-string">'rat'</span>), <span class="hljs-number">7</span>); <span class="hljs-comment">// Good. Didn't got overwritten by art</span>
<span class="hljs-keyword">assert</span>.equal(hashMap.<span class="hljs-built_in">get</span>(<span class="hljs-string">'dog'</span>), <span class="hljs-number">1</span>); <span class="hljs-comment">// Good. Didn't got overwritten by art</span>
</code></pre><p>完善后的 HashMap 很好地完成了工作，但仍然有一些问题。使用改良后的哈希函数不容易产生重复的值，这非常好。然而，在桶#0与桶#1中都有两个值。这是为什么呢？？</p>
<p>由于 HashMap 的容量是2，尽管算出来的 hash code 是不一样的，当求余后算出所需放进桶的编号时，结果不是桶#0就是桶#1。</p>
<pre><code class="hljs lsl">hash('cat') =&gt; <span class="hljs-number">3789411390</span>; bucketIndex =&gt; <span class="hljs-number">3789411390</span> % <span class="hljs-number">2</span> = <span class="hljs-number">0</span>
hash('art') =&gt; <span class="hljs-number">3789415740</span>; bucketIndex =&gt; <span class="hljs-number">3789415740</span> % <span class="hljs-number">2</span> = <span class="hljs-number">0</span>
hash('dog') =&gt; <span class="hljs-number">3788563007</span>; bucketIndex =&gt; <span class="hljs-number">3788563007</span> % <span class="hljs-number">2</span> = <span class="hljs-number">1</span>
hash('rat') =&gt; <span class="hljs-number">3789411405</span>; bucketIndex =&gt; <span class="hljs-number">3789411405</span> % <span class="hljs-number">2</span> = <span class="hljs-number">1</span>
</code></pre><p>很自然地想到，可以通过增加 HashMap 的原始容量来解决这个问题，但原始容量应该是多少呢？先来看看容量是如何影响 HashMap 的表现的。</p>
<p>如果初始容量是1，那么所有的键值对都会被存入同一个桶，即桶#0。查找操作并不比纯粹用数组存储数据的时间复杂度简单，它们都是 <em>O(n)</em>。</p>
<p>而假设将初始容量定为10：</p>
<pre><code class="hljs processing"><span class="hljs-keyword">const</span> hashMapSize10 = <span class="hljs-keyword">new</span> DecentHashMap(<span class="hljs-number">10</span>);
hashMapSize10.<span class="hljs-built_in">set</span>(<span class="hljs-string">'cat'</span>, <span class="hljs-number">2</span>);
hashMapSize10.<span class="hljs-built_in">set</span>(<span class="hljs-string">'rat'</span>, <span class="hljs-number">7</span>);
hashMapSize10.<span class="hljs-built_in">set</span>(<span class="hljs-string">'dog'</span>, <span class="hljs-number">1</span>);
hashMapSize10.<span class="hljs-built_in">set</span>(<span class="hljs-string">'art'</span>, <span class="hljs-number">8</span>);
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'collisions: '</span>, hashMapSize10.collisions); <span class="hljs-comment">// 1</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'hashMapSize10\n'</span>, hashMapSize10.buckets);
<span class="hljs-comment">/*
  bucket#0: [ { key: 'cat', value: 2 }, { key: 'art', value: 8 } ],
            &lt;4 empty items&gt;,
  bucket#5: [ { key: 'rat', value: 7 } ],
            &lt;1 empty item&gt;,
  bucket#7: [ { key: 'dog', value: 1 } ],
            &lt;2 empty items&gt;
*/</span>
</code></pre><p>换个角度看：</p>
<p><img src="https://p0.ssl.qhimg.com/t011f6faa6e24b662ce.jpg" alt="" title="HashMap: hash function translates keys into bucket (array) indexes"></p>
<p>正如你所看到的，通过增加 HashMap 的容量，能有效减少冲突次数。</p>
<p>那换个更大的试试怎样，比如 💯:</p>
<pre><code class="hljs processing"><span class="hljs-keyword">const</span> hashMapSize100 = <span class="hljs-keyword">new</span> DecentHashMap(<span class="hljs-number">100</span>);
hashMapSize100.<span class="hljs-built_in">set</span>(<span class="hljs-string">'cat'</span>, <span class="hljs-number">2</span>);
hashMapSize100.<span class="hljs-built_in">set</span>(<span class="hljs-string">'rat'</span>, <span class="hljs-number">7</span>);
hashMapSize100.<span class="hljs-built_in">set</span>(<span class="hljs-string">'dog'</span>, <span class="hljs-number">1</span>);
hashMapSize100.<span class="hljs-built_in">set</span>(<span class="hljs-string">'art'</span>, <span class="hljs-number">8</span>);
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'collisions: '</span>, hashMapSize100.collisions); <span class="hljs-comment">// 0</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'hashMapSize100\n'</span>, hashMapSize100.buckets);
<span class="hljs-comment">/*
            &lt;5 empty items&gt;,
  bucket#5: [ { key: 'rat', value: 7 } ],
            &lt;1 empty item&gt;,
  bucket#7: [ { key: 'dog', value: 1 } ],
            &lt;32 empty items&gt;,
  bucket#41: [ { key: 'art', value: 8 } ],
            &lt;49 empty items&gt;,
  bucket#90: [ { key: 'cat', value: 2 } ],
            &lt;9 empty items&gt;
*/</span>
</code></pre><p>Yay! 🎊 没有冲突！</p>
<p>通过增加初始容量，可以很好的减少冲突，但会消耗<strong>更多的内存</strong>，而且很可能许多桶都没被使用。</p>
<p>如果我们的 HashMap 能根据需要自动调整容量，这不是更好吗？这就是所谓的<strong>rehash</strong>（重新计算哈希值），我们将在下一节将实现它！</p>
<h2>优化HashMap 的实现</h2>
<p>如果 HashMap 的容量足够大，那就不会产生任何冲突，因此查找操作的时间复杂度为  <em>O(1)</em>。然而，我们怎么知道容量多大才是足够呢，100？1000？还是一百万？</p>
<p>（从开始就）分配大量的内存（去建立数组）是不合理的。因此，我们能做的是根据装载因子动态地调整容量。这操作被称为 <strong>rehash</strong>。</p>
<p><strong>装载因子</strong>是用于衡量一个 HashMap 满的程度，可以通过存储键值对的数量除以 HashMap 的容量得到它。</p>
<p>根据这思路，我们将实现最终版的 HashMap：</p>
<p><strong>最佳的 HasnMap 实现</strong></p>
<pre><code class="hljs kotlin"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HashMap</span> </span>{
  <span class="hljs-keyword">constructor</span>(initialCapacity = <span class="hljs-number">16</span>, loadFactor = <span class="hljs-number">0.75</span>) {
    <span class="hljs-keyword">this</span>.buckets = new Array(initialCapacity);
    <span class="hljs-keyword">this</span>.loadFactor = loadFactor;
    <span class="hljs-keyword">this</span>.size = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.collisions = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.keys = [];
  }
  hash(key) {
    let hashValue = <span class="hljs-number">0</span>;
    const stringTypeKey = `${key}${typeof key}`;
    <span class="hljs-keyword">for</span> (let index = <span class="hljs-number">0</span>; index &lt; stringTypeKey.length; index++) {
      const charCode = stringTypeKey.charCodeAt(index);
      hashValue += charCode &lt;&lt; (index * <span class="hljs-number">8</span>);
    }
    <span class="hljs-keyword">return</span> hashValue;
  }
  _getBucketIndex(key) {
    const hashValue = <span class="hljs-keyword">this</span>.hash(key);
    const bucketIndex = hashValue % <span class="hljs-keyword">this</span>.buckets.length;
    <span class="hljs-keyword">return</span> bucketIndex;
  }
  <span class="hljs-keyword">set</span>(key, value) {
    const {bucketIndex, entryIndex} = <span class="hljs-keyword">this</span>._getIndexes(key);
    <span class="hljs-keyword">if</span>(entryIndex === undefined) {
      <span class="hljs-comment">// initialize array and save key/value</span>
      const keyIndex = <span class="hljs-keyword">this</span>.keys.push({content: key}) - <span class="hljs-number">1</span>; <span class="hljs-comment">// keep track of the key index</span>
      <span class="hljs-keyword">this</span>.buckets[bucketIndex] = <span class="hljs-keyword">this</span>.buckets[bucketIndex] || [];
      <span class="hljs-keyword">this</span>.buckets[bucketIndex].push({key, value, keyIndex});
      <span class="hljs-keyword">this</span>.size++;
      <span class="hljs-comment">// Optional: keep count of collisions</span>
      <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.buckets[bucketIndex].length &gt; <span class="hljs-number">1</span>) { <span class="hljs-keyword">this</span>.collisions++; }
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// override existing value</span>
      <span class="hljs-keyword">this</span>.buckets[bucketIndex][entryIndex].value = value;
    }
    <span class="hljs-comment">// check if a rehash is due</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.loadFactor &gt; <span class="hljs-number">0</span> &amp;&amp; <span class="hljs-keyword">this</span>.getLoadFactor() &gt; <span class="hljs-keyword">this</span>.loadFactor) {
      <span class="hljs-keyword">this</span>.rehash(<span class="hljs-keyword">this</span>.buckets.length * <span class="hljs-number">2</span>);
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }
  <span class="hljs-keyword">get</span>(key) {
    const {bucketIndex, entryIndex} = <span class="hljs-keyword">this</span>._getIndexes(key);
    <span class="hljs-keyword">if</span>(entryIndex === undefined) {
      <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.buckets[bucketIndex][entryIndex].value;
  }
  has(key) {
    <span class="hljs-keyword">return</span> !!<span class="hljs-keyword">this</span>.<span class="hljs-keyword">get</span>(key);
  }
  _getIndexes(key) {
    const bucketIndex = <span class="hljs-keyword">this</span>._getBucketIndex(key);
    const values = <span class="hljs-keyword">this</span>.buckets[bucketIndex] || [];
    <span class="hljs-keyword">for</span> (let entryIndex = <span class="hljs-number">0</span>; entryIndex &lt; values.length; entryIndex++) {
      const entry = values[entryIndex];
      <span class="hljs-keyword">if</span>(entry.key === key) {
        <span class="hljs-keyword">return</span> {bucketIndex, entryIndex};
      }
    }
    <span class="hljs-keyword">return</span> {bucketIndex};
  }
  delete(key) {
    const {bucketIndex, entryIndex, keyIndex} = <span class="hljs-keyword">this</span>._getIndexes(key);
    <span class="hljs-keyword">if</span>(entryIndex === undefined) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">this</span>.buckets[bucketIndex].splice(entryIndex, <span class="hljs-number">1</span>);
    delete <span class="hljs-keyword">this</span>.keys[keyIndex];
    <span class="hljs-keyword">this</span>.size--;
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }
  rehash(newCapacity) {
    const newMap = new HashMap(newCapacity);
    <span class="hljs-keyword">this</span>.keys.forEach(key =&gt; {
      <span class="hljs-keyword">if</span>(key) {
        newMap.<span class="hljs-keyword">set</span>(key.content, <span class="hljs-keyword">this</span>.<span class="hljs-keyword">get</span>(key.content));
      }
    });
    <span class="hljs-comment">// update bucket</span>
    <span class="hljs-keyword">this</span>.buckets = newMap.buckets;
    <span class="hljs-keyword">this</span>.collisions = newMap.collisions;
    <span class="hljs-comment">// Optional: both `keys` has the same content except that the new one doesn't have empty spaces from deletions</span>
    <span class="hljs-keyword">this</span>.keys = newMap.keys;
  }
  getLoadFactor() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.size / <span class="hljs-keyword">this</span>.buckets.length;
  }
}
</code></pre><p><a href="https://github.com/amejiarosario/algorithms.js/blob/master/lib/data-structures/hash-maps/hash-map.js">完整代码</a>
（译者注：其实 <code>has</code> 方法有问题，只是不影响阅读。）</p>
<p>注意第99行至第114行（即 <code>rehash</code> 函数），那里是 rehash 魔法发生的地方。我们创造了一个新的 HashMap，它拥有原来 HashMap两倍的容量。</p>
<p><strong>测试</strong>一下上面的新实现吧：</p>
<pre><code class="hljs processing"><span class="hljs-keyword">const</span> <span class="hljs-keyword">assert</span> = require(<span class="hljs-string">'assert'</span>);
<span class="hljs-keyword">const</span> hashMap = <span class="hljs-keyword">new</span> <span class="hljs-keyword">HashMap</span>();
<span class="hljs-keyword">assert</span>.equal(hashMap.getLoadFactor(), <span class="hljs-number">0</span>);
hashMap.<span class="hljs-built_in">set</span>(<span class="hljs-string">'songs'</span>, <span class="hljs-number">2</span>);
hashMap.<span class="hljs-built_in">set</span>(<span class="hljs-string">'pets'</span>, <span class="hljs-number">7</span>);
hashMap.<span class="hljs-built_in">set</span>(<span class="hljs-string">'tests'</span>, <span class="hljs-number">1</span>);
hashMap.<span class="hljs-built_in">set</span>(<span class="hljs-string">'art'</span>, <span class="hljs-number">8</span>);
<span class="hljs-keyword">assert</span>.equal(hashMap.getLoadFactor(), <span class="hljs-number">4</span>/<span class="hljs-number">16</span>);
hashMap.<span class="hljs-built_in">set</span>(<span class="hljs-string">'Pineapple'</span>, <span class="hljs-string">'Pen Pineapple Apple Pen'</span>);
hashMap.<span class="hljs-built_in">set</span>(<span class="hljs-string">'Despacito'</span>, <span class="hljs-string">'Luis Fonsi'</span>);
hashMap.<span class="hljs-built_in">set</span>(<span class="hljs-string">'Bailando'</span>, <span class="hljs-string">'Enrique Iglesias'</span>);
hashMap.<span class="hljs-built_in">set</span>(<span class="hljs-string">'Dura'</span>, <span class="hljs-string">'Daddy Yankee'</span>);
hashMap.<span class="hljs-built_in">set</span>(<span class="hljs-string">'Lean On'</span>, <span class="hljs-string">'Major Lazer'</span>);
hashMap.<span class="hljs-built_in">set</span>(<span class="hljs-string">'Hello'</span>, <span class="hljs-string">'Adele'</span>);
hashMap.<span class="hljs-built_in">set</span>(<span class="hljs-string">'All About That Bass'</span>, <span class="hljs-string">'Meghan Trainor'</span>);
hashMap.<span class="hljs-built_in">set</span>(<span class="hljs-string">'This Is What You Came For'</span>, <span class="hljs-string">'Calvin Harris '</span>);
<span class="hljs-keyword">assert</span>.equal(hashMap.collisions, <span class="hljs-number">2</span>);
<span class="hljs-keyword">assert</span>.equal(hashMap.getLoadFactor(), <span class="hljs-number">0.75</span>);
<span class="hljs-keyword">assert</span>.equal(hashMap.buckets.length, <span class="hljs-number">16</span>);
hashMap.<span class="hljs-built_in">set</span>(<span class="hljs-string">'Wake Me Up'</span>, <span class="hljs-string">'Avicii'</span>); <span class="hljs-comment">// &lt;--- Trigger REHASH</span>
<span class="hljs-keyword">assert</span>.equal(hashMap.collisions, <span class="hljs-number">0</span>);
<span class="hljs-keyword">assert</span>.equal(hashMap.getLoadFactor(), <span class="hljs-number">0.40625</span>);
<span class="hljs-keyword">assert</span>.equal(hashMap.buckets.length, <span class="hljs-number">32</span>);
</code></pre><p>注意，在 HashMap 存储了12项之后，装载因子将超过0.75，因而触发 rehash，HashMap 容量加倍（从16到32）。同时，我们也能看到冲突从2降低为0。</p>
<p>这版本实现的 HashMap 能以很低的时间复杂度进行常见的操作，如：插入、查找、删除、编辑等。</p>
<p>小结一下，HashMap 的性能取决于：</p>
<ol>
<li>哈希函数能根据不同的键输出不同的值。</li>
<li>HashMap 容量的大小。</li>
</ol>
<p>我们终于处理好了各种问题 🔨。有了不错的哈希函数，可以根据不同输入返回不同输出。同时，我们也有 <code>rehash</code> 函数根据需要动态地调整 HashMap的容量。这实在太好了！</p>
<h2>HashMap 中插入元素的时间复杂度</h2>
<p>往一个 HashMap 插入元素需要两样东西：一个键与一个值。可以使用上文开发优化后的 HashMap 或内置的对象进行操作：</p>
<pre><code class="hljs cs"><span class="hljs-function">function <span class="hljs-title">insert</span>(<span class="hljs-params"><span class="hljs-keyword">object</span>, key, <span class="hljs-keyword">value</span></span>) </span>{
  <span class="hljs-keyword">object</span>[key] = <span class="hljs-keyword">value</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">object</span>;
}
<span class="hljs-keyword">const</span> hash = {};
console.log(insert(hash, <span class="hljs-string">'word'</span>, <span class="hljs-number">1</span>)); <span class="hljs-comment">// =&gt; { word: 1 }</span>

</code></pre><p>在新版的 JavaScript 中，你可以使用 Map。</p>
<pre><code class="hljs processing">function insertMap(<span class="hljs-built_in">map</span>, <span class="hljs-built_in">key</span>, value) {
  <span class="hljs-built_in">map</span>.<span class="hljs-built_in">set</span>(<span class="hljs-built_in">key</span>, value);
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">map</span>;
}
<span class="hljs-keyword">const</span> <span class="hljs-built_in">map</span> = <span class="hljs-keyword">new</span> Map();
console.<span class="hljs-built_in">log</span>(insertMap(<span class="hljs-built_in">map</span>, <span class="hljs-string">'word'</span>, <span class="hljs-number">1</span>)); <span class="hljs-comment">// Map { 'word' =&gt; 1 }</span>
</code></pre><p><strong>注意</strong>。我们将使用 Map 而不是普通的对象，这是由于 Map 的键可以是任何东西而对象的键只能是字符串或者数字。此外，Map 可以保持插入的顺序。</p>
<p>进一步说，<code>Map.set</code> 只是将元素插入到数组（如上文 <code>DecentHashMap.set</code> 所示），类似于 <code>Array.push</code>，因此可以说：</p>
<blockquote>
<p>往 HashMap 中插入元素，时间复杂度是 <em>O(1)</em>。如果需要 rehash，那么复杂度则是 <em>O(n)</em>。</p>
</blockquote>
<p>rehash 能将冲突可能性降至最低。rehash 操作时间复杂度是 <em>O(n)</em> ，但不是每次插入操作都要执行，仅在需要时执行。</p>
<h2>HashMap 中查找或访问元素的时间复杂度</h2>
<p>这是 <code>HashMap.get</code> 方法，我们通过往里面传递一个键来获取对应的值。让我们回顾一下 <code>DecentHashMap.get</code> 的实现：</p>
<pre><code class="hljs maxima"><span class="hljs-built_in">get</span>（<span class="hljs-built_in">key</span>）{
  const hashIndex = this .getIndex（<span class="hljs-built_in">key</span>）;
  const <span class="hljs-built_in">values</span> = this .<span class="hljs-built_in">array</span> [hashIndex];
  <span class="hljs-keyword">for</span>（<span class="hljs-built_in">let</span> index = <span class="hljs-number">0</span> ; index &lt;<span class="hljs-built_in">values</span>.<span class="hljs-built_in">length</span>; index ++）{
    const entry = <span class="hljs-built_in">values</span> [index];
    <span class="hljs-keyword">if</span>（entry.<span class="hljs-built_in">key</span> === <span class="hljs-built_in">key</span>）{
      返回 entry.value
    }
  }
}
</code></pre><p>如果并未发生冲突，那么 <code>values</code> 只会有一个值，访问的时间复杂度是 <em>O(1)</em>。但我们也知道，冲突总是会发生的。如果 HashMap 的初始容量太小或哈希函数设计糟糕，那么大多数元素访问的时间复杂度是 <em>O(n)</em>。</p>
<blockquote>
<p>HashMap 访问操作的时间复杂度平均是 <em>O(1)</em>，最坏情况是 <em>O(n)</em> 。</p>
</blockquote>
<p><strong>进阶提示：</strong>另一个（将访问操作的）时间复杂度从 <em>O(n)</em> 降至  <em>O(log n)</em> 的方法是使用 <em>二叉搜索树</em> 而不是数组进行底层存储。事实上，当存储的<a href="http://hg.openjdk.java.net/jdk9/jdk9/jdk/file/f08705540498/src/java.base/share/classes/java/util/HashMap.java#l257">元素超过8 个</a>时， <a href="http://hg.openjdk.java.net/jdk9/jdk9/jdk/file/f08705540498/src/java.base/share/classes/java/util/HashMap.java#l145">Java  HashMap 的底层实现</a>会从数组转为树。</p>
<h2>HashMap 中修改或删除元素的时间复杂度</h2>
<p>修改(<code>HashMap.set</code>)或删除（<code>HashMap.delete</code>）键值对，分摊后的时间复杂度是 <em>O(1)</em>。如果冲突很多，可能面对的就是最坏情况，复杂度为  <em>O(n)</em>。然而伴随着 rehash 操作，可以大大减少最坏情况的发生的几率。</p>
<blockquote>
<p>HashMap 修改或删除操作的时间复杂度平均是 <em>O(1)</em> ，最坏情况是 <em>O(n)</em>。 </p>
</blockquote>
<h2>HashMap 方法的时间复杂度</h2>
<p>在下表中，小结了 HashMap（方法）的时间复杂度：</p>
<p><strong>HashMap 方法的时间复杂度</strong></p>
<table>
<thead>
<tr>
<th>操作方法</th>
<th>最坏情况</th>
<th>平均</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>访问或查找 (<code>HashMap.get</code>)</td>
<td><em>O(n)</em></td>
<td><em>O(1)</em></td>
<td><em>O(n)</em> 是冲突极多的极端情况</td>
</tr>
<tr>
<td>插入或修改 (<code>HashMap.set</code>)</td>
<td><em>O(n)</em></td>
<td><em>O(1)</em></td>
<td><em>O(n)</em> 只发生在装载因子超过0.75，触发 rehash 时</td>
</tr>
<tr>
<td>删除 (<code>HashMap.delete</code>)</td>
<td><em>O(n)</em></td>
<td><em>O(1)</em></td>
<td><em>O(n)</em> 是冲突极多的极端情况</td>
</tr>
</tbody>
</table>
<h1>Sets</h1>
<p>集合跟数组非常相像。它们的区别是集合中的元素是唯一的。</p>
<p>我们该如何实现一个集合呢（也就是没有重复项的数组）？可以使用数组实现，在插入新元素前先检查该元素是否存在。但检查是否存在的时间复杂度是  <em>O(n)</em>。能对此进行优化吗？之前开发的 Map （插入操作）分摊后时间复杂度度才 <em>O(1)</em>！</p>
<h2>Set 的实现</h2>
<p>可以使用 JavaScript 内置的 Set。然而通过自己实现它，可以更直观地了解它的时间复杂度。我们将使用上文优化后带有 rehash 功能的 HashMap 来实现它。</p>
<pre><code class="hljs kotlin">const HashMap = require(<span class="hljs-string">'../hash-maps/hash-map'</span>);
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MySet</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.hashMap = new HashMap();
  }
  add(value) {
    <span class="hljs-keyword">this</span>.hashMap.<span class="hljs-keyword">set</span>(value);
  }
  has(value) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.hashMap.has(value);
  }
  <span class="hljs-keyword">get</span> size() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.hashMap.size;
  }
  delete(value) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.hashMap.delete(value);
  }
  entries() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.hashMap.keys.reduce((acc, key) =&gt; {
      <span class="hljs-keyword">if</span>(key !== undefined) {
        acc.push(key.content);
      }
      <span class="hljs-keyword">return</span> acc
    }, []);
  }
}
</code></pre><p>（译者注：由于 HashMap 的 <code>has</code> 方法有问题，导致 Set 的 <code>has</code> 方法也有问题）</p>
<p>我们使用 <code>HashMap.set</code> 为集合不重复地添加元素。我们将待存储的值作为 HashMap的键，由于哈希函数会将键映射为唯一的索引，因而起到排重的效果。</p>
<p>检查一个元素是否已存在于集合中，可以使用 <code>hashMap.has</code> 方法，它的时间复杂度平均是 <em>O(1)</em>。集合中绝大多数的方法分摊后时间复杂度为 <em>O(1)</em>，除了 <code>entries</code> 方法，它的事件复杂度是 <em>O(n)</em>。</p>
<p>注意：使用 JavaScript 内置的集合时，它的  <code>Set.has</code> 方法时间复杂度是 <em>O(n)</em>。这是由于它的使用了 List 作为内部实现，需要检查每一个元素。你可以在<a href="https://www.ecma-international.org/ecma-262/6.0/#sec-set.prototype.has">这</a>查阅相关的细节。</p>
<p>下面有些例子，说明如何使用这个集合：</p>
<pre><code class="hljs processing"><span class="hljs-keyword">const</span> <span class="hljs-keyword">assert</span> = require(<span class="hljs-string">'assert'</span>);
<span class="hljs-comment">// const set = new Set(); // Using the built-in</span>
<span class="hljs-keyword">const</span> <span class="hljs-built_in">set</span> = <span class="hljs-keyword">new</span> MySet(); <span class="hljs-comment">// Using our own implementation</span>
<span class="hljs-built_in">set</span>.<span class="hljs-built_in">add</span>(<span class="hljs-string">'one'</span>);
<span class="hljs-built_in">set</span>.<span class="hljs-built_in">add</span>(<span class="hljs-string">'uno'</span>);
<span class="hljs-built_in">set</span>.<span class="hljs-built_in">add</span>(<span class="hljs-string">'one'</span>); <span class="hljs-comment">// should NOT add this one twice</span>
<span class="hljs-keyword">assert</span>.equal(<span class="hljs-built_in">set</span>.has(<span class="hljs-string">'one'</span>), <span class="hljs-keyword">true</span>);
<span class="hljs-keyword">assert</span>.equal(<span class="hljs-built_in">set</span>.has(<span class="hljs-string">'dos'</span>), <span class="hljs-keyword">false</span>);
<span class="hljs-keyword">assert</span>.equal(<span class="hljs-built_in">set</span>.<span class="hljs-built_in">size</span>, <span class="hljs-number">2</span>);
<span class="hljs-comment">// assert.deepEqual(Array.from(set), ['one', 'uno']);</span>
<span class="hljs-keyword">assert</span>.equal(<span class="hljs-built_in">set</span>.delete(<span class="hljs-string">'one'</span>), <span class="hljs-keyword">true</span>);
<span class="hljs-keyword">assert</span>.equal(<span class="hljs-built_in">set</span>.delete(<span class="hljs-string">'one'</span>), <span class="hljs-keyword">false</span>);
<span class="hljs-keyword">assert</span>.equal(<span class="hljs-built_in">set</span>.has(<span class="hljs-string">'one'</span>), <span class="hljs-keyword">false</span>);
<span class="hljs-keyword">assert</span>.equal(<span class="hljs-built_in">set</span>.<span class="hljs-built_in">size</span>, <span class="hljs-number">1</span>);
</code></pre><p>这个例子中，MySet 与 JavaScript 中内置的 Set 均可作为容器。</p>
<h2>Set 方法的时间复杂度</h2>
<p>根据 HashMap 实现的的 Set，可以小结出的时间复杂度如下（与 HashMap 非常相似）：</p>
<p><strong>Set 方法的时间复杂度</strong></p>
<table>
<thead>
<tr>
<th>操作方法</th>
<th>最坏情况</th>
<th>平均</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>访问或查找 (<code>Set.has</code>)</td>
<td><em>O(n)</em></td>
<td><em>O(1)</em></td>
<td><em>O(n)</em> 是冲突极多的极端情况</td>
</tr>
<tr>
<td>插入或修改 (<code>Set.add</code>)</td>
<td><em>O(n)</em></td>
<td><em>O(1)</em></td>
<td><em>O(n)</em> 只发生在装载因子超过0.75，触发 rehash 时</td>
</tr>
<tr>
<td>删除 (<code>Set.delete</code>)</td>
<td><em>O(n)</em></td>
<td><em>O(1)</em></td>
<td><em>O(n)</em>是冲突极多的极端情况)</td>
</tr>
</tbody>
</table>
<h1>Linked Lists</h1>
<p>链表是一种一个节点链接到下一个节点的数据结构。</p>
<p><img src="https://p0.ssl.qhimg.com/t01fa68db515c83eaa0.jpg" alt="" title="LinkedList"></p>
<p>链表是（本文）第一种不用数组（作为底层）实现的数据结构。我们使用节点来实现，节点存储了一个元素，并指向下一个节点（若没有下一个节点，则为空）。</p>
<pre><code class="hljs cs"><span class="hljs-keyword">class</span> <span class="hljs-title">Node</span> {
  constructor(<span class="hljs-keyword">value</span>) {
    <span class="hljs-keyword">this</span>.<span class="hljs-keyword">value</span> = <span class="hljs-keyword">value</span>;
    <span class="hljs-keyword">this</span>.next = <span class="hljs-literal">null</span>;
  }
}
</code></pre><p>当每个节点都指向它的下了一个节点时，我们就拥有了一条由若干节点组成链条，即<strong>单向链表</strong>。</p>
<h2>Singly Linked Lists</h2>
<p>对于单向链表而言，我们只需关心每个节点都有指向下一个节点的引用。</p>
<p>从首个节点或称之为根节点开始构建（单向链表）。</p>
<pre><code class="hljs javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LinkedList</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.root = <span class="hljs-literal">null</span>;
  }
  <span class="hljs-comment">// ...</span>
}
</code></pre><p>每个链表都有四个基础操作：</p>
<ol>
<li>addLast：将一个元素添加至链表尾部。</li>
<li>removeLast：删除链表的最后一个元素。</li>
<li>addFirst：将一个元素添加到链表的首部。</li>
<li>removeFirst：删除链表的首个元素。</li>
</ol>
<p><strong>向链表末尾添加与删除一个元素</strong></p>
<p>（对添加操作而言，）有两种情况。1）如果链表根节点不存在，那么将新节点设置为链表的根节点。2）若存在根节点，则必须不断查询下一个节点，直到链表的末尾，并将新节点添加到最后。</p>
<pre><code class="hljs crmsh">addLast(value) { // similar Array.push
  const <span class="hljs-keyword">node</span> <span class="hljs-title">= new</span> <span class="hljs-keyword">Node</span><span class="hljs-title">(value</span>);
  if(this.root) {
    let currentNode = this.root;
    while(currentNode &amp;&amp; currentNode.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = <span class="hljs-keyword">node</span><span class="hljs-title">;
  } else</span> {
    this.root = <span class="hljs-keyword">node</span><span class="hljs-title">;
  }
}
</span></code></pre><p>上述代码的时间复杂度是多少呢？如果是作为根节点添加进链表，时间复杂度是  <em>O(1)</em>，然而寻找最后一个节点的时间复杂度是 <em>O(n)</em>.。</p>
<p>删除末尾的节点与上述代码相差无几。</p>
<pre><code class="hljs gradle">removeLast() {
  let current = <span class="hljs-keyword">this</span>.root;
  let target;
  <span class="hljs-keyword">if</span>(current &amp;&amp; current.<span class="hljs-keyword">next</span>) {
    <span class="hljs-keyword">while</span>(current &amp;&amp; current.<span class="hljs-keyword">next</span> &amp;&amp; current.<span class="hljs-keyword">next</span>.<span class="hljs-keyword">next</span>) {
      current = current.<span class="hljs-keyword">next</span>;
    }
    target = current.<span class="hljs-keyword">next</span>;
    current.<span class="hljs-keyword">next</span> = <span class="hljs-keyword">null</span>;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.root = <span class="hljs-keyword">null</span>;
    target = current;
  }
  <span class="hljs-keyword">if</span>(target) {
    <span class="hljs-keyword">return</span> target.value;
  }
}
</code></pre><p>时间复杂度也是 <em>O(n)</em>。这是由于我们必须依次往下，直到找到倒数第二个节点，并将它 <code>next</code> 的引用指向 <code>null</code>。</p>
<p><strong>向链表开头添加与删除一个元素</strong></p>
<p>往链表开头添加一个元素（的代码）如下所示：</p>
<pre><code class="hljs crmsh">addFirst(value) {
  const <span class="hljs-keyword">node</span> <span class="hljs-title">= new</span> <span class="hljs-keyword">Node</span><span class="hljs-title">(value</span>);
  <span class="hljs-keyword">node</span>.<span class="hljs-title">next</span> = this.first;
  this.first = <span class="hljs-keyword">node</span><span class="hljs-title">;
}
</span></code></pre><p>向链表的开头进行增删操作，所耗费的时间是恒定的，因为我们持有根元素的引用：</p>
<pre><code class="hljs aspectj">removeFirst(value) {
  <span class="hljs-keyword">const</span> <span class="hljs-keyword">target</span> = <span class="hljs-keyword">this</span>.first;
  <span class="hljs-keyword">this</span>.first = <span class="hljs-keyword">target</span> ? <span class="hljs-keyword">target</span>.next : <span class="hljs-keyword">null</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">target</span>.value;
}
</code></pre><p>（译者注：作者原文 <code>removeFirst</code> 的代码放错了，上述代码是译者实现的）</p>
<p>如你所见，对链表的开头进行增删操作，时间复杂度永远是  <em>O(1)</em>。</p>
<p><strong>从链表的任意位置删除元素</strong></p>
<p>删除链表首尾的元素，可以使用 <code>removeFirst</code> 或 <code>removeLast</code>。然而，如若移除的节点在链表的中间，则需要将待删除节点的前一个节点指向待删除节点的下一个节点，从而从链表中删除该节点：</p>
<pre><code class="hljs aspectj">remove(index = <span class="hljs-number">0</span>) {
  <span class="hljs-keyword">if</span>(index === <span class="hljs-number">0</span>) {
    <span class="hljs-function"><span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.<span class="hljs-title">removeFirst</span><span class="hljs-params">()</span></span>;
  }
  let current;
  let <span class="hljs-keyword">target</span> = <span class="hljs-keyword">this</span>.first;
  <span class="hljs-keyword">for</span> (let i = <span class="hljs-number">0</span>; <span class="hljs-keyword">target</span>;  i++, current = <span class="hljs-keyword">target</span>, <span class="hljs-keyword">target</span> = <span class="hljs-keyword">target</span>.next) {
    <span class="hljs-keyword">if</span>(i === index) {
      <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">target</span>.next) { <span class="hljs-comment">// if it doesn't have next it means that it is the last</span>
        <span class="hljs-function"><span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.<span class="hljs-title">removeLast</span><span class="hljs-params">()</span></span>;
      }
      current.next = <span class="hljs-keyword">target</span>.next;
      <span class="hljs-keyword">this</span>.size--;
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">target</span>.value;
    }
  }
}
</code></pre><p>（译者注：原文实现有点问题，译者稍作了点修改。<code>removeLast</code> 的调用其实浪费了性能，但可读性上增加了，因而此处未作修改。）</p>
<p>注意， <code>index</code> 是从0开始的：0是第一个节点，1是第二个，如此类推。</p>
<blockquote>
<p>在链表任意一处删除节点，时间复杂度为  <em>O(n)</em>.</p>
</blockquote>
<p><strong>在链表中查找元素</strong></p>
<p>在链表中查找一个元素与删除元素的代码差不多：</p>
<pre><code class="hljs fortran"><span class="hljs-keyword">contains</span>(<span class="hljs-keyword">value</span>) {
  for (let current = this.first, <span class="hljs-built_in">index</span> = <span class="hljs-number">0</span>; current;  <span class="hljs-built_in">index</span>++, current = current.next) {
    <span class="hljs-keyword">if</span>(current.<span class="hljs-keyword">value</span> === <span class="hljs-keyword">value</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">index</span>;
    }
  }
}
</code></pre><p>这个方法查找链表中第一个与给定值相等的节点（的索引）。</p>
<blockquote>
<p>在链表中查找一个元素，时间复杂度是  <em>O(n)</em></p>
</blockquote>
<h2>单向链表操作方法的时间复杂度</h2>
<p>在下表中，小结了单向链表（方法）的时间复杂度：</p>
<table>
<thead>
<tr>
<th>操作方法</th>
<th>时间复杂度</th>
<th>注释</th>
</tr>
</thead>
<tbody>
<tr>
<td>addFirst</td>
<td><em>O(1)</em></td>
<td>将元素插入到链表的开头</td>
</tr>
<tr>
<td>addLast</td>
<td><em>O(n)</em></td>
<td>将元素插入到链表的末尾</td>
</tr>
<tr>
<td>add</td>
<td><em>O(n)</em></td>
<td>将元素插入到链表的任意地方</td>
</tr>
<tr>
<td>removeFirst</td>
<td><em>O(1)</em></td>
<td>删除链表的首个元素</td>
</tr>
<tr>
<td>removeLast</td>
<td><em>O(n)</em></td>
<td>删除链表最后一个元素</td>
</tr>
<tr>
<td>remove</td>
<td><em>O(n)</em></td>
<td>删除链表中任意一个元素</td>
</tr>
<tr>
<td>contains</td>
<td><em>O(n)</em></td>
<td>在链表中查找任意元素</td>
</tr>
</tbody>
</table>
<p>注意，当我们增删链表的最后一个元素时，该操作的时间复杂度是  <em>O(n)</em>…</p>
<blockquote>
<p>但只要持有最后一个节点的引用，可以从原来的 <em>O(n)</em>，降至与增删首个元素一致，变为 <em>O(1)</em>！</p>
</blockquote>
<p>我们将在下一节实现这功能！</p>
<h2>Doubly Linked Lists</h2>
<p>当我们有一串节点，每一个都有指向下一个节点的引用，也就是拥有了一个<strong>单向链表</strong>。而当一串节点，每一个既有指向下一个节点的引用，也有指向上一个节点的引用时，这串节点就是<strong>双向链表</strong>。</p>
<p><img src="https://p0.ssl.qhimg.com/t01c1739573cb495ec3.jpg" alt="" title="Doubly Linked List"></p>
<p>双向链表的节点有两个引用（分别指向前一个和后一个节点），因此需要保持追踪首个与最后一个节点。</p>
<pre><code class="hljs kotlin"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Node</span> </span>{
  <span class="hljs-keyword">constructor</span>(value) {
    <span class="hljs-keyword">this</span>.value = value;
    <span class="hljs-keyword">this</span>.next = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.previous = <span class="hljs-literal">null</span>;
  }
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LinkedList</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.first = <span class="hljs-literal">null</span>; <span class="hljs-comment">// head/root element</span>
    <span class="hljs-keyword">this</span>.last = <span class="hljs-literal">null</span>; <span class="hljs-comment">// last element of the list</span>
    <span class="hljs-keyword">this</span>.size = <span class="hljs-number">0</span>; <span class="hljs-comment">// total number of elements in the list</span>
  }
  <span class="hljs-comment">// ...</span>
}
</code></pre><p>（双向链表的<a href="https://github.com/amejiarosario/algorithms.js/blob/master/lib/data-structures/linked-lists/linked-list.js">完整代码</a>）</p>
<p><strong>添加或删除链表的首个元素</strong></p>
<p>由于持有首个节点的引用，因而添加或删除首个元素的操作是十分简单的：</p>
<pre><code class="hljs crmsh">addFirst(value) {
  const <span class="hljs-keyword">node</span> <span class="hljs-title">= new</span> <span class="hljs-keyword">Node</span><span class="hljs-title">(value</span>);
  <span class="hljs-keyword">node</span>.<span class="hljs-title">next</span> = this.first;
  if(this.first) {
    this.first.previous = <span class="hljs-keyword">node</span><span class="hljs-title">;
  } else</span> {
    this.last = <span class="hljs-keyword">node</span><span class="hljs-title">;
  }
  this</span>.first = <span class="hljs-keyword">node</span><span class="hljs-title">; // update</span> head
  this.size++;
  return <span class="hljs-keyword">node</span><span class="hljs-title">;
}
</span></code></pre><p>（<code>LinkedList.prototype.addFirst</code> 的<a href="https://github.com/amejiarosario/algorithms.js/blob/master/lib/data-structures/linked-lists/linked-list.js">完整代码</a></p>
<p>注意，我们需要十分谨慎地更新节点的 <code>previous</code> 引用、双向链表的 <code>size</code> 与双向链表最后一个节点的引用。</p>
<pre><code class="hljs kotlin">removeFirst() {
  const first = <span class="hljs-keyword">this</span>.first;
  <span class="hljs-keyword">if</span>(first) {
    <span class="hljs-keyword">this</span>.first = first.next;
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.first) {
      <span class="hljs-keyword">this</span>.first.previous = <span class="hljs-literal">null</span>;
    }
    <span class="hljs-keyword">this</span>.size--;
    <span class="hljs-keyword">return</span> first.value;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.last = <span class="hljs-literal">null</span>;
  }
}
</code></pre><p>（<code>LinkedList.prototype.removeFirst</code> 的<a href="https://github.com/amejiarosario/algorithms.js/blob/master/lib/data-structures/linked-lists/linked-list.js">完整代码</a></p>
<p>时间复杂度是什么呢？</p>
<blockquote>
<p>无论是单向链表还是双向链表，添加与删除首个节点的操作耗费时间都是恒定的，时间复杂度为 <em>O(1)</em>。</p>
</blockquote>
<p><strong>添加或删除链表的最后一个元素</strong></p>
<p><em>从双向链表的末尾</em>添加或删除一个元素稍有点麻烦。当你查询单向链表（操作的时间复杂度）时，这两个操作都是 <em>O(n)</em>，这是由于需要遍历整条链表，直至找到最后一个元素。然而，双向链表持有最后一个节点的引用：</p>
<pre><code class="hljs crmsh">addLast(value) {
  const <span class="hljs-keyword">node</span> <span class="hljs-title">= new</span> <span class="hljs-keyword">Node</span><span class="hljs-title">(value</span>);
  if(this.first) {
    <span class="hljs-keyword">node</span>.<span class="hljs-title">previous</span> = this.last;
    this.last.next = <span class="hljs-keyword">node</span><span class="hljs-title">;
    this</span>.last = <span class="hljs-keyword">node</span><span class="hljs-title">;
  } else</span> {
    this.first = <span class="hljs-keyword">node</span><span class="hljs-title">;
    this</span>.last = <span class="hljs-keyword">node</span><span class="hljs-title">;
  }
  this</span>.size++;
  return <span class="hljs-keyword">node</span><span class="hljs-title">;
}
</span></code></pre><p>（<code>LinkedList.prototype.addLast</code> 的<a href="https://github.com/amejiarosario/algorithms.js/blob/master/lib/data-structures/linked-lists/linked-list.js">完整代码</a>）</p>
<p>同样，我们需要小心地更新引用与处理一些特殊情况，如链表中只有一个元素时。</p>
<pre><code class="hljs kotlin">removeLast() {
  let current = <span class="hljs-keyword">this</span>.first;
  let target;
  <span class="hljs-keyword">if</span>(current &amp;&amp; current.next) {
    target = <span class="hljs-keyword">this</span>.last;
    current = target.previous;
    <span class="hljs-keyword">this</span>.last = current;
    current.next = <span class="hljs-literal">null</span>;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.first = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.last = <span class="hljs-literal">null</span>;
    target = current;
  }
  <span class="hljs-keyword">if</span>(target) {
    <span class="hljs-keyword">this</span>.size--;
    <span class="hljs-keyword">return</span> target.value;
  }
}
</code></pre><p>（<code>LinkedList.prototype.removeLast</code> 的<a href="https://github.com/amejiarosario/algorithms.js/blob/master/lib/data-structures/linked-lists/linked-list.js">完整代码</a>）</p>
<p>使用了双向链表，我们不再需要遍历整个链表直至找到倒数第二个元素。可以直接使用 <code>this.last.previous</code> 来找到它，时间复杂度是 <em>O(1)</em>。</p>
<p>下文将介绍队列相关的知识，本文中队列是使用两个数组实现的。可以改为使用双向链表实现队列，因为（双向链表）添加首个元素与删除最后一个元素时间复杂度都是 <em>O(1)</em>。</p>
<p><strong>添加一个元素至链表任意一处</strong></p>
<p>借助 <code>addFirst</code> 与 <code>addLast</code>，可以实现将一个元素添加到链表任意一处，实现如下：</p>
<pre><code class="hljs haxe">add(value, index = <span class="hljs-number">0</span>) {
  <span class="hljs-keyword">if</span>(index === <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">this</span>.addFirst(value);
  }
  <span class="hljs-keyword">for</span> (let current = <span class="hljs-built_in">this</span>.first, i = <span class="hljs-number">0</span>; i &lt;= <span class="hljs-built_in">this</span>.size;  i++, current = (current &amp;&amp; current.next)) {
    <span class="hljs-keyword">if</span>(i === index) {
      <span class="hljs-keyword">if</span>(i === <span class="hljs-built_in">this</span>.size) { <span class="hljs-comment">// if it doesn't have next it means that it is the last</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">this</span>.addLast(value);
      }
      const <span class="hljs-keyword">new</span><span class="hljs-type">Node</span> = <span class="hljs-keyword">new</span> <span class="hljs-type">Node</span>(value);
      <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>.previous = current.previous;
      <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>.next = current;
      current.previous.next = <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>;
      <span class="hljs-keyword">if</span>(current.next) { current.next.previous = <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>; }
      <span class="hljs-built_in">this</span>.size++;
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>;
    }
  }
}
</code></pre><p>（<code>LinkedList.prototype.add</code> 的<a href="https://github.com/amejiarosario/algorithms.js/blob/master/lib/data-structures/linked-lists/linked-list.js">完整代码</a>）</p>
<p>如果添加元素的位置是在链表中间，我们就必须更新该元素前后节点的 <code>next</code> 与 <code>previous</code> 引用。</p>
<blockquote>
<p>添加一个元素至链表任意一处的时间复杂度是 <em>O(n)</em>.</p>
</blockquote>
<h2>双向链表方法的时间复杂度</h2>
<p>双向链表每个方法的时间复杂度如下表：</p>
<table>
<thead>
<tr>
<th>操作方法</th>
<th>时间复杂度</th>
<th>注释</th>
</tr>
</thead>
<tbody>
<tr>
<td>addFirst</td>
<td><em>O(1)</em></td>
<td>将元素插入到链表的开头</td>
</tr>
<tr>
<td>addLast</td>
<td><em>O(1)</em></td>
<td>将元素插入到链表的末尾</td>
</tr>
<tr>
<td>add</td>
<td><em>O(n)</em></td>
<td>将元素插入到链表的任意地方</td>
</tr>
<tr>
<td>removeFirst</td>
<td><em>O(1)</em></td>
<td>删除链表的首个元素</td>
</tr>
<tr>
<td>removeLast</td>
<td><em>O(1)</em></td>
<td>删除链表最后一个元素</td>
</tr>
<tr>
<td>remove</td>
<td><em>O(n)</em></td>
<td>删除链表中任意一个元素</td>
</tr>
<tr>
<td>contains</td>
<td><em>O(n)</em></td>
<td>在链表中查找任意元素</td>
</tr>
</tbody>
</table>
<p>与单向链表相比，有了很大的改进（译者注：其实看场景，不要盲目认为双向链表一定比单向链表强）！（<code>addLast</code> 与 <code>removeLast</code>）操作时间复杂度从 <em>O(n)</em> 降至 <em>O(1)</em> ，这是由于：</p>
<ul>
<li>添加对前一个节点的引用。</li>
<li>持有链表最后一个节点的引用。</li>
</ul>
<p>删除首个或最后一个节点可以在恒定时间内完成，然而删除中间的节点时间复杂度仍然是 <em>O(n)</em>。</p>
<h1>Stacks</h1>
<p>栈是一种越后被添加的元素，越先被弹出的数据结构。也就是后进先出（LIFO）.</p>
<p><img src="https://p0.ssl.qhimg.com/t01399832fe71e12241.jpg" alt="" title="Stack: push and pop"></p>
<p>让我们从零开始实现一个栈！</p>
<pre><code class="hljs kotlin"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Stack</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.input = [];
  }
  push(element) {
    <span class="hljs-keyword">this</span>.input.push(element);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }
  pop() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.input.pop();
  }
}
</code></pre><p>正如你看到的，如果使用内置的  <code>Array.push</code> 与 <code>Array.pop</code> 实现一个栈，那是十分简单的。两个方法的时间复杂度都是 <em>O(1)</em>。</p>
<p>下面来看看栈的具体使用：</p>
<pre><code class="hljs cpp"><span class="hljs-keyword">const</span> <span class="hljs-built_in">stack</span> = <span class="hljs-keyword">new</span> Stack();
<span class="hljs-built_in">stack</span>.push(<span class="hljs-string">'a'</span>);
<span class="hljs-built_in">stack</span>.push(<span class="hljs-string">'b'</span>);
<span class="hljs-built_in">stack</span>.push(<span class="hljs-string">'c'</span>);
<span class="hljs-built_in">stack</span>.pop(); <span class="hljs-comment">// c</span>
<span class="hljs-built_in">stack</span>.pop(); <span class="hljs-comment">// b</span>
<span class="hljs-built_in">stack</span>.pop(); <span class="hljs-comment">// a</span>
</code></pre><p>最先被加入进去的元素 a 直到最后才被弹出。栈也可以通过链表来实现，对应方法的时间复杂度是一样的。</p>
<p>这就是栈的全部内容啦！</p>
<h1>Queues</h1>
<p>队列是一种越先被添加的元素，越先被出列的数据结构。也就是先进先出（FIFO）。就如现实中排成一条队的人们一样，先排队的先被服务（也就是出列）。</p>
<p><img src="https://p0.ssl.qhimg.com/t01e5260f21b4a65ca5.jpg" alt="" title="Queue: enqueue and dequeue"></p>
<p>可以通过数组来实现一个队列，代码与栈的实现相类似。</p>
<h2>通过数组实现队列</h2>
<p>通过 <code>Array.push</code> 与 <code>Array.shift</code> 可以实现一个简单（译者注：即不是最优的实现方式）的队列：</p>
<pre><code class="hljs routeros">class<span class="hljs-built_in"> Queue </span>{
  constructor() {
    this.input = [];
  }
  <span class="hljs-builtin-name">add</span>(element) {
    this.input.push(element);
  }
  <span class="hljs-builtin-name">remove</span>() {
    return this.input.shift();
  }
}
</code></pre><p><code>Queue.add</code> 与 <code>Queue.remove</code> 的时间复杂度是什么呢？</p>
<ul>
<li><code>Queue.add</code>  使用 <code>Array.push</code> 实现，可以在恒定时间内完成。这非常不错！</li>
<li><code>Queue.remove</code> 使用 <code>Array.shift</code> 实现，<code>Array.shift</code> 耗时是线性的（即  <em>O(n)</em>）。我们可以减少 <code>Queue.remove</code> 的耗时吗？ </li>
</ul>
<p>试想一下，如果只用 <code>Array.push</code> 与 <code>Array.pop</code> 能实现一个队列吗？</p>
<pre><code class="hljs kotlin"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Queue</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.input = [];
    <span class="hljs-keyword">this</span>.output = [];
  }
  add(element) {
    <span class="hljs-keyword">this</span>.input.push(element);
  }
  remove() {
    <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.output.length) {
      <span class="hljs-keyword">while</span>(<span class="hljs-keyword">this</span>.input.length) {
        <span class="hljs-keyword">this</span>.output.push(<span class="hljs-keyword">this</span>.input.pop());
      }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.output.pop();
  }
}
</code></pre><p>现在，我们使用两个而不是一个数组来实现一个队列。</p>
<pre><code class="hljs cpp"><span class="hljs-keyword">const</span> <span class="hljs-built_in">queue</span> = <span class="hljs-keyword">new</span> Queue();
<span class="hljs-built_in">queue</span>.add(<span class="hljs-string">'a'</span>);
<span class="hljs-built_in">queue</span>.add(<span class="hljs-string">'b'</span>);
<span class="hljs-built_in">queue</span>.remove() <span class="hljs-comment">// a</span>
<span class="hljs-built_in">queue</span>.add(<span class="hljs-string">'c'</span>);
<span class="hljs-built_in">queue</span>.remove() <span class="hljs-comment">// b</span>
<span class="hljs-built_in">queue</span>.remove() <span class="hljs-comment">// c</span>
</code></pre><p>当我们第一次执行出列操作时，<code>output</code> 数组是空的，因此将 <code>input</code> 数组的内容反向添加到 <code>output</code> 中，此时 <code>output</code> 的值是 <code>['b', 'a']</code>。然后再从 <code>output</code> 中弹出元素。正如你所看到的，通过这个技巧实现的队列，元素输出的顺序也是先进先出（FIFO）的。</p>
<p>那时间复杂度是什么呢？</p>
<p>如果 <code>output</code> 数组已经有元素了，那么出列操作就是恒定的 <em>O(1)</em>。而当 <code>output</code> 需要被填充（即里面没有元素）时，时间复杂度变为 <em>O(n)</em>。<code>output</code> 被填充后，出列操作耗时再次变为恒定。因此分摊后是 <em>O(1)</em>。</p>
<p>也可以通过链表来实现队列，相关操作耗时也是恒定的。下一节将带来具体的实现。</p>
<h2>通过双向链表实现队列</h2>
<p>如果希望队列有最好的性能，就需要通过双向链表而不是数组来实现（译者注：并非数组实现就完全不好，空间上双向链表就不占优势，还是具体问题具体分析）。</p>
<pre><code class="hljs kotlin">const LinkedList = require(<span class="hljs-string">'../linked-lists/linked-list'</span>);
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Queue</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.input = new LinkedList();
  }
  add(element) {
    <span class="hljs-keyword">this</span>.input.addFirst(element);
  }
  remove() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.input.removeLast();
  }
  <span class="hljs-keyword">get</span> size() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.input.size;
  }
}
</code></pre><p>通过双向链表实现的队列，我们持有（双向链表中）首个与最后一个节点的引用，因此入列与出列的时间复杂度都是 <em>O(1)</em>。这就是为遇到的问题选择合适数据结构的重要性 💪。</p>
<h1>总结</h1>
<p>我们讨论了大部分线性的数据结构。可以看出，根据实现方法的不同，相同的数据结构也会有不同的时间复杂度。</p>
<p>以下是本文讨论内容的总结：</p>
<p><strong>时间复杂度</strong></p>
<p>* = 运行时分摊</p>
<table>
<thead>
<tr>
<th>数据结构</th>
<th>插入</th>
<th>访问</th>
<th>查找</th>
<th>删除</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Array</strong></td>
<td><em>O(n)</em></td>
<td><em>O(1)</em></td>
<td><em>O(n)</em></td>
<td><em>O(n)</em></td>
<td>插入最后位置复杂度为  <em>O(1)</em>。</td>
</tr>
<tr>
<td>(Hash)<strong>Map</strong></td>
<td><em>O(1)*</em></td>
<td><em>O(1)*</em></td>
<td><em>O(1)*</em></td>
<td><em>O(1)*</em></td>
<td>重新计算哈希会影响插入时间。</td>
</tr>
<tr>
<td><strong>Map</strong></td>
<td><em>O(log(n))</em></td>
<td>-</td>
<td><em>O(log(n))</em></td>
<td><em>O(log(n))</em></td>
<td>通过二叉搜索树实现</td>
</tr>
<tr>
<td><strong>Set</strong>（使用 HashMap）</td>
<td><em>O(1）*</em></td>
<td>-</td>
<td><em>O(1)*</em></td>
<td><em>O(1)*</em></td>
<td>由 HashMap 实现</td>
</tr>
<tr>
<td><strong>Set</strong> (使用 List)</td>
<td><em><a href="https://www.ecma-international.org/ecma-262/6.0/#sec-set.prototype.add">O(n)</a></em></td>
<td>-</td>
<td><em><a href="https://www.ecma-international.org/ecma-262/6.0/#sec-set.prototype.has">O(n)</a>]</em></td>
<td><em><a href="https://www.ecma-international.org/ecma-262/6.0/#sec-set.prototype.delete">O(n)</a></em></td>
<td>通过 List 实现</td>
</tr>
<tr>
<td><strong>Set</strong> (使用二叉搜索树)</td>
<td><em>O(log(n))</em></td>
<td>-</td>
<td><em>O(log(n))</em></td>
<td><em>O(log(n))</em></td>
<td>通过二叉搜索树实现</td>
</tr>
<tr>
<td><strong>Linked List</strong> (单向)</td>
<td><em>O(n)</em></td>
<td>-</td>
<td><em>O(n)</em></td>
<td><em>O(n)</em></td>
<td>在起始位置添加或删除元素，复杂度为  <em>O(1)</em></td>
</tr>
<tr>
<td><strong>Linked List</strong> (双向）</td>
<td><em>O(n)</em></td>
<td>-</td>
<td><em>O(n)</em></td>
<td><em>O(n)</em></td>
<td>在起始或结尾添加或删除元素，复杂度为  <em>O(1)</em>。然而在其他位置是  <em>O(n)</em>。</td>
</tr>
<tr>
<td><strong>Stack</strong> (由 Array 实现)</td>
<td><em>O(1)</em></td>
<td>-</td>
<td>-</td>
<td><em>O(1)]</em></td>
<td>插入与删除都遵循与后进先出（LIFO）</td>
</tr>
<tr>
<td><strong>Queue</strong> (简单地由 Array 实现)</td>
<td><em>O(n)</em></td>
<td>-</td>
<td>-</td>
<td><em>O(1)</em></td>
<td>插入（Array.shift）操作的复杂度是 <em>O(n)</em></td>
</tr>
<tr>
<td><strong>Queue</strong> (由 Array 实现，但进行了改进)</td>
<td><em>O(1)*</em></td>
<td>-</td>
<td>-</td>
<td><em>O(1)</em></td>
<td>插入操作的最差情况复杂度是 <em>O(n)</em>。然而分摊后是 <em>O(1)</em></td>
</tr>
<tr>
<td><strong>Queue</strong> (由 List 实现)</td>
<td><em>O(1)</em></td>
<td>-</td>
<td>-</td>
<td><em>O(1)</em></td>
<td>使用双向链表</td>
</tr>
</tbody>
</table>
<p>注意： <strong>二叉搜索树</strong> 与其他树结构、图结构，将在另一篇文章中讨论。</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/data-structures-for-beginners-arrays-hashmaps-and-lists](https://www.zcfy.cc/article/data-structures-for-beginners-arrays-hashmaps-and-lists)
原文标题: 初学者应该了解的数据结构：Array、HashMap 与 List
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
