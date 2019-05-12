---
title: '详解js中的遍历' 
date: 2018-12-06 2:30:09
hidden: true
slug: phgsne8miw
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">实例属性和原型属性</h3>
<ul>
<li>JavaScript中对象的属性分为两种： <strong><em>数据属性</em></strong> 和 <strong><em>访问器属性</em></strong> 。</li>
<li>根据具体的上下文环境的不同，又可以将属性分为： <strong><em>原型属性</em></strong> 和 <strong><em>实例属性</em></strong> 。</li>
<li>
<strong><em>原型属性</em></strong> 是定义在对象的原型<code>prototype</code> 中的属性，</li>
<li>
<strong><em>实例属性</em></strong> 一方面来自构造的函数中，然后就是构造函数实例化后添加的新属性。</li>
</ul>
<h3 id="articleHeader1">js的枚举</h3>
<p>JavaScript中遍历一个对象的属性并不太简单，主要有两个原因：</p>
<ul>
<li>JavaScript中的对象通常都处在某个原型链中，它会从一个或多个的上层原型上继承一些属性</li>
<li>JavaScript中的属性不光有值，它还有一些除了值以外的其他特性，其中一个影响属性遍历的特性就是<code>Enumerable</code>(一个属性描述符) ，如果该值为 <code>true</code> ，则这个属性是可枚举的，否则反之</li>
</ul>
<h5>属性描述符</h5>
<ul>
<li>
<code>属性描述符</code> 主要有两种形式：<code>数据描述符</code>和<code>存取描述符</code>。</li>
<li>使用<code>Object.getOwnPropertyDescriptor</code> 与 <code>Object.getOwnPropertyDescriptors</code>两个方法获取对象的<code>属性描述符</code>。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
  name: '10',
  _age: 25,
  get age(){
    return this._age;
  },
  set age(age){
    if(age<1){
      throw new Error('Age must be more than 0');
    }else{
      this._age = age;
    }
  }
};

