---
title: 'ES6，你不得不学！' 
date: 2019-01-29 2:30:10
hidden: true
slug: kquf0fxkw2j
categories: [reprint]
---

{{< raw >}}

                    
<p>在没有学习 ES6 之前，学习 React，真的是一件非常痛苦的事情。即使之前你对 ES5 有着很好的基础，包括闭包、函数、原型链和继承，但是 React 中已经普遍使用 ES6 的语法，包括 modules、class、箭头函数等，还有 JSX 语法。所以，在学习 React 之前一定要先学习 ES6。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007817993?w=690&amp;h=460" src="https://static.alili.tech/img/remote/1460000007817993?w=690&amp;h=460" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>关于 ES6 你必须要知道的一个教程，<a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">ECMAScript 6入门</a>。这本书对于 ES6 的讲解非常详细，一步一步跟着来，绝对会对 ES6 的语法都了解到。</p>
<p>学习 ES6，还要知道一个 ES6 的语法编译器，<a href="http://babeljs.cn/" rel="nofollow noreferrer" target="_blank">Babel</a>。ES6 出来很久了，并不是所有浏览器都支持，Babel 就可以把 ES6 代码转换成 ES5，让所有浏览器都支持你写的代码。Babel 内嵌了对 JSX 的支持，学习 React 必备。<a href="http://babeljs.cn/repl/" rel="nofollow noreferrer" target="_blank">在线实验</a>是一个 Babel 的在线编译器，可以用来练习 ES6 语法，并实时观测转换成 ES5 的代码效果。</p>
<p>准备工作做完了，接下来开始今天的主题，你不得不学的 ES6！</p>
<h2 id="articleHeader0">箭头函数</h2>
<p>讲真，自从出了箭头函数之后，再也不用担心 this 问题了，而且就简化代码这一方面来说，箭头函数可谓是装逼神器。</p>
<p>箭头函数有几点需要注意，如果 return 值就只有一行表达式，可以省去 return，默认表示该行是返回值，否则需要加一个大括号和 return。如果参数只有一个，也可以省去括号，两个则需要加上括号。比如下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var f = v => v*2;
// 等价于
var f = function(v){
  return v*2;
}

// 判断偶数
var isEven = n => n % 2 == 0;

// 需要加 return
var = (a, b) => {
  if(a >= b)
    return a;
  return b;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> v*<span class="hljs-number">2</span>;
<span class="hljs-comment">// 等价于</span>
<span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>)</span>{
  <span class="hljs-keyword">return</span> v*<span class="hljs-number">2</span>;
}

<span class="hljs-comment">// 判断偶数</span>
<span class="hljs-keyword">var</span> isEven = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> n % <span class="hljs-number">2</span> == <span class="hljs-number">0</span>;

<span class="hljs-comment">// 需要加 return</span>
<span class="hljs-keyword">var</span> = <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span>(a &gt;= b)
    <span class="hljs-keyword">return</span> a;
  <span class="hljs-keyword">return</span> b;
}</code></pre>
<p>还有 this 的问题，我觉得<a href="http://es6.ruanyifeng.com/#docs/function#" rel="nofollow noreferrer" target="_blank">这篇文章</a>说的非常好。普通函数的 this 是可变的，<strong>我们把函数归为两种状态，一种是定义时，一种是执行时，如果仔细研究会发现，函数中的 this 始终是指向函数执行时所在的对象</strong>。比如全局函数执行时，this 执行 window，对象的方法执行时，this 执行该对象，<strong>这就是函数 this 的可变。而箭头函数中的 this 是固定的</strong>，看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function obj(){
  setTimeout(()=>console.log(this.id), 20);
}
var id = 1;
obj.call({id: 2}); // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">obj</span>(<span class="hljs-params"></span>)</span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span><span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.id), <span class="hljs-number">20</span>);
}
<span class="hljs-keyword">var</span> id = <span class="hljs-number">1</span>;
obj.call({<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>}); <span class="hljs-comment">// 2</span></code></pre>
<p>执行的结果是 2 而不是全局的 1，表示 setTimeout 函数执行的时候，this 指向的不是 window，这和普通函数是有区别的。</p>
<p>实际上，箭头函数并没有 this 对象，将箭头函数转成 ES5 会发现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES6
function obj() {
  setTimeout(()=>console.log(this.id), 20);
}

// ES5
function foo() {
  var _this = this;
  setTimeout(function () {
    console.log(_this.id);
  }, 20);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ES6</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">obj</span>(<span class="hljs-params"></span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span><span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.id), <span class="hljs-number">20</span>);
}

