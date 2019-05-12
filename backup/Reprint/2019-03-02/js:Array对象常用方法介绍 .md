---
title: 'js:Array对象常用方法介绍 ' 
date: 2019-03-02 2:30:07
hidden: true
slug: i6brhu1984n
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>在js中，数组作为一个特殊的对象。是我们常用的数据格式。今天就来梳理一下常用的数组方法.</p>
<h3 id="articleHeader1">1.基础</h3>
<p>几种基础的就简单介绍一下:<br>创建数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr1 = new Array();  //括号可以传参，指定数组长度。目前arr1.length是0
var arr2 = new Array(3);//arr2.length是3
var arr3 = new Array(1,2,3,4);  //当传多个参数时，js会把这些参数作为数组的初始值。
console.log(arr3);  // [1,2,3,4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();  <span class="hljs-comment">//括号可以传参，指定数组长度。目前arr1.length是0</span>
<span class="hljs-keyword">var</span> arr2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">3</span>);<span class="hljs-comment">//arr2.length是3</span>
<span class="hljs-keyword">var</span> arr3 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>);  <span class="hljs-comment">//当传多个参数时，js会把这些参数作为数组的初始值。</span>
<span class="hljs-built_in">console</span>.log(arr3);  <span class="hljs-comment">// [1,2,3,4]</span></code></pre>
<p>new Array()创建数组有一个需要注意的地方。只传一个参数时，如果这个值是非数字。会被当做数组的第一个参数，生成一个长度为1的数组。如果是数字，就会创建一个这个数字长度的空数组。</p>
<p>但其实上面的创建方法不常用。我们更习惯这么写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [];
var arr = [0,1,2,3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = [];
var arr = [<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]</code></pre>
<p>基础方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.length  //数组的长度
arr[1] //数组下标是1的值。数组的下标从0开始计数
arr.push(值) //往数组添加元素" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">arr</span><span class="hljs-selector-class">.length</span>  <span class="hljs-comment">//数组的长度</span>
<span class="hljs-selector-tag">arr</span><span class="hljs-selector-attr">[1]</span> <span class="hljs-comment">//数组下标是1的值。数组的下标从0开始计数</span>
<span class="hljs-selector-tag">arr</span><span class="hljs-selector-class">.push</span>(值) <span class="hljs-comment">//往数组添加元素</span></code></pre>
<h3 id="articleHeader2">2.其它方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&quot;element1&quot;,&quot;element2&quot;,&quot;element3&quot;,&quot;element4&quot;];     //下面所有案列都是用的这个数组

