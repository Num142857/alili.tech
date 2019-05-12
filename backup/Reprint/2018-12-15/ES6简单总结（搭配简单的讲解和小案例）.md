---
title: 'ES6简单总结（搭配简单的讲解和小案例）' 
date: 2018-12-15 2:30:11
hidden: true
slug: lb50z5az8cq
categories: [reprint]
---

{{< raw >}}

                    
<p>在学习es6的过程中，为了方便自己复习，以及查看，对api做了一个极简用例介绍。如有错误多多指正。</p>
<h1 id="articleHeader0">一 let和const</h1>
<h2 id="articleHeader1">1.let</h2>
<p>(1)一个大括号就是一个块级作用域，let声明的变量只在自己作用域有效；<br>(2)es6强制开启严格模式，变量未声明不能引用，所以会报 Uncaught ReferenceError</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test() {
  for (let i = 1; i < 3; i++) {
    console.log(i)
  }
  console.log(i);  // Uncaught ReferenceError: i is not defined
}
test();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-number">3</span>; i++) {
    <span class="hljs-built_in">console</span>.log(i)
  }
  <span class="hljs-built_in">console</span>.log(i);  <span class="hljs-comment">// Uncaught ReferenceError: i is not defined</span>
}
test();</code></pre>
<p>(3)let不能重复声明</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test() {
  let a = 1; 
  let a = 2;
}
test();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span><span class="hljs-params">()</span> <span class="hljs-comment">{
  let a = 1; 
  let a = 2;
}</span>
<span class="hljs-title">test</span><span class="hljs-params">()</span>;</span></code></pre>
<p>(4)let不存在变量提升(这个地方有问题)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// var 的情况
console.log(a); // 输出undefined
var a = 2;

// let 的情况
console.log(b); // 报错ReferenceError
let b = 2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// var 的情况</span>
<span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 输出undefined</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;

<span class="hljs-comment">// let 的情况</span>
<span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// 报错ReferenceError</span>
<span class="hljs-keyword">let</span> b = <span class="hljs-number">2</span>;</code></pre>
<h2 id="articleHeader2">2.const</h2>
<p>(1)const声明之后必须赋值，否则会编译不通过；<br>(2)const声明的值不允许修改；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const PI = 3.14;
// PI = 2;  
// const PI;
console.log(PI);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs monkey"><code><span class="hljs-keyword">const</span> <span class="hljs-built_in">PI</span> = <span class="hljs-number">3.14</span>;
// <span class="hljs-built_in">PI</span> = <span class="hljs-number">2</span>;  
// <span class="hljs-keyword">const</span> <span class="hljs-built_in">PI</span>;
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">PI</span>);</code></pre>
<p>(3)const如果是对象的话，可以向对象中添加属性，也可以修改a的属性；json是指向内存地址的一个指针，指针的指向不变，但是那个被json指针所指向的内存地址所存储的内容是可以变化的；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const json = {
  a: 2
}
json.a = 3;
json.b = 3;
console.log(json.a)   //3
console.log(json.b)   //3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">const</span> json = {
  a: <span class="hljs-number">2</span>
}
json.a = <span class="hljs-number">3</span>;
json.b = <span class="hljs-number">3</span>;
console.<span class="hljs-built_in">log</span>(json.a)   <span class="hljs-comment">//3</span>
console.<span class="hljs-built_in">log</span>(json.b)   <span class="hljs-comment">//3</span></code></pre>
<h1 id="articleHeader3">二 解构赋值</h1>
<h2 id="articleHeader4">1.基本用法</h2>
<p>先上两个例子了解什么是解构赋值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let a, b, rest;
  [a, b, rest] = [1, 2];
  console.log(a, b, rest);   //1 2 undefined
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>{
  let a, <span class="hljs-keyword">b, </span>rest<span class="hljs-comment">;</span>
  [a, <span class="hljs-keyword">b, </span>rest] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>]<span class="hljs-comment">;</span>
  console.log(a, <span class="hljs-keyword">b, </span>rest)<span class="hljs-comment">;   //1 2 undefined</span>
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let a, b, rest;
  [a, b, ...rest] = [1, 2, 3, 4, 5, 6, 7];
  console.log(a, b, rest);   //1 2 [3, 4, 5, 6, 7]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>{
  let a, b, rest;
  [a, b, ...rest] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>];
  console.log(a, b, rest);   <span class="hljs-comment">//1 2 [3, 4, 5, 6, 7]</span>
}</code></pre>
<h2 id="articleHeader5">2.对象的解构赋值</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let a, b;
  ({ a, b } = { a: 1, b: 2 });  //a，b 顺序不影响其结构结果
  console.log(a, b); // 1 2
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  let a, b;
  ({ a, b } = { a: <span class="hljs-number">1</span>, b: <span class="hljs-number">2</span> })<span class="hljs-comment">;  //a，b 顺序不影响其结构结果</span>
  console.log(<span class="hljs-name">a</span>, b)<span class="hljs-comment">; // 1 2</span>
}</code></pre>
<h2 id="articleHeader6">3.默认值</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let a, b, rest;
  [a, b, rest = 3] = [1, 2];
console.log(a, b, rest); // 1 2 3
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>{
  let a, <span class="hljs-keyword">b, </span>rest<span class="hljs-comment">;</span>
  [a, <span class="hljs-keyword">b, </span>rest = <span class="hljs-number">3</span>] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>]<span class="hljs-comment">;</span>
console.log(a, <span class="hljs-keyword">b, </span>rest)<span class="hljs-comment">; // 1 2 3</span>
}</code></pre>
<h2 id="articleHeader7">4.实际应用</h2>
<h3 id="articleHeader8">变量的交换</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let a = 1;
  let b = 2;
  [a, b] = [b, a];
  console.log(a, b);  //2 1
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  let a = <span class="hljs-number">1</span><span class="hljs-comment">;</span>
  let b = <span class="hljs-number">2</span><span class="hljs-comment">;</span>
  [a, b] = [b, a]<span class="hljs-comment">;</span>
  console.log(<span class="hljs-name">a</span>, b)<span class="hljs-comment">;  //2 1</span>
}</code></pre>
<h3 id="articleHeader9">接收函数返回的值</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  function f() {
    return [12, 13];
  }
  let a, b;
  [a, b] = f();
  console.log(a, b); //12 13
}

{
  function f() {
    return [12, 13, 14, 15, 16];
  }
  let a, b;
  [a, , , b] = f();  //函数返回多个值，可以选择性的接收对应的值
  console.log(a, b); // 12 16
}

{
  function f() {
    return [12, 13, 14, 15, 16];
  }
  let a, b;
  [a, , ...b] = f();  //取出对应的值，其他的值可以直接赋值给数据
  console.log(a, b); // 12 [14, 15, 16]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  function f() {
    return [<span class="hljs-number">12</span>, <span class="hljs-number">13</span>]<span class="hljs-comment">;</span>
  }
  let a, b;
  [a, b] = f()<span class="hljs-comment">;</span>
  console.log(<span class="hljs-name">a</span>, b)<span class="hljs-comment">; //12 13</span>
}

{
  function f() {
    return [<span class="hljs-number">12</span>, <span class="hljs-number">13</span>, <span class="hljs-number">14</span>, <span class="hljs-number">15</span>, <span class="hljs-number">16</span>]<span class="hljs-comment">;</span>
  }
  let a, b;
  [a, , , b] = f()<span class="hljs-comment">;  //函数返回多个值，可以选择性的接收对应的值</span>
  console.log(<span class="hljs-name">a</span>, b)<span class="hljs-comment">; // 12 16</span>
}

{
  function f() {
    return [<span class="hljs-number">12</span>, <span class="hljs-number">13</span>, <span class="hljs-number">14</span>, <span class="hljs-number">15</span>, <span class="hljs-number">16</span>]<span class="hljs-comment">;</span>
  }
  let a, b;
  [a, , ...b] = f()<span class="hljs-comment">;  //取出对应的值，其他的值可以直接赋值给数据</span>
  console.log(<span class="hljs-name">a</span>, b)<span class="hljs-comment">; // 12 [14, 15, 16]</span>
}</code></pre>
<h2 id="articleHeader10">5.对象的解构赋值的应用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let o = { p: 42, q: true };
  let { p, q } = o;
  console.log(p, q); //42 true
}

{
  let { a = 10, b = 11 } = { a: 3 }  // 对象的默认值更改
  console.log(a,b); // 3, 11
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  let o = { p: <span class="hljs-number">42</span>, q: <span class="hljs-literal">true</span> }<span class="hljs-comment">;</span>
  let { p, q } = o;
  console.log(<span class="hljs-name">p</span>, q)<span class="hljs-comment">; //42 true</span>
}

