---
title: 'JavaScript中的浅拷贝和深拷贝' 
date: 2019-01-19 2:30:09
hidden: true
slug: z7t7mwba44l
categories: [reprint]
---

{{< raw >}}

                    
<p>在JavaScript中，对于<code>Object</code>和<code>Array</code>这类引用类型值，当从一个变量向另一个变量复制引用类型值时，这个值的副本其实是一个指针，两个变量指向同一个堆对象，改变其中一个变量，另一个也会受到影响。</p>
<p>这种拷贝分为两种情况：拷贝引用和拷贝实例，也就是我们说的浅拷贝和深拷贝</p>
<h3 id="articleHeader0">浅拷贝（shallow copy）</h3>
<p>拷贝原对象的引用，这是最简单的浅拷贝。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 对象
var o1 = {a: 1};
var o2 = o1;

console.log(o1 === o2);  // =>true
o2.a = 2; 
console.log(o1.a); // => 2

// 数组
var o1 = [1,2,3];
var o2 = o1;

console.log(o1 === o2); // => true
o2.push(4);
console.log(o1); // => [1,2,3,4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 对象</span>
<span class="hljs-keyword">var</span> o1 = {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>};
<span class="hljs-keyword">var</span> o2 = o1;

<span class="hljs-built_in">console</span>.log(o1 === o2);  <span class="hljs-comment">// =&gt;true</span>
o2.a = <span class="hljs-number">2</span>; 
<span class="hljs-built_in">console</span>.log(o1.a); <span class="hljs-comment">// =&gt; 2</span>

<span class="hljs-comment">// 数组</span>
<span class="hljs-keyword">var</span> o1 = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> o2 = o1;

<span class="hljs-built_in">console</span>.log(o1 === o2); <span class="hljs-comment">// =&gt; true</span>
o2.push(<span class="hljs-number">4</span>);
<span class="hljs-built_in">console</span>.log(o1); <span class="hljs-comment">// =&gt; [1,2,3,4]</span></code></pre>
<p>拷贝原对象的实例，但是对其内部的引用类型值，拷贝的是其引用，常用的就是如jquey中的<code>$.extend({}, obj);</code> <code>Array.prototype.slice()</code>和<code>Array.prototype.concat()</code>都会返回一个数组或者对象的浅拷贝，举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o1 = ['darko', {age: 22}];
var o2 = o1.slice(); // 根据Array.prototype.slice()的特性，这里会返回一个o1的浅拷贝对象

console.log(o1 === o2); // => false，说明o2拷贝的是o1的一个实例

o2[0] = 'lee';
console.log(o1[0]); // => &quot;darko&quot; o1和o2内部包含的基本类型值，复制的是其实例，不会相互影响

o2[1].age = 23;
console.log(o1[1].age); // =>23 o1和o2内部包含的引用类型值，复制的是其引用，会相互影响
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> o1 = [<span class="hljs-string">'darko'</span>, {<span class="hljs-attr">age</span>: <span class="hljs-number">22</span>}];
<span class="hljs-keyword">var</span> o2 = o1.slice(); <span class="hljs-comment">// 根据Array.prototype.slice()的特性，这里会返回一个o1的浅拷贝对象</span>

<span class="hljs-built_in">console</span>.log(o1 === o2); <span class="hljs-comment">// =&gt; false，说明o2拷贝的是o1的一个实例</span>

o2[<span class="hljs-number">0</span>] = <span class="hljs-string">'lee'</span>;
<span class="hljs-built_in">console</span>.log(o1[<span class="hljs-number">0</span>]); <span class="hljs-comment">// =&gt; "darko" o1和o2内部包含的基本类型值，复制的是其实例，不会相互影响</span>

