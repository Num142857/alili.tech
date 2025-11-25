---
title: 'JS 数组循环遍历方法的对比' 
date: 2018-12-15 2:30:11
hidden: true
slug: jpc2qkbwkf
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bV2QTD?w=1600&amp;h=500" src="https://static.alili.tech/img/bV2QTD?w=1600&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">前言</h2>
<p>JavaScript 发展至今已经发展出多种数组的循环遍历的方法,不同的遍历方法运行起来那个比较快,不同循环方法使用在那些场景,下面将进行比较:</p>
<h2 id="articleHeader1">各种数组遍历的方法</h2>
<h3 id="articleHeader2">
<strong><code>for</code></strong> 语句</h3>
<p>代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,4,6]
for(var i = 0, len = arr.length; i < len; i++){
    console.log(arr[i])
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">4</span>,<span class="hljs-number">6</span>]
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = arr.length; i &lt; len; i++){
    <span class="hljs-built_in">console</span>.log(arr[i])
}</code></pre>
<p>这是标准for循环的写法也是最传统的语句，字符串也支持，定义一个变量i作为索引，以跟踪访问的位置，len是数组的长度，条件就是i不能超过len。</p>
<h3 id="articleHeader3">
<strong><code>forEach</code></strong> 语句</h3>
<p><code>forEach</code> 方法对数组的每个元素执行一次提供的CALLBACK函数,forEach是一个数组方法，可以用来把一个函数套用在一个数组中的每个元素上，<code>forEach</code>为每个数组元素执行callback函数只可用于数组.遍历一个数组让数组每个元素做一件事情.那些已删除（使用delete方法等情况）或者未初始化的项将被跳过（但不包括那些值为 undefined 的项）（例如在稀疏数组上)；不像map() 或者reduce() ，它总是返回 undefined值，并且不可链式调用。典型用例是在一个链的最后执行副作用。</p>
<p>代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,5,8,9]
arr.forEach(function(item) {
    console.log(item);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">5</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>]
arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
    <span class="hljs-built_in">console</span>.log(item);
})</code></pre>
<h3 id="articleHeader4">
<strong><code>for-in</code></strong> 语句</h3>
<p>一般会使用<code>for-in</code>来遍历对象的属性的,不过属性需要 <strong><code>enumerable</code></strong>,才能被读取到.<br><code>for-in</code> 循环只遍历可枚举属性。一般常用来遍历对象，包括非整数类型的名称和继承的那些原型链上面的属性也能被遍历。像 Array和 Object使用内置构造函数所创建的对象都会继承自Object.prototype和String.prototype的不可枚举属性就不能遍历了.</p>
<p>代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    name: 'test',
    color: 'red',
    day: 'sunday',
    number: 5
}
for (var key in obj) {
    console.log(obj[key])
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'test'</span>,
    <span class="hljs-attr">color</span>: <span class="hljs-string">'red'</span>,
    <span class="hljs-attr">day</span>: <span class="hljs-string">'sunday'</span>,
    <span class="hljs-attr">number</span>: <span class="hljs-number">5</span>
}
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj) {
    <span class="hljs-built_in">console</span>.log(obj[key])
}</code></pre>
<h3 id="articleHeader5">
<strong><code>for-of</code></strong> 语句 (ES 6)</h3>
<p><code>for-of</code>语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句。只要是一个iterable的对象,就可以通过<code>for-of</code>来迭代.</p>
<p>代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [{name:'bb'},5,'test']
for (item of arr) {
    console.log(item)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> arr = [{<span class="hljs-attr">name</span>:<span class="hljs-string">'bb'</span>},<span class="hljs-number">5</span>,<span class="hljs-string">'test'</span>]
<span class="hljs-keyword">for</span> (item <span class="hljs-keyword">of</span> arr) {
    <span class="hljs-built_in">console</span>.log(item)
}</code></pre>
<h3 id="articleHeader6">
<code>for-of</code> 和 <code>for-in</code> 的区别</h3>
<p><code>for-in</code> 语句以原始插入顺序迭代对象的可枚举属性。<code>for-in</code>会把继承链的对象属性都会遍历一遍,所以会更花时间.</p>
<p><code>for-of</code> 语句只遍历可迭代对象的数据。</p>
<h2 id="articleHeader7">Other 循环方法</h2>
<h3 id="articleHeader8">
<strong><code>map</code></strong> 方法 (不改变原数组)</h3>
<p><code>map</code> 方法会给原数组中的每个元素都按顺序调用一次  callback 函数。callback 每次执行后的返回值（包括 undefined）组合起来形成一个新数组。 callback 函数只会在有值的索引上被调用；那些从来没被赋过值或者使用 delete 删除的索引则不会被调用。让数组通过某种计算产生一个新数组,影射成一个新的数组,</p>
<p>代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3]
var firearr = arr.map(current => current * 5)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]
<span class="hljs-keyword">var</span> firearr = arr.map(<span class="hljs-function"><span class="hljs-params">current</span> =&gt;</span> current * <span class="hljs-number">5</span>)</code></pre>
<h3 id="articleHeader9">
<strong><code>reduce</code></strong> 方法</h3>
<p>让数组中的前项和后项做某种计算,并累计最终值,</p>
<p>代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var wallets = [4,7.8,3]
var totalMoney = wallets.reduce( function (countedMoney, wallet) {
    return countedMoney + wallet.money;
}, 0)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> wallets = [<span class="hljs-number">4</span>,<span class="hljs-number">7.8</span>,<span class="hljs-number">3</span>]
<span class="hljs-keyword">var</span> totalMoney = wallets.reduce( <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">countedMoney, wallet</span>) </span>{
    <span class="hljs-keyword">return</span> countedMoney + wallet.money;
}, <span class="hljs-number">0</span>)</code></pre>
<h3 id="articleHeader10">
<strong><code>filter</code></strong> 方法 (不改变原数组)</h3>
<p><code>filter</code> 为数组中的每个元素调用一次 callback 函数，并利用所有使得 callback 返回 true 或 等价于 true 的值 的元素创建一个新数组。callback 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。那些没有通过 callback 测试的元素会被跳过，不会被包含在新数组中。筛选出过滤出数组中符合条件的项,组成新数组.</p>
<p>代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [2,3,4,5,6]
var morearr = arr.filter(function (number) {
    return number > 3
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]
<span class="hljs-keyword">var</span> morearr = arr.filter(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">number</span>) </span>{
    <span class="hljs-keyword">return</span> number &gt; <span class="hljs-number">3</span>
})</code></pre>
<h3 id="articleHeader11">
<strong><code>every</code></strong> 方法</h3>
<p>every 方法为数组中的每个元素执行一次 callback 函数，直到它找到一个使 callback 返回 false（表示可转换为布尔值 false 的值）的元素。如果发现了一个这样的元素，every 方法将会立即返回 false。否则，callback 为每一个元素返回 true，every 就会返回 true。检测数组中的每一项是否符合条件,如果每一项都符合条件,就会返回true,否则返回false,有点像遍历数组且操作callback。只会为那些已经被赋值的索引调用。不会为那些被删除或从来没被赋值的索引调用。</p>
<p>代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3,4,5]
var result = arr.every(function (item, index) {
    return item > 0
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>]
<span class="hljs-keyword">var</span> result = arr.every(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item, index</span>) </span>{
    <span class="hljs-keyword">return</span> item &gt; <span class="hljs-number">0</span>
})</code></pre>
<h3 id="articleHeader12">
<strong><code>some</code></strong> 方法</h3>
<p>some 为数组中的每一个元素执行一次 callback 函数，直到找到一个使得 callback 返回一个“真值”（即可转换为布尔值 true 的值）。如果找到了这样一个值，some 将会立即返回 true。否则，some 返回 false。callback 只会在那些”有值“的索引上被调用，不会在那些被删除或从来未被赋值的索引上调用。检查数组中是否有某些项符号条件,如果有一项就返回true,否则返回false,有点像遍历数组或者操作.</p>
<p>代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3,4,5]
var result = arr.some(function (item,index) {
    return item > 3
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>]
<span class="hljs-keyword">var</span> result = arr.some(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item,index</span>) </span>{
    <span class="hljs-keyword">return</span> item &gt; <span class="hljs-number">3</span>
})</code></pre>
<h2 id="articleHeader13">对比遍历速度</h2>
<p>对比这里我使用了<a href="https://jsperf.com/" rel="nofollow noreferrer" target="_blank">jsPerf平台</a>进行测试.</p>
<h3 id="articleHeader14">JavaScritp loop 对比</h3>
<p>我创建了两个数组进行对比,为什么要这样区别呢,因为不同类型的数组在javascript内存中保存的地址格式不一样,遍历的时候编辑器会根椐数组元素的类型长度计算,比如说如果数组里面全是Number类的,循环起来会比数组里面包含Number,String,Object混合型的会快,所以创建了两个数组,一个是全undefined数组,一个是混合型数组.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 一个是空数组
var nullarr = new Array(10000) // [undefined,undefined,...undefined]

