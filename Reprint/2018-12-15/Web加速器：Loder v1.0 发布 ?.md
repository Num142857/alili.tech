---
title: 'Web加速器：Loder v1.0 发布 ?' 
date: 2018-12-15 2:30:11
hidden: true
slug: u7v3hllbzh
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000013079093?w=666&amp;h=188" src="https://static.alili.tech/img/remote/1460000013079093?w=666&amp;h=188" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://loder-docs.scoii.com" rel="nofollow noreferrer" target="_blank">Loder</a>是一个轻量级加载器，通过合理地声明资源任务依赖关系，以最高效形式执行Web加载，提供强大的性能追踪，持续优化性能瓶颈。</p>
<p>目前线性粗放式的Web资源加载模式，尤其在条件有限的移动端，很大程度限制了页面加载体验。费很大劲把脚本体积降下来，却得到极其有限的性能收益。使用微核启动器Loder，快速启动应用，利用在<code>Bundle</code>加载执行同时，展示Loading交互、发起鉴权、初始数据请求等，最大化利用设备能力提高页面渲染性能。</p>
<p>Loder具备以下特性：</p>
<ul>
<li>Dead Simple API</li>
<li>声明式依赖，极简的资源任务管理</li>
<li>极致加载，所有资源任务都以最适合时刻加载</li>
<li>轻量体积(1.4kb Gziped), 极速启动应用</li>
<li>几乎无需修改逻辑，简单几步即可加速应用至极致！</li>
</ul>
<h3 id="articleHeader0">应用示例</h3>
<p>举个栗子，应用会在运行前先把所需脚本准备妥当，之后会顺序执行鉴权、授权、获取数据、渲染。大多数的Web都会通过类似的模式去加载渲染。流程大致如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013079094?w=1449&amp;h=346" src="https://static.alili.tech/img/remote/1460000013079094?w=1449&amp;h=346" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>看似一种很直观的方式却很粗放，性能优化非常考验我们对资源任务加载的业务逻辑、依赖、顺序的理解，精细化运营这些过程，Web性能可以得到意想不到地提升。我们可以大致整理一下应用的资源任务加载过程：</p>
<ul>
<li>
<p>应用启动</p>
<ul>
<li>依赖[ "首屏数据", "应用鉴权", "应用 Bundle 加载&amp;执行"]</li>
<li>启动应用</li>
</ul>
</li>
<li>
<p>应用鉴权</p>
<ul>
<li>依赖[ "加载鉴权 SDK", "获得用户 ID" ]</li>
<li>发起鉴权请求</li>
</ul>
</li>
<li>
<p>首屏数据</p>
<ul>
<li>依赖[ "请求客户端 axios" ]</li>
<li>发起多个请求</li>
</ul>
</li>
</ul>
<p>可以看到，有一部分资源任务是可以正交进行的，这就是我们充分利用浏览器特性提高性能的关键。但是，如此繁琐的加载，维护起来并不容易。Loder提供极简的API，通过声明式注册资源和任务，即能以最优形式进行Web加载，以上述应用启动流程来举例：</p>
<h4>启动应用前鉴权</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 资源注册 —— 鉴权SDK
loder.add('authSDK', loder.loadScript('//sample.com/sdk.js'))

// 任务注册 —— 获取用户id
loder.add(
  'userId',
  () =>
    new Promise(resolve => {
      resolve('id')
    })
)

// 任务注册 —— 鉴权
loder.task(
  'auth', ['authSDK', 'userId'],
  () => new Promise(resolve => {
    // do auth
    resolve('success')
  })
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 资源注册 —— 鉴权SDK</span>
loder.add(<span class="hljs-string">'authSDK'</span>, loder.loadScript(<span class="hljs-string">'//sample.com/sdk.js'</span>))

<span class="hljs-comment">// 任务注册 —— 获取用户id</span>
loder.add(
  <span class="hljs-string">'userId'</span>,
  () =&gt;
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
      resolve(<span class="hljs-string">'id'</span>)
    })
)

<span class="hljs-comment">// 任务注册 —— 鉴权</span>
loder.task(
  <span class="hljs-string">'auth'</span>, [<span class="hljs-string">'authSDK'</span>, <span class="hljs-string">'userId'</span>],
  () =&gt; <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    <span class="hljs-comment">// do auth</span>
    resolve(<span class="hljs-string">'success'</span>)
  })
)</code></pre>
<h4>加载首屏数据</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 资源注册 —— 请求客户端
loader.add('axios', () => import('axios'))