//获取指定元素的下标
var index = arr. indexOf(”element2“）;   // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">"element1"</span>,<span class="hljs-string">"element2"</span>,<span class="hljs-string">"element3"</span>,<span class="hljs-string">"element4"</span>];     <span class="hljs-comment">//下面所有案列都是用的这个数组</span>

<span class="hljs-comment">//获取指定元素的下标</span>
<span class="hljs-keyword">var</span> index = arr. indexOf(”element2“）;   <span class="hljs-comment">// 1</span></code></pre>
<h4>（1）splice(index,number,item1,.....,itemX)从数组中添加/删除元素，然后返回被删除的元素。</h4>
<table>
<thead><tr>
<th align="left">参数</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left">index</td>
<td align="left">必需。整数。添加/删除项目的位置，使用负数可从数组结尾处规定位置。</td>
</tr>
<tr>
<td align="left">number</td>
<td align="left">必需。要删除的项目数量。如果设置为 0，则不会删除项目。</td>
</tr>
<tr>
<td align="left">item1, ..., itemX</td>
<td align="left">可选。向数组添加的新项目。</td>
</tr>
</tbody>
</table>
<p>来看实际例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//删除
let getReturn = arr.splice(1,1);
console.log(getReturn);  // [&quot;element2&quot;]
console.log(arr);    //[&quot;element1&quot;,&quot;,&quot;element3&quot;,&quot;element4&quot;]

//添加
let getReturn = arr.splice(arr.length,0,&quot;element5&quot;,&quot;element6&quot;);
console.log(getReturn);  //[]
console.log(arr);    //[&quot;element1&quot;,&quot;element2&quot;,&quot;element3&quot;,&quot;element4&quot;,&quot;element5&quot;,&quot;element6&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code><span class="hljs-regexp">//删除
let getReturn = arr.splice(1,1);
console.log(getReturn);  //</span> [<span class="hljs-string">"element2"</span>]
<span class="hljs-built_in">console</span>.log(arr);    <span class="hljs-regexp">//["element1",","element3","element4"]

//</span>添加
<span class="hljs-keyword">let</span> getReturn = arr.splice(arr.length,<span class="hljs-number">0</span>,<span class="hljs-string">"element5"</span>,<span class="hljs-string">"element6"</span>);
<span class="hljs-built_in">console</span>.log(getReturn);  <span class="hljs-regexp">//[]
console.log(arr);    //</span>[<span class="hljs-string">"element1"</span>,<span class="hljs-string">"element2"</span>,<span class="hljs-string">"element3"</span>,<span class="hljs-string">"element4"</span>,<span class="hljs-string">"element5"</span>,<span class="hljs-string">"element6"</span>]</code></pre>
<h4>（2）pop()方法,删除数组最后一位，返回被删除的元素。</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let getReturn = arr.pop();
console.log(getReturn);    //element4
console.log(arr);    //[&quot;element1&quot;,&quot;element2&quot;,&quot;element3&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">let</span> getReturn = arr.<span class="hljs-built_in">pop</span>();
console.<span class="hljs-built_in">log</span>(getReturn);    //element4
console.<span class="hljs-built_in">log</span>(arr);    //[<span class="hljs-string">"element1"</span>,<span class="hljs-string">"element2"</span>,<span class="hljs-string">"element3"</span>]</code></pre>
<h4>（3）slice(start,end) 从已有的数组中返回选定的元素。</h4>
<table>
<thead><tr>
<th align="left">参数</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left">start</td>
<td align="left">必需。整数。添加/删除项目的位置，使用负数可从数组结尾处规定位置。</td>
</tr>
<tr>
<td align="left">end</td>
<td align="left">必需。要删除的项目数量。如果设置为 0，则不会删除项目。</td>
</tr>
</tbody>
</table>
<p>注意：请注意，该方法并不会修改数组，而是返回一个子数组。如果想删除数组中的一段元素，应该使用方法 Array.splice()。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let getReturn = arr.slice(1,3);
console.log(getReturn);    //[&quot;element2&quot;, &quot;element3&quot;]
console.log(arr);    //[&quot;element1&quot;, &quot;element2&quot;, &quot;element3&quot;, &quot;element4&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">let</span> getReturn = arr.slice(<span class="hljs-number">1</span>,<span class="hljs-number">3</span>);
console.<span class="hljs-built_in">log</span>(getReturn);    //[<span class="hljs-string">"element2"</span>, <span class="hljs-string">"element3"</span>]
console.<span class="hljs-built_in">log</span>(arr);    //[<span class="hljs-string">"element1"</span>, <span class="hljs-string">"element2"</span>, <span class="hljs-string">"element3"</span>, <span class="hljs-string">"element4"</span>]</code></pre>
<h3 id="articleHeader3">（4）join(separator)把数组中的所有元素放入一个字符串。</h3>
<p>separator:可选。指定要使用的分隔符。如果省略该参数，则使用逗号作为分隔符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let getReturn = arr.join();
console.log(getReturn);    //element1,element2,element3,element4
console.log(arr);    //[&quot;element1&quot;, &quot;element2&quot;, &quot;element3&quot;, &quot;element4&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">let</span> getReturn = arr.<span class="hljs-built_in">join</span>();
console.<span class="hljs-built_in">log</span>(getReturn);    //element1,element2,element3,element4
console.<span class="hljs-built_in">log</span>(arr);    //[<span class="hljs-string">"element1"</span>, <span class="hljs-string">"element2"</span>, <span class="hljs-string">"element3"</span>, <span class="hljs-string">"element4"</span>]</code></pre>
<h3 id="articleHeader4">（5）concat(array1,array2,......,arrayX) 方法用于连接两个或多个数组。</h3>
<p>arrayX:必需。该参数可以是具体的值，也可以是数组对象。可以是任意多个。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//传数组
let getReturn = arr.concat(['element5',&quot;element6&quot;],[&quot;element7&quot;]);
console.log(getReturn);    //[&quot;element1&quot;, &quot;element2&quot;, &quot;element3&quot;, &quot;element4&quot;, &quot;element5&quot;, &quot;element6&quot;, &quot;element7&quot;]
console.log(arr);    //&nbsp;[&quot;element1&quot;, &quot;element2&quot;, &quot;element3&quot;, &quot;element4&quot;]

//传元素
let getReturn = arr.concat('element5',&quot;element6&quot;);
console.log(getReturn);    //[&quot;element1&quot;, &quot;element2&quot;, &quot;element3&quot;, &quot;element4&quot;, &quot;element5&quot;, &quot;element6&quot;]
console.log(arr);    //[&quot;element1&quot;, &quot;element2&quot;, &quot;element3&quot;, &quot;element4&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-regexp">//</span>传数组
let getReturn = arr.concat([<span class="hljs-string">'element5'</span>,<span class="hljs-string">"element6"</span>],[<span class="hljs-string">"element7"</span>]);
console.log(getReturn);    <span class="hljs-regexp">//</span>[<span class="hljs-string">"element1"</span>, <span class="hljs-string">"element2"</span>, <span class="hljs-string">"element3"</span>, <span class="hljs-string">"element4"</span>, <span class="hljs-string">"element5"</span>, <span class="hljs-string">"element6"</span>, <span class="hljs-string">"element7"</span>]
console.log(arr);    <span class="hljs-regexp">//</span>&nbsp;[<span class="hljs-string">"element1"</span>, <span class="hljs-string">"element2"</span>, <span class="hljs-string">"element3"</span>, <span class="hljs-string">"element4"</span>]

<span class="hljs-regexp">//</span>传元素
let getReturn = arr.concat(<span class="hljs-string">'element5'</span>,<span class="hljs-string">"element6"</span>);
console.log(getReturn);    <span class="hljs-regexp">//</span>[<span class="hljs-string">"element1"</span>, <span class="hljs-string">"element2"</span>, <span class="hljs-string">"element3"</span>, <span class="hljs-string">"element4"</span>, <span class="hljs-string">"element5"</span>, <span class="hljs-string">"element6"</span>]
console.log(arr);    <span class="hljs-regexp">//</span>[<span class="hljs-string">"element1"</span>, <span class="hljs-string">"element2"</span>, <span class="hljs-string">"element3"</span>, <span class="hljs-string">"element4"</span>]</code></pre>
<h3 id="articleHeader5">（6）sort(sortby) 方法用于对数组的元素进行排序。</h3>
<p>sortby:可选。规定排序顺序。必须是函数。<br>返回值:对数组的引用。请注意，数组在原数组上进行排序，不生成新数组。<br>比较规则:是按照字符编码进行排序，所以可能只有排出来的不是你想要的结果，得传参数解决</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let newArr = [3,5,2,4,1];

let getReturn = newArr.sort();
console.log(getReturn);      //[1, 2, 3, 4, 5]
console.log(newArr);    //[1, 2, 3, 4, 5]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>let <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span> = [<span class="hljs-number">3</span>,<span class="hljs-number">5</span>,<span class="hljs-number">2</span>,<span class="hljs-number">4</span>,<span class="hljs-number">1</span>];

let getReturn = <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>.sort();
console.log(getReturn);      <span class="hljs-comment">//[1, 2, 3, 4, 5]</span>
console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>);    <span class="hljs-comment">//[1, 2, 3, 4, 5]</span>
</code></pre>
<p>再看一个不如我们所愿的例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let newArr = [1000,88,93,6,34];
let getReturn = newArr.sort();
console.log(getReturn);    //[1000, 34, 6, 88, 93]
console.log(newArr);    //&nbsp;[1000, 34, 6, 88, 93]

//要实现大小排序，我们需要传参数解决
function sortNumber(a,b){    //定义函数
    return a - b
}
let getReturn = newArr.sort();
console.log(getReturn);    //[6, 34, 88, 93, 1000]
console.log(newArr);    //[6, 34, 88, 93, 1000]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>let <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span> = [<span class="hljs-number">1000</span>,<span class="hljs-number">88</span>,<span class="hljs-number">93</span>,<span class="hljs-number">6</span>,<span class="hljs-number">34</span>];
let getReturn = <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>.sort();
console.log(getReturn);    <span class="hljs-comment">//[1000, 34, 6, 88, 93]</span>
console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>);    <span class="hljs-comment">//&nbsp;[1000, 34, 6, 88, 93]</span>

