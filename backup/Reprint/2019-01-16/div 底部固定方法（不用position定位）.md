---
title: 'div 底部固定方法（不用position定位）' 
date: 2019-01-16 2:30:07
hidden: true
slug: gamm8fcf9sq
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">方法一：全局增加一个负值下边距等于底部高度</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
html, body {
  height: 100%;
  margin: 0;
}
.content {
  padding: 20px;
  min-height: 100%;
  margin: 0 auto -50px;
}
.footer,.push {
  height: 50px;
}
</style>
<div class=&quot;content&quot;>
  <h1>Sticky Footer with Negative Margin 1</h1>
  <p><button id=&quot;add&quot;>Add Content</button></p>
  <div class=&quot;push&quot;></div>
</div>
<footer class=&quot;footer&quot;>Footer </footer>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.content</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto -<span class="hljs-number">50px</span>;
}
<span class="hljs-selector-class">.footer</span>,<span class="hljs-selector-class">.push</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Sticky Footer with Negative Margin 1<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"add"</span>&gt;</span>Add Content<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"push"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">footer</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer"</span>&gt;</span>Footer <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span></code></pre>
<h2 id="articleHeader1">方法二：底部元素增加负值上边距</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
html, body {
  height: 100%;
  margin: 0;
}
.content {
  min-height: 100%;
}
.content-inside {
  padding: 20px;
  padding-bottom: 50px;
}
.footer {
  height: 50px;
  margin-top: -50px;
}
body {
  font: 16px Sans-Serif;
}
h1 {
  margin: 0 0 20px 0;
}
p {
  margin: 20px 0 0 0;
}
footer {
  background: #42A5F5;
  color: white;
  line-height: 50px;
  padding: 0 20px;
}
</style>
<div class=&quot;content&quot;>
  <div class=&quot;content-inside&quot;>
    <h1>Sticky Footer with Negative Margin 2</h1>
    <p><button id=&quot;add&quot;>Add Content</button></p>
  </div>
</div>
<footer class=&quot;footer&quot;> Footer </footer>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.content</span> {
  <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.content-inside</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">padding-bottom</span>: <span class="hljs-number">50px</span>;
}
<span class="hljs-selector-class">.footer</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">50px</span>;
}
<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">font</span>: <span class="hljs-number">16px</span> Sans-Serif;
}
<span class="hljs-selector-tag">h1</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">20px</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-tag">footer</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#42A5F5</span>;
  <span class="hljs-attribute">color</span>: white;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">20px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content-inside"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Sticky Footer with Negative Margin 2<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"add"</span>&gt;</span>Add Content<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">footer</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer"</span>&gt;</span> Footer <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span></code></pre>
<h2 id="articleHeader2">方法三：使用calc()计算内容的高度</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
.content {
  min-height: calc(100vh - 70px);
  padding: 40px 40px 0 40px;
}
.footer {
  height: 50px;
}
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font: 16px Sans-Serif;
}
h1 {
  margin: 0 0 20px 0;
}
p {
  margin: 0 0 20px 0;
}
footer {
  background: #42A5F5;
  color: white;
  line-height: 50px;
  padding: 0 20px;
}
</style>
<div class=&quot;content&quot;>
  <h1>Sticky Footer with calc()</h1>
  <p><button id=&quot;add&quot;>Add Content</button></p>
</div>
<footer class=&quot;footer&quot;> Footer </footer>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.content</span> {
  <span class="hljs-attribute">min-height</span>: <span class="hljs-built_in">calc</span>(100vh - 70px);
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">40px</span> <span class="hljs-number">40px</span> <span class="hljs-number">0</span> <span class="hljs-number">40px</span>;
}
<span class="hljs-selector-class">.footer</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
}
* {
  <span class="hljs-attribute">box-sizing</span>: border-box;
}
<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">font</span>: <span class="hljs-number">16px</span> Sans-Serif;
}
<span class="hljs-selector-tag">h1</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">20px</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">20px</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-tag">footer</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#42A5F5</span>;
  <span class="hljs-attribute">color</span>: white;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">20px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Sticky Footer with calc()<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"add"</span>&gt;</span>Add Content<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">footer</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer"</span>&gt;</span> Footer <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span></code></pre>
<h2 id="articleHeader3">方法四：使用flexbox</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
html {
  height: 100%;
}
body {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  padding: 20px;
}
.footer {
  padding: 20px;
}
</style>
<div class=&quot;content&quot;>
  <h1>Sticky Footer with Flexbox</h1>
  <p><button id=&quot;add&quot;>Add Content</button></p>
</div>

<footer class=&quot;footer&quot;>Footer </footer>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">html</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-direction</span>: column;
}
<span class="hljs-selector-class">.content</span> {
  <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.footer</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Sticky Footer with Flexbox<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"add"</span>&gt;</span>Add Content<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">footer</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer"</span>&gt;</span>Footer <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span></code></pre>
<h2 id="articleHeader4">方法五：使用grid布局</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
html {
  height: 100%;
}
body {
  min-height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
}
.content {
  padding: 20px;
}
.footer {
  grid-row-start: 2;
  grid-row-end: 3;
}
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font: 16px Sans-Serif;
}
h1 {
  margin: 0 0 20px 0;
}
p {
  margin: 0 0 20px 0;
}
.footer {
  background: #42A5F5;
  color: white;
  padding: 20px;
}
</style>
<div class=&quot;content&quot;>
  <h1>Sticky Footer with Grid</h1>
  <p><button id=&quot;add&quot;>Add Content</button></p>
</div>
<footer class=&quot;footer&quot;>Footer</footer>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">html</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">display</span>: grid;
  <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">1</span>fr auto;
}
<span class="hljs-selector-class">.content</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.footer</span> {
  <span class="hljs-attribute">grid-row-start</span>: <span class="hljs-number">2</span>;
  <span class="hljs-attribute">grid-row-end</span>: <span class="hljs-number">3</span>;
}
* {
  <span class="hljs-attribute">box-sizing</span>: border-box;
}
<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">font</span>: <span class="hljs-number">16px</span> Sans-Serif;
}
<span class="hljs-selector-tag">h1</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">20px</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">20px</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.footer</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#42A5F5</span>;
  <span class="hljs-attribute">color</span>: white;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Sticky Footer with Grid<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"add"</span>&gt;</span>Add Content<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">footer</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer"</span>&gt;</span>Footer<span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
div 底部固定方法（不用position定位）

## 原文链接
[https://segmentfault.com/a/1190000009200940](https://segmentfault.com/a/1190000009200940)

