---
title: '详解Object.defineProperty()' 
date: 2019-02-11 2:30:49
hidden: true
slug: zmvnd146e2k
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p><code>Object.defineProperty</code>是ES5新增的一个API，其作用是给对象的属性增加更多的控制。在我们日常的coding中，这个API用到的地方不多，然而它对于MVVM框架中双向数据绑定（two-ways data binding）来说是至关重要的一个API，目前<a href="http://vuejs.org" rel="nofollow noreferrer" target="_blank">vue</a>和<a href="http://avalonjs.github.io/" rel="nofollow noreferrer" target="_blank">avalon</a>中的双向数据数据绑定均是通过它来实现的。</p>
<h2 id="articleHeader1">使用</h2>
<p><code>Object.defineProperty</code>方法提供了一种直接的方式来定义对象属性或者修改已有对象属性。</p>
<h3 id="articleHeader2">语法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.defineProperty(obj, prop, descriptor)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">Object</span>.defineProperty(obj, prop, descriptor)</code></pre>
<h4>参数</h4>
<p><strong>obj</strong>: 需要定义属性的对象（目标对象）</p>
<p><strong>prop</strong>: 需被定义或修改的属性名（对象上的属性或者方法）</p>
<p><strong>descriptor</strong>: 需被定义或修改的属性的描述符</p>
<h3 id="articleHeader3">descriptor</h3>
<p><code>obj</code>和<code>prop</code>都比较好理解，我们重点来解析第三个参数<strong>属性描述符</strong>，它是一个对象，里面有以下取值：</p>
<p><strong>value</strong>: 属性的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {}

Object.defineProperty(a, 'b', {
    value: 2
})

console.log(a.b); // => 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = {}

<span class="hljs-built_in">Object</span>.defineProperty(a, <span class="hljs-string">'b'</span>, {
    <span class="hljs-attr">value</span>: <span class="hljs-number">2</span>
})

<span class="hljs-built_in">console</span>.log(a.b); <span class="hljs-comment">// =&gt; 2</span></code></pre>
<p><strong>writable</strong>: 属性是否能被重写(rewrite)，默认为<code>false</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {}

Object.defineProperty(a, 'b', {
    value: 2,
    writable: false
})

console.log(a.b); // output 2

a.b = 3

console.log(a.b); // still ouput  2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = {}

<span class="hljs-built_in">Object</span>.defineProperty(a, <span class="hljs-string">'b'</span>, {
    <span class="hljs-attr">value</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">writable</span>: <span class="hljs-literal">false</span>
})

<span class="hljs-built_in">console</span>.log(a.b); <span class="hljs-comment">// output 2</span>

a.b = <span class="hljs-number">3</span>

<span class="hljs-built_in">console</span>.log(a.b); <span class="hljs-comment">// still ouput  2</span></code></pre>
<p><strong>enumerable</strong>: 属性是否能在<code>for ... in</code>或者<code>Object.keys</code>中被枚举出,来默认为<code>false</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {}

Object.defineProperty(a, 'b', {
    value: 2,
    enumerable: false
})

console.log(Object.keys(a)) // output []

Object.defineProperty(a, 'c', {
    value: 2,
    enumerable: true
})

console.log(Object.keys(a)) // output ['c']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = {}

<span class="hljs-built_in">Object</span>.defineProperty(a, <span class="hljs-string">'b'</span>, {
    <span class="hljs-attr">value</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>
})

<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.keys(a)) <span class="hljs-comment">// output []</span>

<span class="hljs-built_in">Object</span>.defineProperty(a, <span class="hljs-string">'c'</span>, {
    <span class="hljs-attr">value</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>
})

<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.keys(a)) <span class="hljs-comment">// output ['c']</span></code></pre>
<p><strong>configurable</strong>: 是否能够配置<code>value</code>，<code>writable</code>，<code>configurable</code>，默认为<code>false</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {}

