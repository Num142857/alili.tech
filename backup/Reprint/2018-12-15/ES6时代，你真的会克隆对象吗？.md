---
title: 'ES6时代，你真的会克隆对象吗？' 
date: 2018-12-15 2:30:11
hidden: true
slug: ezl3mfsgfq4
categories: [reprint]
---

{{< raw >}}

                    
<p>原文：<a href="https://github.com/Alvin-Liu/Blog/issues/8" rel="nofollow noreferrer" target="_blank">你真的会克隆对象吗</a></p>
<h2 id="articleHeader0">开始之前</h2>
<p>在开始聊克隆之前，我们还是先来看看js数据类型。js的数据类型分为<strong>基本数据类型</strong>和<strong>复杂数据类型</strong>。</p>
<ul>
<li>基本数据类型：Number、Boolean、String、Null、String、Symbol（ES6 新增）</li>
<li>复杂数据类型：Object，其他引用类型（Array、Date、RegExp、Function、基本包装类型（Boolean、String、Number）、Math等）都是Object类型的实例对象</li>
</ul>
<p>克隆:基本数据 =&gt; 复制这个变量；复杂数据 =&gt; 拷贝引用（网上的介绍很多，不深入了）</p>
<h2 id="articleHeader1">常见浅拷贝</h2>
<p>对于对象的克隆，应该大多数人都能实现出来，可能深、浅拷贝都能想出好几种方式，我们先来聊聊浅拷贝。</p>
<p>一个常见的浅拷贝一般是下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function shallowCopy (obj) {
  if (typeof obj !== 'object') {
    return
  }
  var newObj = obj instanceof Array ? [] : {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shallowCopy</span> </span>(obj) {
  <span class="hljs-keyword">if</span> (typeof obj !== <span class="hljs-string">'object'</span>) {
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Obj</span> = obj instanceof <span class="hljs-keyword">Array</span> ? [] : <span class="hljs-type"></span>{}
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj) {
    <span class="hljs-keyword">if</span> (obj.hasOwnProperty(key)) {
      <span class="hljs-keyword">new</span><span class="hljs-type">Obj</span>[key] = obj[key]
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">Obj</span>
}
</code></pre>
<p>或者更严谨一点的实现数组的判断：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.prototype.toString.call(arr) === '[object Array]'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-type">Object</span>.proto<span class="hljs-keyword">type</span>.toString.call(arr) === '[object <span class="hljs-type">Array</span>]'
</code></pre>
<p>好像是没什么问题呢，毕竟经过了好多项目的检测，网上一搜就能出现一大堆。</p>
<p><strong>但是</strong>，我们开头介绍数据类型的时候就已经说过了，ES6新增了<code>Symbol</code>类型，情况好像就有点不一样了</p>
<h2 id="articleHeader2">Symbol</h2>
<p><code>Symbol</code>是ES6中引入的原始数据类型。<code>Symbol</code>值通过<code>Symbol</code>函数生成，是独一无二的。同时，ES6中规定了对象的属性名有两种类型，一种是字符串，另一种就是 <code>Symbol</code> 类型。凡是属性名属于 Symbol 类型，就不会与其他属性名产生冲突。但是，随之而来的问题是，我们的<code>for...in</code>循环不能遍历出该属性</p>
<blockquote>
<code>Symbol</code> 作为属性名，该属性不会出现在<code>for...in</code>、<code>for...of</code>循环中，也不会被<code>Object.keys()</code>、<code>Object.getOwnPropertyNames()</code>、<code>JSON.stringify()</code>返回。但是，它也不是私有属性，有一个<code>Object.getOwnPropertySymbols</code>方法，可以获取指定对象的所有 Symbol 属性名。</blockquote>
<p>有<code>Symbol</code>类型，自然有遍历<code>Symbol</code>类型的方法。<code>Object.getOwnPropertySymbols</code> + <code>for...in</code>的组合起来好像是能满足我们要求的了。嗯，看起来还不错，但是似乎有点麻烦了，有没有更便捷一点的方式呢？或许新时代的男人---<code>Reflect.ownKeys</code>，要闪亮登场了，这个既能遍历字符串，又能遍历<code>Symbol</code>的死变态（请允许我这么夸他）。</p>
<blockquote>
<code>Reflect.ownKeys</code>返回一个数组，包含对象自身的所有属性，不管是属性名是<code>Symbol</code>或字符串，也不管是否可枚举</blockquote>
<h2 id="articleHeader3">Object.assign</h2>
<p>这个时候熟悉ES6的人或许开始有疑问了，我们已经开始讨论<code>Symbol</code>和<code>Reflect.ownKeys</code>，为什么浅克隆不直接用<code>Object.assign</code>或者展开运算符（<code>...</code>）呢？</p>
<p>嗯，待我吃根火腿冷静冷静，好像你说的很对！<code>Object.assign</code>的确是能拷贝<code>Symbol</code>类型的呢。但是呢，但是呢，我们是一个有追求的猿类，多一种实现方式不是能让我们多了解一些坑吗？而且这种方式不是能让我们更灵活的实现不可预知的需求吗？对，没错，是这样子的...</p>
<p><code>Object.assign</code>这个更完美的男人出来之后，好像浅拷贝部分也该结束了，正常来说，的确是这样。不过我们再仔细想想上面的两种方式，好像还是有点区别的呢。我们再来看看这两个男人：</p>
<ul>
<li>
<code>Reflect.ownKeys</code>返回一个数组，包含对象自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举</li>
<li>
<code>Object.assign</code>拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性</li>
</ul>
<p>注意到了吗？这里面有一个是否可枚举的概念，这个时候是不是应该感慨我们知道怎么实现不可预知的需求了呢。</p>
<h2 id="articleHeader4">不可枚举</h2>
<p>我们先看个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = Object.create({ foo: 1 }, {
  [Symbol()]: {
    value: 1,
    enumerable: false
  },
  bar: {
    value: 2,
    enumerable: false
  },
  [Symbol()]: {
    value: 3,
    enumerable: true
  },
  baz: {
    value: 4,
    enumerable: true
  }
})

Object.assign({}, obj)  // {baz: 4, Symbol(): 3}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">var</span> <span class="hljs-string">obj</span> <span class="hljs-string">=</span> <span class="hljs-string">Object.create({</span> <span class="hljs-attr">foo:</span> <span class="hljs-number">1</span> <span class="hljs-string">},</span> <span class="hljs-string">{</span>
  <span class="hljs-string">[Symbol()]:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    value:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>
<span class="hljs-attr">    enumerable:</span> <span class="hljs-literal">false</span>
  <span class="hljs-string">},</span>
<span class="hljs-attr">  bar:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    value:</span> <span class="hljs-number">2</span><span class="hljs-string">,</span>
<span class="hljs-attr">    enumerable:</span> <span class="hljs-literal">false</span>
  <span class="hljs-string">},</span>
  <span class="hljs-string">[Symbol()]:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    value:</span> <span class="hljs-number">3</span><span class="hljs-string">,</span>
<span class="hljs-attr">    enumerable:</span> <span class="hljs-literal">true</span>
  <span class="hljs-string">},</span>
<span class="hljs-attr">  baz:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    value:</span> <span class="hljs-number">4</span><span class="hljs-string">,</span>
<span class="hljs-attr">    enumerable:</span> <span class="hljs-literal">true</span>
  <span class="hljs-string">}</span>
