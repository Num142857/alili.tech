---
title: 'JS内存管理' 
date: 2018-12-13 2:30:07
hidden: true
slug: y3repikba89
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>JS有完善的内存处理机制，所以之前我们不用特别的去关注这块的实现。页面不快了，刷新一下就好了；浏览器卡顿，重启一下就OK。但是随着SPA和移动APP的流行，以及未来可能存在的PWA的实现，JS内存可能成为新的内存瓶颈。这也是写本文的初衷。</blockquote>
<h2 id="articleHeader0">1.什么是内存泄漏</h2>
<p>当我们决定不再使用某些内存时，由于错误的编码，未能使得GC(Gabbage Collection)正确的将这些内存回收的情况，就是内存泄漏。</p>
<h2 id="articleHeader1">2.内存的占用，分配和回收</h2>
<h3 id="articleHeader2">2.1 内存的占用</h3>
<p><span class="img-wrap"><img data-src="/img/bV3Zhr?w=1916&amp;h=584" src="https://static.alili.tech/img/bV3Zhr?w=1916&amp;h=584" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>一个对象占用的内存分为直接占用内存(Shallow Size)和占用总内存(Retained Size)。</p>
<blockquote>
<strong>直接占用内存</strong>：对象本身占用的内存。典型的JavaScript对象都会有保留内存用来描述这个对象和存储它的直接值。一般，只有数组和字符串会有明显的直接占用内存(Shallow Size)。但字符串和数组常常会在渲染器内存中存储主要数据部分，仅仅在JavaScript对象栈中暴露一个很小的包装对象。<br><strong>占用总内存</strong>：直接占用内存和这个引用的依赖对象所占用的内存。</blockquote>
<p>赋值和New操作都会涉及到内存的占用。</p>
<h3 id="articleHeader3">2.2 内存的分配</h3>
<p>Chrome V8的垃圾回收（GC）算法基于Generational Collection，内存被划分为两种，分别称为Young Generation（YG）和Old Generation（OG）。</p>
<blockquote>所谓Young和Old是根据他们占用的时间来划分的。内存在YG的分配和回收快而频繁，一般存在的时间很短，所以称为Young；而在OG中则慢而少发生，所以称为Old。</blockquote>
<p>因为在V8中，YG的GC过程会阻塞程序，而OG的GC不会阻塞。所以通常情况下开发者更关心YG的细节。</p>
<p>YG又被平分为两部分空间，分别称为From和To。所有内存从To空间被分配出去，当To满时，开始触发GC，接下来细看一下。</p>
<p>某时刻，To已经分A、B和C分配了内存，当前它剩下一小块内存未分配出去，而From所有的内存都空闲着。</p>
<p><span class="img-wrap"><img data-src="/img/bVzMjy?w=228&amp;h=113" src="https://static.alili.tech/img/bVzMjy?w=228&amp;h=113" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>此时，一个程序需要为D分配内存，但D需要的内存大小超出了To未分配的内存，如下图。此时，触发GC，页面停止执行。<br><span class="img-wrap"><img data-src="/img/bVzMjC?w=229&amp;h=215" src="https://static.alili.tech/img/bVzMjC?w=229&amp;h=215" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>接着From和To进行对换，即原来的To空间被标志为From，From被标志为To。并且把活的变量值（例如B）标志出来，而”垃圾“（例如AC）未被标志，它们将会被清掉。<br><span class="img-wrap"><img data-src="/img/bVzMjD?w=282&amp;h=130" src="https://static.alili.tech/img/bVzMjD?w=282&amp;h=130" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>活的B会被复制到To空间，而「垃圾」AC则被回收，同时，D被分配到To空间，最后成下图的分布</p>
<p><span class="img-wrap"><img data-src="/img/bVzMjH?w=237&amp;h=129" src="https://static.alili.tech/img/bVzMjH?w=237&amp;h=129" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>至此，整个GC完成，此过程中页面停止执行，所以要尽可能的快。当YG中的值存活比较久时，它会被推向OG，OG的空间满时，触发OG内的GC，OG的GC时会触发YG的GC。</p>
<blockquote><ul>
<li>每次分配都使To的可用空间减小，程序又更接近GC</li>
<li>YG的GC会阻塞程序，所以GC时间不宜太长10ms以内，因为16ms就会出现丢帧；GC不宜太频繁</li>
<li>某个值变成垃圾后，不会立马释放内存，只有在GC的时候所占内存才会被回收。</li>
</ul></blockquote>
<p><strong>2.2 内容均来自参考文献</strong></p>
<h3 id="articleHeader4">2.3 内存的回收</h3>
<p>GC Root是内存的根结节，在浏览器中它是window，在NodeJS中则是global对象。</p>
<p><span class="img-wrap"><img data-src="/img/bV3ZjJ?w=478&amp;h=295" src="https://static.alili.tech/img/bV3ZjJ?w=478&amp;h=295" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>从GC Root开始遍历图，所有能到达的节点称为活节点，如果存在GC Root不能到达的节点，那么该节点称为“垃圾”，将会被回收，如图中灰色的节点。</p>
<p>至于根节点的回收，不受用户的控制。</p>
<h2 id="articleHeader5">3. 导致内存泄漏的原因</h2>
<h3 id="articleHeader6">3.1 没有完全切断与GC root之间的路径</h3>
<p>因为没有完全切断与根节点之间的路径，导致自动GC不会回收这部分内存，从而造成内存泄漏。</p>
<p>具体的原因有：</p>
<ul><li>对象之间的相互引用</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a, b;
a.reference = b;
b.reference = a;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>var a, <span class="hljs-keyword">b;
</span>a.reference = <span class="hljs-keyword">b;
</span><span class="hljs-keyword">b.reference </span>= a<span class="hljs-comment">;</span></code></pre>
<ul><li>错误使用了全局变量</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a = &quot;1234567&quot;;
相当于
window.a = &quot;1234567&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code><span class="hljs-attribute">a</span> = <span class="hljs-string">"1234567"</span><span class="hljs-comment">;</span>
相当于
window.a = <span class="hljs-string">"1234567"</span><span class="hljs-comment">;</span></code></pre>
<ul><li>DOM元素清空或删除时，绑定的事件未清除</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;myDiv&quot;>
    <input type=&quot;button&quot; value=&quot;Click me&quot; id=&quot;myBtn&quot;>
