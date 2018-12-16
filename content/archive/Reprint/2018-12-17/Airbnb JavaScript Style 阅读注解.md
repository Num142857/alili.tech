---
title: 'Airbnb JavaScript Style 阅读注解' 
date: 2018-12-17 2:30:07
hidden: true
slug: xoqcuhq4nfq
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Airbnb JavaScript Style 阅读注解</h1>
<p><em>提供一种合理的javascript的规范，对原文主要内容进行翻译，同时对部分内容进行注释。推荐大家先收藏，在写代码的时候可以方便参考。</em></p>
<blockquote>
<strong>注意</strong>：本文假定你正在使用 <a href="https://babeljs.io" rel="nofollow noreferrer" target="_blank">Babel</a>，并且要求你使用 <a href="https://npmjs.com/babel-preset-airbnb" rel="nofollow noreferrer" target="_blank">babel-preset-airbnb</a>或者其替代品。同时，假定你已经通过<a href="https://npmjs.com/airbnb-browser-shims" rel="nofollow noreferrer" target="_blank">airbnb-browser-shims</a>或者其替代品安装 shims/polyfills 在你的app内。</blockquote>
<p>如果您想阅读原文?</p>
<ul><li><a href="https://github.com/airbnb/javascript" rel="nofollow noreferrer" target="_blank">Airbnb JavaScript Style Guide Origin</a></li></ul>
<p>如果您想在github上查看?</p>
<ul><li><a href="https://github.com/YLoNe666/airbnbJavascriptNote" rel="nofollow noreferrer" target="_blank">Airbnb JavaScript Style Guide In Chinese</a></li></ul>
<p>如果您想了解并使用 <strong>babel with airbnb</strong>?</p>
<ul><li><a href="https://github.com/YLoNe666/airbnbJavascriptNote/tree/master/babel" rel="nofollow noreferrer" target="_blank">Babel with Airbnb</a></li></ul>
<h2 id="articleHeader1">Types（数据类型）</h2>
<ul><li>
<p>简单的基本数据类型，直接使用其值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- `string`

- `number`

- `boolean`

- `null`

- `undefined`

- `symbol`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby"> <span class="hljs-string">`string`</span>
</span>
-<span class="ruby"> <span class="hljs-string">`number`</span>
</span>
-<span class="ruby"> <span class="hljs-string">`boolean`</span>
</span>
-<span class="ruby"> <span class="hljs-string">`null`</span>
</span>
-<span class="ruby"> <span class="hljs-string">`undefined`</span>
</span>
-<span class="ruby"> <span class="hljs-string">`symbol`</span>
</span></code></pre>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const foo = 1;
let bar = foo;
bar = 9;
console.log(foo, bar); // => 1, 9" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> foo = <span class="hljs-number">1</span>;
<span class="hljs-keyword">let</span> bar = foo;
bar = <span class="hljs-number">9</span>;
<span class="hljs-built_in">console</span>.log(foo, bar); <span class="hljs-comment">// =&gt; 1, 9</span></code></pre>
<ul><li>
<p>复杂的基本数据类型，直接使用其值的引用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- `object`

- `array`

- `function`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby"> <span class="hljs-string">`object`</span>
</span>
-<span class="ruby"> <span class="hljs-string">`array`</span>
</span>
-<span class="ruby"> <span class="hljs-string">`function`</span>
</span></code></pre>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const foo = [1, 2];
const bar = foo;
bar[0] = 9;
console.log(foo[0], bar[0]); // => 9, 9" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> foo = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
<span class="hljs-keyword">const</span> bar = foo;
bar[<span class="hljs-number">0</span>] = <span class="hljs-number">9</span>;
<span class="hljs-built_in">console</span>.log(foo[<span class="hljs-number">0</span>], bar[<span class="hljs-number">0</span>]); <span class="hljs-comment">// =&gt; 9, 9</span></code></pre>
<h4>➰symbol</h4>
<ul><li>Symbol</li></ul>
<p><code>symbol</code>自ES6引入，目的是提供一种机制，保证每个属性名都是唯一的，从根本上防止属性名的冲突。在这之前，对象属性名都是字符串。其实看到这里，<code>string</code>和<code>symbol</code>类型有点<code>class</code>和<code>id</code>的意思</p>
<p><code>Symbol()</code>的声明，因为 <code>Symbol()</code>返回值是一个类似于字符串的基本类型，不是一个对象，所以不能使用 <code>new</code> 命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
let ylone = Symbol();
typeof(ylone);
?    
&quot;symbol&quot;
  
//为声明加上描述
let ylone1 = Symbol('hello');
ylone1;
?
Symbol(hello);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-keyword">let</span> ylone = <span class="hljs-built_in">Symbol</span>();
<span class="hljs-keyword">typeof</span>(ylone);
?    
<span class="hljs-string">"symbol"</span>
  
<span class="hljs-comment">//为声明加上描述</span>
<span class="hljs-keyword">let</span> ylone1 = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'hello'</span>);
ylone1;
?
<span class="hljs-built_in">Symbol</span>(hello);
</code></pre>
<p>无论是不加描述，还是所加的描述相同， <code>Symbol()</code> 函数的返回值都不相同</p>
<p><code>Symbol.for('key')</code> 也会返回一个Symbol,但是<code>Symbol.for()</code>采用登记机制（会被登记在<strong>全局环境</strong>中供搜索），如果之前<code>key</code>已经存在，则直接返回该值，否则新建一个值。比如，如果你调用 <code>Symbol.for("cat")</code>30 次，每次都会返回同一个Symbol值，但是调用<code>Symbol("cat")</code>30 次，会返回 30 个不同的Symbol值。</p>
<p><code>Symbol</code>本身不能与其他值进行运算，但是可以转换成字符串和布尔类型</p>
<p>对象中使用<code>Symbol()</code>。通过对比之前通过 <code>a['string']</code> 的方式，相当于多了一步转换，来保证属性命名的安全。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let mySymbol = Symbol();
// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';
  
// 第二种写法
let a = {
    [mySymbol]: 'Hello!'
};
    
// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });
    
a[mySymbol]
?
'hello!'    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> mySymbol = <span class="hljs-built_in">Symbol</span>();
<span class="hljs-comment">// 第一种写法</span>
<span class="hljs-keyword">let</span> a = {};
a[mySymbol] = <span class="hljs-string">'Hello!'</span>;
  
<span class="hljs-comment">// 第二种写法</span>
<span class="hljs-keyword">let</span> a = {
    [mySymbol]: <span class="hljs-string">'Hello!'</span>
};
    
<span class="hljs-comment">// 第三种写法</span>
<span class="hljs-keyword">let</span> a = {};
<span class="hljs-built_in">Object</span>.defineProperty(a, mySymbol, { <span class="hljs-attr">value</span>: <span class="hljs-string">'Hello!'</span> });
    
a[mySymbol]
?
<span class="hljs-string">'hello!'</span>    
</code></pre>
<p><strong>注意</strong>，由于 <code>.</code> 运算符后面总是字符串，所以<code>Symbol()</code> 不支持点式声明对象属性。在对象内部使用 <code>[symbol]</code> 这样的写法也是这个道理</p>
<h2 id="articleHeader2">References（引用）</h2>
<ul><li>声明创建一个值时用 <code>const</code> 而不用 <code>var</code>，这样可以保证你声明的值不会被重定义</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
var a = 1;
var b = 2;

// good
const a = 1;
const b = 2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-number">2</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> a = <span class="hljs-number">1</span>;
<span class="hljs-keyword">const</span> b = <span class="hljs-number">2</span>;</code></pre>
<ul><li>如果需要改变声明所创建的值，用<code>let</code>而不是<code>var</code>,因为 <code>let</code> 是块级作用域元素， <code>var</code> 是函数作用域元素</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
var count = 1;
if (true) {
  count += 1;
}

// good, use the let.
let count = 1;
if (true) {
  count += 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">var</span> count = <span class="hljs-number">1</span>;
<span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
  count += <span class="hljs-number">1</span>;
}

<span class="hljs-comment">// good, use the let.</span>
<span class="hljs-keyword">let</span> count = <span class="hljs-number">1</span>;
<span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
  count += <span class="hljs-number">1</span>;
}</code></pre>
<ul><li>注意，<code>let</code>和<code>const</code> 都是块级作用域函数，他们都只存在于他们被定义的块中</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// const and let only exist in the blocks they are defined in.
{
  let a = 1;
  const b = 1;
}
console.log(a); // ReferenceError
console.log(b); // ReferenceError" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// const and let only exist in the blocks they are defined in.</span>
{
  <span class="hljs-keyword">let</span> a = <span class="hljs-number">1</span>;
  <span class="hljs-keyword">const</span> b = <span class="hljs-number">1</span>;
}
<span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// ReferenceError</span>
<span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// ReferenceError</span></code></pre>
<h4>➰const,let,block-scoped,function-scoped</h4>
<ul><li>const</li></ul>
<p>块级作用域的常量，此声明创建一个常量，其作用域可以是全局或本地声明的<strong>块</strong>。声明时需要指定其值作为一个常数的初始化器。一般情况下， <code>const</code> 声明的值不能改变，但是对象元素可以改变其属性，数组元素可以向其中添加值，但是不能重新赋值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = 100;
a = 10; ? Uncaught TypeError: Assignment to constant variable
    
const a = [];
a.push('a'); ✔
a = ['a']; ? Uncaught TypeError: Assignment to constant variable
    
const obj = {'name':'ylone'};
obj['name'] = 'yh';    ✔
obj = {'name':'yh'}; ? Uncaught TypeError: Assignment to constant variable
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> a = <span class="hljs-number">100</span>;
a = <span class="hljs-number">10</span>; ? Uncaught <span class="hljs-built_in">TypeError</span>: Assignment to constant variable
    
<span class="hljs-keyword">const</span> a = [];
a.push(<span class="hljs-string">'a'</span>); ✔
a = [<span class="hljs-string">'a'</span>]; ? Uncaught <span class="hljs-built_in">TypeError</span>: Assignment to constant variable
    
<span class="hljs-keyword">const</span> obj = {<span class="hljs-string">'name'</span>:<span class="hljs-string">'ylone'</span>};
obj[<span class="hljs-string">'name'</span>] = <span class="hljs-string">'yh'</span>;    ✔
obj = {<span class="hljs-string">'name'</span>:<span class="hljs-string">'yh'</span>}; ? Uncaught <span class="hljs-built_in">TypeError</span>: Assignment to constant variable
</code></pre>
<p><strong>注意</strong>，chrome30严格模式下不能使用，<code>const(Uncaught SyntaxError: Use of const in strict mode. )</code></p>
<ul><li>let</li></ul>
<p>let允许你声明一个作用域被限制在块级中的变量、语句或者表达式。let声明的变量只在其声明的块或子块中可用，这一点，与var相似。二者之间最主要的区别在于var声明的变量的作用域是整个封闭函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var q = 1;
var w = 2;
if(true){
var q = 11;
let w = 22;
console.log(q,w); ?(11,22)
}
console.log(q,w); ?(11,2)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> q = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> w = <span class="hljs-number">2</span>;
<span class="hljs-keyword">if</span>(<span class="hljs-literal">true</span>){
<span class="hljs-keyword">var</span> q = <span class="hljs-number">11</span>;
<span class="hljs-keyword">let</span> w = <span class="hljs-number">22</span>;
<span class="hljs-built_in">console</span>.log(q,w); ?(<span class="hljs-number">11</span>,<span class="hljs-number">22</span>)
}
<span class="hljs-built_in">console</span>.log(q,w); ?(<span class="hljs-number">11</span>,<span class="hljs-number">2</span>)
</code></pre>
<ul><li>block-scoped</li></ul>
<p>在其他类C语言中，由 <code>{}</code> 封闭的代码块即为 <code>block-scoped</code>,<code>{..block-scoped..}</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(true){
var a = 100;
}
a; ? 100
    
if(true){
let b = 100;
}
b; ? Uncaught ReferenceError: b is not defined
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code><span class="hljs-keyword">if</span>(<span class="hljs-literal">true</span>){
<span class="hljs-keyword">var</span> a = <span class="hljs-number">100</span>;
}
a; ? <span class="hljs-number">100</span>
    
<span class="hljs-keyword">if</span>(<span class="hljs-literal">true</span>){
<span class="hljs-keyword">let</span> b = <span class="hljs-number">100</span>;
}
b; ? Uncaught ReferenceError: b <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> defined
</code></pre>
<p>如果是类C语言中，<code>a</code> 会在if语句执行完毕后销毁，但是在javascript中，if中的变量声明会将变脸那个添加到当前的执行环境中，这里可以看出 <code>var与let的区别</code>，<code>var</code> 声明的变量会自动被添加到最接近的执行环境中，<code>let</code>声明的变量则只会存在与块级作用域中</p>
<ul><li>function-scoped</li></ul>
<p>函数作用域，每个函数被声明时的上下文执行环境，<code>fucnction(){..function-scoped..}</code></p>
<h2 id="articleHeader3">Objects（对象）</h2>
<ul><li>直接使用 <code>{}</code> 来创建对象，因为这样更加简洁，性能上和 <code>new Object()</code> 也没差</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const item = new Object();

// good
const item = {};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> item = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> item = {};</code></pre>
<p>创建拥有动态属性名的对象时，用计算机属性名来表示，这样可以在创建对象时，将所有的属性写在同一个地方</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getKey(k) {
  return `a key named ${k}`;
}

// bad
const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;

// good
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getKey</span>(<span class="hljs-params">k</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">`a key named <span class="hljs-subst">${k}</span>`</span>;
}

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> obj = {
  <span class="hljs-attribute">id:</span><span class="hljs-string"> 5,
  name</span>: <span class="hljs-string">'San Francisco'</span>,
};
obj[getKey(<span class="hljs-string">'enabled'</span>)] = <span class="hljs-literal">true</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> obj = {
  <span class="hljs-attribute">id:</span><span class="hljs-string"> 5,
  name</span>: <span class="hljs-string">'San Francisco'</span>,
  [getKey(<span class="hljs-string">'enabled'</span>)]: <span class="hljs-literal">true</span>,
};
</code></pre>
<ul><li>对象属性中有函数方法时，使用更简洁的对象字面值方法</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const atom = {
  value: 1,
  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  value: 1,
  addValue(value) {
    return atom.value + value;
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> atom = {
  <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">addValue</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">return</span> atom.value + value;
  },
};

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> atom = {
  <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>,
  addValue(value) {
    <span class="hljs-keyword">return</span> atom.value + value;
  },
};</code></pre>
<ul><li>对象属性和属性值一致时，使用更简洁的对象字面值属性</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
};

// good
const obj = {
  lukeSkywalker,
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> lukeSkywalker = <span class="hljs-string">'Luke Skywalker'</span>;

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> obj = {
  <span class="hljs-attr">lukeSkywalker</span>: lukeSkywalker,
};

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> obj = {
  lukeSkywalker,
};</code></pre>
<ul><li>声明对象时，根据是否使用速记，简单地对对象的属性分下类</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const anakinSkywalker = 'Anakin Skywalker';
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> anakinSkywalker = <span class="hljs-string">'Anakin Skywalker'</span>;
<span class="hljs-keyword">const</span> lukeSkywalker = <span class="hljs-string">'Luke Skywalker'</span>;

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> obj = {
  <span class="hljs-attr">episodeOne</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">twoJediWalkIntoACantina</span>: <span class="hljs-number">2</span>,
  lukeSkywalker,
  <span class="hljs-attr">episodeThree</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">mayTheFourth</span>: <span class="hljs-number">4</span>,
  anakinSkywalker,
};

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> obj = {
  lukeSkywalker,
  anakinSkywalker,
  <span class="hljs-attr">episodeOne</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">twoJediWalkIntoACantina</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">episodeThree</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">mayTheFourth</span>: <span class="hljs-number">4</span>,
};</code></pre>
<ul><li>仅给有特殊符号的标识符提供引号，实际上对象的属性默认为字符串类型，除非用<code>[]</code>标记为符号类型。这样做的好处在于，增强代码高亮，方便阅读，并且对js引擎更加友好</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const bad = {
  'foo': 3,
  'bar': 4,
  'data-blah': 5,
};

// good
const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> bad = {
  <span class="hljs-string">'foo'</span>: <span class="hljs-number">3</span>,
  <span class="hljs-string">'bar'</span>: <span class="hljs-number">4</span>,
  <span class="hljs-string">'data-blah'</span>: <span class="hljs-number">5</span>,
};

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> good = {
  <span class="hljs-attr">foo</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">bar</span>: <span class="hljs-number">4</span>,
  <span class="hljs-string">'data-blah'</span>: <span class="hljs-number">5</span>,
};</code></pre>
<ul><li>不要直接调用<code>Object.prototype</code>下的方法，比如 <code>hasOwnProperty</code>,<code>isPrototypeOf</code>,<code>propertyIsEnumerable</code>等，因为这些方法可能被覆盖<code>{ hasOwnProperty: false }</code> ，或者对象为空报错</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
console.log(object.hasOwnProperty(key));

// good
console.log(Object.prototype.hasOwnProperty.call(object, key));

// best
const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
/* or */
import has from 'has'; // https://www.npmjs.com/package/has
// ...
console.log(has.call(object, key));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-built_in">console</span>.log(object.hasOwnProperty(key));

<span class="hljs-comment">// good</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(object, key));

<span class="hljs-comment">// best</span>
<span class="hljs-keyword">const</span> has = <span class="hljs-built_in">Object</span>.prototype.hasOwnProperty; <span class="hljs-comment">// cache the lookup once, in module scope.</span>
<span class="hljs-comment">/* or */</span>
<span class="hljs-keyword">import</span> has <span class="hljs-keyword">from</span> <span class="hljs-string">'has'</span>; <span class="hljs-comment">// https://www.npmjs.com/package/has</span>
<span class="hljs-comment">// ...</span>
<span class="hljs-built_in">console</span>.log(has.call(object, key));</code></pre>
<ul><li>用对象扩散运算符和对象剩余运算符，而不是 <code>Object.assign</code> 来进行浅拷贝操作</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// very bad
const original = { a: 1, b: 2 };
const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
delete copy.a; // so does this

// bad
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

// good
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

 // noA => { b: 2, c: 3 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// very bad</span>
<span class="hljs-keyword">const</span> original = { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span> };
<span class="hljs-keyword">const</span> copy = <span class="hljs-built_in">Object</span>.assign(original, { <span class="hljs-attr">c</span>: <span class="hljs-number">3</span> }); <span class="hljs-comment">// this mutates `original` ಠ_ಠ</span>
<span class="hljs-keyword">delete</span> copy.a; <span class="hljs-comment">// so does this</span>

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> original = { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span> };
<span class="hljs-keyword">const</span> copy = <span class="hljs-built_in">Object</span>.assign({}, original, { <span class="hljs-attr">c</span>: <span class="hljs-number">3</span> }); <span class="hljs-comment">// copy =&gt; { a: 1, b: 2, c: 3 }</span>

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> original = { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span> };
<span class="hljs-keyword">const</span> copy = { ...original, <span class="hljs-attr">c</span>: <span class="hljs-number">3</span> }; <span class="hljs-comment">// copy =&gt; { a: 1, b: 2, c: 3 }</span>

 <span class="hljs-comment">// noA =&gt; { b: 2, c: 3 }</span></code></pre>
<h4>➰call,assign(),...</h4>
<ul><li>call()</li></ul>
<p><code>Function.prototype.call()</code>,调用一个函数，其具有指定的 <code>this</code> 值和参数列表。<strong>注意</strong>，该方法和 <code>apply()</code> 方法类似，区别在于 <code>apply()</code> 传参为一个包含多个参数的数组。可以让call()中的对象调用当前对象所拥有的function。</p>
<p>使用 <code>call()</code> 调用父构造函数,在一个子构造函数中，你可以通过调用父构造函数的 call 方法来实现继承，类似于Java中的写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//父构造函数，写一些公用的方法和属性
function a(v1,v2){
    this.name = v1;
    this.cool = v2;
} 
//子构造函数，可以继承父构造函数的方法和属性，同时可以有私有的方法和属性
function b(v1,v2,v3){
    a.call(this,v1,v2);
    this.sex = v3;
}
var v1 = new a('ylone',true);
var v2 = new b('ylone',true,'male');
v1; ? {name: &quot;ylone&quot;, cool: true}
v2; ? {name: &quot;ylone&quot;, cool: true, sex: &quot;male&quot;}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//父构造函数，写一些公用的方法和属性</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span><span class="hljs-params">(v1,v2)</span></span>{
    <span class="hljs-keyword">this</span>.name = v1;
    <span class="hljs-keyword">this</span>.cool = v2;
} 
<span class="hljs-comment">//子构造函数，可以继承父构造函数的方法和属性，同时可以有私有的方法和属性</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">b</span><span class="hljs-params">(v1,v2,v3)</span></span>{
    a.call(<span class="hljs-keyword">this</span>,v1,v2);
    <span class="hljs-keyword">this</span>.sex = v3;
}
<span class="hljs-keyword">var</span> v1 = <span class="hljs-keyword">new</span> a(<span class="hljs-string">'ylone'</span>,<span class="hljs-literal">true</span>);
<span class="hljs-keyword">var</span> v2 = <span class="hljs-keyword">new</span> b(<span class="hljs-string">'ylone'</span>,<span class="hljs-literal">true</span>,<span class="hljs-string">'male'</span>);
v1; ? {name: <span class="hljs-string">"ylone"</span>, cool: <span class="hljs-literal">true</span>}
v2; ? {name: <span class="hljs-string">"ylone"</span>, cool: <span class="hljs-literal">true</span>, sex: <span class="hljs-string">"male"</span>}
</code></pre>
<p>使用 <code>call()</code> 调用匿名函数，将参数作为指定的 <code>this值</code>，传进匿名函数。同时也可以传递普通参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var i = 1;
(function(i){console.log(this,i)}).call(Math.random(),i);
? 0.9604319664333041 1
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>;
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i</span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>,i)}).call(<span class="hljs-built_in">Math</span>.random(),i);
? <span class="hljs-number">0.9604319664333041</span> <span class="hljs-number">1</span>
</code></pre>
<p>使用 <code>call()</code> 调用函数并且指定执行环境的this</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function a(){
    console.log(this.name + ' is ' + this.cool);
};
var i = {name: 'ylone', cool: 'cool'};
a.call(i); ? ylone is cool
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span><span class="hljs-params">()</span></span>{
    console.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">' is '</span> + <span class="hljs-keyword">this</span>.cool);
};
<span class="hljs-keyword">var</span> i = {name: <span class="hljs-string">'ylone'</span>, cool: <span class="hljs-string">'cool'</span>};
a.call(i); ? ylone <span class="hljs-keyword">is</span> cool
</code></pre>
<ul><li>Object.assign()</li></ul>
<p>和 <code>$.extend()</code>类似，用于对象的合并，将源对象内所有可枚举的属性拷贝到目标对象，<strong>注意</strong>如果源数据不是对象，则先会转换成对象；如果是<code>null</code>或者<code>undefined</code>等不能转换成对象的类型，则根据其位置进行跳过或者报错。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.assign(null); ? Uncaught TypeError: Cannot convert undefined or null to object
  
