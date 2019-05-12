---
title: 'Array.prototype.slice及其他Array方法' 
date: 2019-01-17 2:30:25
hidden: true
slug: u1qcriiaw9
categories: [reprint]
---

{{< raw >}}

                    
<p>call方法真是一个有意思的东西，它可以改变函数调用时this的值。而我们知道，在函数里，this指向了调用这个函数的环境对象，比如一道经典面试题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = 2;
var obj = {
  num: 1,
  show: function () {
    console.log(this.num)
  }
};
var foo = obj.show;
obj.show();/* 显示1；show是被obj调用的，所以this指向obj */
foo();/* 显示2；相当于global.foo(),所以this指向global，如果在浏览器里global就是window */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">num</span> = <span class="hljs-number">2</span>;
<span class="hljs-built_in">var</span> obj = {
  <span class="hljs-built_in">num</span>: <span class="hljs-number">1</span>,
  <span class="hljs-built_in">show</span>: function () {
    console.<span class="hljs-built_in">log</span>(this.<span class="hljs-built_in">num</span>)
  }
};
<span class="hljs-built_in">var</span> foo = obj.<span class="hljs-built_in">show</span>;
obj.<span class="hljs-built_in">show</span>();<span class="hljs-comment">/* 显示1；show是被obj调用的，所以this指向obj */</span>
foo();<span class="hljs-comment">/* 显示2；相当于global.foo(),所以this指向global，如果在浏览器里global就是window */</span></code></pre>
<p><strong>换句话说，如果一个对象obj上有方法foo，你可以通过<code>obj.foo()</code>调用；如果没有obj上没有方法foo，<code>obj.foo()</code>是会报错的，但是，使用<code>foo.call(obj)</code>，可以强行达到<code>obj.foo()</code>的效果，比如：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
    console.log(this.num);
}
var obj = {
    num: 1
}
foo.call(obj);// 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.num);
}
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">num</span>: <span class="hljs-number">1</span>
}
foo.call(obj);<span class="hljs-comment">// 1</span></code></pre>
<p><code>Array.prototype.slice.call</code>的用处就是这样，可以在array-like（类数组，就是长得像数组，但不是数组）的对象上强行使用slice方法，比如：<code>Array.prototype.slice.call(arguments)</code>就是把<code>arguments</code>对象转化为数组。当然，除了<code>arguments</code>，我们还能在<code>HTMLCollection</code>或<code>NodeList</code>身上使用。<strong>那么到底什么算是类数组呢？</strong></p>
<p><strong>有length属性的对象。</strong></p>
<p>比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
  0: 'Tom',
  1: 'Jack',
  2: 'Jason',
  length: 3
}
var arr = [].slice.call(obj1);
console.log('arr: ', arr);/* [ 'Tom', 'Jack', 'Jason' ] */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj1 = {
  <span class="hljs-number">0</span>: <span class="hljs-string">'Tom'</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">'Jack'</span>,
  <span class="hljs-number">2</span>: <span class="hljs-string">'Jason'</span>,
  <span class="hljs-attr">length</span>: <span class="hljs-number">3</span>
}
<span class="hljs-keyword">var</span> arr = [].slice.call(obj1);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'arr: '</span>, arr);<span class="hljs-comment">/* [ 'Tom', 'Jack', 'Jason' ] */</span></code></pre>
<p>那如果没有length呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
  0: 'Tom',
  1: 'Jack',
  2: 'Jason'
}
var arr = [].slice.call(obj1);//* [] */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> obj1 = {
  <span class="hljs-number">0</span>: <span class="hljs-string">'Tom'</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">'Jack'</span>,
  <span class="hljs-number">2</span>: <span class="hljs-string">'Jason'</span>
}
<span class="hljs-keyword">var</span> arr = [].slice.call(obj1);<span class="hljs-comment">//* [] */</span></code></pre>
<p>原来没有length属性的对象也会被转为数组，只不过认为它length=0而已。</p>
<p>那如果对象的属性没有按照0-n顺序乖乖排好呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
  1: 'Tom',
  3: 'Jack',
  5: 'Jason',
  7: 'Dave',
  foo: 'bar',
  length: 6
}
var arr = [].slice.call(obj1);/* [ , 'Tom', , 'Jack', , 'Jason' ] */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> obj1 = {
  <span class="hljs-number">1</span>: <span class="hljs-string">'Tom'</span>,
  <span class="hljs-number">3</span>: <span class="hljs-string">'Jack'</span>,
  <span class="hljs-number">5</span>: <span class="hljs-string">'Jason'</span>,
  <span class="hljs-number">7</span>: <span class="hljs-string">'Dave'</span>,
  foo: <span class="hljs-string">'bar'</span>,
  length: <span class="hljs-number">6</span>
}
<span class="hljs-built_in">var</span> arr = <span class="hljs-meta">[</span><span class="hljs-meta">]</span>.slice.call(obj1);/* <span class="hljs-meta">[</span> , <span class="hljs-string">'Tom'</span>, , <span class="hljs-string">'Jack'</span>, , <span class="hljs-string">'Jason'</span> <span class="hljs-meta">]</span> */</code></pre>
<p>原来转化的时候，会以<code>length</code>为基础，生成一个长度为<code>length</code>的数组，<code>obj</code>的属性是数组的有效<code>index</code>的话，就会把对应值填入到对应位置，其他的位置找不到值，就会填入<code>undefined</code>。</p>
<p>所以前面的说法其实不对，所有的对象都可以被视为类数组，有<code>length</code>的视为长度为<code>length</code>的数组，没有的，视为长度为0的数组。</p>
<p><strong>以<code>length</code>属性为基础</strong></p>
<p>这句话很重要。</p>
<p>另外，<code>call</code>方法的参数如果是<code>原始值类型</code>，会传入它的<code>自动包装对象</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [].slice.call('hello');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var arr</span> = [].slice.call(<span class="hljs-string">'hello'</span>);
</code></pre>
<p>等价于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [].slice.call(new String('hello'));/* [ 'h', 'e', 'l', 'l', 'o' ] */

