---
title: 'ES6/JavaScript一些‘巧用’' 
date: 2018-12-22 2:30:11
hidden: true
slug: l2exddl087q
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>第一次发表文章，如有不好的地方请<strong>见谅</strong>/</p>
<p>在编写JavaScript代码的时候存在的一些方法和技巧，虽然有时候条条大路都通向罗马，但是也许总会有那么一条<em>最短的路径</em>可走。本文将一些都知道却不怎么用的小技巧分享给大家/</p>
<hr>
<h2 id="articleHeader1">一些小技巧</h2>
<p><strong>1.</strong><strong>new Set()</strong><br>   数组的<code>去重</code>,在'潜意识'里面感觉就应该去<code>循环</code>然后对比去重,其实在ES6中新增提供了新的数据结构<code>Set</code>,用他可以<code>轻松</code>去重数组,比如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [1,1, 2, 2, 3, 3];
let set = new Set(arr);   //
let newArr = Array.from(set); // Array.from方法可以将 Set 结构转为数组。 
console.log(newArr); // [1, 2, 3]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>let arr = [<span class="hljs-number">1</span>,<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">3</span>];
let <span class="hljs-keyword">set</span> = <span class="hljs-keyword">new</span> <span class="hljs-type">Set</span>(arr);   <span class="hljs-comment">//</span>
let <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span> = <span class="hljs-keyword">Array</span>.from(<span class="hljs-keyword">set</span>); <span class="hljs-comment">// Array.from方法可以将 Set 结构转为数组。 </span>
console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>); <span class="hljs-comment">// [1, 2, 3]</span>
</code></pre>
<p><strong>2.Object.assign()</strong><br>也是ES6中提供的对象的扩展方法，其可以用于对象的合并拷贝,像之前对象合并也是很<code>繁琐</code>,但是现在很<code>easy</code>麽,比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj1 = {a: 1};
let obj2 = {b: 2};
let obj3 = Object.assign({}, obj1, obj2);

console.log(obj3); // {a: 1, b: 2}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> obj1 = {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>};
<span class="hljs-keyword">let</span> obj2 = {<span class="hljs-attr">b</span>: <span class="hljs-number">2</span>};
<span class="hljs-keyword">let</span> obj3 = <span class="hljs-built_in">Object</span>.assign({}, obj1, obj2);

<span class="hljs-built_in">console</span>.log(obj3); <span class="hljs-comment">// {a: 1, b: 2}</span>
</code></pre>
<p><strong>3.map()</strong><br>map方法用于遍历数组，有返回值，可以对数组的每一项进行操作并生成一个新的数组，有些时候可以代替<code>for</code>和<code>forEach</code>循环，简化代码，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr3 = [1, 2, 3, 4, 5];
let newArr3 = arr3.map((e, i) => e * 10); // 给数组每一项乘以10

console.log(newArr3); // [10, 20, 30, 40, 50]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>let arr3 = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
let newArr3 = arr3.map((e, i) =&gt; e * <span class="hljs-number">10</span>); <span class="hljs-comment">// 给数组每一项乘以10</span>

console.log(newArr3); <span class="hljs-comment">// [10, 20, 30, 40, 50]</span>
</code></pre>
<p><strong>4.filter()</strong><br>filter方法同样用于<code>遍历</code>数组，顾名思义，就是<code>过滤</code>数组，在每一项元素后面触发一个回调函数，通过判断，保留或移除当前项，最后返回一个<code>新</code>的数组，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr4 = [1, 2, 3, 4, 5];
let newArr4 = arr4.filter((e, i) => e % 2 === 0); // 取模，过滤余数不为0的数

console.log(newArr4); // [2，4]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>let arr4 = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
let newArr4 = arr4.filter((e, i) =&gt; e % <span class="hljs-number">2</span> === <span class="hljs-number">0</span>); <span class="hljs-comment">// 取模，过滤余数不为0的数</span>

