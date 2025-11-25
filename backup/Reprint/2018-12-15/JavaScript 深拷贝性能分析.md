---
title: 'JavaScript 深拷贝性能分析' 
date: 2018-12-15 2:30:11
hidden: true
slug: 860agpw2sb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>原文：<a href="https://dassur.ma/things/deep-copy/" rel="nofollow noreferrer" target="_blank">Deep-copying in JavaScript - DasSur.ma</a>
</blockquote>
<p>如何在 JavaScript 中拷贝一个对象？对于这个很简单的问题，但是答案却不简单。</p>
<h2 id="articleHeader0">引用传值</h2>
<p><del><em>在 JavaScript 中所有的东西都是引用传递</em></del>(原文有误，稍后写篇批判文 <a href="https://github.com/justjavac/the-front-end-knowledge-you-may-dont-know/issues/22" rel="nofollow noreferrer" target="_blank">“By Value” or “By Reference” in JavaScript · Issue #22</a>)。</p>
<p>如果你不知道什么意思，看看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mutate(obj) {
  obj.a = true;
}

const obj = {a: false};
mutate(obj)
console.log(obj.a); // 输出 true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mutate</span>(<span class="hljs-params">obj</span>) </span>{
  obj.a = <span class="hljs-literal">true</span>;
}

<span class="hljs-keyword">const</span> obj = {<span class="hljs-attr">a</span>: <span class="hljs-literal">false</span>};
mutate(obj)
<span class="hljs-built_in">console</span>.log(obj.a); <span class="hljs-comment">// 输出 true</span></code></pre>
<p>函数 <code>mutate</code> 改变了它的参数。在<strong>值传递</strong>的场景中，函数的形参只是实参的一个副本——a copy——当函数调用完成后，并不改变实参。但是在 JavaScript 这种<strong>引用传递</strong>的场景中，函数的形参和实参指向同一个对象，当参数内部改变形参的时候，函数外面的实参也被改变了。</p>
<p>因此在某些情况下，你需要保留原始对象，这时你需要把原始对象的一个拷贝传入到函数中，以防止函数改变原始对象。</p>
<h2 id="articleHeader1">浅拷贝：<code>Object.assign()</code>
</h2>
<p>一个简单的获取对象拷贝的方式是使用 <code>Object.assign(target, sources...)</code>。它接受任意数量的源对象，枚举它们的所有属性并分配给<code>target</code>。如果我们使用一个新的空对象<code>target</code>，那么我们就可以实现对象的复制。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = /* ... */;
const copy = Object.assign({}, obj); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-keyword">const</span> obj = <span class="hljs-comment">/* ... */</span>;
<span class="hljs-keyword">const</span> <span class="hljs-built_in">copy</span> = <span class="hljs-keyword">Object</span>.assign({}, obj); </code></pre>
<p>然而这只是一个<strong>浅</strong>副本。如果我们的对象包含其它对象作为自己的属性，它们将保持共享引用，这不是我们想要的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mutateDeepObject(obj) {
  obj.a.thing = true;
}