{
  let { a = <span class="hljs-number">10</span>, b = <span class="hljs-number">11</span> } = { a: <span class="hljs-number">3</span> }  // 对象的默认值更改
  console.log(<span class="hljs-name">a</span>,b)<span class="hljs-comment">; // 3, 11</span>
}</code></pre>
<h2 id="articleHeader11">6.解构赋值的简单应用举例</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let metaData = {
    title: 'abc',
    test: [{
      title: 'gao',
      desc: 'description'
    }]
  }

  let { title: esTitle, test: [{ title: cnTitle }] } = metaData;
  console.log(esTitle, cnTitle);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  let metaData = {
    title: 'abc',
    test: [{
      title: 'gao',
      desc: 'description'
    }]
  }

  let { title: esTitle, test: [{ title: cnTitle }] } = metaData;
  console.log(<span class="hljs-name">esTitle</span>, cnTitle)<span class="hljs-comment">;</span>
}</code></pre>
<h1 id="articleHeader12">三 正则的扩展</h1>
<h2 id="articleHeader13">1.构造函数来创建正则</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let regex1 = new RegExp('xyz', 'i');
  let regex2 = new RegExp(/xyz/i);
  console.log(regex1.test('xyz123'), regex2.test('xyz123')); // true true


  let regex3 = new RegExp(/xyz/ig, 'i'); // 后面的修饰符会把前面的修饰符给覆盖掉
  console.log(regex3.flags);  // es6新增的，用来获取正则表达式的修饰符
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{
  <span class="hljs-keyword">let</span> regex1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'xyz'</span>, <span class="hljs-string">'i'</span>);
  <span class="hljs-keyword">let</span> regex2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-regexp">/xyz/i</span>);
  <span class="hljs-built_in">console</span>.log(regex1.test(<span class="hljs-string">'xyz123'</span>), regex2.test(<span class="hljs-string">'xyz123'</span>)); <span class="hljs-comment">// true true</span>


  <span class="hljs-keyword">let</span> regex3 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-regexp">/xyz/ig</span>, <span class="hljs-string">'i'</span>); <span class="hljs-comment">// 后面的修饰符会把前面的修饰符给覆盖掉</span>
  <span class="hljs-built_in">console</span>.log(regex3.flags);  <span class="hljs-comment">// es6新增的，用来获取正则表达式的修饰符</span>
}</code></pre>
<h2 id="articleHeader14">2.g修饰符和y修饰符</h2>
<p>y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let s = 'bbb_bb_b';
  let a1 = /b+/g; // g只要匹配到都算
  let a2 = /b+/y; // y必须是下一个开始的字母开始匹配

  console.log('one', a1.exec(s), a2.exec(s)); // g修饰符匹配到都可以，y修饰符必须从第一个开始匹配，如果一第个不是b则会输出null
  console.log('two', a1.exec(s), a2.exec(s)); // 第二次匹配，g修饰符会只要匹配到都可以，y修饰符必须从紧邻的下一个字符开始匹配
  
  console.log(a1.sticky, a2.sticky); // 判断是否开启了y修饰符   false true
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{
  <span class="hljs-keyword">let</span> s = <span class="hljs-string">'bbb_bb_b'</span>;
  <span class="hljs-keyword">let</span> a1 = <span class="hljs-regexp">/b+/g</span>; <span class="hljs-comment">// g只要匹配到都算</span>
  <span class="hljs-keyword">let</span> a2 = <span class="hljs-regexp">/b+/y</span>; <span class="hljs-comment">// y必须是下一个开始的字母开始匹配</span>

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'one'</span>, a1.exec(s), a2.exec(s)); <span class="hljs-comment">// g修饰符匹配到都可以，y修饰符必须从第一个开始匹配，如果一第个不是b则会输出null</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'two'</span>, a1.exec(s), a2.exec(s)); <span class="hljs-comment">// 第二次匹配，g修饰符会只要匹配到都可以，y修饰符必须从紧邻的下一个字符开始匹配</span>
  
  <span class="hljs-built_in">console</span>.log(a1.sticky, a2.sticky); <span class="hljs-comment">// 判断是否开启了y修饰符   false true</span>
}</code></pre>
<p>one和two的输出结果<br><span class="img-wrap"><img data-src="/img/remote/1460000013053000?w=349&amp;h=204" src="https://static.alili.tech/img/remote/1460000013053000?w=349&amp;h=204" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader15">3.u修饰符(unicode)</h2>
<p>ES6 对正则表达式添加了u修饰符，含义为“Unicode模式”，用来正确处理大于uFFFF的 Unicode 字符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  console.log('u-1', /^\uD83D/.test('\uD83D\uDC2A')); // 不加u把后面的四个字节当成两个字符
  console.log('u-2', /^\uD83D/u.test('\uD83D\uDC2A')); // 加u把后面的4个字节当作一个字符

  console.log(/\u{61}/.test('a'));  // false 大括号括起来代表一个unicode字符，所以必须加u才能识别
  console.log(/\u{61}/u.test('a')); // true

  console.log(`\u{20BB7}`);
  let s = '?';
  console.log('u-1', /^.$/.test(s));  //false 字符串大于两个字节，必须加u修饰符才能匹配到
  console.log('u-2', /^.$/u.test(s)); //true

  console.log('test-1', /?{2}/.test('??')); // false
  console.log('test-2', /?{2}/u.test('??')); // true
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'u-1'</span>, <span class="hljs-regexp">/^\uD83D/</span>.test(<span class="hljs-string">'\uD83D\uDC2A'</span>)); <span class="hljs-comment">// 不加u把后面的四个字节当成两个字符</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'u-2'</span>, <span class="hljs-regexp">/^\uD83D/u</span>.test(<span class="hljs-string">'\uD83D\uDC2A'</span>)); <span class="hljs-comment">// 加u把后面的4个字节当作一个字符</span>

  <span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/\u{61}/</span>.test(<span class="hljs-string">'a'</span>));  <span class="hljs-comment">// false 大括号括起来代表一个unicode字符，所以必须加u才能识别</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/\u{61}/u</span>.test(<span class="hljs-string">'a'</span>)); <span class="hljs-comment">// true</span>

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`\u{20BB7}`</span>);
  <span class="hljs-keyword">let</span> s = <span class="hljs-string">'?'</span>;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'u-1'</span>, <span class="hljs-regexp">/^.$/</span>.test(s));  <span class="hljs-comment">//false 字符串大于两个字节，必须加u修饰符才能匹配到</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'u-2'</span>, <span class="hljs-regexp">/^.$/u</span>.test(s)); <span class="hljs-comment">//true</span>

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'test-1'</span>, <span class="hljs-regexp">/?{2}/</span>.test(<span class="hljs-string">'??'</span>)); <span class="hljs-comment">// false</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'test-2'</span>, <span class="hljs-regexp">/?{2}/u</span>.test(<span class="hljs-string">'??'</span>)); <span class="hljs-comment">// true</span>
}</code></pre>
<h1 id="articleHeader16">四 字符串扩展</h1>
<h2 id="articleHeader17">1.unicode的表示方法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  console.log('a', '\u0061'); // a a
  console.log('s', '\u20BB7'); // s ₻7  把前两个字节当作一个整体
  console.log('s', '\u{20BB7}'); // s ?  unicode编码用{}可以正常识别
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'a'</span>, <span class="hljs-string">'\u0061'</span>); <span class="hljs-comment">// a a</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'s'</span>, <span class="hljs-string">'\u20BB7'</span>); <span class="hljs-comment">// s ₻7  把前两个字节当作一个整体</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'s'</span>, <span class="hljs-string">'\u{20BB7}'</span>); <span class="hljs-comment">// s ?  unicode编码用{}可以正常识别</span>
}</code></pre>
<h2 id="articleHeader18">2.codePointAt和charCodeAt的对比</h2>
<p>对于4个字节的字符，JavaScript不能正确处理，字符串长度会误判为2，而且charAt方法无法读取整个字符，charCodeAt方法只能分别返回前两个字节和后两个字节的值。ES6提供了codePointAt方法，能够正确处理4个字节储存的字符，返回一个字符的码点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
   let s = '?';
   console.log(s.length);  // 2
   console.log('0', s.charAt(0));  // 0 �   //es5未对多个字节的字符做处理
   console.log('1', s.charAt(1));  // 1 �
   console.log('at0', s.charCodeAt(0));  //at0 55362
   console.log('at1', s.charCodeAt(1));  //at1 57271
   
   let s1 = '?a';
   console.log('length', s1.length); // 3
   console.log('code0', s1.codePointAt(0)); // code0 134071
   console.log('code0', s1.codePointAt(0).toString(16));  // code0 es6会自动把多个字节的字符当作一个整体来处理 
   console.log('code1', s1.codePointAt(1)); // code1 57271
   console.log('code2', s1.codePointAt(2)); // code2 97
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{
   <span class="hljs-keyword">let</span> s = <span class="hljs-string">'?'</span>;
   <span class="hljs-built_in">console</span>.log(s.length);  <span class="hljs-comment">// 2</span>
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'0'</span>, s.charAt(<span class="hljs-number">0</span>));  <span class="hljs-comment">// 0 �   //es5未对多个字节的字符做处理</span>
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>, s.charAt(<span class="hljs-number">1</span>));  <span class="hljs-comment">// 1 �</span>
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'at0'</span>, s.charCodeAt(<span class="hljs-number">0</span>));  <span class="hljs-comment">//at0 55362</span>
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'at1'</span>, s.charCodeAt(<span class="hljs-number">1</span>));  <span class="hljs-comment">//at1 57271</span>
   
   <span class="hljs-keyword">let</span> s1 = <span class="hljs-string">'?a'</span>;
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'length'</span>, s1.length); <span class="hljs-comment">// 3</span>
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'code0'</span>, s1.codePointAt(<span class="hljs-number">0</span>)); <span class="hljs-comment">// code0 134071</span>
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'code0'</span>, s1.codePointAt(<span class="hljs-number">0</span>).toString(<span class="hljs-number">16</span>));  <span class="hljs-comment">// code0 es6会自动把多个字节的字符当作一个整体来处理 </span>
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'code1'</span>, s1.codePointAt(<span class="hljs-number">1</span>)); <span class="hljs-comment">// code1 57271</span>
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'code2'</span>, s1.codePointAt(<span class="hljs-number">2</span>)); <span class="hljs-comment">// code2 97</span>
}</code></pre>
<h2 id="articleHeader19">3.fromCharCode和fromCodePoint</h2>
<p>ES5提供String.fromCharCode方法，用于从码点返回对应字符，但是这个方法不能识别Unicode编号大于0xFFFF。ES6提供了String.fromCodePoint方法，可以识别大于0xFFFF的字符，弥补了String.fromCharCode方法的不足。在作用上，正好与codePointAt方法相反。注意，fromCodePoint方法定义在String对象上，而codePointAt方法定义在字符串的实例对象上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  console.log(String.fromCharCode('0x20bb7'));  //ஷ
  console.log(String.fromCodePoint('0x20bb7'))  //?
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  console.log(<span class="hljs-name">String.fromCharCode</span>(<span class="hljs-name">'0x20bb7'</span>))<span class="hljs-comment">;  //ஷ</span>
  console.log(<span class="hljs-name">String.fromCodePoint</span>(<span class="hljs-name">'0x20bb7'</span>))  //?
}</code></pre>
<h2 id="articleHeader20">4.字符串遍历器</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  // es5
  let str = '\u{20bb7}abc';
  for (let i = 0; i < str.length; i++) {
    console.log('es5', str[i]);
    
    //� � a b c   
  }
  //es6
  for (let code of str) {
    console.log('es6', code);
    
    // ? a b c
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{
  <span class="hljs-comment">// es5</span>
  <span class="hljs-keyword">let</span> str = <span class="hljs-string">'\u{20bb7}abc'</span>;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; str.length; i++) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'es5'</span>, str[i]);
    
    <span class="hljs-comment">//� � a b c   </span>
  }
  <span class="hljs-comment">//es6</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> code <span class="hljs-keyword">of</span> str) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'es6'</span>, code);
    
    <span class="hljs-comment">// ? a b c</span>
  }
}</code></pre>
<h2 id="articleHeader21">5.一些常用的字符串api</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let str = 'string';
  console.log('includes', str.includes('c'));  // 判断是否包含  false
  console.log('start', str.startsWith('s'));   // 以什么开头  true
  console.log('end', str.endsWith('ng'));   // 以什么结尾   true
  console.log('repeat', str.repeat(2));     // 字符串重复两次  stringstring
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>{
  let <span class="hljs-built_in">str</span> = <span class="hljs-string">'string'</span>;
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'includes'</span>, <span class="hljs-built_in">str</span>.includes(<span class="hljs-string">'c'</span>));  <span class="hljs-comment">// 判断是否包含  false</span>
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'start'</span>, <span class="hljs-built_in">str</span>.startsWith(<span class="hljs-string">'s'</span>));   <span class="hljs-comment">// 以什么开头  true</span>
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'end'</span>, <span class="hljs-built_in">str</span>.endsWith(<span class="hljs-string">'ng'</span>));   <span class="hljs-comment">// 以什么结尾   true</span>
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'repeat'</span>, <span class="hljs-built_in">str</span>.repeat(<span class="hljs-number">2</span>));     <span class="hljs-comment">// 字符串重复两次  stringstring</span>
}</code></pre>
<p>ES6 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串。如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    console.log('1'.padStart(2,'0')); // 01
    console.log('1'.padEnd(2,'0')); // 10
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code>{
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'1'</span>.padStart(<span class="hljs-number">2</span>,<span class="hljs-string">'0'</span>)); <span class="hljs-comment">// 01</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'1'</span>.padEnd(<span class="hljs-number">2</span>,<span class="hljs-string">'0'</span>)); <span class="hljs-comment">// 10</span>
}</code></pre>
<h2 id="articleHeader22">6.模板字符串</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let name = &quot;List&quot;;
  let info = &quot;hello world&quot;;
  let m = `i am ${name} ${info}`;
  console.log(m);  //i am List hello world
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{
  <span class="hljs-keyword">let</span> name = <span class="hljs-string">"List"</span>;
  <span class="hljs-keyword">let</span> info = <span class="hljs-string">"hello world"</span>;
  <span class="hljs-keyword">let</span> m = <span class="hljs-string">`i am <span class="hljs-subst">${name}</span> <span class="hljs-subst">${info}</span>`</span>;
  <span class="hljs-built_in">console</span>.log(m);  <span class="hljs-comment">//i am List hello world</span>
}</code></pre>
<h2 id="articleHeader23">7.标签模板</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let user = {
    name:'list',
    info:'hello world'
  }

  function fn(s,v1,v2){
    console.log(s,v1,v2);
    return s+v1+v2;
  }

  console.log(fn`i am ${user.name} ${user.info}`)  // ``符号相当于一个函数的参数fn(i am ${user.name} ${user.info});
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  let user = {
    name:'list',
    info:'hello world'
  }

  function fn(<span class="hljs-name">s</span>,v1,v2){
    console.log(<span class="hljs-name">s</span>,v1,v2)<span class="hljs-comment">;</span>
    return s+v1+v2;
  }

  console.log(<span class="hljs-name"><span class="hljs-builtin-name">fn</span></span>`i am ${user.name} ${user.info}`)  // ``符号相当于一个函数的参数fn(<span class="hljs-name">i</span> am ${user.name} ${user.info})<span class="hljs-comment">;</span>
}</code></pre>
<p>输出结果<br><span class="img-wrap"><img data-src="/img/remote/1460000013053001?w=308&amp;h=229" src="https://static.alili.tech/img/remote/1460000013053001?w=308&amp;h=229" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader24">8.String.row API</h2>
<p>ES6还为原生的String对象，提供了一个raw方法。String.raw方法，往往用来充当模板字符串的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，对应于替换变量后的模板字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  console.log('raw '+String.raw`hi\n${1+2}`)
  console.log('noRaw '+`hi\n${1+2}`)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'raw '</span>+<span class="hljs-built_in">String</span>.raw<span class="hljs-string">`hi\n<span class="hljs-subst">${<span class="hljs-number">1</span>+<span class="hljs-number">2</span>}</span>`</span>)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'noRaw '</span>+<span class="hljs-string">`hi\n<span class="hljs-subst">${<span class="hljs-number">1</span>+<span class="hljs-number">2</span>}</span>`</span>)
}</code></pre>
<p>输出结果<br><span class="img-wrap"><img data-src="/img/remote/1460000013053002?w=82&amp;h=50" src="https://static.alili.tech/img/remote/1460000013053002?w=82&amp;h=50" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader25">五 数值扩展</h1>
<h2 id="articleHeader26">1.二进制八进制表示法</h2>
<p>从 ES5 开始，在严格模式之中，八进制就不再允许使用前缀0表示，ES6进一步明确，要使用前缀0o表示。如果要将0b和0o前缀的字符串数值转为十进制，要使用Number方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  console.log('B',0b11010101010);  //二进制表示，b大小写都可以
  console.log('O',0O1237637236);  // 八进制表示法
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>{
  console.<span class="hljs-built_in">log</span>('B',<span class="hljs-number">0b11010101010</span>);  //二进制表示，b大小写都可以
  console.<span class="hljs-built_in">log</span>('O',<span class="hljs-number">0O1237637236</span>);  // 八进制表示法
}</code></pre>
<h2 id="articleHeader27">2.Number.isFinite()和Number.isNaN()</h2>
<p>Number.isFinite()用来判断数字是否有限（无尽小数），Number.isNaN()来判断一个数是不是小数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  console.log('15',isFinite(15));    //true
  console.log('NaN',isFinite(NaN));  //false
  console.log('1/0',isFinite(1/0));  //false
  console.log('isNaN',Number.isNaN(15)); // false
  console.log('isNaN',Number.isNaN(NaN));  // true
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'15'</span>,<span class="hljs-built_in">isFinite</span>(<span class="hljs-number">15</span>));    <span class="hljs-comment">//true</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'NaN'</span>,<span class="hljs-built_in">isFinite</span>(<span class="hljs-literal">NaN</span>));  <span class="hljs-comment">//false</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1/0'</span>,<span class="hljs-built_in">isFinite</span>(<span class="hljs-number">1</span>/<span class="hljs-number">0</span>));  <span class="hljs-comment">//false</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'isNaN'</span>,<span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-number">15</span>)); <span class="hljs-comment">// false</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'isNaN'</span>,<span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-literal">NaN</span>));  <span class="hljs-comment">// true</span>
}</code></pre>
<h2 id="articleHeader28">3.Number.isInteger</h2>
<p>Number.isInteger用来判断一个数是不是整数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  console.log('13',Number.isInteger(13));      // true
  console.log('13.0',Number.isInteger(13.0));  // true 
  console.log('13.1',Number.isInteger(13.1));  //false
  console.log('13',Number.isInteger('13'));    // false
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'13'</span>,<span class="hljs-built_in">Number</span>.isInteger(<span class="hljs-number">13</span>));      <span class="hljs-comment">// true</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'13.0'</span>,<span class="hljs-built_in">Number</span>.isInteger(<span class="hljs-number">13.0</span>));  <span class="hljs-comment">// true </span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'13.1'</span>,<span class="hljs-built_in">Number</span>.isInteger(<span class="hljs-number">13.1</span>));  <span class="hljs-comment">//false</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'13'</span>,<span class="hljs-built_in">Number</span>.isInteger(<span class="hljs-string">'13'</span>));    <span class="hljs-comment">// false</span>
}</code></pre>
<h2 id="articleHeader29">4.Number.MAX_SAFE_INTEGER,Number.MIN_SFAE_INTEGER和isSafeInterger</h2>
<p>Number.MAX_SAFE_INTEGER,Number.MIN_SFAE_INTEGER表示js可以准确表示的值的范围，isSafeInterger用来判断这个值是否在安全范围内。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  console.log(Number.MAX_SAFE_INTEGER,Number.MIN_SFAE_INTEGER);
  console.log('15',Number.isSafeInteger(15));
  console.log('9999999999999999999999',Number.isSafeInteger(9999999999999999999999));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>{
  console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">Number</span>.MAX_SAFE_INTEGER,<span class="hljs-built_in">Number</span>.MIN_SFAE_INTEGER)<span class="hljs-comment">;</span>
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'15'</span>,<span class="hljs-built_in">Number</span>.isSafeInteger(<span class="hljs-number">15</span>))<span class="hljs-comment">;</span>
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'9999999999999999999999'</span>,<span class="hljs-built_in">Number</span>.isSafeInteger(<span class="hljs-number">9999999999999999999999</span>))<span class="hljs-comment">;</span>
}</code></pre>
<h2 id="articleHeader30">5.Math.trunc和Math.sign</h2>
<p>Math.trunc方法用于去除一个数的小数部分，返回整数部分。Math.sign方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  console.log('4.1',Math.trunc(4.1));   //4
  console.log('4.9',Math.trunc(4.9));   //4
}
{
  console.log('-5',Math.sign(-5))    //-1
  console.log('5',Math.sign(5))      //+1
  console.log('0',Math.sign(0))      //0
  console.log('50',Math.sign(50))    //+1
  console.log('NaN',Math.sign(NaN))  //NaN
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'4.1'</span>,<span class="hljs-built_in">Math</span>.trunc(<span class="hljs-number">4.1</span>));   <span class="hljs-comment">//4</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'4.9'</span>,<span class="hljs-built_in">Math</span>.trunc(<span class="hljs-number">4.9</span>));   <span class="hljs-comment">//4</span>
}
{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'-5'</span>,<span class="hljs-built_in">Math</span>.sign(<span class="hljs-number">-5</span>))    <span class="hljs-comment">//-1</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'5'</span>,<span class="hljs-built_in">Math</span>.sign(<span class="hljs-number">5</span>))      <span class="hljs-comment">//+1</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'0'</span>,<span class="hljs-built_in">Math</span>.sign(<span class="hljs-number">0</span>))      <span class="hljs-comment">//0</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'50'</span>,<span class="hljs-built_in">Math</span>.sign(<span class="hljs-number">50</span>))    <span class="hljs-comment">//+1</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'NaN'</span>,<span class="hljs-built_in">Math</span>.sign(<span class="hljs-literal">NaN</span>))  <span class="hljs-comment">//NaN</span>
} </code></pre>
<h2 id="articleHeader31">6.cbrt</h2>
<p>cbrt用来计算一个数的开方</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  console.log('-1',cbrt(-1));   //-1
  console.log('8',cbrt(8));     //2
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  console.log(<span class="hljs-name">'-1'</span>,cbrt(<span class="hljs-name">-1</span>))<span class="hljs-comment">;   //-1</span>
  console.log(<span class="hljs-name">'8'</span>,cbrt(<span class="hljs-number">8</span>))<span class="hljs-comment">;     //2</span>
}</code></pre>
<h1 id="articleHeader32">六 数组扩展</h1>
<h2 id="articleHeader33">1. Array.of</h2>
<p>Array.of方法用于将一组值，转换为数组,这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let arr = Array.of(1,2,3,4);
  console.log('arr=',arr);  // arr= [1, 2, 3, 4]

  let emptyArr = Array.of();
  console.log(emptyArr);  // []

  //与Array方法对比
  Array() // []
  Array(3) // [, , ,]
  Array(3, 11, 8) // [3, 11, 8]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{
  <span class="hljs-keyword">let</span> arr = <span class="hljs-built_in">Array</span>.of(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'arr='</span>,arr);  <span class="hljs-comment">// arr= [1, 2, 3, 4]</span>

  <span class="hljs-keyword">let</span> emptyArr = <span class="hljs-built_in">Array</span>.of();
  <span class="hljs-built_in">console</span>.log(emptyArr);  <span class="hljs-comment">// []</span>

  <span class="hljs-comment">//与Array方法对比</span>
  <span class="hljs-built_in">Array</span>() <span class="hljs-comment">// []</span>
  <span class="hljs-built_in">Array</span>(<span class="hljs-number">3</span>) <span class="hljs-comment">// [, , ,]</span>
  <span class="hljs-built_in">Array</span>(<span class="hljs-number">3</span>, <span class="hljs-number">11</span>, <span class="hljs-number">8</span>) <span class="hljs-comment">// [3, 11, 8]</span>
}</code></pre>
<h2 id="articleHeader34">2.Array.from</h2>
<p>Array.from方法用于将两类对象转为真正的数组：类似数组的对象和可遍历的对象（包括ES6新增的数据结构Set和Map）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>你好</p>
<p>我好</p>
<p>大家好</p>

