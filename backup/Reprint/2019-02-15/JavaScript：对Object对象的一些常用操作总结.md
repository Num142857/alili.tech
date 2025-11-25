---
title: 'JavaScript：对Object对象的一些常用操作总结' 
date: 2019-02-15 2:30:44
hidden: true
slug: tbevrorr7t
categories: [reprint]
---

{{< raw >}}

                    
<p>JavaScript对Object对象的一些常用操作总结。</p>
<h2 id="articleHeader0">一、Object.assign()</h2>
<p>1.可以用作对象的复制</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = { a: 1 };
var copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-keyword">var</span> obj = <span class="hljs-comment">{ a: 1 }</span>;
<span class="hljs-keyword">var</span> <span class="hljs-keyword">copy</span> = Object.assign(<span class="hljs-comment">{}</span>, obj);
console.log(<span class="hljs-keyword">copy</span>); <span class="hljs-comment">// { a: 1 }</span></code></pre>
<p>2.可以用作对象的合并</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };

var obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1, b: 2, c: 3 } 注意目标对象自身也会改变。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> o1 = { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> };
<span class="hljs-keyword">var</span> o2 = { <span class="hljs-attr">b</span>: <span class="hljs-number">2</span> };
<span class="hljs-keyword">var</span> o3 = { <span class="hljs-attr">c</span>: <span class="hljs-number">3</span> };

<span class="hljs-keyword">var</span> obj = <span class="hljs-built_in">Object</span>.assign(o1, o2, o3);
<span class="hljs-built_in">console</span>.log(obj); <span class="hljs-comment">// { a: 1, b: 2, c: 3 }</span>
<span class="hljs-built_in">console</span>.log(o1);  <span class="hljs-comment">// { a: 1, b: 2, c: 3 } 注意目标对象自身也会改变。</span></code></pre>
<p>3.目标对象o1自身也发生了改变，假如不想让o1改变，可以把三个对象合并到一个空的对象中，操作如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var obj = Object.assign({},o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">var</span> obj = <span class="hljs-built_in">Object</span>.assign({},o1, o2, o3);
<span class="hljs-built_in">console</span>.log(obj); <span class="hljs-comment">// { a: 1, b: 2, c: 3 }</span>
<span class="hljs-built_in">console</span>.log(o1);  <span class="hljs-comment">// { a: 1 }</span></code></pre>
<p><strong>注意：以下几个地方</strong><br>1.继承属性和不可枚举属性是不能拷贝的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = Object.create({foo: 1}, { // foo 是个继承属性
    bar: {
        value: 2  // bar 是个不可枚举属性。
    },
    baz: {
        value: 3,
        enumerable: true  // baz 是个自身可枚举属性
    }
});

var copy = Object.assign({}, obj);
console.log(copy); // { baz: 3 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj = <span class="hljs-built_in">Object</span>.create({<span class="hljs-attr">foo</span>: <span class="hljs-number">1</span>}, { <span class="hljs-comment">// foo 是个继承属性</span>
    bar: {
        <span class="hljs-attr">value</span>: <span class="hljs-number">2</span>  <span class="hljs-comment">// bar 是个不可枚举属性。</span>
    },
    <span class="hljs-attr">baz</span>: {
        <span class="hljs-attr">value</span>: <span class="hljs-number">3</span>,
        <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>  <span class="hljs-comment">// baz 是个自身可枚举属性</span>
    }
});

<span class="hljs-keyword">var</span> copy = <span class="hljs-built_in">Object</span>.assign({}, obj);
<span class="hljs-built_in">console</span>.log(copy); <span class="hljs-comment">// { baz: 3 }</span></code></pre>
<p>2.原始类型会被包装为 object</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var v1 = &quot;abc&quot;;
var v2 = true;
var v3 = 10;
var v4 = Symbol(&quot;foo&quot;)