<span class="hljs-comment">// ES5</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(_this.id);
  }, <span class="hljs-number">20</span>);
}</code></pre>
<p>通过 call aply 等方法是无法绑定 箭头函数中的 this：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var f = () => this.x;
var x = 1;
f.call({x: 2}); // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.x;
<span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
f.call({<span class="hljs-attr">x</span>: <span class="hljs-number">2</span>}); <span class="hljs-comment">// 1</span></code></pre>
<p>对 this 的一个总结就是 在对象的方法中直接使用箭头函数，会指向 window，其他箭头函数 this 会指向上一层的 this，箭头函数并没有存储 this：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
  id: 1,
  foo: ()=>{
    return this.id;
  }
}
var id = 2;
obj.foo(); // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">foo</span>: <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.id;
  }
}
<span class="hljs-keyword">var</span> id = <span class="hljs-number">2</span>;
obj.foo(); <span class="hljs-comment">// 2</span></code></pre>
<p>除了 this 之外，箭头函数的 arguments 也是不存在，不能使用 new 来构造，也不能使用 yield 命令。</p>
<h2 id="articleHeader1">class</h2>
<p>盼星星盼月亮，终于盼来了 JS 的继承。但是 ES6 中的继承和已经很完善的 ES5 中流行的继承库，到底有多少差异？</p>
<p>先来看一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  // 注意函数构造的方式
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
var p1 = new Point(5, 5);
p1.toString(); //&quot;(5, 5)&quot;

typeof Point // function
p1.constructor == Point //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//定义类</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Point</span> </span>{
  <span class="hljs-keyword">constructor</span>(x, y) {
    <span class="hljs-keyword">this</span>.x = x;
    <span class="hljs-keyword">this</span>.y = y;
  }
  <span class="hljs-comment">// 注意函数构造的方式</span>
  toString() {
    <span class="hljs-keyword">return</span> <span class="hljs-string">'('</span> + <span class="hljs-keyword">this</span>.x + <span class="hljs-string">', '</span> + <span class="hljs-keyword">this</span>.y + <span class="hljs-string">')'</span>;
  }
}
<span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> Point(<span class="hljs-number">5</span>, <span class="hljs-number">5</span>);
p1.toString(); <span class="hljs-comment">//"(5, 5)"</span>

<span class="hljs-keyword">typeof</span> Point <span class="hljs-comment">// function</span>
p1.constructor == Point <span class="hljs-comment">//true</span></code></pre>
<p>直接使用 class 关键字，constructor 作为构造方法，函数可以直接 <code>toString(){}</code> 的方式。</p>
<p>但是，class 的本质仍然是函数，是构造函数的另外一种写法。既然 class 的本质是函数，那么必不可少的一些 proto，prototype 方法也是存在的。</p>
<h3 id="articleHeader2">关于 class 的继承</h3>
<p>通过关键字 extends 可以实现 class 的继承，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Square extends Point{
  constructor(x){
    super(x, x);
  }
  toString(){
    return super.toString() + 'Square!';
  }
}
var s1 = new Square(4);
s1.toString(); //&quot;(4, 4)Square!&quot;
s1 instanceof Point // true
s1 instanceof Square // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Square</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Point</span></span>{
  <span class="hljs-keyword">constructor</span>(x){
    <span class="hljs-keyword">super</span>(x, x);
  }
  toString(){
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">super</span>.toString() + <span class="hljs-string">'Square!'</span>;
  }
}
<span class="hljs-keyword">var</span> s1 = <span class="hljs-keyword">new</span> Square(<span class="hljs-number">4</span>);
s1.toString(); <span class="hljs-comment">//"(4, 4)Square!"</span>
s1 <span class="hljs-keyword">instanceof</span> Point <span class="hljs-comment">// true</span>
s1 <span class="hljs-keyword">instanceof</span> Square <span class="hljs-comment">// true</span></code></pre>
<p>既然说到了继承，对 es5 中继承了解到小伙伴，肯定会疑惑关于 class 中的 proto 和 prototype 是一个什么样的关系。</p>
<p>子类的 proto 指向父类，子类的 prototype 的 proto 指向父类的 prototype，这和 ES5 并没有区别。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Square.__proto__ === Point
// true
Square.prototype.__proto__ === Point.prototype
// true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Square.__proto__ === Point
<span class="hljs-comment">// true</span>
Square.prototype.__proto__ === Point.prototype
<span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader3">super 关键字</h3>
<p>在 Java 等语言中，是有 super 继承父类函数，JS 中更加灵活，可以用作父类的构造函数，又可以用作对象。</p>
<p>子类的 constructor 必须要调用 super 方法，且只能在 constructor 方法中调用，其他地方调用会报错。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class A {
  constructor(a){
    this.x = a;
  }
}
A.prototype.y = 2;
class B extends A{
  constructor(a){
    super();
  }
  getY(){
    super() // 报错
    return super.y
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> </span>{
  <span class="hljs-keyword">constructor</span>(a){
    <span class="hljs-keyword">this</span>.x = a;
  }
}
A.prototype.y = <span class="hljs-number">2</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">B</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">A</span></span>{
  <span class="hljs-keyword">constructor</span>(a){
    <span class="hljs-keyword">super</span>();
  }
  getY(){
    <span class="hljs-keyword">super</span>() <span class="hljs-comment">// 报错</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">super</span>.y
  }
}</code></pre>
<h3 id="articleHeader4">原生构造函数的继承</h3>
<p>对于一些原生的构造函数，比如 Array，Error，Object，String 等，在 ES5 是无法通过 <code>Object.create</code> 方法实现原生函数的内部属性，原生函数内部的 this 无法绑定，内部属性获得不了。<a href="http://es6.ruanyifeng.com/#docs/class#" rel="nofollow noreferrer" target="_blank">原生构造函数的继承</a>。</p>
<p>ES6 的 class 可以解决这个问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
}

var arr = new MyArray();
arr[0] = 12;
arr.length // 1

arr.length = 0;
arr[0] // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyArray</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Array</span> </span>{
  <span class="hljs-keyword">constructor</span>(...args) {
    <span class="hljs-keyword">super</span>(...args);
  }
}

