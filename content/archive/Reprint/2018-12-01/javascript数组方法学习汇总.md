---
title: 'javascript数组方法学习汇总' 
date: 2018-12-01 2:30:12
hidden: true
slug: 8xaxbtrzg8p
categories: [reprint]
---

{{< raw >}}

                    
<p>1、join('sep')：将数组元素组合成字符串。以sep为分隔符，省略的话则默认使用逗号为分隔符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['a','b','c'];
console.log(arr.join('-'))// 将输出字符串'a-b-c'。
  
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'a'</span>,<span class="hljs-string">'b'</span>,<span class="hljs-string">'c'</span>];
console.log(arr.<span class="hljs-keyword">join</span>(<span class="hljs-string">'-'</span>))<span class="hljs-comment">// 将输出字符串'a-b-c'。</span>
  
  </code></pre>
<p>2、reverse(): 反转数组元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['a','b','c']
console.log(arr.reverse())// 将输出数组['c','b','a'], 原数组也将被改变，与输出的值相同。
  
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>var arr = [<span class="hljs-string">'a'</span>,<span class="hljs-string">'b'</span>,<span class="hljs-string">'c'</span>]
console.log(arr.reverse())// 将输出数组[<span class="hljs-string">'c'</span>,<span class="hljs-string">'b'</span>,<span class="hljs-string">'a'</span>], 原数组也将被改变，与输出的值相同。
  
  </code></pre>
<p>3、concat(): 数组的合并，将参数添加到原数组的末尾，返回添加过后的新数组，不改变原数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['a','b']
console.log(arr.concat(['c']))// 输出新数组['a','b','c']。
  
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>var arr = [<span class="hljs-string">'a'</span>,<span class="hljs-string">'b'</span>]
console.log(arr.concat([<span class="hljs-string">'c'</span>]))// 输出新数组[<span class="hljs-string">'a'</span>,<span class="hljs-string">'b'</span>,<span class="hljs-string">'c'</span>]。
  
  </code></pre>
<p>4、push(): 向数组末尾添加元素,返回添加元素以后的数组的长度,原数组被改变。</p>
<p>5、pop()： 移除数组最后一项，返回移除的值，原数组被改变。该方法的返回值与push方法的有差异。</p>
<p>6、shift()： 移除数组第一项，返回移除的元素，原数组被改变。</p>
<p>7、unshift()： 在数组的开头添加元素，返回数组的长度，原数组被改变。</p>
<p>8、slice(n, m): 该方法可从已有的数组或字符串中返回选定的元素。返回从原数组中指定开始下标n到结束下标m(不包括m)之间的项组成的新数组,如果只传入一个参数，则截取该下标到数组结尾，不改变原数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3,4,5]
console.log(arr.slice(1,3)) // 输出新数组[2,3]。
  
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>]
console.log(arr.slice(<span class="hljs-number">1</span>,<span class="hljs-number">3</span>)) <span class="hljs-comment">// 输出新数组[2,3]。</span>
  
  </code></pre>
<p>9、splice(n,length) 删除：两个参数，要删除的第一项的位置和要删除的个数，返回被删除的元素组成的新数组,原数组被改变。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['a', 'b', 'c']
console.log(arr.splice(1, 2)) // 输出新数组['b','c']。
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>var arr = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>]
console.log(arr.splice(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)) // 输出新数组[<span class="hljs-string">'b'</span>,<span class="hljs-string">'c'</span>]。
  </code></pre>
<p>splice(n,length,x) 删除后添加，从下表为n的位置删除length个元素，然后在删除的位置添加元素x,length可以为0，则只添加不删除</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.splice(1,2,'d')  // 原数组变为['a','d']。
    
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>arr.splice(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-string">'d'</span>)  <span class="hljs-regexp">//</span> 原数组变为[<span class="hljs-string">'a'</span>,<span class="hljs-string">'d'</span>]。
    
    </code></pre>
<p>10、indexOf(item, [m]):  查找目标元素item在数组当中的下标,m代表从什么位置开始查找，可省略。返回被查找元素的下标,如不存在，则返回-1。lastIndexOf(n,[m]) 从数组的末尾开始向前查找</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['a','b','c']
console.log(arr.indexOf('b')) // 输出1
console.log(arr.indexOf('f')) // 输出-1
  
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'a'</span>,<span class="hljs-string">'b'</span>,<span class="hljs-string">'c'</span>]
<span class="hljs-built_in">console</span>.log(arr.indexOf(<span class="hljs-string">'b'</span>)) <span class="hljs-comment">// 输出1</span>
<span class="hljs-built_in">console</span>.log(arr.indexOf(<span class="hljs-string">'f'</span>)) <span class="hljs-comment">// 输出-1</span>
  
  </code></pre>
<p>11、forEach(function(value,index,arr){}): 对数组进行遍历循环，对数组中的每一项运行给定的函数。这个方法没有返回值。参数分别为遍历的数组内容(value)，对应内容的下标(index)，原数组(arr)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['a','b','c']
arr.forEach(function(value, index){
   console.log(value +'===>'+ index)
})
// 输出 a===>0, b===>1, c===>2
                
                " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'a'</span>,<span class="hljs-string">'b'</span>,<span class="hljs-string">'c'</span>]
arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value, index</span>)</span>{
   <span class="hljs-built_in">console</span>.log(value +<span class="hljs-string">'===&gt;'</span>+ index)
})
<span class="hljs-comment">// 输出 a===&gt;0, b===&gt;1, c===&gt;2</span>
                
                </code></pre>
<p>12、map(function(value,index,arr){}): 对数组中的每一项运行给定的函数，返回每次函数调用的结果组成的新数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, 2, 3];
var resultArr = arr.map(function (value, index, arr) {
   return value * value;
})
console.log(resultArr) // 输出新数组[1,4,9]
                
                " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>var arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
var resultArr = arr.map(<span class="hljs-function"><span class="hljs-keyword">function</span></span> (<span class="hljs-keyword">value</span>, <span class="hljs-built_in">index</span>, arr) {
   <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span> * <span class="hljs-keyword">value</span>;
})
console.<span class="hljs-built_in">log</span>(resultArr) // 输出新数组[<span class="hljs-number">1</span>,<span class="hljs-number">4</span>,<span class="hljs-number">9</span>]
                
                </code></pre>
<p>13、filter(function(value,index,arr){}): 过滤功能,数组中的每一项运行给定的函数，返回满足过滤条件的元素组成的新数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3,4,5,6]
var resultArr = arr.filter(function(value,index,arr){
   return value % 2 === 0            
})
console.log(resultArr) // 将输出新数组[2,4,6]
                
                " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]
var resultArr = arr.filter(function(value,index,arr){
   return value % <span class="hljs-number">2</span> === <span class="hljs-number">0</span>            
})
console.log(resultArr) <span class="hljs-comment">// 将输出新数组[2,4,6]</span>
                
                </code></pre>
<p>14、every(function(value,index,arr){})：判断数组中的每一项是否都满足条件，都满足返回true，此方法相较于之前的几个方法，返回值有差异，是一个布尔值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, 2, 3, 4, 5, 6];
var flag = arr.every(function (value, index, arr) {
   return value < 10;
})
console.log(flag) // 输出 true。数组中的所有元素都小于10
                
                " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>];
<span class="hljs-keyword">var</span> flag = arr.every(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value, index, arr</span>) </span>{
   <span class="hljs-keyword">return</span> value &lt; <span class="hljs-number">10</span>;
})
<span class="hljs-built_in">console</span>.log(flag) <span class="hljs-comment">// 输出 true。数组中的所有元素都小于10</span>
                
                </code></pre>
<p>15、some(function(value,index,arr){})：判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回true。</p>
<p>16、find(function(value,index,arr){})：用于找出第一个符合条件的数组成员，并返回该元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,4,5,3,6,7]
var num = arr.find(function(value,index.arr){
  return value > 2           
})
console.log(num) // 将输出4。4 为数组中满足条件的第一个元素，后面的元素将不会在进行遍历筛选。
                
                " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">3</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>]
var num = arr.find(function(value,index.arr){
  return value &gt; <span class="hljs-number">2</span>           
})
console.log(num) <span class="hljs-comment">// 将输出4。4 为数组中满足条件的第一个元素，后面的元素将不会在进行遍历筛选。</span>
                
                </code></pre>
<p>17、findIndex(function(value,index,arr){})：返回第一个符合条件的数组成员的位置。也就是满足条件的那个成员的index值</p>
<p>18、Array.from()：该方法用于将类似数组的对象和可遍历的对象转化为真正的数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
   '0': 'a',
   '1': 'b',
   '2': 'c',
   length: 3             
}
console.log(Array.from(obj)) // 输出数组 ['a','b','c']
                
                " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>var obj = {
   <span class="hljs-string">'0'</span>: <span class="hljs-string">'a'</span>,
   <span class="hljs-string">'1'</span>: <span class="hljs-string">'b'</span>,
   <span class="hljs-string">'2'</span>: <span class="hljs-string">'c'</span>,
   length: <span class="hljs-number">3</span>             
}
<span class="hljs-built_in">console</span>.log(Array.<span class="hljs-keyword">from</span>(obj)) <span class="hljs-regexp">//</span> 输出数组 [<span class="hljs-string">'a'</span>,<span class="hljs-string">'b'</span>,<span class="hljs-string">'c'</span>]
                
                </code></pre>
<p>19、Array.of()：用于将一组值转化为数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Array.of(1,2,3,4,5)) //输出数组[1,2,3,4,5]
                
                " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>console.log(Array.of(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>)) <span class="hljs-comment">//输出数组[1,2,3,4,5]</span>
                
                </code></pre>
<p>20、includes()：返回一个布尔值，表示某个数组中是否包含给定的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['a','b','c']
console.log(arr.includes('a')) //输出 true
console.log(arr.includes('d')) //输出 false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'a'</span>,<span class="hljs-string">'b'</span>,<span class="hljs-string">'c'</span>]
<span class="hljs-built_in">console</span>.log(arr.includes(<span class="hljs-string">'a'</span>)) <span class="hljs-comment">//输出 true</span>
<span class="hljs-built_in">console</span>.log(arr.includes(<span class="hljs-string">'d'</span>)) <span class="hljs-comment">//输出 false</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript数组方法学习汇总

## 原文链接
[https://segmentfault.com/a/1190000014789033](https://segmentfault.com/a/1190000014789033)

