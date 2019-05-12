---
title: '通过这一段代码，让我们重新认识JavaScript' 
date: 2019-02-11 2:30:49
hidden: true
slug: wqtqfv4zbd
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">问题</h2>
<p>请说明一下对这一段JavaScript的理解，主要包括引擎、编译、执行、作用域、异常这些要点。然后猜测下会输出那些内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var hello = null;
var b = 2;
foo(3);
console.log(c);

function foo(a){
 try{
    console.log(c);
 }catch(error){
    console.log(error);
 }
 try{
    hello();
 }catch(error){
    console.log(error);
 }
 c = a*b;
 console.log(a+b);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> hello = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-number">2</span>;
foo(<span class="hljs-number">3</span>);
<span class="hljs-built_in">console</span>.log(c);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a</span>)</span>{
 <span class="hljs-keyword">try</span>{
    <span class="hljs-built_in">console</span>.log(c);
 }<span class="hljs-keyword">catch</span>(error){
    <span class="hljs-built_in">console</span>.log(error);
 }
 <span class="hljs-keyword">try</span>{
    hello();
 }<span class="hljs-keyword">catch</span>(error){
    <span class="hljs-built_in">console</span>.log(error);
 }
 c = a*b;
 <span class="hljs-built_in">console</span>.log(a+b);
}</code></pre>
<h2 id="articleHeader1">理解</h2>
<h3 id="articleHeader2">编译</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
    1.编译器遇到 var hello这个声明语句，就在当前作用域中声明变量hello（当前作用域没有变量hello，这里当前作用域就是全局作用域）。
*/
var hello = null;
var b = 2;
foo(3);
console.log(c);
/*
    1.编译器在当前作用域把foo声明成一个函数，同上
    2.在函数的内部作用域声明a变量
*/
function foo(a){
 try{
    console.log(c);
 }catch(error){
    console.log(error);
 }
 try{
    hello();
 }catch(error){
    console.log(error);
 }
 c = a*b;
 console.log(a+b);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/*
    1.编译器遇到 var hello这个声明语句，就在当前作用域中声明变量hello（当前作用域没有变量hello，这里当前作用域就是全局作用域）。
*/</span>
<span class="hljs-keyword">var</span> hello = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-number">2</span>;
foo(<span class="hljs-number">3</span>);
<span class="hljs-built_in">console</span>.log(c);
<span class="hljs-comment">/*
    1.编译器在当前作用域把foo声明成一个函数，同上
    2.在函数的内部作用域声明a变量
*/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a</span>)</span>{
 <span class="hljs-keyword">try</span>{
    <span class="hljs-built_in">console</span>.log(c);
 }<span class="hljs-keyword">catch</span>(error){
    <span class="hljs-built_in">console</span>.log(error);
 }
 <span class="hljs-keyword">try</span>{
    hello();
 }<span class="hljs-keyword">catch</span>(error){
    <span class="hljs-built_in">console</span>.log(error);
 }
 c = a*b;
 <span class="hljs-built_in">console</span>.log(a+b);
}</code></pre>
<p>编译器会先找到所有的声明(var xxx，function xxx这些才是声明)，然后在对应的作用域中创建该变量/函数，如果该声明不存在的话。这个过程叫‘提升’。</p>
<h3 id="articleHeader3">运行</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
    1.运行时读取到的是hello = null，首先在作用域链中查找hello，找到的话执行赋值操作
*/
var hello = null;
var b = 2;
/*
    1.在作用域链中找foo并且执行它，这里隐式地执行了a = 3，这里的a实际上是foo函数作用域里声明的一个变量
    2.之后转入函数内部执行
*/
foo(3);
/*
    0.在函数执行完毕后，执行到这儿
    1.在作用域中查找console这一变量，然后找到了，然后获取它的log属性，然后把它作函数执行
    2.隐式地执行了x = c，在当前作用域中查找c，能找得到吗？
*/
console.log(c);

