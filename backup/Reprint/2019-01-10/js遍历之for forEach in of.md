---
title: 'js遍历之for forEach in of' 
date: 2019-01-10 2:30:08
hidden: true
slug: f26s6lvfrgw
categories: [reprint]
---

{{< raw >}}

                    
<p>即使是最简单的循环，其中也深藏学问</p>
<p>ECMAScript5(es5)有三种for循环</p>
<ul>
<li>简单for</li>
<li>for in</li>
<li>forEach</li>
</ul>
<p>ECMAScript6(es6)新增</p>
<ul><li>for of</li></ul>
<h2 id="articleHeader0">简单for</h2>
<p>for是循环的基础语法，也是最常用的循环结构。没有兼容性问题，效率上：for &gt; forEach &gt; map &gt;for in</p>
<h2 id="articleHeader1">forEach</h2>
<p>forEach由es5提出,属于数组的迭代方法</p>
<p><strong>概述：</strong> 方法让数组的每一项都执行一次给定的函数。</p>
<p><strong>语法：</strong> <code>array.forEach(callback[currentValue,index,array,thisArg]);</code></p>
<p><strong>参数：</strong></p>
<ul>
<li>currentValue：当前遍历项。</li>
<li>index：当前项目的下标</li>
<li>array：当前数组本身</li>
<li>thisArg：修改内部值的指向。</li>
</ul>
<p><strong>特点：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="forEach 方法为数组中含有有效值的每一项执行一次 callback 函数，那些已删除（使用 delete 方法等情况）或者从未赋值的项将被跳过（不包括那些值为 undefined 或 null 的项）。
forEach 遍历的范围在第一次调用 callback 前就会确定。调用forEach 后添加到数组中的项不会被 callback 访问到。如果已经存在的值被改变，则传递给 callback 的值是 forEach 遍历到他们那一刻的值。已删除的项不会被遍历到。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>forEach 方法为数组中含有有效值的每一项执行一次 <span class="hljs-keyword">callback</span> 函数，那些已删除（使用 delete 方法等情况）或者从未赋值的项将被跳过（不包括那些值为 undefined 或 <span class="hljs-literal">null</span> 的项）。
forEach 遍历的范围在第一次调用 <span class="hljs-keyword">callback</span> 前就会确定。调用forEach 后添加到数组中的项不会被 <span class="hljs-keyword">callback</span> 访问到。如果已经存在的值被改变，则传递给 <span class="hljs-keyword">callback</span> 的值是 forEach 遍历到他们那一刻的值。已删除的项不会被遍历到。
</code></pre>
<p><strong>优点：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foreach会跳过数组中的空位
相对简单for来说更语义化
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">foreach</span>会跳过数组中的空位
相对简单<span class="hljs-keyword">for</span>来说更语义化
</code></pre>
<p><strong>缺点：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="不能中断循环,也不支持 continue 和 break，只能通过 return 来控制循环，但是不能退出循环本身。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;">不能中断循环,也不支持 <span class="hljs-keyword">continue</span> 和 <span class="hljs-keyword">break</span>，只能通过 <span class="hljs-keyword">return</span> 来控制循环，但是不能退出循环本身。</code></pre>
<p><strong>兼容性：</strong> 只支持IE9及以上<br><strong>性能：</strong> forEach 的速度不如 for</p>
<h2 id="articleHeader2">for in</h2>
<p>此循环有一个特殊的用途：可以枚举任何对象的命名属性。实际上它是为循环”enumerable“对象而设计的。</p>
<p>需要注意的是，for-in 循环遍历的是对象的属性，而不是数组的索引。由于对象的属性没有顺序，for in循环输出的输出的属性名也是不可预测的</p>
<p><strong>性能:</strong> </p>
<p>由于每次迭代操作要搜索实例或原型属性， for-in 循环的每次迭代都会产生更多开销，因此执行速度比其他循环类型慢。在同样的循环迭代操作中，其它类型循环速度要比它快7倍之多。除非对数目不详的对象属性进行操作，否则我们不推荐使用for in 循环。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array 的真相

Array 在 Javascript 中是一个对象， Array 的索引是属性名。事实上， Javascript 中的 “array” 有些误导性， Javascript 中的 Array 并不像大部分其他语言的数组。首先， Javascript 中的 Array 在内存上并不连续，其次， Array 的索引并不是指偏移量。实际上， Array 的索引也不是 Number 类型，而是 String 类型的。我们可以正确使用如 arr[0] 的写法的原因是语言可以自动将 Number 类型的 0 转换成 String 类型的 &quot;0&quot; 。所以，在 Javascript 中从来就没有 Array 的索引，而只有类似 &quot;0&quot; 、 &quot;1&quot; 等等的属性。有趣的是，每个 Array 对象都有一个 length 的属性，导致其表现地更像其他语言的数组。但为什么在遍历 Array 对象的时候没有输出 length 这一条属性呢？那是因为 for-in 只能遍历“可枚举的属性”， length 属于不可枚举属性，实际上， Array 对象还有许多其他不可枚举的属性。

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Array</span> 的真相

