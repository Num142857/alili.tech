---
title: 'es6快速入门' 
date: 2019-01-25 2:30:23
hidden: true
slug: 02a6l6a62klg
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">es6快速入门</h1>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008519223?w=560&amp;h=314" src="https://static.alili.tech/img/remote/1460000008519223?w=560&amp;h=314" alt="es6" title="es6" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">ES6简介</h3>
<p>ECMAScript 6.0（以下简称ES6）是JavaScript语言的下一代标准，已经在2015年6月正式发布了。它的目标，是使得JavaScript语言可以用来编写复杂的大型应用程序，成为企业级开发语言。</p>
<p><strong>ES6与ECMAScript2015的关系</strong></p>
<p>ES6的第一个版本，就这样在2015年6月发布了，正式名称就是《ECMAScript 2015标准》（简称ES2015）。，ES6既是一个历史名词，也是一个泛指，含义是5.1版以后的JavaScript的下一代标准，涵盖了ES2015、ES2016、ES2017等等，而ES2015则是正式名称，特指该年发布的正式版本的语言标准。</p>
<p>所以，我们可以认为ES6 = ES2015</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008519224?w=400&amp;h=400" src="https://static.alili.tech/img/remote/1460000008519224?w=400&amp;h=400" alt="呵呵" title="呵呵" style="cursor: pointer;"></span></p>
<h3 id="articleHeader2">Babel</h3>
<p>由于不是目前所有的浏览器都能兼容ES6的全部特性，所以实际的项目还是主要有ES5语法来开发。</p>
<p>这里可以看到 es6在各大浏览器的支持程度<a href="http://kangax.github.io/compat-table/es6/" rel="nofollow noreferrer" target="_blank">http://kangax.github.io/compat-table/es6/</a></p>
<p>但是ES6毕竟是以后的标准，而且约来越多的项目已经在用ES6开发了，你需要看懂别的人写的代码，同时让自己写的代码让别人看懂，最重要的是如果有天妹子问你，啥是ES6呀？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008519225?w=248&amp;h=240" src="https://static.alili.tech/img/remote/1460000008519225?w=248&amp;h=240" alt="问号" title="问号" style="cursor: pointer;"></span></p>
<p>Babel是一个广泛使用的ES6转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。可以去官网了解一下<a href="https://babeljs.io/" rel="nofollow noreferrer" target="_blank">https://babeljs.io/</a></p>
<p>Babel做的事情很简单，将ES6语法写出的代码，解析成ES5的语法，从而使得目前所有的浏览器都能正常运行。</p>
<p>比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 转码前
input.map(item => item + 1);

// 转码后
input.map(function (item) {
  return item + 1;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 转码前</span>
input.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item + <span class="hljs-number">1</span>);

<span class="hljs-comment">// 转码后</span>
input.map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item</span>) </span>{
  <span class="hljs-keyword">return</span> item + <span class="hljs-number">1</span>;
});</code></pre>
<p>可以在babel官网上，在线查看ES6代码转换成ES5是什么样子的。</p>
<p><a href="http://babeljs.io/repl/" rel="nofollow noreferrer" target="_blank">http://babeljs.io/repl/</a> 有时候不太稳定，可能需要翻一下 ┑(￣Д ￣)┍</p>
<p>在项目中使用babel需要配置.babelrc文件，存放在项目根目录下。</p>
<p>先安装 bable-cli</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-cli -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install </span><span class="hljs-keyword">babel-cli </span>-g</code></pre>
<p>然后安装一个将es6编译成es5的插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev babel-preset-es2015" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> babel-preset-es2015</code></pre>
<p>将.babelrc中添加这个配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;presets&quot;: [&quot;es2015&quot;],
    &quot;plugins&quot;: []
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"es2015"</span>],
    <span class="hljs-attr">"plugins"</span>: []
  }</code></pre>
