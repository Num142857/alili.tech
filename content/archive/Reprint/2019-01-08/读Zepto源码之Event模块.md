---
title: '读Zepto源码之Event模块' 
date: 2019-01-08 2:30:11
hidden: true
slug: tkdm30w17sc
categories: [reprint]
---

{{< raw >}}

                    
<p>Event 模块是 Zepto 必备的模块之一，由于对 Event Api 不太熟，Event 对象也比较复杂，所以乍一看 Event 模块的源码，有点懵，细看下去，其实也不太复杂。</p>
<p>读Zepto源码系列文章已经放到了github上，欢迎star: <a href="https://github.com/yeyuqiudeng/reading-zepto" rel="nofollow noreferrer" target="_blank">reading-zepto</a></p>
<h2 id="articleHeader0">源码版本</h2>
<p>本文阅读的源码为 <a href="https://github.com/madrobby/zepto/tree/v1.2.0" rel="nofollow noreferrer" target="_blank">zepto1.2.0</a></p>
<h2 id="articleHeader1">准备知识</h2>
<h3 id="articleHeader2">focus/blur 的事件模拟</h3>
<p>为什么要对 <code>focus</code> 和 <code>blur</code> 事件进行模拟呢？从 MDN 中可以看到， <code>focus</code> 事件和 <code>blur</code> 事件并不支持事件冒泡。不支持事件冒泡带来的直接后果是不能进行事件委托，所以需要对 <code>focus</code> 和 <code>blur</code> 事件进行模拟。</p>
<p>除了 <code>focus</code> 事件和 <code>blur</code> 事件外，现代浏览器还支持 <code>focusin</code> 事件和 <code>focusout</code> 事件，他们和 <code>focus</code> 事件及 <code>blur</code> 事件的最主要区别是支持事件冒泡。因此可以用 <code>focusin</code> 和模拟 <code>focus</code> 事件的冒泡行为，用 <code>focusout</code> 事件来模拟 <code>blur</code> 事件的冒泡行为。</p>
<p>我们可以通过以下代码来确定这四个事件的执行顺序：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input id=&quot;test&quot; type=&quot;text&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"test"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> /&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const target = document.getElementById('test')
target.addEventListener('focusin', () => {console.log('focusin')})
target.addEventListener('focus', () => {console.log('focus')})
target.addEventListener('blur', () => {console.log('blur')})
target.addEventListener('focusout', () => {console.log('focusout')})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> target = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'test'</span>)
target.addEventListener(<span class="hljs-string">'focusin'</span>, () =&gt; {<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'focusin'</span>)})
target.addEventListener(<span class="hljs-string">'focus'</span>, () =&gt; {<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'focus'</span>)})
target.addEventListener(<span class="hljs-string">'blur'</span>, () =&gt; {<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'blur'</span>)})
target.addEventListener(<span class="hljs-string">'focusout'</span>, () =&gt; {<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'focusout'</span>)})</code></pre>
<p>在 <code>chrome59</code>下， <code>input</code> 聚焦和失焦时，控制台会打印出如下结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'focus'
'focusin'
'blur'
'focusout'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">'focus'</span>
<span class="hljs-string">'focusin'</span>
<span class="hljs-string">'blur'</span>
<span class="hljs-string">'focusout'</span></code></pre>
<p>可以看到，在此浏览器中，事件的执行顺序应该是 <code>focus &gt; focusin &gt; blur &gt; focusout</code></p>
<p>关于这几个事件更详细的描述，可以查看：《<a href="https://segmentfault.com/a/1190000003942014">说说focus /focusin /focusout /blur 事件</a>》</p>
<p>关于事件的执行顺序，我测试的结果与文章所说的有点不太一样。感兴趣的可以点击这个链接测试下<a href="http://jsbin.com/nizugazamo/edit?html,js,console,output" rel="nofollow noreferrer" target="_blank">http://jsbin.com/nizugazamo/edit?html,js,console,output</a>。不过我觉得执行顺序可以不必细究，可以将 <code>focusin</code> 作为 <code>focus</code> 事件的冒泡版本。</p>
<h3 id="articleHeader3">mouseenter/mouseleave 的事件模拟</h3>
<p>跟 <code>focus</code> 和 <code>blur</code> 一样，<code>mouseenter</code> 和 <code>mouseleave</code> 也不支持事件的冒泡， 但是 <code>mouseover</code> 和 <code>mouseout</code> 支持事件冒泡，因此，这两个事件的冒泡处理也可以分别用 <code>mouseover</code> 和 <code>mouseout</code> 来模拟。</p>
<p>在鼠标事件的 <code>event</code> 对象中，有一个 <code>relatedTarget</code> 的属性，从 <a href="https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget" rel="nofollow noreferrer" target="_blank">MDN:MouseEvent.relatedTarget</a> 文档中，可以看到，<code>mouseover</code> 的 <code>relatedTarget</code> 指向的是移到目标节点上时所离开的节点（ <code>exited from</code> ），<code>mouseout</code> 的 <code>relatedTarget</code> 所指向的是离开所在的节点后所进入的节点（ <code> entered to</code> ）。</p>
<p>另外 <code>mouseover</code> 事件会随着鼠标的移动不断触发，但是 <code>mouseenter</code> 事件只会在进入节点的那一刻触发一次。如果鼠标已经在目标节点上，那 <code>mouseover</code> 事件触发时的 <code>relatedTarget</code> 为当前节点。</p>
<p>因此，要模拟 <code>mouseenter</code> 或 <code>mouseleave</code> 事件，只需要确定触发 <code>mouseover</code> 或 <code>mouseout</code> 事件上的 <code>relatedTarget</code> 不存在，或者 <code>relatedTarget</code> 不为当前节点，并且不为当前节点的子节点，避免子节点事件冒泡的影响。</p>
<p>关于 <code>mouseenter</code> 和 <code>mouseleave</code> 的模拟， <a href="https://github.com/qianlongo" rel="nofollow noreferrer" target="_blank">谦龙</a> 有篇文章《<a href="https://juejin.im/post/5935773fa0bb9f0058edbd61" rel="nofollow noreferrer" target="_blank">mouseenter与mouseover为何这般纠缠不清？</a>》写得很清楚，建议读一下。</p>
<h2 id="articleHeader4">Event 模块的核心</h2>
<p>将 <code>Event</code> 模块简化后如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";(function($){})(Zepto)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">;(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$</span>)</span>{})(Zepto)</code></pre>
<p>其实就是向闭包中传入 <code>Zepto</code> 对象，然后对 <code>Zepto</code> 对象做一些扩展。</p>
<p>在 <code>Event</code> 模块中，主要做了如下几件事：</p>
<ul>
<li><p>提供简洁的API</p></li>
<li><p>统一不同浏览器的 <code>event</code> 对象</p></li>
<li><p>事件句柄缓存池，方便手动触发事件和解绑事件。</p></li>
<li><p>事件委托</p></li>
</ul>
<h2 id="articleHeader5">内部方法</h2>
<h3 id="articleHeader6">zid</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _zid = 1
function zid(element) {
  return element._zid || (element._zid = _zid++)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> _zid = <span class="hljs-number">1</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">zid</span>(<span class="hljs-params">element</span>) </span>{
  <span class="hljs-keyword">return</span> element._zid || (element._zid = _zid++)
}</code></pre>
<p>获取参数 <code>element</code> 对象的 <code>_zid</code> 属性，如果属性不存在，则全局变量 <code>_zid</code> 增加 <code>1</code> ，作为 <code>element</code> 的 <code>_zid</code> 的属性值返回。这个方法用来标记已经绑定过事件的元素，方便查找。</p>
<h3 id="articleHeader7">parse</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function parse(event) {
  var parts = ('' + event).split('.')
  return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parse</span>(<span class="hljs-params">event</span>) </span>{
  <span class="hljs-keyword">var</span> parts = (<span class="hljs-string">''</span> + event).split(<span class="hljs-string">'.'</span>)
  <span class="hljs-keyword">return</span> {<span class="hljs-attr">e</span>: parts[<span class="hljs-number">0</span>], <span class="hljs-attr">ns</span>: parts.slice(<span class="hljs-number">1</span>).sort().join(<span class="hljs-string">' '</span>)}
}</code></pre>
<p>在 <code>zepto</code> 中，支持事件的命名空间，可以用 <code>eventType.ns1.ns2...</code> 的形式来给事件添加一个或多个命名空间。</p>
<p><code>parse</code> 函数用来分解事件名和命名空间。</p>
<p><code>'' + event</code> 是将 <code>event</code> 变成字符串，再以 <code>.</code> 分割成数组。</p>
<p>返回的对象中，<code>e</code> 为事件名， <code>ns</code> 为排序后，以空格相连的命名空间字符串，形如 <code>ns1 ns2 ns3 ...</code> 的形式。</p>
<h3 id="articleHeader8">matcherFor</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function matcherFor(ns) {
  return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">matcherFor</span>(<span class="hljs-params">ns</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'(?:^| )'</span> + ns.replace(<span class="hljs-string">' '</span>, <span class="hljs-string">' .* ?'</span>) + <span class="hljs-string">'(?: |$)'</span>)
}</code></pre>
<p>生成匹配命名空间的表达式，例如，传进来的参数 <code>ns</code> 为 <code>ns1 ns2 ns3</code> ，最终生成的正则为 <code>/(?:^| )ns1.* ?ns2.* ?ns3(?: |$)/</code>。至于有什么用，下面马上讲到。</p>
<h3 id="articleHeader9">findHandlers，查找缓存的句柄</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handlers = {}
function findHandlers(element, event, fn, selector) {
  event = parse(event)
  if (event.ns) var matcher = matcherFor(event.ns)
  return (handlers[zid(element)] || []).filter(function(handler) {
    return handler
      &amp;&amp; (!event.e  || handler.e == event.e)
      &amp;&amp; (!event.ns || matcher.test(handler.ns))
      &amp;&amp; (!fn       || zid(handler.fn) === zid(fn))
      &amp;&amp; (!selector || handler.sel == selector)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">handlers = {}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findHandlers</span>(<span class="hljs-params">element, event, fn, selector</span>) </span>{
  event = parse(event)
  <span class="hljs-keyword">if</span> (event.ns) <span class="hljs-keyword">var</span> matcher = matcherFor(event.ns)
  <span class="hljs-keyword">return</span> (handlers[zid(element)] || []).filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">handler</span>) </span>{
    <span class="hljs-keyword">return</span> handler
      &amp;&amp; (!event.e  || handler.e == event.e)
      &amp;&amp; (!event.ns || matcher.test(handler.ns))
      &amp;&amp; (!fn       || zid(handler.fn) === zid(fn))
      &amp;&amp; (!selector || handler.sel == selector)
  })
}</code></pre>
<p>查找元素对应的事件句柄。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event = parse(event)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">event = parse(event)</code></pre>
<p>调用 <code>parse</code> 函数，分隔出 <code>event</code> 参数的事件名和命名空间。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (event.ns) var matcher = matcherFor(event.ns)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span> (event.ns) <span class="hljs-keyword">var</span> matcher = matcherFor(event.ns)</code></pre>
<p>如果命名空间存在，则生成匹配该命名空间的正则表达式 <code>matcher</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return (handlers[zid(element)] || []).filter(function(handler) {
    ...
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">return</span> (handlers[zid(element)] || []).filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">handler</span>) </span>{
    ...
  })</code></pre>
<p>返回的其实是 <code>handlers[zid(element)]</code> 中符合条件的句柄函数。 <code>handlers</code> 是缓存的句柄容器，用 <code>element</code> 的 <code>_zid</code> 属性值作为 <code>key</code> 。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return handler  // 条件1
     &amp;&amp; (!event.e  || handler.e == event.e) // 条件2
     &amp;&amp; (!event.ns || matcher.test(handler.ns)) // 条件3
     &amp;&amp; (!fn       || zid(handler.fn) === zid(fn)) // 条件4
     &amp;&amp; (!selector || handler.sel == selector) // 条件5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">return</span> handler  <span class="hljs-comment">// 条件1</span>
     &amp;&amp; (!event.e  || handler.e == event.e) <span class="hljs-comment">// 条件2</span>
     &amp;&amp; (!event.ns || matcher.test(handler.ns)) <span class="hljs-comment">// 条件3</span>
     &amp;&amp; (!fn       || zid(handler.fn) === zid(fn)) <span class="hljs-comment">// 条件4</span>
     &amp;&amp; (!selector || handler.sel == selector) <span class="hljs-comment">// 条件5</span></code></pre>
<p>返回的句柄必须满足5个条件：</p>
<ol>
<li><p>句柄必须存在</p></li>
<li><p>如果 <code>event.e</code> 存在，则句柄的事件名必须与 <code>event</code> 的事件名一致</p></li>
<li><p>如果命名空间存在，则句柄的命名空间必须要与事件的命名空间匹配（ <code>matcherFor</code> 的作用 ）</p></li>
<li><p>如果指定匹配的事件句柄为 <code>fn</code> ，则当前句柄 <code>handler</code> 的 <code>_zid</code> 必须与指定的句柄 <code>fn</code> 相一致</p></li>
<li><p>如果指定选择器 <code>selector</code> ，则当前句柄中的选择器必须与指定的选择器一致</p></li>
</ol>
<p>从上面的比较可以看到，缓存的句柄对象的形式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  fn: '', // 函数
  e: '', // 事件名
  ns: '', // 命名空间
  sel: '',  // 选择器
  // 除此之外，其实还有
  i: '', // 函数索引
  del: '', // 委托函数
  proxy: '', // 代理函数
  // 后面这几个属性会讲到
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">fn</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 函数</span>
  e: <span class="hljs-string">''</span>, <span class="hljs-comment">// 事件名</span>
  ns: <span class="hljs-string">''</span>, <span class="hljs-comment">// 命名空间</span>
  sel: <span class="hljs-string">''</span>,  <span class="hljs-comment">// 选择器</span>
  <span class="hljs-comment">// 除此之外，其实还有</span>
  i: <span class="hljs-string">''</span>, <span class="hljs-comment">// 函数索引</span>
  del: <span class="hljs-string">''</span>, <span class="hljs-comment">// 委托函数</span>
  proxy: <span class="hljs-string">''</span>, <span class="hljs-comment">// 代理函数</span>
  <span class="hljs-comment">// 后面这几个属性会讲到</span>
}</code></pre>
<h3 id="articleHeader10">realEvent，返回对应的冒泡事件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="focusinSupported = 'onfocusin' in window,
focus = { focus: 'focusin', blur: 'focusout' },
hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }
function realEvent(type) {
  return hover[type] || (focusinSupported &amp;&amp; focus[type]) || type
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">focusinSupported = <span class="hljs-string">'onfocusin'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span>,
focus = { <span class="hljs-attr">focus</span>: <span class="hljs-string">'focusin'</span>, <span class="hljs-attr">blur</span>: <span class="hljs-string">'focusout'</span> },
hover = { <span class="hljs-attr">mouseenter</span>: <span class="hljs-string">'mouseover'</span>, <span class="hljs-attr">mouseleave</span>: <span class="hljs-string">'mouseout'</span> }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">realEvent</span>(<span class="hljs-params">type</span>) </span>{
  <span class="hljs-keyword">return</span> hover[type] || (focusinSupported &amp;&amp; focus[type]) || type
}</code></pre>
<p>这个函数其实是将 <code>focus/blur</code> 转换成 <code>focusin/focusout</code> ，将 <code>mouseenter/mouseleave</code> 转换成 <code>mouseover/mouseout</code> 事件。</p>
<p>由于 <code>focusin/focusout</code> 事件浏览器支持程度还不是很好，因此要对浏览器支持做一个检测，如果浏览器支持，则返回，否则，返回原事件名。</p>
<h3 id="articleHeader11">compatible，修正event对象</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="returnTrue = function(){return true},
returnFalse = function(){return false},
eventMethods = {
  preventDefault: 'isDefaultPrevented',
  stopImmediatePropagation: 'isImmediatePropagationStopped',
  stopPropagation: 'isPropagationStopped'
}