<span class="hljs-string">})</span>

<span class="hljs-string">Object.assign({},</span> <span class="hljs-string">obj)</span>  <span class="hljs-string">//</span> <span class="hljs-string">{baz:</span> <span class="hljs-number">4</span><span class="hljs-string">,</span> <span class="hljs-string">Symbol():</span> <span class="hljs-number">3</span><span class="hljs-string">}</span>
</code></pre>
<p>唉，的确是这样呢！看来<code>Object.assign</code>也不是我们的理想归宿啊。我们再回过头来看看<code>Reflect.ownKeys</code>，上面挖的坑也该填了，我们在讲<code>Symbol</code>的时候，<code>Object.getOwnPropertySymbols</code> + <code>for...in</code>直接用<code>Reflect.ownKeys</code>替代了，在从可枚举的角度出发看看，好像哪里不对，<code>for...in</code>只能循环遍历对象自身的和继承的可枚举的属性，且不含 <code>Symbol</code>。头都大了吗？来来来，喝完这杯，还有一杯，继续接着来。这么多循环，我们来缕缕头绪：</p>
<ul>
<li>
<code>for...in</code>循环遍历对象自身的和继承的可枚举属性（不含 <code>Symbol</code> 属性）。</li>
<li>
<code>Object.keys()</code>返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 <code>Symbol</code> 属性）的键名。</li>
<li>
<code>Object.getOwnPropertyNames()</code>返回一个数组，包含对象自身的所有属性（不含 <code>Symbol</code> 属性，但是包括不可枚举属性）的键名。</li>
<li>
<code>Object.getOwnPropertySymbols()</code>返回一个数组，包含对象自身的所有 <code>Symbol</code> 属性的键名。</li>
<li>
<code>Reflect.ownKeys()</code>返回一个数组，包含对象自身的所有键名，不管键名是 <code>Symbol</code> 或字符串，也不管是否可枚举。</li>
</ul>
<p>终于清晰了，或许也该结束了吧。</p>
<p>慢着，好像上面的例子让我想到了什么！！！</p>
<h2 id="articleHeader5">属性描述符</h2>
<p>我们在来思考一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const source = {
  get foo() { return 1 }
};
const target = {};

