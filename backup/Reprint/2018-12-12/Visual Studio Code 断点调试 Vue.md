---
title: 'Visual Studio Code 断点调试 Vue' 
date: 2018-12-12 2:30:10
hidden: true
slug: brqdtk3gadh
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><h3 id="articleHeader0">很多人习惯在 Chrome 的调试窗口中调试 Vue 代码， 或者直接使用 <strong>console.log</strong> 来观察变量值， 这是非常痛苦的一件事，需要同时打开至少 3 个窗体。个人还是更加习惯于断点调试。这篇文章将介绍如何配置 Visual Studio Code 和 Chrome 来完成直接在 VS Code 断点调试代码, 并且在VS Code的调试窗口看到Chrome中console相同的值。</h3></blockquote>
<h2 id="articleHeader1">设置 Chrome 远程调试端口</h2>
<p>首先我们需要在远程调试打开的状态下启动 Chrome, 这样 VS Code 才能 attach 到 Chrome 上:</p>
<h3 id="articleHeader2">Windows</h3>
<ul>
<li>右键点击 Chrome 的快捷方式图标，选择<strong>属性</strong>
</li>
<li>在<strong>目标</strong>一栏，最后加上<code>--remote-debugging-port=9222</code> <em>注意要用空格隔开</em>
</li>
</ul>
<h3 id="articleHeader3">macOS</h3>
<ul><li>
<p>打开控制台执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222</code></pre>
</li></ul>
<h3 id="articleHeader4">Linux</h3>
<ul><li>
<p>打开控制台执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="google-chrome --remote-debugging-port=9222" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">google-chrome --remote-debugging-port=9222</code></pre>
</li></ul>
<h2 id="articleHeader5">Visual Stuido Code 安装插件</h2>
<p>点击 Visual Studio Code 左侧边栏的<strong>扩展</strong>按钮， 然后在搜索框输入<strong>Debugger for Chrome</strong>并安装插件，再输入，安装完成后点击 reload 重启 VS Code</p>
<h2 id="articleHeader6">添加 Visual Studio Code 配置</h2>
<ul>
<li>点击 Visual Studio Code 左侧边栏的 <strong>调试</strong> 按钮， 在弹出的调试配置窗口中点击 <em>设置</em> 小齿轮， 然后选择 chrome, VS Code 将会在工作区根目录生成.vscode 目录，里面会有一个 lanch.json 文件并会自动打开</li>
<li>
<p>用下面的配置文件覆盖自动生成的 lanch.json 文件内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  &quot;version&quot;: &quot;0.2.0&quot;,
  &quot;configurations&quot;: [
    {
      &quot;type&quot;: &quot;chrome&quot;,
      &quot;request&quot;: &quot;attach&quot;,
      &quot;name&quot;: &quot;Attach to Chrome&quot;,
      &quot;port&quot;: 9222,
      &quot;webRoot&quot;: &quot;${workspaceRoot}/src&quot;,
      &quot;url&quot;: &quot;http://localhost:8080/#/&quot;,
      &quot;sourceMaps&quot;: true,
      &quot;sourceMapPathOverrides&quot;: {
        &quot;webpack:///src/*&quot;: &quot;${webRoot}/*&quot;
      }
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=<span class="hljs-number">830387</span>
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"0.2.0"</span>,
  <span class="hljs-attr">"configurations"</span>: [
    {
      <span class="hljs-attr">"type"</span>: <span class="hljs-string">"chrome"</span>,
      <span class="hljs-attr">"request"</span>: <span class="hljs-string">"attach"</span>,
      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"Attach to Chrome"</span>,
      <span class="hljs-attr">"port"</span>: <span class="hljs-number">9222</span>,
      <span class="hljs-attr">"webRoot"</span>: <span class="hljs-string">"${workspaceRoot}/src"</span>,
      <span class="hljs-attr">"url"</span>: <span class="hljs-string">"http://localhost:8080/#/"</span>,
      <span class="hljs-attr">"sourceMaps"</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">"sourceMapPathOverrides"</span>: {
        <span class="hljs-attr">"webpack:///src/*"</span>: <span class="hljs-string">"${webRoot}/*"</span>
      }
    }
  ]
}</code></pre>
</li>
</ul>
<h2 id="articleHeader7">修改 webpack 的 sourcemap</h2>
<p>如果你是基于 webpack 打包的 vue 项目， 可能会存在断点不匹配的问题, 还需要做些修改：</p>
<ul>
<li>打开根目录下的 config 目录下的 index.js 文件</li>
<li>将<strong>dev</strong> 节点下的 <strong>devtool</strong> 值改为 <em>'eval-source-map'</em>
</li>
<li>将<strong>dev</strong>节点下的 <strong>cacheBusting</strong> 值改为 <em>false</em>
</li>
</ul>
<h2 id="articleHeader8">开始调试吧</h2>
<p>一切具备了， 现在验收成果了</p>
<ul>
<li>通过第一步的方式以远程调试打开的方式打开 Chrome</li>
<li>在 vue 项目中执行<code>npm run dev</code>以调试方式启动项目</li>
<li>点击 VS Code 左侧边栏的调试按钮，选择 <em>Attach to Chrome</em> 并点击绿色开始按钮，正常情况下就会出现调试控制条。</li>
<li>现在就可以在.vue文件的js代码中打断点进行调试了。</li>
</ul>
<blockquote>前往我的技术小站 <a href="https://www.slimhill.com" rel="nofollow noreferrer" target="_blank">https://www.slimhill.com</a> 查看更多博客。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Visual Studio Code 断点调试 Vue

## 原文链接
[https://segmentfault.com/a/1190000013392459](https://segmentfault.com/a/1190000013392459)