function foo(a){
 try{
    //尝试在作用域链中找c，找到本函数作用域-->全局作用域都没找到，于是抛出异常ReferenceError，这个异常就是在作用域链中找不到某变量但又需要知道它的值出现的，我们需要输出c的值
    console.log(c);
 }catch(error){
    console.log(error);
 }
 try{
    //尝试在作用域链中找hello，在全局作用域找到了，把它当函数执行，但它不是函数，于是抛出异常TypeError，这个异常就是找到了，但是使用方法不对
    hello();
 }catch(error){
    console.log(error);
 }
   //先计算a*b，在作用域链中找a和找b的值，然后执行c=6，又开始找c，想要给c赋值，找到头也找不到，于是自动地在全局作用域下声明了一个c，然后执行c=6，注意这里我们不关心c的值
 c = a*b;
 console.log(a+b);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/*
    1.运行时读取到的是hello = null，首先在作用域链中查找hello，找到的话执行赋值操作
*/</span>
<span class="hljs-keyword">var</span> hello = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-number">2</span>;
<span class="hljs-comment">/*
    1.在作用域链中找foo并且执行它，这里隐式地执行了a = 3，这里的a实际上是foo函数作用域里声明的一个变量
    2.之后转入函数内部执行
*/</span>
foo(<span class="hljs-number">3</span>);
<span class="hljs-comment">/*
    0.在函数执行完毕后，执行到这儿
    1.在作用域中查找console这一变量，然后找到了，然后获取它的log属性，然后把它作函数执行
    2.隐式地执行了x = c，在当前作用域中查找c，能找得到吗？
*/</span>
<span class="hljs-built_in">console</span>.log(c);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a</span>)</span>{
 <span class="hljs-keyword">try</span>{
    <span class="hljs-comment">//尝试在作用域链中找c，找到本函数作用域--&gt;全局作用域都没找到，于是抛出异常ReferenceError，这个异常就是在作用域链中找不到某变量但又需要知道它的值出现的，我们需要输出c的值</span>
    <span class="hljs-built_in">console</span>.log(c);
 }<span class="hljs-keyword">catch</span>(error){
    <span class="hljs-built_in">console</span>.log(error);
 }
 <span class="hljs-keyword">try</span>{
    <span class="hljs-comment">//尝试在作用域链中找hello，在全局作用域找到了，把它当函数执行，但它不是函数，于是抛出异常TypeError，这个异常就是找到了，但是使用方法不对</span>
    hello();
 }<span class="hljs-keyword">catch</span>(error){
    <span class="hljs-built_in">console</span>.log(error);
 }
   <span class="hljs-comment">//先计算a*b，在作用域链中找a和找b的值，然后执行c=6，又开始找c，想要给c赋值，找到头也找不到，于是自动地在全局作用域下声明了一个c，然后执行c=6，注意这里我们不关心c的值</span>
 c = a*b;
 <span class="hljs-built_in">console</span>.log(a+b);
}</code></pre>
<p>js的作用域是词法作用域，就是说变量处于哪个作用域是由代码怎么写决定的，在编译期间确定。<br>作用域链就像个大楼，查找变量的时候从当前楼层查到顶楼（全局）为止</p>
<p>通过这段代码可大致理解js引擎在编译阶段做了什么，在执行阶段又怎么做，作用域在这两个阶段中起到什么作用（中间者，管家）。两个非常常见的异常是在什么情况下发生的。<br><em>･゜ﾟ･</em>:.｡..｡.:<em>･'(</em>ﾟ▽ﾟ<em>)'･</em>:.｡. .｡.:<em>･゜ﾟ･</em></p>
<p>参考书籍《你不知道的JavaScript（上卷）》第一部分，亚马逊电子书9.9元，强力推荐</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
通过这一段代码，让我们重新认识JavaScript

## 原文链接
[https://segmentfault.com/a/1190000005017794](https://segmentfault.com/a/1190000005017794)