<span class="hljs-keyword">var</span> arr = <span class="hljs-keyword">new</span> MyArray();
arr[<span class="hljs-number">0</span>] = <span class="hljs-number">12</span>;
arr.length <span class="hljs-comment">// 1</span>

arr.length = <span class="hljs-number">0</span>;
arr[<span class="hljs-number">0</span>] <span class="hljs-comment">// undefined</span></code></pre>
<p>extends 关键字不仅可以用来继承类，<strong>还能用来继承原生的构造函数</strong>，在原生函数的基础上，自定义自己的函数。</p>
<h3 id="articleHeader5">静态方法</h3>
<p>ES6 支持 static 关键字，该关键字定义的方法，不会被实例继承，但可以被子类继承：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class A{
  static add(x, y){
    return x + y;
 }
}
A.add(1, 2);
var a = new A();
a.add()// error
class B extends A{}
B.add(2, 2)// 4 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span></span>{
  <span class="hljs-keyword">static</span> add(x, y){
    <span class="hljs-keyword">return</span> x + y;
 }
}
A.add(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>);
<span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> A();
a.add()<span class="hljs-comment">// error</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">B</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">A</span></span>{}
B.add(<span class="hljs-number">2</span>, <span class="hljs-number">2</span>)<span class="hljs-comment">// 4 </span></code></pre>
<h2 id="articleHeader6">Module</h2>
<p>ES6 之前，JS 一直没有 modules 体系，解决外部包的问题通过 CommonJS 和 AMD 模块加载方案，一个用于服务器，一个用于浏览器。ES6 提出的 modules （import／export）方案完全可以取代 CommonJS 和 AMD 成为浏览器和服务器通用的模块解决方案。</p>
<p>关于模块，就只有两个命令，import 用于导入其他模块，export 用于输出模块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};

// main.js
import {firstName, lastName, year} from './profile';
console.log(firstName, lastName) // Michael Jackson" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// profile.js</span>
<span class="hljs-keyword">var</span> firstName = <span class="hljs-string">'Michael'</span>;
<span class="hljs-keyword">var</span> lastName = <span class="hljs-string">'Jackson'</span>;
<span class="hljs-keyword">var</span> year = <span class="hljs-number">1958</span>;

<span class="hljs-keyword">export</span> {firstName, lastName, year};

<span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> {firstName, lastName, year} <span class="hljs-keyword">from</span> <span class="hljs-string">'./profile'</span>;
<span class="hljs-built_in">console</span>.log(firstName, lastName) <span class="hljs-comment">// Michael Jackson</span></code></pre>
<p>import 加载的模块可以只加载用到的，但是必须使用同名的原则，可以用 as 来解决名字问题，同样，as 也可以解决 export 问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.js
import { lastName as surname } from './profile';
console.log(surname); // Jackson

//profile.js
export {firstName as name}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//main.js</span>
<span class="hljs-keyword">import</span> { lastName <span class="hljs-keyword">as</span> surname } <span class="hljs-keyword">from</span> <span class="hljs-string">'./profile'</span>;
<span class="hljs-built_in">console</span>.log(surname); <span class="hljs-comment">// Jackson</span>

<span class="hljs-comment">//profile.js</span>
<span class="hljs-keyword">export</span> {firstName <span class="hljs-keyword">as</span> name}</code></pre>
<p>export 可以输出的内容很多，包括变量、函数、类，貌似都可以输出，还可以借助 export default 来加载默认输出。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//default.js
function add(a, b){
  return a + b;
}
export default add;
// 实际上
export {add as default};

// main.js
import add from './default'
//实际上 add 名字可以随便起
import {default as add} from './default'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//default.js</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">a, b</span>)</span>{
  <span class="hljs-keyword">return</span> a + b;
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> add;
<span class="hljs-comment">// 实际上</span>
<span class="hljs-keyword">export</span> {add <span class="hljs-keyword">as</span> <span class="hljs-keyword">default</span>};