{
  let p = document.querySelectorAll('p');
  let pArr = Array.from(p);
  pArr.forEach(function(item){
    console.log(item.textContent);  // 你好 我好 大家好
  })
  console.log(Array.from([1,3,5],function(item){return item*2})) // [2,6,10]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs zephir"><code>&lt;p&gt;你好&lt;/p&gt;
&lt;p&gt;我好&lt;/p&gt;
&lt;p&gt;大家好&lt;/p&gt;

{
  <span class="hljs-keyword">let</span> p = document.querySelectorAll(<span class="hljs-string">'p'</span>);
  <span class="hljs-keyword">let</span> pArr = <span class="hljs-keyword">Array</span>.from(p);
  pArr.<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(item)</span></span>{
    console.log(item.textContent);  <span class="hljs-comment">// 你好 我好 大家好</span>
  })
  console.log(<span class="hljs-keyword">Array</span>.from([<span class="hljs-number">1</span>,<span class="hljs-number">3</span>,<span class="hljs-number">5</span>],<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(item)</span></span>{<span class="hljs-keyword">return</span> item*<span class="hljs-number">2</span>})) <span class="hljs-comment">// [2,6,10]</span>
}</code></pre>
<h2 id="articleHeader35">3.Array.fill</h2>
<p>fill方法使用给定值，填充一个数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  console.log('fill-7',[1,3,'undefined'].fill(7));   //[7,7,7]
  console.log('fill,pos',[1,2,3,4,5,7,8].fill(7,1,4)); //[1, 7, 7, 7, 5, 7, 8]  // 后两个参数表示索引的位置
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>{
  console.log('fill<span class="hljs-number">-7</span>',[<span class="hljs-number">1</span>,<span class="hljs-number">3</span>,'undefined'].fill(<span class="hljs-number">7</span>));   <span class="hljs-comment">//[7,7,7]</span>
  console.log('fill,pos',[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">7</span>,<span class="hljs-number">8</span>].fill(<span class="hljs-number">7</span>,<span class="hljs-number">1</span>,<span class="hljs-number">4</span>)); <span class="hljs-comment">//[1, 7, 7, 7, 5, 7, 8]  // 后两个参数表示索引的位置</span>
}</code></pre>
<h2 id="articleHeader36">4.entries()，keys() 和 values()</h2>
<p>ES6 提供三个新的方法——entries()，keys()和values()——用于遍历数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  for(let index of [1,2,3,4].keys()){
    console.log('index',index);
   // index 0
   // index 1
   // index 2
   // index 3
  }
  for(let value of [1,2,3,4].values()){
    console.log('value',value);
   // value 1
   // value 2
   // value 3
   // value 4
  }
  for(let [index,value] of [1,2,4,5,6].entries()){
    console.log(index,value);
   // 0 1
   // 1 2
   // 2 4
   // 3 5
   // 4 
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code>{
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> index <span class="hljs-keyword">of</span> [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>].keys()){
    console.log(<span class="hljs-string">'index'</span>,index);
   <span class="hljs-comment">// index 0</span>
   <span class="hljs-comment">// index 1</span>
   <span class="hljs-comment">// index 2</span>
   <span class="hljs-comment">// index 3</span>
  }
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> <span class="hljs-keyword">value</span> <span class="hljs-keyword">of</span> [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>].values()){
    console.log(<span class="hljs-string">'value'</span>,<span class="hljs-keyword">value</span>);
   <span class="hljs-comment">// value 1</span>
   <span class="hljs-comment">// value 2</span>
   <span class="hljs-comment">// value 3</span>
   <span class="hljs-comment">// value 4</span>
  }
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> [index,<span class="hljs-keyword">value</span>] <span class="hljs-keyword">of</span> [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>].entries()){
    console.log(index,<span class="hljs-keyword">value</span>);
   <span class="hljs-comment">// 0 1</span>
   <span class="hljs-comment">// 1 2</span>
   <span class="hljs-comment">// 2 4</span>
   <span class="hljs-comment">// 3 5</span>
   <span class="hljs-comment">// 4 </span>
  }
}</code></pre>
<h2 id="articleHeader37">5.Array.copyWithin</h2>
<p>截取一定长度的数字并且替换在相对应的索引的位置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  console.log([1,4,9,6,7,2,3].copyWithin(1,3,5));  //  [1, 6, 7, 6, 7, 2, 3]  // 截取3-5的位置的数字，从索引1的位置开始替换
  console.log([1,4,9,6,7,2,3].copyWithin(1,3,6));  //  [1, 6, 7, 2, 7, 2, 3] 

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>{
  console.log([<span class="hljs-number">1</span>,<span class="hljs-number">4</span>,<span class="hljs-number">9</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].copyWithin(<span class="hljs-number">1</span>,<span class="hljs-number">3</span>,<span class="hljs-number">5</span>));  <span class="hljs-comment">//  [1, 6, 7, 6, 7, 2, 3]  // 截取3-5的位置的数字，从索引1的位置开始替换</span>
  console.log([<span class="hljs-number">1</span>,<span class="hljs-number">4</span>,<span class="hljs-number">9</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].copyWithin(<span class="hljs-number">1</span>,<span class="hljs-number">3</span>,<span class="hljs-number">6</span>));  <span class="hljs-comment">//  [1, 6, 7, 2, 7, 2, 3] </span>

}</code></pre>
<h2 id="articleHeader38">6.findIndex和find</h2>
<p>数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  console.log([1,2,3,4,5,6].find(function(item){return item > 3}));   //4
  console.log([1,2,3,4,5,6].findIndex(function(item){return item > 3}));   // 3
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>{
  console.log([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>].find(function(item){return item &gt; <span class="hljs-number">3</span>}));   <span class="hljs-comment">//4</span>
  console.log([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>].findIndex(function(item){return item &gt; <span class="hljs-number">3</span>}));   <span class="hljs-comment">// 3</span>
}</code></pre>
<h2 id="articleHeader39">7.includes</h2>
<p>Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。ES2016 引入了该方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  console.log([1,2,NaN].includes(1));  // true
  console.log([1,2,NaN].includes(NaN));  // true
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  console.log([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,NaN].includes(<span class="hljs-number">1</span>))<span class="hljs-comment">;  // true</span>
  console.log([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,NaN].includes(<span class="hljs-name">NaN</span>))<span class="hljs-comment">;  // true</span>
}</code></pre>
<h2 id="articleHeader40">8.扩展运算符</h2>
<p>扩展运算符（spread）是三个点（...）。将一个数组转为用逗号分隔的参数序列。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>console.log(...[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>])
<span class="hljs-comment">// 1 2 3</span>

