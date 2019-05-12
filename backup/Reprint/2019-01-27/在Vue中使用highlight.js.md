---
title: '在Vue中使用highlight.js' 
date: 2019-01-27 2:31:00
hidden: true
slug: 37ldv13rhb2
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://cheerego.github.io/2017/01/21/%E5%9C%A8Vue%E4%B8%AD%E4%BD%BF%E7%94%A8highlight.js/" rel="nofollow noreferrer" target="_blank">https://cheerego.github.io/20...</a></p></blockquote>
<p><strong>通过自定义指令的方式来实现在Vue中实现语法高亮</strong></p>
<h1 id="articleHeader0">问题</h1>
<p>highlight.js如果在Vue中使用，这个问题一直困扰着我，而highlight.js的使用说明太过于简单，完全不知道怎么使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 完全是一脸懵B的，而且不管经过怎么使用都无法实现代码高亮的效果
<link rel=&quot;stylesheet&quot; href=&quot;/path/to/styles/default.css&quot;>
<script src=&quot;/path/to/highlight.pack.js&quot;></script>
<script>hljs.initHighlightingOnLoad();</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// 完全是一脸懵B的，而且不管经过怎么使用都无法实现代码高亮的效果
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/path/to/styles/default.css"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/path/to/highlight.pack.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined">hljs.initHighlightingOnLoad();</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在<code>highlight.js</code>的Usage有这么一个方法我觉得我使用得到的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  $(<span class="hljs-string">'pre code'</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i, block</span>) </span>{
    hljs.highlightBlock(block);
  });
});</code></pre>
<h1 id="articleHeader1">实现</h1>
<h2 id="articleHeader2">安装</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install highlight.js " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install highlight.js </code></pre>
<h2 id="articleHeader3">编码</h2>
<p><a href="https://cn.vuejs.org/v2/guide/custom-directive.html" rel="nofollow noreferrer" target="_blank">Vue自定义指令 文档</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Vue-cli生成的工程文件的src/main.js
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css' //样式文件
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// Vue-cli生成的工程文件的src/main.js</span>
<span class="hljs-keyword">import</span> hljs <span class="hljs-keyword">from</span> <span class="hljs-string">'highlight.js'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'highlight.js/styles/googlecode.css'</span> <span class="hljs-comment">//样式文件</span>
Vue.directive(<span class="hljs-string">'highlight'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el</span>) </span>{
  <span class="hljs-keyword">let</span> blocks = el.querySelectorAll(<span class="hljs-string">'pre code'</span>);
  blocks.forEach(<span class="hljs-function">(<span class="hljs-params">block</span>)=&gt;</span>{
    hljs.highlightBlock(block)
  })
})</code></pre>
<h2 id="articleHeader4">使用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p v-html=&quot;markdownhtml&quot; v-highlight></p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;">&lt;p v-html=<span class="hljs-string">"markdownhtml"</span> v-highlight&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span></code></pre>
<p>到这里我们就打工告成了。</p>
<h1 id="articleHeader5">封装成插件</h1>
<h2 id="articleHeader6">编写插件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// highlight.js
import Vue from 'vue'
import Hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
let Highlight = {}
Highlight.install = function (Vue, options) {
  Vue.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
      Hljs.highlightBlock(block)
    })
  })
}
export default Highlight" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// highlight.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Hljs <span class="hljs-keyword">from</span> <span class="hljs-string">'highlight.js'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'highlight.js/styles/googlecode.css'</span>
<span class="hljs-keyword">let</span> Highlight = {}
Highlight.install = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Vue, options</span>) </span>{
  Vue.directive(<span class="hljs-string">'highlight'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el</span>) </span>{
    <span class="hljs-keyword">let</span> blocks = el.querySelectorAll(<span class="hljs-string">'pre code'</span>);
    blocks.forEach(<span class="hljs-function">(<span class="hljs-params">block</span>) =&gt;</span> {
      Hljs.highlightBlock(block)
    })
  })
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Highlight</code></pre>
<h2 id="articleHeader7">使用插件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Highlight from 'path/to/Highlight.js'
Vue.use(Highlight)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> Highlight <span class="hljs-keyword">from</span> <span class="hljs-string">'path/to/Highlight.js'</span>
Vue.use(Highlight)</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在Vue中使用highlight.js

## 原文链接
[https://segmentfault.com/a/1190000008188461](https://segmentfault.com/a/1190000008188461)