o2[<span class="hljs-number">1</span>].age = <span class="hljs-number">23</span>;
<span class="hljs-built_in">console</span>.log(o1[<span class="hljs-number">1</span>].age); <span class="hljs-comment">// =&gt;23 o1和o2内部包含的引用类型值，复制的是其引用，会相互影响</span>
</code></pre>
<p>可以通过<code>Array.prototype.slice()</code>或<code>jQuery</code>中的<code>$.extend({}, obj)</code>完成对一个数组或者对象的浅拷贝，我们也可以自己写一个简单浅拷贝函数来加深对浅拷贝的理解、</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 浅拷贝实现，仅供参考
function shallowClone(source) {
    if (!source || typeof source !== 'object') {
        throw new Error('error arguments');
    }
    var targetObj = source.constructor === Array ? [] : {};
    for (var keys in source) {
        if (source.hasOwnProperty(keys)) {
            targetObj[keys] = source[keys];
        }
    }
    return targetObj;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 浅拷贝实现，仅供参考</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shallowClone</span>(<span class="hljs-params">source</span>) </span>{
    <span class="hljs-keyword">if</span> (!source || <span class="hljs-keyword">typeof</span> source !== <span class="hljs-string">'object'</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error arguments'</span>);
    }
    <span class="hljs-keyword">var</span> targetObj = source.constructor === <span class="hljs-built_in">Array</span> ? [] : {};
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> keys <span class="hljs-keyword">in</span> source) {
        <span class="hljs-keyword">if</span> (source.hasOwnProperty(keys)) {
            targetObj[keys] = source[keys];
        }
    }
    <span class="hljs-keyword">return</span> targetObj;
}
</code></pre>
<h3 id="articleHeader1">深拷贝（deep copy）</h3>
<p>深拷贝也就是拷贝出一个新的实例，新的实例和之前的实例互不影响，深拷贝的实现有几种方法，首先我们可以借助jQuery，lodash等第三方库完成一个深拷贝实例。在jQuery中可以通过添加一个参数来实现递归extend，调用<code>$.extend(true, {}, ...)</code>就可以实现一个深拷贝。</p>
<p>我们也可以自己实现一个深拷贝的函数，通常有两种方式，一种就是用<code>递归</code>的方式来做，还有一种是利用<code>JSON.stringify</code>和<code>JSON.parse</code>来做，这两种方式各有优劣，先来看看递归的方法怎么做。</p>
<p>jQuery中的extend方法基本的就是按照这个思路实现的，但是没有办法处理源对象内部<code>循环引用</code>的问题，同时对Date，Funcion等类型值也没有实现真正的深度复制，但是这些类型的值在重新定义的时候一般都是直接覆盖，所以也不会对源对象产生影响，从一定程度上来说也算是实现了一个深拷贝。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 递归实现一个深拷贝
function deepClone(source){
   if(!source || typeof source !== 'object'){
     throw new Error('error arguments', 'shallowClone');
   }
   var targetObj = source.constructor === Array ? [] : {};
   for(var keys in source){
      if(source.hasOwnProperty(keys)){
         if(source[keys] &amp;&amp; typeof source[keys] === 'object'){
           targetObj[keys] = source[keys].constructor === Array ? [] : {};
           targetObj[keys] = deepClone(source[keys]);
         }else{
           targetObj[keys] = source[keys];
         }
      } 
   }
   return targetObj;
}
// test example
var o1 = {
  arr: [1, 2, 3],
  obj: {
    key: 'value'
  },
  func: function(){
    return 1;
  }
};
var o3 = deepClone(o1);
console.log(o3 === o1); // => false
console.log(o3.obj === o1.obj); // => false
console.log(o2.func === o1.func); // => true
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 递归实现一个深拷贝</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepClone</span>(<span class="hljs-params">source</span>)</span>{
   <span class="hljs-keyword">if</span>(!source || <span class="hljs-keyword">typeof</span> source !== <span class="hljs-string">'object'</span>){
     <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error arguments'</span>, <span class="hljs-string">'shallowClone'</span>);
   }
   <span class="hljs-keyword">var</span> targetObj = source.constructor === <span class="hljs-built_in">Array</span> ? [] : {};
   <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> keys <span class="hljs-keyword">in</span> source){
      <span class="hljs-keyword">if</span>(source.hasOwnProperty(keys)){
         <span class="hljs-keyword">if</span>(source[keys] &amp;&amp; <span class="hljs-keyword">typeof</span> source[keys] === <span class="hljs-string">'object'</span>){
           targetObj[keys] = source[keys].constructor === <span class="hljs-built_in">Array</span> ? [] : {};
           targetObj[keys] = deepClone(source[keys]);
         }<span class="hljs-keyword">else</span>{
           targetObj[keys] = source[keys];
         }
      } 
   }
   <span class="hljs-keyword">return</span> targetObj;
}
<span class="hljs-comment">// test example</span>
<span class="hljs-keyword">var</span> o1 = {
  <span class="hljs-attr">arr</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>],
  <span class="hljs-attr">obj</span>: {
    <span class="hljs-attr">key</span>: <span class="hljs-string">'value'</span>
  },
  <span class="hljs-attr">func</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
  }
};
<span class="hljs-keyword">var</span> o3 = deepClone(o1);
<span class="hljs-built_in">console</span>.log(o3 === o1); <span class="hljs-comment">// =&gt; false</span>
<span class="hljs-built_in">console</span>.log(o3.obj === o1.obj); <span class="hljs-comment">// =&gt; false</span>
<span class="hljs-built_in">console</span>.log(o2.func === o1.func); <span class="hljs-comment">// =&gt; true</span>
  </code></pre>
<p>还有一种实现深拷贝的方式是利用<code>JSON对象</code>中的<code>parse</code>和<code>stringify</code>，JOSN对象中的stringify可以把一个js对象序列化为一个JSON字符串，parse可以把JSON字符串反序列化为一个js对象，通过这两个方法，也可以实现对象的深复制。</p>
<p>我们从下面的例子就可以看到，源对象的方法在拷贝的过程中丢失了，这是因为<code>在序列化JavaScript对象时，所有函数和原型成员会被有意忽略</code>，这个实现可以满足一些比较简单的情况，能够处理JSON格式所能表示的所有数据类型，同时如果在对象中存在循环应用的情况也无法正确处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 利用JSON序列化实现一个深拷贝
function deepClone(source){
  return JSON.parse(JSON.stringify(source));
}
var o1 = {
  arr: [1, 2, 3],
  obj: {
    key: 'value'
  },
  func: function(){
    return 1;
  }
};
var o2 = deepClone(o1);
console.log(o2); // => {arr: [1,2,3], obj: {key: 'value'"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 利用JSON序列化实现一个深拷贝</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepClone</span>(<span class="hljs-params">source</span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(source));
}
<span class="hljs-keyword">var</span> o1 = {
  <span class="hljs-attr">arr</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>],
  <span class="hljs-attr">obj</span>: {
    <span class="hljs-attr">key</span>: <span class="hljs-string">'value'</span>
  },
  <span class="hljs-attr">func</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
  }
};
<span class="hljs-keyword">var</span> o2 = deepClone(o1);
<span class="hljs-built_in">console</span>.log(o2); <span class="hljs-comment">// =&gt; {arr: [1,2,3], obj: {key: 'value'"}}"</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript中的浅拷贝和深拷贝

## 原文链接
[https://segmentfault.com/a/1190000008637489](https://segmentfault.com/a/1190000008637489)

