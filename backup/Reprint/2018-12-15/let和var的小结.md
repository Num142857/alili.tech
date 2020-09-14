---
title: 'let和var的小结' 
date: 2018-12-15 2:30:11
hidden: true
slug: jmso5afbd2h
categories: [reprint]
---

{{< raw >}}

                    
<p>let允许你声明一个作用域被限制在块级中的变量、语句或者表达式。与var关键字不同的是，它声明的变量只能是全局或者整个函数块的。</p>
<h2 id="articleHeader0">一 作用域</h2>
<p>let声明的变量只能在其声明的块或子块中使用，这个和var很相似，二者之间最主要的区别在于var声明的变量的作用域是整个封闭函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// var
function testVar() {
  var a = 0;
  if (true) {
    var a = 1;
    console.log(a);  // 输出1
  }
  console.log(a);  // 输出1
}

// let
function testLet() {
  let a = 0;
  if (true) {
    let a = 1;
    console.log(a);  // 输出1 （不同的变量）
  }
  console.log(a);  // 输出0
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// var</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testVar</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> a = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
    <span class="hljs-built_in">console</span>.log(a);  <span class="hljs-comment">// 输出1</span>
  }
  <span class="hljs-built_in">console</span>.log(a);  <span class="hljs-comment">// 输出1</span>
}

<span class="hljs-comment">// let</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testLet</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> a = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">let</span> a = <span class="hljs-number">1</span>;
    <span class="hljs-built_in">console</span>.log(a);  <span class="hljs-comment">// 输出1 （不同的变量）</span>
  }
  <span class="hljs-built_in">console</span>.log(a);  <span class="hljs-comment">// 输出0</span>
}</code></pre>
<h3 id="articleHeader1">小结</h3>
<p>在testVar函数里面重复输出了1，var声明的变量的作用域是整个封闭函数，所以到if里面被赋值为1，最后都输出为1。</p>
<p>在testLet函数里面{}，两个花括号相当于一个作用域，两个a在不同的作用域里面，所以不受影响。（使用let可以完全代替闭包）</p>
<h2 id="articleHeader2">二简化内部函数代码</h2>
<p>比如给许多函数添加事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
*  使用let
*/

let lists = document.getElementsByTagName('li');
for (let i = 0; i < lists.length; i++) {
  lists[i].onclick = function(ev) {
    console.log(`点击了第${i}个元素`);
  }
}
console.log(i);  // 报错 Uncaught ReferenceError: i is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
*  使用let
*/</span>

<span class="hljs-keyword">let</span> lists = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'li'</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; lists.length; i++) {
  lists[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ev</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`点击了第<span class="hljs-subst">${i}</span>个元素`</span>);
  }
}
<span class="hljs-built_in">console</span>.log(i);  <span class="hljs-comment">// 报错 Uncaught ReferenceError: i is not defined</span></code></pre>
<p>运行这段代码点击每个元素都能输出正确的i值，而且console报错</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var lists = document.getElementsByTagName('li');
for (var i = 0; i < lists.length; i++) {
  lists[i].onclick = function(ev) {
    console.log(&quot;点击了第&quot;+i+&quot;个元素&quot;); // 点击了第6个元素
  }
}
console.log(i);  // 输出6


// 解决办法，可以使用自执行函数
var lists = document.getElementsByTagName('li');
for (var i = 0; i < lists.length; i++) {
  (function(i){
    lists[i].onclick = function(ev) {
      console.log(&quot;点击了第&quot;+i+&quot;个元素&quot;); // 正常输出
    }
  })(i);
}
console.log(i);  // 输出6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> lists = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'li'</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; lists.length; i++) {
  lists[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ev</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"点击了第"</span>+i+<span class="hljs-string">"个元素"</span>); <span class="hljs-comment">// 点击了第6个元素</span>
  }
}
<span class="hljs-built_in">console</span>.log(i);  <span class="hljs-comment">// 输出6</span>


<span class="hljs-comment">// 解决办法，可以使用自执行函数</span>
<span class="hljs-keyword">var</span> lists = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'li'</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; lists.length; i++) {
  (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i</span>)</span>{
    lists[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ev</span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"点击了第"</span>+i+<span class="hljs-string">"个元素"</span>); <span class="hljs-comment">// 正常输出</span>
    }
  })(i);
}
<span class="hljs-built_in">console</span>.log(i);  <span class="hljs-comment">// 输出6</span></code></pre>
<p>上面的代码可以看出无论点击哪个元素都是输出“点击了第6个元素”，而且最后console也是6。</p>
<h3 id="articleHeader3">小结</h3>
<p>因为（匿名）内部函数的五个实例引用了变量i的五个不同实例。注意，如果你将let替换为var，则它将无法正常工作，因为所有内部函数都将返回相同的i：6的最终值。此外，我们可以通过将创建新元素的代码移动到每个循环的作用域来保持循环更清晰。</p>
<h2 id="articleHeader4">三 暂存死区的错误</h2>
<p>不能再相同函数和相同作用域里面重新声明同一个变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let a;
  let a; //Uncaught SyntaxError: Identifier 'a' has already been declared
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-keyword">let</span> a;
  <span class="hljs-keyword">let</span> a; <span class="hljs-comment">//Uncaught SyntaxError: Identifier 'a' has already been declared</span>
}</code></pre>
<p>let 绑定不受<strong>变量提升</strong>的约束，也就是let声明不会被提升到当前执行上下文的顶部，如果你在初始化之前引用它，也会报上面那个错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  console.log(a);  // Uncaught ReferenceError: a is not defined
  let a;
  let b;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-built_in">console</span>.log(a);  <span class="hljs-comment">// Uncaught ReferenceError: a is not defined</span>
  <span class="hljs-keyword">let</span> a;
  <span class="hljs-keyword">let</span> b;
}</code></pre>
<p>上面介绍了es6作用域的问题，表达式(2 + 55)内的标识符“a”会解析为if块的a,而不是覆盖值为2的a。if块的a已经生明，并未初始化，它仍处在暂存死区</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test(){
 var a = 2;
 if (true) {
    let a = (a + 55); // ReferenceError
  }
}
test();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
 <span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">let</span> a = (a + <span class="hljs-number">55</span>); <span class="hljs-comment">// ReferenceError</span>
  }
}
test();</code></pre>
<h3 id="articleHeader5">小结</h3>
<p>当在块中使用时，let将变量的作用域限制为该块。注意var的作用域在它被声明的函数内的区别。</p>
<h2 id="articleHeader6">总结</h2>
<ol>
<li>let有块级作用域；</li>
<li>没有变量提升；</li>
<li>暂存死区的错误；</li>
<li>不能重复声明；</li>
<li>do表达式。</li>
</ol>
<p>--- 参考阮老师的 《ECMAScript 6 入门》</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
let和var的小结

## 原文链接
[https://segmentfault.com/a/1190000013069380](https://segmentfault.com/a/1190000013069380)