var des = Object.getOwnPropertyDescriptors(obj);
console.log(des);
/**
 * des: {
 *  name: {
 *    configurable: true,
 *    enumerable: true,
 *    value: &quot;10&quot;,
 *    writable: true,
 *    __proto__: Object
 *  },
 *  _age: {
 *    configurable: true,
 *    enumerable: true,
 *    value: 25,
 *    writable: true,
 *    __proto__: Object
 *  },
 *  age: {
 *    configurable: true,
 *    enumerable: true,
 *    get: f age(),
 *    set: f age(age),
 *    __proto__: Object
 *  },
 *  __proto__: Object
 * }
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>var obj = {
  <span class="hljs-built_in">name</span>: '<span class="hljs-number">10</span>',
  _age: <span class="hljs-number">25</span>,
  <span class="hljs-keyword">get</span> age(){
<span class="hljs-built_in">    return</span> this._age;
  },
  <span class="hljs-keyword">set</span> age(age){
    <span class="hljs-keyword">if</span>(age&lt;<span class="hljs-number">1</span>){
      throw new Error('Age must be more than <span class="hljs-number">0</span>');
    }<span class="hljs-keyword">else</span>{
      this._age = age;
    }
  }
};

var des = Object.getOwnPropertyDescriptors(obj);
console.<span class="hljs-built_in">log</span>(des);
/**
 * des: {
 *  <span class="hljs-built_in">name</span>: {
 *    configurable: <span class="hljs-literal">true</span>,
 *    enumerable: <span class="hljs-literal">true</span>,
 *    value: <span class="hljs-string">"10"</span>,
 *    writable: <span class="hljs-literal">true</span>,
 *    __proto__: Object
 *  },
 *  _age: {
 *    configurable: <span class="hljs-literal">true</span>,
 *    enumerable: <span class="hljs-literal">true</span>,
 *    value: <span class="hljs-number">25</span>,
 *    writable: <span class="hljs-literal">true</span>,
 *    __proto__: Object
 *  },
 *  age: {
 *    configurable: <span class="hljs-literal">true</span>,
 *    enumerable: <span class="hljs-literal">true</span>,
 *    <span class="hljs-keyword">get</span>: f age(),
 *    <span class="hljs-keyword">set</span>: f age(age),
 *    __proto__: Object
 *  },
 *  __proto__: Object
 * }
*/</code></pre>
<h6>value</h6>
<p>该属性的值(仅针对数据属性描述符有效)</p>
<h6>writable</h6>
<p>当<code>writable</code>属性设置为<code>false</code>时，该属性被称为“不可写”。它不能被重新分配。</p>
<h6>get</h6>
<p>获取该属性的访问器函数（<code>getter</code>）。如果没有访问器， 该值为<code>undefined</code>。(仅针对包含访问器或设置器的属性描述有效)</p>
<h6>set</h6>
<p>获取该属性的设置器函数（<code>setter</code>）。 如果没有设置器， 该值为<code>undefined</code>。(仅针对包含访问器或设置器的属性描述有效)</p>
<h6>configurable</h6>
<p><code>configurable</code>特性表示对象的属性是否可以被删除，以及除<code>writable</code>特性外的其他特性是否可以被修改。</p>
<h6>enumerable</h6>
<p><code>enumerable</code>定义了对象的属性是否可以在 <code>for...in</code> 循环和 <code>Object.keys()</code> 中被枚举。</p>
<ul>
<li>name、_age拥有 <code>'configurable'</code>、<code>'enumerable'</code>、<code>'value'</code>、<code>'writable'</code>四个属性描述符，统称<code>数据描述符</code>
</li>
<li>age拥有<code>'configurable'</code>、<code>'enumerable'</code>、<code>'get'</code>、<code>'set'</code>四个属性描述符，统称<code>存取描述符</code>
</li>
</ul>
<table>
<thead><tr>
<th>分类</th>
<th>'configurable'</th>
<th>'enumerable'</th>
<th>'value'</th>
<th>'writable'</th>
<th>'get'</th>
<th>'set'</th>
</tr></thead>
<tbody>
<tr>
<td>数据描述符</td>
<td>yes</td>
<td>yes</td>
<td>yes</td>
<td>yes</td>
<td>no</td>
<td>no</td>
</tr>
<tr>
<td>存取描述符</td>
<td>yes</td>
<td>yes</td>
<td>no</td>
<td>no</td>
<td>yes</td>
<td>yes</td>
</tr>
</tbody>
</table>
<p>对象的属性描述符，可以通过<code>Object.defineProperty</code>和<code>Object.defineProperties</code>来修改(<code>configurable</code>为<code>true</code>的条件下)</p>
<h3 id="articleHeader2">常用的遍历方法</h3>
<h4>
<code>for...in...</code>遍历</h4>
<ul>
<li>遍历自身及原型链上所有可枚举的属性</li>
<li>使用 for...in 循环遍历对象属性时返回的属性会因为各个 <em>浏览器不同</em> 导致对象属性遍历的顺序有可能不是当初构建时的顺序。</li>
</ul>
<blockquote>Chrome Opera 的 JavaScript 解析引擎遵循的是新版 ECMA-262 第五版规范。因此，使用 for-in 语句遍历对象属性时遍历书序并非属性构建顺序。而 IE6 IE7 IE8 Firefox Safari 的 JavaScript 解析引擎遵循的是较老的 ECMA-262 第三版规范，属性遍历顺序由属性构建的顺序决定。</blockquote>
<blockquote>for-in 语句无法保证遍历顺序，应尽量避免编写依赖对象属性顺序的代码。如果想顺序遍历一组数据，请使用数组并使用 for 语句遍历。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Animal = function({name='none', age=3, weight=80}={}){
  this.name = name;
  this.age = age;
  this.weight = weight;
}

Animal.prototype = {
  color: 'red'
}

var dog = new Animal()

