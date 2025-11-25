---
title: 'Vue 2 服务端渲染初探' 
date: 2019-02-05 2:30:09
hidden: true
slug: j8ivsbl0u5
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>写这篇文章, Vue 2 还在 Beta 呢...</p></blockquote>
<h3 id="articleHeader0">参考资料</h3>
<blockquote><p>官方文档写得很清楚</p></blockquote>
<p>似乎 Vue 1 有看到过通过 jsdom 做后端渲染的例子, 性能不佳.<br>Vue 2 开始将 Virtual DOM 作为底层实现, 于是模块分离开始支持 SSR.</p>
<ul>
<li><p>文档 <a href="https://github.com/vuejs/vue/tree/next/packages/vue-server-renderer" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue/...</a></p></li>
<li><p>官方例子 <a href="https://github.com/vuejs/vue-hackernews-2.0" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue-...</a></p></li>
<li><p>官方例子(过时) <a href="https://github.com/yyx990803/vue-ssr-demo" rel="nofollow noreferrer" target="_blank">https://github.com/yyx990803/...</a></p></li>
<li><p>例子 <a href="https://github.com/csbun/vue2-ssr-example" rel="nofollow noreferrer" target="_blank">https://github.com/csbun/vue2...</a></p></li>
<li><p>例子 <a href="https://github.com/egoist/vue-isomorphic-starter" rel="nofollow noreferrer" target="_blank">https://github.com/egoist/vue...</a></p></li>
</ul>
<h3 id="articleHeader1">渲染步骤</h3>
<blockquote><p>4 步走战略~</p></blockquote>
<p>安装 hackernews 的例子, 完整的 app 渲染的例子包括:</p>
<ol>
<li><p>用 Webpack 的 <code>node</code> 模式把整个应用单独打一个包</p></li>
<li><p>Node 环境通过 API 将这个包加载到 <code>vm</code> 环境当中</p></li>
<li><p>应用在 <code>vm</code> 内部启动 HTTP 请求抓取当前路由依赖的数据</p></li>
<li><p>生成网页模板, 将 HTML 和<strong>初始数据</strong>嵌在中间</p></li>
</ol>
<p>如果网页依赖的数据少或者不依赖, 可以简化一点,<br>比如中间抓取 HTTP 的步骤去掉, 可以简化不少,<br>也许还可以去掉 <code>vm</code> 那步, 直接通过引用文件来生成 HTML.</p>
<h3 id="articleHeader2">渲染 API</h3>
<blockquote><p>两套 API 哦... 好像只用带 bundle 那套...</p></blockquote>
<p><a href="https://github.com/vuejs/vue/tree/next/packages/vue-server-renderer#api" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue/...</a></p>
<ul>
<li><p><code>createRenderer([rendererOptions])</code></p></li>
<li><p><code>renderer.renderToString(vm, cb)</code></p></li>
<li><p><code>renderer.renderToStream(vm)</code></p></li>
<li><p><code>createBundleRenderer(code, [rendererOptions])</code></p></li>
<li><p><code>bundleRenderer.renderToString([context], cb)</code></p></li>
<li><p><code>bundleRenderer.renderToStream([context])</code></p></li>
</ul>
<p>后面三个 API 都带上了 <code>bundle</code>, 此外看上去和前面的一样,<br><code>bundle</code> 是通过 Node.js 的 <code>vm</code> 模块运行的, 每次的都重新启动一遍代码,<br>作者解释这样能清空整个 app 的状态,<br>我推测这是因为用了 Vuex 之后, 数据会被缓存在内部无法清理,<br>如果是单纯通过 props 传递数据, 应该是可以用前一套 API.</p>
<h3 id="articleHeader3">服务端渲染原理</h3>
<blockquote><p>有了 Virtual DOM 就好办了</p></blockquote>
<p>VNode 定义 <a href="https://github.com/vuejs/vue/blob/next/src/core/vdom/vnode.js" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue/...</a></p>
<p>HTML 渲染的代码, 通过 <code>write</code> 同时支持到了 Stream 输出:<br><a href="https://github.com/vuejs/vue/blob/next/src/server/create-renderer.js#L31" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue/...</a><br><a href="https://github.com/vuejs/vue/blob/next/src/server/render.js#L153" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue/...</a></p>
<p>如果用 bundle 模式, 注意每次都会运行 <code>vm.runInNewContext</code> 新建环境.<br><a href="https://github.com/vuejs/vue/blob/next/src/server/create-bundle-renderer.js#L13" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue/...</a><br><a href="https://github.com/vuejs/vue/blob/next/src/server/run-in-vm.js#L21" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue/...</a></p>
<p>最后返回用户的 HTML 其实是拼接出来的,<br>注意首屏的动态数据, 也通过 <code>window.__INITIAL_STATE__</code> 发送到浏览器,<br><a href="https://github.com/vuejs/vue-hackernews-2.0/blob/master/server.js#L64" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue-...</a></p>
<h3 id="articleHeader4">缓存</h3>
<blockquote><p>速度快是因为缓存呢吧...</p></blockquote>
<p>文档 <a href="https://github.com/vuejs/vue/tree/next/packages/vue-server-renderer#component-caching" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue/...</a></p>
<p>大致就是如果组件可以根据一个 key 来确定, 就可以进行缓存,<br>静态的组件当然是有固定的 key, 动态的组件根据 id 等数据生成 key,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="serverCacheKey: props => props.item.id + '::' + props.item.last_updated" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">serverCacheKey: <span class="hljs-function"><span class="hljs-params">props</span> =&gt;</span> props.item.id + <span class="hljs-string">'::'</span> + props.item.last_updated</code></pre>
<p>如果组件可以找到缓存, 就直接返回缓存内容:<br><a href="https://github.com/vuejs/vue/blob/next/src/server/render.js#L71" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue/...</a></p>
<p>这也就意味着顶层的组件总之就是不能缓存的, 性能开销免不了.<br>hackernews 的例子本地用 <code>ab</code> 压了一下, Mac Pro 到 130+qps 了,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Concurrency Level:      100
Time taken for tests:   3.013 seconds
Complete requests:      400
Failed requests:        0
Total transferred:      11545200 bytes
HTML transferred:       11506000 bytes
Requests per second:    132.77 [#/sec] (mean)
Time per request:       753.205 [ms] (mean)
Time per request:       7.532 [ms] (mean, across all concurrent requests)
Transfer rate:          3742.21 [Kbytes/sec] received" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ldif"><code><span class="hljs-attribute">Concurrency Level</span>:      100
<span class="hljs-attribute">Time taken for tests</span>:   3.013 seconds
<span class="hljs-attribute">Complete requests</span>:      400
<span class="hljs-attribute">Failed requests</span>:        0
<span class="hljs-attribute">Total transferred</span>:      11545200 bytes
<span class="hljs-attribute">HTML transferred</span>:       11506000 bytes
<span class="hljs-attribute">Requests per second</span>:    132.77 [#/sec] (mean)
<span class="hljs-attribute">Time per request</span>:       753.205 [ms] (mean)
<span class="hljs-attribute">Time per request</span>:       7.532 [ms] (mean, across all concurrent requests)
<span class="hljs-attribute">Transfer rate</span>:          3742.21 [Kbytes/sec] received</code></pre>
<p>但是这个 Demo 是用了缓存的, 破坏掉缓存性能落差很大,<br>我自己做的 Demo, 实际上加上缓存性能还不到这个一半...<br>看来跟应用的类型是有关的, 特别是节点偏多的应用影响更大.</p>
<h3 id="articleHeader5">数据策略</h3>
<blockquote><p>想象一下后端有个浏览器...</p></blockquote>
<p>对于依赖数据, 目前的方案是在组件定义上提供 <code>preFetch</code> 函数,<br>服务端渲染时会主动查找挂载的部分, 调用进行数据抓取:<br><a href="https://github.com/vuejs/vue-hackernews-2.0/blob/master/src/server-entry.js#L20" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue-...</a><br><a href="https://github.com/vuejs/vue-hackernews-2.0/blob/master/src/views/UserView.vue#L36" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue-...</a></p>
<p>官方的例子当中 App 是带了 Vuex 跟 vue-router 的,<br>所以 preFetch 方案整个集成在这些库当中.<br>从实验看, 内部嵌套的 <code>preFetch</code> 是不会被调用的, 只能从路由开始,<br>同时中间要用到 <code>Promise.all</code> 合并请求, 脑补一下.</p>
<p>好吧我觉得这是一个相当简单粗暴的获取数据的办法,<br>但其实也很难解耦, 不然就要从路由直接推算数据才行,<br>主要觉得还是不够清晰, 限制挺多, 实际操作能犯错的地方不少.</p>
<h3 id="articleHeader6">性能影响</h3>
<blockquote><p>反正比不上模板引擎</p></blockquote>
<p>编译后大致还能看到 Virtual DOM 的影子, 会有一些性能开销,<br>不过话说回来 Virtual DOM 本来就很慢, 能优化一点已经不容易了...</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports={render:function(){with(this) {
  return _h('li', {
    staticClass: &quot;news-item&quot;
  }, [_h('span', {
    staticClass: &quot;score&quot;
  }, [_s(item.score)]), &quot; &quot;, _h('span', {
    staticClass: &quot;title&quot;
  }, [(item.url) ? [_h('a', {
    attrs: {
      &quot;href&quot;: item.url,
      &quot;target&quot;: &quot;_blank&quot;
    }
  }, [_s(item.title)]), &quot; &quot;, _h('span', {
    staticClass: &quot;host&quot;
  }, [&quot;(&quot; + _s(_f(&quot;host&quot;)(item.url)) + &quot;)&quot;])] : [_h('router-link', {
    attrs: {
      &quot;to&quot;: '/item/' + item.id
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports={<span class="hljs-attr">render</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">with</span>(<span class="hljs-keyword">this</span>) {
  <span class="hljs-keyword">return</span> _h(<span class="hljs-string">'li'</span>, {
    <span class="hljs-attr">staticClass</span>: <span class="hljs-string">"news-item"</span>
  }, [_h(<span class="hljs-string">'span'</span>, {
    <span class="hljs-attr">staticClass</span>: <span class="hljs-string">"score"</span>
  }, [_s(item.score)]), <span class="hljs-string">" "</span>, _h(<span class="hljs-string">'span'</span>, {
    <span class="hljs-attr">staticClass</span>: <span class="hljs-string">"title"</span>
  }, [(item.url) ? [_h(<span class="hljs-string">'a'</span>, {
    <span class="hljs-attr">attrs</span>: {
      <span class="hljs-string">"href"</span>: item.url,
      <span class="hljs-string">"target"</span>: <span class="hljs-string">"_blank"</span>
    }
  }, [_s(item.title)]), <span class="hljs-string">" "</span>, _h(<span class="hljs-string">'span'</span>, {
    <span class="hljs-attr">staticClass</span>: <span class="hljs-string">"host"</span>
  }, [<span class="hljs-string">"("</span> + _s(_f(<span class="hljs-string">"host"</span>)(item.url)) + <span class="hljs-string">")"</span>])] : [_h(<span class="hljs-string">'router-link'</span>, {
    <span class="hljs-attr">attrs</span>: {
      <span class="hljs-string">"to"</span>: <span class="hljs-string">'/item/'</span> + item.id
    }</code></pre>
<p>另外 <code>vm.runInNewContext</code> 有潜在的性能问题,<br><a href="http://stackoverflow.com/q/9867069/883571" rel="nofollow noreferrer" target="_blank">http://stackoverflow.com/q/98...</a><br>不清楚用在生产环境是怎样, 我个人对此没有多少经验..</p>
<h3 id="articleHeader7">小结</h3>
<blockquote><p>越来越像 React...</p></blockquote>
<p>Vue 2 算是把这么多内容整合在一起相当不容易,<br>不过服务端渲染 React 那么久了, 还是没普及开, 性能是大问题,<br>相比较而言, Vue 2 增加了 cache 机制, 这可以提高性能,<br>但是依赖数据时会带来启动 <code>vm</code> 开销, 要是代码量不小在么办?<br>具体效果还是要等正式发布后, 等有权威的评测...</p>
<p>此外服务端抓取数据的策略需要挖一挖, 找找更漂亮的策略,<br>我个人希望能更好地解耦, 梳理出更加清晰的依赖,<br>那样也可以适应更多的场景, 灵活地使用, 而不是限定死了这样用.<br>当然也是因为服务端渲染, 这个本来存在的问题显得更明确了.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 2 服务端渲染初探

## 原文链接
[https://segmentfault.com/a/1190000006701796](https://segmentfault.com/a/1190000006701796)

