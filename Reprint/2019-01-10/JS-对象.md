---
title: 'JS-对象' 
date: 2019-01-10 2:30:08
hidden: true
slug: x849vhd3cct
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、概述</h2>
<p>JS是一种面向对象的语言。除了基本数据类型number, string, boolean(true, false), null, undefined，其他的都是对象。对象就是一个"name-value"对集合。</p>
<h2 id="articleHeader1">二、操作对象</h2>
<h3 id="articleHeader2">2.1 创建对象</h3>
<p>JS有三种创建对象的方式：字面量，Object.create，new构造方式。</p>
<h4>2.1.1 Object.create(null | object)</h4>
<p>严格来说调用Object.create方法是创建JS对象的唯一方式（其他两种方式内部实现都是基于该方法的）。该方法功能是创建一个对象，并且该对象的原型指向create的参数对象。<br>参数：必须是null或者对象，否则报错。null表示创建一个没有原型的空对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = { a: 1}; // 对象字面量
var c1 = Object.create(p); // 对象c1的原型指向p
var c2 = Object.create(null);// 对象c2没有原型" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> p = { a: <span class="hljs-number">1</span>}; <span class="hljs-comment">// 对象字面量</span>
<span class="hljs-keyword">var</span> c1 = <span class="hljs-built_in">Object</span>.create(p); <span class="hljs-comment">// 对象c1的原型指向p</span>
<span class="hljs-keyword">var</span> c2 = <span class="hljs-built_in">Object</span>.create(<span class="hljs-keyword">null</span>);<span class="hljs-comment">// 对象c2没有原型</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVQboC?w=684&amp;h=99" src="https://static.alili.tech/img/bVQboC?w=684&amp;h=99" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>2.1.2 对象字面量</h4>
<p>对象字面量是一种创建对象的便捷方式，见上例。其中对象p的创建方式就是对象字面量。JS解释器会对它进行处理的，等价于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = Object.create(Object.prototype);
p.a = 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> p = <span class="hljs-built_in">Object</span>.create(<span class="hljs-built_in">Object</span>.prototype);
p.a = <span class="hljs-number">1</span>;</code></pre>
<p>所以说对象字面量内部也是通过Object.create方式创建对象的，并且所有对象字面量方式创建的对象的原型都执行Object.prototype（如上图）。</p>
<h4>2.1.3 new构造方式</h4>
<p>JS的作者为了讨好类语言的开发者，引入了第三者创建对象方式，即new构造方式。这使得JS对象的创建有点像类语言的对象创建。</p>
<h5>1) 格式</h5>
<p>new关键字 + 空格 + 函数名字 + [(参数)]<br>其中参数是可选的，当没有参数传递时，可以省略括号。如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Func(){}
var c1 = new Func();
var c2 = new Func; // 如果没有参数传递，可以省略括号。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Func</span></span>(){}
<span class="hljs-keyword">var</span> c1 = <span class="hljs-keyword">new</span> <span class="hljs-type">Func</span>();
<span class="hljs-keyword">var</span> c2 = <span class="hljs-keyword">new</span> <span class="hljs-type">Func</span>; <span class="hljs-comment">// 如果没有参数传递，可以省略括号。</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Func(name){
  this.name = name;
}
Func.prototype.say = function(){
};
var c = new Func('q');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Func</span><span class="hljs-params">(name)</span></span>{
  <span class="hljs-keyword">this</span>.name = name;
}
Func.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
};
<span class="hljs-keyword">var</span> c = <span class="hljs-keyword">new</span> Func(<span class="hljs-string">'q'</span>);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVQboX?w=459&amp;h=102" src="https://static.alili.tech/img/bVQboX?w=459&amp;h=102" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h5>2) 内部原理</h5>
<p>这种方式的内部也是通过Object.create方式构建的。new方式创建对象大致分为三步：<br>Step1：创建一个对象A，并且对象A的原型指向构造函数的prototype属性<br>Step2：以对象A绑定到构造函数上调用构造函数<br>Step3：如果构造函数返回值不是个非null的对象，则返回构造函数的返回值作为new表达式的值，否则以对象A作为new表达式的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Func(name){
  this.name = name;
}
Func.prototype.say = function(){
};
function create(){ // 模拟new操作符
  var func = arguments[0];
  var args = Array.prototype.slice.call(arguments, 1);
  var other = Object.create(func.prototype); // Step 1
  var result = func.apply(other, args); // Step 2
  return typeof result === 'object' &amp;&amp; result ? result: other; // Step3 注意返回值
}
var c = create(Func, 'q');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Func</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-keyword">this</span>.name = name;
}
Func.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">create</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">// 模拟new操作符</span>
  <span class="hljs-keyword">var</span> func = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>];
  <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);
  <span class="hljs-keyword">var</span> other = <span class="hljs-built_in">Object</span>.create(func.prototype); <span class="hljs-comment">// Step 1</span>
  <span class="hljs-keyword">var</span> result = func.apply(other, args); <span class="hljs-comment">// Step 2</span>
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> result === <span class="hljs-string">'object'</span> &amp;&amp; result ? result: other; <span class="hljs-comment">// Step3 注意返回值</span>
}
<span class="hljs-keyword">var</span> c = create(Func, <span class="hljs-string">'q'</span>);</code></pre>
<h3 id="articleHeader3">2.2 访问对象属性</h3>
<p>访问方式也就是get/set/delete。在get访问中会涉及原型链，set/delete访问不会。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Obj = {
  name: 'john'
};
// Get操作
var n = Obj.name; // 等价var n = Obj[&quot;name&quot;];
// Set操作
Obj.age = 12; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code><span class="hljs-built_in">var</span> Obj = {
  <span class="hljs-built_in">na</span><span class="hljs-symbol">me:</span> 'john'
};
// Get操作
<span class="hljs-built_in">var</span> <span class="hljs-built_in">n</span> = Obj.name; // 等价<span class="hljs-built_in">var</span> <span class="hljs-built_in">n</span> = Obj[<span class="hljs-string">"name"</span>];
// Set操作
Obj.age = <span class="hljs-number">12</span>; </code></pre>
<h4>2.2.1 Get操作流程：</h4>
<p><span class="img-wrap"><img data-src="/img/bVQbpm?w=666&amp;h=683" src="https://static.alili.tech/img/bVQbpm?w=666&amp;h=683" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>2.2.2 Set操作流程：</h4>
<p><span class="img-wrap"><img data-src="/img/bVQbpp?w=427&amp;h=418" src="https://static.alili.tech/img/bVQbpp?w=427&amp;h=418" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>2.2.3 delete操作</h4>
<p>可以通过delete操作符删除对象的属性，只能删除对象本身的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = {
  age: 26
}
var obj = Object.create(p);
obj.name = 'john';
console.log(obj.name); // john
console.log(obj.age); // 26
delete obj.name; // 删除属性
delete obj.age; // 删除属性
console.log(obj.name); // undefined
console.log(obj.age); // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p = {
  <span class="hljs-attr">age</span>: <span class="hljs-number">26</span>
}
<span class="hljs-keyword">var</span> obj = <span class="hljs-built_in">Object</span>.create(p);
obj.name = <span class="hljs-string">'john'</span>;
<span class="hljs-built_in">console</span>.log(obj.name); <span class="hljs-comment">// john</span>
<span class="hljs-built_in">console</span>.log(obj.age); <span class="hljs-comment">// 26</span>
<span class="hljs-keyword">delete</span> obj.name; <span class="hljs-comment">// 删除属性</span>
<span class="hljs-keyword">delete</span> obj.age; <span class="hljs-comment">// 删除属性</span>
<span class="hljs-built_in">console</span>.log(obj.name); <span class="hljs-comment">// undefined</span>
<span class="hljs-built_in">console</span>.log(obj.age); <span class="hljs-comment">// undefined</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVQbpv?w=383&amp;h=536" src="https://static.alili.tech/img/bVQbpv?w=383&amp;h=536" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">2.3 引用对象</h3>
<p>JS中对象是引用类型的。对象在作为值时，是作为引用传递的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a={}, b={}; // a,b分别指向不同的对象
var c = d = {}; // c,d指向同一个对象" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code><span class="hljs-keyword">var</span> a={}, b={}; <span class="hljs-comment">// a,b分别指向不同的对象</span>
<span class="hljs-keyword">var</span> <span class="hljs-built_in">c</span> = d = {}; <span class="hljs-comment">// c,d指向同一个对象</span></code></pre>
<h2 id="articleHeader5">三、反射</h2>
<p>确定对象的类型有时很有必要。</p>
<h3 id="articleHeader6">3.1 typeof 操作符</h3>
<p>通过typeof操作符可以获取值的类型：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(typeof 1); // number
console.log(typeof ''); // string
console.log(typeof null); // object
console.log(typeof undefined); // undefined
console.log(typeof true); // boolean
console.log(typeof {}); // object
console.log(typeof []); // object
console.log(typeof function(){}); // function" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-number">1</span>); <span class="hljs-comment">// number</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-string">''</span>); <span class="hljs-comment">// string</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-literal">null</span>); <span class="hljs-comment">// object</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-literal">undefined</span>); <span class="hljs-comment">// undefined</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-literal">true</span>); <span class="hljs-comment">// boolean</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> {}); <span class="hljs-comment">// object</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> []); <span class="hljs-comment">// object</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}); <span class="hljs-comment">// function</span></code></pre>
<p>但是发现这种方式中null, 数组也都是返回“object”。原因是JS中没有原生数组类型，数组是通过对象模拟的，所以数组也是对象。但是如何区分数组和对象呢？？？</p>
<h3 id="articleHeader7">3.2 Object.prototype.toString</h3>
<p>typeof是有缺陷的，在实际应用中常通过Object.prototype.toString方法确定对象类型的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Object.prototype.toString.call(1)); // [object Number]
console.log(Object.prototype.toString.call('')); // [object String]
console.log(Object.prototype.toString.call(null)); // [object Null]
console.log(Object.prototype.toString.call(undefined)); // [object Undefined]
console.log(Object.prototype.toString.call(true)); // [object Boolean]
console.log(Object.prototype.toString.call( {})); // [object Object]
console.log(Object.prototype.toString.call([])); // [object Array]
console.log(Object.prototype.toString.call(function(){})); // [object Function]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>console.<span class="hljs-built_in">log</span>(Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(<span class="hljs-number">1</span>)); <span class="hljs-comment">// [object Number]</span>
console.<span class="hljs-built_in">log</span>(Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(<span class="hljs-string">''</span>)); <span class="hljs-comment">// [object String]</span>
console.<span class="hljs-built_in">log</span>(Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(null)); <span class="hljs-comment">// [object Null]</span>
console.<span class="hljs-built_in">log</span>(Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(undefined)); <span class="hljs-comment">// [object Undefined]</span>
console.<span class="hljs-built_in">log</span>(Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(<span class="hljs-literal">true</span>)); <span class="hljs-comment">// [object Boolean]</span>
console.<span class="hljs-built_in">log</span>(Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>( {})); <span class="hljs-comment">// [object Object]</span>
console.<span class="hljs-built_in">log</span>(Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>([])); <span class="hljs-comment">// [object Array]</span>
console.<span class="hljs-built_in">log</span>(Object.prototype.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(function(){})); <span class="hljs-comment">// [object Function]</span></code></pre>
<p>看例子中输出结果中发现不同之处了吧。假如判断对象是否为数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var isArray = function(val){
  return Object.prototype.toString.call(val) === '[object Array]';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> isArray = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val</span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(val) === <span class="hljs-string">'[object Array]'</span>;
}</code></pre>
<p>目前的很多库zeptojs，underscorejs中都是这样实现的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS-对象

## 原文链接
[https://segmentfault.com/a/1190000010014621](https://segmentfault.com/a/1190000010014621)