<p>然后运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="babel es6.js -o es5.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">babel</span> <span class="hljs-selector-tag">es6</span><span class="hljs-selector-class">.js</span> <span class="hljs-selector-tag">-o</span> <span class="hljs-selector-tag">es5</span><span class="hljs-selector-class">.js</span></code></pre>
<p>就可以看到es5.js就是解析过后的脚本</p>
<p>babel有大量的插件，还需要大家自己去了解。</p>
<h3 id="articleHeader3">常用语法</h3>
<h4>let,const</h4>
<h5>let</h5>
<p>let和const的用法都类似var。let是块级作用域声明，所声明的变量，只在let所在的代码块内有效。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>{
  <span class="hljs-keyword">let</span> a = <span class="hljs-number">10</span>;
  <span class="hljs-keyword">var</span> b = <span class="hljs-number">1</span>;
}

a <span class="hljs-comment">// ReferenceError: a is not defined.</span>
b <span class="hljs-comment">// 1</span></code></pre>
<p>最为典型的例子，for循环</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
  a[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(i);
  };
}
a[<span class="hljs-number">6</span>](); <span class="hljs-comment">// 10</span></code></pre>
<p>我们往往需要使用闭包的手法来处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [];
for (var i = 0; i < 10; i++) {
  (function(i){
    a[i] = function () {
    console.log(i);
    };
  })(i);
}
a[6]();  //6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
  (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i</span>)</span>{
    a[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(i);
    };
  })(i);
}
a[<span class="hljs-number">6</span>]();  <span class="hljs-comment">//6</span></code></pre>
<p>换成let会方便很多</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
  a[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(i);
  };
}
a[<span class="hljs-number">6</span>](); <span class="hljs-comment">// 6</span></code></pre>
<p><strong>变量提升问题</strong></p>
<p>var声明会存在变量提升的问题，如果变量在声明前使用，其值则会输出 undefined。let声明则改变了这种奇怪的逻辑，let所声明的变量必须先声明，后使用，否则就会报错。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// var 的情况
console.log(foo); // undefined
var foo = 2;

// let 的情况
console.log(bar); // ReferenceError
let bar = 2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-comment">// var 的情况</span>
console.<span class="hljs-built_in">log</span>(foo); <span class="hljs-comment">// undefined</span>
var foo = <span class="hljs-number">2</span>;

<span class="hljs-comment">// let 的情况</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">bar</span>); <span class="hljs-comment">// ReferenceError</span>
<span class="hljs-keyword">let</span> <span class="hljs-built_in">bar</span> = <span class="hljs-number">2</span>;</code></pre>
<p><strong>不能重复声明</strong></p>
<p>和var不同，let不允许在相同作用域中，重复声明同一个变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 正常
function () {
  var a = 10;
  var a = 1;
}
// 报错
function () {
  let a = 10;
  var a = 1;
}

// 报错
function () {
  let a = 10;
  let a = 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 正常</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> a = <span class="hljs-number">10</span>;
  <span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
}
<span class="hljs-comment">// 报错</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> a = <span class="hljs-number">10</span>;
  <span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
}

<span class="hljs-comment">// 报错</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> a = <span class="hljs-number">10</span>;
  <span class="hljs-keyword">let</span> a = <span class="hljs-number">1</span>;
}</code></pre>
<h5>const</h5>
<p>const用来声明一个常量。一旦声明，常量的值就不能改变。而且声明后必须立即初始化赋值，不能后面赋值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//报错
const PI = 3.1415;
PI // 3.1415
PI = 3;

//报错
const DOMAIN;
DOMAIN = 'jd.com';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-comment">//报错</span>
<span class="hljs-keyword">const</span> <span class="hljs-literal">PI</span> = <span class="hljs-number">3.1415</span>;
<span class="hljs-literal">PI</span> <span class="hljs-comment">// 3.1415</span>
<span class="hljs-literal">PI</span> = <span class="hljs-number">3</span>;

