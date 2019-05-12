---
title: 'ES6 Map常用方法总结' 
date: 2019-01-05 2:30:11
hidden: true
slug: 6ljl45l4wk5
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.Map 结构转为数组结构</h2>
<p>比较快速的方法是结合使用扩展运算符（...）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);
[...map.keys()]
// [1, 2, 3]
[...map.values()]
// ['one', 'two', 'three']
[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]
[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>let map = new <span class="hljs-symbol">Map</span>([
  [<span class="hljs-number">1</span>, <span class="hljs-string">'one'</span>],
  [<span class="hljs-number">2</span>, <span class="hljs-string">'two'</span>],
  [<span class="hljs-number">3</span>, <span class="hljs-string">'three'</span>],
]);
[...map.keys()]
// [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
[...map.values()]
// [<span class="hljs-string">'one'</span>, <span class="hljs-string">'two'</span>, <span class="hljs-string">'three'</span>]
[...map.entries()]
// [[<span class="hljs-number">1</span>,<span class="hljs-string">'one'</span>], [<span class="hljs-number">2</span>, <span class="hljs-string">'two'</span>], [<span class="hljs-number">3</span>, <span class="hljs-string">'three'</span>]]
[...map]
// [[<span class="hljs-number">1</span>,<span class="hljs-string">'one'</span>], [<span class="hljs-number">2</span>, <span class="hljs-string">'two'</span>], [<span class="hljs-number">3</span>, <span class="hljs-string">'three'</span>]]
</code></pre>
<h2 id="articleHeader1">2.Map 循环遍历</h2>
<p>Map 原生提供三个遍历器:</p>
<blockquote><ul>
<li>keys()：返回键名的遍历器。</li>
<li>values()：返回键值的遍历器。</li>
<li>entries()：返回所有成员的遍历器。</li>
</ul></blockquote>
<p>下面是使用实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// &quot;F&quot;
// &quot;T&quot;

for (let value of map.values()) {
  console.log(value);
}
// &quot;no&quot;
// &quot;yes&quot;

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// &quot;F&quot; &quot;no&quot;
// &quot;T&quot; &quot;yes&quot;

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}

上面代码最后的那个例子，表示 Map 结构的默认遍历器接口（Symbol.iterator 属性），就是 entries 方法。

map[Symbol.iterator] === map.entries // true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> <span class="hljs-keyword">map</span> = new Map([
  [<span class="hljs-string">'F'</span>, <span class="hljs-string">'no'</span>],
  [<span class="hljs-string">'T'</span>,  <span class="hljs-string">'yes'</span>],
]);

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">of</span> <span class="hljs-keyword">map</span>.keys()) {
  console.log(key);
}
// <span class="hljs-string">"F"</span>
// <span class="hljs-string">"T"</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> <span class="hljs-keyword">value</span> <span class="hljs-keyword">of</span> <span class="hljs-keyword">map</span>.values()) {
  console.log(value);
}
// <span class="hljs-string">"no"</span>
// <span class="hljs-string">"yes"</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> <span class="hljs-literal">item</span> <span class="hljs-keyword">of</span> <span class="hljs-keyword">map</span>.entries()) {
  console.log(item[<span class="hljs-number">0</span>], item[<span class="hljs-number">1</span>]);
}
// <span class="hljs-string">"F"</span> <span class="hljs-string">"no"</span>
// <span class="hljs-string">"T"</span> <span class="hljs-string">"yes"</span>

// 或者
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> [key, <span class="hljs-keyword">value</span>] <span class="hljs-keyword">of</span> <span class="hljs-keyword">map</span>.entries()) {
  console.log(key, value);
}

// 等同于使用<span class="hljs-keyword">map</span>.entries()
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> [key, <span class="hljs-keyword">value</span>] <span class="hljs-keyword">of</span> <span class="hljs-keyword">map</span>) {
  console.log(key, value);
}

上面代码最后的那个例子，表示 Map 结构的默认遍历器接口（Symbol.iterator 属性），就是 entries 方法。

<span class="hljs-keyword">map</span>[Symbol.iterator] === <span class="hljs-keyword">map</span>.entries // <span class="hljs-literal">true</span>
</code></pre>
<h2 id="articleHeader2">3.Map 获取长度</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="map.size;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-built_in">map</span>.<span class="hljs-built_in">size</span>;
</code></pre>
<h2 id="articleHeader3">4.Map 获取第一个元素</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const m = new Map();
m.set('key1', {})
m.set('keyN', {})

console.log(m.entries().next().value); // [ 'key1', {} ]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">const</span> m = <span class="hljs-keyword">new</span> Map();
m.<span class="hljs-keyword">set</span>(<span class="hljs-string">'key1'</span>, {})
m.<span class="hljs-keyword">set</span>(<span class="hljs-string">'keyN'</span>, {})

console.log(m.entries().next().<span class="hljs-keyword">value</span>); <span class="hljs-comment">// [ 'key1', {} ]</span>
</code></pre>
<p>获取第一个key</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(m.keys().next().value); // key1
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>console.<span class="hljs-built_in">log</span>(m.<span class="hljs-built_in">keys</span>().next().<span class="hljs-built_in">value</span>);<span class="hljs-comment"> // key1</span>
</code></pre>
<p>获取第一个value</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(m.values().next().value); // {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">console.<span class="hljs-built_in">log</span>(m.values().next().<span class="hljs-built_in">value</span>);<span class="hljs-comment"> // {}</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 Map常用方法总结

## 原文链接
[https://segmentfault.com/a/1190000010470987](https://segmentfault.com/a/1190000010470987)

