---
title: 'React知识地图--ES6' 
date: 2019-01-06 2:30:10
hidden: true
slug: 4k9fbbh2pkj
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文在我的博客：<a href="https://github.com/YutHelloWorld/Blog/issues/1" rel="nofollow noreferrer" target="_blank">https://github.com/YutHelloWo...</a><br>如果喜欢请start或者watch。这将是我继续写下去的动力。</p></blockquote>
<p>这里梳理下React技术栈需要的最小知识集，让你可以最短时间掌握React,Redux,React-Router,ES6的相关知识，更快的上手React”全家桶“。预计会有ES6、React、Redux、React-Router、Webpack，实时更新目录。</p>
<ul>
<li><a href="https://github.com/YutHelloWorld/Blog/issues/1" rel="nofollow noreferrer" target="_blank">ES6</a></li>
<li><a href="https://github.com/YutHelloWorld/Blog/issues/2" rel="nofollow noreferrer" target="_blank">React</a></li>
<li><a href="https://github.com/YutHelloWorld/Blog/issues/3" rel="nofollow noreferrer" target="_blank">Redux</a></li>
</ul>
<h2 id="articleHeader0">ES6</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010439326" src="https://static.alili.tech/img/remote/1460000010439326" alt="es6" title="es6" style="cursor: pointer;"></span></p>
<h3 id="articleHeader1">变量声明</h3>
<h4>let 和 const</h4>
<p>不要用<code>var</code>，而是用<code>let</code> 和 <code>const</code> 。<code>const</code>声明一个只读的常量，<code>let</code>用来声明变量，<code>const</code> 和 <code>let</code> 都是块级作用域。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const PLUS = 'PLUS';

let availableId = 0;
availableId ++;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> PLUS = <span class="hljs-string">'PLUS'</span>;

<span class="hljs-keyword">let</span> availableId = <span class="hljs-number">0</span>;
availableId ++;</code></pre>
<h4>模板字符串</h4>
<p>模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const user = 'world';
console.log(`hello ${user}`);  // hello world

// 多行（所有的空格和缩进都会被保留在输出之中）
const content = `
  Hello ${firstName},
  Thanks for ordering ${qty} tickets to ${event}.
`;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> user = <span class="hljs-string">'world'</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`hello <span class="hljs-subst">${user}</span>`</span>);  <span class="hljs-comment">// hello world</span>

<span class="hljs-comment">// 多行（所有的空格和缩进都会被保留在输出之中）</span>
<span class="hljs-keyword">const</span> content = <span class="hljs-string">`
  Hello <span class="hljs-subst">${firstName}</span>,
  Thanks for ordering <span class="hljs-subst">${qty}</span> tickets to <span class="hljs-subst">${event}</span>.
`</span>;</code></pre>
<h4>默认参数</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function log(user = 'World') {
  console.log(user);
}

log() //  World" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">log</span>(<span class="hljs-params">user = <span class="hljs-string">'World'</span></span>) </span>{
  <span class="hljs-built_in">console</span>.log(user);
}

log() <span class="hljs-comment">//  World</span></code></pre>
<h3 id="articleHeader2">箭头函数</h3>
<p>ES6 允许使用“箭头”（=&gt;）定义函数。<br>函数的快捷写法，不需要通过 <code>function</code> 关键字创建函数，并且还可以省略 <code>return</code> 关键字。<br>同时，箭头函数还会继承当前上下文的 <code>this</code> 关键字，即：函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES6
function Timer() {
  this.s1 = 0;
  setInterval(() => this.s1++, 1000);
}

// 等同于ES5
function Timer() {
  this.s1 = 0;
  setInterval((function () {
    this.s1++;
  }).bind(this), 1000);
}

const timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100); 
// s1:3
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ES6</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Timer</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.s1 = <span class="hljs-number">0</span>;
  setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.s1++, <span class="hljs-number">1000</span>);
}