console.log(<span class="hljs-number">1</span>, ...[<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>], <span class="hljs-number">5</span>)
<span class="hljs-comment">// 1 2 3 4 5</span>

[...document.querySelectorAll('div')]
<span class="hljs-comment">// [&lt;div&gt;, &lt;div&gt;, &lt;div&gt;]</span></code></pre>
<h1 id="articleHeader41">七 函数扩展</h1>
<h2 id="articleHeader42">1.默认值</h2>
<p>ES6 之前，不能直接为函数的参数指定默认值;ES6允许为函数的参数设置默认值，即直接写在参数定义的后面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    function fn(x,y='hello'){  // 默认值后面不能再出现形参
        console.log(x,y);
    }
    fn('word');  // word hello
    fn('word','nihao')  // word nihao
}

{
    let a = 'nihao';
    function test(a,b=a){  //1.
        //let a = 1; 参数变量是默认声明的，所以不能用let或const再次声明
        console.log(a,b);
    }
    test('word'); // word word  
    test();  //undefined undefined
}
{
    let a = 'nihao';
    function test(x,b=a){  //2.
        console.log(x,b)
    }
    test('hello');// hello nihao
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">x,y=<span class="hljs-string">'hello'</span></span>)</span>{  <span class="hljs-comment">// 默认值后面不能再出现形参</span>
        <span class="hljs-built_in">console</span>.log(x,y);
    }
    fn(<span class="hljs-string">'word'</span>);  <span class="hljs-comment">// word hello</span>
    fn(<span class="hljs-string">'word'</span>,<span class="hljs-string">'nihao'</span>)  <span class="hljs-comment">// word nihao</span>
}

{
    <span class="hljs-keyword">let</span> a = <span class="hljs-string">'nihao'</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params">a,b=a</span>)</span>{  <span class="hljs-comment">//1.</span>
        <span class="hljs-comment">//let a = 1; 参数变量是默认声明的，所以不能用let或const再次声明</span>
        <span class="hljs-built_in">console</span>.log(a,b);
    }
    test(<span class="hljs-string">'word'</span>); <span class="hljs-comment">// word word  </span>
    test();  <span class="hljs-comment">//undefined undefined</span>
}
{
    <span class="hljs-keyword">let</span> a = <span class="hljs-string">'nihao'</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params">x,b=a</span>)</span>{  <span class="hljs-comment">//2.</span>
        <span class="hljs-built_in">console</span>.log(x,b)
    }
    test(<span class="hljs-string">'hello'</span>);<span class="hljs-comment">// hello nihao</span>
}</code></pre>
<h2 id="articleHeader43">3.rest参数</h2>
<p>ES6 引入rest参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    function fn(...arg){
        for(let v of arg){
            console.log(v);
        }
    }
    fn(1,2,3,4);
    //1
    //2
    //3
    //4
}
{
    console.log(...[1,2,3,4]);  // 1，2，3，4
    console.log('a',...[1,2,3,4]); // a,1,2,3,4
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span><span class="hljs-params">(<span class="hljs-rest_arg">...arg</span>)</span></span>{
        <span class="hljs-keyword">for</span>(let v of arg){
            console.log(v);
        }
    }
    fn(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>);
    <span class="hljs-comment">//1</span>
    <span class="hljs-comment">//2</span>
    <span class="hljs-comment">//3</span>
    <span class="hljs-comment">//4</span>
}
{
    console.log(...[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>]);  <span class="hljs-comment">// 1，2，3，4</span>
    console.log(<span class="hljs-string">'a'</span>,...[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>]); <span class="hljs-comment">// a,1,2,3,4</span>
}</code></pre>
<h2 id="articleHeader44">4.箭头函数</h2>
<p>ES6 允许使用“箭头”（=&gt;）定义函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    let arr = v => v*2;
    console.log(arr(2));

    var sum = (num1, num2) => { return num1 + num2; } //如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{
    <span class="hljs-keyword">let</span> arr = <span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> v*<span class="hljs-number">2</span>;
    <span class="hljs-built_in">console</span>.log(arr(<span class="hljs-number">2</span>));

    <span class="hljs-keyword">var</span> sum = <span class="hljs-function">(<span class="hljs-params">num1, num2</span>) =&gt;</span> { <span class="hljs-keyword">return</span> num1 + num2; } <span class="hljs-comment">//如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。</span>
}</code></pre>
<p>使用注意点<br>箭头函数有几个使用注意点。</p>
<p>（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。</p>
<p>（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。</p>
<p>（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。</p>
<p>（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。</p>
<h2 id="articleHeader45">5.绑定 this</h2>
<p>函数绑定运算符是并排的两个冒号（::），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo::bar;
// 等同于
bar.bind(foo);

foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);

const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return obj::hasOwnProperty(key);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>foo::bar;
<span class="hljs-comment">// 等同于</span>
bar.bind(foo);

foo::bar(...arguments);
<span class="hljs-comment">// 等同于</span>
bar.apply(foo, arguments);