<span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> add <span class="hljs-keyword">from</span> <span class="hljs-string">'./default'</span>
<span class="hljs-comment">//实际上 add 名字可以随便起</span>
<span class="hljs-keyword">import</span> {<span class="hljs-keyword">default</span> <span class="hljs-keyword">as</span> add} <span class="hljs-keyword">from</span> <span class="hljs-string">'./default'</span></code></pre>
<h3 id="articleHeader7">模块加载的实质</h3>
<p>这部分 <a href="http://es6.ruanyifeng.com/#docs/module#ES6" rel="nofollow noreferrer" target="_blank">ES6模块加载的实质</a> 完全只能参考了，因为对模块加载用的不多，没有一点经验，但是看到作者提到了拷贝和引用，感觉逼格很高的样子。</p>
<p>ES6模块加载的机制，与CommonJS模块完全不同。CommonJS模块输出的是一个值的拷贝，而ES6模块输出的是值的引用。</p>
<p>比如一个 CommonJS 加载的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};

// main.js
var mod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-comment">// lib.js</span>
<span class="hljs-keyword">var</span> counter = <span class="hljs-number">3</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">incCounter</span><span class="hljs-params">()</span> <span class="hljs-comment">{
  counter++;
}</span>
<span class="hljs-title">module</span>.<span class="hljs-title">exports</span> = <span class="hljs-comment">{
  counter: counter,
  incCounter: incCounter,
}</span>;</span>

<span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">mod</span> = <span class="hljs-keyword">require</span>(<span class="hljs-string">'./lib'</span>);

console.log(<span class="hljs-keyword">mod</span>.counter);  <span class="hljs-comment">// 3</span>
<span class="hljs-keyword">mod</span>.incCounter();
console.log(<span class="hljs-keyword">mod</span>.counter); <span class="hljs-comment">// 3</span></code></pre>
<p>这个值会被 mod 缓存，而取不到原始的值。</p>
<p>ES6 中不一样，它只是生成一个引用，当真正需要的时候，才会到模块里去取值，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// lib.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> counter = <span class="hljs-number">3</span>;
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">incCounter</span>(<span class="hljs-params"></span>) </span>{
  counter++;
}

<span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> { counter, incCounter } <span class="hljs-keyword">from</span> <span class="hljs-string">'./lib'</span>;
<span class="hljs-built_in">console</span>.log(counter); <span class="hljs-comment">// 3</span>
incCounter();
<span class="hljs-built_in">console</span>.log(counter); <span class="hljs-comment">// 4</span></code></pre>
<h3 id="articleHeader8">循环加载</h3>
<p>循环加载也比较有意思，经常能看到 nodejs 中出现加载同一个模块，而循环加载却不常见，nodejs 使用 CommonJS 模块机制，CommonJS 的循环加载采用的是加载多少，输出多少，就像是我们平时打了断点一样，会跳到另外一个文件，执行完在跳回来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//a.js
exports.done = '1';
var a = require('./b.js');
console.log('half a=%s', a);
exports.done = '3';
console.log('done a');

//b.js
exports.done = '2';
var b = require('./a.js');
console.log('half b=%s', b);
exports.done = '4';
console.log('done b');

//main.js
var a = require('./a.js');
var b = require('./b.js');
console.log('all done! a=%s,b=%s',a,b)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//a.js</span>
exports.done = <span class="hljs-string">'1'</span>;
<span class="hljs-keyword">var</span> a = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./b.js'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'half a=%s'</span>, a);
exports.done = <span class="hljs-string">'3'</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'done a'</span>);

<span class="hljs-comment">//b.js</span>
exports.done = <span class="hljs-string">'2'</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./a.js'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'half b=%s'</span>, b);
exports.done = <span class="hljs-string">'4'</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'done b'</span>);

<span class="hljs-comment">//main.js</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./a.js'</span>);
<span class="hljs-keyword">var</span> b = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./b.js'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'all done! a=%s,b=%s'</span>,a,b)</code></pre>
<p><code>node main.js</code> 的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="half a=2
done a
half b=3
done b
all done! a=3,b=4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>half a=<span class="hljs-number">2</span>
done a
half b=<span class="hljs-number">3</span>
done b
all done! a=<span class="hljs-number">3</span>,b=<span class="hljs-number">4</span></code></pre>
<p>这就是 CommonJS 所谓的循环加载。</p>
<p>而 ES6 采用的加载模式也不一样，因为使用动态引用，必须要开发者保证能 import 到值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// a.js如下
import {bar} from './b.js';
console.log('a.js');
console.log(bar);
export let foo = 'foo';

// b.js
import {foo} from './a.js';
console.log('b.js');
console.log(foo);
export let bar = 'bar';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// a.js如下</span>
<span class="hljs-keyword">import</span> {bar} <span class="hljs-keyword">from</span> <span class="hljs-string">'./b.js'</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'a.js'</span>);
<span class="hljs-built_in">console</span>.log(bar);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> foo = <span class="hljs-string">'foo'</span>;

