---
title: '五分钟掌握 for...in 和 for...of 区别' 
date: 2019-02-13 2:31:23
hidden: true
slug: 7kmptlzk6qi
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://github.com/tibaiwan/frontend-note" rel="nofollow noreferrer" target="_blank">GitHub 地址</a>，欢迎star，查看更多整理的前端知识</p>
<h2 id="articleHeader0">for...in</h2>
<p>for...in 语句以任意顺序遍历一个对象的可枚举属性。  <br>for...in 遍历对象本身的所有可枚举属性，以及对象从其构造函数原型中继承的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (variable in object) {...}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">for</span> (variable <span class="hljs-keyword">in</span> object) {...}</code></pre>
<ul>
<li>
<code>variable</code> 在每次迭代时，将不同的属性名分配给变量。</li>
<li>
<code>object</code> 被迭代枚举其属性的对象。</li>
</ul>
<p>只遍历自身的可枚举属性，可以使用 hasOwnProperty</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var prop in obj) {
  if (obj.hasOwnProperty(prop)) {
    console.log(`obj.${prop} = ${obj[prop]}`);
  } 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> prop <span class="hljs-keyword">in</span> obj) {
  <span class="hljs-keyword">if</span> (obj.hasOwnProperty(prop)) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`obj.<span class="hljs-subst">${prop}</span> = <span class="hljs-subst">${obj[prop]}</span>`</span>);
  } 
}</code></pre>
<h2 id="articleHeader1">for...of</h2>
<p>for...of 语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句。  <br>对于for...of的循环，可以由break, throw 或return终止(使用return报错？)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (variable of iterable) {
    //statements
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (variable <span class="hljs-keyword">of</span> iterable) {
    <span class="hljs-comment">//statements</span>
}</code></pre>
<ul>
<li>
<code>variable</code> 在每次迭代中，将不同属性的值分配给变量。</li>
<li>
<code>iterable</code> 被迭代枚举其属性的对象。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let iterable = [10, 20, 30];

for (const value of iterable) {
  console.log(value);
}
// 10
// 20
// 30" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> iterable = [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">30</span>];

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> value <span class="hljs-keyword">of</span> iterable) {
  <span class="hljs-built_in">console</span>.log(value);
}
<span class="hljs-comment">// 10</span>
<span class="hljs-comment">// 20</span>
<span class="hljs-comment">// 30</span></code></pre>
<h2 id="articleHeader2">for...of 与 for...in 区别</h2>
<ul>
<li>for...in 语句以原始插入顺序迭代对象的可枚举属性。</li>
<li>for...of 语句遍历可迭代对象定义要迭代的数据。</li>
</ul>
<p>区别示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.prototype.objCustom = function() {}; 
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = 'hello';

for (let i in iterable) {
  console.log(i); // 0, 1, 2, &quot;foo&quot;, &quot;arrCustom&quot;, &quot;objCustom&quot;
}

for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); // 0, 1, 2, &quot;foo&quot;
  }
}

for (let i of iterable) {
  console.log(i); // 3, 5, 7
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Object</span>.prototype.objCustom = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}; 
<span class="hljs-built_in">Array</span>.prototype.arrCustom = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};

<span class="hljs-keyword">let</span> iterable = [<span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>];
iterable.foo = <span class="hljs-string">'hello'</span>;

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> iterable) {
  <span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">// 0, 1, 2, "foo", "arrCustom", "objCustom"</span>
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> iterable) {
  <span class="hljs-keyword">if</span> (iterable.hasOwnProperty(i)) {
    <span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">// 0, 1, 2, "foo"</span>
  }
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">of</span> iterable) {
  <span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">// 3, 5, 7</span>
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
五分钟掌握 for...in 和 for...of 区别

## 原文链接
[https://segmentfault.com/a/1190000016755195](https://segmentfault.com/a/1190000016755195)

