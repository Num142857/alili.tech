---
title: 'Visual Studio Code 前端调试不完全指南' 
date: 2019-01-14 2:30:07
hidden: true
slug: 6kvsv74kk06
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文最初发布于我的个人博客：<a href="http://jerryzou.com/posts/vscode-debug-guide/" rel="nofollow noreferrer" target="_blank">咀嚼之味</a></p></blockquote>
<p><strong>Visual Studio Code</strong> (以下简称 vscode) 如今已经代替 Sublime，成为前端工程师们最喜爱的代码编辑器。它作为一个大型的开源项目，不断推陈出新；社区中涌现出大量优质的插件，以支持我们更加舒服地进行开发工作。在近期的工作中，我尝试通过 vscode 来提升调试代码的幸福度，积累了一点点小心得在此与大家分享一下。</p>
<p>接下来的内容将从以下几方面进行展开：</p>
<ol>
<li><p>launch / attach</p></li>
<li><p>调试前端代码</p></li>
<li><p>调试通过 Nodemon 启动的 Node 服务器</p></li>
</ol>
<h2 id="articleHeader0">1. launch / attach</h2>
<p>要使用 vscode 的调试功能，首先就得配置 <code>.vscode/launch.json</code> 文件。以最简单的 Node 调试配置为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;version&quot;: &quot;0.2.0&quot;,
    &quot;configurations&quot;: [
        {
            &quot;type&quot;: &quot;node&quot;,
            &quot;request&quot;: &quot;launch&quot;,
            &quot;name&quot;: &quot;Launch&quot;,
            &quot;program&quot;: &quot;${workspaceRoot}/index.js&quot;
        },
        {
            &quot;type&quot;: &quot;node&quot;,
            &quot;request&quot;: &quot;attach&quot;,
            &quot;name&quot;: &quot;Attach&quot;,
            &quot;port&quot;: 5858
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.2.0"</span>,
    <span class="hljs-attr">"configurations"</span>: [
        {
            <span class="hljs-attr">"type"</span>: <span class="hljs-string">"node"</span>,
            <span class="hljs-attr">"request"</span>: <span class="hljs-string">"launch"</span>,
            <span class="hljs-attr">"name"</span>: <span class="hljs-string">"Launch"</span>,
            <span class="hljs-attr">"program"</span>: <span class="hljs-string">"${workspaceRoot}/index.js"</span>
        },
        {
            <span class="hljs-attr">"type"</span>: <span class="hljs-string">"node"</span>,
            <span class="hljs-attr">"request"</span>: <span class="hljs-string">"attach"</span>,
            <span class="hljs-attr">"name"</span>: <span class="hljs-string">"Attach"</span>,
            <span class="hljs-attr">"port"</span>: <span class="hljs-number">5858</span>
        }
    ]
}</code></pre>
<p>其中最重要的参数是 <code>request</code> ，它的取值有两种 <code>launch</code> 和 <code>attach</code>。</p>
<ul>
<li><p><strong>launch</strong>模式：<strong>由 vscode 来启动</strong>一个独立的具有 debug 模式的程序</p></li>
<li><p><strong>attach</strong>模式：附加于（也可以说“监听”）一个<strong>已经启动的程序</strong>（必须已经开启 Debug 模式）</p></li>
</ul>
<p>这两种截然不同的模式到底有什么具体的应用场景呢？且看后文。</p>
<h2 id="articleHeader1">2. 调试前端代码</h2>
<p>通过 vscode 调试前端代码主要依赖于一个插件：<a href="https://github.com/Microsoft/vscode-chrome-debug" rel="nofollow noreferrer" target="_blank">Debugger for Chrome</a>，该插件主要利用 <a href="https://chromedevtools.github.io/devtools-protocol/" rel="nofollow noreferrer" target="_blank">Chrome 所开放出来的接口</a> 来实现对其渲染的页面进行调试。可以通过 <code>Shift + Cmd + X</code> 打开插件中心，搜索对应插件后直接安装。安装完成并重新加载 vscode 后，可以直接点击调试按钮并创建新的启动配置。如果你之前已经创建过启动配置了，就可以直接打开 <code>.vscode/launch.json</code> 进行修改。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009499348?w=827&amp;h=453" src="https://static.alili.tech/img/remote/1460000009499348?w=827&amp;h=453" alt="图片上传中..." title="图片上传中..." style="cursor: pointer; display: inline;"></span></p>
<p>其中调试 Chrome 页面的配置如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;version&quot;: &quot;0.2.0&quot;,
    &quot;configurations&quot;: [
        {
            &quot;type&quot;: &quot;chrome&quot;,
            &quot;request&quot;: &quot;launch&quot;,
            &quot;name&quot;: &quot;启动一个独立的 Chrome 以调试 frontend&quot;,
            &quot;url&quot;: &quot;http://localhost:8091/frontend&quot;,
            &quot;webRoot&quot;: &quot;${workspaceRoot}/frontend&quot;
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.2.0"</span>,
    <span class="hljs-attr">"configurations"</span>: [
        {
            <span class="hljs-attr">"type"</span>: <span class="hljs-string">"chrome"</span>,
            <span class="hljs-attr">"request"</span>: <span class="hljs-string">"launch"</span>,
            <span class="hljs-attr">"name"</span>: <span class="hljs-string">"启动一个独立的 Chrome 以调试 frontend"</span>,
            <span class="hljs-attr">"url"</span>: <span class="hljs-string">"http://localhost:8091/frontend"</span>,
            <span class="hljs-attr">"webRoot"</span>: <span class="hljs-string">"${workspaceRoot}/frontend"</span>
        }
    ]
}</code></pre>
<p>如之前所述，通过第一个 launch 配置就能启动一个通过 vscode 调试的 Chrome。大家可以直接使用我组织好的项目 <a href="https://github.com/zry656565/vscode-debug-sample" rel="nofollow noreferrer" target="_blank">zry656565/vscode-debug-sample</a> 进行测试，测试方法在该项目的 README 里面写得很清楚了。简要步骤概括为：</p>
<ol>
<li><p><code>npm run frontend</code></p></li>
<li><p>启动调试配置：“启动一个独立的 Chrome 以调试 frontend”</p></li>
<li><p>在 <code>frontend/index.js</code> 中加断点</p></li>
<li><p>访问 <code>http://localhost:8091/frontend/</code></p></li>
</ol>
<h3 id="articleHeader2">延伸问题</h3>
<p>使用 <code>launch</code> 模式调试前端代码存在一个问题，就是 vscode 会以新访客的身份打开一个新的 Chrome 进程，也就是说你<strong>之前在 Chrome 上装的插件都没法在这个页面上生效</strong>（如下图所示）。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009499349?w=463&amp;h=191" src="https://static.alili.tech/img/remote/1460000009499349?w=463&amp;h=191" alt="vscode-debug-launch" title="vscode-debug-launch" style="cursor: pointer; display: inline;"></span></p>
<p>在这种情况下 <code>attach</code> 模式就有它存在的意义了：对一个已经启动的 Chrome 进行监听调试。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;version&quot;: &quot;0.2.0&quot;,
    &quot;configurations&quot;: [
        {
            &quot;type&quot;: &quot;chrome&quot;,
            &quot;request&quot;: &quot;attach&quot;,
            &quot;name&quot;: &quot;监听一个已经启动调试模式的 Chrome&quot;,
            &quot;port&quot;: 9222,
            &quot;url&quot;: &quot;http://localhost:8091/frontend&quot;,
            &quot;webRoot&quot;: &quot;${workspaceRoot}/frontend&quot;
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.2.0"</span>,
    <span class="hljs-attr">"configurations"</span>: [
        {
            <span class="hljs-attr">"type"</span>: <span class="hljs-string">"chrome"</span>,
            <span class="hljs-attr">"request"</span>: <span class="hljs-string">"attach"</span>,
            <span class="hljs-attr">"name"</span>: <span class="hljs-string">"监听一个已经启动调试模式的 Chrome"</span>,
            <span class="hljs-attr">"port"</span>: <span class="hljs-number">9222</span>,
            <span class="hljs-attr">"url"</span>: <span class="hljs-string">"http://localhost:8091/frontend"</span>,
            <span class="hljs-attr">"webRoot"</span>: <span class="hljs-string">"${workspaceRoot}/frontend"</span>
        }
    ]
}</code></pre>
<p>其中 9222 是 Chrome 的调试模式推荐的端口，可以根据需要进行修改。不过目前我并没有成功实施这个设想，对此有兴趣的同学可以从下面这两个链接入手去研究一下：</p>
<ul>
<li><p><a href="https://chromedevtools.github.io/devtools-protocol/" rel="nofollow noreferrer" target="_blank">Chrome DevTools Protocol Viewer</a></p></li>
<li><p><a href="https://github.com/Microsoft/vscode-chrome-debug/blob/master/README.md#attach" rel="nofollow noreferrer" target="_blank">Debugger for Chrome / Attach</a></p></li>
</ul>
<p>有一部分遇到的问题可以直接在 Debugger for Chrome 的 FAQ 中得到解答。</p>
<h2 id="articleHeader3">3. 调试通过 Nodemon 启动的 Node 服务器</h2>
<p>如今，使用 Node 服务器开发一些中间层的服务也慢慢纳入了所谓“大前端”的范畴。而在开发 Node 服务时，我们通常要借助类似于 <a href="https://github.com/remy/nodemon" rel="nofollow noreferrer" target="_blank">nodemon</a> 这样的工具来避免频繁手动重启服务器。在这种情况下，我们又如何利用 vscode 来进行断点调试呢？先来看看示例配置文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;version&quot;: &quot;0.2.0&quot;,
    &quot;configurations&quot;: [
        {
            &quot;type&quot;: &quot;node&quot;,
            &quot;request&quot;: &quot;attach&quot;,
            &quot;name&quot;: &quot;附加于已启动的 Node 服务器（debug模式）&quot;,
            &quot;port&quot;: 5858,
            &quot;restart&quot;: true
        },
        {
            &quot;type&quot;: &quot;node&quot;,
            &quot;request&quot;: &quot;attach&quot;,
            &quot;name&quot;: &quot;附加于已启动的 Node 服务器（inspect模式）&quot;,
            &quot;port&quot;: 9229,
            &quot;restart&quot;: true
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.2.0"</span>,
    <span class="hljs-attr">"configurations"</span>: [
        {
            <span class="hljs-attr">"type"</span>: <span class="hljs-string">"node"</span>,
            <span class="hljs-attr">"request"</span>: <span class="hljs-string">"attach"</span>,
            <span class="hljs-attr">"name"</span>: <span class="hljs-string">"附加于已启动的 Node 服务器（debug模式）"</span>,
            <span class="hljs-attr">"port"</span>: <span class="hljs-number">5858</span>,
            <span class="hljs-attr">"restart"</span>: <span class="hljs-literal">true</span>
        },
        {
            <span class="hljs-attr">"type"</span>: <span class="hljs-string">"node"</span>,
            <span class="hljs-attr">"request"</span>: <span class="hljs-string">"attach"</span>,
            <span class="hljs-attr">"name"</span>: <span class="hljs-string">"附加于已启动的 Node 服务器（inspect模式）"</span>,
            <span class="hljs-attr">"port"</span>: <span class="hljs-number">9229</span>,
            <span class="hljs-attr">"restart"</span>: <span class="hljs-literal">true</span>
        }
    ]
}</code></pre>
<p>首先，为了配合 nodemon 在监听到文件修改时重启服务器，此处需要添加一个 <code>restart</code> 参数。同时大家可能注意到了，这里给出了两种模式，大家可能根据以下区别来选择合适自己的协议：</p>
<table>
<thead><tr>
<th>Runtime</th>
<th>'Legacy Protocol'</th>
<th>'Inspector Protocol'</th>
</tr></thead>
<tbody>
<tr>
<td>io.js</td>
<td>all</td>
<td>no</td>
</tr>
<tr>
<td>node.js</td>
<td>&lt; 8.x</td>
<td>&gt;= 6.3 (Windows: &gt;= 6.9)</td>
</tr>
<tr>
<td>Electron</td>
<td>all</td>
<td>not yet</td>
</tr>
<tr>
<td>Chakra</td>
<td>all</td>
<td>not yet</td>
</tr>
</tbody>
</table>
<p>通俗来说，旧版 Node (&lt; 6.3) 推荐使用 Legacy Protocol (<code>--debug</code>模式，默认 5858 端口)，而新版的 Node (&gt;= 6.3) 推荐使用 Inspector Protocol (<code>--inspect</code>模式，默认 9229 端口)。</p>
<p>需要注意的是，在启动 nodemon 程序时，也要添加对应的参数，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nodemon --debug server/app.js
nodemon --inspect server/app.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>nodemon --debug server/<span class="hljs-keyword">app</span>.js
nodemon --<span class="hljs-keyword">inspect</span> server/<span class="hljs-keyword">app</span>.js</code></pre>
<p>详细的例子同样可以在 <a href="https://github.com/zry656565/vscode-debug-sample" rel="nofollow noreferrer" target="_blank">zry656565/vscode-debug-sample</a> 中找到。</p>
<h2 id="articleHeader4">参考资料</h2>
<ul>
<li><p><a href="https://github.com/Microsoft/vscode-chrome-debug/blob/master/README.md" rel="nofollow noreferrer" target="_blank">VS Code - Debugger for Chrome - README</a></p></li>
<li><p><a href="https://code.visualstudio.com/docs/editor/debugging" rel="nofollow noreferrer" target="_blank">Debugging in VS Code</a></p></li>
<li><p><a href="https://chromedevtools.github.io/devtools-protocol/" rel="nofollow noreferrer" target="_blank">Chrome DevTools Protocol Viewer</a></p></li>
<li><p><a href="https://github.com/bdspen/nodemon_vscode" rel="nofollow noreferrer" target="_blank">bdspen/nodemon_vscode</a></p></li>
<li><p><a href="https://code.visualstudio.com/docs/nodejs/nodejs-debugging" rel="nofollow noreferrer" target="_blank">Node.js Debugging in VS Code</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Visual Studio Code 前端调试不完全指南

## 原文链接
[https://segmentfault.com/a/1190000009499670](https://segmentfault.com/a/1190000009499670)

