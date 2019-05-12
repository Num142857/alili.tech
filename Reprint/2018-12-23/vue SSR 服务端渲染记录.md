---
title: 'vue SSR 服务端渲染记录' 
date: 2018-12-23 2:30:07
hidden: true
slug: blz8xvqsgm8
categories: [reprint]
---

{{< raw >}}

                    
<p>前几天了解了下vue 服务端渲染的流程，记录下。首先，什么是ssr(服务端渲染 Server Side Rendering)，为什么需要？</p>
<h2 id="articleHeader0">服务端渲染是什么</h2>
<p>前后端分离之后，页面加载的流程是，前端异步请求拿到数据渲染页面。服务端渲染就是在后端把数据取好，拼好页面的DOM树发给前端，到浏览器解析渲染。有没有想到前后端分离之前，由后端把数据塞进模版，前端负责显示的过去。（有没有种天下之势，合久必分，分久必合的感慨哈哈哈哈哈)</p>
<h2 id="articleHeader1">服务端渲染优点</h2>
<ul>
<li>页面的SEO, 异步拿数据显示对爬虫不友好</li>
<li>首屏渲染速度快，更好的用户体验</li>
</ul>
<h2 id="articleHeader2">服务端渲染原理</h2>
<p>接下来，介绍下vue 服务端实现原理及流程。<br><span class="img-wrap"><img data-src="/img/bVDOf4?w=1946&amp;h=892" src="https://static.alili.tech/img/bVDOf4?w=1946&amp;h=892" alt="vue SSR流程图" title="vue SSR流程图" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>SSR 有两个入口文件client-entry，server-entry , webpack打包之后，生成 server-bundle, client-bundle</li>
<li>服务器收到浏览器的请求，创建一个bundleRenderer,读取1生成的server-bundle，执行代码（具体做了什么后面会讲到），生成html发送到前端</li>
<li>把第二步生成的html跟前端的client-bundle进行混合（hydrate），混合时判断client-bundle 的DOM节点跟服务端返回的html里DOM节点是否相同，是的话挂载（vue中的$mount）到这个节点上，页面渲染完毕</li>
</ol>
<p>用白话形容，服务端获取页面所需的数据之后，拼出html，把html转成string发送到前端，前端把html插入到指定节点，渲染页面，OK了。<br><span class="img-wrap"><img data-src="/img/bVZJXH?w=580&amp;h=580" src="https://static.alili.tech/img/bVZJXH?w=580&amp;h=580" alt="表情" title="表情" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">服务端数据预取</h3>
<p>看看官网的demo,服务端怎么做的服务端数据预取。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// entry-server.js
import { createApp } from './app'
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    router.push(context.url)
     // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      //获取相匹配的组件
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// entry-server.js</span>
<span class="hljs-keyword">import</span> { createApp } <span class="hljs-keyword">from</span> <span class="hljs-string">'./app'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> context =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> { app, router, store } = createApp()
    router.push(context.url)
     <span class="hljs-comment">// 等到 router 将可能的异步组件和钩子函数解析完</span>
    router.onReady(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-comment">//获取相匹配的组件</span>
      <span class="hljs-keyword">const</span> matchedComponents = router.getMatchedComponents()
      <span class="hljs-keyword">if</span> (!matchedComponents.length) {
        <span class="hljs-keyword">return</span> reject({ <span class="hljs-attr">code</span>: <span class="hljs-number">404</span> })
      }
      <span class="hljs-comment">// 对所有匹配的路由组件调用 `asyncData()`</span>
      <span class="hljs-built_in">Promise</span>.all(matchedComponents.map(<span class="hljs-function"><span class="hljs-params">Component</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (Component.asyncData) {
          <span class="hljs-keyword">return</span> Component.asyncData({
            store,
            <span class="hljs-attr">route</span>: router.currentRoute
          })
        }
      })).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-comment">// 在所有预取钩子(preFetch hook) resolve 后，</span>
        <span class="hljs-comment">// 我们的 store 现在已经填充入渲染应用程序所需的状态。</span>
        <span class="hljs-comment">// 当我们将状态附加到上下文，</span>
        <span class="hljs-comment">// 并且 `template` 选项用于 renderer 时，</span>
        <span class="hljs-comment">// 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。</span>
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}</code></pre>
<ol>
<li>根据router拿出相匹配的组件，客户端定义asyncData（数据预取函数，拿数据），服务端asyncData，获取数据</li>
<li>把源数据和状态写进store（数据和状态存储容器，store独立于业务组件，详情可查看Vuex），避免客户端和服务端状态不对等。状态写进window.__INITIAL_STATE__格式，客户端可拿到</li>
</ol>
<h3 id="articleHeader4">bundleRenderder</h3>
<p>html渲染好之后，转成string发到客户端，客户端插入到对应DOM节点下就可以啦～</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { createBundleRenderer } = require('vue-server-renderer')
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template, // （可选）页面模板
  clientManifest // （可选）客户端构建 manifest
})
// 在服务器处理函数中……
server.get('*', (req, res) => {
  const context = { url: req.url }
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  renderer.renderToString(context, (err, html) => {
    // 处理异常……
    res.end(html)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> { createBundleRenderer } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'vue-server-renderer'</span>)
<span class="hljs-keyword">const</span> renderer = createBundleRenderer(serverBundle, {
  runInNewContext: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 推荐</span>
  template, <span class="hljs-comment">// （可选）页面模板</span>
  clientManifest <span class="hljs-comment">// （可选）客户端构建 manifest</span>
})
<span class="hljs-comment">// 在服务器处理函数中……</span>
server.get(<span class="hljs-string">'*'</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> context = { url: req.url }
  <span class="hljs-comment">// 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。</span>
  <span class="hljs-comment">// 现在我们的服务器与应用程序已经解耦！</span>
  renderer.renderToString(context, <span class="hljs-function">(<span class="hljs-params">err, html</span>) =&gt;</span> {
    <span class="hljs-comment">// 处理异常……</span>
    res.end(html)
  })
}</code></pre>
<h2 id="articleHeader5">服务端渲染一些坑</h2>
<ul>
<li>document 对象找不到，由于前端使用的 window，在 node 环境不存在</li>
<li>数据预获取时，组件尚未实例化（无法使用 this ），数据请求及格式化等操作都应该放置在store处理</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue SSR 服务端渲染记录

## 原文链接
[https://segmentfault.com/a/1190000012294822](https://segmentfault.com/a/1190000012294822)

