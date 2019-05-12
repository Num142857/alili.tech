---
title: 'Muse UI — 基于 Vue2.0 的 Material Design UI 库' 
date: 2019-01-31 2:31:16
hidden: true
slug: eydwczesyv
categories: [reprint]
---

{{< raw >}}

                    
<p>Vue 2.0 发布以来，很多 vue 的开源项目都开始了升级计划，我也思考着 <code>vue-carbon</code> 的升级之路，9月开工，11月完工， <a href="https://museui.github.io/" rel="nofollow noreferrer" target="_blank">Muse UI</a> 闪亮登场。</p>
<h2 id="articleHeader0">先睹为快</h2>
<p>Muse UI 主要用于移动端和一些对浏览器兼容性要求不高的桌面端应用，先上地址:</p>
<p><a href="https://github.com/museui/muse-ui" rel="nofollow noreferrer" target="_blank">https://github.com/museui/muse-ui</a></p>
<p>官网和文档在这：</p>
<p><a href="https://museui.github.io/" rel="nofollow noreferrer" target="_blank">https://museui.github.io/</a></p>
<h2 id="articleHeader1">特性</h2>
<ul>
<li><p>基于 vue2.0 开发</p></li>
<li><p>组件丰富</p></li>
<li><p>丰富的主题，支持自定义主题</p></li>
<li><p>可以很好的配合 vue 的其它插件vue-router , vue-validator 使用</p></li>
<li><p>友好的 API</p></li>
</ul>
<h2 id="articleHeader2">使用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install muse-ui --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install muse-ui --save</code></pre>
<h3 id="articleHeader3">完整引入</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> MuseUI <span class="hljs-keyword">from</span> <span class="hljs-string">'muse-ui'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'muse-ui/dist/muse-ui.css'</span>
Vue.use(MuseUI)</code></pre>
<h3 id="articleHeader4">按需引入</h3>
<p>首先需要需要修改 <code>webpack</code> 的配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  // ...
  module: {
    loaders: [
      {
        test: /muse-ui.src.*?js$/,
        loader: 'babel'
      }
    ]
  },
  resolve: {
    // ...
    alias: {
      'muse-components': 'muse-ui/src'
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-comment">// ...</span>
  <span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/muse-ui.src.*?js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>
      }
    ]
  },
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-comment">// ...</span>
    alias: {
      <span class="hljs-string">'muse-components'</span>: <span class="hljs-string">'muse-ui/src'</span>
    }
  }
}</code></pre>
<p><code>main.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import 'muse-components/style/base.less' // 全局样式包含 normalize.css
import appbar from 'muse-components/appbar'
import avatar from 'muse-components/avatar'
import {bottomNav, bottomNavItem} from 'muse-components/bottomNav'
import {retina} from 'muse-components/utils'

retina() // 1px 处理方案

// ...
Vue.component(appbar.name, appbar)
Vue.component(avatar.name, avatar)
Vue.component(bottomNav.name, bottomNav)
Vue.component(bottomNavItem.name, bottomNavItem)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'muse-components/style/base.less'</span> <span class="hljs-comment">// 全局样式包含 normalize.css</span>
<span class="hljs-keyword">import</span> appbar <span class="hljs-keyword">from</span> <span class="hljs-string">'muse-components/appbar'</span>
<span class="hljs-keyword">import</span> avatar <span class="hljs-keyword">from</span> <span class="hljs-string">'muse-components/avatar'</span>
<span class="hljs-keyword">import</span> {bottomNav, bottomNavItem} <span class="hljs-keyword">from</span> <span class="hljs-string">'muse-components/bottomNav'</span>
<span class="hljs-keyword">import</span> {retina} <span class="hljs-keyword">from</span> <span class="hljs-string">'muse-components/utils'</span>

retina() <span class="hljs-comment">// 1px 处理方案</span>

<span class="hljs-comment">// ...</span>
Vue.component(appbar.name, appbar)
Vue.component(avatar.name, avatar)
Vue.component(bottomNav.name, bottomNav)
Vue.component(bottomNavItem.name, bottomNavItem)</code></pre>
<h3 id="articleHeader5">示例 bottomNav 的使用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
 <mu-bottom-nav :value=&quot;bottomNav&quot; shift @change=&quot;handleChange&quot;>
    <mu-bottom-nav-item value=&quot;movies&quot; title=&quot;Movies&quot; icon=&quot;ondemand_video&quot;/>
    <mu-bottom-nav-item value=&quot;music&quot; title=&quot;Music&quot; icon=&quot;music_note&quot;/>
    <mu-bottom-nav-item value=&quot;books&quot; title=&quot;Books&quot; icon=&quot;books&quot;/>
    <mu-bottom-nav-item value=&quot;pictures&quot; title=&quot;Pictures&quot; icon=&quot;photo&quot;/>
</mu-bottom-nav>
</template>
<script>
export default {
  data () {
    return {
      bottomNav: 'movies'
    }
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">mu-bottom-nav</span> <span class="hljs-attr">:value</span>=<span class="hljs-string">"bottomNav"</span> <span class="hljs-attr">shift</span> @<span class="hljs-attr">change</span>=<span class="hljs-string">"handleChange"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">mu-bottom-nav-item</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"movies"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"Movies"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"ondemand_video"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">mu-bottom-nav-item</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"music"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"Music"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"music_note"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">mu-bottom-nav-item</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"books"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"Books"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"books"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">mu-bottom-nav-item</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"pictures"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"Pictures"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"photo"</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">mu-bottom-nav</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">bottomNav</span>: <span class="hljs-string">'movies'</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    handleChange (val) {
      <span class="hljs-keyword">this</span>.bottomNav = val
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVFvQX?w=375&amp;h=169" src="https://static.alili.tech/img/bVFvQX?w=375&amp;h=169" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">关于 Muse</h2>
<p>为了配合Vue 2.0 改变了 <code>vue-carbon</code> 许多的 API，新增了许多的组件，由于改变的太多，于是更名为 Muse UI，做为一个全新的 UI 框架。</p>
<p><code>Muse</code> 取自于古希腊神话中的女神，掌管科学与艺术。我希望 <code>Muse</code> 和 <code>Vue</code> 一样能将科学与艺术完美的结合。</p>
<h2 id="articleHeader7">后续的工作</h2>
<p>为了跟随 Vue 2.0, Muse 以 2.0 版本为基础，现在是 <code>alpha</code> 版，后续会不断完善。</p>
<ul>
<li><p>修复现有的问题和合理化API</p></li>
<li><p>增加单元测试</p></li>
<li><p>增加更多快捷操作的api (简单的消息提示，alert, confirm 等等)</p></li>
<li><p>增加其它的功能性组件（Notification, Pagination 等等）</p></li>
<li><p>开发 weex 版的 muse</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Muse UI — 基于 Vue2.0 的 Material Design UI 库

## 原文链接
[https://segmentfault.com/a/1190000007471546](https://segmentfault.com/a/1190000007471546)

