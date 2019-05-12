---
title: '全新的同步渲染 markdown 文章 + 高亮更新 书写体验' 
date: 2019-02-15 2:30:44
hidden: true
slug: eke25alz6p9
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>16 年在 SF 中发布了文章 <a href="https://segmentfault.com/a/1190000006260582">"探究SegumentFault Markdown编辑器"</a>，目的是仿 SF 线上书写 Markdown 文档的体验：<strong>高亮定位修改节点</strong></p>
<p>在上述文章中的工具已经不再维护（😢代码写太乱），而且是在浏览器中书写 markdown 文本。</p>
<p>于是现在使用全新的思路实现了一个：<strong>在本地任意编辑器书写 markdown，同时同步定位修改节点</strong> 工具 <a href="https://github.com/imcuttle/live-markd" rel="nofollow noreferrer" target="_blank">live-markd</a></p>
<p>预览效果如图:  <br><span class="img-wrap"><img data-src="/img/bVbiL95?w=700&amp;h=415" src="https://static.alili.tech/img/bVbiL95?w=700&amp;h=415" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">如何使用</h2>
<ol>
<li>安装 nodejs 环境，如已经有则跳过此步</li>
<li>
<p>全局安装 <code>live-markd</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install live-markd -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install live-markd -g</code></pre>
</li>
<li>
<p>进入到 markdown 文件目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="live-markd path/to/markdown" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">live-markd path/to/markdown</code></pre>
</li>
</ol>
<h2 id="articleHeader2">如何实现</h2>
<h3 id="articleHeader3">如何实现修改节点的检测</h3>
<p>使用 <a href="https://github.com/remarkjs/remark" rel="nofollow noreferrer" target="_blank">remark</a> 解析 markdown，得到 <a href="https://github.com/syntax-tree/mdast" rel="nofollow noreferrer" target="_blank">markdown 抽象语法树</a> </p>
<p>如下例子，现在有两个 markdown 文件 <code>old.md</code> 和 <code>new.md</code></p>
<ul>
<li>
<p><code>old.md</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# hi
world" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="markdown hljs"><code class="markdown"><span class="hljs-section"># hi</span>
world</code></pre>
</li>
<li>
<p><code>new.md</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# hi
world!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="markdown hljs"><code class="markdown"><span class="hljs-section"># hi</span>
world!</code></pre>
</li>
</ul>
<p>可以看到 <code>new.md</code> 相比于 <code>old.md</code> 最后多了 <code>!</code> </p>
<p>进一步的，对比两个 markdown 文本的语法树</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// old.md
{
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [{
        type: 'paragraph',
        children: [{ type: 'text', value: 'world' }]
      }]
    }
  ]
}

// new.md
{
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [{
        type: 'paragraph',
        children: [{ type: 'text', value: 'world!' }]
      }]
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// old.md</span>
{
  <span class="hljs-attr">type</span>: <span class="hljs-string">'root'</span>,
  <span class="hljs-attr">children</span>: [
    {
      <span class="hljs-attr">type</span>: <span class="hljs-string">'heading'</span>,
      <span class="hljs-attr">depth</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">children</span>: [{
        <span class="hljs-attr">type</span>: <span class="hljs-string">'paragraph'</span>,
        <span class="hljs-attr">children</span>: [{ <span class="hljs-attr">type</span>: <span class="hljs-string">'text'</span>, <span class="hljs-attr">value</span>: <span class="hljs-string">'world'</span> }]
      }]
    }
  ]
}