// 另一个带不同类型的数据的数组
var dataarr = []
for(var i = 0; i < 10000; i++){
    if (i % 2 ===0) {
        dataarr[i] = i.toString()
    } else {
        dataarr[i = i
    }
}
dataarr // [1,'2',3...,10000]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 一个是空数组</span>
<span class="hljs-keyword">var</span> nullarr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">10000</span>) <span class="hljs-comment">// [undefined,undefined,...undefined]</span>

<span class="hljs-comment">// 另一个带不同类型的数据的数组</span>
<span class="hljs-keyword">var</span> dataarr = []
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10000</span>; i++){
    <span class="hljs-keyword">if</span> (i % <span class="hljs-number">2</span> ===<span class="hljs-number">0</span>) {
        dataarr[i] = i.toString()
    } <span class="hljs-keyword">else</span> {
        dataarr[i = i
    }
}
dataarr <span class="hljs-comment">// [1,'2',3...,10000]</span></code></pre>
<p>测试后发现有点奇怪直接检索空数组还是会比数据数组慢这是为什么呢奇怪?为了对比循环的一致性我只选其中带数据的数组<code>dataarr</code>进行测试.</p>
<p>那我们对比一下 <code>for</code> <code>for len</code> <code>forEach</code> <code>for-in</code> <code>for-of</code> <code>map</code> <code>filter</code> 循环的速度</p>
<p><span class="img-wrap"><img data-src="/img/bV2QTQ?w=1982&amp;h=1582" src="https://static.alili.tech/img/bV2QTQ?w=1982&amp;h=1582" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到 <code>for</code>循环的速度是最快的,是最老的循环,也是优化得最好的,其次是<code>for-of</code>这个是es6才新增的循环非常好用,最慢是<code>for-in</code>我们可以作一下速度排序</p>
<blockquote>
<code>for</code> &gt; <code>for-of</code> &gt; <code>forEach</code> &gt; <code>filter</code> &gt; <code>map</code> &gt; <code>for-in</code>
</blockquote>
<p>这很明显处理大量循环数据的时候还是要使用古老<code>for</code>循环效率最好,但也不是不使用<code>for-in</code>,其实很多时候都要根据实际应该场景的,<code>for-in</code>更多使用在遍历对象属性上面,<code>for-in</code>在遍历的过程中还会遍历继承链,所以这就是它效率比较慢的原因,比如<code>map</code> 速率不高,不过处理在Es6实现数组功能上面非常好用方便,轻松影射创建新数组.或者例如使用<a href="http://es6.ruanyifeng.com/#docs/iterator" rel="nofollow noreferrer" target="_blank"><strong>Iterator</strong></a>属性也是行的,所以每个循环都有合适使用的地方.</p>
<h3 id="articleHeader15">
<code>every</code> 和 <code>some</code> 不完全属于数组操作方法</h3>
<p><code>every</code> 和 <code>some</code> 都是判断条件直接返回整个数组Boolean类型的方法.<code>every</code>速度会比<code>some</code>快很多.<br><span class="img-wrap"><img data-src="/img/bV2QTY?w=2028&amp;h=794" src="https://static.alili.tech/img/bV2QTY?w=2028&amp;h=794" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader16">干货</h3>
<p>一张图展示JavaScript数组方法 </p>
<p><span class="img-wrap"><img data-src="/img/bV2QUd?w=1728&amp;h=1091" src="https://static.alili.tech/img/bV2QUd?w=1728&amp;h=1091" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader17">最后</h3>
<p>最后不同浏览器内核我相信会有些许差别,有兴趣的朋友可以去测试一下,有任何问题欢迎给博主留言.更多好文章请到我博客<a href="https://fe2x.cc" rel="nofollow noreferrer" target="_blank">地址</a> 浏览哈。</p>
<p>最后附上上面循环测试的 <a href="https://jsperf.com/js-loop-compare/1" rel="nofollow noreferrer" target="_blank">地址</a></p>
<h2 id="articleHeader18">延伸阅读</h2>
<ol>
<li>迭代器(iterator) <a href="https://github.com/sunyongjian/blog/issues/18" rel="nofollow noreferrer" target="_blank">地址</a>
</li>
<li>JS几种数组遍历方式以及性能分析对比 <a href="https://dailc.github.io/2016/11/25/baseKnowlenge_javascript_jsarrayGoThrough" rel="nofollow noreferrer" target="_blank">地址</a>
</li>
<li>如何形象地解释 JavaScript 中 map、foreach、reduce 间的区别？ <a href="https://www.zhihu.com/question/24927450" rel="nofollow noreferrer" target="_blank">地址</a>
</li>
<li>For-each over an array in JavaScript? <a href="https://stackoverflow.com/questions/9329446/for-each-over-an-array-in-javascript" rel="nofollow noreferrer" target="_blank">地址</a>
</li>
<li>JavaScript for循环性能比较 <a href="http://blog.mingsixue.com/it/JS-for-performance-compare.html" rel="nofollow noreferrer" target="_blank">地址</a>
</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS 数组循环遍历方法的对比

## 原文链接
[https://segmentfault.com/a/1190000013034098](https://segmentfault.com/a/1190000013034098)