console.log(newArr4); <span class="hljs-comment">// [2，4]</span>
</code></pre>
<p><strong>5.some()</strong><br><code>some</code>方法用于遍历数组，在每一项元素后面触发一个回调函数，只要一个满足条件就返回<code>true</code>，否则返回<code>false</code>，类似于 <code>||</code> 比较，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr5 = [{result: true}, {result: false}];
let newArr5 = arr5.some((e, i) => e.result); // 只要一个为true，即为true

console.log(newArr5); // true

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-keyword">let</span> arr5 = [{<span class="hljs-literal">result</span>: <span class="hljs-literal">true</span>}, {<span class="hljs-literal">result</span>: <span class="hljs-literal">false</span>}];
<span class="hljs-keyword">let</span> newArr5 = arr5.some((e, i) =&gt; e.<span class="hljs-literal">result</span>); // 只要一个为<span class="hljs-literal">true</span>，即为<span class="hljs-literal">true</span>

console.log(newArr5); // <span class="hljs-literal">true</span>

</code></pre>
<p><strong>6.every()</strong> //与5相反的<br>every方法用于遍历数组，在每一项元素后面触发一个回调函数，只要一个不满足条件就返回<code>false</code>，否则返回<code>true</code>，类似于 <code>&amp;&amp;</code>比较，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr6 = [{result: true}, {result: false}];
let newArr6 = arr6.every((e, i) => e.result); // 只要一个为false，即为false

console.log(newArr6); // false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-keyword">let</span> arr6 = [{<span class="hljs-literal">result</span>: <span class="hljs-literal">true</span>}, {<span class="hljs-literal">result</span>: <span class="hljs-literal">false</span>}];
<span class="hljs-keyword">let</span> newArr6 = arr6.every((e, i) =&gt; e.<span class="hljs-literal">result</span>); // 只要一个为<span class="hljs-literal">false</span>，即为<span class="hljs-literal">false</span>

console.log(newArr6); // <span class="hljs-literal">false</span>
</code></pre>
<p><strong>7.三元运算符</strong><br>该运算符应该大家都比较熟悉，在默写情况下可以简化if else的写法，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let e = true,
    f = '';
if (e) {
    f = 'aaa';
} else {
    f = 'bbb';
}

// 等同于
f = e ? 'aaa' : 'bbb';

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> e = <span class="hljs-literal">true</span>,
    f = <span class="hljs-string">''</span>;
<span class="hljs-keyword">if</span> (e) {
    f = <span class="hljs-string">'aaa'</span>;
} <span class="hljs-keyword">else</span> {
    f = <span class="hljs-string">'bbb'</span>;
}

// 等同于
f = e ? <span class="hljs-string">'aaa'</span> : <span class="hljs-string">'bbb'</span>;

</code></pre>
<p><strong>8.~~运算符</strong><br>~符号用在JavaScript中有按位取反的作用，~~即是取反两次，而位运算的操作值要求是整数，其结果也是整数，所以经过位运算的都会自动变成整数，可以巧妙的去掉小数部分，类似于parseInt，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = 1.23;
let b = -1.23;

console.log(~~a); // 1
console.log(~~b); // -1

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> a = <span class="hljs-number">1.23</span>;
<span class="hljs-keyword">let</span> b = <span class="hljs-number">-1.23</span>;

console.<span class="hljs-built_in">log</span>(~~a); <span class="hljs-comment">// 1</span>
console.<span class="hljs-built_in">log</span>(~~b); <span class="hljs-comment">// -1</span>

</code></pre>
<h2 id="articleHeader2">结语</h2>
<p>本文只列出了JavaScript语法中比较常见的几点能够提升速度的方法，希望大家在<strong>巧学过程中达到巧用知识的效果</strong>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6/JavaScript一些‘巧用’

## 原文链接
[https://segmentfault.com/a/1190000012408287](https://segmentfault.com/a/1190000012408287)

