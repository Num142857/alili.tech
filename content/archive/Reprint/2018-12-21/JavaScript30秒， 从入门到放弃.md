---
title: 'JavaScript30秒， 从入门到放弃' 
date: 2018-12-21 2:30:11
hidden: true
slug: nzqbz1ylkus
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">有意思</h1>
<p>最近很火的<code>github</code>上的库<a href="https://github.com/Chalarangelo/30-seconds-of-code" rel="nofollow noreferrer" target="_blank"><code>30-seconds-of-code</code></a>，特别有意思，代码也很优雅。</p>
<ol>
<li>能学es6</li>
<li>自己翻译，能学英语</li>
<li>代码很美，很优雅，美即正义</li>
<li>函数式表达，享受</li>
</ol>
<h2 id="articleHeader1">arrayGcd</h2>
<blockquote>
<p>Calculates the greatest common denominator (gcd) of an array of numbers.</p>
<p>Use <code>Array.reduce()</code> and the <code>gcd</code> formula (uses recursion) to calculate the greatest common denominator of an array of numbers.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arrayGcd = arr =>{
  const gcd = (x, y) => !y ? x : gcd(y, x % y);
  return arr.reduce((a,b) => gcd(a,b));
}
// arrayGcd([1,2,3,4,5]) -> 1
// arrayGcd([4,8,12]) -> 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> arrayGcd = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span>{
  <span class="hljs-keyword">const</span> gcd = <span class="hljs-function">(<span class="hljs-params">x, y</span>) =&gt;</span> !y ? x : gcd(y, x % y);
  <span class="hljs-keyword">return</span> arr.reduce(<span class="hljs-function">(<span class="hljs-params">a,b</span>) =&gt;</span> gcd(a,b));
}
<span class="hljs-comment">// arrayGcd([1,2,3,4,5]) -&gt; 1</span>
<span class="hljs-comment">// arrayGcd([4,8,12]) -&gt; 4</span></code></pre>
</blockquote>
<p>计算数组的最大公约数。</p>
<p>使用<code>Array.reduce()</code>和<code>gcd</code>公式(使用递归)来计算一个数组的最大公约数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="➜  code cat arrayGcd.js
const arrayGcd = arr => {
    const gcd = (x, y) => !y ? x : gcd(y, x % y);
    return arr.reduce((a, b) => gcd(a, b));
}

console.log(arrayGcd([1, 2, 3, 4, 5]));
console.log(arrayGcd([4, 8, 12]));
➜  code node arrayGcd.js
1
4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">➜  code cat arrayGcd.js
<span class="hljs-keyword">const</span> arrayGcd = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> gcd = <span class="hljs-function">(<span class="hljs-params">x, y</span>) =&gt;</span> !y ? x : gcd(y, x % y);
    <span class="hljs-keyword">return</span> arr.reduce(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> gcd(a, b));
}

<span class="hljs-built_in">console</span>.log(arrayGcd([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]));
<span class="hljs-built_in">console</span>.log(arrayGcd([<span class="hljs-number">4</span>, <span class="hljs-number">8</span>, <span class="hljs-number">12</span>]));
➜  code node arrayGcd.js
<span class="hljs-number">1</span>
<span class="hljs-number">4</span></code></pre>
<p><code>gcd</code>即欧几里德算法，具体不表，自查。这里用到了数组的reduce方法，相当简洁，reduce不太了解的话，看下<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce" rel="nofollow noreferrer" target="_blank">mdn</a>就明白。</p>
<h2 id="articleHeader2">arrayLcm</h2>
<blockquote>
<p>Calculates the lowest common multiple (lcm) of an array of numbers.</p>
<p>Use <code>Array.reduce()</code> and the <code>lcm</code> formula (uses recursion) to calculate the lowest common multiple of an array of numbers.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arrayLcm = arr =>{
 const gcd = (x, y) => !y ? x : gcd(y, x % y);
 const lcm = (x, y) => (x*y)/gcd(x, y) 
 return arr.reduce((a,b) => lcm(a,b));
}
// arrayLcm([1,2,3,4,5]) -> 60
// arrayLcm([4,8,12]) -> 24" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> arrayLcm = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span>{
 <span class="hljs-keyword">const</span> gcd = <span class="hljs-function">(<span class="hljs-params">x, y</span>) =&gt;</span> !y ? x : gcd(y, x % y);
 <span class="hljs-keyword">const</span> lcm = <span class="hljs-function">(<span class="hljs-params">x, y</span>) =&gt;</span> (x*y)/gcd(x, y) 
 <span class="hljs-keyword">return</span> arr.reduce(<span class="hljs-function">(<span class="hljs-params">a,b</span>) =&gt;</span> lcm(a,b));
}
<span class="hljs-comment">// arrayLcm([1,2,3,4,5]) -&gt; 60</span>
<span class="hljs-comment">// arrayLcm([4,8,12]) -&gt; 24</span></code></pre>
</blockquote>
<p>计算一个数组的最小公倍数。</p>
<p>使用<code>Array.reduce()</code>和<code>lcm</code>公式(使用递归)来计算一个数组的最大公约数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="➜  code cat arrayLcm.js
const arrayLcm = arr => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const lcm = (x, y) => x * y / gcd(x, y);
  return arr.reduce((a, b) => lcm(a, b));
};

