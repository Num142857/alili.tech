---
title: 'ES6：解构——JavaScript 从数组和对象中提取数据的优雅方法' 
date: 2019-01-16 2:30:07
hidden: true
slug: l7ond6akjrr
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>本文编译：<a href="https://www.zhihu.com/people/hu-zi-da-ha" rel="nofollow noreferrer" target="_blank">胡子大哈</a> </p>
<p>翻译原文：<a href="http://huziketang.com/blog/posts/detail?postId=58f41a06a58c240ae35bb8e6" rel="nofollow noreferrer" target="_blank">http://huziketang.com/blog/posts/detail?postId=58f41a06a58c240ae35bb8e6</a>  <br>英文连接：<a href="http://www.deadcoderising.com/2017-03-28-es6-destructuring-an-elegant-way-of-extracting-data-from-arrays-and-objects-in-javascript/" rel="nofollow noreferrer" target="_blank">ES6: Destructuring — an elegant way of extracting data from arrays and objects in JavaScript</a></p>
</blockquote>
<p><strong>转载请注明出处，保留原文链接以及作者信息</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009173075?w=3047&amp;h=1875" src="https://static.alili.tech/img/remote/1460000009173075?w=3047&amp;h=1875" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>ES6 有很多新特性，它很大程度上提升了 JavaScript 的编程体验，并且也告诉外界，JavaScript 依旧强势。</p>
<p>其中一个新特性是其对数组和对象的解构，通过解构方法从数组和对象中提取数据变得非常简单和方便。接下来看一下它是如何做到的，我们从数组开始讲起。</p>
<h2 id="articleHeader0">从数组中提取数据</h2>
<p>假设你有如下的数组，里面是几个人的名字：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const names = ['Luke', 'Eva', 'Phil'];  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;">    <span class="hljs-keyword">const</span> names = [<span class="hljs-string">'Luke'</span>, <span class="hljs-string">'Eva'</span>, <span class="hljs-string">'Phil'</span>];  </code></pre>
<p>接下来，使用解构从里面提取数据。</p>
<h3 id="articleHeader1">从数组中取元素</h3>
<p>首先从最基本的开始——提取数组中第一个元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const [first] = names;  
    console.log(first); // 'Luke'  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-keyword">const</span> [first] = names;  
    <span class="hljs-built_in">console</span>.log(first); <span class="hljs-comment">// 'Luke'  </span></code></pre>
<p>ok，下面分析一下这个语法都做了什么。把一个变量用中括号括起来，表示我们想要取得 <code>names</code> 数组中的第一个元素，并且把它分配给指定的变量，本例中即变量 <code>first</code>。</p>
<p>那么现在想要提取几个元素，比如第一个和第二个怎么办呢？很简单，在中括号中添加变量就可以。这样会从数组中顺序提取几个元素分配给指定的变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const [first, second] = names;  
    console.log(first, second); // 'Luke' 'Eva'  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-keyword">const</span> [first, second] = names;  
    <span class="hljs-built_in">console</span>.log(first, second); <span class="hljs-comment">// 'Luke' 'Eva'  </span></code></pre>
<h3 id="articleHeader2">元素缺失时的默认值</h3>
<p>以上面的数组为例，如果我们要取 4 个值，而数组中只有 3 个值会发生什么呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const [first, second, third, fourth] = names;  
    console.log(fourth); // undefined  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-keyword">const</span> [first, second, third, fourth] = names;  
    <span class="hljs-built_in">console</span>.log(fourth); <span class="hljs-comment">// undefined  </span></code></pre>
<p>这种场景下，<code>fourth</code> 是 <code>underfined</code>。</p>
<p>这在很多场景下都是我们不想见到的，所以可以当数组中没有那么多的值的时候，我们可以提前给变量赋上默认值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const [first, second, third, fourth='Martin'] = names;  
    console.log(fourth); // 'Martin'  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-keyword">const</span> [first, second, third, fourth=<span class="hljs-string">'Martin'</span>] = names;  
    <span class="hljs-built_in">console</span>.log(fourth); <span class="hljs-comment">// 'Martin'  </span></code></pre>
<h3 id="articleHeader3">跳过数组中的元素</h3>
<p>学会了如何按顺序从数组中提取数据。现在有这样的场景：想要跳过数组中的某个元素取值，这样就可以避免取到不想取的值。解构方法中提供了很好的解决方案。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var [first, , second] = names;  
    console.log(first, second); // 'Luke' 'Phil'  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-keyword">var</span> [first, , second] = names;  
    <span class="hljs-built_in">console</span>.log(first, second); <span class="hljs-comment">// 'Luke' 'Phil'  </span></code></pre>