function compatible(event, source) {
  if (source || !event.isDefaultPrevented) {
    source || (source = event)

    $.each(eventMethods, function(name, predicate) {
      var sourceMethod = source[name]
      event[name] = function(){
        this[predicate] = returnTrue
        return sourceMethod &amp;&amp; sourceMethod.apply(source, arguments)
      }
      event[predicate] = returnFalse
    })

    try {
      event.timeStamp || (event.timeStamp = Date.now())
    } catch (ignored) { }

    if (source.defaultPrevented !== undefined ? source.defaultPrevented :
        'returnValue' in source ? source.returnValue === false :
        source.getPreventDefault &amp;&amp; source.getPreventDefault())
      event.isDefaultPrevented = returnTrue
      }
  return event
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">returnTrue = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>},
returnFalse = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>},
eventMethods = {
  <span class="hljs-attr">preventDefault</span>: <span class="hljs-string">'isDefaultPrevented'</span>,
  <span class="hljs-attr">stopImmediatePropagation</span>: <span class="hljs-string">'isImmediatePropagationStopped'</span>,
  <span class="hljs-attr">stopPropagation</span>: <span class="hljs-string">'isPropagationStopped'</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compatible</span>(<span class="hljs-params">event, source</span>) </span>{
  <span class="hljs-keyword">if</span> (source || !event.isDefaultPrevented) {
    source || (source = event)

    $.each(eventMethods, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name, predicate</span>) </span>{
      <span class="hljs-keyword">var</span> sourceMethod = source[name]
      event[name] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">this</span>[predicate] = returnTrue
        <span class="hljs-keyword">return</span> sourceMethod &amp;&amp; sourceMethod.apply(source, <span class="hljs-built_in">arguments</span>)
      }
      event[predicate] = returnFalse
    })

    <span class="hljs-keyword">try</span> {
      event.timeStamp || (event.timeStamp = <span class="hljs-built_in">Date</span>.now())
    } <span class="hljs-keyword">catch</span> (ignored) { }

    <span class="hljs-keyword">if</span> (source.defaultPrevented !== <span class="hljs-literal">undefined</span> ? source.defaultPrevented :
        <span class="hljs-string">'returnValue'</span> <span class="hljs-keyword">in</span> source ? source.returnValue === <span class="hljs-literal">false</span> :
        source.getPreventDefault &amp;&amp; source.getPreventDefault())
      event.isDefaultPrevented = returnTrue
      }
  <span class="hljs-keyword">return</span> event
}</code></pre>
<p><code>compatible</code> 函数用来修正 <code>event</code> 对象的浏览器差异，向 <code>event</code> 对象中添加了 <code>isDefaultPrevented</code>、<code>isImmediatePropagationStopped</code>、<code>isPropagationStopped</code> 几个方法，对不支持 <code>timeStamp</code> 的浏览器，向 <code>event</code> 对象中添加 <code>timeStamp</code> 属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (source || !event.isDefaultPrevented) {
  source || (source = event)

  $.each(eventMethods, function(name, predicate) {
    var sourceMethod = source[name]
    event[name] = function(){
      this[predicate] = returnTrue
      return sourceMethod &amp;&amp; sourceMethod.apply(source, arguments)
    }
    event[predicate] = returnFalse
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (source || !event.isDefaultPrevented) {
  source || (source = event)

  $.each(eventMethods, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name, predicate</span>) </span>{
    <span class="hljs-keyword">var</span> sourceMethod = source[name]
    event[name] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">this</span>[predicate] = returnTrue
      <span class="hljs-keyword">return</span> sourceMethod &amp;&amp; sourceMethod.apply(source, <span class="hljs-built_in">arguments</span>)
    }
    event[predicate] = returnFalse
  })</code></pre>
<p>判断条件是，原事件对象存在，或者事件 <code>event</code> 的 <code>isDefaultPrevented</code> 不存在时成立。</p>
<p>如果 <code>source</code> 不存在，则将 <code>event</code> 赋值给 <code>source</code>， 作为原事件对象。</p>
<p>遍历 <code>eventMethods</code> ，获得原事件对象的对应方法名 <code>sourceMethod</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event[name] = function(){
  this[predicate] = returnTrue
  return sourceMethod &amp;&amp; sourceMethod.apply(source, arguments)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">event[name] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">this</span>[predicate] = returnTrue
  <span class="hljs-keyword">return</span> sourceMethod &amp;&amp; sourceMethod.apply(source, <span class="hljs-built_in">arguments</span>)
}</code></pre>
<p>改写 <code>event</code> 对象相应的方法，如果执行对应的方法时，先将事件中方法所对应的新方法赋值为 <code>returnTrue</code> 函数 ，例如执行 <code>preventDefault</code> 方法时， <code>isDefaultPrevented</code> 方法的返回值为 <code>true</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event[predicate] = returnFalse" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">event[predicate] = returnFalse</code></pre>
<p>这是将新添加的属性，初始化为 <code>returnFalse</code> 方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
  event.timeStamp || (event.timeStamp = Date.now())
} catch (ignored) { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">try</span> {
  event.timeStamp || (event.timeStamp = <span class="hljs-built_in">Date</span>.now())
} <span class="hljs-keyword">catch</span> (ignored) { }</code></pre>
<p>这段向不支持 <code>timeStamp</code> 属性的浏览器中添加 <code>timeStamp</code> 属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (source.defaultPrevented !== undefined ? source.defaultPrevented :
    'returnValue' in source ? source.returnValue === false :
    source.getPreventDefault &amp;&amp; source.getPreventDefault())
  event.isDefaultPrevented = returnTrue
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (source.defaultPrevented !== <span class="hljs-literal">undefined</span> ? source.defaultPrevented :
    <span class="hljs-string">'returnValue'</span> <span class="hljs-keyword">in</span> source ? source.returnValue === <span class="hljs-literal">false</span> :
    source.getPreventDefault &amp;&amp; source.getPreventDefault())
  event.isDefaultPrevented = returnTrue
  }</code></pre>