Object.assign(1,null); ? Number&nbsp;{1}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Object</span>.assign(<span class="hljs-literal">null</span>); ? Uncaught <span class="hljs-built_in">TypeError</span>: Cannot convert <span class="hljs-literal">undefined</span> or <span class="hljs-literal">null</span> to object
  
<span class="hljs-built_in">Object</span>.assign(<span class="hljs-number">1</span>,<span class="hljs-literal">null</span>); ? <span class="hljs-built_in">Number</span>&nbsp;{<span class="hljs-number">1</span>}
</code></pre>
<p><code>Object.assign()</code>仅支持浅拷贝，也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var v1 = {a:{b:'b'"}}";
var v2 = Object.assign({},v1);
v1.a.b = 'c';
v2.a.b; ? 'c'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>var <span class="hljs-built_in">v1</span> = {a:{<span class="hljs-keyword">b:'b'"}}";
</span>var v2 = Object.assign({},<span class="hljs-built_in">v1</span>)<span class="hljs-comment">;</span>
<span class="hljs-built_in">v1</span>.a.<span class="hljs-keyword">b </span>= <span class="hljs-string">'c'</span><span class="hljs-comment">;</span>
v2.a.<span class="hljs-keyword">b; </span>? <span class="hljs-string">'c'</span>
</code></pre>
<p><code>Object.assign()</code> 处理数组，会先把数组转换成对象，将其视为属性名为 0、1、2 的对象，因此源数组的 0 号属性4覆盖了目标数组的 0 号属性1。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.assign([1, 2, 3], [4, 5]);
?
Object.assign({0:1,1:2,2:3},{0:4,1:5});
?
{0:4,1:5,2:3}
?
[4,5,3]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Object</span><span class="hljs-selector-class">.assign</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>]);
?
<span class="hljs-selector-tag">Object</span><span class="hljs-selector-class">.assign</span>({<span class="hljs-attribute">0</span>:<span class="hljs-number">1</span>,<span class="hljs-number">1</span>:<span class="hljs-number">2</span>,<span class="hljs-number">2</span>:<span class="hljs-number">3</span>},{<span class="hljs-attribute">0</span>:<span class="hljs-number">4</span>,<span class="hljs-number">1</span>:<span class="hljs-number">5</span>});
?
{<span class="hljs-attribute">0</span>:<span class="hljs-number">4</span>,<span class="hljs-number">1</span>:<span class="hljs-number">5</span>,<span class="hljs-number">2</span>:<span class="hljs-number">3</span>}
?
<span class="hljs-selector-attr">[4,5,3]</span>
</code></pre>
<ul><li><code>...</code></li></ul>
<p>对象扩散运算符和对象剩余运算符都用 <code>...</code> 表示，可以理解为“脱衣服”方法</p>
<p>数组转换，将数组转换成逗号分隔的参数序列，<strong>注意</strong>，其返回值并不是某个基本类型，所以该方法多用于函数参数设置，代替 <code>apply()</code> 方法。对于很多参数不能接受数组的方法提供了便利。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...[1,2,3] ? Uncaught SyntaxError: Unexpected number
  
[...[1,2,3]] ? [1, 2, 3]
  
[1,...[2,3],4] ? [1, 2, 3, 4]
  
//Math.max()不支持数组传参，之前通过apply()进行转换
Math.max.apply(null,[1,2,3]) ? 3
//现在可以利用 ... 直接进行转换
Math.max(...[1,2,3]) ? 3
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs inform7"><code>...<span class="hljs-comment">[1,2,3]</span> ? Uncaught SyntaxError: Unexpected number
  
<span class="hljs-comment">[...<span class="hljs-comment">[1,2,3]</span>]</span> ? <span class="hljs-comment">[1, 2, 3]</span>
  
<span class="hljs-comment">[1,...<span class="hljs-comment">[2,3]</span>,4]</span> ? <span class="hljs-comment">[1, 2, 3, 4]</span>
  
//Math.max()不支持数组传参，之前通过apply()进行转换
Math.max.apply(null,<span class="hljs-comment">[1,2,3]</span>) ? 3
//现在可以利用 ... 直接进行转换
Math.max(...<span class="hljs-comment">[1,2,3]</span>) ? 3
</code></pre>
<h2 id="articleHeader4">Arrays（数组）</h2>
<ul><li>使用 <code>[]</code> 来创建数组</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const items = new Array();

// good
const items = [];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> items = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> items = [];</code></pre>
<ul><li>使用 <code>push()</code> 而不是直接给数组项赋值</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const someStack = [];

// bad
someStack[someStack.length] = 'abracadabra';

// good
someStack.push('abracadabra');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> someStack = [];

<span class="hljs-comment">// bad</span>
someStack[someStack.length] = <span class="hljs-string">'abracadabra'</span>;

<span class="hljs-comment">// good</span>
someStack.push(<span class="hljs-string">'abracadabra'</span>);</code></pre>
<ul><li>使用 <code>...</code> 拷贝数组</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const len = items.length;
const itemsCopy = [];
let i;
for (i = 0; i < len; i += 1) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> len = items.length;
<span class="hljs-keyword">const</span> itemsCopy = [];
<span class="hljs-keyword">let</span> i;
<span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; len; i += <span class="hljs-number">1</span>) {
  itemsCopy[i] = items[i];
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> itemsCopy = [...items];</code></pre>
<ul><li>使用 <code>...</code> 将数组对象转换为数组</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const foo = document.querySelectorAll('.foo');

// good
const nodes = Array.from(foo);

// best
const nodes = [...foo];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> foo = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'.foo'</span>);

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> nodes = <span class="hljs-built_in">Array</span>.from(foo);

<span class="hljs-comment">// best</span>
<span class="hljs-keyword">const</span> nodes = [...foo];</code></pre>
<ul><li>用 <code>array.from()</code> 而不是 <code>...</code> 遍历迭代器，这样避免产生了中间变量</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const baz = [...foo].map(bar);

// good
const baz = Array.from(foo, bar);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> baz = [...foo].map(bar);

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> baz = <span class="hljs-built_in">Array</span>.from(foo, bar);</code></pre>
<ul><li>数组方法的回调中使用return语句，如果函数体由单语句组成，返回值没有副作用，return也可以忽略</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map(x => x + 1);

// bad - no returned value means `memo` becomes undefined after the first iteration
[[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
  const flatten = memo.concat(item);
  memo[index] = flatten;
});

// good
[[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
  const flatten = memo.concat(item);
  memo[index] = flatten;
  return flatten;
});

// bad
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  } else {
    return false;
  }
});

// good
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  }

  return false;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// good</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> y = x + <span class="hljs-number">1</span>;
  <span class="hljs-keyword">return</span> x * y;
});

<span class="hljs-comment">// good</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x + <span class="hljs-number">1</span>);

<span class="hljs-comment">// bad - no returned value means `memo` becomes undefined after the first iteration</span>
[[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>]].reduce(<span class="hljs-function">(<span class="hljs-params">memo, item, index</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> flatten = memo.concat(item);
  memo[index] = flatten;
});

<span class="hljs-comment">// good</span>
[[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>]].reduce(<span class="hljs-function">(<span class="hljs-params">memo, item, index</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> flatten = memo.concat(item);
  memo[index] = flatten;
  <span class="hljs-keyword">return</span> flatten;
});

<span class="hljs-comment">// bad</span>
inbox.filter(<span class="hljs-function">(<span class="hljs-params">msg</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> { subject, author } = msg;
  <span class="hljs-keyword">if</span> (subject === <span class="hljs-string">'Mockingbird'</span>) {
    <span class="hljs-keyword">return</span> author === <span class="hljs-string">'Harper Lee'</span>;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }
});

<span class="hljs-comment">// good</span>
inbox.filter(<span class="hljs-function">(<span class="hljs-params">msg</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> { subject, author } = msg;
  <span class="hljs-keyword">if</span> (subject === <span class="hljs-string">'Mockingbird'</span>) {
    <span class="hljs-keyword">return</span> author === <span class="hljs-string">'Harper Lee'</span>;
  }

  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
});</code></pre>
<ul><li>如果数组有多行，在数组项开始和结束时使用换行符</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const arr = [
  [0, 1], [2, 3], [4, 5],
];

const objectInArray = [{
  id: 1,
}, {
  id: 2,
}];

const numberInArray = [
  1, 2,
];

// good
const arr = [[0, 1], [2, 3], [4, 5]];

const objectInArray = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const numberInArray = [
  1,
  2,
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> arr = [
  [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>],
];

<span class="hljs-keyword">const</span> objectInArray = [{
  <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
}, {
  <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
}];

<span class="hljs-keyword">const</span> numberInArray = [
  <span class="hljs-number">1</span>, <span class="hljs-number">2</span>,
];

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> arr = [[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>]];

<span class="hljs-keyword">const</span> objectInArray = [
  {
    <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
  },
  {
    <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
  },
];

<span class="hljs-keyword">const</span> numberInArray = [
  <span class="hljs-number">1</span>,
  <span class="hljs-number">2</span>,
];</code></pre>
<h4>➰Array.from()</h4>
<ul><li>Array.from()</li></ul>
<p><code>Array.from()</code> 方法从一个类似数组（一个对象必须有length属性）或可迭代对象中创建一个新的数组实例，比如 array,map,set,string</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //数组
 const arr = ['1','2','3'];
 Array.from(arr); ? [&quot;1&quot;, &quot;2&quot;, &quot;3&quot;]

 //字符串
 const str = 'ylone';
 Array.from(str); ? [&quot;y&quot;, &quot;l&quot;, &quot;o&quot;, &quot;n&quot;, &quot;e&quot;]

 //map对象
 const m1 = new Map();
 m1.set('v1',1);
 m2.set('v2',2);
 m2; ? {&quot;v1&quot; => 1, &quot;v2&quot; => 2} 
 Array.from(m2); ? [['v1',1],['v2',2]]

 //json对象
 const j = {'v1':1,'v2':2};
 j.length; ? undefined
 Array.from(j); ? []  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code> <span class="hljs-comment">//数组</span>
 <span class="hljs-keyword">const</span> arr = [<span class="hljs-string">'1'</span>,<span class="hljs-string">'2'</span>,<span class="hljs-string">'3'</span>];
 <span class="hljs-keyword">Array</span>.from(arr); ? [<span class="hljs-string">"1"</span>, <span class="hljs-string">"2"</span>, <span class="hljs-string">"3"</span>]

 <span class="hljs-comment">//字符串</span>
 <span class="hljs-keyword">const</span> <span class="hljs-built_in">str</span> = <span class="hljs-string">'ylone'</span>;
 <span class="hljs-keyword">Array</span>.from(<span class="hljs-built_in">str</span>); ? [<span class="hljs-string">"y"</span>, <span class="hljs-string">"l"</span>, <span class="hljs-string">"o"</span>, <span class="hljs-string">"n"</span>, <span class="hljs-string">"e"</span>]

 <span class="hljs-comment">//map对象</span>
 <span class="hljs-keyword">const</span> m1 = <span class="hljs-keyword">new</span> Map();
 m1.<span class="hljs-built_in">set</span>(<span class="hljs-string">'v1'</span>,<span class="hljs-number">1</span>);
 m2.<span class="hljs-built_in">set</span>(<span class="hljs-string">'v2'</span>,<span class="hljs-number">2</span>);
 m2; ? {<span class="hljs-string">"v1"</span> =&gt; <span class="hljs-number">1</span>, <span class="hljs-string">"v2"</span> =&gt; <span class="hljs-number">2</span>} 
 <span class="hljs-keyword">Array</span>.from(m2); ? [[<span class="hljs-string">'v1'</span>,<span class="hljs-number">1</span>],[<span class="hljs-string">'v2'</span>,<span class="hljs-number">2</span>]]

 <span class="hljs-comment">//json对象</span>
 <span class="hljs-keyword">const</span> j = {<span class="hljs-string">'v1'</span>:<span class="hljs-number">1</span>,<span class="hljs-string">'v2'</span>:<span class="hljs-number">2</span>};
 j.length; ? undefined
 <span class="hljs-keyword">Array</span>.from(j); ? []  
</code></pre>
<ul><li>
<p>Array.from(arrayLike, mapFn, thisArg)</p>
<ul>
<li>
<code>arrayLike</code>表示想要转换成数组的伪数组对象或可迭代对象</li>
<li>
<code>mapFn（可选参数）</code>表示新数组中的每个元素会执行该回调函数</li>
<li>
<code>thisArg（可选参数）</code>表示执行回调函数<code>mapFn</code>时<code>this</code>对象</li>
</ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   Array.from([1,2,3], function(n){return n+1})
   ?
   [2, 3, 4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">   <span class="hljs-built_in">Array</span>.from([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">n</span>)</span>{<span class="hljs-keyword">return</span> n+<span class="hljs-number">1</span>})
   ?
   [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]</code></pre>
<h2 id="articleHeader5">Destructuring（解构）</h2>
<ul><li>访问和使用对象的多个属性时，使用对象解构。这样可以避免为这些属性创建临时引用，保持代码的整洁</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;

  return `${firstName} ${lastName}`;
}

// good
function getFullName(user) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getFullName</span>(<span class="hljs-params">user</span>) </span>{
  <span class="hljs-keyword">const</span> firstName = user.firstName;
  <span class="hljs-keyword">const</span> lastName = user.lastName;

  <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${firstName}</span> <span class="hljs-subst">${lastName}</span>`</span>;
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getFullName</span>(<span class="hljs-params">user</span>) </span>{
  <span class="hljs-keyword">const</span> { firstName, lastName } = user;
  <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${firstName}</span> <span class="hljs-subst">${lastName}</span>`</span>;
}

<span class="hljs-comment">// best</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getFullName</span>(<span class="hljs-params">{ firstName, lastName }</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${firstName}</span> <span class="hljs-subst">${lastName}</span>`</span>;
}</code></pre>
<ul><li>使用数组解构</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>];

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> first = arr[<span class="hljs-number">0</span>];
<span class="hljs-keyword">const</span> second = arr[<span class="hljs-number">1</span>];

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> [first, second] = arr;</code></pre>
<ul><li>使用对象解构而不是数组解构来实现多个返回值。这样，您可以添加新的属性或者更改属性顺序</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function processInput(input) {
  return [left, right, top, bottom];
}

// the caller needs to think about the order of return data
const [left, __, top] = processInput(input);

// good
function processInput(input) {
  return { left, right, top, bottom };
}

// the caller selects only the data they need
const { left, top } = processInput(input);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">processInput</span>(<span class="hljs-params">input</span>) </span>{
  <span class="hljs-keyword">return</span> [left, right, top, bottom];
}

<span class="hljs-comment">// the caller needs to think about the order of return data</span>
<span class="hljs-keyword">const</span> [left, __, top] = processInput(input);

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">processInput</span>(<span class="hljs-params">input</span>) </span>{
  <span class="hljs-keyword">return</span> { left, right, top, bottom };
}