<span class="hljs-comment">// new.md</span>
{
  <span class="hljs-attr">type</span>: <span class="hljs-string">'root'</span>,
  <span class="hljs-attr">children</span>: [
    {
      <span class="hljs-attr">type</span>: <span class="hljs-string">'heading'</span>,
      <span class="hljs-attr">depth</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">children</span>: [{
        <span class="hljs-attr">type</span>: <span class="hljs-string">'paragraph'</span>,
        <span class="hljs-attr">children</span>: [{ <span class="hljs-attr">type</span>: <span class="hljs-string">'text'</span>, <span class="hljs-attr">value</span>: <span class="hljs-string">'world!'</span> }]
      }]
    }
  ]
}</code></pre>
<p>然后分别对两个树结构进行 DFS，依次对比节点，判断出第一个不同的节点即可，最后对修改的节点注入 class，最后转换成带 class 的 html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  hProperties: {
    className: ['detected-updated']
  },
  type: 'paragraph',
  children: [{ type: 'text', value: 'world!' }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">hProperties</span>: {
    <span class="hljs-attr">className</span>: [<span class="hljs-string">'detected-updated'</span>]
  },
  <span class="hljs-attr">type</span>: <span class="hljs-string">'paragraph'</span>,
  <span class="hljs-attr">children</span>: [{ <span class="hljs-attr">type</span>: <span class="hljs-string">'text'</span>, <span class="hljs-attr">value</span>: <span class="hljs-string">'world!'</span> }]
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h1>hi</h1>
<p class=&quot;detected-updated&quot;>world!</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>hi<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"detected-updated"</span>&gt;</span>world!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<p>当然，以上 markdown 比对工作由 <a href="https://github.com/imcuttle/detect-one-changed" rel="nofollow noreferrer" target="_blank">detect-one-changed</a> 完成</p>
<h3 id="articleHeader4">如何实现数据推送</h3>
<p>live-markd 使用 服务器推送（EventStream）来实现客户端和服务端的长连接，就如 <a href="https://github.com/webpack-contrib/webpack-hot-middleware" rel="nofollow noreferrer" target="_blank">webpack-hot-middleware</a> 实现，只有单向的服务端向客户端的数据推送。同时为了让服务器知晓客户端是否还存在，还具有每隔 30s 的心跳检测，用于及时回收服务端资源。</p>
<p><span class="img-wrap"><img data-src="/img/bVbi6Dc?w=1454&amp;h=360" src="https://static.alili.tech/img/bVbi6Dc?w=1454&amp;h=360" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>客户端</h4>
<p>在客户端只需要接受服务器推送数据即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 建立连接
const source = new EventSource(location.pathname + '?sse=on')
source.addEventListener('message', function(ev) {
  let data = {}
  try {
    data = JSON.parse(ev.data)
  } catch (e) {}

  if (data.type === 'change') {
    document.querySelector('.markdown-body').innerHTML = data.value
    const node = document.querySelector('.markdown-body .detected-updated')
    if (node) {
      // 定位
      node.scrollIntoView({ behavior: 'smooth' })
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 建立连接</span>
<span class="hljs-keyword">const</span> source = <span class="hljs-keyword">new</span> EventSource(location.pathname + <span class="hljs-string">'?sse=on'</span>)
source.addEventListener(<span class="hljs-string">'message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ev</span>) </span>{
  <span class="hljs-keyword">let</span> data = {}
  <span class="hljs-keyword">try</span> {
    data = <span class="hljs-built_in">JSON</span>.parse(ev.data)
  } <span class="hljs-keyword">catch</span> (e) {}

  <span class="hljs-keyword">if</span> (data.type === <span class="hljs-string">'change'</span>) {
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.markdown-body'</span>).innerHTML = data.value
    <span class="hljs-keyword">const</span> node = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.markdown-body .detected-updated'</span>)
    <span class="hljs-keyword">if</span> (node) {
      <span class="hljs-comment">// 定位</span>
      node.scrollIntoView({ <span class="hljs-attr">behavior</span>: <span class="hljs-string">'smooth'</span> })
    }
  }
})</code></pre>
<p>同时注入高亮样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes bling {
  from {
    background-color: #d9edf7;
  }
  to {
    background-color: #d9edf7;
  }
}
.markdown-body .detected-updated {
  animation: bling 2.5s 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> bling {
  <span class="hljs-selector-tag">from</span> {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#d9edf7</span>;
  }
  <span class="hljs-selector-tag">to</span> {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#d9edf7</span>;
  }
}
<span class="hljs-selector-class">.markdown-body</span> <span class="hljs-selector-class">.detected-updated</span> {
  <span class="hljs-attribute">animation</span>: bling <span class="hljs-number">2.5s</span> <span class="hljs-number">1</span>;
}</code></pre>
<h2 id="articleHeader5">最后</h2>
<p>在 <a href="https://github.com/mdx-js/mdx" rel="nofollow noreferrer" target="_blank">mdx</a> 生态中，该功能也能够被使用，详见 <a href="https://github.com/imcuttle/detect-one-changed" rel="nofollow noreferrer" target="_blank">detect-one-changed</a></p>
<p>在 <a href="https://github.com/jxnblk/mdx-go/pull/22" rel="nofollow noreferrer" target="_blank">mdx-go</a> 和 <a href="https://github.com/pedronauck/docz/pull/433" rel="nofollow noreferrer" target="_blank">docz</a> 中都已经提供 PR 以引入该书写体验！等待作者的回复。</p>
<p>欢迎大家 Star :+1:！</p>
<ul>
<li>
<a href="https://github.com/imcuttle/live-markd" rel="nofollow noreferrer" target="_blank">live-markd</a> - GitHub markdown 风格本地实时书写 markdown + 同步定位修改节点</li>
<li>
<a href="https://github.com/imcuttle/detect-one-changed" rel="nofollow noreferrer" target="_blank">detect-one-changed</a> - Markdown / Html 修改检测</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
全新的同步渲染 markdown 文章 + 高亮更新 书写体验

## 原文链接
[https://segmentfault.com/a/1190000016829044](https://segmentfault.com/a/1190000016829044)