<p>这是对浏览器 <code>preventDefault</code> 不同实现的兼容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="source.defaultPrevented !== undefined ? source.defaultPrevented : '三元表达式'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">source.defaultPrevented !== <span class="hljs-literal">undefined</span> ? source.defaultPrevented : <span class="hljs-string">'三元表达式'</span></code></pre>
<p>如果浏览器支持 <code>defaultPrevented</code>， 则返回 <code>defaultPrevented</code> 的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'returnValue' in source ? source.returnValue === false : '后一个判断'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-string">'returnValue'</span> <span class="hljs-keyword">in</span> source ? source.returnValue === <span class="hljs-literal">false</span> : <span class="hljs-string">'后一个判断'</span></code></pre>
<p><code>returnValue</code> 默认为 <code>true</code>，如果阻止了浏览器的默认行为， <code>returnValue</code> 会变为 <code>false</code> 。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="source.getPreventDefault &amp;&amp; source.getPreventDefault()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">source.getPreventDefault &amp;&amp; source.getPreventDefault()</code></pre>
<p>如果浏览器支持 <code>getPreventDefault</code> 方法，则调用 <code>getPreventDefault()</code> 方法获取是否阻止浏览器的默认行为。</p>
<p>判断为 <code>true</code> 的时候，将 <code>isDefaultPrevented</code> 设置为 <code>returnTrue</code> 方法。</p>
<h3 id="articleHeader12">createProxy，创建代理对象</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
function createProxy(event) {
  var key, proxy = { originalEvent: event }
  for (key in event)
    if (!ignoreProperties.test(key) &amp;&amp; event[key] !== undefined) proxy[key] = event[key]

    return compatible(proxy, event)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">ignoreProperties = <span class="hljs-regexp">/^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/</span>,
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createProxy</span>(<span class="hljs-params">event</span>) </span>{
  <span class="hljs-keyword">var</span> key, proxy = { <span class="hljs-attr">originalEvent</span>: event }
  <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> event)
    <span class="hljs-keyword">if</span> (!ignoreProperties.test(key) &amp;&amp; event[key] !== <span class="hljs-literal">undefined</span>) proxy[key] = event[key]

    <span class="hljs-keyword">return</span> compatible(proxy, event)
}</code></pre>
<p><code>zepto</code> 中，事件触发的时候，返回给我们的 <code>event</code> 都不是原生的 <code>event</code> 对象，都是代理对象，这个就是代理对象的创建方法。</p>
<p><code>ignoreProperties</code> 用来排除 <code>A-Z</code> 开头，即所有大写字母开头的属性，还有以<code>returnValue</code> 结尾，<code>layerX/layerY</code> ，<code>webkitMovementX/webkitMovementY</code> 结尾的非标准属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (key in event)
  if (!ignoreProperties.test(key) &amp;&amp; event[key] !== undefined) proxy[key] = event[key]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> event)
  <span class="hljs-keyword">if</span> (!ignoreProperties.test(key) &amp;&amp; event[key] !== <span class="hljs-literal">undefined</span>) proxy[key] = event[key]</code></pre>