Object.defineProperty(a, 'b', {
    value: 2,
    enumerable: false
})

console.log(a.b) // output 2

Object.defineProperty(a, 'b', {
    value: 3,
    enumerable: true
})

// TypeError: Cannot redefine property: b" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = {}

<span class="hljs-built_in">Object</span>.defineProperty(a, <span class="hljs-string">'b'</span>, {
    <span class="hljs-attr">value</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>
})

<span class="hljs-built_in">console</span>.log(a.b) <span class="hljs-comment">// output 2</span>

<span class="hljs-built_in">Object</span>.defineProperty(a, <span class="hljs-string">'b'</span>, {
    <span class="hljs-attr">value</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>
})

<span class="hljs-comment">// TypeError: Cannot redefine property: b</span></code></pre>
<p><strong>get</strong>: 一个给属性提供 getter 的方法，默认<code>undefined</code></p>
<p><strong>set</strong>: 一个给属性提供 setter 的方法，默认<code>undefined</code></p>
<p>属性描述符分为数据描述符和存取描述符。数据描述符是一个拥有可写或不可写值的属性。存取描述符是由一对 getter-setter 函数功能来描述的属性。</p>
<p>数据描述符和存取描述符均具有可选键值：<code>configurable</code>, <code>enumerable</code></p>
<p>数据描述符同时具有可选键值：<code>value</code>,<code>writable</code>,<code>get</code>,<code>set</code></p>
<p>用思维导图来表示就是：</p>
<p><span class="img-wrap"><img data-src="/img/bVuMum" src="https://static.alili.tech/img/bVuMum" alt="desc" title="desc" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">get/set</h3>
<p>对于<code>set</code>和<code>get</code>，我的理解是它们是一对勾子（hook）函数，当你对一个对象的某个属性赋值时，则会自动调用相应的<code>set</code>函数；而当获取属性时，则调用<code>get</code>函数。这也是实现双向数据绑定的关键。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {}
var b

Object.defineProperty(a, 'b', {
    get: function() {
        console.log('get b')

        // 我们可以在这里对返回的值做任何操作
        return b + 1
    },
    set: function(newValue) {
        console.log('set b to', newValue)
        b = newValue
    }
})

a.b = 100

console.log(a.b);

/*
output:
  set b to 100
  get b
  101
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = {}
<span class="hljs-keyword">var</span> b

<span class="hljs-built_in">Object</span>.defineProperty(a, <span class="hljs-string">'b'</span>, {
    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'get b'</span>)

        <span class="hljs-comment">// 我们可以在这里对返回的值做任何操作</span>
        <span class="hljs-keyword">return</span> b + <span class="hljs-number">1</span>
    },
    <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newValue</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'set b to'</span>, newValue)
        b = newValue
    }
})

a.b = <span class="hljs-number">100</span>

<span class="hljs-built_in">console</span>.log(a.b);

<span class="hljs-comment">/*
output:
  set b to 100
  get b
  101
*/</span></code></pre>
<h2 id="articleHeader5">注意</h2>
<p>数据描述符和存取描述符不能混合使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.defineProperty(o, &quot;conflict&quot;, {
  // value是数据描述符
  value: 1,
  // get是存取描述符
  get: function() {
    return 2;
  }
});
// throws a TypeError: value appears only in data descriptors, get appears only in accessor descriptors" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Object</span>.defineProperty(o, <span class="hljs-string">"conflict"</span>, {
  <span class="hljs-comment">// value是数据描述符</span>
  value: <span class="hljs-number">1</span>,
  <span class="hljs-comment">// get是存取描述符</span>
  get: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>;
  }
});
<span class="hljs-comment">// throws a TypeError: value appears only in data descriptors, get appears only in accessor descriptors</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
详解Object.defineProperty()

## 原文链接
[https://segmentfault.com/a/1190000004913904](https://segmentfault.com/a/1190000004913904)

