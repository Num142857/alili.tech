---
title: '【EASYDOM系列教程】之Document 对象介绍' 
date: 2019-01-08 2:30:11
hidden: true
slug: tsnyvl2iybp
categories: [reprint]
---

{{< raw >}}

                    
<p>Document 对象是 DOM 的标准规范中比较重要的对象之一。该对象提供了访问和更新 HTML 页面内容的属性和方法。</p>
<h2 id="articleHeader0">Document 对象的作用</h2>
<p>Document 对象作为 DOM 访问和更新 HTML 页面内容的入口。简单来说，我们可以把 Document 对象理解为在 DOM 的标准规范中代表 HTML 页面。（<strong>当然，这种说法并不准确</strong>）</p>
<p>Document 对象提供的属性和方法，可以实现定位 HTML 页面中的元素，或者创建新的元素等功能。</p>
<h2 id="articleHeader1">测试 Document 对象</h2>
<p>我们可以通过 <code>console.log</code> 方法将 Document 对象打印，测试 Document 对象中提供了哪些属性和方法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(document);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">document</span>);</code></pre>
<p>运行 HTML 页面后，打开 <strong>开发者工具</strong>，我们可以看到以下内容:</p>
<p><span class="img-wrap"><img data-src="/img/bVQPGL?w=2000&amp;h=619" src="https://static.alili.tech/img/bVQPGL?w=2000&amp;h=619" alt="测试Document对象" title="测试Document对象" style="cursor: pointer; display: inline;"></span></p>
<p>我们会发现 <code>console</code> 会将 HTML 页面的源代码打印出来。这个结果充分地说明了 Document 对象在 DOM 的标准规范中代表整个 HTML 页面。</p>
<p>换句话讲，DOM 访问和更新 HTML 页面内容主要依靠 Document 对象作为入口。</p>
<h2 id="articleHeader2">Document 对象的属性和方法一览</h2>
<p>在 DOM 的标准规范中，Document 对象的属性和方法被定义在了 <code>prototype</code> 原型中。所以，我们想要查看 Document 对象中具有哪些属性和方法，可以打印 Document 对象的 <code>protoype</code> 进行查看。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Document.prototype);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(Document.prototype);</code></pre>
<p>运行 HTML 页面后，打开 <strong>开发者工具</strong>，我们可以看到以下内容:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="URL:(...)
activeElement:(...)
adoptNode:function adoptNode()
anchors:(...)
append:function append()
applets:(...)
baseURI:(...)
body:(...)
characterSet:(...)
charset:(...)
childElementCount:(...)
childNodes:(...)
children:(...)
close:function close()
contentType:(...)
cookie:(...)
createAttribute:function createAttribute()
createElement:function createElement()
createEvent:function createEvent()
createExpression:function createExpression()
createNSResolver:function createNSResolver()
createNodeIterator:function createNodeIterator()
createProcessingInstruction:function createProcessingInstruction()
createRange:function createRange()
createTextNode:function createTextNode()
createTreeWalker:function createTreeWalker()
currentScript:(...)
defaultView:(...)
designMode:(...)
dir:(...)
doctype:(...)
documentElement:(...)
documentURI:(...)
domain:(...)
firstChild:(...)
firstElementChild:(...)
fonts:(...)
forms:(...)
getElementById:function getElementById()
getElementsByClassName:function getElementsByClassName()
getElementsByName:function getElementsByName()
getElementsByTagName:function getElementsByTagName()
getSelection:function getSelection()
hasFocus:function hasFocus()
head:(...)
hidden:(...)
images:(...)
implementation:(...)
importNode:function importNode()
inputEncoding:(...)
isConnected:(...)
lastChild:(...)
lastElementChild:(...)
lastModified:(...)
links:(...)
nextSibling:(...)
nodeName:(...)
nodeType:(...)
nodeValue:(...)
open:function open()
ownerDocument:(...)
parentElement:(...)
parentNode:(...)
prepend:function prepend()
previousSibling:(...)
querySelector:function querySelector()
querySelectorAll:function querySelectorAll()
readyState:(...)
referrer:(...)
registerElement:function registerElement()
rootElement:(...)
scripts:(...)
scrollingElement:(...)
selectedStylesheetSet:(...)
styleSheets:(...)
textContent:(...)
title:(...)
visibilityState:(...)
write:function write()
writeln:function writeln()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>URL:(...)
activeElement:(...)
adoptNode:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">adoptNode</span>(<span class="hljs-params"></span>)
<span class="hljs-title">anchors</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">append</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">append</span>(<span class="hljs-params"></span>)
<span class="hljs-title">applets</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">baseURI</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">body</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">characterSet</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">charset</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">childElementCount</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">childNodes</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">children</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">close</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">close</span>(<span class="hljs-params"></span>)
<span class="hljs-title">contentType</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">cookie</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">createAttribute</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createAttribute</span>(<span class="hljs-params"></span>)
<span class="hljs-title">createElement</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createElement</span>(<span class="hljs-params"></span>)
<span class="hljs-title">createEvent</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createEvent</span>(<span class="hljs-params"></span>)
<span class="hljs-title">createExpression</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createExpression</span>(<span class="hljs-params"></span>)
<span class="hljs-title">createNSResolver</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createNSResolver</span>(<span class="hljs-params"></span>)
<span class="hljs-title">createNodeIterator</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createNodeIterator</span>(<span class="hljs-params"></span>)
<span class="hljs-title">createProcessingInstruction</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createProcessingInstruction</span>(<span class="hljs-params"></span>)
<span class="hljs-title">createRange</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createRange</span>(<span class="hljs-params"></span>)
<span class="hljs-title">createTextNode</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createTextNode</span>(<span class="hljs-params"></span>)
<span class="hljs-title">createTreeWalker</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createTreeWalker</span>(<span class="hljs-params"></span>)
<span class="hljs-title">currentScript</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">defaultView</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">designMode</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">dir</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">doctype</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">documentElement</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">documentURI</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">domain</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">firstChild</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">firstElementChild</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">fonts</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">forms</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">getElementById</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getElementById</span>(<span class="hljs-params"></span>)
<span class="hljs-title">getElementsByClassName</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getElementsByClassName</span>(<span class="hljs-params"></span>)
<span class="hljs-title">getElementsByName</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getElementsByName</span>(<span class="hljs-params"></span>)
<span class="hljs-title">getElementsByTagName</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getElementsByTagName</span>(<span class="hljs-params"></span>)
<span class="hljs-title">getSelection</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSelection</span>(<span class="hljs-params"></span>)
<span class="hljs-title">hasFocus</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hasFocus</span>(<span class="hljs-params"></span>)
<span class="hljs-title">head</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">hidden</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">images</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">implementation</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">importNode</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">importNode</span>(<span class="hljs-params"></span>)
<span class="hljs-title">inputEncoding</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">isConnected</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">lastChild</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">lastElementChild</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">lastModified</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">links</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">nextSibling</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">nodeName</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">nodeType</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">nodeValue</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">open</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">open</span>(<span class="hljs-params"></span>)
<span class="hljs-title">ownerDocument</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">parentElement</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">parentNode</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">prepend</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">prepend</span>(<span class="hljs-params"></span>)
<span class="hljs-title">previousSibling</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">querySelector</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">querySelector</span>(<span class="hljs-params"></span>)
<span class="hljs-title">querySelectorAll</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">querySelectorAll</span>(<span class="hljs-params"></span>)
<span class="hljs-title">readyState</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">referrer</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">registerElement</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">registerElement</span>(<span class="hljs-params"></span>)
<span class="hljs-title">rootElement</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">scripts</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">scrollingElement</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">selectedStylesheetSet</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">styleSheets</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">textContent</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">title</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">visibilityState</span>:(<span class="hljs-params">...</span>)
<span class="hljs-title">write</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">write</span>(<span class="hljs-params"></span>)
<span class="hljs-title">writeln</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">writeln</span>(<span class="hljs-params"></span>)</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<p>我们可以看到，Document 对象提供的属性和方法还是比较多的。但在实际开发中，比较常用的属性和方法并没有太多。</p>
<blockquote><p><strong>关于 Document 对象的具体用法，我们在后面的章节中学习。</strong></p></blockquote>
<h2 id="articleHeader3">Document 对象的继承链</h2>
<p>Document 对象是继承于 Node 对象的。Node 对象也是 DOM 的标准规范中非常重要的对象之一，而 Node 对象又是继承于 EventTarget 对象。</p>
<p>我们可以通过以下代码来测试 Document 对象的继承链:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Document.prototype instanceof Node);
console.log(Node.prototype instanceof EventTarget);

console.log(Document.prototype instanceof EventTarget);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(Document.prototype <span class="hljs-keyword">instanceof</span> Node);
<span class="hljs-built_in">console</span>.log(Node.prototype <span class="hljs-keyword">instanceof</span> EventTarget);

<span class="hljs-built_in">console</span>.log(Document.prototype <span class="hljs-keyword">instanceof</span> EventTarget);</code></pre>
<p>Document 对象的属性和方法多是继承于 Node 对象和 EventTarget 对象的。当然，也有一部分属性和方法是实现了 HTMLDocument 接口的。</p>
<hr>
<p>本教程免费开源，任何人都可以免费学习、分享，甚至可以进行修改。但需要注明作者及来源，并且不能用于商业。</p>
<p>本教程采用<a href="http://creativecommons.org/licenses/by-nc-nd/4.0/" rel="nofollow noreferrer" target="_blank">知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议</a>进行许可。</p>
<p><span class="img-wrap"><img data-src="/img/bVSpaA?w=922&amp;h=302" src="https://static.alili.tech/img/bVSpaA?w=922&amp;h=302" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【EASYDOM系列教程】之Document 对象介绍

## 原文链接
[https://segmentfault.com/a/1190000010169405](https://segmentfault.com/a/1190000010169405)