<span class="hljs-comment">// b.js</span>
<span class="hljs-keyword">import</span> {foo} <span class="hljs-keyword">from</span> <span class="hljs-string">'./a.js'</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'b.js'</span>);
<span class="hljs-built_in">console</span>.log(foo);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> bar = <span class="hljs-string">'bar'</span>;</code></pre>
<p>结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ babel-node a.js
b.js
undefined
a.js
bar" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$ babel-node a.js
b.js
<span class="hljs-literal">undefined</span>
a.js
bar</code></pre>
<p>循环加载稍有不慎，就会 underfined。</p>
<h2 id="articleHeader9">字符串模版</h2>
<p>ES6 在字符串上面可是下了不少功夫，先是解决了字符 unicode 的 bug，增加了一些处理多字节字符串 codePointAt 函数，还多了字符串的遍历接口 <code>for...of</code>，这个遍历借口有点仿造 python 的感觉。只要有迭代器功能的对象，都可以用 for...of 来遍历。</p>
<p>ES6 添加了一些有意思的函数，比如 repeat()，前几天比较火的文章‘五道经典的前端面试题’，就有提到一个在字符串上实现原生的重复方法，这里的 repeat 可以直接解决。</p>
<p>关于字符串上的新内容，非常有帮助的还是模版字符串。之前在 js 中跨行的字符串实现起来很别扭，而 python 可以用三个反引号来实现。</p>
<p>ES6 中的模版字符串使用需要注意以下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ` 可以跨行
var html = `
  <ul>
    <li>first</li>
    <li>second</li>
  </ul>`

//${} 调用变量和函数
var name = 'window';
var str = `my name is ${name};`;
// my name is window;

var add = (a, b)=> a+b;
var str = `2 + 3 = ${add(2,3)}`;
// &quot;2 + 3 = 5&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ` 可以跨行</span>
<span class="hljs-keyword">var</span> html = <span class="hljs-string">`
  &lt;ul&gt;
    &lt;li&gt;first&lt;/li&gt;
    &lt;li&gt;second&lt;/li&gt;
  &lt;/ul&gt;`</span>

<span class="hljs-comment">//${} 调用变量和函数</span>
<span class="hljs-keyword">var</span> name = <span class="hljs-string">'window'</span>;
<span class="hljs-keyword">var</span> str = <span class="hljs-string">`my name is <span class="hljs-subst">${name}</span>;`</span>;
<span class="hljs-comment">// my name is window;</span>