因为new String('hello')就是
{
    0: &quot;h&quot;,
    1: &quot;e&quot;,
    2: &quot;l&quot;,
    3: &quot;l&quot;,
    4: &quot;o&quot;,
    length: 5
}    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>var arr = [].slice.call(<span class="hljs-keyword">new</span> String(<span class="hljs-symbol">'hello</span>'));/* [ <span class="hljs-string">'h'</span>, <span class="hljs-string">'e'</span>, <span class="hljs-string">'l'</span>, <span class="hljs-string">'l'</span>, <span class="hljs-string">'o'</span> ] */

因为<span class="hljs-keyword">new</span> String(<span class="hljs-symbol">'hello</span>')就是
{
    <span class="hljs-number">0</span>: <span class="hljs-string">"h"</span>,
    <span class="hljs-number">1</span>: <span class="hljs-string">"e"</span>,
    <span class="hljs-number">2</span>: <span class="hljs-string">"l"</span>,
    <span class="hljs-number">3</span>: <span class="hljs-string">"l"</span>,
    <span class="hljs-number">4</span>: <span class="hljs-string">"o"</span>,
    length: <span class="hljs-number">5</span>
}    
</code></pre>
<p>以上就是<code>Array.prototype.slice.call</code>的一些细节，那么除了<code>slice</code>之外，<code>Array</code>对象还有很多其他的方法，这些方法是不是也能用到对象身上呢？</p>
<h2 id="articleHeader0">Array.prototype.join</h2>
<p>join方法是把数组转化为字符串的方法，具体表现不再赘述，看两个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
  0: 'Tom',
  1: 'Jack',
  2: 'Jason',
  length: 6
}
var arr = [].join.call(obj1, '-');// Tom-Jack-Jason---