<span class="hljs-built_in">Array</span> 在 Javascript 中是一个对象， <span class="hljs-built_in">Array</span> 的索引是属性名。事实上， Javascript 中的 “array” 有些误导性， Javascript 中的 <span class="hljs-built_in">Array</span> 并不像大部分其他语言的数组。首先， Javascript 中的 <span class="hljs-built_in">Array</span> 在内存上并不连续，其次， <span class="hljs-built_in">Array</span> 的索引并不是指偏移量。实际上， <span class="hljs-built_in">Array</span> 的索引也不是 <span class="hljs-built_in">Number</span> 类型，而是 <span class="hljs-built_in">String</span> 类型的。我们可以正确使用如 arr[<span class="hljs-number">0</span>] 的写法的原因是语言可以自动将 <span class="hljs-built_in">Number</span> 类型的 <span class="hljs-number">0</span> 转换成 <span class="hljs-built_in">String</span> 类型的 <span class="hljs-string">"0"</span> 。所以，在 Javascript 中从来就没有 <span class="hljs-built_in">Array</span> 的索引，而只有类似 <span class="hljs-string">"0"</span> 、 <span class="hljs-string">"1"</span> 等等的属性。有趣的是，每个 <span class="hljs-built_in">Array</span> 对象都有一个 length 的属性，导致其表现地更像其他语言的数组。但为什么在遍历 <span class="hljs-built_in">Array</span> 对象的时候没有输出 length 这一条属性呢？那是因为 <span class="hljs-keyword">for</span>-<span class="hljs-keyword">in</span> 只能遍历“可枚举的属性”， length 属于不可枚举属性，实际上， <span class="hljs-built_in">Array</span> 对象还有许多其他不可枚举的属性。

</code></pre>
<h2 id="articleHeader3">es6的for of</h2>
<p>for of是由es6提出的，目的是作为遍历所有数据结构的统一方法。</p>
<p>我们先来回顾一下此前js的遍历方法：</p>
<ul>
<li>foreach是为便利数组而设计的，不能正确响应break、continue和return语句</li>
<li>for in被设计用来枚举对象的属性的，遍历对象的属性</li>
<li>for in用在数组上，除了遍历数组元素以外,还会遍历自定义属性，甚至原型链上的属性，另外，遍历顺序是随机的</li>
</ul>
<p>那么for of 有什么不一样呢？</p>
<p><strong>特点：</strong></p>
<ul>
<li>语法同for in一样简洁，但避开了for in的缺陷</li>
<li>能正确响应break、continue和return语句</li>
<li>跟for in不一样，数组的遍历器接口只返回具有数字索引的属性</li>
<li>for in读取的是对象的键名，for of读取的是键值</li>
<li>提供遍历所有数据结构的统一方法。for of不仅可以遍历数组，还可以遍历Set、Map结构，某些类似数组的对象（如：argument对象、DOM NodeList对象），Generator对象，以及字符串。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如：
let arr = ['a' ,'b', 'c', 'd'];
let itr = arr[Symbol.iterator];

arr.forEach(function(val, index, arr){
    console.log(val); // a b c d
    console.log(index); // 0 1 2 3
});

for(let i of itr){
    console.log(i);  // a b c d
}

for(let i of arr){
    console.log(i);  // a b c d
}

for(let i in arr){
    console.log(i);  // 0 1 2 3
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>如：
<span class="hljs-keyword">let</span> arr = [<span class="hljs-string">'a'</span> ,<span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'d'</span>];
<span class="hljs-keyword">let</span> itr = arr[<span class="hljs-built_in">Symbol</span>.iterator];

arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val, index, arr</span>)</span>{
    <span class="hljs-built_in">console</span>.log(val); <span class="hljs-comment">// a b c d</span>
    <span class="hljs-built_in">console</span>.log(index); <span class="hljs-comment">// 0 1 2 3</span>
});

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i <span class="hljs-keyword">of</span> itr){
    <span class="hljs-built_in">console</span>.log(i);  <span class="hljs-comment">// a b c d</span>
}

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i <span class="hljs-keyword">of</span> arr){
    <span class="hljs-built_in">console</span>.log(i);  <span class="hljs-comment">// a b c d</span>
}

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> arr){
    <span class="hljs-built_in">console</span>.log(i);  <span class="hljs-comment">// 0 1 2 3</span>
}</code></pre>
<p>只要具有Iterator接口的数据结构，都可以使用for of循环遍历它的成员。关于Iterator，如果还不清楚的可以先去了解一下，这里就不赘述了。这里需要注意一下，由于for of读取的是键值，如果想通过for of获取键名，可以借助数组实例的entries和keys方法。</p>
<hr>
<p>关注作者吧~</p>
<p><span class="img-wrap"><img data-src="/img/bVTRS4?w=129&amp;h=129" src="https://static.alili.tech/img/bVTRS4?w=129&amp;h=129" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js遍历之for forEach in of

## 原文链接
[https://segmentfault.com/a/1190000009985137](https://segmentfault.com/a/1190000009985137)