<span class="hljs-comment">// the caller selects only the data they need</span>
<span class="hljs-keyword">const</span> { left, top } = processInput(input);</code></pre>
<h4>➰Destructuring</h4>
<ul><li>
<em>Destructuring</em>：解构。解构的作用是可以快速取得数组或对象当中的元素或属性，而无需使用arr[x]或者obj[key]等传统方式进行赋值</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //数组解构
  const arr = [1,[2,3],4];
  const [a,[b,c],d] = arr;
  a,b,c,d; ? 1,2,3,4
  //函数传参
  var arr = [1, 2, 3];
  function fn1([a, b, c]) {
    return a+b+c;
  }
  fn1(arr); ? 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-comment">//数组解构</span>
  <span class="hljs-keyword">const</span> arr = [<span class="hljs-number">1</span>,[<span class="hljs-number">2</span>,<span class="hljs-number">3</span>],<span class="hljs-number">4</span>];
  <span class="hljs-keyword">const</span> [a,[b,c],d] = arr;
  a,b,c,d; ? <span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>
  <span class="hljs-comment">//函数传参</span>
  <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span>(<span class="hljs-params">[a, b, c]</span>) </span>{
    <span class="hljs-keyword">return</span> a+b+c;
  }
  fn1(arr); ? <span class="hljs-number">6</span></code></pre>
<h2 id="articleHeader6">Strings（字符串）</h2>
<ul><li>使用单引号 <code>''</code>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const name = &quot;Capt. Janeway&quot;;

// bad - template literals should contain interpolation or newlines
const name = `Capt. Janeway`;

// good
const name = 'Capt. Janeway';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> name = <span class="hljs-string">"Capt. Janeway"</span>;

<span class="hljs-comment">// bad - template literals should contain interpolation or newlines</span>
<span class="hljs-keyword">const</span> name = <span class="hljs-string">`Capt. Janeway`</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> name = <span class="hljs-string">'Capt. Janeway'</span>;</code></pre>
<ul><li>如果字符串很长，不要通过字符串连接符进行换行，保持原来的字符串形式就好。因为破坏字符串是一件很不好的事情，同时也减少了代码的可读性</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const errorMessage = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.';

// bad
const errorMessage = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.';

// good
const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> errorMessage = <span class="hljs-string">'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.'</span>;

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> errorMessage = <span class="hljs-string">'This is a super long error that was thrown because '</span> +
  <span class="hljs-string">'of Batman. When you stop to think about how Batman had anything to do '</span> +
  <span class="hljs-string">'with this, you would get nowhere fast.'</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> errorMessage = <span class="hljs-string">'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.'</span>;</code></pre>
<ul><li>当字符串中有变量时，使用模板字符串而不是连字符。这样代码更加简洁可读</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function sayHi(name) {
  return 'How are you, ' + name + '?';
}

// bad
function sayHi(name) {
  return ['How are you, ', name, '?'].join();
}

// bad
function sayHi(name) {
  return `How are you, ${ name }?`;
}

// good
function sayHi(name) {
  return `How are you, ${name}?`;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHi</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">'How are you, '</span> + name + <span class="hljs-string">'?'</span>;
}

<span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHi</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> [<span class="hljs-string">'How are you, '</span>, name, <span class="hljs-string">'?'</span>].join();
}

<span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHi</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">`How are you, <span class="hljs-subst">${ name }</span>?`</span>;
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHi</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">`How are you, <span class="hljs-subst">${name}</span>?`</span>;
}</code></pre>
<ul>
<li>不要使用<code>eval()</code>方法，因为它有潜在的危险，在不受信任的代码上使用可以打开一个程序多达几种不同的注入攻击</li>
<li>在字符串中不要随意使用 <code>\</code>，因为它影响可读性，同时可能与转义符产生影响</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const foo = '\'this\' \i\s \&quot;quoted\&quot;';

// good
const foo = '\'this\' is &quot;quoted&quot;';
const foo = `my name is '${name}'`;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> foo = <span class="hljs-string">'\'this\' \i\s \"quoted\"'</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> foo = <span class="hljs-string">'\'this\' is "quoted"'</span>;
<span class="hljs-keyword">const</span> foo = <span class="hljs-string">`my name is '<span class="hljs-subst">${name}</span>'`</span>;</code></pre>
<h2 id="articleHeader7">Functions（函数）</h2>
<ul><li>使用命名函数表达式而不是函数声明。因为如果一个函数声明被挂起之后，很容易在它被定义之前就去引用，这就很影响代码的可读性和可维护性。同时，如果一个函数的功能比较复杂，需要用函数名来对其进行一定的描述</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function foo() {
  // ...
}

// bad
const foo = function () {
  // ...
};

// good
// lexical name distinguished from the variable-referenced invocation(s)
const short = function longUniqueMoreDescriptiveLexicalFoo() {
  // ...
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
};

<span class="hljs-comment">// good</span>
<span class="hljs-comment">// lexical name distinguished from the variable-referenced invocation(s)</span>
<span class="hljs-keyword">const</span> short = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">longUniqueMoreDescriptiveLexicalFoo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
};</code></pre>
<ul><li>在 <code>()</code> 创建的函数需要立即调用，自调用函数相当于一个独立模块。事实上，IIFE很少在项目中使用</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// immediately-invoked function expression (IIFE)
(function () {
  console.log('Welcome to the Internet. Please follow me.');
}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// immediately-invoked function expression (IIFE)</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Welcome to the Internet. Please follow me.'</span>);
}());</code></pre>
<ul>
<li>不要在非功能模块（<code>if</code>,<code>while</code>等）里面声明一个函数。将函数分配给一个变量来替代它。因为虽然浏览器支持这种做法，但是他们各自的解析方式并不一样</li>
<li>ECMA-262 定义 ‘块’ 表示一个语句列表，函数声明并不是一个语句，跟上一点类似</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
if (currentUser) {
  function test() {
    console.log('Nope.');
  }
}

// good
let test;
if (currentUser) {
  test = () => {
    console.log('Yup.');
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">if</span> (currentUser) {
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Nope.'</span>);
  }
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">let</span> test;
<span class="hljs-keyword">if</span> (currentUser) {
  test = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Yup.'</span>);
  };
}</code></pre>
<ul><li>永远不要给参数命名为 <code>arguments</code>，这将导致每个函数作用域的 <code>arguments</code>对象被优先替换</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function foo(name, options, arguments) {
  // ...
}

// good
function foo(name, options, args) {
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">name, options, arguments</span>) </span>{
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">name, options, args</span>) </span>{
  <span class="hljs-comment">// ...</span>
}</code></pre>
<ul><li>永远不要使用 <code>arguments</code>，而使用 <code>...</code>，因为 <code>arguments</code> 只是类似数组</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">concatenateAll</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> args = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>);
  <span class="hljs-keyword">return</span> args.join(<span class="hljs-string">''</span>);
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">concatenateAll</span>(<span class="hljs-params">...args</span>) </span>{
  <span class="hljs-keyword">return</span> args.join(<span class="hljs-string">''</span>);
}</code></pre>
<ul><li>使用函数默认参数语法而不是改变函数的参数</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// really bad
function handleThings(opts) {
  // No! We shouldn’t mutate function arguments.
  // Double bad: if opts is falsy it'll be set to an object which may
  // be what you want but it can introduce subtle bugs.
  opts = opts || {};
  // ...
}

// still bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}

// good
function handleThings(opts = {}) {
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// really bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleThings</span>(<span class="hljs-params">opts</span>) </span>{
  <span class="hljs-comment">// No! We shouldn’t mutate function arguments.</span>
  <span class="hljs-comment">// Double bad: if opts is falsy it'll be set to an object which may</span>
  <span class="hljs-comment">// be what you want but it can introduce subtle bugs.</span>
  opts = opts || {};
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// still bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleThings</span>(<span class="hljs-params">opts</span>) </span>{
  <span class="hljs-keyword">if</span> (opts === <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>) {
    opts = {};
  }
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleThings</span>(<span class="hljs-params">opts = {}</span>) </span>{
  <span class="hljs-comment">// ...</span>
}</code></pre>
<ul><li>避免函数默认参数使用不当，使用时要考虑场景</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var b = 1;
// bad
function count(a = b++) {
  console.log(a);
}
count();  // 1
count();  // 2
count(3); // 3
count();  // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> b = <span class="hljs-number">1</span>;
<span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">count</span>(<span class="hljs-params">a = b++</span>) </span>{
  <span class="hljs-built_in">console</span>.log(a);
}
count();  <span class="hljs-comment">// 1</span>
count();  <span class="hljs-comment">// 2</span>
count(<span class="hljs-number">3</span>); <span class="hljs-comment">// 3</span>
count();  <span class="hljs-comment">// 3</span></code></pre>
<ul><li>总是将函数默认参数放在传参的最后</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function handleThings(opts = {}, name) {
  // ...
}

// good
function handleThings(name, opts = {}) {
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleThings</span>(<span class="hljs-params">opts = {}, name</span>) </span>{
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleThings</span>(<span class="hljs-params">name, opts = {}</span>) </span>{
  <span class="hljs-comment">// ...</span>
}</code></pre>
<ul><li>永远不要使用 <code>Function</code> 构造函数来创建一个新的函数，因为它和 <code>eval()</code> 沆瀣一气</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
var add = new Function('a', 'b', 'return a + b');

// still bad
var subtract = Function('a', 'b', 'return a - b');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">var</span> add = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'return a + b'</span>);

<span class="hljs-comment">// still bad</span>
<span class="hljs-keyword">var</span> subtract = <span class="hljs-built_in">Function</span>(<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'return a - b'</span>);</code></pre>
<ul><li>函数签名的间距，添加或删除名称时不需要添加或删除空格，保持一致性</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const f = function(){};
const g = function (){};
const h = function() {};

// good
const x = function () {};
const y = function a() {};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{};
<span class="hljs-keyword">const</span> g = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{};
<span class="hljs-keyword">const</span> h = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> x = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{};
<span class="hljs-keyword">const</span> y = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>) </span>{};</code></pre>
<ul><li>不要改变参数，因为操作最为参数传入的对象可能会改变原对象从而对其他调用产生影响</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function f1(obj) {
  obj.key = 1;
}

// good
function f2(obj) {
  const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params">obj</span>) </span>{
  obj.key = <span class="hljs-number">1</span>;
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f2</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">const</span> key = <span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(obj, <span class="hljs-string">'key'</span>) ? obj.key : <span class="hljs-number">1</span>;
}</code></pre>
<ul><li>不要重新分配参数，特别是在访问arguments对象时</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function f1(a) {
  a = 1;
  // ...
}

function f2(a) {
  if (!a) { a = 1; }
  // ...
}
 
// good
function f3(a) {
  const b = a || 1;
  // ...
}

function f4(a = 1) {
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params">a</span>) </span>{
  a = <span class="hljs-number">1</span>;
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f2</span>(<span class="hljs-params">a</span>) </span>{
  <span class="hljs-keyword">if</span> (!a) { a = <span class="hljs-number">1</span>; }
  <span class="hljs-comment">// ...</span>
}
 
<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f3</span>(<span class="hljs-params">a</span>) </span>{
  <span class="hljs-keyword">const</span> b = a || <span class="hljs-number">1</span>;
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f4</span>(<span class="hljs-params">a = <span class="hljs-number">1</span></span>) </span>{
  <span class="hljs-comment">// ...</span>
}</code></pre>
<ul><li>优先使用 <code>...</code> 来调用可变参数函数，因为 <code>...</code> 很干净，不需要提供上下文环境，并且你不能轻易地使用 <code>apply()</code>和 <code>new</code>方法</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const x = [1, 2, 3, 4, 5];
console.log.apply(console, x);

// good
const x = [1, 2, 3, 4, 5];
console.log(...x);

// bad
new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));

// good
new Date(...[2016, 8, 5]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> x = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
<span class="hljs-built_in">console</span>.log.apply(<span class="hljs-built_in">console</span>, x);

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> x = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
<span class="hljs-built_in">console</span>.log(...x);

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">new</span> (<span class="hljs-built_in">Function</span>.prototype.bind.apply(<span class="hljs-built_in">Date</span>, [<span class="hljs-literal">null</span>, <span class="hljs-number">2016</span>, <span class="hljs-number">8</span>, <span class="hljs-number">5</span>]));

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(...[<span class="hljs-number">2016</span>, <span class="hljs-number">8</span>, <span class="hljs-number">5</span>]);</code></pre>
<ul><li>使用函数如果有多行签名或者调用，应该每个 item 单独放一行，并在最后一项放置一个尾随逗号</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function foo(bar,
             baz,
             quux) {
  // ...
}

// good
function foo(
  bar,
  baz,
  quux,
) {
  // ...
}
// bad
console.log(foo,
  bar,
  baz);
   
// good
console.log(
  foo,
  bar,
  baz,
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">bar,
             baz,
             quux</span>) </span>{
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">
  bar,
  baz,
  quux,
</span>) </span>{
  <span class="hljs-comment">// ...</span>
}
<span class="hljs-comment">// bad</span>
<span class="hljs-built_in">console</span>.log(foo,
  bar,
  baz);
   
<span class="hljs-comment">// good</span>
<span class="hljs-built_in">console</span>.log(
  foo,
  bar,
  baz,
);</code></pre>
<h4>➰Default Function Parameter</h4>
<ul>
<li>
<strong>函数默认参数</strong>，允许在没有值或undefined被传入时使用默认形参</li>
<li>函数形式：<code>function(name){param1 = defaultValue1,...,paramN = defaultValueN}</code>
</li>
<li>
<p>JavaScript中函数的参数默认是 <code>undefined</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = function test(v1,v2=1){
    return v1*v2;
}
a(5,5); ? 25
a(5); ? 5
a(void 0,5); ? NaN  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> a = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params">v1,v2=<span class="hljs-number">1</span></span>)</span>{
    <span class="hljs-keyword">return</span> v1*v2;
}
a(<span class="hljs-number">5</span>,<span class="hljs-number">5</span>); ? <span class="hljs-number">25</span>
a(<span class="hljs-number">5</span>); ? <span class="hljs-number">5</span>
a(<span class="hljs-keyword">void</span> <span class="hljs-number">0</span>,<span class="hljs-number">5</span>); ? <span class="hljs-literal">NaN</span>  </code></pre>
</li>
<li>可以看出，当设置了函数默认参数后，如果传参为 <code>undefined</code>，则会用默认参数替换，否则为原传参值</li>
<li>
<p>有默认值的解构函数，通过解构赋值为参数赋值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const b = function test([a,b]=[1,2],{c:c}={c:3}){
  return a+b+c;
}
b(); ? 6
b([2,3],4); ? 9
b(void 0,4); ? 9
b([void 0,3],4); ? NaN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> b = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params">[a,b]=[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>],{c:c}={c:<span class="hljs-number">3</span>}</span>)</span>{
  <span class="hljs-keyword">return</span> a+b+c;
}
b(); ? <span class="hljs-number">6</span>
b([<span class="hljs-number">2</span>,<span class="hljs-number">3</span>],<span class="hljs-number">4</span>); ? <span class="hljs-number">9</span>
b(<span class="hljs-keyword">void</span> <span class="hljs-number">0</span>,<span class="hljs-number">4</span>); ? <span class="hljs-number">9</span>
b([<span class="hljs-keyword">void</span> <span class="hljs-number">0</span>,<span class="hljs-number">3</span>],<span class="hljs-number">4</span>); ? <span class="hljs-literal">NaN</span></code></pre>
</li>
</ul>
<h2 id="articleHeader8">Arrow Functions（箭头函数）</h2>
<ul><li>当需要使用一个匿名函数时（比如在传递内联回调时），使用箭头函数表示</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
[1, 2, 3].map(function (x) {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">const</span> y = x + <span class="hljs-number">1</span>;
  <span class="hljs-keyword">return</span> x * y;
});

<span class="hljs-comment">// good</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> y = x + <span class="hljs-number">1</span>;
  <span class="hljs-keyword">return</span> x * y;
});</code></pre>
<p>如果一个函数的返回值是一个无副作用的单语句，则省略大括号并且隐式返回，否则保留大括号并且使用return声明</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
[1, 2, 3].map(number => {
  const nextNumber = number + 1;
  `A string containing the ${nextNumber}.`;
});

// good
[1, 2, 3].map(number => `A string containing the ${number}.`);

// good
[1, 2, 3].map((number) => {
  const nextNumber = number + 1;
  return `A string containing the ${nextNumber}.`;
});

// good
[1, 2, 3].map((number, index) => ({
  [index]: number,
}));

// No implicit return with side effects
function foo(callback) {
  const val = callback();
  if (val === true) {
    // Do something if callback returns true
  }
}

let bool = false;

// bad
foo(() => bool = true);

// good
foo(() => {
  bool = true;
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// bad</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-params">number</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> nextNumber = <span class="hljs-built_in">number</span> + <span class="hljs-number">1</span>;
  <span class="hljs-string">`A string containing the <span class="hljs-subst">${nextNumber}</span>.`</span>;
});

<span class="hljs-comment">// good</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-params">number</span> =&gt;</span> <span class="hljs-string">`A string containing the <span class="hljs-subst">${number}</span>.`</span>);

<span class="hljs-comment">// good</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-built_in">number</span></span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> nextNumber = <span class="hljs-built_in">number</span> + <span class="hljs-number">1</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-string">`A string containing the <span class="hljs-subst">${nextNumber}</span>.`</span>;
});

<span class="hljs-comment">// good</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-built_in">number</span>, index</span>) =&gt;</span> ({
  [index]: <span class="hljs-built_in">number</span>,
}));

<span class="hljs-comment">// No implicit return with side effects</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">callback</span>) </span>{
  <span class="hljs-keyword">const</span> val = callback();
  <span class="hljs-keyword">if</span> (val === <span class="hljs-literal">true</span>) {
    <span class="hljs-comment">// Do something if callback returns true</span>
  }
}

<span class="hljs-keyword">let</span> bool = <span class="hljs-literal">false</span>;

<span class="hljs-comment">// bad</span>
foo(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> bool = <span class="hljs-literal">true</span>);

<span class="hljs-comment">// good</span>
foo(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  bool = <span class="hljs-literal">true</span>;
});
</code></pre>
<ul><li>如果函数表达式有多行，用括号将内容包裹起来，以便更好地阅读，因为它清除标记了起始和结束位置</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
['get', 'post', 'put'].map(httpMethod => Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod,
  )
);

// good
['get', 'post', 'put'].map(httpMethod => (
  Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod,
  )
));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
[<span class="hljs-string">'get'</span>, <span class="hljs-string">'post'</span>, <span class="hljs-string">'put'</span>].map(<span class="hljs-function"><span class="hljs-params">httpMethod</span> =&gt;</span> <span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod,
  )
);

