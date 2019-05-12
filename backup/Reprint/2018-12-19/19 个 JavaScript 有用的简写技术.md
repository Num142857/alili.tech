---
title: '19 个 JavaScript 有用的简写技术' 
date: 2018-12-19 2:30:07
hidden: true
slug: 1bwcyc8emnd
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.三元操作符</h2>
<p>当想写if...else语句时，使用三元操作符来代替。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const x = 20;
let answer;
if (x > 10) {
    answer = 'is greater';
} else {
    answer = 'is lesser';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> x = <span class="hljs-number">20</span>;
<span class="hljs-keyword">let</span> answer;
<span class="hljs-keyword">if</span> (x &gt; <span class="hljs-number">10</span>) {
    answer = <span class="hljs-string">'is greater'</span>;
} <span class="hljs-keyword">else</span> {
    answer = <span class="hljs-string">'is lesser'</span>;
}</code></pre>
<p>简写：<br><code>const answer = x &gt; 10 ? 'is greater' : 'is lesser';</code></p>
<p>也可以嵌套if语句：<br><code>const big = x &gt; 10 ? " greater 10" : x</code></p>
<h2 id="articleHeader1">2.短路求值简写方式</h2>
<p>当给一个变量分配另一个值时，想确定源始值不是null，undefined或空值。可以写撰写一个多重条件的if语句。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (variable1 !== null || variable1 !== undefined || variable1 !== '') {
     let variable2 = variable1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (variable1 !== <span class="hljs-literal">null</span> || variable1 !== <span class="hljs-literal">undefined</span> || variable1 !== <span class="hljs-string">''</span>) {
     <span class="hljs-keyword">let</span> variable2 = variable1;
}</code></pre>
<p>或者可以使用短路求值方法：<br><code>const variable2 = variable1  || 'new';</code></p>
<h2 id="articleHeader2">3.声明变量简写方法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let x;
let y;
let z = 3;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> x;
<span class="hljs-keyword">let</span> y;
<span class="hljs-keyword">let</span> z = <span class="hljs-number">3</span>;</code></pre>
<p>简写方法：<br><code>let x, y, z=3;</code></p>
<h2 id="articleHeader3">4.if存在条件简写方法</h2>
<p><code>if (likeJavaScript === true)</code></p>
<p>简写：<br><code>if (likeJavaScript)</code></p>
<p>只有likeJavaScript是真值时，二者语句才相等</p>
<p>如果判断值不是真值，则可以这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a;
if ( a !== true ) {
// do something...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> a;
<span class="hljs-keyword">if</span> ( a !== <span class="hljs-literal">true</span> ) {
<span class="hljs-comment">// do something...</span>
}</code></pre>
<p>简写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a;
if ( !a ) {
// do something...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> a;
<span class="hljs-keyword">if</span> ( !a ) {
<span class="hljs-comment">// do something...</span>
}</code></pre>
<h2 id="articleHeader4">5.JavaScript循环简写方法</h2>
<p><code>for (let i = 0; i &lt; allImgs.length; i++)</code></p>
<p>简写：<br><code>for (let index in allImgs)</code><br>也可以使用Array.forEach：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function logArrayElements(element, index, array) {
  console.log(&quot;a[&quot; + index + &quot;] = &quot; + element);
}
[2, 5, 9].forEach(logArrayElements);
// logs:
// a[0] = 2
// a[1] = 5
// a[2] = 9" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logArrayElements</span>(<span class="hljs-params">element, index, array</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"a["</span> + index + <span class="hljs-string">"] = "</span> + element);
}
[<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">9</span>].forEach(logArrayElements);
<span class="hljs-comment">// logs:</span>
<span class="hljs-comment">// a[0] = 2</span>
<span class="hljs-comment">// a[1] = 5</span>
<span class="hljs-comment">// a[2] = 9</span></code></pre>
<h2 id="articleHeader5">6.短路评价</h2>
<p>给一个变量分配的值是通过判断其值是否为null或undefined，则可以：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let dbHost;
if (process.env.DB_HOST) {
  dbHost = process.env.DB_HOST;
} else {
  dbHost = 'localhost';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> dbHost;
<span class="hljs-keyword">if</span> (process.env.DB_HOST) {
  dbHost = process.env.DB_HOST;
} <span class="hljs-keyword">else</span> {
  dbHost = <span class="hljs-string">'localhost'</span>;
}</code></pre>
<p>简写：<br><code>const dbHost = process.env.DB_HOST || 'localhost';</code></p>
<h2 id="articleHeader6">7.十进制指数</h2>
<p>当需要写数字带有很多零时（如10000000），可以采用指数（1e7）来代替这个数字：<br><code>for (let i = 0; i &lt; 10000; i++) {}</code><br>简写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i = 0; i < 1e7; i++) {}

// 下面都是返回true
1e0 === 1;
1e1 === 10;
1e2 === 100;
1e3 === 1000;
1e4 === 10000;
1e5 === 100000;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1e7</span>; i++) {}

<span class="hljs-comment">// 下面都是返回true</span>
<span class="hljs-number">1e0</span> === <span class="hljs-number">1</span>;
<span class="hljs-number">1e1</span> === <span class="hljs-number">10</span>;
<span class="hljs-number">1e2</span> === <span class="hljs-number">100</span>;
<span class="hljs-number">1e3</span> === <span class="hljs-number">1000</span>;
<span class="hljs-number">1e4</span> === <span class="hljs-number">10000</span>;
<span class="hljs-number">1e5</span> === <span class="hljs-number">100000</span>;</code></pre>
<h2 id="articleHeader7">8.对象属性简写</h2>
<p>如果属性名与key名相同，则可以采用ES6的方法：<br><code>const obj = { x:x, y:y };</code></p>
<p>简写：<br><code>const obj = { x, y };</code></p>
<h2 id="articleHeader8">9.箭头函数简写</h2>
<p>传统函数编写方法很容易让人理解和编写，但是当嵌套在另一个函数中，则这些优势就荡然无存。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sayHello(name) {
  console.log('Hello', name);
}

setTimeout(function() {
  console.log('Loaded')
}, 2000);

list.forEach(function(item) {
  console.log(item);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHello</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello'</span>, name);
}

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Loaded'</span>)
}, <span class="hljs-number">2000</span>);

list.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
  <span class="hljs-built_in">console</span>.log(item);
});</code></pre>
<p>简写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sayHello = name => console.log('Hello', name);

