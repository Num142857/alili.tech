---
title: 'ES6 实践当中的小经验' 
date: 2019-01-09 2:30:12
hidden: true
slug: qg7uum1dfzp
categories: [reprint]
---

{{< raw >}}

                    
<p>解析赋值<br>现假设有如下一个json数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var jsonData = {
  id: 42,
  status: &quot;OK&quot;,
  data: [867, 5309]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>var jsonData = {
<span class="hljs-symbol">  id:</span> <span class="hljs-number">42</span>,
<span class="hljs-symbol">  status:</span> <span class="hljs-string">"OK"</span>,
<span class="hljs-symbol">  data:</span> [<span class="hljs-number">867</span>, <span class="hljs-number">5309</span>]
};</code></pre>
<p>结果如下的两种方式输出的结果完全相同：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let { id, status, data: number } = jsonData;

console.log(id, status, number); // 42, 'OK', [867, 5309]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>let { id, <span class="hljs-keyword">status</span>, <span class="hljs-keyword">data</span>: <span class="hljs-keyword">number</span> } = jsonData;

console.<span class="hljs-built_in">log</span>(id, <span class="hljs-keyword">status</span>, <span class="hljs-keyword">number</span>); // <span class="hljs-number">42</span>, <span class="hljs-string">'OK'</span>, [<span class="hljs-number">867</span>, <span class="hljs-number">5309</span>]</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let { id, status, data } = jsonData;

console.log(id, status, data); // 42, 'OK', [867, 5309]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>let { id, <span class="hljs-keyword">status</span>, <span class="hljs-keyword">data</span> } = jsonData;

console.<span class="hljs-built_in">log</span>(id, <span class="hljs-keyword">status</span>, <span class="hljs-keyword">data</span>); // <span class="hljs-number">42</span>, <span class="hljs-string">'OK'</span>, [<span class="hljs-number">867</span>, <span class="hljs-number">5309</span>]</code></pre>
<p>其实并不知道为什么两种方式都支持，觉得就应该是第二种方式才正统</p>
<p>ES6给数组扩展了一个fill方法，使用方法如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="['a', 'b', 'c'].fill(7)
// [7, 7, 7]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>[<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>].<span class="hljs-built_in">fill</span>(<span class="hljs-number">7</span>)
<span class="hljs-comment">// [7, 7, 7]</span></code></pre>
<p>也就是说它是给数组填充值,但是如果填充的是引用类型的话，则事实上改变其中一个所有的都会改变<br>如下图所示：<br><span class="img-wrap"><img data-src="/img/bVQB0D?w=276&amp;h=451" src="https://static.alili.tech/img/bVQB0D?w=276&amp;h=451" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>ES6新增了for of运算，原先有了for in运算，为什么又增加for of运算，那来看看它俩之间的区别<br>在使用for in循环数组，for in会遍历数组所有可枚举属性，包括原型链上的，所以for in更适合遍历对象，不要使用for in遍历数组<br><span class="img-wrap"><img data-src="/img/bVQB3i?w=284&amp;h=300" src="https://static.alili.tech/img/bVQB3i?w=284&amp;h=300" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>for in 遍历的是数组的索引，而for of遍历的是数组的元素值<br><span class="img-wrap"><img data-src="/img/bVQB31?w=275&amp;h=237" src="https://static.alili.tech/img/bVQB31?w=275&amp;h=237" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>所以在循环数组的话用for of会更加方便一些</p>
<p>Array.from是将类似数组对象（部署了Iterator接口的数据结构，比如字符串和Set结构）转化为真正的数组，但是Array.from还接受第二个参数，作用类似于map方法用来对每个元素进行处理，将处理后的值放入返回的数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Array.from([1, 2, 3], (x) => x * x));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(Array.<span class="hljs-keyword">from</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], <span class="hljs-function"><span class="hljs-params">(x)</span> =&gt;</span> x * x));</code></pre>
<p>数组合并</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2);
console.log(arr1); // 0,1,2,3,4,5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr1 = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
var arr2 = [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
arr1.push(...arr2);
console.log(arr1); <span class="hljs-comment">// 0,1,2,3,4,5</span></code></pre>
<p>数组求最大值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Math.max(...[14, 3, 77]))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-selector-tag">Math</span><span class="hljs-selector-class">.max</span>(...<span class="hljs-selector-attr">[14, 3, 77]</span>))</code></pre>
<p>扩展运算符还可以替代Object.assign</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let ab = { ...a, ...b }; //这句话跟下面的同样作用
let ab = Object.assign({}, a, b);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">let</span> ab = { ...a, ...b }; <span class="hljs-comment">//这句话跟下面的同样作用</span>
<span class="hljs-keyword">let</span> ab = Object.assign({}, a, b);</code></pre>
<p>去除数组重量的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arrs = [1, 2, 3, 1, 3, 4];
console.log([...new Set(arrs)]); // [1, 2, 3, 4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arrs = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>];
console.log([...new Set(arrs)]); <span class="hljs-comment">// [1, 2, 3, 4]</span></code></pre>
<p>另一种方法去重：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(array) {
  return Array.from(new Set(array));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">array</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.from(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(array));
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 实践当中的小经验

## 原文链接
[https://segmentfault.com/a/1190000010119284](https://segmentfault.com/a/1190000010119284)