<span class="hljs-comment">// good</span>
[<span class="hljs-string">'get'</span>, <span class="hljs-string">'post'</span>, <span class="hljs-string">'put'</span>].map(<span class="hljs-function"><span class="hljs-params">httpMethod</span> =&gt;</span> (
  <span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod,
  )
));</code></pre>
<ul><li>如果函数内始终只有一个参数，则省略括号，否则的话，用括号保护参数</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
[1, 2, 3].map((x) => x * x);

// good
[1, 2, 3].map(x => x * x);

// good
[1, 2, 3].map(number => (
  `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
));

// bad
[1, 2, 3].map(x => {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> x * x);

<span class="hljs-comment">// good</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x * x);

<span class="hljs-comment">// good</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-params">number</span> =&gt;</span> (
  <span class="hljs-string">`A long string with the <span class="hljs-subst">${number}</span>. It’s so long that we don’t want it to take up space on the .map line!`</span>
));

<span class="hljs-comment">// bad</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> y = x + <span class="hljs-number">1</span>;
  <span class="hljs-keyword">return</span> x * y;
});

<span class="hljs-comment">// good</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> y = x + <span class="hljs-number">1</span>;
  <span class="hljs-keyword">return</span> x * y;
});</code></pre>
<ul><li>避免将箭头函数语法（=&gt;）与比较运算符（&lt;=，&gt;=）混淆</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const itemHeight = item => item.height > 256 ? item.largeSize : item.smallSize;

// bad
const itemHeight = (item) => item.height > 256 ? item.largeSize : item.smallSize;

// good
const itemHeight = item => (item.height > 256 ? item.largeSize : item.smallSize);

// good
const itemHeight = (item) => {
  const { height, largeSize, smallSize } = item;
  return height > 256 ? largeSize : smallSize;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> itemHeight = <span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item.height &gt; <span class="hljs-number">256</span> ? item.largeSize : item.smallSize;

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> itemHeight = <span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.height &gt; <span class="hljs-number">256</span> ? item.largeSize : item.smallSize;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> itemHeight = <span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> (item.height &gt; <span class="hljs-number">256</span> ? item.largeSize : item.smallSize);

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> itemHeight = <span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> { height, largeSize, smallSize } = item;
  <span class="hljs-keyword">return</span> height &gt; <span class="hljs-number">256</span> ? largeSize : smallSize;
};</code></pre>
<h4>➰arrow Function</h4>
<ul>
<li>
<strong>箭头函数表达式</strong>的语法比函数表达式更短，并且不绑定自己的this，arguments，super或 new.target。这些函数表达式最适合用于非方法函数，并且它们不能用作构造函数</li>
<li><code>const 函数名 = (参数...) =&gt; {函数声明}||表达式</code></li>
<li>
<p>执行体为函数声明时需要加上 <code>{}</code>,参数的规则参看上文内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//支持解构函数
const f = ([a,b]=[1,2],{c:c}={c:3})=>a+b+c;
f(); ? 6;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//支持解构函数</span>
<span class="hljs-keyword">const</span> f = <span class="hljs-function">(<span class="hljs-params">[a,b]=[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>],{c:c}={c:<span class="hljs-number">3</span>}</span>)=&gt;</span>a+b+c;
f(); ? <span class="hljs-number">6</span>;</code></pre>
</li>
</ul>
<h2 id="articleHeader9">Classes &amp; Constructors（类与构造函数）</h2>
<ul><li>避免直接使用 <code>prototype</code> , 多用 <code>class</code>。因为 <code>class</code>语法更加简洁和且阅读性更棒</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function Queue(contents = []) {
  this.queue = [...contents];
}
Queue.prototype.pop = function () {
  const value = this.queue[0];
  this.queue.splice(0, 1);
  return value;
};

// good
class Queue {
  constructor(contents = []) {
    this.queue = [...contents];
  }
  pop() {
    const value = this.queue[0];
    this.queue.splice(0, 1);
    return value;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Queue</span>(<span class="hljs-params">contents = []</span>) </span>{
  <span class="hljs-keyword">this</span>.queue = [...contents];
}
Queue.prototype.pop = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> value = <span class="hljs-keyword">this</span>.queue[<span class="hljs-number">0</span>];
  <span class="hljs-keyword">this</span>.queue.splice(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>);
  <span class="hljs-keyword">return</span> value;
};

<span class="hljs-comment">// good</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Queue</span> </span>{
  <span class="hljs-keyword">constructor</span>(contents = []) {
    <span class="hljs-keyword">this</span>.queue = [...contents];
  }
  pop() {
    <span class="hljs-keyword">const</span> value = <span class="hljs-keyword">this</span>.queue[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">this</span>.queue.splice(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>);
    <span class="hljs-keyword">return</span> value;
  }
}</code></pre>
<ul><li>使用 <code>extends</code> 实现继承，因为这是继承原型的内置功能</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function () {
  return this.queue[0];
};

// good
class PeekableQueue extends Queue {
  peek() {
    return this.queue[0];
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> inherits = <span class="hljs-built_in">require</span>(<span class="hljs-string">'inherits'</span>);
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">PeekableQueue</span>(<span class="hljs-params">contents</span>) </span>{
  Queue.apply(<span class="hljs-keyword">this</span>, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.queue[<span class="hljs-number">0</span>];
};

<span class="hljs-comment">// good</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">PeekableQueue</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Queue</span> </span>{
  peek() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.queue[<span class="hljs-number">0</span>];
  }
}</code></pre>
<ul><li>方法可以通过返回 <code>this</code> 来优化方法链</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
Jedi.prototype.jump = function () {
  this.jumping = true;
  return true;
};

Jedi.prototype.setHeight = function (height) {
  this.height = height;
};

const luke = new Jedi();
luke.jump(); // => true
luke.setHeight(20); // => undefined

// good
class Jedi {
  jump() {
    this.jumping = true;
    return this;
  }

  setHeight(height) {
    this.height = height;
    return this;
  }
}

const luke = new Jedi();

luke.jump()
luke.setHeight(20);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
Jedi.prototype.jump = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.jumping = <span class="hljs-literal">true</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
};

Jedi.prototype.setHeight = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">height</span>) </span>{
  <span class="hljs-keyword">this</span>.height = height;
};

<span class="hljs-keyword">const</span> luke = <span class="hljs-keyword">new</span> Jedi();
luke.jump(); <span class="hljs-comment">// =&gt; true</span>
luke.setHeight(<span class="hljs-number">20</span>); <span class="hljs-comment">// =&gt; undefined</span>

<span class="hljs-comment">// good</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Jedi</span> </span>{
  jump() {
    <span class="hljs-keyword">this</span>.jumping = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }

  setHeight(height) {
    <span class="hljs-keyword">this</span>.height = height;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }
}

<span class="hljs-keyword">const</span> luke = <span class="hljs-keyword">new</span> Jedi();

luke.jump()
luke.setHeight(<span class="hljs-number">20</span>);</code></pre>
<ul><li>写一个通用的 <code>toString()</code> 方法也没问题，但是需要保证其能执行且没有其他影响</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Jedi {
  constructor(options = {}) {
    this.name = options.name || 'no name';
  }

  getName() {
    return this.name;
  }

  toString() {
    return `Jedi - ${this.getName()}`;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Jedi</span> </span>{
  <span class="hljs-keyword">constructor</span>(options = {}) {
    <span class="hljs-keyword">this</span>.name = options.name || <span class="hljs-string">'no name'</span>;
  }

  getName() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
  }

  toString() {
    <span class="hljs-keyword">return</span> <span class="hljs-string">`Jedi - <span class="hljs-subst">${<span class="hljs-keyword">this</span>.getName()}</span>`</span>;
  }
}</code></pre>
<ul><li>如果没有指定类，那么类需要有一个默认的构造方法。一个空的构造函数或者只是委托给父类是没有必要的</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
class Jedi {
  constructor() {}

  getName() {
    return this.name;
  }
}

// bad
class Rey extends Jedi {
  constructor(...args) {
    super(...args);
  }
}

// good
class Rey extends Jedi {
  constructor(...args) {
    super(...args);
    this.name = 'Rey';
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Jedi</span> </span>{
  <span class="hljs-keyword">constructor</span>() {}

  getName() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
  }
}

<span class="hljs-comment">// bad</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Rey</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Jedi</span> </span>{
  <span class="hljs-keyword">constructor</span>(...args) {
    <span class="hljs-keyword">super</span>(...args);
  }
}

<span class="hljs-comment">// good</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Rey</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Jedi</span> </span>{
  <span class="hljs-keyword">constructor</span>(...args) {
    <span class="hljs-keyword">super</span>(...args);
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Rey'</span>;
  }
}</code></pre>
<ul><li>避免出现两个一样的类成员，因为前一个成员会被覆盖从而导致错误</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
class Foo {
  bar() { return 1; }
  bar() { return 2; }
}

// good
class Foo {
  bar() { return 1; }
}

// good
class Foo {
  bar() { return 2; }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Foo</span> </span>{
  bar() { <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>; }
  bar() { <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>; }
}

<span class="hljs-comment">// good</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Foo</span> </span>{
  bar() { <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>; }
}

<span class="hljs-comment">// good</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Foo</span> </span>{
  bar() { <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>; }
}</code></pre>
<h2 id="articleHeader10">Modules（模块）</h2>
<ul><li>始终使用模块(<code>import</code>/<code>export</code>)来代替非标准的模块系统。你可以选择你喜欢的模块系统，因为模块代表未来</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const AirbnbStyleGuide = require('./AirbnbStyleGuide');
module.exports = AirbnbStyleGuide.es6;

// ok
import AirbnbStyleGuide from './AirbnbStyleGuide';
export default AirbnbStyleGuide.es6;

// best
import { es6 } from './AirbnbStyleGuide';
export default es6;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> AirbnbStyleGuide = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./AirbnbStyleGuide'</span>);
<span class="hljs-built_in">module</span>.exports = AirbnbStyleGuide.es6;

<span class="hljs-comment">// ok</span>
<span class="hljs-keyword">import</span> AirbnbStyleGuide <span class="hljs-keyword">from</span> <span class="hljs-string">'./AirbnbStyleGuide'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> AirbnbStyleGuide.es6;

<span class="hljs-comment">// best</span>
<span class="hljs-keyword">import</span> { es6 } <span class="hljs-keyword">from</span> <span class="hljs-string">'./AirbnbStyleGuide'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> es6;</code></pre>
<ul><li>不要使用通配符进行导出，从而保证你输出一个独立的导出</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
import * as AirbnbStyleGuide from './AirbnbStyleGuide';

// good
import AirbnbStyleGuide from './AirbnbStyleGuide';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> AirbnbStyleGuide <span class="hljs-keyword">from</span> <span class="hljs-string">'./AirbnbStyleGuide'</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">import</span> AirbnbStyleGuide <span class="hljs-keyword">from</span> <span class="hljs-string">'./AirbnbStyleGuide'</span>;</code></pre>
<ul><li>不要把导入和导出写在一起，虽然一行简明扼要，但是我们更需要明确的导入方式和导出方式，保持其一致性</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
// filename es6.js
export { es6 as default } from './AirbnbStyleGuide';

// good
// filename es6.js
import { es6 } from './AirbnbStyleGuide';
export default es6;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-comment">// filename es6.js</span>
<span class="hljs-keyword">export</span> { es6 <span class="hljs-keyword">as</span> <span class="hljs-keyword">default</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'./AirbnbStyleGuide'</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-comment">// filename es6.js</span>
<span class="hljs-keyword">import</span> { es6 } <span class="hljs-keyword">from</span> <span class="hljs-string">'./AirbnbStyleGuide'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> es6;</code></pre>
<ul><li>一个路径一次支持一个导入，因为一个路径一次支持有多个导入，会使代码变得难以维护</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
import foo from 'foo';
// … some other imports … //
import { named1, named2 } from 'foo';

// good
import foo, { named1, named2 } from 'foo';

// good
import foo, {
  named1,
  named2,
} from 'foo';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">import</span> foo <span class="hljs-keyword">from</span> <span class="hljs-string">'foo'</span>;
<span class="hljs-comment">// … some other imports … //</span>
<span class="hljs-keyword">import</span> { named1, named2 } <span class="hljs-keyword">from</span> <span class="hljs-string">'foo'</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">import</span> foo, { named1, named2 } <span class="hljs-keyword">from</span> <span class="hljs-string">'foo'</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">import</span> foo, {
  named1,
  named2,
} <span class="hljs-keyword">from</span> <span class="hljs-string">'foo'</span>;</code></pre>
<ul><li>拒绝导出可变绑定，这种方式通常应该避免，但是不排除有某些特殊情况需要这么做，但是应该记住，通常只导出常量引用</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
let foo = 3;
export { foo };
 
// good
const foo = 3;
export { foo };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">let</span> foo = <span class="hljs-number">3</span>;
<span class="hljs-keyword">export</span> { foo };
 
<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> foo = <span class="hljs-number">3</span>;
<span class="hljs-keyword">export</span> { foo };</code></pre>
<ul><li>在具有单一导出的模块中，建议使用默认导出而不是命名导出，这样对于代码的可读性和可维护性更加友好</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
export function foo() {}

// good
export default function foo() {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{}</code></pre>
<ul><li>把所有的导入语句放在一起</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
import foo from 'foo';
foo.init();

import bar from 'bar';

// good
import foo from 'foo';
import bar from 'bar';

foo.init();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">import</span> foo <span class="hljs-keyword">from</span> <span class="hljs-string">'foo'</span>;
foo.init();

<span class="hljs-keyword">import</span> bar <span class="hljs-keyword">from</span> <span class="hljs-string">'bar'</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">import</span> foo <span class="hljs-keyword">from</span> <span class="hljs-string">'foo'</span>;
<span class="hljs-keyword">import</span> bar <span class="hljs-keyword">from</span> <span class="hljs-string">'bar'</span>;

foo.init();</code></pre>
<ul><li>多行导入应该项多行数组和对象一样缩进，这样保持 <code>{}</code> 内容的一致性</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
import {longNameA, longNameB, longNameC, longNameD, longNameE} from 'path';

// good
import {
  longNameA,
  longNameB,
  longNameC,
  longNameD,
  longNameE,
} from 'path';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">import</span> {longNameA, longNameB, longNameC, longNameD, longNameE} <span class="hljs-keyword">from</span> <span class="hljs-string">'path'</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">import</span> {
  longNameA,
  longNameB,
  longNameC,
  longNameD,
  longNameE,
} <span class="hljs-keyword">from</span> <span class="hljs-string">'path'</span>;</code></pre>
<ul><li>导出语句中不允许出现 <code>webpack</code> 加载器语法。因为导入中使用加载器语法会将代码耦合到模块打包器中，，更建议使用 <code>webpack.config.js</code>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
import fooSass from 'css!sass!foo.scss';
import barCss from 'style!css!bar.css';

// good
import fooSass from 'foo.scss';
import barCss from 'bar.css';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">import</span> fooSass <span class="hljs-keyword">from</span> <span class="hljs-string">'css!sass!foo.scss'</span>;
<span class="hljs-keyword">import</span> barCss <span class="hljs-keyword">from</span> <span class="hljs-string">'style!css!bar.css'</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">import</span> fooSass <span class="hljs-keyword">from</span> <span class="hljs-string">'foo.scss'</span>;
<span class="hljs-keyword">import</span> barCss <span class="hljs-keyword">from</span> <span class="hljs-string">'bar.css'</span>;</code></pre>
<h2 id="articleHeader11">Iterators and Generators（迭代器和发生器）</h2>
<ul><li>不要使用迭代器，更推荐使用javascript的高阶方法而不是 <code>for-in</code>，<code>for-of</code> 这些。使用 <code>map()</code>，<code>every()</code>，<code>filter()</code>，<code>find()</code>，<code>findIndex()</code>，<code>reduce()</code>，<code>some()</code> 等遍历数组，以及<code>Object.keys()</code>，<code>Object.values()</code>，<code>Object.entries()</code>去生成数组，以便迭代对象。因为处理返回值的纯函数更容易定位问题</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const numbers = [1, 2, 3, 4, 5];

// bad
let sum = 0;
for (let num of numbers) {
  sum += num;
}
sum === 15;

// good
let sum = 0;
numbers.forEach((num) => {
  sum += num;
});
sum === 15;

// best (use the functional force)
const sum = numbers.reduce((total, num) => total + num, 0);
sum === 15;

// bad
const increasedByOne = [];
for (let i = 0; i < numbers.length; i++) {
  increasedByOne.push(numbers[i] + 1);
}

// good
const increasedByOne = [];
numbers.forEach((num) => {
  increasedByOne.push(num + 1);
});

// best (keeping it functional)
const increasedByOne = numbers.map(num => num + 1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">let</span> sum = <span class="hljs-number">0</span>;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> num <span class="hljs-keyword">of</span> numbers) {
  sum += num;
}
sum === <span class="hljs-number">15</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">let</span> sum = <span class="hljs-number">0</span>;
numbers.forEach(<span class="hljs-function">(<span class="hljs-params">num</span>) =&gt;</span> {
  sum += num;
});
sum === <span class="hljs-number">15</span>;

<span class="hljs-comment">// best (use the functional force)</span>
<span class="hljs-keyword">const</span> sum = numbers.reduce(<span class="hljs-function">(<span class="hljs-params">total, num</span>) =&gt;</span> total + num, <span class="hljs-number">0</span>);
sum === <span class="hljs-number">15</span>;

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> increasedByOne = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; numbers.length; i++) {
  increasedByOne.push(numbers[i] + <span class="hljs-number">1</span>);
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> increasedByOne = [];
numbers.forEach(<span class="hljs-function">(<span class="hljs-params">num</span>) =&gt;</span> {
  increasedByOne.push(num + <span class="hljs-number">1</span>);
});

<span class="hljs-comment">// best (keeping it functional)</span>
<span class="hljs-keyword">const</span> increasedByOne = numbers.map(<span class="hljs-function"><span class="hljs-params">num</span> =&gt;</span> num + <span class="hljs-number">1</span>);</code></pre>
<ul>
<li>不要使用发生器，因为他们还没有很好的兼容</li>
<li>如果你一定要用发生器，一定要注意关键字符的间距，举个例子，<code>function*</code> 是一个不同于 <code>function</code> 的独特构造，并且 <code>*</code>是其构造的一部分</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function * foo() {
  // ...
}

// bad
const bar = function * () {
  // ...
};

// bad
const baz = function *() {
  // ...
};
 
// bad
const quux = function*() {
  // ...
};

// bad
function*foo() {
  // ...
}

// bad
function *foo() {
  // ...
}

// very bad
function*
foo() {
  // ...
}
  
// very bad
const wat = function*
() {
  // ...
};

// good
function* foo() {
  // ...
}

// good
const foo = function* () {
  // ...
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> * <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> bar = <span class="hljs-function"><span class="hljs-keyword">function</span> * (<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
};

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> baz = <span class="hljs-function"><span class="hljs-keyword">function</span> *(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
};
 
<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> quux = <span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
};

<span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span>*<span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// very bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span>*
<span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
}
  
<span class="hljs-comment">// very bad</span>
<span class="hljs-keyword">const</span> wat = <span class="hljs-function"><span class="hljs-keyword">function</span>*
(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
};

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
};</code></pre>
<h2 id="articleHeader12">Properties（属性）</h2>
<ul><li>通过常量访问属性的时候使用 <code>.</code>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const luke = {
  jedi: true,
  age: 28,
};

// bad
const isJedi = luke['jedi'];

// good
const isJedi = luke.jedi;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> luke = {
  <span class="hljs-attr">jedi</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">age</span>: <span class="hljs-number">28</span>,
};

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> isJedi = luke[<span class="hljs-string">'jedi'</span>];

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> isJedi = luke.jedi;</code></pre>
<ul><li>通过变量访问属性的时候用 <code>[]</code>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const luke = {
  jedi: true,
  age: 28,
};

function getProp(prop) {
  return luke[prop];
}

const isJedi = getProp('jedi');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> luke = {
  <span class="hljs-attr">jedi</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">age</span>: <span class="hljs-number">28</span>,
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getProp</span>(<span class="hljs-params">prop</span>) </span>{
  <span class="hljs-keyword">return</span> luke[prop];
}

<span class="hljs-keyword">const</span> isJedi = getProp(<span class="hljs-string">'jedi'</span>);</code></pre>
<ul><li>使用 <code>**</code> 进行指数运算</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const binary = Math.pow(2, 10);

// good
const binary = 2 ** 10;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> binary = <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>, <span class="hljs-number">10</span>);

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> binary = <span class="hljs-number">2</span> ** <span class="hljs-number">10</span>;</code></pre>
<h2 id="articleHeader13">Variables（变量）</h2>
<ul><li>总是使用 <code>const</code> 或者 <code>let</code> 来声明变量，这样做可以避免污染全局命名空间</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
superPower = new SuperPower();

// good
const superPower = new SuperPower();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
superPower = <span class="hljs-keyword">new</span> SuperPower();

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> superPower = <span class="hljs-keyword">new</span> SuperPower();</code></pre>
<ul><li>每个变量声明都对应一个 <code>const</code> 或者 <code>let</code>。这样做，可以独立的声明每一个变量，而不需要考虑 <code>;</code>和<code>,</code>的关系，同时也方便对每个声明进行调试，而不是跳过所有的声明</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const items = getItems(),
    goSportsTeam = true,
    dragonball = 'z';
  
// bad
// (compare to above, and try to spot the mistake)
const items = getItems(),
    goSportsTeam = true;
    dragonball = 'z';
      
// good
const items = getItems();
const goSportsTeam = true;
const dragonball = 'z';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> items = getItems(),
    goSportsTeam = <span class="hljs-literal">true</span>,
    dragonball = <span class="hljs-string">'z'</span>;
  
<span class="hljs-comment">// bad</span>
<span class="hljs-comment">// (compare to above, and try to spot the mistake)</span>
<span class="hljs-keyword">const</span> items = getItems(),
    goSportsTeam = <span class="hljs-literal">true</span>;
    dragonball = <span class="hljs-string">'z'</span>;
      
<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> items = getItems();
<span class="hljs-keyword">const</span> goSportsTeam = <span class="hljs-literal">true</span>;
<span class="hljs-keyword">const</span> dragonball = <span class="hljs-string">'z'</span>;</code></pre>
<ul><li>对 <code>let</code> 和 <code>const</code> 进行分组，这样增强代码可读性</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
let i, len, dragonball,
    items = getItems(),
    goSportsTeam = true;
 
// bad
let i;
const items = getItems();
let dragonball;
const goSportsTeam = true;
let len;
  
// good
const goSportsTeam = true;
const items = getItems();
let dragonball;
let i;
let length;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">let</span> i, len, dragonball,
    items = getItems(),
    goSportsTeam = <span class="hljs-literal">true</span>;
 
<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">let</span> i;
<span class="hljs-keyword">const</span> items = getItems();
<span class="hljs-keyword">let</span> dragonball;
<span class="hljs-keyword">const</span> goSportsTeam = <span class="hljs-literal">true</span>;
<span class="hljs-keyword">let</span> len;
  
<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> goSportsTeam = <span class="hljs-literal">true</span>;
<span class="hljs-keyword">const</span> items = getItems();
<span class="hljs-keyword">let</span> dragonball;
<span class="hljs-keyword">let</span> i;
<span class="hljs-keyword">let</span> length;</code></pre>
<ul><li>在需要的地方声明变量，因为 <code>const</code> 和 <code>let</code> 是块作用域而不是函数作用域</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad - unnecessary function call
function checkName(hasName) {
  const name = getName();

  if (hasName === 'test') {
    return false;
  }

  if (name === 'test') {
    this.setName('');
    return false;
  }

  return name;
}

// good
function checkName(hasName) {
  if (hasName === 'test') {
    return false;
  }

  const name = getName();

  if (name === 'test') {
    this.setName('');
    return false;
  }

  return name;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad - unnecessary function call</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkName</span>(<span class="hljs-params">hasName</span>) </span>{
  <span class="hljs-keyword">const</span> name = getName();

  <span class="hljs-keyword">if</span> (hasName === <span class="hljs-string">'test'</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

  <span class="hljs-keyword">if</span> (name === <span class="hljs-string">'test'</span>) {
    <span class="hljs-keyword">this</span>.setName(<span class="hljs-string">''</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

  <span class="hljs-keyword">return</span> name;
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkName</span>(<span class="hljs-params">hasName</span>) </span>{
  <span class="hljs-keyword">if</span> (hasName === <span class="hljs-string">'test'</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

  <span class="hljs-keyword">const</span> name = getName();

  <span class="hljs-keyword">if</span> (name === <span class="hljs-string">'test'</span>) {
    <span class="hljs-keyword">this</span>.setName(<span class="hljs-string">''</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

  <span class="hljs-keyword">return</span> name;
}</code></pre>
<ul><li>不要进行链式声明变量的操作，这样可能创建隐式的全局变量</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
(function example() {
  // JavaScript interprets this as
  // let a = ( b = ( c = 1 ) );
  // The let keyword only applies to variable a; variables b and c become
  // global variables.
  let a = b = c = 1;
}());

console.log(a); // throws ReferenceError
console.log(b); // 1
console.log(c); // 1

// good
(function example() {
  let a = 1;
  let b = a;
  let c = a;
}());

console.log(a); // throws ReferenceError
console.log(b); // throws ReferenceError
console.log(c); // throws ReferenceError
  
// the same applies for `const`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">example</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// JavaScript interprets this as</span>
  <span class="hljs-comment">// let a = ( b = ( c = 1 ) );</span>
  <span class="hljs-comment">// The let keyword only applies to variable a; variables b and c become</span>
  <span class="hljs-comment">// global variables.</span>
  <span class="hljs-keyword">let</span> a = b = c = <span class="hljs-number">1</span>;
}());

<span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// throws ReferenceError</span>
<span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(c); <span class="hljs-comment">// 1</span>

<span class="hljs-comment">// good</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">example</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> a = <span class="hljs-number">1</span>;
  <span class="hljs-keyword">let</span> b = a;
  <span class="hljs-keyword">let</span> c = a;
}());

<span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// throws ReferenceError</span>
<span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// throws ReferenceError</span>
<span class="hljs-built_in">console</span>.log(c); <span class="hljs-comment">// throws ReferenceError</span>
  
<span class="hljs-comment">// the same applies for `const`</span></code></pre>
<p>不要使用一元递增和递减操作符（++，--），因为一元递增和一元递减可能受到分号插入的影响，并且可能导致应用中的值递增或者递减，并且不会报错。使用 <code>num += 1</code> 类似的语句也更加有表现力，并且可以避免预先递增或者递减从而导致程序发生意外</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const array = [1, 2, 3];
let num = 1;
num++;
--num;
  
let sum = 0;
let truthyCount = 0;
for (let i = 0; i < array.length; i++) {
  let value = array[i];
  sum += value;
  if (value) {
    truthyCount++;
  }
}
  
// good
const array = [1, 2, 3];
let num = 1;
num += 1;
num -= 1;
  
const sum = array.reduce((a, b) => a + b, 0);
const truthyCount = array.filter(Boolean).length;
```                          
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>// bad
const <span class="hljs-built_in">array</span> = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-built_in">let</span> <span class="hljs-built_in">num</span> = <span class="hljs-number">1</span>;
<span class="hljs-built_in">num</span>++;
--<span class="hljs-built_in">num</span>;
  
<span class="hljs-built_in">let</span> <span class="hljs-built_in">sum</span> = <span class="hljs-number">0</span>;
<span class="hljs-built_in">let</span> truthyCount = <span class="hljs-number">0</span>;
<span class="hljs-keyword">for</span> (<span class="hljs-built_in">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">array</span>.<span class="hljs-built_in">length</span>; i++) {
  <span class="hljs-built_in">let</span> value = <span class="hljs-built_in">array</span>[i];
  <span class="hljs-built_in">sum</span> += value;
  <span class="hljs-keyword">if</span> (value) {
    truthyCount++;
  }
}
  
// good
const <span class="hljs-built_in">array</span> = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-built_in">let</span> <span class="hljs-built_in">num</span> = <span class="hljs-number">1</span>;
<span class="hljs-built_in">num</span> += <span class="hljs-number">1</span>;
<span class="hljs-built_in">num</span> -= <span class="hljs-number">1</span>;
  
const <span class="hljs-built_in">sum</span> = <span class="hljs-built_in">array</span>.reduce((a, b) =&gt; a + b, <span class="hljs-number">0</span>);
const truthyCount = <span class="hljs-built_in">array</span>.filter(Boolean).<span class="hljs-built_in">length</span>;
```                          
</code></pre>
<h2 id="articleHeader14">Hoisting（变量提升）</h2>
<ul><li>
<code>var</code> 声明被置于函数作用域的顶部，但是他们的赋值不是， <code>const</code>和<code>let</code>声明会被置于一个新概念<strong>TDZ</strong>内。因此， <code>typeof()</code> 方法不再安全</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// we know this wouldn’t work (assuming there
// is no notDefined global variable)
function example() {
  console.log(notDefined); // => throws a ReferenceError
}

// creating a variable declaration after you
// reference the variable will work due to
// variable hoisting. Note: the assignment
// value of `true` is not hoisted.
function example() {
  console.log(declaredButNotAssigned); // => undefined
  var declaredButNotAssigned = true;
}

// the interpreter is hoisting the variable
// declaration to the top of the scope,
// which means our example could be rewritten as:
function example() {
  let declaredButNotAssigned;
  console.log(declaredButNotAssigned); // => undefined
  declaredButNotAssigned = true;
}

// using const and let
function example() {
  console.log(declaredButNotAssigned); // => throws a ReferenceError
  console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
  const declaredButNotAssigned = true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// we know this wouldn’t work (assuming there</span>
<span class="hljs-comment">// is no notDefined global variable)</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">example</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(notDefined); <span class="hljs-comment">// =&gt; throws a ReferenceError</span>
}

<span class="hljs-comment">// creating a variable declaration after you</span>
<span class="hljs-comment">// reference the variable will work due to</span>
<span class="hljs-comment">// variable hoisting. <span class="hljs-doctag">Note:</span> the assignment</span>
<span class="hljs-comment">// value of `true` is not hoisted.</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">example</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(declaredButNotAssigned); <span class="hljs-comment">// =&gt; undefined</span>
  <span class="hljs-keyword">var</span> declaredButNotAssigned = <span class="hljs-literal">true</span>;
}

<span class="hljs-comment">// the interpreter is hoisting the variable</span>
<span class="hljs-comment">// declaration to the top of the scope,</span>
<span class="hljs-comment">// which means our example could be rewritten as:</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">example</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> declaredButNotAssigned;
  <span class="hljs-built_in">console</span>.log(declaredButNotAssigned); <span class="hljs-comment">// =&gt; undefined</span>
  declaredButNotAssigned = <span class="hljs-literal">true</span>;
}

<span class="hljs-comment">// using const and let</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">example</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(declaredButNotAssigned); <span class="hljs-comment">// =&gt; throws a ReferenceError</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> declaredButNotAssigned); <span class="hljs-comment">// =&gt; throws a ReferenceError</span>
  <span class="hljs-keyword">const</span> declaredButNotAssigned = <span class="hljs-literal">true</span>;
}</code></pre>
<ul><li>匿名函数表达式会提升变量名，而不是函数赋值</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function example() {
  console.log(anonymous); // => undefined

  anonymous(); // => TypeError anonymous is not a function

  var anonymous = function () {
    console.log('anonymous function expression');
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">example</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(anonymous); <span class="hljs-comment">// =&gt; undefined</span>

  anonymous(); <span class="hljs-comment">// =&gt; TypeError anonymous is not a function</span>

  <span class="hljs-keyword">var</span> anonymous = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'anonymous function expression'</span>);
  };
}</code></pre>
<ul><li>命名函数表达式提升变量名，而不是函数名或者函数体</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function example() {
  console.log(named); // => undefined

  named(); // => TypeError named is not a function

  superPower(); // => ReferenceError superPower is not defined

  var named = function superPower() {
    console.log('Flying');
  };
}

// the same is true when the function name
// is the same as the variable name.
function example() {
  console.log(named); // => undefined

  named(); // => TypeError named is not a function

  var named = function named() {
    console.log('named');
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">example</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(named); <span class="hljs-comment">// =&gt; undefined</span>

  named(); <span class="hljs-comment">// =&gt; TypeError named is not a function</span>

  superPower(); <span class="hljs-comment">// =&gt; ReferenceError superPower is not defined</span>

  <span class="hljs-keyword">var</span> named = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">superPower</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Flying'</span>);
  };
}

<span class="hljs-comment">// the same is true when the function name</span>
<span class="hljs-comment">// is the same as the variable name.</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">example</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(named); <span class="hljs-comment">// =&gt; undefined</span>

  named(); <span class="hljs-comment">// =&gt; TypeError named is not a function</span>

  <span class="hljs-keyword">var</span> named = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">named</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'named'</span>);
  };
}</code></pre>
<ul><li>函数声明提升其名字和函数体</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function example() {
  superPower(); // => Flying

  function superPower() {
    console.log('Flying');
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">example</span>(<span class="hljs-params"></span>) </span>{
  superPower(); <span class="hljs-comment">// =&gt; Flying</span>

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">superPower</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Flying'</span>);
  }
}</code></pre>
<h2 id="articleHeader15">Comparison Operators &amp; Equality（比较操作符和等号）</h2>
<ul>
<li>使用 <code>===</code>,<code>!==</code> 取代 <code>==</code>,<code>!=</code>
</li>
<li>
<p>条件语句比如 <code>if</code> 会强制使用 <code>ToBoolean</code> 抽象方法来进行转换，并且遵循以下规则：</p>
<ul>
<li>
<strong>Objects</strong> 转换为 <strong>true</strong>
</li>
<li>
<strong>Undefined</strong> 转换为 <strong>false</strong>
</li>
<li>
<strong>Null</strong> 转换为 <strong>false</strong>
</li>
<li>
<strong>Booleans</strong> 转换为 <strong>the value of the boolean</strong>
</li>
<li>
<strong>Numbers</strong> 转换为 <strong>false</strong> 如果是 <strong>+0, -0, or NaN</strong>, 其余为 <strong>true</strong>
</li>
<li>
<p><strong>Strings</strong> 转换为 <strong>false</strong> 如果是空字符串 <code>''</code>, 其余为 <strong>true</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if ([0] &amp;&amp; []) {
  // true
  // an array (even an empty one) is an object, objects will evaluate to true
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> ([<span class="hljs-number">0</span>] &amp;&amp; []) {
  <span class="hljs-comment">// true</span>
  <span class="hljs-comment">// an array (even an empty one) is an object, objects will evaluate to true</span>
}</code></pre>
</li>
</ul>
</li>
<li>使用布尔值的快捷比较方式，但是显示比较字符串和数字</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
if (isValid === true) {
  // ...
}

// good
if (isValid) {
  // ...
}

// bad
if (name) {
  // ...
}

// good
if (name !== '') {
  // ...
}

// bad
if (collection.length) {
  // ...
}

// good
if (collection.length > 0) {
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">if</span> (isValid === <span class="hljs-literal">true</span>) {
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">if</span> (isValid) {
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">if</span> (name) {
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">if</span> (name !== <span class="hljs-string">''</span>) {
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">if</span> (collection.length) {
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">if</span> (collection.length &gt; <span class="hljs-number">0</span>) {
  <span class="hljs-comment">// ...</span>
}</code></pre>
<ul><li>在 <code>switch</code> 语句中的 <code>case</code> 和 <code>default</code> 使用 <code>{}</code> 来创建块，比如<code>let</code>, <code>const</code>, <code>function</code>, <code>class</code> 也是如此。因为在整个 <code>switch</code> 块中词法声明是随处可见的，但是只有在赋值时才会被初始化，且只有 <code>case</code> 值达到时才会发生。但是当多个 <code>case</code> 子句试图定义相同的东西时，就会发生问题</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
switch (foo) {
  case 1:
    let x = 1;
    break;
  case 2:
    const y = 2;
    break;
  case 3:
    function f() {
      // ...
    }
    break;
  default:
    class C {}
}

// good
switch (foo) {
  case 1: {
    let x = 1;
    break;
  }
  case 2: {
    const y = 2;
    break;
  }
  case 3: {
    function f() {
      // ...
    }
    break;
  }
  case 4:
    bar();
    break;
  default: {
    class C {}
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">switch</span> (foo) {
  <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
    <span class="hljs-keyword">let</span> x = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">break</span>;
  <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
    <span class="hljs-keyword">const</span> y = <span class="hljs-number">2</span>;
    <span class="hljs-keyword">break</span>;
  <span class="hljs-keyword">case</span> <span class="hljs-number">3</span>:
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// ...</span>
    }
    <span class="hljs-keyword">break</span>;
  <span class="hljs-keyword">default</span>:
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> </span>{}
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">switch</span> (foo) {
  <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>: {
    <span class="hljs-keyword">let</span> x = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">break</span>;
  }
  <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>: {
    <span class="hljs-keyword">const</span> y = <span class="hljs-number">2</span>;
    <span class="hljs-keyword">break</span>;
  }
  <span class="hljs-keyword">case</span> <span class="hljs-number">3</span>: {
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// ...</span>
    }
    <span class="hljs-keyword">break</span>;
  }
  <span class="hljs-keyword">case</span> <span class="hljs-number">4</span>:
    bar();
    <span class="hljs-keyword">break</span>;
  <span class="hljs-keyword">default</span>: {
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> </span>{}
  }
}</code></pre>
<ul><li>三元表达式不应该嵌套，而应该单行表达</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const foo = maybe1 > maybe2
  ? &quot;bar&quot;
  : value1 > value2 ? &quot;baz&quot; : null;

// split into 2 separated ternary expressions
const maybeNull = value1 > value2 ? 'baz' : null;

// better
const foo = maybe1 > maybe2
  ? 'bar'
  : maybeNull;

// best
const foo = maybe1 > maybe2 ? 'bar' : maybeNull;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> foo = maybe1 &gt; maybe2
  ? <span class="hljs-string">"bar"</span>
  : value1 &gt; value2 ? <span class="hljs-string">"baz"</span> : <span class="hljs-literal">null</span>;

<span class="hljs-comment">// split into 2 separated ternary expressions</span>
<span class="hljs-keyword">const</span> maybeNull = value1 &gt; value2 ? <span class="hljs-string">'baz'</span> : <span class="hljs-literal">null</span>;

<span class="hljs-comment">// better</span>
<span class="hljs-keyword">const</span> foo = maybe1 &gt; maybe2
  ? <span class="hljs-string">'bar'</span>
  : maybeNull;

<span class="hljs-comment">// best</span>
<span class="hljs-keyword">const</span> foo = maybe1 &gt; maybe2 ? <span class="hljs-string">'bar'</span> : maybeNull;</code></pre>
<ul><li>没事不要随便用三元表达式</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const foo = a ? a : b;
const bar = c ? true : false;
const baz = c ? false : true;

// good
const foo = a || b;
const bar = !!c;
const baz = !c;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> foo = a ? a : b;
<span class="hljs-keyword">const</span> bar = c ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>;
<span class="hljs-keyword">const</span> baz = c ? <span class="hljs-literal">false</span> : <span class="hljs-literal">true</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> foo = a || b;
<span class="hljs-keyword">const</span> bar = !!c;
<span class="hljs-keyword">const</span> baz = !c;</code></pre>
<ul><li>当多个运算符混在一个语句中时，将需要的运算符括在括号里面，并且用括号区分开 <code>**</code>,<code>%</code>与 <code>+</code>,<code>-</code>,<code>*</code>,<code>/</code>,这样代码更加有可读性，并且澄清了开发者的意图</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const foo = a &amp;&amp; b < 0 || c > 0 || d + 1 === 0;

// bad
const bar = a ** b - 5 % d;

// bad
// one may be confused into thinking (a || b) &amp;&amp; c
if (a || b &amp;&amp; c) {
  return d;
}
 
// good
const foo = (a &amp;&amp; b < 0) || c > 0 || (d + 1 === 0);

// good
const bar = (a ** b) - (5 % d);

// good
if (a || (b &amp;&amp; c)) {
  return d;
}

// good
const bar = a + b / c * d;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> foo = a &amp;&amp; b &lt; <span class="hljs-number">0</span> || c &gt; <span class="hljs-number">0</span> || d + <span class="hljs-number">1</span> === <span class="hljs-number">0</span>;

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> bar = a ** b - <span class="hljs-number">5</span> % d;

<span class="hljs-comment">// bad</span>
<span class="hljs-comment">// one may be confused into thinking (a || b) &amp;&amp; c</span>
<span class="hljs-keyword">if</span> (a || b &amp;&amp; c) {
  <span class="hljs-keyword">return</span> d;
}
 
<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> foo = (a &amp;&amp; b &lt; <span class="hljs-number">0</span>) || c &gt; <span class="hljs-number">0</span> || (d + <span class="hljs-number">1</span> === <span class="hljs-number">0</span>);

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> bar = (a ** b) - (<span class="hljs-number">5</span> % d);

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">if</span> (a || (b &amp;&amp; c)) {
  <span class="hljs-keyword">return</span> d;
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> bar = a + b / c * d;</code></pre>
<h2 id="articleHeader16">Blocks（块）</h2>
<ul><li>所有的多行块都要用 <code>{}</code>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
if (test)
  return false;

// good
if (test) return false;

// good
if (test) {
  return false;
}

// bad
function foo() { return false; }

// good
function bar() {
  return false;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">if</span> (test)
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">if</span> (test) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">if</span> (test) {
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
}

<span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>; }

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
}</code></pre>
<ul><li>如果使用 <code>if else</code>, <code>else</code> 需要和 <code>if</code> 的 <code>}</code> 在同一行</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
if (test) {
  thing1();
  thing2();
}
else {
  thing3();
}

// good
if (test) {
  thing1();
  thing2();
} else {
  thing3();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">if</span> (test) {
  thing1();
  thing2();
}
<span class="hljs-keyword">else</span> {
  thing3();
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">if</span> (test) {
  thing1();
  thing2();
} <span class="hljs-keyword">else</span> {
  thing3();
}</code></pre>
<ul><li>如果一个 <code>if else</code> 语句内每个代码块都用了 <code>return</code> 语句，那么 <code>else</code> 语句就没有必要，分成多个 <code>if</code> 语句就行了</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function foo() {
  if (x) {
    return x;
  } else {
    return y;
  }
}

// bad
function cats() {
  if (x) {
    return x;
  } else if (y) {
    return y;
  }
}
 
// bad
function dogs() {
  if (x) {
    return x;
  } else {
    if (y) {
      return y;
    }
  }
}

// good
function foo() {
  if (x) {
    return x;
  }

  return y;
}

// good
function cats() {
  if (x) {
    return x;
  }

  if (y) {
    return y;
  }
}
 
//good
function dogs(x) {
  if (x) {
    if (z) {
      return y;
    }
  } else {
    return z;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (x) {
    <span class="hljs-keyword">return</span> x;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> y;
  }
}

<span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cats</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (x) {
    <span class="hljs-keyword">return</span> x;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (y) {
    <span class="hljs-keyword">return</span> y;
  }
}
 
<span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dogs</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (x) {
    <span class="hljs-keyword">return</span> x;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">if</span> (y) {
      <span class="hljs-keyword">return</span> y;
    }
  }
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (x) {
    <span class="hljs-keyword">return</span> x;
  }

  <span class="hljs-keyword">return</span> y;
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cats</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (x) {
    <span class="hljs-keyword">return</span> x;
  }

  <span class="hljs-keyword">if</span> (y) {
    <span class="hljs-keyword">return</span> y;
  }
}
 
<span class="hljs-comment">//good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dogs</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">if</span> (x) {
    <span class="hljs-keyword">if</span> (z) {
      <span class="hljs-keyword">return</span> y;
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> z;
  }
}</code></pre>
<h2 id="articleHeader17">Control Statements（控制语句）</h2>
<ul><li>如果你的控制语句，比如 <code>if</code>,<code>while</code>等很长，或者超过了行宽，你可以对其中的内容进行换行，但是需要注意，逻辑运算符需要放在行首</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
if ((foo === 123 || bar === 'abc') &amp;&amp; doesItLookGoodWhenItBecomesThatLong() &amp;&amp; isThisReallyHappening()) {
  thing1();
}

// bad
if (foo === 123 &amp;&amp;
  bar === 'abc') {
  thing1();
}

// bad
if (foo === 123
  &amp;&amp; bar === 'abc') {
  thing1();
}

// bad
if (
  foo === 123 &amp;&amp;
  bar === 'abc'
) {
  thing1();
}

// good
if (
  foo === 123
  &amp;&amp; bar === 'abc'
) {
  thing1();
}

// good
if (
  (foo === 123 || bar === &quot;abc&quot;)
  &amp;&amp; doesItLookGoodWhenItBecomesThatLong()
  &amp;&amp; isThisReallyHappening()
) {
  thing1();
}

// good
if (foo === 123 &amp;&amp; bar === 'abc') {
  thing1();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">if</span> ((foo === <span class="hljs-number">123</span> || bar === <span class="hljs-string">'abc'</span>) &amp;&amp; doesItLookGoodWhenItBecomesThatLong() &amp;&amp; isThisReallyHappening()) {
  thing1();
}

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">if</span> (foo === <span class="hljs-number">123</span> &amp;&amp;
  bar === <span class="hljs-string">'abc'</span>) {
  thing1();
}

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">if</span> (foo === <span class="hljs-number">123</span>
  &amp;&amp; bar === <span class="hljs-string">'abc'</span>) {
  thing1();
}

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">if</span> (
  foo === <span class="hljs-number">123</span> &amp;&amp;
  bar === <span class="hljs-string">'abc'</span>
) {
  thing1();
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">if</span> (
  foo === <span class="hljs-number">123</span>
  &amp;&amp; bar === <span class="hljs-string">'abc'</span>
) {
  thing1();
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">if</span> (
  (foo === <span class="hljs-number">123</span> || bar === <span class="hljs-string">"abc"</span>)
  &amp;&amp; doesItLookGoodWhenItBecomesThatLong()
  &amp;&amp; isThisReallyHappening()
) {
  thing1();
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">if</span> (foo === <span class="hljs-number">123</span> &amp;&amp; bar === <span class="hljs-string">'abc'</span>) {
  thing1();
}</code></pre>
<h2 id="articleHeader18">Comments（注释）</h2>
<p>多行注释使用 <code>/** ... */</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
// make() returns a new element
// based on the passed in tag name
//
// @param {String} tag
// @return {Element} element
function make(tag) {
    
  // ...
    
  return element;
}
 
// good
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
    function make(tag) {
 
  // ...
 
  return element;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// bad</span>
<span class="hljs-comment">// make() returns a new element</span>
<span class="hljs-comment">// based on the passed in tag name</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// @param {String} tag</span>
<span class="hljs-comment">// @return {Element} element</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">make</span><span class="hljs-params">(tag)</span> </span>{
    
  <span class="hljs-comment">// ...</span>
    
  <span class="hljs-keyword">return</span> element;
}
 
<span class="hljs-comment">// good</span>
<span class="hljs-comment">/**
 * make() returns a new element
 * based on the passed-in tag name
 */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">make</span><span class="hljs-params">(tag)</span> </span>{
 
  <span class="hljs-comment">// ...</span>
 
  <span class="hljs-keyword">return</span> element;
}
</code></pre>
<ul><li>单行注释用 <code>//</code>,并且在注释内容的上一行，在注释语句之前要空一行，当然，如果注释在文件的第一行就不需要空行了</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const active = true;  // is current tab

// good
// is current tab
const active = true;

// bad
function getType() {
  console.log('fetching type...');
  // set the default type to 'no type'
  const type = this.type || 'no type';

  return type;
}

// good
function getType() {
  console.log('fetching type...');

  // set the default type to 'no type'
  const type = this.type || 'no type';
  return type;
}

// also good
function getType() {
  // set the default type to 'no type'
  const type = this.type || 'no type';
  return type;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> active = <span class="hljs-literal">true</span>;  <span class="hljs-comment">// is current tab</span>

<span class="hljs-comment">// good</span>
<span class="hljs-comment">// is current tab</span>
<span class="hljs-keyword">const</span> active = <span class="hljs-literal">true</span>;

<span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getType</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fetching type...'</span>);
  <span class="hljs-comment">// set the default type to 'no type'</span>
  <span class="hljs-keyword">const</span> type = <span class="hljs-keyword">this</span>.type || <span class="hljs-string">'no type'</span>;

  <span class="hljs-keyword">return</span> type;
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getType</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fetching type...'</span>);

  <span class="hljs-comment">// set the default type to 'no type'</span>
  <span class="hljs-keyword">const</span> type = <span class="hljs-keyword">this</span>.type || <span class="hljs-string">'no type'</span>;
  <span class="hljs-keyword">return</span> type;
}

<span class="hljs-comment">// also good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getType</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// set the default type to 'no type'</span>
  <span class="hljs-keyword">const</span> type = <span class="hljs-keyword">this</span>.type || <span class="hljs-string">'no type'</span>;
  <span class="hljs-keyword">return</span> type;
}</code></pre>
<ul><li>注释文字以空格作为开始，方便阅读</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
//is current tab
const active = true;
  
// good
// is current tab
const active = true;
  
// bad
/**
 *make() returns a new element
 *based on the passed-in tag name
 */
function make(tag) {
  
  // ...
  
  return element;
}
  
// good
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
function make(tag) {
  
  // ...
  
  return element;
}

 - 为你的提交或者评论加上 `FIXME` 或者 `TODO` 的前缀，好让其他开发者迅速明白你的意思。 `FIXME`表示这个问题需要弄清楚，`TODO`表示这个问题需要解决

 - 使用 `// FIXME` 去注释问题

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-comment">//is current tab</span>
<span class="hljs-keyword">const</span> active = <span class="hljs-literal">true</span>;
  
<span class="hljs-comment">// good</span>
<span class="hljs-comment">// is current tab</span>
<span class="hljs-keyword">const</span> active = <span class="hljs-literal">true</span>;
  
<span class="hljs-comment">// bad</span>
<span class="hljs-comment">/**
 *make() returns a new element
 *based on the passed-in tag name
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">make</span>(<span class="hljs-params">tag</span>) </span>{
  
  <span class="hljs-comment">// ...</span>
  
  <span class="hljs-keyword">return</span> element;
}
  
<span class="hljs-comment">// good</span>
<span class="hljs-comment">/**
 * make() returns a new element
 * based on the passed-in tag name
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">make</span>(<span class="hljs-params">tag</span>) </span>{
  
  <span class="hljs-comment">// ...</span>
  
  <span class="hljs-keyword">return</span> element;
}

 - 为你的提交或者评论加上 <span class="hljs-string">`FIXME`</span> 或者 <span class="hljs-string">`TODO`</span> 的前缀，好让其他开发者迅速明白你的意思。 <span class="hljs-string">`FIXME`</span>表示这个问题需要弄清楚，<span class="hljs-string">`TODO`</span>表示这个问题需要解决

 - 使用 <span class="hljs-string">`// FIXME`</span> 去注释问题

</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Calculator extends Abacus {
  constructor() {
    super();

    // FIXME: shouldn’t use a global here
    total = 0;
  }
}
```
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Calculator</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Abacus</span> </span>{
  constructor() {
    <span class="hljs-keyword">super</span>();

    <span class="hljs-comment">// <span class="hljs-doctag">FIXME:</span> shouldn’t use a global here</span>
    total = <span class="hljs-number">0</span>;
  }
}
```
</code></pre>
<ul><li>使用 <code>// TODO</code> 去注释问题的解决方法</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Calculator extends Abacus {
  constructor() {
    super();
  
    // TODO: total should be configurable by an options param
    this.total = 0;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Calculator</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Abacus</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>();
  
    <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span> total should be configurable by an options param</span>
    <span class="hljs-keyword">this</span>.total = <span class="hljs-number">0</span>;
  }
}</code></pre>
<h2 id="articleHeader19">Whitespace（空格）</h2>
<ul><li>使用 <code>tab</code> 去设置两个空格</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function foo() {
∙∙∙∙let name;
}

// bad
function bar() {
∙let name;
}

// good
function baz() {
∙∙let name;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
∙∙∙∙<span class="hljs-keyword">let</span> name;
}

<span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
∙<span class="hljs-keyword">let</span> name;
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">baz</span>(<span class="hljs-params"></span>) </span>{
∙∙<span class="hljs-keyword">let</span> name;
}</code></pre>
<ul><li>使用 <code>{}</code> 之前空一格</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function test(){
  console.log('test');
}

// good
function test() {
  console.log('test');
}

// bad
dog.set('attr',{
  age: '1 year',
  breed: 'Bernese Mountain Dog',
});

// good
dog.set('attr', {
  age: '1 year',
  breed: 'Bernese Mountain Dog',
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'test'</span>);
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'test'</span>);
}

<span class="hljs-comment">// bad</span>
dog.set(<span class="hljs-string">'attr'</span>,{
  <span class="hljs-attr">age</span>: <span class="hljs-string">'1 year'</span>,
  <span class="hljs-attr">breed</span>: <span class="hljs-string">'Bernese Mountain Dog'</span>,
});

<span class="hljs-comment">// good</span>
dog.set(<span class="hljs-string">'attr'</span>, {
  <span class="hljs-attr">age</span>: <span class="hljs-string">'1 year'</span>,
  <span class="hljs-attr">breed</span>: <span class="hljs-string">'Bernese Mountain Dog'</span>,
});</code></pre>
<ul><li>判断语句（if,while）左括号之前加一个空格，在函数声明，函数调用，参数列表的 <code>()</code> 不需要空格</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
if(isJedi) {
  fight ();
}

// good
if (isJedi) {
  fight();
}

// bad
function fight () {
  console.log ('Swooosh!');
}

// good
function fight() {
  console.log('Swooosh!');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">if</span>(isJedi) {
  fight ();
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">if</span> (isJedi) {
  fight();
}

<span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fight</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log (<span class="hljs-string">'Swooosh!'</span>);
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fight</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Swooosh!'</span>);
}</code></pre>
<ul><li>操作符之间要加空格</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const x=y+5;

// good
const x = y + 5;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> x=y+<span class="hljs-number">5</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> x = y + <span class="hljs-number">5</span>;</code></pre>
<ul><li>文件导出通过换行符结束</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
import { es6 } from './AirbnbStyleGuide';
  // ...
export default es6;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">import</span> { es6 } <span class="hljs-keyword">from</span> <span class="hljs-string">'./AirbnbStyleGuide'</span>;
  <span class="hljs-comment">// ...</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> es6;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
import { es6 } from './AirbnbStyleGuide';
  // ...
export default es6;↵
↵" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">import</span> { es6 } <span class="hljs-keyword">from</span> <span class="hljs-string">'./AirbnbStyleGuide'</span>;
  <span class="hljs-comment">// ...</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> es6;↵
↵</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// good
import { es6 } from './AirbnbStyleGuide';
  // ...
export default es6;↵" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// good</span>
<span class="hljs-keyword">import</span> { es6 } <span class="hljs-keyword">from</span> <span class="hljs-string">'./AirbnbStyleGuide'</span>;
  <span class="hljs-comment">// ...</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> es6;↵</code></pre>
<ul><li>如果写一个长的方法链（连续使用超过三个方法）时，使用缩进来表示层级关系。使用前导点来表示该行是一个方法调用而不是一个新的语句</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
$('#items').find('.selected').highlight().end().find('.open').updateCount();

// bad
$('#items').
  find('.selected').
    highlight().
    end().
  find('.open').
    updateCount();

// good
$('#items')
  .find('.selected')
    .highlight()
    .end()
  .find('.open')
    .updateCount();

// bad
const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
    .attr('width', (radius + margin) * 2).append('svg:g')
    .attr('transform', `translate(${radius + margin},${radius + margin})`)
    .call(tron.led);

// good
const leds = stage.selectAll('.led')
    .data(data)
  .enter().append('svg:svg')
    .classed('led', true)
    .attr('width', (radius + margin) * 2)
  .append('svg:g')
    .attr('transform', `translate(${radius + margin},${radius + margin})`)
    .call(tron.led);

// good
const leds = stage.selectAll('.led').data(data);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
$(<span class="hljs-string">'#items'</span>).find(<span class="hljs-string">'.selected'</span>).highlight().end().find(<span class="hljs-string">'.open'</span>).updateCount();

<span class="hljs-comment">// bad</span>
$(<span class="hljs-string">'#items'</span>).
  find(<span class="hljs-string">'.selected'</span>).
    highlight().
    end().
  find(<span class="hljs-string">'.open'</span>).
    updateCount();

<span class="hljs-comment">// good</span>
$(<span class="hljs-string">'#items'</span>)
  .find(<span class="hljs-string">'.selected'</span>)
    .highlight()
    .end()
  .find(<span class="hljs-string">'.open'</span>)
    .updateCount();

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> leds = stage.selectAll(<span class="hljs-string">'.led'</span>).data(data).enter().append(<span class="hljs-string">'svg:svg'</span>).classed(<span class="hljs-string">'led'</span>, <span class="hljs-literal">true</span>)
    .attr(<span class="hljs-string">'width'</span>, (radius + margin) * <span class="hljs-number">2</span>).append(<span class="hljs-string">'svg:g'</span>)
    .attr(<span class="hljs-string">'transform'</span>, <span class="hljs-string">`translate(<span class="hljs-subst">${radius + margin}</span>,<span class="hljs-subst">${radius + margin}</span>)`</span>)
    .call(tron.led);

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> leds = stage.selectAll(<span class="hljs-string">'.led'</span>)
    .data(data)
  .enter().append(<span class="hljs-string">'svg:svg'</span>)
    .classed(<span class="hljs-string">'led'</span>, <span class="hljs-literal">true</span>)
    .attr(<span class="hljs-string">'width'</span>, (radius + margin) * <span class="hljs-number">2</span>)
  .append(<span class="hljs-string">'svg:g'</span>)
    .attr(<span class="hljs-string">'transform'</span>, <span class="hljs-string">`translate(<span class="hljs-subst">${radius + margin}</span>,<span class="hljs-subst">${radius + margin}</span>)`</span>)
    .call(tron.led);

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> leds = stage.selectAll(<span class="hljs-string">'.led'</span>).data(data);</code></pre>
<ul><li>块与块，块与语句之间需要空一行</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
if (foo) {
  return bar;
}
return baz;

// good
if (foo) {
  return bar;
}

return baz;

// bad
const obj = {
  foo() {
  },
  bar() {
  },
};
return obj;

// good
const obj = {
  foo() {
  },

  bar() {
  },
};

return obj;

// bad
const arr = [
  function foo() {
  },
  function bar() {
  },
];
return arr;

// good
const arr = [
  function foo() {
  },

  function bar() {
  },
];

return arr;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">if</span> (foo) {
  <span class="hljs-keyword">return</span> bar;
}
<span class="hljs-keyword">return</span> baz;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">if</span> (foo) {
  <span class="hljs-keyword">return</span> bar;
}

<span class="hljs-keyword">return</span> baz;

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> obj = {
  foo() {
  },
  bar() {
  },
};
<span class="hljs-keyword">return</span> obj;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> obj = {
  foo() {
  },

  bar() {
  },
};

<span class="hljs-keyword">return</span> obj;

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> arr = [
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  },
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
  },
];
<span class="hljs-keyword">return</span> arr;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> arr = [
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  },

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
  },
];

<span class="hljs-keyword">return</span> arr;</code></pre>
<ul><li>块内不要空行</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function bar() {

  console.log(foo);

}

// bad
if (baz) {

  console.log(qux);
} else {
  console.log(foo);

}

// bad  
class Foo {

  constructor(bar) {
    this.bar = bar;
  }
}

// good
function bar() {
  console.log(foo);
}

// good
if (baz) {
  console.log(qux);
} else {
  console.log(foo);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{

  <span class="hljs-built_in">console</span>.log(foo);

}

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">if</span> (baz) {

  <span class="hljs-built_in">console</span>.log(qux);
} <span class="hljs-keyword">else</span> {
  <span class="hljs-built_in">console</span>.log(foo);

}

<span class="hljs-comment">// bad  </span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Foo</span> </span>{

  <span class="hljs-keyword">constructor</span>(bar) {
    <span class="hljs-keyword">this</span>.bar = bar;
  }
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(foo);
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">if</span> (baz) {
  <span class="hljs-built_in">console</span>.log(qux);
} <span class="hljs-keyword">else</span> {
  <span class="hljs-built_in">console</span>.log(foo);
}</code></pre>
<ul><li>
<code>()</code> 里面不要加空格</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function bar( foo ) {
  return foo;
}

// good
function bar(foo) {
  return foo;
}

// bad
if ( foo ) {
  console.log(foo);
}

// good
if (foo) {
  console.log(foo);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"> foo </span>) </span>{
  <span class="hljs-keyword">return</span> foo;
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params">foo</span>) </span>{
  <span class="hljs-keyword">return</span> foo;
}

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">if</span> ( foo ) {
  <span class="hljs-built_in">console</span>.log(foo);
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">if</span> (foo) {
  <span class="hljs-built_in">console</span>.log(foo);
}</code></pre>
<ul><li>
<code>[]</code> 不要随意加空格</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const foo = [ 1, 2, 3 ];
console.log(foo[ 0 ]);

// good
const foo = [1, 2, 3];
console.log(foo[0]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> foo = [ <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span> ];
<span class="hljs-built_in">console</span>.log(foo[ <span class="hljs-number">0</span> ]);

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> foo = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-built_in">console</span>.log(foo[<span class="hljs-number">0</span>]);</code></pre>
<ul><li>
<code>{}</code> 里面要加空格</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const foo = {clark: 'kent'};

// good
const foo = { clark: 'kent' };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> foo = {<span class="hljs-attr">clark</span>: <span class="hljs-string">'kent'</span>};

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> foo = { <span class="hljs-attr">clark</span>: <span class="hljs-string">'kent'</span> };</code></pre>
<ul><li>除了之前提到的长字符串，避免出现一行代码超过100个字符的情况，这样确保了可维护性和可读性</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const foo = jsonData &amp;&amp; jsonData.foo &amp;&amp; jsonData.foo.bar &amp;&amp; jsonData.foo.bar.baz &amp;&amp; jsonData.foo.bar.baz.quux &amp;&amp; jsonData.foo.bar.baz.quux.xyzzy;

// bad
$.ajax({ method: 'POST', url: 'https://airbnb.com/', data: { name: 'John' } }).done(() => console.log('Congratulations!')).fail(() => console.log('You have failed this city.'));

// good
const foo = jsonData
  &amp;&amp; jsonData.foo
  &amp;&amp; jsonData.foo.bar
  &amp;&amp; jsonData.foo.bar.baz
  &amp;&amp; jsonData.foo.bar.baz.quux
  &amp;&amp; jsonData.foo.bar.baz.quux.xyzzy;

// good
$.ajax({
  method: 'POST',
  url: 'https://airbnb.com/',
  data: { name: 'John' },
})
  .done(() => console.log('Congratulations!'))
  .fail(() => console.log('You have failed this city.'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> foo = jsonData &amp;&amp; jsonData.foo &amp;&amp; jsonData.foo.bar &amp;&amp; jsonData.foo.bar.baz &amp;&amp; jsonData.foo.bar.baz.quux &amp;&amp; jsonData.foo.bar.baz.quux.xyzzy;

<span class="hljs-comment">// bad</span>
$.ajax({ <span class="hljs-attr">method</span>: <span class="hljs-string">'POST'</span>, <span class="hljs-attr">url</span>: <span class="hljs-string">'https://airbnb.com/'</span>, <span class="hljs-attr">data</span>: { <span class="hljs-attr">name</span>: <span class="hljs-string">'John'</span> } }).done(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Congratulations!'</span>)).fail(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'You have failed this city.'</span>));

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> foo = jsonData
  &amp;&amp; jsonData.foo
  &amp;&amp; jsonData.foo.bar
  &amp;&amp; jsonData.foo.bar.baz
  &amp;&amp; jsonData.foo.bar.baz.quux
  &amp;&amp; jsonData.foo.bar.baz.quux.xyzzy;

<span class="hljs-comment">// good</span>
$.ajax({
  <span class="hljs-attr">method</span>: <span class="hljs-string">'POST'</span>,
  <span class="hljs-attr">url</span>: <span class="hljs-string">'https://airbnb.com/'</span>,
  <span class="hljs-attr">data</span>: { <span class="hljs-attr">name</span>: <span class="hljs-string">'John'</span> },
})
  .done(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Congratulations!'</span>))
  .fail(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'You have failed this city.'</span>));</code></pre>
<h2 id="articleHeader20">Commas（逗号）</h2>
<ul><li>逗号不要放在行首</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const story = [
    once
  , upon
  , aTime
];

// good
const story = [
  once,
  upon,
  aTime,
];

// bad
const hero = {
    firstName: 'Ada'
  , lastName: 'Lovelace'
  , birthYear: 1815
  , superPower: 'computers'
};

// good
const hero = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  birthYear: 1815,
  superPower: 'computers',
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> story = [
    once
  , upon
  , aTime
];

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> story = [
  once,
  upon,
  aTime,
];

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> hero = {
    <span class="hljs-attr">firstName</span>: <span class="hljs-string">'Ada'</span>
  , <span class="hljs-attr">lastName</span>: <span class="hljs-string">'Lovelace'</span>
  , <span class="hljs-attr">birthYear</span>: <span class="hljs-number">1815</span>
  , <span class="hljs-attr">superPower</span>: <span class="hljs-string">'computers'</span>
};

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> hero = {
  <span class="hljs-attr">firstName</span>: <span class="hljs-string">'Ada'</span>,
  <span class="hljs-attr">lastName</span>: <span class="hljs-string">'Lovelace'</span>,
  <span class="hljs-attr">birthYear</span>: <span class="hljs-number">1815</span>,
  <span class="hljs-attr">superPower</span>: <span class="hljs-string">'computers'</span>,
};</code></pre>
<p>有时需要附加的逗号，一是为了在 <code>git</code> 上能保持一致，因为 <code>git</code> 在增减之后都会带上逗号，二是一些像Babel这样的转译器会自动删除不必要的逗号，这意味着不必担心传统浏览器中的逗号尾随问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad - git diff without trailing comma
const hero = {
     firstName: 'Florence',
-    lastName: 'Nightingale'
+    lastName: 'Nightingale',
+    inventorOf: ['coxcomb chart', 'modern nursing']
};
 
// good - git diff with trailing comma
const hero = {
     firstName: 'Florence',
     lastName: 'Nightingale',
+    inventorOf: ['coxcomb chart', 'modern nursing'],
};
  
// bad
const hero = {
  firstName: 'Dana',
  lastName: 'Scully'
};
  
const heroes = [
  'Batman',
  'Superman'
];
  
// good
const hero = {
  firstName: 'Dana',
  lastName: 'Scully',
};
  
const heroes = [
  'Batman',
  'Superman',
];
  
// bad
function createHero(
  firstName,
  lastName,
  inventorOf
) {
  // does nothing
}
  
// good
function createHero(
  firstName,
  lastName,
  inventorOf,
) {
  // does nothing
}
  
// good (note that a comma must not appear after a &quot;rest&quot; element)
function createHero(
  firstName,
  lastName,
  inventorOf,
  ...heroArgs
) {
  // does nothing
}
  
// bad
createHero(
  firstName,
  lastName,
  inventorOf
);
  
// good
createHero(
  firstName,
  lastName,
  inventorOf,
);
  
// good (note that a comma must not appear after a &quot;rest&quot; element)
createHero(
  firstName,
  lastName,
  inventorOf,
  ...heroArgs
);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// bad - git diff without trailing comma</span>
<span class="hljs-keyword">const</span> hero = {
     firstName: <span class="hljs-string">'Florence'</span>,
-    lastName: <span class="hljs-string">'Nightingale'</span>
+    lastName: <span class="hljs-string">'Nightingale'</span>,
+    inventorOf: [<span class="hljs-string">'coxcomb chart'</span>, <span class="hljs-string">'modern nursing'</span>]
};
 
<span class="hljs-comment">// good - git diff with trailing comma</span>
<span class="hljs-keyword">const</span> hero = {
     firstName: <span class="hljs-string">'Florence'</span>,
     lastName: <span class="hljs-string">'Nightingale'</span>,
+    inventorOf: [<span class="hljs-string">'coxcomb chart'</span>, <span class="hljs-string">'modern nursing'</span>],
};
  
<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> hero = {
  firstName: <span class="hljs-string">'Dana'</span>,
  lastName: <span class="hljs-string">'Scully'</span>
};
  
<span class="hljs-keyword">const</span> heroes = [
  <span class="hljs-string">'Batman'</span>,
  <span class="hljs-string">'Superman'</span>
];
  
<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> hero = {
  firstName: <span class="hljs-string">'Dana'</span>,
  lastName: <span class="hljs-string">'Scully'</span>,
};
  
<span class="hljs-keyword">const</span> heroes = [
  <span class="hljs-string">'Batman'</span>,
  <span class="hljs-string">'Superman'</span>,
];
  
<span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createHero</span><span class="hljs-params">(
  firstName,
  lastName,
  inventorOf
)</span> </span>{
  <span class="hljs-comment">// does nothing</span>
}
  
<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createHero</span><span class="hljs-params">(
  firstName,
  lastName,
  inventorOf,
)</span> </span>{
  <span class="hljs-comment">// does nothing</span>
}
  
<span class="hljs-comment">// good (note that a comma must not appear after a "rest" element)</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createHero</span><span class="hljs-params">(
  firstName,
  lastName,
  inventorOf,
  <span class="hljs-rest_arg">...heroArgs</span>
)</span> </span>{
  <span class="hljs-comment">// does nothing</span>
}
  
<span class="hljs-comment">// bad</span>
createHero(
  firstName,
  lastName,
  inventorOf
);
  
<span class="hljs-comment">// good</span>
createHero(
  firstName,
  lastName,
  inventorOf,
);
  
<span class="hljs-comment">// good (note that a comma must not appear after a "rest" element)</span>
createHero(
  firstName,
  lastName,
  inventorOf,
  ...heroArgs
);
</code></pre>
<h2 id="articleHeader21">Semicolons（分号）</h2>
<ul><li>在代码的结尾一定要用 <code>;</code> 结尾，防止javascript的自动分号插入机制使整个程序报错</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad - raises exception
const luke = {}
const leia = {}
[luke, leia].forEach(jedi => jedi.father = 'vader')

// bad - raises exception
const reaction = &quot;No! That's impossible!&quot;
(async function meanwhileOnTheFalcon(){
  // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
  // ...
}())

// bad - returns `undefined` instead of the value on the next line - always happens when `return` is on a line by itself because of ASI!
function foo() {
  return
    'search your feelings, you know it to be foo'
}

// good
const luke = {};
const leia = {};
[luke, leia].forEach((jedi) => {
  jedi.father = 'vader';
});

// good
const reaction = &quot;No! That's impossible!&quot;;
(async function meanwhileOnTheFalcon(){
  // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
  // ...
}());

// good
function foo() {
  return 'search your feelings, you know it to be foo';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad - raises exception</span>
<span class="hljs-keyword">const</span> luke = {}
<span class="hljs-keyword">const</span> leia = {}
[luke, leia].forEach(<span class="hljs-function"><span class="hljs-params">jedi</span> =&gt;</span> jedi.father = <span class="hljs-string">'vader'</span>)

<span class="hljs-comment">// bad - raises exception</span>
<span class="hljs-keyword">const</span> reaction = <span class="hljs-string">"No! That's impossible!"</span>
(<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">meanwhileOnTheFalcon</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-comment">// handle `leia`, `lando`, `chewie`, `r2`, `c3p0`</span>
  <span class="hljs-comment">// ...</span>
}())

<span class="hljs-comment">// bad - returns `undefined` instead of the value on the next line - always happens when `return` is on a line by itself because of ASI!</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span>
    <span class="hljs-string">'search your feelings, you know it to be foo'</span>
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> luke = {};
<span class="hljs-keyword">const</span> leia = {};
[luke, leia].forEach(<span class="hljs-function">(<span class="hljs-params">jedi</span>) =&gt;</span> {
  jedi.father = <span class="hljs-string">'vader'</span>;
});

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> reaction = <span class="hljs-string">"No! That's impossible!"</span>;
(<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">meanwhileOnTheFalcon</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-comment">// handle `leia`, `lando`, `chewie`, `r2`, `c3p0`</span>
  <span class="hljs-comment">// ...</span>
}());

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">'search your feelings, you know it to be foo'</span>;
}</code></pre>
<h2 id="articleHeader22">Type Casting &amp; Coercion（强制类型转换）</h2>
<ul>
<li>在语句开始进行强制类型转换</li>
<li>
<code>String</code> 类型</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// => this.reviewScore = 9;

// bad
const totalScore = new String(this.reviewScore); // typeof totalScore is &quot;object&quot; not &quot;string&quot;

// bad
const totalScore = this.reviewScore + ''; // invokes this.reviewScore.valueOf()

// bad
const totalScore = this.reviewScore.toString(); // isn’t guaranteed to return a string

// good
const totalScore = String(this.reviewScore);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// =&gt; this.reviewScore = 9;</span>

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> totalScore = <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-keyword">this</span>.reviewScore); <span class="hljs-comment">// typeof totalScore is "object" not "string"</span>

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> totalScore = <span class="hljs-keyword">this</span>.reviewScore + <span class="hljs-string">''</span>; <span class="hljs-comment">// invokes this.reviewScore.valueOf()</span>

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> totalScore = <span class="hljs-keyword">this</span>.reviewScore.toString(); <span class="hljs-comment">// isn’t guaranteed to return a string</span>

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> totalScore = <span class="hljs-built_in">String</span>(<span class="hljs-keyword">this</span>.reviewScore);</code></pre>
<ul><li>
<code>Number</code> 类型，用 <code>Number</code> 或者 <code>parseInt</code> 进行强制转换，通常 <code>parseInt</code> 需要一个基数来解析字符串</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const inputValue = '4';

// bad
const val = new Number(inputValue);

// bad
const val = +inputValue;

// bad
const val = inputValue >> 0;

// bad
const val = parseInt(inputValue);

// good
const val = Number(inputValue);

// good
const val = parseInt(inputValue, 10);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> inputValue = <span class="hljs-string">'4'</span>;

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> val = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Number</span>(inputValue);

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> val = +inputValue;

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> val = inputValue &gt;&gt; <span class="hljs-number">0</span>;

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> val = <span class="hljs-built_in">parseInt</span>(inputValue);

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> val = <span class="hljs-built_in">Number</span>(inputValue);

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> val = <span class="hljs-built_in">parseInt</span>(inputValue, <span class="hljs-number">10</span>);</code></pre>
<p>如果 <code>parseInt</code> 是你代码的瓶颈，你不得不使用移位符来进行转换时，一定要在注释里面说明</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// good
/**
 * parseInt was the reason my code was slow.
 * Bitshifting the String to coerce it to a
 * Number made it a lot faster.
 */
const val = inputValue >> 0;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// good</span>
<span class="hljs-comment">/**
 * parseInt was the reason my code was slow.
 * Bitshifting the String to coerce it to a
 * Number made it a lot faster.
 */</span>
<span class="hljs-keyword">const</span> val = inputValue &gt;&gt; <span class="hljs-number">0</span>;
</code></pre>
<ul><li>使用移位操作符时需要注意，数字可以表示为64位，但是移位操作符始终返回32位的源，对于大于32位的整数，移位操作可能会导致意外发生。最大的32位支持是 2,147,483,647</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2147483647 >> 0; // => 2147483647
2147483648 >> 0; // => -2147483648
2147483649 >> 0; // => -2147483647" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-number">2147483647</span> &gt;&gt; <span class="hljs-number">0</span>; <span class="hljs-comment">// =&gt; 2147483647</span>
<span class="hljs-number">2147483648</span> &gt;&gt; <span class="hljs-number">0</span>; <span class="hljs-comment">// =&gt; -2147483648</span>
<span class="hljs-number">2147483649</span> &gt;&gt; <span class="hljs-number">0</span>; <span class="hljs-comment">// =&gt; -2147483647</span></code></pre>
<ul><li>
<code>Booleans</code> 类型</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const age = 0;

// bad
const hasAge = new Boolean(age);

// good
const hasAge = Boolean(age);

// best
const hasAge = !!age;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> age = <span class="hljs-number">0</span>;

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> hasAge = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Boolean</span>(age);

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> hasAge = <span class="hljs-built_in">Boolean</span>(age);

<span class="hljs-comment">// best</span>
<span class="hljs-keyword">const</span> hasAge = !!age;</code></pre>
<h2 id="articleHeader23">Naming Conventions（命名协议）</h2>
<ul><li>避免使用单字符命名，注意命名描述</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function q() {
  // ...
}

// good
function query() {
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">q</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">query</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
}</code></pre>
<ul><li>命名对象，函数和实例时都使用驼峰命名</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const OBJEcttsssss = {};
const this_is_my_object = {};
function c() {}

// good
const thisIsMyObject = {};
function thisIsMyFunction() {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> OBJEcttsssss = {};
<span class="hljs-keyword">const</span> this_is_my_object = {};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">c</span>(<span class="hljs-params"></span>) </span>{}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> thisIsMyObject = {};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">thisIsMyFunction</span>(<span class="hljs-params"></span>) </span>{}</code></pre>
<ul><li>对命名对象和构造函数时使用帕斯卡命名</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function user(options) {
  this.name = options.name;
}

const bad = new user({
  name: 'nope',
});

// good
class User {
  constructor(options) {
    this.name = options.name;
  }
}

const good = new User({
  name: 'yup',
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">user</span>(<span class="hljs-params">options</span>) </span>{
  <span class="hljs-keyword">this</span>.name = options.name;
}

<span class="hljs-keyword">const</span> bad = <span class="hljs-keyword">new</span> user({
  <span class="hljs-attr">name</span>: <span class="hljs-string">'nope'</span>,
});

<span class="hljs-comment">// good</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">User</span> </span>{
  <span class="hljs-keyword">constructor</span>(options) {
    <span class="hljs-keyword">this</span>.name = options.name;
  }
}

<span class="hljs-keyword">const</span> good = <span class="hljs-keyword">new</span> User({
  <span class="hljs-attr">name</span>: <span class="hljs-string">'yup'</span>,
});</code></pre>
<ul><li>头部，尾部不要使用下划线，因为JavaScript的属性或者方法没有隐私的概念。前导下换线是一个常见的惯例，表示“私人”，事实上，这些属性是完全公开的，这样会让人产生误解</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
this.__firstName__ = 'Panda';
this.firstName_ = 'Panda';
this._firstName = 'Panda';

// good
this.firstName = 'Panda';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">this</span>.__firstName__ = <span class="hljs-string">'Panda'</span>;
<span class="hljs-keyword">this</span>.firstName_ = <span class="hljs-string">'Panda'</span>;
<span class="hljs-keyword">this</span>._firstName = <span class="hljs-string">'Panda'</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">this</span>.firstName = <span class="hljs-string">'Panda'</span>;</code></pre>
<ul><li>不要保存 <code>this</code> 指针，使用箭头函数或者 <code>#</code> 绑定来取代</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function foo() {
  const self = this;
  return function () {
    console.log(self);
  };
}

// bad
function foo() {
  const that = this;
  return function () {
    console.log(that);
  };
}

// good
function foo() {
  return () => {
    console.log(this);
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> self = <span class="hljs-keyword">this</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(self);
  };
}

<span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> that = <span class="hljs-keyword">this</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(that);
  };
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
  };
}</code></pre>
<ul><li>基本文件名应该与其导出名字对应</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// file 1 contents
class CheckBox {
  // ...
}
export default CheckBox;