<span class="hljs-keyword">var</span> add = <span class="hljs-function">(<span class="hljs-params">a, b</span>)=&gt;</span> a+b;
<span class="hljs-keyword">var</span> str = <span class="hljs-string">`2 + 3 = <span class="hljs-subst">${add(<span class="hljs-number">2</span>,<span class="hljs-number">3</span>)}</span>`</span>;
<span class="hljs-comment">// "2 + 3 = 5"</span></code></pre>
<p>用过 ejs 、swig 或 hbs 等模版，它们可以嵌入 js 代码，ES6 的模版字符串也可以。使用 &lt;%...%&gt; 放置 JavaScript 代码，使用 &lt;%= ... %&gt; 输出 JavaScript 表达式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var template = `
  <ul>
    <% data.forEach(function(item){ %>
      <li><%= item %></li>
    <% }) %>
  </ul>
`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> template = <span class="hljs-string">`
  &lt;ul&gt;
    &lt;% data.forEach(function(item){ %&gt;
      &lt;li&gt;&lt;%= item %&gt;&lt;/li&gt;
    &lt;% }) %&gt;
  &lt;/ul&gt;
`</span></code></pre>
<p>下面就可以写正则表达式替换掉自定义字符并执行函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function compile(str){
  var evalExpr = /<%=(.+?)%>/g;
  var expr = /<%([\s\S]+?)%>/g;
  str = str.replace(evalExpr, '`); \n  join( $1 ); \n  join(`')
    .replace(expr, '`); \n $1 \n  join(`');
  str = 'join(`' + str + '`);';
  var script = `
    (function parse(data){
      var output = &quot;&quot;;

      function join(html){
        output += html;
      }

      ${ str }

      return output;
    })
  `
  return script;
}
var strParse = eval(compile(template));
// 使用
var html = strParse(['shanghai', 'beijing', 'nanjing']);
//  <ul>    
//    <li>shanghai</li>
//    <li>beijing</li>
//    <li>nanjing</li>
//  </ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compile</span>(<span class="hljs-params">str</span>)</span>{
  <span class="hljs-keyword">var</span> evalExpr = <span class="hljs-regexp">/&lt;%=(.+?)%&gt;/g</span>;
  <span class="hljs-keyword">var</span> expr = <span class="hljs-regexp">/&lt;%([\s\S]+?)%&gt;/g</span>;
  str = str.replace(evalExpr, <span class="hljs-string">'`); \n  join( $1 ); \n  join(`'</span>)
    .replace(expr, <span class="hljs-string">'`); \n $1 \n  join(`'</span>);
  str = <span class="hljs-string">'join(`'</span> + str + <span class="hljs-string">'`);'</span>;
  <span class="hljs-keyword">var</span> script = <span class="hljs-string">`
    (function parse(data){
      var output = "";

      function join(html){
        output += html;
      }

      <span class="hljs-subst">${ str }</span>

      return output;
    })
  `</span>
  <span class="hljs-keyword">return</span> script;
}
<span class="hljs-keyword">var</span> strParse = <span class="hljs-built_in">eval</span>(compile(template));
<span class="hljs-comment">// 使用</span>
<span class="hljs-keyword">var</span> html = strParse([<span class="hljs-string">'shanghai'</span>, <span class="hljs-string">'beijing'</span>, <span class="hljs-string">'nanjing'</span>]);
<span class="hljs-comment">//  &lt;ul&gt;    </span>
<span class="hljs-comment">//    &lt;li&gt;shanghai&lt;/li&gt;</span>
<span class="hljs-comment">//    &lt;li&gt;beijing&lt;/li&gt;</span>
<span class="hljs-comment">//    &lt;li&gt;nanjing&lt;/li&gt;</span>
<span class="hljs-comment">//  &lt;/ul&gt;</span></code></pre>
<p>通过两次使用字符串模版，并使用 eval 函数，一个 ES6 简易模版就这样完成了。</p>
<h2 id="articleHeader10">一些其他核心功能</h2>
<h3 id="articleHeader11">let const</h3>
<p>ES5 通过 var 来申明变量，ES6 新添 let 和 const，且作用域是 <strong>块级作用域</strong>。</p>
<p>let 使用和 var 非常类似，<strong>let 不存在变量提升，也不允许重复申明，let 的声明只能在它所在的代码块有效</strong>，比如 for 循环，非常适合使用 let：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(let i = 0; i < data.length; i++){
  console.log(data[i]);
}
console.log(i); // error" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-keyword">for</span>(<span class="hljs-built_in">let</span> i = <span class="hljs-number">0</span>; i &lt; data.<span class="hljs-built_in">length</span>; i++){
  console.<span class="hljs-built_in">log</span>(data[i]);
}
console.<span class="hljs-built_in">log</span>(i); // <span class="hljs-built_in">error</span></code></pre>
<p>如果用 var 来申明 i，最后不会报错。之前学闭包的时候，有一个利用闭包解决循环的问题，用 let 可以解决:</p>
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
<p>const 就是申明常量用的，一旦申明即被锁定，后面无法更改。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const PI = 3.14;
PI = 3; //error" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>const <span class="hljs-literal">PI</span> = <span class="hljs-number">3.14</span>;
<span class="hljs-literal">PI</span> = <span class="hljs-number">3</span>; <span class="hljs-comment">//error</span></code></pre>
<p>let 和 const 都是块级作用域，块级作用域可以任意嵌套，且 {} 内定义的变量，外层作用域是无法获得的，且内外层的作用域可以同名。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn() {
  let n = 1;
  if (true) {
    let n = 2;
  }
  console.log(n); // 1
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> n = <span class="hljs-number">1</span>;
  <span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">let</span> n = <span class="hljs-number">2</span>;
  }
  <span class="hljs-built_in">console</span>.log(n); <span class="hljs-comment">// 1</span>
}</code></pre>
<h3 id="articleHeader12">解构赋值</h3>
<p>解构赋值真的很好用，但是我每次都忘记使用。ES6 解构赋值基本语法 <code>var [a, b, c] = [1, 2, 3];</code>，从数组中取值，并按照先后次序来赋值。如果解构赋值不成功，就会返回 underfined，解构赋值也允许指定默认值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var [a, b] = [1];
b // undefined

// 指定默认值
var [a, b = 2] = [1];
b // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var [a, b] = [<span class="hljs-number">1</span>];
b <span class="hljs-comment">// undefined</span>

<span class="hljs-comment">// 指定默认值</span>
var [a, b = <span class="hljs-number">2</span>] = [<span class="hljs-number">1</span>];
b <span class="hljs-comment">// 2</span></code></pre>
<p>除了数组，对象也可以解构赋值，但是数组是有顺序的，而对象没有顺序，如果想要成功赋值，必须与对象属性同名，才能成功赋值，否则返回 underfined：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var {a, b} = {a: 1, b: 2};
a // 1
b // 2

var {a, c} = {a: 1, b: 2};
c // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> <span class="hljs-comment">{a, b}</span> = <span class="hljs-comment">{a: 1, b: 2}</span>;
a <span class="hljs-comment">// 1</span>
b <span class="hljs-comment">// 2</span>

<span class="hljs-keyword">var</span> <span class="hljs-comment">{a, c}</span> = <span class="hljs-comment">{a: 1, b: 2}</span>;
c <span class="hljs-comment">// undefined</span></code></pre>
<p>字符串的解构赋值比较有意思，既可以把字符串当作可以迭代的数组，又可以当作对象，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var [a1,a2,a3,a4,a5] = 'hello';
a2 // e

var {length : len} = 'hello';
len // 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-keyword">var</span> [a1,a2,a3,a4,a5] = <span class="hljs-string">'hello'</span>;
a2 <span class="hljs-comment">// e</span>