// 将weight属性设置为 不可枚举
Object.defineProperty(dog, 'weight', {
  enumerable: false
})

for(let i in dog){
  console.log(n);
}

//原型链上的color同样被遍历出来了，并且由于weight属性被设置成了enumerable:false，所以不可被遍历
//name 
//age 
//color" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> Animal = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">{name=<span class="hljs-string">'none'</span>, age=<span class="hljs-number">3</span>, weight=<span class="hljs-number">80</span>}={}</span>)</span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.age = age;
  <span class="hljs-keyword">this</span>.weight = weight;
}

Animal.prototype = {
  <span class="hljs-attr">color</span>: <span class="hljs-string">'red'</span>
}

<span class="hljs-keyword">var</span> dog = <span class="hljs-keyword">new</span> Animal()

<span class="hljs-comment">// 将weight属性设置为 不可枚举</span>
<span class="hljs-built_in">Object</span>.defineProperty(dog, <span class="hljs-string">'weight'</span>, {
  <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>
})

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> dog){
  <span class="hljs-built_in">console</span>.log(n);
}

<span class="hljs-comment">//原型链上的color同样被遍历出来了，并且由于weight属性被设置成了enumerable:false，所以不可被遍历</span>
<span class="hljs-comment">//name </span>
<span class="hljs-comment">//age </span>
<span class="hljs-comment">//color</span></code></pre>
<h4>
<code>for...of</code>遍历</h4>
<p>一个数据结构只要部署了<code>Symbol.iterator</code>属性，就被视为具有 <code>iterator</code> 接口，就可以用<code>for...of</code>循环遍历它的成员。也就是说，<code>for...of</code>循环内部调用的是数据结构的<code>Symbol.iterator</code>方法。</p>
<p><code>for...of</code>循环可以使用的范围包括数组、<code>Set</code> 和 <code>Map</code> 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、Generator 对象，以及字符串。</p>
<p>如果不太清楚<code>iterator</code>，请去看看阮一峰大神的这篇<a href="http://es6.ruanyifeng.com/#docs/iterator" rel="nofollow noreferrer" target="_blank">文章</a>，里面关于<code>for...of</code>以及<code>iterator</code>都讲的非常详细！</p>
<p>其实<code>for...of</code>和<code>for...in</code>都是迭代一些东西，它们之间的主要区别在于它们的迭代方式。</p>
<ul>
<li>
<code>for...in</code>语句以原始插入顺序迭代对象的可枚举属性。</li>
<li>
<code>for...of</code> 语句遍历可迭代对象定义要迭代的数据。</li>
</ul>
<p>请仔细看以下实例，理解其中的区别</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.prototype.objCustom = function() {}; 
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = 'hello';

for (let i in iterable) {
  console.log(i); //  0, 1, 2, &quot;foo&quot;, &quot;arrCustom&quot;, &quot;objCustom&quot;
}

for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); //  0, 1, 2, &quot;foo&quot;
  }
}

for (let i of iterable) {
  console.log(i); //  3, 5, 7
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Object</span>.prototype.objCustom = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}; 
<span class="hljs-built_in">Array</span>.prototype.arrCustom = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};

<span class="hljs-keyword">let</span> iterable = [<span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>];
iterable.foo = <span class="hljs-string">'hello'</span>;

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> iterable) {
  <span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">//  0, 1, 2, "foo", "arrCustom", "objCustom"</span>
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> iterable) {
  <span class="hljs-keyword">if</span> (iterable.hasOwnProperty(i)) {
    <span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">//  0, 1, 2, "foo"</span>
  }
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">of</span> iterable) {
  <span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">//  3, 5, 7</span>
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.prototype.objCustom = function() {};
Array.prototype.arrCustom = function() {}; 

let iterable = [3, 5, 7]; 
iterable.foo = 'hello';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Object</span>.prototype.objCustom = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};
<span class="hljs-built_in">Array</span>.prototype.arrCustom = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}; 