var obj = Object.assign({}, v1, null, v2, undefined, v3, v4); 
// 原始类型会被包装，null 和 undefined 会被忽略
// 注意，只有字符串的包装对象才可能有自身可枚举属性
console.log(obj); // { &quot;0&quot;: &quot;a&quot;, &quot;1&quot;: &quot;b&quot;, &quot;2&quot;: &quot;c&quot; }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> v1 = <span class="hljs-string">"abc"</span>;
<span class="hljs-keyword">var</span> v2 = <span class="hljs-literal">true</span>;
<span class="hljs-keyword">var</span> v3 = <span class="hljs-number">10</span>;
<span class="hljs-keyword">var</span> v4 = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">"foo"</span>)

<span class="hljs-keyword">var</span> obj = <span class="hljs-built_in">Object</span>.assign({}, v1, <span class="hljs-literal">null</span>, v2, <span class="hljs-literal">undefined</span>, v3, v4); 
<span class="hljs-comment">// 原始类型会被包装，null 和 undefined 会被忽略</span>
<span class="hljs-comment">// 注意，只有字符串的包装对象才可能有自身可枚举属性</span>
<span class="hljs-built_in">console</span>.log(obj); <span class="hljs-comment">// { "0": "a", "1": "b", "2": "c" }</span>
</code></pre>
<h2 id="articleHeader1">二、Object.create()</h2>
<p>Object.create()的不止是有一个参数，其实还有第二个参数！<br>Object.create(proto, [ propertiesObject ])第二个参数是可选的，主要用于指定我们创建的对象的一些属性，（例如：是否可读、是否可写，是否可以枚举等等）可以通过下面案例来了解第二个参数！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o;
o = Object.create(Object.prototype, {
  // foo会成为所创建对象的数据属性
  foo: { writable:true, configurable:true, value: &quot;hello&quot; },
  // bar会成为所创建对象的访问器属性
  bar: {
    configurable: false,
    get: function() { return 10 },
    set: function(value) { console.log(&quot;Setting `o.bar` to&quot;, value) }
"}}")

// 创建一个以另一个空对象为原型，且拥有一个属性p的对象
o = Object.create({}, { p: { value: 42 } })

// 省略了的属性特性默认为false,所以属性p是不可写,不可枚举,不可配置的
o.p = 24
o.p
//42

o.q = 12
for (var prop in o) {
   console.log(prop)
}
//&quot;q&quot;

delete o.p
//false

//创建一个可写的,可枚举的,可配置的属性p
o2 = Object.create({}, { p: { value: 42, writable: true, enumerable: true, configurable: true } });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> o;
o = <span class="hljs-built_in">Object</span>.create(<span class="hljs-built_in">Object</span>.prototype, {
  <span class="hljs-comment">// foo会成为所创建对象的数据属性</span>
  foo: { <span class="hljs-attr">writable</span>:<span class="hljs-literal">true</span>, <span class="hljs-attr">configurable</span>:<span class="hljs-literal">true</span>, <span class="hljs-attr">value</span>: <span class="hljs-string">"hello"</span> },
  <span class="hljs-comment">// bar会成为所创建对象的访问器属性</span>
  bar: {
    <span class="hljs-attr">configurable</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">10</span> },
    <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Setting `o.bar` to"</span>, value) }
"}}")

<span class="hljs-comment">// 创建一个以另一个空对象为原型，且拥有一个属性p的对象</span>
o = <span class="hljs-built_in">Object</span>.create({}, { <span class="hljs-attr">p</span>: { <span class="hljs-attr">value</span>: <span class="hljs-number">42</span> } })

<span class="hljs-comment">// 省略了的属性特性默认为false,所以属性p是不可写,不可枚举,不可配置的</span>
o.p = <span class="hljs-number">24</span>
o.p
<span class="hljs-comment">//42</span>

o.q = <span class="hljs-number">12</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> prop <span class="hljs-keyword">in</span> o) {
   <span class="hljs-built_in">console</span>.log(prop)
}
<span class="hljs-comment">//"q"</span>

<span class="hljs-keyword">delete</span> o.p
<span class="hljs-comment">//false</span>

<span class="hljs-comment">//创建一个可写的,可枚举的,可配置的属性p</span>
o2 = <span class="hljs-built_in">Object</span>.create({}, { <span class="hljs-attr">p</span>: { <span class="hljs-attr">value</span>: <span class="hljs-number">42</span>, <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span> } });</code></pre>
<h2 id="articleHeader2">三、Object.is()</h2>
<p>用来判断两个值是否是同一个值。</p>
<p>下面是一些例子，面试中可能会提及</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.is('haorooms', 'haorooms');     // true
Object.is(window, window);   // true

Object.is('foo', 'bar');     // false
Object.is([], []);           // false

var test = { a: 1 };
Object.is(test, test);       // true

Object.is(null, null);       // true

// 特例
Object.is(0, -0);            // false
Object.is(-0, -0);           // true
Object.is(NaN, 0/0);         // true
Object.keys(obj)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-built_in">Object</span>.<span class="hljs-keyword">is</span>(<span class="hljs-string">'haorooms'</span>, <span class="hljs-string">'haorooms'</span>);     <span class="hljs-comment">// true</span>
<span class="hljs-built_in">Object</span>.<span class="hljs-keyword">is</span>(<span class="hljs-built_in">window</span>, <span class="hljs-built_in">window</span>);   <span class="hljs-comment">// true</span>

<span class="hljs-built_in">Object</span>.<span class="hljs-keyword">is</span>(<span class="hljs-string">'foo'</span>, <span class="hljs-string">'bar'</span>);     <span class="hljs-comment">// false</span>
<span class="hljs-built_in">Object</span>.<span class="hljs-keyword">is</span>([], []);           <span class="hljs-comment">// false</span>

<span class="hljs-keyword">var</span> test = { a: <span class="hljs-number">1</span> };
<span class="hljs-built_in">Object</span>.<span class="hljs-keyword">is</span>(test, test);       <span class="hljs-comment">// true</span>

<span class="hljs-built_in">Object</span>.<span class="hljs-keyword">is</span>(<span class="hljs-keyword">null</span>, <span class="hljs-keyword">null</span>);       <span class="hljs-comment">// true</span>

<span class="hljs-comment">// 特例</span>
<span class="hljs-built_in">Object</span>.<span class="hljs-keyword">is</span>(<span class="hljs-number">0</span>, <span class="hljs-number">-0</span>);            <span class="hljs-comment">// false</span>
<span class="hljs-built_in">Object</span>.<span class="hljs-keyword">is</span>(<span class="hljs-number">-0</span>, <span class="hljs-number">-0</span>);           <span class="hljs-comment">// true</span>
<span class="hljs-built_in">Object</span>.<span class="hljs-keyword">is</span>(NaN, <span class="hljs-number">0</span>/<span class="hljs-number">0</span>);         <span class="hljs-comment">// true</span>
<span class="hljs-built_in">Object</span>.keys(obj)
</code></pre>
<p>返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;];
console.log(Object.keys(arr));
// ['0', '1', '2']
 
/* Object 对象 */
let obj = { foo: &quot;bar&quot;, baz: 42 },
keys = Object.keys(obj);
console.log(keys);
// [&quot;foo&quot;,&quot;baz&quot;]  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> arr = [<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>];
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.keys(arr));
<span class="hljs-comment">// ['0', '1', '2']</span>
 
<span class="hljs-comment">/* Object 对象 */</span>
<span class="hljs-keyword">let</span> obj = { <span class="hljs-attr">foo</span>: <span class="hljs-string">"bar"</span>, <span class="hljs-attr">baz</span>: <span class="hljs-number">42</span> },
keys = <span class="hljs-built_in">Object</span>.keys(obj);
<span class="hljs-built_in">console</span>.log(keys);
<span class="hljs-comment">// ["foo","baz"]  </span>
</code></pre>
<h2 id="articleHeader3">四、Object.keys（)</h2>
<p>Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// simple array
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

