---
title: '一起来看 HTML 5.2 中新的原生元素 <dialog>' 
date: 2018-12-17 2:30:07
hidden: true
slug: arcwclv1d8m
categories: [reprint]
---

{{< raw >}}

                    
<p>原文地址：<a href="https://keithjgrant.com/posts/2018/meet-the-new-dialog-element/" rel="nofollow noreferrer" target="_blank">Meet the New Dialog Element</a><br>作者：Keith</p>
<p><span class="img-wrap"><img data-src="/img/bV2gG5?w=800&amp;h=533" src="https://static.alili.tech/img/bV2gG5?w=800&amp;h=533" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote>不到一个月前，<code>HTML 5.2</code> 正式成为 <code>W3C</code> 的推荐标准（<code>REC</code>）,其中，推出了一个新的原生模态对话框元素 <code>&lt;dialog&gt;</code>，乍一看，可能感觉它就是一个新增的元素，然而，作者最近在玩的时候，发现它确实是一个值得期待和很有意思的元素，在这里分享给大家</blockquote>
<p>这是 <code>&lt;diglog&gt;</code> 最基础的示例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<dialog open>
    Native dialog box!
</dialog>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">dialog</span> <span class="hljs-attr">open</span>&gt;</span>
    Native dialog box!
<span class="hljs-tag">&lt;/<span class="hljs-name">dialog</span>&gt;</span></code></pre>
<p>其中，<code>open</code> 属性表示此时 <code>dialog</code> 是可见的，如果没有 <code>open</code>，<code>dialog</code> 将会隐藏，你可以使用 <code>JavaScipt</code> 将它显现出来，此时，<code>dialog</code> 渲染如下</p>
<p><span class="img-wrap"><img data-src="/img/bV2gG8?w=186&amp;h=74" src="https://static.alili.tech/img/bV2gG8?w=186&amp;h=74" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>它 <code>绝对定位</code> 于页面之上，就如我们期望的一样，出现在内容的上方，并且 <code>水平居中</code>，默认情况下，它 <code>和内容一样宽</code></p>
<h2 id="articleHeader0">基本操作</h2>
<p><code>JavaScipt</code> 有几个 <code>方法</code> 和 <code>属性</code> 可以很方便地处理 <code>dialog</code> 元素，使用最多的可能还是 <code>showModal()</code> 和 <code>close()</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const modal = document.querySelector('dialog');

// makes modal appear (adds `open` attribute)
modal.showModal();

// hides modal (removes `open` attribute)
modal.close();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> modal = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'dialog'</span>);

<span class="hljs-comment">// makes modal appear (adds `open` attribute)</span>
modal.showModal();

<span class="hljs-comment">// hides modal (removes `open` attribute)</span>
modal.close();</code></pre>
<p>当你使用 <code>showModal()</code> 来打开 <code>dialog</code> 时，将会在 <code>dialog</code> 周围加一层阴影，阻止用户与 <code>非 diglog</code> 元素的交互，默认情况下，阴影是 <code>完全透明</code> 的，你可以使用 <code>CSS</code> 来修改它</p>
<p>按 <code>Esc</code> 可以关闭 <code>dialog</code>，你也可以提供一个按钮来触发 <code>close()</code></p>
<p>还有一个方法是 <code>show()</code>，它也可以让 <code>dialog</code> 显现，但与 <code>showModal()</code> 不同的是它没有阴影，用户可以与非 <code>dialog</code> 元素进行交互</p>
<h2 id="articleHeader1">浏览器支持和 Polyfill</h2>
<p>目前，只有 <code>chrome</code> 支持 <code>&lt;dialog&gt;</code>，<code>Firefox</code> 需要在 <code>about:config</code> 里允许 <code>dom.dialog_element.enabled</code> 才能正常使用，我猜想，<code>Firefox</code> 在不久的将来就会支持</p>
<p><span class="img-wrap"><img data-src="/img/bV2gHb?w=1272&amp;h=491" src="https://static.alili.tech/img/bV2gHb?w=1272&amp;h=491" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>上图为 <a href="http://caniuse.com/#search=dialog" rel="nofollow noreferrer" target="_blank">caniuse.com</a> 关于 <code>dialog</code> 特性主流浏览器的兼容情况</p>
<p>幸运的是，我们可以使用 <a href="https://caniuse.com/#search=dialog" rel="nofollow noreferrer" target="_blank">dialog-polyfill</a> 来缓解这种尴尬，它既提供了 <code>JavaScript</code> 的行为，也包含了默认的样式，我们可以使用 <code>npm</code> 来安装它，也可以使用 <code>&lt;script&gt;</code> 标签来引用它。目前，它已支持各主流浏览器，包括 <code>IE 9</code> 及其以上版本</p>
<p>只是，在使用它时，每个 <code>dialog</code> 需要使用下面语句进行初始化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dialogPolyfill.registerDialog(dialog);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">dialogPolyfill.registerDialog(dialog);</code></pre>
<p>并且，它并不会取代浏览器原生的行为</p>
<h2 id="articleHeader2">样式</h2>
<p>打开和关闭模态框是最基本的，但这是肯定不够的，<code>&lt;dialog&gt;</code> 最开始时样式是不怎么好看的，因此，我们需要自定义它的样式，此外，我们可以通过设置伪元素 <code>::backdrop</code> 来优化 <code>&lt;dialog&gt;</code> 显现时背影的样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dialog {
    padding: 0;
    width: 478px;
    text-align: center;
    vertical-align: middle;
    border-radius: 5px;
    border: 0;
}

dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.1);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">dialog</span> {
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">478px</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">vertical-align</span>: middle;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-tag">dialog</span><span class="hljs-selector-pseudo">::backdrop</span> {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.1);
}</code></pre>
<p>为了兼容老的浏览器，使用 <code>polyfill</code> 时，<code>::backdrop</code> 是不起作用的，但 <code>polyfill</code> 会在 <code>dialog</code> 后面添加一个 <code>.backdrop</code> 元素，我们可以像下面这样定位它</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dialog + .backdrop {
  background-color: rgba(0, 0, 0, 0.4);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">dialog</span> + <span class="hljs-selector-class">.backdrop</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.4);
}</code></pre>
<p>接下来，是时候向 <code>bialog</code> 里添加更多的内容，一般包括 <code>header</code>， <code>body</code> 和 <code>footer</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<dialog id=&quot;sweet-modal&quot;>
    <h3 class=&quot;modal-header&quot;>sweet dialog</h3>
    <div class=&quot;modal-body&quot;>
        <p>This is a sweet dialog, which is much better.</p>
    </div>
    <footer class=&quot;modal-footer&quot;>
        <button id=&quot;get-it&quot; type=&quot;button&quot;>Get</button>
    </footer>
</dialog>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">dialog</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"sweet-modal"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-header"</span>&gt;</span>sweet dialog<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-body"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>This is a sweet dialog, which is much better.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">footer</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-footer"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"get-it"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span>&gt;</span>Get<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dialog</span>&gt;</span></code></pre>
<p>最后，在添加一些 <code>CSS</code>，你就能得到你想要的</p>
<h2 id="articleHeader3">进阶操作</h2>
<p>通常，我们期望能从 <code>dialog</code> 中获取一些用户的信息。关闭 <code>dialog</code> 时，我们可以给 <code>close()</code> 传递一个 <code>string</code>，然后通过 <code>dialog</code> 元素的 <code>returnValue</code> 属性来获取</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="modal.close('Accepted');

console.log(modal.returnValue); // logs `Accepted`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">modal.close(<span class="hljs-string">'Accepted'</span>);

<span class="hljs-built_in">console</span>.log(modal.returnValue); <span class="hljs-comment">// logs `Accepted`</span></code></pre>
<p>当然，还存在额外的事件我们可以监听，其中，最常用的可能是 <code>close</code>（关闭 <code>dialog</code> 时触发），还有 <code>cancel</code> （用户按 <code>Esc</code> 关闭 <code>dialog</code> 时触发） </p>
<p>此外，我们可能还期望点击 <code>dialog</code> 旁边的阴影来关闭，当然，这也是有解决办法的。点击阴影会触发 <code>dialog</code> 的点击事件，如果 <code>dialog</code> 的子元素占满了整个 <code>dialog</code>，那么我们可以通过监听 <code>dialog</code> 的点击，当 <code>target</code> 为 <code>modal</code> 时来关闭它</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close('cancelled');
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">modal.addEventListener(<span class="hljs-string">'click'</span>, (event) =&gt; {
    <span class="hljs-keyword">if</span> (event.target === modal) {
        modal.close(<span class="hljs-string">'cancelled'</span>);
    }
});</code></pre>
<p>当然，这不是完美的，但它确实是有效的，如果你有更好的方式，欢迎在评论中交流</p>
<h2 id="articleHeader4">总结</h2>
<p>说了这么多，不如自己实际演练一番，作者也做了一个 <a href="https://codepen.io/FengShangWuQi/pen/qpMgZB" rel="nofollow noreferrer" target="_blank">demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="FengShangWuQi/pen/qpMgZB" data-typeid="3">点击预览</button>，欢迎参考</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一起来看 HTML 5.2 中新的原生元素 <dialog>

## 原文链接
[https://segmentfault.com/a/1190000012894864](https://segmentfault.com/a/1190000012894864)