console.log(arrayLcm([1, 2, 3, 4, 5]));
console.log(arrayLcm([4, 8, 12]));
➜  code node arrayLcm.js
60
24" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">➜  code cat arrayLcm.js
<span class="hljs-keyword">const</span> arrayLcm = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> gcd = <span class="hljs-function">(<span class="hljs-params">x, y</span>) =&gt;</span> (!y ? x : gcd(y, x % y));
  <span class="hljs-keyword">const</span> lcm = <span class="hljs-function">(<span class="hljs-params">x, y</span>) =&gt;</span> x * y / gcd(x, y);
  <span class="hljs-keyword">return</span> arr.reduce(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> lcm(a, b));
};

<span class="hljs-built_in">console</span>.log(arrayLcm([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]));
<span class="hljs-built_in">console</span>.log(arrayLcm([<span class="hljs-number">4</span>, <span class="hljs-number">8</span>, <span class="hljs-number">12</span>]));
➜  code node arrayLcm.js
<span class="hljs-number">60</span>
<span class="hljs-number">24</span></code></pre>
<p><code>lcm</code>算法用到了前面的<code>gcd</code>算法，关键点是两个数的最大公约数和最小公倍数的乘积正好就是这两个数的乘积。</p>
<h2 id="articleHeader3">arrayMax</h2>
<blockquote>
<p>Returns the maximum value in an array.</p>
<p>Use <code>Math.max()</code> combined with the spread operator (<code>...</code>) to get the maximum value in the array.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arrayMax = arr => Math.max(...arr);
// arrayMax([10, 1, 5]) -> 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> arrayMax = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> <span class="hljs-built_in">Math</span>.max(...arr);
<span class="hljs-comment">// arrayMax([10, 1, 5]) -&gt; 10</span></code></pre>
</blockquote>
<p>返回数组中最大的值。</p>
<p>使用<code>Math.max()</code>和<code>ES6</code>的扩展运算符<code>…</code>返回数组中最大的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="➜  code cat arrayMax.js
const arrayMax = arr => Math.max(...arr);

console.log(arrayMax([10, 1, 5]));
➜  code node arrayMax.js
10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">➜  code cat arrayMax.js
<span class="hljs-keyword">const</span> arrayMax = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> <span class="hljs-built_in">Math</span>.max(...arr);

<span class="hljs-built_in">console</span>.log(arrayMax([<span class="hljs-number">10</span>, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>]));
➜  code node arrayMax.js
<span class="hljs-number">10</span></code></pre>
<p>实际上就是<code>Math.max()</code>干的事，没啥可说的了。</p>
<h2 id="articleHeader4">arrayMin</h2>
<blockquote>
<p>Returns the minimum value in an array.</p>
<p>Use <code>Math.min()</code> combined with the spread operator (<code>...</code>) to get the minimum value in the array.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arrayMin = arr => Math.min(...arr);
// arrayMin([10, 1, 5]) -> 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> arrayMin = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> <span class="hljs-built_in">Math</span>.min(...arr);
<span class="hljs-comment">// arrayMin([10, 1, 5]) -&gt; 1</span></code></pre>
</blockquote>
<p>返回数组中最小的值。</p>
<p>使用<code>Math.min()</code>和<code>ES6</code>的扩展运算符<code>…</code>返回数组中最小的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="➜  code cat arrayMin.js
const arrayMin = arr => Math.min(...arr);

