---
title: 'Vue 字符串模板 dom模板' 
date: 2018-11-30 2:30:12
hidden: true
slug: 3ijbeiu2oqh
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">Vue中的字符串模板</h3>
<h5>1、HTML模板和字符串模板</h5>
<p>HTML模板(dom模板)：直接在HTML页面挂载的模板,就是原先写在页面上的，能被浏览器识别的HTML结构，会在一加载就被浏览器渲染，然后js获取dom节点的内容，&nbsp;形成dom模板。（即非字符串模板）<br>字符串模板：可能原先放在服务器上的，script标签或者js的字符串里，原先不参与页面渲染的一串字符。</p>
<h5>2、Props属性：HTML 特性是不区分大小写的。所以，当使用的不是字符串模板时，camelCase (驼峰式命名) 的 props属性需要转换为相对应的 kebab-case (短横线分隔式命名)：</h5>
<p><code>（1）、HTML模板：</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('child', {
// 在 JavaScript 中使用 camelCase
props: ['myMessage'],
template: '<span>"{{" myMessage "}}"</span>'
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>Vue.component(<span class="hljs-string">'child'</span>, {
<span class="hljs-comment">// 在 JavaScript 中使用 camelCase</span>
<span class="hljs-string">props:</span> [<span class="hljs-string">'myMessage'</span>],
<span class="hljs-string">template:</span> <span class="hljs-string">'&lt;span&gt;"{{" myMessage "}}"&lt;/span&gt;'</span>
})
</code></pre>
<p><code>（2）、字符串模板：</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 在 HTML 中使用kebab-case -->
<child my-message=&quot;hello!&quot;></child>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 在 HTML 中使用kebab-case --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">my-message</span>=<span class="hljs-string">"hello!"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
</code></pre>
<h5>3、组件名大小写：</h5>
<p><strong>注意：当直接在 DOM 中使用一个组件 (而不是在字符串模板或单文件组件) 的时候，我们强烈推荐遵循 W3C 规范中的自定义组件名 (字母全小写且必须包含一个连字符)。这会帮助你避免和当前以及未来的 HTML 元素相冲突。</strong></p>
<p><code>(1)、使用 kebab-case:</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('my-component-name', { /* ... */ });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.component</span>(<span class="hljs-string">'my-component-name'</span>, { <span class="hljs-comment">/* ... */</span> });
</code></pre>
<p>当使用 kebab-case (短横线分隔命名) 定义一个组件时，你也必须在引用这个自定义元素时使用 kebab-case，例如 &lt;my-component-name&gt;。</p>
<p><code>(2)、使用 PascalCase:</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('MyComponentName', { /* ... */ })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.component</span>(<span class="hljs-string">'MyComponentName'</span>, { <span class="hljs-comment">/* ... */</span> })
</code></pre>
<p>当使用 PascalCase (驼峰式命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也就是说 &lt;my-component-name&gt; 和 &lt;MyComponentName&gt; 都是可接受的。<code>注意，尽管如此，直接在 DOM (即非字符串的模板，如：在单个组件的&lt;template&gt;&lt;/template&gt;中 或者 index.html中直接CDN引入vue.js的&lt;div id="app"&gt;&lt;/div&gt;中) 使用时只有 kebab-case 是有效的，使用驼峰式，是不会渲染的。</code></p>
<p><span class="img-wrap"><img data-src="/img/bVbaK1H?w=774&amp;h=1026" src="https://static.alili.tech/img/bVbaK1H?w=774&amp;h=1026" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 字符串模板 dom模板

## 原文链接
[https://segmentfault.com/a/1190000014888725](https://segmentfault.com/a/1190000014888725)