setTimeout(() => console.log('Loaded'), 2000);

list.forEach(item => console.log(item));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>sayHello = <span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello'</span>, name);

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Loaded'</span>), <span class="hljs-number">2000</span>);

list.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(item));</code></pre>
<h2 id="articleHeader9">10.隐式返回值简写</h2>
<p>经常使用return语句来返回函数最终结果，一个单独语句的箭头函数能隐式返回其值（函数必须省略{}为了省略return关键字）</p>
<p>为返回多行语句（例如对象字面表达式），则需要使用()包围函数体。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function calcCircumference(diameter) {
  return Math.PI * diameter
}

var func = function func() {
  return { foo: 1 };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">calcCircumference</span>(<span class="hljs-params">diameter</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.PI * diameter
}

<span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">foo</span>: <span class="hljs-number">1</span> };
};</code></pre>
<p>简写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="calcCircumference = diameter => (
  Math.PI * diameter;
)

var func = () => ({ foo: 1 });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">calcCircumference = <span class="hljs-function"><span class="hljs-params">diameter</span> =&gt;</span> (
  <span class="hljs-built_in">Math</span>.PI * diameter;
)

<span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({ <span class="hljs-attr">foo</span>: <span class="hljs-number">1</span> });</code></pre>
<h2 id="articleHeader10">11.默认参数值</h2>
<p>为了给函数中参数传递默认值，通常使用if语句来编写，但是使用ES6定义默认值，则会很简洁：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function volume(l, w, h) {
  if (w === undefined)
    w = 3;
  if (h === undefined)
    h = 4;
  return l * w * h;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">volume</span>(<span class="hljs-params">l, w, h</span>) </span>{
  <span class="hljs-keyword">if</span> (w === <span class="hljs-literal">undefined</span>)
    w = <span class="hljs-number">3</span>;
  <span class="hljs-keyword">if</span> (h === <span class="hljs-literal">undefined</span>)
    h = <span class="hljs-number">4</span>;
  <span class="hljs-keyword">return</span> l * w * h;
}</code></pre>
<p>简写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="volume = (l, w = 3, h = 4 ) => (l * w * h);

volume(2) //output: 24" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">volume = <span class="hljs-function">(<span class="hljs-params">l, w = <span class="hljs-number">3</span>, h = <span class="hljs-number">4</span> </span>) =&gt;</span> (l * w * h);

volume(<span class="hljs-number">2</span>) <span class="hljs-comment">//output: 24</span></code></pre>
<h2 id="articleHeader11">12.模板字符串</h2>
<p>传统的JavaScript语言，输出模板通常是这样写的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const welcome = 'You have logged in as ' + first + ' ' + last + '.'