console.log(arrayMin([10, 1, 5]));
➜  code node arrayMin.js
1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">➜  code cat arrayMin.js
<span class="hljs-keyword">const</span> arrayMin = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> <span class="hljs-built_in">Math</span>.min(...arr);

<span class="hljs-built_in">console</span>.log(arrayMin([<span class="hljs-number">10</span>, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>]));
➜  code node arrayMin.js
<span class="hljs-number">1</span></code></pre>
<p>实际上就是<code>Math.min()</code>干的事，没啥可说的了。</p>
<h2 id="articleHeader5">chunk</h2>
<blockquote>
<p>Chunks an array into smaller arrays of a specified size.</p>
<p>Use <code>Array.from()</code> to create a new array, that fits the number of chunks that will be produced. Use <code>Array.slice()</code> to map each element of the new array to a chunk the length of <code>size</code>. If the original array can't be split evenly, the final chunk will contain the remaining elements.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const chunk = (arr, size) =>
 Array.from({length: Math.ceil(arr.length / size)}, (v, i) => arr.slice(i * size, i * size + size));
// chunk([1,2,3,4,5], 2) -> [[1,2],[3,4],[5]]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> chunk = <span class="hljs-function">(<span class="hljs-params">arr, size</span>) =&gt;</span>
 <span class="hljs-built_in">Array</span>.from({<span class="hljs-attr">length</span>: <span class="hljs-built_in">Math</span>.ceil(arr.length / size)}, (v, i) =&gt; arr.slice(i * size, i * size + size));
<span class="hljs-comment">// chunk([1,2,3,4,5], 2) -&gt; [[1,2],[3,4],[5]]</span></code></pre>
</blockquote>
<p>按照给定的<code>size</code>将一个数组切分成含有<code>size</code>个数的更小数组块的数组。</p>
<p>使用<code>Array.from()</code>生产新的符合定义的数组。使用<code>Array.slice()</code>来截取指定<code>size</code>个元素组成新的数组块。如果原数组长度不能被<code>size</code>整除，最后的剩余的那些元素将归属于最后一个块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="➜  code cat chunk.js
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