</div>

<script type=&quot;text/javascript&quot;>
    var btn = document.getElementById('myBtn');
    btn.onclick = function () {
        document.getElementById('myDiv').innerHTML = 'Processing...';
        /* 清除事件绑定 */
        // btn.onclick = null;
    };
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"myDiv"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Click me"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"myBtn"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myBtn'</span>);
    btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myDiv'</span>).innerHTML = <span class="hljs-string">'Processing...'</span>;
        <span class="hljs-comment">/* 清除事件绑定 */</span>
        <span class="hljs-comment">// btn.onclick = null;</span>
    };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ul><li>闭包引用</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bindEvent() {
    var obj = document.getElementById('xxx');

    obj.onclick = function () {
        /** 空函数*/
    };

    /** delete this reference */
    // obj = null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bindEvent</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> obj = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'xxx'</span>);

    obj.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">/** 空函数*/</span>
    };

    <span class="hljs-comment">/** delete this reference */</span>
    <span class="hljs-comment">// obj = null;</span>
}</code></pre>
<ul><li>DOM元素清空或删除时，子元素存在JS引用，导致子元素的所有父元素都不会被删除</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// b是a的子dom节点, a是body的子节点
var aElement = document.getElementById(&quot;a&quot;);
var bElement = document.getElementById(&quot;b&quot;);
document.body.removeChild(aElement);
// aElement = null；
// bElement = null;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment">// b是a的子dom节点, a是body的子节点</span>
<span class="hljs-keyword">var</span> aElement = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"a"</span>);
<span class="hljs-keyword">var</span> bElement = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"b"</span>);
<span class="hljs-built_in">document</span>.body.removeChild(aElement);
<span class="hljs-comment">// aElement = null；</span>
<span class="hljs-comment">// bElement = null;</span></code></pre>
<h3 id="articleHeader7">3.2 过度占用了内存空间</h3>
<p>更多的出现在nodejs中，例如：</p>
<ul><li>无节制的循环</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="while(1) {
    // do sth
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">while</span><span class="hljs-params">(<span class="hljs-number">1</span>)</span></span> {
    <span class="hljs-comment">// do sth</span>
}</code></pre>
<ul><li>过大的数组</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [];
for (var i=0; i< 100000000000; i++) {
    var a = {
        'desc': 'an object'
    }
    arr.push(a);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">var</span> arr = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt; <span class="hljs-number">100000000000</span>; i++) {
    <span class="hljs-keyword">var</span> a = {
        <span class="hljs-symbol">'des</span>c': <span class="hljs-symbol">'an</span> <span class="hljs-class"><span class="hljs-keyword">object</span>'</span>
    }
    arr.push(a);
}</code></pre>
<h2 id="articleHeader8">总结</h2>
<p>本文描述了内存分配和泄漏的基本原理，并提及了日常常遇到的集中的泄漏原因。在下一篇文章中，将阐述如何确定内存泄漏，以及可以使用的工具和方法。</p>
<h2 id="articleHeader9">参考文献：</h2>
<ul>
<li>《<a href="http://www.codeceo.com/article/chrome-javascript-memory.html" rel="nofollow noreferrer" target="_blank">Chrome开发者工具之JavaScript内存分析</a>》</li>
<li>《【精耕细作】授你兇器，一见JS内存》from kenshinlin</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS内存管理

## 原文链接
[https://segmentfault.com/a/1190000013304880](https://segmentfault.com/a/1190000013304880)

