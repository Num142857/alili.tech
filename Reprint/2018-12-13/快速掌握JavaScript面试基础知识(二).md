---
title: '快速掌握JavaScript面试基础知识(二)' 
date: 2018-12-13 2:30:07
hidden: true
slug: rqtxr33nr9
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>译者按：</strong> 总结了大量JavaScript基本知识点，很有用！</p>
<ul><li>原文: <a href="https://medium.freecodecamp.org/the-definitive-javascript-handbook-for-a-developer-interview-44ffc6aeb54e" rel="nofollow noreferrer" target="_blank">The Definitive JavaScript Handbook for your next developer interview</a>
</li></ul>
<p><strong>为了保证可读性，本文采用意译而非直译。另外，本文版权归原作者所有，翻译仅用于学习。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV2rzB?w=1000&amp;h=665" src="https://static.alili.tech/img/bV2rzB?w=1000&amp;h=665" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>根据<a href="https://insights.stackoverflow.com/survey/2017#most-popular-technologies" rel="nofollow noreferrer" target="_blank">StackOverflow调查</a>， 自2014年一来，JavaScript是最流行的编程语言。当然，这也在情理之中，毕竟1/3的开发工作都需要一些JavaScript知识。因此，如果你希望在成为一个开发者，你应该学会这门语言。</p>
<p>这篇博客的主要目的是将所有面试中常见的概念总结，方便你快速去了解。(鉴于本文内容过长，方便阅读，将分为三篇博客来翻译, 此为第二部分。第一部分请点击<a href="https://blog.fundebug.com/2018/01/15/the-definitive-javascript-handbook-for-a-developer-interview/" rel="nofollow noreferrer" target="_blank">快速掌握JavaScript面试基础知识(一)</a>)</p>
<h2 id="articleHeader0">闭包</h2>
<p>闭包由一个函数以及该函数定义是所在的环境组成。我们通过例子来形象解释它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sayHi(name){
  var message = `Hi ${name}!`;
  function greeting() {
    console.log(message)
  }
  return greeting
}
var sayHiToJon = sayHi('Jon');
console.log(sayHiToJon)     // ƒ() { console.log(message) }
console.log(sayHiToJon())   // 'Hi Jon!'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHi</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-keyword">var</span> message = <span class="hljs-string">`Hi <span class="hljs-subst">${name}</span>!`</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">greeting</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(message)
  }
  <span class="hljs-keyword">return</span> greeting
}
<span class="hljs-keyword">var</span> sayHiToJon = sayHi(<span class="hljs-string">'Jon'</span>);
<span class="hljs-built_in">console</span>.log(sayHiToJon)     <span class="hljs-comment">// ƒ() { console.log(message) }</span>
<span class="hljs-built_in">console</span>.log(sayHiToJon())   <span class="hljs-comment">// 'Hi Jon!'</span></code></pre>
<p>请理解<code>var sayHiToJon = sayHi('Jon');</code>这行代码的执行过程，<code>sayHi</code>函数执行，首先将<code>message</code>的值计算出来；然后定义了<code>greeting</code>函数，函数中引用了<code>message</code>变量；最后，返回<code>greeting</code>函数。<br>如果按照C/Java语言的思路，<code>sayHiToJon</code>就等价于<code>greeting</code>函数，那么会报错：message未定义。但是在JavaScript中不一样，这里的<code>sayHiToJon</code>函数等于<code>greeting</code>函数以及一个环境，该环境中包含了<code>message</code>。因此，当我们调用<code>sayHiToJon</code>函数，可以成功地将<code>message</code>打印出来。因此，这里的闭包就是<code>greeting</code>函数和一个包含<code>message</code>变量的环境。(备注: 为了便于理解，此段落未按照原文翻译。)</p>
<p>闭包的一个优势在于<strong>数据隔离</strong>。我们同样用一个例子来说明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function SpringfieldSchool() {
  let staff = ['Seymour Skinner', 'Edna Krabappel'];
  return {
    getStaff: function() { console.log(staff) },
    addStaff: function(name) { staff.push(name) }
  }
}