console.log(chunk([1, 2, 3, 4, 5], 2));
➜  code node chunk.js
[ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">➜  code cat chunk.js
<span class="hljs-keyword">const</span> chunk = <span class="hljs-function">(<span class="hljs-params">arr, size</span>) =&gt;</span>
  <span class="hljs-built_in">Array</span>.from({ <span class="hljs-attr">length</span>: <span class="hljs-built_in">Math</span>.ceil(arr.length / size) }, (v, i) =&gt;
    arr.slice(i * size, i * size + size)
  );

<span class="hljs-built_in">console</span>.log(chunk([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>], <span class="hljs-number">2</span>));
➜  code node chunk.js
[ [ <span class="hljs-number">1</span>, <span class="hljs-number">2</span> ], [ <span class="hljs-number">3</span>, <span class="hljs-number">4</span> ], [ <span class="hljs-number">5</span> ] ]</code></pre>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from" rel="nofollow noreferrer" target="_blank"><code>Array.from(arrayLike, mapFn, thisArg)</code></a>这个方法呢，第一个参数是一个类数组或者可迭代的对象，第二个参数是一个应用在每一个数组元素上的方法，第三个参数就是改变<code>this</code>的指向了。通俗说就是指定谁是你的爸爸。</p>
<p>这里用了一个<code>{ length: Math.ceil(arr.length / size) }</code>迭代对象，<code>length</code>指定了迭代次数，即按照<code>size</code>分块后的数组长度，正好就是原数组长度除以<code>size</code>向上取整的值。向上取整就是为了满足不能完全整除的情况。比如5个元素按照2个一组进行分块，分了两组两个元素的，剩最后一个元素成了独立组，总长为3。</p>
<p><code>(v, i)</code>，由于迭代的时候数组在每一个位置上都是以<code>undefined</code>初始化的，所以<code>v</code>一直都是<code>undefined</code>。</p>
<p><code>arr.slice(i * size, i * size + size)</code>迭代过程中每次截取<code>size</code>个数的元素组成新数组。这里的<code>i</code>就是随着迭代变化，比如<code>length</code>是3，<code>i</code>就是0，1，2。</p>
<p>这里的迭代类似<code>python</code>里的<code>range</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="➜  code python
Python 3.6.4 (default, Dec 23 2017, 10:37:40)
[GCC 4.2.1 Compatible Apple LLVM 9.0.0 (clang-900.0.39.2)] on darwin
Type &quot;help&quot;, &quot;copyright&quot;, &quot;credits&quot; or &quot;license&quot; for more information.
>>> import math
>>> arr = [1,2,3,4,5]
>>> size = 2
>>> for i in range(math.ceil(len(arr) / size)):
...     print('index: ', i)
...
index:  0
index:  1
index:  2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="python hljs"><code class="python">➜  code python
Python <span class="hljs-number">3.6</span><span class="hljs-number">.4</span> (default, Dec <span class="hljs-number">23</span> <span class="hljs-number">2017</span>, <span class="hljs-number">10</span>:<span class="hljs-number">37</span>:<span class="hljs-number">40</span>)
[GCC <span class="hljs-number">4.2</span><span class="hljs-number">.1</span> Compatible Apple LLVM <span class="hljs-number">9.0</span><span class="hljs-number">.0</span> (clang<span class="hljs-number">-900.0</span><span class="hljs-number">.39</span><span class="hljs-number">.2</span>)] on darwin
Type <span class="hljs-string">"help"</span>, <span class="hljs-string">"copyright"</span>, <span class="hljs-string">"credits"</span> <span class="hljs-keyword">or</span> <span class="hljs-string">"license"</span> <span class="hljs-keyword">for</span> more information.
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">import</span> math
<span class="hljs-meta">&gt;&gt;&gt; </span>arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>]
<span class="hljs-meta">&gt;&gt;&gt; </span>size = <span class="hljs-number">2</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> range(math.ceil(len(arr) / size)):
<span class="hljs-meta">... </span>    print(<span class="hljs-string">'index: '</span>, i)
...
index:  <span class="hljs-number">0</span>
index:  <span class="hljs-number">1</span>
index:  <span class="hljs-number">2</span></code></pre>
<h2 id="articleHeader6">compact</h2>
<blockquote>
<p>Removes falsey values from an array.</p>
<p>Use <code>Array.filter()</code> to filter out falsey values (<code>false</code>, <code>null</code>, <code>0</code>, <code>""</code>, <code>undefined</code>, and <code>NaN</code>).</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const compact = arr => arr.filter(Boolean);
// compact([0, 1, false, 2, '', 3, 'a', 'e'*23, NaN, 's', 34]) -> [ 1, 2, 3, 'a', 's', 34 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>const compact = arr =&gt; arr.filter(Boolean);
<span class="hljs-regexp">//</span> compact([<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-keyword">false</span>, <span class="hljs-number">2</span>, <span class="hljs-string">''</span>, <span class="hljs-number">3</span>, <span class="hljs-string">'a'</span>, <span class="hljs-string">'e'</span>*<span class="hljs-number">23</span>, NaN, <span class="hljs-string">'s'</span>, <span class="hljs-number">34</span>]) -&gt; [ <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-string">'a'</span>, <span class="hljs-string">'s'</span>, <span class="hljs-number">34</span> ]</code></pre>
</blockquote>
<p>移除掉数组里<code>falsey</code>的元素。（这个<code>falsey</code>不太好翻译，不是错误的意思，而是该值布尔运算值为<code>false</code>的意思，我个人常用<code>!!</code>进行判断）。</p>
<p>使用<code>Array.filter()</code>把<code>false</code>、<code>null</code>、<code>0</code>、<code>""</code>、<code>undefined</code>和<code>NaN</code>这些<code>falsey</code>过滤掉。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="➜  code cat compact.js
const compact = arr => arr.filter(Boolean);

