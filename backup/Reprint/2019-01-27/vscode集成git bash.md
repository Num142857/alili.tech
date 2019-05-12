---
title: 'vscode集成git bash' 
date: 2019-01-27 2:31:00
hidden: true
slug: sjwcd2tj04g
categories: [reprint]
---

{{< raw >}}

                    
<p>下面，给大家介绍一个把 <code>git bash</code> 集成到 <code>VSC(Visual Studio Code)</code> 中的小技巧，因为我们使用 <code>mac</code> 的同学没有这样的需求，所以这里只是windows下的配置方法，希望能帮助大家，也祝大家新年快乐！</p>
<h3 id="articleHeader0">起因</h3>
<p>以前我们团队大部分同学都使用 <code>sublime</code> 来开发项目，每打开一个项目，就要开一个终端运行任务。随着项目越来越多，打开的终端也越来越多，这样在 <code>sublime</code> 和终端的切换中让自己晕头转向（请原谅我们使用的 <code>windows</code> 原生终端）。</p>
<p>直到发现了 <code>VSC</code> 这样的神器，它自己内部集成终端，这样我们就能在编辑器中运行任务了，写代码的幸福指数蹭蹭蹭的上升。可是新问题来了，它内置的 <code>git</code> 工具并不好用，而且 <code>SouceTree</code> 也越来越卡。所以能在它的集成终端中使用 <code>git</code> 命令才是我理想的打开方式。</p>
<h3 id="articleHeader1">git版本</h3>
<p>我安装的 <code>git</code> 的版本，如下图<br><span class="img-wrap"><img data-src="/img/bVIvCn?w=843&amp;h=549" src="https://static.alili.tech/img/bVIvCn?w=843&amp;h=549" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>tips：如果 <code>git</code> 命令不能在 <code>cmd</code> 中使用，需要把 <code>git cmd</code> 的路径添加到系统环境变量 <code>PATH</code> 中</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="C:\Program Files (x86)\Git\cmd" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code style="word-break: break-word; white-space: initial;">C:<span class="hljs-symbol">\P</span>rogram Files (x86)<span class="hljs-symbol">\G</span>it<span class="hljs-symbol">\c</span>md</code></pre>
<p>打开文件夹<em>C:\Program Files (x86)\Git\bin</em>，找到我们可爱的 <code>bash.exe</code><br><span class="img-wrap"><img data-src="/img/bVIvER?w=1847&amp;h=1080" src="https://static.alili.tech/img/bVIvER?w=1847&amp;h=1080" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>tips：如果文件夹里面不是酱紫的几个文件，请更新下 <code>git</code>，填坑，大家请踩我通过..</p></blockquote>
<h3 id="articleHeader2">集成</h3>
<p>打开 <code>VSC</code>，点击 <em>文件 -&gt; 首选项 -&gt; 用户设置</em>，复制并粘贴下面的内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;terminal.integrated.shell.windows&quot;: &quot;C:\\Program Files (x86)\\Git\\bin\\bash.exe&quot; // 这里是我电脑上bash.exe的路径
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"terminal.integrated.shell.windows"</span>: <span class="hljs-string">"C:\\Program Files (x86)\\Git\\bin\\bash.exe"</span> // 这里是我电脑上bash.exe的路径
}</code></pre>
<p>保存重启下，这下终端里面就能看到当前的 <code>branch</code> 了。<br><span class="img-wrap"><img data-src="/img/bVIvGk?w=1839&amp;h=1080" src="https://static.alili.tech/img/bVIvGk?w=1839&amp;h=1080" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vscode集成git bash

## 原文链接
[https://segmentfault.com/a/1190000008185938](https://segmentfault.com/a/1190000008185938)