<span class="hljs-comment">//报错</span>
<span class="hljs-keyword">const</span> DOMAIN;
DOMAIN = <span class="hljs-string">'jd.com'</span>;</code></pre>
<p>const和let很相似：1.只在块级作用域中有效，2.不会提升变量，3.不能重复定义变量。</p>
<p>const声明的变量虽然无法改变，但是const命令只是保证所赋值的变量指向的地址不变，并不保证改地址的数据不变，所以当赋值的变量是一个值引用型的变量的时候，要格外的小心。</p>
<h4>Class</h4>
<p>JavaScript语言的传统方法是通过构造函数，定义并生成新对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Human(name) {
  this.name = name;
}

Human.prototype.sayName = function () {
  return '(My name is' + this.name + )';
};
var zhang3 = new Human('zhang3');
var li4 = new Human('li4');
var wang5 = new Human('wang5');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">Human</span>(name) {
  this.name = name;
}

Human.prototype.sayName = <span class="hljs-keyword">function</span> <span class="hljs-title"></span>() {
  <span class="hljs-keyword">return</span> <span class="hljs-type">'(My</span> name <span class="hljs-keyword">is</span>' + this.name + )';
};
var zhang3 = <span class="hljs-keyword">new</span> Human(<span class="hljs-symbol">'zhang3</span>');
var li4 = <span class="hljs-keyword">new</span> Human(<span class="hljs-symbol">'li4</span>');
var wang5 = <span class="hljs-keyword">new</span> Human(<span class="hljs-symbol">'wang5</span>');</code></pre>
<p>ES6提供了更接近传统语言(C++和Java)的写法，引入了Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。基本上，ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用ES6的“类”改写，就是下面这样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Human {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    return '(My name is' + this.name + )';
  }
}

var zhang3 = new Human('zhang3');
var li4 = new Human('li4');
var wang5 = new Human('wang5');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Human</span> </span>{
  constructor(name) {
    <span class="hljs-keyword">this</span>.name = name;
  }
  sayName() {
    <span class="hljs-keyword">return</span> '(<span class="hljs-type">My</span> name is' + <span class="hljs-keyword">this</span>.name + )';
  }
}

<span class="hljs-keyword">var</span> zhang3 = <span class="hljs-keyword">new</span> <span class="hljs-type">Human</span>(<span class="hljs-symbol">'zhang</span>3');
<span class="hljs-keyword">var</span> li4 = <span class="hljs-keyword">new</span> <span class="hljs-type">Human</span>(<span class="hljs-symbol">'li</span>4');
<span class="hljs-keyword">var</span> wang5 = <span class="hljs-keyword">new</span> <span class="hljs-type">Human</span>(<span class="hljs-symbol">'wang</span>5');</code></pre>
<p><strong>constructor</strong></p>
<p>constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。</p>
<p>constructor方法默认返回实例对象（即this），可以指定返回另外一个对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Foo</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>);
  }
}

<span class="hljs-keyword">new</span> Foo() <span class="hljs-keyword">instanceof</span> Foo
<span class="hljs-comment">// false</span></code></pre>
<p><strong>extends</strong></p>
<p>Class之间可以通过extends关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Woman extends Human {
  constructor(name) {
    super(name); // 调用父类的constructor(name);
    this.sex = 'female';
  }
}

let hanmeimei = new Woman('hanmeimei');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Woman</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Human</span> </span>{
  constructor(name) {
    <span class="hljs-keyword">super</span>(name); <span class="hljs-comment">// 调用父类的constructor(name);</span>
    <span class="hljs-keyword">this</span>.sex = <span class="hljs-symbol">'femal</span>e';
  }
}

let hanmeimei = <span class="hljs-keyword">new</span> <span class="hljs-type">Woman</span>(<span class="hljs-symbol">'hanmeime</span>i');</code></pre>
<h4>=&gt;</h4>
<p>需要用函数表达式的地方，可以用=&gt;代替，代码简洁，而且绑定了this.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
[1, 2, 3].map(function (x) {
  return x * x;
});

// good
[1, 2, 3].map((x) => {
  return x * x;
});

// best
[1, 2, 3].map(x => x * x);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// bad</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">return</span> x * x;
});

<span class="hljs-comment">// good</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> x * x;
});

<span class="hljs-comment">// best</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x * x);</code></pre>
<p>箭头函数取代Function.prototype.bind</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const self = this;
const boundMethod = function(...params) {
  return method.apply(self, params);
}