let elementary = SpringfieldSchool()
console.log(elementary)        // { getStaff: ƒ, addStaff: ƒ }
console.log(staff)             // ReferenceError: staff is not defined
/* Closure allows access to the staff variable */
elementary.getStaff()          // [&quot;Seymour Skinner&quot;, &quot;Edna Krabappel&quot;]
elementary.addStaff('Otto Mann')
elementary.getStaff()          // [&quot;Seymour Skinner&quot;, &quot;Edna Krabappel&quot;, &quot;Otto Mann&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SpringfieldSchool</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> staff = [<span class="hljs-string">'Seymour Skinner'</span>, <span class="hljs-string">'Edna Krabappel'</span>];
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">getStaff</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(staff) },
    <span class="hljs-attr">addStaff</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>) </span>{ staff.push(name) }
  }
}

<span class="hljs-keyword">let</span> elementary = SpringfieldSchool()
<span class="hljs-built_in">console</span>.log(elementary)        <span class="hljs-comment">// { getStaff: ƒ, addStaff: ƒ }</span>
<span class="hljs-built_in">console</span>.log(staff)             <span class="hljs-comment">// ReferenceError: staff is not defined</span>
<span class="hljs-comment">/* Closure allows access to the staff variable */</span>
elementary.getStaff()          <span class="hljs-comment">// ["Seymour Skinner", "Edna Krabappel"]</span>
elementary.addStaff(<span class="hljs-string">'Otto Mann'</span>)
elementary.getStaff()          <span class="hljs-comment">// ["Seymour Skinner", "Edna Krabappel", "Otto Mann"]</span></code></pre>
<p>在<code>elementary</code>被创建的时候，<code>SpringfieldSchool</code>已经返回。也就是说<code>staff</code>无法被外部访问。唯一可以访问的方式就是里面的闭包函数<code>getStaff</code>和<code>addStaff</code>。</p>
<p>我们来看一个面试题：下面的代码有什么问题，如何修复？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arr = [10, 12, 15, 21];
for (var i = 0; i < arr.length; i++) {
  setTimeout(function() {
    console.log(`The value ${arr[i]} is at index: ${i}`);
  }, (i+1) * 1000);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> arr = [<span class="hljs-number">10</span>, <span class="hljs-number">12</span>, <span class="hljs-number">15</span>, <span class="hljs-number">21</span>];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`The value <span class="hljs-subst">${arr[i]}</span> is at index: <span class="hljs-subst">${i}</span>`</span>);
  }, (i+<span class="hljs-number">1</span>) * <span class="hljs-number">1000</span>);
}</code></pre>
<p>上面的代码输出的结果全部都一样："The value undefined is at index: 4"。因为所有在<code>setTimeout</code>中定义的匿名函数都引用了同一个外部变量<code>i</code>。当匿名函数执行的时候，<code>i</code>的值为4。</p>
<p>这个问题可以改用<code>IIFE</code>(后面会介绍)方法来解决，通过对每一个匿名函数构建独立的外部作用域来实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arr = [10, 12, 15, 21];
for (var i = 0; i < arr.length; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(`The value ${arr[j]} is at index: ${j}`);
    }, j * 1000);
  })(i)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> arr = [<span class="hljs-number">10</span>, <span class="hljs-number">12</span>, <span class="hljs-number">15</span>, <span class="hljs-number">21</span>];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
  (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">j</span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`The value <span class="hljs-subst">${arr[j]}</span> is at index: <span class="hljs-subst">${j}</span>`</span>);
    }, j * <span class="hljs-number">1000</span>);
  })(i)
}</code></pre>
<p>当然，还有一个方法，使用<code>let</code>来声明<code>i</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arr = [10, 12, 15, 21];
for (let i = 0; i < arr.length; i++) {
  setTimeout(function() {
    console.log(`The value ${arr[i]} is at index: ${i}`);
  }, (i) * 1000);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> arr = [<span class="hljs-number">10</span>, <span class="hljs-number">12</span>, <span class="hljs-number">15</span>, <span class="hljs-number">21</span>];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`The value <span class="hljs-subst">${arr[i]}</span> is at index: <span class="hljs-subst">${i}</span>`</span>);
  }, (i) * <span class="hljs-number">1000</span>);
}</code></pre>
<h2 id="articleHeader1">立即调用的函数表达式(Immediate Invoked Function Expression)(IIFE)</h2>
<p>一个IIFE是一个函数表达式在定义之后立即被调用。常用在你想对一个新声明的变量创建一个隔离的作用域。<br>它的格式为: <code>(function(){....})()</code>。前面的大括号用于告诉编译器这里不仅仅是函数定义，后面的大括号用于执行该函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = [];
for (var i=0; i < 5; i++) {
  result.push( function() { return i } );
}
console.log( result[1]() ); // 5
console.log( result[3]() ); // 5
result = [];
for (var i=0; i < 5; i++) {
  (function () {
    var j = i; // copy current value of i
    result.push( function() { return j } );
  })();
}
console.log( result[1]() ); // 1
console.log( result[3]() ); // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> result = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
  result.push( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> i } );
}
<span class="hljs-built_in">console</span>.log( result[<span class="hljs-number">1</span>]() ); <span class="hljs-comment">// 5</span>
<span class="hljs-built_in">console</span>.log( result[<span class="hljs-number">3</span>]() ); <span class="hljs-comment">// 5</span>
result = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
  (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> j = i; <span class="hljs-comment">// copy current value of i</span>
    result.push( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> j } );
  })();
}
<span class="hljs-built_in">console</span>.log( result[<span class="hljs-number">1</span>]() ); <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log( result[<span class="hljs-number">3</span>]() ); <span class="hljs-comment">// 3</span></code></pre>
<p>使用IIFE可以：</p>
<ul>
<li>为函数绑定私有数据</li>
<li>创建一个新的环境</li>
<li>避免污染全局命名空间</li>
</ul>
<h2 id="articleHeader2">环境(Context)</h2>
<p>我们往往容易将环境(Context)和作用域(Scope)搞混，我来简单解释一下：</p>
<ul>
<li>
<strong>环境(Context)</strong>: 由函数如何被调用而决定，往往指<code>this</code>。</li>
<li>
<strong>作用域(Scope)</strong>: 可访问的变量。</li>
</ul>
<h2 id="articleHeader3">函数调用：call, apply, bind</h2>
<p>这三个方法都是为了将this绑定到函数，区别在于调用的方式。</p>
<ul>
<li>
<code>.call()</code>会立即执行函数，你需要把参数按顺序传入；</li>
<li>
<code>.apply()</code>会立即执行函数，你需要把所有的参数组合为一个数组传入；</li>
</ul>
<p><code>.call()</code>和<code>.apply()</code>几乎相同。哪个传入参数方便，你就选择哪个。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Snow = {surename: 'Snow'}
const char = {
  surename: 'Stark',
  knows: function(arg, name) {
    console.log(`You know ${arg}, ${name} ${this.surename}`);
  }
}
char.knows('something', 'Bran');              // You know something, Bran Stark
char.knows.call(Snow, 'nothing', 'Jon');      // You know nothing, Jon Snow
char.knows.apply(Snow, ['nothing', 'Jon']);   // You know nothing, Jon Snow" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> Snow = {<span class="hljs-attr">surename</span>: <span class="hljs-string">'Snow'</span>}
<span class="hljs-keyword">const</span> char = {
  <span class="hljs-attr">surename</span>: <span class="hljs-string">'Stark'</span>,
  <span class="hljs-attr">knows</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arg, name</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`You know <span class="hljs-subst">${arg}</span>, <span class="hljs-subst">${name}</span> <span class="hljs-subst">${<span class="hljs-keyword">this</span>.surename}</span>`</span>);
  }
}
char.knows(<span class="hljs-string">'something'</span>, <span class="hljs-string">'Bran'</span>);              <span class="hljs-comment">// You know something, Bran Stark</span>
char.knows.call(Snow, <span class="hljs-string">'nothing'</span>, <span class="hljs-string">'Jon'</span>);      <span class="hljs-comment">// You know nothing, Jon Snow</span>
char.knows.apply(Snow, [<span class="hljs-string">'nothing'</span>, <span class="hljs-string">'Jon'</span>]);   <span class="hljs-comment">// You know nothing, Jon Snow</span></code></pre>
<p>注意：如果你将数组传入<code>call</code>函数，它会认为只有一个参数。</p>
<p>ES6允许使用新的操作符将数组变换为一个序列。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="char.knows.call(Snow, ...[&quot;nothing&quot;, &quot;Jon&quot;]);  // You know nothing, Jon Snow" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">char.knows.call(Snow, ...[<span class="hljs-string">"nothing"</span>, <span class="hljs-string">"Jon"</span>]);  <span class="hljs-comment">// You know nothing, Jon Snow</span></code></pre>
<p><code>.bind()</code>返回一个新的函数，以及相应的环境和参数。如果你想该函数稍后调用，那么推荐使用<code>bind</code>。<br><code>.bind()</code>函数的优点在于它可以记录一个执行环境，对于异步调用和事件驱动的编程很有用。</p>
<p><code>.bind()</code>传参数的方式和<code>call</code>相同。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Snow = {surename: 'Snow'}
const char = {
  surename: 'Stark',
  knows: function(arg, name) {
    console.log(`You know ${arg}, ${name} ${this.surename}`);}
  }