<span class="hljs-keyword">var</span> {length : <span class="hljs-built_in">len</span>} = <span class="hljs-string">'hello'</span>;
<span class="hljs-built_in">len</span> <span class="hljs-comment">// 5</span></code></pre>
<p>函数参数的解构赋值，看一个 forEach 的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = [[1, 2], [3, 4]];
data.forEach(([a, b]) => console.log(a+b));
// 3
// 7" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">var</span> <span class="hljs-class"><span class="hljs-keyword">data</span> = [[1, 2], [3, 4]];</span>
<span class="hljs-class"><span class="hljs-keyword">data</span>.forEach(([<span class="hljs-title">a</span>, <span class="hljs-title">b</span>]) =&gt; console.log(<span class="hljs-title">a</span>+<span class="hljs-title">b</span>));</span>
// <span class="hljs-number">3</span>
// <span class="hljs-number">7</span></code></pre>
<h3 id="articleHeader13">Promise 解决回掉</h3>
<p>一直以来，回掉问题都是一件令人头疼的事，调试的时候感觉代码跳来跳去，玩着玩着就晕了。ES6 提供 Promise 对象（函数），专门用来处理回掉。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

promise.then(function(value) {
  // success
}, function(error) {
  // failure
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
  <span class="hljs-comment">// ... some code</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-comment">/* 异步操作成功 */</span>){
    resolve(value);
  } <span class="hljs-keyword">else</span> {
    reject(error);
  }
});

promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
  <span class="hljs-comment">// success</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
  <span class="hljs-comment">// failure</span>
});</code></pre>
<p>resolve 和 reject 是两个异步操作调用函数，当异步操作完成时，调用 resolve，error 则调用 reject，这两个函数的功能就是把参数传递给回掉函数。then 函数用来处理成功或失败状态。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function loadImageAsync(url) {
  var p = new Promise(function(resolve, reject) {
    var image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(url);
    };

    image.src = url;
  });
  p.then(function(image){
    document.body.appendChild(image);
  }, function(url){
    throw new Error('Could not load '+ url);
  })
}

loadImageAsync('http://yuren.space/images/bg.gif');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadImageAsync</span>(<span class="hljs-params">url</span>) </span>{
  <span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-keyword">var</span> image = <span class="hljs-keyword">new</span> Image();

    image.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      resolve(image);
    };

    image.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      reject(url);
    };

    image.src = url;
  });
  p.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">image</span>)</span>{
    <span class="hljs-built_in">document</span>.body.appendChild(image);
  }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">url</span>)</span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Could not load '</span>+ url);
  })
}

loadImageAsync(<span class="hljs-string">'http://yuren.space/images/bg.gif'</span>);</code></pre>
<p>上面是一个用 Promise 实现的异步加载图片的函数。</p>
<h3 id="articleHeader14">for of 与 ...</h3>
<p>Python 中有 for in 运算符，ES6 就搞了个 for...of。当使用 for...of 循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是可遍历的，对象、数组、字符串都是可遍历的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'hello';
for(let i of str){
  console.log(i);
}
// 'h' 'e' 'l' 'l' 'o'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> str = <span class="hljs-string">'hello'</span>;
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i <span class="hljs-keyword">of</span> str){
  <span class="hljs-built_in">console</span>.log(i);
}
<span class="hljs-comment">// 'h' 'e' 'l' 'l' 'o'</span></code></pre>
<p><code>...</code>也非常好用，可以直接把可遍历对象直接转换成数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'hello';
[...str] //[&quot;h&quot;, &quot;e&quot;, &quot;l&quot;, &quot;l&quot;, &quot;o&quot;]

let arr = ['b', 'c'];
['a', ...arr, 'd'] 
// ['a', 'b', 'c', 'd']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> str = <span class="hljs-string">'hello'</span>;
[...str] <span class="hljs-comment">//["h", "e", "l", "l", "o"]</span>

<span class="hljs-keyword">let</span> arr = [<span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>];
[<span class="hljs-string">'a'</span>, ...arr, <span class="hljs-string">'d'</span>] 
<span class="hljs-comment">// ['a', 'b', 'c', 'd']</span></code></pre>
<p>有了 ... 之后，方便对非数组可遍历的对象进行转换，比如 arguments 和 querySelectAll 的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[...arguments] // Array

var selects = document.querySelectAll('a');
[...selects] // Array" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">[...arguments] <span class="hljs-comment">// Array</span>

