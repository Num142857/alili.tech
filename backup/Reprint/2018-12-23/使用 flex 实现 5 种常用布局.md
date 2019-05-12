---
title: '使用 flex 实现 5 种常用布局' 
date: 2018-12-23 2:30:07
hidden: true
slug: f93l2wylvht
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://github.com/meikidd/flex-layout" rel="nofollow noreferrer" target="_blank">原文链接</a></p>
<h2 id="articleHeader0">Sticky Footer</h2>
<p>经典的上-中-下布局。</p>
<p>当页面内容高度小于可视区域高度时，footer 吸附在底部；当页面内容高度大于可视区域高度时，footer 被撑开排在 content 下方</p>
<p><a href="http://meikidd.github.io/flex-layout/demos/1.html" rel="nofollow noreferrer" target="_blank">demo link</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012219127?w=1536&amp;h=1152" src="https://static.alili.tech/img/remote/1460000012219127?w=1536&amp;h=1152" alt="demo 1 - Sticky Footer" title="demo 1 - Sticky Footer" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
  <header>HEADER</header>
  <article>CONTENT</article>
  <footer>FOOTER</footer>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>HEADER<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">article</span>&gt;</span>CONTENT<span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>FOOTER<span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
article {
  flex: auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100vh</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-direction</span>: column;
}
<span class="hljs-selector-tag">article</span> {
  <span class="hljs-attribute">flex</span>: auto;
}</code></pre>
<h2 id="articleHeader1">Fixed-Width Sidebar</h2>
<p>在上-中-下布局的基础上，加了左侧定宽 sidebar。</p>
<p><a href="http://meikidd.github.io/flex-layout/demos/2.html" rel="nofollow noreferrer" target="_blank">demo link</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012219128?w=1536&amp;h=1152" src="https://static.alili.tech/img/remote/1460000012219128?w=1536&amp;h=1152" alt="demo 2 - Fixed-Width Sidebar" title="demo 2 - Fixed-Width Sidebar" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
  <header>HEADER</header>
  <div class=&quot;content&quot;>
    <aside>ASIDE</aside>
    <article>CONTENT</article>
  </div>
  <footer>FOOTER</footer>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>HEADER<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">aside</span>&gt;</span>ASIDE<span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">article</span>&gt;</span>CONTENT<span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>FOOTER<span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  flex: auto;
  display: flex;
}
.content article {
  flex: auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100vh</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-direction</span>: column;
}
<span class="hljs-selector-class">.content</span> {
  <span class="hljs-attribute">flex</span>: auto;
  <span class="hljs-attribute">display</span>: flex;
}
<span class="hljs-selector-class">.content</span> <span class="hljs-selector-tag">article</span> {
  <span class="hljs-attribute">flex</span>: auto;
}</code></pre>
<h2 id="articleHeader2">Sidebar</h2>
<p>左边是定宽 sidebar，右边是上-中-下布局。</p>
<p><a href="http://meikidd.github.io/flex-layout/demos/3.html" rel="nofollow noreferrer" target="_blank">demo link</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012219129?w=1536&amp;h=1152" src="https://static.alili.tech/img/remote/1460000012219129?w=1536&amp;h=1152" alt="demo 3" title="demo 3" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
  <aside>ASIDE</aside>
  <div class=&quot;content&quot;>
    <header>HEADER</header>
    <article>CONTENT</article>
    <footer>FOOTER</footer>
  </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">aside</span>&gt;</span>ASIDE<span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>HEADER<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">article</span>&gt;</span>CONTENT<span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>FOOTER<span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  min-height: 100vh;
  display: flex;
}
aside {
  flex: none;
}
.content {
  flex: auto;
  display: flex;
  flex-direction: column;
}
.content article {
  flex: auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100vh</span>;
  <span class="hljs-attribute">display</span>: flex;
}
<span class="hljs-selector-tag">aside</span> {
  <span class="hljs-attribute">flex</span>: none;
}
<span class="hljs-selector-class">.content</span> {
  <span class="hljs-attribute">flex</span>: auto;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-direction</span>: column;
}
<span class="hljs-selector-class">.content</span> <span class="hljs-selector-tag">article</span> {
  <span class="hljs-attribute">flex</span>: auto;
}</code></pre>
<h2 id="articleHeader3">Sticky Header</h2>
<p>还是上-中-下布局，区别是 header 固定在顶部，不会随着页面滚动。</p>
<p><a href="http://meikidd.github.io/flex-layout/demos/4.html" rel="nofollow noreferrer" target="_blank">demo link</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012219130?w=1528&amp;h=1142" src="https://static.alili.tech/img/remote/1460000012219130?w=1528&amp;h=1142" alt="demo 4 - Sticky Header" title="demo 4 - Sticky Header" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
  <header>HEADER</header>
  <article>CONTENT</article>
  <footer>FOOTER</footer>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>HEADER<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">article</span>&gt;</span>CONTENT<span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>FOOTER<span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
}
header {
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0;
}
article {
  flex: auto;
  height: 1000px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100vh</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-direction</span>: column;
  <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">60px</span>;
}
<span class="hljs-selector-tag">header</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
  <span class="hljs-attribute">position</span>: fixed;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-tag">article</span> {
  <span class="hljs-attribute">flex</span>: auto;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">1000px</span>;
}</code></pre>
<h2 id="articleHeader4">Sticky Sidebar</h2>
<p>左侧 sidebar 固定在左侧且与视窗同高，当内容超出视窗高度时，在 sidebar 内部出现滚动条。左右两侧滚动条互相独立。</p>
<p><a href="http://meikidd.github.io/flex-layout/demos/5.html" rel="nofollow noreferrer" target="_blank">demo link</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012219131?w=1536&amp;h=1152" src="https://static.alili.tech/img/remote/1460000012219131?w=1536&amp;h=1152" alt="demo 5 - Sticky Sidebar" title="demo 5 - Sticky Sidebar" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
  <aside>
    ASIDE
    <p>item</p>
    <p>item</p>
    <!-- many items -->
    <p>item</p>
  </aside>
  <div class=&quot;content&quot;>
    <header>HEADER</header>
    <article>CONTENT</article>
    <footer>FOOTER</footer>
  </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">aside</span>&gt;</span>
    ASIDE
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>item<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>item<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- many items --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>item<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>HEADER<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">article</span>&gt;</span>CONTENT<span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>FOOTER<span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  height: 100vh;
  display: flex;
}
aside {
  flex: none;
  width: 200px;
  overflow-y: auto;
  display: block;
}
.content {
  flex: auto;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.content article {
  flex: auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
  <span class="hljs-attribute">display</span>: flex;
}
<span class="hljs-selector-tag">aside</span> {
  <span class="hljs-attribute">flex</span>: none;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">overflow-y</span>: auto;
  <span class="hljs-attribute">display</span>: block;
}
<span class="hljs-selector-class">.content</span> {
  <span class="hljs-attribute">flex</span>: auto;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-direction</span>: column;
  <span class="hljs-attribute">overflow-y</span>: auto;
}
<span class="hljs-selector-class">.content</span> <span class="hljs-selector-tag">article</span> {
  <span class="hljs-attribute">flex</span>: auto;
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 flex 实现 5 种常用布局

## 原文链接
[https://segmentfault.com/a/1190000012275086](https://segmentfault.com/a/1190000012275086)