console.log(compact([0, 1, false, 2, &quot;&quot;, 3, &quot;a&quot;, &quot;e&quot; * 23, NaN, &quot;s&quot;, 34]));
➜  code node compact.js
[ 1, 2, 3, 'a', 's', 34 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">➜  code cat compact.js
<span class="hljs-keyword">const</span> compact = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> arr.filter(<span class="hljs-built_in">Boolean</span>);

<span class="hljs-built_in">console</span>.log(compact([<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-literal">false</span>, <span class="hljs-number">2</span>, <span class="hljs-string">""</span>, <span class="hljs-number">3</span>, <span class="hljs-string">"a"</span>, <span class="hljs-string">"e"</span> * <span class="hljs-number">23</span>, <span class="hljs-literal">NaN</span>, <span class="hljs-string">"s"</span>, <span class="hljs-number">34</span>]));
➜  code node compact.js
[ <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-string">'a'</span>, <span class="hljs-string">'s'</span>, <span class="hljs-number">34</span> ]</code></pre>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" rel="nofollow noreferrer" target="_blank"><code>Array.prototype.filter()</code></a>干的，没啥好说。</p>
<h2 id="articleHeader7">countOccurrences</h2>
<blockquote>
<p>Counts the occurrences of a value in an array.</p>
<p>Use <code>Array.reduce()</code> to increment a counter each time you encounter the specific value inside the array.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const countOccurrences = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);
// countOccurrences([1,1,2,1,2,3], 1) -> 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>const countOccurrences = <span class="hljs-function"><span class="hljs-params">(arr, value)</span> =&gt;</span> arr.reduce(<span class="hljs-function"><span class="hljs-params">(a, v)</span> =&gt;</span> v === value ? a + <span class="hljs-number">1</span> : a + <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
<span class="hljs-regexp">//</span> countOccurrences([<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>], <span class="hljs-number">1</span>) -&gt; <span class="hljs-number">3</span></code></pre>
</blockquote>
<p>统计一个元素在一个数组中出现的次数。</p>
<p>使用<code>Array.reduce()</code>在遍历过程中如果指定元素在数组中出现，则增加它的次数值，默认次数为0。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="➜  code cat countOccurrences.js
const countOccurrences = (arr, value) =>
  arr.reduce((a, v) => (v === value ? a + 1 : a + 0), 0);

console.log(countOccurrences([1, 1, 2, 1, 2, 3], 1));
console.log(countOccurrences([1, 1, 2, 1, 2, 3], 5));
➜  code node countOccurrences.js
3
0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">➜  code cat countOccurrences.js
<span class="hljs-keyword">const</span> countOccurrences = <span class="hljs-function">(<span class="hljs-params">arr, value</span>) =&gt;</span>
  arr.reduce(<span class="hljs-function">(<span class="hljs-params">a, v</span>) =&gt;</span> (v === value ? a + <span class="hljs-number">1</span> : a + <span class="hljs-number">0</span>), <span class="hljs-number">0</span>);

<span class="hljs-built_in">console</span>.log(countOccurrences([<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], <span class="hljs-number">1</span>));
<span class="hljs-built_in">console</span>.log(countOccurrences([<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], <span class="hljs-number">5</span>));
➜  code node countOccurrences.js
<span class="hljs-number">3</span>
<span class="hljs-number">0</span></code></pre>
<p>三元运算符<code>(v === value ? a + 1 : a + 0)</code>遍历过程中判断遍历数组值<code>v</code>是否严格等于指定值<code>value</code>，是，次数<code>a+1</code>；否，<code>a+0</code>。</p>
<p>最后的一个逗号后面的0，是这个初始值，即<code>a=0</code>，这个懂<code>reduce</code>方法都知道，特别指出是，因为这个函数一定会有返回值，如果指定元素没有在数组中出现一次，返回值是<code>0</code>，所以必须得初始化为<code>0</code>。</p>
<h2 id="articleHeader8">deepFlatten</h2>
<blockquote>
<p>Deep flattens an array.</p>
<p>Use recursion. Use <code>Array.concat()</code> with an empty array (<code>[]</code>) and the spread operator (<code>...</code>) to flatten an array. Recursively flatten each element that is an array.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const deepFlatten = arr => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v));
// deepFlatten([1,[2],[[3],4],5]) -> [1,2,3,4,5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> deepFlatten = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> [].concat(...arr.map(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> <span class="hljs-built_in">Array</span>.isArray(v) ? deepFlatten(v) : v));
<span class="hljs-comment">// deepFlatten([1,[2],[[3],4],5]) -&gt; [1,2,3,4,5]</span></code></pre>
</blockquote>
<p>深度摊平一个数组。</p>
<p>使用递归方法。结合<code>Array.concat()</code>、空数组<code>[]</code>和<code>ES6</code>的扩展运算符<code>…</code>来摊平一个数组，如果摊平的元素还是一个数组，就再递归运用该方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="➜  code cat deepFlatten.js
const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

console.log(deepFlatten([1, [2], [[3], 4], 5]));
➜  code node deepFlatten.js
[ 1, 2, 3, 4, 5 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">➜  code cat deepFlatten.js
<span class="hljs-keyword">const</span> deepFlatten = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span>
  [].concat(...arr.map(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> (<span class="hljs-built_in">Array</span>.isArray(v) ? deepFlatten(v) : v)));

<span class="hljs-built_in">console</span>.log(deepFlatten([<span class="hljs-number">1</span>, [<span class="hljs-number">2</span>], [[<span class="hljs-number">3</span>], <span class="hljs-number">4</span>], <span class="hljs-number">5</span>]));
➜  code node deepFlatten.js
[ <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span> ]</code></pre>
<p>三元运算符<code>(Array.isArray(v) ? deepFlatten(v) : v)</code>判断<code>v</code>是否是一个数组，是，返回递归运用<code>deepFlatten(v)</code>后的值；否，直接返回<code>v</code>。</p>
<p><code>[].concat(...arr.map(fn))</code>用空数组把<code>map</code>运算产生的数组进行<code>…</code>扩展运算值拼接成结果数组返回。</p>
<p>该方法是深度摊平方法，在很多时候还有特定的摊平一层的需求，<code>underscore</code>就有。实现的方法就是再加一个标志参数进行处理即可。具体不讲了。</p>
<p><strong>应该会写一个系列，今天先写到这，明天继续。</strong></p>
<p><strong>个人翻译水平有限，欢迎大家在issues上批评指正。<a href="https://github.com/hongmaoxiao/myblog/issues/5" rel="nofollow noreferrer" target="_blank">JavaScript30秒， 从入门到放弃</a></strong><br><strong>博客地址：<a href="https://fengxiaomao.com/#/article/30" rel="nofollow noreferrer" target="_blank">JavaScript30秒， 从入门到放弃</a></strong><br><strong>微信公众号地址：<a href="https://mp.weixin.qq.com/s?__biz=MzIyMTU5NDI5Ng==&amp;mid=2247483669&amp;idx=1&amp;sn=e73679814031eb5e79065cbe2d48e785&amp;chksm=e83b16c2df4c9fd4823d6f145f9a5d3f63ca60e92698221278053542600004dbad9c01a4fbc9&amp;mpshare=1&amp;scene=1&amp;srcid=12246sHBtaVszHrSVqddAdYO&amp;pass_ticket=eZiOD2XmKf2dYauHKu3Wf8pbq5MU8XUZNd3%2BtcueCZkZU%2BWk0QAFtcyU0z0SPlIz#rd" rel="nofollow noreferrer" target="_blank">JavaScript30秒， 从入门到放弃</a></strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript30秒， 从入门到放弃

## 原文链接
[https://segmentfault.com/a/1190000012558748](https://segmentfault.com/a/1190000012558748)

