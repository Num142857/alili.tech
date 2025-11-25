---
title: 'ES6的Set数据结构' 
date: 2019-01-18 2:30:34
hidden: true
slug: zete3sjzred
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">ES6：Set</h2>
<p>大神地址：<a href="http://es6.ruanyifeng.com/#docs/set-map" rel="nofollow noreferrer" target="_blank">来自阮一峰大神的ES6入门书籍</a></p>
<h3 id="articleHeader1">了解Set</h3>
<p>ES6提供了数据结构Set。类似于数组，但是没有重复值。</p>
<ul><li>Set本身是一个构造函数，用来生成Set数据结构</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
for(let i of s ) {
    console.log(i); //2 3 5 4
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> s = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>();
[<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>].forEach(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> s.add(x));
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i <span class="hljs-keyword">of</span> s ) {
    <span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">//2 3 5 4</span>
}</code></pre>
<ul><li>Set可以接受一个数组（或者类数组对象）作为参数，用来初始化</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var set = new Set([1, 2, 3, 4, 4]);
[...set]; // [1, 2, 3, 4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">set</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">4</span>]);
[...<span class="hljs-keyword">set</span>]; <span class="hljs-comment">// [1, 2, 3, 4]</span></code></pre>
<blockquote>
<p>可用于数组去重<code>[...new Set(array)]</code></p>
<p><code>Array.from()</code>方法可以将Set结构转换为数组<code>Array.from(new Set(array))</code></p>
</blockquote>
<ul><li>向Set加入值时，不会发生类型转换（类似于精确相等===），但是要注意在Set里NaN是等于自身的。另外两个对象总是不相等的。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set();
let a = NaN；
let b = NaN;
set.add(a);
set.add(b);
set; //{NaN} 只能加入一个，说明Set内部两个NaN是相等的" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>();
<span class="hljs-keyword">let</span> a = <span class="hljs-literal">NaN</span>；
<span class="hljs-keyword">let</span> b = <span class="hljs-literal">NaN</span>;
set.add(a);
set.add(b);
set; <span class="hljs-comment">//{NaN} 只能加入一个，说明Set内部两个NaN是相等的</span></code></pre>
<h3 id="articleHeader2">Set实例的属性和方法</h3>
<ul>
<li>
<p>属性：</p>
<ul>
<li>
<code>Set.prototype.constructor</code>：构造函数，默认就是Set函数</li>
<li>
<code>Set.prototype.size</code>：返回实例的成员总数</li>
</ul>
</li>
<li>
<p>操作方法（方法的具体实现见：<a href="https://segmentfault.com/a/1190000008792957">我对JS集合的简单学习</a>）：</p>
<ul>
<li>
<code>add(value)</code>：添加一个值，返回Set结构本身</li>
<li>
<code>delete(value)</code>：删除某个值，返回布尔值</li>
<li>
<code>has(value)</code>：返回布尔值，表示是否是成员</li>
<li>
<code>clear()</code>：清除所有成员，无返回值</li>
</ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="s.add(1).add(2).add(2); //链式写法

s.size(); //2

s.has(3); //false

s.delete(2);
s.has(2); //false " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">s.add(<span class="hljs-number">1</span>).add(<span class="hljs-number">2</span>).add(<span class="hljs-number">2</span>); <span class="hljs-comment">//链式写法</span>

s.size(); <span class="hljs-comment">//2</span>

s.has(<span class="hljs-number">3</span>); <span class="hljs-comment">//false</span>

s.delete(<span class="hljs-number">2</span>);
s.has(<span class="hljs-number">2</span>); <span class="hljs-comment">//false </span></code></pre>
<ul><li>
<p>遍历方法</p>
<ul>
<li>
<code>keys()</code>：返回键名的遍历器（什么是遍历器？Iterator）</li>
<li>
<code>values()</code>：返回键值的遍历器</li>
<li>
<code>entries()</code>：返回键值对的遍历器</li>
<li>
<code>forEach()</code>：使用回调函数遍历每个成员</li>
</ul>
</li></ul>
<blockquote><p>这里要注意Set的键名和键值是同一个值，所以key()和values()行为是一致的。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set(['red', 'green', 'no']);

for(let item of set.keys()) {
    console.log(item); //red green no
}

for(let item of set.values()) {
    console.log(item); //red green no
}

for(let item of set.entries()) {
    console.log(item); //['red': 'red'] ['green': 'green'] ['no': 'no']
}

//对每个成员执行某种操作，参数依次为键值、键名、集合本身
new Set([1, 2, 3]).forEach((value, key) => console.log(value * 2)); //2 4 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-string">'red'</span>, <span class="hljs-string">'green'</span>, <span class="hljs-string">'no'</span>]);

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> item <span class="hljs-keyword">of</span> set.keys()) {
    <span class="hljs-built_in">console</span>.log(item); <span class="hljs-comment">//red green no</span>
}

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> item <span class="hljs-keyword">of</span> set.values()) {
    <span class="hljs-built_in">console</span>.log(item); <span class="hljs-comment">//red green no</span>
}

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> item <span class="hljs-keyword">of</span> set.entries()) {
    <span class="hljs-built_in">console</span>.log(item); <span class="hljs-comment">//['red': 'red'] ['green': 'green'] ['no': 'no']</span>
}

<span class="hljs-comment">//对每个成员执行某种操作，参数依次为键值、键名、集合本身</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]).forEach(<span class="hljs-function">(<span class="hljs-params">value, key</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(value * <span class="hljs-number">2</span>)); <span class="hljs-comment">//2 4 6</span></code></pre>
<h3 id="articleHeader3">操作集合</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

//并集
let union = new Set([...a, ...b]); //{1, 2, 3, 4}

//交集
let intersect = new Set([...a].filter(x => b.has(x))); //{2, 3}

//差集
let difference = new Set([...a].filter(x => !b.has(x))); //{1}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> a = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);
<span class="hljs-keyword">let</span> b = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>]);

<span class="hljs-comment">//并集</span>
<span class="hljs-keyword">let</span> union = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([...a, ...b]); <span class="hljs-comment">//{1, 2, 3, 4}</span>

<span class="hljs-comment">//交集</span>
<span class="hljs-keyword">let</span> intersect = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([...a].filter(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> b.has(x))); <span class="hljs-comment">//{2, 3}</span>

<span class="hljs-comment">//差集</span>
<span class="hljs-keyword">let</span> difference = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([...a].filter(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> !b.has(x))); <span class="hljs-comment">//{1}</span></code></pre>
<blockquote><p>号外：<strong>扩展运算符（...）内部使用for...of循环</strong>，所以应该知道for of是干嘛的吧</p></blockquote>
<p>数组的<code>map()</code>和<code>filter()</code>可用于Set</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2)); //set: {2, 4, 6}

let set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0)); //set {2, 4}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>let <span class="hljs-keyword">set</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);
<span class="hljs-keyword">set</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([...<span class="hljs-keyword">set</span>].map(x =&gt; x * <span class="hljs-number">2</span>)); <span class="hljs-comment">//set: {2, 4, 6}</span>

let <span class="hljs-keyword">set</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]);
<span class="hljs-keyword">set</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([...<span class="hljs-keyword">set</span>].filter(x =&gt; (x % <span class="hljs-number">2</span>) == <span class="hljs-number">0</span>)); <span class="hljs-comment">//set {2, 4}</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6的Set数据结构

## 原文链接
[https://segmentfault.com/a/1190000008804891](https://segmentfault.com/a/1190000008804891)