<span class="hljs-comment">// 等同于ES5</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Timer</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.s1 = <span class="hljs-number">0</span>;
  setInterval((<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.s1++;
  }).bind(<span class="hljs-keyword">this</span>), <span class="hljs-number">1000</span>);
}

<span class="hljs-keyword">const</span> timer = <span class="hljs-keyword">new</span> Timer();

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'s1: '</span>, timer.s1), <span class="hljs-number">3100</span>); 
<span class="hljs-comment">// s1:3</span>
</code></pre>
<h3 id="articleHeader3">模块的 Import 和 Export</h3>
<p><code>import</code> 用于引入模块，<code>export</code> 用于导出模块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//导出默认, counter.js
export default function counter() { 
  // ...
}

import counter from 'counter'; 

// 普通导出和导入，reducer.js
export const injectReducer = ( ) => {
  //...
}

import { injectReducer } from 'reducers'

// 引入全部并作为 reducers 对象
import * as reducers from './reducers';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//导出默认, counter.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">counter</span>(<span class="hljs-params"></span>) </span>{ 
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-keyword">import</span> counter <span class="hljs-keyword">from</span> <span class="hljs-string">'counter'</span>; 

<span class="hljs-comment">// 普通导出和导入，reducer.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> injectReducer = <span class="hljs-function"><span class="hljs-params">( )</span> =&gt;</span> {
  <span class="hljs-comment">//...</span>
}

<span class="hljs-keyword">import</span> { injectReducer } <span class="hljs-keyword">from</span> <span class="hljs-string">'reducers'</span>

<span class="hljs-comment">// 引入全部并作为 reducers 对象</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> reducers <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers'</span>;
</code></pre>
<h3 id="articleHeader4">ES6 对象和数组</h3>
<h4>解构赋值</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 数组
let [a, b, c] = [1, 2, 3];
a // 1

//对象
let { foo, bar } = { foo: &quot;aaa&quot;, bar: &quot;bbb&quot; };
foo // &quot;aaa&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 数组</span>
<span class="hljs-keyword">let</span> [a, b, c] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
a <span class="hljs-comment">// 1</span>

<span class="hljs-comment">//对象</span>
<span class="hljs-keyword">let</span> { foo, bar } = { <span class="hljs-attr">foo</span>: <span class="hljs-string">"aaa"</span>, <span class="hljs-attr">bar</span>: <span class="hljs-string">"bbb"</span> };
foo <span class="hljs-comment">// "aaa"</span></code></pre>
<p>函数的参数也可以使用解构赋值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add ([x, y]) {
  return x + y;
}

add([1, 2]); // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span> (<span class="hljs-params">[x, y]</span>) </span>{
  <span class="hljs-keyword">return</span> x + y;
}

add([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>]); <span class="hljs-comment">// 3</span></code></pre>
<p>函数参数的逐层解析</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const x = {
  a : {
    b : 1
  },
  c : 2
}
const counter = ({a : {b}, c}) => b+c
counter(x) // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> x = {
  <span class="hljs-attr">a</span> : {
    <span class="hljs-attr">b</span> : <span class="hljs-number">1</span>
  },
  <span class="hljs-attr">c</span> : <span class="hljs-number">2</span>
}
<span class="hljs-keyword">const</span> counter = <span class="hljs-function">(<span class="hljs-params">{a : {b}, c}</span>) =&gt;</span> b+c
counter(x) <span class="hljs-comment">// 3</span></code></pre>
<h4>属性的简洁表示法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const foo = 'bar';
const baz = {foo};
baz // {foo: &quot;bar&quot;}

// 等同于
const baz = {foo: foo};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> foo = <span class="hljs-string">'bar'</span>;
<span class="hljs-keyword">const</span> baz = {foo};
baz <span class="hljs-comment">// {foo: "bar"}</span>

<span class="hljs-comment">// 等同于</span>
<span class="hljs-keyword">const</span> baz = {<span class="hljs-attr">foo</span>: foo};</code></pre>
<p>除了属性简写，方法也可以简写。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const o = {
  method() {
    return &quot;Hello!&quot;;
  }
};