var obj1 = {
  0: 'Tom',
  1: 'Jack',
  2: 'Jason',
}
var arr = [].join.call(obj1, '-'); // ''" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">var</span> obj1 = {
  <span class="hljs-number">0</span>: <span class="hljs-string">'Tom'</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">'Jack'</span>,
  <span class="hljs-number">2</span>: <span class="hljs-string">'Jason'</span>,
  length: <span class="hljs-number">6</span>
}
<span class="hljs-keyword">var</span> arr = [].<span class="hljs-keyword">join</span>.call(obj1, <span class="hljs-string">'-'</span>);<span class="hljs-comment">// Tom-Jack-Jason---</span>

<span class="hljs-keyword">var</span> obj1 = {
  <span class="hljs-number">0</span>: <span class="hljs-string">'Tom'</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">'Jack'</span>,
  <span class="hljs-number">2</span>: <span class="hljs-string">'Jason'</span>,
}
<span class="hljs-keyword">var</span> arr = [].<span class="hljs-keyword">join</span>.call(obj1, <span class="hljs-string">'-'</span>); <span class="hljs-comment">// ''</span></code></pre>
<p>还是那句话，<strong>以<code>length</code>为基础</strong>,没有<code>length</code>属性的，视为长度为0的数组。</p>
<h2 id="articleHeader1">Array.prototype.push</h2>
<p>这个方法比较好玩：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
  0: 'Tom',
  1: 'Jack',
  2: 'Jason',
  length: 6
}
var arr = [].push.call(obj1, 'Dave');
console.log('arr: ', arr);// 7，因为push方法返回的是push之后array的操作数
console.log('obj: ', obj1);// { '0': 'Tom', '1': 'Jack', '2': 'Jason', '6': 'Dave', length: 7 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>var obj1 = {
  <span class="hljs-number">0</span>: <span class="hljs-string">'Tom'</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">'Jack'</span>,
  <span class="hljs-number">2</span>: <span class="hljs-string">'Jason'</span>,
  <span class="hljs-keyword">length</span>: <span class="hljs-number">6</span>
}
var arr = [].push.call(obj1, <span class="hljs-string">'Dave'</span>);
console.log(<span class="hljs-string">'arr: '</span>, arr);<span class="hljs-regexp">//</span> <span class="hljs-number">7</span>，因为<span class="hljs-keyword">push</span>方法返回的是<span class="hljs-keyword">push</span>之后array的操作数
console.log(<span class="hljs-string">'obj: '</span>, obj1);<span class="hljs-regexp">//</span> { <span class="hljs-string">'0'</span>: <span class="hljs-string">'Tom'</span>, <span class="hljs-string">'1'</span>: <span class="hljs-string">'Jack'</span>, <span class="hljs-string">'2'</span>: <span class="hljs-string">'Jason'</span>, <span class="hljs-string">'6'</span>: <span class="hljs-string">'Dave'</span>, <span class="hljs-keyword">length</span>: <span class="hljs-number">7</span> }</code></pre>
<p>可以看到<code>obj1</code>里新增属性<code>6</code>，值为<code>'Dave'</code>，并且<code>length</code>也更新为<code>7</code>，这说明调用<code>push</code>时会对原有对象进行修改。<br>我们可以利用这个特性，比如当我们需要一个<code>obj1</code>的类数组副本时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
  foo: 'foo',
  bar: 'bar',
  cei: 'cei'
};
var copy = {};
for (var i in obj) {
  [].push.call(copy, obj[i])
}
console.log(copy);// { '0': 'foo', '1': 'bar', '2': 'cei', length: 3 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>var obj = {
  foo: <span class="hljs-string">'foo'</span>,
  bar: <span class="hljs-string">'bar'</span>,
  cei: <span class="hljs-string">'cei'</span>
};
var <span class="hljs-keyword">copy</span><span class="bash"> = {};
</span>for (var i in obj) {
  [].push.call(<span class="hljs-keyword">copy</span><span class="bash">, obj[i])
</span>}
console.log(<span class="hljs-keyword">copy</span><span class="bash">);// { <span class="hljs-string">'0'</span>: <span class="hljs-string">'foo'</span>, <span class="hljs-string">'1'</span>: <span class="hljs-string">'bar'</span>, <span class="hljs-string">'2'</span>: <span class="hljs-string">'cei'</span>, length: 3 }</span></code></pre>
<p>如果，没有传入<code>length</code>呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
  0: 'Tom',
  1: 'Jack',
  2: 'Jason'
}
var arr = [].push.call(obj1, 'Dave');
console.log('arr: ', arr);// 1
console.log('obj: ', obj1);// { '0': 'Dave', '1': 'Jack', '2': 'Jason', length: 1 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code><span class="hljs-keyword">var</span> obj1 = {
  <span class="hljs-number">0</span>: <span class="hljs-string">'Tom'</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">'Jack'</span>,
  <span class="hljs-number">2</span>: <span class="hljs-string">'Jason'</span>
}
<span class="hljs-keyword">var</span> arr = [].push.call(obj1, <span class="hljs-string">'Dave'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'arr: '</span>, arr);<span class="hljs-regexp">// 1
console.log('obj: ', obj1);//</span> { <span class="hljs-string">'0'</span>: <span class="hljs-string">'Dave'</span>, <span class="hljs-string">'1'</span>: <span class="hljs-string">'Jack'</span>, <span class="hljs-string">'2'</span>: <span class="hljs-string">'Jason'</span>, length: <span class="hljs-number">1</span> }</code></pre>
<p>这里的行为有些诡异，不过也更好地解释了<strong>以length为基础</strong>这句话：<br>没有<code>length</code>的时候，认为数组长度为<code>0</code>，并且会对<code>obj</code>进行修改，把属性0的值改为<code>Dave</code>.</p>
<p>那么，会举一反三的话，对于<code>pop</code>, <code>shift</code>和<code>unshift</code>这三个方法的行为应该能想象得出来，就不再赘述了。</p>
<h2 id="articleHeader2">Array.prototype.reverse</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
  0: 'Tom',
  1: 'Jack',
  2: 'Jason',
  length: 6
}
var arr = [].reverse.call(obj1);
console.log('arr: ', arr);// { '3': 'Jason', '4': 'Jack', '5': 'Tom', length: 6 }
console.log('obj: ', obj1);// { '3': 'Jason', '4': 'Jack', '5': 'Tom', length: 6 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>var obj1 = {
  <span class="hljs-number">0</span>: <span class="hljs-string">'Tom'</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">'Jack'</span>,
  <span class="hljs-number">2</span>: <span class="hljs-string">'Jason'</span>,
  <span class="hljs-keyword">length</span>: <span class="hljs-number">6</span>
}
var arr = [].<span class="hljs-keyword">reverse</span>.call(obj1);
console.log(<span class="hljs-string">'arr: '</span>, arr);<span class="hljs-regexp">//</span> { <span class="hljs-string">'3'</span>: <span class="hljs-string">'Jason'</span>, <span class="hljs-string">'4'</span>: <span class="hljs-string">'Jack'</span>, <span class="hljs-string">'5'</span>: <span class="hljs-string">'Tom'</span>, <span class="hljs-keyword">length</span>: <span class="hljs-number">6</span> }
console.log(<span class="hljs-string">'obj: '</span>, obj1);<span class="hljs-regexp">//</span> { <span class="hljs-string">'3'</span>: <span class="hljs-string">'Jason'</span>, <span class="hljs-string">'4'</span>: <span class="hljs-string">'Jack'</span>, <span class="hljs-string">'5'</span>: <span class="hljs-string">'Tom'</span>, <span class="hljs-keyword">length</span>: <span class="hljs-number">6</span> }</code></pre>
<p><code>reverse</code>的话，<code>arr === obj1</code></p>
<h2 id="articleHeader3">Array.prototype.sort</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
  0: 'c',
  1: 'b',
  2: 'a',
  length: 6
}
var arr = [].sort.call(obj1);
console.log('arr: ', arr);// { '0': 'a', '1': 'b', '2': 'c', length: 6 }
console.log('obj: ', obj1);// { '0': 'a', '1': 'b', '2': 'c', length: 6 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>var obj1 = {
  <span class="hljs-number">0</span>: <span class="hljs-string">'c'</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">'b'</span>,
  <span class="hljs-number">2</span>: <span class="hljs-string">'a'</span>,
  <span class="hljs-keyword">length</span>: <span class="hljs-number">6</span>
}
var arr = [].sort.call(obj1);
console.log(<span class="hljs-string">'arr: '</span>, arr);<span class="hljs-regexp">//</span> { <span class="hljs-string">'0'</span>: <span class="hljs-string">'a'</span>, <span class="hljs-string">'1'</span>: <span class="hljs-string">'b'</span>, <span class="hljs-string">'2'</span>: <span class="hljs-string">'c'</span>, <span class="hljs-keyword">length</span>: <span class="hljs-number">6</span> }
console.log(<span class="hljs-string">'obj: '</span>, obj1);<span class="hljs-regexp">//</span> { <span class="hljs-string">'0'</span>: <span class="hljs-string">'a'</span>, <span class="hljs-string">'1'</span>: <span class="hljs-string">'b'</span>, <span class="hljs-string">'2'</span>: <span class="hljs-string">'c'</span>, <span class="hljs-keyword">length</span>: <span class="hljs-number">6</span> }</code></pre>
<p><code>sort</code>也一样，<code>arr === obj1</code></p>
<h2 id="articleHeader4">Array.prototype.concat</h2>
<p><code>concat</code>的表现就不是我们意料之中的了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
  0: 'c',
  1: 'b',
  2: 'a',
  length: 6
}

