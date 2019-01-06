---
title: '《javascript高级程序设计》笔记：检测数组的方法' 
date: 2019-01-05 2:30:11
hidden: true
slug: pwpt76vcgs8
categories: [reprint]
---

{{< raw >}}

                    
<p>如何检测某个变量是否为数组？</p>
<p>《javascript 高级程序设计》原文摘录:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  自从 ECMAScript 3 做出规定以后，就出现了确定某个对象是不是数组的经典问题。对于一个网页，
或者一个全局作用域而言，使用 instanceof 操作符就能得到满意的结果：

    if (value instanceof Array){
    //对数组执行某些操作
    }

  instanceof 操作符的问题在于，它假定只有一个全局执行环境。如果网页中包含多个框架，那实
际上就存在两个以上不同的全局执行环境，从而存在两个以上不同版本的 Array 构造函数。如果你从
一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有各自
不同的构造函数。
  为了解决这个问题，ECMAScript 5 新增了 Array.isArray() 方法。这个方法的目的是最终确定某
个值到底是不是数组，而不管它是在哪个全局执行环境中创建的。这个方法的用法如下。

    if (Array.isArray(value)){
    //对数组执行某些操作
    }

  支持 Array.isArray() 方法的浏览器有 IE9+、Firefox 4+、Safari 5+、Opera 10.5+和 Chrome。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="text">  自从 ECMAScript <span class="hljs-number">3</span> 做出规定以后，就出现了确定某个对象是不是数组的经典问题。对于一个网页，
或者一个全局作用域而言，使用 <span class="hljs-keyword">instanceof</span> 操作符就能得到满意的结果：

    <span class="hljs-keyword">if</span> (value <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>){
    <span class="hljs-comment">//对数组执行某些操作</span>
    }

  <span class="hljs-keyword">instanceof</span> 操作符的问题在于，它假定只有一个全局执行环境。如果网页中包含多个框架，那实
际上就存在两个以上不同的全局执行环境，从而存在两个以上不同版本的 <span class="hljs-built_in">Array</span> 构造函数。如果你从
一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有各自
不同的构造函数。
  为了解决这个问题，ECMAScript <span class="hljs-number">5</span> 新增了 <span class="hljs-built_in">Array</span>.isArray() 方法。这个方法的目的是最终确定某
个值到底是不是数组，而不管它是在哪个全局执行环境中创建的。这个方法的用法如下。

    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(value)){
    <span class="hljs-comment">//对数组执行某些操作</span>
    }

  支持 <span class="hljs-built_in">Array</span>.isArray() 方法的浏览器有 IE9+、Firefox <span class="hljs-number">4</span>+、Safari <span class="hljs-number">5</span>+、Opera <span class="hljs-number">10.5</span>+和 Chrome。</code></pre>
<p>那么问题来了，如何在尚未实现这个方法中的浏览器中准确检测数组<br>由于原生数组的构造函数名与全局作用域无关，因此用toString()方法，保证返回一样的结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function isArray(value) {
      return Object.prototype.toString.call(value) === '[object Array]';
   }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isArray</span>(<span class="hljs-params">value</span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(value) === <span class="hljs-string">'[object Array]'</span>;
   }</code></pre>
<p>这样的方法就可以比较完美的解决判断是否为数组了，同样也可以判断是不是函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function isFunction(value) {
      return Object.prototype.toString.call(value) === '[object Function]';
   }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>   <span class="hljs-keyword">function</span> <span class="hljs-title">isFunction</span>(value) {
      <span class="hljs-keyword">return</span> <span class="hljs-type">Object.prototype.toString.call(value)</span> === '[object <span class="hljs-keyword">Function</span>]';
   }</code></pre>
<p>是不是正则表达式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function isRegExp(value) {
      return Object.prototype.toString.call(value) === '[object RegExp]';
   }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isRegExp</span>(<span class="hljs-params">value</span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(value) === <span class="hljs-string">'[object RegExp]'</span>;
   }</code></pre>
<p>虽然这样貌似是解决了问题，实际上这还是会存在问题：Object.prototpye.toString()本身也可能会被修改</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《javascript高级程序设计》笔记：检测数组的方法

## 原文链接
[https://segmentfault.com/a/1190000010492251](https://segmentfault.com/a/1190000010492251)