<p>遍历原生事件对象，排除掉不需要的属性和值为 <code>undefined</code> 的属性，将属性和值复制到代理对象上。</p>
<p>最终返回的是修正后的代理对象</p>
<h3 id="articleHeader13">eventCapture</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function eventCapture(handler, captureSetting) {
  return handler.del &amp;&amp;
    (!focusinSupported &amp;&amp; (handler.e in focus)) ||
    !!captureSetting
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">eventCapture</span>(<span class="hljs-params">handler, captureSetting</span>) </span>{
  <span class="hljs-keyword">return</span> handler.del &amp;&amp;
    (!focusinSupported &amp;&amp; (handler.e <span class="hljs-keyword">in</span> focus)) ||
    !!captureSetting
}</code></pre>
<p>返回 <code>true</code> 表示在捕获阶段执行事件句柄，否则在冒泡阶段执行。</p>
<p>如果存在事件代理，并且事件为 <code>focus/blur</code> 事件，在浏览器不支持 <code>focusin/focusout</code> 事件时，设置为 <code>true</code> ， 在捕获阶段处理事件，间接达到冒泡的目的。</p>
<p>否则作用自定义的 <code>captureSetting</code> 设置事件执行的时机。</p>
<h3 id="articleHeader14">add，Event 模块的核心方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(element, events, fn, data, selector, delegator, capture){
  var id = zid(element), set = (handlers[id] || (handlers[id] = []))
  events.split(/\s/).forEach(function(event){
    if (event == 'ready') return $(document).ready(fn)
    var handler   = parse(event)
    handler.fn    = fn
    handler.sel   = selector
    // emulate mouseenter, mouseleave
    if (handler.e in hover) fn = function(e){
      var related = e.relatedTarget
      if (!related || (related !== this &amp;&amp; !$.contains(this, related)))
        return handler.fn.apply(this, arguments)
        }
    handler.del   = delegator
    var callback  = delegator || fn
    handler.proxy = function(e){
      e = compatible(e)
      if (e.isImmediatePropagationStopped()) return
      e.data = data
      var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
      if (result === false) e.preventDefault(), e.stopPropagation()
      return result
    }
    handler.i = set.length
    set.push(handler)
    if ('addEventListener' in element)
      element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
      })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">element, events, fn, data, selector, delegator, capture</span>)</span>{
  <span class="hljs-keyword">var</span> id = zid(element), set = (handlers[id] || (handlers[id] = []))
  events.split(<span class="hljs-regexp">/\s/</span>).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
    <span class="hljs-keyword">if</span> (event == <span class="hljs-string">'ready'</span>) <span class="hljs-keyword">return</span> $(<span class="hljs-built_in">document</span>).ready(fn)
    <span class="hljs-keyword">var</span> handler   = parse(event)
    handler.fn    = fn
    handler.sel   = selector
    <span class="hljs-comment">// emulate mouseenter, mouseleave</span>
    <span class="hljs-keyword">if</span> (handler.e <span class="hljs-keyword">in</span> hover) fn = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
      <span class="hljs-keyword">var</span> related = e.relatedTarget
      <span class="hljs-keyword">if</span> (!related || (related !== <span class="hljs-keyword">this</span> &amp;&amp; !$.contains(<span class="hljs-keyword">this</span>, related)))
        <span class="hljs-keyword">return</span> handler.fn.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>)
        }
    handler.del   = delegator
    <span class="hljs-keyword">var</span> callback  = delegator || fn
    handler.proxy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
      e = compatible(e)
      <span class="hljs-keyword">if</span> (e.isImmediatePropagationStopped()) <span class="hljs-keyword">return</span>
      e.data = data
      <span class="hljs-keyword">var</span> result = callback.apply(element, e._args == <span class="hljs-literal">undefined</span> ? [e] : [e].concat(e._args))
      <span class="hljs-keyword">if</span> (result === <span class="hljs-literal">false</span>) e.preventDefault(), e.stopPropagation()
      <span class="hljs-keyword">return</span> result
    }
    handler.i = set.length
    set.push(handler)
    <span class="hljs-keyword">if</span> (<span class="hljs-string">'addEventListener'</span> <span class="hljs-keyword">in</span> element)
      element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
      })
}</code></pre>
<p><code>add</code> 方法是向元素添加事件及事件响应，参数比较多，先来看看各参数的含义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="element // 事件绑定的元素
events // 需要绑定的事件列表
fn // 事件执行时的句柄
data // 事件执行时，传递给事件对象的数据
selector // 事件绑定元素的选择器
delegator // 事件委托函数 
capture // 那个阶段执行事件句柄" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">element <span class="hljs-comment">// 事件绑定的元素</span>
events <span class="hljs-comment">// 需要绑定的事件列表</span>
fn <span class="hljs-comment">// 事件执行时的句柄</span>
data <span class="hljs-comment">// 事件执行时，传递给事件对象的数据</span>
selector <span class="hljs-comment">// 事件绑定元素的选择器</span>
delegator <span class="hljs-comment">// 事件委托函数 </span>
capture <span class="hljs-comment">// 那个阶段执行事件句柄</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var id = zid(element), set = (handlers[id] || (handlers[id] = []))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> id = zid(element), set = (handlers[id] || (handlers[id] = []))</code></pre>
<p>获取或设置 <code>id</code> ， <code>set</code> 为事件句柄容器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="events.split(/\s/).forEach(function(event){})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">events.split(<span class="hljs-regexp">/\s/</span>).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{})</code></pre>
<p>对每个事件进行处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (event == 'ready') return $(document).ready(fn)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span> (event == <span class="hljs-string">'ready'</span>) <span class="hljs-keyword">return</span> $(<span class="hljs-built_in">document</span>).ready(fn)</code></pre>
<p>如果为 <code>ready</code> 事件，则调用 <code>ready</code> 方法，中止后续的执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var handler   = parse(event)
handler.fn    = fn
handler.sel   = selector
// emulate mouseenter, mouseleave
if (handler.e in hover) fn = function(e){
  var related = e.relatedTarget
  if (!related || (related !== this &amp;&amp; !$.contains(this, related)))
    return handler.fn.apply(this, arguments)
    }
handler.del   = delegator
var callback  = delegator || fn" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> handler   = parse(event)
handler.fn    = fn
handler.sel   = selector
<span class="hljs-comment">// emulate mouseenter, mouseleave</span>
<span class="hljs-keyword">if</span> (handler.e <span class="hljs-keyword">in</span> hover) fn = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-keyword">var</span> related = e.relatedTarget
  <span class="hljs-keyword">if</span> (!related || (related !== <span class="hljs-keyword">this</span> &amp;&amp; !$.contains(<span class="hljs-keyword">this</span>, related)))
    <span class="hljs-keyword">return</span> handler.fn.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>)
    }
handler.del   = delegator
<span class="hljs-keyword">var</span> callback  = delegator || fn</code></pre>
<p>这段代码是设置 <code>handler</code> 上的一些属性，缓存起来。</p>
<p>这里主要看对 <code>mouseenter</code> 和 <code>mouseleave</code> 事件的模拟，具体的原理上面已经说过，只有在条件成立的时候才会执行事件句柄。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handler.proxy = function(e){
  e = compatible(e)
  if (e.isImmediatePropagationStopped()) return
  e.data = data
  var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
  if (result === false) e.preventDefault(), e.stopPropagation()
  return result
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">handler.proxy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  e = compatible(e)
  <span class="hljs-keyword">if</span> (e.isImmediatePropagationStopped()) <span class="hljs-keyword">return</span>
  e.data = data
  <span class="hljs-keyword">var</span> result = callback.apply(element, e._args == <span class="hljs-literal">undefined</span> ? [e] : [e].concat(e._args))
  <span class="hljs-keyword">if</span> (result === <span class="hljs-literal">false</span>) e.preventDefault(), e.stopPropagation()
  <span class="hljs-keyword">return</span> result
}</code></pre>
<p>事件句柄的代理函数。</p>
<p><code>e</code> 为事件执行时的原生 <code>event</code> 对象，因此先调用 <code>compatible</code> 对 <code>e</code> 进行修正。</p>
<p>调用 <code>isImmediatePropagationStopped</code> 方法，看是否已经执行过 <code>stopImmediatePropagation</code> 方法，如果已经执行，则中止后续程序的执行。</p>
<p>再扩展 <code>e</code> 对象，将 <code>data</code> 存到 <code>e</code> 的 <code>data</code> 属性上。</p>
<p>执行事件句柄，将 <code>e</code> 对象作为句柄的第一个参数。</p>
<p>如果执行完毕后，显式返回 <code>false</code>，则阻止浏览器的默认行为和事件冒泡。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="set.push(handler)
if ('addEventListener' in element)
  element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">set.push(handler)
<span class="hljs-keyword">if</span> (<span class="hljs-string">'addEventListener'</span> <span class="hljs-keyword">in</span> element)
  element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))</code></pre>