const db = 'http://' + host + ':' + port + '/' + database;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> welcome = <span class="hljs-string">'You have logged in as '</span> + first + <span class="hljs-string">' '</span> + last + <span class="hljs-string">'.'</span>

<span class="hljs-keyword">const</span> db = <span class="hljs-string">'http://'</span> + host + <span class="hljs-string">':'</span> + port + <span class="hljs-string">'/'</span> + database;</code></pre>
<p>ES6可以使用反引号和${}简写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const welcome = `You have logged in as ${first} ${last}`;

const db = `http://${host}:${port}/${database}`;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> welcome = <span class="hljs-string">`You have logged in as <span class="hljs-subst">${first}</span> <span class="hljs-subst">${last}</span>`</span>;

<span class="hljs-keyword">const</span> db = <span class="hljs-string">`http://<span class="hljs-subst">${host}</span>:<span class="hljs-subst">${port}</span>/<span class="hljs-subst">${database}</span>`</span>;</code></pre>
<h2 id="articleHeader12">13.解构赋值简写方法</h2>
<p>在web框架中，经常需要从组件和API之间来回传递数组或对象字面形式的数据，然后需要解构它</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const observable = require('mobx/observable');
const action = require('mobx/action');
const runInAction = require('mobx/runInAction');

const store = this.props.store;
const form = this.props.form;
const loading = this.props.loading;
const errors = this.props.errors;
const entity = this.props.entity;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> observable = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mobx/observable'</span>);
<span class="hljs-keyword">const</span> action = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mobx/action'</span>);
<span class="hljs-keyword">const</span> runInAction = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mobx/runInAction'</span>);

<span class="hljs-keyword">const</span> store = <span class="hljs-keyword">this</span>.props.store;
<span class="hljs-keyword">const</span> form = <span class="hljs-keyword">this</span>.props.form;
<span class="hljs-keyword">const</span> loading = <span class="hljs-keyword">this</span>.props.loading;
<span class="hljs-keyword">const</span> errors = <span class="hljs-keyword">this</span>.props.errors;
<span class="hljs-keyword">const</span> entity = <span class="hljs-keyword">this</span>.props.entity;</code></pre>
<p>简写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { observable, action, runInAction } from 'mobx';

const { store, form, loading, errors, entity } = this.props;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { observable, action, runInAction } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx'</span>;

<span class="hljs-keyword">const</span> { store, form, loading, errors, entity } = <span class="hljs-keyword">this</span>.props;</code></pre>
<p>也可以分配变量名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { store, form, loading, errors, entity:contact } = this.props;
//最后一个变量名为contact" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> { store, form, loading, errors, <span class="hljs-attr">entity</span>:contact } = <span class="hljs-keyword">this</span>.props;
<span class="hljs-comment">//最后一个变量名为contact</span></code></pre>
<h2 id="articleHeader13">14.多行字符串简写</h2>
<p>需要输出多行字符串，需要使用+来拼接：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const lorem = 'Lorem ipsum dolor sit amet, consectetur\n\t'
    + 'adipisicing elit, sed do eiusmod tempor incididunt\n\t'
    + 'ut labore et dolore magna aliqua. Ut enim ad minim\n\t'
    + 'veniam, quis nostrud exercitation ullamco laboris\n\t'
    + 'nisi ut aliquip ex ea commodo consequat. Duis aute\n\t'
    + 'irure dolor in reprehenderit in voluptate velit esse.\n\t'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> lorem = <span class="hljs-string">'Lorem ipsum dolor sit amet, consectetur\n\t'</span>
    + <span class="hljs-string">'adipisicing elit, sed do eiusmod tempor incididunt\n\t'</span>
    + <span class="hljs-string">'ut labore et dolore magna aliqua. Ut enim ad minim\n\t'</span>
    + <span class="hljs-string">'veniam, quis nostrud exercitation ullamco laboris\n\t'</span>
    + <span class="hljs-string">'nisi ut aliquip ex ea commodo consequat. Duis aute\n\t'</span>
    + <span class="hljs-string">'irure dolor in reprehenderit in voluptate velit esse.\n\t'</span></code></pre>