<span class="hljs-comment">//要实现大小排序，我们需要传参数解决</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sortNumber</span></span>(a,b){    <span class="hljs-comment">//定义函数</span>
    <span class="hljs-keyword">return</span> a - b
}
let getReturn = <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>.sort();
console.log(getReturn);    <span class="hljs-comment">//[6, 34, 88, 93, 1000]</span>
console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>);    <span class="hljs-comment">//[6, 34, 88, 93, 1000]</span>
</code></pre>
<h3 id="articleHeader6">（7）shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。</h3>
<p>如果数组是空的，那么 shift() 方法将不进行任何操作，返回 undefined 值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  let getReturn = arr.shift();
  console.log(getReturn);    //element1
  console.log(arr);    //[&quot;element2&quot;,&quot;element3&quot;,&quot;element4&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code>  <span class="hljs-keyword">let</span> getReturn = arr.shift();
  <span class="hljs-built_in">console</span>.log(getReturn);    <span class="hljs-regexp">//element1
  console.log(arr);    //</span>[<span class="hljs-string">"element2"</span>,<span class="hljs-string">"element3"</span>,<span class="hljs-string">"element4"</span>]</code></pre>
<h3 id="articleHeader7">（8）unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。</h3>
<p>arr.unshift(newelement1,newelement2,....,newelementX)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  let getReturn = arr.unshift(&quot;element-1&quot;,&quot;element0&quot;);
  console.log(getReturn);    //6
  console.log(arr);    //[&quot;element-1&quot;,&quot;element0&quot;,&quot;element1&quot;,&quot;element2&quot;,&quot;element3&quot;,&quot;element4&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code>  <span class="hljs-keyword">let</span> getReturn = arr.unshift(<span class="hljs-string">"element-1"</span>,<span class="hljs-string">"element0"</span>);
  <span class="hljs-built_in">console</span>.log(getReturn);    <span class="hljs-regexp">//6
  console.log(arr);    //</span>[<span class="hljs-string">"element-1"</span>,<span class="hljs-string">"element0"</span>,<span class="hljs-string">"element1"</span>,<span class="hljs-string">"element2"</span>,<span class="hljs-string">"element3"</span>,<span class="hljs-string">"element4"</span>]</code></pre>
