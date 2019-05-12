---
title: '【vuejs插件】vue中使用图片懒加载vue-lazyload插件详细指南' 
date: 2018-12-28 2:30:10
hidden: true
slug: ogemo59eaja
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">在vue中使用图片懒加载详细指南</h1>
<h2 id="articleHeader1">说明</h2>
<blockquote><p>当网络请求比较慢的时候,提前给这张图片添加一个像素比较低的占位图片，不至于堆叠在一块，或显示大片空白，让用户体验更好一点。</p></blockquote>
<h2 id="articleHeader2">使用方式</h2>
<p>使用vue的 vue-lazyload 插件<br>插件地址:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://www.npmjs.com/package/vue-lazyload
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>https:<span class="hljs-regexp">//</span>www.npmjs.com<span class="hljs-regexp">/package/</span>vue-lazyload
</code></pre>
<h2 id="articleHeader3">案例</h2>
<p>demo： <a href="http://hilongjw.github.io/vue-lazyload/" rel="nofollow noreferrer" target="_blank">懒加载案例demo</a></p>
<h1 id="articleHeader4">Installation 安装方式</h1>
<h2 id="articleHeader5">npm</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
$ npm i vue-lazyload -D
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">
$ npm i vue-lazyload -D
</code></pre>
<h2 id="articleHeader6">CDN</h2>
<p>CDN: <a href="https://unpkg.com/vue-lazyload/vue-lazyload.js" rel="nofollow noreferrer" target="_blank">https://unpkg.com/vue-lazyload/vue-lazyload.js</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://unpkg.com/vue-lazyload/vue-lazyload.js&quot;></script>
<script>
  Vue.use(VueLazyload)
  ...
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue-lazyload/vue-lazyload.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined">
  Vue.use(VueLazyload)
  ...
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h1 id="articleHeader7">用法</h1>
<p>main.js 在入口文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'  //引入这个懒加载插件

Vue.use(VueLazyload)

// 或者添加VueLazyload 选项
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
})

new Vue({
  el: 'body',
  components: {
    App
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span>
<span class="hljs-keyword">import</span> VueLazyload <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-lazyload'</span>  <span class="hljs-comment">//引入这个懒加载插件</span>

Vue.use(VueLazyload)

<span class="hljs-comment">// 或者添加VueLazyload 选项</span>
Vue.use(VueLazyload, {
  <span class="hljs-attr">preLoad</span>: <span class="hljs-number">1.3</span>,
  <span class="hljs-attr">error</span>: <span class="hljs-string">'dist/error.png'</span>,
  <span class="hljs-attr">loading</span>: <span class="hljs-string">'dist/loading.gif'</span>,
  <span class="hljs-attr">attempt</span>: <span class="hljs-number">1</span>
})

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'body'</span>,
  <span class="hljs-attr">components</span>: {
    App
  }
})</code></pre>
<h2 id="articleHeader8">在入口文件添加后，在组件任何地方都可以直接使用把 img 里的:src  -&gt; v-lazy</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div class=&quot;pic&quot;>
    <a href=&quot;#&quot;><img :src=&quot;'/static/img/' + item.productImage&quot; alt=&quot;&quot;></a>
</div>

把之前项目中img 标签里面的 :src 属性 改成 v-lazy 
 <div class=&quot;pic&quot;>
    <a href=&quot;#&quot;><img v-lazy=&quot;'/static/img/' + item.productImage&quot; alt=&quot;&quot;></a>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"pic"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"'/static/img/' + item.productImage"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

把之前项目中img 标签里面的 :src 属性 改成 v-lazy 
 &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"pic"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">v-lazy</span>=<span class="hljs-string">"'/static/img/' + item.productImage"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<h2 id="articleHeader9">参数选项说明</h2>
<table>
<thead><tr>
<th align="left">key</th>
<th>description</th>
<th>default</th>
<th>options</th>
</tr></thead>
<tbody>
<tr>
<td align="left"><code>preLoad</code></td>
<td>proportion of pre-loading height</td>
<td><code>1.3</code></td>
<td><code>Number</code></td>
</tr>
<tr>
<td align="left"><code>error</code></td>
<td>当加载图片失败的时候</td>
<td><code>'data-src'</code></td>
<td><code>String</code></td>
</tr>
<tr>
<td align="left"><code>loading</code></td>
<td>当加载图片成功的时候</td>
<td><code>'data-src'</code></td>
<td><code>String</code></td>
</tr>
<tr>
<td align="left"><code>attempt</code></td>
<td>尝试计数</td>
<td><code>3</code></td>
<td><code>Number</code></td>
</tr>
<tr>
<td align="left"><code>listenEvents</code></td>
<td>想要监听的事件</td>
<td><code>['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove']</code></td>
<td><a href="#desired-listen-events">Desired Listen Events</a></td>
</tr>
<tr>
<td align="left"><code>adapter</code></td>
<td>动态修改元素属性</td>
<td><code>{ }</code></td>
<td><a href="#element-adapter">Element Adapter</a></td>
</tr>
<tr>
<td align="left"><code>filter</code></td>
<td>图片监听或过滤器</td>
<td><code>{ }</code></td>
<td><a href="#image-listener-filter">Image listener filter</a></td>
</tr>
<tr>
<td align="left"><code>lazyComponent</code></td>
<td>lazyload component</td>
<td><code>false</code></td>
<td><a href="#lazy-component">Lazy Component</a></td>
</tr>
<tr>
<td align="left"><code>dispatchEvent</code></td>
<td>触发dom事件</td>
<td><code>false</code></td>
<td><code>Boolean</code></td>
</tr>
<tr>
<td align="left"><code>throttleWait</code></td>
<td>throttle wait</td>
<td><code>200</code></td>
<td><code>Number</code></td>
</tr>
<tr>
<td align="left"><code>observer</code></td>
<td>use IntersectionObserver</td>
<td><code>false</code></td>
<td><code>Boolean</code></td>
</tr>
<tr>
<td align="left"><code>observerOptions</code></td>
<td>IntersectionObserver options</td>
<td>{ rootMargin: '0px', threshold: 0.1 }</td>
<td><a href="#intersectionobserver">IntersectionObserver</a></td>
</tr>
</tbody>
</table>
<h3 id="articleHeader10">想要监听的事件</h3>
<p>您可以通过传递数组来配置想要使用vue - lazyload的事件<br>监听器的名字。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1,
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  listenEvents: [ 'scroll' ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.use(VueLazyload, {
  <span class="hljs-attr">preLoad</span>: <span class="hljs-number">1.3</span>,
  <span class="hljs-attr">error</span>: <span class="hljs-string">'dist/error.png'</span>,
  <span class="hljs-attr">loading</span>: <span class="hljs-string">'dist/loading.gif'</span>,
  <span class="hljs-attr">attempt</span>: <span class="hljs-number">1</span>,
  <span class="hljs-comment">// the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']</span>
  listenEvents: [ <span class="hljs-string">'scroll'</span> ]
})</code></pre>
<p>如果您遇到这个插件重新设置加载的麻烦，这是很有用的<br>当你有某些动画和过渡的时候。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【vuejs插件】vue中使用图片懒加载vue-lazyload插件详细指南

## 原文链接
[https://segmentfault.com/a/1190000011672452](https://segmentfault.com/a/1190000011672452)