<span class="hljs-keyword">let</span> iterable = [<span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>]; 
iterable.foo = <span class="hljs-string">'hello'</span>;</code></pre>
<p>在这段代码里面，由于继承和原型链，对象<code>iterable</code>继承属性<code>objCustom</code>和<code>arrCustom</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i in iterable) {
  console.log(i); // 0, 1, 2, &quot;foo&quot;, &quot;arrCustom&quot;, &quot;objCustom&quot; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-keyword">for</span> (<span class="hljs-built_in">let</span> i <span class="hljs-keyword">in</span> iterable) {
  console.<span class="hljs-built_in">log</span>(i); // <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-string">"foo"</span>, <span class="hljs-string">"arrCustom"</span>, <span class="hljs-string">"objCustom"</span> 
}</code></pre>
<p>在这段代码里面，此循环仅以原始插入顺序记录<code>iterable</code> 对象的可枚举属性。它不记录数组元素<code>3, 5, 7</code> 或<code>hello</code>，因为这些不是枚举属性。但是它记录了数组索引以及<code>arrCustom</code>和<code>objCustom</code>（为何记录<code>arrCustom</code>和<code>objCustom</code>在本文<code>for...in</code>里面有讲过）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); //  0, 1, 2, &quot;foo&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> iterable) {
  <span class="hljs-keyword">if</span> (iterable.hasOwnProperty(i)) {
    <span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">//  0, 1, 2, "foo"</span>
  }
}</code></pre>
<p><code>hasOwnProperty()</code>用来检查找到的枚举属性是不是对象自己的（即是不是继承的）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i of iterable) {
  console.log(i); //  3, 5, 7 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">of</span> iterable) {
  <span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">//  3, 5, 7 </span>
}</code></pre>
<p>该循环迭代并记录iterable作为可迭代对象定义的迭代值，这些是数组元素 3, 5, 7，而不是任何对象的属性。</p>
<h4>
<code>Object.keys</code>遍历</h4>
<p><code>Object.keys()</code> 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 <code>for...in</code> 循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 <code>for-in</code> 循环还会枚举其原型链上的属性）。</p>
<h4>
<code>Object.getOwnPropertyNames()</code>遍历</h4>
<p><code>Object.getOwnPropertyNames()</code>方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组,此方法不会获取原型链上的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Animal = function({name='', age=1, weight=70}={}){
  this.name = name;
  this.age = age;
  this.weight = weight;
}

Animal.prototype = {
  type: 'Animal'
}

var dog = new Animal()

// 将height属性设置为 不可枚举
Object.defineProperty(dog, 'weight', {
  enumerable: false
})

var keys = Object.getOwnPropertyNames(dog);
console.log(keys)
// ['name', 'age', 'weight']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> Animal = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">{name=<span class="hljs-string">''</span>, age=<span class="hljs-number">1</span>, weight=<span class="hljs-number">70</span>}={}</span>)</span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.age = age;
  <span class="hljs-keyword">this</span>.weight = weight;
}

Animal.prototype = {
  <span class="hljs-attr">type</span>: <span class="hljs-string">'Animal'</span>
}

<span class="hljs-keyword">var</span> dog = <span class="hljs-keyword">new</span> Animal()

<span class="hljs-comment">// 将height属性设置为 不可枚举</span>
<span class="hljs-built_in">Object</span>.defineProperty(dog, <span class="hljs-string">'weight'</span>, {
  <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>
})

<span class="hljs-keyword">var</span> keys = <span class="hljs-built_in">Object</span>.getOwnPropertyNames(dog);
<span class="hljs-built_in">console</span>.log(keys)
<span class="hljs-comment">// ['name', 'age', 'weight']</span></code></pre>
<h3 id="articleHeader3">结语</h3>
<p>这篇文章希望能让大家更加理解js中的遍历，写的不好多多见谅并指出！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
详解js中的遍历

## 原文链接
[https://segmentfault.com/a/1190000014281498](https://segmentfault.com/a/1190000014281498)