const obj = {a: {thing: false"}}";
const copy = Object.assign({}, obj);
mutateDeepObject(copy)
console.log(obj.a.thing); // prints true " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mutateDeepObject</span>(<span class="hljs-params">obj</span>) </span>{
  obj.a.thing = <span class="hljs-literal">true</span>;
}

<span class="hljs-keyword">const</span> obj = {<span class="hljs-attr">a</span>: {<span class="hljs-attr">thing</span>: <span class="hljs-literal">false</span>"}}";
<span class="hljs-keyword">const</span> copy = <span class="hljs-built_in">Object</span>.assign({}, obj);
mutateDeepObject(copy)
<span class="hljs-built_in">console</span>.log(obj.a.thing); <span class="hljs-comment">// prints true </span></code></pre>
<blockquote>
<code>Object.assign</code> 方法<strong>只会拷贝源对象自身的并且可枚举的属性到目标对象</strong>。该方法使用源对象的<code>[[Get]]</code>和目标对象的<code>[[Set]]</code>，所以它会调用相关 <code>getter</code> 和 <code>setter</code>。因此，它分配属性，而不仅仅是复制或定义新的属性。如果合并源包含<code>getter</code>，这可能使其不适合将新属性合并到原型中。为了将属性定义（包括其可枚举性）复制到原型，应使用<code>Object.getOwnPropertyDescriptor()</code>和<code>Object.defineProperty()</code> 。</blockquote>
<p>所以现在怎么办？有几种方法可以创建一个对象的深拷贝。</p>
<p>注意：也许有人提到了<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator" rel="nofollow noreferrer" target="_blank">对象解构运算</a>，这也是浅拷贝。</p>
<h2 id="articleHeader2"><code>JSON.parse</code></h2>
<p>创建对象副本的最古老方法之一是：将该对象转换为其 <code>JSON</code> 字符串表示形式，然后将其解析回对象。这感觉有点压抑，但它确实有效：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = /* ... */;
const copy = JSON.parse(JSON.stringify(obj));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> obj = <span class="hljs-comment">/* ... */</span>;
<span class="hljs-keyword">const</span> copy = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(obj));</code></pre>
<p>这里的缺点是你创建一个临时的，可能很大的字符串，只是为了把它重新放回解析器。另一个缺点是这种方法不能处理循环对象。而且循环对象经常发生。例如，当您构建树状数据结构，其中一个节点引用其父级，而父级又引用其子级。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const x = {};
const y = {x};
x.y = y; // Cycle: x.y.x.y.x.y.x.y.x...
const copy = JSON.parse(JSON.stringify(x)); // throws!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs roboconf"><code>const x = {};
const y = {<span class="hljs-attribute">x};
x.y = y; // Cycle</span>: x<span class="hljs-variable">.y</span><span class="hljs-variable">.x</span><span class="hljs-variable">.y</span><span class="hljs-variable">.x</span><span class="hljs-variable">.y</span><span class="hljs-variable">.x</span><span class="hljs-variable">.y</span><span class="hljs-variable">.x</span>...
const copy = JSON<span class="hljs-variable">.parse</span>(JSON<span class="hljs-variable">.stringify</span>(x)); // <span class="hljs-attribute">throws!</span></code></pre>
<p>另外，诸如 <code>Map</code>, <code>Set</code>, <code>RegExp</code>, <code>Date</code>, <code>ArrayBuffer</code> 和其他内置类型在进行序列化时会丢失。</p>
<h2 id="articleHeader3">Structured Clone 结构化克隆算法</h2>
<p><a href="https://html.spec.whatwg.org/multipage/structured-data.html#structuredserializeinternal" rel="nofollow noreferrer" target="_blank">Structured cloning</a> 是一种现有的算法，用于将值从一个地方转移到另一地方。例如，每当您调用postMessage将消息发送到另一个窗口或 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers" rel="nofollow noreferrer" target="_blank">WebWorker</a> 时，都会使用它。关于结构化克隆的好处在于它处理循环对象并 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#Supported_types" rel="nofollow noreferrer" target="_blank">支持大量的内置类型</a>。问题是，在编写本文时，该算法并不能直接使用，只能作为其他 API 的一部分。我想我们应该了解一下包含哪些，不是吗。。。</p>
<h3 id="articleHeader4">MessageChannel</h3>
<p>正如我所说的，只要你调用<code>postMessage</code>结构化克隆算法就可以使用。我们可以创建一个 <code>MessageChannel</code> 并发送消息。在接收端，消息包含我们原始数据对象的结构化克隆。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function structuralClone(obj) {
  return new Promise(resolve => {
    const {port1, port2} = new MessageChannel();
    port2.onmessage = ev => resolve(ev.data);
    port1.postMessage(obj);
  });
}

const obj = /* ... */;
const clone = await structuralClone(obj);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">structuralClone</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> {port1, port2} = <span class="hljs-keyword">new</span> MessageChannel();
    port2.onmessage = <span class="hljs-function"><span class="hljs-params">ev</span> =&gt;</span> resolve(ev.data);
    port1.postMessage(obj);
  });
}

<span class="hljs-keyword">const</span> obj = <span class="hljs-comment">/* ... */</span>;
<span class="hljs-keyword">const</span> clone = <span class="hljs-keyword">await</span> structuralClone(obj);</code></pre>
<p>这种方法的缺点是它是<strong>异步</strong>的。虽然这并无大碍，但是有时候你需要使用同步的方式来深度拷贝一个对象。</p>
<h3 id="articleHeader5">History API</h3>
<p>如果你曾经使用<strong>history.pushState()</strong>写过 SPA，你就知道你可以提供一个状态对象来保存 <strong>URL</strong>。事实证明，这个状态对象使用结构化克隆 - 而且是同步的。我们必须小心使用，不要把程序逻辑使用的状态对象搞乱了，所以我们需要在完成克隆之后恢复原始状态。为了防止发生任何意外，请使用<strong>history.replaceState()</strong>而不是<strong>history.pushState()</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function structuralClone(obj) {
  const oldState = history.state;
  history.replaceState(obj, document.title);
  const copy = history.state;
  history.replaceState(oldState, document.title);
  return copy;
}

const obj = /* ... */;
const clone = structuralClone(obj); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">structuralClone</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">const</span> oldState = history.state;
  history.replaceState(obj, <span class="hljs-built_in">document</span>.title);
  <span class="hljs-keyword">const</span> copy = history.state;
  history.replaceState(oldState, <span class="hljs-built_in">document</span>.title);
  <span class="hljs-keyword">return</span> copy;
}

