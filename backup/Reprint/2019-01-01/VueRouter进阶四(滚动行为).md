---
title: 'VueRouter进阶四(滚动行为)' 
date: 2019-01-01 2:30:07
hidden: true
slug: xlnvutagtdk
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">滚动行为</h1>
<blockquote>
<p>使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。</p>
<blockquote><ul><li><p>注意: 这个功能只在 HTML5 history 模式下可用。</p></li></ul></blockquote>
</blockquote>
<p>当创建一个 Router 实例，你可以提供一个 scrollBehavior 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var router = new VueRouter({
    routes: [...],
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> router = <span class="hljs-keyword">new</span> VueRouter({
    <span class="hljs-attr">routes</span>: [...],
    scrollBehavior (to, <span class="hljs-keyword">from</span>, savedPosition) {
        <span class="hljs-comment">// return 期望滚动到哪个的位置</span>
    }
})</code></pre>
<p>scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。</p>
<p>这个方法返回滚动位置的对象信息，长这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    { x: number, y: number }
    { selector: string }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    { <span class="hljs-attr">x</span>: number, <span class="hljs-attr">y</span>: number }
    { <span class="hljs-attr">selector</span>: string }</code></pre>
<p>如果返回一个布尔假的值，或者是一个空对象，那么不会发生滚动。</p>
<p>举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">scrollBehavior (to, <span class="hljs-keyword">from</span>, savedPosition) {
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">x</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">0</span> }
}</code></pre>
<p>对于所有路由导航，简单地让页面滚动到顶部。</p>
<p>返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">scrollBehavior (to, <span class="hljs-keyword">from</span>, savedPosition) {
  <span class="hljs-keyword">if</span> (savedPosition) {
    <span class="hljs-keyword">return</span> savedPosition
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">x</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">0</span> }
  }
}</code></pre>
<p>如果你要模拟『滚动到锚点』的行为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">scrollBehavior (to, <span class="hljs-keyword">from</span>, savedPosition) {
  <span class="hljs-keyword">if</span> (to.hash) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">selector</span>: to.hash
    }
  }
}</code></pre>
<blockquote>
<p>演示地址 : <a href="https://smallmotor.github.io/d" rel="nofollow noreferrer" target="_blank">https://smallmotor.github.io/d</a></p>
<p>进阶一(导航钩子和路由元信息) : <a href="https://segmentfault.com/a/1190000011140870">https://segmentfault.com/a/11...</a></p>
<p>进阶二(过渡动效) : <a href="https://segmentfault.com/a/1190000011140909" target="_blank">https://segmentfault.com/a/11...</a></p>
<p>进阶三(数据获取) : <a href="https://segmentfault.com/a/1190000011140941">https://segmentfault.com/a/11...</a></p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VueRouter进阶四(滚动行为)

## 原文链接
[https://segmentfault.com/a/1190000011140958](https://segmentfault.com/a/1190000011140958)

