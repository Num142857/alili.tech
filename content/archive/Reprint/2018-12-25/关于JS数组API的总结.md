---
title: '关于JS数组API的总结' 
date: 2018-12-25 2:30:11
hidden: true
slug: o575b7fyc3c
categories: [reprint]
---

{{< raw >}}

                    
<p>在学习JS的道路上，数组是一个很重要的部分，数组的API很多，也很容易混淆，每次对数组操作时都要去查文档，学习的路上也不能一直前进，有时候要停下来做做总结，我总结了平时比较常用的一些数组API，希望能够帮到你。</p>
<h4><code>arry.push()</code></h4>
<p>把一个元素增加到数组的末尾，返回值为新数组的长度<code>arry.length</code>，示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arry = [2, 9, 5]
let returnValue = arry.push(4)
console.log(returnValue) // 4
console.log(arry) // [2, 9, 5, 4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> arry = [<span class="hljs-number">2</span>, <span class="hljs-number">9</span>, <span class="hljs-number">5</span>]
<span class="hljs-keyword">let</span> returnValue = arry.<span class="hljs-keyword">push</span>(<span class="hljs-number">4</span>)
console.<span class="hljs-built_in">log</span>(returnValue) <span class="hljs-comment">// 4</span>
console.<span class="hljs-built_in">log</span>(arry) <span class="hljs-comment">// [2, 9, 5, 4]</span></code></pre>
<h4><code>arry.pop()</code></h4>
<p>删除数组中最后一个元素，返回值为删除的元素，示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arry = [2, 9, 5]
let returnValue = arry.pop()
console.log(returnValue) // 5
console.log(arry) // [2, 9]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> arry = [<span class="hljs-number">2</span>, <span class="hljs-number">9</span>, <span class="hljs-number">5</span>]
<span class="hljs-keyword">let</span> returnValue = arry.<span class="hljs-keyword">pop</span>()
console.<span class="hljs-built_in">log</span>(returnValue) <span class="hljs-comment">// 5</span>
console.<span class="hljs-built_in">log</span>(arry) <span class="hljs-comment">// [2, 9]</span></code></pre>
<h4><code>arry.unshift()</code></h4>
<p>与<code>push</code>方法类似，区别在于它是在数组的前面添加元素，返回值为新数组的长度<code>arry.length</code>，示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arry = [2, 9, 5]
let returnValue = arry.unshift(4)
console.log(returnValue) // 4
console.log(arry) // [4, 2, 9, 5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> arry = [<span class="hljs-number">2</span>, <span class="hljs-number">9</span>, <span class="hljs-number">5</span>]
<span class="hljs-keyword">let</span> returnValue = arry.unshift(<span class="hljs-number">4</span>)
console.<span class="hljs-built_in">log</span>(returnValue) <span class="hljs-comment">// 4</span>
console.<span class="hljs-built_in">log</span>(arry) <span class="hljs-comment">// [4, 2, 9, 5]</span></code></pre>
<h4><code>arry.shift()</code></h4>
<p>与<code>pop</code>方法类似，区别在于它是删除数组前面的元素，返回值依然是被删除的元素，示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arry = [2, 9, 5]
let returnValue = arry.shift()
console.log(returnValue) // 2
console.log(arry) // [9, 5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> arry = [<span class="hljs-number">2</span>, <span class="hljs-number">9</span>, <span class="hljs-number">5</span>]
<span class="hljs-keyword">let</span> returnValue = arry.shift()
console.<span class="hljs-built_in">log</span>(returnValue) <span class="hljs-comment">// 2</span>
console.<span class="hljs-built_in">log</span>(arry) <span class="hljs-comment">// [9, 5]</span></code></pre>
<p>由此可知，使用<code>push</code>和<code>shift</code>组合可以实现数据的‘先进先出’当然也可以使用<code>unshift</code>和<code>pop</code></p>
<h4><code>arry.reverse()</code></h4>
<p>把数组反向排序，这里要注意它会改变原来的数组，而不会创建新的数组，示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arry = [2, 9, 5]
arry.reverse()
console.log(arry) // [ 5, 9, 2 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>let arry = [<span class="hljs-number">2</span>, <span class="hljs-number">9</span>, <span class="hljs-number">5</span>]
arry.reverse()
console.log(arry) <span class="hljs-comment">// [ 5, 9, 2 ]</span></code></pre>
<h4><code>arry.sort()</code></h4>
<p>对数组进行排序，可接受参数，参数必须是函数，如果不没有参数 则是按照字符编码的顺序进行排序，示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arry = [10, 5, 40, 1000]
console.log(arry.sort()) // [ 10, 1000, 40, 5 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>let arry = [<span class="hljs-number">10</span>, <span class="hljs-number">5</span>, <span class="hljs-number">40</span>, <span class="hljs-number">1000</span>]
console.log(arry.sort()) <span class="hljs-comment">// [ 10, 1000, 40, 5 ]</span></code></pre>
<p>如果数字想要按大小排列，可写入参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [3, 1, 7]
console.log(arr.sort((a, b) => a - b)) // [ 1, 3, 7 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> arr = [<span class="hljs-number">3</span>, <span class="hljs-number">1</span>, <span class="hljs-number">7</span>]
<span class="hljs-built_in">console</span>.log(arr.sort(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a - b)) <span class="hljs-comment">// [ 1, 3, 7 ]</span></code></pre>
<h4>
<code>arry.forEach(item, index)</code>与<code>arry.map(item, index)</code>
</h4>
<p>两者都是对数组遍历，index表示数组索引，不是必须的参数区别在于<code>map</code>方法会返回一个新的数组，示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arry = [1, 5, 10, 15];
let arry1 = arry.map( x => x + 2);
console.log(arry1) // [ 3, 7, 12, 17 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> arry = [<span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">15</span>];
<span class="hljs-keyword">let</span> arry1 = arry.map( <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x + <span class="hljs-number">2</span>);
<span class="hljs-built_in">console</span>.log(arry1) <span class="hljs-comment">// [ 3, 7, 12, 17 ]</span></code></pre>
<h4><code>arry.some()</code></h4>
<p>用于检测数组中的元素是否满足指定条件,参数也是函数如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。如果没有满足条件的元素，则返回false。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arry = [1, 5, 10, 15];
console.log(arry.some(item => item > 10)) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>let arry = [<span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">15</span>];
console.log(arry.some(item =&gt; item &gt; <span class="hljs-number">10</span>)) <span class="hljs-comment">// true</span></code></pre>
<h4><code>arry.every()</code></h4>
<p>用于检测数组中的所有元素是否满足指定条件,只有当数组中灭一个元素都满足条件时，表达式返回true , 否则返回false，示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arry = [5, 10, 15];
console.log(arry.every(item => item > 2)) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> arry = [<span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">15</span>];
<span class="hljs-built_in">console</span>.log(arry.every(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item &gt; <span class="hljs-number">2</span>)) <span class="hljs-comment">// true</span></code></pre>
<h4><code>arry.filter()</code></h4>
<p>它创建一个新的数组，原数组不变，新数组中的元素是通过检查指定数组中符合条件的所有元素，示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arry = [1, 5, 10, 15];
let arry1 = arry.filter(item => item > 5)
console.log(arry) // [ 1, 5, 10, 15 ]
console.log(arry1) // [ 10, 15 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> arry = [<span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">15</span>];
<span class="hljs-keyword">let</span> arry1 = arry.filter(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item &gt; <span class="hljs-number">5</span>)
<span class="hljs-built_in">console</span>.log(arry) <span class="hljs-comment">// [ 1, 5, 10, 15 ]</span>
<span class="hljs-built_in">console</span>.log(arry1) <span class="hljs-comment">// [ 10, 15 ]</span></code></pre>
<h4><code>arry.join()</code></h4>
<p>把数组元素合并为一个字符串，如果不带参数，默认用逗号分隔</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arry = [5, 10, 15];
console.log(arry.join()) // 5,10,15
// 添加参数
let arry = [5, 10, 15];
console.log(arry.join('.')) // 5.10.15" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>let arry = [<span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">15</span>];
console.log(arry.join()) <span class="hljs-comment">// 5,10,15</span>
<span class="hljs-comment">// 添加参数</span>
let arry = [<span class="hljs-number">5</span>, <span class="hljs-number">10</span>, <span class="hljs-number">15</span>];
console.log(arry.join('.')) <span class="hljs-comment">// 5.10.15</span></code></pre>
<h4><code>arry.splice(index, hm, add)</code></h4>
<p>它既可以删除特定的元素，也可以在特定位置增加元素，也可以删除增加同时搞定，<code>index</code>是起始位置，<code>hm</code>是要删除元素的个数，<code>add</code>是要增加的元素，上例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let myFish = ['angel', 'clown', 'mandarin', 'sturgeon']
myFish.splice(2, 0, 'drum') // hm为0 表示不删除任何元素
console.log(myFish) // [ 'angel', 'clown', 'drum', 'mandarin', 'sturgeon' ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>let myFish = [<span class="hljs-string">'angel'</span>, <span class="hljs-string">'clown'</span>, <span class="hljs-string">'mandarin'</span>, <span class="hljs-string">'sturgeon'</span>]
myFish.splice(<span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-string">'drum'</span>) <span class="hljs-regexp">//</span> hm为<span class="hljs-number">0</span> 表示不删除任何元素
console.log(myFish) <span class="hljs-regexp">//</span> [ <span class="hljs-string">'angel'</span>, <span class="hljs-string">'clown'</span>, <span class="hljs-string">'drum'</span>, <span class="hljs-string">'mandarin'</span>, <span class="hljs-string">'sturgeon'</span> ]</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let myFish = ['angel', 'clown', 'mandarin', 'sturgeon']
myFish.splice(2, 1, 'drum')
console.log(myFish)  // [ 'angel', 'clown', 'drum', 'sturgeon' ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>let myFish = [<span class="hljs-string">'angel'</span>, <span class="hljs-string">'clown'</span>, <span class="hljs-string">'mandarin'</span>, <span class="hljs-string">'sturgeon'</span>]
myFish.splice(<span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-string">'drum'</span>)
console.log(myFish)  // [ <span class="hljs-string">'angel'</span>, <span class="hljs-string">'clown'</span>, <span class="hljs-string">'drum'</span>, <span class="hljs-string">'sturgeon'</span> ]</code></pre>
<h4><code>arry.concat()</code></h4>
<p>用于连接两个或多个数组，返回值为连接后的新数组，原数组不变，示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arry1 = [1, 2, 3]
let arry2 = [4, 5, 6]
arry1.concat(arry2)
console.log(arry1.concat(arry2)) // [ 1, 2, 3, 4, 5, 6 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>let arry1 = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
let arry2 = [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>]
arry1.concat(arry2)
console.log(arry1.concat(arry2)) <span class="hljs-comment">// [ 1, 2, 3, 4, 5, 6 ]</span></code></pre>
<p>这些就是关于数组常用的api，可以大胆地添加收藏，以备不时之需～</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于JS数组API的总结

## 原文链接
[https://segmentfault.com/a/1190000012052241](https://segmentfault.com/a/1190000012052241)