<span class="hljs-keyword">const</span> obj = <span class="hljs-comment">/* ... */</span>;
<span class="hljs-keyword">const</span> clone = structuralClone(obj); </code></pre>
<p>然而，仅仅为了复制一个对象，而使用浏览器的引擎，感觉有点过分。另外，Safari 浏览器对<strong>replaceState</strong>调用的限制数量为 30 秒内 100 次。</p>
<h3 id="articleHeader6">Notification API</h3>
<p>在发了一条<a href="https://twitter.com/DasSurma/status/955484341358022657" rel="nofollow noreferrer" target="_blank">推文</a>之后，<a href="https://twitter.com/jeremyBanks/status/956053793875087361" rel="nofollow noreferrer" target="_blank">Jeremy Banks</a> 向我展示了第三种方法来利用结构化克隆：Notification API。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function structuralClone(obj) {
  return new Notification('', {data: obj, silent: true}).data;
}

const obj = /* ... */;
const clone = structuralClone(obj);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">structuralClone</span><span class="hljs-params">(obj)</span> </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Notification(<span class="hljs-string">''</span>, {data: obj, silent: <span class="hljs-keyword">true</span>}).data;
}

<span class="hljs-keyword">const</span> obj = <span class="hljs-comment">/* ... */</span>;
<span class="hljs-keyword">const</span> <span class="hljs-keyword">clone</span> = structuralClone(obj);</code></pre>
<p>短小，简洁。我喜欢它！</p>
<p>但是，它需要浏览器内部的权限机制，所以我怀疑它是很慢的。由于某种原因，Safari 总是返回<code>undefined</code>。</p>
<h2 id="articleHeader7">Performance extravaganza</h2>
<p>我想测量哪种方法是最高性能的。在我的第一次（天真的）尝试中，我拿了一个小 JSON 对象，并通过不同的方式克隆对象 1 千次。幸运的是，<a href="https://twitter.com/mathias" rel="nofollow noreferrer" target="_blank">Mathias Bynens</a> 告诉我，当你添加属性到一个对象时，<a href="https://v8project.blogspot.co.uk/2017/08/fast-properties.html" rel="nofollow noreferrer" target="_blank">V8有一个缓存</a>。所以我是在给缓存做基准测试。为了确保我永远不会碰到缓存，我编写了一个<a href="https://gist.github.com/surma/d473bc68902984e6ade4fbe34ed55c3c" rel="nofollow noreferrer" target="_blank">函数，使用随机密钥名称生成给定深度和宽度的对象</a><button class="btn btn-xs btn-default ml10 preview" data-url="surma/d473bc68902984e6ade4fbe34ed55c3c" data-typeid="1">点击预览</button>，并重新运行<a href="https://deep-copy-median.glitch.me/" rel="nofollow noreferrer" target="_blank">测试</a>。</p>
<h3 id="articleHeader8">图表！</h3>
<p>以下是 Chrome，Firefox 和 Edge 中不同技术的性能。越低越好。</p>
<p><span class="img-wrap"><img data-src="/img/bV297j?w=600&amp;h=371" src="https://static.alili.tech/img/bV297j?w=600&amp;h=371" alt="JavaScript 性能 justjavac" title="JavaScript 性能 justjavac" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV297l?w=600&amp;h=371" src="https://static.alili.tech/img/bV297l?w=600&amp;h=371" alt="JavaScript 性能 justjavac" title="JavaScript 性能 justjavac" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV297m?w=600&amp;h=371" src="https://static.alili.tech/img/bV297m?w=600&amp;h=371" alt="JavaScript 性能 justjavac" title="JavaScript 性能 justjavac" style="cursor: pointer;"></span></p>
<h2 id="articleHeader9">结论</h2>
<p>那么我们从中得到了什么呢？</p>
<ul>
<li>如果您没有循环对象，并且不需要保留内置类型，则可以使用跨浏览器的<code>JSON.parse(JSON.stringify())</code>获得最快的克隆性能，这让我感到非常惊讶。</li>
<li>如果你想要一个适当的结构化克隆，<code>MessageChannel</code>是你唯一可靠的跨浏览器的选择。</li>
</ul>
<p>如果浏览器平台直接提供一个 <code>structuredClone()</code>函数，会不会更好？我当然这样认为，最新的 HTML 规范正在讨论这个 <a href="https://github.com/whatwg/html/issues/793" rel="nofollow noreferrer" target="_blank">Synchronous clone = global.structuredClone(value, transfer = []) API · Issue #793 · whatwg/html</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 深拷贝性能分析

## 原文链接
[https://segmentfault.com/a/1190000013107871](https://segmentfault.com/a/1190000013107871)

