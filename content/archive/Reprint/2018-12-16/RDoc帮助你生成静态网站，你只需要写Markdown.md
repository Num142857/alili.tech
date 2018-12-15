---
title: 'RDoc帮助你生成静态网站，你只需要写Markdown' 
date: 2018-12-16 2:30:10
hidden: true
slug: ao5xap2wzcq
categories: [reprint]
---

{{< raw >}}

                    
<p>RDoc 是一个文档生成工具，用于生成文档网站或简单的博客网站。<br>简单到你只需写 Markdown 文件就可以帮助你生成网站。<br>同时可以方便的集成到你的项目工程中。</p>
<ul>
<li><a href="https://react-doc.github.io/#/" rel="nofollow noreferrer" target="_blank">官方网站</a></li>
<li><a href="https://github.com/jaywcjlove/rdoc" rel="nofollow noreferrer" target="_blank">开源Github</a></li>
</ul>
<p>下图官方网站，是 <a href="https://react-doc.github.io/" rel="nofollow noreferrer" target="_blank">rdoc</a> 生成的：</p>
<p><span class="img-wrap"><img data-src="/img/bV2vnM?w=1287&amp;h=863" src="https://static.alili.tech/img/bV2vnM?w=1287&amp;h=863" alt="RDoc" title="RDoc" style="cursor: pointer; display: inline;"></span></p>
<p>基于React的快速静态站点生成器，只需编写Markdown文件即可。 访问<a href="https://react-doc.github.io/#/" rel="nofollow noreferrer" target="_blank">react-doc.github.io</a>网站获取更多信息。</p>
<h2 id="articleHeader0">快速开始</h2>
<p>在您的系统上全局安装rdoc。需要在本地开发机器上具有<code>Node&gt; = 8</code>。 您可以使用 <strong><a href="https://github.com/tj/n#installation" rel="nofollow noreferrer" target="_blank">n</a></strong> 来轻松切换不同项目之间的Node版本。</p>
<h3 id="articleHeader1">全局安装</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install rdoc -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install rdoc -g</code></pre>
<h3 id="articleHeader2">初始化网站</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rdoc init my-project  # Init project" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">rdoc init my-project  <span class="hljs-comment"># Init project</span></code></pre>
<h3 id="articleHeader3">运行网站</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd my-project &amp;&amp; npm start # Into the directory, start the service.


## Compiled successfully!

## You can now view doc-example in the browser.

##  Local:            http://localhost:5858/
##  On Your Network:  http://192.168.188.109:5858/

## Note that the development build is not optimized.
## To create a production build, use npm run build." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-built_in">cd</span> my-project &amp;&amp; npm start <span class="hljs-comment"># Into the directory, start the service.</span>


<span class="hljs-comment">## Compiled successfully!</span>

<span class="hljs-comment">## You can now view doc-example in the browser.</span>

<span class="hljs-comment">##  Local:            http://localhost:5858/</span>
<span class="hljs-comment">##  On Your Network:  http://192.168.188.109:5858/</span>

<span class="hljs-comment">## Note that the development build is not optimized.</span>
<span class="hljs-comment">## To create a production build, use npm run build.</span></code></pre>
<h3 id="articleHeader4">编译生成HTML</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm run build</code></pre>
<h3 id="articleHeader5">修改部署配置</h3>
<p>在 <code>package.json</code> 中配置部署URL</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;deploy&quot;: &quot;rdoc --publish <您的GitHub仓库地址>&quot;
    ...
  },
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"deploy"</span>: <span class="hljs-string">"rdoc --publish &lt;您的GitHub仓库地址&gt;"</span>
    ...
  },
  ...
}</code></pre>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;deploy&quot;: &quot;rdoc --publish https://github.com/react-doc/react-doc.github.io.git --branch master&quot;
    ...
  },
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"deploy"</span>: <span class="hljs-string">"rdoc --publish https://github.com/react-doc/react-doc.github.io.git --branch master"</span>
    ...
  },
  ...
}</code></pre>
<p>上面 <code>deploy</code> 实例，将当前工程生成的静态 <code>push</code> 到 <code>https://github.com/react-doc/react-doc.github.io.git</code> 仓库的 <code>master</code> 分支中。</p>
<ul><li>
<code>--branch master</code> 参数指定分支，默认没有这个参数，推向指定网站的 <code>gh-pages</code> 分支。</li></ul>
<h3 id="articleHeader6">部署网站</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run deploy" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm run deploy</code></pre>
<p>恭喜你，你已经生成了一个网站。?</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
RDoc帮助你生成静态网站，你只需要写Markdown

## 原文链接
[https://segmentfault.com/a/1190000012951426](https://segmentfault.com/a/1190000012951426)

