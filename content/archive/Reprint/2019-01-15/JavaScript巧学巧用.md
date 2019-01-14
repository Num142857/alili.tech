---
title: 'JavaScript巧学巧用' 
date: 2019-01-15 2:30:12
hidden: true
slug: khvjd8hp19d
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">关于</h2>
<ul>
<li><p>微信公众号：前端呼啦圈（Love-FED）</p></li>
<li><p>我的博客：<a href="http://www.cnblogs.com/luozhihao" rel="nofollow noreferrer" target="_blank">劳卜的博客</a></p></li>
<li><p>知乎专栏：<a href="https://zhuanlan.zhihu.com/font-end" rel="nofollow noreferrer" target="_blank">前端呼啦圈</a></p></li>
</ul>
<h2 id="articleHeader1">前言</h2>
<p>由于工作和生活上的一些变化，最近写文章的频率有点下降了，实在不好意思，不过相信不久就会慢慢恢复过来，感谢大家一直以来的关注和支持。</p>
<p>本文主要给大家分享一下在编写JavaScript代码的时候存在的一些方法和技巧，虽然有时候条条大路都通向罗马，但是也许总会有那么一条最短的路径可走。希望通过以下几点JavaScript技巧让大家的代码“化繁为简，化简为精”。</p>
<h2 id="articleHeader2">巧学巧用</h2>
<h3 id="articleHeader3">1. new Set()</h3>
<p>可能有人知道ES6中提供了新的数据结构 Set，但是能够灵活运用的人或许不多。利用Set数据结构我们能够轻松的去重一个数组，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [1, 2, 2, 3];
let set = new Set(arr);
let newArr = Array.from(set); // Array.from方法可以将 Set 结构转为数组。

console.log(newArr); // [1, 2, 3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(arr);
<span class="hljs-keyword">let</span> newArr = <span class="hljs-built_in">Array</span>.from(set); <span class="hljs-comment">// Array.from方法可以将 Set 结构转为数组。</span>

<span class="hljs-built_in">console</span>.log(newArr); <span class="hljs-comment">// [1, 2, 3]</span></code></pre>
<h3 id="articleHeader4">2. Object.assign()</h3>
<p>Object.assign()也是ES6中提供的对象的扩展方法，其可以用于对象的合并拷贝，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj1 = {a: 1};
let obj2 = {b: 2};
let obj3 = Object.assign({}, obj1, obj2);

console.log(obj3); // {a: 1, b: 2}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> obj1 = {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>};
<span class="hljs-keyword">let</span> obj2 = {<span class="hljs-attr">b</span>: <span class="hljs-number">2</span>};
<span class="hljs-keyword">let</span> obj3 = <span class="hljs-built_in">Object</span>.assign({}, obj1, obj2);

<span class="hljs-built_in">console</span>.log(obj3); <span class="hljs-comment">// {a: 1, b: 2}</span></code></pre>
<h3 id="articleHeader5">3. map()</h3>
<p>map方法用于遍历数组，有返回值，可以对数组的每一项进行操作并生成一个新的数组，有些时候可以代替for和forEach循环，简化代码，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr3 = [1, 2, 3, 4, 5];

let newArr3 = arr3.map((e, i) => e * 10); // 给数组每一项乘以10

console.log(newArr3); // [10, 20, 30, 40, 50]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> arr3 = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];

<span class="hljs-keyword">let</span> newArr3 = arr3.map(<span class="hljs-function">(<span class="hljs-params">e, i</span>) =&gt;</span> e * <span class="hljs-number">10</span>); <span class="hljs-comment">// 给数组每一项乘以10</span>

<span class="hljs-built_in">console</span>.log(newArr3); <span class="hljs-comment">// [10, 20, 30, 40, 50]</span></code></pre>
<h3 id="articleHeader6">4. filter()</h3>
<p>filter方法同样用于遍历数组，顾名思义，就是过滤数组，在每一项元素后面触发一个回调函数，通过判断，保留或移除当前项，最后返回一个新的数组，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr4 = [1, 2, 3, 4, 5];

let newArr4 = arr4.filter((e, i) => e % 2 === 0); // 取模，过滤余数不为0的数

console.log(newArr4); // [2，4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> arr4 = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];

<span class="hljs-keyword">let</span> newArr4 = arr4.filter(<span class="hljs-function">(<span class="hljs-params">e, i</span>) =&gt;</span> e % <span class="hljs-number">2</span> === <span class="hljs-number">0</span>); <span class="hljs-comment">// 取模，过滤余数不为0的数</span>

<span class="hljs-built_in">console</span>.log(newArr4); <span class="hljs-comment">// [2，4]</span></code></pre>
<h3 id="articleHeader7">5. some()</h3>
<p>some方法用于遍历数组，在每一项元素后面触发一个回调函数，只要一个满足条件就返回true，否则返回false，类似于 || 比较，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr5 = [{result: true}, {result: false}];