// acceptable
const boundMethod = method.bind(this);

// best
const boundMethod = (...params) => method.apply(this, params);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> self = <span class="hljs-keyword">this</span>;
<span class="hljs-keyword">const</span> boundMethod = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-rest_arg">...params</span>)</span> </span>{
  <span class="hljs-keyword">return</span> method.apply(self, params);
}

<span class="hljs-comment">// acceptable</span>
<span class="hljs-keyword">const</span> boundMethod = method.bind(<span class="hljs-keyword">this</span>);

<span class="hljs-comment">// best</span>
<span class="hljs-keyword">const</span> boundMethod = (...params) =&gt; method.apply(<span class="hljs-keyword">this</span>, params);</code></pre>
<h4>解构</h4>
<p>ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。</p>
<p>没明白啥意思，show me the code</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008519226?w=600&amp;h=282" src="https://static.alili.tech/img/remote/1460000008519226?w=600&amp;h=282" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>数组解构赋值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// before
let a = 1;
let b = 2;
let c = 3;
//after
let [a, b, c] = [1, 2, 3];
let [foo, [[bar], baz]] = [1, [[2], 3]];
let [ , , third] = [&quot;foo&quot;, &quot;bar&quot;, &quot;baz&quot;];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// before</span>
let a = <span class="hljs-number">1</span>;
let b = <span class="hljs-number">2</span>;
let c = <span class="hljs-number">3</span>;
<span class="hljs-comment">//after</span>
let [a, b, c] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
let [foo, [[bar], baz]] = [<span class="hljs-number">1</span>, [[<span class="hljs-number">2</span>], <span class="hljs-number">3</span>]];
let [ , , third] = [<span class="hljs-string">"foo"</span>, <span class="hljs-string">"bar"</span>, <span class="hljs-string">"baz"</span>];</code></pre>
<p>对象解构赋值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let { foo, bar } = { foo: &quot;aaa&quot;, bar: &quot;bbb&quot; };
let { bar, foo } = { foo: &quot;aaa&quot;, bar: &quot;bbb&quot; };

//变量名和属性名如果不一样，可以这样写
var { foo: baz } = { foo: 'aaa', bar: 'bbb' };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>let { foo, bar } = { <span class="hljs-string">foo:</span> <span class="hljs-string">"aaa"</span>, <span class="hljs-string">bar:</span> <span class="hljs-string">"bbb"</span> };
let { bar, foo } = { <span class="hljs-string">foo:</span> <span class="hljs-string">"aaa"</span>, <span class="hljs-string">bar:</span> <span class="hljs-string">"bbb"</span> };

<span class="hljs-comment">//变量名和属性名如果不一样，可以这样写</span>
var { <span class="hljs-string">foo:</span> baz } = { <span class="hljs-string">foo:</span> <span class="hljs-string">'aaa'</span>, <span class="hljs-string">bar:</span> <span class="hljs-string">'bbb'</span> };</code></pre>
<p>字符串解构赋值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [a, b, c, d, e] = 'hello';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> [a, b, c, d, e] = <span class="hljs-string">'hello'</span>;</code></pre>
<p>还可以对数值和布尔值，函数参数解构赋值。</p>
<h4>Set和Map</h4>
<p><strong>Set</strong></p>
<p>ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 例一
var set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二
var items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

// 例三
function divs () {
  return [...document.querySelectorAll('div')];
}

var set = new Set(divs());
set.size // 56

// 类似于
divs().forEach(div => set.add(div));
set.size // 56" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment">// 例一</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">set</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">4</span>]);
[...<span class="hljs-keyword">set</span>]
<span class="hljs-comment">// [1, 2, 3, 4]</span>

<span class="hljs-comment">// 例二</span>
<span class="hljs-keyword">var</span> items = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">5</span>]);
items.size <span class="hljs-comment">// 5</span>

<span class="hljs-comment">// 例三</span>
function divs () {
  <span class="hljs-keyword">return</span> [...<span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelectorAll</span>(<span class="hljs-string">'div'</span>)];
}