// file 2 contents
export default function fortyTwo() { return 42; }

// file 3 contents
export default function insideDirectory() {}

// in some other file
// bad
import CheckBox from './checkBox'; // PascalCase import/export, camelCase filename
import FortyTwo from './FortyTwo'; // PascalCase import/filename, camelCase export
import InsideDirectory from './InsideDirectory'; // PascalCase import/filename, camelCase export

// bad
import CheckBox from './check_box'; // PascalCase import/export, snake_case filename
import forty_two from './forty_two'; // snake_case import/filename, camelCase export
import inside_directory from './inside_directory'; // snake_case import, camelCase export
import index from './inside_directory/index'; // requiring the index file explicitly
import insideDirectory from './insideDirectory/index'; // requiring the index file explicitly

// good
import CheckBox from './CheckBox'; // PascalCase export/import/filename
import fortyTwo from './fortyTwo'; // camelCase export/import/filename
import insideDirectory from './insideDirectory'; // camelCase export/import/directory name/implicit &quot;index&quot;
// ^ supports both insideDirectory.js and insideDirectory/index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// file 1 contents</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CheckBox</span> </span>{
  <span class="hljs-comment">// ...</span>
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> CheckBox;

<span class="hljs-comment">// file 2 contents</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fortyTwo</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">42</span>; }