// array like object
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

// array like object with random key ordering
var anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj)); // console: ['2', '7', '100']

// getFoo is a property which isn't enumerable
var myObj = Object.create({}, {
  getFoo: {
    value: function () { return this.foo; }
  } 
});
myObj.foo = 1;
console.log(Object.keys(myObj)); // console: ['foo']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// simple array</span>
<span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>];
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.keys(arr)); <span class="hljs-comment">// console: ['0', '1', '2']</span>

<span class="hljs-comment">// array like object</span>
<span class="hljs-keyword">var</span> obj = { <span class="hljs-number">0</span>: <span class="hljs-string">'a'</span>, <span class="hljs-number">1</span>: <span class="hljs-string">'b'</span>, <span class="hljs-number">2</span>: <span class="hljs-string">'c'</span> };
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.keys(obj)); <span class="hljs-comment">// console: ['0', '1', '2']</span>

<span class="hljs-comment">// array like object with random key ordering</span>
<span class="hljs-keyword">var</span> anObj = { <span class="hljs-number">100</span>: <span class="hljs-string">'a'</span>, <span class="hljs-number">2</span>: <span class="hljs-string">'b'</span>, <span class="hljs-number">7</span>: <span class="hljs-string">'c'</span> };
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.keys(anObj)); <span class="hljs-comment">// console: ['2', '7', '100']</span>