const whoKnowsNothing = char.knows.bind(Snow, 'nothing');
whoKnowsNothing('Jon');  // You know nothing, Jon Snow" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> Snow = {<span class="hljs-attr">surename</span>: <span class="hljs-string">'Snow'</span>}
<span class="hljs-keyword">const</span> char = {
  <span class="hljs-attr">surename</span>: <span class="hljs-string">'Stark'</span>,
  <span class="hljs-attr">knows</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arg, name</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`You know <span class="hljs-subst">${arg}</span>, <span class="hljs-subst">${name}</span> <span class="hljs-subst">${<span class="hljs-keyword">this</span>.surename}</span>`</span>);}
  }
<span class="hljs-keyword">const</span> whoKnowsNothing = char.knows.bind(Snow, <span class="hljs-string">'nothing'</span>);
whoKnowsNothing(<span class="hljs-string">'Jon'</span>);  <span class="hljs-comment">// You know nothing, Jon Snow</span></code></pre>
<h2 id="articleHeader4">this关键字</h2>
<p>要理解JavaScript中<code>this</code>关键字，特别是它指向谁，有时候相当地复杂。<code>this</code>的值通常由函数的执行环境决定。简单的说，执行环境指函数如何被调用的。<code>this</code>像是一个占位符(placeholder)，它指向当方法被调用时，调用对应的方法的对象。</p>
<p>下面有序地列出了判断<code>this</code>指向的规则。如果第一条匹配，那么就不用去检查第二条了。</p>
<ul>
<li>
<p><code>new</code>绑定 - 当使用<code>new</code>关键字调用函数的时候，<code>this</code>指向新构建的对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name, age) {
  this.name = name;
  this.age =age;
  console.log(this);
}
const Rachel = new Person('Rachel', 30);   // { age: 30, name: 'Rachel' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.age =age;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
}
<span class="hljs-keyword">const</span> Rachel = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'Rachel'</span>, <span class="hljs-number">30</span>);   <span class="hljs-comment">// { age: 30, name: 'Rachel' }</span></code></pre>
</li>
<li>
<p>显示绑定(Explicit binding) - 当使用<code>call</code>或则<code>apply</code>的时候，我们显示的传入一个对象参数，该参数会绑定到<code>this</code>。 注意：<code>.bind()</code>函数不一样。用<code>bind</code>定义一个新的函数，但是依然绑定到原来的对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn() {
  console.log(this);
}
var agent = {id: '007'};
fn.call(agent);    // { id: '007' }
fn.apply(agent);   // { id: '007' }
var boundFn = fn.bind(agent);
boundFn();         // { id: '007' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
}
<span class="hljs-keyword">var</span> agent = {<span class="hljs-attr">id</span>: <span class="hljs-string">'007'</span>};
fn.call(agent);    <span class="hljs-comment">// { id: '007' }</span>
fn.apply(agent);   <span class="hljs-comment">// { id: '007' }</span>
<span class="hljs-keyword">var</span> boundFn = fn.bind(agent);
boundFn();         <span class="hljs-comment">// { id: '007' }</span></code></pre>
</li>
<li>
<p>隐式绑定 - 当一个函数在某个环境下调用(在某个对象里)，<code>this</code>指向该对象。也就是说该函数是对象的一个方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var building = {
  floors: 5,
  printThis: function() {
    console.log(this);
  }
}
building.printThis();  // { floors: 5, printThis: function() {…} }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> building = {
  <span class="hljs-attr">floors</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attr">printThis</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
  }
}
building.printThis();  <span class="hljs-comment">// { floors: 5, printThis: function() {…} }</span></code></pre>
</li>
<li>
<p>默认绑定 - 如果上面所有的规则都不满足，那么<code>this</code>指向全局对象(在浏览器中，就是window对象)。当函数没有绑定到某个对象，而单独定义的时候，该函数默认绑定到全局对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function printWindow() {
  console.log(this)
}
printWindow();  // window object" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">printWindow</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
}
printWindow();  <span class="hljs-comment">// window object</span></code></pre>
</li>
</ul>
<p>注意：下面的情况中，<code>inner</code>函数中的<code>this</code>指向全局。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Dinosaur(name) {
  this.name = name;
  var self = this;
  inner();
  function inner() {
    alert(this);        // window object — the function has overwritten the 'this' context
    console.log(self);  // {name: 'Dino'} — referencing the stored value from the outer context
  }
}
var myDinosaur = new Dinosaur('Dino');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dinosaur</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
  inner();
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inner</span>(<span class="hljs-params"></span>) </span>{
    alert(<span class="hljs-keyword">this</span>);        <span class="hljs-comment">// window object — the function has overwritten the 'this' context</span>
    <span class="hljs-built_in">console</span>.log(self);  <span class="hljs-comment">// {name: 'Dino'} — referencing the stored value from the outer context</span>
  }
}
<span class="hljs-keyword">var</span> myDinosaur = <span class="hljs-keyword">new</span> Dinosaur(<span class="hljs-string">'Dino'</span>);</code></pre>
<ul><li>词法(Lexical) this - 当是使用<code>=&gt;</code>来定义函数时，<code>this</code>指向定义该函数时候外层的<code>this</code>。 备注：大概是和定义的词法(<code>=&gt;</code>)有关，把它称作<code>Lexical this</code>。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Cat(name) {
  this.name = name;
  console.log(this);   // { name: 'Garfield' }
  ( () => console.log(this) )();   // { name: 'Garfield' }
}
var myCat = new Cat('Garfield');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cat</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);   <span class="hljs-comment">// { name: 'Garfield' }</span>
  ( <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>) )();   <span class="hljs-comment">// { name: 'Garfield' }</span>
}
<span class="hljs-keyword">var</span> myCat = <span class="hljs-keyword">new</span> Cat(<span class="hljs-string">'Garfield'</span>);</code></pre>
<h2 id="articleHeader5">严格(Strict)模式</h2>
<p>如果你使用了<code>"use strict"</code>指令，那么JavaScript代码会在严格模式下执行。在严格模式下，对于词法分析和错误处理都有特定的规则。在这里我列出它的一些优点：</p>
<ul>
<li>使得Debug更容易：以前会被忽略的错误现在会显示报错，比如赋值给一个不可写的全局变量或则属性；</li>
<li>避免不小心声明了全局变量：赋值给一个未定义的变量会报错；</li>
<li>避免无效使用delete：尝试去删除变量、函数或则不可删除的属性会抛出错误；</li>
<li>避免重复的属性名和参数值：对象上重复的属性和函数参数会抛出错误(在ES6中不再是这样)；</li>
<li>使得<code>eval()</code>更加安全：在<code>eval()</code>中定义的变量和函数在外部作用域不可见；</li>
<li>“安全”的消除JavaScript中this的转换：如果<code>this</code>是null或则undefined不在转换到全局对象。也就是说在浏览器中使用this去指向全局对象不再可行。</li>
</ul>
<p><em>对于在严格(strict)模式和测试阶段都没有发现的bug，不妨接入线上实时监控插件<a href="https://www.fundebug.com" rel="nofollow noreferrer" target="_blank">Fundebug</a></em>。</p>
<ul><li>
<a href="https://blog.fundebug.com/2018/01/15/the-definitive-javascript-handbook-for-a-developer-interview/" rel="nofollow noreferrer" target="_blank">快速掌握JavaScript面试基础知识(一)</a> --&gt;</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV00GN?w=270&amp;h=370" src="https://static.alili.tech/img/bV00GN?w=270&amp;h=370" alt="" title="" style="cursor: pointer;"></span></p>
<hr>
<p>版权声明:<br>转载时请注明作者Fundebug以及本文地址：<br><a href="https://blog.fundebug.com/2018/01/22/the-definitive-javascript-handbook-for-a-developer-interview-2/" rel="nofollow noreferrer" target="_blank">https://blog.fundebug.com/201...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
快速掌握JavaScript面试基础知识(二)

## 原文链接
[https://segmentfault.com/a/1190000013270964](https://segmentfault.com/a/1190000013270964)