<p>使用反引号，则可以达到简写作用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const lorem = `Lorem ipsum dolor sit amet, consectetur
    adipisicing elit, sed do eiusmod tempor incididunt
    ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris
    nisi ut aliquip ex ea commodo consequat. Duis aute
    irure dolor in reprehenderit in voluptate velit esse.`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> lorem = <span class="hljs-string">`Lorem ipsum dolor sit amet, consectetur
    adipisicing elit, sed do eiusmod tempor incididunt
    ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris
    nisi ut aliquip ex ea commodo consequat. Duis aute
    irure dolor in reprehenderit in voluptate velit esse.`</span></code></pre>
<h2 id="articleHeader14">15.扩展运算符简写</h2>
<p>扩展运算符有几种用例让JavaScript代码更加有效使用，可以用来代替某个数组函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// joining arrays
const odd = [1, 3, 5];
const nums = [2 ,4 , 6].concat(odd);

// cloning arrays
const arr = [1, 2, 3, 4];
const arr2 = arr.slice()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// joining arrays</span>
<span class="hljs-keyword">const</span> odd = [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>];
<span class="hljs-keyword">const</span> nums = [<span class="hljs-number">2</span> ,<span class="hljs-number">4</span> , <span class="hljs-number">6</span>].concat(odd);

<span class="hljs-comment">// cloning arrays</span>
<span class="hljs-keyword">const</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>];
<span class="hljs-keyword">const</span> arr2 = arr.slice()</code></pre>
<p>简写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// joining arrays
const odd = [1, 3, 5 ];
const nums = [2 ,4 , 6, ...odd];
console.log(nums); // [ 2, 4, 6, 1, 3, 5 ]

// cloning arrays
const arr = [1, 2, 3, 4];
const arr2 = [...arr];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// joining arrays</span>
<span class="hljs-keyword">const</span> odd = [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span> ];
<span class="hljs-keyword">const</span> nums = [<span class="hljs-number">2</span> ,<span class="hljs-number">4</span> , <span class="hljs-number">6</span>, ...odd];
<span class="hljs-built_in">console</span>.log(nums); <span class="hljs-comment">// [ 2, 4, 6, 1, 3, 5 ]</span>

<span class="hljs-comment">// cloning arrays</span>
<span class="hljs-keyword">const</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>];
<span class="hljs-keyword">const</span> arr2 = [...arr];</code></pre>
<p>不像concat()函数，可以使用扩展运算符来在一个数组中任意处插入另一个数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const odd = [1, 3, 5 ];
const nums = [2, ...odd, 4 , 6];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> odd = [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span> ];
<span class="hljs-keyword">const</span> nums = [<span class="hljs-number">2</span>, ...odd, <span class="hljs-number">4</span> , <span class="hljs-number">6</span>];</code></pre>
<p>也可以使用扩展运算符解构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { a, b, ...z } = { a: 1, b: 2, c: 3, d: 4 };
console.log(a) // 1
console.log(b) // 2
console.log(z) // { c: 3, d: 4 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> { a, b, ...z } = { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">c</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">d</span>: <span class="hljs-number">4</span> };
<span class="hljs-built_in">console</span>.log(a) <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(b) <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(z) <span class="hljs-comment">// { c: 3, d: 4 }</span></code></pre>
<h2 id="articleHeader15">16.强制参数简写</h2>
<p>JavaScript中如果没有向函数参数传递值，则参数为undefined。为了增强参数赋值，可以使用if语句来抛出异常，或使用强制参数简写方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(bar) {
  if(bar === undefined) {
    throw new Error('Missing parameter!');
  }
  return bar;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">bar</span>) </span>{
  <span class="hljs-keyword">if</span>(bar === <span class="hljs-literal">undefined</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Missing parameter!'</span>);
  }
  <span class="hljs-keyword">return</span> bar;
}</code></pre>
<p>简写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mandatory = () => {
  throw new Error('Missing parameter!');
}

foo = (bar = mandatory()) => {
  return bar;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">mandatory = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Missing parameter!'</span>);
}

foo = <span class="hljs-function">(<span class="hljs-params">bar = mandatory(</span>)) =&gt;</span> {
  <span class="hljs-keyword">return</span> bar;
}</code></pre>
<h2 id="articleHeader16">17.Array.find简写</h2>
<p>想从数组中查找某个值，则需要循环。在ES6中，find()函数能实现同样效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const pets = [
  { type: 'Dog', name: 'Max'},
  { type: 'Cat', name: 'Karl'},
  { type: 'Dog', name: 'Tommy'},
]