<p>将句柄存入句柄容器</p>
<p>调用元素的 <code>addEventListener</code> 方法，添加事件，事件的回调函数用的是句柄的代理函数，<code>eventCapture(handler, capture)</code> 来用指定是否在捕获阶段执行。</p>
<h3 id="articleHeader15">remove，删除事件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function remove(element, events, fn, selector, capture){
  var id = zid(element)
  ;(events || '').split(/\s/).forEach(function(event){
    findHandlers(element, event, fn, selector).forEach(function(handler){
      delete handlers[id][handler.i]
      if ('removeEventListener' in element)
        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
        })
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">remove</span>(<span class="hljs-params">element, events, fn, selector, capture</span>)</span>{
  <span class="hljs-keyword">var</span> id = zid(element)
  ;(events || <span class="hljs-string">''</span>).split(<span class="hljs-regexp">/\s/</span>).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
    findHandlers(element, event, fn, selector).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">handler</span>)</span>{
      <span class="hljs-keyword">delete</span> handlers[id][handler.i]
      <span class="hljs-keyword">if</span> (<span class="hljs-string">'removeEventListener'</span> <span class="hljs-keyword">in</span> element)
        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
        })
  })
}</code></pre>
<p>首先获取指定元素的 <code>_zid</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";(events || '').split(/\s/).forEach(function(event){})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">;(events || <span class="hljs-string">''</span>).split(<span class="hljs-regexp">/\s/</span>).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{})</code></pre>
<p>遍历需要删除的 <code>events</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="findHandlers(element, event, fn, selector).forEach(function(handler){})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">findHandlers(element, event, fn, selector).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">handler</span>)</span>{})</code></pre>
<p>调用 <code>findHandlers</code> 方法，查找 <code>event</code> 下需要删除的事件句柄</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="delete handlers[id][handler.i]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">delete</span> handlers[id][handler.i]</code></pre>
<p>删除句柄容器中对应的事件，在 <code>add</code> 函数中的句柄对象中的 <code>i</code> 属性就用在这里了，方便查找需要删除的句柄。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))</code></pre>
<p>调用 <code>removeEventListener</code> 方法，删除对应的事件。</p>
<h2 id="articleHeader16">工具函数</h2>
<h3 id="articleHeader17">$.event</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.event = { add: add, remove: remove }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">$.event = { <span class="hljs-attr">add</span>: add, <span class="hljs-attr">remove</span>: remove }</code></pre>
<p>将 <code>add</code> 方法和 <code>remove</code> 方法暴露出去，应该是方便第三方插件做扩展</p>
<h3 id="articleHeader18">$.proxy</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.proxy = function(fn, context) {
  var args = (2 in arguments) &amp;&amp; slice.call(arguments, 2)
  if (isFunction(fn)) {
    var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
    proxyFn._zid = zid(fn)
    return proxyFn
  } else if (isString(context)) {
    if (args) {
      args.unshift(fn[context], fn)
      return $.proxy.apply(null, args)
    } else {
      return $.proxy(fn[context], fn)
    }
  } else {
    throw new TypeError(&quot;expected function&quot;)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.proxy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn, context</span>) </span>{
  <span class="hljs-keyword">var</span> args = (<span class="hljs-number">2</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">arguments</span>) &amp;&amp; slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">2</span>)
  <span class="hljs-keyword">if</span> (isFunction(fn)) {
    <span class="hljs-keyword">var</span> proxyFn = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> fn.apply(context, args ? args.concat(slice.call(<span class="hljs-built_in">arguments</span>)) : <span class="hljs-built_in">arguments</span>) }
    proxyFn._zid = zid(fn)
    <span class="hljs-keyword">return</span> proxyFn
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isString(context)) {
    <span class="hljs-keyword">if</span> (args) {
      args.unshift(fn[context], fn)
      <span class="hljs-keyword">return</span> $.proxy.apply(<span class="hljs-literal">null</span>, args)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> $.proxy(fn[context], fn)
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">"expected function"</span>)
  }
}</code></pre>
<p>代理函数，作用有点像 JS 中的 <code>bind</code> 方法，返回的是一个代理后改变执行上下文的函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var args = (2 in arguments) &amp;&amp; slice.call(arguments, 2)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> args = (<span class="hljs-number">2</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">arguments</span>) &amp;&amp; slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">2</span>)</code></pre>
<p>如果提供超过3个参数，则去除前两个参数，将后面的参数作为执行函数 <code>fn</code> 的参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (isFunction(fn)) {
  var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
  proxyFn._zid = zid(fn)
  return proxyFn
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (isFunction(fn)) {
  <span class="hljs-keyword">var</span> proxyFn = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> fn.apply(context, args ? args.concat(slice.call(<span class="hljs-built_in">arguments</span>)) : <span class="hljs-built_in">arguments</span>) }
  proxyFn._zid = zid(fn)
  <span class="hljs-keyword">return</span> proxyFn
}</code></pre>
<p><code>proxy</code> 的执行函数有两种传递方式，一是在第一个参数直接传入，二是第一个参数为上下文对象，执行函数也在上下文对象中一起传入。</p>
<p>这里判断 <code>fn</code> 是否为函数，即第一种传参方式，调用 <code>fn</code> 函数的 <code>apply</code> 方法，将上下文对象 <code>context</code> 作为 <code>apply</code> 的第一个参数，如果 <code>args</code> 存在，则与 <code>fn</code> 的参数合并。</p>
<p>给代理后的函数加上 <code>_zid</code> 属性，方便函数的查找。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="else if (isString(context)) {
  if (args) {
    args.unshift(fn[context], fn)
    return $.proxy.apply(null, args)
  } else {
    return $.proxy(fn[context], fn)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isString(context)) {
  <span class="hljs-keyword">if</span> (args) {
    args.unshift(fn[context], fn)
    <span class="hljs-keyword">return</span> $.proxy.apply(<span class="hljs-literal">null</span>, args)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> $.proxy(fn[context], fn)
  }</code></pre>
<p>如果函数已经包含在上下文对象中，即第一个参数 <code>fn</code> 为对象，第二个参数 <code>context</code> 为字符串，用来指定执行函数的在上下文对象中的属性名。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (args) {
  args.unshift(fn[context], fn)
  return $.proxy.apply(null, args)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (args) {
  args.unshift(fn[context], fn)
  <span class="hljs-keyword">return</span> $.proxy.apply(<span class="hljs-literal">null</span>, args)
}</code></pre>
<p>如果参数存在时，将 <code>fn[context]</code> ，也即执行函数和 <code>fn</code> ，也即上下文对象放入 <code>args</code> 数组的开头，这样就将参数修正成跟第一种传参方式一样，再调用 <code>$.proxy</code> 函数。这里调用 <code>apply</code> 方法，是因为不知道参数有多少个，调用 <code>apply</code> 可以以数组的形式传入。</p>
<p>如果 <code>args</code> 不存在时，确定的参数项只有两个，因此可以直接调用 <code>$.proxy</code> 方法。</p>
<h3 id="articleHeader19">$.Event</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="specialEvents={},
specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

$.Event = function(type, props) {
  if (!isString(type)) props = type, type = props.type
  var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
  if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
  event.initEvent(type, bubbles, true)
  return compatible(event)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">specialEvents={},
specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = <span class="hljs-string">'MouseEvents'</span>

$.Event = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type, props</span>) </span>{
  <span class="hljs-keyword">if</span> (!isString(type)) props = type, type = props.type
  <span class="hljs-keyword">var</span> event = <span class="hljs-built_in">document</span>.createEvent(specialEvents[type] || <span class="hljs-string">'Events'</span>), bubbles = <span class="hljs-literal">true</span>
  <span class="hljs-keyword">if</span> (props) <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> name <span class="hljs-keyword">in</span> props) (name == <span class="hljs-string">'bubbles'</span>) ? (bubbles = !!props[name]) : (event[name] = props[name])
  event.initEvent(type, bubbles, <span class="hljs-literal">true</span>)
  <span class="hljs-keyword">return</span> compatible(event)
}</code></pre>
<p><code>specialEvents</code> 是将鼠标事件修正为 <code>MouseEvents</code> ，这应该是处理浏览器的兼容问题，可能有些浏览器中，这些事件的事件类型并不是 <code>MouseEvents</code> 。</p>
<p><code>$.Event</code> 方法用来手动创建特定类型的事件。</p>
<p>参数 <code>type</code> 可以为字符串，也可以为 <code>event</code> 对象。<code>props</code> 为扩展 <code>event</code> 对象的对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!isString(type)) props = type, type = props.type" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span> (!isString(type)) props = type, type = props.type</code></pre>
<p>如果不是字符串，也即是 <code>event</code> 对象时，将 <code>type</code> 赋给 <code>props</code> ，<code>type</code> 为当前 <code>event</code> 对象中的 <code>type</code> 属性值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> event = <span class="hljs-built_in">document</span>.createEvent(specialEvents[type] || <span class="hljs-string">'Events'</span>), bubbles = <span class="hljs-literal">true</span></code></pre>
<p>调用 <code>createEvent</code> 方法，创建对应类型的 <code>event</code> 事件，并将事件冒泡默认设置为 <code>true</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span> (props) <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> name <span class="hljs-keyword">in</span> props) (name == <span class="hljs-string">'bubbles'</span>) ? (bubbles = !!props[name]) : (event[name] = props[name])</code></pre>
<p>遍历 <code>props</code> 属性，如果有指定 <code>bubbles</code> ，则采用指定的冒泡行为，其他属性复制到 <code>event</code> 对象上，实现对 <code>event</code> 对象的扩展。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event.initEvent(type, bubbles, true)
return compatible(event)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">event.initEvent(type, bubbles, <span class="hljs-literal">true</span>)
<span class="hljs-keyword">return</span> compatible(event)</code></pre>
<p>初始化新创建的事件，并将修正后的事件对象返回。</p>
<h2 id="articleHeader20">方法</h2>
<h3 id="articleHeader21">.on()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fn.on = function(event, selector, data, callback, one){
  var autoRemove, delegator, $this = this
  if (event &amp;&amp; !isString(event)) {
    $.each(event, function(type, fn){
      $this.on(type, selector, data, fn, one)
    })
    return $this
  }

  if (!isString(selector) &amp;&amp; !isFunction(callback) &amp;&amp; callback !== false)
    callback = data, data = selector, selector = undefined
    if (callback === undefined || data === false)
      callback = data, data = undefined

      if (callback === false) callback = returnFalse

      return $this.each(function(_, element){
        if (one) autoRemove = function(e){
          remove(element, e.type, callback)
          return callback.apply(this, arguments)
        }

        if (selector) delegator = function(e){
          var evt, match = $(e.target).closest(selector, element).get(0)
          if (match &amp;&amp; match !== element) {
            evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
            return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
          }
        }

        add(element, event, callback, data, selector, delegator || autoRemove)
      })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.fn.on = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event, selector, data, callback, one</span>)</span>{
  <span class="hljs-keyword">var</span> autoRemove, delegator, $<span class="hljs-keyword">this</span> = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">if</span> (event &amp;&amp; !isString(event)) {
    $.each(event, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type, fn</span>)</span>{
      $<span class="hljs-keyword">this</span>.on(type, selector, data, fn, one)
    })
    <span class="hljs-keyword">return</span> $<span class="hljs-keyword">this</span>
  }

  <span class="hljs-keyword">if</span> (!isString(selector) &amp;&amp; !isFunction(callback) &amp;&amp; callback !== <span class="hljs-literal">false</span>)
    callback = data, data = selector, selector = <span class="hljs-literal">undefined</span>
    <span class="hljs-keyword">if</span> (callback === <span class="hljs-literal">undefined</span> || data === <span class="hljs-literal">false</span>)
      callback = data, data = <span class="hljs-literal">undefined</span>

      <span class="hljs-keyword">if</span> (callback === <span class="hljs-literal">false</span>) callback = returnFalse

      <span class="hljs-keyword">return</span> $<span class="hljs-keyword">this</span>.each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">_, element</span>)</span>{
        <span class="hljs-keyword">if</span> (one) autoRemove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
          remove(element, e.type, callback)
          <span class="hljs-keyword">return</span> callback.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>)
        }

        <span class="hljs-keyword">if</span> (selector) delegator = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
          <span class="hljs-keyword">var</span> evt, match = $(e.target).closest(selector, element).get(<span class="hljs-number">0</span>)
          <span class="hljs-keyword">if</span> (match &amp;&amp; match !== element) {
            evt = $.extend(createProxy(e), {<span class="hljs-attr">currentTarget</span>: match, <span class="hljs-attr">liveFired</span>: element})
            <span class="hljs-keyword">return</span> (autoRemove || callback).apply(match, [evt].concat(slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>)))
          }
        }

        add(element, event, callback, data, selector, delegator || autoRemove)
      })
}</code></pre>
<p><code>on</code> 方法来用给元素绑定事件，最终调用的是 <code>add</code> 方法，前面的一大段逻辑主要是修正参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var autoRemove, delegator, $this = this
if (event &amp;&amp; !isString(event)) {
  $.each(event, function(type, fn){
    $this.on(type, selector, data, fn, one)
  })
  return $this
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> autoRemove, delegator, $<span class="hljs-keyword">this</span> = <span class="hljs-keyword">this</span>
<span class="hljs-keyword">if</span> (event &amp;&amp; !isString(event)) {
  $.each(event, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type, fn</span>)</span>{
    $<span class="hljs-keyword">this</span>.on(type, selector, data, fn, one)
  })
  <span class="hljs-keyword">return</span> $<span class="hljs-keyword">this</span>
}</code></pre>
<p><code>autoRemove</code> 表示在执行完事件响应后，自动解绑的函数。</p>
<p><code>event</code> 可以为字符串或者对象，当为对象时，对象的属性为事件类型，属性值为句柄。</p>
<p>这段是处理 <code>event</code> 为对象时的情况，遍历对象，得到事件类型和句柄，然后再次调用 <code>on</code> 方法，继续修正后续的参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!isString(selector) &amp;&amp; !isFunction(callback) &amp;&amp; callback !== false)
  callback = data, data = selector, selector = undefined