<h3 id="articleHeader8">（9）toString() 方法可把数组转换为字符串，并返回结果。</h3>
<p>arr.unshift(newelement1,newelement2,....,newelementX)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  let getReturn = arr.toString();
  console.log(getReturn,typeof getReturn);    //element1,element2,element3,element4 string
  console.log(arr,typeof arr);    //[&quot;element1&quot;, &quot;element2&quot;, &quot;element3&quot;, &quot;element4&quot;] &quot;object&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>  let getReturn = arr.toString();
  <span class="hljs-built_in">console</span>.log(getReturn,<span class="hljs-keyword">typeof</span> getReturn);    <span class="hljs-regexp">//</span>element1,element2,element3,element4 string
  <span class="hljs-built_in">console</span>.log(arr,<span class="hljs-keyword">typeof</span> arr);    <span class="hljs-regexp">//</span>[<span class="hljs-string">"element1"</span>, <span class="hljs-string">"element2"</span>, <span class="hljs-string">"element3"</span>, <span class="hljs-string">"element4"</span>] <span class="hljs-string">"object"</span></code></pre>
<p>注：用于字符串操作时，JavaScript 会调用这一方法将数组自动转换成字符串。例如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let string = arr+&quot;123&quot;;
console.log(string);    //element1,element2,element3,element4123" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> <span class="hljs-keyword">string</span> = arr+<span class="hljs-string">"123"</span>;
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">string</span>);    <span class="hljs-comment">//element1,element2,element3,element4123</span></code></pre>
<h3 id="articleHeader9">（10）reverse() 方法用于颠倒数组中元素的顺序。</h3>
<p>该方法会改变原来的数组，而不会创建新的数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  let getReturn = arr.reverse();
  console.log(getReturn);    //[&quot;element4&quot;, &quot;element3&quot;, &quot;element2&quot;, &quot;element1&quot;]
  console.log(arr);    //[&quot;element4&quot;, &quot;element3&quot;, &quot;element2&quot;, &quot;element1&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>  <span class="hljs-built_in">let</span> getReturn = arr.<span class="hljs-built_in">reverse</span>();
  console.<span class="hljs-built_in">log</span>(getReturn);    //[<span class="hljs-string">"element4"</span>, <span class="hljs-string">"element3"</span>, <span class="hljs-string">"element2"</span>, <span class="hljs-string">"element1"</span>]
  console.<span class="hljs-built_in">log</span>(arr);    //[<span class="hljs-string">"element4"</span>, <span class="hljs-string">"element3"</span>, <span class="hljs-string">"element2"</span>, <span class="hljs-string">"element1"</span>]</code></pre>
<h3 id="articleHeader10">3.还有</h3>
<p>此外，还有valueOf()，toLocaleString()，toSource()方法。但是从来没用过，也没想到什么使用场景，就不单独讲了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js:Array对象常用方法介绍 

## 原文链接
[https://segmentfault.com/a/1190000016948796](https://segmentfault.com/a/1190000016948796)