<span class="hljs-comment">// file 3 contents</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">insideDirectory</span>(<span class="hljs-params"></span>) </span>{}

<span class="hljs-comment">// in some other file</span>
<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">import</span> CheckBox <span class="hljs-keyword">from</span> <span class="hljs-string">'./checkBox'</span>; <span class="hljs-comment">// PascalCase import/export, camelCase filename</span>
<span class="hljs-keyword">import</span> FortyTwo <span class="hljs-keyword">from</span> <span class="hljs-string">'./FortyTwo'</span>; <span class="hljs-comment">// PascalCase import/filename, camelCase export</span>
<span class="hljs-keyword">import</span> InsideDirectory <span class="hljs-keyword">from</span> <span class="hljs-string">'./InsideDirectory'</span>; <span class="hljs-comment">// PascalCase import/filename, camelCase export</span>

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">import</span> CheckBox <span class="hljs-keyword">from</span> <span class="hljs-string">'./check_box'</span>; <span class="hljs-comment">// PascalCase import/export, snake_case filename</span>
<span class="hljs-keyword">import</span> forty_two <span class="hljs-keyword">from</span> <span class="hljs-string">'./forty_two'</span>; <span class="hljs-comment">// snake_case import/filename, camelCase export</span>
<span class="hljs-keyword">import</span> inside_directory <span class="hljs-keyword">from</span> <span class="hljs-string">'./inside_directory'</span>; <span class="hljs-comment">// snake_case import, camelCase export</span>
<span class="hljs-keyword">import</span> index <span class="hljs-keyword">from</span> <span class="hljs-string">'./inside_directory/index'</span>; <span class="hljs-comment">// requiring the index file explicitly</span>
<span class="hljs-keyword">import</span> insideDirectory <span class="hljs-keyword">from</span> <span class="hljs-string">'./insideDirectory/index'</span>; <span class="hljs-comment">// requiring the index file explicitly</span>

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">import</span> CheckBox <span class="hljs-keyword">from</span> <span class="hljs-string">'./CheckBox'</span>; <span class="hljs-comment">// PascalCase export/import/filename</span>
<span class="hljs-keyword">import</span> fortyTwo <span class="hljs-keyword">from</span> <span class="hljs-string">'./fortyTwo'</span>; <span class="hljs-comment">// camelCase export/import/filename</span>
<span class="hljs-keyword">import</span> insideDirectory <span class="hljs-keyword">from</span> <span class="hljs-string">'./insideDirectory'</span>; <span class="hljs-comment">// camelCase export/import/directory name/implicit "index"</span>
<span class="hljs-comment">// ^ supports both insideDirectory.js and insideDirectory/index.js</span></code></pre>
<ul><li>默认导出一个方法时，使用驼峰命名表示。同时，你的文件名应该与方法名一致</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function makeStyleGuide() {
  // ...
}