let newArr5 = arr5.some((e, i) => e.result); // 只要一个为true，即为true

console.log(newArr5); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> arr5 = [{<span class="hljs-attr">result</span>: <span class="hljs-literal">true</span>}, {<span class="hljs-attr">result</span>: <span class="hljs-literal">false</span>}];

<span class="hljs-keyword">let</span> newArr5 = arr5.some(<span class="hljs-function">(<span class="hljs-params">e, i</span>) =&gt;</span> e.result); <span class="hljs-comment">// 只要一个为true，即为true</span>

<span class="hljs-built_in">console</span>.log(newArr5); <span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader8">6.every()</h3>
<p>every方法用于遍历数组，在每一项元素后面触发一个回调函数，只要一个不满足条件就返回false，否则返回true，类似于 &amp;&amp; 比较，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr6 = [{result: true}, {result: false}];

let newArr6 = arr6.every((e, i) => e.result); // 只要一个为false，即为false

console.log(newArr6); // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> arr6 = [{<span class="hljs-attr">result</span>: <span class="hljs-literal">true</span>}, {<span class="hljs-attr">result</span>: <span class="hljs-literal">false</span>}];

<span class="hljs-keyword">let</span> newArr6 = arr6.every(<span class="hljs-function">(<span class="hljs-params">e, i</span>) =&gt;</span> e.result); <span class="hljs-comment">// 只要一个为false，即为false</span>

<span class="hljs-built_in">console</span>.log(newArr6); <span class="hljs-comment">// false</span></code></pre>
<h3 id="articleHeader9">7. ~~运算符</h3>
<p>~符号用在JavaScript中有按位取反的作用，~~即是取反两次，而位运算的操作值要求是整数，其结果也是整数，所以经过位运算的都会自动变成整数，可以巧妙的去掉小数部分，类似于parseInt，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = 1.23;
let b = -1.23;

console.log(~~a); // 1
console.log(~~b); // -1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> a = <span class="hljs-number">1.23</span>;
<span class="hljs-keyword">let</span> b = <span class="hljs-number">-1.23</span>;

<span class="hljs-built_in">console</span>.log(~~a); <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(~~b); <span class="hljs-comment">// -1</span></code></pre>
<h3 id="articleHeader10">8. ||运算符</h3>
<p>巧妙的使用 || 运算符我们可以给变量设置默认值，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let c = 1;
let d = c || 2; // 如果c的值为true则取存在的值，否则为2

console.log(d); // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> c = <span class="hljs-number">1</span>;
<span class="hljs-keyword">let</span> d = c || <span class="hljs-number">2</span>; <span class="hljs-comment">// 如果c的值为true则取存在的值，否则为2</span>

<span class="hljs-built_in">console</span>.log(d); <span class="hljs-comment">// 1</span></code></pre>
<h3 id="articleHeader11">9. ...运算符</h3>
<p>...运算符是ES6中用于解构数组的方法，可以用于快速获取数组的参数，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let [num1, ...nums] = [1, 2, 3];

console.log(num1); // 1
console.log(nums); // [2, 3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> [num1, ...nums] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];

<span class="hljs-built_in">console</span>.log(num1); <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(nums); <span class="hljs-comment">// [2, 3]</span></code></pre>
<h3 id="articleHeader12">10. 三元运算符</h3>
<p>该运算符应该大家都比较熟悉，在默写情况下可以简化if else的写法，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let e = true,
    f = '';

if (e) {
    f = 'man';
} else {
    f = 'woman';
}

// 等同于
f = e ? 'man' : 'women';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> e = <span class="hljs-literal">true</span>,
    f = <span class="hljs-string">''</span>;

<span class="hljs-keyword">if</span> (e) {
    f = <span class="hljs-string">'man'</span>;
} <span class="hljs-keyword">else</span> {
    f = <span class="hljs-string">'woman'</span>;
}

<span class="hljs-comment">// 等同于</span>
f = e ? <span class="hljs-string">'man'</span> : <span class="hljs-string">'women'</span>;</code></pre>
<h2 id="articleHeader13">结语</h2>
<p>本文只列出了JavaScript语法中比较常见的10点提升编码效率的方法进行了简单地阐述，当然每一个知识点都可以进行相应的展开与探究，希望大家在巧学的同时达到巧用的效果。</p>
<p>如果觉得本文对你有帮助，可以关注我的微信公众号，来这里聊点关于前端的事情。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008912293?w=238&amp;h=260" src="https://static.alili.tech/img/remote/1460000008912293?w=238&amp;h=260" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript巧学巧用

## 原文链接
[https://segmentfault.com/a/1190000009217807](https://segmentfault.com/a/1190000009217807)