<span class="hljs-keyword">var</span> <span class="hljs-keyword">set</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(divs());
<span class="hljs-keyword">set</span>.size <span class="hljs-comment">// 56</span>

<span class="hljs-comment">// 类似于</span>
divs().forEach(div =&gt; <span class="hljs-keyword">set</span>.add(div));
<span class="hljs-keyword">set</span>.size <span class="hljs-comment">// 56</span></code></pre>
<p><strong>Map</strong></p>
<p>JavaScript的对象（Object），本质上是键值对的集合（Hash结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。为了解决这个问题，ES6提供了Map数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object结构提供了“字符串—值”的对应，Map结构提供了“值—值”的对应，是一种更完善的Hash结构实现。如果你需要“键值对”的数据结构，Map比Object更合适。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var m = new Map();
var o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // &quot;content&quot;

m.has(o) // true
m.delete(o) // true
m.has(o) // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> m = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
<span class="hljs-keyword">var</span> o = {p: <span class="hljs-string">'Hello World'</span>};

m.<span class="hljs-keyword">set</span>(o, <span class="hljs-string">'content'</span>)
m.<span class="hljs-keyword">get</span>(o) <span class="hljs-comment">// "content"</span>

m.has(o) <span class="hljs-comment">// true</span>
m.delete(o) <span class="hljs-comment">// true</span>
m.has(o) <span class="hljs-comment">// false</span></code></pre>
<h4>字符串模板</h4>
<p>传统的JavaScript语言，输出模板通常是这样写的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#result').append(
  'There are <b>' + basket.count + '</b> ' +
  'items in your basket, ' +
  '<em>' + basket.onSale +
  '</em> are on sale!'
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbnet"><code>$(<span class="hljs-comment">'#result').append(</span>
  <span class="hljs-comment">'There are <span class="hljs-doctag">&lt;b&gt;</span>' + basket.count + '<span class="hljs-doctag">&lt;/b&gt;</span> ' +</span>
  <span class="hljs-comment">'items in your basket, ' +</span>
  <span class="hljs-comment">'<span class="hljs-doctag">&lt;em&gt;</span>' + basket.onSale +</span>
  <span class="hljs-comment">'<span class="hljs-doctag">&lt;/em&gt;</span> are on sale!'</span>
);</code></pre>
<p>ES6是这样解决的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">$('#result').append(`
  There are <span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>$</span><span class="hljs-template-variable">{basket.count}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span> items
   in your basket, <span class="hljs-tag">&lt;<span class="hljs-name">em</span>&gt;</span>$</span><span class="hljs-template-variable">{basket.onSale}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">em</span>&gt;</span>
  are on sale!
`);</span></code></pre>
<p>如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>$('<span class="hljs-comment">#list').html(`</span>
<span class="hljs-variable">&lt;ul&gt;</span>
  <span class="hljs-variable">&lt;li&gt;</span>first<span class="hljs-variable">&lt;/li&gt;</span>
  <span class="hljs-variable">&lt;li&gt;</span>second<span class="hljs-variable">&lt;/li&gt;</span>
<span class="hljs-variable">&lt;/ul&gt;</span>
`);</code></pre>
<p>同时字符串模板中还可以嵌入变量，变量可以写在${}里面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 1;
var y = 2;

`${x} + ${y} = ${x + y}`
// &quot;1 + 2 = 3&quot;

`${x} + ${y * 2} = ${x + y * 2}`
// &quot;1 + 4 = 5&quot;

var obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> y = <span class="hljs-number">2</span>;

<span class="hljs-string">`<span class="hljs-subst">${x}</span> + <span class="hljs-subst">${y}</span> = <span class="hljs-subst">${x + y}</span>`</span>
<span class="hljs-comment">// "1 + 2 = 3"</span>

<span class="hljs-string">`<span class="hljs-subst">${x}</span> + <span class="hljs-subst">${y * <span class="hljs-number">2</span>}</span> = <span class="hljs-subst">${x + y * <span class="hljs-number">2</span>}</span>`</span>
<span class="hljs-comment">// "1 + 4 = 5"</span>

<span class="hljs-keyword">var</span> obj = {<span class="hljs-attr">x</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">2</span>};
<span class="hljs-string">`<span class="hljs-subst">${obj.x + obj.y}</span>`</span>
<span class="hljs-comment">// 3</span></code></pre>
<p>字符串模板还支持嵌套</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
const data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
];

console.log(tmpl(data));
// <table>
//
//   <tr><td><Jane></td></tr>
//   <tr><td>Bond</td></tr>
//
//   <tr><td>Lars</td></tr>
//   <tr><td><Croft></td></tr>
//
// </table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>const tmpl = addrs =&gt; `
  <span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
  ${addrs.map(addr =&gt; `
    <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>${addr.first}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>${addr.last}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
  `).join('')}
  <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