Object.assign(target, source) // { foo: 1 }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-keyword">const</span> source = {
  <span class="hljs-function">get <span class="hljs-title">foo</span><span class="hljs-params">()</span> </span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">1</span> }
};
<span class="hljs-keyword">const</span> <span class="hljs-keyword">target</span> = {};

Object.assign(<span class="hljs-keyword">target</span>, source) <span class="hljs-comment">// { foo: 1 }</span>
</code></pre>
<p>好像并不是我们想要的呢，遍历的方式好像也不适用了，这可怎么办。别急，还有<code>Object.getOwnPropertyDescriptors</code>可以用。</p>
<blockquote>ES2017 引入了<code>Object.getOwnPropertyDescriptors</code>方法，返回指定对象所有自身属性（非继承属性）的描述对象</blockquote>
<p>仔细阅读下文档，终于用<code>Object.getOwnPropertyDescriptors</code>+<code>Object.getPrototypeOf</code>成功了呢</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.create(
  Object.getPrototypeOf(obj), 
  Object.getOwnPropertyDescriptors(obj) 
)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">Object</span><span class="hljs-selector-class">.create</span>(
  <span class="hljs-selector-tag">Object</span><span class="hljs-selector-class">.getPrototypeOf</span>(<span class="hljs-selector-tag">obj</span>), 
  <span class="hljs-selector-tag">Object</span><span class="hljs-selector-class">.getOwnPropertyDescriptors</span>(<span class="hljs-selector-tag">obj</span>) 
)
</code></pre>
<p>写到这里，浅拷贝部分也该结束了</p>
<h2 id="articleHeader6">结束语</h2>
<p>可能实际项目中并不需要处理的这么细致，但是希望大家对各种遍历、实现一个浅拷贝以及ES6的一些知识有一个总结和一点新的认识吧，本来想继续写深拷贝的，无赖篇幅已经不短，加上长夜漫漫，我想睡觉，深拷贝的问题更复杂，我先放放，日后再说。</p>
<p>最后的最后，对这篇文章有兴趣的朋友，可以继续关注下一篇的<a href="https://github.com/Alvin-Liu/Blog/issues/9" rel="nofollow noreferrer" target="_blank">深克隆</a>,会更新的会更新的...</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6时代，你真的会克隆对象吗？

## 原文链接
[https://segmentfault.com/a/1190000013056850](https://segmentfault.com/a/1190000013056850)

