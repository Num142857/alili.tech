---
title: 'JavaScript基础心法——深浅拷贝' 
date: 2018-12-27 2:30:12
hidden: true
slug: z6v4rcqcsxd
categories: [reprint]
---

{{< raw >}}

                    
<p>原文地址：<a href="https://github.com/axuebin/articles/issues/20" rel="nofollow noreferrer" target="_blank">JavaScript基础心法——深浅拷贝</a></p>
<p>欢迎star。</p>
<p>如果有错误的地方欢迎指正。</p>
<hr>
<p>浅拷贝和深拷贝都是对于JS中的引用类型而言的，浅拷贝就只是复制对象的引用，如果拷贝后的对象发生变化，原对象也会发生变化。只有深拷贝才是真正地对对象的拷贝。</p>
<h2 id="articleHeader0">前言</h2>
<p>说到深浅拷贝，必须先提到的是JavaScript的数据类型，之前的一篇文章<a href="https://github.com/axuebin/articles/issues/3" rel="nofollow noreferrer" target="_blank">JavaScript基础心法——数据类型</a>说的很清楚了，这里就不多说了。</p>
<p>需要知道的就是一点：JavaScript的数据类型分为基本数据类型和引用数据类型。</p>
<p>对于基本数据类型的拷贝，并没有深浅拷贝的区别，我们所说的深浅拷贝都是对于引用数据类型而言的。</p>
<h2 id="articleHeader1">浅拷贝</h2>
<p>浅拷贝的意思就是只复制引用，而未复制真正的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const originArray = [1,2,3,4,5];
const originObj = {a:'a',b:'b',c:[1,2,3],d:{dd:'dd'"}}";

const cloneArray = originArray;
const cloneObj = originObj;

console.log(cloneArray); // [1,2,3,4,5]
console.log(originObj); // {a:'a',b:'b',c:Array[3],d:{dd:'dd'"}}"

cloneArray.push(6);
cloneObj.a = {aa:'aa'};

console.log(cloneArray); // [1,2,3,4,5,6]
console.log(originArray); // [1,2,3,4,5,6]

console.log(cloneObj); // {a:{aa:'aa'},b:'b',c:Array[3],d:{dd:'dd'"}}"
console.log(originArray); // {a:{aa:'aa'},b:'b',c:Array[3],d:{dd:'dd'"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> originArray = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
<span class="hljs-keyword">const</span> originObj = {<span class="hljs-attr">a</span>:<span class="hljs-string">'a'</span>,<span class="hljs-attr">b</span>:<span class="hljs-string">'b'</span>,<span class="hljs-attr">c</span>:[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>],<span class="hljs-attr">d</span>:{<span class="hljs-attr">dd</span>:<span class="hljs-string">'dd'</span>"}}";

<span class="hljs-keyword">const</span> cloneArray = originArray;
<span class="hljs-keyword">const</span> cloneObj = originObj;

<span class="hljs-built_in">console</span>.log(cloneArray); <span class="hljs-comment">// [1,2,3,4,5]</span>
<span class="hljs-built_in">console</span>.log(originObj); <span class="hljs-comment">// {a:'a',b:'b',c:Array[3],d:{dd:'dd'"}}"</span>

cloneArray.push(<span class="hljs-number">6</span>);
cloneObj.a = {<span class="hljs-attr">aa</span>:<span class="hljs-string">'aa'</span>};

<span class="hljs-built_in">console</span>.log(cloneArray); <span class="hljs-comment">// [1,2,3,4,5,6]</span>
<span class="hljs-built_in">console</span>.log(originArray); <span class="hljs-comment">// [1,2,3,4,5,6]</span>

<span class="hljs-built_in">console</span>.log(cloneObj); <span class="hljs-comment">// {a:{aa:'aa'},b:'b',c:Array[3],d:{dd:'dd'"}}"</span>
<span class="hljs-built_in">console</span>.log(originArray); <span class="hljs-comment">// {a:{aa:'aa'},b:'b',c:Array[3],d:{dd:'dd'"}}"</span></code></pre>
<p>上面的代码是最简单的利用 <code>=</code> 赋值操作符实现了一个浅拷贝，可以很清楚的看到，随着 <code>cloneArray</code> 和 <code>cloneObj</code> 改变，<code>originArray</code> 和 <code>originObj</code> 也随着发生了变化。</p>
<h2 id="articleHeader2">深拷贝</h2>
<p>深拷贝就是对目标的完全拷贝，不像浅拷贝那样只是复制了一层引用，就连值也都复制了。</p>
<p>只要进行了深拷贝，它们老死不相往来，谁也不会影响谁。</p>
<p>目前实现深拷贝的方法不多，主要是两种：</p>
<ol>
<li>利用 <code>JSON</code> 对象中的 <code>parse</code> 和 <code>stringify</code>
</li>
<li>利用递归来实现每一层都重新创建对象并赋值</li>
</ol>
<h3 id="articleHeader3">JSON.stringify/parse的方法</h3>
<p>先看看这两个方法吧：</p>
<blockquote><p>The JSON.stringify() method converts a JavaScript value to a JSON string.</p></blockquote>
<p><code>JSON.stringify</code> 是将一个 <code>JavaScript</code> 值转成一个 <code>JSON</code> 字符串。</p>
<blockquote><p>The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string.</p></blockquote>
<p><code>JSON.parse</code> 是将一个 <code>JSON</code> 字符串转成一个 <code>JavaScript</code> 值或对象。</p>
<p>很好理解吧，就是 <code>JavaScript</code> 值和 <code>JSON</code> 字符串的相互转换。</p>
<p>它能实现深拷贝呢？我们来试试。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const originArray = [1,2,3,4,5];
const cloneArray = JSON.parse(JSON.stringify(originArray));
console.log(cloneArray === originArray); // false

const originObj = {a:'a',b:'b',c:[1,2,3],d:{dd:'dd'"}}";
const cloneObj = JSON.parse(JSON.stringify(originObj));
console.log(cloneObj === originObj); // false

cloneObj.a = 'aa';
cloneObj.c = [1,1,1];
cloneObj.d.dd = 'doubled';

console.log(cloneObj); // {a:'aa',b:'b',c:[1,1,1],d:{dd:'doubled'"}}";
console.log(originObj); // {a:'a',b:'b',c:[1,2,3],d:{dd:'dd'"}}";" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> originArray = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
<span class="hljs-keyword">const</span> cloneArray = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(originArray));
<span class="hljs-built_in">console</span>.log(cloneArray === originArray); <span class="hljs-comment">// false</span>

<span class="hljs-keyword">const</span> originObj = {<span class="hljs-attr">a</span>:<span class="hljs-string">'a'</span>,<span class="hljs-attr">b</span>:<span class="hljs-string">'b'</span>,<span class="hljs-attr">c</span>:[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>],<span class="hljs-attr">d</span>:{<span class="hljs-attr">dd</span>:<span class="hljs-string">'dd'</span>"}}";
<span class="hljs-keyword">const</span> cloneObj = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(originObj));
<span class="hljs-built_in">console</span>.log(cloneObj === originObj); <span class="hljs-comment">// false</span>

cloneObj.a = <span class="hljs-string">'aa'</span>;
cloneObj.c = [<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>];
cloneObj.d.dd = <span class="hljs-string">'doubled'</span>;

<span class="hljs-built_in">console</span>.log(cloneObj); <span class="hljs-comment">// {a:'aa',b:'b',c:[1,1,1],d:{dd:'doubled'"}}";</span>
<span class="hljs-built_in">console</span>.log(originObj); <span class="hljs-comment">// {a:'a',b:'b',c:[1,2,3],d:{dd:'dd'"}}";</span></code></pre>
<p>确实是深拷贝，也很方便。但是，这个方法只能适用于一些简单的情况。比如下面这样的一个对象就不适用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const originObj = {
  name:'axuebin',
  sayHello:function(){
    console.log('Hello World');
  }
}
console.log(originObj); // {name: &quot;axuebin&quot;, sayHello: ƒ}
const cloneObj = JSON.parse(JSON.stringify(originObj));
console.log(cloneObj); // {name: &quot;axuebin&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> originObj = {
  <span class="hljs-attr">name</span>:<span class="hljs-string">'axuebin'</span>,
  <span class="hljs-attr">sayHello</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello World'</span>);
  }
}
<span class="hljs-built_in">console</span>.log(originObj); <span class="hljs-comment">// {name: "axuebin", sayHello: ƒ}</span>
<span class="hljs-keyword">const</span> cloneObj = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(originObj));
<span class="hljs-built_in">console</span>.log(cloneObj); <span class="hljs-comment">// {name: "axuebin"}</span></code></pre>
<p>发现在 <code>cloneObj</code> 中，有属性丢失了。。。那是为什么呢？</p>
<p>在 <code>MDN</code> 上找到了原因：</p>
<blockquote><p>If undefined, a function, or a symbol is encountered during conversion it is either omitted (when it is found in an object) or censored to null (when it is found in an array). JSON.stringify can also just return undefined when passing in "pure" values like JSON.stringify(function(){}) or JSON.stringify(undefined).</p></blockquote>
<p><code>undefined</code>、<code>function</code>、<code>symbol</code> 会在转换过程中被忽略。。。</p>
<p>明白了吧，就是说如果对象中含有一个函数时（很常见），就不能用这个方法进行深拷贝。</p>
<h3 id="articleHeader4">递归的方法</h3>
<p>递归的思想就很简单了，就是对每一层的数据都实现一次 <code>创建对象-&gt;对象赋值</code> 的操作，简单粗暴上代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function deepClone(source){
  const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
  for(let keys in source){ // 遍历目标
    if(source.hasOwnProperty(keys)){
      if(source[keys] &amp;&amp; typeof source[keys] === 'object'){ // 如果值是对象，就递归一下
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      }else{ // 如果不是，就直接赋值
        targetObj[keys] = source[keys];
      }
    } 
  }
  return targetObj;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepClone</span>(<span class="hljs-params">source</span>)</span>{
  <span class="hljs-keyword">const</span> targetObj = source.constructor === <span class="hljs-built_in">Array</span> ? [] : {}; <span class="hljs-comment">// 判断复制的目标是数组还是对象</span>
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> keys <span class="hljs-keyword">in</span> source){ <span class="hljs-comment">// 遍历目标</span>
    <span class="hljs-keyword">if</span>(source.hasOwnProperty(keys)){
      <span class="hljs-keyword">if</span>(source[keys] &amp;&amp; <span class="hljs-keyword">typeof</span> source[keys] === <span class="hljs-string">'object'</span>){ <span class="hljs-comment">// 如果值是对象，就递归一下</span>
        targetObj[keys] = source[keys].constructor === <span class="hljs-built_in">Array</span> ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      }<span class="hljs-keyword">else</span>{ <span class="hljs-comment">// 如果不是，就直接赋值</span>
        targetObj[keys] = source[keys];
      }
    } 
  }
  <span class="hljs-keyword">return</span> targetObj;
}</code></pre>
<p>我们来试试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const originObj = {a:'a',b:'b',c:[1,2,3],d:{dd:'dd'"}}";
const cloneObj = deepClone(originObj);
console.log(cloneObj === originObj); // false

cloneObj.a = 'aa';
cloneObj.c = [1,1,1];
cloneObj.d.dd = 'doubled';

console.log(cloneObj); // {a:'aa',b:'b',c:[1,1,1],d:{dd:'doubled'"}}";
console.log(originObj); // {a:'a',b:'b',c:[1,2,3],d:{dd:'dd'"}}";" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> originObj = {<span class="hljs-attr">a</span>:<span class="hljs-string">'a'</span>,<span class="hljs-attr">b</span>:<span class="hljs-string">'b'</span>,<span class="hljs-attr">c</span>:[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>],<span class="hljs-attr">d</span>:{<span class="hljs-attr">dd</span>:<span class="hljs-string">'dd'</span>"}}";
<span class="hljs-keyword">const</span> cloneObj = deepClone(originObj);
<span class="hljs-built_in">console</span>.log(cloneObj === originObj); <span class="hljs-comment">// false</span>

cloneObj.a = <span class="hljs-string">'aa'</span>;
cloneObj.c = [<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>];
cloneObj.d.dd = <span class="hljs-string">'doubled'</span>;

<span class="hljs-built_in">console</span>.log(cloneObj); <span class="hljs-comment">// {a:'aa',b:'b',c:[1,1,1],d:{dd:'doubled'"}}";</span>
<span class="hljs-built_in">console</span>.log(originObj); <span class="hljs-comment">// {a:'a',b:'b',c:[1,2,3],d:{dd:'dd'"}}";</span></code></pre>
<p>可以。那再试试带有函数的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const originObj = {
  name:'axuebin',
  sayHello:function(){
    console.log('Hello World');
  }
}
console.log(originObj); // {name: &quot;axuebin&quot;, sayHello: ƒ}
const cloneObj = deepClone(originObj);
console.log(cloneObj); // {name: &quot;axuebin&quot;, sayHello: ƒ}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> originObj = {
  <span class="hljs-attr">name</span>:<span class="hljs-string">'axuebin'</span>,
  <span class="hljs-attr">sayHello</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello World'</span>);
  }
}
<span class="hljs-built_in">console</span>.log(originObj); <span class="hljs-comment">// {name: "axuebin", sayHello: ƒ}</span>
<span class="hljs-keyword">const</span> cloneObj = deepClone(originObj);
<span class="hljs-built_in">console</span>.log(cloneObj); <span class="hljs-comment">// {name: "axuebin", sayHello: ƒ}</span></code></pre>
<p>也可以。搞定。</p>
<p>是不是以为这样就完了？？ 当然不是。</p>
<h2 id="articleHeader5">JavaScript中的拷贝方法</h2>
<p>我们知道在 <code>JavaScript</code> 中，数组有两个方法 <code>concat</code> 和 <code>slice</code> 是可以实现对原数组的拷贝的，这两个方法都不会修改原数组，而是返回一个修改后的新数组。</p>
<p>同时，ES6 中 引入了 <code>Object.assgn</code> 方法和 <code>...</code> 展开运算符也能实现对对象的拷贝。</p>
<p>那它们是浅拷贝还是深拷贝呢？</p>
<h3 id="articleHeader6">concat</h3>
<blockquote><p>The concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.</p></blockquote>
<p>该方法可以连接两个或者更多的数组，但是它不会修改已存在的数组，而是返回一个新数组。</p>
<p>看着这意思，很像是深拷贝啊，我们来试试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const originArray = [1,2,3,4,5];
const cloneArray = originArray.concat();

console.log(cloneArray === originArray); // false
cloneArray.push(6); // [1,2,3,4,5,6]
console.log(originArray); [1,2,3,4,5];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> originArray = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
<span class="hljs-keyword">const</span> cloneArray = originArray.concat();

<span class="hljs-built_in">console</span>.log(cloneArray === originArray); <span class="hljs-comment">// false</span>
cloneArray.push(<span class="hljs-number">6</span>); <span class="hljs-comment">// [1,2,3,4,5,6]</span>
<span class="hljs-built_in">console</span>.log(originArray); [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];</code></pre>
<p>看上去是深拷贝的。</p>
<p>我们来考虑一个问题，如果这个对象是多层的，会怎样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const originArray = [1,[1,2,3],{a:1}];
const cloneArray = originArray.concat();
console.log(cloneArray === originArray); // false
cloneArray[1].push(4);
cloneArray[2].a = 2; 
console.log(originArray); // [1,[1,2,3,4],{a:2}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> originArray = [<span class="hljs-number">1</span>,[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>],{<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>}];
<span class="hljs-keyword">const</span> cloneArray = originArray.concat();
<span class="hljs-built_in">console</span>.log(cloneArray === originArray); <span class="hljs-comment">// false</span>
cloneArray[<span class="hljs-number">1</span>].push(<span class="hljs-number">4</span>);
cloneArray[<span class="hljs-number">2</span>].a = <span class="hljs-number">2</span>; 
<span class="hljs-built_in">console</span>.log(originArray); <span class="hljs-comment">// [1,[1,2,3,4],{a:2}]</span></code></pre>
<p><code>originArray</code> 中含有数组 <code>[1,2,3]</code> 和对象 <code>{a:1}</code>，如果我们直接修改数组和对象，不会影响 <code>originArray</code>，但是我们修改数组 <code>[1,2,3]</code> 或对象 <code>{a:1}</code> 时，发现 <code>originArray</code> 也发生了变化。 </p>
<p><strong>结论：<code>concat</code> 只是对数组的第一层进行深拷贝。</strong></p>
<h3 id="articleHeader7">slice</h3>
<blockquote><p>The slice() method returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified.</p></blockquote>
<p>解释中都直接写道是 <code>a shallow copy</code> 了 ~</p>
<p>但是，并不是！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const originArray = [1,2,3,4,5];
const cloneArray = originArray.slice();

console.log(cloneArray === originArray); // false
cloneArray.push(6); // [1,2,3,4,5,6]
console.log(originArray); [1,2,3,4,5];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> originArray = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
<span class="hljs-keyword">const</span> cloneArray = originArray.slice();

<span class="hljs-built_in">console</span>.log(cloneArray === originArray); <span class="hljs-comment">// false</span>
cloneArray.push(<span class="hljs-number">6</span>); <span class="hljs-comment">// [1,2,3,4,5,6]</span>
<span class="hljs-built_in">console</span>.log(originArray); [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];</code></pre>
<p>同样地，我们试试多层的数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const originArray = [1,[1,2,3],{a:1}];
const cloneArray = originArray.slice();
console.log(cloneArray === originArray); // false
cloneArray[1].push(4);
cloneArray[2].a = 2; 
console.log(originArray); // [1,[1,2,3,4],{a:2}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> originArray = [<span class="hljs-number">1</span>,[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>],{<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>}];
<span class="hljs-keyword">const</span> cloneArray = originArray.slice();
<span class="hljs-built_in">console</span>.log(cloneArray === originArray); <span class="hljs-comment">// false</span>
cloneArray[<span class="hljs-number">1</span>].push(<span class="hljs-number">4</span>);
cloneArray[<span class="hljs-number">2</span>].a = <span class="hljs-number">2</span>; 
<span class="hljs-built_in">console</span>.log(originArray); <span class="hljs-comment">// [1,[1,2,3,4],{a:2}]</span></code></pre>
<p>果然，结果和 <code>concat</code> 是一样的。</p>
<p><strong>结论：<code>slice</code> 只是对数组的第一层进行深拷贝。</strong></p>
<h3 id="articleHeader8">Object.assign()</h3>
<blockquote><p>The Object.assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.</p></blockquote>
<p>复制复制复制。</p>
<p>那到底是浅拷贝还是深拷贝呢？</p>
<p>自己试试吧。。</p>
<p><strong>结论：<code>Object.assign()</code> 拷贝的是属性值。假如源对象的属性值是一个指向对象的引用，它也只拷贝那个引用值。</strong></p>
<h3 id="articleHeader9">... 展开运算符</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const originArray = [1,2,3,4,5,[6,7,8]];
const originObj = {a:1,b:{bb:1"}}";

const cloneArray = [...originArray];
cloneArray[0] = 0;
cloneArray[5].push(9);
console.log(originArray); // [1,2,3,4,5,[6,7,8,9]]

const cloneObj = {...originObj};
cloneObj.a = 2;
cloneObj.b.bb = 2;
console.log(originObj); // {a:1,b:{bb:2"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> originArray = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,[<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">8</span>]];
<span class="hljs-keyword">const</span> originObj = {<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">b</span>:{<span class="hljs-attr">bb</span>:<span class="hljs-number">1</span>"}}";

<span class="hljs-keyword">const</span> cloneArray = [...originArray];
cloneArray[<span class="hljs-number">0</span>] = <span class="hljs-number">0</span>;
cloneArray[<span class="hljs-number">5</span>].push(<span class="hljs-number">9</span>);
<span class="hljs-built_in">console</span>.log(originArray); <span class="hljs-comment">// [1,2,3,4,5,[6,7,8,9]]</span>

<span class="hljs-keyword">const</span> cloneObj = {...originObj};
cloneObj.a = <span class="hljs-number">2</span>;
cloneObj.b.bb = <span class="hljs-number">2</span>;
<span class="hljs-built_in">console</span>.log(originObj); <span class="hljs-comment">// {a:1,b:{bb:2"}}"</span></code></pre>
<p><strong>结论：<code>...</code> 实现的是对象第一层的深拷贝。后面的只是拷贝的引用值。</strong></p>
<h3 id="articleHeader10">首层浅拷贝</h3>
<p>我们知道了，会有一种情况，就是对目标对象的第一层进行深拷贝，然后后面的是浅拷贝，可以称作“首层浅拷贝”。</p>
<p>我们可以自己实现一个这样的函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function shallowClone(source) {
  const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
  for (let keys in source) { // 遍历目标
    if (source.hasOwnProperty(keys)) {
      targetObj[keys] = source[keys];
    }
  }
  return targetObj;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shallowClone</span>(<span class="hljs-params">source</span>) </span>{
  <span class="hljs-keyword">const</span> targetObj = source.constructor === <span class="hljs-built_in">Array</span> ? [] : {}; <span class="hljs-comment">// 判断复制的目标是数组还是对象</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> keys <span class="hljs-keyword">in</span> source) { <span class="hljs-comment">// 遍历目标</span>
    <span class="hljs-keyword">if</span> (source.hasOwnProperty(keys)) {
      targetObj[keys] = source[keys];
    }
  }
  <span class="hljs-keyword">return</span> targetObj;
}</code></pre>
<p>我们来测试一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const originObj = {a:'a',b:'b',c:[1,2,3],d:{dd:'dd'"}}";
const cloneObj = shallowClone(originObj);
console.log(cloneObj === originObj); // false
cloneObj.a='aa';
cloneObj.c=[1,1,1];
cloneObj.d.dd='surprise';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> originObj = {<span class="hljs-attr">a</span>:<span class="hljs-string">'a'</span>,<span class="hljs-attr">b</span>:<span class="hljs-string">'b'</span>,<span class="hljs-attr">c</span>:[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>],<span class="hljs-attr">d</span>:{<span class="hljs-attr">dd</span>:<span class="hljs-string">'dd'</span>"}}";
<span class="hljs-keyword">const</span> cloneObj = shallowClone(originObj);
<span class="hljs-built_in">console</span>.log(cloneObj === originObj); <span class="hljs-comment">// false</span>
cloneObj.a=<span class="hljs-string">'aa'</span>;
cloneObj.c=[<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>];
cloneObj.d.dd=<span class="hljs-string">'surprise'</span>;</code></pre>
<p>经过上面的修改，<code>cloneObj</code> 不用说，肯定是 <code>{a:'aa',b:'b',c:[1,1,1],d:{dd:'surprise'"}}"</code> 了，那 <code>originObj</code> 呢？刚刚我们验证了 <code>cloneObj === originObj</code> 是 <code>false</code>，说明这两个对象引用地址不同啊，那应该就是修改了 <code>cloneObj</code> 并不影响 <code>originObj</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(cloneObj); // {a:'aa',b:'b',c:[1,1,1],d:{dd:'surprise'"}}"
console.log(originObj); // {a:'a',b:'b',c:[1,2,3],d:{dd:'surprise'"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(cloneObj); <span class="hljs-comment">// {a:'aa',b:'b',c:[1,1,1],d:{dd:'surprise'"}}"</span>
<span class="hljs-built_in">console</span>.log(originObj); <span class="hljs-comment">// {a:'a',b:'b',c:[1,2,3],d:{dd:'surprise'"}}"</span></code></pre>
<p>What happend?</p>
<p><code>originObj</code> 中关于 <code>a</code>、<code>c</code>都没被影响，但是 <code>d</code> 中的一个对象被修改了。。。说好的深拷贝呢？不是引用地址都不一样了吗？</p>
<p>原来是这样：</p>
<ol>
<li>从 <code>shallowClone</code> 的代码中我们可以看出，我们只对第一层的目标进行了 <code>深拷贝</code> ，而第二层开始的目标我们是直接利用 <code>=</code> 赋值操作符进行拷贝的。</li>
<li>so，第二层后的目标都只是复制了一个引用，也就是浅拷贝。</li>
</ol>
<h2 id="articleHeader11">总结</h2>
<ol>
<li>赋值运算符 <code>=</code> 实现的是浅拷贝，只拷贝对象的引用值；</li>
<li>JavaScript 中数组和对象自带的拷贝方法都是“首层浅拷贝”；</li>
<li>
<code>JSON.stringify</code> 实现的是深拷贝，但是对目标对象有要求；</li>
<li>若想真正意义上的深拷贝，请递归。</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript基础心法——深浅拷贝

## 原文链接
[https://segmentfault.com/a/1190000011816549](https://segmentfault.com/a/1190000011816549)