<span class="hljs-keyword">const</span> hasOwnProperty = Object.prototype.hasOwnProperty;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hasOwn</span><span class="hljs-params">(obj, key)</span> </span>{
  <span class="hljs-keyword">return</span> obj::hasOwnProperty(key);
}</code></pre>
<p>尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    function fn1(x){
        console.log('fn1',x);
    }
    function fn2(x){
        return fn1(x);  // 对fn1的调用必须在最后一步操作
    }
    fn2(2);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
    function fn1(<span class="hljs-name">x</span>){
        console.log(<span class="hljs-name">'fn1'</span>,x)<span class="hljs-comment">;</span>
    }
    function fn2(<span class="hljs-name">x</span>){
        return fn1(<span class="hljs-name">x</span>)<span class="hljs-comment">;  // 对fn1的调用必须在最后一步操作</span>
    }
    fn2(<span class="hljs-number">2</span>)<span class="hljs-comment">;</span>
}</code></pre>
<h1 id="articleHeader46">八 对象扩展</h1>
<h2 id="articleHeader47">1.属性的简介表示法</h2>
<p>ES6 允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    let a = 5,b=6;
    let es5 = {
        a:a,
        b:b
    }
    let es6 = {
        a,
        b
    }
    console.log(es5,es6)  // {a: 5, b: 6}  {a: 5, b: 6}


    let es5_fn = {   // 
        fn:function(){
            console.log('hello')
        }
    }
    let es6_fn = {
        fn(){
            console.log('hello')
        }
    }
    console.log(es5_fn.fn,es6_fn.fn);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
    let a = <span class="hljs-number">5</span>,b=6;
    let es5 = {
        a:a,
        b:b
    }
    let es6 = {
        a,
        b
    }
    console.log(<span class="hljs-name">es5</span>,es6)  // {a: <span class="hljs-number">5</span>, b: <span class="hljs-number">6</span>}  {a: <span class="hljs-number">5</span>, b: <span class="hljs-number">6</span>}


    let es5_fn = {   // 
        fn:function(){
            console.log(<span class="hljs-name">'hello'</span>)
        }
    }
    let es6_fn = {
        fn(){
            console.log(<span class="hljs-name">'hello'</span>)
        }
    }
    console.log(<span class="hljs-name">es5_fn.fn</span>,es6_fn.fn)<span class="hljs-comment">;</span>
}</code></pre>
<h2 id="articleHeader48">2.动态key值</h2>
<p>es6允许属性的key值是动态的变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    let a = 'b';
    let es5_obj = {
        a:'c',
        b:'c'
    }
    let es6_obj = {
        [a]:'c'   // a是动态的变量，可以自由赋值
    }
    console.log(es5_obj, es6_obj);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{
    <span class="hljs-keyword">let</span> a = <span class="hljs-string">'b'</span>;
    <span class="hljs-keyword">let</span> es5_obj = {
        <span class="hljs-attr">a</span>:<span class="hljs-string">'c'</span>,
        <span class="hljs-attr">b</span>:<span class="hljs-string">'c'</span>
    }
    <span class="hljs-keyword">let</span> es6_obj = {
        [a]:<span class="hljs-string">'c'</span>   <span class="hljs-comment">// a是动态的变量，可以自由赋值</span>
    }
    <span class="hljs-built_in">console</span>.log(es5_obj, es6_obj);
}</code></pre>
<h2 id="articleHeader49">3.Object.is</h2>
<p>这个方法相当于es5 中的 ===，来判断属性是否相等</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    console.log('is',Object.is('a','a'));  // true
    console.log('is',Object.is([],[]));    // false   数组对象拥有不同的地址，
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
    console.log(<span class="hljs-name">'is'</span>,Object.is(<span class="hljs-name">'a'</span>,'a'))<span class="hljs-comment">;  // true</span>
    console.log(<span class="hljs-name">'is'</span>,Object.is([],[]))<span class="hljs-comment">;    // false   数组对象拥有不同的地址，</span>
}</code></pre>
<h2 id="articleHeader50">4.Object.assign</h2>
<p>Object.assign方法用于对象的合并，将源对象的所有可枚举属性，复制到目标对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    console.log('拷贝',Object.assign({a:1},{b:2}));  //浅拷贝

    let test = {a:2,b:3}
    for(let [key,value] of Object.entries(test)){   // 遍历
        console.log([key,value]); 
        //[a:2]
        //[b:3]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
    console.log(<span class="hljs-name">'</span>拷贝',Object.assign({a:1},{b:2}))<span class="hljs-comment">;  //浅拷贝</span>

    let test = {a:2,b:3}
    for(<span class="hljs-name"><span class="hljs-builtin-name">let</span></span> [key,value] of Object.entries(<span class="hljs-name">test</span>)){   // 遍历
        console.log([key,value])<span class="hljs-comment">; </span>
        //[a:2]
        //[b:3]
    }
}</code></pre>
<h1 id="articleHeader51">九 Symbol</h1>
<h2 id="articleHeader52">1.Symbol简单举例</h2>
<p>ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    let a1 = Symbol();
    let a2 = Symbol();
    console.log(a1===a2)   // false

    let a3 = Symbol.for('a3');
    let a4 = Symbol.for('a3');

    console.log(a3===a4);  //true
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{
    <span class="hljs-keyword">let</span> a1 = <span class="hljs-built_in">Symbol</span>();
    <span class="hljs-keyword">let</span> a2 = <span class="hljs-built_in">Symbol</span>();
    <span class="hljs-built_in">console</span>.log(a1===a2)   <span class="hljs-comment">// false</span>

    <span class="hljs-keyword">let</span> a3 = <span class="hljs-built_in">Symbol</span>.for(<span class="hljs-string">'a3'</span>);
    <span class="hljs-keyword">let</span> a4 = <span class="hljs-built_in">Symbol</span>.for(<span class="hljs-string">'a3'</span>);

    <span class="hljs-built_in">console</span>.log(a3===a4);  <span class="hljs-comment">//true</span>
}</code></pre>
<h2 id="articleHeader53">2.Symbol的一些API</h2>
<p>Symbol.for可以用来命名具有相同的key值的对象。<br>Object.getOwnPropertySymbols方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。<br>Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    let a1 = Symbol.for('abc');
    let obj = {
        [a1]:123,
        abc:234,
        c:345
    }
    console.log(obj); 
    // abc:234
    // c:345
    // Symbol(abc):123

    Object.getOwnPropertySymbols(obj).forEach(function(item){
        console.log('symbol',item,obj[item]); //symbol Symbol(abc) 123
    })
    Reflect.ownKeys(obj).forEach(function(item){
        console.log(item,obj[item]); 
        //abc 234
        //c 345
        //Symbol(abc) 123
    })

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
    let a1 = Symbol.for(<span class="hljs-name">'abc'</span>)<span class="hljs-comment">;</span>
    let obj = {
        [a1]:<span class="hljs-number">123</span>,
        abc:234,
        c:345
    }
    console.log(<span class="hljs-name">obj</span>)<span class="hljs-comment">; </span>
    // abc:234
    // c:345
    // Symbol(<span class="hljs-name">abc</span>):<span class="hljs-number">123</span>

    Object.getOwnPropertySymbols(<span class="hljs-name">obj</span>).forEach(<span class="hljs-name">function</span>(<span class="hljs-name">item</span>){
        console.log(<span class="hljs-name">'symbol'</span>,item,obj[item])<span class="hljs-comment">; //symbol Symbol(abc) 123</span>
    })
    Reflect.ownKeys(<span class="hljs-name">obj</span>).forEach(<span class="hljs-name">function</span>(<span class="hljs-name">item</span>){
        console.log(<span class="hljs-name">item</span>,obj[item])<span class="hljs-comment">; </span>
        //abc <span class="hljs-number">234</span>
        //c <span class="hljs-number">345</span>
        //Symbol(<span class="hljs-name">abc</span>) <span class="hljs-number">123</span>
    })

}</code></pre>
<h1 id="articleHeader54">十 Map和Set数据结构</h1>
<h2 id="articleHeader55">1.set的基本用法</h2>
<p>ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。Set 本身是一个构造函数，用来生成 Set 数据结构。 Set 结构不会添加重复的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    let list = new Set();
    list.add(2);
    list.add(3);
    console.log(list.size);  //2

    let arr = [1,2,3,4,5];
    let list2 = new Set(arr);
    console.log(list2.size); //5

    console.log(list2) //{1, 2, 3, 4, 5}

    let arr2 = [1,2,3,4,2,1];   //这里可以当作数组去重
    let list3 = new Set(arr2);
    console.log(list3) //{1, 2, 3, 4}

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>{
    <span class="hljs-keyword">let</span> <span class="hljs-built_in">list</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>();
    <span class="hljs-built_in">list</span>.add(<span class="hljs-number">2</span>);
    <span class="hljs-built_in">list</span>.add(<span class="hljs-number">3</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">list</span>.size);  <span class="hljs-comment">//2</span>

    <span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
    <span class="hljs-keyword">let</span> list2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(arr);
    <span class="hljs-built_in">console</span>.log(list2.size); <span class="hljs-comment">//5</span>

    <span class="hljs-built_in">console</span>.log(list2) <span class="hljs-comment">//{1, 2, 3, 4, 5}</span>

    <span class="hljs-keyword">let</span> arr2 = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>];   <span class="hljs-comment">//这里可以当作数组去重</span>
    <span class="hljs-keyword">let</span> list3 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(arr2);
    <span class="hljs-built_in">console</span>.log(list3) <span class="hljs-comment">//{1, 2, 3, 4}</span>

}</code></pre>
<p>add(value)：添加某个值，返回Set结构本身。<br>delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。<br>has(value)：返回一个布尔值，表示该值是否为Set的成员。<br>clear()：清除所有成员，没有返回值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    let arr = ['add','delete','clear','has'];
    let list = new Set(arr);
    console.log(list); // {&quot;add&quot;, &quot;delete&quot;, &quot;clear&quot;, &quot;has&quot;}

    list.delete('add');
    console.log(list); // {&quot;delete&quot;, &quot;clear&quot;, &quot;has&quot;}

    console.log(list.has('clear')); // true

    list.clear();  
    console.log(list); //{}
    //set遍历方法
    {
        let arr = ['add','delete','clear','has'];
        let list = new Set(arr);

        for(let key of list.keys()){
            console.log('keys',key)
            //keys add
            //keys delete
            //keys clear
            //keys has
        }
        for(let value of list.values()){
            console.log('values',value)
            //values add
            //values delete
            //values clear
            //values has
        }
        for(let [key,value] of list.entries()){
            console.log(key,value);
            //add add
            //delete delete
            //clear clear
            //has has
        }
        list.forEach(function(item){console.log(item)})
           // add
           // delete
           // clear
           // has
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>{
    <span class="hljs-keyword">let</span> arr = [<span class="hljs-string">'add'</span>,<span class="hljs-string">'delete'</span>,<span class="hljs-string">'clear'</span>,<span class="hljs-string">'has'</span>];
    <span class="hljs-keyword">let</span> <span class="hljs-built_in">list</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(arr);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">list</span>); <span class="hljs-comment">// {"add", "delete", "clear", "has"}</span>

    <span class="hljs-built_in">list</span>.delete(<span class="hljs-string">'add'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">list</span>); <span class="hljs-comment">// {"delete", "clear", "has"}</span>

    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">list</span>.has(<span class="hljs-string">'clear'</span>)); <span class="hljs-comment">// true</span>

    <span class="hljs-built_in">list</span>.clear();  
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">list</span>); <span class="hljs-comment">//{}</span>
    <span class="hljs-comment">//set遍历方法</span>
    {
        <span class="hljs-keyword">let</span> arr = [<span class="hljs-string">'add'</span>,<span class="hljs-string">'delete'</span>,<span class="hljs-string">'clear'</span>,<span class="hljs-string">'has'</span>];
        <span class="hljs-keyword">let</span> <span class="hljs-built_in">list</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(arr);

        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> key <span class="hljs-keyword">of</span> <span class="hljs-built_in">list</span>.keys()){
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'keys'</span>,key)
            <span class="hljs-comment">//keys add</span>
            <span class="hljs-comment">//keys delete</span>
            <span class="hljs-comment">//keys clear</span>
            <span class="hljs-comment">//keys has</span>
        }
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> value <span class="hljs-keyword">of</span> <span class="hljs-built_in">list</span>.values()){
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'values'</span>,value)
            <span class="hljs-comment">//values add</span>
            <span class="hljs-comment">//values delete</span>
            <span class="hljs-comment">//values clear</span>
            <span class="hljs-comment">//values has</span>
        }
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> [key,value] <span class="hljs-keyword">of</span> <span class="hljs-built_in">list</span>.entries()){
            <span class="hljs-built_in">console</span>.log(key,value);
            <span class="hljs-comment">//add add</span>
            <span class="hljs-comment">//delete delete</span>
            <span class="hljs-comment">//clear clear</span>
            <span class="hljs-comment">//has has</span>
        }
        <span class="hljs-built_in">list</span>.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>)</span>{<span class="hljs-built_in">console</span>.log(item)})
           <span class="hljs-comment">// add</span>
           <span class="hljs-comment">// delete</span>
           <span class="hljs-comment">// clear</span>
           <span class="hljs-comment">// has</span>
    }
}
</code></pre>
<h2 id="articleHeader56">2.WeakSet基本用法</h2>
<p>WeakSet结构与Set类似，也是不重复的值的集合。但是，它与 Set有两个区别。首先，WeakSet 的成员只能是对象，而不能是其他类型的值。<br>WeakSet中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。<br>WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。<br>WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。<br>WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    const ws = new WeakSet();
    ws.add(1)
    // TypeError: Invalid value used in weak set
    ws.add(Symbol())
    // TypeError: invalid value used in weak set

    let weakset = new WeakSet()  // 没有clear，set方法，不能遍历
    let obj = {}   
    weakset.add(obj)
    // weekset.add(2)  WeakSet必须添加的是对象，弱引用   
    console.log(weakset);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
    const ws = new WeakSet()<span class="hljs-comment">;</span>
    ws.add(<span class="hljs-number">1</span>)
    // TypeError: Invalid value used in weak set
    ws.add(<span class="hljs-name">Symbol</span>())
    // TypeError: invalid value used in weak set

    let weakset = new WeakSet()  // 没有clear，set方法，不能遍历
    let obj = {}   
    weakset.add(<span class="hljs-name">obj</span>)
    // weekset.add(<span class="hljs-number">2</span>)  WeakSet必须添加的是对象，弱引用   
    console.log(<span class="hljs-name">weakset</span>)<span class="hljs-comment">;</span>
}</code></pre>
<h2 id="articleHeader57">3.Map的基本用法</h2>
<p>ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object结构提供了“字符串—值”的对应，Map结构提供了“值—值”的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    const map = new Map([
      ['name', '张三'],
      ['title', 'Author']
    ]);

    map.size // 2
    map.has('name') // true
    map.get('name') // &quot;张三&quot;
    map.has('title') // true
    map.get('title') // &quot;Author&quot;
}
{
    let map = new Map();
    let arr = ['123'];
    map.set(arr,'456');
    console.log(map,map.get(arr)) // {[&quot;123&quot;] => &quot;456&quot;} &quot;456&quot;
}

{
    let map = new Map([['a',123],['b',456]])
    console.log(map);                      //{&quot;a&quot; => 123, &quot;b&quot; => 456}
    console.log(map.size);              //2
    console.log('123'+map.delete('a')); //true
    console.log(map)                      // {&quot;b&quot; => 456}
    map.clear()
    console.log(map);                    //{}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>{
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">map</span> = <span class="hljs-keyword">new</span> Map([
      [<span class="hljs-string">'name'</span>, <span class="hljs-string">'张三'</span>],
      [<span class="hljs-string">'title'</span>, <span class="hljs-string">'Author'</span>]
    ]);

    <span class="hljs-built_in">map</span>.<span class="hljs-built_in">size</span> <span class="hljs-comment">// 2</span>
    <span class="hljs-built_in">map</span>.has(<span class="hljs-string">'name'</span>) <span class="hljs-comment">// true</span>
    <span class="hljs-built_in">map</span>.<span class="hljs-built_in">get</span>(<span class="hljs-string">'name'</span>) <span class="hljs-comment">// "张三"</span>
    <span class="hljs-built_in">map</span>.has(<span class="hljs-string">'title'</span>) <span class="hljs-comment">// true</span>
    <span class="hljs-built_in">map</span>.<span class="hljs-built_in">get</span>(<span class="hljs-string">'title'</span>) <span class="hljs-comment">// "Author"</span>
}
{
    let <span class="hljs-built_in">map</span> = <span class="hljs-keyword">new</span> Map();
    let arr = [<span class="hljs-string">'123'</span>];
    <span class="hljs-built_in">map</span>.<span class="hljs-built_in">set</span>(arr,<span class="hljs-string">'456'</span>);
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">map</span>,<span class="hljs-built_in">map</span>.<span class="hljs-built_in">get</span>(arr)) <span class="hljs-comment">// {["123"] =&gt; "456"} "456"</span>
}