if (callback === undefined || data === false)
  callback = data, data = undefined

if (callback === false) callback = returnFalse" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (!isString(selector) &amp;&amp; !isFunction(callback) &amp;&amp; callback !== <span class="hljs-literal">false</span>)
  callback = data, data = selector, selector = <span class="hljs-literal">undefined</span>
<span class="hljs-keyword">if</span> (callback === <span class="hljs-literal">undefined</span> || data === <span class="hljs-literal">false</span>)
  callback = data, data = <span class="hljs-literal">undefined</span>

<span class="hljs-keyword">if</span> (callback === <span class="hljs-literal">false</span>) callback = returnFalse</code></pre>
<p>先来分析第一个 <code>if</code> ，<code>selector</code> 不为 <code>string</code> ，<code>callback</code> 不为函数，并且 <code>callback</code> 不为 <code>false</code> 时的情况。</p>
<p>这里可以确定 <code>selector</code> 并没有传递，因为 <code>selector</code> 不是必传的参数。</p>
<p>因此这里将 <code>data</code> 赋给 <code>callback</code>，<code>selector</code>  赋给 <code>data</code> ，将 <code>selector</code> 设置为 <code>undefined</code> ，因为 <code>selector</code> 没有传递，因此相应参数的位置都前移了一位。</p>
<p>再来看第二个 <code>if</code> ，如果 <code>callback</code>（ 原来的 <code>data</code> ） 为 <code>undefined</code> ， <code>data</code> 为 <code>false</code> 时，表示 <code>selector</code> 没有传递，并且 <code>data</code> 也没有传递，因此将 <code>data</code> 赋给 <code>callback</code> ，将 <code>data</code> 设置为 <code>undefined</code> ，即将参数再前移一位。</p>
<p>第三个 <code>if</code> ，如果 <code>callback === false</code> ，用 <code>returnFalse</code> 函数代替，如果不用 <code>returnFalse</code> 代替，会报错。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return $this.each(function(_, element){
  add(element, event, callback, data, selector, delegator || autoRemove)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">return</span> $<span class="hljs-keyword">this</span>.each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">_, element</span>)</span>{
  add(element, event, callback, data, selector, delegator || autoRemove)
})</code></pre>
<p>可以看到，这里是遍历元素集合，为每个元素都调用 <code>add</code> 方法，绑定事件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (one) autoRemove = function(e){
  remove(element, e.type, callback)
  return callback.apply(this, arguments)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (one) autoRemove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  remove(element, e.type, callback)
  <span class="hljs-keyword">return</span> callback.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>)
}</code></pre>
<p>如果只调用一次，设置 <code>autoRemove</code> 为一个函数，这个函数在句柄执行前，调用 <code>remove</code> 方法，将绑定在元素上对应事件解绑。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (selector) delegator = function(e){
  var evt, match = $(e.target).closest(selector, element).get(0)
  if (match &amp;&amp; match !== element) {
    evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
    return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (selector) delegator = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-keyword">var</span> evt, match = $(e.target).closest(selector, element).get(<span class="hljs-number">0</span>)
  <span class="hljs-keyword">if</span> (match &amp;&amp; match !== element) {
    evt = $.extend(createProxy(e), {<span class="hljs-attr">currentTarget</span>: match, <span class="hljs-attr">liveFired</span>: element})
    <span class="hljs-keyword">return</span> (autoRemove || callback).apply(match, [evt].concat(slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>)))
  }
}</code></pre>
<p>如果 <code>selector</code> 存在，表示需要做事件代理。</p>
<p>调用 <code>closest</code> 方法，从事件的目标元素 <code>e.target</code> 开始向上查找，返回第一个匹配 <code>selector</code> 的元素。关于 <code>closest</code> 方法，见《<a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E9%9B%86%E5%90%88%E5%85%83%E7%B4%A0%E6%9F%A5%E6%89%BE.md#closest" rel="nofollow noreferrer" target="_blank">读Zepto源码之集合元素查找</a>》分析。</p>
<p>如果 <code>match</code> 存在，并且 <code>match</code> 不为当前元素，则调用 <code>createProxy</code> 方法，为当前事件对象创建代理对象，再调用 <code>$.extend</code> 方法，为代理对象扩展 <code>currentTarget</code> 和 <code>liveFired</code> 属性，将代理元素和触发事件的元素保存到事件对象中。</p>
<p>最后执行句柄函数，以代理元素 <code>match</code> 作为句柄的上下文，用代理后的 <code>event</code> 对象 <code>evt</code> 替换掉原句柄函数的第一个参数。</p>
<p>将该函数赋给 <code>delegator</code> ，作为代理函数传递给 <code>add</code> 方法。</p>
<h3 id="articleHeader22">.off()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fn.off = function(event, selector, callback){
  var $this = this
  if (event &amp;&amp; !isString(event)) {
    $.each(event, function(type, fn){
      $this.off(type, selector, fn)
    })
    return $this
  }

  if (!isString(selector) &amp;&amp; !isFunction(callback) &amp;&amp; callback !== false)
    callback = selector, selector = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(){
      remove(this, event, callback, selector)
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.fn.off = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event, selector, callback</span>)</span>{
  <span class="hljs-keyword">var</span> $<span class="hljs-keyword">this</span> = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">if</span> (event &amp;&amp; !isString(event)) {
    $.each(event, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type, fn</span>)</span>{
      $<span class="hljs-keyword">this</span>.off(type, selector, fn)
    })
    <span class="hljs-keyword">return</span> $<span class="hljs-keyword">this</span>
  }

  <span class="hljs-keyword">if</span> (!isString(selector) &amp;&amp; !isFunction(callback) &amp;&amp; callback !== <span class="hljs-literal">false</span>)
    callback = selector, selector = <span class="hljs-literal">undefined</span>

    <span class="hljs-keyword">if</span> (callback === <span class="hljs-literal">false</span>) callback = returnFalse

    <span class="hljs-keyword">return</span> $<span class="hljs-keyword">this</span>.each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      remove(<span class="hljs-keyword">this</span>, event, callback, selector)
    })
}</code></pre>
<p>解绑事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (event &amp;&amp; !isString(event)) {
  $.each(event, function(type, fn){
    $this.off(type, selector, fn)
  })
  return $this
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (event &amp;&amp; !isString(event)) {
  $.each(event, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type, fn</span>)</span>{
    $<span class="hljs-keyword">this</span>.off(type, selector, fn)
  })
  <span class="hljs-keyword">return</span> $<span class="hljs-keyword">this</span>
}</code></pre>
<p>这段逻辑与 <code>on</code> 方法中的相似，修正参数，不再细说。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!isString(selector) &amp;&amp; !isFunction(callback) &amp;&amp; callback !== false)
  callback = selector, selector = undefined
