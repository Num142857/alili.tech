---
title: '[译] addEventListener 与 onclick，孰优孰劣？' 
date: 2019-02-09 2:30:59
hidden: true
slug: f3sf49e1i39
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>原文出处：<a href="http://stackoverflow.com/questions/6348494/addeventlistener-vs-onclick" rel="nofollow noreferrer" target="_blank">addEventListener vs onclick</a>
</blockquote>
<p>之所以会想到这个话题，是因为在回顾自己之前写的为 button 动态绑定事件的函数时，脑海里忽然浮现出了一个问题：<code>addEventListener</code> 方法，与 <code>onclick=""</code> 相比，各有哪些优点和缺点呢？于是用关键字“StackOverflow addEventListener click func false”进行搜索，第二个结果就是上面的文章链接，现将全文摘要如下：</p>
<hr>
<p>绑定事件有几种方式：</p>
<h2 id="articleHeader0">Event Listeners</h2>
<p>(<code>addEventListener</code> 以及 IE 的 <code>attachEvent</code>)</p>
<ul>
<li>
<p>IE 8 以及更低版本的 IE 中，需要用 <a href="http://msdn.microsoft.com/en-us/library/ie/ms536343%28v=vs.85%29.aspx" rel="nofollow noreferrer" target="_blank">attachEvent</a> 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="element.attachEvent('onclick', function() { /* do stuff here*/ });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;">element.attachEvent(<span class="hljs-string">'onclick'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">/* do stuff here*/</span> });</code></pre>
</li>
<li>
<p>对于 IE 9 和更高版本的 IE，以及其它浏览器，则要用 <a href="https://developer.mozilla.org/en-US/docs/DOM/element.addEventListener" rel="nofollow noreferrer" target="_blank">addEventListener</a> 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="element.addEventListener('click', function() { /* do stuff here*/ }, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;">element.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">/* do stuff here*/</span> }, <span class="hljs-literal">false</span>);</code></pre>
</li>
</ul>
<p>用上面这种方法（<a href="http://www.w3.org/wiki/Handling_events_with_JavaScript#The_evolution_of_events" rel="nofollow noreferrer" target="_blank">DOM level 2 events</a>），理论上可以为一个元素绑定无数个事件，实际应用中则决定于客户端的电脑内存以及浏览器。</p>
<p>上面的例子应用了<a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Functions_and_function_scope" rel="nofollow noreferrer" target="_blank">匿名函数</a>这个特性，还可以使用<a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function" rel="nofollow noreferrer" target="_blank">构造函数</a>或者<a href="https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Closures" rel="nofollow noreferrer" target="_blank">闭包</a>来添加事件监听器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var myFunctionReference = function() { /* do stuff here*/ }

element.attachEvent('onclick', myFunctionReference);
element.addEventListener('click', myFunctionReference , false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> myFunctionReference = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">/* do stuff here*/</span> }

element.attachEvent(<span class="hljs-string">'onclick'</span>, myFunctionReference);
element.addEventListener(<span class="hljs-string">'click'</span>, myFunctionReference , <span class="hljs-literal">false</span>);</code></pre>
<p>另一个重要特性，则是上面这段代码中最后一行的最后一个参数，用来控制监听器<a href="http://www.w3.org/TR/DOM-Level-3-Events/#event-flow" rel="nofollow noreferrer" target="_blank">对于冒泡事件的响应</a>。95%的使用场景中，这个参数都为 <code>false</code>，<code>attachEvent</code> 以及内联事件则都没有可以实现相同功能的这个参数。</p>
<h2 id="articleHeader1">Inline Events 内联事件</h2>
<p>(HTML 的 <code>onclick=""</code> 属性，以及 <code>element.onclick</code>)</p>
<p>在所有支持 JavaScript 的浏览器中，可以用下面的方式来添加内联的事件监听器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a id=&quot;testing&quot; href=&quot;#&quot; onclick=&quot;alert('did stuff inline');&quot;>Click me</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"testing"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"alert('did stuff inline');"</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p>虽然很多有经验的开发人员对这种方式嗤之以鼻，但是它的确足够的简单粗暴。在这里你不能使用闭包或者匿名函数，并且控制域也是有限的。</p>
<p>还有另一种方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="element.onclick = function () { /*do stuff here */ };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;">element.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">/*do stuff here */</span> };</code></pre>
<p>这个方法能实现相同的效果，并且有更多的控制域（因为是 JS 脚本，而不是 HTML 代码），当然了，也能使用匿名函数、构造函数、闭包。</p>
<p>内联事件一个明显的不足：由于内联事件是<a href="http://www.w3.org/wiki/HTML/Attributes/_Global#Event-handler_Attributes" rel="nofollow noreferrer" target="_blank">作为元素属性保存起来</a>的，这些属性可以被覆盖，所以如果为同一个事件绑定了多个处理程序，那么最后一个处理程序会覆盖之前的程序（多谢 @谦龙 指出此处的翻译错误）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var element = document.getElementById('testing');
element.onclick = function () { alert('did stuff #1'); };
element.onclick = function () { alert('did stuff #2'); };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> element = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'testing'</span>);
element.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ alert(<span class="hljs-string">'did stuff #1'</span>); };
element.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ alert(<span class="hljs-string">'did stuff #2'</span>); };</code></pre>
<p>运行上面的示例，将只会看到“did stuff #2”——第二行代码覆盖了默认的内联 <code>onclick</code> 属性，第三行代码又将第二行代码覆盖了，所以会产生这样的结果。</p>
<h2 id="articleHeader2">谁是最佳方案？</h2>
<p>要回答这个问题，就要考虑各个浏览器的兼容性，以及实际需求了。即使现在只需要为一个元素绑定一个事件，但是以后很可能还要同时再绑定别的事件，这个时候，就需要用 <code>attachEvent</code> 和 <code>addEventListener</code> 了，否则用内联方法就可以搞定了。</p>
<p>jQuery 以及其它的 JavaScript 框架，已经将各个浏览器的 <code>DOM level 2 events</code> 的实现以通用模型的形式封装起来了，所以通过 jQuery 可以很方便地写出适用于所有浏览器的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(element).on('click', function () { /* do stuff */ });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;">$(element).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">/* do stuff */</span> });</code></pre>
<p>在解决问题的时候，不要简单地就事论事，比如这篇文章讨论的就是如何添加事件监听器，那就不妨写一个适用于所有浏览器的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function addEvent(element, evnt, funct){
  // if else 结构可用三元运算符 ? : 来精简
  // 这里之所以要这样写，是便于读者理解
  if (element.attachEvent) // IE 8 及更低版本浏览器
   return element.attachEvent('on'+evnt, funct);
  else // IE 8 及以上，或其它浏览器
   return element.addEventListener(evnt, funct, false);
}