{
    let <span class="hljs-built_in">map</span> = <span class="hljs-keyword">new</span> Map([[<span class="hljs-string">'a'</span>,<span class="hljs-number">123</span>],[<span class="hljs-string">'b'</span>,<span class="hljs-number">456</span>]])
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">map</span>);                      <span class="hljs-comment">//{"a" =&gt; 123, "b" =&gt; 456}</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">map</span>.<span class="hljs-built_in">size</span>);              <span class="hljs-comment">//2</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'123'</span>+<span class="hljs-built_in">map</span>.delete(<span class="hljs-string">'a'</span>)); <span class="hljs-comment">//true</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">map</span>)                      <span class="hljs-comment">// {"b" =&gt; 456}</span>
    <span class="hljs-built_in">map</span>.<span class="hljs-built_in">clear</span>()
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">map</span>);                    <span class="hljs-comment">//{}</span>
}</code></pre>
<h2 id="articleHeader58">4.WeakMap的一些API</h2>
<p>WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。<br>WeakMap的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。<br><strong>WeakMap 与 Map 在 API 上的区别主要是两个，一是没有遍历操作（即没有key()、values()和entries()方法），也没有size属性。因为没有办法列出所有键名，某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。二是无法清空，即不支持clear方法。因此，WeakMap只有四个方法可用：get()、set()、has()、delete()。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    let weakmap = new WeakMap() //没有clear，set方法，不能遍历
    let o = {}
    weakmap.set(o,123);
    console.log(weakmap.get(o));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
    let weakmap = new WeakMap() //没有clear，set方法，不能遍历
    let o = {}
    weakmap.set(<span class="hljs-name">o</span>,<span class="hljs-number">123</span>)<span class="hljs-comment">;</span>
    console.log(<span class="hljs-name">weakmap.get</span>(<span class="hljs-name">o</span>))<span class="hljs-comment">;</span>
}</code></pre>
<h1 id="articleHeader59">十一 proxy和reflect</h1>
<h2 id="articleHeader60">1.Proxy</h2>
<p>Proxy用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let obj = {
    name:'gao',
    time:'2017-08-13',
    emp:'123',
  }
  let temp = new Proxy(obj,{
    get(target,key){
          return target[key].replace('2017','2018');
    },
    set(target,key,value){
      if(key === 'name'){
        return target[key] = value;
      }else{
        return target[key];
      }
    },
    has(target,key){
      if(key === 'name'){
        return target[key];
      }else{
        return false;
      }
    },
    deleteProperty(target,key){
      if(key.indexOf('i') > -1){
        delete target[key];
        return true;
      }else{
        return target[key];
      }
    },
    ownKeys(target){
      return Object.keys(target).filter(item=>item!='name');
    }
  })

  console.log('get',temp.time);  //get 2018-08-13

  temp.time = '2018';
  console.log('set',temp.name,temp); //set gao   {name: &quot;gao&quot;, time: &quot;2017-08-13&quot;, temp: &quot;123&quot;}

  temp.name = 'he';
  console.log('set',temp.name,temp); // set he  {name: &quot;he&quot;, time: &quot;2017-08-13&quot;, temp: &quot;123&quot;}

  console.log('has','name' in temp,'time' in temp);  //has true false

  delete temp.time;
  console.log('delete',temp);   //delete  {name: &quot;he&quot;, temp: &quot;123&quot;}

  console.log('ownkeys',Object.keys(temp));  //[&quot;emp&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>{
  let obj = {
    name:<span class="hljs-string">'gao'</span>,
    time:<span class="hljs-string">'2017-08-13'</span>,
    emp:<span class="hljs-string">'123'</span>,
  }
  let temp = <span class="hljs-keyword">new</span> Proxy(obj,{
    <span class="hljs-built_in">get</span>(target,<span class="hljs-built_in">key</span>){
          <span class="hljs-keyword">return</span> target[<span class="hljs-built_in">key</span>].replace(<span class="hljs-string">'2017'</span>,<span class="hljs-string">'2018'</span>);
    },
    <span class="hljs-built_in">set</span>(target,<span class="hljs-built_in">key</span>,value){
      <span class="hljs-keyword">if</span>(<span class="hljs-built_in">key</span> === <span class="hljs-string">'name'</span>){
        <span class="hljs-keyword">return</span> target[<span class="hljs-built_in">key</span>] = value;
      }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">return</span> target[<span class="hljs-built_in">key</span>];
      }
    },
    has(target,<span class="hljs-built_in">key</span>){
      <span class="hljs-keyword">if</span>(<span class="hljs-built_in">key</span> === <span class="hljs-string">'name'</span>){
        <span class="hljs-keyword">return</span> target[<span class="hljs-built_in">key</span>];
      }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>;
      }
    },
    deleteProperty(target,<span class="hljs-built_in">key</span>){
      <span class="hljs-keyword">if</span>(<span class="hljs-built_in">key</span>.indexOf(<span class="hljs-string">'i'</span>) &gt; <span class="hljs-number">-1</span>){
        delete target[<span class="hljs-built_in">key</span>];
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>;
      }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">return</span> target[<span class="hljs-built_in">key</span>];
      }
    },
    ownKeys(target){
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">Object</span>.keys(target).<span class="hljs-built_in">filter</span>(item=&gt;item!=<span class="hljs-string">'name'</span>);
    }
  })

  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'get'</span>,temp.time);  <span class="hljs-comment">//get 2018-08-13</span>

  temp.time = <span class="hljs-string">'2018'</span>;
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'set'</span>,temp.name,temp); <span class="hljs-comment">//set gao   {name: "gao", time: "2017-08-13", temp: "123"}</span>

  temp.name = <span class="hljs-string">'he'</span>;
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'set'</span>,temp.name,temp); <span class="hljs-comment">// set he  {name: "he", time: "2017-08-13", temp: "123"}</span>

  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'has'</span>,<span class="hljs-string">'name'</span> in temp,<span class="hljs-string">'time'</span> in temp);  <span class="hljs-comment">//has true false</span>

  delete temp.time;
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'delete'</span>,temp);   <span class="hljs-comment">//delete  {name: "he", temp: "123"}</span>

  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'ownkeys'</span>,<span class="hljs-keyword">Object</span>.keys(temp));  <span class="hljs-comment">//["emp"]</span>
}</code></pre>
<h2 id="articleHeader61">2.Reflect</h2>
<p>Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。Reflect对象的设计目的有这样几个。<br>（1） 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。也就是说，从Reflect对象上可以拿到语言内部的方法。<br>（2） 修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。<br>（3） 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。<br>（4）Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let obj = {
    name:'gao',
    time:'2017-08-13',
    emp:'123',
  }
  console.log('reflect get',Reflect.get(obj, 'name'));  // reflect get gao
  Reflect.set(obj,'name','hexaiofei');
  console.log(obj);  // {name: &quot;hexaiofei&quot;, time: &quot;2017-08-13&quot;, emp: &quot;123&quot;}
  console.log('reflect has', Reflect.has(obj,'name'));  //reflect has true
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{
  <span class="hljs-keyword">let</span> obj = {
    <span class="hljs-attr">name</span>:<span class="hljs-string">'gao'</span>,
    <span class="hljs-attr">time</span>:<span class="hljs-string">'2017-08-13'</span>,
    <span class="hljs-attr">emp</span>:<span class="hljs-string">'123'</span>,
  }
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'reflect get'</span>,<span class="hljs-built_in">Reflect</span>.get(obj, <span class="hljs-string">'name'</span>));  <span class="hljs-comment">// reflect get gao</span>
  <span class="hljs-built_in">Reflect</span>.set(obj,<span class="hljs-string">'name'</span>,<span class="hljs-string">'hexaiofei'</span>);
  <span class="hljs-built_in">console</span>.log(obj);  <span class="hljs-comment">// {name: "hexaiofei", time: "2017-08-13", emp: "123"}</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'reflect has'</span>, <span class="hljs-built_in">Reflect</span>.has(obj,<span class="hljs-string">'name'</span>));  <span class="hljs-comment">//reflect has true</span>
}</code></pre>
<h2 id="articleHeader62">3.简单应用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  function validator(target,validator) {
    return new Proxy(target,{
      _validator:validator,
      set(target,key,value,proxy){
        if(target.hasOwnProperty(key)){
          let va = this._validator[key];
          if(!!va(value)){
            return Reflect.set(target,key,value,proxy);
          }else{
            throw Error(`不能设置${key}到${value}`);
          }
        }else{
          throw Error(`${key}不存在`);
        }
      }
    })
  }

  const personValidators={
    name(value){
      return typeof value === 'string'
    },
    age(value){
      return typeof value === 'number' &amp;&amp; value > 18;
    }
  }

  class Person{
    constructor(name,age) {
      this.name = name;
      this.age = age;
      return validator(this,personValidators)
    }
  }

  const person = new Person('lilei',30);
  console.log(person);

  person.name = 48;

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  function validator(<span class="hljs-name">target</span>,validator) {
    return new Proxy(<span class="hljs-name">target</span>,{
      _validator:validator,
      set(<span class="hljs-name">target</span>,key,value,proxy){
        if(<span class="hljs-name">target.hasOwnProperty</span>(<span class="hljs-name"><span class="hljs-builtin-name">key</span></span>)){
          let va = this._validator[key]<span class="hljs-comment">;</span>
          if(<span class="hljs-name">!!va</span>(<span class="hljs-name">value</span>)){
            return Reflect.set(<span class="hljs-name">target</span>,key,value,proxy)<span class="hljs-comment">;</span>
          }else{
            throw Error(`不能设置${key}到${value}`)<span class="hljs-comment">;</span>
          }
        }else{
          throw Error(`${key}不存在`)<span class="hljs-comment">;</span>
        }
      }
    })
  }

  const personValidators={
    name(<span class="hljs-name">value</span>){
      return typeof value === 'string'
    },
    age(<span class="hljs-name">value</span>){
      return typeof value === 'number' &amp;&amp; value &gt; <span class="hljs-number">18</span><span class="hljs-comment">;</span>
    }
  }

  class Person{
    constructor(<span class="hljs-name"><span class="hljs-builtin-name">name</span></span>,age) {
      this.name = name;
      this.age = age;
      return validator(<span class="hljs-name">this</span>,personValidators)
    }
  }

  const person = new Person(<span class="hljs-name">'lilei'</span>,<span class="hljs-number">30</span>)<span class="hljs-comment">;</span>
  console.log(<span class="hljs-name">person</span>)<span class="hljs-comment">;</span>

  person.name = <span class="hljs-number">48</span><span class="hljs-comment">;</span>

}</code></pre>
<h1 id="articleHeader63">十二 Class的基本语法</h1>
<h2 id="articleHeader64">1.简介</h2>
<p>ES6 提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。基本上，ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  class Parent {
    constructor(name='gao') {
      this.name = name;
    } 
  }

  let v_parent = new Parent();
  console.log(v_parent);  //{name: &quot;gao&quot;}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Parent</span> </span>{
    <span class="hljs-keyword">constructor</span>(name='gao') {
      <span class="hljs-keyword">this</span>.name = name;
    } 
  }

  <span class="hljs-keyword">let</span> v_parent = <span class="hljs-keyword">new</span> Parent();
  <span class="hljs-built_in">console</span>.log(v_parent);  <span class="hljs-comment">//{name: "gao"}</span>
}</code></pre>
<h2 id="articleHeader65">2.继承</h2>
<p>Class可以通过extends关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  class Parent {
    constructor(name='gao') {
      this.name = name;
    } 
  }

  class child extends Parent {

  }
  let v_child = new child();
  console.log(v_child);  //{name: &quot;gao&quot;}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>{
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Parent</span> </span>{
    constructor(name=<span class="hljs-symbol">'ga</span>o') {
      <span class="hljs-keyword">this</span>.name = name;
    } 
  }

  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">child</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Parent</span> </span>{

  }
  let v_child = <span class="hljs-keyword">new</span> child();
  console.log(v_child);  <span class="hljs-comment">//{name: "gao"}</span>
}</code></pre>
<h2 id="articleHeader66">3.constructor</h2>
<p>constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。</p>
<h2 id="articleHeader67">4.super关键字</h2>
<p>super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。第一种情况，super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。super()在子类constructor构造方法中是为了获取this上下文环境,所以如果在constructor中使用到this,必须在使用this之前调用super(),反之不在constructor中使用this则不必调用super()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  class Parent {
    constructor(name='gao') {
      this.name = name;
    } 
  }
  class child extends Parent {
    constructor(name='child'){
      super(name);
      this.type = 'child'
    }
    
  }
  let v_child = new child();
  console.log(v_child);  //{name: &quot;child&quot;, type: &quot;child&quot;}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>{
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Parent</span> </span>{
    constructor(name=<span class="hljs-symbol">'ga</span>o') {
      <span class="hljs-keyword">this</span>.name = name;
    } 
  }
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">child</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Parent</span> </span>{
    constructor(name=<span class="hljs-symbol">'chil</span>d'){
      <span class="hljs-keyword">super</span>(name);
      <span class="hljs-keyword">this</span>.<span class="hljs-keyword">type</span> = <span class="hljs-symbol">'chil</span>d'
    }
    
  }
  let v_child = <span class="hljs-keyword">new</span> child();
  console.log(v_child);  <span class="hljs-comment">//{name: "child", type: "child"}</span>
}</code></pre>
<h2 id="articleHeader68">5.getter和setter</h2>
<p>与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  class Parent {
    constructor(name='gao') {
      this.name = name;
    } 
    get longName(){
      return 'mk' + this.name;
    }
    set longName(value){
      // console.log(value);
      this.name = value;
    }
  }

  
  let v_parent = new Parent();
  console.log('get',v_parent.longName);  //get mkgao

  v_parent.longName = 'hello';
  console.log('get',v_parent.longName);  //get mkhello
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>{
  <span class="hljs-keyword">class</span> <span class="hljs-title">Parent</span> {
    constructor(name=<span class="hljs-string">'gao'</span>) {
      <span class="hljs-keyword">this</span>.name = name;
    } 
    <span class="hljs-function"><span class="hljs-keyword">get</span> <span class="hljs-title">longName</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">return</span> <span class="hljs-string">'mk'</span> + <span class="hljs-keyword">this</span>.name;
    }
    <span class="hljs-function"><span class="hljs-keyword">set</span> <span class="hljs-title">longName</span>(<span class="hljs-params"><span class="hljs-keyword">value</span></span>)</span>{
      <span class="hljs-comment">// console.log(value);</span>
      <span class="hljs-keyword">this</span>.name = <span class="hljs-keyword">value</span>;
    }
  }

  
  <span class="hljs-keyword">let</span> v_parent = <span class="hljs-keyword">new</span> Parent();
  console.log(<span class="hljs-string">'get'</span>,v_parent.longName);  <span class="hljs-comment">//get mkgao</span>

  v_parent.longName = <span class="hljs-string">'hello'</span>;
  console.log(<span class="hljs-string">'get'</span>,v_parent.longName);  <span class="hljs-comment">//get mkhello</span>
}</code></pre>
<h2 id="articleHeader69">6.静态方法</h2>
<p>类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  class Parent {
    constructor(name='gao') {
      this.name = name;
    } 
    static tell(){
      console.log('tell');
    }
  }

  let v_parent = new Parent();
  console.log(v_parent);  //{name: &quot;gao&quot;}
  Parent.tell(); // tell
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  class Parent {
    constructor(<span class="hljs-name">name='gao'</span>) {
      this.name = name;
    } 
    static tell(){
      console.log(<span class="hljs-name">'tell'</span>)<span class="hljs-comment">;</span>
    }
  }

  let v_parent = new Parent()<span class="hljs-comment">;</span>
  console.log(<span class="hljs-name">v_parent</span>)<span class="hljs-comment">;  //{name: "gao"}</span>
  Parent.tell()<span class="hljs-comment">; // tell</span>
}</code></pre>
<h2 id="articleHeader70">7.静态属性</h2>
<p>静态属性指的是Class本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  class Parent {
    constructor(name='gao') {
      this.name = name;
    } 
    
  }
  Parent.tell = 'nihao';

  let v_parent = new Parent();
  console.log(v_parent);  //{name: &quot;gao&quot;}
  console.log(Parent.tell);   // nihao
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Parent</span> </span>{
    <span class="hljs-keyword">constructor</span>(name='gao') {
      <span class="hljs-keyword">this</span>.name = name;
    } 
    
  }
  Parent.tell = <span class="hljs-string">'nihao'</span>;

  <span class="hljs-keyword">let</span> v_parent = <span class="hljs-keyword">new</span> Parent();
  <span class="hljs-built_in">console</span>.log(v_parent);  <span class="hljs-comment">//{name: "gao"}</span>
  <span class="hljs-built_in">console</span>.log(Parent.tell);   <span class="hljs-comment">// nihao</span>
}</code></pre>
<h1 id="articleHeader71">十三 Promise</h1>
<p>Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。<br>Promise对象有以下两个特点。<br>（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Fulfilled（已成功）和Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。<br>（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从Pending变为Fulfiled和从Pending变为Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 Resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。</p>
<p>注意，为了行文方便，本章后面的Resolved统一只指Fulfilled状态，不包含Rejected状态。</p>
<p>有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。</p>
<p>Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。</p>
<p>如果某些事件不断地反复发生，一般来说，使用 Stream 模式是比部署Promise更好的选择。</p>
<h2 id="articleHeader72">1.基本用法</h2>
<p>Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。</p>
<p>resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 Pending 变为 Resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 Pending 变为 Rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。</p>
<p>Promise实例生成以后，可以用then方法分别指定Resolved状态和Rejected状态的回调函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES5的回调函数
{
  let ajax = function(callback){
    console.log('nihao');
    setTimeout(function(){
      callback &amp;&amp; callback.call()
    },1000)
  }
  ajax(function(){
    console.log('timeout1');
  })
}
// es6 Promise的用法
{
  let ajax = function(){
    console.log('wohao');
    return new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve();
      },1000);
    });
  }
  ajax().then(function(){
    console.log('promise','timeout1');
  })
}