<span class="hljs-comment">// getFoo is a property which isn't enumerable</span>
<span class="hljs-keyword">var</span> myObj = <span class="hljs-built_in">Object</span>.create({}, {
  <span class="hljs-attr">getFoo</span>: {
    <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.foo; }
  } 
});
myObj.foo = <span class="hljs-number">1</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.keys(myObj)); <span class="hljs-comment">// console: ['foo']</span></code></pre>
<hr>
<p>方法返回一个给定对象自己的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。 Object.values会过滤属性名为 Symbol 值的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.values(an_obj)); // ['b', 'c', 'a']
 
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.values(obj)); // ['a', 'b', 'c']

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-keyword">var</span> an_obj = { <span class="hljs-number">100</span>: <span class="hljs-string">'a'</span>, <span class="hljs-number">2</span>: <span class="hljs-string">'b'</span>, <span class="hljs-number">7</span>: <span class="hljs-string">'c'</span> };
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.values(an_obj)); <span class="hljs-comment">// ['b', 'c', 'a']</span>
 
<span class="hljs-keyword">var</span> obj = { <span class="hljs-number">0</span>: <span class="hljs-string">'a'</span>, <span class="hljs-number">1</span>: <span class="hljs-string">'b'</span>, <span class="hljs-number">2</span>: <span class="hljs-string">'c'</span> };
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.values(obj)); <span class="hljs-comment">// ['a', 'b', 'c']</span>