// 等同于

const o = {
  method: function() {
    return &quot;Hello!&quot;;
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> o = {
  method() {
    <span class="hljs-keyword">return</span> <span class="hljs-string">"Hello!"</span>;
  }
};

<span class="hljs-comment">// 等同于</span>

<span class="hljs-keyword">const</span> o = {
  <span class="hljs-attr">method</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">"Hello!"</span>;
  }
};</code></pre>
<h4>扩展运算符</h4>
<p>扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。<br>组装数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = [1, 2];
const b = [...a, 3];
b // [1,2,3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> a = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
<span class="hljs-keyword">const</span> b = [...a, <span class="hljs-number">3</span>];
b <span class="hljs-comment">// [1,2,3]</span></code></pre>
<p>获取数组部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arr = ['a', 'b', 'c'];
const [first, ...rest] = arr;
rest;  // ['b', 'c']

// With ignore
const [first, , ...rest] = arr;
rest;  // ['c']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> arr = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>];
<span class="hljs-keyword">const</span> [first, ...rest] = arr;
rest;  <span class="hljs-comment">// ['b', 'c']</span>

<span class="hljs-comment">// With ignore</span>
<span class="hljs-keyword">const</span> [first, , ...rest] = arr;
rest;  <span class="hljs-comment">// ['c']</span></code></pre>
<p>还可收集函数参数为数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function directions(first, ...rest) {
  console.log(rest);
}
directions('a', 'b', 'c');  // ['b', 'c'];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">directions</span>(<span class="hljs-params">first, ...rest</span>) </span>{
  <span class="hljs-built_in">console</span>.log(rest);
}
directions(<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>);  <span class="hljs-comment">// ['b', 'c'];</span></code></pre>
<p>代替 apply。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(x, y, z) {}
const args = [1,2,3];

// 下面两句效果相同
foo.apply(null, args);
foo(...args);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">x, y, z</span>) </span>{}
<span class="hljs-keyword">const</span> args = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];

<span class="hljs-comment">// 下面两句效果相同</span>
foo.apply(<span class="hljs-literal">null</span>, args);
foo(...args);</code></pre>
<p>组装对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = { x : 1, y : 2 }
const b = { ...a, z : 3 }
b // {x:1, y: 2, z: 3}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> a = { <span class="hljs-attr">x</span> : <span class="hljs-number">1</span>, <span class="hljs-attr">y</span> : <span class="hljs-number">2</span> }
<span class="hljs-keyword">const</span> b = { ...a, <span class="hljs-attr">z</span> : <span class="hljs-number">3</span> }
b <span class="hljs-comment">// {x:1, y: 2, z: 3}</span></code></pre>
<h3 id="articleHeader5">Promise</h3>
<p>Promise 用于更优雅地处理异步请求。比如发起异步请求：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch('/api/todos')
  .then(res => res.json())
  .then(data => ({ data }))
  .catch(err => ({ err }));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">fetch(<span class="hljs-string">'/api/todos'</span>)
  .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.json())
  .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> ({ data }))
  .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> ({ err }));</code></pre>
<p>定义 Promise 。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const delay = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

delay(1000).then(_ => {
  console.log('executed');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> delay = <span class="hljs-function">(<span class="hljs-params">timeout</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    setTimeout(resolve, timeout);
  });
};

delay(<span class="hljs-number">1000</span>).then(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'executed'</span>);
});</code></pre>
<h3 id="articleHeader6">写在最后</h3>
<p>这只是个简洁的ES6常用特性总结，更全和更详尽的文档请参阅<a href="https://babeljs.io/learn-es2015/" rel="nofollow noreferrer" target="_blank">Learn ES2015</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React知识地图--ES6

## 原文链接
[https://segmentfault.com/a/1190000010458358](https://segmentfault.com/a/1190000010458358)