promise.then(function(value) {   // promise的用法
  // success
}, function(error) {
  // failure
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ES5的回调函数</span>
{
  <span class="hljs-keyword">let</span> ajax = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'nihao'</span>);
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      callback &amp;&amp; callback.call()
    },<span class="hljs-number">1000</span>)
  }
  ajax(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timeout1'</span>);
  })
}
<span class="hljs-comment">// es6 Promise的用法</span>
{
  <span class="hljs-keyword">let</span> ajax = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'wohao'</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        resolve();
      },<span class="hljs-number">1000</span>);
    });
  }
  ajax().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise'</span>,<span class="hljs-string">'timeout1'</span>);
  })
}

promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{   <span class="hljs-comment">// promise的用法</span>
  <span class="hljs-comment">// success</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
  <span class="hljs-comment">// failure</span>
});</code></pre>
<h2 id="articleHeader73">2.Promise.prototype.then()</h2>
<p>Promise实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，then方法的第一个参数是Resolved状态的回调函数，第二个参数（可选）是Rejected状态的回调函数。<br>then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let ajax = function(){
    console.log('dajiahao');
    return new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve();
      },1000);
    });
  };
  ajax().then(function(){
    return new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve();
      },2000)
    });
  })
  .then(function(){
    console.log('timeout3');
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  let ajax = function(){
    console.log(<span class="hljs-name">'dajiahao'</span>)<span class="hljs-comment">;</span>
    return new Promise((<span class="hljs-name"><span class="hljs-builtin-name">resolve</span></span>, reject) =&gt; {
      setTimeout(<span class="hljs-name">function</span>(){
        resolve()<span class="hljs-comment">;</span>
      },<span class="hljs-number">1000</span>)<span class="hljs-comment">;</span>
    })<span class="hljs-comment">;</span>
  }<span class="hljs-comment">;</span>
  ajax().then(<span class="hljs-name">function</span>(){
    return new Promise((<span class="hljs-name"><span class="hljs-builtin-name">resolve</span></span>, reject) =&gt; {
      setTimeout(<span class="hljs-name">function</span>(){
        resolve()<span class="hljs-comment">;</span>
      },<span class="hljs-number">2000</span>)
    })<span class="hljs-comment">;</span>
  })
  .then(<span class="hljs-name">function</span>(){
    console.log(<span class="hljs-name">'timeout3'</span>)<span class="hljs-comment">;</span>
  })
}</code></pre>
<h2 id="articleHeader74">3.Promise.prototype.catch()</h2>
<p>Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let ajax = function(num){
    console.log('dajiahao');
    return new Promise((resolve, reject) => {
      if(num>6){
        console.log('6');
      }else{
        throw new Error('出错了');
      }
    });
  };

  ajax(3).then(function(){
    console.log('3');
  })
  .catch(error=>{
    console.log(error)   //出错了
  })


}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  let ajax = function(<span class="hljs-name"><span class="hljs-builtin-name">num</span></span>){
    console.log(<span class="hljs-name">'dajiahao'</span>)<span class="hljs-comment">;</span>
    return new Promise((<span class="hljs-name"><span class="hljs-builtin-name">resolve</span></span>, reject) =&gt; {
      if(<span class="hljs-name">num&gt;6</span>){
        console.log(<span class="hljs-name">'6'</span>)<span class="hljs-comment">;</span>
      }else{
        throw new Error(<span class="hljs-name">'</span>出错了')<span class="hljs-comment">;</span>
      }
    })<span class="hljs-comment">;</span>
  }<span class="hljs-comment">;</span>

  ajax(<span class="hljs-number">3</span>).then(<span class="hljs-name">function</span>(){
    console.log(<span class="hljs-name">'3'</span>)<span class="hljs-comment">;</span>
  })
  .catch(<span class="hljs-name">error=&gt;</span>{
    console.log(<span class="hljs-name">error</span>)   //出错了
  })


}</code></pre>
<h2 id="articleHeader75">4.Promise.all</h2>
<p>Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = Promise.all([p1, p2, p3]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">var</span> p = Promise.all([<span class="hljs-built_in">p1</span>, <span class="hljs-built_in">p2</span>, <span class="hljs-built_in">p3</span>])<span class="hljs-comment">;</span></code></pre>
<p>上面代码中，Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。（Promise.all方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。）</p>
<p>p的状态由p1、p2、p3决定，分成两种情况。</p>
<p>（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。</p>
<p>（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  function loadImg(src){
    return new Promise((resolve, reject) => {
      let img = document.createElement('img');
      img.src=src;
      img.onload = function(){
        resolve(img);
      }
      img.onerror = function(error){
        reject(error);  
      }
    });
  }
  function showImgs(imgs){
    imgs.forEach(function(img){
      document.body.appendChild(img);
    })
  }
  Promise.all([
    loadImg(''),
    loadImg(''),
    loadImg(''),
  ]).then(showImgs)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  function loadImg(<span class="hljs-name">src</span>){
    return new Promise((<span class="hljs-name"><span class="hljs-builtin-name">resolve</span></span>, reject) =&gt; {
      let img = document.createElement(<span class="hljs-name">'img'</span>)<span class="hljs-comment">;</span>
      img.src=src;
      img.onload = function(){
        resolve(<span class="hljs-name">img</span>)<span class="hljs-comment">;</span>
      }
      img.onerror = function(<span class="hljs-name">error</span>){
        reject(<span class="hljs-name">error</span>)<span class="hljs-comment">;  </span>
      }
    })<span class="hljs-comment">;</span>
  }
  function showImgs(<span class="hljs-name">imgs</span>){
    imgs.forEach(<span class="hljs-name">function</span>(<span class="hljs-name">img</span>){
      document.body.appendChild(<span class="hljs-name">img</span>)<span class="hljs-comment">;</span>
    })
  }
  Promise.all([
    loadImg(<span class="hljs-name">''</span>),
    loadImg(<span class="hljs-name">''</span>),
    loadImg(<span class="hljs-name">''</span>),
  ]).then(<span class="hljs-name">showImgs</span>)
}</code></pre>
<h2 id="articleHeader76">4.Promise.race</h2>
<p>Promise.race方法同样是将多个Promise实例，包装成一个新的Promise实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = Promise.race([p1, p2, p3]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">var</span> p = Promise.race([<span class="hljs-built_in">p1</span>, <span class="hljs-built_in">p2</span>, <span class="hljs-built_in">p3</span>])<span class="hljs-comment">;</span></code></pre>
<p>上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。<br>Promise.race方法的参数与Promise.all方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。<br>下面是一个例子，如果指定时间内没有获得结果，就将Promise的状态变为reject，否则变为resolve。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  function loadImg(src){
    return new Promise((resolve, reject) => {
      let img = document.createElement('img');
      img.src=src;
      img.onload = function(){
        resolve(img);
      }
      img.onerror = function(error){
        reject(error);  
      }
    });
  }
  function showImg(img){
    let img = document.createElement('p');
    p.appendChild(img);
    document.body.appendChild(p);
  }

  Promise.race([
    loadImg(''),
    loadImg(''),
    loadImg(''),
  ]).then(showImgs)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  function loadImg(<span class="hljs-name">src</span>){
    return new Promise((<span class="hljs-name"><span class="hljs-builtin-name">resolve</span></span>, reject) =&gt; {
      let img = document.createElement(<span class="hljs-name">'img'</span>)<span class="hljs-comment">;</span>
      img.src=src;
      img.onload = function(){
        resolve(<span class="hljs-name">img</span>)<span class="hljs-comment">;</span>
      }
      img.onerror = function(<span class="hljs-name">error</span>){
        reject(<span class="hljs-name">error</span>)<span class="hljs-comment">;  </span>
      }
    })<span class="hljs-comment">;</span>
  }
  function showImg(<span class="hljs-name">img</span>){
    let img = document.createElement(<span class="hljs-name">'p'</span>)<span class="hljs-comment">;</span>
    p.appendChild(<span class="hljs-name">img</span>)<span class="hljs-comment">;</span>
    document.body.appendChild(<span class="hljs-name">p</span>)<span class="hljs-comment">;</span>
  }

  Promise.race([
    loadImg(<span class="hljs-name">''</span>),
    loadImg(<span class="hljs-name">''</span>),
    loadImg(<span class="hljs-name">''</span>),
  ]).then(<span class="hljs-name">showImgs</span>)
}</code></pre>
<h1 id="articleHeader77">十四 Iterator 和 for...of 循环</h1>
<p>Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环。当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是”可遍历的“（iterable）。<br>ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。至于属性名Symbol.iterator，它是一个表达式，返回Symbol对象的iterator属性，这是一个预定义好的、类型为 Symbol的特殊值，所以要放在方括号内。</p>
<h2 id="articleHeader78">1.数组的Symbol.iterator属性</h2>
<p>变量arr是一个数组，原生就具有遍历器接口，部署在arr的Symbol.iterator属性上面。所以，调用这个属性，就得到遍历器对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let arr = ['hellow','world'];
  let map = arr[Symbol.iterator]();
  console.log(map.next());  //{value: &quot;hellow&quot;, done: false}
  console.log(map.next());  //{value: &quot;world&quot;, done: false}
  console.log(map.next());  //{value: &quot;undefined&quot;, done: false}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>{
  <span class="hljs-built_in">let</span> arr = ['hellow','world'];
  <span class="hljs-built_in">let</span> <span class="hljs-built_in">map</span> = arr[Symbol.iterator]();
  console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">map</span>.next());  //{value: <span class="hljs-string">"hellow"</span>, done: <span class="hljs-literal">false</span>}
  console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">map</span>.next());  //{value: <span class="hljs-string">"world"</span>, done: <span class="hljs-literal">false</span>}
  console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">map</span>.next());  //{value: <span class="hljs-string">"undefined"</span>, done: <span class="hljs-literal">false</span>}
}</code></pre>
<h2 id="articleHeader79">2.自定义的Iterator接口</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let obj = {
    start:[1,3,2],
    end:[7,8,9],
    [Symbol.iterator](){
      let self = this;
      let index = 0;
      let arr = self.start.concat(self.end);
      let len = arr.length;
      return {
        next(){
          if(index<len){
            return {
              value:arr[index++],
              done:false
            }
          }else{
            return {
              value:arr[index++],
              done:true
            }
          }
        }
      }
    }
  }
  for(let key of obj){
    console.log(key); //1 3 2 7 8 9
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  let obj = {
    start:[<span class="hljs-number">1</span>,<span class="hljs-number">3</span>,<span class="hljs-number">2</span>],
    end:[<span class="hljs-number">7</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>],
    [Symbol.iterator](){
      let self = this;
      let index = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
      let arr = self.start.concat(<span class="hljs-name">self.end</span>)<span class="hljs-comment">;</span>
      let len = arr.length;
      return {
        next(){
          if(<span class="hljs-name">index&lt;len</span>){
            return {
              value:arr[index++],
              done:false
            }
          }else{
            return {
              value:arr[index++],
              done:true
            }
          }
        }
      }
    }
  }
  for(<span class="hljs-name"><span class="hljs-builtin-name">let</span></span> key of obj){
    console.log(<span class="hljs-name"><span class="hljs-builtin-name">key</span></span>)<span class="hljs-comment">; //1 3 2 7 8 9</span>
  }
}</code></pre>
<h1 id="articleHeader80">十五 Genertor</h1>
<h2 id="articleHeader81">1.基本概念</h2>
<p>Generator 函数有多种理解角度。从语法上，首先可以把它理解成，Generator函数是一个状态机，封装了多个内部状态。执行 Generator 函数会返回一个遍历器对象，也就是说，Generator函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历Generator函数内部的每一个状态。形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let tell = function* (){
    yield 'a';
    yield 'b';
    return 'c';
  }
  let k = tell();
  console.log(k.next()); //{value: &quot;a&quot;, done: false}
  console.log(k.next()); //{value: &quot;b&quot;, done: false}
  console.log(k.next()); //{value: &quot;c&quot;, done: true}
  console.log(k.next()); //{value: undefined, done: true}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>{
  let tell = function* (){
    <span class="hljs-keyword">yield</span> <span class="hljs-string">'a'</span>;
    <span class="hljs-keyword">yield</span> <span class="hljs-string">'b'</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-string">'c'</span>;
  }
  let k = tell();
  console.log(k.<span class="hljs-keyword">next</span>()); <span class="hljs-regexp">//</span>{<span class="hljs-symbol">value:</span> <span class="hljs-string">"a"</span>, <span class="hljs-symbol">done:</span> <span class="hljs-literal">false</span>}
  console.log(k.<span class="hljs-keyword">next</span>()); <span class="hljs-regexp">//</span>{<span class="hljs-symbol">value:</span> <span class="hljs-string">"b"</span>, <span class="hljs-symbol">done:</span> <span class="hljs-literal">false</span>}
  console.log(k.<span class="hljs-keyword">next</span>()); <span class="hljs-regexp">//</span>{<span class="hljs-symbol">value:</span> <span class="hljs-string">"c"</span>, <span class="hljs-symbol">done:</span> <span class="hljs-literal">true</span>}
  console.log(k.<span class="hljs-keyword">next</span>()); <span class="hljs-regexp">//</span>{<span class="hljs-symbol">value:</span> undefined, <span class="hljs-symbol">done:</span> <span class="hljs-literal">true</span>}
}</code></pre>
<h2 id="articleHeader82">2.与 Iterator 接口的关系</h2>
<p>由于 Generator 函数就是遍历器生成函数，因此可以把Generator赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
{
  let obj = {};
  obj[Symbol.iterator] = function* (){
    yield '1';
    yield '2';
    yield '3';
  }
  for(let value of obj){
    console.log(value); // 1 2 3
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
{
  <span class="hljs-keyword">let</span> obj = {};
  obj[<span class="hljs-built_in">Symbol</span>.iterator] = <span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">yield</span> <span class="hljs-string">'1'</span>;
    <span class="hljs-keyword">yield</span> <span class="hljs-string">'2'</span>;
    <span class="hljs-keyword">yield</span> <span class="hljs-string">'3'</span>;
  }
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> value <span class="hljs-keyword">of</span> obj){
    <span class="hljs-built_in">console</span>.log(value); <span class="hljs-comment">// 1 2 3</span>
  }
}</code></pre>
<h2 id="articleHeader83">3.next方法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let state = function* (){
      yield 'a';
      yield 'b';
      yield 'c';
  }
  let status = state();
  console.log(status.next());  //a
  console.log(status.next());  //b
  console.log(status.next());  //c
  console.log(status.next());  //a
  console.log(status.next());  //b
  console.log(status.next());  //c
  console.log(status.next());  //a
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  let state = function* (){
      yield 'a';
      yield 'b';
      yield 'c';
  }
  let status = state()<span class="hljs-comment">;</span>
  console.log(<span class="hljs-name">status.next</span>())<span class="hljs-comment">;  //a</span>
  console.log(<span class="hljs-name">status.next</span>())<span class="hljs-comment">;  //b</span>
  console.log(<span class="hljs-name">status.next</span>())<span class="hljs-comment">;  //c</span>
  console.log(<span class="hljs-name">status.next</span>())<span class="hljs-comment">;  //a</span>
  console.log(<span class="hljs-name">status.next</span>())<span class="hljs-comment">;  //b</span>
  console.log(<span class="hljs-name">status.next</span>())<span class="hljs-comment">;  //c</span>
  console.log(<span class="hljs-name">status.next</span>())<span class="hljs-comment">;  //a</span>
}</code></pre>
<h2 id="articleHeader84">4.Genertor的简单应用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//简单的抽奖
{
  let draw = function(count){
    console.info(`剩余${count}次`);
  }
  let chou = function *(count){
    while (count>0) {
      count--;
      yield draw(count);
    }
  }
  let start = chou(5);
  let btn = document.createElement('button');
  btn.id = 'start';
  btn.textContent = '抽奖';
  document.body.appendChild(btn);
  document.getElementById('start').addEventListener('click',function(){
    start.next();
  },false);
}
// 长轮询
{
  let ajax = function* (){
    yield new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve({code:1})
      },200)
    });
  }
  let pull = function(){
    let generator = ajax();
    let step = generator.next();
    step.value.then(function(d){
      if(d.code != 0){
        setTimeout(function(){
          console.log('wait');   //隔一秒输出 wait
          pull();
        },1000)
      }else{
        console.log(d);
      }
    })
  }
  pull();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//简单的抽奖</span>
{
  <span class="hljs-keyword">let</span> draw = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">count</span>)</span>{
    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">`剩余<span class="hljs-subst">${count}</span>次`</span>);
  }
  <span class="hljs-keyword">let</span> chou = <span class="hljs-function"><span class="hljs-keyword">function</span> *(<span class="hljs-params">count</span>)</span>{
    <span class="hljs-keyword">while</span> (count&gt;<span class="hljs-number">0</span>) {
      count--;
      <span class="hljs-keyword">yield</span> draw(count);
    }
  }
  <span class="hljs-keyword">let</span> start = chou(<span class="hljs-number">5</span>);
  <span class="hljs-keyword">let</span> btn = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'button'</span>);
  btn.id = <span class="hljs-string">'start'</span>;
  btn.textContent = <span class="hljs-string">'抽奖'</span>;
  <span class="hljs-built_in">document</span>.body.appendChild(btn);
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'start'</span>).addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    start.next();
  },<span class="hljs-literal">false</span>);
}
<span class="hljs-comment">// 长轮询</span>
{
  <span class="hljs-keyword">let</span> ajax = <span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">yield</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        resolve({<span class="hljs-attr">code</span>:<span class="hljs-number">1</span>})
      },<span class="hljs-number">200</span>)
    });
  }
  <span class="hljs-keyword">let</span> pull = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">let</span> generator = ajax();
    <span class="hljs-keyword">let</span> step = generator.next();
    step.value.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">d</span>)</span>{
      <span class="hljs-keyword">if</span>(d.code != <span class="hljs-number">0</span>){
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'wait'</span>);   <span class="hljs-comment">//隔一秒输出 wait</span>
          pull();
        },<span class="hljs-number">1000</span>)
      }<span class="hljs-keyword">else</span>{
        <span class="hljs-built_in">console</span>.log(d);
      }
    })
  }
  pull();
}</code></pre>
<h1 id="articleHeader85">十六修饰器</h1>
<h2 id="articleHeader86">1.方法的修饰</h2>
<p>修饰器函数一共可以接受三个参数，第一个参数是所要修饰的目标对象，即类的实例（这不同于类的修饰，那种情况时target参数指的是类本身）；第二个参数是所要修饰的属性名，第三个参数是该属性的描述对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let readonly = function(target,name,descriptor){
    descriptor.writable = false;
    return descriptor;
  };
  class test{
    @readonly
    time(){
      return '2017-08-27'
    }
  }
  let tests = new test();


  console.log(tests.time());  // 2017-08-27


  // let testss = new test();
  // // tests.time = function(){
  // //   console.log('2017-08-28');
  // // }
  // console.log(tests.time());  //Cannot assign to read only property 'time' of object
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code>{
  <span class="hljs-keyword">let</span> readonly = <span class="hljs-keyword">function</span>(target,name,descriptor){
    descriptor.writable = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">return</span> descriptor;
  };
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">test</span>{</span>
    @readonly
    time(){
      <span class="hljs-keyword">return</span> <span class="hljs-string">'2017-08-27'</span>
    }
  }
  <span class="hljs-keyword">let</span> tests = <span class="hljs-keyword">new</span> test();


  <span class="hljs-built_in">console</span>.log(tests.time());  <span class="hljs-regexp">// 2017-08-27


  //</span> <span class="hljs-keyword">let</span> testss = <span class="hljs-keyword">new</span> test();
  <span class="hljs-regexp">// //</span> tests.time = <span class="hljs-keyword">function</span>(){
  <span class="hljs-regexp">// //</span>   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2017-08-28'</span>);
  <span class="hljs-regexp">// //</span> }
  <span class="hljs-regexp">// console.log(tests.time());  //</span>Cannot assign <span class="hljs-keyword">to</span> read only property <span class="hljs-string">'time'</span> <span class="hljs-keyword">of</span> object
}</code></pre>
<h2 id="articleHeader87">2.类的修饰</h2>
<p>修饰器是一个对类进行处理的函数。修饰器函数的第一个参数，就是所要修饰的目标类。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let typename = function(target,name,descriptor){
    target.myname = 'hello';
  };
  @typename
  class test{

  }

  console.log(test.myname) // hello
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{
  <span class="hljs-keyword">let</span> typename = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target,name,descriptor</span>)</span>{
    target.myname = <span class="hljs-string">'hello'</span>;
  };
  @typename
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">test</span></span>{

  }

  <span class="hljs-built_in">console</span>.log(test.myname) <span class="hljs-comment">// hello</span>
}</code></pre>
<h1 id="articleHeader88">十七模块化</h1>
<p>ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  export let A = 123;
  export function text(){
    console.log('123');
  }
  export class hello{
    text(){
      console.log('345');
    }
  }
}

{
  let A = 123;
  function text(){
    console.log('123');
  }
  class hello{
    text(){
      console.log('345');
    }
  }
  export default {
    A,
    text,
    hello
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> A = <span class="hljs-number">123</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">text</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'123'</span>);
  }
  <span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">hello</span></span>{
    text(){
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'345'</span>);
    }
  }
}

{
  <span class="hljs-keyword">let</span> A = <span class="hljs-number">123</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">text</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'123'</span>);
  }
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">hello</span></span>{
    text(){
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'345'</span>);
    }
  }
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    A,
    text,
    hello
  }
}</code></pre>
<p>借鉴了<a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">阮一峰ECMAScript 6 入门</a>的内容</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6简单总结（搭配简单的讲解和小案例）

## 原文链接
[https://segmentfault.com/a/1190000013052997](https://segmentfault.com/a/1190000013052997)

