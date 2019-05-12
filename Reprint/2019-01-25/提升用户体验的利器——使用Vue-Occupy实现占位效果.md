---
title: '提升用户体验的利器——使用Vue-Occupy实现占位效果' 
date: 2019-01-25 2:30:24
hidden: true
slug: a66ddf878b
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVJSeN?w=320&amp;h=292" src="https://static.alili.tech/img/bVJSeN?w=320&amp;h=292" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>项目地址：<a href="https://github.com/jrainlau/vue-occupy" rel="nofollow noreferrer" target="_blank">https://github.com/jrainlau/v...</a><br>DEMO：<a href="https://jrainlau.github.io/vue-occupy/" rel="nofollow noreferrer" target="_blank">https://jrainlau.github.io/vu...</a></p>
<h1 id="articleHeader0">介绍</h1>
<p><code>Vue-Occupy</code>是一个vue指令，能够在数据被加载之前使用一个可配置的色块进行占位，能够有效提升用户体验。</p>
<h1 id="articleHeader1">安装</h1>
<p>使用<code>yarn</code>或者<code>npm</code>的方式进行安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# yarn
yarn add vue-occupy

# npm
npm install vue-occupy" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code><span class="hljs-comment"># yarn</span>
yarn <span class="hljs-keyword">add</span><span class="bash"> vue-occupy
</span>
<span class="hljs-comment"># npm</span>
npm install vue-occupy</code></pre>
<h1 id="articleHeader2">使用</h1>
<p>进入项目入口文件，添加以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VueOccupy from 'vue-occupy'

Vue.use(VueOccupy)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> VueOccupy <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-occupy'</span>

Vue.use(VueOccupy)</code></pre>
<p>这样，<code>vue-occupy</code>已经被注册为一个全局的指令，你可以在任意<code>.vue</code>文件里面通过<code>v-occupy</code>使用。</p>
<h1 id="articleHeader3">参数</h1>
<table>
<thead><tr>
<th>参数</th>
<th>类型</th>
<th>描述</th>
<th>是否必须</th>
</tr></thead>
<tbody>
<tr>
<td>data</td>
<td>{Object}</td>
<td>将要绑定在节点上的数据</td>
<td>Yes</td>
</tr>
<tr>
<td>config</td>
<td>{Object}</td>
<td>占位色块的配置项</td>
<td>No</td>
</tr>
</tbody>
</table>
<p>举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot; style=&quot;width:200px;height:50px;&quot;>
    <div v-occupy=&quot;{ data: content, config }&quot;></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: '',
      config: {
        width: '200px',
        height: '18px',
        background: '#ddd'
      }
    }
  },
  mounted () {
    fetch(url).then((result) => {
      this.content = result
    })
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:200px;height:50px;"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-occupy</span>=<span class="hljs-string">"{ data: content, config }"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">content</span>: <span class="hljs-string">''</span>,
      <span class="hljs-attr">config</span>: {
        <span class="hljs-attr">width</span>: <span class="hljs-string">'200px'</span>,
        <span class="hljs-attr">height</span>: <span class="hljs-string">'18px'</span>,
        <span class="hljs-attr">background</span>: <span class="hljs-string">'#ddd'</span>
      }
    }
  },
  mounted () {
    fetch(url).then(<span class="hljs-function">(<span class="hljs-params">result</span>) =&gt;</span> {
      <span class="hljs-keyword">this</span>.content = result
    })
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在<code>fetch</code>方法返回数据之前，<code>&lt;div v-occupy="{ data: content, config }"&gt;&lt;/div&gt;</code>这个节点会被一个矩形色块所占据。当数据被成功返回后，色块将会被替换成<code>content</code>的内容。</p>
<p><strong>注意：</strong><code>vue-occupy</code>的默认配置项是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  width: 100%; 
  height: 100%; 
  background: #eee
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>; 
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>; 
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>
}</code></pre>
<p>经过<code>vue-occupy</code>处理的节点会变成下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-occupy=&quot;{ data: content, config }&quot;>
  <div style=&quot;width: 100%; height: 100%; background: #eee;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;div v-occupy="{ data: content, config }"&gt;</span>
  <span class="hljs-section">&lt;div style="width: 100%; height: 100%; background: #eee;&gt;</span><span class="hljs-section">&lt;/div&gt;</span>
<span class="hljs-section">&lt;/div&gt;</span></code></pre>
<p>这意味着，你<strong>必须</strong>设置具体的<code>width</code>和<code>height</code>于你使用了<code>v-occupy</code>的节点，又或者你可以通过自定义配置项来覆盖默认的样式。</p>
<h1 id="articleHeader4">证书</h1>
<p>MIT</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
提升用户体验的利器——使用Vue-Occupy实现占位效果

## 原文链接
[https://segmentfault.com/a/1190000008511102](https://segmentfault.com/a/1190000008511102)

