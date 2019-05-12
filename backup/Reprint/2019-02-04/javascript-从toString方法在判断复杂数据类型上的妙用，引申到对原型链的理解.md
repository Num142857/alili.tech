---
title: 'javascript-从toString方法在判断复杂数据类型上的妙用，引申到对原型链的理解' 
date: 2019-02-04 2:30:58
hidden: true
slug: fne155tkb6t
categories: [reprint]
---

{{< raw >}}

                    
<p>关于 <code>toString</code> 方法在有关js的开发中使用应该是相当广泛的，这两天在看jQuery的源码，从 <code>toString</code> 本身了解与巩固了不少知识，写出来与大家一同分享。<br>首先先上一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr=[1,2,3];
toString.call(arr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> arr=[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
toString.call(arr);</code></pre>
<p>来看一下效果:<br><span class="img-wrap"><img data-src="/img/bVCz8J?w=164&amp;h=76" src="https://static.alili.tech/img/bVCz8J?w=164&amp;h=76" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>众所周知，判断数据类型，我们大多会使用<code>typeof</code>操作符，但是<code>typeof</code>操作符只能判断基本数据类型，对于复杂的数据类型一律返回<code>object</code>,而使用<code>toString</code>方法在这里可以做一个很好的补充。</p>
<p>问：为什么要使用<code>toString.call(arr)</code>，而不能直接使用<code>arr.toString()</code> ？<br>再上一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr=[1,2,3];
toString.call(arr);
arr.toString();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> arr=[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
toString.call(arr);
arr.toString();</code></pre>
<p>来看一下效果：<br><span class="img-wrap"><img data-src="/img/bVCAb5?w=176&amp;h=96" src="https://static.alili.tech/img/bVCAb5?w=176&amp;h=96" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>很明显直接使用<code>toString</code>，得不到我们想要的效果，博主第一次看到这个结果时也是一脸懵逼。</p>
<p>其实，这里面就涉及到<strong>js原型及原型链</strong>的相关知识<br>再上一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr=[1,2,3];
Object.prototype.toString.call(arr);
Array.prototype.toString.call(arr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> arr=[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-built_in">Object</span>.prototype.toString.call(arr);
<span class="hljs-built_in">Array</span>.prototype.toString.call(arr);</code></pre>
<p>来看一下效果：<br><span class="img-wrap"><img data-src="/img/bVCAe7?w=267&amp;h=113" src="https://static.alili.tech/img/bVCAe7?w=267&amp;h=113" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>看到这里大家都应该明白了，其实只有<code>Object.prototype</code>上的<code>toString</code>才能用来进行复杂数据类型的判断。</p>
<p>简单解释一些原型链的概念：<br>我们都知道js中的对象都继承自<code>Object</code>，所以当我们在某个对象上调用一个方法时，会先在该对象上进行查找，如果没找到则会进入对象的原型（也就是<code>.prototype</code>）进行查找，如果没找到，同样的也会进入对象原型的原型进行查找，直到找到或者进入原型链的顶端<code>Object.prototype</code>才会停止。</p>
<p>所以，当我们使用<code>arr.toString()</code>时，不能进行复杂数据类型的判断，因为它调用的是<code>Array.prototype.toString</code>，虽然<code>Array</code>也继承自<code>Object</code>，但js在<code>Array.prototype</code>上重写了<code>toString</code>，而我们通过<code>toString.call(arr)</code>实际上是通过原型链调用了<code>Object.prototype.toString</code>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript-从toString方法在判断复杂数据类型上的妙用，引申到对原型链的理解

## 原文链接
[https://segmentfault.com/a/1190000006774238](https://segmentfault.com/a/1190000006774238)