var add = {
  foo: 'foo',
  bar: 'bar'
}
var arr = [].concat.call(obj1, add);
console.log('arr: ', arr);// [ { '0': 'c', '1': 'b', '2': 'a', length: 6 }, 'foo', 'bar' ]
console.log('obj: ', obj1);// { '0': 'c', '1': 'b', '2': 'a', length: 6 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>var obj1 = {
  <span class="hljs-number">0</span>: <span class="hljs-string">'c'</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">'b'</span>,
  <span class="hljs-number">2</span>: <span class="hljs-string">'a'</span>,
  length: <span class="hljs-number">6</span>
}

var <span class="hljs-keyword">add</span><span class="bash"> = {
</span>  foo: <span class="hljs-string">'foo'</span>,
  bar: <span class="hljs-string">'bar'</span>
}
var arr = [].concat.call(obj1, <span class="hljs-keyword">add</span><span class="bash">);
</span>console.log(<span class="hljs-string">'arr: '</span>, arr);// [ { <span class="hljs-string">'0'</span>: <span class="hljs-string">'c'</span>, <span class="hljs-string">'1'</span>: <span class="hljs-string">'b'</span>, <span class="hljs-string">'2'</span>: <span class="hljs-string">'a'</span>, length: <span class="hljs-number">6</span> }, <span class="hljs-string">'foo'</span>, <span class="hljs-string">'bar'</span> ]
console.log(<span class="hljs-string">'obj: '</span>, obj1);// { <span class="hljs-string">'0'</span>: <span class="hljs-string">'c'</span>, <span class="hljs-string">'1'</span>: <span class="hljs-string">'b'</span>, <span class="hljs-string">'2'</span>: <span class="hljs-string">'a'</span>, length: <span class="hljs-number">6</span> }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
  0: 'c',
  1: 'b',
  2: 'a',
  length: 6
}
var arr = [].concat.call(obj1, 'foo', 'bar');
console.log('arr: ', arr);// [ { '0': 'c', '1': 'b', '2': 'a', length: 6 }, 'foo', 'bar' ]
console.log('obj: ', obj1);// { '0': 'c', '1': 'b', '2': 'a', length: 6 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>var obj1 = {
  <span class="hljs-number">0</span>: <span class="hljs-string">'c'</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">'b'</span>,
  <span class="hljs-number">2</span>: <span class="hljs-string">'a'</span>,
  <span class="hljs-keyword">length</span>: <span class="hljs-number">6</span>
}
var arr = [].concat.call(obj1, <span class="hljs-string">'foo'</span>, <span class="hljs-string">'bar'</span>);
console.log(<span class="hljs-string">'arr: '</span>, arr);<span class="hljs-regexp">//</span> [ { <span class="hljs-string">'0'</span>: <span class="hljs-string">'c'</span>, <span class="hljs-string">'1'</span>: <span class="hljs-string">'b'</span>, <span class="hljs-string">'2'</span>: <span class="hljs-string">'a'</span>, <span class="hljs-keyword">length</span>: <span class="hljs-number">6</span> }, <span class="hljs-string">'foo'</span>, <span class="hljs-string">'bar'</span> ]
console.log(<span class="hljs-string">'obj: '</span>, obj1);<span class="hljs-regexp">//</span> { <span class="hljs-string">'0'</span>: <span class="hljs-string">'c'</span>, <span class="hljs-string">'1'</span>: <span class="hljs-string">'b'</span>, <span class="hljs-string">'2'</span>: <span class="hljs-string">'a'</span>, <span class="hljs-keyword">length</span>: <span class="hljs-number">6</span> }</code></pre>
<p>可以看到<code>obj1</code>并不会改变，不会像<code>push</code>一样会接着形成一个类数组的对象.</p>
<h2 id="articleHeader5">Array.prototype.splice</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
  0: 'c',
  1: 'b',
  2: 'a',
  length: 6
}
var arr = [].splice.call(obj1, 0, 1);
console.log('arr: ', arr);// [ 'c' ]
console.log('obj: ', obj1);// { '0': 'b', '1': 'a', length: 5 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>var obj1 = {
  <span class="hljs-number">0</span>: <span class="hljs-string">'c'</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">'b'</span>,
  <span class="hljs-number">2</span>: <span class="hljs-string">'a'</span>,
  length: <span class="hljs-number">6</span>
}
var arr = [].splice.call(obj1, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>);
console.log(<span class="hljs-string">'arr: '</span>, arr);<span class="hljs-regexp">//</span> [ <span class="hljs-string">'c'</span> ]
console.log(<span class="hljs-string">'obj: '</span>, obj1);<span class="hljs-regexp">//</span> { <span class="hljs-string">'0'</span>: <span class="hljs-string">'b'</span>, <span class="hljs-string">'1'</span>: <span class="hljs-string">'a'</span>, length: <span class="hljs-number">5</span> }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
  0: 'c',
  1: 'b',
  2: 'a',
  length: 6
}
var arr = [].splice.call(obj1, 1, 0, 'foo','bar');
console.log('arr: ', arr);// []
console.log('obj: ', obj1);// { '0': 'c', '1': 'foo', '2': 'bar', '3': 'b', '4': 'a', length: 8 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code><span class="hljs-keyword">var</span> obj1 = {
  <span class="hljs-number">0</span>: <span class="hljs-string">'c'</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">'b'</span>,
  <span class="hljs-number">2</span>: <span class="hljs-string">'a'</span>,
  length: <span class="hljs-number">6</span>
}
<span class="hljs-keyword">var</span> arr = [].splice.call(obj1, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-string">'foo'</span>,<span class="hljs-string">'bar'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'arr: '</span>, arr);<span class="hljs-regexp">// []
console.log('obj: ', obj1);//</span> { <span class="hljs-string">'0'</span>: <span class="hljs-string">'c'</span>, <span class="hljs-string">'1'</span>: <span class="hljs-string">'foo'</span>, <span class="hljs-string">'2'</span>: <span class="hljs-string">'bar'</span>, <span class="hljs-string">'3'</span>: <span class="hljs-string">'b'</span>, <span class="hljs-string">'4'</span>: <span class="hljs-string">'a'</span>, length: <span class="hljs-number">8</span> }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
  0: 'c',
  1: 'b',
  2: 'a',
  length: 6
}
var arr = [].splice.call(obj1, 1, 1, 'foo','bar');
console.log('arr: ', arr);// [ 'b' ]
console.log('obj: ', obj1);// { '0': 'c', '1': 'foo', '2': 'bar', '3': 'a', length: 7 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>var obj1 = {
  <span class="hljs-number">0</span>: <span class="hljs-string">'c'</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">'b'</span>,
  <span class="hljs-number">2</span>: <span class="hljs-string">'a'</span>,
  length: <span class="hljs-number">6</span>
}
var arr = [].splice.call(obj1, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-string">'foo'</span>,<span class="hljs-string">'bar'</span>);
console.log(<span class="hljs-string">'arr: '</span>, arr);<span class="hljs-regexp">//</span> [ <span class="hljs-string">'b'</span> ]
console.log(<span class="hljs-string">'obj: '</span>, obj1);<span class="hljs-regexp">//</span> { <span class="hljs-string">'0'</span>: <span class="hljs-string">'c'</span>, <span class="hljs-string">'1'</span>: <span class="hljs-string">'foo'</span>, <span class="hljs-string">'2'</span>: <span class="hljs-string">'bar'</span>, <span class="hljs-string">'3'</span>: <span class="hljs-string">'a'</span>, length: <span class="hljs-number">7</span> }</code></pre>
<p><code>splice</code>的行为回归了，它现在对<code>obj1</code>产生影响，并且是我们预计的样子</p>
<h2 id="articleHeader6">Array.prototype.every</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
  0: 'c',
  1: 'b',
  2: 'a',
  length: 6
}
var arr = [].every.call(obj1, function (val) {
  return val === 'a' || val === 'c'
});
console.log('arr: ', arr);// false
console.log('obj: ', obj1);// { '0': 'c', '1': 'b', '2': 'a', length: 6 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>var obj1 = {
  <span class="hljs-number">0</span>: <span class="hljs-string">'c'</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">'b'</span>,
  <span class="hljs-number">2</span>: <span class="hljs-string">'a'</span>,
  length: <span class="hljs-number">6</span>
}
var arr = [].every.call(obj1, <span class="hljs-keyword">function</span> <span class="hljs-title"></span>(val) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">val</span> === <span class="hljs-string">'a'</span> || val === <span class="hljs-string">'c'</span>
});
console.log(<span class="hljs-symbol">'arr</span>: ', arr);// <span class="hljs-literal">false</span>
console.log(<span class="hljs-symbol">'obj</span>: ', obj1);// { <span class="hljs-string">'0'</span>: <span class="hljs-string">'c'</span>, <span class="hljs-string">'1'</span>: <span class="hljs-string">'b'</span>, <span class="hljs-string">'2'</span>: <span class="hljs-string">'a'</span>, length: <span class="hljs-number">6</span> }</code></pre>
<h2 id="articleHeader7">Array.prototype.filter</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
  0: 'c',
  1: 'b',
  2: 'a',
  length: 6
}
var arr = [].filter.call(obj1, function (val) {
  return val === 'a' || val === 'c'
});
console.log('arr: ', arr);// [ 'c', 'a' ]
console.log('obj: ', obj1);// { '0': 'c', '1': 'b', '2': 'a', length: 6 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>var obj1 = {
  <span class="hljs-number">0</span>: <span class="hljs-string">'c'</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">'b'</span>,
  <span class="hljs-number">2</span>: <span class="hljs-string">'a'</span>,
  length: <span class="hljs-number">6</span>
}
var arr = [].filter.call(obj1, <span class="hljs-keyword">function</span> <span class="hljs-title"></span>(val) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">val</span> === <span class="hljs-string">'a'</span> || val === <span class="hljs-string">'c'</span>
});
console.log(<span class="hljs-symbol">'arr</span>: ', arr);// [ <span class="hljs-string">'c'</span>, <span class="hljs-string">'a'</span> ]
console.log(<span class="hljs-symbol">'obj</span>: ', obj1);// { <span class="hljs-string">'0'</span>: <span class="hljs-string">'c'</span>, <span class="hljs-string">'1'</span>: <span class="hljs-string">'b'</span>, <span class="hljs-string">'2'</span>: <span class="hljs-string">'a'</span>, length: <span class="hljs-number">6</span> }</code></pre>
<h2 id="articleHeader8">Array.prototype.forEach</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
  0: 'c',
  1: 'b',
  2: 'a',
  length: 6
}
var arr = [].forEach.call(obj1, function (val) {
  return val + ' add';
});
console.log('arr: ', arr);// undefined
console.log('obj: ', obj1);// { '0': 'c', '1': 'b', '2': 'a', length: 6 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj1 = {
  <span class="hljs-number">0</span>: <span class="hljs-string">'c'</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">'b'</span>,
  <span class="hljs-number">2</span>: <span class="hljs-string">'a'</span>,
  <span class="hljs-attr">length</span>: <span class="hljs-number">6</span>
}
<span class="hljs-keyword">var</span> arr = [].forEach.call(obj1, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">val</span>) </span>{
  <span class="hljs-keyword">return</span> val + <span class="hljs-string">' add'</span>;
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'arr: '</span>, arr);<span class="hljs-comment">// undefined</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'obj: '</span>, obj1);<span class="hljs-comment">// { '0': 'c', '1': 'b', '2': 'a', length: 6 }</span></code></pre>
<h2 id="articleHeader9">Array.prototype.map</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
  0: 'c',
  1: 'b',
  2: 'a',
  length: 6
}
var arr = [].map.call(obj1, function (val) {
  return val + ' add';
});
console.log('arr: ', arr);// [ 'c add', 'b add', 'a add', , ,  ]
console.log('obj: ', obj1);// { '0': 'c', '1': 'b', '2': 'a', length: 6 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>var obj1 = {
  <span class="hljs-number">0</span>: <span class="hljs-string">'c'</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">'b'</span>,
  <span class="hljs-number">2</span>: <span class="hljs-string">'a'</span>,
  length: <span class="hljs-number">6</span>
}
var arr = [].<span class="hljs-keyword">map</span>.call(obj1, <span class="hljs-keyword">function</span> (val) {
  return val + <span class="hljs-string">' add'</span>;
});
console.log(<span class="hljs-string">'arr: '</span>, arr);// [ <span class="hljs-string">'c add'</span>, <span class="hljs-string">'b add'</span>, <span class="hljs-string">'a add'</span>, , ,  ]
console.log(<span class="hljs-string">'obj: '</span>, obj1);// { <span class="hljs-string">'0'</span>: <span class="hljs-string">'c'</span>, <span class="hljs-string">'1'</span>: <span class="hljs-string">'b'</span>, <span class="hljs-string">'2'</span>: <span class="hljs-string">'a'</span>, length: <span class="hljs-number">6</span> }</code></pre>
<h2 id="articleHeader10">Array.prototype.reduce</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
  0: 'c',
  1: 'b',
  2: 'a',
  length: 6
}
var arr = [].reduce.call(obj1, function (pre, cur) {
  return pre + ' ' + cur
});
console.log('arr: ', arr);// 'c b a'
console.log('obj: ', obj1);// { '0': 'c', '1': 'b', '2': 'a', length: 6 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>var obj1 = {
  <span class="hljs-number">0</span>: <span class="hljs-string">'c'</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">'b'</span>,
  <span class="hljs-number">2</span>: <span class="hljs-string">'a'</span>,
  length: <span class="hljs-number">6</span>
}
var arr = [].reduce.call(obj1, <span class="hljs-keyword">function</span> <span class="hljs-title"></span>(pre, cur) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">pre</span> + <span class="hljs-string">' '</span> + cur
});
console.log(<span class="hljs-symbol">'arr</span>: ', arr);// <span class="hljs-symbol">'c</span> b a'
console.log(<span class="hljs-symbol">'obj</span>: ', obj1);// { <span class="hljs-string">'0'</span>: <span class="hljs-string">'c'</span>, <span class="hljs-string">'1'</span>: <span class="hljs-string">'b'</span>, <span class="hljs-string">'2'</span>: <span class="hljs-string">'a'</span>, length: <span class="hljs-number">6</span> }</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Array.prototype.slice及其他Array方法

## 原文链接
[https://segmentfault.com/a/1190000008940666](https://segmentfault.com/a/1190000008940666)