</code></pre>
<h2 id="articleHeader4">五、Object.entries()</h2>
<p>返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环也枚举原型链中的属性）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]     
const simuArray = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.entries(simuArray)); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>const obj = { foo: <span class="hljs-string">'bar'</span>, baz: <span class="hljs-number">42</span> };
console.log(<span class="hljs-symbol">Object</span>.entries(obj)); // [ [<span class="hljs-string">'foo'</span>, <span class="hljs-string">'bar'</span>], [<span class="hljs-string">'baz'</span>, <span class="hljs-number">42</span>] ]     
const simuArray = { <span class="hljs-number">0</span>: <span class="hljs-string">'a'</span>, <span class="hljs-number">1</span>: <span class="hljs-string">'b'</span>, <span class="hljs-number">2</span>: <span class="hljs-string">'c'</span> };
console.log(<span class="hljs-symbol">Object</span>.entries(simuArray)); // [ [<span class="hljs-string">'0'</span>, <span class="hljs-string">'a'</span>], [<span class="hljs-string">'1'</span>, <span class="hljs-string">'b'</span>], [<span class="hljs-string">'2'</span>, <span class="hljs-string">'c'</span>] ]
</code></pre>
<h2 id="articleHeader5">六、常用其他操作</h2>
<p><strong>1.删除对象中的某个值，前面案例中也谢了可以直接用delete</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {b:123};
delete o.p // 或delete  obj[b];
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> obj = {b:<span class="hljs-number">123</span>};
<span class="hljs-keyword">delete</span> o.p <span class="hljs-comment">// 或delete  obj[b];</span>
</code></pre>
<p><strong>2.遍历对象</strong><br>2.1for-in遍历</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {a: 'ss', b: 'bb', c: 'cc'};
for (var i in obj){
    console.log(i+':'+obj[i]);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>var obj = {<span class="hljs-string">a:</span> <span class="hljs-string">'ss'</span>, <span class="hljs-string">b:</span> <span class="hljs-string">'bb'</span>, <span class="hljs-string">c:</span> <span class="hljs-string">'cc'</span>};
<span class="hljs-keyword">for</span> (var i <span class="hljs-keyword">in</span> obj){
    console.log(i+<span class="hljs-string">':'</span>+obj[i]);
}</code></pre>
<p>2.2forEach遍历,先通过Object.keys()返回一个数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.keys(obj).forEach((value, index)=>{
    console.log(value, index,obj[value]);
});
//等同于
Object.keys(obj).forEach(function (value, index,c) {
    console.log(value, index,obj[value]);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>Object.keys(obj).forEach((<span class="hljs-keyword">value</span>, <span class="hljs-built_in">index</span>)=&gt;{
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">value</span>, <span class="hljs-built_in">index</span>,obj[<span class="hljs-keyword">value</span>]);
});
//等同于
Object.keys(obj).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span></span> (<span class="hljs-keyword">value</span>, <span class="hljs-built_in">index</span>,c) {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">value</span>, <span class="hljs-built_in">index</span>,obj[<span class="hljs-keyword">value</span>]);
});</code></pre>
<p>2.3jQuery的$.each()方法：它接受两个参数，分别指代属性名和属性值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.each(obj,function(key,value){
    console.log(key+&quot;: &quot;+value)

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$.each(obj,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key,value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(key+<span class="hljs-string">": "</span>+value)

</code></pre>
<h2 id="articleHeader6">其它一些不常用的对象操作属性：</h2>
<p><strong>1.Object.freeze()</strong> 方法可以冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。也就是说，这个对象永远是不可变的。该方法返回被冻结的对象。</p>
<p><strong>2.Object.isFrozen()</strong> 方法判断一个对象是否被冻结（frozen）。</p>
<p><strong>3.Object.isExtensible()</strong> 方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。</p>
<p><strong>4.Object.isSealed()</strong> 方法判断一个对象是否是密封的（sealed）。</p>
<p><strong>5.Object.seal()</strong> 方法可以让一个对象密封，并返回被密封后的对象。密封对象是指那些不能添加新的属性，不能删除已有属性，以及不能修改已有属性的可枚举性、可配置性、可写性，但可能可以修改已有属性的值的对象。</p>
<p><strong>6.Object.getOwnPropertyNames(obj)</strong>返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。</p>
<p><strong>7.Object.getOwnPropertySymbols(obj)</strong>返回一个数组，包含对象自身的所有 Symbol 属性的键名。</p>
<p><strong>8.Reflect.ownKeys(obj)</strong>返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。</p>
<p><strong>9.hasOwnProperty()</strong>判断对象自身属性中是否具有指定的属性。</p>
<p><a href="https://segmentfault.com/a/1190000016603159">JavaScript字符串操作方法大全，包含ES6方法</a></p>
<p><a href="https://segmentfault.com/a/1190000016503330" target="_blank">JavaScript常用数组操作方法，包含ES6方法</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript：对Object对象的一些常用操作总结

## 原文链接
[https://segmentfault.com/a/1190000016901888](https://segmentfault.com/a/1190000016901888)

