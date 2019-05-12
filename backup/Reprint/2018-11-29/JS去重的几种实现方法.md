---
title: 'JS去重的几种实现方法' 
date: 2018-11-29 9:27:38
hidden: true
slug: 9wwdt6mzoia
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>&#x65B9;&#x6CD5;1:<code>ES6</code>&#x65B0;&#x7279;&#x6027;<code>Set</code>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" Array.prototype.rmSome = function() {
     return Array.from(new Set(this));
  }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-built_in">Array</span>.prototype.rmSome = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
     <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.from(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(<span class="hljs-keyword">this</span>));
  }</code></pre>
<blockquote>&#x65B9;&#x6CD5;2:&#x5229;&#x7528;&#x5BF9;&#x8C61;&#x540D;&#x552F;&#x4E00;</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.rmSome = function() {
 let tempObj = {}
 this.forEach(item =&gt; {
     if (tempObj[item]) {
         return
     } else {
         tempObj[item] = item;
     }
 })
return Object.values(tempObj)
  }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Array</span>.prototype.rmSome = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
 <span class="hljs-keyword">let</span> tempObj = {}
 <span class="hljs-keyword">this</span>.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
     <span class="hljs-keyword">if</span> (tempObj[item]) {
         <span class="hljs-keyword">return</span>
     } <span class="hljs-keyword">else</span> {
         tempObj[item] = item;
     }
 })
<span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.values(tempObj)
  }</code></pre>
<blockquote>&#x65B9;&#x6CD5;3:&#x5229;&#x7528;&#x6570;&#x7EC4;&#x5305;&#x542B;  <code>[].includes  [].indexOf</code>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.rmSome = function () {
 let tempArr = [];
 this.forEach((item, index) =&gt; {
     if (tempArr.includes(item)) {
         return
     } else {
         tempArr.push(item)
     }
 })
 return tempArr
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Array</span>.prototype.rmSome = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
 <span class="hljs-keyword">let</span> tempArr = [];
 <span class="hljs-keyword">this</span>.forEach(<span class="hljs-function">(<span class="hljs-params">item, index</span>) =&gt;</span> {
     <span class="hljs-keyword">if</span> (tempArr.includes(item)) {
         <span class="hljs-keyword">return</span>
     } <span class="hljs-keyword">else</span> {
         tempArr.push(item)
     }
 })
 <span class="hljs-keyword">return</span> tempArr
}</code></pre>
<blockquote>&#x65B9;&#x6CD5;4: &#x6392;&#x5E8F;&#x6BD4;&#x8F83;&#x5144;&#x5F1F;&#x5143;&#x7D20;</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.rmSome = function () {
 const tempArr = this.sort();
 tempArr.forEach((item, index) =&gt; {
     for (let i = 0; i &lt; tempArr.length; i++) {
         if (tempArr[i] == tempArr[i + 1]) {
             tempArr.splice(i, 1);
             i--;
         }
     }
 })
 return tempArr
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Array</span>.prototype.rmSome = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
 <span class="hljs-keyword">const</span> tempArr = <span class="hljs-keyword">this</span>.sort();
 tempArr.forEach(<span class="hljs-function">(<span class="hljs-params">item, index</span>) =&gt;</span> {
     <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; tempArr.length; i++) {
         <span class="hljs-keyword">if</span> (tempArr[i] == tempArr[i + <span class="hljs-number">1</span>]) {
             tempArr.splice(i, <span class="hljs-number">1</span>);
             i--;
         }
     }
 })
 <span class="hljs-keyword">return</span> tempArr
}</code></pre>
<blockquote>&#x65B9;&#x6CD5;5: &#x53CC;&#x5FAA;&#x73AF;&#x6BD4;&#x8F83;</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  Array.prototype.rmSome = function () {
 for (let i = 0; i &lt; this.length; i++) {
     const node = this[i];
     for (let j = i + 1; j &lt; this.length; j++) {
         if (node === this[j]) {
             this.splice(j, 1);
             j--;
         }
     }
 }
 return this
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-built_in">Array</span>.prototype.rmSome = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
 <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.length; i++) {
     <span class="hljs-keyword">const</span> node = <span class="hljs-keyword">this</span>[i];
     <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = i + <span class="hljs-number">1</span>; j &lt; <span class="hljs-keyword">this</span>.length; j++) {
         <span class="hljs-keyword">if</span> (node === <span class="hljs-keyword">this</span>[j]) {
             <span class="hljs-keyword">this</span>.splice(j, <span class="hljs-number">1</span>);
             j--;
         }
     }
 }
 <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS去重的几种实现方法

## 原文链接
[https://segmentfault.com/a/1190000015183189](https://segmentfault.com/a/1190000015183189)

