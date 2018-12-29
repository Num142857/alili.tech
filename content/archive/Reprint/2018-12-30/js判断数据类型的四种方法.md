---
title: 'js判断数据类型的四种方法' 
date: 2018-12-30 2:30:10
hidden: true
slug: azo3ip5qyq
categories: [reprint]
---

{{< raw >}}

                    
<h4>1.typeof方法</h4>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//1.
console.log(typeof(a));//undefined
console.log(typeof(undefined));//undefined
//2.
console.log(typeof(1));//number
console.log(typeof(NaN));//number
//3.
console.log(typeof(function(){}));//function
//4.
console.log(typeof(''));//string
//5.
console.log(typeof(true));//boolean
//6.
console.log(typeof({}));//object
console.log(typeof(new Object));//object
console.log(typeof([]));//object
console.log(typeof(null));//object
console.log(typeof(/\W/));//object
console.log(typeof(new Date));//object" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//1.</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span>(a));<span class="hljs-comment">//undefined</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span>(<span class="hljs-literal">undefined</span>));<span class="hljs-comment">//undefined</span>
<span class="hljs-comment">//2.</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span>(<span class="hljs-number">1</span>));<span class="hljs-comment">//number</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span>(<span class="hljs-literal">NaN</span>));<span class="hljs-comment">//number</span>
<span class="hljs-comment">//3.</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}));<span class="hljs-comment">//function</span>
<span class="hljs-comment">//4.</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span>(<span class="hljs-string">''</span>));<span class="hljs-comment">//string</span>
<span class="hljs-comment">//5.</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span>(<span class="hljs-literal">true</span>));<span class="hljs-comment">//boolean</span>
<span class="hljs-comment">//6.</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span>({}));<span class="hljs-comment">//object</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>));<span class="hljs-comment">//object</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span>([]));<span class="hljs-comment">//object</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span>(<span class="hljs-literal">null</span>));<span class="hljs-comment">//object</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span>(<span class="hljs-regexp">/\W/</span>));<span class="hljs-comment">//object</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>));<span class="hljs-comment">//object</span></code></pre>
<p>&nbsp;&nbsp;</p>
<h4>总结:</h4>
<blockquote>
<p>1、typeof的值有6个，分别是undefined、number、function、string、boolean、object</p>
<p>2、引用类型（Object、Array、function、Date）除了函数，值都为object</p>
</blockquote>
<h4>2.Object.prototype.toString.call方法</h4>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//1.
console.log(Object.prototype.toString.call(1));//[object Number]
console.log(Object.prototype.toString.call(NaN));//[object Number]
//2.
console.log(Object.prototype.toString.call(function(){}));//[object Function]
//3.
console.log(Object.prototype.toString.call(''));//[object String]
//4.
console.log(Object.prototype.toString.call(true));//[object Boolean]
---------------------------------------
//5.
console.log(Object.prototype.toString.call({}));//[object Object]
console.log(Object.prototype.toString.call(new Object));//[object Object]
//6
console.log(Object.prototype.toString.call([]));//[object Array]
//7
console.log(Object.prototype.toString.call(null));//[object Null]
//8
console.log(Object.prototype.toString.call(/\W/));//[object RegExp]
//9
console.log(Object.prototype.toString.call(new Date));//[object Date]>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code><span class="hljs-comment">//1.</span>
console.<span class="hljs-built_in">log</span>(Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(<span class="hljs-number">1</span>));<span class="hljs-comment">//[object Number]</span>
console.<span class="hljs-built_in">log</span>(Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(NaN));<span class="hljs-comment">//[object Number]</span>
<span class="hljs-comment">//2.</span>
console.<span class="hljs-built_in">log</span>(Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(function(){}));<span class="hljs-comment">//[object Function]</span>
<span class="hljs-comment">//3.</span>
console.<span class="hljs-built_in">log</span>(Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(<span class="hljs-string">''</span>));<span class="hljs-comment">//[object String]</span>
<span class="hljs-comment">//4.</span>
console.<span class="hljs-built_in">log</span>(Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(<span class="hljs-literal">true</span>));<span class="hljs-comment">//[object Boolean]</span>
---------------------------------------
<span class="hljs-comment">//5.</span>
console.<span class="hljs-built_in">log</span>(Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>({}));<span class="hljs-comment">//[object Object]</span>
console.<span class="hljs-built_in">log</span>(Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(new Object));<span class="hljs-comment">//[object Object]</span>
<span class="hljs-comment">//6</span>
console.<span class="hljs-built_in">log</span>(Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>([]));<span class="hljs-comment">//[object Array]</span>
<span class="hljs-comment">//7</span>
console.<span class="hljs-built_in">log</span>(Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(null));<span class="hljs-comment">//[object Null]</span>
<span class="hljs-comment">//8</span>
console.<span class="hljs-built_in">log</span>(Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(/\W/));<span class="hljs-comment">//[object RegExp]</span>
<span class="hljs-comment">//9</span>
console.<span class="hljs-built_in">log</span>(Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(new <span class="hljs-built_in">Date</span>));<span class="hljs-comment">//[object Date]&gt;</span></code></pre>
<h5>tip:如果想让Object.prototype.toString.call输出的值与typeof输出的值格式相同，可先用spilt分割成数组，然后去数组的第1个索引值，再用splice方法删除最后一位即可</h5>
<h4>如下:</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Object.prototype.toString.call({}).split(&quot; &quot;)[1].substring(0,Object.prototype.toString.call({}).split(&quot; &quot;)[1].length-1));//Array" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code style="word-break: break-word; white-space: initial;">console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">Object</span>.prototype.toString.call({}).<span class="hljs-built_in">split</span>(<span class="hljs-string">" "</span>)[<span class="hljs-number">1</span>].substring(<span class="hljs-number">0</span>,<span class="hljs-keyword">Object</span>.prototype.toString.call({}).<span class="hljs-built_in">split</span>(<span class="hljs-string">" "</span>)[<span class="hljs-number">1</span>].length<span class="hljs-number">-1</span>));<span class="hljs-comment">//Array</span></code></pre>
<h4>总结:</h4>
<blockquote><p>1、Object.prototype.toString.call的值有9个，分别是Number、Function、String、Boolean、Object、Array、Null、RegExp、Date。</p></blockquote>
<h4>用Object.prototype.toString.call而不用 toString的原因</h4>
<blockquote><p>1、toString为Object的原型方法，用Array ，function等类型作为Object的实例，都重写了toString方法。<br>  2、不同的对象类型调用toString方法时，调用的是对应的重写之后的toString方法，而不会去调用Object上原型toString方法，所以采用obj.toString()不能得到其对象类型，只能将obj转换为字符串类型。</p></blockquote>
<h4>3.constructor/instanceof方法</h4>
<hr>
<h4>用法example:</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log([].constructor == Array);//true
console.log({}.constructor == Array);//false
console.log([] instanceof Array);//->true
console.log({} instanceof Array);//->false　" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log([].constructor == <span class="hljs-built_in">Array</span>);<span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log({}.constructor == <span class="hljs-built_in">Array</span>);<span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log([] <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>);<span class="hljs-comment">//-&gt;true</span>
<span class="hljs-built_in">console</span>.log({} <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>);<span class="hljs-comment">//-&gt;false　</span></code></pre>
<h4>总结：</h4>
<h4>1、局限性：</h4>
<blockquote><p>用instanceof检测的时候,只要当前的这个类在实例的原型链上(可以通过原型链__proto__找到它),检测出来的结果都是true</p></blockquote>
<h4>2、基本数据类型的值是不能用constructor/instanceof来检测的</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(1 instanceof Number);//false
console.log([].constructor == Number);//false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Number</span>);<span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log([].constructor == <span class="hljs-built_in">Number</span>);<span class="hljs-comment">//false</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js判断数据类型的四种方法

## 原文链接
[https://segmentfault.com/a/1190000011337429](https://segmentfault.com/a/1190000011337429)