`;
const data = [
    { first: '<span class="hljs-tag">&lt;<span class="hljs-name">Jane</span>&gt;</span>', last: 'Bond' },
    { first: 'Lars', last: '<span class="hljs-tag">&lt;<span class="hljs-name">Croft</span>&gt;</span>' },
];

console.log(tmpl(data));
// <span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
//
//   <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Jane</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
//   <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Bond<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
//
//   <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>Lars<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
//   <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Croft</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
//
// <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<h4>默认值</h4>
<p>在以前，我们声明了一个有很多参数的函数时，无法直接指定默认值，所有会很很多default配置来处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function log(x, y) {
  y = y || 'World';
  console.log(x, y);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">log</span>(<span class="hljs-params">x, y</span>) </span>{
  y = y || <span class="hljs-string">'World'</span>;
  <span class="hljs-built_in">console</span>.log(x, y);
}</code></pre>
<p>但是这种处理方法是不安全的，如果我们这样赋值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello World" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">log</span><span class="hljs-params">(<span class="hljs-string">'Hello'</span>)</span></span> <span class="hljs-comment">// Hello World</span>
<span class="hljs-function"><span class="hljs-title">log</span><span class="hljs-params">(<span class="hljs-string">'Hello'</span>, <span class="hljs-string">'China'</span>)</span></span> <span class="hljs-comment">// Hello China</span>
<span class="hljs-function"><span class="hljs-title">log</span><span class="hljs-params">(<span class="hljs-string">'Hello'</span>, <span class="hljs-string">''</span>)</span></span> <span class="hljs-comment">// Hello World</span></code></pre>
<p>ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">log</span><span class="hljs-params">(x, y = 'World')</span> {</span>
  console.<span class="hljs-built_in">log</span>(x, y);
}

<span class="hljs-built_in">log</span>(<span class="hljs-string">'Hello'</span>) <span class="hljs-comment">// Hello World</span>
<span class="hljs-built_in">log</span>(<span class="hljs-string">'Hello'</span>, <span class="hljs-string">'China'</span>) <span class="hljs-comment">// Hello China</span>
<span class="hljs-built_in">log</span>(<span class="hljs-string">'Hello'</span>, <span class="hljs-string">''</span>) <span class="hljs-comment">// Hello</span></code></pre>
<h3 id="articleHeader4">rest参数</h3>
<p>ES6 引入 rest 参数（形式为“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span><span class="hljs-params">(<span class="hljs-rest_arg">...values</span>)</span> </span>{
  let sum = <span class="hljs-number">0</span>;

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> val of values) {
    sum += val;
  }

  <span class="hljs-keyword">return</span> sum;
}

add(<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3</span>) <span class="hljs-comment">// 10</span></code></pre>
<p><strong>扩展运算符 ...</strong></p>
<p>它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。</p>
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
<p>参考资料</p>
<ul>
<li><p><a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">http://es6.ruanyifeng.com/</a></p></li>
<li><p><a href="http://www.jianshu.com/p/ebfeb687eb70" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/ebfe...</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
es6快速入门

## 原文链接
[https://segmentfault.com/a/1190000008519220](https://segmentfault.com/a/1190000008519220)

