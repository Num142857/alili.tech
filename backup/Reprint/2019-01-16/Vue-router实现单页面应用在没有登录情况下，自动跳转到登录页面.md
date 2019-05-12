---
title: 'Vue-router实现单页面应用在没有登录情况下，自动跳转到登录页面' 
date: 2019-01-16 2:30:08
hidden: true
slug: 3tw0j6w51xd
categories: [reprint]
---

{{< raw >}}

                    
<p>这是我做前端一来的第一篇文章，都不知道该怎么开始了。那就直接奔主题吧。先讲讲这个功能的实现场景吧，我们小组使用vue全家桶实现了一个单页面应用，最初就考虑对登录状态做限制。比如登录后不能后退到登录页面，退出到登录页面后，不能后退刚刚登录的页面。在main.js中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  store,
  router
}).$mount('#app')
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  console.log(1234)
  if (!to.meta.requiresAuth) {
    if (!store.state.collectItems.bAuth) {
      next({
        path: '/'
        // query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    if (store.state.collectItems.bAuth &amp;&amp; to.fullPath === '/') {
      console.log()
      next(false)
      return
    }
    next()
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>new Vue({
  store,
  router
}).$mount(<span class="hljs-string">'#app'</span>)
router.beforeEach((<span class="hljs-keyword">to</span>, from, <span class="hljs-keyword">next</span>) =&gt; {
  window.scrollTo(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>)
  console.<span class="hljs-built_in">log</span>(<span class="hljs-number">1234</span>)
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">to</span>.meta.requiresAuth) {
    <span class="hljs-keyword">if</span> (!store.state.collectItems.bAuth) {
      <span class="hljs-keyword">next</span>({
        path: <span class="hljs-string">'/'</span>
        // query: { redirect: <span class="hljs-keyword">to</span>.fullPath }
      })
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">next</span>()
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">if</span> (store.state.collectItems.bAuth &amp;&amp; <span class="hljs-keyword">to</span>.fullPath === <span class="hljs-string">'/'</span>) {
      console.<span class="hljs-built_in">log</span>()
      <span class="hljs-keyword">next</span>(<span class="hljs-literal">false</span>)
      <span class="hljs-keyword">return</span>
    }
    <span class="hljs-keyword">next</span>()
  }
})</code></pre>
<p>对那些是登录才能访问的，那些是没有登录就可以直接访问的，都做限制。这些功能都是实现的没有问题的。但是发现了一个问题就是，但是发现了一个问题就是大家直接在浏览器的地址栏输入一个登录后才能访问的页面，虽然不能访问到页面，但是页面会卡在这里不动。原本设置的的路由跳转根本就没有起到作用。后来发现，因为是这块的路由根本就没有发挥作用的时候，页面就已经报错了。有一天突然和我们小组的妹子讨论的时候，突然提到能不能在页面渲染先设置一个路由呢，于是就在 new Vue实例前面加了一个router的判断：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach((to, from, next) => {
  if (to.fullPath !== '/') {
    next({
      path: '/'
    })
    return
  }
  next()
})

瞬间之前的问题解决了。现在直接访问那些只有登录后才能访问的面，就直接跳转到了登录页面了。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs moonscript"><code>router.beforeEach(<span class="hljs-function"><span class="hljs-params">(to, <span class="hljs-keyword">from</span>, <span class="hljs-built_in">next</span>)</span> =&gt;</span> {
  <span class="hljs-keyword">if</span> (to.fullPath !== <span class="hljs-string">'/'</span>) {
    <span class="hljs-built_in">next</span>({
      <span class="hljs-name">path</span>: <span class="hljs-string">'/'</span>
    })
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-built_in">next</span>()
})

瞬间之前的问题解决了。现在直接访问那些只有登录后才能访问的面，就直接跳转到了登录页面了。
</code></pre>
<p>整理后的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach((to, from, next) => {
  if (to.fullPath !== '/') {
    next({
      path: '/'
    })
    return
  }
  next()
})
new Vue({
  store,
  router
}).$mount('#app')
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  console.log(1234)
  if (!to.meta.requiresAuth) {
    if (!store.state.collectItems.bAuth) {
      next({
        path: '/'
        // query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    if (store.state.collectItems.bAuth &amp;&amp; to.fullPath === '/') {
      console.log()
      next(false)
      return
    }
    next()
  }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>router.beforeEach((<span class="hljs-keyword">to</span>, from, <span class="hljs-keyword">next</span>) =&gt; {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">to</span>.fullPath !== <span class="hljs-string">'/'</span>) {
    <span class="hljs-keyword">next</span>({
      path: <span class="hljs-string">'/'</span>
    })
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-keyword">next</span>()
})
new Vue({
  store,
  router
}).$mount(<span class="hljs-string">'#app'</span>)
router.beforeEach((<span class="hljs-keyword">to</span>, from, <span class="hljs-keyword">next</span>) =&gt; {
  window.scrollTo(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>)
  console.<span class="hljs-built_in">log</span>(<span class="hljs-number">1234</span>)
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">to</span>.meta.requiresAuth) {
    <span class="hljs-keyword">if</span> (!store.state.collectItems.bAuth) {
      <span class="hljs-keyword">next</span>({
        path: <span class="hljs-string">'/'</span>
        // query: { redirect: <span class="hljs-keyword">to</span>.fullPath }
      })
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">next</span>()
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">if</span> (store.state.collectItems.bAuth &amp;&amp; <span class="hljs-keyword">to</span>.fullPath === <span class="hljs-string">'/'</span>) {
      console.<span class="hljs-built_in">log</span>()
      <span class="hljs-keyword">next</span>(<span class="hljs-literal">false</span>)
      <span class="hljs-keyword">return</span>
    }
    <span class="hljs-keyword">next</span>()
  }
})
</code></pre>
<p>不对的地方还望大家指点，谢谢！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue-router实现单页面应用在没有登录情况下，自动跳转到登录页面

## 原文链接
[https://segmentfault.com/a/1190000009086403](https://segmentfault.com/a/1190000009086403)

