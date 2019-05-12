---
title: 'VUWE——又一个移动端Vue2组件库' 
date: 2019-01-29 2:30:10
hidden: true
slug: et2zeyk0xho
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">VUWE</h1>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007938062?w=148&amp;h=118" src="https://static.alili.tech/img/remote/1460000007938062?w=148&amp;h=118" alt="LOGO" title="LOGO" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://vuwe.github.io/vuwe/#/" rel="nofollow noreferrer" target="_blank">在线预览</a></p>
<h1 id="articleHeader1">介绍</h1>
<p><code>VUWE</code>是一款基于微信<code>WeUI</code>所开发的，专用于<code>Vue2</code>的组件库。</p>
<p>它与<code>WeUI</code>完全解耦。用户通过自定义<code>WeUI</code>的样式文件，可以方便地对<code>VUWE</code>实现定制化。</p>
<p><a href="https://vuwe.github.io/vuwe/doc.html#/" rel="nofollow noreferrer" target="_blank">中文文档</a></p>
<h1 id="articleHeader2">使用</h1>
<p>进入一个<code>Vue</code>工程项目，然后执行以下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vuwe --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> vuwe <span class="hljs-comment">--save</span></code></pre>
<h3 id="articleHeader3">加载WeUI</h3>
<p>在开始之前，需要在<code>index.html</code>内加载<code>WeUI</code>样式库：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;/weui.min.css&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/weui.min.css"</span>&gt;</span></code></pre>
<h3 id="articleHeader4">全局引入</h3>
<p>进入工程入口js，写入下列语句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Vuwe from 'vuwe'

Vue.use(Vuwe)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuwe <span class="hljs-keyword">from</span> <span class="hljs-string">'vuwe'</span>

Vue.use(Vuwe)</code></pre>
<p>此时<code>VUWE</code>已经被全局注册，可以在需要的地方直接使用<code>VUWE</code>组件标签。</p>
<h3 id="articleHeader5">局部引入</h3>
<p>在需要引入<code>VUWE</code>组件的地方直接引入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { VwButton } from 'vuwe'

export default {
  components: {
    VwButton
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { VwButton } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuwe'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>: {
    VwButton
  }
}</code></pre>
<h1 id="articleHeader6">运行</h1>
<p>克隆项目、安装依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/vuwe/vuwe.git

cd vuwe &amp;&amp; npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/vuwe/vuwe.git

cd vuwe &amp;&amp; npm install</code></pre>
<p>开发模式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p>生产模式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre>
<p>示例模式（产出一个<code>index.html</code>文件，一个<code>app.js</code>文件）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build-demo" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> build-demo</span></code></pre>
<h1 id="articleHeader7">MIT</h1>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VUWE——又一个移动端Vue2组件库

## 原文链接
[https://segmentfault.com/a/1190000007938059](https://segmentfault.com/a/1190000007938059)

