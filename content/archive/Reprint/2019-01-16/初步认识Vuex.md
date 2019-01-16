---
title: '初步认识Vuex' 
date: 2019-01-16 2:30:08
hidden: true
slug: 3sgaai0ekfp
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">初识Vuex</h2>
<blockquote><p>1.Vuex是什么？</p></blockquote>
<ul>
<li><p>学院派：<code>Vuex</code> 是一个专为 <code>Vue.js</code> 应用程序开发的<strong>状态</strong>管理模式；<strong>集中存储</strong>和<strong>管理</strong>应用的<strong>所有组件状态</strong>。</p></li>
<li><p><em>理解</em>：以上这4个词是我们理解的关键。<strong>状态</strong>：什么是状态，我们可以通俗的理解为数据。<a href="https://cn.vuejs.org/v2/guide/#Vue-js-%E6%98%AF%E4%BB%80%E4%B9%88" rel="nofollow noreferrer" target="_blank">Vue只关心视图层</a>，那么视图的状态如何来确定？我们知道是通过数据驱动，这里的状态管理可以简单理解为管理数据。<strong>集中存储</strong>：<code>Vue</code>只关心视图，那么我们需要一个仓库（<code>Store</code>）来存储数据，而且是所有的数据集中存储，视图和数据就可以分析。<strong>管理</strong>：除了存储，还可以管理数据，也就是计算、处理数据。<strong>所有组件状态</strong>：所用的组件共用一个仓库（<code>Store</code>），也就是一个项目只有一个数据源（区分模块<code>modules</code>）。</p></li>
<li><p><em>总结</em>：<strong>Vuex就是在一个项目中，提供唯一的管理数据源的仓库。</strong></p></li>
</ul>
<blockquote><p>2.有什么用？使用场景？</p></blockquote>
<ul>
<li><p>场景一：处理<strong>多组件依赖于同一个数据</strong>，例如有柱状图和条形图两个组件都是展示的同一数据；</p></li>
<li><p>场景二： <strong>一个组件的行为——改变数据——影响另一个组件的视图</strong>，其实也就是公用依赖的数据；</p></li>
<li><p><code>Vuex</code>将组件公用数据抽离，在一个公共仓库管理，使得各个组件容易获取（<code>getter</code>）数据，也容易设置数据（<code>setter</code>）。</p></li>
</ul>
<blockquote><p>3.源码初览</p></blockquote>
<ul><li><p>这是<code>Vuex</code>的源码文件，总共包含五大部分，<code>Plugins</code>两个注入文件，核心文件<code>index</code>，帮组文档<code>helper</code>，工具文件<code>util.js</code></p></li></ul>
<ul>
<li><p><span class="img-wrap"><img data-src="/img/bVMkws?w=1278&amp;h=685" src="https://static.alili.tech/img/bVMkws?w=1278&amp;h=685" alt="Vuex源码结构" title="Vuex源码结构" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>我们先看看<code>Index.js</code>文件<code>export</code>的框架，后面具体分析。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     export default {
         Store,   
         install,
         mapState,
         mapMutations,
         mapGetters,
         mapActions
                     }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code>     <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
         <span class="hljs-type">Store</span>,   
         install,
         mapState,
         mapMutations,
         mapGetters,
         mapActions
                     }</code></pre>
<blockquote><p>后面文章分析<code>Store</code>仓库。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
初步认识Vuex

## 原文链接
[https://segmentfault.com/a/1190000009096457](https://segmentfault.com/a/1190000009096457)