export default makeStyleGuide;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeStyleGuide</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> makeStyleGuide;</code></pre>
<ul><li>导出构造函数，类，单例，函数库等时，使用帕斯卡命名</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const AirbnbStyleGuide = {
  es6: {
  },
};

export default AirbnbStyleGuide;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> AirbnbStyleGuide = {
  <span class="hljs-attr">es6</span>: {
  },
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> AirbnbStyleGuide;</code></pre>
<ul><li>缩略词应该全是大小字母或者全是小写字母构成，这样才有可读性</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
import SmsContainer from './containers/SmsContainer';

// bad
const HttpRequests = [
  // ...
];

// good
import SMSContainer from './containers/SMSContainer';

// good
const HTTPRequests = [
  // ...
];

// also good
const httpRequests = [
  // ...
];

// best
import TextMessageContainer from './containers/TextMessageContainer';

// best
const requests = [
  // ...
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">import</span> SmsContainer <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/SmsContainer'</span>;

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> HttpRequests = [
  <span class="hljs-comment">// ...</span>
];

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">import</span> SMSContainer <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/SMSContainer'</span>;

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> HTTPRequests = [
  <span class="hljs-comment">// ...</span>
];

<span class="hljs-comment">// also good</span>
<span class="hljs-keyword">const</span> httpRequests = [
  <span class="hljs-comment">// ...</span>
];

<span class="hljs-comment">// best</span>
<span class="hljs-keyword">import</span> TextMessageContainer <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/TextMessageContainer'</span>;

<span class="hljs-comment">// best</span>
<span class="hljs-keyword">const</span> requests = [
  <span class="hljs-comment">// ...</span>
];</code></pre>
<h2 id="articleHeader24">Accessors（访问方法）</h2>
<ul>
<li>属性的访问方法不是必须的</li>
<li>不要使用JavaScript的 getters/setters，因为它们会造成意想不到的坏的影响，并且很难去测试，定位。所以如果你要用访问函数，使用 <code>getVal()</code>和 <code>setVal()</code> 这样的方式</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
class Dragon {
  get age() {
    // ...
  }

  set age(value) {
    // ...
  }
}

// good
class Dragon {
  getAge() {
    // ...
  }

  setAge(value) {
    // ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dragon</span> </span>{
  get age() {
    <span class="hljs-comment">// ...</span>
  }

  set age(value) {
    <span class="hljs-comment">// ...</span>
  }
}

<span class="hljs-comment">// good</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dragon</span> </span>{
  getAge() {
    <span class="hljs-comment">// ...</span>
  }

  setAge(value) {
    <span class="hljs-comment">// ...</span>
  }
}</code></pre>
<ul><li>如果一个属性值或者方法返回值是布尔类型，使用 <code>isVal()</code>或者 <code>hasVal()</code>这样的形式</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
if (!dragon.age()) {
  return false;
}

// good
if (!dragon.hasAge()) {
  return false;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">if</span> (!dragon.age()) {
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">if</span> (!dragon.hasAge()) {
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
}</code></pre>
<ul><li>可以创建类似 <code>get()</code> 和 <code>set()</code> 这样的函数方法，但是要注意保持一致</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Jedi {
  constructor(options = {}) {
    const lightsaber = options.lightsaber || 'blue';
    this.set('lightsaber', lightsaber);
  }

  set(key, val) {
    this[key] = val;
  }

  get(key) {
    return this[key];
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Jedi</span> </span>{
  <span class="hljs-keyword">constructor</span>(options = {}) {
    <span class="hljs-keyword">const</span> lightsaber = options.lightsaber || <span class="hljs-string">'blue'</span>;
    <span class="hljs-keyword">this</span>.set(<span class="hljs-string">'lightsaber'</span>, lightsaber);
  }

  set(key, val) {
    <span class="hljs-keyword">this</span>[key] = val;
  }

  get(key) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>[key];
  }
}</code></pre>
<h2 id="articleHeader25">Events（事件）</h2>
<ul><li>当将数据传递到事件方法里面的时候，不要使用原始值直接进行传递，应该处理成对象字面量。这样可以方便其他用户修改或者查看传递数据</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
$(this).trigger('listingUpdated', listing.id);
// ...
$(this).on('listingUpdated', (e, listingId) => {
  // do something with listingId
});

// good
$(this).trigger('listingUpdated', { listingId: listing.id });
// ...
$(this).on('listingUpdated', (e, data) => {
  // do something with data.listingId
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
$(<span class="hljs-keyword">this</span>).trigger(<span class="hljs-string">'listingUpdated'</span>, listing.id);
<span class="hljs-comment">// ...</span>
$(<span class="hljs-keyword">this</span>).on(<span class="hljs-string">'listingUpdated'</span>, (e, listingId) =&gt; {
  <span class="hljs-comment">// do something with listingId</span>
});

<span class="hljs-comment">// good</span>
$(<span class="hljs-keyword">this</span>).trigger(<span class="hljs-string">'listingUpdated'</span>, { <span class="hljs-attr">listingId</span>: listing.id });
<span class="hljs-comment">// ...</span>
$(<span class="hljs-keyword">this</span>).on(<span class="hljs-string">'listingUpdated'</span>, (e, data) =&gt; {
  <span class="hljs-comment">// do something with data.listingId</span>
});</code></pre>
<h2 id="articleHeader26">jQuery</h2>
<ul><li>通过 <code>$</code> 来声明一个承载jquery的元素</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const sidebar = $('.sidebar');

// good
const $sidebar = $('.sidebar');

// good
const $sidebarBtn = $('.sidebar-btn');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> sidebar = $(<span class="hljs-string">'.sidebar'</span>);

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> $sidebar = $(<span class="hljs-string">'.sidebar'</span>);

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> $sidebarBtn = $(<span class="hljs-string">'.sidebar-btn'</span>);</code></pre>
<ul><li>将jquery选择器缓存起来</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function setSidebar() {
  $('.sidebar').hide();

  // ...

  $('.sidebar').css({
    'background-color': 'pink',
  });
}

// good
function setSidebar() {
  const $sidebar = $('.sidebar');
  $sidebar.hide();

  // ...

  $sidebar.css({
    'background-color': 'pink',
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setSidebar</span>(<span class="hljs-params"></span>) </span>{
  $(<span class="hljs-string">'.sidebar'</span>).hide();

  <span class="hljs-comment">// ...</span>

  $(<span class="hljs-string">'.sidebar'</span>).css({
    <span class="hljs-string">'background-color'</span>: <span class="hljs-string">'pink'</span>,
  });
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setSidebar</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> $sidebar = $(<span class="hljs-string">'.sidebar'</span>);
  $sidebar.hide();

  <span class="hljs-comment">// ...</span>

  $sidebar.css({
    <span class="hljs-string">'background-color'</span>: <span class="hljs-string">'pink'</span>,
  });
}</code></pre>
<ul>
<li>对于 DOM 节点的查询使用级联 <code>$('.sidebar ul')</code> 或者 父级 &gt; 子级 <code>$('.sidebar &gt; ul')</code>
</li>
<li>块级jQuery对象查询（通过选择器对象进行查询），使用 <code>find</code>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
$('ul', '.sidebar').hide();

// bad
$('.sidebar').find('ul').hide();

// good
$('.sidebar ul').hide();

// good
$('.sidebar > ul').hide();

// good
$sidebar.find('ul').hide();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
$(<span class="hljs-string">'ul'</span>, <span class="hljs-string">'.sidebar'</span>).hide();

<span class="hljs-comment">// bad</span>
$(<span class="hljs-string">'.sidebar'</span>).find(<span class="hljs-string">'ul'</span>).hide();

<span class="hljs-comment">// good</span>
$(<span class="hljs-string">'.sidebar ul'</span>).hide();

<span class="hljs-comment">// good</span>
$(<span class="hljs-string">'.sidebar &gt; ul'</span>).hide();

<span class="hljs-comment">// good</span>
$sidebar.find(<span class="hljs-string">'ul'</span>).hide();</code></pre>
<h2 id="articleHeader27">Standard Library（标准程序库）</h2>
<ul><li>使用 <code>Number.isNaN</code> 来代替全局的 <code>isNaN</code>，因为全局的 <code>isNaN</code> 会强制将非数字类型转换为数字类型,任何强制转换为非数字的都会返回true</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
isNaN('1.2'); // false
isNaN('1.2.3'); // true

// good
Number.isNaN('1.2.3'); // false
Number.isNaN(Number('1.2.3')); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-built_in">isNaN</span>(<span class="hljs-string">'1.2'</span>); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">isNaN</span>(<span class="hljs-string">'1.2.3'</span>); <span class="hljs-comment">// true</span>

<span class="hljs-comment">// good</span>
<span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-string">'1.2.3'</span>); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-built_in">Number</span>(<span class="hljs-string">'1.2.3'</span>)); <span class="hljs-comment">// true</span></code></pre>
<ul><li>使用 <code>Number.isFinite</code> 来代替全局的 <code>isFinite</code>，因为全局的 <code>isFinite</code> 会强制将非数字类型转换为数字类型，任何强制转换为有限数字的结果都会返回true</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
isFinite('2e3'); // true

// good
Number.isFinite('2e3'); // false
Number.isFinite(parseInt('2e3', 10)); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-built_in">isFinite</span>(<span class="hljs-string">'2e3'</span>); <span class="hljs-comment">// true</span>

<span class="hljs-comment">// good</span>
<span class="hljs-built_in">Number</span>.isFinite(<span class="hljs-string">'2e3'</span>); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">Number</span>.isFinite(<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">'2e3'</span>, <span class="hljs-number">10</span>)); <span class="hljs-comment">// true</span></code></pre>
<h2 id="articleHeader28">Testing（测试）</h2>
<ul>
<li>无论您使用那种框架，都应该测试！</li>
<li>尽量去写一些写的纯函数，并且尽量减少突变情况的发生</li>
<li>谨慎使用 stubs(存根) 和 mocks(虚拟数据)，他们会让你的测试更加脆弱</li>
<li>Airbnb 主要使用 <a href="https://www.npmjs.com/package/mocha" rel="nofollow noreferrer" target="_blank"><code>mocha</code></a> 来进行测试，偶尔也用 <a href="https://www.npmjs.com/package/tape" rel="nofollow noreferrer" target="_blank"><code>tape</code></a> 来测试小的独立模块</li>
<li>100%的测试覆盖率是最理想的</li>
<li>每当你修复了一个bug，都需要写一个回归测试。未经回归测试修正的错误，未来一定会重现</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Airbnb JavaScript Style 阅读注解

## 原文链接
[https://segmentfault.com/a/1190000012875529](https://segmentfault.com/a/1190000012875529)

