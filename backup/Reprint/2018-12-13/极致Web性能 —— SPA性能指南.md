---
title: '极致Web性能 —— SPA性能指南' 
date: 2018-12-13 2:30:07
hidden: true
slug: pm89v9qs35
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>作者：Jogis</strong><br><strong>原文链接：<a href="https://github.com/yesvods/Blog/issues/14" rel="nofollow noreferrer" target="_blank">https://github.com/yesvods/Bl...</a> </strong><br><strong>转载请注明原文链接以及作者信息</strong></p>
<h3 id="articleHeader0">前言</h3>
<p>前端框架时代，为开发体验、效率与页面性能带来，非常大的革命。大家纷纷拿起一系列打包工具(webpack/parcel etc.)，配合一系列加载器快速搭建起一个 SPA 页面。</p>
<p>SPA 应用带来的好处非常明显；</p>
<ul>
<li>提升页面切换体验</li>
<li>降低切换时间</li>
<li>易于部署&amp;前后端分离</li>
</ul>
<p>但是也带来一系列性能问题：</p>
<ul>
<li>初始加载脚本较大</li>
<li>首屏空白时间较长</li>
<li>页面返回时，数据被动重新拉取</li>
</ul>
<p>这些问题是使用 SPA 模式不可避免的，通过了解 SPA 加载运行过程，可以逐渐看清楚引起性能问题的根本原因，通过精细化应用加载，来解决这些问题。</p>
<h3 id="articleHeader1">SPA 之殇</h3>
<h4>愈发发福</h4>
<p>比起一般的简单页面，SPA 最大的问题，就是在初始化之时引入大量框架方案脚本，这导致脚本体积随着项目发展体积愈发增大。</p>
<h4>不仅仅是体积</h4>
<p>很多人会关注脚本的加载体积，通过一系列方案来提升缓存命中率，减少脚本请求次数。在网络环境较差的移动端，尽量减少请求时间意义很大。</p>
<p>但这不是银弹，移动设备对脚本的解析、编译、执行性能较差（脚本加载参考<a href="https://github.com/yesvods/Blog/issues/11" rel="nofollow noreferrer" target="_blank">《图说舌尖上的脚本》</a>），即便可以完全利用缓存，执行时间也是性能一大瓶颈。</p>
<h3 id="articleHeader2">Keep SPA Fit</h3>
<p>性能优化原则：贫则独善其身，富则兼济天下。</p>
<h4>如何维护一个大型 SPA？</h4>
<p>随着项目不断发展，页面不断增加，源源不断的第三方组件&amp;工具库加入到<code>Bundle</code>里面，良好的 SPA 架构可以保证大型 SPA 项目依旧保持极致的性能与体验。下面介绍一个优秀性能&amp;体验 SPA 具备的特性：</p>
<h3 id="articleHeader3">性能优化</h3>
<h4>1. 快速启动 —— 极大提升加载速度（important）</h4>
<p>快速启动应用，并行发起 Bundle 加载&amp;拉取初始数据。相信大家已经发现了，SPA 初始化时候，不得不等待 bundle 返回并执行后，才会发起数据加载。</p>
<p>由于在移动设备上（即便有缓存）bundle 加载极为耗时，我们可以充分利用这段时间将数据进行预加载。这项特性，使得后面的优化起到更加明显的效果。</p>
<p>如下示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.js
Promise.all([load('bundle'), load('data')])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app.js</span>
<span class="hljs-built_in">Promise</span>.all([load(<span class="hljs-string">'bundle'</span>), load(<span class="hljs-string">'data'</span>)])</code></pre>
<h4>2. 根据路由拆分 —— 减少初始加载体积</h4>
<p>利用异步加载方式，在路由注册时提供异步拉取组件的方法，仅在需要进入对应路由时，对应组件才会被加载进来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="route({
  Home: () => import('@/coms/home'),
  About: () => import('@/coms/about')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">route({
  <span class="hljs-attr">Home</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'@/coms/home'</span>),
  <span class="hljs-attr">About</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'@/coms/about'</span>)
})</code></pre>
<h4>3. 独立打包异步组件公共 Bundle —— 提高复用性&amp;缓存命中率</h4>
<p>在<code>Home</code>和<code>About</code>等路由里面，可能公用一套 UI 组件，若不将异步加载公用组件统一打包，每次加载 路由时，都会额外加载一套 UI 组件。通过将公用组件提取打包成<code>Vendor</code>，可以减少下次进入路由加载体积与时间。</p>
<p>BTW：在<code>webpack &lt; 4</code>时，依旧需要手动维护异步加载组件公用组件。<code>webpack4</code>提供更丰富的异步组件抽离<a href="https://medium.com/webpack/webpack-4-beta-try-it-today-6b1d27d7d7e2" rel="nofollow noreferrer" target="_blank">方案</a>。</p>
<h4>4. 组件预加载 —— 减少页面切换时间</h4>
<p>当首屏加载完毕后，设备&amp;网络处于空闲状态，可以对其他路由组件进行预加载，以便提升页面切换性能。</p>
<p>预加载是一个非常繁琐的过程，我们可以设计一个极小启动器，在页面渲染后快速预加载后续组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 所有包含Page的路由组件均会被预加载
boostraper.loadMatch('Page')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// 所有包含Page的路由组件均会被预加载</span>
<span class="hljs-selector-tag">boostraper</span><span class="hljs-selector-class">.loadMatch</span>(<span class="hljs-string">'Page'</span>)</code></pre>
<h4>5. 使用 ESM 语法 —— 按需打包工具库，降低 Bundle 体积</h4>
<p><code>webpack4</code>在 ESM <code>tree shaking</code>上做了极大优化，使得在引用工具库时候真正做到"按需打包"，这要求无论是自己开发的工具库，抑或使用第三方工具库，打包&amp;使用 ESM 版本非常必要。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013272564?w=826&amp;h=310" src="https://static.alili.tech/img/remote/1460000013272564?w=826&amp;h=310" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>6. 配合 PWA 使用，口感更佳 —— 降低首屏渲染时间，极大提升体验</h4>
<p>根据 PWA 缓存策略，可以将访问的页面<code>index.html</code>缓存起来，下次打开时候优先利用缓存，再发起请求更新缓存。这使得 SPA 应用几乎不需要额外时间便可加载应用首屏文档流。</p>
<h3 id="articleHeader4">体验优化</h3>
<h4>1. 构建你的极简<code>Skeleton Page</code>
</h4>
<p>SPA 首屏加载面临较长时间白屏，骨架图是一个完美的"缓兵之计"。在谷歌研究员的<a href="https://medium.com/@owencm/reactive-web-design-the-secret-to-building-web-apps-that-feel-amazing-b5cbfe9b7c50" rel="nofollow noreferrer" target="_blank">文章 </a>中有提到，骨架图对用户体验有极大的提升：</p>
<ul>
<li>
<p>快速展示</p>
<ul><li>配合 PWA 首屏缓存，骨架图可实现瞬间加载&amp;展示，首屏视觉上有冲击性地提升</li></ul>
</li>
<li>
<p>稳定加载</p>
<ul><li>消除页面初始加载因多次重绘&amp;资源加载导致的"抖动"</li></ul>
</li>
</ul>
<p>需要注意的是，骨架图应尽量保持足够小巧与简单，以确保不会严重影响页面后续加载。</p>
<h4>2. 页面切换 Loading</h4>
<p>无论如何优化性能加载，在页面切换时候依旧需要获取页面数据，若处理不好，可能会在数据返回前有短暂的不友好"空白"。通过以下方式可以很好处理这个问题：</p>
<ul>
<li>
<p>友好的切换前 Loading</p>
<ul><li>在确保组件&amp;数据加载完毕前，可保证页面可交互性，减少用户阻塞感</li></ul>
</li>
<li>
<p>转场动画</p>
<ul>
<li>在大多数原生应用，转场动画属于标配</li>
<li>即时组件&amp;数据已经完全加载，在切换至新页面瞬间，依旧需要页面渲染时间，这段时间可能导致页面短暂空白或者"视觉阻塞"</li>
<li>通过转场动画时间，可以很好地缓解这个问题，大多数页面保证在转场动画完毕之后依然渲染完毕</li>
</ul>
</li>
</ul>
<h3 id="articleHeader5">最后</h3>
<p>除了上述提到的 SPA 优化方案，Web 性能基础也是必备的基石（如域名收敛、合理文档结构）。性能优化本质是一个页面精细化监控运营的过程，也要求我们对 Web 加载的过程与逻辑有更多的思考与理解。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
极致Web性能 —— SPA性能指南

## 原文链接
[https://segmentfault.com/a/1190000013272561](https://segmentfault.com/a/1190000013272561)

