---
title: 'React 16 发布啦。。渣渣看了一下更新文档~' 
date: 2018-12-30 2:30:10
hidden: true
slug: hze9x3xtt7n
categories: [reprint]
---

{{< raw >}}

                    
<p>React 又双叒更新啦~ 这次是React v16.0，其实在前段时间就知道最近要发布了。协议更新了。。。来看看其他的变化吧。自己看着玩的。。期待官方中文文档的更新。。</p>
<hr>
<p>原文地址：<a href="https://facebook.github.io/react/blog/2017/09/26/react-v16.0.html" rel="nofollow noreferrer" target="_blank">React v16.0</a></p>
<p>我们很高兴地宣布发布React v16.0了！ 其中的一些变化是一些长期的功能请求，包括 <code>fragments</code> ，边界错误， <code>portals</code> ，支持自定义 DOM 属性，更好的服务器端渲染以及减小了文件大小。</p>
<h3 id="articleHeader0">新的render()返回类型</h3>
<p>你现在可以在一个组件的 <code>render</code> 方法中中返回一个元素数组。就像其它数组一样，你需要为每一个数组元素添加一个 <code>key</code> 来避免 <code>key warning</code> 。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
  // 不需要将列表项包含在一个额外的元素中了
  return [
    // 不要忘了添加key哦 :)
    <li key=&quot;A&quot;>First item</li>,
    <li key=&quot;B&quot;>Second item</li>,
    <li key=&quot;C&quot;>Third item</li>,
  ];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">render() {
  <span class="hljs-comment">// 不需要将列表项包含在一个额外的元素中了</span>
  <span class="hljs-keyword">return</span> [
    <span class="hljs-comment">// 不要忘了添加key哦 :)</span>
    &lt;li key=<span class="hljs-string">"A"</span>&gt;First item&lt;<span class="hljs-regexp">/li&gt;,
    &lt;li key="B"&gt;Second item&lt;/</span>li&gt;,
    &lt;li key=<span class="hljs-string">"C"</span>&gt;Third item&lt;<span class="hljs-regexp">/li&gt;,
  ];
}</span></code></pre>
<p>未来我们可能会向JSX添加一种不需要带有 <code>key</code> 属性的特殊的 <code>fragments</code> 。</p>
<p>同时，我们也使 <code>render</code> 可以返回一个字符串：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
  return 'Hello React 16!';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">render() {
  <span class="hljs-keyword">return</span> <span class="hljs-string">'Hello React 16!'</span>;
}</code></pre>
<h3 id="articleHeader1">更好的错误处理机制</h3>
<p>以前，渲染过程中的运行错误可能会使 React 处于崩溃状态，还会产生隐藏的错误消息，并需要页面刷新才能恢复。为了解决这个问题， React 16 使用了一种更灵活的错误处理机制。默认情况下，假如组件的 <code>render</code> 或生命周期的其它方法中抛出了错误，整个组件树会从根卸载。这样做是为了阻止损坏数据的显示。然而，这可能还不是最理想的用户体验。</p>
<p>每次发生错误时，不会卸载整个app，你可以看到错误边界（error boundaries）。错误边界是可以在子树内部捕获错误的一种特殊组件，并且显示一个可显示的回退版本UI。可以把错误边界看成是对于React的 <code>try-catch</code> 语句。</p>
<p>如果想了解更多，可以看这：<a href="https://facebook.github.io/react/blog/2017/07/26/error-handling-in-react-16.html" rel="nofollow noreferrer" target="_blank">previous post on error handling in React 16</a></p>
<h3 id="articleHeader2">Portals</h3>
<p><code>Portals</code> 提供了一种一流的方法，将子节点渲染到父节点之外的 DOM 节点中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
  // React 不会创建一个新的div。它会像`donNode`中渲染子组件。
  // `domNode` 是任何有效的DOM节点，无论它处于DOM中的哪个位置。
  return ReactDOM.createPortal(
    this.props.children,
    domNode,
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">render() {
  <span class="hljs-comment">// React 不会创建一个新的div。它会像`donNode`中渲染子组件。</span>
  <span class="hljs-comment">// `domNode` 是任何有效的DOM节点，无论它处于DOM中的哪个位置。</span>
  <span class="hljs-keyword">return</span> ReactDOM.createPortal(
    <span class="hljs-keyword">this</span>.props.children,
    domNode,
  );
}</code></pre>
<p>查看更全面的例子：<a href="https://facebook.github.io/react/docs/portals.html" rel="nofollow noreferrer" target="_blank">documentation for portals</a>.</p>
<h3 id="articleHeader3">更好的服务端渲染</h3>
<p>React 16 包含了一个完全重写的服务端渲染器（randerer）。它真的很快，因为它支持流（streaming），所以可以向客户端更快地发送字节。</p>
<h3 id="articleHeader4">支持自定义DOM属性</h3>
<p>之前我们忽略无法识别的 HTML 和 SVG 属性，新版本中， React 可以将它们传递给 DOM 了。这样还有额外的好处，去除了 React 属性的白名单列表，从而减少了文件大小。</p>
<h3 id="articleHeader5">削减文件大小</h3>
<p>尽管增加了这些新特性，但是 React 16 实际上比 15.6.1 更小！</p>
<ul>
<li>
<code>react</code> 是5.3kb（gzip：2.2kb），之前是20.7kb（gzip：6.9kb）</li>
<li>
<code>react-dom</code> 是103.7kb（gzip：32.6kb），之前是141kb（gzip：42.9kb）</li>
<li>
<code>react</code> + <code>react-dom</code> 是109kb（gzip：34.8kb），之前是161.7kb（gzip：49.8kb）</li>
</ul>
<p>相比以前的版本，小了32%（gzip后小了30%）。</p>
<h3 id="articleHeader6">MIT 协议</h3>
<p>React 16 的协议已经是 MIT 协议了，当然，也把已经发布的15.6.2页改成MIT协议了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 16 发布啦。。渣渣看了一下更新文档~

## 原文链接
[https://segmentfault.com/a/1190000011378812](https://segmentfault.com/a/1190000011378812)