<p>通过简单的添加逗号，就可以避免分配相应的数组元素，直接跳到下一个元素了。如果想要跳过多个元素呢？也很简单，多加几个逗号就可以了。</p>
<h3 id="articleHeader4">分配数组中剩下的给某元素</h3>
<p>到现在，已经知道了如何从数组中提取单个元素，那么对于想要取数组中的后面连续部分的元素怎么办呢？看下面的解构代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var [first, ...rest] = names;  
    console.log(rest); // ['Eva','Phil']  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-keyword">var</span> [first, ...rest] = names;  
    <span class="hljs-built_in">console</span>.log(rest); <span class="hljs-comment">// ['Eva','Phil']  </span></code></pre>
<p>通过在最后一个变量前加 <code>...</code> 标记，这个意思是分配数组中剩下的所有元素给 <code>rest</code> 变量。</p>
<h2 id="articleHeader5">解构对象</h2>
<p>ok，数组的解构已经都学会了，下面看一下从对象中提取数据，假设有如下描述一个人的对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const person = {  
      name: 'Luke',
      age: '24',
      facts: {
        hobby: 'Photo',
        work: 'Software Developer'
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-keyword">const</span> person = {  
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Luke'</span>,
      <span class="hljs-attr">age</span>: <span class="hljs-string">'24'</span>,
      <span class="hljs-attr">facts</span>: {
        <span class="hljs-attr">hobby</span>: <span class="hljs-string">'Photo'</span>,
        <span class="hljs-attr">work</span>: <span class="hljs-string">'Software Developer'</span>
      }
    }</code></pre>
<h3 id="articleHeader6">从对象中提取数据</h3>
<p>依然从最基本的开始，提取从 <code>person</code> 中提取 <code>name</code> 和 <code>age</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const {name, age} = person;  
    console.log(name, age); // 'Luke' '24'  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-keyword">const</span> {name, age} = person;  
    <span class="hljs-built_in">console</span>.log(name, age); <span class="hljs-comment">// 'Luke' '24'  </span></code></pre>
<p>可以看到，和从数组中提取数据的语法都是一样的，唯一的不同是把方括号替换成了花括号。</p>
<h3 id="articleHeader7">提取嵌套值</h3>
<p>假设想要提取对象结构中深层次的值该怎么处理？比如 <code>person</code> 中的 <code>hobby</code>。代码如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const {facts: {hobby"}}" = person;  
    console.log(hobby); // 'Photo'  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-keyword">const</span> {<span class="hljs-attr">facts</span>: {hobby"}}" = person;  
    <span class="hljs-built_in">console</span>.log(hobby); <span class="hljs-comment">// 'Photo'  </span></code></pre>
<p>通过冒号可以描述对象中的路径，这样就可以取到对象中深层的嵌套值了。</p>
<h3 id="articleHeader8">数据缺失时的默认值</h3>
<p>如在解构数组时的处理方案一样，当想要抽取的值不存在时，也可以给对象里的值赋默认值。如下面代码，想要提取 <code>hometown</code> 属性，并且给定 <code>Unknown</code> 默认值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const {hometown = 'Unknown'} = person;  
    console.log(hometown); // 'Unknown'  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-keyword">const</span> {hometown = <span class="hljs-string">'Unknown'</span>} = person;  
    <span class="hljs-built_in">console</span>.log(hometown); <span class="hljs-comment">// 'Unknown'  </span></code></pre>
<h2 id="articleHeader9">解构函数参数</h2>
<p>在结束本文之前，我们来看最后一个例子——解构函数参数。</p>
<p>假设你有一个函数，接受一个对象作为参数。那么你可以直接在参数列表中对对象进行解构。例如下面这个 <code>toString</code> 函数，打印出 <code>name</code> 和 <code>age</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const toString = ({name, age}) => {  
      return `${name} is ${age} years old`;
    }
    
    toString(person); // Luke is 24 years old  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-keyword">const</span> toString = <span class="hljs-function">(<span class="hljs-params">{name, age}</span>) =&gt;</span> {  
      <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${name}</span> is <span class="hljs-subst">${age}</span> years old`</span>;
    }
    
    toString(person); <span class="hljs-comment">// Luke is 24 years old  </span></code></pre>
<p>不过要提醒大家的是，这不是一个好的编程习惯，如果别人使用你的函数，很容易造成误解，调试起来特别不方便，这里只是告诉大家可以这样进行解构而已。</p>
<p>ok，那么到现在对于数组和对象的解构问题大家应该都学会了，后面也还会介绍一些 JavaScript 的一些新特性，欢迎大家对我保持关注。</p>
<p>如果你认为文章中还需要注意什么，或者添加什么，<a href="https://www.zhihu.com/people/hu-zi-da-ha" rel="nofollow noreferrer" target="_blank">请让我知道</a>。</p>
<hr>
<p>我最近正在写一本<a href="http://react.huziketang.com/" rel="nofollow noreferrer" target="_blank">《React.js 小书》</a>，对 React.js 感兴趣的童鞋，<a href="http://react.huziketang.com/" rel="nofollow noreferrer" target="_blank">欢迎指点</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6：解构——JavaScript 从数组和对象中提取数据的优雅方法

## 原文链接
[https://segmentfault.com/a/1190000009173072](https://segmentfault.com/a/1190000009173072)

