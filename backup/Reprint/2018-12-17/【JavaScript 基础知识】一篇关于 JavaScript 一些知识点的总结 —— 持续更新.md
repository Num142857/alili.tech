---
title: '【JavaScript 基础知识】一篇关于 JavaScript 一些知识点的总结 —— 持续更新' 
date: 2018-12-17 2:30:06
hidden: true
slug: hpogz836fy
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">JavaScript 中基础数据类型</h2>
<table>
<thead><tr>
<th>数据类型名称</th>
<th>数据类型说明</th>
</tr></thead>
<tbody>
<tr>
<td>Undefined</td>
<td>只有一个值，即 <code> undefined </code>，声明变量的初始值。</td>
</tr>
<tr>
<td>Null</td>
<td>只有一个值，即 <code> null </code>，表示空指针，<code> undefined </code> 的值是派生 <code> null </code> 的值。</td>
</tr>
<tr>
<td>String</td>
<td>由零或多个 16 位 <code> Unicode </code> 字符组成</td>
</tr>
<tr>
<td>Boolean</td>
<td>只有两个值，即 <code> true </code> 和 <code> false </code>
</td>
</tr>
<tr>
<td>Number</td>
<td>该类型使用 <code> IEEE754 </code> 来表示整数和浮点数。</td>
</tr>
<tr>
<td>Object</td>
<td>ECMAScript 中的对象其实就是一组数据和功能的集合。</td>
</tr>
<tr>
<td>Symbol</td>
<td>ES6 中新加入的数据类型，表示独一无二的值。</td>
</tr>
</tbody>
</table>
<p><strong>其中 <code> Object </code> 类型包含 <code> Function </code>、<code> Array </code>、<code> Date </code>、<code> RegExp </code>。</strong></p>
<h2 id="articleHeader1">JavaScript 中的内置对象</h2>
<table>
<thead><tr>
<th>对象名称</th>
<th>对象说明</th>
</tr></thead>
<tbody>
<tr>
<td>Arguments</td>
<td>函数参数集合</td>
</tr>
<tr>
<td>Array</td>
<td>数组</td>
</tr>
<tr>
<td>Boolean</td>
<td>布尔对象</td>
</tr>
<tr>
<td>Date</td>
<td>日期对象</td>
</tr>
<tr>
<td>Error</td>
<td>异常对象</td>
</tr>
<tr>
<td>Function</td>
<td>函数构造器</td>
</tr>
<tr>
<td>Math</td>
<td>数学对象</td>
</tr>
<tr>
<td>Number</td>
<td>数值对象</td>
</tr>
<tr>
<td>Object</td>
<td>基础对象</td>
</tr>
<tr>
<td>String</td>
<td>字符串对象</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader2">
<code> typeof null </code> 返回结果为 <code> 'object' </code>
</h2>
<p>  从逻辑上来看，<code> null </code> 值表示一个空对象指针，因此会返回一个 <code> 'object' </code>，也可以理解为是 JavaScript 早期的一个BUG，而现在标准就是这样规范的。V8曾经修正并实现过<code> typeof null === 'null' </code>,但最终证明不可行。<a href="http://wiki.ecmascript.org/doku.php?id=harmony" rel="nofollow noreferrer" target="_blank">http://wiki.ecmascript.org/do...</a>:typeof_null</p>
<h2 id="articleHeader3">
<code> Array </code> 对象方法与作用</h2>
<table>
<thead><tr>
<th>方法名称</th>
<th>对象说明</th>
</tr></thead>
<tbody>
<tr>
<td>concat</td>
<td>用于连接两个或更多的数组并返回结果,<code> arr1.concat(arr2)  </code>
</td>
</tr>
<tr>
<td>join</td>
<td>把数组的所有元素放入一个字符串，元素通过制定的分隔符进行分离 <code> arr1.join(',') </code>
</td>
</tr>
<tr>
<td>pop</td>
<td>删除并返回数组中的最后一个元素 <code> arr1.pop() </code>
</td>
</tr>
<tr>
<td>push</td>
<td>向数组的末尾添加一个或更多元素，并返回新的长度 <code> arr1.push(1) </code>
</td>
</tr>
<tr>
<td>reverse</td>
<td>颠倒数组中的元素顺序,<code> arr1.reverse() </code>
</td>
</tr>
<tr>
<td>shift</td>
<td>删除并返回数组中的第一个元素  <code> arr1.shift() </code>
</td>
</tr>
<tr>
<td>slice</td>
<td>从某个已有的数组返回指定的元素</td>
</tr>
<tr>
<td>sort</td>
<td>对数组的元素进行排序 <code> arr1.sort() </code>
</td>
</tr>
<tr>
<td>splice</td>
<td>删除元素，并向数组中添加新元素</td>
</tr>
<tr>
<td>toString</td>
<td>把数组转成字符串 <code> arr1.toString() </code>
</td>
</tr>
<tr>
<td>toLocaleString</td>
<td>把数组转换为本地字符串 <code> arr1.toLocaleString() </code>
</td>
</tr>
<tr>
<td>unshift</td>
<td>向数组的开头添加一个或更多的元素 <code> arr1.unshift(1) </code>
</td>
</tr>
<tr>
<td>valueOf</td>
<td>返回数组对象的原始值</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader4">
<code> typeof </code> 可能的返回值</h2>
<table>
<thead><tr>
<th>类型</th>
<th>返回结果</th>
</tr></thead>
<tbody>
<tr>
<td>Undefined</td>
<td>"undefined"</td>
</tr>
<tr>
<td>Null</td>
<td>"object"</td>
</tr>
<tr>
<td>Boolean</td>
<td>"boolean"</td>
</tr>
<tr>
<td>Number</td>
<td>"number"</td>
</tr>
<tr>
<td>String</td>
<td>"string"</td>
</tr>
<tr>
<td>Symbol （ECMAScript 6 新增）</td>
<td>"symbol"</td>
</tr>
<tr>
<td>宿主对象（由JS环境提供）</td>
<td>Implementation-dependent</td>
</tr>
<tr>
<td>函数对象（[[Call]] 在ECMA-262条款中实现了）</td>
<td>"function"</td>
</tr>
<tr>
<td>任何其他对象</td>
<td>"object"</td>
</tr>
</tbody>
</table>
<blockquote>上述来自 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof" rel="nofollow noreferrer" target="_blank">MDN</a>
</blockquote>
<p>对文章有不正确之处，请给予纠正。<a href="https://github.com/SilenceHVK/articles/issues/16" rel="nofollow noreferrer" target="_blank">github 文章</a> 请顺手给个 Star，最后感谢您的阅读。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【JavaScript 基础知识】一篇关于 JavaScript 一些知识点的总结 —— 持续更新

## 原文链接
[https://segmentfault.com/a/1190000012914521](https://segmentfault.com/a/1190000012914521)