// 资源注册 —— 首屏数据
loder.task(
  'fpData', ['axios'],
  () => new Promise(resolve => {
    const axios = loder.get('axios')
    return axios('//sample.com/userData.json')
  })
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 资源注册 —— 请求客户端</span>
loader.add(<span class="hljs-string">'axios'</span>, () =&gt; <span class="hljs-keyword">import</span>(<span class="hljs-string">'axios'</span>))

<span class="hljs-comment">// 资源注册 —— 首屏数据</span>
loder.task(
  <span class="hljs-string">'fpData'</span>, [<span class="hljs-string">'axios'</span>],
  () =&gt; <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> axios = loder.get(<span class="hljs-string">'axios'</span>)
    <span class="hljs-keyword">return</span> axios(<span class="hljs-string">'//sample.com/userData.json'</span>)
  })
)</code></pre>
<h4>启动应用</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 资源注册 —— JS Bundle
loder.add('createAppFn', () => import('./createAppFn'))

// 任务声明 —— 应用启动
loder.task('bootstrap', ['auth', 'fpData'])

// 一切就绪，执行加载
loder.run('bootstrap', async () => {
  const create = await loder.echo('createAppFn')
  create(&quot;Awesome Time&quot;)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 资源注册 —— JS Bundle</span>
loder.add(<span class="hljs-string">'createAppFn'</span>, () =&gt; <span class="hljs-keyword">import</span>(<span class="hljs-string">'./createAppFn'</span>))

<span class="hljs-comment">// 任务声明 —— 应用启动</span>
loder.task(<span class="hljs-string">'bootstrap'</span>, [<span class="hljs-string">'auth'</span>, <span class="hljs-string">'fpData'</span>])

<span class="hljs-comment">// 一切就绪，执行加载</span>
loder.run(<span class="hljs-string">'bootstrap'</span>, <span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> create = <span class="hljs-keyword">await</span> loder.echo(<span class="hljs-string">'createAppFn'</span>)
  create(<span class="hljs-string">"Awesome Time"</span>)
})</code></pre>
<p>通过非常的简单声明，<code>Loder</code>不仅仅将<code>PageLoaded</code>性能提升至极致，甚至可以利用首屏数据请求期间，去加载应用所需的资源脚本，以及花费大量时间执行的<code>Bundle</code>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013079095?w=1449&amp;h=905" src="https://static.alili.tech/img/remote/1460000013079095?w=1449&amp;h=905" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">Loder vs SSR</h2>
<p>除了高效加载、极简API、无业务入侵性外，<code>Loder</code>作为一个客户端加载器，具备更多天然的优势：</p>
<table>
<thead><tr>
<th>特性方案</th>
<th>Loder</th>
<th>SSR</th>
</tr></thead>
<tbody>
<tr>
<td>Server 支持</td>
<td>不需要</td>
<td>需要维护额外 SSR 服务器</td>
</tr>
<tr>
<td>Server 压力</td>
<td>低，正常使用 CDN 方案</td>
<td>高，每次请求需 Server 支持</td>
</tr>
<tr>
<td>Client</td>
<td>无需改动业务逻辑</td>
<td>client-ssr 两套版本</td>
</tr>
<tr>
<td>通用性</td>
<td>任何支持 JS 浏览器</td>
<td>简单页面，如客户端鉴权情况不支持</td>
</tr>
<tr>
<td>首屏渲染时间</td>
<td>快，无需浪费接口请求时间</td>
<td>极快，一次请求可获取首屏内容</td>
</tr>
<tr>
<td>页面空白时间</td>
<td>快速启动，极大减少空白时间</td>
<td>大数据查询接口，空白时间较长</td>
</tr>
<tr>
<td>可交互时长</td>
<td>短，脚本加载完成即可交互</td>
<td>中，ssr 后依旧需要完全加载 bundle</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader2">最后</h2>
<p>Loder作为一个Web极致性能加载器，驱动Web高效加载渲染，通过性能跟踪辅助发现&amp;优化性能瓶颈，也促使我们去思考如何组织Web的加载时序。</p>
<h3 id="articleHeader3">Links</h3>
<p>Landing page: <a href="http://loder-docs.scoii.com" rel="nofollow noreferrer" target="_blank">http://loder-docs.scoii.com</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Web加速器：Loder v1.0 发布 ?

## 原文链接
[https://segmentfault.com/a/1190000013079090](https://segmentfault.com/a/1190000013079090)

