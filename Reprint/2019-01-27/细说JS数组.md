---
title: '细说JS数组' 
date: 2019-01-27 2:31:00
hidden: true
slug: ux4nny2xjrr
categories: [reprint]
---

{{< raw >}}

                    
<p>此乃犀牛书(第七章 数组)读书笔记,又结合了ES6中数组的扩展部分做的知识梳理。<br>精华部分就是手工绘制的两张数组总结图了。<br>灵活运用数组的各种方法是基本功，是基本功，是基本功，重要的事情说三遍。<br>好了，正文从下面开始~</p>
<h1 id="articleHeader0">数组的基本概念</h1>
<h3 id="articleHeader1">什么是数组，数组元素，数组索引</h3>
<p>对象是属性的无序集合，而数组是值的有序集合；<br>每个值叫做一个元素，每个元素在数组中的位置称为索引；</p>
<h3 id="articleHeader2">JS数组有什么特点</h3>
<ul>
<li><p>JS数组是无类型的：数组元素可以是任意类型，同一个数组中的元素也可能有不同类型；</p></li>
<li><p>JS数组是动态的：可根据需要增长或缩减；</p></li>
<li><p>JS数组可能是稀疏的：数组元素的索引不一定是连续的。</p></li>
</ul>
<h3 id="articleHeader3">稀疏数组</h3>
<ul>
<li><p>稀疏数组length属性值大于元素的个数</p></li>
<li><p>创建稀疏数组的两种方法：</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a= []; a[1000] =1  //直接量" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">var <span class="hljs-keyword">a</span>= []; <span class="hljs-keyword">a</span>[<span class="hljs-number">1000</span>] =<span class="hljs-number">1</span> <span class="hljs-comment"> //直接量</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3,4,5,6]; delete a[0];  //删除从而使得不连续" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">var a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]; delete a[<span class="hljs-number">0</span>];  <span class="hljs-comment">//删除从而使得不连续</span></code></pre>
<h3 id="articleHeader4">数组对象和普通对象的联系和区别？</h3>
<ul>
<li><p>数组是特殊的对象，使用[]访问数组元素就像使用[]访问对象属性一样(索引就是属性名)</p></li>
<li><p>数组的特别之处在于，当使用小于2的32次方的非负整数作为属性名时数组会自动维持其length属性值，length属性使得数组区别于常规JS对象。</p></li>
</ul>
<blockquote><p>当为数组元素赋值时，索引i大于或等于length,length属性变为i+1；<br>当设置数组length属性小于当前数组长度时，大于的部分将被删除； <br>也可以设置数组的length属性大于当前数组长度，这时后面会创建空区域；<br>可以使用Object.defineProperty（）将数组length属性设置为只读的。</p></blockquote>
<ul><li>
<p>如何判断一个对象是数组对象？</p>
<ul>
<li>
<p>ES5提供了一个方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.isArray(a)    // true or false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">Array</span>.isArray(a)    // <span class="hljs-literal">true</span> <span class="hljs-keyword">or</span> <span class="hljs-literal">false</span></code></pre>
</li>
<li><p>还可以通过检查对象的类属性（class）</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.prototype.toString.call(a) == '[object array]'
//这里需要使用Object的toString方法，因为Array的toString方法被重写了。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>Object<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.toString</span><span class="hljs-selector-class">.call</span>(a) == <span class="hljs-string">'[object array]'</span>
<span class="hljs-comment">//这里需要使用Object的toString方法，因为Array的toString方法被重写了。</span></code></pre>
</li></ul>
<p>注意：使用instanceof判断数组对象是不靠谱的。这是因为当跨越多个窗体时，检测会失败。</p>
<h3 id="articleHeader5">类数组对象</h3>
<ul>
<li><p>类数组对象：拥有length属性，属性是非负整数的对象</p></li>
<li><p>数组方法在类数组对象上也能work, 类数组对象不能直接调用数组的方法，但可以间接调用</p></li>
<li><p>常见的类数组对象：arguments对象、一些DOM方法的返回</p></li>
</ul>
<h1 id="articleHeader6">数组的操作（创建、读写、添加、删除、遍历）及方法</h1>
<p>下面用一张图来总结一下数组的方法：</p>
<p><span class="img-wrap"><img data-src="/img/bVIKWE?w=528&amp;h=1424" src="https://static.alili.tech/img/bVIKWE?w=528&amp;h=1424" alt="按照标准演进分数组方法.png" title="按照标准演进分数组方法.png" style="cursor: pointer;"></span></p>
<p>这张图是按照ES标准发展的顺序总结了标准中数组提供的方法，画完图的我表示吓了一跳。ES6竟然提供了这么多新的方法。看来使用的是相当不充分。以后要考虑少用underscore了。。。</p>
<p>上图中每个方法可能可以实现不止一种功能（例如splice既能实现为数组增加元素，又能删除数组元素），那么按照数组操作划分，这张图又可以变成下面这个样子：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008211721" src="https://static.alili.tech/img/remote/1460000008211721" alt="按照数组元素操作划分数组的方法.png" title="按照数组元素操作划分数组的方法.png" style="cursor: pointer;"></span></p>
<p>下面对上述两张图里面的部分知识进行详细说明和demo演示。</p>
<h3 id="articleHeader7">创建数组的三种方法</h3>
<ul><li><p>数组直接量</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1, true,'hi'];
var b = [,,]  //undefined*2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>, <span class="hljs-literal">true</span>,<span class="hljs-string">'hi'</span>];
<span class="hljs-keyword">var</span> b = [,,]  <span class="hljs-comment">//undefined*2</span></code></pre>
<ul><li><p>new + Array</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = new Array()
var b = new Array(10)
var c = new Array(1,2)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = new Array()
<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">b</span> = new Array(<span class="hljs-number">10</span>)
<span class="hljs-selector-tag">var</span> c = new Array(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>)</code></pre>
<ul><li><p>Array.of()</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.of(1,2,3)  //[1,2,3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">Array.of(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>)  <span class="hljs-comment">//[1,2,3]</span></code></pre>
<p>这是ES6中提供的方法，为了弥补new+Array在传入不同个数的参数时输出不一致的问题。</p>
<h3 id="articleHeader8">数组元素的读写：[]</h3>
<p>使用'[]'访问数组元素时，js将索引转换为字符串，然后将其作为属性名一样使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//注意使用负整数和浮点数作为索引时：
a[-123]   //同a['-123']
a[1.000]  //同a[1]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//注意使用负整数和浮点数作为索引时：</span>
<span class="hljs-selector-tag">a</span>[-<span class="hljs-number">123</span>]   <span class="hljs-comment">//同a['-123']</span>
<span class="hljs-selector-tag">a</span>[<span class="hljs-number">1.000</span>]  <span class="hljs-comment">//同a[1]</span></code></pre>
<h3 id="articleHeader9">为数组添加元素有至少下面这么多办法：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [];
a[1] = 1; 
a.push(1)
a.unshift(1)  //以上都使得a变成了[1]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var a = [];
a[<span class="hljs-number">1</span>] = <span class="hljs-number">1</span>; 
a.push(<span class="hljs-number">1</span>)
a.unshift(<span class="hljs-number">1</span>)  <span class="hljs-comment">//以上都使得a变成了[1]</span></code></pre>
<h3 id="articleHeader10">delete删除数组元素不改变length</h3>
<p>delete删除数组元素是不改变数组的length的，也不会让其他数组元素索引发生改变，会让数组变为稀疏数组。</p>
<h3 id="articleHeader11">遍历数组元素有什么方法？</h3>
<p>最简单的方案就是使用for循环，那么，使用for循环遍历数组时可以有哪些优化点？</p>
<blockquote>
<p>首先，如果数组不是稠密的，应该加判断排除null, undefined和不存在的元素，以避免多余循环；</p>
<p>其次，数组长度应该先求出来，而非每次循环都去查询长度,但是这种适用于在遍历过程中不修改数组长度的情况（试一下一边遍历，一边删除数组元素的情况）；</p>
</blockquote>
<p>使用for循环和使用forEach,map这些方法有什么区别？</p>
<blockquote><p>使用for循环，可以从后向前遍历数组，而使用方法则做不到。</p></blockquote>
<h3 id="articleHeader12">sort方法不可不知</h3>
<p>sort() 直接使用时是按照字母顺序排列的。如果想要根据数值大小顺序排列，可以在回调函数里指定。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a= [33,4,1111,222]
a.sort()  //[1111,222,33,4]
a.sort((a,b)=>{
  return a-b  //<0  第一个参数应该在前
}) //[4,33,222,1111]  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> a= [<span class="hljs-number">33</span>,<span class="hljs-number">4</span>,<span class="hljs-number">1111</span>,<span class="hljs-number">222</span>]
<span class="hljs-selector-tag">a</span>.sort()  <span class="hljs-comment">//[1111,222,33,4]</span>
<span class="hljs-selector-tag">a</span>.sort((<span class="hljs-selector-tag">a</span>,b)=&gt;{
  return a-<span class="hljs-selector-tag">b</span>  <span class="hljs-comment">//&lt;0  第一个参数应该在前</span>
}) <span class="hljs-comment">//[4,33,222,1111]  </span></code></pre>
<h3 id="articleHeader13">concat()只展开一层数组元素</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3]
var b = a.concat(4,5) //a不变，返回[1,2,3,4,5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]
<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">b</span> = <span class="hljs-selector-tag">a</span>.concat(<span class="hljs-number">4</span>,<span class="hljs-number">5</span>) <span class="hljs-comment">//a不变，返回[1,2,3,4,5]</span></code></pre>
<p>注意，concat只拼接第一层结构。<br>另外，使用扩展运算符同样能实现数组拼接:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3]
var b = [...a,4,5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]
<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">b</span> = [..<span class="hljs-selector-class">.a</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>]</code></pre>
<h3 id="articleHeader14">厉害的splice()</h3>
<p>splice既能删除元素，也能插入元素，取决于有咩有第三个参数<br>splice是修改数组本身的，但是slice方法是不修改数组本身的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3,4,5,6]
a.splice(4)   //a: [1,2,3,4]
a.splice(2,1) //[1,2,4]
a.splice(2,1,3)  //[1,2,3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]
a.splice(<span class="hljs-number">4</span>)   <span class="hljs-comment">//a: [1,2,3,4]</span>
a.splice(<span class="hljs-number">2</span>,<span class="hljs-number">1</span>) <span class="hljs-comment">//[1,2,4]</span>
a.splice(<span class="hljs-number">2</span>,<span class="hljs-number">1</span>,<span class="hljs-number">3</span>)  <span class="hljs-comment">//[1,2,3]</span></code></pre>
<h3 id="articleHeader15">ES5数组的方法都有的一些特点</h3>
<p>ES5数组方法的特点：</p>
<ul>
<li><p>第一个参数是函数，对数组的每个元素调用一次该函数</p></li>
<li><p>如果是稀疏数组，对不存在的元素不调用传递的函数(wow)</p></li>
<li><p>不修改原始数组</p></li>
</ul>
<h3 id="articleHeader16">forEach方法</h3>
<p>forEach 不能break ， 想break 需要try catch<br>forEach不修改原始数组，想修改，可以借助第三个参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = [1,2,3,4,5,6]
data.forEach((ele, index, dd)=>{
  dd[index] = ele + 1
})
//data: [2,3,4,5,6,7]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">var</span> <span class="hljs-class"><span class="hljs-keyword">data</span> = [1,2,3,4,5,6]</span>
<span class="hljs-class"><span class="hljs-keyword">data</span>.forEach((<span class="hljs-title">ele</span>, <span class="hljs-title">index</span>, <span class="hljs-title">dd</span>)=&gt;{
  <span class="hljs-title">dd</span>[<span class="hljs-title">index</span>] = <span class="hljs-title">ele</span> + 1
})</span>
//<span class="hljs-class"><span class="hljs-keyword">data</span>: [2,3,4,5,6,7]</span></code></pre>
<h3 id="articleHeader17">map 通常都需要一个return:</h3>
<p>map方法也不修改原始数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var b = a.map(function(ele){return ele+1})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">b</span> = <span class="hljs-selector-tag">a</span>.map(function(ele){return ele+<span class="hljs-number">1</span>})</code></pre>
<h3 id="articleHeader18">indexOf()与includes()方法的比较</h3>
<p>indexOf方法有两个缺点：</p>
<ul>
<li><p>不够语义化，它的含义是找到参数值出现的第一个位置，所以要去比较是否不等于-1</p></li>
<li>
<p>内部使用严格运算符'==='，所以会导致对NaN的误判</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[NaN].indexOf(NaN)   //-1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-literal">NaN</span>].indexOf(<span class="hljs-literal">NaN</span>)   <span class="hljs-comment">//-1</span></code></pre>
</li>
</ul>
<p>而includes方法没有这个问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[NaN].includes(NaN)   //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-literal">NaN</span>].includes(<span class="hljs-literal">NaN</span>)   <span class="hljs-comment">//true</span></code></pre>
<p>关于数组的方法众多，在使用时多尝试不同的方法，方能熟记各类方法的特点。</p>
<p>未完待续~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
细说JS数组

## 原文链接
[https://segmentfault.com/a/1190000008211717](https://segmentfault.com/a/1190000008211717)