function findDog(name) {
  for(let i = 0; i<pets.length; ++i) {
    if(pets[i].type === 'Dog' &amp;&amp; pets[i].name === name) {
      return pets[i];
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> pets = [
  { <span class="hljs-attr">type</span>: <span class="hljs-string">'Dog'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'Max'</span>},
  { <span class="hljs-attr">type</span>: <span class="hljs-string">'Cat'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'Karl'</span>},
  { <span class="hljs-attr">type</span>: <span class="hljs-string">'Dog'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'Tommy'</span>},
]

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findDog</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i&lt;pets.length; ++i) {
    <span class="hljs-keyword">if</span>(pets[i].type === <span class="hljs-string">'Dog'</span> &amp;&amp; pets[i].name === name) {
      <span class="hljs-keyword">return</span> pets[i];
    }
  }
}</code></pre>
<p>简写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pet = pets.find(pet => pet.type ==='Dog' &amp;&amp; pet.name === 'Tommy');
console.log(pet); // { type: 'Dog', name: 'Tommy' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">pet = pets.find(<span class="hljs-function"><span class="hljs-params">pet</span> =&gt;</span> pet.type ===<span class="hljs-string">'Dog'</span> &amp;&amp; pet.name === <span class="hljs-string">'Tommy'</span>);
<span class="hljs-built_in">console</span>.log(pet); <span class="hljs-comment">// { type: 'Dog', name: 'Tommy' }</span></code></pre>
<h2 id="articleHeader17">18.Object[key]简写</h2>
<p>考虑一个验证函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function validate(values) {
  if(!values.first)
    return false;
  if(!values.last)
    return false;
  return true;
}

console.log(validate({first:'Bruce',last:'Wayne'})); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">validate</span>(<span class="hljs-params">values</span>) </span>{
  <span class="hljs-keyword">if</span>(!values.first)
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">if</span>(!values.last)
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}

<span class="hljs-built_in">console</span>.log(validate({<span class="hljs-attr">first</span>:<span class="hljs-string">'Bruce'</span>,<span class="hljs-attr">last</span>:<span class="hljs-string">'Wayne'</span>})); <span class="hljs-comment">// true</span></code></pre>
<p>假设当需要不同域和规则来验证，能否编写一个通用函数在运行时确认？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 对象验证规则
const schema = {
  first: {
    required:true
  },
  last: {
    required:true
  }
}

// 通用验证函数
const validate = (schema, values) => {
  for(field in schema) {
    if(schema[field].required) {
      if(!values[field]) {
        return false;
      }
    }
  }
  return true;
}


console.log(validate(schema, {first:'Bruce'})); // false
console.log(validate(schema, {first:'Bruce',last:'Wayne'})); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 对象验证规则</span>
<span class="hljs-keyword">const</span> schema = {
  <span class="hljs-attr">first</span>: {
    <span class="hljs-attr">required</span>:<span class="hljs-literal">true</span>
  },
  <span class="hljs-attr">last</span>: {
    <span class="hljs-attr">required</span>:<span class="hljs-literal">true</span>
  }
}

<span class="hljs-comment">// 通用验证函数</span>
<span class="hljs-keyword">const</span> validate = <span class="hljs-function">(<span class="hljs-params">schema, values</span>) =&gt;</span> {
  <span class="hljs-keyword">for</span>(field <span class="hljs-keyword">in</span> schema) {
    <span class="hljs-keyword">if</span>(schema[field].required) {
      <span class="hljs-keyword">if</span>(!values[field]) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      }
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}


<span class="hljs-built_in">console</span>.log(validate(schema, {<span class="hljs-attr">first</span>:<span class="hljs-string">'Bruce'</span>})); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(validate(schema, {<span class="hljs-attr">first</span>:<span class="hljs-string">'Bruce'</span>,<span class="hljs-attr">last</span>:<span class="hljs-string">'Wayne'</span>})); <span class="hljs-comment">// true</span></code></pre>
<p>现在可以有适用于各种情况的验证函数，不需要为了每个而编写自定义验证函数了</p>
<h2 id="articleHeader18">19.双重非位运算简写</h2>
<p>有一个有效用例用于双重非运算操作符。可以用来代替Math.floor()，其优势在于运行更快，可以阅读此文章了解更多位运算。<br><code>Math.floor(4.9) === 4  //true</code></p>
<p>简写：<br><code>~~4.9 === 4  //true</code></p>
<p>本文翻译于SitePoint：<a href="https://www.sitepoint.com/shorthand-javascript-techniques/" rel="nofollow noreferrer" target="_blank">https://www.sitepoint.com/sho...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
19 个 JavaScript 有用的简写技术

## 原文链接
[https://segmentfault.com/a/1190000012673854](https://segmentfault.com/a/1190000012673854)

