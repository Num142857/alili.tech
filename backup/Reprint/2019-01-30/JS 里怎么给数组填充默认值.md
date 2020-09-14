---
title: 'JS 里怎么给数组填充默认值' 
date: 2019-01-30 2:30:23
hidden: true
slug: r0w29esklr
categories: [reprint]
---

{{< raw >}}

                    
<p>今天看到一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.apply(null, Array(30)).map(() => 4)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">Array</span>.apply(<span class="hljs-literal">null</span>, <span class="hljs-built_in">Array</span>(<span class="hljs-number">30</span>)).map(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-number">4</span>)</code></pre>
<p>这代码的写法无法让人一下理解它的意图。<br>Google 之后知道它的作用是构造一个长度为 30 的数组，默认值是 4。</p>
<h2 id="articleHeader0">解析</h2>
<p>但是为什么要写得这么别扭呢？我们来分解下它每一步在做什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.apply(null, Array(30)) 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">Array</span>.apply(<span class="hljs-literal">null</span>, <span class="hljs-keyword">Array</span>(<span class="hljs-number">30</span>)) 
</code></pre>
<p>这一段代码生成一个长度为30的数组，里面的值都是 <strong>undefined</strong>。<br>之后的 <code>.map(() =&gt; 4)</code> ：负责填充默认值</p>
<p>但是为什么构造一个空值数组需要这么麻烦呢？还要用上 apply 方法，尝试用 <code>Array(30).map(() =&gt; 4)</code> 来生成数组的话，你会得到这样的一个结果，根本就没有值。</p>
<blockquote><p>[ , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,  ]</p></blockquote>
<p>查看<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array" rel="nofollow noreferrer" target="_blank">文档</a> 可以看到 Array 的构造函数语法，可以得知 Array 支持两种构造方式。使用参数形式给定 N 个数组元素，或者给定一个数组长度。<br>不过比较重要的一点文档里没提到，使用 <code>new Array(arrayLength)</code> 方式构造的数组是一个<strong>稀疏数组</strong>，里面是没有任何值的，只有长度。所以这个方式构造出来的数组是无法遍历的，也就无法用 map 遍历填充值了。</p>
<p>知道了上述的原因，我们就能理解：</p>
<p><code>Array.apply(null, Array(30))</code> <br>其实等于<br><code>Array.apply(null, [, , , , , , , , , , , , , , , , , , , , , , , , , , , , ,]))</code></p>
<p>然后我们要继续了解 apply 方法，在这里可以看 apply 的作用 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply" rel="nofollow noreferrer" target="_blank">文档解释</a>， 这里不作介绍。apply 方法会把生成的稀疏数组展开并当做参数再次传给 Array 的构造函数，就是这样子：</p>
<p><code>Array(null,null,null......))</code> </p>
<p>这样最终就会得到一个数组，这样就不是稀疏数组了，里面是有值的，虽然是 undefined。</p>
<blockquote><p>[ undefined, undefined, undefined ......]</p></blockquote>
<h2 id="articleHeader1">结语</h2>
<p>总结下，其实就是 js 的 Array 的默认构造函数生成的是稀疏数组，是无法用 map 遍历填充的。所以才写得这么绕。</p>
<p>不过，说了这么多，要实现原本的需求，其实有更简单的方法啦：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array(30).fill(4)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">Array</span><span class="hljs-params">(<span class="hljs-number">30</span>)</span></span>.fill(<span class="hljs-number">4</span>)</code></pre>
<p>fill 方法的<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill" rel="nofollow noreferrer" target="_blank">说明</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS 里怎么给数组填充默认值

## 原文链接
[https://segmentfault.com/a/1190000007651029](https://segmentfault.com/a/1190000007651029)