if (callback === false) callback = returnFalse" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (!isString(selector) &amp;&amp; !isFunction(callback) &amp;&amp; callback !== <span class="hljs-literal">false</span>)
  callback = selector, selector = <span class="hljs-literal">undefined</span>
<span class="hljs-keyword">if</span> (callback === <span class="hljs-literal">false</span>) callback = returnFalse</code></pre>
<p>第一个 <code>if</code> 是处理 <code>selector</code> 参数没有传递的情况的， <code>selector</code> 位置传递的其实是 <code>callback</code> 。</p>
<p>第二个 <code>if</code> 是判断如果 <code>callback</code> 为 <code>false</code> ，将 <code>callback</code> 赋值为 <code>returnFalse</code> 函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return $this.each(function(){
  remove(this, event, callback, selector)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">return</span> $<span class="hljs-keyword">this</span>.each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  remove(<span class="hljs-keyword">this</span>, event, callback, selector)
})</code></pre>
<p>最后遍历所有元素，调用 <code>remove</code> 函数，为每个元素解绑事件。</p>
<h3 id="articleHeader23">.bind()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fn.bind = function(event, data, callback){
  return this.on(event, data, callback)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.fn.bind = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event, data, callback</span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.on(event, data, callback)
}</code></pre>
<p><code>bind</code> 方法内部调用的其实是 <code>on</code> 方法。</p>
<h3 id="articleHeader24">.unbind()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fn.unbind = function(event, callback){
  return this.off(event, callback)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.fn.unbind = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event, callback</span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.off(event, callback)
}</code></pre>
<p><code>unbind</code> 方法内部调用的是 <code>off</code> 方法。</p>
<h3 id="articleHeader25">.one()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fn.one = function(event, selector, data, callback){
  return this.on(event, selector, data, callback, 1)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.fn.one = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event, selector, data, callback</span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.on(event, selector, data, callback, <span class="hljs-number">1</span>)
}</code></pre>
<p><code>one</code> 方法内部调用的也是 <code>on</code> 方法，只不过默认传递了 <code>one</code> 参数为 <code>1</code> ，表示绑定的事件只执行一下。</p>
<h3 id="articleHeader26">.delegate()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fn.delegate = function(selector, event, callback){
  return this.on(event, selector, callback)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.fn.delegate = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">selector, event, callback</span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.on(event, selector, callback)
}</code></pre>
<p>事件委托，也是调用 <code>on</code> 方法，只是 <code>selector</code> 一定要传递。</p>
<h3 id="articleHeader27">.undelegate()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fn.undelegate = function(selector, event, callback){
  return this.off(event, selector, callback)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.fn.undelegate = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">selector, event, callback</span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.off(event, selector, callback)
}</code></pre>
<p>取消事件委托，内部调用的是 <code>off</code> 方法，<code>selector</code> 必须要传递。</p>
<h3 id="articleHeader28">.live()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fn.live = function(event, callback){
  $(document.body).delegate(this.selector, event, callback)
  return this
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.fn.live = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event, callback</span>)</span>{
  $(<span class="hljs-built_in">document</span>.body).delegate(<span class="hljs-keyword">this</span>.selector, event, callback)
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
}</code></pre>
<p>动态创建的节点也可以响应事件。其实事件绑定在 <code>body</code> 上，然后委托到当前节点上。内部调用的是 <code>delegate</code> 方法。</p>
<h3 id="articleHeader29">.die()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fn.die = function(event, callback){
  $(document.body).undelegate(this.selector, event, callback)
  return this
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.fn.die = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event, callback</span>)</span>{
  $(<span class="hljs-built_in">document</span>.body).undelegate(<span class="hljs-keyword">this</span>.selector, event, callback)
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
}</code></pre>
<p>将由 <code>live</code> 绑定在 <code>body</code> 上的事件销毁，内部调用的是 <code>undelegate</code> 方法。</p>
<h3 id="articleHeader30">.triggerHandler()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fn.triggerHandler = function(event, args){
  var e, result
  this.each(function(i, element){
    e = createProxy(isString(event) ? $.Event(event) : event)
    e._args = args
    e.target = element
    $.each(findHandlers(element, event.type || event), function(i, handler){
      result = handler.proxy(e)
      if (e.isImmediatePropagationStopped()) return false
        })
  })
  return result
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.fn.triggerHandler = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event, args</span>)</span>{
  <span class="hljs-keyword">var</span> e, result
  <span class="hljs-keyword">this</span>.each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i, element</span>)</span>{
    e = createProxy(isString(event) ? $.Event(event) : event)
    e._args = args
    e.target = element
    $.each(findHandlers(element, event.type || event), <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i, handler</span>)</span>{
      result = handler.proxy(e)
      <span class="hljs-keyword">if</span> (e.isImmediatePropagationStopped()) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
        })
  })
  <span class="hljs-keyword">return</span> result
}</code></pre>
<p>直接触发事件回调函数。</p>
<p>参数 <code>event</code> 可以为事件类型字符串，也可以为 <code>event</code> 对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="e = createProxy(isString(event) ? $.Event(event) : event)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">e = createProxy(isString(event) ? $.Event(event) : event)</code></pre>
<p>如果 <code>event</code> 为字符串时，则调用 <code>$.Event</code> 工具函数来初始化一个事件对象，再调用 <code>createProxy</code> 来创建一个 <code>event</code> 代理对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.each(findHandlers(element, event.type || event), function(i, handler){
  result = handler.proxy(e)
  if (e.isImmediatePropagationStopped()) return false
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.each(findHandlers(element, event.type || event), <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i, handler</span>)</span>{
  result = handler.proxy(e)
  <span class="hljs-keyword">if</span> (e.isImmediatePropagationStopped()) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    })</code></pre>
<p>调用 <code>findHandlers</code> 方法来找出事件的所有句柄，调用 <code>proxy</code> 方法，即真正绑定到事件上的回调函数（参见 <code>add</code> 的解释），拿到方法返回的结果 <code>result</code> ，并查看 <code>isImmediatePropagationStopped</code> 返回的结果是否为 <code>true</code> ，如果是，立刻中止后续执行。</p>
<p>如果返回的结果 <code>result</code> 为 <code>false</code> ，也立刻中止后续执行。</p>
<p>由于 <code>triggerHandler</code> 直接触发回调函数，所以事件不会冒泡。</p>
<h3 id="articleHeader31">.trigger()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fn.trigger = function(event, args){
  event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
  event._args = args
  return this.each(function(){
    // handle focus(), blur() by calling them directly
    if (event.type in focus &amp;&amp; typeof this[event.type] == &quot;function&quot;) this[event.type]()
    // items in the collection might not be DOM elements
    else if ('dispatchEvent' in this) this.dispatchEvent(event)
    else $(this).triggerHandler(event, args)
      })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.fn.trigger = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event, args</span>)</span>{
  event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
  event._args = args
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// handle focus(), blur() by calling them directly</span>
    <span class="hljs-keyword">if</span> (event.type <span class="hljs-keyword">in</span> focus &amp;&amp; <span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span>[event.type] == <span class="hljs-string">"function"</span>) <span class="hljs-keyword">this</span>[event.type]()
    <span class="hljs-comment">// items in the collection might not be DOM elements</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-string">'dispatchEvent'</span> <span class="hljs-keyword">in</span> <span class="hljs-keyword">this</span>) <span class="hljs-keyword">this</span>.dispatchEvent(event)
    <span class="hljs-keyword">else</span> $(<span class="hljs-keyword">this</span>).triggerHandler(event, args)
      })
}</code></pre>
<p>手动触发事件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)</code></pre>
<p><code>event</code> 可以传递事件类型，对象和 <code>event</code> 对象。</p>
<p>如果传递的是字符串或者纯粹对象，则先调用 <code>$.Event</code> 方法来初始化事件，否则调用 <code>compatible</code> 方法来修正 <code>event</code> 对象，由于 <code>$.Event</code> 方法在内部其实已经调用过 <code>compatible</code> 方法修正 <code>event</code> 对象了的，所以外部不需要再调用一次。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (event.type in focus &amp;&amp; typeof this[event.type] == &quot;function&quot;) this[event.type]()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span> (event.type <span class="hljs-keyword">in</span> focus &amp;&amp; <span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span>[event.type] == <span class="hljs-string">"function"</span>) <span class="hljs-keyword">this</span>[event.type]()</code></pre>
<p>如果是 <code>focus/blur</code> 方法，则直接调用 <code>this.focus()</code>  或 <code>this.blur()</code> 方法，这两个方法是浏览器原生支持的。</p>
<p>如果 <code>this</code> 为 <code>DOM</code> 元素，即存在 <code>dispatchEvent</code> 方法，则用 <code>dispatchEvent</code> 来触发事件，关于 <code>dispatchEvent</code> ，可以参考 <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent" rel="nofollow noreferrer" target="_blank">MDN: EventTarget.dispatchEvent()</a>。</p>
<p>否则，直接调用 <code>triggerHandler</code> 方法来触发事件的回调函数。</p>
<p>由于 <code>trigger</code> 是通过触发事件来执行事件句柄的，因此事件会冒泡。</p>
<h2 id="articleHeader32">系列文章</h2>
<ol>
<li><p><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E4%BB%A3%E7%A0%81%E7%BB%93%E6%9E%84.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之代码结构</a></p></li>
<li><p><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E5%86%85%E9%83%A8%E6%96%B9%E6%B3%95.md" rel="nofollow noreferrer" target="_blank">读 Zepto 源码之内部方法</a></p></li>
<li><p><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/a4d6ad99c57047beae2b652b4d2cbb380599a524/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E5%B7%A5%E5%85%B7%E5%87%BD%E6%95%B0.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之工具函数</a></p></li>
<li><p><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E7%A5%9E%E5%A5%87%E7%9A%84%24.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之神奇的$</a></p></li>
<li><p><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E9%9B%86%E5%90%88%E6%93%8D%E4%BD%9C.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之集合操作</a></p></li>
<li><p><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E9%9B%86%E5%90%88%E5%85%83%E7%B4%A0%E6%9F%A5%E6%89%BE.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之集合元素查找</a></p></li>
<li><p><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E6%93%8D%E4%BD%9CDOM.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之操作DOM</a></p></li>
<li><p><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E6%A0%B7%E5%BC%8F%E6%93%8D%E4%BD%9C.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之样式操作</a></p></li>
<li><p><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E5%B1%9E%E6%80%A7%E6%93%8D%E4%BD%9C.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之属性操作</a></p></li>
</ol>
<h2 id="articleHeader33">参考</h2>
<ul>
<li><p><a href="https://juejin.im/post/5935773fa0bb9f0058edbd61" rel="nofollow noreferrer" target="_blank">mouseenter与mouseover为何这般纠缠不清？</a></p></li>
<li><p><a href="https://juejin.im/post/5936f13b2f301e0058796482" rel="nofollow noreferrer" target="_blank">向zepto.js学习如何手动(trigger)触发DOM事件</a></p></li>
<li><p><a href="https://juejin.im/post/5939956b5c497d006b690fee" rel="nofollow noreferrer" target="_blank">谁说你只是 "会用"jQuery?</a></p></li>
<li><p><a href="http://www.cnblogs.com/mominger/p/4384692.html" rel="nofollow noreferrer" target="_blank">Zepto源码分析-event模块</a></p></li>
<li><p><a href="http://blog.csdn.net/u013055396/article/details/74907136" rel="nofollow noreferrer" target="_blank">zepto源码之event.js</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000003942014">说说focus /focusin /focusout /blur 事件</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/Events/mouseenter" rel="nofollow noreferrer" target="_blank">MDN:mouseenter</a></p></li>
<li><p><a>MDN:mouseleave</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget" rel="nofollow noreferrer" target="_blank">MDN:MouseEvent.relatedTarget</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/Events" rel="nofollow noreferrer" target="_blank">MDN:Event reference</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/createEvent" rel="nofollow noreferrer" target="_blank">MDN:Document.createEvent()</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent" rel="nofollow noreferrer" target="_blank">MDN:EventTarget.dispatchEvent()</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopImmediatePropagation" rel="nofollow noreferrer" target="_blank">MDN:event.stopImmediatePropagation</a></p></li>
</ul>
<h2 id="articleHeader34">License</h2>
<p><a href="http://creativecommons.org/licenses/by-nc-nd/4.0/" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000009502046" src="https://static.alili.tech/img/remote/1460000009502046" alt="License: CC BY-NC-ND 4.0" title="License: CC BY-NC-ND 4.0" style="cursor: pointer;"></span></a></p>
<p>最后，所有文章都会同步发送到微信公众号上，欢迎关注,欢迎提意见：  <span class="img-wrap"><img data-src="/img/remote/1460000009735938?w=430&amp;h=430" src="https://static.alili.tech/img/remote/1460000009735938?w=430&amp;h=430" alt="" title="" style="cursor: pointer;"></span></p>
<p>作者：对角另一面</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
读Zepto源码之Event模块

## 原文链接
[https://segmentfault.com/a/1190000010228427](https://segmentfault.com/a/1190000010228427)