<span class="hljs-keyword">var</span> selects = <span class="hljs-built_in">document</span>.querySelectAll(<span class="hljs-string">'a'</span>);
[...selects] <span class="hljs-comment">// Array</span></code></pre>
<h3 id="articleHeader15">set 集合和 Map 结构</h3>
<p>ES6 新增 Set 集合对象，其实像其他语言早都支持了，不过，吃瓜群众，不觉明厉，以后，再遇到数组去重算法题，就可以：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[...(new Set([1, 2, 2, 3]))];
//[1, 2, 3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">[...(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]))];
<span class="hljs-comment">//[1, 2, 3]</span></code></pre>
<p>Set 方法分为操作和遍历，操作方法有 add-添加成员， delete-删除成员， has-拥有判断返回布尔值， clear-清空集合。</p>
<p>遍历操作有 keys()，values()，entries()，forEach()，...，for of，map 和 filter 函数也可以用于 Set，不过要进行巧妙操作，先转换成数组，在进行操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set([1,2,3]);
set = new Set([...set].map(a => a*2));
// Set {2, 4, 6}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]);
set = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([...set].map(<span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> a*<span class="hljs-number">2</span>));
<span class="hljs-comment">// Set {2, 4, 6}</span></code></pre>
<p>Map 用来解决对象只接受字符串作为键名，Map 类似于对象，也是键值对集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。</p>
<p>Map 可以通过 [set、 get、 has、 delete] 方法来操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var m = new Map();
var arr = [1, 2];
m.set(arr, 'array');
m.get(arr); // 'array'

m.has(arr) // true
m.delete(arr) // true
m.has(arr) // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code><span class="hljs-keyword">var</span> m = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">Map</span>();
<span class="hljs-title">var</span> <span class="hljs-title">arr</span> = [1, 2];
<span class="hljs-title">m</span>.<span class="hljs-title">set</span>(arr, 'array');
<span class="hljs-title">m</span>.<span class="hljs-title">get</span>(arr); <span class="hljs-comment">// 'array'</span>

<span class="hljs-title">m</span>.<span class="hljs-title">has</span>(arr) <span class="hljs-comment">// true</span>
<span class="hljs-title">m</span>.<span class="hljs-title">delete</span>(arr) <span class="hljs-comment">// true</span>
<span class="hljs-title">m</span>.<span class="hljs-title">has</span>(arr) <span class="hljs-comment">// false</span></span></code></pre>
<h3 id="articleHeader16">参数默认</h3>
<p>参数默认这个功能使用起来还是比较方便的，以前参数都是通过 || 来实现默认，现在可以使用默认参数。不过这个功能在 Python 等语言中已经是支持的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 以前写代码
var sayHello = function(name){
  var name = name || 'world';
  console.log('hello ' + name);
}

//参数默认
var sayHello = function(name = 'world'){
  console.log('hello ' + name);
}

sayHello() // 'hello world'
sayHello('ES6') // 'hello ES6'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 以前写代码</span>
<span class="hljs-keyword">var</span> sayHello = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-keyword">var</span> name = name || <span class="hljs-string">'world'</span>;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello '</span> + name);
}

<span class="hljs-comment">//参数默认</span>
<span class="hljs-keyword">var</span> sayHello = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name = <span class="hljs-string">'world'</span></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello '</span> + name);
}

sayHello() <span class="hljs-comment">// 'hello world'</span>
sayHello(<span class="hljs-string">'ES6'</span>) <span class="hljs-comment">// 'hello ES6'</span></code></pre>
<p>对于不定参数，以前都是对 arguments 对象处理，且 arguments 对象还是个伪数组，现在方便了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var add = function(...arr){
  console.log(arr.constructor.name) // Array
  return arr.reduce((a, b) => a+b, 0);
}
add(1,2,3) // 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> add = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-rest_arg">...arr</span>)</span></span>{
  console.log(arr.constructor.name) <span class="hljs-comment">// Array</span>
  <span class="hljs-keyword">return</span> arr.reduce((a, b) =&gt; a+b, <span class="hljs-number">0</span>);
}
add(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>) <span class="hljs-comment">// 6</span></code></pre>
<h2 id="articleHeader17">总结</h2>
<p>总之，对于 ES6 的学习还是要活用，当我看了一遍 <a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">ECMAScript 6入门</a>时候，感觉知识点还是很多，有点乱。当接触了 react 之后，发现很多语法都非常的熟悉，于是就从头温习了 ES6，并整理了这篇文章。可能，你还不知道，这篇文章，大部分都是参考阮一峰老师的。共勉！</p>
<h2 id="articleHeader18">参考</h2>
<blockquote><p><a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">ECMAScript 6入门</a><br><a href="https://segmentfault.com/a/1190000004365693">30分钟掌握ES6/ES2015核心内容（上）</a><br><a href="https://segmentfault.com/a/1190000004368132" target="_blank">30分钟掌握ES6/ES2015核心内容（下）</a><br><a href="https://segmentfault.com/a/1190000002904199">ES6 学习笔记</a><br><a href="http://www.cnblogs.com/Wayou/p/es6_new_features.html" rel="nofollow noreferrer" target="_blank">ES6新特性概览</a><br><a href="http://www.es6js.com/" rel="nofollow noreferrer" target="_blank">ES6js.com 官网</a></p></blockquote>
<p>欢迎来我<a href="http://yuren.space/blog" rel="nofollow noreferrer" target="_blank">博客</a>交流。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6，你不得不学！

## 原文链接
[https://segmentfault.com/a/1190000007817990](https://segmentfault.com/a/1190000007817990)