// 调用示例
addEvent(
    document.getElementById('myElement'),
    'click',
    function () { alert('hi!'); }
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addEvent</span>(<span class="hljs-params">element, evnt, funct</span>)</span>{
  <span class="hljs-comment">// if else 结构可用三元运算符 ? : 来精简</span>
  <span class="hljs-comment">// 这里之所以要这样写，是便于读者理解</span>
  <span class="hljs-keyword">if</span> (element.attachEvent) <span class="hljs-comment">// IE 8 及更低版本浏览器</span>
   <span class="hljs-keyword">return</span> element.attachEvent(<span class="hljs-string">'on'</span>+evnt, funct);
  <span class="hljs-keyword">else</span> <span class="hljs-comment">// IE 8 及以上，或其它浏览器</span>
   <span class="hljs-keyword">return</span> element.addEventListener(evnt, funct, <span class="hljs-literal">false</span>);
}

<span class="hljs-comment">// 调用示例</span>
addEvent(
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myElement'</span>),
    <span class="hljs-string">'click'</span>,
    <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ alert(<span class="hljs-string">'hi!'</span>); }
);</code></pre>
<h2 id="articleHeader3">相关文献</h2>
<ul>
<li><a href="http://www.w3.org/wiki/HTML/Attributes/_Global#Event-handler_Attributes" rel="nofollow noreferrer" target="_blank">W3 HTML specification, element Event Handler Attributes</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/DOM/element.addEventListener" rel="nofollow noreferrer" target="_blank">element.addEventListener on MDN</a></li>
<li><a href="http://msdn.microsoft.com/en-us/library/ie/ms536343%28v=vs.85%29.aspx" rel="nofollow noreferrer" target="_blank">element.attachEvent on MSDN</a></li>
<li><a href="http://api.jquery.com/on/" rel="nofollow noreferrer" target="_blank">Jquery.on</a></li>
<li><a href="http://www.quirksmode.org/js/introevents.html" rel="nofollow noreferrer" target="_blank">quirksmode blog "Introduction to Events"</a></li>
<li><a href="https://developers.google.com/speed/libraries/" rel="nofollow noreferrer" target="_blank">CDN-hosted javascript libraries at Google</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] addEventListener 与 onclick，孰优孰劣？

## 原文链接
[https://segmentfault.com/a/1190000005349550](https://segmentfault.com/a/1190000005349550)

